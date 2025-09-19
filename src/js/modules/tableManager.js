// Tablo Yönetimi Modülü
(function(window) {
    'use strict';
    
    const TableManager = {
    pNoCounter: 1,
    tableData: [],

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
        
        // Özel Malzeme kontrolü ve değer ataması
        if (tur === 'ozelMalzeme') {
            const ozelMalzemeTuru = document.getElementById('ozelMalzemeTuru')?.value;
            const ozelBirimAgirlik = document.getElementById('ozelMalzemeBirimAgirlik')?.value;
            
            if (!ozelMalzemeTuru) {
                this.showNotification('Lütfen malzeme türü açıklaması girin!', 'warning');
                return false;
            }
            
            if (!ozelBirimAgirlik || parseFloat(ozelBirimAgirlik) === 0) {
                this.showNotification('Lütfen birim ağırlık değeri girin!', 'warning');
                return false;
            }
            
            malzemeTuruGosterim = ozelMalzemeTuru;
            malzemeCinsi = document.getElementById('ozelMalzemeCinsi')?.value || '-';
            enNormu = document.getElementById('ozelMalzemeNorm')?.value || '-';
            olculer = document.getElementById('ozelMalzemeOlculer')?.value || '-';
            birimAgirlik = parseFloat(ozelBirimAgirlik);
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
            malzemeCinsi = document.getElementById('malzemeCinsi').value;
            enNormu = MaterialData.FLANS_NORMLARI[flansTipi];
            olculer = Calculator.currentCalculation.olculer;
            birimAgirlik = parseFloat(document.getElementById('birimAgirlik').textContent);
        }
        
        // Özel Flanş kontrolü ve değer ataması
        else if (tur === 'ozelFlans') {
            malzemeTuruGosterim = 'Özel Flanş';
            malzemeCinsi = document.getElementById('malzemeCinsi').value;
            enNormu = MaterialData.EN_NORMLARI[malzemeCinsi];
            olculer = Calculator.currentCalculation.olculer;
            birimAgirlik = parseFloat(document.getElementById('birimAgirlik').textContent);
        }
        
        // Mil kontrolü ve değer ataması
        else if (tur === 'mil') {
            malzemeTuruGosterim = 'Mil';
            malzemeCinsi = document.getElementById('malzemeCinsi').value;
            enNormu = MaterialData.EN_NORMLARI[malzemeCinsi];
            olculer = Calculator.currentCalculation.olculer;
            birimAgirlik = parseFloat(document.getElementById('birimAgirlik').textContent);
        }
        
        // Profil malzemeleri kontrolü ve değer ataması
        else if (['ipe', 'hea', 'heb', 'npu', 'npi'].includes(tur)) {
            malzemeTuruGosterim = tur.toUpperCase();
            malzemeCinsi = document.getElementById('malzemeCinsi').value;
            enNormu = MaterialData.EN_NORMLARI[malzemeCinsi];
            olculer = Calculator.currentCalculation.olculer;
            birimAgirlik = parseFloat(document.getElementById('birimAgirlik').textContent);
        }
        
        // Boru kontrolü ve değer ataması
        else if (tur === 'boru') {
            malzemeTuruGosterim = 'BORU';
            malzemeCinsi = document.getElementById('malzemeCinsi').value;
            enNormu = MaterialData.EN_NORMLARI[malzemeCinsi];
            olculer = Calculator.currentCalculation.olculer;
            birimAgirlik = parseFloat(document.getElementById('birimAgirlik').textContent);
            suHacmi = document.getElementById('suHacmi').textContent;
        }
        
        // Diğer standart malzemeler için değer ataması
        else {
            malzemeTuruGosterim = tur.toUpperCase();
            malzemeCinsi = document.getElementById('malzemeCinsi').value;
            enNormu = MaterialData.EN_NORMLARI[malzemeCinsi];
            olculer = Calculator.currentCalculation.olculer;
            birimAgirlik = parseFloat(document.getElementById('birimAgirlik').textContent);
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
            originalGrade: malzemeCinsi,
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
        
        this.showNotification('Malzeme tabloya eklendi', 'success');
        return true;
    },

    // Tabloyu render et
    renderTable: function() {
        const tbody = document.getElementById('tabloGovdesi');
        tbody.innerHTML = '';
        
        this.tableData.forEach((row, index) => {
            const tr = document.createElement('tr');
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

    // Satır düzenle
    editRow: function(index) {
        const row = this.tableData[index];
        const tr = document.getElementById('tabloGovdesi').rows[index];
        const btn = tr.querySelector('.btn-edit');
        
        if (btn.textContent === 'Düzenle') {
            // Düzenleme moduna geç
            const cells = tr.cells;
            
            cells[1].innerHTML = `<input type="number" class="edit-input" value="${row.adet}" min="1">`;
            cells[4].innerHTML = `<input type="text" class="edit-input" value="${row.olculer}">`;
            cells[9].innerHTML = `<input type="text" class="edit-input" value="${row.heatNo}">`;
            
            btn.textContent = 'Kaydet';
            btn.classList.add('btn-save');
        } else {
            // Değişiklikleri kaydet
            this.saveRowChanges(index);
            btn.textContent = 'Düzenle';
            btn.classList.remove('btn-save');
        }
    },

    // Satır değişikliklerini kaydet
saveRowChanges: function(index) {
    const tr = document.getElementById('tabloGovdesi').rows[index];
    const row = this.tableData[index];
    
    const newAdet = parseFloat(tr.cells[1].querySelector('input').value) || 1;
    const newOlculer = tr.cells[4].querySelector('input').value;
    const newHeatNo = tr.cells[9].querySelector('input').value || '-';

    if (row.originalType === 'ozelMalzeme') {
        // Özel malzeme için birim ağırlık manuel olarak girildiği için 
        // sadece toplam ağırlığı yeniden hesapla
        row.olculer = newOlculer;
        // Birim ağırlık değiştirilmişse güncelle (opsiyonel)
    }
    
    // Flanş için özel işlem
    if (row.originalType === 'flans' && row.flansTipi) {
        // Flanş için DN ve PN değerlerini çıkar
        const flansMatch = newOlculer.match(/DN(\d+)\s+(PN\d+)/);
        if (flansMatch) {
            const dn = flansMatch[1];
            const pn = flansMatch[2];
            
            const flansData = MaterialData.flansVerileri[row.flansTipi];
            if (flansData && flansData[dn] && flansData[dn][pn]) {
                row.birimAgirlik = flansData[dn][pn].toFixed(2);
                row.olculer = newOlculer;
            }
        }
    } else {
        // Diğer malzeme türleri için mevcut işlem
        if (newOlculer !== row.olculer) {
            const birimAgirlik = Calculator.calculateFromDimensions(
                row.originalType,
                newOlculer,
                row.originalGrade
            );
            row.birimAgirlik = birimAgirlik.toFixed(2);
            row.olculer = newOlculer;
            
            // Boru ise su hacmini hesapla
            if (row.originalType === 'boru') {
                const suHacmi = Calculator.calculateWaterVolumeFromDimensions(newOlculer);
                row.suHacmi = (suHacmi * newAdet).toFixed(2);
            }
        }
    }
    
    // Adet değişikliklerini kaydet
    row.adet = newAdet;
    row.toplamAgirlik = (parseFloat(row.birimAgirlik) * newAdet).toFixed(2);
    row.heatNo = newHeatNo;
    
    // Boru ise su hacmini güncelle
    if (row.originalType === 'boru' && row.adet !== newAdet) {
        const birimSuHacmi = Calculator.calculateWaterVolumeFromDimensions(row.olculer);
        row.suHacmi = (birimSuHacmi * newAdet).toFixed(2);
    }
    
    // Tabloyu yeniden render et
    this.renderTable();
    this.updateSummary();
},

    // Satır sil
    deleteRow: function(index) {
        if (confirm('Bu satırı silmek istediğinizden emin misiniz?')) {
            this.tableData.splice(index, 1);
            this.reorderPNo();
            this.renderTable();
            this.updateSummary();
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
            this.tableData = [];
            this.pNoCounter = 1;
            this.renderTable();
            this.updateSummary();
            this.showNotification('Tablo temizlendi', 'success');
        }
    },

    // Özet güncelleme
updateSummary: function() {
    const ozetPanel = document.getElementById('ozetPanel');
    
    if (this.tableData.length === 0) {
        ozetPanel.style.display = 'none';
        return;
    }
    
    ozetPanel.style.display = 'block';
    
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

    // Proje bilgilerini al
    getProjectInfo: function() {
        return {
            projeAdi: document.getElementById('projeAdi').value || '',
            siparisNo: document.getElementById('siparisNo').value || '',
            resimAciklamasi: document.getElementById('resimAciklamasi').value || '',
            resimNo: document.getElementById('resimNo').value || '',
            revizyonNo: document.getElementById('revizyonNo').value || ''
        };
    },

    // Proje bilgilerini yükle
    loadProjectInfo: function(info) {
        document.getElementById('projeAdi').value = info.projeAdi || '';
        document.getElementById('siparisNo').value = info.siparisNo || '';
        document.getElementById('resimAciklamasi').value = info.resimAciklamasi || '';
        document.getElementById('resimNo').value = info.resimNo || '';
        document.getElementById('revizyonNo').value = info.revizyonNo || '';
    },

    // Tüm verileri temizle
    clearAll: function() {
        // Proje bilgilerini temizle
        document.getElementById('projeAdi').value = '';
        document.getElementById('siparisNo').value = '';
        document.getElementById('resimAciklamasi').value = '';
        document.getElementById('resimNo').value = '';
        document.getElementById('revizyonNo').value = '';
        
        // Tabloyu temizle
        this.tableData = [];
        this.pNoCounter = 1;
        this.renderTable();
        this.updateSummary();
        
        // Formu temizle
        Calculator.clearForm();
        
        this.showNotification('Tüm veriler temizlendi', 'success');
    },

    // Bildirim göster (UI Manager tarafından override edilecek)
    showNotification: function(message, type = 'info') {
        console.log(`[${type.toUpperCase()}] ${message}`);
    }
};

// Modülü window objesine bağla - ELECTRON İÇİN KRİTİK
window.TableManager = TableManager;

})(window);