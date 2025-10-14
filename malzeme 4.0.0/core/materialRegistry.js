(function(window) {
    'use strict';
    
    const MaterialRegistry = {
        materials: new Map(),
        
        register(materialType, materialClass) {
            if (this.materials.has(materialType)) {
                console.warn(`Malzeme türü zaten kayıtlı: ${materialType}`);
                return false;
            }
            
            this.materials.set(materialType, materialClass);
            console.log(`Malzeme kaydedildi: ${materialType}`);
            
            // UI'yı güncelle
            this.updateMaterialSelector();
            
            return true;
        },

        unregister(materialType) {
            if (this.materials.delete(materialType)) {
                console.log(`Malzeme kaldırıldı: ${materialType}`);
                this.updateMaterialSelector();
                return true;
            }
            return false;
        },

        get(materialType) {
            return this.materials.get(materialType);
        },

        has(materialType) {
            return this.materials.has(materialType);
        },

        getAll() {
            return Array.from(this.materials.keys());
        },

        getAllWithInfo() {
            const info = [];
            this.materials.forEach((MaterialClass, type) => {
                try {
                    const instance = new MaterialClass();
                    info.push({
                        type: type,
                        displayName: instance.getDisplayName(),
                        version: instance.version || '1.0.0',
                        hasWaterVolume: instance.hasWaterVolume()
                    });
                } catch (error) {
                    console.error(`Malzeme bilgisi alınamadı: ${type}`, error);
                }
            });
            return info;
        },

        updateMaterialSelector() {
            const select = document.getElementById('malzemeTuru');
            if (!select) return;
            
            const currentValue = select.value;
            
            // İlk option'ı koru
            while (select.options.length > 1) {
                select.remove(1);
            }
            
            // Seçenek yoksa bilgi ver
            if (this.materials.size === 0) {
                select.options[0].textContent = 'Modül yükleyin...';
                return;
            }
            
            select.options[0].textContent = 'Seçiniz...';
            
            // Malzemeleri ekle
            this.materials.forEach((MaterialClass, type) => {
                try {
                    const instance = new MaterialClass();
                    const option = document.createElement('option');
                    option.value = type;
                    option.textContent = instance.getDisplayName();
                    select.appendChild(option);
                } catch (error) {
                    console.error(`Malzeme eklenemedi: ${type}`, error);
                }
            });
            
            // Önceki seçimi geri yükle
            if (currentValue && this.has(currentValue)) {
                select.value = currentValue;
            }
        },

        updateLanguage() {
            this.updateMaterialSelector();
            
            // Mevcut seçim varsa UI'yı güncelle
            const currentType = document.getElementById('malzemeTuru')?.value;
            if (currentType && window.ApplicationController) {
                window.ApplicationController.onMaterialTypeChange(currentType);
            }
        },

        clear() {
            this.materials.clear();
            this.updateMaterialSelector();
        }
    };

    window.MaterialRegistry = MaterialRegistry;

})(window);