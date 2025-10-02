/**
 * UI Manager - Kullanıcı Arayüzü Yönetimi
 */

(function(window) {
    'use strict';
    
    const UIManager = {
        initialize: function() {
            this.loadSavedLanguage();
            this.bindStaticButtons();
        },

        loadSavedLanguage: function() {
            const savedLang = localStorage.getItem('selectedLanguage') || 'tr';
            const langSelect = document.getElementById('languageSelect');
            if (langSelect) {
                langSelect.value = savedLang;
            }
        },

        bindStaticButtons: function() {
            // Excel işlemleri
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

        showFilterDialog: function() {
            const tableData = window.TableManager?.getTableData();
            if (!tableData || tableData.length === 0) {
                this.showNotification('Filtrelenecek veri yok', 'warning');
                return;
            }

            // Benzersiz malzeme türlerini al
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
                <div class="filter-modal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; 
                     background: rgba(0,0,0,0.5); display: flex; align-items: center; 
                     justify-content: center; z-index: 10000;">
                    <div style="background: white; padding: 30px; border-radius: 10px; 
                         min-width: 400px; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
                        <h3 style="margin-bottom: 20px;">Malzeme Filtreleme</h3>
                        <select id="filterSelect" style="width: 100%; padding: 10px; 
                                margin-bottom: 20px; border: 2px solid #e2e8f0; 
                                border-radius: 6px;">
                            ${optionsHtml}
                        </select>
                        <div style="display: flex; gap: 10px; justify-content: flex-end;">
                            <button onclick="UIManager.applyFilter()" 
                                    style="padding: 10px 20px; background: #667eea; 
                                           color: white; border: none; border-radius: 6px; 
                                           cursor: pointer;">Filtrele</button>
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
            if (filterValue) {
                filteredData = tableData.filter(row => row.originalType === filterValue);
            }

            if (window.ExcelManager) {
                const MaterialClass = window.MaterialRegistry.get(filterValue);
                const instance = new MaterialClass();
                const filterName = filterValue ? instance.getDisplayName() : 'Tüm Malzemeler';
                
                this.closeFilterModal();
                window.ExcelManager.exportFilteredToExcel(filteredData, filterName);
            }
        },

        closeFilterModal: function() {
            const modal = document.querySelector('.filter-modal');
            if (modal) modal.remove();
        }
    };

    window.UIManager = UIManager;

})(window);