const { Menu, ipcMain, app } = require('electron');
const { openFile } = require('./dialog');

// Font settings
const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px'];
const fontColors = ['#000000', '#1a1a1a', '#333333', '#4d4d4d', '#666666', '#808080'];
const lineHeights = ['1.4', '1.6', '1.8', '2.0', '2.2'];
const letterSpacings = ['0', '0.05em', '0.1em', '0.15em', '0.2em'];

function applySettings(mainWindow, settings) {
    mainWindow.webContents.send('apply-text-settings', settings);
}

/**
 * 创建字体设置的子菜单
 * @param {Electron.BrowserWindow} mainWindow - 主窗口实例
 * @returns {Electron.MenuItemConstructorOptions[]} 包含字体设置选项的子菜单数组
 * @description 生成包含字体大小、颜色、行高和字间距设置的子菜单项。
 * 每个子菜单项点击时会通过applySettings函数应用相应的设置。
 */
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

/**
 * 创建并设置应用程序的右键菜单
 * @param {BrowserWindow} mainWindow - Electron的主窗口实例
 * @description 设置包含"打开文件"、"文字调整"和"退出"选项的右键菜单
 * 并处理其相关事件：
 * - 打开文件：调用openFile函数并发送内容到渲染进程
 * - 文字调整：创建字体调整子菜单
 * - 退出：关闭应用程序
 * @listens ipcMain#show-context-menu - 监听显示右键菜单的事件
 */
function createContextMenu(mainWindow) {
    const template = [
        {
            label: '打开文件',
            click: async () => {
                const content = await openFile(mainWindow);
                if (content) {
                    mainWindow.webContents.send('set-novel-content', content);
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
    ipcMain.on('show-context-menu', () => {
        menu.popup({ window: mainWindow });
    });
}

module.exports = { createContextMenu };