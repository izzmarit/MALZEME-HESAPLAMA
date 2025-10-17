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
                    'S235JR (EN 10025-2)': {
                        standard: 'EN 10025-2',
                        density: 7850,
                        yield: '235 MPa',
                        tensile: '360-510 MPa',
                        elongation: '26%',
                        hardness: '~120 HB',
                        usage_tr: 'Genel yapı elemanları, hafif yük taşıyan konstrüksiyonlar, kaynaklı yapılar',
                        usage_en: 'General structural elements, light load bearing constructions, welded structures',
                        temperature: '-20°C / +300°C',
                        weldability: 'Mükemmel',
                        impact: '27J @ 20°C'
                    },
                    'S275JR (EN 10025-2)': {
                        standard: 'EN 10025-2',
                        density: 7850,
                        yield: '275 MPa',
                        tensile: '430-580 MPa',
                        elongation: '23%',
                        hardness: '~130 HB',
                        usage_tr: 'Orta dayanımlı yapı elemanları, köprü konstrüksiyonları, vinç kirişleri',
                        usage_en: 'Medium strength structural elements, bridge constructions, crane beams',
                        temperature: '-20°C / +300°C',
                        weldability: 'Mükemmel',
                        impact: '27J @ 20°C'
                    },
                    'S355JR (EN 10025-2)': {
                        standard: 'EN 10025-2',
                        density: 7850,
                        yield: '355 MPa',
                        tensile: '510-680 MPa',
                        elongation: '22%',
                        hardness: '~150 HB',
                        usage_tr: 'Yüksek dayanımlı yapılar, ağır yük taşıyan konstrüksiyonlar, büyük açıklıklı yapılar',
                        usage_en: 'High strength structures, heavy load bearing constructions, large span structures',
                        temperature: '-20°C / +300°C',
                        weldability: 'İyi',
                        impact: '27J @ 20°C'
                    },
                    'S355J2 (EN 10025-2)': {
                        standard: 'EN 10025-2',
                        density: 7850,
                        yield: '355 MPa',
                        tensile: '510-680 MPa',
                        elongation: '22%',
                        hardness: '~150 HB',
                        usage_tr: 'Düşük sıcaklıkta darbe dayanımı gereken yapılar, soğuk iklim uygulamaları',
                        usage_en: 'Structures requiring impact resistance at low temperatures, cold climate applications',
                        temperature: '-20°C / +300°C',
                        weldability: 'İyi',
                        impact: '27J @ -20°C'
                    },
                    'St 37-2 (DIN 17100)': {
                        standard: 'DIN 17100',
                        density: 7850,
                        yield: '235 MPa',
                        tensile: '340-470 MPa',
                        elongation: '26%',
                        hardness: '~120 HB',
                        usage_tr: 'Genel makine imalatı, kaynaklı yapılar, düşük mukavemet gerektiren uygulamalar',
                        usage_en: 'General machinery manufacturing, welded structures, low strength applications',
                        temperature: '-10°C / +300°C',
                        weldability: 'Mükemmel',
                        impact: 'Belirtilmemiş'
                    },
                    'St 52-3 (DIN 17100)': {
                        standard: 'DIN 17100',
                        density: 7850,
                        yield: '355 MPa',
                        tensile: '510-680 MPa',
                        elongation: '22%',
                        hardness: '~150 HB',
                        usage_tr: 'Yüksek mukavemet gerektiren makine parçaları, vinç ve kaldırma ekipmanları',
                        usage_en: 'High strength machinery parts, crane and lifting equipment',
                        temperature: '-20°C / +300°C',
                        weldability: 'İyi',
                        impact: '27J @ -20°C'
                    }
                }
            },
            
            pressure_vessel_steels: {
                name_tr: 'Basınçlı Kap Çelikleri',
                name_en: 'Pressure Vessel Steels',
                description_tr: 'Basınçlı kap, kazan ve boru hatlarında kullanılan özel çelikler',
                description_en: 'Special steels used in pressure vessels, boilers and pipelines',
                materials: {
                    'P235GH (EN 10028-2)': {
                        standard: 'EN 10028-2',
                        density: 7850,
                        yield: '235 MPa',
                        tensile: '360-500 MPa',
                        elongation: '25%',
                        hardness: '~120 HB',
                        usage_tr: 'Düşük basınçlı kaplar, ısı eşanjörleri, buhar sistemleri',
                        usage_en: 'Low pressure vessels, heat exchangers, steam systems',
                        temperature: '-10°C / +400°C',
                        weldability: 'Mükemmel',
                        impact: '27J @ 20°C',
                        max_thickness: '100mm'
                    },
                    'P265GH (EN 10028-2)': {
                        standard: 'EN 10028-2',
                        density: 7850,
                        yield: '265 MPa',
                        tensile: '410-530 MPa',
                        elongation: '23%',
                        hardness: '~130 HB',
                        usage_tr: 'Orta basınçlı kaplar, buhar kazanları, petrokimya ekipmanları',
                        usage_en: 'Medium pressure vessels, steam boilers, petrochemical equipment',
                        temperature: '-10°C / +400°C',
                        weldability: 'Mükemmel',
                        impact: '27J @ 0°C',
                        max_thickness: '100mm'
                    },
                    'P295GH (EN 10028-2)': {
                        standard: 'EN 10028-2',
                        density: 7850,
                        yield: '295 MPa',
                        tensile: '460-580 MPa',
                        elongation: '22%',
                        hardness: '~140 HB',
                        usage_tr: 'Yüksek basınçlı kaplar, endüstriyel kazanlar, basınçlı hatlar',
                        usage_en: 'High pressure vessels, industrial boilers, pressure lines',
                        temperature: '-10°C / +425°C',
                        weldability: 'İyi',
                        impact: '27J @ 0°C',
                        max_thickness: '100mm'
                    },
                    'P355GH (EN 10028-2)': {
                        standard: 'EN 10028-2',
                        density: 7850,
                        yield: '355 MPa',
                        tensile: '510-650 MPa',
                        elongation: '20%',
                        hardness: '~150 HB',
                        usage_tr: 'Yüksek basınç ve sıcaklıktaki kaplar, kritik uygulamalar',
                        usage_en: 'High pressure and temperature vessels, critical applications',
                        temperature: '-10°C / +425°C',
                        weldability: 'İyi',
                        impact: '27J @ 0°C',
                        max_thickness: '100mm'
                    },
                    '16Mo3 (EN 10028-2)': {
                        standard: 'EN 10028-2',
                        density: 7850,
                        yield: '280 MPa',
                        tensile: '440-590 MPa',
                        elongation: '22%',
                        hardness: '~135 HB',
                        composition: '0.12-0.20% C, 0.25-0.35% Mo',
                        usage_tr: 'Yüksek sıcaklık uygulamaları, petrokimya, rafineriler',
                        usage_en: 'High temperature applications, petrochemical, refineries',
                        temperature: '-10°C / +530°C',
                        weldability: 'İyi',
                        creep_resistant: 'Evet',
                        max_thickness: '100mm'
                    },
                    '13CrMo4-5 (EN 10028-2)': {
                        standard: 'EN 10028-2',
                        density: 7850,
                        yield: '290 MPa',
                        tensile: '440-590 MPa',
                        elongation: '19%',
                        hardness: '~140 HB',
                        composition: '1.0% Cr, 0.5% Mo',
                        usage_tr: 'Yüksek sıcaklık ve basınçlı hatlar, rafineriler, hidrojen servisi',
                        usage_en: 'High temperature and pressure lines, refineries, hydrogen service',
                        temperature: '-10°C / +550°C',
                        weldability: 'Orta (Ön ısıtma gerekli)',
                        creep_resistant: 'Evet',
                        hydrogen_resistant: 'Evet',
                        max_thickness: '100mm'
                    },
                    'SA-516 Gr.70 (ASME)': {
                        standard: 'ASME SA-516',
                        density: 7850,
                        yield: '260 MPa',
                        tensile: '485-620 MPa',
                        elongation: '21%',
                        hardness: '~130 HB',
                        usage_tr: 'Orta ve düşük sıcaklık basınçlı kaplar, petrokimya tankları',
                        usage_en: 'Moderate and low temperature pressure vessels, petrochemical tanks',
                        temperature: '-46°C / +427°C',
                        weldability: 'Mükemmel',
                        impact: 'Mükemmel düşük sıcaklık tokluğu',
                        notch_toughness: 'Gelişmiş'
                    },
                    'SA-387 Gr.11 Cl.2 (ASME)': {
                        standard: 'ASME SA-387',
                        density: 7850,
                        yield: '310 MPa',
                        tensile: '515-690 MPa',
                        elongation: '18%',
                        hardness: '~150 HB',
                        composition: '1.0-1.5% Cr, 0.45-0.65% Mo',
                        usage_tr: 'Yüksek sıcaklık uygulamaları, hidrojen servisi, rafineriler',
                        usage_en: 'High temperature applications, hydrogen service, refineries',
                        temperature: '-29°C / +593°C',
                        weldability: 'İyi (PWHT gerekli)',
                        creep_resistant: 'Mükemmel',
                        hydrogen_resistant: 'Evet'
                    }
                }
            },
            
            stainless_steels: {
                name_tr: 'Paslanmaz Çelikler',
                name_en: 'Stainless Steels',
                description_tr: 'Korozyon direnci yüksek, özel alaşımlı çelikler',
                description_en: 'High corrosion resistant, special alloy steels',
                materials: {
                    '1.4301 / 304 (EN 10088-2)': {
                        standard: 'EN 10088-2 / AISI 304',
                        density: 7900,
                        yield: '190-210 MPa',
                        tensile: '520-720 MPa',
                        elongation: '45%',
                        hardness: '~200 HB',
                        composition: '18% Cr, 8-10% Ni',
                        usage_tr: 'Gıda endüstrisi, kimya sektörü, genel korozyon direnci, mimari uygulamalar',
                        usage_en: 'Food industry, chemical sector, general corrosion resistance, architectural applications',
                        temperature: '-270°C / +800°C',
                        weldability: 'Mükemmel',
                        magnetic: 'Hayır',
                        corrosion_resistance: 'Mükemmel',
                        polishability: 'Mükemmel'
                    },
                    '1.4401 / 316 (EN 10088-2)': {
                        standard: 'EN 10088-2 / AISI 316',
                        density: 7980,
                        yield: '190-220 MPa',
                        tensile: '520-720 MPa',
                        elongation: '45%',
                        hardness: '~200 HB',
                        composition: '17% Cr, 11% Ni, 2-3% Mo',
                        usage_tr: 'Deniz suyu uygulamaları, kimya endüstrisi, farmasötik, tıbbi cihazlar',
                        usage_en: 'Seawater applications, chemical industry, pharmaceutical, medical devices',
                        temperature: '-270°C / +800°C',
                        weldability: 'Mükemmel',
                        magnetic: 'Hayır',
                        corrosion_resistance: 'Üstün (özellikle klorür ortamlarında)',
                        pitting_resistance: 'Çok yüksek (Mo içeriği sayesinde)'
                    },
                    '1.4404 / 316L (EN 10088-2)': {
                        standard: 'EN 10088-2 / AISI 316L',
                        density: 7980,
                        yield: '180-200 MPa',
                        tensile: '500-700 MPa',
                        elongation: '45%',
                        hardness: '~200 HB',
                        composition: '17% Cr, 12% Ni, 2.5% Mo, <0.03% C',
                        usage_tr: 'Kaynaklı konstrüksiyonlar, farmasötik endüstri, düşük karbonlu uygulamalar',
                        usage_en: 'Welded constructions, pharmaceutical industry, low carbon applications',
                        temperature: '-270°C / +800°C',
                        weldability: 'Üstün (tane sınırı korozyonu direnci)',
                        magnetic: 'Hayır',
                        intergranular_corrosion: 'Yüksek direnç',
                        sensitization_resistant: 'Evet'
                    },
                    '1.4571 / 316Ti (EN 10088-2)': {
                        standard: 'EN 10088-2 / AISI 316Ti',
                        density: 7980,
                        yield: '200-220 MPa',
                        tensile: '520-720 MPa',
                        elongation: '40%',
                        hardness: '~200 HB',
                        composition: '17% Cr, 11% Ni, 2% Mo, Ti stabilize',
                        usage_tr: 'Yüksek sıcaklık uygulamaları, kaynaklı yapılar, kimya sektörü',
                        usage_en: 'High temperature applications, welded structures, chemical sector',
                        temperature: '-270°C / +850°C',
                        weldability: 'Mükemmel',
                        magnetic: 'Hayır',
                        stabilized: 'Titanyum ile',
                        high_temp_strength: 'Mükemmel'
                    },
                    '1.4462 / 2205 Duplex': {
                        standard: 'EN 10088-3',
                        density: 7800,
                        yield: '450-550 MPa',
                        tensile: '640-840 MPa',
                        elongation: '25%',
                        hardness: '~250 HB',
                        composition: '22% Cr, 5.5% Ni, 3% Mo, N',
                        usage_tr: 'Deniz platformları, kimya endüstrisi, yüksek mukavemet ve korozyon direnci',
                        usage_en: 'Offshore platforms, chemical industry, high strength and corrosion resistance',
                        temperature: '-50°C / +280°C',
                        weldability: 'İyi (kontrollü soğuma)',
                        magnetic: 'Kısmi',
                        corrosion_resistance: 'Üstün',
                        stress_corrosion_cracking: 'Yüksek direnç',
                        pren: '>35 (Pitting Resistance Equivalent Number)'
                    },
                    '1.4541 / 321 (EN 10088-2)': {
                        standard: 'EN 10088-2 / AISI 321',
                        density: 7900,
                        yield: '200-230 MPa',
                        tensile: '520-720 MPa',
                        elongation: '40%',
                        hardness: '~200 HB',
                        composition: '18% Cr, 10% Ni, Ti stabilize',
                        usage_tr: 'Egzoz sistemleri, yüksek sıcaklık uygulamaları, kimya ekipmanları',
                        usage_en: 'Exhaust systems, high temperature applications, chemical equipment',
                        temperature: '-270°C / +900°C',
                        weldability: 'Mükemmel',
                        magnetic: 'Hayır',
                        high_temp_oxidation: 'Mükemmel direnç',
                        creep_resistant: 'Evet'
                    }
                }
            },
            
            engineering_plastics: {
                name_tr: 'Mühendislik Plastikleri',
                name_en: 'Engineering Plastics',
                description_tr: 'Yüksek performanslı endüstriyel plastik malzemeler',
                description_en: 'High performance industrial plastic materials',
                materials: {
                    'PE-UHMW (Ultra Yüksek Molekül Ağırlıklı Polietilen)': {
                        standard: 'ISO 11542-1',
                        density: 930,
                        yield: '20-25 MPa',
                        tensile: '40-45 MPa',
                        elongation: '350-525%',
                        hardness: '60-70 Shore D',
                        friction_coefficient: '0.10-0.15 (Düşük sürtünme)',
                        abrasion_resistance: 'Mükemmel (En iyi termoplastik)',
                        impact_strength: 'Çok yüksek (kırılmaz)',
                        usage_tr: 'Aşınma plakaları, kaymalı yataklar, gıda endüstrisi, taşıyıcı bantlar, zincir kızakları',
                        usage_en: 'Wear plates, sliding bearings, food industry, conveyor belts, chain guides',
                        temperature: '-200°C / +80°C (Sürekli)',
                        water_absorption: 'Çok düşük (<0.01%)',
                        chemical_resistance: 'Mükemmel (asit, baz, organik çözücülere)',
                        uv_resistance: 'Zayıf (UV stabilize versiyon önerilir)',
                        fda_approved: 'Evet (Gıda teması için)'
                    },
                    'PA6 (Naylon 6 / Poliamid 6)': {
                        standard: 'ISO 16020-1',
                        density: 1130,
                        yield: '75-90 MPa',
                        tensile: '80-95 MPa',
                        elongation: '15-80%',
                        hardness: '75-85 Shore D',
                        friction_coefficient: '0.20-0.35',
                        abrasion_resistance: 'Çok iyi',
                        impact_strength: 'İyi',
                        usage_tr: 'Dişliler, burçlar, mekanik parçalar, rulmanlar, makine elemanları',
                        usage_en: 'Gears, bushings, mechanical parts, bearings, machine elements',
                        temperature: '-40°C / +100°C (Kısa süreli +140°C)',
                        water_absorption: 'Orta (1.3-1.9% - boyutsal stabiliteyi etkiler)',
                        chemical_resistance: 'İyi (yağlar, yakıtlar, alkollere dirençli)',
                        dimensional_stability: 'İyi (nem alımı dikkate alınmalı)',
                        notch_sensitivity: 'Orta'
                    },
                    'PA66 (Naylon 66 / Poliamid 66)': {
                        standard: 'ISO 16020-2',
                        density: 1140,
                        yield: '80-95 MPa',
                        tensile: '90-100 MPa',
                        elongation: '15-60%',
                        hardness: '80-85 Shore D',
                        friction_coefficient: '0.25-0.35',
                        abrasion_resistance: 'Çok iyi',
                        impact_strength: 'İyi',
                        usage_tr: 'Yüksek dayanım gerektiren dişliler, otomotiv parçaları, yüksek yük uygulamaları',
                        usage_en: 'High strength gears, automotive parts, high load applications',
                        temperature: '-40°C / +110°C (Kısa süreli +150°C)',
                        water_absorption: 'Orta (0.9-1.5%)',
                        chemical_resistance: 'İyi (PA6\'ya göre daha iyi)',
                        melting_point: '265°C',
                        stiffness: 'PA6\'dan %20-30 daha yüksek'
                    },
                    'POM-C (Polioksimetilen Kopolimer / Aetal / Delrin)': {
                        standard: 'ISO 9988-1',
                        density: 1410,
                        yield: '60-70 MPa',
                        tensile: '65-70 MPa',
                        elongation: '25-75%',
                        hardness: '78-83 Shore D',
                        friction_coefficient: '0.20-0.35 (Düşük)',
                        abrasion_resistance: 'Mükemmel',
                        impact_strength: 'Çok iyi',
                        usage_tr: 'Hassas parçalar, dişliler, yataklar, mekanik bileşenler, kaymalı elemanlar',
                        usage_en: 'Precision parts, gears, bearings, mechanical components, sliding elements',
                        temperature: '-40°C / +100°C (Kısa süreli +140°C)',
                        water_absorption: 'Çok düşük (0.20-0.25%)',
                        chemical_resistance: 'İyi (asit ve bazlara orta direnç)',
                        dimensional_stability: 'Mükemmel',
                        creep_resistance: 'Çok iyi',
                        spring_back: 'Mükemmel (elastik hafıza)',
                        noise_damping: 'İyi'
                    },
                    'POM-H (Polioksimetilen Homopolimer)': {
                        standard: 'ISO 9988-2',
                        density: 1420,
                        yield: '65-75 MPa',
                        tensile: '70-75 MPa',
                        elongation: '15-40%',
                        hardness: '80-85 Shore D',
                        friction_coefficient: '0.20-0.30',
                        abrasion_resistance: 'Mükemmel',
                        impact_strength: 'Çok iyi',
                        usage_tr: 'Yüksek rijitlik gerektiren uygulamalar, yüksek mukavemet parçaları',
                        usage_en: 'High rigidity applications, high strength parts',
                        temperature: '-50°C / +110°C (Kısa süreli +140°C)',
                        water_absorption: 'Çok düşük (0.20%)',
                        chemical_resistance: 'POM-C\'den hafif üstün',
                        stiffness: 'POM-C\'den %10-15 daha yüksek',
                        thermal_stability: 'POM-C\'den düşük'
                    },
                    'PTFE (Teflon / Politetrafloroetilen)': {
                        standard: 'ISO 12086-1',
                        density: 2150,
                        yield: '20-35 MPa',
                        tensile: '25-40 MPa',
                        elongation: '250-550%',
                        hardness: '50-65 Shore D',
                        friction_coefficient: '0.05-0.10 (En düşük)',
                        abrasion_resistance: 'Zayıf',
                        impact_strength: 'Orta',
                        usage_tr: 'Sızdırmazlık elemanları, contalar, kimyasal dayanım, kayma yüzeyleri, yalıtım',
                        usage_en: 'Sealing elements, gaskets, chemical resistance, sliding surfaces, insulation',
                        temperature: '-200°C / +260°C (Sürekli kullanım)',
                        water_absorption: '0% (Tamamen hidrofob)',
                        chemical_resistance: 'Üstün (Neredeyse tüm kimyasallara)',
                        dielectric_strength: 'Mükemmel (Elektrik yalıtkanı)',
                        non_stick: 'Mükemmel (Yapışmaz yüzey)',
                        flammability: 'Yanmaz',
                        uv_resistance: 'Mükemmel',
                        compressive_strength: 'Zayıf (Kolay deforme olur)'
                    },
                    'PEEK (Polietereterketon)': {
                        standard: 'ISO 19066-1',
                        density: 1320,
                        yield: '90-100 MPa',
                        tensile: '95-110 MPa',
                        elongation: '30-50%',
                        hardness: '~90 Shore D',
                        friction_coefficient: '0.30-0.40',
                        abrasion_resistance: 'Mükemmel',
                        impact_strength: 'Çok iyi',
                        usage_tr: 'Yüksek sıcaklık uygulamaları, medikal implantlar, havacılık, otomotiv, kimya',
                        usage_en: 'High temperature applications, medical implants, aerospace, automotive, chemical',
                        temperature: '-60°C / +250°C (Kısa süreli +310°C)',
                        water_absorption: 'Çok düşük (0.10%)',
                        chemical_resistance: 'Üstün (Asit, baz, organik çözücülere)',
                        radiation_resistance: 'Mükemmel (Sterilizasyon)',
                        biocompatibility: 'Mükemmel (USP Class VI, ISO 10993)',
                        flame_resistance: 'V-0 (UL94)',
                        price_range: 'Çok yüksek (Premium malzeme)',
                        sterilization: 'Tüm metotlar uygun (gamma, buhar, ETO)'
                    },
                    'PC (Polikarbonat)': {
                        standard: 'ISO 7391-1',
                        density: 1200,
                        yield: '60-65 MPa',
                        tensile: '65-70 MPa',
                        elongation: '80-150%',
                        hardness: '~70 Shore D',
                        friction_coefficient: '0.35-0.50',
                        abrasion_resistance: 'Orta',
                        impact_strength: 'Mükemmel (En yüksek)',
                        usage_tr: 'Şeffaf uygulamalar, koruyucu ekranlar, güvenlik camları, optik parçalar',
                        usage_en: 'Transparent applications, protective screens, safety glass, optical parts',
                        temperature: '-40°C / +120°C (Kısa süreli +140°C)',
                        water_absorption: '0.15-0.35%',
                        chemical_resistance: 'Zayıf (Asit, baz, çözücülere hassas)',
                        transparency: 'Mükemmel (Cam benzeri)',
                        uv_resistance: 'İyi (UV stabilize versiyon)',
                        dimensional_stability: 'İyi',
                        notch_sensitivity: 'Yüksek (Çentik hassasiyeti)'
                    },
                    'HDPE (Yüksek Yoğunluklu Polietilen)': {
                        standard: 'ISO 1872-1',
                        density: 950,
                        yield: '25-30 MPa',
                        tensile: '28-35 MPa',
                        elongation: '200-1000%',
                        hardness: '65-70 Shore D',
                        friction_coefficient: '0.20-0.30',
                        abrasion_resistance: 'İyi',
                        impact_strength: 'İyi',
                        usage_tr: 'Tanklar, borular, şişeler, kimyasal depolama, kızaklar',
                        usage_en: 'Tanks, pipes, bottles, chemical storage, skids',
                        temperature: '-50°C / +80°C (Sürekli)',
                        water_absorption: '<0.01% (Hidrofob)',
                        chemical_resistance: 'Mükemmel (Asit, baz, çoğu çözücü)',
                        stress_crack_resistance: 'İyi',
                        fda_approved: 'Evet',
                        recyclable: 'Evet (Kolay)'
                    },
                    'PU (Poliüretan Elastomer)': {
                        standard: 'ISO 16365',
                        density: 1200,
                        yield: '40-60 MPa',
                        tensile: '50-70 MPa',
                        elongation: '300-700%',
                        hardness: '70-95 Shore A',
                        friction_coefficient: '0.50-0.80 (Yüksek)',
                        abrasion_resistance: 'Üstün (Kauçuktan 5-10x daha iyi)',
                        impact_strength: 'Mükemmel',
                        tear_resistance: 'Mükemmel',
                        usage_tr: 'Tamponlar, tekerlekler, contalar, darbe emici elemanlar, makaralar',
                        usage_en: 'Buffers, wheels, seals, shock absorbing elements, rollers',
                        temperature: '-30°C / +80°C (Tip bağımlı)',
                        water_absorption: 'Orta (0.2-1.5%)',
                        chemical_resistance: 'Orta (Yağlara iyi, çözücülere zayıf)',
                        resilience: 'Mükemmel (Enerji emilimi)',
                        compression_set: 'İyi',
                        hydrolysis_resistance: 'Polieter tipi daha iyi'
                    }
                }
            },
            
            non_ferrous_metals: {
                name_tr: 'Demir Dışı Metaller ve Alaşımları',
                name_en: 'Non-Ferrous Metals and Alloys',
                description_tr: 'Hafif metaller ve özel alaşımlar',
                description_en: 'Light metals and special alloys',
                materials: {
                    'Aluminyum 5083 (EN AW-5083)': {
                        standard: 'EN 485-2 / ASTM B209',
                        density: 2660,
                        yield: '125-195 MPa',
                        tensile: '275-350 MPa',
                        elongation: '12-16%',
                        hardness: '75-85 HB',
                        composition: '4.5% Mg, 0.7% Mn',
                        usage_tr: 'Denizcilik, basınçlı tanklar, kaynaklı yapılar, kimya ekipmanları, kriyo-uygulamalar',
                        usage_en: 'Marine, pressure tanks, welded structures, chemical equipment, cryo-applications',
                        temperature: '-270°C / +150°C',
                        weldability: 'Mükemmel',
                        corrosion_resistance: 'Üstün (deniz suyu)',
                        machinability: 'İyi',
                        anodizable: 'Evet'
                    },
                    'Aluminyum 6061-T6': {
                        standard: 'EN AW-6061 / ASTM B221',
                        density: 2700,
                        yield: '240-275 MPa',
                        tensile: '290-310 MPa',
                        elongation: '10-12%',
                        hardness: '95 HB',
                        composition: '1.0% Mg, 0.6% Si, 0.3% Cu',
                        usage_tr: 'Genel makine imalatı, yapısal profiller, otomotiv, havacılık',
                        usage_en: 'General machinery manufacturing, structural profiles, automotive, aerospace',
                        temperature: '-55°C / +120°C',
                        weldability: 'İyi',
                        corrosion_resistance: 'İyi',
                        machinability: 'Mükemmel',
                        heat_treatable: 'Evet'
                    },
                    'Aluminyum 7075-T6': {
                        standard: 'EN AW-7075 / ASTM B211',
                        density: 2810,
                        yield: '505-550 MPa',
                        tensile: '570-600 MPa',
                        elongation: '11%',
                        hardness: '150 HB',
                        composition: '5.6% Zn, 2.5% Mg, 1.6% Cu',
                        usage_tr: 'Havacılık, yüksek mukavemet yapılar, spor ekipmanları',
                        usage_en: 'Aerospace, high strength structures, sports equipment',
                        temperature: '-55°C / +120°C',
                        weldability: 'Zayıf',
                        corrosion_resistance: 'Orta (anodik koruma gerekli)',
                        machinability: 'İyi',
                        strength_to_weight: 'Mükemmel (En yüksek)'
                    },
                    'Bakır C11000 (ETP)': {
                        standard: 'EN 1652 / ASTM B152',
                        density: 8960,
                        yield: '69 MPa',
                        tensile: '220-260 MPa',
                        elongation: '45%',
                        hardness: '45 HB',
                        purity: '99.90% Cu',
                        usage_tr: 'Elektrik iletkenleri, ısı eşanjörleri, elektronik, kablo',
                        usage_en: 'Electrical conductors, heat exchangers, electronics, cables',
                        temperature: '-270°C / +200°C',
                        electrical_conductivity: '101% IACS (Mükemmel)',
                        thermal_conductivity: '391 W/m·K',
                        weldability: 'İyi',
                        corrosion_resistance: 'Mükemmel'
                    },
                    'Pirinç CuZn37 (Ms63)': {
                        standard: 'EN 1652 / DIN 17660',
                        density: 8440,
                        yield: '120-140 MPa',
                        tensile: '340-450 MPa',
                        elongation: '45-55%',
                        hardness: '80 HB',
                        composition: '63% Cu, 37% Zn',
                        usage_tr: 'Vana ve fittingler, dekoratif uygulamalar, vida-somun, musluklar',
                        usage_en: 'Valves and fittings, decorative applications, screws-nuts, faucets',
                        temperature: '-270°C / +120°C',
                        machinability: 'Mükemmel',
                        corrosion_resistance: 'İyi (dezinflamasyon riski var)',
                        formability: 'Mükemmel',
                        dezincification: 'Hassas (inhibited versiyon önerilir)'
                    },
                    'Bronz CuSn8 (Kalay Bronz)': {
                        standard: 'EN 1652',
                        density: 8800,
                        yield: '150-200 MPa',
                        tensile: '350-450 MPa',
                        elongation: '15-25%',
                        hardness: '90 HB',
                        composition: '92% Cu, 8% Sn',
                        usage_tr: 'Rulmanlar, burçlar, dişliler, yüksek yük uygulamaları',
                        usage_en: 'Bearings, bushings, gears, high load applications',
                        temperature: '-50°C / +200°C',
                        wear_resistance: 'Mükemmel',
                        friction_properties: 'Çok iyi',
                        corrosion_resistance: 'Mükemmel (özellikle deniz suyu)',
                        bearing_quality: 'Üstün'
                    },
                    'Titanyum Gr.2 (Ticari Safitli)': {
                        standard: 'ASTM B265 / AMS 4902',
                        density: 4507,
                        yield: '275-410 MPa',
                        tensile: '345-550 MPa',
                        elongation: '20%',
                        hardness: '80 HB',
                        purity: '99.2% Ti',
                        usage_tr: 'Kimya endüstrisi, medikal implantlar, havacılık, denizcilik',
                        usage_en: 'Chemical industry, medical implants, aerospace, marine',
                        temperature: '-270°C / +300°C',
                        corrosion_resistance: 'Üstün (neredeyse tüm ortamlarda)',
                        biocompatibility: 'Mükemmel',
                        strength_to_weight: 'Çok yüksek',
                        weldability: 'İyi (inert gaz)',
                        passivation: 'Doğal (TiO2 tabakası)'
                    },
                    'Titanyum Gr.5 (Ti-6Al-4V)': {
                        standard: 'ASTM B265 / AMS 4911',
                        density: 4430,
                        yield: '830-930 MPa',
                        tensile: '900-1000 MPa',
                        elongation: '10-14%',
                        hardness: '~330 HB',
                        composition: '6% Al, 4% V, 90% Ti',
                        usage_tr: 'Havacılık, medikal implantlar, yarış araçları, yüksek performans uygulamaları',
                        usage_en: 'Aerospace, medical implants, racing vehicles, high performance applications',
                        temperature: '-270°C / +400°C',
                        corrosion_resistance: 'Üstün',
                        biocompatibility: 'Mükemmel',
                        strength_to_weight: 'En yüksek',
                        weldability: 'Orta (kontrollü atmosfer)',
                        fatigue_strength: 'Çok yüksek'
                    },
                    'Nikel 200 (Ticari Saf Nikel)': {
                        standard: 'ASTM B162 / DIN 17740',
                        density: 8890,
                        yield: '105-275 MPa',
                        tensile: '380-550 MPa',
                        elongation: '40-47%',
                        hardness: '~110 HB',
                        purity: '99.5% Ni',
                        usage_tr: 'Kimyasal işlem ekipmanları, kostik alkalilere dayanım, elektronik',
                        usage_en: 'Chemical processing equipment, caustic alkali resistance, electronics',
                        temperature: '-200°C / +650°C',
                        corrosion_resistance: 'Üstün (özellikle alkali ortamlar)',
                        magnetic_properties: 'Ferromanyetik',
                        electrical_conductivity: 'İyi',
                        thermal_expansion: 'Çelikten düşük'
                    },
                    'Inconel 625 (Nikel Süperalaşım)': {
                        standard: 'ASTM B443 / AMS 5666',
                        density: 8440,
                        yield: '415-655 MPa',
                        tensile: '830-1035 MPa',
                        elongation: '30-60%',
                        hardness: '~200 HB',
                        composition: '58% Ni, 21% Cr, 9% Mo, 3.6% Nb',
                        usage_tr: 'Havacılık, denizcilik, kimya, yüksek sıcaklık-basınç uygulamaları',
                        usage_en: 'Aerospace, marine, chemical, high temperature-pressure applications',
                        temperature: '-250°C / +1000°C',
                        corrosion_resistance: 'Üstün (deniz suyu, asitler)',
                        oxidation_resistance: 'Mükemmel',
                        creep_resistance: 'Çok yüksek',
                        weldability: 'Mükemmel',
                        cryogenic_properties: 'Mükemmel'
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