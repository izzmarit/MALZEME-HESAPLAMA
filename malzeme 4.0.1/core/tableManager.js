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
            
            // Vazgeç butonu ekle
            const btnTemizle = document.getElementById('btnTemizle');
            if (btnTemizle) {
                btnTemizle.onclick = null;
                btnTemizle.innerHTML = '<span class="btn-icon">✖️</span> Vazgeç';
                btnTemizle.classList.add('btn-cancel-edit');
                btnTemizle.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.cancelEdit();
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
            
            // Temizle butonunu eski haline getir
            const btnTemizle = document.getElementById('btnTemizle');
            if (btnTemizle) {
                btnTemizle.onclick = null;
                btnTemizle.innerHTML = '<span class="btn-icon">🗑️</span> Temizle';
                btnTemizle.classList.remove('btn-cancel-edit');
                btnTemizle.onclick = () => {
                    window.ApplicationController.clearForm();
                };
            }
        },

        cancelEdit() {
            window.UIManager.confirmAction(
                'Düzenlemeyi iptal etmek istediğinize emin misiniz? Yapılan değişiklikler kaybolacak.',
                () => {
                    this.exitEditMode();
                    window.ApplicationController.clearForm();
                    window.UIManager.showNotification('Düzenleme iptal edildi', 'info');
                }
            );
        },

        deleteRow(index) {
            const rowToDelete = this.tableData[index];
            const pNoData = this.parsePartNumber(rowToDelete.pNo);
            
            let deleteMessage = 'Bu satırı silmek istediğinizden emin misiniz?';
            let rowsToDelete = [index];
            
            // Ana satır siliniyorsa, alt satırları da sil
            if (!pNoData.isSubRow) {
                // Alt satırları say
                let subRowCount = 0;
                for (let i = index + 1; i < this.tableData.length; i++) {
                    const checkPNo = this.parsePartNumber(this.tableData[i].pNo);
                    if (checkPNo.main === pNoData.main && checkPNo.isSubRow) {
                        rowsToDelete.push(i);
                        subRowCount++;
                    } else {
                        break;
                    }
                }
                
                if (subRowCount > 0) {
                    deleteMessage = `${rowToDelete.pNo} numaralı satır ve ${subRowCount} alt satırı silinecek. Devam etmek istiyor musunuz?`;
                }
            }
            
            window.UIManager.confirmAction(deleteMessage, () => {
                if (this.editingIndex === index) {
                    this.exitEditMode();
                } else if (this.editingIndex !== null && this.editingIndex > index) {
                    this.editingIndex -= rowsToDelete.length;
                }
                
                // Sondan başlayarak sil
                rowsToDelete.reverse().forEach(idx => {
                    this.tableData.splice(idx, 1);
                });
                
                this.reorderPNo();
                this.renderTable();
                this.updateSummary();
                
                const deletedCount = rowsToDelete.length;
                window.UIManager.showNotification(
                    `${deletedCount} satır silindi`, 
                    'success'
                );
                
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

        // 1. P.No formatını kontrol eden yardımcı fonksiyon
        parsePartNumber(pNo) {
            if (typeof pNo === 'string' && pNo.includes('-')) {
                const parts = pNo.split('-');
                return {
                    main: parseInt(parts[0]),
                    sub: parts[1],
                    isSubRow: true
                };
            }
            return {
                main: parseInt(pNo),
                sub: null,
                isSubRow: false
            };
        },

        // 2. Alt satır ekleme fonksiyonu
        addSubRow(parentIndex) {
            if (parentIndex < 0 || parentIndex >= this.tableData.length) {
                window.UIManager.showNotification('Geçersiz satır', 'error');
                return;
            }
            
            const parentRow = this.tableData[parentIndex];
            const parentPNo = this.parsePartNumber(parentRow.pNo);
            
            // Mevcut alt satırları kontrol et
            let existingSubRows = [];
            for (let i = parentIndex + 1; i < this.tableData.length; i++) {
                const currentPNo = this.parsePartNumber(this.tableData[i].pNo);
                if (currentPNo.main === parentPNo.main && currentPNo.isSubRow) {
                    existingSubRows.push(currentPNo.sub);
                } else if (currentPNo.main !== parentPNo.main) {
                    break;
                }
            }
            
            // Yeni alt satır harfi belirleme
            const letters = 'abcdefghijklmnopqrstuvwxyz';
            let newSubLetter = 'a';
            for (let letter of letters) {
                if (!existingSubRows.includes(letter)) {
                    newSubLetter = letter;
                    break;
                }
            }
            
            const newPNo = `${parentPNo.main}-${newSubLetter}`;
            
            // Form verilerini al - kontroller zaten yapıldı
            const materialType = document.getElementById('malzemeTuru').value;
            const formData = window.ApplicationController.collectFormData();
            
            const MaterialClass = window.MaterialRegistry.get(materialType);
            const instance = new MaterialClass();
            
            // Validasyon (opsiyonel, temel kontrol)
            const validation = instance.validate(formData);
            if (!validation.isValid) {
                window.UIManager.showNotification(validation.message, 'warning');
                return false;
            }
            
            // Hesaplama
            const calculation = instance.calculate(formData);
            if (!calculation) {
                window.UIManager.showNotification('Hesaplama yapılamadı', 'error');
                return false;
            }
            
            const rowData = instance.formatRow(formData, calculation);
            rowData.pNo = newPNo;
            rowData.adet = formData.adet;
            rowData.heatNo = formData.heatNo || '-';
            rowData.isRevision = false;
            rowData.isSubRow = true;
            rowData.parentPNo = parentPNo.main;
            
            // Doğru konuma ekle
            const insertIndex = parentIndex + existingSubRows.length + 1;
            this.tableData.splice(insertIndex, 0, rowData);
            
            this.renderTable();
            this.updateSummary();
            
            window.ApplicationController.clearFormPartial();
            window.UIManager.showNotification(`Alt satır ${newPNo} eklendi`, 'success');
            
            if (window.UIManager && typeof window.UIManager.refreshAllFilteredTabs === 'function') {
                window.UIManager.refreshAllFilteredTabs();
            }
            
            return true;
        },

        reorderPNo() {
            let mainCounter = 1;
            let i = 0;
            
            while (i < this.tableData.length) {
                const currentPNo = this.parsePartNumber(this.tableData[i].pNo);
                
                if (!currentPNo.isSubRow) {
                    // Ana satır
                    this.tableData[i].pNo = mainCounter.toString();
                    this.tableData[i].isSubRow = false;
                    this.tableData[i].parentPNo = mainCounter;
                    
                    // Alt satırları kontrol et ve yeniden numaralandır
                    let subIndex = 1;
                    const letters = 'abcdefghijklmnopqrstuvwxyz';
                    
                    while (i + subIndex < this.tableData.length) {
                        const nextPNo = this.parsePartNumber(this.tableData[i + subIndex].pNo);
                        
                        // Eğer bir sonraki satır alt satırsa ve ana satırın devamıysa
                        if (nextPNo.isSubRow && 
                            (nextPNo.main === currentPNo.main || this.tableData[i + subIndex].parentPNo === currentPNo.main)) {
                            
                            this.tableData[i + subIndex].pNo = `${mainCounter}-${letters[subIndex - 1]}`;
                            this.tableData[i + subIndex].isSubRow = true;
                            this.tableData[i + subIndex].parentPNo = mainCounter;
                            subIndex++;
                        } else {
                            break;
                        }
                    }
                    
                    i += subIndex;
                    mainCounter++;
                } else {
                    // Yalnız kalmış alt satır (olmamalı ama güvenlik için)
                    this.tableData[i].pNo = mainCounter.toString();
                    this.tableData[i].isSubRow = false;
                    this.tableData[i].parentPNo = mainCounter;
                    i++;
                    mainCounter++;
                }
            }
            
            this.pNoCounter = mainCounter;
        },

        showAddSubRowDialog(parentIndex) {
            const parentRow = this.tableData[parentIndex];
            
            // Basit ve etkili kontroller
            const materialType = document.getElementById('malzemeTuru').value;
            const materialGrade = document.getElementById('malzemeCinsi').value;
            const birimAgirlik = parseFloat(document.getElementById('birimAgirlik').textContent) || 0;
            const toplamAgirlik = parseFloat(document.getElementById('toplamAgirlik').textContent) || 0;
            
            // Malzeme türü seçilmemiş
            if (!materialType) {
                window.UIManager.showNotification('Önce malzeme türü seçin', 'warning');
                return;
            }
            
            // Malzeme cinsi seçilmemiş
            if (!materialGrade) {
                window.UIManager.showNotification('Malzeme cinsini seçin', 'warning');
                return;
            }
            
            // Hesaplama yapılmamış (birim ağırlık sıfır)
            if (birimAgirlik <= 0 || toplamAgirlik <= 0) {
                window.UIManager.showNotification('Önce hesaplama yapmalısınız (Hesapla butonuna basın)', 'warning');
                return;
            }
            
            // Tüm kontroller başarılı, onay iste
            window.UIManager.confirmAction(
                `${parentRow.pNo} numaralı satıra alt satır eklenecek.\n\nDevam etmek istiyor musunuz?`,
                () => {
                    this.addSubRow(parentIndex);
                }
            );
        },

        renderTable() {
            const tbody = document.getElementById('tabloGovdesi');
            if (!tbody) return;
            
            tbody.innerHTML = '';
            
            this.tableData.forEach((row, index) => {
                const tr = document.createElement('tr');
                
                const pNoData = this.parsePartNumber(row.pNo);
                
                // Alt satırsa sürüklenemez yap
                if (pNoData.isSubRow) {
                    tr.draggable = false;
                    tr.dataset.isSubrow = 'true';
                    tr.dataset.parentPno = pNoData.main;
                } else {
                    tr.draggable = true;
                    tr.dataset.isSubrow = 'false';
                }
                
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
                
                // Alt satır için özel stil
                const subRowStyle = pNoData.isSubRow ? 'style="padding-left: 30px; font-style: italic; color: #718096;"' : '';
                const dragHandleDisplay = pNoData.isSubRow ? 'style="opacity: 0.3; cursor: not-allowed;"' : '';
                
                tr.innerHTML = `
                    <td ${revisionStyle} ${subRowStyle}>
                        <span class="drag-handle" ${dragHandleDisplay} title="${pNoData.isSubRow ? 'Alt satır taşınamaz' : 'Sürükle'}">⋮⋮</span>
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
                            <button class="btn-edit" onclick="TableManager.editRow(${index})" title="Düzenle">
                                <span>Düzenle</span>
                            </button>
                            ${!pNoData.isSubRow ? `
                            <button class="btn-add-sub" onclick="TableManager.showAddSubRowDialog(${index})" 
                                    title="Alt satır ekle">
                                <span>+ Alt</span>
                            </button>
                            ` : ''}
                            <button class="btn-revision ${row.isRevision ? 'active' : ''}" 
                                    onclick="TableManager.toggleRevision(${index})" title="Revizyon işaretle">
                                <span>Revizyon</span>
                            </button>
                            <button class="btn-delete" onclick="TableManager.deleteRow(${index})" title="Sil">
                                <span>Sil</span>
                            </button>
                        </div>
                    </td>
                `;
                
                // Sadece ana satırlar için sürükle-bırak olayları
                if (!pNoData.isSubRow) {
                    tr.addEventListener('dragstart', (e) => this.handleDragStart(e, index));
                    tr.addEventListener('dragover', (e) => this.handleDragOver(e, index));
                    tr.addEventListener('drop', (e) => this.handleDrop(e, index));
                    tr.addEventListener('dragend', (e) => this.handleDragEnd(e));
                    tr.addEventListener('dragleave', (e) => this.handleDragLeave(e));
                } else {
                    // Alt satırlar için sürükleme denemesinde uyarı
                    tr.addEventListener('mousedown', (e) => {
                        if (e.target.classList.contains('drag-handle')) {
                            e.preventDefault();
                            window.UIManager.showNotification('Alt satırlar ana satırıyla birlikte taşınır', 'info');
                        }
                    });
                }
                
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

        handleDrop(e, targetIndex) {
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            e.preventDefault();
            
            if (this.draggedIndex === null || this.draggedIndex === targetIndex) {
                return false;
            }
            
            const draggedRow = this.tableData[this.draggedIndex];
            const draggedPNo = this.parsePartNumber(draggedRow.pNo);
            
            // Alt satır sürüklenmeye çalışılıyorsa engelle
            if (draggedPNo.isSubRow) {
                window.UIManager.showNotification('Alt satırlar ana satırıyla birlikte taşınır', 'warning');
                return false;
            }
            
            // Sürüklenen satır ve tüm alt satırlarını topla
            let itemsToMove = [this.tableData[this.draggedIndex]];
            
            // Ana satırın alt satırlarını bul
            for (let i = this.draggedIndex + 1; i < this.tableData.length; i++) {
                const currentPNo = this.parsePartNumber(this.tableData[i].pNo);
                if (currentPNo.main === draggedPNo.main && currentPNo.isSubRow) {
                    itemsToMove.push(this.tableData[i]);
                } else {
                    break;
                }
            }
            
            // Hedef satırın P.No bilgisini al
            const targetRow = this.tableData[targetIndex];
            const targetPNo = this.parsePartNumber(targetRow.pNo);
            
            // Eğer hedef bir alt satırsa, ana satırın üstüne koy
            let finalTargetIndex = targetIndex;
            if (targetPNo.isSubRow) {
                // Ana satırı bul
                for (let i = targetIndex - 1; i >= 0; i--) {
                    const checkPNo = this.parsePartNumber(this.tableData[i].pNo);
                    if (!checkPNo.isSubRow && checkPNo.main === targetPNo.main) {
                        finalTargetIndex = i;
                        break;
                    }
                }
            }
            
            // Hedef, sürüklenen grubun içindeyse işlem yapma
            const draggedStart = this.draggedIndex;
            const draggedEnd = this.draggedIndex + itemsToMove.length - 1;
            
            if (finalTargetIndex >= draggedStart && finalTargetIndex <= draggedEnd) {
                return false;
            }
            
            // Tüm öğeleri kaldır (sondan başa doğru)
            itemsToMove.reverse().forEach(item => {
                const idx = this.tableData.indexOf(item);
                if (idx !== -1) {
                    this.tableData.splice(idx, 1);
                    // Hedef indeksi ayarla
                    if (idx < finalTargetIndex) {
                        finalTargetIndex--;
                    }
                }
            });
            itemsToMove.reverse(); // Düzeni koru
            
            // Tüm öğeleri yeni konuma ekle
            itemsToMove.forEach((item, i) => {
                this.tableData.splice(finalTargetIndex + i, 0, item);
            });
            
            this.reorderPNo();
            this.renderTable();
            this.updateSummary();
            
            window.UIManager.showNotification('Satır(lar) taşındı', 'success');
            
            if (window.UIManager && typeof window.UIManager.refreshAllFilteredTabs === 'function') {
                window.UIManager.refreshAllFilteredTabs();
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