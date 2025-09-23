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
            if (!tur) return;
            
            // ÖNEMLİ: Önce özel malzeme türlerini kontrol et
            const typeData = MaterialData.getAllMaterialTypes()[tur];
            if (typeData && typeData.custom) {
                
                // BİRİM AĞIRLIK TİPİ KONTROLÜ
                if (typeData.hesaplamaTipi === 'birimAgirlik') {
                    // Malzeme cinsi alanını gizle
                    const malzemeCinsiDiv = document.getElementById('malzemeCinsi')?.parentElement?.parentElement;
                    if (malzemeCinsiDiv) {
                        malzemeCinsiDiv.style.display = 'none';
                    }
                    
                    htmlContent = `
                        <div class="form-row">
                            <div class="form-group full-width">
                                <label for="customBirimAgirlik">
                                    <span class="label-icon">⚖️</span> Birim Ağırlık (kg)
                                </label>
                                <input type="number" id="customBirimAgirlik" step="0.01" min="0" placeholder="0.00">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group full-width">
                                <label for="customOlculer">
                                    <span class="label-icon">📏</span> Ölçüler
                                </label>
                                <input type="text" id="customOlculer" placeholder="İsteğe bağlı ölçü bilgisi">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group full-width">
                                <label for="customMalzemeCinsi">
                                    <span class="label-icon">🔬</span> Malzeme Cinsi (Serbest Giriş)
                                </label>
                                <input type="text" id="customMalzemeCinsi" placeholder="İsteğe bağlı malzeme cinsi">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group full-width">
                                <label for="customStandart">
                                    <span class="label-icon">📋</span> Standart / Norm
                                </label>
                                <input type="text" id="customStandart" placeholder="İsteğe bağlı standart bilgisi">
                            </div>
                        </div>
                    `;
                    
                    olcuAlanlari.innerHTML = htmlContent;
                    
                    // İlk input'a focus ver
                    setTimeout(() => {
                        const firstInput = document.getElementById('customBirimAgirlik');
                        if (firstInput) firstInput.focus();
                    }, 100);
                    
                    return; // Fonksiyondan çık
                }
                
                // NORMAL DİNAMİK ALAN OLUŞTURMA (Birim ağırlık değilse)
                else if (typeData.olcuAlanlari && typeData.olcuAlanlari.length > 0) {
                    let htmlContent = '<div class="form-row">';
                    
                    typeData.olcuAlanlari.forEach((alan, index) => {
                        // Her 3 alandan sonra yeni satır
                        if (index > 0 && index % 3 === 0) {
                            htmlContent += '</div><div class="form-row">';
                        }
                        
                        // Alan bilgilerini al
                        const alanKodu = typeof alan === 'object' ? alan.kod : alan;
                        const alanAdi = typeof alan === 'object' ? alan.ad : 
                            (alanKodu.charAt(0).toUpperCase() + alanKodu.slice(1));
                        const alanTipi = typeof alan === 'object' ? alan.tip : 'sayi';
                        
                        // İkon belirleme
                        let ikon = '📏';
                        if (alanTipi === 'cap') ikon = '⭕';
                        else if (alanKodu.includes('uzunluk') || alanKodu.includes('boy')) ikon = '↕️';
                        else if (alanKodu.includes('en') || alanKodu.includes('genislik')) ikon = '↔️';
                        
                        htmlContent += `
                            <div class="form-group">
                                <label for="${alanKodu}">
                                    <span class="label-icon">${ikon}</span> ${alanAdi} (${typeData.birim || 'mm'})
                                </label>
                                <input type="number" id="${alanKodu}" step="0.1" min="0" placeholder="0.0">
                            </div>
                        `;
                    });
                    
                    htmlContent += '</div>';
                    olcuAlanlari.innerHTML = htmlContent;
                    
                    // İlk input'a focus ver
                    setTimeout(() => {
                        const firstInput = olcuAlanlari.querySelector('input');
                        if (firstInput) firstInput.focus();
                    }, 100);
                    
                    return; // Özel malzeme türü işlendi, fonksiyondan çık
                }
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

// Malzeme türleri yönetimi
ipcRenderer.on('manage-material-types', () => {
    showMaterialTypesManager();
});

// Malzeme cinsleri yönetimi
ipcRenderer.on('manage-material-grades', () => {
    showMaterialGradesManager();
});

// Veri dışa aktarma
ipcRenderer.on('export-material-data', async () => {
    const data = MaterialData.exportMaterialData();
    const result = await ipcRenderer.invoke('save-excel-dialog', {
        dosyaAdi: 'malzeme_verileri'
    });
    
    if (!result.canceled) {
        const fs = require('fs');
        fs.writeFileSync(result.filePath.replace('.xlsx', '.json'), JSON.stringify(data, null, 2));
        UIManager.showNotification('Malzeme verileri başarıyla dışa aktarıldı', 'success');
    }
});

// Veri içe aktarma
ipcRenderer.on('import-material-data', async () => {
    const result = await ipcRenderer.invoke('open-excel-dialog');
    
    if (!result.canceled) {
        const fs = require('fs');
        try {
            const content = fs.readFileSync(result.filePaths[0], 'utf-8');
            const data = JSON.parse(content);
            
            if (MaterialData.importMaterialData(data)) {
                UIManager.showNotification('Malzeme verileri başarıyla içe aktarıldı', 'success');
                setTimeout(() => window.location.reload(), 1000);
            } else {
                UIManager.showNotification('Geçersiz veri formatı', 'error');
            }
        } catch (error) {
            UIManager.showNotification('Dosya okunamadı: ' + error.message, 'error');
        }
    }
});

// Malzeme türleri yöneticisi
function showMaterialTypesManager() {
    const types = MaterialData.getAllMaterialTypes();
    const typesList = Object.entries(types).map(([kod, data]) => {
        const deleteBtn = data.custom ? 
            `<button class="btn-delete-small" onclick="deleteMaterialType('${kod}')">Sil</button>` : 
            '<span class="text-muted">Sistem</span>';
        
        let olcuText = '';
        if (data.olcuAlanlari) {
            if (Array.isArray(data.olcuAlanlari)) {
                olcuText = data.olcuAlanlari.map(alan => 
                    typeof alan === 'object' ? alan.ad : alan
                ).join(', ');
            }
        } else {
            olcuText = data.tip || 'Standart';
        }
        
        const hesaplamaText = data.hesaplamaTipi || 'Varsayılan';
        
        return `
            <tr>
                <td>${kod}</td>
                <td>${data.ad}</td>
                <td>${olcuText}</td>
                <td>${hesaplamaText}</td>
                <td>${deleteBtn}</td>
            </tr>
        `;
    }).join('');

    // Ölçü alan seçeneklerini oluştur
    const olcuAlanOptions = MaterialData.OLCU_ALAN_TIPLERI.map(alan => 
        `<div class="checkbox-item">
            <input type="checkbox" id="olcu_${alan.kod}" value="${alan.kod}">
            <label for="olcu_${alan.kod}">${alan.ad} ${alan.sembol ? '(' + alan.sembol + ')' : ''}</label>
        </div>`
    ).join('');

    // Hesaplama tipi seçeneklerini oluştur
    const hesaplamaTipiOptions = MaterialData.HESAPLAMA_TIPLERI.map(tip => 
        `<option value="${tip.kod}">${tip.ad}</option>`
    ).join('');

    const content = `
        <div class="material-manager">
            <div class="manager-section">
                <h3>➕ Yeni Malzeme Türü Ekle</h3>
                <div class="form-group">
                    <label>Malzeme Kodu</label>
                    <input type="text" id="newTypeCode" placeholder="Örn: plaka">
                </div>
                <div class="form-group">
                    <label>Malzeme Adı</label>
                    <input type="text" id="newTypeName" placeholder="Örn: Plaka">
                </div>
                <div class="form-group">
                    <label>Hesaplama Tipi</label>
                    <select id="newTypeCalculation" onchange="toggleOlcuAlanlar()">
                        ${hesaplamaTipiOptions}
                    </select>
                </div>
                <div class="form-group" id="olcuAlanlarGroup">
                    <label>Ölçü Alanları (Sırayla Seçin)</label>
                    <div class="checkbox-grid">
                        ${olcuAlanOptions}
                    </div>
                    <div class="selected-order" id="selectedOrder">
                        <small>Seçim Sırası: </small>
                        <span id="orderDisplay"></span>
                    </div>
                </div>
                <div class="form-group">
                    <label>Birim</label>
                    <select id="newTypeUnit">
                        <option value="mm">mm</option>
                        <option value="cm">cm</option>
                        <option value="m">m</option>
                        <option value="kg">kg (Birim Ağırlık)</option>
                    </select>
                </div>
                <button onclick="addNewMaterialType()" class="btn btn-add">Ekle</button>
            </div>
            
            <div class="manager-section">
                <h3>📋 Mevcut Malzeme Türleri</h3>
                <table class="manager-table">
                    <thead>
                        <tr>
                            <th>Kod</th>
                            <th>Ad</th>
                            <th>Ölçü Alanları</th>
                            <th>Hesaplama</th>
                            <th>İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${typesList}
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="modal-footer">
            <button onclick="UIManager.closeModal()" class="btn btn-primary">Kapat</button>
        </div>
    `;
    
    UIManager.openModal(content, 'Malzeme Türleri Yönetimi');
    
    // Checkbox'ları sıralı seçim için ayarla
    setupOrderedCheckboxes();
}

// Sıralı checkbox seçimi için yardımcı fonksiyon
window.selectedFieldOrder = [];

window.setupOrderedCheckboxes = function() {
    const checkboxes = document.querySelectorAll('#olcuAlanlarGroup input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                window.selectedFieldOrder.push(this.value);
            } else {
                const index = window.selectedFieldOrder.indexOf(this.value);
                if (index > -1) {
                    window.selectedFieldOrder.splice(index, 1);
                }
            }
            updateOrderDisplay();
        });
    });
};

window.updateOrderDisplay = function() {
    const display = document.getElementById('orderDisplay');
    if (display) {
        const fieldNames = window.selectedFieldOrder.map(kod => {
            const field = MaterialData.OLCU_ALAN_TIPLERI.find(f => f.kod === kod);
            return field ? field.ad : kod;
        });
        display.textContent = fieldNames.join(' → ') || 'Henüz seçim yapılmadı';
    }
};

window.toggleOlcuAlanlar = function() {
    const hesaplamaTipi = document.getElementById('newTypeCalculation').value;
    const olcuAlanlarGroup = document.getElementById('olcuAlanlarGroup');
    
    if (hesaplamaTipi === 'birimAgirlik') {
        olcuAlanlarGroup.style.display = 'none';
    } else {
        olcuAlanlarGroup.style.display = 'block';
    }
};

// Malzeme cinsleri yöneticisi
function showMaterialGradesManager() {
    const grades = MaterialData.getAllMaterialGrades();
    const gradesList = grades.map(grade => {
        const deleteBtn = grade.custom ? 
            `<button class="btn-delete-small" onclick="deleteMaterialGrade('${grade.kod}')">Sil</button>` : 
            '<span class="text-muted">Sistem</span>';
        
        return `
            <tr>
                <td>${grade.kod}</td>
                <td>${grade.norm || '-'}</td>
                <td>${grade.yogunluk}</td>
                <td>${deleteBtn}</td>
            </tr>
        `;
    }).join('');

    const content = `
        <div class="material-manager">
            <div class="manager-section">
                <h3>➕ Yeni Malzeme Cinsi Ekle</h3>
                <div class="form-group">
                    <label>Malzeme Kodu</label>
                    <input type="text" id="newGradeCode" placeholder="Örn: S355JR">
                </div>
                <div class="form-group">
                    <label>EN Normu</label>
                    <input type="text" id="newGradeNorm" placeholder="Örn: EN 10025-2">
                </div>
                <div class="form-group">
                    <label>Yoğunluk (kg/m³)</label>
                    <input type="number" id="newGradeDensity" value="7850" min="0">
                </div>
                <button onclick="addNewMaterialGrade()" class="btn btn-add">Ekle</button>
            </div>
            
            <div class="manager-section">
                <h3>📋 Mevcut Malzeme Cinsleri</h3>
                <table class="manager-table">
                    <thead>
                        <tr>
                            <th>Kod</th>
                            <th>EN Normu</th>
                            <th>Yoğunluk (kg/m³)</th>
                            <th>İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${gradesList}
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="modal-footer">
            <button onclick="UIManager.closeModal()" class="btn btn-primary">Kapat</button>
        </div>
    `;
    
    UIManager.openModal(content, 'Malzeme Cinsleri Yönetimi');
}

// Yeni malzeme türü ekleme
window.addNewMaterialType = function() {
    const kod = document.getElementById('newTypeCode').value;
    const ad = document.getElementById('newTypeName').value;
    const fields = document.getElementById('newTypeFields').value;
    const unit = document.getElementById('newTypeUnit').value;
    
    if (!kod || !ad || !fields) {
        UIManager.showNotification('Lütfen tüm alanları doldurun', 'warning');
        return;
    }
    
    const olcuAlanlari = fields.split(',').map(f => f.trim());
    
    if (MaterialData.addMaterialType(kod, ad, olcuAlanlari, unit)) {
        UIManager.showNotification('Malzeme türü başarıyla eklendi', 'success');
        setTimeout(() => {
            showMaterialTypesManager();
            updateMaterialTypeSelect();
        }, 500);
    } else {
        UIManager.showNotification('Malzeme türü eklenemedi', 'error');
    }
};

// Malzeme türü silme
window.deleteMaterialType = function(kod) {
    if (confirm(`"${kod}" malzeme türünü silmek istediğinizden emin misiniz?`)) {
        if (MaterialData.deleteMaterialType(kod)) {
            UIManager.showNotification('Malzeme türü silindi', 'success');
            showMaterialTypesManager();
            updateMaterialTypeSelect();
        } else {
            UIManager.showNotification('Bu malzeme türü silinemez', 'error');
        }
    }
};

// Yeni malzeme cinsi ekleme
window.addNewMaterialGrade = function() {
    const kod = document.getElementById('newGradeCode').value;
    const norm = document.getElementById('newGradeNorm').value;
    const yogunluk = parseFloat(document.getElementById('newGradeDensity').value);
    
    if (!kod || !norm || !yogunluk) {
        UIManager.showNotification('Lütfen tüm alanları doldurun', 'warning');
        return;
    }
    
    if (MaterialData.yeniMalzemeCinsiEkle(kod, norm, yogunluk)) {
        UIManager.showNotification('Malzeme cinsi başarıyla eklendi', 'success');
        showMaterialGradesManager();
        updateMaterialGradeSelect();
    } else {
        UIManager.showNotification('Bu kod zaten mevcut', 'error');
    }
};

// Malzeme cinsi silme
window.deleteMaterialGrade = function(kod) {
    if (confirm(`"${kod}" malzeme cinsini silmek istediğinizden emin misiniz?`)) {
        if (MaterialData.deleteMaterialGrade(kod)) {
            UIManager.showNotification('Malzeme cinsi silindi', 'success');
            showMaterialGradesManager();
            updateMaterialGradeSelect();
        } else {
            UIManager.showNotification('Bu malzeme cinsi silinemez', 'error');
        }
    }
};

// Select elementlerini güncelleme fonksiyonları
function updateMaterialTypeSelect() {
    const select = document.getElementById('malzemeTuru');
    if (!select) return;
    
    const currentValue = select.value;
    const types = MaterialData.getAllMaterialTypes();
    
    select.innerHTML = '<option value="">Seçiniz...</option>';
    
    Object.entries(types).forEach(([kod, data]) => {
        const option = document.createElement('option');
        option.value = kod;
        option.textContent = data.ad;
        select.appendChild(option);
    });
    
    select.value = currentValue;
}

function updateMaterialGradeSelect() {
    const select = document.getElementById('malzemeCinsi');
    if (!select) return;
    
    const currentValue = select.value;
    const grades = MaterialData.getAllMaterialGrades();
    
    select.innerHTML = '';
    
    grades.forEach(grade => {
        const option = document.createElement('option');
        option.value = grade.kod;
        option.textContent = grade.kod;
        select.appendChild(option);
    });
    
    select.value = currentValue;
}

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
            version: '1.0.1',
            date: new Date().toISOString()
        };
        
        await ipcRenderer.invoke('save-data', data);
    }
});

console.log('Renderer process başarıyla yüklendi.');