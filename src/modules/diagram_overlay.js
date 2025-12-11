//Receive Grid events
//handle left and right floating boxes


export class DiagramOverlay {
  constructor() {
    this.leftContainer = document.getElementById('diagram-left');
    this.rightContainer = document.getElementById('diagram-right');
    this.leftBox = this.leftContainer.querySelector('.diagram-box');
    this.rightBox = this.rightContainer.querySelector('.diagram-box');
    
    this.init();
  }

  init() {
    document.addEventListener('grid:hover', (e) => this.show(e.detail));
    document.addEventListener('grid:leave', () => this.hide());
  }

  show({ content, index, isSvg, mode }) {
    const colIndex = index % 6;
    const isLeft = colIndex < 3; // 核心逻辑：判断左右
    
    const activeContainer = isLeft ? this.leftContainer : this.rightContainer;
    const activeBox = isLeft ? this.leftBox : this.rightBox;
    const inactiveContainer = isLeft ? this.rightContainer : this.leftContainer;

    // Render content
    if (isSvg) {
       activeBox.innerHTML = `<svg viewBox="0 0 100 100">${content}</svg>`;
    } else {
       activeBox.innerHTML = `<span class="tech-char">${content}</span>`;
    }

    // Toggle Visibility
    activeContainer.classList.add('active');
    inactiveContainer.classList.remove('active');
  }

  hide() {
    this.leftContainer.classList.remove('active');
    this.rightContainer.classList.remove('active');
  }
}
