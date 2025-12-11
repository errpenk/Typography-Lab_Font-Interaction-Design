import './styles/main.scss';
import { ThemeController } from './modules/ThemeController';
import { GridSystem } from './modules/GridSystem';
import { DiagramOverlay } from './modules/DiagramOverlay';
import { Typewriter } from './modules/Typewriter';

// Tooltip Logic (简单逻辑)
const initTooltip = () => {
  const tooltip = document.getElementById('tooltip');
  const playground = document.getElementById('playground');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // 当 Playgroud 进入视口时，隐藏提示
      if (entry.isIntersecting) tooltip.classList.remove("visible");
      else tooltip.classList.add("visible");
    });
  }, { threshold: 0.5 });

  observer.observe(playground);

  tooltip.addEventListener('click', () => {
    playground.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('texter').focus();
  });
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  new ThemeController();
  new GridSystem();
  new DiagramOverlay();
  new Typewriter();
  initTooltip();
  
  console.log('SHANG LAB 2025 Initialized [Engineering Mode]');
});
