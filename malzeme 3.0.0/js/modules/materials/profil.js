/**
 * PROFİL Malzeme Modülü
 * IPE, HEA, HEB, NPU, NPI profilleri
 */

(function(window) {
    'use strict';
    
    class ProfilMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'profil';
            
            // Dil metinleri
            this.texts = {
                tr: {
                    display_name: 'Profil',
                    profil_tipi_label: 'Profil Tipi',
                    profil_boyut_label: 'Profil Boyutu',
                    uzunluk_label: 'Uzunluk (mm)',
                    uzunluk_placeholder: 'Uzunluk değeri',
                    validation_error: 'Profil tipi, boyutu ve uzunluk seçilmelidir',
                    teorik_agirlik_info: 'Teorik Ağırlık',
                    kesit_alan_info: 'Kesit Alanı',
                    select_type_first: 'Önce profil tipi seçin',
                    select_profile: 'Profil seçin'
                },
                en: {
                    display_name: 'Profile',
                    profil_tipi_label: 'Profile Type',
                    profil_boyut_label: 'Profile Size',
                    uzunluk_label: 'Length (mm)',
                    uzunluk_placeholder: 'Length value',
                    validation_error: 'Profile type, size and length must be selected',
                    teorik_agirlik_info: 'Theoretical Weight',
                    kesit_alan_info: 'Cross Section Area',
                    select_type_first: 'Select profile type first',
                    select_profile: 'Select profile'
                }
            };
            
            // Malzeme cinsleri
            this.grades = [
                'S235JR', 'S275JR', 'S355JR',
                'S235J0', 'S275J0', 'S355J0', 
                'S235J2', 'S275J2', 'S355J2',
                'S355K2', 'S420N', 'S420NL', 'S460N', 'S460NL'
            ];
            
            // Yoğunluklar (kg/m³)
            this.densities = {
                'S235JR': 7850, 'S275JR': 7850, 'S355JR': 7850,
                'S235J0': 7850, 'S275J0': 7850, 'S355J0': 7850,
                'S235J2': 7850, 'S275J2': 7850, 'S355J2': 7850,
                'S355K2': 7850, 'S420N': 7850, 'S420NL': 7850,
                'S460N': 7850, 'S460NL': 7850
            };
            
            // Standartlar
            this.standards = {
                'S235JR': 'EN 10025-2', 'S275JR': 'EN 10025-2', 'S355JR': 'EN 10025-2',
                'S235J0': 'EN 10025-2', 'S275J0': 'EN 10025-2', 'S355J0': 'EN 10025-2',
                'S235J2': 'EN 10025-2', 'S275J2': 'EN 10025-2', 'S355J2': 'EN 10025-2',
                'S355K2': 'EN 10025-2', 'S420N': 'EN 10025-3', 'S420NL': 'EN 10025-3',
                'S460N': 'EN 10025-3', 'S460NL': 'EN 10025-3'
            };
            
            // Profil tipleri
            this.profileTypes = {
                'IPE': 'EN 10365',
                'HEA': 'EN 10365',
                'HEB': 'EN 10365',
                'NPU': 'DIN 1026-1',
                'NPI': 'DIN 1025-1'
            };
            
            // IPE Profil Ölçüleri (h: yükseklik, b: genişlik, tw: gövde kalınlığı, tf: başlık kalınlığı, kg/m: birim ağırlık)
            this.ipeProfiles = {
                'IPE 80': { h: 80, b: 46, tw: 3.8, tf: 5.2, weight: 6.0, area: 7.64 },
                'IPE 100': { h: 100, b: 55, tw: 4.1, tf: 5.7, weight: 8.1, area: 10.3 },
                'IPE 120': { h: 120, b: 64, tw: 4.4, tf: 6.3, weight: 10.4, area: 13.2 },
                'IPE 140': { h: 140, b: 73, tw: 4.7, tf: 6.9, weight: 12.9, area: 16.4 },
                'IPE 160': { h: 160, b: 82, tw: 5.0, tf: 7.4, weight: 15.8, area: 20.1 },
                'IPE 180': { h: 180, b: 91, tw: 5.3, tf: 8.0, weight: 18.8, area: 23.9 },
                'IPE 200': { h: 200, b: 100, tw: 5.6, tf: 8.5, weight: 22.4, area: 28.5 },
                'IPE 220': { h: 220, b: 110, tw: 5.9, tf: 9.2, weight: 26.2, area: 33.4 },
                'IPE 240': { h: 240, b: 120, tw: 6.2, tf: 9.8, weight: 30.7, area: 39.1 },
                'IPE 270': { h: 270, b: 135, tw: 6.6, tf: 10.2, weight: 36.1, area: 45.9 },
                'IPE 300': { h: 300, b: 150, tw: 7.1, tf: 10.7, weight: 42.2, area: 53.8 },
                'IPE 330': { h: 330, b: 160, tw: 7.5, tf: 11.5, weight: 49.1, area: 62.6 },
                'IPE 360': { h: 360, b: 170, tw: 8.0, tf: 12.7, weight: 57.1, area: 72.7 },
                'IPE 400': { h: 400, b: 180, tw: 8.6, tf: 13.5, weight: 66.3, area: 84.5 },
                'IPE 450': { h: 450, b: 190, tw: 9.4, tf: 14.6, weight: 77.6, area: 98.8 },
                'IPE 500': { h: 500, b: 200, tw: 10.2, tf: 16.0, weight: 90.7, area: 116 },
                'IPE 550': { h: 550, b: 210, tw: 11.1, tf: 17.2, weight: 106, area: 134 },
                'IPE 600': { h: 600, b: 220, tw: 12.0, tf: 19.0, weight: 122, area: 156 }
            };
            
            // HEA Profil Ölçüleri (Hafif Geniş Başlıklı)
            this.heaProfiles = {
                'HEA 100': { h: 96, b: 100, tw: 5.0, tf: 8.0, weight: 16.7, area: 21.2 },
                'HEA 120': { h: 114, b: 120, tw: 5.0, tf: 8.0, weight: 19.9, area: 25.3 },
                'HEA 140': { h: 133, b: 140, tw: 5.5, tf: 8.5, weight: 24.7, area: 31.4 },
                'HEA 160': { h: 152, b: 160, tw: 6.0, tf: 9.0, weight: 30.4, area: 38.8 },
                'HEA 180': { h: 171, b: 180, tw: 6.0, tf: 9.5, weight: 35.5, area: 45.3 },
                'HEA 200': { h: 190, b: 200, tw: 6.5, tf: 10.0, weight: 42.3, area: 53.8 },
                'HEA 220': { h: 210, b: 220, tw: 7.0, tf: 11.0, weight: 50.5, area: 64.3 },
                'HEA 240': { h: 230, b: 240, tw: 7.5, tf: 12.0, weight: 60.3, area: 76.8 },
                'HEA 260': { h: 250, b: 260, tw: 7.5, tf: 12.5, weight: 68.2, area: 86.8 },
                'HEA 280': { h: 270, b: 280, tw: 8.0, tf: 13.0, weight: 76.4, area: 97.3 },
                'HEA 300': { h: 290, b: 300, tw: 8.5, tf: 14.0, weight: 88.3, area: 113 },
                'HEA 320': { h: 310, b: 300, tw: 9.0, tf: 15.5, weight: 97.6, area: 124 },
                'HEA 340': { h: 330, b: 300, tw: 9.5, tf: 16.5, weight: 105, area: 133 },
                'HEA 360': { h: 350, b: 300, tw: 10.0, tf: 17.5, weight: 112, area: 143 },
                'HEA 400': { h: 390, b: 300, tw: 11.0, tf: 19.0, weight: 125, area: 159 },
                'HEA 450': { h: 440, b: 300, tw: 11.5, tf: 21.0, weight: 140, area: 178 },
                'HEA 500': { h: 490, b: 300, tw: 12.0, tf: 23.0, weight: 155, area: 198 },
                'HEA 550': { h: 540, b: 300, tw: 12.5, tf: 24.0, weight: 166, area: 212 },
                'HEA 600': { h: 590, b: 300, tw: 13.0, tf: 25.0, weight: 178, area: 226 },
                'HEA 650': { h: 640, b: 300, tw: 13.5, tf: 26.0, weight: 190, area: 242 },
                'HEA 700': { h: 690, b: 300, tw: 14.5, tf: 27.0, weight: 204, area: 260 },
                'HEA 800': { h: 790, b: 300, tw: 15.0, tf: 28.0, weight: 224, area: 286 },
                'HEA 900': { h: 890, b: 300, tw: 16.0, tf: 30.0, weight: 252, area: 321 },
                'HEA 1000': { h: 990, b: 300, tw: 16.5, tf: 31.0, weight: 272, area: 347 }
            };
            
            // HEB Profil Ölçüleri (Normal Geniş Başlıklı)
            this.hebProfiles = {
                'HEB 100': { h: 100, b: 100, tw: 6.0, tf: 10.0, weight: 20.4, area: 26.0 },
                'HEB 120': { h: 120, b: 120, tw: 6.5, tf: 11.0, weight: 26.7, area: 34.0 },
                'HEB 140': { h: 140, b: 140, tw: 7.0, tf: 12.0, weight: 33.7, area: 43.0 },
                'HEB 160': { h: 160, b: 160, tw: 8.0, tf: 13.0, weight: 42.6, area: 54.3 },
                'HEB 180': { h: 180, b: 180, tw: 8.5, tf: 14.0, weight: 51.2, area: 65.3 },
                'HEB 200': { h: 200, b: 200, tw: 9.0, tf: 15.0, weight: 61.3, area: 78.1 },
                'HEB 220': { h: 220, b: 220, tw: 9.5, tf: 16.0, weight: 71.5, area: 91.0 },
                'HEB 240': { h: 240, b: 240, tw: 10.0, tf: 17.0, weight: 83.2, area: 106 },
                'HEB 260': { h: 260, b: 260, tw: 10.0, tf: 17.5, weight: 93.0, area: 118 },
                'HEB 280': { h: 280, b: 280, tw: 10.5, tf: 18.0, weight: 103, area: 131 },
                'HEB 300': { h: 300, b: 300, tw: 11.0, tf: 19.0, weight: 117, area: 149 },
                'HEB 320': { h: 320, b: 300, tw: 11.5, tf: 20.5, weight: 127, area: 161 },
                'HEB 340': { h: 340, b: 300, tw: 12.0, tf: 21.5, weight: 134, area: 171 },
                'HEB 360': { h: 360, b: 300, tw: 12.5, tf: 22.5, weight: 142, area: 181 },
                'HEB 400': { h: 400, b: 300, tw: 13.5, tf: 24.0, weight: 155, area: 198 },
                'HEB 450': { h: 450, b: 300, tw: 14.0, tf: 26.0, weight: 171, area: 218 },
                'HEB 500': { h: 500, b: 300, tw: 14.5, tf: 28.0, weight: 187, area: 239 },
                'HEB 550': { h: 550, b: 300, tw: 15.0, tf: 29.0, weight: 199, area: 254 },
                'HEB 600': { h: 600, b: 300, tw: 15.5, tf: 30.0, weight: 212, area: 270 },
                'HEB 650': { h: 650, b: 300, tw: 16.0, tf: 31.0, weight: 225, area: 286 },
                'HEB 700': { h: 700, b: 300, tw: 17.0, tf: 32.0, weight: 241, area: 306 },
                'HEB 800': { h: 800, b: 300, tw: 17.5, tf: 33.0, weight: 262, area: 334 },
                'HEB 900': { h: 900, b: 300, tw: 18.5, tf: 35.0, weight: 291, area: 371 },
                'HEB 1000': { h: 1000, b: 300, tw: 19.0, tf: 36.0, weight: 314, area: 400 }
            };
            
            // NPU (UPN) Profil Ölçüleri
            this.npuProfiles = {
                'NPU 50': { h: 50, b: 38, tw: 5.0, tf: 7.0, weight: 5.59, area: 7.12 },
                'NPU 65': { h: 65, b: 42, tw: 5.5, tf: 7.5, weight: 7.09, area: 9.03 },
                'NPU 80': { h: 80, b: 45, tw: 6.0, tf: 8.0, weight: 8.64, area: 11.0 },
                'NPU 100': { h: 100, b: 50, tw: 6.0, tf: 8.5, weight: 10.6, area: 13.5 },
                'NPU 120': { h: 120, b: 55, tw: 7.0, tf: 9.0, weight: 13.4, area: 17.0 },
                'NPU 140': { h: 140, b: 60, tw: 7.0, tf: 10.0, weight: 16.0, area: 20.4 },
                'NPU 160': { h: 160, b: 65, tw: 7.5, tf: 10.5, weight: 18.8, area: 24.0 },
                'NPU 180': { h: 180, b: 70, tw: 8.0, tf: 11.0, weight: 22.0, area: 28.0 },
                'NPU 200': { h: 200, b: 75, tw: 8.5, tf: 11.5, weight: 25.3, area: 32.2 },
                'NPU 220': { h: 220, b: 80, tw: 9.0, tf: 12.5, weight: 29.4, area: 37.4 },
                'NPU 240': { h: 240, b: 85, tw: 9.5, tf: 13.0, weight: 33.2, area: 42.3 },
                'NPU 260': { h: 260, b: 90, tw: 10.0, tf: 14.0, weight: 37.9, area: 48.3 },
                'NPU 280': { h: 280, b: 95, tw: 10.0, tf: 15.0, weight: 41.8, area: 53.3 },
                'NPU 300': { h: 300, b: 100, tw: 10.0, tf: 16.0, weight: 46.2, area: 58.8 },
                'NPU 320': { h: 320, b: 100, tw: 14.0, tf: 17.5, weight: 59.5, area: 75.8 },
                'NPU 350': { h: 350, b: 100, tw: 14.0, tf: 16.0, weight: 60.6, area: 77.3 },
                'NPU 380': { h: 380, b: 102, tw: 13.5, tf: 16.0, weight: 63.1, area: 80.4 },
                'NPU 400': { h: 400, b: 110, tw: 14.0, tf: 18.0, weight: 71.8, area: 91.5 }
            };
            
            // NPI (INP) Profil Ölçüleri
            this.npiProfiles = {
                'NPI 80': { h: 80, b: 42, tw: 3.9, tf: 5.9, weight: 5.94, area: 7.57 },
                'NPI 100': { h: 100, b: 50, tw: 4.5, tf: 6.8, weight: 8.34, area: 10.6 },
                'NPI 120': { h: 120, b: 58, tw: 5.1, tf: 7.7, weight: 11.1, area: 14.2 },
                'NPI 140': { h: 140, b: 66, tw: 5.7, tf: 8.6, weight: 14.3, area: 18.2 },
                'NPI 160': { h: 160, b: 74, tw: 6.3, tf: 9.5, weight: 17.9, area: 22.8 },
                'NPI 180': { h: 180, b: 82, tw: 6.9, tf: 10.4, weight: 21.9, area: 27.9 },
                'NPI 200': { h: 200, b: 90, tw: 7.5, tf: 11.3, weight: 26.2, area: 33.4 },
                'NPI 220': { h: 220, b: 98, tw: 8.1, tf: 12.2, weight: 31.1, area: 39.5 },
                'NPI 240': { h: 240, b: 106, tw: 8.7, tf: 13.1, weight: 36.2, area: 46.1 },
                'NPI 260': { h: 260, b: 113, tw: 9.4, tf: 14.1, weight: 41.9, area: 53.3 },
                'NPI 280': { h: 280, b: 119, tw: 10.1, tf: 15.2, weight: 47.9, area: 61.0 },
                'NPI 300': { h: 300, b: 125, tw: 10.8, tf: 16.2, weight: 54.2, area: 69.0 },
                'NPI 320': { h: 320, b: 131, tw: 11.5, tf: 17.3, weight: 61.0, area: 77.7 },
                'NPI 340': { h: 340, b: 137, tw: 12.2, tf: 18.3, weight: 68.0, area: 86.7 },
                'NPI 360': { h: 360, b: 143, tw: 13.0, tf: 19.5, weight: 76.1, area: 97.0 },
                'NPI 380': { h: 380, b: 149, tw: 13.7, tf: 20.5, weight: 84.0, area: 107 },
                'NPI 400': { h: 400, b: 155, tw: 14.4, tf: 21.6, weight: 92.4, area: 118 }
            };
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="profilTipi">${this.getText('profil_tipi_label')}</label>
                        <select id="profilTipi" onchange="window.ApplicationController.updateProfileSizes()">
                            <option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
                            ${Object.keys(this.profileTypes).map(type => 
                                `<option value="${type}">${type} (${this.profileTypes[type]})</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="profilBoyut">${this.getText('profil_boyut_label')}</label>
                        <select id="profilBoyut" onchange="window.ApplicationController.updateProfileInfo()">
                            <option value="">${this.getText('select_type_first')}</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="uzunluk">${this.getText('uzunluk_label')}</label>
                        <input type="number" id="uzunluk" 
                               placeholder="${this.getText('uzunluk_placeholder')}" 
                               min="0" step="any" value="6000">
                    </div>
                </div>
                <div class="form-row" id="profileInfoRow" style="display: none;">
                    <div class="form-group">
                        <small style="color: #4299e1; font-weight: 600;">
                            <span id="teorikAgirlikInfo"></span> | 
                            <span id="kesitAlanInfo"></span>
                        </small>
                    </div>
                </div>
            `;
        }

        calculate(formData) {
            const profilTipi = formData.profilTipi || '';
            const profilBoyut = formData.profilBoyut || '';
            const uzunluk = parseFloat(formData.uzunluk) || 0;
            const adet = parseFloat(formData.adet) || 1;
            const malzemeCinsi = formData.malzemeCinsi || 'S235JR';
            
            if (!profilTipi || !profilBoyut || !uzunluk) {
                return null;
            }
            
            // Profil verilerini al
            const profile = this.getProfileData(profilTipi, profilBoyut);
            if (!profile) {
                return null;
            }
            
            // Ağırlık hesaplama (kg/m * uzunluk)
            const birimAgirlik = (profile.weight * uzunluk) / 1000;
            const toplamAgirlik = birimAgirlik * adet;
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                teorikAgirlik: profile.weight,
                kesitAlani: profile.area,
                suHacmi: null
            };
        }

        getProfileData(type, size) {
            switch(type) {
                case 'IPE': return this.ipeProfiles[size];
                case 'HEA': return this.heaProfiles[size];
                case 'HEB': return this.hebProfiles[size];
                case 'NPU': return this.npuProfiles[size];
                case 'NPI': return this.npiProfiles[size];
                default: return null;
            }
        }

        validate(formData) {
            const profilTipi = formData.profilTipi || '';
            const profilBoyut = formData.profilBoyut || '';
            const uzunluk = parseFloat(formData.uzunluk) || 0;
            
            if (!profilTipi || !profilBoyut || !uzunluk) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            return { isValid: true };
        }

        formatDimensions(formData) {
            const profilBoyut = formData.profilBoyut || '';
            const uzunluk = parseFloat(formData.uzunluk) || 0;
            
            return `${profilBoyut} L:${uzunluk}mm`;
        }

        getDisplayName() {
            const profilTipi = document.getElementById('profilTipi')?.value || '';
            if (profilTipi) {
                return `${profilTipi} ${this.getText('display_name')}`;
            }
            return this.getText('display_name');
        }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            
            // Profil tipini sakla
            baseRow.profilTipi = formData.profilTipi;
            baseRow.profilBoyut = formData.profilBoyut;
            
            // ✅ YENİ: profilDetay objesi oluştur
            baseRow.profilDetay = {
                profilTipi: formData.profilTipi,
                profilBoyut: formData.profilBoyut,
                uzunluk: formData.uzunluk
            };
            
            // Malzeme türü her zaman profil tipiyle birlikte gösterilmeli
            const profilTipiText = formData.profilTipi || '';
            if (profilTipiText) {
                baseRow.malzemeTuru = `${profilTipiText} ${this.getText('display_name')}`;
            } else {
                baseRow.malzemeTuru = this.getText('display_name');
            }
            
            // originalType'ı koru
            baseRow.originalType = 'profil';
            
            return baseRow;
        }

        fillSpecificFields(rowData) {
            console.log('Profil fillSpecificFields çalıştı:', rowData);
            
            // ========================================
            // ÖNCELİK 0: METADATA'DAN GELEN profilDetay
            // ========================================
            if (rowData.profilDetay && rowData.profilDetay.profilTipi) {
                console.log('Profil metadata profilDetay bulundu:', rowData.profilDetay);
                
                const profilTipiElement = document.getElementById('profilTipi');
                if (profilTipiElement) {
                    profilTipiElement.value = rowData.profilDetay.profilTipi;
                    window.ApplicationController.updateProfileSizes();
                    
                    setTimeout(() => {
                        const profilBoyutElement = document.getElementById('profilBoyut');
                        if (profilBoyutElement && rowData.profilDetay.profilBoyut) {
                            profilBoyutElement.value = rowData.profilDetay.profilBoyut;
                            window.ApplicationController.updateProfileInfo();
                        }
                        
                        const uzunlukElement = document.getElementById('uzunluk');
                        if (uzunlukElement && rowData.profilDetay.uzunluk !== undefined) {
                            uzunlukElement.value = rowData.profilDetay.uzunluk;
                        }
                    }, 200);
                }
                
                console.log('Profil metadata işlemi tamamlandı');
                return; // Metadata varsa diğer yöntemlere gerek yok
            }
            
            // ========================================
            // ÖNCELİK 1: FORMDATA İÇİNDEKİ BİLGİLER
            // ========================================
            if (rowData.formData && rowData.formData.profilTipi) {
                console.log('Profil formData bulundu:', rowData.formData);
                
                const profilTipiElement = document.getElementById('profilTipi');
                if (profilTipiElement) {
                    profilTipiElement.value = rowData.formData.profilTipi;
                    window.ApplicationController.updateProfileSizes();
                    
                    setTimeout(() => {
                        if (rowData.formData.profilBoyut) {
                            const boyutElement = document.getElementById('profilBoyut');
                            if (boyutElement) {
                                boyutElement.value = rowData.formData.profilBoyut;
                                window.ApplicationController.updateProfileInfo();
                            }
                        }
                        
                        if (rowData.formData.uzunluk) {
                            const uzunlukElement = document.getElementById('uzunluk');
                            if (uzunlukElement) {
                                uzunlukElement.value = rowData.formData.uzunluk;
                            }
                        }
                    }, 200);
                }
                
                console.log('Profil formData işlemi tamamlandı');
                return;
            }
            
            // ========================================
            // ÖNCELİK 2: ÖLÇÜLERDEN PARSE ETME
            // ========================================
            console.log('Profil ölçülerden parse ediliyor');
            
            // Profil tipi ve boyutu parse et - formatı: "IPE 200 L:6000mm"
            if (rowData.olculer) {
                const olculer = rowData.olculer.toString();
                
                // Profil tipini ve boyutunu ayır
                const profilPattern = /(IPE|HEA|HEB|NPU|NPI)\s*(\d+)/i;
                const profilMatches = olculer.match(profilPattern);
                
                if (profilMatches) {
                    const profilTipiElement = document.getElementById('profilTipi');
                    if (profilTipiElement) {
                        profilTipiElement.value = profilMatches[1].toUpperCase();
                        window.ApplicationController.updateProfileSizes();
                        
                        setTimeout(() => {
                            const profilBoyutElement = document.getElementById('profilBoyut');
                            if (profilBoyutElement) {
                                const boyutValue = `${profilMatches[1].toUpperCase()} ${profilMatches[2]}`;
                                profilBoyutElement.value = boyutValue;
                                window.ApplicationController.updateProfileInfo();
                            }
                        }, 200);
                    }
                }
                
                // Uzunluğu parse et
                const uzunlukPattern = /L:\s*(\d+(?:\.\d+)?)/i;
                const uzunlukMatches = olculer.match(uzunlukPattern);
                if (uzunlukMatches) {
                    setTimeout(() => {
                        const uzunlukElement = document.getElementById('uzunluk');
                        if (uzunlukElement) {
                            uzunlukElement.value = uzunlukMatches[1];
                        }
                    }, 250);
                }
            }
            
            console.log('Profil parse işlemi tamamlandı');
        }
    }

    // ApplicationController'a ek fonksiyonlar ekle
    if (!window.ApplicationController.updateProfileSizes) {
        window.ApplicationController.updateProfileSizes = function() {
            const profilTipi = document.getElementById('profilTipi').value;
            const profilBoyutSelect = document.getElementById('profilBoyut');
            
            if (!profilTipi) {
                profilBoyutSelect.innerHTML = `<option value="">Önce profil tipi seçin</option>`;
                document.getElementById('profileInfoRow').style.display = 'none';
                return;
            }
            
            const MaterialClass = window.MaterialRegistry.get('profil');
            const instance = new MaterialClass();
            
            let profiles;
            switch(profilTipi) {
                case 'IPE': profiles = instance.ipeProfiles; break;
                case 'HEA': profiles = instance.heaProfiles; break;
                case 'HEB': profiles = instance.hebProfiles; break;
                case 'NPU': profiles = instance.npuProfiles; break;
                case 'NPI': profiles = instance.npiProfiles; break;
                default: return;
            }
            
            profilBoyutSelect.innerHTML = `<option value="">Profil seçin</option>`;
            Object.keys(profiles).forEach(size => {
                const profile = profiles[size];
                profilBoyutSelect.innerHTML += `<option value="${size}">${size} (${profile.weight} kg/m)</option>`;
            });
        };
        
        window.ApplicationController.updateProfileInfo = function() {
            const profilTipi = document.getElementById('profilTipi').value;
            const profilBoyut = document.getElementById('profilBoyut').value;
            
            if (!profilTipi || !profilBoyut) {
                document.getElementById('profileInfoRow').style.display = 'none';
                return;
            }
            
            const MaterialClass = window.MaterialRegistry.get('profil');
            const instance = new MaterialClass();
            const profile = instance.getProfileData(profilTipi, profilBoyut);
            
            if (profile) {
                document.getElementById('profileInfoRow').style.display = 'block';
                document.getElementById('teorikAgirlikInfo').textContent = 
                    `${instance.getText('teorik_agirlik_info')}: ${profile.weight} kg/m`;
                document.getElementById('kesitAlanInfo').textContent = 
                    `${instance.getText('kesit_alan_info')}: ${profile.area} cm²`;
            }
        };
    }

    // Malzemeyi kaydet
    const profilMaterial = new ProfilMaterial();
    profilMaterial.register();

})(window);