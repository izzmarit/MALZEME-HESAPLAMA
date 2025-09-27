// Sütun Yönetimi Modülü
(function(window) {
    'use strict';
    
    const ColumnManager = {
        columns: [],
        defaultColumns: [],
        customColumns: [],
        visibleColumns: [],
        columnOrder: [],
        
        // Başlangıç
        initialize: function() {
            this.loadDefaultColumns();
            this.loadCustomColumns();
            this.loadColumnSettings();
            this.bindEvents();
        },
        
        // Varsayılan sütunları yükle
        loadDefaultColumns: function() {
            this.defaultColumns = [
                {
                    id: 'pNo',
                    title: 'P.No',
                    titleEn: 'Item No.',
                    type: 'number',
                    width: '80px',
                    visible: true,
                    sortable: true,
                    editable: false,
                    required: true,
                    align: 'center',
                    format: null
                },
                {
                    id: 'adet',
                    title: 'Adet',
                    titleEn: 'Quantity',
                    type: 'number',
                    width: '90px',
                    visible: true,
                    sortable: true,
                    editable: true,
                    required: true,
                    align: 'center',
                    format: null
                },
                {
                    id: 'malzemeTuru',
                    title: 'Malzeme Türü',
                    titleEn: 'Material Type',
                    type: 'text',
                    width: '180px',
                    visible: true,
                    sortable: true,
                    editable: false,
                    required: true,
                    align: 'left',
                    format: null
                },
                {
                    id: 'malzemeCinsi',
                    title: 'Malzeme Cinsi',
                    titleEn: 'Material Grade',
                    type: 'text',
                    width: '150px',
                    visible: true,
                    sortable: true,
                    editable: false,
                    required: true,
                    align: 'center',
                    format: null
                },
                {
                    id: 'olculer',
                    title: 'Ölçüler',
                    titleEn: 'Dimensions',
                    type: 'text',
                    width: '200px',
                    visible: true,
                    sortable: false,
                    editable: false,
                    required: true,
                    align: 'left',
                    format: null
                },
                {
                    id: 'enNormu',
                    title: 'Standart',
                    titleEn: 'Standard',
                    type: 'text',
                    width: '120px',
                    visible: true,
                    sortable: true,
                    editable: false,
                    required: false,
                    align: 'left',
                    format: null
                },
                {
                    id: 'suHacmi',
                    title: 'Su Hacmi (L)',
                    titleEn: 'Water Volume (L)',
                    type: 'decimal',
                    width: '110px',
                    visible: true,
                    sortable: true,
                    editable: false,
                    required: false,
                    align: 'right',
                    format: '#,##0.00'
                },
                {
                    id: 'birimAgirlik',
                    title: 'Birim Ağırlık (kg)',
                    titleEn: 'Unit Weight (kg)',
                    type: 'decimal',
                    width: '130px',
                    visible: true,
                    sortable: true,
                    editable: false,
                    required: true,
                    align: 'right',
                    format: '#,##0.00'
                },
                {
                    id: 'toplamAgirlik',
                    title: 'Toplam Ağırlık (kg)',
                    titleEn: 'Total Weight (kg)',
                    type: 'decimal',
                    width: '140px',
                    visible: true,
                    sortable: true,
                    editable: false,
                    required: true,
                    align: 'right',
                    format: '#,##0.00'
                },
                {
                    id: 'heatNo',
                    title: 'Açıklama / Heat No',
                    titleEn: 'Description / Heat No',
                    type: 'text',
                    width: '160px',
                    visible: true,
                    sortable: false,
                    editable: true,
                    required: false,
                    align: 'left',
                    format: null
                },
                {
                    id: 'actions',
                    title: 'İşlem',
                    titleEn: 'Actions',
                    type: 'actions',
                    width: '120px',
                    visible: true,
                    sortable: false,
                    editable: false,
                    required: true,
                    align: 'center',
                    format: null
                }
            ];
            
            this.columns = [...this.defaultColumns];
            this.updateVisibleColumns();
        },
        
        // Özel sütunları yükle
        loadCustomColumns: function() {
            const stored = localStorage.getItem('customColumns');
            if (stored) {
                try {
                    this.customColumns = JSON.parse(stored);
                    this.columns = [...this.defaultColumns, ...this.customColumns];
                } catch (error) {
                    console.error('Özel sütunlar yüklenemedi:', error);
                    this.customColumns = [];
                }
            }
        },
        
        // Sütun ayarlarını yükle
        loadColumnSettings: function() {
            const stored = localStorage.getItem('columnSettings');
            if (stored) {
                try {
                    const settings = JSON.parse(stored);
                    
                    // Görünürlük ayarlarını uygula
                    if (settings.visibility) {
                        this.columns.forEach(col => {
                            if (settings.visibility.hasOwnProperty(col.id)) {
                                col.visible = settings.visibility[col.id];
                            }
                        });
                    }
                    
                    // Sıralama ayarlarını uygula
                    if (settings.order && settings.order.length > 0) {
                        this.columnOrder = settings.order;
                        this.applyColumnOrder();
                    }
                    
                    // Genişlik ayarlarını uygula
                    if (settings.widths) {
                        this.columns.forEach(col => {
                            if (settings.widths[col.id]) {
                                col.width = settings.widths[col.id];
                            }
                        });
                    }
                } catch (error) {
                    console.error('Sütun ayarları yüklenemedi:', error);
                }
            }
            
            this.updateVisibleColumns();
        },
        
        // Sütun ayarlarını kaydet
        saveColumnSettings: function() {
            const settings = {
                visibility: {},
                order: this.columnOrder.length > 0 ? this.columnOrder : this.columns.map(col => col.id),
                widths: {}
            };
            
            this.columns.forEach(col => {
                settings.visibility[col.id] = col.visible;
                settings.widths[col.id] = col.width;
            });
            
            localStorage.setItem('columnSettings', JSON.stringify(settings));
            localStorage.setItem('customColumns', JSON.stringify(this.customColumns));
        },
        
        // Görünür sütunları güncelle
        updateVisibleColumns: function() {
            this.visibleColumns = this.columns.filter(col => col.visible);
            
            // Sıralama varsa uygula
            if (this.columnOrder.length > 0) {
                this.visibleColumns.sort((a, b) => {
                    const aIndex = this.columnOrder.indexOf(a.id);
                    const bIndex = this.columnOrder.indexOf(b.id);
                    return aIndex - bIndex;
                });
            }
        },
        
        // Yeni özel sütun ekle
        addCustomColumn: function(columnData) {
            const newColumn = {
                id: this.generateColumnId(),
                title: columnData.title || 'Yeni Sütun',
                titleEn: columnData.titleEn || 'New Column',
                type: columnData.type || 'text',
                width: columnData.width || '150px',
                visible: true,
                sortable: columnData.sortable !== false,
                editable: columnData.editable !== false,
                required: columnData.required || false,
                align: columnData.align || 'left',
                format: columnData.format || null,
                isCustom: true,
                defaultValue: columnData.defaultValue || ''
            };
            
            this.customColumns.push(newColumn);
            this.columns.push(newColumn);
            this.updateVisibleColumns();
            this.saveColumnSettings();
            
            // Mevcut tablo verilerine yeni sütunu ekle
            this.addColumnToTableData(newColumn);
            
            return newColumn.id;
        },
        
        // Özel sütunu sil
        removeCustomColumn: function(columnId) {
            // Varsayılan sütunlar silinemez
            const column = this.getColumn(columnId);
            if (!column || !column.isCustom) {
                UIManager.showNotification('Bu sütun silinemez', 'warning');
                return false;
            }
            
            if (confirm(`"${column.title}" sütununu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`)) {
                // Sütunu listelerden kaldır
                this.customColumns = this.customColumns.filter(col => col.id !== columnId);
                this.columns = this.columns.filter(col => col.id !== columnId);
                this.columnOrder = this.columnOrder.filter(id => id !== columnId);
                
                this.updateVisibleColumns();
                this.saveColumnSettings();
                
                // Tablo verilerinden sütunu kaldır
                this.removeColumnFromTableData(columnId);
                
                UIManager.showNotification('Sütun silindi', 'success');
                return true;
            }
            
            return false;
        },
        
        // Sütun görünürlüğünü değiştir
        toggleColumnVisibility: function(columnId, visible) {
            const column = this.getColumn(columnId);
            if (column) {
                column.visible = visible;
                this.updateVisibleColumns();
                this.saveColumnSettings();
                this.refreshTable();
            }
        },
        
        // Sütun sırasını değiştir
        reorderColumns: function(newOrder) {
            this.columnOrder = newOrder;
            this.updateVisibleColumns();
            this.saveColumnSettings();
            this.refreshTable();
        },
        
        // Sütun genişliğini değiştir
        updateColumnWidth: function(columnId, newWidth) {
            const column = this.getColumn(columnId);
            if (column) {
                column.width = newWidth;
                this.saveColumnSettings();
                this.updateTableColumnWidth(columnId, newWidth);
            }
        },
        
        // Sütun düzenle
        editColumn: function(columnId, updates) {
            const column = this.getColumn(columnId);
            if (!column) return false;
            
            // Varsayılan sütunların bazı özellikleri değiştirilemez
            if (!column.isCustom) {
                const allowedUpdates = ['title', 'titleEn', 'width', 'visible'];
                const filteredUpdates = {};
                allowedUpdates.forEach(key => {
                    if (updates.hasOwnProperty(key)) {
                        filteredUpdates[key] = updates[key];
                    }
                });
                updates = filteredUpdates;
            }
            
            // Güncellemeleri uygula
            Object.keys(updates).forEach(key => {
                if (column.hasOwnProperty(key)) {
                    column[key] = updates[key];
                }
            });
            
            this.updateVisibleColumns();
            this.saveColumnSettings();
            this.refreshTable();
            
            return true;
        },
        
        // Sütun ID'si oluştur
        generateColumnId: function() {
            let id;
            do {
                id = 'custom_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            } while (this.getColumn(id));
            
            return id;
        },
        
        // Sütunu al
        getColumn: function(columnId) {
            return this.columns.find(col => col.id === columnId);
        },
        
        // Görünür sütunları al
        getVisibleColumns: function() {
            return this.visibleColumns;
        },
        
        // Tüm sütunları al
        getAllColumns: function() {
            return this.columns;
        },
        
        // Özel sütunları al
        getCustomColumns: function() {
            return this.customColumns;
        },
        
        // Sütun başlığını al (dile göre)
        getColumnTitle: function(columnId, language = 'tr') {
            const column = this.getColumn(columnId);
            if (!column) return '';
            
            if (language === 'en' && column.titleEn) {
                return column.titleEn;
            }
            
            return column.title;
        },
        
        // Sütun sırasını uygula
        applyColumnOrder: function() {
            if (this.columnOrder.length === 0) return;
            
            this.columns.sort((a, b) => {
                const aIndex = this.columnOrder.indexOf(a.id);
                const bIndex = this.columnOrder.indexOf(b.id);
                
                // Sırada olmayan sütunları sona koy
                if (aIndex === -1 && bIndex === -1) return 0;
                if (aIndex === -1) return 1;
                if (bIndex === -1) return -1;
                
                return aIndex - bIndex;
            });
        },
        
        // Tablo verilerine yeni sütun ekle
        addColumnToTableData: function(column) {
            const tableData = TableManager.getTableData();
            
            tableData.forEach(row => {
                if (!row.hasOwnProperty(column.id)) {
                    row[column.id] = column.defaultValue || '';
                }
            });
            
            // Veriyi güncelle
            TableManager.updateTableData(tableData);
        },
        
        // Tablo verilerinden sütunu kaldır
        removeColumnFromTableData: function(columnId) {
            const tableData = TableManager.getTableData();
            
            tableData.forEach(row => {
                if (row.hasOwnProperty(columnId)) {
                    delete row[columnId];
                }
            });
            
            // Veriyi güncelle
            TableManager.updateTableData(tableData);
        },
        
        // Tabloyu yenile
        refreshTable: function() {
            if (typeof TableManager !== 'undefined') {
                TableManager.renderTable();
            }
        },
        
        // Tablo sütun genişliğini güncelle
        updateTableColumnWidth: function(columnId, width) {
            const table = document.getElementById('malzemeTablosu');
            if (!table) return;
            
            const columnIndex = this.visibleColumns.findIndex(col => col.id === columnId);
            if (columnIndex === -1) return;
            
            // Başlık genişliğini güncelle
            const headerCell = table.querySelector(`thead tr th:nth-child(${columnIndex + 1})`);
            if (headerCell) {
                headerCell.style.width = width;
            }
            
            // Veri hücrelerinin genişliğini güncelle
            const dataCells = table.querySelectorAll(`tbody tr td:nth-child(${columnIndex + 1})`);
            dataCells.forEach(cell => {
                cell.style.width = width;
            });
        },
        
        // Event'ları bağla
        bindEvents: function() {
            // Sütun yönetimi butonları için event listener
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('btn-manage-columns')) {
                    this.showColumnManagerDialog();
                } else if (e.target.classList.contains('btn-add-column')) {
                    this.showAddColumnDialog();
                }
            });
            
            // Tablo başlığı yeniden boyutlandırma
            this.enableColumnResizing();
        },
        
        // Sütun yeniden boyutlandırma etkinleştir
        enableColumnResizing: function() {
            // Bu özellik daha sonra implement edilecek
            // Şimdilik placeholder bırakıyoruz
        },
        
        // Sütun yöneticisi dialogunu göster
        showColumnManagerDialog: function() {
            const content = `
                <div class="column-manager-dialog">
                    <div class="column-manager-tabs">
                        <div class="tab-buttons">
                            <button class="tab-btn active" data-tab="visibility">Görünürlük</button>
                            <button class="tab-btn" data-tab="order">Sıralama</button>
                            <button class="tab-btn" data-tab="custom">Özel Sütunlar</button>
                        </div>
                        
                        <div class="tab-content" id="visibility-tab">
                            <h4>Sütun Görünürlüği</h4>
                            <div class="column-list" id="columnVisibilityList">
                                ${this.createColumnVisibilityList()}
                            </div>
                        </div>
                        
                        <div class="tab-content" id="order-tab" style="display: none;">
                            <h4>Sütun Sıralaması</h4>
                            <p class="info-text">Sütunları sürükleyip bırakarak sıralarını değiştirebilirsiniz.</p>
                            <div class="sortable-column-list" id="sortableColumnList">
                                ${this.createSortableColumnList()}
                            </div>
                        </div>
                        
                        <div class="tab-content" id="custom-tab" style="display: none;">
                            <h4>Özel Sütunlar</h4>
                            <button onclick="ColumnManager.showAddColumnDialog()" class="btn btn-success">+ Yeni Sütun Ekle</button>
                            <div class="custom-column-list" id="customColumnList">
                                ${this.createCustomColumnList()}
                            </div>
                        </div>
                    </div>
                    
                    <div class="dialog-actions">
                        <button onclick="ColumnManager.applyColumnSettings()" class="btn btn-primary">Uygula</button>
                        <button onclick="UIManager.closeModal()" class="btn btn-secondary">Kapat</button>
                    </div>
                </div>
            `;
            
            UIManager.openModal(content, 'Sütun Yöneticisi');
            this.bindColumnManagerEvents();
        },
        
        // Sütun görünürlük listesi oluştur
        createColumnVisibilityList: function() {
            return this.columns.map(col => `
                <div class="column-visibility-item">
                    <label class="checkbox-label">
                        <input type="checkbox" ${col.visible ? 'checked' : ''} 
                               data-column-id="${col.id}" class="column-visibility-checkbox">
                        <span class="column-title">${col.title}</span>
                        <span class="column-type">(${col.type})</span>
                    </label>
                </div>
            `).join('');
        },
        
        // Sıralaması yapılabilir sütun listesi oluştur
        createSortableColumnList: function() {
            const orderedColumns = [...this.columns];
            if (this.columnOrder.length > 0) {
                orderedColumns.sort((a, b) => {
                    const aIndex = this.columnOrder.indexOf(a.id);
                    const bIndex = this.columnOrder.indexOf(b.id);
                    return aIndex - bIndex;
                });
            }
            
            return orderedColumns.map(col => `
                <div class="sortable-column-item" data-column-id="${col.id}">
                    <div class="drag-handle">⋮⋮</div>
                    <span class="column-title">${col.title}</span>
                    <span class="column-visible ${col.visible ? 'visible' : 'hidden'}">${col.visible ? '👁️' : '🚫'}</span>
                </div>
            `).join('');
        },
        
        // Özel sütun listesi oluştur
        createCustomColumnList: function() {
            if (this.customColumns.length === 0) {
                return '<p class="no-custom-columns">Henüz özel sütun eklenmemiş.</p>';
            }
            
            return this.customColumns.map(col => `
                <div class="custom-column-item">
                    <div class="column-info">
                        <strong>${col.title}</strong>
                        <small>Tür: ${col.type} | Genişlik: ${col.width}</small>
                    </div>
                    <div class="column-actions">
                        <button onclick="ColumnManager.editCustomColumn('${col.id}')" class="btn-edit-small">Düzenle</button>
                        <button onclick="ColumnManager.removeCustomColumn('${col.id}')" class="btn-delete-small">Sil</button>
                    </div>
                </div>
            `).join('');
        },
        
        // Sütun yöneticisi event'larını bağla
        bindColumnManagerEvents: function() {
            // Tab değiştirme
            document.querySelectorAll('.column-manager-dialog .tab-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const tabId = e.target.dataset.tab;
                    this.switchColumnManagerTab(tabId);
                });
            });
            
            // Görünürlük değişiklikleri
            document.querySelectorAll('.column-visibility-checkbox').forEach(checkbox => {
                checkbox.addEventListener('change', (e) => {
                    const columnId = e.target.dataset.columnId;
                    const visible = e.target.checked;
                    this.toggleColumnVisibility(columnId, visible);
                });
            });
        },
        
        // Sütun yöneticisi tab değiştir
        switchColumnManagerTab: function(tabId) {
            // Tüm tab butonlarını pasif yap
            document.querySelectorAll('.column-manager-dialog .tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Tüm tab içeriklerini gizle
            document.querySelectorAll('.column-manager-dialog .tab-content').forEach(content => {
                content.style.display = 'none';
            });
            
            // Seçili tab'ı aktif yap
            document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
            document.getElementById(`${tabId}-tab`).style.display = 'block';
        },
        
        // Yeni sütun ekleme dialogu
        showAddColumnDialog: function() {
            const content = `
                <div class="add-column-dialog">
                    <h3>Yeni Sütun Ekle</h3>
                    
                    <div class="form-group">
                        <label>Sütun Adı (Türkçe):</label>
                        <input type="text" id="newColumnTitle" placeholder="Örn: Proje Kodu" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Sütun Adı (İngilizce):</label>
                        <input type="text" id="newColumnTitleEn" placeholder="Örn: Project Code">
                    </div>
                    
                    <div class="form-group">
                        <label>Veri Tipi:</label>
                        <select id="newColumnType">
                            <option value="text">Metin</option>
                            <option value="number">Sayı</option>
                            <option value="decimal">Ondalıklı Sayı</option>
                            <option value="date">Tarih</option>
                            <option value="boolean">Evet/Hayır</option>
                            <option value="dropdown">Açılır Liste</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Genişlik:</label>
                        <input type="text" id="newColumnWidth" value="150px" placeholder="Örn: 150px">
                    </div>
                    
                    <div class="form-group">
                        <label>Hizalama:</label>
                        <select id="newColumnAlign">
                            <option value="left">Sol</option>
                            <option value="center">Merkez</option>
                            <option value="right">Sağ</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Varsayılan Değer:</label>
                        <input type="text" id="newColumnDefaultValue" placeholder="İsteğe bağlı">
                    </div>
                    
                    <div class="form-group">
                        <label class="checkbox-label">
                            <input type="checkbox" id="newColumnEditable" checked>
                            Düzenlenebilir
                        </label>
                    </div>
                    
                    <div class="form-group">
                        <label class="checkbox-label">
                            <input type="checkbox" id="newColumnSortable" checked>
                            Sıralanabilir
                        </label>
                    </div>
                    
                    <div class="dialog-actions">
                        <button onclick="ColumnManager.createNewColumn()" class="btn btn-success">Oluştur</button>
                        <button onclick="UIManager.closeModal()" class="btn btn-secondary">İptal</button>
                    </div>
                </div>
            `;
            
            UIManager.openModal(content, 'Yeni Sütun Ekle');
        },
        
        // Yeni sütun oluştur
        createNewColumn: function() {
            const title = document.getElementById('newColumnTitle').value.trim();
            const titleEn = document.getElementById('newColumnTitleEn').value.trim();
            const type = document.getElementById('newColumnType').value;
            const width = document.getElementById('newColumnWidth').value.trim();
            const align = document.getElementById('newColumnAlign').value;
            const defaultValue = document.getElementById('newColumnDefaultValue').value.trim();
            const editable = document.getElementById('newColumnEditable').checked;
            const sortable = document.getElementById('newColumnSortable').checked;
            
            if (!title) {
                UIManager.showNotification('Sütun adı gereklidir', 'warning');
                return;
            }
            
            const columnData = {
                title: title,
                titleEn: titleEn || title,
                type: type,
                width: width || '150px',
                align: align,
                defaultValue: defaultValue,
                editable: editable,
                sortable: sortable
            };
            
            const columnId = this.addCustomColumn(columnData);
            
            UIManager.showNotification('Yeni sütun eklendi', 'success');
            UIManager.closeModal();
            
            // Tabloyu yenile
            this.refreshTable();
            
            return columnId;
        },
        
        // Özel sütunu düzenle
        editCustomColumn: function(columnId) {
            const column = this.getColumn(columnId);
            if (!column) return;
            
            const content = `
                <div class="edit-column-dialog">
                    <h3>Sütunu Düzenle</h3>
                    
                    <div class="form-group">
                        <label>Sütun Adı (Türkçe):</label>
                        <input type="text" id="editColumnTitle" value="${column.title}" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Sütun Adı (İngilizce):</label>
                        <input type="text" id="editColumnTitleEn" value="${column.titleEn || ''}">
                    </div>
                    
                    <div class="form-group">
                        <label>Genişlik:</label>
                        <input type="text" id="editColumnWidth" value="${column.width}">
                    </div>
                    
                    <div class="form-group">
                        <label>Hizalama:</label>
                        <select id="editColumnAlign">
                            <option value="left" ${column.align === 'left' ? 'selected' : ''}>Sol</option>
                            <option value="center" ${column.align === 'center' ? 'selected' : ''}>Merkez</option>
                            <option value="right" ${column.align === 'right' ? 'selected' : ''}>Sağ</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Varsayılan Değer:</label>
                        <input type="text" id="editColumnDefaultValue" value="${column.defaultValue || ''}">
                    </div>
                    
                    <div class="form-group">
                        <label class="checkbox-label">
                            <input type="checkbox" id="editColumnEditable" ${column.editable ? 'checked' : ''}>
                            Düzenlenebilir
                        </label>
                    </div>
                    
                    <div class="form-group">
                        <label class="checkbox-label">
                            <input type="checkbox" id="editColumnSortable" ${column.sortable ? 'checked' : ''}>
                            Sıralanabilir
                        </label>
                    </div>
                    
                    <div class="dialog-actions">
                        <button onclick="ColumnManager.updateColumn('${columnId}')" class="btn btn-primary">Güncelle</button>
                        <button onclick="UIManager.closeModal()" class="btn btn-secondary">İptal</button>
                    </div>
                </div>
            `;
            
            UIManager.openModal(content, 'Sütunu Düzenle');
        },
        
        // Sütunu güncelle
        updateColumn: function(columnId) {
            const updates = {
                title: document.getElementById('editColumnTitle').value.trim(),
                titleEn: document.getElementById('editColumnTitleEn').value.trim(),
                width: document.getElementById('editColumnWidth').value.trim(),
                align: document.getElementById('editColumnAlign').value,
                defaultValue: document.getElementById('editColumnDefaultValue').value.trim(),
                editable: document.getElementById('editColumnEditable').checked,
                sortable: document.getElementById('editColumnSortable').checked
            };
            
            if (!updates.title) {
                UIManager.showNotification('Sütun adı gereklidir', 'warning');
                return;
            }
            
            if (this.editColumn(columnId, updates)) {
                UIManager.showNotification('Sütun güncellendi', 'success');
                UIManager.closeModal();
                this.refreshTable();
            }
        },
        
        // Sütun ayarlarını uygula
        applyColumnSettings: function() {
            // Görünürlük ayarlarını uygula
            const checkboxes = document.querySelectorAll('.column-visibility-checkbox');
            checkboxes.forEach(checkbox => {
                const columnId = checkbox.dataset.columnId;
                const visible = checkbox.checked;
                this.toggleColumnVisibility(columnId, visible);
            });
            
            UIManager.showNotification('Sütun ayarları uygulandı', 'success');
            UIManager.closeModal();
        },
        
        // Sekme değişiminde sütun yapısını güncelle
        onTabChange: function(tabId) {
            if (typeof TabManager !== 'undefined') {
                const tab = TabManager.getActiveTab();
                if (tab && tab.type === 'filtered') {
                    // Filtrelenmiş sekmeler için özel sütun yapısı
                    this.updateFilteredTabColumns(tabId);
                }
            }
        },
        
        // Filtrelenmiş sekme sütunlarını güncelle
        updateFilteredTabColumns: function(tabId) {
            // Bu fonksiyon filtered tab'larda farklı sütun yapıları göstermek için kullanılabilir
        }
    };
    
    // Modülü window objesine bağla
    window.ColumnManager = ColumnManager;
    
})(window);