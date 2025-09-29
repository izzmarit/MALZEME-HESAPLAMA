// Kullanıcı Arayüzü Yönetimi Modülü
(function(window) {
    'use strict';
    
    const UIManager = {
    // Başlangıç
    initialize: function() {
        this.setupEventListeners();
        this.overrideNotifications();
        MaterialData.initialize();
    },

    // Event listener'ları ayarla
    setupEventListeners: function() {
        // Malzeme türü değişimi
        document.getElementById('malzemeTuru').addEventListener('change', () => {
            this.onMaterialTypeChange();
        });

        // Butonlar
        document.getElementById('btnHesapla').addEventListener('click', () => {
            Calculator.calculate();
        });

        document.getElementById('btnEkle').addEventListener('click', () => {
            TableManager.addRow();
        });

        document.getElementById('btnTemizle').addEventListener('click', () => {
            Calculator.clearForm();
        });

        document.getElementById('btnExcelKaydet').addEventListener('click', () => {
            ExcelManager.exportToExcel();
        });

        document.getElementById('btnExcelAc').addEventListener('click', () => {
            ExcelManager.importFromExcel();
        });

        document.getElementById('btnTabloTemizle').addEventListener('click', () => {
            TableManager.clearTable();
        });

        // Modal kapatma
        document.querySelector('.close-modal').addEventListener('click', () => {
            this.closeModal();
        });

        // Input reactivation için global event listener
        document.addEventListener('click', (e) => {
            if (e.target.matches('input, select, textarea')) {
                // Element'in klavye girdisini garanti et
                if (!e.target.readOnly && !e.target.disabled) {
                    e.target.tabIndex = e.target.tabIndex || 0;
                    e.target.style.pointerEvents = 'auto';
                    e.target.style.userSelect = 'auto';
                    e.target.focus();
                }
            }
        });

        // Enter tuşu ile hesaplama
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
                const activeElement = document.activeElement;
                if (activeElement && activeElement.id !== 'adet' && activeElement.id !== 'heatNo') {
                    Calculator.calculate();
                }
            }
        });
    },

    // Malzeme türü değişimi
    onMaterialTypeChange: function() {
        const tur = document.getElementById('malzemeTuru').value;
        const olcuAlanlari = document.getElementById('olcuAlanlari');
        const suHacmiCard = document.getElementById('suHacmiCard');
        
        // Önceki alanları temizle
        olcuAlanlari.innerHTML = '';
        
        // Su hacmi kartını sadece boru seçildiğinde göster
        if (tur === 'boru') {
            suHacmiCard.style.display = 'flex';
        } else {
            suHacmiCard.style.display = 'none';
            document.getElementById('suHacmi').textContent = '0.00';
        }
        
        // Ölçü alanlarını oluştur
        const fields = this.getDimensionFields(tur);
        if (fields) {
            olcuAlanlari.innerHTML = fields;
            
            // Yeni eklenen input'lara focus
           setTimeout(() => {
                const firstInput = olcuAlanlari.querySelector('input, select');
                if (firstInput) {
                    firstInput.focus();
                }
            }, 100);
        }
    },

    // Ölçü alanlarını getir
    getDimensionFields: function(tur) {
        const templates = {
            sac: `
                <div class="form-row">
                    <div class="form-group">
                        <label for="kalinlik">
                            <span class="label-icon">📏</span> Kalınlık (mm)
                        </label>
                        <input type="number" id="kalinlik" step="0.1" min="0" placeholder="0.0">
                    </div>
                    <div class="form-group">
                        <label for="en">
                            <span class="label-icon">↔️</span> En (mm)
                        </label>
                        <input type="number" id="en" step="1" min="0" placeholder="0">
                    </div>
                    <div class="form-group">
                        <label for="boy">
                            <span class="label-icon">↕️</span> Boy (mm)
                        </label>
                        <input type="number" id="boy" step="1" min="0" placeholder="0">
                    </div>
                </div>
            `,
            lama: `
                <div class="form-row">
                    <div class="form-group">
                        <label for="kalinlik">
                            <span class="label-icon">📏</span> Kalınlık (mm)
                        </label>
                        <input type="number" id="kalinlik" step="0.1" min="0" placeholder="0.0">
                    </div>
                    <div class="form-group">
                        <label for="genislik">
                            <span class="label-icon">↔️</span> Genişlik (mm)
                        </label>
                        <input type="number" id="genislik" step="1" min="0" placeholder="0">
                    </div>
                    <div class="form-group">
                        <label for="uzunluk">
                            <span class="label-icon">↕️</span> Uzunluk (mm)
                        </label>
                        <input type="number" id="uzunluk" step="1" min="0" placeholder="0">
                    </div>
                </div>
            `,
            boru: `
                <div class="form-row">
                    <div class="form-group">
                        <label for="disCap">
                            <span class="label-icon">⭕</span> Dış Çap (mm)
                        </label>
                        <input type="number" id="disCap" step="0.1" min="0" placeholder="0.0">
                    </div>
                    <div class="form-group">
                        <label for="etKalinlik">
                            <span class="label-icon">📏</span> Et Kalınlığı (mm)
                        </label>
                        <input type="number" id="etKalinlik" step="0.1" min="0" placeholder="0.0">
                    </div>
                    <div class="form-group">
                        <label for="uzunluk">
                            <span class="label-icon">↕️</span> Uzunluk (mm)
                        </label>
                        <input type="number" id="uzunluk" step="1" min="0" placeholder="0">
                    </div>
                </div>
            `,
            kosebent: `
                <div class="form-row">
                    <div class="form-group">
                        <label for="kenar1">
                            <span class="label-icon">📐</span> 1. Kenar (mm)
                        </label>
                        <input type="number" id="kenar1" step="1" min="0" placeholder="0">
                    </div>
                    <div class="form-group">
                        <label for="kenar2">
                            <span class="label-icon">📐</span> 2. Kenar (mm)
                        </label>
                        <input type="number" id="kenar2" step="1" min="0" placeholder="0">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="etKalinlik">
                            <span class="label-icon">📏</span> Et Kalınlığı (mm)
                        </label>
                        <input type="number" id="etKalinlik" step="0.1" min="0" placeholder="0.0">
                    </div>
                    <div class="form-group">
                        <label for="uzunluk">
                            <span class="label-icon">↕️</span> Uzunluk (mm)
                        </label>
                        <input type="number" id="uzunluk" step="1" min="0" placeholder="0">
                    </div>
                </div>
            `,
            ozelFlans: `
                <div class="form-row">
                    <div class="form-group">
                        <label for="ozelFlansDis">
                            <span class="label-icon">⭕</span> Dış Çap (mm)
                        </label>
                        <input type="number" id="ozelFlansDis" step="0.1" min="0" placeholder="0.0">
                    </div>
                    <div class="form-group">
                        <label for="ozelFlansIc">
                            <span class="label-icon">⭕</span> İç Çap (mm)
                        </label>
                        <input type="number" id="ozelFlansIc" step="0.1" min="0" placeholder="0.0">
                    </div>
                    <div class="form-group">
                        <label for="ozelFlansKalinlik">
                            <span class="label-icon">📏</span> Kalınlık (mm)
                        </label>
                        <input type="number" id="ozelFlansKalinlik" step="0.1" min="0" placeholder="0.0">
                    </div>
                </div>
            `,
            mil: `
                <div class="form-row">
                    <div class="form-group">
                        <label for="milCap">
                            <span class="label-icon">⭕</span> Çap (mm)
                        </label>
                        <input type="number" id="milCap" step="0.1" min="0" placeholder="0.0">
                    </div>
                    <div class="form-group">
                        <label for="milBoy">
                            <span class="label-icon">↕️</span> Boy (mm)
                        </label>
                        <input type="number" id="milBoy" step="1" min="0" placeholder="0">
                    </div>
                </div>
            `,
            kutu: `
                <div class="form-row">
                    <div class="form-group">
                        <label for="genislik">
                            <span class="label-icon">↔️</span> Genişlik (mm)
                        </label>
                        <input type="number" id="genislik" step="1" min="0" placeholder="0">
                    </div>
                    <div class="form-group">
                        <label for="yukseklik">
                            <span class="label-icon">↕️</span> Yükseklik (mm)
                        </label>
                        <input type="number" id="yukseklik" step="1" min="0" placeholder="0">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="etKalinlik">
                            <span class="label-icon">📏</span> Et Kalınlığı (mm)
                        </label>
                        <input type="number" id="etKalinlik" step="0.1" min="0" placeholder="0.0">
                    </div>
                    <div class="form-group">
                        <label for="uzunluk">
                            <span class="label-icon">↕️</span> Uzunluk (mm)
                        </label>
                        <input type="number" id="uzunluk" step="1" min="0" placeholder="0">
                    </div>
                </div>
            `
        };

        // Profil türleri için özel template
        if (['ipe', 'hea', 'heb', 'npu', 'npi'].includes(tur)) {  // npi eklendi
            return `
                <div class="form-row">
                    <div class="form-group">
                        <label for="profilBoyutu">
                            <span class="label-icon">📏</span> Profil Boyutu
                        </label>
                        <select id="profilBoyutu">
                            ${this.getProfileOptions(tur)}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="uzunluk">
                         <span class="label-icon">↕️</span> Uzunluk (mm)
                        </label>
                        <input type="number" id="uzunluk" step="1" min="0" placeholder="0">
                    </div>
                </div>
            `;
        }

        return templates[tur] || '';
    },

    // Profil seçeneklerini getir
    getProfileOptions: function(tur) {
        const profiles = MaterialData.profilVerileri[tur];
        if (!profiles) return '';

        return Object.keys(profiles)
            .map(boyut => `<option value="${boyut}">${tur.toUpperCase()} ${boyut}</option>`)
            .join('');
    },

    // Bildirim göster
    showNotification: function(messageKey, type = 'info') {
        // Eğer messageKey bir çeviri anahtarı ise çevir
        const message = LanguageManager.getText(messageKey, messageKey);
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${this.getNotificationIcon(type)}</span>
                <span class="notification-message">${message}</span>
            </div>
        `;
            
        // Stil ekle
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            background: ${this.getNotificationColor(type)};
            color: white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
            animation: slideIn 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        // 3 saniye sonra kaldır
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },

    // Bildirim ikonu
    getNotificationIcon: function(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || icons.info;
    },

    // Bildirim rengi
    getNotificationColor: function(type) {
        const colors = {
            success: '#48bb78',
            error: '#f56565',
            warning: '#ed8936',
            info: '#4299e1'
        };
        return colors[type] || colors.info;
    },

    // Modal aç
    openModal: function(content, title = 'Ayarlar') {
        const modal = document.getElementById('settingsModal');
        const modalBody = document.getElementById('settingsBody');
        const modalHeader = modal.querySelector('.modal-header h2');
        
        modalHeader.textContent = title;
        modalBody.innerHTML = content;
        modal.style.display = 'flex';
    },

    // Modal kapat
    closeModal: function() {
        const modal = document.getElementById('settingsModal');
        modal.style.display = 'none';
    },

    // Yeni malzeme cinsi ekleme formu
    showAddMaterialGradeForm: function() {
        const content = `
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
            <div class="action-buttons">
                <button onclick="UIManager.addNewMaterialGrade()" class="btn btn-add">Ekle</button>
                <button onclick="UIManager.closeModal()" class="btn btn-clear">İptal</button>
            </div>
        `;
        
        this.openModal(content, 'Yeni Malzeme Cinsi Ekle');
    },

    // Yeni malzeme cinsi ekle
    addNewMaterialGrade: function() {
        const kod = document.getElementById('newGradeCode').value;
        const norm = document.getElementById('newGradeNorm').value;
        const yogunluk = parseFloat(document.getElementById('newGradeDensity').value);
        
        if (!kod || !norm || !yogunluk) {
            this.showNotification('Lütfen tüm alanları doldurun', 'warning');
            return;
        }
        
        if (MaterialData.yeniMalzemeCinsiEkle(kod, norm, yogunluk)) {
            // Select'e ekle
            const select = document.getElementById('malzemeCinsi');
            const option = document.createElement('option');
            option.value = kod;
            option.textContent = kod;
            select.appendChild(option);
            
            this.showNotification('Malzeme cinsi başarıyla eklendi', 'success');
            this.closeModal();
        } else {
            this.showNotification('Malzeme cinsi eklenemedi', 'error');
        }
    },

    // Bildirim sistemlerini override et
    overrideNotifications: function() {
        Calculator.showNotification = (msg, type) => this.showNotification(msg, type);
        TableManager.showNotification = (msg, type) => this.showNotification(msg, type);
        ExcelManager.showNotification = (msg, type) => this.showNotification(msg, type);
    }
};

// CSS animasyonları ekle
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Modülü window objesine bağla - ELECTRON İÇİN KRİTİK
window.UIManager = UIManager;

})(window);