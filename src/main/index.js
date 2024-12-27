const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const { createContextMenu } = require('./menu');

let windowWidth = 800;
let windowHeight = 600;
let win;
let isDragging = false;

function createWindow() {
    win = new BrowserWindow({
        width: windowWidth,
        height: windowHeight,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, '../preload.js') // Consider adding a preload script
        },
    });

    win.on('resize', () => {
        if (!isDragging) {
            const [width, height] = win.getSize();
            windowWidth = width;
            windowHeight = height;
        }
    });

    win.loadFile(path.join(__dirname, '../renderer/reader/index.html'));
    createContextMenu(win);
}

app.whenReady().then(createWindow);

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
        win.setBounds({
            width: windowWidth,
            height: windowHeight,
            x: screenX - offsetX,
            y: screenY - offsetY
        });
    }
    isDragging = false;
});