/**
 * Table Manager - AGRESİF FOCUS RESET MEKANİZMASI
 */

(function(window) {
    'use strict';
    
    const TableManager = {
        pNoCounter: 1,
        tableData: [],
        editingIndex: undefined,

        // YENİ: Keyboard event sistemini zorla resetle
        forceKeyboardReset: function() {
            // 1. Tüm input'ları blur yap
            document.querySelectorAll('input, select, textarea').forEach(el => el.blur());
            
            // 2. Dummy invisible input oluştur
            const dummy = document.createElement('input');
            dummy.style.position = 'absolute';
            dummy.style.opacity = '0';
            dummy.style.pointerEvents = 'none';
            dummy.style.left = '-9999px';
            document.body.appendChild(dummy);
            
            // 3. Dummy'ye focus ver ve hemen kaldır
            dummy.focus();
            setTimeout(() => {
                dummy.blur();
                dummy.remove();
                
                // 4. EventManager'ı tetikle
                if (window.EventManager) {
                    window.EventManager.forceActivateAll();
                    
                    // 5. İlk input'a focus ver
                    const firstInput = document.querySelector('#olcuAlanlari input:not([readonly]), #olcuAlanlari select');
                    if (firstInput) {
                        requestAnimationFrame(() => {
                            firstInput.focus();
                            // Force bir keyboard event trigger et
                            const event = new KeyboardEvent('keydown', { key: '', bubbles: true });
                            firstInput.dispatchEvent(event);
                        });
                    }
                }
            }, 50);
        },

        // Satır ekle
        addRow: function() {
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

            rowData.pNo = this.pNoCounter;
            rowData.adet = formData.adet;
            rowData.heatNo = formData.heatNo || '-';
            rowData.isRevision = false;
            
            if (rowData.suHacmi && rowData.suHacmi !== '-') {
                const suHacmiValue = parseFloat(rowData.suHacmi);
                rowData.suHacmi = suHacmiValue.toFixed(2);
            }

            this.tableData.push(rowData);
            this.pNoCounter++;
            
            this.renderTable();
            this.updateSummary();
            window.ApplicationController.clearForm();
            
            // AGRESİF RESET
            this.forceKeyboardReset();
            
            window.UIManager?.showNotification('Malzeme tabloya eklendi', 'success');
            return true;
        },

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
                
                if (row.isRevision) {
                    tr.classList.add('revision-row');
                }
                
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

        updateRow: function() {
            if (this.editingIndex === undefined) return false;
            
            const index = this.editingIndex;
            const materialType = document.getElementById('malzemeTuru').value;
            const formData = window.ApplicationController.collectFormData();
            
            // Editing mode flag'ini ekle
            formData._isEditing = true;
            
            const updatedRow = window.MaterialRegistry.addToTable(materialType, formData);
            
            // Validation başarısız olsa bile, formData tam ise devam et
            if (!updatedRow) {
                // Son çare: Doğrudan hesaplama yap
                const calculation = window.MaterialRegistry.calculate(materialType, formData);
                if (calculation) {
                    const MaterialClass = window.MaterialRegistry.get(materialType);
                    const instance = new MaterialClass();
                    const newRow = instance.formatRow(formData, calculation);
                    
                    if (newRow) {
                        newRow.pNo = this.tableData[index].pNo;
                        newRow.adet = formData.adet;
                        newRow.heatNo = formData.heatNo || '-';
                        newRow.isRevision = this.tableData[index].isRevision;
                        
                        if (newRow.suHacmi && newRow.suHacmi !== '-') {
                            const suHacmiValue = parseFloat(newRow.suHacmi);
                            newRow.suHacmi = suHacmiValue.toFixed(2);
                        }
                        
                        this.tableData[index] = newRow;
                        this.renderTable();
                        this.updateSummary();
                        this.exitEditMode();
                        this.forceKeyboardReset();
                        
                        window.UIManager?.showNotification('Satır güncellendi', 'success');
                        return true;
                    }
                }
                return false;
            }

            updatedRow.pNo = this.tableData[index].pNo;
            updatedRow.adet = formData.adet;
            updatedRow.heatNo = formData.heatNo || '-';
            updatedRow.isRevision = this.tableData[index].isRevision;
            
            if (updatedRow.suHacmi && updatedRow.suHacmi !== '-') {
                const suHacmiValue = parseFloat(updatedRow.suHacmi);
                updatedRow.suHacmi = suHacmiValue.toFixed(2);
            }

            this.tableData[index] = updatedRow;
            this.renderTable();
            this.updateSummary();
            this.exitEditMode();
            
            // AGRESİF RESET
            this.forceKeyboardReset();
            
            window.UIManager?.showNotification('Satır güncellendi', 'success');
            return true;
        },

        toggleRevision: function(index) {
            this.tableData[index].isRevision = !this.tableData[index].isRevision;
            this.renderTable();
            this.updateSummary();
            
            // AGRESİF RESET
            this.forceKeyboardReset();
            
            window.UIManager?.showNotification(
                this.tableData[index].isRevision ? 'Satır revizyon olarak işaretlendi' : 'Revizyon işareti kaldırıldı',
                'info'
            );
        },

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
                
                // AGRESİF RESET
                this.forceKeyboardReset();
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
            // CUSTOM MODAL İLE DEĞİŞTİRİLDİ - Native confirm() kaldırıldı
            this.showCustomConfirm(
                'Bu satırı silmek istediğinizden emin misiniz?',
                () => {
                    // Onay verildi
                    if (this.editingIndex === index) {
                        this.exitEditMode();
                    }
                    
                    this.tableData.splice(index, 1);
                    this.reorderPNo();
                    this.renderTable();
                    this.updateSummary();
                    
                    // AGRESİF RESET - requestAnimationFrame ile
                    requestAnimationFrame(() => {
                        this.forceKeyboardReset();
                    });
                }
            );
        },

        // YENİ: Custom confirm modal
        showCustomConfirm: function(message, onConfirm) {
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
            
            // Event listeners
            const yesBtn = modal.querySelector('.custom-confirm-yes');
            const noBtn = modal.querySelector('.custom-confirm-no');
            
            const closeModal = () => {
                modal.remove();
                // Modal kapatıldıktan sonra keyboard reset
                requestAnimationFrame(() => {
                    if (window.EventManager) {
                        window.EventManager.forceActivateAll();
                    }
                });
            };
            
            yesBtn.onclick = () => {
                closeModal();
                if (onConfirm) onConfirm();
            };
            
            noBtn.onclick = closeModal;
            
            // ESC tuşu ile kapat
            const escHandler = (e) => {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', escHandler);
                }
            };
            document.addEventListener('keydown', escHandler);
            
            // Modal dışına tıklanırsa kapat
            modal.onclick = (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            };
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
            
            // AGRESİF RESET
            this.forceKeyboardReset();
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
                if (row.originalType && window.MaterialRegistry.has(row.originalType)) {
                    if (row.originalType === 'izgara' && row.izgaraKategori === 'element') {
                        return;
                    } else if (row.originalType === 'ozelMalzeme') {
                        return;
                    } else if (row.originalType === 'vana' && row.vanaDetay) {
                        // Vana için özel işlem - vana tipini koru
                        const MaterialClass = window.MaterialRegistry.get('vana');
                        const instance = new MaterialClass();
                        
                        const vanaTipiMap = {
                            'gate': instance.getText('gate_valve'),
                            'ball': instance.getText('ball_valve'),
                            'butterfly': instance.getText('butterfly_valve'),
                            'globe': instance.getText('globe_valve'),
                            'check': instance.getText('check_valve'),
                            'safety': instance.getText('safety_valve'),
                            'needle': instance.getText('needle_valve')
                        };
                        
                        if (row.vanaDetay.vanaTipi) {
                            row.malzemeTuru = vanaTipiMap[row.vanaDetay.vanaTipi] || 'Vana';
                        }
                    } else if (row.originalType === 'borulamaEkipmanlari' && row.borulamaDetay) {
                        // Borulama ekipmanları için düzeltilmiş işlem
                        const MaterialClass = window.MaterialRegistry.get('borulamaEkipmanlari');
                        const instance = new MaterialClass();
                        
                        // Ekipman tipinin kodunu kullanarak yeni dilde karşılığını al
                        if (row.borulamaDetay.tip) {
                            const yeniEkipmanAdi = instance.getText(row.borulamaDetay.tip);
                            row.malzemeTuru = yeniEkipmanAdi;
                        } else {
                            // Eğer borulamaDetay.tip yoksa varsayılan olarak ana kategori adını kullan
                            row.malzemeTuru = instance.getDisplayName();
                        }
                    } else if (row.originalType === 'profil' && row.profilTipi) {
                        const MaterialClass = window.MaterialRegistry.get('profil');
                        const instance = new MaterialClass();
                        row.malzemeTuru = `${row.profilTipi} ${instance.getDisplayName()}`;
                    } else if (row.originalType === 'flans' && row.flansTipi) {
                        const MaterialClass = window.MaterialRegistry.get('flans');
                        const instance = new MaterialClass();
                        const flansTipiMap = {
                            'duz': instance.getText('duz_flans'),
                            'kaynak_boyunlu': instance.getText('kaynak_boyunlu'),
                            'kor': instance.getText('kor_flans')
                        };
                        row.malzemeTuru = flansTipiMap[row.flansTipi] || instance.getDisplayName();
                    } else {
                        // Diğer malzemeler için varsayılan işlem
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
            
            // CUSTOM MODAL İLE DEĞİŞTİRİLDİ
            this.showCustomConfirm(
                'Tüm tablo verilerini silmek istediğinizden emin misiniz?',
                () => {
                    this.tableData = [];
                    this.pNoCounter = 1;
                    delete this.editingIndex;
                    this.renderTable();
                    this.updateSummary();
                    window.UIManager?.showNotification('Tablo temizlendi', 'success');
                    
                    // AGRESİF RESET
                    requestAnimationFrame(() => {
                        this.forceKeyboardReset();
                    });
                }
            );
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