// Malzeme Kayıt Sistemi
(function(window) {
    'use strict';
    
    const MaterialRegistry = {
        materials: new Map(),
        loadedMaterials: new Set(),
        
        // Malzeme türü kaydet
        register: function(materialType, materialClass) {
            this.materials.set(materialType, materialClass);
            this.loadedMaterials.add(materialType);
            console.log(`Malzeme türü kaydedildi: ${materialType}`);
        },

        // Malzeme türü al
        get: function(materialType) {
            return this.materials.get(materialType);
        },

        // Tüm malzeme türlerini al
        getAll: function() {
            return Array.from(this.materials.keys());
        },

        // Malzeme türü var mı kontrol et
        has: function(materialType) {
            return this.materials.has(materialType);
        },

        // Malzeme türü yüklendi mi kontrol et
        isLoaded: function(materialType) {
            return this.loadedMaterials.has(materialType);
        },

        // Malzeme türü seçeneklerini oluştur
        generateOptions: function(language = 'tr') {
            const materials = this.getAll();
            return materials.map(type => {
                const MaterialClass = this.get(type);
                const instance = new MaterialClass();
                const texts = instance.getTexts();
                return {
                    value: type,
                    text: texts[language]?.display_name || instance.getDisplayName(),
                    langKey: instance.getLangKey()
                };
            });
        },

        // UI oluştur
        createUI: function(materialType) {
            if (!this.has(materialType)) {
                console.error(`Malzeme türü bulunamadı: ${materialType}`);
                return '';
            }
            
            const MaterialClass = this.get(materialType);
            const instance = new MaterialClass();
            return instance.createUI();
        },

        // Hesaplama yap
        calculate: function(materialType, formData) {
            if (!this.has(materialType)) {
                console.error(`Malzeme türü bulunamadı: ${materialType}`);
                return null;
            }
            
            const MaterialClass = this.get(materialType);
            const instance = new MaterialClass();
            return instance.calculate(formData);
        },

        // Validasyon yap
        validate: function(materialType, formData) {
            if (!this.has(materialType)) {
                console.error(`Malzeme türü bulunamadı: ${materialType}`);
                return { isValid: false, message: 'Malzeme türü bulunamadı' };
            }
            
            const MaterialClass = this.get(materialType);
            const instance = new MaterialClass();
            return instance.validate(formData);
        },

        // Malzeme türü metinlerini al
        getTexts: function(materialType) {
            if (!this.has(materialType)) {
                return {};
            }
            
            const MaterialClass = this.get(materialType);
            const instance = new MaterialClass();
            return instance.getTexts();
        },

        // Tüm malzeme türü metinlerini yükle
        loadAllTexts: function() {
            const allTexts = {};
            this.materials.forEach((MaterialClass, type) => {
                const instance = new MaterialClass();
                const texts = instance.getTexts();
                
                Object.keys(texts).forEach(lang => {
                    if (!allTexts[lang]) {
                        allTexts[lang] = {};
                    }
                    Object.assign(allTexts[lang], texts[lang]);
                });
            });
            
            return allTexts;
        },

        // Malzeme türünü tabloya ekle
        addToTable: function(materialType, formData) {
            if (!this.has(materialType)) {
                console.error(`Malzeme türü bulunamadı: ${materialType}`);
                return null;
            }
            
            const MaterialClass = this.get(materialType);
            const instance = new MaterialClass();
            return instance.addToTable(formData);
        },

        // Malzeme türünü düzenle
        editFromTable: function(materialType, rowData) {
            if (!this.has(materialType)) {
                console.error(`Malzeme türü bulunamadı: ${materialType}`);
                return false;
            }
            
            const MaterialClass = this.get(materialType);
            const instance = new MaterialClass();
            return instance.editFromTable(rowData);
        },

        // Filtreleme desteği
        getFilterOptions: function(materialType) {
            if (!this.has(materialType)) {
                return [];
            }
            
            const MaterialClass = this.get(materialType);
            const instance = new MaterialClass();
            return instance.getFilterOptions ? instance.getFilterOptions() : [];
        },

        // Debug bilgisi
        debug: function() {
            console.log('Kayıtlı malzeme türleri:', Array.from(this.materials.keys()));
            console.log('Yüklenen malzeme türleri:', Array.from(this.loadedMaterials));
            
            this.materials.forEach((MaterialClass, type) => {
                const instance = new MaterialClass();
                console.log(`${type}:`, {
                    displayName: instance.getDisplayName(),
                    langKey: instance.getLangKey(),
                    hasCalculate: typeof instance.calculate === 'function',
                    hasCreateUI: typeof instance.createUI === 'function',
                    hasValidate: typeof instance.validate === 'function'
                });
            });
        }
    };

    // Modülü window objesine bağla
    window.MaterialRegistry = MaterialRegistry;

})(window);