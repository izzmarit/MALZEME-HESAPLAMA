// Sürükle-Bırak İşlevleri Modülü
(function(window) {
    'use strict';
    
    const DragDropManager = {
        draggedElement: null,
        draggedIndex: null,
        dropZones: new Map(),
        isDragging: false,
        
        // Başlangıç
        initialize: function() {
            this.bindEvents();
            this.enableTableRowDragging();
            this.createInsertionIndicator();
        },
        
        // Tablo satır sürüklemeyi etkinleştir
        enableTableRowDragging: function() {
            const table = document.getElementById('malzemeTablosu');
            if (!table) return;
            
            const tbody = table.querySelector('tbody');
            if (!tbody) return;
            
            // Mevcut satırları sürüklenebilir yap
            this.makeRowsDraggable(tbody);
            
            // Yeni satırlar eklendiğinde otomatik olarak sürüklenebilir yapmak için observer
            this.observeTableChanges(tbody);
        },
        
        // Satırları sürüklenebilir yap
        makeRowsDraggable: function(tbody) {
            const rows = tbody.querySelectorAll('tr');
            rows.forEach((row, index) => {
                this.makeRowDraggable(row, index);
            });
        },
        
        // Tek satırı sürüklenebilir yap
        makeRowDraggable: function(row, index) {
            // Zaten sürüklenebilir ise atla
            if (row.hasAttribute('draggable')) return;
            
            row.setAttribute('draggable', 'true');
            row.classList.add('draggable-row');
            
            // Sürükleme tutamacı ekle
            const firstCell = row.querySelector('td:first-child');
            if (firstCell && !firstCell.querySelector('.drag-handle')) {
                const dragHandle = document.createElement('span');
                dragHandle.className = 'drag-handle';
                dragHandle.innerHTML = '⋮⋮';
                dragHandle.title = 'Satırı taşımak için sürükleyin';
                
                // Handle'ı ilk hücrenin başına ekle
                firstCell.insertBefore(dragHandle, firstCell.firstChild);
            }
            
            // Event listener'ları ekle
            row.addEventListener('dragstart', this.handleDragStart.bind(this));
            row.addEventListener('dragend', this.handleDragEnd.bind(this));
            row.addEventListener('dragover', this.handleDragOver.bind(this));
            row.addEventListener('drop', this.handleDrop.bind(this));
            row.addEventListener('dragenter', this.handleDragEnter.bind(this));
            row.addEventListener('dragleave', this.handleDragLeave.bind(this));
        },
        
        // Tablo değişikliklerini izle
        observeTableChanges: function(tbody) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach((node) => {
                            if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'TR') {
                                const index = Array.from(tbody.children).indexOf(node);
                                this.makeRowDraggable(node, index);
                            }
                        });
                    }
                });
            });
            
            observer.observe(tbody, {
                childList: true
            });
        },
        
        // Ekleme göstergesi oluştur
        createInsertionIndicator: function() {
            if (document.getElementById('insertion-indicator')) return;
            
            const indicator = document.createElement('div');
            indicator.id = 'insertion-indicator';
            indicator.className = 'insertion-indicator';
            indicator.style.cssText = `
                position: absolute;
                height: 3px;
                background: var(--primary-color, #667eea);
                border-radius: 2px;
                box-shadow: 0 0 5px rgba(102, 126, 234, 0.5);
                z-index: 1000;
                display: none;
                pointer-events: none;
            `;
            
            document.body.appendChild(indicator);
        },
        
        // Ekleme göstergesini göster
        showInsertionIndicator: function(targetRow, position) {
            const indicator = document.getElementById('insertion-indicator');
            if (!indicator || !targetRow) return;
            
            const rect = targetRow.getBoundingClientRect();
            const tableRect = targetRow.closest('table').getBoundingClientRect();
            
            indicator.style.display = 'block';
            indicator.style.left = tableRect.left + 'px';
            indicator.style.width = tableRect.width + 'px';
            
            if (position === 'before') {
                indicator.style.top = (rect.top - 2) + 'px';
            } else {
                indicator.style.top = (rect.bottom - 1) + 'px';
            }
        },
        
        // Ekleme göstergesini gizle
        hideInsertionIndicator: function() {
            const indicator = document.getElementById('insertion-indicator');
            if (indicator) {
                indicator.style.display = 'none';
            }
        },
        
        // Sürükleme başlangıcı
        handleDragStart: function(e) {
            this.draggedElement = e.currentTarget;
            this.draggedIndex = Array.from(this.draggedElement.parentNode.children).indexOf(this.draggedElement);
            this.isDragging = true;
            
            // Sürüklenen satırı görsel olarak işaretle
            e.currentTarget.classList.add('dragging');
            
            // Transfer verisini ayarla
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', e.currentTarget.outerHTML);
            e.dataTransfer.setData('text/plain', this.draggedIndex.toString());
            
            // Drag image'i ayarla
            const dragImage = e.currentTarget.cloneNode(true);
            dragImage.style.opacity = '0.8';
            dragImage.style.transform = 'rotate(2deg)';
            e.dataTransfer.setDragImage(dragImage, 0, 0);
        },
        
        // Sürükleme bitişi
        handleDragEnd: function(e) {
            e.currentTarget.classList.remove('dragging');
            this.hideInsertionIndicator();
            
            // Tüm hover durumlarını temizle
            const rows = e.currentTarget.parentNode.querySelectorAll('tr');
            rows.forEach(row => {
                row.classList.remove('drag-over-before', 'drag-over-after');
            });
            
            this.draggedElement = null;
            this.draggedIndex = null;
            this.isDragging = false;
        },
        
        // Sürükleme üzerine
        handleDragOver: function(e) {
            if (!this.isDragging || e.currentTarget === this.draggedElement) return;
            
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            
            const rect = e.currentTarget.getBoundingClientRect();
            const mouseY = e.clientY;
            const rowMiddle = rect.top + (rect.height / 2);
            
            // Sürükleme pozisyonunu belirle
            const position = mouseY < rowMiddle ? 'before' : 'after';
            
            // Görsel geri bildirim göster
            this.showInsertionIndicator(e.currentTarget, position);
            
            // CSS sınıfları ile de göster
            e.currentTarget.classList.remove('drag-over-before', 'drag-over-after');
            e.currentTarget.classList.add(`drag-over-${position}`);
        },
        
        // Sürükleme girişi
        handleDragEnter: function(e) {
            if (!this.isDragging || e.currentTarget === this.draggedElement) return;
            e.preventDefault();
        },
        
        // Sürükleme çıkışı
        handleDragLeave: function(e) {
            // Fare tamamen satırdan çıktığında temizle
            const rect = e.currentTarget.getBoundingClientRect();
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            if (mouseX < rect.left || mouseX > rect.right || 
                mouseY < rect.top || mouseY > rect.bottom) {
                e.currentTarget.classList.remove('drag-over-before', 'drag-over-after');
            }
        },
        
        // Bırakma
        handleDrop: function(e) {
            if (!this.isDragging || e.currentTarget === this.draggedElement) return;
            
            e.preventDefault();
            e.stopPropagation();
            
            const targetRow = e.currentTarget;
            const targetIndex = Array.from(targetRow.parentNode.children).indexOf(targetRow);
            
            // Bırakma pozisyonunu belirle
            const rect = targetRow.getBoundingClientRect();
            const mouseY = e.clientY;
            const rowMiddle = rect.top + (rect.height / 2);
            const dropPosition = mouseY < rowMiddle ? 'before' : 'after';
            
            // Yeni pozisyonu hesapla
            let newIndex = targetIndex;
            if (dropPosition === 'after') {
                newIndex = targetIndex + 1;
            }
            
            // Aynı pozisyona bırakma kontrolü
            if (newIndex === this.draggedIndex || newIndex === this.draggedIndex + 1) {
                this.cleanupDragState(targetRow);
                return;
            }
            
            // Satırı taşı
            this.moveTableRow(this.draggedIndex, newIndex);
            
            // Temizlik
            this.cleanupDragState(targetRow);
            
            // Başarı mesajı
            UIManager.showNotification('Satır taşındı', 'success');
        },
        
        // Drag durumunu temizle
        cleanupDragState: function(targetRow) {
            targetRow.classList.remove('drag-over-before', 'drag-over-after');
            this.hideInsertionIndicator();
        },
        
        // Tablo satırını taşı
        moveTableRow: function(fromIndex, toIndex) {
            // Veri dizisinde değişiklik yap
            const tableData = TableManager.getTableData();
            if (fromIndex < 0 || fromIndex >= tableData.length) return;
            
            // Satırı çıkar ve yeni pozisyona ekle
            const movedItem = tableData.splice(fromIndex, 1)[0];
            
            // ToIndex'i düzelt
            let adjustedToIndex = toIndex;
            if (toIndex > fromIndex) {
                adjustedToIndex = toIndex - 1;
            }
            
            tableData.splice(adjustedToIndex, 0, movedItem);
            
            // P.No'ları yeniden numaralandır
            tableData.forEach((item, index) => {
                item.pNo = index + 1;
            });
            
            // Tabloyu yeniden render et
            TableManager.updateTableData(tableData);
            TableManager.renderTable();
            
            // Taşınan satırı vurgula
            setTimeout(() => {
                const newRow = document.querySelector(`#malzemeTablosu tbody tr:nth-child(${adjustedToIndex + 1})`);
                if (newRow) {
                    newRow.classList.add('moved-row');
                    setTimeout(() => {
                        newRow.classList.remove('moved-row');
                    }, 2000);
                }
            }, 100);
        },
        
        // Satır arası ekleme özelliği
        enableRowInsertion: function() {
            const tbody = document.querySelector('#malzemeTablosu tbody');
            if (!tbody) return;
            
            // Her satır arasına ekleme zonu ekle
            this.addInsertionZones(tbody);
            
            // Tablo değişikliklerini izle
            this.observeForInsertionZones(tbody);
        },
        
        // Ekleme zonları ekle
        addInsertionZones: function(tbody) {
            const rows = tbody.querySelectorAll('tr');
            
            rows.forEach((row, index) => {
                // Satırın üstüne ekleme zonu
                if (!row.previousElementSibling || 
                    !row.previousElementSibling.classList.contains('insertion-zone')) {
                    this.createInsertionZone(row, 'before', index);
                }
                
                // Son satırdan sonra da ekleme zonu
                if (index === rows.length - 1) {
                    this.createInsertionZone(row, 'after', index + 1);
                }
            });
        },
        
        // Ekleme zonu oluştur
        createInsertionZone: function(referenceRow, position, insertIndex) {
            const zone = document.createElement('tr');
            zone.className = 'insertion-zone';
            zone.style.cssText = `
                height: 8px;
                background: transparent;
                border: none;
                cursor: pointer;
                transition: all 0.2s ease;
            `;
            
            // Sütun sayısına göre tek hücre ekle
            const colCount = referenceRow.querySelectorAll('td').length;
            const cell = document.createElement('td');
            cell.setAttribute('colspan', colCount);
            cell.style.cssText = `
                padding: 0;
                border: none;
                background: transparent;
                position: relative;
            `;
            
            // Hover efekti için içerik
            cell.innerHTML = `
                <div class="insertion-zone-content" style="
                    height: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.2s ease;
                    background: linear-gradient(90deg, transparent, var(--primary-color, #667eea), transparent);
                    border-radius: 4px;
                ">
                    <span style="
                        font-size: 12px;
                        color: white;
                        font-weight: bold;
                        text-shadow: 0 1px 2px rgba(0,0,0,0.5);
                    ">+ Buraya Satır Ekle</span>
                </div>
            `;
            
            zone.appendChild(cell);
            
            // Event listener'lar
            zone.addEventListener('mouseenter', () => {
                const content = zone.querySelector('.insertion-zone-content');
                if (content) {
                    content.style.opacity = '0.8';
                }
            });
            
            zone.addEventListener('mouseleave', () => {
                const content = zone.querySelector('.insertion-zone-content');
                if (content) {
                    content.style.opacity = '0';
                }
            });
            
            zone.addEventListener('click', () => {
                this.insertNewRowAt(insertIndex);
            });
            
            // Zonu uygun yere ekle
            if (position === 'before') {
                referenceRow.parentNode.insertBefore(zone, referenceRow);
            } else {
                referenceRow.parentNode.insertBefore(zone, referenceRow.nextSibling);
            }
        },
        
        // Belirtilen pozisyona yeni satır ekle
        insertNewRowAt: function(insertIndex) {
            // Boş bir satır verisi oluştur
            const emptyRow = {
                pNo: insertIndex + 1,
                adet: 1,
                malzemeTuru: '',
                malzemeCinsi: '',
                olculer: '',
                enNormu: '',
                suHacmi: '-',
                birimAgirlik: '0.00',
                toplamAgirlik: '0.00',
                heatNo: '-',
                originalType: '',
                originalGrade: ''
            };
            
            // Tablo verilerine ekle
            const tableData = TableManager.getTableData();
            tableData.splice(insertIndex, 0, emptyRow);
            
            // P.No'ları yeniden numaralandır
            tableData.forEach((item, index) => {
                item.pNo = index + 1;
            });
            
            // Tabloyu güncelle
            TableManager.updateTableData(tableData);
            TableManager.renderTable();
            
            // Yeni eklenen satırı düzenleme moduna al
            setTimeout(() => {
                TableManager.editRow(insertIndex);
                UIManager.showNotification('Yeni satır eklendi', 'success');
            }, 100);
        },
        
        // Ekleme zonları için observer
        observeForInsertionZones: function(tbody) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        // Eski insertion zone'ları temizle
                        const oldZones = tbody.querySelectorAll('.insertion-zone');
                        oldZones.forEach(zone => zone.remove());
                        
                        // Yeni zone'ları ekle
                        setTimeout(() => {
                            this.addInsertionZones(tbody);
                        }, 50);
                    }
                });
            });
            
            observer.observe(tbody, {
                childList: true
            });
        },
        
        // Sütun sürükleme özelliği (ColumnManager ile entegrasyon)
        enableColumnDragging: function() {
            const table = document.getElementById('malzemeTablosu');
            if (!table) return;
            
            const headers = table.querySelectorAll('thead th');
            headers.forEach((header, index) => {
                this.makeColumnHeaderDraggable(header, index);
            });
        },
        
        // Sütun başlığını sürüklenebilir yap
        makeColumnHeaderDraggable: function(header, index) {
            header.setAttribute('draggable', 'true');
            header.classList.add('draggable-header');
            
            header.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', index.toString());
                e.dataTransfer.effectAllowed = 'move';
                header.classList.add('dragging-header');
            });
            
            header.addEventListener('dragend', (e) => {
                header.classList.remove('dragging-header');
            });
            
            header.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                header.classList.add('drag-over-header');
            });
            
            header.addEventListener('dragleave', (e) => {
                header.classList.remove('drag-over-header');
            });
            
            header.addEventListener('drop', (e) => {
                e.preventDefault();
                const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
                const toIndex = index;
                
                if (fromIndex !== toIndex && typeof ColumnManager !== 'undefined') {
                    ColumnManager.reorderColumns(fromIndex, toIndex);
                }
                
                header.classList.remove('drag-over-header');
            });
        },
        
        // Event'ları bağla
        bindEvents: function() {
            // Tablo yenilendiğinde sürükleme özelliklerini yeniden etkinleştir
            document.addEventListener('tableRendered', () => {
                setTimeout(() => {
                    this.enableTableRowDragging();
                    this.enableRowInsertion();
                }, 100);
            });
            
            // Escape tuşu ile sürüklemeyi iptal et
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isDragging) {
                    this.cancelDrag();
                }
            });
        },
        
        // Sürüklemeyi iptal et
        cancelDrag: function() {
            if (this.draggedElement) {
                this.draggedElement.classList.remove('dragging');
                this.hideInsertionIndicator();
                
                // Tüm hover durumlarını temizle
                const rows = document.querySelectorAll('#malzemeTablosu tbody tr');
                rows.forEach(row => {
                    row.classList.remove('drag-over-before', 'drag-over-after');
                });
                
                this.draggedElement = null;
                this.draggedIndex = null;
                this.isDragging = false;
            }
        },
        
        // Touch desteği ekle (mobile için)
        enableTouchSupport: function() {
            let touchStartY = 0;
            let touchElement = null;
            
            document.addEventListener('touchstart', (e) => {
                const row = e.target.closest('tr[draggable="true"]');
                if (row) {
                    touchStartY = e.touches[0].clientY;
                    touchElement = row;
                    row.classList.add('touch-dragging');
                }
            });
            
            document.addEventListener('touchmove', (e) => {
                if (touchElement) {
                    e.preventDefault();
                    const touchY = e.touches[0].clientY;
                    const deltaY = touchY - touchStartY;
                    
                    // Görsel geri bildirim
                    touchElement.style.transform = `translateY(${deltaY}px)`;
                    touchElement.style.opacity = '0.7';
                }
            });
            
            document.addEventListener('touchend', (e) => {
                if (touchElement) {
                    touchElement.classList.remove('touch-dragging');
                    touchElement.style.transform = '';
                    touchElement.style.opacity = '';
                    
                    // Drop zone'u bul
                    const touchY = e.changedTouches[0].clientY;
                    const dropTarget = document.elementFromPoint(e.changedTouches[0].clientX, touchY);
                    const dropRow = dropTarget?.closest('tr[draggable="true"]');
                    
                    if (dropRow && dropRow !== touchElement) {
                        const fromIndex = Array.from(touchElement.parentNode.children).indexOf(touchElement);
                        const toIndex = Array.from(dropRow.parentNode.children).indexOf(dropRow);
                        this.moveTableRow(fromIndex, toIndex);
                    }
                    
                    touchElement = null;
                }
            });
        },
        
        // Sürükleme özelliğini etkinleştir/devre dışı bırak
        setDraggingEnabled: function(enabled) {
            const rows = document.querySelectorAll('#malzemeTablosu tbody tr');
            
            rows.forEach(row => {
                if (enabled) {
                    row.setAttribute('draggable', 'true');
                    row.classList.add('draggable-row');
                } else {
                    row.removeAttribute('draggable');
                    row.classList.remove('draggable-row');
                }
            });
            
            // Drag handle'ları göster/gizle
            const handles = document.querySelectorAll('.drag-handle');
            handles.forEach(handle => {
                handle.style.display = enabled ? 'inline' : 'none';
            });
        }
    };
    
    // Modülü window objesine bağla
    window.DragDropManager = DragDropManager;
    
})(window);