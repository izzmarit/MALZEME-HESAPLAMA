(function(window) {
    'use strict';
    
    const TableManager = {
        pNoCounter: 1,
        tableData: [],
        editingIndex: null,
        originalAddHandler: null, // Orijinal handler'ı sakla

        initialize() {
            // İlk başta addRow handler'ını sakla
            const btnEkle = document.getElementById('btnEkle');
            if (btnEkle) {
                this.originalAddHandler = () => this.addRow();
                btnEkle.onclick = this.originalAddHandler;
            }
        },

        addRow() {
            // Düzenleme modundaysa updateRow'u çağır ve dön
            if (this.editingIndex !== null) {
                this.updateRow();
                return false; // Önemli: false döndür
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
            
            window.ApplicationController.clearForm();
            window.UIManager.showNotification('Malzeme tabloya eklendi', 'success');
            
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
            
            // Mevcut satırın sabit değerlerini koru
            updatedRow.pNo = this.tableData[index].pNo;
            updatedRow.adet = formData.adet;
            updatedRow.heatNo = formData.heatNo || '-';
            updatedRow.isRevision = this.tableData[index].isRevision;
            
            // Satırı güncelle
            this.tableData[index] = updatedRow;
            
            // Düzenleme modundan çık
            this.exitEditMode();
            
            // Tabloyu ve özeti güncelle
            this.renderTable();
            this.updateSummary();
            
            // Formu temizle
            window.ApplicationController.clearForm();
            
            window.UIManager.showNotification('Satır güncellendi', 'success');
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

            // Formu temizle ve malzeme türünü seç
            window.ApplicationController.clearForm();
            document.getElementById('malzemeTuru').value = materialType;
            window.ApplicationController.onMaterialTypeChange(materialType);
            
            // Form alanlarını doldur
            setTimeout(() => {
                const MaterialClass = window.MaterialRegistry.get(materialType);
                const instance = new MaterialClass();
                instance.fillFormFromRow(row);
                
                document.getElementById('adet').value = row.adet;
                document.getElementById('heatNo').value = row.heatNo === '-' ? '' : row.heatNo;
                document.getElementById('malzemeCinsi').value = row.originalGrade;
                
                // Düzenleme modunu aktif et
                this.setEditMode(index);
                
            }, 100);
        },

        setEditMode(index) {
            this.editingIndex = index;
            this.renderTable();
            
            const btnEkle = document.getElementById('btnEkle');
            if (btnEkle) {
                // Önce mevcut handler'ı temizle
                btnEkle.onclick = null;
                
                // Yeni handler'ı ata
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
                // Önce mevcut handler'ı temizle
                btnEkle.onclick = null;
                
                // Orijinal handler'ı geri yükle
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
                // Düzenleme modundaysa ve silinen satır düzenlenen satırsa
                if (this.editingIndex === index) {
                    this.exitEditMode();
                } else if (this.editingIndex !== null && this.editingIndex > index) {
                    // Silinen satır düzenlenen satırdan önceyse index'i güncelle
                    this.editingIndex--;
                }
                
                this.tableData.splice(index, 1);
                this.reorderPNo();
                this.renderTable();
                this.updateSummary();
                
                window.UIManager.showNotification('Satır silindi', 'success');
            });
        },

        toggleRevision(index) {
            if (index < 0 || index >= this.tableData.length) return;
            
            this.tableData[index].isRevision = !this.tableData[index].isRevision;
            this.renderTable();
            
            const status = this.tableData[index].isRevision ? 'işaretlendi' : 'kaldırıldı';
            window.UIManager.showNotification(`Revizyon ${status}`, 'info');
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
                
                // Düzenleme modunda olan satırı işaretle
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
                    <td ${revisionStyle}>${row.pNo}</td>
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
                
                tbody.appendChild(tr);
            });
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
                this.exitEditMode(); // Düzenleme modundan çık
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
                    
                    // Metadata'da spesifik bilgi varsa onu kullan
                    if (row.metadata?.civataSomun?.altTipKodu) {
                        // Cıvata/somun için özel işlem
                        row.malzemeTuru = instance.getSubTypeName ? 
                            instance.getSubTypeName(row.metadata.civataSomun.altTipKodu) : 
                            instance.getDisplayName();
                    } else {
                        // Diğer malzemeler için standart işlem
                        row.malzemeTuru = instance.getDisplayName();
                    }
                }
            });
            this.renderTable();
        },

        getTableData() {
            return this.tableData;
        },

        loadTableData(data) {
            this.exitEditMode(); // Önce düzenleme modundan çık
            this.tableData = data;
            this.pNoCounter = data.length + 1;
            this.renderTable();
            this.updateSummary();
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

    // TableManager'ı başlat
    TableManager.initialize();

    window.TableManager = TableManager;

})(window);