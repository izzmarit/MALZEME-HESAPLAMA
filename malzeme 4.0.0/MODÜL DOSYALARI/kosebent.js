/**
 * KÖŞEBENT Malzeme Modülü
 * Versiyon: 1.0.0
 * Köşebent (L profil / Angle bar) hesaplama modülü - EN standartları ile
 */

(function(window) {
    'use strict';
    
    class KosebentMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'kosebent';
            this.version = '1.0.0';
            
            this.texts = {
                tr: {
                    display_name: 'Köşebent',
                    kenar_a_label: 'A Kenarı (mm)',
                    kenar_b_label: 'B Kenarı (mm)',
                    kalinlik_label: 'Kalınlık (mm)',
                    boy_label: 'Boy (mm)',
                    validation_error: 'Lütfen tüm ölçü değerlerini girin',
                    validation_min_error: 'Ölçü değerleri 0\'dan büyük olmalıdır',
                    validation_thickness_error: 'Kalınlık, kenar ölçülerinden küçük olmalıdır',
                    
                    // Malzeme grupları
                    group_structural: 'Yapı Çelikleri',
                    group_pressure: 'Basınçlı Kap Çelikleri',
                    group_stainless: 'Paslanmaz Çelikler',
                    group_nonferrous: 'Demir Dışı Metaller'
                },
                en: {
                    display_name: 'Angle Bar',
                    kenar_a_label: 'Leg A (mm)',
                    kenar_b_label: 'Leg B (mm)',
                    kalinlik_label: 'Thickness (mm)',
                    boy_label: 'Length (mm)',
                    validation_error: 'Please enter all dimension values',
                    validation_min_error: 'Dimension values must be greater than 0',
                    validation_thickness_error: 'Thickness must be less than leg dimensions',
                    
                    // Material groups
                    group_structural: 'Structural Steels',
                    group_pressure: 'Pressure Vessel Steels',
                    group_stainless: 'Stainless Steels',
                    group_nonferrous: 'Non-Ferrous Metals'
                }
            };
            
            // Malzeme listesi ve özellikleri
            this.materials = {
                // Yapı Çelikleri
                'S235JR': { 
                    density: 7850, 
                    standard: 'EN 10025-2',
                    group: 'structural'
                },
                'S275JR': { 
                    density: 7850, 
                    standard: 'EN 10025-2',
                    group: 'structural'
                },
                'S355JR': { 
                    density: 7850, 
                    standard: 'EN 10025-2',
                    group: 'structural'
                },
                'S355J2': { 
                    density: 7850, 
                    standard: 'EN 10025-2',
                    group: 'structural'
                },
                'S355K2': { 
                    density: 7850, 
                    standard: 'EN 10025-2',
                    group: 'structural'
                },
                'S460M': { 
                    density: 7850, 
                    standard: 'EN 10025-4',
                    group: 'structural'
                },
                
                // Basınçlı Kap Çelikleri
                'P235GH': { 
                    density: 7850, 
                    standard: 'EN 10028-2',
                    group: 'pressure'
                },
                'P250GH': { 
                    density: 7850, 
                    standard: 'EN 10028-2',
                    group: 'pressure'
                },
                'P265GH': { 
                    density: 7850, 
                    standard: 'EN 10028-2',
                    group: 'pressure'
                },
                'P295GH': { 
                    density: 7850, 
                    standard: 'EN 10028-2',
                    group: 'pressure'
                },
                'P355GH': { 
                    density: 7850, 
                    standard: 'EN 10028-2',
                    group: 'pressure'
                },
                'P355NL1': { 
                    density: 7850, 
                    standard: 'EN 10028-3',
                    group: 'pressure'
                },
                '16Mo3': { 
                    density: 7850, 
                    standard: 'EN 10028-2',
                    group: 'pressure'
                },
                '13CrMo4-5': { 
                    density: 7850, 
                    standard: 'EN 10028-2',
                    group: 'pressure'
                },
                
                // Paslanmaz Çelikler (AISI/EN numaraları)
                '1.4301': { 
                    density: 7900, 
                    standard: 'EN 10088-2',
                    group: 'stainless',
                    aisi: '304'
                },
                '1.4401': { 
                    density: 7980, 
                    standard: 'EN 10088-2',
                    group: 'stainless',
                    aisi: '316'
                },
                '1.4404': { 
                    density: 7980, 
                    standard: 'EN 10088-2',
                    group: 'stainless',
                    aisi: '316L'
                },
                '1.4845': { 
                    density: 7900, 
                    standard: 'EN 10088-2',
                    group: 'stainless',
                    aisi: '310S'
                },
                '1.4571': { 
                    density: 7980, 
                    standard: 'EN 10088-2',
                    group: 'stainless',
                    aisi: '316Ti'
                },
                '1.4435': { 
                    density: 7980, 
                    standard: 'EN 10088-2',
                    group: 'stainless',
                    aisi: '316L'
                },
                '1.4541': { 
                    density: 7900, 
                    standard: 'EN 10088-2',
                    group: 'stainless',
                    aisi: '321'
                },
                
                // Demir Dışı Metaller
                'Aluminyum': { 
                    density: 2700, 
                    standard: 'EN 755-2',
                    group: 'nonferrous'
                },
                'Aluminyum 5754': { 
                    density: 2670, 
                    standard: 'EN 755-2',
                    group: 'nonferrous'
                },
                'Aluminyum 5083': { 
                    density: 2660, 
                    standard: 'EN 755-2',
                    group: 'nonferrous'
                },
                'Aluminyum 6060': { 
                    density: 2700, 
                    standard: 'EN 755-2',
                    group: 'nonferrous'
                },
                'Aluminyum 6082': { 
                    density: 2710, 
                    standard: 'EN 755-2',
                    group: 'nonferrous'
                },
                'Bakir': { 
                    density: 8960, 
                    standard: 'EN 1652',
                    group: 'nonferrous'
                },
                'Pirinc': { 
                    density: 8400, 
                    standard: 'EN 1652',
                    group: 'nonferrous'
                },
                'Pirinc CuZn37': { 
                    density: 8440, 
                    standard: 'EN 1652',
                    group: 'nonferrous'
                },
                'Pirinc CuZn40': { 
                    density: 8470, 
                    standard: 'EN 1652',
                    group: 'nonferrous'
                },
                'Bronz': { 
                    density: 8800, 
                    standard: 'EN 1982',
                    group: 'nonferrous'
                },
                'Titanyum': { 
                    density: 4507, 
                    standard: 'ASTM B348',
                    group: 'nonferrous'
                },
                'Nikel': { 
                    density: 8900, 
                    standard: 'EN 10095',
                    group: 'nonferrous'
                }
            };
            
            this.grades = Object.keys(this.materials);
            this.densities = {};
            this.standards = {};
            
            // Grades listesini ve yoğunlukları oluştur
            for (const [grade, info] of Object.entries(this.materials)) {
                this.densities[grade] = info.density;
                this.standards[grade] = info.standard;
            }
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="kb_kenar_a">${this.getText('kenar_a_label')}</label>
                        <input type="number" id="kb_kenar_a" min="0.1" step="0.1" placeholder="${lang === 'tr' ? 'A kenarı' : 'Leg A'}">
                    </div>
                    <div class="form-group">
                        <label for="kb_kenar_b">${this.getText('kenar_b_label')}</label>
                        <input type="number" id="kb_kenar_b" min="0.1" step="0.1" placeholder="${lang === 'tr' ? 'B kenarı' : 'Leg B'}">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="kb_kalinlik">${this.getText('kalinlik_label')}</label>
                        <input type="number" id="kb_kalinlik" min="0.1" step="0.1" placeholder="${lang === 'tr' ? 'Kalınlık' : 'Thickness'}">
                    </div>
                    <div class="form-group">
                        <label for="kb_boy">${this.getText('boy_label')}</label>
                        <input type="number" id="kb_boy" min="0.1" step="0.1" placeholder="${lang === 'tr' ? 'Boy değeri' : 'Length value'}">
                    </div>
                </div>
            `;
        }

        getGrades() {
            // Malzemeleri gruplarına göre organize et
            const lang = this.getCurrentLanguage();
            const organizedGrades = [];
            
            const groups = {
                'structural': this.getText('group_structural'),
                'pressure': this.getText('group_pressure'),
                'stainless': this.getText('group_stainless'),
                'nonferrous': this.getText('group_nonferrous')
            };
            
            // Her grup için malzemeleri ekle
            Object.entries(groups).forEach(([groupKey, groupName]) => {
                // Grup başlığı
                organizedGrades.push({
                    value: '',
                    text: `--- ${groupName} ---`,
                    disabled: true
                });
                
                // Grup malzemeleri
                this.grades.forEach(grade => {
                    if (this.materials[grade].group === groupKey) {
                        let displayText = grade;
                        // AISI kodu varsa ekle
                        if (this.materials[grade].aisi) {
                            displayText += ` (AISI ${this.materials[grade].aisi})`;
                        }
                        // Türkçe isimleri düzelt
                        if (lang === 'tr') {
                            displayText = displayText
                                .replace('Aluminyum', 'Alüminyum')
                                .replace('Bakir', 'Bakır')
                                .replace('Pirinc', 'Pirinç');
                        }
                        organizedGrades.push({
                            value: grade,
                            text: displayText,
                            disabled: false
                        });
                    }
                });
            });
            
            return organizedGrades;
        }

        calculate(formData) {
            const kenarA = parseFloat(formData.kb_kenar_a) || 0;
            const kenarB = parseFloat(formData.kb_kenar_b) || 0;
            const kalinlik = parseFloat(formData.kb_kalinlik) || 0;
            const boy = parseFloat(formData.kb_boy) || 0;
            const adet = parseFloat(formData.adet) || 1;
            const malzemeCinsi = formData.malzemeCinsi;
            
            if (kenarA <= 0 || kenarB <= 0 || kalinlik <= 0 || boy <= 0) {
                return null;
            }
            
            const density = this.densities[malzemeCinsi] || 7850;
            
            // Köşebent kesit alanı formülü: A = t * (a + b - t)
            // Burada a ve b mm cinsinden, t de mm cinsinden
            const kesitAlaniMM2 = kalinlik * (kenarA + kenarB - kalinlik);
            
            // Kesit alanını cm²'ye çevir
            const kesitAlaniCM2 = kesitAlaniMM2 / 100;
            
            // Boy'u metre cinsine çevir
            const boyM = boy / 1000;
            
            // Hacim hesaplama (cm² * m = dm³)
            const hacimDM3 = kesitAlaniCM2 * boyM * 10;
            
            // Ağırlık hesaplama (kg)
            // Yoğunluk kg/m³ cinsinden, hacim dm³ cinsinden
            const birimAgirlik = (hacimDM3 / 1000) * density;
            const toplamAgirlik = birimAgirlik * adet;
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                suHacmi: null
            };
        }

        validate(formData) {
            // formData'dan değerleri al
            const kenarA = formData.kb_kenar_a;
            const kenarB = formData.kb_kenar_b;
            const kalinlik = formData.kb_kalinlik;
            const boy = formData.kb_boy;
            
            // Undefined, null veya boş string kontrolü
            if (kenarA === undefined || kenarA === null || kenarA === '') {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            if (kenarB === undefined || kenarB === null || kenarB === '') {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            if (kalinlik === undefined || kalinlik === null || kalinlik === '') {
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
            const kenarANum = parseFloat(kenarA);
            const kenarBNum = parseFloat(kenarB);
            const kalinlikNum = parseFloat(kalinlik);
            const boyNum = parseFloat(boy);
            
            if (isNaN(kenarANum) || isNaN(kenarBNum) || isNaN(kalinlikNum) || isNaN(boyNum)) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            // Pozitif değer kontrolü (sıfır da kabul edilmez)
            if (kenarANum <= 0 || kenarBNum <= 0 || kalinlikNum <= 0 || boyNum <= 0) {
                return {
                    isValid: false,
                    message: this.getText('validation_min_error')
                };
            }
            
            // Kalınlık kontrolü - kalınlık kenar ölçülerinden küçük olmalı
            if (kalinlikNum >= kenarANum || kalinlikNum >= kenarBNum) {
                return {
                    isValid: false,
                    message: this.getText('validation_thickness_error')
                };
            }
            
            return { isValid: true };
        }
        
        formatDimensions(formData) {
            const kenarA = parseFloat(formData.kb_kenar_a) || 0;
            const kenarB = parseFloat(formData.kb_kenar_b) || 0;
            const kalinlik = parseFloat(formData.kb_kalinlik) || 0;
            const boy = parseFloat(formData.kb_boy) || 0;
            
            const kenarAStr = kenarA % 1 === 0 ? kenarA.toString() : kenarA.toFixed(1);
            const kenarBStr = kenarB % 1 === 0 ? kenarB.toString() : kenarB.toFixed(1);
            const kalinlikStr = kalinlik % 1 === 0 ? kalinlik.toString() : kalinlik.toFixed(1);
            const boyStr = boy % 1 === 0 ? boy.toString() : boy.toFixed(1);
            
            return `L${kenarAStr} x ${kenarBStr} x ${kalinlikStr} x ${boyStr}mm`;
        }

        getDisplayName() {
            return this.getText('display_name');
        }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            
            // Malzeme türünü override et (her zaman Köşebent)
            baseRow.malzemeTuru = this.getDisplayName();
            
            // Metadata'yı genişlet
            baseRow.metadata = {
                ...baseRow.metadata,
                kosebent: {
                    kenar_a: formData.kb_kenar_a,
                    kenar_b: formData.kb_kenar_b,
                    kalinlik: formData.kb_kalinlik,
                    boy: formData.kb_boy,
                    yogunluk: this.densities[formData.malzemeCinsi]
                }
            };
            
            return baseRow;
        }

        fillFormFromRow(rowData) {
            // Temel form doldurma
            super.fillFormFromRow(rowData);
            
            const metadata = rowData.metadata?.kosebent;
            if (metadata) {
                // Metadata'dan doldur
                setTimeout(() => {
                    const kenarAElement = document.getElementById('kb_kenar_a');
                    const kenarBElement = document.getElementById('kb_kenar_b');
                    const kalinlikElement = document.getElementById('kb_kalinlik');
                    const boyElement = document.getElementById('kb_boy');
                    
                    if (kenarAElement) kenarAElement.value = metadata.kenar_a;
                    if (kenarBElement) kenarBElement.value = metadata.kenar_b;
                    if (kalinlikElement) kalinlikElement.value = metadata.kalinlik;
                    if (boyElement) boyElement.value = metadata.boy;
                }, 100);
            } else if (rowData.formData) {
                // Form data'dan doldur
                setTimeout(() => {
                    ['kb_kenar_a', 'kb_kenar_b', 'kb_kalinlik', 'kb_boy'].forEach(fieldId => {
                        const element = document.getElementById(fieldId);
                        if (element && rowData.formData[fieldId]) {
                            element.value = rowData.formData[fieldId];
                        }
                    });
                }, 100);
            }
            
            return true;
        }

        updateGradeDropdown() {
            const malzemeCinsiSelect = document.getElementById('malzemeCinsi');
            if (!malzemeCinsiSelect) return;
            
            const currentValue = malzemeCinsiSelect.value;
            malzemeCinsiSelect.innerHTML = '';
            
            const grades = this.getGrades();
            grades.forEach(gradeInfo => {
                const option = document.createElement('option');
                option.value = gradeInfo.value;
                option.textContent = gradeInfo.text;
                option.disabled = gradeInfo.disabled;
                
                if (gradeInfo.disabled) {
                    option.style.fontWeight = 'bold';
                    option.style.color = '#667eea';
                }
                
                malzemeCinsiSelect.appendChild(option);
            });
            
            // Önceki değeri geri yükle
            if (currentValue && this.grades.includes(currentValue)) {
                malzemeCinsiSelect.value = currentValue;
            }
        }
    }

    // Modülü kaydet ve başlat
    const kosebentMaterial = new KosebentMaterial();
    kosebentMaterial.register();
    
    // Override getGrades fonksiyonunu özelleştirilmiş versiyonla
    const originalGetGrades = kosebentMaterial.getGrades.bind(kosebentMaterial);
    kosebentMaterial.getGrades = function() {
        const grades = originalGetGrades();
        // Eğer sadece string array dönmesi gerekiyorsa
        if (this.returnSimpleArray) {
            return grades.filter(g => !g.disabled).map(g => g.value);
        }
        return grades;
    };
    
    console.log('Köşebent modülü v1.0.0 yüklendi');

})(window);