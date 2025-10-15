/**
 * İMAK REDÜKTÖR - Motor Redüktör Modülü
 * Versiyon: 2.0.0
 * İMAK Redüktör'ün gerçek ürün serileri ve modelleri
 * 
 * Ürün Serileri:
 * - IR Series: Helical Geared Motors (12 boyut: IR43-IR153)
 * - IRK Series: Helical Bevel Geared Motors (10 boyut: IRK43-IRK153)
 * - S Series: Aluminum Worm Geared Motors (6 boyut)
 * - IRSD Series: Helical Worm Geared Motors
 * - IRC Series: Hoist Drive Geared Motors (6 boyut)
 * - IRO/IRNX Series: Shaft Mounted Gearboxes
 * - IPR/IPRK Series: Planetary Gearboxes (20+ boyut)
 * - A/AE Series: Industrial Gear Units
 * 
 * Kaynak: www.imakreduktor.com
 */

(function(window) {
    'use strict';
    
    class ImakReduktorMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'imakReduktor';
            this.version = '2.0.0';
            
            this.texts = {
                tr: {
                    display_name: 'İMAK Redüktör',
                    
                    // Etiketler
                    seri_label: 'Ürün Serisi',
                    model_label: 'Model / Boyut',
                    motor_gucu_label: 'Motor Gücü (kW)',
                    giris_devri_label: 'Giriş Devri (rpm)',
                    reduksiyon_orani_label: 'Redüksiyon Oranı (i)',
                    montaj_tipi_label: 'Montaj Tipi',
                    cikis_mili_label: 'Çıkış Mili (mm)',
                    govde_malzemesi_label: 'Gövde Malzemesi',
                    ozellik_label: 'Özel Özellikler',
                    
                    // Ürün Serileri
                    ir_series: 'IR Series - Helical Geared Motors (Helisel Dişli)',
                    irk_series: 'IRK Series - Helical Bevel Geared Motors (Konik-Helisel)',
                    s_series: 'S Series - Aluminum Worm Geared Motors (Alüminyum Sonsuz Vidalı)',
                    irsd_series: 'IRSD Series - Helical Worm Geared Motors (Helisel-Sonsuz Vidalı)',
                    irc_series: 'IRC Series - Hoist Drive Geared Motors (Vinç Tipi)',
                    iro_series: 'IRO Series - Shaft Mounted Gearboxes (Şaft Montajlı)',
                    irnx_series: 'IRNX Series - Shaft Mounted Gearboxes (Şaft Montajlı)',
                    ipr_series: 'IPR Series - Planetary Gearboxes (Gezegen Dişli)',
                    iprk_series: 'IPRK Series - Planetary Gearboxes (Gezegen Dişli - Konik)',
                    a_series: 'A Series - Industrial Gear Units (Endüstriyel)',
                    ae_series: 'AE Series - Industrial Gear Units (Endüstriyel)',
                    ma_series: 'MA Series - Monoblock Gear Units (Monoblok)',
                    mk_series: 'MK Series - Monoblock Gear Units (Monoblok - Konik)',
                    
                    // Tabloda gösterilecek kısa isimler
                    ir_series_display: 'IR - Helisel',
                    irk_series_display: 'IRK - Konik-Helisel',
                    s_series_display: 'S - Alüminyum Worm',
                    irsd_series_display: 'IRSD - Helisel-Worm',
                    irc_series_display: 'IRC - Vinç',
                    iro_series_display: 'IRO - Şaft Montajlı',
                    irnx_series_display: 'IRNX - Şaft Montajlı',
                    ipr_series_display: 'IPR - Planetary',
                    iprk_series_display: 'IPRK - Planetary Konik',
                    a_series_display: 'A - Endüstriyel',
                    ae_series_display: 'AE - Endüstriyel',
                    ma_series_display: 'MA - Monoblok',
                    mk_series_display: 'MK - Monoblok Konik',
                    
                    // Montaj Tipleri (İMAK standartları)
                    iram: 'IRAM (Ayaklı + Motor)',
                    irfm: 'IRFM (Flanşlı + Motor)',
                    irafm: 'IRAFM (Ayaklı + Flanşlı + Motor)',
                    irapm: 'IRAPM (IEC PAM + Ayaklı + Motor)',
                    irfpm: 'IRFPM (IEC PAM + Flanşlı + Motor)',
                    irafpm: 'IRAFPM (IEC PAM + Ayaklı + Flanşlı + Motor)',
                    ira: 'IRA (Ayaklı - Motorsuz)',
                    irf: 'IRF (Flanşlı - Motorsuz)',
                    iraf: 'IRAF (Ayaklı + Flanşlı - Motorsuz)',
                    irap: 'IRAP (IEC PAM + Ayaklı - Motorsuz)',
                    irfp: 'IRFP (IEC PAM + Flanşlı - Motorsuz)',
                    irafp: 'IRAFP (IEC PAM + Ayaklı + Flanşlı - Motorsuz)',
                    sm: 'SM (Worm Geared Motor)',
                    
                    // Gövde Malzemeleri
                    gg20: 'GG20 Dökme Demir',
                    gg25: 'GG25 Dökme Demir',
                    aluminyum: 'Alüminyum Alaşım',
                    
                    // Özel Özellikler
                    backstop: 'Backstop (Geri Dönüş Önleme)',
                    brake: 'Fren Motorlu',
                    encoder: 'Encoder\'lı',
                    fan_cooled: 'Fan Soğutmalı',
                    torque_arm: 'Tork Kolu',
                    shrink_disk: 'Shrink Disk',
                    
                    // Validasyon
                    validation_error: 'Lütfen tüm alanları doldurun',
                    validation_model: 'Lütfen model seçin',
                    validation_motor: 'Lütfen motor gücü seçin'
                },
                en: {
                    display_name: 'İMAK Gearbox',
                    
                    // Labels
                    seri_label: 'Product Series',
                    model_label: 'Model / Size',
                    motor_gucu_label: 'Motor Power (kW)',
                    giris_devri_label: 'Input Speed (rpm)',
                    reduksiyon_orani_label: 'Reduction Ratio (i)',
                    montaj_tipi_label: 'Mounting Type',
                    cikis_mili_label: 'Output Shaft (mm)',
                    govde_malzemesi_label: 'Housing Material',
                    ozellik_label: 'Special Features',
                    
                    // Product Series
                    ir_series: 'IR Series - Helical Geared Motors',
                    irk_series: 'IRK Series - Helical Bevel Geared Motors',
                    s_series: 'S Series - Aluminum Worm Geared Motors',
                    irsd_series: 'IRSD Series - Helical Worm Geared Motors',
                    irc_series: 'IRC Series - Hoist Drive Geared Motors',
                    iro_series: 'IRO Series - Shaft Mounted Gearboxes',
                    irnx_series: 'IRNX Series - Shaft Mounted Gearboxes',
                    ipr_series: 'IPR Series - Planetary Gearboxes',
                    iprk_series: 'IPRK Series - Planetary Gearboxes (Bevel)',
                    a_series: 'A Series - Industrial Gear Units',
                    ae_series: 'AE Series - Industrial Gear Units',
                    ma_series: 'MA Series - Monoblock Gear Units',
                    mk_series: 'MK Series - Monoblock Gear Units (Bevel)',
                    
                    // Display names
                    ir_series_display: 'IR - Helical',
                    irk_series_display: 'IRK - Helical Bevel',
                    s_series_display: 'S - Aluminum Worm',
                    irsd_series_display: 'IRSD - Helical-Worm',
                    irc_series_display: 'IRC - Hoist Drive',
                    iro_series_display: 'IRO - Shaft Mounted',
                    irnx_series_display: 'IRNX - Shaft Mounted',
                    ipr_series_display: 'IPR - Planetary',
                    iprk_series_display: 'IPRK - Planetary Bevel',
                    a_series_display: 'A - Industrial',
                    ae_series_display: 'AE - Industrial',
                    ma_series_display: 'MA - Monoblock',
                    mk_series_display: 'MK - Monoblock Bevel',
                    
                    // Mounting Types
                    iram: 'IRAM (Foot + Motor)',
                    irfm: 'IRFM (Flange + Motor)',
                    irafm: 'IRAFM (Foot + Flange + Motor)',
                    irapm: 'IRAPM (IEC PAM + Foot + Motor)',
                    irfpm: 'IRFPM (IEC PAM + Flange + Motor)',
                    irafpm: 'IRAFPM (IEC PAM + Foot + Flange + Motor)',
                    ira: 'IRA (Foot Mounted)',
                    irf: 'IRF (Flange Mounted)',
                    iraf: 'IRAF (Foot + Flange)',
                    irap: 'IRAP (IEC PAM + Foot)',
                    irfp: 'IRFP (IEC PAM + Flange)',
                    irafp: 'IRAFP (IEC PAM + Foot + Flange)',
                    sm: 'SM (Worm Geared Motor)',
                    
                    // Housing Materials
                    gg20: 'GG20 Cast Iron',
                    gg25: 'GG25 Cast Iron',
                    aluminyum: 'Aluminum Alloy',
                    
                    // Special Features
                    backstop: 'Backstop',
                    brake: 'Brake Motor',
                    encoder: 'With Encoder',
                    fan_cooled: 'Fan Cooled',
                    torque_arm: 'Torque Arm',
                    shrink_disk: 'Shrink Disk',
                    
                    // Validation
                    validation_error: 'Please fill all fields',
                    validation_model: 'Please select a model',
                    validation_motor: 'Please select motor power'
                }
            };
            
            // İMAK Redüktör Gerçek Ürün Serileri ve Modelleri
            this.urunSerileri = {
                'ir_series': {
                    name: 'IR Series',
                    type: 'helical',
                    govde: 'gg20',
                    models: [
                        { code: 'IR43', torque: { min: 90, max: 280 }, shaft: 25, weight: 22 },
                        { code: 'IR53', torque: { min: 180, max: 580 }, shaft: 30, weight: 35 },
                        { code: 'IR63', torque: { min: 350, max: 1150 }, shaft: 35, weight: 55 },
                        { code: 'IR73', torque: { min: 650, max: 2100 }, shaft: 40, weight: 85 },
                        { code: 'IR83', torque: { min: 1100, max: 3600 }, shaft: 50, weight: 135 },
                        { code: 'IR93', torque: { min: 1800, max: 5800 }, shaft: 60, weight: 210 },
                        { code: 'IR103', torque: { min: 2800, max: 9000 }, shaft: 70, weight: 320 },
                        { code: 'IR113', torque: { min: 4200, max: 13500 }, shaft: 80, weight: 480 },
                        { code: 'IR123', torque: { min: 6000, max: 18000 }, shaft: 90, weight: 680 },
                        { code: 'IR133', torque: { min: 8500, max: 18000 }, shaft: 100, weight: 920 },
                        { code: 'IR143', torque: { min: 11000, max: 18000 }, shaft: 110, weight: 1250 },
                        { code: 'IR153', torque: { min: 14000, max: 18000 }, shaft: 120, weight: 1680 }
                    ],
                    ratios: [3.15, 4, 5, 6.3, 8, 10, 12.5, 16, 20, 25, 31.5, 40, 50, 63, 80, 100],
                    efficiency: { single: 0.96, double: 0.94 }
                },
                'irk_series': {
                    name: 'IRK Series',
                    type: 'bevel_helical',
                    govde: 'gg20',
                    models: [
                        { code: 'IRK43', torque: { min: 200, max: 520 }, shaft: 25, weight: 28 },
                        { code: 'IRK53', torque: { min: 400, max: 1050 }, shaft: 30, weight: 42 },
                        { code: 'IRK63', torque: { min: 750, max: 1950 }, shaft: 35, weight: 68 },
                        { code: 'IRK73', torque: { min: 1300, max: 3400 }, shaft: 40, weight: 105 },
                        { code: 'IRK83', torque: { min: 2200, max: 5700 }, shaft: 50, weight: 168 },
                        { code: 'IRK93', torque: { min: 3500, max: 9100 }, shaft: 60, weight: 265 },
                        { code: 'IRK103', torque: { min: 5300, max: 13800 }, shaft: 70, weight: 398 },
                        { code: 'IRK113', torque: { min: 7800, max: 18000 }, shaft: 80, weight: 595 },
                        { code: 'IRK123', torque: { min: 11000, max: 18000 }, shaft: 90, weight: 845 },
                        { code: 'IRK153', torque: { min: 16000, max: 18000 }, shaft: 120, weight: 2100 }
                    ],
                    ratios: [6.3, 8, 10, 12.5, 16, 20, 25, 31.5, 40, 50, 63, 80, 100],
                    efficiency: { single: 0.95, double: 0.93 }
                },
                's_series': {
                    name: 'S Series',
                    type: 'worm',
                    govde: 'aluminyum',
                    models: [
                        { code: 'S40', torque: { min: 20, max: 80 }, shaft: 14, weight: 5 },
                        { code: 'S50', torque: { min: 50, max: 180 }, shaft: 19, weight: 9 },
                        { code: 'S60', torque: { min: 120, max: 380 }, shaft: 24, weight: 16 },
                        { code: 'S70', torque: { min: 250, max: 750 }, shaft: 28, weight: 28 },
                        { code: 'S80', torque: { min: 480, max: 1400 }, shaft: 38, weight: 48 },
                        { code: 'S100', torque: { min: 900, max: 2600 }, shaft: 48, weight: 85 }
                    ],
                    ratios: [5, 7.5, 10, 15, 20, 25, 30, 40, 50, 60, 80, 100],
                    efficiency: { single: 0.50, double: 0.40 }
                },
                'irsd_series': {
                    name: 'IRSD Series',
                    type: 'helical_worm',
                    govde: 'gg20',
                    models: [
                        { code: 'IRSD40', torque: { min: 45, max: 160 }, shaft: 14, weight: 12 },
                        { code: 'IRSD50', torque: { min: 110, max: 380 }, shaft: 19, weight: 20 },
                        { code: 'IRSD60', torque: { min: 260, max: 800 }, shaft: 24, weight: 35 },
                        { code: 'IRSD70', torque: { min: 530, max: 1500 }, shaft: 28, weight: 58 },
                        { code: 'IRSD80', torque: { min: 1000, max: 2800 }, shaft: 38, weight: 95 },
                        { code: 'IRSD100', torque: { min: 1900, max: 5200 }, shaft: 48, weight: 165 }
                    ],
                    ratios: [10, 15, 20, 25, 30, 40, 50, 60, 80, 100, 120, 150, 200],
                    efficiency: { single: 0.65, double: 0.60 }
                },
                'irc_series': {
                    name: 'IRC Series',
                    type: 'hoist',
                    govde: 'gg25',
                    models: [
                        { code: 'IRC50', torque: { min: 800, max: 2500 }, shaft: 35, weight: 75 },
                        { code: 'IRC60', torque: { min: 1500, max: 4500 }, shaft: 40, weight: 125 },
                        { code: 'IRC70', torque: { min: 2800, max: 8000 }, shaft: 50, weight: 195 },
                        { code: 'IRC80', torque: { min: 5000, max: 14000 }, shaft: 60, weight: 310 },
                        { code: 'IRC90', torque: { min: 8500, max: 18000 }, shaft: 70, weight: 475 },
                        { code: 'IRC100', torque: { min: 12000, max: 18000 }, shaft: 80, weight: 680 }
                    ],
                    ratios: [8, 10, 12.5, 16, 20, 25, 31.5, 40, 50, 63, 80, 100],
                    efficiency: { single: 0.94, double: 0.92, triple: 0.90 }
                },
                'iro_series': {
                    name: 'IRO Series',
                    type: 'shaft_mounted',
                    govde: 'gg25',
                    models: [
                        { code: 'IRO30', torque: { min: 450, max: 1400 }, shaft: 30, weight: 42 },
                        { code: 'IRO40', torque: { min: 900, max: 2800 }, shaft: 40, weight: 68 },
                        { code: 'IRO50', torque: { min: 1800, max: 5500 }, shaft: 50, weight: 115 },
                        { code: 'IRO60', torque: { min: 3500, max: 10500 }, shaft: 60, weight: 185 },
                        { code: 'IRO70', torque: { min: 6500, max: 18000 }, shaft: 70, weight: 295 },
                        { code: 'IRO80', torque: { min: 11000, max: 18000 }, shaft: 80, weight: 445 }
                    ],
                    ratios: [5, 6.3, 8, 10, 12.5, 16, 20, 25, 31.5, 40, 50],
                    efficiency: { single: 0.95, double: 0.93 }
                },
                'ipr_series': {
                    name: 'IPR Series',
                    type: 'planetary',
                    govde: 'gg20',
                    models: [
                        { code: 'IPR30', torque: { min: 100, max: 350 }, shaft: 22, weight: 15 },
                        { code: 'IPR40', torque: { min: 250, max: 850 }, shaft: 28, weight: 28 },
                        { code: 'IPR60', torque: { min: 600, max: 2000 }, shaft: 35, weight: 55 },
                        { code: 'IPR80', torque: { min: 1400, max: 4500 }, shaft: 45, weight: 105 },
                        { code: 'IPR100', torque: { min: 2800, max: 9000 }, shaft: 55, weight: 185 },
                        { code: 'IPR120', torque: { min: 5000, max: 15000 }, shaft: 70, weight: 315 },
                        { code: 'IPR140', torque: { min: 8500, max: 18000 }, shaft: 85, weight: 515 }
                    ],
                    ratios: [3, 4, 5, 7, 10, 15, 20, 25, 32, 40, 50, 64, 80, 100],
                    efficiency: { single: 0.97, double: 0.95, triple: 0.93 }
                }
            };
            
            // Standart Motor Güçleri (kW)
            this.motorGucuOpsiyonlari = [
                0.09, 0.12, 0.18, 0.25, 0.37, 0.55, 0.75,
                1.1, 1.5, 2.2, 3, 4,
                5.5, 7.5, 11, 15, 18.5,
                22, 30, 37, 45, 55, 75,
                90, 110, 132, 160, 200
            ];
            
            // Standart Giriş Devri Seçenekleri
            this.girisDevriOpsiyonlari = [1400, 1450, 1500, 2800, 2900, 3000];
            
            this.setupEventHandlers();
        }

        setupEventHandlers() {
            const self = this;
            
            window.ImakReduktorHandlers = {
                onSeriChange: function() {
                    self.updateModeller();
                    self.updateMontajTipleri();
                    self.updateReduksiyonOranlari();
                },
                
                onModelChange: function() {
                    self.updateModelDetails();
                    self.hesaplaOtomatik();
                },
                
                onAnyFieldChange: function() {
                    self.hesaplaOtomatik();
                }
            };
        }

        updateModeller() {
            const seri = document.getElementById('imak_seri')?.value;
            const modelSelect = document.getElementById('imak_model');
            
            if (!modelSelect || !seri) return;
            
            const lang = this.getCurrentLanguage();
            modelSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Model seçin...' : 'Select model...'}</option>`;
            
            const seriData = this.urunSerileri[seri];
            if (!seriData) return;
            
            seriData.models.forEach(model => {
                const option = document.createElement('option');
                option.value = model.code;
                option.textContent = `${model.code} (${model.torque.max} Nm, Ø${model.shaft}mm, ${model.weight}kg)`;
                modelSelect.appendChild(option);
            });
        }

        updateModelDetails() {
            const seri = document.getElementById('imak_seri')?.value;
            const modelCode = document.getElementById('imak_model')?.value;
            
            if (!seri || !modelCode) return;
            
            const seriData = this.urunSerileri[seri];
            if (!seriData) return;
            
            const model = seriData.models.find(m => m.code === modelCode);
            if (!model) return;
            
            // Çıkış mili bilgisini göster
            const cikisMiliInput = document.getElementById('imak_cikis_mili');
            if (cikisMiliInput) {
                cikisMiliInput.value = model.shaft;
            }
        }

        updateMontajTipleri() {
            const seri = document.getElementById('imak_seri')?.value;
            const montajSelect = document.getElementById('imak_montaj_tipi');
            
            if (!montajSelect || !seri) return;
            
            const lang = this.getCurrentLanguage();
            montajSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Montaj tipi seçin...' : 'Select mounting type...'}</option>`;
            
            const seriData = this.urunSerileri[seri];
            if (!seriData) return;
            
            // Seriye göre uygun montaj tiplerini listele
            let montajTipleri = [];
            
            if (seriData.type === 'helical' || seriData.type === 'bevel_helical' || seriData.type === 'planetary') {
                montajTipleri = ['iram', 'irfm', 'irafm', 'irapm', 'irfpm', 'irafpm', 'ira', 'irf', 'iraf', 'irap', 'irfp', 'irafp'];
            } else if (seriData.type === 'worm' || seriData.type === 'helical_worm') {
                montajTipleri = ['sm', 'iram', 'irfm', 'irafm'];
            } else if (seriData.type === 'shaft_mounted' || seriData.type === 'hoist') {
                montajTipleri = ['ira', 'iraf'];
            }
            
            montajTipleri.forEach(tip => {
                const option = document.createElement('option');
                option.value = tip;
                option.textContent = this.getText(tip);
                montajSelect.appendChild(option);
            });
        }

        updateReduksiyonOranlari() {
            const seri = document.getElementById('imak_seri')?.value;
            const reduksiyonSelect = document.getElementById('imak_reduksiyon_orani');
            
            if (!reduksiyonSelect || !seri) return;
            
            const lang = this.getCurrentLanguage();
            const currentValue = reduksiyonSelect.value;
            
            reduksiyonSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Redüksiyon seçin...' : 'Select reduction...'}</option>`;
            
            const seriData = this.urunSerileri[seri];
            if (!seriData || !seriData.ratios) return;
            
            seriData.ratios.forEach(oran => {
                const option = document.createElement('option');
                option.value = oran;
                option.textContent = `i = ${oran}:1`;
                reduksiyonSelect.appendChild(option);
            });
            
            // Özel değer seçeneği
            const customOption = document.createElement('option');
            customOption.value = 'custom';
            customOption.textContent = lang === 'tr' ? 'Özel değer gir...' : 'Custom value...';
            reduksiyonSelect.appendChild(customOption);
            
            if (currentValue && seriData.ratios.includes(parseFloat(currentValue))) {
                reduksiyonSelect.value = currentValue;
            }
        }

        hesaplaOtomatik() {
            const motorGucu = parseFloat(document.getElementById('imak_motor_gucu')?.value);
            const girisDevriSelect = parseFloat(document.getElementById('imak_giris_devri')?.value);
            const girisDevriInput = parseFloat(document.getElementById('imak_giris_devri_input')?.value);
            const girisDevri = girisDevriInput || girisDevriSelect;
            
            const reduksiyonOraniSelect = parseFloat(document.getElementById('imak_reduksiyon_orani')?.value);
            const reduksiyonOraniInput = parseFloat(document.getElementById('imak_reduksiyon_orani_input')?.value);
            const reduksiyonOrani = reduksiyonOraniInput || reduksiyonOraniSelect;
            
            const seri = document.getElementById('imak_seri')?.value;
            
            if (motorGucu && girisDevri && reduksiyonOrani && seri) {
                const seriData = this.urunSerileri[seri];
                if (!seriData) return;
                
                // Çıkış devri hesapla
                const cikisDevri = girisDevri / reduksiyonOrani;
                const cikisDevriInput = document.getElementById('imak_cikis_devri');
                if (cikisDevriInput) {
                    cikisDevriInput.value = cikisDevri.toFixed(1);
                }
                
                // Verimlilik belirle
                let verimlilik;
                if (reduksiyonOrani <= 10) {
                    verimlilik = seriData.efficiency.single || 0.90;
                } else if (reduksiyonOrani <= 40) {
                    verimlilik = seriData.efficiency.double || 0.88;
                } else {
                    verimlilik = seriData.efficiency.triple || seriData.efficiency.double || 0.85;
                }
                
                // Çıkış momenti hesapla: T = (P × 9550 × η × i) / n
                const cikisMomenti = (motorGucu * 9550 * verimlilik * reduksiyonOrani) / girisDevri;
                const cikisMomentiInput = document.getElementById('imak_cikis_momenti');
                if (cikisMomentiInput) {
                    cikisMomentiInput.value = cikisMomenti.toFixed(0);
                }
                
                const verimlilikInput = document.getElementById('imak_verimlilik');
                if (verimlilikInput) {
                    verimlilikInput.value = (verimlilik * 100).toFixed(1);
                }
            }
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="imak_seri">${this.getText('seri_label')}</label>
                        <select id="imak_seri" onchange="window.ImakReduktorHandlers.onSeriChange()">
                            <option value="">${lang === 'tr' ? 'Seri seçin...' : 'Select series...'}</option>
                            <option value="ir_series">${this.getText('ir_series')}</option>
                            <option value="irk_series">${this.getText('irk_series')}</option>
                            <option value="s_series">${this.getText('s_series')}</option>
                            <option value="irsd_series">${this.getText('irsd_series')}</option>
                            <option value="irc_series">${this.getText('irc_series')}</option>
                            <option value="iro_series">${this.getText('iro_series')}</option>
                            <option value="ipr_series">${this.getText('ipr_series')}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="imak_model">${this.getText('model_label')}</label>
                        <select id="imak_model" onchange="window.ImakReduktorHandlers.onModelChange()">
                            <option value="">${lang === 'tr' ? 'Önce seri seçin' : 'Select series first'}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="imak_motor_gucu">${this.getText('motor_gucu_label')}</label>
                        <select id="imak_motor_gucu" onchange="window.ImakReduktorHandlers.onAnyFieldChange()">
                            <option value="">${lang === 'tr' ? 'Güç seçin...' : 'Select power...'}</option>
                            ${this.motorGucuOpsiyonlari.map(kw => 
                                `<option value="${kw}">${kw} kW</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="imak_giris_devri">${this.getText('giris_devri_label')}</label>
                        <div style="display: flex; gap: 5px;">
                            <select id="imak_giris_devri" style="flex: 1;" onchange="if(this.value !== 'custom') { document.getElementById('imak_giris_devri_input').value = this.value; window.ImakReduktorHandlers.onAnyFieldChange(); } else { document.getElementById('imak_giris_devri_input').focus(); }">
                                <option value="">${lang === 'tr' ? 'Devir seçin...' : 'Select speed...'}</option>
                                ${this.girisDevriOpsiyonlari.map(rpm => 
                                    `<option value="${rpm}">${rpm} rpm</option>`
                                ).join('')}
                                <option value="custom">${lang === 'tr' ? 'Özel...' : 'Custom...'}</option>
                            </select>
                            <input type="number" id="imak_giris_devri_input" 
                                   style="width: 100px;" placeholder="rpm"
                                   min="500" max="3600" step="1"
                                   onchange="document.getElementById('imak_giris_devri').value = this.value || 'custom'; window.ImakReduktorHandlers.onAnyFieldChange();">
                        </div>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="imak_reduksiyon_orani">${this.getText('reduksiyon_orani_label')}</label>
                        <div style="display: flex; gap: 5px;">
                            <select id="imak_reduksiyon_orani" style="flex: 1;" onchange="if(this.value !== 'custom') { document.getElementById('imak_reduksiyon_orani_input').value = this.value; window.ImakReduktorHandlers.onAnyFieldChange(); } else { document.getElementById('imak_reduksiyon_orani_input').focus(); }">
                                <option value="">${lang === 'tr' ? 'Önce seri seçin' : 'Select series first'}</option>
                            </select>
                            <input type="number" id="imak_reduksiyon_orani_input" 
                                   style="width: 80px;" placeholder="i"
                                   min="1" max="200" step="0.1"
                                   onchange="document.getElementById('imak_reduksiyon_orani').value = this.value || 'custom'; window.ImakReduktorHandlers.onAnyFieldChange();">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="imak_montaj_tipi">${this.getText('montaj_tipi_label')}</label>
                        <select id="imak_montaj_tipi">
                            <option value="">${lang === 'tr' ? 'Önce seri seçin' : 'Select series first'}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="imak_cikis_mili">${this.getText('cikis_mili_label')}</label>
                        <input type="number" id="imak_cikis_mili" readonly 
                               style="background: #f7fafc; font-weight: 600; color: #2d3748;"
                               placeholder="${lang === 'tr' ? 'Model seçilince otomatik' : 'Auto from model'}">
                    </div>
                    <div class="form-group">
                        <label for="imak_ozellik">${this.getText('ozellik_label')}</label>
                        <select id="imak_ozellik">
                            <option value="">${lang === 'tr' ? 'Yok / Standart' : 'None / Standard'}</option>
                            <option value="backstop">${this.getText('backstop')}</option>
                            <option value="brake">${this.getText('brake')}</option>
                            <option value="encoder">${this.getText('encoder')}</option>
                            <option value="fan_cooled">${this.getText('fan_cooled')}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row" style="border-top: 2px solid #e2e8f0; padding-top: 15px; margin-top: 10px;">
                    <div class="form-group">
                        <label for="imak_cikis_devri" style="color: #667eea; font-weight: 600;">
                            ${lang === 'tr' ? 'Çıkış Devri (rpm)' : 'Output Speed (rpm)'}
                        </label>
                        <input type="number" id="imak_cikis_devri" readonly 
                               style="background: #f7fafc; font-weight: 600; color: #2d3748;"
                               placeholder="${lang === 'tr' ? 'Otomatik' : 'Auto'}">
                    </div>
                    <div class="form-group">
                        <label for="imak_cikis_momenti" style="color: #667eea; font-weight: 600;">
                            ${lang === 'tr' ? 'Çıkış Momenti (Nm)' : 'Output Torque (Nm)'}
                        </label>
                        <input type="number" id="imak_cikis_momenti" readonly 
                               style="background: #f7fafc; font-weight: 600; color: #2d3748;"
                               placeholder="${lang === 'tr' ? 'Otomatik' : 'Auto'}">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="imak_verimlilik" style="color: #667eea; font-weight: 600;">
                            ${lang === 'tr' ? 'Verimlilik (%)' : 'Efficiency (%)'}
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
            const seri = formData.imak_seri;
            const modelCode = formData.imak_model;
            const adet = parseFloat(formData.adet) || 1;
            
            if (!seri || !modelCode) {
                return null;
            }
            
            const seriData = this.urunSerileri[seri];
            if (!seriData) return null;
            
            const model = seriData.models.find(m => m.code === modelCode);
            if (!model) return null;
            
            // Model ağırlığını kullan
            let birimAgirlik = model.weight;
            
            // Montaj tipine göre ağırlık düzeltmesi
            const montajTipi = formData.imak_montaj_tipi;
            if (montajTipi && montajTipi.includes('m')) { // Motor varsa
                const motorGucu = parseFloat(formData.imak_motor_gucu) || 0;
                const motorWeight = this.estimateMotorWeight(motorGucu);
                birimAgirlik += motorWeight;
            }
            
            // Özel özellikler için ağırlık ekle
            const ozellik = formData.imak_ozellik;
            if (ozellik === 'brake') {
                birimAgirlik *= 1.15; // Fren %15 ekler
            } else if (ozellik === 'encoder') {
                birimAgirlik += 2; // Encoder ~2 kg
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
            if (kw <= 4) return 15;
            if (kw <= 15) return 35;
            if (kw <= 55) return 75;
            if (kw <= 132) return 150;
            return 250;
        }

        validate(formData) {
            if (!formData.imak_seri || !formData.imak_model) {
                return {
                    isValid: false,
                    message: this.getText('validation_model')
                };
            }
            
            if (!formData.imak_motor_gucu) {
                return {
                    isValid: false,
                    message: this.getText('validation_motor')
                };
            }
            
            const girisDevri = formData.imak_giris_devri_input || formData.imak_giris_devri;
            const reduksiyonOrani = formData.imak_reduksiyon_orani_input || formData.imak_reduksiyon_orani;
            
            if (!girisDevri || !reduksiyonOrani || !formData.imak_montaj_tipi) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            return { isValid: true };
        }

        formatDimensions(formData) {
            const modelCode = formData.imak_model;
            const motorGucu = formData.imak_motor_gucu;
            const reduksiyonOraniInput = formData.imak_reduksiyon_orani_input;
            const reduksiyonOraniSelect = formData.imak_reduksiyon_orani;
            const reduksiyonOrani = reduksiyonOraniInput || reduksiyonOraniSelect;
            const montajTipi = formData.imak_montaj_tipi;
            const cikisMomenti = formData.imak_cikis_momenti;
            
            let dimStr = `${modelCode}`;
            
            if (motorGucu) {
                dimStr += `, ${motorGucu}kW`;
            }
            
            if (reduksiyonOrani) {
                dimStr += `, i=${reduksiyonOrani}`;
            }
            
            if (montajTipi) {
                dimStr += `, ${montajTipi.toUpperCase()}`;
            }
            
            if (cikisMomenti) {
                dimStr += `, ${parseFloat(cikisMomenti).toFixed(0)}Nm`;
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
            const metadata = rowData.metadata?.imakReduktor;
            if (!metadata) {
                return this.getDisplayName();
            }
            
            const seri = metadata.seri;
            if (seri) {
                const displayKey = `${seri}_display`;
                return this.getText(displayKey);
            }
            
            return this.getDisplayName();
        }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            
            const seri = formData.imak_seri;
            if (seri) {
                const displayKey = `${seri}_display`;
                baseRow.malzemeTuru = this.getText(displayKey);
            }
            
            baseRow.malzemeCinsi = formData.imak_model || 'İMAK Redüktör';
            baseRow.enNormu = this.getStandard('');
            
            baseRow.metadata = {
                ...baseRow.metadata,
                imakReduktor: {
                    seri: formData.imak_seri,
                    model: formData.imak_model,
                    motor_gucu: formData.imak_motor_gucu,
                    giris_devri: formData.imak_giris_devri_input || formData.imak_giris_devri,
                    reduksiyon_orani: formData.imak_reduksiyon_orani_input || formData.imak_reduksiyon_orani,
                    montaj_tipi: formData.imak_montaj_tipi,
                    cikis_mili: formData.imak_cikis_mili,
                    ozellik: formData.imak_ozellik,
                    cikis_devri: formData.imak_cikis_devri,
                    cikis_momenti: formData.imak_cikis_momenti,
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
                    window.ImakReduktorHandlers.onSeriChange();
                }
                
                setTimeout(() => {
                    if (metadata.model) {
                        document.getElementById('imak_model').value = metadata.model;
                        window.ImakReduktorHandlers.onModelChange();
                    }
                    
                    if (metadata.motor_gucu) {
                        document.getElementById('imak_motor_gucu').value = metadata.motor_gucu;
                    }
                    
                    if (metadata.giris_devri) {
                        const standartDeger = this.girisDevriOpsiyonlari.includes(parseFloat(metadata.giris_devri));
                        if (standartDeger) {
                            document.getElementById('imak_giris_devri').value = metadata.giris_devri;
                            document.getElementById('imak_giris_devri_input').value = metadata.giris_devri;
                        } else {
                            document.getElementById('imak_giris_devri').value = 'custom';
                            document.getElementById('imak_giris_devri_input').value = metadata.giris_devri;
                        }
                    }
                    
                    if (metadata.reduksiyon_orani) {
                        const seriData = this.urunSerileri[metadata.seri];
                        const standartOran = seriData && seriData.ratios.includes(parseFloat(metadata.reduksiyon_orani));
                        
                        if (standartOran) {
                            document.getElementById('imak_reduksiyon_orani').value = metadata.reduksiyon_orani;
                            document.getElementById('imak_reduksiyon_orani_input').value = metadata.reduksiyon_orani;
                        } else {
                            document.getElementById('imak_reduksiyon_orani').value = 'custom';
                            document.getElementById('imak_reduksiyon_orani_input').value = metadata.reduksiyon_orani;
                        }
                    }
                    
                    if (metadata.montaj_tipi) {
                        document.getElementById('imak_montaj_tipi').value = metadata.montaj_tipi;
                    }
                    
                    if (metadata.cikis_mili) {
                        document.getElementById('imak_cikis_mili').value = metadata.cikis_mili;
                    }
                    
                    if (metadata.ozellik) {
                        document.getElementById('imak_ozellik').value = metadata.ozellik;
                    }
                    
                    if (metadata.cikis_devri) {
                        document.getElementById('imak_cikis_devri').value = metadata.cikis_devri;
                    }
                    
                    if (metadata.cikis_momenti) {
                        document.getElementById('imak_cikis_momenti').value = metadata.cikis_momenti;
                    }
                    
                    if (metadata.verimlilik) {
                        document.getElementById('imak_verimlilik').value = metadata.verimlilik;
                    }
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
                            window.ImakReduktorHandlers.onSeriChange();
                        } else if (key === 'imak_model') {
                            setTimeout(() => {
                                window.ImakReduktorHandlers.onModelChange();
                            }, 150);
                        }
                    }
                });
            }, 100);
        }
    }

    const imakReduktorMaterial = new ImakReduktorMaterial();
    imakReduktorMaterial.register();
    
    console.log('İMAK Redüktör modülü v2.0.0 yüklendi - Gerçek ürün serileri ve modelleri');

})(window);