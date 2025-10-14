/**
 * BORU Malzeme Modülü
 * Versiyon: 1.0.0
 * Manuel, EN 10220 ve ASME B36.10 standartları ile boru hesaplama modülü
 */

(function(window) {
    'use strict';
    
    class BoruMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'boru';
            this.version = '1.0.0';
            
            this.texts = {
                tr: {
                    display_name: 'Boru',
                    sistem_label: 'Standart Sistemi',
                    dis_cap_label: 'Dış Çap (mm)',
                    et_kalinligi_label: 'Et Kalınlığı (mm)',
                    uzunluk_label: 'Uzunluk (mm)',
                    cap_secimi_label: 'Çap Seçimi',
                    schedule_label: 'Schedule',
                    validation_error: 'Lütfen tüm alanları doldurun',
                    validation_min_error: 'Değerler 0\'dan büyük olmalıdır',
                    validation_thickness_error: 'Et kalınlığı dış çapın yarısından küçük olmalıdır',
                    
                    // Sistem seçenekleri
                    manuel: 'Manuel Giriş',
                    en10220: 'EN 10220',
                    asme: 'ASME B36.10',
                    
                    // Malzeme grupları
                    group_structural: 'Yapı Çelikleri',
                    group_pressure: 'Basınçlı Kap Çelikleri',
                    group_stainless: 'Paslanmaz Çelikler',
                    group_carbon: 'Karbon Çelikleri (ASTM)',
                    group_alloy: 'Alaşımlı Çelikler (ASTM)'
                },
                en: {
                    display_name: 'Pipe',
                    sistem_label: 'Standard System',
                    dis_cap_label: 'Outer Diameter (mm)',
                    et_kalinligi_label: 'Wall Thickness (mm)',
                    uzunluk_label: 'Length (mm)',
                    cap_secimi_label: 'Size Selection',
                    schedule_label: 'Schedule',
                    validation_error: 'Please fill all fields',
                    validation_min_error: 'Values must be greater than 0',
                    validation_thickness_error: 'Wall thickness must be less than half of outer diameter',
                    
                    // System options
                    manuel: 'Manual Entry',
                    en10220: 'EN 10220',
                    asme: 'ASME B36.10',
                    
                    // Material groups
                    group_structural: 'Structural Steels',
                    group_pressure: 'Pressure Vessel Steels',
                    group_stainless: 'Stainless Steels',
                    group_carbon: 'Carbon Steels (ASTM)',
                    group_alloy: 'Alloy Steels (ASTM)'
                }
            };
            
            // EN 10220 Standart Çapları ve Et Kalınlıkları
            this.en10220Caps = {
                '21.3': [2.0, 2.3, 2.6, 3.2],
                '26.9': [2.0, 2.3, 2.6, 3.2],
                '33.7': [2.6, 3.2, 4.0],
                '42.4': [2.6, 3.2, 4.0],
                '48.3': [2.6, 3.2, 4.0, 5.0],
                '60.3': [2.9, 3.6, 4.5, 5.6],
                '76.1': [2.9, 3.6, 4.5, 5.6],
                '88.9': [3.2, 4.0, 5.0, 6.3],
                '114.3': [3.6, 4.5, 5.6, 6.3, 8.0],
                '139.7': [4.0, 5.0, 6.3, 8.0, 10.0],
                '168.3': [4.5, 5.6, 7.1, 8.0, 10.0, 12.5],
                '219.1': [5.0, 6.3, 8.0, 10.0, 12.5],
                '273.0': [5.6, 6.3, 8.0, 10.0, 12.5, 16.0],
                '323.9': [6.3, 8.0, 10.0, 12.5, 16.0],
                '355.6': [6.3, 8.0, 10.0, 12.5, 16.0],
                '406.4': [6.3, 8.0, 10.0, 12.5, 16.0, 20.0],
                '457.0': [8.0, 10.0, 12.5, 16.0, 20.0],
                '508.0': [8.0, 10.0, 12.5, 16.0, 20.0],
                '610.0': [8.0, 10.0, 12.5, 16.0, 20.0, 25.0],
                '711.0': [10.0, 12.5, 16.0, 20.0, 25.0],
                '813.0': [10.0, 12.5, 16.0, 20.0, 25.0],
                '914.0': [10.0, 12.5, 16.0, 20.0, 25.0],
                '1016.0': [10.0, 12.5, 16.0, 20.0, 25.0]
            };
            
            // ASME B36.10 NPS ve Schedule Verileri
            this.asmeData = {
                '1/2"': { od: 21.3, schedules: { '5S': 1.65, '10S': 2.11, '40': 2.77, '80': 3.73, '160': 4.78, 'XXS': 7.47 } },
                '3/4"': { od: 26.7, schedules: { '5S': 1.65, '10S': 2.11, '40': 2.87, '80': 3.91, '160': 5.56, 'XXS': 7.82 } },
                '1"': { od: 33.4, schedules: { '5S': 1.65, '10S': 2.77, '40': 3.38, '80': 4.55, '160': 6.35, 'XXS': 9.09 } },
                '1-1/4"': { od: 42.2, schedules: { '5S': 1.65, '10S': 2.77, '40': 3.56, '80': 4.85, '160': 6.35, 'XXS': 9.70 } },
                '1-1/2"': { od: 48.3, schedules: { '5S': 1.65, '10S': 2.77, '40': 3.68, '80': 5.08, '160': 7.14, 'XXS': 10.15 } },
                '2"': { od: 60.3, schedules: { '5S': 1.65, '10S': 2.77, '40': 3.91, '80': 5.54, '160': 8.74, 'XXS': 11.07 } },
                '2-1/2"': { od: 73.0, schedules: { '5S': 2.11, '10S': 3.05, '40': 5.16, '80': 7.01, '160': 9.53, 'XXS': 14.02 } },
                '3"': { od: 88.9, schedules: { '5S': 2.11, '10S': 3.05, '40': 5.49, '80': 7.62, '160': 11.13, 'XXS': 15.24 } },
                '3-1/2"': { od: 101.6, schedules: { '5S': 2.11, '10S': 3.05, '40': 5.74, '80': 8.08 } },
                '4"': { od: 114.3, schedules: { '5S': 2.11, '10S': 3.05, '40': 6.02, '80': 8.56, '120': 11.13, '160': 13.49, 'XXS': 17.12 } },
                '5"': { od: 141.3, schedules: { '5S': 2.77, '10S': 3.40, '40': 6.55, '80': 9.53, '120': 12.70, '160': 15.88, 'XXS': 19.05 } },
                '6"': { od: 168.3, schedules: { '5S': 2.77, '10S': 3.40, '40': 7.11, '80': 10.97, '120': 14.27, '160': 18.26, 'XXS': 21.95 } },
                '8"': { od: 219.1, schedules: { '5S': 2.77, '10S': 3.76, '20': 6.35, '30': 7.04, '40': 8.18, '60': 10.31, '80': 12.70, '100': 15.09, '120': 18.26, '140': 20.62, '160': 23.01, 'XXS': 22.23 } },
                '10"': { od: 273.0, schedules: { '5S': 3.40, '10S': 4.19, '20': 6.35, '30': 7.80, '40': 9.27, '60': 12.70, '80': 15.09, '100': 18.26, '120': 21.44, '140': 25.40, '160': 28.58, 'XXS': 25.40 } },
                '12"': { od: 323.8, schedules: { '5S': 3.96, '10S': 4.57, '20': 6.35, '30': 8.38, '40': 9.53, '60': 12.70, '80': 17.48, '100': 21.44, '120': 25.40, '140': 28.58, '160': 33.32, 'XXS': 25.40 } },
                '14"': { od: 355.6, schedules: { '10': 6.35, '20': 7.92, '30': 9.53, '40': 11.13, '60': 15.09, '80': 19.05, '100': 23.83, '120': 27.79, '140': 31.75, '160': 35.71 } },
                '16"': { od: 406.4, schedules: { '10': 6.35, '20': 7.92, '30': 9.53, '40': 12.70, '60': 16.66, '80': 21.44, '100': 26.97, '120': 30.96, '140': 36.53, '160': 40.49 } },
                '18"': { od: 457.0, schedules: { '10': 6.35, '20': 7.92, '30': 11.13, '40': 14.27, '60': 19.05, '80': 23.83, '100': 29.36, '120': 33.32, '140': 39.67, '160': 45.24 } },
                '20"': { od: 508.0, schedules: { '10': 6.35, '20': 9.53, '30': 12.70, '40': 15.09, '60': 20.62, '80': 26.19, '100': 32.54, '120': 38.10, '140': 44.45, '160': 50.01 } },
                '24"': { od: 610.0, schedules: { '10': 6.35, '20': 9.53, '30': 14.27, '40': 17.48, '60': 24.61, '80': 30.96, '100': 38.89, '120': 46.02, '140': 52.37, '160': 59.54 } }
            };
            
            // Malzeme tanımlamaları
            this.materials = {
                // Manuel giriş için tüm malzemeler
                manuel: {
                    'S235JR': { density: 7850, standard: 'EN 10025-2', group: 'structural' },
                    'S275JR': { density: 7850, standard: 'EN 10025-2', group: 'structural' },
                    'S355JR': { density: 7850, standard: 'EN 10025-2', group: 'structural' },
                    'S355J2': { density: 7850, standard: 'EN 10025-2', group: 'structural' },
                    'P235GH': { density: 7850, standard: 'EN 10028-2', group: 'pressure' },
                    'P265GH': { density: 7850, standard: 'EN 10028-2', group: 'pressure' },
                    'P295GH': { density: 7850, standard: 'EN 10028-2', group: 'pressure' },
                    'P355GH': { density: 7850, standard: 'EN 10028-2', group: 'pressure' },
                    '16Mo3': { density: 7850, standard: 'EN 10028-2', group: 'pressure' },
                    '1.4301': { density: 7900, standard: 'EN 10088-2', group: 'stainless', aisi: '304' },
                    '1.4401': { density: 7980, standard: 'EN 10088-2', group: 'stainless', aisi: '316' },
                    '1.4404': { density: 7980, standard: 'EN 10088-2', group: 'stainless', aisi: '316L' },
                    '1.4571': { density: 7980, standard: 'EN 10088-2', group: 'stainless', aisi: '316Ti' }
                },
                // EN 10220 için malzemeler
                en10220: {
                    'S235JRH': { density: 7850, standard: 'EN 10220 / EN 10219-1', group: 'structural' },
                    'S275J0H': { density: 7850, standard: 'EN 10220 / EN 10219-1', group: 'structural' },
                    'S355J2H': { density: 7850, standard: 'EN 10220 / EN 10219-1', group: 'structural' },
                    'P235GH': { density: 7850, standard: 'EN 10220 / EN 10216-2', group: 'pressure' },
                    'P265GH': { density: 7850, standard: 'EN 10220 / EN 10216-2', group: 'pressure' },
                    'P355GH': { density: 7850, standard: 'EN 10220 / EN 10216-2', group: 'pressure' },
                    '16Mo3': { density: 7850, standard: 'EN 10220 / EN 10216-2', group: 'pressure' },
                    '1.4301': { density: 7900, standard: 'EN 10220 / EN 10216-5', group: 'stainless', aisi: '304' },
                    '1.4401': { density: 7980, standard: 'EN 10220 / EN 10216-5', group: 'stainless', aisi: '316' },
                    '1.4404': { density: 7980, standard: 'EN 10220 / EN 10216-5', group: 'stainless', aisi: '316L' }
                },
                // ASME B36.10 için malzemeler
                asme: {
                    'A53 Gr.B': { density: 7850, standard: 'ASME B36.10 / ASTM A53', group: 'carbon' },
                    'A106 Gr.B': { density: 7850, standard: 'ASME B36.10 / ASTM A106', group: 'carbon' },
                    'A106 Gr.C': { density: 7850, standard: 'ASME B36.10 / ASTM A106', group: 'carbon' },
                    'A333 Gr.6': { density: 7850, standard: 'ASME B36.10 / ASTM A333', group: 'carbon' },
                    'A335 P5': { density: 7850, standard: 'ASME B36.10 / ASTM A335', group: 'alloy' },
                    'A335 P9': { density: 7850, standard: 'ASME B36.10 / ASTM A335', group: 'alloy' },
                    'A335 P11': { density: 7850, standard: 'ASME B36.10 / ASTM A335', group: 'alloy' },
                    'A335 P22': { density: 7850, standard: 'ASME B36.10 / ASTM A335', group: 'alloy' },
                    'A312 TP304': { density: 7900, standard: 'ASME B36.10 / ASTM A312', group: 'stainless' },
                    'A312 TP316': { density: 7980, standard: 'ASME B36.10 / ASTM A312', group: 'stainless' },
                    'A312 TP316L': { density: 7980, standard: 'ASME B36.10 / ASTM A312', group: 'stainless' }
                }
            };
            
            this.setupEventHandlers();
        }

        setupEventHandlers() {
            const self = this;
            
            window.BoruHandlers = {
                onSistemChange: function() {
                    const sistem = document.getElementById('br_sistem').value;
                    
                    // Tüm alanları gizle
                    document.getElementById('br_manuelFields').style.display = 'none';
                    document.getElementById('br_enFields').style.display = 'none';
                    document.getElementById('br_asmeFields').style.display = 'none';
                    
                    // Seçilen sisteme göre göster
                    if (sistem === 'manuel') {
                        document.getElementById('br_manuelFields').style.display = 'block';
                    } else if (sistem === 'en10220') {
                        document.getElementById('br_enFields').style.display = 'block';
                        self.populateEN10220Caps();
                    } else if (sistem === 'asme') {
                        document.getElementById('br_asmeFields').style.display = 'block';
                        self.populateASMECaps();
                    }
                    
                    // Malzeme cinsi dropdown'ını güncelle
                    self.updateMaterialGrades(sistem);
                },
                
                onENCapChange: function() {
                    const cap = document.getElementById('br_en_cap').value;
                    const etSelect = document.getElementById('br_en_et');
                    const lang = self.getCurrentLanguage();
                    
                    if (!cap) {
                        etSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Önce çap seçin' : 'Select diameter first'}</option>`;
                        return;
                    }
                    
                    const etKalinliklari = self.en10220Caps[cap] || [];
                    etSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Et kalınlığı seçin' : 'Select wall thickness'}</option>`;
                    etKalinliklari.forEach(et => {
                        etSelect.innerHTML += `<option value="${et}">${et} mm</option>`;
                    });
                },
                
                onASMECapChange: function() {
                    const nps = document.getElementById('br_asme_cap').value;
                    const scheduleSelect = document.getElementById('br_asme_schedule');
                    const lang = self.getCurrentLanguage();
                    
                    if (!nps) {
                        scheduleSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Önce çap seçin' : 'Select size first'}</option>`;
                        return;
                    }
                    
                    const data = self.asmeData[nps];
                    if (!data) return;
                    
                    scheduleSelect.innerHTML = `<option value="">Schedule ${lang === 'tr' ? 'seçin' : 'select'}</option>`;
                    Object.keys(data.schedules).forEach(schedule => {
                        scheduleSelect.innerHTML += `<option value="${schedule}">${schedule}</option>`;
                    });
                }
            };
        }

        populateEN10220Caps() {
            const select = document.getElementById('br_en_cap');
            const lang = this.getCurrentLanguage();
            select.innerHTML = `<option value="">${lang === 'tr' ? 'Çap seçin' : 'Select diameter'}</option>`;
            
            Object.keys(this.en10220Caps).forEach(cap => {
                select.innerHTML += `<option value="${cap}">Ø${cap} mm</option>`;
            });
        }

        populateASMECaps() {
            const select = document.getElementById('br_asme_cap');
            const lang = this.getCurrentLanguage();
            select.innerHTML = `<option value="">${lang === 'tr' ? 'Çap seçin' : 'Select size'}</option>`;
            
            Object.keys(this.asmeData).forEach(nps => {
                select.innerHTML += `<option value="${nps}">${nps}</option>`;
            });
        }

        updateMaterialGrades(sistem) {
            const malzemeCinsiSelect = document.getElementById('malzemeCinsi');
            if (!malzemeCinsiSelect || !sistem) return;
            
            const currentValue = malzemeCinsiSelect.value;
            malzemeCinsiSelect.innerHTML = '';
            
            const materials = this.materials[sistem] || {};
            const lang = this.getCurrentLanguage();
            
            // Gruplara göre organize et
            const groups = {
                'structural': this.getText('group_structural'),
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
                        <label for="br_sistem">${this.getText('sistem_label')}</label>
                        <select id="br_sistem" onchange="window.BoruHandlers.onSistemChange()">
                            <option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
                            <option value="manuel">${this.getText('manuel')}</option>
                            <option value="en10220">${this.getText('en10220')}</option>
                            <option value="asme">${this.getText('asme')}</option>
                        </select>
                    </div>
                </div>
                
                <!-- Manuel Giriş Alanları -->
                <div id="br_manuelFields" style="display:none;">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="br_manuel_dis_cap">${this.getText('dis_cap_label')}</label>
                            <input type="number" id="br_manuel_dis_cap" min="0.1" step="0.1" placeholder="${lang === 'tr' ? 'Dış çap' : 'Outer diameter'}">
                        </div>
                        <div class="form-group">
                            <label for="br_manuel_et">${this.getText('et_kalinligi_label')}</label>
                            <input type="number" id="br_manuel_et" min="0.1" step="0.1" placeholder="${lang === 'tr' ? 'Et kalınlığı' : 'Wall thickness'}">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="br_manuel_uzunluk">${this.getText('uzunluk_label')}</label>
                            <input type="number" id="br_manuel_uzunluk" min="0.1" step="0.1" placeholder="${lang === 'tr' ? 'Uzunluk' : 'Length'}">
                        </div>
                    </div>
                </div>
                
                <!-- EN 10220 Alanları -->
                <div id="br_enFields" style="display:none;">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="br_en_cap">${this.getText('cap_secimi_label')}</label>
                            <select id="br_en_cap" onchange="window.BoruHandlers.onENCapChange()">
                                <option value="">${lang === 'tr' ? 'Çap seçin' : 'Select diameter'}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="br_en_et">${this.getText('et_kalinligi_label')}</label>
                            <select id="br_en_et">
                                <option value="">${lang === 'tr' ? 'Önce çap seçin' : 'Select diameter first'}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="br_en_uzunluk">${this.getText('uzunluk_label')}</label>
                            <input type="number" id="br_en_uzunluk" min="0.1" step="0.1" placeholder="${lang === 'tr' ? 'Uzunluk' : 'Length'}">
                        </div>
                    </div>
                </div>
                
                <!-- ASME B36.10 Alanları -->
                <div id="br_asmeFields" style="display:none;">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="br_asme_cap">${this.getText('cap_secimi_label')} (NPS)</label>
                            <select id="br_asme_cap" onchange="window.BoruHandlers.onASMECapChange()">
                                <option value="">${lang === 'tr' ? 'Çap seçin' : 'Select size'}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="br_asme_schedule">${this.getText('schedule_label')}</label>
                            <select id="br_asme_schedule">
                                <option value="">${lang === 'tr' ? 'Önce çap seçin' : 'Select size first'}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="br_asme_uzunluk">${this.getText('uzunluk_label')}</label>
                            <input type="number" id="br_asme_uzunluk" min="0.1" step="0.1" placeholder="${lang === 'tr' ? 'Uzunluk' : 'Length'}">
                        </div>
                    </div>
                </div>
            `;
        }

        getGrades() {
            // Başlangıçta boş döndür, sistem seçimine göre güncellenecek
            return [];
        }

        getDensity(grade) {
            const sistem = document.getElementById('br_sistem')?.value;
            if (!sistem) return 7850;
            
            const materials = this.materials[sistem] || {};
            return materials[grade]?.density || 7850;
        }

        getStandard(grade) {
            const sistem = document.getElementById('br_sistem')?.value;
            if (!sistem) return '-';
            
            const materials = this.materials[sistem] || {};
            return materials[grade]?.standard || '-';
        }

        calculate(formData) {
            const sistem = formData.br_sistem;
            const malzemeCinsi = formData.malzemeCinsi;
            const adet = parseFloat(formData.adet) || 1;
            
            let disCap = 0;
            let etKalinligi = 0;
            let uzunluk = 0;
            
            if (sistem === 'manuel') {
                disCap = parseFloat(formData.br_manuel_dis_cap) || 0;
                etKalinligi = parseFloat(formData.br_manuel_et) || 0;
                uzunluk = parseFloat(formData.br_manuel_uzunluk) || 0;
            } else if (sistem === 'en10220') {
                disCap = parseFloat(formData.br_en_cap) || 0;
                etKalinligi = parseFloat(formData.br_en_et) || 0;
                uzunluk = parseFloat(formData.br_en_uzunluk) || 0;
            } else if (sistem === 'asme') {
                const nps = formData.br_asme_cap;
                const schedule = formData.br_asme_schedule;
                
                if (nps && schedule && this.asmeData[nps]) {
                    disCap = this.asmeData[nps].od;
                    etKalinligi = this.asmeData[nps].schedules[schedule];
                }
                uzunluk = parseFloat(formData.br_asme_uzunluk) || 0;
            }
            
            if (disCap <= 0 || etKalinligi <= 0 || uzunluk <= 0) {
                return null;
            }
            
            const materials = this.materials[sistem] || {};
            const density = materials[malzemeCinsi]?.density || 7850;
            
            // İç çap hesapla
            const icCap = disCap - (2 * etKalinligi);
            
            // Boru kesit alanı (mm²)
            const kesitAlani = Math.PI * ((disCap * disCap) - (icCap * icCap)) / 4;
            
            // Hacim (mm³ -> m³)
            const hacimM3 = (kesitAlani * uzunluk) / 1000000000;
            
            // Ağırlık (kg)
            const birimAgirlik = hacimM3 * density;
            const toplamAgirlik = birimAgirlik * adet;
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                suHacmi: null
            };
        }

        validate(formData) {
            const sistem = formData.br_sistem;
            
            if (!sistem || sistem === '') {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            let disCap = 0;
            let etKalinligi = 0;
            let uzunluk = 0;
            
            if (sistem === 'manuel') {
                disCap = formData.br_manuel_dis_cap;
                etKalinligi = formData.br_manuel_et;
                uzunluk = formData.br_manuel_uzunluk;
                
                if (disCap === undefined || disCap === null || disCap === '' ||
                    etKalinligi === undefined || etKalinligi === null || etKalinligi === '' ||
                    uzunluk === undefined || uzunluk === null || uzunluk === '') {
                    return { isValid: false, message: this.getText('validation_error') };
                }
                
            } else if (sistem === 'en10220') {
                disCap = formData.br_en_cap;
                etKalinligi = formData.br_en_et;
                uzunluk = formData.br_en_uzunluk;
                
                if (disCap === undefined || disCap === null || disCap === '' ||
                    etKalinligi === undefined || etKalinligi === null || etKalinligi === '' ||
                    uzunluk === undefined || uzunluk === null || uzunluk === '') {
                    return { isValid: false, message: this.getText('validation_error') };
                }
                
            } else if (sistem === 'asme') {
                const nps = formData.br_asme_cap;
                const schedule = formData.br_asme_schedule;
                uzunluk = formData.br_asme_uzunluk;
                
                if (!nps || nps === '' || !schedule || schedule === '' ||
                    uzunluk === undefined || uzunluk === null || uzunluk === '') {
                    return { isValid: false, message: this.getText('validation_error') };
                }
            }
            
            // Sayısal değer kontrolü
            const disCapNum = parseFloat(disCap);
            const etKalinligiNum = parseFloat(etKalinligi);
            const uzunlukNum = parseFloat(uzunluk);
            
            if (sistem !== 'asme') {
                if (isNaN(disCapNum) || isNaN(etKalinligiNum) || isNaN(uzunlukNum)) {
                    return { isValid: false, message: this.getText('validation_error') };
                }
                
                if (disCapNum <= 0 || etKalinligiNum <= 0 || uzunlukNum <= 0) {
                    return { isValid: false, message: this.getText('validation_min_error') };
                }
                
                if (etKalinligiNum >= disCapNum / 2) {
                    return { isValid: false, message: this.getText('validation_thickness_error') };
                }
            } else {
                if (isNaN(uzunlukNum) || uzunlukNum <= 0) {
                    return { isValid: false, message: this.getText('validation_min_error') };
                }
            }
            
            return { isValid: true };
        }
        
        formatDimensions(formData) {
            const sistem = formData.br_sistem;
            
            if (sistem === 'manuel') {
                const disCap = parseFloat(formData.br_manuel_dis_cap) || 0;
                const et = parseFloat(formData.br_manuel_et) || 0;
                const uzunluk = parseFloat(formData.br_manuel_uzunluk) || 0;
                
                const disCapStr = disCap % 1 === 0 ? disCap.toString() : disCap.toFixed(1);
                const etStr = et % 1 === 0 ? et.toString() : et.toFixed(1);
                const uzunlukStr = uzunluk % 1 === 0 ? uzunluk.toString() : uzunluk.toFixed(1);
                
                return `Ø${disCapStr} x ${etStr} x ${uzunlukStr}mm`;
                
            } else if (sistem === 'en10220') {
                const disCap = parseFloat(formData.br_en_cap) || 0;
                const et = parseFloat(formData.br_en_et) || 0;
                const uzunluk = parseFloat(formData.br_en_uzunluk) || 0;
                
                const disCapStr = disCap % 1 === 0 ? disCap.toString() : disCap.toFixed(1);
                const etStr = et % 1 === 0 ? et.toString() : et.toFixed(1);
                const uzunlukStr = uzunluk % 1 === 0 ? uzunluk.toString() : uzunluk.toFixed(1);
                
                return `Ø${disCapStr} x ${etStr} x ${uzunlukStr}mm`;
                
            } else if (sistem === 'asme') {
                const nps = formData.br_asme_cap;
                const schedule = formData.br_asme_schedule;
                const uzunluk = parseFloat(formData.br_asme_uzunluk) || 0;
                
                if (nps && schedule && this.asmeData[nps]) {
                    const disCap = this.asmeData[nps].od;
                    const et = this.asmeData[nps].schedules[schedule];
                    
                    const disCapStr = disCap % 1 === 0 ? disCap.toString() : disCap.toFixed(1);
                    const etStr = et % 1 === 0 ? et.toString() : et.toFixed(2);
                    const uzunlukStr = uzunluk % 1 === 0 ? uzunluk.toString() : uzunluk.toFixed(1);
                    
                    return `${nps}(Ø${disCapStr}) x ${etStr} x ${uzunlukStr}mm`;
                }
            }
            
            return '-';
        }

        getDisplayName() {
            return this.getText('display_name');
        }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            
            baseRow.malzemeTuru = this.getDisplayName();
            
            const sistem = formData.br_sistem;
            const materials = this.materials[sistem] || {};
            const material = materials[formData.malzemeCinsi];
            
            if (material) {
                baseRow.enNormu = material.standard;
            }
            
            baseRow.metadata = {
                ...baseRow.metadata,
                boru: {
                    sistem: formData.br_sistem,
                    manuel_dis_cap: formData.br_manuel_dis_cap,
                    manuel_et: formData.br_manuel_et,
                    manuel_uzunluk: formData.br_manuel_uzunluk,
                    en_cap: formData.br_en_cap,
                    en_et: formData.br_en_et,
                    en_uzunluk: formData.br_en_uzunluk,
                    asme_cap: formData.br_asme_cap,
                    asme_schedule: formData.br_asme_schedule,
                    asme_uzunluk: formData.br_asme_uzunluk,
                    yogunluk: material?.density
                }
            };
            
            return baseRow;
        }

        fillFormFromRow(rowData) {
            super.fillFormFromRow(rowData);
            
            const metadata = rowData.metadata?.boru;
            if (!metadata) {
                if (rowData.formData) {
                    this.fillFromFormData(rowData.formData);
                }
                return true;
            }
            
            setTimeout(() => {
                const sistemElement = document.getElementById('br_sistem');
                if (sistemElement && metadata.sistem) {
                    sistemElement.value = metadata.sistem;
                    window.BoruHandlers.onSistemChange();
                }
                
                setTimeout(() => {
                    if (metadata.sistem === 'manuel') {
                        const disCapEl = document.getElementById('br_manuel_dis_cap');
                        const etEl = document.getElementById('br_manuel_et');
                        const uzunlukEl = document.getElementById('br_manuel_uzunluk');
                        
                        if (disCapEl && metadata.manuel_dis_cap) disCapEl.value = metadata.manuel_dis_cap;
                        if (etEl && metadata.manuel_et) etEl.value = metadata.manuel_et;
                        if (uzunlukEl && metadata.manuel_uzunluk) uzunlukEl.value = metadata.manuel_uzunluk;
                        
                    } else if (metadata.sistem === 'en10220') {
                        const capEl = document.getElementById('br_en_cap');
                        if (capEl && metadata.en_cap) {
                            capEl.value = metadata.en_cap;
                            window.BoruHandlers.onENCapChange();
                            
                            setTimeout(() => {
                                const etEl = document.getElementById('br_en_et');
                                if (etEl && metadata.en_et) etEl.value = metadata.en_et;
                            }, 50);
                        }
                        
                        const uzunlukEl = document.getElementById('br_en_uzunluk');
                        if (uzunlukEl && metadata.en_uzunluk) uzunlukEl.value = metadata.en_uzunluk;
                        
                    } else if (metadata.sistem === 'asme') {
                        const capEl = document.getElementById('br_asme_cap');
                        if (capEl && metadata.asme_cap) {
                            capEl.value = metadata.asme_cap;
                            window.BoruHandlers.onASMECapChange();
                            
                            setTimeout(() => {
                                const scheduleEl = document.getElementById('br_asme_schedule');
                                if (scheduleEl && metadata.asme_schedule) scheduleEl.value = metadata.asme_schedule;
                            }, 50);
                        }
                        
                        const uzunlukEl = document.getElementById('br_asme_uzunluk');
                        if (uzunlukEl && metadata.asme_uzunluk) uzunlukEl.value = metadata.asme_uzunluk;
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
                        
                        if (key === 'br_sistem') {
                            window.BoruHandlers.onSistemChange();
                        } else if (key === 'br_en_cap') {
                            setTimeout(() => window.BoruHandlers.onENCapChange(), 50);
                        } else if (key === 'br_asme_cap') {
                            setTimeout(() => window.BoruHandlers.onASMECapChange(), 50);
                        }
                    }
                });
            }, 100);
        }
    }

    const boruMaterial = new BoruMaterial();
    boruMaterial.register();
    
    console.log('Boru modülü v1.0.0 yüklendi (Manuel, EN 10220, ASME B36.10)');

})(window);