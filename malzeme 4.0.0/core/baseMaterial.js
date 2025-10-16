(function(window) {
    'use strict';
    
    class BaseMaterial {
        constructor() {
            this.materialType = '';
            this.version = '1.0.0';
            this.texts = {
                tr: {},
                en: {}
            };
            this.grades = [];
            this.densities = {};
            this.standards = {};
        }

        getCurrentLanguage() {
            return window.ApplicationController?.currentLanguage || 
                   document.getElementById('languageSelect')?.value || 'tr';
        }

        getText(key) {
            const lang = this.getCurrentLanguage();
            return this.texts[lang]?.[key] || this.texts.tr[key] || key;
        }

        getDisplayName() {
            return this.getText('display_name');
        }

        getDisplayTypeFromRow(rowData) {
            // Varsayılan davranış: sadece display name döndür
            // Alt sınıflar bunu override edebilir
            return this.getDisplayName();
        }

        getGrades() {
            return this.grades;
        }

        getDensity(grade) {
            return this.densities[grade] || 7850;
        }

        getStandard(grade) {
            return this.standards[grade] || '-';
        }

        createUI() {
            console.warn('createUI metodu override edilmeli');
            return '';
        }

        calculate(formData) {
            console.warn('calculate metodu override edilmeli');
            return null;
        }

        validate(formData) {
            return { isValid: true };
        }

        formatDimensions(formData) {
            return '-';
        }

        hasWaterVolume() {
            return false;
        }

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
                formData: formData,
                metadata: this.getMetadata(formData)
            };
        }

        getMetadata(formData) {
            return {
                type: this.materialType,
                version: this.version,
                timestamp: new Date().toISOString()
            };
        }

        fillFormFromRow(rowData) {
            if (!rowData.formData) return false;
            
            Object.keys(rowData.formData).forEach(key => {
                const element = document.getElementById(key);
                if (element) {
                    element.value = rowData.formData[key];
                }
            });
            
            return true;
        }

        register() {
            if (window.MaterialRegistry) {
                window.MaterialRegistry.register(this.materialType, this.constructor);
            }
        }
    }

    window.BaseMaterial = BaseMaterial;

})(window);