// Dil Yönetimi Modülü
(function(window) {
    'use strict';
    
    const LanguageManager = {
        currentLanguage: 'tr',
        
        translations: {
            tr: {
                // Uygulama Genel
                app_title: 'Malzeme Hesaplama Sistemi',
                version: 'Versiyon',
                
                // Proje Bilgileri
                project_info: 'Proje Bilgileri',
                project_name: 'Proje Adı',
                project_name_placeholder: 'Proje adını girin',
                order_no: 'Sipariş No',
                order_no_placeholder: 'Sipariş numarası',
                revision_no: 'Revizyon No',
                revision_no_placeholder: 'Revizyon numarası',
                drawing_description: 'Resim Açıklaması',
                drawing_description_placeholder: 'Resim açıklaması',
                drawing_no: 'Resim No',
                drawing_no_placeholder: 'Resim numarası',
                prepared_by: 'Hazırlayan',
                prepared_by_placeholder: 'Hazırlayan kişi',
                controlled_by: 'Kontrol',
                controlled_by_placeholder: 'Kontrol eden kişi',
                notes: 'Notlar:',
                notes_placeholder: 'Notlarınızı buraya yazabilirsiniz...',
                revisions: 'Revizyonlar:',
                revisions_placeholder: 'Revizyon bilgilerini buraya yazabilirsiniz...',
                
                // Özet Raporu
                summary_report: 'Özet Raporu',
                total_parts: 'Toplam Parça',
                total_weight: 'Toplam Ağırlık',
                
                // Excel İşlemleri
                excel_save: 'Excel Kaydet',
                excel_open: 'Excel Aç',
                clear_table: 'Tabloyu Temizle',
                filter_materials: 'Filtrele',
                
                // Malzeme Bilgileri
                material_info: 'Malzeme Bilgileri',
                material_type: 'Malzeme Türü',
                material_type_select: 'Seçiniz...',
                material_grade: 'Malzeme Cinsi',
                quantity: 'Adet',
                description_heat: 'Açıklama / Heat No',
                description_heat_placeholder: 'Açıklama veya Heat numarası',
                
                // Malzeme Türleri
                material_sheet: 'Sac',
                material_plate: 'Lama',
                material_pipe: 'Boru',
                material_angle: 'L Köşebent',
                material_npu: 'NPU Profil',
                material_npi: 'NPI Profil',
                material_heb: 'HEB Profil',
                material_hea: 'HEA Profil',
                material_ipe: 'IPE Profil',
                material_box: 'Kutu Profil',
                material_flange_std: 'Standart Flanş (EN)',
                material_flange_asme: 'Standart Flanş (ASME)',
                material_flange_custom: 'Özel Flanş',
                material_shaft: 'Mil',
                material_grate: 'Izgara Elemanları',
                material_custom: 'Özel Malzeme',
                material_elbow: 'Dirsek (EN 10253-1)',
                material_added: '-- Eklenen Malzeme --',
                
                // Ölçü Birimleri ve Alanlar
                thickness: 'Kalınlık',
                thickness_unit: 'Kalınlık (mm)',
                thickness_placeholder: '0.0',
                width: 'En',
                width_unit: 'En (mm)',
                width_placeholder: '0',
                length: 'Boy',
                length_unit: 'Boy (mm)',
                length_placeholder: '0',
                outer_diameter: 'Dış Çap',
                outer_diameter_unit: 'Dış Çap (mm)',
                outer_diameter_placeholder: '0.0',
                wall_thickness: 'Et Kalınlığı',
                wall_thickness_unit: 'Et Kalınlığı (mm)',
                wall_thickness_placeholder: '0.0',
                inner_diameter: 'İç Çap',
                inner_diameter_unit: 'İç Çap (mm)',
                inner_diameter_placeholder: '0.0',
                height: 'Yükseklik',
                height_unit: 'Yükseklik (mm)',
                height_placeholder: '0',
                diameter: 'Çap',
                diameter_unit: 'Çap (mm)',
                diameter_placeholder: '0.0',
                side1: '1. Kenar',
                side1_unit: '1. Kenar (mm)',
                side1_placeholder: '0',
                side2: '2. Kenar',
                side2_unit: '2. Kenar (mm)',
                side2_placeholder: '0',
                
                // Butonlar
                calculate: 'Hesapla',
                add_to_table: 'Tabloya Ekle',
                update: 'Güncelle',
                clear: 'Temizle',
                edit: 'Düzenle',
                delete: 'Sil',
                save: 'Kaydet',
                cancel: 'İptal',
                close: 'Kapat',
                
                // Tablo Başlıkları
                material_list: 'Malzeme Listesi',
                part_no: 'P.No',
                material_type_col: 'Malzeme Türü',
                material_grade_col: 'Malzeme Cinsi',
                dimensions: 'Ölçüler',
                standard: 'Standart',
                water_volume: 'Su Hacmi (L)',
                unit_weight: 'Birim Ağırlık (kg)',
                total_weight_col: 'Toplam Ağırlık (kg)',
                description_heat_col: 'Açıklama / Heat No',
                action: 'İşlem',
                
                // Sonuç Kartları
                unit_weight_result: 'Birim Ağırlık',
                total_weight_result: 'Toplam Ağırlık',
                water_volume_result: 'Su Hacmi',
                
                // Flanş Türleri
                flange_flat: 'Düz Flanş',
                flange_weld_neck: 'Kaynak Boyunlu Flanş',
                flange_blind: 'Kör Flanş',
                
                // Profil ve Seçenekler
                profile_size: 'Profil Boyutu',
                flange_type: 'Flanş Tipi',
                dn_size: 'DN Ölçüsü',
                pn_class: 'PN Sınıfı',
                
                // Özel Malzeme
                custom_material_type: 'Malzeme Türü Açıklaması',
                custom_material_type_placeholder: 'Malzeme türünü yazınız (Zorunlu)',
                custom_material_grade_placeholder: 'İsteğe bağlı',
                custom_dimensions: 'Ölçüler',
                custom_dimensions_placeholder: 'Örn: 100x50x10mm (İsteğe bağlı)',
                custom_standard: 'EN Normu',
                custom_standard_placeholder: 'Örn: EN 10025 (İsteğe bağlı)',
                
                // Bildiriler
                notification_added: 'Malzeme tabloya eklendi',
                notification_updated: 'Satır güncellendi',
                notification_deleted: 'Satır silindi',
                notification_cleared: 'Tablo temizlendi',
                notification_calculated: 'Hesaplama tamamlandı',
                notification_exported: 'Excel dosyası başarıyla kaydedildi',
                notification_imported: 'Excel dosyası başarıyla yüklendi',
                notification_select_material: 'Lütfen malzeme türü seçin',
                notification_calculate_first: 'Lütfen önce hesaplama yapın',
                notification_no_data: 'Kaydedilecek veri bulunmamaktadır',
                
                // Modal ve Dialog
                settings: 'Ayarlar',
                help: 'Yardım',
                about: 'Hakkında',
                filter_by_type: 'Türe Göre Filtrele',
                add_material_type: 'Yeni Malzeme Türü Ekle',
                add_material_grade: 'Yeni Malzeme Cinsi Ekle',
                manage_materials: 'Eklenen Malzemeleri Yönet',
                
                // Dil
                language: 'Dil',
                turkish: 'Türkçe',
                english: 'English',
                
                // Diğer
                all: 'Tümü',
                none: 'Hiçbiri',
                required: 'Zorunlu',
                optional: 'İsteğe bağlı',
                
                // Flanş PN Sınıfları Metinleri
                pn6: 'PN6',
                pn10: 'PN10',
                pn16: 'PN16',
                pn25: 'PN25',
                pn40: 'PN40',
                pn63: 'PN63',
                pn100: 'PN100'
            },
            
            en: {
                // Application General
                app_title: 'Material Calculation System',
                version: 'Version',
                
                // Project Information
                project_info: 'Project Information',
                project_name: 'Project Name',
                project_name_placeholder: 'Enter project name',
                order_no: 'Order No',
                order_no_placeholder: 'Order number',
                revision_no: 'Revision No',
                revision_no_placeholder: 'Revision number',
                drawing_description: 'Drawing Description',
                drawing_description_placeholder: 'Drawing description',
                drawing_no: 'Drawing No',
                drawing_no_placeholder: 'Drawing number',
                prepared_by: 'Prepared By',
                prepared_by_placeholder: 'Prepared by person',
                controlled_by: 'Controlled By',
                controlled_by_placeholder: 'Enter controller name',
                notes: 'Notes:',
                notes_placeholder: 'You can write your notes here...',
                revisions: 'Revisions:',
                revisions_placeholder: 'You can write revision information here...',
                
                // Summary Report
                summary_report: 'Summary Report',
                total_parts: 'Total Parts',
                total_weight: 'Total Weight',
                
                // Excel Operations
                excel_save: 'Save Excel',
                excel_open: 'Open Excel',
                clear_table: 'Clear Table',
                filter_materials: 'Filter',
                
                // Material Information
                material_info: 'Material Information',
                material_type: 'Material Type',
                material_type_select: 'Select...',
                material_grade: 'Material Grade',
                quantity: 'Quantity',
                description_heat: 'Description / Heat No',
                description_heat_placeholder: 'Description or Heat number',
                
                // Material Types
                material_sheet: 'Sheet',
                material_plate: 'Plate',
                material_pipe: 'Pipe',
                material_angle: 'L Angle',
                material_npu: 'NPU Profile',
                material_npi: 'NPI Profile',
                material_heb: 'HEB Profile',
                material_hea: 'HEA Profile',
                material_ipe: 'IPE Profile',
                material_box: 'Box Profile',
                material_flange_std: 'Standard Flange (EN)',
                material_flange_asme: 'Standard Flange (ASME)',
                material_flange_custom: 'Custom Flange',
                material_shaft: 'Shaft',
                material_grate: 'Grate Elements',
                material_custom: 'Custom Material',
                material_elbow: 'Elbow (EN 10253-1)',
                material_added: '-- Added Material --',
                
                // Dimension Units and Fields
                thickness: 'Thickness',
                thickness_unit: 'Thickness (mm)',
                thickness_placeholder: '0.0',
                width: 'Width',
                width_unit: 'Width (mm)',
                width_placeholder: '0',
                length: 'Length',
                length_unit: 'Length (mm)',
                length_placeholder: '0',
                outer_diameter: 'Outer Diameter',
                outer_diameter_unit: 'Outer Diameter (mm)',
                outer_diameter_placeholder: '0.0',
                wall_thickness: 'Wall Thickness',
                wall_thickness_unit: 'Wall Thickness (mm)',
                wall_thickness_placeholder: '0.0',
                inner_diameter: 'Inner Diameter',
                inner_diameter_unit: 'Inner Diameter (mm)',
                inner_diameter_placeholder: '0.0',
                height: 'Height',
                height_unit: 'Height (mm)',
                height_placeholder: '0',
                diameter: 'Diameter',
                diameter_unit: 'Diameter (mm)',
                diameter_placeholder: '0.0',
                side1: '1st Side',
                side1_unit: '1st Side (mm)',
                side1_placeholder: '0',
                side2: '2nd Side',
                side2_unit: '2nd Side (mm)',
                side2_placeholder: '0',
                
                // Buttons
                calculate: 'Calculate',
                add_to_table: 'Add to Table',
                update: 'Update',
                clear: 'Clear',
                edit: 'Edit',
                delete: 'Delete',
                save: 'Save',
                cancel: 'Cancel',
                close: 'Close',
                
                // Table Headers
                material_list: 'Material List',
                part_no: 'P.No',
                material_type_col: 'Material Type',
                material_grade_col: 'Material Grade',
                dimensions: 'Dimensions',
                standard: 'Standard',
                water_volume: 'Water Volume (L)',
                unit_weight: 'Unit Weight (kg)',
                total_weight_col: 'Total Weight (kg)',
                description_heat_col: 'Description / Heat No',
                action: 'Action',
                
                // Result Cards
                unit_weight_result: 'Unit Weight',
                total_weight_result: 'Total Weight',
                water_volume_result: 'Water Volume',
                
                // Flange Types
                flange_flat: 'Flat Flange',
                flange_weld_neck: 'Weld Neck Flange',
                flange_blind: 'Blind Flange',
                
                // Profile and Options
                profile_size: 'Profile Size',
                flange_type: 'Flange Type',
                dn_size: 'DN Size',
                pn_class: 'PN Class',
                
                // Custom Material
                custom_material_type: 'Material Type Description',
                custom_material_type_placeholder: 'Enter material type (Required)',
                custom_material_grade_placeholder: 'Optional',
                custom_dimensions: 'Dimensions',
                custom_dimensions_placeholder: 'e.g.: 100x50x10mm (Optional)',
                custom_standard: 'EN Standard',
                custom_standard_placeholder: 'e.g.: EN 10025 (Optional)',
                
                // Notifications
                notification_added: 'Material added to table',
                notification_updated: 'Row updated',
                notification_deleted: 'Row deleted',
                notification_cleared: 'Table cleared',
                notification_calculated: 'Calculation completed',
                notification_exported: 'Excel file saved successfully',
                notification_imported: 'Excel file loaded successfully',
                notification_select_material: 'Please select material type',
                notification_calculate_first: 'Please calculate first',
                notification_no_data: 'No data to save',
                
                // Modal and Dialog
                settings: 'Settings',
                help: 'Help',
                about: 'About',
                filter_by_type: 'Filter by Type',
                add_material_type: 'Add New Material Type',
                add_material_grade: 'Add New Material Grade',
                manage_materials: 'Manage Added Materials',
                
                // Language
                language: 'Language',
                turkish: 'Türkçe',
                english: 'English',
                
                // Other
                all: 'All',
                none: 'None',
                required: 'Required',
                optional: 'Optional',
                
                // Flange PN Class Texts
                pn6: 'PN6',
                pn10: 'PN10',
                pn16: 'PN16',
                pn25: 'PN25',
                pn40: 'PN40',
                pn63: 'PN63',
                pn100: 'PN100'
            }
        },

        // Başlatma fonksiyonu
        init: function() {
            const savedLang = localStorage.getItem('programLanguage') || 'tr';
            this.setLanguage(savedLang, false);
            this.setupLanguageSelector();
        },

        // Dil değiştirme fonksiyonu
        setLanguage: function(lang, save = true) {
            if (!this.translations[lang]) {
                console.warn('Geçersiz dil kodu:', lang);
                return;
            }
            
            this.currentLanguage = lang;
            
            if (save) {
                localStorage.setItem('programLanguage', lang);
            }
            
            this.updateAllTexts();
            this.updateDocumentTitle();
            this.updateLanguageSelector();
            
            // Dil değişikliği event'i fırlat
            this.dispatchLanguageChangeEvent();
        },

        // Metin alma fonksiyonu
        getText: function(key, fallback = null) {
            const text = this.translations[this.currentLanguage][key];
            if (text !== undefined) {
                return text;
            }
            
            // Türkçe'de de yoksa fallback kullan
            const fallbackText = this.translations['tr'][key];
            if (fallbackText !== undefined) {
                return fallbackText;
            }
            
            return fallback || key;
        },

        // Tüm metinleri güncelle
        updateAllTexts: function() {
            // data-lang attribute'lı elementleri güncelle
            document.querySelectorAll('[data-lang]').forEach(element => {
                const key = element.getAttribute('data-lang');
                const text = this.getText(key);
                
                this.updateElementText(element, text);
            });

            // data-lang-placeholder attribute'lı elementleri güncelle
            document.querySelectorAll('[data-lang-placeholder]').forEach(element => {
                const key = element.getAttribute('data-lang-placeholder');
                const text = this.getText(key);
                
                if (element.placeholder !== undefined) {
                    element.placeholder = text;
                }
            });

            // Select option'larını güncelle
            this.updateSelectOptions();
        },

        // Element metnini güncelle
        updateElementText: function(element, text) {
            if (element.tagName === 'INPUT') {
                if (element.type === 'button' || element.type === 'submit') {
                    element.value = text;
                }
            } else if (element.tagName === 'BUTTON') {
                // Button içinde icon varsa koruyalım
                const icon = element.querySelector('.btn-icon');
                if (icon) {
                    element.innerHTML = icon.outerHTML + ' ' + text;
                } else {
                    element.textContent = text;
                }
            } else {
                element.textContent = text;
            }
        },

        // Select seçeneklerini güncelle
        updateSelectOptions: function() {
            // Malzeme türü select'i güncelle
            const materialTypeSelect = document.getElementById('malzemeTuru');
            if (materialTypeSelect) {
                this.updateMaterialTypeSelect(materialTypeSelect);
            }

            // PN sınıfı select'lerini güncelle
            const pnSelects = document.querySelectorAll('#pnSinifi');
            pnSelects.forEach(select => {
                this.updatePnClassSelect(select);
            });
        },

        // Malzeme türü select'ini güncelle
        updateMaterialTypeSelect: function(select) {
            const options = [
                { value: '', key: 'material_type_select' },
                { value: 'sac', key: 'material_sheet' },
                { value: 'lama', key: 'material_plate' },
                { value: 'boru', key: 'material_pipe' },
                { value: 'kosebent', key: 'material_angle' },
                { value: 'npu', key: 'material_npu' },
                { value: 'npi', key: 'material_npi' },
                { value: 'heb', key: 'material_heb' },
                { value: 'hea', key: 'material_hea' },
                { value: 'ipe', key: 'material_ipe' },
                { value: 'kutu', key: 'material_box' },
                { value: 'flans', key: 'material_flange_std' },
                { value: 'flansAsme', key: 'material_flange_asme' },
                { value: 'ozelFlans', key: 'material_flange_custom' },
                { value: 'mil', key: 'material_shaft' },
                { value: 'izgara', key: 'material_grate' },
                { value: 'ozelMalzeme', key: 'material_custom' },
                { value: 'dirsek', key: 'material_elbow' },
                { value: 'eklenenMalzeme', key: 'material_added' }
            ];

            const currentValue = select.value;
            select.innerHTML = '';
            
            options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.textContent = this.getText(option.key);
                select.appendChild(optionElement);
            });
            
            select.value = currentValue;
        },

        // PN sınıfı select'ini güncelle
        updatePnClassSelect: function(select) {
            const options = [
                { value: 'PN6', key: 'pn6' },
                { value: 'PN10', key: 'pn10' },
                { value: 'PN16', key: 'pn16' },
                { value: 'PN25', key: 'pn25' },
                { value: 'PN40', key: 'pn40' },
                { value: 'PN63', key: 'pn63' },
                { value: 'PN100', key: 'pn100' }
            ];

            const currentValue = select.value;
            select.innerHTML = '';
            
            options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.textContent = this.getText(option.key);
                select.appendChild(optionElement);
            });
            
            select.value = currentValue;
        },

        // Döküman başlığını güncelle
        updateDocumentTitle: function() {
            document.title = this.getText('app_title');
        },

        // Dil seçiciyi ayarla
        setupLanguageSelector: function() {
            const selector = document.getElementById('languageSelect');
            if (selector) {
                selector.addEventListener('change', (e) => {
                    this.setLanguage(e.target.value);
                });
            }
        },

        // Dil seçici değerini güncelle
        updateLanguageSelector: function() {
            const selector = document.getElementById('languageSelect');
            if (selector) {
                selector.value = this.currentLanguage;
            }
        },

        // Dil değişikliği event'i fırlat
        dispatchLanguageChangeEvent: function() {
            const event = new CustomEvent('languageChanged', {
                detail: { language: this.currentLanguage }
            });
            document.dispatchEvent(event);
        },

        // Dinamik içerik için metin güncelleme
        updateDynamicContent: function(container) {
            if (!container) return;
            
            container.querySelectorAll('[data-lang]').forEach(element => {
                const key = element.getAttribute('data-lang');
                const text = this.getText(key);
                this.updateElementText(element, text);
            });

            container.querySelectorAll('[data-lang-placeholder]').forEach(element => {
                const key = element.getAttribute('data-lang-placeholder');
                const text = this.getText(key);
                
                if (element.placeholder !== undefined) {
                    element.placeholder = text;
                }
            });
        },

        // Notification metni alma
        getNotificationText: function(key, type = 'info') {
            return this.getText('notification_' + key, this.getText(key));
        }
    };

    // Modülü window objesine bağla
    window.LanguageManager = LanguageManager;

})(window);