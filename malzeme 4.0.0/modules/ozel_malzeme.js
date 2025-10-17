/**
 * ÖZEL MALZEME Modülü
 * Versiyon: 1.0.0
 * Özel kullanım senaryoları için serbest malzeme tanımlama modülü
 */

(function(window) {
    'use strict';
    
    class OzelMalzemeMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'ozel_malzeme';
            this.version = '1.0.0';
            
            this.texts = {
                tr: {
                    display_name: 'Özel Malzeme',
                    malzeme_adi_label: 'Malzeme Adı',
                    malzeme_cinsi_label: 'Malzeme Cinsi',
                    olculer_label: 'Ölçüler',
                    standart_label: 'Standart',
                    birim_agirlik_label: 'Birim Ağırlık (kg)',
                    kayitli_malzeme_label: 'Kayıtlı Malzeme Seç',
                    kayit_adi_label: 'Kayıt Adı',
                    validation_error: 'Lütfen tüm alanları doldurun',
                    validation_min_error: 'Birim ağırlık 0\'dan büyük olmalıdır',
                    validation_giris_tipi_error: 'Lütfen giriş tipini seçin',
                    kayit_btn: 'Malzemeyi Kaydet',
                    kayit_sil_btn: 'Seçili Kaydı Sil',
                    kayit_basarili: 'Malzeme kaydedildi',
                    kayit_silindi: 'Kayıt silindi',
                    kayit_adi_giriniz: 'Lütfen kayıt adı giriniz',
                    kayit_var: 'Bu isimde kayıt zaten var',
                    kayit_yok: 'Kayıtlı malzeme bulunamadı',
                    manuel_giris: 'Manuel Giriş',
                    kayitli_sec: 'Kayıtlı Seç'
                },
                en: {
                    display_name: 'Custom Material',
                    malzeme_adi_label: 'Material Name',
                    malzeme_cinsi_label: 'Material Grade',
                    olculer_label: 'Dimensions',
                    standart_label: 'Standard',
                    birim_agirlik_label: 'Unit Weight (kg)',
                    kayitli_malzeme_label: 'Select Saved Material',
                    kayit_adi_label: 'Record Name',
                    validation_error: 'Please fill all fields',
                    validation_min_error: 'Unit weight must be greater than 0',
                    validation_giris_tipi_error: 'Please select input type',
                    kayit_btn: 'Save Material',
                    kayit_sil_btn: 'Delete Selected',
                    kayit_basarili: 'Material saved',
                    kayit_silindi: 'Record deleted',
                    kayit_adi_giriniz: 'Please enter record name',
                    kayit_var: 'Record with this name already exists',
                    kayit_yok: 'No saved materials found',
                    manuel_giris: 'Manual Entry',
                    kayitli_sec: 'Select Saved'
                }
            };
            
            this.storageKey = 'ozel_malzeme_kayitlar';
            this.setupEventHandlers();
        }

        setupEventHandlers() {
            const self = this;
            
            window.OzelMalzemeHandlers = {
                onGirisTipiChange: function() {
                    const girisTipi = document.getElementById('om_giris_tipi').value;
                    
                    const manuelFields = document.getElementById('om_manuelFields');
                    const kayitliFields = document.getElementById('om_kayitliFields');
                    const bilgiInputlari = document.getElementById('om_bilgiInputlari');
                    
                    const malzemeAdiInput = document.getElementById('om_malzeme_adi');
                    const malzemeCinsiInput = document.getElementById('om_malzeme_cinsi_text');
                    const olculerInput = document.getElementById('om_olculer');
                    const standartInput = document.getElementById('om_standart');
                    const birimAgirlikInput = document.getElementById('om_birim_agirlik');
                    
                    if (girisTipi === 'manuel') {
                        manuelFields.style.display = 'block';
                        kayitliFields.style.display = 'none';
                        bilgiInputlari.style.display = 'block';
                        
                        malzemeAdiInput.removeAttribute('readonly');
                        malzemeCinsiInput.removeAttribute('readonly');
                        olculerInput.removeAttribute('readonly');
                        standartInput.removeAttribute('readonly');
                        birimAgirlikInput.removeAttribute('readonly');
                        
                        malzemeAdiInput.style.background = 'white';
                        malzemeCinsiInput.style.background = 'white';
                        olculerInput.style.background = 'white';
                        standartInput.style.background = 'white';
                        birimAgirlikInput.style.background = 'white';
                        
                        malzemeAdiInput.style.cursor = 'text';
                        malzemeCinsiInput.style.cursor = 'text';
                        olculerInput.style.cursor = 'text';
                        standartInput.style.cursor = 'text';
                        birimAgirlikInput.style.cursor = 'text';
                        
                        malzemeAdiInput.value = '';
                        malzemeCinsiInput.value = '';
                        olculerInput.value = '';
                        standartInput.value = '';
                        birimAgirlikInput.value = '';
                        
                        setTimeout(() => {
                            if (malzemeAdiInput) malzemeAdiInput.focus();
                        }, 100);
                        
                    } else if (girisTipi === 'kayitli') {
                        manuelFields.style.display = 'none';
                        kayitliFields.style.display = 'block';
                        bilgiInputlari.style.display = 'block';
                        
                        malzemeAdiInput.setAttribute('readonly', 'readonly');
                        malzemeCinsiInput.setAttribute('readonly', 'readonly');
                        olculerInput.setAttribute('readonly', 'readonly');
                        standartInput.setAttribute('readonly', 'readonly');
                        birimAgirlikInput.setAttribute('readonly', 'readonly');
                        
                        malzemeAdiInput.style.background = '#f7fafc';
                        malzemeCinsiInput.style.background = '#f7fafc';
                        olculerInput.style.background = '#f7fafc';
                        standartInput.style.background = '#f7fafc';
                        birimAgirlikInput.style.background = '#f7fafc';
                        
                        malzemeAdiInput.style.cursor = 'not-allowed';
                        malzemeCinsiInput.style.cursor = 'not-allowed';
                        olculerInput.style.cursor = 'not-allowed';
                        standartInput.style.cursor = 'not-allowed';
                        birimAgirlikInput.style.cursor = 'not-allowed';
                        
                        malzemeAdiInput.value = '';
                        malzemeCinsiInput.value = '';
                        olculerInput.value = '';
                        standartInput.value = '';
                        birimAgirlikInput.value = '';
                        
                        self.loadKayitliMalzemeler();
                    } else {
                        manuelFields.style.display = 'none';
                        kayitliFields.style.display = 'none';
                        bilgiInputlari.style.display = 'none';
                    }
                },
                
                onKayitliMalzemeChange: function() {
                    const selectedValue = document.getElementById('om_kayitli_secim').value;
                    
                    if (!selectedValue) {
                        document.getElementById('om_malzeme_adi').value = '';
                        document.getElementById('om_malzeme_cinsi_text').value = '';
                        document.getElementById('om_olculer').value = '';
                        document.getElementById('om_standart').value = '';
                        document.getElementById('om_birim_agirlik').value = '';
                        return;
                    }
                    
                    const kayitlar = self.getKayitlar();
                    const kayit = kayitlar.find(k => k.id === selectedValue);
                    
                    if (kayit) {
                        document.getElementById('om_malzeme_adi').value = kayit.malzemeAdi;
                        document.getElementById('om_malzeme_cinsi_text').value = kayit.malzemeCinsi;
                        document.getElementById('om_olculer').value = kayit.olculer;
                        document.getElementById('om_standart').value = kayit.standart;
                        document.getElementById('om_birim_agirlik').value = kayit.birimAgirlik;
                    }
                },
                
                kayitEkle: function() {
                    const malzemeAdi = document.getElementById('om_malzeme_adi').value.trim();
                    const malzemeCinsi = document.getElementById('om_malzeme_cinsi_text').value.trim();
                    const olculer = document.getElementById('om_olculer').value.trim();
                    const standart = document.getElementById('om_standart').value.trim();
                    const birimAgirlik = parseFloat(document.getElementById('om_birim_agirlik').value);
                    const kayitAdi = document.getElementById('om_kayit_adi').value.trim();
                    
                    if (!kayitAdi) {
                        window.UIManager.showNotification(self.getText('kayit_adi_giriniz'), 'warning');
                        return;
                    }
                    
                    if (!malzemeAdi || !malzemeCinsi || !olculer || !standart || isNaN(birimAgirlik)) {
                        window.UIManager.showNotification(self.getText('validation_error'), 'warning');
                        return;
                    }
                    
                    if (birimAgirlik <= 0) {
                        window.UIManager.showNotification(self.getText('validation_min_error'), 'warning');
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
                        malzemeAdi: malzemeAdi,
                        malzemeCinsi: malzemeCinsi,
                        olculer: olculer,
                        standart: standart,
                        birimAgirlik: birimAgirlik,
                        tarih: new Date().toISOString()
                    };
                    
                    kayitlar.push(yeniKayit);
                    self.saveKayitlar(kayitlar);
                    
                    document.getElementById('om_kayit_adi').value = '';
                    
                    window.UIManager.showNotification(self.getText('kayit_basarili'), 'success');
                    
                    const girisTipi = document.getElementById('om_giris_tipi').value;
                    if (girisTipi === 'kayitli') {
                        self.loadKayitliMalzemeler();
                    }
                },
                
                kayitSil: function() {
                    const selectedValue = document.getElementById('om_kayitli_secim').value;
                    
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
                            
                            self.loadKayitliMalzemeler();
                            
                            document.getElementById('om_malzeme_adi').value = '';
                            document.getElementById('om_malzeme_cinsi_text').value = '';
                            document.getElementById('om_olculer').value = '';
                            document.getElementById('om_standart').value = '';
                            document.getElementById('om_birim_agirlik').value = '';
                            
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

        loadKayitliMalzemeler() {
            const selectElement = document.getElementById('om_kayitli_secim');
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
                option.textContent = `${kayit.ad} - ${kayit.malzemeAdi}`;
                selectElement.appendChild(option);
            });
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="om_giris_tipi">
                            <span class="label-icon">📝</span> Giriş Tipi
                        </label>
                        <select id="om_giris_tipi" onchange="window.OzelMalzemeHandlers.onGirisTipiChange()">
                            <option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
                            <option value="manuel">${this.getText('manuel_giris')}</option>
                            <option value="kayitli">${this.getText('kayitli_sec')}</option>
                        </select>
                    </div>
                </div>
                
                <!-- Manuel Giriş Ekstra Alanları -->
                <div id="om_manuelFields" style="display:none;">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="om_kayit_adi">
                                <span class="label-icon">💾</span> ${this.getText('kayit_adi_label')}
                            </label>
                            <input type="text" id="om_kayit_adi" 
                                   placeholder="${lang === 'tr' ? 'Kayıt adı (opsiyonel)' : 'Record name (optional)'}">
                        </div>
                    </div>
                    <div class="form-row">
                        <button type="button" class="btn btn-save-record" 
                                onclick="window.OzelMalzemeHandlers.kayitEkle()"
                                style="padding: 10px 20px; background: #48bb78; color: white; 
                                       border: none; border-radius: 6px; cursor: pointer; 
                                       font-weight: 600; transition: all 0.3s;">
                            <span style="margin-right: 5px;">💾</span> ${this.getText('kayit_btn')}
                        </button>
                    </div>
                </div>
                
                <!-- Kayıtlı Malzeme Seçimi -->
                <div id="om_kayitliFields" style="display:none;">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="om_kayitli_secim">
                                <span class="label-icon">📋</span> ${this.getText('kayitli_malzeme_label')}
                            </label>
                            <select id="om_kayitli_secim" onchange="window.OzelMalzemeHandlers.onKayitliMalzemeChange()">
                                <option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <button type="button" class="btn btn-delete-record" 
                                onclick="window.OzelMalzemeHandlers.kayitSil()"
                                style="padding: 10px 20px; background: #f56565; color: white; 
                                       border: none; border-radius: 6px; cursor: pointer; 
                                       font-weight: 600; transition: all 0.3s;">
                            <span style="margin-right: 5px;">🗑️</span> ${this.getText('kayit_sil_btn')}
                        </button>
                    </div>
                </div>
                
                <!-- Ortak Bilgi Input'ları - Her İki Mod İçin -->
                <div id="om_bilgiInputlari" style="display:none;">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="om_malzeme_adi">
                                <span class="label-icon">🏷️</span> ${this.getText('malzeme_adi_label')}
                            </label>
                            <input type="text" id="om_malzeme_adi" 
                                   placeholder="${lang === 'tr' ? 'Malzeme adı' : 'Material name'}">
                        </div>
                        <div class="form-group">
                            <label for="om_malzeme_cinsi_text">
                                <span class="label-icon">🔬</span> ${this.getText('malzeme_cinsi_label')}
                            </label>
                            <input type="text" id="om_malzeme_cinsi_text" 
                                   placeholder="${lang === 'tr' ? 'Malzeme cinsi' : 'Material grade'}">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="om_olculer">
                                <span class="label-icon">📏</span> ${this.getText('olculer_label')}
                            </label>
                            <input type="text" id="om_olculer" 
                                   placeholder="${lang === 'tr' ? 'Ölçüler' : 'Dimensions'}">
                        </div>
                        <div class="form-group">
                            <label for="om_standart">
                                <span class="label-icon">📋</span> ${this.getText('standart_label')}
                            </label>
                            <input type="text" id="om_standart" 
                                   placeholder="${lang === 'tr' ? 'Standart' : 'Standard'}">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="om_birim_agirlik">
                                <span class="label-icon">⚖️</span> ${this.getText('birim_agirlik_label')}
                            </label>
                            <input type="number" id="om_birim_agirlik" min="0.001" step="0.001" 
                                   placeholder="${lang === 'tr' ? 'Birim ağırlık değeri' : 'Unit weight value'}">
                        </div>
                    </div>
                </div>
            `;
        }

        getGrades() {
            return [];
        }

        getDensity(grade) {
            return 0;
        }

        getStandard(grade) {
            return '-';
        }

        calculate(formData) {
            const birimAgirlik = parseFloat(formData.om_birim_agirlik) || 0;
            const adet = parseFloat(formData.adet) || 1;
            
            if (birimAgirlik <= 0) {
                return null;
            }
            
            const toplamAgirlik = birimAgirlik * adet;
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                suHacmi: null
            };
        }

        validate(formData) {
            const girisTipi = formData.om_giris_tipi;
            
            if (!girisTipi || girisTipi === '') {
                return { 
                    isValid: false, 
                    message: this.getText('validation_giris_tipi_error') 
                };
            }
            
            const malzemeAdi = formData.om_malzeme_adi;
            const malzemeCinsi = formData.om_malzeme_cinsi_text;
            const olculer = formData.om_olculer;
            const standart = formData.om_standart;
            const birimAgirlik = formData.om_birim_agirlik;
            
            if (!malzemeAdi || malzemeAdi.trim() === '' ||
                !malzemeCinsi || malzemeCinsi.trim() === '' ||
                !olculer || olculer.trim() === '' ||
                !standart || standart.trim() === '' ||
                birimAgirlik === undefined || birimAgirlik === null || birimAgirlik === '') {
                return { 
                    isValid: false, 
                    message: this.getText('validation_error') 
                };
            }
            
            const birimAgirlikNum = parseFloat(birimAgirlik);
            
            if (isNaN(birimAgirlikNum) || birimAgirlikNum <= 0) {
                return { 
                    isValid: false, 
                    message: this.getText('validation_min_error') 
                };
            }
            
            return { isValid: true };
        }
        
        formatDimensions(formData) {
            return formData.om_olculer || '-';
        }

        getDisplayName() {
            return this.getText('display_name');
        }

        getDisplayTypeFromRow(rowData) {
            const metadata = rowData.metadata?.ozel_malzeme;
            if (metadata && metadata.malzeme_adi) {
                return metadata.malzeme_adi;
            }
            return this.getDisplayName();
        }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            
            baseRow.malzemeTuru = formData.om_malzeme_adi || this.getDisplayName();
            baseRow.malzemeCinsi = formData.om_malzeme_cinsi_text || '-';
            baseRow.olculer = formData.om_olculer || '-';
            baseRow.enNormu = formData.om_standart || '-';
            
            baseRow.metadata = {
                ...baseRow.metadata,
                ozel_malzeme: {
                    giris_tipi: formData.om_giris_tipi,
                    malzeme_adi: formData.om_malzeme_adi,
                    malzeme_cinsi: formData.om_malzeme_cinsi_text,
                    olculer: formData.om_olculer,
                    standart: formData.om_standart,
                    birim_agirlik: formData.om_birim_agirlik,
                    kayitli_secim: formData.om_kayitli_secim
                }
            };
            
            return baseRow;
        }

        fillFormFromRow(rowData) {
            super.fillFormFromRow(rowData);
            
            const metadata = rowData.metadata?.ozel_malzeme;
            if (!metadata) {
                if (rowData.formData) {
                    this.fillFromFormData(rowData.formData);
                }
                return true;
            }
            
            setTimeout(() => {
                const girisTipiElement = document.getElementById('om_giris_tipi');
                if (girisTipiElement && metadata.giris_tipi) {
                    girisTipiElement.value = metadata.giris_tipi;
                    window.OzelMalzemeHandlers.onGirisTipiChange();
                }
                
                setTimeout(() => {
                    if (metadata.giris_tipi === 'manuel') {
                        const malzemeAdiEl = document.getElementById('om_malzeme_adi');
                        const malzemeCinsiEl = document.getElementById('om_malzeme_cinsi_text');
                        const olculerEl = document.getElementById('om_olculer');
                        const standartEl = document.getElementById('om_standart');
                        const birimAgirlikEl = document.getElementById('om_birim_agirlik');
                        
                        if (malzemeAdiEl && metadata.malzeme_adi) malzemeAdiEl.value = metadata.malzeme_adi;
                        if (malzemeCinsiEl && metadata.malzeme_cinsi) malzemeCinsiEl.value = metadata.malzeme_cinsi;
                        if (olculerEl && metadata.olculer) olculerEl.value = metadata.olculer;
                        if (standartEl && metadata.standart) standartEl.value = metadata.standart;
                        if (birimAgirlikEl && metadata.birim_agirlik) birimAgirlikEl.value = metadata.birim_agirlik;
                        
                    } else if (metadata.giris_tipi === 'kayitli') {
                        const kayitliSecimEl = document.getElementById('om_kayitli_secim');
                        if (kayitliSecimEl && metadata.kayitli_secim) {
                            kayitliSecimEl.value = metadata.kayitli_secim;
                            window.OzelMalzemeHandlers.onKayitliMalzemeChange();
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
                        
                        if (key === 'om_giris_tipi') {
                            window.OzelMalzemeHandlers.onGirisTipiChange();
                        } else if (key === 'om_kayitli_secim') {
                            setTimeout(() => window.OzelMalzemeHandlers.onKayitliMalzemeChange(), 50);
                        }
                    }
                });
            }, 100);
        }
    }

    const ozelMalzemeMaterial = new OzelMalzemeMaterial();
    ozelMalzemeMaterial.register();
    
    console.log('Özel Malzeme modülü v1.0.0 yüklendi');

})(window);