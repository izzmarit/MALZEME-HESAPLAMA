/**
 * Ana Renderer Process - Tüm İşlevsellik Korunmuş
 */

const { ipcRenderer } = require('electron');

// Event Management System

const EventManager = {
    isInitialized: false,
    activeInputs: new WeakSet(), // Aktif input'ları takip et
    
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
            
            // Eğer element pasifse, aktif hale getir
            if (e.target.style.pointerEvents === 'none' || e.target.hasAttribute('disabled')) {
                this.activateElement(e.target);
            }
        }
    },

    handleWindowFocus: function() {
        // Pencere focus aldığında tüm input'ları aktif et
        this.forceActivateAll();
    },

    handleWindowBlur: function() {
        console.log('Window focus lost');
    },

    activateElement: function(element) {
        if (!element || element.readOnly) return;
        
        // Disabled özelliğini kaldır
        element.removeAttribute('disabled');
        element.disabled = false;
        
        // Style özelliklerini ayarla
        element.style.pointerEvents = 'auto';
        element.style.userSelect = 'auto';
        element.style.opacity = '1';
        
        // Tabindex ayarla
        if (!element.hasAttribute('tabindex') || element.tabIndex < 0) {
            element.tabIndex = 0;
        }
        
        // WeakSet'e ekle
        this.activeInputs.add(element);
        
        // Event listener'ları tekrar ekle
        this.ensureEventListeners(element);
    },

    ensureEventListeners: function(element) {
        // Eğer element zaten event listener'a sahipse ekleme
        if (element.dataset.eventListenersAdded) return;
        
        // Focus event
        element.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary-color)';
        });
        
        // Blur event
        element.addEventListener('blur', function() {
            this.style.borderColor = '';
        });
        
        // Mark as processed
        element.dataset.eventListenersAdded = 'true';
    },

    // YENİ FONKSIYON: Tüm input'ları zorla aktif et
    forceActivateAll: function() {
        // Tüm input, select ve textarea elementlerini bul ve aktif et
        const inputs = document.querySelectorAll('input:not([readonly]), select:not([readonly]), textarea:not([readonly])');
        
        inputs.forEach(input => {
            // Her elementi aktif et
            this.activateElement(input);
            
            // Eğer element görünür değilse veya parent'ı display:none ise atla
            const isVisible = input.offsetParent !== null;
            if (!isVisible) return;
            
            // Style'ı düzelt
            input.style.pointerEvents = 'auto';
            input.style.userSelect = 'auto';
            input.removeAttribute('disabled');
        });
        
        console.log(`${inputs.length} input elementi aktif edildi`);
    },

    restoreFocus: function() {
        // Önce tüm input'ları aktif et
        this.forceActivateAll();
        
        // Şu anki active element'i kontrol et
        const activeElement = document.activeElement;
        
        // Eğer active element body veya null ise, ilk kullanılabilir input'a focus et
        if (!activeElement || activeElement === document.body) {
            const olcuAlanlari = document.getElementById('olcuAlanlari');
            if (olcuAlanlari) {
                const firstInput = olcuAlanlari.querySelector('input:not([readonly]):not([disabled]), select:not([disabled])');
                if (firstInput) {
                    setTimeout(() => {
                        firstInput.focus();
                    }, 50);
                }
            }
        } else if (activeElement.matches('input, select, textarea')) {
            // Eğer zaten bir input aktifse, onu yeniden aktif et
            this.activateElement(activeElement);
            
            // Focus'u yenile
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
                            // Eğer node kendisi bir input ise
                            if (node.matches && node.matches('input, select, textarea')) {
                                setTimeout(() => {
                                    this.activateElement(node);
                                }, 10);
                            }
                            
                            // Eğer node içinde input'lar varsa
                            if (node.querySelectorAll) {
                                const inputs = node.querySelectorAll('input, select, textarea');
                                inputs.forEach(input => {
                                    setTimeout(() => {
                                        this.activateElement(input);
                                    }, 10);
                                });
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
    coreModules: [
        // Core modules
        'modules/core/tableManager.js',
        'modules/core/excelManager.js',
        'modules/core/uiManager.js',
        'modules/core/moduleUpdater.js',
        
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
        'modules/materials/ozelMalzeme.js',
        'modules/materials/vana.js',
        'modules/materials/borulamaEkipmanlari.js'
    ],
    customModules: [],

    async loadAllModules() {
        console.log('Modüller yükleniyor...');
        
        try {
            // Core modülleri yükle
            for (const modulePath of this.coreModules) {
                await this.loadModule(modulePath, 'core');
            }
            
            // Özel modülleri yükle
            await this.loadCustomModules();
            
            console.log('Tüm modüller yüklendi');
            this.onAllModulesLoaded();
            
        } catch (error) {
            console.error('Modül yükleme hatası:', error);
            this.showLoadError(error);
        }
    },

    async loadModule(modulePath, moduleType = 'core') {
        if (this.loadedModules.has(modulePath)) {
            return;
        }

        try {
            const script = document.createElement('script');
            script.src = moduleType === 'core' ? `js/${modulePath}` : modulePath;
            
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

    async loadCustomModules() {
        try {
            const result = await ipcRenderer.invoke('get-custom-modules');
            if (!result.success) return;
            
            for (const moduleName of result.modules) {
                await this.loadCustomModule(moduleName);
            }
            
            // Yüklenen modülleri localStorage'a kaydet
            localStorage.setItem('customModules', JSON.stringify(result.modules));
            
        } catch (error) {
            console.error('Özel modül yükleme hatası:', error);
        }
    },

    async loadCustomModule(moduleName) {
        try {
            const userDataPath = await ipcRenderer.invoke('get-user-data-path');
            const modulePath = `${userDataPath}/custom_modules/${moduleName}`;
            
            const script = document.createElement('script');
            script.src = modulePath;
            script.dataset.moduleType = 'custom';
            script.dataset.moduleName = moduleName;
            
            return new Promise((resolve, reject) => {
                script.onload = () => {
                    this.customModules.push(moduleName);
                    console.log(`Özel modül yüklendi: ${moduleName}`);
                    
                    // Malzeme türü listesini güncelle
                    if (window.ApplicationController && window.ApplicationController.isInitialized) {
                        window.ApplicationController.setupMaterialTypeSelector();
                    }
                    
                    resolve();
                };
                
                script.onerror = () => {
                    reject(new Error(`Özel modül yüklenemedi: ${moduleName}`));
                };
                
                document.head.appendChild(script);
            });
            
        } catch (error) {
            console.error(`Özel modül yükleme hatası: ${moduleName}`, error);
        }
    },

    async installModule(file) {
        try {
            const result = await ipcRenderer.invoke('install-module', file);
            if (result.success) {
                await this.loadCustomModule(result.moduleName);
                window.UIManager?.showNotification(
                    `Modül başarıyla yüklendi: ${result.moduleName}`,
                    'success'
                );
                return true;
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Modül kurulum hatası:', error);
            window.UIManager?.showNotification(
                `Modül yüklenemedi: ${error.message}`,
                'error'
            );
            return false;
        }
    },

    async removeModule(moduleName) {
        try {
            const result = await ipcRenderer.invoke('remove-module', moduleName);
            if (result.success) {
                // Listeden kaldır
                const index = this.customModules.indexOf(moduleName);
                if (index > -1) {
                    this.customModules.splice(index, 1);
                }
                
                // localStorage güncelle
                localStorage.setItem('customModules', JSON.stringify(this.customModules));
                
                window.UIManager?.showNotification(
                    `Modül kaldırıldı: ${moduleName}`,
                    'success'
                );
                
                // Sayfayı yenile
                setTimeout(() => location.reload(), 1500);
                
                return true;
            }
        } catch (error) {
            console.error('Modül kaldırma hatası:', error);
            window.UIManager?.showNotification(
                `Modül kaldırılamadı: ${error.message}`,
                'error'
            );
            return false;
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

    showCustomConfirmModal: function(message, onConfirm, onCancel) {
        const modal = document.createElement('div');
        modal.className = 'custom-confirm-modal';
        modal.innerHTML = `
            <div class="custom-confirm-content">
                <div class="custom-confirm-message">${message}</div>
                <div class="custom-confirm-buttons">
                    <button class="custom-confirm-btn custom-confirm-yes">Evet</button>
                    <button class="custom-confirm-btn custom-confirm-no">Hayır</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const yesBtn = modal.querySelector('.custom-confirm-yes');
        const noBtn = modal.querySelector('.custom-confirm-no');
        
        const closeModal = () => {
            modal.remove();
            // Modal kapatıldıktan sonra keyboard reset
            requestAnimationFrame(() => {
                if (window.EventManager) {
                    window.EventManager.forceActivateAll();
                }
                if (window.TableManager) {
                    window.TableManager.forceKeyboardReset();
                }
            });
        };
        
        yesBtn.onclick = () => {
            closeModal();
            if (onConfirm) {
                requestAnimationFrame(() => {
                    onConfirm();
                });
            }
        };
        
        noBtn.onclick = () => {
            closeModal();
            if (onCancel) onCancel();
        };
        
        // ESC tuşu ile kapat
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                if (onCancel) onCancel();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
        
        // Modal dışına tıklanırsa kapat
        modal.onclick = (e) => {
            if (e.target === modal) {
                closeModal();
                if (onCancel) onCancel();
            }
        };
    },

    showCustomAlert: function(message, onClose) {
        const modal = document.createElement('div');
        modal.className = 'custom-confirm-modal';
        modal.innerHTML = `
            <div class="custom-confirm-content">
                <div class="custom-confirm-message">${message}</div>
                <div class="custom-confirm-buttons">
                    <button class="custom-confirm-btn custom-confirm-yes">Tamam</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const okBtn = modal.querySelector('.custom-confirm-yes');
        
        const closeModal = () => {
            modal.remove();
            // Modal kapatıldıktan sonra keyboard reset
            requestAnimationFrame(() => {
                if (window.EventManager) {
                    window.EventManager.forceActivateAll();
                }
                if (window.TableManager) {
                    window.TableManager.forceKeyboardReset();
                }
                if (onClose) onClose();
            });
        };
        
        okBtn.onclick = closeModal;
        
        // ESC tuşu ile kapat
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
        
        // Modal dışına tıklanırsa kapat
        modal.onclick = (e) => {
            if (e.target === modal) {
                closeModal();
            }
        };
    },

    setupIpcListeners: function() {
        // Menü - Yeni
        ipcRenderer.on('menu-new', () => {
            this.clearAllData();
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

        ipcRenderer.on('add-module', () => {
            ApplicationController.showAddModuleDialog();
        });

        ipcRenderer.on('manage-modules', () => {
            ApplicationController.showManageModulesDialog();
        });

        ipcRenderer.on('update-modules', () => {
            if (window.ModuleUpdater) {
                ModuleUpdater.showUpdateDialog();
            }
        });
    },

    clearAllData: function() {
        this.showCustomConfirmModal(
            'Mevcut tüm veriler silinecek. Emin misiniz?',
            () => {
                // Onay verildi - verileri temizle
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
                    delete window.TableManager.editingIndex;
                    window.TableManager.renderTable();
                    window.TableManager.updateSummary();
                }
                
                // Formu temizle
                this.clearForm();
                
                window.UIManager?.showNotification('Tüm veriler temizlendi', 'success');
                
                // AGRESİF KEYBOARD RESET
                requestAnimationFrame(() => {
                    if (window.TableManager) {
                        window.TableManager.forceKeyboardReset();
                    }
                });
            }
        );
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
        const helpContent = `
            <div class="modal" style="display: block;">
                <div class="modal-content" style="max-width: 900px; height: 80vh; display: flex; flex-direction: column;">
                    <div class="modal-header">
                        <h2>📖 TETA Malzeme Hesaplama Sistemi - Kullanım Kılavuzu</h2>
                        <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
                    </div>
                    <div class="modal-body" style="overflow-y: auto; padding: 30px;">
                        <div style="background: linear-gradient(135deg, #667eea, #764ba2); 
                                    color: white; padding: 20px; border-radius: 10px; 
                                    margin-bottom: 30px;">
                            <h3 style="margin: 0; font-size: 1.3rem;">Versiyon 3.1.0</h3>
                            <p style="margin: 10px 0 0 0; opacity: 0.95;">
                                Dinamik Modül Desteği ile Geliştirilmiş Malzeme Hesaplama Sistemi
                            </p>
                        </div>

                        <div style="margin-bottom: 30px;">
                            <h3 style="color: #667eea; border-bottom: 2px solid #667eea; 
                                    padding-bottom: 10px; margin-bottom: 20px;">
                                Sistem Genel Bakış
                            </h3>
                            <p style="line-height: 1.8; color: #4a5568; margin-bottom: 15px;">
                                TETA Malzeme Hesaplama Sistemi, endüstriyel malzemelerin ağırlık 
                                hesaplamalarını yapabilen, Excel entegrasyonu ile raporlama 
                                özelliklerine sahip modüler bir yazılımdır. Sistem, temel malzeme 
                                türlerinin yanı sıra dinamik olarak yüklenebilen özel modüller ile 
                                genişletilebilir yapıya sahiptir.
                            </p>
                            <p style="line-height: 1.8; color: #4a5568;">
                                Program, kullanıcıların malzeme türü, boyut ve adet bilgilerini 
                                girerek hızlı hesaplamalar yapmasını sağlar. Hesaplanan veriler 
                                tabloya eklenerek toplu raporlar oluşturulabilir ve Excel formatında 
                                dışa aktarılabilir.
                            </p>
                        </div>

                        <div style="margin-bottom: 30px;">
                            <h3 style="color: #667eea; border-bottom: 2px solid #667eea; 
                                    padding-bottom: 10px; margin-bottom: 20px;">
                                Temel Özellikler ve Kullanım
                            </h3>
                            
                            <div style="background: #f7fafc; padding: 20px; border-radius: 8px; 
                                        margin-bottom: 20px;">
                                <h4 style="color: #2d3748; margin-bottom: 15px;">
                                    Proje Bilgileri Girişi
                                </h4>
                                <p style="line-height: 1.8; color: #4a5568;">
                                    Programın üst bölümünde yer alan proje bilgileri alanına, 
                                    üzerinde çalıştığınız projeye ait bilgileri girebilirsiniz. 
                                    Bu bilgiler Excel raporlarında otomatik olarak görüntülenecektir. 
                                    Proje adı, sipariş numarası, resim açıklaması, resim numarası, 
                                    revizyon numarası, hazırlayan ve kontrol eden kişi bilgileri 
                                    bu bölümde tanımlanabilir.
                                </p>
                            </div>

                            <div style="background: #f7fafc; padding: 20px; border-radius: 8px; 
                                        margin-bottom: 20px;">
                                <h4 style="color: #2d3748; margin-bottom: 15px;">
                                    Malzeme Hesaplama İşlemi
                                </h4>
                                <p style="line-height: 1.8; color: #4a5568; margin-bottom: 15px;">
                                    Sol panelde yer alan malzeme bilgileri bölümünden hesaplama 
                                    işlemlerinizi gerçekleştirebilirsiniz. İşlem adımları şu şekildedir:
                                </p>
                                <p style="line-height: 2; color: #4a5568; padding-left: 20px;">
                                    <strong>Adım 1:</strong> Malzeme türünü seçin. Sistem, yüklü olan 
                                    tüm modülleri otomatik olarak listede gösterecektir.<br>
                                    
                                    <strong>Adım 2:</strong> Malzeme cinsini belirleyin. Her malzeme 
                                    türüne özel standart malzeme cinsleri mevcuttur.<br>
                                    
                                    <strong>Adım 3:</strong> Seçilen malzeme türüne göre dinamik olarak 
                                    görüntülenen ölçü alanlarını doldurun.<br>
                                    
                                    <strong>Adım 4:</strong> Adet bilgisini girin ve isteğe bağlı olarak 
                                    Heat No veya açıklama ekleyin.<br>
                                    
                                    <strong>Adım 5:</strong> "Hesapla" butonuna tıklayarak sonuçları 
                                    görüntüleyin. Birim ve toplam ağırlık otomatik olarak hesaplanacaktır.<br>
                                    
                                    <strong>Adım 6:</strong> "Tabloya Ekle" butonu ile hesaplanan veriyi 
                                    malzeme listesine ekleyin.
                                </p>
                            </div>

                            <div style="background: #f7fafc; padding: 20px; border-radius: 8px; 
                                        margin-bottom: 20px;">
                                <h4 style="color: #2d3748; margin-bottom: 15px;">
                                    Tablo Yönetimi
                                </h4>
                                <p style="line-height: 1.8; color: #4a5568;">
                                    Sağ panelde görüntülenen malzeme listesi tablosunda eklediğiniz 
                                    tüm malzemeler listelenir. Tabloda her satır için düzenleme, 
                                    revizyon işaretleme ve silme işlemleri yapabilirsiniz. Satırları 
                                    sürükle-bırak yöntemi ile yeniden sıralayabilirsiniz. Revizyon 
                                    olarak işaretlenen satırlar kırmızı renkte görüntülenir ve Excel 
                                    raporunda da aynı şekilde işaretlenir.
                                </p>
                            </div>

                            <div style="background: #f7fafc; padding: 20px; border-radius: 8px; 
                                        margin-bottom: 20px;">
                                <h4 style="color: #2d3748; margin-bottom: 15px;">
                                    Excel İşlemleri
                                </h4>
                                <p style="line-height: 1.8; color: #4a5568;">
                                    Program, Excel entegrasyonu sayesinde profesyonel raporlar 
                                    oluşturmanıza olanak sağlar. "Excel Kaydet" butonu ile mevcut 
                                    tabloyu Excel formatında dışa aktarabilirsiniz. Dosya, firma 
                                    logosu, proje bilgileri, detaylı malzeme listesi ve özet raporu 
                                    ile birlikte kaydedilir. "Excel Aç" fonksiyonu ile daha önce 
                                    kaydedilmiş Excel dosyalarını programa yükleyerek düzenleme 
                                    yapabilirsiniz. Sistem, dosyadaki tüm verileri ve özel malzeme 
                                    bilgilerini otomatik olarak tanır ve yükler.
                                </p>
                            </div>
                        </div>

                        <div style="margin-bottom: 30px;">
                            <h3 style="color: #667eea; border-bottom: 2px solid #667eea; 
                                    padding-bottom: 10px; margin-bottom: 20px;">
                                Dinamik Modül Sistemi
                            </h3>
                            
                            <div style="background: #e6ffed; padding: 20px; border-radius: 8px; 
                                        margin-bottom: 20px;">
                                <h4 style="color: #2d3748; margin-bottom: 15px;">
                                    Modül Ekleme İşlemi
                                </h4>
                                <p style="line-height: 1.8; color: #4a5568; margin-bottom: 15px;">
                                    Sistem, programa yeni malzeme türleri eklemenize olanak tanır. 
                                    Bu özellik sayesinde, programı yeniden yüklemeden özel malzeme 
                                    modülleri ekleyebilirsiniz.
                                </p>
                                <p style="line-height: 1.8; color: #4a5568; margin-bottom: 15px;">
                                    <strong>Modül eklemek için:</strong>
                                </p>
                                <p style="line-height: 2; color: #4a5568; padding-left: 20px;">
                                    Menü çubuğundan "Modüller" menüsünü açın ve "Modül Ekle" 
                                    seçeneğine tıklayın. Açılan dosya seçim penceresinden yüklemek 
                                    istediğiniz modül dosyasını (.js uzantılı) seçin. Modül otomatik 
                                    olarak yüklenecek ve malzeme türü listesinde görünecektir. 
                                    Yükleme başarılı olduğunda bildirim mesajı görüntülenecektir.
                                </p>
                                <p style="line-height: 1.8; color: #4a5568; margin-top: 15px;">
                                    Yüklenen modüller, programın kullanıcı veri klasörüne kaydedilir 
                                    ve program her açıldığında otomatik olarak yüklenir. Bu sayede 
                                    modülleri tekrar yüklemenize gerek kalmaz.
                                </p>
                            </div>

                            <div style="background: #e6ffed; padding: 20px; border-radius: 8px; 
                                        margin-bottom: 20px;">
                                <h4 style="color: #2d3748; margin-bottom: 15px;">
                                    Modül Yönetimi
                                </h4>
                                <p style="line-height: 1.8; color: #4a5568;">
                                    "Modülleri Yönet" seçeneği ile yüklü modülleri görüntüleyebilir 
                                    ve yönetebilirsiniz. Bu pencerede, sistemde yüklü olan temel 
                                    modüller ve sonradan eklenen özel modüller ayrı kategorilerde 
                                    listelenir. Özel modülleri dilediğiniz zaman kaldırabilirsiniz. 
                                    Kaldırma işleminden sonra program otomatik olarak yenilenecektir.
                                </p>
                            </div>

                            <div style="background: #e6ffed; padding: 20px; border-radius: 8px;">
                                <h4 style="color: #2d3748; margin-bottom: 15px;">
                                    Modül Güncelleme
                                </h4>
                                <p style="line-height: 1.8; color: #4a5568;">
                                    Sistem, yüklü modüllerin güncellemelerini kontrol edebilir. 
                                    "Modül Güncelle" seçeneği ile mevcut modüllerin yeni versiyonları 
                                    kontrol edilir. Güncelleme mevcut ise, tek tıklama ile yeni 
                                    versiyon yüklenebilir. Güncelleme işlemi, mevcut verileri 
                                    etkilemez ve program yeniden başlatıldığında aktif olur.
                                </p>
                            </div>
                        </div>

                        <div style="margin-bottom: 30px;">
                            <h3 style="color: #667eea; border-bottom: 2px solid #667eea; 
                                    padding-bottom: 10px; margin-bottom: 20px;">
                                İpuçları ve Kısayollar
                            </h3>
                            
                            <div style="background: #fff5f5; padding: 20px; border-radius: 8px;">
                                <p style="line-height: 2; color: #4a5568;">
                                    <strong>Ctrl+N:</strong> Yeni proje başlatır ve mevcut verileri temizler<br>
                                    <strong>Ctrl+O:</strong> Excel dosyası açar<br>
                                    <strong>Ctrl+S:</strong> Mevcut tabloyu Excel olarak kaydeder<br>
                                    <strong>Ctrl+M:</strong> Yeni modül ekleme penceresini açar<br>
                                    <strong>Enter:</strong> Ölçü alanlarında Enter tuşu ile hızlı hesaplama yapabilirsiniz<br>
                                    <strong>F11:</strong> Tam ekran moduna geçiş yapar<br>
                                    <strong>Ctrl+Shift+I:</strong> Geliştirici araçlarını açar (hata ayıklama için)
                                </p>
                            </div>
                        </div>

                        <div style="margin-bottom: 30px;">
                            <h3 style="color: #667eea; border-bottom: 2px solid #667eea; 
                                    padding-bottom: 10px; margin-bottom: 20px;">
                                Sık Sorulan Sorular
                            </h3>
                            
                            <div style="background: #f7fafc; padding: 20px; border-radius: 8px; 
                                        margin-bottom: 15px;">
                                <h4 style="color: #2d3748; margin-bottom: 10px;">
                                    Excel'e kaydettiğim dosyada logo görünmüyor, ne yapmalıyım?
                                </h4>
                                <p style="line-height: 1.8; color: #4a5568;">
                                    Logo dosyasının (LOGO.png) programın assets klasöründe bulunduğundan 
                                    emin olun. Program kurulum dizinindeki assets klasörünü kontrol edin.
                                </p>
                            </div>

                            <div style="background: #f7fafc; padding: 20px; border-radius: 8px; 
                                        margin-bottom: 15px;">
                                <h4 style="color: #2d3748; margin-bottom: 10px;">
                                    Eklediğim modül çalışmıyor, ne yapmalıyım?
                                </h4>
                                <p style="line-height: 1.8; color: #4a5568;">
                                    Modül dosyasının geçerli bir JavaScript modülü olduğundan ve 
                                    BaseMaterial sınıfından türetildiğinden emin olun. Modül yazım 
                                    kurallarına uygun hazırlanmış olmalıdır. Geliştirici araçlarından 
                                    (F12) konsol mesajlarını kontrol ederek hata detaylarını 
                                    inceleyebilirsiniz.
                                </p>
                            </div>

                            <div style="background: #f7fafc; padding: 20px; border-radius: 8px; 
                                        margin-bottom: 15px;">
                                <h4 style="color: #2d3748; margin-bottom: 10px;">
                                    Dil değiştirdiğimde bazı metinler değişmiyor, neden?
                                </h4>
                                <p style="line-height: 1.8; color: #4a5568;">
                                    Özel modüller kendi dil dosyalarını içermelidir. Modül geliştiricisi 
                                    tarafından dil desteği eklenmemişse, varsayılan dilde görüntülenir. 
                                    Temel modüller için dil değişimi otomatik olarak uygulanır.
                                </p>
                            </div>

                            <div style="background: #f7fafc; padding: 20px; border-radius: 8px;">
                                <h4 style="color: #2d3748; margin-bottom: 10px;">
                                    Program verilerimi nereye kaydediyor?
                                </h4>
                                <p style="line-height: 1.8; color: #4a5568;">
                                    Program, otomatik kayıt özelliği ile verilerinizi kullanıcı 
                                    AppData klasörüne kaydeder. Windows sistemlerde bu konum genellikle 
                                    C:\\Users\\[KullanıcıAdı]\\AppData\\Roaming\\teta-kazan-material-calculator 
                                    dizinidir. Özel modüller de bu dizin altındaki custom_modules 
                                    klasörüne kaydedilir.
                                </p>
                            </div>
                        </div>

                        <div style="background: linear-gradient(135deg, #48bb78, #38a169); 
                                    color: white; padding: 20px; border-radius: 10px; 
                                    margin-bottom: 20px;">
                            <h4 style="margin: 0 0 10px 0;">Destek ve İletişim</h4>
                            <p style="margin: 0; line-height: 1.8;">
                                Teknik destek ve sorularınız için TETA Kazan teknik ekibi ile 
                                iletişime geçebilirsiniz. Program hakkında öneri ve geri 
                                bildirimlerinizi paylaşmaktan çekinmeyin.<br><br>
                                <strong>E-posta:</strong> proje@tetakazan.com.tr<br>
                                <strong>Telefon:</strong> +90 212 236 25 57
                            </p>
                        </div>

                        <div style="text-align: center; padding: 20px; color: #718096;">
                            <p>TETA Kazan - Malzeme Hesaplama Sistemi v3.1.0</p>
                            <p style="font-size: 0.9rem;">2025 TETA Kazan.</p>
                            <p style="font-size: 0.85rem; margin-top: 10px;">
                                Murat KARA tarafından geliştirilmiştir.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const helpDiv = document.createElement('div');
        helpDiv.innerHTML = helpContent;
        document.body.appendChild(helpDiv.firstElementChild);
    },

    showAddModuleDialog: async function() {
        const result = await ipcRenderer.invoke('select-module-file');
        if (!result.canceled && result.filePaths.length > 0) {
            const filePath = result.filePaths[0];
            
            if (filePath.endsWith('.zip')) {
                window.UIManager?.showNotification('ZIP dosyaları henüz desteklenmiyor', 'warning');
            } else if (filePath.endsWith('.js')) {
                await ModuleLoader.installModule(filePath);
            }
        }
    },

    showManageModulesDialog: function() {
        const modalHtml = `
            <div class="modal" style="display: block;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>📦 Yüklü Modüller</h2>
                        <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
                    </div>
                    <div class="modal-body">
                        <div style="margin-bottom: 20px;">
                            <button onclick="ApplicationController.showAddModuleDialog()" 
                                    style="padding: 10px 20px; background: #667eea; color: white; 
                                           border: none; border-radius: 6px; cursor: pointer;">
                                ➕ Yeni Modül Ekle
                            </button>
                        </div>
                        <h3>Core Modüller:</h3>
                        <ul style="list-style: none; padding: 0;">
                            ${window.MaterialRegistry.getAll().filter(m => 
                                !ModuleLoader.customModules.includes(`${m}.js`)
                            ).map(type => {
                                const MaterialClass = window.MaterialRegistry.get(type);
                                const instance = new MaterialClass();
                                return `<li style="padding: 8px; background: #f7fafc; margin: 5px 0; 
                                                   border-radius: 4px;">
                                    ✅ ${instance.getDisplayName()} (${type})
                                </li>`;
                            }).join('')}
                        </ul>
                        ${ModuleLoader.customModules.length > 0 ? `
                            <h3 style="margin-top: 20px;">Özel Modüller:</h3>
                            <ul style="list-style: none; padding: 0;">
                                ${ModuleLoader.customModules.map(moduleName => 
                                    `<li style="padding: 8px; background: #e6ffed; margin: 5px 0; 
                                               border-radius: 4px; display: flex; 
                                               justify-content: space-between; align-items: center;">
                                        <span>🔧 ${moduleName}</span>
                                        <button onclick="ModuleLoader.removeModule('${moduleName}')" 
                                                style="padding: 4px 8px; background: #f56565; 
                                                       color: white; border: none; 
                                                       border-radius: 4px; cursor: pointer;">
                                            Kaldır
                                        </button>
                                    </li>`
                                ).join('')}
                            </ul>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
        
        const modalDiv = document.createElement('div');
        modalDiv.innerHTML = modalHtml;
        document.body.appendChild(modalDiv.firstElementChild);
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