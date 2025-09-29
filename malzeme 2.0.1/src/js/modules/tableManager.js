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
            'dirsek': 'Dirsek',
            'eklenenMalzeme': 'Özel Malzeme'
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

        else if (tur === 'eklenenMalzeme') {
            const secilenMalzeme = document.getElementById('eklenenMalzemeTipi')?.value;
            
            if (!secilenMalzeme) {
                this.showNotification('Lütfen bir malzeme seçin!', 'warning');
                return false;
            }
            
            const ozelMalzemeler = MaterialData.getAllOzelMalzemeler();
            const malzemeData = ozelMalzemeler.hacimTabanli[secilenMalzeme] || 
                            ozelMalzemeler.birimAgirlikTabanli[secilenMalzeme];
            
            if (!malzemeData) {
                this.showNotification('Malzeme verisi bulunamadı!', 'error');
                return false;
            }
            
            // Malzeme türü gösterimi için malzeme adını kullan
            malzemeTuruGosterim = malzemeData.ad;
            olculer = Calculator.currentCalculation.olculer;
            birimAgirlik = parseFloat(document.getElementById('birimAgirlik').textContent);
            
            if (malzemeData.tip === 'birimAgirlikTabanli') {
                malzemeCinsi = malzemeData.malzemeCinsi || '-';
                enNormu = malzemeData.standart || '-';
                olculer = malzemeData.olculer || '-';
                birimAgirlik = malzemeData.birimAgirlik;
            } else {
                malzemeCinsi = this.formatMalzemeCinsiForDisplay(document.getElementById('malzemeCinsi').value);
                enNormu = MaterialData.EN_NORMLARI[document.getElementById('malzemeCinsi').value] || '-';
            }
            
            // Eklenen malzeme için ek bilgileri sakla
            this.currentCalculation = this.currentCalculation || {};
            this.currentCalculation.eklenenMalzemeKodu = secilenMalzeme;
            this.currentCalculation.eklenenMalzemeData = malzemeData;
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
            originalGrade: document.getElementById('malzemeCinsi').value
        };

        // Malzeme türüne göre özel bilgileri ekle
        if (tur === 'flans') {
            rowData.flansTipi = document.getElementById('flansTipi')?.value;
        } else if (tur === 'izgara') {
            rowData.izgaraTipi = document.getElementById('izgaraTipi')?.value;
        } else if (tur === 'ozelMalzeme') {
            rowData.ozelMalzemeTuru = malzemeTuruGosterim;
        } else if (tur === 'eklenenMalzeme') {
            // Eklenen malzeme için kritik verileri kaydet
            const secilenMalzeme = document.getElementById('eklenenMalzemeTipi')?.value;
            if (secilenMalzeme) {
                const ozelMalzemeler = MaterialData.getAllOzelMalzemeler();
                const malzemeData = ozelMalzemeler.hacimTabanli[secilenMalzeme] || 
                                ozelMalzemeler.birimAgirlikTabanli[secilenMalzeme];
                
                rowData.eklenenMalzemeKodu = secilenMalzeme;
                rowData.eklenenMalzemeData = malzemeData;
                
                console.log('Eklenen malzeme rowData\'ya kaydedildi:', {
                    kod: secilenMalzeme,
                    ad: malzemeData?.ad,
                    tip: malzemeData?.tip
                });
            }
        }
        
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

    // Tabloyu render et - GÜNCELLENMIŞ VERSİYON
    renderTable: function() {
        const tbody = document.getElementById('tabloGovdesi');
        tbody.innerHTML = '';
        
        this.tableData.forEach((row, index) => {
            const tr = document.createElement('tr');
            tr.draggable = true;  // EKLE
            tr.dataset.index = index;  // EKLE
            
            if (index === this.editingIndex) {
                tr.classList.add('editing');
            }
            
            tr.innerHTML = `
                <td>
                    <div class="drag-handle">⋮⋮</div>
                    ${row.pNo}
                </td>
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
                        <button class="btn-edit" onclick="TableManager.editRow(${index})">
                            <span data-lang="edit">Düzenle</span>
                        </button>
                        <button class="btn-delete" onclick="TableManager.deleteRow(${index})">
                            <span data-lang="delete">Sil</span>
                        </button>
                    </div>
                </td>
            `;
            
            // Sürükleme event'leri EKLE
            this.addDragEvents(tr, index);
            tbody.appendChild(tr);
        });
    },

    // Sürükleme event'lerini ekle - YENİ FONKSİYON
    addDragEvents: function(tr, index) {
        tr.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', index);
            tr.classList.add('dragging');
        });
        
        tr.addEventListener('dragend', () => {
            tr.classList.remove('dragging');
        });
        
        tr.addEventListener('dragover', (e) => {
            e.preventDefault();
            tr.classList.add('drag-over');
        });
        
        tr.addEventListener('dragleave', () => {
            tr.classList.remove('drag-over');
        });
        
        tr.addEventListener('drop', (e) => {
            e.preventDefault();
            tr.classList.remove('drag-over');
            
            const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
            const targetIndex = index;
            
            if (draggedIndex !== targetIndex) {
                this.moveRow(draggedIndex, targetIndex);
            }
        });
    },

    // Satır taşıma fonksiyonu - YENİ FONKSİYON  
    moveRow: function(fromIndex, toIndex) {
        const movedItem = this.tableData.splice(fromIndex, 1)[0];
        this.tableData.splice(toIndex, 0, movedItem);
        
        // P.No'ları yeniden sırala
        this.reorderPNo();
        this.renderTable();
        this.updateSummary();
        this.triggerAutoSave();
        
        this.showNotification('Satır sırası değiştirildi', 'info');
    },

    // Dil değişikliğinde tablo içeriğini güncelle
    updateTableLanguage: function() {
        this.tableData.forEach(row => {
            // Malzeme türü çevirisi
            const typeTranslations = {
                'tr': {
                    'Sac': 'Sac',
                    'Lama': 'Lama', 
                    'Boru': 'Boru',
                    'L Köşebent': 'L Köşebent',
                    'Kutu Profil': 'Kutu Profil',
                    'Mil': 'Mil',
                    'IPE Profil': 'IPE Profil',
                    'HEA Profil': 'HEA Profil',
                    'HEB Profil': 'HEB Profil',
                    'NPU Profil': 'NPU Profil',
                    'NPI Profil': 'NPI Profil',
                    'Düz Flanş': 'Düz Flanş',
                    'Kaynak Boyunlu Flanş': 'Kaynak Boyunlu Flanş',
                    'Kör Flanş': 'Kör Flanş',
                    'Özel Flanş': 'Özel Flanş',
                    'Dirsek': 'Dirsek',
                    'Özel Malzeme': 'Özel Malzeme'
                },
                'en': {
                    'Sac': 'Sheet',
                    'Lama': 'Plate',
                    'Boru': 'Pipe',
                    'L Köşebent': 'L Angle',
                    'Kutu Profil': 'Box Profile',
                    'Mil': 'Shaft',
                    'IPE Profil': 'IPE Profile',
                    'HEA Profil': 'HEA Profile',
                    'HEB Profil': 'HEB Profile',
                    'NPU Profil': 'NPU Profile',
                    'NPI Profil': 'NPI Profile',
                    'Düz Flanş': 'Flat Flange',
                    'Kaynak Boyunlu Flanş': 'Weld Neck Flange',
                    'Kör Flanş': 'Blind Flange',
                    'Özel Flanş': 'Custom Flange',
                    'Dirsek': 'Elbow',
                    'Özel Malzeme': 'Custom Material'
                }
            };
            
            const currentLang = LanguageManager.currentLanguage;
            const translations = typeTranslations[currentLang];
            
            if (translations) {
                // Mevcut türü bul ve çevir
                Object.keys(typeTranslations.tr).forEach(trType => {
                    if (row.malzemeTuru === trType || row.malzemeTuru === typeTranslations.en[trType]) {
                        row.malzemeTuru = translations[trType];
                    }
                });
            }
        });
        
        this.renderTable();
    },

    // Satır düzenle - YENİ SİSTEM
    editRow: function(index) {
        const row = this.tableData[index];
        
        // Debug: Satır verilerini kontrol et
        if (row.originalType === 'eklenenMalzeme') {
            const debugResult = this.debugRowData(index);
            console.log('Düzenleme başlangıcında debug sonucu:', debugResult);
        }
        
        // Sol paneli temizle
        Calculator.clearForm();
        
        // Malzeme türünü seç
        document.getElementById('malzemeTuru').value = row.originalType;
        
        // Malzeme türüne göre alanları oluştur
        MaterialCalculator.malzemeTuruDegisti();
        
        // Bir süre bekle ki alanlar oluşsun
        setTimeout(() => {
            // Malzeme cinsini doldur
            if (row.originalType !== 'ozelMalzeme' && row.originalType !== 'izgara' && row.originalType !== 'eklenenMalzeme') {
                const malzemeCinsiSelect = document.getElementById('malzemeCinsi');
                if (malzemeCinsiSelect) {
                    malzemeCinsiSelect.value = row.originalGrade;
                }
            }
            
            // Adet ve Heat No doldur
            document.getElementById('adet').value = row.adet;
            document.getElementById('heatNo').value = row.heatNo === '-' ? '' : row.heatNo;
            
            // Ölçüleri doldur
            this.fillDimensionsFromRow(row);
            
            // Düzenleme modunu işaretle
            this.editingIndex = index;
            
            // Tabloyu yeniden render et
            this.renderTable();
            
            // Buton metnini değiştir
            const btnEkle = document.getElementById('btnEkle');
            btnEkle.innerHTML = '<span class="btn-icon">💾</span> Güncelle';
            btnEkle.onclick = () => this.updateRow();
            
            // Sol panele kaydır
            document.querySelector('.left-panel').scrollTop = 0;
            
            UIManager.showNotification('Düzenleme modu aktif', 'info');
        }, 150);
    },

    // Özel malzeme moduna dönüştürme yardımcı fonksiyonu
    convertToOzelMalzeme: function(row) {
        document.getElementById('malzemeTuru').value = 'ozelMalzeme';
        MaterialCalculator.malzemeTuruDegisti();
        
        setTimeout(() => {
            const ozelMalzemeTuru = document.getElementById('ozelMalzemeTuru');
            const ozelMalzemeCinsi = document.getElementById('ozelMalzemeCinsi');
            const ozelMalzemeOlculer = document.getElementById('ozelMalzemeOlculer');
            const ozelMalzemeNorm = document.getElementById('ozelMalzemeNorm');
            const ozelMalzemeBirimAgirlik = document.getElementById('ozelMalzemeBirimAgirlik');
            
            if (ozelMalzemeTuru) ozelMalzemeTuru.value = row.malzemeTuru;
            if (ozelMalzemeCinsi) ozelMalzemeCinsi.value = row.malzemeCinsi === '-' ? '' : row.malzemeCinsi;
            if (ozelMalzemeOlculer) ozelMalzemeOlculer.value = row.olculer === '-' ? '' : row.olculer;
            if (ozelMalzemeNorm) ozelMalzemeNorm.value = row.enNormu === '-' ? '' : row.enNormu;
            if (ozelMalzemeBirimAgirlik) ozelMalzemeBirimAgirlik.value = row.birimAgirlik;
            
            // Row'un originalType'ını güncelle
            row.originalType = 'ozelMalzeme';
            row.ozelMalzemeTuru = row.malzemeTuru;
            
            UIManager.showNotification('Malzeme özel malzeme olarak düzenleniyor', 'warning');
        }, 100);
    },

    // Hacim tabanlı ölçüleri doldurma yardımcı fonksiyonu
    fillHacimTabanliOlculer: function(row, malzemeData) {
        try {
            // Ölçü metnini parse et (örnek: "5x60x500mm")
            let olculerText = row.olculer;
            console.log('Parse edilecek ölçü metni:', olculerText);
            
            // Sadece birim harflerini kaldır, 'x' karakterini koru
            // mm, cm, m gibi birimleri kaldır ama 'x' ayırıcıyı bırak
            const cleanText = olculerText.replace(/[a-zA-Z]/g, function(match) {
                return match === 'x' ? match : '';
            });
            
            // Alternatif yaklaşım: Sadece bilinen birimleri kaldır
            const finalText = olculerText.replace(/mm|cm|m$/gi, '');
            
            console.log('Temizlenmiş metin:', finalText);
            
            // 'x' karakterine göre ayır
            const olcuDegerler = finalText.split('x').map(val => val.trim()).filter(val => val !== '');
            console.log('Ayrılmış ölçü değerleri:', olcuDegerler);
            
            if (olcuDegerler.length !== malzemeData.olcuAlanlari.length) {
                console.warn('Ölçü değer sayısı malzeme alanı sayısı ile uyuşmuyor', {
                    değerSayısı: olcuDegerler.length,
                    alanSayısı: malzemeData.olcuAlanlari.length,
                    originalText: olculerText,
                    cleanText: finalText,
                    values: olcuDegerler
                });
                
                // Eğer parse başarısız olduysa, kullanıcıyı uyar
                if (olcuDegerler.length === 1 && malzemeData.olcuAlanlari.length > 1) {
                    UIManager.showNotification('Ölçü değerleri düzgün ayrıştırılamadı. Lütfen manuel olarak girin.', 'warning');
                    return;
                }
            }
            
            // Her ölçü alanını doldur
            malzemeData.olcuAlanlari.forEach((alan, index) => {
                const input = document.getElementById(alan.id);
                if (input && olcuDegerler[index]) {
                    const deger = parseFloat(olcuDegerler[index]);
                    if (!isNaN(deger) && deger > 0) {
                        input.value = deger;
                        console.log(`${alan.id} alanına ${deger} değeri atandı`);
                    } else {
                        console.warn(`Geçersiz ölçü değeri: ${olcuDegerler[index]}`);
                        UIManager.showNotification(`Geçersiz ölçü değeri: ${olcuDegerler[index]}`, 'warning');
                    }
                } else if (input) {
                    console.warn(`${alan.id} için ölçü değeri bulunamadı (index: ${index})`);
                    // Boş alanları 0 ile doldur
                    input.value = '';
                    input.placeholder = `${alan.label} değerini girin`;
                } else {
                    console.error(`${alan.id} input elementi bulunamadı`);
                }
            });
            
            // Başarılı parse sonrası kullanıcıyı bilgilendir
            if (olcuDegerler.length === malzemeData.olcuAlanlari.length) {
                console.log('Tüm ölçü değerleri başarıyla yüklendi');
            }
            
        } catch (error) {
            console.error('Ölçü doldurma hatası:', error);
            UIManager.showNotification('Ölçü değerleri yüklenirken hata oluştu: ' + error.message, 'error');
            
            // Hata durumunda tüm alanları temizle
            malzemeData.olcuAlanlari.forEach(alan => {
                const input = document.getElementById(alan.id);
                if (input) {
                    input.value = '';
                    input.placeholder = `${alan.label} değerini girin`;
                }
            });
        }
    },

    // Test: Son eklenen satırın verilerini kontrol et
    testLastRow: function() {
        if (this.tableData.length === 0) {
            console.log('Tabloda veri yok');
            return;
        }
        
        const lastRow = this.tableData[this.tableData.length - 1];
        console.log('Son eklenen satır verileri:', {
            originalType: lastRow.originalType,
            malzemeTuru: lastRow.malzemeTuru,
            eklenenMalzemeKodu: lastRow.eklenenMalzemeKodu,
            eklenenMalzemeData: lastRow.eklenenMalzemeData,
            hasEklenenData: !!(lastRow.eklenenMalzemeKodu && lastRow.eklenenMalzemeData)
        });
        
        if (lastRow.originalType === 'eklenenMalzeme') {
            if (lastRow.eklenenMalzemeKodu && lastRow.eklenenMalzemeData) {
                console.log('✅ Eklenen malzeme verileri düzgün kaydedilmiş');
            } else {
                console.log('❌ Eklenen malzeme verileri eksik!');
            }
        }
    },

    // Debug: Satır verilerini kontrol etme fonksiyonu
    debugRowData: function(index) {
        const row = this.tableData[index];
        console.log('Satır debug bilgileri:', {
            index: index,
            originalType: row.originalType,
            malzemeTuru: row.malzemeTuru,
            eklenenMalzemeKodu: row.eklenenMalzemeKodu,
            eklenenMalzemeDataVar: !!row.eklenenMalzemeData,
            eklenenMalzemeDataAd: row.eklenenMalzemeData?.ad,
            eklenenMalzemeDataTip: row.eklenenMalzemeData?.tip
        });
        
        // Güncel malzeme listesini de kontrol et
        const ozelMalzemeler = MaterialData.getAllOzelMalzemeler();
        const guncelMalzeme = ozelMalzemeler.hacimTabanli[row.eklenenMalzemeKodu] || 
                            ozelMalzemeler.birimAgirlikTabanli[row.eklenenMalzemeKodu];
        
        console.log('Güncel malzeme listesi kontrolü:', {
            malzemeVarMi: !!guncelMalzeme,
            guncelMalzemeAd: guncelMalzeme?.ad
        });
        
        return {
            rowHasData: !!(row.eklenenMalzemeKodu && row.eklenenMalzemeData),
            currentExists: !!guncelMalzeme
        };
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

            case 'eklenenMalzeme':
                console.log('Eklenen malzeme düzenleme başlatılıyor, row verisi:', {
                    kod: row.eklenenMalzemeKodu,
                    dataVar: !!row.eklenenMalzemeData,
                    malzemeTuru: row.malzemeTuru
                });
                
                // Veri bütünlüğü kontrolü
                if (!row.eklenenMalzemeKodu || !row.eklenenMalzemeData) {
                    console.warn('Eklenen malzeme verisi eksik veya bozuk');
                    this.convertToOzelMalzeme(row);
                    break;
                }
                
                // Güncel malzeme listesini kontrol et
                const ozelMalzemeler = MaterialData.getAllOzelMalzemeler();
                const guncelMalzemeData = ozelMalzemeler.hacimTabanli[row.eklenenMalzemeKodu] || 
                                        ozelMalzemeler.birimAgirlikTabanli[row.eklenenMalzemeKodu];
                
                if (!guncelMalzemeData) {
                    console.warn('Malzeme güncel listede bulunamadı, özel malzeme moduna geçiliyor');
                    this.convertToOzelMalzeme(row);
                    break;
                }
                
                console.log('Malzeme güncel listede bulundu, normal düzenleme yapılacak');
                
                // Normal eklenen malzeme düzenleme işlemi
                setTimeout(() => {
                    const eklenenMalzemeTipiSelect = document.getElementById('eklenenMalzemeTipi');
                    
                    if (!eklenenMalzemeTipiSelect) {
                        console.error('eklenenMalzemeTipi select bulunamadı');
                        this.convertToOzelMalzeme(row);
                        return;
                    }
                    
                    // Malzemeyi listede bul
                    let optionFound = false;
                    Array.from(eklenenMalzemeTipiSelect.options).forEach(option => {
                        if (option.value === row.eklenenMalzemeKodu) {
                            optionFound = true;
                        }
                    });
                    
                    if (!optionFound) {
                        console.warn('Malzeme seçim listesinde bulunamadı');
                        this.convertToOzelMalzeme(row);
                        return;
                    }
                    
                    // Malzemeyi seç
                    eklenenMalzemeTipiSelect.value = row.eklenenMalzemeKodu;
                    MaterialCalculator.eklenenMalzemeDegisti();
                    
                    // Hacim tabanlı malzeme ise ölçüleri doldur
                    if (guncelMalzemeData.tip === 'hacimTabanli' && guncelMalzemeData.olcuAlanlari) {
                        setTimeout(() => {
                            this.fillHacimTabanliOlculer(row, guncelMalzemeData);
                        }, 300);
                    }
                    
                    console.log('Eklenen malzeme başarıyla düzenleme moduna alındı');
                    
                }, 200);
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
        else if (tur === 'eklenenMalzeme') {
            const secilenMalzeme = document.getElementById('eklenenMalzemeTipi')?.value;
            
            if (!secilenMalzeme) {
                UIManager.showNotification('Lütfen bir malzeme seçin!', 'warning');
                return;
            }
            
            const ozelMalzemeler = MaterialData.getAllOzelMalzemeler();
            const malzemeData = ozelMalzemeler.hacimTabanli[secilenMalzeme] || 
                            ozelMalzemeler.birimAgirlikTabanli[secilenMalzeme];
            
            if (!malzemeData) {
                UIManager.showNotification('Malzeme verisi bulunamadı!', 'error');
                return;
            }
            
            const adet = parseFloat(document.getElementById('adet').value) || 1;
            
            if (malzemeData.tip === 'birimAgirlikTabanli') {
                // Birim ağırlık tabanlı
                this.tableData[index] = {
                    ...this.tableData[index],
                    adet: adet,
                    malzemeTuru: malzemeData.ad,
                    malzemeCinsi: malzemeData.malzemeCinsi || '-',
                    olculer: malzemeData.olculer || '-',
                    enNormu: malzemeData.standart || '-',
                    birimAgirlik: malzemeData.birimAgirlik.toFixed(2),
                    toplamAgirlik: (malzemeData.birimAgirlik * adet).toFixed(2),
                    heatNo: document.getElementById('heatNo').value || '-',
                    suHacmi: '-',
                    originalType: 'eklenenMalzeme',
                    originalGrade: malzemeData.malzemeCinsi || '-',
                    eklenenMalzemeKodu: secilenMalzeme,
                    eklenenMalzemeData: malzemeData
                };
            } else {
                // Hacim tabanlı - hesaplama yap
                if (!Calculator.calculate()) {
                    UIManager.showNotification('Lütfen önce hesaplama yapın veya ölçüleri kontrol edin!', 'warning');
                    return;
                }
                
                this.tableData[index] = {
                    ...this.tableData[index],
                    adet: adet,
                    malzemeTuru: malzemeData.ad,
                    malzemeCinsi: this.formatMalzemeCinsiForDisplay(document.getElementById('malzemeCinsi').value),
                    olculer: Calculator.currentCalculation.olculer,
                    enNormu: MaterialData.EN_NORMLARI[document.getElementById('malzemeCinsi').value] || '-',
                    birimAgirlik: Calculator.currentCalculation.birimAgirlik.toFixed(2),
                    toplamAgirlik: Calculator.currentCalculation.toplamAgirlik.toFixed(2),
                    heatNo: document.getElementById('heatNo').value || '-',
                    suHacmi: '-',
                    originalType: 'eklenenMalzeme',
                    originalGrade: document.getElementById('malzemeCinsi').value,
                    eklenenMalzemeKodu: secilenMalzeme,
                    eklenenMalzemeData: malzemeData
                };
            }
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
                if (flansTipi) {
                    malzemeTuruGosterim = MaterialData.FLANS_TIPLERI[flansTipi];
                }
            }
            
            this.tableData[index] = {
                ...this.tableData[index],
                adet: adet,
                malzemeTuru: malzemeTuruGosterim,
                malzemeCinsi: this.formatMalzemeCinsiForDisplay(document.getElementById('malzemeCinsi').value),
                olculer: Calculator.currentCalculation.olculer,
                enNormu: MaterialData.EN_NORMLARI[document.getElementById('malzemeCinsi').value] || '-',
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
        // Custom confirm dialog kullan
        const confirmDelete = () => {
            // Düzenleme modundaysa çık
            if (this.editingIndex === index) {
                delete this.editingIndex;
                const btnEkle = document.getElementById('btnEkle');
                btnEkle.innerHTML = '<span class="btn-icon">➕</span> Tabloya Ekle';
                btnEkle.onclick = () => MaterialCalculator.tabloyaEkle();
            }
            
            this.tableData.splice(index, 1);
            this.reorderPNo();
            this.renderTable();
            this.updateSummary();
            this.triggerAutoSave();
            
            // Form temizleme
            Calculator.clearForm();
            
            // Focus düzeltme
            this.fixFocusAfterDelete();
            
            this.showNotification('Satır silindi', 'info');
        };
        
        // Native confirm yerine custom dialog kullan
        this.showDeleteConfirmDialog(confirmDelete);
    },

    showDeleteConfirmDialog: function(onConfirm) {
        // Modal'ın zaten açık olup olmadığını kontrol et
        if (document.querySelector('.delete-confirm-modal')) {
            return;
        }
        
        // Custom modal oluştur
        const modal = document.createElement('div');
        modal.className = 'delete-confirm-modal';
        modal.innerHTML = `
            <div class="delete-confirm-content">
                <p>Bu satırı silmek istediğinizden emin misiniz?</p>
                <div class="delete-confirm-buttons">
                    <button id="confirmDeleteBtn" class="btn btn-danger">Sil</button>
                    <button id="cancelDeleteBtn" class="btn btn-secondary">İptal</button>
                </div>
            </div>
        `;
        
        // Stiller
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        const content = modal.querySelector('.delete-confirm-content');
        content.style.cssText = `
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            max-width: 400px;
        `;
        
        const buttons = modal.querySelector('.delete-confirm-buttons');
        buttons.style.cssText = `
            display: flex;
            gap: 10px;
            margin-top: 20px;
            justify-content: flex-end;
        `;
        
        document.body.appendChild(modal);
        
        // Modal'ı güvenli bir şekilde kaldıran fonksiyon
        const removeModal = () => {
            const existingModal = document.querySelector('.delete-confirm-modal');
            if (existingModal && existingModal.parentNode) {
                existingModal.parentNode.removeChild(existingModal);
            }
            // Event listener'ı temizle
            document.removeEventListener('keydown', handleEsc);
        };
        
        // ESC tuşu handler'ı
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                removeModal();
                if (window.EventManager) {
                    window.EventManager.restoreFocus();
                }
            }
        };
        
        // Event handlers
        document.getElementById('confirmDeleteBtn').onclick = () => {
            removeModal();
            onConfirm();
        };
        
        document.getElementById('cancelDeleteBtn').onclick = () => {
            removeModal();
            if (window.EventManager) {
                window.EventManager.restoreFocus();
            }
        };
        
        // Modal dışına tıklama ile kapatma
        modal.onclick = (e) => {
            if (e.target === modal) {
                removeModal();
                if (window.EventManager) {
                    window.EventManager.restoreFocus();
                }
            }
        };
        
        // ESC tuşu event listener'ı ekle
        document.addEventListener('keydown', handleEsc);
        
        // İlk butona focus ver
        setTimeout(() => {
            document.getElementById('cancelDeleteBtn').focus();
        }, 50);
    },

    fixFocusAfterDelete: function() {
        // Electron window'a focus ver
        const { remote } = require('electron');
        if (remote && remote.getCurrentWindow) {
            const currentWindow = remote.getCurrentWindow();
            currentWindow.focus();
        }
        
        // DOM focus'unu düzelt
        setTimeout(() => {
            document.body.focus();
            
            // EventManager'ı tetikle
            if (window.EventManager) {
                window.EventManager.restoreFocus();
            }
            
            // İlk input'a focus
            const firstInput = document.querySelector('#adet, #malzemeTuru');
            if (firstInput) {
                firstInput.focus();
            }
        }, 100);
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
            hazirlayan: document.getElementById('hazirlayan').value || '',
            kontrol: document.getElementById('kontrol').value || ''
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
        document.getElementById('kontrol').value = info.kontrol || ''; // YENİ SATIR
    },

    // Notlar ve Revizyonlar bilgilerini al
    getNotesRevisions: function() {
        return {
            notlar: document.getElementById('notlar')?.value || '',
            revizyonlar: document.getElementById('revizyonlar')?.value || ''
        };
    },

    // Notlar ve Revizyonlar bilgilerini yükle
    loadNotesRevisions: function(data) {
        const notlarElement = document.getElementById('notlar');
        const revizyonlarElement = document.getElementById('revizyonlar');
        
        if (notlarElement) {
            notlarElement.value = data.notlar || '';
        }
        if (revizyonlarElement) {
            revizyonlarElement.value = data.revizyonlar || '';
        }
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
        document.getElementById('kontrol').value = '';

        // Notlar ve Revizyonlar temizle
        const notlarElement = document.getElementById('notlar');
        const revizyonlarElement = document.getElementById('revizyonlar');
        if (notlarElement) notlarElement.value = '';
        if (revizyonlarElement) revizyonlarElement.value = '';
        
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