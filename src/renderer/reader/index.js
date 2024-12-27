// src/renderer/reader/index.js
const { ipcRenderer } = require('electron');

const overlay = document.querySelector('#overlay');
const textarea = document.getElementById('novel-content');
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
    e.preventDefault();
    textarea.scrollTop += e.deltaY;
}, { passive: false });

overlay.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    ipcRenderer.send('show-context-menu');
});

ipcRenderer.on('apply-text-settings', (event, settings) => {
    if (settings.fontSize) {
        textarea.style.fontSize = settings.fontSize;
    }
    if (settings.fontColor) {
        textarea.style.color = settings.fontColor;
    }
    if (settings.lineHeight) {
        textarea.style.lineHeight = settings.lineHeight;
    }
    if (settings.letterSpacing) {
        textarea.style.letterSpacing = settings.letterSpacing;
    }
});

ipcRenderer.on('set-novel-content', (event, content) => {
    textarea.value = content;
});