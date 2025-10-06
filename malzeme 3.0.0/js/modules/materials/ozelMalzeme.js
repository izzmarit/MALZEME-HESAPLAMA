/**
 * ÖZEL MALZEME Modülü
 * Kullanıcı tanımlı özel malzemeler
 */

(function(window) {
    'use strict';
    
    class OzelMalzemeMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'ozelMalzeme';
            
            // Dil metinleri
            this.texts = {
                tr: {
                    display_name: 'Özel Malzeme',
                    malzeme_adi_label: 'Malzeme Adı',
                    malzeme_tipi_label: 'Hesaplama Tipi',
                    standart_label: 'Standart/Özellik',
                    birim_label: 'Birim',
                    yogunluk_label: 'Yoğunluk (kg/m³)',
                    birim_agirlik_label: 'Birim Ağırlık',
                    // Ölçü alanları
                    olcu1_label: 'Ölçü 1',
                    olcu2_label: 'Ölçü 2',
                    olcu3_label: 'Ölçü 3',
                    olcu4_label: 'Ölçü 4',
                    uzunluk_label: 'Uzunluk (mm)',
                    adet_override_label: 'Adet',
                    // Placeholder'lar
                    malzeme_adi_placeholder: 'Örn: Özel Conta, İzolasyon vb.',
                    standart_placeholder: 'Örn: DIN, ASTM, Özel vb.',
                    yogunluk_placeholder: 'Malzeme yoğunluğu',
                    birim_agirlik_placeholder: 'kg/m, kg/m², kg/adet',
                    olcu_placeholder: 'Ölçü değeri (mm)',
                    // Seçenekler
                    hacim_tabanli: 'Hacim Tabanlı (Ölçü x Yoğunluk)',
                    birim_tabanli: 'Birim Ağırlık Tabanlı',
                    select_type: 'Hesaplama tipi seçin',
                    select_unit: 'Birim seçin',
                    // Birimler
                    kg_m: 'kg/m (Uzunluk)',
                    kg_m2: 'kg/m² (Alan)',
                    kg_adet: 'kg/adet (Parça)',
                    kg_m3: 'kg/m³ (Hacim)',
                    // Diğer
                    validation_error: 'Zorunlu alanlar doldurulmalıdır',
                    save_material: 'Malzemeyi Kaydet',
                    load_material: 'Kayıtlı Malzeme',
                    select_material: 'Kayıtlı malzeme seçin',
                    olcu_tanimi: 'Ölçü Tanımları',
                    define_dimensions: 'Ölçü isimlerini tanımlayın'
                },
                en: {
                    display_name: 'Custom Material',
                    malzeme_adi_label: 'Material Name',
                    malzeme_tipi_label: 'Calculation Type',
                    standart_label: 'Standard/Specification',
                    birim_label: 'Unit',
                    yogunluk_label: 'Density (kg/m³)',
                    birim_agirlik_label: 'Unit Weight',
                    // Dimension fields
                    olcu1_label: 'Dimension 1',
                    olcu2_label: 'Dimension 2',
                    olcu3_label: 'Dimension 3',
                    olcu4_label: 'Dimension 4',
                    uzunluk_label: 'Length (mm)',
                    adet_override_label: 'Quantity',
                    // Placeholders
                    malzeme_adi_placeholder: 'E.g: Custom Gasket, Insulation etc.',
                    standart_placeholder: 'E.g: DIN, ASTM, Custom etc.',
                    yogunluk_placeholder: 'Material density',
                    birim_agirlik_placeholder: 'kg/m, kg/m², kg/piece',
                    olcu_placeholder: 'Dimension value (mm)',
                    // Options
                    hacim_tabanli: 'Volume Based (Dimension x Density)',
                    birim_tabanli: 'Unit Weight Based',
                    select_type: 'Select calculation type',
                    select_unit: 'Select unit',
                    // Units
                    kg_m: 'kg/m (Length)',
                    kg_m2: 'kg/m² (Area)',
                    kg_adet: 'kg/piece (Item)',
                    kg_m3: 'kg/m³ (Volume)',
                    // Other
                    validation_error: 'Required fields must be filled',
                    save_material: 'Save Material',
                    load_material: 'Saved Material',
                    select_material: 'Select saved material',
                    olcu_tanimi: 'Dimension Definitions',
                    define_dimensions: 'Define dimension names'
                }
            };
            
            // Malzeme cinsleri (Özel malzemeler için genel liste)
            this.grades = [
                'Çelik', 'Paslanmaz', 'Alüminyum', 'Bakır', 'Pirinç',
                'Plastik', 'Kauçuk', 'Kompozit', 'İzolasyon', 'Özel'
            ];
            
            // Yoğunluklar
            this.densities = {
                'Çelik': 7850,
                'Paslanmaz': 8000,
                'Alüminyum': 2700,
                'Bakır': 8960,
                'Pirinç': 8470,
                'Plastik': 1200,
                'Kauçuk': 1500,
                'Kompozit': 1800,
                'İzolasyon': 100,
                'Özel': 1000
            };
            
            // Standartlar
            this.standards = {
                'Çelik': 'Özel',
                'Paslanmaz': 'Özel',
                'Alüminyum': 'Özel',
                'Bakır': 'Özel',
                'Pirinç': 'Özel',
                'Plastik': 'Özel',
                'Kauçuk': 'Özel',
                'Kompozit': 'Özel',
                'İzolasyon': 'Özel',
                'Özel': 'Özel'
            };
            
            // Kayıtlı özel malzemeler
            this.loadCustomMaterials();
        }

        loadCustomMaterials() {
            const stored = localStorage.getItem('ozelMalzemeler');
            this.customMaterials = stored ? JSON.parse(stored) : {};
        }

        saveMaterial(name, data) {
            this.customMaterials[name] = data;
            localStorage.setItem('ozelMalzemeler', JSON.stringify(this.customMaterials));
        }

        createGradeSelector() {
            return `<input type="text" id="malzemeCinsi" placeholder="Malzeme cinsi yazın" />`;
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="kayitliMalzeme">${this.getText('load_material')}</label>
                        <select id="kayitliMalzeme" onchange="window.ApplicationController.loadCustomMaterial()">
                            <option value="">${this.getText('select_material')}</option>
                            ${Object.keys(this.customMaterials).map(name => 
                                `<option value="${name}">${name}</option>`
                            ).join('')}
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="malzemeAdi">${this.getText('malzeme_adi_label')} *</label>
                        <input type="text" id="malzemeAdi" 
                               placeholder="${this.getText('malzeme_adi_placeholder')}" required>
                    </div>
                    <div class="form-group">
                        <label for="malzemeTipiSecim">${this.getText('malzeme_tipi_label')} *</label>
                        <select id="malzemeTipiSecim" onchange="window.ApplicationController.updateOzelMalzemeTipi()" required>
                            <option value="">${this.getText('select_type')}</option>
                            <option value="hacim">${this.getText('hacim_tabanli')}</option>
                            <option value="birim">${this.getText('birim_tabanli')}</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="standartOzel">${this.getText('standart_label')}</label>
                        <input type="text" id="standartOzel" 
                               placeholder="${this.getText('standart_placeholder')}">
                    </div>
                </div>
                
                <!-- Hacim tabanlı alanlar -->
                <div id="hacimTabanliAlanlar" style="display: none;">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="yogunlukOzel">${this.getText('yogunluk_label')} *</label>
                            <input type="number" id="yogunlukOzel" 
                                   placeholder="${this.getText('yogunluk_placeholder')}" 
                                   min="0" step="any" value="7850">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>${this.getText('olcu_tanimi')}</label>
                            <small style="color: #718096;">${this.getText('define_dimensions')}</small>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <input type="text" id="olcu1_label" placeholder="Ölçü 1 adı (örn: En)" style="margin-bottom: 5px;">
                            <input type="number" id="olcu1" placeholder="${this.getText('olcu_placeholder')}" min="0" step="any">
                        </div>
                        <div class="form-group">
                            <input type="text" id="olcu2_label" placeholder="Ölçü 2 adı (örn: Boy)" style="margin-bottom: 5px;">
                            <input type="number" id="olcu2" placeholder="${this.getText('olcu_placeholder')}" min="0" step="any">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <input type="text" id="olcu3_label" placeholder="Ölçü 3 adı (örn: Kalınlık)" style="margin-bottom: 5px;">
                            <input type="number" id="olcu3" placeholder="${this.getText('olcu_placeholder')}" min="0" step="any">
                        </div>
                        <div class="form-group">
                            <input type="text" id="olcu4_label" placeholder="Ölçü 4 adı (opsiyonel)" style="margin-bottom: 5px;">
                            <input type="number" id="olcu4" placeholder="${this.getText('olcu_placeholder')}" min="0" step="any">
                        </div>
                    </div>
                </div>
                
                <!-- Birim ağırlık tabanlı alanlar -->
                <div id="birimTabanliAlanlar" style="display: none;">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="birimSecim">${this.getText('birim_label')} *</label>
                            <select id="birimSecim" onchange="window.ApplicationController.updateBirimFields()" required>
                                <option value="">${this.getText('select_unit')}</option>
                                <option value="kg/m">${this.getText('kg_m')}</option>
                                <option value="kg/m2">${this.getText('kg_m2')}</option>
                                <option value="kg/adet">${this.getText('kg_adet')}</option>
                                <option value="kg/m3">${this.getText('kg_m3')}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="birimAgirlikOzel">${this.getText('birim_agirlik_label')} *</label>
                            <input type="number" id="birimAgirlikOzel" 
                                   placeholder="${this.getText('birim_agirlik_placeholder')}" 
                                   min="0" step="any" required>
                        </div>
                    </div>
                    <div id="birimOlcuAlanlari">
                        <!-- Birim tipine göre dinamik olarak doldurulacak -->
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <button type="button" class="btn btn-secondary" onclick="window.ApplicationController.saveCustomMaterial()">
                            ${this.getText('save_material')}
                        </button>
                    </div>
                </div>
            `;
        }

        calculate(formData) {
            const malzemeAdi = formData.malzemeAdi || '';
            const malzemeTipiSecim = formData.malzemeTipiSecim || '';
            const adet = parseFloat(formData.adet) || 1;
            const malzemeCinsi = formData.malzemeCinsi || 'Özel';
            
            if (!malzemeAdi || !malzemeTipiSecim) {
                return null;
            }
            
            let birimAgirlik = 0;
            
            if (malzemeTipiSecim === 'hacim') {
                // Hacim tabanlı hesaplama
                const yogunluk = parseFloat(formData.yogunlukOzel) || this.getDensity(malzemeCinsi);
                const olcu1 = parseFloat(formData.olcu1) || 0;
                const olcu2 = parseFloat(formData.olcu2) || 0;
                const olcu3 = parseFloat(formData.olcu3) || 0;
                const olcu4 = parseFloat(formData.olcu4) || 1;
                
                // Hacim hesaplama (basit çarpım, özelleştirilebilir)
                let hacimMm3 = 1;
                if (olcu1) hacimMm3 *= olcu1;
                if (olcu2) hacimMm3 *= olcu2;
                if (olcu3) hacimMm3 *= olcu3;
                if (olcu4 > 0) hacimMm3 *= olcu4;
                
                const hacimM3 = hacimMm3 / 1000000000;
                birimAgirlik = hacimM3 * yogunluk;
                
            } else if (malzemeTipiSecim === 'birim') {
                // Birim ağırlık tabanlı hesaplama
                const birimAgirlikOzel = parseFloat(formData.birimAgirlikOzel) || 0;
                const birimSecim = formData.birimSecim || '';
                
                if (!birimAgirlikOzel) return null;
                
                if (birimSecim === 'kg/m') {
                    const uzunluk = parseFloat(formData.uzunluk) || 1000;
                    birimAgirlik = birimAgirlikOzel * (uzunluk / 1000);
                } else if (birimSecim === 'kg/m2') {
                    const en = parseFloat(formData.en) || 1000;
                    const boy = parseFloat(formData.boy) || 1000;
                    const alanM2 = (en * boy) / 1000000;
                    birimAgirlik = birimAgirlikOzel * alanM2;
                } else if (birimSecim === 'kg/adet') {
                    birimAgirlik = birimAgirlikOzel;
                } else if (birimSecim === 'kg/m3') {
                    const en = parseFloat(formData.en) || 1000;
                    const boy = parseFloat(formData.boy) || 1000;
                    const yukseklik = parseFloat(formData.yukseklik) || 1000;
                    const hacimM3 = (en * boy * yukseklik) / 1000000000;
                    birimAgirlik = birimAgirlikOzel * hacimM3;
                }
            }
            
            const toplamAgirlik = birimAgirlik * adet;
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                suHacmi: null
            };
        }

        validate(formData) {
            const malzemeAdi = formData.malzemeAdi || '';
            const malzemeTipiSecim = formData.malzemeTipiSecim || '';
            
            if (!malzemeAdi || !malzemeTipiSecim) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            return { isValid: true };
        }

        formatDimensions(formData) {
            const malzemeTipiSecim = formData.malzemeTipiSecim || '';
            
            if (malzemeTipiSecim === 'hacim') {
                const parts = [];
                if (formData.olcu1) parts.push(formData.olcu1);
                if (formData.olcu2) parts.push(formData.olcu2);
                if (formData.olcu3) parts.push(formData.olcu3);
                if (parts.length > 0) {
                    return `${parts.join('x')}mm`;
                }
            } else if (malzemeTipiSecim === 'birim') {
                // Birim ağırlık tabanlı için ölçüleri göster
                if (formData.birimSecim === 'kg/m' && formData.uzunluk) {
                    return `L:${formData.uzunluk}mm`;
                } else if (formData.birimSecim === 'kg/m2' && formData.en && formData.boy) {
                    return `${formData.en}x${formData.boy}mm`;
                }
                // Diğer durumlar için kullanıcının girdiği değerleri kullan
                return formData.customOlcu || '-';
            }
            
            return '-';
        }

        // Override formatRow
        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            baseRow.malzemeTuru = formData.malzemeAdi; // Girilen adı kullan
            baseRow.enNormu = formData.standartOzel || 'Özel';
            return baseRow;
        }

        fillSpecificFields(rowData) {
            if (rowData.formData) {
                const malzemeAdiElement = document.getElementById('malzemeAdi');
                if (malzemeAdiElement && rowData.malzemeTuru) {
                    malzemeAdiElement.value = rowData.malzemeTuru;
                }
                
                const malzemeTipiElement = document.getElementById('malzemeTipiSecim');
                if (malzemeTipiElement && rowData.formData.malzemeTipiSecim) {
                    malzemeTipiElement.value = rowData.formData.malzemeTipiSecim;
                    window.ApplicationController.updateOzelMalzemeTipi();
                    
                    setTimeout(() => {
                        if (rowData.formData.malzemeTipiSecim === 'hacim') {
                            const hacimFields = ['yogunlukOzel', 'olcu1', 'olcu2', 'olcu3', 'olcu4'];
                            const labelFields = ['olcu1_label', 'olcu2_label', 'olcu3_label', 'olcu4_label'];
                            
                            hacimFields.forEach(field => {
                                const element = document.getElementById(field);
                                if (element && rowData.formData[field] !== undefined) {
                                    element.value = rowData.formData[field];
                                }
                            });
                            
                            labelFields.forEach(field => {
                                const element = document.getElementById(field);
                                if (element && rowData.formData[field]) {
                                    element.value = rowData.formData[field];
                                }
                            });
                        } else if (rowData.formData.malzemeTipiSecim === 'birim') {
                            const birimElement = document.getElementById('birimSecim');
                            if (birimElement && rowData.formData.birimSecim) {
                                birimElement.value = rowData.formData.birimSecim;
                                window.ApplicationController.updateBirimFields();
                                
                                setTimeout(() => {
                                    const birimAgirlikElement = document.getElementById('birimAgirlikOzel');
                                    if (birimAgirlikElement && rowData.formData.birimAgirlikOzel) {
                                        birimAgirlikElement.value = rowData.formData.birimAgirlikOzel;
                                    }
                                    
                                    const birimFieldsMap = {
                                        'kg/m': ['uzunluk', 'customOlcu'],
                                        'kg/m2': ['en', 'boy', 'customOlcu'],
                                        'kg/m3': ['en', 'boy', 'yukseklik', 'customOlcu'],
                                        'kg/adet': ['customOlcu']
                                    };
                                    
                                    const fields = birimFieldsMap[rowData.formData.birimSecim] || [];
                                    fields.forEach(field => {
                                        const element = document.getElementById(field);
                                        if (element && rowData.formData[field] !== undefined) {
                                            element.value = rowData.formData[field];
                                        }
                                    });
                                }, 100);
                            }
                        }
                        
                        const standartElement = document.getElementById('standartOzel');
                        if (standartElement && rowData.formData.standartOzel) {
                            standartElement.value = rowData.formData.standartOzel;
                        }
                    }, 100);
                }
            }
            
            if (rowData.olculer && rowData.olculer !== '-') {
                const customOlcuElement = document.getElementById('customOlcu');
                if (customOlcuElement && !customOlcuElement.value) {
                    customOlcuElement.value = rowData.olculer;
                }
            }
        }
    }

    // ApplicationController'a ek fonksiyonlar
    if (!window.ApplicationController.updateOzelMalzemeTipi) {
        window.ApplicationController.updateOzelMalzemeTipi = function() {
            const tip = document.getElementById('malzemeTipiSecim').value;
            const hacimDiv = document.getElementById('hacimTabanliAlanlar');
            const birimDiv = document.getElementById('birimTabanliAlanlar');
            
            if (tip === 'hacim') {
                hacimDiv.style.display = 'block';
                birimDiv.style.display = 'none';
            } else if (tip === 'birim') {
                hacimDiv.style.display = 'none';
                birimDiv.style.display = 'block';
            } else {
                hacimDiv.style.display = 'none';
                birimDiv.style.display = 'none';
            }
        };
        
        window.ApplicationController.updateBirimFields = function() {
            const birim = document.getElementById('birimSecim').value;
            const container = document.getElementById('birimOlcuAlanlari');
            
            let html = '';
            
            if (birim === 'kg/m') {
                html = `
                    <div class="form-row">
                        <div class="form-group">
                            <label>Uzunluk (mm)</label>
                            <input type="number" id="uzunluk" placeholder="Uzunluk değeri" min="0" step="any" value="1000">
                        </div>
                        <div class="form-group">
                            <label>Özel Ölçü Açıklaması</label>
                            <input type="text" id="customOlcu" placeholder="Örn: L:1000mm" maxlength="50">
                        </div>
                    </div>
                `;
            } else if (birim === 'kg/m2') {
                html = `
                    <div class="form-row">
                        <div class="form-group">
                            <label>En (mm)</label>
                            <input type="number" id="en" placeholder="En değeri" min="0" step="any" value="1000">
                        </div>
                        <div class="form-group">
                            <label>Boy (mm)</label>
                            <input type="number" id="boy" placeholder="Boy değeri" min="0" step="any" value="1000">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Özel Ölçü Açıklaması</label>
                            <input type="text" id="customOlcu" placeholder="Örn: 1000x1000mm" maxlength="50">
                        </div>
                    </div>
                `;
            } else if (birim === 'kg/m3') {
                html = `
                    <div class="form-row">
                        <div class="form-group">
                            <label>En (mm)</label>
                            <input type="number" id="en" placeholder="En değeri" min="0" step="any" value="1000">
                        </div>
                        <div class="form-group">
                            <label>Boy (mm)</label>
                            <input type="number" id="boy" placeholder="Boy değeri" min="0" step="any" value="1000">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Yükseklik (mm)</label>
                            <input type="number" id="yukseklik" placeholder="Yükseklik değeri" min="0" step="any" value="1000">
                        </div>
                        <div class="form-group">
                            <label>Özel Ölçü Açıklaması</label>
                            <input type="text" id="customOlcu" placeholder="Örn: 1000x1000x1000mm" maxlength="50">
                        </div>
                    </div>
                `;
            } else if (birim === 'kg/adet') {
                html = `
                    <div class="form-row">
                        <div class="form-group">
                            <label>Özel Ölçü Açıklaması</label>
                            <input type="text" id="customOlcu" placeholder="Örn: Özel parça, 50x30x10mm" maxlength="100">
                        </div>
                    </div>
                `;
            }
            
            container.innerHTML = html;
            
            // Yeni input alanlarını aktifleştir
            setTimeout(() => {
                const inputs = container.querySelectorAll('input');
                inputs.forEach(input => {
                    if (window.EventManager) {
                        window.EventManager.activateElement(input);
                    }
                });
            }, 50);
        };
        
        window.ApplicationController.loadCustomMaterial = function() {
            const materialName = document.getElementById('kayitliMalzeme').value;
            if (!materialName) return;
            
            const MaterialClass = window.MaterialRegistry.get('ozelMalzeme');
            const instance = new MaterialClass();
            const material = instance.customMaterials[materialName];
            
            if (material) {
                document.getElementById('malzemeAdi').value = material.malzemeAdi || '';
                document.getElementById('malzemeTipiSecim').value = material.malzemeTipiSecim || '';
                document.getElementById('standartOzel').value = material.standart || '';
                
                // Tip değişimini tetikle
                window.ApplicationController.updateOzelMalzemeTipi();
                
                // Tip bazlı alanları doldur
                setTimeout(() => {
                    if (material.malzemeTipiSecim === 'hacim') {
                        document.getElementById('yogunlukOzel').value = material.yogunluk || '';
                        if (material.olcu1_label) document.getElementById('olcu1_label').value = material.olcu1_label;
                        if (material.olcu2_label) document.getElementById('olcu2_label').value = material.olcu2_label;
                        if (material.olcu3_label) document.getElementById('olcu3_label').value = material.olcu3_label;
                        if (material.olcu4_label) document.getElementById('olcu4_label').value = material.olcu4_label;
                    } else if (material.malzemeTipiSecim === 'birim') {
                        document.getElementById('birimSecim').value = material.birimSecim || '';
                        document.getElementById('birimAgirlikOzel').value = material.birimAgirlik || '';
                        window.ApplicationController.updateBirimFields();
                    }
                }, 100);
            }
        };
        
        window.ApplicationController.saveCustomMaterial = function() {
            const malzemeAdi = document.getElementById('malzemeAdi').value;
            if (!malzemeAdi) {
                alert('Lütfen malzeme adı girin');
                return;
            }
            
            const material = {
                malzemeAdi: malzemeAdi,
                malzemeTipiSecim: document.getElementById('malzemeTipiSecim').value,
                standart: document.getElementById('standartOzel').value
            };
            
            if (material.malzemeTipiSecim === 'hacim') {
                material.yogunluk = document.getElementById('yogunlukOzel').value;
                material.olcu1_label = document.getElementById('olcu1_label').value;
                material.olcu2_label = document.getElementById('olcu2_label').value;
                material.olcu3_label = document.getElementById('olcu3_label').value;
                material.olcu4_label = document.getElementById('olcu4_label').value;
            } else if (material.malzemeTipiSecim === 'birim') {
                material.birimSecim = document.getElementById('birimSecim').value;
                material.birimAgirlik = document.getElementById('birimAgirlikOzel').value;
            }
            
            const MaterialClass = window.MaterialRegistry.get('ozelMalzeme');
            const instance = new MaterialClass();
            instance.saveMaterial(malzemeAdi, material);
            
            // Select'i güncelle
            const select = document.getElementById('kayitliMalzeme');
            if (!select.querySelector(`option[value="${malzemeAdi}"]`)) {
                const option = document.createElement('option');
                option.value = malzemeAdi;
                option.textContent = malzemeAdi;
                select.appendChild(option);
            }
            
            alert('Malzeme kaydedildi: ' + malzemeAdi);
        };
    }

    // Malzemeyi kaydet
    const ozelMalzemeMaterial = new OzelMalzemeMaterial();
    ozelMalzemeMaterial.register();

})(window);