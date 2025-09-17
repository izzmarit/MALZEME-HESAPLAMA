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
                        scale: 73,
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
                
                // Satır yükseklikleri - XML'den (1-7 arası)
                worksheet.getRow(1).height = 15; // Varsayılan
                worksheet.getRow(2).height = 15.75;
                worksheet.getRow(3).height = 15.75;
                worksheet.getRow(4).height = 15.75;
                worksheet.getRow(5).height = 15; // Varsayılan
                worksheet.getRow(6).height = 15.75;
                worksheet.getRow(7).height = 31.5; // Başlık satırı
                
                // Satır yükseklikleri - 8'den 52'ye kadar 18.75
                for (let i = 8; i <= 52; i++) {
                    worksheet.getRow(i).height = 18.75;
                }
                
                // 53-59 arası satır yükseklikleri
                worksheet.getRow(53).height = 15; // Varsayılan
                worksheet.getRow(54).height = 15; // Varsayılan
                worksheet.getRow(55).height = 15; // Varsayılan
                worksheet.getRow(56).height = 15; // Varsayılan
                worksheet.getRow(57).height = 15; // Varsayılan
                worksheet.getRow(58).height = 15; // Varsayılan
                worksheet.getRow(59).height = 15.75;
                
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
                
                // Logo ekleme - 3.2cm x 7.2cm boyutlarında
                try {
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
                            break;
                        }
                    }
                    
                    if (logoPath) {
                        const logoImage = workbook.addImage({
                            filename: logoPath,
                            extension: 'png',
                        });
                        
                        // Logo konumlandırma - D1:E6 hücreleri içinde
                        // 3.2cm yükseklik, 7.2cm genişlik
                        worksheet.addImage(logoImage, {
                            tl: { col: 3, row: 0 },
                            br: { col: 5, row: 6 },
                            editAs: 'oneCell'
                        });
                    }
                } catch (logoError) {
                    console.error('Logo ekleme hatası:', logoError);
                }
                
                // PROJE BİLGİLERİ - SAĞ TARAF - XML'DEKİ FORMAT ÖZELLİKLERİ
                
                // F1:F2 - "Proje:" etiketi - Sola hizalı, dikey ortalı
                const projeLabel = worksheet.getCell('F1');
                projeLabel.value = 'Proje:';
                projeLabel.font = { 
                    name: 'Calibri', 
                    size: 10,     // 10 punto
                    bold: false   // Normal yazı
                };
                projeLabel.alignment = { 
                    horizontal: 'left',      // Sola hizalanmış
                    vertical: 'center'       // Dikey ortala
                };
                
                // G1:I2 - Proje değeri - ÖNEMLİ: Ortalı, 16 punto, kalın
                const projeValue = worksheet.getCell('G1');
                projeValue.value = projectInfo.projeAdi || '';
                projeValue.font = { 
                    name: 'Calibri', 
                    size: 16,     // 16 punto
                    bold: true    // Kalın
                };
                projeValue.alignment = { 
                    horizontal: 'center',  // Tam ortalı
                    vertical: 'center' 
                };
                
                // J1 - "Sipariş No:" etiketi - Sola hizalı, dikey ortalı
                const siparisLabel = worksheet.getCell('J1');
                siparisLabel.value = 'Sipariş No:';
                siparisLabel.font = { 
                    name: 'Calibri', 
                    size: 10,     // 10 punto
                    bold: false   // Normal yazı
                };
                siparisLabel.alignment = { 
                    horizontal: 'left',      // Sola hizalanmış
                    vertical: 'center'       // Dikey ortala
                };
                
                // J2:J3 - Sipariş no değeri - ÖNEMLİ: Ortalı, 12 punto, kalın
                const siparisValue = worksheet.getCell('J2');
                siparisValue.value = projectInfo.siparisNo || '';
                siparisValue.font = { 
                    name: 'Calibri', 
                    size: 12,     // 12 punto
                    bold: true    // Kalın
                };
                siparisValue.alignment = { 
                    horizontal: 'center',  // Tam ortalı
                    vertical: 'center' 
                };
                
                // F3:F4 - "Resim Açıklaması:" etiketi - Sola hizalı, dikey ortalı
                const resimAciklamaLabel = worksheet.getCell('F3');
                resimAciklamaLabel.value = 'Resim Açıklaması:';
                resimAciklamaLabel.font = { 
                    name: 'Calibri', 
                    size: 10,     // 10 punto
                    bold: false   // Normal yazı
                };
                resimAciklamaLabel.alignment = { 
                    horizontal: 'left',      // Sola hizalanmış
                    vertical: 'center'       // Dikey ortala
                };
                
                // G3:I4 - Resim açıklaması değeri - ÖNEMLİ: Ortalı, 14 punto, kalın
                const resimAciklamaValue = worksheet.getCell('G3');
                resimAciklamaValue.value = projectInfo.resimAciklamasi || '';
                resimAciklamaValue.font = { 
                    name: 'Calibri', 
                    size: 14,     // 14 punto
                    bold: true    // Kalın
                };
                resimAciklamaValue.alignment = { 
                    horizontal: 'center',  // Tam ortalı
                    vertical: 'center' 
                };
                
                // J4 - "Revizyon No:" etiketi - Sola hizalı, dikey ortalı
                const revizyonLabel = worksheet.getCell('J4');
                revizyonLabel.value = 'Revizyon No:';
                revizyonLabel.font = { 
                    name: 'Calibri', 
                    size: 10,     // 10 punto
                    bold: false   // Normal yazı
                };
                revizyonLabel.alignment = { 
                    horizontal: 'left',      // Sola hizalanmış
                    vertical: 'center'       // Dikey ortala
                };
                
                // F5:F6 - "Resim No:" etiketi - Sola hizalı, dikey ortalı
                const resimNoLabel = worksheet.getCell('F5');
                resimNoLabel.value = 'Resim No:';
                resimNoLabel.font = { 
                    name: 'Calibri', 
                    size: 10,     // 10 punto
                    bold: false   // Normal yazı
                };
                resimNoLabel.alignment = { 
                    horizontal: 'left',      // Sola hizalanmış
                    vertical: 'center'       // Dikey ortala
                };
                
                // G5:I6 - Resim no değeri - ÖNEMLİ: Ortalı, 12 punto, kalın
                const resimNoValue = worksheet.getCell('G5');
                resimNoValue.value = projectInfo.resimNo || '';
                resimNoValue.font = { 
                    name: 'Calibri', 
                    size: 12,     // 12 punto
                    bold: true    // Kalın
                };
                resimNoValue.alignment = { 
                    horizontal: 'center',  // Tam ortalı
                    vertical: 'center' 
                };
                
                // J5:J6 - Revizyon no değeri - ÖNEMLİ: Ortalı, 12 punto, kalın
                const revizyonValue = worksheet.getCell('J5');
                revizyonValue.value = projectInfo.revizyonNo || '';
                revizyonValue.font = { 
                    name: 'Calibri', 
                    size: 12,     // 12 punto
                    bold: true    // Kalın
                };
                revizyonValue.alignment = { 
                    horizontal: 'center',  // Tam ortalı
                    vertical: 'center' 
                };
                
                // Üst kısım kenarlıkları (1-6. satırlar) - Normal ince kenarlık
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
                
                // 2, 3, 4, 6. satırların alt kenarlıkları kalın
                for (let col = 1; col <= 10; col++) {
                    worksheet.getCell(2, col).border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'medium' },  // Kalın
                        right: { style: 'thin' }
                    };
                    worksheet.getCell(3, col).border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'medium' },  // Kalın
                        right: { style: 'thin' }
                    };
                    worksheet.getCell(4, col).border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'medium' },  // Kalın
                        right: { style: 'thin' }
                    };
                    worksheet.getCell(6, col).border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'medium' },  // Kalın
                        right: { style: 'thin' }
                    };
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
                
                // Veri satırları (8-52 arası)
                let currentRow = 8;
                
                // Çift/tek satır dolgu renkleri için
                const evenRowFill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFF2F2F2' } // Açık gri
                };
                
                // Tabloya veri ekle
                tableData.forEach((row, index) => {
                    if (currentRow > 52) return; // 52. satırdan sonra ekleme yapma
                    
                    const dataRow = worksheet.getRow(currentRow);
                    const isEvenRow = (currentRow - 8) % 2 === 0;
                    
                    // P.No
                    dataRow.getCell(1).value = row.pNo;
                    dataRow.getCell(1).font = { name: 'Calibri', size: 11 };
                    dataRow.getCell(1).alignment = { horizontal: 'center', vertical: 'center' };
                    
                    // Adet
                    dataRow.getCell(2).value = parseInt(row.adet);
                    dataRow.getCell(2).font = { name: 'Calibri', size: 11 };
                    dataRow.getCell(2).alignment = { horizontal: 'center', vertical: 'center' };
                    
                    // Malzeme Türü - C sütunu sola hizalı
                    dataRow.getCell(3).value = row.malzemeTuru;
                    dataRow.getCell(3).font = { name: 'Calibri', size: 11 };
                    dataRow.getCell(3).alignment = { horizontal: 'left', vertical: 'center' };
                    
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
                    
                    // Çift satırlara dolgu rengi ekle
                    if (isEvenRow) {
                        for (let col = 1; col <= 10; col++) {
                            dataRow.getCell(col).fill = evenRowFill;
                        }
                    }
                    
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
                
                // Boş satırlar (currentRow'dan 52'ye kadar)
                while (currentRow <= 52) {
                    const emptyRow = worksheet.getRow(currentRow);
                    const isEvenRow = (currentRow - 8) % 2 === 0;
                    
                    for (let col = 1; col <= 10; col++) {
                        const cell = emptyRow.getCell(col);
                        cell.border = {
                            top: { style: 'thin' },
                            left: { style: 'thin' },
                            bottom: { style: 'thin' },
                            right: { style: 'thin' }
                        };
                        
                        // Çift satırlara dolgu rengi
                        if (isEvenRow) {
                            cell.fill = evenRowFill;
                        }
                    }
                    currentRow++;
                }
                
                // 52. satırın alt kenarlığı kalın olmalı
                for (let col = 1; col <= 10; col++) {
                    const cell = worksheet.getCell(52, col);
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'medium' }, // Kalın
                        right: { style: 'thin' }
                    };
                }
                
                // Özet raporu hesaplama
                const summary = this.calculateSummary(tableData);
                
                // 53-59 arası özet raporu
                // 53. satır boş
                
                // 54. satır - A54:B54 birleşik - "Notlar:" başlığı
                worksheet.mergeCells('A54:B54');
                const ozetBaslikSol = worksheet.getCell('A54');
                ozetBaslikSol.value = 'Notlar:';
                ozetBaslikSol.font = { name: 'Calibri', size: 11, bold: true };
                ozetBaslikSol.alignment = { horizontal: 'center', vertical: 'center' };
                
                // 53-59 arası H-I sütunları için birleştirmeler
                worksheet.mergeCells('H53:I53');
                worksheet.mergeCells('H54:I54');
                worksheet.mergeCells('H55:I55');
                worksheet.mergeCells('H56:I56');
                worksheet.mergeCells('H57:I57');
                worksheet.mergeCells('H58:I58');
                worksheet.mergeCells('H59:I59');
                
                // H53 - "ÖZET RAPORU"
                const h53 = worksheet.getCell('H53');
                h53.value = 'ÖZET RAPORU';
                h53.font = { name: 'Calibri', size: 11, bold: true };
                h53.alignment = { horizontal: 'center', vertical: 'center' };
                h53.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFE0E0E0' }
                };
                
                // H54 - "TOPLAM PARÇA SAYISI"
                const h54 = worksheet.getCell('H54');
                h54.value = 'TOPLAM PARÇA SAYISI';
                h54.font = { name: 'Calibri', size: 11 };
                h54.alignment = { horizontal: 'center', vertical: 'center' };
                
                // H55 - "GENEL TOPLAM AĞIRLIK"
                const h55 = worksheet.getCell('H55');
                h55.value = 'GENEL TOPLAM AĞIRLIK';
                h55.font = { name: 'Calibri', size: 11 };
                h55.alignment = { horizontal: 'center', vertical: 'center' };
                
                // H56 - "GENEL TOPLAM SU HACMİ"
                const h56 = worksheet.getCell('H56');
                h56.value = 'GENEL TOPLAM SU HACMİ';
                h56.font = { name: 'Calibri', size: 11 };
                h56.alignment = { horizontal: 'center', vertical: 'center' };
                
                // H58 - "RAPOR TARİHİ"
                const h58 = worksheet.getCell('H58');
                h58.value = 'RAPOR TARİHİ';
                h58.font = { name: 'Calibri', size: 11 };
                h58.alignment = { horizontal: 'center', vertical: 'center' };
                
                // J sütunu - Hesaplanan değerler
                // J54 - Toplam parça sayısı
                worksheet.getCell('J54').value = summary.toplamParca;
                worksheet.getCell('J54').font = { name: 'Calibri', size: 11 };
                worksheet.getCell('J54').alignment = { horizontal: 'center', vertical: 'center' };
                
                // J55 - Genel toplam ağırlık
                worksheet.getCell('J55').value = parseFloat(summary.toplamAgirlik);
                worksheet.getCell('J55').font = { name: 'Calibri', size: 11 };
                worksheet.getCell('J55').alignment = { horizontal: 'center', vertical: 'center' };
                worksheet.getCell('J55').numFmt = '#,##0.00 "kg"';
                
                // J56 - Genel toplam su hacmi
                worksheet.getCell('J56').value = parseFloat(summary.toplamSuHacmi);
                worksheet.getCell('J56').font = { name: 'Calibri', size: 11 };
                worksheet.getCell('J56').alignment = { horizontal: 'center', vertical: 'center' };
                worksheet.getCell('J56').numFmt = '#,##0.00 "L"';
                
                // J58 - Tarih
                const today = new Date();
                const tarih = `${today.getDate().toString().padStart(2,'0')}.${(today.getMonth()+1).toString().padStart(2,'0')}.${today.getFullYear()}`;
                worksheet.getCell('J58').value = tarih;
                worksheet.getCell('J58').font = { name: 'Calibri', size: 11 };
                worksheet.getCell('J58').alignment = { horizontal: 'center', vertical: 'center' };
                
                // Özet bölümü kenarlıkları (53-59 arası)
                // Sol taraf (A-G sütunları) - sadece dış kenarlık
                for (let row = 53; row <= 59; row++) {
                    for (let col = 1; col <= 7; col++) {
                        const cell = worksheet.getCell(row, col);
                        // Sol kenarlık
                        if (col === 1) {
                            cell.border = {
                                ...cell.border,
                                left: { style: 'thin' }
                            };
                        }
                        // Üst kenarlık (53. satır)
                        if (row === 53) {
                            cell.border = {
                                ...cell.border,
                                top: { style: 'thin' }
                            };
                        }
                        // Alt kenarlık (59. satır) - kalın
                        if (row === 59) {
                            cell.border = {
                                ...cell.border,
                                bottom: { style: 'medium' }
                            };
                        }
                    }
                }
                
                // H-I sütunları (özet raporu) - tam kenarlık
                for (let row = 53; row <= 59; row++) {
                    const hCell = worksheet.getCell(row, 8);
                    const iCell = worksheet.getCell(row, 9);
                    
                    const borderStyle = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: row === 59 ? { style: 'medium' } : { style: 'thin' }
                    };
                    
                    hCell.border = borderStyle;
                    iCell.border = borderStyle;
                }
                
                // J sütunu - tam kenarlık
                for (let row = 53; row <= 59; row++) {
                    const cell = worksheet.getCell(row, 10);
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: row === 59 ? { style: 'medium' } : { style: 'thin' }
                    };
                }
                
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
                
                TableManager.loadProjectInfo(projectInfo);
                
                // Tablo verilerini oku (8-52 arası)
                const tableData = [];
                let rowIndex = 8;
                const maxRow = 52;
                
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