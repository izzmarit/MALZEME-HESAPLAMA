/**
 * Electron Main Process - Son Klasör Hatırlama Eklendi
 */

const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let isDev = process.env.NODE_ENV === 'development';

// Uygulama verilerini kaydetme yolu
const userDataPath = app.getPath('userData');
const dataFilePath = path.join(userDataPath, 'appData.json');
const settingsFilePath = path.join(userDataPath, 'settings.json'); // EKLENDI

// Ayarları yükle/kaydet - EKLENDI
function loadSettings() {
    try {
        if (fs.existsSync(settingsFilePath)) {
            return JSON.parse(fs.readFileSync(settingsFilePath, 'utf8'));
        }
    } catch (error) {
        console.error('Ayarlar yüklenemedi:', error);
    }
    return {
        lastSaveDirectory: app.getPath('documents')
    };
}

function saveSettings(settings) {
    try {
        fs.writeFileSync(settingsFilePath, JSON.stringify(settings, null, 2));
    } catch (error) {
        console.error('Ayarlar kaydedilemedi:', error);
    }
}

function createWindow() {
    // Splash window oluştur
    let splashWindow = new BrowserWindow({
        width: 400,
        height: 500,
        frame: false,
        alwaysOnTop: true,
        transparent: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    splashWindow.loadFile('splash.html');
    splashWindow.center();

    // Ana pencere
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1200,
        minHeight: 700,
        show: false, // Başlangıçta gizli
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: !isDev
        },
        icon: path.join(__dirname, 'assets/icon.ico'),
        title: 'TETA Kazan - Malzeme Hesaplama Sistemi'
    });

    mainWindow.loadFile('index.html');
    
    // Development modda DevTools'u aç
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    // Ana pencere yüklendiğinde
    mainWindow.once('ready-to-show', () => {
        setTimeout(() => {
            splashWindow.close();
            splashWindow = null;
            mainWindow.show();
            
            // Ana pencereyi öne getir
            mainWindow.focus();
        }, 3000); // 3 saniye splash screen göster
    });

    // Ana pencere kapandığında
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Menüyü oluştur
    createMenu();

    // Splash window için hata yakalama
    splashWindow.on('closed', () => {
        splashWindow = null;
    });
}

// Menü oluşturma
function createMenu() {
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
                { type: 'separator' },
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
                    accelerator: 'CmdOrCtrl+Q',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'Düzenle',
            submenu: [
                { label: 'Geri Al', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
                { label: 'Yinele', accelerator: 'CmdOrCtrl+Y', role: 'redo' },
                { type: 'separator' },
                { label: 'Kes', accelerator: 'CmdOrCtrl+X', role: 'cut' },
                { label: 'Kopyala', accelerator: 'CmdOrCtrl+C', role: 'copy' },
                { label: 'Yapıştır', accelerator: 'CmdOrCtrl+V', role: 'paste' }
            ]
        },
        {
            label: 'Görünüm',
            submenu: [
                { label: 'Yakınlaştır', accelerator: 'CmdOrCtrl+Plus', role: 'zoomIn' },
                { label: 'Uzaklaştır', accelerator: 'CmdOrCtrl+-', role: 'zoomOut' },
                { label: 'Sıfırla', accelerator: 'CmdOrCtrl+0', role: 'resetZoom' },
                { type: 'separator' },
                { label: 'Tam Ekran', accelerator: 'F11', role: 'togglefullscreen' },
                { type: 'separator' },
                {
                    label: 'Geliştirici Araçları',
                    accelerator: 'CmdOrCtrl+Shift+I',
                    click: () => {
                        mainWindow.webContents.toggleDevTools();
                    }
                }
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
                { type: 'separator' },
                {
                    label: 'Hakkında',
                    click: () => {
                        dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: 'Hakkında',
                            message: 'TETA Kazan - Malzeme Hesaplama Sistemi',
                            detail: 'Versiyon: 3.0.0\n\n2025 TETA Kazan\nMurat KARA tarafından hazırlanmıştır.',
                            buttons: ['Tamam']
                        });
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
}

// IPC İşleyicileri

// Excel kaydetme dialogu - GÜNCELLENDI
ipcMain.handle('save-excel-dialog', async (event, options) => {
    const settings = loadSettings();
    
    const result = await dialog.showSaveDialog(mainWindow, {
        title: 'Excel Dosyasını Kaydet',
        defaultPath: path.join(settings.lastSaveDirectory, options.dosyaAdi + '.xlsx'),
        filters: [
            { name: 'Excel Dosyaları', extensions: ['xlsx'] },
            { name: 'Tüm Dosyalar', extensions: ['*'] }
        ]
    });
    
    // Eğer kayıt yapıldıysa klasörü hatırla
    if (!result.canceled && result.filePath) {
        const directory = path.dirname(result.filePath);
        settings.lastSaveDirectory = directory;
        saveSettings(settings);
    }
    
    return result;
});

// Excel açma dialogu - GÜNCELLENDI  
ipcMain.handle('open-excel-dialog', async () => {
    const settings = loadSettings();
    
    const result = await dialog.showOpenDialog(mainWindow, {
        title: 'Excel Dosyası Seç',
        defaultPath: settings.lastSaveDirectory,
        filters: [
            { name: 'Excel Dosyaları', extensions: ['xlsx', 'xls'] },
            { name: 'Tüm Dosyalar', extensions: ['*'] }
        ],
        properties: ['openFile']
    });
    
    // Eğer dosya seçildiyse klasörü hatırla
    if (!result.canceled && result.filePaths && result.filePaths.length > 0) {
        const directory = path.dirname(result.filePaths[0]);
        settings.lastSaveDirectory = directory;
        saveSettings(settings);
    }
    
    return result;
});

// Uygulama verilerini kaydetme
ipcMain.handle('save-data', async (event, data) => {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
        return { success: true };
    } catch (error) {
        console.error('Veri kaydetme hatası:', error);
        return { success: false, error: error.message };
    }
});

// Uygulama verilerini yükleme
ipcMain.handle('load-data', async () => {
    try {
        if (fs.existsSync(dataFilePath)) {
            const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
            return { success: true, data };
        }
        return { success: false };
    } catch (error) {
        console.error('Veri yükleme hatası:', error);
        return { success: false, error: error.message };
    }
});

// Hata mesajı gösterme
ipcMain.handle('show-error-dialog', async (event, title, content) => {
    dialog.showErrorBox(title, content);
});

// Bilgi mesajı gösterme
ipcMain.handle('show-message-dialog', async (event, options) => {
    return dialog.showMessageBox(mainWindow, options);
});

// Uygulama hazır olduğunda
app.whenReady().then(() => {
    createWindow();
    
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Tüm pencereler kapandığında
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Güvenlik için ek ayarlar
app.on('web-contents-created', (event, contents) => {
    contents.on('new-window', (event, navigationUrl) => {
        event.preventDefault();
    });
});