// 引入必要的库
import * as PIXI from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display'; // 使用 'pixi-live2d-display'

// 让 PixiJS 被 Live2D 框架知道 (必须)
window.PIXI = PIXI;

// 启动主逻辑
(async function main() {
    // 获取 canvas 元素
    const canvas = document.getElementById('live2d-canvas');
    if (!canvas) {
        console.error('错误：找不到 ID 为 "live2d-canvas" 的 canvas 元素！');
        return; // 在函数开头 return 是安全的
    }

    // 创建 PixiJS 应用
    const app = new PIXI.Application({
        view: canvas,
        autoStart: true,
        resizeTo: window,
        backgroundAlpha: 0, // 背景透明
    });

    // 模型文件路径 (相对于 public 目录)
    // !!! 再次确认这个路径和你的文件结构完全一致 !!!
    const modelPath = '/assets/live2d/murasame_v2/Murasame.model3.json';

    let model = null; // 先声明 model 变量

    // --- 尝试加载模型 ---
    try {
        console.log(`[PetApp] 尝试加载模型: ${modelPath}`);
        model = await Live2DModel.from(modelPath, { autoInteract: false }); // 加载模型
        console.log("[PetApp] 模型对象 (加载尝试后):", model);

        if (!model) {
             // 虽然 await 可能抛错，但以防万一它返回了 null/undefined
             console.error("[PetApp] 模型加载返回空，请检查路径和文件！");
        }

    } catch (error) {
        console.error("[PetApp] 加载 Live2D 模型时捕获到错误:", error);
        model = null; // 保证出错时 model 为 null
        alert(`加载模型时出错: ${error.message}\n请查看控制台获取详细日志！`);
    }

    // --- 只有模型加载成功后才进行后续操作 ---
    if (model) {
        try { // 将后续配置也放入 try...catch 以防万一
            console.log("[PetApp] 模型加载成功，开始配置...");

            // 添加到舞台
            app.stage.addChild(model);
            console.log("[PetApp] 模型已添加到舞台。");

            // --- 模型调整 ---
            function resizeModel() {
                 if (!model || model.height <= 0) {
                    console.warn("[PetApp] Resize: 模型尺寸无效，无法调整。");
                    return;
                 }
                 const targetHeight = app.screen.height * 0.8; // 期望模型占屏幕高度的 80%
                 const scale = targetHeight / model.height;
                 model.scale.set(scale);
                 model.x = (app.screen.width - model.width * scale) / 2; // 注意使用缩放后的宽度
                 model.y = app.screen.height - model.height * scale;   // 注意使用缩放后的高度
                 console.log(`[PetApp] Resize: 模型缩放=${scale.toFixed(2)}, 位置 x=${model.x.toFixed(0)}, y=${model.y.toFixed(0)}`);
            }

            // 初次调整
            // 可能需要稍微延迟执行，确保模型尺寸计算完成
            setTimeout(resizeModel, 100); // 延迟 100ms 尝试调整

            // 监听窗口大小变化，重新调整模型
            window.addEventListener('resize', resizeModel);

            // --- 尝试播放动画 ---
            // 'motion01' 是猜测的名字，需要核对你的 motion 文件夹内容
            try {
                console.log("[PetApp] 尝试播放动画 'motion01'");
                // pixi-live2d-display 的 motion() 可能需要组名，或者可能根据文件名智能查找
                // 先直接尝试按文件名播放
                await model.motion('motion01'); // 异步等待动画播放（如果方法支持）
                console.log("[PetApp] 动画 'motion01' 尝试启动。");
            } catch (e) {
                console.warn("[PetApp] 播放动画 'motion01' 失败:", e);
                // 可以尝试播放一个已知的内置动画组名，如 'Idle'
                // await model.motion('Idle');
            }

            // --- 添加点击事件 ---
            model.interactive = true; // 启用交互
            model.buttonMode = true;  // 显示鼠标指针为手形
            model.on('hit', (hitAreaNames) => { // 监听点击事件
                console.log(`[PetApp] 模型被点击! 区域: ${hitAreaNames.join(', ')}`);
                // 这里可以添加点击后的逻辑，比如随机表情或播放特定动画
                // 示例：如果点击区域包含 'Body' (需要你的模型有这个HitArea)
                if (hitAreaNames.includes('Body')) {
                    try {
                        // 尝试随机播放一个表情
                        const expressionKeys = Object.keys(model.expression()); // 获取所有表情实例
                        if (expressionKeys.length > 0) {
                             const randomIndex = Math.floor(Math.random() * expressionKeys.length);
                             model.expression(expressionKeys[randomIndex]); // 按 Key 设置表情
                             console.log(`[PetApp] 点击Body: 设置随机表情 '${expressionKeys[randomIndex]}'`);
                        }
                    } catch (e) {
                         console.warn("[PetApp] 设置随机表情失败:", e);
                    }
                }
            });

            console.log("[PetApp] 模型配置流程完成。");

        } catch (configError) {
            console.error("[PetApp] 配置已加载的模型时出错:", configError);
            alert(`配置模型时出错: ${configError.message}`);
        }

    } else {
        // 如果 model 加载失败
        console.error("[PetApp] 模型未能成功加载，无法显示。");
        // 在页面上显示错误提示
        const errorDiv = document.createElement('div');
        errorDiv.textContent = '糟糕！模型加载失败了 :(';
        errorDiv.style.color = 'white'; // 让文字可见
        errorDiv.style.position = 'fixed';
        errorDiv.style.top = '10px';
        errorDiv.style.left = '10px';
        errorDiv.style.padding = '10px';
        errorDiv.style.backgroundColor = 'rgba(200, 0, 0, 0.7)'; // 半透明红底
        errorDiv.style.borderRadius = '5px';
        errorDiv.style.fontFamily = 'sans-serif';
        document.body.appendChild(errorDiv);
    }

})(); // 立即执行