//responsible for rendering the mesh
//dispatching hover events to the diagram

import { GLYPHS_LOWER, GLYPHS_UPPER } from '../config/typography';
import { appState } from '../core/StateManager';

export class GridSystem {
  constructor() {
    this.container = document.getElementById('grid');
    this.init();
  }

  init() {
    this.render(appState.getMode());
    appState.on('modeChanged', (mode) => this.render(mode));
    
    // 事件委托：性能优化的关键
    this.container.addEventListener('mouseenter', (e) => this.handleHover(e), true);
    this.container.addEventListener('mouseleave', () => this.handleLeave(), true);
  }

  render(mode) {
    this.container.innerHTML = '';
    
    if (mode === 'lowercase') {
      Object.keys(GLYPHS_LOWER).forEach((key, index) => {
        this.createCard(key, GLYPHS_LOWER[key], index, true);
      });
    } else {
      GLYPHS_UPPER.forEach((char, index) => {
        this.createCard(char, char, index, false);
      });
    }
  }

  createCard(key, content, index, isSvg) {
    const card = document.createElement('div');
    card.className = 'char-card';
    card.dataset.char = key; // 存储数据
    card.dataset.index = index; // 存储位置信息
    card.dataset.content = content; // 存储原始内容用于Diagram
    card.dataset.isSvg = isSvg;

    if (isSvg) {
      card.innerHTML = `<svg viewBox="0 0 100 100">${content}</svg>`;
    } else {
      card.innerHTML = `<span class="tech-char">${content}</span>`;
    }
    this.container.appendChild(card);
  }

  handleHover(e) {
    const card = e.target.closest('.char-card');
    if (card) {
      // 派发自定义事件给 Diagram 组件监听
      document.dispatchEvent(new CustomEvent('grid:hover', {
        detail: {
          content: card.dataset.content,
          index: parseInt(card.dataset.index),
          isSvg: card.dataset.isSvg === 'true',
          mode: appState.getMode()
        }
      }));
    }
  }

  handleLeave() {
    document.dispatchEvent(new Event('grid:leave'));
  }
}
