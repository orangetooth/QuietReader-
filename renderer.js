const { ipcRenderer } = require('electron');

const dragRegion = document.querySelector('#novel-content');

let isDragging = false;
let offsetX, offsetY;

dragRegion.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX;
    offsetY = e.clientY;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        ipcRenderer.send('window-drag', {
            screenX: e.screenX,
            screenY: e.screenY,
            offsetX: offsetX,
            offsetY: offsetY,
        });
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

// 右键菜单事件
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    ipcRenderer.send('show-context-menu');
});