// src/menu/contextMenu.js
const { ipcMain, Menu, app, dialog } = require('electron');
const { openFile } = require('../utils/fileUtils');
const { createFontSubmenu } = require('../utils/fontSettings');

function createContextMenu(mainWindow) {
    const template = [
        {
            label: '打开文件',
            click: async () => {
                const content = await openFile(mainWindow);
                if (content) {
                    const escapedContent = JSON.stringify(content);
                    mainWindow.webContents.executeJavaScript(`document.getElementById('novel-content').value = ${escapedContent};`);
                }
            }
        },
        {
            label: '文字调整',
            submenu: createFontSubmenu(mainWindow)
        },
        {
            label: '退出',
            click: () => {
                app.quit();
            }
        }
    ];

    const menu = Menu.buildFromTemplate(template);

    ipcMain.on('show-context-menu', (event) => {
        menu.popup({ window: mainWindow });
    });
}

module.exports = { createContextMenu };