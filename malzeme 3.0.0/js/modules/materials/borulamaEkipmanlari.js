/**
 * BORULAMA EKİPMANLARI Modülü
 * Endüstriyel Borulama Sistemleri İçin Kapsamlı Ekipman Katalogu
 * Fittings, Kompansatörler, Filtreler, Contalar, Destekler ve Ölçüm Cihazları
 */

(function(window) {
    'use strict';
    
    class BorulamaEkipmanlariMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'borulamaEkipmanlari';
            
            // Dil metinleri
            this.texts = {
                tr: {
                    display_name: 'Borulama Ekipmanları',
                    ekipman_kategori_label: 'Ekipman Kategorisi',
                    ekipman_tipi_label: 'Ekipman Tipi',
                    alt_tip_label: 'Alt Tip',
                    baglanti_tipi_label: 'Bağlantı Tipi',
                    boyut_label: 'Nominal Boyut',
                    basinc_label: 'Basınç Sınıfı',
                    malzeme_tipi_label: 'Malzeme',
                    ozel_ozellik_label: 'Özel Özellik',
                    validation_error: 'Tüm zorunlu alanlar doldurulmalıdır',
                    weight_info: 'Katalog Ağırlık',
                    standard_info: 'Standart',
                    select_category: 'Kategori seçin',
                    select_type: 'Tip seçin',
                    select_subtype: 'Alt tip seçin',
                    select_connection: 'Bağlantı tipi seçin',
                    select_size: 'Boyut seçin',
                    select_pressure: 'Basınç sınıfı seçin',
                    select_material: 'Malzeme seçin',
                    // Kategori isimleri
                    fittings: 'Bağlantı Elemanları (Fittings)',
                    expansion: 'Genleşme/Kompansatörler',
                    filters: 'Filtreler ve Süzgeçler',
                    gaskets: 'Contalar',
                    supports: 'Destek Elemanları',
                    instruments: 'Ölçüm Cihazları',
                    special: 'Özel Bağlantı Parçaları',
                    // Fitting tipleri
                    tee_equal: 'Te (Eşit)',
                    tee_reducing: 'Te (Redüksiyonlu)',
                    reducer_concentric: 'Redüksiyon (Konsantrik)',
                    reducer_eccentric: 'Redüksiyon (Eksantrik)',
                    elbow_90: 'Dirsek 90°',
                    elbow_45: 'Dirsek 45°',
                    coupling_full: 'Kaplin (Tam Boy)',
                    coupling_half: 'Kaplin (Yarım Boy)',
                    union: 'Rakor',
                    nipple_hex: 'Nipel (Altıgen)',
                    nipple_barrel: 'Nipel (Normal)',
                    cap: 'Kep (Kapak)',
                    plug: 'Tapa',
                    cross: 'Kroşe',
                    // Kompansatör tipleri
                    bellows_single: 'Körüklü Kompansatör (Tek)',
                    bellows_double: 'Körüklü Kompansatör (Çift)',
                    bellows_triple: 'Körüklü Kompansatör (Üçlü)',
                    rubber_epdm: 'Kauçuk Kompansatör (EPDM)',
                    rubber_nbr: 'Kauçuk Kompansatör (NBR)',
                    rubber_viton: 'Kauçuk Kompansatör (Viton)',
                    rotary_flange: 'Döner Flanşlı Kompansatör',
                    axial_type: 'Eksenel Tip',
                    lateral_type: 'Yanal Tip',
                    angular_type: 'Açısal Tip',
                    // Filtre tipleri
                    strainer_y: 'Y Tipi Süzgeç',
                    strainer_t: 'T Tipi Süzgeç',
                    strainer_basket: 'Sepet Tipi Süzgeç',
                    filter_magnetic: 'Manyetik Filtre',
                    dirt_separator: 'Pislik Tutucu',
                    // Conta tipleri
                    gasket_spiral: 'Spiral Sargılı Conta',
                    gasket_ring: 'Ring Joint Conta',
                    gasket_klingrit: 'Klingrit Conta',
                    gasket_graphite: 'Grafit Conta',
                    gasket_ptfe: 'PTFE (Teflon) Conta',
                    gasket_rubber: 'Kauçuk Conta',
                    // Destek elemanları
                    pipe_hanger_fixed: 'Boru Askısı (Sabit)',
                    pipe_hanger_variable: 'Boru Askısı (Hareketli)',
                    pipe_clamp_u: 'U-Bolt Kelepçe',
                    pipe_clamp_standard: 'Standart Kelepçe',
                    pipe_shoe: 'Boru Yatağı',
                    spring_hanger: 'Spring Hanger',
                    pipe_guide: 'Boru Kılavuzu',
                    // Ölçüm cihazları
                    pressure_gauge_dry: 'Manometre (Kuru)',
                    pressure_gauge_glycerin: 'Manometre (Gliserinli)',
                    thermometer_bimetal: 'Termometre (Bimetalik)',
                    thermometer_digital: 'Termometre (Dijital)',
                    level_gauge_reflex: 'Seviye Göstergesi (Refleks)',
                    level_gauge_transparent: 'Seviye Göstergesi (Transparan)',
                    flow_indicator: 'Akış Göstergesi',
                    // Özel parçalar
                    weldolet: 'Weldolet',
                    threadolet: 'Threadolet',
                    sockolet: 'Sockolet',
                    spectacle_blind: 'Spekteküler Kör (Figure-8)',
                    blind_flange: 'Kör Flanş',
                    swage_nipple: 'Swage Nipel'
                },
                en: {
                    display_name: 'Piping Equipment',
                    ekipman_kategori_label: 'Equipment Category',
                    ekipman_tipi_label: 'Equipment Type',
                    alt_tip_label: 'Sub Type',
                    baglanti_tipi_label: 'Connection Type',
                    boyut_label: 'Nominal Size',
                    basinc_label: 'Pressure Class',
                    malzeme_tipi_label: 'Material',
                    ozel_ozellik_label: 'Special Feature',
                    validation_error: 'All required fields must be filled',
                    weight_info: 'Catalog Weight',
                    standard_info: 'Standard',
                    select_category: 'Select category',
                    select_type: 'Select type',
                    select_subtype: 'Select subtype',
                    select_connection: 'Select connection type',
                    select_size: 'Select size',
                    select_pressure: 'Select pressure class',
                    select_material: 'Select material',
                    // Category names
                    fittings: 'Pipe Fittings',
                    expansion: 'Expansion Joints',
                    filters: 'Filters & Strainers',
                    gaskets: 'Gaskets',
                    supports: 'Pipe Supports',
                    instruments: 'Measuring Instruments',
                    special: 'Special Connection Parts',
                    // Fitting types - İngilizce çeviriler
                    tee_equal: 'Tee (Equal)',
                    tee_reducing: 'Tee (Reducing)',
                    reducer_concentric: 'Reducer (Concentric)',
                    reducer_eccentric: 'Reducer (Eccentric)',
                    elbow_90: 'Elbow 90°',
                    elbow_45: 'Elbow 45°',
                    coupling_full: 'Coupling (Full)',
                    coupling_half: 'Coupling (Half)',
                    union: 'Union',
                    nipple_hex: 'Nipple (Hex)',
                    nipple_barrel: 'Nipple (Barrel)',
                    cap: 'Cap',
                    plug: 'Plug',
                    cross: 'Cross',
                    // Expansion types
                    bellows_single: 'Bellows Compensator (Single)',
                    bellows_double: 'Bellows Compensator (Double)',
                    bellows_triple: 'Bellows Compensator (Triple)',
                    rubber_epdm: 'Rubber Compensator (EPDM)',
                    rubber_nbr: 'Rubber Compensator (NBR)',
                    rubber_viton: 'Rubber Compensator (Viton)',
                    rotary_flange: 'Rotary Flange Compensator',
                    axial_type: 'Axial Type',
                    lateral_type: 'Lateral Type',
                    angular_type: 'Angular Type',
                    // Filter types
                    strainer_y: 'Y-Type Strainer',
                    strainer_t: 'T-Type Strainer',
                    strainer_basket: 'Basket Strainer',
                    filter_magnetic: 'Magnetic Filter',
                    dirt_separator: 'Dirt Separator',
                    // Gasket types
                    gasket_spiral: 'Spiral Wound Gasket',
                    gasket_ring: 'Ring Joint Gasket',
                    gasket_klingrit: 'Klingrit Gasket',
                    gasket_graphite: 'Graphite Gasket',
                    gasket_ptfe: 'PTFE (Teflon) Gasket',
                    gasket_rubber: 'Rubber Gasket',
                    // Support elements
                    pipe_hanger_fixed: 'Pipe Hanger (Fixed)',
                    pipe_hanger_variable: 'Pipe Hanger (Variable)',
                    pipe_clamp_u: 'U-Bolt Clamp',
                    pipe_clamp_standard: 'Standard Clamp',
                    pipe_shoe: 'Pipe Shoe',
                    spring_hanger: 'Spring Hanger',
                    pipe_guide: 'Pipe Guide',
                    // Measuring instruments
                    pressure_gauge_dry: 'Pressure Gauge (Dry)',
                    pressure_gauge_glycerin: 'Pressure Gauge (Glycerin)',
                    thermometer_bimetal: 'Thermometer (Bimetallic)',
                    thermometer_digital: 'Thermometer (Digital)',
                    level_gauge_reflex: 'Level Gauge (Reflex)',
                    level_gauge_transparent: 'Level Gauge (Transparent)',
                    flow_indicator: 'Flow Indicator',
                    // Special parts
                    weldolet: 'Weldolet',
                    threadolet: 'Threadolet',
                    sockolet: 'Sockolet',
                    spectacle_blind: 'Spectacle Blind (Figure-8)',
                    blind_flange: 'Blind Flange',
                    swage_nipple: 'Swage Nipple'
                }
            };
            
            // Malzeme cinsleri
            this.grades = [
                'Karbon Çelik (A105/A106)',
                'Paslanmaz Çelik 304 (A182 F304)',
                'Paslanmaz Çelik 316 (A182 F316)',
                'Paslanmaz Çelik 316L (A182 F316L)',
                'Dökme Demir (GG25)',
                'Sfero Döküm (GGG40)',
                'Pirinç (CW617N)',
                'Bronz (CC491K)',
                'Duplex (A182 F51)',
                'Super Duplex (A182 F53)',
                'Alaşımlı Çelik (A182 F11)',
                'Alaşımlı Çelik (A182 F22)',
                'EPDM',
                'NBR (Nitril)',
                'Viton (FKM)',
                'PTFE (Teflon)',
                'Grafit',
                'Klingrit'
            ];
            
            // Yoğunluklar
            this.densities = {
                'Karbon Çelik (A105/A106)': 7850,
                'Paslanmaz Çelik 304 (A182 F304)': 8000,
                'Paslanmaz Çelik 316 (A182 F316)': 8000,
                'Paslanmaz Çelik 316L (A182 F316L)': 8000,
                'Dökme Demir (GG25)': 7200,
                'Sfero Döküm (GGG40)': 7100,
                'Pirinç (CW617N)': 8500,
                'Bronz (CC491K)': 8800,
                'Duplex (A182 F51)': 7800,
                'Super Duplex (A182 F53)': 7800,
                'Alaşımlı Çelik (A182 F11)': 7850,
                'Alaşımlı Çelik (A182 F22)': 7850,
                'EPDM': 1200,
                'NBR (Nitril)': 1300,
                'Viton (FKM)': 1800,
                'PTFE (Teflon)': 2200,
                'Grafit': 2200,
                'Klingrit': 1900
            };
            
            // Standartlar
            this.standards = {
                'fittings': 'ASME B16.9 / EN 10253',
                'expansion': 'EJMA / EN 14917',
                'filters': 'ASME B16.34 / DIN 3202',
                'gaskets': 'ASME B16.20 / EN 1514',
                'supports': 'MSS SP-58 / DIN 3567',
                'instruments': 'EN 837 / ASME B40.100',
                'special': 'MSS SP-97 / ASME B16.11'
            };
            
            // Ekipman kategorileri ve tipleri
            this.equipmentCategories = {
                'fittings': {
                    'tee_equal': { needsSize2: false, hasSchedule: true },
                    'tee_reducing': { needsSize2: true, hasSchedule: true },
                    'reducer_concentric': { needsSize2: true, hasSchedule: true },
                    'reducer_eccentric': { needsSize2: true, hasSchedule: true },
                    'elbow_90': { needsSize2: false, hasSchedule: true },
                    'elbow_45': { needsSize2: false, hasSchedule: true },
                    'coupling_full': { needsSize2: false, hasSchedule: false },
                    'coupling_half': { needsSize2: false, hasSchedule: false },
                    'union': { needsSize2: false, hasSchedule: false },
                    'nipple_hex': { needsSize2: false, hasSchedule: false },
                    'nipple_barrel': { needsSize2: false, hasSchedule: false },
                    'cap': { needsSize2: false, hasSchedule: true },
                    'plug': { needsSize2: false, hasSchedule: false },
                    'cross': { needsSize2: false, hasSchedule: true }
                },
                'expansion': {
                    'bellows_single': { needsSize2: false, hasSchedule: false },
                    'bellows_double': { needsSize2: false, hasSchedule: false },
                    'bellows_triple': { needsSize2: false, hasSchedule: false },
                    'rubber_epdm': { needsSize2: false, hasSchedule: false },
                    'rubber_nbr': { needsSize2: false, hasSchedule: false },
                    'rubber_viton': { needsSize2: false, hasSchedule: false },
                    'rotary_flange': { needsSize2: false, hasSchedule: false },
                    'axial_type': { needsSize2: false, hasSchedule: false },
                    'lateral_type': { needsSize2: false, hasSchedule: false },
                    'angular_type': { needsSize2: false, hasSchedule: false }
                },
                'filters': {
                    'strainer_y': { needsSize2: false, hasSchedule: false },
                    'strainer_t': { needsSize2: false, hasSchedule: false },
                    'strainer_basket': { needsSize2: false, hasSchedule: false },
                    'filter_magnetic': { needsSize2: false, hasSchedule: false },
                    'dirt_separator': { needsSize2: false, hasSchedule: false }
                },
                'gaskets': {
                    'gasket_spiral': { needsSize2: false, hasSchedule: false, hasThickness: true },
                    'gasket_ring': { needsSize2: false, hasSchedule: false, hasRingType: true },
                    'gasket_klingrit': { needsSize2: false, hasSchedule: false, hasThickness: true },
                    'gasket_graphite': { needsSize2: false, hasSchedule: false, hasThickness: true },
                    'gasket_ptfe': { needsSize2: false, hasSchedule: false, hasThickness: true },
                    'gasket_rubber': { needsSize2: false, hasSchedule: false, hasThickness: true }
                },
                'supports': {
                    'pipe_hanger_fixed': { needsSize2: false, hasSchedule: false, hasLoad: true },
                    'pipe_hanger_variable': { needsSize2: false, hasSchedule: false, hasLoad: true },
                    'pipe_clamp_u': { needsSize2: false, hasSchedule: false },
                    'pipe_clamp_standard': { needsSize2: false, hasSchedule: false },
                    'pipe_shoe': { needsSize2: false, hasSchedule: false, hasHeight: true },
                    'spring_hanger': { needsSize2: false, hasSchedule: false, hasLoad: true },
                    'pipe_guide': { needsSize2: false, hasSchedule: false }
                },
                'instruments': {
                    'pressure_gauge_dry': { needsSize2: false, hasSchedule: false, hasRange: true },
                    'pressure_gauge_glycerin': { needsSize2: false, hasSchedule: false, hasRange: true },
                    'thermometer_bimetal': { needsSize2: false, hasSchedule: false, hasRange: true },
                    'thermometer_digital': { needsSize2: false, hasSchedule: false, hasRange: true },
                    'level_gauge_reflex': { needsSize2: false, hasSchedule: false, hasLength: true },
                    'level_gauge_transparent': { needsSize2: false, hasSchedule: false, hasLength: true },
                    'flow_indicator': { needsSize2: false, hasSchedule: false }
                },
                'special': {
                    'weldolet': { needsSize2: true, hasSchedule: true },
                    'threadolet': { needsSize2: true, hasSchedule: false },
                    'sockolet': { needsSize2: true, hasSchedule: true },
                    'spectacle_blind': { needsSize2: false, hasSchedule: false, hasThickness: true },
                    'blind_flange': { needsSize2: false, hasSchedule: false },
                    'swage_nipple': { needsSize2: true, hasSchedule: false }
                }
            };
            
            // Ağırlık veritabanını başlat
            this.initializeWeightDatabase();
        }

        initializeWeightDatabase() {
            // FITTING AĞIRLIKLARI (kg)
            this.fittingWeights = {
                // Te Eşit - Kaynaklı
                'tee_equal': {
                    'welded': {
                        '15': { 'sch40': 0.15, 'sch80': 0.22, 'sch160': 0.35 },
                        '20': { 'sch40': 0.24, 'sch80': 0.35, 'sch160': 0.56 },
                        '25': { 'sch40': 0.42, 'sch80': 0.62, 'sch160': 0.98 },
                        '32': { 'sch40': 0.65, 'sch80': 0.95, 'sch160': 1.50 },
                        '40': { 'sch40': 0.88, 'sch80': 1.28, 'sch160': 2.05 },
                        '50': { 'sch40': 1.35, 'sch80': 2.00, 'sch160': 3.20 },
                        '65': { 'sch40': 2.10, 'sch80': 3.10, 'sch160': 4.95 },
                        '80': { 'sch40': 3.00, 'sch80': 4.45, 'sch160': 7.10 },
                        '100': { 'sch40': 5.20, 'sch80': 7.75, 'sch160': 12.40 },
                        '125': { 'sch40': 8.50, 'sch80': 12.70, 'sch160': 20.30 },
                        '150': { 'sch40': 12.30, 'sch80': 18.40, 'sch160': 29.50 },
                        '200': { 'sch40': 22.50, 'sch80': 33.70, 'sch160': 54.00 },
                        '250': { 'sch40': 38.00, 'sch80': 57.00, 'sch160': 91.00 },
                        '300': { 'sch40': 56.00, 'sch80': 84.00, 'sch160': 134.00 }
                    }
                },
                
                // Te Redüksiyonlu
                'tee_reducing': {
                    'welded': {
                        '25x20': { 'sch40': 0.38, 'sch80': 0.56, 'sch160': 0.88 },
                        '32x25': { 'sch40': 0.58, 'sch80': 0.85, 'sch160': 1.35 },
                        '40x32': { 'sch40': 0.78, 'sch80': 1.15, 'sch160': 1.85 },
                        '50x40': { 'sch40': 1.20, 'sch80': 1.78, 'sch160': 2.85 },
                        '65x50': { 'sch40': 1.85, 'sch80': 2.75, 'sch160': 4.40 },
                        '80x65': { 'sch40': 2.65, 'sch80': 3.95, 'sch160': 6.30 },
                        '100x80': { 'sch40': 4.60, 'sch80': 6.85, 'sch160': 11.00 },
                        '125x100': { 'sch40': 7.50, 'sch80': 11.20, 'sch160': 18.00 },
                        '150x125': { 'sch40': 10.90, 'sch80': 16.30, 'sch160': 26.00 },
                        '200x150': { 'sch40': 19.90, 'sch80': 29.80, 'sch160': 47.70 },
                        '250x200': { 'sch40': 33.60, 'sch80': 50.40, 'sch160': 80.60 },
                        '300x250': { 'sch40': 49.50, 'sch80': 74.20, 'sch160': 118.70 }
                    }
                },
                
                // Redüksiyon Konsantrik
                'reducer_concentric': {
                    'welded': {
                        '25x20': { 'sch40': 0.12, 'sch80': 0.18, 'sch160': 0.28 },
                        '32x25': { 'sch40': 0.18, 'sch80': 0.27, 'sch160': 0.43 },
                        '40x32': { 'sch40': 0.25, 'sch80': 0.37, 'sch160': 0.59 },
                        '50x40': { 'sch40': 0.38, 'sch80': 0.57, 'sch160': 0.91 },
                        '65x50': { 'sch40': 0.59, 'sch80': 0.88, 'sch160': 1.41 },
                        '80x65': { 'sch40': 0.85, 'sch80': 1.27, 'sch160': 2.03 },
                        '100x80': { 'sch40': 1.48, 'sch80': 2.20, 'sch160': 3.52 },
                        '125x100': { 'sch40': 2.41, 'sch80': 3.60, 'sch160': 5.76 },
                        '150x125': { 'sch40': 3.50, 'sch80': 5.23, 'sch160': 8.37 },
                        '200x150': { 'sch40': 6.40, 'sch80': 9.58, 'sch160': 15.33 },
                        '250x200': { 'sch40': 10.80, 'sch80': 16.20, 'sch160': 25.90 },
                        '300x250': { 'sch40': 15.90, 'sch80': 23.85, 'sch160': 38.16 }
                    }
                },
                
                // Dirsek 90 derece
                'elbow_90': {
                    'welded': {
                        '15': { 'sch40': 0.08, 'sch80': 0.12, 'sch160': 0.19 },
                        '20': { 'sch40': 0.13, 'sch80': 0.19, 'sch160': 0.30 },
                        '25': { 'sch40': 0.22, 'sch80': 0.33, 'sch160': 0.53 },
                        '32': { 'sch40': 0.35, 'sch80': 0.52, 'sch160': 0.83 },
                        '40': { 'sch40': 0.47, 'sch80': 0.70, 'sch160': 1.12 },
                        '50': { 'sch40': 0.73, 'sch80': 1.09, 'sch160': 1.74 },
                        '65': { 'sch40': 1.13, 'sch80': 1.69, 'sch160': 2.70 },
                        '80': { 'sch40': 1.62, 'sch80': 2.43, 'sch160': 3.89 },
                        '100': { 'sch40': 2.82, 'sch80': 4.23, 'sch160': 6.77 },
                        '125': { 'sch40': 4.62, 'sch80': 6.93, 'sch160': 11.09 },
                        '150': { 'sch40': 6.70, 'sch80': 10.05, 'sch160': 16.08 },
                        '200': { 'sch40': 12.25, 'sch80': 18.38, 'sch160': 29.40 },
                        '250': { 'sch40': 20.70, 'sch80': 31.05, 'sch160': 49.68 },
                        '300': { 'sch40': 30.50, 'sch80': 45.75, 'sch160': 73.20 }
                    }
                },
                
                // Dirsek 45 derece
                'elbow_45': {
                    'welded': {
                        '15': { 'sch40': 0.06, 'sch80': 0.09, 'sch160': 0.14 },
                        '20': { 'sch40': 0.10, 'sch80': 0.14, 'sch160': 0.23 },
                        '25': { 'sch40': 0.17, 'sch80': 0.25, 'sch160': 0.40 },
                        '32': { 'sch40': 0.26, 'sch80': 0.39, 'sch160': 0.62 },
                        '40': { 'sch40': 0.35, 'sch80': 0.53, 'sch160': 0.84 },
                        '50': { 'sch40': 0.55, 'sch80': 0.82, 'sch160': 1.31 },
                        '65': { 'sch40': 0.85, 'sch80': 1.27, 'sch160': 2.03 },
                        '80': { 'sch40': 1.22, 'sch80': 1.82, 'sch160': 2.92 },
                        '100': { 'sch40': 2.12, 'sch80': 3.17, 'sch160': 5.08 },
                        '125': { 'sch40': 3.47, 'sch80': 5.20, 'sch160': 8.32 },
                        '150': { 'sch40': 5.03, 'sch80': 7.54, 'sch160': 12.06 },
                        '200': { 'sch40': 9.19, 'sch80': 13.78, 'sch160': 22.05 },
                        '250': { 'sch40': 15.53, 'sch80': 23.29, 'sch160': 37.26 },
                        '300': { 'sch40': 22.88, 'sch80': 34.31, 'sch160': 54.90 }
                    }
                },
                
                // Kep (Cap)
                'cap': {
                    'welded': {
                        '15': { 'sch40': 0.04, 'sch80': 0.06, 'sch160': 0.10 },
                        '20': { 'sch40': 0.07, 'sch80': 0.10, 'sch160': 0.16 },
                        '25': { 'sch40': 0.11, 'sch80': 0.17, 'sch160': 0.27 },
                        '32': { 'sch40': 0.18, 'sch80': 0.26, 'sch160': 0.42 },
                        '40': { 'sch40': 0.24, 'sch80': 0.35, 'sch160': 0.56 },
                        '50': { 'sch40': 0.37, 'sch80': 0.55, 'sch160': 0.87 },
                        '65': { 'sch40': 0.57, 'sch80': 0.85, 'sch160': 1.35 },
                        '80': { 'sch40': 0.81, 'sch80': 1.22, 'sch160': 1.95 },
                        '100': { 'sch40': 1.41, 'sch80': 2.12, 'sch160': 3.39 },
                        '125': { 'sch40': 2.31, 'sch80': 3.47, 'sch160': 5.55 },
                        '150': { 'sch40': 3.35, 'sch80': 5.03, 'sch160': 8.04 },
                        '200': { 'sch40': 6.13, 'sch80': 9.19, 'sch160': 14.70 },
                        '250': { 'sch40': 10.35, 'sch80': 15.53, 'sch160': 24.84 },
                        '300': { 'sch40': 15.25, 'sch80': 22.88, 'sch160': 36.60 }
                    }
                }
            };
            
            // KOMPANSATÖR AĞIRLIKLARI (kg)
            this.expansionWeights = {
                'bellows_single': {
                    'flanged': {
                        '25': { 'PN10': 8.5, 'PN16': 9.2, 'PN25': 10.5 },
                        '32': { 'PN10': 10.5, 'PN16': 11.5, 'PN25': 13.0 },
                        '40': { 'PN10': 12.5, 'PN16': 13.8, 'PN25': 15.6 },
                        '50': { 'PN10': 15.5, 'PN16': 17.2, 'PN25': 19.5 },
                        '65': { 'PN10': 20.5, 'PN16': 22.8, 'PN25': 25.8 },
                        '80': { 'PN10': 26.0, 'PN16': 28.9, 'PN25': 32.7 },
                        '100': { 'PN10': 37.5, 'PN16': 41.7, 'PN25': 47.2 },
                        '125': { 'PN10': 52.0, 'PN16': 57.8, 'PN25': 65.4 },
                        '150': { 'PN10': 69.5, 'PN16': 77.2, 'PN25': 87.4 },
                        '200': { 'PN10': 112.0, 'PN16': 124.5, 'PN25': 140.9 },
                        '250': { 'PN10': 168.0, 'PN16': 186.7, 'PN25': 211.4 },
                        '300': { 'PN10': 235.0, 'PN16': 261.1, 'PN25': 295.6 },
                        '350': { 'PN10': 315.0, 'PN16': 350.0, 'PN25': 396.3 },
                        '400': { 'PN10': 408.0, 'PN16': 453.3, 'PN25': 513.2 },
                        '500': { 'PN10': 635.0, 'PN16': 705.6, 'PN25': 799.0 },
                        '600': { 'PN10': 915.0, 'PN16': 1016.7, 'PN25': 1151.2 }
                    }
                },
                
                'rubber_epdm': {
                    'flanged': {
                        '25': { 'PN10': 2.8, 'PN16': 3.1, 'PN25': 3.5 },
                        '32': { 'PN10': 3.5, 'PN16': 3.9, 'PN25': 4.4 },
                        '40': { 'PN10': 4.2, 'PN16': 4.7, 'PN25': 5.3 },
                        '50': { 'PN10': 5.5, 'PN16': 6.1, 'PN25': 6.9 },
                        '65': { 'PN10': 7.5, 'PN16': 8.3, 'PN25': 9.4 },
                        '80': { 'PN10': 9.8, 'PN16': 10.9, 'PN25': 12.3 },
                        '100': { 'PN10': 14.5, 'PN16': 16.1, 'PN25': 18.2 },
                        '125': { 'PN10': 20.5, 'PN16': 22.8, 'PN25': 25.8 },
                        '150': { 'PN10': 27.8, 'PN16': 30.9, 'PN25': 34.9 },
                        '200': { 'PN10': 45.5, 'PN16': 50.6, 'PN25': 57.2 },
                        '250': { 'PN10': 68.5, 'PN16': 76.1, 'PN25': 86.1 },
                        '300': { 'PN10': 96.0, 'PN16': 106.7, 'PN25': 120.7 },
                        '350': { 'PN10': 128.5, 'PN16': 142.8, 'PN25': 161.6 },
                        '400': { 'PN10': 166.5, 'PN16': 185.0, 'PN25': 209.3 },
                        '500': { 'PN10': 259.0, 'PN16': 287.8, 'PN25': 325.7 },
                        '600': { 'PN10': 373.5, 'PN16': 415.0, 'PN25': 469.6 }
                    }
                }
            };
            
            // FİLTRE AĞIRLIKLARI (kg)
            this.filterWeights = {
                'strainer_y': {
                    'flanged': {
                        '15': { 'PN16': 1.8, 'PN25': 2.1, 'PN40': 2.5 },
                        '20': { 'PN16': 2.3, 'PN25': 2.7, 'PN40': 3.2 },
                        '25': { 'PN16': 3.2, 'PN25': 3.7, 'PN40': 4.4 },
                        '32': { 'PN16': 4.5, 'PN25': 5.2, 'PN40': 6.2 },
                        '40': { 'PN16': 5.8, 'PN25': 6.7, 'PN40': 8.0 },
                        '50': { 'PN16': 8.0, 'PN25': 9.2, 'PN40': 11.0 },
                        '65': { 'PN16': 11.5, 'PN25': 13.3, 'PN40': 15.9 },
                        '80': { 'PN16': 15.5, 'PN25': 17.9, 'PN40': 21.4 },
                        '100': { 'PN16': 23.5, 'PN25': 27.2, 'PN40': 32.5 },
                        '125': { 'PN16': 35.5, 'PN25': 41.1, 'PN40': 49.1 },
                        '150': { 'PN16': 50.5, 'PN25': 58.4, 'PN40': 69.8 },
                        '200': { 'PN16': 87.0, 'PN25': 100.7, 'PN40': 120.3 },
                        '250': { 'PN16': 138.5, 'PN25': 160.3, 'PN40': 191.5 },
                        '300': { 'PN16': 202.0, 'PN25': 233.8, 'PN40': 279.4 }
                    },
                    'threaded': {
                        '15': { 'PN40': 0.35 },
                        '20': { 'PN40': 0.52 },
                        '25': { 'PN40': 0.85 },
                        '32': { 'PN40': 1.35 },
                        '40': { 'PN40': 1.95 },
                        '50': { 'PN40': 3.20 }
                    }
                },
                
                'strainer_basket': {
                    'flanged': {
                        '50': { 'PN16': 12.5, 'PN25': 14.4, 'PN40': 17.2 },
                        '65': { 'PN16': 17.8, 'PN25': 20.6, 'PN40': 24.6 },
                        '80': { 'PN16': 24.0, 'PN25': 27.7, 'PN40': 33.1 },
                        '100': { 'PN16': 36.5, 'PN25': 42.2, 'PN40': 50.4 },
                        '125': { 'PN16': 55.0, 'PN25': 63.6, 'PN40': 76.0 },
                        '150': { 'PN16': 78.0, 'PN25': 90.2, 'PN40': 107.8 },
                        '200': { 'PN16': 134.5, 'PN25': 155.6, 'PN40': 185.9 },
                        '250': { 'PN16': 214.0, 'PN25': 247.6, 'PN40': 295.9 },
                        '300': { 'PN16': 312.0, 'PN25': 361.0, 'PN40': 431.4 }
                    }
                }
            };
            
            // CONTA AĞIRLIKLARI (kg/adet)
            this.gasketWeights = {
                'gasket_spiral': {
                    '3mm': {
                        '15': 0.018, '20': 0.025, '25': 0.035, '32': 0.048,
                        '40': 0.062, '50': 0.085, '65': 0.125, '80': 0.165,
                        '100': 0.245, '125': 0.365, '150': 0.515, '200': 0.875,
                        '250': 1.385, '300': 2.015
                    },
                    '4.5mm': {
                        '15': 0.027, '20': 0.038, '25': 0.053, '32': 0.072,
                        '40': 0.093, '50': 0.128, '65': 0.188, '80': 0.248,
                        '100': 0.368, '125': 0.548, '150': 0.773, '200': 1.313,
                        '250': 2.078, '300': 3.023
                    }
                },
                
                'gasket_klingrit': {
                    '2mm': {
                        '15': 0.008, '20': 0.011, '25': 0.015, '32': 0.021,
                        '40': 0.027, '50': 0.037, '65': 0.054, '80': 0.072,
                        '100': 0.107, '125': 0.159, '150': 0.224, '200': 0.381,
                        '250': 0.603, '300': 0.877
                    },
                    '3mm': {
                        '15': 0.012, '20': 0.017, '25': 0.023, '32': 0.032,
                        '40': 0.041, '50': 0.056, '65': 0.081, '80': 0.108,
                        '100': 0.161, '125': 0.239, '150': 0.336, '200': 0.572,
                        '250': 0.905, '300': 1.316
                    }
                },
                
                'gasket_ptfe': {
                    '2mm': {
                        '15': 0.010, '20': 0.014, '25': 0.019, '32': 0.026,
                        '40': 0.033, '50': 0.046, '65': 0.067, '80': 0.089,
                        '100': 0.132, '125': 0.197, '150': 0.277, '200': 0.471,
                        '250': 0.746, '300': 1.085
                    },
                    '3mm': {
                        '15': 0.015, '20': 0.021, '25': 0.029, '32': 0.039,
                        '40': 0.050, '50': 0.069, '65': 0.101, '80': 0.134,
                        '100': 0.198, '125': 0.296, '150': 0.416, '200': 0.707,
                        '250': 1.119, '300': 1.628
                    }
                }
            };
            
            // DESTEK ELEMANLARI AĞIRLIKLARI (kg)
            this.supportWeights = {
                'pipe_hanger_fixed': {
                    '15': { 'light': 0.85, 'medium': 1.25, 'heavy': 1.85 },
                    '20': { 'light': 1.05, 'medium': 1.55, 'heavy': 2.30 },
                    '25': { 'light': 1.35, 'medium': 2.00, 'heavy': 2.95 },
                    '32': { 'light': 1.75, 'medium': 2.60, 'heavy': 3.85 },
                    '40': { 'light': 2.20, 'medium': 3.25, 'heavy': 4.80 },
                    '50': { 'light': 2.85, 'medium': 4.25, 'heavy': 6.30 },
                    '65': { 'light': 3.85, 'medium': 5.75, 'heavy': 8.50 },
                    '80': { 'light': 5.05, 'medium': 7.55, 'heavy': 11.15 },
                    '100': { 'light': 7.50, 'medium': 11.20, 'heavy': 16.55 },
                    '125': { 'light': 11.00, 'medium': 16.45, 'heavy': 24.30 },
                    '150': { 'light': 15.25, 'medium': 22.85, 'heavy': 33.75 },
                    '200': { 'light': 25.50, 'medium': 38.20, 'heavy': 56.45 },
                    '250': { 'light': 39.50, 'medium': 59.20, 'heavy': 87.45 },
                    '300': { 'light': 56.50, 'medium': 84.70, 'heavy': 125.10 }
                },
                
                'spring_hanger': {
                    '500kg': 8.5, '750kg': 11.2, '1000kg': 14.8, '1500kg': 19.5,
                    '2000kg': 25.5, '2500kg': 32.0, '3000kg': 39.5, '4000kg': 52.0,
                    '5000kg': 66.5, '6000kg': 82.5, '7500kg': 103.0, '10000kg': 136.5
                },
                
                'pipe_clamp_u': {
                    '15': 0.25, '20': 0.32, '25': 0.42, '32': 0.55,
                    '40': 0.70, '50': 0.92, '65': 1.25, '80': 1.65,
                    '100': 2.45, '125': 3.65, '150': 5.15, '200': 8.75,
                    '250': 13.85, '300': 20.15
                }
            };
            
            // ÖLÇÜM CİHAZLARI AĞIRLIKLARI (kg)
            this.instrumentWeights = {
                'pressure_gauge_dry': {
                    '63mm': 0.25, '100mm': 0.45, '160mm': 0.85, '250mm': 1.85
                },
                'pressure_gauge_glycerin': {
                    '63mm': 0.35, '100mm': 0.65, '160mm': 1.25, '250mm': 2.75
                },
                'thermometer_bimetal': {
                    '63mm': 0.22, '100mm': 0.38, '160mm': 0.72, '250mm': 1.55
                },
                'level_gauge_reflex': {
                    '300mm': 3.85, '500mm': 6.45, '750mm': 9.65, '1000mm': 12.85,
                    '1250mm': 16.05, '1500mm': 19.25
                }
            };
            
            // ÖZEL PARÇALAR AĞIRLIKLARI (kg)
            this.specialWeights = {
                'weldolet': {
                    '100x15': 0.45, '100x20': 0.52, '100x25': 0.65, '100x32': 0.82,
                    '100x40': 1.05, '100x50': 1.45, '150x25': 0.95, '150x32': 1.20,
                    '150x40': 1.55, '150x50': 2.15, '150x65': 3.05, '150x80': 4.25,
                    '200x25': 1.35, '200x32': 1.70, '200x40': 2.20, '200x50': 3.05,
                    '200x65': 4.35, '200x80': 6.05, '200x100': 9.05, '250x50': 4.15,
                    '250x65': 5.90, '250x80': 8.20, '250x100': 12.30, '300x50': 5.50,
                    '300x65': 7.80, '300x80': 10.85, '300x100': 16.25
                },
                
                'spectacle_blind': {
                    '3mm': {
                        '15': 0.28, '20': 0.42, '25': 0.65, '32': 0.95,
                        '40': 1.30, '50': 1.95, '65': 3.10, '80': 4.45,
                        '100': 7.25, '125': 11.40, '150': 16.50, '200': 29.50,
                        '250': 46.50, '300': 67.50
                    },
                    '6mm': {
                        '15': 0.56, '20': 0.84, '25': 1.30, '32': 1.90,
                        '40': 2.60, '50': 3.90, '65': 6.20, '80': 8.90,
                        '100': 14.50, '125': 22.80, '150': 33.00, '200': 59.00,
                        '250': 93.00, '300': 135.00
                    }
                }
            };
        }

        createUI() {
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="ekipmanKategori">${this.getText('ekipman_kategori_label')}</label>
                        <select id="ekipmanKategori" onchange="window.ApplicationController.updateEkipmanTipleri()">
                            <option value="">${this.getText('select_category')}</option>
                            <option value="fittings">${this.getText('fittings')}</option>
                            <option value="expansion">${this.getText('expansion')}</option>
                            <option value="filters">${this.getText('filters')}</option>
                            <option value="gaskets">${this.getText('gaskets')}</option>
                            <option value="supports">${this.getText('supports')}</option>
                            <option value="instruments">${this.getText('instruments')}</option>
                            <option value="special">${this.getText('special')}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="ekipmanTipi">${this.getText('ekipman_tipi_label')}</label>
                        <select id="ekipmanTipi" onchange="window.ApplicationController.updateEkipmanOptions()">
                            <option value="">${this.getText('select_type')}</option>
                        </select>
                    </div>
                </div>
                <div class="form-row" id="baglantiRow" style="display: none;">
                    <div class="form-group">
                        <label for="ekipmanBaglanti">${this.getText('baglanti_tipi_label')}</label>
                        <select id="ekipmanBaglanti" onchange="window.ApplicationController.updateEkipmanSizes()">
                            <option value="">${this.getText('select_connection')}</option>
                        </select>
                    </div>
                </div>
                <div class="form-row" id="boyutRow" style="display: none;">
                    <div class="form-group">
                        <label for="ekipmanBoyut">${this.getText('boyut_label')}</label>
                        <select id="ekipmanBoyut" onchange="window.ApplicationController.updateEkipmanPressure()">
                            <option value="">${this.getText('select_size')}</option>
                        </select>
                    </div>
                    <div class="form-group" id="boyut2Group" style="display: none;">
                        <label for="ekipmanBoyut2">İkinci Boyut</label>
                        <select id="ekipmanBoyut2">
                            <option value="">Seçin</option>
                        </select>
                    </div>
                </div>
                <div class="form-row" id="basincRow" style="display: none;">
                    <div class="form-group">
                        <label for="ekipmanBasinc">${this.getText('basinc_label')}</label>
                        <select id="ekipmanBasinc" onchange="window.ApplicationController.updateEkipmanInfo()">
                            <option value="">${this.getText('select_pressure')}</option>
                        </select>
                    </div>
                    <div class="form-group" id="scheduleGroup" style="display: none;">
                        <label for="ekipmanSchedule">Schedule</label>
                        <select id="ekipmanSchedule" onchange="window.ApplicationController.updateEkipmanInfo()">
                            <option value="">Seçin</option>
                            <option value="sch40">Schedule 40</option>
                            <option value="sch80">Schedule 80</option>
                            <option value="sch160">Schedule 160</option>
                        </select>
                    </div>
                </div>
                <div class="form-row" id="ozelAlanRow" style="display: none;">
                    <div class="form-group" id="thicknessGroup" style="display: none;">
                        <label for="contaKalinlik">Kalınlık</label>
                        <select id="contaKalinlik">
                            <option value="">Seçin</option>
                        </select>
                    </div>
                    <div class="form-group" id="loadGroup" style="display: none;">
                        <label for="yukKapasitesi">Yük Kapasitesi</label>
                        <select id="yukKapasitesi">
                            <option value="">Seçin</option>
                        </select>
                    </div>
                    <div class="form-group" id="rangeGroup" style="display: none;">
                        <label for="olcumAraligi">Ölçüm Aralığı</label>
                        <select id="olcumAraligi">
                            <option value="">Seçin</option>
                        </select>
                    </div>
                    <div class="form-group" id="lengthGroup" style="display: none;">
                        <label for="gorusBoyutu">Görüş Uzunluğu</label>
                        <select id="gorusBoyutu">
                            <option value="">Seçin</option>
                        </select>
                    </div>
                </div>
                <div class="form-row" id="infoRow" style="display: none;">
                    <div class="form-group">
                        <small style="color: #4299e1; font-weight: 600;">
                            <span id="ekipmanWeightInfo"></span> | 
                            <span id="ekipmanStandardInfo"></span>
                        </small>
                    </div>
                </div>
            `;
        }

        calculate(formData) {
            const kategori = formData.ekipmanKategori;
            const tip = formData.ekipmanTipi;
            const adet = parseFloat(formData.adet) || 1;
            
            if (!kategori || !tip) {
                return null;
            }
            
            let birimAgirlik = 0;
            
            // Kategoriye göre ağırlık hesapla
            switch(kategori) {
                case 'fittings':
                    birimAgirlik = this.calculateFittingWeight(formData);
                    break;
                case 'expansion':
                    birimAgirlik = this.calculateExpansionWeight(formData);
                    break;
                case 'filters':
                    birimAgirlik = this.calculateFilterWeight(formData);
                    break;
                case 'gaskets':
                    birimAgirlik = this.calculateGasketWeight(formData);
                    break;
                case 'supports':
                    birimAgirlik = this.calculateSupportWeight(formData);
                    break;
                case 'instruments':
                    birimAgirlik = this.calculateInstrumentWeight(formData);
                    break;
                case 'special':
                    birimAgirlik = this.calculateSpecialWeight(formData);
                    break;
            }
            
            if (!birimAgirlik || birimAgirlik === 0) {
                return null;
            }
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: birimAgirlik * adet,
                suHacmi: null
            };
        }

        calculateFittingWeight(formData) {
            const tip = formData.ekipmanTipi;
            const baglanti = formData.ekipmanBaglanti || 'welded';
            const boyut = formData.ekipmanBoyut;
            const boyut2 = formData.ekipmanBoyut2;
            const schedule = formData.ekipmanSchedule || 'sch40';
            
            // Redüksiyonlu parçalar için boyut kombinasyonu oluştur
            let sizeKey = boyut;
            if (boyut2 && boyut2 !== boyut) {
                sizeKey = `${boyut}x${boyut2}`;
            }
            
            if (this.fittingWeights[tip] && 
                this.fittingWeights[tip][baglanti] && 
                this.fittingWeights[tip][baglanti][sizeKey]) {
                return this.fittingWeights[tip][baglanti][sizeKey][schedule] || 0;
            }
            
            // Tabloda yoksa yaklaşık hesaplama
            return this.estimateFittingWeight(tip, boyut, boyut2, schedule);
        }

        estimateFittingWeight(tip, boyut, boyut2, schedule) {
            // Boru ağırlığına dayalı yaklaşık hesaplama
            const dn1 = parseInt(boyut);
            const dn2 = boyut2 ? parseInt(boyut2) : dn1;
            
            // Schedule faktörleri
            const scheduleFactor = {
                'sch40': 1.0,
                'sch80': 1.5,
                'sch160': 2.4
            };
            
            // Tip faktörleri
            const typeFactor = {
                'tee_equal': 2.5,
                'tee_reducing': 2.3,
                'reducer_concentric': 0.8,
                'reducer_eccentric': 0.85,
                'elbow_90': 1.35,
                'elbow_45': 1.0,
                'cap': 0.7,
                'cross': 3.2
            };
            
            // Temel ağırlık hesabı
            const avgDn = (dn1 + dn2) / 2;
            const baseWeight = Math.pow(avgDn / 25, 2.2) * 0.35;
            
            return baseWeight * (typeFactor[tip] || 1.0) * (scheduleFactor[schedule] || 1.0);
        }

        calculateExpansionWeight(formData) {
            const tip = formData.ekipmanTipi;
            const baglanti = formData.ekipmanBaglanti || 'flanged';
            const boyut = formData.ekipmanBoyut;
            const basinc = formData.ekipmanBasinc || 'PN16';
            
            if (this.expansionWeights[tip] && 
                this.expansionWeights[tip][baglanti] && 
                this.expansionWeights[tip][baglanti][boyut]) {
                return this.expansionWeights[tip][baglanti][boyut][basinc] || 0;
            }
            
            // Yaklaşık hesaplama
            const dn = parseInt(boyut);
            const baseFactor = tip.includes('rubber') ? 0.35 : 1.2;
            return Math.pow(dn / 50, 2.1) * 12 * baseFactor;
        }

        calculateFilterWeight(formData) {
            const tip = formData.ekipmanTipi;
            const baglanti = formData.ekipmanBaglanti || 'flanged';
            const boyut = formData.ekipmanBoyut;
            const basinc = formData.ekipmanBasinc || 'PN16';
            
            if (this.filterWeights[tip] && 
                this.filterWeights[tip][baglanti] && 
                this.filterWeights[tip][baglanti][boyut]) {
                return this.filterWeights[tip][baglanti][boyut][basinc] || 0;
            }
            
            // Yaklaşık hesaplama
            const dn = parseInt(boyut);
            const typeFactor = tip.includes('basket') ? 1.5 : 1.0;
            return Math.pow(dn / 50, 2.15) * 6.5 * typeFactor;
        }

        calculateGasketWeight(formData) {
            const tip = formData.ekipmanTipi;
            const boyut = formData.ekipmanBoyut;
            const kalinlik = formData.contaKalinlik || '3mm';
            
            if (this.gasketWeights[tip] && 
                this.gasketWeights[tip][kalinlik] && 
                this.gasketWeights[tip][kalinlik][boyut]) {
                return this.gasketWeights[tip][kalinlik][boyut];
            }
            
            // Yaklaşık hesaplama - DN bazlı
            const dn = parseInt(boyut);
            const thicknessFactor = parseFloat(kalinlik) / 3;
            const materialFactor = tip.includes('spiral') ? 2.5 : 1.0;
            
            return (Math.PI * Math.pow((dn + 50) / 1000, 2) * thicknessFactor * materialFactor * 2.2);
        }

        calculateSupportWeight(formData) {
            const tip = formData.ekipmanTipi;
            const boyut = formData.ekipmanBoyut;
            
            if (tip === 'spring_hanger') {
                const kapasite = formData.yukKapasitesi || '1000kg';
                return this.supportWeights[tip][kapasite] || 15;
            }
            
            if (this.supportWeights[tip] && this.supportWeights[tip][boyut]) {
                const loadType = formData.yukKapasitesi || 'medium';
                if (typeof this.supportWeights[tip][boyut] === 'object') {
                    return this.supportWeights[tip][boyut][loadType] || 0;
                }
                return this.supportWeights[tip][boyut];
            }
            
            // Yaklaşık hesaplama
            const dn = parseInt(boyut);
            return Math.pow(dn / 50, 1.8) * 3.5;
        }

        calculateInstrumentWeight(formData) {
            const tip = formData.ekipmanTipi;
            
            if (tip.includes('gauge') || tip.includes('thermometer')) {
                const size = formData.olcumAraligi || '100mm';
                return this.instrumentWeights[tip][size] || 0.5;
            }
            
            if (tip.includes('level_gauge')) {
                const length = formData.gorusBoyutu || '500mm';
                return this.instrumentWeights[tip][length] || 5;
            }
            
            // Varsayılan ağırlık
            return 1.5;
        }

        calculateSpecialWeight(formData) {
            const tip = formData.ekipmanTipi;
            const boyut = formData.ekipmanBoyut;
            const boyut2 = formData.ekipmanBoyut2;
            
            if (tip === 'weldolet' || tip === 'threadolet') {
                const sizeKey = `${boyut}x${boyut2}`;
                if (this.specialWeights['weldolet'][sizeKey]) {
                    return this.specialWeights['weldolet'][sizeKey];
                }
                // Yaklaşık hesaplama
                const dn1 = parseInt(boyut);
                const dn2 = parseInt(boyut2);
                return Math.pow(dn1 / 100, 1.5) * Math.pow(dn2 / 25, 1.2) * 2.5;
            }
            
            if (tip === 'spectacle_blind') {
                const thickness = formData.contaKalinlik || '3mm';
                if (this.specialWeights[tip] && 
                    this.specialWeights[tip][thickness] && 
                    this.specialWeights[tip][thickness][boyut]) {
                    return this.specialWeights[tip][thickness][boyut];
                }
            }
            
            // Varsayılan
            return 2.5;
        }

        formatDimensions(formData) {
            const kategori = formData.ekipmanKategori;
            const tip = formData.ekipmanTipi;
            const boyut = formData.ekipmanBoyut;
            const boyut2 = formData.ekipmanBoyut2;
            const basinc = formData.ekipmanBasinc;
            const schedule = formData.ekipmanSchedule;
            
            let dimensions = `DN${boyut}`;
            
            if (boyut2 && boyut2 !== boyut) {
                dimensions = `DN${boyut} x DN${boyut2}`;
            }
            
            if (basinc) {
                dimensions += ` ${basinc}`;
            }
            
            if (schedule) {
                dimensions += ` ${schedule.toUpperCase()}`;
            }
            
            // Özel alanlar
            if (formData.contaKalinlik) {
                dimensions += ` ${formData.contaKalinlik}`;
            }
            
            if (formData.yukKapasitesi) {
                dimensions += ` ${formData.yukKapasitesi}`;
            }
            
            if (formData.olcumAraligi) {
                dimensions += ` ${formData.olcumAraligi}`;
            }
            
            return dimensions;
        }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            
            // Ekipman tipinin kod ve adını al
            const ekipmanTipiKodu = formData.ekipmanTipi; // Değişmeyen kod (örn: 'strainer_t')
            const ekipmanTipiAdi = this.getText(ekipmanTipiKodu); // Dile göre değişen ad
            
            // Tabloda görünecek malzeme türü
            baseRow.malzemeTuru = ekipmanTipiAdi;
            
            // Standart bilgisi
            baseRow.enNormu = this.standards[formData.ekipmanKategori] || '-';
            
            // Detayları sakla - tip kodunu mutlaka sakla
            baseRow.borulamaDetay = {
                kategori: formData.ekipmanKategori,
                tip: ekipmanTipiKodu, // KRİTİK: Kod olarak saklanmalı, ad değil
                baglanti: formData.ekipmanBaglanti,
                boyut: formData.ekipmanBoyut,
                boyut2: formData.ekipmanBoyut2,
                basinc: formData.ekipmanBasinc,
                schedule: formData.ekipmanSchedule,
                ozelAlanlar: {
                    kalinlik: formData.contaKalinlik,
                    yukKapasitesi: formData.yukKapasitesi,
                    olcumAraligi: formData.olcumAraligi,
                    gorusBoyutu: formData.gorusBoyutu
                }
            };
            
            baseRow.originalType = 'borulamaEkipmanlari';
            
            return baseRow;
        }

        fillSpecificFields(rowData) {
            if (!rowData.borulamaDetay) return;
            
            const detay = rowData.borulamaDetay;
            
            // Kategori ve tip seç
            document.getElementById('ekipmanKategori').value = detay.kategori;
            window.ApplicationController.updateEkipmanTipleri();
            
            setTimeout(() => {
                document.getElementById('ekipmanTipi').value = detay.tip;
                window.ApplicationController.updateEkipmanOptions();
                
                setTimeout(() => {
                    if (detay.baglanti) {
                        document.getElementById('ekipmanBaglanti').value = detay.baglanti;
                        window.ApplicationController.updateEkipmanSizes();
                    }
                    
                    setTimeout(() => {
                        if (detay.boyut) {
                            document.getElementById('ekipmanBoyut').value = detay.boyut;
                            window.ApplicationController.updateEkipmanPressure();
                        }
                        
                        if (detay.boyut2) {
                            const boyut2El = document.getElementById('ekipmanBoyut2');
                            if (boyut2El) boyut2El.value = detay.boyut2;
                        }
                        
                        setTimeout(() => {
                            if (detay.basinc) {
                                document.getElementById('ekipmanBasinc').value = detay.basinc;
                            }
                            
                            if (detay.schedule) {
                                const scheduleEl = document.getElementById('ekipmanSchedule');
                                if (scheduleEl) scheduleEl.value = detay.schedule;
                            }
                            
                            // Özel alanlar
                            if (detay.ozelAlanlar) {
                                const ozel = detay.ozelAlanlar;
                                
                                if (ozel.kalinlik) {
                                    const kalinlikEl = document.getElementById('contaKalinlik');
                                    if (kalinlikEl) kalinlikEl.value = ozel.kalinlik;
                                }
                                
                                if (ozel.yukKapasitesi) {
                                    const yukEl = document.getElementById('yukKapasitesi');
                                    if (yukEl) yukEl.value = ozel.yukKapasitesi;
                                }
                                
                                if (ozel.olcumAraligi) {
                                    const olcumEl = document.getElementById('olcumAraligi');
                                    if (olcumEl) olcumEl.value = ozel.olcumAraligi;
                                }
                                
                                if (ozel.gorusBoyutu) {
                                    const gorusEl = document.getElementById('gorusBoyutu');
                                    if (gorusEl) gorusEl.value = ozel.gorusBoyutu;
                                }
                            }
                            
                            window.ApplicationController.updateEkipmanInfo();
                        }, 100);
                    }, 100);
                }, 100);
            }, 100);
        }

        validate(formData) {
            const kategori = formData.ekipmanKategori;
            const tip = formData.ekipmanTipi;
            
            if (!kategori || !tip) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            return { isValid: true };
        }
    }

    // ApplicationController'a yardımcı fonksiyonlar ekle
    if (!window.ApplicationController.updateEkipmanTipleri) {
        window.ApplicationController.updateEkipmanTipleri = function() {
            const kategori = document.getElementById('ekipmanKategori').value;
            const tipiSelect = document.getElementById('ekipmanTipi');
            
            if (!kategori) {
                tipiSelect.innerHTML = '<option value="">Tip seçin</option>';
                document.getElementById('baglantiRow').style.display = 'none';
                document.getElementById('boyutRow').style.display = 'none';
                document.getElementById('basincRow').style.display = 'none';
                document.getElementById('ozelAlanRow').style.display = 'none';
                document.getElementById('infoRow').style.display = 'none';
                return;
            }
            
            const MaterialClass = window.MaterialRegistry.get('borulamaEkipmanlari');
            const instance = new MaterialClass();
            
            tipiSelect.innerHTML = '<option value="">Tip seçin</option>';
            
            const kategoriler = instance.equipmentCategories[kategori];
            if (kategoriler) {
                Object.keys(kategoriler).forEach(tip => {
                    const tipAdi = instance.getText(tip);
                    tipiSelect.innerHTML += `<option value="${tip}">${tipAdi}</option>`;
                });
            }
        };
        
        window.ApplicationController.updateEkipmanOptions = function() {
            const kategori = document.getElementById('ekipmanKategori').value;
            const tip = document.getElementById('ekipmanTipi').value;
            
            if (!kategori || !tip) {
                document.getElementById('baglantiRow').style.display = 'none';
                return;
            }
            
            // Bağlantı tiplerini göster
            document.getElementById('baglantiRow').style.display = 'flex';
            const baglantiSelect = document.getElementById('ekipmanBaglanti');
            
            // Kategoriye göre bağlantı tipleri
            if (kategori === 'fittings' || kategori === 'special') {
                baglantiSelect.innerHTML = `
                    <option value="">Seçin</option>
                    <option value="welded">Kaynaklı</option>
                    <option value="threaded">Dişli</option>
                `;
            } else if (kategori === 'expansion' || kategori === 'filters') {
                baglantiSelect.innerHTML = `
                    <option value="">Seçin</option>
                    <option value="flanged">Flanşlı</option>
                    <option value="threaded">Dişli</option>
                `;
            } else if (kategori === 'gaskets') {
                baglantiSelect.innerHTML = `
                    <option value="flanged" selected>Flanş Arası</option>
                `;
                window.ApplicationController.updateEkipmanSizes();
            } else {
                baglantiSelect.innerHTML = `
                    <option value="standard" selected>Standart</option>
                `;
                window.ApplicationController.updateEkipmanSizes();
            }
        };
        
        window.ApplicationController.updateEkipmanSizes = function() {
            const kategori = document.getElementById('ekipmanKategori').value;
            const tip = document.getElementById('ekipmanTipi').value;
            
            if (!kategori || !tip) return;
            
            document.getElementById('boyutRow').style.display = 'flex';
            
            const MaterialClass = window.MaterialRegistry.get('borulamaEkipmanlari');
            const instance = new MaterialClass();
            const tipInfo = instance.equipmentCategories[kategori][tip];
            
            // Ana boyut listesi
            const boyutSelect = document.getElementById('ekipmanBoyut');
            boyutSelect.innerHTML = '<option value="">Seçin</option>';
            
            // Standart DN boyutları
            const dnSizes = ['15', '20', '25', '32', '40', '50', '65', '80', 
                           '100', '125', '150', '200', '250', '300', '350', 
                           '400', '450', '500', '600'];
            
            // Özel boyutlar
            if (kategori === 'instruments') {
                if (tip.includes('gauge') || tip.includes('thermometer')) {
                    boyutSelect.innerHTML = `
                        <option value="">Seçin</option>
                        <option value="15">DN15 (1/2")</option>
                        <option value="20">DN20 (3/4")</option>
                        <option value="25">DN25 (1")</option>
                    `;
                } else {
                    boyutSelect.innerHTML = '<option value="standard">Standart</option>';
                }
            } else {
                dnSizes.forEach(size => {
                    boyutSelect.innerHTML += `<option value="${size}">DN${size}</option>`;
                });
            }
            
            // İkinci boyut gerekiyorsa göster
            const boyut2Group = document.getElementById('boyut2Group');
            if (tipInfo && tipInfo.needsSize2) {
                boyut2Group.style.display = 'block';
                const boyut2Select = document.getElementById('ekipmanBoyut2');
                boyut2Select.innerHTML = '<option value="">Seçin</option>';
                dnSizes.forEach(size => {
                    boyut2Select.innerHTML += `<option value="${size}">DN${size}</option>`;
                });
            } else {
                boyut2Group.style.display = 'none';
            }
        };
        
        window.ApplicationController.updateEkipmanPressure = function() {
            const kategori = document.getElementById('ekipmanKategori').value;
            const tip = document.getElementById('ekipmanTipi').value;
            const boyut = document.getElementById('ekipmanBoyut').value;
            
            if (!kategori || !tip || !boyut) return;
            
            const MaterialClass = window.MaterialRegistry.get('borulamaEkipmanlari');
            const instance = new MaterialClass();
            const tipInfo = instance.equipmentCategories[kategori][tip];
            
            document.getElementById('basincRow').style.display = 'flex';
            
            // Basınç sınıfları
            const basincSelect = document.getElementById('ekipmanBasinc');
            if (kategori !== 'gaskets' && kategori !== 'supports' && kategori !== 'instruments') {
                basincSelect.innerHTML = `
                    <option value="">Seçin</option>
                    <option value="PN10">PN10</option>
                    <option value="PN16">PN16</option>
                    <option value="PN25">PN25</option>
                    <option value="PN40">PN40</option>
                    <option value="PN63">PN63</option>
                `;
            } else {
                basincSelect.innerHTML = '<option value="PN16" selected>PN16</option>';
            }
            
            // Schedule göster/gizle
            const scheduleGroup = document.getElementById('scheduleGroup');
            if (tipInfo && tipInfo.hasSchedule) {
                scheduleGroup.style.display = 'block';
            } else {
                scheduleGroup.style.display = 'none';
            }
            
            // Özel alanları göster
            document.getElementById('ozelAlanRow').style.display = 'none';
            
            // Conta kalınlığı
            if (kategori === 'gaskets' || tip === 'spectacle_blind') {
                document.getElementById('ozelAlanRow').style.display = 'flex';
                document.getElementById('thicknessGroup').style.display = 'block';
                
                const kalinlikSelect = document.getElementById('contaKalinlik');
                kalinlikSelect.innerHTML = `
                    <option value="">Seçin</option>
                    <option value="2mm">2 mm</option>
                    <option value="3mm">3 mm</option>
                    <option value="4.5mm">4.5 mm</option>
                    <option value="6mm">6 mm</option>
                `;
            } else {
                document.getElementById('thicknessGroup').style.display = 'none';
            }
            
            // Yük kapasitesi
            if (tip.includes('hanger') || tip === 'spring_hanger') {
                document.getElementById('ozelAlanRow').style.display = 'flex';
                document.getElementById('loadGroup').style.display = 'block';
                
                const yukSelect = document.getElementById('yukKapasitesi');
                if (tip === 'spring_hanger') {
                    yukSelect.innerHTML = `
                        <option value="">Seçin</option>
                        <option value="500kg">500 kg</option>
                        <option value="750kg">750 kg</option>
                        <option value="1000kg">1000 kg</option>
                        <option value="1500kg">1500 kg</option>
                        <option value="2000kg">2000 kg</option>
                        <option value="2500kg">2500 kg</option>
                        <option value="3000kg">3000 kg</option>
                        <option value="4000kg">4000 kg</option>
                        <option value="5000kg">5000 kg</option>
                    `;
                } else {
                    yukSelect.innerHTML = `
                        <option value="">Seçin</option>
                        <option value="light">Hafif</option>
                        <option value="medium">Orta</option>
                        <option value="heavy">Ağır</option>
                    `;
                }
            } else {
                document.getElementById('loadGroup').style.display = 'none';
            }
            
            // Ölçüm aralığı
            if (tip.includes('gauge') || tip.includes('thermometer')) {
                document.getElementById('ozelAlanRow').style.display = 'flex';
                document.getElementById('rangeGroup').style.display = 'block';
                
                const olcumSelect = document.getElementById('olcumAraligi');
                if (tip.includes('pressure')) {
                    olcumSelect.innerHTML = `
                        <option value="">Seçin</option>
                        <option value="63mm">Ø63mm (0-10 bar)</option>
                        <option value="100mm">Ø100mm (0-16 bar)</option>
                        <option value="160mm">Ø160mm (0-25 bar)</option>
                        <option value="250mm">Ø250mm (0-40 bar)</option>
                    `;
                } else {
                    olcumSelect.innerHTML = `
                        <option value="">Seçin</option>
                        <option value="63mm">Ø63mm (0-120°C)</option>
                        <option value="100mm">Ø100mm (0-200°C)</option>
                        <option value="160mm">Ø160mm (0-400°C)</option>
                        <option value="250mm">Ø250mm (0-600°C)</option>
                    `;
                }
            } else {
                document.getElementById('rangeGroup').style.display = 'none';
            }
            
            // Görüş uzunluğu
            if (tip.includes('level_gauge')) {
                document.getElementById('ozelAlanRow').style.display = 'flex';
                document.getElementById('lengthGroup').style.display = 'block';
                
                const gorusSelect = document.getElementById('gorusBoyutu');
                gorusSelect.innerHTML = `
                    <option value="">Seçin</option>
                    <option value="300mm">300 mm</option>
                    <option value="500mm">500 mm</option>
                    <option value="750mm">750 mm</option>
                    <option value="1000mm">1000 mm</option>
                    <option value="1250mm">1250 mm</option>
                    <option value="1500mm">1500 mm</option>
                `;
            } else {
                document.getElementById('lengthGroup').style.display = 'none';
            }
        };
        
        window.ApplicationController.updateEkipmanInfo = function() {
            const MaterialClass = window.MaterialRegistry.get('borulamaEkipmanlari');
            const instance = new MaterialClass();
            
            // Form verilerini topla
            const formData = window.ApplicationController.collectFormData();
            
            // Hesaplama yap
            const result = instance.calculate(formData);
            
            if (result && result.birimAgirlik > 0) {
                document.getElementById('infoRow').style.display = 'block';
                document.getElementById('ekipmanWeightInfo').textContent = 
                    `${instance.getText('weight_info')}: ${result.birimAgirlik.toFixed(2)} kg`;
                document.getElementById('ekipmanStandardInfo').textContent = 
                    `${instance.getText('standard_info')}: ${instance.standards[formData.ekipmanKategori] || '-'}`;
            } else {
                document.getElementById('infoRow').style.display = 'none';
            }
        };
    }

    // Malzemeyi kaydet
    const borulamaEkipmanlari = new BorulamaEkipmanlariMaterial();
    borulamaEkipmanlari.register();

})(window);