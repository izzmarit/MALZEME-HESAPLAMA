/**
 * MÜHENDİSLİK PLASTİKLERİ Malzeme Modülü
 * Versiyon: 2.0.0
 * Genişletilmiş malzeme listesi ile plaka ve çubuk formunda mühendislik plastikleri hesaplama modülü
 * Ticari isimler ve endüstri standartları dahil edilmiştir
 */

(function(window) {
    'use strict';
    
    class EngineeringPlasticsMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'engineering_plastics';
            this.version = '2.0.0';
            
            this.texts = {
                tr: {
                    display_name: 'Mühendislik Plastikleri',
                    
                    // Etiketler
                    sekil_label: 'Şekil',
                    malzeme_tipi_label: 'Malzeme Tipi',
                    en_label: 'En (mm)',
                    boy_label: 'Boy (mm)',
                    kalinlik_label: 'Kalınlık (mm)',
                    cap_label: 'Çap (Ø mm)',
                    uzunluk_label: 'Uzunluk (mm)',
                    
                    // Şekiller
                    plaka: 'Plaka',
                    cubuk: 'Çubuk',
                    
                    // Tabloda gösterilecek
                    plaka_display: 'Plaka',
                    cubuk_display: 'Çubuk',
                    
                    // Malzeme Grupları
                    group_polyolefin: 'Poliolefin Grubu (PE Bazlı)',
                    group_polyamide: 'Poliamid Grubu (Naylon Bazlı)',
                    group_acetal: 'Poliasetal Grubu (POM Bazlı)',
                    group_fluoropolymer: 'Fluoropolymer Grubu',
                    group_high_performance: 'Yüksek Performans Plastikler',
                    group_engineering: 'Standart Mühendislik Plastikleri',
                    group_composite: 'Kompozit ve Dolgulu Plastikler',
                    
                    // Validasyon
                    validation_error: 'Lütfen tüm ölçü değerlerini girin',
                    validation_min_error: 'Ölçü değerleri 0\'dan büyük olmalıdır'
                },
                en: {
                    display_name: 'Engineering Plastics',
                    
                    // Labels
                    sekil_label: 'Shape',
                    malzeme_tipi_label: 'Material Type',
                    en_label: 'Width (mm)',
                    boy_label: 'Length (mm)',
                    kalinlik_label: 'Thickness (mm)',
                    cap_label: 'Diameter (Ø mm)',
                    uzunluk_label: 'Length (mm)',
                    
                    // Shapes
                    plaka: 'Plate',
                    cubuk: 'Rod',
                    
                    // Display names
                    plaka_display: 'Plate',
                    cubuk_display: 'Rod',
                    
                    // Material Groups
                    group_polyolefin: 'Polyolefin Group (PE Based)',
                    group_polyamide: 'Polyamide Group (Nylon Based)',
                    group_acetal: 'Polyacetal Group (POM Based)',
                    group_fluoropolymer: 'Fluoropolymer Group',
                    group_high_performance: 'High Performance Plastics',
                    group_engineering: 'Standard Engineering Plastics',
                    group_composite: 'Composite and Filled Plastics',
                    
                    // Validation
                    validation_error: 'Please enter all dimension values',
                    validation_min_error: 'Dimension values must be greater than 0'
                }
            };
            
            // Malzeme özellikleri (kg/m³ cinsinden yoğunluk)
            this.materials = {
                // ===== POLİOLEFİN GRUBU (PE BAZLI) =====
                'Ulpolen (UHMW-PE)': { 
                    density: 930, 
                    standard: 'DIN 53479 / ISO 11542-2',
                    group: 'polyolefin',
                    description: 'Ultra Yüksek Moleküler Ağırlıklı Polietilen'
                },
                'PE-UHMW': { 
                    density: 930, 
                    standard: 'ASTM D4020 / ISO 11542',
                    group: 'polyolefin',
                    description: 'Ultra High Molecular Weight PE'
                },
                'Alpolen (HDPE)': { 
                    density: 950, 
                    standard: 'DIN 16972 / ISO 1872-2',
                    group: 'polyolefin',
                    description: 'Yüksek Yoğunluklu Polietilen'
                },
                'PE-HD (HDPE)': { 
                    density: 950, 
                    standard: 'ASTM D3350 / ISO 1872',
                    group: 'polyolefin',
                    description: 'High Density Polyethylene'
                },
                'PE-500': { 
                    density: 945, 
                    standard: 'DIN 53479-1',
                    group: 'polyolefin',
                    description: 'Yüksek Yoğunluklu PE 500'
                },
                'PE-1000': { 
                    density: 935, 
                    standard: 'DIN 53479-1',
                    group: 'polyolefin',
                    description: 'Ultra Yüksek MW PE 1000'
                },
                
                // ===== POLİAMİD GRUBU (NAYLON BAZLI) =====
                'Kestamit (PA6 Cast)': { 
                    density: 1150, 
                    standard: 'DIN 16889 / ISO 16020',
                    group: 'polyamide',
                    description: 'Döküm Naylon 6'
                },
                'Ertalon 6 SA': { 
                    density: 1140, 
                    standard: 'ISO 16020 / DIN 16889',
                    group: 'polyamide',
                    description: 'PA6-G Naylon 6 Cast'
                },
                'Tecamid 6 (PA6)': { 
                    density: 1140, 
                    standard: 'ISO 1874-2',
                    group: 'polyamide',
                    description: 'Ekstrüzyon Naylon 6'
                },
                'PA6-G (Cast Nylon)': { 
                    density: 1150, 
                    standard: 'ISO 16020',
                    group: 'polyamide',
                    description: 'Döküm Naylon 6'
                },
                'PA66 (Naylon 66)': { 
                    density: 1140, 
                    standard: 'ASTM D789 / ISO 1874',
                    group: 'polyamide',
                    description: 'Naylon 66'
                },
                'Ertalon 66 SA': { 
                    density: 1140, 
                    standard: 'ISO 1874-2',
                    group: 'polyamide',
                    description: 'PA66 Naylon 66'
                },
                'PA12 (Naylon 12)': { 
                    density: 1010, 
                    standard: 'ISO 1874-2 / DIN 16946',
                    group: 'polyamide',
                    description: 'Naylon 12'
                },
                'PA11 (Naylon 11)': { 
                    density: 1030, 
                    standard: 'ISO 1874-2',
                    group: 'polyamide',
                    description: 'Naylon 11'
                },
                'Nylatron NSM (PA6 + MoS2)': { 
                    density: 1160, 
                    standard: 'ISO 16020',
                    group: 'polyamide',
                    description: 'MoS2 Dolgulu Naylon 6'
                },
                'Nylatron GSM (PA6 + Grafit)': { 
                    density: 1170, 
                    standard: 'ISO 16020',
                    group: 'polyamide',
                    description: 'Grafit Dolgulu Naylon 6'
                },
                
                // ===== POLİASETAL GRUBU (POM BAZLI) =====
                'Delrin (POM-C)': { 
                    density: 1420, 
                    standard: 'ASTM D6100 / DIN 16781',
                    group: 'acetal',
                    description: 'POM Copolymer'
                },
                'Hostaform (POM-C)': { 
                    density: 1410, 
                    standard: 'ISO 9988 / DIN 16781',
                    group: 'acetal',
                    description: 'POM Copolymer'
                },
                'Ultraform (POM-C)': { 
                    density: 1410, 
                    standard: 'ISO 9988',
                    group: 'acetal',
                    description: 'POM Copolymer'
                },
                'POM-H (Homopolymer)': { 
                    density: 1410, 
                    standard: 'ISO 9988 / DIN 16781',
                    group: 'acetal',
                    description: 'POM Homopolymer'
                },
                'Tecaform AH (POM-H)': { 
                    density: 1410, 
                    standard: 'ISO 9988',
                    group: 'acetal',
                    description: 'POM Homopolymer'
                },
                
                // ===== FLUOROPOLYMER GRUBU =====
                'PTFE (Teflon)': { 
                    density: 2150, 
                    standard: 'ASTM D4894 / ISO 12086',
                    group: 'fluoropolymer',
                    description: 'Politetrafloroetilen'
                },
                'Teflon (PTFE)': { 
                    density: 2150, 
                    standard: 'ASTM D4894 / ISO 12086',
                    group: 'fluoropolymer',
                    description: 'Politetrafloroetilen'
                },
                'PVDF (Kynar)': { 
                    density: 1780, 
                    standard: 'ASTM D3222 / ISO 12086',
                    group: 'fluoropolymer',
                    description: 'Polivinilidenflorür'
                },
                'PFA': { 
                    density: 2150, 
                    standard: 'ASTM D3307 / ISO 12086',
                    group: 'fluoropolymer',
                    description: 'Perfluoroalkoxy'
                },
                'FEP': { 
                    density: 2150, 
                    standard: 'ASTM D2116',
                    group: 'fluoropolymer',
                    description: 'Fluorinated Ethylene Propylene'
                },
                'ETFE': { 
                    density: 1700, 
                    standard: 'ASTM D3159',
                    group: 'fluoropolymer',
                    description: 'Ethylene Tetrafluoroethylene'
                },
                
                // ===== YÜKSEK PERFORMANS PLASTİKLER =====
                'PEEK': { 
                    density: 1320, 
                    standard: 'ASTM D6262 / ISO 19066',
                    group: 'high_performance',
                    description: 'Polyetheretherketone'
                },
                'Victrex PEEK': { 
                    density: 1320, 
                    standard: 'ISO 19066',
                    group: 'high_performance',
                    description: 'Polyetheretherketone'
                },
                'PEI (Ultem)': { 
                    density: 1270, 
                    standard: 'ASTM D5205 / ISO 16396',
                    group: 'high_performance',
                    description: 'Polyetherimide'
                },
                'Ultem (PEI)': { 
                    density: 1270, 
                    standard: 'ISO 16396',
                    group: 'high_performance',
                    description: 'Polyetherimide'
                },
                'PPS (Ryton)': { 
                    density: 1350, 
                    standard: 'ASTM D6756 / ISO 20558',
                    group: 'high_performance',
                    description: 'Polyphenylene Sulfide'
                },
                'Torlon (PAI)': { 
                    density: 1420, 
                    standard: 'ASTM D5205',
                    group: 'high_performance',
                    description: 'Polyamide-Imide'
                },
                'Vespel (PI)': { 
                    density: 1430, 
                    standard: 'ASTM D5205',
                    group: 'high_performance',
                    description: 'Polyimide'
                },
                'PPSU (Radel)': { 
                    density: 1290, 
                    standard: 'ISO 25137',
                    group: 'high_performance',
                    description: 'Polyphenylsulfone'
                },
                'PSU (Udel)': { 
                    density: 1240, 
                    standard: 'ASTM D3801 / ISO 25137',
                    group: 'high_performance',
                    description: 'Polysulfone'
                },
                'PES': { 
                    density: 1370, 
                    standard: 'ISO 25137',
                    group: 'high_performance',
                    description: 'Polyethersulfone'
                },
                
                // ===== STANDART MÜHENDİSLİK PLASTİKLERİ =====
                'PP (Polipropilen)': { 
                    density: 900, 
                    standard: 'ASTM D4101 / ISO 1873',
                    group: 'engineering',
                    description: 'Polipropilen'
                },
                'PP-H (Homopolymer)': { 
                    density: 905, 
                    standard: 'ISO 1873-1',
                    group: 'engineering',
                    description: 'Polipropilen Homopolymer'
                },
                'PVC-U (Sert PVC)': { 
                    density: 1400, 
                    standard: 'ASTM D1784 / ISO 1163',
                    group: 'engineering',
                    description: 'Unplasticized Polyvinyl Chloride'
                },
                'PC (Polikarbonat)': { 
                    density: 1200, 
                    standard: 'ASTM D3935 / ISO 7391',
                    group: 'engineering',
                    description: 'Polikarbonat'
                },
                'Makrolon (PC)': { 
                    density: 1200, 
                    standard: 'ISO 7391',
                    group: 'engineering',
                    description: 'Polikarbonat'
                },
                'ABS': { 
                    density: 1050, 
                    standard: 'ASTM D3965 / ISO 2580',
                    group: 'engineering',
                    description: 'Acrylonitrile Butadiene Styrene'
                },
                'PET (Polyester)': { 
                    density: 1350, 
                    standard: 'ASTM D4976 / ISO 8297',
                    group: 'engineering',
                    description: 'Polyethylene Terephthalate'
                },
                'Ertalyte (PET-P)': { 
                    density: 1380, 
                    standard: 'ISO 16396',
                    group: 'engineering',
                    description: 'Modified PET'
                },
                
                // ===== KOMPOZİT VE DOLGULU PLASTİKLER =====
                'PA6 + Cam Elyaf (30%)': { 
                    density: 1380, 
                    standard: 'ISO 1874-2',
                    group: 'composite',
                    description: 'Cam Elyaf Takviyeli Naylon 6'
                },
                'PEEK + Karbon Elyaf': { 
                    density: 1440, 
                    standard: 'ISO 19066',
                    group: 'composite',
                    description: 'Karbon Elyaf Takviyeli PEEK'
                },
                'POM + PTFE': { 
                    density: 1500, 
                    standard: 'ISO 9988',
                    group: 'composite',
                    description: 'PTFE Dolgulu POM'
                },
                'PC + ABS': { 
                    density: 1150, 
                    standard: 'ASTM D3935',
                    group: 'composite',
                    description: 'PC/ABS Alaşımı'
                }
            };
            
            this.setupEventHandlers();
        }

        setupEventHandlers() {
            const self = this;
            
            window.EngineeringPlasticsHandlers = {
                onSekilChange: function() {
                    self.updateDimensionFields();
                }
            };
        }

        updateDimensionFields() {
            const sekil = document.getElementById('ep_sekil')?.value;
            const plakaFields = document.getElementById('plaka_fields');
            const cubukFields = document.getElementById('cubuk_fields');
            
            if (!plakaFields || !cubukFields) return;
            
            if (sekil === 'plaka') {
                plakaFields.style.display = 'block';
                cubukFields.style.display = 'none';
            } else if (sekil === 'cubuk') {
                plakaFields.style.display = 'none';
                cubukFields.style.display = 'block';
            } else {
                plakaFields.style.display = 'none';
                cubukFields.style.display = 'none';
            }
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="ep_sekil">${this.getText('sekil_label')}</label>
                        <select id="ep_sekil" onchange="window.EngineeringPlasticsHandlers.onSekilChange()">
                            <option value="">${lang === 'tr' ? 'Şekil seçin...' : 'Select shape...'}</option>
                            <option value="plaka">${this.getText('plaka')}</option>
                            <option value="cubuk">${this.getText('cubuk')}</option>
                        </select>
                    </div>
                </div>
                
                <div id="plaka_fields" style="display: none;">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="ep_plaka_en">${this.getText('en_label')}</label>
                            <input type="number" id="ep_plaka_en" min="0.1" step="0.1" placeholder="${lang === 'tr' ? 'En değeri' : 'Width value'}">
                        </div>
                        <div class="form-group">
                            <label for="ep_plaka_boy">${this.getText('boy_label')}</label>
                            <input type="number" id="ep_plaka_boy" min="0.1" step="0.1" placeholder="${lang === 'tr' ? 'Boy değeri' : 'Length value'}">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="ep_plaka_kalinlik">${this.getText('kalinlik_label')}</label>
                            <input type="number" id="ep_plaka_kalinlik" min="0.1" step="0.1" placeholder="${lang === 'tr' ? 'Kalınlık değeri' : 'Thickness value'}">
                        </div>
                    </div>
                </div>
                
                <div id="cubuk_fields" style="display: none;">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="ep_cubuk_cap">${this.getText('cap_label')}</label>
                            <input type="number" id="ep_cubuk_cap" min="0.1" step="0.1" placeholder="${lang === 'tr' ? 'Çap değeri' : 'Diameter value'}">
                        </div>
                        <div class="form-group">
                            <label for="ep_cubuk_uzunluk">${this.getText('uzunluk_label')}</label>
                            <input type="number" id="ep_cubuk_uzunluk" min="0.1" step="0.1" placeholder="${lang === 'tr' ? 'Uzunluk değeri' : 'Length value'}">
                        </div>
                    </div>
                </div>
            `;
        }

        getGrades() {
            const organizedGrades = [];
            
            const groups = {
                'polyolefin': this.getText('group_polyolefin'),
                'polyamide': this.getText('group_polyamide'),
                'acetal': this.getText('group_acetal'),
                'fluoropolymer': this.getText('group_fluoropolymer'),
                'high_performance': this.getText('group_high_performance'),
                'engineering': this.getText('group_engineering'),
                'composite': this.getText('group_composite')
            };
            
            Object.entries(groups).forEach(([groupKey, groupName]) => {
                const groupMaterials = Object.keys(this.materials).filter(
                    mat => this.materials[mat].group === groupKey
                );
                
                if (groupMaterials.length > 0) {
                    organizedGrades.push({
                        value: '',
                        text: `--- ${groupName} ---`,
                        disabled: true
                    });
                    
                    groupMaterials.forEach(material => {
                        organizedGrades.push({
                            value: material,
                            text: material,
                            disabled: false
                        });
                    });
                }
            });
            
            return organizedGrades;
        }

        getDensity(grade) {
            return this.materials[grade]?.density || 1200;
        }

        getStandard(grade) {
            return this.materials[grade]?.standard || '-';
        }

        calculate(formData) {
            const sekil = formData.ep_sekil;
            const malzemeCinsi = formData.malzemeCinsi;
            const adet = parseFloat(formData.adet) || 1;
            
            if (!sekil || !malzemeCinsi) {
                return null;
            }
            
            const density = this.getDensity(malzemeCinsi);
            let hacimM3 = 0;
            
            if (sekil === 'plaka') {
                const en = parseFloat(formData.ep_plaka_en) || 0;
                const boy = parseFloat(formData.ep_plaka_boy) || 0;
                const kalinlik = parseFloat(formData.ep_plaka_kalinlik) || 0;
                
                if (en <= 0 || boy <= 0 || kalinlik <= 0) {
                    return null;
                }
                
                hacimM3 = (en * boy * kalinlik) / 1000000000;
                
            } else if (sekil === 'cubuk') {
                const cap = parseFloat(formData.ep_cubuk_cap) || 0;
                const uzunluk = parseFloat(formData.ep_cubuk_uzunluk) || 0;
                
                if (cap <= 0 || uzunluk <= 0) {
                    return null;
                }
                
                const yaricap = cap / 2;
                hacimM3 = (Math.PI * yaricap * yaricap * uzunluk) / 1000000000;
            }
            
            const birimAgirlik = hacimM3 * density;
            const toplamAgirlik = birimAgirlik * adet;
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                suHacmi: null
            };
        }

        validate(formData) {
            const sekil = formData.ep_sekil;
            
            if (!sekil) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            if (sekil === 'plaka') {
                const en = formData.ep_plaka_en;
                const boy = formData.ep_plaka_boy;
                const kalinlik = formData.ep_plaka_kalinlik;
                
                if (en === undefined || boy === undefined || kalinlik === undefined ||
                    en === null || boy === null || kalinlik === null ||
                    en === '' || boy === '' || kalinlik === '') {
                    return {
                        isValid: false,
                        message: this.getText('validation_error')
                    };
                }
                
                const enNum = parseFloat(en);
                const boyNum = parseFloat(boy);
                const kalinlikNum = parseFloat(kalinlik);
                
                if (isNaN(enNum) || isNaN(boyNum) || isNaN(kalinlikNum)) {
                    return {
                        isValid: false,
                        message: this.getText('validation_error')
                    };
                }
                
                if (enNum <= 0 || boyNum <= 0 || kalinlikNum <= 0) {
                    return {
                        isValid: false,
                        message: this.getText('validation_min_error')
                    };
                }
                
            } else if (sekil === 'cubuk') {
                const cap = formData.ep_cubuk_cap;
                const uzunluk = formData.ep_cubuk_uzunluk;
                
                if (cap === undefined || uzunluk === undefined ||
                    cap === null || uzunluk === null ||
                    cap === '' || uzunluk === '') {
                    return {
                        isValid: false,
                        message: this.getText('validation_error')
                    };
                }
                
                const capNum = parseFloat(cap);
                const uzunlukNum = parseFloat(uzunluk);
                
                if (isNaN(capNum) || isNaN(uzunlukNum)) {
                    return {
                        isValid: false,
                        message: this.getText('validation_error')
                    };
                }
                
                if (capNum <= 0 || uzunlukNum <= 0) {
                    return {
                        isValid: false,
                        message: this.getText('validation_min_error')
                    };
                }
            }
            
            return { isValid: true };
        }

        formatDimensions(formData) {
            const sekil = formData.ep_sekil;
            
            if (sekil === 'plaka') {
                const en = parseFloat(formData.ep_plaka_en) || 0;
                const boy = parseFloat(formData.ep_plaka_boy) || 0;
                const kalinlik = parseFloat(formData.ep_plaka_kalinlik) || 0;
                
                const enStr = en % 1 === 0 ? en.toString() : en.toFixed(1);
                const boyStr = boy % 1 === 0 ? boy.toString() : boy.toFixed(1);
                const kalinlikStr = kalinlik % 1 === 0 ? kalinlik.toString() : kalinlik.toFixed(1);
                
                return `${enStr} x ${boyStr} x ${kalinlikStr}mm`;
                
            } else if (sekil === 'cubuk') {
                const cap = parseFloat(formData.ep_cubuk_cap) || 0;
                const uzunluk = parseFloat(formData.ep_cubuk_uzunluk) || 0;
                
                const capStr = cap % 1 === 0 ? cap.toString() : cap.toFixed(1);
                const uzunlukStr = uzunluk % 1 === 0 ? uzunluk.toString() : uzunluk.toFixed(1);
                
                return `Ø${capStr} x ${uzunlukStr}mm`;
            }
            
            return '-';
        }

        hasWaterVolume() {
            return false;
        }

        getDisplayName() {
            return this.getText('display_name');
        }

        getDisplayTypeFromRow(rowData) {
            const metadata = rowData.metadata?.engineering_plastics;
            if (!metadata || !metadata.sekil) {
                return this.getDisplayName();
            }
            
            const malzemeCinsi = rowData.malzemeCinsi || rowData.originalGrade || '';
            const sekilDisplay = this.getText(`${metadata.sekil}_display`);
            
            return `${malzemeCinsi} ${sekilDisplay}`;
        }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            const sekil = formData.ep_sekil;
            const malzemeCinsi = formData.malzemeCinsi;
            
            const sekilDisplay = this.getText(`${sekil}_display`);
            baseRow.malzemeTuru = `${malzemeCinsi} ${sekilDisplay}`;
            baseRow.malzemeCinsi = malzemeCinsi;
            baseRow.enNormu = this.getStandard(malzemeCinsi);
            
            baseRow.metadata = {
                ...baseRow.metadata,
                engineering_plastics: {
                    sekil: formData.ep_sekil,
                    plaka_en: formData.ep_plaka_en,
                    plaka_boy: formData.ep_plaka_boy,
                    plaka_kalinlik: formData.ep_plaka_kalinlik,
                    cubuk_cap: formData.ep_cubuk_cap,
                    cubuk_uzunluk: formData.ep_cubuk_uzunluk
                }
            };
            
            return baseRow;
        }

        fillFormFromRow(rowData) {
            super.fillFormFromRow(rowData);
            
            const metadata = rowData.metadata?.engineering_plastics;
            if (!metadata) {
                if (rowData.formData) {
                    this.fillFromFormData(rowData.formData);
                }
                return true;
            }
            
            setTimeout(() => {
                if (metadata.sekil) {
                    document.getElementById('ep_sekil').value = metadata.sekil;
                    window.EngineeringPlasticsHandlers.onSekilChange();
                }
                
                setTimeout(() => {
                    if (metadata.sekil === 'plaka') {
                        if (metadata.plaka_en) {
                            const el = document.getElementById('ep_plaka_en');
                            if (el) el.value = metadata.plaka_en;
                        }
                        if (metadata.plaka_boy) {
                            const el = document.getElementById('ep_plaka_boy');
                            if (el) el.value = metadata.plaka_boy;
                        }
                        if (metadata.plaka_kalinlik) {
                            const el = document.getElementById('ep_plaka_kalinlik');
                            if (el) el.value = metadata.plaka_kalinlik;
                        }
                    } else if (metadata.sekil === 'cubuk') {
                        if (metadata.cubuk_cap) {
                            const el = document.getElementById('ep_cubuk_cap');
                            if (el) el.value = metadata.cubuk_cap;
                        }
                        if (metadata.cubuk_uzunluk) {
                            const el = document.getElementById('ep_cubuk_uzunluk');
                            if (el) el.value = metadata.cubuk_uzunluk;
                        }
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
                        
                        if (key === 'ep_sekil') {
                            window.EngineeringPlasticsHandlers.onSekilChange();
                        }
                    }
                });
            }, 100);
        }
    }

    const engineeringPlasticsMaterial = new EngineeringPlasticsMaterial();
    engineeringPlasticsMaterial.register();
    
    console.log('Mühendislik Plastikleri modülü v2.0.0 yüklendi (45 malzeme tipi)');

})(window);