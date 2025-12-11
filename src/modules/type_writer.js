//input and display logic at the bottom

import { GLYPHS_LOWER } from '../config/typography';
import { appState } from '../core/StateManager';

export class Typewriter {
  constructor() {
    this.input = document.getElementById('texter');
    this.display = document.getElementById('display-area');
    this.counter = document.getElementById('char-counter');
    this.indicator = document.getElementById('scroll-indicator');
    
    this.init();
  }

  init() {
    // Input Handling
    this.input.addEventListener('input', (e) => this.handleInput(e));
    
    // Focus Interaction
    this.indicator.addEventListener('click', () => this.input.focus());

    // State Reaction
    appState.on('modeChanged', (mode) => {
      this.display.className = `input-display ${mode}-mode`;
      this.handleInput({ target: this.input }); // Re-render current text
    });
  }

  handleInput(e) {
    const val = e.target.value;
    const mode = appState.getMode();
    
    // Update UI Stats
    this.counter.innerText = `${val.length} / 100`;
    if (val.length > 0) this.indicator.classList.remove('visible');
    else this.indicator.classList.add('visible');

    // Clear Display
    this.display.innerHTML = '';

    // Render Logic
    if (mode === 'lowercase') {
      this.renderLowercase(val.toLowerCase());
    } else {
      this.renderUppercase(val.toUpperCase());
    }
  }

  renderLowercase(text) {
    for (const char of text) {
      if (GLYPHS_LOWER[char]) {
        const div = document.createElement('div');
        div.innerHTML = `<svg viewBox="0 0 100 100">${GLYPHS_LOWER[char]}</svg>`;
        this.display.appendChild(div);
      } else if (char === " ") {
        this.addSpace(20);
      }
    }
  }

  renderUppercase(text) {
    for (const char of text) {
      if (char === " ") {
        this.addSpace(30);
      } else {
        const div = document.createElement('div');
        div.innerHTML = `<span class="tech-char">${char}</span>`;
        this.display.appendChild(div);
      }
    }
  }

  addSpace(width) {
    const space = document.createElement('div');
    space.style.width = `${width}px`;
    this.display.appendChild(space);
  }
}
