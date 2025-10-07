/**
 * Excel Manager - Yeni Modüler Sistem için Güncellenmiş
 */

(function(window) {
    'use strict';
    
    const ExcelJS = require('exceljs');
    const { ipcRenderer } = require('electron');
    const fs = require('fs');
    const path = require('path');
    
    const ExcelManager = {
        // Sayfa yapısı için sabitler
        PAGE_CONSTANTS: {
            HEADER_ROWS: 7,
            MAX_ROWS_PER_PAGE: 45,
            SUMMARY_ROWS: 7,
            DATA_START_ROW: 8
        },

        // Mevcut dili al
        getCurrentLanguage: function() {
            const langSelect = document.getElementById('languageSelect');
            return langSelect ? langSelect.value : 'tr';
        },

        // Dil bazlı metinleri al
        getTexts: function() {
            const lang = this.getCurrentLanguage();
            
            const texts = {
                tr: {
                    'project_name': 'Proje:',
                    'order_no': 'Sipariş No:',
                    'drawing_description': 'Resim Açıklaması:',
                    'revision_no': 'Revizyon No:',
                    'drawing_no': 'Resim No:',
                    'part_no': 'P.No',
                    'quantity': 'Adet',
                    'material_type_col': 'Malzeme\nTürü',
                    'material_grade_col': 'Malzeme\nCinsi',
                    'dimensions': 'Ölçüler',
                    'standard': 'Standart',
                    'water_volume': 'Su Hacmi\n(L)',
                    'unit_weight': 'Birim Ağırlık\n(kg)',
                    'total_weight_col': 'Toplam Ağırlık\n(kg)',
                    'description_heat_col': 'Açıklama\nHeat No',
                    'notes': 'Notlar:',
                    'revisions': 'Revizyonlar:',
                    'summary_report': 'ÖZET RAPORU',
                    'total_parts': 'TOPLAM PARÇA SAYISI',
                    'total_weight': 'GENEL TOPLAM AĞIRLIK',
                    'water_volume_result': 'GENEL TOPLAM SU HACMİ',
                    'report_date': 'RAPOR TARİHİ',
                    'prepared_by': 'HAZIRLAYAN',
                    'controlled_by': 'KONTROL'
                },
                en: {
                    'project_name': 'Project:',
                    'order_no': 'Order No:',
                    'drawing_description': 'Drawing Description:',
                    'revision_no': 'Revision No:',
                    'drawing_no': 'Drawing No:',
                    'part_no': 'P.No',
                    'quantity': 'Quantity',
                    'material_type_col': 'Material\nType',
                    'material_grade_col': 'Material\nGrade',
                    'dimensions': 'Dimensions',
                    'standard': 'Standard',
                    'water_volume': 'Water Volume\n(L)',
                    'unit_weight': 'Unit Weight\n(kg)',
                    'total_weight_col': 'Total Weight\n(kg)',
                    'description_heat_col': 'Description\nHeat No',
                    'notes': 'Notes:',
                    'revisions': 'Revisions:',
                    'summary_report': 'SUMMARY REPORT',
                    'total_parts': 'TOTAL PARTS COUNT',
                    'total_weight': 'GENERAL TOTAL WEIGHT',
                    'water_volume_result': 'GENERAL TOTAL WATER VOLUME',
                    'report_date': 'REPORT DATE',
                    'prepared_by': 'PREPARED BY',
                    'controlled_by': 'CONTROLLED BY'
                }
            };
            
            return texts[lang];
        },

        // Excel'e dışa aktar
        exportToExcel: async function() {
            const tableData = window.TableManager?.getTableData();
            
            if (!tableData || tableData.length === 0) {
                this.showNotification('Kaydedilecek veri bulunmamaktadır!', 'warning');
                return;
            }
            
            try {
                const projectInfo = window.TableManager.getProjectInfo();
                const notlarRevizyon = window.TableManager.getNotesRevisions();
                
                // Dosya adı oluştur
                const siparisNo = projectInfo.siparisNo || '';
                const resimAciklamasi = projectInfo.resimAciklamasi || '';
                const tarih = new Date().toLocaleDateString('tr-TR').replace(/\./g, '_');
                
                const dosyaAdi = `${siparisNo}_${resimAciklamasi}_${tarih}`
                    .replace(/[<>:"/\\|?*]/g, '')
                    .replace(/\s+/g, ' ')
                    .trim();
                
                const result = await ipcRenderer.invoke('save-excel-dialog', {
                    siparisNo: siparisNo,
                    resimAciklamasi: resimAciklamasi,
                    dosyaAdi: dosyaAdi
                });
                
                if (result.canceled) return;
                
                const filePath = result.filePath;
                const workbook = new ExcelJS.Workbook();
                workbook.creator = 'TETA Kazan';
                workbook.created = new Date();

                // Özel malzeme verilerini gizli sayfaya kaydet
                this.saveCustomMaterialsToHiddenSheet(workbook);
                
                // Ana worksheet oluştur
                const worksheet = workbook.addWorksheet('Sheet1', {
                    pageSetup: {
                        paperSize: 9,
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
                        }
                    },
                    headerFooter: {
                        differentFirst: false,
                        differentOddEven: false,
                        oddFooter: `&R${projectInfo.resimNo || ''} / Sayfa &P of &N`,
                        evenFooter: `&R${projectInfo.resimNo || ''} / Sayfa &P of &N`
                    }
                });
                
                worksheet.properties.defaultRowHeight = 15;
                
                this.setupColumnWidths(worksheet);
                this.createHeaderSection(worksheet, projectInfo);
                const dataEndRow = this.addDataWithPaging(worksheet, tableData);
                this.addSummarySection(worksheet, tableData, dataEndRow, projectInfo, notlarRevizyon);
                
                await workbook.xlsx.writeFile(filePath);
                this.showNotification('Excel dosyası başarıyla kaydedildi!', 'success');

                // KEYBOARD RESET EKLE
                requestAnimationFrame(() => {
                    if (window.EventManager) {
                        window.EventManager.forceActivateAll();
                    }
                    if (window.TableManager) {
                        window.TableManager.forceKeyboardReset();
                    }
                });
                
            } catch (error) {
                console.error('Excel export hatası:', error);
                this.showNotification('Excel dosyası kaydedilemedi: ' + error.message, 'error');
            }
        },

        // Özel malzeme verilerini kaydet
        saveCustomMaterialsToHiddenSheet: function(workbook) {
            // Şimdilik özel malzemeler için veri yok
            // İleride özel malzeme sistemi eklenirse burası güncellenecek
        },

        // Sütun genişliklerini ayarla
        setupColumnWidths: function(worksheet) {
            worksheet.getColumn(1).width = 5.7109375;
            worksheet.getColumn(2).width = 7.140625;
            worksheet.getColumn(3).width = 22.85546875;
            worksheet.getColumn(4).width = 12.85546875;
            worksheet.getColumn(5).width = 20.7109375;
            worksheet.getColumn(6).width = 15;
            worksheet.getColumn(7).width = 9.28515625;
            worksheet.getColumn(8).width = 12.140625;
            worksheet.getColumn(9).width = 13.5703125;
            worksheet.getColumn(10).width = 15.5703125;
        },

        // Başlık bölümünü oluştur
        createHeaderSection: function(worksheet, projectInfo) {
            const texts = this.getTexts();
            
            // Satır yükseklikleri
            worksheet.getRow(1).height = 15;
            worksheet.getRow(2).height = 15.75;
            worksheet.getRow(3).height = 15.75;
            worksheet.getRow(4).height = 15.75;
            worksheet.getRow(5).height = 15;
            worksheet.getRow(6).height = 15.75;
            worksheet.getRow(7).height = 31.5;
            
            // Hücre birleştirmeleri
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
            
            // Proje bilgilerini ekle
            this.addProjectInfo(worksheet, projectInfo, texts);
            
            // Üst kısım kenarlıkları
            this.addHeaderBorders(worksheet);
            
            // Tablo başlıklarını ekle
            this.addTableHeaders(worksheet, texts);
        },

        // Logo ekleme
        addLogo: function(worksheet) {
            try {
                let logoPath = null;
                const logoFileNames = ['LOGO.png', 'logo.png', 'Logo.png', 'LOGO.PNG'];
                
                // Daha kapsamlı yol araması
                const possibleBasePaths = [
                    path.join(__dirname, '../assets'),
                    path.join(__dirname, '../../assets'),
                    path.join(__dirname, '../../../assets'),
                    path.join(process.cwd(), 'assets'),
                    path.join(process.cwd(), 'src/assets'),
                    path.join(process.execPath, '../assets'),
                    path.join(process.execPath, '../../assets'),
                    // Electron paketlenmiş uygulama yolları
                    path.join(process.resourcesPath, 'app.asar.unpacked', 'assets'),
                    path.join(process.resourcesPath, 'app', 'assets'),
                    path.join(process.resourcesPath, 'assets'),
                    // Development yolları
                    path.join(__dirname, '../../../malzeme 3.0.0/assets'),
                    path.join(__dirname, '../../../../assets'),
                    // Klasik Electron yolları
                    require('electron').app ? path.join(require('electron').app.getAppPath(), 'assets') : null
                ].filter(p => p !== null);
                
                console.log('Logo arama yolları:', possibleBasePaths);
                
                outerLoop:
                for (const basePath of possibleBasePaths) {
                    for (const fileName of logoFileNames) {
                        const fullPath = path.join(basePath, fileName);
                        if (fs.existsSync(fullPath)) {
                            logoPath = fullPath;
                            console.log('Logo bulundu:', logoPath);
                            break outerLoop;
                        }
                    }
                }
                
                if (logoPath) {
                    const imageBase64 = fs.readFileSync(logoPath, 'base64');
                    const workbook = worksheet.workbook;
                    const logoImage = workbook.addImage({
                        base64: imageBase64,
                        extension: 'png',
                    });
                    
                    worksheet.addImage(logoImage, {
                        tl: { col: 3.0, row: 0.15 },
                        ext: { width: 238, height: 115 },
                        editAs: 'oneCell'
                    });
                    
                    console.log('Logo başarıyla eklendi');
                } else {
                    console.warn('Logo dosyası bulunamadı');
                }
            } catch (error) {
                console.error('Logo ekleme hatası:', error);
            }
        },

        // Proje bilgilerini ekle
        addProjectInfo: function(worksheet, projectInfo, texts) {
            // Etiketler
            const labels = [
                { cell: 'F1', value: texts.project_name, size: 10 },
                { cell: 'J1', value: texts.order_no, size: 10 },
                { cell: 'F3', value: texts.drawing_description, size: 10 },
                { cell: 'J4', value: texts.revision_no, size: 10 },
                { cell: 'F5', value: texts.drawing_no, size: 10 }
            ];
            
            labels.forEach(label => {
                const cell = worksheet.getCell(label.cell);
                cell.value = label.value;
                cell.font = { name: 'Calibri', size: label.size, bold: false };
                cell.alignment = { horizontal: 'left', vertical: 'center' };
            });
            
            // Değerler
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
            
            // Resim açıklaması
            const resimAciklamasiCell = worksheet.getCell('G3');
            const resimAciklamasi = projectInfo.resimAciklamasi || '';
            resimAciklamasiCell.value = resimAciklamasi;
            
            let fontSize = 14;
            const textLength = resimAciklamasi.length;
            
            if (textLength > 40) fontSize = 11;
            else if (textLength > 30) fontSize = 12;
            else if (textLength > 20) fontSize = 13;
            
            resimAciklamasiCell.font = { name: 'Calibri', size: fontSize, bold: true };
            resimAciklamasiCell.alignment = { 
                horizontal: 'center', 
                vertical: 'center',
                wrapText: true,
                shrinkToFit: true
            };
        },

        // Başlık kenarlıkları ekle
        addHeaderBorders: function(worksheet) {
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
        addTableHeaders: function(worksheet, texts) {
            const headers = [
                texts.part_no,
                texts.quantity,
                texts.material_type_col,
                texts.material_grade_col,
                texts.dimensions,
                texts.standard,
                texts.water_volume,
                texts.unit_weight,
                texts.total_weight_col,
                texts.description_heat_col
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

        // Veri ekleme ve sayfalama
        addDataWithPaging: function(worksheet, tableData) {
            let currentRow = this.PAGE_CONSTANTS.DATA_START_ROW;
            const evenRowFill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFF2F2F2' }
            };
            
            const pageBreakRows = [];
            
            tableData.forEach((data, index) => {
                const dataRow = worksheet.getRow(currentRow);
                const isEvenRow = index % 2 === 0;
                
                dataRow.height = 18.75;
                this.addDataRow(dataRow, data, isEvenRow ? evenRowFill : null);
                
                if ((currentRow - this.PAGE_CONSTANTS.DATA_START_ROW + 1) % this.PAGE_CONSTANTS.MAX_ROWS_PER_PAGE === 0) {
                    pageBreakRows.push(currentRow);
                }
                
                currentRow++;
            });
            
            if (pageBreakRows.length > 0) {
                worksheet.pageSetup.rowBreaks = pageBreakRows;
            }
            
            // Son satırın alt kenarlığını kalın yap
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
            // Su hacmi değerini formatla
            let suHacmiValue = '-';
            if (data.suHacmi && data.suHacmi !== '-') {
                const numericValue = parseFloat(data.suHacmi);
                suHacmiValue = isNaN(numericValue) ? '-' : numericValue;
            }
            
            const cellData = [
                { col: 1, value: data.pNo, align: 'center' },
                { col: 2, value: parseInt(data.adet), align: 'center' },
                { col: 3, value: data.malzemeTuru, align: 'left' },
                { col: 4, value: data.malzemeCinsi, align: 'center' },
                { col: 5, value: data.olculer, align: 'left' },
                { col: 6, value: data.enNormu, align: 'left' },
                { col: 7, value: suHacmiValue === '-' ? '' : suHacmiValue, align: 'center', format: suHacmiValue !== '-' ? '#,##0.00' : null },
                { col: 8, value: parseFloat(data.birimAgirlik), align: 'right', format: '#,##0.00' },
                { col: 9, value: parseFloat(data.toplamAgirlik), align: 'right', format: '#,##0.00' },
                { col: 10, value: data.heatNo === '-' ? '' : data.heatNo, align: 'left' }
            ];
            
            const fontStyle = { name: 'Calibri', size: 11 };
            if (data.isRevision) {
                fontStyle.color = { argb: 'FFFF0000' };
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
        addSummarySection: function(worksheet, tableData, startRow, projectInfo, notlarRevizyon) {
            const summary = this.calculateSummary(tableData);
            const texts = this.getTexts();
            
            const summaryStartRow = startRow + 1;
            
            // Birleştirmeler
            worksheet.mergeCells(`A${summaryStartRow}:C${summaryStartRow}`);
            worksheet.mergeCells(`D${summaryStartRow}:G${summaryStartRow}`);
            worksheet.mergeCells(`H${summaryStartRow}:J${summaryStartRow}`);
            
            worksheet.mergeCells(`A${summaryStartRow + 1}:C${summaryStartRow + 7}`);
            worksheet.mergeCells(`D${summaryStartRow + 1}:G${summaryStartRow + 7}`);
            
            worksheet.mergeCells(`H${summaryStartRow + 1}:I${summaryStartRow + 1}`);
            worksheet.mergeCells(`H${summaryStartRow + 2}:I${summaryStartRow + 2}`);
            worksheet.mergeCells(`H${summaryStartRow + 3}:I${summaryStartRow + 3}`);
            worksheet.mergeCells(`H${summaryStartRow + 5}:I${summaryStartRow + 5}`);
            worksheet.mergeCells(`H${summaryStartRow + 6}:I${summaryStartRow + 6}`);
            worksheet.mergeCells(`H${summaryStartRow + 7}:I${summaryStartRow + 7}`);
            
            // Başlıklar
            const notlarBaslik = worksheet.getCell(`A${summaryStartRow}`);
            notlarBaslik.value = texts.notes;
            notlarBaslik.font = { name: 'Calibri', size: 11, bold: true };
            notlarBaslik.alignment = { horizontal: 'center', vertical: 'center' };
            
            const revizyonBaslik = worksheet.getCell(`D${summaryStartRow}`);
            revizyonBaslik.value = texts.revisions;
            revizyonBaslik.font = { name: 'Calibri', size: 11, bold: true };
            revizyonBaslik.alignment = { horizontal: 'center', vertical: 'center' };
            
            const ozetBaslik = worksheet.getCell(`H${summaryStartRow}`);
            ozetBaslik.value = texts.summary_report;
            ozetBaslik.font = { name: 'Calibri', size: 11, bold: true };
            ozetBaslik.alignment = { horizontal: 'center', vertical: 'center' };
            ozetBaslik.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFE0E0E0' }
            };
            
            // İçerikler
            const notlarIcerik = worksheet.getCell(`A${summaryStartRow + 1}`);
            notlarIcerik.value = notlarRevizyon.notlar || '';
            notlarIcerik.font = { name: 'Calibri', size: 10, bold: false };
            notlarIcerik.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
            
            const revizyonIcerik = worksheet.getCell(`D${summaryStartRow + 1}`);
            revizyonIcerik.value = notlarRevizyon.revizyonlar || '';
            revizyonIcerik.font = { 
                name: 'Calibri', 
                size: 10, 
                bold: false,
                color: { argb: 'FFFF0000' }
            };
            revizyonIcerik.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
            
            // Özet bilgileri
            const summaryData = [
                { cell: `H${summaryStartRow + 1}`, value: texts.total_parts, bold: false },
                { cell: `H${summaryStartRow + 2}`, value: texts.total_weight, bold: false },
                { cell: `H${summaryStartRow + 3}`, value: texts.water_volume_result, bold: false },
                { cell: `H${summaryStartRow + 5}`, value: texts.report_date, bold: false },
                { cell: `H${summaryStartRow + 6}`, value: texts.prepared_by, bold: false },
                { cell: `H${summaryStartRow + 7}`, value: texts.controlled_by, bold: false }
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
            
            this.addSummaryBorders(worksheet, summaryStartRow, summaryStartRow + 7);
            
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
                
                let worksheet = workbook.getWorksheet('Sheet1');
                if (!worksheet) {
                    workbook.eachSheet((sheet, id) => {
                        if (sheet.name !== 'CustomMaterials' && !worksheet) {
                            worksheet = sheet;
                        }
                    });
                }
                
                if (!worksheet) {
                    this.showNotification('Ana veri sayfası bulunamadı!', 'error');
                    return;
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
                
                // Tablo verilerini oku
                const tableData = this.readTableDataFromWorksheet(worksheet);
                
                // Özet bölümünü oku
                const { notlar, revizyonlar, hazirlayan, kontrol } = this.readSummaryFromWorksheet(worksheet, tableData.length);
                projectInfo.hazirlayan = hazirlayan;
                projectInfo.kontrol = kontrol;
                
                // Verileri yükle
                window.TableManager?.loadProjectInfo(projectInfo);
                window.TableManager?.loadNotesRevisions({ notlar, revizyonlar });
                
                if (tableData.length > 0) {
                    window.TableManager?.loadTableData(tableData);
                    this.showNotification(`Excel dosyası yüklendi (${tableData.length} satır)`, 'success');
                    
                    // KEYBOARD RESET EKLE
                    requestAnimationFrame(() => {
                        if (window.EventManager) {
                            window.EventManager.forceActivateAll();
                        }
                        if (window.TableManager) {
                            window.TableManager.forceKeyboardReset();
                        }
                    });
                } else {
                    this.showNotification('Excel dosyasında veri bulunamadı!', 'warning');
                }
                
            } catch (error) {
                console.error('Excel import hatası:', error);
                this.showNotification('Excel yükleme hatası: ' + error.message, 'error');
            }
        },

        // Tablo verilerini worksheet'ten oku
        readTableDataFromWorksheet: function(worksheet) {
            const tableData = [];
            let currentRow = 8;
            let emptyRowCount = 0;
            const maxRows = worksheet.actualRowCount || worksheet.rowCount || 1000;
            
            while (currentRow <= maxRows) {
                const pNoValue = worksheet.getCell(currentRow, 1).value;
                
                if (!pNoValue) {
                    emptyRowCount++;
                    if (emptyRowCount >= 2) break;
                    currentRow++;
                    continue;
                }
                
                if (typeof pNoValue === 'string' && isNaN(parseInt(pNoValue))) {
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
                    isRevision: false
                };

                // Revizyon durumunu kontrol et
                const firstCell = worksheet.getCell(currentRow, 1);
                if (firstCell.font && firstCell.font.color && firstCell.font.color.argb === 'FFFF0000') {
                    rowData.isRevision = true;
                }
                
                // Malzeme türünü belirle
                this.determineMaterialType(rowData);
                
                tableData.push(rowData);
                currentRow++;
            }
            
            return tableData;
        },

        // Malzeme türünü belirle
        determineMaterialType: function(rowData) {
            const malzemeTuruLower = rowData.malzemeTuru.toString().toLowerCase();
            const malzemeTuruOriginal = rowData.malzemeTuru.toString();
            
            // ÖNCELİKLE: Özel Flanş kontrolü - isOzelFlans marker'ına bak
            if (rowData.isOzelFlans === true) {
                rowData.originalType = 'ozelFlans';
                return;
            }
            
            // VEYA: flansDetay varsa ve içinde disCap varsa (özel flanş özellikleri)
            if (rowData.flansDetay && rowData.flansDetay.disCap !== undefined) {
                rowData.originalType = 'ozelFlans';
                return;
            }
            
            // ÖNCELİKLE: Izgara elemanı kontrolü - parça adlarına göre
            if (window.MaterialRegistry && window.MaterialRegistry.has('izgara')) {
                const MaterialClass = window.MaterialRegistry.get('izgara');
                const instance = new MaterialClass();
                
                // Izgara elemanları listesinde var mı kontrol et
                if (instance.izgaraElemanlari && instance.izgaraElemanlari[malzemeTuruOriginal]) {
                    rowData.originalType = 'izgara';
                    rowData.izgaraTipi = malzemeTuruOriginal;
                    rowData.izgaraKategori = 'element';
                    return;
                }
            }
            
            // Normal Flanş kontrolü - flansTipi field'ına bak (duz, kaynak_boyunlu, kor)
            if (rowData.flansTipi && ['duz', 'kaynak_boyunlu', 'kor'].includes(rowData.flansTipi)) {
                rowData.originalType = 'flans';
                return;
            }
            
            // Flanş tipleri - malzeme türünde flanş tipi adı varsa
            const flansTipleri = ['düz flanş', 'kaynak boyunlu', 'kör flanş', 'slip-on', 'weld neck', 'blind'];
            for (const tip of flansTipleri) {
                if (malzemeTuruLower.includes(tip)) {
                    // flansDetay içinde tipi varsa normal flanş
                    if (rowData.flansDetay && rowData.flansDetay.tipi) {
                        rowData.originalType = 'flans';
                    } else {
                        // Diğer durumlarda da normal flanş
                        rowData.originalType = 'flans';
                    }
                    return;
                }
            }
            
            // Kutu Profil - hem "kutu" hem "profil" kelimelerini ara
            if ((malzemeTuruLower.includes('kutu') && malzemeTuruLower.includes('profil')) || 
                malzemeTuruLower.includes('box profile')) {
                rowData.originalType = 'kutu';
                return;
            }
            
            // MaterialRegistry'den kontrol et
            if (window.MaterialRegistry) {
                const materialTypes = window.MaterialRegistry.getAll();
                
                for (const type of materialTypes) {
                    const MaterialClass = window.MaterialRegistry.get(type);
                    const instance = new MaterialClass();
                    const displayName = instance.getDisplayName().toLowerCase();
                    
                    if (malzemeTuruLower.includes(displayName)) {
                        rowData.originalType = type;
                        return;
                    }
                }
            }
            
            // Varsayılan eşleştirmeler - daha spesifik kontroller
            if (malzemeTuruLower.includes('sac') || malzemeTuruLower.includes('sheet')) {
                rowData.originalType = 'sac';
            } else if (malzemeTuruLower.includes('lama') || malzemeTuruLower.includes('plate') || malzemeTuruLower.includes('flat')) {
                rowData.originalType = 'lama';
            } else if (malzemeTuruLower.includes('boru') || malzemeTuruLower.includes('pipe')) {
                rowData.originalType = 'boru';
            } else if (malzemeTuruLower.includes('köşebent') || malzemeTuruLower.includes('angle')) {
                rowData.originalType = 'kosebent';
            } else if (malzemeTuruLower.includes('kutu')) {
                rowData.originalType = 'kutu';
            } else if (malzemeTuruLower.includes('mil') || malzemeTuruLower.includes('shaft') || malzemeTuruLower.includes('round')) {
                rowData.originalType = 'mil';
            } else if (malzemeTuruLower.includes('dirsek') || malzemeTuruLower.includes('elbow')) {
                rowData.originalType = 'dirsek';
            } else if (malzemeTuruLower.includes('ızgara') || malzemeTuruLower.includes('grate') || malzemeTuruLower.includes('grating')) {
                rowData.originalType = 'izgara';
                rowData.izgaraKategori = 'element';
            } else if (malzemeTuruLower.includes('ipe') || malzemeTuruLower.includes('hea') || 
                    malzemeTuruLower.includes('heb') || malzemeTuruLower.includes('npu') || 
                    malzemeTuruLower.includes('npi')) {
                rowData.originalType = 'profil';
                
                // Profil tipini belirle
                if (malzemeTuruLower.includes('ipe')) rowData.profilTipi = 'IPE';
                else if (malzemeTuruLower.includes('hea')) rowData.profilTipi = 'HEA';
                else if (malzemeTuruLower.includes('heb')) rowData.profilTipi = 'HEB';
                else if (malzemeTuruLower.includes('npu')) rowData.profilTipi = 'NPU';
                else if (malzemeTuruLower.includes('npi')) rowData.profilTipi = 'NPI';
            } else {
                rowData.originalType = 'ozelMalzeme';
            }
        },

        // Özet bölümünü worksheet'ten oku
        readSummaryFromWorksheet: function(worksheet, dataRowCount) {
            const summaryStartRow = 8 + dataRowCount + 1;
            
            let notlar = '';
            let revizyonlar = '';
            let hazirlayan = '';
            let kontrol = '';

            try {
                const notlarIcerik = worksheet.getCell(summaryStartRow + 1, 1).value;
                if (notlarIcerik) notlar = notlarIcerik.toString();

                const revizyonIcerik = worksheet.getCell(summaryStartRow + 1, 4).value;
                if (revizyonIcerik) revizyonlar = revizyonIcerik.toString();

                const hazirlayanDeger = worksheet.getCell(summaryStartRow + 6, 10).value;
                if (hazirlayanDeger) hazirlayan = hazirlayanDeger.toString().trim();

                const kontrolDeger = worksheet.getCell(summaryStartRow + 7, 10).value;
                if (kontrolDeger) kontrol = kontrolDeger.toString().trim();
                
            } catch (error) {
                console.error('Özet bölümü okuma hatası:', error);
            }

            return { notlar, revizyonlar, hazirlayan, kontrol };
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

        // Filtrelenmiş veri için Excel export
        exportFilteredToExcel: async function(filteredData, filterType) {
            if (!filteredData || filteredData.length === 0) {
                this.showNotification('Filtrelenmiş veri bulunamadı!', 'warning');
                return;
            }
            
            try {
                const projectInfo = window.TableManager?.getProjectInfo();
                const tarih = new Date().toLocaleDateString('tr-TR').replace(/\./g, '_');
                const dosyaAdi = `${filterType}_${tarih}`.replace(/[<>:"/\\|?*]/g, '').replace(/\s+/g, '_');
                
                const result = await ipcRenderer.invoke('save-excel-dialog', {
                    dosyaAdi: dosyaAdi
                });
                
                if (result.canceled) return;
                
                const filePath = result.filePath;
                const workbook = new ExcelJS.Workbook();
                workbook.creator = 'TETA Kazan';
                workbook.created = new Date();
                
                const worksheet = workbook.addWorksheet('Filtrelenmiş Liste');
                
                this.setupColumnWidths(worksheet);
                this.createFilteredHeaderSection(worksheet, projectInfo, filterType);
                const dataEndRow = this.addDataWithPaging(worksheet, filteredData);
                
                // Filtrelenmiş özet
                const filteredSummary = this.calculateSummary(filteredData);
                const summaryData = {
                    notlar: `Filtre: ${filterType}`,
                    revizyonlar: ''
                };
                this.addSummarySection(worksheet, filteredData, dataEndRow, projectInfo, summaryData);
                
                await workbook.xlsx.writeFile(filePath);
                this.showNotification('Filtrelenmiş Excel dosyası kaydedildi!', 'success');
                
            } catch (error) {
                console.error('Filtrelenmiş Excel export hatası:', error);
                this.showNotification('Excel dosyası kaydedilemedi: ' + error.message, 'error');
            }
        },

        // Filtrelenmiş başlık bölümü
        createFilteredHeaderSection: function(worksheet, projectInfo, filterType) {
            const texts = this.getTexts();
            
            // Normal başlık oluştur
            this.createHeaderSection(worksheet, projectInfo);
            
            // Resim açıklaması yerine filtre bilgisini koy
            const filterCell = worksheet.getCell('G3');
            filterCell.value = `Filtre: ${filterType}`;
            filterCell.font = { name: 'Calibri', size: 14, bold: true, color: { argb: 'FF0000FF' } };
            filterCell.alignment = { horizontal: 'center', vertical: 'center', wrapText: true };
        },

        // Bildirim göster
        showNotification: function(message, type = 'info') {
            if (window.UIManager?.showNotification) {
                window.UIManager.showNotification(message, type);
            } else {
                console.log(`[${type.toUpperCase()}] ${message}`);
            }
        }
    };

    // Modülü window objesine bağla
    window.ExcelManager = ExcelManager;

})(window);