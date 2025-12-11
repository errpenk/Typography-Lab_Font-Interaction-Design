# Typography Lab Project

This project is a minimalist experiment in dynamic typography. The same input text can be rendered in two completely different visual systems depending on whether the characters are lowercase or uppercase.

> **Duality in Form.**
> An interactive typographic study contrasting the mechanical precision of Uppercase with the schematic complexity of Lowercase.

[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Sass](https://img.shields.io/badge/Sass-1.70-CC6699?style=flat&logo=sass)](https://sass-lang.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

## ✦ Concept

**Typography Lab Project** is a digital type specimen that functions as a dual-state application. It explores two distinct visual identities:

1.  **LOWERCASE (Schematic Mode):** Dark themed, architectural, SVG-path based. It treats letters as blueprints.
2.  **UPPERCASE (Industrial Mode):** Light themed, bold, font-based. It treats letters as finished products.

The project demonstrates how to manage complex state transitions and high-performance DOM manipulation using modern, vanilla JavaScript architecture.

##  Key Features

*   **Dual-State Engine:** Seamless switching between "Schematic" (SVG) and "Industrial" (Font) modes using a centralized State Manager.
*   **Event-Driven Communication:** Decoupled interaction between the Grid and the Diagram overlays using a custom Event Emitter pattern.
*   **Data-Driven Rendering:** Typographic data (SVG paths) is separated from logic, allowing for easy updates to the glyph set.
*   **Reactive Playground:** A typewriter input that dynamically renders the custom glyphs based on the current state.



##  Engineering Highlights

This project is built with a focus on modern engineering principles for maintainability and scalability:

### 1. Decoupled Components via Event Bus
Components communicate asynchronously using a custom `EventEmitter` (Pub/Sub pattern). This ensures that the `GridSystem` (which handles user interaction on the alphabet) does not need direct knowledge of the `DiagramOverlay` (which visually responds to hovers).

*Example:*
```javascript
// src/modules/GridSystem.js
this.container.addEventListener('mouseenter', (e) => {
  // Grid announces an event, without knowing who's listening.
  document.dispatchEvent(new CustomEvent('grid:hover', { detail: { ... } }));
});

// src/modules/DiagramOverlay.js
document.addEventListener('grid:hover', (e) => this.show(e.detail));



### 2. Config over Code
The extensive SVG path data for the custom alphabet (GLYPHS_LOWER) is critical but inherently separate from application logic. By moving this data into src/config/typography.js, we achieve:

Readability: Logic files are cleaner and easier to understand.
Maintainability: Typographic assets can be updated or replaced without altering core application logic.
Reusability: Data is more portable.
3. CSS Variable Theming
The dual-state application (lowercase vs. uppercase) is managed efficiently using CSS Custom Properties (Variables). JavaScript's role is minimal: it simply toggles a class on the <body> element. The SCSS then uses these variables to dynamically apply themes.

Example:

code
Scss
// src/styles/main.scss (and imported abstract/_variables.scss)
body.lowercase {
  --bg-color: #0a0a0a;
  --stroke-color: #f0f0f0;
  --accent-color: #00d2ff;
  // ... other lowercase styles
}

body.uppercase {
  --bg-color: #ffffff;
  --stroke-color: #000000;
  --accent-color: #00d2ff; // Accent can be shared or themed differently
  // ... other uppercase styles
}
This allows components to automatically adapt to theme changes without direct style manipulation in JS.

## Design System
The visual language and typographic foundation are meticulously crafted and defined in src/styles/abstract/_variables.scss.

Font A (Schematic/Code): Courier New - Used for the input field and character counter, evoking a sense of technical documentation.
Font B (Industrial/Header): Chakra Petch (imported via Google Fonts) - Provides a bold, impactful display for headers and key elements in uppercase mode.
Font C (UI/Labeling): Helvetica Neue (fallback) - Offers a clean, standard sans-serif for general UI elements and labels in uppercase mode.
Accent Color: #00d2ff (Cyber Cyan) - A vibrant, consistent accent used across both themes for interactive elements and visual highlights.


## License
This project is open source and available under the MIT License.
