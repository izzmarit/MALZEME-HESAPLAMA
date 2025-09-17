// Excel İşlemleri Modülü - XML Formatına Tam Uyumlu
(function(window) {
    'use strict';
    
    const ExcelJS = require('exceljs');
    const { ipcRenderer } = require('electron');
    const fs = require('fs');
    const path = require('path');
    
    const ExcelManager = {
        // Excel'e dışa aktar - XML formatına birebir uygun
        exportToExcel: async function() {
            const tableData = TableManager.getTableData();
            
            if (tableData.length === 0) {
                this.showNotification('Kaydedilecek veri bulunmamaktadır!', 'warning');
                return;
            }
            
            try {
                const result = await ipcRenderer.invoke('save-excel-dialog');
                if (result.canceled) return;
                
                const filePath = result.filePath;
                
                // ExcelJS Workbook oluştur
                const workbook = new ExcelJS.Workbook();
                workbook.creator = 'TETA Kazan';
                workbook.created = new Date();
                
                // Worksheet oluştur - XML'deki ayarlarla
                const worksheet = workbook.addWorksheet('Sheet1', {
                    pageSetup: {
                        paperSize: 9, // A4
                        scale: 74,
                        orientation: 'portrait',
                        horizontalDpi: 0,
                        verticalDpi: 0,
                        fitToPage: true,
                        horizontalCentered: true,
                        verticalCentered: true,
                        margins: {
                            left: 0.23622047244094491,
                            right: 0.23622047244094491,
                            top: 0.39370078740157483,
                            bottom: 0.35433070866141736,
                            header: 0.31496062992125984,
                            footer: 0.31496062992125984
                        }
                    },
                    views: [{
                        state: 'frozen',
                        ySplit: 7,
                        topLeftCell: 'A8',
                        activePane: 'bottomLeft',
                        zoomScale: 130,
                        zoomScaleNormal: 130
                    }]
                });
                
                // Proje bilgilerini al
                const projectInfo = TableManager.getProjectInfo();
                
                // Varsayılan satır yüksekliği
                worksheet.properties.defaultRowHeight = 15;
                
                // Sütun genişlikleri - XML'den alınan değerler
                worksheet.getColumn(1).width = 5.7109375;    // A - P.No
                worksheet.getColumn(2).width = 7.140625;      // B - Adet
                worksheet.getColumn(3).width = 22.85546875;   // C - Malzeme Türü
                worksheet.getColumn(4).width = 12.85546875;   // D - Malzeme Cinsi
                worksheet.getColumn(5).width = 20.7109375;    // E - Ölçüler
                worksheet.getColumn(6).width = 15;            // F - EN Normu
                worksheet.getColumn(7).width = 9.28515625;    // G - Su Hacmi
                worksheet.getColumn(8).width = 12.140625;     // H - Birim Ağırlık
                worksheet.getColumn(9).width = 13.5703125;    // I - Toplam Ağırlık
                worksheet.getColumn(10).width = 15.5703125;   // J - Heat No
                
                // Satır yükseklikleri - XML'den
                worksheet.getRow(1).height = 15; // Varsayılan
                worksheet.getRow(2).height = 15.75;
                worksheet.getRow(3).height = 15.75;
                worksheet.getRow(4).height = 15.75;
                worksheet.getRow(5).height = 15; // Varsayılan
                worksheet.getRow(6).height = 15.75;
                worksheet.getRow(7).height = 31.5; // Başlık satırı
                
                // Hücre birleştirmeleri - XML'den
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
                
                // Firma bilgileri - Sol üst (A1:C6)
                const addressCell = worksheet.getCell('A1');
                addressCell.value = 'Şair Nedim Caddesi\nHacı Halitbey Sokak No:7\nBeşiktaş - İSTANBUL\nTel: +90 212 236 25 57\nFax: +90 212 236 25 61\nE-Mail: teta@tetakazan.com.tr';
                addressCell.font = { 
                    name: 'Calibri', 
                    size: 11,
                    bold: false
                };
                addressCell.alignment = { 
                    horizontal: 'left', 
                    vertical: 'top', 
                    wrapText: true 
                };
                
                // Logo ekleme - Kritik düzeltme
                try {
                    // Farklı olası logo konumlarını dene
                    const possiblePaths = [
                        path.join(__dirname, '../../assets/logo.png'),
                        path.join(__dirname, '../../../src/assets/logo.png'),
                        path.join(process.cwd(), 'src/assets/logo.png'),
                        path.join(process.cwd(), 'assets/logo.png')
                    ];
                    
                    let logoPath = null;
                    for (const p of possiblePaths) {
                        if (fs.existsSync(p)) {
                            logoPath = p;
                            console.log('Logo bulundu:', logoPath);
                            break;
                        }
                    }
                    
                    if (logoPath) {
                        const logoImage = workbook.addImage({
                            filename: logoPath,
                            extension: 'png',
                        });
                        
                        // Logo konumlandırma - D1:E6 hücreleri içinde ortalı
                        worksheet.addImage(logoImage, {
                            tl: { col: 3.1, row: 0.5 },
                            br: { col: 4.9, row: 5.5 },
                            editAs: 'oneCell'
                        });
                    } else {
                        console.log('Logo dosyası bulunamadı, denenen yollar:', possiblePaths);
                    }
                } catch (logoError) {
                    console.error('Logo ekleme hatası:', logoError);
                }
                
                // Proje bilgileri - Sağ taraf
                // F1:F2 - "Proje:" etiketi
                const projeLabel = worksheet.getCell('F1');
                projeLabel.value = 'Proje:';
                projeLabel.font = { name: 'Calibri', size: 11, bold: true };
                projeLabel.alignment = { horizontal: 'right', vertical: 'center' };
                
                // G1:I2 - Proje değeri
                const projeValue = worksheet.getCell('G1');
                projeValue.value = projectInfo.projeAdi || '_';
                projeValue.font = { name: 'Calibri', size: 11, bold: false };
                projeValue.alignment = { horizontal: 'center', vertical: 'center' };
                
                // J1 - "Sipariş No:" etiketi
                const siparisLabel = worksheet.getCell('J1');
                siparisLabel.value = 'Sipariş No:';
                siparisLabel.font = { name: 'Calibri', size: 11, bold: true };
                siparisLabel.alignment = { horizontal: 'center', vertical: 'bottom' };
                
                // J2:J3 - Sipariş no değeri
                const siparisValue = worksheet.getCell('J2');
                siparisValue.value = projectInfo.siparisNo || '_';
                siparisValue.font = { name: 'Calibri', size: 11, bold: false };
                siparisValue.alignment = { horizontal: 'center', vertical: 'center' };
                
                // F3:F4 - "Resim Açıklaması:" etiketi
                const resimAciklamaLabel = worksheet.getCell('F3');
                resimAciklamaLabel.value = 'Resim Açıklaması:';
                resimAciklamaLabel.font = { name: 'Calibri', size: 11, bold: true };
                resimAciklamaLabel.alignment = { horizontal: 'right', vertical: 'center' };
                
                // G3:I4 - Resim açıklaması değeri
                const resimAciklamaValue = worksheet.getCell('G3');
                resimAciklamaValue.value = projectInfo.resimAciklamasi || '_';
                resimAciklamaValue.font = { name: 'Calibri', size: 11, bold: false };
                resimAciklamaValue.alignment = { horizontal: 'center', vertical: 'center' };
                
                // J4 - "Revizyon No:" etiketi
                const revizyonLabel = worksheet.getCell('J4');
                revizyonLabel.value = 'Revizyon No:';
                revizyonLabel.font = { name: 'Calibri', size: 11, bold: true };
                revizyonLabel.alignment = { horizontal: 'center', vertical: 'bottom' };
                
                // F5:F6 - "Resim No:" etiketi
                const resimNoLabel = worksheet.getCell('F5');
                resimNoLabel.value = 'Resim No:';
                resimNoLabel.font = { name: 'Calibri', size: 11, bold: true };
                resimNoLabel.alignment = { horizontal: 'right', vertical: 'center' };
                
                // G5:I6 - Resim no değeri
                const resimNoValue = worksheet.getCell('G5');
                resimNoValue.value = projectInfo.resimNo || '_';
                resimNoValue.font = { name: 'Calibri', size: 11, bold: false };
                resimNoValue.alignment = { horizontal: 'center', vertical: 'center' };
                
                // J5:J6 - Revizyon no değeri
                const revizyonValue = worksheet.getCell('J5');
                revizyonValue.value = projectInfo.revizyonNo || '_';
                revizyonValue.font = { name: 'Calibri', size: 11, bold: false };
                revizyonValue.alignment = { horizontal: 'center', vertical: 'center' };
                
                // Üst kısım kenarlıkları (1-6. satırlar)
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
                
                // 7. satır - Tablo başlıkları
                const headers = [
                    'P.No',
                    'Adet',
                    'Malzeme\nTürü',
                    'Malzeme\nCinsi',
                    'Ölçüler',
                    'EN Normu',
                    'Su Hacmi\n(L)',
                    'Birim Ağırlık\n(kg)',
                    'Toplam Ağırlık\n(kg)',
                    'Heat No'
                ];
                
                const headerRow = worksheet.getRow(7);
                headers.forEach((header, index) => {
                    const cell = headerRow.getCell(index + 1);
                    cell.value = header;
                    cell.font = { 
                        name: 'Calibri', 
                        size: 11, 
                        bold: true 
                    };
                    cell.alignment = { 
                        horizontal: 'center', 
                        vertical: 'center', 
                        wrapText: true 
                    };
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FFD9D9D9' } // Gri arka plan
                    };
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                });
                
                // Veri satırları
                let currentRow = 8;
                tableData.forEach((row, index) => {
                    const dataRow = worksheet.getRow(currentRow);
                    dataRow.height = 17.25;
                    
                    // Çift/tek satır kontrolü
                    const isEvenRow = (currentRow - 8) % 2 === 0;
                    
                    // P.No
                    dataRow.getCell(1).value = row.pNo;
                    dataRow.getCell(1).font = { name: 'Calibri', size: 11 };
                    dataRow.getCell(1).alignment = { horizontal: 'center', vertical: 'center' };
                    
                    // Adet
                    dataRow.getCell(2).value = parseInt(row.adet);
                    dataRow.getCell(2).font = { name: 'Calibri', size: 11 };
                    dataRow.getCell(2).alignment = { horizontal: 'center', vertical: 'center' };
                    
                    // Malzeme Türü
                    dataRow.getCell(3).value = row.malzemeTuru;
                    dataRow.getCell(3).font = { name: 'Calibri', size: 11 };
                    dataRow.getCell(3).alignment = { horizontal: 'center', vertical: 'center' };
                    
                    // Malzeme Cinsi
                    dataRow.getCell(4).value = row.malzemeCinsi;
                    dataRow.getCell(4).font = { name: 'Calibri', size: 11 };
                    dataRow.getCell(4).alignment = { horizontal: 'center', vertical: 'center' };
                    
                    // Ölçüler
                    dataRow.getCell(5).value = row.olculer;
                    dataRow.getCell(5).font = { name: 'Calibri', size: 11 };
                    dataRow.getCell(5).alignment = { horizontal: 'left', vertical: 'center' };
                    
                    // EN Normu
                    dataRow.getCell(6).value = row.enNormu;
                    dataRow.getCell(6).font = { name: 'Calibri', size: 11 };
                    dataRow.getCell(6).alignment = { horizontal: 'left', vertical: 'center' };
                    
                    // Su Hacmi
                    dataRow.getCell(7).value = row.suHacmi === '-' ? '' : parseFloat(row.suHacmi);
                    dataRow.getCell(7).font = { name: 'Calibri', size: 11 };
                    dataRow.getCell(7).alignment = { horizontal: 'center', vertical: 'center' };
                    
                    // Birim Ağırlık
                    dataRow.getCell(8).value = parseFloat(row.birimAgirlik);
                    dataRow.getCell(8).font = { name: 'Calibri', size: 11 };
                    dataRow.getCell(8).alignment = { horizontal: 'right', vertical: 'center' };
                    dataRow.getCell(8).numFmt = '#,##0.00';
                    
                    // Toplam Ağırlık
                    dataRow.getCell(9).value = parseFloat(row.toplamAgirlik);
                    dataRow.getCell(9).font = { name: 'Calibri', size: 11 };
                    dataRow.getCell(9).alignment = { horizontal: 'right', vertical: 'center' };
                    dataRow.getCell(9).numFmt = '#,##0.00';
                    
                    // Heat No
                    dataRow.getCell(10).value = row.heatNo === '-' ? '' : row.heatNo;
                    dataRow.getCell(10).font = { name: 'Calibri', size: 11 };
                    dataRow.getCell(10).alignment = { horizontal: 'left', vertical: 'center' };
                    
                    // Kenarlıklar
                    for (let col = 1; col <= 10; col++) {
                        dataRow.getCell(col).border = {
                            top: { style: 'thin' },
                            left: { style: 'thin' },
                            bottom: { style: 'thin' },
                            right: { style: 'thin' }
                        };
                    }
                    
                    currentRow++;
                });
                
                // Boş satırlar (57. satıra kadar)
                while (currentRow <= 57) {
                    const emptyRow = worksheet.getRow(currentRow);
                    emptyRow.height = 17.25;
                    
                    for (let col = 1; col <= 10; col++) {
                        const cell = emptyRow.getCell(col);
                        cell.border = {
                            top: { style: 'thin' },
                            left: { style: 'thin' },
                            bottom: { style: 'thin' },
                            right: { style: 'thin' }
                        };
                    }
                    currentRow++;
                }
                
                // Özet raporu hesaplama
                const summary = this.calculateSummary(tableData);
                
                // Satır 58-64 arası özet raporu
                // 58. satır - Başlık
                worksheet.mergeCells('H58:I58');
                const ozetBaslik = worksheet.getCell('H58');
                ozetBaslik.value = 'ÖZET RAPORU';
                ozetBaslik.font = { name: 'Calibri', size: 11, bold: true };
                ozetBaslik.alignment = { horizontal: 'center', vertical: 'center' };
                ozetBaslik.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFE0E0E0' }
                };
                
                // 59. satır - Toplam Parça Sayısı
                worksheet.mergeCells('H59:I59');
                const toplamParca = worksheet.getCell('H59');
                toplamParca.value = 'Toplam Parça Sayısı';
                toplamParca.font = { name: 'Calibri', size: 11 };
                toplamParca.alignment = { horizontal: 'center', vertical: 'center' };
                
                // 60. satır - Genel Toplam Ağırlık
                worksheet.mergeCells('H60:I60');
                const genelToplam = worksheet.getCell('H60');
                genelToplam.value = 'Genel Toplam Ağırlık';
                genelToplam.font = { name: 'Calibri', size: 11 };
                genelToplam.alignment = { horizontal: 'center', vertical: 'center' };
                
                // 61. satır - Genel Toplam Su Hacmi
                worksheet.mergeCells('H61:I61');
                const toplamSu = worksheet.getCell('H61');
                toplamSu.value = 'Genel Toplam Su Hacmi';
                toplamSu.font = { name: 'Calibri', size: 11 };
                toplamSu.alignment = { horizontal: 'center', vertical: 'center' };
                
                // 62. satır - Boş
                worksheet.mergeCells('H62:I62');
                
                // 63. satır - Rapor Tarihi
                worksheet.mergeCells('H63:I63');
                const raporTarihi = worksheet.getCell('H63');
                const today = new Date();
                const tarih = `Rapor Tarihi\n${today.getDate().toString().padStart(2,'0')}.${(today.getMonth()+1).toString().padStart(2,'0')}.${today.getFullYear()}`;
                raporTarihi.value = tarih;
                raporTarihi.font = { name: 'Calibri', size: 11 };
                raporTarihi.alignment = { horizontal: 'center', vertical: 'center', wrapText: true };
                
                // 64. satır - Son satır
                worksheet.mergeCells('H64:I64');
                worksheet.getRow(64).height = 15.75;
                
                // Özet bölümü kenarlıkları - Özel düzenleme
                // Sol taraf (A-G sütunları) - sadece dış kenarlık
                for (let row = 58; row <= 64; row++) {
                    for (let col = 1; col <= 7; col++) {
                        const cell = worksheet.getCell(row, col);
                        if (row === 58 && col === 1) {
                            // Sol üst köşe
                            cell.border = {
                                top: { style: 'thin' },
                                left: { style: 'thin' }
                            };
                        } else if (row === 58 && col <= 7) {
                            // Üst kenarlık
                            cell.border = {
                                top: { style: 'thin' }
                            };
                        } else if (row === 64 && col === 1) {
                            // Sol alt köşe
                            cell.border = {
                                left: { style: 'thin' },
                                bottom: { style: 'medium' }
                            };
                        } else if (row === 64 && col <= 7) {
                            // Alt kenarlık (kalın)
                            cell.border = {
                                bottom: { style: 'medium' }
                            };
                        } else if (col === 1) {
                            // Sol kenarlık
                            cell.border = {
                                left: { style: 'thin' }
                            };
                        }
                    }
                }
                
                // H-I sütunları (özet raporu) - tam kenarlık
                for (let row = 58; row <= 64; row++) {
                    const hCell = worksheet.getCell(row, 8);
                    const iCell = worksheet.getCell(row, 9);
                    
                    const borderStyle = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: row === 64 ? { style: 'medium' } : { style: 'thin' }
                    };
                    
                    hCell.border = borderStyle;
                    iCell.border = borderStyle;
                }
                
                // J sütunu - sadece dış kenarlık
                for (let row = 58; row <= 64; row++) {
                    const cell = worksheet.getCell(row, 10);
                    if (row === 58) {
                        cell.border = {
                            top: { style: 'thin' },
                            right: { style: 'thin' }
                        };
                    } else if (row === 64) {
                        cell.border = {
                            right: { style: 'thin' },
                            bottom: { style: 'medium' }
                        };
                    } else {
                        cell.border = {
                            right: { style: 'thin' }
                        };
                    }
                }
                
                // Özet değerlerini ekle (şimdi kenarlıklar ayarlandıktan sonra)
                worksheet.getCell('I59').value = summary.toplamParca;
                worksheet.getCell('I59').alignment = { horizontal: 'center', vertical: 'center' };
                
                worksheet.getCell('I60').value = summary.toplamAgirlik + ' kg';
                worksheet.getCell('I60').alignment = { horizontal: 'center', vertical: 'center' };
                
                worksheet.getCell('I61').value = summary.toplamSuHacmi + ' L';
                worksheet.getCell('I61').alignment = { horizontal: 'center', vertical: 'center' };
                
                // Excel dosyasını kaydet
                await workbook.xlsx.writeFile(filePath);
                
                this.showNotification('Excel dosyası başarıyla kaydedildi!', 'success');
                console.log('Excel dosyası kaydedildi:', filePath);
                
            } catch (error) {
                console.error('Excel export hatası:', error);
                this.showNotification('Excel dosyası kaydedilemedi: ' + error.message, 'error');
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
                
                // Alt çizgileri temizle
                Object.keys(projectInfo).forEach(key => {
                    if (projectInfo[key] === '_' || projectInfo[key] === '__') {
                        projectInfo[key] = '';
                    }
                });
                
                TableManager.loadProjectInfo(projectInfo);
                
                // Tablo verilerini oku
                const tableData = [];
                let rowIndex = 8;
                const maxRow = 57;
                
                while (rowIndex <= maxRow) {
                    const pNo = worksheet.getCell(rowIndex, 1).value;
                    if (!pNo) {
                        rowIndex++;
                        continue;
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
                        originalGrade: (worksheet.getCell(rowIndex, 4).value || '').toString().replace('1.', '')
                    };
                    
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