/**
 * IZGARA Malzeme Modülü
 * Platform Izgara ve Özel Izgara Elemanları
 */

(function(window) {
    'use strict';
    
    class IzgaraMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'izgara';
            
            // Dil metinleri
            this.texts = {
                tr: {
                    display_name: 'Izgara',
                    izgara_kategori_label: 'Izgara Kategorisi',
                    izgara_tipi_label: 'Izgara Tipi',
                    en_label: 'En (mm)',
                    boy_label: 'Boy (mm)',
                    adet_override_label: 'Adet',
                    validation_error: 'Izgara tipi seçilmelidir',
                    birim_agirlik_info: 'Birim Ağırlık',
                    alan_info: 'Alan',
                    parça_kodu_info: 'Parça Kodu',
                    select_category: 'Kategori seçin',
                    select_type: 'Izgara tipi seçin',
                    platform_category: 'Platform Izgaralar (m²)',
                    element_category: 'Özel Izgara Elemanları (Adet)'
                },
                en: {
                    display_name: 'Grating',
                    izgara_kategori_label: 'Grating Category',
                    izgara_tipi_label: 'Grating Type',
                    en_label: 'Width (mm)',
                    boy_label: 'Length (mm)',
                    adet_override_label: 'Quantity',
                    validation_error: 'Grating type must be selected',
                    birim_agirlik_info: 'Unit Weight',
                    alan_info: 'Area',
                    parça_kodu_info: 'Part Code',
                    select_category: 'Select category',
                    select_type: 'Select grating type',
                    platform_category: 'Platform Gratings (m²)',
                    element_category: 'Special Grating Elements (Piece)'
                }
            };
            
            // Tüm malzeme cinsleri
            this.grades = [
                'S235JR', 'S275JR', 'S355JR',
                'A10', 'St37', 'St50',
                'GG25', 'GG50',
                '1.4301', '1.4401', '1.4404'
            ];
            
            // Yoğunluklar
            this.densities = {
                'S235JR': 7850, 'S275JR': 7850, 'S355JR': 7850,
                'A10': 7850, 'St37': 7850, 'St50': 7850,
                'GG25': 7200, 'GG50': 7200,
                '1.4301': 8000, '1.4401': 8000, '1.4404': 8000
            };
            
            // Standartlar
            this.standards = {
                'S235JR': 'EN 10025-2', 'S275JR': 'EN 10025-2', 'S355JR': 'EN 10025-2',
                'A10': 'EN 10295', 'St37': 'EN 10025-2', 'St50': 'EN 10025-2',
                'GG25': 'EN 1561', 'GG50': 'EN 1561',
                '1.4301': 'EN 10088-2', '1.4401': 'EN 10088-2', '1.4404': 'EN 10088-2'
            };
            
            // Platform ızgaralar (kg/m²)
            this.platformIzgaralar = {
                'Izgara 30x30x3': { agirlik: 31.2, goze: '30x30', lama: 3 },
                'Izgara 30x30x4': { agirlik: 41.6, goze: '30x30', lama: 4 },
                'Izgara 30x30x5': { agirlik: 52.0, goze: '30x30', lama: 5 },
                'Izgara 40x40x3': { agirlik: 24.3, goze: '40x40', lama: 3 },
                'Izgara 40x40x4': { agirlik: 32.4, goze: '40x40', lama: 4 },
                'Izgara 40x40x5': { agirlik: 40.5, goze: '40x40', lama: 5 },
                'Izgara 50x50x3': { agirlik: 19.8, goze: '50x50', lama: 3 },
                'Izgara 50x50x4': { agirlik: 26.4, goze: '50x50', lama: 4 },
                'Izgara 50x50x5': { agirlik: 33.0, goze: '50x50', lama: 5 },
                'Izgara 60x60x3': { agirlik: 16.6, goze: '60x60', lama: 3 },
                'Izgara 60x60x4': { agirlik: 22.1, goze: '60x60', lama: 4 },
                'Izgara 60x60x5': { agirlik: 27.6, goze: '60x60', lama: 5 }
            };
            
            // Özel ızgara elemanları (kg/adet)
            this.izgaraElemanlari = {
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
            };
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="izgaraKategori">${this.getText('izgara_kategori_label')}</label>
                        <select id="izgaraKategori" onchange="window.ApplicationController.updateIzgaraTypes()">
                            <option value="">${this.getText('select_category')}</option>
                            <option value="platform">${this.getText('platform_category')}</option>
                            <option value="element">${this.getText('element_category')}</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="izgaraTipi">${this.getText('izgara_tipi_label')}</label>
                        <select id="izgaraTipi" onchange="window.ApplicationController.updateIzgaraInfo()">
                            <option value="">${this.getText('select_type')}</option>
                        </select>
                    </div>
                </div>
                <div id="izgaraDimensions" style="display: none;">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="en">${this.getText('en_label')}</label>
                            <input type="number" id="en" placeholder="1000" min="0" step="any" value="1000">
                        </div>
                        <div class="form-group">
                            <label for="boy">${this.getText('boy_label')}</label>
                            <input type="number" id="boy" placeholder="1000" min="0" step="any" value="1000">
                        </div>
                    </div>
                </div>
                <div class="form-row" id="izgaraInfoRow" style="display: none;">
                    <div class="form-group">
                        <small style="color: #4299e1; font-weight: 600;">
                            <span id="birimAgirlikInfo"></span> | 
                            <span id="parcaKoduInfo"></span>
                        </small>
                    </div>
                </div>
            `;
        }

        calculate(formData) {
            const kategori = formData.izgaraKategori || '';
            const tip = formData.izgaraTipi || '';
            const adet = parseFloat(formData.adet) || 1;
            const malzemeCinsi = formData.malzemeCinsi || 'S235JR';
            
            if (!kategori || !tip) {
                return null;
            }
            
            let birimAgirlik = 0;
            let toplamAgirlik = 0;
            
            if (kategori === 'platform') {
                // Platform ızgara - m² bazlı hesaplama
                const en = parseFloat(formData.en) || 0;
                const boy = parseFloat(formData.boy) || 0;
                
                if (!en || !boy) {
                    return null;
                }
                
                const izgaraData = this.platformIzgaralar[tip];
                if (!izgaraData) {
                    return null;
                }
                
                const alanM2 = (en * boy) / 1000000;
                birimAgirlik = alanM2 * izgaraData.agirlik;
                toplamAgirlik = birimAgirlik * adet;
                
            } else if (kategori === 'element') {
                // Özel ızgara elemanı - adet bazlı hesaplama
                const elemanData = this.izgaraElemanlari[tip];
                if (!elemanData) {
                    return null;
                }
                
                birimAgirlik = elemanData.adetKg;
                toplamAgirlik = birimAgirlik * adet;
            }
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                suHacmi: null
            };
        }

        validate(formData) {
            const kategori = formData.izgaraKategori || '';
            const tip = formData.izgaraTipi || '';
            
            if (!kategori || !tip) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            if (kategori === 'platform') {
                const en = parseFloat(formData.en) || 0;
                const boy = parseFloat(formData.boy) || 0;
                
                if (!en || !boy) {
                    return {
                        isValid: false,
                        message: this.getText('validation_error')
                    };
                }
            }
            
            return { isValid: true };
        }

        formatDimensions(formData) {
            const kategori = formData.izgaraKategori || '';
            const tip = formData.izgaraTipi || '';
            
            if (kategori === 'platform') {
                const en = parseFloat(formData.en) || 0;
                const boy = parseFloat(formData.boy) || 0;
                return `${tip} ${en}x${boy}mm`;
            } else if (kategori === 'element') {
                const elemanData = this.izgaraElemanlari[tip];
                return elemanData ? elemanData.olcu : tip;
            }
            
            return tip;
        }

        // Override formatRow to include standard info
        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            
            // Kategori bilgisini ekle
            baseRow.izgaraKategori = formData.izgaraKategori;
            baseRow.izgaraTipi = formData.izgaraTipi;
            
            // Eğer özel elemansa, standart bilgisini güncelle
            if (formData.izgaraKategori === 'element') {
                const elemanData = this.izgaraElemanlari[formData.izgaraTipi];
                if (elemanData) {
                    baseRow.enNormu = elemanData.norm;
                    baseRow.malzemeCinsi = elemanData.malzeme;
                }
            }
            
            return baseRow;
        }
    }

    // ApplicationController'a ek fonksiyonlar
    if (!window.ApplicationController.updateIzgaraTypes) {
        window.ApplicationController.updateIzgaraTypes = function() {
            const kategori = document.getElementById('izgaraKategori').value;
            const tipiSelect = document.getElementById('izgaraTipi');
            const dimensionsDiv = document.getElementById('izgaraDimensions');
            
            if (!kategori) {
                tipiSelect.innerHTML = `<option value="">Önce kategori seçin</option>`;
                dimensionsDiv.style.display = 'none';
                document.getElementById('izgaraInfoRow').style.display = 'none';
                return;
            }
            
            const MaterialClass = window.MaterialRegistry.get('izgara');
            const instance = new MaterialClass();
            const lang = instance.getCurrentLanguage();
            
            tipiSelect.innerHTML = `<option value="">${instance.getText('select_type')}</option>`;
            
            if (kategori === 'platform') {
                // Platform ızgaraları göster
                Object.keys(instance.platformIzgaralar).forEach(tip => {
                    const data = instance.platformIzgaralar[tip];
                    tipiSelect.innerHTML += `<option value="${tip}">${tip} (${data.agirlik} kg/m²)</option>`;
                });
                dimensionsDiv.style.display = 'block';
                
            } else if (kategori === 'element') {
                // Özel elemanları göster
                Object.keys(instance.izgaraElemanlari).forEach(tip => {
                    const data = instance.izgaraElemanlari[tip];
                    tipiSelect.innerHTML += `<option value="${tip}">${tip} (${data.adetKg} kg/adet)</option>`;
                });
                dimensionsDiv.style.display = 'none';
            }
        };
        
        window.ApplicationController.updateIzgaraInfo = function() {
            const kategori = document.getElementById('izgaraKategori').value;
            const tip = document.getElementById('izgaraTipi').value;
            
            if (!kategori || !tip) {
                document.getElementById('izgaraInfoRow').style.display = 'none';
                return;
            }
            
            const MaterialClass = window.MaterialRegistry.get('izgara');
            const instance = new MaterialClass();
            
            document.getElementById('izgaraInfoRow').style.display = 'block';
            const birimAgirlikInfo = document.getElementById('birimAgirlikInfo');
            const parcaKoduInfo = document.getElementById('parcaKoduInfo');
            
            if (kategori === 'platform') {
                const data = instance.platformIzgaralar[tip];
                birimAgirlikInfo.textContent = `${instance.getText('birim_agirlik_info')}: ${data.agirlik} kg/m²`;
                parcaKoduInfo.textContent = `Göz: ${data.goze}, Lama: ${data.lama}mm`;
                
            } else if (kategori === 'element') {
                const data = instance.izgaraElemanlari[tip];
                birimAgirlikInfo.textContent = `${instance.getText('birim_agirlik_info')}: ${data.adetKg} kg/adet`;
                parcaKoduInfo.textContent = `${instance.getText('parça_kodu_info')}: ${data.olcu}`;
                
                // Malzeme cinsini otomatik seç
                if (document.getElementById('malzemeCinsi')) {
                    document.getElementById('malzemeCinsi').value = data.malzeme;
                }
            }
        };
    }

    // Malzemeyi kaydet
    const izgaraMaterial = new IzgaraMaterial();
    izgaraMaterial.register();

})(window);