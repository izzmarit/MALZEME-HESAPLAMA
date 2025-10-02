// Kullanıcı Arayüzü Yönetimi Modülü - Modüler Sistem için Güncellenmiş
(function(window) {
    'use strict';
    
    const UIManager = {
        currentLanguage: 'tr',
        
        // Başlangıç
        initialize: function() {
            this.loadLanguage();
            this.setupEventListeners();
            this.setupLanguageSelector();
            this.overrideNotifications();
        },

        // Event listener'ları ayarla
        setupEventListeners: function() {
            // Malzeme türü değişimi
            const malzemeTuruSelect = document.getElementById('malzemeTuru');
            if (malzemeTuruSelect) {
                malzemeTuruSelect.addEventListener('change', () => {
                    this.onMaterialTypeChange();
                });
            }

            // Butonlar
            const btnHesapla = document.getElementById('btnHesapla');
            if (btnHesapla) {
                btnHesapla.addEventListener('click', () => {
                    this.calculateMaterial();
                });
            }

            const btnEkle = document.getElementById('btnEkle');
            if (btnEkle) {
                btnEkle.addEventListener('click', () => {
                    window.TableManager.addRow();
                });
            }

            const btnTemizle = document.getElementById('btnTemizle');
            if (btnTemizle) {
                btnTemizle.addEventListener('click', () => {
                    this.clearForm();
                });
            }

            const btnExcelKaydet = document.getElementById('btnExcelKaydet');
            if (btnExcelKaydet) {
                btnExcelKaydet.addEventListener('click', () => {
                    window.ExcelManager.exportToExcel();
                });
            }

            const btnExcelAc = document.getElementById('btnExcelAc');
            if (btnExcelAc) {
                btnExcelAc.addEventListener('click', () => {
                    window.ExcelManager.importFromExcel();
                });
            }

            const btnTabloTemizle = document.getElementById('btnTabloTemizle');
            if (btnTabloTemizle) {
                btnTabloTemizle.addEventListener('click', () => {
                    window.TableManager.clearTable();
                });
            }

            const btnFilter = document.getElementById('btnFilter');
            if (btnFilter) {
                btnFilter.addEventListener('click', () => {
                    this.showFilterDialog();
                });
            }

            // Modal kapatma
            const closeModal = document.querySelector('.close-modal');
            if (closeModal) {
                closeModal.addEventListener('click', () => {
                    this.closeModal();
                });
            }

            // Enter tuşu ile hesaplama
            this.setupEnterKeyBinding();
        },

        // Dil sistemini ayarla
        loadLanguage: function() {
            const savedLang = localStorage.getItem('selectedLanguage');
            if (savedLang && (savedLang === 'tr' || savedLang === 'en')) {
                this.currentLanguage = savedLang;
            }
        },

        setupLanguageSelector: function() {
            const selector = document.getElementById('languageSelect');
            if (selector) {
                selector.value = this.currentLanguage;
                selector.addEventListener('change', (e) => {
                    this.changeLanguage(e.target.value);
                });
            }
        },

        changeLanguage: function(language) {
            if (language !== 'tr' && language !== 'en') return;
            
            this.currentLanguage = language;
            localStorage.setItem('selectedLanguage', language);
            
            // Malzeme türü seçeneklerini güncelle
            this.updateMaterialTypeOptions();
            
            // Tabloyu güncelle
            if (window.TableManager) {
                window.TableManager.updateTableLanguage();
            }
            
            // Statik çevirileri güncelle
            this.updateStaticTexts();
            
            // Custom event tetikle
            const event = new CustomEvent('languageChanged', {
                detail: { language: language }
            });
            document.dispatchEvent(event);
        },

        // Statik çevirileri güncelle
        updateStaticTexts: function() {
            const staticTexts = {
                tr: {
                    'project_info': 'Proje Bilgileri',
                    'material_info': 'Malzeme Bilgileri',
                    'material_list': 'Malzeme Listesi',
                    'summary_report': 'Özet Raporu',
                    'total_parts': 'Toplam Parça',
                    'total_weight': 'Toplam Ağırlık',
                    'calculate': 'Hesapla',
                    'add_to_table': 'Tabloya Ekle',
                    'clear': 'Temizle',
                    'clear_table': 'Tabloyu Temizle',
                    'excel_save': 'Excel Kaydet',
                    'excel_open': 'Excel Aç',
                    'filter_materials': 'Filtrele'
                },
                en: {
                    'project_info': 'Project Information',
                    'material_info': 'Material Information',
                    'material_list': 'Material List',
                    'summary_report': 'Summary Report',
                    'total_parts': 'Total Parts',
                    'total_weight': 'Total Weight',
                    'calculate': 'Calculate',
                    'add_to_table': 'Add to Table',
                    'clear': 'Clear',
                    'clear_table': 'Clear Table',
                    'excel_save': 'Save Excel',
                    'excel_open': 'Open Excel',
                    'filter_materials': 'Filter'
                }
            };

            const texts = staticTexts[this.currentLanguage];
            Object.keys(texts).forEach(key => {
                const elements = document.querySelectorAll(`[data-lang="${key}"]`);
                elements.forEach(element => {
                    element.textContent = texts[key];
                });
            });
        },

        // Malzeme türü değişimi
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
            
            if (!materialType) return;
            
            // MaterialRegistry'den UI oluştur
            if (window.MaterialRegistry && window.MaterialRegistry.has(materialType)) {
                const uiHtml = window.MaterialRegistry.createUI(materialType);
                olcuAlanlari.innerHTML = uiHtml;
                
                // Su hacmi kartını malzeme türüne göre göster/gizle
                const materialClass = window.MaterialRegistry.get(materialType);
                const materialInstance = new materialClass();
                if (materialInstance.hasWaterVolume && materialInstance.hasWaterVolume()) {
                    suHacmiCard.style.display = 'flex';
                }
                
                // İlk input'a focus ver
                setTimeout(() => {
                    const firstInput = olcuAlanlari.querySelector('input:not([readonly]), select');
                    if (firstInput) {
                        firstInput.focus();
                    }
                }, 100);
            }
        },

        // Malzeme türü seçeneklerini güncelle
        updateMaterialTypeOptions: function() {
            const select = document.getElementById('malzemeTuru');
            if (!select || !window.MaterialRegistry) return;
            
            const currentValue = select.value;
            
            // Seçenekleri temizle (ilk seçenek hariç)
            while (select.options.length > 1) {
                select.remove(1);
            }
            
            // MaterialRegistry'den seçenekleri al ve ekle
            const materials = window.MaterialRegistry.getAll();
            materials.forEach(materialType => {
                const MaterialClass = window.MaterialRegistry.get(materialType);
                const instance = new MaterialClass();
                const texts = instance.getTexts();
                
                const option = document.createElement('option');
                option.value = materialType;
                option.textContent = texts[this.currentLanguage]?.display_name || instance.getDisplayName();
                select.appendChild(option);
            });
            
            // Önceki değeri geri yükle
            if (currentValue) {
                select.value = currentValue;
            }
        },

        // Malzeme hesaplama
        calculateMaterial: function() {
            const materialType = document.getElementById('malzemeTuru').value;
            
            if (!materialType) {
                this.showNotification('Lütfen malzeme türü seçin!', 'warning');
                return false;
            }

            if (!window.MaterialRegistry || !window.MaterialRegistry.has(materialType)) {
                this.showNotification('Malzeme türü bulunamadı!', 'error');
                return false;
            }

            try {
                // Form verilerini topla
                const formData = this.collectFormData();
                
                // Malzeme türü ile hesaplama yap
                const calculation = window.MaterialRegistry.calculate(materialType, formData);
                
                if (!calculation) {
                    return false;
                }

                // Sonuçları güncelle
                this.updateResults(calculation);
                
                return true;
                
            } catch (error) {
                console.error('Hesaplama hatası:', error);
                this.showNotification('Hesaplama sırasında hata oluştu: ' + error.message, 'error');
                return false;
            }
        },

        // Form verilerini topla
        collectFormData: function() {
            const formData = {
                malzemeTuru: document.getElementById('malzemeTuru').value,
                malzemeCinsi: document.getElementById('malzemeCinsi').value,
                adet: parseFloat(document.getElementById('adet').value) || 1,
                heatNo: document.getElementById('heatNo').value || ''
            };

            // Tüm input ve select elementlerini topla
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

        // Sonuçları güncelle
        updateResults: function(calculation) {
            // Birim ağırlık
            document.getElementById('birimAgirlik').textContent = calculation.birimAgirlik.toFixed(2);
            
            // Toplam ağırlık
            document.getElementById('toplamAgirlik').textContent = calculation.toplamAgirlik.toFixed(2);
            
            // Su hacmi (varsa)
            if (calculation.suHacmi !== undefined && calculation.suHacmi !== null) {
                document.getElementById('suHacmi').textContent = calculation.suHacmi.toFixed(2);
                document.getElementById('suHacmiCard').style.display = 'flex';
            }

            // Hesaplama kartlarını göster
            this.showResultCards();
        },

        // Hesaplama kartlarını animasyonlu göster
        showResultCards: function() {
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

        // Sonuçları temizle
        clearResults: function() {
            document.getElementById('birimAgirlik').textContent = '0.00';
            document.getElementById('toplamAgirlik').textContent = '0.00';
            document.getElementById('suHacmi').textContent = '0.00';
            document.getElementById('suHacmiCard').style.display = 'none';
        },

        // Formu temizle
        clearForm: function() {
            // Ölçü alanlarını temizle
            const olcuAlanlari = document.getElementById('olcuAlanlari');
            const inputs = olcuAlanlari.querySelectorAll('input');
            inputs.forEach(input => {
                input.value = input.type === 'number' ? '' : '';
            });

            const selects = olcuAlanlari.querySelectorAll('select');
            selects.forEach(select => {
                select.selectedIndex = 0;
            });

            // Adet alanını 1'e sıfırla
            document.getElementById('adet').value = '1';
            
            // Heat No temizle
            document.getElementById('heatNo').value = '';
            
            // Sonuçları temizle
            this.clearResults();
            
            // İlk input'a focus ver
            setTimeout(() => {
                const firstInput = olcuAlanlari.querySelector('input:not([readonly]), select');
                if (firstInput) {
                    firstInput.focus();
                }
            }, 100);
        },

        // Enter tuşu ile hesaplama
        setupEnterKeyBinding: function() {
            document.addEventListener('keydown', (e) => {
                if (e.key !== 'Enter') return;
                
                const activeElement = document.activeElement;
                if (!activeElement || activeElement.tagName !== 'INPUT') return;
                
                const projeAlanlari = ['projeAdi', 'siparisNo', 'revizyonNo', 
                                    'resimAciklamasi', 'resimNo', 'hazirlayan', 'kontrol'];
                
                if (projeAlanlari.includes(activeElement.id)) return;
                
                const malzemeTuru = document.getElementById('malzemeTuru').value;
                if (!malzemeTuru) return;
                
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

        // Filtreleme dialogu
        showFilterDialog: function() {
            const tableData = window.TableManager.getTableData();
            
            if (tableData.length === 0) {
                this.showNotification('Filtrelenecek veri bulunmuyor', 'warning');
                return;
            }

            // Malzeme türlerini al
            const materialTypes = [...new Set(tableData.map(row => row.originalType))];
            
            // Filter seçenekleri oluştur
            let filterOptions = '<option value="">Tüm Malzemeler</option>';
            materialTypes.forEach(type => {
                if (window.MaterialRegistry && window.MaterialRegistry.has(type)) {
                    const MaterialClass = window.MaterialRegistry.get(type);
                    const instance = new MaterialClass();
                    const texts = instance.getTexts();
                    const displayName = texts[this.currentLanguage]?.display_name || instance.getDisplayName();
                    filterOptions += `<option value="${type}">${displayName}</option>`;
                }
            });

            const content = `
                <div class="filter-container">
                    <h3>Malzeme Filtreleme</h3>
                    <div class="form-group">
                        <label for="filterMaterialType">Malzeme Türü</label>
                        <select id="filterMaterialType">
                            ${filterOptions}
                        </select>
                    </div>
                    <div class="modal-actions">
                        <button onclick="UIManager.applyFilter()" class="btn btn-primary">Filtrele</button>
                        <button onclick="UIManager.closeModal()" class="btn btn-secondary">İptal</button>
                    </div>
                </div>
            `;
            
            this.openModal(content, 'Malzeme Filtreleme');
        },

        // Filtreyi uygula
        applyFilter: function() {
            const filterType = document.getElementById('filterMaterialType').value;
            const tableData = window.TableManager.getTableData();
            
            let filteredData;
            if (!filterType) {
                filteredData = tableData;
            } else {
                filteredData = tableData.filter(row => row.originalType === filterType);
            }

            if (filteredData.length === 0) {
                this.showNotification('Filtre kriterlerine uygun veri bulunamadı', 'warning');
                return;
            }

            // Filtrelenmiş sonuçları yeni sekmede göster
            this.showFilteredResults(filteredData, filterType || 'Tüm Malzemeler');
            this.closeModal();
        },

        // Filtrelenmiş sonuçları göster
        showFilteredResults: function(filteredData, filterType) {
            // Yeni sekme oluştur
            if (window.TabManager) {
                const tabId = window.TabManager.createNewTab({
                    title: `Filtre: ${filterType}`,
                    icon: '🔍',
                    type: 'filtered',
                    data: { filteredData, filterType }
                });
            }
        },

        // Modal aç
        openModal: function(content, title = 'Dialog') {
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

        // Bildirim göster
        showNotification: function(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.innerHTML = `
                <div class="notification-content">
                    <span class="notification-icon">${this.getNotificationIcon(type)}</span>
                    <span class="notification-message">${message}</span>
                </div>
            `;
                
            notification.style.cssText = `
                position: fixed; top: 20px; right: 20px; padding: 15px 20px;
                border-radius: 8px; background: ${this.getNotificationColor(type)};
                color: white; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 9999; animation: slideIn 0.3s ease;
                display: flex; align-items: center; gap: 10px; font-weight: 500;
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        },

        getNotificationIcon: function(type) {
            const icons = {
                success: '✅',
                error: '❌',
                warning: '⚠️',
                info: 'ℹ️'
            };
            return icons[type] || icons.info;
        },

        getNotificationColor: function(type) {
            const colors = {
                success: '#48bb78',
                error: '#f56565',
                warning: '#ed8936',
                info: '#4299e1'
            };
            return colors[type] || colors.info;
        },

        // Bildirim sistemlerini override et
        overrideNotifications: function() {
            if (window.TableManager) {
                window.TableManager.showNotification = (msg, type) => this.showNotification(msg, type);
            }
            if (window.ExcelManager) {
                window.ExcelManager.showNotification = (msg, type) => this.showNotification(msg, type);
            }
        }
    };

    // Modülü window objesine bağla
    window.UIManager = UIManager;

})(window);