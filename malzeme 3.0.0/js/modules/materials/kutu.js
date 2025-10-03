/**
 * KUTU PROFİL Malzeme Modülü
 * Kare ve Dikdörtgen Kutu Profiller
 */

(function(window) {
    'use strict';
    
    class KutuMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'kutu';
            
            // Dil metinleri
            this.texts = {
                tr: {
                    display_name: 'Kutu Profil',
                    en_label: 'En (mm)',
                    boy_label: 'Boy (mm)',
                    kalinlik_label: 'Et Kalınlığı (mm)',
                    uzunluk_label: 'Uzunluk (mm)',
                    en_placeholder: 'En ölçüsü',
                    boy_placeholder: 'Boy ölçüsü',
                    kalinlik_placeholder: 'Et kalınlığı',
                    uzunluk_placeholder: 'Uzunluk değeri',
                    validation_error: 'Tüm ölçüler girilmelidir',
                    validation_thickness: 'Et kalınlığı en/boy değerinin yarısından küçük olmalıdır',
                    kesit_alan_info: 'Kesit Alanı',
                    teorik_agirlik_info: 'Teorik Ağırlık'
                },
                en: {
                    display_name: 'Box Profile',
                    en_label: 'Width (mm)',
                    boy_label: 'Height (mm)',
                    kalinlik_label: 'Wall Thickness (mm)',
                    uzunluk_label: 'Length (mm)',
                    en_placeholder: 'Width dimension',
                    boy_placeholder: 'Height dimension',
                    kalinlik_placeholder: 'Wall thickness',
                    uzunluk_placeholder: 'Length value',
                    validation_error: 'All dimensions must be entered',
                    validation_thickness: 'Wall thickness must be less than half of width/height',
                    kesit_alan_info: 'Cross Section Area',
                    teorik_agirlik_info: 'Theoretical Weight'
                }
            };
            
            // Malzeme cinsleri
            this.grades = [
                'S235JR', 'S275JR', 'S355JR',
                'S235J0', 'S275J0', 'S355J0',
                'S235J2', 'S275J2', 'S355J2',
                'DKP', 'Galvaniz',
                '1.4301', '1.4401', '1.4404',
                'Aluminyum'
            ];
            
            // Yoğunluklar (kg/m³)
            this.densities = {
                'S235JR': 7850, 'S275JR': 7850, 'S355JR': 7850,
                'S235J0': 7850, 'S275J0': 7850, 'S355J0': 7850,
                'S235J2': 7850, 'S275J2': 7850, 'S355J2': 7850,
                'DKP': 7850, 'Galvaniz': 7850,
                '1.4301': 8000, '1.4401': 8000, '1.4404': 8000,
                'Aluminyum': 2700
            };
            
            // Standartlar
            this.standards = {
                'S235JR': 'EN 10219-1', 'S275JR': 'EN 10219-1', 'S355JR': 'EN 10219-1',
                'S235J0': 'EN 10219-1', 'S275J0': 'EN 10219-1', 'S355J0': 'EN 10219-1',
                'S235J2': 'EN 10219-1', 'S275J2': 'EN 10219-1', 'S355J2': 'EN 10219-1',
                'DKP': 'EN 10219-1', 'Galvaniz': 'EN 10219-1',
                '1.4301': 'EN 10219-2', '1.4401': 'EN 10219-2', '1.4404': 'EN 10219-2',
                'Aluminyum': 'EN 755-2'
            };
            
            // Standart kutu profil ölçüleri
            this.standardSizes = {
                // Kare profiller [en x boy x et kalınlığı]
                '20x20': [1.5, 2, 2.5, 3],
                '25x25': [1.5, 2, 2.5, 3],
                '30x30': [1.5, 2, 2.5, 3, 4],
                '35x35': [2, 2.5, 3, 4],
                '40x40': [2, 2.5, 3, 4, 5],
                '45x45': [2, 2.5, 3, 4, 5],
                '50x50': [2, 2.5, 3, 4, 5, 6],
                '60x60': [2, 2.5, 3, 4, 5, 6, 8],
                '70x70': [2.5, 3, 4, 5, 6, 8],
                '80x80': [3, 4, 5, 6, 8, 10],
                '90x90': [3, 4, 5, 6, 8, 10],
                '100x100': [3, 4, 5, 6, 8, 10, 12],
                '120x120': [4, 5, 6, 8, 10, 12],
                '140x140': [5, 6, 8, 10, 12],
                '150x150': [5, 6, 8, 10, 12],
                '160x160': [5, 6, 8, 10, 12],
                '180x180': [6, 8, 10, 12],
                '200x200': [6, 8, 10, 12, 14, 16],
                '250x250': [8, 10, 12, 14, 16],
                '300x300': [10, 12, 14, 16, 20],
                // Dikdörtgen profiller
                '30x20': [1.5, 2, 2.5, 3],
                '40x20': [1.5, 2, 2.5, 3, 4],
                '40x30': [2, 2.5, 3, 4],
                '50x30': [2, 2.5, 3, 4, 5],
                '50x40': [2, 2.5, 3, 4, 5],
                '60x30': [2, 2.5, 3, 4, 5],
                '60x40': [2, 2.5, 3, 4, 5, 6],
                '60x50': [2.5, 3, 4, 5, 6],
                '70x40': [2.5, 3, 4, 5, 6],
                '70x50': [2.5, 3, 4, 5, 6],
                '80x40': [3, 4, 5, 6, 8],
                '80x50': [3, 4, 5, 6, 8],
                '80x60': [3, 4, 5, 6, 8],
                '100x40': [3, 4, 5, 6, 8],
                '100x50': [3, 4, 5, 6, 8],
                '100x60': [3, 4, 5, 6, 8, 10],
                '100x80': [3, 4, 5, 6, 8, 10],
                '120x60': [4, 5, 6, 8, 10],
                '120x80': [4, 5, 6, 8, 10],
                '140x80': [5, 6, 8, 10],
                '150x100': [5, 6, 8, 10, 12],
                '160x80': [5, 6, 8, 10, 12],
                '200x100': [6, 8, 10, 12],
                '200x120': [6, 8, 10, 12],
                '250x150': [8, 10, 12, 14, 16],
                '300x200': [10, 12, 14, 16]
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
                               min="0" step="any" list="kutuEnList">
                        <datalist id="kutuEnList">
                            ${this.getUniqueEnValues().map(val => `<option value="${val}">`).join('')}
                        </datalist>
                    </div>
                    <div class="form-group">
                        <label for="boy">${this.getText('boy_label')}</label>
                        <input type="number" id="boy" 
                               placeholder="${this.getText('boy_placeholder')}" 
                               min="0" step="any" list="kutuBoyList">
                        <datalist id="kutuBoyList">
                            ${this.getUniqueBoyValues().map(val => `<option value="${val}">`).join('')}
                        </datalist>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="kalinlik">${this.getText('kalinlik_label')}</label>
                        <input type="number" id="kalinlik" 
                               placeholder="${this.getText('kalinlik_placeholder')}" 
                               min="0" step="any" list="kutuKalinlikList">
                        <datalist id="kutuKalinlikList">
                            ${this.getUniqueThicknessValues().map(val => `<option value="${val}">`).join('')}
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

        getUniqueEnValues() {
            const values = new Set();
            Object.keys(this.standardSizes).forEach(size => {
                const [en, boy] = size.split('x');
                values.add(parseInt(en));
            });
            return Array.from(values).sort((a, b) => a - b);
        }

        getUniqueBoyValues() {
            const values = new Set();
            Object.keys(this.standardSizes).forEach(size => {
                const [en, boy] = size.split('x');
                values.add(parseInt(boy));
            });
            return Array.from(values).sort((a, b) => a - b);
        }

        getUniqueThicknessValues() {
            const values = new Set();
            Object.values(this.standardSizes).forEach(thicknesses => {
                thicknesses.forEach(t => values.add(t));
            });
            return Array.from(values).sort((a, b) => a - b);
        }

        calculate(formData) {
            const en = parseFloat(formData.en) || 0;
            const boy = parseFloat(formData.boy) || 0;
            const kalinlik = parseFloat(formData.kalinlik) || 0;
            const uzunluk = parseFloat(formData.uzunluk) || 0;
            const adet = parseFloat(formData.adet) || 1;
            const malzemeCinsi = formData.malzemeCinsi || 'S235JR';
            
            if (!en || !boy || !kalinlik || !uzunluk) {
                return null;
            }
            
            // Kutu profil kesit alanı formülü (mm²)
            // A = 2 * t * (a + b - 2t)
            const kesitAlani = 2 * kalinlik * (en + boy - 2 * kalinlik);
            
            // Hacim (mm³ → m³)
            const hacimM3 = (kesitAlani * uzunluk) / 1000000000;
            
            // Yoğunluk
            const yogunluk = this.getDensity(malzemeCinsi);
            
            // Ağırlık (kg)
            const birimAgirlik = hacimM3 * yogunluk;
            const toplamAgirlik = birimAgirlik * adet;
            
            // Teorik ağırlık (kg/m)
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
            const en = parseFloat(formData.en) || 0;
            const boy = parseFloat(formData.boy) || 0;
            const kalinlik = parseFloat(formData.kalinlik) || 0;
            const uzunluk = parseFloat(formData.uzunluk) || 0;
            
            if (!en || !boy || !kalinlik || !uzunluk) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            // Et kalınlığı kontrolü
            if (kalinlik >= (en / 2) || kalinlik >= (boy / 2)) {
                return {
                    isValid: false,
                    message: this.getText('validation_thickness')
                };
            }
            
            return { isValid: true };
        }

        formatDimensions(formData) {
            const en = parseFloat(formData.en) || 0;
            const boy = parseFloat(formData.boy) || 0;
            const kalinlik = parseFloat(formData.kalinlik) || 0;
            const uzunluk = parseFloat(formData.uzunluk) || 0;
            
            return `${en}x${boy}x${kalinlik} L:${uzunluk}mm`;
        }

        // Standart ölçü kontrolü
        isStandardSize(en, boy, kalinlik) {
            const sizeKey = `${en}x${boy}`;
            if (this.standardSizes[sizeKey]) {
                return this.standardSizes[sizeKey].includes(kalinlik);
            }
            return false;
        }
    }

    // Malzemeyi kaydet
    const kutuMaterial = new KutuMaterial();
    kutuMaterial.register();

})(window);