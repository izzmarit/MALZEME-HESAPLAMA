/**
 * ÖZEL FLANŞ Malzeme Modülü
 * Versiyon: 1.0.0
 * Özel ölçülü flanş hesaplama modülü - Kayıt sistemi ile
 */

(function(window) {
    'use strict';
    
    class OzelFlansMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'ozel_flans';
            this.version = '1.0.0';
            
            this.texts = {
                tr: {
                    display_name: 'Özel Flanş',
                    dis_cap_label: 'Dış Çap (mm)',
                    ic_cap_label: 'İç Çap (mm)',
                    kalinlik_label: 'Kalınlık (mm)',
                    kayitli_flans_label: 'Kayıtlı Flanş Seç',
                    kayit_adi_label: 'Kayıt Adı',
                    validation_error: 'Lütfen tüm alanları doldurun',
                    validation_min_error: 'Değerler 0\'dan büyük olmalıdır',
                    validation_ic_cap_error: 'İç çap, dış çaptan küçük olmalıdır',
                    kayit_btn: 'Flanşı Kaydet',
                    kayit_sil_btn: 'Seçili Kaydı Sil',
                    kayit_basarili: 'Flanş kaydedildi',
                    kayit_silindi: 'Kayıt silindi',
                    kayit_adi_giriniz: 'Lütfen kayıt adı giriniz',
                    kayit_var: 'Bu isimde kayıt zaten var',
                    kayit_yok: 'Kayıtlı flanş bulunamadı',
                    manuel_giris: 'Manuel Giriş',
                    kayitli_sec: 'Kayıtlı Seç',
                    
                    // Malzeme grupları
                    group_pressure: 'Basınçlı Kap Çelikleri',
                    group_stainless: 'Paslanmaz Çelikler',
                    group_carbon: 'Karbon Çelikleri',
                    group_alloy: 'Alaşımlı Çelikler'
                },
                en: {
                    display_name: 'Custom Flange',
                    dis_cap_label: 'Outer Diameter (mm)',
                    ic_cap_label: 'Inner Diameter (mm)',
                    kalinlik_label: 'Thickness (mm)',
                    kayitli_flans_label: 'Select Saved Flange',
                    kayit_adi_label: 'Record Name',
                    validation_error: 'Please fill all fields',
                    validation_min_error: 'Values must be greater than 0',
                    validation_ic_cap_error: 'Inner diameter must be less than outer diameter',
                    kayit_btn: 'Save Flange',
                    kayit_sil_btn: 'Delete Selected',
                    kayit_basarili: 'Flange saved',
                    kayit_silindi: 'Record deleted',
                    kayit_adi_giriniz: 'Please enter record name',
                    kayit_var: 'Record with this name already exists',
                    kayit_yok: 'No saved flanges found',
                    manuel_giris: 'Manual Entry',
                    kayitli_sec: 'Select Saved',
                    
                    // Material groups
                    group_pressure: 'Pressure Vessel Steels',
                    group_stainless: 'Stainless Steels',
                    group_carbon: 'Carbon Steels',
                    group_alloy: 'Alloy Steels'
                }
            };
            
            // Malzeme tanımlamaları
            this.materials = {
                // Basınçlı Kap Çelikleri (EN)
                'P250GH': {
                    density: 7850,
                    standard: 'EN 10028-2',
                    group: 'pressure'
                },
                'P265GH': {
                    density: 7850,
                    standard: 'EN 10028-2',
                    group: 'pressure'
                },
                'P295GH': {
                    density: 7850,
                    standard: 'EN 10028-2',
                    group: 'pressure'
                },
                'P355GH': {
                    density: 7850,
                    standard: 'EN 10028-2',
                    group: 'pressure'
                },
                '16Mo3': {
                    density: 7850,
                    standard: 'EN 10028-2',
                    group: 'pressure'
                },
                '13CrMo4-5': {
                    density: 7850,
                    standard: 'EN 10028-2',
                    group: 'alloy'
                },
                '10CrMo9-10': {
                    density: 7850,
                    standard: 'EN 10028-2',
                    group: 'alloy'
                },
                
                // Paslanmaz Çelikler
                '1.4301': {
                    density: 7900,
                    standard: 'EN 10088-2',
                    group: 'stainless',
                    aisi: '304'
                },
                '1.4401': {
                    density: 7980,
                    standard: 'EN 10088-2',
                    group: 'stainless',
                    aisi: '316'
                },
                '1.4404': {
                    density: 7980,
                    standard: 'EN 10088-2',
                    group: 'stainless',
                    aisi: '316L'
                },
                '1.4571': {
                    density: 7980,
                    standard: 'EN 10088-2',
                    group: 'stainless',
                    aisi: '316Ti'
                },
                '1.4541': {
                    density: 7900,
                    standard: 'EN 10088-2',
                    group: 'stainless',
                    aisi: '321'
                },
                '1.4462': {
                    density: 7800,
                    standard: 'EN 10088-2',
                    group: 'stainless',
                    aisi: '2205'
                },
                
                // Karbon Çelikleri (ASTM)
                'A105': {
                    density: 7850,
                    standard: 'ASTM A105',
                    group: 'carbon'
                },
                'A350 LF2': {
                    density: 7850,
                    standard: 'ASTM A350',
                    group: 'carbon'
                },
                'A516 Gr.70': {
                    density: 7850,
                    standard: 'ASTM A516',
                    group: 'carbon'
                },
                
                // Paslanmaz Çelikler (ASTM)
                'A182 F304': {
                    density: 7900,
                    standard: 'ASTM A182',
                    group: 'stainless'
                },
                'A182 F316': {
                    density: 7980,
                    standard: 'ASTM A182',
                    group: 'stainless'
                },
                'A182 F316L': {
                    density: 7980,
                    standard: 'ASTM A182',
                    group: 'stainless'
                },
                'A182 F321': {
                    density: 7900,
                    standard: 'ASTM A182',
                    group: 'stainless'
                },
                'A182 F51': {
                    density: 7800,
                    standard: 'ASTM A182',
                    group: 'stainless'
                }
            };
            
            this.storageKey = 'ozel_flans_kayitlar';
            this.setupEventHandlers();
        }

        setupEventHandlers() {
            const self = this;
            
            window.OzelFlansHandlers = {
                onGirisTipiChange: function() {
                    const girisTipi = document.getElementById('of_giris_tipi').value;
                    
                    document.getElementById('of_manuelFields').style.display = 'none';
                    document.getElementById('of_kayitliFields').style.display = 'none';
                    
                    if (girisTipi === 'manuel') {
                        document.getElementById('of_manuelFields').style.display = 'block';
                    } else if (girisTipi === 'kayitli') {
                        document.getElementById('of_kayitliFields').style.display = 'block';
                        self.loadKayitliFlanslar();
                    }
                },
                
                onKayitliFlansChange: function() {
                    const selectedValue = document.getElementById('of_kayitli_secim').value;
                    
                    if (!selectedValue) return;
                    
                    const kayitlar = self.getKayitlar();
                    const kayit = kayitlar.find(k => k.id === selectedValue);
                    
                    if (kayit) {
                        document.getElementById('of_dis_cap').value = kayit.disCap;
                        document.getElementById('of_ic_cap').value = kayit.icCap;
                        document.getElementById('of_kalinlik').value = kayit.kalinlik;
                    }
                },
                
                kayitEkle: function() {
                    const disCap = parseFloat(document.getElementById('of_dis_cap').value);
                    const icCap = parseFloat(document.getElementById('of_ic_cap').value);
                    const kalinlik = parseFloat(document.getElementById('of_kalinlik').value);
                    const kayitAdi = document.getElementById('of_kayit_adi').value.trim();
                    
                    if (!kayitAdi) {
                        window.UIManager.showNotification(self.getText('kayit_adi_giriniz'), 'warning');
                        return;
                    }
                    
                    if (isNaN(disCap) || isNaN(icCap) || isNaN(kalinlik)) {
                        window.UIManager.showNotification(self.getText('validation_error'), 'warning');
                        return;
                    }
                    
                    if (disCap <= 0 || icCap <= 0 || kalinlik <= 0) {
                        window.UIManager.showNotification(self.getText('validation_min_error'), 'warning');
                        return;
                    }
                    
                    if (icCap >= disCap) {
                        window.UIManager.showNotification(self.getText('validation_ic_cap_error'), 'warning');
                        return;
                    }
                    
                    const kayitlar = self.getKayitlar();
                    
                    if (kayitlar.some(k => k.ad === kayitAdi)) {
                        window.UIManager.showNotification(self.getText('kayit_var'), 'warning');
                        return;
                    }
                    
                    const yeniKayit = {
                        id: Date.now().toString(),
                        ad: kayitAdi,
                        disCap: disCap,
                        icCap: icCap,
                        kalinlik: kalinlik,
                        tarih: new Date().toISOString()
                    };
                    
                    kayitlar.push(yeniKayit);
                    self.saveKayitlar(kayitlar);
                    
                    document.getElementById('of_kayit_adi').value = '';
                    
                    window.UIManager.showNotification(self.getText('kayit_basarili'), 'success');
                    
                    const girisTipi = document.getElementById('of_giris_tipi').value;
                    if (girisTipi === 'kayitli') {
                        self.loadKayitliFlanslar();
                    }
                },
                
                kayitSil: function() {
                    const selectedValue = document.getElementById('of_kayitli_secim').value;
                    
                    if (!selectedValue) {
                        window.UIManager.showNotification(self.getText('validation_error'), 'warning');
                        return;
                    }
                    
                    window.UIManager.confirmAction(
                        'Bu kaydı silmek istediğinizden emin misiniz?',
                        () => {
                            let kayitlar = self.getKayitlar();
                            kayitlar = kayitlar.filter(k => k.id !== selectedValue);
                            self.saveKayitlar(kayitlar);
                            
                            self.loadKayitliFlanslar();
                            
                            document.getElementById('of_dis_cap').value = '';
                            document.getElementById('of_ic_cap').value = '';
                            document.getElementById('of_kalinlik').value = '';
                            
                            window.UIManager.showNotification(self.getText('kayit_silindi'), 'success');
                        }
                    );
                }
            };
        }

        getKayitlar() {
            try {
                const data = localStorage.getItem(this.storageKey);
                return data ? JSON.parse(data) : [];
            } catch (error) {
                console.error('Kayıtlar okunamadı:', error);
                return [];
            }
        }

        saveKayitlar(kayitlar) {
            try {
                localStorage.setItem(this.storageKey, JSON.stringify(kayitlar));
            } catch (error) {
                console.error('Kayıtlar kaydedilemedi:', error);
                window.UIManager.showNotification('Kayıt hatası oluştu', 'error');
            }
        }

        loadKayitliFlanslar() {
            const selectElement = document.getElementById('of_kayitli_secim');
            const kayitlar = this.getKayitlar();
            const lang = this.getCurrentLanguage();
            
            selectElement.innerHTML = `<option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>`;
            
            if (kayitlar.length === 0) {
                selectElement.innerHTML += `<option value="" disabled>${this.getText('kayit_yok')}</option>`;
                return;
            }
            
            kayitlar.forEach(kayit => {
                const option = document.createElement('option');
                option.value = kayit.id;
                option.textContent = `${kayit.ad} (Ø${kayit.disCap} - Ø${kayit.icCap} ${kayit.kalinlik}mm)`;
                selectElement.appendChild(option);
            });
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="of_giris_tipi">
                            <span class="label-icon">📝</span> Giriş Tipi
                        </label>
                        <select id="of_giris_tipi" onchange="window.OzelFlansHandlers.onGirisTipiChange()">
                            <option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
                            <option value="manuel">${this.getText('manuel_giris')}</option>
                            <option value="kayitli">${this.getText('kayitli_sec')}</option>
                        </select>
                    </div>
                </div>
                
                <!-- Manuel Giriş Alanları -->
                <div id="of_manuelFields" style="display:none;">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="of_dis_cap">
                                <span class="label-icon">⭕</span> ${this.getText('dis_cap_label')}
                            </label>
                            <input type="number" id="of_dis_cap" min="0.1" step="0.1" 
                                   placeholder="${lang === 'tr' ? 'Dış çap değeri' : 'Outer diameter'}">
                        </div>
                        <div class="form-group">
                            <label for="of_ic_cap">
                                <span class="label-icon">⚪</span> ${this.getText('ic_cap_label')}
                            </label>
                            <input type="number" id="of_ic_cap" min="0.1" step="0.1" 
                                   placeholder="${lang === 'tr' ? 'İç çap değeri' : 'Inner diameter'}">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="of_kalinlik">
                                <span class="label-icon">📏</span> ${this.getText('kalinlik_label')}
                            </label>
                            <input type="number" id="of_kalinlik" min="0.1" step="0.1" 
                                   placeholder="${lang === 'tr' ? 'Kalınlık değeri' : 'Thickness'}">
                        </div>
                        <div class="form-group">
                            <label for="of_kayit_adi">
                                <span class="label-icon">💾</span> ${this.getText('kayit_adi_label')}
                            </label>
                            <input type="text" id="of_kayit_adi" 
                                   placeholder="${lang === 'tr' ? 'Kayıt adı (opsiyonel)' : 'Record name (optional)'}">
                        </div>
                    </div>
                    <div class="form-row">
                        <button type="button" class="btn btn-save-record" 
                                onclick="window.OzelFlansHandlers.kayitEkle()"
                                style="padding: 10px 20px; background: #48bb78; color: white; 
                                       border: none; border-radius: 6px; cursor: pointer; 
                                       font-weight: 600; transition: all 0.3s;">
                            <span style="margin-right: 5px;">💾</span> ${this.getText('kayit_btn')}
                        </button>
                    </div>
                </div>
                
                <!-- Kayıtlı Flanş Seçimi -->
                <div id="of_kayitliFields" style="display:none;">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="of_kayitli_secim">
                                <span class="label-icon">📋</span> ${this.getText('kayitli_flans_label')}
                            </label>
                            <select id="of_kayitli_secim" onchange="window.OzelFlansHandlers.onKayitliFlansChange()">
                                <option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group" style="display: flex; gap: 10px;">
                            <div style="flex: 1;">
                                <label>${this.getText('dis_cap_label')}</label>
                                <input type="number" id="of_dis_cap" readonly 
                                       style="background: #f7fafc; cursor: not-allowed;">
                            </div>
                            <div style="flex: 1;">
                                <label>${this.getText('ic_cap_label')}</label>
                                <input type="number" id="of_ic_cap" readonly 
                                       style="background: #f7fafc; cursor: not-allowed;">
                            </div>
                            <div style="flex: 1;">
                                <label>${this.getText('kalinlik_label')}</label>
                                <input type="number" id="of_kalinlik" readonly 
                                       style="background: #f7fafc; cursor: not-allowed;">
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <button type="button" class="btn btn-delete-record" 
                                onclick="window.OzelFlansHandlers.kayitSil()"
                                style="padding: 10px 20px; background: #f56565; color: white; 
                                       border: none; border-radius: 6px; cursor: pointer; 
                                       font-weight: 600; transition: all 0.3s;">
                            <span style="margin-right: 5px;">🗑️</span> ${this.getText('kayit_sil_btn')}
                        </button>
                    </div>
                </div>
            `;
        }

        getGrades() {
            const grades = [];
            const lang = this.getCurrentLanguage();
            
            const groups = {
                'pressure': this.getText('group_pressure'),
                'carbon': this.getText('group_carbon'),
                'alloy': this.getText('group_alloy'),
                'stainless': this.getText('group_stainless')
            };
            
            Object.entries(groups).forEach(([groupKey, groupName]) => {
                const groupMaterials = Object.keys(this.materials).filter(
                    mat => this.materials[mat].group === groupKey
                );
                
                if (groupMaterials.length > 0) {
                    grades.push({
                        text: groupName,
                        value: '',
                        disabled: true
                    });
                    
                    groupMaterials.forEach(material => {
                        let displayText = material;
                        if (this.materials[material].aisi) {
                            displayText += ` (${this.materials[material].aisi})`;
                        }
                        
                        grades.push({
                            text: displayText,
                            value: material,
                            disabled: false
                        });
                    });
                }
            });
            
            return grades;
        }

        getDensity(grade) {
            return this.materials[grade]?.density || 7850;
        }

        getStandard(grade) {
            return this.materials[grade]?.standard || '-';
        }

        calculate(formData) {
            const disCap = parseFloat(formData.of_dis_cap) || 0;
            const icCap = parseFloat(formData.of_ic_cap) || 0;
            const kalinlik = parseFloat(formData.of_kalinlik) || 0;
            const malzemeCinsi = formData.malzemeCinsi;
            const adet = parseFloat(formData.adet) || 1;
            
            if (disCap <= 0 || icCap <= 0 || kalinlik <= 0) {
                return null;
            }
            
            const density = this.materials[malzemeCinsi]?.density || 7850;
            
            // Dış çap alanı
            const disYaricap = disCap / 2;
            const disAlan = Math.PI * disYaricap * disYaricap;
            
            // İç çap alanı
            const icYaricap = icCap / 2;
            const icAlan = Math.PI * icYaricap * icYaricap;
            
            // Net alan (mm²)
            const netAlan = disAlan - icAlan;
            
            // Hacim (mm³)
            const hacimMm3 = netAlan * kalinlik;
            
            // Hacmi m³'e çevir
            const hacimM3 = hacimMm3 / 1000000000;
            
            // Ağırlık hesapla (kg)
            const birimAgirlik = hacimM3 * density;
            const toplamAgirlik = birimAgirlik * adet;
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                suHacmi: null
            };
        }

        validate(formData) {
            const disCap = formData.of_dis_cap;
            const icCap = formData.of_ic_cap;
            const kalinlik = formData.of_kalinlik;
            
            if (disCap === undefined || disCap === null || disCap === '' ||
                icCap === undefined || icCap === null || icCap === '' ||
                kalinlik === undefined || kalinlik === null || kalinlik === '') {
                return { 
                    isValid: false, 
                    message: this.getText('validation_error') 
                };
            }
            
            const disCapNum = parseFloat(disCap);
            const icCapNum = parseFloat(icCap);
            const kalinlikNum = parseFloat(kalinlik);
            
            if (isNaN(disCapNum) || isNaN(icCapNum) || isNaN(kalinlikNum)) {
                return { 
                    isValid: false, 
                    message: this.getText('validation_error') 
                };
            }
            
            if (disCapNum <= 0 || icCapNum <= 0 || kalinlikNum <= 0) {
                return { 
                    isValid: false, 
                    message: this.getText('validation_min_error') 
                };
            }
            
            if (icCapNum >= disCapNum) {
                return { 
                    isValid: false, 
                    message: this.getText('validation_ic_cap_error') 
                };
            }
            
            return { isValid: true };
        }
        
        formatDimensions(formData) {
            const disCap = parseFloat(formData.of_dis_cap) || 0;
            const icCap = parseFloat(formData.of_ic_cap) || 0;
            const kalinlik = parseFloat(formData.of_kalinlik) || 0;
            
            const disCapStr = disCap % 1 === 0 ? disCap.toString() : disCap.toFixed(1);
            const icCapStr = icCap % 1 === 0 ? icCap.toString() : icCap.toFixed(1);
            const kalinlikStr = kalinlik % 1 === 0 ? kalinlik.toString() : kalinlik.toFixed(1);
            
            return `Ø${disCapStr} - Ø${icCapStr} ${kalinlikStr}mm`;
        }

        getDisplayName() {
            return this.getText('display_name');
        }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            
            baseRow.malzemeTuru = this.getDisplayName();
            
            const material = this.materials[formData.malzemeCinsi];
            if (material) {
                baseRow.enNormu = material.standard;
            }
            
            baseRow.metadata = {
                ...baseRow.metadata,
                ozel_flans: {
                    giris_tipi: formData.of_giris_tipi,
                    dis_cap: formData.of_dis_cap,
                    ic_cap: formData.of_ic_cap,
                    kalinlik: formData.of_kalinlik,
                    kayitli_secim: formData.of_kayitli_secim,
                    yogunluk: material?.density
                }
            };
            
            return baseRow;
        }

        fillFormFromRow(rowData) {
            super.fillFormFromRow(rowData);
            
            const metadata = rowData.metadata?.ozel_flans;
            if (!metadata) {
                if (rowData.formData) {
                    this.fillFromFormData(rowData.formData);
                }
                return true;
            }
            
            setTimeout(() => {
                const girisTipiElement = document.getElementById('of_giris_tipi');
                if (girisTipiElement && metadata.giris_tipi) {
                    girisTipiElement.value = metadata.giris_tipi;
                    window.OzelFlansHandlers.onGirisTipiChange();
                }
                
                setTimeout(() => {
                    if (metadata.giris_tipi === 'manuel') {
                        const disCapEl = document.getElementById('of_dis_cap');
                        const icCapEl = document.getElementById('of_ic_cap');
                        const kalinlikEl = document.getElementById('of_kalinlik');
                        
                        if (disCapEl && metadata.dis_cap) disCapEl.value = metadata.dis_cap;
                        if (icCapEl && metadata.ic_cap) icCapEl.value = metadata.ic_cap;
                        if (kalinlikEl && metadata.kalinlik) kalinlikEl.value = metadata.kalinlik;
                        
                    } else if (metadata.giris_tipi === 'kayitli') {
                        const kayitliSecimEl = document.getElementById('of_kayitli_secim');
                        if (kayitliSecimEl && metadata.kayitli_secim) {
                            kayitliSecimEl.value = metadata.kayitli_secim;
                            window.OzelFlansHandlers.onKayitliFlansChange();
                        }
                    }
                }, 150);
            }, 100);
            
            return true;
        }
        
        fillFromFormData(formData) {
            setTimeout(() => {
                Object.keys(formData).forEach(key => {
                    const element = document.getElementById(key);
                    if (element) {
                        element.value = formData[key];
                        
                        if (key === 'of_giris_tipi') {
                            window.OzelFlansHandlers.onGirisTipiChange();
                        } else if (key === 'of_kayitli_secim') {
                            setTimeout(() => window.OzelFlansHandlers.onKayitliFlansChange(), 50);
                        }
                    }
                });
            }, 100);
        }
    }

    const ozelFlansMaterial = new OzelFlansMaterial();
    ozelFlansMaterial.register();
    
    console.log('Özel Flanş modülü v1.0.0 yüklendi (Kayıt sistemi ile)');

})(window);