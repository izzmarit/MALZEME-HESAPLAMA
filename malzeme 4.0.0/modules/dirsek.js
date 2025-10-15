/**
 * DİRSEK Malzeme Modülü - Profesyonel Versiyon
 * Versiyon: 2.0.0
 * EN 10253-2 ve ASME B16.9/B16.11 standartları ile kapsamlı dirsek hesaplama modülü
 */

(function(window) {
    'use strict';
    
    class DirsekMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'dirsek';
            this.version = '2.0.0';
            
            this.texts = {
                tr: {
                    display_name: 'Dirsek',
                    standart_label: 'Standart',
                    aci_label: 'Dirsek Açısı',
                    cap_label: 'Nominal Çap',
                    yaricap_label: 'Yarıçap Tipi',
                    et_kalinligi_label: 'Et Kalınlığı',
                    tip_label: 'Dirsek Tipi',
                    nps_label: 'NPS (Nominal Pipe Size)',
                    schedule_label: 'Schedule / Et Kalınlığı',
                    uc_tipi_label: 'Uç Bağlantı Tipi',
                    class_label: 'Basınç Sınıfı',
                    validation_error: 'Lütfen tüm alanları doldurun',
                    
                    // Standartlar
                    en10253: 'EN 10253-2 (Avrupa Standardı)',
                    asme_b169: 'ASME B16.9 (Kaynaklı Fittingler)',
                    asme_b1611: 'ASME B16.11 (Dişli/Soketli Fittingler)',
                    
                    // Açılar
                    aci_45: '45° Dirsek',
                    aci_90: '90° Dirsek',
                    aci_180: '180° Dönüş',
                    
                    // Yarıçap Tipleri
                    yaricap_1d: '1.0D - Kısa Yarıçap',
                    yaricap_1_5d: '1.5D - Standart Yarıçap',
                    yaricap_2d: '2.0D - Uzun Yarıçap',
                    yaricap_3d: '3.0D - Ekstra Uzun Yarıçap',
                    yaricap_5d: '5.0D - Özel Uzun Yarıçap',
                    yaricap_sr: 'SR - Short Radius (R=DN)',
                    yaricap_lr: 'LR - Long Radius (R=1.5DN)',
                    
                    // Dirsek Tipleri
                    tip_a: 'Tip A - Kaynaklı (İnce Et)',
                    tip_b: 'Tip B - Dikişsiz (Kalın Et)',
                    
                    // Uç Tipleri
                    uc_bw: 'BW - Butt Weld (Alın Kaynağı)',
                    uc_sw: 'SW - Socket Weld (Soketli Kaynak)',
                    uc_threaded: 'Threaded - Dişli Bağlantı',
                    
                    // Basınç Sınıfları
                    class_2000: 'Class 2000',
                    class_3000: 'Class 3000',
                    class_6000: 'Class 6000',
                    
                    // Malzeme Grupları
                    group_carbon_std: 'Karbon Çelikler - Standart',
                    group_carbon_ht: 'Karbon Çelikler - Yüksek Sıcaklık',
                    group_alloy_crmo: 'Alaşımlı Çelikler - Cr-Mo Serisi',
                    group_alloy_special: 'Alaşımlı Çelikler - Özel',
                    group_stainless: 'Paslanmaz Çelikler',
                    group_low_temp: 'Düşük Sıcaklık Çelikleri',
                    group_pressure_vessel: 'Basınçlı Kap Çelikleri',
                    group_forged: 'Dövme Çelikler'
                },
                en: {
                    display_name: 'Elbow',
                    standart_label: 'Standard',
                    aci_label: 'Elbow Angle',
                    cap_label: 'Nominal Size',
                    yaricap_label: 'Radius Type',
                    et_kalinligi_label: 'Wall Thickness',
                    tip_label: 'Elbow Type',
                    nps_label: 'NPS (Nominal Pipe Size)',
                    schedule_label: 'Schedule / Wall Thickness',
                    uc_tipi_label: 'End Connection Type',
                    class_label: 'Pressure Class',
                    validation_error: 'Please fill all fields',
                    
                    // Standards
                    en10253: 'EN 10253-2 (European Standard)',
                    asme_b169: 'ASME B16.9 (Wrought Steel Fittings)',
                    asme_b1611: 'ASME B16.11 (Threaded/Socket Fittings)',
                    
                    // Angles
                    aci_45: '45° Elbow',
                    aci_90: '90° Elbow',
                    aci_180: '180° Return',
                    
                    // Radius Types
                    yaricap_1d: '1.0D - Short Radius',
                    yaricap_1_5d: '1.5D - Standard Radius',
                    yaricap_2d: '2.0D - Long Radius',
                    yaricap_3d: '3.0D - Extra Long Radius',
                    yaricap_5d: '5.0D - Special Long Radius',
                    yaricap_sr: 'SR - Short Radius (R=DN)',
                    yaricap_lr: 'LR - Long Radius (R=1.5DN)',
                    
                    // Elbow Types
                    tip_a: 'Type A - Welded (Thin Wall)',
                    tip_b: 'Type B - Seamless (Thick Wall)',
                    
                    // End Types
                    uc_bw: 'BW - Butt Weld',
                    uc_sw: 'SW - Socket Weld',
                    uc_threaded: 'Threaded Connection',
                    
                    // Pressure Classes
                    class_2000: 'Class 2000',
                    class_3000: 'Class 3000',
                    class_6000: 'Class 6000',
                    
                    // Material Groups
                    group_carbon_std: 'Carbon Steels - Standard',
                    group_carbon_ht: 'Carbon Steels - High Temperature',
                    group_alloy_crmo: 'Alloy Steels - Cr-Mo Series',
                    group_alloy_special: 'Alloy Steels - Special',
                    group_stainless: 'Stainless Steels',
                    group_low_temp: 'Low Temperature Steels',
                    group_pressure_vessel: 'Pressure Vessel Steels',
                    group_forged: 'Forged Steels'
                }
            };
            
            // EN 10253-2 DN değerleri ve karşılık gelen dış çaplar (mm)
            this.en10253DiameterData = {
                'DN25': { od: 33.7, thicknesses: [2.6, 2.9, 3.2, 3.6, 4.0, 4.5, 5.0] },
                'DN32': { od: 42.4, thicknesses: [2.6, 2.9, 3.2, 3.6, 4.0, 4.5, 5.0, 5.6, 6.3] },
                'DN40': { od: 48.3, thicknesses: [2.6, 2.9, 3.2, 3.6, 4.0, 4.5, 5.0, 5.6, 6.3, 7.1] },
                'DN50': { od: 60.3, thicknesses: [2.9, 3.2, 3.6, 4.0, 4.5, 5.0, 5.6, 6.3, 7.1, 8.0] },
                'DN65': { od: 76.1, thicknesses: [2.9, 3.2, 3.6, 4.0, 4.5, 5.0, 5.6, 6.3, 7.1, 8.0, 8.8] },
                'DN80': { od: 88.9, thicknesses: [3.2, 3.6, 4.0, 4.5, 5.0, 5.6, 6.3, 7.1, 8.0, 8.8, 10.0] },
                'DN100': { od: 114.3, thicknesses: [3.6, 4.0, 4.5, 5.0, 5.6, 6.3, 7.1, 8.0, 8.8, 10.0, 11.0, 12.5, 14.2] },
                'DN125': { od: 139.7, thicknesses: [4.0, 4.5, 5.0, 5.6, 6.3, 7.1, 8.0, 8.8, 10.0, 11.0, 12.5, 14.2, 16.0] },
                'DN150': { od: 168.3, thicknesses: [4.5, 5.0, 5.6, 6.3, 7.1, 8.0, 8.8, 10.0, 11.0, 12.5, 14.2, 16.0, 18.0, 20.0] },
                'DN200': { od: 219.1, thicknesses: [5.0, 5.6, 6.3, 7.1, 8.0, 8.8, 10.0, 11.0, 12.5, 14.2, 16.0, 18.0, 20.0, 22.2, 25.0] },
                'DN250': { od: 273.0, thicknesses: [5.6, 6.3, 7.1, 8.0, 8.8, 10.0, 11.0, 12.5, 14.2, 16.0, 18.0, 20.0, 22.2, 25.0, 28.0] },
                'DN300': { od: 323.9, thicknesses: [6.3, 7.1, 8.0, 8.8, 10.0, 11.0, 12.5, 14.2, 16.0, 18.0, 20.0, 22.2, 25.0, 28.0, 30.0, 32.0] },
                'DN350': { od: 355.6, thicknesses: [6.3, 7.1, 8.0, 8.8, 10.0, 11.0, 12.5, 14.2, 16.0, 18.0, 20.0, 22.2, 25.0, 28.0, 30.0, 32.0, 35.0] },
                'DN400': { od: 406.4, thicknesses: [6.3, 7.1, 8.0, 8.8, 10.0, 11.0, 12.5, 14.2, 16.0, 18.0, 20.0, 22.2, 25.0, 28.0, 30.0, 32.0, 36.0, 40.0] },
                'DN450': { od: 457.0, thicknesses: [7.1, 8.0, 8.8, 10.0, 11.0, 12.5, 14.2, 16.0, 18.0, 20.0, 22.2, 25.0, 28.0, 30.0, 32.0, 36.0, 40.0, 45.0] },
                'DN500': { od: 508.0, thicknesses: [8.0, 8.8, 10.0, 11.0, 12.5, 14.2, 16.0, 18.0, 20.0, 22.2, 25.0, 28.0, 30.0, 32.0, 36.0, 40.0, 45.0, 50.0] },
                'DN600': { od: 610.0, thicknesses: [8.0, 8.8, 10.0, 11.0, 12.5, 14.2, 16.0, 18.0, 20.0, 22.2, 25.0, 28.0, 30.0, 32.0, 36.0, 40.0, 45.0, 50.0, 56.0] },
                'DN700': { od: 711.0, thicknesses: [8.8, 10.0, 11.0, 12.5, 14.2, 16.0, 18.0, 20.0, 22.2, 25.0, 28.0, 30.0, 32.0, 36.0, 40.0, 45.0, 50.0] },
                'DN800': { od: 813.0, thicknesses: [8.8, 10.0, 11.0, 12.5, 14.2, 16.0, 18.0, 20.0, 22.2, 25.0, 28.0, 30.0, 32.0, 36.0, 40.0, 45.0, 50.0] },
                'DN900': { od: 914.0, thicknesses: [10.0, 11.0, 12.5, 14.2, 16.0, 18.0, 20.0, 22.2, 25.0, 28.0, 30.0, 32.0, 36.0, 40.0, 45.0, 50.0] },
                'DN1000': { od: 1016.0, thicknesses: [10.0, 11.0, 12.5, 14.2, 16.0, 18.0, 20.0, 22.2, 25.0, 28.0, 30.0, 32.0, 36.0, 40.0, 45.0, 50.0] },
                'DN1200': { od: 1219.0, thicknesses: [11.0, 12.5, 14.2, 16.0, 18.0, 20.0, 22.2, 25.0, 28.0, 30.0, 32.0, 36.0, 40.0, 45.0, 50.0] }
            };
            
            // ASME B16.9 NPS değerleri ve dış çaplar
            this.asmeB169NPSData = {
                '1/2': { od: 21.3, schedules: ['5', '10', '40', '80', '160', 'XXS'] },
                '3/4': { od: 26.7, schedules: ['5', '10', '40', '80', '160', 'XXS'] },
                '1': { od: 33.4, schedules: ['5', '10', '40', '80', '160', 'XXS'] },
                '1-1/4': { od: 42.2, schedules: ['5', '10', '40', '80', '160', 'XXS'] },
                '1-1/2': { od: 48.3, schedules: ['5', '10', '40', '80', '160', 'XXS'] },
                '2': { od: 60.3, schedules: ['5', '10', '40', '80', '160', 'XXS'] },
                '2-1/2': { od: 73.0, schedules: ['5', '10', '40', '80', '160', 'XXS'] },
                '3': { od: 88.9, schedules: ['5', '10', '40', '80', '160', 'XXS'] },
                '3-1/2': { od: 101.6, schedules: ['5', '10', '40', '80'] },
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
                '22': { od: 559.0, schedules: ['10', '20', 'STD', '40', '60', '80', '100', '120', '140', '160'] },
                '24': { od: 610.0, schedules: ['10', '20', 'STD', '40', '60', '80', '100', '120', '140', '160'] },
                '26': { od: 660.0, schedules: ['10', '20', 'STD'] },
                '28': { od: 711.0, schedules: ['10', '20', 'STD'] },
                '30': { od: 762.0, schedules: ['10', '20', 'STD'] },
                '32': { od: 813.0, schedules: ['10', '20', 'STD'] },
                '34': { od: 864.0, schedules: ['10', '20', 'STD'] },
                '36': { od: 914.0, schedules: ['10', '20', 'STD'] },
                '42': { od: 1067.0, schedules: ['10', '20', 'STD'] },
                '48': { od: 1219.0, schedules: ['10', '20', 'STD'] }
            };
            
            // ASME B16.11 küçük çap değerleri (dişli ve soketli)
            this.asmeB1611NPSData = {
                '1/8': { od: 10.3 },
                '1/4': { od: 13.7 },
                '3/8': { od: 17.1 },
                '1/2': { od: 21.3 },
                '3/4': { od: 26.7 },
                '1': { od: 33.4 },
                '1-1/4': { od: 42.2 },
                '1-1/2': { od: 48.3 },
                '2': { od: 60.3 }
            };
            
            // Schedule bazlı et kalınlıkları (mm) - Detaylı tablo
            this.scheduleThicknesses = {
                '1/2': { '5': 1.65, '10': 2.11, '40': 2.77, '80': 3.73, '160': 4.78, 'XXS': 7.47 },
                '3/4': { '5': 1.65, '10': 2.11, '40': 2.87, '80': 3.91, '160': 5.56, 'XXS': 7.82 },
                '1': { '5': 1.65, '10': 2.77, '40': 3.38, '80': 4.55, '160': 6.35, 'XXS': 9.09 },
                '1-1/4': { '5': 1.65, '10': 2.77, '40': 3.56, '80': 4.85, '160': 6.35, 'XXS': 9.70 },
                '1-1/2': { '5': 1.65, '10': 2.77, '40': 3.68, '80': 5.08, '160': 7.14, 'XXS': 10.15 },
                '2': { '5': 1.65, '10': 2.77, '40': 3.91, '80': 5.54, '160': 8.74, 'XXS': 11.07 },
                '2-1/2': { '5': 2.11, '10': 3.05, '40': 5.16, '80': 7.01, '160': 9.53, 'XXS': 14.02 },
                '3': { '5': 2.11, '10': 3.05, '40': 5.49, '80': 7.62, '160': 11.13, 'XXS': 15.24 },
                '3-1/2': { '5': 2.11, '10': 3.05, '40': 5.74, '80': 8.08 },
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
                '22': { '10': 6.35, '20': 9.53, 'STD': 9.53, '40': 15.09, '60': 19.05, '80': 22.23, '100': 28.58, '120': 34.93, '140': 41.28, '160': 47.63 },
                '24': { '10': 6.35, '20': 9.53, 'STD': 9.53, '40': 17.48, '60': 21.44, '80': 24.61, '100': 30.96, '120': 38.89, '140': 46.02, '160': 52.37 },
                '26': { '10': 7.92, '20': 12.70, 'STD': 12.70 },
                '28': { '10': 7.92, '20': 12.70, 'STD': 12.70 },
                '30': { '10': 7.92, '20': 12.70, 'STD': 12.70 },
                '32': { '10': 7.92, '20': 12.70, 'STD': 12.70 },
                '34': { '10': 7.92, '20': 12.70, 'STD': 12.70 },
                '36': { '10': 7.92, '20': 12.70, 'STD': 12.70 },
                '42': { '10': 7.92, '20': 12.70, 'STD': 12.70 },
                '48': { '10': 7.92, '20': 12.70, 'STD': 12.70 }
            };
            
            // Açı çarpanları (90° temel alınarak)
            this.angleFactors = {
                '45': 0.55,
                '90': 1.0,
                '180': 1.85
            };
            
            // Yarıçap çarpanları
            this.radiusFactors = {
                '1D': 0.93,
                '1.5D': 1.0,
                '2D': 1.12,
                '3D': 1.28,
                '5D': 1.50,
                'SR': 0.93,
                'LR': 1.0
            };
            
            // Uç tipi çarpanları
            this.endTypeFactors = {
                'BW': 1.0,
                'SW': 1.30,
                'Threaded': 1.25
            };
            
            // EN 10253-2 Malzemeler - Genişletilmiş
            this.en10253Materials = {
                // Basınçlı Kap Çelikleri
                'P235GH': { density: 7850, standard: 'EN 10253-2 / EN 10028-2', group: 'pressure_vessel', maxTemp: 400 },
                'P265GH': { density: 7850, standard: 'EN 10253-2 / EN 10028-2', group: 'pressure_vessel', maxTemp: 400 },
                'P295GH': { density: 7850, standard: 'EN 10253-2 / EN 10028-2', group: 'pressure_vessel', maxTemp: 425 },
                'P355GH': { density: 7850, standard: 'EN 10253-2 / EN 10028-2', group: 'pressure_vessel', maxTemp: 425 },
                'P355NH': { density: 7850, standard: 'EN 10253-2 / EN 10028-3', group: 'pressure_vessel', maxTemp: 350 },
                '16Mo3': { density: 7850, standard: 'EN 10253-2 / EN 10028-2', group: 'pressure_vessel', maxTemp: 530 },
                '13CrMo4-5': { density: 7850, standard: 'EN 10253-2 / EN 10028-2', group: 'pressure_vessel', maxTemp: 550 },
                '10CrMo9-10': { density: 7850, standard: 'EN 10253-2 / EN 10028-2', group: 'pressure_vessel', maxTemp: 580 },
                '11CrMo9-10': { density: 7850, standard: 'EN 10253-2 / EN 10028-2', group: 'pressure_vessel', maxTemp: 580 },
                // Paslanmaz Çelikler
                '1.4301 (304)': { density: 7900, standard: 'EN 10253-2 / EN 10088-2', group: 'stainless', maxTemp: 800 },
                '1.4307 (304L)': { density: 7900, standard: 'EN 10253-2 / EN 10088-2', group: 'stainless', maxTemp: 800 },
                '1.4401 (316)': { density: 7980, standard: 'EN 10253-2 / EN 10088-2', group: 'stainless', maxTemp: 800 },
                '1.4404 (316L)': { density: 7980, standard: 'EN 10253-2 / EN 10088-2', group: 'stainless', maxTemp: 800 },
                '1.4571 (316Ti)': { density: 7980, standard: 'EN 10253-2 / EN 10088-2', group: 'stainless', maxTemp: 850 },
                '1.4541 (321)': { density: 7900, standard: 'EN 10253-2 / EN 10088-2', group: 'stainless', maxTemp: 850 }
            };
            
            // ASME Malzemeler - Tam Liste
            this.asmeMaterials = {
                // Karbon Çelikler - Standart
                'A234 WPB': { density: 7850, standard: 'ASME B16.9 / ASTM A234', group: 'carbon_std', maxTemp: 427, minTemp: -29 },
                'A234 WPC': { density: 7850, standard: 'ASME B16.9 / ASTM A234', group: 'carbon_std', maxTemp: 427, minTemp: -29 },
                'A105': { density: 7850, standard: 'ASME B16.9 / ASTM A105', group: 'forged', maxTemp: 427, minTemp: -29 },
                // Karbon Çelikler - Yüksek Sıcaklık
                'A234 WPA': { density: 7850, standard: 'ASME B16.9 / ASTM A234', group: 'carbon_ht', maxTemp: 593, minTemp: -29 },
                // Alaşımlı Çelikler - Cr-Mo Serisi
                'A234 WP1': { density: 7850, standard: 'ASME B16.9 / ASTM A234', group: 'alloy_crmo', maxTemp: 593, composition: '0.5Cr-0.5Mo' },
                'A234 WP5': { density: 7850, standard: 'ASME B16.9 / ASTM A234', group: 'alloy_crmo', maxTemp: 649, composition: '5Cr-0.5Mo' },
                'A234 WP9': { density: 7850, standard: 'ASME B16.9 / ASTM A234', group: 'alloy_crmo', maxTemp: 649, composition: '9Cr-1Mo' },
                'A234 WP11': { density: 7850, standard: 'ASME B16.9 / ASTM A234', group: 'alloy_crmo', maxTemp: 593, composition: '1.25Cr-0.5Mo' },
                'A234 WP12': { density: 7850, standard: 'ASME B16.9 / ASTM A234', group: 'alloy_crmo', maxTemp: 593, composition: '1Cr-0.5Mo' },
                'A234 WP22': { density: 7850, standard: 'ASME B16.9 / ASTM A234', group: 'alloy_crmo', maxTemp: 649, composition: '2.25Cr-1Mo' },
                // Alaşımlı Çelikler - Özel
                'A234 WP91': { density: 7850, standard: 'ASME B16.9 / ASTM A234', group: 'alloy_special', maxTemp: 649, composition: '9Cr-1Mo-V' },
                'A234 WP911': { density: 7850, standard: 'ASME B16.9 / ASTM A234', group: 'alloy_special', maxTemp: 649, composition: '9Cr-1Mo-V-Nb' },
                // Düşük Sıcaklık Çelikleri
                'A420 WPL3': { density: 7850, standard: 'ASME B16.9 / ASTM A420', group: 'low_temp', maxTemp: 343, minTemp: -101 },
                'A420 WPL6': { density: 7850, standard: 'ASME B16.9 / ASTM A420', group: 'low_temp', maxTemp: 343, minTemp: -46 },
                'A420 WPL8': { density: 7850, standard: 'ASME B16.9 / ASTM A420', group: 'low_temp', maxTemp: 343, minTemp: -59 },
                'A420 WPL9': { density: 7850, standard: 'ASME B16.9 / ASTM A420', group: 'low_temp', maxTemp: 343, minTemp: -73 },
                // Paslanmaz Çelikler
                'A403 WP304': { density: 7900, standard: 'ASME B16.9 / ASTM A403', group: 'stainless', maxTemp: 816 },
                'A403 WP304L': { density: 7900, standard: 'ASME B16.9 / ASTM A403', group: 'stainless', maxTemp: 816 },
                'A403 WP304H': { density: 7900, standard: 'ASME B16.9 / ASTM A403', group: 'stainless', maxTemp: 816 },
                'A403 WP316': { density: 7980, standard: 'ASME B16.9 / ASTM A403', group: 'stainless', maxTemp: 816 },
                'A403 WP316L': { density: 7980, standard: 'ASME B16.9 / ASTM A403', group: 'stainless', maxTemp: 816 },
                'A403 WP316H': { density: 7980, standard: 'ASME B16.9 / ASTM A403', group: 'stainless', maxTemp: 816 },
                'A403 WP321': { density: 7900, standard: 'ASME B16.9 / ASTM A403', group: 'stainless', maxTemp: 899 },
                'A403 WP321H': { density: 7900, standard: 'ASME B16.9 / ASTM A403', group: 'stainless', maxTemp: 899 },
                'A403 WP347': { density: 7980, standard: 'ASME B16.9 / ASTM A403', group: 'stainless', maxTemp: 899 },
                'A403 WP347H': { density: 7980, standard: 'ASME B16.9 / ASTM A403', group: 'stainless', maxTemp: 899 },
                'A403 WP310': { density: 8000, standard: 'ASME B16.9 / ASTM A403', group: 'stainless', maxTemp: 1093 },
                // Yüksek Alaşımlı Çelikler
                'A860 WPHY42': { density: 7850, standard: 'ASME B16.9 / ASTM A860', group: 'alloy_special', grade: 'X42' },
                'A860 WPHY46': { density: 7850, standard: 'ASME B16.9 / ASTM A860', group: 'alloy_special', grade: 'X46' },
                'A860 WPHY52': { density: 7850, standard: 'ASME B16.9 / ASTM A860', group: 'alloy_special', grade: 'X52' },
                'A860 WPHY56': { density: 7850, standard: 'ASME B16.9 / ASTM A860', group: 'alloy_special', grade: 'X56' },
                'A860 WPHY60': { density: 7850, standard: 'ASME B16.9 / ASTM A860', group: 'alloy_special', grade: 'X60' },
                'A860 WPHY65': { density: 7850, standard: 'ASME B16.9 / ASTM A860', group: 'alloy_special', grade: 'X65' },
                'A860 WPHY70': { density: 7850, standard: 'ASME B16.9 / ASTM A860', group: 'alloy_special', grade: 'X70' }
            };
            
            this.setupEventHandlers();
        }

        setupEventHandlers() {
            const self = this;
            
            window.DirsekHandlers = {
                onStandartChange: function() {
                    const standart = document.getElementById('dirsek_standart').value;
                    
                    // Tüm alanları gizle
                    document.getElementById('dirsek_enContainer').style.display = 'none';
                    document.getElementById('dirsek_asmeB169Container').style.display = 'none';
                    document.getElementById('dirsek_asmeB1611Container').style.display = 'none';
                    
                    // Malzeme cinsi dropdown'ını güncelle
                    self.updateMaterialGrades(standart);
                    
                    // Seçilen standarda göre alanları göster
                    if (standart === 'en10253') {
                        document.getElementById('dirsek_enContainer').style.display = 'block';
                        self.populateENFields();
                    } else if (standart === 'asme_b169') {
                        document.getElementById('dirsek_asmeB169Container').style.display = 'block';
                        self.populateASMEB169Fields();
                    } else if (standart === 'asme_b1611') {
                        document.getElementById('dirsek_asmeB1611Container').style.display = 'block';
                        self.populateASMEB1611Fields();
                    }
                },
                
                onENCapChange: function() {
                    const cap = document.getElementById('dirsek_en_cap').value;
                    const etKalinlikSelect = document.getElementById('dirsek_en_et_kalinlik');
                    const lang = self.getCurrentLanguage();
                    
                    etKalinlikSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Et kalınlığı seçin...' : 'Select wall thickness...'}</option>`;
                    
                    if (cap && self.en10253DiameterData[cap]) {
                        self.en10253DiameterData[cap].thicknesses.forEach(thickness => {
                            const option = document.createElement('option');
                            option.value = thickness;
                            option.textContent = thickness + ' mm';
                            etKalinlikSelect.appendChild(option);
                        });
                    }
                },
                
                onASMEB169NPSChange: function() {
                    const nps = document.getElementById('dirsek_asme_b169_nps').value;
                    const scheduleSelect = document.getElementById('dirsek_asme_b169_schedule');
                    const lang = self.getCurrentLanguage();
                    
                    scheduleSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Schedule seçin...' : 'Select schedule...'}</option>`;
                    
                    if (nps && self.asmeB169NPSData[nps]) {
                        const availableSchedules = self.asmeB169NPSData[nps].schedules;
                        availableSchedules.forEach(sch => {
                            if (self.scheduleThicknesses[nps] && self.scheduleThicknesses[nps][sch]) {
                                const thickness = self.scheduleThicknesses[nps][sch];
                                const option = document.createElement('option');
                                option.value = sch;
                                option.textContent = `Sch.${sch} (${thickness}mm)`;
                                scheduleSelect.appendChild(option);
                            }
                        });
                    }
                }
            };
        }

        populateENFields() {
            const lang = this.getCurrentLanguage();
            
            // Açı seçenekleri
            const aciSelect = document.getElementById('dirsek_en_aci');
            aciSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Açı seçin' : 'Select angle'}</option>`;
            ['45', '90', '180'].forEach(aci => {
                const option = document.createElement('option');
                option.value = aci;
                option.textContent = this.getText(`aci_${aci}`);
                aciSelect.appendChild(option);
            });
            
            // Çap seçenekleri - DÜZELTİLMİŞ: mm değerleri ile
            const capSelect = document.getElementById('dirsek_en_cap');
            capSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Çap seçin' : 'Select diameter'}</option>`;
            Object.keys(this.en10253DiameterData).forEach(dn => {
                const od = this.en10253DiameterData[dn].od;
                const option = document.createElement('option');
                option.value = dn;
                option.textContent = `${dn} (Ø${od}mm)`;
                capSelect.appendChild(option);
            });
            
            // Yarıçap seçenekleri
            const yaricapSelect = document.getElementById('dirsek_en_yaricap');
            yaricapSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Yarıçap seçin' : 'Select radius'}</option>`;
            ['1D', '1.5D', '2D', '3D', '5D'].forEach(yaricap => {
                const option = document.createElement('option');
                option.value = yaricap;
                option.textContent = this.getText(`yaricap_${yaricap.toLowerCase().replace('.', '_')}`);
                yaricapSelect.appendChild(option);
            });
            
            // Tip seçenekleri
            const tipSelect = document.getElementById('dirsek_en_tip');
            tipSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Tip seçin' : 'Select type'}</option>`;
            [{ value: 'A', text: this.getText('tip_a') }, { value: 'B', text: this.getText('tip_b') }].forEach(tip => {
                const option = document.createElement('option');
                option.value = tip.value;
                option.textContent = tip.text;
                tipSelect.appendChild(option);
            });
        }

        populateASMEB169Fields() {
            const lang = this.getCurrentLanguage();
            
            // Açı seçenekleri
            const aciSelect = document.getElementById('dirsek_asme_b169_aci');
            aciSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Açı seçin' : 'Select angle'}</option>`;
            ['45', '90', '180'].forEach(aci => {
                const option = document.createElement('option');
                option.value = aci;
                option.textContent = this.getText(`aci_${aci}`);
                aciSelect.appendChild(option);
            });
            
            // NPS seçenekleri - DÜZELTİLMİŞ: mm değerleri ile
            const npsSelect = document.getElementById('dirsek_asme_b169_nps');
            npsSelect.innerHTML = `<option value="">${lang === 'tr' ? 'NPS seçin' : 'Select NPS'}</option>`;
            Object.keys(this.asmeB169NPSData).forEach(nps => {
                const od = this.asmeB169NPSData[nps].od;
                const option = document.createElement('option');
                option.value = nps;
                option.textContent = `NPS ${nps}" (Ø${od}mm)`;
                npsSelect.appendChild(option);
            });
            
            // Yarıçap seçenekleri
            const yaricapSelect = document.getElementById('dirsek_asme_b169_yaricap');
            yaricapSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Yarıçap seçin' : 'Select radius'}</option>`;
            [
                { value: 'SR', text: this.getText('yaricap_sr') },
                { value: 'LR', text: this.getText('yaricap_lr') }
            ].forEach(yaricap => {
                const option = document.createElement('option');
                option.value = yaricap.value;
                option.textContent = yaricap.text;
                yaricapSelect.appendChild(option);
            });
            
            // Uç tipi
            const ucTipiSelect = document.getElementById('dirsek_asme_b169_uc_tipi');
            ucTipiSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Uç tipi seçin' : 'Select end type'}</option>`;
            const option = document.createElement('option');
            option.value = 'BW';
            option.textContent = this.getText('uc_bw');
            ucTipiSelect.appendChild(option);
        }

        populateASMEB1611Fields() {
            const lang = this.getCurrentLanguage();
            
            // Açı seçenekleri
            const aciSelect = document.getElementById('dirsek_asme_b1611_aci');
            aciSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Açı seçin' : 'Select angle'}</option>`;
            ['45', '90'].forEach(aci => {
                const option = document.createElement('option');
                option.value = aci;
                option.textContent = this.getText(`aci_${aci}`);
                aciSelect.appendChild(option);
            });
            
            // NPS seçenekleri - DÜZELTİLMİŞ: mm değerleri ile
            const npsSelect = document.getElementById('dirsek_asme_b1611_nps');
            npsSelect.innerHTML = `<option value="">${lang === 'tr' ? 'NPS seçin' : 'Select NPS'}</option>`;
            Object.keys(this.asmeB1611NPSData).forEach(nps => {
                const od = this.asmeB1611NPSData[nps].od;
                const option = document.createElement('option');
                option.value = nps;
                option.textContent = `NPS ${nps}" (Ø${od}mm)`;
                npsSelect.appendChild(option);
            });
            
            // Class seçenekleri
            const classSelect = document.getElementById('dirsek_asme_b1611_class');
            classSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Class seçin' : 'Select class'}</option>`;
            ['2000', '3000', '6000'].forEach(cls => {
                const option = document.createElement('option');
                option.value = cls;
                option.textContent = this.getText(`class_${cls}`);
                classSelect.appendChild(option);
            });
            
            // Uç tipi
            const ucTipiSelect = document.getElementById('dirsek_asme_b1611_uc_tipi');
            ucTipiSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Uç tipi seçin' : 'Select end type'}</option>`;
            [
                { value: 'SW', text: this.getText('uc_sw') },
                { value: 'Threaded', text: this.getText('uc_threaded') }
            ].forEach(uc => {
                const option = document.createElement('option');
                option.value = uc.value;
                option.textContent = uc.text;
                ucTipiSelect.appendChild(option);
            });
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="dirsek_standart">${this.getText('standart_label')}</label>
                        <select id="dirsek_standart" onchange="window.DirsekHandlers.onStandartChange()">
                            <option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
                            <option value="en10253">${this.getText('en10253')}</option>
                            <option value="asme_b169">${this.getText('asme_b169')}</option>
                            <option value="asme_b1611">${this.getText('asme_b1611')}</option>
                        </select>
                    </div>
                </div>
                
                <!-- EN 10253-2 Alanları -->
                <div id="dirsek_enContainer" style="display:none;">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="dirsek_en_aci">${this.getText('aci_label')}</label>
                            <select id="dirsek_en_aci">
                                <option value="">${lang === 'tr' ? 'Açı seçin' : 'Select angle'}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="dirsek_en_cap">${this.getText('cap_label')}</label>
                            <select id="dirsek_en_cap" onchange="window.DirsekHandlers.onENCapChange()">
                                <option value="">${lang === 'tr' ? 'Çap seçin' : 'Select diameter'}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="dirsek_en_yaricap">${this.getText('yaricap_label')}</label>
                            <select id="dirsek_en_yaricap">
                                <option value="">${lang === 'tr' ? 'Yarıçap seçin' : 'Select radius'}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="dirsek_en_tip">${this.getText('tip_label')}</label>
                            <select id="dirsek_en_tip">
                                <option value="">${lang === 'tr' ? 'Tip seçin' : 'Select type'}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="dirsek_en_et_kalinlik">${this.getText('et_kalinligi_label')}</label>
                            <select id="dirsek_en_et_kalinlik">
                                <option value="">${lang === 'tr' ? 'Önce çap seçin' : 'Select diameter first'}</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <!-- ASME B16.9 Alanları -->
                <div id="dirsek_asmeB169Container" style="display:none;">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="dirsek_asme_b169_aci">${this.getText('aci_label')}</label>
                            <select id="dirsek_asme_b169_aci">
                                <option value="">${lang === 'tr' ? 'Açı seçin' : 'Select angle'}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="dirsek_asme_b169_nps">${this.getText('nps_label')}</label>
                            <select id="dirsek_asme_b169_nps" onchange="window.DirsekHandlers.onASMEB169NPSChange()">
                                <option value="">${lang === 'tr' ? 'NPS seçin' : 'Select NPS'}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="dirsek_asme_b169_yaricap">${this.getText('yaricap_label')}</label>
                            <select id="dirsek_asme_b169_yaricap">
                                <option value="">${lang === 'tr' ? 'Yarıçap seçin' : 'Select radius'}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="dirsek_asme_b169_schedule">${this.getText('schedule_label')}</label>
                            <select id="dirsek_asme_b169_schedule">
                                <option value="">${lang === 'tr' ? 'Önce NPS seçin' : 'Select NPS first'}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="dirsek_asme_b169_uc_tipi">${this.getText('uc_tipi_label')}</label>
                            <select id="dirsek_asme_b169_uc_tipi">
                                <option value="">${lang === 'tr' ? 'Uç tipi seçin' : 'Select end type'}</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <!-- ASME B16.11 Alanları -->
                <div id="dirsek_asmeB1611Container" style="display:none;">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="dirsek_asme_b1611_aci">${this.getText('aci_label')}</label>
                            <select id="dirsek_asme_b1611_aci">
                                <option value="">${lang === 'tr' ? 'Açı seçin' : 'Select angle'}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="dirsek_asme_b1611_nps">${this.getText('nps_label')}</label>
                            <select id="dirsek_asme_b1611_nps">
                                <option value="">${lang === 'tr' ? 'NPS seçin' : 'Select NPS'}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="dirsek_asme_b1611_class">${this.getText('class_label')}</label>
                            <select id="dirsek_asme_b1611_class">
                                <option value="">${lang === 'tr' ? 'Class seçin' : 'Select class'}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="dirsek_asme_b1611_uc_tipi">${this.getText('uc_tipi_label')}</label>
                            <select id="dirsek_asme_b1611_uc_tipi">
                                <option value="">${lang === 'tr' ? 'Uç tipi seçin' : 'Select end type'}</option>
                            </select>
                        </div>
                    </div>
                </div>
            `;
        }

        getGrades() {
            const standart = document.getElementById('dirsek_standart')?.value;
            
            if (standart === 'en10253') {
                return this.getGroupedGrades(this.en10253Materials);
            } else if (standart === 'asme_b169' || standart === 'asme_b1611') {
                return this.getGroupedGrades(this.asmeMaterials);
            }
            
            return [];
        }

        getGroupedGrades(materials) {
            const lang = this.getCurrentLanguage();
            const organizedGrades = [];
            
            const groups = {
                'carbon_std': this.getText('group_carbon_std'),
                'carbon_ht': this.getText('group_carbon_ht'),
                'alloy_crmo': this.getText('group_alloy_crmo'),
                'alloy_special': this.getText('group_alloy_special'),
                'stainless': this.getText('group_stainless'),
                'low_temp': this.getText('group_low_temp'),
                'pressure_vessel': this.getText('group_pressure_vessel'),
                'forged': this.getText('group_forged')
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

        updateMaterialGrades(standart) {
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
            } else {
                const lang = this.getCurrentLanguage();
                const option = document.createElement('option');
                option.value = '';
                option.textContent = lang === 'tr' ? 'Önce standart seçin' : 'Select standard first';
                malzemeCinsiSelect.appendChild(option);
            }
        }

        getDensity(grade, standart) {
            if (standart === 'en10253' && this.en10253Materials[grade]) {
                return this.en10253Materials[grade].density;
            } else if ((standart === 'asme_b169' || standart === 'asme_b1611') && this.asmeMaterials[grade]) {
                return this.asmeMaterials[grade].density;
            }
            return 7850;
        }

        getStandard(grade, standart) {
            if (standart === 'en10253' && this.en10253Materials[grade]) {
                return this.en10253Materials[grade].standard;
            } else if ((standart === 'asme_b169' || standart === 'asme_b1611') && this.asmeMaterials[grade]) {
                return this.asmeMaterials[grade].standard;
            }
            return '-';
        }

        calculate(formData) {
            const standart = formData.dirsek_standart;
            const malzemeCinsi = formData.malzemeCinsi;
            const adet = parseFloat(formData.adet) || 1;
            
            if (!standart || !malzemeCinsi) {
                return null;
            }
            
            let aci, od, etKalinlik, yaricap, density;
            let baseWeight = 0;
            
            if (standart === 'en10253') {
                aci = formData.dirsek_en_aci;
                const cap = formData.dirsek_en_cap;
                yaricap = formData.dirsek_en_yaricap;
                etKalinlik = parseFloat(formData.dirsek_en_et_kalinlik) || 0;
                
                if (!aci || !cap || !yaricap || !etKalinlik) {
                    return null;
                }
                
                od = this.en10253DiameterData[cap].od;
                density = this.getDensity(malzemeCinsi, standart);
                
                // EN 10253-2 temel hesaplama formülü
                // Ağırlık = π × (OD - t) × t × R × Faktör × Yoğunluk / 1000000
                const radiusValue = od * parseFloat(yaricap.replace('D', ''));
                const centerlineLength = (Math.PI * radiusValue * parseFloat(aci)) / 180;
                const crossSectionArea = Math.PI * (od - etKalinlik) * etKalinlik;
                const volume = crossSectionArea * centerlineLength; // mm³
                
                baseWeight = (volume / 1000000000) * density; // kg
                
            } else if (standart === 'asme_b169') {
                aci = formData.dirsek_asme_b169_aci;
                const nps = formData.dirsek_asme_b169_nps;
                const schedule = formData.dirsek_asme_b169_schedule;
                yaricap = formData.dirsek_asme_b169_yaricap;
                const ucTipi = formData.dirsek_asme_b169_uc_tipi;
                
                if (!aci || !nps || !schedule || !yaricap || !ucTipi) {
                    return null;
                }
                
                od = this.asmeB169NPSData[nps].od;
                etKalinlik = this.scheduleThicknesses[nps][schedule];
                density = this.getDensity(malzemeCinsi, standart);
                
                // ASME B16.9 hesaplama
                const radiusMultiplier = yaricap === 'LR' ? 1.5 : 1.0;
                const radiusValue = od * radiusMultiplier;
                const centerlineLength = (Math.PI * radiusValue * parseFloat(aci)) / 180;
                const crossSectionArea = Math.PI * (od - etKalinlik) * etKalinlik;
                const volume = crossSectionArea * centerlineLength; // mm³
                
                baseWeight = (volume / 1000000000) * density; // kg
                
                // Uç tipi çarpanı
                const ucTipiMultiplier = this.endTypeFactors[ucTipi] || 1.0;
                baseWeight *= ucTipiMultiplier;
                
            } else if (standart === 'asme_b1611') {
                aci = formData.dirsek_asme_b1611_aci;
                const nps = formData.dirsek_asme_b1611_nps;
                const classRating = formData.dirsek_asme_b1611_class;
                const ucTipi = formData.dirsek_asme_b1611_uc_tipi;
                
                if (!aci || !nps || !classRating || !ucTipi) {
                    return null;
                }
                
                od = this.asmeB1611NPSData[nps].od;
                density = this.getDensity(malzemeCinsi, standart);
                
                // ASME B16.11 için tahmini hesaplama
                // Class'a göre et kalınlığı tahmini
                let estimatedThickness = 0;
                if (classRating === '2000') estimatedThickness = od * 0.15;
                else if (classRating === '3000') estimatedThickness = od * 0.20;
                else if (classRating === '6000') estimatedThickness = od * 0.28;
                
                etKalinlik = estimatedThickness;
                
                const radiusValue = od * 1.5; // Genellikle LR
                const centerlineLength = (Math.PI * radiusValue * parseFloat(aci)) / 180;
                const crossSectionArea = Math.PI * (od - etKalinlik) * etKalinlik;
                const volume = crossSectionArea * centerlineLength;
                
                baseWeight = (volume / 1000000000) * density; // kg
                
                // Uç tipi çarpanı
                const ucTipiMultiplier = this.endTypeFactors[ucTipi] || 1.0;
                baseWeight *= ucTipiMultiplier;
            }
            
            // Açı çarpanını uygula (90° baz alınarak)
            const aciMultiplier = this.angleFactors[aci] || 1.0;
            const birimAgirlik = baseWeight * aciMultiplier;
            const toplamAgirlik = birimAgirlik * adet;
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                suHacmi: null
            };
        }

        validate(formData) {
            const standart = formData.dirsek_standart;
            
            if (!standart) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            if (standart === 'en10253') {
                const aci = formData.dirsek_en_aci;
                const cap = formData.dirsek_en_cap;
                const yaricap = formData.dirsek_en_yaricap;
                const tip = formData.dirsek_en_tip;
                const etKalinlik = formData.dirsek_en_et_kalinlik;
                
                if (!aci || !cap || !yaricap || !tip || !etKalinlik) {
                    return {
                        isValid: false,
                        message: this.getText('validation_error')
                    };
                }
                
            } else if (standart === 'asme_b169') {
                const aci = formData.dirsek_asme_b169_aci;
                const nps = formData.dirsek_asme_b169_nps;
                const yaricap = formData.dirsek_asme_b169_yaricap;
                const schedule = formData.dirsek_asme_b169_schedule;
                const ucTipi = formData.dirsek_asme_b169_uc_tipi;
                
                if (!aci || !nps || !yaricap || !schedule || !ucTipi) {
                    return {
                        isValid: false,
                        message: this.getText('validation_error')
                    };
                }
                
            } else if (standart === 'asme_b1611') {
                const aci = formData.dirsek_asme_b1611_aci;
                const nps = formData.dirsek_asme_b1611_nps;
                const classRating = formData.dirsek_asme_b1611_class;
                const ucTipi = formData.dirsek_asme_b1611_uc_tipi;
                
                if (!aci || !nps || !classRating || !ucTipi) {
                    return {
                        isValid: false,
                        message: this.getText('validation_error')
                    };
                }
            }
            
            return { isValid: true };
        }
        
        formatDimensions(formData) {
            const standart = formData.dirsek_standart;
            
            if (standart === 'en10253') {
                const aci = formData.dirsek_en_aci;
                const cap = formData.dirsek_en_cap;
                const yaricap = formData.dirsek_en_yaricap;
                const tip = formData.dirsek_en_tip;
                const etKalinlik = formData.dirsek_en_et_kalinlik;
                
                const od = this.en10253DiameterData[cap]?.od || '';
                return `${cap}(Ø${od}mm) × ${etKalinlik}mm, ${yaricap}, ${aci}°, Tip-${tip}`;
                
            } else if (standart === 'asme_b169') {
                const aci = formData.dirsek_asme_b169_aci;
                const nps = formData.dirsek_asme_b169_nps;
                const yaricap = formData.dirsek_asme_b169_yaricap;
                const schedule = formData.dirsek_asme_b169_schedule;
                const ucTipi = formData.dirsek_asme_b169_uc_tipi;
                
                const od = this.asmeB169NPSData[nps]?.od || '';
                return `NPS ${nps}"(Ø${od}mm), ${yaricap}, Sch.${schedule}, ${aci}°, ${ucTipi}`;
                
            } else if (standart === 'asme_b1611') {
                const aci = formData.dirsek_asme_b1611_aci;
                const nps = formData.dirsek_asme_b1611_nps;
                const classRating = formData.dirsek_asme_b1611_class;
                const ucTipi = formData.dirsek_asme_b1611_uc_tipi;
                
                const od = this.asmeB1611NPSData[nps]?.od || '';
                return `NPS ${nps}"(Ø${od}mm), Class ${classRating}, ${aci}°, ${ucTipi}`;
            }
            
            return '-';
        }

        hasWaterVolume() {
            return false;
        }

        getDisplayName() {
            return this.getText('display_name');
        }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            const standart = formData.dirsek_standart;
            
            baseRow.malzemeTuru = this.getDisplayName();
            baseRow.enNormu = this.getStandard(formData.malzemeCinsi, standart);
            
            baseRow.metadata = {
                ...baseRow.metadata,
                dirsek: {
                    standart: formData.dirsek_standart,
                    // EN 10253-2
                    en_aci: formData.dirsek_en_aci,
                    en_cap: formData.dirsek_en_cap,
                    en_yaricap: formData.dirsek_en_yaricap,
                    en_tip: formData.dirsek_en_tip,
                    en_et_kalinlik: formData.dirsek_en_et_kalinlik,
                    // ASME B16.9
                    asme_b169_aci: formData.dirsek_asme_b169_aci,
                    asme_b169_nps: formData.dirsek_asme_b169_nps,
                    asme_b169_yaricap: formData.dirsek_asme_b169_yaricap,
                    asme_b169_schedule: formData.dirsek_asme_b169_schedule,
                    asme_b169_uc_tipi: formData.dirsek_asme_b169_uc_tipi,
                    // ASME B16.11
                    asme_b1611_aci: formData.dirsek_asme_b1611_aci,
                    asme_b1611_nps: formData.dirsek_asme_b1611_nps,
                    asme_b1611_class: formData.dirsek_asme_b1611_class,
                    asme_b1611_uc_tipi: formData.dirsek_asme_b1611_uc_tipi
                }
            };
            
            return baseRow;
        }

        fillFormFromRow(rowData) {
            super.fillFormFromRow(rowData);
            
            const metadata = rowData.metadata?.dirsek;
            if (!metadata) {
                if (rowData.formData) {
                    this.fillFromFormData(rowData.formData);
                }
                return true;
            }
            
            setTimeout(() => {
                const standartElement = document.getElementById('dirsek_standart');
                if (standartElement && metadata.standart) {
                    standartElement.value = metadata.standart;
                    window.DirsekHandlers.onStandartChange();
                }
                
                setTimeout(() => {
                    if (metadata.standart === 'en10253') {
                        if (metadata.en_aci) document.getElementById('dirsek_en_aci').value = metadata.en_aci;
                        if (metadata.en_cap) {
                            document.getElementById('dirsek_en_cap').value = metadata.en_cap;
                            window.DirsekHandlers.onENCapChange();
                        }
                        if (metadata.en_yaricap) document.getElementById('dirsek_en_yaricap').value = metadata.en_yaricap;
                        if (metadata.en_tip) document.getElementById('dirsek_en_tip').value = metadata.en_tip;
                        
                        setTimeout(() => {
                            if (metadata.en_et_kalinlik) document.getElementById('dirsek_en_et_kalinlik').value = metadata.en_et_kalinlik;
                        }, 100);
                        
                    } else if (metadata.standart === 'asme_b169') {
                        if (metadata.asme_b169_aci) document.getElementById('dirsek_asme_b169_aci').value = metadata.asme_b169_aci;
                        if (metadata.asme_b169_nps) {
                            document.getElementById('dirsek_asme_b169_nps').value = metadata.asme_b169_nps;
                            window.DirsekHandlers.onASMEB169NPSChange();
                        }
                        if (metadata.asme_b169_yaricap) document.getElementById('dirsek_asme_b169_yaricap').value = metadata.asme_b169_yaricap;
                        
                        setTimeout(() => {
                            if (metadata.asme_b169_schedule) document.getElementById('dirsek_asme_b169_schedule').value = metadata.asme_b169_schedule;
                            if (metadata.asme_b169_uc_tipi) document.getElementById('dirsek_asme_b169_uc_tipi').value = metadata.asme_b169_uc_tipi;
                        }, 100);
                        
                    } else if (metadata.standart === 'asme_b1611') {
                        if (metadata.asme_b1611_aci) document.getElementById('dirsek_asme_b1611_aci').value = metadata.asme_b1611_aci;
                        if (metadata.asme_b1611_nps) document.getElementById('dirsek_asme_b1611_nps').value = metadata.asme_b1611_nps;
                        if (metadata.asme_b1611_class) document.getElementById('dirsek_asme_b1611_class').value = metadata.asme_b1611_class;
                        if (metadata.asme_b1611_uc_tipi) document.getElementById('dirsek_asme_b1611_uc_tipi').value = metadata.asme_b1611_uc_tipi;
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
                        
                        if (key === 'dirsek_standart') {
                            window.DirsekHandlers.onStandartChange();
                        } else if (key === 'dirsek_en_cap') {
                            window.DirsekHandlers.onENCapChange();
                        } else if (key === 'dirsek_asme_b169_nps') {
                            window.DirsekHandlers.onASMEB169NPSChange();
                        }
                    }
                });
            }, 100);
        }
    }

    const dirsekMaterial = new DirsekMaterial();
    dirsekMaterial.register();
    
    console.log('Dirsek modülü v2.0.0 yüklendi (EN 10253-2, ASME B16.9, ASME B16.11)');

})(window);