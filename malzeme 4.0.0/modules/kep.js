/**
 * KEP (CAP) Malzeme Modülü
 * Versiyon: 1.0.0
 * ASME B16.9 ve EN 10253-2 standartları ile cap hesaplama modülü
 * 
 * Özellikler:
 * - Butt-Welding Cap
 * - Schedule STD, XS, XXS
 * - EN Series 1, 2, 3
 * - NPS 1/2" - 48"
 * - Tam dil desteği
 */

(function(window) {
    'use strict';
    
    class CapMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'cap';
            this.version = '1.0.0';
            
            this.texts = {
                tr: {
                    display_name: 'Kep (Cap)',
                    standart_label: 'Standart',
                    nps_label: 'NPS Boyutu',
                    schedule_label: 'Schedule / Kalınlık',
                    series_label: 'Series',
                    type_label: 'Type (Tip)',
                    asme_b169: 'ASME B16.9 (Butt-Welding Cap)',
                    en_10253: 'EN 10253-2 (Butt-Welding Cap)',
                    sch_std: 'Schedule STD',
                    sch_xs: 'Schedule XS',
                    sch_xxs: 'Schedule XXS',
                    series_1: 'Series 1 (İnce)',
                    series_2: 'Series 2 (Orta)',
                    series_3: 'Series 3 (Kalın)',
                    type_a: 'Type A (Wrought - Dövme)',
                    type_b: 'Type B (Welded - Kaynaklı)',
                    group_carbon: 'Karbon Çelikler',
                    group_alloy: 'Alaşımlı Çelikler',
                    group_stainless: 'Paslanmaz Çelikler',
                    group_duplex: 'Duplex Çelikler',
                    validation_error: 'Lütfen tüm alanları doldurun'
                },
                en: {
                    display_name: 'Cap',
                    standart_label: 'Standard',
                    nps_label: 'NPS Size',
                    schedule_label: 'Schedule / Thickness',
                    series_label: 'Series',
                    type_label: 'Type',
                    asme_b169: 'ASME B16.9 (Butt-Welding Cap)',
                    en_10253: 'EN 10253-2 (Butt-Welding Cap)',
                    sch_std: 'Schedule STD',
                    sch_xs: 'Schedule XS',
                    sch_xxs: 'Schedule XXS',
                    series_1: 'Series 1 (Light)',
                    series_2: 'Series 2 (Medium)',
                    series_3: 'Series 3 (Heavy)',
                    type_a: 'Type A (Wrought)',
                    type_b: 'Type B (Welded)',
                    group_carbon: 'Carbon Steels',
                    group_alloy: 'Alloy Steels',
                    group_stainless: 'Stainless Steels',
                    group_duplex: 'Duplex Steels',
                    validation_error: 'Please fill all fields'
                }
            };
            
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
                '6': { od: 168.3, sch_std: 7.11, sch_xs: 10.97, sch_xxs: 18.26 },
                '8': { od: 219.1, sch_std: 8.18, sch_xs: 12.70, sch_xxs: 22.23 },
                '10': { od: 273.0, sch_std: 9.27, sch_xs: 12.70, sch_xxs: 25.40 },
                '12': { od: 323.9, sch_std: 9.53, sch_xs: 14.27, sch_xxs: 28.58 },
                '16': { od: 406.4, sch_std: 9.53, sch_xs: 16.66, sch_xxs: 36.53 },
                '20': { od: 508.0, sch_std: 9.53, sch_xs: 18.26, sch_xxs: 44.45 },
                '24': { od: 610.0, sch_std: 9.53, sch_xs: 21.44, sch_xxs: 52.37 },
                '30': { od: 762.0, sch_std: 9.53, sch_xs: 25.40, sch_xxs: 62.71 },
                '36': { od: 914.0, sch_std: 9.53, sch_xs: 28.58, sch_xxs: 73.03 },
                '48': { od: 1219.0, sch_std: 9.53, sch_xs: 34.93, sch_xxs: 92.08 }
            };
            
            this.asmeB169Materials = {
                'A234 WPB': { density: 7850, standard: 'ASME B16.9 / ASTM A234 WPB', group: 'carbon' },
                'A234 WPC': { density: 7850, standard: 'ASME B16.9 / ASTM A234 WPC', group: 'carbon' },
                'A420 WPL6': { density: 7850, standard: 'ASME B16.9 / ASTM A420 WPL6', group: 'carbon' },
                'A234 WP11': { density: 7850, standard: 'ASME B16.9 / ASTM A234 WP11', group: 'alloy' },
                'A234 WP22': { density: 7850, standard: 'ASME B16.9 / ASTM A234 WP22', group: 'alloy' },
                'A234 WP91': { density: 7850, standard: 'ASME B16.9 / ASTM A234 WP91', group: 'alloy' },
                'A403 WP304': { density: 7900, standard: 'ASME B16.9 / ASTM A403 WP304', group: 'stainless' },
                'A403 WP304L': { density: 7900, standard: 'ASME B16.9 / ASTM A403 WP304L', group: 'stainless' },
                'A403 WP316': { density: 7980, standard: 'ASME B16.9 / ASTM A403 WP316', group: 'stainless' },
                'A403 WP316L': { density: 7980, standard: 'ASME B16.9 / ASTM A403 WP316L', group: 'stainless' },
                'A815 S31803': { density: 7800, standard: 'ASME B16.9 / ASTM A815 S31803', group: 'duplex' },
                'A815 S32750': { density: 7800, standard: 'ASME B16.9 / ASTM A815 S32750', group: 'duplex' }
            };
            
            this.en10253Materials = {
                'P235GH': { density: 7850, standard: 'EN 10253-2 / P235GH', group: 'carbon' },
                'P265GH': { density: 7850, standard: 'EN 10253-2 / P265GH', group: 'carbon' },
                '16Mo3': { density: 7850, standard: 'EN 10253-2 / 16Mo3', group: 'carbon' },
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
            window.CapHandlers = {
                onStandartChange: function() {
                    self.updateMaterialGrades();
                    self.updateScheduleSeriesVisibility();
                }
            };
        }

        updateScheduleSeriesVisibility() {
            const standart = document.getElementById('cap_standart')?.value;
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

        createUI() {
            const lang = this.getCurrentLanguage();
            
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="cap_standart">${this.getText('standart_label')}</label>
                        <select id="cap_standart" onchange="window.CapHandlers.onStandartChange()">
                            <option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
                            <option value="asme_b169">${this.getText('asme_b169')}</option>
                            <option value="en_10253">${this.getText('en_10253')}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="cap_nps">${this.getText('nps_label')}</label>
                        <select id="cap_nps">
                            <option value="">${lang === 'tr' ? 'NPS seçin...' : 'Select NPS...'}</option>
                            ${Object.keys(this.npsData).map(nps => {
                                const od = this.npsData[nps].od;
                                return `<option value="${nps}">NPS ${nps}" (Ø${od}mm)</option>`;
                            }).join('')}
                        </select>
                    </div>
                </div>
                
                <div class="form-row" id="schedule_group" style="display: none;">
                    <div class="form-group full-width">
                        <label for="cap_schedule">${this.getText('schedule_label')}</label>
                        <select id="cap_schedule">
                            <option value="">${lang === 'tr' ? 'Schedule seçin...' : 'Select schedule...'}</option>
                            <option value="sch_std">${this.getText('sch_std')}</option>
                            <option value="sch_xs">${this.getText('sch_xs')}</option>
                            <option value="sch_xxs">${this.getText('sch_xxs')}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row" id="series_group" style="display: none;">
                    <div class="form-group">
                        <label for="cap_series">${this.getText('series_label')}</label>
                        <select id="cap_series">
                            <option value="">${lang === 'tr' ? 'Series seçin...' : 'Select series...'}</option>
                            <option value="series_1">${this.getText('series_1')}</option>
                            <option value="series_2">${this.getText('series_2')}</option>
                            <option value="series_3">${this.getText('series_3')}</option>
                        </select>
                    </div>
                    <div class="form-group" id="type_group" style="display: none;">
                        <label for="cap_type">${this.getText('type_label')}</label>
                        <select id="cap_type">
                            <option value="">${lang === 'tr' ? 'Type seçin...' : 'Select type...'}</option>
                            <option value="type_a">${this.getText('type_a')}</option>
                            <option value="type_b">${this.getText('type_b')}</option>
                        </select>
                    </div>
                </div>
            `;
        }

        getGrades() {
            const standart = document.getElementById('cap_standart')?.value;
            
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
                    organizedGrades.push({ value: '', text: `--- ${groupName} ---`, disabled: true });
                    groupMaterials.forEach(material => {
                        organizedGrades.push({ value: material, text: material, disabled: false });
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
            const materials = standart === 'asme_b169' ? this.asmeB169Materials : this.en10253Materials;
            return materials[grade]?.density || 7850;
        }

        getStandard(grade, standart) {
            const materials = standart === 'asme_b169' ? this.asmeB169Materials : this.en10253Materials;
            return materials[grade]?.standard || '-';
        }

        calculate(formData) {
            const standart = formData.cap_standart;
            const nps = formData.cap_nps;
            const malzemeCinsi = formData.malzemeCinsi;
            const adet = parseFloat(formData.adet) || 1;
            
            if (!standart || !nps || !malzemeCinsi) return null;
            
            const density = this.getDensity(malzemeCinsi, standart);
            const npsData = this.npsData[nps];
            
            let thickness;
            if (standart === 'asme_b169') {
                const schedule = formData.cap_schedule;
                if (!schedule) return null;
                const schedKey = schedule.replace('sch_', '');
                thickness = npsData[`sch_${schedKey}`] || npsData.sch_std;
            } else {
                const series = formData.cap_series;
                if (!series) return null;
                const factors = { 'series_1': 1.0, 'series_2': 1.4, 'series_3': 1.8 };
                thickness = npsData.sch_std * factors[series];
            }
            
            // Hemisferik kep hacmi (yaklaşık)
            const outerRadius = npsData.od / 2;
            const innerRadius = outerRadius - thickness;
            const volume = (2/3) * Math.PI * (
                outerRadius * outerRadius * outerRadius - 
                innerRadius * innerRadius * innerRadius
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

        validate(formData) {
            if (!formData.cap_standart || !formData.cap_nps) {
                return { isValid: false, message: this.getText('validation_error') };
            }
            if (formData.cap_standart === 'asme_b169' && !formData.cap_schedule) {
                return { isValid: false, message: this.getText('validation_error') };
            }
            if (formData.cap_standart === 'en_10253' && (!formData.cap_series || !formData.cap_type)) {
                return { isValid: false, message: this.getText('validation_error') };
            }
            return { isValid: true };
        }

        formatDimensions(formData) {
            const nps = formData.cap_nps;
            if (!nps) return '-';
            
            let dimStr = `${nps}"`;
            const standart = formData.cap_standart;
            
            if (standart === 'asme_b169' && formData.cap_schedule) {
                dimStr += `, ${this.getText(formData.cap_schedule)}`;
            } else if (standart === 'en_10253' && formData.cap_series) {
                dimStr += `, ${this.getText(formData.cap_series)}`;
            }
            
            return dimStr;
        }

        hasWaterVolume() { return false; }
        getDisplayName() { return this.getText('display_name'); }
        getDisplayTypeFromRow(rowData) { return this.getDisplayName(); }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            baseRow.enNormu = this.getStandard(formData.malzemeCinsi, formData.cap_standart);
            baseRow.metadata = {
                ...baseRow.metadata,
                cap: {
                    standart: formData.cap_standart,
                    nps: formData.cap_nps,
                    schedule: formData.cap_schedule,
                    series: formData.cap_series,
                    type: formData.cap_type
                }
            };
            return baseRow;
        }

        fillFormFromRow(rowData) {
            super.fillFormFromRow(rowData);
            const metadata = rowData.metadata?.cap;
            if (!metadata) {
                if (rowData.formData) this.fillFromFormData(rowData.formData);
                return true;
            }
            
            setTimeout(() => {
                if (metadata.standart) {
                    document.getElementById('cap_standart').value = metadata.standart;
                    window.CapHandlers.onStandartChange();
                }
                setTimeout(() => {
                    if (metadata.nps) document.getElementById('cap_nps').value = metadata.nps;
                    if (metadata.schedule) document.getElementById('cap_schedule').value = metadata.schedule;
                    if (metadata.series) document.getElementById('cap_series').value = metadata.series;
                    if (metadata.type) document.getElementById('cap_type').value = metadata.type;
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
                        if (key === 'cap_standart') window.CapHandlers.onStandartChange();
                    }
                });
            }, 100);
        }
    }

    const capMaterial = new CapMaterial();
    capMaterial.register();
    console.log('Kep (Cap) modülü v1.0.0 yüklendi');

})(window);