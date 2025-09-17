// Malzeme Verileri ve Sabitleri Modülü
(function(window) {
    'use strict';
    
    const MaterialData = {
    // EN Norm bilgileri
    EN_NORMLARI: {
        'S235JR': 'EN 10025-2',
        'S275JR': 'EN 10025-2',
        'P235GH': 'EN 10028-2',
        'P265GH': 'EN 10028-2',
        'P295GH': 'EN 10028-2',
        'P355GH': 'EN 10028-2',
        'P355NH': 'EN 10028-3',
        '14301': 'EN 10088-2',
        '14401': 'EN 10088-2',
        '14404': 'EN 10088-2',
        '16Mo3': 'EN 10028-2'
    },

    // Malzeme yoğunlukları (kg/m³)
    YOGUNLUKLAR: {
        'S235JR': 7850,
        'S275JR': 7850,
        'P235GH': 7850,
        'P265GH': 7850,
        'P295GH': 7850,
        'P355GH': 7850,
        'P355NH': 7850,
        '14301': 8000,
        '14401': 8000,
        '14404': 8000,
        '16Mo3': 7850
    },

    // Profil verileri (kg/m ve kesit alanı cm²)
    profilVerileri: {
        ipe: {
            80: { agirlik: 6.0, kesitAlan: 7.64, h: 80, b: 46, tw: 3.8, tf: 5.2 },
            100: { agirlik: 8.1, kesitAlan: 10.3, h: 100, b: 55, tw: 4.1, tf: 5.7 },
            120: { agirlik: 10.4, kesitAlan: 13.2, h: 120, b: 64, tw: 4.4, tf: 6.3 },
            140: { agirlik: 12.9, kesitAlan: 16.4, h: 140, b: 73, tw: 4.7, tf: 6.9 },
            160: { agirlik: 15.8, kesitAlan: 20.1, h: 160, b: 82, tw: 5.0, tf: 7.4 },
            180: { agirlik: 18.8, kesitAlan: 23.9, h: 180, b: 91, tw: 5.3, tf: 8.0 },
            200: { agirlik: 22.4, kesitAlan: 28.5, h: 200, b: 100, tw: 5.6, tf: 8.5 },
            220: { agirlik: 26.2, kesitAlan: 33.4, h: 220, b: 110, tw: 5.9, tf: 9.2 },
            240: { agirlik: 30.7, kesitAlan: 39.1, h: 240, b: 120, tw: 6.2, tf: 9.8 },
            270: { agirlik: 36.1, kesitAlan: 45.9, h: 270, b: 135, tw: 6.6, tf: 10.2 },
            300: { agirlik: 42.2, kesitAlan: 53.8, h: 300, b: 150, tw: 7.1, tf: 10.7 },
            330: { agirlik: 49.1, kesitAlan: 62.6, h: 330, b: 160, tw: 7.5, tf: 11.5 },
            360: { agirlik: 57.1, kesitAlan: 72.7, h: 360, b: 170, tw: 8.0, tf: 12.7 },
            400: { agirlik: 66.3, kesitAlan: 84.5, h: 400, b: 180, tw: 8.6, tf: 13.5 },
            450: { agirlik: 77.6, kesitAlan: 98.8, h: 450, b: 190, tw: 9.4, tf: 14.6 },
            500: { agirlik: 90.7, kesitAlan: 115.5, h: 500, b: 200, tw: 10.2, tf: 16.0 },
            550: { agirlik: 106.0, kesitAlan: 134.4, h: 550, b: 210, tw: 11.1, tf: 17.2 },
            600: { agirlik: 122.0, kesitAlan: 156.0, h: 600, b: 220, tw: 12.0, tf: 19.0 }
        },
        hea: {
            100: { agirlik: 16.7, kesitAlan: 21.2, h: 96, b: 100, tw: 5.0, tf: 8.0 },
            120: { agirlik: 19.9, kesitAlan: 25.3, h: 114, b: 120, tw: 5.0, tf: 8.0 },
            140: { agirlik: 24.7, kesitAlan: 31.4, h: 133, b: 140, tw: 5.5, tf: 8.5 },
            160: { agirlik: 30.4, kesitAlan: 38.8, h: 152, b: 160, tw: 6.0, tf: 9.0 },
            180: { agirlik: 35.5, kesitAlan: 45.3, h: 171, b: 180, tw: 6.0, tf: 9.5 },
            200: { agirlik: 42.3, kesitAlan: 53.8, h: 190, b: 200, tw: 6.5, tf: 10.0 },
            220: { agirlik: 50.5, kesitAlan: 64.3, h: 210, b: 220, tw: 7.0, tf: 11.0 },
            240: { agirlik: 60.3, kesitAlan: 76.8, h: 230, b: 240, tw: 7.5, tf: 12.0 },
            260: { agirlik: 68.2, kesitAlan: 86.8, h: 250, b: 260, tw: 7.5, tf: 12.5 },
            280: { agirlik: 76.4, kesitAlan: 97.3, h: 270, b: 280, tw: 8.0, tf: 13.0 },
            300: { agirlik: 88.3, kesitAlan: 112.5, h: 290, b: 300, tw: 8.5, tf: 14.0 },
            320: { agirlik: 97.6, kesitAlan: 124.4, h: 310, b: 300, tw: 9.0, tf: 15.5 },
            340: { agirlik: 105.0, kesitAlan: 133.5, h: 330, b: 300, tw: 9.5, tf: 16.5 },
            360: { agirlik: 112.0, kesitAlan: 142.8, h: 350, b: 300, tw: 10.0, tf: 17.5 },
            400: { agirlik: 125.0, kesitAlan: 159.0, h: 390, b: 300, tw: 11.0, tf: 19.0 },
            450: { agirlik: 140.0, kesitAlan: 178.0, h: 440, b: 300, tw: 11.5, tf: 21.0 },
            500: { agirlik: 155.0, kesitAlan: 197.5, h: 490, b: 300, tw: 12.0, tf: 23.0 }
        },
        heb: {
            100: { agirlik: 20.4, kesitAlan: 26.0, h: 100, b: 100, tw: 6.0, tf: 10.0 },
            120: { agirlik: 26.7, kesitAlan: 34.0, h: 120, b: 120, tw: 6.5, tf: 11.0 },
            140: { agirlik: 33.7, kesitAlan: 43.0, h: 140, b: 140, tw: 7.0, tf: 12.0 },
            160: { agirlik: 42.6, kesitAlan: 54.3, h: 160, b: 160, tw: 8.0, tf: 13.0 },
            180: { agirlik: 51.2, kesitAlan: 65.3, h: 180, b: 180, tw: 8.5, tf: 14.0 },
            200: { agirlik: 61.3, kesitAlan: 78.1, h: 200, b: 200, tw: 9.0, tf: 15.0 },
            220: { agirlik: 71.5, kesitAlan: 91.0, h: 220, b: 220, tw: 9.5, tf: 16.0 },
            240: { agirlik: 83.2, kesitAlan: 106.0, h: 240, b: 240, tw: 10.0, tf: 17.0 },
            260: { agirlik: 93.0, kesitAlan: 118.4, h: 260, b: 260, tw: 10.0, tf: 17.5 },
            280: { agirlik: 103.5, kesitAlan: 131.4, h: 280, b: 280, tw: 10.5, tf: 18.0 },
            300: { agirlik: 117.0, kesitAlan: 149.1, h: 300, b: 300, tw: 11.0, tf: 19.0 },
            320: { agirlik: 127.0, kesitAlan: 161.3, h: 320, b: 300, tw: 11.5, tf: 20.5 },
            340: { agirlik: 134.0, kesitAlan: 170.9, h: 340, b: 300, tw: 12.0, tf: 21.5 },
            360: { agirlik: 142.0, kesitAlan: 180.6, h: 360, b: 300, tw: 12.5, tf: 22.5 },
            400: { agirlik: 155.0, kesitAlan: 197.8, h: 400, b: 300, tw: 13.5, tf: 24.0 },
            450: { agirlik: 171.0, kesitAlan: 218.0, h: 450, b: 300, tw: 14.0, tf: 26.0 },
            500: { agirlik: 187.0, kesitAlan: 239.0, h: 500, b: 300, tw: 14.5, tf: 28.0 }
        },
        npu: {
            80: { agirlik: 8.64, kesitAlan: 11.0, h: 80, b: 45, tw: 6.0, tf: 8.0 },
            100: { agirlik: 10.6, kesitAlan: 13.5, h: 100, b: 50, tw: 6.0, tf: 8.5 },
            120: { agirlik: 13.4, kesitAlan: 17.0, h: 120, b: 55, tw: 7.0, tf: 9.0 },
            140: { agirlik: 16.0, kesitAlan: 20.4, h: 140, b: 60, tw: 7.0, tf: 10.0 },
            160: { agirlik: 18.8, kesitAlan: 24.0, h: 160, b: 65, tw: 7.5, tf: 10.5 },
            180: { agirlik: 22.0, kesitAlan: 28.0, h: 180, b: 70, tw: 8.0, tf: 11.0 },
            200: { agirlik: 25.3, kesitAlan: 32.2, h: 200, b: 75, tw: 8.5, tf: 11.5 },
            220: { agirlik: 29.4, kesitAlan: 37.4, h: 220, b: 80, tw: 9.0, tf: 12.5 },
            240: { agirlik: 33.2, kesitAlan: 42.3, h: 240, b: 85, tw: 9.5, tf: 13.0 },
            260: { agirlik: 37.9, kesitAlan: 48.3, h: 260, b: 90, tw: 10.0, tf: 14.0 },
            280: { agirlik: 41.8, kesitAlan: 53.3, h: 280, b: 95, tw: 10.0, tf: 15.0 },
            300: { agirlik: 46.2, kesitAlan: 58.8, h: 300, b: 100, tw: 10.0, tf: 16.0 },
            320: { agirlik: 59.5, kesitAlan: 75.8, h: 320, b: 100, tw: 14.0, tf: 17.5 },
            350: { agirlik: 60.6, kesitAlan: 77.3, h: 350, b: 100, tw: 14.0, tf: 16.0 },
            380: { agirlik: 63.1, kesitAlan: 80.4, h: 380, b: 102, tw: 13.5, tf: 16.0 },
            400: { agirlik: 71.8, kesitAlan: 91.5, h: 400, b: 110, tw: 14.0, tf: 18.0 }
        }
    },

    // Yeni malzeme türü eklemek için şablon
    malzemeTuruSablonu: {
        olcuAlanlari: [],
        hesaplamaFonksiyonu: null
    },

    // Yeni malzeme cinsi eklemek için
    yeniMalzemeCinsiEkle: function(kod, enNormu, yogunluk) {
        this.EN_NORMLARI[kod] = enNormu;
        this.YOGUNLUKLAR[kod] = yogunluk;
        
        // LocalStorage'a kaydet
        const customMaterials = this.getCustomMaterials();
        customMaterials.push({ kod, enNormu, yogunluk });
        localStorage.setItem('customMaterials', JSON.stringify(customMaterials));
        
        return true;
    },

    // Özel malzemeleri yükle
    getCustomMaterials: function() {
        const stored = localStorage.getItem('customMaterials');
        return stored ? JSON.parse(stored) : [];
    },

    // Özel malzemeleri başlangıçta yükle
    loadCustomMaterials: function() {
        const customMaterials = this.getCustomMaterials();
        customMaterials.forEach(material => {
            this.EN_NORMLARI[material.kod] = material.enNormu;
            this.YOGUNLUKLAR[material.kod] = material.yogunluk;
        });
    },

    // Profil boyutu ekle
    yeniProfilBoyutuEkle: function(profilTipi, boyut, agirlik, kesitAlan) {
        if (this.profilVerileri[profilTipi]) {
            this.profilVerileri[profilTipi][boyut] = { agirlik, kesitAlan };
            
            // LocalStorage'a kaydet
            const customProfiles = this.getCustomProfiles();
            customProfiles.push({ profilTipi, boyut, agirlik, kesitAlan });
            localStorage.setItem('customProfiles', JSON.stringify(customProfiles));
            
            return true;
        }
        return false;
    },

    // Özel profilleri yükle
    getCustomProfiles: function() {
        const stored = localStorage.getItem('customProfiles');
        return stored ? JSON.parse(stored) : [];
    },

    // Özel profilleri başlangıçta yükle
    loadCustomProfiles: function() {
        const customProfiles = this.getCustomProfiles();
        customProfiles.forEach(profile => {
            if (this.profilVerileri[profile.profilTipi]) {
                this.profilVerileri[profile.profilTipi][profile.boyut] = {
                    agirlik: profile.agirlik,
                    kesitAlan: profile.kesitAlan
                };
            }
        });
    },

    // Tüm özel verileri temizle
    clearCustomData: function() {
        localStorage.removeItem('customMaterials');
        localStorage.removeItem('customProfiles');
    },

    // Başlangıçta tüm özel verileri yükle
    initialize: function() {
        this.loadCustomMaterials();
        this.loadCustomProfiles();
    },

    // Malzeme formatı
    formatMalzemeCinsi: function(kod) {
        if (kod.includes('14')) {
            return '1.' + kod;
        }
        return kod;
    }
};

// Modülü window objesine bağla - ELECTRON İÇİN KRİTİK
window.MaterialData = MaterialData;

})(window);