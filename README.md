# Murasame Pet - Desktop Sprite Interaction System

[![Go Version](https://img.shields.io/badge/Go-1.18%2B-blue.svg)](https://golang.org/)
[![Wails Version](https://img.shields.io/badge/Wails-v2-red.svg)](https://wails.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)  <!-- 你可以根据实际情况选择或移除 License 徽章 -->

基于 Go 语言和 Wails v2 框架开发的桌面互动精灵应用，以《千恋＊万花》中的角色 **丛雨 (Murasame)** 为主题，利用 Live2D 技术实现生动的交互体验。

本项目旨在展示如何结合 Go 的高性能后端与现代 Web 前端技术栈，构建低资源占用、功能丰富的桌面应用程序。

## ✨ 特性亮点 (Features)

*   **Live2D 渲染:** 通过 Live2D Cubism Web SDK 精确控制丛雨的角色动画和表情切换。
*   **多状态反馈:** 实现常态、注视、交互反馈、睡眠、拖拽等多种状态及对应的情感表现。
*   **互动语音:** 响应用户连续点击（带时间窗口算法），触发多级语音反馈。
*   **音频系统:** 使用 Go `beep` 库异步播放 WAV 格式的角色语音和音效，支持全局静音。
*   **桌面交互:** 实现窗口的透明穿透、桌面随机行走和拖拽跟随效果。
*   **高效通信:** 利用 Wails 的 Go-JavaScript 桥接实现前后端低延迟通信。
*   **状态管理:** 使用 Go Structs 和 Methods 构建清晰的角色状态机。

## 🛠️ 技术栈 (Technology Stack)

*   **后端:** Go (Goroutines & Channels)
*   **框架:** Wails v2
*   **前端:** JavaScript
*   **渲染:** Live2D Cubism Web SDK
*   **音频:** Go `beep` library

## ⚙️ 先决条件 (Prerequisites)

在运行本项目之前，请确保你的系统已经安装了以下依赖：

1.  **Go:** 版本 1.18 或更高。 ([Go 安装指南](https://go.dev/doc/install))
2.  **Node.js 和 npm:** 需要 Node.js (LTS 版本推荐) 和其自带的 npm 包管理器。 ([Node.js 安装指南](https://nodejs.org/))
3.  **Wails CLI:** Wails 命令行工具。请根据你的操作系统按照 [Wails 官方安装指南](https://wails.io/docs/gettingstarted/installation) 进行安装。
    *   **重要:** 安装 Wails CLI 后，务必运行 `wails doctor` 命令检查并根据提示安装所需的系统依赖（如 C 编译器、库、WebView2 Runtime (Windows) 等）。

## 🚀 运行应用 (Running the Application)

1.  **克隆仓库:**
    ```bash
    git clone https://github.com/NANYUYIBEI/murasame-pet.git
    ```

2.  **进入项目目录:**
    ```bash
    cd murasame-pet
    ```

3.  **安装前端依赖 (如果需要单独安装):**
    *(通常 `wails dev` 会自动处理，但如果遇到问题可以尝试手动执行)*
    ```bash
    cd frontend
    npm install
    cd ..
    ```
    *注意: 根据我们之前的讨论，`npm install @live2d/cubism-core` 等包可能存在问题。此步骤可能会失败或需要特殊网络环境。*

4.  **运行开发模式:**
    此命令会编译 Go 代码，处理前端资源，并以开发模式启动应用（支持热重载）。
    ```bash
    wails dev
    ```
    如果一切顺利，你应该能看到丛雨出现在你的桌面上。

5.  **(可选) 构建生产版本:**
    构建一个独立的可执行文件。
    ```bash
    wails build
    ```
    构建成功后，应用程序会位于 `build/bin/` 目录下。

---

**注意:** Live2D 相关的前端依赖 (`@live2d/cubism-core` 等) 的安装可能因为网络问题而失败。我们在之前的调试中遇到了此问题。如果 `wails dev` 或 `npm install` 在此步骤卡住或报错 404，可能需要进一步的网络排查或寻找替代方案。
