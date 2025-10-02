// Tablo Yönetimi Modülü - Modüler Sistem için Güncellenmiş
(function(window) {
    'use strict';
    
    const TableManager = {
        pNoCounter: 1,
        tableData: [],
        editingIndex: undefined,
        currentLanguage: 'tr',

        // Tabloya satır ekle
        addRow: function() {
            const materialType = document.getElementById('malzemeTuru').value;
            
            if (!materialType) {
                this.showNotification('Lütfen malzeme türü seçin!', 'warning');
                return false;
            }

            // MaterialRegistry'den malzeme türünü al
            if (!window.MaterialRegistry || !window.MaterialRegistry.has(materialType)) {
                this.showNotification('Malzeme türü bulunamadı!', 'error');
                return false;
            }

            try {
                // Form verilerini topla
                const formData = this.collectFormData();
                
                // Malzeme türü ile tabloya ekleme işlemini yap
                const rowData = window.MaterialRegistry.addToTable(materialType, formData);
                
                if (!rowData) {
                    return false;
                }

                // P.No ekle
                rowData.pNo = this.pNoCounter;
                rowData.adet = formData.adet;
                rowData.heatNo = formData.heatNo || '-';
                rowData.isRevision = false;

                // Tabloya ekle
                this.tableData.push(rowData);
                this.pNoCounter++;
                
                // Tabloyu güncelle
                this.renderTable();
                this.updateSummary();
                
                // Formu temizle
                this.clearForm();
                
                // Otomatik kayıt tetikle
                this.triggerAutoSave();
                
                this.showNotification('Malzeme tabloya eklendi', 'success');
                return true;
                
            } catch (error) {
                console.error('Tabloya ekleme hatası:', error);
                this.showNotification('Tabloya ekleme sırasında hata oluştu: ' + error.message, 'error');
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

        // Tabloyu render et
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
                
                // Revizyon durumuna göre stil uygula
                if (row.isRevision) {
                    tr.classList.add('revision-row');
                }
                
                tr.innerHTML = `
                    <td>
                        <div class="drag-handle">⋮⋮</div>
                        ${row.pNo}
                    </td>
                    <td>${row.adet}</td>
                    <td>${row.malzemeTuru}</td>
                    <td>${row.malzemeCinsi}</td>
                    <td>${row.olculer}</td>
                    <td>${row.enNormu}</td>
                    <td>${row.suHacmi}</td>
                    <td>${row.birimAgirlik}</td>
                    <td>${row.toplamAgirlik}</td>
                    <td>${row.heatNo}</td>
                    <td>
                        <div class="table-action-buttons">
                            <button class="btn-edit" onclick="TableManager.editRow(${index})">
                                <span>Düzenle</span>
                            </button>
                            <button class="btn-revision ${row.isRevision ? 'active' : ''}" onclick="TableManager.toggleRevision(${index})">
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

            // Dil değişikliği sonrası çevirileri güncelle
            this.updateTableLanguage();
        },

        // Dil güncelleme - MaterialRegistry'den alınan çeviriler
        updateTableLanguage: function() {
            if (!window.MaterialRegistry) return;

            this.tableData.forEach(row => {
                if (row.originalType && window.MaterialRegistry.has(row.originalType)) {
                    // Malzeme türünden güncel çeviriyi al
                    const materialTexts = window.MaterialRegistry.getTexts(row.originalType);
                    const currentLang = this.getCurrentLanguage();
                    
                    if (materialTexts[currentLang] && materialTexts[currentLang].display_name) {
                        row.malzemeTuru = materialTexts[currentLang].display_name;
                    }
                }
            });
            
            this.renderTable();
        },

        // Mevcut dili al
        getCurrentLanguage: function() {
            const langSelect = document.getElementById('languageSelect');
            return langSelect ? langSelect.value : 'tr';
        },

        // Revizyon durumunu değiştir
        toggleRevision: function(index) {
            if (this.tableData[index]) {
                this.tableData[index].isRevision = !this.tableData[index].isRevision;
                this.renderTable();
                this.updateSummary();
                this.triggerAutoSave();
                
                const status = this.tableData[index].isRevision ? 'işaretlendi' : 'kaldırıldı';
                this.showNotification(`Satır revizyon ${status}`, 'info');
            }
        },

        // Satır düzenle
        editRow: function(index) {
            const row = this.tableData[index];
            const materialType = row.originalType;
            
            if (!window.MaterialRegistry || !window.MaterialRegistry.has(materialType)) {
                this.showNotification('Malzeme türü bulunamadı!', 'error');
                return;
            }

            // Sol paneli temizle
            this.clearForm();
            
            // Malzeme türünü seç
            document.getElementById('malzemeTuru').value = materialType;
            
            // Malzeme türüne göre UI oluştur
            this.createMaterialUI(materialType);
            
            // Bir süre bekle ki alanlar oluşsun
            setTimeout(() => {
                // Malzeme cinsini doldur
                const malzemeCinsiSelect = document.getElementById('malzemeCinsi');
                if (malzemeCinsiSelect && row.originalGrade) {
                    malzemeCinsiSelect.value = row.originalGrade;
                }
                
                // Adet ve Heat No doldur
                document.getElementById('adet').value = row.adet;
                document.getElementById('heatNo').value = row.heatNo === '-' ? '' : row.heatNo;
                
                // Malzeme türüne özgü form doldurma
                window.MaterialRegistry.editFromTable(materialType, row);
                
                // Düzenleme modunu işaretle
                this.editingIndex = index;
                this.renderTable();
                
                // Buton metnini değiştir
                const btnEkle = document.getElementById('btnEkle');
                btnEkle.innerHTML = '<span class="btn-icon">💾</span> Güncelle';
                btnEkle.onclick = () => this.updateRow();
                
                this.showNotification('Düzenleme modu aktif', 'info');
            }, 150);
        },

        // Satırı güncelle
        updateRow: function() {
            if (this.editingIndex === undefined) return;
            
            const index = this.editingIndex;
            const materialType = document.getElementById('malzemeTuru').value;
            
            if (!window.MaterialRegistry || !window.MaterialRegistry.has(materialType)) {
                this.showNotification('Malzeme türü bulunamadı!', 'error');
                return;
            }

            try {
                // Form verilerini topla
                const formData = this.collectFormData();
                
                // Malzeme türü ile güncelleme işlemini yap
                const updatedRowData = window.MaterialRegistry.addToTable(materialType, formData);
                
                if (!updatedRowData) {
                    return;
                }

                // Mevcut satır bilgilerini koru
                updatedRowData.pNo = this.tableData[index].pNo;
                updatedRowData.adet = formData.adet;
                updatedRowData.heatNo = formData.heatNo || '-';
                updatedRowData.isRevision = this.tableData[index].isRevision || false;

                // Tabloyu güncelle
                this.tableData[index] = updatedRowData;
                this.renderTable();
                this.updateSummary();
                
                // Düzenleme modundan çık
                this.exitEditMode();
                
                this.triggerAutoSave();
                this.showNotification('Satır güncellendi', 'success');
                
            } catch (error) {
                console.error('Satır güncelleme hatası:', error);
                this.showNotification('Satır güncellenemedi: ' + error.message, 'error');
            }
        },

        // Düzenleme modundan çık
        exitEditMode: function() {
            delete this.editingIndex;
            const btnEkle = document.getElementById('btnEkle');
            btnEkle.innerHTML = '<span class="btn-icon">➕</span> Tabloya Ekle';
            btnEkle.onclick = () => this.addRow();
            this.clearForm();
        },

        // Satır sil
        deleteRow: function(index) {
            this.showDeleteConfirmDialog(() => {
                if (this.editingIndex === index) {
                    this.exitEditMode();
                }
                
                this.tableData.splice(index, 1);
                this.reorderPNo();
                this.renderTable();
                this.updateSummary();
                this.triggerAutoSave();
                
                this.showNotification('Satır silindi', 'info');
            });
        },

        // Silme onay dialogu
        showDeleteConfirmDialog: function(onConfirm) {
            if (document.querySelector('.delete-confirm-modal')) return;
            
            const modal = document.createElement('div');
            modal.className = 'delete-confirm-modal';
            modal.innerHTML = `
                <div class="delete-confirm-content">
                    <p>Bu satırı silmek istediğinizden emin misiniz?</p>
                    <div class="delete-confirm-buttons">
                        <button id="confirmDeleteBtn" class="btn btn-danger">Sil</button>
                        <button id="cancelDeleteBtn" class="btn btn-secondary">İptal</button>
                    </div>
                </div>
            `;
            
            modal.style.cssText = `
                position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(0,0,0,0.5); display: flex; align-items: center;
                justify-content: center; z-index: 10000;
            `;
            
            document.body.appendChild(modal);
            
            const removeModal = () => {
                const existingModal = document.querySelector('.delete-confirm-modal');
                if (existingModal) existingModal.remove();
            };
            
            document.getElementById('confirmDeleteBtn').onclick = () => {
                removeModal();
                onConfirm();
            };
            
            document.getElementById('cancelDeleteBtn').onclick = removeModal;
            modal.onclick = (e) => e.target === modal && removeModal();
        },

        // P.No'ları yeniden sırala
        reorderPNo: function() {
            this.tableData.forEach((row, index) => {
                row.pNo = index + 1;
            });
            this.pNoCounter = this.tableData.length + 1;
        },

        // Sürükleme event'lerini ekle
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

        // Satır taşıma
        moveRow: function(fromIndex, toIndex) {
            const movedItem = this.tableData.splice(fromIndex, 1)[0];
            this.tableData.splice(toIndex, 0, movedItem);
            
            this.reorderPNo();
            this.renderTable();
            this.updateSummary();
            this.triggerAutoSave();
            
            this.showNotification('Satır sırası değiştirildi', 'info');
        },

        // Tabloyu temizle
        clearTable: function() {
            if (this.tableData.length === 0) {
                this.showNotification('Temizlenecek veri bulunmuyor', 'info');
                return;
            }
            
            if (confirm('Tüm tablo verilerini silmek istediğinizden emin misiniz?')) {
                if (this.editingIndex !== undefined) {
                    this.exitEditMode();
                }
                
                this.tableData = [];
                this.pNoCounter = 1;
                this.renderTable();
                this.updateSummary();
                this.triggerAutoSave();
                this.showNotification('Tablo temizlendi', 'success');
            }
        },

        // Özet güncelleme
        updateSummary: function() {
            if (this.tableData.length === 0) {
                document.getElementById('toplamParca').textContent = '0';
                document.getElementById('genelToplamAgirlik').textContent = '0.00 kg';
                return;
            }
            
            let toplamAgirlik = 0;
            let toplamParcaSayisi = 0;
            
            this.tableData.forEach(row => {
                const adet = parseFloat(row.adet);
                const satirAgirlik = parseFloat(row.toplamAgirlik);
                
                toplamParcaSayisi += adet;
                toplamAgirlik += satirAgirlik;
            });
            
            document.getElementById('toplamParca').textContent = toplamParcaSayisi;
            document.getElementById('genelToplamAgirlik').textContent = toplamAgirlik.toFixed(2) + ' kg';
        },

        // Malzeme UI oluştur
        createMaterialUI: function(materialType) {
            if (window.MaterialRegistry && window.MaterialRegistry.has(materialType)) {
                const uiHtml = window.MaterialRegistry.createUI(materialType);
                document.getElementById('olcuAlanlari').innerHTML = uiHtml;
            }
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
            
            // Sonuçları sıfırla
            document.getElementById('birimAgirlik').textContent = '0.00';
            document.getElementById('toplamAgirlik').textContent = '0.00';
            document.getElementById('suHacmi').textContent = '0.00';
            document.getElementById('suHacmiCard').style.display = 'none';
        },

        // Veri işlemleri
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
                projeAdi: document.getElementById('projeAdi').value || '',
                siparisNo: document.getElementById('siparisNo').value || '',
                resimAciklamasi: document.getElementById('resimAciklamasi').value || '',
                resimNo: document.getElementById('resimNo').value || '',
                revizyonNo: document.getElementById('revizyonNo').value || '',
                hazirlayan: document.getElementById('hazirlayan').value || '',
                kontrol: document.getElementById('kontrol').value || ''
            };
        },

        loadProjectInfo: function(info) {
            document.getElementById('projeAdi').value = info.projeAdi || '';
            document.getElementById('siparisNo').value = info.siparisNo || '';
            document.getElementById('resimAciklamasi').value = info.resimAciklamasi || '';
            document.getElementById('resimNo').value = info.resimNo || '';
            document.getElementById('revizyonNo').value = info.revizyonNo || '';
            document.getElementById('hazirlayan').value = info.hazirlayan || '';
            document.getElementById('kontrol').value = info.kontrol || '';
        },

        getNotesRevisions: function() {
            return {
                notlar: document.getElementById('notlar')?.value || '',
                revizyonlar: document.getElementById('revizyonlar')?.value || ''
            };
        },

        loadNotesRevisions: function(data) {
            const notlarElement = document.getElementById('notlar');
            const revizyonlarElement = document.getElementById('revizyonlar');
            
            if (notlarElement) notlarElement.value = data.notlar || '';
            if (revizyonlarElement) revizyonlarElement.value = data.revizyonlar || '';
        },

        // Otomatik kayıt tetikleyici
        triggerAutoSave: function() {
            if (typeof window.autoSaveData === 'function') {
                window.autoSaveData();
            }
        },

        // Bildirim göster
        showNotification: function(message, type = 'info') {
            if (window.UIManager && window.UIManager.showNotification) {
                window.UIManager.showNotification(message, type);
            } else {
                console.log(`[${type.toUpperCase()}] ${message}`);
            }
        }
    };

    // Modülü window objesine bağla
    window.TableManager = TableManager;

})(window);