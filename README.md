# Murasame Desktop Pet (Go + Wails + Live2D Attempt)

这是一个尝试使用 Go 语言、Wails v2 框架和 Live2D 技术构建的桌面宠物 "丛雨 (Murasame)" 项目。

## 目标功能

*   在桌面上显示 Live2D 形式的丛雨角色。
*   实现基本的交互逻辑 (点击、拖拽等)。
*   根据交互触发不同的表情和语音。
*   包含闲置/睡眠状态。

## 技术栈

*   **后端:** Go
*   **框架:** Wails v2
*   **前端:** HTML, CSS, JavaScript
*   **Live2D 渲染:**
    *   Pixi.JS
    *   `@live2d/cubism-core`
    *   `@live2d/cubism-framework`
    *   `@live2d/cubism-pixi-renderer`
*   **音频:** Go 音频库 (如 `oto` 或 `beep`)

## 前置条件

在运行此项目前，请确保你已安装：

1.  **Go:** [https://golang.org/dl/](https://golang.org/dl/)
2.  **Node.js & npm:** [https://nodejs.org/](https://nodejs.org/) (请下载 LTS 版本)
3.  **Wails CLI v2:**
    ```bash
    go install github.com/wailsapp/wails/v2/cmd/wails@latest
    ```
    *   确保 Go 的 bin 目录已添加到系统环境变量 `PATH` 中。
    *   运行 `wails doctor` 检查依赖是否齐全 (需要 C 编译器等)。

## 如何运行

1.  **克隆仓库:**
    ```bash
    git clone https://github.com/YourUsername/murasame-pet.git
    cd murasame-pet
    ```
    *(请将 `YourUsername` 替换为你的 GitHub 用户名)*

2.  **安装前端依赖:**
    *   进入 `frontend` 目录: `cd frontend`
    *   运行 `npm install`。 **<-- 注意：已知问题区域**
        *   **已知问题:** 在项目开发期间，尝试安装 `@live2d/*` 相关的 npm 包 (`@live2d/cubism-core`, `@live2d/cubism-framework`, `@live2d/cubism-pixi-renderer`) 时持续遇到 404 Not Found 错误，即使切换 npm 源也无效。浏览器直接访问包信息也失败，怀疑是特定网络环境问题。
        *   **理想情况:** `npm install` 应该成功安装所有在 `package.json` 中定义的依赖。
        *   **潜在解决方案 (若遇此问题):** 尝试更换网络环境 (如手机热点)、修改 DNS、手动下载 `.tgz` 包并本地安装 (`npm install <path-to-tgz>`)。
    *   返回项目根目录: `cd ..`

3.  **运行开发模式:**
    ```bash
    wails dev
    ```
    *   如果前端依赖安装成功，此命令会启动应用。



**(可选) 项目结构说明**

*   `main.go`: Go 程序入口。
*   `app.go`: Go 后端应用逻辑（目前为空）。
*   `go.mod`: Go 模块依赖。
*   `wails.json`: Wails 项目配置。
*   `frontend/`: 前端代码目录 (HTML, JS, CSS)。
    *   `frontend/public/assets/`: 存放 Live2D 模型和声音等静态资源。
*   `build/`: Wails 构建输出目录 (被 .gitignore 忽略)。
