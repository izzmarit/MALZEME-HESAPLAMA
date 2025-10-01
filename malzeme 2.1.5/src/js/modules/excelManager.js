// Excel İşlemleri Modülü - Dinamik Satır Yönetimi ile
(function(window) {
    'use strict';
    
    const ExcelJS = require('exceljs');
    const { ipcRenderer } = require('electron');
    const fs = require('fs');
    const path = require('path');
    
    const ExcelManager = {
        // Sayfa yapısı için sabitler
        PAGE_CONSTANTS: {
            HEADER_ROWS: 7,           // Üst başlık alanı (1-7 arası)
            MAX_ROWS_PER_PAGE: 45,    // Sayfa başına maksimum malzeme satırı
            SUMMARY_ROWS: 7,          // Özet raporu satır sayısı
            DATA_START_ROW: 8         // Veri başlangıç satırı
        },

        // Excel'e dışa aktar
        exportToExcel: async function() {
            const tableData = TableManager.getTableData();
            
            if (tableData.length === 0) {
                this.showNotification('Kaydedilecek veri bulunmamaktadır!', 'warning');
                return;
            }
            
            try {
                // Proje bilgilerini al
                const projectInfo = TableManager.getProjectInfo();
                const notlarRevizyon = TableManager.getNotesRevisions();
                
                // Dosya adı için bilgileri hazırla
                const siparisNo = projectInfo.siparisNo || '';
                const resimAciklamasi = projectInfo.resimAciklamasi || '';
                const tarih = new Date().toLocaleDateString('tr-TR').replace(/\./g, '_');
                
                // Dosya adını oluştur - özel karakterleri temizle
                const dosyaAdi = `${siparisNo}_${resimAciklamasi}_${tarih}`
                    .replace(/[<>:"/\\|?*]/g, '')
                    .replace(/\s+/g, ' ')
                    .trim();
                
                // Save dialog'u projectInfo ile birlikte çağır
                const result = await ipcRenderer.invoke('save-excel-dialog', {
                    siparisNo: siparisNo,
                    resimAciklamasi: resimAciklamasi,
                    dosyaAdi: dosyaAdi
                });
                
                if (result.canceled) return;
                
                const filePath = result.filePath;
                
                // ExcelJS Workbook oluştur
                const workbook = new ExcelJS.Workbook();
                workbook.creator = 'TETA Kazan';
                workbook.created = new Date();

                // Özel malzemeleri gizli bir sayfaya kaydet
                const ozelMalzemeler = MaterialData.getAllOzelMalzemeler();
                const customMaterials = MaterialData.getCustomMaterials();

                if (Object.keys(ozelMalzemeler.hacimTabanli).length > 0 || 
                    Object.keys(ozelMalzemeler.birimAgirlikTabanli).length > 0 ||
                    customMaterials.length > 0) {
                    
                    const hiddenSheet = workbook.addWorksheet('OzelMalzemeler');
                    
                    // Sayfayı gizle - worksheet oluşturulduktan sonra state özelliğini ayarla
                    hiddenSheet.state = 'veryHidden';
                    
                    // Başlıklar
                    hiddenSheet.getRow(1).values = ['Tip', 'Kod', 'Ad', 'Veri'];
                    
                    let rowIndex = 2;
                    
                    // Hacim tabanlı malzemeleri ekle
                    for (const [kod, malzeme] of Object.entries(ozelMalzemeler.hacimTabanli)) {
                        hiddenSheet.getRow(rowIndex).values = [
                            'hacimTabanli',
                            kod,
                            malzeme.ad,
                            JSON.stringify(malzeme)
                        ];
                        rowIndex++;
                    }
                    
                    // Birim ağırlık tabanlı malzemeleri ekle
                    for (const [kod, malzeme] of Object.entries(ozelMalzemeler.birimAgirlikTabanli)) {
                        hiddenSheet.getRow(rowIndex).values = [
                            'birimAgirlikTabanli',
                            kod,
                            malzeme.ad,
                            JSON.stringify(malzeme)
                        ];
                        rowIndex++;
                    }
                    
                    // Özel malzeme cinslerini ekle
                    customMaterials.forEach(material => {
                        hiddenSheet.getRow(rowIndex).values = [
                            'malzemeCinsi',
                            material.kod,
                            material.kod,
                            JSON.stringify(material)
                        ];
                        rowIndex++;
                    });
                }
                
                // Worksheet oluştur
                const worksheet = workbook.addWorksheet('Sheet1', {
                    pageSetup: {
                        paperSize: 9, // A4
                        scale: 73,
                        orientation: 'portrait',
                        fitToPage: false,
                        fitToWidth: 1,
                        fitToHeight: 0,
                        horizontalCentered: true,
                        verticalCentered: false,
                        margins: {
                            left: 0.23622047244094491,
                            right: 0.23622047244094491,
                            top: 0.39370078740157483,
                            bottom: 0.35433070866141736,
                            header: 0.31496062992125984,
                            footer: 0.31496062992125984
                        },
                        printArea: null,
                        rowBreaks: []
                    },
                    // FOOTER AYARI 
                    headerFooter: {
                        differentFirst: false,
                        differentOddEven: false,
                        oddFooter: `&R${projectInfo.resimNo || ''} / Sayfa &P of &N`,
                        evenFooter: `&R${projectInfo.resimNo || ''} / Sayfa &P of &N`
                    }
                });
                
                       
                // Varsayılan satır yüksekliği
                worksheet.properties.defaultRowHeight = 15;
                
                // Sütun genişliklerini ayarla
                this.setupColumnWidths(worksheet);
                
                // Başlık bölümünü oluştur (1-7 satırlar)
                this.createHeaderSection(worksheet, projectInfo);
                
                // Dinamik veri ekleme ve sayfa sonu hesaplama
                const dataEndRow = this.addDataWithPaging(worksheet, tableData);
                
                // Özet raporu ekle
                this.addSummarySection(worksheet, tableData, dataEndRow);
                
                // Excel dosyasını kaydet
                await workbook.xlsx.writeFile(filePath);
                this.showNotification('Excel dosyası başarıyla kaydedildi!', 'success');
                
            } catch (error) {
                console.error('Excel export hatası:', error);
                this.showNotification('Excel dosyası kaydedilemedi: ' + error.message, 'error');
            }
        },

        // Sütun genişliklerini ayarla
        setupColumnWidths: function(worksheet) {
            worksheet.getColumn(1).width = 5.7109375;    // A - P.No
            worksheet.getColumn(2).width = 7.140625;     // B - Adet
            worksheet.getColumn(3).width = 22.85546875;  // C - Malzeme Türü
            worksheet.getColumn(4).width = 12.85546875;  // D - Malzeme Cinsi
            worksheet.getColumn(5).width = 20.7109375;   // E - Ölçüler
            worksheet.getColumn(6).width = 15;           // F - EN Normu
            worksheet.getColumn(7).width = 9.28515625;   // G - Su Hacmi
            worksheet.getColumn(8).width = 12.140625;    // H - Birim Ağırlık
            worksheet.getColumn(9).width = 13.5703125;   // I - Toplam Ağırlık
            worksheet.getColumn(10).width = 15.5703125;  // J - Heat No
        },

        // Başlık bölümünü oluştur
        createHeaderSection: function(worksheet, projectInfo) {
            // Satır yükseklikleri (1-7 arası)
            worksheet.getRow(1).height = 15;
            worksheet.getRow(2).height = 15.75;
            worksheet.getRow(3).height = 15.75;
            worksheet.getRow(4).height = 15.75;
            worksheet.getRow(5).height = 15;
            worksheet.getRow(6).height = 15.75;
            worksheet.getRow(7).height = 31.5; // Tablo başlık satırı
            
            // Hücre birleştirmeleri
            worksheet.mergeCells('A1:C6'); // Firma bilgileri
            worksheet.mergeCells('D1:E6'); // Logo alanı
            worksheet.mergeCells('F1:F2'); // Proje etiketi
            worksheet.mergeCells('G1:I2'); // Proje değeri
            worksheet.mergeCells('F3:F4'); // Resim açıklaması etiketi
            worksheet.mergeCells('G3:I4'); // Resim açıklaması değeri
            worksheet.mergeCells('F5:F6'); // Resim no etiketi
            worksheet.mergeCells('G5:I6'); // Resim no değeri
            worksheet.mergeCells('J2:J3'); // Sipariş no değeri
            worksheet.mergeCells('J5:J6'); // Revizyon no değeri
            
            // Firma bilgileri
            const addressCell = worksheet.getCell('A1');
            addressCell.value = 'Şair Nedim Caddesi\nHacı Halitbey Sokak No:7\nBeşiktaş - İSTANBUL\nTel: +90 212 236 25 57\nFax: +90 212 236 25 61\nE-Mail: teta@tetakazan.com.tr';
            addressCell.font = { name: 'Calibri', size: 11, bold: false };
            addressCell.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
            
            // Logo ekleme
            this.addLogo(worksheet);
            
            // Proje bilgilerini ekle
            this.addProjectInfo(worksheet, projectInfo);
            
            // Üst kısım kenarlıkları
            this.addHeaderBorders(worksheet);
            
            // Tablo başlıklarını ekle (7. satır)
            this.addTableHeaders(worksheet);

            // Resim numarasını al
            const resimNo = projectInfo.resimNo || '';
            
        },

        // Logo ekleme
        addLogo: function(worksheet) {
            try {
                const path = require('path');
                const fs = require('fs');
                
                let logoPath = null;
                
                // Tüm olası dosya isimlerini dene (büyük/küçük harf)
                const logoFileNames = ['LOGO.png', 'logo.png', 'Logo.png'];
                
                // Production ve development için farklı yollar
                const possibleBasePaths = [
                    // Development paths
                    path.join(__dirname, '../../assets'),
                    path.join(__dirname, '../../../src/assets'),
                    path.join(process.cwd(), 'src/assets'),
                    // Production paths
                    path.join(process.resourcesPath, 'app.asar.unpacked', 'src', 'assets'),
                    path.join(process.resourcesPath, 'app', 'src', 'assets'),
                    path.join(process.resourcesPath, 'assets'),
                    // Executable relative paths
                    path.join(path.dirname(process.execPath), 'resources', 'assets'),
                    path.join(path.dirname(process.execPath), 'src', 'assets')
                ];
                
                // Her path ve dosya adı kombinasyonunu dene
                outerLoop:
                for (const basePath of possibleBasePaths) {
                    for (const fileName of logoFileNames) {
                        const fullPath = path.join(basePath, fileName);
                        console.log('Logo aranıyor:', fullPath);
                        if (fs.existsSync(fullPath)) {
                            logoPath = fullPath;
                            console.log('Logo bulundu:', logoPath);
                            break outerLoop;
                        }
                    }
                }
                
                if (logoPath) {
                    // Logo dosyasını base64 olarak oku
                    const imageBase64 = fs.readFileSync(logoPath, 'base64');
                    
                    const workbook = worksheet.workbook;
                    const logoImage = workbook.addImage({
                        base64: imageBase64,
                        extension: 'png',
                    });
                    
                    // Logo'yu D1:E6 hücrelerine yerleştir - KENARLIKLARA TAŞMAYACAK ŞEKİLDE
                    // offset değerleri ile hücre içine margin bırakıyoruz
                    worksheet.addImage(logoImage, {
                    tl: { col: 3.0, row: 0.15 },     // Daha ortaya kaydırıldı
                    ext: { width: 238, height: 115 },
                    editAs: 'oneCell'
                });
                    
                    console.log('Logo Excel dosyasına başarıyla eklendi');
                } else {
                    console.warn('Logo dosyası bulunamadı. Denenen yollar yukarıda listelenmiştir.');
                    // Logo bulunamazsa hata fırlatma, sadece uyar
                }
            } catch (error) {
                console.error('Logo ekleme hatası:', error);
                // Logo eklenemese bile Excel kaydedilsin
            }
        },

        // Proje bilgilerini ekle
        addProjectInfo: function(worksheet, projectInfo) {
            // Proje bilgileri - etiketler
            const labels = [
                { cell: 'F1', value: LanguageManager.getText('project_name', 'Proje:'), size: 10 },
                { cell: 'J1', value: LanguageManager.getText('order_no', 'Sipariş No:'), size: 10 },
                { cell: 'F3', value: LanguageManager.getText('drawing_description', 'Resim Açıklaması:'), size: 10 },
                { cell: 'J4', value: LanguageManager.getText('revision_no', 'Revizyon No:'), size: 10 },
                { cell: 'F5', value: LanguageManager.getText('drawing_no', 'Resim No:'), size: 10 }
            ];
            
            labels.forEach(label => {
                const cell = worksheet.getCell(label.cell);
                cell.value = label.value;
                cell.font = { name: 'Calibri', size: label.size, bold: false };
                cell.alignment = { horizontal: 'left', vertical: 'center' };
            });
        
        // Proje bilgileri - değerler
        const values = [
            { cell: 'G1', value: projectInfo.projeAdi || '', size: 16 },
            { cell: 'J2', value: projectInfo.siparisNo || '', size: 12 },
            { cell: 'J5', value: projectInfo.revizyonNo || '', size: 12 },
            { cell: 'G5', value: projectInfo.resimNo || '', size: 12 }
        ];
        
        values.forEach(val => {
            const cell = worksheet.getCell(val.cell);
            cell.value = val.value;
            cell.font = { name: 'Calibri', size: val.size, bold: true };
            cell.alignment = { horizontal: 'center', vertical: 'center' };
        });
        
        // Resim açıklaması için özel işlem - dinamik font boyutu
        const resimAciklamasiCell = worksheet.getCell('G3');
        const resimAciklamasi = projectInfo.resimAciklamasi || '';
        resimAciklamasiCell.value = resimAciklamasi;
        
        // Metin uzunluğuna göre font boyutunu ayarla
        let fontSize = 14;
        const textLength = resimAciklamasi.length;
        
        if (textLength > 40) {
            fontSize = 11;
        } else if (textLength > 30) {
            fontSize = 12;
        } else if (textLength > 20) {
            fontSize = 13;
        }
        
        resimAciklamasiCell.font = { 
            name: 'Calibri', 
            size: fontSize, 
            bold: true 
        };
        resimAciklamasiCell.alignment = { 
            horizontal: 'center', 
            vertical: 'center',
            wrapText: true,
            shrinkToFit: true
        };
    },

        // Başlık kenarlıkları ekle
        addHeaderBorders: function(worksheet) {
            // Tüm başlık hücreleri için normal kenarlık
            for (let row = 1; row <= 6; row++) {
                for (let col = 1; col <= 10; col++) {
                    const cell = worksheet.getCell(row, col);
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                }
            }
            
            // Belirli satırların alt kenarlığını kalın yap
            const thickBottomRows = [2, 3, 4, 6];
            thickBottomRows.forEach(rowNum => {
                for (let col = 1; col <= 10; col++) {
                    worksheet.getCell(rowNum, col).border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'medium' },
                        right: { style: 'thin' }
                    };
                }
            });
        },

        // Tablo başlıklarını ekle
        addTableHeaders: function(worksheet) {
            const headers = [
                LanguageManager.getText('part_no', 'P.No'),
                LanguageManager.getText('quantity', 'Adet'), 
                LanguageManager.getText('material_type_col', 'Malzeme\nTürü'),
                LanguageManager.getText('material_grade_col', 'Malzeme\nCinsi'),
                LanguageManager.getText('dimensions', 'Ölçüler'),
                LanguageManager.getText('standard', 'Standart'),
                LanguageManager.getText('water_volume', 'Su Hacmi\n(L)'),
                LanguageManager.getText('unit_weight', 'Birim Ağırlık\n(kg)'),
                LanguageManager.getText('total_weight_col', 'Toplam Ağırlık\n(kg)'),
                LanguageManager.getText('description_heat_col', 'Açıklama\nHeat No')
            ];
            
            const headerRow = worksheet.getRow(7);
            headers.forEach((header, index) => {
                const cell = headerRow.getCell(index + 1);
                cell.value = header;
                cell.font = { name: 'Calibri', size: 11, bold: true };
                cell.alignment = { horizontal: 'center', vertical: 'center', wrapText: true };
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFD9D9D9' }
                };
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
            });
        },

        // Veri ekleme ve sayfalama - DÜZELTİLMİŞ VERSİYON
        addDataWithPaging: function(worksheet, tableData) {
            let currentRow = this.PAGE_CONSTANTS.DATA_START_ROW;
            const evenRowFill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFF2F2F2' }
            };
            
            // Sayfa sonu satırlarını takip etmek için array
            const pageBreakRows = [];
            
            // Her veri satırını ekle
            tableData.forEach((data, index) => {
                const dataRow = worksheet.getRow(currentRow);
                const isEvenRow = index % 2 === 0;
                
                // Satır yüksekliği
                dataRow.height = 18.75;
                
                // Veri değerlerini ekle
                this.addDataRow(dataRow, data, isEvenRow ? evenRowFill : null);
                
                // Sayfa sonu kontrolü (her 45 satırda bir)
                if ((currentRow - this.PAGE_CONSTANTS.DATA_START_ROW + 1) % this.PAGE_CONSTANTS.MAX_ROWS_PER_PAGE === 0) {
                    // Sayfa sonu noktasını kaydet
                    pageBreakRows.push(currentRow);
                }
                
                currentRow++;
            });
            
            // Excel'in kendi sayfalama sistemini kullanması için pageBreaks özelliğini ayarla
            // ExcelJS 4.4.0'da bu şekilde kullanılır
            if (pageBreakRows.length > 0) {
                worksheet.pageSetup.rowBreaks = pageBreakRows;
            }
            
            // Son veri satırının alt kenarlığını kalın yap
            for (let col = 1; col <= 10; col++) {
                const cell = worksheet.getCell(currentRow - 1, col);
                const existingBorder = cell.border || {};
                cell.border = {
                    ...existingBorder,
                    bottom: { style: 'medium' }
                };
            }
            
            return currentRow;
        },

        // Veri satırı ekle
        addDataRow: function(dataRow, data, fillStyle) {
            const cellData = [
                { col: 1, value: data.pNo, align: 'center' },
                { col: 2, value: parseInt(data.adet), align: 'center' },
                { col: 3, value: data.malzemeTuru, align: 'left' },
                { col: 4, value: data.malzemeCinsi, align: 'center' },
                { col: 5, value: data.olculer, align: 'left' },
                { col: 6, value: data.enNormu, align: 'left' },
                { col: 7, value: data.suHacmi === '-' ? '' : parseFloat(data.suHacmi), align: 'center' },
                { col: 8, value: parseFloat(data.birimAgirlik), align: 'right', format: '#,##0.00' },
                { col: 9, value: parseFloat(data.toplamAgirlik), align: 'right', format: '#,##0.00' },
                { col: 10, value: data.heatNo === '-' ? '' : data.heatNo, align: 'left' }
            ];
            
            // Revizyon rengi için font objesi
            const fontStyle = { name: 'Calibri', size: 11 };
            if (data.isRevision) {
                fontStyle.color = { argb: 'FFFF0000' };  // Kırmızı renk
            }
            
            cellData.forEach(item => {
                const cell = dataRow.getCell(item.col);
                cell.value = item.value;
                cell.font = fontStyle;
                cell.alignment = { horizontal: item.align, vertical: 'center' };
                
                if (item.format) {
                    cell.numFmt = item.format;
                }
                
                if (fillStyle) {
                    cell.fill = fillStyle;
                }
                
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
            });
        },

        // Özet bölümü ekle
        addSummarySection: function(worksheet, tableData, startRow) {
            const summary = this.calculateSummary(tableData);
            const projectInfo = TableManager.getProjectInfo();
            const notlarRevizyon = TableManager.getNotesRevisions();
            
            // Bir satır boşluk bırak
            const summaryStartRow = startRow + 1;
            
            // Özet bölümü birleştirmeleri - YENİ DÜZENLEMELİ YAPI
            // Başlıklar aynı satırda
            worksheet.mergeCells(`A${summaryStartRow}:C${summaryStartRow}`);     // Notlar: başlığı
            worksheet.mergeCells(`D${summaryStartRow}:G${summaryStartRow}`);     // Revizyonlar: başlığı
            worksheet.mergeCells(`H${summaryStartRow}:J${summaryStartRow}`);     // Özet Raporu başlığı
            
            // İçerik alanları - 7 satır birleşik
            worksheet.mergeCells(`A${summaryStartRow + 1}:C${summaryStartRow + 7}`); // Notlar içeriği
            worksheet.mergeCells(`D${summaryStartRow + 1}:G${summaryStartRow + 7}`); // Revizyonlar içeriği
            
            // Sağ taraf özet bilgileri
            worksheet.mergeCells(`H${summaryStartRow + 1}:I${summaryStartRow + 1}`); // Toplam Parça
            worksheet.mergeCells(`H${summaryStartRow + 2}:I${summaryStartRow + 2}`); // Genel Toplam Ağırlık
            worksheet.mergeCells(`H${summaryStartRow + 3}:I${summaryStartRow + 3}`); // Su Hacmi
            worksheet.mergeCells(`H${summaryStartRow + 5}:I${summaryStartRow + 5}`); // Rapor Tarihi
            worksheet.mergeCells(`H${summaryStartRow + 6}:I${summaryStartRow + 6}`); // Hazırlayan
            worksheet.mergeCells(`H${summaryStartRow + 7}:I${summaryStartRow + 7}`); // Kontrol
            
            // ========== BAŞLIKLAR (Aynı Satırda) ==========
            
            // Notlar başlığı (A-C birleşik, özet raporu ile aynı satır)
            const notlarBaslikCell = worksheet.getCell(`A${summaryStartRow}`);
            notlarBaslikCell.value = 'Notlar:';
            notlarBaslikCell.font = { name: 'Calibri', size: 11, bold: true };
            notlarBaslikCell.alignment = { horizontal: 'center', vertical: 'center' };
            
            // Revizyonlar başlığı (D-G birleşik, özet raporu ile aynı satır)
            const revizyonBaslikCell = worksheet.getCell(`D${summaryStartRow}`);
            revizyonBaslikCell.value = 'Revizyonlar:';
            revizyonBaslikCell.font = { name: 'Calibri', size: 11, bold: true };
            revizyonBaslikCell.alignment = { horizontal: 'center', vertical: 'center' };
            
            // Özet Raporu başlığı
            const ozetRaporuCell = worksheet.getCell(`H${summaryStartRow}`);
            ozetRaporuCell.value = LanguageManager.getText('summary_report', 'ÖZET RAPORU').toUpperCase();
            ozetRaporuCell.font = { name: 'Calibri', size: 11, bold: true };
            ozetRaporuCell.alignment = { horizontal: 'center', vertical: 'center' };
            ozetRaporuCell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFE0E0E0' }
            };
            
            // ========== İÇERİKLER (7 Satır Birleşik) ==========
            
            // Notlar içeriği (A-C sütunları, 7 satır birleşik, font size: 10)
            const notlarIcerikCell = worksheet.getCell(`A${summaryStartRow + 1}`);
            notlarIcerikCell.value = notlarRevizyon.notlar || '';
            notlarIcerikCell.font = { name: 'Calibri', size: 10, bold: false };
            notlarIcerikCell.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
            
            // Revizyonlar içeriği (D-G sütunları, 7 satır birleşik, font size: 10, KıRMıZı RENK)
            const revizyonIcerikCell = worksheet.getCell(`D${summaryStartRow + 1}`);
            revizyonIcerikCell.value = notlarRevizyon.revizyonlar || '';
            revizyonIcerikCell.font = { 
                name: 'Calibri', 
                size: 10, 
                bold: false,
                color: { argb: 'FFFF0000' } // Kırmızı renk
            };
            revizyonIcerikCell.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
            
            // ========== ÖZET BİLGİLERİ ==========
            
            const summaryData = [
                { cell: `H${summaryStartRow + 1}`, value: LanguageManager.getText('total_parts', 'TOPLAM PARÇA SAYISI').toUpperCase(), bold: false },
                { cell: `H${summaryStartRow + 2}`, value: LanguageManager.getText('total_weight', 'GENEL TOPLAM AĞIRLIK').toUpperCase(), bold: false },
                { cell: `H${summaryStartRow + 3}`, value: LanguageManager.getText('water_volume_result', 'GENEL TOPLAM SU HACMİ').toUpperCase(), bold: false },
                { cell: `H${summaryStartRow + 5}`, value: LanguageManager.getText('report_date', 'RAPOR TARİHİ').toUpperCase(), bold: false },
                { cell: `H${summaryStartRow + 6}`, value: LanguageManager.getText('prepared_by', 'HAZIRLAYAN').toUpperCase(), bold: false },
                { cell: `H${summaryStartRow + 7}`, value: LanguageManager.getText('controlled_by', 'KONTROL').toUpperCase(), bold: false }
            ];
            
            summaryData.forEach(item => {
                const cell = worksheet.getCell(item.cell);
                cell.value = item.value;
                cell.font = { name: 'Calibri', size: 11, bold: item.bold };
                cell.alignment = { horizontal: 'center', vertical: 'center' };
            });
            
            // Özet değerleri
            const summaryValues = [
                { cell: `J${summaryStartRow + 1}`, value: summary.toplamParca },
                { cell: `J${summaryStartRow + 2}`, value: parseFloat(summary.toplamAgirlik), format: '#,##0.00 "kg"' },
                { cell: `J${summaryStartRow + 3}`, value: parseFloat(summary.toplamSuHacmi), format: '#,##0.00 "L"' },
                { cell: `J${summaryStartRow + 5}`, value: new Date().toLocaleDateString('tr-TR') },
                { cell: `J${summaryStartRow + 6}`, value: projectInfo.hazirlayan || '' },
                { cell: `J${summaryStartRow + 7}`, value: projectInfo.kontrol || '' }
            ];
            
            summaryValues.forEach(item => {
                const cell = worksheet.getCell(item.cell);
                cell.value = item.value;
                cell.font = { name: 'Calibri', size: 11 };
                cell.alignment = { horizontal: 'center', vertical: 'center' };
                if (item.format) {
                    cell.numFmt = item.format;
                }
            });
            
            // Özet bölümü kenarlıkları
            this.addSummaryBorders(worksheet, summaryStartRow, summaryStartRow + 7);
            
            // Görünüm ayarları
            worksheet.views = [{
                state: 'frozen',
                ySplit: 7,
                topLeftCell: 'A8',
                activePane: 'bottomLeft',
                zoomScale: 100,
                zoomScaleNormal: 100
            }];
        },

        // Özet bölümü kenarlıkları
        addSummaryBorders: function(worksheet, startRow, endRow) {
            // Tüm hücreler için tam kenarlık (A-J sütunları)
            for (let row = startRow; row <= endRow; row++) {
                for (let col = 1; col <= 10; col++) {
                    const cell = worksheet.getCell(row, col);
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: row === endRow ? { style: 'medium' } : { style: 'thin' },
                        right: { style: 'thin' }
                    };
                }
            }
            
            // H4 satırı (boş satır) alt kenarlığını kalın yap
            const emptyRowNum = startRow + 4;
            for (let col = 8; col <= 10; col++) {
                const cell = worksheet.getCell(emptyRowNum, col);
                const existingBorder = cell.border || {};
                cell.border = {
                    ...existingBorder,
                    bottom: { style: 'medium' }
                };
            }
        },

        // Excel'den içe aktar
        importFromExcel: async function() {
            try {
                const result = await ipcRenderer.invoke('open-excel-dialog');
                if (result.canceled) return;
                
                const filePath = result.filePaths[0];
                
                const workbook = new ExcelJS.Workbook();
                await workbook.xlsx.readFile(filePath);
                
                // ÖNEMLİ: Doğru worksheet'i bul
                // OzelMalzemeler değil, Sheet1 veya ana veri sayfasını al
                let worksheet = null;
                
                // Önce Sheet1 isimli sayfayı ara
                worksheet = workbook.getWorksheet('Sheet1');
                
                // Sheet1 bulunamazsa, OzelMalzemeler OLMAYAN ilk sayfayı al
                if (!worksheet) {
                    workbook.eachSheet((sheet, id) => {
                        if (sheet.name !== 'OzelMalzemeler' && !worksheet) {
                            worksheet = sheet;
                            console.log('Ana sayfa bulundu:', sheet.name);
                        }
                    });
                }
                
                // Hala bulunamadıysa, index ile dene
                if (!worksheet) {
                    // İlk sayfa OzelMalzemeler ise ikinci sayfayı al
                    const firstSheet = workbook.getWorksheet(1);
                    if (firstSheet && firstSheet.name === 'OzelMalzemeler') {
                        worksheet = workbook.getWorksheet(2);
                    } else {
                        worksheet = firstSheet;
                    }
                }
                
                if (!worksheet) {
                    this.showNotification('Ana veri sayfası bulunamadı!', 'error');
                    return;
                }
                
                console.log('Okunacak worksheet:', worksheet.name);
                
                // Önce özel malzemeleri yükle
                const hiddenSheet = workbook.getWorksheet('OzelMalzemeler');
                if (hiddenSheet) {
                    console.log('Özel malzemeler yükleniyor...');
                    
                    const hacimTabanliMalzemeler = {};
                    const birimAgirlikTabanliMalzemeler = {};
                    const malzemeCinsleri = [];
                    
                    hiddenSheet.eachRow((row, rowNumber) => {
                        if (rowNumber === 1) return;
                        
                        const tip = row.getCell(1).value;
                        const kod = row.getCell(2).value;
                        const ad = row.getCell(3).value;
                        const veri = row.getCell(4).value;
                        
                        if (!tip || !veri) return;
                        
                        try {
                            const parsedData = JSON.parse(veri);
                            
                            if (tip === 'hacimTabanli') {
                                hacimTabanliMalzemeler[kod] = parsedData;
                            } else if (tip === 'birimAgirlikTabanli') {
                                birimAgirlikTabanliMalzemeler[kod] = parsedData;
                            } else if (tip === 'malzemeCinsi') {
                                malzemeCinsleri.push(parsedData);
                            }
                        } catch (error) {
                            console.error('Özel malzeme parse hatası:', error);
                        }
                    });
                    
                    MaterialData.ozelMalzemeTurleri.hacimTabanli = hacimTabanliMalzemeler;
                    MaterialData.ozelMalzemeTurleri.birimAgirlikTabanli = birimAgirlikTabanliMalzemeler;
                    
                    malzemeCinsleri.forEach(material => {
                        MaterialData.EN_NORMLARI[material.kod] = material.enNormu;
                        MaterialData.YOGUNLUKLAR[material.kod] = material.yogunluk;
                    });
                    
                    MaterialData.saveOzelMalzemeler();
                }
                
                // Proje bilgilerini oku
                const projectInfo = {
                    projeAdi: worksheet.getCell('G1').value || '',
                    siparisNo: worksheet.getCell('J2').value || '',
                    resimAciklamasi: worksheet.getCell('G3').value || '',
                    resimNo: worksheet.getCell('G5').value || '',
                    revizyonNo: worksheet.getCell('J5').value || '',
                    hazirlayan: '',
                    kontrol: ''
                };
                
                console.log('Proje bilgileri:', projectInfo);
                
                // Tablo verilerini oku
                const tableData = [];
                let currentRow = 8;
                let emptyRowCount = 0;
                const maxRows = worksheet.actualRowCount || worksheet.rowCount || 1000;
                
                while (currentRow <= maxRows) {
                    const pNoValue = worksheet.getCell(currentRow, 1).value;
                    
                    console.log(`Satır ${currentRow} P.No:`, pNoValue);
                    
                    if (!pNoValue) {
                        emptyRowCount++;
                        if (emptyRowCount >= 2) {
                            console.log('Ardışık boş satır, veri okuma bitti');
                            break;
                        }
                        currentRow++;
                        continue;
                    }
                    
                    // P.No sayısal değilse özet bölümüne gelinmiştir
                    if (typeof pNoValue === 'string' && isNaN(parseInt(pNoValue))) {
                        console.log('Sayısal olmayan P.No, veri okuma bitti');
                        break;
                    }
                    
                    emptyRowCount = 0;
                    
                    const rowData = {
                        pNo: parseInt(pNoValue) || pNoValue,
                        adet: parseFloat(worksheet.getCell(currentRow, 2).value) || 1,
                        malzemeTuru: worksheet.getCell(currentRow, 3).value || '',
                        malzemeCinsi: worksheet.getCell(currentRow, 4).value || '',
                        olculer: worksheet.getCell(currentRow, 5).value || '',
                        enNormu: worksheet.getCell(currentRow, 6).value || '',
                        suHacmi: worksheet.getCell(currentRow, 7).value || '-',
                        birimAgirlik: parseFloat(worksheet.getCell(currentRow, 8).value) || 0,
                        toplamAgirlik: parseFloat(worksheet.getCell(currentRow, 9).value) || 0,
                        heatNo: worksheet.getCell(currentRow, 10).value || '-',
                        originalType: '',
                        originalGrade: worksheet.getCell(currentRow, 4).value || '',
                        isRevision: false  // Varsayılan olarak false
                    };

                    // Revizyon durumunu kontrol et (yazı rengi kırmızı mı?)
                    const firstCell = worksheet.getCell(currentRow, 1);
                    if (firstCell.font && firstCell.font.color && firstCell.font.color.argb === 'FFFF0000') {
                        rowData.isRevision = true;
                    }
                    
                    // Malzeme türünü belirle
                    const malzemeTuruLower = rowData.malzemeTuru.toString().toLowerCase();
                    
                    if (malzemeTuruLower.includes('sac')) rowData.originalType = 'sac';
                    else if (malzemeTuruLower.includes('lama')) rowData.originalType = 'lama';
                    else if (malzemeTuruLower.includes('boru')) rowData.originalType = 'boru';
                    else if (malzemeTuruLower.includes('köşebent')) rowData.originalType = 'kosebent';
                    else if (malzemeTuruLower.includes('kutu')) rowData.originalType = 'kutu';
                    else if (malzemeTuruLower.includes('mil')) rowData.originalType = 'mil';
                    else if (malzemeTuruLower.includes('ipe')) rowData.originalType = 'ipe';
                    else if (malzemeTuruLower.includes('hea')) rowData.originalType = 'hea';
                    else if (malzemeTuruLower.includes('heb')) rowData.originalType = 'heb';
                    else if (malzemeTuruLower.includes('npu')) rowData.originalType = 'npu';
                    else if (malzemeTuruLower.includes('npi')) rowData.originalType = 'npi';
                    else if (malzemeTuruLower.includes('flanş')) {
                        rowData.originalType = malzemeTuruLower.includes('özel') ? 'ozelFlans' : 'flans';
                    }
                    else if (malzemeTuruLower.includes('dirsek')) rowData.originalType = 'dirsek';
                    else if (malzemeTuruLower.includes('ızgara')) rowData.originalType = 'izgara';
                    else rowData.originalType = 'ozelMalzeme';
                    
                    this.checkSpecialMaterialTypes(rowData);
                    
                    tableData.push(rowData);
                    currentRow++;
                }
                
                console.log(`Toplam ${tableData.length} satır okundu`);
                
                // Özet bölümünü oku - DOĞRU FORMATA GÖRE DÜZELTİLMİŞ
                let notlar = '';
                let revizyonlar = '';

                // Veri okuma döngüsü bittikten sonra, gerçek özet başlangıç satırını hesapla
                // currentRow, son okunan veri satırından bir sonraki satırı gösteriyor
                const summaryStartRow = currentRow + 1; // Boş satırı atla

                console.log('Özet bölümü başlangıç satırı (summaryStartRow):', summaryStartRow);

                // NOTLAR - Başlık summaryStartRow'da, içerik summaryStartRow+1'de
                const notlarBaslikCell = worksheet.getCell(summaryStartRow, 1).value;
                console.log('Notlar başlık hücresi (A' + summaryStartRow + '):', notlarBaslikCell);

                if (notlarBaslikCell && notlarBaslikCell.toString().toLowerCase().includes('notlar')) {
                    // Notlar içeriği bir alt satırda birleşik hücrede
                    const notlarIcerikCell = worksheet.getCell(summaryStartRow + 1, 1).value;
                    if (notlarIcerikCell) {
                        notlar = notlarIcerikCell.toString();
                        console.log('Notlar içeriği bulundu (A' + (summaryStartRow + 1) + '):', notlar);
                    }
                }

                // REVİZYONLAR - Başlık summaryStartRow'da, içerik summaryStartRow+1'de
                const revizyonBaslikCell = worksheet.getCell(summaryStartRow, 4).value;
                console.log('Revizyon başlık hücresi (D' + summaryStartRow + '):', revizyonBaslikCell);

                if (revizyonBaslikCell && revizyonBaslikCell.toString().toLowerCase().includes('revizyon')) {
                    // Revizyonlar içeriği bir alt satırda birleşik hücrede
                    const revizyonIcerikCell = worksheet.getCell(summaryStartRow + 1, 4).value;
                    if (revizyonIcerikCell) {
                        revizyonlar = revizyonIcerikCell.toString();
                        console.log('Revizyonlar içeriği bulundu (D' + (summaryStartRow + 1) + '):', revizyonlar);
                    }
                }

                // HAZIRLAYAN - summaryStartRow + 6 satırında
                const hazirlayanRow = summaryStartRow + 6;
                const hazirlayanEtiket = worksheet.getCell(hazirlayanRow, 8).value;
                console.log('Hazırlayan etiketi (H' + hazirlayanRow + '):', hazirlayanEtiket);

                if (hazirlayanEtiket && hazirlayanEtiket.toString().toUpperCase().includes('HAZIRLAYAN')) {
                    const hazirlayanDeger = worksheet.getCell(hazirlayanRow, 10).value;
                    console.log('Hazırlayan değeri (J' + hazirlayanRow + '):', hazirlayanDeger);
                    
                    if (hazirlayanDeger) {
                        projectInfo.hazirlayan = hazirlayanDeger.toString().trim();
                        console.log('Hazırlayan kaydedildi:', projectInfo.hazirlayan);
                    }
                }

                // KONTROL - summaryStartRow + 7 satırında
                const kontrolRow = summaryStartRow + 7;
                const kontrolEtiket = worksheet.getCell(kontrolRow, 8).value;
                console.log('Kontrol etiketi (H' + kontrolRow + '):', kontrolEtiket);

                if (kontrolEtiket && kontrolEtiket.toString().toUpperCase().includes('KONTROL')) {
                    const kontrolDeger = worksheet.getCell(kontrolRow, 10).value;
                    console.log('Kontrol değeri (J' + kontrolRow + '):', kontrolDeger);
                    
                    if (kontrolDeger) {
                        projectInfo.kontrol = kontrolDeger.toString().trim();
                        console.log('Kontrol kaydedildi:', projectInfo.kontrol);
                    }
                }

                // Eğer yukarıdaki yöntem çalışmazsa, alternatif arama yap
                if (!notlar || !revizyonlar || !projectInfo.hazirlayan || !projectInfo.kontrol) {
                    console.log('Bazı alanlar bulunamadı, alternatif arama yapılıyor...');
                    
                    // Özet raporu başlığını bul ve ondan hesapla
                    for (let i = summaryStartRow - 2; i <= summaryStartRow + 2; i++) {
                        const ozetBaslik = worksheet.getCell(i, 8).value;
                        if (ozetBaslik && ozetBaslik.toString().toUpperCase().includes('ÖZET RAPORU')) {
                            console.log('Özet raporu başlığı bulundu, satır:', i);
                            
                            // Bu satırdan itibaren pozisyonları yeniden hesapla
                            if (!notlar) {
                                const altNotlar = worksheet.getCell(i + 1, 1).value;
                                if (altNotlar) notlar = altNotlar.toString();
                            }
                            
                            if (!revizyonlar) {
                                const altRevizyon = worksheet.getCell(i + 1, 4).value;
                                if (altRevizyon) revizyonlar = altRevizyon.toString();
                            }
                            
                            if (!projectInfo.hazirlayan) {
                                const altHazirlayan = worksheet.getCell(i + 6, 10).value;
                                if (altHazirlayan) projectInfo.hazirlayan = altHazirlayan.toString().trim();
                            }
                            
                            if (!projectInfo.kontrol) {
                                const altKontrol = worksheet.getCell(i + 7, 10).value;
                                if (altKontrol) projectInfo.kontrol = altKontrol.toString().trim();
                            }
                            
                            break;
                        }
                    }
                }

                console.log('Özet bölümü okuma sonucu:', {
                    notlar: notlar || 'Bulunamadı',
                    revizyonlar: revizyonlar || 'Bulunamadı',
                    hazirlayan: projectInfo.hazirlayan || 'Bulunamadı',
                    kontrol: projectInfo.kontrol || 'Bulunamadı'
                });
                
                TableManager.loadProjectInfo(projectInfo);
                TableManager.loadNotesRevisions({ notlar, revizyonlar });
                
                if (tableData.length > 0) {
                    TableManager.loadTableData(tableData);
                    this.showNotification(`Excel dosyası yüklendi (${tableData.length} satır)`, 'success');
                } else {
                    this.showNotification('Excel dosyasında veri bulunamadı!', 'warning');
                }
                
            } catch (error) {
                console.error('Excel import hatası:', error);
                this.showNotification('Excel yükleme hatası: ' + error.message, 'error');
            }
        },

        // Özel malzeme türlerini kontrol et
        checkSpecialMaterialTypes: function(row) {
            // Izgara elemanları kontrolü
            if (row.malzemeTuru && MaterialData.izgaraElemanlari) {
                const malzemeTuruStr = row.malzemeTuru.toString();
                const izgaraElemani = Object.keys(MaterialData.izgaraElemanlari).find(tip => 
                    tip === malzemeTuruStr
                );
                
                if (izgaraElemani) {
                    row.originalType = 'izgara';
                    row.izgaraTipi = izgaraElemani;
                    const izgaraData = MaterialData.izgaraElemanlari[izgaraElemani];
                    if (izgaraData) {
                        row.originalGrade = izgaraData.malzeme;
                    }
                }
            }

            // Flanş kontrolü
            if (row.malzemeTuru && row.malzemeTuru.toString().includes('Flanş')) {
                if (row.malzemeTuru.includes('ASME')) {
                    row.originalType = 'flansAsme';
                    
                    if (row.malzemeTuru.includes('Düz')) {
                        row.flansTipiAsme = 'duzFlansAsme';
                    } else if (row.malzemeTuru.includes('Kaynak Boyunlu')) {
                        row.flansTipiAsme = 'kaynakBoyunluFlansAsme';
                    } else if (row.malzemeTuru.includes('Kör')) {
                        row.flansTipiAsme = 'korFlansAsme';
                    }
                } else {
                    row.originalType = 'flans';
                    
                    if (row.malzemeTuru.includes('Düz')) {
                        row.flansTipi = 'duzFlans';
                    } else if (row.malzemeTuru.includes('Kaynak Boyunlu')) {
                        row.flansTipi = 'kaynakBoyunluFlans';
                    } else if (row.malzemeTuru.includes('Kör')) {
                        row.flansTipi = 'korFlans';
                    }
                }
            }

            // Özel malzeme kontrolü
            const standartMalzemeler = ['SAC', 'LAMA', 'BORU', 'KOSEBENT', 'KUTU', 'MIL', 
                                       'IPE', 'HEA', 'HEB', 'NPU', 'NPI'];
            if (row.malzemeTuru && 
                !row.malzemeTuru.toString().includes('Flanş') && 
                !row.originalType === 'izgara' &&
                !standartMalzemeler.includes(row.malzemeTuru.toString().toUpperCase())) {
                row.originalType = 'ozelMalzeme';
                row.ozelMalzemeTuru = row.malzemeTuru;
            }
        },

        // Filtrelenmiş veri için Excel export
        exportFilteredToExcel: async function(filteredData, filterType) {
            if (!filteredData || filteredData.length === 0) {
                this.showNotification('Filtrelenmiş veri bulunamadı!', 'warning');
                return;
            }
            
            try {
                const projectInfo = TableManager.getProjectInfo();
                
                // Dosya adı oluştur
                const tarih = new Date().toLocaleDateString('tr-TR').replace(/\./g, '_');
                const dosyaAdi = `${filterType}_${tarih}`.replace(/[<>:"/\\|?*]/g, '').replace(/\s+/g, '_');
                
                const result = await ipcRenderer.invoke('save-excel-dialog', {
                    dosyaAdi: dosyaAdi
                });
                
                if (result.canceled) return;
                
                const filePath = result.filePath;
                
                // ExcelJS Workbook oluştur
                const workbook = new ExcelJS.Workbook();
                workbook.creator = 'TETA Kazan';
                workbook.created = new Date();
                
                const worksheet = workbook.addWorksheet('Filtrelenmiş Liste', {
                    pageSetup: {
                        paperSize: 9,
                        scale: 73,
                        orientation: 'portrait',
                        fitToPage: false,
                        fitToWidth: 1,
                        fitToHeight: 0,
                        horizontalCentered: true,
                        verticalCentered: false
                    }
                });
                
                // Sütun genişlikleri
                this.setupColumnWidths(worksheet);
                
                // Başlık bölümü
                this.createFilteredHeaderSection(worksheet, projectInfo, filterType);
                
                // Veri ekleme
                const dataEndRow = this.addFilteredDataRows(worksheet, filteredData);
                
                // Özet raporu
                this.addFilteredSummarySection(worksheet, filteredData, dataEndRow, filterType);
                
                // Excel dosyasını kaydet
                await workbook.xlsx.writeFile(filePath);
                
                this.showNotification('Filtrelenmiş Excel dosyası başarıyla kaydedildi!', 'success');
                
            } catch (error) {
                console.error('Filtrelenmiş Excel export hatası:', error);
                this.showNotification('Filtrelenmiş Excel dosyası kaydedilemedi: ' + error.message, 'error');
            }
        },

        // Filtrelenmiş başlık bölümü
        createFilteredHeaderSection: function(worksheet, projectInfo, filterType) {
            // Satır yükseklikleri
            worksheet.getRow(1).height = 15;
            worksheet.getRow(2).height = 15.75;
            worksheet.getRow(3).height = 15.75;
            worksheet.getRow(4).height = 15.75;
            worksheet.getRow(5).height = 15;
            worksheet.getRow(6).height = 15.75;
            worksheet.getRow(7).height = 31.5;
            
            // Birleştirmeler
            worksheet.mergeCells('A1:C6');
            worksheet.mergeCells('D1:E6');
            worksheet.mergeCells('F1:F2');
            worksheet.mergeCells('G1:I2');
            worksheet.mergeCells('F3:F4');
            worksheet.mergeCells('G3:I4');
            worksheet.mergeCells('F5:F6');
            worksheet.mergeCells('G5:I6');
            worksheet.mergeCells('J2:J3');
            worksheet.mergeCells('J5:J6');
            
            // Firma bilgileri
            const addressCell = worksheet.getCell('A1');
            addressCell.value = 'Şair Nedim Caddesi\nHacı Halitbey Sokak No:7\nBeşiktaş - İSTANBUL\nTel: +90 212 236 25 57\nFax: +90 212 236 25 61\nE-Mail: teta@tetakazan.com.tr';
            addressCell.font = { name: 'Calibri', size: 11, bold: false };
            addressCell.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
            
            // Logo ekleme
            this.addLogo(worksheet);
            
            // Proje bilgileri
            const labels = [
                { cell: 'F1', value: 'Proje:', size: 10 },
                { cell: 'J1', value: 'Sipariş No:', size: 10 },
                { cell: 'F3', value: `Filtre (${filterType}):`, size: 10 },
                { cell: 'J4', value: 'Revizyon No:', size: 10 },
                { cell: 'F5', value: 'Resim No:', size: 10 }
            ];
            
            labels.forEach(label => {
                const cell = worksheet.getCell(label.cell);
                cell.value = label.value;
                cell.font = { name: 'Calibri', size: label.size, bold: false };
                cell.alignment = { horizontal: 'left', vertical: 'center' };
            });
            
            // Değerler
            worksheet.getCell('G1').value = projectInfo.projeAdi || '';
            worksheet.getCell('G1').font = { name: 'Calibri', size: 16, bold: true };
            worksheet.getCell('G1').alignment = { horizontal: 'center', vertical: 'center' };
            
            worksheet.getCell('J2').value = projectInfo.siparisNo || '';
            worksheet.getCell('J2').font = { name: 'Calibri', size: 12, bold: true };
            worksheet.getCell('J2').alignment = { horizontal: 'center', vertical: 'center' };
            
            worksheet.getCell('G3').value = `${filterType} Malzemeleri`;
            worksheet.getCell('G3').font = { name: 'Calibri', size: 14, bold: true };
            worksheet.getCell('G3').alignment = { horizontal: 'center', vertical: 'center', wrapText: true };
            
            worksheet.getCell('J5').value = projectInfo.revizyonNo || '';
            worksheet.getCell('J5').font = { name: 'Calibri', size: 12, bold: true };
            worksheet.getCell('J5').alignment = { horizontal: 'center', vertical: 'center' };
            
            worksheet.getCell('G5').value = projectInfo.resimNo || '';
            worksheet.getCell('G5').font = { name: 'Calibri', size: 12, bold: true };
            worksheet.getCell('G5').alignment = { horizontal: 'center', vertical: 'center' };
            
            // Kenarlıklar
            this.addHeaderBorders(worksheet);
            
            // Tablo başlıkları
            this.addTableHeaders(worksheet);
        },

        // Filtrelenmiş veri satırları
        addFilteredDataRows: function(worksheet, filteredData) {
            let currentRow = this.PAGE_CONSTANTS.DATA_START_ROW;
            const evenRowFill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFF2F2F2' }
            };
            
            filteredData.forEach((data, index) => {
                const dataRow = worksheet.getRow(currentRow);
                const isEvenRow = index % 2 === 0;
                
                dataRow.height = 18.75;
                this.addDataRow(dataRow, data, isEvenRow ? evenRowFill : null);
                currentRow++;
            });
            
            // Son satır kenarlığı
            for (let col = 1; col <= 10; col++) {
                const cell = worksheet.getCell(currentRow - 1, col);
                const existingBorder = cell.border || {};
                cell.border = {
                    ...existingBorder,
                    bottom: { style: 'medium' }
                };
            }
            
            return currentRow;
        },

        // Filtrelenmiş özet bölümü
        addFilteredSummarySection: function(worksheet, filteredData, startRow, filterType) {
            const summary = this.calculateFilteredSummary(filteredData);
            const projectInfo = TableManager.getProjectInfo();
            
            const summaryStartRow = startRow + 1;
            
            // Birleştirmeler
            worksheet.mergeCells(`H${summaryStartRow}:I${summaryStartRow}`);
            worksheet.mergeCells(`H${summaryStartRow + 1}:I${summaryStartRow + 1}`);
            worksheet.mergeCells(`H${summaryStartRow + 2}:I${summaryStartRow + 2}`);
            worksheet.mergeCells(`H${summaryStartRow + 3}:I${summaryStartRow + 3}`);
            worksheet.mergeCells(`H${summaryStartRow + 5}:I${summaryStartRow + 5}`);
            worksheet.mergeCells(`H${summaryStartRow + 6}:I${summaryStartRow + 6}`);
            
            // Başlıklar
            const summaryData = [
                { cell: `H${summaryStartRow}`, value: `${filterType.toUpperCase()} ÖZET RAPORU`, bold: true, fill: true },
                { cell: `H${summaryStartRow + 1}`, value: 'TOPLAM PARÇA SAYISI', bold: false },
                { cell: `H${summaryStartRow + 2}`, value: 'TOPLAM AĞIRLIK', bold: false },
                { cell: `H${summaryStartRow + 3}`, value: 'TOPLAM SU HACMİ', bold: false },
                { cell: `H${summaryStartRow + 5}`, value: 'RAPOR TARİHİ', bold: false },
                { cell: `H${summaryStartRow + 6}`, value: 'HAZIRLAYAN', bold: false }
            ];
            
            summaryData.forEach(item => {
                const cell = worksheet.getCell(item.cell);
                cell.value = item.value;
                cell.font = { name: 'Calibri', size: 11, bold: item.bold };
                cell.alignment = { horizontal: 'center', vertical: 'center' };
                
                if (item.fill) {
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FFE0E0E0' }
                    };
                }
            });
            
            // Değerler
            const summaryValues = [
                { cell: `J${summaryStartRow + 1}`, value: summary.toplamParca },
                { cell: `J${summaryStartRow + 2}`, value: parseFloat(summary.toplamAgirlik), format: '#,##0.00 "kg"' },
                { cell: `J${summaryStartRow + 3}`, value: parseFloat(summary.toplamSuHacmi), format: '#,##0.00 "L"' },
                { cell: `J${summaryStartRow + 5}`, value: new Date().toLocaleDateString('tr-TR') },
                { cell: `J${summaryStartRow + 6}`, value: projectInfo.hazirlayan || '' }
            ];
            
            summaryValues.forEach(item => {
                const cell = worksheet.getCell(item.cell);
                cell.value = item.value;
                cell.font = { name: 'Calibri', size: 11 };
                cell.alignment = { horizontal: 'center', vertical: 'center' };
                if (item.format) {
                    cell.numFmt = item.format;
                }
            });
            
            // Kenarlıklar
            this.addSummaryBorders(worksheet, summaryStartRow, summaryStartRow + 6);
        },

        // Filtrelenmiş özet hesaplama
        calculateFilteredSummary: function(filteredData) {
            let toplamAgirlik = 0;
            let toplamParca = 0;
            let toplamSuHacmi = 0;
            
            filteredData.forEach(row => {
                const adet = parseFloat(row.adet) || 0;
                const satirAgirlik = parseFloat(row.toplamAgirlik) || 0;
                const suHacmi = row.suHacmi === '-' ? 0 : parseFloat(row.suHacmi) || 0;
                
                toplamParca += adet;
                toplamAgirlik += satirAgirlik;
                toplamSuHacmi += suHacmi;
            });
            
            return {
                toplamParca: toplamParca,
                toplamAgirlik: toplamAgirlik.toFixed(2),
                toplamSuHacmi: toplamSuHacmi.toFixed(2)
            };
        },

        // Özet hesaplama
        calculateSummary: function(tableData) {
            let toplamAgirlik = 0;
            let toplamParca = 0;
            let toplamSuHacmi = 0;
            
            tableData.forEach(row => {
                const adet = parseFloat(row.adet) || 0;
                const satirAgirlik = parseFloat(row.toplamAgirlik) || 0;
                const suHacmi = row.suHacmi === '-' ? 0 : parseFloat(row.suHacmi) || 0;
                
                toplamParca += adet;
                toplamAgirlik += satirAgirlik;
                toplamSuHacmi += suHacmi;
            });
            
            return {
                toplamParca: toplamParca,
                toplamAgirlik: toplamAgirlik.toFixed(2),
                toplamSuHacmi: toplamSuHacmi.toFixed(2)
            };
        },

        // Bildirim gösterme
        showNotification: function(message, type = 'info') {
            if (typeof UIManager !== 'undefined' && UIManager.showNotification) {
                UIManager.showNotification(message, type);
            } else {
                console.log(`[${type.toUpperCase()}] ${message}`);
            }
        }
    };

    // Modülü window objesine bağla
    window.ExcelManager = ExcelManager;

})(window);