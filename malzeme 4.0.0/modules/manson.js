/**
 * MANŞON (COUPLING) Malzeme Modülü
 * Versiyon: 1.0.0
 * ASME B16.11 ve MSS SP-97 standartları ile coupling hesaplama modülü
 * 
 * Özellikler:
 * - Full Coupling (Tam Manşon)
 * - Half Coupling (Yarım Manşon)
 * - Reducing Coupling (Redüksiyon Manşon)
 * - Socket Weld (SW) ve Threaded (THD) bağlantılar
 * - Class 2000, 3000, 6000, 9000 basınç sınıfları
 * - 1/8" - 4" NPS boyut aralığı
 * - NPT, BSP, BSPT dişli standartları
 */

(function(window) {
    'use strict';
    
    class CouplingMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'coupling';
            this.version = '1.0.0';
            
            this.texts = {
                tr: {
                    display_name: 'Manşon (Coupling)',
                    
                    // Etiketler
                    standart_label: 'Standart',
                    coupling_tipi_label: 'Manşon Tipi',
                    baglanti_sekli_label: 'Bağlantı Şekli',
                    nps_label: 'NPS Boyutu',
                    nps2_label: 'NPS Boyutu 2 (Reducing için)',
                    class_label: 'Class Rating (Basınç Sınıfı)',
                    thread_type_label: 'Diş Tipi',
                    
                    // Standartlar
                    asme_b1611: 'ASME B16.11 (Forged Fittings)',
                    mss_sp97: 'MSS SP-97 (Integrally Reinforced Forged)',
                    
                    // Coupling Tipleri
                    full_coupling: 'Full Coupling (Tam Manşon)',
                    half_coupling: 'Half Coupling (Yarım Manşon)',
                    reducing_coupling: 'Reducing Coupling (Redüksiyon)',
                    
                    // Tabloda gösterilecek isimler
                    full_coupling_display: 'Tam Manşon',
                    half_coupling_display: 'Yarım Manşon',
                    reducing_coupling_display: 'Redüksiyon Manşon',
                    
                    // Bağlantı Şekilleri
                    socket_weld: 'Socket Weld (SW - Soket Kaynak)',
                    threaded: 'Threaded (THD - Dişli)',
                    
                    // Thread Tipleri
                    npt: 'NPT (American National Taper)',
                    bsp: 'BSP (British Standard Pipe)',
                    bspt: 'BSPT (British Standard Taper)',
                    bspp: 'BSPP (British Standard Parallel)',
                    
                    // Class Ratings
                    class_2000: 'Class 2000 (2000 PSI)',
                    class_3000: 'Class 3000 (3000 PSI)',
                    class_6000: 'Class 6000 (6000 PSI)',
                    class_9000: 'Class 9000 (9000 PSI)',
                    
                    // Malzeme Grupları
                    group_carbon: 'Karbon Çelikler',
                    group_alloy_crmo: 'Alaşımlı Çelikler (Cr-Mo)',
                    group_stainless: 'Paslanmaz Çelikler',
                    group_duplex: 'Duplex Çelikler',
                    group_high_yield: 'Yüksek Mukavemetli Çelikler',
                    
                    // Validasyon
                    validation_error: 'Lütfen tüm alanları doldurun',
                    validation_reducing_error: 'Reducing coupling için NPS2 seçmelisiniz',
                    validation_nps2_bigger: 'NPS2, NPS1\'den küçük olmalıdır',
                    validation_class_error: 'Bu bağlantı şekli için seçilen class uygun değil',
                    validation_thread_error: 'Lütfen diş tipi seçin'
                },
                en: {
                    display_name: 'Coupling',
                    
                    // Labels
                    standart_label: 'Standard',
                    coupling_tipi_label: 'Coupling Type',
                    baglanti_sekli_label: 'Connection Type',
                    nps_label: 'NPS Size',
                    nps2_label: 'NPS Size 2 (For Reducing)',
                    class_label: 'Class Rating (Pressure Class)',
                    thread_type_label: 'Thread Type',
                    
                    // Standards
                    asme_b1611: 'ASME B16.11 (Forged Fittings)',
                    mss_sp97: 'MSS SP-97 (Integrally Reinforced Forged)',
                    
                    // Coupling Types
                    full_coupling: 'Full Coupling',
                    half_coupling: 'Half Coupling',
                    reducing_coupling: 'Reducing Coupling',
                    
                    // Display names for table
                    full_coupling_display: 'Full Coupling',
                    half_coupling_display: 'Half Coupling',
                    reducing_coupling_display: 'Reducing Coupling',
                    
                    // Connection Types
                    socket_weld: 'Socket Weld (SW)',
                    threaded: 'Threaded (THD)',
                    
                    // Thread Types
                    npt: 'NPT (American National Taper)',
                    bsp: 'BSP (British Standard Pipe)',
                    bspt: 'BSPT (British Standard Taper)',
                    bspp: 'BSPP (British Standard Parallel)',
                    
                    // Class Ratings
                    class_2000: 'Class 2000 (2000 PSI)',
                    class_3000: 'Class 3000 (3000 PSI)',
                    class_6000: 'Class 6000 (6000 PSI)',
                    class_9000: 'Class 9000 (9000 PSI)',
                    
                    // Material Groups
                    group_carbon: 'Carbon Steels',
                    group_alloy_crmo: 'Alloy Steels (Cr-Mo)',
                    group_stainless: 'Stainless Steels',
                    group_duplex: 'Duplex Steels',
                    group_high_yield: 'High Yield Steels',
                    
                    // Validation
                    validation_error: 'Please fill all fields',
                    validation_reducing_error: 'NPS2 is required for reducing coupling',
                    validation_nps2_bigger: 'NPS2 must be smaller than NPS1',
                    validation_class_error: 'Selected class is not suitable for this connection type',
                    validation_thread_error: 'Please select thread type'
                }
            };
            
            // NPS boyutları ve dış çaplar (mm)
            this.npsData = {
                '1/8': { od: 10.3, id: 6.9 },
                '1/4': { od: 13.7, id: 9.2 },
                '3/8': { od: 17.1, id: 12.5 },
                '1/2': { od: 21.3, id: 15.8 },
                '3/4': { od: 26.7, id: 20.9 },
                '1': { od: 33.4, id: 26.6 },
                '1-1/4': { od: 42.2, id: 35.0 },
                '1-1/2': { od: 48.3, id: 40.9 },
                '2': { od: 60.3, id: 52.5 },
                '2-1/2': { od: 73.0, id: 62.7 },
                '3': { od: 88.9, id: 77.9 },
                '4': { od: 114.3, id: 102.3 }
            };
            
            // Class bazlı uzunluk çarpanları (Base length için)
            this.classLengthFactors = {
                'full_coupling': {
                    '2000': 1.0,
                    '3000': 1.2,
                    '6000': 1.4,
                    '9000': 1.6
                },
                'half_coupling': {
                    '2000': 0.6,
                    '3000': 0.7,
                    '6000': 0.8,
                    '9000': 0.9
                },
                'reducing_coupling': {
                    '2000': 1.1,
                    '3000': 1.3,
                    '6000': 1.5,
                    '9000': 1.7
                }
            };
            
            // ASME B16.11 Malzemeleri
            this.asmeB1611Materials = {
                'A105': { density: 7850, standard: 'ASME B16.11 / ASTM A105', group: 'carbon' },
                'A350 LF2': { density: 7850, standard: 'ASME B16.11 / ASTM A350 LF2', group: 'carbon' },
                'A350 LF3': { density: 7850, standard: 'ASME B16.11 / ASTM A350 LF3', group: 'carbon' },
                'A182 F1': { density: 7850, standard: 'ASME B16.11 / ASTM A182 F1', group: 'alloy_crmo' },
                'A182 F5': { density: 7850, standard: 'ASME B16.11 / ASTM A182 F5', group: 'alloy_crmo' },
                'A182 F9': { density: 7850, standard: 'ASME B16.11 / ASTM A182 F9', group: 'alloy_crmo' },
                'A182 F11': { density: 7850, standard: 'ASME B16.11 / ASTM A182 F11', group: 'alloy_crmo' },
                'A182 F22': { density: 7850, standard: 'ASME B16.11 / ASTM A182 F22', group: 'alloy_crmo' },
                'A182 F91': { density: 7850, standard: 'ASME B16.11 / ASTM A182 F91', group: 'alloy_crmo' },
                'A182 F304': { density: 7900, standard: 'ASME B16.11 / ASTM A182 F304', group: 'stainless' },
                'A182 F304L': { density: 7900, standard: 'ASME B16.11 / ASTM A182 F304L', group: 'stainless' },
                'A182 F316': { density: 7980, standard: 'ASME B16.11 / ASTM A182 F316', group: 'stainless' },
                'A182 F316L': { density: 7980, standard: 'ASME B16.11 / ASTM A182 F316L', group: 'stainless' },
                'A182 F321': { density: 7900, standard: 'ASME B16.11 / ASTM A182 F321', group: 'stainless' },
                'A182 F347': { density: 7900, standard: 'ASME B16.11 / ASTM A182 F347', group: 'stainless' },
                'A182 F904L': { density: 8000, standard: 'ASME B16.11 / ASTM A182 F904L', group: 'stainless' }
            };
            
            // MSS SP-97 Malzemeleri
            this.mssSp97Materials = {
                'A105': { density: 7850, standard: 'MSS SP-97 / ASTM A105', group: 'carbon' },
                'A350 LF2': { density: 7850, standard: 'MSS SP-97 / ASTM A350 LF2', group: 'carbon' },
                'A182 F1': { density: 7850, standard: 'MSS SP-97 / ASTM A182 F1', group: 'alloy_crmo' },
                'A182 F5': { density: 7850, standard: 'MSS SP-97 / ASTM A182 F5', group: 'alloy_crmo' },
                'A182 F11': { density: 7850, standard: 'MSS SP-97 / ASTM A182 F11', group: 'alloy_crmo' },
                'A182 F22': { density: 7850, standard: 'MSS SP-97 / ASTM A182 F22', group: 'alloy_crmo' },
                'A182 F91': { density: 7850, standard: 'MSS SP-97 / ASTM A182 F91', group: 'alloy_crmo' },
                'A182 F304': { density: 7900, standard: 'MSS SP-97 / ASTM A182 F304', group: 'stainless' },
                'A182 F304L': { density: 7900, standard: 'MSS SP-97 / ASTM A182 F304L', group: 'stainless' },
                'A182 F316': { density: 7980, standard: 'MSS SP-97 / ASTM A182 F316', group: 'stainless' },
                'A182 F316L': { density: 7980, standard: 'MSS SP-97 / ASTM A182 F316L', group: 'stainless' },
                'A182 F321': { density: 7900, standard: 'MSS SP-97 / ASTM A182 F321', group: 'stainless' },
                'A182 F51': { density: 7800, standard: 'MSS SP-97 / ASTM A182 F51', group: 'duplex' },
                'A182 F53': { density: 7800, standard: 'MSS SP-97 / ASTM A182 F53', group: 'duplex' },
                'A182 F55': { density: 7800, standard: 'MSS SP-97 / ASTM A182 F55', group: 'duplex' },
                'A694 F42': { density: 7850, standard: 'MSS SP-97 / ASTM A694 F42', group: 'high_yield' },
                'A694 F52': { density: 7850, standard: 'MSS SP-97 / ASTM A694 F52', group: 'high_yield' },
                'A694 F60': { density: 7850, standard: 'MSS SP-97 / ASTM A694 F60', group: 'high_yield' },
                'A694 F65': { density: 7850, standard: 'MSS SP-97 / ASTM A694 F65', group: 'high_yield' },
                'A694 F70': { density: 7850, standard: 'MSS SP-97 / ASTM A694 F70', group: 'high_yield' }
            };
            
            this.setupEventHandlers();
        }

        setupEventHandlers() {
            const self = this;
            
            window.CouplingHandlers = {
                onStandartChange: function() {
                    self.updateMaterialGrades();
                    self.updateConnectionTypes();
                    self.updateClassRatings();
                },
                
                onCouplingTipiChange: function() {
                    self.updateNPS2Visibility();
                    self.updateClassRatings();
                },
                
                onBaglantiSekliChange: function() {
                    self.updateThreadTypeVisibility();
                    self.updateClassRatings();
                },
                
                onNPS1Change: function() {
                    self.updateNPS2Options();
                }
            };
        }

        updateConnectionTypes() {
            const standart = document.getElementById('coupling_standart')?.value;
            const baglantiSelect = document.getElementById('coupling_baglanti_sekli');
            if (!baglantiSelect) return;
            
            const lang = this.getCurrentLanguage();
            baglantiSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>`;
            
            const options = [
                { value: 'socket_weld', text: this.getText('socket_weld') },
                { value: 'threaded', text: this.getText('threaded') }
            ];
            
            options.forEach(opt => {
                const option = document.createElement('option');
                option.value = opt.value;
                option.textContent = opt.text;
                baglantiSelect.appendChild(option);
            });
        }

        updateClassRatings() {
            const baglantiSekli = document.getElementById('coupling_baglanti_sekli')?.value;
            const classSelect = document.getElementById('coupling_class');
            if (!classSelect) return;
            
            const lang = this.getCurrentLanguage();
            classSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Class seçin...' : 'Select class...'}</option>`;
            
            let availableClasses = [];
            
            if (baglantiSekli === 'socket_weld') {
                // Socket Weld: Class 3000, 6000, 9000
                availableClasses = ['3000', '6000', '9000'];
            } else if (baglantiSekli === 'threaded') {
                // Threaded: Class 2000, 3000, 6000
                availableClasses = ['2000', '3000', '6000'];
            }
            
            availableClasses.forEach(cls => {
                const option = document.createElement('option');
                option.value = cls;
                option.textContent = this.getText(`class_${cls}`);
                classSelect.appendChild(option);
            });
        }

        updateThreadTypeVisibility() {
            const baglantiSekli = document.getElementById('coupling_baglanti_sekli')?.value;
            const threadTypeGroup = document.getElementById('thread_type_group');
            
            if (!threadTypeGroup) return;
            
            if (baglantiSekli === 'threaded') {
                threadTypeGroup.style.display = 'block';
            } else {
                threadTypeGroup.style.display = 'none';
                const threadTypeSelect = document.getElementById('coupling_thread_type');
                if (threadTypeSelect) threadTypeSelect.value = '';
            }
        }

        updateNPS2Visibility() {
            const couplingTipi = document.getElementById('coupling_tipi')?.value;
            const nps2Group = document.getElementById('nps2_group');
            
            if (!nps2Group) return;
            
            if (couplingTipi === 'reducing_coupling') {
                nps2Group.style.display = 'block';
            } else {
                nps2Group.style.display = 'none';
                const nps2Select = document.getElementById('coupling_nps2');
                if (nps2Select) nps2Select.value = '';
            }
        }

        updateNPS2Options() {
            const nps1 = document.getElementById('coupling_nps1')?.value;
            const nps2Select = document.getElementById('coupling_nps2');
            if (!nps2Select || !nps1) return;
            
            const lang = this.getCurrentLanguage();
            nps2Select.innerHTML = `<option value="">${lang === 'tr' ? 'NPS2 seçin...' : 'Select NPS2...'}</option>`;
            
            const nps1OD = this.npsData[nps1].od;
            
            Object.keys(this.npsData).forEach(nps => {
                const npsOD = this.npsData[nps].od;
                if (npsOD < nps1OD) {
                    const option = document.createElement('option');
                    option.value = nps;
                    option.textContent = `NPS ${nps}" (Ø${npsOD}mm)`;
                    nps2Select.appendChild(option);
                }
            });
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="coupling_standart">${this.getText('standart_label')}</label>
                        <select id="coupling_standart" onchange="window.CouplingHandlers.onStandartChange()">
                            <option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
                            <option value="asme_b1611">${this.getText('asme_b1611')}</option>
                            <option value="mss_sp97">${this.getText('mss_sp97')}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="coupling_tipi">${this.getText('coupling_tipi_label')}</label>
                        <select id="coupling_tipi" onchange="window.CouplingHandlers.onCouplingTipiChange()">
                            <option value="">${lang === 'tr' ? 'Tip seçin...' : 'Select type...'}</option>
                            <option value="full_coupling">${this.getText('full_coupling')}</option>
                            <option value="half_coupling">${this.getText('half_coupling')}</option>
                            <option value="reducing_coupling">${this.getText('reducing_coupling')}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="coupling_baglanti_sekli">${this.getText('baglanti_sekli_label')}</label>
                        <select id="coupling_baglanti_sekli" onchange="window.CouplingHandlers.onBaglantiSekliChange()">
                            <option value="">${lang === 'tr' ? 'Önce standart seçin' : 'Select standard first'}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="coupling_class">${this.getText('class_label')}</label>
                        <select id="coupling_class">
                            <option value="">${lang === 'tr' ? 'Önce bağlantı şekli seçin' : 'Select connection type first'}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row" id="thread_type_group" style="display: none;">
                    <div class="form-group full-width">
                        <label for="coupling_thread_type">${this.getText('thread_type_label')}</label>
                        <select id="coupling_thread_type">
                            <option value="">${lang === 'tr' ? 'Diş tipi seçin...' : 'Select thread type...'}</option>
                            <option value="npt">${this.getText('npt')}</option>
                            <option value="bsp">${this.getText('bsp')}</option>
                            <option value="bspt">${this.getText('bspt')}</option>
                            <option value="bspp">${this.getText('bspp')}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="coupling_nps1">${this.getText('nps_label')}</label>
                        <select id="coupling_nps1" onchange="window.CouplingHandlers.onNPS1Change()">
                            <option value="">${lang === 'tr' ? 'NPS seçin...' : 'Select NPS...'}</option>
                            ${Object.keys(this.npsData).map(nps => {
                                const od = this.npsData[nps].od;
                                return `<option value="${nps}">NPS ${nps}" (Ø${od}mm)</option>`;
                            }).join('')}
                        </select>
                    </div>
                    <div class="form-group" id="nps2_group" style="display: none;">
                        <label for="coupling_nps2">${this.getText('nps2_label')}</label>
                        <select id="coupling_nps2">
                            <option value="">${lang === 'tr' ? 'Önce NPS1 seçin' : 'Select NPS1 first'}</option>
                        </select>
                    </div>
                </div>
            `;
        }

        getGrades() {
            const standart = document.getElementById('coupling_standart')?.value;
            
            if (standart === 'asme_b1611') {
                return this.getGroupedGrades(this.asmeB1611Materials);
            } else if (standart === 'mss_sp97') {
                return this.getGroupedGrades(this.mssSp97Materials);
            }
            
            return [];
        }

        getGroupedGrades(materials) {
            const organizedGrades = [];
            
            const groups = {
                'carbon': this.getText('group_carbon'),
                'alloy_crmo': this.getText('group_alloy_crmo'),
                'stainless': this.getText('group_stainless'),
                'duplex': this.getText('group_duplex'),
                'high_yield': this.getText('group_high_yield')
            };
            
            Object.entries(groups).forEach(([groupKey, groupName]) => {
                const groupMaterials = Object.keys(materials).filter(mat => materials[mat].group === groupKey);
                
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

        updateMaterialGrades() {
            const malzemeCinsiSelect = document.getElementById('malzemeCinsi');
            if (!malzemeCinsiSelect) return;
            
            malzemeCinsiSelect.innerHTML = '';
            
            const grades = this.getGrades();
            
            if (Array.isArray(grades) && grades.length > 0) {
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
            }
        }

        getDensity(grade, standart) {
            if (standart === 'asme_b1611' && this.asmeB1611Materials[grade]) {
                return this.asmeB1611Materials[grade].density;
            } else if (standart === 'mss_sp97' && this.mssSp97Materials[grade]) {
                return this.mssSp97Materials[grade].density;
            }
            return 7850;
        }

        getStandard(grade, standart) {
            if (standart === 'asme_b1611' && this.asmeB1611Materials[grade]) {
                return this.asmeB1611Materials[grade].standard;
            } else if (standart === 'mss_sp97' && this.mssSp97Materials[grade]) {
                return this.mssSp97Materials[grade].standard;
            }
            return '-';
        }

        calculate(formData) {
            const standart = formData.coupling_standart;
            const couplingTipi = formData.coupling_tipi;
            const baglantiSekli = formData.coupling_baglanti_sekli;
            const classRating = formData.coupling_class;
            const nps1 = formData.coupling_nps1;
            const nps2 = formData.coupling_nps2;
            const malzemeCinsi = formData.malzemeCinsi;
            const adet = parseFloat(formData.adet) || 1;
            
            if (!standart || !couplingTipi || !baglantiSekli || !classRating || !nps1 || !malzemeCinsi) {
                return null;
            }
            
            // Reducing coupling için NPS2 kontrolü
            if (couplingTipi === 'reducing_coupling' && !nps2) {
                return null;
            }
            
            // Yoğunluk
            const density = this.getDensity(malzemeCinsi, standart);
            
            // Boyut bilgilerini al
            const nps1Data = this.npsData[nps1];
            let nps2Data = null;
            
            if (couplingTipi === 'reducing_coupling') {
                nps2Data = this.npsData[nps2];
            }
            
            // Coupling boyutlarını hesapla
            const dimensions = this.calculateCouplingDimensions(
                couplingTipi, 
                classRating, 
                nps1Data, 
                nps2Data
            );
            
            // Hacim hesaplama
            const volume = this.calculateVolume(
                dimensions.outerDiameter,
                dimensions.innerDiameter,
                dimensions.length
            );
            
            // mm³ -> m³
            const volumeM3 = volume / 1000000000;
            
            // Ağırlık hesaplama
            const birimAgirlik = volumeM3 * density;
            const toplamAgirlik = birimAgirlik * adet;
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                suHacmi: null
            };
        }

        calculateCouplingDimensions(couplingTipi, classRating, nps1Data, nps2Data) {
            // Base NPS için dış çap hesaplama
            const baseOD = nps1Data.od;
            
            // Class'a göre et kalınlığı artışı
            let wallThicknessFactor = 1.0;
            switch(classRating) {
                case '2000': wallThicknessFactor = 1.2; break;
                case '3000': wallThicknessFactor = 1.4; break;
                case '6000': wallThicknessFactor = 1.6; break;
                case '9000': wallThicknessFactor = 1.8; break;
            }
            
            // Coupling dış çapı = Boru dış çapı + (2 × et kalınlığı artışı)
            const wallIncrease = baseOD * 0.25 * wallThicknessFactor; // %25 baz artış
            const outerDiameter = baseOD + (2 * wallIncrease);
            
            // İç çap hesaplama
            let innerDiameter;
            if (couplingTipi === 'reducing_coupling' && nps2Data) {
                // Reducing için ortalama iç çap
                innerDiameter = (nps1Data.id + nps2Data.id) / 2;
            } else {
                innerDiameter = nps1Data.id;
            }
            
            // Uzunluk hesaplama
            const baseLengthFactor = this.classLengthFactors[couplingTipi][classRating];
            const baseLength = baseOD * 2; // Boru dış çapının 2 katı baz uzunluk
            const length = baseLength * baseLengthFactor;
            
            return {
                outerDiameter: outerDiameter,
                innerDiameter: innerDiameter,
                length: length
            };
        }

        calculateVolume(outerDiameter, innerDiameter, length) {
            // Hollow cylinder volume: π × (R_outer² - R_inner²) × L
            const outerRadius = outerDiameter / 2;
            const innerRadius = innerDiameter / 2;
            
            const volume = Math.PI * (
                (outerRadius * outerRadius) - (innerRadius * innerRadius)
            ) * length;
            
            return volume; // mm³
        }

        validate(formData) {
            const standart = formData.coupling_standart;
            const couplingTipi = formData.coupling_tipi;
            const baglantiSekli = formData.coupling_baglanti_sekli;
            const classRating = formData.coupling_class;
            const nps1 = formData.coupling_nps1;
            const nps2 = formData.coupling_nps2;
            const threadType = formData.coupling_thread_type;
            
            // Temel alanlar
            if (!standart || !couplingTipi || !baglantiSekli || !classRating || !nps1) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            // Reducing coupling için NPS2 kontrolü
            if (couplingTipi === 'reducing_coupling') {
                if (!nps2) {
                    return {
                        isValid: false,
                        message: this.getText('validation_reducing_error')
                    };
                }
                
                // NPS2, NPS1'den küçük olmalı
                const nps1OD = this.npsData[nps1].od;
                const nps2OD = this.npsData[nps2].od;
                
                if (nps2OD >= nps1OD) {
                    return {
                        isValid: false,
                        message: this.getText('validation_nps2_bigger')
                    };
                }
            }
            
            // Class uygunluğu kontrolü
            if (baglantiSekli === 'socket_weld' && classRating === '2000') {
                return {
                    isValid: false,
                    message: this.getText('validation_class_error')
                };
            }
            
            if (baglantiSekli === 'threaded' && classRating === '9000') {
                return {
                    isValid: false,
                    message: this.getText('validation_class_error')
                };
            }
            
            // Threaded için thread type kontrolü
            if (baglantiSekli === 'threaded' && !threadType) {
                return {
                    isValid: false,
                    message: this.getText('validation_thread_error')
                };
            }
            
            return { isValid: true };
        }

        formatDimensions(formData) {
            const couplingTipi = formData.coupling_tipi;
            const nps1 = formData.coupling_nps1;
            const nps2 = formData.coupling_nps2;
            const classRating = formData.coupling_class;
            const baglantiSekli = formData.coupling_baglanti_sekli;
            const threadType = formData.coupling_thread_type;
            
            if (!nps1 || !classRating) {
                return '-';
            }
            
            let dimensionStr = '';
            
            // Bağlantı şekli kısaltması
            let connAbbr = '';
            if (baglantiSekli === 'socket_weld') {
                connAbbr = 'SW';
            } else if (baglantiSekli === 'threaded') {
                connAbbr = threadType ? threadType.toUpperCase() : 'THD';
            }
            
            // NPS boyutu - Coupling tipi kısaltması olmadan
            if (couplingTipi === 'reducing_coupling' && nps2) {
                dimensionStr = `${nps1}"x${nps2}", ${connAbbr}, Class ${classRating}`;
            } else {
                dimensionStr = `${nps1}", ${connAbbr}, Class ${classRating}`;
            }
            
            return dimensionStr;
        }

        hasWaterVolume() {
            return false;
        }

        getDisplayName() {
            return this.getText('display_name');
        }

        getDisplayTypeFromRow(rowData) {
            const metadata = rowData.metadata?.coupling;
            if (!metadata) {
                return this.getDisplayName();
            }
            
            // Coupling tipine göre isim döndür
            let displayName = this.getDisplayName();
            
            if (metadata.coupling_tipi === 'full_coupling') {
                displayName = 'Full Coupling';
            } else if (metadata.coupling_tipi === 'half_coupling') {
                displayName = 'Half Coupling';
            } else if (metadata.coupling_tipi === 'reducing_coupling') {
                displayName = 'Reducing Coupling';
            }
            
            return displayName;
        }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            const standart = formData.coupling_standart;
            const couplingTipi = formData.coupling_tipi;
            
            // Malzeme türünü dile göre özelleştir
            if (couplingTipi === 'full_coupling') {
                baseRow.malzemeTuru = this.getText('full_coupling_display');
            } else if (couplingTipi === 'half_coupling') {
                baseRow.malzemeTuru = this.getText('half_coupling_display');
            } else if (couplingTipi === 'reducing_coupling') {
                baseRow.malzemeTuru = this.getText('reducing_coupling_display');
            }
            
            baseRow.enNormu = this.getStandard(formData.malzemeCinsi, standart);
            
            baseRow.metadata = {
                ...baseRow.metadata,
                coupling: {
                    standart: formData.coupling_standart,
                    coupling_tipi: formData.coupling_tipi,
                    baglanti_sekli: formData.coupling_baglanti_sekli,
                    class: formData.coupling_class,
                    nps1: formData.coupling_nps1,
                    nps2: formData.coupling_nps2,
                    thread_type: formData.coupling_thread_type
                }
            };
            
            return baseRow;
        }

        fillFormFromRow(rowData) {
            super.fillFormFromRow(rowData);
            
            const metadata = rowData.metadata?.coupling;
            if (!metadata) {
                if (rowData.formData) {
                    this.fillFromFormData(rowData.formData);
                }
                return true;
            }
            
            setTimeout(() => {
                if (metadata.standart) {
                    document.getElementById('coupling_standart').value = metadata.standart;
                    window.CouplingHandlers.onStandartChange();
                }
                
                setTimeout(() => {
                    if (metadata.coupling_tipi) {
                        document.getElementById('coupling_tipi').value = metadata.coupling_tipi;
                        window.CouplingHandlers.onCouplingTipiChange();
                    }
                    
                    if (metadata.baglanti_sekli) {
                        document.getElementById('coupling_baglanti_sekli').value = metadata.baglanti_sekli;
                        window.CouplingHandlers.onBaglantiSekliChange();
                    }
                    
                    setTimeout(() => {
                        if (metadata.class) {
                            document.getElementById('coupling_class').value = metadata.class;
                        }
                        if (metadata.nps1) {
                            document.getElementById('coupling_nps1').value = metadata.nps1;
                            window.CouplingHandlers.onNPS1Change();
                        }
                        
                        setTimeout(() => {
                            if (metadata.nps2) {
                                document.getElementById('coupling_nps2').value = metadata.nps2;
                            }
                            if (metadata.thread_type) {
                                document.getElementById('coupling_thread_type').value = metadata.thread_type;
                            }
                        }, 100);
                    }, 100);
                }, 150);
            }, 100);
            
            return true;
        }

        fillFromFormData(formData) {
            setTimeout(() => {
                Object.keys(formData).forEach(key => {
                    const element = document.getElementById(key);
                    if (element) {
                        element.value = formData[key];
                        
                        if (key === 'coupling_standart') {
                            window.CouplingHandlers.onStandartChange();
                        } else if (key === 'coupling_tipi') {
                            window.CouplingHandlers.onCouplingTipiChange();
                        } else if (key === 'coupling_baglanti_sekli') {
                            window.CouplingHandlers.onBaglantiSekliChange();
                        } else if (key === 'coupling_nps1') {
                            window.CouplingHandlers.onNPS1Change();
                        }
                    }
                });
            }, 100);
        }
    }

    const couplingMaterial = new CouplingMaterial();
    couplingMaterial.register();
    
    console.log('Manşon (Coupling) modülü v1.0.0 yüklendi');

})(window);