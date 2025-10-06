/**
 * Ana Renderer Process - Tüm İşlevsellik Korunmuş
 */

const { ipcRenderer } = require('electron');

// Event Management System

const EventManager = {
    isInitialized: false,
    
    initialize: function() {
        if (this.isInitialized) return;
        
        this.setupGlobalHandlers();
        this.setupMutationObserver();
        this.isInitialized = true;
    },

    setupGlobalHandlers: function() {
        document.addEventListener('focusin', this.handleFocusIn.bind(this), true);
        document.addEventListener('input', this.handleInput.bind(this), true);
        document.addEventListener('keydown', this.handleKeyDown.bind(this), true);
        
        window.addEventListener('focus', this.handleWindowFocus.bind(this));
        window.addEventListener('blur', this.handleWindowBlur.bind(this));
    },

    handleFocusIn: function(e) {
        if (e.target.matches('input, select, textarea')) {
            this.activateElement(e.target);
        }
    },

    handleInput: function(e) {
        e.stopPropagation = function() {};
    },

    handleKeyDown: function(e) {
        if (e.target.matches('input, select, textarea')) {
            e.stopPropagation = function() {};
        }
    },

    handleWindowFocus: function() {
        this.restoreFocus();
    },

    handleWindowBlur: function() {
        console.log('Window focus lost');
    },

    activateElement: function(element) {
        if (!element || element.readOnly || element.disabled) return;
        
        element.style.pointerEvents = 'auto';
        element.style.userSelect = 'auto';
        element.removeAttribute('disabled');
        
        if (!element.hasAttribute('tabindex')) {
            element.tabIndex = 0;
        }
    },

    restoreFocus: function() {
        const inputs = document.querySelectorAll('input:not([readonly]), select:not([disabled]), textarea:not([readonly])');
        inputs.forEach(input => {
            this.activateElement(input);
        });
        
        const activeElement = document.activeElement;
        if (activeElement && activeElement !== document.body) {
            activeElement.blur();
            setTimeout(() => {
                activeElement.focus();
            }, 10);
        }
    },

    setupMutationObserver: function() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) {
                            if (node.matches && node.matches('input, select, textarea')) {
                                this.activateElement(node);
                            }
                            
                            if (node.querySelectorAll) {
                                const inputs = node.querySelectorAll('input, select, textarea');
                                inputs.forEach(input => this.activateElement(input));
                            }
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
};

// Module Loader System
const ModuleLoader = {
    loadedModules: new Set(),
    loadOrder: [
        // Core modules
        'modules/core/tableManager.js',
        'modules/core/excelManager.js',
        'modules/core/uiManager.js',
        
        // Material registry
        'modules/materialRegistry.js',
        
        // Base material class
        'modules/materials/base/baseMaterial.js',
        
        // Material types
        'modules/materials/sac.js',
        'modules/materials/lama.js',
        'modules/materials/boru.js',
        'modules/materials/kosebent.js',
        'modules/materials/profil.js',
        'modules/materials/kutu.js',
        'modules/materials/flans.js',
        'modules/materials/ozelFlans.js',
        'modules/materials/mil.js',
        'modules/materials/izgara.js',
        'modules/materials/dirsek.js',
        'modules/materials/ozelMalzeme.js'
    ],

    async loadAllModules() {
        console.log('Modüller yükleniyor...');
        
        try {
            for (const modulePath of this.loadOrder) {
                await this.loadModule(modulePath);
            }
            
            console.log('Tüm modüller yüklendi');
            this.onAllModulesLoaded();
            
        } catch (error) {
            console.error('Modül yükleme hatası:', error);
            this.showLoadError(error);
        }
    },

    async loadModule(modulePath) {
        if (this.loadedModules.has(modulePath)) {
            return;
        }

        try {
            const script = document.createElement('script');
            script.src = `js/${modulePath}`;
            
            return new Promise((resolve, reject) => {
                script.onload = () => {
                    this.loadedModules.add(modulePath);
                    console.log(`Yüklendi: ${modulePath}`);
                    resolve();
                };
                
                script.onerror = () => {
                    reject(new Error(`Yüklenemedi: ${modulePath}`));
                };
                
                document.head.appendChild(script);
            });
            
        } catch (error) {
            throw new Error(`Hata: ${modulePath}: ${error.message}`);
        }
    },

    onAllModulesLoaded() {
        ApplicationController.initialize();
    },

    showLoadError(error) {
        document.body.innerHTML = `
            <div style="padding: 20px; text-align: center; color: red;">
                <h2>Modül Yükleme Hatası</h2>
                <p>Uygulama başlatılamadı: ${error.message}</p>
                <button onclick="location.reload()">Yeniden Dene</button>
            </div>
        `;
    }
};

// Main Application Controller
const ApplicationController = {
    isInitialized: false,

    initialize: function() {
        if (this.isInitialized) return;
        
        console.log('Uygulama başlatılıyor...');
        
        try {
            // Modülleri doğrula
            this.verifyModules();
            
            // UI'yı başlat
            this.setupUI();
            
            // Event listener'ları kur
            this.setupEventListeners();
            
            // Malzeme türü seçimini doldur
            this.setupMaterialTypeSelector();
            
            // Malzeme cinsi seçimini başlat
            this.updateMaterialGrades();
            
            // Kayıtlı verileri yükle
            this.loadSavedData();
            
            // Otomatik kayıt sistemini kur
            this.setupAutoSave();
            
            this.isInitialized = true;
            console.log('Uygulama hazır');
            
            // Hoş geldin mesajı
            this.showWelcomeMessage();
            
        } catch (error) {
            console.error('Uygulama başlatma hatası:', error);
            this.showInitializationError(error);
        }
    },

    verifyModules: function() {
        const requiredModules = [
            'MaterialRegistry',
            'BaseMaterial',
            'TableManager',
            'ExcelManager',
            'UIManager'
        ];
        
        const missingModules = requiredModules.filter(module => !window[module]);
        
        if (missingModules.length > 0) {
            throw new Error(`Eksik modüller: ${missingModules.join(', ')}`);
        }
    },

    setupUI: function() {
        if (window.UIManager) {
            window.UIManager.initialize();
        }
    },

    setupEventListeners: function() {
        // Malzeme türü değişimi
        const malzemeTuru = document.getElementById('malzemeTuru');
        if (malzemeTuru) {
            malzemeTuru.addEventListener('change', () => this.onMaterialTypeChange());
        }

        // Hesapla butonu
        const btnHesapla = document.getElementById('btnHesapla');
        if (btnHesapla) {
            btnHesapla.addEventListener('click', () => this.calculateMaterial());
        }

        // Tabloya ekle
        const btnEkle = document.getElementById('btnEkle');
        if (btnEkle) {
            btnEkle.addEventListener('click', () => {
                if (window.TableManager) {
                    window.TableManager.addRow();
                }
            });
        }

        // Temizle
        const btnTemizle = document.getElementById('btnTemizle');
        if (btnTemizle) {
            btnTemizle.addEventListener('click', () => this.clearForm());
        }

        // Dil değişimi
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                this.onLanguageChange(e.target.value);
            });
        }

        // Enter tuşu ile hesaplama
        this.setupEnterKeyBinding();
        
        // IPC listener'ları
        this.setupIpcListeners();
    },

    setupMaterialTypeSelector: function() {
        const select = document.getElementById('malzemeTuru');
        if (!select || !window.MaterialRegistry) return;
        
        const options = window.MaterialRegistry.generateOptions();
        
        // İlk option'ı koru
        while (select.options.length > 1) {
            select.remove(1);
        }
        
        options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.text;
            select.appendChild(option);
        });
    },

    onMaterialTypeChange: function() {
        const materialType = document.getElementById('malzemeTuru').value;
        const olcuAlanlari = document.getElementById('olcuAlanlari');
        const suHacmiCard = document.getElementById('suHacmiCard');
        
        // Önceki alanları temizle
        olcuAlanlari.innerHTML = '';
        
        // Su hacmi kartını gizle
        suHacmiCard.style.display = 'none';
        document.getElementById('suHacmi').textContent = '0.00';
        
        // Sonuçları temizle
        this.clearResults();
        
        if (!materialType) {
            // Malzeme cinsi seçimini temizle
            document.getElementById('malzemeCinsi').innerHTML = '';
            return;
        }
        
        if (window.MaterialRegistry && window.MaterialRegistry.has(materialType)) {
            // UI oluştur
            const uiHtml = window.MaterialRegistry.createUI(materialType);
            olcuAlanlari.innerHTML = uiHtml;
            
            // Malzeme cinslerini güncelle
            this.updateMaterialGrades();
            
            // Su hacmi kontrolü
            const MaterialClass = window.MaterialRegistry.get(materialType);
            const instance = new MaterialClass();
            if (typeof instance.hasWaterVolume === 'function' && instance.hasWaterVolume()) {
                suHacmiCard.style.display = 'flex';
            }
            
            // İlk input'a focus
            setTimeout(() => {
                const firstInput = olcuAlanlari.querySelector('input:not([readonly]), select');
                if (firstInput) {
                    firstInput.focus();
                }
            }, 100);
        }
    },

    updateMaterialGrades: function() {
        const materialType = document.getElementById('malzemeTuru').value;
        const malzemeCinsiSelect = document.getElementById('malzemeCinsi');
        
        if (!materialType || !window.MaterialRegistry.has(materialType)) {
            malzemeCinsiSelect.innerHTML = '';
            return;
        }
        
        // Özel malzeme için input oluştur
        if (materialType === 'ozelMalzeme') {
            // Select'i input ile değiştir
            const parent = malzemeCinsiSelect.parentNode;
            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'malzemeCinsi';
            input.placeholder = 'Malzeme cinsi yazın';
            input.className = malzemeCinsiSelect.className;
            parent.replaceChild(input, malzemeCinsiSelect);
            return;
        }
        
        // Diğer malzemeler için normal select kullan
        // Eğer önceden input varsa select'e çevir
        const currentElement = document.getElementById('malzemeCinsi');
        if (currentElement.tagName === 'INPUT' && materialType !== 'ozelMalzeme') {
            const parent = currentElement.parentNode;
            const select = document.createElement('select');
            select.id = 'malzemeCinsi';
            select.className = currentElement.className;
            parent.replaceChild(select, currentElement);
        }
        
        const MaterialClass = window.MaterialRegistry.get(materialType);
        const instance = new MaterialClass();
        const grades = instance.getGrades();
        
        const selectElement = document.getElementById('malzemeCinsi');
        selectElement.innerHTML = '';
        grades.forEach(grade => {
            const option = document.createElement('option');
            option.value = grade;
            option.textContent = grade;
            selectElement.appendChild(option);
        });
    },

    onLanguageChange: function(language) {
        localStorage.setItem('selectedLanguage', language);
        
        // Malzeme türü listesini güncelle
        if (window.MaterialRegistry) {
            window.MaterialRegistry.updateLanguage();
        }
        
        // Tabloyu güncelle
        if (window.TableManager) {
            window.TableManager.updateTableLanguage();
        }
        
        // Mevcut malzeme türü seçiliyse UI'yı güncelle
        const materialType = document.getElementById('malzemeTuru').value;
        if (materialType) {
            this.onMaterialTypeChange();
        }
    },

    calculateMaterial: function() {
        const materialType = document.getElementById('malzemeTuru').value;
        
        if (!materialType) {
            window.UIManager?.showNotification('Lütfen malzeme türü seçin!', 'warning');
            return false;
        }

        if (!window.MaterialRegistry.has(materialType)) {
            window.UIManager?.showNotification('Malzeme türü bulunamadı!', 'error');
            return false;
        }

        try {
            const formData = this.collectFormData();
            const calculation = window.MaterialRegistry.calculate(materialType, formData);
            
            if (!calculation) {
                return false;
            }

            this.updateResults(calculation);
            return true;
            
        } catch (error) {
            console.error('Hesaplama hatası:', error);
            window.UIManager?.showNotification('Hesaplama sırasında hata oluştu: ' + error.message, 'error');
            return false;
        }
    },

    collectFormData: function() {
        const formData = {
            malzemeTuru: document.getElementById('malzemeTuru').value,
            malzemeCinsi: '', // Başlangıç değeri
            adet: parseFloat(document.getElementById('adet').value) || 1,
            heatNo: document.getElementById('heatNo').value || ''
        };

        // Malzeme cinsini al (select veya input olabilir)
        const malzemeCinsiElement = document.getElementById('malzemeCinsi');
        if (malzemeCinsiElement) {
            if (malzemeCinsiElement.tagName === 'SELECT') {
                formData.malzemeCinsi = malzemeCinsiElement.value;
            } else if (malzemeCinsiElement.tagName === 'INPUT') {
                formData.malzemeCinsi = malzemeCinsiElement.value;
            }
        }

        // Tüm input ve select değerlerini topla
        const inputs = document.querySelectorAll('#olcuAlanlari input, #olcuAlanlari select');
        inputs.forEach(input => {
            if (input.id && input.id !== 'malzemeCinsi') {
                if (input.type === 'number') {
                    formData[input.id] = parseFloat(input.value) || 0;
                } else {
                    formData[input.id] = input.value;
                }
            }
        });

        return formData;
    },

    updateResults: function(calculation) {
        document.getElementById('birimAgirlik').textContent = calculation.birimAgirlik.toFixed(2);
        document.getElementById('toplamAgirlik').textContent = calculation.toplamAgirlik.toFixed(2);
        
        if (calculation.suHacmi !== undefined && calculation.suHacmi !== null) {
            document.getElementById('suHacmi').textContent = calculation.suHacmi.toFixed(2);
            document.getElementById('suHacmiCard').style.display = 'flex';
        }

        this.animateResultCards();
    },

    animateResultCards: function() {
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

    clearResults: function() {
        document.getElementById('birimAgirlik').textContent = '0.00';
        document.getElementById('toplamAgirlik').textContent = '0.00';
        document.getElementById('suHacmi').textContent = '0.00';
        document.getElementById('suHacmiCard').style.display = 'none';
    },

    clearForm: function() {
        const olcuAlanlari = document.getElementById('olcuAlanlari');
        
        // Ölçü alanlarını temizle
        const inputs = olcuAlanlari.querySelectorAll('input');
        inputs.forEach(input => {
            input.value = '';
        });

        const selects = olcuAlanlari.querySelectorAll('select');
        selects.forEach(select => {
            select.selectedIndex = 0;
        });

        // Adet'i 1'e sıfırla
        document.getElementById('adet').value = '1';
        
        // Heat No temizle
        document.getElementById('heatNo').value = '';
        
        // Sonuçları temizle
        this.clearResults();
        
        // İlk input'a focus
        setTimeout(() => {
            const firstInput = olcuAlanlari.querySelector('input:not([readonly]), select');
            if (firstInput) {
                firstInput.focus();
            }
        }, 100);
    },

    setupEnterKeyBinding: function() {
        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter') return;
            
            const activeElement = document.activeElement;
            if (!activeElement || activeElement.tagName !== 'INPUT') return;
            
            const projectFields = ['projeAdi', 'siparisNo', 'revizyonNo', 
                                 'resimAciklamasi', 'resimNo', 'hazirlayan', 'kontrol'];
            
            if (projectFields.includes(activeElement.id)) return;
            
            const materialType = document.getElementById('malzemeTuru').value;
            if (!materialType) return;
            
            const olcuAlanlari = document.getElementById('olcuAlanlari');
            const isRelevantInput = olcuAlanlari.contains(activeElement) || 
                                 activeElement.id === 'adet' || 
                                 activeElement.id === 'heatNo';
            
            if (isRelevantInput) {
                e.preventDefault();
                this.calculateMaterial();
            }
        });
    },

    setupIpcListeners: function() {
        // Menü - Yeni
        ipcRenderer.on('menu-new', () => {
            if (confirm('Mevcut tüm veriler silinecek. Emin misiniz?')) {
                this.clearAllData();
            }
        });

        // Menü - Excel Aç
        ipcRenderer.on('menu-open-excel', () => {
            window.ExcelManager?.importFromExcel();
        });

        // Menü - Excel Kaydet
        ipcRenderer.on('menu-save-excel', () => {
            window.ExcelManager?.exportToExcel();
        });

        // Özel malzeme ekleme
        ipcRenderer.on('add-custom-material-type', () => {
            this.showAddMaterialDialog();
        });

        // Özel malzemeleri yönet
        ipcRenderer.on('manage-custom-materials', () => {
            this.showManageCustomMaterials();
        });

        // Yardım
        ipcRenderer.on('open-help', () => {
            this.showHelp();
        });
    },

    clearAllData: function() {
        // Proje bilgilerini temizle
        ['projeAdi', 'siparisNo', 'revizyonNo', 'resimAciklamasi', 'resimNo', 'hazirlayan', 'kontrol'].forEach(id => {
            const element = document.getElementById(id);
            if (element) element.value = '';
        });

        // Notlar ve revizyonları temizle
        ['notlar', 'revizyonlar'].forEach(id => {
            const element = document.getElementById(id);
            if (element) element.value = '';
        });
        
        // Tabloyu temizle
        if (window.TableManager) {
            window.TableManager.tableData = [];
            window.TableManager.pNoCounter = 1;
            window.TableManager.renderTable();
            window.TableManager.updateSummary();
        }
        
        // Formu temizle
        this.clearForm();
        
        window.UIManager?.showNotification('Tüm veriler temizlendi', 'success');
    },

    setupAutoSave: function() {
        // Otomatik kayıt fonksiyonu
        window.autoSaveData = async function() {
            if (!window.TableManager) return;
            
            const tableData = window.TableManager.getTableData();
            const data = {
                projectInfo: window.TableManager.getProjectInfo(),
                notesRevisions: window.TableManager.getNotesRevisions(),
                tableData: tableData,
                version: '3.0.0',
                date: new Date().toISOString()
            };
            
            try {
                await ipcRenderer.invoke('save-data', data);
                console.log('Otomatik kayıt:', new Date().toLocaleTimeString());
            } catch (error) {
                console.error('Otomatik kayıt hatası:', error);
            }
        };

        // Her 30 saniyede bir kaydet
        setInterval(() => {
            if (window.TableManager && window.TableManager.getTableData().length > 0) {
                window.autoSaveData();
            }
        }, 30000);

        // Pencere kapatılırken kaydet
        window.addEventListener('beforeunload', async (e) => {
            if (window.TableManager && window.TableManager.getTableData().length > 0) {
                await window.autoSaveData();
            }
        });
    },

    async loadSavedData() {
        try {
            const result = await ipcRenderer.invoke('load-data');
            if (result.success && result.data) {
                const data = result.data;
                
                // Proje bilgilerini yükle
                if (data.projectInfo && window.TableManager) {
                    window.TableManager.loadProjectInfo(data.projectInfo);
                }
                
                // Notlar ve revizyonları yükle
                if (data.notesRevisions && window.TableManager) {
                    window.TableManager.loadNotesRevisions(data.notesRevisions);
                }
                
                // Tablo verilerini yükle
                if (data.tableData && data.tableData.length > 0 && window.TableManager) {
                    window.TableManager.loadTableData(data.tableData);
                    window.UIManager?.showNotification('Önceki oturum verileri yüklendi', 'info');
                }
            }
        } catch (error) {
            console.log('Kayıtlı veri yüklenemedi:', error);
        }
    },

    showWelcomeMessage: function() {
        setTimeout(() => {
            window.UIManager?.showNotification('Program başarıyla yüklendi', 'success');
        }, 1000);
    },

    showInitializationError: function(error) {
        document.body.innerHTML = `
            <div style="padding: 20px; text-align: center; color: red;">
                <h2>Başlatma Hatası</h2>
                <p>Uygulama başlatılamadı: ${error.message}</p>
                <button onclick="location.reload()">Yeniden Dene</button>
            </div>
        `;
    },

    showAddMaterialDialog: function() {
        console.log('Özel malzeme ekleme dialogu - İmplementasyon gerekli');
        window.UIManager?.showNotification('Bu özellik henüz hazır değil', 'info');
    },

    showManageCustomMaterials: function() {
        console.log('Özel malzeme yönetimi - İmplementasyon gerekli');
        window.UIManager?.showNotification('Bu özellik henüz hazır değil', 'info');
    },

    showHelp: function() {
        console.log('Yardım - İmplementasyon gerekli');
        window.UIManager?.showNotification('Yardım hazırlanıyor...', 'info');
    }
};

// Global erişim
window.EventManager = EventManager;
window.ApplicationController = ApplicationController;

// Ana başlatma
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM yüklendi, başlatılıyor...');
    
    // Event yönetimini başlat
    EventManager.initialize();
    
    // Modülleri yükle
    await ModuleLoader.loadAllModules();
});

console.log('Renderer process yüklendi.');