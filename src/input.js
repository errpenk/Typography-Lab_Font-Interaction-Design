
import { ELEMENTS, lowerAlphabet } from './constants.js';
import { currentMode } from './theme.js';

/**
 * 处理输入框的 input 事件，动态更新显示区和计数器。
 * @param {Event} e - input事件对象。
 */
export function handleInput(e) {
    const val = e.target.value;
    const count = val.length;
    
    // 1. Update Counter
    ELEMENTS.CHAR_COUNTER.innerText = `${count} / 100`;

    // 2. Hide/Show Scroll Arrow
    ELEMENTS.SCROLL_ARROW.classList.toggle('visible', count === 0);

    // 3. Render Display Area
    ELEMENTS.DISPLAY.innerHTML = "";

    if (currentMode === 'lowercase') {
        const cleanVal = val.toLowerCase();
        for (let char of cleanVal) {
            const div = document.createElement("div");
            if (lowerAlphabet[char]) {
                div.innerHTML = `<svg viewBox="0 0 100 100">${lowerAlphabet[char]}</svg>`;
            } else if (char === " ") {
                div.style.width = "20px";
            }
            ELEMENTS.DISPLAY.appendChild(div);
        }
    } else { // uppercase
        const cleanVal = val.toUpperCase();
        for (let char of cleanVal) {
            const div = document.createElement("div");
            if (char === " ") {
                div.style.width = "30px";
            } else {
                div.innerHTML = `<span class="tech-char">${char}</span>`;
            }
            ELEMENTS.DISPLAY.appendChild(div);
        }
    }
}
