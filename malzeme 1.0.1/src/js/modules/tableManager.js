// Tablo Yönetimi Modülü
(function(window) {
    'use strict';
    
    const TableManager = {
    pNoCounter: 1,
    tableData: [],
    editingIndex: undefined,

    // Malzeme cinsi görüntü formatı
    formatMalzemeCinsiForDisplay: function(malzemeCinsi) {
        const paslanmazFormatlari = {
            '1.4301': '1.4301 (304)',
            '1.4401': '1.4401 (316)',
            '1.4404': '1.4404 (316L)',
            '1.4845': '1.4845 (310)'
        };
        
        return paslanmazFormatlari[malzemeCinsi] || malzemeCinsi;
    },

    // Tabloya satır ekle
    addRow: function() {
        const tur = document.getElementById('malzemeTuru').value;
        if (!tur) {
            this.showNotification('Lütfen malzeme türü seçin!', 'warning');
            return false;
        }
        
        // Değişkenleri başlangıçta tanımla
        let malzemeTuruGosterim = '';
        let malzemeCinsi = '';
        let enNormu = '';
        let olculer = '';
        let birimAgirlik = 0;
        let toplamAgirlik = 0;
        let suHacmi = '-';
        
        const adet = parseFloat(document.getElementById('adet').value) || 1;
        const heatNo = document.getElementById('heatNo').value || '-';
        
        // Malzeme türü formatları için obje
        const malzemeTuruFormatlari = {
            'sac': 'Sac',
            'lama': 'Lama',
            'boru': 'Boru',
            'kosebent': 'L Köşebent',
            'kutu': 'Kutu Profil',
            'mil': 'Mil',
            'ipe': 'IPE Profil',
            'hea': 'HEA Profil',
            'heb': 'HEB Profil',
            'npu': 'NPU Profil',
            'npi': 'NPI Profil',
            'flans': 'Standart Flanş',
            'ozelFlans': 'Özel Flanş',
            'izgara': 'Izgara Elemanı',
            'ozelMalzeme': 'Özel Malzeme',
            'dirsek': 'Dirsek'
        };
        
        // Özel Malzeme kontrolü ve değer ataması
        if (tur === 'ozelMalzeme') {
            const ozelMalzemeTuru = document.getElementById('ozelMalzemeTuru')?.value;
            const ozelBirimAgirlik = document.getElementById('ozelMalzemeBirimAgirlik')?.value;
            
            if (!ozelMalzemeTuru || ozelMalzemeTuru.trim() === '') {
                this.showNotification('Lütfen malzeme türü açıklaması girin!', 'warning');
                return false;
            }
            
            malzemeTuruGosterim = ozelMalzemeTuru;
            malzemeCinsi = document.getElementById('ozelMalzemeCinsi')?.value || '-';
            enNormu = document.getElementById('ozelMalzemeNorm')?.value || '-';
            olculer = document.getElementById('ozelMalzemeOlculer')?.value || '-';
            birimAgirlik = parseFloat(ozelBirimAgirlik) || 0;
        }
        
        // Izgara Elemanları kontrolü ve değer ataması
        else if (tur === 'izgara') {
            const izgaraTipi = document.getElementById('izgaraTipi')?.value;
            
            if (!izgaraTipi) {
                this.showNotification('Lütfen bir izgara elemanı seçin!', 'warning');
                return false;
            }
            
            const izgaraData = MaterialData.izgaraElemanlari[izgaraTipi];
            if (!izgaraData) {
                this.showNotification('Izgara verisi bulunamadı!', 'error');
                return false;
            }
            
            malzemeTuruGosterim = izgaraTipi;
            malzemeCinsi = izgaraData.malzeme;
            enNormu = izgaraData.norm;
            olculer = izgaraData.olcu;
            birimAgirlik = izgaraData.adetKg;
        }
        
        // Standart Flanş kontrolü ve değer ataması
        else if (tur === 'flans') {
            const flansTipi = document.getElementById('flansTipi')?.value;
            
            if (!flansTipi) {
                this.showNotification('Lütfen flanş tipi seçin!', 'warning');
                return false;
            }
            
            malzemeTuruGosterim = MaterialData.FLANS_TIPLERI[flansTipi];
            malzemeCinsi = this.formatMalzemeCinsiForDisplay(document.getElementById('malzemeCinsi').value);
            enNormu = MaterialData.FLANS_NORMLARI[flansTipi];
            olculer = Calculator.currentCalculation.olculer;
            birimAgirlik = parseFloat(document.getElementById('birimAgirlik').textContent);
        }

        else if (tur === 'dirsek') {
            malzemeTuruGosterim = malzemeTuruFormatlari[tur];
            malzemeCinsi = this.formatMalzemeCinsiForDisplay(document.getElementById('malzemeCinsi').value);
            enNormu = 'EN 10253-1';  // Dirsek için sabit norm
            olculer = Calculator.currentCalculation.olculer;
            birimAgirlik = parseFloat(document.getElementById('birimAgirlik').textContent);
        }
        
        // Diğer malzeme türleri için
        else {
            malzemeTuruGosterim = malzemeTuruFormatlari[tur] || tur;
            malzemeCinsi = document.getElementById('malzemeCinsi').value;
            enNormu = MaterialData.EN_NORMLARI[malzemeCinsi];
            olculer = Calculator.currentCalculation.olculer;
            birimAgirlik = parseFloat(document.getElementById('birimAgirlik').textContent);
            
            // Boru için su hacmi
            if (tur === 'boru') {
                suHacmi = document.getElementById('suHacmi').textContent;
            }
            
            // Paslanmaz çelik formatlaması
            malzemeCinsi = this.formatMalzemeCinsiForDisplay(malzemeCinsi);
        }
        
        // Birim ağırlık kontrolü (özel malzeme ve izgara hariç)
        if (tur !== 'ozelMalzeme' && tur !== 'izgara' && birimAgirlik === 0) {
            this.showNotification('Lütfen önce hesaplama yapın!', 'warning');
            return false;
        }
        
        // Toplam ağırlığı hesapla
        toplamAgirlik = (birimAgirlik * adet).toFixed(2);
        
        // Tabloya eklenecek veri objesini oluştur
        const rowData = {
            pNo: this.pNoCounter,
            adet: adet,
            malzemeTuru: malzemeTuruGosterim,
            malzemeCinsi: malzemeCinsi,
            olculer: olculer,
            enNormu: enNormu,
            suHacmi: suHacmi,
            birimAgirlik: birimAgirlik.toFixed(2),
            toplamAgirlik: toplamAgirlik,
            heatNo: heatNo,
            originalType: tur,
            originalGrade: document.getElementById('malzemeCinsi').value, // Formatlanmamış orijinal değer
            flansTipi: tur === 'flans' ? document.getElementById('flansTipi')?.value : null,
            izgaraTipi: tur === 'izgara' ? document.getElementById('izgaraTipi')?.value : null,
            ozelMalzemeTuru: tur === 'ozelMalzeme' ? malzemeTuruGosterim : null
        };
        
        // Veriyi tabloya ekle
        this.tableData.push(rowData);
        this.renderTable();
        this.pNoCounter++;
        this.updateSummary();
        
        // Formu temizle
        Calculator.clearForm();
        
        // Otomatik kayıt tetikle
        this.triggerAutoSave();
        
        this.showNotification('Malzeme tabloya eklendi', 'success');
        return true;
    },

    // Tabloyu render et
    renderTable: function() {
        const tbody = document.getElementById('tabloGovdesi');
        tbody.innerHTML = '';
        
        this.tableData.forEach((row, index) => {
            const tr = document.createElement('tr');
            if (index === this.editingIndex) {
                tr.classList.add('editing');
            }
            
            tr.innerHTML = `
                <td>${row.pNo}</td>
                <td>${row.adet}</td>
                <td>${row.malzemeTuru}</td>
                <td>${row.malzemeCinsi}</td>
                <td>${row.olculer}</td>
                <td>${row.enNormu}</td>
                <td>${row.suHacmi}</td>
                <td>${row.birimAgirlik}</td>
                <td>${row.toplamAgirlik}</td>
                <td>${row.heatNo}</td>
                <td>
                    <div class="table-action-buttons">
                        <button class="btn-edit" onclick="TableManager.editRow(${index})">Düzenle</button>
                        <button class="btn-delete" onclick="TableManager.deleteRow(${index})">Sil</button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    },

    // Satır düzenle - YENİ SİSTEM
    editRow: function(index) {
        const row = this.tableData[index];
        
        // Sol paneli temizle
        Calculator.clearForm();
        
        // Malzeme türünü seç
        document.getElementById('malzemeTuru').value = row.originalType;
        
        // Malzeme türüne göre alanları oluştur
        MaterialCalculator.malzemeTuruDegisti();
        
        // Bir süre bekle ki alanlar oluşsun
        setTimeout(() => {
            // Malzeme cinsini doldur
            if (row.originalType !== 'ozelMalzeme' && row.originalType !== 'izgara') {
                document.getElementById('malzemeCinsi').value = row.originalGrade;
            }
            
            // Adet ve Heat No doldur
            document.getElementById('adet').value = row.adet;
            document.getElementById('heatNo').value = row.heatNo === '-' ? '' : row.heatNo;
            
            // Ölçüleri doldur
            this.fillDimensionsFromRow(row);
            
            // Düzenleme modunu işaretle
            this.editingIndex = index;
            
            // Tabloyu yeniden render et (satırı highlight etmek için)
            this.renderTable();
            
            // Buton metnini değiştir
            const btnEkle = document.getElementById('btnEkle');
            btnEkle.innerHTML = '<span class="btn-icon">💾</span> Güncelle';
            btnEkle.onclick = () => this.updateRow();
            
            // Sol panele kaydır
            document.querySelector('.left-panel').scrollTop = 0;
            
            // Kullanıcıyı bilgilendir
            UIManager.showNotification('Düzenleme modu aktif. Değişiklikleri yaptıktan sonra Güncelle butonuna basın.', 'info');
        }, 100);
    },

    // Ölçüleri form alanlarına doldur
    fillDimensionsFromRow: function(row) {
        const tur = row.originalType;
        const olculer = row.olculer;
        
        switch(tur) {
            case 'sac':
                const sacDegerler = olculer.match(/[\d.]+/g);
                if (sacDegerler && sacDegerler.length >= 3) {
                    document.getElementById('kalinlik').value = sacDegerler[0];
                    document.getElementById('en').value = sacDegerler[1];
                    document.getElementById('boy').value = sacDegerler[2];
                }
                break;
                
            case 'lama':
                const lamaDegerler = olculer.match(/[\d.]+/g);
                if (lamaDegerler && lamaDegerler.length >= 3) {
                    document.getElementById('kalinlik').value = lamaDegerler[0];
                    document.getElementById('genislik').value = lamaDegerler[1];
                    document.getElementById('uzunluk').value = lamaDegerler[2];
                }
                break;
                
            case 'boru':
                const boruDegerler = olculer.match(/Ø([\d.]+)x([\d.]+)x([\d.]+)/);
                if (boruDegerler) {
                    document.getElementById('disCap').value = boruDegerler[1];
                    document.getElementById('etKalinlik').value = boruDegerler[2];
                    document.getElementById('uzunluk').value = boruDegerler[3];
                }
                break;
                
            case 'kosebent':
                const kosebentDegerler = olculer.match(/L([\d.]+)x([\d.]+)x([\d.]+)x([\d.]+)/);
                if (kosebentDegerler) {
                    document.getElementById('kenar1').value = kosebentDegerler[1];
                    document.getElementById('kenar2').value = kosebentDegerler[2];
                    document.getElementById('etKalinlik').value = kosebentDegerler[3];
                    document.getElementById('uzunluk').value = kosebentDegerler[4];
                }
                break;
                
            case 'kutu':
                const kutuDegerler = olculer.match(/[\d.]+/g);
                if (kutuDegerler && kutuDegerler.length >= 4) {
                    document.getElementById('genislik').value = kutuDegerler[0];
                    document.getElementById('yukseklik').value = kutuDegerler[1];
                    document.getElementById('etKalinlik').value = kutuDegerler[2];
                    document.getElementById('uzunluk').value = kutuDegerler[3];
                }
                break;
                
            case 'mil':
                const milDegerler = olculer.match(/Ø([\d.]+)x([\d.]+)/);
                if (milDegerler) {
                    document.getElementById('milCap').value = milDegerler[1];
                    document.getElementById('milBoy').value = milDegerler[2];
                }
                break;

            case 'dirsek':
                // Ölçü formatı: 90° Ø88,9x3,2mm
                const dirsekMatch = olculer.match(/(\d+)°\s*Ø([\d.,]+)x([\d.,]+)/);
                if (dirsekMatch) {
                    const aci = dirsekMatch[1];
                    const cap = dirsekMatch[2].replace(',', '.');
                    const kalinlik = dirsekMatch[3].replace(',', '.');
                    
                    // Açı seçimi
                    document.getElementById('dirsekTipi').value = aci;
                    
                    // Çap seçimi
                    document.getElementById('dirsekCap').value = cap;
                    
                    // Çap değiştiğinde et kalınlığı seçeneklerini güncelle
                    setTimeout(() => {
                        MaterialCalculator.dirsekCapDegisti();
                        // Et kalınlığını seç
                        setTimeout(() => {
                            document.getElementById('dirsekEtKalinlik').value = kalinlik;
                        }, 100);
                    }, 100);
                }
                break;
                
            case 'ozelFlans':
                const ozelFlansDegerler = olculer.match(/Ø([\d.]+)xØ([\d.]+)x([\d.]+)/);
                if (ozelFlansDegerler) {
                    document.getElementById('ozelFlansDis').value = ozelFlansDegerler[1];
                    document.getElementById('ozelFlansIc').value = ozelFlansDegerler[2];
                    document.getElementById('ozelFlansKalinlik').value = ozelFlansDegerler[3];
                }
                break;
                
            case 'flans':
                if (row.flansTipi) {
                    document.getElementById('flansTipi').value = row.flansTipi;
                    // DN ve PN değerlerini çıkar
                    const flansMatch = olculer.match(/DN(\d+)\s+(PN\d+)/);
                    if (flansMatch) {
                        document.getElementById('dnOlcusu').value = flansMatch[1];
                        document.getElementById('pnSinifi').value = flansMatch[2];
                    }
                    // Ağırlığı güncelle
                    setTimeout(() => MaterialCalculator.flansAgirligiGuncelle(), 100);
                }
                break;
                
            case 'izgara':
                if (row.izgaraTipi) {
                    document.getElementById('izgaraTipi').value = row.izgaraTipi;
                    setTimeout(() => MaterialCalculator.izgaraAgirligiGuncelle(), 100);
                }
                break;
                
            case 'ozelMalzeme':
                if (row.ozelMalzemeTuru) {
                    document.getElementById('ozelMalzemeTuru').value = row.ozelMalzemeTuru;
                    document.getElementById('ozelMalzemeCinsi').value = row.malzemeCinsi === '-' ? '' : row.malzemeCinsi;
                    document.getElementById('ozelMalzemeOlculer').value = row.olculer === '-' ? '' : row.olculer;
                    document.getElementById('ozelMalzemeNorm').value = row.enNormu === '-' ? '' : row.enNormu;
                    document.getElementById('ozelMalzemeBirimAgirlik').value = row.birimAgirlik;
                }
                break;
                
            case 'ipe':
            case 'hea':
            case 'heb':
            case 'npu':
            case 'npi':
                const profilMatch = olculer.match(/\w+\s+(\d+)x(\d+)/);
                if (profilMatch) {
                    document.getElementById('profilBoyutu').value = profilMatch[1];
                    document.getElementById('uzunluk').value = profilMatch[2];
                }
                break;
        }
    },

    // Satırı güncelle
    updateRow: function() {
        if (this.editingIndex === undefined) return;
        
        const index = this.editingIndex;
        const tur = document.getElementById('malzemeTuru').value;
        
        // Özel malzeme ve izgara için özel işlem
        if (tur === 'ozelMalzeme') {
            const ozelMalzemeTuru = document.getElementById('ozelMalzemeTuru')?.value;
            if (!ozelMalzemeTuru || ozelMalzemeTuru.trim() === '') {
                UIManager.showNotification('Lütfen malzeme türü açıklaması girin!', 'warning');
                return;
            }
            
            const adet = parseFloat(document.getElementById('adet').value) || 1;
            const birimAgirlik = parseFloat(document.getElementById('ozelMalzemeBirimAgirlik')?.value) || 0;
            
            this.tableData[index] = {
                ...this.tableData[index],
                adet: adet,
                malzemeTuru: ozelMalzemeTuru,
                malzemeCinsi: document.getElementById('ozelMalzemeCinsi')?.value || '-',
                olculer: document.getElementById('ozelMalzemeOlculer')?.value || '-',
                enNormu: document.getElementById('ozelMalzemeNorm')?.value || '-',
                birimAgirlik: birimAgirlik.toFixed(2),
                toplamAgirlik: (birimAgirlik * adet).toFixed(2),
                heatNo: document.getElementById('heatNo').value || '-',
                originalType: 'ozelMalzeme',
                ozelMalzemeTuru: ozelMalzemeTuru
            };
        }
        else if (tur === 'izgara') {
            const izgaraTipi = document.getElementById('izgaraTipi')?.value;
            if (!izgaraTipi) {
                UIManager.showNotification('Lütfen bir izgara elemanı seçin!', 'warning');
                return;
            }
            
            const izgaraData = MaterialData.izgaraElemanlari[izgaraTipi];
            const adet = parseFloat(document.getElementById('adet').value) || 1;
            
            this.tableData[index] = {
                ...this.tableData[index],
                adet: adet,
                malzemeTuru: izgaraTipi,
                malzemeCinsi: izgaraData.malzeme,
                olculer: izgaraData.olcu,
                enNormu: izgaraData.norm,
                birimAgirlik: izgaraData.adetKg.toFixed(2),
                toplamAgirlik: (izgaraData.adetKg * adet).toFixed(2),
                heatNo: document.getElementById('heatNo').value || '-',
                originalType: 'izgara',
                izgaraTipi: izgaraTipi
            };
        }
        else {
            // Normal malzemeler için hesapla
            if (!Calculator.calculate()) {
                UIManager.showNotification('Lütfen önce hesaplama yapın!', 'warning');
                return;
            }
            
            const adet = parseFloat(document.getElementById('adet').value) || 1;
            
            // Malzeme türü formatını al
            const malzemeTuruFormatlari = {
                'sac': 'Sac',
                'lama': 'Lama',
                'boru': 'Boru',
                'kosebent': 'L Köşebent',
                'kutu': 'Kutu Profil',
                'mil': 'Mil',
                'ipe': 'IPE Profil',
                'hea': 'HEA Profil',
                'heb': 'HEB Profil',
                'npu': 'NPU Profil',
                'npi': 'NPI Profil',
                'flans': 'Standart Flanş',
                'ozelFlans': 'Özel Flanş',
                'dirsek': 'Dirsek'
            };
            
            // Flanş için özel işlem
            let malzemeTuruGosterim = malzemeTuruFormatlari[tur] || tur;
            if (tur === 'flans') {
                const flansTipi = document.getElementById('flansTipi')?.value;
                malzemeTuruGosterim = MaterialData.FLANS_TIPLERI[flansTipi];
            }
            
            this.tableData[index] = {
                ...this.tableData[index],
                adet: adet,
                malzemeTuru: malzemeTuruGosterim,
                malzemeCinsi: this.formatMalzemeCinsiForDisplay(document.getElementById('malzemeCinsi').value),
                olculer: Calculator.currentCalculation.olculer,
                enNormu: MaterialData.EN_NORMLARI[document.getElementById('malzemeCinsi').value],
                birimAgirlik: Calculator.currentCalculation.birimAgirlik.toFixed(2),
                toplamAgirlik: Calculator.currentCalculation.toplamAgirlik.toFixed(2),
                heatNo: document.getElementById('heatNo').value || '-',
                suHacmi: tur === 'boru' ? Calculator.currentCalculation.suHacmi.toFixed(2) : '-',
                originalType: tur,
                originalGrade: document.getElementById('malzemeCinsi').value,
                flansTipi: tur === 'flans' ? document.getElementById('flansTipi')?.value : null
            };
        }
        
        // Tabloyu yeniden render et
        this.renderTable();
        this.updateSummary();
        
        // Düzenleme modundan çık
        delete this.editingIndex;
        const btnEkle = document.getElementById('btnEkle');
        btnEkle.innerHTML = '<span class="btn-icon">➕</span> Tabloya Ekle';
        btnEkle.onclick = () => MaterialCalculator.tabloyaEkle();
        
        // Formu temizle
        Calculator.clearForm();
        
        // Otomatik kayıt tetikle
        this.triggerAutoSave();
        
        UIManager.showNotification('Satır güncellendi', 'success');
    },

    // Satır sil
    deleteRow: function(index) {
        if (confirm('Bu satırı silmek istediğinizden emin misiniz?')) {
            // Düzenleme modundaysa çık
            if (this.editingIndex === index) {
                delete this.editingIndex;
                const btnEkle = document.getElementById('btnEkle');
                btnEkle.innerHTML = '<span class="btn-icon">➕</span> Tabloya Ekle';
                btnEkle.onclick = () => MaterialCalculator.tabloyaEkle();
                Calculator.clearForm();
            }
            
            this.tableData.splice(index, 1);
            this.reorderPNo();
            this.renderTable();
            this.updateSummary();
            this.triggerAutoSave();
            this.showNotification('Satır silindi', 'info');
        }
    },

    // P.No'ları yeniden sırala
    reorderPNo: function() {
        this.tableData.forEach((row, index) => {
            row.pNo = index + 1;
        });
        this.pNoCounter = this.tableData.length + 1;
    },

    // Tabloyu temizle
    clearTable: function() {
        if (this.tableData.length === 0) {
            this.showNotification('Temizlenecek veri bulunmuyor', 'info');
            return;
        }
        
        if (confirm('Tüm tablo verilerini silmek istediğinizden emin misiniz?')) {
            // Düzenleme modundan çık
            if (this.editingIndex !== undefined) {
                delete this.editingIndex;
                const btnEkle = document.getElementById('btnEkle');
                btnEkle.innerHTML = '<span class="btn-icon">➕</span> Tabloya Ekle';
                btnEkle.onclick = () => MaterialCalculator.tabloyaEkle();
            }
            
            this.tableData = [];
            this.pNoCounter = 1;
            this.renderTable();
            this.updateSummary();
            this.triggerAutoSave();
            this.showNotification('Tablo temizlendi', 'success');
        }
    },

    // Özet güncelleme
    updateSummary: function() {
        const ozetPanel = document.getElementById('ozetPanel');
        
        if (this.tableData.length === 0) {
            document.getElementById('toplamParca').textContent = '0';
            document.getElementById('genelToplamAgirlik').textContent = '0.00 kg';
            return;
        }
        
        let toplamAgirlik = 0;
        let toplamParcaSayisi = 0;
        
        this.tableData.forEach(row => {
            const adet = parseFloat(row.adet);
            const satirAgirlik = parseFloat(row.toplamAgirlik);
            
            toplamParcaSayisi += adet;
            toplamAgirlik += satirAgirlik;
        });
        
        document.getElementById('toplamParca').textContent = toplamParcaSayisi;
        document.getElementById('genelToplamAgirlik').textContent = toplamAgirlik.toFixed(2) + ' kg';
    },

    // Otomatik kayıt tetikleyici
    triggerAutoSave: function() {
        if (typeof window.autoSaveData === 'function') {
            window.autoSaveData();
        }
    },

    // Tablo verilerini al (Excel export için)
    getTableData: function() {
        return this.tableData;
    },

    // Tablo verilerini yükle (Excel import için)
    loadTableData: function(data) {
        this.tableData = data;
        this.pNoCounter = data.length + 1;
        this.renderTable();
        this.updateSummary();
    },

    // Proje bilgilerini al - HAZIRLAYAN EKLENDİ
    getProjectInfo: function() {
        return {
            projeAdi: document.getElementById('projeAdi').value || '',
            siparisNo: document.getElementById('siparisNo').value || '',
            resimAciklamasi: document.getElementById('resimAciklamasi').value || '',
            resimNo: document.getElementById('resimNo').value || '',
            revizyonNo: document.getElementById('revizyonNo').value || '',
            hazirlayan: document.getElementById('hazirlayan').value || ''
        };
    },

    // Proje bilgilerini yükle - HAZIRLAYAN EKLENDİ
    loadProjectInfo: function(info) {
        document.getElementById('projeAdi').value = info.projeAdi || '';
        document.getElementById('siparisNo').value = info.siparisNo || '';
        document.getElementById('resimAciklamasi').value = info.resimAciklamasi || '';
        document.getElementById('resimNo').value = info.resimNo || '';
        document.getElementById('revizyonNo').value = info.revizyonNo || '';
        document.getElementById('hazirlayan').value = info.hazirlayan || '';
    },

    // Tüm verileri temizle
    clearAll: function() {
        // Proje bilgilerini temizle
        document.getElementById('projeAdi').value = '';
        document.getElementById('siparisNo').value = '';
        document.getElementById('resimAciklamasi').value = '';
        document.getElementById('resimNo').value = '';
        document.getElementById('revizyonNo').value = '';
        document.getElementById('hazirlayan').value = '';
        
        // Düzenleme modundan çık
        if (this.editingIndex !== undefined) {
            delete this.editingIndex;
            const btnEkle = document.getElementById('btnEkle');
            btnEkle.innerHTML = '<span class="btn-icon">➕</span> Tabloya Ekle';
            btnEkle.onclick = () => MaterialCalculator.tabloyaEkle();
        }
        
        // Tabloyu temizle
        this.tableData = [];
        this.pNoCounter = 1;
        this.renderTable();
        this.updateSummary();
        
        // Formu temizle
        Calculator.clearForm();
        
        this.triggerAutoSave();
        this.showNotification('Tüm veriler temizlendi', 'success');
    },

    // Bildirim göster (UI Manager tarafından override edilecek)
    showNotification: function(message, type = 'info') {
        console.log(`[${type.toUpperCase()}] ${message}`);
    }
};

// Modülü window objesine bağla
window.TableManager = TableManager;

})(window);