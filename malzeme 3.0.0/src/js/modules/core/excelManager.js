// Excel İşlemleri Modülü - Modüler Sistem için Güncellenmiş
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

        // Excel'e dışa aktar
        exportToExcel: async function() {
            const tableData = window.TableManager.getTableData();
            
            if (tableData.length === 0) {
                this.showNotification('Kaydedilecek veri bulunmamaktadır!', 'warning');
                return;
            }
            
            try {
                const projectInfo = window.TableManager.getProjectInfo();
                const notlarRevizyon = window.TableManager.getNotesRevisions();
                
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
                this.addSummarySection(worksheet, tableData, dataEndRow);
                
                await workbook.xlsx.writeFile(filePath);
                this.showNotification('Excel dosyası başarıyla kaydedildi!', 'success');
                
            } catch (error) {
                console.error('Excel export hatası:', error);
                this.showNotification('Excel dosyası kaydedilemedi: ' + error.message, 'error');
            }
        },

        // Özel malzeme verilerini gizli sayfaya kaydet
        saveCustomMaterialsToHiddenSheet: function(workbook) {
            if (!window.MaterialRegistry) return;

            const customData = [];
            
            // Tüm malzeme türlerinin özel verilerini topla
            const materialTypes = window.MaterialRegistry.getAll();
            materialTypes.forEach(materialType => {
                const MaterialClass = window.MaterialRegistry.get(materialType);
                const instance = new MaterialClass();
                
                // Malzeme türünün özel verilerini al (varsa)
                if (typeof instance.getCustomData === 'function') {
                    const data = instance.getCustomData();
                    if (data && Object.keys(data).length > 0) {
                        customData.push({
                            type: materialType,
                            data: JSON.stringify(data)
                        });
                    }
                }
            });

            if (customData.length > 0) {
                const hiddenSheet = workbook.addWorksheet('CustomMaterials');
                hiddenSheet.state = 'veryHidden';
                
                hiddenSheet.getRow(1).values = ['Type', 'Data'];
                
                customData.forEach((item, index) => {
                    hiddenSheet.getRow(index + 2).values = [item.type, item.data];
                });
            }
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
            worksheet.getRow(1).height = 15;
            worksheet.getRow(2).height = 15.75;
            worksheet.getRow(3).height = 15.75;
            worksheet.getRow(4).height = 15.75;
            worksheet.getRow(5).height = 15;
            worksheet.getRow(6).height = 15.75;
            worksheet.getRow(7).height = 31.5;
            
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
            
            const addressCell = worksheet.getCell('A1');
            addressCell.value = 'Şair Nedim Caddesi\nHacı Halitbey Sokak No:7\nBeşiktaş - İSTANBUL\nTel: +90 212 236 25 57\nFax: +90 212 236 25 61\nE-Mail: teta@tetakazan.com.tr';
            addressCell.font = { name: 'Calibri', size: 11, bold: false };
            addressCell.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
            
            this.addLogo(worksheet);
            this.addProjectInfo(worksheet, projectInfo);
            this.addHeaderBorders(worksheet);
            this.addTableHeaders(worksheet);
        },

        // Logo ekleme
        addLogo: function(worksheet) {
            try {
                const logoPath = this.findLogoPath();
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
                }
            } catch (error) {
                console.error('Logo ekleme hatası:', error);
            }
        },

        // Logo dosya yolunu bul
        findLogoPath: function() {
            const logoFileNames = ['LOGO.png', 'logo.png', 'Logo.png'];
            const possibleBasePaths = [
                path.join(__dirname, '../../assets'),
                path.join(__dirname, '../../../src/assets'),
                path.join(process.cwd(), 'src/assets'),
                path.join(process.resourcesPath, 'app.asar.unpacked', 'src', 'assets'),
                path.join(process.resourcesPath, 'app', 'src', 'assets'),
                path.join(process.resourcesPath, 'assets'),
                path.join(path.dirname(process.execPath), 'resources', 'assets'),
                path.join(path.dirname(process.execPath), 'src', 'assets')
            ];
            
            for (const basePath of possibleBasePaths) {
                for (const fileName of logoFileNames) {
                    const fullPath = path.join(basePath, fileName);
                    if (fs.existsSync(fullPath)) {
                        return fullPath;
                    }
                }
            }
            
            return null;
        },

        // Proje bilgilerini ekle
        addProjectInfo: function(worksheet, projectInfo) {
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
            
            const resimAciklamasiCell = worksheet.getCell('G3');
            const resimAciklamasi = projectInfo.resimAciklamasi || '';
            resimAciklamasiCell.value = resimAciklamasi;
            
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
        addTableHeaders: function(worksheet) {
            const headers = [
                'P.No',
                'Adet',
                'Malzeme\nTürü',
                'Malzeme\nCinsi',
                'Ölçüler',
                'Standart',
                'Su Hacmi\n(L)',
                'Birim Ağırlık\n(kg)',
                'Toplam Ağırlık\n(kg)',
                'Açıklama\nHeat No'
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
        addSummarySection: function(worksheet, tableData, startRow) {
            const summary = this.calculateSummary(tableData);
            const projectInfo = window.TableManager.getProjectInfo();
            const notlarRevizyon = window.TableManager.getNotesRevisions();
            
            const summaryStartRow = startRow + 1;
            
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
            
            const notlarBaslikCell = worksheet.getCell(`A${summaryStartRow}`);
            notlarBaslikCell.value = 'Notlar:';
            notlarBaslikCell.font = { name: 'Calibri', size: 11, bold: true };
            notlarBaslikCell.alignment = { horizontal: 'center', vertical: 'center' };
            
            const revizyonBaslikCell = worksheet.getCell(`D${summaryStartRow}`);
            revizyonBaslikCell.value = 'Revizyonlar:';
            revizyonBaslikCell.font = { name: 'Calibri', size: 11, bold: true };
            revizyonBaslikCell.alignment = { horizontal: 'center', vertical: 'center' };
            
            const ozetRaporuCell = worksheet.getCell(`H${summaryStartRow}`);
            ozetRaporuCell.value = 'ÖZET RAPORU';
            ozetRaporuCell.font = { name: 'Calibri', size: 11, bold: true };
            ozetRaporuCell.alignment = { horizontal: 'center', vertical: 'center' };
            ozetRaporuCell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFE0E0E0' }
            };
            
            const notlarIcerikCell = worksheet.getCell(`A${summaryStartRow + 1}`);
            notlarIcerikCell.value = notlarRevizyon.notlar || '';
            notlarIcerikCell.font = { name: 'Calibri', size: 10, bold: false };
            notlarIcerikCell.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
            
            const revizyonIcerikCell = worksheet.getCell(`D${summaryStartRow + 1}`);
            revizyonIcerikCell.value = notlarRevizyon.revizyonlar || '';
            revizyonIcerikCell.font = { 
                name: 'Calibri', 
                size: 10, 
                bold: false,
                color: { argb: 'FFFF0000' }
            };
            revizyonIcerikCell.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
            
            const summaryData = [
                { cell: `H${summaryStartRow + 1}`, value: 'TOPLAM PARÇA SAYISI', bold: false },
                { cell: `H${summaryStartRow + 2}`, value: 'GENEL TOPLAM AĞIRLIK', bold: false },
                { cell: `H${summaryStartRow + 3}`, value: 'GENEL TOPLAM SU HACMİ', bold: false },
                { cell: `H${summaryStartRow + 5}`, value: 'RAPOR TARİHİ', bold: false },
                { cell: `H${summaryStartRow + 6}`, value: 'HAZIRLAYAN', bold: false },
                { cell: `H${summaryStartRow + 7}`, value: 'KONTROL', bold: false }
            ];
            
            summaryData.forEach(item => {
                const cell = worksheet.getCell(item.cell);
                cell.value = item.value;
                cell.font = { name: 'Calibri', size: 11, bold: item.bold };
                cell.alignment = { horizontal: 'center', vertical: 'center' };
            });
            
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

                // Özel malzeme verilerini yükle
                this.loadCustomMaterialsFromHiddenSheet(workbook);
                
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
                window.TableManager.loadProjectInfo(projectInfo);
                window.TableManager.loadNotesRevisions({ notlar, revizyonlar });
                
                if (tableData.length > 0) {
                    window.TableManager.loadTableData(tableData);
                    this.showNotification(`Excel dosyası yüklendi (${tableData.length} satır)`, 'success');
                } else {
                    this.showNotification('Excel dosyasında veri bulunamadı!', 'warning');
                }
                
            } catch (error) {
                console.error('Excel import hatası:', error);
                this.showNotification('Excel yükleme hatası: ' + error.message, 'error');
            }
        },

        // Özel malzeme verilerini gizli sayfadan yükle
        loadCustomMaterialsFromHiddenSheet: function(workbook) {
            const hiddenSheet = workbook.getWorksheet('CustomMaterials');
            if (!hiddenSheet) return;

            try {
                hiddenSheet.eachRow((row, rowNumber) => {
                    if (rowNumber === 1) return;
                    
                    const materialType = row.getCell(1).value;
                    const data = row.getCell(2).value;
                    
                    if (materialType && data && window.MaterialRegistry && window.MaterialRegistry.has(materialType)) {
                        const MaterialClass = window.MaterialRegistry.get(materialType);
                        const instance = new MaterialClass();
                        
                        if (typeof instance.loadCustomData === 'function') {
                            try {
                                const parsedData = JSON.parse(data);
                                instance.loadCustomData(parsedData);
                            } catch (error) {
                                console.error(`${materialType} özel verisi yüklenemedi:`, error);
                            }
                        }
                    }
                });
            } catch (error) {
                console.error('Özel malzeme verisi yükleme hatası:', error);
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
            
            // MaterialRegistry'den tüm malzeme türlerini al ve eşleştir
            if (window.MaterialRegistry) {
                const materialTypes = window.MaterialRegistry.getAll();
                
                for (const materialType of materialTypes) {
                    const MaterialClass = window.MaterialRegistry.get(materialType);
                    const instance = new MaterialClass();
                    
                    // Malzeme türünün çevirilerini al
                    const texts = instance.getTexts();
                    const displayNames = [
                        texts.tr?.display_name,
                        texts.en?.display_name,
                        instance.getDisplayName()
                    ].filter(name => name);
                    
                    // Eşleşme kontrol et
                    if (displayNames.some(name => 
                        name && malzemeTuruLower.includes(name.toLowerCase())
                    )) {
                        rowData.originalType = materialType;
                        return;
                    }
                }
            }
            
            // Varsayılan eşleştirme
            if (malzemeTuruLower.includes('sac')) rowData.originalType = 'sac';
            else if (malzemeTuruLower.includes('lama')) rowData.originalType = 'lama';
            else if (malzemeTuruLower.includes('boru')) rowData.originalType = 'boru';
            else if (malzemeTuruLower.includes('köşebent')) rowData.originalType = 'kosebent';
            else if (malzemeTuruLower.includes('kutu')) rowData.originalType = 'kutu';
            else if (malzemeTuruLower.includes('mil')) rowData.originalType = 'mil';
            else if (malzemeTuruLower.includes('ipe')) rowData.originalType = 'profil';
            else if (malzemeTuruLower.includes('hea')) rowData.originalType = 'profil';
            else if (malzemeTuruLower.includes('heb')) rowData.originalType = 'profil';
            else if (malzemeTuruLower.includes('npu')) rowData.originalType = 'profil';
            else if (malzemeTuruLower.includes('npi')) rowData.originalType = 'profil';
            else if (malzemeTuruLower.includes('flanş')) {
                if (malzemeTuruLower.includes('asme')) rowData.originalType = 'flansAsme';
                else if (malzemeTuruLower.includes('özel')) rowData.originalType = 'ozelFlans';
                else rowData.originalType = 'flans';
            }
            else if (malzemeTuruLower.includes('dirsek')) rowData.originalType = 'dirsek';
            else if (malzemeTuruLower.includes('ızgara')) rowData.originalType = 'izgara';
            else rowData.originalType = 'ozelMalzeme';
        },

        // Özet bölümünü worksheet'ten oku
        readSummaryFromWorksheet: function(worksheet, dataRowCount) {
            const summaryStartRow = 8 + dataRowCount + 1;
            
            let notlar = '';
            let revizyonlar = '';
            let hazirlayan = '';
            let kontrol = '';

            try {
                const notlarIcerikCell = worksheet.getCell(summaryStartRow + 1, 1).value;
                if (notlarIcerikCell) {
                    notlar = notlarIcerikCell.toString();
                }

                const revizyonIcerikCell = worksheet.getCell(summaryStartRow + 1, 4).value;
                if (revizyonIcerikCell) {
                    revizyonlar = revizyonIcerikCell.toString();
                }

                const hazirlayanDeger = worksheet.getCell(summaryStartRow + 6, 10).value;
                if (hazirlayanDeger) {
                    hazirlayan = hazirlayanDeger.toString().trim();
                }

                const kontrolDeger = worksheet.getCell(summaryStartRow + 7, 10).value;
                if (kontrolDeger) {
                    kontrol = kontrolDeger.toString().trim();
                }
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
                const projectInfo = window.TableManager.getProjectInfo();
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
                
                this.setupColumnWidths(worksheet);
                this.createFilteredHeaderSection(worksheet, projectInfo, filterType);
                const dataEndRow = this.addFilteredDataRows(worksheet, filteredData);
                this.addFilteredSummarySection(worksheet, filteredData, dataEndRow, filterType);
                
                await workbook.xlsx.writeFile(filePath);
                this.showNotification('Filtrelenmiş Excel dosyası başarıyla kaydedildi!', 'success');
                
            } catch (error) {
                console.error('Filtrelenmiş Excel export hatası:', error);
                this.showNotification('Filtrelenmiş Excel dosyası kaydedilemedi: ' + error.message, 'error');
            }
        },

        // Filtrelenmiş başlık bölümü
        createFilteredHeaderSection: function(worksheet, projectInfo, filterType) {
            worksheet.getRow(1).height = 15;
            worksheet.getRow(2).height = 15.75;
            worksheet.getRow(3).height = 15.75;
            worksheet.getRow(4).height = 15.75;
            worksheet.getRow(5).height = 15;
            worksheet.getRow(6).height = 15.75;
            worksheet.getRow(7).height = 31.5;
            
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
            
            const addressCell = worksheet.getCell('A1');
            addressCell.value = 'Şair Nedim Caddesi\nHacı Halitbey Sokak No:7\nBeşiktaş - İSTANBUL\nTel: +90 212 236 25 57\nFax: +90 212 236 25 61\nE-Mail: teta@tetakazan.com.tr';
            addressCell.font = { name: 'Calibri', size: 11, bold: false };
            addressCell.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
            
            this.addLogo(worksheet);
            
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
            
            this.addHeaderBorders(worksheet);
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
            const projectInfo = window.TableManager.getProjectInfo();
            
            const summaryStartRow = startRow + 1;
            
            worksheet.mergeCells(`H${summaryStartRow}:I${summaryStartRow}`);
            worksheet.mergeCells(`H${summaryStartRow + 1}:I${summaryStartRow + 1}`);
            worksheet.mergeCells(`H${summaryStartRow + 2}:I${summaryStartRow + 2}`);
            worksheet.mergeCells(`H${summaryStartRow + 3}:I${summaryStartRow + 3}`);
            worksheet.mergeCells(`H${summaryStartRow + 5}:I${summaryStartRow + 5}`);
            worksheet.mergeCells(`H${summaryStartRow + 6}:I${summaryStartRow + 6}`);
            
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

        // Bildirim gösterme
        showNotification: function(message, type = 'info') {
            if (window.UIManager && window.UIManager.showNotification) {
                window.UIManager.showNotification(message, type);
            } else {
                console.log(`[${type.toUpperCase()}] ${message}`);
            }
        }
    };

    // Modülü window objesine bağla
    window.ExcelManager = ExcelManager;

})(window);