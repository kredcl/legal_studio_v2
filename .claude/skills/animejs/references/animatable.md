# Anime.js v4 · Animatable

Source: official documentation at https://animejs.com/documentation (MIT-licensed library by Julian Garnier).

## Animatable

Docs: https://animejs.com/documentation/animatable

### Efficiently animates target properties, making it an ideal replacement foranimate()andutils.set()in situations where values change frequently, such as cursor events or animation loops.

Animatable are created using the `createAnimatable()` method imported from the main `'animejs'` module:

```js
import { createAnimatable } from 'animejs';

const animatable = createAnimatable(targets, parameters);
```

Or imported as a standalone module from the `'animejs/animatable'` subpath:

```js
import { createAnimatable } from 'animejs/animatable';
```


### Parameters

| Name | Accepts |
|---|---|
| targets | Targets |
| parameters | An `Object` of Animatable settings |


### Returns

`Animatable`

An `Animatable` instance exposes animatable property functions to get and set values.

```js
animatable.propertyName(value, duration, ease); // Triggers an animation
animatable.propertyName(); // Returns the current value
```

> For performance reasons, only `Number` or `Array<Number>` can be passed to an animatable property function.

Example (javascript):

```javascript
import { createAnimatable, utils } from 'animejs';

const $demos = document.querySelector('#docs-demos');
const $demo = document.querySelector('.docs-demo.is-active');

let bounds = $demo.getBoundingClientRect();
const refreshBounds = () => bounds = $demo.getBoundingClientRect();

const animatableSquare = createAnimatable('.square', {
  x: 500, // Define the x duration to be 500ms
  y: 500, // Define the y duration to be 500ms
  ease: 'out(3)',
});

const onMouseMove = e => {
  const { width, height, left, top } = bounds;
  const hw = width / 2;
  const hh = height / 2;
  const x = utils.clamp(e.clientX - left - hw, -hw, hw);
  const y = utils.clamp(e.clientY - top - hh, -hh, hh);
  animatableSquare.x(x); // Animate the x value in 500ms
  animatableSquare.y(y); // Animate the y value in 500ms
}

window.addEventListener('mousemove', onMouseMove);
$demos.addEventListener('scroll', refreshBounds);
```

Example (html):

```html
<div class="large centered row">
  <div class="col">
    <div class="square"></div>
  </div>
</div>
<div class="small centered row">
  <span class="label">Move cursor around</span>
</div>
```

---

## Animatable methods

Docs: https://animejs.com/documentation/animatable/animatable-methods · Since 4.0.0

Methods available on the `Animatable` instance returned by a `createAnimatable()` function.

```js
const animatable = createAnimatable(target, parameters);
           ┌─────────────────────┐
animatable.│x(100)               │
animatable.│y(50, 500, 'out(2)') ├─ Methods
animatable.│revert()             │
           └─────────────────────┘
```

---

## Getters

Docs: https://animejs.com/documentation/animatable/animatable-methods/getters · Since 4.0.0

Every animatable properties defined in the animatable parameters are transformed into methods and accessible on the animatable object.

When calling a method without any argument, the method acts as a getter, and returns the current value of the animatable property.


### Returns

- A `Number` if the current animatable property has a single value
- An `Array` of `Number` if the current animatable property has multiple values (like an RGB color value)

Example (javascript):

```javascript
import { createAnimatable, utils } from 'animejs';

const $demos = document.querySelector('#docs-demos');
const $demo = document.querySelector('.docs-demo.is-active');
const [ $x, $y ] = utils.$('.coords');
let bounds = $demo.getBoundingClientRect();
const refreshBounds = () => bounds = $demo.getBoundingClientRect();

const circle = createAnimatable('.circle', {
  x: 500,
  y: 500,
  ease: 'out(2)',
});

// Gets and log the current x and y values
circle.animations.x.onRender = () => {
  $x.innerHTML = utils.roundPad(circle.x(), 2);
  $y.innerHTML = utils.roundPad(circle.y(), 2);
}

const onMouseMove = e => {
  const { width, height, left, top } = bounds;
  const hw = width / 2;
  const hh = height / 2;
  const x = utils.clamp(e.clientX - left - hw, -hw, hw);
  const y = utils.clamp(e.clientY - top - hh, -hh, hh);
  // Sets x and y values
  circle.x(x);
  circle.y(y);
}

window.addEventListener('mousemove', onMouseMove);
$demos.addEventListener('scroll', refreshBounds);
```

Example (html):

```html
<div class="large row">
  <div class="col">
    <div class="large row">
      <pre class="large log row">
        <span class="label">x</span>
        <span class="coords x value">0</span>
      </pre>
    </div>
  </div>
  <div class="col" style="flex: .25; z-index: 3;">
    <div class="large centered row">
      <div class="circle"></div>
    </div>
  </div>
  <div class="col">
    <div class="large row">
      <pre class="large log row">
        <span class="label">y</span>
        <span class="coords y value">0</span>
      </pre>
    </div>
  </div>
</div>
<div class="medium centered row">
  <span class="label">Move cursor around</span>
</div>
```

---

## revert()

Docs: https://animejs.com/documentation/animatable/animatable-methods/revert · Since 4.0.0

Reverts all the animatable properties to their original values and cleanup the CSS inline styles.

Use `revert()` when you want to completely stop and destroy an animatable.


### Returns

The animatable itself

> Can be chained with other animatable methods.

Example (javascript):

```javascript
import { createAnimatable, utils, stagger } from 'animejs';

const $demos = document.querySelector('#docs-demos');
const $demo = $demos.querySelector('.docs-demo.is-active');
const [ $revertButton ] = utils.$('.revert');
let bounds = $demo.getBoundingClientRect();
const refreshBounds = () => bounds = $demo.getBoundingClientRect();

const circles = createAnimatable('.circle', {
  x: stagger(50, { from: 'center', start: 100 }),
  y: stagger(200, { from: 'center', start: 200 }),
  ease: 'out(4)',
});

const onMouseMove = e => {
  const { width, height, left, top } = bounds;
  const hw = width / 2;
  const hh = height / 2;
  const x = utils.clamp(e.clientX - left - hw, -hw, hw);
  const y = utils.clamp(e.clientY - top - hh, -hh, hh);
  circles.x(x).y(y);
}

const revertAnimatable = () => {
  window.removeEventListener('mousemove', onMouseMove);
  circles.revert();
}

$revertButton.addEventListener('click', revertAnimatable);
window.addEventListener('mousemove', onMouseMove);
$demos.addEventListener('scroll', refreshBounds);
```

Example (html):

```html
<div class="large centered row">
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button revert">Revert</button>
  </fieldset>
</div>
```

---

## Setters

Docs: https://animejs.com/documentation/animatable/animatable-methods/setters · Since 4.0.0

Every animatable properties defined in the animatable parameters are transformed into methods and accessible on the animatable object.

When calling a method with at least one argument, the method acts as a setter, and returns the animatable instance, allowing chaining methods calls.

```js
animatable.property(value, duration, easing);
```


### Parameters

| Name | Type | Description |
|---|---|---|
| value | `Number` \|
`Array<Number>` | Defines the new value of the animatable to animate to |
| duration (opt) | `Number` | Optional new transition duration in ms |
| easing (opt) | ease | Optional new easing function of the animation |


### Returns

The animatable object itself, allowing for chaining of multiple property setter calls:

```js
animatable.x(100).y(200); // Animate x to 100 and y to 200 in 500ms
```

Example (javascript):

```javascript
import { createAnimatable, utils } from 'animejs';

const $demos = document.querySelector('#docs-demos');
const $demo = document.querySelector('.docs-demo.is-active');
let bounds = $demo.getBoundingClientRect();
const refreshBounds = () => bounds = $demo.getBoundingClientRect();

const circle = createAnimatable('.circle', {
  x: 0,
  y: 0,
  backgroundColor: 0,
  ease: 'outExpo',
});

const rgb = [164, 255, 79];

// Sets new durations and easings
circle.x(0, 500, 'out(2)');
circle.y(0, 500, 'out(3)');
circle.backgroundColor(rgb, 250);

const onMouseMove = e => {
  const { width, height, left, top } = bounds;
  const hw = width / 2;
  const hh = height / 2;
  const x = utils.clamp(e.clientX - left - hw, -hw, hw);
  const y = utils.clamp(e.clientY - top - hh, -hh, hh);
  rgb[0] = utils.mapRange(x, -hw, hw, 0, 164);
  rgb[2] = utils.mapRange(x, -hw, hw, 79, 255);
  circle.x(x).y(y).backgroundColor(rgb); // Update values
}

window.addEventListener('mousemove', onMouseMove);
$demos.addEventListener('scroll', refreshBounds);
```

Example (html):

```html
<div class="large centered row">
  <div class="circle"></div>
</div>
<div class="medium centered row">
  <span class="label">Move cursor around</span>
</div>
```

---

## Animatable properties

Docs: https://animejs.com/documentation/animatable/animatable-properties · Since 4.0.0

Properties available on the `Animatable` instance returned by a `createAnimatable()` function.

```js
const animatable = createAnimatable(targets, parameters);
           ┌───────────┐
animatable.│targets    ├─ Properties
animatable.│animations │
           └───────────┘
```

| Name | Description |
|---|---|
| targets | Gets the animatable Targets (`Array`) |
| animations | Gets all animatable Animations (`Object`) |

---

## Animatable settings

Docs: https://animejs.com/documentation/animatable/animatable-settings · Since 4.0.0

Animatables properties settings are specified globally to all properties on the parameters object, or specifically to a property by passing an object.

```js
createAnimatable(targets, {
  x: {
┌──────────────────┐
│   unit: 'rem',   │
│   duration: 400, ├─ Specific Property Settings
│   ease: 'out(4)' │
└──────────────────┘
  },
  y: 200,
  rotate: 1000,
┌──────────────────┐
│ ease: 'out(2)',  ├─ Global Properties Settings
└──────────────────┘
});
```

---

## duration

Docs: https://animejs.com/documentation/animatable/animatable-settings/duration · Since 4.0.0

Specifies the duration in milliseconds for the transition to the animated value of the property.


### Accepts

- A `Number` equal to or greater than `0`
- A Function based value that returns a `Number` equal to or greater than `0`


### Default

`1000`

Example (javascript):

```javascript
import { createAnimatable, utils, stagger } from 'animejs';

const $demos = document.querySelector('#docs-demos');
const $demo = document.querySelector('.docs-demo.is-active');
let bounds = $demo.getBoundingClientRect();
const refreshBounds = () => bounds = $demo.getBoundingClientRect();

const circles = createAnimatable('.circle', {
  x: 0, // Imediatly set the value without animation
  y: stagger(200, { from: 'center', start: 200 }),
  ease: 'out(4)',
});

const onMouseMove = e => {
  const { width, height, left, top } = bounds;
  const hw = width / 2;
  const hh = height / 2;
  const x = utils.clamp(e.clientX - left - hw, -hw, hw);
  const y = utils.clamp(e.clientY - top - hh, -hh, hh);
  circles.x(x).y(y);
}

window.addEventListener('mousemove', onMouseMove);
$demos.addEventListener('scroll', refreshBounds);
```

Example (html):

```html
<div class="medium centered row">
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
</div>
<div class="small centered row">
  <span class="label"><br><br><br>Move cursor around</span>
</div>
```

---

## ease

Docs: https://animejs.com/documentation/animatable/animatable-settings/ease · Since 4.0.0

Determines the easing function for the transition to the animated value of the property.


### Accepts

ease


### Default

`'out(2)'`

> It is recommended to use an `out` type easing function to achieve interesting results. `in` type easing functions start with changes that are too subtle to be noticeable.

Example (javascript):

```javascript
import { createAnimatable, utils, stagger } from 'animejs';

const clock1 = createAnimatable('.clock-1', {
  rotate: { unit: 'rad' },
  ease: 'linear',
});

const clock2 = createAnimatable('.clock-2', {
  rotate: { unit: 'rad' },
  ease: 'outElastic',
});

const rotateClock = (animatable) => {
  const PI = Math.PI;
  let angle = PI / 2;
  let lastAngle = 0;
  return e => {
    const [ $clock ] = animatable.targets;
    const { width, height, left, top } = $clock.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    const currentAngle = Math.atan2(y, x);
    const diff = currentAngle - lastAngle;
    angle += diff > PI ? diff - 2 * PI : diff < -PI ? diff + 2 * PI : diff;
    lastAngle = currentAngle;
    animatable.rotate(angle);
  }
}

const rotateClock1 = rotateClock(clock1);
const rotateClock2 = rotateClock(clock2);

const onMouseMove = e => {
  rotateClock1(e);
  rotateClock2(e);
}

window.addEventListener('mousemove', onMouseMove);
```

Example (html):

```html
<div class="large centered row">
  <div class="col">
    <div class="clock clock-1"></div>
    <div class="label">linear</div>
  </div>
  <div class="col">
    <div class="clock clock-2"></div>
    <div class="label">outElastic</div>
  </div>
</div>
```

---

## modifier

Docs: https://animejs.com/documentation/animatable/animatable-settings/modifier · Since 4.0.0

Defines a Modifier function to modify or alter the behaviour of the animated numerical value.


### Accepts

Modifier function


### Default

`noop`

Example (javascript):

```javascript
import { createAnimatable, utils, stagger } from 'animejs';

const PI = Math.PI;

const clock1 = createAnimatable('.clock-1', {
  rotate: { unit: 'rad' },
  modifier: utils.snap(PI / 10),
  duration: 0,
});

const clock2 = createAnimatable('.clock-2', {
  rotate: { unit: 'rad' },
  modifier: v => -v,
  duration: 0,
});

const rotateClock = (animatable) => {
  return e => {
    const [ $clock ] = animatable.targets;
    const { width, height, left, top } = $clock.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    animatable.rotate(Math.atan2(y, x) + PI / 2);
  }
}

const rotateClock1 = rotateClock(clock1);
const rotateClock2 = rotateClock(clock2);

const onMouseMove = e => {
  rotateClock1(e);
  rotateClock2(e);
}

window.addEventListener('mousemove', onMouseMove);
```

Example (html):

```html
<div class="large centered row">
  <div class="col">
    <div class="clock clock-1"></div>
    <div class="label">snapped</div>
  </div>
  <div class="col">
    <div class="clock clock-2"></div>
    <div class="label">inverted</div>
  </div>
</div>
```

---

## unit

Docs: https://animejs.com/documentation/animatable/animatable-settings/unit · Since 4.0.0

Defines the unit for the animated value of the property.


### Accepts

A `String` containing a valid CSS unit

Example (javascript):

```javascript
import { createAnimatable, utils } from 'animejs';

const $demos = document.querySelector('#docs-demos');
const [ $clock ] = utils.$('.clock');
let bounds = $clock.getBoundingClientRect();
const refreshBounds = () => bounds = $clock.getBoundingClientRect();

const clock = createAnimatable($clock, {
  rotate: { unit: 'rad' }, // Set the unit to 'rad'
  duration: 400,
});

const { PI } = Math;
let lastAngle = 0
let angle = PI / 2;

const onMouseMove = e => {
  const { width, height, left, top } = bounds;
  const x = e.clientX - left - width / 2;
  const y = e.clientY - top - height / 2;
  const currentAngle = Math.atan2(y, x);
  const diff = currentAngle - lastAngle;
  angle += diff > PI ? diff - 2 * PI : diff < -PI ? diff + 2 * PI : diff;
  lastAngle = currentAngle;
  clock.rotate(angle); // Pass the new angle value in rad
}

window.addEventListener('mousemove', onMouseMove);
$demos.addEventListener('scroll', refreshBounds);
```

Example (html):

```html
<div class="large centered row">
  <div class="col">
    <div class="clock"></div>
  </div>
</div>
<div class="small centered row">
  <span class="label">Move cursor around</span>
</div>
```

---

