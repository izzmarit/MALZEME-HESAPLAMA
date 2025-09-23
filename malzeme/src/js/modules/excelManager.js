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
                console.log('Excel dosyası kaydedildi:', filePath);
                
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
                    
                    // Logo'yu D1:E6 hücrelerine yerleştir
                    worksheet.addImage(logoImage, {
                        tl: { col: 3, row: 0 },  // D1
                        br: { col: 5, row: 6 },  // E6
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
            { cell: 'F1', value: 'Proje:', size: 10 },
            { cell: 'J1', value: 'Sipariş No:', size: 10 },
            { cell: 'F3', value: 'Resim Açıklaması:', size: 10 },
            { cell: 'J4', value: 'Revizyon No:', size: 10 },
            { cell: 'F5', value: 'Resim No:', size: 10 }
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
                'P.No', 'Adet', 'Malzeme\nTürü', 'Malzeme\nCinsi', 
                'Ölçüler', 'Standart', 'Su Hacmi\n(L)', 
                'Birim Ağırlık\n(kg)', 'Toplam Ağırlık\n(kg)', 'Açıklama\nHeat No'
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
            
            cellData.forEach(item => {
                const cell = dataRow.getCell(item.col);
                cell.value = item.value;
                cell.font = { name: 'Calibri', size: 11 };
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
            
            // Bir satır boşluk bırak
            const summaryStartRow = startRow + 1;
            
            // Özet bölümü birleştirmeleri
            worksheet.mergeCells(`A${summaryStartRow + 1}:B${summaryStartRow + 1}`); // Notlar başlığı
            worksheet.mergeCells(`H${summaryStartRow}:I${summaryStartRow}`);     // Özet Raporu
            worksheet.mergeCells(`H${summaryStartRow + 1}:I${summaryStartRow + 1}`); // Toplam Parça
            worksheet.mergeCells(`H${summaryStartRow + 2}:I${summaryStartRow + 2}`); // Genel Toplam
            worksheet.mergeCells(`H${summaryStartRow + 3}:I${summaryStartRow + 3}`); // Su Hacmi
            worksheet.mergeCells(`H${summaryStartRow + 5}:I${summaryStartRow + 5}`); // Rapor Tarihi
            worksheet.mergeCells(`H${summaryStartRow + 6}:I${summaryStartRow + 6}`); // Hazırlayan
            
            // Notlar başlığı
            const notlarCell = worksheet.getCell(`A${summaryStartRow + 1}`);
            notlarCell.value = 'Notlar:';
            notlarCell.font = { name: 'Calibri', size: 11, bold: true };
            notlarCell.alignment = { horizontal: 'center', vertical: 'center' };
            
            // Özet raporu başlığı ve değerleri
            const summaryData = [
                { cell: `H${summaryStartRow}`, value: 'ÖZET RAPORU', bold: true, fill: true },
                { cell: `H${summaryStartRow + 1}`, value: 'TOPLAM PARÇA SAYISI', bold: false },
                { cell: `H${summaryStartRow + 2}`, value: 'GENEL TOPLAM AĞIRLIK', bold: false },
                { cell: `H${summaryStartRow + 3}`, value: 'GENEL TOPLAM SU HACMİ', bold: false },
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
            
            // Özet değerleri
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
            
            // Özet bölümü kenarlıkları
            this.addSummaryBorders(worksheet, summaryStartRow, summaryStartRow + 6);
            
            // Görünüm ayarları - dondurulmuş panel
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
            // Sol taraf (A-G) - sadece dış kenarlık
            for (let row = startRow; row <= endRow; row++) {
                for (let col = 1; col <= 7; col++) {
                    const cell = worksheet.getCell(row, col);
                    const border = {};
                    
                    if (col === 1) border.left = { style: 'thin' };
                    if (row === startRow) border.top = { style: 'thin' };
                    if (row === endRow) border.bottom = { style: 'medium' };
                    
                    cell.border = border;
                }
            }
            
            // Sağ taraf (H-J) - tam kenarlık
            for (let row = startRow; row <= endRow; row++) {
                for (let col = 8; col <= 10; col++) {
                    const cell = worksheet.getCell(row, col);
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: row === endRow ? { style: 'medium' } : { style: 'thin' }
                    };
                }
            }
        },

        // Excel'den içe aktar (mevcut kod korunuyor)
        importFromExcel: async function() {
            try {
                const result = await ipcRenderer.invoke('open-excel-dialog');
                if (result.canceled) return;
                
                const filePath = result.filePaths[0];
                
                const workbook = new ExcelJS.Workbook();
                await workbook.xlsx.readFile(filePath);
                
                const worksheet = workbook.getWorksheet(1);
                if (!worksheet) {
                    this.showNotification('Excel dosyası okunamadı!', 'error');
                    return;
                }
                
                // Proje bilgilerini oku
                const projectInfo = {
                    projeAdi: worksheet.getCell('G1').value || '',
                    siparisNo: worksheet.getCell('J2').value || '',
                    resimAciklamasi: worksheet.getCell('G3').value || '',
                    resimNo: worksheet.getCell('G5').value || '',
                    revizyonNo: worksheet.getCell('J5').value || ''
                };
                
                TableManager.loadProjectInfo(projectInfo);
                
                // Tablo verilerini oku
                const tableData = [];
                let rowIndex = 8;
                
                // Boş satıra veya özet bölümüne kadar oku
                while (rowIndex <= worksheet.rowCount) {
                    const pNo = worksheet.getCell(rowIndex, 1).value;
                    
                    // Boş satır veya özet başlığı kontrolü
                    if (!pNo || worksheet.getCell(rowIndex, 8).value === 'ÖZET RAPORU') {
                        break;
                    }
                    
                    const row = {
                        pNo: pNo,
                        adet: worksheet.getCell(rowIndex, 2).value || 1,
                        malzemeTuru: worksheet.getCell(rowIndex, 3).value || '',
                        malzemeCinsi: worksheet.getCell(rowIndex, 4).value || '',
                        olculer: worksheet.getCell(rowIndex, 5).value || '',
                        enNormu: worksheet.getCell(rowIndex, 6).value || '',
                        suHacmi: worksheet.getCell(rowIndex, 7).value || '-',
                        birimAgirlik: worksheet.getCell(rowIndex, 8).value || 0,
                        toplamAgirlik: worksheet.getCell(rowIndex, 9).value || 0,
                        heatNo: worksheet.getCell(rowIndex, 10).value || '-',
                        originalType: (worksheet.getCell(rowIndex, 3).value || '').toString().toLowerCase(),
                        originalGrade: (worksheet.getCell(rowIndex, 4).value || '').toString()
                    };
                    
                    // Özel malzeme türlerini kontrol et
                    this.checkSpecialMaterialTypes(row);
                    
                    tableData.push(row);
                    rowIndex++;
                }
                
                if (tableData.length > 0) {
                    TableManager.loadTableData(tableData);
                    this.showNotification('Excel dosyası başarıyla yüklendi!', 'success');
                } else {
                    this.showNotification('Excel dosyasında veri bulunamadı!', 'warning');
                }
                
            } catch (error) {
                console.error('Excel import hatası:', error);
                this.showNotification('Excel dosyası yüklenemedi: ' + error.message, 'error');
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
                row.originalType = 'flans';
                
                if (row.malzemeTuru.includes('Düz')) {
                    row.flansTipi = 'duzFlans';
                } else if (row.malzemeTuru.includes('Kaynak Boyunlu')) {
                    row.flansTipi = 'kaynakBoyunluFlans';
                } else if (row.malzemeTuru.includes('Kör')) {
                    row.flansTipi = 'korFlans';
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