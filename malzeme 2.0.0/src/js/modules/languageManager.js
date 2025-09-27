// Dil Desteği Modülü
(function(window) {
    'use strict';
    
    const LanguageManager = {
        currentLanguage: 'tr',
        supportedLanguages: ['tr', 'en'],
        translations: {},
        
        // Başlangıç
        initialize: function() {
            this.loadTranslations();
            this.loadSavedLanguage();
            this.bindEvents();
        },
        
        // Çevirileri yükle
        loadTranslations: function() {
            this.translations = {
                tr: {
                    // Genel
                    'app.title': 'Malzeme Hesaplama Sistemi',
                    'app.version': 'Versiyon',
                    'app.company': 'TETA Kazan',
                    
                    // Menüler
                    'menu.file': 'Dosya',
                    'menu.new': 'Yeni',
                    'menu.open': 'Excel Aç',
                    'menu.save': 'Excel Kaydet',
                    'menu.exit': 'Çıkış',
                    'menu.edit': 'Düzen',
                    'menu.undo': 'Geri Al',
                    'menu.redo': 'Yinele',
                    'menu.cut': 'Kes',
                    'menu.copy': 'Kopyala',
                    'menu.paste': 'Yapıştır',
                    'menu.selectall': 'Tümünü Seç',
                    'menu.view': 'Görünüm',
                    'menu.reload': 'Yenile',
                    'menu.help': 'Yardım',
                    'menu.about': 'Hakkında',
                    
                    // Proje Bilgileri
                    'project.info': 'Proje Bilgileri',
                    'project.name': 'Proje Adı',
                    'project.order.no': 'Sipariş No',
                    'project.revision.no': 'Revizyon No',
                    'project.drawing.description': 'Resim Açıklaması',
                    'project.drawing.no': 'Resim No',
                    'project.prepared.by': 'Hazırlayan',
                    
                    // Özet Raporu
                    'summary.title': 'Özet Raporu',
                    'summary.total.parts': 'Toplam Parça',
                    'summary.total.weight': 'Toplam Ağırlık',
                    
                    // Malzeme Bilgileri
                    'material.info': 'Malzeme Bilgileri',
                    'material.type': 'Malzeme Türü',
                    'material.grade': 'Malzeme Cinsi',
                    'material.quantity': 'Adet',
                    'material.heat.no': 'Açıklama / Heat No',
                    
                    // Malzeme Türleri
                    'material.type.sheet': 'Sac',
                    'material.type.bar': 'Lama',
                    'material.type.pipe': 'Boru',
                    'material.type.angle': 'L Köşebent',
                    'material.type.box': 'Kutu Profil',
                    'material.type.rod': 'Mil',
                    'material.type.ipe': 'IPE Profil',
                    'material.type.hea': 'HEA Profil',
                    'material.type.heb': 'HEB Profil',
                    'material.type.npu': 'NPU Profil',
                    'material.type.npi': 'NPI Profil',
                    'material.type.std.flange': 'Standart Flanş',
                    'material.type.custom.flange': 'Özel Flanş',
                    'material.type.elbow': 'Dirsek',
                    'material.type.grate': 'Izgara Elemanları',
                    'material.type.custom': 'Özel Malzeme',
                    
                    // Ölçüler
                    'dimension.thickness': 'Kalınlık',
                    'dimension.width': 'En',
                    'dimension.length': 'Boy',
                    'dimension.height': 'Yükseklik',
                    'dimension.outer.diameter': 'Dış Çap',
                    'dimension.inner.diameter': 'İç Çap',
                    'dimension.wall.thickness': 'Et Kalınlığı',
                    'dimension.diameter': 'Çap',
                    'dimension.edge1': '1. Kenar',
                    'dimension.edge2': '2. Kenar',
                    'dimension.mm': 'mm',
                    'dimension.m': 'm',
                    'dimension.kg': 'kg',
                    'dimension.liter': 'litre',
                    
                    // Butonlar
                    'button.calculate': 'Hesapla',
                    'button.add.to.table': 'Tabloya Ekle',
                    'button.clear': 'Temizle',
                    'button.save.excel': 'Excel Kaydet',
                    'button.open.excel': 'Excel Aç',
                    'button.clear.table': 'Tabloyu Temizle',
                    'button.edit': 'Düzenle',
                    'button.delete': 'Sil',
                    'button.update': 'Güncelle',
                    'button.cancel': 'İptal',
                    'button.ok': 'Tamam',
                    'button.yes': 'Evet',
                    'button.no': 'Hayır',
                    'button.apply': 'Uygula',
                    'button.close': 'Kapat',
                    'button.save': 'Kaydet',
                    'button.load': 'Yükle',
                    'button.export': 'Dışa Aktar',
                    'button.import': 'İçe Aktar',
                    
                    // Tablo Başlıkları
                    'table.item.no': 'P.No',
                    'table.quantity': 'Adet',
                    'table.material.type': 'Malzeme Türü',
                    'table.material.grade': 'Malzeme Cinsi',
                    'table.dimensions': 'Ölçüler',
                    'table.standard': 'Standart',
                    'table.water.volume': 'Su Hacmi (L)',
                    'table.unit.weight': 'Birim Ağırlık (kg)',
                    'table.total.weight': 'Toplam Ağırlık (kg)',
                    'table.heat.no': 'Açıklama / Heat No',
                    'table.actions': 'İşlem',
                    
                    // Hesaplama Sonuçları
                    'result.unit.weight': 'Birim Ağırlık',
                    'result.total.weight': 'Toplam Ağırlık',
                    'result.water.volume': 'Su Hacmi',
                    
                    // Mesajlar
                    'message.success': 'İşlem Başarılı',
                    'message.error': 'Hata',
                    'message.warning': 'Uyarı',
                    'message.info': 'Bilgi',
                    'message.confirm.delete': 'Silmek istediğinizden emin misiniz?',
                    'message.confirm.clear': 'Tüm verileri temizlemek istediğinizden emin misiniz?',
                    'message.no.data': 'Veri bulunamadı',
                    'message.invalid.data': 'Geçersiz veri',
                    'message.required.field': 'Bu alan gereklidir',
                    'message.calculation.success': 'Hesaplama başarılı',
                    'message.added.to.table': 'Malzeme tabloya eklendi',
                    'message.excel.exported': 'Excel dosyası kaydedildi',
                    'message.excel.imported': 'Excel dosyası yüklendi',
                    'message.select.material.type': 'Lütfen malzeme türü seçin',
                    'message.calculate.first': 'Lütfen önce hesaplama yapın',
                    
                    // Sekmeler
                    'tab.main': 'Ana Sayfa',
                    'tab.new': 'Yeni Sekme',
                    'tab.filtered': 'Filtrelenmiş Liste',
                    'tab.comparison': 'Karşılaştırma',
                    
                    // Sütun Yönetimi
                    'column.manager': 'Sütun Yöneticisi',
                    'column.visibility': 'Görünürlük',
                    'column.order': 'Sıralama',
                    'column.custom': 'Özel Sütunlar',
                    'column.add.new': 'Yeni Sütun Ekle',
                    'column.name': 'Sütun Adı',
                    'column.name.english': 'Sütun Adı (İngilizce)',
                    'column.type': 'Veri Tipi',
                    'column.width': 'Genişlik',
                    'column.alignment': 'Hizalama',
                    'column.default.value': 'Varsayılan Değer',
                    'column.editable': 'Düzenlenebilir',
                    'column.sortable': 'Sıralanabilir',
                    
                    // Filtreleme
                    'filter.quick': 'Hızlı Filtre',
                    'filter.advanced': 'Gelişmiş Filtre',
                    'filter.clear': 'Filtreleri Temizle',
                    'filter.apply': 'Filtre Uygula',
                    'filter.preview': 'Önizleme',
                    'filter.conditions': 'Koşullar',
                    'filter.add.condition': 'Koşul Ekle',
                    'filter.remove.condition': 'Koşulu Kaldır',
                    'filter.field': 'Alan',
                    'filter.operator': 'Operatör',
                    'filter.value': 'Değer',
                    'filter.logic.and': 'Tüm koşullar (VE)',
                    'filter.logic.or': 'Herhangi bir koşul (VEYA)',
                    
                    // Operatörler
                    'operator.equals': 'Eşit',
                    'operator.not.equals': 'Eşit değil',
                    'operator.contains': 'İçerir',
                    'operator.not.contains': 'İçermez',
                    'operator.starts.with': 'İle başlar',
                    'operator.ends.with': 'İle biter',
                    'operator.greater.than': 'Büyük',
                    'operator.less.than': 'Küçük',
                    'operator.greater.equal': 'Büyük eşit',
                    'operator.less.equal': 'Küçük eşit',
                    'operator.between': 'Arasında',
                    'operator.empty': 'Boş',
                    'operator.not.empty': 'Boş değil',
                    
                    // Dil
                    'language.turkish': 'Türkçe',
                    'language.english': 'English',
                    'language.select': 'Dil Seçimi',
                    'language.ui': 'Arayüz Dili',
                    'language.export': 'Dışa Aktarım Dili'
                },
                
                en: {
                    // General
                    'app.title': 'Material Calculation System',
                    'app.version': 'Version',
                    'app.company': 'TETA Boiler',
                    
                    // Menus
                    'menu.file': 'File',
                    'menu.new': 'New',
                    'menu.open': 'Open Excel',
                    'menu.save': 'Save Excel',
                    'menu.exit': 'Exit',
                    'menu.edit': 'Edit',
                    'menu.undo': 'Undo',
                    'menu.redo': 'Redo',
                    'menu.cut': 'Cut',
                    'menu.copy': 'Copy',
                    'menu.paste': 'Paste',
                    'menu.selectall': 'Select All',
                    'menu.view': 'View',
                    'menu.reload': 'Reload',
                    'menu.help': 'Help',
                    'menu.about': 'About',
                    
                    // Project Information
                    'project.info': 'Project Information',
                    'project.name': 'Project Name',
                    'project.order.no': 'Order No',
                    'project.revision.no': 'Revision No',
                    'project.drawing.description': 'Drawing Description',
                    'project.drawing.no': 'Drawing No',
                    'project.prepared.by': 'Prepared By',
                    
                    // Summary Report
                    'summary.title': 'Summary Report',
                    'summary.total.parts': 'Total Parts',
                    'summary.total.weight': 'Total Weight',
                    
                    // Material Information
                    'material.info': 'Material Information',
                    'material.type': 'Material Type',
                    'material.grade': 'Material Grade',
                    'material.quantity': 'Quantity',
                    'material.heat.no': 'Description / Heat No',
                    
                    // Material Types
                    'material.type.sheet': 'Sheet',
                    'material.type.bar': 'Bar',
                    'material.type.pipe': 'Pipe',
                    'material.type.angle': 'Angle',
                    'material.type.box': 'Box Profile',
                    'material.type.rod': 'Rod',
                    'material.type.ipe': 'IPE Profile',
                    'material.type.hea': 'HEA Profile',
                    'material.type.heb': 'HEB Profile',
                    'material.type.npu': 'NPU Profile',
                    'material.type.npi': 'NPI Profile',
                    'material.type.std.flange': 'Standard Flange',
                    'material.type.custom.flange': 'Custom Flange',
                    'material.type.elbow': 'Elbow',
                    'material.type.grate': 'Grate Elements',
                    'material.type.custom': 'Custom Material',
                    
                    // Dimensions
                    'dimension.thickness': 'Thickness',
                    'dimension.width': 'Width',
                    'dimension.length': 'Length',
                    'dimension.height': 'Height',
                    'dimension.outer.diameter': 'Outer Diameter',
                    'dimension.inner.diameter': 'Inner Diameter',
                    'dimension.wall.thickness': 'Wall Thickness',
                    'dimension.diameter': 'Diameter',
                    'dimension.edge1': '1st Edge',
                    'dimension.edge2': '2nd Edge',
                    'dimension.mm': 'mm',
                    'dimension.m': 'm',
                    'dimension.kg': 'kg',
                    'dimension.liter': 'liter',
                    
                    // Buttons
                    'button.calculate': 'Calculate',
                    'button.add.to.table': 'Add to Table',
                    'button.clear': 'Clear',
                    'button.save.excel': 'Save Excel',
                    'button.open.excel': 'Open Excel',
                    'button.clear.table': 'Clear Table',
                    'button.edit': 'Edit',
                    'button.delete': 'Delete',
                    'button.update': 'Update',
                    'button.cancel': 'Cancel',
                    'button.ok': 'OK',
                    'button.yes': 'Yes',
                    'button.no': 'No',
                    'button.apply': 'Apply',
                    'button.close': 'Close',
                    'button.save': 'Save',
                    'button.load': 'Load',
                    'button.export': 'Export',
                    'button.import': 'Import',
                    
                    // Table Headers
                    'table.item.no': 'Item No.',
                    'table.quantity': 'Qty',
                    'table.material.type': 'Material Type',
                    'table.material.grade': 'Material Grade',
                    'table.dimensions': 'Dimensions',
                    'table.standard': 'Standard',
                    'table.water.volume': 'Water Volume (L)',
                    'table.unit.weight': 'Unit Weight (kg)',
                    'table.total.weight': 'Total Weight (kg)',
                    'table.heat.no': 'Description / Heat No',
                    'table.actions': 'Actions',
                    
                    // Calculation Results
                    'result.unit.weight': 'Unit Weight',
                    'result.total.weight': 'Total Weight',
                    'result.water.volume': 'Water Volume',
                    
                    // Messages
                    'message.success': 'Success',
                    'message.error': 'Error',
                    'message.warning': 'Warning',
                    'message.info': 'Information',
                    'message.confirm.delete': 'Are you sure you want to delete?',
                    'message.confirm.clear': 'Are you sure you want to clear all data?',
                    'message.no.data': 'No data found',
                    'message.invalid.data': 'Invalid data',
                    'message.required.field': 'This field is required',
                    'message.calculation.success': 'Calculation successful',
                    'message.added.to.table': 'Material added to table',
                    'message.excel.exported': 'Excel file saved',
                    'message.excel.imported': 'Excel file loaded',
                    'message.select.material.type': 'Please select material type',
                    'message.calculate.first': 'Please calculate first',
                    
                    // Tabs
                    'tab.main': 'Main Page',
                    'tab.new': 'New Tab',
                    'tab.filtered': 'Filtered List',
                    'tab.comparison': 'Comparison',
                    
                    // Column Management
                    'column.manager': 'Column Manager',
                    'column.visibility': 'Visibility',
                    'column.order': 'Order',
                    'column.custom': 'Custom Columns',
                    'column.add.new': 'Add New Column',
                    'column.name': 'Column Name',
                    'column.name.english': 'Column Name (English)',
                    'column.type': 'Data Type',
                    'column.width': 'Width',
                    'column.alignment': 'Alignment',
                    'column.default.value': 'Default Value',
                    'column.editable': 'Editable',
                    'column.sortable': 'Sortable',
                    
                    // Filtering
                    'filter.quick': 'Quick Filter',
                    'filter.advanced': 'Advanced Filter',
                    'filter.clear': 'Clear Filters',
                    'filter.apply': 'Apply Filter',
                    'filter.preview': 'Preview',
                    'filter.conditions': 'Conditions',
                    'filter.add.condition': 'Add Condition',
                    'filter.remove.condition': 'Remove Condition',
                    'filter.field': 'Field',
                    'filter.operator': 'Operator',
                    'filter.value': 'Value',
                    'filter.logic.and': 'All conditions (AND)',
                    'filter.logic.or': 'Any condition (OR)',
                    
                    // Operators
                    'operator.equals': 'Equals',
                    'operator.not.equals': 'Not equals',
                    'operator.contains': 'Contains',
                    'operator.not.contains': 'Does not contain',
                    'operator.starts.with': 'Starts with',
                    'operator.ends.with': 'Ends with',
                    'operator.greater.than': 'Greater than',
                    'operator.less.than': 'Less than',
                    'operator.greater.equal': 'Greater or equal',
                    'operator.less.equal': 'Less or equal',
                    'operator.between': 'Between',
                    'operator.empty': 'Empty',
                    'operator.not.empty': 'Not empty',
                    
                    // Language
                    'language.turkish': 'Türkçe',
                    'language.english': 'English',
                    'language.select': 'Language Selection',
                    'language.ui': 'Interface Language',
                    'language.export': 'Export Language'
                }
            };
        },
        
        // Kayıtlı dili yükle
        loadSavedLanguage: function() {
            const saved = localStorage.getItem('selectedLanguage');
            if (saved && this.supportedLanguages.includes(saved)) {
                this.currentLanguage = saved;
            }
        },
        
        // Dil değiştir
        setLanguage: function(language) {
            if (!this.supportedLanguages.includes(language)) {
                console.error('Desteklenmeyen dil:', language);
                return false;
            }
            
            const previousLanguage = this.currentLanguage;
            this.currentLanguage = language;
            
            // Ayarı kaydet
            localStorage.setItem('selectedLanguage', language);
            
            // UI'ı güncelle
            this.updateUI();
            
            // Diğer modülleri bilgilendir
            this.notifyLanguageChange(previousLanguage, language);
            
            return true;
        },
        
        // Çeviri al
        translate: function(key, params = {}) {
            const translations = this.translations[this.currentLanguage] || this.translations['tr'];
            let translation = translations[key] || key;
            
            // Parametreleri değiştir
            Object.keys(params).forEach(param => {
                translation = translation.replace(`{${param}}`, params[param]);
            });
            
            return translation;
        },
        
        // Kısa çeviri fonksiyonu
        t: function(key, params = {}) {
            return this.translate(key, params);
        },
        
        // UI'ı güncelle
        updateUI: function() {
            // Tüm data-translate özniteliğine sahip elementleri güncelle
            const elements = document.querySelectorAll('[data-translate]');
            elements.forEach(element => {
                const key = element.getAttribute('data-translate');
                if (key) {
                    if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'search')) {
                        element.placeholder = this.translate(key);
                    } else {
                        element.textContent = this.translate(key);
                    }
                }
            });
            
            // Title özniteliklerini güncelle
            const titleElements = document.querySelectorAll('[data-translate-title]');
            titleElements.forEach(element => {
                const key = element.getAttribute('data-translate-title');
                if (key) {
                    element.title = this.translate(key);
                }
            });
            
            // Tablo başlıklarını güncelle
            this.updateTableHeaders();
            
            // Form etiketlerini güncelle
            this.updateFormLabels();
            
            // Buton metinlerini güncelle
            this.updateButtons();
            
            // Özel elementleri güncelle
            this.updateSpecialElements();
        },
        
        // Tablo başlıklarını güncelle
        updateTableHeaders: function() {
            const table = document.getElementById('malzemeTablosu');
            if (!table) return;
            
            const headers = table.querySelectorAll('thead th');
            const headerKeys = [
                'table.item.no',
                'table.quantity',
                'table.material.type',
                'table.material.grade',
                'table.dimensions',
                'table.standard',
                'table.water.volume',
                'table.unit.weight',
                'table.total.weight',
                'table.heat.no',
                'table.actions'
            ];
            
            headers.forEach((header, index) => {
                if (headerKeys[index]) {
                    header.textContent = this.translate(headerKeys[index]);
                }
            });
        },
        
        // Form etiketlerini güncelle
        updateFormLabels: function() {
            // Proje bilgileri
            const projectLabels = {
                'projeAdi': 'project.name',
                'siparisNo': 'project.order.no',
                'revizyonNo': 'project.revision.no',
                'resimAciklamasi': 'project.drawing.description',
                'resimNo': 'project.drawing.no',
                'hazirlayan': 'project.prepared.by'
            };
            
            Object.keys(projectLabels).forEach(inputId => {
                const label = document.querySelector(`label[for="${inputId}"]`);
                if (label) {
                    label.textContent = this.translate(projectLabels[inputId]);
                }
            });
            
            // Malzeme türü seçeneklerini güncelle
            this.updateMaterialTypeOptions();
        },
        
        // Malzeme türü seçeneklerini güncelle
        updateMaterialTypeOptions: function() {
            const select = document.getElementById('malzemeTuru');
            if (!select) return;
            
            const options = select.querySelectorAll('option');
            const optionMap = {
                'sac': 'material.type.sheet',
                'lama': 'material.type.bar',
                'boru': 'material.type.pipe',
                'kosebent': 'material.type.angle',
                'kutu': 'material.type.box',
                'mil': 'material.type.rod',
                'ipe': 'material.type.ipe',
                'hea': 'material.type.hea',
                'heb': 'material.type.heb',
                'npu': 'material.type.npu',
                'npi': 'material.type.npi',
                'flans': 'material.type.std.flange',
                'ozelFlans': 'material.type.custom.flange',
                'dirsek': 'material.type.elbow',
                'izgara': 'material.type.grate',
                'ozelMalzeme': 'material.type.custom'
            };
            
            options.forEach(option => {
                const value = option.value;
                if (value && optionMap[value]) {
                    option.textContent = this.translate(optionMap[value]);
                }
            });
        },
        
        // Butonları güncelle
        updateButtons: function() {
            const buttons = {
                'btnHesapla': 'button.calculate',
                'btnEkle': 'button.add.to.table',
                'btnTemizle': 'button.clear',
                'btnExcelKaydet': 'button.save.excel',
                'btnExcelAc': 'button.open.excel',
                'btnTabloTemizle': 'button.clear.table'
            };
            
            Object.keys(buttons).forEach(buttonId => {
                const button = document.getElementById(buttonId);
                if (button) {
                    // İkon ve metin birlikte olan butonlar için özel işlem
                    const icon = button.querySelector('.btn-icon');
                    const text = this.translate(buttons[buttonId]);
                    
                    if (icon) {
                        button.innerHTML = `<span class="btn-icon">${icon.textContent}</span> ${text}`;
                    } else {
                        button.textContent = text;
                    }
                }
            });
        },
        
        // Özel elementleri güncelle
        updateSpecialElements: function() {
            // Panel başlıklarını güncelle
            const panelHeaders = document.querySelectorAll('.panel-header h2');
            if (panelHeaders.length >= 2) {
                panelHeaders[0].innerHTML = '⚙️ ' + this.translate('material.info');
                panelHeaders[1].innerHTML = '📋 ' + this.translate('table.material.list');
            }
            
            // Özet raporu başlığını güncelle
            const summaryHeader = document.querySelector('.summary-header-compact');
            if (summaryHeader) {
                summaryHeader.textContent = '📊 ' + this.translate('summary.title');
            }
            
            // Özet raporu değerlerini güncelle
            const summaryLabels = document.querySelectorAll('.summary-label');
            if (summaryLabels.length >= 2) {
                summaryLabels[0].textContent = this.translate('summary.total.parts') + ':';
                summaryLabels[1].textContent = this.translate('summary.total.weight') + ':';
            }
            
            // Sonuç kartlarını güncelle
            const resultCards = document.querySelectorAll('.result-card h3');
            if (resultCards.length >= 2) {
                resultCards[0].textContent = this.translate('result.unit.weight');
                resultCards[1].textContent = this.translate('result.total.weight');
                if (resultCards[2]) {
                    resultCards[2].textContent = this.translate('result.water.volume');
                }
            }
        },
        
        // Dil değişikliğini diğer modüllere bildir
        notifyLanguageChange: function(previousLanguage, newLanguage) {
            // ColumnManager'a bildir
            if (typeof ColumnManager !== 'undefined') {
                ColumnManager.onLanguageChange(newLanguage);
            }
            
            // FilterManager'a bildir
            if (typeof FilterManager !== 'undefined') {
                FilterManager.onLanguageChange(newLanguage);
            }
            
            // ExcelManager'a bildir
            if (typeof ExcelManager !== 'undefined') {
                ExcelManager.setExportLanguage(newLanguage);
            }
            
            // Custom event gönder
            const event = new CustomEvent('languageChanged', {
                detail: {
                    previousLanguage: previousLanguage,
                    newLanguage: newLanguage
                }
            });
            document.dispatchEvent(event);
        },
        
        // Dil seçici dialogunu göster
        showLanguageDialog: function() {
            const content = `
                <div class="language-dialog">
                    <h3 data-translate="language.select">${this.translate('language.select')}</h3>
                    
                    <div class="language-section">
                        <h4 data-translate="language.ui">${this.translate('language.ui')}</h4>
                        <div class="language-options">
                            <label class="language-option">
                                <input type="radio" name="uiLanguage" value="tr" ${this.currentLanguage === 'tr' ? 'checked' : ''}>
                                <span data-translate="language.turkish">${this.translate('language.turkish')}</span>
                            </label>
                            <label class="language-option">
                                <input type="radio" name="uiLanguage" value="en" ${this.currentLanguage === 'en' ? 'checked' : ''}>
                                <span data-translate="language.english">${this.translate('language.english')}</span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="language-section">
                        <h4 data-translate="language.export">${this.translate('language.export')}</h4>
                        <p class="info-text">Excel'e dışa aktarım sırasında hangi dilde kaydetmek istiyorsunuz?</p>
                        <div class="language-options">
                            <label class="language-option">
                                <input type="radio" name="exportLanguage" value="tr" checked>
                                <span data-translate="language.turkish">${this.translate('language.turkish')}</span>
                            </label>
                            <label class="language-option">
                                <input type="radio" name="exportLanguage" value="en">
                                <span data-translate="language.english">${this.translate('language.english')}</span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="dialog-actions">
                        <button onclick="LanguageManager.applyLanguageSettings()" class="btn btn-primary" data-translate="button.apply">${this.translate('button.apply')}</button>
                        <button onclick="UIManager.closeModal()" class="btn btn-secondary" data-translate="button.cancel">${this.translate('button.cancel')}</button>
                    </div>
                </div>
            `;
            
            UIManager.openModal(content, this.translate('language.select'));
        },
        
        // Dil ayarlarını uygula
        applyLanguageSettings: function() {
            const uiLanguage = document.querySelector('input[name="uiLanguage"]:checked')?.value;
            const exportLanguage = document.querySelector('input[name="exportLanguage"]:checked')?.value;
            
            if (uiLanguage && uiLanguage !== this.currentLanguage) {
                this.setLanguage(uiLanguage);
                UIManager.showNotification(this.translate('message.success'), 'success');
            }
            
            if (exportLanguage) {
                localStorage.setItem('exportLanguage', exportLanguage);
                if (typeof ExcelManager !== 'undefined') {
                    ExcelManager.setExportLanguage(exportLanguage);
                }
            }
            
            UIManager.closeModal();
        },
        
        // Excel export dili al
        getExportLanguage: function() {
            return localStorage.getItem('exportLanguage') || this.currentLanguage;
        },
        
        // Çeviri anahtarlarını formatla (data-attribute için)
        formatTranslationKey: function(text) {
            return text.toLowerCase()
                      .replace(/[üğıöçş]/g, c => 'ugiocs'['üğıöçş'.indexOf(c)])
                      .replace(/[^a-z0-9]/g, '.')
                      .replace(/\.+/g, '.')
                      .replace(/^\.|\.$/g, '');
        },
        
        // Element'e çeviri özniteliği ekle
        addTranslationAttribute: function(element, key) {
            element.setAttribute('data-translate', key);
            element.textContent = this.translate(key);
        },
        
        // Tüm çevirileri al (debug için)
        getAllTranslations: function(language = null) {
            language = language || this.currentLanguage;
            return this.translations[language] || {};
        },
        
        // Event'ları bağla
        bindEvents: function() {
            // Dil seçici için kısayol
            document.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.altKey && e.key === 'l') {
                    e.preventDefault();
                    this.showLanguageDialog();
                }
            });
            
            // Custom language change event listener
            document.addEventListener('languageChanged', (e) => {
                console.log('Dil değişti:', e.detail);
            });
        },
        
        // Sayfa yüklendiğinde çevirileri uygula
        applyInitialTranslations: function() {
            // DOM hazır olduğunda çalışacak
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    this.updateUI();
                });
            } else {
                this.updateUI();
            }
        }
    };
    
    // Modülü window objesine bağla
    window.LanguageManager = LanguageManager;
    
    // Global t fonksiyonu
    window.t = function(key, params = {}) {
        return LanguageManager.translate(key, params);
    };
    
})(window);