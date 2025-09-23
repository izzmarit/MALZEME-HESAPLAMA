// Malzeme Verileri ve Sabitleri Modülü
(function(window) {
    'use strict';
    
    const MaterialData = {
    // EN Norm bilgileri
    EN_NORMLARI: {
        'S235JR': 'EN 10025-2',
        'S275JR': 'EN 10025-2',
        'P235GH': 'EN 10028-2',
        'P265GH': 'EN 10028-2',
        'P295GH': 'EN 10028-2',
        'P355GH': 'EN 10028-2',
        'P355NH': 'EN 10028-3',
        '1.4301': 'EN 10028-7',
        '1.4401': 'EN 10028-7',
        '1.4404': 'EN 10028-7',
        '1.4845': 'EN 10028-7',
        '16Mo3': 'EN 10028-2',
        'Aluminyum': 'EN 573',
        'Bakır': 'EN 1652',
        'Bronz': 'EN 1982',
        'Pirinç': 'EN 12164',
        'Delrin': 'ISO 16396-1',
        'Hardox': 'EN 10029',
        'dirsek': 'EN 10253-1'
    },

    FLANS_NORMLARI: {
        'duzFlans': 'EN 1092-1 Tip 1',
        'kaynakBoyunluFlans': 'EN 1092-1 Tip 11',
        'korFlans': 'EN 1092-1 Tip 5'
    },

    // Flanş tip isimleri
    FLANS_TIPLERI: {
        'duzFlans': 'Düz Flanş',
        'kaynakBoyunluFlans': 'Kaynak Boyunlu Flanş',
        'korFlans': 'Kör Flanş'
    },

    // Malzeme yoğunlukları (kg/m³)
    YOGUNLUKLAR: {
        'S235JR': 7850,
        'S275JR': 7850,
        'P235GH': 7850,
        'P265GH': 7850,
        'P295GH': 7850,
        'P355GH': 7850,
        'P355NH': 7850,
        '1.4301': 8000,
        '1.4401': 8000,
        '1.4404': 8000,
        '1.4845': 7900,
        '16Mo3': 7850,
        'Aluminyum': 2700,
        'Bakır': 8960,
        'Bronz': 8800,
        'Pirinç': 8470,
        'Delrin': 1410,
        'Hardox': 7850
    },

    // Profil verileri (kg/m ve kesit alanı cm²)
    profilVerileri: {
        ipe: {
            80: { agirlik: 6.0, kesitAlan: 7.64, h: 80, b: 46, tw: 3.8, tf: 5.2 },
            100: { agirlik: 8.1, kesitAlan: 10.3, h: 100, b: 55, tw: 4.1, tf: 5.7 },
            120: { agirlik: 10.4, kesitAlan: 13.2, h: 120, b: 64, tw: 4.4, tf: 6.3 },
            140: { agirlik: 12.9, kesitAlan: 16.4, h: 140, b: 73, tw: 4.7, tf: 6.9 },
            160: { agirlik: 15.8, kesitAlan: 20.1, h: 160, b: 82, tw: 5.0, tf: 7.4 },
            180: { agirlik: 18.8, kesitAlan: 23.9, h: 180, b: 91, tw: 5.3, tf: 8.0 },
            200: { agirlik: 22.4, kesitAlan: 28.5, h: 200, b: 100, tw: 5.6, tf: 8.5 },
            220: { agirlik: 26.2, kesitAlan: 33.4, h: 220, b: 110, tw: 5.9, tf: 9.2 },
            240: { agirlik: 30.7, kesitAlan: 39.1, h: 240, b: 120, tw: 6.2, tf: 9.8 },
            270: { agirlik: 36.1, kesitAlan: 45.9, h: 270, b: 135, tw: 6.6, tf: 10.2 },
            300: { agirlik: 42.2, kesitAlan: 53.8, h: 300, b: 150, tw: 7.1, tf: 10.7 },
            330: { agirlik: 49.1, kesitAlan: 62.6, h: 330, b: 160, tw: 7.5, tf: 11.5 },
            360: { agirlik: 57.1, kesitAlan: 72.7, h: 360, b: 170, tw: 8.0, tf: 12.7 },
            400: { agirlik: 66.3, kesitAlan: 84.5, h: 400, b: 180, tw: 8.6, tf: 13.5 },
            450: { agirlik: 77.6, kesitAlan: 98.8, h: 450, b: 190, tw: 9.4, tf: 14.6 },
            500: { agirlik: 90.7, kesitAlan: 115.5, h: 500, b: 200, tw: 10.2, tf: 16.0 },
            550: { agirlik: 106.0, kesitAlan: 134.4, h: 550, b: 210, tw: 11.1, tf: 17.2 },
            600: { agirlik: 122.0, kesitAlan: 156.0, h: 600, b: 220, tw: 12.0, tf: 19.0 }
        },
        hea: {
            100: { agirlik: 16.7, kesitAlan: 21.2, h: 96, b: 100, tw: 5.0, tf: 8.0 },
            120: { agirlik: 19.9, kesitAlan: 25.3, h: 114, b: 120, tw: 5.0, tf: 8.0 },
            140: { agirlik: 24.7, kesitAlan: 31.4, h: 133, b: 140, tw: 5.5, tf: 8.5 },
            160: { agirlik: 30.4, kesitAlan: 38.8, h: 152, b: 160, tw: 6.0, tf: 9.0 },
            180: { agirlik: 35.5, kesitAlan: 45.3, h: 171, b: 180, tw: 6.0, tf: 9.5 },
            200: { agirlik: 42.3, kesitAlan: 53.8, h: 190, b: 200, tw: 6.5, tf: 10.0 },
            220: { agirlik: 50.5, kesitAlan: 64.3, h: 210, b: 220, tw: 7.0, tf: 11.0 },
            240: { agirlik: 60.3, kesitAlan: 76.8, h: 230, b: 240, tw: 7.5, tf: 12.0 },
            260: { agirlik: 68.2, kesitAlan: 86.8, h: 250, b: 260, tw: 7.5, tf: 12.5 },
            280: { agirlik: 76.4, kesitAlan: 97.3, h: 270, b: 280, tw: 8.0, tf: 13.0 },
            300: { agirlik: 88.3, kesitAlan: 112.5, h: 290, b: 300, tw: 8.5, tf: 14.0 },
            320: { agirlik: 97.6, kesitAlan: 124.4, h: 310, b: 300, tw: 9.0, tf: 15.5 },
            340: { agirlik: 105.0, kesitAlan: 133.5, h: 330, b: 300, tw: 9.5, tf: 16.5 },
            360: { agirlik: 112.0, kesitAlan: 142.8, h: 350, b: 300, tw: 10.0, tf: 17.5 },
            400: { agirlik: 125.0, kesitAlan: 159.0, h: 390, b: 300, tw: 11.0, tf: 19.0 },
            450: { agirlik: 140.0, kesitAlan: 178.0, h: 440, b: 300, tw: 11.5, tf: 21.0 },
            500: { agirlik: 155.0, kesitAlan: 197.5, h: 490, b: 300, tw: 12.0, tf: 23.0 }
        },
        heb: {
            100: { agirlik: 20.4, kesitAlan: 26.0, h: 100, b: 100, tw: 6.0, tf: 10.0 },
            120: { agirlik: 26.7, kesitAlan: 34.0, h: 120, b: 120, tw: 6.5, tf: 11.0 },
            140: { agirlik: 33.7, kesitAlan: 43.0, h: 140, b: 140, tw: 7.0, tf: 12.0 },
            160: { agirlik: 42.6, kesitAlan: 54.3, h: 160, b: 160, tw: 8.0, tf: 13.0 },
            180: { agirlik: 51.2, kesitAlan: 65.3, h: 180, b: 180, tw: 8.5, tf: 14.0 },
            200: { agirlik: 61.3, kesitAlan: 78.1, h: 200, b: 200, tw: 9.0, tf: 15.0 },
            220: { agirlik: 71.5, kesitAlan: 91.0, h: 220, b: 220, tw: 9.5, tf: 16.0 },
            240: { agirlik: 83.2, kesitAlan: 106.0, h: 240, b: 240, tw: 10.0, tf: 17.0 },
            260: { agirlik: 93.0, kesitAlan: 118.4, h: 260, b: 260, tw: 10.0, tf: 17.5 },
            280: { agirlik: 103.5, kesitAlan: 131.4, h: 280, b: 280, tw: 10.5, tf: 18.0 },
            300: { agirlik: 117.0, kesitAlan: 149.1, h: 300, b: 300, tw: 11.0, tf: 19.0 },
            320: { agirlik: 127.0, kesitAlan: 161.3, h: 320, b: 300, tw: 11.5, tf: 20.5 },
            340: { agirlik: 134.0, kesitAlan: 170.9, h: 340, b: 300, tw: 12.0, tf: 21.5 },
            360: { agirlik: 142.0, kesitAlan: 180.6, h: 360, b: 300, tw: 12.5, tf: 22.5 },
            400: { agirlik: 155.0, kesitAlan: 197.8, h: 400, b: 300, tw: 13.5, tf: 24.0 },
            450: { agirlik: 171.0, kesitAlan: 218.0, h: 450, b: 300, tw: 14.0, tf: 26.0 },
            500: { agirlik: 187.0, kesitAlan: 239.0, h: 500, b: 300, tw: 14.5, tf: 28.0 }
        },
        npu: {
            80: { agirlik: 8.64, kesitAlan: 11.0, h: 80, b: 45, tw: 6.0, tf: 8.0 },
            100: { agirlik: 10.6, kesitAlan: 13.5, h: 100, b: 50, tw: 6.0, tf: 8.5 },
            120: { agirlik: 13.4, kesitAlan: 17.0, h: 120, b: 55, tw: 7.0, tf: 9.0 },
            140: { agirlik: 16.0, kesitAlan: 20.4, h: 140, b: 60, tw: 7.0, tf: 10.0 },
            160: { agirlik: 18.8, kesitAlan: 24.0, h: 160, b: 65, tw: 7.5, tf: 10.5 },
            180: { agirlik: 22.0, kesitAlan: 28.0, h: 180, b: 70, tw: 8.0, tf: 11.0 },
            200: { agirlik: 25.3, kesitAlan: 32.2, h: 200, b: 75, tw: 8.5, tf: 11.5 },
            220: { agirlik: 29.4, kesitAlan: 37.4, h: 220, b: 80, tw: 9.0, tf: 12.5 },
            240: { agirlik: 33.2, kesitAlan: 42.3, h: 240, b: 85, tw: 9.5, tf: 13.0 },
            260: { agirlik: 37.9, kesitAlan: 48.3, h: 260, b: 90, tw: 10.0, tf: 14.0 },
            280: { agirlik: 41.8, kesitAlan: 53.3, h: 280, b: 95, tw: 10.0, tf: 15.0 },
            300: { agirlik: 46.2, kesitAlan: 58.8, h: 300, b: 100, tw: 10.0, tf: 16.0 },
            320: { agirlik: 59.5, kesitAlan: 75.8, h: 320, b: 100, tw: 14.0, tf: 17.5 },
            350: { agirlik: 60.6, kesitAlan: 77.3, h: 350, b: 100, tw: 14.0, tf: 16.0 },
            380: { agirlik: 63.1, kesitAlan: 80.4, h: 380, b: 102, tw: 13.5, tf: 16.0 },
            400: { agirlik: 71.8, kesitAlan: 91.5, h: 400, b: 110, tw: 14.0, tf: 18.0 }
        },
        npi: {
            80: { agirlik: 5.94, kesitAlan: 7.57, h: 80, b: 42, tw: 3.9, tf: 5.9 },
            100: { agirlik: 8.34, kesitAlan: 10.6, h: 100, b: 50, tw: 4.5, tf: 6.8 },
            120: { agirlik: 11.1, kesitAlan: 14.2, h: 120, b: 58, tw: 5.1, tf: 7.7 },
            140: { agirlik: 14.3, kesitAlan: 18.2, h: 140, b: 66, tw: 5.7, tf: 8.6 },
            160: { agirlik: 17.9, kesitAlan: 22.8, h: 160, b: 74, tw: 6.3, tf: 9.5 },
            180: { agirlik: 21.9, kesitAlan: 27.9, h: 180, b: 82, tw: 6.9, tf: 10.4 },
            200: { agirlik: 26.3, kesitAlan: 33.5, h: 200, b: 90, tw: 7.5, tf: 11.3 },
            220: { agirlik: 31.1, kesitAlan: 39.6, h: 220, b: 98, tw: 8.1, tf: 12.2 },
            240: { agirlik: 36.2, kesitAlan: 46.1, h: 240, b: 106, tw: 8.7, tf: 13.1 },
            260: { agirlik: 41.9, kesitAlan: 53.4, h: 260, b: 113, tw: 9.4, tf: 14.1 },
            280: { agirlik: 47.9, kesitAlan: 61.1, h: 280, b: 119, tw: 10.1, tf: 15.2 },
            300: { agirlik: 54.2, kesitAlan: 69.1, h: 300, b: 125, tw: 10.8, tf: 16.2 },
            320: { agirlik: 61.0, kesitAlan: 77.8, h: 320, b: 131, tw: 11.5, tf: 17.3 },
            340: { agirlik: 68.1, kesitAlan: 86.8, h: 340, b: 137, tw: 12.2, tf: 18.3 },
            360: { agirlik: 76.2, kesitAlan: 97.1, h: 360, b: 143, tw: 13.0, tf: 19.5 },
            380: { agirlik: 84.0, kesitAlan: 107.1, h: 380, b: 149, tw: 13.7, tf: 20.5 },
            400: { agirlik: 92.6, kesitAlan: 118.0, h: 400, b: 155, tw: 14.4, tf: 21.6 },
            425: { agirlik: 104.0, kesitAlan: 132.5, h: 425, b: 163, tw: 15.3, tf: 23.0 },
            450: { agirlik: 116.0, kesitAlan: 147.6, h: 450, b: 170, tw: 16.2, tf: 24.3 },
            475: { agirlik: 128.0, kesitAlan: 163.5, h: 475, b: 178, tw: 17.1, tf: 25.6 },
            500: { agirlik: 141.0, kesitAlan: 180.0, h: 500, b: 185, tw: 18.0, tf: 27.0 },
            550: { agirlik: 167.0, kesitAlan: 213.0, h: 550, b: 200, tw: 19.0, tf: 30.0 },
            600: { agirlik: 199.0, kesitAlan: 254.0, h: 600, b: 215, tw: 21.6, tf: 32.4 }
        }
    },

    // Dirsek Ağırlık Verileri - EN 10253-1
    dirsekVerileri: {
        // 90° Long Radius (R=1.5D) Dirsekler
        '90': {
            // DN15 (21.3mm dış çap)
            '15': {
                '2.0': 0.03,
                '2.3': 0.04,
                '2.6': 0.04,
                '2.9': 0.05,
                '3.2': 0.05
            },
            // DN20 (26.9mm dış çap)
            '20': {
                '2.0': 0.05,
                '2.3': 0.06,
                '2.6': 0.07,
                '2.9': 0.08,
                '3.6': 0.09
            },
            // DN25 (33.7mm dış çap)
            '25': {
                '2.3': 0.10,
                '2.6': 0.11,
                '2.9': 0.12,
                '3.2': 0.14,
                '4.0': 0.17
            },
            // DN32 (42.4mm dış çap)
            '32': {
                '2.6': 0.17,
                '2.9': 0.19,
                '3.2': 0.21,
                '3.6': 0.24,
                '4.5': 0.29
            },
            // DN40 (48.3mm dış çap)
            '40': {
                '2.6': 0.23,
                '2.9': 0.25,
                '3.2': 0.28,
                '3.7': 0.32,
                '5.1': 0.43
            },
            // DN50 (60.3mm dış çap)
            '50': {
                '2.9': 0.39,
                '3.2': 0.43,
                '3.6': 0.48,
                '4.5': 0.59,
                '5.6': 0.73
            },
            // DN65 (76.1mm dış çap)
            '65': {
                '2.9': 0.63,
                '3.2': 0.69,
                '3.6': 0.78,
                '5.0': 1.06,
                '7.1': 1.47
            },
            // DN80 (88.9mm dış çap)
            '80': {
                '3.2': 0.94,
                '3.6': 1.06,
                '4.0': 1.17,
                '5.6': 1.61,
                '7.6': 2.15
            },
            // DN100 (114.3mm dış çap)
            '100': {
                '3.6': 1.77,
                '4.0': 1.96,
                '4.5': 2.19,
                '6.3': 3.03,
                '8.6': 4.07
            },
            // DN125 (141.3mm dış çap)
            '125': {
                '4.0': 3.01,
                '4.5': 3.37,
                '5.0': 3.74,
                '6.3': 4.67,
                '10.0': 7.26
            },
            // DN150 (168.3mm dış çap)
            '150': {
                '4.5': 4.81,
                '5.0': 5.33,
                '5.6': 5.95,
                '7.1': 7.48,
                '11.0': 11.41
            },
            // DN200 (219.1mm dış çap)
            '200': {
                '5.0': 9.06,
                '5.6': 10.13,
                '6.3': 11.36,
                '8.0': 14.35,
                '12.5': 22.10
            },
            // DN250 (273.0mm dış çap)
            '250': {
                '5.6': 15.76,
                '6.3': 17.69,
                '7.1': 19.88,
                '9.3': 25.92,
                '15.1': 41.44
            },
            // DN300 (323.9mm dış çap)
            '300': {
                '5.9': 23.54,
                '6.3': 25.11,
                '7.1': 28.24,
                '10.0': 39.43,
                '17.5': 67.56
            }
        },

        // 180° Dirsekler (90° değerlerinin 2 katı)
        '180': {
            // DN15 (21.3mm dış çap)
            '15': {
                '2.0': 0.06,
                '2.3': 0.08,
                '2.6': 0.08,
                '2.9': 0.10,
                '3.2': 0.10
            },
            // DN20 (26.9mm dış çap)
            '20': {
                '2.0': 0.10,
                '2.3': 0.12,
                '2.6': 0.14,
                '2.9': 0.16,
                '3.6': 0.18
            },
            // DN25 (33.7mm dış çap)
            '25': {
                '2.3': 0.20,
                '2.6': 0.22,
                '2.9': 0.24,
                '3.2': 0.28,
                '4.0': 0.34
            },
            // DN32 (42.4mm dış çap)
            '32': {
                '2.6': 0.34,
                '2.9': 0.38,
                '3.2': 0.42,
                '3.6': 0.48,
                '4.5': 0.58
            },
            // DN40 (48.3mm dış çap)
            '40': {
                '2.6': 0.46,
                '2.9': 0.50,
                '3.2': 0.56,
                '3.7': 0.64,
                '5.1': 0.86
            },
            // DN50 (60.3mm dış çap)
            '50': {
                '2.9': 0.78,
                '3.2': 0.86,
                '3.6': 0.96,
                '4.5': 1.18,
                '5.6': 1.46
            },
            // DN65 (76.1mm dış çap)
            '65': {
                '2.9': 1.26,
                '3.2': 1.38,
                '3.6': 1.56,
                '5.0': 2.12,
                '7.1': 2.94
            },
            // DN80 (88.9mm dış çap)
            '80': {
                '3.2': 1.88,
                '3.6': 2.12,
                '4.0': 2.34,
                '5.6': 3.22,
                '7.6': 4.30
            },
            // DN100 (114.3mm dış çap)
            '100': {
                '3.6': 3.54,
                '4.0': 3.92,
                '4.5': 4.38,
                '6.3': 6.06,
                '8.6': 8.14
            },
            // DN125 (141.3mm dış çap)
            '125': {
                '4.0': 6.02,
                '4.5': 6.74,
                '5.0': 7.48,
                '6.3': 9.34,
                '10.0': 14.52
            },
            // DN150 (168.3mm dış çap)
            '150': {
                '4.5': 9.62,
                '5.0': 10.66,
                '5.6': 11.90,
                '7.1': 14.96,
                '11.0': 22.82
            },
            // DN200 (219.1mm dış çap)
            '200': {
                '5.0': 18.12,
                '5.6': 20.26,
                '6.3': 22.72,
                '8.0': 28.70,
                '12.5': 44.20
            },
            // DN250 (273.0mm dış çap)
            '250': {
                '5.6': 31.52,
                '6.3': 35.38,
                '7.1': 39.76,
                '9.3': 51.84,
                '15.1': 82.88
            },
            // DN300 (323.9mm dış çap)
            '300': {
                '5.9': 47.08,
                '6.3': 50.22,
                '7.1': 56.48,
                '10.0': 78.86,
                '17.5': 135.12
            }
        },

        // 45° Long Radius Dirsekler
        '45': {
            // Ağırlıklar 90° dirseğin yaklaşık %65'i kadardır
            '15': { '2.3': 0.026, '2.9': 0.033, '3.2': 0.033 },
            '20': { '2.3': 0.039, '2.9': 0.052, '3.6': 0.059 },
            '25': { '2.6': 0.072, '3.2': 0.091, '4.0': 0.111 },
            '32': { '2.9': 0.124, '3.6': 0.156, '4.5': 0.189 },
            '40': { '2.9': 0.163, '3.7': 0.208, '5.1': 0.280 },
            '50': { '3.2': 0.280, '4.5': 0.384, '5.6': 0.475 },
            '65': { '3.2': 0.449, '5.0': 0.689, '7.1': 0.956 },
            '80': { '3.6': 0.689, '5.6': 1.047, '7.6': 1.398 },
            '100': { '4.0': 1.274, '6.3': 1.970, '8.6': 2.646 },
            '125': { '4.5': 2.191, '6.3': 3.036, '10.0': 4.719 },
            '150': { '5.0': 3.465, '7.1': 4.862, '11.0': 7.417 },
            '200': { '5.6': 6.585, '8.0': 9.328, '12.5': 14.365 },
            '250': { '6.3': 11.499, '9.3': 16.848, '15.1': 26.936 },
            '300': { '6.3': 16.322, '10.0': 25.630, '17.5': 43.914 }
        }
    },

    // Dirsek tip açıklamaları
    DIRSEK_TIPLERI: {
        '90': '90°',
        '180': '180°'
    },

    // Flanş ağırlık verileri (kg cinsinden)
    flansVerileri: {
        // Düz Flanş (Tip 1) - EN 1092-1
        duzFlans: {
            // DN15
            '15': {
                'PN6': 0.5, 'PN10': 0.5, 'PN16': 0.6, 'PN25': 0.7, 'PN40': 0.8
            },
            // DN20
            '20': {
                'PN6': 0.6, 'PN10': 0.6, 'PN16': 0.7, 'PN25': 0.9, 'PN40': 1.1
            },
            // DN25
            '25': {
                'PN6': 0.8, 'PN10': 0.8, 'PN16': 0.9, 'PN25': 1.2, 'PN40': 1.5
            },
            // DN32
            '32': {
                'PN6': 1.0, 'PN10': 1.0, 'PN16': 1.2, 'PN25': 1.6, 'PN40': 2.0
            },
            // DN40
            '40': {
                'PN6': 1.2, 'PN10': 1.2, 'PN16': 1.4, 'PN25': 1.8, 'PN40': 2.3
            },
            // DN50
            '50': {
                'PN6': 1.5, 'PN10': 1.5, 'PN16': 1.8, 'PN25': 2.3, 'PN40': 3.0
            },
            // DN65
            '65': {
                'PN6': 2.0, 'PN10': 2.0, 'PN16': 2.4, 'PN25': 3.2, 'PN40': 4.2
            },
            // DN80
            '80': {
                'PN6': 2.5, 'PN10': 2.5, 'PN16': 3.0, 'PN25': 4.0, 'PN40': 5.3
            },
            // DN100
            '100': {
                'PN6': 3.2, 'PN10': 3.5, 'PN16': 4.2, 'PN25': 5.5, 'PN40': 7.5
            },
            // DN125
            '125': {
                'PN6': 4.5, 'PN10': 5.0, 'PN16': 6.0, 'PN25': 8.0, 'PN40': 10.5
            },
            // DN150
            '150': {
                'PN6': 5.5, 'PN10': 6.2, 'PN16': 7.5, 'PN25': 10.0, 'PN40': 13.5
            },
            // DN200
            '200': {
                'PN6': 8.5, 'PN10': 9.5, 'PN16': 11.5, 'PN25': 15.5, 'PN40': 21.0
            },
            // DN250
            '250': {
                'PN6': 12.5, 'PN10': 14.0, 'PN16': 17.5, 'PN25': 23.5, 'PN40': 32.0
            },
            // DN300
            '300': {
                'PN6': 16.0, 'PN10': 18.5, 'PN16': 23.0, 'PN25': 31.5, 'PN40': 43.0
            },
            // DN350
            '350': {
                'PN6': 20.5, 'PN10': 24.0, 'PN16': 30.0, 'PN25': 41.0, 'PN40': 56.0
            },
            // DN400
            '400': {
                'PN6': 25.0, 'PN10': 29.5, 'PN16': 37.5, 'PN25': 51.5, 'PN40': 71.0
            },
            // DN500
            '500': {
                'PN6': 37.0, 'PN10': 44.0, 'PN16': 56.5, 'PN25': 78.0, 'PN40': 108.0
            },
            // DN600
            '600': {
                'PN6': 51.0, 'PN10': 61.0, 'PN16': 79.0, 'PN25': 110.0, 'PN40': 153.0
            }
        },
        
        // Kaynak Boyunlu Flanş (Tip 11) - EN 1092-1
        kaynakBoyunluFlans: {
            '15': {
                'PN6': 0.6, 'PN10': 0.6, 'PN16': 0.7, 'PN25': 0.8, 'PN40': 1.0
            },
            '20': {
                'PN6': 0.7, 'PN10': 0.7, 'PN16': 0.8, 'PN25': 1.0, 'PN40': 1.3
            },
            '25': {
                'PN6': 0.9, 'PN10': 0.9, 'PN16': 1.1, 'PN25': 1.4, 'PN40': 1.8
            },
            '32': {
                'PN6': 1.2, 'PN10': 1.2, 'PN16': 1.4, 'PN25': 1.9, 'PN40': 2.4
            },
            '40': {
                'PN6': 1.4, 'PN10': 1.4, 'PN16': 1.7, 'PN25': 2.2, 'PN40': 2.8
            },
            '50': {
                'PN6': 1.8, 'PN10': 1.8, 'PN16': 2.2, 'PN25': 2.8, 'PN40': 3.7
            },
            '65': {
                'PN6': 2.5, 'PN10': 2.5, 'PN16': 3.0, 'PN25': 4.0, 'PN40': 5.2
            },
            '80': {
                'PN6': 3.1, 'PN10': 3.1, 'PN16': 3.7, 'PN25': 5.0, 'PN40': 6.6
            },
            '100': {
                'PN6': 4.0, 'PN10': 4.3, 'PN16': 5.2, 'PN25': 6.9, 'PN40': 9.4
            },
            '125': {
                'PN6': 5.6, 'PN10': 6.2, 'PN16': 7.5, 'PN25': 10.0, 'PN40': 13.1
            },
            '150': {
                'PN6': 6.9, 'PN10': 7.7, 'PN16': 9.4, 'PN25': 12.5, 'PN40': 16.9
            },
            '200': {
                'PN6': 10.6, 'PN10': 11.9, 'PN16': 14.4, 'PN25': 19.4, 'PN40': 26.3
            },
            '250': {
                'PN6': 15.6, 'PN10': 17.5, 'PN16': 21.9, 'PN25': 29.4, 'PN40': 40.0
            },
            '300': {
                'PN6': 20.0, 'PN10': 23.1, 'PN16': 28.8, 'PN25': 39.4, 'PN40': 53.8
            },
            '350': {
                'PN6': 25.6, 'PN10': 30.0, 'PN16': 37.5, 'PN25': 51.3, 'PN40': 70.0
            },
            '400': {
                'PN6': 31.3, 'PN10': 36.9, 'PN16': 46.9, 'PN25': 64.4, 'PN40': 88.8
            },
            '500': {
                'PN6': 46.3, 'PN10': 55.0, 'PN16': 70.6, 'PN25': 97.5, 'PN40': 135.0
            },
            '600': {
                'PN6': 63.8, 'PN10': 76.3, 'PN16': 98.8, 'PN25': 137.5, 'PN40': 191.3
            }
        },
        
        // Kör Flanş (Tip 5) - EN 1092-1  
        korFlans: {
            '15': {
                'PN6': 0.7, 'PN10': 0.7, 'PN16': 0.8, 'PN25': 1.0, 'PN40': 1.2
            },
            '20': {
                'PN6': 0.8, 'PN10': 0.8, 'PN16': 1.0, 'PN25': 1.3, 'PN40': 1.6
            },
            '25': {
                'PN6': 1.1, 'PN10': 1.1, 'PN16': 1.3, 'PN25': 1.7, 'PN40': 2.2
            },
            '32': {
                'PN6': 1.5, 'PN10': 1.5, 'PN16': 1.8, 'PN25': 2.3, 'PN40': 3.0
            },
            '40': {
                'PN6': 1.8, 'PN10': 1.8, 'PN16': 2.1, 'PN25': 2.7, 'PN40': 3.5
            },
            '50': {
                'PN6': 2.2, 'PN10': 2.2, 'PN16': 2.7, 'PN25': 3.5, 'PN40': 4.5
            },
            '65': {
                'PN6': 3.1, 'PN10': 3.1, 'PN16': 3.7, 'PN25': 4.9, 'PN40': 6.4
            },
            '80': {
                'PN6': 3.9, 'PN10': 3.9, 'PN16': 4.6, 'PN25': 6.2, 'PN40': 8.1
            },
            '100': {
                'PN6': 5.4, 'PN10': 5.8, 'PN16': 7.0, 'PN25': 9.2, 'PN40': 12.5
            },
            '125': {
                'PN6': 7.6, 'PN10': 8.4, 'PN16': 10.1, 'PN25': 13.5, 'PN40': 17.6
            },
            '150': {
                'PN6': 9.6, 'PN10': 10.8, 'PN16': 13.1, 'PN25': 17.5, 'PN40': 23.6
            },
            '200': {
                'PN6': 15.2, 'PN10': 17.0, 'PN16': 20.6, 'PN25': 27.7, 'PN40': 37.5
            },
            '250': {
                'PN6': 23.0, 'PN10': 25.8, 'PN16': 32.2, 'PN25': 43.2, 'PN40': 58.9
            },
            '300': {
                'PN6': 31.0, 'PN10': 35.8, 'PN16': 44.6, 'PN25': 61.0, 'PN40': 83.3
            },
            '350': {
                'PN6': 40.5, 'PN10': 47.5, 'PN16': 59.3, 'PN25': 81.2, 'PN40': 110.8
            },
            '400': {
                'PN6': 50.8, 'PN10': 59.9, 'PN16': 76.1, 'PN25': 104.5, 'PN40': 144.0
            },
            '500': {
                'PN6': 77.8, 'PN10': 92.4, 'PN16': 118.6, 'PN25': 163.8, 'PN40': 226.9
            },
            '600': {
                'PN6': 110.5, 'PN10': 132.0, 'PN16': 170.9, 'PN25': 237.9, 'PN40': 331.1
            }
        }
    },

    // Izgara Elemanları verileri (kg/adet cinsinden)
    izgaraElemanlari: {
        'Normal Açık Iz.': { adetKg: 2.35, olcu: 'F2E 22435', malzeme: 'A10', norm: 'EN 10295' },
        'Normal Kapalı Iz.': { adetKg: 2.35, olcu: 'F2E 22571', malzeme: 'A10', norm: 'EN 10295' },
        'Curuf Iz. Elemanı': { adetKg: 5, olcu: 'F2E 22380', malzeme: 'A10', norm: 'EN 10295' },
        'Büyük Kapalı Iz.': { adetKg: 19, olcu: 'R 12751', malzeme: 'A10', norm: 'EN 10295' },
        'Küçük Kapalı Iz.': { adetKg: 4, olcu: 'R 13415', malzeme: 'A10', norm: 'EN 10295' },
        'Curuf Iz. Taşıyıcı Kapak K.': { adetKg: 2, olcu: 'F2T 456 A', malzeme: 'A10', norm: 'EN 10295' },
        'Curuf Iz. Taşıyıcı Kapak': { adetKg: 6.5, olcu: 'F2T 456', malzeme: 'A10', norm: 'EN 10295' },
        'Klape Parçası': { adetKg: 17, olcu: 'TF 10820 A', malzeme: 'A10', norm: 'EN 10295' },
        'Küçük Klape Parçası': { adetKg: 7, olcu: 'TF 10820 B', malzeme: 'A10', norm: 'EN 10295' },
        'Sızdırmazlık Parçası': { adetKg: 8.5, olcu: 'TF 10820', malzeme: 'A10', norm: 'EN 10295' },
        'Küçük Sızdırmazlık Parçası': { adetKg: 4.3, olcu: 'TF 10820/1', malzeme: 'A10', norm: 'EN 10295' },
        'Yarıklı Saplama': { adetKg: 0.17, olcu: 'F2T 259/1', malzeme: 'St37', norm: 'EN 10295' },
        'Yarıklı Saplama Pulu': { adetKg: 0.4, olcu: 'F2T 259 A', malzeme: 'St37', norm: 'EN 10295' },
        'Normal Yan Duvar Parçası': { adetKg: 18, olcu: 'F2E 22370', malzeme: 'A10', norm: 'EN 10295' },
        'Geçiş Yan Duvar Parçası': { adetKg: 17, olcu: 'F2E 22371', malzeme: 'A10', norm: 'EN 10295' },
        'En Üst Yan Duvar Parçası': { adetKg: 16, olcu: 'F2E 22379', malzeme: 'A10', norm: 'EN 10295' },
        'Curuf Iz. Yan Duvar Parçası': { adetKg: 17, olcu: 'F2E 22438', malzeme: 'A10', norm: 'EN 10295' },
        'Sabit Iz. Montaj Konsolu': { adetKg: 3.35, olcu: '764 HIZ 069/37', malzeme: 'S235JR', norm: 'EN 10025-2' },
        'Mil Yuvarlanma Konsolu': { adetKg: 13, olcu: 'TF 20293', malzeme: 'S235JR', norm: 'EN 10025-2' },
        'Mil Yuvarlanma Üst Parça': { adetKg: 9, olcu: 'TF 12715', malzeme: 'GG25', norm: 'EN 10025-2' },
        'Yuvarlanma Mili': { adetKg: 2, olcu: 'TF 12715/1', malzeme: 'St50', norm: 'EN 10025-2' },
        'Yan Tutucu Lama': { adetKg: 1, olcu: 'TF 20292', malzeme: 'St37', norm: 'EN 10025-2' },
        'Mil Yan Klavuz Elemanı-Sol': { adetKg: 6.2, olcu: 'TF 20295', malzeme: 'GG50', norm: 'EN 10025-2' },
        'Mil Yan Klavuz Elemanı-Sağ': { adetKg: 6.2, olcu: 'TF 20295/1', malzeme: 'GG50', norm: 'EN 10025-2' },
        'Mil Yuvarlanma Alt': { adetKg: 7, olcu: 'TF 20294', malzeme: 'GG25', norm: 'EN 10025-2' },
        'Normal Izgara Plakası': { adetKg: 11.5, olcu: 'TT-B1', malzeme: 'A10', norm: 'EN 10295' },
        'Izgara Sağ Yan Plaka': { adetKg: 10.52, olcu: 'TT-B2', malzeme: 'A10', norm: 'EN 10295' },
        'Izgara Sol Yan Plaka': { adetKg: 5.8, olcu: 'TT-B3', malzeme: 'A10', norm: 'EN 10295' },
        'Normal Izgara Plaka (A04)': { adetKg: 10, olcu: 'TT-B4', malzeme: 'A10', norm: 'EN 10295' },
        'Izgara Sol Yan Plaka (A05)': { adetKg: 6.5, olcu: 'TT-B5', malzeme: 'A10', norm: 'EN 10295' },
        'Izgara Sağ Yan Plaka (A06)': { adetKg: 6.5, olcu: 'TT-B6', malzeme: 'A10', norm: 'EN 10295' },
        'Sürtünme Plakası-1': { adetKg: 8, olcu: 'TT-B7', malzeme: 'A10', norm: 'EN 10295' },
        'Sürtünme Plakası-2': { adetKg: 15, olcu: 'TT-B8', malzeme: 'A10', norm: 'EN 10295' },
        'Sürtünme Plakası-3': { adetKg: 15, olcu: 'TT-B9', malzeme: 'A10', norm: 'EN 10295' },
        'TE-1 Normal Iz. Elemanı 10D': { adetKg: 8.2, olcu: 'TE-1', malzeme: 'A10', norm: 'EN 10295' },
        'TE-1 Normal Iz. Elemanı 6D': { adetKg: 8.2, olcu: 'TE-1', malzeme: 'A10', norm: 'EN 10295' },
        'TE-1 Normal Iz. Elemanı 4D': { adetKg: 8.2, olcu: 'TE-1', malzeme: 'A10', norm: 'EN 10295' },
        'TE-2 Dar Ara Iz. Elemanı': { adetKg: 4.6, olcu: 'TE-2', malzeme: 'A10', norm: 'EN 10295' },
        'TE-3 Normal Deliksiz Iz. Elemanı': { adetKg: 4.6, olcu: 'TE-3', malzeme: 'A10', norm: 'EN 10295' },
        'TE-4 Kapalı Normal Iz. Elemanı': { adetKg: 7.33, olcu: 'TE-4', malzeme: 'A10', norm: 'EN 10295' },
        'TE-4A Açık Normal Iz. Elemanı': { adetKg: 7.5, olcu: 'TE-4A', malzeme: 'A10', norm: 'EN 10295' },
        'TE-4B Açık Normal Iz. Elemanı 6D': { adetKg: 7.33, olcu: 'TE-4B', malzeme: 'A10', norm: 'EN 10295' },
        'TE-5A Açık Normal Iz. Elemanı': { adetKg: 3.84, olcu: 'TE-5A', malzeme: 'A10', norm: 'EN 10295' }
    },

    // Malzeme türleri yönetimi için yeni bölüm
    MALZEME_TURLERI: {
        'sac': { 
            ad: 'Sac', 
            olcuAlanlari: [
                { kod: 'kalinlik', ad: 'Kalınlık', tip: 'sayi' },
                { kod: 'en', ad: 'En', tip: 'sayi' },
                { kod: 'boy', ad: 'Boy', tip: 'sayi' }
            ],
            birim: 'mm',
            hesaplamaTipi: 'hacim'
        },
        'lama': { 
            ad: 'Lama', 
            olcuAlanlari: [
                { kod: 'kalinlik', ad: 'Kalınlık', tip: 'sayi' },
                { kod: 'genislik', ad: 'Genişlik', tip: 'sayi' },
                { kod: 'uzunluk', ad: 'Uzunluk', tip: 'sayi' }
            ],
            birim: 'mm',
            hesaplamaTipi: 'hacim'
        },
        'boru': { 
            ad: 'Boru', 
            olcuAlanlari: [
                { kod: 'disCap', ad: 'Dış Çap', tip: 'cap' },
                { kod: 'etKalinlik', ad: 'Et Kalınlığı', tip: 'sayi' },
                { kod: 'uzunluk', ad: 'Uzunluk', tip: 'sayi' }
            ],
            birim: 'mm',
            hesaplamaTipi: 'boru'
        },
        'mil': { 
            ad: 'Mil', 
            olcuAlanlari: [
                { kod: 'cap', ad: 'Çap', tip: 'cap' },
                { kod: 'boy', ad: 'Boy', tip: 'sayi' }
            ],
            birim: 'mm',
            hesaplamaTipi: 'silindir'
        },
        'ipe': { ad: 'IPE Profil', tip: 'profil' },
        'hea': { ad: 'HEA Profil', tip: 'profil' },
        'heb': { ad: 'HEB Profil', tip: 'profil' },
        'npu': { ad: 'NPU Profil', tip: 'profil' },
        'npi': { ad: 'NPI Profil', tip: 'profil' },
        'flans': { ad: 'Standart Flanş', tip: 'ozel' },
        'ozelFlans': { ad: 'Özel Flanş', tip: 'ozel' },
        'dirsek': { ad: 'Dirsek', tip: 'ozel' },
        'izgara': { ad: 'Izgara Elemanı', tip: 'ozel' },
        'ozelMalzeme': { ad: 'Özel Malzeme', tip: 'ozel' }
    },

    // Hesaplama tipleri
    HESAPLAMA_TIPLERI: [
        { kod: 'hacim', ad: 'Hacim Hesaplama (Ölçüleri Çarp)', aciklama: 'Tüm ölçüleri çarparak hacim hesaplar' },
        { kod: 'birimAgirlik', ad: 'Birim Ağırlık Girişi', aciklama: 'Ağırlığı manuel girin' },
        { kod: 'silindir', ad: 'Silindir Hacmi', aciklama: 'π × r² × h formülü' },
        { kod: 'boru', ad: 'Boru Hesaplama', aciklama: 'Dış ve iç çap farkı' },
        { kod: 'ozel', ad: 'Özel Hesaplama', aciklama: 'Özel formül tanımlayın' }
    ],

    // Güncellenen malzeme türü ekleme fonksiyonu
    addMaterialType: function(kod, ad, olcuAlanlari, birim, hesaplamaTipi) {
        const customTypes = this.getCustomMaterialTypes();
        
        // Ölçü alanlarını obje formatına dönüştür
        const olcuAlanlariObjeler = olcuAlanlari.map(alanKodu => {
            const alanTanim = this.OLCU_ALAN_TIPLERI.find(tip => tip.kod === alanKodu);
            return alanTanim || { kod: alanKodu, ad: alanKodu, tip: 'sayi' };
        });
        
        customTypes[kod] = { 
            ad: ad, 
            olcuAlanlari: olcuAlanlariObjeler, 
            birim: birim,
            hesaplamaTipi: hesaplamaTipi || 'hacim',
            custom: true 
        };
        
        this.saveCustomMaterialTypes(customTypes);
        this.MALZEME_TURLERI[kod] = customTypes[kod];
        return true;
    },

    // Özel malzeme türleri yönetimi
    getCustomMaterialTypes: function() {
        const stored = localStorage.getItem('customMaterialTypes');
        return stored ? JSON.parse(stored) : {};
    },

    saveCustomMaterialTypes: function(types) {
        localStorage.setItem('customMaterialTypes', JSON.stringify(types));
    },

    addMaterialType: function(kod, ad, olcuAlanlari, birim = 'mm') {
        const customTypes = this.getCustomMaterialTypes();
        customTypes[kod] = { ad, olcuAlanlari, birim, custom: true };
        this.saveCustomMaterialTypes(customTypes);
        this.MALZEME_TURLERI[kod] = customTypes[kod];
        return true;
    },

    deleteMaterialType: function(kod) {
        const customTypes = this.getCustomMaterialTypes();
        if (customTypes[kod]) {
            delete customTypes[kod];
            delete this.MALZEME_TURLERI[kod];
            this.saveCustomMaterialTypes(customTypes);
            return true;
        }
        return false;
    },

    getAllMaterialTypes: function() {
        const customTypes = this.getCustomMaterialTypes();
        return { ...this.MALZEME_TURLERI, ...customTypes };
    },

    // Malzeme cinsi silme fonksiyonu
    deleteMaterialGrade: function(kod) {
        const customMaterials = this.getCustomMaterials();
        const index = customMaterials.findIndex(m => m.kod === kod);
        if (index > -1) {
            customMaterials.splice(index, 1);
            localStorage.setItem('customMaterials', JSON.stringify(customMaterials));
            delete this.EN_NORMLARI[kod];
            delete this.YOGUNLUKLAR[kod];
            return true;
        }
        return false;
    },

    getAllMaterialGrades: function() {
        const grades = [];
        for (const kod in this.YOGUNLUKLAR) {
            grades.push({
                kod: kod,
                yogunluk: this.YOGUNLUKLAR[kod],
                norm: this.EN_NORMLARI[kod] || '',
                custom: this.getCustomMaterials().some(m => m.kod === kod)
            });
        }
        return grades;
    },

    // Veri dışa ve içe aktarma fonksiyonları
    exportMaterialData: function() {
        return {
            customTypes: this.getCustomMaterialTypes(),
            customGrades: this.getCustomMaterials(),
            version: '1.0.1',
            exportDate: new Date().toISOString()
        };
    },

    importMaterialData: function(data) {
        if (!data || !data.version) return false;
        
        if (data.customTypes) {
            this.saveCustomMaterialTypes(data.customTypes);
            Object.assign(this.MALZEME_TURLERI, data.customTypes);
        }
        
        if (data.customGrades) {
            localStorage.setItem('customMaterials', JSON.stringify(data.customGrades));
            this.loadCustomMaterials();
        }
        
        return true;
    },

    // Yeni malzeme türü eklemek için şablon
    malzemeTuruSablonu: {
        olcuAlanlari: [],
        hesaplamaFonksiyonu: null
    },

    // Yeni malzeme cinsi eklemek için
    yeniMalzemeCinsiEkle: function(kod, enNormu, yogunluk) {
        this.EN_NORMLARI[kod] = enNormu;
        this.YOGUNLUKLAR[kod] = yogunluk;
        
        // LocalStorage'a kaydet
        const customMaterials = this.getCustomMaterials();
        customMaterials.push({ kod, enNormu, yogunluk });
        localStorage.setItem('customMaterials', JSON.stringify(customMaterials));
        
        return true;
    },

    // Özel malzemeleri yükle
    getCustomMaterials: function() {
        const stored = localStorage.getItem('customMaterials');
        return stored ? JSON.parse(stored) : [];
    },

    // Özel malzemeleri başlangıçta yükle
    loadCustomMaterials: function() {
        const customMaterials = this.getCustomMaterials();
        customMaterials.forEach(material => {
            this.EN_NORMLARI[material.kod] = material.enNormu;
            this.YOGUNLUKLAR[material.kod] = material.yogunluk;
        });
    },

    // Profil boyutu ekle
    yeniProfilBoyutuEkle: function(profilTipi, boyut, agirlik, kesitAlan) {
        if (this.profilVerileri[profilTipi]) {
            this.profilVerileri[profilTipi][boyut] = { agirlik, kesitAlan };
            
            // LocalStorage'a kaydet
            const customProfiles = this.getCustomProfiles();
            customProfiles.push({ profilTipi, boyut, agirlik, kesitAlan });
            localStorage.setItem('customProfiles', JSON.stringify(customProfiles));
            
            return true;
        }
        return false;
    },

    // Özel profilleri yükle
    getCustomProfiles: function() {
        const stored = localStorage.getItem('customProfiles');
        return stored ? JSON.parse(stored) : [];
    },

    // Özel profilleri başlangıçta yükle
    loadCustomProfiles: function() {
        const customProfiles = this.getCustomProfiles();
        customProfiles.forEach(profile => {
            if (this.profilVerileri[profile.profilTipi]) {
                this.profilVerileri[profile.profilTipi][profile.boyut] = {
                    agirlik: profile.agirlik,
                    kesitAlan: profile.kesitAlan
                };
            }
        });
    },

    // Tüm özel verileri temizle
    clearCustomData: function() {
        localStorage.removeItem('customMaterials');
        localStorage.removeItem('customProfiles');
    },

    // Başlangıçta tüm özel verileri yükle
    initialize: function() {
        this.loadCustomMaterials();
        this.loadCustomProfiles();
        
        // Özel malzeme türlerini yükle
        const customTypes = this.getCustomMaterialTypes();
        if (customTypes && Object.keys(customTypes).length > 0) {
            Object.assign(this.MALZEME_TURLERI, customTypes);
        }
    },

    // Malzeme formatı
    formatMalzemeCinsi: function(kod) {
        // Artık formatlama gerekmiyor, direkt döndür
        return kod;
    }
};

// Modülü window objesine bağla - ELECTRON İÇİN KRİTİK
window.MaterialData = MaterialData;

})(window);