// Sekmeli Çalışma Yönetimi Modülü
(function(window) {
    'use strict';
    
    const TabManager = {
        tabs: new Map(),
        activeTabId: null,
        tabCounter: 1,
        
        // Sekmeli yapıyı başlat
        initialize: function() {
            this.createTabContainer();
            this.createMainTab();
            this.bindEvents();
        },
        
        // Sekme konteynırını oluştur
        createTabContainer: function() {
            const appContainer = document.querySelector('.app-container');
            
            // Tab bar oluştur
            const tabBar = document.createElement('div');
            tabBar.className = 'tab-bar';
            tabBar.innerHTML = `
                <div class="tabs-container">
                    <div class="tabs-list" id="tabsList"></div>
                    <div class="tab-actions">
                        <button id="addTabBtn" class="btn-add-tab" title="Yeni Sekme">
                            <span>+</span>
                        </button>
                    </div>
                </div>
            `;
            
            // Tab içerik konteynırı oluştur
            const tabContent = document.createElement('div');
            tabContent.className = 'tab-content-container';
            tabContent.id = 'tabContentContainer';
            
            // Mevcut içeriği sarmalaya al
            const existingContent = appContainer.innerHTML;
            appContainer.innerHTML = '';
            appContainer.appendChild(tabBar);
            appContainer.appendChild(tabContent);
            
            // Ana sekme içeriğini oluştur
            const mainTabContent = document.createElement('div');
            mainTabContent.className = 'tab-pane active';
            mainTabContent.id = 'tab-main';
            mainTabContent.innerHTML = existingContent;
            tabContent.appendChild(mainTabContent);
        },
        
        // Ana sekmeyi oluştur
        createMainTab: function() {
            const tabData = {
                id: 'main',
                title: 'Ana Sayfa',
                type: 'main',
                data: null,
                isModified: false
            };
            
            this.tabs.set('main', tabData);
            this.activeTabId = 'main';
            this.renderTabButton('main');
        },
        
        // Yeni sekme oluştur
        createTab: function(title, type = 'filtered', data = null) {
            const tabId = `tab-${this.tabCounter++}`;
            const tabData = {
                id: tabId,
                title: title,
                type: type,
                data: data,
                isModified: false
            };
            
            this.tabs.set(tabId, tabData);
            this.renderTabButton(tabId);
            this.renderTabContent(tabId);
            this.switchToTab(tabId);
            
            return tabId;
        },
        
        // Sekme butonunu render et
        renderTabButton: function(tabId) {
            const tab = this.tabs.get(tabId);
            const tabsList = document.getElementById('tabsList');
            
            const tabButton = document.createElement('div');
            tabButton.className = 'tab-button';
            tabButton.setAttribute('data-tab-id', tabId);
            tabButton.innerHTML = `
                <span class="tab-title">${tab.title}</span>
                <span class="tab-modified" style="display: ${tab.isModified ? 'inline' : 'none'}">●</span>
                ${tabId !== 'main' ? '<button class="tab-close">×</button>' : ''}
            `;
            
            tabsList.appendChild(tabButton);
            
            // Event listeners
            tabButton.addEventListener('click', (e) => {
                if (!e.target.classList.contains('tab-close')) {
                    this.switchToTab(tabId);
                }
            });
            
            if (tabId !== 'main') {
                const closeBtn = tabButton.querySelector('.tab-close');
                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.closeTab(tabId);
                });
            }
        },
        
        // Sekme içeriğini render et
        renderTabContent: function(tabId) {
            const tab = this.tabs.get(tabId);
            const tabContentContainer = document.getElementById('tabContentContainer');
            
            let content = '';
            
            switch (tab.type) {
                case 'main':
                    // Ana sekme içeriği zaten mevcut
                    return;
                    
                case 'filtered':
                    content = this.createFilteredTabContent(tab);
                    break;
                    
                case 'comparison':
                    content = this.createComparisonTabContent(tab);
                    break;
                    
                default:
                    content = this.createGenericTabContent(tab);
            }
            
            const tabPane = document.createElement('div');
            tabPane.className = 'tab-pane';
            tabPane.id = `tab-${tabId}`;
            tabPane.innerHTML = content;
            tabContentContainer.appendChild(tabPane);
            
            // Tab'e özel event listener'ları ekle
            this.bindTabSpecificEvents(tabId);
        },
        
        // Filtrelenmiş sekme içeriği oluştur
        createFilteredTabContent: function(tab) {
            return `
                <div class="filtered-tab-container">
                    <div class="filtered-tab-header">
                        <div class="filter-info">
                            <h3>📋 ${tab.title}</h3>
                            <div class="filter-summary">
                                <span class="filter-count">Filtre: ${tab.data?.filterType || 'Bilinmiyor'}</span>
                                <span class="result-count">Sonuç: ${tab.data?.items?.length || 0} malzeme</span>
                            </div>
                        </div>
                        <div class="filtered-tab-actions">
                            <button class="btn-excel-export" data-tab-id="${tab.id}">
                                💾 Excel'e Kaydet
                            </button>
                            <button class="btn-print" data-tab-id="${tab.id}">
                                🖨️ Yazdır
                            </button>
                            <button class="btn-refresh-filter" data-tab-id="${tab.id}">
                                🔄 Filtreyi Yenile
                            </button>
                        </div>
                    </div>
                    <div class="filtered-table-wrapper">
                        <table class="filtered-table">
                            <thead id="filteredTableHead-${tab.id}"></thead>
                            <tbody id="filteredTableBody-${tab.id}"></tbody>
                        </table>
                    </div>
                </div>
            `;
        },
        
        // Karşılaştırma sekmesi içeriği
        createComparisonTabContent: function(tab) {
            return `
                <div class="comparison-tab-container">
                    <div class="comparison-header">
                        <h3>⚖️ ${tab.title}</h3>
                        <div class="comparison-actions">
                            <button class="btn-add-comparison">+ Karşılaştırma Ekle</button>
                        </div>
                    </div>
                    <div class="comparison-content" id="comparisonContent-${tab.id}">
                        <!-- Karşılaştırma içeriği buraya gelecek -->
                    </div>
                </div>
            `;
        },
        
        // Genel sekme içeriği
        createGenericTabContent: function(tab) {
            return `
                <div class="generic-tab-container">
                    <h3>${tab.title}</h3>
                    <div class="tab-content-area">
                        <p>Bu sekme türü henüz desteklenmiyor.</p>
                    </div>
                </div>
            `;
        },
        
        // Sekmeye geç
        switchToTab: function(tabId) {
            if (!this.tabs.has(tabId)) return;
            
            // Önceki aktif sekmeyi pasif yap
            if (this.activeTabId) {
                const prevTabButton = document.querySelector(`[data-tab-id="${this.activeTabId}"]`);
                const prevTabPane = document.getElementById(`tab-${this.activeTabId}`);
                
                if (prevTabButton) prevTabButton.classList.remove('active');
                if (prevTabPane) prevTabPane.classList.remove('active');
            }
            
            // Yeni sekmeyi aktif yap
            const tabButton = document.querySelector(`[data-tab-id="${tabId}"]`);
            const tabPane = document.getElementById(`tab-${tabId}`);
            
            if (tabButton) tabButton.classList.add('active');
            if (tabPane) tabPane.classList.add('active');
            
            this.activeTabId = tabId;
            
            // Sekme değişikliği olayını tetikle
            this.onTabChange(tabId);
        },
        
        // Sekme kapat
        closeTab: function(tabId) {
            if (tabId === 'main') return; // Ana sekme kapatılamaz
            
            const tab = this.tabs.get(tabId);
            if (!tab) return;
            
            // Değişiklik varsa kullanıcıya sor
            if (tab.isModified) {
                const confirm = window.confirm('Bu sekmede kaydedilmemiş değişiklikler var. Kapatmak istediğinizden emin misiniz?');
                if (!confirm) return;
            }
            
            // Sekme elemanlarını kaldır
            const tabButton = document.querySelector(`[data-tab-id="${tabId}"]`);
            const tabPane = document.getElementById(`tab-${tabId}`);
            
            if (tabButton) tabButton.remove();
            if (tabPane) tabPane.remove();
            
            // Veri yapısından kaldır
            this.tabs.delete(tabId);
            
            // Aktif sekmeyi değiştir
            if (this.activeTabId === tabId) {
                this.switchToTab('main');
            }
        },
        
        // Sekme başlığını güncelle
        updateTabTitle: function(tabId, newTitle) {
            const tab = this.tabs.get(tabId);
            if (!tab) return;
            
            tab.title = newTitle;
            
            const tabTitleElement = document.querySelector(`[data-tab-id="${tabId}"] .tab-title`);
            if (tabTitleElement) {
                tabTitleElement.textContent = newTitle;
            }
        },
        
        // Sekme değiştirildi işaretle
        markTabAsModified: function(tabId, isModified = true) {
            const tab = this.tabs.get(tabId);
            if (!tab) return;
            
            tab.isModified = isModified;
            
            const modifiedIndicator = document.querySelector(`[data-tab-id="${tabId}"] .tab-modified`);
            if (modifiedIndicator) {
                modifiedIndicator.style.display = isModified ? 'inline' : 'none';
            }
        },
        
        // Event'ları bağla
        bindEvents: function() {
            // Yeni sekme butonu
            document.getElementById('addTabBtn').addEventListener('click', () => {
                this.showCreateTabDialog();
            });
            
            // Klavye kısayolları
            document.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.key === 't') {
                    e.preventDefault();
                    this.showCreateTabDialog();
                } else if (e.ctrlKey && e.key === 'w') {
                    e.preventDefault();
                    if (this.activeTabId !== 'main') {
                        this.closeTab(this.activeTabId);
                    }
                }
            });
        },
        
        // Tab'e özel event'ları bağla
        bindTabSpecificEvents: function(tabId) {
            const tab = this.tabs.get(tabId);
            
            if (tab.type === 'filtered') {
                // Excel export butonu
                const exportBtn = document.querySelector(`[data-tab-id="${tabId}"].btn-excel-export`);
                if (exportBtn) {
                    exportBtn.addEventListener('click', () => {
                        this.exportFilteredToExcel(tabId);
                    });
                }
                
                // Filtreyi yenile butonu
                const refreshBtn = document.querySelector(`[data-tab-id="${tabId}"].btn-refresh-filter`);
                if (refreshBtn) {
                    refreshBtn.addEventListener('click', () => {
                        this.refreshFilter(tabId);
                    });
                }
            }
        },
        
        // Yeni sekme oluşturma dialogu
        showCreateTabDialog: function() {
            const content = `
                <div class="tab-create-dialog">
                    <h3>Yeni Sekme Oluştur</h3>
                    <div class="form-group">
                        <label>Sekme Türü:</label>
                        <select id="newTabType">
                            <option value="filtered">Filtrelenmiş Liste</option>
                            <option value="comparison">Karşılaştırma</option>
                            <option value="generic">Genel</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Sekme Adı:</label>
                        <input type="text" id="newTabTitle" placeholder="Sekme adını girin">
                    </div>
                    <div class="form-actions">
                        <button onclick="TabManager.createNewTab()" class="btn btn-primary">Oluştur</button>
                        <button onclick="UIManager.closeModal()" class="btn btn-secondary">İptal</button>
                    </div>
                </div>
            `;
            
            UIManager.openModal(content, 'Yeni Sekme');
        },
        
        // Yeni sekme oluştur
        createNewTab: function() {
            const type = document.getElementById('newTabType').value;
            const title = document.getElementById('newTabTitle').value || 'Yeni Sekme';
            
            this.createTab(title, type, null);
            UIManager.closeModal();
        },
        
        // Sekme değişikliği olay yöneticisi
        onTabChange: function(tabId) {
            const tab = this.tabs.get(tabId);
            
            // Tab'e özel işlemler
            if (tab.type === 'filtered' && tab.data) {
                this.loadFilteredData(tabId);
            }
            
            // Diğer modülleri bilgilendir
            if (typeof ColumnManager !== 'undefined') {
                ColumnManager.onTabChange(tabId);
            }
        },
        
        // Filtrelenmiş veriyi yükle
        loadFilteredData: function(tabId) {
            const tab = this.tabs.get(tabId);
            if (!tab || !tab.data) return;
            
            // Tablo başlıklarını güncelle
            const thead = document.getElementById(`filteredTableHead-${tabId}`);
            const tbody = document.getElementById(`filteredTableBody-${tabId}`);
            
            if (thead && tbody) {
                // Başlıkları oluştur
                thead.innerHTML = this.createTableHeaders();
                
                // Veriyi render et
                tbody.innerHTML = tab.data.items.map((item, index) => 
                    this.createTableRow(item, index)
                ).join('');
            }
        },
        
        // Tablo başlıkları oluştur
        createTableHeaders: function() {
            const columns = ColumnManager ? ColumnManager.getVisibleColumns() : this.getDefaultColumns();
            return '<tr>' + columns.map(col => `<th>${col.title}</th>`).join('') + '</tr>';
        },
        
        // Varsayılan sütunlar
        getDefaultColumns: function() {
            return [
                { id: 'pNo', title: 'P.No', width: '60px' },
                { id: 'adet', title: 'Adet', width: '80px' },
                { id: 'malzemeTuru', title: 'Malzeme Türü', width: '200px' },
                { id: 'malzemeCinsi', title: 'Malzeme Cinsi', width: '150px' },
                { id: 'olculer', title: 'Ölçüler', width: '180px' },
                { id: 'birimAgirlik', title: 'Birim Ağırlık', width: '120px' },
                { id: 'toplamAgirlik', title: 'Toplam Ağırlık', width: '120px' }
            ];
        },
        
        // Tablo satırı oluştur
        createTableRow: function(item, index) {
            const columns = ColumnManager ? ColumnManager.getVisibleColumns() : this.getDefaultColumns();
            const cells = columns.map(col => `<td>${item[col.id] || '-'}</td>`).join('');
            return `<tr>${cells}</tr>`;
        },
        
        // Filtrelenmiş veriyi Excel'e aktar
        exportFilteredToExcel: function(tabId) {
            const tab = this.tabs.get(tabId);
            if (!tab || !tab.data) return;
            
            // Özel Excel export işlemi
            ExcelManager.exportFilteredData(tab.data.items, tab.title);
        },
        
        // Filtreyi yenile
        refreshFilter: function(tabId) {
            const tab = this.tabs.get(tabId);
            if (!tab || !tab.data) return;
            
            // Ana tablodaki güncel verilerle filtreyi yeniden uygula
            const currentData = TableManager.getTableData();
            const filteredData = FilterManager.applyFilter(currentData, tab.data.filterConfig);
            
            tab.data.items = filteredData;
            this.loadFilteredData(tabId);
            
            UIManager.showNotification('Filtre yenilendi', 'success');
        },
        
        // Aktif sekmeyi al
        getActiveTab: function() {
            return this.tabs.get(this.activeTabId);
        },
        
        // Tüm sekmeleri al
        getAllTabs: function() {
            return Array.from(this.tabs.values());
        },
        
        // Sekme verilerini temizle
        clearTabData: function(tabId) {
            const tab = this.tabs.get(tabId);
            if (tab) {
                tab.data = null;
                tab.isModified = false;
                this.markTabAsModified(tabId, false);
            }
        }
    };
    
    // Modülü window objesine bağla
    window.TabManager = TabManager;
    
})(window);