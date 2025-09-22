// Ana Renderer Process
const { ipcRenderer } = require('electron');

// DOM hazır olduğunda tüm sistemi başlat
document.addEventListener('DOMContentLoaded', () => {
    console.log('Malzeme Hesaplama Sistemi başlatılıyor...');
    
    // Önce modüllerin yüklendiğinden emin ol
    if (typeof MaterialData === 'undefined' || 
        typeof Calculator === 'undefined' || 
        typeof TableManager === 'undefined' || 
        typeof ExcelManager === 'undefined' || 
        typeof UIManager === 'undefined') {
        console.error('Modüller yüklenemedi! Lütfen sayfayı yenileyin.');
        alert('Sistem yüklenemedi. Lütfen programı yeniden başlatın.');
        return;
    }
    
    // Modülleri başlat
    MaterialData.initialize();
    
    // MaterialCalculator objesini BURADA oluştur - DOM ve modüller hazır olduktan sonra
    window.MaterialCalculator = {
        pNoSayaci: 1,
        
        // Malzeme Türü Değişimi
        malzemeTuruDegisti: function() {
            const tur = document.getElementById('malzemeTuru').value;
            const olcuAlanlari = document.getElementById('olcuAlanlari');
            const suHacmiCard = document.getElementById('suHacmiCard');
            
            console.log('Malzeme türü değişti:', tur);
            console.log('MaterialData mevcut mu?', typeof MaterialData !== 'undefined');
            console.log('ProfilVerileri:', MaterialData.profilVerileri);
            
            // Önceki alanları temizle
            olcuAlanlari.innerHTML = '';
            
            // Su hacmi kartını sadece boru seçildiğinde göster
            if (tur === 'boru') {
                suHacmiCard.style.display = 'flex';
            } else {
                suHacmiCard.style.display = 'none';
                document.getElementById('suHacmi').textContent = '0.00';
            }
            
            // Boş seçimde çık
            if (!tur) {
                return;
            }
            
            let htmlContent = '';
            
            // Profil türleri için kontrol
            if (['ipe', 'hea', 'heb', 'npu', 'npi'].includes(tur)) {  // npi eklendi
                console.log(`${tur} profil verileri:`, MaterialData.profilVerileri[tur]);
    
                const profilData = MaterialData.profilVerileri[tur];
                if (!profilData) {
                    console.error(`${tur} için profil verisi bulunamadı!`);
                    alert(`${tur.toUpperCase()} profil verileri yüklenemedi!`);
                    return;
                }
    
                const options = Object.keys(profilData).map(boyut => 
                    `<option value="${boyut}">${tur.toUpperCase()} ${boyut}</option>`
                ).join('');
    
                htmlContent = `
                    <div class="form-row">
                        <div class="form-group">
                            <label for="profilBoyutu"><span class="label-icon">📏</span> Profil Boyutu</label>
                            <select id="profilBoyutu">${options}</select>
                        </div>
                        <div class="form-group">
                            <label for="uzunluk"><span class="label-icon">↕️</span> Uzunluk (mm)</label>
                            <input type="number" id="uzunluk" step="1" min="0" placeholder="0">
                        </div>
                    </div>
                `;
            } else {
                // Diğer malzeme türleri için
                switch(tur) {
                    case 'sac':
                        htmlContent = `
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="kalinlik"><span class="label-icon">📏</span> Kalınlık (mm)</label>
                                    <input type="number" id="kalinlik" step="0.1" min="0" placeholder="0.0">
                                </div>
                                <div class="form-group">
                                    <label for="en"><span class="label-icon">↔️</span> En (mm)</label>
                                    <input type="number" id="en" step="1" min="0" placeholder="0">
                                </div>
                                <div class="form-group">
                                    <label for="boy"><span class="label-icon">↕️</span> Boy (mm)</label>
                                    <input type="number" id="boy" step="1" min="0" placeholder="0">
                                </div>
                            </div>
                        `;
                        break;
                        
                    case 'lama':
                        htmlContent = `
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="kalinlik"><span class="label-icon">📏</span> Kalınlık (mm)</label>
                                    <input type="number" id="kalinlik" step="0.1" min="0" placeholder="0.0">
                                </div>
                                <div class="form-group">
                                    <label for="genislik"><span class="label-icon">↔️</span> Genişlik (mm)</label>
                                    <input type="number" id="genislik" step="1" min="0" placeholder="0">
                                </div>
                                <div class="form-group">
                                    <label for="uzunluk"><span class="label-icon">↕️</span> Uzunluk (mm)</label>
                                    <input type="number" id="uzunluk" step="1" min="0" placeholder="0">
                                </div>
                            </div>
                        `;
                        break;
                        
                    case 'boru':
                        htmlContent = `
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="disCap"><span class="label-icon">⭕</span> Dış Çap (mm)</label>
                                    <input type="number" id="disCap" step="0.1" min="0" placeholder="0.0">
                                </div>
                                <div class="form-group">
                                    <label for="etKalinlik"><span class="label-icon">📏</span> Et Kalınlığı (mm)</label>
                                    <input type="number" id="etKalinlik" step="0.1" min="0" placeholder="0.0">
                                </div>
                                <div class="form-group">
                                    <label for="uzunluk"><span class="label-icon">↕️</span> Uzunluk (mm)</label>
                                    <input type="number" id="uzunluk" step="1" min="0" placeholder="0">
                                </div>
                            </div>
                        `;
                        break;
                        
                    case 'kosebent':
                        htmlContent = `
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="kenar1"><span class="label-icon">📐</span> 1. Kenar (mm)</label>
                                    <input type="number" id="kenar1" step="1" min="0" placeholder="0">
                                </div>
                                <div class="form-group">
                                    <label for="kenar2"><span class="label-icon">📐</span> 2. Kenar (mm)</label>
                                    <input type="number" id="kenar2" step="1" min="0" placeholder="0">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="etKalinlik"><span class="label-icon">📏</span> Et Kalınlığı (mm)</label>
                                    <input type="number" id="etKalinlik" step="0.1" min="0" placeholder="0.0">
                                </div>
                                <div class="form-group">
                                    <label for="uzunluk"><span class="label-icon">↕️</span> Uzunluk (mm)</label>
                                    <input type="number" id="uzunluk" step="1" min="0" placeholder="0">
                                </div>
                            </div>
                        `;
                        break;

                        case 'ozelFlans':
                            htmlContent = `
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="ozelFlansDis"><span class="label-icon">⭕</span> Dış Çap (mm)</label>
                                        <input type="number" id="ozelFlansDis" step="0.1" min="0" placeholder="0.0">
                                    </div>
                                    <div class="form-group">
                                        <label for="ozelFlansIc"><span class="label-icon">⭕</span> İç Çap (mm)</label>
                                        <input type="number" id="ozelFlansIc" step="0.1" min="0" placeholder="0.0">
                                    </div>
                                    <div class="form-group">
                                        <label for="ozelFlansKalinlik"><span class="label-icon">📏</span> Kalınlık (mm)</label>
                                        <input type="number" id="ozelFlansKalinlik" step="0.1" min="0" placeholder="0.0">
                                    </div>
                                </div>
                            `;
                            break;

                        case 'mil':
                            htmlContent = `
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="milCap"><span class="label-icon">⭕</span> Çap (mm)</label>
                                        <input type="number" id="milCap" step="0.1" min="0" placeholder="0.0">
                                    </div>
                                    <div class="form-group">
                                        <label for="milBoy"><span class="label-icon">↕️</span> Boy (mm)</label>
                                        <input type="number" id="milBoy" step="1" min="0" placeholder="0">
                                    </div>
                                </div>
                            `;
                            break;

                            case 'izgara':
                                console.log('Izgara elemanları verileri:', MaterialData.izgaraElemanlari);
                                
                                // Izgara elemanlarının listesini oluştur
                                const izgaraOptions = Object.keys(MaterialData.izgaraElemanlari).map(eleman => 
                                    `<option value="${eleman}">${eleman}</option>`
                                ).join('');
                                
                                htmlContent = `
                                    <div class="form-row">
                                        <div class="form-group full-width">
                                            <label for="izgaraTipi"><span class="label-icon">🔩</span> Izgara Elemanı Tipi</label>
                                            <select id="izgaraTipi" onchange="MaterialCalculator.izgaraAgirligiGuncelle()">
                                                <option value="">Seçiniz...</option>
                                                ${izgaraOptions}
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group">
                                            <label for="izgaraBirimAgirlik"><span class="label-icon">⚖️</span> Birim Ağırlık (kg/adet)</label>
                                            <input type="text" id="izgaraBirimAgirlik" readonly style="background-color: #f5f5f5;">
                                        </div>
                                        <div class="form-group">
                                            <label for="izgaraMalzeme"><span class="label-icon">🔬</span> Malzeme</label>
                                            <input type="text" id="izgaraMalzeme" readonly style="background-color: #f5f5f5;">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group">
                                            <label for="izgaraOlcu"><span class="label-icon">📏</span> Ölçü Kodu</label>
                                            <input type="text" id="izgaraOlcu" readonly style="background-color: #f5f5f5;">
                                        </div>
                                        <div class="form-group">
                                            <label for="izgaraNorm"><span class="label-icon">📋</span> EN Normu</label>
                                            <input type="text" id="izgaraNorm" readonly style="background-color: #f5f5f5;">
                                        </div>
                                    </div>
                                `;
                                break;

                            case 'ozelMalzeme':
                                console.log('Özel malzeme seçildi');
                                
                                // Malzeme cinsi alanını gizle
                                const malzemeCinsiDiv = document.getElementById('malzemeCinsi')?.parentElement?.parentElement;
                                if (malzemeCinsiDiv) {
                                    malzemeCinsiDiv.style.display = 'none';
                                }
                                
                                htmlContent = `
                                    <div class="form-row">
                                        <div class="form-group full-width">
                                            <label for="ozelMalzemeTuru"><span class="label-icon">📝</span> Malzeme Türü Açıklaması *</label>
                                            <input type="text" id="ozelMalzemeTuru" placeholder="Malzeme türünü yazınız (Zorunlu)">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group full-width">
                                            <label for="ozelMalzemeCinsi"><span class="label-icon">🔬</span> Malzeme Cinsi</label>
                                            <input type="text" id="ozelMalzemeCinsi" placeholder="İsteğe bağlı">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group full-width">
                                            <label for="ozelMalzemeOlculer"><span class="label-icon">📏</span> Ölçüler</label>
                                            <input type="text" id="ozelMalzemeOlculer" placeholder="Örn: 100x50x10mm (İsteğe bağlı)">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group full-width">
                                            <label for="ozelMalzemeNorm"><span class="label-icon">📋</span> EN Normu</label>
                                            <input type="text" id="ozelMalzemeNorm" placeholder="Örn: EN 10025 (İsteğe bağlı)">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group">
                                            <label for="ozelMalzemeBirimAgirlik"><span class="label-icon">⚖️</span> Birim Ağırlık (kg)</label>
                                            <input type="number" id="ozelMalzemeBirimAgirlik" step="0.01" min="0" placeholder="0.00 (İsteğe bağlı)">
                                        </div>
                                    </div>
                                `;
                                break;

                        case 'flans':
                            console.log('Flanş verileri:', MaterialData.flansVerileri);
    
                            // DN ölçüleri
                            const dnSizes = ['15', '20', '25', '32', '40', '50', '65', '80', '100', '125', '150', '200', '250', '300', '350', '400', '500', '600'];
                            const dnOptions = dnSizes.map(size => 
                                `<option value="${size}">DN${size}</option>`
                            ).join('');
    
                            // PN sınıfları
                            const pnClasses = ['PN6', 'PN10', 'PN16', 'PN25', 'PN40'];
                            const pnOptions = pnClasses.map(pn => 
                                `<option value="${pn}">${pn}</option>`
                            ).join('');
    
                            htmlContent = `
                                <div class="form-row">
                                    <div class="form-group full-width">
                                        <label for="flansTipi"><span class="label-icon">⚙️</span> Flanş Tipi</label>
                                        <select id="flansTipi" onchange="MaterialCalculator.flansAgirligiGuncelle()">
                                            <option value="duzFlans">Düz Flanş (EN 1092-1 Tip 1)</option>
                                            <option value="kaynakBoyunluFlans">Kaynak Boyunlu Flanş (EN 1092-1 Tip 11)</option>
                                            <option value="korFlans">Kör Flanş (EN 1092-1 Tip 5)</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="dnOlcusu"><span class="label-icon">📏</span> DN Ölçüsü</label>
                                        <select id="dnOlcusu" onchange="MaterialCalculator.flansAgirligiGuncelle()">
                                            ${dnOptions}
                                            </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="pnSinifi"><span class="label-icon">🔧</span> PN Sınıfı</label>
                                        <select id="pnSinifi" onchange="MaterialCalculator.flansAgirligiGuncelle()">
                                            ${pnOptions}
                                        </select>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group full-width">
                                        <label for="flansAgirlik"><span class="label-icon">⚖️</span> Birim Ağırlık (kg/adet)</label>
                                        <input type="text" id="flansAgirlik" readonly style="background-color: #f5f5f5;">
                                    </div>
                                </div>
                            `;
    
                            // İlk yükleme için ağırlığı hesapla
                            setTimeout(() => {
                                MaterialCalculator.flansAgirligiGuncelle();
                            }, 100);
                            break;

                            case 'dirsek':
                                console.log('Dirsek malzeme türü seçildi');
                                
                                const dirsekTipleri = Object.keys(MaterialData.DIRSEK_TIPLERI).map(tip => 
                                    `<option value="${tip}">${MaterialData.DIRSEK_TIPLERI[tip]}</option>`
                                ).join('');
                                
                                const dnOlculeri = ['15', '20', '25', '32', '40', '50', '65', '80', '100', '125', '150', '200', '250', '300']
                                    .map(dn => `<option value="${dn}">DN${dn}</option>`).join('');
                                
                                htmlContent = `
                                    <div class="form-row">
                                        <div class="form-group full-width">
                                            <label for="dirsekTipi"><span class="label-icon">🔧</span> Dirsek Tipi</label>
                                            <select id="dirsekTipi" onchange="MaterialCalculator.dirsekTipiDegisti()">
                                                ${dirsekTipleri}
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group">
                                            <label for="dirsekDN"><span class="label-icon">📏</span> Nominal Çap (DN)</label>
                                            <select id="dirsekDN" onchange="MaterialCalculator.dirsekDNDegisti()">
                                                ${dnOlculeri}
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="dirsekEtKalinlik"><span class="label-icon">📊</span> Et Kalınlığı (mm)</label>
                                            <select id="dirsekEtKalinlik">
                                                <option value="">Önce DN seçin</option>
                                            </select>
                                        </div>
                                    </div>
                                `;
                                break;
                        
                    case 'kutu':
                        htmlContent = `
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="genislik"><span class="label-icon">↔️</span> Genişlik (mm)</label>
                                    <input type="number" id="genislik" step="1" min="0" placeholder="0">
                                </div>
                                <div class="form-group">
                                    <label for="yukseklik"><span class="label-icon">↕️</span> Yükseklik (mm)</label>
                                    <input type="number" id="yukseklik" step="1" min="0" placeholder="0">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="etKalinlik"><span class="label-icon">📏</span> Et Kalınlığı (mm)</label>
                                    <input type="number" id="etKalinlik" step="0.1" min="0" placeholder="0.0">
                                </div>
                                <div class="form-group">
                                    <label for="uzunluk"><span class="label-icon">↕️</span> Uzunluk (mm)</label>
                                    <input type="number" id="uzunluk" step="1" min="0" placeholder="0">
                                </div>
                            </div>
                        `;
                        break;

                        
                    default:
                        console.error('Bilinmeyen malzeme türü:', tur);
                        return;
                }
            }
            
            // HTML içeriğini ekle
            olcuAlanlari.innerHTML = htmlContent;
            console.log('Ölçü alanları eklendi');
            
            // İlk input'a focus ver
            setTimeout(() => {
                const firstInput = olcuAlanlari.querySelector('input, select');
                if (firstInput) {
                    firstInput.focus();
                }
            }, 100);
        },

        // Izgara ağırlığını güncelle
        izgaraAgirligiGuncelle: function() {
            const izgaraTipi = document.getElementById('izgaraTipi')?.value;
            
            if (!izgaraTipi) {
                document.getElementById('izgaraBirimAgirlik').value = '';
                document.getElementById('izgaraMalzeme').value = '';
                document.getElementById('izgaraOlcu').value = '';
                document.getElementById('izgaraNorm').value = '';
                return;
            }
            
            const izgaraData = MaterialData.izgaraElemanlari[izgaraTipi];
            if (izgaraData) {
                document.getElementById('izgaraBirimAgirlik').value = izgaraData.adetKg.toFixed(2);
                document.getElementById('izgaraMalzeme').value = izgaraData.malzeme;
                document.getElementById('izgaraOlcu').value = izgaraData.olcu;
                document.getElementById('izgaraNorm').value = izgaraData.norm;
            }
        },

        // Flanş ağırlığını güncelle - YENİ FONKSİYON BURAYA EKLE
            flansAgirligiGuncelle: function() {
                const flansTipi = document.getElementById('flansTipi')?.value;
                const dnOlcusu = document.getElementById('dnOlcusu')?.value;
                const pnSinifi = document.getElementById('pnSinifi')?.value;
                
                if (!flansTipi || !dnOlcusu || !pnSinifi) return;
                
                const flansData = MaterialData.flansVerileri[flansTipi];
                if (flansData && flansData[dnOlcusu] && flansData[dnOlcusu][pnSinifi]) {
                    const agirlik = flansData[dnOlcusu][pnSinifi];
                    document.getElementById('flansAgirlik').value = agirlik.toFixed(2);
                }
            },

            dirsekTipiDegisti: function() {
                this.dirsekDNDegisti();
            },

            dirsekDNDegisti: function() {
                const dirsekTipi = document.getElementById('dirsekTipi')?.value;
                const dnOlcusu = document.getElementById('dirsekDN')?.value;
                const etKalinlikSelect = document.getElementById('dirsekEtKalinlik');
                
                if (!dirsekTipi || !dnOlcusu || !etKalinlikSelect) return;
                
                const dirsekData = MaterialData.dirsekVerileri[dirsekTipi];
                if (dirsekData && dirsekData[dnOlcusu]) {
                    const kalinliklar = Object.keys(dirsekData[dnOlcusu]);
                    etKalinlikSelect.innerHTML = kalinliklar.map(k => 
                        `<option value="${k}">${k} mm</option>`
                    ).join('');
                }
            },

        // Hesaplama
        hesapla: function() {
            console.log('Hesapla fonksiyonu çağrıldı');
            const result = Calculator.calculate();
            if (result) {
                console.log('Hesaplama başarılı');
            }
        },

        // Tabloya Ekle
        tabloyaEkle: function() {
            console.log('Tabloya ekle fonksiyonu çağrıldı');
            const result = TableManager.addRow();
            if (result) {
                console.log('Tabloya eklendi');
            }
        },

        // Temizle
        temizle: function() {
            console.log('Temizle fonksiyonu çağrıldı');
            
            // Izgara elemanları için özel temizleme
            const izgaraTipi = document.getElementById('izgaraTipi');
            if (izgaraTipi) izgaraTipi.value = '';
            
            const izgaraBirimAgirlik = document.getElementById('izgaraBirimAgirlik');
            if (izgaraBirimAgirlik) izgaraBirimAgirlik.value = '';
            
            const izgaraMalzeme = document.getElementById('izgaraMalzeme');
            if (izgaraMalzeme) izgaraMalzeme.value = '';
            
            const izgaraOlcu = document.getElementById('izgaraOlcu');
            if (izgaraOlcu) izgaraOlcu.value = '';
            
            const izgaraNorm = document.getElementById('izgaraNorm');
            if (izgaraNorm) izgaraNorm.value = '';
            
            Calculator.clearForm();
        },

        // Tabloyu Temizle
        tabloyuTemizle: function() {
            console.log('Tabloyu temizle fonksiyonu çağrıldı');
            TableManager.clearTable();
        },

        // Satır Düzenle
        satirDuzenle: function(btn) {
            const tr = btn.closest('tr');
            const rowIndex = Array.from(tr.parentNode.children).indexOf(tr);
            TableManager.editRow(rowIndex);
        },

        // Satır Sil
        satirSil: function(btn) {
            const tr = btn.closest('tr');
            const rowIndex = Array.from(tr.parentNode.children).indexOf(tr);
            TableManager.deleteRow(rowIndex);
        }
    };
    
    // TableManager'a pNo sayacını ayarla
    TableManager.pNoCounter = MaterialCalculator.pNoSayaci;
    
    // Event Listeners
    setupEventListeners();

    // Excel butonları için event listener'ları ekle
    const btnExcelKaydet = document.getElementById('btnExcelKaydet');
    const btnExcelAc = document.getElementById('btnExcelAc');
    
    if (btnExcelKaydet) {
        btnExcelKaydet.addEventListener('click', () => {
            console.log('Excel Kaydet butonuna tıklandı');
            ExcelManager.exportToExcel();
        });
    }
    
    if (btnExcelAc) {
        btnExcelAc.addEventListener('click', () => {
            console.log('Excel Aç butonuna tıklandı');
            ExcelManager.importFromExcel();
        });
    }
    
    // Modüllerin doğru yüklendiğini kontrol et
    console.log('Modül Durumları:');
    console.log('MaterialData:', typeof MaterialData);
    console.log('Calculator:', typeof Calculator);
    console.log('TableManager:', typeof TableManager);
    console.log('ExcelManager:', typeof ExcelManager);
    console.log('UIManager:', typeof UIManager);
    console.log('MaterialCalculator:', typeof MaterialCalculator);
    
    // Başlangıç mesajı
    UIManager.showNotification('Program başarıyla yüklendi', 'success');
    
    // Kayıtlı verileri yükle
    loadSavedData();

    // Otomatik kayıt fonksiyonu
    window.autoSaveData = async function() {
        const tableData = TableManager.getTableData();
        const data = {
            projectInfo: TableManager.getProjectInfo(),
            tableData: tableData,
            customMaterials: MaterialData.getCustomMaterials(),
            customProfiles: MaterialData.getCustomProfiles(),
            version: '1.0.0',
            date: new Date().toISOString()
        };
        
        await ipcRenderer.invoke('save-data', data);
        console.log('Otomatik kayıt yapıldı:', new Date().toLocaleTimeString());
    };

    // Her 30 saniyede bir otomatik kaydet
    setInterval(() => {
        const tableData = TableManager.getTableData();
        if (tableData.length > 0) {
            window.autoSaveData();
        }
    }, 30000);

    // Sayfa yüklendiğinde kayıtlı verileri otomatik yükle
    async function loadSavedData() {
        try {
            const result = await ipcRenderer.invoke('load-data');
            if (result.success && result.data) {
                const data = result.data;
                
                if (data.projectInfo) {
                    TableManager.loadProjectInfo(data.projectInfo);
                }
                
                if (data.tableData && data.tableData.length > 0) {
                    TableManager.loadTableData(data.tableData);
                    UIManager.showNotification('Önceki oturum verileri yüklendi', 'info');
                }
                
                if (data.customMaterials) {
                    localStorage.setItem('customMaterials', JSON.stringify(data.customMaterials));
                    MaterialData.loadCustomMaterials();
                }
                
                if (data.customProfiles) {
                    localStorage.setItem('customProfiles', JSON.stringify(data.customProfiles));
                    MaterialData.loadCustomProfiles();
                }
            }
        } catch (error) {
            console.log('Kayıtlı veri yüklenemedi:', error);
        }
    }

    // Fonksiyonu çağır
    loadSavedData();
});

// Event Listener'ları ayarla
function setupEventListeners() {
    // Modal kapatma
    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            const modal = document.getElementById('settingsModal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Enter tuşu ile hesaplama
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
            const activeElement = document.activeElement;
            if (activeElement && activeElement.type === 'number' && 
                activeElement.id !== 'adet' && activeElement.id !== 'heatNo') {
                MaterialCalculator.hesapla();
            }
        }
    });
}

// IPC Event Listeners
ipcRenderer.on('menu-new', () => {
    if (confirm('Mevcut tüm veriler silinecek. Emin misiniz?')) {
        TableManager.clearAll();
    }
});

ipcRenderer.on('menu-open-excel', () => {
    ExcelManager.importFromExcel();
});

ipcRenderer.on('menu-save-excel', () => {
    ExcelManager.exportToExcel();
});

ipcRenderer.on('add-material-type', () => {
    showAddMaterialTypeDialog();
});

ipcRenderer.on('add-material-grade', () => {
    UIManager.showAddMaterialGradeForm();
});

ipcRenderer.on('open-settings', () => {
    showSettingsDialog();
});

ipcRenderer.on('open-help', () => {
    showHelpDialog();
});

// Yeni malzeme türü ekleme dialogu
function showAddMaterialTypeDialog() {
    const content = `
        <div class="settings-section">
            <h3>🔧 Yeni Malzeme Türü Ekle</h3>
            <p class="info-text">Bu özellik yakında eklenecektir. Şu anda mevcut malzeme türlerini kullanabilirsiniz.</p>
            <div class="material-type-list">
                <h4>Mevcut Malzeme Türleri:</h4>
                <ul style="list-style: none;">
                    <li>✓ Sac</li>
                    <li>✓ Lama</li>
                    <li>✓ Boru</li>
                    <li>✓ L Köşebent</li>
                    <li>✓ NPU Profil</li>
                    <li>✓ NPI Profil</li>
                    <li>✓ HEB Profil</li>
                    <li>✓ HEA Profil</li>
                    <li>✓ IPE Profil</li>
                    <li>✓ Kutu Profil</li>
                    <li>✓ Standart Flanş</li>
                    <li>✓ Özel Flanş</li>
                     <li>✓ Mil</li>
                </ul>
            </div>
        </div>
        <div class="modal-footer">
            <button onclick="UIManager.closeModal()" class="btn btn-primary">Tamam</button>
        </div>
    `;
    
    UIManager.openModal(content, 'Malzeme Türü Yönetimi');
}

// Ayarlar dialogu
function showSettingsDialog() {
    const customMaterials = MaterialData.getCustomMaterials();
    const customProfiles = MaterialData.getCustomProfiles();
    
    const content = `
        <div class="settings-tabs">
            <div class="tab-buttons">
                <button class="tab-btn active" onclick="switchTab('general')">Genel</button>
                <button class="tab-btn" onclick="switchTab('materials')">Malzemeler</button>
                <button class="tab-btn" onclick="switchTab('backup')">Yedekleme</button>
            </div>
            
            <div class="tab-content" id="general-tab">
                <h3>📋 Firma Bilgileri</h3>
                <div class="form-group">
                    <label>Firma Adı</label>
                    <input type="text" id="firmaAdi" value="TETA Kazan">
                </div>
                <div class="form-group">
                    <label>Adres</label>
                    <textarea id="firmaAdres" rows="3">Şair Nedim Caddesi\nHacı Halitbey Sokak No:7\nBeşiktaş - İSTANBUL</textarea>
                </div>
                <div class="form-group">
                    <label>Telefon</label>
                    <input type="text" id="firmaTel" value="+90 212 236 25 57">
                </div>
                <div class="form-group">
                    <label>E-Mail</label>
                    <input type="email" id="firmaEmail" value="teta@tetakazan.com.tr">
                </div>
            </div>
            
            <div class="tab-content" id="materials-tab" style="display:none;">
                <h3>🔬 Özel Malzemeler</h3>
                <div class="custom-materials-list">
                    <h4>Eklenen Malzeme Cinsleri:</h4>
                    ${customMaterials.length > 0 ? 
                        '<ul>' + customMaterials.map(m => 
                            `<li>${m.kod} - ${m.enNormu} (${m.yogunluk} kg/m³)</li>`
                        ).join('') + '</ul>' : 
                        '<p>Henüz özel malzeme eklenmemiş.</p>'
                    }
                </div>
                <button onclick="clearCustomData()" class="btn btn-danger">Tüm Özel Verileri Sil</button>
            </div>
            
            <div class="tab-content" id="backup-tab" style="display:none;">
                <h3>💾 Yedekleme ve Geri Yükleme</h3>
                <div class="backup-section">
                    <button onclick="backupData()" class="btn btn-success">
                        <span class="btn-icon">💾</span> Verileri Yedekle
                    </button>
                    <button onclick="restoreData()" class="btn btn-primary">
                        <span class="btn-icon">📂</span> Verileri Geri Yükle
                    </button>
                </div>
                <div class="auto-save-section">
                    <label>
                        <input type="checkbox" id="autoSave" checked> Otomatik kaydetme
                    </label>
                    <p class="info-text">Program kapatılırken veriler otomatik olarak kaydedilir.</p>
                </div>
            </div>
        </div>
        
        <div class="modal-footer">
            <button onclick="saveSettings()" class="btn btn-success">Kaydet</button>
            <button onclick="UIManager.closeModal()" class="btn btn-secondary">İptal</button>
        </div>
    `;
    
    UIManager.openModal(content, 'Ayarlar');
}

// Yardım dialogu
function showHelpDialog() {
    const content = `
        <div class="help-content">
            <h3>📖 Kullanım Kılavuzu</h3>
            
            <div class="help-section">
                <h4>1. Proje Bilgileri</h4>
                <p>Sol panelde bulunan proje bilgileri alanlarını doldurarak başlayın.</p>
            </div>
            
            <div class="help-section">
                <h4>2. Malzeme Seçimi</h4>
                <p>Malzeme türü ve cinsini seçin. Her malzeme türü için farklı ölçü alanları görünecektir.</p>
            </div>
            
            <div class="help-section">
                <h4>3. Ölçü Girişi</h4>
                <p>Seçtiğiniz malzeme türüne göre gerekli ölçüleri girin.</p>
            </div>
            
            <div class="help-section">
                <h4>4. Hesaplama</h4>
                <p>"Hesapla" butonuna tıklayarak birim ve toplam ağırlıkları hesaplayın.</p>
            </div>
            
            <div class="help-section">
                <h4>5. Tabloya Ekleme</h4>
                <p>"Tabloya Ekle" butonuyla hesaplanan malzemeyi listeye ekleyin.</p>
            </div>
        </div>
        
        <div class="modal-footer">
            <button onclick="UIManager.closeModal()" class="btn btn-primary">Tamam</button>
        </div>
    `;
    
    UIManager.openModal(content, 'Yardım');
}

// Window Functions
window.switchTab = function(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
    });
    event.target.classList.add('active');
    document.getElementById(`${tabName}-tab`).style.display = 'block';
};

window.clearCustomData = function() {
    if (confirm('Tüm özel malzeme ve profil verilerini silmek istediğinizden emin misiniz?')) {
        MaterialData.clearCustomData();
        UIManager.showNotification('Özel veriler temizlendi', 'success');
        showSettingsDialog();
    }
};

window.backupData = async function() {
    const data = {
        projectInfo: TableManager.getProjectInfo(),
        tableData: TableManager.getTableData(),
        customMaterials: MaterialData.getCustomMaterials(),
        customProfiles: MaterialData.getCustomProfiles(),
        version: '1.0.0',
        date: new Date().toISOString()
    };
    
    const result = await ipcRenderer.invoke('save-data', data);
    
    if (result.success) {
        UIManager.showNotification('Veriler başarıyla yedeklendi', 'success');
    } else {
        UIManager.showNotification('Yedekleme başarısız: ' + result.error, 'error');
    }
};

window.restoreData = async function() {
    if (!confirm('Mevcut veriler silinecek. Devam etmek istiyor musunuz?')) {
        return;
    }
    
    const result = await ipcRenderer.invoke('load-data');
    
    if (result.success) {
        const data = result.data;
        
        if (data.projectInfo) {
            TableManager.loadProjectInfo(data.projectInfo);
        }
        
        if (data.tableData) {
            TableManager.loadTableData(data.tableData);
        }
        
        if (data.customMaterials) {
            localStorage.setItem('customMaterials', JSON.stringify(data.customMaterials));
            MaterialData.loadCustomMaterials();
        }
        
        if (data.customProfiles) {
            localStorage.setItem('customProfiles', JSON.stringify(data.customProfiles));
            MaterialData.loadCustomProfiles();
        }
        
        UIManager.showNotification('Veriler başarıyla geri yüklendi', 'success');
    } else {
        UIManager.showNotification('Yedek dosya bulunamadı', 'warning');
    }
};

window.saveSettings = function() {
    const firmaAdi = document.getElementById('firmaAdi').value;
    const firmaAdres = document.getElementById('firmaAdres').value;
    const firmaTel = document.getElementById('firmaTel').value;
    const firmaEmail = document.getElementById('firmaEmail').value;
    const autoSave = document.getElementById('autoSave').checked;
    
    localStorage.setItem('firmaBilgileri', JSON.stringify({
        adi: firmaAdi,
        adres: firmaAdres,
        telefon: firmaTel,
        email: firmaEmail
    }));
    
    localStorage.setItem('autoSave', autoSave);
    
    UIManager.showNotification('Ayarlar kaydedildi', 'success');
    UIManager.closeModal();
};

// Kayıtlı verileri yükle
async function loadSavedDataWithConfirmation() {
    const autoSave = localStorage.getItem('autoSave');
    if (autoSave === 'false') return;
    
    try {
        const result = await ipcRenderer.invoke('load-data');
        if (result.success && result.data) {
            const data = result.data;
            
            const savedDate = new Date(data.date);
            const now = new Date();
            const hoursDiff = (now - savedDate) / (1000 * 60 * 60);
            
            if (hoursDiff < 24 && data.tableData && data.tableData.length > 0) {
                // Kullanıcıya sor
                const userConfirmation = confirm('Önceki oturum verileri bulundu. Yüklemek istiyor musunuz?');
                
                if (userConfirmation) {
                    if (data.projectInfo) {
                        TableManager.loadProjectInfo(data.projectInfo);
                    }
                    
                    if (data.tableData) {
                        TableManager.loadTableData(data.tableData);
                        UIManager.showNotification('Önceki oturum verileri yüklendi', 'info');
                    }
                }
            }
        }
    } catch (error) {
        console.log('Kayıtlı veri yüklenemedi:', error);
    }
}

// Program kapatılırken verileri kaydet
window.addEventListener('beforeunload', async (e) => {
    const autoSave = localStorage.getItem('autoSave');
    if (autoSave === 'false') return;
    
    const tableData = TableManager.getTableData();
    if (tableData.length > 0) {
        const data = {
            projectInfo: TableManager.getProjectInfo(),
            tableData: tableData,
            customMaterials: MaterialData.getCustomMaterials(),
            customProfiles: MaterialData.getCustomProfiles(),
            version: '1.0.0',
            date: new Date().toISOString()
        };
        
        await ipcRenderer.invoke('save-data', data);
    }
});

console.log('Renderer process başarıyla yüklendi.');