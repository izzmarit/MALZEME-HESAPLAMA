/**
 * Table Manager - Güncellenmiş Versiyon
 * Su hacmi formatlaması ve revizyon renklendirmesi düzeltildi
 */

(function(window) {
    'use strict';
    
    const TableManager = {
        pNoCounter: 1,
        tableData: [],
        editingIndex: undefined,

        // Satır ekle - SU HACMİ FORMATLAMA EKLENDI
        addRow: function() {
            // Eğer düzenleme modundaysa, güncelleme yap
            if (this.editingIndex !== undefined) {
                return this.updateRow();
            }
            
            const materialType = document.getElementById('malzemeTuru').value;
            
            if (!materialType) {
                window.UIManager?.showNotification('Lütfen malzeme türü seçin', 'warning');
                return false;
            }

            const formData = window.ApplicationController.collectFormData();
            const rowData = window.MaterialRegistry.addToTable(materialType, formData);
            
            if (!rowData) return false;

            // P.No ve diğer alanları ekle
            rowData.pNo = this.pNoCounter;
            rowData.adet = formData.adet;
            rowData.heatNo = formData.heatNo || '-';
            rowData.isRevision = false;
            
            // Su hacmi formatlaması
            if (rowData.suHacmi && rowData.suHacmi !== '-') {
                const suHacmiValue = parseFloat(rowData.suHacmi);
                rowData.suHacmi = suHacmiValue.toFixed(2);
            }

            this.tableData.push(rowData);
            this.pNoCounter++;
            
            this.renderTable();
            this.updateSummary();
            window.ApplicationController.clearForm();
            
            // Focus'u koru
            setTimeout(() => {
                window.EventManager?.restoreFocus();
            }, 100);
            
            window.UIManager?.showNotification('Malzeme tabloya eklendi', 'success');
            return true;
        },

        // Tabloyu render et - REVİZYON RENKLENDİRME GÜNCELLENDİ
        renderTable: function() {
            const tbody = document.getElementById('tabloGovdesi');
            tbody.innerHTML = '';
            
            this.tableData.forEach((row, index) => {
                const tr = document.createElement('tr');
                tr.draggable = true;
                tr.dataset.index = index;
                
                if (index === this.editingIndex) {
                    tr.classList.add('editing');
                }
                
                // Revizyon satırı için sınıf ekle
                if (row.isRevision) {
                    tr.classList.add('revision-row');
                }
                
                // Su hacmi değerini formatla
                let suHacmiDisplay = row.suHacmi;
                if (suHacmiDisplay && suHacmiDisplay !== '-') {
                    suHacmiDisplay = parseFloat(suHacmiDisplay).toFixed(2);
                }
                
                tr.innerHTML = `
                    <td ${row.isRevision ? 'style="color: #FF0000 !important;"' : ''}>
                        <div class="drag-handle">⋮⋮</div>
                        ${row.pNo}
                    </td>
                    <td ${row.isRevision ? 'style="color: #FF0000 !important;"' : ''}>${row.adet}</td>
                    <td ${row.isRevision ? 'style="color: #FF0000 !important;"' : ''}>${row.malzemeTuru}</td>
                    <td ${row.isRevision ? 'style="color: #FF0000 !important;"' : ''}>${row.malzemeCinsi}</td>
                    <td ${row.isRevision ? 'style="color: #FF0000 !important;"' : ''}>${row.olculer}</td>
                    <td ${row.isRevision ? 'style="color: #FF0000 !important;"' : ''}>${row.enNormu}</td>
                    <td ${row.isRevision ? 'style="color: #FF0000 !important;"' : ''}>${suHacmiDisplay}</td>
                    <td ${row.isRevision ? 'style="color: #FF0000 !important;"' : ''}>${row.birimAgirlik}</td>
                    <td ${row.isRevision ? 'style="color: #FF0000 !important;"' : ''}>${row.toplamAgirlik}</td>
                    <td ${row.isRevision ? 'style="color: #FF0000 !important;"' : ''}>${row.heatNo}</td>
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
                
                this.addDragEvents(tr, index);
                tbody.appendChild(tr);
            });
        },

        // Satır güncelle - SU HACMİ FORMATLAMA EKLENDI
        updateRow: function() {
            if (this.editingIndex === undefined) return false;
            
            const index = this.editingIndex;
            const materialType = document.getElementById('malzemeTuru').value;
            const formData = window.ApplicationController.collectFormData();
            const updatedRow = window.MaterialRegistry.addToTable(materialType, formData);
            
            if (!updatedRow) return false;

            // Mevcut P.No ve diğer bilgileri koru
            updatedRow.pNo = this.tableData[index].pNo;
            updatedRow.adet = formData.adet;
            updatedRow.heatNo = formData.heatNo || '-';
            updatedRow.isRevision = this.tableData[index].isRevision;
            
            // Su hacmi formatlaması
            if (updatedRow.suHacmi && updatedRow.suHacmi !== '-') {
                const suHacmiValue = parseFloat(updatedRow.suHacmi);
                updatedRow.suHacmi = suHacmiValue.toFixed(2);
            }

            this.tableData[index] = updatedRow;
            this.renderTable();
            this.updateSummary();
            this.exitEditMode();
            
            // Focus'u koru
            setTimeout(() => {
                window.EventManager?.restoreFocus();
            }, 100);
            
            window.UIManager?.showNotification('Satır güncellendi', 'success');
            return true;
        },

        // Diğer fonksiyonlar aynı kalacak...
        toggleRevision: function(index) {
            this.tableData[index].isRevision = !this.tableData[index].isRevision;
            this.renderTable();
            this.updateSummary();
            window.UIManager?.showNotification(
                this.tableData[index].isRevision ? 'Satır revizyon olarak işaretlendi' : 'Revizyon işareti kaldırıldı',
                'info'
            );
        },

        // Diğer metodlar değişmeden kalıyor
        editRow: function(index) {
            const row = this.tableData[index];
            const materialType = row.originalType;
            
            if (!window.MaterialRegistry.has(materialType)) {
                window.UIManager?.showNotification('Malzeme türü bulunamadı', 'error');
                return;
            }

            window.ApplicationController.clearForm();
            document.getElementById('malzemeTuru').value = materialType;
            window.ApplicationController.onMaterialTypeChange();
            
            setTimeout(() => {
                document.getElementById('malzemeCinsi').value = row.originalGrade;
                document.getElementById('adet').value = row.adet;
                document.getElementById('heatNo').value = row.heatNo === '-' ? '' : row.heatNo;
                
                window.MaterialRegistry.editFromTable(materialType, row);
                
                this.editingIndex = index;
                this.renderTable();
                
                const btnEkle = document.getElementById('btnEkle');
                btnEkle.innerHTML = '<span class="btn-icon">💾</span> Güncelle';
                btnEkle.onclick = () => this.updateRow();
            }, 100);
        },

        exitEditMode: function() {
            delete this.editingIndex;
            const btnEkle = document.getElementById('btnEkle');
            btnEkle.innerHTML = '<span class="btn-icon">➕</span> Tabloya Ekle';
            btnEkle.onclick = () => this.addRow();
            window.ApplicationController.clearForm();
        },

        deleteRow: function(index) {
            if (confirm('Bu satırı silmek istediğinizden emin misiniz?')) {
                if (this.editingIndex === index) {
                    this.exitEditMode();
                }
                
                this.tableData.splice(index, 1);
                this.reorderPNo();
                this.renderTable();
                this.updateSummary();
            }
        },

        reorderPNo: function() {
            this.tableData.forEach((row, index) => {
                row.pNo = index + 1;
            });
            this.pNoCounter = this.tableData.length + 1;
        },

        addDragEvents: function(tr, index) {
            tr.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', index);
                tr.classList.add('dragging');
            });
            
            tr.addEventListener('dragend', () => tr.classList.remove('dragging'));
            
            tr.addEventListener('dragover', (e) => {
                e.preventDefault();
                tr.classList.add('drag-over');
            });
            
            tr.addEventListener('dragleave', () => tr.classList.remove('drag-over'));
            
            tr.addEventListener('drop', (e) => {
                e.preventDefault();
                tr.classList.remove('drag-over');
                
                const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
                if (draggedIndex !== index) {
                    this.moveRow(draggedIndex, index);
                }
            });
        },

        moveRow: function(fromIndex, toIndex) {
            const movedItem = this.tableData.splice(fromIndex, 1)[0];
            this.tableData.splice(toIndex, 0, movedItem);
            this.reorderPNo();
            this.renderTable();
            this.updateSummary();
        },

        updateSummary: function() {
            let toplamAgirlik = 0;
            let toplamParca = 0;
            
            this.tableData.forEach(row => {
                toplamParca += parseFloat(row.adet);
                toplamAgirlik += parseFloat(row.toplamAgirlik);
            });
            
            document.getElementById('toplamParca').textContent = toplamParca;
            document.getElementById('genelToplamAgirlik').textContent = toplamAgirlik.toFixed(2) + ' kg';
        },

        updateTableLanguage: function() {
            this.tableData.forEach(row => {
                // Özel ızgara elemanları ve özel malzemeler için ad korunmalı
                if (row.originalType && window.MaterialRegistry.has(row.originalType)) {
                    if (row.originalType === 'izgara' && row.izgaraKategori === 'element') {
                        // Özel ızgara elemanlarının adını değiştirme
                        // row.malzemeTuru zaten doğru isme sahip
                        return;
                    } else if (row.originalType === 'ozelMalzeme') {
                        // Özel malzemelerin adını değiştirme
                        // row.malzemeTuru zaten kullanıcının verdiği ad
                        return;
                    } else {
                        // Diğer malzemeler için normal güncelleme
                        const MaterialClass = window.MaterialRegistry.get(row.originalType);
                        const instance = new MaterialClass();
                        row.malzemeTuru = instance.getDisplayName();
                    }
                }
            });
            
            this.renderTable();
        },

        clearTable: function() {
            if (this.tableData.length === 0) {
                window.UIManager?.showNotification('Temizlenecek veri yok', 'info');
                return;
            }
            
            if (confirm('Tüm tablo verilerini silmek istediğinizden emin misiniz?')) {
                this.tableData = [];
                this.pNoCounter = 1;
                delete this.editingIndex;
                this.renderTable();
                this.updateSummary();
                window.UIManager?.showNotification('Tablo temizlendi', 'success');
            }
        },

        getTableData: function() {
            return this.tableData;
        },

        loadTableData: function(data) {
            this.tableData = data;
            this.pNoCounter = data.length + 1;
            this.renderTable();
            this.updateSummary();
        },

        getProjectInfo: function() {
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

        loadProjectInfo: function(info) {
            if (document.getElementById('projeAdi')) document.getElementById('projeAdi').value = info.projeAdi || '';
            if (document.getElementById('siparisNo')) document.getElementById('siparisNo').value = info.siparisNo || '';
            if (document.getElementById('resimAciklamasi')) document.getElementById('resimAciklamasi').value = info.resimAciklamasi || '';
            if (document.getElementById('resimNo')) document.getElementById('resimNo').value = info.resimNo || '';
            if (document.getElementById('revizyonNo')) document.getElementById('revizyonNo').value = info.revizyonNo || '';
            if (document.getElementById('hazirlayan')) document.getElementById('hazirlayan').value = info.hazirlayan || '';
            if (document.getElementById('kontrol')) document.getElementById('kontrol').value = info.kontrol || '';
        },

        getNotesRevisions: function() {
            return {
                notlar: document.getElementById('notlar')?.value || '',
                revizyonlar: document.getElementById('revizyonlar')?.value || ''
            };
        },

        loadNotesRevisions: function(data) {
            if (document.getElementById('notlar')) document.getElementById('notlar').value = data.notlar || '';
            if (document.getElementById('revizyonlar')) document.getElementById('revizyonlar').value = data.revizyonlar || '';
        }
    };

    window.TableManager = TableManager;

})(window);