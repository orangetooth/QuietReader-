const { ipcRenderer } = require('electron');

const overlay = document.querySelector('#overlay');
let isDragging = false;
let offsetX, offsetY;

overlay.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX;
    offsetY = e.clientY;
});

overlay.addEventListener('mousemove', (e) => {
    if (isDragging) {
        ipcRenderer.send('window-drag', {
            screenX: e.screenX,
            screenY: e.screenY,
            offsetX: offsetX,
            offsetY: offsetY,
        });
    }
});

overlay.addEventListener('mouseup', () => {
    isDragging = false;
});

overlay.addEventListener('wheel', (e) => {
    // 阻止默认行为
    e.preventDefault();

    // 获取 textarea 元素
    const textarea = document.getElementById('novel-content');

    // 将滚动事件传递给 textarea
    textarea.scrollTop += e.deltaY;
}, { passive: false });

overlay.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    ipcRenderer.send('show-context-menu');
});