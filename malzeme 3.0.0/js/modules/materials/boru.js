/**
 * BORU Malzeme Modülü
 * EN ve ASME standartları destekli
 */

(function(window) {
    'use strict';
    
    class BoruMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'boru';
            
            // Dil metinleri
            this.texts = {
                tr: {
                    display_name: 'Boru',
                    cap_label: 'Dış Çap (mm)',
                    kalinlik_label: 'Et Kalınlığı (mm)',
                    uzunluk_label: 'Uzunluk (mm)',
                    standart_sistem_label: 'Standart Sistemi',
                    cap_placeholder: 'Dış çap değeri',
                    kalinlik_placeholder: 'Et kalınlığı',
                    uzunluk_placeholder: 'Uzunluk değeri',
                    validation_error: 'Tüm ölçüler girilmelidir',
                    validation_thickness: 'Et kalınlığı çapın yarısından küçük olmalıdır',
                    ic_cap_info: 'İç Çap',
                    kesit_alan_info: 'Kesit Alanı',
                    schedule_info: 'Schedule'
                },
                en: {
                    display_name: 'Pipe',
                    cap_label: 'Outer Diameter (mm)',
                    kalinlik_label: 'Wall Thickness (mm)',
                    uzunluk_label: 'Length (mm)',
                    standart_sistem_label: 'Standard System',
                    cap_placeholder: 'Outer diameter',
                    kalinlik_placeholder: 'Wall thickness',
                    uzunluk_placeholder: 'Length value',
                    validation_error: 'All dimensions must be entered',
                    validation_thickness: 'Wall thickness must be less than radius',
                    ic_cap_info: 'Inner Diameter',
                    kesit_alan_info: 'Cross Section Area',
                    schedule_info: 'Schedule'
                }
            };
            
            // Malzeme cinsleri - EN ve ASME birleşik
            this.grades = [
                // Karbon çelik - EN
                'S235JR', 'S275JR', 'S355JR',
                'P235GH', 'P250GH', 'P265GH', 'P295GH', 'P355GH',
                'P235TR1', 'P235TR2', 'P265TR1', 'P265TR2',
                // Karbon çelik - ASME
                'A106 Gr.B', 'A53 Gr.B', 'API 5L Gr.B',
                'A333 Gr.6', 'A335 P11', 'A335 P22',
                // Paslanmaz - EN
                '1.4301', '1.4401', '1.4404', '1.4541', '1.4571',
                // Paslanmaz - ASME
                'A312 TP304', 'A312 TP304L', 'A312 TP316', 'A312 TP316L', 'A312 TP321',
                // Özel alaşımlar
                'Duplex 2205', 'Super Duplex 2507', 'Hastelloy C276', 'Inconel 625'
            ];
            
            // Yoğunluklar (kg/m³)
            this.densities = {
                // Karbon çelik
                'S235JR': 7850, 'S275JR': 7850, 'S355JR': 7850,
                'P235GH': 7850, 'P250GH': 7850, 'P265GH': 7850, 'P295GH': 7850, 'P355GH': 7850,
                'P235TR1': 7850, 'P235TR2': 7850, 'P265TR1': 7850, 'P265TR2': 7850,
                'A106 Gr.B': 7850, 'A53 Gr.B': 7850, 'API 5L Gr.B': 7850,
                'A333 Gr.6': 7850, 'A335 P11': 7850, 'A335 P22': 7850,
                // Paslanmaz
                '1.4301': 8000, '1.4401': 8000, '1.4404': 8000, '1.4541': 8000, '1.4571': 8000,
                'A312 TP304': 8000, 'A312 TP304L': 8000, 'A312 TP316': 8000, 
                'A312 TP316L': 8000, 'A312 TP321': 8000,
                // Özel alaşımlar
                'Duplex 2205': 7800, 'Super Duplex 2507': 7800,
                'Hastelloy C276': 8890, 'Inconel 625': 8440
            };
            
            // Standartlar - Malzeme cinsine göre otomatik
            this.standards = {
                // EN Standartları
                'S235JR': 'EN 10025-2', 'S275JR': 'EN 10025-2', 'S355JR': 'EN 10025-2',
                'P235GH': 'EN 10216-2', 'P250GH': 'EN 10216-2', 'P265GH': 'EN 10216-2',
                'P295GH': 'EN 10216-2', 'P355GH': 'EN 10216-2',
                'P235TR1': 'EN 10216-1', 'P235TR2': 'EN 10216-1',
                'P265TR1': 'EN 10216-1', 'P265TR2': 'EN 10216-1',
                '1.4301': 'EN 10216-5', '1.4401': 'EN 10216-5', '1.4404': 'EN 10216-5',
                '1.4541': 'EN 10216-5', '1.4571': 'EN 10216-5',
                // ASME Standartları
                'A106 Gr.B': 'ASME B36.10M', 'A53 Gr.B': 'ASME B36.10M',
                'API 5L Gr.B': 'ASME B36.10M', 'A333 Gr.6': 'ASME B36.10M',
                'A335 P11': 'ASME B36.10M', 'A335 P22': 'ASME B36.10M',
                'A312 TP304': 'ASME B36.19M', 'A312 TP304L': 'ASME B36.19M',
                'A312 TP316': 'ASME B36.19M', 'A312 TP316L': 'ASME B36.19M',
                'A312 TP321': 'ASME B36.19M',
                // Özel
                'Duplex 2205': 'ASME B36.19M', 'Super Duplex 2507': 'ASME B36.19M',
                'Hastelloy C276': 'ASME B36.19M', 'Inconel 625': 'ASME B36.19M'
            };
            
            // EN 10220 Standart ölçüleri (DN - Dış Çap - Et Kalınlıkları)
            this.enSizes = {
                'DN15': { od: 21.3, thickness: [2.0, 2.3, 2.6, 2.8, 3.2] },
                'DN20': { od: 26.9, thickness: [2.0, 2.3, 2.6, 2.8, 3.2] },
                'DN25': { od: 33.7, thickness: [2.3, 2.6, 2.9, 3.2, 3.6, 4.0] },
                'DN32': { od: 42.4, thickness: [2.6, 2.9, 3.2, 3.6, 4.0, 4.5] },
                'DN40': { od: 48.3, thickness: [2.6, 2.9, 3.2, 3.6, 4.0, 4.5] },
                'DN50': { od: 60.3, thickness: [2.9, 3.2, 3.6, 4.0, 4.5, 5.0, 5.6] },
                'DN65': { od: 76.1, thickness: [2.9, 3.2, 3.6, 4.0, 4.5, 5.0, 5.6, 6.3] },
                'DN80': { od: 88.9, thickness: [3.2, 3.6, 4.0, 4.5, 5.0, 5.6, 6.3, 7.1] },
                'DN100': { od: 114.3, thickness: [3.6, 4.0, 4.5, 5.0, 5.6, 6.3, 7.1, 8.0, 8.8] },
                'DN125': { od: 139.7, thickness: [4.0, 4.5, 5.0, 5.6, 6.3, 7.1, 8.0, 8.8, 10.0] },
                'DN150': { od: 168.3, thickness: [4.5, 5.0, 5.6, 6.3, 7.1, 8.0, 8.8, 10.0, 11.0] },
                'DN200': { od: 219.1, thickness: [5.9, 6.3, 7.1, 8.0, 8.8, 10.0, 11.0, 12.5] },
                'DN250': { od: 273, thickness: [6.3, 7.1, 8.0, 8.8, 10.0, 11.0, 12.5, 14.2] },
                'DN300': { od: 323.9, thickness: [7.1, 8.0, 8.8, 10.0, 11.0, 12.5, 14.2, 16.0] },
                'DN350': { od: 355.6, thickness: [8.0, 8.8, 10.0, 11.0, 12.5, 14.2, 16.0] },
                'DN400': { od: 406.4, thickness: [8.8, 10.0, 11.0, 12.5, 14.2, 16.0, 17.5] },
                'DN450': { od: 457, thickness: [10.0, 11.0, 12.5, 14.2, 16.0, 17.5, 20.0] },
                'DN500': { od: 508, thickness: [11.0, 12.5, 14.2, 16.0, 17.5, 20.0, 22.2] },
                'DN600': { od: 610, thickness: [12.5, 14.2, 16.0, 17.5, 20.0, 22.2, 25.0] }
            };
            
            // ASME B36.10M Schedule ölçüleri (NPS - Dış Çap - Schedule Kalınlıkları)
            this.asmeSizes = {
                '1/2': { od: 21.3, sch: { '10': 2.11, '40': 2.77, '80': 3.73, '160': 4.78 } },
                '3/4': { od: 26.7, sch: { '10': 2.11, '40': 2.87, '80': 3.91, '160': 5.56 } },
                '1': { od: 33.4, sch: { '10': 2.77, '40': 3.38, '80': 4.55, '160': 6.35 } },
                '1 1/4': { od: 42.2, sch: { '10': 2.77, '40': 3.56, '80': 4.85, '160': 6.35 } },
                '1 1/2': { od: 48.3, sch: { '10': 2.77, '40': 3.68, '80': 5.08, '160': 7.14 } },
                '2': { od: 60.3, sch: { '10': 2.77, '40': 3.91, '80': 5.54, '160': 8.74 } },
                '2 1/2': { od: 73, sch: { '10': 3.05, '40': 5.16, '80': 7.01, '160': 9.53 } },
                '3': { od: 88.9, sch: { '10': 3.05, '40': 5.49, '80': 7.62, '160': 11.13 } },
                '4': { od: 114.3, sch: { '10': 3.05, '40': 6.02, '80': 8.56, '120': 11.13, '160': 13.49 } },
                '5': { od: 141.3, sch: { '10': 3.40, '40': 6.55, '80': 9.53, '120': 12.70, '160': 15.88 } },
                '6': { od: 168.3, sch: { '10': 3.40, '40': 7.11, '80': 10.97, '120': 14.27, '160': 18.26 } },
                '8': { od: 219.1, sch: { '10': 3.76, '20': 6.35, '30': 7.04, '40': 8.18, '60': 10.31, '80': 12.70, '100': 15.09, '120': 18.26, '140': 20.62, '160': 23.01 } },
                '10': { od: 273.1, sch: { '10': 4.19, '20': 6.35, '30': 7.80, '40': 9.27, '60': 12.70, '80': 15.09, '100': 18.26, '120': 21.44, '140': 25.40, '160': 28.58 } },
                '12': { od: 323.9, sch: { '10': 4.57, '20': 6.35, '30': 8.38, '40': 10.31, '60': 14.27, '80': 17.48, '100': 21.44, '120': 25.40, '140': 28.58, '160': 33.32 } },
                '14': { od: 355.6, sch: { '10': 6.35, '20': 7.92, '30': 9.53, '40': 11.13, '60': 15.09, '80': 19.05 } },
                '16': { od: 406.4, sch: { '10': 6.35, '20': 7.92, '30': 9.53, '40': 12.70, '60': 16.66, '80': 21.44 } },
                '18': { od: 457, sch: { '10': 6.35, '20': 7.92, '30': 11.13, '40': 14.27, '60': 19.05, '80': 23.83 } },
                '20': { od: 508, sch: { '10': 6.35, '20': 9.53, '30': 12.70, '40': 15.09, '60': 20.62, '80': 26.19 } },
                '24': { od: 610, sch: { '10': 6.35, '20': 9.53, '30': 14.27, '40': 17.48, '60': 24.61, '80': 30.96 } }
            };
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="standartSistem">${this.getText('standart_sistem_label')}</label>
                        <select id="standartSistem" onchange="window.ApplicationController.updatePipeStandards()">
                            <option value="manual">${lang === 'tr' ? 'Manuel Giriş' : 'Manual Entry'}</option>
                            <option value="en">EN 10220</option>
                            <option value="asme">ASME B36.10M / B36.19M</option>
                        </select>
                    </div>
                </div>
                <div id="pipeStandardSelector" style="display: none;">
                    <!-- Dinamik olarak doldurulacak -->
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="cap">${this.getText('cap_label')}</label>
                        <input type="number" id="cap" 
                               placeholder="${this.getText('cap_placeholder')}" 
                               min="0" step="any">
                    </div>
                    <div class="form-group">
                        <label for="kalinlik">${this.getText('kalinlik_label')}</label>
                        <input type="number" id="kalinlik" 
                               placeholder="${this.getText('kalinlik_placeholder')}" 
                               min="0" step="any">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="uzunluk">${this.getText('uzunluk_label')}</label>
                        <input type="number" id="uzunluk" 
                               placeholder="${this.getText('uzunluk_placeholder')}" 
                               min="0" step="any" value="6000">
                    </div>
                </div>
                <div class="form-row" id="pipeInfoRow" style="display: none;">
                    <div class="form-group">
                        <small style="color: #4299e1; font-weight: 600;">
                            <span id="icCapInfo"></span> | 
                            <span id="kesitAlanInfo"></span>
                        </small>
                    </div>
                </div>
            `;
        }

        // Standart seçicileri güncelle (ApplicationController'dan çağrılacak)
        updateStandardSelectors(system) {
            const selectorDiv = document.getElementById('pipeStandardSelector');
            const capInput = document.getElementById('cap');
            const kalinlikInput = document.getElementById('kalinlik');
            const lang = this.getCurrentLanguage();
            
            if (system === 'manual') {
                selectorDiv.style.display = 'none';
                capInput.removeAttribute('readonly');
                kalinlikInput.removeAttribute('readonly');
                return;
            }
            
            selectorDiv.style.display = 'block';
            let html = '<div class="form-row">';
            
            if (system === 'en') {
                html += `
                    <div class="form-group">
                        <label for="dnSize">DN ${lang === 'tr' ? 'Ölçü' : 'Size'}</label>
                        <select id="dnSize" onchange="window.ApplicationController.updatePipeFromEN()">
                            <option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
                            ${Object.keys(this.enSizes).map(dn => 
                                `<option value="${dn}">${dn} (Ø${this.enSizes[dn].od} mm)</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="enThickness">${lang === 'tr' ? 'Et Kalınlığı' : 'Wall Thickness'}</label>
                        <select id="enThickness" onchange="window.ApplicationController.updateThicknessEN()">
                            <option value="">${lang === 'tr' ? 'Önce DN seçin' : 'Select DN first'}</option>
                        </select>
                    </div>
                `;
            } else if (system === 'asme') {
                html += `
                    <div class="form-group">
                        <label for="npsSize">NPS ${lang === 'tr' ? 'Ölçü' : 'Size'}</label>
                        <select id="npsSize" onchange="window.ApplicationController.updatePipeFromASME()">
                            <option value="">${lang === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
                            ${Object.keys(this.asmeSizes).map(nps => 
                                `<option value="${nps}">${nps}" (Ø${this.asmeSizes[nps].od} mm)</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="schedule">Schedule</label>
                        <select id="schedule" onchange="window.ApplicationController.updateThicknessASME()">
                            <option value="">${lang === 'tr' ? 'Önce NPS seçin' : 'Select NPS first'}</option>
                        </select>
                    </div>
                `;
            }
            
            html += '</div>';
            selectorDiv.innerHTML = html;
        }

        calculate(formData) {
            const cap = parseFloat(formData.cap) || 0;
            const kalinlik = parseFloat(formData.kalinlik) || 0;
            const uzunluk = parseFloat(formData.uzunluk) || 0;
            const adet = parseFloat(formData.adet) || 1;
            const malzemeCinsi = formData.malzemeCinsi || 'P235GH';
            
            if (!cap || !kalinlik || !uzunluk) {
                return null;
            }
            
            // İç çap hesaplama
            const icCap = cap - (2 * kalinlik);
            
            // Dış ve iç yarıçaplar
            const disYaricap = cap / 2;
            const icYaricap = icCap / 2;
            
            // Kesit alanı (mm²) = π * (R² - r²)
            const kesitAlani = Math.PI * (Math.pow(disYaricap, 2) - Math.pow(icYaricap, 2));
            
            // Hacim (mm³ → m³)
            const hacimM3 = (kesitAlani * uzunluk) / 1000000000;
            
            // Yoğunluk
            const yogunluk = this.getDensity(malzemeCinsi);
            
            // Ağırlık (kg)
            const birimAgirlik = hacimM3 * yogunluk;
            const toplamAgirlik = birimAgirlik * adet;
            
            // Su hacmi (litre) = π * r² * L / 1000000
            const suHacmi = (Math.PI * Math.pow(icYaricap, 2) * uzunluk) / 1000000;
            const toplamSuHacmi = suHacmi * adet;
            
            // Bilgi güncelleme
            this.updateInfoDisplay(icCap, kesitAlani);
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                suHacmi: toplamSuHacmi,
                icCap: icCap.toFixed(2),
                kesitAlani: kesitAlani.toFixed(2)
            };
        }

        updateInfoDisplay(icCap, kesitAlani) {
            const infoRow = document.getElementById('pipeInfoRow');
            const icCapInfo = document.getElementById('icCapInfo');
            const kesitAlanInfo = document.getElementById('kesitAlanInfo');
            
            if (icCap && kesitAlani) {
                infoRow.style.display = 'block';
                icCapInfo.textContent = `${this.getText('ic_cap_info')}: ${icCap.toFixed(2)} mm`;
                kesitAlanInfo.textContent = `${this.getText('kesit_alan_info')}: ${kesitAlani.toFixed(2)} mm²`;
            } else {
                infoRow.style.display = 'none';
            }
        }

        validate(formData) {
            const cap = parseFloat(formData.cap) || 0;
            const kalinlik = parseFloat(formData.kalinlik) || 0;
            const uzunluk = parseFloat(formData.uzunluk) || 0;
            
            if (!cap || !kalinlik || !uzunluk) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            // Et kalınlığı kontrolü
            if (kalinlik >= (cap / 2)) {
                return {
                    isValid: false,
                    message: this.getText('validation_thickness')
                };
            }
            
            return { isValid: true };
        }

        formatDimensions(formData) {
            const cap = parseFloat(formData.cap) || 0;
            const kalinlik = parseFloat(formData.kalinlik) || 0;
            const uzunluk = parseFloat(formData.uzunluk) || 0;
            
            return `Ø${cap}x${kalinlik} L:${uzunluk}mm`;
        }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            
            // Boru için standart sistem bilgilerini sakla
            baseRow.boruDetay = {
                standartSistem: formData.standartSistem || 'manual',
                dnSize: formData.dnSize || null,
                enThickness: formData.enThickness || null,
                npsSize: formData.npsSize || null,
                schedule: formData.schedule || null
            };
            
            baseRow.originalType = 'boru';
            
            return baseRow;
        }

        fillSpecificFields(rowData) {
            console.log('Boru fillSpecificFields çalıştı:', rowData);
            
            // ÖNCELİKLE: boruDetay varsa onu kullan
            if (rowData.boruDetay && rowData.boruDetay.standartSistem) {
                const standartElement = document.getElementById('standartSistem');
                if (standartElement) {
                    standartElement.value = rowData.boruDetay.standartSistem;
                    window.ApplicationController.updatePipeStandards();
                    
                    setTimeout(() => {
                        // Çap, kalınlık, uzunluk değerlerini doldur
                        if (rowData.formData) {
                            ['cap', 'kalinlik', 'uzunluk'].forEach(field => {
                                const element = document.getElementById(field);
                                if (element && rowData.formData[field] !== undefined) {
                                    element.value = rowData.formData[field];
                                }
                            });
                        }
                        
                        // EN sistemi
                        if (rowData.boruDetay.standartSistem === 'en' && rowData.boruDetay.dnSize) {
                            const dnElement = document.getElementById('dnSize');
                            if (dnElement) {
                                dnElement.value = rowData.boruDetay.dnSize;
                                window.ApplicationController.updatePipeFromEN();
                                
                                setTimeout(() => {
                                    if (rowData.boruDetay.enThickness) {
                                        const thicknessElement = document.getElementById('enThickness');
                                        if (thicknessElement) {
                                            thicknessElement.value = rowData.boruDetay.enThickness;
                                            window.ApplicationController.updateThicknessEN();
                                        }
                                    }
                                }, 100);
                            }
                        }
                        // ASME sistemi
                        else if (rowData.boruDetay.standartSistem === 'asme' && rowData.boruDetay.npsSize) {
                            const npsElement = document.getElementById('npsSize');
                            if (npsElement) {
                                npsElement.value = rowData.boruDetay.npsSize;
                                window.ApplicationController.updatePipeFromASME();
                                
                                setTimeout(() => {
                                    if (rowData.boruDetay.schedule) {
                                        const scheduleElement = document.getElementById('schedule');
                                        if (scheduleElement) {
                                            scheduleElement.value = rowData.boruDetay.schedule;
                                            window.ApplicationController.updateThicknessASME();
                                        }
                                    }
                                }, 100);
                            }
                        }
                    }, 150);
                }
                return;
            }
            
            // İKİNCİL: formData varsa
            if (rowData.formData && rowData.formData.standartSistem) {
                const standartElement = document.getElementById('standartSistem');
                if (standartElement) {
                    standartElement.value = rowData.formData.standartSistem;
                    window.ApplicationController.updatePipeStandards();
                }
                
                setTimeout(() => {
                    ['cap', 'kalinlik', 'uzunluk'].forEach(field => {
                        if (rowData.formData[field] !== undefined) {
                            const element = document.getElementById(field);
                            if (element) {
                                element.value = rowData.formData[field];
                            }
                        }
                    });
                    
                    if (rowData.formData.standartSistem === 'en' && rowData.formData.dnSize) {
                        setTimeout(() => {
                            const dnElement = document.getElementById('dnSize');
                            if (dnElement) {
                                dnElement.value = rowData.formData.dnSize;
                                window.ApplicationController.updatePipeFromEN();
                                
                                setTimeout(() => {
                                    if (rowData.formData.enThickness) {
                                        const thicknessElement = document.getElementById('enThickness');
                                        if (thicknessElement) {
                                            thicknessElement.value = rowData.formData.enThickness;
                                            window.ApplicationController.updateThicknessEN();
                                        }
                                    }
                                }, 100);
                            }
                        }, 100);
                    } else if (rowData.formData.standartSistem === 'asme' && rowData.formData.npsSize) {
                        setTimeout(() => {
                            const npsElement = document.getElementById('npsSize');
                            if (npsElement) {
                                npsElement.value = rowData.formData.npsSize;
                                window.ApplicationController.updatePipeFromASME();
                                
                                setTimeout(() => {
                                    if (rowData.formData.schedule) {
                                        const scheduleElement = document.getElementById('schedule');
                                        if (scheduleElement) {
                                            scheduleElement.value = rowData.formData.schedule;
                                            window.ApplicationController.updateThicknessASME();
                                        }
                                    }
                                }, 100);
                            }
                        }, 100);
                    }
                }, 150);
                
                return;
            }
            
            // SON ÇARE: olculer'den parse et
            if (rowData.olculer) {
                const olculer = rowData.olculer.toString();
                const pattern = /Ø?(\d+(?:\.\d+)?)\s*x\s*(\d+(?:\.\d+)?)\s*L:\s*(\d+(?:\.\d+)?)/i;
                const matches = olculer.match(pattern);
                
                if (matches) {
                    const capElement = document.getElementById('cap');
                    const kalinlikElement = document.getElementById('kalinlik');
                    const uzunlukElement = document.getElementById('uzunluk');
                    
                    if (capElement) capElement.value = matches[1];
                    if (kalinlikElement) kalinlikElement.value = matches[2];
                    if (uzunlukElement) uzunlukElement.value = matches[3];
                }
            }
        }

        // Su hacmi var
        hasWaterVolume() {
            return true;
        }
    }

    // ApplicationController'a ek fonksiyonlar ekle (window objesine)
    if (!window.ApplicationController.updatePipeStandards) {
        window.ApplicationController.updatePipeStandards = function() {
            const system = document.getElementById('standartSistem').value;
            const materialType = document.getElementById('malzemeTuru').value;
            
            if (materialType === 'boru' && window.MaterialRegistry.has('boru')) {
                const MaterialClass = window.MaterialRegistry.get('boru');
                const instance = new MaterialClass();
                instance.updateStandardSelectors(system);
            }
        };
        
        window.ApplicationController.updatePipeFromEN = function() {
            const dnSize = document.getElementById('dnSize').value;
            if (!dnSize) return;
            
            const MaterialClass = window.MaterialRegistry.get('boru');
            const instance = new MaterialClass();
            const size = instance.enSizes[dnSize];
            
            document.getElementById('cap').value = size.od;
            document.getElementById('cap').setAttribute('readonly', true);
            
            // Et kalınlığı seçeneklerini güncelle
            const thicknessSelect = document.getElementById('enThickness');
            thicknessSelect.innerHTML = '<option value="">Seçiniz...</option>';
            size.thickness.forEach(t => {
                thicknessSelect.innerHTML += `<option value="${t}">${t} mm</option>`;
            });
        };
        
        window.ApplicationController.updateThicknessEN = function() {
            const thickness = document.getElementById('enThickness').value;
            if (thickness) {
                document.getElementById('kalinlik').value = thickness;
                document.getElementById('kalinlik').setAttribute('readonly', true);
            }
        };
        
        window.ApplicationController.updatePipeFromASME = function() {
            const npsSize = document.getElementById('npsSize').value;
            if (!npsSize) return;
            
            const MaterialClass = window.MaterialRegistry.get('boru');
            const instance = new MaterialClass();
            const size = instance.asmeSizes[npsSize];
            
            document.getElementById('cap').value = size.od;
            document.getElementById('cap').setAttribute('readonly', true);
            
            // Schedule seçeneklerini güncelle
            const scheduleSelect = document.getElementById('schedule');
            scheduleSelect.innerHTML = '<option value="">Seçiniz...</option>';
            Object.keys(size.sch).forEach(sch => {
                scheduleSelect.innerHTML += `<option value="${sch}">SCH ${sch} (${size.sch[sch]} mm)</option>`;
            });
        };
        
        window.ApplicationController.updateThicknessASME = function() {
            const npsSize = document.getElementById('npsSize').value;
            const schedule = document.getElementById('schedule').value;
            if (!npsSize || !schedule) return;
            
            const MaterialClass = window.MaterialRegistry.get('boru');
            const instance = new MaterialClass();
            const thickness = instance.asmeSizes[npsSize].sch[schedule];
            
            document.getElementById('kalinlik').value = thickness;
            document.getElementById('kalinlik').setAttribute('readonly', true);
        };
    }

    // Malzemeyi kaydet
    const boruMaterial = new BoruMaterial();
    boruMaterial.register();

})(window);