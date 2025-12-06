import { ELEMENTS, MODE } from './constants.js';
import { switchMode, renderGrid } from './theme.js';
import { handleInput } from './input.js';

/**
 * 初始化工具提示和 Intersection Observer
 */
function setupTooltip() {
    ELEMENTS.TOOLTIP.addEventListener("click", () => {
        ELEMENTS.PLAYGROUND.scrollIntoView({ behavior: "smooth" });
        ELEMENTS.INPUT.focus();
    });

    // Intersection Observer 监听 playground 区域
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                // 如果 playground 可见，则隐藏 tooltip；否则显示
                ELEMENTS.TOOLTIP.classList.toggle("visible", !entry.isIntersecting);
            });
        },
        {
            threshold: 0.5, // 当 50% 可见时触发
        }
    );

    observer.observe(ELEMENTS.PLAYGROUND);
}

/**
 * 设置所有主要的事件监听器
 */
function setupListeners() {
    // 导航按钮
    ELEMENTS.BTN_LOWER.addEventListener("click", () => switchMode(MODE.LOWERCASE));
    ELEMENTS.BTN_UPPER.addEventListener("click", () => switchMode(MODE.UPPERCASE));

    // 输入框
    ELEMENTS.INPUT.addEventListener("input", handleInput);

    // 滚动箭头
    ELEMENTS.SCROLL_ARROW.addEventListener("click", () => {
        ELEMENTS.INPUT.focus();
    });
}

/**
 * 应用初始化
 */
function init() {
    // 1. 初始渲染网格
    renderGrid();
    
    // 2. 设置事件监听器
    setupListeners();

    // 3. 设置工具提示
    setupTooltip();
}

// 启动应用
init();