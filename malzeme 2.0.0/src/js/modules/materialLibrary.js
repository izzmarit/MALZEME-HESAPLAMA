// Standart Malzeme Kütüphanesi Modülü
(function(window) {
    'use strict';
    
    const MaterialLibrary = {
        // Standart malzeme kütüphaneleri
        libraries: new Map(),
        currentLibrary: null,
        
        // Önceden tanımlı standart malzemeler
        standardLibraries: {
            'kazan_elemanlari': {
                name: 'Kazan Elemanları',
                description: 'Standart kazan üretimi için gerekli malzemeler',
                items: [
                    {
                        name: 'Kazan Saçı 6mm',
                        type: 'sac',
                        grade: 'P265GH',
                        dimensions: { kalinlik: 6, en: 2000, boy: 6000 },
                        category: 'ana_malzeme'
                    },
                    {
                        name: 'Kazan Saçı 8mm',
                        type: 'sac',
                        grade: 'P265GH',
                        dimensions: { kalinlik: 8, en: 2000, boy: 6000 },
                        category: 'ana_malzeme'
                    },
                    {
                        name: 'Ateş Borusu',
                        type: 'boru',
                        grade: 'P235GH',
                        dimensions: { disCap: 57, etKalinlik: 3.2, uzunluk: 1500 },
                        category: 'boru_sistemleri'
                    },
                    {
                        name: 'Duman Borusu',
                        type: 'boru',
                        grade: 'P235GH',
                        dimensions: { disCap: 76.1, etKalinlik: 3.2, uzunluk: 1500 },
                        category: 'boru_sistemleri'
                    }
                ]
            },
            
            'flans_standartlari': {
                name: 'Flanş Standartları',
                description: 'EN 1092-1 standart flanşlar',
                items: [
                    {
                        name: 'DN100 PN16 Düz Flanş',
                        type: 'flans',
                        grade: 'P235GH',
                        dimensions: { flansTipi: 'duzFlans', dnOlcusu: '100', pnSinifi: 'PN16' },
                        category: 'flanşlar'
                    },
                    {
                        name: 'DN150 PN16 Kaynak Boyunlu',
                        type: 'flans',
                        grade: 'P235GH',
                        dimensions: { flansTipi: 'kaynakBoyunluFlans', dnOlcusu: '150', pnSinifi: 'PN16' },
                        category: 'flanşlar'
                    }
                ]
            },
            
            'profil_standartlari': {
                name: 'Profil Standartları',
                description: 'Sık kullanılan çelik profiller',
                items: [
                    {
                        name: 'IPE 160',
                        type: 'ipe',
                        grade: 'S235JR',
                        dimensions: { profilBoyutu: '160', uzunluk: 6000 },
                        category: 'profiller'
                    },
                    {
                        name: 'HEB 200',
                        type: 'heb',
                        grade: 'S235JR',
                        dimensions: { profilBoyutu: '200', uzunluk: 6000 },
                        category: 'profiller'
                    },
                    {
                        name: 'L 50x50x5',
                        type: 'kosebent',
                        grade: 'S235JR',
                        dimensions: { kenar1: 50, kenar2: 50, etKalinlik: 5, uzunluk: 6000 },
                        category: 'profiller'
                    }
                ]
            }
        },
        
        // Başlangıç
        initialize: function() {
            this.loadStandardLibraries();
            this.loadCustomLibraries();
            this.bindEvents();
        },
        
        // Standart kütüphaneleri yükle
        loadStandardLibraries: function() {
            Object.keys(this.standardLibraries).forEach(key => {
                this.libraries.set(key, this.standardLibraries[key]);
            });
        },
        
        // Özel kütüphaneleri yükle
        loadCustomLibraries: function() {
            const stored = localStorage.getItem('customMaterialLibraries');
            if (stored) {
                try {
                    const customLibraries = JSON.parse(stored);
                    Object.keys(customLibraries).forEach(key => {
                        this.libraries.set(key, customLibraries[key]);
                    });
                } catch (error) {
                    console.error('Özel kütüphaneler yüklenemedi:', error);
                }
            }
        },
        
        // Kütüphaneleri kaydet
        saveCustomLibraries: function() {
            const customLibraries = {};
            this.libraries.forEach((library, key) => {
                if (!this.standardLibraries[key]) {
                    customLibraries[key] = library;
                }
            });
            localStorage.setItem('customMaterialLibraries', JSON.stringify(customLibraries));
        },
        
        // Kütüphane listesini göster
        showLibraryDialog: function() {
            const libraryList = Array.from(this.libraries.entries()).map(([key, library]) => `
                <div class="library-item" data-library-id="${key}">
                    <div class="library-info">
                        <h4>${library.name}</h4>
                        <p>${library.description}</p>
                        <small>${library.items.length} malzeme</small>
                    </div>
                    <div class="library-actions">
                        <button onclick="MaterialLibrary.showLibraryContents('${key}')" class="btn-view">Görüntüle</button>
                        <button onclick="MaterialLibrary.addLibraryToTable('${key}')" class="btn-add-all">Tümünü Ekle</button>
                        ${!this.standardLibraries[key] ? `<button onclick="MaterialLibrary.deleteLibrary('${key}')" class="btn-delete">Sil</button>` : ''}
                    </div>
                </div>
            `).join('');
            
            const content = `
                <div class="material-library-dialog">
                    <div class="library-header">
                        <h3>📚 Malzeme Kütüphanesi</h3>
                        <button onclick="MaterialLibrary.showCreateLibraryDialog()" class="btn btn-success">+ Yeni Kütüphane</button>
                    </div>
                    
                    <div class="library-list">
                        ${libraryList}
                    </div>
                </div>
            `;
            
            UIManager.openModal(content, 'Malzeme Kütüphanesi');
        },
        
        // Kütüphane içeriğini göster
        showLibraryContents: function(libraryId) {
            const library = this.libraries.get(libraryId);
            if (!library) return;
            
            const itemsList = library.items.map((item, index) => `
                <div class="library-material-item">
                    <div class="material-details">
                        <strong>${item.name}</strong>
                        <div class="material-specs">
                            <span class="material-type">${this.formatMaterialType(item.type)}</span>
                            <span class="material-grade">${item.grade}</span>
                            <span class="material-category">${item.category}</span>
                        </div>
                        <div class="material-dimensions">
                            ${this.formatDimensions(item.type, item.dimensions)}
                        </div>
                    </div>
                    <div class="material-actions">
                        <button onclick="MaterialLibrary.addItemToCalculator('${libraryId}', ${index})" class="btn-use">Kullan</button>
                        <button onclick="MaterialLibrary.addItemToTable('${libraryId}', ${index})" class="btn-add">Tabloya Ekle</button>
                    </div>
                </div>
            `).join('');
            
            const content = `
                <div class="library-contents-dialog">
                    <div class="library-contents-header">
                        <h3>${library.name}</h3>
                        <p>${library.description}</p>
                    </div>
                    
                    <div class="library-materials-list">
                        ${itemsList}
                    </div>
                    
                    <div class="dialog-actions">
                        <button onclick="MaterialLibrary.showLibraryDialog()" class="btn btn-secondary">← Geri</button>
                        <button onclick="UIManager.closeModal()" class="btn btn-primary">Kapat</button>
                    </div>
                </div>
            `;
            
            UIManager.openModal(content, `${library.name} - İçerik`);
        },
        
        // Malzeme türünü formatla
        formatMaterialType: function(type) {
            const types = {
                'sac': 'Sac',
                'lama': 'Lama',
                'boru': 'Boru',
                'kosebent': 'Köşebent',
                'ipe': 'IPE',
                'heb': 'HEB',
                'hea': 'HEA',
                'flans': 'Flanş'
            };
            return types[type] || type;
        },
        
        // Ölçüleri formatla
        formatDimensions: function(type, dimensions) {
            switch (type) {
                case 'sac':
                    return `${dimensions.kalinlik}x${dimensions.en}x${dimensions.boy}mm`;
                case 'boru':
                    return `Ø${dimensions.disCap}x${dimensions.etKalinlik}x${dimensions.uzunluk}mm`;
                case 'kosebent':
                    return `L${dimensions.kenar1}x${dimensions.kenar2}x${dimensions.etKalinlik}x${dimensions.uzunluk}mm`;
                case 'ipe':
                case 'heb':
                case 'hea':
                    return `${type.toUpperCase()} ${dimensions.profilBoyutu}x${dimensions.uzunluk}mm`;
                case 'flans':
                    return `${dimensions.flansTipi} DN${dimensions.dnOlcusu} ${dimensions.pnSinifi}`;
                default:
                    return JSON.stringify(dimensions);
            }
        },
        
        // Malzemeyi hesaplama formuna yükle
        addItemToCalculator: function(libraryId, itemIndex) {
            const library = this.libraries.get(libraryId);
            const item = library.items[itemIndex];
            
            // Malzeme türünü seç
            document.getElementById('malzemeTuru').value = item.type;
            MaterialCalculator.malzemeTuruDegisti();
            
            // Kısa gecikme sonrası ölçüleri doldur
            setTimeout(() => {
                // Malzeme cinsini seç
                document.getElementById('malzemeCinsi').value = item.grade;
                
                // Ölçüleri doldur
                this.fillCalculatorDimensions(item.type, item.dimensions);
                
                UIManager.closeModal();
                UIManager.showNotification(`${item.name} hesaplama formuna yüklendi`, 'success');
            }, 200);
        },
        
        // Hesaplama alanlarını doldur
        fillCalculatorDimensions: function(type, dimensions) {
            switch (type) {
                case 'sac':
                    document.getElementById('kalinlik').value = dimensions.kalinlik;
                    document.getElementById('en').value = dimensions.en;
                    document.getElementById('boy').value = dimensions.boy;
                    break;
                    
                case 'boru':
                    document.getElementById('disCap').value = dimensions.disCap;
                    document.getElementById('etKalinlik').value = dimensions.etKalinlik;
                    document.getElementById('uzunluk').value = dimensions.uzunluk;
                    break;
                    
                case 'kosebent':
                    document.getElementById('kenar1').value = dimensions.kenar1;
                    document.getElementById('kenar2').value = dimensions.kenar2;
                    document.getElementById('etKalinlik').value = dimensions.etKalinlik;
                    document.getElementById('uzunluk').value = dimensions.uzunluk;
                    break;
                    
                case 'ipe':
                case 'heb':
                case 'hea':
                    document.getElementById('profilBoyutu').value = dimensions.profilBoyutu;
                    document.getElementById('uzunluk').value = dimensions.uzunluk;
                    break;
                    
                case 'flans':
                    document.getElementById('flansTipi').value = dimensions.flansTipi;
                    document.getElementById('dnOlcusu').value = dimensions.dnOlcusu;
                    document.getElementById('pnSinifi').value = dimensions.pnSinifi;
                    MaterialCalculator.flansAgirligiGuncelle();
                    break;
            }
        },
        
        // Malzemeyi doğrudan tabloya ekle
        addItemToTable: function(libraryId, itemIndex) {
            const library = this.libraries.get(libraryId);
            const item = library.items[itemIndex];
            
            // Hesaplayıcıya yükle
            this.addItemToCalculator(libraryId, itemIndex);
            
            // Hesapla ve tabloya ekle
            setTimeout(() => {
                Calculator.calculate();
                setTimeout(() => {
                    TableManager.addRow();
                }, 100);
            }, 300);
        },
        
        // Tüm kütüphaneyi tabloya ekle
        addLibraryToTable: function(libraryId) {
            const library = this.libraries.get(libraryId);
            
            if (confirm(`"${library.name}" kütüphanesindeki ${library.items.length} malzemeyi tabloya eklemek istiyor musunuz?`)) {
                let addedCount = 0;
                
                const addNextItem = (index) => {
                    if (index >= library.items.length) {
                        UIManager.showNotification(`${addedCount} malzeme tabloya eklendi`, 'success');
                        UIManager.closeModal();
                        return;
                    }
                    
                    this.addItemToTable(libraryId, index);
                    addedCount++;
                    
                    // Sonraki malzeme için bekle
                    setTimeout(() => addNextItem(index + 1), 1000);
                };
                
                addNextItem(0);
            }
        },
        
        // Yeni kütüphane oluşturma dialogu
        showCreateLibraryDialog: function() {
            const content = `
                <div class="create-library-dialog">
                    <h3>Yeni Malzeme Kütüphanesi Oluştur</h3>
                    
                    <div class="form-group">
                        <label>Kütüphane Adı *</label>
                        <input type="text" id="newLibraryName" placeholder="Örn: Projeme Özel Malzemeler" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Açıklama</label>
                        <textarea id="newLibraryDescription" placeholder="Kütüphane açıklaması..." rows="3"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Başlangıç Verisi</label>
                        <div class="radio-group">
                            <label><input type="radio" name="initType" value="empty" checked> Boş kütüphane</label>
                            <label><input type="radio" name="initType" value="current"> Mevcut tablodan kopyala</label>
                            <label><input type="radio" name="initType" value="template"> Şablon kullan</label>
                        </div>
                    </div>
                    
                    <div id="templateOptions" style="display: none;">
                        <select id="templateSelect">
                            <option value="">Şablon seçin...</option>
                            <option value="basic_steel">Temel Çelik Malzemeler</option>
                            <option value="pipes_fittings">Boru ve Ek Parçalar</option>
                            <option value="structural">Yapısal Çelik</option>
                        </select>
                    </div>
                    
                    <div class="dialog-actions">
                        <button onclick="MaterialLibrary.createNewLibrary()" class="btn btn-success">Oluştur</button>
                        <button onclick="MaterialLibrary.showLibraryDialog()" class="btn btn-secondary">İptal</button>
                    </div>
                </div>
            `;
            
            UIManager.openModal(content, 'Yeni Kütüphane');
            
            // Radio buton event listener
            document.querySelectorAll('input[name="initType"]').forEach(radio => {
                radio.addEventListener('change', function() {
                    const templateOptions = document.getElementById('templateOptions');
                    templateOptions.style.display = this.value === 'template' ? 'block' : 'none';
                });
            });
        },
        
        // Yeni kütüphane oluştur
        createNewLibrary: function() {
            const name = document.getElementById('newLibraryName').value.trim();
            const description = document.getElementById('newLibraryDescription').value.trim();
            const initType = document.querySelector('input[name="initType"]:checked').value;
            
            if (!name) {
                UIManager.showNotification('Kütüphane adı gereklidir', 'warning');
                return;
            }
            
            const libraryId = this.generateLibraryId(name);
            const newLibrary = {
                name: name,
                description: description || '',
                items: [],
                created: new Date().toISOString(),
                isCustom: true
            };
            
            // Başlangıç verisini ekle
            switch (initType) {
                case 'current':
                    newLibrary.items = this.convertTableDataToLibraryItems();
                    break;
                case 'template':
                    const template = document.getElementById('templateSelect').value;
                    if (template) {
                        newLibrary.items = this.getTemplateItems(template);
                    }
                    break;
            }
            
            this.libraries.set(libraryId, newLibrary);
            this.saveCustomLibraries();
            
            UIManager.showNotification('Yeni kütüphane oluşturuldu', 'success');
            this.showLibraryDialog();
        },
        
        // Mevcut tablo verilerini kütüphane öğelerine dönüştür
        convertTableDataToLibraryItems: function() {
            const tableData = TableManager.getTableData();
            return tableData.map(row => ({
                name: `${row.malzemeTuru} - ${row.malzemeCinsi}`,
                type: row.originalType,
                grade: row.originalGrade || row.malzemeCinsi,
                dimensions: this.parseDimensionsFromRow(row),
                category: 'mevcut_tablo'
            }));
        },
        
        // Satır verilerinden ölçüleri parse et
        parseDimensionsFromRow: function(row) {
            const type = row.originalType;
            const olculer = row.olculer;
            
            // Basit parsing - geliştirilmesi gerekebilir
            switch (type) {
                case 'sac':
                    const sacMatch = olculer.match(/([\d.]+)x([\d.]+)x([\d.]+)/);
                    if (sacMatch) {
                        return {
                            kalinlik: parseFloat(sacMatch[1]),
                            en: parseFloat(sacMatch[2]),
                            boy: parseFloat(sacMatch[3])
                        };
                    }
                    break;
                    
                default:
                    return { olculer: olculer };
            }
            
            return {};
        },
        
        // Şablon öğeleri al
        getTemplateItems: function(template) {
            const templates = {
                'basic_steel': [
                    {
                        name: 'Sac 5mm',
                        type: 'sac',
                        grade: 'S235JR',
                        dimensions: { kalinlik: 5, en: 2000, boy: 6000 },
                        category: 'temel'
                    },
                    {
                        name: 'Lama 40x5',
                        type: 'lama',
                        grade: 'S235JR',
                        dimensions: { kalinlik: 5, genislik: 40, uzunluk: 6000 },
                        category: 'temel'
                    }
                ],
                'pipes_fittings': [
                    {
                        name: 'Boru DN50',
                        type: 'boru',
                        grade: 'P235GH',
                        dimensions: { disCap: 60.3, etKalinlik: 3.2, uzunluk: 6000 },
                        category: 'boru'
                    }
                ],
                'structural': [
                    {
                        name: 'IPE 160',
                        type: 'ipe',
                        grade: 'S235JR',
                        dimensions: { profilBoyutu: '160', uzunluk: 6000 },
                        category: 'profil'
                    }
                ]
            };
            
            return templates[template] || [];
        },
        
        // Kütüphane ID oluştur
        generateLibraryId: function(name) {
            return 'library_' + name.toLowerCase()
                .replace(/[üğıöçş]/g, c => 'ugiocs'['üğıöçş'.indexOf(c)])
                .replace(/[^a-z0-9]/g, '_')
                .replace(/_+/g, '_')
                .replace(/^_|_$/g, '') + '_' + Date.now();
        },
        
        // Kütüphane sil
        deleteLibrary: function(libraryId) {
            const library = this.libraries.get(libraryId);
            if (!library) return;
            
            if (confirm(`"${library.name}" kütüphanesini silmek istediğinizden emin misiniz?`)) {
                this.libraries.delete(libraryId);
                this.saveCustomLibraries();
                UIManager.showNotification('Kütüphane silindi', 'success');
                this.showLibraryDialog();
            }
        },
        
        // Event'ları bağla
        bindEvents: function() {
            // Bu fonksiyon gerektiğinde event listener'ları eklemek için
        },
        
        // Tüm kütüphaneleri al
        getAllLibraries: function() {
            return Array.from(this.libraries.entries()).map(([id, library]) => ({
                id: id,
                ...library
            }));
        },
        
        // Kütüphane ara
        searchLibraries: function(query) {
            const results = [];
            this.libraries.forEach((library, id) => {
                if (library.name.toLowerCase().includes(query.toLowerCase()) ||
                    library.description.toLowerCase().includes(query.toLowerCase())) {
                    results.push({ id, ...library });
                }
                
                // Malzeme öğelerinde de ara
                library.items.forEach(item => {
                    if (item.name.toLowerCase().includes(query.toLowerCase())) {
                        results.push({ id, library: library.name, item: item });
                    }
                });
            });
            
            return results;
        }
    };
    
    // Modülü window objesine bağla
    window.MaterialLibrary = MaterialLibrary;
    
})(window);