/**
 * KÖŞEBENT Malzeme Modülü
 */

(function(window) {
    'use strict';
    
    class KosebentMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'kosebent';
            
            // Dil metinleri
            this.texts = {
                tr: {
                    display_name: 'Köşebent',
                    kol1_label: 'Kol 1 (a) (mm)',
                    kol2_label: 'Kol 2 (b) (mm)',
                    kalinlik_label: 'Et Kalınlığı (t) (mm)',
                    uzunluk_label: 'Uzunluk (mm)',
                    kol1_placeholder: 'Kol 1 ölçüsü',
                    kol2_placeholder: 'Kol 2 ölçüsü',
                    kalinlik_placeholder: 'Et kalınlığı',
                    uzunluk_placeholder: 'Uzunluk değeri',
                    validation_error: 'Tüm ölçüler girilmelidir',
                    validation_thickness: 'Et kalınlığı kol ölçülerinden küçük olmalıdır'
                },
                en: {
                    display_name: 'Angle Bar',
                    kol1_label: 'Leg 1 (a) (mm)',
                    kol2_label: 'Leg 2 (b) (mm)',
                    kalinlik_label: 'Thickness (t) (mm)',
                    uzunluk_label: 'Length (mm)',
                    kol1_placeholder: 'Leg 1 dimension',
                    kol2_placeholder: 'Leg 2 dimension',
                    kalinlik_placeholder: 'Thickness',
                    uzunluk_placeholder: 'Length value',
                    validation_error: 'All dimensions must be entered',
                    validation_thickness: 'Thickness must be less than leg dimensions'
                }
            };
            
            // Malzeme cinsleri
            this.grades = [
                'S235JR', 'S275JR', 'S355JR',
                'S235J0', 'S275J0', 'S355J0',
                'S235J2', 'S275J2', 'S355J2',
                'S420N', 'S420NL', 'S460N', 'S460NL',
                '1.4301', '1.4401', '1.4404', '1.4571',
                'Aluminyum'
            ];
            
            // Yoğunluklar (kg/m³)
            this.densities = {
                'S235JR': 7850, 'S275JR': 7850, 'S355JR': 7850,
                'S235J0': 7850, 'S275J0': 7850, 'S355J0': 7850,
                'S235J2': 7850, 'S275J2': 7850, 'S355J2': 7850,
                'S420N': 7850, 'S420NL': 7850, 'S460N': 7850, 'S460NL': 7850,
                '1.4301': 8000, '1.4401': 8000, '1.4404': 8000, '1.4571': 8000,
                'Aluminyum': 2700
            };
            
            // Standartlar
            this.standards = {
                'S235JR': 'EN 10025-2', 'S275JR': 'EN 10025-2', 'S355JR': 'EN 10025-2',
                'S235J0': 'EN 10025-2', 'S275J0': 'EN 10025-2', 'S355J0': 'EN 10025-2',
                'S235J2': 'EN 10025-2', 'S275J2': 'EN 10025-2', 'S355J2': 'EN 10025-2',
                'S420N': 'EN 10025-3', 'S420NL': 'EN 10025-3',
                'S460N': 'EN 10025-3', 'S460NL': 'EN 10025-3',
                '1.4301': 'EN 10088-2', '1.4401': 'EN 10088-2',
                '1.4404': 'EN 10088-2', '1.4571': 'EN 10088-2',
                'Aluminyum': 'EN 755-2'
            };
            
            // Standart köşebent ölçüleri (eşit kollu)
            this.standardSizes = [
                { a: 20, b: 20, t: 3 },
                { a: 25, b: 25, t: 3 },
                { a: 25, b: 25, t: 4 },
                { a: 30, b: 30, t: 3 },
                { a: 30, b: 30, t: 4 },
                { a: 35, b: 35, t: 4 },
                { a: 35, b: 35, t: 5 },
                { a: 40, b: 40, t: 3 },
                { a: 40, b: 40, t: 4 },
                { a: 40, b: 40, t: 5 },
                { a: 45, b: 45, t: 4.5 },
                { a: 50, b: 50, t: 4 },
                { a: 50, b: 50, t: 5 },
                { a: 50, b: 50, t: 6 },
                { a: 60, b: 60, t: 5 },
                { a: 60, b: 60, t: 6 },
                { a: 60, b: 60, t: 8 },
                { a: 65, b: 65, t: 7 },
                { a: 70, b: 70, t: 6 },
                { a: 70, b: 70, t: 7 },
                { a: 75, b: 75, t: 6 },
                { a: 75, b: 75, t: 8 },
                { a: 80, b: 80, t: 8 },
                { a: 80, b: 80, t: 10 },
                { a: 90, b: 90, t: 7 },
                { a: 90, b: 90, t: 9 },
                { a: 100, b: 100, t: 8 },
                { a: 100, b: 100, t: 10 },
                { a: 100, b: 100, t: 12 },
                { a: 120, b: 120, t: 10 },
                { a: 120, b: 120, t: 12 },
                { a: 150, b: 150, t: 10 },
                { a: 150, b: 150, t: 12 },
                { a: 150, b: 150, t: 15 },
                { a: 200, b: 200, t: 16 },
                { a: 200, b: 200, t: 20 },
                { a: 200, b: 200, t: 24 }
            ];
            
            // Eşit kolsuz standart ölçüler
            this.unequalSizes = [
                { a: 30, b: 20, t: 3 },
                { a: 30, b: 20, t: 4 },
                { a: 40, b: 20, t: 3 },
                { a: 40, b: 20, t: 4 },
                { a: 40, b: 25, t: 4 },
                { a: 45, b: 30, t: 5 },
                { a: 50, b: 30, t: 5 },
                { a: 50, b: 40, t: 5 },
                { a: 60, b: 30, t: 5 },
                { a: 60, b: 40, t: 5 },
                { a: 60, b: 40, t: 6 },
                { a: 65, b: 50, t: 5 },
                { a: 70, b: 50, t: 6 },
                { a: 75, b: 50, t: 6 },
                { a: 75, b: 50, t: 8 },
                { a: 80, b: 40, t: 6 },
                { a: 80, b: 40, t: 8 },
                { a: 80, b: 60, t: 7 },
                { a: 100, b: 50, t: 6 },
                { a: 100, b: 50, t: 8 },
                { a: 100, b: 65, t: 7 },
                { a: 100, b: 65, t: 10 },
                { a: 100, b: 75, t: 8 },
                { a: 100, b: 75, t: 10 },
                { a: 120, b: 80, t: 8 },
                { a: 120, b: 80, t: 10 },
                { a: 120, b: 80, t: 12 },
                { a: 125, b: 75, t: 8 },
                { a: 125, b: 75, t: 10 },
                { a: 150, b: 75, t: 10 },
                { a: 150, b: 90, t: 10 },
                { a: 150, b: 100, t: 10 },
                { a: 150, b: 100, t: 12 },
                { a: 200, b: 100, t: 10 },
                { a: 200, b: 100, t: 12 },
                { a: 200, b: 150, t: 12 },
                { a: 200, b: 150, t: 15 }
            ];
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="kol1">${this.getText('kol1_label')}</label>
                        <input type="number" id="kol1" 
                               placeholder="${this.getText('kol1_placeholder')}" 
                               min="0" step="any" list="kol1List">
                        <datalist id="kol1List">
                            ${this.getUniqueValues('a').map(val => `<option value="${val}">`).join('')}
                        </datalist>
                    </div>
                    <div class="form-group">
                        <label for="kol2">${this.getText('kol2_label')}</label>
                        <input type="number" id="kol2" 
                               placeholder="${this.getText('kol2_placeholder')}" 
                               min="0" step="any" list="kol2List">
                        <datalist id="kol2List">
                            ${this.getUniqueValues('b').map(val => `<option value="${val}">`).join('')}
                        </datalist>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="kalinlik">${this.getText('kalinlik_label')}</label>
                        <input type="number" id="kalinlik" 
                               placeholder="${this.getText('kalinlik_placeholder')}" 
                               min="0" step="any" list="kalinlikList">
                        <datalist id="kalinlikList">
                            ${this.getUniqueValues('t').map(val => `<option value="${val}">`).join('')}
                        </datalist>
                    </div>
                    <div class="form-group">
                        <label for="uzunluk">${this.getText('uzunluk_label')}</label>
                        <input type="number" id="uzunluk" 
                               placeholder="${this.getText('uzunluk_placeholder')}" 
                               min="0" step="any" value="6000">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <small style="color: #718096; font-style: italic;">
                            ${lang === 'tr' ? 
                              '💡 Standart ölçüler için değerleri listeden seçebilirsiniz' : 
                              '💡 You can select standard dimensions from the list'}
                        </small>
                    </div>
                </div>
            `;
        }

        getUniqueValues(property) {
            const allSizes = [...this.standardSizes, ...this.unequalSizes];
            const uniqueValues = [...new Set(allSizes.map(size => size[property]))];
            return uniqueValues.sort((a, b) => a - b);
        }

        calculate(formData) {
            const kol1 = parseFloat(formData.kol1) || 0;
            const kol2 = parseFloat(formData.kol2) || 0;
            const kalinlik = parseFloat(formData.kalinlik) || 0;
            const uzunluk = parseFloat(formData.uzunluk) || 0;
            const adet = parseFloat(formData.adet) || 1;
            const malzemeCinsi = formData.malzemeCinsi || 'S235JR';
            
            if (!kol1 || !kol2 || !kalinlik || !uzunluk) {
                return null;
            }
            
            // Köşebent kesit alanı formülü (mm²)
            // A = t * (a + b - t)
            const kesitAlani = kalinlik * (kol1 + kol2 - kalinlik);
            
            // Hacim (mm³ → m³)
            const hacimM3 = (kesitAlani * uzunluk) / 1000000000;
            
            // Yoğunluk
            const yogunluk = this.getDensity(malzemeCinsi);
            
            // Ağırlık (kg)
            const birimAgirlik = hacimM3 * yogunluk;
            const toplamAgirlik = birimAgirlik * adet;
            
            // Teorik ağırlık (kg/m) - bilgi amaçlı
            const teorikAgirlik = (kesitAlani / 1000000) * yogunluk;
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                kesitAlani: kesitAlani.toFixed(2),
                teorikAgirlik: teorikAgirlik.toFixed(3),
                suHacmi: null
            };
        }

        validate(formData) {
            const kol1 = parseFloat(formData.kol1) || 0;
            const kol2 = parseFloat(formData.kol2) || 0;
            const kalinlik = parseFloat(formData.kalinlik) || 0;
            const uzunluk = parseFloat(formData.uzunluk) || 0;
            
            if (!kol1 || !kol2 || !kalinlik || !uzunluk) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            // Et kalınlığı kontrolü
            if (kalinlik >= kol1 || kalinlik >= kol2) {
                return {
                    isValid: false,
                    message: this.getText('validation_thickness')
                };
            }
            
            return { isValid: true };
        }

        formatDimensions(formData) {
            const kol1 = parseFloat(formData.kol1) || 0;
            const kol2 = parseFloat(formData.kol2) || 0;
            const kalinlik = parseFloat(formData.kalinlik) || 0;
            const uzunluk = parseFloat(formData.uzunluk) || 0;
            
            if (kol1 === kol2) {
                return `L ${kol1}x${kol1}x${kalinlik} L:${uzunluk}mm`;
            } else {
                return `L ${kol1}x${kol2}x${kalinlik} L:${uzunluk}mm`;
            }
        }

        // Standart ölçü kontrolü (opsiyonel)
        isStandardSize(kol1, kol2, kalinlik) {
            const allSizes = [...this.standardSizes, ...this.unequalSizes];
            return allSizes.some(size => 
                size.a === kol1 && size.b === kol2 && size.t === kalinlik
            );
        }
    }

    // Malzemeyi kaydet
    const kosebentMaterial = new KosebentMaterial();
    kosebentMaterial.register();

})(window);