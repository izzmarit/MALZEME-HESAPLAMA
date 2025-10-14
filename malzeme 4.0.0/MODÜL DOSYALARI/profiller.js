/**
 * PROFİLLER Malzeme Modülü
 * Versiyon: 1.0.0
 * NPU, NPI, HEB, HEA, IPE profil hesaplama modülü - EN standartları ile
 */

(function(window) {
    'use strict';
    
    class ProfillerMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'profiller';
            this.version = '1.0.0';
            
            this.texts = {
                tr: {
                    display_name: 'Profiller',
                    profil_tipi_label: 'Profil Tipi',
                    ebat_label: 'Ebat',
                    boy_label: 'Boy (mm)',
                    validation_error: 'Lütfen tüm alanları doldurun',
                    validation_min_error: 'Boy değeri 0\'dan büyük olmalıdır',
                    
                    // Profil tipleri
                    npu: 'NPU Profil',
                    npi: 'NPI Profil',
                    hea: 'HEA Profil',
                    heb: 'HEB Profil',
                    ipe: 'IPE Profil'
                },
                en: {
                    display_name: 'Profiles',
                    profil_tipi_label: 'Profile Type',
                    ebat_label: 'Size',
                    boy_label: 'Length (mm)',
                    validation_error: 'Please fill all fields',
                    validation_min_error: 'Length must be greater than 0',
                    
                    // Profile types
                    npu: 'NPU Profile',
                    npi: 'NPI Profile',
                    hea: 'HEA Profile',
                    heb: 'HEB Profile',
                    ipe: 'IPE Profile'
                }
            };
            
            // Profil ağırlıkları (kg/m cinsinden)
            this.profilWeights = {
                'npu': {
                    'NPU80': 8.64,
                    'NPU100': 10.6,
                    'NPU120': 13.4,
                    'NPU140': 16.0,
                    'NPU160': 18.8,
                    'NPU180': 22.0,
                    'NPU200': 25.3,
                    'NPU220': 29.4,
                    'NPU240': 33.2,
                    'NPU260': 37.9,
                    'NPU280': 41.8,
                    'NPU300': 46.2,
                    'NPU320': 59.5,
                    'NPU350': 71.8,
                    'NPU380': 84.0,
                    'NPU400': 92.4
                },
                'npi': {
                    'NPI80': 7.58,
                    'NPI100': 10.3,
                    'NPI120': 13.0,
                    'NPI140': 16.4,
                    'NPI160': 20.1,
                    'NPI180': 23.9,
                    'NPI200': 28.2,
                    'NPI220': 33.4,
                    'NPI240': 39.1,
                    'NPI260': 45.5,
                    'NPI280': 52.2,
                    'NPI300': 59.5,
                    'NPI320': 69.0,
                    'NPI340': 78.1,
                    'NPI360': 88.6,
                    'NPI380': 98.8,
                    'NPI400': 110,
                    'NPI450': 134,
                    'NPI500': 161,
                    'NPI550': 188,
                    'NPI600': 218
                },
                'hea': {
                    'HEA100': 16.7,
                    'HEA120': 19.9,
                    'HEA140': 24.7,
                    'HEA160': 30.4,
                    'HEA180': 35.5,
                    'HEA200': 42.3,
                    'HEA220': 50.5,
                    'HEA240': 60.3,
                    'HEA260': 68.2,
                    'HEA280': 76.4,
                    'HEA300': 88.3,
                    'HEA320': 97.6,
                    'HEA340': 105,
                    'HEA360': 112,
                    'HEA400': 125,
                    'HEA450': 140,
                    'HEA500': 155,
                    'HEA550': 166,
                    'HEA600': 178,
                    'HEA650': 190,
                    'HEA700': 204,
                    'HEA800': 224,
                    'HEA900': 252,
                    'HEA1000': 272
                },
                'heb': {
                    'HEB100': 20.4,
                    'HEB120': 26.7,
                    'HEB140': 33.7,
                    'HEB160': 42.6,
                    'HEB180': 51.2,
                    'HEB200': 61.3,
                    'HEB220': 71.5,
                    'HEB240': 83.2,
                    'HEB260': 93.0,
                    'HEB280': 103,
                    'HEB300': 117,
                    'HEB320': 127,
                    'HEB340': 134,
                    'HEB360': 142,
                    'HEB400': 155,
                    'HEB450': 171,
                    'HEB500': 187,
                    'HEB550': 199,
                    'HEB600': 212,
                    'HEB650': 225,
                    'HEB700': 241,
                    'HEB800': 262,
                    'HEB900': 291,
                    'HEB1000': 314
                },
                'ipe': {
                    'IPE80': 6.0,
                    'IPE100': 8.1,
                    'IPE120': 10.4,
                    'IPE140': 12.9,
                    'IPE160': 15.8,
                    'IPE180': 18.8,
                    'IPE200': 22.4,
                    'IPE220': 26.2,
                    'IPE240': 30.7,
                    'IPE270': 36.1,
                    'IPE300': 42.2,
                    'IPE330': 49.1,
                    'IPE360': 57.1,
                    'IPE400': 66.3,
                    'IPE450': 77.6,
                    'IPE500': 90.7,
                    'IPE550': 106,
                    'IPE600': 122,
                    'IPEA80': 6.7,
                    'IPEA100': 8.7,
                    'IPEA120': 11.3,
                    'IPEA140': 14.3,
                    'IPEA160': 17.8,
                    'IPEA180': 21.5,
                    'IPEA200': 25.3,
                    'IPEA220': 29.4,
                    'IPEA240': 33.9,
                    'IPEA270': 40.2,
                    'IPEA300': 47.3,
                    'IPEA330': 55.3,
                    'IPEA360': 64.1,
                    'IPEA400': 74.5,
                    'IPEA450': 87.5,
                    'IPEA500': 102,
                    'IPEA550': 119,
                    'IPEA600': 137
                }
            };
            
            this.standards = {
                'npu': 'DIN 1026-1 / EN 10279',
                'npi': 'DIN 1025-1 / EN 10024',
                'hea': 'DIN 1025-3 / EN 10025',
                'heb': 'DIN 1025-2 / EN 10025',
                'ipe': 'DIN 1025-5 / EN 10025'
            };
            
            // Çelik yoğunluğu (tüm profiller için standart)
            this.density = 7850; // kg/m³
            
            this.setupEventHandlers();
        }

        setupEventHandlers() {
            const self = this;
            
            window.ProfillerHandlers = {
                onProfilTipiChange: function() {
                    const profilTipi = document.getElementById('prf_profil_tipi').value;
                    const ebatContainer = document.getElementById('prf_ebatContainer');
                    const ebatSelect = document.getElementById('prf_ebat');
                    
                    if (!profilTipi) {
                        ebatContainer.style.display = 'none';
                        return;
                    }
                    
                    ebatContainer.style.display = 'block';
                    ebatSelect.innerHTML = `<option value="">${self.getCurrentLanguage() === 'tr' ? 'Ebat seçin...' : 'Select size...'}</option>`;
                    
                    const weights = self.profilWeights[profilTipi];
                    if (weights) {
                        Object.keys(weights).forEach(ebat => {
                            const option = document.createElement('option');
                            option.value = ebat;
                            option.textContent = ebat;
                            ebatSelect.appendChild(option);
                        });
                    }
                }
            };
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="prf_profil_tipi">${this.getText('profil_tipi_label')}</label>
                        <select id="prf_profil_tipi" onchange="window.ProfillerHandlers.onProfilTipiChange()">
                            <option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
                            <option value="npu">${this.getText('npu')}</option>
                            <option value="npi">${this.getText('npi')}</option>
                            <option value="hea">${this.getText('hea')}</option>
                            <option value="heb">${this.getText('heb')}</option>
                            <option value="ipe">${this.getText('ipe')}</option>
                        </select>
                    </div>
                    <div class="form-group" id="prf_ebatContainer" style="display:none;">
                        <label for="prf_ebat">${this.getText('ebat_label')}</label>
                        <select id="prf_ebat">
                            <option value="">${lang === 'tr' ? 'Önce profil tipi seçin' : 'Select profile type first'}</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="prf_boy">${this.getText('boy_label')}</label>
                        <input type="number" id="prf_boy" min="0.1" step="0.1" placeholder="${lang === 'tr' ? 'Boy değeri' : 'Length value'}">
                    </div>
                </div>
            `;
        }

        getGrades() {
            // Profiller için malzeme cinsi çelik olarak sabit
            return ['S235JR', 'S275JR', 'S355JR'];
        }

        getDensity(grade) {
            return this.density;
        }

        getStandard(grade) {
            // Malzeme cinsi yerine profil tipine göre standart dönecek
            // Bu bilgi formatRow'da override edilecek
            return 'EN 10025';
        }

        calculate(formData) {
            const profilTipi = formData.prf_profil_tipi;
            const ebat = formData.prf_ebat;
            const boy = parseFloat(formData.prf_boy) || 0;
            const adet = parseFloat(formData.adet) || 1;
            
            if (!profilTipi || !ebat || boy <= 0) {
                return null;
            }
            
            // Profil ağırlığını al (kg/m)
            const metreAgirlik = this.profilWeights[profilTipi]?.[ebat];
            if (!metreAgirlik) {
                return null;
            }
            
            // Boy metre cinsine çevir
            const boyM = boy / 1000;
            
            // Birim ağırlık hesapla
            const birimAgirlik = metreAgirlik * boyM;
            const toplamAgirlik = birimAgirlik * adet;
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                suHacmi: null
            };
        }

        validate(formData) {
            const profilTipi = formData.prf_profil_tipi;
            const ebat = formData.prf_ebat;
            const boy = formData.prf_boy;
            
            // Undefined, null veya boş string kontrolü
            if (profilTipi === undefined || profilTipi === null || profilTipi === '') {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            if (ebat === undefined || ebat === null || ebat === '') {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            if (boy === undefined || boy === null || boy === '') {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            // Sayısal değer kontrolü
            const boyNum = parseFloat(boy);
            
            if (isNaN(boyNum)) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            // Pozitif değer kontrolü
            if (boyNum <= 0) {
                return {
                    isValid: false,
                    message: this.getText('validation_min_error')
                };
            }
            
            return { isValid: true };
        }
        
        formatDimensions(formData) {
            const ebat = formData.prf_ebat || '';
            const boy = parseFloat(formData.prf_boy) || 0;
            
            const boyStr = boy % 1 === 0 ? boy.toString() : boy.toFixed(1);
            
            // Ebattan sadece sayı kısmını al (örn: NPU100 -> 100)
            const ebatNumara = ebat.replace(/[A-Z]/g, '');
            
            return `${ebat.replace(ebatNumara, ' ' + ebatNumara)} x ${boyStr}mm`;
        }

        getDisplayName() {
            return this.getText('display_name');
        }

        getProfilTipName(profilTipi) {
            return this.getText(profilTipi);
        }

        getDisplayTypeFromRow(rowData) {
            // Profiller için özel dil değişikliği yönetimi
            const metadata = rowData.metadata?.profiller;
            if (metadata && metadata.profil_tipi) {
                return this.getProfilTipName(metadata.profil_tipi);
            }
            // Fallback
            return this.getDisplayName();
        }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            
            const profilTipi = formData.prf_profil_tipi;
            
            // Malzeme türünü profil tipine göre ayarla
            if (profilTipi) {
                baseRow.malzemeTuru = this.getProfilTipName(profilTipi);
            }
            
            // Standart bilgisini profil tipine göre ayarla
            if (profilTipi && this.standards[profilTipi]) {
                baseRow.enNormu = this.standards[profilTipi];
            }
            
            // Metadata'yı genişlet
            baseRow.metadata = {
                ...baseRow.metadata,
                profiller: {
                    profil_tipi: formData.prf_profil_tipi,
                    ebat: formData.prf_ebat,
                    boy: formData.prf_boy,
                    metre_agirlik: this.profilWeights[formData.prf_profil_tipi]?.[formData.prf_ebat]
                }
            };
            
            return baseRow;
        }

        fillFormFromRow(rowData) {
            super.fillFormFromRow(rowData);
            
            const metadata = rowData.metadata?.profiller;
            if (!metadata) {
                if (rowData.formData) {
                    this.fillFromFormData(rowData.formData);
                }
                return true;
            }
            
            setTimeout(() => {
                const profilTipiElement = document.getElementById('prf_profil_tipi');
                if (profilTipiElement && metadata.profil_tipi) {
                    profilTipiElement.value = metadata.profil_tipi;
                    window.ProfillerHandlers.onProfilTipiChange();
                }
                
                setTimeout(() => {
                    const ebatElement = document.getElementById('prf_ebat');
                    if (ebatElement && metadata.ebat) {
                        ebatElement.value = metadata.ebat;
                    }
                    
                    const boyElement = document.getElementById('prf_boy');
                    if (boyElement && metadata.boy) {
                        boyElement.value = metadata.boy;
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
                        
                        if (key === 'prf_profil_tipi') {
                            window.ProfillerHandlers.onProfilTipiChange();
                        }
                    }
                });
            }, 100);
        }
    }

    const profillerMaterial = new ProfillerMaterial();
    profillerMaterial.register();
    
    console.log('Profiller modülü v1.0.0 yüklendi (NPU, NPI, HEB, HEA, IPE)');

})(window);