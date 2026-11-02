# Anime.js v4 · Engine

Source: official documentation at https://animejs.com/documentation (MIT-licensed library by Julian Garnier).

## Engine

Docs: https://animejs.com/documentation/engine

### Drives and synchronises allAnimation,Timer, andTimelineinstances.

```js
import { engine } from 'animejs';
```


#### Execution order

Timers, animations, and timelines are executed in the order they are added to the engine. To control the execution order within the engine tick loop, use the `priority` parameter: instances with lower values are executed first.

```js
animate(targets, { x: 100, priority: 0 }); // Runs first
animate(targets, { y: 100, priority: 2 }); // Runs last
animate(targets, { z: 100 });              // Default priority: 1
```

---

## Engine defaults

Docs: https://animejs.com/documentation/engine/engine-defaults · Since 4.0.0

Defines the global defaults properties used by all Timer, Animation and Timeline instances.

All default properties are available on the `defaults` `Object` of `engine`.

```js
import { engine } from 'animejs';

engine.engine.defaults.duration = 500;
```

| Name | Accepts |
|---|---|
| playbackEase | Easing name `String` \| Easing `Function` |
| playbackRate | `Number` |
| frameRate | `Number` |
| loop | `Number` \| `Boolean` |
| reversed | `Boolean` |
| alternate | `Boolean` |
| autoplay | `Boolean` |
| duration | `Number` \| `Function` |
| delay | `Number` \| `Function` |
| composition | Composition types `String` \| `Function` |
| ease | Easing name `String` \| Easing `Function` |
| loopDelay | `Number` |
| modifier | Modifier `Function` |
| onBegin | Callback `Function` |
| onUpdate | Callback `Function` |
| onRender | Callback `Function` |
| onLoop | Callback `Function` |
| onComplete | Callback `Function` |
| onPause | Callback `Function` |

---

## Engine methods

Docs: https://animejs.com/documentation/engine/engine-methods · Since 4.0.0

```js
import { engine } from 'animejs';
       ┌──────────┐
engine.│update()  │
engine.│pause()   ├─ Methods
engine.│resume()  │
       └──────────┘
```

---

## pause()

Docs: https://animejs.com/documentation/engine/engine-methods/pause · Since 4.0.0

Pauses the engine's main loop, pausing all active Timer, Animation, and Timeline instances. Use `engine.resume()` to restart the animations from where they paused.

```js
engine.pause();  // Stops all animations
engine.resume(); // Resumes all animations
```

> Timer, Animation, or Timeline can still be added when the engine is paused, but won't play until the engine is started again.


### Returns

Engine

Example (javascript):

```javascript
import { engine, animate, utils } from 'animejs';

const [ $container ] = utils.$('.container');
const [ $add, $pause ] = utils.$('button');

function addAnimation() {
  const $particle = document.createElement('div');
  $particle.classList.add('particle');
  $container.appendChild($particle);
  animate($particle, {
    x: utils.random(-10, 10, 2) + 'rem',
    y: utils.random(-3, 3, 2) + 'rem',
    scale: [{ from: 0, to: 1 }, { to: 0 }],
    loop: true,
  });
}

let timeout = 3;
let interval;

function pauseEngine() {
  engine.pause();
  $pause.setAttribute('disabled', 'true');
  $pause.innerHTML = `Resume in ${timeout--} seconds`;
  interval = setInterval(() => {
    if (timeout <= 0) {
      clearInterval(interval);
      engine.resume();
      $pause.removeAttribute('disabled');
      $pause.innerHTML = 'Pause for 3 seconds';
      timeout = 3;    
    } else {
      $pause.innerHTML = `Resume in ${timeout--} seconds`;
    }
  }, 1000);
}

$add.addEventListener('click', addAnimation);
$pause.addEventListener('click', pauseEngine);
```

Example (html):

```html
<div class="large row container"></div>
<div class="medium row">
  <fieldset class="controls">
    <button>Add animation</button>
    <button>Pause for 3 seconds</button>
  </fieldset>
</div>
```

---

## resume()

Docs: https://animejs.com/documentation/engine/engine-methods/resume · Since 4.0.0

Resumes the engine after being either paused with a call to `engine.pause()`.

```js
engine.pause();  // Pauses the engine and all animations
engine.resume(); // Resumes the engine and all animations
```


### Returns

Engine

Example (javascript):

```javascript
import { engine, animate, utils } from 'animejs';

const [ $container ] = utils.$('.container');
const [ $pause, $resume ] = utils.$('button');

function addAnimation() {
  const $particle = document.createElement('div');
  $particle.classList.add('particle');
  $container.appendChild($particle);
  animate($particle, {
    x: utils.random(-10, 10, 2) + 'rem',
    y: utils.random(-3, 3, 2) + 'rem',
    scale: [{ from: 0, to: 1 }, { to: 0 }],
    loop: true,
    delay: utils.random(0, 1000)
  });
}

for (let i = 0; i < 150; i++) addAnimation();

const resumeEngine = () => engine.resume();
const pauseEngine = () => engine.pause();

$pause.addEventListener('click', pauseEngine);
$resume.addEventListener('click', resumeEngine);
```

Example (html):

```html
<div class="large row container"></div>
<div class="medium row">
  <fieldset class="controls">
    <button>Pause</button>
    <button>Resume</button>
  </fieldset>
</div>
```

---

## update()

Docs: https://animejs.com/documentation/engine/engine-methods/update · Since 4.0.0

Manually ticks the engine when `engine.useDefaultMainLoop` is set to false.

```js
engine.useDefaultMainLoop = false;
engine.update(); // Manual update call
```

> Useful for integrating Anime.js in projects with existing animation loops, such as Three.js or game engines.


### Returns

Engine

Example (javascript):

```javascript
import { engine, animate, utils } from 'animejs';
import * as THREE from 'three';
import 'animejs/adapters/three';

// Prevents Anime.js from using its own loop
engine.useDefaultMainLoop = false;

const [ $container ] = utils.$('.full-container');
const color = utils.get($container, 'color');
const { clientWidth: width, clientHeight: height } = $container;

// Three.js setup
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 20);
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color, wireframe: true });

renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
$container.appendChild(renderer.domElement);
camera.position.z = 5;

function createAnimatedCube() {
  const cube = new THREE.Mesh(geometry, material);
  const r = () => utils.random(-720, 720, 1);
  scene.add(cube);
  // The three.js adapter maps x / y / z and rotateX / Y / Z (degrees) directly onto the mesh.
  animate(cube, {
    x: utils.random(-10, 10, 2),
    y: utils.random(-5, 5, 2),
    z: [-10, 7],
    rotateX: r,
    rotateY: r,
    rotateZ: r,
    delay: utils.random(0, 4000),
    duration: 4000,
    loop: true,
    ease: 'inSine',
  });
}

for (let i = 0; i < 40; i++) {
  createAnimatedCube();
}

function render() {
  engine.update(); // Manually update Anime.js engine
  renderer.render(scene, camera); // Render Three.js scene
}

// Calls the builtin Three.js animation loop
renderer.setAnimationLoop(render);
```

Example (html):

```html
<div class="full-container"></div>
```

---

## Engine parameters

Docs: https://animejs.com/documentation/engine/engine-parameters · Since 4.0.0

```js
import { engine } from 'animejs';
       ┌────────────┐
engine.│speed       │
engine.│fps         ├─ Parameters
engine.│precision   │
       └────────────┘
```

---

## fps

Docs: https://animejs.com/documentation/engine/engine-parameters/fps · Since 4.0.0

Controls the global frame rate at which animations are updated and rendered.

> Adjusting the frame rate can help optimize performance on lower-end devices or when running many complex animations simultaneously. However, it may affect the perceived smoothness of animations.

```js
engine.fps = 30; // Set all animations to update at 30 fps
```


### Accepts

A `Number` greater than `0`


### Default

`240`

Example (javascript):

```javascript
import { engine, animate, utils } from 'animejs';

const [ $container ] = utils.$('.container');
const [ $range ] = utils.$('.range');

for (let i = 0; i < 150; i++) {
  const $particle = document.createElement('div');
  $particle.classList.add('particle');
  $container.appendChild($particle);
  animate($particle, {
    x: utils.random(-10, 10, 2) + 'rem',
    y: utils.random(-3, 3, 2) + 'rem',
    scale: [{ from: 0, to: 1 }, { to: 0 }],
    delay: utils.random(0, 1000),
    loop: true,
  });  
}

function onInput() {
  engine.fps = this.value;
}

$range.addEventListener('input', onInput);
```

Example (html):

```html
<div class="large row container"></div>
<div class="medium row">
  <fieldset class="controls">
    <input type="range" min=0 max=240 value=60 step=1 class="range" />
  </fieldset>
</div>
```

---

## pauseOnDocumentHidden

Docs: https://animejs.com/documentation/engine/engine-parameters/pauseondocumenthidden · Since 4.0.0

Controls whether the engine pauses animations when the browser tab is hidden.
 When `true`, animations pause automatically when the tab loses focus. When `false`, animations will adjust their `currentTime` to catch up how long they have been idle in the background, making it looks like they never paused.

```js
engine.pauseOnDocumentHidden = true;
```


### Accepts

`Boolean`


### Default

`true`

Example (javascript):

```javascript
import { engine, utils, createTimer } from 'animejs';

const [ $globalTime ] = utils.$('.global-time');
const [ $engineTime ] = utils.$('.engine-time');
const [ $toggle ] = utils.$('.toggle');

const startTime = Date.now();

const globalTimer = setInterval(() => {
  $globalTime.innerHTML = Date.now() - startTime;
}, 16);

const engineTimer = createTimer({
  onUpdate: self => $engineTime.innerHTML = self.currentTime
});

const toggleSetting = () => {
  const isPauseWhenHidden = engine.pauseOnDocumentHidden;
  if (isPauseWhenHidden) {
    engine.pauseOnDocumentHidden = false;
    $toggle.innerHTML = '○ Disabled (Switch tab to see the effect)';
  } else {
    engine.pauseOnDocumentHidden = true;
    $toggle.innerHTML = '● Enabled (Switch tab to see the effect)';
  }
}

// Switch tab to see the effect

$toggle.addEventListener('click', toggleSetting);
```

Example (html):

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">global time</span>
      <span class="global-time value lcd">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">engine time</span>
      <span class="engine-time value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button toggle">● Enabled (Switch tab to see the effect)</button>
  </fieldset>
</div>
```

---

## precision

Docs: https://animejs.com/documentation/engine/engine-parameters/precision · Since 4.0.0

Defines how many decimal places to round string values to during an animation.
 The more decimals you add, the more precise the animations will be. Setting `0` will essentially remove all decimals during an animation.
 Only string values of CSS properties, SVG and DOM Attributes are rounded (e.g., `'120.725px'`, `'1.523'` ) and the rounding is only applied during the animation, the first and last frames of the animation use the full value.

> In 99% of cases, you won't need to increase the precision beyond 4, as the visual difference won't be noticeable.
> Lowering the precision can help in cases where you are animating many elements simultaneously, but can drastically reduce the visual quality and smoothness of your animations.

```js
engine.precision = 1; // values will be rounded to 1 decimal place ('120.7px')
```


### Accepts

- A `Number` greater than or equal to `0` to define the number of decimal places
- A `Number` lower than `0` to skip the rounding process


### Default

`4`

Example (javascript):

```javascript
import { engine, animate, utils } from 'animejs';

const [ $container ] = utils.$('.container');
const [ $range ] = utils.$('.range');

for (let i = 0; i < 150; i++) {
  const $particle = document.createElement('div');
  $particle.classList.add('particle');
  $container.appendChild($particle);
  animate($particle, {
    x: utils.random(-10, 10, 2) + 'rem',
    y: utils.random(-3, 3, 2) + 'rem',
    scale: [{ from: 0, to: 1 }, { to: 0 }],
    delay: utils.random(0, 1000),
    loop: true,
  });  
}

function onInput() {
  engine.precision = this.value;
}

$range.addEventListener('input', onInput);
```

Example (html):

```html
<div class="large row container"></div>
<div class="medium row">
  <fieldset class="controls">
    <input type="range" min=0 max=5 value=4 step=1 class="range" />
  </fieldset>
</div>
```

---

## speed

Docs: https://animejs.com/documentation/engine/engine-parameters/speed · Since 4.0.0

Controls the global playback rate of all animations managed by the engine.
 Values greater than `1` speed up animations, while values between `0` and `1` slow them down.

> Adjusting the global playback rate is useful for creating slow-motion or fast-forward effects across all animations simultaneously.

```js
engine.speed = 0.5; // Run all animations at half speed
```


### Accepts

A `Number` greater than or equal to `0`


### Default

`1`

Example (javascript):

```javascript
import { engine, animate, utils } from 'animejs';

const [ $container ] = utils.$('.container');
const [ $range ] = utils.$('.range');

for (let i = 0; i < 150; i++) {
  const $particle = document.createElement('div');
  $particle.classList.add('particle');
  $container.appendChild($particle);
  animate($particle, {
    x: utils.random(-10, 10, 2) + 'rem',
    y: utils.random(-3, 3, 2) + 'rem',
    scale: [{ from: 0, to: 1 }, { to: 0 }],
    delay: utils.random(0, 1000),
    loop: true,
  });  
}

function onInput() {
  utils.sync(() => engine.speed = this.value);
}

$range.addEventListener('input', onInput);
```

Example (html):

```html
<div class="large row container"></div>
<div class="medium row">
  <fieldset class="controls">
    <input type="range" min=0.1 max=2 value=1 step=.01 class="range" />
  </fieldset>
</div>
```

---

## timeUnit (seconds / milliseconds)

Docs: https://animejs.com/documentation/engine/engine-parameters/timeunit-seconds-milliseconds · Since 4.0.0

Configures the unit of time to use for time-related values like `duration` and `delay`.
 The currently defined default duration is automatically adjusted to the newly specified time unit.

```js
engine.timeUnit = 's'; // Change the time unit globally to seconds
console.log(engine.engine.defaults.duration); // -> Returns 1
```


### Accepts

- `'s'` to use seconds
- `'ms'` to use milliseconds


### Default

`'ms'`

Example (javascript):

```javascript
import { engine, animate, utils } from 'animejs';

const [ $timeS ] = utils.$('.time-s');
const [ $timeMs ] = utils.$('.time-ms');
const [ $ms, $s ] = utils.$('.toggle');

const secondsTimer = createTimer({
  duration: 1,
  loop: true,
  onUpdate: self => $timeS.innerHTML = utils.roundPad(self.iterationCurrentTime, 2)
});

const millisecondsTimer = createTimer({
  duration: 1000,
  loop: true,
  onUpdate: self => $timeMs.innerHTML = utils.roundPad(self.iterationCurrentTime, 2)
});

const toggleSetting = () => {
  const isUsingSeconds = engine.timeUnit === 's';
  engine.timeUnit = isUsingSeconds ? 'ms' : 's';
  $ms.disabled = isUsingSeconds;
  $s.disabled = !isUsingSeconds;
}

$ms.addEventListener('click', toggleSetting);
$s.addEventListener('click', toggleSetting);
```

Example (html):

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">duration: 1</span>
      <span class="time-s value lcd">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">duration: 1000</span>
      <span class="time-ms value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button toggle" disabled>milliseconds</button>
    <button class="button toggle">seconds</button>
  </fieldset>
</div>
```

---

## Engine properties

Docs: https://animejs.com/documentation/engine/engine-properties · Since 4.0.0

```js
import { engine } from 'animejs';
       ┌───────────────────────┐
engine.│deltaTime              │
engine.│useDefaultMainLoop     ├─ Properties
engine.│pauseOnDocumentHidden  │
       └───────────────────────┘
```

| Name | Description |
|---|---|
| timeUnit | Gets and sets the unit of time to use for time-related values like `duration` and `delay` (`'ms' \| 's'`) |
| currentTime | Gets the current time of the engine (`Number`) |
| deltaTime | Gets the time elapsed since the last frame (`Number`) |
| precision | Gets and sets how many decimal places to round string values to during an animation (`Number`) |
| speed | Gets or sets the global playback rate for all animations (`Number`) |
| fps | Gets or sets the global frame rate for all animations (`Number`) |
| useDefaultMainLoop | Gets or sets whether the engine uses its default main loop (`Boolean`) |
| pauseOnDocumentHidden | Gets or sets whether the engine pauses when the tab is hidden (`Boolean`) |

---

