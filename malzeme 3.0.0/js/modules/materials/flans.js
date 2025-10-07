/**
 * FLANŞ Malzeme Modülü
 * EN 1092-1 ve ASME B16.5 Standartları
 */

(function(window) {
    'use strict';
    
    class FlansMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'flans';
            
            // Dil metinleri
            this.texts = {
                tr: {
                    display_name: 'Flanş',
                    flans_tipi_label: 'Flanş Tipi',
                    standart_sistem_label: 'Standart Sistemi',
                    boyut_label: 'Nominal Boyut',
                    basinc_label: 'Basınç Sınıfı',
                    validation_error: 'Tüm alanlar seçilmelidir',
                    select_type: 'Flanş tipi seçin',
                    select_standard: 'Standart seçin',
                    select_size: 'Boyut seçin',
                    select_pressure: 'Basınç sınıfı seçin',
                    weight_info: 'Birim Ağırlık',
                    standard_info: 'Standart',
                    // Flanş tipleri
                    duz_flans: 'Düz Flanş',
                    kaynak_boyunlu: 'Kaynak Boyunlu Flanş',
                    kor_flans: 'Kör Flanş',
                    // Standartlar
                    en_standard: 'EN 1092-1',
                    asme_standard: 'ASME B16.5'
                },
                en: {
                    display_name: 'Flange',
                    flans_tipi_label: 'Flange Type',
                    standart_sistem_label: 'Standard System',
                    boyut_label: 'Nominal Size',
                    basinc_label: 'Pressure Class',
                    validation_error: 'All fields must be selected',
                    select_type: 'Select flange type',
                    select_standard: 'Select standard',
                    select_size: 'Select size',
                    select_pressure: 'Select pressure class',
                    weight_info: 'Unit Weight',
                    standard_info: 'Standard',
                    // Flange types
                    duz_flans: 'Slip-On Flange',
                    kaynak_boyunlu: 'Weld Neck Flange',
                    kor_flans: 'Blind Flange',
                    // Standards
                    en_standard: 'EN 1092-1',
                    asme_standard: 'ASME B16.5'
                }
            };
            
            // Malzeme cinsleri
            this.grades = [
                // Karbon çelik
                'S235JR', 'S275JR', 'S355JR',
                'P245GH', 'P250GH', 'P265GH',
                'A105', 'A350 LF2',
                // Paslanmaz
                '1.4301', '1.4401', '1.4404', '1.4541', '1.4571',
                'A182 F304', 'A182 F304L', 'A182 F316', 'A182 F316L', 'A182 F321',
                // Alaşımlı
                'A182 F11', 'A182 F22', 'A182 F91',
                // Özel
                'Duplex 2205', 'Super Duplex 2507'
            ];
            
            // Yoğunluklar
            this.densities = {
                'S235JR': 7850, 'S275JR': 7850, 'S355JR': 7850,
                'P245GH': 7850, 'P250GH': 7850, 'P265GH': 7850,
                'A105': 7850, 'A350 LF2': 7850,
                '1.4301': 8000, '1.4401': 8000, '1.4404': 8000, '1.4541': 8000, '1.4571': 8000,
                'A182 F304': 8000, 'A182 F304L': 8000, 'A182 F316': 8000, 
                'A182 F316L': 8000, 'A182 F321': 8000,
                'A182 F11': 7850, 'A182 F22': 7850, 'A182 F91': 7850,
                'Duplex 2205': 7800, 'Super Duplex 2507': 7800
            };
            
            // Standartlar
            this.standards = {
                'S235JR': 'EN 1092-1', 'S275JR': 'EN 1092-1', 'S355JR': 'EN 1092-1',
                'P245GH': 'EN 1092-1', 'P250GH': 'EN 1092-1', 'P265GH': 'EN 1092-1',
                'A105': 'ASME B16.5', 'A350 LF2': 'ASME B16.5',
                '1.4301': 'EN 1092-1', '1.4401': 'EN 1092-1', '1.4404': 'EN 1092-1',
                '1.4541': 'EN 1092-1', '1.4571': 'EN 1092-1',
                'A182 F304': 'ASME B16.5', 'A182 F304L': 'ASME B16.5',
                'A182 F316': 'ASME B16.5', 'A182 F316L': 'ASME B16.5',
                'A182 F321': 'ASME B16.5', 'A182 F11': 'ASME B16.5',
                'A182 F22': 'ASME B16.5', 'A182 F91': 'ASME B16.5',
                'Duplex 2205': 'ASME B16.5', 'Super Duplex 2507': 'ASME B16.5'
            };
            
            // EN Flanş ağırlıkları (kg) - MaterialData.js'den
            this.enFlansData = {
                'duz': {
                    '15': { 'PN6': 0.5, 'PN10': 0.5, 'PN16': 0.6, 'PN25': 0.7, 'PN40': 0.8, 'PN63': 1.1, 'PN100': 1.5 },
                    '20': { 'PN6': 0.6, 'PN10': 0.6, 'PN16': 0.7, 'PN25': 0.9, 'PN40': 1.1, 'PN63': 1.5, 'PN100': 2.0 },
                    '25': { 'PN6': 0.8, 'PN10': 0.8, 'PN16': 0.9, 'PN25': 1.2, 'PN40': 1.5, 'PN63': 2.0, 'PN100': 2.7 },
                    '32': { 'PN6': 1.0, 'PN10': 1.0, 'PN16': 1.2, 'PN25': 1.6, 'PN40': 2.0, 'PN63': 2.7, 'PN100': 3.8 },
                    '40': { 'PN6': 1.2, 'PN10': 1.2, 'PN16': 1.4, 'PN25': 1.8, 'PN40': 2.3, 'PN63': 3.1, 'PN100': 4.3 },
                    '50': { 'PN6': 1.5, 'PN10': 1.5, 'PN16': 1.8, 'PN25': 2.3, 'PN40': 3.0, 'PN63': 4.1, 'PN100': 5.6 },
                    '65': { 'PN6': 2.0, 'PN10': 2.0, 'PN16': 2.4, 'PN25': 3.2, 'PN40': 4.2, 'PN63': 5.7, 'PN100': 7.9 },
                    '80': { 'PN6': 2.5, 'PN10': 2.5, 'PN16': 3.0, 'PN25': 4.0, 'PN40': 5.3, 'PN63': 7.3, 'PN100': 10.0 },
                    '100': { 'PN6': 3.2, 'PN10': 3.5, 'PN16': 4.2, 'PN25': 5.5, 'PN40': 7.5, 'PN63': 10.0, 'PN100': 10.3 },
                    '125': { 'PN6': 4.5, 'PN10': 5.0, 'PN16': 6.0, 'PN25': 8.0, 'PN40': 10.5, 'PN63': 14.4, 'PN100': 19.8 },
                    '150': { 'PN6': 5.5, 'PN10': 6.2, 'PN16': 7.5, 'PN25': 10.0, 'PN40': 13.5, 'PN63': 18.5, 'PN100': 25.5 },
                    '200': { 'PN6': 8.5, 'PN10': 9.5, 'PN16': 11.5, 'PN25': 15.5, 'PN40': 21.0, 'PN63': 28.8, 'PN100': 39.7 },
                    '250': { 'PN6': 12.5, 'PN10': 14.0, 'PN16': 17.5, 'PN25': 23.5, 'PN40': 32.0, 'PN63': 44.0, 'PN100': 60.5 },
                    '300': { 'PN6': 16.0, 'PN10': 18.5, 'PN16': 23.0, 'PN25': 31.5, 'PN40': 43.0, 'PN63': 59.1, 'PN100': 81.2 },
                    '350': { 'PN6': 20.5, 'PN10': 24.0, 'PN16': 30.0, 'PN25': 41.0, 'PN40': 56.0, 'PN63': 77.0, 'PN100': 105.8 },
                    '400': { 'PN6': 25.0, 'PN10': 29.5, 'PN16': 37.5, 'PN25': 51.5, 'PN40': 71.0, 'PN63': 97.6, 'PN100': 134.2 },
                    '500': { 'PN6': 37.0, 'PN10': 44.0, 'PN16': 56.5, 'PN25': 78.0, 'PN40': 108.0, 'PN63': 148.5, 'PN100': 204.2 },
                    '600': { 'PN6': 51.0, 'PN10': 61.0, 'PN16': 79.0, 'PN25': 110.0, 'PN40': 153.0, 'PN63': 210.3, 'PN100': 289.2 }
                },
                'kaynak_boyunlu': {
                    '15': { 'PN6': 0.6, 'PN10': 0.6, 'PN16': 0.7, 'PN25': 0.8, 'PN40': 1.0, 'PN63': 1.1, 'PN100': 1.5 },
                    '20': { 'PN6': 0.7, 'PN10': 0.7, 'PN16': 0.8, 'PN25': 1.0, 'PN40': 1.3, 'PN63': 1.5, 'PN100': 2.0 },
                    '25': { 'PN6': 0.9, 'PN10': 0.9, 'PN16': 1.1, 'PN25': 1.4, 'PN40': 1.8, 'PN63': 2.0, 'PN100': 2.7 },
                    '32': { 'PN6': 1.2, 'PN10': 1.2, 'PN16': 1.4, 'PN25': 1.9, 'PN40': 2.4, 'PN63': 2.7, 'PN100': 3.8 },
                    '40': { 'PN6': 1.4, 'PN10': 1.4, 'PN16': 1.7, 'PN25': 2.2, 'PN40': 2.8, 'PN63': 3.1, 'PN100': 4.3 },
                    '50': { 'PN6': 1.8, 'PN10': 1.8, 'PN16': 2.2, 'PN25': 2.8, 'PN40': 3.7, 'PN63': 4.1, 'PN100': 5.6 },
                    '65': { 'PN6': 2.5, 'PN10': 2.5, 'PN16': 3.0, 'PN25': 4.0, 'PN40': 5.2, 'PN63': 5.7, 'PN100': 7.9 },
                    '80': { 'PN6': 3.1, 'PN10': 3.1, 'PN16': 3.7, 'PN25': 5.0, 'PN40': 6.6, 'PN63': 7.3, 'PN100': 10.0 },
                    '100': { 'PN6': 4.0, 'PN10': 4.3, 'PN16': 5.2, 'PN25': 6.9, 'PN40': 9.4, 'PN63': 10.0, 'PN100': 10.3 },
                    '125': { 'PN6': 5.6, 'PN10': 6.2, 'PN16': 7.5, 'PN25': 10.0, 'PN40': 13.1, 'PN63': 14.4, 'PN100': 19.8 },
                    '150': { 'PN6': 6.9, 'PN10': 7.7, 'PN16': 9.4, 'PN25': 12.5, 'PN40': 16.9, 'PN63': 18.5, 'PN100': 25.5 },
                    '200': { 'PN6': 10.6, 'PN10': 11.9, 'PN16': 14.4, 'PN25': 19.4, 'PN40': 26.3, 'PN63': 28.8, 'PN100': 39.7 },
                    '250': { 'PN6': 15.6, 'PN10': 17.5, 'PN16': 21.9, 'PN25': 29.4, 'PN40': 40.0, 'PN63': 44.0, 'PN100': 60.5 },
                    '300': { 'PN6': 20.0, 'PN10': 23.1, 'PN16': 28.8, 'PN25': 39.4, 'PN40': 53.8, 'PN63': 59.1, 'PN100': 81.2 },
                    '350': { 'PN6': 25.6, 'PN10': 30.0, 'PN16': 37.5, 'PN25': 51.3, 'PN40': 70.0, 'PN63': 77.0, 'PN100': 105.8 },
                    '400': { 'PN6': 31.3, 'PN10': 36.9, 'PN16': 46.9, 'PN25': 64.4, 'PN40': 88.8, 'PN63': 97.6, 'PN100': 134.2 },
                    '500': { 'PN6': 46.3, 'PN10': 55.0, 'PN16': 70.6, 'PN25': 97.5, 'PN40': 135.0, 'PN63': 148.5, 'PN100': 204.2 },
                    '600': { 'PN6': 63.8, 'PN10': 76.3, 'PN16': 98.8, 'PN25': 137.5, 'PN40': 191.3, 'PN63': 210.3, 'PN100': 289.2 }
                },
                'kor': {
                    '15': { 'PN6': 0.7, 'PN10': 0.7, 'PN16': 0.8, 'PN25': 1.0, 'PN40': 1.2, 'PN63': 1.1, 'PN100': 1.5 },
                    '20': { 'PN6': 0.8, 'PN10': 0.8, 'PN16': 1.0, 'PN25': 1.3, 'PN40': 1.6, 'PN63': 1.5, 'PN100': 2.0 },
                    '25': { 'PN6': 1.1, 'PN10': 1.1, 'PN16': 1.3, 'PN25': 1.7, 'PN40': 2.2, 'PN63': 2.0, 'PN100': 2.7 },
                    '32': { 'PN6': 1.5, 'PN10': 1.5, 'PN16': 1.8, 'PN25': 2.3, 'PN40': 3.0, 'PN63': 2.7, 'PN100': 3.8 },
                    '40': { 'PN6': 1.8, 'PN10': 1.8, 'PN16': 2.1, 'PN25': 2.7, 'PN40': 3.5, 'PN63': 3.1, 'PN100': 4.3 },
                    '50': { 'PN6': 2.2, 'PN10': 2.2, 'PN16': 2.7, 'PN25': 3.5, 'PN40': 4.5, 'PN63': 4.1, 'PN100': 5.6 },
                    '65': { 'PN6': 3.1, 'PN10': 3.1, 'PN16': 3.7, 'PN25': 4.9, 'PN40': 6.4, 'PN63': 5.7, 'PN100': 7.9 },
                    '80': { 'PN6': 3.9, 'PN10': 3.9, 'PN16': 4.6, 'PN25': 6.2, 'PN40': 8.1, 'PN63': 7.3, 'PN100': 10.0 },
                    '100': { 'PN6': 5.4, 'PN10': 5.8, 'PN16': 7.0, 'PN25': 9.2, 'PN40': 12.5, 'PN63': 10.0, 'PN100': 10.3 },
                    '125': { 'PN6': 7.6, 'PN10': 8.4, 'PN16': 10.1, 'PN25': 13.5, 'PN40': 17.6, 'PN63': 14.4, 'PN100': 19.8 },
                    '150': { 'PN6': 9.6, 'PN10': 10.8, 'PN16': 13.1, 'PN25': 17.5, 'PN40': 23.6, 'PN63': 18.5, 'PN100': 25.5 },
                    '200': { 'PN6': 15.2, 'PN10': 17.0, 'PN16': 20.6, 'PN25': 27.7, 'PN40': 37.5, 'PN63': 28.8, 'PN100': 39.7 },
                    '250': { 'PN6': 23.0, 'PN10': 25.8, 'PN16': 32.2, 'PN25': 43.2, 'PN40': 58.9, 'PN63': 44.0, 'PN100': 60.5 },
                    '300': { 'PN6': 31.0, 'PN10': 35.8, 'PN16': 44.6, 'PN25': 61.0, 'PN40': 83.3, 'PN63': 59.1, 'PN100': 81.2 },
                    '350': { 'PN6': 40.5, 'PN10': 47.5, 'PN16': 59.3, 'PN25': 81.2, 'PN40': 110.8, 'PN63': 77.0, 'PN100': 105.8 },
                    '400': { 'PN6': 50.8, 'PN10': 59.9, 'PN16': 76.1, 'PN25': 104.5, 'PN40': 144.0, 'PN63': 97.6, 'PN100': 134.2 },
                    '500': { 'PN6': 77.8, 'PN10': 92.4, 'PN16': 118.6, 'PN25': 163.8, 'PN40': 226.9, 'PN63': 148.5, 'PN100': 204.2 },
                    '600': { 'PN6': 110.5, 'PN10': 132.0, 'PN16': 170.9, 'PN25': 237.9, 'PN40': 331.1, 'PN63': 210.3, 'PN100': 289.2 }
                }
            };
            
            // ASME Flanş ağırlıkları (kg)
            this.asmeFlansData = {
                'duz': {
                    '15': { 'Class 150': 0.6, 'Class 300': 0.9, 'Class 600': 1.1, 'Class 900': 2.0, 'Class 1500': 2.0, 'Class 2500': 3.6 },
                    '20': { 'Class 150': 0.9, 'Class 300': 1.4, 'Class 600': 1.8, 'Class 900': 2.7, 'Class 1500': 2.7, 'Class 2500': 5.0 },
                    '25': { 'Class 150': 1.1, 'Class 300': 1.8, 'Class 600': 2.3, 'Class 900': 3.6, 'Class 1500': 3.6, 'Class 2500': 6.8 },
                    '32': { 'Class 150': 1.6, 'Class 300': 2.3, 'Class 600': 3.2, 'Class 900': 5.4, 'Class 1500': 5.4, 'Class 2500': 9.5 },
                    '40': { 'Class 150': 1.8, 'Class 300': 2.7, 'Class 600': 3.6, 'Class 900': 6.4, 'Class 1500': 6.4, 'Class 2500': 11.3 },
                    '50': { 'Class 150': 2.7, 'Class 300': 4.1, 'Class 600': 5.4, 'Class 900': 9.5, 'Class 1500': 9.5, 'Class 2500': 18.1 },
                    '65': { 'Class 150': 3.6, 'Class 300': 5.9, 'Class 600': 8.2, 'Class 900': 13.6, 'Class 1500': 13.6, 'Class 2500': 27.2 },
                    '80': { 'Class 150': 4.5, 'Class 300': 7.7, 'Class 600': 10.4, 'Class 900': 18.1, 'Class 1500': 20.4, 'Class 2500': 36.3 },
                    '100': { 'Class 150': 6.8, 'Class 300': 11.3, 'Class 600': 15.9, 'Class 900': 29.5, 'Class 1500': 31.8, 'Class 2500': 59.0 },
                    '125': { 'Class 150': 9.1, 'Class 300': 15.9, 'Class 600': 22.7, 'Class 900': 40.8, 'Class 1500': 45.4, 'Class 2500': 81.6 },
                    '150': { 'Class 150': 11.3, 'Class 300': 20.4, 'Class 600': 31.8, 'Class 900': 54.4, 'Class 1500': 63.5, 'Class 2500': 113.4 },
                    '200': { 'Class 150': 18.1, 'Class 300': 34.0, 'Class 600': 54.4, 'Class 900': 90.7, 'Class 1500': 108.9, 'Class 2500': 204.1 },
                    '250': { 'Class 150': 27.2, 'Class 300': 54.4, 'Class 600': 86.2, 'Class 900': 149.7, 'Class 1500': 181.4, 'Class 2500': 340.2 },
                    '300': { 'Class 150': 36.3, 'Class 300': 77.1, 'Class 600': 122.5, 'Class 900': 217.7, 'Class 1500': 272.2, 'Class 2500': 476.3 }
                },
                'kaynak_boyunlu': {
                    '15': { 'Class 150': 0.7, 'Class 300': 1.1, 'Class 600': 1.4, 'Class 900': 2.3, 'Class 1500': 2.3, 'Class 2500': 4.1 },
                    '20': { 'Class 150': 1.1, 'Class 300': 1.6, 'Class 600': 2.0, 'Class 900': 3.2, 'Class 1500': 3.2, 'Class 2500': 5.4 },
                    '25': { 'Class 150': 1.4, 'Class 300': 2.0, 'Class 600': 2.7, 'Class 900': 4.1, 'Class 1500': 4.1, 'Class 2500': 7.3 },
                    '32': { 'Class 150': 1.8, 'Class 300': 2.7, 'Class 600': 3.6, 'Class 900': 5.9, 'Class 1500': 5.9, 'Class 2500': 10.0 },
                    '40': { 'Class 150': 2.0, 'Class 300': 3.2, 'Class 600': 4.1, 'Class 900': 6.8, 'Class 1500': 6.8, 'Class 2500': 11.8 },
                    '50': { 'Class 150': 3.2, 'Class 300': 4.5, 'Class 600': 5.9, 'Class 900': 10.0, 'Class 1500': 10.0, 'Class 2500': 18.6 },
                    '65': { 'Class 150': 4.1, 'Class 300': 6.4, 'Class 600': 8.6, 'Class 900': 14.1, 'Class 1500': 14.1, 'Class 2500': 27.7 },
                    '80': { 'Class 150': 5.0, 'Class 300': 8.2, 'Class 600': 10.9, 'Class 900': 18.6, 'Class 1500': 20.9, 'Class 2500': 36.8 },
                    '100': { 'Class 150': 7.3, 'Class 300': 11.8, 'Class 600': 16.4, 'Class 900': 30.0, 'Class 1500': 32.3, 'Class 2500': 59.5 },
                    '125': { 'Class 150': 9.5, 'Class 300': 16.4, 'Class 600': 23.2, 'Class 900': 41.3, 'Class 1500': 45.9, 'Class 2500': 82.1 },
                    '150': { 'Class 150': 11.8, 'Class 300': 20.9, 'Class 600': 32.3, 'Class 900': 54.9, 'Class 1500': 64.0, 'Class 2500': 113.9 },
                    '200': { 'Class 150': 18.6, 'Class 300': 34.5, 'Class 600': 54.9, 'Class 900': 91.2, 'Class 1500': 109.3, 'Class 2500': 204.6 },
                    '250': { 'Class 150': 27.7, 'Class 300': 54.9, 'Class 600': 86.7, 'Class 900': 150.1, 'Class 1500': 181.9, 'Class 2500': 340.7 },
                    '300': { 'Class 150': 36.8, 'Class 300': 77.6, 'Class 600': 123.0, 'Class 900': 218.2, 'Class 1500': 272.7, 'Class 2500': 476.8 }
                },
                'kor': {
                    '15': { 'Class 150': 0.9, 'Class 300': 1.4, 'Class 600': 1.8, 'Class 900': 2.7, 'Class 1500': 2.7, 'Class 2500': 5.0 },
                    '20': { 'Class 150': 1.4, 'Class 300': 2.0, 'Class 600': 2.7, 'Class 900': 3.6, 'Class 1500': 3.6, 'Class 2500': 6.4 },
                    '25': { 'Class 150': 1.8, 'Class 300': 2.7, 'Class 600': 3.6, 'Class 900': 5.4, 'Class 1500': 5.4, 'Class 2500': 9.1 },
                    '32': { 'Class 150': 2.3, 'Class 300': 3.6, 'Class 600': 5.0, 'Class 900': 7.7, 'Class 1500': 7.7, 'Class 2500': 13.6 },
                    '40': { 'Class 150': 2.7, 'Class 300': 4.5, 'Class 600': 5.9, 'Class 900': 9.5, 'Class 1500': 9.5, 'Class 2500': 16.3 },
                    '50': { 'Class 150': 4.1, 'Class 300': 6.8, 'Class 600': 9.1, 'Class 900': 15.0, 'Class 1500': 15.0, 'Class 2500': 27.2 },
                    '65': { 'Class 150': 5.4, 'Class 300': 9.5, 'Class 600': 13.6, 'Class 900': 22.7, 'Class 1500': 22.7, 'Class 2500': 40.8 },
                    '80': { 'Class 150': 6.8, 'Class 300': 13.6, 'Class 600': 18.1, 'Class 900': 31.8, 'Class 1500': 34.0, 'Class 2500': 54.4 },
                    '100': { 'Class 150': 10.9, 'Class 300': 20.4, 'Class 600': 27.2, 'Class 900': 50.0, 'Class 1500': 54.4, 'Class 2500': 90.7 },
                    '125': { 'Class 150': 15.0, 'Class 300': 29.5, 'Class 600': 40.8, 'Class 900': 72.6, 'Class 1500': 81.6, 'Class 2500': 136.1 },
                    '150': { 'Class 150': 18.1, 'Class 300': 38.6, 'Class 600': 59.0, 'Class 900': 99.8, 'Class 1500': 117.9, 'Class 2500': 190.5 },
                    '200': { 'Class 150': 31.8, 'Class 300': 68.0, 'Class 600': 104.3, 'Class 900': 172.4, 'Class 1500': 208.7, 'Class 2500': 349.3 },
                    '250': { 'Class 150': 50.0, 'Class 300': 108.9, 'Class 600': 172.4, 'Class 900': 290.3, 'Class 1500': 353.8, 'Class 2500': 589.7 },
                    '300': { 'Class 150': 68.0, 'Class 300': 158.8, 'Class 600': 249.5, 'Class 900': 435.4, 'Class 1500': 544.3, 'Class 2500': 861.8 }
                }
            };
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="flansTipi">${this.getText('flans_tipi_label')}</label>
                        <select id="flansTipi" onchange="window.ApplicationController.updateFlansOptions()">
                            <option value="">${this.getText('select_type')}</option>
                            <option value="duz">${this.getText('duz_flans')}</option>
                            <option value="kaynak_boyunlu">${this.getText('kaynak_boyunlu')}</option>
                            <option value="kor">${this.getText('kor_flans')}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="standartSistem">${this.getText('standart_sistem_label')}</label>
                        <select id="standartSistem" onchange="window.ApplicationController.updateFlansStandards()">
                            <option value="">${this.getText('select_standard')}</option>
                            <option value="en">${this.getText('en_standard')}</option>
                            <option value="asme">${this.getText('asme_standard')}</option>
                        </select>
                    </div>
                </div>
                <div class="form-row" id="flansDimensionsRow" style="display: none;">
                    <div class="form-group">
                        <label for="flansBoyut">${this.getText('boyut_label')}</label>
                        <select id="flansBoyut" onchange="window.ApplicationController.updateFlansPressure()">
                            <option value="">${this.getText('select_size')}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="flansBasinc">${this.getText('basinc_label')}</label>
                        <select id="flansBasinc" onchange="window.ApplicationController.updateFlansWeight()">
                            <option value="">${this.getText('select_pressure')}</option>
                        </select>
                    </div>
                </div>
                <div class="form-row" id="flansInfoRow" style="display: none;">
                    <div class="form-group">
                        <small style="color: #4299e1; font-weight: 600;">
                            <span id="flansWeightInfo"></span> | 
                            <span id="flansStandardInfo"></span>
                        </small>
                    </div>
                </div>
            `;
        }

        calculate(formData) {
            const flansTipi = formData.flansTipi || '';
            const standartSistem = formData.standartSistem || '';
            const flansBoyut = formData.flansBoyut || '';
            const flansBasinc = formData.flansBasinc || '';
            const adet = parseFloat(formData.adet) || 1;
            const malzemeCinsi = formData.malzemeCinsi || 'P265GH';
            
            if (!flansTipi || !standartSistem || !flansBoyut || !flansBasinc) {
                return null;
            }
            
            // Ağırlık verilerini al
            let birimAgirlik = 0;
            
            if (standartSistem === 'en') {
                if (this.enFlansData[flansTipi] && 
                    this.enFlansData[flansTipi][flansBoyut] && 
                    this.enFlansData[flansTipi][flansBoyut][flansBasinc]) {
                    birimAgirlik = this.enFlansData[flansTipi][flansBoyut][flansBasinc];
                }
            } else if (standartSistem === 'asme') {
                if (this.asmeFlansData[flansTipi] && 
                    this.asmeFlansData[flansTipi][flansBoyut] && 
                    this.asmeFlansData[flansTipi][flansBoyut][flansBasinc]) {
                    birimAgirlik = this.asmeFlansData[flansTipi][flansBoyut][flansBasinc];
                }
            }
            
            if (!birimAgirlik) {
                return null;
            }
            
            const toplamAgirlik = birimAgirlik * adet;
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                suHacmi: null
            };
        }

        validate(formData) {
            const flansTipi = formData.flansTipi || '';
            const standartSistem = formData.standartSistem || '';
            const flansBoyut = formData.flansBoyut || '';
            const flansBasinc = formData.flansBasinc || '';
            
            if (!flansTipi || !standartSistem || !flansBoyut || !flansBasinc) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            return { isValid: true };
        }

        formatDimensions(formData) {
            const flansTipi = formData.flansTipi || '';
            const standartSistem = formData.standartSistem || '';
            const flansBoyut = formData.flansBoyut || '';
            const flansBasinc = formData.flansBasinc || '';
            
            const tipText = this.getText(flansTipi + '_flans');
            const dnNps = standartSistem === 'en' ? 'DN' : 'NPS';
            const boyutText = standartSistem === 'asme' && flansBoyut < 50 ? 
                             this.npsToInch(flansBoyut) : flansBoyut;
            
            return `${tipText} ${dnNps}${boyutText} ${flansBasinc}`;
        }

        // formatRow metodunu güncelleyin:
        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            
            // Flanş tipini sakla
            baseRow.flansTipi = formData.flansTipi;
            
            // Flanş tipini malzeme türüne yaz
            const flansTipiMap = {
                'duz': this.getText('duz_flans'),
                'kaynak_boyunlu': this.getText('kaynak_boyunlu'),
                'kor': this.getText('kor_flans')
            };
            
            baseRow.malzemeTuru = flansTipiMap[formData.flansTipi] || 'Flanş';
            
            // Standart bilgisini güncelle
            const standart = formData.standartSistem === 'en' ? 'EN 1092-1' : 'ASME B16.5';
            baseRow.enNormu = standart;
            
            // Ölçüleri formatla
            const dnNps = formData.standartSistem === 'en' ? 'DN' : 'NPS';
            const boyut = formData.standartSistem === 'asme' && formData.flansBoyut < 50 ? 
                        this.npsToInch(formData.flansBoyut) : formData.flansBoyut;
            baseRow.olculer = `${dnNps}${boyut} ${formData.flansBasinc}`;
            
            // Detay bilgilerini sakla
            baseRow.flansDetay = {
                tipi: formData.flansTipi,
                standartSistem: formData.standartSistem,
                boyut: formData.flansBoyut,
                basinc: formData.flansBasinc
            };
            
            // originalType'ı koru
            baseRow.originalType = 'flans';
            
            return baseRow;
        }

        // NPS dönüşümleri için yardımcı fonksiyon
        npsToInch(dn) {
            const npsMap = {
                '15': '1/2"', '20': '3/4"', '25': '1"', '32': '1-1/4"',
                '40': '1-1/2"', '50': '2"', '65': '2-1/2"', '80': '3"'
            };
            return npsMap[dn] || dn;
        }

        fillSpecificFields(rowData) {
            // ÖNCELİKLE: flansDetay varsa onu kullan
            if (rowData.flansDetay) {
                console.log('Flanş flansDetay bulundu:', rowData.flansDetay);
                
                const tipiElement = document.getElementById('flansTipi');
                if (tipiElement && rowData.flansDetay.tipi) {
                    tipiElement.value = rowData.flansDetay.tipi;
                    window.ApplicationController.updateFlansOptions();
                    
                    setTimeout(() => {
                        const standartElement = document.getElementById('standartSistem');
                        if (standartElement && rowData.flansDetay.standartSistem) {
                            standartElement.value = rowData.flansDetay.standartSistem;
                            window.ApplicationController.updateFlansStandards();
                            
                            setTimeout(() => {
                                const boyutElement = document.getElementById('flansBoyut');
                                if (boyutElement && rowData.flansDetay.boyut) {
                                    boyutElement.value = rowData.flansDetay.boyut;
                                    window.ApplicationController.updateFlansPressure();
                                    
                                    setTimeout(() => {
                                        const basincElement = document.getElementById('flansBasinc');
                                        if (basincElement && rowData.flansDetay.basinc) {
                                            basincElement.value = rowData.flansDetay.basinc;
                                            window.ApplicationController.updateFlansWeight();
                                        }
                                    }, 200);
                                }
                            }, 200);
                        }
                    }, 200);
                }
                return;
            }
            
            // YOKSA: Standart ve ölçülerden parse etmeye çalış
            const enNormu = rowData.enNormu || '';
            const olculer = rowData.olculer || '';
            
            // Standart sistemini belirle
            let standartSistem = '';
            if (enNormu.includes('EN 1092')) {
                standartSistem = 'en';
            } else if (enNormu.includes('ASME B16.5')) {
                standartSistem = 'asme';
            }
            
            if (standartSistem) {
                const tipiElement = document.getElementById('flansTipi');
                const standartElement = document.getElementById('standartSistem');
                
                // Flanş tipini malzeme türünden çıkar
                const malzemeTuruLower = rowData.malzemeTuru ? rowData.malzemeTuru.toLowerCase() : '';
                let flansTipi = '';
                
                if (malzemeTuruLower.includes('düz') || malzemeTuruLower.includes('slip')) {
                    flansTipi = 'duz';
                } else if (malzemeTuruLower.includes('kaynak') || malzemeTuruLower.includes('weld')) {
                    flansTipi = 'kaynak_boyunlu';
                } else if (malzemeTuruLower.includes('kör') || malzemeTuruLower.includes('blind')) {
                    flansTipi = 'kor';
                }
                
                if (tipiElement && flansTipi) {
                    tipiElement.value = flansTipi;
                    window.ApplicationController.updateFlansOptions();
                    
                    setTimeout(() => {
                        if (standartElement) {
                            standartElement.value = standartSistem;
                            window.ApplicationController.updateFlansStandards();
                            
                            // Ölçülerden DN/NPS ve basıncı parse et
                            setTimeout(() => {
                                // Örnek format: "DN200 PN40" veya "NPS8 Class 150"
                                const boyutPattern = standartSistem === 'en' ? 
                                    /DN\s*(\d+)/i : /NPS\s*([^\s]+)/i;
                                const basincPattern = standartSistem === 'en' ? 
                                    /PN\s*(\d+)/i : /Class\s*(\d+)/i;
                                
                                const boyutMatch = olculer.match(boyutPattern);
                                const basincMatch = olculer.match(basincPattern);
                                
                                if (boyutMatch) {
                                    const boyutElement = document.getElementById('flansBoyut');
                                    if (boyutElement) {
                                        // DN için doğrudan değer, NPS için inch notasyonunu bul
                                        let boyutValue = boyutMatch[1];
                                        
                                        // NPS için inch notasyonunu DN karşılığına çevir
                                        if (standartSistem === 'asme') {
                                            const npsMap = {
                                                '1/2': '15', '3/4': '20', '1': '25', '1-1/4': '32',
                                                '1-1/2': '40', '2': '50', '2-1/2': '65', '3': '80',
                                                '4': '100', '5': '125', '6': '150', '8': '200',
                                                '10': '250', '12': '300', '14': '350', '16': '400',
                                                '18': '450', '20': '500', '24': '600'
                                            };
                                            boyutValue = npsMap[boyutValue] || boyutValue;
                                        }
                                        
                                        boyutElement.value = boyutValue;
                                        window.ApplicationController.updateFlansPressure();
                                        
                                        if (basincMatch) {
                                            setTimeout(() => {
                                                const basincElement = document.getElementById('flansBasinc');
                                                if (basincElement) {
                                                    const basincValue = standartSistem === 'en' ? 
                                                        `PN${basincMatch[1]}` : `Class ${basincMatch[1]}`;
                                                    basincElement.value = basincValue;
                                                    window.ApplicationController.updateFlansWeight();
                                                }
                                            }, 200);
                                        }
                                    }
                                }
                            }, 200);
                        }
                    }, 200);
                }
            }
            // FormData öncelikli
            if (rowData.formData) {
                console.log('Flanş formData bulundu:', rowData.formData);
                
                // Önce flanş tipini seç
                const tipiElement = document.getElementById('flansTipi');
                if (tipiElement && rowData.formData.flansTipi) {
                    tipiElement.value = rowData.formData.flansTipi;
                    window.ApplicationController.updateFlansOptions();
                    
                    setTimeout(() => {
                        // Sonra standart sistemi seç
                        const standartElement = document.getElementById('standartSistem');
                        if (standartElement && rowData.formData.standartSistem) {
                            standartElement.value = rowData.formData.standartSistem;
                            window.ApplicationController.updateFlansStandards();
                            
                            setTimeout(() => {
                                // Boyut bilgisini doldur
                                const boyutElement = document.getElementById('flansBoyut');
                                if (boyutElement && rowData.formData.flansBoyut) {
                                    boyutElement.value = rowData.formData.flansBoyut;
                                    window.ApplicationController.updateFlansPressure();
                                    
                                    setTimeout(() => {
                                        // Basınç bilgisini doldur
                                        const basincElement = document.getElementById('flansBasinc');
                                        if (basincElement && rowData.formData.flansBasinc) {
                                            basincElement.value = rowData.formData.flansBasinc;
                                            window.ApplicationController.updateFlansWeight();
                                        }
                                    }, 200);
                                }
                            }, 200);
                        }
                    }, 200);
                }
                return;
            }
            
            // Alternatif olarak flansDetay'dan doldur
            if (rowData.flansDetay) {
                console.log('Flanş flansDetay bulundu:', rowData.flansDetay);
                
                const tipiElement = document.getElementById('flansTipi');
                if (tipiElement && rowData.flansDetay.tipi) {
                    tipiElement.value = rowData.flansDetay.tipi;
                    window.ApplicationController.updateFlansOptions();
                    
                    setTimeout(() => {
                        const standartElement = document.getElementById('standartSistem');
                        if (standartElement && rowData.flansDetay.standartSistem) {
                            standartElement.value = rowData.flansDetay.standartSistem;
                            window.ApplicationController.updateFlansStandards();
                            
                            setTimeout(() => {
                                const boyutElement = document.getElementById('flansBoyut');
                                if (boyutElement && rowData.flansDetay.boyut) {
                                    boyutElement.value = rowData.flansDetay.boyut;
                                    window.ApplicationController.updateFlansPressure();
                                    
                                    setTimeout(() => {
                                        const basincElement = document.getElementById('flansBasinc');
                                        if (basincElement && rowData.flansDetay.basinc) {
                                            basincElement.value = rowData.flansDetay.basinc;
                                            window.ApplicationController.updateFlansWeight();
                                        }
                                    }, 200);
                                }
                            }, 200);
                        }
                    }, 200);
                }
            }
        }
    }

    // ApplicationController'a ek fonksiyonlar
    if (!window.ApplicationController.updateFlansOptions) {
        window.ApplicationController.updateFlansOptions = function() {
            const flansTipi = document.getElementById('flansTipi').value;
            
            if (!flansTipi) {
                document.getElementById('flansDimensionsRow').style.display = 'none';
                return;
            }
        };
        
        window.ApplicationController.updateFlansStandards = function() {
            const flansTipi = document.getElementById('flansTipi').value;
            const standartSistem = document.getElementById('standartSistem').value;
            
            if (!flansTipi || !standartSistem) {
                document.getElementById('flansDimensionsRow').style.display = 'none';
                return;
            }
            
            const MaterialClass = window.MaterialRegistry.get('flans');
            const instance = new MaterialClass();
            const lang = instance.getCurrentLanguage();
            
            document.getElementById('flansDimensionsRow').style.display = 'flex';
            
            const boyutSelect = document.getElementById('flansBoyut');
            boyutSelect.innerHTML = `<option value="">${instance.getText('select_size')}</option>`;
            
            // Boyutları doldur
            let sizes = [];
            if (standartSistem === 'en') {
                sizes = Object.keys(instance.enFlansData[flansTipi] || {});
            } else if (standartSistem === 'asme') {
                sizes = Object.keys(instance.asmeFlansData[flansTipi] || {});
            }
            
            sizes.forEach(size => {
                const displaySize = standartSistem === 'asme' && size < 50 ? 
                                  instance.npsToInch(size) : size;
                const prefix = standartSistem === 'en' ? 'DN' : '';
                boyutSelect.innerHTML += `<option value="${size}">${prefix}${displaySize}</option>`;
            });
        };
        
        window.ApplicationController.updateFlansPressure = function() {
            const flansTipi = document.getElementById('flansTipi').value;
            const standartSistem = document.getElementById('standartSistem').value;
            const flansBoyut = document.getElementById('flansBoyut').value;
            
            if (!flansTipi || !standartSistem || !flansBoyut) {
                return;
            }
            
            const MaterialClass = window.MaterialRegistry.get('flans');
            const instance = new MaterialClass();
            
            const basincSelect = document.getElementById('flansBasinc');
            basincSelect.innerHTML = `<option value="">${instance.getText('select_pressure')}</option>`;
            
            // Basınç sınıflarını doldur
            let pressures = [];
            if (standartSistem === 'en') {
                pressures = Object.keys(instance.enFlansData[flansTipi][flansBoyut] || {});
            } else if (standartSistem === 'asme') {
                pressures = Object.keys(instance.asmeFlansData[flansTipi][flansBoyut] || {});
            }
            
            pressures.forEach(pressure => {
                basincSelect.innerHTML += `<option value="${pressure}">${pressure}</option>`;
            });
        };
        
        window.ApplicationController.updateFlansWeight = function() {
            const flansTipi = document.getElementById('flansTipi').value;
            const standartSistem = document.getElementById('standartSistem').value;
            const flansBoyut = document.getElementById('flansBoyut').value;
            const flansBasinc = document.getElementById('flansBasinc').value;
            
            if (!flansTipi || !standartSistem || !flansBoyut || !flansBasinc) {
                document.getElementById('flansInfoRow').style.display = 'none';
                return;
            }
            
            const MaterialClass = window.MaterialRegistry.get('flans');
            const instance = new MaterialClass();
            
            // Ağırlık bilgisini al
            let weight = 0;
            if (standartSistem === 'en') {
                weight = instance.enFlansData[flansTipi][flansBoyut][flansBasinc] || 0;
            } else if (standartSistem === 'asme') {
                weight = instance.asmeFlansData[flansTipi][flansBoyut][flansBasinc] || 0;
            }
            
            if (weight) {
                document.getElementById('flansInfoRow').style.display = 'block';
                document.getElementById('flansWeightInfo').textContent = 
                    `${instance.getText('weight_info')}: ${weight} kg`;
                document.getElementById('flansStandardInfo').textContent = 
                    `${instance.getText('standard_info')}: ${standartSistem === 'en' ? 'EN 1092-1' : 'ASME B16.5'}`;
            } else {
                document.getElementById('flansInfoRow').style.display = 'none';
            }
        };
    }

    // Malzemeyi kaydet
    const flansMaterial = new FlansMaterial();
    flansMaterial.register();

})(window);