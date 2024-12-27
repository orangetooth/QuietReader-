const { dialog } = require('electron');
const fs = require('fs');

/**
 * 打开文件对话框并读取所选文件的内容
 * @param {BrowserWindow} mainWindow - 主窗口实例
 * @returns {Promise<string|null>} 返回文件内容字符串，如果用户取消或发生错误则返回null
 * @throws {Error} 当文件读取失败时抛出错误
 * @description 该函数会打开一个文件选择对话框，允许用户选择.txt文件或其他类型的文件。
 * 选择文件后会读取其内容并返回。如果在读取过程中发生错误，将显示错误对话框。
 */
async function openFile(mainWindow) {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [
            { name: 'Text Files', extensions: ['txt'] },
            { name: 'All Files', extensions: ['*'] }
        ]
    });

    if (!result.canceled && result.filePaths.length > 0) {
        const filePath = result.filePaths[0];
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            return content;
        } catch (error) {
            console.error('Error reading file:', error);
            dialog.showErrorBox('Error', `Failed to read file: ${error.message}`);
            return null;
        }
    }
    return null;
}

module.exports = { openFile };