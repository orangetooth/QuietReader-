const { ipcMain, Menu, app, dialog } = require('electron');
const { openFile } = require('../utils/fileUtils');

function createContextMenu(mainWindow) {
    const template = [
        {
            label: '打开文件',
            click: async () => {
                const content = await openFile(mainWindow);
                if (content) {
                    mainWindow.webContents.executeJavaScript(`document.getElementById('novel-content').value = \`${content}\``);
                }
            }
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