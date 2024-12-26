const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const fs = require('fs');
const path = require('path');
const contextMenu = require('./src/menu/contextMenu');

let windowWidth = 800;
let windowHeight = 600;
let win;
let isDragging = false;

function createWindow() {
    win = new BrowserWindow({
        width: windowWidth,
        height: windowHeight,
        frame: false,
        // transparent: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    win.on('resize', () => {
        if (!isDragging) {
            const [width, height] = win.getSize();
            windowWidth = width;
            windowHeight = height;
        }
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
    isDragging = true;

    if (win) {
        const logicalX = screenX - offsetX;
        const logicalY = screenY - offsetY;

        win.setBounds({
            width: windowWidth,
            height: windowHeight,
            x: logicalX,
            y: logicalY
        });
    }

    isDragging = false;
});