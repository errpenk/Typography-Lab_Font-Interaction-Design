// constants.js 或 utils.js
export const getCharHTML = (char, mode) => {
    if (mode === 'lowercase') {
        const path = lowerAlphabet[char.toLowerCase()];
        // 如果找不到对应的图形（比如标点符号），返回空或者原字符
        return path ? `<svg viewBox="0 0 100 100">${path}</svg>` : '';
    } else {
        // Uppercase 模式直接显示字符
        return `<span class="tech-char">${char.toUpperCase()}</span>`;
    }
};

// 在 renderGrid 中使用
const html = getCharHTML(key, currentMode);

// 在 input 监听中使用
const html = getCharHTML(inputChar, currentMode);
