/**
 * DİRSEK Malzeme Modülü
 * EN 10253-1 ve ASME B16.9 Standartları
 * 45°, 90°, 180° Long Radius Dirsekler
 */

(function(window) {
    'use strict';
    
    class DirsekMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'dirsek';
            
            // Dil metinleri
            this.texts = {
                tr: {
                    display_name: 'Dirsek',
                    standart_sistem_label: 'Standart Sistemi',
                    aci_label: 'Dirsek Açısı',
                    boyut_label: 'Nominal Çap',
                    kalinlik_label: 'Et Kalınlığı (mm)',
                    radius_label: 'Radius Tipi',
                    validation_error: 'Tüm alanlar seçilmelidir',
                    select_standard: 'Standart seçin',
                    select_angle: 'Açı seçin',
                    select_size: 'Çap seçin',
                    select_thickness: 'Et kalınlığı seçin',
                    select_radius: 'Radius tipi seçin',
                    weight_info: 'Birim Ağırlık',
                    standard_info: 'Standart',
                    radius_info: 'Radius',
                    // Standartlar
                    en_standard: 'EN 10253-1',
                    asme_standard: 'ASME B16.9',
                    // Radius tipleri
                    long_radius: 'Long Radius (R=1.5D)',
                    short_radius: 'Short Radius (R=1.0D)',
                    // Açı seçenekleri
                    degree_45: '45°',
                    degree_90: '90°',
                    degree_180: '180° (Return)'
                },
                en: {
                    display_name: 'Elbow',
                    standart_sistem_label: 'Standard System',
                    aci_label: 'Elbow Angle',
                    boyut_label: 'Nominal Size',
                    kalinlik_label: 'Wall Thickness (mm)',
                    radius_label: 'Radius Type',
                    validation_error: 'All fields must be selected',
                    select_standard: 'Select standard',
                    select_angle: 'Select angle',
                    select_size: 'Select size',
                    select_thickness: 'Select wall thickness',
                    select_radius: 'Select radius type',
                    weight_info: 'Unit Weight',
                    standard_info: 'Standard',
                    radius_info: 'Radius',
                    // Standards
                    en_standard: 'EN 10253-1',
                    asme_standard: 'ASME B16.9',
                    // Radius types
                    long_radius: 'Long Radius (R=1.5D)',
                    short_radius: 'Short Radius (R=1.0D)',
                    // Angle options
                    degree_45: '45°',
                    degree_90: '90°',
                    degree_180: '180° (Return)'
                }
            };
            
            // Malzeme cinsleri
            this.grades = [
                // Karbon çelik
                'P235TR1', 'P235TR2', 'P235GH', 'P265GH',
                'A234 WPB', 'A420 WPL6',
                // Paslanmaz
                '1.4301', '1.4401', '1.4404', '1.4541', '1.4571',
                'A403 WP304', 'A403 WP304L', 'A403 WP316', 'A403 WP316L', 'A403 WP321',
                // Alaşımlı
                'P11', 'P22', 'P91',
                'A234 WP11', 'A234 WP22', 'A234 WP91'
            ];
            
            // Yoğunluklar
            this.densities = {
                'P235TR1': 7850, 'P235TR2': 7850, 'P235GH': 7850, 'P265GH': 7850,
                'A234 WPB': 7850, 'A420 WPL6': 7850,
                '1.4301': 8000, '1.4401': 8000, '1.4404': 8000, '1.4541': 8000, '1.4571': 8000,
                'A403 WP304': 8000, 'A403 WP304L': 8000, 'A403 WP316': 8000,
                'A403 WP316L': 8000, 'A403 WP321': 8000,
                'P11': 7850, 'P22': 7850, 'P91': 7850,
                'A234 WP11': 7850, 'A234 WP22': 7850, 'A234 WP91': 7850
            };
            
            // Standartlar
            this.standards = {
                'P235TR1': 'EN 10253-1', 'P235TR2': 'EN 10253-1',
                'P235GH': 'EN 10253-1', 'P265GH': 'EN 10253-1',
                'A234 WPB': 'ASME B16.9', 'A420 WPL6': 'ASME B16.9',
                '1.4301': 'EN 10253-1', '1.4401': 'EN 10253-1', '1.4404': 'EN 10253-1',
                '1.4541': 'EN 10253-1', '1.4571': 'EN 10253-1',
                'A403 WP304': 'ASME B16.9', 'A403 WP304L': 'ASME B16.9',
                'A403 WP316': 'ASME B16.9', 'A403 WP316L': 'ASME B16.9',
                'A403 WP321': 'ASME B16.9',
                'P11': 'EN 10253-1', 'P22': 'EN 10253-1', 'P91': 'EN 10253-1',
                'A234 WP11': 'ASME B16.9', 'A234 WP22': 'ASME B16.9', 'A234 WP91': 'ASME B16.9'
            };
            
            // Dirsek ağırlık verileri (kg) - MaterialData.js yapısı
            this.dirsekVerileri = {
                // 90° Long Radius (R=1.5D) Dirsekler
                '90': {
                    '15': { '2.0': 0.03, '2.3': 0.04, '2.6': 0.04, '2.9': 0.05, '3.2': 0.05 },
                    '20': { '2.0': 0.05, '2.3': 0.06, '2.6': 0.07, '2.9': 0.08, '3.6': 0.09 },
                    '25': { '2.3': 0.10, '2.6': 0.11, '2.9': 0.12, '3.2': 0.14, '4.0': 0.17 },
                    '32': { '2.6': 0.17, '2.9': 0.19, '3.2': 0.21, '3.6': 0.24, '4.5': 0.29 },
                    '40': { '2.6': 0.23, '2.9': 0.25, '3.2': 0.28, '3.7': 0.32, '5.1': 0.43 },
                    '50': { '2.9': 0.39, '3.2': 0.43, '3.6': 0.48, '4.5': 0.59, '5.6': 0.73 },
                    '65': { '2.9': 0.63, '3.2': 0.69, '3.6': 0.78, '5.0': 1.06, '7.1': 1.47 },
                    '80': { '3.2': 0.94, '3.6': 1.06, '4.0': 1.17, '5.6': 1.61, '7.6': 2.15 },
                    '100': { '3.6': 1.77, '4.0': 1.96, '4.5': 2.19, '6.3': 3.03, '8.6': 4.07 },
                    '125': { '4.0': 3.01, '4.5': 3.37, '5.0': 3.74, '6.3': 4.67, '10.0': 7.26 },
                    '150': { '4.5': 4.81, '5.0': 5.33, '5.6': 5.95, '7.1': 7.48, '11.0': 11.41 },
                    '200': { '5.0': 9.06, '5.6': 10.13, '6.3': 11.36, '8.0': 14.35, '12.5': 22.10 },
                    '250': { '5.6': 15.76, '6.3': 17.69, '7.1': 19.88, '9.3': 25.92, '15.1': 41.44 },
                    '300': { '5.9': 23.54, '6.3': 25.11, '7.1': 28.24, '10.0': 39.43, '17.5': 67.56 },
                    '350': { '6.3': 34.00, '7.1': 38.20, '8.8': 47.20, '12.5': 66.30, '16.0': 84.20 },
                    '400': { '6.3': 44.30, '7.1': 49.80, '8.8': 61.50, '12.5': 86.30, '17.5': 119.50 },
                    '450': { '6.3': 56.10, '7.1': 63.10, '8.8': 77.90, '12.5': 109.40, '20.0': 173.00 },
                    '500': { '6.3': 69.40, '7.1': 78.00, '9.5': 103.80, '12.5': 135.20, '20.0': 213.70 },
                    '600': { '6.3': 100.00, '7.1': 112.40, '9.5': 149.60, '14.2': 221.70, '20.0': 308.00 }
                },
                
                // 45° Long Radius Dirsekler (90° ağırlığının yaklaşık %65'i)
                '45': {
                    '15': { '2.3': 0.026, '2.9': 0.033, '3.2': 0.033 },
                    '20': { '2.3': 0.039, '2.9': 0.052, '3.6': 0.059 },
                    '25': { '2.6': 0.072, '3.2': 0.091, '4.0': 0.111 },
                    '32': { '2.9': 0.124, '3.6': 0.156, '4.5': 0.189 },
                    '40': { '2.9': 0.163, '3.7': 0.208, '5.1': 0.280 },
                    '50': { '3.2': 0.280, '4.5': 0.384, '5.6': 0.475 },
                    '65': { '3.2': 0.449, '5.0': 0.689, '7.1': 0.956 },
                    '80': { '3.6': 0.689, '5.6': 1.047, '7.6': 1.398 },
                    '100': { '4.0': 1.274, '6.3': 1.970, '8.6': 2.646 },
                    '125': { '4.5': 2.191, '6.3': 3.036, '10.0': 4.719 },
                    '150': { '5.0': 3.465, '7.1': 4.862, '11.0': 7.417 },
                    '200': { '5.6': 6.585, '8.0': 9.328, '12.5': 14.365 },
                    '250': { '6.3': 11.499, '9.3': 16.848, '15.1': 26.936 },
                    '300': { '6.3': 16.322, '10.0': 25.630, '17.5': 43.914 },
                    '350': { '7.1': 24.830, '12.5': 43.095, '16.0': 54.730 },
                    '400': { '7.1': 32.370, '12.5': 56.095, '17.5': 77.675 },
                    '450': { '7.1': 41.015, '12.5': 71.110, '20.0': 112.450 },
                    '500': { '7.1': 50.700, '12.5': 87.880, '20.0': 138.905 },
                    '600': { '7.1': 73.060, '14.2': 144.105, '20.0': 200.200 }
                },
                
                // 180° Dirsekler (90° ağırlığının 2 katı)
                '180': {
                    '15': { '2.0': 0.06, '2.3': 0.08, '2.6': 0.08, '2.9': 0.10, '3.2': 0.10 },
                    '20': { '2.0': 0.10, '2.3': 0.12, '2.6': 0.14, '2.9': 0.16, '3.6': 0.18 },
                    '25': { '2.3': 0.20, '2.6': 0.22, '2.9': 0.24, '3.2': 0.28, '4.0': 0.34 },
                    '32': { '2.6': 0.34, '2.9': 0.38, '3.2': 0.42, '3.6': 0.48, '4.5': 0.58 },
                    '40': { '2.6': 0.46, '2.9': 0.50, '3.2': 0.56, '3.7': 0.64, '5.1': 0.86 },
                    '50': { '2.9': 0.78, '3.2': 0.86, '3.6': 0.96, '4.5': 1.18, '5.6': 1.46 },
                    '65': { '2.9': 1.26, '3.2': 1.38, '3.6': 1.56, '5.0': 2.12, '7.1': 2.94 },
                    '80': { '3.2': 1.88, '3.6': 2.12, '4.0': 2.34, '5.6': 3.22, '7.6': 4.30 },
                    '100': { '3.6': 3.54, '4.0': 3.92, '4.5': 4.38, '6.3': 6.06, '8.6': 8.14 },
                    '125': { '4.0': 6.02, '4.5': 6.74, '5.0': 7.48, '6.3': 9.34, '10.0': 14.52 },
                    '150': { '4.5': 9.62, '5.0': 10.66, '5.6': 11.90, '7.1': 14.96, '11.0': 22.82 },
                    '200': { '5.0': 18.12, '5.6': 20.26, '6.3': 22.72, '8.0': 28.70, '12.5': 44.20 },
                    '250': { '5.6': 31.52, '6.3': 35.38, '7.1': 39.76, '9.3': 51.84, '15.1': 82.88 },
                    '300': { '5.9': 47.08, '6.3': 50.22, '7.1': 56.48, '10.0': 78.86, '17.5': 135.12 },
                    '350': { '6.3': 68.00, '7.1': 76.40, '8.8': 94.40, '12.5': 132.60, '16.0': 168.40 },
                    '400': { '6.3': 88.60, '7.1': 99.60, '8.8': 123.00, '12.5': 172.60, '17.5': 239.00 },
                    '450': { '6.3': 112.20, '7.1': 126.20, '8.8': 155.80, '12.5': 218.80, '20.0': 346.00 },
                    '500': { '6.3': 138.80, '7.1': 156.00, '9.5': 207.60, '12.5': 270.40, '20.0': 427.40 },
                    '600': { '6.3': 200.00, '7.1': 224.80, '9.5': 299.20, '14.2': 443.40, '20.0': 616.00 }
                }
            };
            
            // DN-NPS dönüşüm tablosu
            this.dnToNps = {
                '15': '1/2"', '20': '3/4"', '25': '1"', '32': '1-1/4"',
                '40': '1-1/2"', '50': '2"', '65': '2-1/2"', '80': '3"',
                '100': '4"', '125': '5"', '150': '6"', '200': '8"',
                '250': '10"', '300': '12"', '350': '14"', '400': '16"',
                '450': '18"', '500': '20"', '600': '24"'
            };
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="standartSistem">${this.getText('standart_sistem_label')}</label>
                        <select id="standartSistem" onchange="window.ApplicationController.updateDirsekStandards()">
                            <option value="">${this.getText('select_standard')}</option>
                            <option value="en">${this.getText('en_standard')}</option>
                            <option value="asme">${this.getText('asme_standard')}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="dirsekAci">${this.getText('aci_label')}</label>
                        <select id="dirsekAci" onchange="window.ApplicationController.updateDirsekSizes()">
                            <option value="">${this.getText('select_angle')}</option>
                            <option value="45">${this.getText('degree_45')}</option>
                            <option value="90">${this.getText('degree_90')}</option>
                            <option value="180">${this.getText('degree_180')}</option>
                        </select>
                    </div>
                </div>
                <div class="form-row" id="dirsekDimensionsRow" style="display: none;">
                    <div class="form-group">
                        <label for="dirsekBoyut">${this.getText('boyut_label')}</label>
                        <select id="dirsekBoyut" onchange="window.ApplicationController.updateDirsekThickness()">
                            <option value="">${this.getText('select_size')}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="dirsekKalinlik">${this.getText('kalinlik_label')}</label>
                        <select id="dirsekKalinlik" onchange="window.ApplicationController.updateDirsekWeight()">
                            <option value="">${this.getText('select_thickness')}</option>
                        </select>
                    </div>
                </div>
                <div class="form-row" id="dirsekInfoRow" style="display: none;">
                    <div class="form-group">
                        <small style="color: #4299e1; font-weight: 600;">
                            <span id="dirsekWeightInfo"></span> | 
                            <span id="dirsekStandardInfo"></span> | 
                            <span id="dirsekRadiusInfo"></span>
                        </small>
                    </div>
                </div>
            `;
        }

        calculate(formData) {
            const standartSistem = formData.standartSistem || '';
            const dirsekAci = formData.dirsekAci || '';
            const dirsekBoyut = formData.dirsekBoyut || '';
            const dirsekKalinlik = formData.dirsekKalinlik || '';
            const adet = parseFloat(formData.adet) || 1;
            const malzemeCinsi = formData.malzemeCinsi || 'P235GH';
            
            if (!standartSistem || !dirsekAci || !dirsekBoyut || !dirsekKalinlik) {
                return null;
            }
            
            // Ağırlık verilerini al
            let birimAgirlik = 0;
            
            if (this.dirsekVerileri[dirsekAci] && 
                this.dirsekVerileri[dirsekAci][dirsekBoyut] && 
                this.dirsekVerileri[dirsekAci][dirsekBoyut][dirsekKalinlik]) {
                birimAgirlik = this.dirsekVerileri[dirsekAci][dirsekBoyut][dirsekKalinlik];
            }
            
            if (!birimAgirlik) {
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
            const standartSistem = formData.standartSistem || '';
            const dirsekAci = formData.dirsekAci || '';
            const dirsekBoyut = formData.dirsekBoyut || '';
            const dirsekKalinlik = formData.dirsekKalinlik || '';
            
            if (!standartSistem || !dirsekAci || !dirsekBoyut || !dirsekKalinlik) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            return { isValid: true };
        }

        formatDimensions(formData) {
            const standartSistem = formData.standartSistem || '';
            const dirsekAci = formData.dirsekAci || '';
            const dirsekBoyut = formData.dirsekBoyut || '';
            const dirsekKalinlik = formData.dirsekKalinlik || '';
            
            const prefix = standartSistem === 'en' ? 'DN' : 'NPS ';
            const size = standartSistem === 'asme' ? this.dnToNps[dirsekBoyut] || dirsekBoyut : dirsekBoyut;
            
            return `${dirsekAci}° ${prefix}${size} WT:${dirsekKalinlik}mm`;
        }

        // Override formatRow to include standard info
        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            
            // Standart bilgisini güncelle
            const standart = formData.standartSistem === 'en' ? 'EN 10253-1' : 'ASME B16.9';
            baseRow.enNormu = standart;
            baseRow.dirsekDetay = {
                aci: formData.dirsekAci,
                boyut: formData.dirsekBoyut,
                kalinlik: formData.dirsekKalinlik,
                radius: 'LR (1.5D)'
            };
            
            return baseRow;
        }
    }

    // ApplicationController'a ek fonksiyonlar
    if (!window.ApplicationController.updateDirsekStandards) {
        window.ApplicationController.updateDirsekStandards = function() {
            const standartSistem = document.getElementById('standartSistem').value;
            
            if (!standartSistem) {
                document.getElementById('dirsekDimensionsRow').style.display = 'none';
                document.getElementById('dirsekInfoRow').style.display = 'none';
            }
        };
        
        window.ApplicationController.updateDirsekSizes = function() {
            const standartSistem = document.getElementById('standartSistem').value;
            const dirsekAci = document.getElementById('dirsekAci').value;
            
            if (!standartSistem || !dirsekAci) {
                document.getElementById('dirsekDimensionsRow').style.display = 'none';
                return;
            }
            
            const MaterialClass = window.MaterialRegistry.get('dirsek');
            const instance = new MaterialClass();
            
            document.getElementById('dirsekDimensionsRow').style.display = 'flex';
            
            const boyutSelect = document.getElementById('dirsekBoyut');
            boyutSelect.innerHTML = `<option value="">${instance.getText('select_size')}</option>`;
            
            // Boyutları doldur (açıya göre mevcut boyutlar)
            const sizes = Object.keys(instance.dirsekVerileri[dirsekAci] || {});
            
            sizes.forEach(size => {
                const displayText = standartSistem === 'en' ? 
                    `DN${size}` : 
                    `${instance.dnToNps[size] || size}`;
                    
                boyutSelect.innerHTML += `<option value="${size}">${displayText}</option>`;
            });
        };
        
        window.ApplicationController.updateDirsekThickness = function() {
            const dirsekAci = document.getElementById('dirsekAci').value;
            const dirsekBoyut = document.getElementById('dirsekBoyut').value;
            
            if (!dirsekAci || !dirsekBoyut) {
                return;
            }
            
            const MaterialClass = window.MaterialRegistry.get('dirsek');
            const instance = new MaterialClass();
            
            const kalinlikSelect = document.getElementById('dirsekKalinlik');
            kalinlikSelect.innerHTML = `<option value="">${instance.getText('select_thickness')}</option>`;
            
            // Et kalınlıklarını doldur
            const thicknesses = Object.keys(instance.dirsekVerileri[dirsekAci][dirsekBoyut] || {});
            
            thicknesses.forEach(thickness => {
                kalinlikSelect.innerHTML += `<option value="${thickness}">${thickness} mm</option>`;
            });
        };
        
        window.ApplicationController.updateDirsekWeight = function() {
            const standartSistem = document.getElementById('standartSistem').value;
            const dirsekAci = document.getElementById('dirsekAci').value;
            const dirsekBoyut = document.getElementById('dirsekBoyut').value;
            const dirsekKalinlik = document.getElementById('dirsekKalinlik').value;
            
            if (!standartSistem || !dirsekAci || !dirsekBoyut || !dirsekKalinlik) {
                document.getElementById('dirsekInfoRow').style.display = 'none';
                return;
            }
            
            const MaterialClass = window.MaterialRegistry.get('dirsek');
            const instance = new MaterialClass();
            
            // Ağırlık bilgisini al
            const weight = instance.dirsekVerileri[dirsekAci][dirsekBoyut][dirsekKalinlik] || 0;
            
            if (weight) {
                document.getElementById('dirsekInfoRow').style.display = 'block';
                document.getElementById('dirsekWeightInfo').textContent = 
                    `${instance.getText('weight_info')}: ${weight} kg`;
                document.getElementById('dirsekStandardInfo').textContent = 
                    `${instance.getText('standard_info')}: ${standartSistem === 'en' ? 'EN 10253-1' : 'ASME B16.9'}`;
                document.getElementById('dirsekRadiusInfo').textContent = 
                    `${instance.getText('radius_info')}: LR (1.5D)`;
            } else {
                document.getElementById('dirsekInfoRow').style.display = 'none';
            }
        };
    }

    // Malzemeyi kaydet
    const dirsekMaterial = new DirsekMaterial();
    dirsekMaterial.register();

})(window);