/**
 * Base Material Class - Tüm malzemelerin temel sınıfı
 */

(function(window) {
    'use strict';
    
    class BaseMaterial {
        constructor() {
            this.materialType = '';
            this.version = '1.0.0';
            
            // Her malzeme kendi dillerini tanımlar
            this.texts = {
                tr: {},
                en: {}
            };
            
            // Her malzeme kendi malzeme cinslerini tanımlar
            this.grades = [];
            
            // Her malzeme kendi yoğunluklarını tanımlar
            this.densities = {};
            
            // Her malzeme kendi standartlarını tanımlar
            this.standards = {};
        }

        // Mevcut dili al
        getCurrentLanguage() {
            const langSelect = document.getElementById('languageSelect');
            return langSelect ? langSelect.value : 'tr';
        }

        // Çeviri metni al
        getText(key) {
            const lang = this.getCurrentLanguage();
            return this.texts[lang]?.[key] || this.texts.tr[key] || key;
        }

        // Görüntü adını al
        getDisplayName() {
            return this.getText('display_name');
        }

        // Malzeme cinslerini al
        getGrades() {
            return this.grades;
        }

        // Yoğunluk al
        getDensity(grade) {
            return this.densities[grade] || 7850;
        }

        // Standart al
        getStandard(grade) {
            return this.standards[grade] || '-';
        }

        // UI oluştur - Override edilmeli
        createUI() {
            throw new Error('createUI method must be implemented');
        }

        // Hesaplama yap - Override edilmeli
        calculate(formData) {
            throw new Error('calculate method must be implemented');
        }

        // Validasyon
        validate(formData) {
            return { isValid: true };
        }

        // Tabloya ekle
        addToTable(formData) {
            const validation = this.validate(formData);
            if (!validation.isValid) {
                if (window.UIManager) {
                    window.UIManager.showNotification(validation.message, 'warning');
                }
                return null;
            }
            
            const calculation = this.calculate(formData);
            if (!calculation) return null;
            
            // Alt sınıflar formatRow metodunu override edebilir
            return this.formatRow(formData, calculation);
        }

        // Satır formatlama - Override edilebilir
        formatRow(formData, calculation) {
            return {
                malzemeTuru: this.getDisplayName(),
                malzemeCinsi: formData.malzemeCinsi,
                olculer: this.formatDimensions(formData),
                enNormu: this.getStandard(formData.malzemeCinsi),
                suHacmi: calculation.suHacmi || '-',
                birimAgirlik: calculation.birimAgirlik.toFixed(2),
                toplamAgirlik: calculation.toplamAgirlik.toFixed(2),
                originalType: this.materialType,
                originalGrade: formData.malzemeCinsi,
                formData: formData // Düzenleme için sakla
            };
        }

        // Ölçü formatlama - Override edilmeli
        formatDimensions(formData) {
            return '-';
        }

        // Tablodan düzenle
        editFromTable(rowData) {
            if (!rowData.formData) return false;
            
            Object.keys(rowData.formData).forEach(key => {
                const element = document.getElementById(key);
                if (element && key !== 'malzemeTuru' && key !== 'malzemeCinsi') {
                    element.value = rowData.formData[key];
                }
            });
            
            return true;
        }

        // Su hacmi var mı?
        hasWaterVolume() {
            return false;
        }

        // Malzeme cinsi seçimini oluştur
        createGradeSelector() {
            const lang = this.getCurrentLanguage();
            let html = `<select id="malzemeCinsi">`;
            
            this.grades.forEach(grade => {
                const text = typeof grade === 'object' ? grade[lang] || grade.tr : grade;
                const value = typeof grade === 'object' ? grade.value : grade;
                html += `<option value="${value}">${text}</option>`;
            });
            
            html += `</select>`;
            return html;
        }

        // Kendini kaydet
        register() {
            if (window.MaterialRegistry) {
                window.MaterialRegistry.register(this.materialType, this.constructor);
            }
        }
    }

    window.BaseMaterial = BaseMaterial;

})(window);