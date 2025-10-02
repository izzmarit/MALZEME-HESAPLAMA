/**
 * SAC (Sheet Metal) Material Module
 * Sac levha malzemesi
 */

import BaseMaterial from './base/baseMaterial.js';

const SacMaterial = new BaseMaterial({
    id: 'sac',
    
    names: {
        tr: 'Sac',
        en: 'Sheet Metal'
    },
    
    density: 7.85,
    
    displayFields: [
        { 
            id: 'en', 
            label: { tr: 'En (mm)', en: 'Width (mm)' }, 
            type: 'number' 
        },
        { 
            id: 'boy', 
            label: { tr: 'Boy (mm)', en: 'Length (mm)' }, 
            type: 'number' 
        },
        { 
            id: 'kalinlik', 
            label: { tr: 'Kalınlık (mm)', en: 'Thickness (mm)' }, 
            type: 'number' 
        }
    ],
    
    calculateWeight: function(dimensions, quantity, density) {
        const { en, boy, kalinlik } = dimensions;
        
        if (!en || !boy || !kalinlik) {
            throw new Error('Tüm ölçüler girilmelidir');
        }
        
        // Alan (mm² → m²)
        const alanM2 = (en * boy) / 1000000;
        
        // Kalınlık (mm → m)
        const kalinlikM = kalinlik / 1000;
        
        // Hacim (m³)
        const hacim = alanM2 * kalinlikM;
        
        // Ağırlık (kg)
        const agirlik = hacim * density * 1000;
        
        return agirlik * quantity;
    },
    
    getFilterOptions: function() {
        return {
            filterType: 'sac',
            fields: [
                {
                    id: 'en',
                    label: { tr: 'En (mm)', en: 'Width (mm)' },
                    type: 'select',
                    options: [1000, 1250, 1500, 2000, 2500, 3000]
                },
                {
                    id: 'boy',
                    label: { tr: 'Boy (mm)', en: 'Length (mm)' },
                    type: 'select',
                    options: [2000, 2500, 3000, 4000, 5000, 6000]
                },
                {
                    id: 'kalinlik',
                    label: { tr: 'Kalınlık (mm)', en: 'Thickness (mm)' },
                    type: 'select',
                    options: [0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.2, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0, 6.0, 8.0, 10.0, 12.0, 15.0, 20.0, 25.0, 30.0]
                }
            ]
        };
    },
    
    applyFilter: function(selectedValues) {
        const result = {};
        
        if (selectedValues.en) result.en = selectedValues.en;
        if (selectedValues.boy) result.boy = selectedValues.boy;
        if (selectedValues.kalinlik) result.kalinlik = selectedValues.kalinlik;
        
        return Object.keys(result).length > 0 ? result : null;
    }
});

window.SacMaterial = SacMaterial;
export default SacMaterial;