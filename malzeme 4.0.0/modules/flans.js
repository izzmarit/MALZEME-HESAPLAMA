/**
 * FLANŞ Malzeme Modülü
 * Versiyon: 1.0.0
 * EN 1092-1 ve ASME B16.5 standartları ile flanş hesaplama modülü
 */

(function(window) {
    'use strict';
    
    class FlansMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'flans';
            this.version = '1.0.0';
            
            this.texts = {
                tr: {
                    display_name: 'Flanş',
                    standart_label: 'Standart',
                    flans_tipi_label: 'Flanş Tipi',
                    cap_label: 'Nominal Çap',
                    basinc_label: 'Basınç Sınıfı',
                    adet_label: 'Adet',
                    validation_error: 'Lütfen tüm alanları doldurun',
                    
                    // Standartlar
                    en1092: 'EN 1092-1',
                    asme: 'ASME B16.5',
                    
                    // Flanş tipleri
                    duz_flans: 'Düz Flanş',
                    kaynak_boyunlu: 'Kaynak Boyunlu Flanş',
                    kor_flans: 'Kör Flanş',
                    
                    // Malzeme grupları
                    group_pressure: 'Basınçlı Kap Çelikleri',
                    group_stainless: 'Paslanmaz Çelikler',
                    group_carbon: 'Karbon Çelikleri (ASTM)',
                    group_alloy: 'Alaşımlı Çelikler (ASTM)'
                },
                en: {
                    display_name: 'Flange',
                    standart_label: 'Standard',
                    flans_tipi_label: 'Flange Type',
                    cap_label: 'Nominal Size',
                    basinc_label: 'Pressure Rating',
                    adet_label: 'Quantity',
                    validation_error: 'Please fill all fields',
                    
                    // Standards
                    en1092: 'EN 1092-1',
                    asme: 'ASME B16.5',
                    
                    // Flange types
                    duz_flans: 'Slip On Flange',
                    kaynak_boyunlu: 'Welding Neck Flange',
                    kor_flans: 'Blind Flange',
                    
                    // Material groups
                    group_pressure: 'Pressure Vessel Steels',
                    group_stainless: 'Stainless Steels',
                    group_carbon: 'Carbon Steels (ASTM)',
                    group_alloy: 'Alloy Steels (ASTM)'
                }
            };
            
            // EN 1092-1 Nominal Çaplar
            this.enNominalSizes = [
                'DN10', 'DN15', 'DN20', 'DN25', 'DN32', 'DN40', 'DN50', 
                'DN65', 'DN80', 'DN100', 'DN125', 'DN150', 'DN200', 
                'DN250', 'DN300', 'DN350', 'DN400', 'DN450', 'DN500', 'DN600'
            ];
            
            // EN 1092-1 Basınç Sınıfları
            this.enPressureRatings = [
                'PN6', 'PN10', 'PN16', 'PN25', 'PN40', 'PN63', 'PN100', 'PN160', 'PN250', 'PN400'
            ];
            
            // ASME B16.5 Nominal Pipe Size
            this.asmeNominalSizes = [
                '1/2"', '3/4"', '1"', '1-1/4"', '1-1/2"', '2"', '2-1/2"', '3"', 
                '3-1/2"', '4"', '5"', '6"', '8"', '10"', '12"', '14"', '16"', 
                '18"', '20"', '24"'
            ];
            
            // ASME B16.5 Basınç Sınıfları
            this.asmePressureRatings = [
                'Class 150', 'Class 300', 'Class 400', 'Class 600', 
                'Class 900', 'Class 1500', 'Class 2500'
            ];
            
            // EN 1092-1 Flanş Ağırlıkları (kg) - Düz Flanş
            this.enWeightsPlate = {
                'DN10': { 'PN6': 0.13, 'PN10': 0.15, 'PN16': 0.18, 'PN25': 0.22, 'PN40': 0.28 },
                'DN15': { 'PN6': 0.15, 'PN10': 0.18, 'PN16': 0.22, 'PN25': 0.28, 'PN40': 0.35 },
                'DN20': { 'PN6': 0.20, 'PN10': 0.23, 'PN16': 0.30, 'PN25': 0.38, 'PN40': 0.50 },
                'DN25': { 'PN6': 0.28, 'PN10': 0.32, 'PN16': 0.42, 'PN25': 0.55, 'PN40': 0.70 },
                'DN32': { 'PN6': 0.40, 'PN10': 0.48, 'PN16': 0.60, 'PN25': 0.80, 'PN40': 1.05 },
                'DN40': { 'PN6': 0.55, 'PN10': 0.65, 'PN16': 0.85, 'PN25': 1.10, 'PN40': 1.45 },
                'DN50': { 'PN6': 0.75, 'PN10': 0.90, 'PN16': 1.15, 'PN25': 1.50, 'PN40': 2.00 },
                'DN65': { 'PN6': 1.10, 'PN10': 1.30, 'PN16': 1.70, 'PN25': 2.20, 'PN40': 2.90 },
                'DN80': { 'PN6': 1.50, 'PN10': 1.80, 'PN16': 2.30, 'PN25': 3.00, 'PN40': 4.00 },
                'DN100': { 'PN6': 2.20, 'PN10': 2.70, 'PN16': 3.50, 'PN25': 4.50, 'PN40': 6.00, 'PN63': 8.50 },
                'DN125': { 'PN6': 3.50, 'PN10': 4.20, 'PN16': 5.50, 'PN25': 7.00, 'PN40': 9.50, 'PN63': 13.50 },
                'DN150': { 'PN6': 4.80, 'PN10': 5.80, 'PN16': 7.50, 'PN25': 9.50, 'PN40': 13.00, 'PN63': 18.50 },
                'DN200': { 'PN6': 8.00, 'PN10': 9.50, 'PN16': 12.50, 'PN25': 16.00, 'PN40': 22.00, 'PN63': 31.00 },
                'DN250': { 'PN6': 13.00, 'PN10': 15.50, 'PN16': 20.00, 'PN25': 26.00, 'PN40': 36.00, 'PN63': 51.00 },
                'DN300': { 'PN6': 18.00, 'PN10': 22.00, 'PN16': 28.00, 'PN25': 37.00, 'PN40': 52.00, 'PN63': 74.00 },
                'DN350': { 'PN6': 25.00, 'PN10': 30.00, 'PN16': 39.00, 'PN25': 51.00, 'PN40': 72.00, 'PN63': 102.00 },
                'DN400': { 'PN6': 33.00, 'PN10': 39.00, 'PN16': 51.00, 'PN25': 67.00, 'PN40': 95.00, 'PN63': 135.00 },
                'DN450': { 'PN6': 42.00, 'PN10': 50.00, 'PN16': 65.00, 'PN25': 85.00, 'PN40': 120.00, 'PN63': 170.00 },
                'DN500': { 'PN6': 52.00, 'PN10': 62.00, 'PN16': 81.00, 'PN25': 106.00, 'PN40': 150.00, 'PN63': 213.00 },
                'DN600': { 'PN6': 78.00, 'PN10': 93.00, 'PN16': 122.00, 'PN25': 160.00, 'PN40': 226.00, 'PN63': 320.00 }
            };
            
            // ASME B16.5 Flanş Ağırlıkları (kg) - Düz Flanş
            this.asmeWeightsPlate = {
                '1/2"': { 'Class 150': 0.54, 'Class 300': 0.82, 'Class 400': 0.95, 'Class 600': 1.13, 'Class 900': 1.54, 'Class 1500': 2.27, 'Class 2500': 3.40 },
                '3/4"': { 'Class 150': 0.68, 'Class 300': 1.04, 'Class 400': 1.22, 'Class 600': 1.49, 'Class 900': 2.00, 'Class 1500': 3.04, 'Class 2500': 4.54 },
                '1"': { 'Class 150': 0.86, 'Class 300': 1.36, 'Class 400': 1.59, 'Class 600': 2.04, 'Class 900': 2.77, 'Class 1500': 4.31, 'Class 2500': 6.80 },
                '1-1/4"': { 'Class 150': 1.09, 'Class 300': 1.81, 'Class 400': 2.13, 'Class 600': 2.77, 'Class 900': 3.81, 'Class 1500': 6.12, 'Class 2500': 9.98 },
                '1-1/2"': { 'Class 150': 1.36, 'Class 300': 2.22, 'Class 400': 2.63, 'Class 600': 3.40, 'Class 900': 4.76, 'Class 1500': 7.71, 'Class 2500': 12.70 },
                '2"': { 'Class 150': 1.95, 'Class 300': 3.22, 'Class 400': 3.81, 'Class 600': 4.94, 'Class 900': 7.03, 'Class 1500': 11.79, 'Class 2500': 19.96 },
                '2-1/2"': { 'Class 150': 2.99, 'Class 300': 5.03, 'Class 400': 5.94, 'Class 600': 7.71, 'Class 900': 11.11, 'Class 1500': 18.14, 'Class 2500': 30.84 },
                '3"': { 'Class 150': 3.72, 'Class 300': 6.62, 'Class 400': 7.85, 'Class 600': 10.21, 'Class 900': 14.74, 'Class 1500': 24.04, 'Class 2500': 41.28 },
                '3-1/2"': { 'Class 150': 4.67, 'Class 300': 8.16, 'Class 400': 9.66, 'Class 600': 12.57 },
                '4"': { 'Class 150': 5.44, 'Class 300': 10.21, 'Class 400': 12.11, 'Class 600': 15.88, 'Class 900': 23.13, 'Class 1500': 38.10, 'Class 2500': 66.68 },
                '5"': { 'Class 150': 7.26, 'Class 300': 14.97, 'Class 400': 17.78, 'Class 600': 23.59, 'Class 900': 34.47, 'Class 1500': 58.97, 'Class 2500': 104.33 },
                '6"': { 'Class 150': 9.98, 'Class 300': 19.50, 'Class 400': 23.13, 'Class 600': 30.39, 'Class 900': 45.36, 'Class 1500': 78.02, 'Class 2500': 139.71 },
                '8"': { 'Class 150': 16.78, 'Class 300': 32.66, 'Class 400': 38.10, 'Class 600': 51.26, 'Class 900': 76.66, 'Class 1500': 136.08, 'Class 2500': 249.48 },
                '10"': { 'Class 150': 26.76, 'Class 300': 52.62, 'Class 400': 61.69, 'Class 600': 84.37, 'Class 900': 127.01, 'Class 1500': 226.80, 'Class 2500': 421.84 },
                '12"': { 'Class 150': 38.10, 'Class 300': 77.11, 'Class 400': 90.72, 'Class 600': 122.47, 'Class 900': 185.97, 'Class 1500': 340.19, 'Class 2500': 634.93 },
                '14"': { 'Class 150': 46.72, 'Class 300': 98.88, 'Class 600': 158.76, 'Class 900': 244.94, 'Class 1500': 430.91 },
                '16"': { 'Class 150': 61.69, 'Class 300': 127.01, 'Class 600': 206.39, 'Class 900': 317.51, 'Class 1500': 566.99 },
                '18"': { 'Class 150': 77.11, 'Class 300': 158.76, 'Class 600': 258.55, 'Class 900': 399.16, 'Class 1500': 714.89 },
                '20"': { 'Class 150': 95.25, 'Class 300': 195.05, 'Class 600': 317.51, 'Class 900': 489.88, 'Class 1500': 879.79 },
                '24"': { 'Class 150': 136.08, 'Class 300': 281.23, 'Class 600': 458.13, 'Class 900': 707.61, 'Class 1500': 1270.06 }
            };
            
            // Flanş tiplerine göre ağırlık çarpanları
            this.flangeTypeMultipliers = {
                'duz_flans': 1.0,           // Düz Flanş (Slip On Flange) - temel ağırlık
                'kaynak_boyunlu': 1.35,     // Kaynak Boyunlu Flanş (Welding Neck) - %35 daha ağır
                'kor_flans': 1.65           // Kör Flanş (Blind Flange) - %65 daha ağır
            };
            
            // Malzeme tanımlamaları
            this.materials = {
                en1092: {
                    'P250GH': { density: 7850, standard: 'EN 1092-1 / EN 10028-2', group: 'pressure' },
                    'P265GH': { density: 7850, standard: 'EN 1092-1 / EN 10028-2', group: 'pressure' },
                    'P295GH': { density: 7850, standard: 'EN 1092-1 / EN 10028-2', group: 'pressure' },
                    '16Mo3': { density: 7850, standard: 'EN 1092-1 / EN 10028-2', group: 'pressure' },
                    '1.4301': { density: 7900, standard: 'EN 1092-1 / EN 10088-2', group: 'stainless', aisi: '304' },
                    '1.4401': { density: 7980, standard: 'EN 1092-1 / EN 10088-2', group: 'stainless', aisi: '316' },
                    '1.4404': { density: 7980, standard: 'EN 1092-1 / EN 10088-2', group: 'stainless', aisi: '316L' },
                    '1.4571': { density: 7980, standard: 'EN 1092-1 / EN 10088-2', group: 'stainless', aisi: '316Ti' }
                },
                asme: {
                    'A105': { density: 7850, standard: 'ASME B16.5 / ASTM A105', group: 'carbon' },
                    'A350 LF2': { density: 7850, standard: 'ASME B16.5 / ASTM A350', group: 'carbon' },
                    'A182 F304': { density: 7900, standard: 'ASME B16.5 / ASTM A182', group: 'stainless' },
                    'A182 F316': { density: 7980, standard: 'ASME B16.5 / ASTM A182', group: 'stainless' },
                    'A182 F316L': { density: 7980, standard: 'ASME B16.5 / ASTM A182', group: 'stainless' },
                    'A182 F321': { density: 7900, standard: 'ASME B16.5 / ASTM A182', group: 'stainless' }
                }
            };
            
            this.setupEventHandlers();
        }

        setupEventHandlers() {
            const self = this;
            
            window.FlansHandlers = {
                onStandartChange: function() {
                    const standart = document.getElementById('fl_standart').value;
                    
                    // Alanları gizle
                    document.getElementById('fl_flansTipiContainer').style.display = 'none';
                    document.getElementById('fl_enFields').style.display = 'none';
                    document.getElementById('fl_asmeFields').style.display = 'none';
                    
                    if (!standart) return;
                    
                    // Flanş tipi seçimini göster
                    document.getElementById('fl_flansTipiContainer').style.display = 'block';
                    
                    // Standarda göre alanları göster
                    if (standart === 'en1092') {
                        self.populateENFields();
                        document.getElementById('fl_enFields').style.display = 'block';
                    } else if (standart === 'asme') {
                        self.populateASMEFields();
                        document.getElementById('fl_asmeFields').style.display = 'block';
                    }
                    
                    // Malzeme cinsini güncelle
                    self.updateMaterialGrades(standart);
                },
                
                onFlansTipiChange: function() {
                    // Flanş tipi değiştiğinde özel bir işlem gerekirse buraya eklenebilir
                },
                
                onASMECapChange: function() {
                    const cap = document.getElementById('fl_asme_cap').value;
                    const classSelect = document.getElementById('fl_asme_class');
                    const lang = self.getCurrentLanguage();
                    
                    console.log('ASME Cap değişti:', cap);
                    
                    if (!cap || cap === '') {
                        classSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Önce çap seçin' : 'Select size first'}</option>`;
                        return;
                    }
                    
                    // Seçilen çap için mevcut class değerlerini bul
                    const availableClasses = self.asmeWeightsPlate[cap];
                    
                    console.log('Mevcut class değerleri:', availableClasses);
                    
                    if (!availableClasses) {
                        classSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Bu çap için veri yok' : 'No data for this size'}</option>`;
                        return;
                    }
                    
                    // Class seçeneklerini doldur
                    classSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Class seçin' : 'Select class'}</option>`;
                    Object.keys(availableClasses).forEach(classRating => {
                        const option = document.createElement('option');
                        option.value = classRating;
                        option.textContent = classRating;
                        classSelect.appendChild(option);
                    });
                    
                    console.log('Class seçenekleri güncellendi');
                }
            };
        }

        populateENFields() {
            const capSelect = document.getElementById('fl_en_cap');
            const basincSelect = document.getElementById('fl_en_basinc');
            const lang = this.getCurrentLanguage();
            
            capSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Çap seçin' : 'Select size'}</option>`;
            this.enNominalSizes.forEach(size => {
                capSelect.innerHTML += `<option value="${size}">${size}</option>`;
            });
            
            basincSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Basınç seçin' : 'Select pressure'}</option>`;
            this.enPressureRatings.forEach(rating => {
                basincSelect.innerHTML += `<option value="${rating}">${rating}</option>`;
            });
        }

        populateASMEFields() {
            const capSelect = document.getElementById('fl_asme_cap');
            const classSelect = document.getElementById('fl_asme_class');
            const lang = this.getCurrentLanguage();
            
            console.log('ASME alanları doldruluyor...');
            
            // Çap seçeneklerini doldur
            capSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Çap seçin' : 'Select size'}</option>`;
            this.asmeNominalSizes.forEach(size => {
                const option = document.createElement('option');
                option.value = size;
                option.textContent = size;
                capSelect.appendChild(option);
            });
            
            // Class seçeneğini başlangıçta boş bırak
            classSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Önce çap seçin' : 'Select size first'}</option>`;
            
            console.log('ASME alanları dolduruldu');
        }

        updateMaterialGrades(standart) {
            const malzemeCinsiSelect = document.getElementById('malzemeCinsi');
            if (!malzemeCinsiSelect || !standart) return;
            
            const currentValue = malzemeCinsiSelect.value;
            malzemeCinsiSelect.innerHTML = '';
            
            const materials = this.materials[standart] || {};
            const lang = this.getCurrentLanguage();
            
            const groups = {
                'pressure': this.getText('group_pressure'),
                'stainless': this.getText('group_stainless'),
                'carbon': this.getText('group_carbon'),
                'alloy': this.getText('group_alloy')
            };
            
            Object.entries(groups).forEach(([groupKey, groupName]) => {
                const groupMaterials = Object.keys(materials).filter(mat => materials[mat].group === groupKey);
                
                if (groupMaterials.length > 0) {
                    const optGroup = document.createElement('optgroup');
                    optGroup.label = groupName;
                    
                    groupMaterials.forEach(material => {
                        const option = document.createElement('option');
                        option.value = material;
                        let displayText = material;
                        if (materials[material].aisi) {
                            displayText += ` (AISI ${materials[material].aisi})`;
                        }
                        option.textContent = displayText;
                        optGroup.appendChild(option);
                    });
                    
                    malzemeCinsiSelect.appendChild(optGroup);
                }
            });
            
            if (currentValue && materials[currentValue]) {
                malzemeCinsiSelect.value = currentValue;
            }
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="fl_standart">${this.getText('standart_label')}</label>
                        <select id="fl_standart" onchange="window.FlansHandlers.onStandartChange()">
                            <option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
                            <option value="en1092">${this.getText('en1092')}</option>
                            <option value="asme">${this.getText('asme')}</option>
                        </select>
                    </div>
                    <div class="form-group" id="fl_flansTipiContainer" style="display:none;">
                        <label for="fl_flans_tipi">${this.getText('flans_tipi_label')}</label>
                        <select id="fl_flans_tipi" onchange="window.FlansHandlers.onFlansTipiChange()">
                            <option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
                            <option value="duz_flans">${this.getText('duz_flans')}</option>
                            <option value="kaynak_boyunlu">${this.getText('kaynak_boyunlu')}</option>
                            <option value="kor_flans">${this.getText('kor_flans')}</option>
                        </select>
                    </div>
                </div>
                
                <!-- EN 1092-1 Alanları -->
                <div id="fl_enFields" style="display:none;">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="fl_en_cap">${this.getText('cap_label')}</label>
                            <select id="fl_en_cap">
                                <option value="">${lang === 'tr' ? 'Çap seçin' : 'Select size'}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="fl_en_basinc">${this.getText('basinc_label')}</label>
                            <select id="fl_en_basinc">
                                <option value="">${lang === 'tr' ? 'Basınç seçin' : 'Select pressure'}</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <!-- ASME B16.5 Alanları -->
                <div id="fl_asmeFields" style="display:none;">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="fl_asme_cap">${this.getText('cap_label')}</label>
                            <select id="fl_asme_cap" onchange="window.FlansHandlers.onASMECapChange()">
                                <option value="">${lang === 'tr' ? 'Çap seçin' : 'Select size'}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="fl_asme_class">${this.getText('basinc_label')}</label>
                            <select id="fl_asme_class">
                                <option value="">${lang === 'tr' ? 'Önce çap seçin' : 'Select size first'}</option>
                            </select>
                        </div>
                    </div>
                </div>
            `;
        }

        getGrades() {
            return [];
        }

        getDensity(grade) {
            const standart = document.getElementById('fl_standart')?.value;
            if (!standart) return 7850;
            
            const materials = this.materials[standart] || {};
            return materials[grade]?.density || 7850;
        }

        getStandard(grade) {
            const standart = document.getElementById('fl_standart')?.value;
            if (!standart) return '-';
            
            if (standart === 'en1092') {
                return 'EN 1092-1';
            } else if (standart === 'asme') {
                return 'ASME B16.5';
            }
            return '-';
        }

        calculate(formData) {
            const standart = formData.fl_standart;
            const flansTipi = formData.fl_flans_tipi;
            const malzemeCinsi = formData.malzemeCinsi;
            const adet = parseFloat(formData.adet) || 1;
            
            console.log('Calculate çağrıldı:', { standart, flansTipi, malzemeCinsi, adet });
            
            if (!standart || !flansTipi) {
                console.error('Standart veya flanş tipi eksik');
                return null;
            }
            
            let baseWeight = 0;
            
            if (standart === 'en1092') {
                const cap = formData.fl_en_cap;
                const basinc = formData.fl_en_basinc;
                
                if (!cap || !basinc) {
                    console.error('EN çap veya basınç eksik');
                    return null;
                }
                
                baseWeight = this.enWeightsPlate[cap]?.[basinc];
                
                if (!baseWeight || baseWeight === 0) {
                    console.error(`EN 1092-1: ${cap} ${basinc} kombinasyonu için ağırlık bulunamadı`);
                    return null;
                }
            } else if (standart === 'asme') {
                const cap = formData.fl_asme_cap;
                const classRating = formData.fl_asme_class;
                
                console.log('ASME Hesaplama parametreleri:', { cap, classRating });
                
                if (!cap || !classRating) {
                    console.error('ASME çap veya class eksik');
                    return null;
                }
                
                console.log('Ağırlık tablosunda aranan çap:', cap);
                console.log('Bu çap için mevcut data:', this.asmeWeightsPlate[cap]);
                
                baseWeight = this.asmeWeightsPlate[cap]?.[classRating];
                
                console.log('Bulunan temel ağırlık:', baseWeight);
                
                if (!baseWeight || baseWeight === 0) {
                    console.error(`ASME B16.5: ${cap} ${classRating} kombinasyonu için ağırlık bulunamadı`);
                    return null;
                }
            }
            
            const multiplier = this.flangeTypeMultipliers[flansTipi] || 1.0;
            const birimAgirlik = baseWeight * multiplier;
            const toplamAgirlik = birimAgirlik * adet;
            
            console.log('Hesaplama sonucu:', { baseWeight, multiplier, birimAgirlik, toplamAgirlik });
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                suHacmi: null
            };
        }

        validate(formData) {
            const standart = formData.fl_standart;
            const flansTipi = formData.fl_flans_tipi;
            
            if (!standart || standart === '') {
                return { isValid: false, message: this.getText('validation_error') };
            }
            
            if (!flansTipi || flansTipi === '') {
                return { isValid: false, message: this.getText('validation_error') };
            }
            
            if (standart === 'en1092') {
                const cap = formData.fl_en_cap;
                const basinc = formData.fl_en_basinc;
                
                if (!cap || cap === '' || !basinc || basinc === '') {
                    return { isValid: false, message: this.getText('validation_error') };
                }
                
                const weight = this.enWeightsPlate[cap]?.[basinc];
                if (!weight || weight === 0) {
                    const lang = this.getCurrentLanguage();
                    const message = lang === 'tr' 
                        ? `${cap} ve ${basinc} kombinasyonu için ağırlık verisi bulunamadı. Lütfen farklı bir kombinasyon seçin.`
                        : `Weight data not found for ${cap} and ${basinc} combination. Please select a different combination.`;
                    return { isValid: false, message: message };
                }
            } else if (standart === 'asme') {
                const cap = formData.fl_asme_cap;
                const classRating = formData.fl_asme_class;
                
                if (!cap || cap === '' || !classRating || classRating === '') {
                    return { isValid: false, message: this.getText('validation_error') };
                }
                
                const weight = this.asmeWeightsPlate[cap]?.[classRating];
                if (!weight || weight === 0) {
                    const lang = this.getCurrentLanguage();
                    const message = lang === 'tr' 
                        ? `${cap} ve ${classRating} kombinasyonu için ağırlık verisi bulunamadı. Lütfen farklı bir kombinasyon seçin.`
                        : `Weight data not found for ${cap} and ${classRating} combination. Please select a different combination.`;
                    return { isValid: false, message: message };
                }
            }
            
            return { isValid: true };
        }
        
        formatDimensions(formData) {
            const standart = formData.fl_standart;
            
            if (standart === 'en1092') {
                const cap = formData.fl_en_cap || '';
                const basinc = formData.fl_en_basinc || '';
                return `${cap} ${basinc}`;
            } else if (standart === 'asme') {
                const cap = formData.fl_asme_cap || '';
                const classRating = formData.fl_asme_class || '';
                return `NPS ${cap} ${classRating}`;
            }
            
            return '-';
        }

        getDisplayName() {
            return this.getText('display_name');
        }

        getFlansTipName(flansTipi) {
            return this.getText(flansTipi);
        }

        getDisplayTypeFromRow(rowData) {
            const metadata = rowData.metadata?.flans;
            if (metadata && metadata.flans_tipi) {
                return this.getFlansTipName(metadata.flans_tipi);
            }
            return this.getDisplayName();
        }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            
            const flansTipi = formData.fl_flans_tipi;
            
            // Malzeme türünü flanş tipine göre ayarla
            if (flansTipi) {
                baseRow.malzemeTuru = this.getFlansTipName(flansTipi);
            }
            
            // Standart bilgisini ayarla
            const standart = formData.fl_standart;
            baseRow.enNormu = this.getStandard(formData.malzemeCinsi);
            
            // ASTM öneki ekle
            if (standart === 'asme') {
                if (formData.malzemeCinsi && !formData.malzemeCinsi.startsWith('ASTM')) {
                    baseRow.malzemeCinsi = 'ASTM ' + formData.malzemeCinsi;
                }
            }
            
            // Metadata'yı genişlet
            baseRow.metadata = {
                ...baseRow.metadata,
                flans: {
                    standart: formData.fl_standart,
                    flans_tipi: formData.fl_flans_tipi,
                    en_cap: formData.fl_en_cap,
                    en_basinc: formData.fl_en_basinc,
                    asme_cap: formData.fl_asme_cap,
                    asme_class: formData.fl_asme_class
                }
            };
            
            return baseRow;
        }

        fillFormFromRow(rowData) {
            super.fillFormFromRow(rowData);
            
            const metadata = rowData.metadata?.flans;
            if (!metadata) {
                if (rowData.formData) {
                    this.fillFromFormData(rowData.formData);
                }
                return true;
            }
            
            setTimeout(() => {
                const standartElement = document.getElementById('fl_standart');
                if (standartElement && metadata.standart) {
                    standartElement.value = metadata.standart;
                    window.FlansHandlers.onStandartChange();
                }
                
                setTimeout(() => {
                    const flansTipiElement = document.getElementById('fl_flans_tipi');
                    if (flansTipiElement && metadata.flans_tipi) {
                        flansTipiElement.value = metadata.flans_tipi;
                    }
                    
                    if (metadata.standart === 'en1092') {
                        const capEl = document.getElementById('fl_en_cap');
                        const basincEl = document.getElementById('fl_en_basinc');
                        
                        if (capEl && metadata.en_cap) capEl.value = metadata.en_cap;
                        if (basincEl && metadata.en_basinc) basincEl.value = metadata.en_basinc;
                    } else if (metadata.standart === 'asme') {
                        const capEl = document.getElementById('fl_asme_cap');
                        const classEl = document.getElementById('fl_asme_class');
                        
                        if (capEl && metadata.asme_cap) capEl.value = metadata.asme_cap;
                        if (classEl && metadata.asme_class) classEl.value = metadata.asme_class;
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
                        
                        if (key === 'fl_standart') {
                            window.FlansHandlers.onStandartChange();
                        }
                    }
                });
            }, 100);
        }
    }

    const flansMaterial = new FlansMaterial();
    flansMaterial.register();
    
    console.log('Flanş modülü v1.0.0 yüklendi (EN 1092-1, ASME B16.5)');

})(window);