/**
 * REDÜKSİYON (REDUCER) Malzeme Modülü
 * Versiyon: 1.0.0
 * ASME B16.9 ve EN 10253-2 standartları ile reducer hesaplama modülü
 * 
 * Özellikler:
 * - Concentric Reducer (Eş Merkezli Redüksiyon)
 * - Eccentric Reducer (Eksantrik Redüksiyon)
 * - ASME B16.9: Schedule STD, XS, XXS
 * - EN 10253-2: Series 1, 2, 3 (Type A ve B)
 * - NPS 1/2" - 48" boyut aralığı
 * - Kapsamlı malzeme desteği
 * - Tam dil desteği
 */

(function(window) {
    'use strict';
    
    class ReducerMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'reducer';
            this.version = '1.0.0';
            
            this.texts = {
                tr: {
                    display_name: 'Redüksiyon',
                    
                    // Etiketler
                    standart_label: 'Standart',
                    reducer_tipi_label: 'Redüksiyon Tipi',
                    nps1_label: 'NPS Boyutu (Büyük Uç)',
                    nps2_label: 'NPS Boyutu (Küçük Uç)',
                    schedule_label: 'Schedule / Kalınlık',
                    series_label: 'Series',
                    type_label: 'Type (Tip)',
                    
                    // Standartlar
                    asme_b169: 'ASME B16.9 (Butt-Welding Fittings)',
                    en_10253: 'EN 10253-2 (Butt-Welding Fittings)',
                    
                    // Reducer Tipleri
                    concentric: 'Concentric Reducer (Eş Merkezli)',
                    eccentric: 'Eccentric Reducer (Eksantrik)',
                    
                    // Tabloda gösterilecek
                    concentric_display: 'Eş Merkezli Redüksiyon',
                    eccentric_display: 'Eksantrik Redüksiyon',
                    
                    // Schedule
                    sch_std: 'Schedule STD',
                    sch_xs: 'Schedule XS',
                    sch_xxs: 'Schedule XXS',
                    sch_10: 'Schedule 10',
                    sch_20: 'Schedule 20',
                    sch_30: 'Schedule 30',
                    sch_40: 'Schedule 40',
                    sch_60: 'Schedule 60',
                    sch_80: 'Schedule 80',
                    sch_100: 'Schedule 100',
                    sch_120: 'Schedule 120',
                    sch_140: 'Schedule 140',
                    sch_160: 'Schedule 160',
                    
                    // EN Series
                    series_1: 'Series 1 (İnce)',
                    series_2: 'Series 2 (Orta)',
                    series_3: 'Series 3 (Kalın)',
                    
                    // EN Type
                    type_a: 'Type A (Wrought - Dövme)',
                    type_b: 'Type B (Welded - Kaynaklı)',
                    
                    // Malzeme Grupları
                    group_carbon: 'Karbon Çelikler',
                    group_alloy: 'Alaşımlı Çelikler',
                    group_stainless: 'Paslanmaz Çelikler',
                    group_duplex: 'Duplex Çelikler',
                    
                    // Validasyon
                    validation_error: 'Lütfen tüm alanları doldurun',
                    validation_nps2_bigger: 'Küçük uç boyutu, büyük uç boyutundan küçük olmalıdır'
                },
                en: {
                    display_name: 'Reducer',
                    
                    // Labels
                    standart_label: 'Standard',
                    reducer_tipi_label: 'Reducer Type',
                    nps1_label: 'NPS Size (Large End)',
                    nps2_label: 'NPS Size (Small End)',
                    schedule_label: 'Schedule / Thickness',
                    series_label: 'Series',
                    type_label: 'Type',
                    
                    // Standards
                    asme_b169: 'ASME B16.9 (Butt-Welding Fittings)',
                    en_10253: 'EN 10253-2 (Butt-Welding Fittings)',
                    
                    // Reducer Types
                    concentric: 'Concentric Reducer',
                    eccentric: 'Eccentric Reducer',
                    
                    // Display names
                    concentric_display: 'Concentric Reducer',
                    eccentric_display: 'Eccentric Reducer',
                    
                    // Schedule
                    sch_std: 'Schedule STD',
                    sch_xs: 'Schedule XS',
                    sch_xxs: 'Schedule XXS',
                    sch_10: 'Schedule 10',
                    sch_20: 'Schedule 20',
                    sch_30: 'Schedule 30',
                    sch_40: 'Schedule 40',
                    sch_60: 'Schedule 60',
                    sch_80: 'Schedule 80',
                    sch_100: 'Schedule 100',
                    sch_120: 'Schedule 120',
                    sch_140: 'Schedule 140',
                    sch_160: 'Schedule 160',
                    
                    // EN Series
                    series_1: 'Series 1 (Light)',
                    series_2: 'Series 2 (Medium)',
                    series_3: 'Series 3 (Heavy)',
                    
                    // EN Type
                    type_a: 'Type A (Wrought)',
                    type_b: 'Type B (Welded)',
                    
                    // Material Groups
                    group_carbon: 'Carbon Steels',
                    group_alloy: 'Alloy Steels',
                    group_stainless: 'Stainless Steels',
                    group_duplex: 'Duplex Steels',
                    
                    // Validation
                    validation_error: 'Please fill all fields',
                    validation_nps2_bigger: 'Small end size must be smaller than large end size'
                }
            };
            
            // NPS boyutları ve çaplar (mm) - ASME B36.10M
            this.npsData = {
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
                '42': { od: 1067.0, sch_std: 9.53, sch_xs: 31.75, sch_xxs: 82.55 },
                '48': { od: 1219.0, sch_std: 9.53, sch_xs: 34.93, sch_xxs: 92.08 }
            };
            
            // EN 10253-2 Series kalınlıkları (yaklaşık)
            this.enSeriesFactors = {
                'series_1': 1.0,
                'series_2': 1.4,
                'series_3': 1.8
            };
            
            // ASME B16.9 Malzemeleri
            this.asmeB169Materials = {
                // Carbon Steels
                'A234 WPB': { density: 7850, standard: 'ASME B16.9 / ASTM A234 WPB', group: 'carbon' },
                'A234 WPC': { density: 7850, standard: 'ASME B16.9 / ASTM A234 WPC', group: 'carbon' },
                'A420 WPL6': { density: 7850, standard: 'ASME B16.9 / ASTM A420 WPL6', group: 'carbon' },
                
                // Alloy Steels
                'A234 WP1': { density: 7850, standard: 'ASME B16.9 / ASTM A234 WP1', group: 'alloy' },
                'A234 WP5': { density: 7850, standard: 'ASME B16.9 / ASTM A234 WP5', group: 'alloy' },
                'A234 WP9': { density: 7850, standard: 'ASME B16.9 / ASTM A234 WP9', group: 'alloy' },
                'A234 WP11': { density: 7850, standard: 'ASME B16.9 / ASTM A234 WP11', group: 'alloy' },
                'A234 WP22': { density: 7850, standard: 'ASME B16.9 / ASTM A234 WP22', group: 'alloy' },
                'A234 WP91': { density: 7850, standard: 'ASME B16.9 / ASTM A234 WP91', group: 'alloy' },
                
                // Stainless Steels
                'A403 WP304': { density: 7900, standard: 'ASME B16.9 / ASTM A403 WP304', group: 'stainless' },
                'A403 WP304L': { density: 7900, standard: 'ASME B16.9 / ASTM A403 WP304L', group: 'stainless' },
                'A403 WP316': { density: 7980, standard: 'ASME B16.9 / ASTM A403 WP316', group: 'stainless' },
                'A403 WP316L': { density: 7980, standard: 'ASME B16.9 / ASTM A403 WP316L', group: 'stainless' },
                'A403 WP321': { density: 7900, standard: 'ASME B16.9 / ASTM A403 WP321', group: 'stainless' },
                'A403 WP347': { density: 7900, standard: 'ASME B16.9 / ASTM A403 WP347', group: 'stainless' },
                
                // Duplex
                'A815 S31803': { density: 7800, standard: 'ASME B16.9 / ASTM A815 S31803', group: 'duplex' },
                'A815 S32750': { density: 7800, standard: 'ASME B16.9 / ASTM A815 S32750', group: 'duplex' },
                'A815 S32205': { density: 7800, standard: 'ASME B16.9 / ASTM A815 S32205', group: 'duplex' }
            };
            
            // EN 10253-2 Malzemeleri
            this.en10253Materials = {
                // Carbon Steels
                'P235GH': { density: 7850, standard: 'EN 10253-2 / P235GH', group: 'carbon' },
                'P265GH': { density: 7850, standard: 'EN 10253-2 / P265GH', group: 'carbon' },
                '16Mo3': { density: 7850, standard: 'EN 10253-2 / 16Mo3', group: 'carbon' },
                
                // Alloy Steels
                '10CrMo9-10': { density: 7850, standard: 'EN 10253-2 / 10CrMo9-10', group: 'alloy' },
                '13CrMo4-5': { density: 7850, standard: 'EN 10253-2 / 13CrMo4-5', group: 'alloy' },
                'X10CrMoVNb9-1': { density: 7850, standard: 'EN 10253-2 / X10CrMoVNb9-1', group: 'alloy' },
                
                // Stainless Steels
                'X2CrNi18-9': { density: 7900, standard: 'EN 10253-2 / X2CrNi18-9 (304L)', group: 'stainless' },
                'X5CrNi18-10': { density: 7900, standard: 'EN 10253-2 / X5CrNi18-10 (304)', group: 'stainless' },
                'X2CrNiMo17-12-2': { density: 7980, standard: 'EN 10253-2 / X2CrNiMo17-12-2 (316L)', group: 'stainless' },
                'X5CrNiMo17-12-2': { density: 7980, standard: 'EN 10253-2 / X5CrNiMo17-12-2 (316)', group: 'stainless' },
                'X6CrNiTi18-10': { density: 7900, standard: 'EN 10253-2 / X6CrNiTi18-10 (321)', group: 'stainless' },
                
                // Duplex
                'X2CrNiMoN22-5-3': { density: 7800, standard: 'EN 10253-2 / X2CrNiMoN22-5-3 (Duplex)', group: 'duplex' }
            };
            
            this.setupEventHandlers();
        }

        setupEventHandlers() {
            const self = this;
            
            window.ReducerHandlers = {
                onStandartChange: function() {
                    self.updateMaterialGrades();
                    self.updateScheduleOptions();
                    self.updateTypeSeriesVisibility();
                },
                
                onNPS1Change: function() {
                    self.updateNPS2Options();
                }
            };
        }

        updateTypeSeriesVisibility() {
            const standart = document.getElementById('reducer_standart')?.value;
            const scheduleGroup = document.getElementById('schedule_group');
            const seriesGroup = document.getElementById('series_group');
            const typeGroup = document.getElementById('type_group');
            
            if (!scheduleGroup || !seriesGroup || !typeGroup) return;
            
            if (standart === 'asme_b169') {
                scheduleGroup.style.display = 'block';
                seriesGroup.style.display = 'none';
                typeGroup.style.display = 'none';
            } else if (standart === 'en_10253') {
                scheduleGroup.style.display = 'none';
                seriesGroup.style.display = 'block';
                typeGroup.style.display = 'block';
            } else {
                scheduleGroup.style.display = 'none';
                seriesGroup.style.display = 'none';
                typeGroup.style.display = 'none';
            }
        }

        updateScheduleOptions() {
            const scheduleSelect = document.getElementById('reducer_schedule');
            if (!scheduleSelect) return;
            
            const lang = this.getCurrentLanguage();
            scheduleSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Schedule seçin...' : 'Select schedule...'}</option>`;
            
            const schedules = ['std', 'xs', 'xxs', '10', '20', '30', '40', '60', '80', '100', '120', '140', '160'];
            
            schedules.forEach(sch => {
                const option = document.createElement('option');
                option.value = `sch_${sch}`;
                option.textContent = this.getText(`sch_${sch}`);
                scheduleSelect.appendChild(option);
            });
        }

        updateNPS2Options() {
            const nps1 = document.getElementById('reducer_nps1')?.value;
            const nps2Select = document.getElementById('reducer_nps2');
            if (!nps2Select || !nps1) return;
            
            const lang = this.getCurrentLanguage();
            nps2Select.innerHTML = `<option value="">${lang === 'tr' ? 'NPS2 seçin...' : 'Select NPS2...'}</option>`;
            
            const nps1OD = this.npsData[nps1].od;
            
            Object.keys(this.npsData).forEach(nps => {
                const npsOD = this.npsData[nps].od;
                if (npsOD < nps1OD) {
                    const option = document.createElement('option');
                    option.value = nps;
                    option.textContent = `NPS ${nps}" (Ø${npsOD}mm)`;
                    nps2Select.appendChild(option);
                }
            });
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="reducer_standart">${this.getText('standart_label')}</label>
                        <select id="reducer_standart" onchange="window.ReducerHandlers.onStandartChange()">
                            <option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
                            <option value="asme_b169">${this.getText('asme_b169')}</option>
                            <option value="en_10253">${this.getText('en_10253')}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="reducer_tipi">${this.getText('reducer_tipi_label')}</label>
                        <select id="reducer_tipi">
                            <option value="">${lang === 'tr' ? 'Tip seçin...' : 'Select type...'}</option>
                            <option value="concentric">${this.getText('concentric')}</option>
                            <option value="eccentric">${this.getText('eccentric')}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="reducer_nps1">${this.getText('nps1_label')}</label>
                        <select id="reducer_nps1" onchange="window.ReducerHandlers.onNPS1Change()">
                            <option value="">${lang === 'tr' ? 'NPS seçin...' : 'Select NPS...'}</option>
                            ${Object.keys(this.npsData).map(nps => {
                                const od = this.npsData[nps].od;
                                return `<option value="${nps}">NPS ${nps}" (Ø${od}mm)</option>`;
                            }).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="reducer_nps2">${this.getText('nps2_label')}</label>
                        <select id="reducer_nps2">
                            <option value="">${lang === 'tr' ? 'Önce NPS1 seçin' : 'Select NPS1 first'}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row" id="schedule_group" style="display: none;">
                    <div class="form-group full-width">
                        <label for="reducer_schedule">${this.getText('schedule_label')}</label>
                        <select id="reducer_schedule">
                            <option value="">${lang === 'tr' ? 'Önce standart seçin' : 'Select standard first'}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row" id="series_group" style="display: none;">
                    <div class="form-group">
                        <label for="reducer_series">${this.getText('series_label')}</label>
                        <select id="reducer_series">
                            <option value="">${lang === 'tr' ? 'Series seçin...' : 'Select series...'}</option>
                            <option value="series_1">${this.getText('series_1')}</option>
                            <option value="series_2">${this.getText('series_2')}</option>
                            <option value="series_3">${this.getText('series_3')}</option>
                        </select>
                    </div>
                    <div class="form-group" id="type_group" style="display: none;">
                        <label for="reducer_type">${this.getText('type_label')}</label>
                        <select id="reducer_type">
                            <option value="">${lang === 'tr' ? 'Type seçin...' : 'Select type...'}</option>
                            <option value="type_a">${this.getText('type_a')}</option>
                            <option value="type_b">${this.getText('type_b')}</option>
                        </select>
                    </div>
                </div>
            `;
        }

        getGrades() {
            const standart = document.getElementById('reducer_standart')?.value;
            
            if (standart === 'asme_b169') {
                return this.getGroupedGrades(this.asmeB169Materials);
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
                'duplex': this.getText('group_duplex')
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
            if (standart === 'asme_b169' && this.asmeB169Materials[grade]) {
                return this.asmeB169Materials[grade].density;
            } else if (standart === 'en_10253' && this.en10253Materials[grade]) {
                return this.en10253Materials[grade].density;
            }
            return 7850;
        }

        getStandard(grade, standart) {
            if (standart === 'asme_b169') {
                return 'ASME B16.9';
            } else if (standart === 'en_10253') {
                return 'EN 10253-2';
            }
            return '-';
        }

        calculate(formData) {
            const standart = formData.reducer_standart;
            const reducerTipi = formData.reducer_tipi;
            const nps1 = formData.reducer_nps1;
            const nps2 = formData.reducer_nps2;
            const malzemeCinsi = formData.malzemeCinsi;
            const adet = parseFloat(formData.adet) || 1;
            
            if (!standart || !reducerTipi || !nps1 || !nps2 || !malzemeCinsi) {
                return null;
            }
            
            const density = this.getDensity(malzemeCinsi, standart);
            const nps1Data = this.npsData[nps1];
            const nps2Data = this.npsData[nps2];
            
            let thickness1, thickness2, length;
            
            if (standart === 'asme_b169') {
                const schedule = formData.reducer_schedule;
                if (!schedule) return null;
                
                const schedKey = schedule.replace('sch_', '');
                thickness1 = nps1Data[`sch_${schedKey}`] || nps1Data.sch_std;
                thickness2 = nps2Data[`sch_${schedKey}`] || nps2Data.sch_std;
                
                // ASME B16.9 uzunluk formülü: H = (D1 - D2) / 2
                length = (nps1Data.od - nps2Data.od) / 2;
                
            } else if (standart === 'en_10253') {
                const series = formData.reducer_series;
                if (!series) return null;
                
                const factor = this.enSeriesFactors[series];
                thickness1 = nps1Data.sch_std * factor;
                thickness2 = nps2Data.sch_std * factor;
                
                // EN 10253-2 uzunluk formülü benzer
                length = (nps1Data.od - nps2Data.od) / 2;
            }
            
            // Konik kesit hacim hesaplama
            const volume = this.calculateReducerVolume(
                nps1Data.od, nps2Data.od,
                thickness1, thickness2,
                length,
                reducerTipi
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

        calculateReducerVolume(od1, od2, t1, t2, length, type) {
            // Konik halkımsı cisim hacmi
            // Dış hacim - İç hacim
            
            const r1_outer = od1 / 2;
            const r2_outer = od2 / 2;
            const r1_inner = (od1 - 2 * t1) / 2;
            const r2_inner = (od2 - 2 * t2) / 2;
            
            // Konik hacim formülü: V = (π/3) * h * (R1² + R1*R2 + R2²)
            const outerVolume = (Math.PI / 3) * length * (
                r1_outer * r1_outer + r1_outer * r2_outer + r2_outer * r2_outer
            );
            
            const innerVolume = (Math.PI / 3) * length * (
                r1_inner * r1_inner + r1_inner * r2_inner + r2_inner * r2_inner
            );
            
            let volume = outerVolume - innerVolume;
            
            // Eccentric için düzeltme faktörü
            if (type === 'eccentric') {
                volume *= 1.05;
            }
            
            return volume;
        }

        validate(formData) {
            const standart = formData.reducer_standart;
            const reducerTipi = formData.reducer_tipi;
            const nps1 = formData.reducer_nps1;
            const nps2 = formData.reducer_nps2;
            
            if (!standart || !reducerTipi || !nps1 || !nps2) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            const nps1OD = this.npsData[nps1].od;
            const nps2OD = this.npsData[nps2].od;
            
            if (nps2OD >= nps1OD) {
                return {
                    isValid: false,
                    message: this.getText('validation_nps2_bigger')
                };
            }
            
            if (standart === 'asme_b169' && !formData.reducer_schedule) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            if (standart === 'en_10253' && (!formData.reducer_series || !formData.reducer_type)) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            return { isValid: true };
        }

        formatDimensions(formData) {
            const standart = formData.reducer_standart;
            const nps1 = formData.reducer_nps1;
            const nps2 = formData.reducer_nps2;
            
            if (!nps1 || !nps2) {
                return '-';
            }
            
            let dimStr = `${nps1}"x${nps2}"`;
            
            if (standart === 'asme_b169') {
                const schedule = formData.reducer_schedule;
                if (schedule) {
                    const schText = this.getText(schedule);
                    dimStr += `, ${schText}`;
                }
            } else if (standart === 'en_10253') {
                const series = formData.reducer_series;
                const type = formData.reducer_type;
                if (series) {
                    // Parantez içindeki açıklamayı çıkar
                    const seriesText = this.getText(series).split(' (')[0];
                    dimStr += `, ${seriesText}`;
                }
                if (type) {
                    // Parantez içindeki açıklamayı çıkar
                    const typeText = this.getText(type).split(' (')[0];
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
            const metadata = rowData.metadata?.reducer;
            if (!metadata) {
                return this.getDisplayName();
            }
            
            let displayKey = '';
            
            if (metadata.reducer_tipi === 'concentric') {
                displayKey = 'concentric_display';
            } else if (metadata.reducer_tipi === 'eccentric') {
                displayKey = 'eccentric_display';
            }
            
            return displayKey ? this.getText(displayKey) : this.getDisplayName();
        }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            const standart = formData.reducer_standart;
            const reducerTipi = formData.reducer_tipi;
            
            if (reducerTipi === 'concentric') {
                baseRow.malzemeTuru = this.getText('concentric_display');
            } else if (reducerTipi === 'eccentric') {
                baseRow.malzemeTuru = this.getText('eccentric_display');
            }
            
            // ASME B16.9 standartında tabloya ASTM öneki ekle
            if (standart === 'asme_b169') {
                baseRow.malzemeCinsi = `ASTM ${formData.malzemeCinsi}`;
            }
            
            baseRow.enNormu = this.getStandard(formData.malzemeCinsi, standart);
            
            baseRow.metadata = {
                ...baseRow.metadata,
                reducer: {
                    standart: formData.reducer_standart,
                    reducer_tipi: formData.reducer_tipi,
                    nps1: formData.reducer_nps1,
                    nps2: formData.reducer_nps2,
                    schedule: formData.reducer_schedule,
                    series: formData.reducer_series,
                    type: formData.reducer_type
                }
            };
            
            return baseRow;
        }

        fillFormFromRow(rowData) {
            super.fillFormFromRow(rowData);
            
            const metadata = rowData.metadata?.reducer;
            if (!metadata) {
                if (rowData.formData) {
                    this.fillFromFormData(rowData.formData);
                }
                return true;
            }
            
            setTimeout(() => {
                if (metadata.standart) {
                    document.getElementById('reducer_standart').value = metadata.standart;
                    window.ReducerHandlers.onStandartChange();
                }
                
                setTimeout(() => {
                    if (metadata.reducer_tipi) {
                        document.getElementById('reducer_tipi').value = metadata.reducer_tipi;
                    }
                    if (metadata.nps1) {
                        document.getElementById('reducer_nps1').value = metadata.nps1;
                        window.ReducerHandlers.onNPS1Change();
                    }
                    
                    setTimeout(() => {
                        if (metadata.nps2) {
                            document.getElementById('reducer_nps2').value = metadata.nps2;
                        }
                        if (metadata.schedule) {
                            document.getElementById('reducer_schedule').value = metadata.schedule;
                        }
                        if (metadata.series) {
                            document.getElementById('reducer_series').value = metadata.series;
                        }
                        if (metadata.type) {
                            document.getElementById('reducer_type').value = metadata.type;
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
                        
                        if (key === 'reducer_standart') {
                            window.ReducerHandlers.onStandartChange();
                        } else if (key === 'reducer_nps1') {
                            window.ReducerHandlers.onNPS1Change();
                        }
                    }
                });
            }, 100);
        }
    }

    const reducerMaterial = new ReducerMaterial();
    reducerMaterial.register();
    
    console.log('Redüksiyon modülü v1.0.0 yüklendi');

})(window);