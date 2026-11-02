# Anime.js v4 · Utilities

Source: official documentation at https://animejs.com/documentation (MIT-licensed library by Julian Garnier).

## Utilities

Docs: https://animejs.com/documentation/utilities

### A collection of utility functions for common animation tasks that can also serve asmodifier functions.

All utility functions are available on the `utils` object imported from the main `'animejs'` module:

```js
import { utils } from 'animejs';

utils.stagger();
utils.$();
utils.get();
utils.set();
// Other functions
```

Or imported directly from the main `'animejs'` module:

```js
import {
  stagger,
  $,
  get,
  set,
  // Other functions
} from 'animejs';
```

Or imported as a standalone module from the `'animejs/utils'` subpath:

```js
import {
  stagger,
  $,
  get,
  set,
  // Other functions
} from 'animejs/utils';
```

---

## Chain-able utility functions

Docs: https://animejs.com/documentation/utilities/chain-able-utility-functions · Since 4.0.0

Chain-able utility functions allow for the creation of complex operations by combining multiple functions in a single expression.

```js
const clampRoundPad = utils.clamp(0, 100).round(2).padStart(6, '0');
clampRoundPad(125)   // '000100'
clampRoundPad(75.25) // '075.25'
```

The following utility functions support chaining:

- `round()`
- `clamp()`
- `snap()`
- `wrap()`
- `mapRange()`
- `interpolate()`
- `roundPad()`
- `padStart()`
- `padEnd()`
- `degToRad()`
- `radToDeg()`

> Chain-able functions works great in combinaison with the modifier tween parameter.


### Usage

Chain-able functions are created when calling a utility function without its optional value parameter:

```js
const chainableClamp = utils.clamp(0, 100); // Returns a chain-able function
const result = chainableClamp(150); // 100
```


### Chaining

Chain-able functions are combined like this:

```js
const normalizeAndRound = utils.mapRange(0, 255, 0, 1).round(1);
normalizeAndRound(128); // '0.5'
normalizeAndRound(64);  // '0.3'
```

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

animate('.value', {
  innerHTML: 1000,
  modifier: utils.wrap(0, 10).roundPad(3).padStart(6, '0'),
  duration: 100000,
  alternate: true,
  loop: true,
  ease: 'linear',
});
```

Example (html):

```html
<div class="large row">
  <pre class="large log row">
    <span class="value lcd">0</span>
  </pre>
</div>
```

---

## clamp()

Docs: https://animejs.com/documentation/utilities/clamp · Since 4.0.0

Restricts a `Number` between the specified *min* and *max* values or creates a clamping `Function` with pre-defined *min* and *max* parameters.

```js
const clampedValue = utils.clamp(value, min, max);
const clamperFunction = utils.clamp(min, max);
```


### Parameters

| Name | Accepts |
|---|---|
| value (opt) | `Number` |
| min | `Number` |
| max | `Number` |


### Returns

A `Number` if a value is provided, otherwise a chain-able utility `Function` to clamp numbers between the specified *min* and *max* values:

```js
const clampBetween0and100 = utils.clamp(0, 100);
clampBetween0and100(90);  // 90
clampBetween0and100(120); // 100
clampBetween0and100(-15); // 0

const clampAndRound = utils.clamp(0, 100).round(2); // Clamp then round to 2 decimal places
clampAndRound(72.7523); // 72.75
clampAndRound(120.2514); // 100
```

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

animate('.normal', {
  rotate: '1turn',
  duration: 3000,
  loop: true,
  ease: 'inOut',
});

animate('.clamped', {
  rotate: '1turn',
  modifier: utils.clamp(.25, .75), // Used as a function
  duration: 3000,
  loop: true,
  ease: 'inOut',
});
```

Example (html):

```html
<div class="x-large spaced-evenly row">
  <div class="col">
    <div class="clock normal"></div>
    <div class="label">normal</div>
  </div>
  <div class="col">
    <div class="clock clamped"></div>
    <div class="label">clamped [.25,.75]</div>
  </div>
</div>
```

---

## cleanInlineStyles()

Docs: https://animejs.com/documentation/utilities/clean-inline-styles · Since 4.0.0

Removes all CSS inline styles added by the specified instance.
 Can be used as a Animation or Timeline `onComplete()` callback.

```js
const cleanedInstance = utils.cleanInlineStyles(instance);
```


### Parameters

| Name | Accepts |
|---|---|
| instance | Animation \| Timeline |


### Returns

The passed Animation or Timeline instance.

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

utils.set('.square', { scale: .75 });

animate('.keep-styles', {
  x: '17rem',
  borderRadius: '50%',
});

animate('.clean-styles', {
  x: '17rem',
  borderRadius: '50%',
  // This removes the translateX and borderRadius inline styles
  // But keeps the scale previously added outside of this animation
  onComplete: utils.cleanInlineStyles
});
```

Example (html):

```html
<div class="medium row">
  <div class="square keep-styles"></div>
  <div class="padded label">Keep styles (default)</div>
</div>
<div class="medium row">
  <div class="square clean-styles"></div>
  <div class="padded label">Clean translateX and borderRadius</div>
</div>
```

---

## createSeededRandom()

Docs: https://animejs.com/documentation/utilities/createseededrandom · Since 2.0.0

Returns a pre-seeded pseudo-random function that always return the same suite of `Number` within a specified range, with an optional third parameter determining the number of decimal places.

```js
const seededRandom = utils.createSeededRandom(12345);

const randomValue = seededRandom(min, max, decimalLength);
```


### Parameters

| Name | Accepts |
|---|---|
| seed=0 (opt) | `Number` |
| seededMin=0 (opt) | `Number` |
| seededMax=1 (opt) | `Number` |
| seededDecimalLength=0 (opt) | `Number` |


### Returns

A pre-seeded `random()` function

Example (javascript):

```javascript
import { utils } from 'animejs';

const seededRandom = utils.createSeededRandom(12345);

utils.set('.square', {
  x: () => seededRandom(2, 18, 2) + 'rem',
  rotate: () => seededRandom(0, 180),
  scale: () => seededRandom(.25, 1.5, 3),
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

## keepTime()

Docs: https://animejs.com/documentation/utilities/createtimekeeper · Since 4.1.0

Returns a `Function` that recreates a `Timer`, `Animation`, or `Timeline` while keeping track of its current time, allowing to seamlessly update an animation's parameters without breaking the playback state.

```js
const trackedAnimate = utils.keepTime(() => animate(target, params));

const tracked = trackedAnimate();
```


### Parameters

| Name | Accepts |
|---|---|
| constructor | A `Function` that returns a `Timer`, `Animation`, or `Timeline` |


### Returns

A `Function` that returns the tracked `Timer`, `Animation`, or `Timeline`

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

const [ $button ] = utils.$('button');
const clocks = utils.$('.clock');
let targetIndex = 0;

const animateNextTarget = utils.keepTime(() => {
  if (targetIndex > clocks.length - 1) targetIndex = 0;
  return animate(clocks[targetIndex++], {
    color: ['#B7FF54', '#FF4B4B'],
    rotate: 360,
    ease: 'linear',
    duration: 8000,
    loop: true,
  })
});

animateNextTarget();

$button.addEventListener('click', animateNextTarget);
```

Example (html):

```html
<div class="large row spaced-evenly">
  <div class="col">
    <div class="clock input"></div>
  </div>
  <div class="col">
    <div class="clock lerped"></div>
  </div>
  <div class="col">
    <div class="clock lerped-15"></div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Switch target</button>
  </fieldset>
</div>
```

---

## damp()

Docs: https://animejs.com/documentation/utilities/damp · Since 4.0.0

A frame rate independent version of `utils.lerp()` to performs a linear interpolation between two values.

The closer the amount is to `1`, the closer the result is to the *end* value.

```js
const lerped = utils.lerp(start, end, deltaTime, amount);
```


### Parameters

| Name | Accepts |
|---|---|
| start | `Number` |
| end | `Number` |
| deltaTime | `Number` (ms) |
| amount | `Number [0-1]` |


### Returns

`Number`

```js
utils.damp(0, 100, 8, 0); // 0
utils.damp(0, 100, 8, 0.5); // 50
utils.damp(0, 100, 8, 1); // 100
```

Example (javascript):

```javascript
import { animate, createTimer, utils } from 'animejs';

const [ $input ] = utils.$('.input');
const [ $lerped ] = utils.$('.lerped');
const [ $lerped15fps ] = utils.$('.lerped-15');

animate($input, {
  rotate: '1000turn',
  modifier: utils.snap(.25),
  duration: 4000000,
  loop: true,
  ease: 'linear',
});

const dampedLoop = createTimer({
  frameRate: 15,
  onUpdate: clock => {
    const sourceRotate = utils.get($input, 'rotate', false);
    const lerpedRotate = utils.get($lerped15fps, 'rotate', false);
    utils.set($lerped15fps, {
      rotate: utils.damp(lerpedRotate, sourceRotate, clock.deltaTime, .075) + 'turn'
    });
  }
});

const lerpedLoop = createTimer({
  frameRate: 15,
  onUpdate: () => {
    const sourceRotate = utils.get($input, 'rotate', false);
    const lerpedRotate = utils.get($lerped, 'rotate', false);
    utils.set($lerped, {
      rotate: utils.lerp(lerpedRotate, sourceRotate, .075) + 'turn'
    });
  }
});
```

Example (html):

```html
<div class="x-large spaced-evenly row">
  <div class="col">
    <div class="clock input"></div>
    <div class="label">input</div>
  </div>
  <div class="col">
    <div class="clock lerped-15"></div>
    <div class="label">damped 15fps</div>
  </div>
  <div class="col">
    <div class="clock lerped"></div>
    <div class="label">lerped 15fps</div>
  </div>
</div>
```

---

## degToRad()

Docs: https://animejs.com/documentation/utilities/deg-to-rad · Since 4.0.0

Converts degrees into radians.

```js
const radians = utils.degToRad(degrees);
```


### Parameters

| Name | Accepts |
|---|---|
| degrees (opt) | `Number` |


### Returns

A `Number` if degrees are provided, otherwise a chain-able utility `Function` to convert degrees to radians:

```js
const degToRad = utils.degToRad();
degToRad(360); // 6.283185307179586

const roundDegToRad = utils.degToRad().round(2); // Convert degrees to radians then round to 2 decimal places
roundDegToRad(180); // 3.14
roundDegToRad(90);  // 1.57
```

Example (javascript):

```javascript
import { animate, createAnimatable, utils } from 'animejs';

const radAnimatable = createAnimatable('.rad', {
  rotate: { unit: 'rad', duration: 0 },
});

const [ $deg ] = utils.$('.deg');

const degAnimation = animate($deg, {
  rotate: '360deg',
  ease: 'linear',
  loop: true,
  onUpdate: () => {
    const degrees = utils.get($deg, 'rotate', false);
    radAnimatable.rotate(utils.degToRad(degrees));
  }
});
```

Example (html):

```html
<div class="x-large spaced-evenly row">
  <div class="col">
    <div class="clock deg"></div>
    <div class="label">degrees</div>
  </div>
  <div class="col">
    <div class="clock rad"></div>
    <div class="label">radians</div>
  </div>
</div>
```

---

## $()

Docs: https://animejs.com/documentation/utilities/dollar-sign · Since 4.0.0

Converts the provided targets parameter into an `Array` of elements, serving as an alternative to `document.querySelectorAll()`.

When used within a Scope, it uses the Scope's `root` element instead of `document`, effectively calling `root.querySelectorAll()`.

```js
const targetsArray = utils.$(targets);
```


### Parameters

| Name | Accepts |
|---|---|
| targets | CSS selector \| DOM Elements |


### Returns

An `Array` of `HTMLElement` or `SVGElement` or `SVGGeometryElement`

Example (javascript):

```javascript
import { utils, createScope } from 'animejs';

// Targets all the '.square' elements
utils.$('.square').forEach($square => {
  utils.set($square, { scale: .5 });
});

createScope({ root: '.row:nth-child(2)' }).add(() => {
  // Limits the selection to '.row:nth-child(2) .square'
  utils.$('.square').forEach($square => {
    utils.set($square, { rotate: 45 });
  });
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
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="medium justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="medium justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
```

---

## get()

Docs: https://animejs.com/documentation/utilities/get · Since 2.0.0

Returns the current value of a target's property, with optional unit conversion or removal.

```js
const value = utils.get(target, property, unit);
```


### Parameters

| Name | Accepts | Description |
|---|---|---|
| target | Targets | The targeted element |
| property | `String` | A valid property name of the target |
| unit (opt) | `String` \| `Boolean` | Strip the unit if set to `false` or convert the unit if a valid unit `String` is passed |


### Returns

The returned property value type or the following types if the conditions are met:

| Type | Condition |
|---|---|
| `String` | The target is an `HTMLElement` or `SVGElement` and the `unit` parameter is not set to `false` or set to a valid unit `String` |
| `Number` | The target is an `HTMLElement` or `SVGElement` and the `unit` parameter set to `false` |

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

const [ $raw, $rem, $num ] = utils.$('.value');
const [ $sq1, $sq2, $sq3 ] = utils.$('.square');


const getValues = () => {
  // Return the raw parsed value (string with px)
  $raw.textContent = utils.get($sq1, 'x');
  // Return the converted value with unit (string with rem)
  $rem.textContent = utils.get($sq2, 'x', 'rem');
  // Return the raw value with its unit removed (number)
  $num.textContent = utils.get($sq3, 'x', false);
}

animate('.square', {
  x: 270,
  loop: true,
  alternate: true,
  onUpdate: getValues
});
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label"><span class="raw value"></span></div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label"><span class="rem value"></span></div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label"><span class="num value"></span></div>
</div>
```

---

## lerp()

Docs: https://animejs.com/documentation/utilities/lerp · Since 4.0.0

Interpolates a value between two numbers based on a given *progress* or creates an interpolation `Function` with pre-defined *start* and *end* parameters.

```js
const interpolatedValue = utils.lerp(start, end, progress);
const interpolatorFunction = utils.lerp(start, end);
```


### Parameters

| Name | Accepts |
|---|---|
| start | `Number` |
| end | `Number` |
| progress (opt) | `Number` (`[0 - 1]`) |


### Returns

A `Number` if a progress value is provided, otherwise a chain-able utility `Function` to interpolate between the specified *start* and *end* values:

```js
const interpolateBetween0and100 = utils.lerp(0, 100);
interpolateBetween0and100(0.5);  // 50
interpolateBetween0and100(0.75); // 75
interpolateBetween0and100(0.25); // 25

const interpolateAndRound = utils.lerp(0, 100).round(2); // Interpolate then round to 2 decimal places
interpolateAndRound(0.677523); // 67.75
interpolateAndRound(1.202514); // 100
```

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

animate('.normal', {
  rotate: '1turn',
  duration: 3000,
  loop: true,
  ease: 'inOut',
});

animate('.interpolated', {
  rotate: '1turn',
  modifier: utils.lerp(0, 12), // Interpolates 0 to 12 by passing the rotate progress value 0 to 1
  duration: 3000,
  loop: true,
  ease: 'inOut',
});
```

Example (html):

```html
<div class="x-large spaced-evenly row">
  <div class="col">
    <div class="clock normal"></div>
    <div class="label">normal</div>
  </div>
  <div class="col">
    <div class="clock interpolated"></div>
    <div class="label">interpolated [0,12]</div>
  </div>
</div>
```

---

## mapRange()

Docs: https://animejs.com/documentation/utilities/map-range · Since 4.0.0

Maps a `Number` from one range to another or creates a mapping `Function` with pre-defined ranges parameters.

```js
const mappedValue = utils.mapRange(value, fromLow, fromHigh, toLow, toHigh);
const mapperFunction = utils.mapRange(fromLow, fromHigh, toLow, toHigh);
```


### Parameters

| Name | Accepts |
|---|---|
| value (opt) | `Number` |
| fromLow | `Number` |
| fromHigh | `Number` |
| toLow | `Number` |
| toHigh | `Number` |


### Returns

A `Number` if a value is provided, otherwise a chain-able utility `Function` to map numbers from one range to another:

```js
const mapFrom0and100to0and200 = utils.mapRange(0, 100, 0, 200);
mapFrom0and100to0and200(45);  // 90
mapFrom0and100to0and200(120); // 240
mapFrom0and100to0and200(-15); // -30

const normalizeAndClamp = utils.mapRange(-100, 100, 0, 1).clamp(0, 1); // Normalize then clamp between 0 and 1
normalizeAndClamp(50);  // 0.75
normalizeAndClamp(120); // 1
```

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

animate('.normal', {
  rotate: '12turn',
  duration: 12000,
  loop: true,
  ease: 'inOut',
});

animate('.mapped', {
  rotate: '12turn',
  modifier: utils.mapRange(0, 12, 0, 1), // Used as a modifier
  duration: 12000,
  loop: true,
  ease: 'inOut',
});
```

Example (html):

```html
<div class="x-large spaced-evenly row">
  <div class="col">
    <div class="clock normal"></div>
    <div class="label">normal</div>
  </div>
  <div class="col">
    <div class="clock mapped"></div>
    <div class="label">mapped [0,12] [0,1]</div>
  </div>
</div>
```

---

## padEnd()

Docs: https://animejs.com/documentation/utilities/pad-end · Since 4.0.0

Pads a `Number` from the end with a string until the result reaches a given length or creates a padding `Function` with pre-defined *totalLength* and *padString* parameters.

```js
const paddedValue = utils.padEnd(value, totalLength, padString);
const padderFunction = utils.padEnd(totalLength, padString);
```


### Parameters

| Name | Accepts |
|---|---|
| value (opt) | `String` / `Number` |
| totalLength | `Number` |
| padString | `String` |


### Returns

A `String` if a value is provided, otherwise a chain-able utility `Function` to pad numbers from the end:

```js
const padTo5WithZeros = utils.padEnd(5, '0');
padTo5WithZeros('123');  // '12300'
padTo5WithZeros(78);     // '78000'
padTo5WithZeros('1234'); // '12340'

const roundAndPadEnd = utils.round(0).padEnd(5, '0'); // Round to nearest integer then pad to 5 characters
roundAndPadEnd(123.456); // '12300'
roundAndPadEnd(7.8);     // '80000'
```

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

animate('.value', {
  innerHTML: 1,
  modifier: utils.round(3).padEnd(6, '-'),
  duration: 100000,
  ease: 'linear',
});
```

Example (html):

```html
<div class="large row">
  <pre class="large log row">
    <span class="value lcd">0</span>
  </pre>
</div>
```

---

## padStart()

Docs: https://animejs.com/documentation/utilities/pad-start · Since 4.0.0

Pads a `Number` from the start with a string until the result reaches a given length or creates a padding `Function` with pre-defined *totalLength* and *padString* parameters.

```js
const paddedValue = utils.padStart(value, totalLength, padString);
const padderFunction = utils.padStart(totalLength, padString);
```


### Parameters

| Name | Accepts |
|---|---|
| value (opt) | `String` / `Number` |
| totalLength | `Number` |
| padString | `String` |


### Returns

A `String` if a value is provided, otherwise a chain-able utility `Function` to pad numbers from the start:

```js
const padTo5WithZeros = utils.padStart(5, '0');
padTo5WithZeros('123');  // '00123'
padTo5WithZeros(78);     // '00078'
padTo5WithZeros('1234'); // '01234'

const roundAndPad = utils.round(2).padStart(5, '0'); // Round to 2 decimal places then pad to 5 characters
roundAndPad(12.345);  // '12.35'
roundAndPad(7.8);     // '07.80'
```

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

animate('.value', {
  innerHTML: 10000,
  modifier: utils.round(0).padStart(6, '-'),
  duration: 100000,
  ease: 'linear',
});
```

Example (html):

```html
<div class="large row">
  <pre class="large log row">
    <span class="value lcd">0</span>
  </pre>
</div>
```

---

## radToDeg()

Docs: https://animejs.com/documentation/utilities/rad-to-deg · Since 4.0.0

Converts radians into degrees.

```js
const degrees = utils.radToDeg(radians);
```


### Parameters

| Name | Accepts |
|---|---|
| radians (opt) | `Number` |


### Returns

A `Number` if radians are provided, otherwise a chain-able utility `Function` to convert radians to degrees:

```js
const radToDeg = utils.radToDeg();
radToDeg(1.7453292519943295); // 100
radToDeg(Math.PI);            // 180

const roundRadToDeg = utils.radToDeg().round(2); // Convert radians to degrees then round to 2 decimal places
roundRadToDeg(Math.PI / 7);  // 25.71
```

Example (javascript):

```javascript
import { animate, createAnimatable, utils } from 'animejs';

const degAnimatable = createAnimatable('.deg', {
  rotate: { unit: 'deg', duration: 0 }
});

const [ $rad ] = utils.$('.rad');

const degAnimation = animate($rad, {
  rotate: (Math.PI * 2) + 'rad',
  ease: 'linear',
  loop: true,
  onUpdate: () => {
    const radians = utils.get($rad, 'rotate', false);
    degAnimatable.rotate(utils.radToDeg(radians));
  }
});
```

Example (html):

```html
<div class="x-large spaced-evenly row">
  <div class="col">
    <div class="clock rad"></div>
    <div class="label">radians</div>
  </div>
  <div class="col">
    <div class="clock deg"></div>
    <div class="label">degrees</div>
  </div>
</div>
```

---

## random()

Docs: https://animejs.com/documentation/utilities/random · Since 2.0.0

Returns a random `Number` within a specified range, with an optional third parameter determining the number of decimal places.

```js
const randomValue = utils.random(min, max, decimalLength);
```


### Parameters

| Name | Accepts |
|---|---|
| min | `Number` |
| max | `Number` |
| decimalLength=0 (opt) | `Number` |


### Returns

`Number`

Example (javascript):

```javascript
import { utils } from 'animejs';

utils.set('.square', {
  x: () => utils.random(2, 18, 2) + 'rem',
  rotate: () => utils.random(0, 180),
  scale: () => utils.random(.25, 1.5, 3),
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

## randomPick()

Docs: https://animejs.com/documentation/utilities/random-pick · Since 4.0.0

Returns a random element from a collection.

```js
const ramdomElement = utils.randomPick(collection);
```


### Parameters

| Name | Accepts |
|---|---|
| collection | `Array` \| `NodeList` \| `String` |


### Returns

An random element from the collection

Example (javascript):

```javascript
import { utils } from 'animejs';

utils.set('.letter', {
  x: () => utils.randomPick([5, 9, 13, 17]) + 'rem',
  scale: () => utils.randomPick([1, 1.25, 1.5, 1.75]),
  color: () => `var(--hex-${utils.randomPick(['red', 'orange', 'yellow'])}-1)`,
  innerHTML: () => utils.randomPick('ABCD'),
});
```

Example (html):

```html
<div class="small row">
  <div class="letter">A</div>
</div>
<div class="small row">
  <div class="letter">B</div>
</div>
<div class="small row">
  <div class="letter">C</div>
</div>
<div class="small row">
  <div class="letter">D</div>
</div>
```

---

## remove()

Docs: https://animejs.com/documentation/utilities/remove · Since 2.0.0

Removes one or multiple targets from all active animations, a specific instance or a specific property, cancelling any Animation or Timeline referencing these targets if needed.

```js
const removed = utils.remove(targets, instance, propertyName);
```


### Parameters

| Name | Accepts |
|---|---|
| targets | Targets |
| instance (opt) | Animation \| Timeline |
| propertyName (opt) | Animatable Properties name `String` |


### Returns

An `Array` of the removed targeted elements

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

let updates = 0;

const [ $removeFirstButton ] = utils.$('.remove-1');
const [ $removeSecondButton ] = utils.$('.remove-2');
const [ $updates ] = utils.$('.value');

const animation = animate('.square', {
  x: '17rem',
  rotate: 360,
  alternate: true,
  loop: true,
  onUpdate: () => {
    $updates.textContent = updates++;
  }
});

$removeFirstButton.onclick = () => {
  utils.remove('.row:nth-child(1) .square');
}

$removeSecondButton.onclick = () => {
  utils.remove('.row:nth-child(2) .square', animation, 'x');
}
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
<pre class="large log row">
  <span class="label">updates</span>
  <span class="value">--</span>
</pre>
<div class="medium row">
  <fieldset class="controls">
    <button class="button remove-1">Remove all first</button>
    <button class="button remove-2">Remove x second</button>
  </fieldset>
</div>
```

---

## round()

Docs: https://animejs.com/documentation/utilities/round · Since 4.0.0

Rounds a `Number` to a specified number of decimal places or creates a rounding `Function` with a pre-defined *decimalLength* parameter.

```js
const roundedValue = utils.round(value, decimalLength);
const roundingFunction = utils.round(decimalLength);
```


### Parameters

| Name | Accepts |
|---|---|
| value (opt) | `Number` |
| decimalLength | `Number` |


### Returns

A `Number` if a value is provided, otherwise a chain-able utility `Function` to round numbers with the specified decimal length:

```js
const clampAndRound = utils.clamp(0, 100).round(2); // Clamp then round to 2 decimal places
clampAndRound(72.7523); // 72.75
clampAndRound(120.2514); // 100
```

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

animate('.normal', {
  rotate: '1turn',
  duration: 3000,
  loop: true,
});

animate('.rounded', {
  rotate: '1turn',
  modifier: utils.round(1), // Used as a function
  duration: 3000,
  loop: true,
});
```

Example (html):

```html
<div class="x-large spaced-evenly row">
  <div class="col">
    <div class="clock normal"></div>
    <div class="label">normal</div>
  </div>
  <div class="col">
    <div class="clock rounded"></div>
    <div class="label">rounded (.1)</div>
  </div>
</div>
```

---

## roundPad()

Docs: https://animejs.com/documentation/utilities/round-pad · Since 4.0.0

Rounds a value to a specified decimal length, pads with zeros if needed, and returns the result as a string, or creates a rounding and padding `Function` with a pre-defined *decimalLength* parameter.

```js
const roundedPaddedValue = utils.roundPad(value, decimalLength);
const roundPadderFunction = utils.roundPad(decimalLength);
```


### Parameters

| Name | Accepts |
|---|---|
| value (opt) | `Number` / `String` |
| decimalLength | `Number` |


### Returns

A `String` if a value is provided, otherwise a chain-able utility `Function` to round and pad numbers to the specified decimal length:

```js
const roundPadTo2Decimals = utils.roundPad(2);
roundPadTo2Decimals(90.12345);  // '90.12'
roundPadTo2Decimals(120);       // '120.00'
roundPadTo2Decimals(15.9);      // '15.90'

const snapAndRoundPad = utils.snap(50).roundPad(2); // Snap to nearest 50 then roundPad to 2 decimal places
snapAndRoundPad(123.456); // '100.00'
snapAndRoundPad(175.789); // '200.00'
```

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

animate('.value', {
  innerHTML: '8.1',
  modifier: utils.roundPad(3),
  duration: 10000,
  ease: 'linear',
});
```

Example (html):

```html
<div class="large row">
  <pre class="large log row">
    <span class="value lcd">0.000</span>
  </pre>
</div>
```

---

## set()

Docs: https://animejs.com/documentation/utilities/set · Since 2.0.0

Immediately sets one or multiple properties values to one or multiple targets.

```js
const setter = utils.set(targets, properties);
```


### Parameters

| Name | Accepts | Description |
|---|---|---|
| targets | Targets | The targeted element(s) |
| properties | `Object` | An object of valid properties and values of the target |


### Returns

Animation

> `utils.set()` is useful for setting complex values, but for repeatedly updating the same properties on the same targets, using an Animatable is recommended for better performances.

> `utils.set()` won't work if you try to set an attribute on a DOM or SVG element not already defined on the element.

Example (javascript):

```javascript
import { utils, stagger } from 'animejs';

const [ $set, $revert ] = utils.$('button');
const squares = utils.$('.square');
const colors = ['red', 'orange', 'yellow'];

let setter;

const setStyles = () => {
  setter = utils.set(squares, {
    borderRadius: '50%',
    y: () => utils.random(-1, 1) + 'rem',
    scale: stagger(.1, { start: .25, ease: 'out' }),
    color: () => `var(--hex-${utils.randomPick(colors)})`
  });
  $set.setAttribute('disabled', 'true');
  $revert.removeAttribute('disabled');
}

const revertStyles = () => {
  setter.revert();
  $set.removeAttribute('disabled');
  $revert.setAttribute('disabled', 'true');
}

$set.addEventListener('click', setStyles);
$revert.addEventListener('click', revertStyles);
```

Example (html):

```html
<div class="large justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Set styles</button>
    <button disabled>Revert styles</button>
  </fieldset>
</div>
```

---

## shuffle()

Docs: https://animejs.com/documentation/utilities/shuffle · Since 4.0.0

Mutates an array by randomizing the order of its elements.

```js
const shuffledArray = utils.shuffle(array);
const seededShuffle = utils.shuffle(array, utils.createSeededRandom(42));
```


### Parameters

| Name | Accepts |
|---|---|
| array | `Array` |
| rnd (opt) | A random number generator matching `random()`'s signature, defaults to `random` |


### Returns

The mutated `Array`

Example (javascript):

```javascript
import { utils, animate, stagger } from 'animejs';

const [ $shuffle ] = utils.$('button');
const squares = utils.$('.square');
const x = stagger('3.2rem');

// Initial squares x position
utils.set(squares, { x });

const shuffle = () => animate(utils.shuffle(squares), { x });

$shuffle.addEventListener('click', shuffle);
```

Example (html):

```html
<div class="large row">
  <div class="square">A</div>
  <div class="square">B</div>
  <div class="square">C</div>
  <div class="square">D</div>
  <div class="square">E</div>
  <div class="square">F</div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Shuffle</button>
  </fieldset>
</div>
```

---

## snap()

Docs: https://animejs.com/documentation/utilities/snap · Since 4.0.0

Rounds a `Number` to the nearest specified *increment* or creates a snapping `Function` with a pre-defined *increment* parameter.
 If an `Array` is provided as the increment, it selects the closest value from the array.

```js
const snappedValue = utils.snap(value, increment);
const snapperFunction = utils.snap(increment);
```


### Parameters

| Name | Accepts |
|---|---|
| value (opt) | `Number` |
| increment | `Number` \| `Array<Number>` |


### Returns

A `Number` if a value is provided, otherwise a chain-able utility `Function` to snap numbers to the nearest *increment* or array value:

```js
const snapTo10 = utils.snap(10);
snapTo10(94);  // 90
snapTo10(-17); // -20

const snapToArray = utils.snap([0, 50, 100]);
snapToArray(30);  // 50
snapToArray(75);  // 100
snapToArray(-10); // 0

const clampAndSnap = utils.clamp(0, 100).snap(30);
clampAndSnap(72.7523); // 60
clampAndSnap(120.2514); // 90
```

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

animate('.normal', {
  rotate: '1turn',
  duration: 3000,
  loop: true,
  ease: 'inOut',
});

animate('.snapped', {
  rotate: '1turn',
  modifier: utils.snap(.25), // Used as a modifier
  duration: 3000,
  loop: true,
  ease: 'inOut',
});
```

Example (html):

```html
<div class="x-large spaced-evenly row">
  <div class="col">
    <div class="clock normal"></div>
    <div class="label">normal</div>
  </div>
  <div class="col">
    <div class="clock snapped"></div>
    <div class="label">snapped (.25)</div>
  </div>
</div>
```

---

## stagger()

Docs: https://animejs.com/documentation/utilities/stagger · Since 2.0.0

### Creates sequential effects by distributing values progressively across multiple targets.

Stagger Function based values are created using `stagger()` function.

```js
import { stagger } from 'animejs';

const functionValue = stagger(value, parameters);
```


### Parameters

| Name | Accepts |
|---|---|
| value | Stagger value |
| parameters (opt) | Stagger parameters |


### Returns

Function based value

Example (javascript):

```javascript
import { animate, stagger } from 'animejs';

animate('.square', {
  x: '17rem',
  scale: stagger([1, .1]),
  delay: stagger(100),
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

## Stagger parameters

Docs: https://animejs.com/documentation/utilities/stagger/stagger-parameters · Since 2.0.0

```js
stagger(
  '1rem',
  {
  ┌───────────────────┐
  │ start: 100,       │
  │ from: 2,          │
  │ reversed: false,  ├─ Stagger Parameters
  │ ease: 'outQuad',  │
  │ grid: [8, 8],     │
  └───────────────────┘
  }
);
```

---

## Stagger ease

Docs: https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-ease · Since 2.0.0

Defines an easing applied to the staggered values distribution.


### Accept

ease


### Default

`'linear'`

Example (javascript):

```javascript
import { animate, stagger } from 'animejs';

animate('.square', {
  y: stagger(['2.75rem', '-2.75rem'], { ease: 'inOut(3)' }),
  delay: stagger([0, 500], { ease: 'inOut(3)', from: 'center' }),
  ease: 'inOutQuad',
  duration: 500,
  loop: true,
  alternate: true,
});
```

Example (html):

```html
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
```

---

## Stagger from

Docs: https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-from · Since 2.0.0

Defines the starting position of the stagger effect.


### Accepts

| Value | Description |
|---|---|
| `Number` | The starting index of the effect |
| `'first'` | Equivalent to index `0` |
| `'center'` | Starts the effect from the center |
| `'last'` | Starts the effect from the last element |
| `'random'` | Randomises the order of the staggered values |
| `[x, y]` | Normalized coordinate array (`0` to `1`) for precise 2D grid origin control (requires `grid`) |
| `[x, y, z]` | Normalized coordinate array (`0` to `1`) for precise 3D grid origin control (requires a 3D `grid` or targets with `{x, y, z}` coordinates) |


### Default

`0`

Example (javascript):

```javascript
import { createtimeline, stagger } from 'animejs';

const tl = createTimeline({
  loop: true,
  defaults: { duration: 500 },
  delay: 500,
  loopDelay: 500
})
.add('.row:nth-child(1) .square:nth-child(8)', { color: '#FFF', scale: 1.2 })
.add('.row:nth-child(1) .square', {
  scale: 0,
  delay: stagger(25, { from: 7 }),
}, '<')
.add('.row:nth-child(2) .square:first-child', { color: '#FFF', scale: 1.2 })
.add('.row:nth-child(2) .square', {
  scale: 0,
  delay: stagger(25, { from: 'first' }),
}, '<')
.add('.row:nth-child(3) .square:nth-child(6)', { color: '#FFF', scale: 1.2 })
.add('.row:nth-child(3) .square', {
  scale: 0,
  delay: stagger(25, { from: 'center' }),
}, '<')
.add('.row:nth-child(4) .square:last-child', { color: '#FFF', scale: 1.2 })
.add('.row:nth-child(4) .square', {
  scale: 0,
  delay: stagger(25, { from: 'last' }),
}, '<')
.set('.row .square', { color: 'currentColor' })
.add('.row .square', {
  scale: 1,
  delay: stagger(25, { from: 'random' }),
})
```

Example (html):

```html
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
```

---

## Stagger grid

Docs: https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-grid · Since 2.0.0

Distributes values on a 2D or 3D grid.


### Accepts

| Value | Description |
|---|---|
| `[<Number>, <Number>]` | Explicit 2D grid dimensions as `[columns, rows]` |
| `[<Number>, <Number>, <Number>]` | Explicit 3D grid dimensions as `[columns, rows, depth]` |
| `true` | Auto grid from target positions. `{x, y}` stays 2D, `{x, y, z}` switches to 3D |


### Default

`null`

> Since version 4.4.0, `grid: true` auto-grid mode computes grid dimensions from element positions instead of requiring explicit dimensions.

> Since version 4.5.0, you can pass explicit `[columns, rows, depth]` dimensions, and auto-grid switches to 3D when any target exposes a numeric `z`. Targets without one (DOM elements, plain `{x, y}` objects) are placed at `z = 0`. Useful when animating in 3D space with the Three.js adapter.

Example (javascript):

```javascript
import { animate, stagger } from 'animejs';

const $squares = utils.$('.square');

function animateGrid() {
  animate($squares, {
    scale: [
      { to: [0, 1.25] },
      { to: 0 }
    ],
    boxShadow: [
      { to: '0 0 1rem 0 currentColor' },
      { to: '0 0 0rem 0 currentColor' }
    ],
    delay: stagger(100, {
      grid: [11, 4],
      from: utils.random(0, 11 * 4)
    }),
    onComplete: animateGrid
  });
}

animateGrid();
```

Example (html):

```html
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
```

---

## Stagger grid axis

Docs: https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-grid-axis · Since 2.0.0

Defines the direction of a staggered grid effect by restricting which axis of the grid can update.


### Accepts

| Value | Effect |
|---|---|
| `'x'` | Restrict the direction to the x axis |
| `'y'` | Restrict the direction to the y axis |
| `'z'` | Restrict the direction to the z axis (3D grids only) |

> The `'z'` axis applies only to 3D grids, useful when animating in 3D space with the Three.js adapter.

Example (javascript):

```javascript
import { animate, stagger, utils } from 'animejs';

const grid = [11, 4];
const $squares = utils.$('.square');

function animateGrid() {
  const from = utils.random(0, 11 * 4);
  animate($squares, {
    translateX: [
      { to: stagger('-.75rem', { grid, from, axis: 'x' }) },
      { to: 0, ease: 'inOutQuad', },
    ],
    translateY: [
      { to: stagger('-.75rem', { grid, from, axis: 'y' }) },
      { to: 0, ease: 'inOutQuad' },
    ],
    opacity: [
      { to: .5 },
      { to: 1 }
    ],
    delay: stagger(85, { grid, from }),
    onComplete: animateGrid
  });
}

animateGrid();
```

Example (html):

```html
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
```

---

## Stagger jitterNEW

Docs: https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-jitter · Since 4.5.0

Adds a random offset to each staggered value.


### Accepts

| Value | Description |
|---|---|
| `<Number>` | Random offset in `[-value, +value]` |
| `[<Number>, <Number>]` | Offset ramps from the first value (closest target) to the second (farthest) |


### Default

`null`


### Seed

Pass a `seed` to make jitter reproducible. The same `seed` also makes `from: 'random'` reproducible.

| Value | Description |
|---|---|
| `false` | Default. Random offsets change on every run |
| `true` | Seeds the random generator with `0` |
| `<Number>` | Uses the number directly as the seed |

Example (javascript):

```javascript
import { animate, stagger } from 'animejs';

animate('.square', {
  y: ['-2.75rem', 2.75],
  duration: 500,
  delay: stagger(100, { jitter: 100 }),
  ease: 'inOutQuad',
  alternate: true,
  loop: true,
});
```

Example (html):

```html
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
```

---

## Stagger modifier

Docs: https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-modifier · Since 2.0.0

Defines a function that modify the returned staggered value.


### Accepts

A `Function` with the following parameters:


### Parameters

| Names | Description |
|---|---|
| `value` | The current animated numerical value |


### Must returns

`Number` | `String`

Example (javascript):

```javascript
import { animate, stagger } from 'animejs';

animate('.square', {
  boxShadow: [
    { to: stagger([1, .25], {
        modifier: v => `0 0 ${v * 30}px ${v * 20}px currentColor`,
        from: 'center'
      })
    },
    { to: 0 },
  ],
  delay: stagger(100, { from: 'center' }),
  loop: true
});
```

Example (html):

```html
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
```

---

## Stagger reversed

Docs: https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-reversed · Since 2.0.0

Defines if the stagger should operate in reverse.


### Accepts

`Boolean`


### Default

`false`

Example (javascript):

```javascript
import { animate, stagger } from 'animejs';

animate('.square', {
  translateX: '17rem',
  delay: stagger(100, { reversed: true }),
});
```

Example (html):

```html
<div class="small row">
  <div class="square"></div>
  <div class="label padded">delay: 300ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="label padded">delay: 200ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="label padded">delay: 100ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="label padded">delay: 0ms</div>
</div>
```

---

## Stagger start

Docs: https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-start · Since 2.0.0

Defines the starting value of the stagger.


### Accepts

`Number` | Timeline time position (Only when used as a timeline position argument)


### Default

`0`

Example (javascript):

```javascript
import { animate, stagger } from 'animejs';

animate('.square', {
  x: stagger('1rem', { start: 14 }), // adds 14 to the staggered value
  delay: stagger(100, { start: 500 }), // adds 500 to the staggered value
});
```

Example (html):

```html
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 14rem, delay: 500ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 15rem, delay: 600ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 16rem, delay: 700ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 17rem, delay: 700ms</div>
</div>
```

---

## Stagger total

Docs: https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-total · Since 4.1.0

Defines a custom staggering length instead of using the actual total length of the staggered targets.
 This is useful if the max value of the custom order defined using the `use` parameter is lower than the actual number of staggered targets when using the `from`, `reversed` or `ease` parameters.


### Accepts

`Number`


### Default

`null`

Example (javascript):

```javascript
import { animate, stagger } from 'animejs';

animate('.square', {
  x: '17rem',
  rotate: 90,
  delay: stagger(250, { use: 'data-index', total: 2, reversed: true }),
});
```

Example (html):

```html
<div class="small row">
  <div class="square" data-index="0"></div>
  <div class="padded label">data-index="0"</div>
</div>
<div class="small row">
  <div class="square" data-index="0"></div>
  <div class="padded label">data-index="0"</div>
</div>
<div class="small row">
  <div class="square" data-index="1"></div>
  <div class="padded label">data-index="1"</div>
</div>
<div class="small row">
  <div class="square" data-index="1"></div>
  <div class="padded label">data-index="1"</div>
</div>
```

---

## Stagger use

Docs: https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-use · Since 4.1.0

Defines a custom staggering order instead of using the natural targets order by using an attribute or property of the targets.
 The properties or attributes must contain a suite of number, starting at `0`.

> A custom `total` parameter value must be defined if the highest custom index is lower than the actual total length of staggered targets when also using the `from`, `reversed` or `ease` parameters.


### Accepts

`String` of a valid property or attribute name


### Default

`null`

Example (javascript):

```javascript
import { animate, stagger } from 'animejs';

animate('.square', {
  x: '17rem',
  rotate: 90,
  delay: stagger(250, { use: 'data-index' }),
});
```

Example (html):

```html
<div class="small row">
  <div class="square" data-index="2"></div>
  <div class="padded label">data-index="2"</div>
</div>
<div class="small row">
  <div class="square" data-index="0"></div>
  <div class="padded label">data-index="0"</div>
</div>
<div class="small row">
  <div class="square" data-index="3"></div>
  <div class="padded label">data-index="3"</div>
</div>
<div class="small row">
  <div class="square" data-index="1"></div>
  <div class="padded label">data-index="1"</div>
</div>
```

---

## Stagger value types

Docs: https://animejs.com/documentation/utilities/stagger/stagger-value-types · Since 2.0.0

```js
stagger(
  ┌───────────────────┐
  │ '1rem',           ├─ Stagger Value
  └───────────────────┘
  {
    start: 100,
    from: 2,
    reversed: false,
    ease: 'outQuad',
    grid: [8, 8],
  }
);
```

---

## Numerical value

Docs: https://animejs.com/documentation/utilities/stagger/stagger-value-types/numerical-value · Since 2.0.0

Represents by how much each staggered value is incremented by.


### Accepts

- `Number`
- `String` containing at least one `Number`

Example (javascript):

```javascript
import { animate, stagger } from 'animejs';

animate('.square', {
  // Increase translateX by 5.75rem for each elements
  x: stagger('5.75rem'),
  // Increase delay by 100ms for each elements
  delay: stagger(100)
});
```

Example (html):

```html
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 0rem      delay: 0ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 5.75rem   delay: 100ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 11.5rem   delay: 200ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 17.25rem  delay: 300ms</div>
</div>
```

---

## Range value

Docs: https://animejs.com/documentation/utilities/stagger/stagger-value-types/range-value · Since 2.0.0

Distributes values evenly between two numerical values.


### Accepts

`[Number|String, Number|String]`

Example (javascript):

```javascript
import { animate, stagger } from 'animejs';

animate('.square', {
  y: stagger(['2.75rem', '-2.75rem']),
  delay: stagger([0, 500]),
});
```

Example (html):

```html
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
```

---

## Time staggering

Docs: https://animejs.com/documentation/utilities/stagger/time-staggering · Since 2.0.0

Tween's time related properties like `delay` and `duration` accepts Function-based values, enabling the use of the stagger function returned by the `stagger()` method in multi-target animations.

This results in each target tween having different timings, increasing by a set number of milliseconds for each subsequent target.

Example (javascript):

```javascript
import { animate, stagger } from 'animejs';

animate('.square', {
  x: '17rem',
  delay: stagger(100),
  duration: stagger(200, { start: 500 }),
  loop: true,
  alternate: true
});
```

Example (html):

```html
<div class="small row">
  <div class="square"></div>
  <div class="padded label">delay: 0ms;&nbsp;&nbsp;&nbsp;duration: 500ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">delay: 100ms; duration: 700ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">delay: 200ms; duration: 900ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">delay: 300ms; duration: 1100ms</div>
</div>
```

---

## Timeline positions staggering

Docs: https://animejs.com/documentation/utilities/stagger/timeline-positions-staggering · Since 4.0.0

The timeline `add()` position argument accepts function-based values, enabling the use of the stagger function returned by the `stagger()` method when positioning a multi-target animation.

This results in each target having creating its own animation to a staggered position, increasing by a set number of milliseconds for each subsequent target.

Callbacks defined on the staggered animation are also staggered and are called for every target.

The `start` property of the `stagger()` parameter object allows to define the starting value of the stagger, and accepts the same values as the timeline `add()` position argument.

Example (javascript):

```javascript
import { createTimeline, stagger, utils } from 'animejs';

const tl = createTimeline();

const onComplete = ({ targets }) => {
  utils.set(targets, { color: 'var(--hex-red)' });
}

tl
.add('.circle', { x: '15rem', onComplete })
.label('circle completes')
.add(['.triangle', '.square'], {
  x: '15rem',
  onComplete, // Callbacks are aslo staggered
}, stagger(500, { start: 'circle completes-=500' }));
```

Example (html):

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
</div>
```

---

## Values staggering

Docs: https://animejs.com/documentation/utilities/stagger/values-staggering · Since 2.0.0

All tweens animatable properties accept function-based values, enabling the use of the stagger function returned by the `stagger()` method in multi-target animations.

This results in each target having a staggered value, increasing by a set number for each subsequent target.

Example (javascript):

```javascript
import { animate, stagger } from 'animejs';

const animation = animate('.square', {
  y: stagger(['-2.75rem', '2.75rem']),
  rotate: { from: stagger('-.125turn') },
  loop: true,
  alternate: true
});
```

Example (html):

```html
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
```

---

## sync()

Docs: https://animejs.com/documentation/utilities/sync · Since 4.0.0

Execute a callback function in sync with the engine loop.

```js
utils.sync(function);
```


### Parameters

| Name | Accepts |
|---|---|
| callback | `Function` |


### Returns

`Timer`

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

## wrap()

Docs: https://animejs.com/documentation/utilities/wrap · Since 4.0.0

Wraps a `Number` between a range defined with *min* and *max* values or creates a wrapping `Function` with pre-defined *min* and *max* parameters.

```js
const wrappedValue = utils.wrap(value, min, max);
const wrapperFunction = utils.wrap(min, max);
```


### Parameters

| Name | Accepts |
|---|---|
| value (opt) | `Number` |
| min | `Number` |
| max | `Number` |


### Returns

A `Number` if a value is provided, otherwise a chain-able utility `Function` to wrap numbers between the specified *min* and *max* values:

```js
const wrapBetween0and100 = utils.wrap(0, 100);
wrapBetween0and100(105); // 5
wrapBetween0and100(220); // 20
wrapBetween0and100(-15); // 85

const wrapAndRound = utils.wrap(0, 100).round(2); // Wrap then round to 2 decimal places
wrapAndRound(105.7523); // 5.75
wrapAndRound(220.2514); // 20.25
```

Example (javascript):

```javascript
import { animate, utils } from 'animejs';

animate('.normal', {
  rotate: '1turn',
  duration: 3000,
  loop: true,
  ease: 'inOut',
});

animate('.wrapped', {
  rotate: '1turn',
  modifier: utils.wrap(-.25, .25), // Used as a modifier
  duration: 3000,
  loop: true,
  ease: 'inOut',
});
```

Example (html):

```html
<div class="x-large spaced-evenly row">
  <div class="col">
    <div class="clock normal"></div>
    <div class="label">normal</div>
  </div>
  <div class="col">
    <div class="clock wrapped"></div>
    <div class="label">wrapped [-.25,.25]</div>
  </div>
</div>
```

---

