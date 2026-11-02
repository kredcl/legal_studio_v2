---
name: animejs
description: Build web animations with Anime.js v4 (package `animejs`) — animate(), timelines, stagger, scroll-driven animations with onScroll(), SVG line drawing / morphing / motion paths, splitText and scrambleText text effects, draggables, layout (FLIP) animations, springs and easings, WAAPI hardware-accelerated animations, and React integration with createScope(). Use when the user mentions Anime.js / animejs, or when a vanilla JS / Astro / Vite site needs timeline-choreographed, staggered, SVG or scroll-linked motion without React. Includes the full official v4 documentation as searchable references. For React-first projects prefer the `motion` skill; for motion design decisions (whether to animate, curves, durations) also apply `animate`.
---

# Anime.js v4

Anime.js is a lightweight, modular, MIT-licensed JavaScript animation engine. Current version: **4.5.x** (npm `animejs`). The v4 API is **not** compatible with v3 (`anime({...})` no longer exists). Never write v3 code.

## Install and import

```bash
npm install animejs
```

```js
import { animate, createTimeline, stagger, onScroll, splitText, svg, spring, utils } from 'animejs';
// or granular subpaths: 'animejs/animation', 'animejs/timeline', 'animejs/events', 'animejs/svg', 'animejs/text', 'animejs/utils', 'animejs/waapi' ...
```

Prefer npm + bundler (Vite/Astro). CDN only for quick prototypes: `import { animate } from 'https://esm.sh/animejs'`.

## Core API cheat-sheet

```js
// 1. Animation: targets (selector, element(s), JS object) + properties + settings
animate('.card', {
  y: ['1.5rem', 0],          // from → to
  opacity: { from: 0 },      // or per-property params
  scale: [{ to: 1.05, duration: 200 }, { to: 1 }], // keyframes
  duration: 700,
  delay: stagger(80),        // stagger(80, { from: 'center', grid: [cols, rows] })
  ease: 'out(3)',            // 'linear', 'inOut(2)', 'outExpo', cubicBezier(...), spring({ bounce: .3 })
  loop: false,
  onComplete: self => {},
});

// 2. Timeline: choreographed sequences
const tl = createTimeline({ defaults: { duration: 600, ease: 'out(3)' } })
  .add('.hero-title', { y: [40, 0], opacity: [0, 1] })
  .add('.hero-sub',   { y: [20, 0], opacity: [0, 1] }, '-=400')   // relative position
  .add('.hero-cta',   { scale: [.9, 1], opacity: [0, 1] }, '<<+=100'); // relative to previous start
// Labels: tl.label('intro'); positions accept numbers, '+=100', '<', '<<', 'label'

// 3. Scroll-driven: any animation/timeline/timer can be linked to scroll
animate('.reveal', {
  y: [60, 0], opacity: [0, 1],
  autoplay: onScroll({
    enter: 'bottom-=10% top',   // '<container pos> <target pos>': container bottom (-10%) meets target top
    leave: 'top bottom',        // container top meets target bottom (defaults: enter 'end start', leave 'start end')
    sync: false,                // true|1 = scrub, 0..1 = smoothed scrub, 'play pause' method names
    // debug: true,
  }),
});

// 4. Text
const { words, chars } = splitText('.headline', { words: { wrap: 'clip' }, chars: true }); // wrap:'clip' masks overflow for reveal effects
animate(words, { y: ['100%', '0%'], delay: stagger(40), ease: 'out(3)' });

// 5. SVG
animate(svg.createDrawable('.line-path'), { draw: ['0 0', '0 1'], duration: 1500 }); // line drawing
animate('.shape-a', { d: svg.morphTo('.shape-b') });                                  // morph
const { translateX, translateY, rotate } = svg.createMotionPath('.track');
animate('.dot', { translateX, translateY, rotate, ease: 'linear', duration: 4000, loop: true });

// 6. Draggable, Layout (FLIP), Animatable (high-frequency values like cursor followers)
createDraggable('.puck', { container: '.stage', releaseEase: spring({ bounce: .5 }) });
const layout = createLayout('.grid'); layout.update(({ root }) => root.classList.toggle('list')); // or record() → change DOM → animate()
const follower = createAnimatable('.cursor', { x: 400, y: 400, ease: 'out(3)' }); // follower.x(mouseX)

// 7. Hardware-accelerated (WAAPI) for simple transform/opacity on busy pages
import { waapi } from 'animejs';
waapi.animate('.btn', { scale: [1, 1.04], duration: 250, ease: 'out(2)' });
```

## Rules for this studio

1. **Accessibility first**: wrap motion in `createScope({ mediaQueries: { reduceMotion: '(prefers-reduced-motion)' } }).add(self => { if (self.matches.reduceMotion) {...} })` and skip or shorten non-essential motion when it matches.
2. **Animate transforms and opacity** (`x`, `y`, `scale`, `rotate`, `opacity`); avoid width/height/top/left for performance. See `animation-performance` skill.
3. **Clean up**: in components (React/Vue/Astro islands) create animations inside `createScope({ root })` and call `scope.revert()` on unmount.
4. **Initial state**: avoid flash of un-animated content — set initial styles in CSS (or `utils.set()` before first paint) and animate *to* the final state.
5. **Purpose over decoration**: entry reveals, hierarchy, feedback, storytelling. Keep UI feedback < 300 ms; hero/storytelling can be longer.
6. **SVG gotcha**: on SVG elements that have `x`/`y`/`width` attributes (`<rect>`, `<text>`, `<image>`, `<use>`), the `x` and `y` properties animate the *attributes*, not a translation. Use `translateX` / `translateY` to move them, and set `transform-box: fill-box; transform-origin: center` in CSS before scaling or rotating them.
7. Verify in the browser with Playwright (desktop 1440px + mobile 390px) after implementing.

## Full official documentation (v4)

Search these files (grep for the function/parameter name) before using any API you're not sure about. Each entry links to its page on animejs.com.

| File | Covers |
|---|---|
| `references/getting-started.md` | Installation, module imports, React and vanilla JS usage |
| `references/animation.md` | `animate()`: targets, animatable properties, tween values/params, keyframes, playback settings, callbacks, methods |
| `references/timeline.md` | `createTimeline()`: add, set, call, label, sync, positions, methods |
| `references/timer.md` | `createTimer()` |
| `references/animatable.md` | `createAnimatable()` for high-frequency updates |
| `references/draggable.md` | `createDraggable()` |
| `references/layout.md` | `createLayout()` FLIP layout animations (enter/exit, modals, reorder) |
| `references/scope.md` | `createScope()`, media queries, revert |
| `references/events.md` | `onScroll()` ScrollObserver: thresholds, sync modes, callbacks |
| `references/svg.md` | `createDrawable`, `morphTo`, `createMotionPath` |
| `references/text.md` | `splitText`, `scrambleText` |
| `references/utilities.md` | `stagger` (grid, from, ease…), `utils.$`, `set`, `get`, `random`, `clamp`, `mapRange`, `lerp`… |
| `references/easings.md` | Built-in eases, cubicBezier, spring, steps, linear, irregular |
| `references/web-animation-api.md` | `waapi.animate()` hardware-accelerated animations |
| `references/engine.md` | Global engine settings, defaults, fps, time units |
| `references/adapters.md` | Three.js adapter |

Source: https://animejs.com/documentation (generated from the official docs on 2026-11-02, Anime.js 4.5.0). Library license: MIT, © Julian Garnier.
