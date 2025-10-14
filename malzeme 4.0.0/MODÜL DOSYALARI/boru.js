/**
 * BORU Malzeme Modülü
 * Versiyon: 1.0.0
 * Manuel Giriş, EN 10220 ve ASME B36.10 standartları ile boru hesaplama modülü
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
                    standart_sistemi_label: 'Standart Sistemi',
                    dis_cap_label: 'Dış Çap (mm)',
                    et_kalinligi_label: 'Et Kalınlığı (mm)',
                    uzunluk_label: 'Uzunluk (mm)',
                    nps_label: 'NPS (Nominal Pipe Size)',
                    schedule_label: 'Schedule / Et Kalınlığı',
                    validation_error: 'Lütfen tüm alanları doldurun',
                    validation_min_error: 'Değerler 0\'dan büyük olmalıdır',
                    
                    // Standart sistemleri
                    manuel: 'Manuel Giriş',
                    en10220: 'EN 10220 (Avrupa Standardı)',
                    asme: 'ASME B36.10 (Amerikan Standardı)'
                },
                en: {
                    display_name: 'Pipe',
                    standart_sistemi_label: 'Standard System',
                    dis_cap_label: 'Outside Diameter (mm)',
                    et_kalinligi_label: 'Wall Thickness (mm)',
                    uzunluk_label: 'Length (mm)',
                    nps_label: 'NPS (Nominal Pipe Size)',
                    schedule_label: 'Schedule / Wall Thickness',
                    validation_error: 'Please fill all fields',
                    validation_min_error: 'Values must be greater than 0',
                    
                    // Standard systems
                    manuel: 'Manual Input',
                    en10220: 'EN 10220 (European Standard)',
                    asme: 'ASME B36.10 (American Standard)'
                }
            };
            
            // EN 10220 Standart Dış Çaplar (mm)
            this.en10220Diameters = {
                '21.3': [2.0, 2.3, 2.6, 2.9, 3.2, 3.6, 4.0, 4.5, 5.0],
                '26.9': [2.0, 2.3, 2.6, 2.9, 3.2, 3.6, 4.0, 4.5, 5.0, 5.6],
                '33.7': [2.6, 2.9, 3.2, 3.6, 4.0, 4.5, 5.0, 5.6, 6.3],
                '42.4': [2.6, 2.9, 3.2, 3.6, 4.0, 4.5, 5.0, 5.6, 6.3, 7.1],
                '48.3': [2.6, 2.9, 3.2, 3.6, 4.0, 4.5, 5.0, 5.6, 6.3, 7.1, 8.0],
                '60.3': [2.9, 3.2, 3.6, 4.0, 4.5, 5.0, 5.6, 6.3, 7.1, 8.0, 8.8],
                '76.1': [2.9, 3.2, 3.6, 4.0, 4.5, 5.0, 5.6, 6.3, 7.1, 8.0, 8.8, 10.0],
                '88.9': [3.2, 3.6, 4.0, 4.5, 5.0, 5.6, 6.3, 7.1, 8.0, 8.8, 10.0, 11.0],
                '114.3': [3.6, 4.0, 4.5, 5.0, 5.6, 6.3, 7.1, 8.0, 8.8, 10.0, 11.0, 12.5, 14.2],
                '139.7': [4.0, 4.5, 5.0, 5.6, 6.3, 7.1, 8.0, 8.8, 10.0, 11.0, 12.5, 14.2, 16.0],
                '168.3': [4.5, 5.0, 5.6, 6.3, 7.1, 8.0, 8.8, 10.0, 11.0, 12.5, 14.2, 16.0, 17.5, 20.0],
                '219.1': [5.0, 5.6, 6.3, 7.1, 8.0, 8.8, 10.0, 11.0, 12.5, 14.2, 16.0, 17.5, 20.0, 22.2, 25.0],
                '273.0': [5.6, 6.3, 7.1, 8.0, 8.8, 10.0, 11.0, 12.5, 14.2, 16.0, 17.5, 20.0, 22.2, 25.0, 28.0, 30.0],
                '323.9': [6.3, 7.1, 8.0, 8.8, 10.0, 11.0, 12.5, 14.2, 16.0, 17.5, 20.0, 22.2, 25.0, 28.0, 30.0, 32.0, 36.0],
                '355.6': [6.3, 7.1, 8.0, 8.8, 10.0, 11.0, 12.5, 14.2, 16.0, 17.5, 20.0, 22.2, 25.0, 28.0, 30.0, 32.0, 36.0, 40.0],
                '406.4': [6.3, 7.1, 8.0, 8.8, 10.0, 11.0, 12.5, 14.2, 16.0, 17.5, 20.0, 22.2, 25.0, 28.0, 30.0, 32.0, 36.0, 40.0, 45.0],
                '457.0': [7.1, 8.0, 8.8, 10.0, 11.0, 12.5, 14.2, 16.0, 17.5, 20.0, 22.2, 25.0, 28.0, 30.0, 32.0, 36.0, 40.0, 45.0, 50.0],
                '508.0': [8.0, 8.8, 10.0, 11.0, 12.5, 14.2, 16.0, 17.5, 20.0, 22.2, 25.0, 28.0, 30.0, 32.0, 36.0, 40.0, 45.0, 50.0],
                '610.0': [8.0, 8.8, 10.0, 11.0, 12.5, 14.2, 16.0, 17.5, 20.0, 22.2, 25.0, 28.0, 30.0, 32.0, 36.0, 40.0, 45.0, 50.0]
            };
            
            // ASME B36.10 NPS ve Schedule Bilgileri
            this.asmeData = {
                '1/8': {
                    od: 10.3,
                    schedules: {
                        '40 (STD)': 1.73,
                        '80 (XS)': 2.41
                    }
                },
                '1/4': {
                    od: 13.7,
                    schedules: {
                        '40 (STD)': 2.24,
                        '80 (XS)': 3.02
                    }
                },
                '3/8': {
                    od: 17.1,
                    schedules: {
                        '40 (STD)': 2.31,
                        '80 (XS)': 3.20
                    }
                },
                '1/2': {
                    od: 21.3,
                    schedules: {
                        '5': 1.65,
                        '10': 2.11,
                        '40 (STD)': 2.77,
                        '80 (XS)': 3.73,
                        '160': 4.78,
                        'XXS': 7.47
                    }
                },
                '3/4': {
                    od: 26.7,
                    schedules: {
                        '5': 1.65,
                        '10': 2.11,
                        '40 (STD)': 2.87,
                        '80 (XS)': 3.91,
                        '160': 5.56,
                        'XXS': 7.82
                    }
                },
                '1': {
                    od: 33.4,
                    schedules: {
                        '5': 1.65,
                        '10': 2.77,
                        '40 (STD)': 3.38,
                        '80 (XS)': 4.55,
                        '160': 6.35,
                        'XXS': 9.09
                    }
                },
                '1-1/4': {
                    od: 42.2,
                    schedules: {
                        '5': 1.65,
                        '10': 2.77,
                        '40 (STD)': 3.56,
                        '80 (XS)': 4.85,
                        '160': 6.35,
                        'XXS': 9.70
                    }
                },
                '1-1/2': {
                    od: 48.3,
                    schedules: {
                        '5': 1.65,
                        '10': 2.77,
                        '40 (STD)': 3.68,
                        '80 (XS)': 5.08,
                        '160': 7.14,
                        'XXS': 10.15
                    }
                },
                '2': {
                    od: 60.3,
                    schedules: {
                        '5': 1.65,
                        '10': 2.77,
                        '40 (STD)': 3.91,
                        '80 (XS)': 5.54,
                        '160': 8.74,
                        'XXS': 11.07
                    }
                },
                '2-1/2': {
                    od: 73.0,
                    schedules: {
                        '5': 2.11,
                        '10': 3.05,
                        '40 (STD)': 5.16,
                        '80 (XS)': 7.01,
                        '160': 9.53,
                        'XXS': 14.02
                    }
                },
                '3': {
                    od: 88.9,
                    schedules: {
                        '5': 2.11,
                        '10': 3.05,
                        '40 (STD)': 5.49,
                        '80 (XS)': 7.62,
                        '160': 11.13,
                        'XXS': 15.24
                    }
                },
                '4': {
                    od: 114.3,
                    schedules: {
                        '5': 2.11,
                        '10': 3.05,
                        '40 (STD)': 6.02,
                        '80 (XS)': 8.56,
                        '120': 11.13,
                        '160': 13.49,
                        'XXS': 17.12
                    }
                },
                '5': {
                    od: 141.3,
                    schedules: {
                        '5': 2.77,
                        '10': 3.40,
                        '40 (STD)': 6.55,
                        '80 (XS)': 9.53,
                        '120': 12.70,
                        '160': 15.88,
                        'XXS': 19.05
                    }
                },
                '6': {
                    od: 168.3,
                    schedules: {
                        '5': 2.77,
                        '10': 3.40,
                        '40 (STD)': 7.11,
                        '80 (XS)': 10.97,
                        '120': 14.27,
                        '160': 18.26,
                        'XXS': 21.95
                    }
                },
                '8': {
                    od: 219.1,
                    schedules: {
                        '5': 2.77,
                        '10': 3.76,
                        '20': 6.35,
                        '30': 7.04,
                        '40 (STD)': 8.18,
                        '60': 10.31,
                        '80 (XS)': 12.70,
                        '100': 15.09,
                        '120': 18.26,
                        '140': 20.62,
                        '160': 23.01,
                        'XXS': 22.23
                    }
                },
                '10': {
                    od: 273.0,
                    schedules: {
                        '5': 3.40,
                        '10': 4.19,
                        '20': 6.35,
                        '30': 7.80,
                        '40 (STD)': 9.27,
                        '60 (XS)': 12.70,
                        '80': 15.09,
                        '100': 18.26,
                        '120': 21.44,
                        '140': 25.40,
                        '160': 28.58,
                        'XXS': 25.40
                    }
                },
                '12': {
                    od: 323.9,
                    schedules: {
                        '5': 3.96,
                        '10': 4.57,
                        '20': 6.35,
                        '30 (STD)': 8.38,
                        '40': 9.53,
                        '60 (XS)': 12.70,
                        '80': 14.27,
                        '100': 17.48,
                        '120': 21.44,
                        '140': 25.40,
                        '160': 28.58,
                        'XXS': 25.40
                    }
                },
                '14': {
                    od: 355.6,
                    schedules: {
                        '10': 6.35,
                        '20': 7.92,
                        '30 (STD)': 9.53,
                        '40': 11.13,
                        '60 (XS)': 12.70,
                        '80': 15.09,
                        '100': 19.05,
                        '120': 23.83,
                        '140': 27.79,
                        '160': 31.75
                    }
                },
                '16': {
                    od: 406.4,
                    schedules: {
                        '10': 6.35,
                        '20': 7.92,
                        '30 (STD)': 9.53,
                        '40': 12.70,
                        '60 (XS)': 14.27,
                        '80': 16.66,
                        '100': 21.44,
                        '120': 26.19,
                        '140': 30.96,
                        '160': 36.53
                    }
                },
                '18': {
                    od: 457.0,
                    schedules: {
                        '10': 6.35,
                        '20': 7.92,
                        '30 (STD)': 11.13,
                        '40': 14.27,
                        '60 (XS)': 16.66,
                        '80': 19.05,
                        '100': 23.83,
                        '120': 29.36,
                        '140': 34.93,
                        '160': 39.67
                    }
                },
                '20': {
                    od: 508.0,
                    schedules: {
                        '10': 6.35,
                        '20 (STD)': 9.53,
                        '30': 12.70,
                        '40': 15.09,
                        '60 (XS)': 18.26,
                        '80': 20.62,
                        '100': 26.19,
                        '120': 32.54,
                        '140': 38.10,
                        '160': 44.45
                    }
                },
                '24': {
                    od: 610.0,
                    schedules: {
                        '10': 6.35,
                        '20 (STD)': 9.53,
                        '30': 14.27,
                        '40': 17.48,
                        '60 (XS)': 21.44,
                        '80': 24.61,
                        '100': 30.96,
                        '120': 38.89,
                        '140': 46.02,
                        '160': 52.37
                    }
                }
            };
            
            // Manuel Giriş için tüm malzemeler
            this.manuelMaterials = {
                // Yapı Çelikleri
                'S235JR': { density: 7850, standard: 'EN 10025-2', group: 'structural' },
                'S275JR': { density: 7850, standard: 'EN 10025-2', group: 'structural' },
                'S355JR': { density: 7850, standard: 'EN 10025-2', group: 'structural' },
                'S355J2': { density: 7850, standard: 'EN 10025-2', group: 'structural' },
                
                // Basınçlı Kap Çelikleri
                'P235GH': { density: 7850, standard: 'EN 10028-2', group: 'pressure' },
                'P265GH': { density: 7850, standard: 'EN 10028-2', group: 'pressure' },
                'P295GH': { density: 7850, standard: 'EN 10028-2', group: 'pressure' },
                'P355GH': { density: 7850, standard: 'EN 10028-2', group: 'pressure' },
                '16Mo3': { density: 7850, standard: 'EN 10028-2', group: 'pressure' },
                '13CrMo4-5': { density: 7850, standard: 'EN 10028-2', group: 'pressure' },
                
                // Paslanmaz Çelikler
                '1.4301 (304)': { density: 7900, standard: 'EN 10088-2', group: 'stainless' },
                '1.4401 (316)': { density: 7980, standard: 'EN 10088-2', group: 'stainless' },
                '1.4404 (316L)': { density: 7980, standard: 'EN 10088-2', group: 'stainless' },
                '1.4571 (316Ti)': { density: 7980, standard: 'EN 10088-2', group: 'stainless' },
                
                // Demir Dışı Metaller
                'Aluminyum': { density: 2700, standard: 'EN 485-2', group: 'nonferrous' },
                'Bakır': { density: 8960, standard: 'EN 1652', group: 'nonferrous' },
                'Pirinç': { density: 8400, standard: 'EN 1652', group: 'nonferrous' }
            };
            
            // EN 10220 için malzemeler
            this.en10220Materials = {
                'S235JR': { density: 7850, standard: 'EN 10220 / EN 10025-2' },
                'S275JR': { density: 7850, standard: 'EN 10220 / EN 10025-2' },
                'S355JR': { density: 7850, standard: 'EN 10220 / EN 10025-2' },
                'S355J2': { density: 7850, standard: 'EN 10220 / EN 10025-2' },
                'P235GH': { density: 7850, standard: 'EN 10220 / EN 10028-2' },
                'P265GH': { density: 7850, standard: 'EN 10220 / EN 10028-2' },
                'P295GH': { density: 7850, standard: 'EN 10220 / EN 10028-2' },
                '16Mo3': { density: 7850, standard: 'EN 10220 / EN 10028-2' },
                '13CrMo4-5': { density: 7850, standard: 'EN 10220 / EN 10028-2' },
                '1.4301 (304)': { density: 7900, standard: 'EN 10220 / EN 10088-2' },
                '1.4401 (316)': { density: 7980, standard: 'EN 10220 / EN 10088-2' },
                '1.4404 (316L)': { density: 7980, standard: 'EN 10220 / EN 10088-2' }
            };
            
            // ASME B36.10 için malzemeler
            this.asmeMaterials = {
                'ASTM A53 Gr.A': { density: 7850, standard: 'ASME B36.10 / ASTM A53' },
                'ASTM A53 Gr.B': { density: 7850, standard: 'ASME B36.10 / ASTM A53' },
                'ASTM A106 Gr.A': { density: 7850, standard: 'ASME B36.10 / ASTM A106' },
                'ASTM A106 Gr.B': { density: 7850, standard: 'ASME B36.10 / ASTM A106' },
                'ASTM A106 Gr.C': { density: 7850, standard: 'ASME B36.10 / ASTM A106' },
                'API 5L Gr.B': { density: 7850, standard: 'ASME B36.10 / API 5L' },
                'API 5L X42': { density: 7850, standard: 'ASME B36.10 / API 5L' },
                'API 5L X52': { density: 7850, standard: 'ASME B36.10 / API 5L' },
                'API 5L X60': { density: 7850, standard: 'ASME B36.10 / API 5L' },
                'API 5L X70': { density: 7850, standard: 'ASME B36.10 / API 5L' },
                'ASTM A312 304': { density: 7900, standard: 'ASME B36.19 / ASTM A312' },
                'ASTM A312 316': { density: 7980, standard: 'ASME B36.19 / ASTM A312' },
                'ASTM A312 316L': { density: 7980, standard: 'ASME B36.19 / ASTM A312' }
            };
            
            this.setupEventHandlers();
        }

        setupEventHandlers() {
            const self = this;
            
            window.BoruHandlers = {
                onStandartChange: function() {
                    const standart = document.getElementById('boru_standart').value;
                    
                    // Tüm alanları gizle
                    document.getElementById('boru_manuelContainer').style.display = 'none';
                    document.getElementById('boru_en10220Container').style.display = 'none';
                    document.getElementById('boru_asmeContainer').style.display = 'none';
                    
                    // Malzeme cinsi dropdown'ını güncelle
                    self.updateMaterialGrades(standart);
                    
                    // Seçilen standarda göre alanları göster
                    if (standart === 'manuel') {
                        document.getElementById('boru_manuelContainer').style.display = 'block';
                    } else if (standart === 'en10220') {
                        document.getElementById('boru_en10220Container').style.display = 'block';
                    } else if (standart === 'asme') {
                        document.getElementById('boru_asmeContainer').style.display = 'block';
                    }
                },
                
                onEN10220DiameterChange: function() {
                    const diameter = document.getElementById('boru_en10220_cap').value;
                    const thicknessSelect = document.getElementById('boru_en10220_kalinlik');
                    const lang = self.getCurrentLanguage();
                    
                    thicknessSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Et kalınlığı seçin...' : 'Select wall thickness...'}</option>`;
                    
                    if (diameter && self.en10220Diameters[diameter]) {
                        self.en10220Diameters[diameter].forEach(thickness => {
                            const option = document.createElement('option');
                            option.value = thickness;
                            option.textContent = thickness + ' mm';
                            thicknessSelect.appendChild(option);
                        });
                    }
                },
                
                onASMENPSChange: function() {
                    const nps = document.getElementById('boru_asme_nps').value;
                    const scheduleSelect = document.getElementById('boru_asme_schedule');
                    const lang = self.getCurrentLanguage();
                    
                    scheduleSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Schedule seçin...' : 'Select schedule...'}</option>`;
                    
                    if (nps && self.asmeData[nps]) {
                        Object.keys(self.asmeData[nps].schedules).forEach(schedule => {
                            const thickness = self.asmeData[nps].schedules[schedule];
                            const option = document.createElement('option');
                            option.value = schedule;
                            option.textContent = `${schedule} - ${thickness}mm`;
                            scheduleSelect.appendChild(option);
                        });
                    }
                },
                
                setupEnterKeyHandler: function() {
                    // Boru modülü için özel Enter tuşu handler'ı
                    const boruInputs = [
                        'boru_manuel_dis_cap', 'boru_manuel_et_kalinlik', 'boru_manuel_uzunluk',
                        'boru_en10220_uzunluk', 'boru_asme_uzunluk'
                    ];
                    
                    boruInputs.forEach(inputId => {
                        const element = document.getElementById(inputId);
                        if (element) {
                            element.addEventListener('keydown', function(e) {
                                if (e.key === 'Enter' && !e.ctrlKey && !e.altKey) {
                                    e.preventDefault();
                                    
                                    const malzemeTuru = document.getElementById('malzemeTuru').value;
                                    if (malzemeTuru === 'boru') {
                                        // Hesapla butonuna tıkla
                                        const btnHesapla = document.getElementById('btnHesapla');
                                        if (btnHesapla && !btnHesapla.disabled) {
                                            btnHesapla.click();
                                        }
                                    }
                                }
                            });
                        }
                    });
                }
            };
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            
            // Enter tuşu handler'ını kur
            setTimeout(() => {
                if (window.BoruHandlers && window.BoruHandlers.setupEnterKeyHandler) {
                    window.BoruHandlers.setupEnterKeyHandler();
                }
            }, 200);
            
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="boru_standart">${this.getText('standart_sistemi_label')}</label>
                        <select id="boru_standart" onchange="window.BoruHandlers.onStandartChange()">
                            <option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
                            <option value="manuel">${this.getText('manuel')}</option>
                            <option value="en10220">${this.getText('en10220')}</option>
                            <option value="asme">${this.getText('asme')}</option>
                        </select>
                    </div>
                </div>
                
                <!-- Manuel Giriş Alanları -->
                <div id="boru_manuelContainer" style="display:none;">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="boru_manuel_dis_cap">${this.getText('dis_cap_label')}</label>
                            <input type="number" id="boru_manuel_dis_cap" min="0.1" step="0.1" placeholder="${lang === 'tr' ? 'Dış çap' : 'Outside diameter'}">
                        </div>
                        <div class="form-group">
                            <label for="boru_manuel_et_kalinlik">${this.getText('et_kalinligi_label')}</label>
                            <input type="number" id="boru_manuel_et_kalinlik" min="0.1" step="0.1" placeholder="${lang === 'tr' ? 'Et kalınlığı' : 'Wall thickness'}">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="boru_manuel_uzunluk">${this.getText('uzunluk_label')}</label>
                            <input type="number" id="boru_manuel_uzunluk" min="0.1" step="0.1" placeholder="${lang === 'tr' ? 'Uzunluk' : 'Length'}">
                        </div>
                    </div>
                </div>
                
                <!-- EN 10220 Alanları -->
                <div id="boru_en10220Container" style="display:none;">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="boru_en10220_cap">${this.getText('dis_cap_label')}</label>
                            <select id="boru_en10220_cap" onchange="window.BoruHandlers.onEN10220DiameterChange()">
                                <option value="">${lang === 'tr' ? 'Dış çap seçin...' : 'Select outside diameter...'}</option>
                                ${Object.keys(this.en10220Diameters).map(d => `<option value="${d}">Ø${d} mm</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="boru_en10220_kalinlik">${this.getText('et_kalinligi_label')}</label>
                            <select id="boru_en10220_kalinlik">
                                <option value="">${lang === 'tr' ? 'Önce dış çap seçin' : 'Select diameter first'}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="boru_en10220_uzunluk">${this.getText('uzunluk_label')}</label>
                            <input type="number" id="boru_en10220_uzunluk" min="0.1" step="0.1" placeholder="${lang === 'tr' ? 'Uzunluk' : 'Length'}">
                        </div>
                    </div>
                </div>
                
                <!-- ASME B36.10 Alanları -->
                <div id="boru_asmeContainer" style="display:none;">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="boru_asme_nps">${this.getText('nps_label')}</label>
                            <select id="boru_asme_nps" onchange="window.BoruHandlers.onASMENPSChange()">
                                <option value="">${lang === 'tr' ? 'NPS seçin...' : 'Select NPS...'}</option>
                                ${Object.keys(this.asmeData).map(nps => `<option value="${nps}">${nps}"</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="boru_asme_schedule">${this.getText('schedule_label')}</label>
                            <select id="boru_asme_schedule">
                                <option value="">${lang === 'tr' ? 'Önce NPS seçin' : 'Select NPS first'}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="boru_asme_uzunluk">${this.getText('uzunluk_label')}</label>
                            <input type="number" id="boru_asme_uzunluk" min="0.1" step="0.1" placeholder="${lang === 'tr' ? 'Uzunluk' : 'Length'}">
                        </div>
                    </div>
                </div>
            `;
        }

        getGrades() {
            const standart = document.getElementById('boru_standart')?.value;
            
            if (standart === 'manuel') {
                return this.getManuelGrades();
            } else if (standart === 'en10220') {
                return Object.keys(this.en10220Materials);
            } else if (standart === 'asme') {
                return Object.keys(this.asmeMaterials);
            }
            
            return [];
        }

        getManuelGrades() {
            const lang = this.getCurrentLanguage();
            const organizedGrades = [];
            
            const groups = {
                'structural': lang === 'tr' ? 'Yapı Çelikleri' : 'Structural Steels',
                'pressure': lang === 'tr' ? 'Basınçlı Kap Çelikleri' : 'Pressure Vessel Steels',
                'stainless': lang === 'tr' ? 'Paslanmaz Çelikler' : 'Stainless Steels',
                'nonferrous': lang === 'tr' ? 'Demir Dışı Metaller' : 'Non-Ferrous Metals'
            };
            
            Object.entries(groups).forEach(([groupKey, groupName]) => {
                organizedGrades.push({
                    value: '',
                    text: `--- ${groupName} ---`,
                    disabled: true
                });
                
                Object.keys(this.manuelMaterials).forEach(material => {
                    if (this.manuelMaterials[material].group === groupKey) {
                        let displayText = material;
                        if (lang === 'tr') {
                            displayText = displayText
                                .replace('Aluminyum', 'Alüminyum')
                                .replace('Bakir', 'Bakır')
                                .replace('Pirinc', 'Pirinç');
                        }
                        organizedGrades.push({
                            value: material,
                            text: displayText,
                            disabled: false
                        });
                    }
                });
            });
            
            return organizedGrades;
        }

        updateMaterialGrades(standart) {
            const malzemeCinsiSelect = document.getElementById('malzemeCinsi');
            if (!malzemeCinsiSelect) return;
            
            malzemeCinsiSelect.innerHTML = '';
            
            const grades = this.getGrades();
            
            if (Array.isArray(grades) && grades.length > 0) {
                if (typeof grades[0] === 'object' && grades[0] !== null) {
                    // Gruplu malzemeler (Manuel)
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
                } else {
                    // Düz liste (EN 10220, ASME)
                    const lang = this.getCurrentLanguage();
                    const firstOption = document.createElement('option');
                    firstOption.value = '';
                    firstOption.textContent = lang === 'tr' ? 'Malzeme cinsi seçin...' : 'Select material grade...';
                    malzemeCinsiSelect.appendChild(firstOption);
                    
                    grades.forEach(grade => {
                        const option = document.createElement('option');
                        option.value = grade;
                        option.textContent = grade;
                        malzemeCinsiSelect.appendChild(option);
                    });
                }
            } else {
                const lang = this.getCurrentLanguage();
                const option = document.createElement('option');
                option.value = '';
                option.textContent = lang === 'tr' ? 'Önce standart seçin' : 'Select standard first';
                malzemeCinsiSelect.appendChild(option);
            }
        }

        getDensity(grade, standart) {
            if (standart === 'manuel' && this.manuelMaterials[grade]) {
                return this.manuelMaterials[grade].density;
            } else if (standart === 'en10220' && this.en10220Materials[grade]) {
                return this.en10220Materials[grade].density;
            } else if (standart === 'asme' && this.asmeMaterials[grade]) {
                return this.asmeMaterials[grade].density;
            }
            return 7850; // Varsayılan
        }

        getStandard(grade, standart) {
            if (standart === 'manuel' && this.manuelMaterials[grade]) {
                return this.manuelMaterials[grade].standard;
            } else if (standart === 'en10220' && this.en10220Materials[grade]) {
                return this.en10220Materials[grade].standard;
            } else if (standart === 'asme' && this.asmeMaterials[grade]) {
                return this.asmeMaterials[grade].standard;
            }
            return '-';
        }

        calculate(formData) {
            const standart = formData.boru_standart;
            const malzemeCinsi = formData.malzemeCinsi;
            const adet = parseFloat(formData.adet) || 1;
            
            let disCap = 0;
            let etKalinlik = 0;
            let uzunluk = 0;
            
            // Standarta göre değerleri al
            if (standart === 'manuel') {
                disCap = parseFloat(formData.boru_manuel_dis_cap) || 0;
                etKalinlik = parseFloat(formData.boru_manuel_et_kalinlik) || 0;
                uzunluk = parseFloat(formData.boru_manuel_uzunluk) || 0;
            } else if (standart === 'en10220') {
                disCap = parseFloat(formData.boru_en10220_cap) || 0;
                etKalinlik = parseFloat(formData.boru_en10220_kalinlik) || 0;
                uzunluk = parseFloat(formData.boru_en10220_uzunluk) || 0;
            } else if (standart === 'asme') {
                const nps = formData.boru_asme_nps;
                const schedule = formData.boru_asme_schedule;
                
                if (nps && schedule && this.asmeData[nps]) {
                    disCap = this.asmeData[nps].od;
                    etKalinlik = this.asmeData[nps].schedules[schedule];
                    uzunluk = parseFloat(formData.boru_asme_uzunluk) || 0;
                }
            }
            
            if (disCap <= 0 || etKalinlik <= 0 || uzunluk <= 0) {
                return null;
            }
            
            // Yoğunluğu al
            const density = this.getDensity(malzemeCinsi, standart);
            
            // İç çap hesapla
            const icCap = disCap - (2 * etKalinlik);
            
            if (icCap <= 0) {
                return null;
            }
            
            // Hacim hesaplamaları (mm³ -> m³)
            const disYariCap = disCap / 2;
            const icYariCap = icCap / 2;
            
            // Metal hacmi (dış silindir - iç silindir)
            const disHacim = Math.PI * disYariCap * disYariCap * uzunluk;
            const icHacim = Math.PI * icYariCap * icYariCap * uzunluk;
            const metalHacim = (disHacim - icHacim) / 1000000000; // mm³ -> m³
            
            // Su hacmi (iç hacim) - Litre cinsinden
            const suHacmi = icHacim / 1000000; // mm³ -> L
            
            // Ağırlık hesaplama
            const birimAgirlik = metalHacim * density;
            const toplamAgirlik = birimAgirlik * adet;
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                suHacmi: suHacmi
            };
        }

        validate(formData) {
            const standart = formData.boru_standart;
            
            if (!standart) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            if (standart === 'manuel') {
                const disCap = formData.boru_manuel_dis_cap;
                const etKalinlik = formData.boru_manuel_et_kalinlik;
                const uzunluk = formData.boru_manuel_uzunluk;
                
                if (!disCap || !etKalinlik || !uzunluk) {
                    return {
                        isValid: false,
                        message: this.getText('validation_error')
                    };
                }
                
                const disCapNum = parseFloat(disCap);
                const etKalinlikNum = parseFloat(etKalinlik);
                const uzunlukNum = parseFloat(uzunluk);
                
                if (isNaN(disCapNum) || isNaN(etKalinlikNum) || isNaN(uzunlukNum)) {
                    return {
                        isValid: false,
                        message: this.getText('validation_error')
                    };
                }
                
                if (disCapNum <= 0 || etKalinlikNum <= 0 || uzunlukNum <= 0) {
                    return {
                        isValid: false,
                        message: this.getText('validation_min_error')
                    };
                }
                
                if (etKalinlikNum >= disCapNum / 2) {
                    const lang = this.getCurrentLanguage();
                    return {
                        isValid: false,
                        message: lang === 'tr' ? 'Et kalınlığı dış çapın yarısından küçük olmalıdır' : 'Wall thickness must be less than half of outside diameter'
                    };
                }
                
            } else if (standart === 'en10220') {
                const disCap = formData.boru_en10220_cap;
                const etKalinlik = formData.boru_en10220_kalinlik;
                const uzunluk = formData.boru_en10220_uzunluk;
                
                if (!disCap || !etKalinlik || !uzunluk) {
                    return {
                        isValid: false,
                        message: this.getText('validation_error')
                    };
                }
                
                const uzunlukNum = parseFloat(uzunluk);
                
                if (isNaN(uzunlukNum) || uzunlukNum <= 0) {
                    return {
                        isValid: false,
                        message: this.getText('validation_min_error')
                    };
                }
                
            } else if (standart === 'asme') {
                const nps = formData.boru_asme_nps;
                const schedule = formData.boru_asme_schedule;
                const uzunluk = formData.boru_asme_uzunluk;
                
                if (!nps || !schedule || !uzunluk) {
                    return {
                        isValid: false,
                        message: this.getText('validation_error')
                    };
                }
                
                const uzunlukNum = parseFloat(uzunluk);
                
                if (isNaN(uzunlukNum) || uzunlukNum <= 0) {
                    return {
                        isValid: false,
                        message: this.getText('validation_min_error')
                    };
                }
            }
            
            return { isValid: true };
        }
        
        formatDimensions(formData) {
            const standart = formData.boru_standart;
            
            if (standart === 'manuel') {
                const disCap = parseFloat(formData.boru_manuel_dis_cap) || 0;
                const etKalinlik = parseFloat(formData.boru_manuel_et_kalinlik) || 0;
                const uzunluk = parseFloat(formData.boru_manuel_uzunluk) || 0;
                
                const disCapStr = disCap % 1 === 0 ? disCap.toString() : disCap.toFixed(1);
                const etKalinlikStr = etKalinlik % 1 === 0 ? etKalinlik.toString() : etKalinlik.toFixed(1);
                const uzunlukStr = uzunluk % 1 === 0 ? uzunluk.toString() : uzunluk.toFixed(1);
                
                return `Ø${disCapStr} x ${etKalinlikStr} x ${uzunlukStr}mm`;
                
            } else if (standart === 'en10220') {
                const disCap = parseFloat(formData.boru_en10220_cap) || 0;
                const etKalinlik = parseFloat(formData.boru_en10220_kalinlik) || 0;
                const uzunluk = parseFloat(formData.boru_en10220_uzunluk) || 0;
                
                const disCapStr = disCap % 1 === 0 ? disCap.toString() : disCap.toFixed(1);
                const etKalinlikStr = etKalinlik % 1 === 0 ? etKalinlik.toString() : etKalinlik.toFixed(1);
                const uzunlukStr = uzunluk % 1 === 0 ? uzunluk.toString() : uzunluk.toFixed(1);
                
                return `Ø${disCapStr} x ${etKalinlikStr} x ${uzunlukStr}mm`;
                
            } else if (standart === 'asme') {
                const nps = formData.boru_asme_nps;
                const schedule = formData.boru_asme_schedule;
                const uzunluk = parseFloat(formData.boru_asme_uzunluk) || 0;
                
                if (nps && schedule && this.asmeData[nps]) {
                    const od = this.asmeData[nps].od;
                    const wt = this.asmeData[nps].schedules[schedule];
                    
                    const odStr = od % 1 === 0 ? od.toString() : od.toFixed(1);
                    const wtStr = wt % 1 === 0 ? wt.toString() : wt.toFixed(1);
                    const uzunlukStr = uzunluk % 1 === 0 ? uzunluk.toString() : uzunluk.toFixed(1);
                    
                    return `${nps}"(Ø${odStr}) x ${wtStr} x ${uzunlukStr}mm`;
                }
            }
            
            return '-';
        }

        hasWaterVolume() {
            return true;
        }

        getDisplayName() {
            return this.getText('display_name');
        }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            const standart = formData.boru_standart;
            
            // Malzeme türünü her zaman Boru olarak ayarla
            baseRow.malzemeTuru = this.getDisplayName();
            
            // Standart bilgisini malzemeye göre ayarla
            baseRow.enNormu = this.getStandard(formData.malzemeCinsi, standart);
            
            // Metadata'yı genişlet
            baseRow.metadata = {
                ...baseRow.metadata,
                boru: {
                    standart: standart,
                    manuel_dis_cap: formData.boru_manuel_dis_cap,
                    manuel_et_kalinlik: formData.boru_manuel_et_kalinlik,
                    manuel_uzunluk: formData.boru_manuel_uzunluk,
                    en10220_cap: formData.boru_en10220_cap,
                    en10220_kalinlik: formData.boru_en10220_kalinlik,
                    en10220_uzunluk: formData.boru_en10220_uzunluk,
                    asme_nps: formData.boru_asme_nps,
                    asme_schedule: formData.boru_asme_schedule,
                    asme_uzunluk: formData.boru_asme_uzunluk
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
                const standartElement = document.getElementById('boru_standart');
                if (standartElement && metadata.standart) {
                    standartElement.value = metadata.standart;
                    window.BoruHandlers.onStandartChange();
                }
                
                setTimeout(() => {
                    if (metadata.standart === 'manuel') {
                        if (metadata.manuel_dis_cap) document.getElementById('boru_manuel_dis_cap').value = metadata.manuel_dis_cap;
                        if (metadata.manuel_et_kalinlik) document.getElementById('boru_manuel_et_kalinlik').value = metadata.manuel_et_kalinlik;
                        if (metadata.manuel_uzunluk) document.getElementById('boru_manuel_uzunluk').value = metadata.manuel_uzunluk;
                        
                    } else if (metadata.standart === 'en10220') {
                        if (metadata.en10220_cap) {
                            document.getElementById('boru_en10220_cap').value = metadata.en10220_cap;
                            window.BoruHandlers.onEN10220DiameterChange();
                        }
                        
                        setTimeout(() => {
                            if (metadata.en10220_kalinlik) document.getElementById('boru_en10220_kalinlik').value = metadata.en10220_kalinlik;
                            if (metadata.en10220_uzunluk) document.getElementById('boru_en10220_uzunluk').value = metadata.en10220_uzunluk;
                        }, 100);
                        
                    } else if (metadata.standart === 'asme') {
                        if (metadata.asme_nps) {
                            document.getElementById('boru_asme_nps').value = metadata.asme_nps;
                            window.BoruHandlers.onASMENPSChange();
                        }
                        
                        setTimeout(() => {
                            if (metadata.asme_schedule) document.getElementById('boru_asme_schedule').value = metadata.asme_schedule;
                            if (metadata.asme_uzunluk) document.getElementById('boru_asme_uzunluk').value = metadata.asme_uzunluk;
                        }, 100);
                    }
                    
                    // Enter tuşu handler'ını kur
                    setTimeout(() => {
                        if (window.BoruHandlers && window.BoruHandlers.setupEnterKeyHandler) {
                            window.BoruHandlers.setupEnterKeyHandler();
                        }
                    }, 200);
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
                        
                        if (key === 'boru_standart') {
                            window.BoruHandlers.onStandartChange();
                        } else if (key === 'boru_en10220_cap') {
                            window.BoruHandlers.onEN10220DiameterChange();
                        } else if (key === 'boru_asme_nps') {
                            window.BoruHandlers.onASMENPSChange();
                        }
                    }
                });
                
                // Enter tuşu handler'ını kur
                setTimeout(() => {
                    if (window.BoruHandlers && window.BoruHandlers.setupEnterKeyHandler) {
                        window.BoruHandlers.setupEnterKeyHandler();
                    }
                }, 200);
            }, 100);
        }
    }

    const boruMaterial = new BoruMaterial();
    boruMaterial.register();
    
    console.log('Boru modülü v1.0.0 yüklendi (Manuel, EN 10220, ASME B36.10)');

})(window);