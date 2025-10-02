/**
 * SAC Malzeme Modülü
 */

(function(window) {
    'use strict';
    
    class SacMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'sac';
            
            // Dil metinleri
            this.texts = {
                tr: {
                    display_name: 'Sac',
                    en_label: 'En (mm)',
                    boy_label: 'Boy (mm)',
                    kalinlik_label: 'Kalınlık (mm)',
                    en_placeholder: 'En değerini girin',
                    boy_placeholder: 'Boy değerini girin',
                    kalinlik_placeholder: 'Kalınlık değerini girin',
                    validation_error: 'Tüm ölçüler girilmelidir'
                },
                en: {
                    display_name: 'Sheet Metal',
                    en_label: 'Width (mm)',
                    boy_label: 'Length (mm)',
                    kalinlik_label: 'Thickness (mm)',
                    en_placeholder: 'Enter width',
                    boy_placeholder: 'Enter length',
                    kalinlik_placeholder: 'Enter thickness',
                    validation_error: 'All dimensions must be entered'
                }
            };
            
            // Malzeme cinsleri
            this.grades = [
                'S235JR', 'S275JR', 'S355JR',
                'P235GH', 'P250GH', 'P265GH', 'P295GH', 'P355GH',
                '1.4301', '1.4401', '1.4404', '1.4845',
                'Aluminyum', 'Bakır', 'Pirinç'
            ];
            
            // Yoğunluklar (kg/m³)
            this.densities = {
                'S235JR': 7850, 'S275JR': 7850, 'S355JR': 7850,
                'P235GH': 7850, 'P250GH': 7850, 'P265GH': 7850, 
                'P295GH': 7850, 'P355GH': 7850,
                '1.4301': 8000, '1.4401': 8000, '1.4404': 8000, '1.4845': 7900,
                'Aluminyum': 2700, 'Bakır': 8960, 'Pirinç': 8470
            };
            
            // Standartlar
            this.standards = {
                'S235JR': 'EN 10025-2', 'S275JR': 'EN 10025-2', 'S355JR': 'EN 10025-2',
                'P235GH': 'EN 10028-2', 'P250GH': 'EN 10028-2', 'P265GH': 'EN 10028-2',
                'P295GH': 'EN 10028-2', 'P355GH': 'EN 10028-2',
                '1.4301': 'EN 10028-7', '1.4401': 'EN 10028-7', 
                '1.4404': 'EN 10028-7', '1.4845': 'EN 10028-7',
                'Aluminyum': 'EN 573', 'Bakır': 'EN 1652', 'Pirinç': 'EN 12164'
            };
        }

        createUI() {
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="en">${this.getText('en_label')}</label>
                        <input type="number" id="en" placeholder="${this.getText('en_placeholder')}" 
                               min="0" step="any">
                    </div>
                    <div class="form-group">
                        <label for="boy">${this.getText('boy_label')}</label>
                        <input type="number" id="boy" placeholder="${this.getText('boy_placeholder')}" 
                               min="0" step="any">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="kalinlik">${this.getText('kalinlik_label')}</label>
                        <input type="number" id="kalinlik" 
                               placeholder="${this.getText('kalinlik_placeholder')}" 
                               min="0" step="any">
                    </div>
                </div>
            `;
        }

        calculate(formData) {
            const en = parseFloat(formData.en) || 0;
            const boy = parseFloat(formData.boy) || 0;
            const kalinlik = parseFloat(formData.kalinlik) || 0;
            const adet = parseFloat(formData.adet) || 1;
            const malzemeCinsi = formData.malzemeCinsi || 'S235JR';
            
            if (!en || !boy || !kalinlik) {
                return null;
            }
            
            // Alan (mm² → m²)
            const alanM2 = (en * boy) / 1000000;
            
            // Kalınlık (mm → m)
            const kalinlikM = kalinlik / 1000;
            
            // Hacim (m³)
            const hacim = alanM2 * kalinlikM;
            
            // Yoğunluk
            const yogunluk = this.getDensity(malzemeCinsi);
            
            // Ağırlık (kg)
            const birimAgirlik = hacim * yogunluk;
            const toplamAgirlik = birimAgirlik * adet;
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                suHacmi: null
            };
        }

        validate(formData) {
            const en = parseFloat(formData.en) || 0;
            const boy = parseFloat(formData.boy) || 0;
            const kalinlik = parseFloat(formData.kalinlik) || 0;
            
            if (!en || !boy || !kalinlik) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            return { isValid: true };
        }

        formatDimensions(formData) {
            const en = parseFloat(formData.en) || 0;
            const boy = parseFloat(formData.boy) || 0;
            const kalinlik = parseFloat(formData.kalinlik) || 0;
            return `${en} x ${boy} x ${kalinlik} mm`;
        }
    }

    // Malzemeyi kaydet
    const sacMaterial = new SacMaterial();
    sacMaterial.register();

})(window);