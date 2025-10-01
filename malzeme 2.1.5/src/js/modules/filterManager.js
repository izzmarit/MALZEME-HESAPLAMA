// Filtreleme Yönetimi Modülü
(function(window) {
    'use strict';
    
    const FilterManager = {
        filteredData: [],
        filterType: '',
        filteredWindow: null,
        
        // Filtreleme modalını aç
        showFilterDialog: function() {
            const materialTypes = this.getUniqueMaterialTypes();
            if (materialTypes.length === 0) {
                UIManager.showNotification('Henüz tabloda malzeme bulunmuyor', 'info');
                return;
            }
            
            const typeOptions = materialTypes.map(type => 
                `<option value="${type}">${type}</option>`
            ).join('');
            
            const content = `
                <div class="filter-container">
                    <h3><span data-lang="filter_by_type">Türe Göre Filtrele</span></h3>
                    <div class="form-group">
                        <label><span data-lang="material_type">Malzeme Türü</span></label>
                        <select id="filterMaterialType">
                            <option value="" data-lang="all">Tümü</option>
                            ${typeOptions}
                        </select>
                    </div>
                    <div class="filter-actions">
                        <button onclick="FilterManager.applyFilter()" class="btn btn-primary">
                            <span data-lang="filter_materials">Filtrele</span>
                        </button>
                        <button onclick="UIManager.closeModal()" class="btn btn-secondary">
                            <span data-lang="cancel">İptal</span>
                        </button>
                    </div>
                </div>
            `;
            
            UIManager.openModal(content, LanguageManager.getText('filter_by_type'));
            
            // Modal içeriğini dil sistemine entegre et
            setTimeout(() => {
                LanguageManager.updateDynamicContent(document.getElementById('settingsModal'));
            }, 100);
        },
        
        // Benzersiz malzeme türlerini getir
        getUniqueMaterialTypes: function() {
            const data = TableManager.getTableData();
            const types = data.map(row => {
                // Flanş tiplerini tek kategori altında topla
                if (row.originalType === 'flans') {
                    return 'Standart Flanş';
                }
                // ASME Flanş tiplerini tek kategori altında topla
                else if (row.originalType === 'flansAsme') {
                    return 'Standart Flanş (ASME)';
                }
                // Izgara elemanlarını tek kategori altında topla
                else if (row.originalType === 'izgara') {
                    return 'Izgara Elemanları';
                }
                // Eklenen malzemeleri tek kategori altında topla
                else if (row.originalType === 'eklenenMalzeme') {
                    return 'Eklenen Malzeme';
                }
                // Dirsek türlerini tek kategori altında topla
                else if (row.originalType === 'dirsek') {
                    return 'Dirsek';
                }
                // Özel malzemeleri tek kategori altında topla
                else if (row.originalType === 'ozelMalzeme') {
                    return 'Özel Malzeme';
                }
                // Diğer türler için normal işlem
                else {
                    return row.malzemeTuru;
                }
            });
            
            const uniqueTypes = [...new Set(types)];
            return uniqueTypes.filter(type => type && type.trim() !== '').sort();
        },
        
        // Filtreyi uygula
        applyFilter: function() {
            const selectedType = document.getElementById('filterMaterialType').value;
            
            if (!selectedType) {
                UIManager.showNotification('Lütfen bir malzeme türü seçin', 'warning');
                return;
            }
            
            const allData = TableManager.getTableData();
            
            // Özel filtreler için kategorik işlem
            switch(selectedType) {
                case 'Standart Flanş':
                    this.filteredData = allData.filter(row => row.originalType === 'flans');
                    break;
                case 'Standart Flanş (ASME)':
                    this.filteredData = allData.filter(row => row.originalType === 'flansAsme');
                    break;
                case 'Izgara Elemanları':
                    this.filteredData = allData.filter(row => row.originalType === 'izgara');
                    break;
                case 'Eklenen Malzeme':
                    this.filteredData = allData.filter(row => row.originalType === 'eklenenMalzeme');
                    break;
                case 'Dirsek':
                    this.filteredData = allData.filter(row => row.originalType === 'dirsek');
                    break;
                case 'Özel Malzeme':
                    this.filteredData = allData.filter(row => row.originalType === 'ozelMalzeme');
                    break;
                default:
                    this.filteredData = allData.filter(row => row.malzemeTuru === selectedType);
            }
            
            this.filterType = selectedType;
            
            if (this.filteredData.length === 0) {
                UIManager.showNotification('Seçilen türde malzeme bulunamadı', 'info');
                return;
            }
            
            UIManager.closeModal();
            this.openFilteredView();
        },
        
        // Filtrelenmiş görünümü aç
        openFilteredView: function() {
            try {
                // TabManager'ın yüklenip yüklenmediğini kontrol et
                if (typeof TabManager === 'undefined') {
                    console.error('TabManager yüklenmemiş');
                    UIManager.showNotification('Sekme sistemi henüz hazır değil. Lütfen sayfayı yenileyin.', 'error');
                    return;
                }
                
                // Yeni sekmede filtrelenmiş görünümü aç
                const tabId = TabManager.createNewTab({
                    title: `${this.filterType} (${this.filteredData.length})`,
                    icon: '🔍',
                    type: 'filtered',
                    closable: true,
                    data: {
                        filteredData: this.filteredData,
                        filterType: this.filterType
                    }
                });
                
                UIManager.showNotification(`${this.filterType} türünde ${this.filteredData.length} malzeme yeni sekmede açıldı`, 'success');
                
            } catch (error) {
                console.error('Filtrelenmiş görünüm oluşturma hatası:', error);
                UIManager.showNotification('Filtrelenmiş görünüm açılamadı: ' + error.message, 'error');
            }
        },
        
        // Filtrelenmiş HTML oluştur
        generateFilteredHTML: function() {
            const projectInfo = TableManager.getProjectInfo();
            const summary = this.calculateFilteredSummary();
            
            return `
                <!DOCTYPE html>
                <html lang="${LanguageManager.currentLanguage}">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Filtrelenmiş Liste - ${this.filterType}</title>
                    <style>
                        ${this.getFilteredStyles()}
                    </style>
                </head>
                <body>
                    <div class="filtered-container">
                        <div class="filtered-header">
                            <div class="header-left">
                                <h2>🔍 Filtrelenmiş Liste: ${this.filterType}</h2>
                                <div class="project-info-mini">
                                    <span><strong>Proje:</strong> ${projectInfo.projeAdi || '-'}</span>
                                    <span><strong>Sipariş No:</strong> ${projectInfo.siparisNo || '-'}</span>
                                </div>
                            </div>
                            <div class="filtered-actions">
                                <button onclick="exportFilteredToExcel()" class="btn btn-excel">
                                    💾 Excel Kaydet
                                </button>
                                <button onclick="printFilteredList()" class="btn btn-print">
                                    🖨️ Yazdır
                                </button>
                                <button onclick="window.close()" class="btn btn-close">
                                    ✖ Kapat
                                </button>
                            </div>
                        </div>
                        
                        <div class="filtered-summary">
                            <div class="summary-item">
                                <span class="summary-label">Toplam Malzeme:</span>
                                <span class="summary-value">${this.filteredData.length} adet</span>
                            </div>
                            <div class="summary-item">
                                <span class="summary-label">Toplam Parça:</span>
                                <span class="summary-value">${summary.toplamParca} adet</span>
                            </div>
                            <div class="summary-item">
                                <span class="summary-label">Toplam Ağırlık:</span>
                                <span class="summary-value">${summary.toplamAgirlik} kg</span>
                            </div>
                        </div>
                        
                        <div class="filtered-table-wrapper">
                            ${this.generateFilteredTable()}
                        </div>
                        
                        <div class="filtered-footer">
                            <p>Rapor Tarihi: ${new Date().toLocaleDateString('tr-TR')}</p>
                            <p>Hazırlayan: ${projectInfo.hazirlayan || '-'}</p>
                        </div>
                    </div>
                    
                    <script>
                        ${this.getFilteredScripts()}
                    </script>
                </body>
                </html>
            `;
        },
        
        // Filtrelenmiş tablo oluştur
        generateFilteredTable: function() {
            const headers = `
                <tr>
                    <th>P.No</th>
                    <th>Adet</th>
                    <th>Malzeme Türü</th>
                    <th>Malzeme Cinsi</th>
                    <th>Ölçüler</th>
                    <th>Standart</th>
                    <th>Su Hacmi (L)</th>
                    <th>Birim Ağırlık (kg)</th>
                    <th>Toplam Ağırlık (kg)</th>
                    <th>Açıklama / Heat No</th>
                </tr>
            `;
            
            const rows = this.filteredData.map((row, index) => {
                const isEven = index % 2 === 0;
                return `
                    <tr class="${isEven ? 'even-row' : 'odd-row'}">
                        <td>${row.pNo}</td>
                        <td>${row.adet}</td>
                        <td>${row.malzemeTuru}</td>
                        <td>${row.malzemeCinsi}</td>
                        <td>${row.olculer}</td>
                        <td>${row.enNormu}</td>
                        <td>${row.suHacmi}</td>
                        <td>${row.birimAgirlik}</td>
                        <td>${row.toplamAgirlik}</td>
                        <td>${row.heatNo}</td>
                    </tr>
                `;
            }).join('');
            
            return `
                <table class="filtered-table">
                    <thead>
                        ${headers}
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            `;
        },
        
        // Filtrelenmiş özet hesapla
        calculateFilteredSummary: function() {
            let toplamAgirlik = 0;
            let toplamParca = 0;
            
            this.filteredData.forEach(row => {
                const adet = parseFloat(row.adet) || 0;
                const satirAgirlik = parseFloat(row.toplamAgirlik) || 0;
                
                toplamParca += adet;
                toplamAgirlik += satirAgirlik;
            });
            
            return {
                toplamParca: toplamParca,
                toplamAgirlik: toplamAgirlik.toFixed(2)
            };
        },
        
        // Filtrelenmiş pencere stilleri
        getFilteredStyles: function() {
            return `
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    color: #2d3748;
                    background: #f7fafc;
                    line-height: 1.6;
                }
                
                .filtered-container {
                    padding: 20px;
                    max-width: 1200px;
                    margin: 0 auto;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }
                
                .filtered-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 20px;
                    padding-bottom: 15px;
                    border-bottom: 2px solid #e2e8f0;
                }
                
                .header-left h2 {
                    color: #667eea;
                    margin-bottom: 10px;
                    font-size: 1.5rem;
                }
                
                .project-info-mini {
                    display: flex;
                    gap: 20px;
                    font-size: 0.9rem;
                    color: #718096;
                }
                
                .filtered-actions {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                }
                
                .btn {
                    padding: 8px 15px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 0.85rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                }
                
                .btn-excel {
                    background: #107c41;
                    color: white;
                }
                
                .btn-excel:hover {
                    background: #0e6433;
                }
                
                .btn-print {
                    background: #4299e1;
                    color: white;
                }
                
                .btn-print:hover {
                    background: #3182ce;
                }
                
                .btn-close {
                    background: #718096;
                    color: white;
                }
                
                .btn-close:hover {
                    background: #4a5568;
                }
                
                .filtered-summary {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    padding: 15px 20px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                    display: flex;
                    justify-content: space-around;
                    flex-wrap: wrap;
                    gap: 15px;
                }
                
                .summary-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                }
                
                .summary-label {
                    font-size: 0.85rem;
                    opacity: 0.9;
                    margin-bottom: 5px;
                }
                
                .summary-value {
                    font-size: 1.2rem;
                    font-weight: bold;
                }
                
                .filtered-table-wrapper {
                    overflow-x: auto;
                    margin-bottom: 20px;
                    border-radius: 8px;
                    border: 1px solid #e2e8f0;
                }
                
                .filtered-table {
                    width: 100%;
                    border-collapse: separate;
                    border-spacing: 0;
                    background: white;
                }
                
                .filtered-table th {
                    background: #f7fafc;
                    padding: 12px 8px;
                    text-align: left;
                    font-weight: 600;
                    color: #4a5568;
                    font-size: 0.85rem;
                    border-bottom: 2px solid #e2e8f0;
                    white-space: nowrap;
                }
                
                .filtered-table td {
                    padding: 10px 8px;
                    border-bottom: 1px solid #e2e8f0;
                    font-size: 0.85rem;
                }
                
                .even-row {
                    background: #f7fafc;
                }
                
                .odd-row {
                    background: white;
                }
                
                .filtered-footer {
                    margin-top: 20px;
                    padding-top: 15px;
                    border-top: 1px solid #e2e8f0;
                    display: flex;
                    justify-content: space-between;
                    color: #718096;
                    font-size: 0.85rem;
                }
                
                @media print {
                    .filtered-actions {
                        display: none !important;
                    }
                    
                    .filtered-container {
                        box-shadow: none;
                        padding: 0;
                    }
                    
                    body {
                        background: white;
                    }
                }
                
                @media (max-width: 768px) {
                    .filtered-header {
                        flex-direction: column;
                        gap: 15px;
                    }
                    
                    .project-info-mini {
                        flex-direction: column;
                        gap: 5px;
                    }
                    
                    .filtered-summary {
                        flex-direction: column;
                        gap: 10px;
                    }
                    
                    .filtered-footer {
                        flex-direction: column;
                        gap: 5px;
                        text-align: center;
                    }
                }
            `;
        },
        
        // Filtrelenmiş pencere script'leri
        getFilteredScripts: function() {
            return `
                // Excel export fonksiyonu
                function exportFilteredToExcel() {
                    try {
                        // Ana pencereye mesaj gönder
                        if (window.opener && !window.opener.closed) {
                            window.opener.postMessage({
                                action: 'exportFilteredExcel',
                                data: ${JSON.stringify(this.filteredData)},
                                filterType: '${this.filterType}'
                            }, '*');
                        } else {
                            alert('Ana pencere bulunamadı. Lütfen ana pencereyi açık tutun.');
                        }
                    } catch (error) {
                        console.error('Excel export hatası:', error);
                        alert('Excel export sırasında hata oluştu.');
                    }
                }
                
                // Yazdırma fonksiyonu
                function printFilteredList() {
                    window.print();
                }
                
                // Pencere kapanırken temizlik
                window.addEventListener('beforeunload', function() {
                    if (window.opener && !window.opener.closed) {
                        window.opener.focus();
                    }
                });
            `;
        },
        
        // Filtrelenmiş pencere event'lerini ayarla
        setupFilteredWindowEvents: function() {
            // Bu fonksiyon filtrelenmiş pencerede çalışacak ek event'ler için kullanılabilir
            console.log('Filtrelenmiş pencere event\'leri ayarlandı');
        },
        
        // Bildirim göster
        showNotification: function(message, type = 'info') {
            if (typeof UIManager !== 'undefined' && UIManager.showNotification) {
                UIManager.showNotification(message, type);
            } else {
                console.log(`[${type.toUpperCase()}] ${message}`);
            }
        }
    };

    // Modülü window objesine bağla
    window.FilterManager = FilterManager;

})(window);