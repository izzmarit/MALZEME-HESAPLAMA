/**
 * IZGARA Malzeme Modülü
 * Sadece Özel Izgara Elemanları
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
                    display_name: 'Izgara Elemanı',
                    izgara_tipi_label: 'Izgara Elemanı',
                    validation_error: 'Izgara elemanı seçilmelidir',
                    birim_agirlik_info: 'Birim Ağırlık',
                    parça_kodu_info: 'Parça Kodu',
                    select_type: 'Izgara elemanı seçin'
                },
                en: {
                    display_name: 'Grating Element',
                    izgara_tipi_label: 'Grating Element',
                    validation_error: 'Grating element must be selected',
                    birim_agirlik_info: 'Unit Weight',
                    parça_kodu_info: 'Part Code',
                    select_type: 'Select grating element'
                }
            };
            
            // Tüm malzeme cinsleri
            this.grades = [
                'A10', 'St37', 'St50',
                'S235JR', 'S275JR', 'S355JR',
                'GG25', 'GG50',
                '1.4301', '1.4401', '1.4404'
            ];
            
            // Yoğunluklar
            this.densities = {
                'A10': 7850, 'St37': 7850, 'St50': 7850,
                'S235JR': 7850, 'S275JR': 7850, 'S355JR': 7850,
                'GG25': 7200, 'GG50': 7200,
                '1.4301': 8000, '1.4401': 8000, '1.4404': 8000
            };
            
            // Standartlar
            this.standards = {
                'A10': 'EN 10295', 'St37': 'EN 10025-2', 'St50': 'EN 10025-2',
                'S235JR': 'EN 10025-2', 'S275JR': 'EN 10025-2', 'S355JR': 'EN 10025-2',
                'GG25': 'EN 1561', 'GG50': 'EN 1561',
                '1.4301': 'EN 10088-2', '1.4401': 'EN 10088-2', '1.4404': 'EN 10088-2'
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
                        <label for="izgaraTipi">${this.getText('izgara_tipi_label')}</label>
                        <select id="izgaraTipi" onchange="window.ApplicationController.updateIzgaraInfo()">
                            <option value="">${this.getText('select_type')}</option>
                            ${Object.keys(this.izgaraElemanlari).map(tip => {
                                const data = this.izgaraElemanlari[tip];
                                return `<option value="${tip}">${tip} (${data.adetKg} kg/adet)</option>`;
                            }).join('')}
                        </select>
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
            const tip = formData.izgaraTipi || '';
            const adet = parseFloat(formData.adet) || 1;
            const malzemeCinsi = formData.malzemeCinsi || 'A10';
            
            if (!tip) {
                return null;
            }
            
            // Özel ızgara elemanı - adet bazlı hesaplama
            const elemanData = this.izgaraElemanlari[tip];
            if (!elemanData) {
                return null;
            }
            
            const birimAgirlik = elemanData.adetKg;
            const toplamAgirlik = birimAgirlik * adet;
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                suHacmi: null
            };
        }

        validate(formData) {
            const tip = formData.izgaraTipi || '';
            
            if (!tip) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            return { isValid: true };
        }

        formatDimensions(formData) {
            const tip = formData.izgaraTipi || '';
            
            const elemanData = this.izgaraElemanlari[tip];
            return elemanData ? elemanData.olcu : tip;
        }

        // Override formatRow to include standard info
        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            
            // Tip bilgisini sakla
            baseRow.izgaraTipi = formData.izgaraTipi;
            
            // Malzeme türünü HERZAMAN parça adı olarak ayarla (dil değişiminden etkilenmesin)
            baseRow.malzemeTuru = formData.izgaraTipi;
            
            // Standart bilgisini güncelle
            const elemanData = this.izgaraElemanlari[formData.izgaraTipi];
            if (elemanData) {
                baseRow.enNormu = elemanData.norm;
                baseRow.malzemeCinsi = elemanData.malzeme;
            }
            
            baseRow.originalType = 'izgara';
            
            // İzgara kategorisi ekle
            baseRow.izgaraKategori = 'element';
            
            return baseRow;
        }

        fillSpecificFields(rowData) {
            // Izgara tipini doldur
            if (rowData.izgaraTipi) {
                const tipElement = document.getElementById('izgaraTipi');
                if (tipElement) {
                    tipElement.value = rowData.izgaraTipi;
                    window.ApplicationController.updateIzgaraInfo();
                }
            }
        }
    }

    // ApplicationController'a ek fonksiyonlar
    if (!window.ApplicationController.updateIzgaraInfo) {
        window.ApplicationController.updateIzgaraInfo = function() {
            const tip = document.getElementById('izgaraTipi').value;
            
            if (!tip) {
                document.getElementById('izgaraInfoRow').style.display = 'none';
                return;
            }
            
            const MaterialClass = window.MaterialRegistry.get('izgara');
            const instance = new MaterialClass();
            
            document.getElementById('izgaraInfoRow').style.display = 'block';
            const birimAgirlikInfo = document.getElementById('birimAgirlikInfo');
            const parcaKoduInfo = document.getElementById('parcaKoduInfo');
            
            const data = instance.izgaraElemanlari[tip];
            birimAgirlikInfo.textContent = `${instance.getText('birim_agirlik_info')}: ${data.adetKg} kg/adet`;
            parcaKoduInfo.textContent = `${instance.getText('parça_kodu_info')}: ${data.olcu}`;
            
            // Malzeme cinsini otomatik seç
            if (document.getElementById('malzemeCinsi')) {
                document.getElementById('malzemeCinsi').value = data.malzeme;
            }
        };
    }

    // Malzemeyi kaydet
    const izgaraMaterial = new IzgaraMaterial();
    izgaraMaterial.register();

})(window);