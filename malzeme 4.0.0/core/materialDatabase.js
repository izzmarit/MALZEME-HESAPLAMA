/**
 * Malzeme Veritabanı
 * Tüm modüllerde kullanılan malzemelerin detaylı bilgileri
 */

(function(window) {
    'use strict';
    
    const MaterialDatabase = {
        categories: {
            structural_steels: {
                name_tr: 'Yapı Çelikleri',
                name_en: 'Structural Steels',
                description_tr: 'Genel yapı ve konstrüksiyon uygulamalarında kullanılan çelikler',
                description_en: 'Steels used in general construction and structural applications',
                materials: {
                    'S235JR': {
                        standard: 'EN 10025-2',
                        density: 7850,
                        yield: '235 MPa',
                        usage_tr: 'Genel yapı elemanları, hafif yük taşıyan konstrüksiyonlar',
                        usage_en: 'General structural elements, light load bearing constructions',
                        temperature: '-20°C / +300°C'
                    },
                    'S275JR': {
                        standard: 'EN 10025-2',
                        density: 7850,
                        yield: '275 MPa',
                        usage_tr: 'Orta dayanımlı yapı elemanları, köprü konstrüksiyonları',
                        usage_en: 'Medium strength structural elements, bridge constructions',
                        temperature: '-20°C / +300°C'
                    },
                    'S355JR': {
                        standard: 'EN 10025-2',
                        density: 7850,
                        yield: '355 MPa',
                        usage_tr: 'Yüksek dayanımlı yapılar, ağır yük taşıyan konstrüksiyonlar',
                        usage_en: 'High strength structures, heavy load bearing constructions',
                        temperature: '-20°C / +300°C'
                    },
                    'S355J2': {
                        standard: 'EN 10025-2',
                        density: 7850,
                        yield: '355 MPa',
                        usage_tr: 'Düşük sıcaklıkta darbe dayanımı gereken yapılar',
                        usage_en: 'Structures requiring impact resistance at low temperatures',
                        temperature: '-20°C / +300°C'
                    }
                }
            },
            
            pressure_vessel_steels: {
                name_tr: 'Basınçlı Kap Çelikleri',
                name_en: 'Pressure Vessel Steels',
                description_tr: 'Basınçlı kap, kazan ve boru hatlarında kullanılan özel çelikler',
                description_en: 'Special steels used in pressure vessels, boilers and pipelines',
                materials: {
                    'P235GH': {
                        standard: 'EN 10028-2',
                        density: 7850,
                        yield: '235 MPa',
                        usage_tr: 'Düşük basınçlı kaplar, ısı eşanjörleri',
                        usage_en: 'Low pressure vessels, heat exchangers',
                        temperature: '-10°C / +400°C'
                    },
                    'P265GH': {
                        standard: 'EN 10028-2',
                        density: 7850,
                        yield: '265 MPa',
                        usage_tr: 'Orta basınçlı kaplar, buhar kazanları',
                        usage_en: 'Medium pressure vessels, steam boilers',
                        temperature: '-10°C / +400°C'
                    },
                    'P295GH': {
                        standard: 'EN 10028-2',
                        density: 7850,
                        yield: '295 MPa',
                        usage_tr: 'Yüksek basınçlı kaplar, endüstriyel kazanlar',
                        usage_en: 'High pressure vessels, industrial boilers',
                        temperature: '-10°C / +425°C'
                    },
                    'P355GH': {
                        standard: 'EN 10028-2',
                        density: 7850,
                        yield: '355 MPa',
                        usage_tr: 'Yüksek basınç ve sıcaklıktaki kaplar',
                        usage_en: 'High pressure and temperature vessels',
                        temperature: '-10°C / +425°C'
                    },
                    '16Mo3': {
                        standard: 'EN 10028-2',
                        density: 7850,
                        yield: '280 MPa',
                        usage_tr: 'Yüksek sıcaklık uygulamaları, petrokimya',
                        usage_en: 'High temperature applications, petrochemical',
                        temperature: '-10°C / +530°C'
                    },
                    '13CrMo4-5': {
                        standard: 'EN 10028-2',
                        density: 7850,
                        yield: '290 MPa',
                        usage_tr: 'Yüksek sıcaklık ve basınçlı hatlar, rafineriler',
                        usage_en: 'High temperature and pressure lines, refineries',
                        temperature: '-10°C / +550°C'
                    }
                }
            },
            
            stainless_steels: {
                name_tr: 'Paslanmaz Çelikler',
                name_en: 'Stainless Steels',
                description_tr: 'Korozyon direnci yüksek, özel alaşımlı çelikler',
                description_en: 'High corrosion resistant, special alloy steels',
                materials: {
                    '1.4301 (304)': {
                        standard: 'EN 10088-2',
                        density: 7900,
                        yield: '190 MPa',
                        usage_tr: 'Gıda endüstrisi, kimya sektörü, genel korozyon direnci',
                        usage_en: 'Food industry, chemical sector, general corrosion resistance',
                        temperature: '-270°C / +800°C'
                    },
                    '1.4401 (316)': {
                        standard: 'EN 10088-2',
                        density: 7980,
                        yield: '190 MPa',
                        usage_tr: 'Deniz suyu uygulamaları, kimya endüstrisi',
                        usage_en: 'Seawater applications, chemical industry',
                        temperature: '-270°C / +800°C'
                    },
                    '1.4404 (316L)': {
                        standard: 'EN 10088-2',
                        density: 7980,
                        yield: '190 MPa',
                        usage_tr: 'Kaynaklı konstrüksiyonlar, farmasötik endüstri',
                        usage_en: 'Welded constructions, pharmaceutical industry',
                        temperature: '-270°C / +800°C'
                    },
                    '1.4571 (316Ti)': {
                        standard: 'EN 10088-2',
                        density: 7980,
                        yield: '200 MPa',
                        usage_tr: 'Yüksek sıcaklık uygulamaları, kaynaklı yapılar',
                        usage_en: 'High temperature applications, welded structures',
                        temperature: '-270°C / +850°C'
                    }
                }
            },
            
            astm_carbon_steels: {
                name_tr: 'ASTM Karbon Çelikleri',
                name_en: 'ASTM Carbon Steels',
                description_tr: 'Amerikan standardına göre üretilmiş karbon çelikleri',
                description_en: 'Carbon steels manufactured according to American standards',
                materials: {
                    'A105': {
                        standard: 'ASTM A105',
                        density: 7850,
                        yield: '250 MPa',
                        usage_tr: 'Dövme flanşlar, fittingler, valfler',
                        usage_en: 'Forged flanges, fittings, valves',
                        temperature: '-29°C / +427°C'
                    },
                    'A106 Gr.B': {
                        standard: 'ASTM A106',
                        density: 7850,
                        yield: '240 MPa',
                        usage_tr: 'Yüksek sıcaklık boru hatları',
                        usage_en: 'High temperature pipelines',
                        temperature: '-29°C / +593°C'
                    },
                    'A234 WPB': {
                        standard: 'ASTM A234',
                        density: 7850,
                        yield: '240 MPa',
                        usage_tr: 'Kaynaklı boru fittingleri, dirsekler',
                        usage_en: 'Welded pipe fittings, elbows',
                        temperature: '-29°C / +427°C'
                    }
                }
            },
            
            engineering_plastics: {
                name_tr: 'Mühendislik Plastikleri',
                name_en: 'Engineering Plastics',
                description_tr: 'Yüksek performanslı endüstriyel plastik malzemeler',
                description_en: 'High performance industrial plastic materials',
                materials: {
                    'PE-UHMW': {
                        standard: 'ISO 11542',
                        density: 930,
                        yield: '20 MPa',
                        usage_tr: 'Aşınma plakaları, kaymalı yataklar, gıda endüstrisi',
                        usage_en: 'Wear plates, sliding bearings, food industry',
                        temperature: '-200°C / +80°C'
                    },
                    'PA6 (Naylon 6)': {
                        standard: 'ISO 16020',
                        density: 1150,
                        yield: '80 MPa',
                        usage_tr: 'Dişliler, burçlar, mekanik parçalar',
                        usage_en: 'Gears, bushings, mechanical parts',
                        temperature: '-40°C / +100°C'
                    },
                    'POM-C': {
                        standard: 'ISO 9988',
                        density: 1410,
                        yield: '65 MPa',
                        usage_tr: 'Hassas parçalar, dişliler, yataklar',
                        usage_en: 'Precision parts, gears, bearings',
                        temperature: '-40°C / +100°C'
                    },
                    'PTFE (Teflon)': {
                        standard: 'ISO 12086',
                        density: 2150,
                        yield: '25 MPa',
                        usage_tr: 'Sızdırmazlık elemanları, kimyasal dayanım',
                        usage_en: 'Sealing elements, chemical resistance',
                        temperature: '-200°C / +260°C'
                    },
                    'PEEK': {
                        standard: 'ISO 19066',
                        density: 1320,
                        yield: '100 MPa',
                        usage_tr: 'Yüksek sıcaklık uygulamaları, medikal implantlar',
                        usage_en: 'High temperature applications, medical implants',
                        temperature: '-60°C / +250°C'
                    }
                }
            },
            
            non_ferrous_metals: {
                name_tr: 'Demir Dışı Metaller',
                name_en: 'Non-Ferrous Metals',
                description_tr: 'Hafif metaller ve özel alaşımlar',
                description_en: 'Light metals and special alloys',
                materials: {
                    'Aluminyum 5083': {
                        standard: 'EN 485-2',
                        density: 2660,
                        yield: '125 MPa',
                        usage_tr: 'Denizcilik, basınçlı tanklar, kaynaklı yapılar',
                        usage_en: 'Marine, pressure tanks, welded structures',
                        temperature: '-270°C / +150°C'
                    },
                    'Bakır': {
                        standard: 'EN 1652',
                        density: 8960,
                        yield: '70 MPa',
                        usage_tr: 'Elektrik iletkenleri, ısı eşanjörleri',
                        usage_en: 'Electrical conductors, heat exchangers',
                        temperature: '-270°C / +200°C'
                    },
                    'Pirinç CuZn37': {
                        standard: 'EN 1652',
                        density: 8440,
                        yield: '140 MPa',
                        usage_tr: 'Vana ve fittingler, dekoratif uygulamalar',
                        usage_en: 'Valves and fittings, decorative applications',
                        temperature: '-270°C / +120°C'
                    },
                    'Titanyum Gr.2': {
                        standard: 'ASTM B265',
                        density: 4507,
                        yield: '275 MPa',
                        usage_tr: 'Kimya endüstrisi, medikal implantlar, havacılık',
                        usage_en: 'Chemical industry, medical implants, aerospace',
                        temperature: '-270°C / +300°C'
                    }
                }
            }
        },
        
        getCurrentLanguage() {
            return localStorage.getItem('selectedLanguage') || 'tr';
        },
        
        getMaterialInfo(materialCode) {
            for (const category of Object.values(this.categories)) {
                if (category.materials[materialCode]) {
                    return category.materials[materialCode];
                }
            }
            return null;
        },
        
        generateHTML() {
            const lang = this.getCurrentLanguage();
            let html = '<div class="materials-info-container">';
            
            // Başlık
            html += `
                <div class="materials-header">
                    <h3>${lang === 'tr' ? 'Malzeme Bilgi Veritabanı' : 'Material Information Database'}</h3>
                    <p>${lang === 'tr' 
                        ? 'Programda kullanılan tüm malzemelerin detaylı bilgileri' 
                        : 'Detailed information of all materials used in the program'}</p>
                </div>`;
            
            // Kategoriler
            for (const [key, category] of Object.entries(this.categories)) {
                const categoryName = lang === 'tr' ? category.name_tr : category.name_en;
                const categoryDesc = lang === 'tr' ? category.description_tr : category.description_en;
                
                html += `
                    <div class="material-category">
                        <div class="category-header" onclick="MaterialDatabase.toggleCategory('${key}')">
                            <span class="category-icon">▼</span>
                            <h4>${categoryName}</h4>
                        </div>
                        <div class="category-description">${categoryDesc}</div>
                        <div class="category-content" id="category-${key}">
                            <table class="materials-table">
                                <thead>
                                    <tr>
                                        <th>${lang === 'tr' ? 'Malzeme Kodu' : 'Material Code'}</th>
                                        <th>${lang === 'tr' ? 'Standart' : 'Standard'}</th>
                                        <th>${lang === 'tr' ? 'Yoğunluk' : 'Density'}</th>
                                        <th>${lang === 'tr' ? 'Akma Dayanımı' : 'Yield Strength'}</th>
                                        <th>${lang === 'tr' ? 'Kullanım Alanı' : 'Usage Area'}</th>
                                        <th>${lang === 'tr' ? 'Sıcaklık Aralığı' : 'Temperature Range'}</th>
                                    </tr>
                                </thead>
                                <tbody>`;
                
                for (const [code, material] of Object.entries(category.materials)) {
                    const usage = lang === 'tr' ? material.usage_tr : material.usage_en;
                    html += `
                        <tr>
                            <td class="material-code">${code}</td>
                            <td>${material.standard}</td>
                            <td>${material.density} kg/m³</td>
                            <td>${material.yield}</td>
                            <td class="material-usage">${usage}</td>
                            <td>${material.temperature}</td>
                        </tr>`;
                }
                
                html += `
                                </tbody>
                            </table>
                        </div>
                    </div>`;
            }
            
            html += `
                <div class="materials-footer">
                    <p>${lang === 'tr' 
                        ? '* Verilen değerler nominal değerlerdir. Detaylı bilgi için ilgili standartlara başvurunuz.' 
                        : '* Given values are nominal. Please refer to relevant standards for detailed information.'}</p>
                </div>
            </div>`;
            
            // CSS stillerini ekle
            html += `
                <style>
                    .materials-info-container {
                        padding: 20px;
                        max-height: 70vh;
                        overflow-y: auto;
                    }
                    
                    .materials-header {
                        text-align: center;
                        margin-bottom: 30px;
                        padding: 20px;
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        color: white;
                        border-radius: 10px;
                    }
                    
                    .materials-header h3 {
                        margin: 0 0 10px 0;
                        font-size: 1.5rem;
                    }
                    
                    .materials-header p {
                        margin: 0;
                        opacity: 0.95;
                    }
                    
                    .material-category {
                        margin-bottom: 25px;
                        background: white;
                        border-radius: 8px;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                        overflow: hidden;
                    }
                    
                    .category-header {
                        background: #f7fafc;
                        padding: 15px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        transition: background 0.3s;
                        border: 2px solid #e2e8f0;
                    }
                    
                    .category-header:hover {
                        background: #edf2f7;
                    }
                    
                    .category-icon {
                        transition: transform 0.3s;
                        color: #667eea;
                    }
                    
                    .category-header h4 {
                        margin: 0;
                        color: #2d3748;
                        font-size: 1.1rem;
                    }
                    
                    .category-description {
                        padding: 10px 15px;
                        background: #f8f9fa;
                        color: #718096;
                        font-size: 0.9rem;
                        border-left: 4px solid #667eea;
                    }
                    
                    .category-content {
                        padding: 0;
                        max-height: 400px;
                        overflow-y: auto;
                        transition: max-height 0.3s ease;
                    }
                    
                    .category-content.collapsed {
                        max-height: 0;
                        padding: 0;
                    }
                    
                    .materials-table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    
                    .materials-table th {
                        background: #667eea;
                        color: white;
                        padding: 12px;
                        text-align: left;
                        font-size: 0.9rem;
                        font-weight: 600;
                    }
                    
                    .materials-table td {
                        padding: 10px 12px;
                        border-bottom: 1px solid #e2e8f0;
                        font-size: 0.85rem;
                        color: #2d3748;
                    }
                    
                    .materials-table tr:hover {
                        background: #f7fafc;
                    }
                    
                    .material-code {
                        font-weight: 600;
                        color: #667eea;
                    }
                    
                    .material-usage {
                        font-size: 0.8rem;
                        line-height: 1.4;
                    }
                    
                    .materials-footer {
                        margin-top: 20px;
                        padding: 15px;
                        background: #f7fafc;
                        border-radius: 8px;
                        text-align: center;
                        color: #718096;
                        font-size: 0.85rem;
                    }
                    
                    .collapsed .category-icon {
                        transform: rotate(-90deg);
                    }
                </style>`;
            
            return html;
        },
        
        toggleCategory(categoryKey) {
            const content = document.getElementById(`category-${categoryKey}`);
            const header = content.previousElementSibling.previousElementSibling;
            const icon = header.querySelector('.category-icon');
            
            if (content.classList.contains('collapsed')) {
                content.classList.remove('collapsed');
                icon.style.transform = 'rotate(0deg)';
            } else {
                content.classList.add('collapsed');
                icon.style.transform = 'rotate(-90deg)';
            }
        }
    };
    
    window.MaterialDatabase = MaterialDatabase;
    
})(window);