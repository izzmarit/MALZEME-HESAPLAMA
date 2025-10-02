/**
 * Material Registry - Malzeme Kayıt Sistemi
 */

(function(window) {
    'use strict';
    
    const MaterialRegistry = {
        materials: new Map(),
        
        // Malzeme kaydet
        register: function(materialType, materialClass) {
            this.materials.set(materialType, materialClass);
            console.log(`Malzeme kaydedildi: ${materialType}`);
        },

        // Malzeme al
        get: function(materialType) {
            return this.materials.get(materialType);
        },

        // Tüm malzemeleri al
        getAll: function() {
            return Array.from(this.materials.keys());
        },

        // Malzeme var mı?
        has: function(materialType) {
            return this.materials.has(materialType);
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

        // Tabloya ekle
        addToTable: function(materialType, formData) {
            if (!this.has(materialType)) {
                console.error(`Malzeme türü bulunamadı: ${materialType}`);
                return null;
            }
            
            const MaterialClass = this.get(materialType);
            const instance = new MaterialClass();
            return instance.addToTable(formData);
        },

        // Düzenleme
        editFromTable: function(materialType, rowData) {
            if (!this.has(materialType)) {
                console.error(`Malzeme türü bulunamadı: ${materialType}`);
                return false;
            }
            
            const MaterialClass = this.get(materialType);
            const instance = new MaterialClass();
            return instance.editFromTable(rowData);
        },

        // Malzeme seçim listesi oluştur
        generateOptions: function() {
            const options = [];
            const lang = document.getElementById('languageSelect')?.value || 'tr';
            
            this.materials.forEach((MaterialClass, type) => {
                const instance = new MaterialClass();
                options.push({
                    value: type,
                    text: instance.getDisplayName()
                });
            });
            
            return options;
        },

        // Dil değişiminde güncelleme
        updateLanguage: function() {
            // UI'daki malzeme türü seçimini güncelle
            const select = document.getElementById('malzemeTuru');
            if (!select) return;
            
            const currentValue = select.value;
            const options = this.generateOptions();
            
            // İlk option'ı koru (Seçiniz...)
            while (select.options.length > 1) {
                select.remove(1);
            }
            
            options.forEach(opt => {
                const option = document.createElement('option');
                option.value = opt.value;
                option.textContent = opt.text;
                select.appendChild(option);
            });
            
            // Önceki değeri geri yükle
            if (currentValue) {
                select.value = currentValue;
            }
        }
    };

    window.MaterialRegistry = MaterialRegistry;

})(window);