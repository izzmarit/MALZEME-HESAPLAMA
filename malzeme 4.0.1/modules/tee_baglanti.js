/**
 * TEE BAĞLANTI (TEE) Malzeme Modülü
 * Versiyon: 1.0.0
 * ASME B16.9, ASME B16.11, MSS SP-97 ve EN 10253-2 standartları
 * 
 * Özellikler:
 * - Equal Tee (Eşit Tee)
 * - Reducing Tee (Redüksiyon Tee)
 * - Butt-Welding (ASME B16.9, EN 10253-2)
 * - Socket Weld & Threaded (ASME B16.11, MSS SP-97)
 * - Class 2000-9000 (Forged)
 * - Schedule STD, XS, XXS (Butt-Weld)
 * - NPS 1/8" - 48" boyut aralığı
 * - Kapsamlı malzeme desteği
 * - Tam dil desteği
 */

(function(window) {
    'use strict';
    
    class TeeMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'tee';
            this.version = '1.0.0';
            
            this.texts = {
                tr: {
                    display_name: 'Tee Bağlantı',
                    
                    // Etiketler
                    standart_label: 'Standart',
                    tee_tipi_label: 'Tee Tipi',
                    baglanti_sekli_label: 'Bağlantı Şekli',
                    nps_header_label: 'NPS Ana Hat (Header)',
                    nps_branch_label: 'NPS Branch (Kol)',
                    schedule_label: 'Schedule / Kalınlık',
                    class_label: 'Class Rating',
                    series_label: 'Series',
                    type_label: 'Type (Tip)',
                    thread_type_label: 'Diş Tipi',
                    
                    // Standartlar
                    asme_b169: 'ASME B16.9 (Butt-Welding Tee)',
                    asme_b1611: 'ASME B16.11 (Forged Tee)',
                    mss_sp97: 'MSS SP-97 (Forged Tee)',
                    en_10253: 'EN 10253-2 (Butt-Welding Tee)',
                    
                    // Tee Tipleri
                    equal_tee: 'Equal Tee (Eşit Tee)',
                    reducing_tee: 'Reducing Tee (Redüksiyon Tee)',
                    
                    // Tabloda gösterilecek
                    equal_tee_display: 'Eşit Tee',
                    reducing_tee_display: 'Redüksiyon Tee',
                    
                    // Bağlantı Şekilleri
                    butt_weld: 'Butt-Welding (Alın Kaynağı)',
                    socket_weld: 'Socket Weld (SW - Soket Kaynak)',
                    threaded: 'Threaded (THD - Dişli)',
                    
                    // Schedule
                    sch_std: 'Schedule STD',
                    sch_xs: 'Schedule XS',
                    sch_xxs: 'Schedule XXS',
                    sch_10: 'Schedule 10',
                    sch_40: 'Schedule 40',
                    sch_80: 'Schedule 80',
                    sch_160: 'Schedule 160',
                    
                    // Class Ratings
                    class_2000: 'Class 2000 (2000 PSI)',
                    class_3000: 'Class 3000 (3000 PSI)',
                    class_6000: 'Class 6000 (6000 PSI)',
                    class_9000: 'Class 9000 (9000 PSI)',
                    
                    // EN Series
                    series_1: 'Series 1 (İnce)',
                    series_2: 'Series 2 (Orta)',
                    series_3: 'Series 3 (Kalın)',
                    
                    // EN Type
                    type_a: 'Type A (Wrought - Dövme)',
                    type_b: 'Type B (Welded - Kaynaklı)',
                    
                    // Thread Tipleri
                    npt: 'NPT (American National Taper)',
                    bsp: 'BSP (British Standard Pipe)',
                    bspt: 'BSPT (British Standard Taper)',
                    
                    // Malzeme Grupları
                    group_carbon: 'Karbon Çelikler',
                    group_alloy: 'Alaşımlı Çelikler',
                    group_stainless: 'Paslanmaz Çelikler',
                    group_duplex: 'Duplex Çelikler',
                    group_high_yield: 'Yüksek Mukavemetli Çelikler',
                    
                    // Validasyon
                    validation_error: 'Lütfen tüm alanları doldurun',
                    validation_branch_bigger: 'Branch boyutu, header boyutundan küçük veya eşit olmalıdır',
                    validation_thread_error: 'Lütfen diş tipi seçin'
                },
                en: {
                    display_name: 'Tee',
                    
                    // Labels
                    standart_label: 'Standard',
                    tee_tipi_label: 'Tee Type',
                    baglanti_sekli_label: 'Connection Type',
                    nps_header_label: 'NPS Header (Run)',
                    nps_branch_label: 'NPS Branch (Outlet)',
                    schedule_label: 'Schedule / Thickness',
                    class_label: 'Class Rating',
                    series_label: 'Series',
                    type_label: 'Type',
                    thread_type_label: 'Thread Type',
                    
                    // Standards
                    asme_b169: 'ASME B16.9 (Butt-Welding Tee)',
                    asme_b1611: 'ASME B16.11 (Forged Tee)',
                    mss_sp97: 'MSS SP-97 (Forged Tee)',
                    en_10253: 'EN 10253-2 (Butt-Welding Tee)',
                    
                    // Tee Types
                    equal_tee: 'Equal Tee',
                    reducing_tee: 'Reducing Tee',
                    
                    // Display names
                    equal_tee_display: 'Equal Tee',
                    reducing_tee_display: 'Reducing Tee',
                    
                    // Connection Types
                    butt_weld: 'Butt-Welding',
                    socket_weld: 'Socket Weld (SW)',
                    threaded: 'Threaded (THD)',
                    
                    // Schedule
                    sch_std: 'Schedule STD',
                    sch_xs: 'Schedule XS',
                    sch_xxs: 'Schedule XXS',
                    sch_10: 'Schedule 10',
                    sch_40: 'Schedule 40',
                    sch_80: 'Schedule 80',
                    sch_160: 'Schedule 160',
                    
                    // Class Ratings
                    class_2000: 'Class 2000 (2000 PSI)',
                    class_3000: 'Class 3000 (3000 PSI)',
                    class_6000: 'Class 6000 (6000 PSI)',
                    class_9000: 'Class 9000 (9000 PSI)',
                    
                    // EN Series
                    series_1: 'Series 1 (Light)',
                    series_2: 'Series 2 (Medium)',
                    series_3: 'Series 3 (Heavy)',
                    
                    // EN Type
                    type_a: 'Type A (Wrought)',
                    type_b: 'Type B (Welded)',
                    
                    // Thread Types
                    npt: 'NPT (American National Taper)',
                    bsp: 'BSP (British Standard Pipe)',
                    bspt: 'BSPT (British Standard Taper)',
                    
                    // Material Groups
                    group_carbon: 'Carbon Steels',
                    group_alloy: 'Alloy Steels',
                    group_stainless: 'Stainless Steels',
                    group_duplex: 'Duplex Steels',
                    group_high_yield: 'High Yield Steels',
                    
                    // Validation
                    validation_error: 'Please fill all fields',
                    validation_branch_bigger: 'Branch size must be smaller than or equal to header size',
                    validation_thread_error: 'Please select thread type'
                }
            };
            
            // NPS boyutları (mm) - Kapsamlı liste
            this.npsData = {
                '1/8': { od: 10.3, sch_std: 1.73, sch_xs: 2.41, sch_xxs: 3.02 },
                '1/4': { od: 13.7, sch_std: 2.24, sch_xs: 3.02, sch_xxs: 3.73 },
                '3/8': { od: 17.1, sch_std: 2.31, sch_xs: 3.20, sch_xxs: 4.01 },
                '1/2': { od: 21.3, sch_std: 2.77, sch_xs: 3.73, sch_xxs: 4.78 },
                '3/4': { od: 26.7, sch_std: 2.87, sch_xs: 3.91, sch_xxs: 5.56 },
                '1': { od: 33.4, sch_std: 3.38, sch_xs: 4.55, sch_xxs: 6.35 },
                '1-1/4': { od: 42.2, sch_std: 3.56, sch_xs: 4.85, sch_xxs: 6.35 },
                '1-1/2': { od: 48.3, sch_std: 3.68, sch_xs: 5.08, sch_xxs: 7.14 },
                '2': { od: 60.3, sch_std: 3.91, sch_xs: 5.54, sch_xxs: 8.74 },
                '2-1/2': { od: 73.0, sch_std: 5.16, sch_xs: 7.01, sch_xxs: 9.53 },
                '3': { od: 88.9, sch_std: 5.49, sch_xs: 7.62, sch_xxs: 11.13 },
                '4': { od: 114.3, sch_std: 6.02, sch_xs: 8.56, sch_xxs: 13.49 },
                '5': { od: 141.3, sch_std: 6.55, sch_xs: 9.53, sch_xxs: 15.88 },
                '6': { od: 168.3, sch_std: 7.11, sch_xs: 10.97, sch_xxs: 18.26 },
                '8': { od: 219.1, sch_std: 8.18, sch_xs: 12.70, sch_xxs: 22.23 },
                '10': { od: 273.0, sch_std: 9.27, sch_xs: 12.70, sch_xxs: 25.40 },
                '12': { od: 323.9, sch_std: 9.53, sch_xs: 14.27, sch_xxs: 28.58 },
                '14': { od: 355.6, sch_std: 9.53, sch_xs: 15.09, sch_xxs: 31.75 },
                '16': { od: 406.4, sch_std: 9.53, sch_xs: 16.66, sch_xxs: 36.53 },
                '18': { od: 457.0, sch_std: 9.53, sch_xs: 17.48, sch_xxs: 39.67 },
                '20': { od: 508.0, sch_std: 9.53, sch_xs: 18.26, sch_xxs: 44.45 },
                '24': { od: 610.0, sch_std: 9.53, sch_xs: 21.44, sch_xxs: 52.37 },
                '30': { od: 762.0, sch_std: 9.53, sch_xs: 25.40, sch_xxs: 62.71 },
                '36': { od: 914.0, sch_std: 9.53, sch_xs: 28.58, sch_xxs: 73.03 },
                '48': { od: 1219.0, sch_std: 9.53, sch_xs: 34.93, sch_xxs: 92.08 }
            };
            
            // ASME B16.9 Malzemeleri (Butt-Welding)
            this.asmeB169Materials = {
                'A234 WPB': { density: 7850, standard: 'ASME B16.9 / ASTM A234 WPB', group: 'carbon' },
                'A234 WPC': { density: 7850, standard: 'ASME B16.9 / ASTM A234 WPC', group: 'carbon' },
                'A420 WPL6': { density: 7850, standard: 'ASME B16.9 / ASTM A420 WPL6', group: 'carbon' },
                'A234 WP1': { density: 7850, standard: 'ASME B16.9 / ASTM A234 WP1', group: 'alloy' },
                'A234 WP5': { density: 7850, standard: 'ASME B16.9 / ASTM A234 WP5', group: 'alloy' },
                'A234 WP9': { density: 7850, standard: 'ASME B16.9 / ASTM A234 WP9', group: 'alloy' },
                'A234 WP11': { density: 7850, standard: 'ASME B16.9 / ASTM A234 WP11', group: 'alloy' },
                'A234 WP22': { density: 7850, standard: 'ASME B16.9 / ASTM A234 WP22', group: 'alloy' },
                'A234 WP91': { density: 7850, standard: 'ASME B16.9 / ASTM A234 WP91', group: 'alloy' },
                'A403 WP304': { density: 7900, standard: 'ASME B16.9 / ASTM A403 WP304', group: 'stainless' },
                'A403 WP304L': { density: 7900, standard: 'ASME B16.9 / ASTM A403 WP304L', group: 'stainless' },
                'A403 WP316': { density: 7980, standard: 'ASME B16.9 / ASTM A403 WP316', group: 'stainless' },
                'A403 WP316L': { density: 7980, standard: 'ASME B16.9 / ASTM A403 WP316L', group: 'stainless' },
                'A403 WP321': { density: 7900, standard: 'ASME B16.9 / ASTM A403 WP321', group: 'stainless' },
                'A815 S31803': { density: 7800, standard: 'ASME B16.9 / ASTM A815 S31803', group: 'duplex' },
                'A815 S32750': { density: 7800, standard: 'ASME B16.9 / ASTM A815 S32750', group: 'duplex' }
            };
            
            // ASME B16.11 Malzemeleri (Forged - Socket Weld/Threaded)
            this.asmeB1611Materials = {
                'A105': { density: 7850, standard: 'ASME B16.11 / ASTM A105', group: 'carbon' },
                'A350 LF2': { density: 7850, standard: 'ASME B16.11 / ASTM A350 LF2', group: 'carbon' },
                'A182 F1': { density: 7850, standard: 'ASME B16.11 / ASTM A182 F1', group: 'alloy' },
                'A182 F5': { density: 7850, standard: 'ASME B16.11 / ASTM A182 F5', group: 'alloy' },
                'A182 F11': { density: 7850, standard: 'ASME B16.11 / ASTM A182 F11', group: 'alloy' },
                'A182 F22': { density: 7850, standard: 'ASME B16.11 / ASTM A182 F22', group: 'alloy' },
                'A182 F91': { density: 7850, standard: 'ASME B16.11 / ASTM A182 F91', group: 'alloy' },
                'A182 F304': { density: 7900, standard: 'ASME B16.11 / ASTM A182 F304', group: 'stainless' },
                'A182 F304L': { density: 7900, standard: 'ASME B16.11 / ASTM A182 F304L', group: 'stainless' },
                'A182 F316': { density: 7980, standard: 'ASME B16.11 / ASTM A182 F316', group: 'stainless' },
                'A182 F316L': { density: 7980, standard: 'ASME B16.11 / ASTM A182 F316L', group: 'stainless' },
                'A182 F321': { density: 7900, standard: 'ASME B16.11 / ASTM A182 F321', group: 'stainless' }
            };
            
            // MSS SP-97 Malzemeleri
            this.mssSp97Materials = {
                'A105': { density: 7850, standard: 'MSS SP-97 / ASTM A105', group: 'carbon' },
                'A350 LF2': { density: 7850, standard: 'MSS SP-97 / ASTM A350 LF2', group: 'carbon' },
                'A182 F11': { density: 7850, standard: 'MSS SP-97 / ASTM A182 F11', group: 'alloy' },
                'A182 F22': { density: 7850, standard: 'MSS SP-97 / ASTM A182 F22', group: 'alloy' },
                'A182 F91': { density: 7850, standard: 'MSS SP-97 / ASTM A182 F91', group: 'alloy' },
                'A182 F304': { density: 7900, standard: 'MSS SP-97 / ASTM A182 F304', group: 'stainless' },
                'A182 F304L': { density: 7900, standard: 'MSS SP-97 / ASTM A182 F304L', group: 'stainless' },
                'A182 F316': { density: 7980, standard: 'MSS SP-97 / ASTM A182 F316', group: 'stainless' },
                'A182 F316L': { density: 7980, standard: 'MSS SP-97 / ASTM A182 F316L', group: 'stainless' },
                'A182 F51': { density: 7800, standard: 'MSS SP-97 / ASTM A182 F51', group: 'duplex' },
                'A182 F53': { density: 7800, standard: 'MSS SP-97 / ASTM A182 F53', group: 'duplex' },
                'A694 F52': { density: 7850, standard: 'MSS SP-97 / ASTM A694 F52', group: 'high_yield' },
                'A694 F60': { density: 7850, standard: 'MSS SP-97 / ASTM A694 F60', group: 'high_yield' },
                'A694 F65': { density: 7850, standard: 'MSS SP-97 / ASTM A694 F65', group: 'high_yield' }
            };
            
            // EN 10253-2 Malzemeleri
            this.en10253Materials = {
                'P235GH': { density: 7850, standard: 'EN 10253-2 / P235GH', group: 'carbon' },
                'P265GH': { density: 7850, standard: 'EN 10253-2 / P265GH', group: 'carbon' },
                '16Mo3': { density: 7850, standard: 'EN 10253-2 / 16Mo3', group: 'carbon' },
                '10CrMo9-10': { density: 7850, standard: 'EN 10253-2 / 10CrMo9-10', group: 'alloy' },
                '13CrMo4-5': { density: 7850, standard: 'EN 10253-2 / 13CrMo4-5', group: 'alloy' },
                'X2CrNi18-9': { density: 7900, standard: 'EN 10253-2 / X2CrNi18-9 (304L)', group: 'stainless' },
                'X5CrNi18-10': { density: 7900, standard: 'EN 10253-2 / X5CrNi18-10 (304)', group: 'stainless' },
                'X2CrNiMo17-12-2': { density: 7980, standard: 'EN 10253-2 / X2CrNiMo17-12-2 (316L)', group: 'stainless' },
                'X5CrNiMo17-12-2': { density: 7980, standard: 'EN 10253-2 / X5CrNiMo17-12-2 (316)', group: 'stainless' },
                'X2CrNiMoN22-5-3': { density: 7800, standard: 'EN 10253-2 / X2CrNiMoN22-5-3', group: 'duplex' }
            };
            
            this.setupEventHandlers();
        }

        setupEventHandlers() {
            const self = this;
            
            window.TeeHandlers = {
                onStandartChange: function() {
                    self.updateMaterialGrades();
                    self.updateConnectionTypes();
                    self.updateScheduleClassSeriesVisibility();
                },
                
                onBaglantiSekliChange: function() {
                    self.updateThreadTypeVisibility();
                    self.updateClassOptions();
                },
                
                onTeeTipiChange: function() {
                    self.updateBranchVisibility();
                },
                
                onNPSHeaderChange: function() {
                    self.updateNPSBranchOptions();
                }
            };
        }

        updateConnectionTypes() {
            const standart = document.getElementById('tee_standart')?.value;
            const baglantiSelect = document.getElementById('tee_baglanti_sekli');
            if (!baglantiSelect) return;
            
            const lang = this.getCurrentLanguage();
            baglantiSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>`;
            
            let options = [];
            
            if (standart === 'asme_b169' || standart === 'en_10253') {
                // Butt-Welding only
                options = [
                    { value: 'butt_weld', text: this.getText('butt_weld') }
                ];
            } else if (standart === 'asme_b1611' || standart === 'mss_sp97') {
                // Socket Weld & Threaded
                options = [
                    { value: 'socket_weld', text: this.getText('socket_weld') },
                    { value: 'threaded', text: this.getText('threaded') }
                ];
            }
            
            options.forEach(opt => {
                const option = document.createElement('option');
                option.value = opt.value;
                option.textContent = opt.text;
                baglantiSelect.appendChild(option);
            });
        }

        updateScheduleClassSeriesVisibility() {
            const standart = document.getElementById('tee_standart')?.value;
            const scheduleGroup = document.getElementById('schedule_group');
            const classGroup = document.getElementById('class_group');
            const seriesGroup = document.getElementById('series_group');
            const typeGroup = document.getElementById('type_group');
            const threadGroup = document.getElementById('thread_type_group');
            
            if (!scheduleGroup || !classGroup || !seriesGroup || !typeGroup) return;
            
            // Reset
            scheduleGroup.style.display = 'none';
            classGroup.style.display = 'none';
            seriesGroup.style.display = 'none';
            typeGroup.style.display = 'none';
            threadGroup.style.display = 'none';
            
            if (standart === 'asme_b169') {
                scheduleGroup.style.display = 'block';
                this.updateScheduleOptions();
            } else if (standart === 'asme_b1611' || standart === 'mss_sp97') {
                classGroup.style.display = 'block';
                this.updateClassOptions();
            } else if (standart === 'en_10253') {
                seriesGroup.style.display = 'block';
                typeGroup.style.display = 'block';
            }
        }

        updateScheduleOptions() {
            const scheduleSelect = document.getElementById('tee_schedule');
            if (!scheduleSelect) return;
            
            const lang = this.getCurrentLanguage();
            scheduleSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Schedule seçin...' : 'Select schedule...'}</option>`;
            
            const schedules = ['std', 'xs', 'xxs', '10', '40', '80', '160'];
            
            schedules.forEach(sch => {
                const option = document.createElement('option');
                option.value = `sch_${sch}`;
                option.textContent = this.getText(`sch_${sch}`);
                scheduleSelect.appendChild(option);
            });
        }

        updateClassOptions() {
            const classSelect = document.getElementById('tee_class');
            if (!classSelect) return;
            
            const lang = this.getCurrentLanguage();
            classSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Class seçin...' : 'Select class...'}</option>`;
            
            const classes = ['2000', '3000', '6000', '9000'];
            
            classes.forEach(cls => {
                const option = document.createElement('option');
                option.value = cls;
                option.textContent = this.getText(`class_${cls}`);
                classSelect.appendChild(option);
            });
        }

        updateThreadTypeVisibility() {
            const baglantiSekli = document.getElementById('tee_baglanti_sekli')?.value;
            const threadTypeGroup = document.getElementById('thread_type_group');
            
            if (!threadTypeGroup) return;
            
            if (baglantiSekli === 'threaded') {
                threadTypeGroup.style.display = 'block';
            } else {
                threadTypeGroup.style.display = 'none';
                const threadTypeSelect = document.getElementById('tee_thread_type');
                if (threadTypeSelect) threadTypeSelect.value = '';
            }
        }

        updateBranchVisibility() {
            const teeTipi = document.getElementById('tee_tipi')?.value;
            const branchGroup = document.getElementById('branch_group');
            
            if (!branchGroup) return;
            
            if (teeTipi === 'reducing_tee') {
                branchGroup.style.display = 'block';
            } else {
                branchGroup.style.display = 'none';
                const branchSelect = document.getElementById('tee_nps_branch');
                if (branchSelect) branchSelect.value = '';
            }
        }

        updateNPSBranchOptions() {
            const npsHeader = document.getElementById('tee_nps_header')?.value;
            const npsBranchSelect = document.getElementById('tee_nps_branch');
            if (!npsBranchSelect || !npsHeader) return;
            
            const lang = this.getCurrentLanguage();
            npsBranchSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Branch NPS seçin...' : 'Select branch NPS...'}</option>`;
            
            const headerOD = this.npsData[npsHeader].od;
            
            Object.keys(this.npsData).forEach(nps => {
                const npsOD = this.npsData[nps].od;
                if (npsOD <= headerOD) {
                    const option = document.createElement('option');
                    option.value = nps;
                    option.textContent = `NPS ${nps}" (Ø${npsOD}mm)`;
                    npsBranchSelect.appendChild(option);
                }
            });
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="tee_standart">${this.getText('standart_label')}</label>
                        <select id="tee_standart" onchange="window.TeeHandlers.onStandartChange()">
                            <option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
                            <option value="asme_b169">${this.getText('asme_b169')}</option>
                            <option value="asme_b1611">${this.getText('asme_b1611')}</option>
                            <option value="mss_sp97">${this.getText('mss_sp97')}</option>
                            <option value="en_10253">${this.getText('en_10253')}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="tee_tipi">${this.getText('tee_tipi_label')}</label>
                        <select id="tee_tipi" onchange="window.TeeHandlers.onTeeTipiChange()">
                            <option value="">${lang === 'tr' ? 'Tip seçin...' : 'Select type...'}</option>
                            <option value="equal_tee">${this.getText('equal_tee')}</option>
                            <option value="reducing_tee">${this.getText('reducing_tee')}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="tee_baglanti_sekli">${this.getText('baglanti_sekli_label')}</label>
                        <select id="tee_baglanti_sekli" onchange="window.TeeHandlers.onBaglantiSekliChange()">
                            <option value="">${lang === 'tr' ? 'Önce standart seçin' : 'Select standard first'}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="tee_nps_header">${this.getText('nps_header_label')}</label>
                        <select id="tee_nps_header" onchange="window.TeeHandlers.onNPSHeaderChange()">
                            <option value="">${lang === 'tr' ? 'NPS seçin...' : 'Select NPS...'}</option>
                            ${Object.keys(this.npsData).map(nps => {
                                const od = this.npsData[nps].od;
                                return `<option value="${nps}">NPS ${nps}" (Ø${od}mm)</option>`;
                            }).join('')}
                        </select>
                    </div>
                </div>
                
                <div class="form-row" id="branch_group" style="display: none;">
                    <div class="form-group full-width">
                        <label for="tee_nps_branch">${this.getText('nps_branch_label')}</label>
                        <select id="tee_nps_branch">
                            <option value="">${lang === 'tr' ? 'Önce header NPS seçin' : 'Select header NPS first'}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row" id="schedule_group" style="display: none;">
                    <div class="form-group full-width">
                        <label for="tee_schedule">${this.getText('schedule_label')}</label>
                        <select id="tee_schedule">
                            <option value="">${lang === 'tr' ? 'Schedule seçin...' : 'Select schedule...'}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row" id="class_group" style="display: none;">
                    <div class="form-group full-width">
                        <label for="tee_class">${this.getText('class_label')}</label>
                        <select id="tee_class">
                            <option value="">${lang === 'tr' ? 'Class seçin...' : 'Select class...'}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row" id="series_group" style="display: none;">
                    <div class="form-group">
                        <label for="tee_series">${this.getText('series_label')}</label>
                        <select id="tee_series">
                            <option value="">${lang === 'tr' ? 'Series seçin...' : 'Select series...'}</option>
                            <option value="series_1">${this.getText('series_1')}</option>
                            <option value="series_2">${this.getText('series_2')}</option>
                            <option value="series_3">${this.getText('series_3')}</option>
                        </select>
                    </div>
                    <div class="form-group" id="type_group" style="display: none;">
                        <label for="tee_type">${this.getText('type_label')}</label>
                        <select id="tee_type">
                            <option value="">${lang === 'tr' ? 'Type seçin...' : 'Select type...'}</option>
                            <option value="type_a">${this.getText('type_a')}</option>
                            <option value="type_b">${this.getText('type_b')}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row" id="thread_type_group" style="display: none;">
                    <div class="form-group full-width">
                        <label for="tee_thread_type">${this.getText('thread_type_label')}</label>
                        <select id="tee_thread_type">
                            <option value="">${lang === 'tr' ? 'Diş tipi seçin...' : 'Select thread type...'}</option>
                            <option value="npt">${this.getText('npt')}</option>
                            <option value="bsp">${this.getText('bsp')}</option>
                            <option value="bspt">${this.getText('bspt')}</option>
                        </select>
                    </div>
                </div>
            `;
        }

        getGrades() {
            const standart = document.getElementById('tee_standart')?.value;
            
            if (standart === 'asme_b169') {
                return this.getGroupedGrades(this.asmeB169Materials);
            } else if (standart === 'asme_b1611') {
                return this.getGroupedGrades(this.asmeB1611Materials);
            } else if (standart === 'mss_sp97') {
                return this.getGroupedGrades(this.mssSp97Materials);
            } else if (standart === 'en_10253') {
                return this.getGroupedGrades(this.en10253Materials);
            }
            
            return [];
        }

        getGroupedGrades(materials) {
            const organizedGrades = [];
            
            const groups = {
                'carbon': this.getText('group_carbon'),
                'alloy': this.getText('group_alloy'),
                'stainless': this.getText('group_stainless'),
                'duplex': this.getText('group_duplex'),
                'high_yield': this.getText('group_high_yield')
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
            const materialSets = {
                'asme_b169': this.asmeB169Materials,
                'asme_b1611': this.asmeB1611Materials,
                'mss_sp97': this.mssSp97Materials,
                'en_10253': this.en10253Materials
            };
            
            const materials = materialSets[standart];
            if (materials && materials[grade]) {
                return materials[grade].density;
            }
            return 7850;
        }

        getStandard(grade, standart) {
            if (standart === 'asme_b169') {
                return 'ASME B16.9';
            } else if (standart === 'asme_b1611') {
                return 'ASME B16.11';
            } else if (standart === 'mss_sp97') {
                return 'MSS SP-97';
            } else if (standart === 'en_10253') {
                return 'EN 10253-2';
            }
            return '-';
        }

        calculate(formData) {
            const standart = formData.tee_standart;
            const teeTipi = formData.tee_tipi;
            const npsHeader = formData.tee_nps_header;
            const npsBranch = formData.tee_nps_branch;
            const malzemeCinsi = formData.malzemeCinsi;
            const adet = parseFloat(formData.adet) || 1;
            
            if (!standart || !teeTipi || !npsHeader || !malzemeCinsi) {
                return null;
            }
            
            const density = this.getDensity(malzemeCinsi, standart);
            const headerData = this.npsData[npsHeader];
            let branchData = headerData;
            
            if (teeTipi === 'reducing_tee' && npsBranch) {
                branchData = this.npsData[npsBranch];
            }
            
            let thickness;
            
            if (standart === 'asme_b169') {
                const schedule = formData.tee_schedule;
                if (!schedule) return null;
                const schedKey = schedule.replace('sch_', '');
                thickness = headerData[`sch_${schedKey}`] || headerData.sch_std;
            } else if (standart === 'asme_b1611' || standart === 'mss_sp97') {
                const classRating = formData.tee_class;
                if (!classRating) return null;
                thickness = headerData.sch_xxs * (parseInt(classRating) / 6000);
            } else if (standart === 'en_10253') {
                const series = formData.tee_series;
                if (!series) return null;
                const factors = { 'series_1': 1.0, 'series_2': 1.4, 'series_3': 1.8 };
                thickness = headerData.sch_std * factors[series];
            }
            
            // Tee hacim hesaplama - yaklaşık formül
            const volume = this.calculateTeeVolume(
                headerData.od, branchData.od, thickness, teeTipi
            );
            
            const volumeM3 = volume / 1000000000;
            const birimAgirlik = volumeM3 * density;
            const toplamAgirlik = birimAgirlik * adet;
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                suHacmi: null
            };
        }

        calculateTeeVolume(headerOD, branchOD, thickness, type) {
            // Tee yaklaşık hacmi
            // Ana hat uzunluğu + branch uzunluğu - kesişim
            
            const headerLength = headerOD * 2;
            const branchLength = branchOD * 1.5;
            
            const headerRadius = headerOD / 2;
            const branchRadius = branchOD / 2;
            
            const headerInnerRadius = headerRadius - thickness;
            const branchInnerRadius = branchRadius - thickness;
            
            // Header volume
            const headerVolume = Math.PI * (
                headerRadius * headerRadius - headerInnerRadius * headerInnerRadius
            ) * headerLength;
            
            // Branch volume
            const branchVolume = Math.PI * (
                branchRadius * branchRadius - branchInnerRadius * branchInnerRadius
            ) * branchLength;
            
            // Kesişim düzeltmesi
            const intersection = Math.min(headerVolume, branchVolume) * 0.3;
            
            return headerVolume + branchVolume - intersection;
        }

        validate(formData) {
            const standart = formData.tee_standart;
            const teeTipi = formData.tee_tipi;
            const baglantiSekli = formData.tee_baglanti_sekli;
            const npsHeader = formData.tee_nps_header;
            const npsBranch = formData.tee_nps_branch;
            
            if (!standart || !teeTipi || !baglantiSekli || !npsHeader) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            if (teeTipi === 'reducing_tee') {
                if (!npsBranch) {
                    return {
                        isValid: false,
                        message: this.getText('validation_error')
                    };
                }
                
                const headerOD = this.npsData[npsHeader].od;
                const branchOD = this.npsData[npsBranch].od;
                
                if (branchOD > headerOD) {
                    return {
                        isValid: false,
                        message: this.getText('validation_branch_bigger')
                    };
                }
            }
            
            if (standart === 'asme_b169' && !formData.tee_schedule) {
                return { isValid: false, message: this.getText('validation_error') };
            }
            
            if ((standart === 'asme_b1611' || standart === 'mss_sp97') && !formData.tee_class) {
                return { isValid: false, message: this.getText('validation_error') };
            }
            
            if (standart === 'en_10253' && (!formData.tee_series || !formData.tee_type)) {
                return { isValid: false, message: this.getText('validation_error') };
            }
            
            if (baglantiSekli === 'threaded' && !formData.tee_thread_type) {
                return { isValid: false, message: this.getText('validation_thread_error') };
            }
            
            return { isValid: true };
        }

        formatDimensions(formData) {
            const teeTipi = formData.tee_tipi;
            const standart = formData.tee_standart;
            const npsHeader = formData.tee_nps_header;
            const npsBranch = formData.tee_nps_branch;
            const baglantiSekli = formData.tee_baglanti_sekli;
            
            if (!npsHeader) return '-';
            
            let dimStr = '';
            
            if (teeTipi === 'reducing_tee' && npsBranch) {
                dimStr = `${npsHeader}"x${npsBranch}"`;
            } else {
                dimStr = `${npsHeader}"`;
            }
            
            // Bağlantı şekli kısaltması
            if (baglantiSekli === 'socket_weld') {
                dimStr += ', SW';
            } else if (baglantiSekli === 'threaded') {
                const threadType = formData.tee_thread_type;
                dimStr += `, ${threadType ? threadType.toUpperCase() : 'THD'}`;
            } else if (baglantiSekli === 'butt_weld') {
                dimStr += ', BW';
            }
            
            // Schedule/Class/Series ekle
            if (standart === 'asme_b169' && formData.tee_schedule) {
                dimStr += `, ${this.getText(formData.tee_schedule)}`;
            } else if ((standart === 'asme_b1611' || standart === 'mss_sp97') && formData.tee_class) {
                dimStr += `, Class ${formData.tee_class}`;
            } else if (standart === 'en_10253' && formData.tee_series) {
                // Parantez içindeki açıklamayı çıkar
                const seriesText = this.getText(formData.tee_series).split(' (')[0];
                dimStr += `, ${seriesText}`;
                // EN 10253-2 için Type bilgisini ekle ve parantez içini çıkar
                if (formData.tee_type) {
                    const typeText = this.getText(formData.tee_type).split(' (')[0];
                    dimStr += `, ${typeText}`;
                }
            }
            
            return dimStr;
        }

        hasWaterVolume() {
            return false;
        }

        getDisplayName() {
            return this.getText('display_name');
        }

        getDisplayTypeFromRow(rowData) {
            const metadata = rowData.metadata?.tee;
            if (!metadata) {
                return this.getDisplayName();
            }
            
            let displayKey = '';
            
            if (metadata.tee_tipi === 'equal_tee') {
                displayKey = 'equal_tee_display';
            } else if (metadata.tee_tipi === 'reducing_tee') {
                displayKey = 'reducing_tee_display';
            }
            
            return displayKey ? this.getText(displayKey) : this.getDisplayName();
        }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            const standart = formData.tee_standart;
            const teeTipi = formData.tee_tipi;
            
            if (teeTipi === 'equal_tee') {
                baseRow.malzemeTuru = this.getText('equal_tee_display');
            } else if (teeTipi === 'reducing_tee') {
                baseRow.malzemeTuru = this.getText('reducing_tee_display');
            }
            
            // ASME B16.9, ASME B16.11 veya MSS SP-97 standartında tabloya ASTM öneki ekle
            if (standart === 'asme_b169' || standart === 'asme_b1611' || standart === 'mss_sp97') {
                baseRow.malzemeCinsi = `ASTM ${formData.malzemeCinsi}`;
            }
            
            baseRow.enNormu = this.getStandard(formData.malzemeCinsi, standart);
            
            baseRow.metadata = {
                ...baseRow.metadata,
                tee: {
                    standart: formData.tee_standart,
                    tee_tipi: formData.tee_tipi,
                    baglanti_sekli: formData.tee_baglanti_sekli,
                    nps_header: formData.tee_nps_header,
                    nps_branch: formData.tee_nps_branch,
                    schedule: formData.tee_schedule,
                    class: formData.tee_class,
                    series: formData.tee_series,
                    type: formData.tee_type,
                    thread_type: formData.tee_thread_type
                }
            };
            
            return baseRow;
        }

        fillFormFromRow(rowData) {
            super.fillFormFromRow(rowData);
            
            const metadata = rowData.metadata?.tee;
            if (!metadata) {
                if (rowData.formData) {
                    this.fillFromFormData(rowData.formData);
                }
                return true;
            }
            
            setTimeout(() => {
                if (metadata.standart) {
                    document.getElementById('tee_standart').value = metadata.standart;
                    window.TeeHandlers.onStandartChange();
                }
                
                setTimeout(() => {
                    if (metadata.tee_tipi) {
                        document.getElementById('tee_tipi').value = metadata.tee_tipi;
                        window.TeeHandlers.onTeeTipiChange();
                    }
                    if (metadata.baglanti_sekli) {
                        document.getElementById('tee_baglanti_sekli').value = metadata.baglanti_sekli;
                        window.TeeHandlers.onBaglantiSekliChange();
                    }
                    if (metadata.nps_header) {
                        document.getElementById('tee_nps_header').value = metadata.nps_header;
                        window.TeeHandlers.onNPSHeaderChange();
                    }
                    
                    setTimeout(() => {
                        if (metadata.nps_branch) {
                            document.getElementById('tee_nps_branch').value = metadata.nps_branch;
                        }
                        if (metadata.schedule) {
                            document.getElementById('tee_schedule').value = metadata.schedule;
                        }
                        if (metadata.class) {
                            document.getElementById('tee_class').value = metadata.class;
                        }
                        if (metadata.series) {
                            document.getElementById('tee_series').value = metadata.series;
                        }
                        if (metadata.type) {
                            document.getElementById('tee_type').value = metadata.type;
                        }
                        if (metadata.thread_type) {
                            document.getElementById('tee_thread_type').value = metadata.thread_type;
                        }
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
                        
                        if (key === 'tee_standart') {
                            window.TeeHandlers.onStandartChange();
                        } else if (key === 'tee_tipi') {
                            window.TeeHandlers.onTeeTipiChange();
                        } else if (key === 'tee_baglanti_sekli') {
                            window.TeeHandlers.onBaglantiSekliChange();
                        } else if (key === 'tee_nps_header') {
                            window.TeeHandlers.onNPSHeaderChange();
                        }
                    }
                });
            }, 100);
        }
    }

    const teeMaterial = new TeeMaterial();
    teeMaterial.register();
    
    console.log('Tee Bağlantı modülü v1.0.0 yüklendi');

})(window);