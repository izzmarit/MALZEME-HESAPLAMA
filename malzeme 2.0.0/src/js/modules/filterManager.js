// Filtreleme İşlemleri Modülü
(function(window) {
    'use strict';
    
    const FilterManager = {
        filters: [],
        activeFilters: new Map(),
        filterHistory: [],
        predefinedFilters: [],
        
        // Başlangıç
        initialize: function() {
            this.loadPredefinedFilters();
            this.loadFilterHistory();
            this.bindEvents();
        },
        
        // Önceden tanımlı filtreleri yükle
        loadPredefinedFilters: function() {
            this.predefinedFilters = [
                {
                    id: 'malzemeTuru',
                    title: 'Malzeme Türü',
                    titleEn: 'Material Type',
                    type: 'select',
                    field: 'malzemeTuru',
                    options: this.getMaterialTypes(),
                    multiple: true
                },
                {
                    id: 'malzemeCinsi',
                    title: 'Malzeme Cinsi',
                    titleEn: 'Material Grade',
                    type: 'select',
                    field: 'malzemeCinsi',
                    options: this.getMaterialGrades(),
                    multiple: true
                },
                {
                    id: 'agirlikAraligi',
                    title: 'Ağırlık Aralığı',
                    titleEn: 'Weight Range',
                    type: 'range',
                    field: 'toplamAgirlik',
                    min: 0,
                    max: 1000,
                    unit: 'kg'
                },
                {
                    id: 'adetAraligi',
                    title: 'Adet Aralığı',
                    titleEn: 'Quantity Range',
                    type: 'range',
                    field: 'adet',
                    min: 1,
                    max: 100,
                    unit: 'adet'
                },
                {
                    id: 'heatNo',
                    title: 'Heat No / Açıklama',
                    titleEn: 'Heat No / Description',
                    type: 'text',
                    field: 'heatNo',
                    placeholder: 'Heat numarası veya açıklama ara'
                },
                {
                    id: 'standart',
                    title: 'Standart',
                    titleEn: 'Standard',
                    type: 'select',
                    field: 'enNormu',
                    options: this.getStandards(),
                    multiple: true
                }
            ];
        },
        
        // Filtre geçmişini yükle
        loadFilterHistory: function() {
            const stored = localStorage.getItem('filterHistory');
            if (stored) {
                try {
                    this.filterHistory = JSON.parse(stored);
                } catch (error) {
                    console.error('Filtre geçmişi yüklenemedi:', error);
                    this.filterHistory = [];
                }
            }
        },
        
        // Filtre geçmişini kaydet
        saveFilterHistory: function() {
            // Son 20 filtreyi sakla
            const recentFilters = this.filterHistory.slice(-20);
            localStorage.setItem('filterHistory', JSON.stringify(recentFilters));
        },
        
        // Malzeme türlerini al
        getMaterialTypes: function() {
            const tableData = TableManager.getTableData();
            const types = new Set();
            
            tableData.forEach(row => {
                if (row.malzemeTuru) {
                    types.add(row.malzemeTuru);
                }
            });
            
            return Array.from(types).sort().map(type => ({
                value: type,
                label: type
            }));
        },
        
        // Malzeme cinslerini al
        getMaterialGrades: function() {
            const tableData = TableManager.getTableData();
            const grades = new Set();
            
            tableData.forEach(row => {
                if (row.malzemeCinsi) {
                    grades.add(row.malzemeCinsi);
                }
            });
            
            return Array.from(grades).sort().map(grade => ({
                value: grade,
                label: grade
            }));
        },
        
        // Standartları al
        getStandards: function() {
            const tableData = TableManager.getTableData();
            const standards = new Set();
            
            tableData.forEach(row => {
                if (row.enNormu && row.enNormu !== '-') {
                    standards.add(row.enNormu);
                }
            });
            
            return Array.from(standards).sort().map(std => ({
                value: std,
                label: std
            }));
        },
        
        // Filtre oluştur
        createFilter: function(config) {
            const filterId = this.generateFilterId();
            const filter = {
                id: filterId,
                name: config.name || 'Yeni Filtre',
                description: config.description || '',
                conditions: config.conditions || [],
                logic: config.logic || 'AND', // AND veya OR
                createdAt: new Date().toISOString(),
                isActive: false,
                resultCount: 0
            };
            
            this.filters.push(filter);
            return filterId;
        },
        
        // Filtre uygula
        applyFilter: function(data, filterConfig) {
            if (!filterConfig || !filterConfig.conditions || filterConfig.conditions.length === 0) {
                return data;
            }
            
            return data.filter(row => {
                const results = filterConfig.conditions.map(condition => {
                    return this.evaluateCondition(row, condition);
                });
                
                // Mantıksal işlem uygula
                if (filterConfig.logic === 'OR') {
                    return results.some(result => result);
                } else {
                    return results.every(result => result);
                }
            });
        },
        
        // Koşulu değerlendir
        evaluateCondition: function(row, condition) {
            const fieldValue = this.getFieldValue(row, condition.field);
            const filterValue = condition.value;
            
            switch (condition.operator) {
                case 'equals':
                    return fieldValue === filterValue;
                    
                case 'not_equals':
                    return fieldValue !== filterValue;
                    
                case 'contains':
                    if (typeof fieldValue === 'string') {
                        return fieldValue.toLowerCase().includes(filterValue.toLowerCase());
                    }
                    return false;
                    
                case 'not_contains':
                    if (typeof fieldValue === 'string') {
                        return !fieldValue.toLowerCase().includes(filterValue.toLowerCase());
                    }
                    return true;
                    
                case 'starts_with':
                    if (typeof fieldValue === 'string') {
                        return fieldValue.toLowerCase().startsWith(filterValue.toLowerCase());
                    }
                    return false;
                    
                case 'ends_with':
                    if (typeof fieldValue === 'string') {
                        return fieldValue.toLowerCase().endsWith(filterValue.toLowerCase());
                    }
                    return false;
                    
                case 'greater_than':
                    return parseFloat(fieldValue) > parseFloat(filterValue);
                    
                case 'less_than':
                    return parseFloat(fieldValue) < parseFloat(filterValue);
                    
                case 'greater_equal':
                    return parseFloat(fieldValue) >= parseFloat(filterValue);
                    
                case 'less_equal':
                    return parseFloat(fieldValue) <= parseFloat(filterValue);
                    
                case 'between':
                    const numValue = parseFloat(fieldValue);
                    return numValue >= parseFloat(filterValue.min) && numValue <= parseFloat(filterValue.max);
                    
                case 'in':
                    if (Array.isArray(filterValue)) {
                        return filterValue.includes(fieldValue);
                    }
                    return fieldValue === filterValue;
                    
                case 'not_in':
                    if (Array.isArray(filterValue)) {
                        return !filterValue.includes(fieldValue);
                    }
                    return fieldValue !== filterValue;
                    
                case 'empty':
                    return !fieldValue || fieldValue === '' || fieldValue === '-';
                    
                case 'not_empty':
                    return fieldValue && fieldValue !== '' && fieldValue !== '-';
                    
                default:
                    return false;
            }
        },
        
        // Alan değerini al
        getFieldValue: function(row, fieldPath) {
            const keys = fieldPath.split('.');
            let value = row;
            
            for (const key of keys) {
                if (value && typeof value === 'object') {
                    value = value[key];
                } else {
                    return undefined;
                }
            }
            
            return value;
        },
        
        // Hızlı filtre uygula (malzeme türü bazında)
        applyQuickFilter: function(filterType, filterValue) {
            const tableData = TableManager.getTableData();
            
            const filterConfig = {
                conditions: [{
                    field: filterType,
                    operator: filterType === 'malzemeTuru' ? 'equals' : 'contains',
                    value: filterValue
                }],
                logic: 'AND'
            };
            
            const filteredData = this.applyFilter(tableData, filterConfig);
            
            // Yeni sekme oluştur
            const tabTitle = `${filterType}: ${filterValue}`;
            const tabId = TabManager.createTab(tabTitle, 'filtered', {
                filterType: filterType,
                filterValue: filterValue,
                filterConfig: filterConfig,
                items: filteredData
            });
            
            // Filtre geçmişine ekle
            this.addToFilterHistory({
                type: 'quick',
                field: filterType,
                value: filterValue,
                resultCount: filteredData.length,
                timestamp: new Date().toISOString()
            });
            
            return { tabId, resultCount: filteredData.length };
        },
        
        // Gelişmiş filtre dialogunu göster
        showAdvancedFilterDialog: function() {
            const content = `
                <div class="advanced-filter-dialog">
                    <div class="filter-builder">
                        <div class="filter-header">
                            <h3>Gelişmiş Filtre</h3>
                            <div class="filter-actions">
                                <button class="btn-load-filter">Kayıtlı Filtre Yükle</button>
                                <button class="btn-save-filter" style="display: none;">Filtreyi Kaydet</button>
                            </div>
                        </div>
                        
                        <div class="filter-conditions" id="filterConditions">
                            <div class="filter-condition" data-condition-index="0">
                                ${this.createConditionHtml(0)}
                            </div>
                        </div>
                        
                        <div class="filter-controls">
                            <button class="btn-add-condition" onclick="FilterManager.addCondition()">+ Koşul Ekle</button>
                            <select class="filter-logic" id="filterLogic">
                                <option value="AND">Tüm koşullar (VE)</option>
                                <option value="OR">Herhangi bir koşul (VEYA)</option>
                            </select>
                        </div>
                        
                        <div class="filter-preview">
                            <div class="preview-header">
                                <span>Önizleme:</span>
                                <span class="preview-count" id="previewCount">0 sonuç</span>
                            </div>
                            <div class="preview-items" id="previewItems">
                                <!-- Önizleme öğeleri buraya gelecek -->
                            </div>
                        </div>
                        
                        <div class="dialog-actions">
                            <button onclick="FilterManager.applyAdvancedFilter()" class="btn btn-primary">Filtre Uygula</button>
                            <button onclick="FilterManager.previewFilter()" class="btn btn-secondary">Önizleme</button>
                            <button onclick="UIManager.closeModal()" class="btn btn-cancel">İptal</button>
                        </div>
                    </div>
                </div>
            `;
            
            UIManager.openModal(content, 'Gelişmiş Filtre');
            this.bindAdvancedFilterEvents();
        },
        
        // Koşul HTML'i oluştur
        createConditionHtml: function(index) {
            const fields = this.getAvailableFields();
            const operators = this.getOperators();
            
            return `
                <div class="condition-row">
                    <select class="condition-field" data-index="${index}" onchange="FilterManager.onFieldChange(${index})">
                        <option value="">Alan Seçin</option>
                        ${fields.map(field => `<option value="${field.value}">${field.label}</option>`).join('')}
                    </select>
                    
                    <select class="condition-operator" data-index="${index}" onchange="FilterManager.onOperatorChange(${index})">
                        <option value="">Operatör</option>
                        ${operators.map(op => `<option value="${op.value}">${op.label}</option>`).join('')}
                    </select>
                    
                    <div class="condition-value" data-index="${index}">
                        <input type="text" class="value-input" placeholder="Değer girin">
                    </div>
                    
                    <button class="btn-remove-condition" onclick="FilterManager.removeCondition(${index})" 
                            style="${index === 0 ? 'display: none;' : ''}">×</button>
                </div>
            `;
        },
        
        // Mevcut alanları al
        getAvailableFields: function() {
            const columns = ColumnManager ? ColumnManager.getVisibleColumns() : this.getDefaultFields();
            
            return columns.filter(col => col.id !== 'actions').map(col => ({
                value: col.id,
                label: col.title,
                type: col.type
            }));
        },
        
        // Varsayılan alanlar
        getDefaultFields: function() {
            return [
                { id: 'pNo', title: 'P.No', type: 'number' },
                { id: 'adet', title: 'Adet', type: 'number' },
                { id: 'malzemeTuru', title: 'Malzeme Türü', type: 'text' },
                { id: 'malzemeCinsi', title: 'Malzeme Cinsi', type: 'text' },
                { id: 'birimAgirlik', title: 'Birim Ağırlık', type: 'decimal' },
                { id: 'toplamAgirlik', title: 'Toplam Ağırlık', type: 'decimal' }
            ];
        },
        
        // Operatörleri al
        getOperators: function() {
            return [
                { value: 'equals', label: 'Eşit' },
                { value: 'not_equals', label: 'Eşit değil' },
                { value: 'contains', label: 'İçerir' },
                { value: 'not_contains', label: 'İçermez' },
                { value: 'starts_with', label: 'İle başlar' },
                { value: 'ends_with', label: 'İle biter' },
                { value: 'greater_than', label: 'Büyük' },
                { value: 'less_than', label: 'Küçük' },
                { value: 'greater_equal', label: 'Büyük eşit' },
                { value: 'less_equal', label: 'Küçük eşit' },
                { value: 'between', label: 'Arasında' },
                { value: 'in', label: 'Listede' },
                { value: 'not_in', label: 'Listede değil' },
                { value: 'empty', label: 'Boş' },
                { value: 'not_empty', label: 'Boş değil' }
            ];
        },
        
        // Alan değişikliği
        onFieldChange: function(index) {
            const fieldSelect = document.querySelector(`.condition-field[data-index="${index}"]`);
            const field = fieldSelect.value;
            
            if (field) {
                this.updateOperatorsForField(index, field);
                this.updateValueInputForField(index, field);
            }
        },
        
        // Operatör değişikliği
        onOperatorChange: function(index) {
            const operatorSelect = document.querySelector(`.condition-operator[data-index="${index}"]`);
            const fieldSelect = document.querySelector(`.condition-field[data-index="${index}"]`);
            
            const operator = operatorSelect.value;
            const field = fieldSelect.value;
            
            if (operator && field) {
                this.updateValueInputForOperator(index, field, operator);
            }
        },
        
        // Alan için operatörleri güncelle
        updateOperatorsForField: function(index, field) {
            const fieldInfo = this.getAvailableFields().find(f => f.value === field);
            const operatorSelect = document.querySelector(`.condition-operator[data-index="${index}"]`);
            
            let availableOperators = this.getOperators();
            
            // Alan tipine göre operatörleri filtrele
            if (fieldInfo) {
                if (fieldInfo.type === 'number' || fieldInfo.type === 'decimal') {
                    availableOperators = availableOperators.filter(op => 
                        ['equals', 'not_equals', 'greater_than', 'less_than', 'greater_equal', 'less_equal', 'between', 'empty', 'not_empty'].includes(op.value)
                    );
                }
            }
            
            operatorSelect.innerHTML = '<option value="">Operatör</option>' + 
                availableOperators.map(op => `<option value="${op.value}">${op.label}</option>`).join('');
        },
        
        // Alan için değer girişini güncelle
        updateValueInputForField: function(index, field) {
            const fieldInfo = this.getAvailableFields().find(f => f.value === field);
            const valueContainer = document.querySelector(`.condition-value[data-index="${index}"]`);
            
            let inputHtml = '<input type="text" class="value-input" placeholder="Değer girin">';
            
            if (fieldInfo) {
                switch (fieldInfo.type) {
                    case 'number':
                        inputHtml = '<input type="number" class="value-input" placeholder="Sayı girin">';
                        break;
                    case 'decimal':
                        inputHtml = '<input type="number" step="0.01" class="value-input" placeholder="Ondalık sayı girin">';
                        break;
                    case 'date':
                        inputHtml = '<input type="date" class="value-input">';
                        break;
                }
                
                // Özel alanlar için select kutuları
                if (field === 'malzemeTuru') {
                    const options = this.getMaterialTypes();
                    inputHtml = `<select class="value-input" multiple>
                        ${options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('')}
                    </select>`;
                } else if (field === 'malzemeCinsi') {
                    const options = this.getMaterialGrades();
                    inputHtml = `<select class="value-input" multiple>
                        ${options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('')}
                    </select>`;
                }
            }
            
            valueContainer.innerHTML = inputHtml;
        },
        
        // Operatör için değer girişini güncelle
        updateValueInputForOperator: function(index, field, operator) {
            const valueContainer = document.querySelector(`.condition-value[data-index="${index}"]`);
            
            if (operator === 'between') {
                valueContainer.innerHTML = `
                    <div class="range-inputs">
                        <input type="number" class="value-input value-min" placeholder="Min">
                        <span>-</span>
                        <input type="number" class="value-input value-max" placeholder="Max">
                    </div>
                `;
            } else if (operator === 'empty' || operator === 'not_empty') {
                valueContainer.innerHTML = '<span class="no-value">Değer gerekmez</span>';
            }
        },
        
        // Koşul ekle
        addCondition: function() {
            const conditionsContainer = document.getElementById('filterConditions');
            const conditionCount = conditionsContainer.children.length;
            
            const conditionDiv = document.createElement('div');
            conditionDiv.className = 'filter-condition';
            conditionDiv.setAttribute('data-condition-index', conditionCount);
            conditionDiv.innerHTML = this.createConditionHtml(conditionCount);
            
            conditionsContainer.appendChild(conditionDiv);
        },
        
        // Koşul kaldır
        removeCondition: function(index) {
            const condition = document.querySelector(`[data-condition-index="${index}"]`);
            if (condition) {
                condition.remove();
                this.reindexConditions();
            }
        },
        
        // Koşulları yeniden indeksle
        reindexConditions: function() {
            const conditions = document.querySelectorAll('.filter-condition');
            conditions.forEach((condition, index) => {
                condition.setAttribute('data-condition-index', index);
                
                // İçerideki elementleri güncelle
                const elements = condition.querySelectorAll('[data-index]');
                elements.forEach(element => {
                    element.setAttribute('data-index', index);
                });
                
                // Onclick event'leri güncelle
                const removeBtn = condition.querySelector('.btn-remove-condition');
                if (removeBtn) {
                    removeBtn.setAttribute('onclick', `FilterManager.removeCondition(${index})`);
                    removeBtn.style.display = index === 0 ? 'none' : 'inline-block';
                }
            });
        },
        
        // Filtreyi önizle
        previewFilter: function() {
            const filterConfig = this.buildFilterConfig();
            const tableData = TableManager.getTableData();
            const filteredData = this.applyFilter(tableData, filterConfig);
            
            const previewCount = document.getElementById('previewCount');
            const previewItems = document.getElementById('previewItems');
            
            previewCount.textContent = `${filteredData.length} sonuç`;
            
            // İlk 10 sonucu göster
            const preview = filteredData.slice(0, 10);
            previewItems.innerHTML = preview.map(item => `
                <div class="preview-item">
                    <span class="item-no">${item.pNo}</span>
                    <span class="item-type">${item.malzemeTuru}</span>
                    <span class="item-grade">${item.malzemeCinsi}</span>
                    <span class="item-weight">${item.toplamAgirlik} kg</span>
                </div>
            `).join('');
            
            if (filteredData.length > 10) {
                previewItems.innerHTML += `<div class="preview-more">... ve ${filteredData.length - 10} sonuç daha</div>`;
            }
        },
        
        // Gelişmiş filtreyi uygula
        applyAdvancedFilter: function() {
            const filterConfig = this.buildFilterConfig();
            const tableData = TableManager.getTableData();
            const filteredData = this.applyFilter(tableData, filterConfig);
            
            if (filteredData.length === 0) {
                UIManager.showNotification('Filtre kriterlere uygun sonuç bulunamadı', 'warning');
                return;
            }
            
            // Yeni sekme oluştur
            const tabTitle = `Gelişmiş Filtre (${filteredData.length} sonuç)`;
            const tabId = TabManager.createTab(tabTitle, 'filtered', {
                filterType: 'advanced',
                filterConfig: filterConfig,
                items: filteredData
            });
            
            // Filtre geçmişine ekle
            this.addToFilterHistory({
                type: 'advanced',
                config: filterConfig,
                resultCount: filteredData.length,
                timestamp: new Date().toISOString()
            });
            
            UIManager.closeModal();
            UIManager.showNotification(`${filteredData.length} sonuç yeni sekmede gösteriliyor`, 'success');
        },
        
        // Filtre konfigürasyonunu oluştur
        buildFilterConfig: function() {
            const conditions = [];
            const conditionElements = document.querySelectorAll('.filter-condition');
            
            conditionElements.forEach((element, index) => {
                const field = element.querySelector(`.condition-field[data-index="${index}"]`).value;
                const operator = element.querySelector(`.condition-operator[data-index="${index}"]`).value;
                
                if (!field || !operator) return;
                
                let value = null;
                
                if (operator === 'empty' || operator === 'not_empty') {
                    value = null;
                } else if (operator === 'between') {
                    const minInput = element.querySelector('.value-min');
                    const maxInput = element.querySelector('.value-max');
                    
                    if (minInput && maxInput) {
                        value = {
                            min: minInput.value,
                            max: maxInput.value
                        };
                    }
                } else {
                    const valueInput = element.querySelector('.value-input');
                    if (valueInput) {
                        if (valueInput.multiple) {
                            // Multi-select için seçili değerleri al
                            value = Array.from(valueInput.selectedOptions).map(option => option.value);
                        } else {
                            value = valueInput.value;
                        }
                    }
                }
                
                conditions.push({
                    field: field,
                    operator: operator,
                    value: value
                });
            });
            
            const logic = document.getElementById('filterLogic').value || 'AND';
            
            return {
                conditions: conditions,
                logic: logic
            };
        },
        
        // Filtre geçmişine ekle
        addToFilterHistory: function(filterData) {
            this.filterHistory.push(filterData);
            this.saveFilterHistory();
        },
        
        // Filtre ID'si oluştur
        generateFilterId: function() {
            return 'filter_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        },
        
        // Event'ları bağla
        bindEvents: function() {
            // Ana tabloya filtre butonları ekle
            this.addFilterButtonsToTable();
        },
        
        // Ana tabloya filtre butonları ekle
        addFilterButtonsToTable: function() {
            const tableHeader = document.querySelector('.right-panel .panel-header');
            if (!tableHeader) return;
            
            const filterButtons = document.createElement('div');
            filterButtons.className = 'table-filter-buttons';
            filterButtons.innerHTML = `
                <button class="btn-quick-filter" title="Hızlı Filtre">🔍</button>
                <button class="btn-advanced-filter" title="Gelişmiş Filtre">⚙️🔍</button>
                <button class="btn-clear-filters" title="Filtreleri Temizle">❌</button>
            `;
            
            tableHeader.appendChild(filterButtons);
            
            // Event listener'ları ekle
            filterButtons.querySelector('.btn-quick-filter').addEventListener('click', () => {
                this.showQuickFilterMenu();
            });
            
            filterButtons.querySelector('.btn-advanced-filter').addEventListener('click', () => {
                this.showAdvancedFilterDialog();
            });
            
            filterButtons.querySelector('.btn-clear-filters').addEventListener('click', () => {
                this.clearAllFilters();
            });
        },
        
        // Hızlı filtre menüsünü göster
        showQuickFilterMenu: function() {
            const materialTypes = this.getMaterialTypes();
            
            const menuHtml = `
                <div class="quick-filter-menu">
                    <h4>Hızlı Filtre</h4>
                    <div class="quick-filter-section">
                        <h5>Malzeme Türü:</h5>
                        <div class="filter-options">
                            ${materialTypes.map(type => `
                                <button class="filter-option-btn" 
                                        data-filter-type="malzemeTuru" 
                                        data-filter-value="${type.value}">
                                    ${type.label}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
            
            // Geçici popup oluştur
            this.showQuickFilterPopup(menuHtml);
        },
        
        // Hızlı filtre popup'ını göster
        showQuickFilterPopup: function(content) {
            // Mevcut popup'ı kaldır
            const existingPopup = document.querySelector('.quick-filter-popup');
            if (existingPopup) {
                existingPopup.remove();
            }
            
            const popup = document.createElement('div');
            popup.className = 'quick-filter-popup';
            popup.innerHTML = content;
            
            document.body.appendChild(popup);
            
            // Event listener'ları ekle
            popup.addEventListener('click', (e) => {
                if (e.target.classList.contains('filter-option-btn')) {
                    const filterType = e.target.dataset.filterType;
                    const filterValue = e.target.dataset.filterValue;
                    
                    this.applyQuickFilter(filterType, filterValue);
                    popup.remove();
                }
            });
            
            // Dışarı tıklamada kapat
            setTimeout(() => {
                document.addEventListener('click', function closePopup(e) {
                    if (!popup.contains(e.target)) {
                        popup.remove();
                        document.removeEventListener('click', closePopup);
                    }
                });
            }, 100);
        },
        
        // Gelişmiş filtre event'larını bağla
        bindAdvancedFilterEvents: function() {
            // Bu fonksiyon showAdvancedFilterDialog içinde çağrılıyor
        },
        
        // Tüm filtreleri temizle
        clearAllFilters: function() {
            this.activeFilters.clear();
            
            // Filtrelenmiş sekmeleri kapat (ana sekme hariç)
            if (typeof TabManager !== 'undefined') {
                const tabs = TabManager.getAllTabs();
                tabs.forEach(tab => {
                    if (tab.type === 'filtered') {
                        TabManager.closeTab(tab.id);
                    }
                });
            }
            
            UIManager.showNotification('Filtreler temizlendi', 'success');
        },
        
        // Filtrelenmiş veriyi Excel'e aktar
        exportFilteredToExcel: function(filteredData, title) {
            if (typeof ExcelManager !== 'undefined') {
                ExcelManager.exportFilteredData(filteredData, title);
            }
        }
    };
    
    // Modülü window objesine bağla
    window.FilterManager = FilterManager;
    
})(window);