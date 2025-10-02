// Ana Renderer Process - Modüler Sistem Koordinatörü
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

// Module Loading System
const ModuleLoader = {
    loadedModules: new Set(),
    loadOrder: [
        // Core modules first
        'modules/core/tableManager.js',
        'modules/core/excelManager.js', 
        'modules/core/uiManager.js',
        
        // Material registry
        'modules/materialRegistry.js',
        
        // Base material class
        'modules/materials/base/baseMaterial.js',
        
        // Material types - order doesn't matter as they auto-register
        'modules/materials/sac.js',
        'modules/materials/lama.js',
        'modules/materials/boru.js',
        'modules/materials/kosebent.js',
        'modules/materials/profil.js',
        'modules/materials/kutu.js',
        'modules/materials/flans.js',
        'modules/materials/flansAsme.js',
        'modules/materials/ozelFlans.js',
        'modules/materials/mil.js',
        'modules/materials/izgara.js',
        'modules/materials/dirsek.js',
        'modules/materials/ozelMalzeme.js'
    ],

    async loadAllModules() {
        console.log('Starting module loading process...');
        
        try {
            for (const modulePath of this.loadOrder) {
                await this.loadModule(modulePath);
            }
            
            console.log('All modules loaded successfully');
            this.onAllModulesLoaded();
            
        } catch (error) {
            console.error('Module loading failed:', error);
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
                    console.log(`Loaded: ${modulePath}`);
                    resolve();
                };
                
                script.onerror = () => {
                    reject(new Error(`Failed to load: ${modulePath}`));
                };
                
                document.head.appendChild(script);
            });
            
        } catch (error) {
            throw new Error(`Error loading ${modulePath}: ${error.message}`);
        }
    },

    onAllModulesLoaded() {
        // Initialize the application after all modules are loaded
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
        
        console.log('Initializing Application Controller...');
        
        try {
            // Verify required modules are loaded
            this.verifyModules();
            
            // Initialize material registry
            this.initializeMaterialRegistry();
            
            // Setup UI system
            this.setupUI();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Setup material type selector
            this.setupMaterialTypeSelector();
            
            // Load saved data
            this.loadSavedData();
            
            // Setup autosave
            this.setupAutoSave();
            
            // Initialize tab system
            this.initializeTabSystem();
            
            this.isInitialized = true;
            console.log('Application initialized successfully');
            
            // Show welcome message
            this.showWelcomeMessage();
            
        } catch (error) {
            console.error('Application initialization failed:', error);
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
            throw new Error(`Missing required modules: ${missingModules.join(', ')}`);
        }
    },

    initializeMaterialRegistry: function() {
        if (!window.MaterialRegistry) {
            throw new Error('MaterialRegistry not found');
        }
        
        // Material types should auto-register when their scripts load
        const registeredCount = window.MaterialRegistry.getAll().length;
        console.log(`MaterialRegistry initialized with ${registeredCount} material types`);
        
        if (registeredCount === 0) {
            console.warn('No material types registered');
        }
    },

    setupUI: function() {
        if (!window.UIManager) {
            throw new Error('UIManager not found');
        }
        
        window.UIManager.initialize();
    },

    setupEventListeners: function() {
        // Material type change
        const malzemeTuruSelect = document.getElementById('malzemeTuru');
        if (malzemeTuruSelect) {
            malzemeTuruSelect.addEventListener('change', () => {
                this.onMaterialTypeChange();
            });
        }

        // Action buttons
        this.setupActionButtons();
        
        // IPC listeners
        this.setupIpcListeners();
        
        // Enter key calculation
        this.setupEnterKeyCalculation();
        
        // Language change
        this.setupLanguageChangeListener();
    },

    setupActionButtons: function() {
        const buttonMappings = [
            { id: 'btnHesapla', handler: () => this.calculateMaterial() },
            { id: 'btnEkle', handler: () => window.TableManager.addRow() },
            { id: 'btnTemizle', handler: () => this.clearForm() },
            { id: 'btnExcelKaydet', handler: () => window.ExcelManager.exportToExcel() },
            { id: 'btnExcelAc', handler: () => window.ExcelManager.importFromExcel() },
            { id: 'btnTabloTemizle', handler: () => window.TableManager.clearTable() },
            { id: 'btnFilter', handler: () => this.showFilterDialog() }
        ];

        buttonMappings.forEach(({ id, handler }) => {
            const button = document.getElementById(id);
            if (button) {
                button.addEventListener('click', handler);
            }
        });
    },

    setupMaterialTypeSelector: function() {
        const select = document.getElementById('malzemeTuru');
        if (!select || !window.MaterialRegistry) return;
        
        // Clear existing options except first
        while (select.options.length > 1) {
            select.remove(1);
        }
        
        // Add material type options
        const currentLanguage = this.getCurrentLanguage();
        const options = window.MaterialRegistry.generateOptions(currentLanguage);
        
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            select.appendChild(optionElement);
        });
    },

    onMaterialTypeChange: function() {
        const materialType = document.getElementById('malzemeTuru').value;
        const olcuAlanlari = document.getElementById('olcuAlanlari');
        const suHacmiCard = document.getElementById('suHacmiCard');
        
        // Clear previous fields
        olcuAlanlari.innerHTML = '';
        
        // Hide water volume card by default
        suHacmiCard.style.display = 'none';
        document.getElementById('suHacmi').textContent = '0.00';
        
        // Clear results
        this.clearResults();
        
        if (!materialType || !window.MaterialRegistry.has(materialType)) {
            return;
        }
        
        try {
            // Create UI for selected material type
            const uiHtml = window.MaterialRegistry.createUI(materialType);
            olcuAlanlari.innerHTML = uiHtml;
            
            // Check if material type has water volume calculation
            const MaterialClass = window.MaterialRegistry.get(materialType);
            const instance = new MaterialClass();
            if (typeof instance.hasWaterVolume === 'function' && instance.hasWaterVolume()) {
                suHacmiCard.style.display = 'flex';
            }
            
            // Focus first input
            setTimeout(() => {
                const firstInput = olcuAlanlari.querySelector('input:not([readonly]), select');
                if (firstInput) {
                    firstInput.focus();
                }
            }, 100);
            
        } catch (error) {
            console.error('Error creating material UI:', error);
            window.UIManager.showNotification('Malzeme arayüzü oluşturulamadı', 'error');
        }
    },

    calculateMaterial: function() {
        const materialType = document.getElementById('malzemeTuru').value;
        
        if (!materialType) {
            window.UIManager.showNotification('Lütfen malzeme türü seçin!', 'warning');
            return false;
        }

        if (!window.MaterialRegistry.has(materialType)) {
            window.UIManager.showNotification('Malzeme türü bulunamadı!', 'error');
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
            console.error('Calculation error:', error);
            window.UIManager.showNotification('Hesaplama sırasında hata oluştu: ' + error.message, 'error');
            return false;
        }
    },

    collectFormData: function() {
        const formData = {
            malzemeTuru: document.getElementById('malzemeTuru').value,
            malzemeCinsi: document.getElementById('malzemeCinsi').value,
            adet: parseFloat(document.getElementById('adet').value) || 1,
            heatNo: document.getElementById('heatNo').value || ''
        };

        // Collect all input and select values from dimension area
        const inputs = document.querySelectorAll('#olcuAlanlari input, #olcuAlanlari select');
        inputs.forEach(input => {
            if (input.id) {
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
        
        // Clear dimension inputs
        const inputs = olcuAlanlari.querySelectorAll('input');
        inputs.forEach(input => {
            input.value = '';
        });

        const selects = olcuAlanlari.querySelectorAll('select');
        selects.forEach(select => {
            select.selectedIndex = 0;
        });

        // Reset quantity to 1
        document.getElementById('adet').value = '1';
        
        // Clear heat number
        document.getElementById('heatNo').value = '';
        
        // Clear results
        this.clearResults();
        
        // Focus first input
        setTimeout(() => {
            const firstInput = olcuAlanlari.querySelector('input:not([readonly]), select');
            if (firstInput) {
                firstInput.focus();
            }
        }, 100);
    },

    showFilterDialog: function() {
        if (window.UIManager && typeof window.UIManager.showFilterDialog === 'function') {
            window.UIManager.showFilterDialog();
        }
    },

    setupEnterKeyCalculation: function() {
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

    setupLanguageChangeListener: function() {
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
            });
        }
    },

    changeLanguage: function(language) {
        localStorage.setItem('selectedLanguage', language);
        
        // Update material type selector
        this.setupMaterialTypeSelector();
        
        // Update UI texts
        if (window.UIManager) {
            window.UIManager.currentLanguage = language;
            window.UIManager.updateStaticTexts();
        }
        
        // Update table language
        if (window.TableManager) {
            window.TableManager.updateTableLanguage();
        }
        
        // Trigger language change event
        const event = new CustomEvent('languageChanged', {
            detail: { language: language }
        });
        document.dispatchEvent(event);
    },

    getCurrentLanguage: function() {
        const langSelect = document.getElementById('languageSelect');
        return langSelect ? langSelect.value : localStorage.getItem('selectedLanguage') || 'tr';
    },

    setupIpcListeners: function() {
        // Menu events
        ipcRenderer.on('menu-new', () => {
            if (confirm('Mevcut tüm veriler silinecek. Emin misiniz?')) {
                this.clearAllData();
            }
        });

        ipcRenderer.on('menu-open-excel', () => {
            window.ExcelManager.importFromExcel();
        });

        ipcRenderer.on('menu-save-excel', () => {
            window.ExcelManager.exportToExcel();
        });

        ipcRenderer.on('add-custom-material-type', () => {
            this.showAddMaterialDialog();
        });

        ipcRenderer.on('manage-custom-materials', () => {
            this.showManageCustomMaterials();
        });
    },

    clearAllData: function() {
        // Clear project info
        const projectFields = ['projeAdi', 'siparisNo', 'revizyonNo', 
                             'resimAciklamasi', 'resimNo', 'hazirlayan', 'kontrol'];
        projectFields.forEach(field => {
            const element = document.getElementById(field);
            if (element) element.value = '';
        });

        // Clear notes and revisions
        const notesFields = ['notlar', 'revizyonlar'];
        notesFields.forEach(field => {
            const element = document.getElementById(field);
            if (element) element.value = '';
        });
        
        // Clear table
        if (window.TableManager) {
            window.TableManager.tableData = [];
            window.TableManager.pNoCounter = 1;
            window.TableManager.renderTable();
            window.TableManager.updateSummary();
        }
        
        // Clear form
        this.clearForm();
        
        window.UIManager.showNotification('Tüm veriler temizlendi', 'success');
    },

    showAddMaterialDialog: function() {
        // This would open a dialog for adding custom materials
        // Implementation depends on the custom material system
        console.log('Add material dialog - to be implemented');
    },

    showManageCustomMaterials: function() {
        // This would open a dialog for managing custom materials
        // Implementation depends on the custom material system
        console.log('Manage custom materials - to be implemented');
    },

    initializeTabSystem: function() {
        if (window.TabManager) {
            window.TabManager.initialize();
        }
    },

    setupAutoSave: function() {
        // Define autosave function
        window.autoSaveData = async function() {
            if (!window.TableManager) return;
            
            const tableData = window.TableManager.getTableData();
            const data = {
                projectInfo: window.TableManager.getProjectInfo(),
                notesRevisions: window.TableManager.getNotesRevisions(),
                tableData: tableData,
                version: '2.1.5',
                date: new Date().toISOString()
            };
            
            try {
                await ipcRenderer.invoke('save-data', data);
                console.log('Auto-save completed:', new Date().toLocaleTimeString());
            } catch (error) {
                console.error('Auto-save failed:', error);
            }
        };

        // Auto-save every 30 seconds if there's data
        setInterval(() => {
            if (window.TableManager && window.TableManager.getTableData().length > 0) {
                window.autoSaveData();
            }
        }, 30000);

        // Save on window close
        window.addEventListener('beforeunload', async (e) => {
            const autoSave = localStorage.getItem('autoSave');
            if (autoSave === 'false') return;
            
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
                
                // Load project info
                if (data.projectInfo && window.TableManager) {
                    window.TableManager.loadProjectInfo(data.projectInfo);
                }
                
                // Load notes and revisions
                if (data.notesRevisions && window.TableManager) {
                    window.TableManager.loadNotesRevisions(data.notesRevisions);
                }
                
                // Load table data
                if (data.tableData && data.tableData.length > 0 && window.TableManager) {
                    window.TableManager.loadTableData(data.tableData);
                    window.UIManager.showNotification('Önceki oturum verileri yüklendi', 'info');
                }
            }
        } catch (error) {
            console.log('Could not load saved data:', error);
        }
    },

    showWelcomeMessage: function() {
        setTimeout(() => {
            if (window.UIManager) {
                window.UIManager.showNotification('Program başarıyla yüklendi', 'success');
            }
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
    }
};

// Global access
window.EventManager = EventManager;
window.ApplicationController = ApplicationController;

// Main initialization sequence
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded, starting initialization...');
    
    // Initialize event management first
    EventManager.initialize();
    
    // Load all modules
    await ModuleLoader.loadAllModules();
});

console.log('Renderer process loaded successfully.');