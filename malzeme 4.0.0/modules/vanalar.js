/**
 * VANALAR Modülü - Profesyonel Versiyon
 * Versiyon: 1.0.3 (İnç İşareti ve Dil Desteği Düzeltmesi)
 * EN/DIN, ASME/API standartları ile kapsamlı vana hesaplama modülü
 * Tüm vana tipleri: Gate, Globe, Ball, Butterfly, Check, Needle, Plug
 */

(function(window) {
    'use strict';
    
    class VanaMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'vana';
            this.version = '1.0.3';
            
            this.texts = {
                tr: {
                    display_name: 'Vana',
                    standart_sistemi_label: 'Standart Sistemi',
                    vana_tipi_label: 'Vana Tipi',
                    boyut_label: 'Boyut',
                    baglanti_tipi_label: 'Bağlantı Tipi',
                    basinc_sinifi_label: 'Basınç Sınıfı',
                    govde_tipi_label: 'Gövde Tipi',
                    kapasite_label: 'Cv Kapasitesi',
                    validation_error: 'Lütfen tüm alanları doldurun',
                    
                    // Standart Sistemleri
                    en_din: 'EN/DIN Standartları',
                    asme_api: 'ASME/API Standartları',
                    
                    // Vana Tipleri
                    gate: 'Gate Vana',
                    gate_short: 'Gate',
                    globe: 'Globe Vana',
                    globe_short: 'Globe',
                    ball: 'Ball Vana',
                    ball_short: 'Ball',
                    butterfly: 'Butterfly Vana',
                    butterfly_short: 'Butterfly',
                    check: 'Check Valf',
                    check_short: 'Check',
                    needle: 'Needle Vana',
                    needle_short: 'Needle',
                    plug: 'Plug Vana',
                    plug_short: 'Plug',
                    
                    // Bağlantı Tipleri
                    flanged: 'Flanşlı',
                    threaded: 'Dişli',
                    socket_weld: 'Soketli Kaynak',
                    butt_weld: 'Alın Kaynağı',
                    wafer: 'Wafer Tip',
                    lug: 'Kulak Tip',
                    
                    // Gövde Tipleri
                    rising_stem: 'Yükselen Mil',
                    non_rising_stem: 'Sabit Mil',
                    full_bore: 'Tam Delik',
                    reduced_bore: 'Daraltılmış',
                    swing: 'Salınımlı',
                    lift: 'Kaldırmalı',
                    dual_plate: 'Çift Plaka',
                    tilting_disc: 'Eğimli Disk',
                    
                    // Malzeme Grupları
                    group_carbon_cast: 'Dökme Karbon Çelikler',
                    group_carbon_forged: 'Dövme Karbon Çelikler',
                    group_stainless_cast: 'Dökme Paslanmaz Çelikler',
                    group_stainless_forged: 'Dövme Paslanmaz Çelikler',
                    group_alloy_cast: 'Dökme Alaşımlı Çelikler',
                    group_bronze: 'Bronz ve Pirinç',
                    group_special: 'Özel Alaşımlar'
                },
                en: {
                    display_name: 'Valve',
                    standart_sistemi_label: 'Standard System',
                    vana_tipi_label: 'Valve Type',
                    boyut_label: 'Size',
                    baglanti_tipi_label: 'End Connection',
                    basinc_sinifi_label: 'Pressure Rating',
                    govde_tipi_label: 'Body Type',
                    kapasite_label: 'Cv Capacity',
                    validation_error: 'Please fill all fields',
                    
                    // Standard Systems
                    en_din: 'EN/DIN Standards',
                    asme_api: 'ASME/API Standards',
                    
                    // Valve Types
                    gate: 'Gate Valve',
                    gate_short: 'Gate',
                    globe: 'Globe Valve',
                    globe_short: 'Globe',
                    ball: 'Ball Valve',
                    ball_short: 'Ball',
                    butterfly: 'Butterfly Valve',
                    butterfly_short: 'Butterfly',
                    check: 'Check Valve',
                    check_short: 'Check',
                    needle: 'Needle Valve',
                    needle_short: 'Needle',
                    plug: 'Plug Valve',
                    plug_short: 'Plug',
                    
                    // Connection Types
                    flanged: 'Flanged',
                    threaded: 'Threaded',
                    socket_weld: 'Socket Weld',
                    butt_weld: 'Butt Weld',
                    wafer: 'Wafer Type',
                    lug: 'Lug Type',
                    
                    // Body Types
                    rising_stem: 'Rising Stem',
                    non_rising_stem: 'Non-Rising Stem',
                    full_bore: 'Full Bore',
                    reduced_bore: 'Reduced Bore',
                    swing: 'Swing Type',
                    lift: 'Lift Type',
                    dual_plate: 'Dual Plate',
                    tilting_disc: 'Tilting Disc',
                    
                    // Material Groups
                    group_carbon_cast: 'Cast Carbon Steels',
                    group_carbon_forged: 'Forged Carbon Steels',
                    group_stainless_cast: 'Cast Stainless Steels',
                    group_stainless_forged: 'Forged Stainless Steels',
                    group_alloy_cast: 'Cast Alloy Steels',
                    group_bronze: 'Bronze and Brass',
                    group_special: 'Special Alloys'
                }
            };
            
            // Vana Standartları Mapping
            this.valveStandards = {
                'en_din': {
                    'gate': 'EN 1503-1',
                    'globe': 'EN 1984',
                    'ball': 'EN 16767',
                    'butterfly': 'EN 593',
                    'check': 'EN 12334',
                    'needle': 'DIN 2401',
                    'plug': 'EN 12288'
                },
                'asme_api': {
                    'gate': 'API 600',
                    'globe': 'API 602',
                    'ball': 'API 608',
                    'butterfly': 'API 609',
                    'check': 'API 594',
                    'needle': 'ASME B16.104',
                    'plug': 'API 599'
                }
            };
            
            // EN/DIN Boyutları (DN)
            this.enDinSizes = [
                'DN15', 'DN20', 'DN25', 'DN32', 'DN40', 'DN50', 'DN65', 'DN80', 
                'DN100', 'DN125', 'DN150', 'DN200', 'DN250', 'DN300', 'DN350', 
                'DN400', 'DN450', 'DN500', 'DN600', 'DN700', 'DN800', 'DN900', 
                'DN1000', 'DN1200'
            ];
            
            // DN -> OD mapping (mm)
            this.dnToOD = {
                'DN15': 21.3, 'DN20': 26.9, 'DN25': 33.7, 'DN32': 42.4,
                'DN40': 48.3, 'DN50': 60.3, 'DN65': 76.1, 'DN80': 88.9,
                'DN100': 114.3, 'DN125': 139.7, 'DN150': 168.3, 'DN200': 219.1,
                'DN250': 273.0, 'DN300': 323.9, 'DN350': 355.6, 'DN400': 406.4,
                'DN450': 457.0, 'DN500': 508.0, 'DN600': 610.0, 'DN700': 711.0,
                'DN800': 813.0, 'DN900': 914.0, 'DN1000': 1016.0, 'DN1200': 1219.0
            };
            
            // ASME/API Boyutları (NPS)
            this.asmeApiSizes = [
                '1/2', '3/4', '1', '1-1/4', '1-1/2', '2', '2-1/2', '3', '4', 
                '5', '6', '8', '10', '12', '14', '16', '18', '20', '24', 
                '26', '28', '30', '32', '36', '42', '48'
            ];
            
            // NPS -> OD mapping (mm)
            this.npsToOD = {
                '1/2': 21.3, '3/4': 26.7, '1': 33.4, '1-1/4': 42.2,
                '1-1/2': 48.3, '2': 60.3, '2-1/2': 73.0, '3': 88.9,
                '4': 114.3, '5': 141.3, '6': 168.3, '8': 219.1,
                '10': 273.0, '12': 323.9, '14': 355.6, '16': 406.4,
                '18': 457.0, '20': 508.0, '24': 610.0, '26': 660.0,
                '28': 711.0, '30': 762.0, '32': 813.0, '36': 914.0,
                '42': 1067.0, '48': 1219.0
            };
            
            // EN/DIN Basınç Sınıfları (PN)
            this.pnRatings = ['PN10', 'PN16', 'PN25', 'PN40', 'PN63', 'PN100', 'PN160', 'PN250', 'PN320', 'PN400'];
            
            // ASME Basınç Sınıfları (Class)
            this.classRatings = ['Class 150', 'Class 300', 'Class 600', 'Class 900', 'Class 1500', 'Class 2500'];
            
            // Vana Tiplerine Göre Bağlantı Seçenekleri
            this.connectionsByValveType = {
                'gate': ['flanged', 'butt_weld', 'socket_weld', 'threaded'],
                'globe': ['flanged', 'butt_weld', 'socket_weld', 'threaded'],
                'ball': ['flanged', 'butt_weld', 'socket_weld', 'threaded'],
                'butterfly': ['flanged', 'wafer', 'lug'],
                'check': ['flanged', 'butt_weld', 'wafer'],
                'needle': ['threaded', 'socket_weld'],
                'plug': ['flanged', 'butt_weld']
            };
            
            // Vana Tiplerine Göre Gövde Seçenekleri
            this.bodyTypesByValveType = {
                'gate': ['rising_stem', 'non_rising_stem'],
                'globe': ['rising_stem'],
                'ball': ['full_bore', 'reduced_bore'],
                'butterfly': ['tilting_disc'],
                'check': ['swing', 'lift', 'dual_plate'],
                'needle': ['rising_stem'],
                'plug': ['full_bore', 'reduced_bore']
            };
            
            // Vana Tipi Ağırlık Faktörleri
            this.valveTypeFactors = {
                'gate': 1.0,
                'globe': 1.15,
                'ball': 0.85,
                'butterfly': 0.45,
                'check': 0.95,
                'needle': 0.50,
                'plug': 0.90
            };
            
            // Bağlantı Tipi Ağırlık Faktörleri
            this.connectionFactors = {
                'flanged': 1.0,
                'butt_weld': 0.92,
                'socket_weld': 0.88,
                'threaded': 0.85,
                'wafer': 0.75,
                'lug': 0.82
            };
            
            // Basınç Sınıfı Faktörleri (PN)
            this.pnFactors = {
                'PN10': 0.85, 'PN16': 0.90, 'PN25': 1.0, 'PN40': 1.15,
                'PN63': 1.30, 'PN100': 1.50, 'PN160': 1.75, 'PN250': 2.10,
                'PN320': 2.40, 'PN400': 2.75
            };
            
            // Basınç Sınıfı Faktörleri (Class)
            this.classFactors = {
                'Class 150': 0.90, 'Class 300': 1.0, 'Class 600': 1.25,
                'Class 900': 1.50, 'Class 1500': 1.85, 'Class 2500': 2.30
            };
            
            // Dökme Karbon Çelik Malzemeler
            this.castCarbonMaterials = {
                'ASTM A216 WCB': { density: 7850, standard: 'ASTM A216', group: 'carbon_cast', tempRange: '-29°C to 425°C' },
                'ASTM A216 WCC': { density: 7850, standard: 'ASTM A216', group: 'carbon_cast', tempRange: '-29°C to 425°C' },
                'ASTM A352 LCB': { density: 7850, standard: 'ASTM A352', group: 'carbon_cast', tempRange: '-46°C to 345°C' },
                'ASTM A352 LCC': { density: 7850, standard: 'ASTM A352', group: 'carbon_cast', tempRange: '-46°C to 345°C' },
                'EN-GJS-400-15': { density: 7850, standard: 'EN 1563', group: 'carbon_cast', tempRange: '-20°C to 350°C' }
            };
            
            // Dövme Karbon Çelik Malzemeler
            this.forgedCarbonMaterials = {
                'ASTM A105': { density: 7850, standard: 'ASTM A105', group: 'carbon_forged', tempRange: '-29°C to 425°C' },
                'ASTM A350 LF2': { density: 7850, standard: 'ASTM A350', group: 'carbon_forged', tempRange: '-46°C to 345°C' },
                'ASTM A350 LF3': { density: 7850, standard: 'ASTM A350', group: 'carbon_forged', tempRange: '-101°C to 345°C' },
                '1.0460 (C22.8)': { density: 7850, standard: 'EN 10083', group: 'carbon_forged', tempRange: '-20°C to 400°C' }
            };
            
            // Dökme Paslanmaz Çelik Malzemeler
            this.castStainlessMaterials = {
                'ASTM A351 CF8': { density: 7900, standard: 'ASTM A351', group: 'stainless_cast', tempRange: '-196°C to 425°C', grade: '304' },
                'ASTM A351 CF8M': { density: 7980, standard: 'ASTM A351', group: 'stainless_cast', tempRange: '-196°C to 425°C', grade: '316' },
                'ASTM A351 CF3': { density: 7900, standard: 'ASTM A351', group: 'stainless_cast', tempRange: '-196°C to 425°C', grade: '304L' },
                'ASTM A351 CF3M': { density: 7980, standard: 'ASTM A351', group: 'stainless_cast', tempRange: '-196°C to 425°C', grade: '316L' },
                'ASTM A744 CN7M': { density: 8000, standard: 'ASTM A744', group: 'stainless_cast', tempRange: '-196°C to 425°C', grade: 'Alloy 20' }
            };
            
            // Dövme Paslanmaz Çelik Malzemeler
            this.forgedStainlessMaterials = {
                'ASTM A182 F304': { density: 7900, standard: 'ASTM A182', group: 'stainless_forged', tempRange: '-196°C to 425°C' },
                'ASTM A182 F304L': { density: 7900, standard: 'ASTM A182', group: 'stainless_forged', tempRange: '-196°C to 425°C' },
                'ASTM A182 F304H': { density: 7900, standard: 'ASTM A182', group: 'stainless_forged', tempRange: '-196°C to 425°C' },
                'ASTM A182 F316': { density: 7980, standard: 'ASTM A182', group: 'stainless_forged', tempRange: '-196°C to 425°C' },
                'ASTM A182 F316L': { density: 7980, standard: 'ASTM A182', group: 'stainless_forged', tempRange: '-196°C to 425°C' },
                'ASTM A182 F316H': { density: 7980, standard: 'ASTM A182', group: 'stainless_forged', tempRange: '-196°C to 425°C' },
                'ASTM A182 F321': { density: 7900, standard: 'ASTM A182', group: 'stainless_forged', tempRange: '-196°C to 870°C' },
                'ASTM A182 F347': { density: 7980, standard: 'ASTM A182', group: 'stainless_forged', tempRange: '-196°C to 870°C' },
                'ASTM A182 F310': { density: 8000, standard: 'ASTM A182', group: 'stainless_forged', tempRange: '-196°C to 1035°C' },
                '1.4301 (X5CrNi18-10)': { density: 7900, standard: 'EN 10088', group: 'stainless_forged', tempRange: '-196°C to 425°C' },
                '1.4401 (X5CrNiMo17-12-2)': { density: 7980, standard: 'EN 10088', group: 'stainless_forged', tempRange: '-196°C to 425°C' }
            };
            
            // Dökme Alaşımlı Çelik Malzemeler
            this.castAlloyMaterials = {
                'ASTM A217 WC6': { density: 7850, standard: 'ASTM A217', group: 'alloy_cast', tempRange: '-29°C to 593°C', composition: '1.25Cr-0.5Mo' },
                'ASTM A217 WC9': { density: 7850, standard: 'ASTM A217', group: 'alloy_cast', tempRange: '-29°C to 593°C', composition: '2.25Cr-1Mo' },
                'ASTM A217 C5': { density: 7850, standard: 'ASTM A217', group: 'alloy_cast', tempRange: '-29°C to 649°C', composition: '5Cr-0.5Mo' },
                'ASTM A217 C12': { density: 7850, standard: 'ASTM A217', group: 'alloy_cast', tempRange: '-29°C to 649°C', composition: '9Cr-1Mo' }
            };
            
            // Bronz ve Pirinç Malzemeler
            this.bronzeMaterials = {
                'ASTM B61': { density: 8500, standard: 'ASTM B61', group: 'bronze', tempRange: '-40°C to 200°C', type: 'Steam Bronze' },
                'ASTM B62': { density: 8800, standard: 'ASTM B62', group: 'bronze', tempRange: '-40°C to 200°C', type: 'Composition Bronze' },
                'ASTM B584 C83600': { density: 8500, standard: 'ASTM B584', group: 'bronze', tempRange: '-40°C to 200°C', type: 'Red Brass' },
                'ASTM B584 C95400': { density: 8800, standard: 'ASTM B584', group: 'bronze', tempRange: '-40°C to 200°C', type: 'Aluminum Bronze' },
                'ASTM B584 C95800': { density: 8800, standard: 'ASTM B584', group: 'bronze', tempRange: '-40°C to 200°C', type: 'Nickel-Aluminum Bronze' }
            };
            
            // Özel Alaşımlar
            this.specialMaterials = {
                'Monel 400': { density: 8800, standard: 'ASTM B564', group: 'special', tempRange: '-196°C to 425°C', type: 'Ni-Cu Alloy' },
                'Monel K-500': { density: 8470, standard: 'ASTM B564', group: 'special', tempRange: '-196°C to 425°C', type: 'Ni-Cu-Al Alloy' },
                'Inconel 600': { density: 8470, standard: 'ASTM B564', group: 'special', tempRange: '-196°C to 1095°C', type: 'Ni-Cr Alloy' },
                'Inconel 625': { density: 8440, standard: 'ASTM B564', group: 'special', tempRange: '-196°C to 1095°C', type: 'Ni-Cr-Mo Alloy' },
                'Hastelloy C-276': { density: 8890, standard: 'ASTM B564', group: 'special', tempRange: '-196°C to 650°C', type: 'Ni-Mo-Cr Alloy' },
                'Duplex 2205': { density: 7800, standard: 'ASTM A182 F51', group: 'special', tempRange: '-50°C to 250°C', type: 'Duplex Stainless' },
                'Super Duplex 2507': { density: 7800, standard: 'ASTM A182 F53', group: 'special', tempRange: '-50°C to 250°C', type: 'Super Duplex' }
            };
            
            this.setupEventHandlers();
        }

        setupEventHandlers() {
            const self = this;
            
            window.VanaHandlers = {
                onStandartChange: function() {
                    self.updateSizes();
                    self.updatePressureRatings();
                    self.updateMaterialGrades();
                },
                
                onVanaTipiChange: function() {
                    self.updateConnectionTypes();
                    self.updateBodyTypes();
                },
                
                onBoyutChange: function() {
                    self.validateSizeForValveType();
                }
            };
        }

        updateSizes() {
            const standart = document.getElementById('vana_standart')?.value;
            const boyutSelect = document.getElementById('vana_boyut');
            if (!boyutSelect) return;
            
            const lang = this.getCurrentLanguage();
            boyutSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Boyut seçin...' : 'Select size...'}</option>`;
            
            if (standart === 'en_din') {
                this.enDinSizes.forEach(dn => {
                    const od = this.dnToOD[dn];
                    const option = document.createElement('option');
                    option.value = dn;
                    option.textContent = `${dn} (Ø${od}mm)`;
                    boyutSelect.appendChild(option);
                });
            } else if (standart === 'asme_api') {
                this.asmeApiSizes.forEach(nps => {
                    const od = this.npsToOD[nps];
                    const option = document.createElement('option');
                    option.value = nps;
                    option.textContent = `${nps}" (Ø${od}mm)`;
                    boyutSelect.appendChild(option);
                });
            }
        }

        updatePressureRatings() {
            const standart = document.getElementById('vana_standart')?.value;
            const basinc = document.getElementById('vana_basinc');
            if (!basinc) return;
            
            const lang = this.getCurrentLanguage();
            basinc.innerHTML = `<option value="">${lang === 'tr' ? 'Basınç seçin...' : 'Select pressure...'}</option>`;
            
            if (standart === 'en_din') {
                this.pnRatings.forEach(pn => {
                    const option = document.createElement('option');
                    option.value = pn;
                    option.textContent = pn;
                    basinc.appendChild(option);
                });
            } else if (standart === 'asme_api') {
                this.classRatings.forEach(cls => {
                    const option = document.createElement('option');
                    option.value = cls;
                    option.textContent = cls;
                    basinc.appendChild(option);
                });
            }
        }

        updateConnectionTypes() {
            const vanaTipi = document.getElementById('vana_tipi')?.value;
            const baglantiSelect = document.getElementById('vana_baglanti');
            if (!baglantiSelect || !vanaTipi) return;
            
            const lang = this.getCurrentLanguage();
            baglantiSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Bağlantı seçin...' : 'Select connection...'}</option>`;
            
            const connections = this.connectionsByValveType[vanaTipi] || [];
            connections.forEach(conn => {
                const option = document.createElement('option');
                option.value = conn;
                option.textContent = this.getText(conn);
                baglantiSelect.appendChild(option);
            });
        }

        updateBodyTypes() {
            const vanaTipi = document.getElementById('vana_tipi')?.value;
            const govdeSelect = document.getElementById('vana_govde');
            if (!govdeSelect || !vanaTipi) return;
            
            const lang = this.getCurrentLanguage();
            govdeSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Gövde tipi seçin...' : 'Select body type...'}</option>`;
            
            const bodyTypes = this.bodyTypesByValveType[vanaTipi] || [];
            bodyTypes.forEach(body => {
                const option = document.createElement('option');
                option.value = body;
                option.textContent = this.getText(body);
                govdeSelect.appendChild(option);
            });
        }

        validateSizeForValveType() {
            const vanaTipi = document.getElementById('vana_tipi')?.value;
            const boyut = document.getElementById('vana_boyut')?.value;
            
            if (vanaTipi === 'needle' && boyut) {
                const standart = document.getElementById('vana_standart')?.value;
                let sizeValue = 0;
                
                if (standart === 'en_din') {
                    sizeValue = parseInt(boyut.replace('DN', ''));
                    if (sizeValue > 50) {
                        window.UIManager?.showNotification('İğne vanalar maksimum DN50 boyutunda üretilir', 'warning');
                    }
                } else if (standart === 'asme_api') {
                    const npsMap = {'1/2': 0.5, '3/4': 0.75, '1': 1, '1-1/4': 1.25, '1-1/2': 1.5, '2': 2};
                    sizeValue = npsMap[boyut] || 999;
                    if (sizeValue > 2) {
                        window.UIManager?.showNotification('Needle valves are typically produced up to 2"', 'warning');
                    }
                }
            }
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="vana_standart">${this.getText('standart_sistemi_label')}</label>
                        <select id="vana_standart" onchange="window.VanaHandlers.onStandartChange()">
                            <option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
                            <option value="en_din">${this.getText('en_din')}</option>
                            <option value="asme_api">${this.getText('asme_api')}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="vana_tipi">${this.getText('vana_tipi_label')}</label>
                        <select id="vana_tipi" onchange="window.VanaHandlers.onVanaTipiChange()">
                            <option value="">${lang === 'tr' ? 'Tip seçin...' : 'Select type...'}</option>
                            <option value="gate">${this.getText('gate')}</option>
                            <option value="globe">${this.getText('globe')}</option>
                            <option value="ball">${this.getText('ball')}</option>
                            <option value="butterfly">${this.getText('butterfly')}</option>
                            <option value="check">${this.getText('check')}</option>
                            <option value="needle">${this.getText('needle')}</option>
                            <option value="plug">${this.getText('plug')}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="vana_boyut">${this.getText('boyut_label')}</label>
                        <select id="vana_boyut" onchange="window.VanaHandlers.onBoyutChange()">
                            <option value="">${lang === 'tr' ? 'Önce standart seçin' : 'Select standard first'}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="vana_baglanti">${this.getText('baglanti_tipi_label')}</label>
                        <select id="vana_baglanti">
                            <option value="">${lang === 'tr' ? 'Önce vana tipi seçin' : 'Select valve type first'}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="vana_basinc">${this.getText('basinc_sinifi_label')}</label>
                        <select id="vana_basinc">
                            <option value="">${lang === 'tr' ? 'Önce standart seçin' : 'Select standard first'}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="vana_govde">${this.getText('govde_tipi_label')}</label>
                        <select id="vana_govde">
                            <option value="">${lang === 'tr' ? 'Önce vana tipi seçin' : 'Select valve type first'}</option>
                        </select>
                    </div>
                </div>
            `;
        }

        getGrades() {
            const allMaterials = {
                ...this.castCarbonMaterials,
                ...this.forgedCarbonMaterials,
                ...this.castStainlessMaterials,
                ...this.forgedStainlessMaterials,
                ...this.castAlloyMaterials,
                ...this.bronzeMaterials,
                ...this.specialMaterials
            };
            
            return this.getGroupedGrades(allMaterials);
        }

        getGroupedGrades(materials) {
            const organizedGrades = [];
            
            const groups = {
                'carbon_cast': this.getText('group_carbon_cast'),
                'carbon_forged': this.getText('group_carbon_forged'),
                'stainless_cast': this.getText('group_stainless_cast'),
                'stainless_forged': this.getText('group_stainless_forged'),
                'alloy_cast': this.getText('group_alloy_cast'),
                'bronze': this.getText('group_bronze'),
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

        getDensity(grade) {
            const allMaterials = {
                ...this.castCarbonMaterials,
                ...this.forgedCarbonMaterials,
                ...this.castStainlessMaterials,
                ...this.forgedStainlessMaterials,
                ...this.castAlloyMaterials,
                ...this.bronzeMaterials,
                ...this.specialMaterials
            };
            
            return allMaterials[grade]?.density || 7850;
        }

        getMaterialStandard(grade) {
            const allMaterials = {
                ...this.castCarbonMaterials,
                ...this.forgedCarbonMaterials,
                ...this.castStainlessMaterials,
                ...this.forgedStainlessMaterials,
                ...this.castAlloyMaterials,
                ...this.bronzeMaterials,
                ...this.specialMaterials
            };
            
            return allMaterials[grade]?.standard || '-';
        }

        getStandard(grade, standartSistemi, vanaTipi) {
            // Malzeme standardını al
            const materialStandard = this.getMaterialStandard(grade);
            
            // Vana standardını al
            let valveStandard = '-';
            if (standartSistemi && vanaTipi && this.valveStandards[standartSistemi] && this.valveStandards[standartSistemi][vanaTipi]) {
                valveStandard = this.valveStandards[standartSistemi][vanaTipi];
            }
            
            // İkisini birleştir
            if (materialStandard !== '-' && valveStandard !== '-') {
                return `${materialStandard} / ${valveStandard}`;
            } else if (materialStandard !== '-') {
                return materialStandard;
            } else if (valveStandard !== '-') {
                return valveStandard;
            }
            
            return '-';
        }

        calculate(formData) {
            const standart = formData.vana_standart;
            const vanaTipi = formData.vana_tipi;
            const boyut = formData.vana_boyut;
            const baglantiTipi = formData.vana_baglanti;
            const basincSinifi = formData.vana_basinc;
            const govdeTipi = formData.vana_govde;
            const malzemeCinsi = formData.malzemeCinsi;
            const adet = parseFloat(formData.adet) || 1;
            
            if (!standart || !vanaTipi || !boyut || !baglantiTipi || 
                !basincSinifi || !govdeTipi || !malzemeCinsi) {
                return null;
            }
            
            // Boyut bilgilerini al
            let od = 0;
            if (standart === 'en_din') {
                od = this.dnToOD[boyut];
            } else if (standart === 'asme_api') {
                od = this.npsToOD[boyut];
            }
            
            if (!od) return null;
            
            // Yoğunluk
            const density = this.getDensity(malzemeCinsi);
            
            // Temel hacim hesaplaması
            const bodyLength = od * 2.8;
            const bodyDiameter = od * 1.5;
            const bodyVolume = Math.PI * Math.pow(bodyDiameter / 2, 2) * bodyLength;
            
            const bonnetHeight = od * 0.8;
            const bonnetDiameter = od * 1.3;
            const bonnetVolume = Math.PI * Math.pow(bonnetDiameter / 2, 2) * bonnetHeight;
            
            const boreVolume = Math.PI * Math.pow(od / 2, 2) * (bodyLength * 0.7);
            
            let connectionVolume = 0;
            if (baglantiTipi === 'flanged') {
                const flangeThickness = od * 0.15;
                const flangeDiameter = od * 2.2;
                connectionVolume = 2 * Math.PI * Math.pow(flangeDiameter / 2, 2) * flangeThickness;
            } else {
                connectionVolume = Math.PI * Math.pow(od * 1.3 / 2, 2) * (od * 0.3);
            }
            
            let totalMetalVolume = bodyVolume + bonnetVolume + connectionVolume - boreVolume;
            
            const valveTypeFactor = this.valveTypeFactors[vanaTipi] || 1.0;
            totalMetalVolume *= valveTypeFactor;
            
            const connectionFactor = this.connectionFactors[baglantiTipi] || 1.0;
            totalMetalVolume *= connectionFactor;
            
            let pressureFactor = 1.0;
            if (standart === 'en_din') {
                pressureFactor = this.pnFactors[basincSinifi] || 1.0;
            } else if (standart === 'asme_api') {
                pressureFactor = this.classFactors[basincSinifi] || 1.0;
            }
            totalMetalVolume *= pressureFactor;
            
            if (govdeTipi === 'full_bore') {
                totalMetalVolume *= 1.1;
            }
            
            const volumeM3 = totalMetalVolume / 1000000000;
            const birimAgirlik = volumeM3 * density;
            const toplamAgirlik = birimAgirlik * adet;
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                suHacmi: null
            };
        }

        validate(formData) {
            const standart = formData.vana_standart;
            const vanaTipi = formData.vana_tipi;
            const boyut = formData.vana_boyut;
            const baglantiTipi = formData.vana_baglanti;
            const basincSinifi = formData.vana_basinc;
            const govdeTipi = formData.vana_govde;
            
            if (!standart || !vanaTipi || !boyut || !baglantiTipi || 
                !basincSinifi || !govdeTipi) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            return { isValid: true };
        }

        formatDimensions(formData) {
            const standart = formData.vana_standart;
            const boyut = formData.vana_boyut;
            const baglantiTipi = formData.vana_baglanti;
            const basincSinifi = formData.vana_basinc;
            const govdeTipi = formData.vana_govde;
            
            if (!boyut || !baglantiTipi || !basincSinifi || !govdeTipi) {
                return '-';
            }
            
            // ASME/API için inç işareti ekle
            let boyutText = boyut;
            if (standart === 'asme_api') {
                boyutText = `${boyut}"`;
            }
            
            // Bağlantı ve gövde tiplerini getText ile al (dil desteği için)
            const baglantiText = this.getText(baglantiTipi);
            const govdeText = this.getText(govdeTipi);
            
            return `${boyutText}, ${baglantiText}, ${basincSinifi}, ${govdeText}`;
        }

        hasWaterVolume() {
            return false;
        }

        getDisplayName() {
            return this.getText('display_name');
        }

        getDisplayTypeFromRow(rowData) {
            const metadata = rowData.metadata?.vana;
            if (!metadata || !metadata.tipi) {
                return this.getDisplayName();
            }
            
            return this.getText(metadata.tipi);
        }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            
            const vanaTipi = formData.vana_tipi;
            baseRow.malzemeTuru = vanaTipi ? this.getText(vanaTipi) : this.getDisplayName();
            
            // Standart bilgisini hem malzeme hem vana standardı ile birleştir
            baseRow.enNormu = this.getStandard(
                formData.malzemeCinsi, 
                formData.vana_standart, 
                formData.vana_tipi
            );
            
            baseRow.metadata = {
                ...baseRow.metadata,
                vana: {
                    standart: formData.vana_standart,
                    tipi: formData.vana_tipi,
                    boyut: formData.vana_boyut,
                    baglanti: formData.vana_baglanti,
                    basinc: formData.vana_basinc,
                    govde: formData.vana_govde
                }
            };
            
            return baseRow;
        }

        fillFormFromRow(rowData) {
            super.fillFormFromRow(rowData);
            
            const metadata = rowData.metadata?.vana;
            if (!metadata) {
                if (rowData.formData) {
                    this.fillFromFormData(rowData.formData);
                }
                return true;
            }
            
            setTimeout(() => {
                if (metadata.standart) {
                    document.getElementById('vana_standart').value = metadata.standart;
                    window.VanaHandlers.onStandartChange();
                }
                
                setTimeout(() => {
                    if (metadata.tipi) {
                        document.getElementById('vana_tipi').value = metadata.tipi;
                        window.VanaHandlers.onVanaTipiChange();
                    }
                    
                    setTimeout(() => {
                        if (metadata.boyut) document.getElementById('vana_boyut').value = metadata.boyut;
                        if (metadata.baglanti) document.getElementById('vana_baglanti').value = metadata.baglanti;
                        if (metadata.basinc) document.getElementById('vana_basinc').value = metadata.basinc;
                        if (metadata.govde) document.getElementById('vana_govde').value = metadata.govde;
                    }, 100);
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
                        
                        if (key === 'vana_standart') {
                            window.VanaHandlers.onStandartChange();
                        } else if (key === 'vana_tipi') {
                            window.VanaHandlers.onVanaTipiChange();
                        }
                    }
                });
            }, 100);
        }
    }

    const vanaMaterial = new VanaMaterial();
    vanaMaterial.register();
    
    console.log('Vanalar modülü v1.0.3 yüklendi (İnç İşareti ve Dil Desteği Düzeltmesi)');

})(window);