const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let splashWindow;

// Splash window oluşturma
function createSplashWindow() {
    splashWindow = new BrowserWindow({
        width: 500,
        height: 400,
        frame: false,
        alwaysOnTop: true,
        transparent: true,
        resizable: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        },
        icon: path.join(__dirname, 'src/assets/icon.png')
    });

    splashWindow.loadFile('src/splash.html');
    splashWindow.center();

    // 3 saniye sonra splash'i kapat ve ana pencereyi aç
    setTimeout(() => {
        if (splashWindow && !splashWindow.isDestroyed()) {
            splashWindow.close();
            splashWindow = null;
        }
        createWindow();
        mainWindow.show();
    }, 3000); // 2000'den 3000'e güncellendi
}

// Uygulama menüsü
const menuTemplate = [
    {
        label: 'Dosya',
        submenu: [
            {
                label: 'Yeni',
                accelerator: 'CmdOrCtrl+N',
                click: () => {
                    mainWindow.webContents.send('menu-new');
                }
            },
            {
                label: 'Excel Aç',
                accelerator: 'CmdOrCtrl+O',
                click: () => {
                    mainWindow.webContents.send('menu-open-excel');
                }
            },
            {
                label: 'Excel Kaydet',
                accelerator: 'CmdOrCtrl+S',
                click: () => {
                    mainWindow.webContents.send('menu-save-excel');
                }
            },
            { type: 'separator' },
            {
                label: 'Çıkış',
                accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
                click: () => {
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'Malzeme',
        submenu: [
            {
                label: 'Malzeme Türü Ekle',
                accelerator: 'CmdOrCtrl+M',
                click: () => {
                    mainWindow.webContents.send('add-custom-material-type');
                }
            },
            {
                label: 'Malzeme Cinsi Ekle',
                accelerator: 'CmdOrCtrl+Shift+M',
                click: () => {
                    mainWindow.webContents.send('add-material-grade');
                }
            },
            { type: 'separator' },
            {
                label: 'Eklenen Malzemeleri Yönet',
                click: () => {
                    mainWindow.webContents.send('manage-custom-materials');
                }
            }
        ]
    },
    {
        label: 'Düzen',
        submenu: [
            { role: 'undo', label: 'Geri Al' },
            { role: 'redo', label: 'Yinele' },
            { type: 'separator' },
            { role: 'cut', label: 'Kes' },
            { role: 'copy', label: 'Kopyala' },
            { role: 'paste', label: 'Yapıştır' },
            { role: 'selectall', label: 'Tümünü Seç' }
        ]
    },
    {
        label: 'Görünüm',
        submenu: [
            { role: 'reload', label: 'Yenile' },
            { role: 'forcereload', label: 'Zorla Yenile' },
            { role: 'toggledevtools', label: 'Geliştirici Araçları' },
            { type: 'separator' },
            { role: 'resetzoom', label: 'Yakınlaştırmayı Sıfırla' },
            { role: 'zoomin', label: 'Yakınlaştır' },
            { role: 'zoomout', label: 'Uzaklaştır' },
            { type: 'separator' },
            { role: 'togglefullscreen', label: 'Tam Ekran' }
        ]
    },
    {
        label: 'Yardım',
        submenu: [
            {
                label: 'Kullanım Kılavuzu',
                click: () => {
                    mainWindow.webContents.send('open-help');
                }
            },
            {
                label: 'Hakkında',
                click: () => {
                    dialog.showMessageBox(mainWindow, {
                        type: 'info',
                        title: 'Hakkında',
                        message: 'Malzeme Hesaplama Sistemi',
                        detail: 'Versiyon: 2.1.5\n\n© 2025 TETA Kazan\n\nMalzeme hesaplama ve yönetimi için MURAT KARA tarafından geliştirilmiştir.',
                        buttons: ['Tamam']
                    });
                }
            }
        ]
    }
];

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1200,
        minHeight: 700,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false,
            enableRemoteModule: true,
            hardwareAcceleration: false,
            cache: false
        },
        icon: path.join(__dirname, 'src/assets/icon.png'),
        title: 'Malzeme Hesaplama Sistemi',
        // Focus ayarları ekle
        focusable: true,
        skipTaskbar: false,
        alwaysOnTop: false
    });

    mainWindow.loadFile('src/index.html');

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);

    mainWindow.once('ready-to-show', () => {
        mainWindow.maximize();
        mainWindow.show();
        mainWindow.focus(); // Focus garantisi
        
        // Web contents focus garantisi
        mainWindow.webContents.focus();
        
        setTimeout(() => {
            mainWindow.webContents.executeJavaScript(`
                try {
                    window.focus();
                    document.body.focus();
                    const firstAvailableInput = document.querySelector('input:not([readonly]), select');
                    if (firstAvailableInput) {
                        firstAvailableInput.focus();
                    }
                    // EventManager'ı başlat
                    if (window.EventManager) {
                        window.EventManager.restoreFocus();
                    }
                } catch (error) {
                    console.log('Initial focus hatası:', error);
                }
            `);
        }, 100);
    });

    // Focus kaybı durumunda otomatik geri alma
    mainWindow.on('blur', () => {
        setTimeout(() => {
            if (!mainWindow.isDestroyed() && mainWindow.isVisible()) {
                mainWindow.webContents.executeJavaScript(`
                    if (window.EventManager) {
                        window.EventManager.handleWindowBlur();
                    }
                `);
            }
        }, 10);
    });

    mainWindow.on('focus', () => {
        mainWindow.webContents.executeJavaScript(`
            if (window.EventManager) {
                window.EventManager.handleWindowFocus();
            }
        `);
    });
}

// App başlatmadan önce
app.disableHardwareAcceleration();

app.whenReady().then(() => {
    app.commandLine.appendSwitch('--no-sandbox');
    app.commandLine.appendSwitch('--disable-dev-shm-usage');
    app.commandLine.appendSwitch('--disable-extensions');
    
    createSplashWindow(); // Önce splash'i göster
});

// Tüm pencereler kapatıldığında
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// IPC Event Handlers
ipcMain.handle('save-excel-dialog', async (event, fileInfo) => {
    // Gelen bilgileri al
    let defaultFileName = 'malzeme_listesi';
    
    if (fileInfo && fileInfo.dosyaAdi) {
        // Dosya adı bilgisi varsa kullan
        defaultFileName = fileInfo.dosyaAdi;
    } else if (fileInfo) {
        // Eski format için geriye dönük uyumluluk
        const siparisNo = fileInfo.siparisNo || '';
        const resimAciklamasi = fileInfo.resimAciklamasi || '';
        const tarih = new Date().toLocaleDateString('tr-TR').replace(/\./g, '_');
        
        if (siparisNo || resimAciklamasi) {
            defaultFileName = `${siparisNo}_${resimAciklamasi}_${tarih}`
                .replace(/[<>:"/\\|?*]/g, '')
                .replace(/\s+/g, ' ')
                .trim();
        } else {
            // Hiçbir bilgi yoksa varsayılan isim
            defaultFileName = `malzeme_listesi_${tarih}`;
        }
    }
    
    const result = await dialog.showSaveDialog(mainWindow, {
        title: 'Excel Dosyasını Kaydet',
        defaultPath: `${defaultFileName}.xlsx`,
        filters: [
            { name: 'Excel Dosyaları', extensions: ['xlsx'] },
            { name: 'Tüm Dosyalar', extensions: ['*'] }
        ]
    });
    
    return result;
});

ipcMain.handle('open-excel-dialog', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        title: 'Excel Dosyası Aç',
        properties: ['openFile'],
        filters: [
            { name: 'Excel Dosyaları', extensions: ['xlsx', 'xls'] },
            { name: 'Tüm Dosyalar', extensions: ['*'] }
        ]
    });
    
    return result;
});

// Veri kaydetme ve yükleme
ipcMain.handle('save-data', async (event, data) => {
    try {
        const userDataPath = app.getPath('userData');
        const dataPath = path.join(userDataPath, 'materialData.json');
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('load-data', async () => {
    try {
        const userDataPath = app.getPath('userData');
        const dataPath = path.join(userDataPath, 'materialData.json');
        
        if (fs.existsSync(dataPath)) {
            const data = fs.readFileSync(dataPath, 'utf-8');
            return { success: true, data: JSON.parse(data) };
        }
        
        return { success: false, error: 'Veri dosyası bulunamadı' };
    } catch (error) {
        return { success: false, error: error.message };
    }
});