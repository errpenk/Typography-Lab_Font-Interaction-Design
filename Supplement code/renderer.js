// src/data.js

export const CHAR_DATA核心思想：** 所有的 DOM 生成逻辑都收拢到这里。无论是初始化网格，还是用户打字时生成的 = {
  a: { 
    svg: '<path d="M20 45 H8预览，都调用同一个函数。

```javascript
// renderer.js
import { lowerAlphabet } from './data.0 V90..." />', // 简写示意
    upper: 'A' 
  },
js';

/**
 * 核心工厂函数：根据字符和模式生成 HTML 字符串
 */
export const create  b: { 
    svg: '<path d="M20 10 V90..." />CharHTML = (char, mode) => {
    if (mode === 'lowercase') {
        const path =', 
    upper: 'B' 
  },
  // ... 其他所有字符
};

// lowerAlphabet[char.toLowerCase()];
        // aria-hidden，装饰
        return path  如果未来有特殊配置，比如最大字符限制，也放这里
export const CONFIG = {
  MAX_LENGTH: 100,
  SCROLL_THRESHOLD: 0.5
};
