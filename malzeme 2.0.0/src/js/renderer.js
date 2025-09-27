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
        console.error('Temel modüller yüklenemedi! Lütfen sayfayı yenileyin.');
        alert('Sistem yüklenemedi. Lütfen programı yeniden başlatın.');
        return;
    }
    
    // Yeni modüllerin varlığını kontrol et
    const newModules = ['TabManager', 'ColumnManager', 'FilterManager', 'LanguageManager', 'DragDropManager', 'MaterialLibrary'];
    const missingModules = newModules.filter(module => typeof window[module] === 'undefined');
    
    if (missingModules.length > 0) {
        console.warn('Eksik modüller:', missingModules);
    }
    
    // Modülleri sırayla başlat
    try {
        // 1. Temel veri modülü
        MaterialData.initialize();
        console.log('✓ MaterialData başlatıldı');
        
        // 2. Dil yöneticisi (UI güncellemeleri için önce)
        if (typeof LanguageManager !== 'undefined') {
            LanguageManager.initialize();
            LanguageManager.applyInitialTranslations();
            console.log('✓ LanguageManager başlatıldı');
        }
        
        // 3. UI yöneticisi
        UIManager.initialize();
        console.log('✓ UIManager başlatıldı');
        
        // 4. Sekme yöneticisi
        if (typeof TabManager !== 'undefined') {
            TabManager.initialize();
            console.log('✓ TabManager başlatıldı');
        }
        
        // 5. Sütun yöneticisi
        if (typeof ColumnManager !== 'undefined') {
            ColumnManager.initialize();
            console.log('✓ ColumnManager başlatıldı');
        }
        
        // 6. Filtre yöneticisi
        if (typeof FilterManager !== 'undefined') {
            FilterManager.initialize();
            console.log('✓ FilterManager başlatıldı');
        }
        
        // 7. Sürükle-bırak yöneticisi
        if (typeof DragDropManager !== 'undefined') {
            DragDropManager.initialize();
            console.log('✓ DragDropManager başlatıldı');
        }
        
        
    } catch (error) {
        console.error('Modül başlatma hatası:', error);
        UIManager.showNotification('Bazı özellikler kullanılamayabilir', 'warning');
    }
    
    // MaterialCalculator objesini oluştur
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
                                
                                const dirsekTipleri = ['90', '180'].map(tip => 
                                    `<option value="${tip}">${tip}°</option>`
                                ).join('');
                                
                                const capDegerleri = [
                                    {cap: '21.3', dn: '15'}, {cap: '26.9', dn: '20'}, 
                                    {cap: '33.7', dn: '25'}, {cap: '42.4', dn: '32'},
                                    {cap: '48.3', dn: '40'}, {cap: '60.3', dn: '50'},
                                    {cap: '76.1', dn: '65'}, {cap: '88.9', dn: '80'},
                                    {cap: '114.3', dn: '100'}, {cap: '141.3', dn: '125'},
                                    {cap: '168.3', dn: '150'}, {cap: '219.1', dn: '200'},
                                    {cap: '273.0', dn: '250'}, {cap: '323.9', dn: '300'}
                                ];
                                
                                const capOptions = capDegerleri.map(item => 
                                    `<option value="${item.cap}">Ø${item.cap} (DN${item.dn})</option>`
                                ).join('');
                                
                                htmlContent = `
                                    <div class="form-row">
                                        <div class="form-group full-width">
                                            <label for="dirsekTipi"><span class="label-icon">🔧</span> Dirsek Açısı</label>
                                            <select id="dirsekTipi" onchange="MaterialCalculator.dirsekCapDegisti()">
                                                ${dirsekTipleri}
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group">
                                            <label for="dirsekCap"><span class="label-icon">📏</span> Çap (mm)</label>
                                            <select id="dirsekCap" onchange="MaterialCalculator.dirsekCapDegisti()">
                                                ${capOptions}
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="dirsekEtKalinlik"><span class="label-icon">📊</span> Et Kalınlığı (mm)</label>
                                            <select id="dirsekEtKalinlik">
                                                <option value="">Önce çap seçin</option>
                                            </select>
                                        </div>
                                    </div>
                                `;
                                break;

                            case 'eklenenMalzeme':
                                console.log('Eklenen malzeme seçildi');
                                
                                // Tüm özel malzemeleri getir
                                const ozelMalzemeler = MaterialData.getAllOzelMalzemeler();
                                const tumMalzemeler = [
                                    ...Object.values(ozelMalzemeler.hacimTabanli),
                                    ...Object.values(ozelMalzemeler.birimAgirlikTabanli)
                                ];
                                
                                if (tumMalzemeler.length === 0) {
                                    htmlContent = `
                                        <div class="form-row">
                                            <div class="form-group full-width">
                                                <div style="text-align: center; padding: 20px; color: #718096;">
                                                    <span style="font-size: 2rem;">📦</span>
                                                    <p style="margin-top: 10px;">Henüz eklenen malzeme bulunmuyor.</p>
                                                    <p style="font-size: 0.85rem; margin-top: 5px;">
                                                        Menüden "Malzeme Ekle" seçeneğini kullanarak yeni malzeme ekleyebilirsiniz.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    `;
                                } else {
                                    const malzemeOptions = tumMalzemeler.map(malzeme => 
                                        `<option value="${malzeme.kod}">${malzeme.ad} (${malzeme.tip === 'hacimTabanli' ? 'Hacim' : 'Birim'})</option>`
                                    ).join('');
                                    
                                    htmlContent = `
                                        <div class="form-row">
                                            <div class="form-group full-width">
                                                <label for="eklenenMalzemeTipi"><span class="label-icon">📦</span> Eklenen Malzeme Seçin</label>
                                                <select id="eklenenMalzemeTipi" onchange="MaterialCalculator.eklenenMalzemeDegisti()">
                                                    <option value="">Seçiniz...</option>
                                                    ${malzemeOptions}
                                                </select>
                                            </div>
                                        </div>
                                        <div id="eklenenMalzemeDetay"></div>
                                    `;
                                }
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
            
            // Focus yönetimi - DÜZELTME
            setTimeout(() => {
                const firstInput = olcuAlanlari.querySelector('input:not([readonly]), select');
                if (firstInput) {
                    // Focus'u zorla
                    firstInput.focus();
                    
                    // Focus alınamazsa tekrar dene
                    if (document.activeElement !== firstInput) {
                        firstInput.click();
                        setTimeout(() => firstInput.focus(), 50);
                    }
                }
                
                // Klavye olaylarını aktif et
                document.querySelectorAll('#olcuAlanlari input').forEach(input => {
                    input.removeAttribute('disabled');
                    input.addEventListener('focus', function() {
                        this.select();
                    });
                });
            }, 150);
        },

        // Ölçü alanlarını malzeme türüne göre getir
        getDimensionFieldsForType: function(tur) {
            const dimensionTemplates = {
                sac: `
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
                `,
                
                lama: `
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
                `,
                
                // Diğer türler için templateler...
                boru: this.getBoruTemplate(),
                kosebent: this.getKosebentTemplate(),
                flans: this.getFlansTemplate(),
                dirsek: this.getDirsekTemplate(),
                izgara: this.getIzgaraTemplate(),
                ozelMalzeme: this.getOzelMalzemeTemplate(),
                eklenenMalzeme: this.getEklenenMalzemeTemplate(),
                ozelFlans: this.getOzelFlansTemplate(),
                mil: this.getMilTemplate(),
                kutu: this.getKutuTemplate()
            };
            
            return dimensionTemplates[tur] || '';
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

            dirsekCapDegisti: function() {
                const dirsekTipi = document.getElementById('dirsekTipi')?.value;
                const dirsekCap = document.getElementById('dirsekCap')?.value;
                const etKalinlikSelect = document.getElementById('dirsekEtKalinlik');
                
                if (!dirsekTipi || !dirsekCap || !etKalinlikSelect) return;
                
                const capDnMap = {
                    '21.3': '15', '26.9': '20', '33.7': '25', '42.4': '32',
                    '48.3': '40', '60.3': '50', '76.1': '65', '88.9': '80',
                    '114.3': '100', '141.3': '125', '168.3': '150', '219.1': '200',
                    '273.0': '250', '323.9': '300'
                };
                
                const dnOlcusu = capDnMap[dirsekCap];
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
                // Test: Eklenen veriyi kontrol et
                TableManager.testLastRow();
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
        },

        // Eklenen malzeme değiştiğinde
        eklenenMalzemeDegisti: function() {
            const secilenMalzeme = document.getElementById('eklenenMalzemeTipi')?.value;
            const detayDiv = document.getElementById('eklenenMalzemeDetay');
            
            if (!secilenMalzeme || !detayDiv) {
                if (detayDiv) detayDiv.innerHTML = '';
                return;
            }
            
            console.log('Seçilen malzeme:', secilenMalzeme);
            
            // Malzeme verisini bul
            const ozelMalzemeler = MaterialData.getAllOzelMalzemeler();
            let malzemeData = ozelMalzemeler.hacimTabanli[secilenMalzeme] || 
                            ozelMalzemeler.birimAgirlikTabanli[secilenMalzeme];
            
            console.log('Bulunan malzeme verisi:', malzemeData);
            
            if (!malzemeData) {
                detayDiv.innerHTML = '<p style="color: red;">Malzeme verisi bulunamadı!</p>';
                return;
            }
            
            let htmlContent = '';
            
            if (malzemeData.tip === 'hacimTabanli') {
                // Hacim tabanlı malzeme için ölçü alanları
                const olcuAlanlariHtml = malzemeData.olcuAlanlari.map(alan => `
                    <div class="form-group">
                        <label for="${alan.id}">
                            <span class="label-icon">📏</span> ${alan.label} (${alan.birim})
                        </label>
                        <input type="number" id="${alan.id}" step="0.1" min="0" placeholder="0.0" required>
                    </div>
                `).join('');
                
                // Formül bilgisi
                const formulInfo = `
                    <div class="form-group full-width">
                        <label style="color: #718096; font-size: 0.8rem;">
                            Hesaplama Formülü: ${malzemeData.hesaplamaFormulu}
                        </label>
                    </div>
                `;
                
                htmlContent = `
                    <div class="form-row">
                        ${olcuAlanlariHtml}
                    </div>
                    ${formulInfo}
                `;
            } else {
                // Birim ağırlık tabanlı malzeme için bilgi gösterimi
                htmlContent = `
                    <div class="form-row">
                        <div class="form-group">
                            <label><span class="label-icon">⚖️</span> Birim Ağırlık</label>
                            <input type="text" value="${malzemeData.birimAgirlik} kg" readonly style="background-color: #f5f5f5;">
                        </div>
                        <div class="form-group">
                            <label><span class="label-icon">📏</span> Ölçüler</label>
                            <input type="text" value="${malzemeData.olculer}" readonly style="background-color: #f5f5f5;">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label><span class="label-icon">📋</span> Standart</label>
                            <input type="text" value="${malzemeData.standart}" readonly style="background-color: #f5f5f5;">
                        </div>
                        <div class="form-group">
                            <label><span class="label-icon">🔬</span> Malzeme Cinsi</label>
                            <input type="text" value="${malzemeData.malzemeCinsi}" readonly style="background-color: #f5f5f5;">
                        </div>
                    </div>
                `;
            }
            
            detayDiv.innerHTML = htmlContent;
        },

        // Yeni malzeme türü ekleme dialogu
        showAddMaterialTypeDialog: function() {
            const content = `
                <div class="material-add-tabs">
                    <div class="tab-buttons">
                        <button class="tab-btn active" onclick="MaterialCalculator.switchMaterialTab('hacim')">
                            Hacim Tabanlı Malzeme
                        </button>
                        <button class="tab-btn" onclick="MaterialCalculator.switchMaterialTab('birim')">
                            Birim Ağırlık Tabanlı Malzeme
                        </button>
                    </div>
                    
                    <div id="hacim-tab" class="tab-content">
                        <h4>Hacim Hesaplamalı Malzeme Ekle</h4>
                        <div class="form-group">
                            <label>Malzeme Adı *</label>
                            <input type="text" id="hacimMalzemeAdi" placeholder="Örn: Özel Profil">
                        </div>
                        
                        <div id="olcuAlanlariContainer">
                            <h5>Hesaplama Türü Seçin</h5>
                            <div class="form-group">
                                <label>Hesaplama Şekli</label>
                                <select id="hesaplamaTuru" onchange="MaterialCalculator.hesaplamaTuruDegisti()">
                                    <option value="">Seçiniz...</option>
                                    <option value="dikdortgen">Dikdörtgen Prizma (En x Boy x Yükseklik)</option>
                                    <option value="silindir">Silindir (Çap x Yükseklik)</option>
                                    <option value="boru">Boru (Dış Çap - İç Çap x Uzunluk)</option>
                                    <option value="lama">Lama (Kalınlık x Genişlik x Uzunluk)</option>
                                    <option value="ozel">Özel Formül</option>
                                </select>
                            </div>
                            <div id="olcuAlanlariDetay"></div>
                        </div>
                        
                        <div style="margin-top: 20px;">
                            <button onclick="MaterialCalculator.saveHacimTabanliMalzeme()" class="btn btn-success">
                                Kaydet
                            </button>
                        </div>
                    </div>
                    
                    <div id="birim-tab" class="tab-content" style="display: none;">
                        <h4>Birim Ağırlık Tabanlı Malzeme Ekle</h4>
                        <div class="form-group">
                            <label>Malzeme Adı *</label>
                            <input type="text" id="birimMalzemeAdi" placeholder="Örn: Hazır Flanş" required>
                        </div>
                        
                        <div class="form-group">
                            <label>Birim Ağırlık (kg) *</label>
                            <input type="number" id="birimAgirlik" step="0.001" min="0" placeholder="0.000" required>
                        </div>
                        
                        <div class="form-group">
                            <label>Ölçüler</label>
                            <input type="text" id="birimOlculer" placeholder="Örn: 100x50x10mm">
                        </div>
                        
                        <div class="form-group">
                            <label>Standart</label>
                            <input type="text" id="birimStandart" placeholder="Örn: EN 10025">
                        </div>
                        
                        <div class="form-group">
                            <label>Malzeme Cinsi</label>
                            <select id="birimMalzemeCinsi">
                                <option value="">Seçiniz...</option>
                                ${Object.keys(MaterialData.YOGUNLUKLAR).map(cinsi => 
                                    `<option value="${cinsi}">${cinsi}</option>`
                                ).join('')}
                            </select>
                        </div>
                        
                        <div style="margin-top: 20px;">
                            <button type="button" onclick="MaterialCalculator.saveBirimTabanliMalzeme()" class="btn btn-success">
                                Kaydet
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            UIManager.openModal(content, 'Yeni Malzeme Türü Ekle');
        },

        // Hesaplama türü değiştiğinde
        hesaplamaTuruDegisti: function() {
            const hesaplamaTuru = document.getElementById('hesaplamaTuru')?.value;
            const detayDiv = document.getElementById('olcuAlanlariDetay');
            
            if (!hesaplamaTuru || !detayDiv) return;
            
            let htmlContent = '';
            
            switch (hesaplamaTuru) {
                case 'dikdortgen':
                    htmlContent = `
                        <h6>Dikdörtgen Prizma Ölçüleri</h6>
                        <div class="form-row">
                            <div class="form-group">
                                <label>En (mm)</label>
                                <input type="number" id="hacim_en" step="0.1" placeholder="0.0">
                            </div>
                            <div class="form-group">
                                <label>Boy (mm)</label>
                                <input type="number" id="hacim_boy" step="0.1" placeholder="0.0">
                            </div>
                            <div class="form-group">
                                <label>Yükseklik (mm)</label>
                                <input type="number" id="hacim_yukseklik" step="0.1" placeholder="0.0">
                            </div>
                        </div>
                    `;
                    break;
                    
                case 'silindir':
                    htmlContent = `
                        <h6>Silindir Ölçüleri</h6>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Çap (mm)</label>
                                <input type="number" id="hacim_cap" step="0.1" placeholder="0.0">
                            </div>
                            <div class="form-group">
                                <label>Yükseklik (mm)</label>
                                <input type="number" id="hacim_yukseklik" step="0.1" placeholder="0.0">
                            </div>
                        </div>
                    `;
                    break;
                    
                case 'boru':
                    htmlContent = `
                        <h6>Boru Ölçüleri</h6>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Dış Çap (mm)</label>
                                <input type="number" id="hacim_dis_cap" step="0.1" placeholder="0.0">
                            </div>
                            <div class="form-group">
                                <label>İç Çap (mm)</label>
                                <input type="number" id="hacim_ic_cap" step="0.1" placeholder="0.0">
                            </div>
                            <div class="form-group">
                                <label>Uzunluk (mm)</label>
                                <input type="number" id="hacim_uzunluk" step="0.1" placeholder="0.0">
                            </div>
                        </div>
                    `;
                    break;
                    
                case 'lama':
                    htmlContent = `
                        <h6>Lama Ölçüleri</h6>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Kalınlık (mm)</label>
                                <input type="number" id="hacim_kalinlik" step="0.1" placeholder="0.0">
                            </div>
                            <div class="form-group">
                                <label>Genişlik (mm)</label>
                                <input type="number" id="hacim_genislik" step="0.1" placeholder="0.0">
                            </div>
                            <div class="form-group">
                                <label>Uzunluk (mm)</label>
                                <input type="number" id="hacim_uzunluk" step="0.1" placeholder="0.0">
                            </div>
                        </div>
                    `;
                    break;
                    
                case 'ozel':
                    htmlContent = `
                        <h6>Özel Formül</h6>
                        <div id="ozelOlcuAlanlariList"></div>
                        <button type="button" onclick="MaterialCalculator.addOzelOlcuAlani()" class="btn btn-add" style="margin: 10px 0;">
                            + Ölçü Alanı Ekle
                        </button>
                        <div class="form-group" style="margin-top: 15px;">
                            <label>Hacim Formülü (mm³) *</label>
                            <input type="text" id="ozelHacimFormulu" placeholder="Örn: kalinlik * en * boy">
                            <small style="color: #718096;">Ölçü alanı ID'lerini kullanarak formül yazın</small>
                        </div>
                    `;
                    break;
            }
            
            detayDiv.innerHTML = htmlContent;
            this.olcuAlanlariSayac = 0;
        },

        // Malzeme ekleme tab değiştirme
        switchMaterialTab: function(tab) {
            document.querySelectorAll('.material-add-tabs .tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            document.getElementById('hacim-tab').style.display = tab === 'hacim' ? 'block' : 'none';
            document.getElementById('birim-tab').style.display = tab === 'birim' ? 'block' : 'none';
        },

        // Özel ölçü alanı ekleme
        olcuAlanlariSayac: 0,
        addOzelOlcuAlani: function() {
            this.olcuAlanlariSayac++;
            const container = document.getElementById('ozelOlcuAlanlariList');
            if (!container) return;
            
            const div = document.createElement('div');
            div.className = 'olcu-alani-item';
            div.style.cssText = 'display: flex; gap: 10px; margin-bottom: 10px; align-items: center;';
            div.innerHTML = `
                <input type="text" id="olcuId${this.olcuAlanlariSayac}" placeholder="ID (örn: kalinlik)" style="flex: 1;">
                <input type="text" id="olcuLabel${this.olcuAlanlariSayac}" placeholder="Etiket (örn: Kalınlık)" style="flex: 1;">
                <input type="text" id="olcuBirim${this.olcuAlanlariSayac}" placeholder="Birim (mm)" style="flex: 0.5;">
                <button type="button" onclick="this.parentElement.remove()" style="padding: 5px 10px; background: #f56565; color: white; border: none; border-radius: 4px; cursor: pointer;">Sil</button>
            `;
            container.appendChild(div);
        },

        // Hacim tabanlı malzeme kaydet
        saveHacimTabanliMalzeme: function() {
            const malzemeAdi = document.getElementById('hacimMalzemeAdi')?.value?.trim();
            const hesaplamaTuru = document.getElementById('hesaplamaTuru')?.value;
            
            if (!malzemeAdi) {
                UIManager.showNotification('Lütfen malzeme adı girin', 'warning');
                return;
            }
            
            if (!hesaplamaTuru) {
                UIManager.showNotification('Lütfen hesaplama türü seçin', 'warning');
                return;
            }
            
            let olcuAlanlari = [];
            let hesaplamaFormulu = '';
            
            switch (hesaplamaTuru) {
                case 'dikdortgen':
                    olcuAlanlari = [
                        { id: 'hacim_en', label: 'En', birim: 'mm' },
                        { id: 'hacim_boy', label: 'Boy', birim: 'mm' },
                        { id: 'hacim_yukseklik', label: 'Yükseklik', birim: 'mm' }
                    ];
                    hesaplamaFormulu = 'hacim_en * hacim_boy * hacim_yukseklik';
                    break;
                    
                case 'silindir':
                    olcuAlanlari = [
                        { id: 'hacim_cap', label: 'Çap', birim: 'mm' },
                        { id: 'hacim_yukseklik', label: 'Yükseklik', birim: 'mm' }
                    ];
                    hesaplamaFormulu = 'Math.PI * Math.pow(hacim_cap/2, 2) * hacim_yukseklik';
                    break;
                    
                case 'boru':
                    olcuAlanlari = [
                        { id: 'hacim_dis_cap', label: 'Dış Çap', birim: 'mm' },
                        { id: 'hacim_ic_cap', label: 'İç Çap', birim: 'mm' },
                        { id: 'hacim_uzunluk', label: 'Uzunluk', birim: 'mm' }
                    ];
                    hesaplamaFormulu = '(Math.PI * Math.pow(hacim_dis_cap/2, 2) - Math.PI * Math.pow(hacim_ic_cap/2, 2)) * hacim_uzunluk';
                    break;
                    
                case 'lama':
                    olcuAlanlari = [
                        { id: 'hacim_kalinlik', label: 'Kalınlık', birim: 'mm' },
                        { id: 'hacim_genislik', label: 'Genişlik', birim: 'mm' },
                        { id: 'hacim_uzunluk', label: 'Uzunluk', birim: 'mm' }
                    ];
                    hesaplamaFormulu = 'hacim_kalinlik * hacim_genislik * hacim_uzunluk';
                    break;
                    
                case 'ozel':
                    // Özel ölçü alanlarını topla
                    document.querySelectorAll('.olcu-alani-item').forEach((item) => {
                        const id = item.querySelector(`[id^="olcuId"]`)?.value?.trim();
                        const label = item.querySelector(`[id^="olcuLabel"]`)?.value?.trim();
                        const birim = item.querySelector(`[id^="olcuBirim"]`)?.value?.trim();
                        
                        if (id && label) {
                            olcuAlanlari.push({ id, label, birim: birim || 'mm' });
                        }
                    });
                    
                    hesaplamaFormulu = document.getElementById('ozelHacimFormulu')?.value?.trim() || '';
                    
                    if (olcuAlanlari.length === 0) {
                        UIManager.showNotification('En az bir ölçü alanı ekleyin', 'warning');
                        return;
                    }
                    
                    if (!hesaplamaFormulu) {
                        UIManager.showNotification('Lütfen hacim formülü girin', 'warning');
                        return;
                    }
                    break;
            }
            
            const kod = MaterialData.ozelMalzemeTuruEkleHacimTabanli(malzemeAdi, olcuAlanlari, hesaplamaFormulu);
            
            UIManager.showNotification('Malzeme türü başarıyla eklendi', 'success');
            UIManager.closeModal();
            
            // Malzeme türü seçimini güncelle
            document.getElementById('malzemeTuru').value = 'eklenenMalzeme';
            this.malzemeTuruDegisti();
        },

        // Birim ağırlık tabanlı malzeme kaydet
        saveBirimTabanliMalzeme: function() {
            console.log('saveBirimTabanliMalzeme fonksiyonu çalışıyor');
            
            // Modal içindeki elementleri bul
            const modal = document.getElementById('settingsModal');
            if (!modal) {
                UIManager.showNotification('Modal bulunamadı', 'error');
                return;
            }
            
            // Element varlığını kontrol et
            const malzemeAdiElement = modal.querySelector('#birimMalzemeAdi');
            const birimAgirlikElement = modal.querySelector('#birimAgirlik');
            const olculerElement = modal.querySelector('#birimOlculer');
            const standartElement = modal.querySelector('#birimStandart');
            const malzemeCinsiElement = modal.querySelector('#birimMalzemeCinsi');
            
            console.log('Bulunan elementler:', {
                malzemeAdi: !!malzemeAdiElement,
                birimAgirlik: !!birimAgirlikElement,
                olculer: !!olculerElement,
                standart: !!standartElement,
                malzemeCinsi: !!malzemeCinsiElement
            });
            
            if (!malzemeAdiElement) {
                UIManager.showNotification('Malzeme adı alanı bulunamadı', 'error');
                return;
            }
            
            if (!birimAgirlikElement) {
                UIManager.showNotification('Birim ağırlık alanı bulunamadı', 'error');
                return;
            }
            
            const malzemeAdi = malzemeAdiElement.value?.trim();
            const birimAgirlik = birimAgirlikElement.value?.trim();
            const olculer = olculerElement ? olculerElement.value?.trim() : '';
            const standart = standartElement ? standartElement.value?.trim() : '';
            const malzemeCinsi = malzemeCinsiElement ? malzemeCinsiElement.value?.trim() : '';
            
            console.log('Form değerleri:', {
                malzemeAdi,
                birimAgirlik,
                olculer,
                standart,
                malzemeCinsi
            });
            
            if (!malzemeAdi) {
                UIManager.showNotification('Lütfen malzeme adı girin', 'warning');
                malzemeAdiElement.focus();
                return;
            }
            
            if (!birimAgirlik) {
                UIManager.showNotification('Lütfen birim ağırlık girin', 'warning');
                birimAgirlikElement.focus();
                return;
            }
            
            const agirlikNumeric = parseFloat(birimAgirlik);
            if (isNaN(agirlikNumeric) || agirlikNumeric <= 0) {
                UIManager.showNotification('Lütfen geçerli bir birim ağırlık girin (0\'dan büyük sayı)', 'warning');
                birimAgirlikElement.focus();
                birimAgirlikElement.select();
                return;
            }
            
            try {
                const kod = MaterialData.ozelMalzemeTuruEkleBirimAgirlikTabanli(
                    malzemeAdi, 
                    agirlikNumeric, 
                    olculer || '-', 
                    standart || '-', 
                    malzemeCinsi || '-'
                );
                
                console.log('Malzeme kaydedildi, kod:', kod);
                
                UIManager.showNotification('Malzeme türü başarıyla eklendi', 'success');
                UIManager.closeModal();
                
                // Malzeme türü seçimini güncelle
                document.getElementById('malzemeTuru').value = 'eklenenMalzeme';
                this.malzemeTuruDegisti();
                
            } catch (error) {
                console.error('Malzeme kaydetme hatası:', error);
                UIManager.showNotification('Malzeme kaydedilemedi: ' + error.message, 'error');
            }
        },

        // Malzeme cinsi select'ini güncelle
        updateMaterialGradeSelect: function() {
            const select = document.getElementById('malzemeCinsi');
            if (!select) return;
            
            // Mevcut seçenekleri temizleme (sadece özel eklenenler)
            const existingOptions = select.querySelectorAll('option[data-custom="true"]');
            existingOptions.forEach(option => option.remove());
            
            // Özel malzeme cinslerini ekle
            const customMaterials = MaterialData.getCustomMaterials();
            customMaterials.forEach(material => {
                const option = document.createElement('option');
                option.value = material.kod;
                option.textContent = material.kod;
                option.setAttribute('data-custom', 'true');
                select.appendChild(option);
            });
        },

        // Özel malzemeleri yönet - YENİ FONKSİYON
        showManageCustomMaterials: function() {
            const ozelMalzemeler = MaterialData.getAllOzelMalzemeler();
            const customMaterials = MaterialData.getCustomMaterials();
            
            // Hacim tabanlı malzemeler
            let hacimTabanliHtml = '';
            const hacimTabanliCount = Object.keys(ozelMalzemeler.hacimTabanli).length;
            
            if (hacimTabanliCount > 0) {
                hacimTabanliHtml = '<ul class="custom-materials-list">';
                Object.values(ozelMalzemeler.hacimTabanli).forEach(malzeme => {
                    hacimTabanliHtml += `
                        <li class="material-item">
                            <div class="material-info">
                                <strong>${malzeme.ad}</strong>
                                <small>Kod: ${malzeme.kod}</small>
                                <small>Tip: Hacim Tabanlı</small>
                            </div>
                            <button onclick="MaterialCalculator.deleteOzelMalzeme('${malzeme.kod}')" 
                                    class="btn-delete-small">Sil</button>
                        </li>
                    `;
                });
                hacimTabanliHtml += '</ul>';
            } else {
                hacimTabanliHtml = '<p class="no-items">Henüz hacim tabanlı malzeme eklenmemiş.</p>';
            }
            
            // Birim ağırlık tabanlı malzemeler
            let birimTabanliHtml = '';
            const birimTabanliCount = Object.keys(ozelMalzemeler.birimAgirlikTabanli).length;
            
            if (birimTabanliCount > 0) {
                birimTabanliHtml = '<ul class="custom-materials-list">';
                Object.values(ozelMalzemeler.birimAgirlikTabanli).forEach(malzeme => {
                    birimTabanliHtml += `
                        <li class="material-item">
                            <div class="material-info">
                                <strong>${malzeme.ad}</strong>
                                <small>Kod: ${malzeme.kod}</small>
                                <small>Ağırlık: ${malzeme.birimAgirlik} kg</small>
                                <small>Ölçüler: ${malzeme.olculer}</small>
                            </div>
                            <button onclick="MaterialCalculator.deleteOzelMalzeme('${malzeme.kod}')" 
                                    class="btn-delete-small">Sil</button>
                        </li>
                    `;
                });
                birimTabanliHtml += '</ul>';
            } else {
                birimTabanliHtml = '<p class="no-items">Henüz birim ağırlık tabanlı malzeme eklenmemiş.</p>';
            }
            
            // Özel malzeme cinsleri
            let malzemeCinsleriHtml = '';
            if (customMaterials.length > 0) {
                malzemeCinsleriHtml = '<ul class="custom-materials-list">';
                customMaterials.forEach(material => {
                    malzemeCinsleriHtml += `
                        <li class="material-item">
                            <div class="material-info">
                                <strong>${material.kod}</strong>
                                <small>Norm: ${material.enNormu}</small>
                                <small>Yoğunluk: ${material.yogunluk} kg/m³</small>
                            </div>
                            <button onclick="MaterialCalculator.deleteCustomMaterial('${material.kod}')" 
                                    class="btn-delete-small">Sil</button>
                        </li>
                    `;
                });
                malzemeCinsleriHtml += '</ul>';
            } else {
                malzemeCinsleriHtml = '<p class="no-items">Henüz özel malzeme cinsi eklenmemiş.</p>';
            }
            
            const content = `
                <div class="manage-materials-container">
                    <div class="materials-section">
                        <h4>📦 Hacim Tabanlı Malzemeler (${hacimTabanliCount})</h4>
                        ${hacimTabanliHtml}
                    </div>
                    
                    <div class="materials-section">
                        <h4>⚖️ Birim Ağırlık Tabanlı Malzemeler (${birimTabanliCount})</h4>
                        ${birimTabanliHtml}
                    </div>
                    
                    <div class="materials-section">
                        <h4>🔬 Özel Malzeme Cinsleri (${customMaterials.length})</h4>
                        ${malzemeCinsleriHtml}
                    </div>
                    
                    <div class="manage-actions">
                        <button onclick="MaterialCalculator.showAddMaterialTypeDialog(); UIManager.closeModal();" 
                                class="btn btn-success">
                            + Yeni Malzeme Türü Ekle
                        </button>
                        <button onclick="UIManager.showAddMaterialGradeForm(); UIManager.closeModal();" 
                                class="btn btn-info">
                            + Yeni Malzeme Cinsi Ekle
                        </button>
                    </div>
                    
                    <div class="danger-zone">
                        <h5>🚨 Tehlikeli İşlemler</h5>
                        <button onclick="MaterialCalculator.clearAllCustomMaterials()" 
                                class="btn btn-danger">
                            Tüm Özel Malzemeleri Sil
                        </button>
                    </div>
                </div>
            `;
            
            UIManager.openModal(content, 'Eklenen Malzemeleri Yönet');
        },

        // Özel malzeme sil
        deleteOzelMalzeme: function(kod) {
            if (confirm('Bu malzeme türünü silmek istediğinizden emin misiniz?')) {
                MaterialData.deleteOzelMalzemeTuru(kod);
                UIManager.showNotification('Malzeme türü silindi', 'success');
                // Modal'ı yenile
                this.showManageCustomMaterials();
                
                // Eğer şu anda "eklenenMalzeme" seçiliyse, alanları güncelle
                const malzemeTuru = document.getElementById('malzemeTuru').value;
                if (malzemeTuru === 'eklenenMalzeme') {
                    this.malzemeTuruDegisti();
                }
            }
        },

        // Özel malzeme cinsi sil
        deleteCustomMaterial: function(kod) {
            if (confirm('Bu malzeme cinsini silmek istediğinizden emin misiniz?')) {
                // LocalStorage'dan kaldır
                const customMaterials = MaterialData.getCustomMaterials();
                const filteredMaterials = customMaterials.filter(material => material.kod !== kod);
                localStorage.setItem('customMaterials', JSON.stringify(filteredMaterials));
                
                // MaterialData'dan kaldır
                delete MaterialData.EN_NORMLARI[kod];
                delete MaterialData.YOGUNLUKLAR[kod];
                
                // Select'ten kaldır
                const select = document.getElementById('malzemeCinsi');
                if (select) {
                    const option = select.querySelector(`option[value="${kod}"]`);
                    if (option) option.remove();
                }
                
                UIManager.showNotification('Malzeme cinsi silindi', 'success');
                // Modal'ı yenile
                this.showManageCustomMaterials();
            }
        },

        // Tüm özel malzemeleri sil
        clearAllCustomMaterials: function() {
            if (confirm('TÜM özel malzemeleri silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!')) {
                // Özel malzeme türlerini temizle
                MaterialData.ozelMalzemeTurleri = {
                    hacimTabanli: {},
                    birimAgirlikTabanli: {}
                };
                MaterialData.saveOzelMalzemeler();
                
                // Özel malzeme cinslerini temizle
                const customMaterials = MaterialData.getCustomMaterials();
                customMaterials.forEach(material => {
                    delete MaterialData.EN_NORMLARI[material.kod];
                    delete MaterialData.YOGUNLUKLAR[material.kod];
                });
                localStorage.removeItem('customMaterials');
                
                // Select'i güncelle
                this.updateMaterialGradeSelect();
                
                UIManager.showNotification('Tüm özel malzemeler silindi', 'success');
                UIManager.closeModal();
                
                // Formu temizle
                Calculator.clearForm();
            }
        },
    };
    
    // TableManager'a pNo sayacını ayarla
    TableManager.pNoCounter = MaterialCalculator.pNoSayaci;

    // Yeni modül butonları için event listener'lar
    setupNewModuleEvents();
    
    // Excel butonları için event listener'ları ekle
    setupExcelEvents();
    
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
    console.log('✓ MaterialData:', typeof MaterialData);
    console.log('✓ Calculator:', typeof Calculator);
    console.log('✓ TableManager:', typeof TableManager);
    console.log('✓ ExcelManager:', typeof ExcelManager);
    console.log('✓ UIManager:', typeof UIManager);
    console.log('✓ MaterialCalculator:', typeof MaterialCalculator);
    
    // Yeni modüller
    console.log('TabManager:', typeof TabManager !== 'undefined' ? '✓' : '✗');
    console.log('ColumnManager:', typeof ColumnManager !== 'undefined' ? '✓' : '✗');
    console.log('FilterManager:', typeof FilterManager !== 'undefined' ? '✓' : '✗');
    console.log('LanguageManager:', typeof LanguageManager !== 'undefined' ? '✓' : '✗');
    console.log('DragDropManager:', typeof DragDropManager !== 'undefined' ? '✓' : '✗');
    console.log('MaterialLibrary:', typeof MaterialLibrary !== 'undefined' ? '✓' : '✗');
    
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
            version: '1.0.1',
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

    // Özel malzemeleri malzeme cinsi seçimine ekle
    MaterialCalculator.updateMaterialGradeSelect();
    
    console.log('Özel malzemeler yüklendi:', {
        hacimTabanli: Object.keys(MaterialData.getAllOzelMalzemeler().hacimTabanli).length,
        birimAgirlikTabanli: Object.keys(MaterialData.getAllOzelMalzemeler().birimAgirlikTabanli).length,
        malzemeCinsleri: MaterialData.getCustomMaterials().length
    });
});

// Yeni modül event'larını ayarla
function setupNewModuleEvents() {
    // Dil seçici butonu
    const languageBtn = document.getElementById('languageBtn');
    if (languageBtn && typeof LanguageManager !== 'undefined') {
        languageBtn.addEventListener('click', () => {
            LanguageManager.showLanguageDialog();
        });
    }
    
    // Sütun yöneticisi butonu
    const columnManagerBtn = document.getElementById('columnManagerBtn');
    if (columnManagerBtn && typeof ColumnManager !== 'undefined') {
        columnManagerBtn.addEventListener('click', () => {
            ColumnManager.showColumnManagerDialog();
        });
    }
    
    // Filtre yöneticisi butonu
    const filterManagerBtn = document.getElementById('filterManagerBtn');
    if (filterManagerBtn && typeof FilterManager !== 'undefined') {
        filterManagerBtn.addEventListener('click', () => {
            FilterManager.showAdvancedFilterDialog();
        });
    }
    
    // Malzeme kütüphanesi butonu
    const materialLibraryBtn = document.getElementById('materialLibraryBtn');
    if (materialLibraryBtn && typeof MaterialLibrary !== 'undefined') {
        materialLibraryBtn.addEventListener('click', () => {
            MaterialLibrary.showLibraryDialog();
        });
    }
    
    // Sekme ekleme butonu
    const addTabBtn = document.getElementById('addTabBtn');
    if (addTabBtn && typeof TabManager !== 'undefined') {
        addTabBtn.addEventListener('click', () => {
            TabManager.showCreateTabDialog();
        });
    }
}

// Excel event'larını ayarla
function setupExcelEvents() {
    const btnExcelKaydet = document.getElementById('btnExcelKaydet');
    const btnExcelAc = document.getElementById('btnExcelAc');
    
    if (btnExcelKaydet) {
        btnExcelKaydet.addEventListener('click', () => {
            ExcelManager.exportToExcel();
        });
    }
    
    if (btnExcelAc) {
        btnExcelAc.addEventListener('click', () => {
            ExcelManager.importFromExcel();
        });
    }
}

// Otomatik kayıt sistemini ayarla
function setupAutoSave() {
    window.autoSaveData = async function() {
        const tableData = TableManager.getTableData();
        const data = {
            projectInfo: TableManager.getProjectInfo(),
            tableData: tableData,
            customMaterials: MaterialData.getCustomMaterials(),
            customProfiles: MaterialData.getCustomProfiles(),
            version: '2.0.0',
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
}


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

ipcRenderer.on('add-custom-material-type', () => {
    if (typeof MaterialCalculator !== 'undefined') {
        MaterialCalculator.showAddMaterialTypeDialog();
    }
});

ipcRenderer.on('manage-custom-materials', () => {
    if (typeof MaterialCalculator !== 'undefined') {
        MaterialCalculator.showManageCustomMaterials();
    }
});

ipcRenderer.on('show-column-manager', () => {
    if (typeof ColumnManager !== 'undefined') {
        ColumnManager.showColumnManagerDialog();
    }
});

ipcRenderer.on('show-filter-manager', () => {
    if (typeof FilterManager !== 'undefined') {
        FilterManager.showAdvancedFilterDialog();
    }
});

ipcRenderer.on('show-material-library', () => {
    if (typeof MaterialLibrary !== 'undefined') {
        MaterialLibrary.showLibraryDialog();
    }
});

ipcRenderer.on('show-language-settings', () => {
    if (typeof LanguageManager !== 'undefined') {
        LanguageManager.showLanguageDialog();
    }
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
        version: '1.0.1',
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
            version: '2.0.0',
            date: new Date().toISOString()
        };
        
        await ipcRenderer.invoke('save-data', data);
    }
});

console.log('Renderer process başarıyla yüklendi.');