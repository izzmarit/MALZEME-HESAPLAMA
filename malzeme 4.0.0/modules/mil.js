/**
 * MİL MALZEME Modülü
 * Versiyon: 1.0.0
 * Silindirik mil malzeme hesaplama modülü
 */

(function(window) {
    'use strict';
    
    class MilMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'mil';
            this.version = '1.0.0';
            
            this.texts = {
                tr: {
                    display_name: 'Mil Malzeme',
                    cap_label: 'Çap (mm)',
                    boy_label: 'Boy (mm)',
                    validation_error: 'Lütfen tüm alanları doldurun',
                    validation_min_error: 'Değerler 0\'dan büyük olmalıdır',
                    
                    // Malzeme grupları
                    group_carbon: 'Karbon Çelikleri',
                    group_alloy: 'Alaşımlı Çelikler',
                    group_structural: 'Yapı Çelikleri',
                    group_stainless: 'Paslanmaz Çelikler',
                    group_tool: 'Takım Çelikleri'
                },
                en: {
                    display_name: 'Shaft Material',
                    cap_label: 'Diameter (mm)',
                    boy_label: 'Length (mm)',
                    validation_error: 'Please fill all fields',
                    validation_min_error: 'Values must be greater than 0',
                    
                    // Material groups
                    group_carbon: 'Carbon Steels',
                    group_alloy: 'Alloy Steels',
                    group_structural: 'Structural Steels',
                    group_stainless: 'Stainless Steels',
                    group_tool: 'Tool Steels'
                }
            };
            
            // Mil malzemeleri ve özellikleri
            this.materials = {
                // Karbon Çelikleri
                'Ç1020': {
                    density: 7850,
                    standard: 'AISI 1020 / DIN C22',
                    group: 'carbon',
                    description: 'Düşük karbonlu çelik'
                },
                'Ç1040': {
                    density: 7850,
                    standard: 'AISI 1040 / DIN C40',
                    group: 'carbon',
                    description: 'Orta karbonlu çelik'
                },
                'Ç1045': {
                    density: 7850,
                    standard: 'AISI 1045 / DIN C45',
                    group: 'carbon',
                    description: 'Orta karbonlu çelik'
                },
                'Ç1050': {
                    density: 7850,
                    standard: 'AISI 1050 / DIN C50',
                    group: 'carbon',
                    description: 'Yüksek karbonlu çelik'
                },
                
                // Alaşımlı Çelikler
                '42CrMo4': {
                    density: 7850,
                    standard: 'EN 10083-3 / DIN 1.7225',
                    group: 'alloy',
                    description: 'Krom-molibden alaşımlı çelik'
                },
                '34CrNiMo6': {
                    density: 7850,
                    standard: 'EN 10083-3 / DIN 1.6582',
                    group: 'alloy',
                    description: 'Krom-nikel-molibden alaşımlı çelik'
                },
                '30CrNiMo8': {
                    density: 7850,
                    standard: 'EN 10083-3 / DIN 1.6580',
                    group: 'alloy',
                    description: 'Yüksek mukavemetli alaşımlı çelik'
                },
                '16MnCr5': {
                    density: 7850,
                    standard: 'EN 10084 / DIN 1.7131',
                    group: 'alloy',
                    description: 'Sementasyon çeliği'
                },
                '20MnCr5': {
                    density: 7850,
                    standard: 'EN 10084 / DIN 1.7147',
                    group: 'alloy',
                    description: 'Sementasyon çeliği'
                },
                '18CrNiMo7-6': {
                    density: 7850,
                    standard: 'EN 10084 / DIN 1.6587',
                    group: 'alloy',
                    description: 'Yüksek mukavemetli sementasyon çeliği'
                },
                
                // Yapı Çelikleri
                'S235JR': {
                    density: 7850,
                    standard: 'EN 10025-2',
                    group: 'structural',
                    description: 'Genel yapı çeliği'
                },
                'S275JR': {
                    density: 7850,
                    standard: 'EN 10025-2',
                    group: 'structural',
                    description: 'Genel yapı çeliği'
                },
                'S355J2': {
                    density: 7850,
                    standard: 'EN 10025-2',
                    group: 'structural',
                    description: 'Yüksek mukavemetli yapı çeliği'
                },
                'E295': {
                    density: 7850,
                    standard: 'EN 10025-1',
                    group: 'structural',
                    description: 'Makine yapı çeliği'
                },
                'E335': {
                    density: 7850,
                    standard: 'EN 10025-1',
                    group: 'structural',
                    description: 'Makine yapı çeliği'
                },
                
                // Paslanmaz Çelikler
                '1.4301': {
                    density: 7900,
                    standard: 'EN 10088-3 / AISI 304',
                    group: 'stainless',
                    description: 'Austenite paslanmaz çelik',
                    aisi: '304'
                },
                '1.4401': {
                    density: 7980,
                    standard: 'EN 10088-3 / AISI 316',
                    group: 'stainless',
                    description: 'Molibdenli austenite paslanmaz çelik',
                    aisi: '316'
                },
                '1.4404': {
                    density: 7980,
                    standard: 'EN 10088-3 / AISI 316L',
                    group: 'stainless',
                    description: 'Düşük karbonlu molibdenli austenite',
                    aisi: '316L'
                },
                '1.4571': {
                    density: 7980,
                    standard: 'EN 10088-3 / AISI 316Ti',
                    group: 'stainless',
                    description: 'Titanyum stabilize austenite',
                    aisi: '316Ti'
                },
                '1.4462': {
                    density: 7800,
                    standard: 'EN 10088-3 / AISI 2205',
                    group: 'stainless',
                    description: 'Duplex paslanmaz çelik',
                    aisi: '2205'
                },
                '1.4122': {
                    density: 7700,
                    standard: 'EN 10088-3 / AISI 431',
                    group: 'stainless',
                    description: 'Martensitik paslanmaz çelik',
                    aisi: '431'
                },
                
                // Takım Çelikleri
                '1.2343': {
                    density: 7800,
                    standard: 'EN ISO 4957 / AISI H11',
                    group: 'tool',
                    description: 'Sıcak iş takım çeliği',
                    aisi: 'H11'
                },
                '1.2344': {
                    density: 7800,
                    standard: 'EN ISO 4957 / AISI H13',
                    group: 'tool',
                    description: 'Sıcak iş takım çeliği',
                    aisi: 'H13'
                },
                '1.2379': {
                    density: 7700,
                    standard: 'EN ISO 4957 / AISI D2',
                    group: 'tool',
                    description: 'Soğuk iş takım çeliği',
                    aisi: 'D2'
                },
                '1.2767': {
                    density: 7850,
                    standard: 'EN ISO 4957 / AISI A2',
                    group: 'tool',
                    description: 'Soğuk iş takım çeliği',
                    aisi: 'A2'
                }
            };
            
            this.setupEventHandlers();
        }

        setupEventHandlers() {
            // Bu modül için özel event handler gerekmiyor
            window.MilHandlers = {};
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="mil_cap">
                            <span class="label-icon">⭕</span> ${this.getText('cap_label')}
                        </label>
                        <input type="number" id="mil_cap" min="0.1" step="0.1" 
                               placeholder="${lang === 'tr' ? 'Çap değeri' : 'Diameter value'}">
                    </div>
                    <div class="form-group">
                        <label for="mil_boy">
                            <span class="label-icon">📏</span> ${this.getText('boy_label')}
                        </label>
                        <input type="number" id="mil_boy" min="0.1" step="0.1" 
                               placeholder="${lang === 'tr' ? 'Boy değeri' : 'Length value'}">
                    </div>
                </div>
            `;
        }

        getGrades() {
            const grades = [];
            const lang = this.getCurrentLanguage();
            
            const groups = {
                'carbon': this.getText('group_carbon'),
                'alloy': this.getText('group_alloy'),
                'structural': this.getText('group_structural'),
                'stainless': this.getText('group_stainless'),
                'tool': this.getText('group_tool')
            };
            
            Object.entries(groups).forEach(([groupKey, groupName]) => {
                const groupMaterials = Object.keys(this.materials).filter(
                    mat => this.materials[mat].group === groupKey
                );
                
                if (groupMaterials.length > 0) {
                    grades.push({
                        text: groupName,
                        value: '',
                        disabled: true
                    });
                    
                    groupMaterials.forEach(material => {
                        let displayText = material;
                        if (this.materials[material].aisi) {
                            displayText += ` (${this.materials[material].aisi})`;
                        }
                        
                        grades.push({
                            text: displayText,
                            value: material,
                            disabled: false
                        });
                    });
                }
            });
            
            return grades;
        }

        getDensity(grade) {
            return this.materials[grade]?.density || 7850;
        }

        getStandard(grade) {
            return this.materials[grade]?.standard || '-';
        }

        calculate(formData) {
            const cap = parseFloat(formData.mil_cap) || 0;
            const boy = parseFloat(formData.mil_boy) || 0;
            const malzemeCinsi = formData.malzemeCinsi;
            const adet = parseFloat(formData.adet) || 1;
            
            if (cap <= 0 || boy <= 0) {
                return null;
            }
            
            const density = this.materials[malzemeCinsi]?.density || 7850;
            
            // Silindir hacmi: V = π * r² * h (mm³)
            const yaricap = cap / 2;
            const hacimMm3 = Math.PI * yaricap * yaricap * boy;
            
            // Hacmi m³'e çevir
            const hacimM3 = hacimMm3 / 1000000000;
            
            // Ağırlık hesapla (kg)
            const birimAgirlik = hacimM3 * density;
            const toplamAgirlik = birimAgirlik * adet;
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                suHacmi: null
            };
        }

        validate(formData) {
            const cap = formData.mil_cap;
            const boy = formData.mil_boy;
            
            if (cap === undefined || cap === null || cap === '' ||
                boy === undefined || boy === null || boy === '') {
                return { 
                    isValid: false, 
                    message: this.getText('validation_error') 
                };
            }
            
            const capNum = parseFloat(cap);
            const boyNum = parseFloat(boy);
            
            if (isNaN(capNum) || isNaN(boyNum)) {
                return { 
                    isValid: false, 
                    message: this.getText('validation_error') 
                };
            }
            
            if (capNum <= 0 || boyNum <= 0) {
                return { 
                    isValid: false, 
                    message: this.getText('validation_min_error') 
                };
            }
            
            return { isValid: true };
        }
        
        formatDimensions(formData) {
            const cap = parseFloat(formData.mil_cap) || 0;
            const boy = parseFloat(formData.mil_boy) || 0;
            
            const capStr = cap % 1 === 0 ? cap.toString() : cap.toFixed(1);
            const boyStr = boy % 1 === 0 ? boy.toString() : boy.toFixed(1);
            
            return `Ø${capStr} x ${boyStr}mm`;
        }

        getDisplayName() {
            return this.getText('display_name');
        }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            
            baseRow.malzemeTuru = this.getDisplayName();
            
            const material = this.materials[formData.malzemeCinsi];
            if (material) {
                baseRow.enNormu = material.standard;
            }
            
            baseRow.metadata = {
                ...baseRow.metadata,
                mil: {
                    cap: formData.mil_cap,
                    boy: formData.mil_boy,
                    yogunluk: material?.density
                }
            };
            
            return baseRow;
        }

        fillFormFromRow(rowData) {
            super.fillFormFromRow(rowData);
            
            const metadata = rowData.metadata?.mil;
            if (!metadata) {
                if (rowData.formData) {
                    this.fillFromFormData(rowData.formData);
                }
                return true;
            }
            
            setTimeout(() => {
                const capElement = document.getElementById('mil_cap');
                const boyElement = document.getElementById('mil_boy');
                
                if (capElement && metadata.cap) {
                    capElement.value = metadata.cap;
                }
                
                if (boyElement && metadata.boy) {
                    boyElement.value = metadata.boy;
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
                    }
                });
            }, 100);
        }
    }

    const milMaterial = new MilMaterial();
    milMaterial.register();
    
    console.log('Mil Malzeme modülü v1.0.0 yüklendi');

})(window);