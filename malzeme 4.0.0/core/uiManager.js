(function(window) {
    'use strict';
    
    const UIManager = {
        activeTabId: 'main-tab',
        tabCounter: 1,
        modalStack: [],
        lastFocusedElement: null,
        
        initialize() {
            this.setupTabControls();
            this.setupModalHandlers();
            this.loadSavedLanguage();
            this.setupFocusTracking();
            this.currentFilteredData = null;
            this.activeFilteredTabs = new Map();
        },

        setupTabControls() {
            const btnNewTab = document.getElementById('btnNewTab');
            if (btnNewTab) {
                btnNewTab.addEventListener('click', () => this.createNewTab());
            }
            
            // Tab click handlers
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('tab-close')) {
                    const tab = e.target.closest('.tab-item');
                    if (tab) {
                        this.closeTab(tab.dataset.tab);
                    }
                } else if (e.target.closest('.tab-item')) {
                    const tab = e.target.closest('.tab-item');
                    this.switchTab(tab.dataset.tab);
                }
            });
        },

        setupModalHandlers() {
            // ESC tuşu ile modal kapatma
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.modalStack.length > 0) {
                    const lastModal = this.modalStack[this.modalStack.length - 1];
                    if (lastModal && lastModal.closeable !== false) {
                        this.closeModal();
                    }
                }
            });
        },

        setupFocusTracking() {
            document.addEventListener('focusin', (e) => {
                if (e.target.matches('input, select, textarea')) {
                    this.lastFocusedElement = e.target;
                }
            });
        },

        createNewTab(title = 'Yeni Sekme', content = null) {
            this.tabCounter++;
            const tabId = `tab-${this.tabCounter}`;
            
            const tabList = document.querySelector('.tab-list');
            const tabItem = document.createElement('div');
            tabItem.className = 'tab-item';
            tabItem.dataset.tab = tabId;
            tabItem.innerHTML = `
                <span class="tab-icon">📄</span>
                <span class="tab-title">${title}</span>
                <span class="tab-close">×</span>
            `;
            
            tabList.appendChild(tabItem);
            
            const contentContainer = document.querySelector('.tab-content-container');
            const tabContent = document.createElement('div');
            tabContent.className = 'tab-content';
            tabContent.id = tabId;
            
            if (content) {
                tabContent.innerHTML = content;
            } else {
                tabContent.innerHTML = '<div class="app-container"><p style="padding: 50px; text-align: center;">Boş sekme</p></div>';
            }
            
            contentContainer.appendChild(tabContent);
            this.switchTab(tabId);
            
            return tabId;
        },

        switchTab(tabId) {
            document.querySelectorAll('.tab-item').forEach(tab => {
                tab.classList.remove('active');
            });
            
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            const selectedTab = document.querySelector(`[data-tab="${tabId}"]`);
            const selectedContent = document.getElementById(tabId);
            
            if (selectedTab) selectedTab.classList.add('active');
            if (selectedContent) selectedContent.classList.add('active');
            
            this.activeTabId = tabId;
        },

        closeTab(tabId) {
            if (tabId === 'main-tab') return;
            
            this.unregisterFilteredTab(tabId);
            
            const tab = document.querySelector(`[data-tab="${tabId}"]`);
            const content = document.getElementById(tabId);
            
            if (tab) tab.remove();
            if (content) content.remove();
            
            this.switchTab('main-tab');
        },

        showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            
            const icons = {
                success: '✅',
                error: '❌',
                warning: '⚠️',
                info: 'ℹ️'
            };
            
            const colors = {
                success: '#48bb78',
                error: '#f56565',
                warning: '#ed8936',
                info: '#4299e1'
            };
            
            notification.innerHTML = `
                <div class="notification-content">
                    <span class="notification-icon">${icons[type]}</span>
                    <span class="notification-message">${message}</span>
                </div>
            `;
            
            notification.style.cssText = `
                position: fixed; top: 20px; right: 20px; padding: 15px 20px;
                border-radius: 8px; background: ${colors[type]};
                color: white; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 9999; animation: slideIn 0.3s ease;
                display: flex; align-items: center; gap: 10px; font-weight: 500;
                min-width: 250px; max-width: 500px;
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        },

        confirmAction(message, onConfirm, onCancel = null) {
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
            
            // Focus management için mevcut elementi sakla
            const previousFocus = document.activeElement;
            
            const yesBtn = modal.querySelector('.custom-confirm-yes');
            const noBtn = modal.querySelector('.custom-confirm-no');
            
            // Modalı stack'e ekle
            this.modalStack.push({
                element: modal,
                closeable: true,
                previousFocus: previousFocus
            });
            
            const closeModal = () => {
                modal.remove();
                this.modalStack.pop();
                
                // Focus'u geri yükle
                if (previousFocus && document.body.contains(previousFocus)) {
                    setTimeout(() => previousFocus.focus(), 100);
                } else {
                    this.restoreFocus();
                }
            };
            
            yesBtn.onclick = () => {
                closeModal();
                if (onConfirm) {
                    setTimeout(onConfirm, 50);
                }
            };
            
            noBtn.onclick = () => {
                closeModal();
                if (onCancel) {
                    setTimeout(onCancel, 50);
                }
            };
            
            // İlk butona focus ver
            setTimeout(() => yesBtn.focus(), 100);
        },

        showModal(title, content, options = {}) {
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.style.display = 'block';
            
            const modalContentClass = options.width ? 'modal-content wide' : 'modal-content';
            
            modal.innerHTML = `
                <div class="${modalContentClass}" ${options.width ? `style="width: ${options.width}; max-width: ${options.maxWidth || '600px'}"` : ''}>
                    <div class="modal-header">
                        <h2>${title}</h2>
                        <span class="close-modal">&times;</span>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            const previousFocus = document.activeElement;
            
            this.modalStack.push({
                element: modal,
                closeable: options.closeable !== false,
                previousFocus: previousFocus
            });
            
            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.onclick = () => this.closeModal();
            
            // Modal dışına tıklama ile kapatma
            modal.onclick = (e) => {
                if (e.target === modal && options.closeable !== false) {
                    this.closeModal();
                }
            };
            
            // İlk input'a focus ver
            setTimeout(() => {
                const firstInput = modal.querySelector('input, select, button');
                if (firstInput) firstInput.focus();
            }, 100);
        },

        closeModal() {
            if (this.modalStack.length === 0) return;
            
            const modalInfo = this.modalStack.pop();
            if (modalInfo && modalInfo.element) {
                modalInfo.element.remove();
                
                // Focus'u geri yükle
                if (modalInfo.previousFocus && document.body.contains(modalInfo.previousFocus)) {
                    setTimeout(() => modalInfo.previousFocus.focus(), 100);
                } else {
                    this.restoreFocus();
                }
            }
        },

        restoreFocus() {
            if (this.lastFocusedElement && document.body.contains(this.lastFocusedElement)) {
                this.lastFocusedElement.focus();
            } else {
                // İlk kullanılabilir input'a focus ver
                const firstInput = document.querySelector('#olcuAlanlari input:not([disabled]), #olcuAlanlari select:not([disabled])');
                if (firstInput) {
                    firstInput.focus();
                }
            }
        },

        showFilterDialog() {
            const tableData = window.TableManager?.getTableData();
            
            if (!tableData || tableData.length === 0) {
                this.showNotification('Filtrelenecek veri yok', 'warning');
                return;
            }

            const materialTypes = [...new Set(tableData.map(row => row.originalType))];
            
            let checkboxesHtml = '';
            materialTypes.forEach(type => {
                if (window.MaterialRegistry.has(type)) {
                    const MaterialClass = window.MaterialRegistry.get(type);
                    const instance = new MaterialClass();
                    checkboxesHtml += `
                        <div style="display: flex; align-items: center; padding: 8px; 
                                    border-bottom: 1px solid #e2e8f0; transition: background 0.2s;">
                            <input type="checkbox" 
                                id="filter_${type}" 
                                value="${type}" 
                                class="filter-checkbox"
                                style="width: 18px; height: 18px; cursor: pointer; margin-right: 12px;">
                            <label for="filter_${type}" 
                                style="cursor: pointer; flex: 1; font-size: 0.95rem; color: #2d3748;">
                                ${instance.getDisplayName()}
                            </label>
                        </div>
                    `;
                }
            });

            const content = `
                <div style="max-height: 400px; overflow-y: auto; margin-bottom: 20px;">
                    <div style="background: #f7fafc; padding: 12px; border-radius: 6px; 
                                margin-bottom: 15px; border: 2px solid #e2e8f0;">
                        <div style="display: flex; gap: 10px; justify-content: space-between;">
                            <button onclick="UIManager.selectAllFilters()" 
                                    style="flex: 1; padding: 8px 15px; background: #667eea; 
                                        color: white; border: none; border-radius: 4px; 
                                        cursor: pointer; font-size: 0.85rem; font-weight: 600;">
                                ✓ Tümünü Seç
                            </button>
                            <button onclick="UIManager.clearAllFilters()" 
                                    style="flex: 1; padding: 8px 15px; background: #718096; 
                                        color: white; border: none; border-radius: 4px; 
                                        cursor: pointer; font-size: 0.85rem; font-weight: 600;">
                                ✗ Tümünü Temizle
                            </button>
                        </div>
                    </div>
                    
                    <div id="filterCheckboxContainer" 
                        style="border: 2px solid #e2e8f0; border-radius: 6px; 
                                background: white;">
                        ${checkboxesHtml}
                    </div>
                </div>
                
                <div style="display: flex; gap: 10px;">
                    <button onclick="UIManager.applyMultipleFilter()" 
                            style="flex: 1; padding: 12px 20px; background: #667eea; 
                                color: white; border: none; border-radius: 6px; 
                                cursor: pointer; font-weight: 600; font-size: 0.95rem;">
                        🔍 Filtrele ve Göster
                    </button>
                    <button onclick="UIManager.filterAndExportMultiple()" 
                            style="flex: 1; padding: 12px 20px; background: #107c41; 
                                color: white; border: none; border-radius: 6px; 
                                cursor: pointer; font-weight: 600; font-size: 0.95rem;">
                        💾 Excel'e Aktar
                    </button>
                    <button onclick="UIManager.closeModal()" 
                            style="padding: 12px 20px; background: #718096; 
                                color: white; border: none; border-radius: 6px; 
                                cursor: pointer; font-weight: 600; font-size: 0.95rem;">
                        İptal
                    </button>
                </div>
                
                <style>
                    #filterCheckboxContainer > div:hover {
                        background: #f7fafc;
                    }
                </style>
            `;

            this.showModal('Malzeme Filtreleme', content);
        },

        selectAllFilters() {
            const checkboxes = document.querySelectorAll('.filter-checkbox');
            checkboxes.forEach(checkbox => checkbox.checked = true);
        },

        clearAllFilters() {
            const checkboxes = document.querySelectorAll('.filter-checkbox');
            checkboxes.forEach(checkbox => checkbox.checked = false);
        },

        getSelectedFilterValues() {
            const checkboxes = document.querySelectorAll('.filter-checkbox:checked');
            const selectedValues = Array.from(checkboxes).map(cb => cb.value);
            
            if (selectedValues.length === 0) {
                this.showNotification('Lütfen en az bir malzeme türü seçin', 'warning');
                return null;
            }
            
            return selectedValues;
        },

        applyMultipleFilter() {
            const selectedValues = this.getSelectedFilterValues();
            if (!selectedValues) return;
            
            const tableData = window.TableManager?.getTableData();
            
            const filteredData = tableData.filter(row => 
                selectedValues.includes(row.originalType)
            );
            
            if (filteredData.length === 0) {
                this.showNotification('Seçilen filtreye uygun veri bulunamadı', 'warning');
                this.closeModal();
                return;
            }
            
            const filterNames = selectedValues.map(type => {
                const MaterialClass = window.MaterialRegistry.get(type);
                const instance = new MaterialClass();
                return instance.getDisplayName();
            });
            
            const filterDisplayName = filterNames.length === 1 
                ? filterNames[0]
                : `${filterNames.length} Malzeme Türü`;

            this.showFilteredDataInNewTab(filteredData, filterDisplayName, filterNames, selectedValues);
            this.closeModal();
        },

        filterAndExportMultiple() {
            const selectedValues = this.getSelectedFilterValues();
            if (!selectedValues) return;
            
            const tableData = window.TableManager?.getTableData();
            
            const filteredData = tableData.filter(row => 
                selectedValues.includes(row.originalType)
            );
            
            if (filteredData.length === 0) {
                this.showNotification('Seçilen filtreye uygun veri bulunamadı', 'warning');
                this.closeModal();
                return;
            }
            
            const filterNames = selectedValues.map(type => {
                const MaterialClass = window.MaterialRegistry.get(type);
                const instance = new MaterialClass();
                return instance.getDisplayName();
            });
            
            const filterDisplayName = filterNames.length === 1 
                ? filterNames[0]
                : `${filterNames.length} Malzeme Türü`;

            this.closeModal();
            this.exportFilteredData(filteredData, filterDisplayName);
        },

        async exportFilteredData(filteredData, filterName) {
            if (!filteredData || filteredData.length === 0) {
                this.showNotification('Aktarılacak veri bulunmamaktadır', 'warning');
                return;
            }
            
            const originalTableData = window.TableManager.tableData;
            const originalPNoCounter = window.TableManager.pNoCounter;
            
            try {
                window.TableManager.tableData = filteredData;
                window.TableManager.pNoCounter = filteredData.length + 1;
                
                await window.ExcelManager.exportToExcel();
                
            } catch (error) {
                console.error('Excel export hatası:', error);
                this.showNotification('Excel aktarımında hata oluştu', 'error');
            } finally {
                window.TableManager.tableData = originalTableData;
                window.TableManager.pNoCounter = originalPNoCounter;
            }
        },

        async exportCurrentFilteredTab() {
            if (!this.currentFilteredData) {
                this.showNotification('Filtrelenmiş veri bulunamadı', 'error');
                return;
            }
            
            await this.exportFilteredData(
                this.currentFilteredData.data, 
                this.currentFilteredData.filterName
            );
        },

        showFilteredDataInNewTab(filteredData, filterName, filterNames = [], selectedTypes = []) {
            let toplamAgirlik = 0;
            let toplamParca = 0;
            let toplamSuHacmi = 0;
            
            filteredData.forEach(row => {
                toplamParca += parseFloat(row.adet) || 0;
                toplamAgirlik += parseFloat(row.toplamAgirlik) || 0;
                toplamSuHacmi += row.suHacmi !== '-' ? parseFloat(row.suHacmi) || 0 : 0;
            });

            const filterListHtml = filterNames.length > 0 
                ? `<div style="margin-top: 10px; padding: 10px; background: #edf2f7; 
                            border-radius: 6px; font-size: 0.9rem;">
                    <strong>Seçilen Malzemeler:</strong> ${filterNames.join(', ')}
                </div>`
                : '';

            const content = `
                <div class="app-container">
                    <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                            <div style="flex: 1;">
                                <h2 style="color: #667eea; margin: 0;">
                                    🔍 Filtrelenmiş Liste: ${filterName}
                                </h2>
                                ${filterListHtml}
                                <div style="margin-top: 8px; padding: 6px 10px; background: #48bb78; 
                                            color: white; border-radius: 4px; font-size: 0.8rem; 
                                            display: inline-block;">
                                    ✓ Otomatik Güncelleme Aktif
                                </div>
                            </div>
                            <button onclick="window.UIManager.exportCurrentFilteredTab()" 
                                    style="padding: 10px 20px; background: #107c41; color: white; 
                                        border: none; border-radius: 6px; cursor: pointer; 
                                        font-weight: 600; display: flex; align-items: center; gap: 8px;
                                        white-space: nowrap;">
                                💾 Excel'e Aktar
                            </button>
                        </div>
                        
                        <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                            <div style="flex: 1; background: linear-gradient(135deg, #667eea, #764ba2); 
                                        color: white; padding: 15px; border-radius: 8px;">
                                <div style="font-size: 14px; opacity: 0.9;">Toplam Parça</div>
                                <div style="font-size: 24px; font-weight: bold;">${toplamParca}</div>
                            </div>
                            <div style="flex: 1; background: linear-gradient(135deg, #48bb78, #38a169); 
                                        color: white; padding: 15px; border-radius: 8px;">
                                <div style="font-size: 14px; opacity: 0.9;">Toplam Ağırlık</div>
                                <div style="font-size: 24px; font-weight: bold;">${toplamAgirlik.toFixed(2)} kg</div>
                            </div>
                            ${toplamSuHacmi > 0 ? `
                            <div style="flex: 1; background: linear-gradient(135deg, #4299e1, #3182ce); 
                                        color: white; padding: 15px; border-radius: 8px;">
                                <div style="font-size: 14px; opacity: 0.9;">Toplam Su Hacmi</div>
                                <div style="font-size: 24px; font-weight: bold;">${toplamSuHacmi.toFixed(2)} L</div>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px; overflow-x: auto;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <thead>
                                <tr style="background: #f7fafc;">
                                    <th style="padding: 10px; border-bottom: 2px solid #e2e8f0; text-align: left;">P.No</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #e2e8f0; text-align: left;">Adet</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #e2e8f0; text-align: left;">Malzeme Türü</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #e2e8f0; text-align: left;">Malzeme Cinsi</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #e2e8f0; text-align: left;">Ölçüler</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #e2e8f0; text-align: left;">Standart</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #e2e8f0; text-align: left;">Su Hacmi (L)</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #e2e8f0; text-align: left;">Birim Ağırlık (kg)</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #e2e8f0; text-align: left;">Toplam Ağırlık (kg)</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #e2e8f0; text-align: left;">Açıklama</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${filteredData.map(row => {
                                    const suHacmiDisplay = row.suHacmi !== '-' ? parseFloat(row.suHacmi).toFixed(2) : '-';
                                    const rowStyle = row.isRevision ? 'color: #FF0000;' : '';
                                    return `
                                    <tr style="${rowStyle}">
                                        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${row.pNo}</td>
                                        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${row.adet}</td>
                                        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${row.malzemeTuru}</td>
                                        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${row.malzemeCinsi}</td>
                                        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${row.olculer}</td>
                                        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${row.enNormu}</td>
                                        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${suHacmiDisplay}</td>
                                        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${row.birimAgirlik}</td>
                                        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${row.toplamAgirlik}</td>
                                        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${row.heatNo}</td>
                                    </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;

            const tabTitle = filterNames.length > 1 
                ? `Filtre: ${filterNames.length} Malzeme`
                : `Filtre: ${filterName}`;
                
            const newTabId = this.createNewTab(tabTitle, content);
            
            this.currentFilteredData = {
                tabId: newTabId,
                data: filteredData,
                filterName: filterName,
                filterNames: filterNames,
                selectedTypes: selectedTypes
            };
            
            this.registerFilteredTab(newTabId, {
                data: filteredData,
                filterName: filterName,
                filterNames: filterNames,
                selectedTypes: selectedTypes
            });
        },

        loadSavedLanguage() {
            const savedLang = localStorage.getItem('selectedLanguage') || 'tr';
            const langSelect = document.getElementById('languageSelect');
            if (langSelect) {
                langSelect.value = savedLang;
            }
        },

        showHelp() {
            const content = `
                <div style="max-height: 60vh; overflow-y: auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #667eea, #764ba2); 
                                color: white; padding: 20px; border-radius: 10px; 
                                margin-bottom: 30px;">
                        <h3 style="margin: 0; font-size: 1.3rem;">Versiyon 4.0.0</h3>
                        <p style="margin: 10px 0 0 0; opacity: 0.95;">
                            Tam Modüler Yapı ile Malzeme Hesaplama Sistemi
                        </p>
                    </div>

                    <div style="margin-bottom: 30px;">
                        <h3 style="color: #667eea; margin-bottom: 15px;">Sistem Özellikleri</h3>
                        <p style="line-height: 1.8; margin-bottom: 15px;">
                            TETA Malzeme Hesaplama Sistemi v4.0, tamamen modüler yapıya sahip bir malzeme 
                            hesaplama yazılımıdır. Sistem başlangıçta hiçbir malzeme modülü içermez. 
                            Kullanıcılar ihtiyaçlarına göre modül ekleyerek programı özelleştirebilirler.
                        </p>
                    </div>

                    <div style="margin-bottom: 30px;">
                        <h3 style="color: #667eea; margin-bottom: 15px;">Modül Yükleme</h3>
                        <p style="line-height: 1.8;">
                            Menüden "Modüller > Modül Ekle" seçeneğini kullanarak .js uzantılı modül 
                            dosyalarını yükleyebilirsiniz. Yüklenen modüller otomatik olarak malzeme 
                            türü listesinde görünecektir. Her modül kendi hesaplama mantığını, dil 
                            desteğini ve özelliklerini içerir.
                        </p>
                    </div>

                    <div style="margin-bottom: 30px;">
                        <h3 style="color: #667eea; margin-bottom: 15px;">Excel İşlemleri</h3>
                        <p style="line-height: 1.8;">
                            Program, Excel entegrasyonu ile profesyonel raporlar oluşturur. 
                            Excel dosyaları açılıp düzenlenebilir. Tüm formatlama ve sayfa yapısı 
                            korunur. Metadata desteği ile modül bilgileri de kaydedilir.
                        </p>
                    </div>

                    <div style="margin-bottom: 30px;">
                        <h3 style="color: #667eea; margin-bottom: 15px;">Kısayollar</h3>
                        <div style="background: #f7fafc; padding: 15px; border-radius: 8px;">
                            <p style="margin: 5px 0;"><strong>Ctrl+N:</strong> Yeni proje</p>
                            <p style="margin: 5px 0;"><strong>Ctrl+O:</strong> Excel aç</p>
                            <p style="margin: 5px 0;"><strong>Ctrl+S:</strong> Excel kaydet</p>
                            <p style="margin: 5px 0;"><strong>Ctrl+M:</strong> Modül ekle</p>
                            <p style="margin: 5px 0;"><strong>Enter:</strong> Hızlı hesaplama</p>
                            <p style="margin: 5px 0;"><strong>ESC:</strong> Form temizle / Modal kapat</p>
                            <p style="margin: 5px 0;"><strong>F11:</strong> Tam ekran</p>
                        </div>
                    </div>

                    <div style="text-align: center; padding: 20px; color: #718096;">
                        <p>TETA Malzeme Hesaplama Sistemi v4.0.0</p>
                        <p style="font-size: 0.9rem;">© 2025 TETA Kazan</p>
                        <p style="font-size: 0.85rem; margin-top: 10px;">
                            Geliştirici: Murat KARA
                        </p>
                    </div>
                </div>
            `;
            
            this.showModal('Yardım ve Kullanım Kılavuzu', content, { closeable: true });
        },

        showMaterialsInfo() {
            if (!window.MaterialDatabase) {
                this.showNotification('Malzeme veritabanı yüklenemedi', 'error');
                return;
            }
            
            const content = window.MaterialDatabase.generateHTML();
            
            this.showModal('Malzeme Bilgi Veritabanı', content, { 
                closeable: true,
                width: '90%',
                maxWidth: '1200px'
            });
        },

        registerFilteredTab(tabId, filterData) {
            this.activeFilteredTabs.set(tabId, {
                filterData: filterData,
                data: filterData.data,
                filterName: filterData.filterName,
                filterNames: filterData.filterNames || [],
                selectedTypes: filterData.selectedTypes || []
            });
            console.log(`Filtrelenmiş sekme kaydedildi: ${tabId}`, this.activeFilteredTabs.size);
        },

        unregisterFilteredTab(tabId) {
            if (this.activeFilteredTabs.has(tabId)) {
                this.activeFilteredTabs.delete(tabId);
                console.log(`Filtrelenmiş sekme kaydı silindi: ${tabId}`, this.activeFilteredTabs.size);
            }
        },

        refreshAllFilteredTabs() {
            if (this.activeFilteredTabs.size === 0) {
                return;
            }
            
            console.log('Tüm filtrelenmiş sekmeler güncelleniyor...', this.activeFilteredTabs.size);
            
            const currentTableData = window.TableManager?.getTableData();
            if (!currentTableData) return;
            
            this.activeFilteredTabs.forEach((tabInfo, tabId) => {
                const tabElement = document.getElementById(tabId);
                if (!tabElement) {
                    this.unregisterFilteredTab(tabId);
                    return;
                }
                
                const selectedTypes = tabInfo.selectedTypes || [];
                const newFilteredData = currentTableData.filter(row => 
                    selectedTypes.includes(row.originalType)
                );
                
                this.updateFilteredTabContent(tabId, newFilteredData, tabInfo.filterName, tabInfo.filterNames);
            });
        },

        updateFilteredTabContent(tabId, filteredData, filterName, filterNames) {
            const tabElement = document.getElementById(tabId);
            if (!tabElement) return;
            
            let toplamAgirlik = 0;
            let toplamParca = 0;
            let toplamSuHacmi = 0;
            
            filteredData.forEach(row => {
                toplamParca += parseFloat(row.adet) || 0;
                toplamAgirlik += parseFloat(row.toplamAgirlik) || 0;
                toplamSuHacmi += row.suHacmi !== '-' ? parseFloat(row.suHacmi) || 0 : 0;
            });

            const filterListHtml = filterNames && filterNames.length > 0 
                ? `<div style="margin-top: 10px; padding: 10px; background: #edf2f7; 
                            border-radius: 6px; font-size: 0.9rem;">
                    <strong>Seçilen Malzemeler:</strong> ${filterNames.join(', ')}
                </div>`
                : '';

            const content = `
                <div class="app-container">
                    <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                            <div style="flex: 1;">
                                <h2 style="color: #667eea; margin: 0;">
                                    🔍 Filtrelenmiş Liste: ${filterName}
                                </h2>
                                ${filterListHtml}
                                <div style="margin-top: 8px; padding: 6px 10px; background: #48bb78; 
                                            color: white; border-radius: 4px; font-size: 0.8rem; 
                                            display: inline-block;">
                                    ✓ Otomatik Güncelleme Aktif
                                </div>
                            </div>
                            <button onclick="window.UIManager.exportFilteredTabData('${tabId}')" 
                                    style="padding: 10px 20px; background: #107c41; color: white; 
                                        border: none; border-radius: 6px; cursor: pointer; 
                                        font-weight: 600; display: flex; align-items: center; gap: 8px;
                                        white-space: nowrap;">
                                💾 Excel'e Aktar
                            </button>
                        </div>
                        
                        <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                            <div style="flex: 1; background: linear-gradient(135deg, #667eea, #764ba2); 
                                        color: white; padding: 15px; border-radius: 8px;">
                                <div style="font-size: 14px; opacity: 0.9;">Toplam Parça</div>
                                <div style="font-size: 24px; font-weight: bold;">${toplamParca}</div>
                            </div>
                            <div style="flex: 1; background: linear-gradient(135deg, #48bb78, #38a169); 
                                        color: white; padding: 15px; border-radius: 8px;">
                                <div style="font-size: 14px; opacity: 0.9;">Toplam Ağırlık</div>
                                <div style="font-size: 24px; font-weight: bold;">${toplamAgirlik.toFixed(2)} kg</div>
                            </div>
                            ${toplamSuHacmi > 0 ? `
                            <div style="flex: 1; background: linear-gradient(135deg, #4299e1, #3182ce); 
                                        color: white; padding: 15px; border-radius: 8px;">
                                <div style="font-size: 14px; opacity: 0.9;">Toplam Su Hacmi</div>
                                <div style="font-size: 24px; font-weight: bold;">${toplamSuHacmi.toFixed(2)} L</div>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px; overflow-x: auto;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <thead>
                                <tr style="background: #f7fafc;">
                                    <th style="padding: 10px; border-bottom: 2px solid #e2e8f0; text-align: left;">P.No</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #e2e8f0; text-align: left;">Adet</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #e2e8f0; text-align: left;">Malzeme Türü</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #e2e8f0; text-align: left;">Malzeme Cinsi</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #e2e8f0; text-align: left;">Ölçüler</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #e2e8f0; text-align: left;">Standart</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #e2e8f0; text-align: left;">Su Hacmi (L)</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #e2e8f0; text-align: left;">Birim Ağırlık (kg)</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #e2e8f0; text-align: left;">Toplam Ağırlık (kg)</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #e2e8f0; text-align: left;">Açıklama</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${filteredData.length > 0 ? filteredData.map(row => {
                                    const suHacmiDisplay = row.suHacmi !== '-' ? parseFloat(row.suHacmi).toFixed(2) : '-';
                                    const rowStyle = row.isRevision ? 'color: #FF0000;' : '';
                                    return `
                                    <tr style="${rowStyle}">
                                        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${row.pNo}</td>
                                        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${row.adet}</td>
                                        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${row.malzemeTuru}</td>
                                        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${row.malzemeCinsi}</td>
                                        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${row.olculer}</td>
                                        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${row.enNormu}</td>
                                        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${suHacmiDisplay}</td>
                                        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${row.birimAgirlik}</td>
                                        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${row.toplamAgirlik}</td>
                                        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${row.heatNo}</td>
                                    </tr>
                                    `;
                                }).join('') : `
                                <tr>
                                    <td colspan="10" style="padding: 20px; text-align: center; color: #718096;">
                                        Seçilen filtreye uygun veri bulunamadı
                                    </td>
                                </tr>
                                `}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
            
            tabElement.innerHTML = content;
            
            const tabInfoFromMap = this.activeFilteredTabs.get(tabId);
            if (tabInfoFromMap) {
                tabInfoFromMap.data = filteredData;
            }
        },

        exportFilteredTabData(tabId) {
            const tabInfo = this.activeFilteredTabs.get(tabId);
            if (!tabInfo) {
                this.showNotification('Filtrelenmiş veri bulunamadı', 'error');
                return;
            }
            
            this.exportFilteredData(tabInfo.data, tabInfo.filterName);
        }
    };

    window.UIManager = UIManager;

})(window);