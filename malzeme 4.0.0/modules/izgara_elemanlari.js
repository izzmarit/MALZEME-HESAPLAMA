/**
 * IZGARA ELEMANLARI Modülü
 * Versiyon: 1.0.0
 * Özel ızgara elemanları için standart parça modülü
 */

(function(window) {
    'use strict';
    
    class IzgaraElemanlariMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'izgara_elemanlari';
            this.version = '1.0.0';
            
            this.texts = {
                tr: {
                    display_name: 'Izgara Elemanları',
                    izgara_elemani_label: 'Izgara Elemanı',
                    validation_error: 'Lütfen ızgara elemanı seçin',
                    birim_agirlik_info: 'Birim Ağırlık',
                    parca_kodu_info: 'Parça Kodu',
                    malzeme_info: 'Malzeme',
                    select_element: 'Izgara elemanı seçiniz...'
                },
                en: {
                    display_name: 'Grating Elements',
                    izgara_elemani_label: 'Grating Element',
                    validation_error: 'Please select grating element',
                    birim_agirlik_info: 'Unit Weight',
                    parca_kodu_info: 'Part Code',
                    malzeme_info: 'Material',
                    select_element: 'Select grating element...'
                }
            };
            
            // Izgara elemanları veri tabanı
            this.izgaraElemanlari = {
                'Normal Açık Iz.': { 
                    birimAgirlik: 2.35, 
                    parcaKodu: 'F2E 22435', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'Normal Kapalı Iz.': { 
                    birimAgirlik: 2.35, 
                    parcaKodu: 'F2E 22571', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'Curuf Iz. Elemanı': { 
                    birimAgirlik: 5, 
                    parcaKodu: 'F2E 22380', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'Büyük Kapalı Iz.': { 
                    birimAgirlik: 19, 
                    parcaKodu: 'R 12751', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'Küçük Kapalı Iz.': { 
                    birimAgirlik: 4, 
                    parcaKodu: 'R 13415', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'Curuf Iz. Taşıyıcı Kapak K.': { 
                    birimAgirlik: 2, 
                    parcaKodu: 'F2T 456 A', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'Curuf Iz. Taşıyıcı Kapak': { 
                    birimAgirlik: 6.5, 
                    parcaKodu: 'F2T 456', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'Klape Parçası': { 
                    birimAgirlik: 17, 
                    parcaKodu: 'TF 10820 A', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'Küçük Klape Parçası': { 
                    birimAgirlik: 7, 
                    parcaKodu: 'TF 10820 B', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'Sızdırmazlık Parçası': { 
                    birimAgirlik: 8.5, 
                    parcaKodu: 'TF 10820', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'Küçük Sızdırmazlık Parçası': { 
                    birimAgirlik: 4.3, 
                    parcaKodu: 'TF 10820/1', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'Yarıklı Saplama': { 
                    birimAgirlik: 0.17, 
                    parcaKodu: 'F2T 259/1', 
                    malzeme: 'St37', 
                    standart: 'EN 10295' 
                },
                'Yarıklı Saplama Pulu': { 
                    birimAgirlik: 0.4, 
                    parcaKodu: 'F2T 259 A', 
                    malzeme: 'St37', 
                    standart: 'EN 10295' 
                },
                'Normal Yan Duvar Parçası': { 
                    birimAgirlik: 18, 
                    parcaKodu: 'F2E 22370', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'Geçiş Yan Duvar Parçası': { 
                    birimAgirlik: 17, 
                    parcaKodu: 'F2E 22371', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'En Üst Yan Duvar Parçası': { 
                    birimAgirlik: 16, 
                    parcaKodu: 'F2E 22379', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'Curuf Iz. Yan Duvar Parçası': { 
                    birimAgirlik: 17, 
                    parcaKodu: 'F2E 22438', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'Sabit Iz. Montaj Konsolu': { 
                    birimAgirlik: 3.35, 
                    parcaKodu: '764 HIZ 069/37', 
                    malzeme: 'S235JR', 
                    standart: 'EN 10025-2' 
                },
                'Mil Yuvarlanma Konsolu': { 
                    birimAgirlik: 13, 
                    parcaKodu: 'TF 20293', 
                    malzeme: 'S235JR', 
                    standart: 'EN 10025-2' 
                },
                'Mil Yuvarlanma Üst Parça': { 
                    birimAgirlik: 9, 
                    parcaKodu: 'TF 12715', 
                    malzeme: 'GG25', 
                    standart: 'EN 10025-2' 
                },
                'Yuvarlanma Mili': { 
                    birimAgirlik: 2, 
                    parcaKodu: 'TF 12715/1', 
                    malzeme: 'St50', 
                    standart: 'EN 10025-2' 
                },
                'Yan Tutucu Lama': { 
                    birimAgirlik: 1, 
                    parcaKodu: 'TF 20292', 
                    malzeme: 'St37', 
                    standart: 'EN 10025-2' 
                },
                'Mil Yan Klavuz Elemanı-Sol': { 
                    birimAgirlik: 6.2, 
                    parcaKodu: 'TF 20295', 
                    malzeme: 'GG50', 
                    standart: 'EN 10025-2' 
                },
                'Mil Yan Klavuz Elemanı-Sağ': { 
                    birimAgirlik: 6.2, 
                    parcaKodu: 'TF 20295/1', 
                    malzeme: 'GG50', 
                    standart: 'EN 10025-2' 
                },
                'Mil Yuvarlanma Alt': { 
                    birimAgirlik: 7, 
                    parcaKodu: 'TF 20294', 
                    malzeme: 'GG25', 
                    standart: 'EN 10025-2' 
                },
                'Normal Izgara Plakası': { 
                    birimAgirlik: 11.5, 
                    parcaKodu: 'TT-B1', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'Izgara Sağ Yan Plaka': { 
                    birimAgirlik: 10.52, 
                    parcaKodu: 'TT-B2', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'Izgara Sol Yan Plaka': { 
                    birimAgirlik: 5.8, 
                    parcaKodu: 'TT-B3', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'Normal Izgara Plaka (A04)': { 
                    birimAgirlik: 10, 
                    parcaKodu: 'TT-B4', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'Izgara Sol Yan Plaka (A05)': { 
                    birimAgirlik: 6.5, 
                    parcaKodu: 'TT-B5', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'Izgara Sağ Yan Plaka (A06)': { 
                    birimAgirlik: 6.5, 
                    parcaKodu: 'TT-B6', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'Sürtünme Plakası-1': { 
                    birimAgirlik: 8, 
                    parcaKodu: 'TT-B7', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'Sürtünme Plakası-2': { 
                    birimAgirlik: 15, 
                    parcaKodu: 'TT-B8', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'Sürtünme Plakası-3': { 
                    birimAgirlik: 15, 
                    parcaKodu: 'TT-B9', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'TE-1 Normal Iz. Elemanı 10D': { 
                    birimAgirlik: 8.2, 
                    parcaKodu: 'TE-1', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'TE-1 Normal Iz. Elemanı 6D': { 
                    birimAgirlik: 8.2, 
                    parcaKodu: 'TE-1', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'TE-1 Normal Iz. Elemanı 4D': { 
                    birimAgirlik: 8.2, 
                    parcaKodu: 'TE-1', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'TE-2 Dar Ara Iz. Elemanı': { 
                    birimAgirlik: 4.6, 
                    parcaKodu: 'TE-2', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'TE-3 Normal Deliksiz Iz. Elemanı': { 
                    birimAgirlik: 4.6, 
                    parcaKodu: 'TE-3', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'TE-4 Kapalı Normal Iz. Elemanı': { 
                    birimAgirlik: 7.33, 
                    parcaKodu: 'TE-4', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'TE-4A Açık Normal Iz. Elemanı': { 
                    birimAgirlik: 7.5, 
                    parcaKodu: 'TE-4A', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'TE-4B Açık Normal Iz. Elemanı 6D': { 
                    birimAgirlik: 7.33, 
                    parcaKodu: 'TE-4B', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                },
                'TE-5A Açık Normal Iz. Elemanı': { 
                    birimAgirlik: 3.84, 
                    parcaKodu: 'TE-5A', 
                    malzeme: 'A10', 
                    standart: 'EN 10295' 
                }
            };
            
            this.setupEventHandlers();
        }

        setupEventHandlers() {
            const self = this;
            
            window.IzgaraElemanlariHandlers = {
                onIzgaraElemaniChange: function() {
                    const selectedElement = document.getElementById('ie_izgara_elemani').value;
                    const infoRow = document.getElementById('ie_infoRow');
                    
                    if (!selectedElement) {
                        infoRow.style.display = 'none';
                        return;
                    }
                    
                    const elemanData = self.izgaraElemanlari[selectedElement];
                    if (!elemanData) {
                        infoRow.style.display = 'none';
                        return;
                    }
                    
                    infoRow.style.display = 'block';
                    
                    document.getElementById('ie_birim_agirlik_info').textContent = 
                        `${self.getText('birim_agirlik_info')}: ${elemanData.birimAgirlik} kg/adet`;
                    
                    document.getElementById('ie_parca_kodu_info').textContent = 
                        `${self.getText('parca_kodu_info')}: ${elemanData.parcaKodu}`;
                    
                    document.getElementById('ie_malzeme_info').textContent = 
                        `${self.getText('malzeme_info')}: ${elemanData.malzeme}`;
                }
            };
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            
            const elemanlarOptions = Object.keys(this.izgaraElemanlari)
                .sort()
                .map(eleman => {
                    const data = this.izgaraElemanlari[eleman];
                    return `<option value="${eleman}">${eleman} (${data.birimAgirlik} kg/adet)</option>`;
                })
                .join('');
            
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="ie_izgara_elemani">
                            <span class="label-icon">🔩</span> ${this.getText('izgara_elemani_label')}
                        </label>
                        <select id="ie_izgara_elemani" onchange="window.IzgaraElemanlariHandlers.onIzgaraElemaniChange()">
                            <option value="">${this.getText('select_element')}</option>
                            ${elemanlarOptions}
                        </select>
                    </div>
                </div>
                
                <div class="form-row" id="ie_infoRow" style="display:none; background: #f7fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0;">
                    <div class="form-group" style="margin-bottom: 0;">
                        <div style="display: flex; flex-direction: column; gap: 6px;">
                            <small style="color: #4299e1; font-weight: 600;" id="ie_birim_agirlik_info"></small>
                            <small style="color: #667eea; font-weight: 600;" id="ie_parca_kodu_info"></small>
                            <small style="color: #48bb78; font-weight: 600;" id="ie_malzeme_info"></small>
                        </div>
                    </div>
                </div>
            `;
        }

        getGrades() {
            return [];
        }

        getDensity(grade) {
            return 0;
        }

        getStandard(grade) {
            return '-';
        }

        calculate(formData) {
            const izgaraElemani = formData.ie_izgara_elemani;
            const adet = parseFloat(formData.adet) || 1;
            
            if (!izgaraElemani) {
                return null;
            }
            
            const elemanData = this.izgaraElemanlari[izgaraElemani];
            if (!elemanData) {
                return null;
            }
            
            const birimAgirlik = elemanData.birimAgirlik;
            const toplamAgirlik = birimAgirlik * adet;
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                suHacmi: null
            };
        }

        validate(formData) {
            const izgaraElemani = formData.ie_izgara_elemani;
            
            if (!izgaraElemani || izgaraElemani.trim() === '') {
                return { 
                    isValid: false, 
                    message: this.getText('validation_error') 
                };
            }
            
            return { isValid: true };
        }
        
        formatDimensions(formData) {
            const izgaraElemani = formData.ie_izgara_elemani;
            
            if (!izgaraElemani) {
                return '-';
            }
            
            const elemanData = this.izgaraElemanlari[izgaraElemani];
            return elemanData ? elemanData.parcaKodu : '-';
        }

        getDisplayName() {
            return this.getText('display_name');
        }

        getDisplayTypeFromRow(rowData) {
            const metadata = rowData.metadata?.izgara_elemanlari;
            if (metadata && metadata.izgara_elemani) {
                return metadata.izgara_elemani;
            }
            return this.getDisplayName();
        }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            
            const izgaraElemani = formData.ie_izgara_elemani;
            const elemanData = this.izgaraElemanlari[izgaraElemani];
            
            baseRow.malzemeTuru = izgaraElemani || this.getDisplayName();
            
            if (elemanData) {
                baseRow.malzemeCinsi = elemanData.malzeme;
                baseRow.olculer = elemanData.parcaKodu;
                baseRow.enNormu = elemanData.standart;
            }
            
            baseRow.metadata = {
                ...baseRow.metadata,
                izgara_elemanlari: {
                    izgara_elemani: izgaraElemani,
                    birim_agirlik: elemanData?.birimAgirlik,
                    parca_kodu: elemanData?.parcaKodu,
                    malzeme: elemanData?.malzeme,
                    standart: elemanData?.standart
                }
            };
            
            return baseRow;
        }

        fillFormFromRow(rowData) {
            super.fillFormFromRow(rowData);
            
            const metadata = rowData.metadata?.izgara_elemanlari;
            if (!metadata) {
                if (rowData.formData) {
                    this.fillFromFormData(rowData.formData);
                }
                return true;
            }
            
            setTimeout(() => {
                const izgaraElemaniElement = document.getElementById('ie_izgara_elemani');
                if (izgaraElemaniElement && metadata.izgara_elemani) {
                    izgaraElemaniElement.value = metadata.izgara_elemani;
                    window.IzgaraElemanlariHandlers.onIzgaraElemaniChange();
                }
            }, 100);
            
            return true;
        }
        
        fillFromFormData(formData) {
            setTimeout(() => {
                Object.keys(formData).forEach(key => {
                    const element = document.getElementById(key);
                    if (element) {
                        element.value = formData[key];
                        
                        if (key === 'ie_izgara_elemani') {
                            window.IzgaraElemanlariHandlers.onIzgaraElemaniChange();
                        }
                    }
                });
            }, 100);
        }
    }

    const izgaraElemanlariMaterial = new IzgaraElemanlariMaterial();
    izgaraElemanlariMaterial.register();
    
    console.log('Izgara Elemanları modülü v1.0.0 yüklendi (42 eleman)');

})(window);