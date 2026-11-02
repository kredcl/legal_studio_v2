# Anime.js v4 · Web Animation Api

Source: official documentation at https://animejs.com/documentation (MIT-licensed library by Julian Garnier).

## Web Animation API

Docs: https://animejs.com/documentation/web-animation-api

### Create WAAPI powered animations with the simplicity of Anime.js.

Anime.js offers a even more lightweight alternative (3KB versus 10KB) to the `animate()` method that uses the Web Animation `Element.animate()` API under the hood.

WAAPI powered animations are created using the `waapi.animate()` method imported from the main `'animejs'` module:

```js
import { waapi } from 'animejs';

const animation = waapi.animate(targets, parameters);
```

Or imported as a standalone module from the `'animejs/waapi'` subpath:

```js
import { waapi } from 'animejs/waapi';
```


### Parameters

| Name | Accepts |
|---|---|
| targets | Targets |
| parameters | An `Object` of Animatable properties, Tween parameters, Playback settings and Animation callbacks |


### Returns

`WAAPIAnimation`

Example (javascript):

```javascript
import { waapi, stagger, splitText } from 'animejs';

const { chars } = splitText('h2', { words: false, chars: true });

waapi.animate(chars, {
  translate: `0 -2rem`,
  delay: stagger(100),
  duration: 600,
  loop: true,
  alternate: true,
  ease: 'inOut(2)',
});
```

Example (html):

```html
<div class="large grid centered square-grid">
  <h2 class="text-xl">HELLO WAAPI</h2>
</div>
```

---

## API differences with native WAAPI

Docs: https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi · Since 4.0.0

This chapter covers all major differences between the native Web Animation API `element.animate()` syntax and Anime.js `waapi.animate(element)` syntax.


### Anime.js

```js
waapi.animate(
┌────────────┐
│ '.square', ├─ Targets
└────────────┘
{
┌──────────────────┐
│ x: 100,          │
│ y: 50,           ├─ Keyframes Values
│ opacity: .5,     │
└──────────────────┘
┌──────────────────┐
│ loop: 3,         │
│ alternate: true, ├─ Playback Settings
│ ease: 'out',     │
└──────────────────┘
});
```


### WAAPI

```js
const $square = document.querySelector('.square');

┌────────────┐
│ $square    ├─ Targets
└────────────┘
.animate({
┌──────────────────────────┐
│ translate: '100px 50px', ├─ Keyframes Values
│ opacity: .5,             │
└──────────────────────────┘
}, {
┌──────────────────────────┐
│ iterations: 4,           │
│ direction: 'alternate',  ├─ Playback Settings
│ easing: 'ease-out',      │
└──────────────────────────┘
});
```

---

## direction

Docs: https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/direction · Since 4.0.0

The `direction` parameter is replaced by two separate parameters: `reversed` and `alternate`.

| `direction` | `reversed` | `alternate` | Effect |
|---|---|---|---|
| `'forward'` | `false` | `false` | Play forward |
| `'reverse'` | `true` | `false` | Play backward |
| `'alternate'` | `false` | `true` | Alternate on loop |
| `'alternate-reverse'` | `true` | `true` | Start in reverse and alternate on loop |


### Syntax comparison


#### Anime.js

```js
waapi.animate('.square', {
  x: 100,
  reversed: true,
  alternate: true,
  loop: 3
});
```


#### WAAPI equivalent

```js
const targets = document.querySelectorAll('.square');

targets.forEach(($el, i) => {
  $el.animate({
    translate: '100px',
  }, {
    fill: 'forwards',
    duration: 1000,
    direction: 'alternate-reverse',
    iterations: 4
  })
});
```


### Accepts

- `Boolean`

Example (javascript):

```javascript
import { waapi, stagger } from 'animejs';

waapi.animate('.square', {
  translate: '17rem',
  reversed: true,
  delay: stagger(100)
});
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
  <div class="square"></div>
</div>
```

---

## easing

Docs: https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/easing · Since 4.0.0

The `easing` parameter is replaced by the `ease` parameter and accepts any type of easing `Function` on top of all the native WAAPI easing functions.

The default easing is `'out(2)'` instead of `'linear'`.


### Syntax comparison


#### Anime.js

```js
waapi.animate('.square', {
  x: 100,
  ease: 'outElastic(1.25, .1)'
});
```


#### WAAPI equivalent

```js
const targets = document.querySelectorAll('.square');

targets.forEach(($el, i) => {
  $el.animate({
    translate: '100px',
  }, {
    fill: 'forwards',
    duration: 1000,
    easing: 'linear(0, 0.0874, 0.2047, 0.3429, 0.4929, 0.6464, 0.7961, 0.9357, 1.06, 1.1656, 1.25, 1.3122, 1.3521, 1.371, 1.3706, 1.3536, 1.3227, 1.2812, 1.2323, 1.1793, 1.125, 1.0721, 1.0227, 0.9788, 0.9415, 0.9116, 0.8896, 0.8755, 0.8688, 0.869, 0.875, 0.8859, 0.9006, 0.9179, 0.9366, 0.9558, 0.9745, 0.992, 1.0075, 1.0207, 1.0313, 1.039, 1.044, 1.0464, 1.0463, 1.0442, 1.0403, 1.0351, 1.029, 1.0224, 1.0156, 1.009, 1.0028, 0.9973, 0.9927, 0.989, 0.9862, 0.9844, 0.9836, 0.9844, 0.9857, 0.9876, 0.9897, 0.9921, 0.9945, 0.9968, 0.999, 1.0009, 1.0026, 1.0039, 1.0049, 1.0055, 1.0058, 1.0055, 1.005, 1.0044, 1.0036, 1.0028, 1.002, 1.0011, 1.0004, 0.9997, 0.9991, 0.9986, 0.9983, 0.9981, 0.998, 0.9982, 0.9984, 0.9987, 0.999, 0.9993, 0.9996, 0.9999, 1.0001, 1.0003, 1)'
  })
});
```


### Accepts

- Any valid easing `String` name or `Function`
- Any valid native WAAPI easing functions `String` name

Example (javascript):

```javascript
import { waapi, stagger } from 'animejs';

waapi.animate('.square', {
  translate: '17rem',
  ease: 'inOut(6)',
  delay: stagger(100)
});
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
  <div class="square"></div>
</div>
```

---

## finished

Docs: https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/finished · Since 4.0.0

`animation.finished` is replaced by the `animation.then()` method. It returns a `Promise` that resolves and execute a callback when the animation completes.


### Syntax comparison


#### Anime.js

The `then()` method can be directly inlined like this:

```js
waapi.animate(target, {
  translate: '100px',
  duration: 500,
}).then(callback);
```

Or used in an `async` / `await` context:

```js
async function waitForAnimationToComplete() {
  return animate(target, {
    translate: '100px',
    duration: 500,
  });
}

const asyncAnimation = await waitForAnimationToComplete();
```


#### WAAPI equivalent

```js
const targets = document.querySelectorAll('.square');
const animations = [];

targets.forEach(($el, i) => {
  animations[i] = $el.animate({
    translate: '100px',
  }, {
    fill: 'forwards',
    duration: 500,
  });
});

Promise.all(
  animations
    .map((animation) => animation.finished)
    .then(() => console.log('completed'))
);
```


### Parameters

| Name | Type |
|---|---|
| callback | A `Function` whose first argument is the animation itself |


### Returns

`Promise`

Example (javascript):

```javascript
import { waapi, utils } from 'animejs';

const [ $value ] = utils.$('.value');

const animation = waapi.animate('.circle', {
  translate: '16rem',
  loop: 2,
  alternate: true,
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

## iterations

Docs: https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/iterations · Since 4.0.0

The `iterations` parameter is replaced by the `loop` parameter and determines how many times the animation will repeat instead of the total number of iterations.

| `iterations` | `loop` | Effect |
|---|---|---|
| `1` | `0` | No repeat |
| `3` | `2` | Repeat twice |
| `Infinity` | `Infinity` \| `true` \| -1 | Repeat indefinitely |


### Syntax comparison


#### Anime.js

```js
waapi.animate('.square', {
  x: 100,
  loop: 3
});
```


#### WAAPI equivalent

```js
const targets = document.querySelectorAll('.square');

targets.forEach(($el, i) => {
  $el.animate({
    translate: '100px',
  }, {
    fill: 'forwards',
    duration: 1000,
    iterations: 4
  })
});
```


### Accepts

- A `Number` `[0, Infinity]`
- A `Boolean` where `true` is equivalent to `Infinity` and `false` doesn't loop

Example (javascript):

```javascript
import { waapi, stagger } from 'animejs';

waapi.animate('.square', {
  translate: '17rem',
  loop: 3,
  alternate: true,
  delay: stagger(100)
});
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
  <div class="square"></div>
</div>
```

---

## Hardware-accelerated animations

Docs: https://animejs.com/documentation/web-animation-api/hardware-accelerated-animations · Since 4.0.0

One of the biggest advantages of WAAPI over `requestAnimationFrame` powered animations is the ability to run animations off the main thread, leading to smoother animations when the CPU is busy while consuming less power, which can improve battery life.

The catch is that not all properties can be hardware-accelerated, there are currently only a few that can create a new compositor layer and run off the main thread on every browser.

> **Hardware-accelerated properties in every major browsers:**
> 
> - opacity
> - transform
> - translate
> - scale
> - rotate
> 
> **Hardware-accelerated properties in some browsers:**
> 
> - clip-path
> - filter

> Safari (desktop and mobile) currently won't trigger hardware acceleration if the animation is using a custom `'linear()'` easing. This mean that custom power eases like: `'out(3)'`, `'in(3)'`, `'inOut(3)'`, and every JavaScript easing passed to `waapi.animate()` prevents the animation to be hardware accelerated, even if the property supports it.

Example (javascript):

```javascript
import { animate, waapi, createTimer, utils, cubicBezier } from 'animejs';

const [ $block ] = utils.$('.button');

const waapiAnim = waapi.animate('.waapi.square', {
  translate: 270,
  rotate: 180,
  alternate: true,
  loop: true,
  ease: 'cubic-bezier(0, 0, .58, 1)',
});

const jsAnim = animate('.js.square', {
  x: 270,
  rotate: 180,
  ease: cubicBezier(0, 0, .58, 1),
  alternate: true,
  loop: true,
});

const blockCPUTimer = createTimer({
  onUpdate: () => {
    const end = Date.now() + 100;
    while(Date.now() < end) {
      Math.random() * Math.random();
    }
  },
  autoplay: false
});

let isBusy = false;

const toggleCPU = () => {
  blockCPUTimer[isBusy ? 'pause' : 'play']();
  $block.innerText = (isBusy ? 'block' : 'free') + ' CPU';
  isBusy = !isBusy;
}

$block.addEventListener('click', toggleCPU);
```

Example (html):

```html
<div class="medium row">
  <div class="waapi square"></div>
  <span class="padded label">WAAPI</span>
</div>
<div class="medium row">
  <div class="js square"></div>
  <span class="padded label">JS</span>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Block CPU</button>
  </fieldset>
</div>
```

---

## Improvements to the Web Animation API

Docs: https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api · Since 4.0.0

The `waapi.animate()` method adds lots of quality of life improvements and greatly improves the overall experience of using WAAPI.

On top of all the improvements to the API listed in this chapter, it is also possible to link WAAPI animations to Anime.js built-in ScrollObserver

```js
waapi.animate('.square', {
  translate: '100px',
  autoplay: onScroll()
});
```

And use a Scope for easy media queries handling and component cleanup:

```js
createScope({
  mediaQueries: { reduceMotion: '(prefers-reduced-motion)' }
})
.add(({ matches }) => {
  const { reduceMotion } = matches;
  waapi.animate('.square', {
    transform: reduceMotion ? ['100px', '100px'] : '100px',
    opacity: [0, 1],
  });
});
```

---

## Default units

Docs: https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/default-units · Since 4.0.0

If no unit is specified for properties that expect a unit, like `width` for example, the resulting animation will use the default browser unit for a set of commonly used properties:


### Syntax comparison


#### Anime.js

```js
waapi.animate('.circle', {
  x: 100,
  y: 50,
  width: 150,
  height: 80,
});
```


#### WAAPI equivalent

```js
const $el = document.querySelector('.circle');

$el.animate({
  translate: '100px 50px',
  width: '150px',
  height: '80px',
}, {
  duration: 1000,
  easing: 'ease-out',
}).finished.then(() => {
  $el.style.translate = '100px';
});
```


### Properties that automatically adds default units

| Name | Default Unit |
|---|---|
| x | `'px'` |
| y | `'px'` |
| z | `'px'` |
| translateX | `'px'` |
| translateY | `'px'` |
| translateZ | `'px'` |
| rotate | `'deg'` |
| rotateX | `'deg'` |
| rotateY | `'deg'` |
| rotateZ | `'deg'` |
| skew | `'deg'` |
| skewX | `'deg'` |
| skewY | `'deg'` |
| perspective | `'px'` |
| width | `'px'` |
| height | `'px'` |
| margin | `'px'` |
| padding | `'px'` |
| top | `'px'` |
| right | `'px'` |
| bottom | `'px'` |
| left | `'px'` |
| borderWidth | `'px'` |
| fontSize | `'px'` |
| borderRadius | `'px'` |

Example (javascript):

```javascript
import { waapi } from 'animejs';

waapi.animate('.square', {
  opacity: .5,
  x: 250,
  rotate: 45,
  width: 40,
  height: 40,
});
```

Example (html):

```html
<div class="small row">
  <div class="square"></div>
</div>
<div class="small row">
  <div class="square"></div>
</div>
<div class="small row">
  <div class="square"></div>
</div>
<div class="small row">
  <div class="square"></div>
</div>
```

---

## Function based values

Docs: https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/function-based-values · Since 4.0.0

Adds Function based value support to WAAPI animations, allowing passing different values pert targets.


### Syntax comparison


#### Anime.js

```js
waapi.animate('.square', {
  translate: () => `${utils.random(10, 17)}rem`,
  rotate: () => utils.random(-180, 180),
  scale: (_, i) => .25 + (i * .25),
  delay: stagger(100)
});
```


#### WAAPI equivalent

```js
document.querySelectorAll('.square').forEach(($el, i) => {
  $el.animate({
    translate: `${utils.random(10, 17)}rem`,
    rotate: utils.random(-180, 180),
    scale: .25 + (i * .25),
  }, {
    duration: 1000,
    delay: i * 100,
    easing: 'ease-out',
  }).finished.then(() => {
    $el.style.translate = '100px';
  })
});
```

Example (javascript):

```javascript
import { waapi, utils, stagger } from 'animejs';

waapi.animate('.square', {
  translate: () => `${utils.random(10, 17)}rem`,
  rotate: () => utils.random(-180, 180),
  scale: (_, i) => .25 + (i * .25),
  duration: $el => $el.dataset.duration,
  delay: stagger(100)
});
```

Example (html):

```html
<div class="small row">
  <div data-duration="400" class="square"></div>
</div>
<div class="small row">
  <div data-duration="600" class="square"></div>
</div>
<div class="small row">
  <div data-duration="800" class="square"></div>
</div>
<div class="small row">
  <div data-duration="1000" class="square"></div>
</div>
```

---

## Individual CSS transforms

Docs: https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/individual-css-transforms · Since 4.0.0

Unlike CSS animations or native WAAPI, the CSS `transform` property can be animated by specifying individual properties.
 This allows a greater level of control over how to animate individual transform properties.

> Individual transforms with WAAPI only works for browsers that support `CSS.registerProperty(propertyDefinition)`, and fallback to no animations.

> Individual transforms cannot be hardware-accelerated.


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

Example (javascript):

```javascript
import { waapi, utils } from 'animejs';

const $squares = utils.$('.square');

const animateSquares = () => {
  waapi.animate($squares, {
    x: () => utils.random(0, 17) + 'rem',
    y: () => utils.random(-1, 1) + 'rem',
    rotateX: () => utils.random(-90, 90),
    rotateY: () => utils.random(-90, 90),
    onComplete: () => animateSquares()
  });
}

animateSquares();
```

Example (html):

```html
<div class="small row">
  <div class="square"></div>
</div>
<div class="small row">
  <div class="square"></div>
</div>
<div class="small row">
  <div class="square"></div>
</div>
<div class="small row">
  <div class="square"></div>
</div>
```

---

## Individual property parameters

Docs: https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/individual-property-parameters · Since 4.0.0

Each property can have specific `delay`, `duration` and `ease` parameters by passing an `Object` with at least one `to` or `from` properties as value.

Example (javascript):

```javascript
import { waapi, utils, stagger } from 'animejs';

waapi.animate('.square', {
  y: {
    to: [0, -30, 0],
    ease: 'out(4)',
    duration: 1000,
  },
  rotate: { from: -180, to: 0, ease: 'out(3)' },
  scale: { to: [.65, 1, .65], ease: 'inOut(3)' },
  duration: 500,
  delay: stagger(75),
  loop: true,
});
```

Example (html):

```html
<div class="large row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
```

---

## Multi-targets animation

Docs: https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/multi-targets-animation · Since 4.0.0

Targets one or multiple DOM Elements using a CSS selector, allowing animating multiple targets in one single `animate()` call and support of the `stagger()` method.


### Syntax comparison


#### Anime.js

```js
waapi.animate('.circle', {
  translate: '100px',
  delay: stagger(100),
});
```


#### WAAPI equivalent

```js
document.querySelectorAll('.circle').forEach(($el, i) => {
  $el.animate({
    translate: '100px',
  }, {
    duration: 1000,
    delay: i * 100,
    easing: 'ease-out',
  }).finished.then(() => {
    $el.style.translate = '100px';
  })
});
```


### Accepts

Any `String` accepted by `document.querySelectorAll()`

Example (javascript):

```javascript
import { waapi, stagger } from 'animejs';

waapi.animate('.circle', {
  translate: '17rem',
  delay: stagger(100),
  loop: true,
  alternate: true,
});
```

Example (html):

```html
<div class="medium row">
  <div class="circle"></div>
</div>
<div class="medium row">
  <div class="circle"></div>
</div>
<div class="medium row">
  <div class="circle"></div>
</div>
```

---

## Sensible defaults

Docs: https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/sensible-defaults · Since 4.0.0

By default, a native WAAPI animation requires a duration to be set, won't have any easing applied, and more annoyingly, won't persist its final value, letting the user to take care of setting the final styles manually after the animation completes.
 Anime.js simplifies all that by making sure the animation state is preserved after the animation completes, and uses the same default duration and delay as the JS `animate()` method.


### Syntax comparison


#### Anime.js

```js
waapi.animate('.circle', { translate: '100px' });
```


#### WAAPI equivalent

```js
const $el = document.querySelector('.circle');

$el.animate({ translate: '100px' }, {
  duration: 1000,
  easing: 'ease-out',
}).finished.then(() => {
  $el.style.translate = '100px';
});
```

Example (javascript):

```javascript
import { waapi } from 'animejs';

waapi.animate('.circle', { translate: '16rem' });
```

Example (html):

```html
<div class="large row">
  <div class="circle"></div>
</div>
```

---

## Spring and custom easings

Docs: https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/spring-and-custom-easings · Since 4.0.0

Uses any spring and custom JavaScript easing function.

All Anime.js built-in easing functions can be used by passing the function accessible on the `eases` object.

```js
import { eases } from 'animejs';

const { linear, outExpo, cubicBezier } = eases;
```

The `spring()` easing function must be imported separately.

```js
import { spring } from 'animejs';
```


### Built-in eases

| Built-in string | Function | Parameters |
|---|---|---|
| `'linear'`
`'linear(0, .5 75%, 1)'` | `linear()` | coords (`0, '.5 75%', 1`) |
| `'steps'`
`'steps(10)'` | `steps()` | steps = `10` |
| `'cubicBezier'`
`'cubicBezier(.5,0,.5,1)'` | `cubicBezier()` | x1 = `.5`, y1 = `0`, x2 = `.5`, y2 = `1` |
| `'in'`
`'in(1.675)'` | `in()` | power = `1.675` |
| `'out'`
`'out(1.675)'` | `out()` | power = `1.675` |
| `'inOut'`
`'inOut(1.675)'` | `inOut()` | power = `1.675` |


### Default

`'out(2)'`

Example (javascript):

```javascript
import { waapi, utils, stagger, spring } from 'animejs';

waapi.animate('.circle', {
  y: [0, -30, 0],
  ease: spring({ stiffness: 150, damping: 5 }),
  delay: stagger(75),
  loop: true,
});
```

Example (html):

```html
<div class="large row">
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
</div>
```

---

## waapi.convertEase()

Docs: https://animejs.com/documentation/web-animation-api/waapi-convertease · Since 4.0.0

Converts any JavaScript easing functions into a compatible WAAPI linear easing.

```js
import { waapi, spring } from 'animejs';

const spring = spring({ stiffness: 12 });

const linearEasing = waapi.convertEase(spring.ease);
```

Example (javascript):

```javascript
import { waapi, spring } from 'animejs';

const springs = [
  spring({ stiffness: 100 }),
  spring({ stiffness: 150 }),
  spring({ stiffness: 200 })
]

document.querySelectorAll('#web-animation-api-waapi-convertease .demo .square').forEach(($el, i) => {
  $el.animate({
    translate: '17rem',
    rotate: '1turn',
  }, {
    easing: waapi.convertEase(springs[i].ease),
    delay: i * 250,
    duration: springs[i].duration,
    fill: 'forwards'
  });
});
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">stiffness: 100</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">stiffness: 150</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">stiffness: 200</div>
</div>
```

---

## When to use WAAPI

Docs: https://animejs.com/documentation/web-animation-api/when-to-use-waapi · Since 4.0.0

The Web Animations API (WAAPI) offers a lot of advantages over JavaScript `requestAnimationFrame` (RAF) powered animations, but both have their strengths and downsides, and depending on the type of animation or the context in which an animation is created, it's not always possible or even recommended to use WAAPI over RAF.


### Prioritizewaapi.animate()when:

- Animating during CPU/network load (see the hardware-accelerated animations section)
- Initial page load time is critical and every KB counts (3KB gzip vs 10KB for the JavaScript version)
- Animating complex CSS values not correctly handled by the JavaScript version, like CSS transform matrixes or CSS color functions.


### Useanimate()when:

- Animating a large amount of targets (> 500)
- Animating JS/canvas/WebGL/WebGPU
- Animating SVG, DOM attributes or CSS properties not handled by the Web Animation API
- Animating complex timelines and keyframes
- You need more control methods
- You need more advanced callback functions

Example (javascript):

```javascript
import { animate, waapi, utils } from 'animejs';

// WAAPI Animation

waapi.animate('.waapi.square', {
  x: '17rem',
  rotate: 180,
  loop: 3,
  alternate: true,
});

// JS Animation

const data = { x: '0rem', rotate: '0deg' }
const [ $log ] = utils.$('code');

animate(data, {
  x: 17,
  rotate: 180,
  modifier: utils.round(0),
  loop: 3,
  alternate: true,
  onRender: () => $log.innerHTML = JSON.stringify(data)
});
```

Example (html):

```html
<div class="medium row">
  <div class="square waapi"></div>
</div>
<div class="small row"></div>
<pre class="medium centered row">
  <code>{"x": '0rem',"rotate":"0deg"}</code>
</pre>
```

---

