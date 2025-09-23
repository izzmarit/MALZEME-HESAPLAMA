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
        let malzemeCinsi = '';
        let yogunluk = 7850; // Varsayılan yoğunluk
        
        // Özel malzeme kontrolü
        if (tur === 'ozelMalzeme') {
            malzemeCinsi = document.getElementById('ozelMalzemeCinsi')?.value || 'Özel';
            // Özel malzeme için yoğunluk gerekli değil
        } else if (tur === 'izgara') {
            const izgaraTipi = document.getElementById('izgaraTipi').value;
            if (izgaraTipi) {
                const izgaraData = MaterialData.izgaraElemanlari[izgaraTipi];
                if (izgaraData) {
                    malzemeCinsi = izgaraData.malzeme;
                    yogunluk = MaterialData.YOGUNLUKLAR[malzemeCinsi] || 7850;
                }
            }
        } else {
            malzemeCinsi = document.getElementById('malzemeCinsi').value;
            yogunluk = MaterialData.YOGUNLUKLAR[malzemeCinsi];
        }
        
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
                
                case 'flans':
                    const flansResult = this.calculateFlans();
                    birimAgirlik = flansResult.agirlik;
                    olculer = flansResult.olculer;
                    break;

                case 'ozelFlans':
                    const ozelFlansResult = this.calculateOzelFlans(yogunluk);
                    birimAgirlik = ozelFlansResult.agirlik;
                    olculer = ozelFlansResult.olculer;
                    break;

                case 'mil':
                    const milResult = this.calculateMil(yogunluk);
                    birimAgirlik = milResult.agirlik;
                    olculer = milResult.olculer;
                    break;

                case 'dirsek':
                    const dirsekResult = this.calculateDirsek();
                    birimAgirlik = dirsekResult.agirlik;
                    olculer = dirsekResult.olculer;
                    break;

                case 'izgara':
                    const izgaraResult = this.calculateIzgara();
                    birimAgirlik = izgaraResult.agirlik;
                    olculer = izgaraResult.olculer;
                    break;

                case 'ozelMalzeme':
                    const ozelMalzemeResult = this.calculateOzelMalzeme();
                    birimAgirlik = ozelMalzemeResult.agirlik;
                    olculer = ozelMalzemeResult.olculer;
                    break;
                    
                case 'ipe':
                case 'hea':
                case 'heb':
                case 'npu':
                case 'npi':
                    const profilResult = this.calculateProfil(tur);
                    birimAgirlik = profilResult.agirlik;
                    olculer = profilResult.olculer;
                    break;

                default:
                // Özel malzeme türü kontrolü
                const typeData = MaterialData.getAllMaterialTypes()[tur];
                if (typeData && typeData.custom) {
                    const customResult = this.calculateCustomType(tur, yogunluk);
                    birimAgirlik = customResult.agirlik;
                    olculer = customResult.olculer;
                } else {
                    console.error('Bilinmeyen malzeme türü:', tur);
                    this.showNotification('Bu malzeme türü için hesaplama yapılamadı', 'error');
                    return false;
                }
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

    // Özel malzeme türleri için hesaplama
    calculateCustomType: function(tur, yogunluk) {
        const typeData = MaterialData.getAllMaterialTypes()[tur];
        
        if (!typeData || !typeData.custom) {
            throw new Error('Özel malzeme türü bilgisi bulunamadı');
        }
        
        // Birim ağırlık girişi kontrolü
        if (typeData.hesaplamaTipi === 'birimAgirlik') {
            const birimAgirlikInput = document.getElementById('customBirimAgirlik');
            const olculerInput = document.getElementById('customOlculer');
            
            const agirlik = parseFloat(birimAgirlikInput ? birimAgirlikInput.value : 0) || 0;
            const olculer = olculerInput ? olculerInput.value : '';
            
            return { agirlik, olculer };
        }
        
        // Normal hesaplama
        const olcuDegerleri = [];
        let olculerText = '';
        
        if (typeData.olcuAlanlari && typeData.olcuAlanlari.length > 0) {
            typeData.olcuAlanlari.forEach((alan, index) => {
                const alanKodu = typeof alan === 'object' ? alan.kod : alan;
                const alanTanim = typeof alan === 'object' ? alan : 
                    MaterialData.OLCU_ALAN_TIPLERI.find(t => t.kod === alanKodu);
                
                const input = document.getElementById(alanKodu);
                if (!input) {
                    throw new Error(`${alanKodu} alanı bulunamadı`);
                }
                
                const deger = parseFloat(input.value) || 0;
                olcuDegerleri.push(deger);
                
                // Ölçüler metnini oluştur (sembol varsa ekle)
                if (index > 0) olculerText += 'x';
                
                if (alanTanim && alanTanim.tip === 'cap') {
                    olculerText += 'Ø';
                } else if (alanTanim && alanTanim.sembol) {
                    olculerText += alanTanim.sembol;
                }
                
                olculerText += deger;
            });
            
            olculerText += typeData.birim || 'mm';
        }
        
        // Hesaplama tipine göre ağırlık hesapla
        let agirlik = 0;
        
        switch (typeData.hesaplamaTipi) {
            case 'silindir':
                if (olcuDegerleri.length >= 2) {
                    const cap = olcuDegerleri[0];
                    const boy = olcuDegerleri[1];
                    const alan = Math.PI * Math.pow(cap / 2, 2);
                    const hacim = (alan * boy) / 1000000000;
                    agirlik = hacim * yogunluk;
                }
                break;
                
            case 'boru':
                if (olcuDegerleri.length >= 3) {
                    const disCap = olcuDegerleri[0];
                    const etKalinlik = olcuDegerleri[1];
                    const uzunluk = olcuDegerleri[2];
                    const icCap = disCap - (2 * etKalinlik);
                    const disAlan = Math.PI * Math.pow(disCap / 2, 2);
                    const icAlan = Math.PI * Math.pow(icCap / 2, 2);
                    const kesitAlan = disAlan - icAlan;
                    const hacim = (kesitAlan * uzunluk) / 1000000000;
                    agirlik = hacim * yogunluk;
                }
                break;
                
            default: // 'hacim' veya diğerleri
                let hacim = 1;
                olcuDegerleri.forEach(deger => {
                    hacim *= deger;
                });
                
                let donusumFaktoru = 1000000000;
                if (typeData.birim === 'cm') {
                    donusumFaktoru = 1000000;
                } else if (typeData.birim === 'm') {
                    donusumFaktoru = 1;
                }
                
                const hacimM3 = hacim / donusumFaktoru;
                agirlik = hacimM3 * yogunluk;
                break;
        }
        
        return { agirlik, olculer: olculerText };
    },

    calculateOzelMalzeme: function() {
        const birimAgirlikInput = document.getElementById('ozelMalzemeBirimAgirlik');
        const olculerInput = document.getElementById('ozelMalzemeOlculer');
        
        const agirlik = parseFloat(birimAgirlikInput ? birimAgirlikInput.value : 0) || 0;
        const olculer = olculerInput ? olculerInput.value : '';
        
        // Özel malzeme bilgilerini sakla
        this.currentCalculation.ozelMalzemeTuru = document.getElementById('ozelMalzemeTuru')?.value || 'Özel Malzeme';
        this.currentCalculation.ozelMalzemeCinsi = document.getElementById('ozelMalzemeCinsi')?.value || '';
        this.currentCalculation.ozelMalzemeNorm = document.getElementById('ozelMalzemeNorm')?.value || '';
        
        return { agirlik, olculer };
    },

    // Izgara elemanı hesaplama
    calculateIzgara: function() {
        const izgaraTipi = document.getElementById('izgaraTipi').value;
        
        if (!izgaraTipi) {
            throw new Error('Izgara elemanı tipi seçilmedi');
        }
        
        const izgaraData = MaterialData.izgaraElemanlari[izgaraTipi];
        if (!izgaraData) {
            throw new Error('Izgara verisi bulunamadı');
        }
        
        const agirlik = izgaraData.adetKg;
        const olculer = izgaraData.olcu;
        
        // Izgara için özel bilgileri sakla
        this.currentCalculation.izgaraTipi = izgaraTipi;
        this.currentCalculation.izgaraMalzeme = izgaraData.malzeme;
        this.currentCalculation.izgaraNorm = izgaraData.norm;
        
        return { agirlik, olculer };
    },

    // Flanş hesaplama
    calculateFlans: function() {
        const flansTipi = document.getElementById('flansTipi').value;
        const dnOlcusu = document.getElementById('dnOlcusu').value;
        const pnSinifi = document.getElementById('pnSinifi').value;
        
        const flansData = MaterialData.flansVerileri[flansTipi];
        let agirlik = 0;
        
        if (flansData && flansData[dnOlcusu] && flansData[dnOlcusu][pnSinifi]) {
            agirlik = flansData[dnOlcusu][pnSinifi];
        }
        
        // Sadece DN ve PN bilgisi
        const olculer = `DN${dnOlcusu} ${pnSinifi}`;
        
        // Flanş tipi bilgisini de sakla (tabloya eklerken kullanmak için)
        this.currentCalculation.flansTipi = flansTipi;
        
        return { agirlik, olculer };
    },

    // Özel flanş hesaplama
    calculateOzelFlans: function(yogunluk) {
        const disCap = parseFloat(document.getElementById('ozelFlansDis').value) || 0;
        const icCap = parseFloat(document.getElementById('ozelFlansIc').value) || 0;
        const kalinlik = parseFloat(document.getElementById('ozelFlansKalinlik').value) || 0;
        
        // Dış alan (mm²)
        const disAlan = Math.PI * Math.pow(disCap/2, 2);
        // İç alan (mm²)
        const icAlan = Math.PI * Math.pow(icCap/2, 2);
        // Net alan (mm²)
        const netAlan = disAlan - icAlan;
        
        // Hacim (m³)
        const hacim = (netAlan * kalinlik) / 1000000000;
        // Ağırlık (kg)
        const agirlik = hacim * yogunluk;
        
        // Ölçüler formatı: Ø200xØ150x50
        const olculer = `Ø${disCap}xØ${icCap}x${kalinlik}mm`;
        
        return { agirlik, olculer };
    },

    // Mil hesaplama
    calculateMil: function(yogunluk) {
        const cap = parseFloat(document.getElementById('milCap').value) || 0;
        const boy = parseFloat(document.getElementById('milBoy').value) || 0;
        
        // Alan (mm²)
        const alan = Math.PI * Math.pow(cap/2, 2);
        
        // Hacim (m³)
        const hacim = (alan * boy) / 1000000000;
        // Ağırlık (kg)
        const agirlik = hacim * yogunluk;
        
        // Ölçüler formatı: Ø50x200
        const olculer = `Ø${cap}x${boy}mm`;
        
        return { agirlik, olculer };
    },

    // Dirsek hesaplama
    calculateDirsek: function() {
        const dirsekTipi = document.getElementById('dirsekTipi').value;
        const dirsekCap = document.getElementById('dirsekCap').value;
        const etKalinlik = document.getElementById('dirsekEtKalinlik').value;
        
        if (!dirsekTipi || !dirsekCap || !etKalinlik) {
            throw new Error('Lütfen tüm dirsek bilgilerini seçin');
        }
        
        // Çaptan DN değerine dönüşüm için map
        const capDnMap = {
            '21.3': '15', '26.9': '20', '33.7': '25', '42.4': '32',
            '48.3': '40', '60.3': '50', '76.1': '65', '88.9': '80',
            '114.3': '100', '141.3': '125', '168.3': '150', '219.1': '200',
            '273.0': '250', '323.9': '300'
        };
        
        const dnOlcusu = capDnMap[dirsekCap];
        const dirsekData = MaterialData.dirsekVerileri[dirsekTipi];
        let agirlik = 0;
        
        if (dirsekData && dirsekData[dnOlcusu] && dirsekData[dnOlcusu][etKalinlik]) {
            agirlik = dirsekData[dnOlcusu][etKalinlik];
        } else {
            // Tabloda yoksa basit bir hesaplama yap
            const yogunluk = MaterialData.YOGUNLUKLAR[document.getElementById('malzemeCinsi').value] || 7850;
            const r = parseFloat(dirsekCap) * 1.5; // Long radius
            const aci = parseInt(dirsekTipi) || 90;
            const hacim = Math.PI * r * (Math.PI * aci / 180) * ((parseFloat(dirsekCap) - parseFloat(etKalinlik)) * parseFloat(etKalinlik));
            agirlik = (hacim * yogunluk) / 1000000000;
        }
        
        const olculer = `${dirsekTipi}° Ø${dirsekCap}x${etKalinlik}mm`;
        
        return { agirlik, olculer };
    },

    // DN değerinden dış çap hesaplama yardımcı fonksiyonu
    getDirsekDisCap: function(dn) {
        const dnCapMap = {
            '15': 21.3,
            '20': 26.9,
            '25': 33.7,
            '32': 42.4,
            '40': 48.3,
            '50': 60.3,
            '65': 76.1,
            '80': 88.9,
            '100': 114.3,
            '125': 141.3,
            '150': 168.3,
            '200': 219.1,
            '250': 273.0,
            '300': 323.9,
            '350': 355.6,
            '400': 406.4
        };
        return dnCapMap[dn] || 0;
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

                case 'flans':
                    // Bu fonksiyon düzenleme sırasında çağrılır
                    // Flanş için ağırlık hesaplama işlemi tableManager'da yapılıyor
                    // Bu yüzden burada 0 döndürüyoruz
                    birimAgirlik = 0;
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

            case 'ozelFlans':
                // Ölçü metninden değerleri çıkar: Ø200xØ150x50mm
                const ozelFlansMatch = olculer.match(/Ø([\d.]+)xØ([\d.]+)x([\d.]+)/);
                if (ozelFlansMatch) {
                    const disCap = parseFloat(ozelFlansMatch[1]);
                    const icCap = parseFloat(ozelFlansMatch[2]);
                    const kalinlik = parseFloat(ozelFlansMatch[3]);
                    
                    const disAlan = Math.PI * Math.pow(disCap/2, 2);
                    const icAlan = Math.PI * Math.pow(icCap/2, 2);
                    const netAlan = disAlan - icAlan;
                    const hacim = (netAlan * kalinlik) / 1000000000;
                    birimAgirlik = hacim * yogunluk;
                }
                break;

            case 'mil':
                // Ölçü metninden değerleri çıkar: Ø50x200mm
                const milMatch = olculer.match(/Ø([\d.]+)x([\d.]+)/);
                if (milMatch) {
                    const cap = parseFloat(milMatch[1]);
                    const boy = parseFloat(milMatch[2]);
                    
                    const alan = Math.PI * Math.pow(cap/2, 2);
                    const hacim = (alan * boy) / 1000000000;
                    birimAgirlik = hacim * yogunluk;
                }
                break;

            case 'dirsek':
                // Ölçü formatı: 90° Ø88,9x3,2mm
                const dirsekMatch = olculer.match(/(\d+)°\s*Ø([\d.,]+)x([\d.,]+)/);
                if (dirsekMatch) {
                    const aci = dirsekMatch[1];
                    const cap = parseFloat(dirsekMatch[2].replace(',', '.'));
                    const etKalinlik = dirsekMatch[3].replace(',', '.');
                    
                    // Çaptan DN değerine dönüşüm
                    const capDnMap = {
                        '21.3': '15', '26.9': '20', '33.7': '25', '42.4': '32',
                        '48.3': '40', '60.3': '50', '76.1': '65', '88.9': '80',
                        '114.3': '100', '141.3': '125', '168.3': '150', '219.1': '200',
                        '273.0': '250', '323.9': '300'
                    };
                    
                    const dnOlcusu = capDnMap[cap.toString()];
                    
                    if (dnOlcusu && MaterialData.dirsekVerileri[aci]) {
                        const dirsekData = MaterialData.dirsekVerileri[aci];
                        if (dirsekData[dnOlcusu] && dirsekData[dnOlcusu][etKalinlik]) {
                            birimAgirlik = dirsekData[dnOlcusu][etKalinlik];
                        }
                    }
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
            case 'npi':
                if (degerler.length >= 2) {
                    const boyut = degerler[0];
                    const uzunluk = parseFloat(degerler[1]);
                    const profilVeri = MaterialData.profilVerileri[tur][boyut];
                    if (profilVeri) {
                        birimAgirlik = (profilVeri.agirlik * uzunluk) / 1000;
                    }
                }
                break;

            default:
            // Özel malzeme türü kontrolü
            const typeData = MaterialData.getAllMaterialTypes()[tur];
            if (typeData && typeData.custom) {
                const degerler = olculer.match(/[\d.]+/g);
                if (degerler && degerler.length >= typeData.olcuAlanlari.length) {
                    let hacim = 1;
                    
                    // Tüm değerleri çarp
                    for (let i = 0; i < typeData.olcuAlanlari.length; i++) {
                        hacim *= parseFloat(degerler[i]) || 0;
                    }
                    
                    // Birime göre dönüşüm
                    let donusumFaktoru = 1000000000;
                    if (typeData.birim === 'cm') {
                        donusumFaktoru = 1000000;
                    } else if (typeData.birim === 'm') {
                        donusumFaktoru = 1;
                    }
                    
                    const hacimM3 = hacim / donusumFaktoru;
                    birimAgirlik = hacimM3 * yogunluk;
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

        // Özel malzeme alanlarını temizle
        const ozelMalzemeFields = ['ozelMalzemeTuru', 'ozelMalzemeCinsi', 'ozelMalzemeOlculer', 
                                'ozelMalzemeNorm', 'ozelMalzemeBirimAgirlik'];
        ozelMalzemeFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) field.value = '';
        });

        // Malzeme cinsi alanını yeniden göster
        const malzemeCinsiDiv = document.getElementById('malzemeCinsi')?.parentElement?.parentElement;
        if (malzemeCinsiDiv) {
            malzemeCinsiDiv.style.display = '';
        }
        
        // Özel flanş inputlarını temizle
        const ozelFlansDis = document.getElementById('ozelFlansDis');
        if (ozelFlansDis) ozelFlansDis.value = '';
        const ozelFlansIc = document.getElementById('ozelFlansIc');
        if (ozelFlansIc) ozelFlansIc.value = '';
        const ozelFlansKalinlik = document.getElementById('ozelFlansKalinlik');
        if (ozelFlansKalinlik) ozelFlansKalinlik.value = '';
        
        // Mil inputlarını temizle
        const milCap = document.getElementById('milCap');
        if (milCap) milCap.value = '';
        const milBoy = document.getElementById('milBoy');
        if (milBoy) milBoy.value = '';
        
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