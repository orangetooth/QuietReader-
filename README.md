>  在工作时也能偷偷阅读心爱的小说，一个简洁、可自定义的桌面小说阅读器。

## 简介

这是一个基于 Electron 的桌面应用程序，旨在提供一个简洁、无干扰的小说阅读体验。灵感来源于在工作时也能轻松阅读的需求，它提供了一些基本的文本自定义功能，并允许用户打开本地的 `.txt` 文件进行阅读。

## 特性

*   **打开本地文件**: 支持打开本地的 `.txt` 文本文件进行阅读。
*   **文本自定义**:
    *   **字体大小**:  可调整字体大小以适应您的阅读偏好。
    *   **字体颜色**:  可选择不同的字体颜色，减轻视觉疲劳。
    *   **行高**:  调整行高，让阅读更舒适。
    *   **字间距**:  自定义字间距，优化阅读体验。
*   **窗口拖动**:  可以通过拖动顶部覆盖层来移动窗口，方便调整位置。
*   **右键菜单**:  提供右键菜单，方便进行 "打开文件"、"文字调整" 和 "退出" 操作。
*   **简洁界面**:  去除边框的简洁设计，专注于内容阅读。
*   **鼠标滚轮滚动**: 支持鼠标滚轮滚动阅读内容。

## 快速开始

### 前置条件

确保您已经安装了 [Node.js](https://nodejs.org/) 和 npm (或者 yarn)。

### 安装步骤

1. **克隆仓库**

    ```bash
    git clone <你的仓库地址>
    cd novel-reader
    ```

2. **安装依赖**

    ```bash
    npm install
    ```

3. **运行应用**

    ```bash
    npm start
    ```

    或者

    ```bash
    yarn start
    ```

## 使用方法

1. **打开文件**:  点击右键，选择 "打开文件"，然后选择您想要阅读的 `.txt` 文件。
2. **调整文字**:  点击右键，选择 "文字调整"，然后在子菜单中选择您需要的字体大小、颜色、行高或字间距。
3. **拖动窗口**:  按住窗口顶部的透明覆盖层 (`overlay`) 并拖动，即可移动窗口。
4. **滚动阅读**:  使用鼠标滚轮向上或向下滚动来阅读小说内容。
5. **退出应用**:  点击右键，选择 "退出" 来关闭应用程序。

## 项目结构

novel-reader/
├── package.json
├── src/
│ ├── main/
│ │ ├── dialog.js # 文件打开对话框相关逻辑
│ │ ├── index.js # 主进程入口文件
│ │ └── menu.js # 应用程序菜单和上下文菜单逻辑
│ └── renderer/
│ └── reader/
│ ├── index.html # 渲染进程 HTML 文件
│ ├── index.js # 渲染进程 JavaScript 文件
│ └── style.css # 渲染进程 CSS 样式表
└── README.md

## 技术栈

*   [Electron](https://www.electronjs.org/): 用于构建跨平台桌面应用
*   [Node.js](https://nodejs.org/): 运行时环境
*   [npm](https://www.npmjs.com/) / [Yarn](https://yarnpkg.com/): 包管理器

## 贡献

欢迎提交 issue 和 pull request，一起改进这个项目！

## 许可证

[ISC](LICENSE)  <!-- 如果您创建了 LICENSE 文件 -->