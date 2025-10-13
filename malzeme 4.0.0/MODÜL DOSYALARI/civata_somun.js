/**
 * CIVATA ve SOMUN Malzeme Modülü
 * Versiyon: 2.1.0
 * M40 Çapa Kadar Genişletilmiş Versiyon
 */

(function(window) {
    'use strict';
    
    class CivataSomunMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'civataSomun';
            this.version = '2.1.0';
            
            this.texts = {
                tr: {
                    display_name: 'Cıvata / Somun',
                    tip_label: 'Ürün Tipi',
                    civata_tipi_label: 'Cıvata Tipi',
                    somun_tipi_label: 'Somun Tipi',
                    cap_label: 'Çap',
                    boy_label: 'Boy (mm)',
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
                    kaplama_label: 'Coating',
                    validation_error: 'All fields must be filled',
                    
                    // Bolt types
                    altikose_basli: 'Hex Head Bolt',
                    imbus: 'Socket Head Cap Screw',
                    havsa_basli: 'Countersunk Head Bolt',
                    yildiz_basli: 'Torx Head Bolt',
                    kare_basli: 'Square Head Bolt',
                    
                    // Nut types
                    altikose_somun: 'Hex Nut',
                    kelebek_somun: 'Wing Nut',
                    koruklu_somun: 'Nylon Insert Lock Nut',
                    kontra_somun: 'Lock Nut',
                    
                    // Product types
                    civata: 'Bolt',
                    somun: 'Nut'
                }
            };
            
            this.grades = ['8.8', '10.9', '12.9', 'A2-70', 'A4-80'];
            
            this.densities = {
                '8.8': 7850,
                '10.9': 7850,
                '12.9': 7850,
                'A2-70': 7900,
                'A4-80': 7900
            };
            
            this.standards = {
                '8.8': 'DIN 933 / ISO 4017',
                '10.9': 'DIN 933 / ISO 4017',
                '12.9': 'DIN 933 / ISO 4017',
                'A2-70': 'DIN 933 / ISO 4017',
                'A4-80': 'DIN 933 / ISO 4017'
            };
            
            this.diameters = [
                'M5', 'M6', 'M8', 'M10', 'M12', 'M14', 'M16', 'M18', 
                'M20', 'M22', 'M24', 'M27', 'M30', 'M33', 'M36', 'M39', 'M40'
            ];
            
            this.lengths = {
                'M5': [10, 12, 16, 20, 25, 30, 35, 40, 45, 50],
                'M6': [10, 12, 16, 20, 25, 30, 35, 40, 45, 50, 55, 60],
                'M8': [16, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 80],
                'M10': [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 80, 90, 100],
                'M12': [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 80, 90, 100, 120],
                'M14': [30, 35, 40, 45, 50, 55, 60, 65, 70, 80, 90, 100, 120, 140],
                'M16': [35, 40, 45, 50, 55, 60, 65, 70, 80, 90, 100, 120, 140, 160],
                'M18': [40, 45, 50, 55, 60, 65, 70, 80, 90, 100, 120, 140, 160, 180],
                'M20': [45, 50, 55, 60, 65, 70, 80, 90, 100, 120, 140, 160, 180, 200],
                'M22': [50, 55, 60, 65, 70, 80, 90, 100, 120, 140, 160, 180, 200, 220],
                'M24': [55, 60, 65, 70, 80, 90, 100, 120, 140, 160, 180, 200, 220, 240],
                'M27': [60, 65, 70, 80, 90, 100, 120, 140, 160, 180, 200, 220, 250, 280],
                'M30': [70, 80, 90, 100, 120, 140, 160, 180, 200, 220, 250, 280, 300],
                'M33': [80, 90, 100, 120, 140, 160, 180, 200, 220, 250, 280, 300, 320],
                'M36': [90, 100, 120, 140, 160, 180, 200, 220, 250, 280, 300, 320, 350],
                'M39': [100, 120, 140, 160, 180, 200, 220, 250, 280, 300, 320, 350, 380],
                'M40': [100, 120, 140, 160, 180, 200, 220, 250, 280, 300, 320, 350, 380, 400]
            };
            
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
            
            this.setupEventHandlers();
        }

        setupEventHandlers() {
            const self = this;
            
            window.CivataSomunHandlers = {
                onTypeChange: function() {
                    const urunTipi = document.getElementById('cs_urunTipi').value;
                    const altTipContainer = document.getElementById('cs_altTipContainer');
                    const altTipLabel = document.getElementById('cs_altTipLabel');
                    const altTipSelect = document.getElementById('cs_altTip');
                    const boyContainer = document.getElementById('cs_boyContainer');
                    
                    if (!urunTipi) {
                        altTipContainer.style.display = 'none';
                        boyContainer.style.display = 'none';
                        return;
                    }
                    
                    altTipContainer.style.display = 'block';
                    altTipSelect.innerHTML = `<option value="">${self.getCurrentLanguage() === 'tr' ? 'Seçiniz...' : 'Select...'}</option>`;
                    
                    if (urunTipi === 'civata') {
                        altTipLabel.textContent = self.getText('civata_tipi_label');
                        boyContainer.style.display = 'block';
                        
                        const civataTipleri = ['altikose_basli', 'imbus', 'havsa_basli', 'yildiz_basli', 'kare_basli'];
                        civataTipleri.forEach(tip => {
                            altTipSelect.innerHTML += `<option value="${tip}">${self.getText(tip)}</option>`;
                        });
                        
                    } else if (urunTipi === 'somun') {
                        altTipLabel.textContent = self.getText('somun_tipi_label');
                        boyContainer.style.display = 'none';
                        
                        const somunTipleri = ['altikose_somun', 'kelebek_somun', 'koruklu_somun', 'kontra_somun'];
                        somunTipleri.forEach(tip => {
                            altTipSelect.innerHTML += `<option value="${tip}">${self.getText(tip)}</option>`;
                        });
                    }
                },
                
                onDiameterChange: function() {
                    const cap = document.getElementById('cs_cap').value;
                    const boySelect = document.getElementById('cs_boy');
                    const urunTipi = document.getElementById('cs_urunTipi').value;
                    
                    if (!cap || urunTipi !== 'civata') {
                        boySelect.innerHTML = `<option value="">${self.getCurrentLanguage() === 'tr' ? 'Önce çap seçin' : 'Select diameter first'}</option>`;
                        return;
                    }
                    
                    const lengths = self.lengths[cap] || [];
                    boySelect.innerHTML = `<option value="">${self.getCurrentLanguage() === 'tr' ? 'Boy seçin' : 'Select length'}</option>`;
                    lengths.forEach(length => {
                        boySelect.innerHTML += `<option value="${length}">${length} mm</option>`;
                    });
                }
            };
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="cs_urunTipi">${this.getText('tip_label')}</label>
                        <select id="cs_urunTipi" onchange="window.CivataSomunHandlers.onTypeChange()">
                            <option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
                            <option value="civata">${this.getText('civata')}</option>
                            <option value="somun">${this.getText('somun')}</option>
                        </select>
                    </div>
                    <div class="form-group" id="cs_altTipContainer" style="display:none;">
                        <label for="cs_altTip" id="cs_altTipLabel"></label>
                        <select id="cs_altTip">
                            <option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="cs_cap">${this.getText('cap_label')}</label>
                        <select id="cs_cap" onchange="window.CivataSomunHandlers.onDiameterChange()">
                            <option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
                            ${this.diameters.map(d => `<option value="${d}">${d}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group" id="cs_boyContainer" style="display:none;">
                        <label for="cs_boy">${this.getText('boy_label')}</label>
                        <select id="cs_boy">
                            <option value="">${lang === 'tr' ? 'Önce çap seçin' : 'Select diameter first'}</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="cs_kaplama">${this.getText('kaplama_label')}</label>
                        <select id="cs_kaplama">
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
            const urunTipi = formData.cs_urunTipi || '';
            const altTip = formData.cs_altTip || '';
            const cap = formData.cs_cap || '';
            const boy = parseFloat(formData.cs_boy) || 0;
            const adet = parseFloat(formData.adet) || 1;
            
            if (!urunTipi || !altTip || !cap) {
                return null;
            }
            
            let birimAgirlik = 0;
            
            if (urunTipi === 'civata' && boy > 0) {
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
            const urunTipi = formData.cs_urunTipi || '';
            const altTip = formData.cs_altTip || '';
            const cap = formData.cs_cap || '';
            
            if (!urunTipi || !altTip || !cap) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            if (urunTipi === 'civata' && !formData.cs_boy) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            return { isValid: true };
        }

        formatDimensions(formData) {
            if (formData.cs_urunTipi === 'civata') {
                return `${formData.cs_cap} x ${formData.cs_boy}mm`;
            } else {
                return formData.cs_cap;
            }
        }

        getDisplayName() {
            return this.getText('display_name');
        }

        getSubTypeName(altTip) {
            return this.getText(altTip);
        }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            
            const altTip = formData.cs_altTip;
            if (altTip) {
                baseRow.malzemeTuru = this.getSubTypeName(altTip);
            }
            
            baseRow.metadata = {
                ...baseRow.metadata,
                civataSomun: {
                    urunTipi: formData.cs_urunTipi,
                    altTip: altTip,
                    altTipKodu: altTip,
                    cap: formData.cs_cap,
                    boy: formData.cs_boy || null,
                    kaplama: formData.cs_kaplama
                }
            };
            
            return baseRow;
        }

        fillFormFromRow(rowData) {
            super.fillFormFromRow(rowData);
            
            const metadata = rowData.metadata?.civataSomun;
            if (!metadata) {
                if (rowData.formData) {
                    this.fillFromFormData(rowData.formData);
                }
                return true;
            }
            
            setTimeout(() => {
                const urunTipiElement = document.getElementById('cs_urunTipi');
                if (urunTipiElement && metadata.urunTipi) {
                    urunTipiElement.value = metadata.urunTipi;
                    window.CivataSomunHandlers.onTypeChange();
                }
                
                setTimeout(() => {
                    const altTipElement = document.getElementById('cs_altTip');
                    if (altTipElement && metadata.altTipKodu) {
                        altTipElement.value = metadata.altTipKodu;
                    }
                    
                    const capElement = document.getElementById('cs_cap');
                    if (capElement && metadata.cap) {
                        capElement.value = metadata.cap;
                        window.CivataSomunHandlers.onDiameterChange();
                    }
                    
                    if (metadata.urunTipi === 'civata' && metadata.boy) {
                        setTimeout(() => {
                            const boyElement = document.getElementById('cs_boy');
                            if (boyElement) {
                                boyElement.value = metadata.boy;
                            }
                        }, 100);
                    }
                    
                    const kaplamaElement = document.getElementById('cs_kaplama');
                    if (kaplamaElement && metadata.kaplama) {
                        kaplamaElement.value = metadata.kaplama;
                    }
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
                        
                        if (key === 'cs_urunTipi') {
                            window.CivataSomunHandlers.onTypeChange();
                        } else if (key === 'cs_cap') {
                            setTimeout(() => {
                                window.CivataSomunHandlers.onDiameterChange();
                            }, 50);
                        }
                    }
                });
            }, 100);
        }
    }

    const civataSomunMaterial = new CivataSomunMaterial();
    civataSomunMaterial.register();
    
    console.log('Cıvata/Somun modülü v2.1.0 yüklendi (M40 çapa kadar)');

})(window);