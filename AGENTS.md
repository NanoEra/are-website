# AGENTS.md - Guidelines for AI Agents

This document provides guidelines for AI agents working on this codebase.

## Project Overview

This is a **static website** (HTML/CSS/JavaScript) deployed to GitHub Pages. No build system, package manager, or test framework is used. All code runs directly in the browser.

## Project Structure

```
/                    # Root - static files (index.html, favicon.ico)
/scripts/            # JS & CSS: index.js/css, faq.js/css, download.js/css
/faq/                # FAQ page static files
/download/           # Download page static files
/res/                # Static resources (images)
/.github/workflows/  # CI/CD configuration
```

## Build, Lint, and Test Commands

**No build system, linter, or test suite exists.** The site is pure static HTML/CSS/JS deployed to GitHub Pages.

### Deployment

Deploys automatically via `.github/workflows/static.yml` on push to `main` or manual workflow dispatch.

### Local Development

```bash
# Python 3
python -m http.server 8000

# Or Node.js
npx serve .
```

Navigate to `http://localhost:8000`

### Running a Single Test

**No tests exist.** Future tests would use Jest or Playwright.

---

## Code Style Guidelines

### General Principles

- Keep JavaScript vanilla (no frameworks unless necessary)
- Prioritize performance and accessibility
- Use modern ES6+ features where supported
- Write code that works in all modern browsers

### JavaScript Conventions

**Naming Conventions:**
- Use camelCase for variables and functions: `initGeometricElements`, `handleResize`
- Use PascalCase for classes (if used): `class ModalController`
- Use SCREAMING_SCREAM_CASE for constants: `const CHECK_INTERVAL = 5000`

**Functions:**
```javascript
function initGeometricElements() { }
function handleResize() { }

function initGeometricElements() {
    const container = document.getElementById('geometricBackground');
    if (!container) return;
}
```

**Variables:**
```javascript
const container = document.getElementById('geometricBackground');
let resizeTimeout;
const elementCount = isMobile ? 8 : 15;
const animationDuration = Math.random() * 30 + 20;
```

### Event Handling

Use event delegation for better performance:

```javascript
// Good - event delegation
document.addEventListener('mouseover', function(e) {
    const card = e.target.closest('.feature-card');
    if (card) { /* handle */ }
});

// Bad - attaching many listeners
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseover', handler);
});
```

### Performance Guidelines

1. **Debounce/throttle resize handlers:**
```javascript
let resizeTimeout;
function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        initBackgroundEffects();
    }, 300);
}
```

2. **Use requestAnimationFrame for animations:**
```javascript
requestAnimationFrame(() => {
    const start = performance.now();
    requestAnimationFrame(() => {
        // animation code
    });
});
```

3. **Check element existence before manipulation:**
```javascript
const container = document.getElementById('geometricBackground');
if (!container) return;
```

### CSS Guidelines

- Use CSS custom properties for theming
- Use flexbox and grid for layouts
- Keep styles modular per page (index.css, faq.css, etc.)
- Use responsive breakpoints (typically 768px for mobile)

### Error Handling

- Use try/catch for async operations and external APIs
- Always check DOM element existence before manipulation
- Provide fallback values for optional browser APIs:
```javascript
const cores = navigator.hardwareConcurrency || 1;
const memory = navigator.deviceMemory || 0;
```

### Git Workflow

1. Create a branch for changes: `git checkout -b feature/description`
2. Make changes and commit: `git commit -m "description"`
3. Push and create PR: `git push -u origin feature/description`
4. Merge to `main` triggers deployment

### File Organization

- Keep JavaScript in `/scripts/` directory
- One JS file per page (index.js, faq.js, download.js)
- Match CSS files to their corresponding JS files
- Keep static assets in `/res/`

## Existing Code Patterns

From `scripts/index.js`: DOM queries cached when possible, lazy initialization with flags, performance mode detection, CSS injected dynamically, debounced resize handling, mobile-responsive at 768px.

---

## Future Considerations

If this project grows, consider adding: package.json with npm scripts for linting (ESLint), TypeScript, unit tests with Jest/Vitest, E2E tests with Playwright, or a build system (Vite/Parcel/webpack).
