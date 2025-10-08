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
                    define_dimensions: 'Ölçü isimlerini tanımlayın',
                    delete_material: 'Malzeme Sil',
                    confirm_delete_material: 'Bu malzemeyi silmek istediğinizden emin misiniz?',
                    material_deleted: 'Malzeme silindi'
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
                    define_dimensions: 'Define dimension names',
                    delete_material: 'Delete Material',
                    confirm_delete_material: 'Are you sure you want to delete this material?',
                    material_deleted: 'Material deleted'
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
                    <div class="form-group">
                        <button type="button" class="btn btn-secondary" onclick="window.ApplicationController.deleteCustomMaterialTemplate()" style="margin-top: 24px;">
                            🗑️ ${this.getText('delete_material')}
                        </button>
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
            baseRow.malzemeTuru = formData.malzemeAdi;
            baseRow.enNormu = formData.standartOzel || 'Özel';
            
            // Özel malzeme detaylarını sakla
            baseRow.ozelMalzemeDetay = {
                malzemeTipiSecim: formData.malzemeTipiSecim,
                standartOzel: formData.standartOzel,
                // Hacim tabanlı
                yogunlukOzel: formData.yogunlukOzel,
                olcu1: formData.olcu1,
                olcu2: formData.olcu2,
                olcu3: formData.olcu3,
                olcu4: formData.olcu4,
                olcu1_label: formData.olcu1_label,
                olcu2_label: formData.olcu2_label,
                olcu3_label: formData.olcu3_label,
                olcu4_label: formData.olcu4_label,
                // Birim tabanlı
                birimSecim: formData.birimSecim,
                birimAgirlikOzel: formData.birimAgirlikOzel,
                uzunluk: formData.uzunluk,
                en: formData.en,
                boy: formData.boy,
                yukseklik: formData.yukseklik,
                customOlcu: formData.customOlcu
            };
            
            baseRow.originalType = 'ozelMalzeme';
            
            return baseRow;
        }

        fillSpecificFields(rowData) {
            console.log('Özel Malzeme fillSpecificFields başladı:', rowData);
            
            // ========================================
            // ÖNCELİK 0: METADATA'DAN GELEN DETAYLAR
            // ========================================
            if (rowData.ozelMalzemeDetay && rowData.ozelMalzemeDetay.malzemeTipiSecim) {
                console.log('Metadata ozelMalzemeDetay bulundu:', rowData.ozelMalzemeDetay);
                
                // Malzeme adını ayarla
                const malzemeAdiElement = document.getElementById('malzemeAdi');
                if (malzemeAdiElement && rowData.malzemeTuru) {
                    malzemeAdiElement.value = rowData.malzemeTuru;
                }
                
                // Malzeme tipini ayarla ve UI'yi güncelle
                const malzemeTipiElement = document.getElementById('malzemeTipiSecim');
                if (malzemeTipiElement) {
                    malzemeTipiElement.value = rowData.ozelMalzemeDetay.malzemeTipiSecim;
                    window.ApplicationController.updateOzelMalzemeTipi();
                    
                    setTimeout(() => {
                        // Standart bilgisini ayarla
                        const standartElement = document.getElementById('standartOzel');
                        if (standartElement && rowData.ozelMalzemeDetay.standartOzel) {
                            standartElement.value = rowData.ozelMalzemeDetay.standartOzel;
                        }
                        
                        // HACİM TABANLI TİP İÇİN ALANLAR
                        if (rowData.ozelMalzemeDetay.malzemeTipiSecim === 'hacim') {
                            console.log('Hacim tabanlı malzeme alanları dolduruluyor...');
                            
                            // Yoğunluk
                            const yogunlukElement = document.getElementById('yogunlukOzel');
                            if (yogunlukElement && rowData.ozelMalzemeDetay.yogunlukOzel !== undefined) {
                                yogunlukElement.value = rowData.ozelMalzemeDetay.yogunlukOzel;
                            }
                            
                            // Ölçü label'larını doldur
                            const labelFields = ['olcu1_label', 'olcu2_label', 'olcu3_label', 'olcu4_label'];
                            labelFields.forEach(field => {
                                const element = document.getElementById(field);
                                if (element && rowData.ozelMalzemeDetay[field]) {
                                    element.value = rowData.ozelMalzemeDetay[field];
                                }
                            });
                            
                            // Ölçü değerlerini doldur
                            const olcuFields = ['olcu1', 'olcu2', 'olcu3', 'olcu4'];
                            olcuFields.forEach(field => {
                                const element = document.getElementById(field);
                                if (element && rowData.ozelMalzemeDetay[field] !== undefined) {
                                    element.value = rowData.ozelMalzemeDetay[field];
                                }
                            });
                            
                            console.log('Hacim tabanlı alanlar dolduruldu');
                        }
                        
                        // BİRİM TABANLI TİP İÇİN ALANLAR
                        else if (rowData.ozelMalzemeDetay.malzemeTipiSecim === 'birim') {
                            console.log('Birim tabanlı malzeme alanları dolduruluyor...');
                            
                            setTimeout(() => {
                                // Birim seçimini ayarla ve ilgili alanları oluştur
                                const birimElement = document.getElementById('birimSecim');
                                if (birimElement && rowData.ozelMalzemeDetay.birimSecim) {
                                    birimElement.value = rowData.ozelMalzemeDetay.birimSecim;
                                    window.ApplicationController.updateBirimFields();
                                    
                                    setTimeout(() => {
                                        // Birim ağırlık değerini ayarla
                                        const birimAgirlikElement = document.getElementById('birimAgirlikOzel');
                                        if (birimAgirlikElement && rowData.ozelMalzemeDetay.birimAgirlikOzel !== undefined) {
                                            birimAgirlikElement.value = rowData.ozelMalzemeDetay.birimAgirlikOzel;
                                        }
                                        
                                        // Birim tipine göre gerekli ölçü alanlarını doldur
                                        const birimTipi = rowData.ozelMalzemeDetay.birimSecim;
                                        
                                        if (birimTipi === 'kg/m') {
                                            // Uzunluk ve özel ölçü
                                            const uzunlukElement = document.getElementById('uzunluk');
                                            if (uzunlukElement && rowData.ozelMalzemeDetay.uzunluk !== undefined) {
                                                uzunlukElement.value = rowData.ozelMalzemeDetay.uzunluk;
                                            }
                                            const customOlcuElement = document.getElementById('customOlcu');
                                            if (customOlcuElement && rowData.ozelMalzemeDetay.customOlcu) {
                                                customOlcuElement.value = rowData.ozelMalzemeDetay.customOlcu;
                                            }
                                        }
                                        
                                        else if (birimTipi === 'kg/m2') {
                                            // En, Boy ve özel ölçü
                                            const enElement = document.getElementById('en');
                                            if (enElement && rowData.ozelMalzemeDetay.en !== undefined) {
                                                enElement.value = rowData.ozelMalzemeDetay.en;
                                            }
                                            const boyElement = document.getElementById('boy');
                                            if (boyElement && rowData.ozelMalzemeDetay.boy !== undefined) {
                                                boyElement.value = rowData.ozelMalzemeDetay.boy;
                                            }
                                            const customOlcuElement = document.getElementById('customOlcu');
                                            if (customOlcuElement && rowData.ozelMalzemeDetay.customOlcu) {
                                                customOlcuElement.value = rowData.ozelMalzemeDetay.customOlcu;
                                            }
                                        }
                                        
                                        else if (birimTipi === 'kg/m3') {
                                            // En, Boy, Yükseklik ve özel ölçü
                                            const enElement = document.getElementById('en');
                                            if (enElement && rowData.ozelMalzemeDetay.en !== undefined) {
                                                enElement.value = rowData.ozelMalzemeDetay.en;
                                            }
                                            const boyElement = document.getElementById('boy');
                                            if (boyElement && rowData.ozelMalzemeDetay.boy !== undefined) {
                                                boyElement.value = rowData.ozelMalzemeDetay.boy;
                                            }
                                            const yukseklikElement = document.getElementById('yukseklik');
                                            if (yukseklikElement && rowData.ozelMalzemeDetay.yukseklik !== undefined) {
                                                yukseklikElement.value = rowData.ozelMalzemeDetay.yukseklik;
                                            }
                                            const customOlcuElement = document.getElementById('customOlcu');
                                            if (customOlcuElement && rowData.ozelMalzemeDetay.customOlcu) {
                                                customOlcuElement.value = rowData.ozelMalzemeDetay.customOlcu;
                                            }
                                        }
                                        
                                        else if (birimTipi === 'kg/adet') {
                                            // Sadece özel ölçü
                                            const customOlcuElement = document.getElementById('customOlcu');
                                            if (customOlcuElement && rowData.ozelMalzemeDetay.customOlcu) {
                                                customOlcuElement.value = rowData.ozelMalzemeDetay.customOlcu;
                                            }
                                        }
                                        
                                        console.log('Birim tabanlı alanlar dolduruldu');
                                    }, 250);
                                }
                            }, 200);
                        }
                    }, 200);
                }
                
                console.log('Metadata işlemi tamamlandı, fonksiyon sonlandırılıyor');
                return; // Metadata varsa diğer yöntemlere gerek yok
            }
            
            // ========================================
            // ÖNCELİK 1: FORMDATA İÇİNDEKİ BİLGİLER
            // ========================================
            if (rowData.formData && rowData.formData.malzemeTipiSecim) {
                console.log('formData bulundu:', rowData.formData);
                
                // Malzeme adı
                const malzemeAdiElement = document.getElementById('malzemeAdi');
                if (malzemeAdiElement && rowData.malzemeTuru) {
                    malzemeAdiElement.value = rowData.malzemeTuru;
                }
                
                // Malzeme tipi
                const malzemeTipiElement = document.getElementById('malzemeTipiSecim');
                if (malzemeTipiElement) {
                    malzemeTipiElement.value = rowData.formData.malzemeTipiSecim;
                    window.ApplicationController.updateOzelMalzemeTipi();
                    
                    setTimeout(() => {
                        // Standart
                        const standartElement = document.getElementById('standartOzel');
                        if (standartElement && rowData.formData.standartOzel) {
                            standartElement.value = rowData.formData.standartOzel;
                        }
                        
                        if (rowData.formData.malzemeTipiSecim === 'hacim') {
                            // Hacim tabanlı alanları doldur
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
                            // Birim tabanlı alanları doldur
                            setTimeout(() => {
                                const birimElement = document.getElementById('birimSecim');
                                if (birimElement && rowData.formData.birimSecim) {
                                    birimElement.value = rowData.formData.birimSecim;
                                    window.ApplicationController.updateBirimFields();
                                    
                                    setTimeout(() => {
                                        // Birim ağırlık
                                        const birimAgirlikElement = document.getElementById('birimAgirlikOzel');
                                        if (birimAgirlikElement && rowData.formData.birimAgirlikOzel) {
                                            birimAgirlikElement.value = rowData.formData.birimAgirlikOzel;
                                        }
                                        
                                        // Birim tipine göre ölçü alanlarını doldur
                                        const birimFieldsMap = {
                                            'kg/m': ['uzunluk', 'customOlcu'],
                                            'kg/m2': ['en', 'boy', 'customOlcu'],
                                            'kg/m3': ['en', 'boy', 'yukseklik', 'customOlcu'],
                                            'kg/adet': ['customOlcu']
                                        };
                                        
                                        const fields = birimFieldsMap[rowData.formData.birimSecim] || [];
                                        fields.forEach(field => {
                                            setTimeout(() => {
                                                const element = document.getElementById(field);
                                                if (element && rowData.formData[field] !== undefined) {
                                                    element.value = rowData.formData[field];
                                                }
                                            }, 100);
                                        });
                                    }, 200);
                                }
                            }, 200);
                        }
                    }, 200);
                }
                
                console.log('formData işlemi tamamlandı');
                return;
            }
            
            // ========================================
            // ÖNCELİK 2: STANDART BİLGİLERİNDEN TAHMİN
            // ========================================
            console.log('Metadata ve formData yok, temel bilgilerden tahmin yapılıyor');
            
            // Malzeme adını ayarla
            const malzemeAdiElement = document.getElementById('malzemeAdi');
            if (malzemeAdiElement && rowData.malzemeTuru) {
                malzemeAdiElement.value = rowData.malzemeTuru;
            }
            
            // Standart bilgisini ayarla
            if (rowData.enNormu && rowData.enNormu !== 'Özel') {
                const standartElement = document.getElementById('standartOzel');
                if (standartElement) {
                    standartElement.value = rowData.enNormu;
                }
            }
            
            // Ölçülerden malzeme tipini tahmin et
            if (rowData.olculer && rowData.olculer !== '-') {
                const olculer = rowData.olculer.toString();
                
                // Hacim tabanlı mı birim tabanlı mı belirle
                if (olculer.includes('x') && olculer.includes('mm')) {
                    console.log('Hacim tabanlı olarak tahmin ediliyor');
                    
                    // Muhtemelen hacim tabanlı
                    const malzemeTipiElement = document.getElementById('malzemeTipiSecim');
                    if (malzemeTipiElement) {
                        malzemeTipiElement.value = 'hacim';
                        window.ApplicationController.updateOzelMalzemeTipi();
                        
                        // Ölçüleri parse et: örnek "100x200x50mm" veya "100 x 200 x 50 mm"
                        const olcuPattern = /(\d+(?:\.\d+)?)\s*x\s*(\d+(?:\.\d+)?)\s*(?:x\s*(\d+(?:\.\d+)?))?\s*(?:x\s*(\d+(?:\.\d+)?))?/i;
                        const matches = olculer.match(olcuPattern);
                        
                        if (matches) {
                            setTimeout(() => {
                                if (matches[1]) {
                                    const olcu1Element = document.getElementById('olcu1');
                                    if (olcu1Element) olcu1Element.value = matches[1];
                                }
                                if (matches[2]) {
                                    const olcu2Element = document.getElementById('olcu2');
                                    if (olcu2Element) olcu2Element.value = matches[2];
                                }
                                if (matches[3]) {
                                    const olcu3Element = document.getElementById('olcu3');
                                    if (olcu3Element) olcu3Element.value = matches[3];
                                }
                                if (matches[4]) {
                                    const olcu4Element = document.getElementById('olcu4');
                                    if (olcu4Element) olcu4Element.value = matches[4];
                                }
                                
                                console.log('Ölçüler parse edildi:', matches);
                            }, 200);
                        }
                    }
                } 
                else if (olculer.includes('L:') || olculer.toLowerCase().includes('adet')) {
                    console.log('Birim tabanlı olarak tahmin ediliyor');
                    
                    // Muhtemelen birim tabanlı
                    const malzemeTipiElement = document.getElementById('malzemeTipiSecim');
                    if (malzemeTipiElement) {
                        malzemeTipiElement.value = 'birim';
                        window.ApplicationController.updateOzelMalzemeTipi();
                        
                        setTimeout(() => {
                            // Uzunluk varsa parse et: "L:1000mm"
                            if (olculer.includes('L:')) {
                                const uzunlukPattern = /L:\s*(\d+(?:\.\d+)?)/i;
                                const uzunlukMatch = olculer.match(uzunlukPattern);
                                
                                if (uzunlukMatch) {
                                    // kg/m olarak tahmin et
                                    const birimElement = document.getElementById('birimSecim');
                                    if (birimElement) {
                                        birimElement.value = 'kg/m';
                                        window.ApplicationController.updateBirimFields();
                                        
                                        setTimeout(() => {
                                            const uzunlukElement = document.getElementById('uzunluk');
                                            if (uzunlukElement) {
                                                uzunlukElement.value = uzunlukMatch[1];
                                            }
                                        }, 200);
                                    }
                                }
                            }
                            // Adet bazlı ise
                            else if (olculer.toLowerCase().includes('adet')) {
                                const birimElement = document.getElementById('birimSecim');
                                if (birimElement) {
                                    birimElement.value = 'kg/adet';
                                    window.ApplicationController.updateBirimFields();
                                }
                            }
                            
                            // customOlcu'yu her durumda doldur
                            setTimeout(() => {
                                const customOlcuElement = document.getElementById('customOlcu');
                                if (customOlcuElement && !customOlcuElement.value) {
                                    customOlcuElement.value = rowData.olculer;
                                }
                            }, 300);
                        }, 200);
                    }
                }
                else {
                    console.log('Ölçü formatı tanınamadı, birim/adet bazlı olarak ayarlanıyor');
                    
                    // Format tanınamadı, birim bazlı varsayılan
                    const malzemeTipiElement = document.getElementById('malzemeTipiSecim');
                    if (malzemeTipiElement) {
                        malzemeTipiElement.value = 'birim';
                        window.ApplicationController.updateOzelMalzemeTipi();
                        
                        setTimeout(() => {
                            const birimElement = document.getElementById('birimSecim');
                            if (birimElement) {
                                birimElement.value = 'kg/adet';
                                window.ApplicationController.updateBirimFields();
                                
                                setTimeout(() => {
                                    const customOlcuElement = document.getElementById('customOlcu');
                                    if (customOlcuElement) {
                                        customOlcuElement.value = rowData.olculer;
                                    }
                                }, 200);
                            }
                        }, 200);
                    }
                }
            }
            
            console.log('Tahmin işlemi tamamlandı');
        }
    }

    // ApplicationController'a ek fonksiyonlar
    if (!window.ApplicationController.updateOzelMalzemeTipi) {
    
        // YENİ: Custom Alert Modal
        window.ApplicationController.showCustomAlert = function(message, onClose) {
            const modal = document.createElement('div');
            modal.className = 'custom-confirm-modal';
            modal.innerHTML = `
                <div class="custom-confirm-content">
                    <div class="custom-confirm-message">${message}</div>
                    <div class="custom-confirm-buttons">
                        <button class="custom-confirm-btn custom-confirm-yes">Tamam</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            const okBtn = modal.querySelector('.custom-confirm-yes');
            
            const closeModal = () => {
                modal.remove();
                // Modal kapatıldıktan sonra keyboard reset
                requestAnimationFrame(() => {
                    if (window.EventManager) {
                        window.EventManager.forceActivateAll();
                    }
                    if (window.TableManager) {
                        window.TableManager.forceKeyboardReset();
                    }
                    if (onClose) onClose();
                });
            };
            
            okBtn.onclick = closeModal;
            
            // ESC tuşu ile kapat
            const escHandler = (e) => {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', escHandler);
                }
            };
            document.addEventListener('keydown', escHandler);
            
            // Modal dışına tıklanırsa kapat
            modal.onclick = (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            };
        };
        
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
        
        // GÜNCELLENEN FONKSİYON - alert() yerine custom modal
        window.ApplicationController.saveCustomMaterial = function() {
            const malzemeAdi = document.getElementById('malzemeAdi').value;
            if (!malzemeAdi) {
                window.ApplicationController.showCustomAlert('Lütfen malzeme adı girin');
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
            
            // CUSTOM MODAL İLE DEĞİŞTİRİLDİ
            window.ApplicationController.showCustomAlert('Malzeme kaydedildi: ' + malzemeAdi);
        };

        // ApplicationController'a silme fonksiyonu ekle
        if (!window.ApplicationController.deleteCustomMaterialTemplate) {
            window.ApplicationController.deleteCustomMaterialTemplate = function() {
                const materialSelect = document.getElementById('kayitliMalzeme');
                const materialName = materialSelect.value;
                
                if (!materialName) {
                    if (window.ApplicationController.showCustomAlert) {
                        window.ApplicationController.showCustomAlert('Lütfen silinecek malzemeyi seçin');
                    } else {
                        alert('Lütfen silinecek malzemeyi seçin');
                    }
                    return;
                }
                
                const MaterialClass = window.MaterialRegistry.get('ozelMalzeme');
                const instance = new MaterialClass();
                const message = instance.getText('confirm_delete_material');
                
                window.ApplicationController.showCustomConfirmModal(
                    `${message}: ${materialName}`,
                    () => {
                        // Malzemeyi sil
                        delete instance.customMaterials[materialName];
                        localStorage.setItem('ozelMalzemeler', JSON.stringify(instance.customMaterials));
                        
                        // Select'i güncelle
                        materialSelect.querySelector(`option[value="${materialName}"]`)?.remove();
                        materialSelect.value = '';
                        
                        // Formu temizle
                        document.getElementById('malzemeAdi').value = '';
                        document.getElementById('malzemeTipiSecim').value = '';
                        document.getElementById('standartOzel').value = '';
                        window.ApplicationController.updateOzelMalzemeTipi();
                        
                        if (window.ApplicationController.showCustomAlert) {
                            window.ApplicationController.showCustomAlert(instance.getText('material_deleted') + ': ' + materialName);
                        } else {
                            alert(instance.getText('material_deleted') + ': ' + materialName);
                        }
                    }
                );
            };
        }
    }

    // Malzemeyi kaydet
    const ozelMalzemeMaterial = new OzelMalzemeMaterial();
    ozelMalzemeMaterial.register();

})(window);