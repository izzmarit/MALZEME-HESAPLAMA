/**
 * SAC PLAKA Malzeme Modülü
 * Versiyon: 1.0.0
 * Sac plaka hesaplama modülü - EN standartları ile
 */

(function(window) {
    'use strict';
    
    class SacPlakaMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'sacPlaka';
            this.version = '1.0.0';
            
            this.texts = {
                tr: {
                    display_name: 'Sac Plaka',
                    en_label: 'En (mm)',
                    boy_label: 'Boy (mm)',
                    kalinlik_label: 'Kalınlık (mm)',
                    validation_error: 'Lütfen tüm ölçü değerlerini girin',
                    validation_min_error: 'Ölçü değerleri 0\'dan büyük olmalıdır',
                    
                    // Malzeme grupları
                    group_structural: 'Yapı Çelikleri',
                    group_pressure: 'Basınçlı Kap Çelikleri',
                    group_stainless: 'Paslanmaz Çelikler',
                    group_nonferrous: 'Demir Dışı Metaller'
                },
                en: {
                    display_name: 'Sheet Plate',
                    en_label: 'Width (mm)',
                    boy_label: 'Length (mm)',
                    kalinlik_label: 'Thickness (mm)',
                    validation_error: 'Please enter all dimension values',
                    validation_min_error: 'Dimension values must be greater than 0',
                    
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
                
                // Demir Dışı Metaller
                'Aluminyum': { 
                    density: 2700, 
                    standard: 'EN 485-2',
                    group: 'nonferrous'
                },
                'Aluminyum 5754': { 
                    density: 2670, 
                    standard: 'EN 485-2',
                    group: 'nonferrous'
                },
                'Aluminyum 5083': { 
                    density: 2660, 
                    standard: 'EN 485-2',
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
                'Bronz': { 
                    density: 8800, 
                    standard: 'EN 1982',
                    group: 'nonferrous'
                },
                'Titanyum': { 
                    density: 4507, 
                    standard: 'ASTM B265',
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
                        <label for="sp_en">${this.getText('en_label')}</label>
                        <input type="number" id="sp_en" min="0.1" step="0.1" placeholder="${lang === 'tr' ? 'En değeri' : 'Width value'}">
                    </div>
                    <div class="form-group">
                        <label for="sp_boy">${this.getText('boy_label')}</label>
                        <input type="number" id="sp_boy" min="0.1" step="0.1" placeholder="${lang === 'tr' ? 'Boy değeri' : 'Length value'}">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="sp_kalinlik">${this.getText('kalinlik_label')}</label>
                        <input type="number" id="sp_kalinlik" min="0.1" step="0.01" placeholder="${lang === 'tr' ? 'Kalınlık değeri' : 'Thickness value'}">
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
            const en = parseFloat(formData.sp_en) || 0;
            const boy = parseFloat(formData.sp_boy) || 0;
            const kalinlik = parseFloat(formData.sp_kalinlik) || 0;
            const adet = parseFloat(formData.adet) || 1;
            const malzemeCinsi = formData.malzemeCinsi;
            
            if (en <= 0 || boy <= 0 || kalinlik <= 0) {
                return null;
            }
            
            const density = this.densities[malzemeCinsi] || 7850;
            
            // Hacim hesaplama (mm³ -> m³ dönüşümü)
            const hacimM3 = (en * boy * kalinlik) / 1000000000;
            
            // Ağırlık hesaplama (kg)
            const birimAgirlik = hacimM3 * density;
            const toplamAgirlik = birimAgirlik * adet;
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                suHacmi: null
            };
        }

        validate(formData) {
            // formData'dan değerleri al
            const en = formData.sp_en;
            const boy = formData.sp_boy;
            const kalinlik = formData.sp_kalinlik;
            
            // Undefined, null veya boş string kontrolü
            if (en === undefined || en === null || en === '') {
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
            
            if (kalinlik === undefined || kalinlik === null || kalinlik === '') {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            // Sayısal değer kontrolü
            const enNum = parseFloat(en);
            const boyNum = parseFloat(boy);
            const kalinlikNum = parseFloat(kalinlik);
            
            if (isNaN(enNum) || isNaN(boyNum) || isNaN(kalinlikNum)) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            // Pozitif değer kontrolü (sıfır da kabul edilmez)
            if (enNum <= 0 || boyNum <= 0 || kalinlikNum <= 0) {
                return {
                    isValid: false,
                    message: this.getText('validation_min_error')
                };
            }
            
            return { isValid: true };
        }
        
        formatDimensions(formData) {
            const en = parseFloat(formData.sp_en) || 0;
            const boy = parseFloat(formData.sp_boy) || 0;
            const kalinlik = parseFloat(formData.sp_kalinlik) || 0;
            
            const enStr = en % 1 === 0 ? en.toString() : en.toFixed(1);
            const boyStr = boy % 1 === 0 ? boy.toString() : boy.toFixed(1);
            const kalinlikStr = kalinlik % 1 === 0 ? kalinlik.toString() : kalinlik.toFixed(2);
            
            return `${enStr} x ${boyStr} x ${kalinlikStr}mm`;
        }

        getDisplayName() {
            return this.getText('display_name');
        }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            
            // Malzeme türünü override et (her zaman Sac Plaka)
            baseRow.malzemeTuru = this.getDisplayName();
            
            // Metadata'yı genişlet
            baseRow.metadata = {
                ...baseRow.metadata,
                sacPlaka: {
                    en: formData.sp_en,
                    boy: formData.sp_boy,
                    kalinlik: formData.sp_kalinlik,
                    yogunluk: this.densities[formData.malzemeCinsi]
                }
            };
            
            return baseRow;
        }

        fillFormFromRow(rowData) {
            // Temel form doldurma
            super.fillFormFromRow(rowData);
            
            const metadata = rowData.metadata?.sacPlaka;
            if (metadata) {
                // Metadata'dan doldur
                setTimeout(() => {
                    const enElement = document.getElementById('sp_en');
                    const boyElement = document.getElementById('sp_boy');
                    const kalinlikElement = document.getElementById('sp_kalinlik');
                    
                    if (enElement) enElement.value = metadata.en;
                    if (boyElement) boyElement.value = metadata.boy;
                    if (kalinlikElement) kalinlikElement.value = metadata.kalinlik;
                }, 100);
            } else if (rowData.formData) {
                // Form data'dan doldur
                setTimeout(() => {
                    ['sp_en', 'sp_boy', 'sp_kalinlik'].forEach(fieldId => {
                        const element = document.getElementById(fieldId);
                        if (element && rowData.formData[fieldId]) {
                            element.value = rowData.formData[fieldId];
                        }
                    });
                }, 100);
            }
            
            return true;
        }

        // MaterialRegistry güncellendiğinde malzeme cinsi dropdown'ı özelleştir
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
    const sacPlakaMaterial = new SacPlakaMaterial();
    sacPlakaMaterial.register();
    
    // Override getGrades fonksiyonunu özelleştirilmiş versiyonla
    const originalGetGrades = sacPlakaMaterial.getGrades.bind(sacPlakaMaterial);
    sacPlakaMaterial.getGrades = function() {
        const grades = originalGetGrades();
        // Eğer sadece string array dönmesi gerekiyorsa
        if (this.returnSimpleArray) {
            return grades.filter(g => !g.disabled).map(g => g.value);
        }
        return grades;
    };
    
    console.log('Sac Plaka modülü v1.0.0 yüklendi');

})(window);