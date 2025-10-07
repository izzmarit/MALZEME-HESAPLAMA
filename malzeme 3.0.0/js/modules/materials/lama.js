/**
 * LAMA (Yassı Demir) Malzeme Modülü
 */

(function(window) {
    'use strict';
    
    class LamaMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'lama';
            
            // Dil metinleri
            this.texts = {
                tr: {
                    display_name: 'Lama',
                    en_label: 'En (mm)',
                    kalinlik_label: 'Kalınlık (mm)',
                    uzunluk_label: 'Uzunluk (mm)',
                    en_placeholder: 'Lama eni',
                    kalinlik_placeholder: 'Lama kalınlığı',
                    uzunluk_placeholder: 'Uzunluk değeri',
                    validation_error: 'Tüm ölçüler girilmelidir',
                    kesit_alan_info: 'Kesit Alanı',
                    teorik_agirlik_info: 'Teorik Ağırlık'
                },
                en: {
                    display_name: 'Flat Bar',
                    en_label: 'Width (mm)',
                    kalinlik_label: 'Thickness (mm)',
                    uzunluk_label: 'Length (mm)',
                    en_placeholder: 'Bar width',
                    kalinlik_placeholder: 'Bar thickness',
                    uzunluk_placeholder: 'Length value',
                    validation_error: 'All dimensions must be entered',
                    kesit_alan_info: 'Cross Section Area',
                    teorik_agirlik_info: 'Theoretical Weight'
                }
            };
            
            // Malzeme cinsleri
            this.grades = [
                'S235JR', 'S275JR', 'S355JR',
                'S235J0', 'S275J0', 'S355J0',
                'S235J2', 'S275J2', 'S355J2',
                'S420N', 'S420NL', 'S460N', 'S460NL',
                '1.4301', '1.4401', '1.4404', '1.4571',
                'Aluminyum', 'Bakır', 'Pirinç'
            ];
            
            // Yoğunluklar (kg/m³)
            this.densities = {
                'S235JR': 7850, 'S275JR': 7850, 'S355JR': 7850,
                'S235J0': 7850, 'S275J0': 7850, 'S355J0': 7850,
                'S235J2': 7850, 'S275J2': 7850, 'S355J2': 7850,
                'S420N': 7850, 'S420NL': 7850, 'S460N': 7850, 'S460NL': 7850,
                '1.4301': 8000, '1.4401': 8000, '1.4404': 8000, '1.4571': 8000,
                'Aluminyum': 2700, 'Bakır': 8960, 'Pirinç': 8470
            };
            
            // Standartlar
            this.standards = {
                'S235JR': 'EN 10058', 'S275JR': 'EN 10058', 'S355JR': 'EN 10058',
                'S235J0': 'EN 10058', 'S275J0': 'EN 10058', 'S355J0': 'EN 10058',
                'S235J2': 'EN 10058', 'S275J2': 'EN 10058', 'S355J2': 'EN 10058',
                'S420N': 'EN 10058', 'S420NL': 'EN 10058',
                'S460N': 'EN 10058', 'S460NL': 'EN 10058',
                '1.4301': 'EN 10088-2', '1.4401': 'EN 10088-2',
                '1.4404': 'EN 10088-2', '1.4571': 'EN 10088-2',
                'Aluminyum': 'EN 755-2', 'Bakır': 'EN 1652', 'Pirinç': 'EN 1652'
            };
            
            // Standart lama ölçüleri (en x kalınlık)
            this.standardSizes = {
                // En değerleri (mm)
                widths: [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100, 
                        110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 
                        220, 250, 280, 300, 320, 350, 400, 450, 500],
                // Kalınlık değerleri (mm)
                thicknesses: [3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 18, 20, 
                             22, 25, 28, 30, 32, 35, 40, 45, 50, 55, 60, 
                             65, 70, 75, 80, 90, 100],
                // Yaygın kullanılan kombinasyonlar
                common: [
                    '20x3', '20x4', '20x5', '25x3', '25x4', '25x5', '30x3', '30x4', '30x5', '30x6',
                    '40x4', '40x5', '40x6', '40x8', '40x10', '50x5', '50x6', '50x8', '50x10',
                    '60x5', '60x6', '60x8', '60x10', '60x12', '70x6', '70x8', '70x10', '70x12',
                    '80x6', '80x8', '80x10', '80x12', '80x15', '90x8', '90x10', '90x12', '90x15',
                    '100x8', '100x10', '100x12', '100x15', '100x20', '120x10', '120x12', '120x15', '120x20',
                    '150x10', '150x12', '150x15', '150x20', '150x25', '200x10', '200x15', '200x20', '200x25', '200x30'
                ]
            };
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="en">${this.getText('en_label')}</label>
                        <input type="number" id="en" 
                               placeholder="${this.getText('en_placeholder')}" 
                               min="0" step="any" list="lamaEnList">
                        <datalist id="lamaEnList">
                            ${this.standardSizes.widths.map(w => `<option value="${w}">`).join('')}
                        </datalist>
                    </div>
                    <div class="form-group">
                        <label for="kalinlik">${this.getText('kalinlik_label')}</label>
                        <input type="number" id="kalinlik" 
                               placeholder="${this.getText('kalinlik_placeholder')}" 
                               min="0" step="any" list="lamaKalinlikList">
                        <datalist id="lamaKalinlikList">
                            ${this.standardSizes.thicknesses.map(t => `<option value="${t}">`).join('')}
                        </datalist>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="uzunluk">${this.getText('uzunluk_label')}</label>
                        <input type="number" id="uzunluk" 
                               placeholder="${this.getText('uzunluk_placeholder')}" 
                               min="0" step="any" value="6000">
                    </div>
                </div>
                <div class="form-row" id="lamaInfoRow" style="display: none;">
                    <div class="form-group">
                        <small style="color: #4299e1; font-weight: 600;">
                            <span id="kesitAlanInfo"></span> | 
                            <span id="teorikAgirlikInfo"></span>
                        </small>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <small style="color: #718096; font-style: italic;">
                            ${lang === 'tr' ? 
                              '💡 Yaygın ölçüler: ' + this.getCommonSizesHint() : 
                              '💡 Common sizes: ' + this.getCommonSizesHint()}
                        </small>
                    </div>
                </div>
            `;
        }

        getCommonSizesHint() {
            // İlk 5 yaygın ölçüyü göster
            return this.standardSizes.common.slice(0, 5).join(', ') + '...';
        }

        calculate(formData) {
            const en = parseFloat(formData.en) || 0;
            const kalinlik = parseFloat(formData.kalinlik) || 0;
            const uzunluk = parseFloat(formData.uzunluk) || 0;
            const adet = parseFloat(formData.adet) || 1;
            const malzemeCinsi = formData.malzemeCinsi || 'S235JR';
            
            if (!en || !kalinlik || !uzunluk) {
                return null;
            }
            
            // Kesit alanı (mm²) = en * kalınlık
            const kesitAlani = en * kalinlik;
            
            // Hacim (mm³ → m³)
            const hacimM3 = (kesitAlani * uzunluk) / 1000000000;
            
            // Yoğunluk
            const yogunluk = this.getDensity(malzemeCinsi);
            
            // Ağırlık (kg)
            const birimAgirlik = hacimM3 * yogunluk;
            const toplamAgirlik = birimAgirlik * adet;
            
            // Teorik ağırlık (kg/m)
            const teorikAgirlik = (kesitAlani / 1000000) * yogunluk;
            
            // Bilgi güncelleme
            this.updateInfoDisplay(kesitAlani, teorikAgirlik);
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                kesitAlani: kesitAlani.toFixed(2),
                teorikAgirlik: teorikAgirlik.toFixed(3),
                suHacmi: null
            };
        }

        updateInfoDisplay(kesitAlani, teorikAgirlik) {
            const infoRow = document.getElementById('lamaInfoRow');
            const kesitAlanInfo = document.getElementById('kesitAlanInfo');
            const teorikAgirlikInfo = document.getElementById('teorikAgirlikInfo');
            
            if (kesitAlani && teorikAgirlik) {
                infoRow.style.display = 'block';
                kesitAlanInfo.textContent = `${this.getText('kesit_alan_info')}: ${kesitAlani.toFixed(2)} mm²`;
                teorikAgirlikInfo.textContent = `${this.getText('teorik_agirlik_info')}: ${teorikAgirlik.toFixed(3)} kg/m`;
            } else {
                infoRow.style.display = 'none';
            }
        }

        validate(formData) {
            const en = parseFloat(formData.en) || 0;
            const kalinlik = parseFloat(formData.kalinlik) || 0;
            const uzunluk = parseFloat(formData.uzunluk) || 0;
            
            if (!en || !kalinlik || !uzunluk) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            return { isValid: true };
        }

        formatDimensions(formData) {
            const en = parseFloat(formData.en) || 0;
            const kalinlik = parseFloat(formData.kalinlik) || 0;
            const uzunluk = parseFloat(formData.uzunluk) || 0;
            
            return `${en}x${kalinlik} L:${uzunluk}mm`;
        }

        // Standart ölçü kontrolü
        isStandardSize(en, kalinlik) {
            const sizeString = `${en}x${kalinlik}`;
            return this.standardSizes.common.includes(sizeString);
        }

        fillSpecificFields(rowData) {
            if (rowData.olculer) {
                const olculer = rowData.olculer.toString();
                const pattern = /(\d+(?:\.\d+)?)\s*x\s*(\d+(?:\.\d+)?)\s*L:\s*(\d+(?:\.\d+)?)/i;
                const matches = olculer.match(pattern);
                
                if (matches) {
                    const enElement = document.getElementById('en');
                    const kalinlikElement = document.getElementById('kalinlik');
                    const uzunlukElement = document.getElementById('uzunluk');
                    
                    if (enElement) enElement.value = matches[1];
                    if (kalinlikElement) kalinlikElement.value = matches[2];
                    if (uzunlukElement) uzunlukElement.value = matches[3];
                }
            }
            
            if (rowData.formData) {
                const fields = ['en', 'kalinlik', 'uzunluk'];
                fields.forEach(field => {
                    if (rowData.formData[field] !== undefined) {
                        const element = document.getElementById(field);
                        if (element) element.value = rowData.formData[field];
                    }
                });
            }
        }
    }

    // Malzemeyi kaydet
    const lamaMaterial = new LamaMaterial();
    lamaMaterial.register();

})(window);