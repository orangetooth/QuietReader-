const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const fs = require('fs');
const path = require('path');
const { openFile } = require('./src/utils/fileUtils');
const contextMenu = require('./src/menu/contextMenu');

const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 600;

let win;

function createWindow() {
    win = new BrowserWindow({
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();
    contextMenu.createContextMenu(win); // 创建右键菜单
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.on('window-drag', (event, { screenX, screenY, offsetX, offsetY }) => {
    if (win) {
        const logicalX = screenX - offsetX;
        const logicalY = screenY - offsetY;

        win.setBounds({
            width: WINDOW_WIDTH,
            height: WINDOW_HEIGHT,
            x: logicalX,
            y: logicalY
        });
    }
});