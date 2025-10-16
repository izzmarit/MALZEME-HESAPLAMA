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
                <div style="min-height: 300px;">
                    <h3 style="margin-bottom: 20px; color: var(--gray-800);">
                        Kaldırılacak Modülleri Seçin
                    </h3>
                    
                    <div style="background: #f7fafc; padding: 12px; border-radius: 6px; 
                                margin-bottom: 15px; border: 2px solid #e2e8f0;">
                        <div style="display: flex; gap: 10px; justify-content: space-between;">
                            <button onclick="ModuleLoader.selectAllModules()" 
                                    style="flex: 1; padding: 8px 15px; background: #667eea; 
                                        color: white; border: none; border-radius: 4px; 
                                        cursor: pointer; font-size: 0.85rem; font-weight: 600;">
                                ✓ Tümünü Seç
                            </button>
                            <button onclick="ModuleLoader.deselectAllModules()" 
                                    style="flex: 1; padding: 8px 15px; background: #718096; 
                                        color: white; border: none; border-radius: 4px; 
                                        cursor: pointer; font-size: 0.85rem; font-weight: 600;">
                                ✗ Seçimi Temizle
                            </button>
                        </div>
                    </div>
                    
                    <div id="moduleCheckboxContainer" 
                        style="border: 2px solid #e2e8f0; border-radius: 6px; 
                                background: white; max-height: 400px; overflow-y: auto;">
                        ${modules.map(m => `
                            <div style="display: flex; align-items: center; padding: 12px; 
                                        border-bottom: 1px solid #e2e8f0; transition: background 0.2s;"
                                onmouseover="this.style.background='#f7fafc'" 
                                onmouseout="this.style.background='white'">
                                <input type="checkbox" 
                                    id="module_${m.name}" 
                                    value="${m.name}" 
                                    class="module-checkbox"
                                    style="width: 18px; height: 18px; cursor: pointer; margin-right: 12px;">
                                <label for="module_${m.name}" 
                                    style="cursor: pointer; flex: 1; font-size: 0.95rem; 
                                            color: #2d3748; display: flex; flex-direction: column;">
                                    <span style="font-weight: 600;">${m.name}</span>
                                    <span style="font-size: 0.8rem; color: #718096; margin-top: 4px;">
                                        Boyut: ${(m.size / 1024).toFixed(2)} KB | 
                                        Tarih: ${new Date(m.modified).toLocaleDateString('tr-TR')}
                                    </span>
                                </label>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div style="margin-top: 20px; padding: 12px; background: #fff3cd; 
                                border-radius: 6px; border-left: 4px solid #ed8936;">
                        <strong>⚠️ Uyarı:</strong> Seçilen modüller kalıcı olarak kaldırılacaktır. 
                        Program yeniden başlatılacaktır.
                    </div>
                    
                    <div style="display: flex; gap: 10px; margin-top: 20px;">
                        <button onclick="ModuleLoader.removeSelectedModules()" 
                                style="flex: 1; padding: 12px 20px; background: #f56565; 
                                        color: white; border: none; border-radius: 6px; 
                                        cursor: pointer; font-weight: 600; font-size: 0.95rem;">
                            🗑️ Seçilenleri Kaldır
                        </button>
                        <button onclick="UIManager.closeModal()" 
                                style="flex: 1; padding: 12px 20px; background: #718096; 
                                        color: white; border: none; border-radius: 6px; 
                                        cursor: pointer; font-weight: 600; font-size: 0.95rem;">
                            İptal
                        </button>
                    </div>
                </div>
            `;
            
            window.UIManager.showModal('Modül Kaldırma', modalContent, { width: '600px' });
        },

        selectAllModules() {
            const checkboxes = document.querySelectorAll('.module-checkbox');
            checkboxes.forEach(cb => cb.checked = true);
        },

        deselectAllModules() {
            const checkboxes = document.querySelectorAll('.module-checkbox');
            checkboxes.forEach(cb => cb.checked = false);
        },

        async removeSelectedModules() {
            const checkboxes = document.querySelectorAll('.module-checkbox:checked');
            const selectedModules = Array.from(checkboxes).map(cb => cb.value);
            
            if (selectedModules.length === 0) {
                window.UIManager.showNotification('Lütfen en az bir modül seçin', 'warning');
                return;
            }
            
            window.UIManager.confirmAction(
                `${selectedModules.length} modül kaldırılacak. Devam etmek istiyor musunuz?`,
                async () => {
                    window.UIManager.closeModal();
                    
                    let successCount = 0;
                    let failCount = 0;
                    
                    for (const moduleName of selectedModules) {
                        try {
                            const result = await ipcRenderer.invoke('uninstall-module', moduleName);
                            if (result.success) {
                                successCount++;
                            } else {
                                failCount++;
                            }
                        } catch (error) {
                            failCount++;
                            console.error(`Modül kaldırma hatası: ${moduleName}`, error);
                        }
                    }
                    
                    if (successCount > 0) {
                        window.UIManager.showNotification(
                            `${successCount} modül kaldırıldı. Program yeniden başlatılıyor...`, 
                            'success'
                        );
                        
                        setTimeout(() => {
                            location.reload();
                        }, 2000);
                    }
                    
                    if (failCount > 0) {
                        window.UIManager.showNotification(
                            `${failCount} modül kaldırılamadı`, 
                            'error'
                        );
                    }
                }
            );
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