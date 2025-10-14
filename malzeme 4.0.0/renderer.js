const { ipcRenderer } = require('electron');

// Global Application Controller
const ApplicationController = {
    isInitialized: false,
    currentLanguage: 'tr',

    async initialize() {
        if (this.isInitialized) return;

        console.log('Uygulama başlatılıyor...');
        
        try {
            // Çekirdek modüllerin yüklenmesini bekle
            await this.waitForCoreModules();
            
            // Modül yükleyiciyi başlat
            await window.ModuleLoader.initialize();
            
            // UI Manager'ı başlat
            window.UIManager.initialize();
            
            // Event listener'ları kur
            this.setupEventListeners();
            
            // Kayıtlı verileri yükle
            await this.loadSavedData();
            
            // Otomatik kayıt sistemini başlat
            this.setupAutoSave();
            
            this.isInitialized = true;
            console.log('Uygulama hazır');
            
            // Başlangıç mesajı
            this.showStartupMessage();
            
        } catch (error) {
            console.error('Başlatma hatası:', error);
            this.showInitError(error);
        }
    },

    async waitForCoreModules() {
        const requiredModules = [
            'BaseMaterial',
            'MaterialRegistry', 
            'ModuleLoader',
            'TableManager',
            'ExcelManager',
            'UIManager'
        ];

        for (let i = 0; i < 50; i++) {
            const allLoaded = requiredModules.every(module => window[module]);
            if (allLoaded) return;
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        throw new Error('Çekirdek modüller yüklenemedi');
    },

    setupEventListeners() {
        // Malzeme türü değişimi
        document.getElementById('malzemeTuru').addEventListener('change', (e) => {
            this.onMaterialTypeChange(e.target.value);
        });

        // Hesapla butonu
        document.getElementById('btnHesapla').addEventListener('click', () => {
            this.calculateMaterial();
        });

        // Temizle
        document.getElementById('btnTemizle').addEventListener('click', () => {
            this.clearForm();
        });

        // Excel işlemleri
        document.getElementById('btnExcelKaydet').addEventListener('click', () => {
            window.ExcelManager.exportToExcel();
        });

        document.getElementById('btnExcelAc').addEventListener('click', () => {
            window.ExcelManager.importFromExcel();
        });

        // Tablo temizle
        document.getElementById('btnTabloTemizle').addEventListener('click', () => {
            window.TableManager.clearTable();
        });

        // Filtre
        document.getElementById('btnFilter').addEventListener('click', () => {
            window.UIManager.showFilterDialog();
        });

        // Dil değişimi
        document.getElementById('languageSelect').addEventListener('change', (e) => {
            this.onLanguageChange(e.target.value);
        });

        // IPC listener'ları
        this.setupIPCListeners();

        // Enter tuşu ile hesaplama
        this.setupKeyboardShortcuts();

        // Focus yönetimi
        this.setupFocusManagement();
    },

    setupIPCListeners() {
        ipcRenderer.on('menu-new', () => {
            window.UIManager.confirmAction('Tüm veriler silinecek. Devam etmek istiyor musunuz?', () => {
                this.clearAllData();
            });
        });

        ipcRenderer.on('menu-open-excel', () => {
            window.ExcelManager.importFromExcel();
        });

        ipcRenderer.on('menu-save-excel', () => {
            window.ExcelManager.exportToExcel();
        });

        ipcRenderer.on('module-add', () => {
            window.ModuleLoader.showAddModuleDialog();
        });

        ipcRenderer.on('module-remove', () => {
            window.ModuleLoader.showRemoveModuleDialog();
        });

        ipcRenderer.on('open-help', () => {
            window.UIManager.showHelp();
        });
    },

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.ctrlKey && !e.altKey) {
                const activeElement = document.activeElement;
                if (activeElement && activeElement.tagName === 'INPUT') {
                    const isProjectField = ['projeAdi', 'siparisNo', 'revizyonNo', 
                                        'resimAciklamasi', 'resimNo', 'hazirlayan', 'kontrol']
                                        .includes(activeElement.id);
                    
                    if (!isProjectField && activeElement.id !== 'heatNo') {
                        e.preventDefault();
                        
                        const malzemeTuru = document.getElementById('malzemeTuru').value;
                        if (!malzemeTuru) {
                            return;
                        }
                        
                        const allInputs = document.querySelectorAll('#olcuAlanlari input[type="number"]');
                        let allFilled = true;
                        allInputs.forEach(input => {
                            if (!input.value || input.value.trim() === '') {
                                allFilled = false;
                            }
                        });
                        
                        if (allFilled) {
                            this.calculateMaterial();
                        }
                    }
                }
            }
            
            if (e.key === 'Escape') {
                this.clearForm();
            }
        });
    },

    setupFocusManagement() {
        // Focus kaybı ve kazanımı yönetimi
        let lastFocusedElement = null;

        document.addEventListener('focusin', (e) => {
            if (e.target.matches('input, select, textarea')) {
                lastFocusedElement = e.target;
                e.target.style.borderColor = 'var(--primary-color)';
            }
        });

        document.addEventListener('focusout', (e) => {
            if (e.target.matches('input, select, textarea')) {
                e.target.style.borderColor = '';
            }
        });

        // Window focus olduğunda son elementi restore et
        window.addEventListener('focus', () => {
            if (lastFocusedElement && document.body.contains(lastFocusedElement)) {
                setTimeout(() => lastFocusedElement.focus(), 100);
            }
        });
    },

    onMaterialTypeChange(materialType) {
        const olcuAlanlari = document.getElementById('olcuAlanlari');
        const malzemeCinsi = document.getElementById('malzemeCinsi');
        const btnHesapla = document.getElementById('btnHesapla');
        const btnEkle = document.getElementById('btnEkle');
        const suHacmiCard = document.getElementById('suHacmiCard');
        
        // Alanları temizle
        olcuAlanlari.innerHTML = '';
        this.clearResults();
        
        if (!materialType) {
            malzemeCinsi.disabled = true;
            malzemeCinsi.innerHTML = '<option value="">Önce malzeme türü seçin</option>';
            btnHesapla.disabled = true;
            btnEkle.disabled = true;
            suHacmiCard.style.display = 'none';
            return;
        }

        // Malzeme modülünü al
        if (window.MaterialRegistry.has(materialType)) {
            const MaterialClass = window.MaterialRegistry.get(materialType);
            const instance = new MaterialClass();
            
            // UI oluştur
            const uiHtml = instance.createUI();
            olcuAlanlari.innerHTML = uiHtml;
            
            // Malzeme cinslerini güncelle
            this.updateMaterialGrades(materialType);
            
            // Su hacmi kontrolü
            if (instance.hasWaterVolume && instance.hasWaterVolume()) {
                suHacmiCard.style.display = 'flex';
            } else {
                suHacmiCard.style.display = 'none';
            }
            
            // Butonları aktif et
            malzemeCinsi.disabled = false;
            btnHesapla.disabled = false;
            btnEkle.disabled = false;
            
            // İlk input'a focus
            setTimeout(() => {
                const firstInput = olcuAlanlari.querySelector('input:not([readonly]), select');
                if (firstInput) firstInput.focus();
            }, 100);
        }
    },

    updateMaterialGrades(materialType) {
        const malzemeCinsiSelect = document.getElementById('malzemeCinsi');
        
        if (!window.MaterialRegistry.has(materialType)) {
            malzemeCinsiSelect.disabled = true;
            return;
        }

        const MaterialClass = window.MaterialRegistry.get(materialType);
        const instance = new MaterialClass();
        const grades = instance.getGrades();
        
        malzemeCinsiSelect.innerHTML = '';
        malzemeCinsiSelect.disabled = false;
        
        grades.forEach(grade => {
            const option = document.createElement('option');
            
            if (typeof grade === 'object' && grade !== null) {
                option.value = grade.value;
                option.textContent = grade.text;
                option.disabled = grade.disabled || false;
                
                if (grade.disabled) {
                    option.style.fontWeight = 'bold';
                    option.style.color = '#667eea';
                }
            } else {
                option.value = grade;
                option.textContent = grade;
            }
            
            malzemeCinsiSelect.appendChild(option);
        });
    },

    calculateMaterial() {
        const materialType = document.getElementById('malzemeTuru').value;
        
        if (!materialType) {
            window.UIManager.showNotification('Lütfen malzeme türü seçin', 'warning');
            return false;
        }

        const formData = this.collectFormData();
        
        if (window.MaterialRegistry.has(materialType)) {
            const MaterialClass = window.MaterialRegistry.get(materialType);
            const instance = new MaterialClass();
            
            // Validasyon
            const validation = instance.validate(formData);
            if (!validation.isValid) {
                window.UIManager.showNotification(validation.message, 'warning');
                return false;
            }
            
            // Hesaplama
            const result = instance.calculate(formData);
            if (result) {
                this.updateResults(result);
                return true;
            }
        }
        
        return false;
    },

    collectFormData() {
        const formData = {
            malzemeTuru: document.getElementById('malzemeTuru').value,
            malzemeCinsi: document.getElementById('malzemeCinsi').value,
            adet: parseFloat(document.getElementById('adet').value) || 1,
            heatNo: document.getElementById('heatNo').value || ''
        };

        const inputs = document.querySelectorAll('#olcuAlanlari input, #olcuAlanlari select');
        inputs.forEach(input => {
            if (input.id) {
                if (input.type === 'number') {
                    const value = input.value.trim();
                    // Boş veya geçersiz değerler için undefined kullan
                    if (value === '' || value === null) {
                        formData[input.id] = undefined;
                    } else {
                        const numValue = parseFloat(value);
                        formData[input.id] = isNaN(numValue) ? undefined : numValue;
                    }
                } else {
                    // Select elementleri için de boş string yerine undefined kullan
                    const value = input.value.trim();
                    formData[input.id] = (value === '' || value === null) ? undefined : value;
                }
            }
        });

        return formData;
    },

    updateResults(result) {
        document.getElementById('birimAgirlik').textContent = result.birimAgirlik.toFixed(2);
        document.getElementById('toplamAgirlik').textContent = result.toplamAgirlik.toFixed(2);
        
        if (result.suHacmi !== undefined && result.suHacmi !== null) {
            document.getElementById('suHacmi').textContent = result.suHacmi.toFixed(2);
        }

        this.animateResults();
    },

    animateResults() {
        const cards = document.querySelectorAll('.result-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    },

    clearResults() {
        document.getElementById('birimAgirlik').textContent = '0.00';
        document.getElementById('toplamAgirlik').textContent = '0.00';
        document.getElementById('suHacmi').textContent = '0.00';
    },

    clearForm() {
        document.getElementById('malzemeTuru').value = '';
        document.getElementById('malzemeCinsi').innerHTML = '<option value="">Önce malzeme türü seçin</option>';
        document.getElementById('malzemeCinsi').disabled = true;
        document.getElementById('olcuAlanlari').innerHTML = '';
        document.getElementById('adet').value = '1';
        document.getElementById('heatNo').value = '';
        this.clearResults();
        
        document.getElementById('btnHesapla').disabled = true;
        document.getElementById('btnEkle').disabled = true;
        document.getElementById('suHacmiCard').style.display = 'none';
        
        const malzemeTuruSelect = document.querySelector('#malzemeTuru');
        if (malzemeTuruSelect) {
            setTimeout(() => malzemeTuruSelect.focus(), 100);
        }
    },

    clearFormPartial() {
        const currentMaterialType = document.getElementById('malzemeTuru').value;
        
        if (!currentMaterialType) {
            this.clearForm();
            return;
        }
        
        document.getElementById('olcuAlanlari').innerHTML = '';
        document.getElementById('adet').value = '1';
        document.getElementById('heatNo').value = '';
        this.clearResults();
        
        setTimeout(() => {
            this.onMaterialTypeChange(currentMaterialType);
            
            const firstInput = document.querySelector('#olcuAlanlari input:not([readonly]), #olcuAlanlari select');
            if (firstInput) {
                firstInput.focus();
            }
        }, 50);
    },

    clearAllData() {
        // Proje bilgileri
        ['projeAdi', 'siparisNo', 'revizyonNo', 'resimAciklamasi', 
         'resimNo', 'hazirlayan', 'kontrol', 'notlar', 'revizyonlar'].forEach(id => {
            const element = document.getElementById(id);
            if (element) element.value = '';
        });
        
        // Tablo
        window.TableManager.clearTable(false);
        
        // Form
        this.clearForm();
        
        window.UIManager.showNotification('Tüm veriler temizlendi', 'success');
    },

    onLanguageChange(language) {
        this.currentLanguage = language;
        localStorage.setItem('selectedLanguage', language);
        
        // Modülleri güncelle
        window.MaterialRegistry.updateLanguage();
        
        // Tabloyu güncelle
        window.TableManager.updateLanguage();
        
        // Mevcut seçimi güncelle
        const currentType = document.getElementById('malzemeTuru').value;
        if (currentType) {
            this.onMaterialTypeChange(currentType);
        }
    },

    setupAutoSave() {
        // Periyodik otomatik kayıt (30 saniyede bir)
        setInterval(async () => {
            try {
                const data = {
                    projectInfo: window.TableManager.getProjectInfo(),
                    notesRevisions: window.TableManager.getNotesRevisions(),
                    tableData: window.TableManager.getTableData(),
                    language: this.currentLanguage,
                    version: '4.0.0',
                    timestamp: new Date().toISOString()
                };
                
                const result = await ipcRenderer.invoke('save-data', data);
                
                if (!result.success) {
                    console.error('Otomatik kayıt başarısız:', result.error);
                }
            } catch (error) {
                console.error('Otomatik kayıt hatası:', error);
            }
        }, 30000);

        // Pencere kapanmadan önce kayıt
        window.addEventListener('beforeunload', (e) => {
            // Senkron kayıt işlemi için flag set et
            this.saveBeforeClose();
            // Modern tarayıcılar için gerekli
            e.returnValue = '';
        });
    },

    saveBeforeClose() {
        const data = {
            projectInfo: window.TableManager.getProjectInfo(),
            notesRevisions: window.TableManager.getNotesRevisions(),
            tableData: window.TableManager.getTableData(),
            language: this.currentLanguage,
            version: '4.0.0'
        };
        
        // Synchronous kayıt için Electron API kullan
        ipcRenderer.sendSync('save-data-sync', data);
    },

    async loadSavedData() {
        try {
            const result = await ipcRenderer.invoke('load-data');
            if (result.success && result.data) {
                if (result.data.projectInfo) {
                    window.TableManager.loadProjectInfo(result.data.projectInfo);
                }
                
                if (result.data.notesRevisions) {
                    window.TableManager.loadNotesRevisions(result.data.notesRevisions);
                }
                
                if (result.data.tableData && result.data.tableData.length > 0) {
                    window.TableManager.loadTableData(result.data.tableData);
                }
                
                if (result.data.language) {
                    document.getElementById('languageSelect').value = result.data.language;
                    this.currentLanguage = result.data.language;
                }
            }
        } catch (error) {
            console.error('Veri yükleme hatası:', error);
        }
    },

    showStartupMessage() {
        const moduleCount = window.MaterialRegistry.getAll().length;
        if (moduleCount === 0) {
            window.UIManager.showNotification('Program hazır. Lütfen modül yükleyin.', 'info');
        } else {
            window.UIManager.showNotification(`Program hazır. ${moduleCount} modül yüklendi.`, 'success');
        }
    },

    showInitError(error) {
        document.body.innerHTML = `
            <div style="padding: 50px; text-align: center; color: #f56565;">
                <h2>Başlatma Hatası</h2>
                <p>${error.message}</p>
                <button onclick="location.reload()" style="margin-top: 20px; 
                    padding: 10px 20px; background: #667eea; color: white; 
                    border: none; border-radius: 6px; cursor: pointer;">
                    Yeniden Dene
                </button>
            </div>
        `;
    }
};

// Uygulama başlatma
document.addEventListener('DOMContentLoaded', () => {
    ApplicationController.initialize();
});

// Global erişim
window.ApplicationController = ApplicationController;