/**
 * CIVATA ve SOMUN Malzeme Modülü
 * Versiyon: 1.1.0
 * Dinamik Yüklenebilir - Tam Excel ve Dil Desteği
 */

(function(window) {
    'use strict';
    
    class CivataSomunMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'civataSomun';
            this.version = '1.1.0';
            
            // Dil metinleri
            this.texts = {
                tr: {
                    display_name: 'Cıvata / Somun',
                    tip_label: 'Ürün Tipi',
                    civata_tipi_label: 'Cıvata Tipi',
                    somun_tipi_label: 'Somun Tipi',
                    cap_label: 'Çap',
                    boy_label: 'Boy (mm)',
                    kalite_label: 'Kalite Sınıfı',
                    kaplama_label: 'Kaplama',
                    validation_error: 'Tüm alanlar doldurulmalıdır',
                    
                    // Cıvata tipleri
                    altikose_basli: 'Altıköşe Başlı Cıvata',
                    imbus: 'İmbus Cıvata',
                    havsa_basli: 'Havşa Başlı Cıvata',
                    yildiz_basli: 'Yıldız Başlı Cıvata',
                    kare_basli: 'Kare Başlı Cıvata',
                    
                    // Somun tipleri
                    altikose_somun: 'Altıköşe Somun',
                    kelebek_somun: 'Kelebek Somun',
                    koruklu_somun: 'Körüklü Somun',
                    kontra_somun: 'Kontra Somun',
                    
                    // Ürün tipleri
                    civata: 'Cıvata',
                    somun: 'Somun'
                },
                en: {
                    display_name: 'Bolt / Nut',
                    tip_label: 'Product Type',
                    civata_tipi_label: 'Bolt Type',
                    somun_tipi_label: 'Nut Type',
                    cap_label: 'Diameter',
                    boy_label: 'Length (mm)',
                    kalite_label: 'Grade',
                    kaplama_label: 'Coating',
                    validation_error: 'All fields must be filled',
                    
                    // Bolt types
                    altikose_basli: 'Hex Head Bolt',
                    imbus: 'Socket Head Bolt',
                    havsa_basli: 'Countersunk Bolt',
                    yildiz_basli: 'Torx Head Bolt',
                    kare_basli: 'Square Head Bolt',
                    
                    // Nut types
                    altikose_somun: 'Hex Nut',
                    kelebek_somun: 'Wing Nut',
                    koruklu_somun: 'Nylon Insert Nut',
                    kontra_somun: 'Lock Nut',
                    
                    // Product types
                    civata: 'Bolt',
                    somun: 'Nut'
                }
            };
            
            // Malzeme kaliteleri
            this.grades = ['4.6', '4.8', '5.6', '5.8', '8.8', '10.9', '12.9'];
            
            // Yoğunluklar (kg/m³)
            this.densities = {
                '4.6': 7850, '4.8': 7850, '5.6': 7850, '5.8': 7850,
                '8.8': 7850, '10.9': 7850, '12.9': 7850
            };
            
            // Standartlar
            this.standards = {
                '4.6': 'ISO 898-1', '4.8': 'ISO 898-1', '5.6': 'ISO 898-1',
                '5.8': 'ISO 898-1', '8.8': 'ISO 898-1', '10.9': 'ISO 898-1',
                '12.9': 'ISO 898-1'
            };
            
            // Çap seçenekleri (M5 - M40)
            this.diameters = [
                'M5', 'M6', 'M8', 'M10', 'M12', 'M14', 'M16', 'M18', 
                'M20', 'M22', 'M24', 'M27', 'M30', 'M33', 'M36', 'M39', 'M40'
            ];
            
            // Boy seçenekleri (mm)
            this.lengths = {
                'M5': [10, 12, 16, 20, 25, 30, 35, 40, 45, 50],
                'M6': [10, 12, 16, 20, 25, 30, 35, 40, 45, 50, 55, 60],
                'M8': [16, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80],
                'M10': [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100],
                'M12': [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100, 110, 120],
                'M14': [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100, 110, 120, 140],
                'M16': [35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100, 110, 120, 140, 160],
                'M18': [40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100, 110, 120, 140, 160, 180],
                'M20': [45, 50, 55, 60, 65, 70, 75, 80, 90, 100, 110, 120, 140, 160, 180, 200],
                'M22': [50, 55, 60, 65, 70, 75, 80, 90, 100, 110, 120, 140, 160, 180, 200],
                'M24': [55, 60, 65, 70, 75, 80, 90, 100, 110, 120, 140, 160, 180, 200, 220],
                'M27': [60, 65, 70, 75, 80, 90, 100, 110, 120, 140, 160, 180, 200, 220, 250],
                'M30': [65, 70, 75, 80, 90, 100, 110, 120, 140, 160, 180, 200, 220, 250, 280],
                'M33': [75, 80, 90, 100, 110, 120, 140, 160, 180, 200, 220, 250, 280],
                'M36': [80, 90, 100, 110, 120, 140, 160, 180, 200, 220, 250, 280, 300],
                'M39': [90, 100, 110, 120, 140, 160, 180, 200, 220, 250, 280, 300],
                'M40': [90, 100, 110, 120, 140, 160, 180, 200, 220, 250, 280, 300]
            };
            
            // Cıvata ağırlıkları (gram/adet) - DIN 933 standardına göre
            this.boltWeights = {
                'altikose_basli': {
                    'M5': { base: 2.4, perCm: 1.96 },
                    'M6': { base: 4.2, perCm: 2.83 },
                    'M8': { base: 9.5, perCm: 5.03 },
                    'M10': { base: 18.5, perCm: 7.85 },
                    'M12': { base: 31.2, perCm: 11.3 },
                    'M14': { base: 46.5, perCm: 15.4 },
                    'M16': { base: 68.2, perCm: 20.1 },
                    'M18': { base: 90.5, perCm: 25.4 },
                    'M20': { base: 122, perCm: 31.4 },
                    'M22': { base: 165, perCm: 38.0 },
                    'M24': { base: 208, perCm: 45.2 },
                    'M27': { base: 303, perCm: 57.3 },
                    'M30': { base: 427, perCm: 70.7 },
                    'M33': { base: 582, perCm: 85.5 },
                    'M36': { base: 765, perCm: 101.8 },
                    'M39': { base: 985, perCm: 119.5 },
                    'M40': { base: 1080, perCm: 125.7 }
                },
                'imbus': {
                    'M5': { base: 2.2, perCm: 1.76 },
                    'M6': { base: 3.8, perCm: 2.55 },
                    'M8': { base: 8.6, perCm: 4.53 },
                    'M10': { base: 16.7, perCm: 7.07 },
                    'M12': { base: 28.1, perCm: 10.2 },
                    'M14': { base: 41.9, perCm: 13.9 },
                    'M16': { base: 61.4, perCm: 18.1 },
                    'M18': { base: 81.5, perCm: 22.9 },
                    'M20': { base: 110, perCm: 28.3 },
                    'M22': { base: 149, perCm: 34.2 },
                    'M24': { base: 187, perCm: 40.7 },
                    'M27': { base: 273, perCm: 51.6 },
                    'M30': { base: 384, perCm: 63.6 },
                    'M33': { base: 524, perCm: 77.0 },
                    'M36': { base: 689, perCm: 91.6 },
                    'M39': { base: 887, perCm: 107.6 },
                    'M40': { base: 972, perCm: 113.1 }
                },
                'havsa_basli': {
                    'M5': { base: 2.0, perCm: 1.96 },
                    'M6': { base: 3.5, perCm: 2.83 },
                    'M8': { base: 8.0, perCm: 5.03 },
                    'M10': { base: 15.5, perCm: 7.85 },
                    'M12': { base: 26.2, perCm: 11.3 },
                    'M14': { base: 39.0, perCm: 15.4 },
                    'M16': { base: 57.2, perCm: 20.1 },
                    'M18': { base: 76.0, perCm: 25.4 },
                    'M20': { base: 102, perCm: 31.4 },
                    'M22': { base: 138, perCm: 38.0 },
                    'M24': { base: 174, perCm: 45.2 },
                    'M27': { base: 254, perCm: 57.3 },
                    'M30': { base: 358, perCm: 70.7 },
                    'M33': { base: 488, perCm: 85.5 },
                    'M36': { base: 642, perCm: 101.8 },
                    'M39': { base: 826, perCm: 119.5 },
                    'M40': { base: 906, perCm: 125.7 }
                },
                'yildiz_basli': {
                    'M5': { base: 2.3, perCm: 1.96 },
                    'M6': { base: 4.0, perCm: 2.83 },
                    'M8': { base: 9.0, perCm: 5.03 },
                    'M10': { base: 17.5, perCm: 7.85 },
                    'M12': { base: 29.5, perCm: 11.3 },
                    'M14': { base: 44.0, perCm: 15.4 },
                    'M16': { base: 64.5, perCm: 20.1 },
                    'M18': { base: 85.5, perCm: 25.4 },
                    'M20': { base: 115, perCm: 31.4 },
                    'M22': { base: 156, perCm: 38.0 },
                    'M24': { base: 197, perCm: 45.2 },
                    'M27': { base: 287, perCm: 57.3 },
                    'M30': { base: 404, perCm: 70.7 },
                    'M33': { base: 550, perCm: 85.5 },
                    'M36': { base: 724, perCm: 101.8 },
                    'M39': { base: 932, perCm: 119.5 },
                    'M40': { base: 1022, perCm: 125.7 }
                },
                'kare_basli': {
                    'M5': { base: 2.6, perCm: 1.96 },
                    'M6': { base: 4.5, perCm: 2.83 },
                    'M8': { base: 10.2, perCm: 5.03 },
                    'M10': { base: 19.8, perCm: 7.85 },
                    'M12': { base: 33.4, perCm: 11.3 },
                    'M14': { base: 49.8, perCm: 15.4 },
                    'M16': { base: 73.0, perCm: 20.1 },
                    'M18': { base: 96.8, perCm: 25.4 },
                    'M20': { base: 130, perCm: 31.4 },
                    'M22': { base: 176, perCm: 38.0 },
                    'M24': { base: 223, perCm: 45.2 },
                    'M27': { base: 324, perCm: 57.3 },
                    'M30': { base: 457, perCm: 70.7 },
                    'M33': { base: 623, perCm: 85.5 },
                    'M36': { base: 819, perCm: 101.8 },
                    'M39': { base: 1054, perCm: 119.5 },
                    'M40': { base: 1156, perCm: 125.7 }
                }
            };
            
            // Somun ağırlıkları (gram/adet) - DIN 934 standardına göre
            this.nutWeights = {
                'altikose_somun': {
                    'M5': 1.2, 'M6': 2.3, 'M8': 5.5, 'M10': 10.2,
                    'M12': 14.9, 'M14': 23.2, 'M16': 31.5, 'M18': 41.2,
                    'M20': 51.8, 'M22': 68.5, 'M24': 85.3, 'M27': 119.5,
                    'M30': 165.2, 'M33': 215.8, 'M36': 275.3, 'M39': 345.6,
                    'M40': 380.5
                },
                'kelebek_somun': {
                    'M5': 1.7, 'M6': 3.2, 'M8': 7.7, 'M10': 14.3,
                    'M12': 20.9, 'M14': 32.5, 'M16': 44.1, 'M18': 57.7,
                    'M20': 72.5, 'M22': 95.9, 'M24': 119.4, 'M27': 167.3,
                    'M30': 231.3, 'M33': 302.1, 'M36': 385.4, 'M39': 483.8,
                    'M40': 532.7
                },
                'koruklu_somun': {
                    'M5': 1.4, 'M6': 2.7, 'M8': 6.4, 'M10': 11.8,
                    'M12': 17.3, 'M14': 26.9, 'M16': 36.5, 'M18': 47.8,
                    'M20': 60.1, 'M22': 79.5, 'M24': 99.0, 'M27': 138.7,
                    'M30': 191.7, 'M33': 250.4, 'M36': 319.5, 'M39': 401.2,
                    'M40': 441.8
                },
                'kontra_somun': {
                    'M5': 0.8, 'M6': 1.5, 'M8': 3.6, 'M10': 6.7,
                    'M12': 9.8, 'M14': 15.2, 'M16': 20.7, 'M18': 27.1,
                    'M20': 34.0, 'M22': 45.0, 'M24': 56.1, 'M27': 78.5,
                    'M30': 108.6, 'M33': 141.8, 'M36': 180.9, 'M39': 227.1,
                    'M40': 250.1
                }
            };
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="urunTipi">${this.getText('tip_label')}</label>
                        <select id="urunTipi" onchange="window.ApplicationController.onCivataSomunTypeChange()">
                            <option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
                            <option value="civata">${this.getText('civata')}</option>
                            <option value="somun">${this.getText('somun')}</option>
                        </select>
                    </div>
                    <div class="form-group" id="altTipContainer" style="display:none;">
                        <label for="altTip" id="altTipLabel"></label>
                        <select id="altTip">
                            <option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="cap">${this.getText('cap_label')}</label>
                        <select id="cap" onchange="window.ApplicationController.onCivataDiameterChange()">
                            <option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
                            ${this.diameters.map(d => 
                                `<option value="${d}">${d}</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="form-group" id="boyContainer" style="display:none;">
                        <label for="boy">${this.getText('boy_label')}</label>
                        <select id="boy">
                            <option value="">${lang === 'tr' ? 'Önce çap seçin' : 'Select diameter first'}</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="kaplama">${this.getText('kaplama_label')}</label>
                        <select id="kaplama">
                            <option value="galvaniz">Galvaniz</option>
                            <option value="paslanmaz">Paslanmaz</option>
                            <option value="ham">Ham</option>
                            <option value="siyah">Siyah Oksit</option>
                            <option value="krom">Krom</option>
                        </select>
                    </div>
                </div>
            `;
        }

        calculate(formData) {
            const urunTipi = formData.urunTipi || '';
            const altTip = formData.altTip || '';
            const cap = formData.cap || '';
            const boy = parseFloat(formData.boy) || 0;
            const adet = parseFloat(formData.adet) || 1;
            
            if (!urunTipi || !altTip || !cap) {
                return null;
            }
            
            let birimAgirlik = 0;
            
            if (urunTipi === 'civata') {
                const weightData = this.boltWeights[altTip]?.[cap];
                if (weightData) {
                    const boyCm = boy / 10;
                    birimAgirlik = (weightData.base + (weightData.perCm * boyCm)) / 1000;
                }
            } else if (urunTipi === 'somun') {
                const weight = this.nutWeights[altTip]?.[cap];
                if (weight) {
                    birimAgirlik = weight / 1000;
                }
            }
            
            const toplamAgirlik = birimAgirlik * adet;
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                suHacmi: null
            };
        }

        validate(formData) {
            const urunTipi = formData.urunTipi || '';
            const altTip = formData.altTip || '';
            const cap = formData.cap || '';
            
            if (!urunTipi || !altTip || !cap) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            if (urunTipi === 'civata' && !formData.boy) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            return { isValid: true };
        }

        formatDimensions(formData) {
            if (formData.urunTipi === 'civata') {
                return `${formData.cap} x ${formData.boy}mm`;
            } else {
                return formData.cap;
            }
        }

        getDisplayName() {
            const altTipElement = document.getElementById('altTip');
            if (altTipElement && altTipElement.value) {
                const altTip = altTipElement.value;
                return this.getText(altTip);
            }
            return this.getText('display_name');
        }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            
            // Her zaman alt tip adını göster
            baseRow.malzemeTuru = this.getText(formData.altTip);
            
            // Dil değişimi için orijinal alt tip kodunu sakla
            baseRow.originalSubType = formData.altTip;
            
            // Detayları eksiksiz sakla
            baseRow.civataSomunDetay = {
                urunTipi: formData.urunTipi,
                altTip: formData.altTip,
                cap: formData.cap,
                boy: formData.boy || null,
                kaplama: formData.kaplama,
                malzemeCinsi: formData.malzemeCinsi
            };
            
            // Ana tip bilgisini koru
            baseRow.originalType = 'civataSomun';
            
            // Form data'yı eksiksiz sakla
            baseRow.formData = {
                ...formData,
                malzemeTuru: 'civataSomun'
            };
            
            return baseRow;
        }

        fillSpecificFields(rowData) {
            console.log('CivataSomun fillSpecificFields başladı:', rowData);
            
            // Öncelik 1: civataSomunDetay varsa kullan
            if (rowData.civataSomunDetay) {
                const detay = rowData.civataSomunDetay;
                console.log('civataSomunDetay bulundu:', detay);
                
                // Ürün tipini ayarla
                const urunTipiElement = document.getElementById('urunTipi');
                if (urunTipiElement) {
                    urunTipiElement.value = detay.urunTipi;
                    window.ApplicationController.onCivataSomunTypeChange();
                }
                
                // Diğer alanları doldur
                setTimeout(() => {
                    const altTipElement = document.getElementById('altTip');
                    if (altTipElement && detay.altTip) {
                        altTipElement.value = detay.altTip;
                    }
                    
                    const capElement = document.getElementById('cap');
                    if (capElement && detay.cap) {
                        capElement.value = detay.cap;
                    }
                    
                    if (detay.urunTipi === 'civata' && detay.boy) {
                        window.ApplicationController.onCivataDiameterChange();
                        
                        setTimeout(() => {
                            const boyElement = document.getElementById('boy');
                            if (boyElement) {
                                boyElement.value = detay.boy;
                            }
                        }, 150);
                    }
                    
                    const kaplamaElement = document.getElementById('kaplama');
                    if (kaplamaElement && detay.kaplama) {
                        kaplamaElement.value = detay.kaplama;
                    }
                    
                    // Malzeme cinsini de doldur
                    if (detay.malzemeCinsi) {
                        const malzemeCinsiElement = document.getElementById('malzemeCinsi');
                        if (malzemeCinsiElement) {
                            malzemeCinsiElement.value = detay.malzemeCinsi;
                        }
                    }
                }, 200);
                
                return;
            }
            
            // Öncelik 2: formData varsa kullan
            if (rowData.formData) {
                console.log('formData kullanılıyor:', rowData.formData);
                
                const formData = rowData.formData;
                
                if (formData.urunTipi) {
                    document.getElementById('urunTipi').value = formData.urunTipi;
                    window.ApplicationController.onCivataSomunTypeChange();
                    
                    setTimeout(() => {
                        if (formData.altTip) {
                            document.getElementById('altTip').value = formData.altTip;
                        }
                        if (formData.cap) {
                            document.getElementById('cap').value = formData.cap;
                        }
                        if (formData.urunTipi === 'civata' && formData.boy) {
                            window.ApplicationController.onCivataDiameterChange();
                            setTimeout(() => {
                                document.getElementById('boy').value = formData.boy;
                            }, 150);
                        }
                        if (formData.kaplama) {
                            document.getElementById('kaplama').value = formData.kaplama;
                        }
                    }, 200);
                }
            }
        }

        // Dil değişimi için özel metod
        updateDisplayNameForLanguage(rowData) {
            // originalSubType varsa kullan, yoksa civataSomunDetay'dan al
            const altTip = rowData.originalSubType || rowData.civataSomunDetay?.altTip;
            
            if (altTip) {
                return this.getText(altTip);
            }
            
            return this.getText('display_name');
        }
    }

    // TableManager'a dil değişimi için ek kontrol
    if (window.TableManager && window.TableManager.updateTableLanguage) {
        const originalUpdateTableLanguage = window.TableManager.updateTableLanguage;
        
        window.TableManager.updateTableLanguage = function() {
            // Önce orijinal fonksiyonu çalıştır
            originalUpdateTableLanguage.call(this);
            
            // Sonra cıvata/somun için özel güncelleme
            this.tableData.forEach(row => {
                if (row.originalType === 'civataSomun') {
                    if (window.MaterialRegistry.has('civataSomun')) {
                        const MaterialClass = window.MaterialRegistry.get('civataSomun');
                        const instance = new MaterialClass();
                        
                        // Dil değişiminde doğru adı kullan
                        row.malzemeTuru = instance.updateDisplayNameForLanguage(row);
                    }
                }
            });
            
            // Tabloyu yeniden render et
            this.renderTable();
        };
    }

    // ApplicationController'a ek fonksiyonlar
    if (!window.ApplicationController.onCivataSomunTypeChange) {
        window.ApplicationController.onCivataSomunTypeChange = function() {
            const urunTipi = document.getElementById('urunTipi').value;
            const altTipContainer = document.getElementById('altTipContainer');
            const altTipLabel = document.getElementById('altTipLabel');
            const altTipSelect = document.getElementById('altTip');
            const boyContainer = document.getElementById('boyContainer');
            
            if (!urunTipi) {
                altTipContainer.style.display = 'none';
                boyContainer.style.display = 'none';
                return;
            }
            
            const MaterialClass = window.MaterialRegistry.get('civataSomun');
            const instance = new MaterialClass();
            
            altTipContainer.style.display = 'block';
            altTipSelect.innerHTML = '<option value="">Seçiniz...</option>';
            
            if (urunTipi === 'civata') {
                altTipLabel.textContent = instance.getText('civata_tipi_label');
                boyContainer.style.display = 'block';
                
                const civataTipleri = [
                    { value: 'altikose_basli', text: instance.getText('altikose_basli') },
                    { value: 'imbus', text: instance.getText('imbus') },
                    { value: 'havsa_basli', text: instance.getText('havsa_basli') },
                    { value: 'yildiz_basli', text: instance.getText('yildiz_basli') },
                    { value: 'kare_basli', text: instance.getText('kare_basli') }
                ];
                
                civataTipleri.forEach(tip => {
                    altTipSelect.innerHTML += `<option value="${tip.value}">${tip.text}</option>`;
                });
                
            } else if (urunTipi === 'somun') {
                altTipLabel.textContent = instance.getText('somun_tipi_label');
                boyContainer.style.display = 'none';
                
                const somunTipleri = [
                    { value: 'altikose_somun', text: instance.getText('altikose_somun') },
                    { value: 'kelebek_somun', text: instance.getText('kelebek_somun') },
                    { value: 'koruklu_somun', text: instance.getText('koruklu_somun') },
                    { value: 'kontra_somun', text: instance.getText('kontra_somun') }
                ];
                
                somunTipleri.forEach(tip => {
                    altTipSelect.innerHTML += `<option value="${tip.value}">${tip.text}</option>`;
                });
            }
        };
        
        window.ApplicationController.onCivataDiameterChange = function() {
            const cap = document.getElementById('cap').value;
            const boySelect = document.getElementById('boy');
            
            if (!cap) {
                boySelect.innerHTML = '<option value="">Önce çap seçin</option>';
                return;
            }
            
            const MaterialClass = window.MaterialRegistry.get('civataSomun');
            const instance = new MaterialClass();
            const lengths = instance.lengths[cap] || [];
            
            boySelect.innerHTML = '<option value="">Boy seçin</option>';
            lengths.forEach(length => {
                boySelect.innerHTML += `<option value="${length}">${length} mm</option>`;
            });
        };
    }

    // Malzemeyi kaydet
    const civataSomunMaterial = new CivataSomunMaterial();
    civataSomunMaterial.register();
    
    console.log('Cıvata/Somun modülü v1.1.0 başarıyla yüklendi');

})(window);