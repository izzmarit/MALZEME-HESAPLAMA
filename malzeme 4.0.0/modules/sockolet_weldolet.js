/**
 * SOCKOLET/WELDOLET Malzeme Modülü
 * Versiyon: 1.0.1 (Malzeme Türü ve Ölçüler Düzeltmesi)
 * ASME B16.11 ve MSS SP-97 standartları ile branch connection fitting hesaplama modülü
 */

(function(window) {
    'use strict';
    
    class SockoletWeldoletMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'sockolet_weldolet';
            this.version = '1.0.1';
            
            this.texts = {
                tr: {
                    display_name: 'Sockolet / Weldolet',
                    fitting_tipi_label: 'Fitting Tipi',
                    standart_label: 'Standart',
                    header_nps_label: 'Header Pipe NPS',
                    header_schedule_label: 'Header Schedule',
                    branch_nps_label: 'Branch Outlet NPS',
                    branch_schedule_label: 'Branch Schedule',
                    class_label: 'Class Rating',
                    aci_label: 'Branch Açısı',
                    validation_error: 'Lütfen tüm alanları doldurun',
                    validation_branch_error: 'Branch boyutu header boyutundan küçük olmalıdır',
                    
                    // Fitting Tipleri
                    sockolet: 'Sockolet (Socket Weld)',
                    weldolet: 'Weldolet (Butt Weld)',
                    threadolet: 'Threadolet (Threaded)',
                    latrolet: 'Latrolet (Lateral)',
                    elbolet: 'Elbolet (Elbow)',
                    
                    // Standartlar
                    asme_b1611: 'ASME B16.11 (Forged Fittings)',
                    mss_sp97: 'MSS SP-97 (Branch Outlet Fittings)',
                    
                    // Class Ratings
                    class_3000: 'Class 3000',
                    class_6000: 'Class 6000',
                    class_9000: 'Class 9000',
                    
                    // Açılar
                    aci_90: '90° (Dik Çıkış)',
                    aci_45: '45° (Açılı Çıkış)',
                    
                    // Malzeme Grupları
                    group_carbon: 'Karbon Çelikler',
                    group_alloy_crmo: 'Alaşımlı Çelikler (Cr-Mo)',
                    group_stainless: 'Paslanmaz Çelikler',
                    group_high_yield: 'Yüksek Mukavemetli Çelikler'
                },
                en: {
                    display_name: 'Sockolet / Weldolet',
                    fitting_tipi_label: 'Fitting Type',
                    standart_label: 'Standard',
                    header_nps_label: 'Header Pipe NPS',
                    header_schedule_label: 'Header Schedule',
                    branch_nps_label: 'Branch Outlet NPS',
                    branch_schedule_label: 'Branch Schedule',
                    class_label: 'Class Rating',
                    aci_label: 'Branch Angle',
                    validation_error: 'Please fill all fields',
                    validation_branch_error: 'Branch size must be smaller than header size',
                    
                    // Fitting Types
                    sockolet: 'Sockolet (Socket Weld)',
                    weldolet: 'Weldolet (Butt Weld)',
                    threadolet: 'Threadolet (Threaded)',
                    latrolet: 'Latrolet (Lateral)',
                    elbolet: 'Elbolet (Elbow)',
                    
                    // Standards
                    asme_b1611: 'ASME B16.11 (Forged Fittings)',
                    mss_sp97: 'MSS SP-97 (Branch Outlet Fittings)',
                    
                    // Class Ratings
                    class_3000: 'Class 3000',
                    class_6000: 'Class 6000',
                    class_9000: 'Class 9000',
                    
                    // Angles
                    aci_90: '90° (Perpendicular)',
                    aci_45: '45° (Angular)',
                    
                    // Material Groups
                    group_carbon: 'Carbon Steels',
                    group_alloy_crmo: 'Alloy Steels (Cr-Mo)',
                    group_stainless: 'Stainless Steels',
                    group_high_yield: 'High Yield Steels'
                }
            };
            
            // NPS boyutları ve dış çaplar (mm)
            this.npsData = {
                '1/8': { od: 10.3, schedules: ['40', '80'] },
                '1/4': { od: 13.7, schedules: ['40', '80'] },
                '3/8': { od: 17.1, schedules: ['40', '80'] },
                '1/2': { od: 21.3, schedules: ['5', '10', '40', '80', '160', 'XXS'] },
                '3/4': { od: 26.7, schedules: ['5', '10', '40', '80', '160', 'XXS'] },
                '1': { od: 33.4, schedules: ['5', '10', '40', '80', '160', 'XXS'] },
                '1-1/4': { od: 42.2, schedules: ['5', '10', '40', '80', '160', 'XXS'] },
                '1-1/2': { od: 48.3, schedules: ['5', '10', '40', '80', '160', 'XXS'] },
                '2': { od: 60.3, schedules: ['5', '10', '40', '80', '160', 'XXS'] },
                '2-1/2': { od: 73.0, schedules: ['5', '10', '40', '80', '160', 'XXS'] },
                '3': { od: 88.9, schedules: ['5', '10', '40', '80', '160', 'XXS'] },
                '4': { od: 114.3, schedules: ['5', '10', '40', '80', '120', '160', 'XXS'] },
                '5': { od: 141.3, schedules: ['5', '10', '40', '80', '120', '160', 'XXS'] },
                '6': { od: 168.3, schedules: ['5', '10', '40', '80', '120', '160', 'XXS'] },
                '8': { od: 219.1, schedules: ['5', '10', '20', '30', '40', '60', '80', '100', '120', '140', '160', 'XXS'] },
                '10': { od: 273.0, schedules: ['5', '10', '20', '30', '40', '60', '80', '100', '120', '140', '160', 'XXS'] },
                '12': { od: 323.9, schedules: ['5', '10', '20', 'STD', '40', '60', '80', '100', '120', '140', '160', 'XXS'] },
                '14': { od: 355.6, schedules: ['10', '20', 'STD', '40', '60', '80', '100', '120', '140', '160'] },
                '16': { od: 406.4, schedules: ['10', '20', 'STD', '40', '60', '80', '100', '120', '140', '160'] },
                '18': { od: 457.0, schedules: ['10', '20', 'STD', '40', '60', '80', '100', '120', '140', '160'] },
                '20': { od: 508.0, schedules: ['10', '20', 'STD', '40', '60', '80', '100', '120', '140', '160'] },
                '24': { od: 610.0, schedules: ['10', '20', 'STD', '40', '60', '80', '100', '120', '140', '160'] }
            };
            
            // Schedule et kalınlıkları (mm)
            this.scheduleThicknesses = {
                '1/8': { '40': 1.73, '80': 2.41 },
                '1/4': { '40': 2.24, '80': 3.02 },
                '3/8': { '40': 2.31, '80': 3.20 },
                '1/2': { '5': 1.65, '10': 2.11, '40': 2.77, '80': 3.73, '160': 4.78, 'XXS': 7.47 },
                '3/4': { '5': 1.65, '10': 2.11, '40': 2.87, '80': 3.91, '160': 5.56, 'XXS': 7.82 },
                '1': { '5': 1.65, '10': 2.77, '40': 3.38, '80': 4.55, '160': 6.35, 'XXS': 9.09 },
                '1-1/4': { '5': 1.65, '10': 2.77, '40': 3.56, '80': 4.85, '160': 6.35, 'XXS': 9.70 },
                '1-1/2': { '5': 1.65, '10': 2.77, '40': 3.68, '80': 5.08, '160': 7.14, 'XXS': 10.15 },
                '2': { '5': 1.65, '10': 2.77, '40': 3.91, '80': 5.54, '160': 8.74, 'XXS': 11.07 },
                '2-1/2': { '5': 2.11, '10': 3.05, '40': 5.16, '80': 7.01, '160': 9.53, 'XXS': 14.02 },
                '3': { '5': 2.11, '10': 3.05, '40': 5.49, '80': 7.62, '160': 11.13, 'XXS': 15.24 },
                '4': { '5': 2.11, '10': 3.05, '40': 6.02, '80': 8.56, '120': 11.13, '160': 13.49, 'XXS': 17.12 },
                '5': { '5': 2.77, '10': 3.40, '40': 6.55, '80': 9.53, '120': 12.70, '160': 15.88, 'XXS': 19.05 },
                '6': { '5': 2.77, '10': 3.40, '40': 7.11, '80': 10.97, '120': 14.27, '160': 18.26, 'XXS': 21.95 },
                '8': { '5': 2.77, '10': 3.76, '20': 6.35, '30': 7.04, '40': 8.18, '60': 10.31, '80': 12.70, '100': 15.09, '120': 18.26, '140': 20.62, '160': 23.01, 'XXS': 22.23 },
                '10': { '5': 3.40, '10': 4.19, '20': 6.35, '30': 7.80, '40': 9.27, '60': 12.70, '80': 15.09, '100': 18.26, '120': 21.44, '140': 25.40, '160': 28.58, 'XXS': 25.40 },
                '12': { '5': 3.96, '10': 4.57, '20': 6.35, 'STD': 9.53, '40': 10.31, '60': 12.70, '80': 14.27, '100': 17.48, '120': 21.44, '140': 25.40, '160': 28.58, 'XXS': 25.40 },
                '14': { '10': 6.35, '20': 7.92, 'STD': 9.53, '40': 11.13, '60': 12.70, '80': 15.09, '100': 19.05, '120': 23.83, '140': 27.79, '160': 31.75 },
                '16': { '10': 6.35, '20': 7.92, 'STD': 9.53, '40': 12.70, '60': 14.27, '80': 16.66, '100': 21.44, '120': 26.19, '140': 30.96, '160': 36.53 },
                '18': { '10': 6.35, '20': 7.92, 'STD': 11.13, '40': 14.27, '60': 16.66, '80': 19.05, '100': 23.83, '120': 29.36, '140': 34.93, '160': 39.67 },
                '20': { '10': 6.35, '20': 9.53, 'STD': 9.53, '40': 15.09, '60': 18.26, '80': 20.62, '100': 26.19, '120': 32.54, '140': 38.10, '160': 44.45 },
                '24': { '10': 6.35, '20': 9.53, 'STD': 9.53, '40': 17.48, '60': 21.44, '80': 24.61, '100': 30.96, '120': 38.89, '140': 46.02, '160': 52.37 }
            };
            
            // Fitting tipi ağırlık çarpanları
            this.fittingFactors = {
                'sockolet': 1.0,
                'weldolet': 0.85,
                'threadolet': 1.05,
                'latrolet': 1.15,
                'elbolet': 1.25
            };
            
            // Class bazlı ağırlık çarpanları
            this.classFactors = {
                '3000': 1.0,
                '6000': 1.35,
                '9000': 1.65
            };
            
            // Açı çarpanları
            this.angleFactors = {
                '90': 1.0,
                '45': 1.08
            };
            
            // ASME B16.11 Malzemeleri
            this.asmeB1611Materials = {
                'A105': { density: 7850, standard: 'ASME B16.11 / ASTM A105', group: 'carbon' },
                'A350 LF2': { density: 7850, standard: 'ASME B16.11 / ASTM A350', group: 'carbon' },
                'A182 F1': { density: 7850, standard: 'ASME B16.11 / ASTM A182', group: 'alloy_crmo' },
                'A182 F5': { density: 7850, standard: 'ASME B16.11 / ASTM A182', group: 'alloy_crmo' },
                'A182 F9': { density: 7850, standard: 'ASME B16.11 / ASTM A182', group: 'alloy_crmo' },
                'A182 F11': { density: 7850, standard: 'ASME B16.11 / ASTM A182', group: 'alloy_crmo' },
                'A182 F22': { density: 7850, standard: 'ASME B16.11 / ASTM A182', group: 'alloy_crmo' },
                'A182 F304': { density: 7900, standard: 'ASME B16.11 / ASTM A182', group: 'stainless' },
                'A182 F304L': { density: 7900, standard: 'ASME B16.11 / ASTM A182', group: 'stainless' },
                'A182 F316': { density: 7980, standard: 'ASME B16.11 / ASTM A182', group: 'stainless' },
                'A182 F316L': { density: 7980, standard: 'ASME B16.11 / ASTM A182', group: 'stainless' },
                'A182 F321': { density: 7900, standard: 'ASME B16.11 / ASTM A182', group: 'stainless' }
            };
            
            // MSS SP-97 Malzemeleri
            this.mssSp97Materials = {
                'A105': { density: 7850, standard: 'MSS SP-97 / ASTM A105', group: 'carbon' },
                'A350 LF2': { density: 7850, standard: 'MSS SP-97 / ASTM A350', group: 'carbon' },
                'A182 F1': { density: 7850, standard: 'MSS SP-97 / ASTM A182', group: 'alloy_crmo' },
                'A182 F5': { density: 7850, standard: 'MSS SP-97 / ASTM A182', group: 'alloy_crmo' },
                'A182 F11': { density: 7850, standard: 'MSS SP-97 / ASTM A182', group: 'alloy_crmo' },
                'A182 F22': { density: 7850, standard: 'MSS SP-97 / ASTM A182', group: 'alloy_crmo' },
                'A182 F91': { density: 7850, standard: 'MSS SP-97 / ASTM A182', group: 'alloy_crmo' },
                'A182 F304': { density: 7900, standard: 'MSS SP-97 / ASTM A182', group: 'stainless' },
                'A182 F304L': { density: 7900, standard: 'MSS SP-97 / ASTM A182', group: 'stainless' },
                'A182 F316': { density: 7980, standard: 'MSS SP-97 / ASTM A182', group: 'stainless' },
                'A182 F316L': { density: 7980, standard: 'MSS SP-97 / ASTM A182', group: 'stainless' },
                'A182 F321': { density: 7900, standard: 'MSS SP-97 / ASTM A182', group: 'stainless' },
                'A694 F42': { density: 7850, standard: 'MSS SP-97 / ASTM A694', group: 'high_yield' },
                'A694 F52': { density: 7850, standard: 'MSS SP-97 / ASTM A694', group: 'high_yield' },
                'A694 F60': { density: 7850, standard: 'MSS SP-97 / ASTM A694', group: 'high_yield' },
                'A694 F65': { density: 7850, standard: 'MSS SP-97 / ASTM A694', group: 'high_yield' },
                'A694 F70': { density: 7850, standard: 'MSS SP-97 / ASTM A694', group: 'high_yield' }
            };
            
            this.setupEventHandlers();
        }

        setupEventHandlers() {
            const self = this;
            
            window.SockoletWeldoletHandlers = {
                onStandartChange: function() {
                    self.updateMaterialGrades();
                    self.updateFittingTypes();
                    self.updateClassRatings();
                },
                
                onHeaderNPSChange: function() {
                    const headerNPS = document.getElementById('sw_header_nps').value;
                    const headerScheduleSelect = document.getElementById('sw_header_schedule');
                    const lang = self.getCurrentLanguage();
                    
                    headerScheduleSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Schedule seçin...' : 'Select schedule...'}</option>`;
                    
                    if (headerNPS && self.npsData[headerNPS]) {
                        self.npsData[headerNPS].schedules.forEach(sch => {
                            const thickness = self.scheduleThicknesses[headerNPS][sch];
                            const option = document.createElement('option');
                            option.value = sch;
                            option.textContent = `Sch.${sch} (${thickness}mm)`;
                            headerScheduleSelect.appendChild(option);
                        });
                    }
                    
                    // Branch NPS'i güncelle
                    self.updateBranchNPSOptions();
                },
                
                onBranchNPSChange: function() {
                    const branchNPS = document.getElementById('sw_branch_nps').value;
                    const branchScheduleSelect = document.getElementById('sw_branch_schedule');
                    const lang = self.getCurrentLanguage();
                    
                    branchScheduleSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Schedule seçin...' : 'Select schedule...'}</option>`;
                    
                    if (branchNPS && self.npsData[branchNPS]) {
                        self.npsData[branchNPS].schedules.forEach(sch => {
                            const thickness = self.scheduleThicknesses[branchNPS][sch];
                            const option = document.createElement('option');
                            option.value = sch;
                            option.textContent = `Sch.${sch} (${thickness}mm)`;
                            branchScheduleSelect.appendChild(option);
                        });
                    }
                }
            };
        }

        updateFittingTypes() {
            const standart = document.getElementById('sw_standart')?.value;
            const fittingSelect = document.getElementById('sw_fitting_tipi');
            if (!fittingSelect) return;
            
            const lang = this.getCurrentLanguage();
            fittingSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Tip seçin...' : 'Select type...'}</option>`;
            
            const types = ['sockolet', 'weldolet', 'threadolet'];
            
            if (standart === 'mss_sp97') {
                types.push('latrolet', 'elbolet');
            }
            
            types.forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = this.getText(type);
                fittingSelect.appendChild(option);
            });
        }

        updateClassRatings() {
            const classSelect = document.getElementById('sw_class');
            if (!classSelect) return;
            
            const lang = this.getCurrentLanguage();
            classSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Class seçin...' : 'Select class...'}</option>`;
            
            ['3000', '6000', '9000'].forEach(cls => {
                const option = document.createElement('option');
                option.value = cls;
                option.textContent = this.getText(`class_${cls}`);
                classSelect.appendChild(option);
            });
        }

        updateBranchNPSOptions() {
            const headerNPS = document.getElementById('sw_header_nps')?.value;
            const branchNPSSelect = document.getElementById('sw_branch_nps');
            if (!branchNPSSelect) return;
            
            const lang = this.getCurrentLanguage();
            branchNPSSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Branch NPS seçin...' : 'Select branch NPS...'}</option>`;
            
            if (!headerNPS) return;
            
            const headerOD = this.npsData[headerNPS].od;
            
            Object.keys(this.npsData).forEach(nps => {
                const branchOD = this.npsData[nps].od;
                if (branchOD <= headerOD) {
                    const option = document.createElement('option');
                    option.value = nps;
                    option.textContent = `NPS ${nps}" (Ø${branchOD}mm)`;
                    branchNPSSelect.appendChild(option);
                }
            });
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="sw_standart">${this.getText('standart_label')}</label>
                        <select id="sw_standart" onchange="window.SockoletWeldoletHandlers.onStandartChange()">
                            <option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
                            <option value="asme_b1611">${this.getText('asme_b1611')}</option>
                            <option value="mss_sp97">${this.getText('mss_sp97')}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="sw_fitting_tipi">${this.getText('fitting_tipi_label')}</label>
                        <select id="sw_fitting_tipi">
                            <option value="">${lang === 'tr' ? 'Önce standart seçin' : 'Select standard first'}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="sw_header_nps">${this.getText('header_nps_label')}</label>
                        <select id="sw_header_nps" onchange="window.SockoletWeldoletHandlers.onHeaderNPSChange()">
                            <option value="">${lang === 'tr' ? 'Header NPS seçin...' : 'Select header NPS...'}</option>
                            ${Object.keys(this.npsData).map(nps => {
                                const od = this.npsData[nps].od;
                                return `<option value="${nps}">NPS ${nps}" (Ø${od}mm)</option>`;
                            }).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="sw_header_schedule">${this.getText('header_schedule_label')}</label>
                        <select id="sw_header_schedule">
                            <option value="">${lang === 'tr' ? 'Önce header NPS seçin' : 'Select header NPS first'}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="sw_branch_nps">${this.getText('branch_nps_label')}</label>
                        <select id="sw_branch_nps" onchange="window.SockoletWeldoletHandlers.onBranchNPSChange()">
                            <option value="">${lang === 'tr' ? 'Önce header seçin' : 'Select header first'}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="sw_branch_schedule">${this.getText('branch_schedule_label')}</label>
                        <select id="sw_branch_schedule">
                            <option value="">${lang === 'tr' ? 'Önce branch NPS seçin' : 'Select branch NPS first'}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="sw_class">${this.getText('class_label')}</label>
                        <select id="sw_class">
                            <option value="">${lang === 'tr' ? 'Class seçin...' : 'Select class...'}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="sw_aci">${this.getText('aci_label')}</label>
                        <select id="sw_aci">
                            <option value="">${lang === 'tr' ? 'Açı seçin...' : 'Select angle...'}</option>
                            <option value="90">${this.getText('aci_90')}</option>
                            <option value="45">${this.getText('aci_45')}</option>
                        </select>
                    </div>
                </div>
            `;
        }

        getGrades() {
            const standart = document.getElementById('sw_standart')?.value;
            
            if (standart === 'asme_b1611') {
                return this.getGroupedGrades(this.asmeB1611Materials);
            } else if (standart === 'mss_sp97') {
                return this.getGroupedGrades(this.mssSp97Materials);
            }
            
            return [];
        }

        getGroupedGrades(materials) {
            const lang = this.getCurrentLanguage();
            const organizedGrades = [];
            
            const groups = {
                'carbon': this.getText('group_carbon'),
                'alloy_crmo': this.getText('group_alloy_crmo'),
                'stainless': this.getText('group_stainless'),
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
            const standart = document.getElementById('sw_standart')?.value;
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
            if (standart === 'asme_b1611' && this.asmeB1611Materials[grade]) {
                return this.asmeB1611Materials[grade].density;
            } else if (standart === 'mss_sp97' && this.mssSp97Materials[grade]) {
                return this.mssSp97Materials[grade].density;
            }
            return 7850;
        }

        getStandard(grade, standart) {
            if (standart === 'asme_b1611' && this.asmeB1611Materials[grade]) {
                return this.asmeB1611Materials[grade].standard;
            } else if (standart === 'mss_sp97' && this.mssSp97Materials[grade]) {
                return this.mssSp97Materials[grade].standard;
            }
            return '-';
        }

        calculate(formData) {
            const standart = formData.sw_standart;
            const fittingTipi = formData.sw_fitting_tipi;
            const headerNPS = formData.sw_header_nps;
            const headerSchedule = formData.sw_header_schedule;
            const branchNPS = formData.sw_branch_nps;
            const branchSchedule = formData.sw_branch_schedule;
            const classRating = formData.sw_class;
            const aci = formData.sw_aci;
            const malzemeCinsi = formData.malzemeCinsi;
            const adet = parseFloat(formData.adet) || 1;
            
            if (!standart || !fittingTipi || !headerNPS || !headerSchedule || 
                !branchNPS || !branchSchedule || !classRating || !aci || !malzemeCinsi) {
                return null;
            }
            
            // Boyut bilgilerini al
            const headerOD = this.npsData[headerNPS].od;
            const headerWT = this.scheduleThicknesses[headerNPS][headerSchedule];
            const branchOD = this.npsData[branchNPS].od;
            const branchWT = this.scheduleThicknesses[branchNPS][branchSchedule];
            
            // Yoğunluk
            const density = this.getDensity(malzemeCinsi, standart);
            
            // Temel hacim hesaplaması (empirical formula)
            // Header body hacmi
            const headerBodyVolume = Math.PI * ((headerOD/2) ** 2) * (headerOD * 1.5);
            
            // Branch outlet hacmi
            const branchOutletHeight = branchOD * 1.2;
            const branchOutletVolume = Math.PI * ((branchOD/2) ** 2) * branchOutletHeight;
            
            // Reinforcement pad hacmi (header çapına bağlı)
            const padDiameter = headerOD * 1.8;
            const padThickness = Math.max(headerWT, branchWT) * 1.5;
            const padVolume = Math.PI * ((padDiameter/2) ** 2) * padThickness;
            
            // Toplam hacim
            let totalVolume = headerBodyVolume + branchOutletVolume + padVolume;
            
            // Fitting tipi çarpanı
            const fittingFactor = this.fittingFactors[fittingTipi] || 1.0;
            totalVolume *= fittingFactor;
            
            // Class çarpanı
            const classFactor = this.classFactors[classRating] || 1.0;
            totalVolume *= classFactor;
            
            // Açı çarpanı
            const angleFactor = this.angleFactors[aci] || 1.0;
            totalVolume *= angleFactor;
            
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
            const standart = formData.sw_standart;
            const fittingTipi = formData.sw_fitting_tipi;
            const headerNPS = formData.sw_header_nps;
            const headerSchedule = formData.sw_header_schedule;
            const branchNPS = formData.sw_branch_nps;
            const branchSchedule = formData.sw_branch_schedule;
            const classRating = formData.sw_class;
            const aci = formData.sw_aci;
            
            if (!standart || !fittingTipi || !headerNPS || !headerSchedule || 
                !branchNPS || !branchSchedule || !classRating || !aci) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            // Branch header'dan büyük olamaz
            const headerOD = this.npsData[headerNPS].od;
            const branchOD = this.npsData[branchNPS].od;
            
            if (branchOD > headerOD) {
                return {
                    isValid: false,
                    message: this.getText('validation_branch_error')
                };
            }
            
            return { isValid: true };
        }

        formatDimensions(formData) {
            const headerNPS = formData.sw_header_nps;
            const headerSchedule = formData.sw_header_schedule;
            const branchNPS = formData.sw_branch_nps;
            const branchSchedule = formData.sw_branch_schedule;
            const classRating = formData.sw_class;
            const aci = formData.sw_aci;
            
            if (!headerNPS || !branchNPS || !classRating || !aci) {
                return '-';
            }
            
            // Sadece NPS, Schedule, Class ve açı bilgisi - MM CİNSİNDEN ÇAPLAR YOK
            return `${headerNPS}"x${branchNPS}", Sch.${headerSchedule}x${branchSchedule}, Class ${classRating}, ${aci}°`;
        }

        hasWaterVolume() {
            return false;
        }

        getDisplayName() {
            return this.getText('display_name');
        }

        getDisplayTypeFromRow(rowData) {
            const metadata = rowData.metadata?.sockolet_weldolet;
            if (!metadata || !metadata.fitting_tipi) {
                return this.getDisplayName();
            }
            
            // Metadata'dan fitting tipini al ve sadece ilk kelimeyi döndür (parantez içini kes)
            const fittingText = this.getText(metadata.fitting_tipi);
            return fittingText.split(' ')[0].replace('(', '').replace(')', '');
        }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            const standart = formData.sw_standart;
            const fittingTipi = formData.sw_fitting_tipi;
            
            // Fitting tipinin sadece ilk kelimesini al (örn: "Sockolet (Socket Weld)" -> "Sockolet")
            if (fittingTipi) {
                const fittingText = this.getText(fittingTipi);
                baseRow.malzemeTuru = fittingText.split(' ')[0].replace('(', '').replace(')', '');
            } else {
                baseRow.malzemeTuru = this.getDisplayName();
            }
            
            baseRow.enNormu = this.getStandard(formData.malzemeCinsi, standart);
            
            baseRow.metadata = {
                ...baseRow.metadata,
                sockolet_weldolet: {
                    standart: formData.sw_standart,
                    fitting_tipi: formData.sw_fitting_tipi,
                    header_nps: formData.sw_header_nps,
                    header_schedule: formData.sw_header_schedule,
                    branch_nps: formData.sw_branch_nps,
                    branch_schedule: formData.sw_branch_schedule,
                    class: formData.sw_class,
                    aci: formData.sw_aci
                }
            };
            
            return baseRow;
        }

        fillFormFromRow(rowData) {
            super.fillFormFromRow(rowData);
            
            const metadata = rowData.metadata?.sockolet_weldolet;
            if (!metadata) {
                if (rowData.formData) {
                    this.fillFromFormData(rowData.formData);
                }
                return true;
            }
            
            setTimeout(() => {
                if (metadata.standart) {
                    document.getElementById('sw_standart').value = metadata.standart;
                    window.SockoletWeldoletHandlers.onStandartChange();
                }
                
                setTimeout(() => {
                    if (metadata.fitting_tipi) {
                        document.getElementById('sw_fitting_tipi').value = metadata.fitting_tipi;
                    }
                    if (metadata.header_nps) {
                        document.getElementById('sw_header_nps').value = metadata.header_nps;
                        window.SockoletWeldoletHandlers.onHeaderNPSChange();
                    }
                    
                    setTimeout(() => {
                        if (metadata.header_schedule) {
                            document.getElementById('sw_header_schedule').value = metadata.header_schedule;
                        }
                        if (metadata.branch_nps) {
                            document.getElementById('sw_branch_nps').value = metadata.branch_nps;
                            window.SockoletWeldoletHandlers.onBranchNPSChange();
                        }
                        
                        setTimeout(() => {
                            if (metadata.branch_schedule) {
                                document.getElementById('sw_branch_schedule').value = metadata.branch_schedule;
                            }
                            if (metadata.class) {
                                document.getElementById('sw_class').value = metadata.class;
                            }
                            if (metadata.aci) {
                                document.getElementById('sw_aci').value = metadata.aci;
                            }
                        }, 100);
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
                        
                        if (key === 'sw_standart') {
                            window.SockoletWeldoletHandlers.onStandartChange();
                        } else if (key === 'sw_header_nps') {
                            window.SockoletWeldoletHandlers.onHeaderNPSChange();
                        } else if (key === 'sw_branch_nps') {
                            window.SockoletWeldoletHandlers.onBranchNPSChange();
                        }
                    }
                });
            }, 100);
        }
    }

    const sockoletWeldoletMaterial = new SockoletWeldoletMaterial();
    sockoletWeldoletMaterial.register();
    
    console.log('Sockolet/Weldolet modülü v1.0.1 yüklendi (Malzeme Türü ve Ölçüler Düzeltmesi)');

})(window);