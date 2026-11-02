# Anime.js v4 · Animation

Source: official documentation at https://animejs.com/documentation (MIT-licensed library by Julian Garnier).

## Animation

Docs: https://animejs.com/documentation/animation

### Animates the properties values of targeted elements, with a wide range of parameters, callbacks and methods.

Animations are created using the `animate()` method imported from the main `'animejs'` module:

```js
import { animate } from 'animejs';

const animation = animate(targets, parameters);
```

Or imported as a standalone module from the `'animejs/animation'` subpath:

```js
import { animate } from 'animejs/animation';
```


### Parameters

| Name | Accepts |
|---|---|
| targets | Targets |
| parameters | An `Object` of Animatable properties, Tween parameters, Playback settings and Animation callbacks |


### Returns

`JSAnimation`

> ### WAAPI powered animations
> 
> Anime.js provides a more lightweight (3KB) version of the `animate()` method (10KB) powered by the Web Animation API.
> 
> ```js
> import { waapi } from 'animejs';
> 
> const animation = waapi.animate(targets, parameters);
> ```
> 
> The WAAPI version has less features overall, but covers most of the basic API.
> 
> To know more about when to use the WAAPI version and its potential pitfalls, please refer to the Web Animations API Guide.
> 
> > Features only available in the JavaScript version are indicated with a (JS) badge and WAAPI specific features are indicated with a (WAAPI) badge

Example (javascript):

```javascript
import { animate, stagger, splitText } from 'animejs';

const { chars } = splitText('h2', { words: false, chars: true });

animate(chars, {
  // Property keyframes
  y: [
    { to: '-2.75rem', ease: 'outExpo', duration: 600 },
    { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
  ],
  // Property specific parameters
  rotate: {
    from: '-1turn',
    delay: 0
  },
  delay: stagger(50),
  ease: 'inOutCirc',
  loopDelay: 1000,
  loop: true
});
```

Example (html):

```html
<div class="large grid centered square-grid">
  <h2 class="text-xl">HELLO WORLD</h2>
</div>
```

---

## Animatable properties

Docs: https://animejs.com/documentation/animation/animatable-properties · Since 1.0.0

Define which properties of the Targets can be animated.
 Animatable properties are defined in the parameters `Object` of the `animate()` function.

```js
animate('.square', {
┌──────────────────┐
│ translateX: 100, │
│ scale: 2,        ├─ Animatable Properties
│ opacity: .5,     │
└──────────────────┘
  duration: 400,
  delay: 250,
  ease: 'out(3)',
  loop: 3,
  alternate: true,
  autoplay: false,
  onBegin: () => {},
  onLoop: () => {},
  onUpdate: () => {},
});
```

---

## CSS Properties

Docs: https://animejs.com/documentation/animation/animatable-properties/css-properties · Since 1.0.0

Any CSS numerical and color properties can be animated.
 Properties containing a dash in their name, like `background-color`, must be converted to camel case (`backgroundColor`), or written as a `String` (`'background-color'`).

> Most CSS properties can cause layout changes or repaint leading to choppy animations. To achieve smoother animations, always prioritise opacity and CSS transforms as much as possible.

Example (javascript):

```javascript
import { animate } from 'animejs';

animate('.square', {
  left: 'calc(7.75rem * 2)',
  borderRadius: 64,
  'background-color': '#F9F640',
  filter: 'blur(5px)',
});
```

Example (html):

```html
<div class="large row">
  <div class="square"></div>
</div>
```

---

## CSS transforms

Docs: https://animejs.com/documentation/animation/animatable-properties/css-transforms · Since 1.0.0

The CSS `transform` property can be animated by specifying individual properties directly in the parameter object with both JS and WAAPI `animate()` versions.

This allows a greater level of control over how to animate individual transform properties, giving you more flexibility than CSS animations or native WAAPI.

Transforms follow a fixed render order: `perspective` → `translate` → `rotate` → `scale` → `skew`, regardless of the order they are defined in animation parameters. Adjacent axis properties are automatically grouped into CSS shorthand (e.g. `translateX` + `translateY` → `translate(x, y)`).

The JS `animate()` method doesn't parse transforms declared from a CSS style declaration and transforms properties must be set directly in the inline styles of the element. You can use the built-in `utils.set()` function to independently set your transform values before animating an element.

In order to animate the `transform` property directly, it's recommended to use the WAAPI powered `waapi.animate()` method.

> Since version 4.4.0, transforms follow a fixed render order and `matrix` / `matrix3d` can no longer be animated directly (they are still preserved when read from inline styles).

> Individual transforms with WAAPI only works for browsers that support `CSS.registerProperty(propertyDefinition)`, and fallback to no animations.


### Valid individual CSS transforms properties

| Name | Shorthand | Default Value | Default Unit |
|---|---|---|---|
| translateX | x | `'0px'` | `'px'` |
| translateY | y | `'0px'` | `'px'` |
| translateZ | z | `'0px'` | `'px'` |
| rotate | — | `'0deg'` | `'deg'` |
| rotateX | — | `'0deg'` | `'deg'` |
| rotateY | — | `'0deg'` | `'deg'` |
| rotateZ | — | `'0deg'` | `'deg'` |
| scale | — | `'1'` | — |
| scaleX | — | `'1'` | — |
| scaleY | — | `'1'` | — |
| scaleZ | — | `'1'` | — |
| skew | — | `'0deg'` | `'deg'` |
| skewX | — | `'0deg'` | `'deg'` |
| skewY | — | `'0deg'` | `'deg'` |
| perspective | — | `'0px'` | `'px'` |

Example (javascript):

```javascript
import { animate, waapi } from 'animejs';

animate('.square', {
  x: '15rem', // TranslateX shorthand
  scale: 1.25,
  skew: -45,
  rotate: '1turn',
});

// the WAAPI version is recommanded if you want to animate the transform property directly
waapi.animate('.square', {
  transform: 'translateX(15rem) scale(1.25) skew(-45deg) rotate(1turn)',
});
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
  <span class="padded label">JS / WAAPI</span>
</div>
<div class="medium row">
  <div class="square"></div>
  <span class="padded label">WAAPI</span>
</div>
```

---

## CSS VariablesJS

Docs: https://animejs.com/documentation/animation/animatable-properties/css-variables · Since 4.0.0

CSS variables with numerical or color values can be animated by directly passing the variable name as a string to the animation parameters.
 This approach also enables animation of properties defined on pseudo-elements like `::after` and `::before`, which are otherwise inaccessible via JavaScript.

> In order to animate CSS variables properties with the WAAPI powered `waapi.animate()` method, you need to use `CSS.registerProperty(propertyDefinition)`, otherwise it falls back to no animations.

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

// Assign the CSS variables to the properties of the animated elements
utils.set('.square', {
  '--radius': '4px',
  '--x': '0rem',
  '--pseudo-el-after-scale': '1', // applied to the pseudo element "::after"
  // Using a function prevents the variables from being converted
  borderRadius: () => 'var(--radius)',
  translateX: () => 'var(--x)',
});

// Animate the values of the CSS variables
animate('.square', {
  '--radius': '20px',
  '--x': '16.5rem',
  '--pseudo-el-after-scale': '1.55' // Animates the ":after" pseudo element of the element
});
```

Example (html):

```html
<div class="medium row">
  <div class="css-variables square"></div>
</div>
<div class="medium row">
  <div class="css-variables square"></div>
</div>
<div class="medium row">
  <div class="css-variables square"></div>
</div>
```

---

## HTML AttributesJS

Docs: https://animejs.com/documentation/animation/animatable-properties/html-attributes · Since 1.0.0

Numerical and color HTML attributes can be passed directly to the animation parameters.

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

animate('input', {
  value: 1000, // animate the input "value" attribute
  alternate: true,
  loop: true,
  modifier: utils.round(0),
});
```

Example (html):

```html
<pre class="row large centered">
  <input type="range" value="0" min="0" max="1000" />
  <input type="text" value="0" size="5"/>
</pre>
```

---

## JavaScript Object propertiesJS

Docs: https://animejs.com/documentation/animation/animatable-properties/javascript-object-properties · Since 1.0.0

Numerical and color JavaScript `Object` properties can be passed directly to the animation parameters.

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

const myObject = {
  number: 1337,
  unit: '42%',
}

const [ $log ] = utils.$('code');

animate(myObject, {
  number: 50,
  unit: '100%',
  modifier: utils.round(0),
  onRender: function() {
    $log.innerHTML = JSON.stringify(myObject);
  }
});
```

Example (html):

```html
<pre class="row large centered">
  <code>{"number":1337,"unit":"42%"}</code>
</pre>
```

---

## SVG AttributesJS

Docs: https://animejs.com/documentation/animation/animatable-properties/svg-attributes · Since 1.0.0

Numerical and color SVG attributes can be animated by passing them directly to the animation parameters.

> For more convenient SVG animations, check out the built-in SVG utility methods.

Example (javascript):

```javascript
import { animate } from 'animejs';

animate(['feTurbulence', 'feDisplacementMap'], {
  baseFrequency: .05,
  scale: 15,
  alternate: true,
  loop: true
});

animate('polygon', {
  points: '64 68.64 8.574 100 63.446 67.68 64 4 64.554 67.68 119.426 100',
  alternate: true,
  loop: true
});
```

Example (html):

```html
<div class="large centered row">
<svg width="128" height="128" viewBox="0 0 128 128">
  <filter id="displacementFilter">
    <feTurbulence type="turbulence" numOctaves="2" baseFrequency="0" result="turbulence"/>
    <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="1" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <polygon points="64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96"  fill="currentColor"/>
</svg>
</div>
```

---

## Animation callbacks

Docs: https://animejs.com/documentation/animation/animation-callbacks · Since 1.0.0

Execute functions at specific points during an animation playback.
 Callbacks `Function` are specified directly in the `animate()` parameters `Object`.

```js
animate('.square', {
  translateX: 100,
  scale: 2,
  opacity: .5,
  duration: 400,
  delay: 250,
  ease: 'out(3)',
  loop: 3,
  alternate: true,
  autoplay: false,
┌─────────────────────┐
│ onBegin: () => {},  │
│ onLoop: () => {},   ├─ Callbacks
│ onUpdate: () => {}, │
└─────────────────────┘
});
```

---

## onBeforeUpdateJS

Docs: https://animejs.com/documentation/animation/animation-callbacks/onbeforeupdate · Since 4.0.0

Executes a function before updating the tween values, on every frames of a running animation at the specified `frameRate`.


### Accepts

A `Function` whose first argument is the animation itself


### Default

`noop`

> To change the default value globally, update the `engine.defaults` object.
> 
> ```js
> import { engine } from 'animejs';
> engine.defaults.onBeforeUpdate = self => console.log(self.id);
> ```

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let mult = 1;
let updates = 0;

const animation = animate('.circle', {
  x: '16rem',
  loopDelay: 1500,
  modifier: v => mult * v,
  loop: true,
  alternate: true,
  onBeforeUpdate: self => {
    $value.textContent = ++updates;
    // Update the mult value just before updating the tweens
    mult = 1 - self.iterationProgress;
  }
});
```

Example (html):

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">updates</span>
    <span class="value">0</span>
  </pre>
</div>
```

---

## onBeginJS

Docs: https://animejs.com/documentation/animation/animation-callbacks/onbegin · Since 4.0.0

Executes a function when an animation begins to play.


### Accepts

A `Function` whose first argument is the animation itself


### Default

`noop`

> To change the default value globally, update the `engine.defaults` object.
> 
> ```js
> import { engine } from 'animejs';
> engine.defaults.onBegin = self => console.log(self.id);
> ```

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

const [ $value ] = utils.$('.value');

const animation = animate('.circle', {
  x: '16rem',
  delay: 1000, // Delays the onBegin() callback by 1000ms
  onBegin: self => $value.textContent = self.began
});
```

Example (html):

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">began</span>
    <span class="value">false</span>
  </pre>
</div>
```

---

## onComplete

Docs: https://animejs.com/documentation/animation/animation-callbacks/oncomplete · Since 4.0.0

Executes a function when all the iterations (loops) of an animation have finished playing.


### Accepts

A `Function` whose first argument is the animation itself


### Default

`noop`

> To change the default value globally, update the `engine.defaults` object.
> 
> ```js
> import { engine } from 'animejs';
> engine.defaults.onComplete = self => console.log(self.id);
> ```

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

const [ $value ] = utils.$('.value');

const animation = animate('.circle', {
  x: '16rem',
  delay: 500,
  loop: 2,
  alternate: true,
  onComplete: self => $value.textContent = self.completed
});
```

Example (html):

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">completed</span>
    <span class="value">false</span>
  </pre>
</div>
```

---

## onLoopJS

Docs: https://animejs.com/documentation/animation/animation-callbacks/onloop · Since 4.0.0

Executes a function every time an animation iteration (loop) completes.


### Accepts

A `Function` whose first argument is the animation itself


### Default

`noop`

> To change the default value globally, update the `engine.defaults` object.
> 
> ```js
> import { engine } from 'animejs';
> engine.defaults.onLoop = self => console.log(self.id);
> ```

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let loops = 0;

const animation = animate('.circle', {
  x: '16rem',
  loopDelay: 1500,
  loop: true,
  alternate: true,
  onLoop: self => $value.textContent = ++loops
});
```

Example (html):

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">loops</span>
    <span class="value">0</span>
  </pre>
</div>
```

---

## onPauseJS

Docs: https://animejs.com/documentation/animation/animation-callbacks/onpause · Since 4.0.0

Executes a function when a running animation is paused, either manually or automatically.

An animation pauses when any of the following occurs during playback:

- The `.pause()` method is called
- The `.cancel()` method is called
- The `.revert()` method is called
- All animation tweens are overlapped by another animation with `composition: 'replace'`
- All animation targets have been removed


### Accepts

A `Function` whose first argument is the animation itself


### Default

`noop`

> To change the default value globally, update the `engine.defaults` object.
> 
> ```js
> import { engine } from 'animejs';
> engine.defaults.onPause = self => console.log(self.id);
> ```

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

const [ $animateButton, $pauseButton, $removeButton ] = utils.$('.button');
const [ $value ] = utils.$('.value');
const [ $circle ] = utils.$('.circle');

let paused = 0;
let alternate = 0;
let animation;

const animateX = () => {
  alternate = !alternate;
  animation = animate($circle, {
    x: () => (alternate ? 16 : 0) + 'rem',
    duration: 2000,
    onPause: () => $value.innerHTML = ++paused,
  });
}

const pauseAnimation = () => {
  if (animation) animation.pause();
}

const removeTarget = () => {
  utils.remove($circle);
}

animateX();

$animateButton.addEventListener('click', animateX);
$pauseButton.addEventListener('click', pauseAnimation);
$removeButton.addEventListener('click', removeTarget);
```

Example (html):

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">paused</span>
    <span class="value">0</span>
  </pre>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Animate x</button>
    <button class="button">Pause anim</button>
    <button class="button">Remove target</button>
  </fieldset>
</div>
```

---

## onRenderJS

Docs: https://animejs.com/documentation/animation/animation-callbacks/onrender · Since 4.0.0

Executes a function every time an animation renders something on the screen, this means that no rendering is happening when the `currentTime` is inside the `delay` or `loopDelay` time frames.


### Accepts

A `Function` whose first argument is the animation itself


### Default

`noop`

> To change the default value globally, update the `engine.defaults` object.
> 
> ```js
> import { engine } from 'animejs';
> engine.defaults.onRender = self => console.log(self.id);
> ```

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

const [ $rendersLog ] = utils.$('.value');

let renders = 0;

const animation = animate('.circle', {
  x: '16rem',
  loopDelay: 1500,
  loop: true,
  alternate: true,
  onRender: self => $rendersLog.textContent = ++renders
});
```

Example (html):

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">renders</span>
    <span class="value">0</span>
  </pre>
</div>
```

---

## onUpdateJS

Docs: https://animejs.com/documentation/animation/animation-callbacks/onupdate · Since 4.0.0

Executes a function on every frames of a running animation at the specified `frameRate`.


### Accepts

A `Function` whose first argument is the animation itself


### Default

`noop`

> To change the default value globally, update the `engine.defaults` object.
> 
> ```js
> import { engine } from 'animejs';
> engine.defaults.onUpdate = self => console.log(self.id);
> ```

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let updates = 0;

const animation = animate('.circle', {
  x: '16rem',
  loopDelay: 1500,
  loop: true,
  alternate: true,
  onUpdate: self => $value.textContent = ++updates
});
```

Example (html):

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">updates</span>
    <span class="value">0</span>
  </pre>
</div>
```

---

## then()

Docs: https://animejs.com/documentation/animation/animation-callbacks/then · Since 4.0.0

Returns a `Promise` that resolves and execute a callback when the animation completes.

The `then()` method can be directly inlined like this:

```js
animate(target, {x: 100, duration: 500}).then(callback);
```

Or used in an `async` / `await` context:

```js
async function waitForAnimationToComplete() {
  return animate(target, {
    x: 100,
    duration: 500,
  });
}

const asyncAnimation = await waitForAnimationToComplete();
```


### Parameters

| Name | Type |
|---|---|
| callback | A `Function` whose first argument is the animation itself |


### Returns

`Promise`

Example (javascript):

```javascript
import { animate } from 'animejs';

const [ $value ] = utils.$('.value');

const animation = animate('.circle', {
  x: '16rem',
  delay: 500,
});

animation.then(() => $value.textContent = 'fulfilled');
```

Example (html):

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">promise status</span>
    <span class="value">pending</span>
  </pre>
</div>
```

---

## Animation methods

Docs: https://animejs.com/documentation/animation/animation-methods · Since 1.0.0

Methods available on the `Animation` instance returned by an `animate()` function, providing control over the timing, behaviour, and progression of an animation.

```js
const animation = animate(target, parameters);
          ┌──────────┐
animation.│pause()   │
animation.│play()    ├─ Methods
animation.│restart() │
          └──────────┘
```

---

## alternate()

Docs: https://animejs.com/documentation/animation/animation-methods/alternate · Since 1.0.0

Toggles the playback direction while adjusting the `currentTime` position to reflect the new time progress.


### Returns

The animation itself

> Can be chained with other animation methods.

Example (javascript):

```javascript
import { animate, utils, stagger } from 'animejs';

const [ $alternateButton ] = utils.$('.button');

const animation = animate('.square', {
  x: '17rem',
  ease: 'inOutSine',
  loop: true,
  delay: stagger(100),
});

const alternateAnimation = () => animation.alternate();

$alternateButton.addEventListener('click', alternateAnimation);
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Alternate</button>
  </fieldset>
</div>
```

---

## cancel()

Docs: https://animejs.com/documentation/animation/animation-methods/cancel · Since 4.0.0

Pauses the animation, removes it from the engine's main loop, and frees up memory.


### Returns

The animation itself

> Can be chained with other animation methods.

Example (javascript):

```javascript
import { animate, utils, stagger } from 'animejs';

const [ $cancelButton ] = utils.$('.cancel');
const [ $playButton ] = utils.$('.play');

const animation = animate('.square', {
  x: '17rem',
  alternate: true,
  ease: 'inOutSine',
  loop: true,
  delay: stagger(100),
});

const cancelAnimation = () => animation.cancel();
const playAnimation = () => animation.play();

$cancelButton.addEventListener('click', cancelAnimation);
$playButton.addEventListener('click', playAnimation);
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button cancel">Cancel</button>
    <button class="button play">Play</button>
  </fieldset>
</div>
```

---

## complete()

Docs: https://animejs.com/documentation/animation/animation-methods/complete · Since 4.0.0

Completes the animation instantly.


### Returns

The animation itself

> Can be chained with other animation methods.

Example (javascript):

```javascript
import { animate, utils, stagger } from 'animejs';

const [ $completeButton ] = utils.$('.complete');

const animation = animate('.square', {
  x: '17rem',
  alternate: true,
  ease: 'inOutSine',
  loop: true,
  delay: stagger(100),
});

const completeAnimation = () => animation.complete();

$completeButton.addEventListener('click', completeAnimation);
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button complete">Complete</button>
  </fieldset>
</div>
```

---

## pause()

Docs: https://animejs.com/documentation/animation/animation-methods/pause · Since 1.0.0

Pauses a running animation.


### Returns

The animation itself

> Can be chained with other animation methods.

Example (javascript):

```javascript
import { animate, utils, stagger } from 'animejs';

const [ $pauseButton ] = utils.$('.pause');

const animation = animate('.square', {
  x: '17rem',
  alternate: true,
  ease: 'inOutSine',
  loop: true,
  delay: stagger(100),
});

const pauseAnimation = () => animation.pause();

$pauseButton.addEventListener('click', pauseAnimation);
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button pause">Pause</button>
  </fieldset>
</div>
```

---

## play()

Docs: https://animejs.com/documentation/animation/animation-methods/play · Since 1.0.0

Forces the animation to play forward.


### Returns

The animation itself

> Can be chained with other animation methods.

Example (javascript):

```javascript
import { animate, utils, stagger } from 'animejs';

const [ $playButton ] = utils.$('.play');

const animation = animate('.square', {
  x: '17rem',
  ease: 'inOutSine',
  delay: stagger(100),
  autoplay: false, // The animation is paused by default
});

const playAnimation = () => animation.play();

$playButton.addEventListener('click', playAnimation);
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button play">Play</button>
  </fieldset>
</div>
```

---

## refresh()JS

Docs: https://animejs.com/documentation/animation/animation-methods/refresh · Since 4.0.0

Re-computes animated properties values defined with a Function based value by updating the *from* values to the current target values, and the *to* values to the newly computed values.

> Only the animatable properties values are re-calculated, `duration` and `delay` cannot be refreshed.


### Returns

The animation itself

> Can be chained with other animation methods.

Example (javascript):

```javascript
import { animate } from 'animejs';

const [ $refreshButton ] = utils.$('.refresh');

const animation = animate('.square', {
  x: () => utils.random(0, 17) + 'rem',
  y: () => utils.random(-1, 1) + 'rem',
  rotate: () => utils.random(-360, 360, 1),
  scale: () => utils.random(.1, 1.5, 2),
  duration: 750,
  loop: true,
  onLoop: self => self.refresh()
});

const refreshAnimation = () => animation.refresh().restart();

$refreshButton.addEventListener('click', refreshAnimation);
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button refresh">Refresh & Restart</button>
  </fieldset>
</div>
```

---

## reset()JS

Docs: https://animejs.com/documentation/animation/animation-methods/reset · Since 3.0.0

Pauses and resets `currentTime`, `progress`, `reversed`, `began`, `completed` properties to their default values.

```js
animation.reset(softReset);
```


### Parameters

| Name | Type | Description |
|---|---|---|
| softReset=false (opt) | `Boolean` | If `true`, only reset the internal values without causing a visual render |


### Returns

The animation itself

> Can be chained with other animation methods.

Example (javascript):

```javascript
import { animate, utils, stagger } from 'animejs';

const [ $hardReset, $softReset ] = utils.$('.button');

const animation = animate('.square', {
  x: '17rem',
  alternate: true,
  ease: 'inOutSine',
  loop: true,
  delay: stagger(100),
});

const hardReset = () => animation.reset();
const softReset = () => animation.reset(true);

$hardReset.addEventListener('click', hardReset);
$softReset.addEventListener('click', softReset);
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Hard reset</button>
    <button class="button">Soft reset</button>
  </fieldset>
</div>
```

---

## restart()

Docs: https://animejs.com/documentation/animation/animation-methods/restart · Since 1.0.0

Resets all properties and set the `currentTime` of an animation to `0`.

If the `autoplay` is set to `true`, the animation plays automatically.


### Returns

The animation itself

> Can be chained with other animation methods.

Example (javascript):

```javascript
import { animate, utils, stagger } from 'animejs';

const [ $restartButton ] = utils.$('.restart');

const animation = animate('.square', {
  x: '17rem',
  direction: 'alternate',
  ease: 'inOutSine',
  loop: true,
  delay: stagger(100)
});

const restartAnimation = () => animation.restart();

$restartButton.addEventListener('click', restartAnimation);
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button restart">Restart</button>
  </fieldset>
</div>
```

---

## resume()

Docs: https://animejs.com/documentation/animation/animation-methods/resume · Since 1.0.0

Resumes the playback of a paused animation in its current direction.


### Returns

The animation itself

> Can be chained with other animation methods.

Example (javascript):

```javascript
import { animate, utils, stagger } from 'animejs';

const [ $pauseButton, $alternateButton, $resumeButton ] = utils.$('.button');

const animation = animate('.square', {
  x: '17rem',
  ease: 'inOutSine',
  loop: true,
  delay: stagger(100),
});

const pauseAnimation = () => animation.pause();
const alternateAnimation = () => animation.alternate();
const resumeAnimation = () => animation.resume();

$pauseButton.addEventListener('click', pauseAnimation);
$alternateButton.addEventListener('click', alternateAnimation);
$resumeButton.addEventListener('click', resumeAnimation);
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Pause</button>
    <button class="button">Alternate</button>
    <button class="button">Resume</button>
  </fieldset>
</div>
```

---

## reverse()

Docs: https://animejs.com/documentation/animation/animation-methods/reverse · Since 1.0.0

Forces the animation to play backward.


### Returns

The animation itself

> Can be chained with other animation methods.

Example (javascript):

```javascript
import { animate, utils, stagger } from 'animejs';

const [ $reverseButton ] = utils.$('.reverse');

const animation = animate('.square', {
  x: '17rem',
  ease: 'inOutSine',
  delay: stagger(100),
});

const reverseAnimation = () => animation.reverse();

$reverseButton.addEventListener('click', reverseAnimation);
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button reverse">Reverse</button>
  </fieldset>
</div>
```

---

## revert()

Docs: https://animejs.com/documentation/animation/animation-methods/revert · Since 4.0.0

Cancels the animation, reverts all its animated values to their original state, cleanup the CSS inline styles, and reverts the linked `onScroll()` instance if necessary.

Use `revert()` when you want to completely stop and destroy an animation.


### Returns

The animation itself

> Can be chained with other animation methods.

Example (javascript):

```javascript
import { animate, utils, stagger } from 'animejs';

const [ $revertButton ] = utils.$('.revert');
const [ $restartButton ] = utils.$('.restart');

// Set an initial translateX value
utils.set('.square', { x: '17rem' });

const animation = animate('.square', {
  x: 0,
  alternate: true,
  ease: 'inOutSine',
  loop: true,
  delay: stagger(100),
});

const revertAnimation = () => animation.revert();
const restartAnimation = () => animation.restart();

$revertButton.addEventListener('click', revertAnimation);
$restartButton.addEventListener('click', restartAnimation);
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button revert">Revert</button>
    <button class="button restart">Restart</button>
  </fieldset>
</div>
```

---

## seek()

Docs: https://animejs.com/documentation/animation/animation-methods/seek · Since 1.0.0

Updates the `currentTime` of the animation and advances it to a specific time.

```js
animation.seek(time, muteCallbacks);
```


### Parameters

| Name | Type | Description |
|---|---|---|
| time | `Number` | The new `currentTime` in ms of the animation |
| muteCallbacks=false (opt) | `Boolean` | If `true`, prevent the callbacks from being fired |


### Returns

The animation itself

> Can be chained with other animation methods.

Example (javascript):

```javascript
import { animate, utils, stagger } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $playPauseButton ] = utils.$('.play-pause');

const updateButtonLabel = animation => {
  $playPauseButton.textContent = animation.paused ? 'Play' : 'Pause';
}

const animation = animate('.square', {
  x: '17rem',
  ease: 'inOutSine',
  duration: 1750,
  delay: stagger(250),
  autoplay: false,
  onUpdate: self => {
    $range.value = self.currentTime;
    updateButtonLabel(self);
  },
  onComplete: updateButtonLabel,
});

const seekAnimation = () => animation.seek(+$range.value);

const playPauseAnimation = () => {
  if (animation.paused) {
    animation.play();
  } else {
    animation.pause();
    updateButtonLabel(animation);
  }
}

$range.addEventListener('input', seekAnimation);
$playPauseButton.addEventListener('click', playPauseAnimation);
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium centered row">
  <fieldset class="controls">
    <input type="range" min=0 max=2000 value=0 class="range" />
    <button style="flex: 0.25;" class="button play-pause">Play</button>
  </fieldset>
</div>
```

---

## stretch()JS

Docs: https://animejs.com/documentation/animation/animation-methods/stretch · Since 4.0.0

Changes the total duration of an animation and its tweens duration to fit a specific time.
 The total duration is equal to the duration of an iteration multiplied with the total number of iterations. So if an animation is 1000ms and loops twice (3 iterations in total), the total duration will be 3000ms (1000 * 3).

```js
animation.stretch(duration);
```


### Parameters

| Name | Type | Description |
|---|---|---|
| duration | `Number` | The new total duration in ms of the animation |

> Stretching an animation to `0` will also set all its tweens' durations to `0`, which will make them all the same length on subsequent calls to `stretch()`.


### Returns

The animation itself

> Can be chained with other animation methods.

Example (javascript):

```javascript
import { animate, utils, stagger } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $totalDuration ] = utils.$('.value');

const animation = animate('.square', {
  x: '17rem',
  ease: 'inOutSine',
  delay: stagger(200),
});

const stretchAnimation = () => {
  const newDuration = +$range.value;
  $totalDuration.textContent = newDuration;
  animation.stretch(newDuration).restart();
}

stretchAnimation();

$range.addEventListener('input', stretchAnimation);
```

Example (html):

```html
<pre class="large log row">
  <span class="label">total duration</span>
  <span class="value">0</span>
</pre>
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium centered row">
  <fieldset class="controls">
    <input type="range" min=100 max=2000 value=1000 step=100 class="seek range" />
  </fieldset>
</div>
```

---

## Animation playback settings

Docs: https://animejs.com/documentation/animation/animation-playback-settings · Since 1.0.0

Specify the timings and behaviours of an animation.
 Playback settings properties are defined directly in the `animate()` parameters `Object`.

```js
animate('.square', {
  translateX: 100,
  scale: 2,
  opacity: .5,
  duration: 400,
  delay: 250,
  ease: 'out(3)',
┌───────────────────┐
│ loop: 3,          │
│ alternate: true,  ├─ Playback Settings
│ autoplay: false,  │
└───────────────────┘
  onBegin: () => {},
  onLoop: () => {},
  onUpdate: () => {},
});
```

---

## alternate

Docs: https://animejs.com/documentation/animation/animation-playback-settings/alternate · Since 4.0.0

Defines if the direction of the animation alternates on each iteration when the `loop` parameter is set to `true` or superior to `1`.


### Accepts

`Boolean`


### Default

`false`

> To change the default value globally, update the `engine.defaults` object.
> 
> ```js
> import { engine } from 'animejs';
> engine.defaults.alternate = true;
> ```

Example (javascript):

```javascript
import { animate } from 'animejs';

animate('.dir-normal', {
  x: '17rem',
  alternate: false, // Default
  loop: 1,
});

animate('.dir-alternate', {
  x: '17rem',
  alternate: true,
  loop: 1, // Required to see the second iteration
});

animate('.dir-alternate-reverse', {
  x: '17rem',
  alternate: true,
  reversed: true,
  loop: 1,
});
```

Example (html):

```html
<div class="medium row">
  <div class="circle dir-normal"></div>
  <div class="padded label">alternate: false</div>
</div>
<div class="medium row">
  <div class="circle dir-alternate"></div>
  <div class="padded label">alternate: true</div>
</div>
<div class="medium row">
  <div class="circle dir-alternate-reverse"></div>
  <div class="padded label">alternate: true, reversed: true</div>
</div>
```

---

## autoplay

Docs: https://animejs.com/documentation/animation/animation-playback-settings/autoplay · Since 1.0.0

Defines the play mode of an animation.

The autoplay parameter has no effect when the animation is added to a timeline, and will be overridden to `false`.


### Accepts

`Boolean` | `onScroll()`

- If set to `true` the animation plays automatically
- If set to `false` the animation has to be manually played
- If set to `onScroll()` the animation will starts when the scroll thresholds conditions are met


### Default

`true`

> To change the default value globally, update the `engine.defaults` object.
> 
> ```js
> import { engine } from 'animejs';
> engine.defaults.autoplay = false;
> ```

Example (javascript):

```javascript
animate('.autoplay-true', {
  x: '17rem',
  autoplay: true, // Default
});

animate('.autoplay-false', {
  x: '17rem',
  autoplay: false,
});
```

Example (html):

```html
<div class="medium row">
  <div class="circle autoplay-true"></div>
  <div class="padded label">autoplay: true</div>
</div>
<div class="medium row">
  <div class="circle autoplay-false"></div>
  <div class="padded label">autoplay: false</div>
</div>
```

---

## delay

Docs: https://animejs.com/documentation/animation/animation-playback-settings/delay · Since 1.0.0

Defines the default delay in milliseconds of the animation tweens.


### Accepts

- A `Number` equal or greater than `0`
- A Function based value that returns a `Number` equal to or greater than `0`


### Default

`0`

> To change the default value globally, update the `engine.defaults` object.
> 
> ```js
> import { engine } from 'animejs';
> engine.defaults.delay = 500;
> ```

Example (javascript):

```javascript
import { animate } from 'animejs';

const playbackDelay = animate('.delay', {
  x: '16rem',
  scale: 1.8,
  delay: 500, // Global delay applied to all properties
  loop: true,
  alternate: true
});
```

Example (html):

```html
<div class="medium row">
  <div class="circle delay"></div>
</div>
```

---

## duration

Docs: https://animejs.com/documentation/animation/animation-playback-settings/duration · Since 1.0.0

Defines the default duration in milliseconds of all animation tweens.
 Setting `0` to a duration completes the animation instantly upon play.


### Accepts

- A `Number` equal or greater than `0`
- A Function based value that returns a `Number` equal to or greater than `0`

> Duration values higher than `1e12` are clamped internally to `1e12` (Or approximatively 32 years).


### Default

`1000`

> To change the default value globally, update the `engine.defaults` object.
> 
> ```js
> import { engine } from 'animejs';
> engine.defaults.duration = 500;
> ```

Example (javascript):

```javascript
import { animate } from 'animejs';

animate('.dur-0', {
  x: '17rem',
  duration: 0,
});

animate('.dur-500', {
  x: '17rem',
  duration: 500,
});

animate('.dur-2000', {
  x: '17rem',
  duration: 2000
});
```

Example (html):

```html
<div class="medium row">
  <div class="circle dur-0"></div>
  <div class="padded label">duration: 0</div>
</div>
<div class="medium row">
  <div class="circle dur-500"></div>
  <div class="padded label">duration: 500</div>
</div>
<div class="medium row">
  <div class="circle dur-2000"></div>
  <div class="padded label">duration: 2000</div>
</div>
```

---

## frameRateJS

Docs: https://animejs.com/documentation/animation/animation-playback-settings/framerate · Since 4.0.0

Determines the number of frames per second (fps) an animation is played at.
 This value can be modified later with `animation.fps = 30`.


### Accepts

A `Number` greater than `0`

> The frame rate is capped to the monitor refresh rate or in some cases by the browser itself.


### Default

`240`

> To change the default value globally, update the `engine.defaults` object.
> 
> ```js
> import { engine } from 'animejs';
> engine.defaults.frameRate = 30;
> ```

Example (javascript):

```javascript
import { animate } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $fps ] = utils.$('.fps');

const animation = animate('.circle', {
  x: '16rem',
  loop: true,
  alternate: true,
  frameRate: 60,
});

const updateFps = () => {
  const { value } = $range;
  $fps.innerHTML = value;
  animation.fps = value;
}

$range.addEventListener('input', updateFps);
```

Example (html):

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">fps</span>
    <span class="fps value">60</span>
  </pre>
</div>
<div class="medium row">
  <fieldset class="controls">
    <input type="range" min=0 max=120 value=60 step=1 class="range" />
  </fieldset>
</div>
```

---

## loop

Docs: https://animejs.com/documentation/animation/animation-playback-settings/loop · Since 1.0.0

Defines how many times an animation repeats.


### Accepts

| Value | Effect |
|---|---|
| `Number` | The number of loops in the range `[0, Infinity]` |
| `Infinity` | Loop indefinitely |
| `true` | Equivalent to `Infinity` |
| `-1` | Equivalent to `Infinity` |


### Default

`0`

> To change the default value globally, update the `engine.defaults` object.
> 
> ```js
> import { engine } from 'animejs';
> engine.defaults.loop = true;
> ```

Example (javascript):

```javascript
import { animate } from 'animejs';

animate('.loop', {
  x: '17.5rem',
  loop: 3,
});

animate('.loop-alternate', {
  x: '17.5rem',
  loop: 3,
  alternate: true,
});

animate('.loop-reverse', {
  x: '17.5rem',
  loop: 3,
  reversed: true,
});

animate('.loop-infinity', {
  x: '17.5rem',
  loop: true, // Or Infinity
});
```

Example (html):

```html
<div class="small row">
  <div class="circle loop"></div>
  <div class="padded label">loop: 3</div>
</div>
<div class="small row">
  <div class="circle loop-alternate"></div>
  <div class="padded label">loop: 3, alternate: true</div>
</div>
<div class="small row">
  <div class="circle loop-reverse"></div>
  <div class="padded label">loop: 3, reversed: true</div>
</div>
<div class="small row">
  <div class="circle loop-infinity"></div>
  <div class="padded label">loop: true</div>
</div>
```

---

## persistWAAPI

Docs: https://animejs.com/documentation/animation/animation-playback-settings/persist · Since 4.2.0

By default, WAAPI animations are automatically canceled and released from memory when they complete. This is necessary to prevent animations from running forever and causing potential memory leaks.

This behavior can causes issues when using methods on a completed WAAPI animation, since the animation won't be active anymore.

The `persist` parameter solves that, and keeps the animation active when it completes.


### Accepts

`Boolean`


### Default

`false`

For scroll-controlled WAAPI animations, the `persist` parameter is automatically set to `true`.

> To change the default value globally, update the `engine.defaults` object.
> 
> ```js
> import { engine } from 'animejs';
> engine.defaults.persist = true;
> ```

Example (javascript):

```javascript
import { waapi, utils } from 'animejs';

const [ $button ] = utils.$('.button');

const animationA = waapi.animate('.square-a', {
  x: '17rem',
  persist: false, // default
});

const animationB = waapi.animate('.square-b', {
  x: '17rem',
  persist: true,
});

const alaternateAnimations = () => {
  animationA.alternate().resume();
  animationB.alternate().resume();
};

$button.addEventListener('click', alaternateAnimations);
```

Example (html):

```html
<div class="medium row">
  <div class="square square-a"></div>
  <div class="padded label">persist: false</div>
</div>
<div class="medium row">
  <div class="square square-b"></div>
  <div class="padded label">persist: true</div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Alternate</button>
  </fieldset>
</div>
```

---

## loopDelayJS

Docs: https://animejs.com/documentation/animation/animation-playback-settings/playback-loopdelay · Since 4.0.0

Defines the delay in milliseconds between loops.


### Accepts

A `Number` that is equal to or greater than `0`


### Default

`0`

> To change the default value globally, update the `engine.defaults` object.
> 
> ```js
> import { engine } from 'animejs';
> engine.defaults.loopDelay = 500;
> ```

Example (javascript):

```javascript
import { animate } from 'animejs';

const loopDelayAnimation = animate('.circle', {
  x: '16rem',
  scale: {
    to: 1.8,
    delay: 500,
    duration: 500,
  },
  loopDelay: 1000,
  loop: true,
  alternate: true,
});
```

Example (html):

```html
<div class="medium row">
  <div class="circle"></div>
</div>
```

---

## playbackEaseJS

Docs: https://animejs.com/documentation/animation/animation-playback-settings/playbackease · Since 4.0.0

Applies and easing function to the entire playback of the animation.

Unlike the tween `ease` parameter that is applied in between every property keyframes like this:

```js
0 ────────────────────────────────› 1
A ──ease──› B ──ease──› C ──ease──› D
```

The `playbackEase` parameter is applied globally like this:

```js
0 ──────────────ease──────────────› 1
A ────────› B ────────› C ────────› D
```


### Accepts

ease


### Default

`null`

> To change the default value globally, update the `engine.defaults` object.
> 
> ```js
> import { engine } from 'animejs';
> engine.defaults.playbackEase = 'inOut';
> ```

Example (javascript):

```javascript
import { animate } from 'animejs';

animate('.square', {
  keyframes: [
    { y: '-2.5rem', duration: 400 },
    { x: '17rem', rotate: 180, scale: .5 },
    { y: '2.5rem' },
    { x: 0, rotate: 360, scale: 1 },
    { y: 0, duration: 400 }
  ],
  duration: 4000,
  playbackEase: 'inOut(3)', // this ease is applied accross all keyframes
  loop: true,
});
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
</div>
```

---

## playbackRate

Docs: https://animejs.com/documentation/animation/animation-playback-settings/playbackrate · Since 4.0.0

Defines a speed multiplier to speed up or slow down an animation.
 This value can be modified later with `animation.speed = .5`.


### Accepts

A `Number` greater than or equal to `0`

> If set to `0` the animation won't play.


### Default

`1`

> To change the default value globally, update the `engine.defaults` object.
> 
> ```js
> import { engine } from 'animejs';
> engine.defaults.playbackRate = .75;
> ```

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $speed ] = utils.$('.speed');

const animation = animate('.circle', {
  x: '16rem',
  loop: true,
  alternate: true,
  playbackRate: 1,
});

const updateSpeed = () => {
  const { value } = $range;
  $speed.innerHTML = utils.roundPad(+value, 2);
  utils.sync(() => animation.speed = value);
}

$range.addEventListener('input', updateSpeed);
```

Example (html):

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">speed</span>
    <span class="speed value">1.00</span>
  </pre>
</div>
<div class="medium row">
  <fieldset class="controls">
    <input type="range" min=0 max=5 value=1 step=.01 class="range" />
  </fieldset>
</div>
```

---

## reversed

Docs: https://animejs.com/documentation/animation/animation-playback-settings/reversed · Since 4.0.0

Defines the initial direction of the animation.


### Accepts

`Boolean`

- If set to `true` the animation plays backwards
- If set to `false` the animation plays forwards


### Default

`false`

> To change the default value globally, update the `engine.defaults` object.
> 
> ```js
> import { engine } from 'animejs';
> engine.defaults.reversed = true;
> ```

Example (javascript):

```javascript
import { animate } from 'animejs';

animate('.dir-normal', {
  x: '17rem',
  reversed: false, // Default behaviour
  loop: true
});

animate('.dir-reverse', {
  x: '17rem',
  reversed: true,
  loop: true
});
```

Example (html):

```html
<div class="medium row">
  <div class="circle dir-normal"></div>
  <div class="padded label">reversed: false</div>
</div>
<div class="medium row">
  <div class="circle dir-reverse"></div>
  <div class="padded label">reversed: true</div>
</div>
```

---

## Animation properties

Docs: https://animejs.com/documentation/animation/animation-properties

Properties available on the `Animation` instance returned by the `animate()` and `waapi.animate()` functions.

```js
const animation = animate(targets, parameters);
          ┌────────────┐
animation.│targets     │
animation.│currentTime ├─ Properties
animation.│duration    │
          └────────────┘
```

> Properties exclusive to the JS version of `animate()` are marked with a JS badge.

| Name | Description |
|---|---|
| id JS | Gets and sets the ID of the animation (`String` \| `Number`) |
| targets | Gets the current animation targets (`Array`) |
| currentTime | Gets and sets the global current time in ms of the animation (`Number`) |
| iterationCurrentTime JS | Gets and sets the current iteration time in ms (`Number`) |
| deltaTime JS | Gets the time in ms elapsed between the current and previous frame (`Number`) |
| progress | Gets and sets the overall progress of the animation from `0` to `1` (`Number`) |
| iterationProgress JS | Gets and sets the progress of the current iteration from `0` to `1` (`Number`) |
| currentIteration JS | Gets and sets the current iteration count (`Number`) |
| duration | Gets the total duration in ms of the animation (`Number`) |
| speed | Gets and sets the speed multiplier of the animation (`Number`) |
| fps JS | Gets and sets the fps of the animation (`Number`) |
| paused | Gets and sets whether the animation is paused (`Boolean`) |
| began JS | Gets and sets whether the animation has started (`Boolean`) |
| completed | Gets and sets whether the animation has completed (`Boolean`) |
| reversed JS | Gets and sets whether the animation is reversed (`Boolean`) |
| backwards JS | Gets whether the animation is currently playing backwards (`Boolean`) |

---

## Keyframes

Docs: https://animejs.com/documentation/animation/keyframes · Since 2.0.0

Create a sequence of animations on the same animatable property.


### Property value keyframes

Specific to an animated property, these keyframes are passed to the property value directly:

```js
animate('.square', {
┌───────────────────┐
│ x: [0, 100, 200], ├─ Tween Values Array
│ y: [0, 100, 200], │
└───────────────────┘
  duration: 3000,
}

animate('.square', {
┌────────────────────────────┐
│ x: [{to: 100}, {to: 200}], ├─ Tween Parameters Array
│ y: [{to: 100}, {to: 200}], │
└────────────────────────────┘
  duration: 3000,
}
```


### Animation keyframes

Defined at the animation level, these keyframes can animate multiple properties per keyframe:

```js
animate('.square', {
┌───────────────────────┐
│ keyframes: [          │
│   { x: 100, y: 100 }, ├─ Duration Based
│   { x: 200, y: 200 }, │
│ ],                    │
└───────────────────────┘
  duration: 3000,
}

animate('.square', {
┌───────────────────────────────┐
│ keyframes: {                  │
│   '0%'  : { x: 0,   y: 0   }, │
│   '50%' : { x: 100, y: 100 }, ├─ Percentage Based
│   '100%': { x: 200, y: 200 }, │
│ },                            │
└───────────────────────────────┘
  duration: 3000,
}
```

---

## Duration based keyframesJS

Docs: https://animejs.com/documentation/animation/keyframes/duration-based-keyframes · Since 2.0.0

Sequences multiple Animatable property one after another.

This syntax allows very fine control over an animation by giving access to `ease`, `delay`, `duration` and `modifier` parameters for each individual keyframes.

The default duration of a keyframe equals the total animation duration divided by the total number of keyframes.

```js
keyframes: [
  { y: 50, ease: 'out', duration: 400 },
  { x: 75, scale: .5, duration: 800 },
]
```


### Accepts

An `Array` of `Object` containing one Animatable property and Tween parameters

Example (javascript):

```javascript
import { animate } from 'animejs';

animate('.square', {
  keyframes: [
    { y: '-2.5rem', ease: 'out', duration: 400 },
    { x: '17rem', scale: .5, duration: 800 },
    { y: '2.5rem' }, // The duration here is 3000 / 5 = 600ms
    { x: 0, scale: 1, duration: 800 },
    { y: 0, ease: 'in', duration: 400 }
  ],
  rotate: { to: 360, ease: 'linear' },
  duration: 3000,
  ease: 'inOut', // ease applied between each keyframes if no ease defined
  playbackEase: 'ouIn(5)', // ease applied accross all keyframes
  loop: true,
});
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
</div>
```

---

## Percentage based keyframesJS

Docs: https://animejs.com/documentation/animation/keyframes/percentage-based-keyframes · Since 4.0.0

Sequences multiple Animatable properties with positions defined from a percentage of the animation total duration.

This syntax is very similar to the CSS `@keyframes` syntax and only exposes control over the `ease` parameter for each individual keyframes.

The first keyframe defines the from value of the tween.

```js
keyframes: {
  '25%' : { x: 100, y: 50, ease: 'out' },
  '50%' : { x: 200, y: 75, },
}
```


### Accepts

An `Object` where

- `keys` are `String` representing the percentages
- `values` are an `Object` containing at least one Animatable properties and an optional `ease` parameter.

Example (javascript):

```javascript
import { animate } from 'animejs';

animate('.square', {
  keyframes: {
    '0%'  : { x: '0rem', y: '0rem', ease: 'out' },
    '13%' : { x: '0rem', y: '-2.5rem', },
    '37%' : { x: '17rem', y: '-2.5rem', scale: .5 },
    '63%' : { x: '17rem', y: '2.5rem', scale: .5 },
    '87%' : { x: '0rem', y: '2.5rem', scale: 1 },
    '100%': { y: '0rem', ease: 'in' }
  },
  rotate: { to: 360, ease: 'linear' },
  duration: 3000,
  ease: 'inOut', // ease applied between each keyframes if no ease defined
  playbackEase: 'ouIn(5)', // ease applied accross all keyframes
  loop: true,
});
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
</div>
```

---

## Tween parameters keyframesJS

Docs: https://animejs.com/documentation/animation/keyframes/tween-parameters-keyframes · Since 2.0.0

Sequences multiple Tween parameters specific to an Animatable property.

This syntax allows very fine control over an animation by giving access to `ease`, `delay`, `duration` and `modifier` parameters for each individual keyframes.

The default `duration` of a keyframe equals the total animation duration divided by the total number of keyframes.


### Accepts

An `Array` of Tween parameters

Example (javascript):

```javascript
import { animate } from 'animejs';

animate('.square', {
  x: [
    { to: '17rem', duration: 700, delay: 400 },
    { to: 0, duration: 700, delay: 800 },
  ],
  y: [
    { to: '-2.5rem', ease: 'out', duration: 400 },
    { to: '2.5rem', duration: 800, delay: 700 },
    { to: 0, ease: 'in', duration: 400, delay: 700 },
  ],
  scale: [
    { to: .5, duration: 700, delay: 400 },
    { to: 1, duration: 700, delay: 800 },
  ],
  rotate: { to: 360, ease: 'linear' },
  duration: 3000,
  ease: 'inOut', // ease applied between each keyframes if no ease defined
  playbackEase: 'ouIn(5)', // ease applied accross all keyframes
  loop: true,
});
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
</div>
```

---

## Tween values keyframes

Docs: https://animejs.com/documentation/animation/keyframes/tween-values-keyframes · Since 4.0.0

Sequences multiple Tween value specific to an Animatable property using an `Array`.
 The duration between each keyframe equals the total animation duration divided by the number of transitions between each keyframes.
 The first keyframe defines the from value of the tween.

> You can use this syntax to quickly set the initial from value value of an animation:
> 
> ```js
> animate(target: { x: [-100, 100] }); // Animate x from -100 to 100
> ```


### Accepts

An `Array` of valid Tween values

Example (javascript):

```javascript
import { animate } from 'animejs';

animate('.square', {
  translateX: ['0rem', 0, 17, 17, 0, 0],
  translateY: ['0rem', -2.5, -2.5, 2.5, 2.5, 0],
  scale: [1, 1, .5, .5, 1, 1],
  rotate: { to: 360, ease: 'linear' },
  duration: 3000,
  ease: 'inOut', // ease applied between each keyframes if no ease defined
  playbackEase: 'ouIn(5)', // ease applied accross all keyframes
  loop: true,
});
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
</div>
```

---

## Targets

Docs: https://animejs.com/documentation/animation/targets · Since 4.0.0

Specify the elements to which property value changes are applied.
 Animation targets are defined in the first argument of the `animate()` function.

```js
animate(
┌────────────┐
│ '.square', ├─ Targets
└────────────┘
{
  translateX: 100,
  scale: 2,
  opacity: .5,
  duration: 400,
  delay: 250,
  ease: 'out(3)',
  loop: 3,
  alternate: true,
  autoplay: false,
  onBegin: () => {},
  onLoop: () => {},
  onUpdate: () => {},
});
```

---

## Array of targets

Docs: https://animejs.com/documentation/animation/targets/array-of-targets · Since 1.0.0

Targets multiple valid Targets simultaneously by grouping them inside an `Array`.
 Any types of targets can be grouped together


### Accepts

An `Array` of Targets

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

const [ $log ] = utils.$('code');

const vector2D = { x: 0, y: 0 };

animate([vector2D, '.square'], {
  x: '17rem',
  modifier: utils.roundPad(2).padStart(5, '0'),
  onRender: () => $log.textContent = JSON.stringify(vector2D),
});
```

Example (html):

```html
<pre class="row large centered">
  <code>{"x":"0"}</code>
</pre>
<div class="row medium">
  <div class="square"></div>
</div>
```

---

## CSS Selector

Docs: https://animejs.com/documentation/animation/targets/css-selector · Since 1.0.0

Targets one or multiple DOM Elements using a CSS selector.


### Accepts

Any `String` accepted by `document.querySelectorAll()`

Example (javascript):

```javascript
import { animate } from 'animejs';

animate('.square', { x: '17rem' });
animate('#css-selector-id', { rotate: '1turn' });
animate('.row:nth-child(3) .square', { scale: [1, .5, 1] });
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div id="css-selector-id" class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
```

---

## DOM Elements

Docs: https://animejs.com/documentation/animation/targets/dom-elements · Since 1.0.0

Targets one or multiple DOM Elements.


### Accepts

- `HTMLElement`
- `SVGElement`
- `SVGGeometryElement`
- `NodeList`

Example (javascript):

```javascript
import { animate } from 'animejs';

const $demo = document.querySelector('#selector-demo');
const $squares = $demo.querySelectorAll('.square');

animate($demo, { scale: .75 });
animate($squares, { x: '23rem' });
```

Example (html):

```html
<div id="selector-demo">
  <div class="medium row">
    <div class="square"></div>
  </div>
  <div class="medium row">
    <div class="square"></div>
  </div>
  <div class="medium row">
    <div class="square"></div>
  </div>
</div>
```

---

## JavaScript ObjectsJS

Docs: https://animejs.com/documentation/animation/targets/javascript-objects · Since 1.0.0

Targets one or multiple JavaScript `Object`.


### Accepts

- `Object`
- Instance of `Class`

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

const [ $log ] = utils.$('code');

const vector2D = { x: 0, y: 0 };

animate(vector2D, {
  x: 100,
  y: 150,
  modifier: utils.round(0),
  onUpdate: () => $log.textContent = JSON.stringify(vector2D),
});
```

Example (html):

```html
<pre class="row large centered">
  <code>{"x":0,"y":0}</code>
</pre>
```

---

## Tween parameters

Docs: https://animejs.com/documentation/animation/tween-parameters · Since 1.0.0

Configure values, timings, and behaviors of animated properties.
 Tween parameters can be specified *globally* for all properties directly with the other animation parameters, or *locally* for a specific property using an `Object`.
 All animatable properties inherit the *global* parameters, which can be overridden *locally* for a specific tween.

```js
animate('.square', {
  x: {
┌───────────────────┐
│   to: 100,        │
│   delay: 0,       ├─ Local Tween Parameters
│   ease: 'inOut(4)'│
└───────────────────┘
  },
  scale: 1,
  opacity: .5,
┌───────────────────┐
│ duration: 400,    │
│ delay: 250,       ├─ Global Tween Parameters
│ ease: 'out(3)',   │
└───────────────────┘
  loop: 3,
  alternate: true,
});
```

---

## compositionJS

Docs: https://animejs.com/documentation/animation/tween-parameters/composition · Since 4.0.0

Defines how animations behave when another animation on the same target with the same property is playing simultaneously. The composition mode can be defined globally for all animation properties or locally for a specific property.


### Accepts

| Mode | Description |
|---|---|
| `'replace'` | Replace and cancel the running animation. |
| `'none'` JS | Do not replace the running animation. This means the previous animation will continue running if its duration is longer than the new animation. This mode can also offer better performance. |
| `'blend'` JS | Creates an additive animation and blends its values with the running animation. |
| `0` JS | Shorthand for `'replace'`. |
| `1` JS | Shorthand for `'none'`. |
| `2` JS | Shorthand for `'blend'`. |


### Default

`'replace'` if the animation targets count is below `1000`; otherwise, the default composition is set to `'none'` on the JS version if no composition mode is defined.


### Additive animations

The `'blend'` mode lets you create *additive animations*. This type of animation allows you to smoothly blend two animations of the same property on the same target together. This mode works best on properties that visually *move* on the screen, like `'translate'`, `'scale'`, and `'rotation'`.

> ### Composition blend gotchas
> 
> Blending only works by playing **forward** two or more animations with composition `'blend'` simultaneously.
> 
> > It is not currently possible to use composition `'blend'` with:
> > 
> > - multiple keyframes
> > - color values
> > - the `reverse()` method
> > - the `loop` parameter
> > - the `reversed` parameter
> > - the `alternate` parameter
> 
> Blended animations should be treated differently and should only be used when you actually need to mix multiple animations together.

> To change the default value globally, update the `engine.defaults` object.
> 
> ```js
> import { engine } from 'animejs';
> engine.defaults.composition = 'blend';
> ```

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

const squares = utils.$('.square');
const [ $none, $replace, $blend ] = squares;

// Animate each square with a different composition mode

squares.forEach($square => {
  // 'none', 'replace', 'blend'
  const mode = $square.classList[1];
  animate($square, {
    scale: [.5, 1],
    alternate: true,
    loop: true,
    duration: 750,
    composition: mode,
  });
});

// Common animation parameters

const enter = { scale: 1.5, duration: 350 };
const leave = { scale: 1.0, duration: 250 };

// Composition none animations

const enterNone = () => animate($none, {
  composition: 'none', ...enter
});

const leaveNone = () => animate($none, {
  composition: 'none', ...leave
});

$none.addEventListener('mouseenter', enterNone);
$none.addEventListener('mouseleave', leaveNone);

// Composition replace animations

const enterReplace = () => animate($replace, {
  composition: 'replace', ...enter
});

const leaveReplace = () => animate($replace, {
  composition: 'replace', ...leave
});

$replace.addEventListener('mouseenter', enterReplace);
$replace.addEventListener('mouseleave', leaveReplace);

// Composition blend animations

const enterBlend = () => animate($blend, {
  composition: 'blend', ...enter
});

const leaveBlend = () => animate($blend, {
  composition: 'blend', ...leave
});

$blend.addEventListener('mouseenter', enterBlend);
$blend.addEventListener('mouseleave', leaveBlend);
```

Example (html):

```html
<div class="large spaced-evenly row">
  <div class="col">
    <div class="centered row">
      <span class="label centered">none<br><br></span>
      <div class="square none"></div>
    </div>
  </div>
  <div class="col">
    <div class="centered row">
      <span class="label centered">replace<br><br></span>
      <div class="square replace"></div>
    </div>
  </div>
  <div class="col">
    <div class="centered row">
      <span class="label centered">blend<br><br></span>
      <div class="square blend"></div>
    </div>
  </div>
</div>

<div class="medium spaced-evenly centered row">
  <div class="label"><br><br>(Hover the squares)</div>
</div>
```

---

## delay

Docs: https://animejs.com/documentation/animation/tween-parameters/delay · Since 1.0.0

Defines the delay in milliseconds at the beginning of all animated properties, or locally to a specific property.


### Accepts

- A `Number` equal to or greater than `0`
- A Function based value that returns a `Number` equal to or greater than `0`


### Default

The animation delay value (default `0`).

> To change the default value globally, update the `engine.defaults` object.
> 
> ```js
> import { engine } from 'animejs';
> engine.defaults.delay = 500;
> ```

Example (javascript):

```javascript
import { animate } from 'animejs';

const animation = animate('.square', {
  x: '17rem',
  rotate: {
    to: 360,
    delay: 1000, // Local delay applied only to rotate property
  },
  delay: 500,  // Global delay applied to all properties
  loop: true,
  alternate: true
});
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
</div>
```

---

## duration

Docs: https://animejs.com/documentation/animation/tween-parameters/duration · Since 1.0.0

Defines the duration in milliseconds of all animated properties, or of a specific property.


### Accepts

- A `Number` equal to or greater than `0`
- A Function based value that returns a `Number` equal to or greater than `0`

> Duration values higher than `1e12` or equal to `Infinity` are clamped internally to `1e12` (approximately 32 years).


### Default

The animation duration value (default `1000`).

> To change the default value globally, update the `engine.defaults` object.
> 
> ```js
> import { engine } from 'animejs';
> engine.defaults.duration = 500;
> ```

Example (javascript):

```javascript
import { animate } from 'animejs';

const animation = animate('.square', {
  x: '17rem',
  rotate: {
    to: 360,
    duration: 1500, // Local duration only applied to rotate property
  },
  duration: 3000,  // Global duration applied to all properties
  loop: true,
  alternate: true
});
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
</div>
```

---

## ease

Docs: https://animejs.com/documentation/animation/tween-parameters/ease · Since 4.0.0

Defines the easing function for all animated properties or a specific property.
 Easing functions control the rate of change of a property value over time, determining the animation's speed at different points during playback.

All Anime.js built-in easing functions can either be used by passing the easing name `String` or the function accessible on the `eases` object.


### Accepts

- An easing `Function`
- A built-in ease `String`
- A Function based value that returns an easing `Function` or a built-in ease `String`


### Default

`'out(2)'`

> To change the default value globally, update the `engine.defaults` object.
> 
> ```js
> import { engine } from 'animejs';
> engine.defaults.ease = 'outElastic(1, .5)'; // v3 throwback :)
> ```

Example (javascript):

```javascript
import { animate, waapi, eases, spring } from 'animejs';

animate('.row:nth-child(1) .square', {
  x: '17rem',
  rotate: 360,
  ease: 'inQuad',
});

animate('.row:nth-child(2) .square', {
  x: '17rem',
  rotate: 360,
  ease: eases.outQuad,
});

waapi.animate('.row:nth-child(3) .square', {
  x: '17rem',
  rotate: {
    to: 360,
    ease: 'out(6)',
  },
  ease: spring({ stiffness: 70 }),
});
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">all: 'inQuad'</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">all: eases.outQuad</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">x: spring()<br>rotate: 'inQuad'</div>
</div>
```

---

## from

Docs: https://animejs.com/documentation/animation/tween-parameters/from · Since 4.0.0

Animates *from* a specified value to the current target value.
 Must be defined inside a local tween parameter `Object`.


### Required

Only if no to property is defined


### Accepts

- Any valid Tween value types


### Default

The current target value is used if only a to property is defined

Example (javascript):

```javascript
import { animate } from 'animejs';

animate('.square', {
  opacity: { from: .5 }, // Animate from .5 opacity to 1 opacity
  translateX: { from: '16rem' }, // From 16rem to 0rem
  rotate: {
    from: '-.75turn', // From -.75turn to 0turn
    ease: 'inOutQuad',
  },
});
```

Example (html):

```html
<div class="large row">
  <div class="square"></div>
</div>
```

---

## modifierJS

Docs: https://animejs.com/documentation/animation/tween-parameters/modifier · Since 4.0.0

A `Function` that modifies or alters the behavior of the animated numerical value. Modifiers can be set globally for all animation properties or locally for a specific property. If the final animated value contains strings, like units (`'100px'`), the string part is automatically added to the final value before being applied to the element.

> Most Utilities functions can be used as modifiers.


### Accepts

A `Function` with the following parameters:


### Parameters

| Name | Description |
|---|---|
| `value` | The current animated numerical value |


### Must returns

`Number`


### Default

`null`

> To change the default value globally, update the `engine.defaults` object.
> 
> ```js
> import { engine } from 'animejs';
> engine.defaults.modifier = v => -v; // Don't do this :D
> ```

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

animate('.row:nth-child(1) .square', {
  x: '17rem',
  modifier: utils.round(0), // Round to 0 decimals
  duration: 4000,
});

animate('.row:nth-child(2) .square', {
  x: '85rem',
  modifier: v => v % 17,
  duration: 4000,
});

animate('.row:nth-child(3) .square', {
  x: '17rem',
  y: {
    to: '70rem',
    modifier: v => Math.cos(v) / 2, // Specific modifier to y property
  },
  duration: 4000,
});
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">utils.round(0)</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">v => v % 17</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">v => Math.cos(v) / 2</div>
</div>
```

---

## to

Docs: https://animejs.com/documentation/animation/tween-parameters/to · Since 4.0.0

Animates *to* a specified value from the current target value.
 Must be defined inside a local tween parameter `Object`.


### Required

Only if no from property is defined


### Accepts

- Any valid Tween value types
- An `Array` of two Tween value keyframes (`[fromValue, toValue]`)


### Default

The current target value is used if only a from property is defined

Example (javascript):

```javascript
import { animate } from 'animejs';

animate('.square', {
  x: {
    to: '16rem', // From 0px to 16rem
    ease: 'outCubic',
  },
  rotate: {
    to: '.75turn', // From 0turn to .75turn
    ease: 'inOutQuad'
  },
});
```

Example (html):

```html
<div class="large row">
  <div class="square"></div>
</div>
```

---

## Tween value types

Docs: https://animejs.com/documentation/animation/tween-value-types · Since 1.0.0

Specify the *start* and *end* values that define the animation of animatable properties.
 Animation values are assigned to Animatable properties and accept a wide range of syntaxes.

```js
animate('.square', {
  x: '6rem', ─────────────────┐
  y: $el => $el.dataset.y, ───┤
  scale: '+=.25', ────────────┼─ Tween Values
  opacity: {                  │
    from: .4, ────────────────┘
  },
});
```

---

## Color function valueWAAPI

Docs: https://animejs.com/documentation/animation/tween-value-types/color-function-value · Since 4.0.0

The CSS `color()` function can be animated with the WAAPI `animate()` method.


### Accepts

Any valid CSS color space syntax is supported

Example (javascript):

```javascript
import { waapi } from 'animejs';

waapi.animate('.circle',  {
  backgroundColor: 'color(display-p3 1.0 0.267 0.267 / 1.0)',
});
```

Example (html):

```html
<div class="large justified row">
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
</div>
```

---

## Color value

Docs: https://animejs.com/documentation/animation/tween-value-types/color-value · Since 1.0.0

Color values in the following formats can be parsed and used as values for animatable color properties.


### Accepts

| Format | Syntax |
|---|---|
| HEX | `'#F44'` \| `'#FF4444'` |
| HEXA | `'#F443'` \| `'#FF444433'` |
| RGB | `'rgb(255, 168, 40)'` |
| RGBA | `'rgba(255, 168, 40, .2)'` |
| HSL | `'hsl(255, 168, 40)'` |
| HSLA | `'hsla(255, 168, 40, .2)'` |
| String name WAAPI | `'red'` \| `'aqua'` |

Example (javascript):

```javascript
import { animate } from 'animejs';

animate('.hex',  {
  background: '#FF4B4B',
});

animate('.rgb',  {
  background: 'rgb(255, 168, 40)',
});

animate('.hsl',  {
  background: 'hsl(44, 100%, 59%)',
});

animate('.hexa', {
  background: '#FF4B4B33',
});

animate('.rgba', {
  background: 'rgba(255, 168, 40, .2)',
});

animate('.hsla', {
  background: 'hsla(44, 100%, 59%, .2)',
});
```

Example (html):

```html
<div class="large justified row">
  <div class="circle hex"></div>
  <div class="circle rgb"></div>
  <div class="circle hsl"></div>
  <div class="circle hexa"></div>
  <div class="circle rgba"></div>
  <div class="circle hsla"></div>
</div>
```

---

## CSS variable

Docs: https://animejs.com/documentation/animation/tween-value-types/css-variable · Since 4.2.0

CSS variables can be used as animation values by simply passing the variable name with the `'var(--my-value)'` syntax.

> The JS `animate()` version needs to compute the variable in order to animate its value. This means the animation won't reflect the new value if the variable is updated separately. To update a CSS variable in a JS Animation, you can call `.refresh()`.
> 
> ```js
> target.style.setProperty('--x', '100px');
> // Animate x to 100px
> const anim = animate(target, { x: 'var(--x)' });
> target.style.setProperty('--x', '200px');
> // Restart, and refresh the value to animate x to 200px
> anim.restart().refresh()
> ```


### Accepts

CSS variable `String`

Example (javascript):

```javascript
import { waapi, animate, stagger } from 'animejs';

waapi.animate('.square',  {
  rotate: 'var(--rotation)',
  borderColor: ['var(--hex-orange-1)', 'var(--hex-red-1)'],
  duration: 500,
  delay: stagger(100),
  loop: true,
});

animate('.square',  {
  scale: 'var(--scale)',
  background: ['var(--hex-red-1)', 'var(--hex-orange-1)'],
  duration: 500,
  delay: stagger(100),
  loop: true,
  alternate: true,
});
```

Example (html):

```html
<div class="medium justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
```

---

## Function based value

Docs: https://animejs.com/documentation/animation/tween-value-types/function-based · Since 1.0.0

Sets different values for each target of a multi-target animation by using a `Function` as the value.

> Function-based values can be re-calculated without creating a new animation using the `animation.refresh()` method.


### Accepts

A `Function` with the following parameters:

```js
animate(targets, {
  x: (target, index, targets) => target.dataset.value * (targets.length - index),
});
```


### Parameters

| Name | Description |
|---|---|
| target | The current animated target element |
| index | The index of current targeted element |
| targets | The `Array` of all animated targets of the animation |
| prevTween | The previous sibling tween's computed end value for the same target and property |

> Since version 4.4.0, the third argument of function-based value callbacks changed from `total` (`Number`) to `targets` (`Array`). To migrate, replace `total` with `targets.length`.


### Must return

- Tween value
- Tween parameters

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

animate('.square', {
  x: $el => /** @type {HTMLElement} */($el).getAttribute('data-x'),
  y: (_, i) => 50 + (-50 * i),
  scale: (_, i, t) => (t.length - i) * .75,
  rotate: () => utils.random(-360, 360),
  borderRadius: () => `+=${utils.random(0, 8)}`,
  duration: () => utils.random(1200, 1800),
  delay: () => utils.random(0, 400),
  ease: 'outElastic(1, .5)',
});
```

Example (html):

```html
<div class="medium row">
  <div class="square" data-x="170"></div>
</div>
<div class="medium row">
  <div class="square" data-x="80"></div>
</div>
<div class="medium row">
  <div class="square" data-x="270"></div>
</div>
```

---

## Numerical value

Docs: https://animejs.com/documentation/animation/tween-value-types/numerical-value · Since 1.0.0

Specifies the numerical value of the animated property by passing either a `Number` or a `String` containing at least one `Number`.

If no unit is specified for properties that expect a unit, like `width` for example, the resulting animation will use the default browser unit.

```js
animate(target, { width: 100 }); // Defaults to px
```


### Accepts

- `Number`
- `String`

> If a specific unit is already specified, the JS `animate()` method can inherits previously defined units and the next value set without a unit on the same target property inherits the previously defined unit.
> 
> ```js
> animate(target, { width: '50%' }); // Uses '%'
> animate(target, { width: 75 });    // Inherits '%' -> '75%'
> ```

> The WAAPI `animate()` method only falls back automatically to `'px'` with the following properties:
> 
> ```js
> - x / translateX
> - y / translateY
> - z / translateZ
> - perspective
> - top
> - right
> - bottom
> - left
> - width
> - height
> - margin
> - padding
> - borderWidth
> - borderRadius
> - fontSize
> ```

Example (javascript):

```javascript
import { waapi } from 'animejs';

waapi.animate('.square', {
  x: 240, //  -> 240px
  width: 75, // -> 75px
  rotate: '.75turn',
});
```

Example (html):

```html
<div class="large row">
  <div class="square"></div>
</div>
```

---

## Relative valueJS

Docs: https://animejs.com/documentation/animation/tween-value-types/relative-value · Since 2.0.0

Adds, subtracts or multiplies the current target value by a specified amount.


### Accepts

| Prefix | Effect | Examples |
|---|---|---|
| `'+='` | Add | `'+=45'` \| `'+=45px'` |
| `'-='` | Subtracts | `'-=45'` \| `'-=45deg'` |
| `'*='` | Multiply | `'*=.5'` |

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

const [ $clock ] = utils.$('.clock');
const [ $add ] = utils.$('.add');
const [ $sub ] = utils.$('.sub');
const [ $mul ] = utils.$('.mul');

const add = () => animate($clock, { rotate: '+=90' });
const sub = () => animate($clock, { rotate: '-=90' });
const mul = () => animate($clock, { rotate: '*=.5' });

$add.addEventListener('click', add);
$sub.addEventListener('click', sub);
$mul.addEventListener('click', mul);
```

Example (html):

```html
<div class="large centered row">
  <div class="clock"></div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button add">+ 90°</button>
    <button class="button sub">- 90°</button>
    <button class="button mul">× .5</button>
  </fieldset>
</div>
```

---

## Unit conversion value

Docs: https://animejs.com/documentation/animation/tween-value-types/unit-conversion-value · Since 2.0.0

Converts and animates to a value with a different unit than the default or currently used one.

> When using the JS `animate()` method, unit conversions may sometimes produce unexpected results depending on the unit type and animated properties used.
>  For more predictable results, it's recommended to define the unit outside of the animation using `utils.set()`, and then animate to the current unit.
> 
> Or simply use the WAAPI `animate()` method.


### Accepts

`String`

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

animate('.square', {
  width: '25%', // from '48px' to '25%',
  x: '15rem', // from '0px' to '15rem',
  rotate: '.75turn', // from `0deg` to '.75turn',
});
```

Example (html):

```html
<div class="large row">
  <div class="square"></div>
</div>
```

---

