const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

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
                        detail: 'Versiyon: 1.0.0\n\n© 2025 TETA Kazan\n\nMalzeme hesaplama ve yönetimi için MURAT KARA tarafından geliştirilmiştir.',
                        buttons: ['Tamam']
                    });
                }
            }
        ]
    }
];

function createWindow() {
    // Ana pencereyi oluştur
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1200,
        minHeight: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false
        },
        icon: path.join(__dirname, 'src/assets/icon.png'),
        title: 'Malzeme Hesaplama Sistemi'
    });

    // index.html dosyasını yükle
    mainWindow.loadFile('src/index.html');

    // Menüyü ayarla
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);

    // Pencere kapatıldığında
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Başlangıçta maximize et
    mainWindow.maximize();
}

// Uygulama hazır olduğunda
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Tüm pencereler kapatıldığında
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// IPC Event Handlers
ipcMain.handle('save-excel-dialog', async () => {
    const result = await dialog.showSaveDialog(mainWindow, {
        title: 'Excel Dosyasını Kaydet',
        defaultPath: `malzeme_listesi_${new Date().toLocaleDateString('tr-TR').replace(/\./g, '_')}.xlsx`,
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