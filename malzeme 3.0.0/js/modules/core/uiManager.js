/**
 * UI Manager - Focus Yönetimi Düzeltildi
 */

(function(window) {
    'use strict';
    
    const UIManager = {
        activeTabId: 'main-tab',
        tabCounter: 1,
        
        initialize: function() {
            this.loadSavedLanguage();
            this.bindStaticButtons();
            this.setupTabControls();
        },

        setupTabControls: function() {
            const btnNewTab = document.getElementById('btnNewTab');
            if (btnNewTab) {
                btnNewTab.onclick = () => this.createNewTab();
            }
        },

        createNewTab: function(title = 'Yeni Sekme', content = null) {
            this.tabCounter++;
            const tabId = `tab-${this.tabCounter}`;
            
            const tabList = document.querySelector('.tab-list');
            const tabItem = document.createElement('div');
            tabItem.className = 'tab-item';
            tabItem.dataset.tab = tabId;
            tabItem.innerHTML = `
                <span class="tab-icon">📄</span>
                <span class="tab-title">${title}</span>
                <span class="tab-close" onclick="UIManager.closeTab('${tabId}')">×</span>
            `;
            
            tabItem.onclick = (e) => {
                if (!e.target.classList.contains('tab-close')) {
                    this.switchTab(tabId);
                }
            };
            
            tabList.appendChild(tabItem);
            
            const contentContainer = document.querySelector('.tab-content-container');
            const tabContent = document.createElement('div');
            tabContent.className = 'tab-content';
            tabContent.id = tabId;
            
            if (content) {
                tabContent.innerHTML = content;
            } else {
                tabContent.innerHTML = '<div class="app-container"><p>Boş sekme</p></div>';
            }
            
            contentContainer.appendChild(tabContent);
            
            this.switchTab(tabId);

            // DÜZELTME: Yeni sekme oluşturduktan sonra input'ları aktif et
            setTimeout(() => {
                if (window.EventManager) {
                    window.EventManager.forceActivateAll();
                }
            }, 150);
            
            return tabId;
        },

        switchTab: function(tabId) {
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
            
            // DÜZELTME: Sekme değiştirince input'ları aktif et
            setTimeout(() => {
                if (window.EventManager) {
                    window.EventManager.forceActivateAll();
                }
            }, 100);
        },

        closeTab: function(tabId) {
            if (tabId === 'main-tab') return;
            
            const tab = document.querySelector(`[data-tab="${tabId}"]`);
            const content = document.getElementById(tabId);
            
            if (tab) tab.remove();
            if (content) content.remove();
            
            this.switchTab('main-tab');
        },

        showFilterDialog: function() {
            const tableData = window.TableManager?.getTableData();
            if (!tableData || tableData.length === 0) {
                this.showNotification('Filtrelenecek veri yok', 'warning');
                return;
            }

            const materialTypes = [...new Set(tableData.map(row => row.originalType))];
            
            let optionsHtml = '<option value="">Tüm Malzemeler</option>';
            materialTypes.forEach(type => {
                if (window.MaterialRegistry.has(type)) {
                    const MaterialClass = window.MaterialRegistry.get(type);
                    const instance = new MaterialClass();
                    optionsHtml += `<option value="${type}">${instance.getDisplayName()}</option>`;
                }
            });

            const modalHtml = `
                <div class="filter-modal">
                    <div style="background: white; padding: 30px; border-radius: 10px; 
                         min-width: 400px; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
                        <h3 style="margin-bottom: 20px;">Malzeme Filtreleme</h3>
                        <select id="filterSelect" style="width: 100%; padding: 10px; 
                                margin-bottom: 20px; border: 2px solid #e2e8f0; 
                                border-radius: 6px;">
                            ${optionsHtml}
                        </select>
                        <div style="display: flex; gap: 10px;">
                            <button onclick="UIManager.applyFilter()" 
                                    style="flex: 1; padding: 10px 20px; background: #667eea; 
                                           color: white; border: none; border-radius: 6px; 
                                           cursor: pointer;">🔍 Filtrele ve Göster</button>
                            <button onclick="UIManager.filterAndExport()" 
                                    style="flex: 1; padding: 10px 20px; background: #107c41; 
                                           color: white; border: none; border-radius: 6px; 
                                           cursor: pointer;">💾 Excel'e Aktar</button>
                            <button onclick="UIManager.closeFilterModal()" 
                                    style="padding: 10px 20px; background: #718096; 
                                           color: white; border: none; border-radius: 6px; 
                                           cursor: pointer;">İptal</button>
                        </div>
                    </div>
                </div>
            `;

            const modalDiv = document.createElement('div');
            modalDiv.innerHTML = modalHtml;
            document.body.appendChild(modalDiv.firstElementChild);
        },

        applyFilter: function() {
            const filterValue = document.getElementById('filterSelect').value;
            const tableData = window.TableManager?.getTableData();
            
            let filteredData = tableData;
            let filterName = 'Tüm Malzemeler';
            
            if (filterValue) {
                filteredData = tableData.filter(row => row.originalType === filterValue);
                const MaterialClass = window.MaterialRegistry.get(filterValue);
                const instance = new MaterialClass();
                filterName = instance.getDisplayName();
            }

            this.showFilteredDataInNewTab(filteredData, filterName);
            this.closeFilterModal();
        },

        filterAndExport: function() {
            const filterValue = document.getElementById('filterSelect').value;
            const tableData = window.TableManager?.getTableData();
            
            let filteredData = tableData;
            let filterName = 'Tüm Malzemeler';
            
            if (filterValue) {
                filteredData = tableData.filter(row => row.originalType === filterValue);
                const MaterialClass = window.MaterialRegistry.get(filterValue);
                const instance = new MaterialClass();
                filterName = instance.getDisplayName();
            }

            if (window.ExcelManager) {
                this.closeFilterModal();
                window.ExcelManager.exportFilteredToExcel(filteredData, filterName);
            }
        },

        showFilteredDataInNewTab: function(filteredData, filterName) {
            let toplamAgirlik = 0;
            let toplamParca = 0;
            let toplamSuHacmi = 0;
            
            filteredData.forEach(row => {
                toplamParca += parseFloat(row.adet) || 0;
                toplamAgirlik += parseFloat(row.toplamAgirlik) || 0;
                toplamSuHacmi += row.suHacmi !== '-' ? parseFloat(row.suHacmi) || 0 : 0;
            });

            const content = `
                <div class="app-container">
                    <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <h2 style="color: #667eea; margin-bottom: 20px;">
                            🔍 Filtrelenmiş Liste: ${filterName}
                        </h2>
                        
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
                        
                        <button onclick="UIManager.exportCurrentFilter('${filterName}')" 
                                style="padding: 12px 24px; background: #107c41; color: white; 
                                       border: none; border-radius: 6px; cursor: pointer; 
                                       font-weight: 600; margin-bottom: 20px;">
                            💾 Bu Listeyi Excel'e Aktar
                        </button>
                    </div>
                    
                    <div style="background: white; padding: 20px; border-radius: 10px; overflow-x: auto;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <thead>
                                <tr style="background: #f7fafc;">
                                    <th style="padding: 10px; border-bottom: 2px solid #e2e8f0;">P.No</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #e2e8f0;">Adet</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #e2e8f0;">Malzeme Türü</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #e2e8f0;">Malzeme Cinsi</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #e2e8f0;">Ölçüler</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #e2e8f0;">Standart</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #e2e8f0;">Su Hacmi (L)</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #e2e8f0;">Birim Ağırlık (kg)</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #e2e8f0;">Toplam Ağırlık (kg)</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #e2e8f0;">Açıklama</th>
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

            const tabTitle = `Filtre: ${filterName}`;
            const tabId = this.createNewTab(tabTitle, content);
            
            window[`filteredData_${tabId}`] = filteredData;
        },

        exportCurrentFilter: function(filterName) {
            const tabId = this.activeTabId;
            const filteredData = window[`filteredData_${tabId}`];
            
            if (filteredData && window.ExcelManager) {
                window.ExcelManager.exportFilteredToExcel(filteredData, filterName);
            }
        },

        loadSavedLanguage: function() {
            const savedLang = localStorage.getItem('selectedLanguage') || 'tr';
            const langSelect = document.getElementById('languageSelect');
            if (langSelect) {
                langSelect.value = savedLang;
            }
        },

        bindStaticButtons: function() {
            const btnExcelKaydet = document.getElementById('btnExcelKaydet');
            if (btnExcelKaydet) {
                btnExcelKaydet.onclick = () => {
                    if (window.ExcelManager) {
                        window.ExcelManager.exportToExcel();
                    }
                };
            }

            const btnExcelAc = document.getElementById('btnExcelAc');
            if (btnExcelAc) {
                btnExcelAc.onclick = () => {
                    if (window.ExcelManager) {
                        window.ExcelManager.importFromExcel();
                    }
                };
            }

            const btnTabloTemizle = document.getElementById('btnTabloTemizle');
            if (btnTabloTemizle) {
                btnTabloTemizle.onclick = () => {
                    if (window.TableManager) {
                        window.TableManager.clearTable();
                    }
                };
            }

            const btnFilter = document.getElementById('btnFilter');
            if (btnFilter) {
                btnFilter.onclick = () => this.showFilterDialog();
            }
        },

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

        closeFilterModal: function() {
            const modal = document.querySelector('.filter-modal');
            if (modal) modal.remove();
            
            // DÜZELTME: Modal kapandıktan sonra input'ları aktif et ve focus restore et
            setTimeout(() => {
                if (window.EventManager) {
                    window.EventManager.forceActivateAll();
                    window.EventManager.restoreFocus();
                }
            }, 150);
        }
    };

    window.UIManager = UIManager;

})(window);