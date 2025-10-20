/**
 * Ultra Kapsamlı Malzeme Veritabanı Sistemi
 * ASME, EN, DIN, JIS standartlarında malzeme özellikleri
 * Versiyon: 4.0.0
 */

(function(window) {
    'use strict';
    
    const MaterialDatabase = {
        version: '4.0.0',
        searchResults: [],
        currentFilter: null,
        
        categories: {
            // ===== ASME/ASTM BASINÇLI KAP VE BORU MALZEMELERİ =====
            asme_carbon_steels: {
                name_tr: 'ASME/ASTM Karbon Çelikleri',
                name_en: 'ASME/ASTM Carbon Steels',
                description_tr: 'Basınçlı kaplar, borular ve bağlantı elemanları için karbon çelikleri',
                description_en: 'Carbon steels for pressure vessels, pipes and fittings',
                materials: {
                    'A105': {
                        code: 'A105',
                        standard: 'ASTM A105/ASME SA105',
                        equivalent: 'P250GH (EN), St 44-2 (DIN)',
                        density: 7850,
                        
                        mechanical: {
                            yield: 250,
                            yield_unit: 'MPa',
                            tensile_min: 485,
                            tensile_max: 655,
                            tensile_unit: 'MPa',
                            elongation: 22,
                            elongation_unit: '%',
                            hardness: 187,
                            hardness_scale: 'HB',
                            impact_energy: '-',
                            impact_temp: '-',
                            elastic_modulus: 200000
                        },
                        
                        physical: {
                            thermal_conductivity: 51.9,
                            thermal_expansion: 11.7,
                            specific_heat: 486
                        },
                        
                        chemical: {
                            'C': '≤0.35',
                            'Mn': '0.60-1.05',
                            'Si': '0.10-0.35',
                            'P': '≤0.035',
                            'S': '≤0.040',
                            'Cu': '≤0.40',
                            'Ni': '≤0.40',
                            'Cr': '≤0.30',
                            'Mo': '≤0.12'
                        },
                        
                        heat_treatment: {
                            normalizing: '900-940°C',
                            stress_relief: '600-650°C',
                            hardening: 'Uygun değil',
                            hardenable: false
                        },
                        
                        working_conditions: {
                            temperature_min: -29,
                            temperature_max: 425,
                            corrosion_resistance: 'Düşük',
                            weldability: 'Mükemmel',
                            machinability: 'İyi',
                            pressure_rating: 'ASME B16.5 Class 150-2500'
                        },
                        
                        applications_tr: [
                            'Flanşlar ve fittingler',
                            'Vana gövdeleri',
                            'Basınçlı kap nozulları',
                            'Petrokimya boru sistemleri'
                        ],
                        applications_en: [
                            'Flanges and fittings',
                            'Valve bodies',
                            'Pressure vessel nozzles',
                            'Petrochemical piping systems'
                        ]
                    },
                    
                    'A350 LF2': {
                        code: 'A350 LF2',
                        standard: 'ASTM A350/ASME SA350',
                        equivalent: 'P355NL1 (EN), TTST 35N (DIN)',
                        density: 7850,
                        
                        mechanical: {
                            yield: 250,
                            yield_unit: 'MPa',
                            tensile_min: 485,
                            tensile_max: 655,
                            tensile_unit: 'MPa',
                            elongation: 22,
                            elongation_unit: '%',
                            hardness: 197,
                            hardness_scale: 'HB',
                            impact_energy: 20,
                            impact_temp: -46,
                            elastic_modulus: 200000
                        },
                        
                        physical: {
                            thermal_conductivity: 51.9,
                            thermal_expansion: 11.7,
                            specific_heat: 486
                        },
                        
                        chemical: {
                            'C': '≤0.30',
                            'Mn': '0.60-1.35',
                            'Si': '0.15-0.30',
                            'P': '≤0.035',
                            'S': '≤0.040',
                            'Ni': '≤0.40',
                            'Cr': '≤0.30',
                            'Mo': '≤0.12',
                            'Cu': '≤0.40'
                        },
                        
                        heat_treatment: {
                            normalizing: '880-940°C',
                            stress_relief: '600-650°C',
                            tempering: '650°C min',
                            hardenable: false,
                            impact_test: 'Zorunlu (-46°C)'
                        },
                        
                        working_conditions: {
                            temperature_min: -46,
                            temperature_max: 345,
                            corrosion_resistance: 'Düşük',
                            weldability: 'Mükemmel',
                            machinability: 'İyi',
                            ltb_resistance: 'Mükemmel'
                        },
                        
                        applications_tr: [
                            'Düşük sıcaklık flanşları',
                            'LNG/LPG sistemleri',
                            'Kriyojenik borulama',
                            'Soğuk iklim uygulamaları'
                        ],
                        applications_en: [
                            'Low temperature flanges',
                            'LNG/LPG systems',
                            'Cryogenic piping',
                            'Cold climate applications'
                        ]
                    },
                    
                    'A516 Gr.70': {
                        code: 'A516 Gr.70',
                        standard: 'ASTM A516/ASME SA516',
                        equivalent: 'P355GH (EN), 19Mn6 (DIN)',
                        density: 7850,
                        
                        mechanical: {
                            yield: 260,
                            yield_unit: 'MPa',
                            tensile_min: 485,
                            tensile_max: 620,
                            tensile_unit: 'MPa',
                            elongation: 21,
                            elongation_unit: '%',
                            hardness: 180,
                            hardness_scale: 'HB',
                            impact_energy: 27,
                            impact_temp: -46,
                            elastic_modulus: 200000
                        },
                        
                        physical: {
                            thermal_conductivity: 48,
                            thermal_expansion: 11.7,
                            specific_heat: 470
                        },
                        
                        chemical: {
                            'C': '0.27-0.31',
                            'Mn': '0.85-1.20',
                            'Si': '0.15-0.40',
                            'P': '≤0.035',
                            'S': '≤0.035'
                        },
                        
                        heat_treatment: {
                            normalizing: '900-940°C',
                            stress_relief: '600-650°C',
                            hardenable: false
                        },
                        
                        working_conditions: {
                            temperature_min: -46,
                            temperature_max: 500,
                            corrosion_resistance: 'Düşük',
                            weldability: 'Mükemmel',
                            machinability: 'İyi',
                            hic_resistance: 'Test edilmeli'
                        },
                        
                        applications_tr: [
                            'Basınçlı kap sacları',
                            'Kazanlar',
                            'Isı eşanjörleri',
                            'Storage tankları'
                        ],
                        applications_en: [
                            'Pressure vessel plates',
                            'Boilers',
                            'Heat exchangers',
                            'Storage tanks'
                        ]
                    },
                    
                    'A694 F65': {
                        code: 'A694 F65',
                        standard: 'ASTM A694/ASME SA694',
                        equivalent: 'L450 (API 5L X65)',
                        density: 7850,
                        
                        mechanical: {
                            yield: 450,
                            yield_unit: 'MPa',
                            tensile_min: 535,
                            tensile_max: 760,
                            tensile_unit: 'MPa',
                            elongation: 18,
                            elongation_unit: '%',
                            hardness: 250,
                            hardness_scale: 'HB',
                            impact_energy: 40,
                            impact_temp: -46,
                            elastic_modulus: 200000
                        },
                        
                        physical: {
                            thermal_conductivity: 45,
                            thermal_expansion: 11.7,
                            specific_heat: 460
                        },
                        
                        chemical: {
                            'C': '≤0.26',
                            'Mn': '≤1.60',
                            'Si': '≤0.45',
                            'P': '≤0.025',
                            'S': '≤0.025',
                            'Ni': '≤1.00',
                            'Cr': '≤0.40',
                            'Mo': '≤0.35'
                        },
                        
                        heat_treatment: {
                            normalizing: 'Opsiyonel',
                            quenching: '920°C / Su veya yağ',
                            tempering: '600-720°C',
                            hardenable: true
                        },
                        
                        working_conditions: {
                            temperature_min: -46,
                            temperature_max: 400,
                            corrosion_resistance: 'Orta',
                            weldability: 'İyi (PWHT gerekli)',
                            machinability: 'Orta',
                            sour_service: 'NACE MR0175 uyumlu'
                        },
                        
                        applications_tr: [
                            'Yüksek basınçlı boru hatları',
                            'Offshore platformları',
                            'Doğalgaz hatları',
                            'Petrol boru hatları'
                        ],
                        applications_en: [
                            'High pressure pipelines',
                            'Offshore platforms',
                            'Natural gas lines',
                            'Oil pipelines'
                        ]
                    }
                }
            },
            
            asme_alloy_steels: {
                name_tr: 'ASME/ASTM Alaşımlı Çelikler',
                name_en: 'ASME/ASTM Alloy Steels',
                description_tr: 'Yüksek sıcaklık ve basınç uygulamaları için alaşımlı çelikler',
                description_en: 'Alloy steels for high temperature and pressure applications',
                materials: {
                    'A182 F11': {
                        code: 'A182 F11',
                        standard: 'ASTM A182/ASME SA182',
                        equivalent: '13CrMo4-5 (EN), 1.7335',
                        density: 7850,
                        
                        mechanical: {
                            yield: 205,
                            yield_unit: 'MPa',
                            tensile_min: 415,
                            tensile_max: 585,
                            tensile_unit: 'MPa',
                            elongation: 20,
                            elongation_unit: '%',
                            hardness: 143,
                            hardness_scale: 'HB',
                            impact_energy: 45,
                            impact_temp: 20,
                            elastic_modulus: 200000
                        },
                        
                        physical: {
                            thermal_conductivity: 42.7,
                            thermal_expansion: 12.1,
                            specific_heat: 460
                        },
                        
                        chemical: {
                            'C': '0.10-0.15',
                            'Mn': '0.30-0.60',
                            'Si': '0.50-1.00',
                            'P': '≤0.030',
                            'S': '≤0.030',
                            'Cr': '1.00-1.50',
                            'Mo': '0.44-0.65'
                        },
                        
                        heat_treatment: {
                            normalizing: '900-940°C',
                            tempering: '650-750°C',
                            stress_relief: '650-700°C',
                            hardenable: true,
                            pwht: '690-720°C'
                        },
                        
                        working_conditions: {
                            temperature_min: -29,
                            temperature_max: 550,
                            corrosion_resistance: 'Orta',
                            weldability: 'İyi (PWHT gerekli)',
                            machinability: 'İyi',
                            creep_resistance: 'İyi'
                        },
                        
                        applications_tr: [
                            'Yüksek sıcaklık flanşları',
                            'Buhar hatları',
                            'Rafineriler',
                            'Petrokimya tesisleri'
                        ],
                        applications_en: [
                            'High temperature flanges',
                            'Steam lines',
                            'Refineries',
                            'Petrochemical plants'
                        ]
                    },
                    
                    'A182 F22': {
                        code: 'A182 F22',
                        standard: 'ASTM A182/ASME SA182',
                        equivalent: '10CrMo9-10 (EN), 1.7380',
                        density: 7850,
                        
                        mechanical: {
                            yield: 205,
                            yield_unit: 'MPa',
                            tensile_min: 415,
                            tensile_max: 585,
                            tensile_unit: 'MPa',
                            elongation: 20,
                            elongation_unit: '%',
                            hardness: 163,
                            hardness_scale: 'HB',
                            impact_energy: 40,
                            impact_temp: 20,
                            elastic_modulus: 200000
                        },
                        
                        physical: {
                            thermal_conductivity: 41,
                            thermal_expansion: 12.5,
                            specific_heat: 470
                        },
                        
                        chemical: {
                            'C': '0.10-0.15',
                            'Mn': '0.30-0.60',
                            'Si': '≤0.50',
                            'P': '≤0.030',
                            'S': '≤0.030',
                            'Cr': '2.00-2.50',
                            'Mo': '0.87-1.13'
                        },
                        
                        heat_treatment: {
                            normalizing: '900-940°C',
                            tempering: '650-750°C',
                            stress_relief: '680-720°C',
                            hardenable: true,
                            pwht: '690-720°C'
                        },
                        
                        working_conditions: {
                            temperature_min: -29,
                            temperature_max: 600,
                            corrosion_resistance: 'Orta',
                            weldability: 'Orta (PWHT zorunlu)',
                            machinability: 'İyi',
                            creep_resistance: 'Mükemmel'
                        },
                        
                        applications_tr: [
                            'Yüksek sıcaklık ve basınç sistemleri',
                            'Hidrojen servisi',
                            'Reformer tüpleri',
                            'Kimya endüstrisi'
                        ],
                        applications_en: [
                            'High temperature and pressure systems',
                            'Hydrogen service',
                            'Reformer tubes',
                            'Chemical industry'
                        ]
                    },
                    
                    'A182 F91': {
                        code: 'A182 F91',
                        standard: 'ASTM A182/ASME SA182',
                        equivalent: 'X10CrMoVNb9-1 (EN), 1.4903',
                        density: 7760,
                        
                        mechanical: {
                            yield: 415,
                            yield_unit: 'MPa',
                            tensile_min: 585,
                            tensile_max: 760,
                            tensile_unit: 'MPa',
                            elongation: 20,
                            elongation_unit: '%',
                            hardness: 248,
                            hardness_scale: 'HB',
                            impact_energy: 40,
                            impact_temp: 20,
                            elastic_modulus: 200000
                        },
                        
                        physical: {
                            thermal_conductivity: 26,
                            thermal_expansion: 12.6,
                            specific_heat: 470
                        },
                        
                        chemical: {
                            'C': '0.08-0.12',
                            'Mn': '0.30-0.60',
                            'Si': '0.20-0.50',
                            'P': '≤0.020',
                            'S': '≤0.010',
                            'Cr': '8.00-9.50',
                            'Mo': '0.85-1.05',
                            'V': '0.18-0.25',
                            'Nb': '0.06-0.10',
                            'N': '0.030-0.070'
                        },
                        
                        heat_treatment: {
                            normalizing: '1040-1080°C',
                            tempering: '730-780°C',
                            stress_relief: '740-770°C',
                            hardenable: true,
                            pwht: '750-770°C / Min 2 saat'
                        },
                        
                        working_conditions: {
                            temperature_min: -29,
                            temperature_max: 650,
                            corrosion_resistance: 'İyi',
                            weldability: 'Zor (özel prosedür)',
                            machinability: 'Orta',
                            creep_resistance: 'Üstün'
                        },
                        
                        applications_tr: [
                            'Ultra süper kritik kazanlar',
                            'Yüksek sıcaklık boru hatları',
                            'Güç santralleri',
                            'Petrokimya reaktörleri'
                        ],
                        applications_en: [
                            'Ultra supercritical boilers',
                            'High temperature pipelines',
                            'Power plants',
                            'Petrochemical reactors'
                        ]
                    }
                }
            },
            
            asme_stainless_steels: {
                name_tr: 'ASME/ASTM Paslanmaz Çelikler',
                name_en: 'ASME/ASTM Stainless Steels',
                description_tr: 'Korozyon dirençli östenitik ve duplex paslanmaz çelikler',
                description_en: 'Corrosion resistant austenitic and duplex stainless steels',
                materials: {
                    'A182 F304': {
                        code: 'A182 F304',
                        standard: 'ASTM A182/ASME SA182',
                        equivalent: '1.4301 (EN), X5CrNi18-10',
                        density: 7900,
                        
                        mechanical: {
                            yield: 205,
                            yield_unit: 'MPa',
                            tensile_min: 515,
                            tensile_max: 720,
                            tensile_unit: 'MPa',
                            elongation: 30,
                            elongation_unit: '%',
                            hardness: 183,
                            hardness_scale: 'HB',
                            impact_energy: 100,
                            impact_temp: -196,
                            elastic_modulus: 193000
                        },
                        
                        physical: {
                            thermal_conductivity: 16.3,
                            thermal_expansion: 17.2,
                            specific_heat: 500,
                            electrical_resistivity: 0.72
                        },
                        
                        chemical: {
                            'C': '≤0.08',
                            'Mn': '≤2.00',
                            'Si': '≤1.00',
                            'P': '≤0.045',
                            'S': '≤0.030',
                            'Cr': '18.0-20.0',
                            'Ni': '8.0-10.5'
                        },
                        
                        heat_treatment: {
                            solution_annealing: '1010-1120°C / Su',
                            stress_relief: 'Önerilmez',
                            hardenable: false,
                            sensitization: '450-850°C arası kritik'
                        },
                        
                        working_conditions: {
                            temperature_min: -196,
                            temperature_max: 816,
                            corrosion_resistance: 'Mükemmel',
                            weldability: 'Mükemmel',
                            machinability: 'Orta',
                            intergranular_corrosion: 'Hassas'
                        },
                        
                        applications_tr: [
                            'Kimyasal proses ekipmanları',
                            'Gıda endüstrisi',
                            'Kriyojenik sistemler',
                            'Isı eşanjörleri'
                        ],
                        applications_en: [
                            'Chemical process equipment',
                            'Food industry',
                            'Cryogenic systems',
                            'Heat exchangers'
                        ]
                    },
                    
                    'A182 F316': {
                        code: 'A182 F316',
                        standard: 'ASTM A182/ASME SA182',
                        equivalent: '1.4401 (EN), X5CrNiMo17-12-2',
                        density: 7980,
                        
                        mechanical: {
                            yield: 205,
                            yield_unit: 'MPa',
                            tensile_min: 515,
                            tensile_max: 720,
                            tensile_unit: 'MPa',
                            elongation: 30,
                            elongation_unit: '%',
                            hardness: 183,
                            hardness_scale: 'HB',
                            impact_energy: 100,
                            impact_temp: -196,
                            elastic_modulus: 193000
                        },
                        
                        physical: {
                            thermal_conductivity: 16.3,
                            thermal_expansion: 16.5,
                            specific_heat: 500,
                            electrical_resistivity: 0.74
                        },
                        
                        chemical: {
                            'C': '≤0.08',
                            'Mn': '≤2.00',
                            'Si': '≤1.00',
                            'P': '≤0.045',
                            'S': '≤0.030',
                            'Cr': '16.0-18.0',
                            'Ni': '10.0-14.0',
                            'Mo': '2.0-3.0'
                        },
                        
                        heat_treatment: {
                            solution_annealing: '1010-1120°C / Su',
                            stress_relief: 'Önerilmez',
                            hardenable: false,
                            sensitization: '450-850°C arası kritik'
                        },
                        
                        working_conditions: {
                            temperature_min: -196,
                            temperature_max: 816,
                            corrosion_resistance: 'Üstün',
                            weldability: 'Mükemmel',
                            machinability: 'Orta',
                            pitting_resistance: 'Mükemmel (Mo sayesinde)',
                            chloride_resistance: 'Çok iyi'
                        },
                        
                        applications_tr: [
                            'Denizcilik ekipmanları',
                            'Kimya endüstrisi',
                            'Farmasötik tesisler',
                            'Kağıt endüstrisi'
                        ],
                        applications_en: [
                            'Marine equipment',
                            'Chemical industry',
                            'Pharmaceutical facilities',
                            'Paper industry'
                        ]
                    },
                    
                    'A182 F51': {
                        code: 'A182 F51',
                        standard: 'ASTM A182/ASME SA182',
                        equivalent: '1.4462 (EN), 2205 Duplex',
                        density: 7800,
                        
                        mechanical: {
                            yield: 450,
                            yield_unit: 'MPa',
                            tensile_min: 620,
                            tensile_max: 880,
                            tensile_unit: 'MPa',
                            elongation: 25,
                            elongation_unit: '%',
                            hardness: 290,
                            hardness_scale: 'HB',
                            impact_energy: 40,
                            impact_temp: -46,
                            elastic_modulus: 200000
                        },
                        
                        physical: {
                            thermal_conductivity: 19,
                            thermal_expansion: 13.7,
                            specific_heat: 470,
                            magnetic_permeability: 30
                        },
                        
                        chemical: {
                            'C': '≤0.03',
                            'Mn': '≤2.00',
                            'Si': '≤1.00',
                            'P': '≤0.030',
                            'S': '≤0.020',
                            'Cr': '21.0-23.0',
                            'Ni': '4.5-6.5',
                            'Mo': '2.5-3.5',
                            'N': '0.08-0.20'
                        },
                        
                        heat_treatment: {
                            solution_annealing: '1020-1100°C / Su',
                            stress_relief: '≤315°C',
                            hardenable: false,
                            critical_temp: '475°C embrittlement'
                        },
                        
                        working_conditions: {
                            temperature_min: -50,
                            temperature_max: 300,
                            corrosion_resistance: 'Üstün',
                            weldability: 'İyi (kontrollü)',
                            machinability: 'Zor',
                            scc_resistance: 'Mükemmel',
                            pren: '>35'
                        },
                        
                        applications_tr: [
                            'Offshore platformları',
                            'Deniz suyu sistemleri',
                            'Kimyasal tanklar',
                            'Desalinasyon tesisleri'
                        ],
                        applications_en: [
                            'Offshore platforms',
                            'Seawater systems',
                            'Chemical tanks',
                            'Desalination plants'
                        ]
                    }
                }
            },
            
            // ===== MÜHENDİSLİK PLASTİKLERİ =====
            engineering_plastics: {
                name_tr: 'Mühendislik Plastikleri',
                name_en: 'Engineering Plastics',
                description_tr: 'Yüksek performanslı termoplastik ve termoset plastikler',
                description_en: 'High performance thermoplastic and thermoset plastics',
                materials: {
                    'PE-UHMW': {
                        code: 'PE-UHMW',
                        standard: 'ISO 11542-2',
                        equivalent: 'TIVAR® 1000, Polystone® M',
                        density: 930,
                        
                        mechanical: {
                            yield: 21,
                            yield_unit: 'MPa',
                            tensile_min: 35,
                            tensile_max: 45,
                            tensile_unit: 'MPa',
                            elongation: 350,
                            elongation_unit: '%',
                            hardness: 64,
                            hardness_scale: 'Shore D',
                            impact_energy: 'No break',
                            elastic_modulus: 680
                        },
                        
                        physical: {
                            thermal_conductivity: 0.4,
                            thermal_expansion: 200,
                            specific_heat: 1900,
                            melting_point: 135,
                            glass_transition: -150
                        },
                        
                        chemical: {
                            water_absorption: '<0.01',
                            chemical_resistance: 'Mükemmel',
                            uv_resistance: 'Zayıf (katkısız)',
                            flammability: 'HB (UL94)'
                        },
                        
                        tribological: {
                            friction_coefficient_dry: 0.10,
                            friction_coefficient_wet: 0.05,
                            wear_rate: '15 μm/km',
                            pv_limit: '0.11 MPa·m/s'
                        },
                        
                        working_conditions: {
                            temperature_min: -200,
                            temperature_max: 90,
                            continuous_temp: 80,
                            fda_approved: true,
                            self_lubricating: true
                        },
                        
                        applications_tr: [
                            'Aşınma plakaları',
                            'Kayar yataklar',
                            'Konveyör kızakları',
                            'Gıda endüstrisi ekipmanları',
                            'Kimyasal tanklar'
                        ],
                        applications_en: [
                            'Wear plates',
                            'Sliding bearings',
                            'Conveyor guides',
                            'Food industry equipment',
                            'Chemical tanks'
                        ]
                    },
                    
                    'PA6': {
                        code: 'PA6',
                        standard: 'ISO 1874-2',
                        equivalent: 'Nylon 6, Akulon®, Zytel®',
                        density: 1130,
                        
                        mechanical: {
                            yield: 80,
                            yield_unit: 'MPa',
                            tensile_min: 70,
                            tensile_max: 85,
                            tensile_unit: 'MPa',
                            elongation: 50,
                            elongation_unit: '%',
                            hardness: 82,
                            hardness_scale: 'Shore D',
                            impact_energy: 5,
                            elastic_modulus: 2800
                        },
                        
                        physical: {
                            thermal_conductivity: 0.25,
                            thermal_expansion: 80,
                            specific_heat: 1700,
                            melting_point: 220,
                            glass_transition: 60
                        },
                        
                        chemical: {
                            water_absorption: '1.3',
                            chemical_resistance: 'İyi',
                            uv_resistance: 'Orta',
                            flammability: 'V-2 (UL94)'
                        },
                        
                        tribological: {
                            friction_coefficient_dry: 0.35,
                            friction_coefficient_wet: 0.25,
                            wear_rate: '200 μm/km',
                            pv_limit: '0.20 MPa·m/s'
                        },
                        
                        working_conditions: {
                            temperature_min: -40,
                            temperature_max: 100,
                            continuous_temp: 85,
                            fda_approved: true,
                            moisture_sensitive: true
                        },
                        
                        applications_tr: [
                            'Dişliler',
                            'Rulmanlar',
                            'Burçlar',
                            'Makaralar',
                            'Otomotiv parçaları'
                        ],
                        applications_en: [
                            'Gears',
                            'Bearings',
                            'Bushings',
                            'Rollers',
                            'Automotive parts'
                        ]
                    },
                    
                    'PA66': {
                        code: 'PA66',
                        standard: 'ISO 1874-2',
                        equivalent: 'Nylon 66, Zytel®, Ultramid®',
                        density: 1140,
                        
                        mechanical: {
                            yield: 85,
                            yield_unit: 'MPa',
                            tensile_min: 75,
                            tensile_max: 90,
                            tensile_unit: 'MPa',
                            elongation: 30,
                            elongation_unit: '%',
                            hardness: 85,
                            hardness_scale: 'Shore D',
                            impact_energy: 4,
                            elastic_modulus: 3200
                        },
                        
                        physical: {
                            thermal_conductivity: 0.25,
                            thermal_expansion: 80,
                            specific_heat: 1700,
                            melting_point: 265,
                            glass_transition: 70
                        },
                        
                        chemical: {
                            water_absorption: '0.9',
                            chemical_resistance: 'İyi',
                            uv_resistance: 'Orta',
                            flammability: 'V-2 (UL94)'
                        },
                        
                        tribological: {
                            friction_coefficient_dry: 0.40,
                            friction_coefficient_wet: 0.25,
                            wear_rate: '180 μm/km',
                            pv_limit: '0.25 MPa·m/s'
                        },
                        
                        working_conditions: {
                            temperature_min: -40,
                            temperature_max: 120,
                            continuous_temp: 100,
                            fda_approved: true,
                            moisture_sensitive: true
                        },
                        
                        applications_tr: [
                            'Yüksek dayanımlı dişliler',
                            'Elektrik konnektörleri',
                            'Kablo bağları',
                            'Otomotiv yakıt sistemleri',
                            'Endüstriyel parçalar'
                        ],
                        applications_en: [
                            'High strength gears',
                            'Electrical connectors',
                            'Cable ties',
                            'Automotive fuel systems',
                            'Industrial parts'
                        ]
                    },
                    
                    'POM-C': {
                        code: 'POM-C',
                        standard: 'ISO 9988-1',
                        equivalent: 'Acetal Copolymer, Hostaform®, Ultraform®',
                        density: 1410,
                        
                        mechanical: {
                            yield: 65,
                            yield_unit: 'MPa',
                            tensile_min: 60,
                            tensile_max: 70,
                            tensile_unit: 'MPa',
                            elongation: 30,
                            elongation_unit: '%',
                            hardness: 80,
                            hardness_scale: 'Shore D',
                            impact_energy: 6,
                            elastic_modulus: 2600
                        },
                        
                        physical: {
                            thermal_conductivity: 0.31,
                            thermal_expansion: 110,
                            specific_heat: 1460,
                            melting_point: 165,
                            glass_transition: -60
                        },
                        
                        chemical: {
                            water_absorption: '0.20',
                            chemical_resistance: 'Mükemmel',
                            uv_resistance: 'Zayıf',
                            flammability: 'HB (UL94)'
                        },
                        
                        tribological: {
                            friction_coefficient_dry: 0.20,
                            friction_coefficient_wet: 0.15,
                            wear_rate: '60 μm/km',
                            pv_limit: '0.20 MPa·m/s'
                        },
                        
                        working_conditions: {
                            temperature_min: -40,
                            temperature_max: 100,
                            continuous_temp: 95,
                            fda_approved: true,
                            dimensional_stability: 'Mükemmel'
                        },
                        
                        applications_tr: [
                            'Hassas dişliler',
                            'Pompalar',
                            'Valfler',
                            'Rulmanlar',
                            'Mekanik parçalar'
                        ],
                        applications_en: [
                            'Precision gears',
                            'Pumps',
                            'Valves',
                            'Bearings',
                            'Mechanical parts'
                        ]
                    },
                    
                    'POM-H': {
                        code: 'POM-H',
                        standard: 'ISO 9988-2',
                        equivalent: 'Delrin®, Acetal Homopolymer',
                        density: 1420,
                        
                        mechanical: {
                            yield: 70,
                            yield_unit: 'MPa',
                            tensile_min: 65,
                            tensile_max: 75,
                            tensile_unit: 'MPa',
                            elongation: 25,
                            elongation_unit: '%',
                            hardness: 85,
                            hardness_scale: 'Shore D',
                            impact_energy: 5,
                            elastic_modulus: 3100
                        },
                        
                        physical: {
                            thermal_conductivity: 0.31,
                            thermal_expansion: 100,
                            specific_heat: 1460,
                            melting_point: 175,
                            glass_transition: -60
                        },
                        
                        chemical: {
                            water_absorption: '0.20',
                            chemical_resistance: 'Mükemmel',
                            uv_resistance: 'Zayıf',
                            flammability: 'HB (UL94)'
                        },
                        
                        tribological: {
                            friction_coefficient_dry: 0.20,
                            friction_coefficient_wet: 0.15,
                            wear_rate: '50 μm/km',
                            pv_limit: '0.25 MPa·m/s'
                        },
                        
                        working_conditions: {
                            temperature_min: -40,
                            temperature_max: 110,
                            continuous_temp: 100,
                            fda_approved: true,
                            dimensional_stability: 'Mükemmel'
                        },
                        
                        applications_tr: [
                            'Yüksek hassasiyetli parçalar',
                            'Elektrik yalıtkanları',
                            'Otomotiv yakıt sistemleri',
                            'Pompalar',
                            'Kaymalı yataklar'
                        ],
                        applications_en: [
                            'High precision parts',
                            'Electrical insulators',
                            'Automotive fuel systems',
                            'Pumps',
                            'Sliding bearings'
                        ]
                    },
                    
                    'PTFE': {
                        code: 'PTFE',
                        standard: 'ASTM D4894',
                        equivalent: 'Teflon®, Fluon®, Algoflon®',
                        density: 2150,
                        
                        mechanical: {
                            yield: 12,
                            yield_unit: 'MPa',
                            tensile_min: 20,
                            tensile_max: 35,
                            tensile_unit: 'MPa',
                            elongation: 300,
                            elongation_unit: '%',
                            hardness: 55,
                            hardness_scale: 'Shore D',
                            impact_energy: 'No break',
                            elastic_modulus: 400
                        },
                        
                        physical: {
                            thermal_conductivity: 0.25,
                            thermal_expansion: 135,
                            specific_heat: 1000,
                            melting_point: 327,
                            glass_transition: 127
                        },
                        
                        chemical: {
                            water_absorption: '0.00',
                            chemical_resistance: 'Üstün',
                            uv_resistance: 'Mükemmel',
                            flammability: 'V-0 (UL94)'
                        },
                        
                        tribological: {
                            friction_coefficient_dry: 0.04,
                            friction_coefficient_wet: 0.04,
                            wear_rate: '100 μm/km',
                            pv_limit: '0.10 MPa·m/s'
                        },
                        
                        working_conditions: {
                            temperature_min: -200,
                            temperature_max: 260,
                            continuous_temp: 260,
                            fda_approved: true,
                            non_stick: true,
                            electrical_insulation: 'Mükemmel'
                        },
                        
                        applications_tr: [
                            'Sızdırmazlık elemanları',
                            'Kimyasal ekipmanlar',
                            'Yalıtkan parçalar',
                            'Yapışmaz kaplamalar',
                            'Medikal implantlar'
                        ],
                        applications_en: [
                            'Sealing elements',
                            'Chemical equipment',
                            'Insulating parts',
                            'Non-stick coatings',
                            'Medical implants'
                        ]
                    },
                    
                    'PEEK': {
                        code: 'PEEK',
                        standard: 'ISO 19066',
                        equivalent: 'Victrex®, Ketron®',
                        density: 1320,
                        
                        mechanical: {
                            yield: 100,
                            yield_unit: 'MPa',
                            tensile_min: 90,
                            tensile_max: 100,
                            tensile_unit: 'MPa',
                            elongation: 50,
                            elongation_unit: '%',
                            hardness: 85,
                            hardness_scale: 'Shore D',
                            impact_energy: 7,
                            elastic_modulus: 3600
                        },
                        
                        physical: {
                            thermal_conductivity: 0.25,
                            thermal_expansion: 47,
                            specific_heat: 1340,
                            melting_point: 343,
                            glass_transition: 143
                        },
                        
                        chemical: {
                            water_absorption: '0.10',
                            chemical_resistance: 'Üstün',
                            uv_resistance: 'İyi',
                            flammability: 'V-0 (UL94)'
                        },
                        
                        tribological: {
                            friction_coefficient_dry: 0.35,
                            friction_coefficient_wet: 0.20,
                            wear_rate: '15 μm/km',
                            pv_limit: '1.0 MPa·m/s'
                        },
                        
                        working_conditions: {
                            temperature_min: -60,
                            temperature_max: 250,
                            continuous_temp: 250,
                            fda_approved: true,
                            sterilizable: true,
                            radiation_resistant: true
                        },
                        
                        applications_tr: [
                            'Havacılık parçaları',
                            'Medikal implantlar',
                            'Yüksek sıcaklık yatakları',
                            'Kimyasal proses ekipmanları',
                            'Elektronik konnektörler'
                        ],
                        applications_en: [
                            'Aerospace parts',
                            'Medical implants',
                            'High temperature bearings',
                            'Chemical process equipment',
                            'Electronic connectors'
                        ]
                    },
                    
                    'PC': {
                        code: 'PC',
                        standard: 'ISO 7391',
                        equivalent: 'Lexan®, Makrolon®',
                        density: 1200,
                        
                        mechanical: {
                            yield: 65,
                            yield_unit: 'MPa',
                            tensile_min: 60,
                            tensile_max: 70,
                            tensile_unit: 'MPa',
                            elongation: 110,
                            elongation_unit: '%',
                            hardness: 70,
                            hardness_scale: 'Shore D',
                            impact_energy: 60,
                            elastic_modulus: 2300
                        },
                        
                        physical: {
                            thermal_conductivity: 0.20,
                            thermal_expansion: 65,
                            specific_heat: 1200,
                            melting_point: 267,
                            glass_transition: 150
                        },
                        
                        chemical: {
                            water_absorption: '0.15',
                            chemical_resistance: 'Zayıf',
                            uv_resistance: 'Zayıf (katkısız)',
                            flammability: 'V-2 (UL94)',
                            light_transmission: '90%'
                        },
                        
                        tribological: {
                            friction_coefficient_dry: 0.38,
                            friction_coefficient_wet: 0.30,
                            wear_rate: '30 μm/km',
                            pv_limit: '0.30 MPa·m/s'
                        },
                        
                        working_conditions: {
                            temperature_min: -40,
                            temperature_max: 120,
                            continuous_temp: 115,
                            fda_approved: true,
                            impact_resistant: 'Mükemmel',
                            optical_clarity: 'Mükemmel'
                        },
                        
                        applications_tr: [
                            'Güvenlik camları',
                            'Otomotiv farları',
                            'Elektronik kasalar',
                            'Medikal cihazlar',
                            'Optik diskler'
                        ],
                        applications_en: [
                            'Safety glazing',
                            'Automotive lights',
                            'Electronic housings',
                            'Medical devices',
                            'Optical disks'
                        ]
                    },
                    
                    'PU': {
                        code: 'PU',
                        standard: 'ISO 16365',
                        equivalent: 'Vulkollan®, Adiprene®',
                        density: 1200,
                        
                        mechanical: {
                            yield: 50,
                            yield_unit: 'MPa',
                            tensile_min: 40,
                            tensile_max: 60,
                            tensile_unit: 'MPa',
                            elongation: 500,
                            elongation_unit: '%',
                            hardness: 90,
                            hardness_scale: 'Shore A',
                            impact_energy: 'No break',
                            elastic_modulus: 50
                        },
                        
                        physical: {
                            thermal_conductivity: 0.25,
                            thermal_expansion: 150,
                            specific_heat: 1800,
                            melting_point: 'N/A',
                            glass_transition: -30
                        },
                        
                        chemical: {
                            water_absorption: '0.3',
                            chemical_resistance: 'Orta',
                            uv_resistance: 'Zayıf',
                            flammability: 'HB (UL94)',
                            oil_resistance: 'Mükemmel'
                        },
                        
                        tribological: {
                            friction_coefficient_dry: 0.50,
                            friction_coefficient_wet: 0.30,
                            wear_rate: '50 μm/km',
                            pv_limit: '0.50 MPa·m/s',
                            abrasion_resistance: 'Üstün'
                        },
                        
                        working_conditions: {
                            temperature_min: -30,
                            temperature_max: 80,
                            continuous_temp: 80,
                            fda_approved: false,
                            elastomeric: true,
                            load_bearing: 'Mükemmel'
                        },
                        
                        applications_tr: [
                            'Tekerlekler',
                            'Tamponlar',
                            'Titreşim damperleri',
                            'Contalar',
                            'Konveyör bantları'
                        ],
                        applications_en: [
                            'Wheels',
                            'Bumpers',
                            'Vibration dampers',
                            'Seals',
                            'Conveyor belts'
                        ]
                    }
                }
            },
            
            // ===== DEMİR DIŞI METALLER =====
            non_ferrous_alloys: {
                name_tr: 'Demir Dışı Metal Alaşımları',
                name_en: 'Non-Ferrous Metal Alloys',
                description_tr: 'Alüminyum, bakır, pirinç, bronz ve diğer alaşımlar',
                description_en: 'Aluminum, copper, brass, bronze and other alloys',
                materials: {
                    'Al 5083': {
                        code: 'Al 5083',
                        standard: 'EN AW-5083 / AA5083',
                        equivalent: 'AlMg4.5Mn0.7, 3.3547',
                        density: 2660,
                        
                        mechanical: {
                            yield: 125,
                            yield_unit: 'MPa',
                            tensile_min: 275,
                            tensile_max: 350,
                            tensile_unit: 'MPa',
                            elongation: 16,
                            elongation_unit: '%',
                            hardness: 75,
                            hardness_scale: 'HB',
                            elastic_modulus: 70500
                        },
                        
                        physical: {
                            thermal_conductivity: 117,
                            thermal_expansion: 24,
                            specific_heat: 900,
                            electrical_conductivity: '29% IACS'
                        },
                        
                        chemical: {
                            'Al': 'Kalan',
                            'Mg': '4.0-4.9',
                            'Mn': '0.40-1.0',
                            'Cr': '0.05-0.25',
                            'Si': '≤0.40',
                            'Fe': '≤0.40',
                            'Cu': '≤0.10'
                        },
                        
                        heat_treatment: {
                            annealing: '345°C',
                            stress_relief: '220-240°C',
                            hardenable: false,
                            weldable: true
                        },
                        
                        working_conditions: {
                            temperature_min: -270,
                            temperature_max: 150,
                            corrosion_resistance: 'Mükemmel (deniz suyu)',
                            weldability: 'Mükemmel',
                            machinability: 'İyi',
                            anodizable: true
                        },
                        
                        applications_tr: [
                            'Denizcilik yapıları',
                            'Kriyojenik tanklar',
                            'Basınçlı kaplar',
                            'Gemi gövdeleri',
                            'Kaynaklı konstrüksiyonlar'
                        ],
                        applications_en: [
                            'Marine structures',
                            'Cryogenic tanks',
                            'Pressure vessels',
                            'Ship hulls',
                            'Welded structures'
                        ]
                    },
                    
                    'Al 6061-T6': {
                        code: 'Al 6061-T6',
                        standard: 'EN AW-6061 / AA6061',
                        equivalent: 'AlMg1SiCu, 3.3211',
                        density: 2700,
                        
                        mechanical: {
                            yield: 275,
                            yield_unit: 'MPa',
                            tensile_min: 310,
                            tensile_max: 340,
                            tensile_unit: 'MPa',
                            elongation: 12,
                            elongation_unit: '%',
                            hardness: 95,
                            hardness_scale: 'HB',
                            elastic_modulus: 68900
                        },
                        
                        physical: {
                            thermal_conductivity: 167,
                            thermal_expansion: 23.6,
                            specific_heat: 896,
                            electrical_conductivity: '43% IACS'
                        },
                        
                        chemical: {
                            'Al': 'Kalan',
                            'Mg': '0.8-1.2',
                            'Si': '0.4-0.8',
                            'Cu': '0.15-0.40',
                            'Cr': '0.04-0.35',
                            'Fe': '≤0.7',
                            'Mn': '≤0.15'
                        },
                        
                        heat_treatment: {
                            solution: '530°C',
                            aging: '160°C / 18 saat',
                            hardenable: true,
                            t6_condition: true
                        },
                        
                        working_conditions: {
                            temperature_min: -80,
                            temperature_max: 150,
                            corrosion_resistance: 'İyi',
                            weldability: 'İyi',
                            machinability: 'Mükemmel',
                            anodizable: true
                        },
                        
                        applications_tr: [
                            'Yapısal profiller',
                            'Makine parçaları',
                            'Otomotiv bileşenleri',
                            'Havacılık yapıları',
                            'Bisiklet çerçeveleri'
                        ],
                        applications_en: [
                            'Structural profiles',
                            'Machine parts',
                            'Automotive components',
                            'Aerospace structures',
                            'Bicycle frames'
                        ]
                    },
                    
                    'Al 7075-T6': {
                        code: 'Al 7075-T6',
                        standard: 'EN AW-7075 / AA7075',
                        equivalent: 'AlZn5.5MgCu, 3.4365',
                        density: 2810,
                        
                        mechanical: {
                            yield: 505,
                            yield_unit: 'MPa',
                            tensile_min: 570,
                            tensile_max: 590,
                            tensile_unit: 'MPa',
                            elongation: 11,
                            elongation_unit: '%',
                            hardness: 150,
                            hardness_scale: 'HB',
                            elastic_modulus: 71700
                        },
                        
                        physical: {
                            thermal_conductivity: 130,
                            thermal_expansion: 23.6,
                            specific_heat: 960,
                            electrical_conductivity: '33% IACS'
                        },
                        
                        chemical: {
                            'Al': 'Kalan',
                            'Zn': '5.1-6.1',
                            'Mg': '2.1-2.9',
                            'Cu': '1.2-2.0',
                            'Cr': '0.18-0.28',
                            'Fe': '≤0.50',
                            'Si': '≤0.40'
                        },
                        
                        heat_treatment: {
                            solution: '465-475°C',
                            aging: '120°C / 24 saat',
                            hardenable: true,
                            t6_condition: true
                        },
                        
                        working_conditions: {
                            temperature_min: -80,
                            temperature_max: 120,
                            corrosion_resistance: 'Orta',
                            weldability: 'Zayıf',
                            machinability: 'İyi',
                            stress_corrosion: 'Hassas'
                        },
                        
                        applications_tr: [
                            'Havacılık yapıları',
                            'Yüksek dayanımlı parçalar',
                            'Spor ekipmanları',
                            'Kalıp blokları',
                            'Savunma sanayii'
                        ],
                        applications_en: [
                            'Aerospace structures',
                            'High strength parts',
                            'Sports equipment',
                            'Mold blocks',
                            'Defense industry'
                        ]
                    },
                    
                    'CuZn37 (Ms63)': {
                        code: 'CuZn37',
                        standard: 'EN CW508L / DIN 2.0321',
                        equivalent: 'Brass Ms63, C27200',
                        density: 8440,
                        
                        mechanical: {
                            yield: 140,
                            yield_unit: 'MPa',
                            tensile_min: 340,
                            tensile_max: 450,
                            tensile_unit: 'MPa',
                            elongation: 45,
                            elongation_unit: '%',
                            hardness: 80,
                            hardness_scale: 'HB',
                            elastic_modulus: 97000
                        },
                        
                        physical: {
                            thermal_conductivity: 123,
                            thermal_expansion: 20.5,
                            specific_heat: 377,
                            electrical_conductivity: '27% IACS'
                        },
                        
                        chemical: {
                            'Cu': '62.0-64.0',
                            'Zn': 'Kalan',
                            'Pb': '≤0.10',
                            'Fe': '≤0.10',
                            'Ni': '≤0.30',
                            'Sn': '≤0.10'
                        },
                        
                        heat_treatment: {
                            annealing: '450-600°C',
                            stress_relief: '250-300°C',
                            hardenable: false
                        },
                        
                        working_conditions: {
                            temperature_min: -200,
                            temperature_max: 150,
                            corrosion_resistance: 'İyi',
                            weldability: 'İyi',
                            machinability: 'Mükemmel',
                            dezincification: 'Risk var'
                        },
                        
                        applications_tr: [
                            'Vana ve fittingler',
                            'Dekoratif parçalar',
                            'Elektrik konnektörleri',
                            'Müzik aletleri',
                            'Vidalar ve somunlar'
                        ],
                        applications_en: [
                            'Valves and fittings',
                            'Decorative parts',
                            'Electrical connectors',
                            'Musical instruments',
                            'Screws and nuts'
                        ]
                    },
                    
                    'CuSn8 (Bronz)': {
                        code: 'CuSn8',
                        standard: 'EN CW453K / DIN 2.1030',
                        equivalent: 'Bronze C52100, PB1',
                        density: 8800,
                        
                        mechanical: {
                            yield: 180,
                            yield_unit: 'MPa',
                            tensile_min: 350,
                            tensile_max: 450,
                            tensile_unit: 'MPa',
                            elongation: 20,
                            elongation_unit: '%',
                            hardness: 90,
                            hardness_scale: 'HB',
                            elastic_modulus: 110000
                        },
                        
                        physical: {
                            thermal_conductivity: 75,
                            thermal_expansion: 18,
                            specific_heat: 377,
                            electrical_conductivity: '12% IACS'
                        },
                        
                        chemical: {
                            'Cu': 'Kalan',
                            'Sn': '7.5-8.5',
                            'P': '0.01-0.35',
                            'Pb': '≤0.05',
                            'Fe': '≤0.10',
                            'Zn': '≤0.20'
                        },
                        
                        heat_treatment: {
                            annealing: '600-650°C',
                            stress_relief: '250°C',
                            hardenable: false
                        },
                        
                        working_conditions: {
                            temperature_min: -200,
                            temperature_max: 200,
                            corrosion_resistance: 'Mükemmel',
                            weldability: 'İyi',
                            machinability: 'İyi',
                            wear_resistance: 'Mükemmel'
                        },
                        
                        applications_tr: [
                            'Kaymalı yataklar',
                            'Burçlar',
                            'Dişli çarklar',
                            'Pompa parçaları',
                            'Denizcilik donanımları'
                        ],
                        applications_en: [
                            'Sliding bearings',
                            'Bushings',
                            'Gear wheels',
                            'Pump parts',
                            'Marine equipment'
                        ]
                    },
                    
                    'CuAl10Fe5Ni5 (NAB)': {
                        code: 'CuAl10Fe5Ni5',
                        standard: 'EN CW307G / DIN 2.0966',
                        equivalent: 'C63000, NAB',
                        density: 7600,
                        
                        mechanical: {
                            yield: 250,
                            yield_unit: 'MPa',
                            tensile_min: 600,
                            tensile_max: 700,
                            tensile_unit: 'MPa',
                            elongation: 13,
                            elongation_unit: '%',
                            hardness: 170,
                            hardness_scale: 'HB',
                            elastic_modulus: 120000
                        },
                        
                        physical: {
                            thermal_conductivity: 45,
                            thermal_expansion: 16.2,
                            specific_heat: 420,
                            electrical_conductivity: '7% IACS'
                        },
                        
                        chemical: {
                            'Cu': 'Kalan',
                            'Al': '8.5-10.5',
                            'Fe': '3.5-5.5',
                            'Ni': '3.5-5.5',
                            'Mn': '≤1.5',
                            'Si': '≤0.10'
                        },
                        
                        heat_treatment: {
                            annealing: '675°C',
                            tempering: '650°C / 2-6 saat',
                            hardenable: true
                        },
                        
                        working_conditions: {
                            temperature_min: -200,
                            temperature_max: 300,
                            corrosion_resistance: 'Üstün (deniz suyu)',
                            weldability: 'İyi',
                            machinability: 'Orta',
                            cavitation_resistance: 'Mükemmel'
                        },
                        
                        applications_tr: [
                            'Gemi pervaneleri',
                            'Deniz suyu pompaları',
                            'Valfler',
                            'Denizcilik ekipmanları',
                            'Yüksek dayanımlı yataklar'
                        ],
                        applications_en: [
                            'Ship propellers',
                            'Seawater pumps',
                            'Valves',
                            'Marine equipment',
                            'Heavy duty bearings'
                        ]
                    },
                    
                    'Cu-ETP (C11000)': {
                        code: 'C11000',
                        standard: 'ASTM B152 / EN CW004A',
                        equivalent: 'E-Cu58, OF-Cu',
                        density: 8960,
                        
                        mechanical: {
                            yield: 69,
                            yield_unit: 'MPa',
                            tensile_min: 220,
                            tensile_max: 260,
                            tensile_unit: 'MPa',
                            elongation: 45,
                            elongation_unit: '%',
                            hardness: 45,
                            hardness_scale: 'HB',
                            elastic_modulus: 117000
                        },
                        
                        physical: {
                            thermal_conductivity: 391,
                            thermal_expansion: 16.5,
                            specific_heat: 385,
                            electrical_conductivity: '101% IACS'
                        },
                        
                        chemical: {
                            'Cu': '≥99.90',
                            'O': '≤0.04',
                            'Ag': '≤0.003',
                            'As': '≤0.0005',
                            'Bi': '≤0.0005'
                        },
                        
                        heat_treatment: {
                            annealing: '200-650°C',
                            stress_relief: '150-200°C',
                            hardenable: false
                        },
                        
                        working_conditions: {
                            temperature_min: -270,
                            temperature_max: 200,
                            corrosion_resistance: 'Mükemmel',
                            weldability: 'İyi',
                            machinability: 'Orta',
                            electrical_conductor: 'Mükemmel'
                        },
                        
                        applications_tr: [
                            'Elektrik iletkenleri',
                            'Bara ve kablolar',
                            'Isı eşanjörleri',
                            'Elektronik bileşenler',
                            'Lehimleme uçları'
                        ],
                        applications_en: [
                            'Electrical conductors',
                            'Busbars and cables',
                            'Heat exchangers',
                            'Electronic components',
                            'Soldering tips'
                        ]
                    }
                }
            },
            
            special_alloys: {
                name_tr: 'Özel Alaşımlar',
                name_en: 'Special Alloys',
                description_tr: 'Titanyum, nikel ve süper alaşımlar',
                description_en: 'Titanium, nickel and superalloys',
                materials: {
                    'Ti Gr.2': {
                        code: 'Ti Grade 2',
                        standard: 'ASTM B265 / AMS 4902',
                        equivalent: '3.7035, CP Ti Grade 2',
                        density: 4507,
                        
                        mechanical: {
                            yield: 275,
                            yield_unit: 'MPa',
                            tensile_min: 345,
                            tensile_max: 450,
                            tensile_unit: 'MPa',
                            elongation: 20,
                            elongation_unit: '%',
                            hardness: 150,
                            hardness_scale: 'HB',
                            elastic_modulus: 103000
                        },
                        
                        physical: {
                            thermal_conductivity: 21.9,
                            thermal_expansion: 8.6,
                            specific_heat: 523,
                            melting_point: 1668
                        },
                        
                        chemical: {
                            'Ti': 'Kalan',
                            'Fe': '≤0.30',
                            'O': '≤0.25',
                            'C': '≤0.08',
                            'N': '≤0.03',
                            'H': '≤0.015'
                        },
                        
                        heat_treatment: {
                            annealing: '600-700°C',
                            stress_relief: '480-595°C',
                            hardenable: false,
                            beta_transus: '913°C'
                        },
                        
                        working_conditions: {
                            temperature_min: -270,
                            temperature_max: 300,
                            corrosion_resistance: 'Üstün',
                            weldability: 'Mükemmel',
                            machinability: 'Zor',
                            biocompatibility: 'Mükemmel'
                        },
                        
                        applications_tr: [
                            'Kimya endüstrisi',
                            'Medikal implantlar',
                            'Deniz suyu sistemleri',
                            'Isı eşanjörleri',
                            'Havacılık yapıları'
                        ],
                        applications_en: [
                            'Chemical industry',
                            'Medical implants',
                            'Seawater systems',
                            'Heat exchangers',
                            'Aerospace structures'
                        ]
                    },
                    
                    'Ti Gr.5 (Ti-6Al-4V)': {
                        code: 'Ti Grade 5',
                        standard: 'ASTM B265 / AMS 4911',
                        equivalent: '3.7165, Ti-6Al-4V',
                        density: 4430,
                        
                        mechanical: {
                            yield: 880,
                            yield_unit: 'MPa',
                            tensile_min: 950,
                            tensile_max: 1050,
                            tensile_unit: 'MPa',
                            elongation: 14,
                            elongation_unit: '%',
                            hardness: 334,
                            hardness_scale: 'HB',
                            elastic_modulus: 113800
                        },
                        
                        physical: {
                            thermal_conductivity: 6.7,
                            thermal_expansion: 8.6,
                            specific_heat: 526,
                            melting_point: 1649
                        },
                        
                        chemical: {
                            'Ti': 'Kalan',
                            'Al': '5.5-6.75',
                            'V': '3.5-4.5',
                            'Fe': '≤0.40',
                            'O': '≤0.20',
                            'C': '≤0.08'
                        },
                        
                        heat_treatment: {
                            solution: '920-980°C',
                            aging: '480-595°C',
                            hardenable: true,
                            beta_transus: '995°C'
                        },
                        
                        working_conditions: {
                            temperature_min: -270,
                            temperature_max: 400,
                            corrosion_resistance: 'Üstün',
                            weldability: 'İyi',
                            machinability: 'Zor',
                            fatigue_resistance: 'Mükemmel'
                        },
                        
                        applications_tr: [
                            'Havacılık bileşenleri',
                            'Medikal implantlar',
                            'Yüksek performans parçalar',
                            'Turbin kanatları',
                            'Yarış araçları parçaları'
                        ],
                        applications_en: [
                            'Aerospace components',
                            'Medical implants',
                            'High performance parts',
                            'Turbine blades',
                            'Racing car parts'
                        ]
                    },
                    
                    'Inconel 625': {
                        code: 'Inconel 625',
                        standard: 'ASTM B443 / AMS 5666',
                        equivalent: '2.4856, NiCr22Mo9Nb',
                        density: 8440,
                        
                        mechanical: {
                            yield: 460,
                            yield_unit: 'MPa',
                            tensile_min: 830,
                            tensile_max: 1030,
                            tensile_unit: 'MPa',
                            elongation: 42,
                            elongation_unit: '%',
                            hardness: 200,
                            hardness_scale: 'HB',
                            elastic_modulus: 205000
                        },
                        
                        physical: {
                            thermal_conductivity: 9.8,
                            thermal_expansion: 12.8,
                            specific_heat: 410,
                            melting_point: 1350
                        },
                        
                        chemical: {
                            'Ni': '≥58.0',
                            'Cr': '20.0-23.0',
                            'Mo': '8.0-10.0',
                            'Nb+Ta': '3.15-4.15',
                            'Fe': '≤5.0',
                            'Co': '≤1.0'
                        },
                        
                        heat_treatment: {
                            solution: '1095-1205°C',
                            stress_relief: '870°C',
                            hardenable: false,
                            precipitation: 'Hayır'
                        },
                        
                        working_conditions: {
                            temperature_min: -250,
                            temperature_max: 980,
                            corrosion_resistance: 'Üstün',
                            weldability: 'Mükemmel',
                            machinability: 'Zor',
                            creep_resistance: 'Mükemmel'
                        },
                        
                        applications_tr: [
                            'Denizcilik ekipmanları',
                            'Kimya prosesleri',
                            'Havacılık sistemleri',
                            'Nükleer reaktörler',
                            'Egzoz sistemleri'
                        ],
                        applications_en: [
                            'Marine equipment',
                            'Chemical processes',
                            'Aerospace systems',
                            'Nuclear reactors',
                            'Exhaust systems'
                        ]
                    },
                    
                    'Inconel 718': {
                        code: 'Inconel 718',
                        standard: 'ASTM B637 / AMS 5662',
                        equivalent: '2.4668, NiCr19Fe19Nb5Mo3',
                        density: 8190,
                        
                        mechanical: {
                            yield: 1035,
                            yield_unit: 'MPa',
                            tensile_min: 1275,
                            tensile_max: 1375,
                            tensile_unit: 'MPa',
                            elongation: 21,
                            elongation_unit: '%',
                            hardness: 363,
                            hardness_scale: 'HB',
                            elastic_modulus: 200000
                        },
                        
                        physical: {
                            thermal_conductivity: 11.4,
                            thermal_expansion: 13,
                            specific_heat: 435,
                            melting_point: 1336
                        },
                        
                        chemical: {
                            'Ni': '50.0-55.0',
                            'Cr': '17.0-21.0',
                            'Fe': 'Kalan',
                            'Mo': '2.8-3.3',
                            'Nb+Ta': '4.75-5.5',
                            'Ti': '0.65-1.15',
                            'Al': '0.20-0.80'
                        },
                        
                        heat_treatment: {
                            solution: '980°C',
                            aging: '720°C/8h + 620°C/8h',
                            hardenable: true,
                            precipitation: 'Evet'
                        },
                        
                        working_conditions: {
                            temperature_min: -250,
                            temperature_max: 700,
                            corrosion_resistance: 'Mükemmel',
                            weldability: 'İyi',
                            machinability: 'Zor',
                            fatigue_resistance: 'Mükemmel'
                        },
                        
                        applications_tr: [
                            'Gaz türbinleri',
                            'Roket motorları',
                            'Nükleer reaktörler',
                            'Kriyojenik tanklar',
                            'Yüksek sıcaklık yayları'
                        ],
                        applications_en: [
                            'Gas turbines',
                            'Rocket engines',
                            'Nuclear reactors',
                            'Cryogenic tanks',
                            'High temperature springs'
                        ]
                    },
                    
                    'Monel 400': {
                        code: 'Monel 400',
                        standard: 'ASTM B164 / UNS N04400',
                        equivalent: '2.4360, NiCu30Fe',
                        density: 8830,
                        
                        mechanical: {
                            yield: 240,
                            yield_unit: 'MPa',
                            tensile_min: 550,
                            tensile_max: 620,
                            tensile_unit: 'MPa',
                            elongation: 35,
                            elongation_unit: '%',
                            hardness: 140,
                            hardness_scale: 'HB',
                            elastic_modulus: 179000
                        },
                        
                        physical: {
                            thermal_conductivity: 21.8,
                            thermal_expansion: 13.9,
                            specific_heat: 427,
                            melting_point: 1350
                        },
                        
                        chemical: {
                            'Ni': '≥63.0',
                            'Cu': '28.0-34.0',
                            'Fe': '≤2.5',
                            'Mn': '≤2.0',
                            'Si': '≤0.5',
                            'C': '≤0.3'
                        },
                        
                        heat_treatment: {
                            annealing: '870-980°C',
                            stress_relief: '525-550°C',
                            hardenable: false
                        },
                        
                        working_conditions: {
                            temperature_min: -200,
                            temperature_max: 500,
                            corrosion_resistance: 'Üstün (deniz suyu)',
                            weldability: 'Mükemmel',
                            machinability: 'Orta',
                            hf_resistance: 'Mükemmel'
                        },
                        
                        applications_tr: [
                            'Denizcilik ekipmanları',
                            'Kimyasal proses ekipmanları',
                            'Petrol rafinerileri',
                            'Isı eşanjörleri',
                            'Deniz suyu vanaları'
                        ],
                        applications_en: [
                            'Marine equipment',
                            'Chemical process equipment',
                            'Oil refineries',
                            'Heat exchangers',
                            'Seawater valves'
                        ]
                    },
                    
                    'Hastelloy C-276': {
                        code: 'Hastelloy C-276',
                        standard: 'ASTM B574 / UNS N10276',
                        equivalent: '2.4819, NiMo16Cr15W',
                        density: 8890,
                        
                        mechanical: {
                            yield: 355,
                            yield_unit: 'MPa',
                            tensile_min: 790,
                            tensile_max: 900,
                            tensile_unit: 'MPa',
                            elongation: 40,
                            elongation_unit: '%',
                            hardness: 215,
                            hardness_scale: 'HB',
                            elastic_modulus: 205000
                        },
                        
                        physical: {
                            thermal_conductivity: 10.2,
                            thermal_expansion: 11.2,
                            specific_heat: 427,
                            melting_point: 1370
                        },
                        
                        chemical: {
                            'Ni': 'Kalan',
                            'Mo': '15.0-17.0',
                            'Cr': '14.5-16.5',
                            'Fe': '4.0-7.0',
                            'W': '3.0-4.5',
                            'Co': '≤2.5'
                        },
                        
                        heat_treatment: {
                            solution: '1121°C',
                            stress_relief: 'Önerilmez',
                            hardenable: false
                        },
                        
                        working_conditions: {
                            temperature_min: -200,
                            temperature_max: 1040,
                            corrosion_resistance: 'Üstün (asit)',
                            weldability: 'Mükemmel',
                            machinability: 'Zor',
                            pitting_resistance: 'Mükemmel'
                        },
                        
                        applications_tr: [
                            'Kimya prosesleri',
                            'Flue gas desülfürizasyon',
                            'Klor gazı sistemleri',
                            'Atık yakma tesisleri',
                            'Asit üretimi'
                        ],
                        applications_en: [
                            'Chemical processes',
                            'Flue gas desulfurization',
                            'Chlorine gas systems',
                            'Waste incineration plants',
                            'Acid production'
                        ]
                    }
                }
            },

            // ===== AVRUPA STANDARTLARI (EN) - YAPI VE GENEL ÇELİKLER =====
            structural_steels: {
                name_tr: 'Yapı Çelikleri (EN)',
                name_en: 'Structural Steels (EN)',
                description_tr: 'Genel yapı ve konstrüksiyon uygulamalarında kullanılan Avrupa standardı çelikler',
                description_en: 'European standard steels used in general construction and structural applications',
                materials: {
                    'S235JR': {
                        code: 'S235JR',
                        standard: 'EN 10025-2',
                        equivalent: 'St 37-2 (DIN), A283 Gr.D (ASTM)',
                        density: 7850,
                        
                        mechanical: {
                            yield: 235,
                            yield_unit: 'MPa',
                            tensile_min: 360,
                            tensile_max: 510,
                            tensile_unit: 'MPa',
                            elongation: 26,
                            elongation_unit: '%',
                            hardness: 120,
                            hardness_scale: 'HB',
                            impact_energy: 27,
                            impact_temp: 20,
                            elastic_modulus: 210000
                        },
                        
                        physical: {
                            thermal_conductivity: 52,
                            thermal_expansion: 11.7,
                            specific_heat: 486,
                            electrical_resistivity: 0.21
                        },
                        
                        chemical: {
                            'C': '≤0.17',
                            'Mn': '≤1.40',
                            'Si': '-',
                            'P': '≤0.035',
                            'S': '≤0.035',
                            'Cu': '≤0.55',
                            'N': '≤0.012'
                        },
                        
                        heat_treatment: {
                            normalizing: '880-940°C',
                            stress_relief: '550-650°C',
                            hardening: 'Uygun değil',
                            hardenable: false
                        },
                        
                        working_conditions: {
                            temperature_min: -20,
                            temperature_max: 300,
                            corrosion_resistance: 'Düşük',
                            weldability: 'Mükemmel',
                            machinability: 'İyi',
                            formability: 'Mükemmel'
                        },
                        
                        applications_tr: [
                            'Hafif çelik konstrüksiyonlar',
                            'Köprüler ve binalar',
                            'Makine imalatı',
                            'Kaynaklı yapılar',
                            'Basınçsız tanklar'
                        ],
                        applications_en: [
                            'Light steel constructions',
                            'Bridges and buildings',
                            'Machine manufacturing',
                            'Welded structures',
                            'Non-pressure vessels'
                        ]
                    },
                    
                    'S275JR': {
                        code: 'S275JR',
                        standard: 'EN 10025-2',
                        equivalent: 'St 44-2 (DIN), A572 Gr.42 (ASTM)',
                        density: 7850,
                        
                        mechanical: {
                            yield: 275,
                            yield_unit: 'MPa',
                            tensile_min: 430,
                            tensile_max: 580,
                            tensile_unit: 'MPa',
                            elongation: 23,
                            elongation_unit: '%',
                            hardness: 130,
                            hardness_scale: 'HB',
                            impact_energy: 27,
                            impact_temp: 20,
                            elastic_modulus: 210000
                        },
                        
                        physical: {
                            thermal_conductivity: 52,
                            thermal_expansion: 11.7,
                            specific_heat: 486,
                            electrical_resistivity: 0.21
                        },
                        
                        chemical: {
                            'C': '≤0.21',
                            'Mn': '≤1.50',
                            'Si': '-',
                            'P': '≤0.035',
                            'S': '≤0.035',
                            'Cu': '≤0.55',
                            'N': '≤0.012'
                        },
                        
                        heat_treatment: {
                            normalizing: '880-940°C',
                            stress_relief: '550-650°C',
                            hardening: 'Uygun değil',
                            hardenable: false
                        },
                        
                        working_conditions: {
                            temperature_min: -20,
                            temperature_max: 300,
                            corrosion_resistance: 'Düşük',
                            weldability: 'Mükemmel',
                            machinability: 'İyi',
                            formability: 'Çok iyi'
                        },
                        
                        applications_tr: [
                            'Orta dayanımlı yapı elemanları',
                            'Köprü konstrüksiyonları',
                            'Vinç kirişleri',
                            'Ağır makine şasileri',
                            'Endüstriyel binalar'
                        ],
                        applications_en: [
                            'Medium strength structural elements',
                            'Bridge constructions',
                            'Crane beams',
                            'Heavy machinery chassis',
                            'Industrial buildings'
                        ]
                    },
                    
                    'S355J2': {
                        code: 'S355J2',
                        standard: 'EN 10025-2',
                        equivalent: 'St 52-3 (DIN), A572 Gr.50 (ASTM)',
                        density: 7850,
                        
                        mechanical: {
                            yield: 355,
                            yield_unit: 'MPa',
                            tensile_min: 510,
                            tensile_max: 680,
                            tensile_unit: 'MPa',
                            elongation: 22,
                            elongation_unit: '%',
                            hardness: 150,
                            hardness_scale: 'HB',
                            impact_energy: 27,
                            impact_temp: -20,
                            elastic_modulus: 210000
                        },
                        
                        physical: {
                            thermal_conductivity: 52,
                            thermal_expansion: 11.7,
                            specific_heat: 486,
                            electrical_resistivity: 0.21
                        },
                        
                        chemical: {
                            'C': '≤0.22',
                            'Mn': '≤1.60',
                            'Si': '≤0.55',
                            'P': '≤0.030',
                            'S': '≤0.030',
                            'Cu': '≤0.55'
                        },
                        
                        heat_treatment: {
                            normalizing: '870-920°C',
                            stress_relief: '550-650°C',
                            hardening: 'Kısıtlı',
                            tempering: '550-650°C',
                            hardenable: false,
                            nitriding: true
                        },
                        
                        working_conditions: {
                            temperature_min: -20,
                            temperature_max: 300,
                            corrosion_resistance: 'Düşük',
                            weldability: 'İyi',
                            machinability: 'Orta',
                            formability: 'İyi'
                        },
                        
                        applications_tr: [
                            'Yüksek dayanımlı yapılar',
                            'Ağır yük taşıyan konstrüksiyonlar',
                            'Büyük açıklıklı yapılar',
                            'Offshore yapıları',
                            'Rüzgar türbini kuleleri'
                        ],
                        applications_en: [
                            'High strength structures',
                            'Heavy load bearing constructions',
                            'Large span structures',
                            'Offshore structures',
                            'Wind turbine towers'
                        ]
                    }
                }
            },
            
            carbon_steels: {
                name_tr: 'Karbon Çelikleri (EN)',
                name_en: 'Carbon Steels (EN)',
                description_tr: 'Düşük, orta ve yüksek karbonlu ısıl işlem çelikleri',
                description_en: 'Low, medium and high carbon heat treatable steels',
                materials: {
                    'C45': {
                        code: 'C45',
                        standard: 'EN 10083-2',
                        equivalent: '1.0503, Ck45 (DIN), 1045 (AISI)',
                        density: 7850,
                        
                        mechanical: {
                            yield: 305,
                            yield_unit: 'MPa',
                            tensile_min: 580,
                            tensile_max: 700,
                            tensile_unit: 'MPa',
                            elongation: 16,
                            elongation_unit: '%',
                            hardness: 170,
                            hardness_scale: 'HB',
                            impact_energy: 30,
                            impact_temp: 20,
                            elastic_modulus: 210000
                        },
                        
                        physical: {
                            thermal_conductivity: 49,
                            thermal_expansion: 11.7,
                            specific_heat: 486,
                            electrical_resistivity: 0.21
                        },
                        
                        chemical: {
                            'C': '0.42-0.50',
                            'Mn': '0.50-0.80',
                            'Si': '≤0.40',
                            'P': '≤0.035',
                            'S': '≤0.035',
                            'Cr': '≤0.40',
                            'Mo': '≤0.10',
                            'Ni': '≤0.40'
                        },
                        
                        heat_treatment: {
                            normalizing: '850-880°C',
                            stress_relief: '550-650°C',
                            hardening: '820-860°C / Su',
                            tempering: '550-660°C',
                            hardenable: true,
                            carburizing: false,
                            nitriding: true,
                            max_hardness: '55 HRC'
                        },
                        
                        working_conditions: {
                            temperature_min: -40,
                            temperature_max: 400,
                            corrosion_resistance: 'Düşük',
                            weldability: 'Orta (ön ısıtma gerekli)',
                            machinability: 'İyi',
                            formability: 'Orta'
                        },
                        
                        applications_tr: [
                            'Mil ve akslar',
                            'Dişliler',
                            'Krank milleri',
                            'Bağlantı elemanları',
                            'Makine parçaları'
                        ],
                        applications_en: [
                            'Shafts and axles',
                            'Gears',
                            'Crankshafts',
                            'Connection elements',
                            'Machine parts'
                        ]
                    },
                    
                    'C60': {
                        code: 'C60',
                        standard: 'EN 10083-2',
                        equivalent: '1.0601, Ck60 (DIN), 1060 (AISI)',
                        density: 7850,
                        
                        mechanical: {
                            yield: 340,
                            yield_unit: 'MPa',
                            tensile_min: 650,
                            tensile_max: 800,
                            tensile_unit: 'MPa',
                            elongation: 13,
                            elongation_unit: '%',
                            hardness: 190,
                            hardness_scale: 'HB',
                            impact_energy: 20,
                            impact_temp: 20,
                            elastic_modulus: 210000
                        },
                        
                        physical: {
                            thermal_conductivity: 48,
                            thermal_expansion: 11.7,
                            specific_heat: 486,
                            electrical_resistivity: 0.21
                        },
                        
                        chemical: {
                            'C': '0.57-0.65',
                            'Mn': '0.60-0.90',
                            'Si': '≤0.40',
                            'P': '≤0.035',
                            'S': '≤0.035'
                        },
                        
                        heat_treatment: {
                            normalizing: '830-860°C',
                            stress_relief: '550-650°C',
                            hardening: '810-840°C / Su',
                            tempering: '540-680°C',
                            hardenable: true,
                            carburizing: false,
                            nitriding: true,
                            max_hardness: '58 HRC'
                        },
                        
                        working_conditions: {
                            temperature_min: -40,
                            temperature_max: 400,
                            corrosion_resistance: 'Düşük',
                            weldability: 'Zayıf (özel önlem gerekli)',
                            machinability: 'Orta',
                            formability: 'Zayıf'
                        },
                        
                        applications_tr: [
                            'Yaylar',
                            'Zincirler',
                            'El aletleri',
                            'Tarım makineleri parçaları',
                            'Raylı sistem bileşenleri'
                        ],
                        applications_en: [
                            'Springs',
                            'Chains',
                            'Hand tools',
                            'Agricultural machinery parts',
                            'Railway system components'
                        ]
                    }
                }
            },
            
            alloy_steels: {
                name_tr: 'Alaşımlı Çelikler (EN)',
                name_en: 'Alloy Steels (EN)',
                description_tr: 'Krom, molibden, nikel alaşımlı yüksek mukavemetli çelikler',
                description_en: 'Chrome, molybdenum, nickel alloyed high strength steels',
                materials: {
                    '42CrMo4': {
                        code: '42CrMo4',
                        standard: 'EN 10083-3',
                        equivalent: '1.7225, 4140 (AISI), SCM440 (JIS)',
                        density: 7850,
                        
                        mechanical: {
                            yield: 650,
                            yield_unit: 'MPa',
                            tensile_min: 900,
                            tensile_max: 1100,
                            tensile_unit: 'MPa',
                            elongation: 12,
                            elongation_unit: '%',
                            hardness: 280,
                            hardness_scale: 'HB',
                            impact_energy: 35,
                            impact_temp: 20,
                            elastic_modulus: 210000
                        },
                        
                        physical: {
                            thermal_conductivity: 42,
                            thermal_expansion: 12.3,
                            specific_heat: 473,
                            electrical_resistivity: 0.22
                        },
                        
                        chemical: {
                            'C': '0.38-0.45',
                            'Mn': '0.60-0.90',
                            'Si': '≤0.40',
                            'P': '≤0.025',
                            'S': '≤0.035',
                            'Cr': '0.90-1.20',
                            'Mo': '0.15-0.30'
                        },
                        
                        heat_treatment: {
                            normalizing: '850-880°C',
                            stress_relief: '550-650°C',
                            hardening: '830-860°C / Yağ',
                            tempering: '540-680°C',
                            hardenable: true,
                            carburizing: false,
                            nitriding: true,
                            max_hardness: '55 HRC'
                        },
                        
                        working_conditions: {
                            temperature_min: -40,
                            temperature_max: 500,
                            corrosion_resistance: 'Orta',
                            weldability: 'Zayıf (PWHT gerekli)',
                            machinability: 'İyi',
                            formability: 'Orta'
                        },
                        
                        applications_tr: [
                            'Yüksek mukavemetli miller',
                            'Dişli çarklar',
                            'Krank milleri',
                            'Bağlantı çubukları',
                            'Basınçlı kap bileşenleri'
                        ],
                        applications_en: [
                            'High strength shafts',
                            'Gear wheels',
                            'Crankshafts',
                            'Connecting rods',
                            'Pressure vessel components'
                        ]
                    },
                    
                    '16MnCr5': {
                        code: '16MnCr5',
                        standard: 'EN 10084',
                        equivalent: '1.7131, 5115 (AISI), SCr415 (JIS)',
                        density: 7850,
                        
                        mechanical: {
                            yield: 440,
                            yield_unit: 'MPa',
                            tensile_min: 680,
                            tensile_max: 830,
                            tensile_unit: 'MPa',
                            elongation: 14,
                            elongation_unit: '%',
                            hardness: 200,
                            hardness_scale: 'HB',
                            impact_energy: 40,
                            impact_temp: 20,
                            elastic_modulus: 210000
                        },
                        
                        physical: {
                            thermal_conductivity: 46,
                            thermal_expansion: 11.5,
                            specific_heat: 470,
                            electrical_resistivity: 0.20
                        },
                        
                        chemical: {
                            'C': '0.14-0.19',
                            'Mn': '1.00-1.30',
                            'Si': '≤0.40',
                            'P': '≤0.025',
                            'S': '≤0.035',
                            'Cr': '0.80-1.10'
                        },
                        
                        heat_treatment: {
                            normalizing: '870-920°C',
                            stress_relief: '600-650°C',
                            hardening: '880-920°C / Yağ',
                            tempering: '150-200°C',
                            hardenable: true,
                            carburizing: true,
                            nitriding: true,
                            case_hardening: '900-950°C',
                            max_hardness: '62 HRC (yüzey)'
                        },
                        
                        working_conditions: {
                            temperature_min: -40,
                            temperature_max: 400,
                            corrosion_resistance: 'Orta',
                            weldability: 'İyi',
                            machinability: 'İyi',
                            formability: 'İyi'
                        },
                        
                        applications_tr: [
                            'Sementasyon dişlileri',
                            'Pim ve miller',
                            'Kam milleri',
                            'Zincir elemanları',
                            'Rulman bileşenleri'
                        ],
                        applications_en: [
                            'Case hardening gears',
                            'Pins and shafts',
                            'Camshafts',
                            'Chain elements',
                            'Bearing components'
                        ]
                    },
                    
                    '34CrNiMo6': {
                        code: '34CrNiMo6',
                        standard: 'EN 10083-3',
                        equivalent: '1.6582, 4340 (AISI), SNCM447 (JIS)',
                        density: 7850,
                        
                        mechanical: {
                            yield: 800,
                            yield_unit: 'MPa',
                            tensile_min: 1000,
                            tensile_max: 1200,
                            tensile_unit: 'MPa',
                            elongation: 11,
                            elongation_unit: '%',
                            hardness: 320,
                            hardness_scale: 'HB',
                            impact_energy: 45,
                            impact_temp: 20,
                            elastic_modulus: 210000
                        },
                        
                        physical: {
                            thermal_conductivity: 40,
                            thermal_expansion: 12.0,
                            specific_heat: 460,
                            electrical_resistivity: 0.23
                        },
                        
                        chemical: {
                            'C': '0.30-0.38',
                            'Mn': '0.50-0.80',
                            'Si': '≤0.40',
                            'P': '≤0.025',
                            'S': '≤0.035',
                            'Cr': '1.30-1.70',
                            'Ni': '1.30-1.70',
                            'Mo': '0.15-0.30'
                        },
                        
                        heat_treatment: {
                            normalizing: '850-880°C',
                            stress_relief: '600-650°C',
                            hardening: '830-860°C / Yağ',
                            tempering: '550-660°C',
                            hardenable: true,
                            carburizing: false,
                            nitriding: true,
                            max_hardness: '58 HRC'
                        },
                        
                        working_conditions: {
                            temperature_min: -60,
                            temperature_max: 500,
                            corrosion_resistance: 'Orta',
                            weldability: 'Zayıf (özel önlem)',
                            machinability: 'Orta',
                            formability: 'Orta'
                        },
                        
                        applications_tr: [
                            'Yüksek yüklü miller',
                            'Türbin rotorları',
                            'Havacılık bileşenleri',
                            'Ağır makine parçaları',
                            'Krank milleri'
                        ],
                        applications_en: [
                            'Heavy duty shafts',
                            'Turbine rotors',
                            'Aviation components',
                            'Heavy machinery parts',
                            'Crankshafts'
                        ]
                    }
                }
            },
            
            en_stainless_steels: {
                name_tr: 'Paslanmaz Çelikler (EN)',
                name_en: 'Stainless Steels (EN)',
                description_tr: 'Korozyon direnci yüksek östenitik, ferritik ve duplex çelikler',
                description_en: 'High corrosion resistant austenitic, ferritic and duplex steels',
                materials: {
                    '1.4301': {
                        code: '1.4301',
                        standard: 'EN 10088-2',
                        equivalent: '304 (AISI), X5CrNi18-10, SUS304 (JIS)',
                        density: 7900,
                        
                        mechanical: {
                            yield: 210,
                            yield_unit: 'MPa',
                            tensile_min: 520,
                            tensile_max: 720,
                            tensile_unit: 'MPa',
                            elongation: 45,
                            elongation_unit: '%',
                            hardness: 200,
                            hardness_scale: 'HB',
                            impact_energy: 100,
                            impact_temp: 20,
                            elastic_modulus: 200000
                        },
                        
                        physical: {
                            thermal_conductivity: 15,
                            thermal_expansion: 17.2,
                            specific_heat: 500,
                            electrical_resistivity: 0.73
                        },
                        
                        chemical: {
                            'C': '≤0.07',
                            'Mn': '≤2.00',
                            'Si': '≤1.00',
                            'P': '≤0.045',
                            'S': '≤0.015',
                            'Cr': '17.5-19.5',
                            'Ni': '8.0-10.5'
                        },
                        
                        heat_treatment: {
                            solution_annealing: '1000-1100°C / Su',
                            stress_relief: '400-450°C',
                            hardenable: false,
                            sensitization: '450-850°C arası kritik'
                        },
                        
                        working_conditions: {
                            temperature_min: -270,
                            temperature_max: 800,
                            corrosion_resistance: 'Mükemmel',
                            weldability: 'Mükemmel',
                            machinability: 'Orta',
                            formability: 'Mükemmel',
                            intergranular_corrosion: 'Hassas'
                        },
                        
                        applications_tr: [
                            'Gıda endüstrisi ekipmanları',
                            'Kimya tankları',
                            'Mimari uygulamalar',
                            'Mutfak ekipmanları',
                            'Tıbbi cihazlar'
                        ],
                        applications_en: [
                            'Food industry equipment',
                            'Chemical tanks',
                            'Architectural applications',
                            'Kitchen equipment',
                            'Medical devices'
                        ]
                    },
                    
                    '1.4401': {
                        code: '1.4401',
                        standard: 'EN 10088-2',
                        equivalent: '316 (AISI), X5CrNiMo17-12-2, SUS316 (JIS)',
                        density: 7980,
                        
                        mechanical: {
                            yield: 220,
                            yield_unit: 'MPa',
                            tensile_min: 520,
                            tensile_max: 720,
                            tensile_unit: 'MPa',
                            elongation: 45,
                            elongation_unit: '%',
                            hardness: 200,
                            hardness_scale: 'HB',
                            impact_energy: 100,
                            impact_temp: 20,
                            elastic_modulus: 200000
                        },
                        
                        physical: {
                            thermal_conductivity: 15,
                            thermal_expansion: 16.5,
                            specific_heat: 500,
                            electrical_resistivity: 0.75
                        },
                        
                        chemical: {
                            'C': '≤0.07',
                            'Mn': '≤2.00',
                            'Si': '≤1.00',
                            'P': '≤0.045',
                            'S': '≤0.015',
                            'Cr': '16.5-18.5',
                            'Ni': '10.5-13.5',
                            'Mo': '2.0-2.5'
                        },
                        
                        heat_treatment: {
                            solution_annealing: '1020-1120°C / Su',
                            stress_relief: '400-450°C',
                            hardenable: false,
                            sensitization: '450-850°C arası kritik'
                        },
                        
                        working_conditions: {
                            temperature_min: -270,
                            temperature_max: 800,
                            corrosion_resistance: 'Üstün',
                            weldability: 'Mükemmel',
                            machinability: 'Orta',
                            formability: 'Mükemmel',
                            pitting_resistance: 'Mükemmel',
                            chloride_resistance: 'Çok iyi'
                        },
                        
                        applications_tr: [
                            'Denizcilik ekipmanları',
                            'Kimyasal proses ekipmanları',
                            'Farmasötik endüstrisi',
                            'Tıbbi implantlar',
                            'Yüksek sıcaklık uygulamaları'
                        ],
                        applications_en: [
                            'Marine equipment',
                            'Chemical process equipment',
                            'Pharmaceutical industry',
                            'Medical implants',
                            'High temperature applications'
                        ]
                    },
                    
                    '1.4462': {
                        code: '1.4462',
                        standard: 'EN 10088-3',
                        equivalent: '2205 (UNS S31803), X2CrNiMoN22-5-3',
                        density: 7800,
                        
                        mechanical: {
                            yield: 450,
                            yield_unit: 'MPa',
                            tensile_min: 640,
                            tensile_max: 840,
                            tensile_unit: 'MPa',
                            elongation: 25,
                            elongation_unit: '%',
                            hardness: 250,
                            hardness_scale: 'HB',
                            impact_energy: 100,
                            impact_temp: -40,
                            elastic_modulus: 200000
                        },
                        
                        physical: {
                            thermal_conductivity: 19,
                            thermal_expansion: 13.7,
                            specific_heat: 470,
                            electrical_resistivity: 0.85
                        },
                        
                        chemical: {
                            'C': '≤0.03',
                            'Mn': '≤2.00',
                            'Si': '≤1.00',
                            'P': '≤0.035',
                            'S': '≤0.015',
                            'Cr': '21.0-23.0',
                            'Ni': '4.5-6.5',
                            'Mo': '2.5-3.5',
                            'N': '0.10-0.22'
                        },
                        
                        heat_treatment: {
                            solution_annealing: '1020-1100°C / Su',
                            stress_relief: '280-320°C',
                            hardenable: false,
                            critical_temp: '475°C tehlikeli'
                        },
                        
                        working_conditions: {
                            temperature_min: -50,
                            temperature_max: 280,
                            corrosion_resistance: 'Üstün',
                            weldability: 'İyi (kontrollü)',
                            machinability: 'Zor',
                            formability: 'Orta',
                            pitting_resistance: 'Mükemmel (PREN>35)',
                            scc_resistance: 'Mükemmel'
                        },
                        
                        applications_tr: [
                            'Offshore platformları',
                            'Deniz suyu sistemleri',
                            'Kimyasal tanklar',
                            'Basınçlı kaplar',
                            'Kağıt endüstrisi ekipmanları'
                        ],
                        applications_en: [
                            'Offshore platforms',
                            'Seawater systems',
                            'Chemical tanks',
                            'Pressure vessels',
                            'Paper industry equipment'
                        ]
                    }
                }
            },
            
            tool_steels: {
                name_tr: 'Takım Çelikleri (EN)',
                name_en: 'Tool Steels (EN)',
                description_tr: 'Soğuk iş, sıcak iş ve yüksek hız takım çelikleri',
                description_en: 'Cold work, hot work and high speed tool steels',
                materials: {
                    '1.2379': {
                        code: '1.2379',
                        standard: 'EN ISO 4957',
                        equivalent: 'D2 (AISI), X153CrMoV12, SKD11 (JIS)',
                        density: 7700,
                        
                        mechanical: {
                            yield: 1800,
                            yield_unit: 'MPa',
                            tensile_min: 2000,
                            tensile_max: 2200,
                            tensile_unit: 'MPa',
                            elongation: 8,
                            elongation_unit: '%',
                            hardness: 250,
                            hardness_scale: 'HB',
                            impact_energy: 10,
                            impact_temp: 20,
                            elastic_modulus: 210000
                        },
                        
                        physical: {
                            thermal_conductivity: 20,
                            thermal_expansion: 10.4,
                            specific_heat: 460,
                            electrical_resistivity: 0.65
                        },
                        
                        chemical: {
                            'C': '1.45-1.60',
                            'Mn': '0.20-0.60',
                            'Si': '0.10-0.60',
                            'P': '≤0.030',
                            'S': '≤0.030',
                            'Cr': '11.00-13.00',
                            'Mo': '0.70-1.20',
                            'V': '0.70-1.00'
                        },
                        
                        heat_treatment: {
                            normalizing: '870-900°C',
                            stress_relief: '650-680°C',
                            hardening: '1000-1040°C / Hava',
                            tempering: '180-250°C',
                            hardenable: true,
                            carburizing: false,
                            nitriding: true,
                            max_hardness: '62 HRC',
                            annealing: '840-870°C'
                        },
                        
                        working_conditions: {
                            temperature_min: -100,
                            temperature_max: 400,
                            corrosion_resistance: 'Orta',
                            weldability: 'Çok zor',
                            machinability: 'Zor (tavlanmış)',
                            formability: 'Zayıf',
                            wear_resistance: 'Mükemmel',
                            toughness: 'Orta'
                        },
                        
                        applications_tr: [
                            'Soğuk iş kalıpları',
                            'Kesme takımları',
                            'Form verme kalıpları',
                            'Hadde merdaneleri',
                            'Derin çekme kalıpları'
                        ],
                        applications_en: [
                            'Cold work dies',
                            'Cutting tools',
                            'Forming dies',
                            'Rolling rolls',
                            'Deep drawing dies'
                        ]
                    },
                    
                    '1.2344': {
                        code: '1.2344',
                        standard: 'EN ISO 4957',
                        equivalent: 'H13 (AISI), X40CrMoV5-1, SKD61 (JIS)',
                        density: 7800,
                        
                        mechanical: {
                            yield: 1450,
                            yield_unit: 'MPa',
                            tensile_min: 1650,
                            tensile_max: 1900,
                            tensile_unit: 'MPa',
                            elongation: 10,
                            elongation_unit: '%',
                            hardness: 230,
                            hardness_scale: 'HB',
                            impact_energy: 20,
                            impact_temp: 20,
                            elastic_modulus: 215000
                        },
                        
                        physical: {
                            thermal_conductivity: 25,
                            thermal_expansion: 10.4,
                            specific_heat: 460,
                            electrical_resistivity: 0.52
                        },
                        
                        chemical: {
                            'C': '0.35-0.42',
                            'Mn': '0.20-0.50',
                            'Si': '0.80-1.20',
                            'P': '≤0.030',
                            'S': '≤0.020',
                            'Cr': '4.75-5.50',
                            'Mo': '1.10-1.75',
                            'V': '0.80-1.20'
                        },
                        
                        heat_treatment: {
                            normalizing: '850-900°C',
                            stress_relief: '600-650°C',
                            hardening: '990-1050°C / Hava',
                            tempering: '550-650°C',
                            hardenable: true,
                            carburizing: false,
                            nitriding: true,
                            max_hardness: '55 HRC',
                            annealing: '750-800°C'
                        },
                        
                        working_conditions: {
                            temperature_min: -50,
                            temperature_max: 600,
                            corrosion_resistance: 'Orta',
                            weldability: 'Zor (PWHT gerekli)',
                            machinability: 'Orta',
                            formability: 'Orta',
                            thermal_fatigue: 'Mükemmel',
                            hot_hardness: 'Çok iyi'
                        },
                        
                        applications_tr: [
                            'Döküm kalıpları',
                            'Ekstrüzyon kalıpları',
                            'Dövme kalıpları',
                            'Plastik enjeksiyon kalıpları',
                            'Basınçlı döküm kalıpları'
                        ],
                        applications_en: [
                            'Die casting dies',
                            'Extrusion dies',
                            'Forging dies',
                            'Plastic injection molds',
                            'Pressure die casting dies'
                        ]
                    }
                }
            }
        },
        
        getCurrentLanguage() {
            return localStorage.getItem('selectedLanguage') || 'tr';
        },
        
        searchMaterials(searchTerm) {
            const results = [];
            const term = searchTerm.toLowerCase().trim();
            
            if (!term || term.length < 2) return results;
            
            for (const categoryKey of Object.keys(this.categories)) {
                const category = this.categories[categoryKey];
                
                for (const materialCode of Object.keys(category.materials)) {
                    const material = category.materials[materialCode];
                    
                    // Malzeme kodu, standart veya eşdeğerlerde ara
                    const searchFields = [
                        material.code?.toLowerCase(),
                        material.standard?.toLowerCase(),
                        material.equivalent?.toLowerCase()
                    ].filter(field => field);
                    
                    const isMatch = searchFields.some(field => field.includes(term));
                    
                    if (isMatch) {
                        results.push({
                            categoryKey: categoryKey,
                            categoryName: this.getCurrentLanguage() === 'tr' ? 
                                category.name_tr : category.name_en,
                            material: material,
                            score: this.calculateSearchScore(term, searchFields)
                        });
                    }
                }
            }
            
            // Skorlara göre sırala
            results.sort((a, b) => b.score - a.score);
            
            return results;
        },
        
        calculateSearchScore(searchTerm, fields) {
            let maxScore = 0;
            
            fields.forEach(field => {
                if (field === searchTerm) {
                    maxScore = Math.max(maxScore, 100);
                } else if (field.startsWith(searchTerm)) {
                    maxScore = Math.max(maxScore, 80);
                } else if (field.includes(searchTerm)) {
                    maxScore = Math.max(maxScore, 60);
                }
            });
            
            return maxScore;
        },
        
        generateHTML() {
            const lang = this.getCurrentLanguage();
            let html = `
                <div class="ultra-materials-container">
                    <div class="materials-header-section">
                        <div class="header-content">
                            <h2>${lang === 'tr' ? 'Ultra Kapsamlı Malzeme Veritabanı' : 'Ultra Comprehensive Material Database'}</h2>
                            <p class="version-info">v${this.version} - ${lang === 'tr' ? 
                                'ASME, EN, DIN, JIS Standartları - Teknik Özellikler' : 
                                'ASME, EN, DIN, JIS Standards - Technical Properties'}</p>
                        </div>
                        
                        <div class="search-section">
                            <div class="search-box">
                                <input type="text" 
                                       id="materialSearchInput" 
                                       placeholder="${lang === 'tr' ? 
                                           'Malzeme kodu veya standart ara (örn: A105, 304, 5083, PEEK)' : 
                                           'Search material code or standard (e.g. A105, 304, 5083, PEEK)'}"
                                       onkeyup="MaterialDatabase.performSearch(this.value)">
                                <span class="search-icon">🔍</span>
                            </div>
                            
                            <div class="quick-links">
                                ${Object.keys(this.categories).map(key => {
                                    const category = this.categories[key];
                                    const name = lang === 'tr' ? category.name_tr : category.name_en;
                                    return `<button class="quick-link-btn" onclick="MaterialDatabase.scrollToCategory('${key}')">${name}</button>`;
                                }).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <div id="searchResults" class="search-results-container" style="display: none;"></div>
                    
                    <div id="categoriesContainer" class="categories-container">`;
            
            // Kategoriler
            for (const [key, category] of Object.entries(this.categories)) {
                const categoryName = lang === 'tr' ? category.name_tr : category.name_en;
                const categoryDesc = lang === 'tr' ? category.description_tr : category.description_en;
                
                html += `
                    <div class="material-category-ultra" id="category-section-${key}">
                        <div class="category-header-ultra" onclick="MaterialDatabase.toggleCategory('${key}')">
                            <div class="header-left">
                                <span class="category-icon">▼</span>
                                <h3>${categoryName}</h3>
                                <span class="material-count">(${Object.keys(category.materials).length} ${lang === 'tr' ? 'malzeme' : 'materials'})</span>
                            </div>
                            <span class="category-description">${categoryDesc}</span>
                        </div>
                        
                        <div class="category-content-ultra" id="category-${key}">
                            <div class="materials-grid">`;
                
                for (const [code, material] of Object.entries(category.materials)) {
                    html += this.generateMaterialCard(material, lang);
                }
                
                html += `
                            </div>
                        </div>
                    </div>`;
            }
            
            html += `
                    </div>
                    
                    <div class="database-footer">
                        <p>${lang === 'tr' ? 
                            'Not: Verilen değerler nominal değerlerdir. Detaylı bilgi için ilgili standartlara başvurunuz.' : 
                            'Note: Given values are nominal. Please refer to relevant standards for detailed information.'}</p>
                        <p class="copyright">© 2025 TETA Kazan - Malzeme Veritabanı v${this.version}</p>
                    </div>
                </div>`;
            
            // CSS stillerini ekle
            html += this.generateStyles();
            
            return html;
        },
        
        generateMaterialCard(material, lang) {
            const applications = lang === 'tr' ? material.applications_tr : material.applications_en;
            
            // Özel işaretler
            let specialIcons = '';
            
            if (material.heat_treatment?.hardenable) {
                specialIcons += '<span class="icon-hardenable" title="Sertleştirilebilir">🔥</span>';
            }
            
            if (material.working_conditions?.corrosion_resistance && 
                (material.working_conditions.corrosion_resistance === 'Mükemmel' || 
                 material.working_conditions.corrosion_resistance === 'Üstün')) {
                specialIcons += '<span class="icon-corrosion" title="Yüksek korozyon direnci">🛡️</span>';
            }
            
            if (material.working_conditions?.temperature_max > 500) {
                specialIcons += '<span class="icon-high-temp" title="Yüksek sıcaklık direnci">🌡️</span>';
            }
            
            if (material.working_conditions?.fda_approved) {
                specialIcons += '<span class="icon-fda" title="FDA onaylı">✓</span>';
            }
            
            return `
                <div class="material-card-ultra">
                    <div class="card-header">
                        <div class="card-title">
                            <h4>${material.code}</h4>
                            <div class="special-icons">${specialIcons}</div>
                        </div>
                        <span class="card-standard">${material.standard}</span>
                    </div>
                    
                    ${material.equivalent ? `
                    <div class="card-equivalent">
                        <strong>${lang === 'tr' ? 'Eşdeğer' : 'Equivalent'}:</strong> ${material.equivalent}
                    </div>` : ''}
                    
                    <div class="card-properties">
                        <div class="property-section">
                            <h5>${lang === 'tr' ? 'Mekanik Özellikler' : 'Mechanical Properties'}</h5>
                            <div class="property-grid">
                                ${this.renderMechanicalProperties(material.mechanical, lang)}
                            </div>
                        </div>
                        
                        <div class="property-section">
                            <h5>${lang === 'tr' ? 'Fiziksel Özellikler' : 'Physical Properties'}</h5>
                            <div class="property-grid">
                                ${this.renderPhysicalProperties(material, lang)}
                            </div>
                        </div>
                        
                        ${material.chemical ? `
                        <div class="property-section">
                            <h5>${lang === 'tr' ? 'Kimyasal Bileşim' : 'Chemical Composition'}</h5>
                            <div class="chemical-composition">
                                ${this.renderChemicalComposition(material.chemical)}
                            </div>
                        </div>` : ''}
                        
                        ${material.tribological ? `
                        <div class="property-section">
                            <h5>${lang === 'tr' ? 'Tribolojik Özellikler' : 'Tribological Properties'}</h5>
                            <div class="property-grid">
                                ${this.renderTribologicalProperties(material.tribological, lang)}
                            </div>
                        </div>` : ''}
                        
                        <div class="property-section">
                            <h5>${lang === 'tr' ? 'Çalışma Koşulları' : 'Working Conditions'}</h5>
                            <div class="property-grid">
                                ${this.renderWorkingConditions(material.working_conditions, lang)}
                            </div>
                        </div>
                        
                        ${material.heat_treatment ? `
                        <div class="property-section">
                            <h5>${lang === 'tr' ? 'Isıl İşlem' : 'Heat Treatment'}</h5>
                            <div class="property-grid">
                                ${this.renderHeatTreatment(material.heat_treatment, lang)}
                            </div>
                        </div>` : ''}
                        
                        <div class="property-section">
                            <h5>${lang === 'tr' ? 'Kullanım Alanları' : 'Applications'}</h5>
                            <ul class="applications-list">
                                ${applications.map(app => `<li>${app}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>`;
        },
        
        renderMechanicalProperties(props, lang) {
            if (!props) return '';
            
            const items = [];
            
            if (props.yield) {
                items.push(`
                    <div class="property-item">
                        <span class="prop-label">${lang === 'tr' ? 'Akma' : 'Yield'}:</span>
                        <span class="prop-value">${props.yield} ${props.yield_unit || 'MPa'}</span>
                    </div>`);
            }
            
            if (props.tensile_min) {
                const tensileStr = props.tensile_max ? 
                    `${props.tensile_min}-${props.tensile_max}` : 
                    props.tensile_min;
                items.push(`
                    <div class="property-item">
                        <span class="prop-label">${lang === 'tr' ? 'Çekme' : 'Tensile'}:</span>
                        <span class="prop-value">${tensileStr} ${props.tensile_unit || 'MPa'}</span>
                    </div>`);
            }
            
            if (props.elongation) {
                items.push(`
                    <div class="property-item">
                        <span class="prop-label">${lang === 'tr' ? 'Uzama' : 'Elongation'}:</span>
                        <span class="prop-value">${props.elongation}${props.elongation_unit || '%'}</span>
                    </div>`);
            }
            
            if (props.hardness) {
                items.push(`
                    <div class="property-item">
                        <span class="prop-label">${lang === 'tr' ? 'Sertlik' : 'Hardness'}:</span>
                        <span class="prop-value">${props.hardness} ${props.hardness_scale || 'HB'}</span>
                    </div>`);
            }
            
            if (props.impact_energy && props.impact_energy !== '-') {
                const impactStr = props.impact_temp ? 
                    `${props.impact_energy}J @${props.impact_temp}°C` : 
                    props.impact_energy;
                items.push(`
                    <div class="property-item">
                        <span class="prop-label">${lang === 'tr' ? 'Darbe' : 'Impact'}:</span>
                        <span class="prop-value">${impactStr}</span>
                    </div>`);
            }
            
            if (props.elastic_modulus) {
                const modValue = props.elastic_modulus > 1000 ? 
                    `${(props.elastic_modulus / 1000).toFixed(0)} GPa` : 
                    `${props.elastic_modulus} MPa`;
                items.push(`
                    <div class="property-item">
                        <span class="prop-label">${lang === 'tr' ? 'E-Modülü' : 'E-Modulus'}:</span>
                        <span class="prop-value">${modValue}</span>
                    </div>`);
            }
            
            return items.join('');
        },
        
        renderPhysicalProperties(material, lang) {
            const props = material.physical;
            if (!props) return '';
            
            const items = [];
            
            items.push(`
                <div class="property-item">
                    <span class="prop-label">${lang === 'tr' ? 'Yoğunluk' : 'Density'}:</span>
                    <span class="prop-value">${material.density} kg/m³</span>
                </div>`);
            
            if (props.thermal_conductivity) {
                items.push(`
                    <div class="property-item">
                        <span class="prop-label">${lang === 'tr' ? 'Isı İletkenliği' : 'Thermal Cond.'}:</span>
                        <span class="prop-value">${props.thermal_conductivity} W/m·K</span>
                    </div>`);
            }
            
            if (props.thermal_expansion) {
                items.push(`
                    <div class="property-item">
                        <span class="prop-label">${lang === 'tr' ? 'Genleşme' : 'Expansion'}:</span>
                        <span class="prop-value">${props.thermal_expansion} µm/m·K</span>
                    </div>`);
            }
            
            if (props.melting_point) {
                items.push(`
                    <div class="property-item">
                        <span class="prop-label">${lang === 'tr' ? 'Erime' : 'Melting'}:</span>
                        <span class="prop-value">${props.melting_point}°C</span>
                    </div>`);
            }
            
            return items.join('');
        },
        
        renderChemicalComposition(chemical) {
            if (!chemical) return '';
            
            return Object.entries(chemical)
                .map(([element, value]) => `<span class="chem-element">${element}: ${value}%</span>`)
                .join(' ');
        },
        
        renderTribologicalProperties(props, lang) {
            if (!props) return '';
            
            const items = [];
            
            if (props.friction_coefficient_dry) {
                items.push(`
                    <div class="property-item">
                        <span class="prop-label">${lang === 'tr' ? 'Sürtünme (kuru)' : 'Friction (dry)'}:</span>
                        <span class="prop-value">µ = ${props.friction_coefficient_dry}</span>
                    </div>`);
            }
            
            if (props.wear_rate) {
                items.push(`
                    <div class="property-item">
                        <span class="prop-label">${lang === 'tr' ? 'Aşınma' : 'Wear'}:</span>
                        <span class="prop-value">${props.wear_rate}</span>
                    </div>`);
            }
            
            if (props.pv_limit) {
                items.push(`
                    <div class="property-item">
                        <span class="prop-label">PV Limit:</span>
                        <span class="prop-value">${props.pv_limit}</span>
                    </div>`);
            }
            
            return items.join('');
        },
        
        renderWorkingConditions(conditions, lang) {
            if (!conditions) return '';
            
            const items = [];
            
            if (conditions.temperature_min !== undefined && conditions.temperature_max !== undefined) {
                items.push(`
                    <div class="property-item">
                        <span class="prop-label">${lang === 'tr' ? 'Sıcaklık' : 'Temperature'}:</span>
                        <span class="prop-value">${conditions.temperature_min}°C / ${conditions.temperature_max}°C</span>
                    </div>`);
            }
            
            if (conditions.corrosion_resistance) {
                items.push(`
                    <div class="property-item">
                        <span class="prop-label">${lang === 'tr' ? 'Korozyon' : 'Corrosion'}:</span>
                        <span class="prop-value">${conditions.corrosion_resistance}</span>
                    </div>`);
            }
            
            if (conditions.weldability) {
                items.push(`
                    <div class="property-item">
                        <span class="prop-label">${lang === 'tr' ? 'Kaynak' : 'Welding'}:</span>
                        <span class="prop-value">${conditions.weldability}</span>
                    </div>`);
            }
            
            if (conditions.machinability) {
                items.push(`
                    <div class="property-item">
                        <span class="prop-label">${lang === 'tr' ? 'İşlenebilirlik' : 'Machinability'}:</span>
                        <span class="prop-value">${conditions.machinability}</span>
                    </div>`);
            }
            
            return items.join('');
        },
        
        renderHeatTreatment(treatment, lang) {
            if (!treatment) return '';
            
            const items = [];
            
            if (treatment.hardenable) {
                if (treatment.hardening && treatment.hardening !== 'Uygun değil') {
                    items.push(`
                        <div class="property-item">
                            <span class="prop-label">${lang === 'tr' ? 'Sertleştirme' : 'Hardening'}:</span>
                            <span class="prop-value">${treatment.hardening}</span>
                        </div>`);
                }
                
                if (treatment.tempering && treatment.tempering !== '-') {
                    items.push(`
                        <div class="property-item">
                            <span class="prop-label">${lang === 'tr' ? 'Temperleme' : 'Tempering'}:</span>
                            <span class="prop-value">${treatment.tempering}</span>
                        </div>`);
                }
                
                if (treatment.max_hardness) {
                    items.push(`
                        <div class="property-item">
                            <span class="prop-label">${lang === 'tr' ? 'Max Sertlik' : 'Max Hardness'}:</span>
                            <span class="prop-value">${treatment.max_hardness}</span>
                        </div>`);
                }
            }
            
            if (treatment.normalizing) {
                items.push(`
                    <div class="property-item">
                        <span class="prop-label">${lang === 'tr' ? 'Normalizasyon' : 'Normalizing'}:</span>
                        <span class="prop-value">${treatment.normalizing}</span>
                    </div>`);
            }
            
            if (treatment.carburizing) {
                items.push(`
                    <div class="property-item">
                        <span class="prop-label">${lang === 'tr' ? 'Sementasyon' : 'Carburizing'}:</span>
                        <span class="prop-value">✓</span>
                    </div>`);
            }
            
            if (treatment.nitriding) {
                items.push(`
                    <div class="property-item">
                        <span class="prop-label">${lang === 'tr' ? 'Nitrürleme' : 'Nitriding'}:</span>
                        <span class="prop-value">✓</span>
                    </div>`);
            }
            
            return items.join('');
        },
        
        generateStyles() {
            return `
                <style>
                    .ultra-materials-container {
                        padding: 0;
                        max-height: 85vh;
                        overflow-y: auto;
                        background: #f0f2f5;
                    }
                    
                    .materials-header-section {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
                        color: white;
                        padding: 30px;
                        position: sticky;
                        top: 0;
                        z-index: 100;
                        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                    }
                    
                    .header-content {
                        text-align: center;
                        margin-bottom: 25px;
                    }
                    
                    .header-content h2 {
                        margin: 0;
                        font-size: 2rem;
                        font-weight: 700;
                        text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
                    }
                    
                    .version-info {
                        margin: 8px 0 0 0;
                        opacity: 0.95;
                        font-size: 1rem;
                    }
                    
                    .search-section {
                        max-width: 900px;
                        margin: 0 auto;
                    }
                    
                    .search-box {
                        position: relative;
                        margin-bottom: 20px;
                    }
                    
                    .search-box input {
                        width: 100%;
                        padding: 15px 50px 15px 20px;
                        border: none;
                        border-radius: 30px;
                        font-size: 1rem;
                        background: rgba(255, 255, 255, 0.98);
                        color: #2d3748;
                        transition: all 0.3s ease;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    }
                    
                    .search-box input:focus {
                        outline: none;
                        background: white;
                        box-shadow: 0 6px 25px rgba(0,0,0,0.2);
                        transform: translateY(-2px);
                    }
                    
                    .search-icon {
                        position: absolute;
                        right: 20px;
                        top: 50%;
                        transform: translateY(-50%);
                        font-size: 1.3rem;
                    }
                    
                    .quick-links {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 10px;
                        justify-content: center;
                    }
                    
                    .quick-link-btn {
                        background: rgba(255,255,255,0.2);
                        border: 1px solid rgba(255,255,255,0.3);
                        color: white;
                        padding: 8px 16px;
                        border-radius: 20px;
                        cursor: pointer;
                        font-size: 0.85rem;
                        transition: all 0.3s ease;
                        backdrop-filter: blur(10px);
                    }
                    
                    .quick-link-btn:hover {
                        background: rgba(255,255,255,0.3);
                        transform: translateY(-2px);
                        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                    }
                    
                    .search-results-container {
                        background: white;
                        margin: 25px;
                        padding: 25px;
                        border-radius: 15px;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    }
                    
                    .search-result-item {
                        padding: 18px;
                        border-bottom: 1px solid #e2e8f0;
                        transition: all 0.3s ease;
                        cursor: pointer;
                        border-radius: 10px;
                        margin-bottom: 10px;
                    }
                    
                    .search-result-item:hover {
                        background: linear-gradient(135deg, #667eea10, #764ba210);
                        transform: translateX(5px);
                    }
                    
                    .categories-container {
                        padding: 25px;
                    }
                    
                    .material-category-ultra {
                        margin-bottom: 30px;
                        background: white;
                        border-radius: 15px;
                        overflow: hidden;
                        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    }
                    
                    .category-header-ultra {
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        color: white;
                        padding: 20px 25px;
                        cursor: pointer;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        transition: all 0.3s ease;
                    }
                    
                    .category-header-ultra:hover {
                        background: linear-gradient(135deg, #764ba2, #667eea);
                    }
                    
                    .header-left {
                        display: flex;
                        align-items: center;
                        gap: 15px;
                    }
                    
                    .category-icon {
                        transition: transform 0.3s;
                        font-size: 1.3rem;
                    }
                    
                    .category-header-ultra h3 {
                        margin: 0;
                        font-size: 1.2rem;
                        font-weight: 600;
                    }
                    
                    .material-count {
                        background: rgba(255,255,255,0.2);
                        padding: 4px 12px;
                        border-radius: 20px;
                        font-size: 0.9rem;
                    }
                    
                    .category-content-ultra {
                        padding: 0;
                        max-height: 800px;
                        overflow-y: auto;
                        transition: all 0.3s ease;
                    }
                    
                    .category-content-ultra.collapsed {
                        max-height: 0;
                        padding: 0;
                    }
                    
                    .collapsed .category-icon {
                        transform: rotate(-90deg);
                    }
                    
                    .materials-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(550px, 1fr));
                        gap: 25px;
                        padding: 25px;
                    }
                    
                    .material-card-ultra {
                        background: white;
                        border: 2px solid #e2e8f0;
                        border-radius: 12px;
                        padding: 20px;
                        transition: all 0.3s ease;
                    }
                    
                    .material-card-ultra:hover {
                        box-shadow: 0 8px 30px rgba(102, 126, 234, 0.15);
                        transform: translateY(-3px);
                        border-color: #667eea;
                    }
                    
                    .card-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 15px;
                        padding-bottom: 12px;
                        border-bottom: 3px solid #667eea;
                    }
                    
                    .card-title {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                    }
                    
                    .card-title h4 {
                        margin: 0;
                        color: #667eea;
                        font-size: 1.3rem;
                        font-weight: 700;
                    }
                    
                    .special-icons {
                        display: flex;
                        gap: 8px;
                    }
                    
                    .special-icons span {
                        font-size: 1.2rem;
                        cursor: help;
                    }
                    
                    .icon-hardenable {
                        color: #ff6b6b;
                    }
                    
                    .icon-corrosion {
                        color: #4ecdc4;
                    }
                    
                    .icon-high-temp {
                        color: #ff9f43;
                    }
                    
                    .icon-fda {
                        background: #48bb78;
                        color: white;
                        padding: 2px 6px;
                        border-radius: 50%;
                        font-size: 0.8rem;
                        font-weight: bold;
                    }
                    
                    .card-standard {
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        color: white;
                        padding: 6px 14px;
                        border-radius: 20px;
                        font-size: 0.85rem;
                        font-weight: 600;
                    }
                    
                    .card-equivalent {
                        background: #f7fafc;
                        color: #4a5568;
                        padding: 10px 15px;
                        border-radius: 8px;
                        margin-bottom: 15px;
                        font-size: 0.9rem;
                        border-left: 4px solid #667eea;
                    }
                    
                    .card-properties {
                        display: flex;
                        flex-direction: column;
                        gap: 18px;
                    }
                    
                    .property-section {
                        border: 1px solid #e2e8f0;
                        border-radius: 10px;
                        padding: 15px;
                        background: #fafbfc;
                    }
                    
                    .property-section h5 {
                        margin: 0 0 12px 0;
                        color: #667eea;
                        font-size: 1rem;
                        font-weight: 600;
                        padding-bottom: 8px;
                        border-bottom: 2px solid #e2e8f0;
                    }
                    
                    .property-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                        gap: 12px;
                    }
                    
                    .property-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 8px;
                        background: white;
                        border-radius: 6px;
                        transition: all 0.2s ease;
                    }
                    
                    .property-item:hover {
                        background: #edf2f7;
                    }
                    
                    .prop-label {
                        color: #718096;
                        font-size: 0.88rem;
                        font-weight: 500;
                    }
                    
                    .prop-value {
                        color: #2d3748;
                        font-weight: 600;
                        font-size: 0.88rem;
                    }
                    
                    .chemical-composition {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 8px;
                    }
                    
                    .chem-element {
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        color: white;
                        padding: 6px 12px;
                        border-radius: 20px;
                        font-size: 0.82rem;
                        font-weight: 600;
                    }
                    
                    .applications-list {
                        margin: 0;
                        padding-left: 25px;
                        list-style: none;
                    }
                    
                    .applications-list li {
                        color: #4a5568;
                        font-size: 0.9rem;
                        margin-bottom: 8px;
                        padding-left: 20px;
                        position: relative;
                    }
                    
                    .applications-list li::before {
                        content: "▸";
                        position: absolute;
                        left: 0;
                        color: #667eea;
                        font-weight: bold;
                    }
                    
                    .database-footer {
                        text-align: center;
                        padding: 30px;
                        background: white;
                        margin-top: 40px;
                        border-top: 3px solid #667eea;
                    }
                    
                    .database-footer p {
                        color: #718096;
                        font-size: 0.9rem;
                        margin: 5px 0;
                    }
                    
                    .copyright {
                        font-weight: 600;
                        color: #667eea;
                    }
                    
                    /* Scrollbar özelleştirme */
                    .ultra-materials-container::-webkit-scrollbar,
                    .category-content-ultra::-webkit-scrollbar {
                        width: 10px;
                    }
                    
                    .ultra-materials-container::-webkit-scrollbar-track,
                    .category-content-ultra::-webkit-scrollbar-track {
                        background: #f1f1f1;
                        border-radius: 10px;
                    }
                    
                    .ultra-materials-container::-webkit-scrollbar-thumb,
                    .category-content-ultra::-webkit-scrollbar-thumb {
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        border-radius: 10px;
                    }
                    
                    .ultra-materials-container::-webkit-scrollbar-thumb:hover,
                    .category-content-ultra::-webkit-scrollbar-thumb:hover {
                        background: linear-gradient(135deg, #764ba2, #667eea);
                    }
                    
                    @media (max-width: 1200px) {
                        .materials-grid {
                            grid-template-columns: 1fr;
                        }
                    }
                    
                    @media (max-width: 768px) {
                        .property-grid {
                            grid-template-columns: 1fr;
                        }
                        
                        .category-header-ultra .header-left h3 {
                            font-size: 1.15rem;
                        }
                        
                        .quick-links {
                            overflow-x: auto;
                            white-space: nowrap;
                        }
                    }
                    
                    @media (max-width: 480px) {
                        .header-content h2 {
                            font-size: 1.5rem;
                        }
                        
                        .property-grid {
                            grid-template-columns: 1fr;
                        }
                        
                        .materials-header-section {
                            padding: 20px 15px;
                        }
                        
                        .search-box input {
                            padding: 12px 45px 12px 15px;
                            font-size: 0.9rem;
                        }
                        
                        .card-header {
                            flex-direction: column;
                            align-items: flex-start;
                            gap: 10px;
                        }
                    }
                </style>`;
        },
        
        toggleCategory(categoryKey) {
            const content = document.getElementById(`category-${categoryKey}`);
            if (content) {
                content.classList.toggle('collapsed');
                const icon = content.previousElementSibling.querySelector('.category-icon');
                if (icon) {
                    icon.style.transform = content.classList.contains('collapsed') ? 'rotate(-90deg)' : 'rotate(0deg)';
                }
            }
        },
        
        scrollToCategory(categoryKey) {
            const categoryElement = document.getElementById(`category-section-${categoryKey}`);
            if (categoryElement) {
                categoryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                const content = document.getElementById(`category-${categoryKey}`);
                if (content && content.classList.contains('collapsed')) {
                    this.toggleCategory(categoryKey);
                }
                
                categoryElement.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.5)';
                setTimeout(() => {
                    categoryElement.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                }, 2000);
            }
        },
        
        performSearch(searchTerm) {
            const resultsContainer = document.getElementById('searchResults');
            const categoriesContainer = document.getElementById('categoriesContainer');
            
            if (!searchTerm || searchTerm.length < 2) {
                resultsContainer.style.display = 'none';
                categoriesContainer.style.display = 'block';
                this.searchResults = [];
                return;
            }
            
            const results = this.searchMaterials(searchTerm);
            this.searchResults = results;
            
            if (results.length === 0) {
                const lang = this.getCurrentLanguage();
                resultsContainer.innerHTML = `
                    <div style="text-align: center; padding: 40px; color: #718096;">
                        <div style="font-size: 3rem; margin-bottom: 15px;">🔍</div>
                        <h3 style="margin: 0 0 10px 0; color: #4a5568;">
                            ${lang === 'tr' ? 'Sonuç Bulunamadı' : 'No Results Found'}
                        </h3>
                        <p style="margin: 0; font-size: 0.95rem;">
                            ${lang === 'tr' ? 
                                '"' + searchTerm + '" için sonuç bulunamadı. Farklı bir terim deneyin.' : 
                                'No results found for "' + searchTerm + '". Try a different term.'}
                        </p>
                    </div>`;
                resultsContainer.style.display = 'block';
                categoriesContainer.style.display = 'none';
                return;
            }
            
            const lang = this.getCurrentLanguage();
            let html = `
                <div style="margin-bottom: 25px; padding-bottom: 15px; border-bottom: 3px solid #667eea;">
                    <h3 style="margin: 0; color: #2d3748; font-size: 1.3rem;">
                        ${lang === 'tr' ? 'Arama Sonuçları' : 'Search Results'} 
                        <span style="color: #667eea; font-weight: 700;">(${results.length})</span>
                    </h3>
                    <p style="margin: 8px 0 0 0; color: #718096; font-size: 0.9rem;">
                        ${lang === 'tr' ? 
                            '"' + searchTerm + '" için bulunan malzemeler' : 
                            'Materials found for "' + searchTerm + '"'}
                    </p>
                </div>`;
            
            results.forEach((result, index) => {
                const material = result.material;
                const categoryName = result.categoryName;
                
                html += `
                    <div class="search-result-item" onclick="MaterialDatabase.showMaterialFromSearch(${index})">
                        <div class="search-result-header">
                            <div>
                                <span class="search-result-code">${material.code}</span>
                                ${material.heat_treatment?.hardenable ? '<span style="margin-left: 8px;">🔥</span>' : ''}
                                ${(material.working_conditions?.corrosion_resistance === 'Mükemmel' || 
                                   material.working_conditions?.corrosion_resistance === 'Üstün') ? 
                                   '<span style="margin-left: 8px;">🛡️</span>' : ''}
                            </div>
                            <span class="search-result-category">${categoryName}</span>
                        </div>
                        <div style="color: #4a5568; font-size: 0.9rem; margin-top: 5px;">
                            <strong>${lang === 'tr' ? 'Standart' : 'Standard'}:</strong> ${material.standard}
                        </div>
                        <div style="color: #718096; font-size: 0.85rem; margin-top: 3px;">
                            <strong>${lang === 'tr' ? 'Eşdeğer' : 'Equivalent'}:</strong> ${material.equivalent}
                        </div>
                        ${material.mechanical ? `
                        <div style="display: flex; gap: 15px; margin-top: 8px; font-size: 0.85rem; color: #718096;">
                            <span>⚡ ${material.mechanical.yield} MPa</span>
                            <span>💪 ${material.mechanical.tensile_min}-${material.mechanical.tensile_max} MPa</span>
                            ${material.working_conditions?.temperature_max ? 
                                `<span>🌡️ max ${material.working_conditions.temperature_max}°C</span>` : ''}
                        </div>
                        ` : ''}
                    </div>`;
            });
            
            resultsContainer.innerHTML = html;
            resultsContainer.style.display = 'block';
            categoriesContainer.style.display = 'none';
        },
        
        showMaterialFromSearch(index) {
            if (index < 0 || index >= this.searchResults.length) return;
            
            const result = this.searchResults[index];
            const searchResults = document.getElementById('searchResults');
            const categoriesContainer = document.getElementById('categoriesContainer');
            
            searchResults.style.display = 'none';
            categoriesContainer.style.display = 'block';
            
            document.getElementById('materialSearchInput').value = '';
            
            const categoryElement = document.getElementById(`category-section-${result.categoryKey}`);
            if (categoryElement) {
                categoryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                const content = document.getElementById(`category-${result.categoryKey}`);
                if (content && content.classList.contains('collapsed')) {
                    this.toggleCategory(result.categoryKey);
                }
                
                setTimeout(() => {
                    const cards = categoryElement.querySelectorAll('.material-card-ultra');
                    cards.forEach(card => {
                        const codeElement = card.querySelector('h4');
                        if (codeElement && codeElement.textContent.includes(result.material.code)) {
                            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            card.style.border = '3px solid #667eea';
                            card.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.3)';
                            
                            setTimeout(() => {
                                card.style.border = '2px solid #e2e8f0';
                                card.style.boxShadow = '';
                            }, 3000);
                        }
                    });
                }, 500);
            }
        },
        
        exportToJSON() {
            const dataStr = JSON.stringify(this.categories, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `material_database_v${this.version}.json`;
            link.click();
            URL.revokeObjectURL(url);
        },
        
        compareMaterials(code1, code2) {
            let material1 = null;
            let material2 = null;
            
            for (const category of Object.values(this.categories)) {
                for (const [code, material] of Object.entries(category.materials)) {
                    if (code === code1) material1 = material;
                    if (code === code2) material2 = material;
                }
            }
            
            if (!material1 || !material2) {
                return null;
            }
            
            return {
                material1: material1,
                material2: material2,
                comparison: {
                    yield_diff: material1.mechanical.yield - material2.mechanical.yield,
                    tensile_diff: material1.mechanical.tensile_min - material2.mechanical.tensile_min,
                    density_diff: material1.density - material2.density,
                    temp_max_diff: material1.working_conditions.temperature_max - material2.working_conditions.temperature_max
                }
            };
        },
        
        init() {
            const container = document.getElementById('materialDatabaseContainer');
            if (container) {
                container.innerHTML = this.generateHTML();
            }
        }
    };
    
    window.MaterialDatabase = MaterialDatabase;
    
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = MaterialDatabase;
    }
    
})(window);                        