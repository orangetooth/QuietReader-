const { dialog } = require('electron');
const fs = require('fs');

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