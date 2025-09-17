// Hesaplama İşlemleri Modülü
(function(window) {
    'use strict';
    
    const Calculator = {
    // Mevcut hesaplama sonuçları
    currentCalculation: {
        birimAgirlik: 0,
        toplamAgirlik: 0,
        suHacmi: 0,
        olculer: '',
        malzemeTuru: '',
        malzemeCinsi: ''
    },

    // Ana hesaplama fonksiyonu
    calculate: function() {
        const tur = document.getElementById('malzemeTuru').value;
        const malzemeCinsi = document.getElementById('malzemeCinsi').value;
        const yogunluk = MaterialData.YOGUNLUKLAR[malzemeCinsi];
        const adet = parseFloat(document.getElementById('adet').value) || 1;
        
        if (!tur) {
            this.showNotification('Lütfen malzeme türü seçin!', 'warning');
            return false;
        }
        
        let birimAgirlik = 0;
        let birimSuHacmi = 0;
        let toplamSuHacmi = 0;
        let olculer = '';
        
        try {
            switch(tur) {
                case 'sac':
                    const sacResult = this.calculateSac(yogunluk);
                    birimAgirlik = sacResult.agirlik;
                    olculer = sacResult.olculer;
                    break;
                    
                case 'lama':
                    const lamaResult = this.calculateLama(yogunluk);
                    birimAgirlik = lamaResult.agirlik;
                    olculer = lamaResult.olculer;
                    break;
                    
                case 'boru':
                    const boruResult = this.calculateBoru(yogunluk);
                    birimAgirlik = boruResult.agirlik;
                    birimSuHacmi = boruResult.suHacmi;
                    toplamSuHacmi = birimSuHacmi * adet;
                    olculer = boruResult.olculer;
                    break;
                    
                case 'kosebent':
                    const kosebentResult = this.calculateKosebent(yogunluk);
                    birimAgirlik = kosebentResult.agirlik;
                    olculer = kosebentResult.olculer;
                    break;
                    
                case 'kutu':
                    const kutuResult = this.calculateKutu(yogunluk);
                    birimAgirlik = kutuResult.agirlik;
                    olculer = kutuResult.olculer;
                    break;
                    
                case 'ipe':
                case 'hea':
                case 'heb':
                case 'npu':
                    const profilResult = this.calculateProfil(tur);
                    birimAgirlik = profilResult.agirlik;
                    olculer = profilResult.olculer;
                    break;
            }
            
            // Sonuçları kaydet
            this.currentCalculation = {
                birimAgirlik: birimAgirlik,
                toplamAgirlik: birimAgirlik * adet,
                suHacmi: toplamSuHacmi,
                olculer: olculer,
                malzemeTuru: tur,
                malzemeCinsi: malzemeCinsi
            };
            
            // UI'ı güncelle
            this.updateResultsUI();
            
            return true;
            
        } catch (error) {
            console.error('Hesaplama hatası:', error);
            this.showNotification('Hesaplama sırasında bir hata oluştu. Lütfen değerleri kontrol edin.', 'error');
            return false;
        }
    },

    // Sac hesaplama
    calculateSac: function(yogunluk) {
        const kalinlik = parseFloat(document.getElementById('kalinlik').value) || 0;
        const en = parseFloat(document.getElementById('en').value) || 0;
        const boy = parseFloat(document.getElementById('boy').value) || 0;
        
        const hacim = (kalinlik * en * boy) / 1000000000; // m³
        const agirlik = hacim * yogunluk;
        const olculer = `${kalinlik}x${en}x${boy}mm`;
        
        return { agirlik, olculer };
    },

    // Lama hesaplama
    calculateLama: function(yogunluk) {
        const kalinlik = parseFloat(document.getElementById('kalinlik').value) || 0;
        const genislik = parseFloat(document.getElementById('genislik').value) || 0;
        const uzunluk = parseFloat(document.getElementById('uzunluk').value) || 0;
        
        const hacim = (kalinlik * genislik * uzunluk) / 1000000000; // m³
        const agirlik = hacim * yogunluk;
        const olculer = `${kalinlik}x${genislik}x${uzunluk}mm`;
        
        return { agirlik, olculer };
    },

    // Boru hesaplama
    calculateBoru: function(yogunluk) {
        const disCap = parseFloat(document.getElementById('disCap').value) || 0;
        const etKalinlik = parseFloat(document.getElementById('etKalinlik').value) || 0;
        const uzunluk = parseFloat(document.getElementById('uzunluk').value) || 0;
        
        const icCap = disCap - (2 * etKalinlik);
        const disAlan = Math.PI * Math.pow(disCap/2, 2);
        const icAlan = Math.PI * Math.pow(icCap/2, 2);
        const kesitAlan = disAlan - icAlan;
        
        const hacim = (kesitAlan * uzunluk) / 1000000000; // m³
        const agirlik = hacim * yogunluk;
        const suHacmi = (icAlan * uzunluk) / 1000000; // litre
        const olculer = `Ø${disCap}x${etKalinlik}x${uzunluk}mm`;
        
        return { agirlik, suHacmi, olculer };
    },

    // Köşebent hesaplama
    calculateKosebent: function(yogunluk) {
        const kenar1 = parseFloat(document.getElementById('kenar1').value) || 0;
        const kenar2 = parseFloat(document.getElementById('kenar2').value) || 0;
        const etKalinlik = parseFloat(document.getElementById('etKalinlik').value) || 0;
        const uzunluk = parseFloat(document.getElementById('uzunluk').value) || 0;
        
        const alan = (kenar1 + kenar2 - etKalinlik) * etKalinlik;
        const hacim = (alan * uzunluk) / 1000000000; // m³
        const agirlik = hacim * yogunluk;
        const olculer = `L${kenar1}x${kenar2}x${etKalinlik}x${uzunluk}mm`;
        
        return { agirlik, olculer };
    },

    // Kutu profil hesaplama
    calculateKutu: function(yogunluk) {
        const genislik = parseFloat(document.getElementById('genislik').value) || 0;
        const yukseklik = parseFloat(document.getElementById('yukseklik').value) || 0;
        const etKalinlik = parseFloat(document.getElementById('etKalinlik').value) || 0;
        const uzunluk = parseFloat(document.getElementById('uzunluk').value) || 0;
        
        const disAlan = genislik * yukseklik;
        const icAlan = (genislik - 2*etKalinlik) * (yukseklik - 2*etKalinlik);
        const kesitAlan = disAlan - icAlan;
        
        const hacim = (kesitAlan * uzunluk) / 1000000000; // m³
        const agirlik = hacim * yogunluk;
        const olculer = `${genislik}x${yukseklik}x${etKalinlik}x${uzunluk}mm`;
        
        return { agirlik, olculer };
    },

    // Standart profil hesaplama (IPE, HEA, HEB, NPU)
    calculateProfil: function(tur) {
        const boyut = document.getElementById('profilBoyutu').value;
        const uzunluk = parseFloat(document.getElementById('uzunluk').value) || 0;
        
        const profilVeri = MaterialData.profilVerileri[tur][boyut];
        if (!profilVeri) {
            throw new Error('Profil verisi bulunamadı');
        }
        
        const agirlik = (profilVeri.agirlik * uzunluk) / 1000; // kg
        const olculer = `${tur.toUpperCase()} ${boyut}x${uzunluk}mm`;
        
        return { agirlik, olculer };
    },

    // Ölçü metninden ağırlık hesaplama (düzenleme için)
    calculateFromDimensions: function(tur, olculer, malzemeCinsi) {
        const yogunluk = MaterialData.YOGUNLUKLAR[malzemeCinsi];
        const degerler = olculer.match(/[\d.]+/g);
        if (!degerler) return 0;
        
        let birimAgirlik = 0;
        
        switch(tur) {
            case 'sac':
                if (degerler.length >= 3) {
                    const kalinlik = parseFloat(degerler[0]);
                    const en = parseFloat(degerler[1]);
                    const boy = parseFloat(degerler[2]);
                    const hacim = (kalinlik * en * boy) / 1000000000;
                    birimAgirlik = hacim * yogunluk;
                }
                break;
                
            case 'lama':
                if (degerler.length >= 3) {
                    const kalinlik = parseFloat(degerler[0]);
                    const genislik = parseFloat(degerler[1]);
                    const uzunluk = parseFloat(degerler[2]);
                    const hacim = (kalinlik * genislik * uzunluk) / 1000000000;
                    birimAgirlik = hacim * yogunluk;
                }
                break;
                
            case 'boru':
                if (degerler.length >= 3) {
                    const disCap = parseFloat(degerler[0]);
                    const etKalinlik = parseFloat(degerler[1]);
                    const uzunluk = parseFloat(degerler[2]);
                    const icCap = disCap - (2 * etKalinlik);
                    const disAlan = Math.PI * Math.pow(disCap/2, 2);
                    const icAlan = Math.PI * Math.pow(icCap/2, 2);
                    const kesitAlan = disAlan - icAlan;
                    const hacim = (kesitAlan * uzunluk) / 1000000000;
                    birimAgirlik = hacim * yogunluk;
                }
                break;
                
            case 'kosebent':
                if (degerler.length >= 4) {
                    const kenar1 = parseFloat(degerler[0]);
                    const kenar2 = parseFloat(degerler[1]);
                    const etKalinlik = parseFloat(degerler[2]);
                    const uzunluk = parseFloat(degerler[3]);
                    const alan = (kenar1 + kenar2 - etKalinlik) * etKalinlik;
                    const hacim = (alan * uzunluk) / 1000000000;
                    birimAgirlik = hacim * yogunluk;
                }
                break;
                
            case 'kutu':
                if (degerler.length >= 4) {
                    const genislik = parseFloat(degerler[0]);
                    const yukseklik = parseFloat(degerler[1]);
                    const etKalinlik = parseFloat(degerler[2]);
                    const uzunluk = parseFloat(degerler[3]);
                    const disAlan = genislik * yukseklik;
                    const icAlan = (genislik - 2*etKalinlik) * (yukseklik - 2*etKalinlik);
                    const kesitAlan = disAlan - icAlan;
                    const hacim = (kesitAlan * uzunluk) / 1000000000;
                    birimAgirlik = hacim * yogunluk;
                }
                break;
                
            case 'ipe':
            case 'hea':
            case 'heb':
            case 'npu':
                if (degerler.length >= 2) {
                    const boyut = degerler[0];
                    const uzunluk = parseFloat(degerler[1]);
                    const profilVeri = MaterialData.profilVerileri[tur][boyut];
                    if (profilVeri) {
                        birimAgirlik = (profilVeri.agirlik * uzunluk) / 1000;
                    }
                }
                break;
        }
        
        return birimAgirlik;
    },

    // Su hacmi hesaplama (ölçü metninden)
    calculateWaterVolumeFromDimensions: function(olculer) {
        const degerler = olculer.match(/[\d.]+/g);
        if (!degerler || degerler.length < 3) return 0;
        
        const disCap = parseFloat(degerler[0]);
        const etKalinlik = parseFloat(degerler[1]);
        const uzunluk = parseFloat(degerler[2]);
        const icCap = disCap - (2 * etKalinlik);
        const icAlan = Math.PI * Math.pow(icCap/2, 2);
        const suHacmi = (icAlan * uzunluk) / 1000000; // Litre
        
        return suHacmi;
    },

    // Sonuçları UI'a yansıt
    updateResultsUI: function() {
        document.getElementById('birimAgirlik').textContent = 
            this.currentCalculation.birimAgirlik.toFixed(2);
        document.getElementById('toplamAgirlik').textContent = 
            this.currentCalculation.toplamAgirlik.toFixed(2);
        
        if (this.currentCalculation.malzemeTuru === 'boru') {
            document.getElementById('suHacmi').textContent = 
                this.currentCalculation.suHacmi.toFixed(2);
        }
    },

    // Form temizleme
    clearForm: function() {
        document.getElementById('malzemeTuru').value = '';
        document.getElementById('adet').value = '1';
        document.getElementById('heatNo').value = '';
        document.getElementById('olcuAlanlari').innerHTML = '';
        document.getElementById('birimAgirlik').textContent = '0.00';
        document.getElementById('toplamAgirlik').textContent = '0.00';
        document.getElementById('suHacmi').textContent = '0.00';
        document.getElementById('suHacmiCard').style.display = 'none';
        
        this.currentCalculation = {
            birimAgirlik: 0,
            toplamAgirlik: 0,
            suHacmi: 0,
            olculer: '',
            malzemeTuru: '',
            malzemeCinsi: ''
        };
    },

    // Bildirim göster
    showNotification: function(message, type = 'info') {
        // Bu fonksiyon UI Manager tarafından override edilecek
        alert(message);
    }
};

// Modülü window objesine bağla - ELECTRON İÇİN KRİTİK
window.Calculator = Calculator;

})(window);