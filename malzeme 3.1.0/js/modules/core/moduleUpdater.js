 (function(window) {
    'use strict';   
    
    const ModuleUpdater = {
        checkForUpdates: async function() {
            try {
                // Yüklü modüllerin versiyonlarını kontrol et
                const installedModules = await this.getInstalledModules();
                const updateServer = 'https://your-update-server.com/modules'; // Güncelleme sunucusu
                
                const updates = [];
                
                for (const module of installedModules) {
                    const response = await fetch(`${updateServer}/${module.name}/version.json`);
                    if (response.ok) {
                        const remoteVersion = await response.json();
                        
                        if (this.compareVersions(module.version, remoteVersion.version) < 0) {
                            updates.push({
                                name: module.name,
                                currentVersion: module.version,
                                newVersion: remoteVersion.version,
                                downloadUrl: remoteVersion.downloadUrl,
                                changelog: remoteVersion.changelog
                            });
                        }
                    }
                }
                
                return updates;
            } catch (error) {
                console.error('Güncelleme kontrolü hatası:', error);
                return [];
            }
        },
        
        compareVersions: function(v1, v2) {
            const parts1 = v1.split('.').map(Number);
            const parts2 = v2.split('.').map(Number);
            
            for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
                const part1 = parts1[i] || 0;
                const part2 = parts2[i] || 0;
                
                if (part1 < part2) return -1;
                if (part1 > part2) return 1;
            }
            
            return 0;
        },
        
        installUpdate: async function(update) {
            try {
                // Güncelleme dosyasını indir
                const response = await fetch(update.downloadUrl);
                const moduleContent = await response.text();
                
                // Modülü güncelle
                const result = await ipcRenderer.invoke('install-module-content', {
                    name: update.name,
                    content: moduleContent,
                    version: update.newVersion
                });
                
                if (result.success) {
                    window.UIManager?.showNotification(
                        `${update.name} modülü ${update.newVersion} versiyonuna güncellendi`,
                        'success'
                    );
                    
                    // Sayfayı yenile
                    setTimeout(() => location.reload(), 2000);
                }
                
            } catch (error) {
                console.error('Güncelleme kurulum hatası:', error);
                window.UIManager?.showNotification(
                    'Güncelleme kurulamadı: ' + error.message,
                    'error'
                );
            }
        },
        
        getInstalledModules: async function() {
            const customModules = ModuleLoader.customModules;
            const modules = [];
            
            for (const moduleName of customModules) {
                // Her modülün version bilgisini al
                try {
                    const MaterialClass = window.MaterialRegistry.get(moduleName.replace('.js', ''));
                    if (MaterialClass) {
                        const instance = new MaterialClass();
                        modules.push({
                            name: moduleName,
                            version: instance.version || '1.0.0'
                        });
                    }
                } catch (e) {
                    // Version bilgisi yoksa varsayılan kullan
                    modules.push({
                        name: moduleName,
                        version: '1.0.0'
                    });
                }
            }
            
            return modules;
        },
        
        showUpdateDialog: async function() {
            const updates = await this.checkForUpdates();
            
            if (updates.length === 0) {
                window.UIManager?.showNotification('Tüm modüller güncel', 'info');
                return;
            }
            
            const modalHtml = `
                <div class="modal" style="display: block;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2>🔄 Modül Güncellemeleri</h2>
                            <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
                        </div>
                        <div class="modal-body">
                            <p style="margin-bottom: 20px;">
                                ${updates.length} modül güncellemesi mevcut:
                            </p>
                            ${updates.map(update => `
                                <div style="background: #f7fafc; padding: 15px; 
                                            border-radius: 8px; margin-bottom: 15px;">
                                    <h3 style="margin-bottom: 10px;">${update.name}</h3>
                                    <p>Mevcut: v${update.currentVersion} → Yeni: v${update.newVersion}</p>
                                    ${update.changelog ? 
                                        `<p style="margin-top: 10px; font-size: 0.9rem;">
                                            <strong>Değişiklikler:</strong><br>
                                            ${update.changelog}
                                        </p>` : ''
                                    }
                                    <button onclick="ModuleUpdater.installUpdate(${JSON.stringify(update)})" 
                                            style="margin-top: 10px; padding: 8px 16px; 
                                                background: #667eea; color: white; 
                                                border: none; border-radius: 4px; 
                                                cursor: pointer;">
                                        Güncelle
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
            
            const modalDiv = document.createElement('div');
            modalDiv.innerHTML = modalHtml;
            document.body.appendChild(modalDiv.firstElementChild);
        }
    };

    // IPC listener ekle
    ipcRenderer.on('update-modules', () => {
        ModuleUpdater.showUpdateDialog();
    });

    // Global erişim için
    window.ModuleUpdater = ModuleUpdater;

})(window);    