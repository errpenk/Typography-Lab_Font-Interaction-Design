/* DATA */
const lowerAlphabet = {
  a: '<path d="M20 45 H80 V90 H20 V65 H80" />',
  b: '<path d="M20 10 V90 H80 V55 H20" />',
  c: '<path d="M80 45 H20 V90 H80" />',
  d: '<path d="M80 10 V90 H20 V55 H80" />',
  e: '<path d="M80 90 H20 V45 H80 M20 68 H70" />',
  f: '<path d="M30 90 V10 H80 M20 45 H70" />',
  g: '<path d="M80 45 H20 V90 H80 V70 H60" />',
  h: '<path d="M20 10 V90 M20 55 H80 V90" />',
  i: '<path d="M50 45 V90 M50 15 V25" />',
  j: '<path d="M60 45 V80 L50 90 H40 M60 15 V25" />',
  k: '<path d="M20 10 V90 M80 45 L20 68 L80 90" />',
  l: '<path d="M30 10 V90 H80" />',
  m: '<path d="M20 90 V45 H50 V90 M50 45 H80 V90" />',
  n: '<path d="M20 45 V90 M20 45 H80 V90" />',
  o: '<path d="M20 45 H80 V90 H20 V45" />',
  p: '<path d="M20 90 V10 M20 25 H80 V55 H20" />',
  q: '<path d="M80 90 V10 M80 25 H20 V55 H80" />',
  r: '<path d="M20 45 V90 M20 55 H80" />',
  s: '<path d="M80 45 H20 V68 H80 V90 H20" />',
  t: '<path d="M50 10 V90 H80 M20 45 H80" />',
  u: '<path d="M20 45 V90 H80 V45" />',
  v: '<path d="M20 45 L50 90 L80 45" />',
  w: '<path d="M20 45 L35 90 L50 60 L65 90 L80 45" />',
  x: '<path d="M20 45 L80 90 M80 45 L20 90" />',
  y: '<path d="M20 45 V75 H80 V45 M50 75 V90" />',
  z: '<path d="M20 45 H80 L20 90 H80" />',
};

const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/* ELEMENTS */
let currentMode = "lowercase"; 

const body = document.body;
const grid = document.getElementById("grid");
const input = document.getElementById("texter");
const display = document.getElementById("display");
const title = document.getElementById("main-title");
const btnLower = document.getElementById("btn-lower");
const btnUpper = document.getElementById("btn-upper");
const tooltip = document.getElementById("tooltip");
const playground = document.getElementById("playground-area");
const scrollArrow = document.getElementById("scroll-arrow");
const charCounter = document.getElementById("char-counter");

const diagramLeft = document.getElementById("diagram-left");
const diagramRight = document.getElementById("diagram-right");
const contentLeft = document.getElementById("diagram-content-left");
const contentRight = document.getElementById("diagram-content-right");

/* INITIALIZATION  */
function init() {
  renderGrid();
  setupTooltip();
}

/* RENDER */
function renderGrid() {
  grid.innerHTML = "";
  display.innerHTML = "";
  input.value = "";
  charCounter.innerText = "0 / 100";
  scrollArrow.classList.add('visible');

  if (currentMode === "lowercase") {
    body.className = "lowercase";
    title.innerText = "lowercase lab | SHANG 2025";
    display.className = "input-display lowercase-mode";
    btnLower.classList.add("active");
    btnUpper.classList.remove("active");

    Object.keys(lowerAlphabet).forEach((key, index) => {
      const card = document.createElement("div");
      card.className = "char-card";
      card.innerHTML = `<svg viewBox="0 0 100 100">${lowerAlphabet[key]}</svg>`;
      addDiagramHover(card, key, index, 'lower');
      grid.appendChild(card);
    });
  } else {
    body.className = "uppercase";
    title.innerText = "UPPERCASE LAB | SHANG 2025";
    display.className = "input-display uppercase-mode";
    btnUpper.classList.add("active");
    btnLower.classList.remove("active");

    upperChars.forEach((char, index) => {
      const card = document.createElement("div");
      card.className = "char-card";
      card.innerHTML = `<span class="tech-char">${char}</span>`;
      addDiagramHover(card, char, index, 'upper');
      grid.appendChild(card);
    });
  }
}




/* HOVER */
function addDiagramHover(element, charData, index, type) {
  const colIndex = index % 6;
  const isLeft = colIndex < 3;

  element.addEventListener('mouseenter', () => {
    const targetContent = isLeft ? contentLeft : contentRight;
    
    if (type === 'lower') {
       targetContent.innerHTML = `<svg viewBox="0 0 100 100">${lowerAlphabet[charData]}</svg>`;
    } else {
       targetContent.innerHTML = `<span class="tech-char">${charData}</span>`;
    }

    if(isLeft) {
      diagramLeft.classList.add('active');
      diagramRight.classList.remove('active');
    } else {
      diagramRight.classList.add('active');
      diagramLeft.classList.remove('active');
    }
  });

  element.addEventListener('mouseleave', () => {
    diagramLeft.classList.remove('active');
    diagramRight.classList.remove('active');
  });
}

/* EVENT */
btnLower.addEventListener("click", () => {
  if (currentMode !== "lowercase") {
    currentMode = "lowercase";
    renderGrid();
  }
});

btnUpper.addEventListener("click", () => {
  if (currentMode !== "uppercase") {
    currentMode = "uppercase";
    renderGrid();
  }
});

scrollArrow.addEventListener("click", () => {
  input.focus();
});

input.addEventListener("input", (e) => {
  const val = e.target.value;
  const count = val.length;
  
  // Update Counter
  charCounter.innerText = `${count} / 100`;

  if (count > 0) {
      scrollArrow.classList.remove('visible');
  } else {
      scrollArrow.classList.add('visible');
  }

  display.innerHTML = "";

  if (currentMode === "lowercase") {
    const cleanVal = val.toLowerCase();
    for (let char of cleanVal) {
      if (lowerAlphabet[char]) {
        const div = document.createElement("div");
        div.innerHTML = `<svg viewBox="0 0 100 100">${lowerAlphabet[char]}</svg>`;
        display.appendChild(div);
      } else if (char === " ") {
        const space = document.createElement("div");
        space.style.width = "20px";
        display.appendChild(space);
      }
    }
  } else {
    const cleanVal = val.toUpperCase();
    for (let char of cleanVal) {
      if (char === " ") {
        const space = document.createElement("div");
        space.style.width = "30px";
        display.appendChild(space);
      } else {
        const div = document.createElement("div");
        div.innerHTML = `<span class="tech-char">${char}</span>`;
        display.appendChild(div);
      }
    }
  }
});




/* TOOLTIP */
function setupTooltip() {
  tooltip.addEventListener("click", () => {
    playground.scrollIntoView({ behavior: "smooth" });
    input.focus();
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tooltip.classList.remove("visible");
        } else {
          tooltip.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  observer.observe(playground);
}

init();