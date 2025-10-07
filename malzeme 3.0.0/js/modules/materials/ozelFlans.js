/**
 * ÖZEL FLANŞ Malzeme Modülü
 * Kullanıcı tanımlı özel flanşlar
 */

(function(window) {
    'use strict';
    
    class OzelFlansMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'ozelFlans';
            
            // Dil metinleri
            this.texts = {
                tr: {
                    display_name: 'Özel Flanş',
                    flans_adi_label: 'Flanş Adı/Tanımı',
                    standart_label: 'Standart/Özellik',
                    dis_cap_label: 'Dış Çap (mm)',
                    ic_cap_label: 'İç Çap (mm)',
                    kalinlik_label: 'Kalınlık (mm)',
                    delik_sayisi_label: 'Delik Sayısı',
                    delik_capi_label: 'Delik Çapı (mm)',
                    agirlik_label: 'Birim Ağırlık (kg)',
                    flans_adi_placeholder: 'Örn: Özel Kör Flanş DN200 PN40',
                    standart_placeholder: 'Örn: DIN 2527, Özel İmalat vb.',
                    dis_cap_placeholder: 'Flanş dış çapı',
                    ic_cap_placeholder: 'Flanş iç çapı (kör ise 0)',
                    kalinlik_placeholder: 'Flanş kalınlığı',
                    delik_sayisi_placeholder: 'Cıvata delik sayısı',
                    delik_capi_placeholder: 'Cıvata delik çapı',
                    agirlik_placeholder: 'Manuel ağırlık veya boş bırakın',
                    validation_error: 'Zorunlu alanlar doldurulmalıdır',
                    auto_calculate: 'Otomatik Hesapla',
                    manual_weight: 'Manuel Ağırlık Girişi',
                    calculated_weight_info: 'Hesaplanan Ağırlık',
                    save_template: 'Şablon Olarak Kaydet',
                    load_template: 'Şablon Yükle',
                    select_template: 'Kayıtlı şablon seçin',
                    delete_template: 'Şablon Sil',
                    confirm_delete: 'Bu şablonu silmek istediğinizden emin misiniz?',
                    template_deleted: 'Şablon silindi'
                },
                en: {
                    display_name: 'Custom Flange',
                    flans_adi_label: 'Flange Name/Description',
                    standart_label: 'Standard/Specification',
                    dis_cap_label: 'Outer Diameter (mm)',
                    ic_cap_label: 'Inner Diameter (mm)',
                    kalinlik_label: 'Thickness (mm)',
                    delik_sayisi_label: 'Number of Holes',
                    delik_capi_label: 'Hole Diameter (mm)',
                    agirlik_label: 'Unit Weight (kg)',
                    flans_adi_placeholder: 'E.g: Custom Blind Flange DN200 PN40',
                    standart_placeholder: 'E.g: DIN 2527, Custom Made etc.',
                    dis_cap_placeholder: 'Flange outer diameter',
                    ic_cap_placeholder: 'Flange inner diameter (0 for blind)',
                    kalinlik_placeholder: 'Flange thickness',
                    delik_sayisi_placeholder: 'Number of bolt holes',
                    delik_capi_placeholder: 'Bolt hole diameter',
                    agirlik_placeholder: 'Manual weight or leave empty',
                    validation_error: 'Required fields must be filled',
                    auto_calculate: 'Auto Calculate',
                    manual_weight: 'Manual Weight Entry',
                    calculated_weight_info: 'Calculated Weight',
                    save_template: 'Save as Template',
                    load_template: 'Load Template',
                    select_template: 'Select saved template',
                    delete_template: 'Delete Template',
                    confirm_delete: 'Are you sure you want to delete this template?',
                    template_deleted: 'Template deleted'
                }
            };
            
            // Malzeme cinsleri
            this.grades = [
                'S235JR', 'S275JR', 'S355JR',
                'P245GH', 'P250GH', 'P265GH',
                '1.4301', '1.4401', '1.4404', '1.4541', '1.4571',
                'A105', 'A182 F304', 'A182 F316',
                'Özel'
            ];
            
            // Yoğunluklar
            this.densities = {
                'S235JR': 7850, 'S275JR': 7850, 'S355JR': 7850,
                'P245GH': 7850, 'P250GH': 7850, 'P265GH': 7850,
                '1.4301': 8000, '1.4401': 8000, '1.4404': 8000,
                '1.4541': 8000, '1.4571': 8000,
                'A105': 7850, 'A182 F304': 8000, 'A182 F316': 8000,
                'Özel': 7850
            };
            
            // Standartlar
            this.standards = {
                'S235JR': 'Özel İmalat', 'S275JR': 'Özel İmalat', 'S355JR': 'Özel İmalat',
                'P245GH': 'Özel İmalat', 'P250GH': 'Özel İmalat', 'P265GH': 'Özel İmalat',
                '1.4301': 'Özel İmalat', '1.4401': 'Özel İmalat', '1.4404': 'Özel İmalat',
                '1.4541': 'Özel İmalat', '1.4571': 'Özel İmalat',
                'A105': 'Özel İmalat', 'A182 F304': 'Özel İmalat', 'A182 F316': 'Özel İmalat',
                'Özel': 'Özel İmalat'
            };
            
            // Kayıtlı şablonlar
            this.loadTemplates();
        }

        loadTemplates() {
            const stored = localStorage.getItem('ozelFlansTemplates');
            this.templates = stored ? JSON.parse(stored) : {};
        }

        saveTemplate(name, data) {
            this.templates[name] = data;
            localStorage.setItem('ozelFlansTemplates', JSON.stringify(this.templates));
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="ozelFlansTemplate">${this.getText('load_template')}</label>
                        <select id="ozelFlansTemplate" onchange="window.ApplicationController.loadFlansTemplate()">
                            <option value="">${this.getText('select_template')}</option>
                            ${Object.keys(this.templates).map(name => 
                                `<option value="${name}">${name}</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-secondary" onclick="window.ApplicationController.deleteFlansTemplate()" style="margin-top: 24px;">
                            🗑️ ${this.getText('delete_template')}
                        </button>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="flansAdi">${this.getText('flans_adi_label')} *</label>
                        <input type="text" id="flansAdi" 
                               placeholder="${this.getText('flans_adi_placeholder')}" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="standart">${this.getText('standart_label')}</label>
                        <input type="text" id="standart" 
                               placeholder="${this.getText('standart_placeholder')}">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="disCap">${this.getText('dis_cap_label')} *</label>
                        <input type="number" id="disCap" 
                               placeholder="${this.getText('dis_cap_placeholder')}" 
                               min="0" step="any" required>
                    </div>
                    <div class="form-group">
                        <label for="icCap">${this.getText('ic_cap_label')} *</label>
                        <input type="number" id="icCap" 
                               placeholder="${this.getText('ic_cap_placeholder')}" 
                               min="0" step="any" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="kalinlik">${this.getText('kalinlik_label')} *</label>
                        <input type="number" id="kalinlik" 
                               placeholder="${this.getText('kalinlik_placeholder')}" 
                               min="0" step="any" required>
                    </div>
                    </div>
                    <div class="form-group">
                        <label for="manuelAgirlik">${this.getText('agirlik_label')}</label>
                        <input type="number" id="manuelAgirlik" 
                               placeholder="${this.getText('agirlik_placeholder')}" 
                               min="0" step="any">
                    </div>
                </div>
                <div class="form-row" id="ozelFlansInfoRow" style="display: none;">
                    <div class="form-group">
                        <small style="color: #4299e1; font-weight: 600;">
                            <span id="calculatedWeightInfo"></span>
                        </small>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <button type="button" class="btn btn-secondary" onclick="window.ApplicationController.saveFlansAsTemplate()">
                            ${this.getText('save_template')}
                        </button>
                    </div>
                </div>
            `;
        }

        calculate(formData) {
            const flansAdi = formData.flansAdi || '';
            const disCap = parseFloat(formData.disCap) || 0;
            const icCap = parseFloat(formData.icCap) || 0;
            const kalinlik = parseFloat(formData.kalinlik) || 0;
            const delikSayisi = parseInt(formData.delikSayisi) || 0;
            const delikCapi = parseFloat(formData.delikCapi) || 0;
            const manuelAgirlik = parseFloat(formData.manuelAgirlik) || 0;
            const adet = parseFloat(formData.adet) || 1;
            const malzemeCinsi = formData.malzemeCinsi || 'P265GH';
            
            if (!flansAdi || !disCap || kalinlik === 0) {
                return null;
            }
            
            let birimAgirlik = 0;
            
            if (manuelAgirlik > 0) {
                // Manuel ağırlık girilmişse onu kullan
                birimAgirlik = manuelAgirlik;
            } else {
                // Otomatik hesapla
                // Dış daire alanı
                const disAlan = Math.PI * Math.pow(disCap / 2, 2);
                // İç daire alanı
                const icAlan = Math.PI * Math.pow(icCap / 2, 2);
                // Delik alanları
                const delikAlan = delikSayisi * Math.PI * Math.pow(delikCapi / 2, 2);
                
                // Net alan (mm²)
                const netAlan = disAlan - icAlan - delikAlan;
                
                // Hacim (mm³ → m³)
                const hacimM3 = (netAlan * kalinlik) / 1000000000;
                
                // Yoğunluk
                const yogunluk = this.getDensity(malzemeCinsi);
                
                // Ağırlık (kg)
                birimAgirlik = hacimM3 * yogunluk;
                
                // Bilgi güncelleme
                this.updateInfoDisplay(birimAgirlik);
            }
            
            const toplamAgirlik = birimAgirlik * adet;
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                suHacmi: null
            };
        }

        updateInfoDisplay(calculatedWeight) {
            const infoRow = document.getElementById('ozelFlansInfoRow');
            const weightInfo = document.getElementById('calculatedWeightInfo');
            
            if (calculatedWeight) {
                infoRow.style.display = 'block';
                weightInfo.textContent = `${this.getText('calculated_weight_info')}: ${calculatedWeight.toFixed(3)} kg`;
            } else {
                infoRow.style.display = 'none';
            }
        }

        validate(formData) {
            const flansAdi = formData.flansAdi || '';
            const disCap = parseFloat(formData.disCap) || 0;
            const kalinlik = parseFloat(formData.kalinlik) || 0;
            
            if (!flansAdi || !disCap || !kalinlik) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            return { isValid: true };
        }

        formatDimensions(formData) {
            const disCap = formData.disCap || 0;
            const icCap = formData.icCap || 0;
            const kalinlik = formData.kalinlik || 0;
            
            return `Ø${disCap}-Ø${icCap} t:${kalinlik}mm`;
        }

        // Override formatRow to include custom standard
        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            
            // Özel standart bilgisini ekle
            baseRow.enNormu = formData.standart || 'Özel İmalat';
            baseRow.flansDetay = {
                disCap: formData.disCap,
                icCap: formData.icCap,
                kalinlik: formData.kalinlik,
                delikSayisi: formData.delikSayisi,
                delikCapi: formData.delikCapi
            };
            
            return baseRow;
        }

        fillSpecificFields(rowData) {
            // FormData varsa önce onu kullan
            if (rowData.formData) {
                console.log('Özel Flanş formData bulundu:', rowData.formData);
                
                // Tüm alanları doğrudan doldur
                const fieldMap = {
                    'flansAdi': 'flansAdi',
                    'standart': 'standart',
                    'disCap': 'disCap',
                    'icCap': 'icCap',
                    'kalinlik': 'kalinlik',
                    'delikSayisi': 'delikSayisi',
                    'delikCapi': 'delikCapi',
                    'manuelAgirlik': 'manuelAgirlik'
                };
                
                Object.keys(fieldMap).forEach(formKey => {
                    const elementId = fieldMap[formKey];
                    const element = document.getElementById(elementId);
                    if (element && rowData.formData[formKey] !== undefined) {
                        element.value = rowData.formData[formKey];
                    }
                });
                
                // Hesaplanmış ağırlığı göster
                setTimeout(() => {
                    const MaterialClass = window.MaterialRegistry.get('ozelFlans');
                    const instance = new MaterialClass();
                    const calculation = instance.calculate(rowData.formData);
                    if (calculation) {
                        instance.updateInfoDisplay(calculation.birimAgirlik);
                    }
                }, 100);
                
                return;
            }
            
            // flansDetay varsa onu kullan
            if (rowData.flansDetay) {
                console.log('Özel Flanş flansDetay bulundu:', rowData.flansDetay);
                
                ['disCap', 'icCap', 'kalinlik', 'delikSayisi', 'delikCapi'].forEach(key => {
                    const element = document.getElementById(key);
                    if (element && rowData.flansDetay[key] !== undefined) {
                        element.value = rowData.flansDetay[key];
                    }
                });
            }
            
            // Ölçüler string'inden parse et
            if (rowData.olculer) {
                const pattern = /Ø(\d+(?:\.\d+)?)-Ø(\d+(?:\.\d+)?)\s*t:(\d+(?:\.\d+)?)/i;
                const matches = rowData.olculer.match(pattern);
                
                if (matches) {
                    const disCapElement = document.getElementById('disCap');
                    const icCapElement = document.getElementById('icCap');
                    const kalinlikElement = document.getElementById('kalinlik');
                    
                    if (disCapElement) disCapElement.value = matches[1];
                    if (icCapElement) icCapElement.value = matches[2];
                    if (kalinlikElement) kalinlikElement.value = matches[3];
                }
            }
            
            // Standart bilgisini ayarla
            if (rowData.enNormu) {
                const standartElement = document.getElementById('standart');
                if (standartElement) {
                    standartElement.value = rowData.enNormu;
                }
            }
            
            // Flanş adını ayarla (malzemeTuru'ndan)
            if (rowData.malzemeTuru && !document.getElementById('flansAdi').value) {
                document.getElementById('flansAdi').value = rowData.malzemeTuru;
            }
        }
    }

    // ApplicationController'a ek fonksiyonlar
    if (!window.ApplicationController.loadFlansTemplate) {
        window.ApplicationController.loadFlansTemplate = function() {
            const templateSelect = document.getElementById('ozelFlansTemplate');
            if (!templateSelect) return;
            
            const templateName = templateSelect.value;
            if (!templateName) return;
            
            const MaterialClass = window.MaterialRegistry.get('ozelFlans');
            const instance = new MaterialClass();
            const template = instance.templates[templateName];
            
            if (template) {
                const flansAdi = document.getElementById('flansAdi');
                const standart = document.getElementById('standart');
                const disCap = document.getElementById('disCap');
                const icCap = document.getElementById('icCap');
                const kalinlik = document.getElementById('kalinlik');
                const delikSayisi = document.getElementById('delikSayisi');
                const delikCapi = document.getElementById('delikCapi');
                const manuelAgirlik = document.getElementById('manuelAgirlik');
                
                if (flansAdi) flansAdi.value = template.flansAdi || '';
                if (standart) standart.value = template.standart || '';
                if (disCap) disCap.value = template.disCap || '';
                if (icCap) icCap.value = template.icCap || '';
                if (kalinlik) kalinlik.value = template.kalinlik || '';
                if (delikSayisi) delikSayisi.value = template.delikSayisi || '';
                if (delikCapi) delikCapi.value = template.delikCapi || '';
                if (manuelAgirlik) manuelAgirlik.value = template.manuelAgirlik || '';
            }
        };

        // GÜNCELLENEN FONKSİYON - alert() yerine custom modal
        window.ApplicationController.saveFlansAsTemplate = function() {
            const flansAdiElement = document.getElementById('flansAdi');
            if (!flansAdiElement) {
                if (window.ApplicationController.showCustomAlert) {
                    window.ApplicationController.showCustomAlert('Flanş adı alanı bulunamadı');
                }
                return;
            }
            
            const flansAdi = flansAdiElement.value;
            if (!flansAdi) {
                if (window.ApplicationController.showCustomAlert) {
                    window.ApplicationController.showCustomAlert('Lütfen önce flanş adı girin');
                }
                return;
            }
            
            const template = {
                flansAdi: flansAdi,
                standart: document.getElementById('standart')?.value || '',
                disCap: document.getElementById('disCap')?.value || '',
                icCap: document.getElementById('icCap')?.value || '',
                kalinlik: document.getElementById('kalinlik')?.value || '',
                delikSayisi: document.getElementById('delikSayisi')?.value || '',
                delikCapi: document.getElementById('delikCapi')?.value || '',
                manuelAgirlik: document.getElementById('manuelAgirlik')?.value || ''
            };
            
            const MaterialClass = window.MaterialRegistry.get('ozelFlans');
            const instance = new MaterialClass();
            instance.saveTemplate(flansAdi, template);
            
            // Select'i güncelle
            const select = document.getElementById('ozelFlansTemplate');
            if (select && !select.querySelector(`option[value="${flansAdi}"]`)) {
                const option = document.createElement('option');
                option.value = flansAdi;
                option.textContent = flansAdi;
                select.appendChild(option);
            }
            
            // CUSTOM MODAL İLE DEĞİŞTİRİLDİ
            if (window.ApplicationController.showCustomAlert) {
                window.ApplicationController.showCustomAlert('Şablon kaydedildi: ' + flansAdi);
            }
        };

        // ApplicationController'a silme fonksiyonu ekle
        if (!window.ApplicationController.deleteFlansTemplate) {
            window.ApplicationController.deleteFlansTemplate = function() {
                const templateSelect = document.getElementById('ozelFlansTemplate');
                const templateName = templateSelect.value;
                
                if (!templateName) {
                    alert('Lütfen silinecek şablonu seçin');
                    return;
                }
                
                const MaterialClass = window.MaterialRegistry.get('ozelFlans');
                const instance = new MaterialClass();
                const message = instance.getText('confirm_delete');
                
                window.ApplicationController.showCustomConfirmModal(
                    `${message}: ${templateName}`,
                    () => {
                        // Şablonu sil
                        delete instance.templates[templateName];
                        localStorage.setItem('ozelFlansTemplates', JSON.stringify(instance.templates));
                        
                        // Select'i güncelle
                        templateSelect.querySelector(`option[value="${templateName}"]`)?.remove();
                        templateSelect.value = '';
                        
                        // Formu temizle
                        ['flansAdi', 'standart', 'disCap', 'icCap', 'kalinlik', 
                        'delikSayisi', 'delikCapi', 'manuelAgirlik'].forEach(id => {
                            const element = document.getElementById(id);
                            if (element) element.value = '';
                        });
                        
                        alert(instance.getText('template_deleted') + ': ' + templateName);
                    }
                );
            };
        }
    }

    // Malzemeyi kaydet
    const ozelFlansMaterial = new OzelFlansMaterial();
    ozelFlansMaterial.register();

})(window);