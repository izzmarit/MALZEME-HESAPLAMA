/**
 * VANA Malzeme Modülü
 * 7 Vana Tipi: Kapak, Küre, Kelebek, Küresel, Çek, Emniyet, İğne
 * EN ve ASME Standartları
 * Flanşlı ve Dişli Bağlantılar
 */

(function(window) {
    'use strict';
    
    class VanaMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'vana';
            
            // Dil metinleri
            this.texts = {
                tr: {
                    display_name: 'Vana',
                    vana_tipi_label: 'Vana Tipi',
                    standart_sistem_label: 'Standart Sistemi',
                    baglanti_tipi_label: 'Bağlantı Tipi',
                    boyut_label: 'Nominal Boyut',
                    basinc_label: 'Basınç Sınıfı',
                    set_basinc_label: 'Set Basıncı (bar)',
                    validation_error: 'Tüm alanlar seçilmelidir',
                    select_valve_type: 'Vana tipi seçin',
                    select_standard: 'Standart seçin',
                    select_connection: 'Bağlantı tipi seçin',
                    select_size: 'Boyut seçin',
                    select_pressure: 'Basınç sınıfı seçin',
                    weight_info: 'Katalog Ağırlık',
                    standard_info: 'Standart',
                    // Vana tipleri
                    gate_valve: 'Gate Vana',
                    ball_valve: 'Küre Vana',
                    butterfly_valve: 'Kelebek Vana',
                    globe_valve: 'Küresel Vana',
                    check_valve: 'Çek Vana',
                    safety_valve: 'Emniyet Vanası',
                    needle_valve: 'İğne Vana',
                    // Standartlar
                    en_standard: 'EN / DIN',
                    asme_standard: 'ASME / API',
                    // Bağlantı tipleri
                    flanged: 'Flanşlı',
                    threaded: 'Dişli',
                    wafer: 'Wafer',
                    welded: 'Kaynaklı'
                },
                en: {
                    display_name: 'Valve',
                    vana_tipi_label: 'Valve Type',
                    standart_sistem_label: 'Standard System',
                    baglanti_tipi_label: 'Connection Type',
                    boyut_label: 'Nominal Size',
                    basinc_label: 'Pressure Class',
                    set_basinc_label: 'Set Pressure (bar)',
                    validation_error: 'All fields must be selected',
                    select_valve_type: 'Select valve type',
                    select_standard: 'Select standard',
                    select_connection: 'Select connection type',
                    select_size: 'Select size',
                    select_pressure: 'Select pressure class',
                    weight_info: 'Catalog Weight',
                    standard_info: 'Standard',
                    // Valve types
                    gate_valve: 'Gate Valve',
                    ball_valve: 'Ball Valve',
                    butterfly_valve: 'Butterfly Valve',
                    globe_valve: 'Globe Valve',
                    check_valve: 'Check Valve',
                    safety_valve: 'Safety Valve',
                    needle_valve: 'Needle Valve',
                    // Standards
                    en_standard: 'EN / DIN',
                    asme_standard: 'ASME / API',
                    // Connection types
                    flanged: 'Flanged',
                    threaded: 'Threaded',
                    wafer: 'Wafer',
                    welded: 'Welded'
                }
            };
            
            // Malzeme cinsleri
            this.grades = [
                // Dökme Demir
                'GG25 (EN-GJL-250)', 'GGG40 (EN-GJS-400)', 'GGG50 (EN-GJS-500)',
                // Karbon Çelik
                'WCB (A216)', 'WCC (A216)', 'LCB (A352)',
                // Paslanmaz Çelik
                'CF8 (304)', 'CF8M (316)', 'CF3 (304L)', 'CF3M (316L)',
                // Alaşımlı Çelik
                'WC6 (1.25Cr-0.5Mo)', 'WC9 (2.25Cr-1Mo)', 'C5 (5Cr-0.5Mo)',
                // Pirinç ve Bronz
                'Pirinç (CW617N)', 'Bronz (CC491K)'
            ];
            
            // Yoğunluklar
            this.densities = {
                'GG25 (EN-GJL-250)': 7200, 'GGG40 (EN-GJS-400)': 7100, 'GGG50 (EN-GJS-500)': 7100,
                'WCB (A216)': 7850, 'WCC (A216)': 7850, 'LCB (A352)': 7850,
                'CF8 (304)': 8000, 'CF8M (316)': 8000, 'CF3 (304L)': 8000, 'CF3M (316L)': 8000,
                'WC6 (1.25Cr-0.5Mo)': 7850, 'WC9 (2.25Cr-1Mo)': 7850, 'C5 (5Cr-0.5Mo)': 7850,
                'Pirinç (CW617N)': 8500, 'Bronz (CC491K)': 8800
            };
            
            // Standartlar
            this.standards = {
                'GG25 (EN-GJL-250)': 'EN 1561', 'GGG40 (EN-GJS-400)': 'EN 1563', 'GGG50 (EN-GJS-500)': 'EN 1563',
                'WCB (A216)': 'ASME A216', 'WCC (A216)': 'ASME A216', 'LCB (A352)': 'ASME A352',
                'CF8 (304)': 'ASME A351', 'CF8M (316)': 'ASME A351', 'CF3 (304L)': 'ASME A351', 'CF3M (316L)': 'ASME A351',
                'WC6 (1.25Cr-0.5Mo)': 'ASME A217', 'WC9 (2.25Cr-1Mo)': 'ASME A217', 'C5 (5Cr-0.5Mo)': 'ASME A217',
                'Pirinç (CW617N)': 'EN 12165', 'Bronz (CC491K)': 'EN 1982'
            };
            
            // Vana ağırlık verileri - Kapsamlı katalog
            this.initializeValveData();
        }

        initializeValveData() {
            // 1. KAPAK VANA (Gate Valve) Ağırlıkları - EN Flanşlı (kg)
            this.gateValveEN = {
                'flanged': {
                    '15': { 'PN10': 3.5, 'PN16': 3.8, 'PN25': 4.2, 'PN40': 4.8, 'PN63': 6.5 },
                    '20': { 'PN10': 4.2, 'PN16': 4.5, 'PN25': 5.0, 'PN40': 5.8, 'PN63': 7.8 },
                    '25': { 'PN10': 5.5, 'PN16': 6.0, 'PN25': 6.8, 'PN40': 7.8, 'PN63': 10.5 },
                    '32': { 'PN10': 7.2, 'PN16': 7.8, 'PN25': 8.8, 'PN40': 10.2, 'PN63': 13.8 },
                    '40': { 'PN10': 8.5, 'PN16': 9.2, 'PN25': 10.5, 'PN40': 12.2, 'PN63': 16.5 },
                    '50': { 'PN10': 11.5, 'PN16': 12.5, 'PN25': 14.5, 'PN40': 17.0, 'PN63': 23.0 },
                    '65': { 'PN10': 16.5, 'PN16': 18.0, 'PN25': 21.0, 'PN40': 25.0, 'PN63': 34.0 },
                    '80': { 'PN10': 21.0, 'PN16': 23.0, 'PN25': 27.0, 'PN40': 32.0, 'PN63': 43.0 },
                    '100': { 'PN10': 32.0, 'PN16': 35.0, 'PN25': 41.0, 'PN40': 49.0, 'PN63': 66.0 },
                    '125': { 'PN10': 48.0, 'PN16': 53.0, 'PN25': 62.0, 'PN40': 74.0, 'PN63': 100.0 },
                    '150': { 'PN10': 68.0, 'PN16': 75.0, 'PN25': 88.0, 'PN40': 105.0, 'PN63': 142.0 },
                    '200': { 'PN10': 115.0, 'PN16': 128.0, 'PN25': 150.0, 'PN40': 180.0, 'PN63': 243.0 },
                    '250': { 'PN10': 180.0, 'PN16': 200.0, 'PN25': 235.0, 'PN40': 282.0, 'PN63': 380.0 },
                    '300': { 'PN10': 260.0, 'PN16': 290.0, 'PN25': 340.0, 'PN40': 408.0, 'PN63': 550.0 },
                    '350': { 'PN10': 350.0, 'PN16': 390.0, 'PN25': 458.0, 'PN40': 550.0 },
                    '400': { 'PN10': 460.0, 'PN16': 510.0, 'PN25': 600.0, 'PN40': 720.0 },
                    '500': { 'PN10': 720.0, 'PN16': 800.0, 'PN25': 940.0, 'PN40': 1128.0 },
                    '600': { 'PN10': 1050.0, 'PN16': 1170.0, 'PN25': 1375.0, 'PN40': 1650.0 }
                },
                'threaded': {
                    '15': { 'PN16': 0.8, 'PN25': 1.0, 'PN40': 1.2 },
                    '20': { 'PN16': 1.2, 'PN25': 1.5, 'PN40': 1.8 },
                    '25': { 'PN16': 1.8, 'PN25': 2.2, 'PN40': 2.6 },
                    '32': { 'PN16': 2.8, 'PN25': 3.5, 'PN40': 4.2 },
                    '40': { 'PN16': 3.8, 'PN25': 4.8, 'PN40': 5.7 },
                    '50': { 'PN16': 6.5, 'PN25': 8.2, 'PN40': 9.8 }
                }
            };

            // KAPAK VANA - ASME Flanşlı (kg)
            this.gateValveASME = {
                'flanged': {
                    '15': { 'Class 150': 3.8, 'Class 300': 5.5, 'Class 600': 8.5, 'Class 900': 12.0, 'Class 1500': 18.0 },
                    '20': { 'Class 150': 4.8, 'Class 300': 7.0, 'Class 600': 11.0, 'Class 900': 15.5, 'Class 1500': 23.0 },
                    '25': { 'Class 150': 6.5, 'Class 300': 9.5, 'Class 600': 15.0, 'Class 900': 21.0, 'Class 1500': 32.0 },
                    '32': { 'Class 150': 8.5, 'Class 300': 12.5, 'Class 600': 19.5, 'Class 900': 27.5, 'Class 1500': 42.0 },
                    '40': { 'Class 150': 10.0, 'Class 300': 15.0, 'Class 600': 23.5, 'Class 900': 33.0, 'Class 1500': 50.0 },
                    '50': { 'Class 150': 14.0, 'Class 300': 21.0, 'Class 600': 33.0, 'Class 900': 46.0, 'Class 1500': 70.0 },
                    '65': { 'Class 150': 20.0, 'Class 300': 30.0, 'Class 600': 47.0, 'Class 900': 66.0, 'Class 1500': 100.0 },
                    '80': { 'Class 150': 26.0, 'Class 300': 39.0, 'Class 600': 61.0, 'Class 900': 85.0, 'Class 1500': 130.0 },
                    '100': { 'Class 150': 38.0, 'Class 300': 57.0, 'Class 600': 89.0, 'Class 900': 125.0, 'Class 1500': 190.0 },
                    '125': { 'Class 150': 58.0, 'Class 300': 87.0, 'Class 600': 136.0, 'Class 900': 190.0, 'Class 1500': 290.0 },
                    '150': { 'Class 150': 82.0, 'Class 300': 123.0, 'Class 600': 193.0, 'Class 900': 270.0, 'Class 1500': 410.0 },
                    '200': { 'Class 150': 140.0, 'Class 300': 210.0, 'Class 600': 330.0, 'Class 900': 462.0, 'Class 1500': 700.0 },
                    '250': { 'Class 150': 220.0, 'Class 300': 330.0, 'Class 600': 517.0, 'Class 900': 725.0, 'Class 1500': 1100.0 },
                    '300': { 'Class 150': 318.0, 'Class 300': 477.0, 'Class 600': 748.0, 'Class 900': 1050.0, 'Class 1500': 1590.0 }
                },
                'threaded': {
                    '15': { 'Class 150': 0.9, 'Class 300': 1.4 },
                    '20': { 'Class 150': 1.4, 'Class 300': 2.1 },
                    '25': { 'Class 150': 2.0, 'Class 300': 3.0 },
                    '32': { 'Class 150': 3.2, 'Class 300': 4.8 },
                    '40': { 'Class 150': 4.5, 'Class 300': 6.8 },
                    '50': { 'Class 150': 7.5, 'Class 300': 11.3 }
                }
            };

            // 2. KÜRE VANA (Ball Valve) Ağırlıkları - EN Flanşlı (kg)
            this.ballValveEN = {
                'flanged': {
                    '15': { 'PN16': 2.2, 'PN25': 2.5, 'PN40': 2.9, 'PN63': 3.8 },
                    '20': { 'PN16': 2.8, 'PN25': 3.2, 'PN40': 3.7, 'PN63': 4.9 },
                    '25': { 'PN16': 3.8, 'PN25': 4.4, 'PN40': 5.1, 'PN63': 6.8 },
                    '32': { 'PN16': 5.2, 'PN25': 6.0, 'PN40': 7.0, 'PN63': 9.3 },
                    '40': { 'PN16': 6.5, 'PN25': 7.5, 'PN40': 8.8, 'PN63': 11.7 },
                    '50': { 'PN16': 9.5, 'PN25': 11.0, 'PN40': 12.8, 'PN63': 17.0 },
                    '65': { 'PN16': 14.0, 'PN25': 16.2, 'PN40': 18.9, 'PN63': 25.2 },
                    '80': { 'PN16': 18.5, 'PN25': 21.4, 'PN40': 25.0, 'PN63': 33.3 },
                    '100': { 'PN16': 28.0, 'PN25': 32.4, 'PN40': 37.8, 'PN63': 50.4 },
                    '125': { 'PN16': 43.0, 'PN25': 49.8, 'PN40': 58.1, 'PN63': 77.5 },
                    '150': { 'PN16': 62.0, 'PN25': 71.8, 'PN40': 83.7, 'PN63': 111.6 },
                    '200': { 'PN16': 108.0, 'PN25': 125.0, 'PN40': 146.0, 'PN63': 194.0 },
                    '250': { 'PN16': 172.0, 'PN25': 199.0, 'PN40': 232.0 },
                    '300': { 'PN16': 250.0, 'PN25': 289.0, 'PN40': 337.0 }
                },
                'threaded': {
                    '15': { 'PN40': 0.5, 'PN63': 0.7 },
                    '20': { 'PN40': 0.8, 'PN63': 1.0 },
                    '25': { 'PN40': 1.2, 'PN63': 1.6 },
                    '32': { 'PN40': 2.0, 'PN63': 2.7 },
                    '40': { 'PN40': 2.8, 'PN63': 3.7 },
                    '50': { 'PN40': 4.8, 'PN63': 6.4 }
                }
            };

            // KÜRE VANA - ASME Flanşlı (kg)
            this.ballValveASME = {
                'flanged': {
                    '15': { 'Class 150': 2.5, 'Class 300': 3.5, 'Class 600': 5.0 },
                    '20': { 'Class 150': 3.2, 'Class 300': 4.5, 'Class 600': 6.5 },
                    '25': { 'Class 150': 4.5, 'Class 300': 6.3, 'Class 600': 9.0 },
                    '32': { 'Class 150': 6.0, 'Class 300': 8.4, 'Class 600': 12.0 },
                    '40': { 'Class 150': 7.5, 'Class 300': 10.5, 'Class 600': 15.0 },
                    '50': { 'Class 150': 11.0, 'Class 300': 15.4, 'Class 600': 22.0 },
                    '65': { 'Class 150': 16.5, 'Class 300': 23.1, 'Class 600': 33.0 },
                    '80': { 'Class 150': 22.0, 'Class 300': 30.8, 'Class 600': 44.0 },
                    '100': { 'Class 150': 33.0, 'Class 300': 46.2, 'Class 600': 66.0 },
                    '125': { 'Class 150': 51.0, 'Class 300': 71.4, 'Class 600': 102.0 },
                    '150': { 'Class 150': 73.0, 'Class 300': 102.0, 'Class 600': 146.0 },
                    '200': { 'Class 150': 127.0, 'Class 300': 178.0, 'Class 600': 254.0 },
                    '250': { 'Class 150': 203.0, 'Class 300': 284.0 },
                    '300': { 'Class 150': 295.0, 'Class 300': 413.0 }
                },
                'threaded': {
                    '15': { 'Class 150': 0.6 },
                    '20': { 'Class 150': 0.9 },
                    '25': { 'Class 150': 1.4 },
                    '32': { 'Class 150': 2.3 },
                    '40': { 'Class 150': 3.2 },
                    '50': { 'Class 150': 5.5 }
                }
            };

            // 3. KELEBEk VANA (Butterfly Valve) Ağırlıkları - EN Wafer (kg)
            this.butterflyValveEN = {
                'wafer': {
                    '40': { 'PN10': 2.5, 'PN16': 2.8, 'PN25': 3.2 },
                    '50': { 'PN10': 3.2, 'PN16': 3.6, 'PN25': 4.1 },
                    '65': { 'PN10': 4.5, 'PN16': 5.0, 'PN25': 5.8 },
                    '80': { 'PN10': 5.8, 'PN16': 6.5, 'PN25': 7.5 },
                    '100': { 'PN10': 8.5, 'PN16': 9.5, 'PN25': 11.0 },
                    '125': { 'PN10': 12.5, 'PN16': 14.0, 'PN25': 16.2 },
                    '150': { 'PN10': 17.0, 'PN16': 19.0, 'PN25': 22.0 },
                    '200': { 'PN10': 28.0, 'PN16': 31.5, 'PN25': 36.5 },
                    '250': { 'PN10': 42.0, 'PN16': 47.0, 'PN25': 54.5 },
                    '300': { 'PN10': 58.0, 'PN16': 65.0, 'PN25': 75.0 },
                    '350': { 'PN10': 76.0, 'PN16': 85.0, 'PN25': 98.5 },
                    '400': { 'PN10': 96.0, 'PN16': 108.0, 'PN25': 125.0 },
                    '500': { 'PN10': 145.0, 'PN16': 163.0, 'PN25': 189.0 },
                    '600': { 'PN10': 205.0, 'PN16': 230.0, 'PN25': 267.0 },
                    '700': { 'PN10': 280.0, 'PN16': 315.0 },
                    '800': { 'PN10': 365.0, 'PN16': 410.0 },
                    '1000': { 'PN10': 570.0, 'PN16': 640.0 },
                    '1200': { 'PN10': 820.0, 'PN16': 920.0 }
                },
                'flanged': {
                    '50': { 'PN10': 4.5, 'PN16': 5.0, 'PN25': 5.8 },
                    '65': { 'PN10': 6.5, 'PN16': 7.2, 'PN25': 8.3 },
                    '80': { 'PN10': 8.5, 'PN16': 9.5, 'PN25': 11.0 },
                    '100': { 'PN10': 12.5, 'PN16': 14.0, 'PN25': 16.2 },
                    '125': { 'PN10': 18.0, 'PN16': 20.2, 'PN25': 23.4 },
                    '150': { 'PN10': 24.5, 'PN16': 27.5, 'PN25': 31.8 },
                    '200': { 'PN10': 40.5, 'PN16': 45.5, 'PN25': 52.7 },
                    '250': { 'PN10': 60.5, 'PN16': 68.0, 'PN25': 78.7 },
                    '300': { 'PN10': 83.5, 'PN16': 93.8, 'PN25': 108.5 }
                }
            };

            // KELEBEk VANA - ASME Wafer (kg)
            this.butterflyValveASME = {
                'wafer': {
                    '50': { 'Class 150': 3.8, 'Class 300': 5.5 },
                    '65': { 'Class 150': 5.3, 'Class 300': 7.7 },
                    '80': { 'Class 150': 6.8, 'Class 300': 9.9 },
                    '100': { 'Class 150': 10.0, 'Class 300': 14.5 },
                    '125': { 'Class 150': 14.8, 'Class 300': 21.5 },
                    '150': { 'Class 150': 20.0, 'Class 300': 29.0 },
                    '200': { 'Class 150': 33.0, 'Class 300': 48.0 },
                    '250': { 'Class 150': 49.5, 'Class 300': 72.0 },
                    '300': { 'Class 150': 68.5, 'Class 300': 99.5 },
                    '350': { 'Class 150': 89.5, 'Class 300': 130.0 },
                    '400': { 'Class 150': 113.0, 'Class 300': 164.5 },
                    '500': { 'Class 150': 171.0, 'Class 300': 248.5 },
                    '600': { 'Class 150': 242.0, 'Class 300': 351.5 }
                },
                'flanged': {
                    '50': { 'Class 150': 5.3, 'Class 300': 7.7 },
                    '65': { 'Class 150': 7.7, 'Class 300': 11.2 },
                    '80': { 'Class 150': 10.0, 'Class 300': 14.5 },
                    '100': { 'Class 150': 14.8, 'Class 300': 21.5 },
                    '125': { 'Class 150': 21.2, 'Class 300': 30.8 },
                    '150': { 'Class 150': 28.8, 'Class 300': 41.8 },
                    '200': { 'Class 150': 47.8, 'Class 300': 69.5 },
                    '250': { 'Class 150': 71.3, 'Class 300': 103.5 },
                    '300': { 'Class 150': 98.5, 'Class 300': 143.0 }
                }
            };

            // 4. KÜRESEL VANA (Globe Valve) Ağırlıkları - EN Flanşlı (kg)
            this.globeValveEN = {
                'flanged': {
                    '15': { 'PN16': 3.8, 'PN25': 4.5, 'PN40': 5.2, 'PN63': 7.0 },
                    '20': { 'PN16': 4.8, 'PN25': 5.7, 'PN40': 6.6, 'PN63': 8.9 },
                    '25': { 'PN16': 6.5, 'PN25': 7.7, 'PN40': 8.9, 'PN63': 12.0 },
                    '32': { 'PN16': 8.8, 'PN25': 10.4, 'PN40': 12.1, 'PN63': 16.3 },
                    '40': { 'PN16': 11.0, 'PN25': 13.0, 'PN40': 15.1, 'PN63': 20.4 },
                    '50': { 'PN16': 16.0, 'PN25': 19.0, 'PN40': 22.0, 'PN63': 29.7 },
                    '65': { 'PN16': 24.0, 'PN25': 28.5, 'PN40': 33.0, 'PN63': 44.5 },
                    '80': { 'PN16': 32.0, 'PN25': 38.0, 'PN40': 44.0, 'PN63': 59.4 },
                    '100': { 'PN16': 50.0, 'PN25': 59.3, 'PN40': 68.8, 'PN63': 92.8 },
                    '125': { 'PN16': 78.0, 'PN25': 92.5, 'PN40': 107.3, 'PN63': 144.8 },
                    '150': { 'PN16': 112.0, 'PN25': 133.0, 'PN40': 154.3, 'PN63': 208.2 },
                    '200': { 'PN16': 195.0, 'PN25': 231.5, 'PN40': 268.5, 'PN63': 362.3 },
                    '250': { 'PN16': 310.0, 'PN25': 368.0, 'PN40': 427.0 },
                    '300': { 'PN16': 455.0, 'PN25': 540.0, 'PN40': 626.5 }
                },
                'threaded': {
                    '15': { 'PN16': 1.2, 'PN25': 1.5, 'PN40': 1.8 },
                    '20': { 'PN16': 1.8, 'PN25': 2.3, 'PN40': 2.7 },
                    '25': { 'PN16': 2.8, 'PN25': 3.5, 'PN40': 4.2 },
                    '32': { 'PN16': 4.5, 'PN25': 5.6, 'PN40': 6.7 },
                    '40': { 'PN16': 6.2, 'PN25': 7.8, 'PN40': 9.3 },
                    '50': { 'PN16': 11.0, 'PN25': 13.8, 'PN40': 16.5 }
                }
            };

            // KÜRESEL VANA - ASME Flanşlı (kg)
            this.globeValveASME = {
                'flanged': {
                    '15': { 'Class 150': 4.3, 'Class 300': 6.5, 'Class 600': 10.0, 'Class 900': 14.5 },
                    '20': { 'Class 150': 5.5, 'Class 300': 8.3, 'Class 600': 12.8, 'Class 900': 18.5 },
                    '25': { 'Class 150': 7.5, 'Class 300': 11.3, 'Class 600': 17.5, 'Class 900': 25.3 },
                    '32': { 'Class 150': 10.2, 'Class 300': 15.3, 'Class 600': 23.7, 'Class 900': 34.3 },
                    '40': { 'Class 150': 12.7, 'Class 300': 19.1, 'Class 600': 29.5, 'Class 900': 42.7 },
                    '50': { 'Class 150': 18.5, 'Class 300': 27.8, 'Class 600': 43.0, 'Class 900': 62.3 },
                    '65': { 'Class 150': 27.8, 'Class 300': 41.7, 'Class 600': 64.5, 'Class 900': 93.3 },
                    '80': { 'Class 150': 37.0, 'Class 300': 55.5, 'Class 600': 85.8, 'Class 900': 124.3 },
                    '100': { 'Class 150': 57.8, 'Class 300': 86.7, 'Class 600': 134.0, 'Class 900': 194.0 },
                    '125': { 'Class 150': 90.3, 'Class 300': 135.5, 'Class 600': 209.5, 'Class 900': 303.3 },
                    '150': { 'Class 150': 129.5, 'Class 300': 194.3, 'Class 600': 300.5, 'Class 900': 435.0 },
                    '200': { 'Class 150': 225.8, 'Class 300': 338.7, 'Class 600': 523.8, 'Class 900': 758.5 },
                    '250': { 'Class 150': 359.0, 'Class 300': 538.5 },
                    '300': { 'Class 150': 527.0, 'Class 300': 790.5 }
                },
                'threaded': {
                    '15': { 'Class 150': 1.4, 'Class 300': 2.1 },
                    '20': { 'Class 150': 2.1, 'Class 300': 3.2 },
                    '25': { 'Class 150': 3.2, 'Class 300': 4.8 },
                    '32': { 'Class 150': 5.2, 'Class 300': 7.8 },
                    '40': { 'Class 150': 7.2, 'Class 300': 10.8 },
                    '50': { 'Class 150': 12.8, 'Class 300': 19.2 }
                }
            };

            // 5. ÇEK VANA (Check Valve) Ağırlıkları - EN Flanşlı Salınımlı (kg)
            this.checkValveEN = {
                'flanged': {
                    '15': { 'PN16': 2.5, 'PN25': 2.9, 'PN40': 3.4 },
                    '20': { 'PN16': 3.2, 'PN25': 3.7, 'PN40': 4.3 },
                    '25': { 'PN16': 4.5, 'PN25': 5.2, 'PN40': 6.0 },
                    '32': { 'PN16': 6.2, 'PN25': 7.2, 'PN40': 8.4 },
                    '40': { 'PN16': 7.8, 'PN25': 9.0, 'PN40': 10.5 },
                    '50': { 'PN16': 11.5, 'PN25': 13.3, 'PN40': 15.5 },
                    '65': { 'PN16': 17.5, 'PN25': 20.2, 'PN40': 23.5 },
                    '80': { 'PN16': 23.5, 'PN25': 27.2, 'PN40': 31.6 },
                    '100': { 'PN16': 37.0, 'PN25': 42.8, 'PN40': 49.7 },
                    '125': { 'PN16': 58.0, 'PN25': 67.1, 'PN40': 78.0 },
                    '150': { 'PN16': 84.0, 'PN25': 97.2, 'PN40': 113.0 },
                    '200': { 'PN16': 148.0, 'PN25': 171.2, 'PN40': 199.0 },
                    '250': { 'PN16': 240.0, 'PN25': 277.6, 'PN40': 322.8 },
                    '300': { 'PN16': 355.0, 'PN25': 410.8 }
                },
                'wafer': {
                    '40': { 'PN16': 1.8, 'PN25': 2.1 },
                    '50': { 'PN16': 2.5, 'PN25': 2.9 },
                    '65': { 'PN16': 3.8, 'PN25': 4.4 },
                    '80': { 'PN16': 5.2, 'PN25': 6.0 },
                    '100': { 'PN16': 8.5, 'PN25': 9.8 },
                    '125': { 'PN16': 13.5, 'PN25': 15.6 },
                    '150': { 'PN16': 19.5, 'PN25': 22.5 },
                    '200': { 'PN16': 34.5, 'PN25': 39.9 },
                    '250': { 'PN16': 56.0, 'PN25': 64.7 },
                    '300': { 'PN16': 82.5, 'PN25': 95.4 }
                }
            };

            // ÇEK VANA - ASME Flanşlı (kg)
            this.checkValveASME = {
                'flanged': {
                    '15': { 'Class 150': 2.8, 'Class 300': 4.2, 'Class 600': 6.5 },
                    '20': { 'Class 150': 3.6, 'Class 300': 5.4, 'Class 600': 8.4 },
                    '25': { 'Class 150': 5.0, 'Class 300': 7.5, 'Class 600': 11.6 },
                    '32': { 'Class 150': 6.9, 'Class 300': 10.3, 'Class 600': 16.0 },
                    '40': { 'Class 150': 8.7, 'Class 300': 13.0, 'Class 600': 20.1 },
                    '50': { 'Class 150': 12.8, 'Class 300': 19.2, 'Class 600': 29.7 },
                    '65': { 'Class 150': 19.5, 'Class 300': 29.3, 'Class 600': 45.3 },
                    '80': { 'Class 150': 26.2, 'Class 300': 39.3, 'Class 600': 60.8 },
                    '100': { 'Class 150': 41.3, 'Class 300': 61.9, 'Class 600': 95.7 },
                    '125': { 'Class 150': 64.6, 'Class 300': 96.9, 'Class 600': 150.0 },
                    '150': { 'Class 150': 93.6, 'Class 300': 140.4, 'Class 600': 217.2 },
                    '200': { 'Class 150': 164.8, 'Class 300': 247.2, 'Class 600': 382.4 },
                    '250': { 'Class 150': 267.2, 'Class 300': 400.8 },
                    '300': { 'Class 150': 395.6, 'Class 300': 593.4 }
                },
                'wafer': {
                    '50': { 'Class 150': 2.8, 'Class 300': 4.2 },
                    '65': { 'Class 150': 4.2, 'Class 300': 6.3 },
                    '80': { 'Class 150': 5.8, 'Class 300': 8.7 },
                    '100': { 'Class 150': 9.5, 'Class 300': 14.3 },
                    '125': { 'Class 150': 15.0, 'Class 300': 22.5 },
                    '150': { 'Class 150': 21.8, 'Class 300': 32.7 },
                    '200': { 'Class 150': 38.5, 'Class 300': 57.8 },
                    '250': { 'Class 150': 62.5, 'Class 300': 93.8 },
                    '300': { 'Class 150': 92.0, 'Class 300': 138.0 }
                }
            };

            // 6. EMNİYET VANASI (Safety Valve) Ağırlıkları - EN Flanşlı (kg)
            this.safetyValveEN = {
                'flanged': {
                    '15': { 'PN16': 2.8, 'PN40': 3.5, 'PN64': 4.5 },
                    '20': { 'PN16': 3.5, 'PN40': 4.4, 'PN64': 5.7 },
                    '25': { 'PN16': 4.8, 'PN40': 6.0, 'PN64': 7.8 },
                    '32': { 'PN16': 6.5, 'PN40': 8.1, 'PN64': 10.5 },
                    '40': { 'PN16': 8.2, 'PN40': 10.3, 'PN64': 13.4 },
                    '50': { 'PN16': 12.5, 'PN40': 15.6, 'PN64': 20.3 },
                    '65': { 'PN16': 19.0, 'PN40': 23.8, 'PN64': 30.9 },
                    '80': { 'PN16': 26.0, 'PN40': 32.5, 'PN64': 42.3 },
                    '100': { 'PN16': 42.0, 'PN40': 52.5, 'PN64': 68.3 },
                    '125': { 'PN16': 68.0, 'PN40': 85.0, 'PN64': 110.5 },
                    '150': { 'PN16': 102.0, 'PN40': 127.5, 'PN64': 165.8 },
                    '200': { 'PN16': 185.0, 'PN40': 231.3 }
                },
                'threaded': {
                    '15': { 'PN40': 0.9, 'PN64': 1.2 },
                    '20': { 'PN40': 1.4, 'PN64': 1.8 },
                    '25': { 'PN40': 2.2, 'PN64': 2.9 },
                    '32': { 'PN40': 3.5, 'PN64': 4.6 },
                    '40': { 'PN40': 5.0, 'PN64': 6.5 },
                    '50': { 'PN40': 8.5, 'PN64': 11.1 }
                }
            };

            // EMNİYET VANASI - ASME Flanşlı (kg)
            this.safetyValveASME = {
                'flanged': {
                    '15': { 'Class 150': 3.2, 'Class 300': 4.8, 'Class 600': 7.5 },
                    '20': { 'Class 150': 4.0, 'Class 300': 6.0, 'Class 600': 9.4 },
                    '25': { 'Class 150': 5.5, 'Class 300': 8.3, 'Class 600': 12.9 },
                    '32': { 'Class 150': 7.5, 'Class 300': 11.3, 'Class 600': 17.5 },
                    '40': { 'Class 150': 9.4, 'Class 300': 14.1, 'Class 600': 21.9 },
                    '50': { 'Class 150': 14.4, 'Class 300': 21.6, 'Class 600': 33.4 },
                    '65': { 'Class 150': 21.8, 'Class 300': 32.7, 'Class 600': 50.6 },
                    '80': { 'Class 150': 29.8, 'Class 300': 44.7, 'Class 600': 69.2 },
                    '100': { 'Class 150': 48.3, 'Class 300': 72.5, 'Class 600': 112.1 },
                    '125': { 'Class 150': 78.2, 'Class 300': 117.3 },
                    '150': { 'Class 150': 117.3, 'Class 300': 175.9 },
                    '200': { 'Class 150': 212.8, 'Class 300': 319.2 }
                },
                'threaded': {
                    '15': { 'Class 150': 1.0, 'Class 300': 1.5 },
                    '20': { 'Class 150': 1.6, 'Class 300': 2.4 },
                    '25': { 'Class 150': 2.5, 'Class 300': 3.8 },
                    '32': { 'Class 150': 4.0, 'Class 300': 6.0 },
                    '40': { 'Class 150': 5.8, 'Class 300': 8.7 },
                    '50': { 'Class 150': 9.8, 'Class 300': 14.7 }
                }
            };

            // 7. İĞNE VANA (Needle Valve) Ağırlıkları - Dişli (kg)
            this.needleValve = {
                'threaded': {
                    '6': { 'PN100': 0.15, 'PN160': 0.22, 'PN250': 0.35 },
                    '10': { 'PN100': 0.28, 'PN160': 0.42, 'PN250': 0.65 },
                    '15': { 'PN100': 0.55, 'PN160': 0.82, 'PN250': 1.25 },
                    '20': { 'PN100': 0.92, 'PN160': 1.38, 'PN250': 2.10 },
                    '25': { 'PN100': 1.55, 'PN160': 2.32, 'PN250': 3.55 },
                    '32': { 'PN100': 2.65, 'PN160': 3.97, 'PN250': 6.05 },
                    '40': { 'PN100': 3.85, 'PN160': 5.77, 'PN250': 8.80 },
                    '50': { 'PN100': 6.80, 'PN160': 10.20, 'PN250': 15.55 }
                }
            };

            // İĞNE VANA - ASME Dişli (kg)
            this.needleValveASME = {
                'threaded': {
                    '6': { 'Class 600': 0.18, 'Class 1500': 0.38, 'Class 3000': 0.72 },
                    '10': { 'Class 600': 0.35, 'Class 1500': 0.72, 'Class 3000': 1.35 },
                    '15': { 'Class 600': 0.68, 'Class 1500': 1.38, 'Class 3000': 2.60 },
                    '20': { 'Class 600': 1.15, 'Class 1500': 2.32, 'Class 3000': 4.35 },
                    '25': { 'Class 600': 1.92, 'Class 1500': 3.88, 'Class 3000': 7.28 },
                    '32': { 'Class 600': 3.28, 'Class 1500': 6.62, 'Class 3000': 12.42 },
                    '40': { 'Class 600': 4.77, 'Class 1500': 9.62, 'Class 3000': 18.05 },
                    '50': { 'Class 600': 8.42, 'Class 1500': 16.98, 'Class 3000': 31.85 }
                }
            };
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="vanaTipi">${this.getText('vana_tipi_label')}</label>
                        <select id="vanaTipi" onchange="window.ApplicationController.updateVanaOptions()">
                            <option value="">${this.getText('select_valve_type')}</option>
                            <option value="gate">${this.getText('gate_valve')}</option>
                            <option value="ball">${this.getText('ball_valve')}</option>
                            <option value="butterfly">${this.getText('butterfly_valve')}</option>
                            <option value="globe">${this.getText('globe_valve')}</option>
                            <option value="check">${this.getText('check_valve')}</option>
                            <option value="safety">${this.getText('safety_valve')}</option>
                            <option value="needle">${this.getText('needle_valve')}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="standartSistem">${this.getText('standart_sistem_label')}</label>
                        <select id="standartSistem" onchange="window.ApplicationController.updateVanaStandards()">
                            <option value="">${this.getText('select_standard')}</option>
                            <option value="en">${this.getText('en_standard')}</option>
                            <option value="asme">${this.getText('asme_standard')}</option>
                        </select>
                    </div>
                </div>
                <div class="form-row" id="vanaBaglantiRow" style="display: none;">
                    <div class="form-group">
                        <label for="baglantiTipi">${this.getText('baglanti_tipi_label')}</label>
                        <select id="baglantiTipi" onchange="window.ApplicationController.updateVanaSizes()">
                            <option value="">${this.getText('select_connection')}</option>
                        </select>
                    </div>
                </div>
                <div class="form-row" id="vanaDimensionsRow" style="display: none;">
                    <div class="form-group">
                        <label for="vanaBoyut">${this.getText('boyut_label')}</label>
                        <select id="vanaBoyut" onchange="window.ApplicationController.updateVanaPressure()">
                            <option value="">${this.getText('select_size')}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="vanaBasinc">${this.getText('basinc_label')}</label>
                        <select id="vanaBasinc" onchange="window.ApplicationController.updateVanaWeight()">
                            <option value="">${this.getText('select_pressure')}</option>
                        </select>
                    </div>
                </div>
                <div class="form-row" id="vanaInfoRow" style="display: none;">
                    <div class="form-group">
                        <small style="color: #4299e1; font-weight: 600;">
                            <span id="vanaWeightInfo"></span> | 
                            <span id="vanaStandardInfo"></span>
                        </small>
                    </div>
                </div>
            `;
        }

        getValveData(vanaTipi, standartSistem, baglantiTipi) {
            // Vana tipine göre doğru data objesini döndür
            const dataMap = {
                'gate': standartSistem === 'en' ? this.gateValveEN : this.gateValveASME,
                'ball': standartSistem === 'en' ? this.ballValveEN : this.ballValveASME,
                'butterfly': standartSistem === 'en' ? this.butterflyValveEN : this.butterflyValveASME,
                'globe': standartSistem === 'en' ? this.globeValveEN : this.globeValveASME,
                'check': standartSistem === 'en' ? this.checkValveEN : this.checkValveASME,
                'safety': standartSistem === 'en' ? this.safetyValveEN : this.safetyValveASME,
                'needle': standartSistem === 'en' ? this.needleValve : this.needleValveASME
            };
            
            const data = dataMap[vanaTipi];
            return data ? data[baglantiTipi] : null;
        }

        calculate(formData) {
            const vanaTipi = formData.vanaTipi || '';
            const standartSistem = formData.standartSistem || '';
            const baglantiTipi = formData.baglantiTipi || '';
            const vanaBoyut = formData.vanaBoyut || '';
            const vanaBasinc = formData.vanaBasinc || '';
            const adet = parseFloat(formData.adet) || 1;
            
            if (!vanaTipi || !standartSistem || !baglantiTipi || !vanaBoyut || !vanaBasinc) {
                return null;
            }
            
            // Ağırlık verilerini al
            const valveData = this.getValveData(vanaTipi, standartSistem, baglantiTipi);
            if (!valveData || !valveData[vanaBoyut] || !valveData[vanaBoyut][vanaBasinc]) {
                return null;
            }
            
            const birimAgirlik = valveData[vanaBoyut][vanaBasinc];
            const toplamAgirlik = birimAgirlik * adet;
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                suHacmi: null
            };
        }

        validate(formData) {
            const vanaTipi = formData.vanaTipi || '';
            const standartSistem = formData.standartSistem || '';
            const baglantiTipi = formData.baglantiTipi || '';
            const vanaBoyut = formData.vanaBoyut || '';
            const vanaBasinc = formData.vanaBasinc || '';
            
            if (!vanaTipi || !standartSistem || !baglantiTipi || !vanaBoyut || !vanaBasinc) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            return { isValid: true };
        }

        formatDimensions(formData) {
            const vanaTipi = formData.vanaTipi || '';
            const standartSistem = formData.standartSistem || '';
            const vanaBoyut = formData.vanaBoyut || '';
            const vanaBasinc = formData.vanaBasinc || '';
            const baglantiTipi = formData.baglantiTipi || '';
            
            const dnNps = standartSistem === 'en' ? 'DN' : 'NPS';
            const baglantiMap = {
                'flanged': 'Flanşlı',
                'threaded': 'Dişli',
                'wafer': 'Wafer',
                'welded': 'Kaynaklı'
            };
            
            return `${dnNps}${vanaBoyut} ${vanaBasinc} ${baglantiMap[baglantiTipi] || ''}`;
        }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            
            // Vana tipi ismini malzeme türüne yaz
            const vanaTipiMap = {
                'gate': this.getText('gate_valve'),
                'ball': this.getText('ball_valve'),
                'butterfly': this.getText('butterfly_valve'),
                'globe': this.getText('globe_valve'),
                'check': this.getText('check_valve'),
                'safety': this.getText('safety_valve'),
                'needle': this.getText('needle_valve')
            };
            
            // Vana tipini ve tam adını sakla
            baseRow.malzemeTuru = vanaTipiMap[formData.vanaTipi] || 'Vana';
            baseRow.vanaTipiKod = formData.vanaTipi; // Vana tipi kodunu sakla
            baseRow.vanaTipiAd = vanaTipiMap[formData.vanaTipi]; // Vana tipi adını sakla
            
            // Standart bilgisini güncelle
            const standartMap = {
                'gate': { 'en': 'EN 1984 / DIN 3352', 'asme': 'ASME B16.34 / API 600' },
                'ball': { 'en': 'EN 13709', 'asme': 'ASME B16.34 / API 6D' },
                'butterfly': { 'en': 'EN 593', 'asme': 'API 609' },
                'globe': { 'en': 'EN 13709 / DIN 3356', 'asme': 'ASME B16.34' },
                'check': { 'en': 'EN 12334 / DIN 3202', 'asme': 'API 594' },
                'safety': { 'en': 'EN ISO 4126 / DIN 3320', 'asme': 'ASME Sec VIII / API 526' },
                'needle': { 'en': 'DIN 2401', 'asme': 'ASME B16.34' }
            };
            
            const standart = standartMap[formData.vanaTipi];
            if (standart) {
                baseRow.enNormu = standart[formData.standartSistem] || 'Özel';
            }
            
            // Vana detaylarını sakla
            baseRow.vanaDetay = {
                vanaTipi: formData.vanaTipi,
                vanaTipiAd: vanaTipiMap[formData.vanaTipi], // Tam adı da ekle
                standartSistem: formData.standartSistem,
                baglantiTipi: formData.baglantiTipi,
                vanaBoyut: formData.vanaBoyut,
                vanaBasinc: formData.vanaBasinc
            };
            
            baseRow.originalType = 'vana';
            
            return baseRow;
        }

        fillSpecificFields(rowData) {
            console.log('Vana fillSpecificFields çalıştı:', rowData);
            
            // ÖNCELİK 0: Metadata'dan gelen vanaDetay
            if (rowData.vanaDetay && rowData.vanaDetay.vanaTipi) {
                console.log('Vana metadata vanaDetay bulundu:', rowData.vanaDetay);
                
                const vanaTipiElement = document.getElementById('vanaTipi');
                if (vanaTipiElement) {
                    vanaTipiElement.value = rowData.vanaDetay.vanaTipi;
                    window.ApplicationController.updateVanaOptions();
                    
                    setTimeout(() => {
                        const standartElement = document.getElementById('standartSistem');
                        if (standartElement && rowData.vanaDetay.standartSistem) {
                            standartElement.value = rowData.vanaDetay.standartSistem;
                            window.ApplicationController.updateVanaStandards();
                            
                            setTimeout(() => {
                                const baglantiElement = document.getElementById('baglantiTipi');
                                if (baglantiElement && rowData.vanaDetay.baglantiTipi) {
                                    baglantiElement.value = rowData.vanaDetay.baglantiTipi;
                                    window.ApplicationController.updateVanaSizes();
                                    
                                    setTimeout(() => {
                                        const boyutElement = document.getElementById('vanaBoyut');
                                        if (boyutElement && rowData.vanaDetay.vanaBoyut) {
                                            boyutElement.value = rowData.vanaDetay.vanaBoyut;
                                            window.ApplicationController.updateVanaPressure();
                                            
                                            setTimeout(() => {
                                                const basincElement = document.getElementById('vanaBasinc');
                                                if (basincElement && rowData.vanaDetay.vanaBasinc) {
                                                    basincElement.value = rowData.vanaDetay.vanaBasinc;
                                                    window.ApplicationController.updateVanaWeight();
                                                }
                                            }, 200);
                                        }
                                    }, 200);
                                }
                            }, 200);
                        }
                    }, 200);
                }
                return;
            }
            
            // İKİNCİL: formData varsa
            if (rowData.formData && rowData.formData.vanaTipi) {
                console.log('Vana formData bulundu:', rowData.formData);
                
                const vanaTipiElement = document.getElementById('vanaTipi');
                if (vanaTipiElement) {
                    vanaTipiElement.value = rowData.formData.vanaTipi;
                    window.ApplicationController.updateVanaOptions();
                    
                    setTimeout(() => {
                        if (rowData.formData.standartSistem) {
                            const standartElement = document.getElementById('standartSistem');
                            if (standartElement) {
                                standartElement.value = rowData.formData.standartSistem;
                                window.ApplicationController.updateVanaStandards();
                                
                                setTimeout(() => {
                                    if (rowData.formData.baglantiTipi) {
                                        const baglantiElement = document.getElementById('baglantiTipi');
                                        if (baglantiElement) {
                                            baglantiElement.value = rowData.formData.baglantiTipi;
                                            window.ApplicationController.updateVanaSizes();
                                            
                                            setTimeout(() => {
                                                if (rowData.formData.vanaBoyut) {
                                                    const boyutElement = document.getElementById('vanaBoyut');
                                                    if (boyutElement) {
                                                        boyutElement.value = rowData.formData.vanaBoyut;
                                                        window.ApplicationController.updateVanaPressure();
                                                        
                                                        setTimeout(() => {
                                                            if (rowData.formData.vanaBasinc) {
                                                                const basincElement = document.getElementById('vanaBasinc');
                                                                if (basincElement) {
                                                                    basincElement.value = rowData.formData.vanaBasinc;
                                                                    window.ApplicationController.updateVanaWeight();
                                                                }
                                                            }
                                                        }, 200);
                                                    }
                                                }
                                            }, 200);
                                        }
                                    }
                                }, 200);
                            }
                        }
                    }, 200);
                }
                return;
            }
            
            console.log('Vana için metadata veya formData bulunamadı');
        }
    }

    // ApplicationController'a fonksiyonlar ekle
    if (!window.ApplicationController.updateVanaOptions) {
        window.ApplicationController.updateVanaOptions = function() {
            const vanaTipi = document.getElementById('vanaTipi').value;
            
            if (!vanaTipi) {
                document.getElementById('vanaBaglantiRow').style.display = 'none';
                document.getElementById('vanaDimensionsRow').style.display = 'none';
                document.getElementById('vanaInfoRow').style.display = 'none';
                return;
            }
        };
        
        window.ApplicationController.updateVanaStandards = function() {
            const vanaTipi = document.getElementById('vanaTipi').value;
            const standartSistem = document.getElementById('standartSistem').value;
            
            if (!vanaTipi || !standartSistem) {
                document.getElementById('vanaBaglantiRow').style.display = 'none';
                document.getElementById('vanaDimensionsRow').style.display = 'none';
                document.getElementById('vanaInfoRow').style.display = 'none';
                return;
            }
            
            const MaterialClass = window.MaterialRegistry.get('vana');
            const instance = new MaterialClass();
            const lang = instance.getCurrentLanguage();
            
            document.getElementById('vanaBaglantiRow').style.display = 'flex';
            
            const baglantiSelect = document.getElementById('baglantiTipi');
            baglantiSelect.innerHTML = `<option value="">${instance.getText('select_connection')}</option>`;
            
            // Vana tipine göre bağlantı seçeneklerini belirle
            let baglantilar = [];
            
            if (vanaTipi === 'needle') {
                baglantilar = ['threaded'];
            } else if (vanaTipi === 'butterfly') {
                baglantilar = ['wafer', 'flanged'];
            } else if (vanaTipi === 'check') {
                baglantilar = ['flanged', 'wafer'];
            } else {
                baglantilar = ['flanged', 'threaded'];
            }
            
            const baglantiMap = {
                'flanged': instance.getText('flanged'),
                'threaded': instance.getText('threaded'),
                'wafer': instance.getText('wafer'),
                'welded': instance.getText('welded')
            };
            
            baglantilar.forEach(bag => {
                baglantiSelect.innerHTML += `<option value="${bag}">${baglantiMap[bag]}</option>`;
            });
        };
        
        window.ApplicationController.updateVanaSizes = function() {
            const vanaTipi = document.getElementById('vanaTipi').value;
            const standartSistem = document.getElementById('standartSistem').value;
            const baglantiTipi = document.getElementById('baglantiTipi').value;
            
            if (!vanaTipi || !standartSistem || !baglantiTipi) {
                document.getElementById('vanaDimensionsRow').style.display = 'none';
                document.getElementById('vanaInfoRow').style.display = 'none';
                return;
            }
            
            const MaterialClass = window.MaterialRegistry.get('vana');
            const instance = new MaterialClass();
            
            document.getElementById('vanaDimensionsRow').style.display = 'flex';
            
            const boyutSelect = document.getElementById('vanaBoyut');
            boyutSelect.innerHTML = `<option value="">${instance.getText('select_size')}</option>`;
            
            const valveData = instance.getValveData(vanaTipi, standartSistem, baglantiTipi);
            if (valveData) {
                Object.keys(valveData).forEach(size => {
                    const prefix = standartSistem === 'en' ? 'DN' : '';
                    boyutSelect.innerHTML += `<option value="${size}">${prefix}${size}</option>`;
                });
            }
        };
        
        window.ApplicationController.updateVanaPressure = function() {
            const vanaTipi = document.getElementById('vanaTipi').value;
            const standartSistem = document.getElementById('standartSistem').value;
            const baglantiTipi = document.getElementById('baglantiTipi').value;
            const vanaBoyut = document.getElementById('vanaBoyut').value;
            
            if (!vanaTipi || !standartSistem || !baglantiTipi || !vanaBoyut) {
                document.getElementById('vanaInfoRow').style.display = 'none';
                return;
            }
            
            const MaterialClass = window.MaterialRegistry.get('vana');
            const instance = new MaterialClass();
            
            const basincSelect = document.getElementById('vanaBasinc');
            basincSelect.innerHTML = `<option value="">${instance.getText('select_pressure')}</option>`;
            
            const valveData = instance.getValveData(vanaTipi, standartSistem, baglantiTipi);
            if (valveData && valveData[vanaBoyut]) {
                Object.keys(valveData[vanaBoyut]).forEach(pressure => {
                    basincSelect.innerHTML += `<option value="${pressure}">${pressure}</option>`;
                });
            }
        };
        
        window.ApplicationController.updateVanaWeight = function() {
            const vanaTipi = document.getElementById('vanaTipi').value;
            const standartSistem = document.getElementById('standartSistem').value;
            const baglantiTipi = document.getElementById('baglantiTipi').value;
            const vanaBoyut = document.getElementById('vanaBoyut').value;
            const vanaBasinc = document.getElementById('vanaBasinc').value;
            
            if (!vanaTipi || !standartSistem || !baglantiTipi || !vanaBoyut || !vanaBasinc) {
                document.getElementById('vanaInfoRow').style.display = 'none';
                return;
            }
            
            const MaterialClass = window.MaterialRegistry.get('vana');
            const instance = new MaterialClass();
            
            const valveData = instance.getValveData(vanaTipi, standartSistem, baglantiTipi);
            if (valveData && valveData[vanaBoyut] && valveData[vanaBoyut][vanaBasinc]) {
                const weight = valveData[vanaBoyut][vanaBasinc];
                
                document.getElementById('vanaInfoRow').style.display = 'block';
                document.getElementById('vanaWeightInfo').textContent = 
                    `${instance.getText('weight_info')}: ${weight} kg`;
                
                const standartMap = {
                    'gate': { 'en': 'EN 1984', 'asme': 'ASME B16.34' },
                    'ball': { 'en': 'EN 13709', 'asme': 'API 6D' },
                    'butterfly': { 'en': 'EN 593', 'asme': 'API 609' },
                    'globe': { 'en': 'EN 13709', 'asme': 'ASME B16.34' },
                    'check': { 'en': 'EN 12334', 'asme': 'API 594' },
                    'safety': { 'en': 'EN ISO 4126', 'asme': 'API 526' },
                    'needle': { 'en': 'DIN 2401', 'asme': 'ASME B16.34' }
                };
                
                const standart = standartMap[vanaTipi];
                if (standart) {
                    document.getElementById('vanaStandardInfo').textContent = 
                        `${instance.getText('standard_info')}: ${standart[standartSistem]}`;
                }
            } else {
                document.getElementById('vanaInfoRow').style.display = 'none';
            }
        };
    }

    // Malzemeyi kaydet
    const vanaMaterial = new VanaMaterial();
    vanaMaterial.register();

})(window);