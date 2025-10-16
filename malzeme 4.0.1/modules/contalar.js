/**
 * CONTALAR (Gaskets) Malzeme Modülü
 * Versiyon: 1.0.0
 * ASME B16.20 ve EN 1514 standartları ile conta hesaplama modülü
 */

(function(window) {
    'use strict';
    
    class GasketMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'gasket';
            this.version = '1.0.0';
            
            this.texts = {
                tr: {
                    display_name: 'Contalar',
                    
                    // Etiketler
                    standart_label: 'Standart',
                    conta_tipi_label: 'Conta Tipi',
                    boyut_label: 'Boyut (NPS/DN)',
                    basinc_sinifi_label: 'Basınç Sınıfı',
                    kalinlik_label: 'Kalınlık',
                    malzeme_tipi_label: 'Malzeme Tipi',
                    
                    // Standartlar
                    asme_b1620: 'ASME B16.20 (Metallic Gaskets)',
                    en_1514: 'EN 1514 (Flanges - Gaskets)',
                    
                    // Conta Tipleri
                    spiral_wound: 'Spiral Wound (Sarmal Sızdırmazlık)',
                    ring_joint: 'Ring Joint (Halka Tip)',
                    kammprofile: 'Kammprofile (Dişli Conta)',
                    flat_metal: 'Flat Metal (Düz Metal)',
                    corrugated_metal: 'Corrugated Metal (Oluklu Metal)',
                    sheet_gasket: 'Sheet Gasket (Levha Conta)',
                    
                    // Tabloda gösterilecek
                    spiral_wound_display: 'Sarmal Sızdırmazlık',
                    ring_joint_display: 'Halka Tip Conta',
                    kammprofile_display: 'Dişli Conta',
                    flat_metal_display: 'Düz Metal Conta',
                    corrugated_metal_display: 'Oluklu Metal Conta',
                    sheet_gasket_display: 'Levha Conta',
                    
                    // ASME Basınç Sınıfları
                    class_150: 'Class 150',
                    class_300: 'Class 300',
                    class_600: 'Class 600',
                    class_900: 'Class 900',
                    class_1500: 'Class 1500',
                    class_2500: 'Class 2500',
                    
                    // EN/PN Basınç Sınıfları
                    pn_6: 'PN 6',
                    pn_10: 'PN 10',
                    pn_16: 'PN 16',
                    pn_25: 'PN 25',
                    pn_40: 'PN 40',
                    pn_63: 'PN 63',
                    pn_100: 'PN 100',
                    pn_160: 'PN 160',
                    pn_250: 'PN 250',
                    pn_320: 'PN 320',
                    
                    // Kalınlıklar
                    thickness_1_5: '1.5mm',
                    thickness_2_0: '2.0mm',
                    thickness_3_0: '3.0mm',
                    thickness_4_5: '4.5mm',
                    thickness_6_0: '6.0mm',
                    
                    // ASME B16.20 Malzeme Tipleri
                    group_carbon_asme: 'Karbon Çelik - ASME',
                    group_stainless_asme: 'Paslanmaz Çelik - ASME',
                    group_special_asme: 'Özel Malzemeler - ASME',
                    group_nonmetal_asme: 'Metal Dışı - ASME',
                    
                    // EN 1514 Malzeme Tipleri
                    group_metal_en: 'Metal Contalar - EN',
                    group_nonmetal_en: 'Metal Dışı Contalar - EN',
                    group_composite_en: 'Kompozit Contalar - EN',
                    
                    // Validasyon
                    validation_error: 'Lütfen tüm alanları doldurun'
                },
                en: {
                    display_name: 'Gaskets',
                    
                    // Labels
                    standart_label: 'Standard',
                    conta_tipi_label: 'Gasket Type',
                    boyut_label: 'Size (NPS/DN)',
                    basinc_sinifi_label: 'Pressure Class',
                    kalinlik_label: 'Thickness',
                    malzeme_tipi_label: 'Material Type',
                    
                    // Standards
                    asme_b1620: 'ASME B16.20 (Metallic Gaskets)',
                    en_1514: 'EN 1514 (Flanges - Gaskets)',
                    
                    // Gasket Types
                    spiral_wound: 'Spiral Wound Gasket',
                    ring_joint: 'Ring Joint Gasket',
                    kammprofile: 'Kammprofile Gasket',
                    flat_metal: 'Flat Metal Gasket',
                    corrugated_metal: 'Corrugated Metal Gasket',
                    sheet_gasket: 'Sheet Gasket',
                    
                    // Display names
                    spiral_wound_display: 'Spiral Wound Gasket',
                    ring_joint_display: 'Ring Joint Gasket',
                    kammprofile_display: 'Kammprofile Gasket',
                    flat_metal_display: 'Flat Metal Gasket',
                    corrugated_metal_display: 'Corrugated Metal Gasket',
                    sheet_gasket_display: 'Sheet Gasket',
                    
                    // ASME Pressure Classes
                    class_150: 'Class 150',
                    class_300: 'Class 300',
                    class_600: 'Class 600',
                    class_900: 'Class 900',
                    class_1500: 'Class 1500',
                    class_2500: 'Class 2500',
                    
                    // EN/PN Pressure Classes
                    pn_6: 'PN 6',
                    pn_10: 'PN 10',
                    pn_16: 'PN 16',
                    pn_25: 'PN 25',
                    pn_40: 'PN 40',
                    pn_63: 'PN 63',
                    pn_100: 'PN 100',
                    pn_160: 'PN 160',
                    pn_250: 'PN 250',
                    pn_320: 'PN 320',
                    
                    // Thicknesses
                    thickness_1_5: '1.5mm',
                    thickness_2_0: '2.0mm',
                    thickness_3_0: '3.0mm',
                    thickness_4_5: '4.5mm',
                    thickness_6_0: '6.0mm',
                    
                    // ASME B16.20 Material Types
                    group_carbon_asme: 'Carbon Steel - ASME',
                    group_stainless_asme: 'Stainless Steel - ASME',
                    group_special_asme: 'Special Materials - ASME',
                    group_nonmetal_asme: 'Non-Metallic - ASME',
                    
                    // EN 1514 Material Types
                    group_metal_en: 'Metal Gaskets - EN',
                    group_nonmetal_en: 'Non-Metallic Gaskets - EN',
                    group_composite_en: 'Composite Gaskets - EN',
                    
                    // Validation
                    validation_error: 'Please fill all fields'
                }
            };
            
            // NPS/DN boyutları ve flanş çapları (mm)
            this.sizeData = {
                '1/2': { nps: '1/2', dn: 15, od_150: 89, od_pn16: 95 },
                '3/4': { nps: '3/4', dn: 20, od_150: 98, od_pn16: 105 },
                '1': { nps: '1', dn: 25, od_150: 108, od_pn16: 115 },
                '1-1/4': { nps: '1-1/4', dn: 32, od_150: 117, od_pn16: 140 },
                '1-1/2': { nps: '1-1/2', dn: 40, od_150: 127, od_pn16: 150 },
                '2': { nps: '2', dn: 50, od_150: 152, od_pn16: 165 },
                '2-1/2': { nps: '2-1/2', dn: 65, od_150: 178, od_pn16: 185 },
                '3': { nps: '3', dn: 80, od_150: 190, od_pn16: 200 },
                '4': { nps: '4', dn: 100, od_150: 229, od_pn16: 220 },
                '5': { nps: '5', dn: 125, od_150: 254, od_pn16: 250 },
                '6': { nps: '6', dn: 150, od_150: 279, od_pn16: 285 },
                '8': { nps: '8', dn: 200, od_150: 343, od_pn16: 340 },
                '10': { nps: '10', dn: 250, od_150: 406, od_pn16: 395 },
                '12': { nps: '12', dn: 300, od_150: 483, od_pn16: 445 },
                '14': { nps: '14', dn: 350, od_150: 533, od_pn16: 505 },
                '16': { nps: '16', dn: 400, od_150: 597, od_pn16: 565 },
                '18': { nps: '18', dn: 450, od_150: 635, od_pn16: 615 },
                '20': { nps: '20', dn: 500, od_150: 698, od_pn16: 670 },
                '24': { nps: '24', dn: 600, od_150: 813, od_pn16: 780 }
            };
            
            // ASME B16.20 Malzemeleri
            this.asmeB1620Materials = {
                // Karbon Çelik
                'Carbon Steel': { density: 7850, standard: 'ASME B16.20', group: 'carbon_asme' },
                'Low Carbon Steel': { density: 7850, standard: 'ASME B16.20', group: 'carbon_asme' },
                
                // Paslanmaz Çelik
                'SS304': { density: 7900, standard: 'ASME B16.20 / Type 304', group: 'stainless_asme' },
                'SS304L': { density: 7900, standard: 'ASME B16.20 / Type 304L', group: 'stainless_asme' },
                'SS316': { density: 7980, standard: 'ASME B16.20 / Type 316', group: 'stainless_asme' },
                'SS316L': { density: 7980, standard: 'ASME B16.20 / Type 316L', group: 'stainless_asme' },
                'SS321': { density: 7900, standard: 'ASME B16.20 / Type 321', group: 'stainless_asme' },
                
                // Özel Malzemeler
                'Monel 400': { density: 8800, standard: 'ASME B16.20 / UNS N04400', group: 'special_asme' },
                'Inconel 600': { density: 8470, standard: 'ASME B16.20 / UNS N06600', group: 'special_asme' },
                'Hastelloy C276': { density: 8890, standard: 'ASME B16.20 / UNS N10276', group: 'special_asme' },
                'Titanium': { density: 4507, standard: 'ASME B16.20 / Grade 2', group: 'special_asme' },
                
                // Metal Dışı
                'Graphite': { density: 1800, standard: 'ASME B16.20 / Flexible Graphite', group: 'nonmetal_asme' },
                'PTFE': { density: 2150, standard: 'ASME B16.20 / PTFE', group: 'nonmetal_asme' },
                'Compressed Fiber': { density: 1500, standard: 'ASME B16.20 / CAF', group: 'nonmetal_asme' }
            };
            
            // EN 1514 Malzemeleri
            this.en1514Materials = {
                // Metal Contalar
                'Steel': { density: 7850, standard: 'EN 1514-1 / Steel', group: 'metal_en' },
                'X5CrNi18-10': { density: 7900, standard: 'EN 1514-1 / 1.4301', group: 'metal_en' },
                'X5CrNiMo17-12-2': { density: 7980, standard: 'EN 1514-1 / 1.4401', group: 'metal_en' },
                'Aluminium': { density: 2700, standard: 'EN 1514-1 / Al', group: 'metal_en' },
                'Copper': { density: 8960, standard: 'EN 1514-1 / Cu', group: 'metal_en' },
                
                // Metal Dışı
                'Elastomer NBR': { density: 1200, standard: 'EN 1514-7 / NBR', group: 'nonmetal_en' },
                'Elastomer EPDM': { density: 1150, standard: 'EN 1514-7 / EPDM', group: 'nonmetal_en' },
                'PTFE': { density: 2150, standard: 'EN 1514-2 / PTFE', group: 'nonmetal_en' },
                'Graphite': { density: 1800, standard: 'EN 1514-2 / Graphite', group: 'nonmetal_en' },
                
                // Kompozit
                'Graphite + SS304': { density: 3850, standard: 'EN 1514-6 / Composite', group: 'composite_en' },
                'Graphite + SS316': { density: 4890, standard: 'EN 1514-6 / Composite', group: 'composite_en' },
                'CAF + Steel': { density: 4675, standard: 'EN 1514-4 / CAF', group: 'composite_en' }
            };
            
            this.setupEventHandlers();
        }

        setupEventHandlers() {
            const self = this;
            
            window.GasketHandlers = {
                onStandartChange: function() {
                    self.updateMaterialGrades();
                    self.updatePressureClasses();
                    self.updateSizeOptions();
                }
            };
        }

        updatePressureClasses() {
            const standart = document.getElementById('gasket_standart')?.value;
            const pressureSelect = document.getElementById('gasket_basinc_sinifi');
            if (!pressureSelect) return;
            
            const lang = this.getCurrentLanguage();
            pressureSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Basınç sınıfı seçin...' : 'Select pressure class...'}</option>`;
            
            if (standart === 'asme_b1620') {
                const classes = ['150', '300', '600', '900', '1500', '2500'];
                classes.forEach(cls => {
                    const option = document.createElement('option');
                    option.value = `class_${cls}`;
                    option.textContent = this.getText(`class_${cls}`);
                    pressureSelect.appendChild(option);
                });
            } else if (standart === 'en_1514') {
                const pns = ['6', '10', '16', '25', '40', '63', '100', '160', '250', '320'];
                pns.forEach(pn => {
                    const option = document.createElement('option');
                    option.value = `pn_${pn}`;
                    option.textContent = this.getText(`pn_${pn}`);
                    pressureSelect.appendChild(option);
                });
            }
        }

        updateSizeOptions() {
            const standart = document.getElementById('gasket_standart')?.value;
            const sizeSelect = document.getElementById('gasket_boyut');
            if (!sizeSelect) return;
            
            const lang = this.getCurrentLanguage();
            sizeSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Boyut seçin...' : 'Select size...'}</option>`;
            
            Object.keys(this.sizeData).forEach(key => {
                const data = this.sizeData[key];
                const option = document.createElement('option');
                option.value = key;
                
                if (standart === 'asme_b1620') {
                    option.textContent = `NPS ${data.nps}" (DN${data.dn})`;
                } else if (standart === 'en_1514') {
                    option.textContent = `DN${data.dn} (NPS ${data.nps}")`;
                } else {
                    option.textContent = `NPS ${data.nps}" / DN${data.dn}`;
                }
                
                sizeSelect.appendChild(option);
            });
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="gasket_standart">${this.getText('standart_label')}</label>
                        <select id="gasket_standart" onchange="window.GasketHandlers.onStandartChange()">
                            <option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
                            <option value="asme_b1620">${this.getText('asme_b1620')}</option>
                            <option value="en_1514">${this.getText('en_1514')}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="gasket_conta_tipi">${this.getText('conta_tipi_label')}</label>
                        <select id="gasket_conta_tipi">
                            <option value="">${lang === 'tr' ? 'Tip seçin...' : 'Select type...'}</option>
                            <option value="spiral_wound">${this.getText('spiral_wound')}</option>
                            <option value="ring_joint">${this.getText('ring_joint')}</option>
                            <option value="kammprofile">${this.getText('kammprofile')}</option>
                            <option value="flat_metal">${this.getText('flat_metal')}</option>
                            <option value="corrugated_metal">${this.getText('corrugated_metal')}</option>
                            <option value="sheet_gasket">${this.getText('sheet_gasket')}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="gasket_boyut">${this.getText('boyut_label')}</label>
                        <select id="gasket_boyut">
                            <option value="">${lang === 'tr' ? 'Önce standart seçin' : 'Select standard first'}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="gasket_basinc_sinifi">${this.getText('basinc_sinifi_label')}</label>
                        <select id="gasket_basinc_sinifi">
                            <option value="">${lang === 'tr' ? 'Önce standart seçin' : 'Select standard first'}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="gasket_kalinlik">${this.getText('kalinlik_label')}</label>
                        <select id="gasket_kalinlik">
                            <option value="">${lang === 'tr' ? 'Kalınlık seçin...' : 'Select thickness...'}</option>
                            <option value="1.5">${this.getText('thickness_1_5')}</option>
                            <option value="2.0">${this.getText('thickness_2_0')}</option>
                            <option value="3.0">${this.getText('thickness_3_0')}</option>
                            <option value="4.5">${this.getText('thickness_4_5')}</option>
                            <option value="6.0">${this.getText('thickness_6_0')}</option>
                        </select>
                    </div>
                </div>
            `;
        }

        getGrades() {
            const standart = document.getElementById('gasket_standart')?.value;
            
            if (standart === 'asme_b1620') {
                return this.getGroupedGrades(this.asmeB1620Materials);
            } else if (standart === 'en_1514') {
                return this.getGroupedGrades(this.en1514Materials);
            }
            
            return [];
        }

        getGroupedGrades(materials) {
            const organizedGrades = [];
            
            const groupKeys = Object.keys(materials).reduce((acc, mat) => {
                const group = materials[mat].group;
                if (!acc.includes(group)) acc.push(group);
                return acc;
            }, []);
            
            groupKeys.forEach(groupKey => {
                const groupName = this.getText(`group_${groupKey}`);
                const groupMaterials = Object.keys(materials).filter(mat => materials[mat].group === groupKey);
                
                if (groupMaterials.length > 0) {
                    organizedGrades.push({
                        value: '',
                        text: `--- ${groupName} ---`,
                        disabled: true
                    });
                    
                    groupMaterials.forEach(material => {
                        organizedGrades.push({
                            value: material,
                            text: material,
                            disabled: false
                        });
                    });
                }
            });
            
            return organizedGrades;
        }

        updateMaterialGrades() {
            const malzemeCinsiSelect = document.getElementById('malzemeCinsi');
            if (!malzemeCinsiSelect) return;
            
            malzemeCinsiSelect.innerHTML = '';
            
            const grades = this.getGrades();
            
            if (Array.isArray(grades) && grades.length > 0) {
                grades.forEach(gradeInfo => {
                    const option = document.createElement('option');
                    option.value = gradeInfo.value;
                    option.textContent = gradeInfo.text;
                    option.disabled = gradeInfo.disabled;
                    
                    if (gradeInfo.disabled) {
                        option.style.fontWeight = 'bold';
                        option.style.color = '#667eea';
                    }
                    
                    malzemeCinsiSelect.appendChild(option);
                });
            }
        }

        getDensity(grade, standart) {
            if (standart === 'asme_b1620' && this.asmeB1620Materials[grade]) {
                return this.asmeB1620Materials[grade].density;
            } else if (standart === 'en_1514' && this.en1514Materials[grade]) {
                return this.en1514Materials[grade].density;
            }
            return 7850;
        }

        getStandard(grade, standart) {
            if (standart === 'asme_b1620') {
                return 'ASME B16.20';
            } else if (standart === 'en_1514') {
                return 'EN 1514';
            }
            return '-';
        }

        calculate(formData) {
            const standart = formData.gasket_standart;
            const contaTipi = formData.gasket_conta_tipi;
            const boyut = formData.gasket_boyut;
            const basincSinifi = formData.gasket_basinc_sinifi;
            const kalinlik = parseFloat(formData.gasket_kalinlik) || 0;
            const malzemeCinsi = formData.malzemeCinsi;
            const adet = parseFloat(formData.adet) || 1;
            
            if (!standart || !contaTipi || !boyut || !basincSinifi || !kalinlik || !malzemeCinsi) {
                return null;
            }
            
            const density = this.getDensity(malzemeCinsi, standart);
            const sizeData = this.sizeData[boyut];
            
            // Flanş dış çapını belirle
            let od = 0;
            if (standart === 'asme_b1620') {
                od = sizeData.od_150;
            } else if (standart === 'en_1514') {
                od = sizeData.od_pn16;
            }
            
            // İç çap (boru dış çapı + tolerans)
            const pipeOD = {
                '1/2': 21.3, '3/4': 26.7, '1': 33.4, '1-1/4': 42.2, '1-1/2': 48.3,
                '2': 60.3, '2-1/2': 73.0, '3': 88.9, '4': 114.3, '5': 141.3,
                '6': 168.3, '8': 219.1, '10': 273.0, '12': 323.9, '14': 355.6,
                '16': 406.4, '18': 457.0, '20': 508.0, '24': 610.0
            };
            
            const id = pipeOD[boyut] + 5;
            
            // Conta alanı (mm²)
            const area = Math.PI * ((od/2) ** 2 - (id/2) ** 2);
            
            // Hacim (mm³)
            let volume = area * kalinlik;
            
            // Conta tipine göre düzeltme
            if (contaTipi === 'spiral_wound') {
                volume *= 0.85; // Spiral yapıda boşluklar
            } else if (contaTipi === 'ring_joint') {
                volume *= 0.95; // Kompakt yapı
            } else if (contaTipi === 'kammprofile') {
                volume *= 0.90; // Dişli yapı
            } else if (contaTipi === 'corrugated_metal') {
                volume *= 0.88; // Oluklu yapı
            }
            
            // mm³ -> m³
            const volumeM3 = volume / 1000000000;
            
            // Ağırlık hesaplama
            const birimAgirlik = volumeM3 * density;
            const toplamAgirlik = birimAgirlik * adet;
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                suHacmi: null
            };
        }

        validate(formData) {
            const standart = formData.gasket_standart;
            const contaTipi = formData.gasket_conta_tipi;
            const boyut = formData.gasket_boyut;
            const basincSinifi = formData.gasket_basinc_sinifi;
            const kalinlik = formData.gasket_kalinlik;
            
            if (!standart || !contaTipi || !boyut || !basincSinifi || !kalinlik) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            return { isValid: true };
        }

        formatDimensions(formData) {
            const standart = formData.gasket_standart;
            const boyut = formData.gasket_boyut;
            const basincSinifi = formData.gasket_basinc_sinifi;
            const kalinlik = formData.gasket_kalinlik;
            
            if (!boyut || !basincSinifi || !kalinlik) {
                return '-';
            }
            
            const sizeData = this.sizeData[boyut];
            let sizeStr = '';
            
            if (standart === 'asme_b1620') {
                sizeStr = `NPS ${sizeData.nps}"`;
            } else if (standart === 'en_1514') {
                sizeStr = `DN${sizeData.dn}`;
            }
            
            const pressureText = this.getText(basincSinifi);
            
            return `${sizeStr}, ${pressureText}, t=${kalinlik}mm`;
        }

        hasWaterVolume() {
            return false;
        }

        getDisplayName() {
            return this.getText('display_name');
        }

        getDisplayTypeFromRow(rowData) {
            const metadata = rowData.metadata?.gasket;
            if (!metadata || !metadata.conta_tipi) {
                return this.getDisplayName();
            }
            
            return this.getText(`${metadata.conta_tipi}_display`);
        }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            const standart = formData.gasket_standart;
            const contaTipi = formData.gasket_conta_tipi;
            
            if (contaTipi) {
                baseRow.malzemeTuru = this.getText(`${contaTipi}_display`);
            } else {
                baseRow.malzemeTuru = this.getDisplayName();
            }
            
            baseRow.enNormu = this.getStandard(formData.malzemeCinsi, standart);
            
            baseRow.metadata = {
                ...baseRow.metadata,
                gasket: {
                    standart: formData.gasket_standart,
                    conta_tipi: formData.gasket_conta_tipi,
                    boyut: formData.gasket_boyut,
                    basinc_sinifi: formData.gasket_basinc_sinifi,
                    kalinlik: formData.gasket_kalinlik
                }
            };
            
            return baseRow;
        }

        fillFormFromRow(rowData) {
            super.fillFormFromRow(rowData);
            
            const metadata = rowData.metadata?.gasket;
            if (!metadata) {
                if (rowData.formData) {
                    this.fillFromFormData(rowData.formData);
                }
                return true;
            }
            
            setTimeout(() => {
                if (metadata.standart) {
                    document.getElementById('gasket_standart').value = metadata.standart;
                    window.GasketHandlers.onStandartChange();
                }
                
                setTimeout(() => {
                    if (metadata.conta_tipi) {
                        document.getElementById('gasket_conta_tipi').value = metadata.conta_tipi;
                    }
                    if (metadata.boyut) {
                        document.getElementById('gasket_boyut').value = metadata.boyut;
                    }
                    if (metadata.basinc_sinifi) {
                        document.getElementById('gasket_basinc_sinifi').value = metadata.basinc_sinifi;
                    }
                    if (metadata.kalinlik) {
                        document.getElementById('gasket_kalinlik').value = metadata.kalinlik;
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
                        
                        if (key === 'gasket_standart') {
                            window.GasketHandlers.onStandartChange();
                        }
                    }
                });
            }, 100);
        }
    }

    const gasketMaterial = new GasketMaterial();
    gasketMaterial.register();
    
    console.log('Contalar modülü v1.0.0 yüklendi');

})(window);