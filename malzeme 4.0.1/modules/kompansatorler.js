/**
 * KOMPANSATÖRLER (Expansion Joints) Malzeme Modülü
 * Versiyon: 1.0.0
 * EJMA ve EN 14917 standartları ile kompansatör hesaplama modülü
 */

(function(window) {
    'use strict';
    
    class ExpansionJointMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'expansion_joint';
            this.version = '1.0.0';
            
            this.texts = {
                tr: {
                    display_name: 'Kompansatörler',
                    
                    // Etiketler
                    standart_label: 'Standart',
                    kompansator_tipi_label: 'Kompansatör Tipi',
                    boyut_label: 'Boyut (NPS/DN)',
                    baglanti_tipi_label: 'Bağlantı Tipi',
                    basinc_sinifi_label: 'Basınç Sınıfı',
                    koruk_sayisi_label: 'Körük Sayısı',
                    koruk_uzunluk_label: 'Körük Uzunluğu (mm)',
                    hareket_kapasitesi_label: 'Hareket Kapasitesi',
                    
                    // Standartlar
                    ejma: 'EJMA (Expansion Joint Manufacturers Association)',
                    en_14917: 'EN 14917 (Metallic Expansion Joints)',
                    
                    // Kompansatör Tipleri
                    single_expansion: 'Single Expansion Joint (Tek Körüklü)',
                    double_expansion: 'Double Expansion Joint (Çift Körüklü)',
                    universal_expansion: 'Universal Expansion Joint (Universal Körüklü)',
                    pressure_balanced: 'Pressure Balanced (Basınç Dengeli)',
                    hinged_expansion: 'Hinged Expansion Joint (Menteşeli)',
                    gimbal_expansion: 'Gimbal Expansion Joint (Gimbal Tipi)',
                    inline_expansion: 'In-Line Expansion Joint (Hizada)',
                    angular_expansion: 'Angular Expansion Joint (Açılı)',
                    lateral_expansion: 'Lateral Expansion Joint (Yanal)',
                    
                    // Tabloda gösterilecek
                    single_expansion_display: 'Tek Körüklü Kompansatör',
                    double_expansion_display: 'Çift Körüklü Kompansatör',
                    universal_expansion_display: 'Universal Kompansatör',
                    pressure_balanced_display: 'Basınç Dengeli Kompansatör',
                    hinged_expansion_display: 'Menteşeli Kompansatör',
                    gimbal_expansion_display: 'Gimbal Kompansatör',
                    inline_expansion_display: 'Hizada Kompansatör',
                    angular_expansion_display: 'Açılı Kompansatör',
                    lateral_expansion_display: 'Yanal Kompansatör',
                    
                    // Bağlantı Tipleri
                    flanged: 'Flanşlı (Flanged End)',
                    welded: 'Kaynaklı (Welding End)',
                    threaded: 'Dişli (Threaded End)',
                    vanstone: 'Van Stone (Lap Joint)',
                    
                    // EJMA Basınç Sınıfları
                    pressure_150psi: '150 PSI (10.3 bar)',
                    pressure_300psi: '300 PSI (20.7 bar)',
                    pressure_600psi: '600 PSI (41.4 bar)',
                    
                    // EN Basınç Sınıfları
                    pn_6: 'PN 6 (6 bar)',
                    pn_10: 'PN 10 (10 bar)',
                    pn_16: 'PN 16 (16 bar)',
                    pn_25: 'PN 25 (25 bar)',
                    pn_40: 'PN 40 (40 bar)',
                    pn_63: 'PN 63 (63 bar)',
                    pn_100: 'PN 100 (100 bar)',
                    
                    // Körük Sayısı
                    bellows_1: '1 Körük',
                    bellows_2: '2 Körük',
                    bellows_3: '3 Körük',
                    bellows_4: '4 Körük',
                    bellows_5: '5 Körük',
                    bellows_6: '6 Körük',
                    bellows_8: '8 Körük',
                    bellows_10: '10 Körük',
                    
                    // Hareket Kapasitesi
                    movement_axial_25: 'Eksenel ±25mm',
                    movement_axial_50: 'Eksenel ±50mm',
                    movement_axial_75: 'Eksenel ±75mm',
                    movement_axial_100: 'Eksenel ±100mm',
                    movement_lateral_10: 'Yanal ±10mm',
                    movement_lateral_20: 'Yanal ±20mm',
                    movement_lateral_30: 'Yanal ±30mm',
                    movement_angular_5: 'Açısal ±5°',
                    movement_angular_10: 'Açısal ±10°',
                    movement_combined: 'Kombine Hareket',
                    
                    // Malzeme Grupları - EJMA
                    group_carbon_ejma: 'Karbon Çelik - EJMA',
                    group_stainless_ejma: 'Paslanmaz Çelik - EJMA',
                    group_special_ejma: 'Özel Alaşımlar - EJMA',
                    
                    // Malzeme Grupları - EN
                    group_carbon_en: 'Karbon Çelik - EN',
                    group_stainless_en: 'Paslanmaz Çelik - EN',
                    group_special_en: 'Özel Alaşımlar - EN',
                    
                    // Validasyon
                    validation_error: 'Lütfen tüm alanları doldurun',
                    validation_koruk_uzunluk_error: 'Körük uzunluğu 0\'dan büyük olmalıdır'
                },
                en: {
                    display_name: 'Expansion Joints',
                    
                    // Labels
                    standart_label: 'Standard',
                    kompansator_tipi_label: 'Expansion Joint Type',
                    boyut_label: 'Size (NPS/DN)',
                    baglanti_tipi_label: 'Connection Type',
                    basinc_sinifi_label: 'Pressure Class',
                    koruk_sayisi_label: 'Number of Convolutions',
                    koruk_uzunluk_label: 'Bellows Length (mm)',
                    hareket_kapasitesi_label: 'Movement Capacity',
                    
                    // Standards
                    ejma: 'EJMA (Expansion Joint Manufacturers Association)',
                    en_14917: 'EN 14917 (Metallic Expansion Joints)',
                    
                    // Expansion Joint Types
                    single_expansion: 'Single Expansion Joint',
                    double_expansion: 'Double Expansion Joint',
                    universal_expansion: 'Universal Expansion Joint',
                    pressure_balanced: 'Pressure Balanced Expansion Joint',
                    hinged_expansion: 'Hinged Expansion Joint',
                    gimbal_expansion: 'Gimbal Expansion Joint',
                    inline_expansion: 'In-Line Expansion Joint',
                    angular_expansion: 'Angular Expansion Joint',
                    lateral_expansion: 'Lateral Expansion Joint',
                    
                    // Display names
                    single_expansion_display: 'Single Expansion Joint',
                    double_expansion_display: 'Double Expansion Joint',
                    universal_expansion_display: 'Universal Expansion Joint',
                    pressure_balanced_display: 'Pressure Balanced Expansion Joint',
                    hinged_expansion_display: 'Hinged Expansion Joint',
                    gimbal_expansion_display: 'Gimbal Expansion Joint',
                    inline_expansion_display: 'In-Line Expansion Joint',
                    angular_expansion_display: 'Angular Expansion Joint',
                    lateral_expansion_display: 'Lateral Expansion Joint',
                    
                    // Connection Types
                    flanged: 'Flanged End',
                    welded: 'Welding End',
                    threaded: 'Threaded End',
                    vanstone: 'Van Stone (Lap Joint)',
                    
                    // EJMA Pressure Classes
                    pressure_150psi: '150 PSI (10.3 bar)',
                    pressure_300psi: '300 PSI (20.7 bar)',
                    pressure_600psi: '600 PSI (41.4 bar)',
                    
                    // EN Pressure Classes
                    pn_6: 'PN 6 (6 bar)',
                    pn_10: 'PN 10 (10 bar)',
                    pn_16: 'PN 16 (16 bar)',
                    pn_25: 'PN 25 (25 bar)',
                    pn_40: 'PN 40 (40 bar)',
                    pn_63: 'PN 63 (63 bar)',
                    pn_100: 'PN 100 (100 bar)',
                    
                    // Number of Convolutions
                    bellows_1: '1 Convolution',
                    bellows_2: '2 Convolutions',
                    bellows_3: '3 Convolutions',
                    bellows_4: '4 Convolutions',
                    bellows_5: '5 Convolutions',
                    bellows_6: '6 Convolutions',
                    bellows_8: '8 Convolutions',
                    bellows_10: '10 Convolutions',
                    
                    // Movement Capacity
                    movement_axial_25: 'Axial ±25mm',
                    movement_axial_50: 'Axial ±50mm',
                    movement_axial_75: 'Axial ±75mm',
                    movement_axial_100: 'Axial ±100mm',
                    movement_lateral_10: 'Lateral ±10mm',
                    movement_lateral_20: 'Lateral ±20mm',
                    movement_lateral_30: 'Lateral ±30mm',
                    movement_angular_5: 'Angular ±5°',
                    movement_angular_10: 'Angular ±10°',
                    movement_combined: 'Combined Movement',
                    
                    // Material Groups - EJMA
                    group_carbon_ejma: 'Carbon Steel - EJMA',
                    group_stainless_ejma: 'Stainless Steel - EJMA',
                    group_special_ejma: 'Special Alloys - EJMA',
                    
                    // Material Groups - EN
                    group_carbon_en: 'Carbon Steel - EN',
                    group_stainless_en: 'Stainless Steel - EN',
                    group_special_en: 'Special Alloys - EN',
                    
                    // Validation
                    validation_error: 'Please fill all fields',
                    validation_koruk_uzunluk_error: 'Bellows length must be greater than 0'
                }
            };
            
            // NPS/DN boyutları ve çaplar (mm)
            this.sizeData = {
                '1': { nps: '1', dn: 25, od: 33.4 },
                '1-1/4': { nps: '1-1/4', dn: 32, od: 42.2 },
                '1-1/2': { nps: '1-1/2', dn: 40, od: 48.3 },
                '2': { nps: '2', dn: 50, od: 60.3 },
                '2-1/2': { nps: '2-1/2', dn: 65, od: 73.0 },
                '3': { nps: '3', dn: 80, od: 88.9 },
                '4': { nps: '4', dn: 100, od: 114.3 },
                '5': { nps: '5', dn: 125, od: 141.3 },
                '6': { nps: '6', dn: 150, od: 168.3 },
                '8': { nps: '8', dn: 200, od: 219.1 },
                '10': { nps: '10', dn: 250, od: 273.0 },
                '12': { nps: '12', dn: 300, od: 323.9 },
                '14': { nps: '14', dn: 350, od: 355.6 },
                '16': { nps: '16', dn: 400, od: 406.4 },
                '18': { nps: '18', dn: 450, od: 457.0 },
                '20': { nps: '20', dn: 500, od: 508.0 },
                '24': { nps: '24', dn: 600, od: 610.0 },
                '30': { nps: '30', dn: 750, od: 762.0 },
                '36': { nps: '36', dn: 900, od: 914.0 }
            };
            
            // Kompansatör tipi ağırlık çarpanları
            this.expansionTypeFactors = {
                'single_expansion': 1.0,
                'double_expansion': 1.8,
                'universal_expansion': 2.2,
                'pressure_balanced': 2.5,
                'hinged_expansion': 1.4,
                'gimbal_expansion': 1.6,
                'inline_expansion': 1.2,
                'angular_expansion': 1.3,
                'lateral_expansion': 1.5
            };
            
            // Bağlantı tipi çarpanları
            this.connectionFactors = {
                'flanged': 1.3,
                'welded': 1.0,
                'threaded': 1.1,
                'vanstone': 1.15
            };
            
            // EJMA Malzemeleri
            this.ejmaMaterials = {
                // Karbon Çelik
                'A516 Gr.70': { density: 7850, standard: 'EJMA / ASTM A516', group: 'carbon_ejma' },
                'A105': { density: 7850, standard: 'EJMA / ASTM A105', group: 'carbon_ejma' },
                'A106 Gr.B': { density: 7850, standard: 'EJMA / ASTM A106', group: 'carbon_ejma' },
                
                // Paslanmaz Çelik
                'A240 TP304': { density: 7900, standard: 'EJMA / ASTM A240 Type 304', group: 'stainless_ejma' },
                'A240 TP304L': { density: 7900, standard: 'EJMA / ASTM A240 Type 304L', group: 'stainless_ejma' },
                'A240 TP316': { density: 7980, standard: 'EJMA / ASTM A240 Type 316', group: 'stainless_ejma' },
                'A240 TP316L': { density: 7980, standard: 'EJMA / ASTM A240 Type 316L', group: 'stainless_ejma' },
                'A240 TP321': { density: 7900, standard: 'EJMA / ASTM A240 Type 321', group: 'stainless_ejma' },
                'A240 TP347': { density: 7900, standard: 'EJMA / ASTM A240 Type 347', group: 'stainless_ejma' },
                
                // Özel Alaşımlar
                'Inconel 600': { density: 8470, standard: 'EJMA / UNS N06600', group: 'special_ejma' },
                'Inconel 625': { density: 8440, standard: 'EJMA / UNS N06625', group: 'special_ejma' },
                'Incoloy 800': { density: 7940, standard: 'EJMA / UNS N08800', group: 'special_ejma' },
                'Hastelloy C276': { density: 8890, standard: 'EJMA / UNS N10276', group: 'special_ejma' },
                'Monel 400': { density: 8800, standard: 'EJMA / UNS N04400', group: 'special_ejma' },
                'Titanium Gr.2': { density: 4507, standard: 'EJMA / ASTM B265 Grade 2', group: 'special_ejma' }
            };
            
            // EN 14917 Malzemeleri
            this.en14917Materials = {
                // Karbon Çelik
                'P235GH': { density: 7850, standard: 'EN 14917 / EN 10028-2', group: 'carbon_en' },
                'P265GH': { density: 7850, standard: 'EN 14917 / EN 10028-2', group: 'carbon_en' },
                'P355GH': { density: 7850, standard: 'EN 14917 / EN 10028-2', group: 'carbon_en' },
                '16Mo3': { density: 7850, standard: 'EN 14917 / EN 10028-2', group: 'carbon_en' },
                
                // Paslanmaz Çelik
                'X5CrNi18-10': { density: 7900, standard: 'EN 14917 / EN 10088-2 (1.4301)', group: 'stainless_en' },
                'X2CrNi19-11': { density: 7900, standard: 'EN 14917 / EN 10088-2 (1.4306)', group: 'stainless_en' },
                'X5CrNiMo17-12-2': { density: 7980, standard: 'EN 14917 / EN 10088-2 (1.4401)', group: 'stainless_en' },
                'X2CrNiMo17-12-2': { density: 7980, standard: 'EN 14917 / EN 10088-2 (1.4404)', group: 'stainless_en' },
                'X6CrNiTi18-10': { density: 7900, standard: 'EN 14917 / EN 10088-2 (1.4541)', group: 'stainless_en' },
                'X6CrNiMoTi17-12-2': { density: 7980, standard: 'EN 14917 / EN 10088-2 (1.4571)', group: 'stainless_en' },
                
                // Özel Alaşımlar
                'X2CrNiMoN22-5-3': { density: 7800, standard: 'EN 14917 / EN 10088-2 (1.4462)', group: 'special_en' },
                'X2CrNiMoCuN25-6-3': { density: 7800, standard: 'EN 14917 / EN 10088-2 (1.4507)', group: 'special_en' },
                'NiCr23Co12Mo': { density: 8890, standard: 'EN 14917 / DIN 17744', group: 'special_en' },
                'NiCr21Mo14W': { density: 8890, standard: 'EN 14917 / DIN 17744', group: 'special_en' }
            };
            
            this.setupEventHandlers();
        }

        setupEventHandlers() {
            const self = this;
            
            window.ExpansionJointHandlers = {
                onStandartChange: function() {
                    self.updateMaterialGrades();
                    self.updatePressureClasses();
                    self.updateSizeOptions();
                },
                
                onKompansatorTipiChange: function() {
                    self.updateMovementCapacityOptions();
                }
            };
        }

        updatePressureClasses() {
            const standart = document.getElementById('ej_standart')?.value;
            const pressureSelect = document.getElementById('ej_basinc_sinifi');
            if (!pressureSelect) return;
            
            const lang = this.getCurrentLanguage();
            pressureSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Basınç sınıfı seçin...' : 'Select pressure class...'}</option>`;
            
            if (standart === 'ejma') {
                const pressures = ['150psi', '300psi', '600psi'];
                pressures.forEach(p => {
                    const option = document.createElement('option');
                    option.value = `pressure_${p}`;
                    option.textContent = this.getText(`pressure_${p}`);
                    pressureSelect.appendChild(option);
                });
            } else if (standart === 'en_14917') {
                const pns = ['6', '10', '16', '25', '40', '63', '100'];
                pns.forEach(pn => {
                    const option = document.createElement('option');
                    option.value = `pn_${pn}`;
                    option.textContent = this.getText(`pn_${pn}`);
                    pressureSelect.appendChild(option);
                });
            }
        }

        updateSizeOptions() {
            const standart = document.getElementById('ej_standart')?.value;
            const sizeSelect = document.getElementById('ej_boyut');
            if (!sizeSelect) return;
            
            const lang = this.getCurrentLanguage();
            sizeSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Boyut seçin...' : 'Select size...'}</option>`;
            
            Object.keys(this.sizeData).forEach(key => {
                const data = this.sizeData[key];
                const option = document.createElement('option');
                option.value = key;
                
                if (standart === 'ejma') {
                    option.textContent = `NPS ${data.nps}" (DN${data.dn})`;
                } else if (standart === 'en_14917') {
                    option.textContent = `DN${data.dn} (NPS ${data.nps}")`;
                } else {
                    option.textContent = `NPS ${data.nps}" / DN${data.dn}`;
                }
                
                sizeSelect.appendChild(option);
            });
        }

        updateMovementCapacityOptions() {
            const kompansatorTipi = document.getElementById('ej_kompansator_tipi')?.value;
            const movementSelect = document.getElementById('ej_hareket_kapasitesi');
            if (!movementSelect) return;
            
            const lang = this.getCurrentLanguage();
            movementSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Hareket seçin...' : 'Select movement...'}</option>`;
            
            if (!kompansatorTipi) return;
            
            let movements = [];
            
            // Kompansatör tipine göre uygun hareket seçenekleri
            if (kompansatorTipi === 'single_expansion' || kompansatorTipi === 'double_expansion' || 
                kompansatorTipi === 'inline_expansion') {
                movements = ['axial_25', 'axial_50', 'axial_75', 'axial_100'];
            } else if (kompansatorTipi === 'lateral_expansion') {
                movements = ['lateral_10', 'lateral_20', 'lateral_30'];
            } else if (kompansatorTipi === 'angular_expansion' || kompansatorTipi === 'hinged_expansion' || 
                       kompansatorTipi === 'gimbal_expansion') {
                movements = ['angular_5', 'angular_10'];
            } else if (kompansatorTipi === 'universal_expansion' || kompansatorTipi === 'pressure_balanced') {
                movements = ['axial_25', 'axial_50', 'axial_75', 'axial_100', 'lateral_10', 
                           'lateral_20', 'lateral_30', 'combined'];
            }
            
            movements.forEach(movement => {
                const option = document.createElement('option');
                option.value = movement;
                option.textContent = this.getText(`movement_${movement}`);
                movementSelect.appendChild(option);
            });
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="ej_standart">${this.getText('standart_label')}</label>
                        <select id="ej_standart" onchange="window.ExpansionJointHandlers.onStandartChange()">
                            <option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
                            <option value="ejma">${this.getText('ejma')}</option>
                            <option value="en_14917">${this.getText('en_14917')}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="ej_kompansator_tipi">${this.getText('kompansator_tipi_label')}</label>
                        <select id="ej_kompansator_tipi" onchange="window.ExpansionJointHandlers.onKompansatorTipiChange()">
                            <option value="">${lang === 'tr' ? 'Tip seçin...' : 'Select type...'}</option>
                            <option value="single_expansion">${this.getText('single_expansion')}</option>
                            <option value="double_expansion">${this.getText('double_expansion')}</option>
                            <option value="universal_expansion">${this.getText('universal_expansion')}</option>
                            <option value="pressure_balanced">${this.getText('pressure_balanced')}</option>
                            <option value="hinged_expansion">${this.getText('hinged_expansion')}</option>
                            <option value="gimbal_expansion">${this.getText('gimbal_expansion')}</option>
                            <option value="inline_expansion">${this.getText('inline_expansion')}</option>
                            <option value="angular_expansion">${this.getText('angular_expansion')}</option>
                            <option value="lateral_expansion">${this.getText('lateral_expansion')}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="ej_boyut">${this.getText('boyut_label')}</label>
                        <select id="ej_boyut">
                            <option value="">${lang === 'tr' ? 'Önce standart seçin' : 'Select standard first'}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="ej_baglanti_tipi">${this.getText('baglanti_tipi_label')}</label>
                        <select id="ej_baglanti_tipi">
                            <option value="">${lang === 'tr' ? 'Bağlantı seçin...' : 'Select connection...'}</option>
                            <option value="flanged">${this.getText('flanged')}</option>
                            <option value="welded">${this.getText('welded')}</option>
                            <option value="threaded">${this.getText('threaded')}</option>
                            <option value="vanstone">${this.getText('vanstone')}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="ej_basinc_sinifi">${this.getText('basinc_sinifi_label')}</label>
                        <select id="ej_basinc_sinifi">
                            <option value="">${lang === 'tr' ? 'Önce standart seçin' : 'Select standard first'}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="ej_koruk_sayisi">${this.getText('koruk_sayisi_label')}</label>
                        <select id="ej_koruk_sayisi">
                            <option value="">${lang === 'tr' ? 'Körük sayısı seçin...' : 'Select convolutions...'}</option>
                            <option value="1">${this.getText('bellows_1')}</option>
                            <option value="2">${this.getText('bellows_2')}</option>
                            <option value="3">${this.getText('bellows_3')}</option>
                            <option value="4">${this.getText('bellows_4')}</option>
                            <option value="5">${this.getText('bellows_5')}</option>
                            <option value="6">${this.getText('bellows_6')}</option>
                            <option value="8">${this.getText('bellows_8')}</option>
                            <option value="10">${this.getText('bellows_10')}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="ej_koruk_uzunluk">${this.getText('koruk_uzunluk_label')}</label>
                        <input type="number" id="ej_koruk_uzunluk" min="10" step="10" placeholder="${lang === 'tr' ? 'Körük uzunluğu' : 'Bellows length'}">
                    </div>
                    <div class="form-group">
                        <label for="ej_hareket_kapasitesi">${this.getText('hareket_kapasitesi_label')}</label>
                        <select id="ej_hareket_kapasitesi">
                            <option value="">${lang === 'tr' ? 'Önce tip seçin' : 'Select type first'}</option>
                        </select>
                    </div>
                </div>
            `;
        }

        getGrades() {
            const standart = document.getElementById('ej_standart')?.value;
            
            if (standart === 'ejma') {
                return this.getGroupedGrades(this.ejmaMaterials);
            } else if (standart === 'en_14917') {
                return this.getGroupedGrades(this.en14917Materials);
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
            if (standart === 'ejma' && this.ejmaMaterials[grade]) {
                return this.ejmaMaterials[grade].density;
            } else if (standart === 'en_14917' && this.en14917Materials[grade]) {
                return this.en14917Materials[grade].density;
            }
            return 7850;
        }

        getStandard(grade, standart) {
            if (standart === 'ejma') {
                return 'EJMA';
            } else if (standart === 'en_14917') {
                return 'EN 14917';
            }
            return '-';
        }

        calculate(formData) {
            const standart = formData.ej_standart;
            const kompansatorTipi = formData.ej_kompansator_tipi;
            const boyut = formData.ej_boyut;
            const baglantiTipi = formData.ej_baglanti_tipi;
            const basincSinifi = formData.ej_basinc_sinifi;
            const korukSayisi = parseInt(formData.ej_koruk_sayisi) || 0;
            const korukUzunluk = parseFloat(formData.ej_koruk_uzunluk) || 0;
            const hareketKapasitesi = formData.ej_hareket_kapasitesi;
            const malzemeCinsi = formData.malzemeCinsi;
            const adet = parseFloat(formData.adet) || 1;
            
            if (!standart || !kompansatorTipi || !boyut || !baglantiTipi || 
                !basincSinifi || !korukSayisi || !korukUzunluk || !hareketKapasitesi || !malzemeCinsi) {
                return null;
            }
            
            const density = this.getDensity(malzemeCinsi, standart);
            const sizeData = this.sizeData[boyut];
            const od = sizeData.od;
            
            // Körük et kalınlığı (basınç sınıfına göre yaklaşık)
            let wallThickness = 2.0;
            if (basincSinifi.includes('300') || basincSinifi.includes('25') || basincSinifi.includes('40')) {
                wallThickness = 2.5;
            } else if (basincSinifi.includes('600') || basincSinifi.includes('63') || basincSinifi.includes('100')) {
                wallThickness = 3.0;
            }
            
            // Körük hacmi (konik-silindirik yapı yaklaşımı)
            const bellowsOD = od + 20; // Körük dış çap artışı
            const bellowsID = od;
            
            // Her körük için hacim
            const singleBellowsVolume = Math.PI * (
                (bellowsOD/2) ** 2 - (bellowsID/2) ** 2
            ) * (korukUzunluk / korukSayisi);
            
            // Toplam körük hacmi
            const totalBellowsVolume = singleBellowsVolume * korukSayisi;
            
            // Uç bağlantı hacmi (flanş veya kaynak uçları)
            const endConnectionLength = 100;
            const endConnectionVolume = Math.PI * ((od/2) ** 2) * endConnectionLength * 2;
            
            // Takviye elemanları hacmi (varsa)
            let reinforcementVolume = 0;
            if (kompansatorTipi === 'pressure_balanced' || kompansatorTipi === 'hinged_expansion' || 
                kompansatorTipi === 'gimbal_expansion') {
                reinforcementVolume = totalBellowsVolume * 0.4;
            }
            
            // Toplam hacim
            let totalVolume = totalBellowsVolume + endConnectionVolume + reinforcementVolume;
            
            // Kompansatör tipi çarpanı
            const typeFactor = this.expansionTypeFactors[kompansatorTipi] || 1.0;
            totalVolume *= typeFactor;
            
            // Bağlantı tipi çarpanı
            const connectionFactor = this.connectionFactors[baglantiTipi] || 1.0;
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
            const standart = formData.ej_standart;
            const kompansatorTipi = formData.ej_kompansator_tipi;
            const boyut = formData.ej_boyut;
            const baglantiTipi = formData.ej_baglanti_tipi;
            const basincSinifi = formData.ej_basinc_sinifi;
            const korukSayisi = formData.ej_koruk_sayisi;
            const korukUzunluk = formData.ej_koruk_uzunluk;
            const hareketKapasitesi = formData.ej_hareket_kapasitesi;
            
            if (!standart || !kompansatorTipi || !boyut || !baglantiTipi || 
                !basincSinifi || !korukSayisi || !hareketKapasitesi) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            if (korukUzunluk === undefined || korukUzunluk === null || 
                korukUzunluk === '' || parseFloat(korukUzunluk) <= 0) {
                return {
                    isValid: false,
                    message: this.getText('validation_koruk_uzunluk_error')
                };
            }
            
            return { isValid: true };
        }

        formatDimensions(formData) {
            const standart = formData.ej_standart;
            const boyut = formData.ej_boyut;
            const basincSinifi = formData.ej_basinc_sinifi;
            const korukSayisi = formData.ej_koruk_sayisi;
            const korukUzunluk = formData.ej_koruk_uzunluk;
            const hareketKapasitesi = formData.ej_hareket_kapasitesi;
            
            if (!boyut || !basincSinifi || !korukSayisi || !korukUzunluk || !hareketKapasitesi) {
                return '-';
            }
            
            const sizeData = this.sizeData[boyut];
            let sizeStr = '';
            
            if (standart === 'ejma') {
                sizeStr = `NPS ${sizeData.nps}"`;
            } else if (standart === 'en_14917') {
                sizeStr = `DN${sizeData.dn}`;
            }
            
            // Basınç sınıfını kısaca göster
            const pressureText = this.getText(basincSinifi).split(' ')[0];
            
            // Hareket kapasitesini kısaca göster
            const movementText = this.getText(`movement_${hareketKapasitesi}`).split(' ')[0];
            
            return `${sizeStr}, ${pressureText}, ${korukSayisi}xN, L=${korukUzunluk}mm, ${movementText}`;
        }

        hasWaterVolume() {
            return false;
        }

        getDisplayName() {
            return this.getText('display_name');
        }

        getDisplayTypeFromRow(rowData) {
            const metadata = rowData.metadata?.expansion_joint;
            if (!metadata || !metadata.kompansator_tipi) {
                return this.getDisplayName();
            }
            
            return this.getText(`${metadata.kompansator_tipi}_display`);
        }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            const standart = formData.ej_standart;
            const kompansatorTipi = formData.ej_kompansator_tipi;
            
            if (kompansatorTipi) {
                baseRow.malzemeTuru = this.getText(`${kompansatorTipi}_display`);
            } else {
                baseRow.malzemeTuru = this.getDisplayName();
            }
            
            // ASTM öneki ekle
            if (standart === 'ejma') {
                baseRow.malzemeCinsi = `ASTM ${formData.malzemeCinsi}`;
            }
            
            baseRow.enNormu = this.getStandard(formData.malzemeCinsi, standart);
            
            baseRow.metadata = {
                ...baseRow.metadata,
                expansion_joint: {
                    standart: formData.ej_standart,
                    kompansator_tipi: formData.ej_kompansator_tipi,
                    boyut: formData.ej_boyut,
                    baglanti_tipi: formData.ej_baglanti_tipi,
                    basinc_sinifi: formData.ej_basinc_sinifi,
                    koruk_sayisi: formData.ej_koruk_sayisi,
                    koruk_uzunluk: formData.ej_koruk_uzunluk,
                    hareket_kapasitesi: formData.ej_hareket_kapasitesi
                }
            };
            
            return baseRow;
        }

        fillFormFromRow(rowData) {
            super.fillFormFromRow(rowData);
            
            const metadata = rowData.metadata?.expansion_joint;
            if (!metadata) {
                if (rowData.formData) {
                    this.fillFromFormData(rowData.formData);
                }
                return true;
            }
            
            setTimeout(() => {
                if (metadata.standart) {
                    document.getElementById('ej_standart').value = metadata.standart;
                    window.ExpansionJointHandlers.onStandartChange();
                }
                
                setTimeout(() => {
                    if (metadata.kompansator_tipi) {
                        document.getElementById('ej_kompansator_tipi').value = metadata.kompansator_tipi;
                        window.ExpansionJointHandlers.onKompansatorTipiChange();
                    }
                    
                    setTimeout(() => {
                        if (metadata.boyut) {
                            const el = document.getElementById('ej_boyut');
                            if (el) el.value = metadata.boyut;
                        }
                        if (metadata.baglanti_tipi) {
                            const el = document.getElementById('ej_baglanti_tipi');
                            if (el) el.value = metadata.baglanti_tipi;
                        }
                        if (metadata.basinc_sinifi) {
                            const el = document.getElementById('ej_basinc_sinifi');
                            if (el) el.value = metadata.basinc_sinifi;
                        }
                        if (metadata.koruk_sayisi) {
                            const el = document.getElementById('ej_koruk_sayisi');
                            if (el) el.value = metadata.koruk_sayisi;
                        }
                        if (metadata.koruk_uzunluk) {
                            const el = document.getElementById('ej_koruk_uzunluk');
                            if (el) el.value = metadata.koruk_uzunluk;
                        }
                        if (metadata.hareket_kapasitesi) {
                            const el = document.getElementById('ej_hareket_kapasitesi');
                            if (el) el.value = metadata.hareket_kapasitesi;
                        }
                    }, 150);
                }, 100);
            }, 100);
            
            return true;
        }

        fillFromFormData(formData) {
            setTimeout(() => {
                Object.keys(formData).forEach(key => {
                    const element = document.getElementById(key);
                    if (element) {
                        element.value = formData[key];
                        
                        if (key === 'ej_standart') {
                            window.ExpansionJointHandlers.onStandartChange();
                        } else if (key === 'ej_kompansator_tipi') {
                            window.ExpansionJointHandlers.onKompansatorTipiChange();
                        }
                    }
                });
            }, 100);
        }
    }

    const expansionJointMaterial = new ExpansionJointMaterial();
    expansionJointMaterial.register();
    
    console.log('Kompansatörler modülü v1.0.0 yüklendi');

})(window);