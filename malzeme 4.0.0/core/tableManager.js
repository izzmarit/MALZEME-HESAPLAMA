(function(window) {
    'use strict';
    
    const TableManager = {
        pNoCounter: 1,
        tableData: [],
        editingIndex: null,
        originalAddHandler: null,

        initialize() {
            const btnEkle = document.getElementById('btnEkle');
            if (btnEkle) {
                this.originalAddHandler = () => this.addRow();
                btnEkle.onclick = this.originalAddHandler;
            }
            
            this.setupDragAndDrop();
        },

        setupDragAndDrop() {
            this.draggedIndex = null;
            this.dragOverIndex = null;
        },

        addRow() {
            if (this.editingIndex !== null) {
                this.updateRow();
                return false;
            }
            
            const materialType = document.getElementById('malzemeTuru').value;
            if (!materialType) {
                window.UIManager.showNotification('Lütfen malzeme türü seçin', 'warning');
                return false;
            }

            const formData = window.ApplicationController.collectFormData();
            
            if (!window.MaterialRegistry.has(materialType)) {
                window.UIManager.showNotification('Malzeme türü bulunamadı', 'error');
                return false;
            }

            const MaterialClass = window.MaterialRegistry.get(materialType);
            const instance = new MaterialClass();
            
            const validation = instance.validate(formData);
            if (!validation.isValid) {
                window.UIManager.showNotification(validation.message, 'warning');
                return false;
            }
            
            const calculation = instance.calculate(formData);
            if (!calculation) {
                window.UIManager.showNotification('Hesaplama yapılamadı', 'error');
                return false;
            }
            
            const rowData = instance.formatRow(formData, calculation);
            rowData.pNo = this.pNoCounter++;
            rowData.adet = formData.adet;
            rowData.heatNo = formData.heatNo || '-';
            rowData.isRevision = false;
            
            this.tableData.push(rowData);
            this.renderTable();
            this.updateSummary();
            
            window.ApplicationController.clearFormPartial();
            window.UIManager.showNotification('Malzeme tabloya eklendi', 'success');

            // Filtrelenmiş sekmeleri güncelle
            if (window.UIManager && typeof window.UIManager.refreshAllFilteredTabs === 'function') {
                window.UIManager.refreshAllFilteredTabs();
            }
            
            return true;
        },

        updateRow() {
            if (this.editingIndex === null) {
                window.UIManager.showNotification('Düzenleme modu aktif değil', 'warning');
                return false;
            }
            
            const index = this.editingIndex;
            const materialType = document.getElementById('malzemeTuru').value;
            
            if (!materialType) {
                window.UIManager.showNotification('Lütfen malzeme türü seçin', 'warning');
                return false;
            }
            
            const formData = window.ApplicationController.collectFormData();
            
            if (!window.MaterialRegistry.has(materialType)) {
                window.UIManager.showNotification('Malzeme türü bulunamadı', 'error');
                return false;
            }

            const MaterialClass = window.MaterialRegistry.get(materialType);
            const instance = new MaterialClass();
            
            const validation = instance.validate(formData);
            if (!validation.isValid) {
                window.UIManager.showNotification(validation.message, 'warning');
                return false;
            }
            
            const calculation = instance.calculate(formData);
            if (!calculation) {
                window.UIManager.showNotification('Hesaplama yapılamadı', 'error');
                return false;
            }
            
            const updatedRow = instance.formatRow(formData, calculation);
            
            updatedRow.pNo = this.tableData[index].pNo;
            updatedRow.adet = formData.adet;
            updatedRow.heatNo = formData.heatNo || '-';
            updatedRow.isRevision = this.tableData[index].isRevision;
            
            this.tableData[index] = updatedRow;
            
            this.exitEditMode();
            
            this.renderTable();
            this.updateSummary();
            
            window.ApplicationController.clearForm();
            
            window.UIManager.showNotification('Satır güncellendi', 'success');

            // Filtrelenmiş sekmeleri güncelle
            if (window.UIManager && typeof window.UIManager.refreshAllFilteredTabs === 'function') {
                window.UIManager.refreshAllFilteredTabs();
            }
            return true;
        },

        editRow(index) {
            if (index < 0 || index >= this.tableData.length) {
                window.UIManager.showNotification('Geçersiz satır', 'error');
                return;
            }
            
            const row = this.tableData[index];
            const materialType = row.originalType;
            
            if (!window.MaterialRegistry.has(materialType)) {
                window.UIManager.showNotification('Malzeme türü bulunamadı', 'error');
                return;
            }

            window.ApplicationController.clearForm();
            document.getElementById('malzemeTuru').value = materialType;
            window.ApplicationController.onMaterialTypeChange(materialType);
            
            setTimeout(() => {
                const MaterialClass = window.MaterialRegistry.get(materialType);
                const instance = new MaterialClass();
                instance.fillFormFromRow(row);
                
                document.getElementById('adet').value = row.adet;
                document.getElementById('heatNo').value = row.heatNo === '-' ? '' : row.heatNo;
                document.getElementById('malzemeCinsi').value = row.originalGrade;
                
                this.setEditMode(index);
                
            }, 100);
        },

        setEditMode(index) {
            this.editingIndex = index;
            this.renderTable();
            
            const btnEkle = document.getElementById('btnEkle');
            if (btnEkle) {
                btnEkle.onclick = null;
                
                btnEkle.innerHTML = '<span class="btn-icon">💾</span> Güncelle';
                btnEkle.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.updateRow();
                };
            }
        },

        exitEditMode() {
            this.editingIndex = null;
            
            const btnEkle = document.getElementById('btnEkle');
            if (btnEkle) {
                btnEkle.onclick = null;
                
                btnEkle.innerHTML = '<span class="btn-icon">➕</span> Tabloya Ekle';
                btnEkle.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.addRow();
                };
            }
        },

        deleteRow(index) {
            window.UIManager.confirmAction('Bu satırı silmek istediğinizden emin misiniz?', () => {
                if (this.editingIndex === index) {
                    this.exitEditMode();
                } else if (this.editingIndex !== null && this.editingIndex > index) {
                    this.editingIndex--;
                }
                
                this.tableData.splice(index, 1);
                this.reorderPNo();
                this.renderTable();
                this.updateSummary();
                
                window.UIManager.showNotification('Satır silindi', 'success');
                // Filtrelenmiş sekmeleri güncelle
                if (window.UIManager && typeof window.UIManager.refreshAllFilteredTabs === 'function') {
                    window.UIManager.refreshAllFilteredTabs();
                }
            });
        },

        toggleRevision(index) {
            if (index < 0 || index >= this.tableData.length) return;
            
            this.tableData[index].isRevision = !this.tableData[index].isRevision;
            this.renderTable();
            
            const status = this.tableData[index].isRevision ? 'işaretlendi' : 'kaldırıldı';
            window.UIManager.showNotification(`Revizyon ${status}`, 'info');

            // Filtrelenmiş sekmeleri güncelle
            if (window.UIManager && typeof window.UIManager.refreshAllFilteredTabs === 'function') {
                window.UIManager.refreshAllFilteredTabs();
            }
        },

        reorderPNo() {
            this.tableData.forEach((row, index) => {
                row.pNo = index + 1;
            });
            this.pNoCounter = this.tableData.length + 1;
        },

        renderTable() {
            const tbody = document.getElementById('tabloGovdesi');
            if (!tbody) return;
            
            tbody.innerHTML = '';
            
            this.tableData.forEach((row, index) => {
                const tr = document.createElement('tr');
                
                tr.draggable = true;
                tr.dataset.index = index;
                
                if (index === this.editingIndex) {
                    tr.classList.add('editing');
                }
                
                if (row.isRevision) {
                    tr.classList.add('revision-row');
                }
                
                const suHacmiDisplay = row.suHacmi !== '-' ? 
                    parseFloat(row.suHacmi).toFixed(2) : '-';
                
                const revisionStyle = row.isRevision ? 'style="color: #FF0000 !important;"' : '';
                
                tr.innerHTML = `
                    <td ${revisionStyle}>
                        <span class="drag-handle" title="Sürükle">⋮⋮</span>
                        ${row.pNo}
                    </td>
                    <td ${revisionStyle}>${row.adet}</td>
                    <td ${revisionStyle}>${row.malzemeTuru}</td>
                    <td ${revisionStyle}>${row.malzemeCinsi}</td>
                    <td ${revisionStyle}>${row.olculer}</td>
                    <td ${revisionStyle}>${row.enNormu}</td>
                    <td ${revisionStyle}>${suHacmiDisplay}</td>
                    <td ${revisionStyle}>${row.birimAgirlik}</td>
                    <td ${revisionStyle}>${row.toplamAgirlik}</td>
                    <td ${revisionStyle}>${row.heatNo}</td>
                    <td>
                        <div class="table-action-buttons">
                            <button class="btn-edit" onclick="TableManager.editRow(${index})">
                                <span>Düzenle</span>
                            </button>
                            <button class="btn-revision ${row.isRevision ? 'active' : ''}" 
                                    onclick="TableManager.toggleRevision(${index})">
                                <span>Revizyon</span>
                            </button>
                            <button class="btn-delete" onclick="TableManager.deleteRow(${index})">
                                <span>Sil</span>
                            </button>
                        </div>
                    </td>
                `;
                
                tr.addEventListener('dragstart', (e) => this.handleDragStart(e, index));
                tr.addEventListener('dragover', (e) => this.handleDragOver(e, index));
                tr.addEventListener('drop', (e) => this.handleDrop(e, index));
                tr.addEventListener('dragend', (e) => this.handleDragEnd(e));
                tr.addEventListener('dragleave', (e) => this.handleDragLeave(e));
                
                tbody.appendChild(tr);
            });
        },

        handleDragStart(e, index) {
            if (this.editingIndex !== null) {
                e.preventDefault();
                window.UIManager.showNotification('Düzenleme modundayken satır taşınamaz', 'warning');
                return;
            }
            
            this.draggedIndex = index;
            e.currentTarget.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', e.currentTarget.innerHTML);
            
            e.dataTransfer.setDragImage(e.currentTarget, 0, 0);
        },

        handleDragOver(e, index) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            
            e.dataTransfer.dropEffect = 'move';
            
            const targetRow = e.currentTarget;
            if (this.draggedIndex !== index) {
                targetRow.classList.add('drag-over');
                this.dragOverIndex = index;
            }
            
            return false;
        },

        handleDragLeave(e) {
            e.currentTarget.classList.remove('drag-over');
        },

        handleDrop(e, index) {
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            
            e.preventDefault();
            
            if (this.draggedIndex !== null && this.draggedIndex !== index) {
                const draggedItem = this.tableData[this.draggedIndex];
                
                this.tableData.splice(this.draggedIndex, 1);
                
                this.tableData.splice(index, 0, draggedItem);
                
                this.reorderPNo();
                
                this.renderTable();
                this.updateSummary();
                
                window.UIManager.showNotification('Satır taşındı', 'success');

                // Filtrelenmiş sekmeleri güncelle
                if (window.UIManager && typeof window.UIManager.refreshAllFilteredTabs === 'function') {
                    window.UIManager.refreshAllFilteredTabs();
                }
            }
            
            return false;
        },

        handleDragEnd(e) {
            const rows = document.querySelectorAll('#tabloGovdesi tr');
            rows.forEach(row => {
                row.classList.remove('dragging');
                row.classList.remove('drag-over');
            });
            
            this.draggedIndex = null;
            this.dragOverIndex = null;
        },

        updateSummary() {
            let toplamAgirlik = 0;
            let toplamParca = 0;
            
            this.tableData.forEach(row => {
                toplamParca += parseFloat(row.adet) || 0;
                toplamAgirlik += parseFloat(row.toplamAgirlik) || 0;
            });
            
            document.getElementById('toplamParca').textContent = toplamParca;
            document.getElementById('genelToplamAgirlik').textContent = 
                toplamAgirlik.toFixed(2) + ' kg';
        },

        clearTable(showConfirm = true) {
            if (this.tableData.length === 0) {
                window.UIManager.showNotification('Temizlenecek veri yok', 'info');
                return;
            }
            
            const doClear = () => {
                this.tableData = [];
                this.pNoCounter = 1;
                this.exitEditMode();
                this.renderTable();
                this.updateSummary();
                window.UIManager.showNotification('Tablo temizlendi', 'success');
            };
            
            if (showConfirm) {
                window.UIManager.confirmAction(
                    'Tüm tablo verilerini silmek istediğinizden emin misiniz?',
                    doClear
                );
            } else {
                doClear();
            }
        },

        updateLanguage() {
            this.tableData.forEach(row => {
                if (row.originalType && window.MaterialRegistry.has(row.originalType)) {
                    const MaterialClass = window.MaterialRegistry.get(row.originalType);
                    const instance = new MaterialClass();
                    
                    // Malzeme türünü güncelle
                    if (typeof instance.getDisplayTypeFromRow === 'function') {
                        row.malzemeTuru = instance.getDisplayTypeFromRow(row);
                    } else {
                        row.malzemeTuru = instance.getDisplayName();
                    }
                    
                    // ÖLÇÜLER ALANINI GÜNCELLE - DİL DESTEĞİ İÇİN
                    if (row.formData && typeof instance.formatDimensions === 'function') {
                        row.olculer = instance.formatDimensions(row.formData);
                    }
                }
            });
            this.renderTable();
        },

        getTableData() {
            return this.tableData;
        },

        loadTableData(data) {
            this.exitEditMode();
            this.tableData = data;
            this.pNoCounter = data.length + 1;
            this.renderTable();
            this.updateSummary();

            // Filtrelenmiş sekmeleri güncelle
            if (window.UIManager && typeof window.UIManager.refreshAllFilteredTabs === 'function') {
                window.UIManager.refreshAllFilteredTabs();
            }
        },

        getProjectInfo() {
            return {
                projeAdi: document.getElementById('projeAdi')?.value || '',
                siparisNo: document.getElementById('siparisNo')?.value || '',
                resimAciklamasi: document.getElementById('resimAciklamasi')?.value || '',
                resimNo: document.getElementById('resimNo')?.value || '',
                revizyonNo: document.getElementById('revizyonNo')?.value || '',
                hazirlayan: document.getElementById('hazirlayan')?.value || '',
                kontrol: document.getElementById('kontrol')?.value || ''
            };
        },

        loadProjectInfo(info) {
            Object.keys(info).forEach(key => {
                const element = document.getElementById(key);
                if (element) {
                    element.value = info[key] || '';
                }
            });
        },

        getNotesRevisions() {
            return {
                notlar: document.getElementById('notlar')?.value || '',
                revizyonlar: document.getElementById('revizyonlar')?.value || ''
            };
        },

        loadNotesRevisions(data) {
            if (data.notlar !== undefined) {
                const notlar = document.getElementById('notlar');
                if (notlar) notlar.value = data.notlar;
            }
            
            if (data.revizyonlar !== undefined) {
                const revizyonlar = document.getElementById('revizyonlar');
                if (revizyonlar) revizyonlar.value = data.revizyonlar;
            }
        }
    };

    TableManager.initialize();

    window.TableManager = TableManager;

})(window);