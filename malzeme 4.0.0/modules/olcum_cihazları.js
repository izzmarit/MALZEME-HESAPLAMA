/**
 * ÖLÇÜM CİHAZLARI (Termometre ve Manometre) Malzeme Modülü
 * Versiyon: 1.0.0
 * ASME B40.3, DIN 16179, EN 837 standartları ile ölçüm cihazları hesaplama modülü
 */

(function(window) {
    'use strict';
    
    class MeasurementInstrumentMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'measurement_instrument';
            this.version = '1.0.0';
            
            this.texts = {
                tr: {
                    display_name: 'Ölçüm Cihazları',
                    
                    // Etiketler
                    standart_label: 'Standart',
                    cihaz_tipi_label: 'Cihaz Tipi',
                    gosterge_capi_label: 'Gösterge Çapı',
                    baglanti_tipi_label: 'Bağlantı Tipi',
                    baglanti_boyutu_label: 'Bağlantı Boyutu',
                    daldirma_boyu_label: 'Daldırma Boyu (mm)',
                    govde_malzeme_label: 'Gövde Malzemesi',
                    calisma_araligi_label: 'Çalışma Aralığı',
                    dolgu_tipi_label: 'Dolgu Tipi',
                    
                    // Standartlar
                    asme_b403: 'ASME B40.3 (Dial Type Pressure Gauges)',
                    din_16179: 'DIN 16179 (Bimetal Thermometers)',
                    en_837: 'EN 837 (Pressure Gauges)',
                    
                    // Cihaz Tipleri
                    bourdon_manometre: 'Bourdon Tüp Manometre',
                    dijital_manometre: 'Dijital Manometre',
                    diferansiyel_manometre: 'Diferansiyel Manometre',
                    bimetal_termometre: 'Bimetal Termometre',
                    kapiler_termometre: 'Kapiler Termometre',
                    dijital_termometre: 'Dijital Termometre',
                    
                    // Tabloda gösterilecek
                    bourdon_manometre_display: 'Bourdon Manometre',
                    dijital_manometre_display: 'Dijital Manometre',
                    diferansiyel_manometre_display: 'Diferansiyel Manometre',
                    bimetal_termometre_display: 'Bimetal Termometre',
                    kapiler_termometre_display: 'Kapiler Termometre',
                    dijital_termometre_display: 'Dijital Termometre',
                    
                    // Gösterge Çapları (mm)
                    dial_50: '50mm (2")',
                    dial_63: '63mm (2.5")',
                    dial_80: '80mm (3")',
                    dial_100: '100mm (4")',
                    dial_150: '150mm (6")',
                    dial_160: '160mm (6.3")',
                    dial_200: '200mm (8")',
                    dial_250: '250mm (10")',
                    
                    // Bağlantı Tipleri
                    alt_baglanti: 'Alt Bağlantı (Bottom Mount)',
                    arka_baglanti: 'Arka Bağlantı (Back Mount)',
                    panel_baglanti: 'Panel Bağlantısı (Panel Mount)',
                    
                    // Bağlantı Boyutları
                    conn_1_8: '1/8" NPT',
                    conn_1_4: '1/4" NPT',
                    conn_3_8: '3/8" NPT',
                    conn_1_2: '1/2" NPT',
                    conn_g1_4: 'G1/4"',
                    conn_g1_2: 'G1/2"',
                    conn_m10: 'M10x1',
                    conn_m12: 'M12x1.5',
                    conn_m14: 'M14x1.5',
                    conn_m20: 'M20x1.5',
                    
                    // Gövde Malzemeleri
                    govde_celik: 'Karbon Çelik',
                    govde_paslanmaz: 'Paslanmaz Çelik 304',
                    govde_paslanmaz_316: 'Paslanmaz Çelik 316',
                    govde_pirinc: 'Pirinç',
                    govde_bronz: 'Bronz',
                    govde_monel: 'Monel',
                    
                    // Çalışma Aralıkları - Basınç
                    range_0_1: '0-1 bar',
                    range_0_2_5: '0-2.5 bar',
                    range_0_4: '0-4 bar',
                    range_0_6: '0-6 bar',
                    range_0_10: '0-10 bar',
                    range_0_16: '0-16 bar',
                    range_0_25: '0-25 bar',
                    range_0_40: '0-40 bar',
                    range_0_60: '0-60 bar',
                    range_0_100: '0-100 bar',
                    range_0_160: '0-160 bar',
                    range_0_250: '0-250 bar',
                    range_0_400: '0-400 bar',
                    range_0_600: '0-600 bar',
                    
                    // Çalışma Aralıkları - Sıcaklık
                    temp_0_60: '0°C ila +60°C',
                    temp_0_100: '0°C ila +100°C',
                    temp_0_120: '0°C ila +120°C',
                    temp_0_160: '0°C ila +160°C',
                    temp_0_200: '0°C ila +200°C',
                    temp_0_250: '0°C ila +250°C',
                    temp_0_300: '0°C ila +300°C',
                    temp_0_400: '0°C ila +400°C',
                    temp_0_500: '0°C ila +500°C',
                    temp_0_600: '0°C ila +600°C',
                    temp_m40_60: '-40°C ila +60°C',
                    temp_m40_160: '-40°C ila +160°C',
                    
                    // Dolgu Tipleri
                    dolgu_yok: 'Dolgusuz (Dry)',
                    dolgu_gliserin: 'Gliserin Dolgulu',
                    dolgu_silikon: 'Silikon Dolgulu',
                    
                    // Malzeme Grupları
                    group_pressure: 'Basınç Ölçüm',
                    group_temperature: 'Sıcaklık Ölçüm',
                    group_combined: 'Kombine Ölçüm',
                    
                    // Validasyon
                    validation_error: 'Lütfen tüm alanları doldurun',
                    validation_daldirma_error: 'Daldırma boyu 0\'dan büyük olmalıdır'
                },
                en: {
                    display_name: 'Measurement Instruments',
                    
                    // Labels
                    standart_label: 'Standard',
                    cihaz_tipi_label: 'Instrument Type',
                    gosterge_capi_label: 'Dial Diameter',
                    baglanti_tipi_label: 'Connection Type',
                    baglanti_boyutu_label: 'Connection Size',
                    daldirma_boyu_label: 'Immersion Length (mm)',
                    govde_malzeme_label: 'Body Material',
                    calisma_araligi_label: 'Operating Range',
                    dolgu_tipi_label: 'Fill Type',
                    
                    // Standards
                    asme_b403: 'ASME B40.3 (Dial Type Pressure Gauges)',
                    din_16179: 'DIN 16179 (Bimetal Thermometers)',
                    en_837: 'EN 837 (Pressure Gauges)',
                    
                    // Instrument Types
                    bourdon_manometre: 'Bourdon Tube Pressure Gauge',
                    dijital_manometre: 'Digital Pressure Gauge',
                    diferansiyel_manometre: 'Differential Pressure Gauge',
                    bimetal_termometre: 'Bimetal Thermometer',
                    kapiler_termometre: 'Capillary Thermometer',
                    dijital_termometre: 'Digital Thermometer',
                    
                    // Display names
                    bourdon_manometre_display: 'Bourdon Pressure Gauge',
                    dijital_manometre_display: 'Digital Pressure Gauge',
                    diferansiyel_manometre_display: 'Differential Pressure Gauge',
                    bimetal_termometre_display: 'Bimetal Thermometer',
                    kapiler_termometre_display: 'Capillary Thermometer',
                    dijital_termometre_display: 'Digital Thermometer',
                    
                    // Dial Diameters
                    dial_50: '50mm (2")',
                    dial_63: '63mm (2.5")',
                    dial_80: '80mm (3")',
                    dial_100: '100mm (4")',
                    dial_150: '150mm (6")',
                    dial_160: '160mm (6.3")',
                    dial_200: '200mm (8")',
                    dial_250: '250mm (10")',
                    
                    // Connection Types
                    alt_baglanti: 'Bottom Mount',
                    arka_baglanti: 'Back Mount',
                    panel_baglanti: 'Panel Mount',
                    
                    // Connection Sizes
                    conn_1_8: '1/8" NPT',
                    conn_1_4: '1/4" NPT',
                    conn_3_8: '3/8" NPT',
                    conn_1_2: '1/2" NPT',
                    conn_g1_4: 'G1/4"',
                    conn_g1_2: 'G1/2"',
                    conn_m10: 'M10x1',
                    conn_m12: 'M12x1.5',
                    conn_m14: 'M14x1.5',
                    conn_m20: 'M20x1.5',
                    
                    // Body Materials
                    govde_celik: 'Carbon Steel',
                    govde_paslanmaz: 'Stainless Steel 304',
                    govde_paslanmaz_316: 'Stainless Steel 316',
                    govde_pirinc: 'Brass',
                    govde_bronz: 'Bronze',
                    govde_monel: 'Monel',
                    
                    // Operating Ranges - Pressure
                    range_0_1: '0-1 bar',
                    range_0_2_5: '0-2.5 bar',
                    range_0_4: '0-4 bar',
                    range_0_6: '0-6 bar',
                    range_0_10: '0-10 bar',
                    range_0_16: '0-16 bar',
                    range_0_25: '0-25 bar',
                    range_0_40: '0-40 bar',
                    range_0_60: '0-60 bar',
                    range_0_100: '0-100 bar',
                    range_0_160: '0-160 bar',
                    range_0_250: '0-250 bar',
                    range_0_400: '0-400 bar',
                    range_0_600: '0-600 bar',
                    
                    // Operating Ranges - Temperature
                    temp_0_60: '0°C to +60°C',
                    temp_0_100: '0°C to +100°C',
                    temp_0_120: '0°C to +120°C',
                    temp_0_160: '0°C to +160°C',
                    temp_0_200: '0°C to +200°C',
                    temp_0_250: '0°C to +250°C',
                    temp_0_300: '0°C to +300°C',
                    temp_0_400: '0°C to +400°C',
                    temp_0_500: '0°C to +500°C',
                    temp_0_600: '0°C to +600°C',
                    temp_m40_60: '-40°C to +60°C',
                    temp_m40_160: '-40°C to +160°C',
                    
                    // Fill Types
                    dolgu_yok: 'Dry (No Fill)',
                    dolgu_gliserin: 'Glycerin Filled',
                    dolgu_silikon: 'Silicon Filled',
                    
                    // Material Groups
                    group_pressure: 'Pressure Measurement',
                    group_temperature: 'Temperature Measurement',
                    group_combined: 'Combined Measurement',
                    
                    // Validation
                    validation_error: 'Please fill all fields',
                    validation_daldirma_error: 'Immersion length must be greater than 0'
                }
            };
            
            // Gövde malzemesi yoğunlukları
            this.bodyMaterials = {
                'govde_celik': { density: 7850, name: 'Carbon Steel' },
                'govde_paslanmaz': { density: 7900, name: 'Stainless Steel 304' },
                'govde_paslanmaz_316': { density: 7980, name: 'Stainless Steel 316' },
                'govde_pirinc': { density: 8400, name: 'Brass' },
                'govde_bronz': { density: 8800, name: 'Bronze' },
                'govde_monel': { density: 8800, name: 'Monel' }
            };
            
            // Cihaz tipi kategorileri
            this.instrumentCategories = {
                'bourdon_manometre': 'pressure',
                'dijital_manometre': 'pressure',
                'diferansiyel_manometre': 'pressure',
                'bimetal_termometre': 'temperature',
                'kapiler_termometre': 'temperature',
                'dijital_termometre': 'temperature'
            };
            
            this.setupEventHandlers();
        }

        setupEventHandlers() {
            const self = this;
            
            window.MeasurementInstrumentHandlers = {
                onStandartChange: function() {
                    self.updateInstrumentTypes();
                },
                
                onCihazTipiChange: function() {
                    self.updateWorkingRangeOptions();
                    self.updateImmersionFieldVisibility();
                }
            };
        }

        updateInstrumentTypes() {
            const cihazTipiSelect = document.getElementById('mi_cihaz_tipi');
            if (!cihazTipiSelect) return;
            
            const lang = this.getCurrentLanguage();
            cihazTipiSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Cihaz seçin...' : 'Select instrument...'}</option>`;
            
            const types = [
                'bourdon_manometre',
                'dijital_manometre',
                'diferansiyel_manometre',
                'bimetal_termometre',
                'kapiler_termometre',
                'dijital_termometre'
            ];
            
            types.forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = this.getText(type);
                cihazTipiSelect.appendChild(option);
            });
        }

        updateWorkingRangeOptions() {
            const cihazTipi = document.getElementById('mi_cihaz_tipi')?.value;
            const rangeSelect = document.getElementById('mi_calisma_araligi');
            if (!rangeSelect) return;
            
            const lang = this.getCurrentLanguage();
            rangeSelect.innerHTML = `<option value="">${lang === 'tr' ? 'Aralık seçin...' : 'Select range...'}</option>`;
            
            if (!cihazTipi) return;
            
            const category = this.instrumentCategories[cihazTipi];
            
            if (category === 'pressure') {
                const pressureRanges = [
                    '0_1', '0_2_5', '0_4', '0_6', '0_10', '0_16', '0_25', 
                    '0_40', '0_60', '0_100', '0_160', '0_250', '0_400', '0_600'
                ];
                
                pressureRanges.forEach(range => {
                    const option = document.createElement('option');
                    option.value = range;
                    option.textContent = this.getText(`range_${range}`);
                    rangeSelect.appendChild(option);
                });
                
            } else if (category === 'temperature') {
                const tempRanges = [
                    '0_60', '0_100', '0_120', '0_160', '0_200', '0_250',
                    '0_300', '0_400', '0_500', '0_600', 'm40_60', 'm40_160'
                ];
                
                tempRanges.forEach(range => {
                    const option = document.createElement('option');
                    option.value = range;
                    option.textContent = this.getText(`temp_${range}`);
                    rangeSelect.appendChild(option);
                });
            }
        }

        updateImmersionFieldVisibility() {
            const cihazTipi = document.getElementById('mi_cihaz_tipi')?.value;
            const daldirmaField = document.getElementById('daldirma_field');
            
            if (!daldirmaField) return;
            
            const category = this.instrumentCategories[cihazTipi];
            
            if (category === 'temperature') {
                daldirmaField.style.display = 'block';
            } else {
                daldirmaField.style.display = 'none';
            }
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="mi_standart">${this.getText('standart_label')}</label>
                        <select id="mi_standart" onchange="window.MeasurementInstrumentHandlers.onStandartChange()">
                            <option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
                            <option value="asme_b403">${this.getText('asme_b403')}</option>
                            <option value="din_16179">${this.getText('din_16179')}</option>
                            <option value="en_837">${this.getText('en_837')}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="mi_cihaz_tipi">${this.getText('cihaz_tipi_label')}</label>
                        <select id="mi_cihaz_tipi" onchange="window.MeasurementInstrumentHandlers.onCihazTipiChange()">
                            <option value="">${lang === 'tr' ? 'Önce standart seçin' : 'Select standard first'}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="mi_gosterge_capi">${this.getText('gosterge_capi_label')}</label>
                        <select id="mi_gosterge_capi">
                            <option value="">${lang === 'tr' ? 'Çap seçin...' : 'Select diameter...'}</option>
                            <option value="50">${this.getText('dial_50')}</option>
                            <option value="63">${this.getText('dial_63')}</option>
                            <option value="80">${this.getText('dial_80')}</option>
                            <option value="100">${this.getText('dial_100')}</option>
                            <option value="150">${this.getText('dial_150')}</option>
                            <option value="160">${this.getText('dial_160')}</option>
                            <option value="200">${this.getText('dial_200')}</option>
                            <option value="250">${this.getText('dial_250')}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="mi_baglanti_tipi">${this.getText('baglanti_tipi_label')}</label>
                        <select id="mi_baglanti_tipi">
                            <option value="">${lang === 'tr' ? 'Bağlantı seçin...' : 'Select connection...'}</option>
                            <option value="alt_baglanti">${this.getText('alt_baglanti')}</option>
                            <option value="arka_baglanti">${this.getText('arka_baglanti')}</option>
                            <option value="panel_baglanti">${this.getText('panel_baglanti')}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="mi_baglanti_boyutu">${this.getText('baglanti_boyutu_label')}</label>
                        <select id="mi_baglanti_boyutu">
                            <option value="">${lang === 'tr' ? 'Boyut seçin...' : 'Select size...'}</option>
                            <option value="1_8">${this.getText('conn_1_8')}</option>
                            <option value="1_4">${this.getText('conn_1_4')}</option>
                            <option value="3_8">${this.getText('conn_3_8')}</option>
                            <option value="1_2">${this.getText('conn_1_2')}</option>
                            <option value="g1_4">${this.getText('conn_g1_4')}</option>
                            <option value="g1_2">${this.getText('conn_g1_2')}</option>
                            <option value="m10">${this.getText('conn_m10')}</option>
                            <option value="m12">${this.getText('conn_m12')}</option>
                            <option value="m14">${this.getText('conn_m14')}</option>
                            <option value="m20">${this.getText('conn_m20')}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="mi_govde_malzeme">${this.getText('govde_malzeme_label')}</label>
                        <select id="mi_govde_malzeme">
                            <option value="">${lang === 'tr' ? 'Malzeme seçin...' : 'Select material...'}</option>
                            <option value="govde_celik">${this.getText('govde_celik')}</option>
                            <option value="govde_paslanmaz">${this.getText('govde_paslanmaz')}</option>
                            <option value="govde_paslanmaz_316">${this.getText('govde_paslanmaz_316')}</option>
                            <option value="govde_pirinc">${this.getText('govde_pirinc')}</option>
                            <option value="govde_bronz">${this.getText('govde_bronz')}</option>
                            <option value="govde_monel">${this.getText('govde_monel')}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="mi_calisma_araligi">${this.getText('calisma_araligi_label')}</label>
                        <select id="mi_calisma_araligi">
                            <option value="">${lang === 'tr' ? 'Önce cihaz tipi seçin' : 'Select instrument type first'}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="mi_dolgu_tipi">${this.getText('dolgu_tipi_label')}</label>
                        <select id="mi_dolgu_tipi">
                            <option value="">${lang === 'tr' ? 'Dolgu seçin...' : 'Select fill...'}</option>
                            <option value="dolgu_yok">${this.getText('dolgu_yok')}</option>
                            <option value="dolgu_gliserin">${this.getText('dolgu_gliserin')}</option>
                            <option value="dolgu_silikon">${this.getText('dolgu_silikon')}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row" id="daldirma_field" style="display: none;">
                    <div class="form-group">
                        <label for="mi_daldirma_boyu">${this.getText('daldirma_boyu_label')}</label>
                        <input type="number" id="mi_daldirma_boyu" min="0" step="1" placeholder="${lang === 'tr' ? 'Daldırma boyu' : 'Immersion length'}">
                    </div>
                </div>
            `;
        }

        getGrades() {
            // Bu modülde malzeme cinsi olarak gövde malzemesi kullanılıyor
            const organizedGrades = [];
            
            organizedGrades.push({
                value: '',
                text: `--- ${this.getText('govde_malzeme_label')} ---`,
                disabled: true
            });
            
            Object.keys(this.bodyMaterials).forEach(material => {
                organizedGrades.push({
                    value: material,
                    text: this.getText(material),
                    disabled: false
                });
            });
            
            return organizedGrades;
        }

        getDensity(govdeMalzeme) {
            return this.bodyMaterials[govdeMalzeme]?.density || 7850;
        }

        getStandard(standart) {
            if (standart === 'asme_b403') {
                return 'ASME B40.3';
            } else if (standart === 'din_16179') {
                return 'DIN 16179';
            } else if (standart === 'en_837') {
                return 'EN 837';
            }
            return '-';
        }

        calculate(formData) {
            const standart = formData.mi_standart;
            const cihazTipi = formData.mi_cihaz_tipi;
            const gostergeCapi = parseFloat(formData.mi_gosterge_capi) || 0;
            const baglantiTipi = formData.mi_baglanti_tipi;
            const baglantiBoyutu = formData.mi_baglanti_boyutu;
            const govdeMalzeme = formData.mi_govde_malzeme;
            const calismaAraligi = formData.mi_calisma_araligi;
            const dolguTipi = formData.mi_dolgu_tipi;
            const daldirmaBoyu = parseFloat(formData.mi_daldirma_boyu) || 0;
            const adet = parseFloat(formData.adet) || 1;
            
            if (!standart || !cihazTipi || !gostergeCapi || !baglantiTipi || 
                !baglantiBoyutu || !govdeMalzeme || !calismaAraligi || !dolguTipi) {
                return null;
            }
            
            const category = this.instrumentCategories[cihazTipi];
            
            // Termometre ise daldırma boyu kontrolü
            if (category === 'temperature') {
                if (daldirmaBoyu <= 0) {
                    return null;
                }
            }
            
            const density = this.getDensity(govdeMalzeme);
            
            // Gövde hacmi (gösterge çapına bağlı)
            const bodyDepth = gostergeCapi * 0.4;
            const bodyVolume = Math.PI * ((gostergeCapi/2) ** 2) * bodyDepth;
            
            // Bağlantı parçası hacmi
            let connectionLength = 20;
            let connectionDiameter = 15;
            
            if (baglantiBoyutu.includes('1_2')) {
                connectionDiameter = 21;
                connectionLength = 25;
            } else if (baglantiBoyutu.includes('3_8')) {
                connectionDiameter = 17;
                connectionLength = 22;
            }
            
            const connectionVolume = Math.PI * ((connectionDiameter/2) ** 2) * connectionLength;
            
            // Daldırma boyu hacmi (termometre için)
            let immersionVolume = 0;
            if (category === 'temperature' && daldirmaBoyu > 0) {
                const immersionDiameter = 8;
                immersionVolume = Math.PI * ((immersionDiameter/2) ** 2) * daldirmaBoyu;
            }
            
            // Toplam hacim
            let totalVolume = bodyVolume + connectionVolume + immersionVolume;
            
            // Dijital cihazlar için hafifletme
            if (cihazTipi.includes('dijital')) {
                totalVolume *= 0.6;
            }
            
            // mm³ -> m³
            const volumeM3 = totalVolume / 1000000000;
            
            // Ağırlık hesaplama
            const birimAgirlik = volumeM3 * density;
            const toplamAgirlik = birimAgirlik * adet;
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                suHacmi: null
            };
        }

        validate(formData) {
            const standart = formData.mi_standart;
            const cihazTipi = formData.mi_cihaz_tipi;
            const gostergeCapi = formData.mi_gosterge_capi;
            const baglantiTipi = formData.mi_baglanti_tipi;
            const baglantiBoyutu = formData.mi_baglanti_boyutu;
            const govdeMalzeme = formData.mi_govde_malzeme;
            const calismaAraligi = formData.mi_calisma_araligi;
            const dolguTipi = formData.mi_dolgu_tipi;
            
            if (!standart || !cihazTipi || !gostergeCapi || !baglantiTipi || 
                !baglantiBoyutu || !govdeMalzeme || !calismaAraligi || !dolguTipi) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            const category = this.instrumentCategories[cihazTipi];
            
            if (category === 'temperature') {
                const daldirmaBoyu = formData.mi_daldirma_boyu;
                
                if (daldirmaBoyu === undefined || daldirmaBoyu === null || 
                    daldirmaBoyu === '' || parseFloat(daldirmaBoyu) <= 0) {
                    return {
                        isValid: false,
                        message: this.getText('validation_daldirma_error')
                    };
                }
            }
            
            return { isValid: true };
        }

        formatDimensions(formData) {
            const gostergeCapi = formData.mi_gosterge_capi;
            const baglantiTipi = formData.mi_baglanti_tipi;
            const baglantiBoyutu = formData.mi_baglanti_boyutu;
            const calismaAraligi = formData.mi_calisma_araligi;
            const cihazTipi = formData.mi_cihaz_tipi;
            const daldirmaBoyu = formData.mi_daldirma_boyu;
            
            if (!gostergeCapi || !baglantiTipi || !baglantiBoyutu || !calismaAraligi) {
                return '-';
            }
            
            const category = this.instrumentCategories[cihazTipi];
            
            // Çap bilgisi
            const dialText = this.getText(`dial_${gostergeCapi}`);
            
            // Bağlantı bilgisi
            const connText = this.getText(`conn_${baglantiBoyutu}`);
            
            // Aralık bilgisi
            let rangeText = '';
            if (category === 'pressure') {
                rangeText = this.getText(`range_${calismaAraligi}`);
            } else {
                rangeText = this.getText(`temp_${calismaAraligi}`);
            }
            
            let dimStr = `${dialText}, ${connText}, ${rangeText}`;
            
            // Termometre ise daldırma boyu ekle
            if (category === 'temperature' && daldirmaBoyu) {
                dimStr += `, L=${daldirmaBoyu}mm`;
            }
            
            return dimStr;
        }

        hasWaterVolume() {
            return false;
        }

        getDisplayName() {
            return this.getText('display_name');
        }

        getDisplayTypeFromRow(rowData) {
            const metadata = rowData.metadata?.measurement_instrument;
            if (!metadata || !metadata.cihaz_tipi) {
                return this.getDisplayName();
            }
            
            return this.getText(`${metadata.cihaz_tipi}_display`);
        }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            const cihazTipi = formData.mi_cihaz_tipi;
            const govdeMalzeme = formData.mi_govde_malzeme;
            const standart = formData.mi_standart;
            
            if (cihazTipi) {
                baseRow.malzemeTuru = this.getText(`${cihazTipi}_display`);
            } else {
                baseRow.malzemeTuru = this.getDisplayName();
            }
            
            // Malzeme cinsini gövde malzemesi olarak göster
            if (govdeMalzeme) {
                baseRow.malzemeCinsi = this.getText(govdeMalzeme);
            }
            
            baseRow.enNormu = this.getStandard(standart);
            
            baseRow.metadata = {
                ...baseRow.metadata,
                measurement_instrument: {
                    standart: formData.mi_standart,
                    cihaz_tipi: formData.mi_cihaz_tipi,
                    gosterge_capi: formData.mi_gosterge_capi,
                    baglanti_tipi: formData.mi_baglanti_tipi,
                    baglanti_boyutu: formData.mi_baglanti_boyutu,
                    govde_malzeme: formData.mi_govde_malzeme,
                    calisma_araligi: formData.mi_calisma_araligi,
                    dolgu_tipi: formData.mi_dolgu_tipi,
                    daldirma_boyu: formData.mi_daldirma_boyu
                }
            };
            
            return baseRow;
        }

        fillFormFromRow(rowData) {
            super.fillFormFromRow(rowData);
            
            const metadata = rowData.metadata?.measurement_instrument;
            if (!metadata) {
                if (rowData.formData) {
                    this.fillFromFormData(rowData.formData);
                }
                return true;
            }
            
            setTimeout(() => {
                if (metadata.standart) {
                    document.getElementById('mi_standart').value = metadata.standart;
                    window.MeasurementInstrumentHandlers.onStandartChange();
                }
                
                setTimeout(() => {
                    if (metadata.cihaz_tipi) {
                        document.getElementById('mi_cihaz_tipi').value = metadata.cihaz_tipi;
                        window.MeasurementInstrumentHandlers.onCihazTipiChange();
                    }
                    
                    setTimeout(() => {
                        if (metadata.gosterge_capi) {
                            const el = document.getElementById('mi_gosterge_capi');
                            if (el) el.value = metadata.gosterge_capi;
                        }
                        if (metadata.baglanti_tipi) {
                            const el = document.getElementById('mi_baglanti_tipi');
                            if (el) el.value = metadata.baglanti_tipi;
                        }
                        if (metadata.baglanti_boyutu) {
                            const el = document.getElementById('mi_baglanti_boyutu');
                            if (el) el.value = metadata.baglanti_boyutu;
                        }
                        if (metadata.govde_malzeme) {
                            const el = document.getElementById('mi_govde_malzeme');
                            if (el) el.value = metadata.govde_malzeme;
                        }
                        if (metadata.calisma_araligi) {
                            const el = document.getElementById('mi_calisma_araligi');
                            if (el) el.value = metadata.calisma_araligi;
                        }
                        if (metadata.dolgu_tipi) {
                            const el = document.getElementById('mi_dolgu_tipi');
                            if (el) el.value = metadata.dolgu_tipi;
                        }
                        if (metadata.daldirma_boyu) {
                            const el = document.getElementById('mi_daldirma_boyu');
                            if (el) el.value = metadata.daldirma_boyu;
                        }
                    }, 150);
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
                        
                        if (key === 'mi_standart') {
                            window.MeasurementInstrumentHandlers.onStandartChange();
                        } else if (key === 'mi_cihaz_tipi') {
                            window.MeasurementInstrumentHandlers.onCihazTipiChange();
                        }
                    }
                });
            }, 100);
        }
    }

    const measurementInstrumentMaterial = new MeasurementInstrumentMaterial();
    measurementInstrumentMaterial.register();
    
    console.log('Ölçüm Cihazları modülü v1.0.0 yüklendi');

})(window);