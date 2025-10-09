/**
 * MİL (Yuvarlak Çubuk) Malzeme Modülü
 */

(function(window) {
    'use strict';
    
    class MilMaterial extends window.BaseMaterial {
        constructor() {
            super();
            this.materialType = 'mil';
            
            // Dil metinleri
            this.texts = {
                tr: {
                    display_name: 'Mil',
                    cap_label: 'Çap (mm)',
                    uzunluk_label: 'Uzunluk (mm)',
                    cap_placeholder: 'Mil çapı',
                    uzunluk_placeholder: 'Uzunluk değeri',
                    validation_error: 'Çap ve uzunluk girilmelidir',
                    kesit_alan_info: 'Kesit Alanı',
                    teorik_agirlik_info: 'Teorik Ağırlık'
                },
                en: {
                    display_name: 'Round Bar',
                    cap_label: 'Diameter (mm)',
                    uzunluk_label: 'Length (mm)',
                    cap_placeholder: 'Bar diameter',
                    uzunluk_placeholder: 'Length value',
                    validation_error: 'Diameter and length must be entered',
                    kesit_alan_info: 'Cross Section Area',
                    teorik_agirlik_info: 'Theoretical Weight'
                }
            };
            
            // Malzeme cinsleri
            this.grades = [
                'S235JR', 'S275JR', 'S355JR', 'S355J2',
                '11SMn30', '11SMn37', '11SMnPb30', '11SMnPb37',
                'C45', 'C45E', '42CrMo4', '34CrNiMo6',
                '1.4301', '1.4401', '1.4404', '1.4571',
                '1.4057', '1.4104', '1.4112',
                'Aluminyum', 'Bakır', 'Pirinç', 'Bronz',
                'PA6', 'POM', 'PTFE'
            ];
            
            // Yoğunluklar (kg/m³)
            this.densities = {
                'S235JR': 7850, 'S275JR': 7850, 'S355JR': 7850, 'S355J2': 7850,
                '11SMn30': 7850, '11SMn37': 7850, '11SMnPb30': 7850, '11SMnPb37': 7850,
                'C45': 7850, 'C45E': 7850, '42CrMo4': 7850, '34CrNiMo6': 7850,
                '1.4301': 8000, '1.4401': 8000, '1.4404': 8000, '1.4571': 8000,
                '1.4057': 8000, '1.4104': 7700, '1.4112': 7700,
                'Aluminyum': 2700, 'Bakır': 8960, 'Pirinç': 8470, 'Bronz': 8800,
                'PA6': 1140, 'POM': 1410, 'PTFE': 2200
            };
            
            // Standartlar
            this.standards = {
                'S235JR': 'EN 10060', 'S275JR': 'EN 10060', 'S355JR': 'EN 10060', 'S355J2': 'EN 10060',
                '11SMn30': 'EN 10277-3', '11SMn37': 'EN 10277-3', 
                '11SMnPb30': 'EN 10277-3', '11SMnPb37': 'EN 10277-3',
                'C45': 'EN 10083-2', 'C45E': 'EN 10083-2', 
                '42CrMo4': 'EN 10083-3', '34CrNiMo6': 'EN 10083-3',
                '1.4301': 'EN 10088-3', '1.4401': 'EN 10088-3', 
                '1.4404': 'EN 10088-3', '1.4571': 'EN 10088-3',
                '1.4057': 'EN 10088-3', '1.4104': 'EN 10088-3', '1.4112': 'EN 10088-3',
                'Aluminyum': 'EN 755-2', 'Bakır': 'EN 12163', 
                'Pirinç': 'EN 12164', 'Bronz': 'EN 12163',
                'PA6': 'DIN 16962', 'POM': 'DIN 16962', 'PTFE': 'DIN 16962'
            };
            
            // Standart mil çapları (mm)
            this.standardDiameters = [
                3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                22, 24, 25, 26, 28, 30, 32, 35, 36, 38, 40, 42, 45, 48, 50,
                52, 55, 56, 58, 60, 63, 65, 70, 75, 80, 85, 90, 95, 100,
                105, 110, 115, 120, 125, 130, 140, 150, 160, 170, 180, 190, 200,
                210, 220, 230, 240, 250, 260, 270, 280, 290, 300,
                320, 340, 350, 360, 380, 400, 420, 450, 480, 500
            ];
        }

        createUI() {
            const lang = this.getCurrentLanguage();
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="cap">${this.getText('cap_label')}</label>
                        <input type="number" id="cap" 
                               placeholder="${this.getText('cap_placeholder')}" 
                               min="0" step="any" list="milCapList">
                        <datalist id="milCapList">
                            ${this.standardDiameters.map(d => `<option value="${d}">`).join('')}
                        </datalist>
                    </div>
                    <div class="form-group">
                        <label for="uzunluk">${this.getText('uzunluk_label')}</label>
                        <input type="number" id="uzunluk" 
                               placeholder="${this.getText('uzunluk_placeholder')}" 
                               min="0" step="any" value="1000">
                    </div>
                </div>
                <div class="form-row" id="milInfoRow" style="display: none;">
                    <div class="form-group">
                        <small style="color: #4299e1; font-weight: 600;">
                            <span id="kesitAlanInfo"></span> | 
                            <span id="teorikAgirlikInfo"></span>
                        </small>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <small style="color: #718096; font-style: italic;">
                            ${lang === 'tr' ? 
                              '💡 Standart çaplar için listeden seçebilirsiniz' : 
                              '💡 You can select standard diameters from the list'}
                        </small>
                    </div>
                </div>
            `;
        }

        calculate(formData) {
            const cap = parseFloat(formData.cap) || 0;
            const uzunluk = parseFloat(formData.uzunluk) || 0;
            const adet = parseFloat(formData.adet) || 1;
            const malzemeCinsi = formData.malzemeCinsi || 'S235JR';
            
            if (!cap || !uzunluk) {
                return null;
            }
            
            // Yarıçap
            const yaricap = cap / 2;
            
            // Kesit alanı (mm²) = π * r²
            const kesitAlani = Math.PI * Math.pow(yaricap, 2);
            
            // Hacim (mm³ → m³)
            const hacimM3 = (kesitAlani * uzunluk) / 1000000000;
            
            // Yoğunluk
            const yogunluk = this.getDensity(malzemeCinsi);
            
            // Ağırlık (kg)
            const birimAgirlik = hacimM3 * yogunluk;
            const toplamAgirlik = birimAgirlik * adet;
            
            // Teorik ağırlık (kg/m)
            const teorikAgirlik = (kesitAlani / 1000000) * yogunluk;
            
            // Bilgi güncelleme
            this.updateInfoDisplay(kesitAlani, teorikAgirlik);
            
            return {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: toplamAgirlik,
                kesitAlani: kesitAlani.toFixed(2),
                teorikAgirlik: teorikAgirlik.toFixed(3),
                suHacmi: null
            };
        }

        updateInfoDisplay(kesitAlani, teorikAgirlik) {
            const infoRow = document.getElementById('milInfoRow');
            const kesitAlanInfo = document.getElementById('kesitAlanInfo');
            const teorikAgirlikInfo = document.getElementById('teorikAgirlikInfo');
            
            if (kesitAlani && teorikAgirlik) {
                infoRow.style.display = 'block';
                kesitAlanInfo.textContent = `${this.getText('kesit_alan_info')}: ${kesitAlani.toFixed(2)} mm²`;
                teorikAgirlikInfo.textContent = `${this.getText('teorik_agirlik_info')}: ${teorikAgirlik.toFixed(3)} kg/m`;
            } else {
                infoRow.style.display = 'none';
            }
        }

        formatRow(formData, calculation) {
            const baseRow = super.formatRow(formData, calculation);
            
            // Mil detaylarını sakla
            baseRow.milDetay = {
                cap: formData.cap,
                uzunluk: formData.uzunluk
            };
            
            return baseRow;
        }

        validate(formData) {
            const cap = parseFloat(formData.cap) || 0;
            const uzunluk = parseFloat(formData.uzunluk) || 0;
            
            if (!cap || !uzunluk) {
                return {
                    isValid: false,
                    message: this.getText('validation_error')
                };
            }
            
            return { isValid: true };
        }

        formatDimensions(formData) {
            const cap = parseFloat(formData.cap) || 0;
            const uzunluk = parseFloat(formData.uzunluk) || 0;
            
            return `Ø${cap} L:${uzunluk}mm`;
        }

        // Standart çap kontrolü
        isStandardDiameter(cap) {
            return this.standardDiameters.includes(cap);
        }

        fillSpecificFields(rowData) {
                // ÖNCELİK 0: Metadata'dan gelen milDetay
            if (rowData.milDetay) {
                console.log('Mil metadata milDetay bulundu:', rowData.milDetay);
                
                const capElement = document.getElementById('cap');
                if (capElement && rowData.milDetay.cap !== undefined) {
                    capElement.value = rowData.milDetay.cap;
                }
                
                const uzunlukElement = document.getElementById('uzunluk');
                if (uzunlukElement && rowData.milDetay.uzunluk !== undefined) {
                    uzunlukElement.value = rowData.milDetay.uzunluk;
                }
                return;
            }
            if (rowData.olculer) {
                const olculer = rowData.olculer.toString();
                const pattern = /Ø?(\d+(?:\.\d+)?)\s*L:\s*(\d+(?:\.\d+)?)/i;
                const matches = olculer.match(pattern);
                
                if (matches) {
                    const capElement = document.getElementById('cap');
                    const uzunlukElement = document.getElementById('uzunluk');
                    
                    if (capElement) capElement.value = matches[1];
                    if (uzunlukElement) uzunlukElement.value = matches[2];
                }
            }
            
            if (rowData.formData) {
                const fields = ['cap', 'uzunluk'];
                fields.forEach(field => {
                    if (rowData.formData[field] !== undefined) {
                        const element = document.getElementById(field);
                        if (element) element.value = rowData.formData[field];
                    }
                });
            }
        }
    }

    // Malzemeyi kaydet
    const milMaterial = new MilMaterial();
    milMaterial.register();

})(window);