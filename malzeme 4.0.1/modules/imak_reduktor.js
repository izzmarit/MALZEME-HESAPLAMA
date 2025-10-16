/**
 * İMAK REDÜKTÖR - Motor Redüktör Modülü
 * Versiyon: 4.0.0
 * Üreticinin gerçek ürün yapısı ve kodlama sistemi ile tam uyumlu
 * 
 * ÖNEMLİ ÖZELLİKLER:
 * - Çıkış devri bazlı seçim sistemi (giriş devri ve redüksiyon oranı otomatik)
 * - Montaj tipi kodlaması üretici standardına uygun (IRKM, IRKPM, IRKP, IRK vb.)
 * - IEC motor tipi kodlaması (63 M 4a formatı)
 * - Tablo çıktısı optimize edilmiş format
 */

(function(window) {
    'use strict';
    
    class ImakReduktorMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'imakReduktor';
            this.version = '4.0.0';
            
            this.texts = {
                tr: {
                    display_name: 'İMAK Redüktör',
                    
                    // Form Etiketleri
                    seri_label: 'Ürün Serisi',
                    montaj_tipi_label: 'Montaj Tipi',
                    boyut_label: 'Redüktör Boyutu',
                    motor_gucu_label: 'Motor Gücü (kW)',
                    motor_tipi_label: 'Motor Tipi / Boyutu',
                    cikis_devri_label: 'Çıkış Devri (rpm)',
                    
                    // Hesaplanan Alanlar
                    giris_devri_label: 'Giriş Devri (rpm)',
                    reduksiyon_orani_label: 'Redüksiyon Oranı (i)',
                    cikis_momenti_label: 'Çıkış Momenti (Nm)',
                    cikis_mili_label: 'Çıkış Mili Çapı (mm)',
                    verimlilik_label: 'Verimlilik (%)',
                    
                    // Ürün Serileri
                    ir_series: 'IR Series - Helisel Dişli',
                    irk_series: 'IRK Series - Konik-Helisel Dişli',
                    s_series: 'S Series - Alüminyum Sonsuz Vidalı',
                    irsd_series: 'IRSD Series - Helisel-Sonsuz Vidalı',
                    irc_series: 'IRC Series - Vinç Kaldırma Grubu',
                    iro_series: 'IRO Series - Şaft Montajlı',
                    irnx_series: 'IRNX Series - Şaft Montajlı (Ağır Tip)',
                    
                    // Montaj Tipleri
                    mount_irkm: 'IRKM - Ayaklı + Motorlu',
                    mount_irkfm: 'IRKFM - Flanş + Motorlu',
                    mount_irkafm: 'IRKAFM - Ayaklı + Flanş + Motorlu',
                    mount_irkpm: 'IRKPM - IEC PAM + Ayaklı + Motorlu',
                    mount_irkfpm: 'IRKFPM - IEC PAM + Flanş + Motorlu',
                    mount_irkafpm: 'IRKAFPM - IEC PAM + Ayaklı + Flanş + Motorlu',
                    mount_irk: 'IRK - Ayaklı (Motorsuz)',
                    mount_irkf: 'IRKF - Flanş (Motorsuz)',
                    mount_irkaf: 'IRKAF - Ayaklı + Flanş (Motorsuz)',
                    mount_irkp: 'IRKP - IEC PAM + Ayaklı (Motorsuz)',
                    mount_irkfp: 'IRKFP - IEC PAM + Flanş (Motorsuz)',
                    mount_irkafp: 'IRKAFP - IEC PAM + Ayaklı + Flanş (Motorsuz)',
                    
                    mount_iram: 'IRAM - Ayaklı + Motorlu',
                    mount_irfm: 'IRFM - Flanş + Motorlu',
                    mount_irafm: 'IRAFM - Ayaklı + Flanş + Motorlu',
                    mount_irapm: 'IRAPM - IEC PAM + Ayaklı + Motorlu',
                    mount_irfpm: 'IRFPM - IEC PAM + Flanş + Motorlu',
                    mount_irafpm: 'IRAFPM - IEC PAM + Ayaklı + Flanş + Motorlu',
                    mount_ira: 'IRA - Ayaklı (Motorsuz)',
                    mount_irf: 'IRF - Flanş (Motorsuz)',
                    mount_iraf: 'IRAF - Ayaklı + Flanş (Motorsuz)',
                    mount_irap: 'IRAP - IEC PAM + Ayaklı (Motorsuz)',
                    mount_irfp: 'IRFP - IEC PAM + Flanş (Motorsuz)',
                    mount_irafp: 'IRAFP - IEC PAM + Ayaklı + Flanş (Motorsuz)',
                    
                    mount_sm: 'SM - Worm Motorlu',
                    mount_s: 'S - Giriş Milli (Motorsuz)',
                    mount_sf: 'SF - Flanş (Motorsuz)',
                    mount_sa: 'SA - Ayaklı (Motorsuz)',
                    mount_saf: 'SAF - Ayaklı + Flanş (Motorsuz)',
                    
                    mount_irsdm: 'IRSDM - Motorlu',
                    mount_irsdfm: 'IRSDFM - Flanş + Motorlu',
                    mount_irsdafm: 'IRSDAFM - Ayaklı + Flanş + Motorlu',
                    mount_irsdpm: 'IRSDPM - IEC PAM + Motorlu',
                    mount_irsdfpm: 'IRSDFPM - IEC PAM + Flanş + Motorlu',
                    mount_irsd: 'IRSD - Giriş Milli (Motorsuz)',
                    mount_irsdf: 'IRSDF - Flanş (Motorsuz)',
                    mount_irsdaf: 'IRSDAF - Ayaklı + Flanş (Motorsuz)',
                    mount_irsdp: 'IRSDP - IEC PAM (Motorsuz)',
                    mount_irsdfp: 'IRSDFP - IEC PAM + Flanş (Motorsuz)',
                    
                    mount_ircm: 'IRCM - Vinç Tipi + Motorlu',
                    mount_ircpm: 'IRCPM - IEC PAM + Motorlu',
                    mount_irc: 'IRC - Vinç Tipi (Motorsuz)',
                    mount_ircp: 'IRCP - IEC PAM (Motorsuz)',
                    
                    mount_iro: 'IRO - Şaft Montajlı',
                    mount_irnx: 'IRNX - Şaft Montajlı',
                    
                    // Validasyon
                    validation_error: 'Lütfen tüm gerekli alanları doldurun',
                    validation_series: 'Lütfen ürün serisi seçin',
                    validation_mounting: 'Lütfen montaj tipi seçin',
                    validation_size: 'Lütfen redüktör boyutu seçin',
                    validation_power: 'Lütfen motor gücü seçin',
                    validation_motor_type: 'Lütfen motor tipi seçin',
                    validation_output_speed: 'Lütfen çıkış devri seçin'
                },
                en: {
                    display_name: 'İMAK Gearbox',
                    
                    // Form Labels
                    seri_label: 'Product Series',
                    montaj_tipi_label: 'Mounting Type',
                    boyut_label: 'Gearbox Size',
                    motor_gucu_label: 'Motor Power (kW)',
                    motor_tipi_label: 'Motor Type / Size',
                    cikis_devri_label: 'Output Speed (rpm)',
                    
                    // Calculated Fields
                    giris_devri_label: 'Input Speed (rpm)',
                    reduksiyon_orani_label: 'Reduction Ratio (i)',
                    cikis_momenti_label: 'Output Torque (Nm)',
                    cikis_mili_label: 'Output Shaft Diameter (mm)',
                    verimlilik_label: 'Efficiency (%)',
                    
                    // Product Series
                    ir_series: 'IR Series - Helical Geared',
                    irk_series: 'IRK Series - Helical Bevel Geared',
                    s_series: 'S Series - Aluminum Worm',
                    irsd_series: 'IRSD Series - Helical Worm',
                    irc_series: 'IRC Series - Hoist Drive',
                    iro_series: 'IRO Series - Shaft Mounted',
                    irnx_series: 'IRNX Series - Heavy Duty Shaft Mounted',
                    
                    // Mounting Types
                    mount_irkm: 'IRKM - Foot Mounted + Motor',
                    mount_irkfm: 'IRKFM - Flange + Motor',
                    mount_irkafm: 'IRKAFM - Foot + Flange + Motor',
                    mount_irkpm: 'IRKPM - IEC PAM + Foot + Motor',
                    mount_irkfpm: 'IRKFPM - IEC PAM + Flange + Motor',
                    mount_irkafpm: 'IRKAFPM - IEC PAM + Foot + Flange + Motor',
                    mount_irk: 'IRK - Foot Mounted (Without Motor)',
                    mount_irkf: 'IRKF - Flange (Without Motor)',
                    mount_irkaf: 'IRKAF - Foot + Flange (Without Motor)',
                    mount_irkp: 'IRKP - IEC PAM + Foot (Without Motor)',
                    mount_irkfp: 'IRKFP - IEC PAM + Flange (Without Motor)',
                    mount_irkafp: 'IRKAFP - IEC PAM + Foot + Flange (Without Motor)',
                    
                    // Validation
                    validation_error: 'Please fill all required fields',
                    validation_series: 'Please select product series',
                    validation_mounting: 'Please select mounting type',
                    validation_size: 'Please select gearbox size',
                    validation_power: 'Please select motor power',
                    validation_motor_type: 'Please select motor type',
                    validation_output_speed: 'Please select output speed'
                }
            };
            
            // Ürün Serileri ve Detaylı Özellikleri
            this.productSeries = {
                'IR': {
                    name: 'IR',
                    description: 'Helisel',
                    sizes: ['IR43', 'IR53', 'IR63', 'IR73', 'IR83', 'IR93', 'IR103', 'IR113', 'IR123', 'IR133', 'IR143', 'IR153'],
                    sizeData: {
                        'IR43': { torque: 280, shaft: 25, weight: 22 },
                        'IR53': { torque: 580, shaft: 30, weight: 35 },
                        'IR63': { torque: 1150, shaft: 35, weight: 55 },
                        'IR73': { torque: 2100, shaft: 40, weight: 85 },
                        'IR83': { torque: 3600, shaft: 50, weight: 135 },
                        'IR93': { torque: 5800, shaft: 60, weight: 210 },
                        'IR103': { torque: 9000, shaft: 70, weight: 320 },
                        'IR113': { torque: 13500, shaft: 80, weight: 480 },
                        'IR123': { torque: 18000, shaft: 90, weight: 680 },
                        'IR133': { torque: 18000, shaft: 100, weight: 920 },
                        'IR143': { torque: 18000, shaft: 110, weight: 1250 },
                        'IR153': { torque: 18000, shaft: 120, weight: 1680 }
                    },
                    ratios: [3.15, 4, 5, 6.3, 8, 10, 12.5, 16, 20, 25, 31.5, 40, 50, 63, 80, 100, 125, 160, 200],
                    efficiency: 0.96,
                    mountingTypes: {
                        'with_motor': ['IRAM', 'IRFM', 'IRAFM', 'IRAPM', 'IRFPM', 'IRAFPM'],
                        'without_motor': ['IRA', 'IRF', 'IRAF', 'IRAP', 'IRFP', 'IRAFP']
                    }
                },
                'IRK': {
                    name: 'IRK',
                    description: 'Konik - Helisel',
                    sizes: ['IRK43', 'IRK53', 'IRK63', 'IRK73', 'IRK83', 'IRK93', 'IRK103', 'IRK113', 'IRK123', 'IRK153'],
                    sizeData: {
                        'IRK43': { torque: 520, shaft: 25, weight: 28 },
                        'IRK53': { torque: 1050, shaft: 30, weight: 42 },
                        'IRK63': { torque: 1950, shaft: 35, weight: 68 },
                        'IRK73': { torque: 3400, shaft: 40, weight: 105 },
                        'IRK83': { torque: 5700, shaft: 50, weight: 168 },
                        'IRK93': { torque: 9100, shaft: 60, weight: 265 },
                        'IRK103': { torque: 13800, shaft: 70, weight: 398 },
                        'IRK113': { torque: 18000, shaft: 80, weight: 595 },
                        'IRK123': { torque: 18000, shaft: 90, weight: 845 },
                        'IRK153': { torque: 18000, shaft: 120, weight: 2100 }
                    },
                    ratios: [6.3, 8, 10, 12.5, 16, 20, 25, 31.5, 40, 50, 63, 80, 100, 125, 160, 200],
                    efficiency: 0.95,
                    mountingTypes: {
                        'with_motor': ['IRKM', 'IRKFM', 'IRKAFM', 'IRKPM', 'IRKFPM', 'IRKAFPM'],
                        'without_motor': ['IRK', 'IRKF', 'IRKAF', 'IRKP', 'IRKFP', 'IRKAFP']
                    }
                },
                'S': {
                    name: 'S',
                    description: 'Alüminyum Worm',
                    sizes: ['S30', 'S40', 'S50', 'S63', 'S75', 'S90'],
                    sizeData: {
                        'S30': { torque: 60, shaft: 11, weight: 3 },
                        'S40': { torque: 80, shaft: 14, weight: 5 },
                        'S50': { torque: 180, shaft: 19, weight: 9 },
                        'S63': { torque: 380, shaft: 24, weight: 16 },
                        'S75': { torque: 750, shaft: 28, weight: 28 },
                        'S90': { torque: 1400, shaft: 38, weight: 48 }
                    },
                    ratios: [5, 7.5, 10, 15, 20, 25, 30, 40, 50, 60, 80, 100],
                    efficiency: 0.75,
                    mountingTypes: {
                        'with_motor': ['SM'],
                        'without_motor': ['S', 'SF', 'SA', 'SAF']
                    }
                },
                'IRSD': {
                    name: 'IRSD',
                    description: 'Helisel - Worm',
                    sizes: ['IRSD40', 'IRSD50', 'IRSD60', 'IRSD70', 'IRSD80', 'IRSD100'],
                    sizeData: {
                        'IRSD40': { torque: 160, shaft: 14, weight: 12 },
                        'IRSD50': { torque: 380, shaft: 19, weight: 20 },
                        'IRSD60': { torque: 800, shaft: 24, weight: 35 },
                        'IRSD70': { torque: 1500, shaft: 28, weight: 58 },
                        'IRSD80': { torque: 2800, shaft: 38, weight: 95 },
                        'IRSD100': { torque: 5200, shaft: 48, weight: 165 }
                    },
                    ratios: [10, 15, 20, 25, 30, 40, 50, 60, 80, 100, 120, 150, 200, 250, 300],
                    efficiency: 0.65,
                    mountingTypes: {
                        'with_motor': ['IRSDM', 'IRSDFM', 'IRSDAFM', 'IRSDPM', 'IRSDFPM'],
                        'without_motor': ['IRSD', 'IRSDF', 'IRSDAF', 'IRSDP', 'IRSDFP']
                    }
                },
                'IRC': {
                    name: 'IRC',
                    description: 'Vinç',
                    sizes: ['IRC50', 'IRC60', 'IRC70', 'IRC80', 'IRC90', 'IRC100'],
                    sizeData: {
                        'IRC50': { torque: 2500, shaft: 35, weight: 75 },
                        'IRC60': { torque: 4500, shaft: 40, weight: 125 },
                        'IRC70': { torque: 8000, shaft: 50, weight: 195 },
                        'IRC80': { torque: 14000, shaft: 60, weight: 310 },
                        'IRC90': { torque: 18000, shaft: 70, weight: 475 },
                        'IRC100': { torque: 18000, shaft: 80, weight: 680 }
                    },
                    ratios: [8, 10, 12.5, 16, 20, 25, 31.5, 40, 50, 63, 80, 100, 125],
                    efficiency: 0.94,
                    mountingTypes: {
                        'with_motor': ['IRCM', 'IRCPM'],
                        'without_motor': ['IRC', 'IRCP']
                    }
                },
                'IRO': {
                    name: 'IRO',
                    description: 'Şaft Montajlı',
                    sizes: ['IRO30', 'IRO40', 'IRO50', 'IRO60', 'IRO70', 'IRO80'],
                    sizeData: {
                        'IRO30': { torque: 1400, shaft: 30, weight: 42 },
                        'IRO40': { torque: 2800, shaft: 40, weight: 68 },
                        'IRO50': { torque: 5500, shaft: 50, weight: 115 },
                        'IRO60': { torque: 10500, shaft: 60, weight: 185 },
                        'IRO70': { torque: 18000, shaft: 70, weight: 295 },
                        'IRO80': { torque: 18000, shaft: 80, weight: 445 }
                    },
                    ratios: [5, 6.3, 8, 10, 12.5, 16, 20, 25, 31.5, 40, 50],
                    efficiency: 0.95,
                    mountingTypes: {
                        'with_motor': [],
                        'without_motor': ['IRO']
                    }
                },
                'IRNX': {
                    name: 'IRNX',
                    description: 'Şaft Montajlı',
                    sizes: ['IRNX01', 'IRNX02', 'IRNX03', 'IRNX04', 'IRNX05', 'IRNX06', 
                            'IRNX07', 'IRNX08', 'IRNX09', 'IRNX10', 'IRNX11', 'IRNX12'],
                    sizeData: {
                        'IRNX01': { torque: 1200, shaft: 30, weight: 50 },
                        'IRNX02': { torque: 2000, shaft: 35, weight: 75 },
                        'IRNX03': { torque: 3500, shaft: 40, weight: 110 },
                        'IRNX04': { torque: 5800, shaft: 50, weight: 165 },
                        'IRNX05': { torque: 9500, shaft: 60, weight: 250 },
                        'IRNX06': { torque: 14000, shaft: 70, weight: 380 },
                        'IRNX07': { torque: 18000, shaft: 80, weight: 550 },
                        'IRNX08': { torque: 22000, shaft: 90, weight: 780 },
                        'IRNX09': { torque: 28000, shaft: 110, weight: 1050 },
                        'IRNX10': { torque: 34000, shaft: 140, weight: 1400 },
                        'IRNX11': { torque: 40000, shaft: 170, weight: 1850 },
                        'IRNX12': { torque: 42700, shaft: 190, weight: 2350 }
                    },
                    ratios: [5, 6.3, 8, 10, 12.5, 16, 20, 25, 31.5, 40, 50],
                    efficiency: 0.95,
                    mountingTypes: {
                        'with_motor': [],
                        'without_motor': ['IRNX']
                    }
                }
            };
            
            // Standart Motor Güçleri (kW)
            this.motorPowers = [
                0.09, 0.12, 0.18, 0.25, 0.37, 0.55, 0.75,
                1.1, 1.5, 2.2, 3, 4,
                5.5, 7.5, 11, 15, 18.5,
                22, 30, 37, 45, 55, 75,
                90, 110, 132, 160, 200
            ];
            
            // IEC Motor Tipleri (Gövde + Uzunluk + Kutup + Varyant)
            this.motorTypes = {
                '2pole': { // 2900 rpm @ 50Hz
                    speed: 2900,
                    types: [
                        '63 M 2a', '71 M 2a', '71 M 2b',
                        '80 M 2a', '80 M 2b',
                        '90 S 2a', '90 L 2a', '90 L 2b',
                        '100 L 2a', '100 L 2b',
                        '112 M 2a', '112 M 2b',
                        '132 S 2a', '132 M 2a',
                        '160 M 2a', '160 L 2a',
                        '180 M 2a', '180 L 2a',
                        '200 L 2a', '200 L 2b',
                        '225 M 2a', '225 M 2b',
                        '250 M 2a', '250 M 2b',
                        '280 S 2a', '280 M 2a',
                        '315 S 2a', '315 M 2a', '315 L 2a'
                    ]
                },
                '4pole': { // 1450 rpm @ 50Hz
                    speed: 1450,
                    types: [
                        '63 M 4a', '63 M 4b',
                        '71 M 4a', '71 M 4b', '71 M 4c',
                        '80 M 4a', '80 M 4b',
                        '90 S 4a', '90 L 4a', '90 L 4b',
                        '100 L 4a', '100 L 4b',
                        '112 M 4a', '112 M 4b',
                        '132 S 4a', '132 M 4a', '132 M 4b',
                        '160 M 4a', '160 L 4a', '160 L 4b',
                        '180 M 4a', '180 L 4a', '180 L 4b',
                        '200 L 4a', '200 L 4b',
                        '225 S 4a', '225 M 4a', '225 M 4b',
                        '250 M 4a', '250 M 4b',
                        '280 S 4a', '280 M 4a', '280 M 4b',
                        '315 S 4a', '315 M 4a', '315 L 4a', '315 L 4b'
                    ]
                },
                '6pole': { // 970 rpm @ 50Hz
                    speed: 970,
                    types: [
                        '71 M 6a', '71 M 6b',
                        '80 M 6a', '80 M 6b',
                        '90 S 6a', '90 L 6a',
                        '100 L 6a', '100 L 6b',
                        '112 M 6a', '112 M 6b',
                        '132 S 6a', '132 M 6a', '132 M 6b',
                        '160 M 6a', '160 L 6a',
                        '180 L 6a', '180 L 6b',
                        '200 L 6a', '200 L 6b',
                        '225 M 6a', '225 M 6b',
                        '250 M 6a', '250 M 6b',
                        '280 S 6a', '280 M 6a',
                        '315 S 6a', '315 M 6a', '315 L 6a'
                    ]
                },
                '8pole': { // 730 rpm @ 50Hz
                    speed: 730,
                    types: [
                        '80 M 8a', '80 M 8b',
                        '90 S 8a', '90 L 8a',
                        '100 L 8a', '100 L 8b',
                        '112 M 8a', '112 M 8b',
                        '132 S 8a', '132 M 8a',
                        '160 M 8a', '160 L 8a',
                        '180 L 8a',
                        '200 L 8a',
                        '225 M 8a', '225 M 8b',
                        '250 M 8a',
                        '280 S 8a', '280 M 8a',
                        '315 S 8a', '315 M 8a'
                    ]
                }
            };
            
            // Standart Çıkış Devri Seçenekleri (rpm)
            this.outputSpeeds = [
                1, 1.5, 2, 3, 4, 5, 6, 7.5,
                10, 12, 15, 18, 20, 22, 25, 28,
                30, 35, 40, 45, 50, 56, 60, 70,
                80, 90, 100, 112, 125, 140, 150, 170,
                180, 200, 224, 250, 280, 300, 350,
                400, 450, 500, 560, 600, 700, 800, 900
            ];
            
            this.setupEventHandlers();
        }

        setupEventHandlers() {
            const self = this;
            
            window.ImakReduktorHandlers = {
                onSeriesChange: function() {
                    self.updateMountingTypes();
                    self.updateSizes();
                    self.updateMotorTypes();
                },
                
                onMountingTypeChange: function() {
                    self.updateMotorRequirement();
                    self.updateMotorTypes();
                },
                
                onSizeChange: function() {
                    self.updateSizeDetails();
                },
                
                onMotorPowerChange: function() {
                    self.calculateParameters();
                },
                
                onMotorTypeChange: function() {
                    self.calculateParameters();
                },
                
                onOutputSpeedChange: function() {
                    self.calculateParameters();
                }
            };
        }

        updateMountingTypes() {
            const series = document.getElementById('imak_seri')?.value;
            const mountingSelect = document.getElementById('imak_montaj_tipi');
            
            if (!mountingSelect || !series) return;
            
            const lang = this.getCurrentLanguage();
            mountingSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Montaj tipi seçin...' : 'Select mounting type...'}</option>`;
            
            const seriesData = this.productSeries[series];
            if (!seriesData) return;
            
            // Motor dahil grubu
            if (seriesData.mountingTypes.with_motor.length > 0) {
                const optgroup1 = document.createElement('optgroup');
                optgroup1.label = lang === 'tr' ? '=== MOTORLU TİPLER ===' : '=== WITH MOTOR ===';
                seriesData.mountingTypes.with_motor.forEach(code => {
                    const option = document.createElement('option');
                    option.value = code;
                    option.textContent = `${code} - ${this.getText('mount_' + code.toLowerCase())}`;
                    option.dataset.hasMotor = 'true';
                    optgroup1.appendChild(option);
                });
                mountingSelect.appendChild(optgroup1);
            }
            
            // Motor dahil değil grubu
            if (seriesData.mountingTypes.without_motor.length > 0) {
                const optgroup2 = document.createElement('optgroup');
                optgroup2.label = lang === 'tr' ? '=== MOTORSUZ TİPLER ===' : '=== WITHOUT MOTOR ===';
                seriesData.mountingTypes.without_motor.forEach(code => {
                    const option = document.createElement('option');
                    option.value = code;
                    option.textContent = `${code} - ${this.getText('mount_' + code.toLowerCase())}`;
                    option.dataset.hasMotor = 'false';
                    optgroup2.appendChild(option);
                });
                mountingSelect.appendChild(optgroup2);
            }
        }

        updateSizes() {
            const series = document.getElementById('imak_seri')?.value;
            const sizeSelect = document.getElementById('imak_boyut');
            
            if (!sizeSelect || !series) return;
            
            const lang = this.getCurrentLanguage();
            sizeSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Boyut seçin...' : 'Select size...'}</option>`;
            
            const seriesData = this.productSeries[series];
            if (!seriesData) return;
            
            seriesData.sizes.forEach(size => {
                const sizeInfo = seriesData.sizeData[size];
                const option = document.createElement('option');
                option.value = size;
                option.textContent = `${size} (Max ${sizeInfo.torque} Nm, Ø${sizeInfo.shaft}mm, ${sizeInfo.weight}kg)`;
                sizeSelect.appendChild(option);
            });
        }

        updateMotorTypes() {
            const motorTypeSelect = document.getElementById('imak_motor_tipi');
            const mountingType = document.getElementById('imak_montaj_tipi')?.value;
            
            if (!motorTypeSelect) return;
            
            const lang = this.getCurrentLanguage();
            
            // Montaj tipi motorlu mu kontrol et
            const selectedOption = document.querySelector(`#imak_montaj_tipi option[value="${mountingType}"]`);
            const hasMotor = selectedOption ? selectedOption.dataset.hasMotor === 'true' : false;
            
            if (!hasMotor) {
                motorTypeSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Motor tipi gerekli değil' : 'Motor type not required'}</option>`;
                motorTypeSelect.disabled = true;
                return;
            }
            
            motorTypeSelect.disabled = false;
            motorTypeSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Motor tipi seçin...' : 'Select motor type...'}</option>`;
            
            // 4 kutuplu motorlar (en yaygın - önce göster)
            const optgroup4 = document.createElement('optgroup');
            optgroup4.label = lang === 'tr' ? '4 Kutuplu (1450 rpm)' : '4 Pole (1450 rpm)';
            this.motorTypes['4pole'].types.forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.dataset.poles = '4';
                option.dataset.speed = '1450';
                option.textContent = type;
                optgroup4.appendChild(option);
            });
            motorTypeSelect.appendChild(optgroup4);
            
            // 2 kutuplu motorlar
            const optgroup2 = document.createElement('optgroup');
            optgroup2.label = lang === 'tr' ? '2 Kutuplu (2900 rpm)' : '2 Pole (2900 rpm)';
            this.motorTypes['2pole'].types.forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.dataset.poles = '2';
                option.dataset.speed = '2900';
                option.textContent = type;
                optgroup2.appendChild(option);
            });
            motorTypeSelect.appendChild(optgroup2);
            
            // 6 kutuplu motorlar
            const optgroup6 = document.createElement('optgroup');
            optgroup6.label = lang === 'tr' ? '6 Kutuplu (970 rpm)' : '6 Pole (970 rpm)';
            this.motorTypes['6pole'].types.forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.dataset.poles = '6';
                option.dataset.speed = '970';
                option.textContent = type;
                optgroup6.appendChild(option);
            });
            motorTypeSelect.appendChild(optgroup6);
            
            // 8 kutuplu motorlar
            const optgroup8 = document.createElement('optgroup');
            optgroup8.label = lang === 'tr' ? '8 Kutuplu (730 rpm)' : '8 Pole (730 rpm)';
            this.motorTypes['8pole'].types.forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.dataset.poles = '8';
                option.dataset.speed = '730';
                option.textContent = type;
                optgroup8.appendChild(option);
            });
            motorTypeSelect.appendChild(optgroup8);
        }

        updateMotorRequirement() {
            const mountingType = document.getElementById('imak_montaj_tipi')?.value;
            const motorPowerGroup = document.getElementById('motor_power_group');
            const motorTypeGroup = document.getElementById('motor_type_group');
            
            if (!mountingType || !motorPowerGroup || !motorTypeGroup) return;
            
            // Montaj tipi motorlu mu kontrol et
            const selectedOption = document.querySelector(`#imak_montaj_tipi option[value="${mountingType}"]`);
            const hasMotor = selectedOption ? selectedOption.dataset.hasMotor === 'true' : false;
            
            if (hasMotor) {
                motorPowerGroup.style.display = 'block';
                motorTypeGroup.style.display = 'block';
            } else {
                motorPowerGroup.style.display = 'none';
                motorTypeGroup.style.display = 'none';
                document.getElementById('imak_motor_gucu').value = '';
                document.getElementById('imak_motor_tipi').value = '';
            }
        }

        updateSizeDetails() {
            const series = document.getElementById('imak_seri')?.value;
            const size = document.getElementById('imak_boyut')?.value;
            
            if (!series || !size) return;
            
            const seriesData = this.productSeries[series];
            if (!seriesData) return;
            
            const sizeInfo = seriesData.sizeData[size];
            if (!sizeInfo) return;
            
            // Çıkış mili çapını göster - SAYISAL DEĞERİN DOĞRU ATANDIĞINDAN EMİN OL
            const outputShaftInput = document.getElementById('imak_cikis_mili');
            if (outputShaftInput && sizeInfo.shaft) {
                outputShaftInput.value = sizeInfo.shaft.toString();
            }
        }

        calculateParameters() {
            const series = document.getElementById('imak_seri')?.value;
            const motorPower = parseFloat(document.getElementById('imak_motor_gucu')?.value);
            const motorType = document.getElementById('imak_motor_tipi')?.value;
            const outputSpeed = parseFloat(document.getElementById('imak_cikis_devri')?.value);
            
            if (!series) return;
            
            const seriesData = this.productSeries[series];
            if (!seriesData) return;
            
            // Motor tipi seçildiyse giriş devrini belirle
            let inputSpeed = 0;
            if (motorType) {
                const selectedOption = document.querySelector(`#imak_motor_tipi option[value="${motorType}"]`);
                if (selectedOption) {
                    inputSpeed = parseFloat(selectedOption.dataset.speed);
                }
            }
            
            // Giriş devrini göster
            const inputSpeedInput = document.getElementById('imak_giris_devri');
            if (inputSpeedInput && inputSpeed > 0) {
                inputSpeedInput.value = inputSpeed;
            } else if (inputSpeedInput) {
                inputSpeedInput.value = '';
            }
            
            // Redüksiyon oranını hesapla
            let ratio = 0;
            if (inputSpeed > 0 && outputSpeed > 0) {
                ratio = inputSpeed / outputSpeed;
                
                // En yakın standart oranı bul
                const closestRatio = seriesData.ratios.reduce((prev, curr) => {
                    return Math.abs(curr - ratio) < Math.abs(prev - ratio) ? curr : prev;
                });
                
                ratio = closestRatio;
            }
            
            const ratioInput = document.getElementById('imak_reduksiyon_orani');
            if (ratioInput && ratio > 0) {
                ratioInput.value = ratio.toFixed(2);
            } else if (ratioInput) {
                ratioInput.value = '';
            }
            
            // Verimlilik
            const efficiencyInput = document.getElementById('imak_verimlilik');
            if (efficiencyInput) {
                const efficiency = seriesData.efficiency || 0.90;
                efficiencyInput.value = (efficiency * 100).toFixed(1);
            }
            
            // Çıkış momenti hesapla
            if (motorPower && outputSpeed && ratio > 0) {
                const efficiency = seriesData.efficiency || 0.90;
                const outputTorque = (motorPower * 9550 * efficiency) / outputSpeed;
                
                const outputTorqueInput = document.getElementById('imak_cikis_momenti');
                if (outputTorqueInput) {
                    outputTorqueInput.value = outputTorque.toFixed(0);
                }
            } else {
                const outputTorqueInput = document.getElementById('imak_cikis_momenti');
                if (outputTorqueInput) {
                    outputTorqueInput.value = '';
                }
            }
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="imak_seri">${this.getText('seri_label')}</label>
                        <select id="imak_seri" onchange="window.ImakReduktorHandlers.onSeriesChange()">
                            <option value="">${lang === 'tr' ? 'Seri seçin...' : 'Select series...'}</option>
                            <option value="IR">IR - ${this.productSeries['IR'].description}</option>
                            <option value="IRK">IRK - ${this.productSeries['IRK'].description}</option>
                            <option value="S">S - ${this.productSeries['S'].description}</option>
                            <option value="IRSD">IRSD - ${this.productSeries['IRSD'].description}</option>
                            <option value="IRC">IRC - ${this.productSeries['IRC'].description}</option>
                            <option value="IRO">IRO - ${this.productSeries['IRO'].description}</option>
                            <option value="IRNX">IRNX - ${this.productSeries['IRNX'].description}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="imak_montaj_tipi">${this.getText('montaj_tipi_label')}</label>
                        <select id="imak_montaj_tipi" onchange="window.ImakReduktorHandlers.onMountingTypeChange()">
                            <option value="">${lang === 'tr' ? 'Önce seri seçin' : 'Select series first'}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="imak_boyut">${this.getText('boyut_label')}</label>
                        <select id="imak_boyut" onchange="window.ImakReduktorHandlers.onSizeChange()">
                            <option value="">${lang === 'tr' ? 'Önce seri seçin' : 'Select series first'}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="imak_cikis_devri">${this.getText('cikis_devri_label')}</label>
                        <select id="imak_cikis_devri" onchange="window.ImakReduktorHandlers.onOutputSpeedChange()">
                            <option value="">${lang === 'tr' ? 'Çıkış devri seçin...' : 'Select output speed...'}</option>
                            ${this.outputSpeeds.map(speed => 
                                `<option value="${speed}">${speed} rpm</option>`
                            ).join('')}
                        </select>
                    </div>
                </div>
                
                <div class="form-row" id="motor_power_group" style="display:none;">
                    <div class="form-group">
                        <label for="imak_motor_gucu">${this.getText('motor_gucu_label')}</label>
                        <select id="imak_motor_gucu" onchange="window.ImakReduktorHandlers.onMotorPowerChange()">
                            <option value="">${lang === 'tr' ? 'Güç seçin...' : 'Select power...'}</option>
                            ${this.motorPowers.map(kw => 
                                `<option value="${kw}">${kw} kW</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="form-group" id="motor_type_group">
                        <label for="imak_motor_tipi">${this.getText('motor_tipi_label')}</label>
                        <select id="imak_motor_tipi" onchange="window.ImakReduktorHandlers.onMotorTypeChange()">
                            <option value="">${lang === 'tr' ? 'Motor tipi seçin...' : 'Select motor type...'}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row" style="border-top: 2px solid #e2e8f0; padding-top: 15px; margin-top: 10px;">
                    <div class="form-group">
                        <label for="imak_giris_devri" style="color: #667eea; font-weight: 600;">
                            ${this.getText('giris_devri_label')}
                        </label>
                        <input type="number" id="imak_giris_devri" readonly 
                               style="background: #f7fafc; font-weight: 600; color: #2d3748;"
                               placeholder="${lang === 'tr' ? 'Otomatik' : 'Auto'}">
                    </div>
                    <div class="form-group">
                        <label for="imak_reduksiyon_orani" style="color: #667eea; font-weight: 600;">
                            ${this.getText('reduksiyon_orani_label')}
                        </label>
                        <input type="number" id="imak_reduksiyon_orani" readonly 
                               style="background: #f7fafc; font-weight: 600; color: #2d3748;"
                               placeholder="${lang === 'tr' ? 'Otomatik' : 'Auto'}">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="imak_cikis_momenti" style="color: #667eea; font-weight: 600;">
                            ${this.getText('cikis_momenti_label')}
                        </label>
                        <input type="number" id="imak_cikis_momenti" readonly 
                               style="background: #f7fafc; font-weight: 600; color: #2d3748;"
                               placeholder="${lang === 'tr' ? 'Otomatik' : 'Auto'}">
                    </div>
                    <div class="form-group">
                        <label for="imak_cikis_mili">${this.getText('cikis_mili_label')}</label>
                        <input type="number" id="imak_cikis_mili" readonly 
                               style="background: #f7fafc; font-weight: 600; color: #2d3748;"
                               placeholder="${lang === 'tr' ? 'Otomatik' : 'Auto'}">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="imak_verimlilik" style="color: #667eea; font-weight: 600;">
                            ${this.getText('verimlilik_label')}
                        </label>
                        <input type="number" id="imak_verimlilik" readonly 
                               style="background: #f7fafc; font-weight: 600; color: #2d3748;"
                               placeholder="${lang === 'tr' ? 'Otomatik' : 'Auto'}">
                    </div>
                </div>
            `;
        }

        getGrades() {
            return ['İMAK Standart'];
        }

        getDensity(grade) {
            return 7200;
        }

        getStandard(grade) {
            return 'İMAK Redüktör / DIN 3990 / ISO 6336';
        }

        calculate(formData) {
            const series = formData.imak_seri;
            const size = formData.imak_boyut;
            const adet = parseFloat(formData.adet) || 1;
            
            if (!series || !size) {
                return null;
            }
            
            const seriesData = this.productSeries[series];
            if (!seriesData) return null;
            
            const sizeInfo = seriesData.sizeData[size];
            if (!sizeInfo) return null;
            
            // Redüktör ağırlığı
            let birimAgirlik = sizeInfo.weight;
            
            // Motor ağırlığı ekleme (motorlu montaj tipleri için)
            const mountingType = formData.imak_montaj_tipi;
            const selectedOption = document.querySelector(`#imak_montaj_tipi option[value="${mountingType}"]`);
            const hasMotor = selectedOption ? selectedOption.dataset.hasMotor === 'true' : false;
            
            if (hasMotor) {
                const motorPower = parseFloat(formData.imak_motor_gucu) || 0;
                if (motorPower > 0) {
                    const motorWeight = this.estimateMotorWeight(motorPower);
                    birimAgirlik += motorWeight;
                }
            }
            
            const toplamAgirlik = birimAgirlik * adet;
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                suHacmi: null
            };
        }

        estimateMotorWeight(kw) {
            if (kw <= 0.75) return 8;
            if (kw <= 1.5) return 12;
            if (kw <= 3) return 20;
            if (kw <= 5.5) return 32;
            if (kw <= 11) return 55;
            if (kw <= 22) return 90;
            if (kw <= 45) return 150;
            if (kw <= 75) return 250;
            if (kw <= 132) return 400;
            if (kw <= 200) return 600;
            return 800;
        }

        validate(formData) {
            if (!formData.imak_seri) {
                return {
                    isValid: false,
                    message: this.getText('validation_series')
                };
            }
            
            if (!formData.imak_montaj_tipi) {
                return {
                    isValid: false,
                    message: this.getText('validation_mounting')
                };
            }
            
            if (!formData.imak_boyut) {
                return {
                    isValid: false,
                    message: this.getText('validation_size')
                };
            }
            
            if (!formData.imak_cikis_devri) {
                return {
                    isValid: false,
                    message: this.getText('validation_output_speed')
                };
            }
            
            // Motorlu montaj tipleri için motor bilgisi kontrolü
            const mountingType = formData.imak_montaj_tipi;
            const selectedOption = document.querySelector(`#imak_montaj_tipi option[value="${mountingType}"]`);
            const hasMotor = selectedOption ? selectedOption.dataset.hasMotor === 'true' : false;
            
            if (hasMotor) {
                if (!formData.imak_motor_gucu) {
                    return {
                        isValid: false,
                        message: this.getText('validation_power')
                    };
                }
                
                if (!formData.imak_motor_tipi) {
                    return {
                        isValid: false,
                        message: this.getText('validation_motor_type')
                    };
                }
            }
            
            return { isValid: true };
        }

        formatDimensions(formData) {
            // Format: "IRKM 153 - 160 L 4a"
            const mountingType = formData.imak_montaj_tipi || '';
            const size = formData.imak_boyut || '';
            const motorType = formData.imak_motor_tipi || '';
            
            let dimStr = '';
            
            if (mountingType && size) {
                // Boyut numarasını montaj tipinden ayır
                const sizeNumber = size.replace(/[A-Z]+/g, '');
                dimStr = `${mountingType} ${sizeNumber}`;
                
                if (motorType) {
                    dimStr += ` - ${motorType}`;
                }
            }
            
            return dimStr || '-';
        }

        hasWaterVolume() {
            return false;
        }

        getDisplayName() {
            return this.getText('display_name');
        }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);

            // TABLO FORMATI:
            // Malzeme Türü: "İMAK Redüktör"
            // Malzeme Cinsi: "3 kW - 15 rpm"
            // Ölçüler: "IRKM 153 - 160 L 4a"
            // Su Hacmi: "Ø60mm - 305Nm"
            // Standart: "IRK - Konik - Helisel"
            
            baseRow.malzemeTuru = 'İMAK Redüktör';
            
            // Malzeme Cinsi: Motor gücü ve çıkış devri
            const motorPower = formData.imak_motor_gucu || '-';
            const outputSpeed = formData.imak_cikis_devri || '-';
            baseRow.malzemeCinsi = motorPower !== '-' ? `${motorPower} kW - ${outputSpeed} rpm` : `${outputSpeed} rpm`;
            
            // Ölçüler: Montaj tipi + Boyut + Motor tipi
            baseRow.olculer = this.formatDimensions(formData);
            
            // Su Hacmi: Çıkış mili çapı ve momenti - GÜVENLİ KONTROL
            let outputShaft = formData.imak_cikis_mili;
            let outputTorque = formData.imak_cikis_momenti;
            
            // NaN ve undefined kontrolü
            if (outputShaft === undefined || outputShaft === null || isNaN(outputShaft)) {
                outputShaft = '-';
            }
            
            if (outputTorque === undefined || outputTorque === null || isNaN(outputTorque)) {
                outputTorque = '-';
            }
            
            // Su hacmi formatlaması
            if (outputTorque !== '-' && outputTorque !== '') {
                baseRow.suHacmi = `Ø${outputShaft}mm - ${outputTorque}Nm`;
            } else if (outputShaft !== '-' && outputShaft !== '') {
                baseRow.suHacmi = `Ø${outputShaft}mm`;
            } else {
                baseRow.suHacmi = '-';
            }
            
            // Standart: Seri kodu - Seri açıklaması
            const series = formData.imak_seri;
            if (series && this.productSeries[series]) {
                const seriesData = this.productSeries[series];
                baseRow.enNormu = `${seriesData.name} - ${seriesData.description}`;
            }
            
            baseRow.metadata = {
                ...baseRow.metadata,
                imakReduktor: {
                    seri: formData.imak_seri,
                    montaj_tipi: formData.imak_montaj_tipi,
                    boyut: formData.imak_boyut,
                    motor_gucu: formData.imak_motor_gucu,
                    motor_tipi: formData.imak_motor_tipi,
                    cikis_devri: formData.imak_cikis_devri,
                    giris_devri: formData.imak_giris_devri,
                    reduksiyon_orani: formData.imak_reduksiyon_orani,
                    cikis_momenti: formData.imak_cikis_momenti,
                    cikis_mili: formData.imak_cikis_mili,
                    verimlilik: formData.imak_verimlilik
                }
            };
            
            return baseRow;
        }

        fillFormFromRow(rowData) {
            super.fillFormFromRow(rowData);
            
            const metadata = rowData.metadata?.imakReduktor;
            if (!metadata) {
                if (rowData.formData) {
                    this.fillFromFormData(rowData.formData);
                }
                return true;
            }
            
            setTimeout(() => {
                if (metadata.seri) {
                    document.getElementById('imak_seri').value = metadata.seri;
                    window.ImakReduktorHandlers.onSeriesChange();
                }
                
                setTimeout(() => {
                    if (metadata.montaj_tipi) {
                        document.getElementById('imak_montaj_tipi').value = metadata.montaj_tipi;
                        window.ImakReduktorHandlers.onMountingTypeChange();
                    }
                    
                    if (metadata.boyut) {
                        document.getElementById('imak_boyut').value = metadata.boyut;
                        window.ImakReduktorHandlers.onSizeChange();
                    }
                    
                    if (metadata.cikis_devri) {
                        document.getElementById('imak_cikis_devri').value = metadata.cikis_devri;
                    }
                    
                    if (metadata.motor_gucu) {
                        document.getElementById('imak_motor_gucu').value = metadata.motor_gucu;
                    }
                    
                    if (metadata.motor_tipi) {
                        document.getElementById('imak_motor_tipi').value = metadata.motor_tipi;
                    }
                    
                    // Hesaplanan değerler
                    if (metadata.giris_devri) {
                        document.getElementById('imak_giris_devri').value = metadata.giris_devri;
                    }
                    
                    if (metadata.reduksiyon_orani) {
                        document.getElementById('imak_reduksiyon_orani').value = metadata.reduksiyon_orani;
                    }
                    
                    if (metadata.cikis_mili) {
                        document.getElementById('imak_cikis_mili').value = metadata.cikis_mili;
                    }
                    
                    if (metadata.cikis_momenti) {
                        document.getElementById('imak_cikis_momenti').value = metadata.cikis_momenti;
                    }
                    
                    if (metadata.verimlilik) {
                        document.getElementById('imak_verimlilik').value = metadata.verimlilik;
                    }
                    
                    // Parametreleri yeniden hesapla
                    window.ImakReduktorHandlers.onOutputSpeedChange();
                }, 200);
            }, 100);
            
            return true;
        }

        fillFromFormData(formData) {
            setTimeout(() => {
                Object.keys(formData).forEach(key => {
                    const element = document.getElementById(key);
                    if (element) {
                        element.value = formData[key];
                        
                        if (key === 'imak_seri') {
                            window.ImakReduktorHandlers.onSeriesChange();
                        } else if (key === 'imak_montaj_tipi') {
                            setTimeout(() => {
                                window.ImakReduktorHandlers.onMountingTypeChange();
                            }, 150);
                        } else if (key === 'imak_boyut') {
                            setTimeout(() => {
                                window.ImakReduktorHandlers.onSizeChange();
                            }, 200);
                        }
                    }
                });
                
                // Parametreleri hesapla
                setTimeout(() => {
                    window.ImakReduktorHandlers.onOutputSpeedChange();
                }, 300);
            }, 100);
        }
    }

    const imakReduktorMaterial = new ImakReduktorMaterial();
    imakReduktorMaterial.register();
    
    console.log('İMAK Redüktör modülü v4.0.0 yüklendi - Üretici standartlarına tam uyumlu');

})(window);