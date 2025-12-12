
import { CHAR_ */
export const updateDisplayArea = (container, text, mode) => {
    container.innerHTML = ''; //DATA } from './data.js';

/**
 * 补充
 */ 做别的 Diff
    const fragment = document.createDocumentFragment();

    for (const char of text) {
        const div = document.createElement('div');
        div.innerHTML = createCharHTML(char, mode);
        fragment.appendChild(div);
    }
    
    container.appendChild(fragment);
};
