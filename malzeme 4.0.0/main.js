const { app, BrowserWindow, Menu, dialog, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let isDev = process.env.NODE_ENV === 'development';

const userDataPath = app.getPath('userData');
const modulesPath = path.join(userDataPath, 'modules');
const dataFilePath = path.join(userDataPath, 'appData.json');
const settingsFilePath = path.join(userDataPath, 'settings.json');

// Modül klasörünü oluştur
if (!fs.existsSync(modulesPath)) {
    fs.mkdirSync(modulesPath, { recursive: true });
}

function loadSettings() {
    try {
        if (fs.existsSync(settingsFilePath)) {
            return JSON.parse(fs.readFileSync(settingsFilePath, 'utf8'));
        }
    } catch (error) {
        console.error('Ayarlar yüklenemedi:', error);
    }
    return {
        lastSaveDirectory: app.getPath('documents'),
        language: 'tr'
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

    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1200,
        minHeight: 700,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: !isDev
        },
        icon: path.join(__dirname, 'assets/icon.ico'),
        title: 'TETA Malzeme Hesaplama Sistemi v4.0'
    });

    mainWindow.loadFile('index.html');

    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.once('ready-to-show', () => {
        setTimeout(() => {
            splashWindow.close();
            splashWindow = null;
            mainWindow.show();
            mainWindow.focus();
        }, 2500);
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    createMenu();
}

function createMenu() {
    const menuTemplate = [
        {
            label: 'Dosya',
            submenu: [
                {
                    label: 'Yeni',
                    accelerator: 'CmdOrCtrl+N',
                    click: () => mainWindow.webContents.send('menu-new')
                },
                { type: 'separator' },
                {
                    label: 'Excel Aç',
                    accelerator: 'CmdOrCtrl+O',
                    click: () => mainWindow.webContents.send('menu-open-excel')
                },
                {
                    label: 'Excel Kaydet',
                    accelerator: 'CmdOrCtrl+S',
                    click: () => mainWindow.webContents.send('menu-save-excel')
                },
                { type: 'separator' },
                {
                    label: 'Çıkış',
                    accelerator: 'CmdOrCtrl+Q',
                    click: () => app.quit()
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
            label: 'Modüller',
            submenu: [
                {
                    label: 'Modül Ekle',
                    accelerator: 'CmdOrCtrl+M',
                    click: () => mainWindow.webContents.send('module-add')
                },
                {
                    label: 'Modül Kaldır',
                    click: () => mainWindow.webContents.send('module-remove')
                },
                { type: 'separator' },
                {
                    label: 'Modül Klasörünü Aç',
                    click: () => shell.openPath(modulesPath)
                }
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
                    click: () => mainWindow.webContents.toggleDevTools()
                }
            ]
        },
        {
            label: 'Yardım',
            submenu: [
                {
                    label: 'Kullanım Kılavuzu',
                    click: () => mainWindow.webContents.send('open-help')
                },
                { type: 'separator' },
                {
                    label: 'Hakkında',
                    click: () => {
                        dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: 'Hakkında',
                            message: 'TETA Malzeme Hesaplama Sistemi',
                            detail: 'Versiyon: 4.0.0\nTam Modüler Yapı\n\n© 2025 TETA Kazan\nGeliştirici: Murat KARA',
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

// IPC Handlers

ipcMain.handle('get-modules-path', () => {
    return modulesPath;
});

ipcMain.handle('get-installed-modules', async () => {
    try {
        const files = fs.readdirSync(modulesPath);
        const modules = files.filter(file => file.endsWith('.js'));
        
        const moduleInfo = modules.map(moduleName => {
            const modulePath = path.join(modulesPath, moduleName);
            const stats = fs.statSync(modulePath);
            return {
                name: moduleName,
                path: modulePath,
                size: stats.size,
                modified: stats.mtime
            };
        });
        
        return { success: true, modules: moduleInfo };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('install-module', async (event, sourcePath) => {
    try {
        const fileName = path.basename(sourcePath);
        const targetPath = path.join(modulesPath, fileName);
        
        // Modül dosyasını kopyala
        fs.copyFileSync(sourcePath, targetPath);
        
        return { 
            success: true, 
            moduleName: fileName,
            path: targetPath 
        };
    } catch (error) {
        return { 
            success: false, 
            error: error.message 
        };
    }
});

ipcMain.handle('uninstall-module', async (event, moduleName) => {
    try {
        const modulePath = path.join(modulesPath, moduleName);
        
        if (fs.existsSync(modulePath)) {
            fs.unlinkSync(modulePath);
            return { success: true };
        } else {
            return { 
                success: false, 
                error: 'Modül dosyası bulunamadı' 
            };
        }
    } catch (error) {
        return { 
            success: false, 
            error: error.message 
        };
    }
});

ipcMain.handle('select-module-file', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        title: 'Modül Dosyası Seç',
        filters: [
            { name: 'JavaScript Modülleri', extensions: ['js'] }
        ],
        properties: ['openFile']
    });
    
    return result;
});

ipcMain.handle('save-excel-dialog', async (event, options) => {
    const settings = loadSettings();
    
    const result = await dialog.showSaveDialog(mainWindow, {
        title: 'Excel Dosyasını Kaydet',
        defaultPath: path.join(settings.lastSaveDirectory, options.dosyaAdi + '.xlsx'),
        filters: [
            { name: 'Excel Dosyaları', extensions: ['xlsx'] }
        ]
    });
    
    if (!result.canceled && result.filePath) {
        const directory = path.dirname(result.filePath);
        settings.lastSaveDirectory = directory;
        saveSettings(settings);
    }
    
    return result;
});

ipcMain.handle('open-excel-dialog', async () => {
    const settings = loadSettings();
    
    const result = await dialog.showOpenDialog(mainWindow, {
        title: 'Excel Dosyası Seç',
        defaultPath: settings.lastSaveDirectory,
        filters: [
            { name: 'Excel Dosyaları', extensions: ['xlsx', 'xls'] }
        ],
        properties: ['openFile']
    });
    
    if (!result.canceled && result.filePaths && result.filePaths.length > 0) {
        const directory = path.dirname(result.filePaths[0]);
        settings.lastSaveDirectory = directory;
        saveSettings(settings);
    }
    
    return result;
});

ipcMain.handle('save-data', async (event, data) => {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('load-data', async () => {
    try {
        if (fs.existsSync(dataFilePath)) {
            const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
            return { success: true, data };
        }
        return { success: false };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

app.whenReady().then(() => {
    createWindow();
    
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});