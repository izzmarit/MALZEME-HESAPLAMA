/**
 * FİLTRELER SÜZGEÇLER Malzeme Modülü
 * Versiyon: 1.0.0
 * ASME B16.34 ve DIN 3202 standartları ile filtre süzgeç hesaplama modülü
 */

(function(window) {
    'use strict';
    
    class FilterStrainerMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'filter_strainer';
            this.version = '1.0.0';
            
            this.texts = {
                tr: {
                    display_name: 'Filtreler Süzgeçler',
                    
                    // Etiketler
                    standart_label: 'Standart',
                    filtre_tipi_label: 'Filtre Tipi',
                    baglanti_tipi_label: 'Bağlantı Tipi',
                    boyut_label: 'Boyut',
                    basinc_sinifi_label: 'Basınç Sınıfı',
                    mesh_label: 'Mesh/Screen Boyutu',
                    
                    // Standartlar
                    asme_b1634: 'ASME B16.34 (Valves - Flanged, Threaded, Welding End)',
                    din_3202: 'DIN 3202 (Flanged Strainers)',
                    
                    // Filtre Tipleri
                    y_strainer: 'Y-Type Strainer (Y Tipi Süzgeç)',
                    basket_strainer: 'Basket Strainer (Sepet Tipi Süzgeç)',
                    duplex_strainer: 'Duplex Strainer (İkiz Süzgeç)',
                    t_strainer: 'T-Type Strainer (T Tipi Süzgeç)',
                    cone_strainer: 'Conical Strainer (Konik Süzgeç)',
                    
                    // Tabloda gösterilecek
                    y_strainer_display: 'Y Tipi Süzgeç',
                    basket_strainer_display: 'Sepet Tipi Süzgeç',
                    duplex_strainer_display: 'İkiz Süzgeç',
                    t_strainer_display: 'T Tipi Süzgeç',
                    cone_strainer_display: 'Konik Süzgeç',
                    
                    // Bağlantı Tipleri
                    flanged: 'Flanşlı (Flanged)',
                    threaded: 'Dişli (Threaded)',
                    welded: 'Kaynaklı (Welding End)',
                    
                    // ASME Basınç Sınıfları
                    class_150: 'Class 150',
                    class_300: 'Class 300',
                    class_600: 'Class 600',
                    class_900: 'Class 900',
                    class_1500: 'Class 1500',
                    class_2500: 'Class 2500',
                    
                    // DIN/PN Basınç Sınıfları
                    pn_10: 'PN 10',
                    pn_16: 'PN 16',
                    pn_25: 'PN 25',
                    pn_40: 'PN 40',
                    pn_63: 'PN 63',
                    pn_100: 'PN 100',
                    pn_160: 'PN 160',
                    
                    // Mesh Boyutları
                    mesh_20: '20 Mesh (850 µm)',
                    mesh_40: '40 Mesh (425 µm)',
                    mesh_60: '60 Mesh (250 µm)',
                    mesh_80: '80 Mesh (180 µm)',
                    mesh_100: '100 Mesh (150 µm)',
                    mesh_150: '150 Mesh (106 µm)',
                    mesh_200: '200 Mesh (75 µm)',
                    
                    // Malzeme Grupları
                    group_carbon: 'Karbon Çelikler',
                    group_stainless: 'Paslanmaz Çelikler',
                    group_alloy: 'Alaşımlı Çelikler',
                    group_special: 'Özel Alaşımlar',
                    
                    // Validasyon
                    validation_error: 'Lütfen tüm alanları doldurun'
                },
                en: {
                    display_name: 'Filters Strainers',
                    
                    // Labels
                    standart_label: 'Standard',
                    filtre_tipi_label: 'Filter Type',
                    baglanti_tipi_label: 'Connection Type',
                    boyut_label: 'Size',
                    basinc_sinifi_label: 'Pressure Class',
                    mesh_label: 'Mesh/Screen Size',
                    
                    // Standards
                    asme_b1634: 'ASME B16.34 (Valves - Flanged, Threaded, Welding End)',
                    din_3202: 'DIN 3202 (Flanged Strainers)',
                    
                    // Filter Types
                    y_strainer: 'Y-Type Strainer',
                    basket_strainer: 'Basket Strainer',
                    duplex_strainer: 'Duplex Strainer',
                    t_strainer: 'T-Type Strainer',
                    cone_strainer: 'Conical Strainer',
                    
                    // Display names
                    y_strainer_display: 'Y-Type Strainer',
                    basket_strainer_display: 'Basket Strainer',
                    duplex_strainer_display: 'Duplex Strainer',
                    t_strainer_display: 'T-Type Strainer',
                    cone_strainer_display: 'Conical Strainer',
                    
                    // Connection Types
                    flanged: 'Flanged',
                    threaded: 'Threaded',
                    welded: 'Welding End',
                    
                    // ASME Pressure Classes
                    class_150: 'Class 150',
                    class_300: 'Class 300',
                    class_600: 'Class 600',
                    class_900: 'Class 900',
                    class_1500: 'Class 1500',
                    class_2500: 'Class 2500',
                    
                    // DIN/PN Pressure Classes
                    pn_10: 'PN 10',
                    pn_16: 'PN 16',
                    pn_25: 'PN 25',
                    pn_40: 'PN 40',
                    pn_63: 'PN 63',
                    pn_100: 'PN 100',
                    pn_160: 'PN 160',
                    
                    // Mesh Sizes
                    mesh_20: '20 Mesh (850 µm)',
                    mesh_40: '40 Mesh (425 µm)',
                    mesh_60: '60 Mesh (250 µm)',
                    mesh_80: '80 Mesh (180 µm)',
                    mesh_100: '100 Mesh (150 µm)',
                    mesh_150: '150 Mesh (106 µm)',
                    mesh_200: '200 Mesh (75 µm)',
                    
                    // Material Groups
                    group_carbon: 'Carbon Steels',
                    group_stainless: 'Stainless Steels',
                    group_alloy: 'Alloy Steels',
                    group_special: 'Special Alloys',
                    
                    // Validation
                    validation_error: 'Please fill all fields'
                }
            };
            
            // NPS/DN boyutları (mm)
            this.sizeData = {
                // ASME NPS
                '1/2': { od: 21.3, dn: 15 },
                '3/4': { od: 26.7, dn: 20 },
                '1': { od: 33.4, dn: 25 },
                '1-1/4': { od: 42.2, dn: 32 },
                '1-1/2': { od: 48.3, dn: 40 },
                '2': { od: 60.3, dn: 50 },
                '2-1/2': { od: 73.0, dn: 65 },
                '3': { od: 88.9, dn: 80 },
                '4': { od: 114.3, dn: 100 },
                '5': { od: 141.3, dn: 125 },
                '6': { od: 168.3, dn: 150 },
                '8': { od: 219.1, dn: 200 },
                '10': { od: 273.0, dn: 250 },
                '12': { od: 323.9, dn: 300 },
                '14': { od: 355.6, dn: 350 },
                '16': { od: 406.4, dn: 400 },
                '18': { od: 457.0, dn: 450 },
                '20': { od: 508.0, dn: 500 },
                '24': { od: 610.0, dn: 600 }
            };
            
            // Filtre tipi ağırlık çarpanları
            this.filterTypeFactors = {
                'y_strainer': 1.0,
                'basket_strainer': 1.8,
                'duplex_strainer': 3.2,
                't_strainer': 1.5,
                'cone_strainer': 1.3
            };
            
            // Basınç sınıfı ağırlık çarpanları
            this.pressureClassFactors = {
                'class_150': 1.0,
                'class_300': 1.3,
                'class_600': 1.6,
                'class_900': 1.9,
                'class_1500': 2.3,
                'class_2500': 2.8,
                'pn_10': 1.0,
                'pn_16': 1.1,
                'pn_25': 1.3,
                'pn_40': 1.5,
                'pn_63': 1.8,
                'pn_100': 2.1,
                'pn_160': 2.5
            };
            
            // ASME B16.34 Malzemeleri
            this.asmeB1634Materials = {
                'A216 WCB': { density: 7850, standard: 'ASME B16.34 / ASTM A216', group: 'carbon' },
                'A352 LCB': { density: 7850, standard: 'ASME B16.34 / ASTM A352', group: 'carbon' },
                'A217 WC6': { density: 7850, standard: 'ASME B16.34 / ASTM A217', group: 'alloy' },
                'A217 WC9': { density: 7850, standard: 'ASME B16.34 / ASTM A217', group: 'alloy' },
                'A351 CF8': { density: 7900, standard: 'ASME B16.34 / ASTM A351', group: 'stainless' },
                'A351 CF8M': { density: 7980, standard: 'ASME B16.34 / ASTM A351', group: 'stainless' },
                'A351 CF3': { density: 7900, standard: 'ASME B16.34 / ASTM A351', group: 'stainless' },
                'A351 CF3M': { density: 7980, standard: 'ASME B16.34 / ASTM A351', group: 'stainless' },
                'A995 4A': { density: 7800, standard: 'ASME B16.34 / ASTM A995', group: 'special' },
                'A995 5A': { density: 7800, standard: 'ASME B16.34 / ASTM A995', group: 'special' },
                'Monel 400': { density: 8800, standard: 'ASME B16.34 / UNS N04400', group: 'special' },
                'Inconel 625': { density: 8440, standard: 'ASME B16.34 / UNS N06625', group: 'special' }
            };
            
            // DIN 3202 Malzemeleri
            this.din3202Materials = {
                'GS-C25': { density: 7850, standard: 'DIN 3202 / DIN 1681', group: 'carbon' },
                'GP240GH': { density: 7850, standard: 'DIN 3202 / EN 10213', group: 'carbon' },
                'GX5CrNi19-10': { density: 7900, standard: 'DIN 3202 / DIN 17445', group: 'stainless' },
                'GX5CrNiMo19-11-2': { density: 7980, standard: 'DIN 3202 / DIN 17445', group: 'stainless' },
                'GX2CrNi19-11': { density: 7900, standard: 'DIN 3202 / DIN 17445', group: 'stainless' },
                'GX2CrNiMo19-11-2': { density: 7980, standard: 'DIN 3202 / DIN 17445', group: 'stainless' },
                'GX2CrNiMoN22-5-3': { density: 7800, standard: 'DIN 3202 / DIN 17445', group: 'special' }
            };
            
            this.setupEventHandlers();
        }

        setupEventHandlers() {
            const self = this;
            
            window.FilterStrainerHandlers = {
                onStandartChange: function() {
                    self.updateMaterialGrades();
                    self.updatePressureClasses();
                    self.updateSizeOptions();
                }
            };
        }

        updatePressureClasses() {
            const standart = document.getElementById('fs_standart')?.value;
            const pressureSelect = document.getElementById('fs_basinc_sinifi');
            if (!pressureSelect) return;
            
            const lang = this.getCurrentLanguage();
            pressureSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Basınç sınıfı seçin...' : 'Select pressure class...'}</option>`;
            
            let classes = [];
            
            if (standart === 'asme_b1634') {
                classes = ['150', '300', '600', '900', '1500', '2500'];
                classes.forEach(cls => {
                    const option = document.createElement('option');
                    option.value = `class_${cls}`;
                    option.textContent = this.getText(`class_${cls}`);
                    pressureSelect.appendChild(option);
                });
            } else if (standart === 'din_3202') {
                classes = ['10', '16', '25', '40', '63', '100', '160'];
                classes.forEach(pn => {
                    const option = document.createElement('option');
                    option.value = `pn_${pn}`;
                    option.textContent = this.getText(`pn_${pn}`);
                    pressureSelect.appendChild(option);
                });
            }
        }

        updateSizeOptions() {
            const standart = document.getElementById('fs_standart')?.value;
            const sizeSelect = document.getElementById('fs_boyut');
            if (!sizeSelect) return;
            
            const lang = this.getCurrentLanguage();
            sizeSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Boyut seçin...' : 'Select size...'}</option>`;
            
            Object.keys(this.sizeData).forEach(nps => {
                const data = this.sizeData[nps];
                const option = document.createElement('option');
                option.value = nps;
                
                if (standart === 'asme_b1634') {
                    option.textContent = `NPS ${nps}" (DN${data.dn})`;
                } else if (standart === 'din_3202') {
                    option.textContent = `DN${data.dn} (NPS ${nps}")`;
                } else {
                    option.textContent = `NPS ${nps}" / DN${data.dn}`;
                }
                
                sizeSelect.appendChild(option);
            });
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="fs_standart">${this.getText('standart_label')}</label>
                        <select id="fs_standart" onchange="window.FilterStrainerHandlers.onStandartChange()">
                            <option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
                            <option value="asme_b1634">${this.getText('asme_b1634')}</option>
                            <option value="din_3202">${this.getText('din_3202')}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="fs_filtre_tipi">${this.getText('filtre_tipi_label')}</label>
                        <select id="fs_filtre_tipi">
                            <option value="">${lang === 'tr' ? 'Tip seçin...' : 'Select type...'}</option>
                            <option value="y_strainer">${this.getText('y_strainer')}</option>
                            <option value="basket_strainer">${this.getText('basket_strainer')}</option>
                            <option value="duplex_strainer">${this.getText('duplex_strainer')}</option>
                            <option value="t_strainer">${this.getText('t_strainer')}</option>
                            <option value="cone_strainer">${this.getText('cone_strainer')}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="fs_baglanti_tipi">${this.getText('baglanti_tipi_label')}</label>
                        <select id="fs_baglanti_tipi">
                            <option value="">${lang === 'tr' ? 'Bağlantı seçin...' : 'Select connection...'}</option>
                            <option value="flanged">${this.getText('flanged')}</option>
                            <option value="threaded">${this.getText('threaded')}</option>
                            <option value="welded">${this.getText('welded')}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="fs_boyut">${this.getText('boyut_label')}</label>
                        <select id="fs_boyut">
                            <option value="">${lang === 'tr' ? 'Önce standart seçin' : 'Select standard first'}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="fs_basinc_sinifi">${this.getText('basinc_sinifi_label')}</label>
                        <select id="fs_basinc_sinifi">
                            <option value="">${lang === 'tr' ? 'Önce standart seçin' : 'Select standard first'}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="fs_mesh">${this.getText('mesh_label')}</label>
                        <select id="fs_mesh">
                            <option value="">${lang === 'tr' ? 'Mesh seçin...' : 'Select mesh...'}</option>
                            <option value="20">${this.getText('mesh_20')}</option>
                            <option value="40">${this.getText('mesh_40')}</option>
                            <option value="60">${this.getText('mesh_60')}</option>
                            <option value="80">${this.getText('mesh_80')}</option>
                            <option value="100">${this.getText('mesh_100')}</option>
                            <option value="150">${this.getText('mesh_150')}</option>
                            <option value="200">${this.getText('mesh_200')}</option>
                        </select>
                    </div>
                </div>
            `;
        }

        getGrades() {
            const standart = document.getElementById('fs_standart')?.value;
            
            if (standart === 'asme_b1634') {
                return this.getGroupedGrades(this.asmeB1634Materials);
            } else if (standart === 'din_3202') {
                return this.getGroupedGrades(this.din3202Materials);
            }
            
            return [];
        }

        getGroupedGrades(materials) {
            const organizedGrades = [];
            
            const groups = {
                'carbon': this.getText('group_carbon'),
                'stainless': this.getText('group_stainless'),
                'alloy': this.getText('group_alloy'),
                'special': this.getText('group_special')
            };
            
            Object.entries(groups).forEach(([groupKey, groupName]) => {
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
            if (standart === 'asme_b1634' && this.asmeB1634Materials[grade]) {
                return this.asmeB1634Materials[grade].density;
            } else if (standart === 'din_3202' && this.din3202Materials[grade]) {
                return this.din3202Materials[grade].density;
            }
            return 7850;
        }

        getStandard(grade, standart) {
            if (standart === 'asme_b1634') {
                return 'ASME B16.34';
            } else if (standart === 'din_3202') {
                return 'DIN 3202';
            }
            return '-';
        }

        calculate(formData) {
            const standart = formData.fs_standart;
            const filtreTipi = formData.fs_filtre_tipi;
            const baglantiTipi = formData.fs_baglanti_tipi;
            const boyut = formData.fs_boyut;
            const basincSinifi = formData.fs_basinc_sinifi;
            const mesh = formData.fs_mesh;
            const malzemeCinsi = formData.malzemeCinsi;
            const adet = parseFloat(formData.adet) || 1;
            
            if (!standart || !filtreTipi || !baglantiTipi || !boyut || !basincSinifi || !mesh || !malzemeCinsi) {
                return null;
            }
            
            const density = this.getDensity(malzemeCinsi, standart);
            const sizeData = this.sizeData[boyut];
            const od = sizeData.od;
            
            // Temel hacim hesaplaması (basitleştirilmiş empirical formula)
            // Gövde hacmi
            const bodyLength = od * 4;
            const bodyVolume = Math.PI * ((od/2) ** 2) * bodyLength;
            
            // Kapak ve flanş hacmi
            const flangeVolume = Math.PI * ((od * 1.5 / 2) ** 2) * (od * 0.3);
            
            // Toplam hacim
            let totalVolume = bodyVolume + flangeVolume * 2;
            
            // Filtre tipi çarpanı
            const filterFactor = this.filterTypeFactors[filtreTipi] || 1.0;
            totalVolume *= filterFactor;
            
            // Basınç sınıfı çarpanı
            const pressureFactor = this.pressureClassFactors[basincSinifi] || 1.0;
            totalVolume *= pressureFactor;
            
            // Bağlantı tipi çarpanı
            let connectionFactor = 1.0;
            if (baglantiTipi === 'flanged') connectionFactor = 1.0;
            else if (baglantiTipi === 'threaded') connectionFactor = 0.85;
            else if (baglantiTipi === 'welded') connectionFactor = 0.75;
            
            totalVolume *= connectionFactor;
            
            // mm³ -> m³
            const volumeM3 = totalVolume / 1000000000;
            
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
            const standart = formData.fs_standart;
            const filtreTipi = formData.fs_filtre_tipi;
            const baglantiTipi = formData.fs_baglanti_tipi;
            const boyut = formData.fs_boyut;
            const basincSinifi = formData.fs_basinc_sinifi;
            const mesh = formData.fs_mesh;
            
            if (!standart || !filtreTipi || !baglantiTipi || !boyut || !basincSinifi || !mesh) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            return { isValid: true };
        }

        formatDimensions(formData) {
            const standart = formData.fs_standart;
            const boyut = formData.fs_boyut;
            const basincSinifi = formData.fs_basinc_sinifi;
            const baglantiTipi = formData.fs_baglanti_tipi;
            const mesh = formData.fs_mesh;
            
            if (!boyut || !basincSinifi) {
                return '-';
            }
            
            const sizeData = this.sizeData[boyut];
            let sizeStr = '';
            
            if (standart === 'asme_b1634') {
                sizeStr = `NPS ${boyut}"`;
            } else if (standart === 'din_3202') {
                sizeStr = `DN${sizeData.dn}`;
            }
            
            // Basınç sınıfını sadece değer olarak göster
            const pressureText = this.getText(basincSinifi).split(' ')[1] || basincSinifi;
            
            // Bağlantı tipini kısaca göster
            let connectionText = '';
            if (baglantiTipi === 'flanged') connectionText = 'FL';
            else if (baglantiTipi === 'threaded') connectionText = 'TH';
            else if (baglantiTipi === 'welded') connectionText = 'WE';
            
            return `${sizeStr}, ${pressureText}, ${connectionText}, ${mesh} Mesh`;
        }

        hasWaterVolume() {
            return false;
        }

        getDisplayName() {
            return this.getText('display_name');
        }

        getDisplayTypeFromRow(rowData) {
            const metadata = rowData.metadata?.filter_strainer;
            if (!metadata || !metadata.filtre_tipi) {
                return this.getDisplayName();
            }
            
            return this.getText(`${metadata.filtre_tipi}_display`);
        }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            const standart = formData.fs_standart;
            const filtreTipi = formData.fs_filtre_tipi;
            
            if (filtreTipi) {
                baseRow.malzemeTuru = this.getText(`${filtreTipi}_display`);
            } else {
                baseRow.malzemeTuru = this.getDisplayName();
            }
            
            // ASTM öneki ekle
            if (standart === 'asme_b1634') {
                baseRow.malzemeCinsi = `ASTM ${formData.malzemeCinsi}`;
            }
            
            baseRow.enNormu = this.getStandard(formData.malzemeCinsi, standart);
            
            baseRow.metadata = {
                ...baseRow.metadata,
                filter_strainer: {
                    standart: formData.fs_standart,
                    filtre_tipi: formData.fs_filtre_tipi,
                    baglanti_tipi: formData.fs_baglanti_tipi,
                    boyut: formData.fs_boyut,
                    basinc_sinifi: formData.fs_basinc_sinifi,
                    mesh: formData.fs_mesh
                }
            };
            
            return baseRow;
        }

        fillFormFromRow(rowData) {
            super.fillFormFromRow(rowData);
            
            const metadata = rowData.metadata?.filter_strainer;
            if (!metadata) {
                if (rowData.formData) {
                    this.fillFromFormData(rowData.formData);
                }
                return true;
            }
            
            setTimeout(() => {
                if (metadata.standart) {
                    document.getElementById('fs_standart').value = metadata.standart;
                    window.FilterStrainerHandlers.onStandartChange();
                }
                
                setTimeout(() => {
                    if (metadata.filtre_tipi) {
                        document.getElementById('fs_filtre_tipi').value = metadata.filtre_tipi;
                    }
                    if (metadata.baglanti_tipi) {
                        document.getElementById('fs_baglanti_tipi').value = metadata.baglanti_tipi;
                    }
                    if (metadata.boyut) {
                        document.getElementById('fs_boyut').value = metadata.boyut;
                    }
                    if (metadata.basinc_sinifi) {
                        document.getElementById('fs_basinc_sinifi').value = metadata.basinc_sinifi;
                    }
                    if (metadata.mesh) {
                        document.getElementById('fs_mesh').value = metadata.mesh;
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
                        
                        if (key === 'fs_standart') {
                            window.FilterStrainerHandlers.onStandartChange();
                        }
                    }
                });
            }, 100);
        }
    }

    const filterStrainerMaterial = new FilterStrainerMaterial();
    filterStrainerMaterial.register();
    
    console.log('Filtreler Süzgeçler modülü v1.0.0 yüklendi');

})(window);