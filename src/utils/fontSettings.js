const { ipcMain } = require('electron');

const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px'];
const fontColors = [
    '#000000', '#1a1a1a', '#333333', '#4d4d4d', '#666666', '#808080'
];
const lineHeights = ['1.4', '1.6', '1.8', '2.0', '2.2'];
const letterSpacings = ['0', '0.05em', '0.1em', '0.15em', '0.2em'];

function applySettings(mainWindow, settings) {
    const script = `
        var textarea = document.getElementById('novel-content');
        ${settings.fontSize ? `textarea.style.fontSize = '${settings.fontSize}';` : ''}
        ${settings.fontColor ? `textarea.style.color = '${settings.fontColor}';` : ''}
        ${settings.lineHeight ? `textarea.style.lineHeight = '${settings.lineHeight}';` : ''}
        ${settings.letterSpacing ? `textarea.style.letterSpacing = '${settings.letterSpacing}';` : ''}
    `;
    mainWindow.webContents.executeJavaScript(script);
}

function createFontSubmenu(mainWindow) {
    return [
        {
            label: '字体大小',
            submenu: fontSizes.map(size => ({
                label: size,
                click: () => applySettings(mainWindow, { fontSize: size })
            }))
        },
        {
            label: '字体颜色',
            submenu: fontColors.map(color => ({
                label: color,
                click: () => applySettings(mainWindow, { fontColor: color })
            }))
        },
        {
            label: '行高',
            submenu: lineHeights.map(height => ({
                label: height,
                click: () => applySettings(mainWindow, { lineHeight: height })
            }))
        },
        {
            label: '字间距',
            submenu: letterSpacings.map(spacing => ({
                label: spacing,
                click: () => applySettings(mainWindow, { letterSpacing: spacing })
            }))
        }
    ];
}

module.exports = {
    createFontSubmenu,
    applySettings,
    fontSizes,
    fontColors,
    lineHeights,
    letterSpacings
};