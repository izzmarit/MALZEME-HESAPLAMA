(function(window) {
    'use strict';
    
    const { ipcRenderer } = require('electron');
    
    const ModuleLoader = {
        loadedModules: new Set(),
        moduleInfo: new Map(),
        
        async initialize() {
            console.log('ModuleLoader başlatılıyor...');
            
            try {
                await this.loadInstalledModules();
                console.log(`${this.loadedModules.size} modül yüklendi`);
            } catch (error) {
                console.error('Modül yükleme hatası:', error);
            }
        },

        async loadInstalledModules() {
            const result = await ipcRenderer.invoke('get-installed-modules');
            
            if (!result.success) {
                console.error('Modüller alınamadı:', result.error);
                return;
            }
            
            for (const moduleInfo of result.modules) {
                await this.loadModule(moduleInfo);
            }
        },

        async loadModule(moduleInfo) {
            if (this.loadedModules.has(moduleInfo.name)) {
                console.log(`Modül zaten yüklü: ${moduleInfo.name}`);
                return false;
            }
            
            try {
                const script = document.createElement('script');
                script.src = `file://${moduleInfo.path}`;
                script.dataset.moduleName = moduleInfo.name;
                
                return new Promise((resolve, reject) => {
                    script.onload = () => {
                        this.loadedModules.add(moduleInfo.name);
                        this.moduleInfo.set(moduleInfo.name, moduleInfo);
                        console.log(`Modül yüklendi: ${moduleInfo.name}`);
                        resolve(true);
                    };
                    
                    script.onerror = () => {
                        console.error(`Modül yüklenemedi: ${moduleInfo.name}`);
                        reject(new Error(`Modül yüklenemedi: ${moduleInfo.name}`));
                    };
                    
                    document.head.appendChild(script);
                });
                
            } catch (error) {
                console.error(`Modül yükleme hatası: ${moduleInfo.name}`, error);
                return false;
            }
        },

        async installModule(filePath) {
            try {
                const result = await ipcRenderer.invoke('install-module', filePath);
                
                if (!result.success) {
                    throw new Error(result.error);
                }
                
                // Modülü yükle
                await this.loadModule({
                    name: result.moduleName,
                    path: result.path
                });
                
                window.UIManager.showNotification(
                    `Modül yüklendi: ${result.moduleName}`, 
                    'success'
                );
                
                return true;
                
            } catch (error) {
                window.UIManager.showNotification(
                    `Modül yüklenemedi: ${error.message}`, 
                    'error'
                );
                return false;
            }
        },

        async uninstallModule(moduleName) {
            try {
                const result = await ipcRenderer.invoke('uninstall-module', moduleName);
                
                if (!result.success) {
                    throw new Error(result.error);
                }
                
                window.UIManager.showNotification(
                    'Modül kaldırıldı. Program yeniden başlatılmalı.', 
                    'warning'
                );
                
                setTimeout(() => {
                    location.reload();
                }, 2000);
                
                return true;
                
            } catch (error) {
                window.UIManager.showNotification(
                    `Modül kaldırılamadı: ${error.message}`, 
                    'error'
                );
                return false;
            }
        },

        async showAddModuleDialog() {
            const result = await ipcRenderer.invoke('select-module-file');
            
            if (!result.canceled && result.filePaths.length > 0) {
                await this.installModule(result.filePaths[0]);
            }
        },

        showRemoveModuleDialog() {
            const modules = this.getLoadedModules();
            
            if (modules.length === 0) {
                window.UIManager.showNotification('Kaldırılacak modül yok', 'info');
                return;
            }
            
            const modalContent = `
                <div style="min-height: 200px;">
                    <h3 style="margin-bottom: 20px;">Kaldırılacak Modülü Seçin</h3>
                    <select id="moduleToRemove" style="width: 100%; padding: 10px; 
                            margin-bottom: 20px; border: 2px solid #e2e8f0; 
                            border-radius: 6px;">
                        ${modules.map(m => `<option value="${m.name}">${m.name}</option>`).join('')}
                    </select>
                    <div style="display: flex; gap: 10px;">
                        <button onclick="ModuleLoader.removeSelectedModule()" 
                                style="flex: 1; padding: 10px 20px; background: #f56565; 
                                       color: white; border: none; border-radius: 6px; 
                                       cursor: pointer;">Kaldır</button>
                        <button onclick="UIManager.closeModal()" 
                                style="flex: 1; padding: 10px 20px; background: #718096; 
                                       color: white; border: none; border-radius: 6px; 
                                       cursor: pointer;">İptal</button>
                    </div>
                </div>
            `;
            
            window.UIManager.showModal('Modül Kaldır', modalContent);
        },

        async removeSelectedModule() {
            const select = document.getElementById('moduleToRemove');
            if (select) {
                const moduleName = select.value;
                window.UIManager.closeModal();
                await this.uninstallModule(moduleName);
            }
        },

        getLoadedModules() {
            const modules = [];
            this.moduleInfo.forEach((info, name) => {
                modules.push({
                    name: name,
                    ...info
                });
            });
            return modules;
        }
    };

    window.ModuleLoader = ModuleLoader;

})(window);