# Anime.js v4 · Easings

Source: official documentation at https://animejs.com/documentation (MIT-licensed library by Julian Garnier).

## Easings

Docs: https://animejs.com/documentation/easings

### A collection of easing functions and a physics-based spring generator

> Use the **Easing Functions Editor** to visualize, create and customize easing functions.

All easing functions are available on the `easings` object imported from the main `'animejs'` module:

```js
import { easings } from 'animejs';

easings.eases.inOut(3);
easings.cubicBezier(.7, .1, .5, .9);
easings.spring({ bounce: .35 });
```

Or imported directly from the main `'animejs'` module:

```js
import { eases, cubicBezier, spring } from 'animejs';

eases.inOut(3);
cubicBezier(.7, .1, .5, .9);
spring({ bounce: .35 });
```

Or imported as a standalone module from the `'animejs/easings'` subpath:

```js
import { eases, cubicBezier, spring } from 'animejs/easings';
```

Easing and spring functions can be passed to the `ease` and `playbackEase` parameters of the `animate()` method or the `ease` parameter of the `stagger()` function.

```js
import { cubicBezier, linear, spring } from 'animejs';

animate(target, { x: 100, ease: 'inOut(3)' });
animate(target, { x: 100, ease: cubicBezier(.7, .1, .5, .9) });
animate(target, { x: 100, ease: spring({ bounce: .35 }) });
```

Example (javascript):

```javascript
import { animate, waapi, cubicBezier, spring } from 'animejs';

animate('.row:nth-child(1) .square', {
  x: '17rem',
  rotate: 360,
  ease: 'out(3)', // Built-in ease
});

animate('.row:nth-child(2) .square', {
  x: '17rem',
  rotate: 360,
  ease: cubicBezier(.7, .1, .5, .9), // Custom cubic Bezier curves
});

waapi.animate('.row:nth-child(3) .square', {
  x: '17rem',
  rotate: 360,
  ease: spring({ bounce: .35 }), // Spring physics
});
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">'inQuad'</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">cubicBezier(.7, .1, .5, .9)</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">spring({ bounce: 1.25 })</div>
</div>
```

---

## Built-in eases

Docs: https://animejs.com/documentation/easings/built-in-eases · Since 1.0.0

Both the js and waapi `animate()` functions include a collection of built-in easing functions that can be specified by name directly in the `ease` parameter:

```js
animate(target, { x: 100, ease: 'outQuad' });
animate(target, { x: 100, ease: 'outExpo' });
animate(target, { x: 100, ease: 'outElastic(.8, 1.2)' });
```

All built-in easing functions are also accessible through the imported `eases` object:

```js
import { eases } from 'animejs';

eases.outQuad;
eases.outExpo;
eases.outElastic(.8, 1.2);
```


### List of built-in easing functions

| Type | Parameters | Variants (click the links to open in the editor) |
|---|---|---|
| Linear | -- | `'linear'` |
| Power | power = `1.675` | `'in'`, `'out'`, `'inOut'`, `'outIn'` |
| Quad | -- | `'inQuad'`, `'outQuad'`, `'inOutQuad'`, `'outInQuad'` |
| Cubic | -- | `'inCubic'`, `'outCubic'`, `'inOutCubic'`, `'outInCubic'` |
| Quart | -- | `'inQuart'`, `'outQuart'`, `'inOutQuart'`, `'outInQuart'` |
| Quint | -- | `'inQuint'`, `'outQuint'`, `'inOutQuint'`, `'outInQuint'` |
| Sine | -- | `'inSine'`, `'outSine'`, `'inOutSine'`, `'outInSine'` |
| Exponential | -- | `'inExpo'`, `'outExpo'`, `'inOutExpo'`, `'outInExpo'` |
| Circular | -- | `'inCirc'`, `'outCirc'`, `'inOutCirc'`, `'outInCirc'` |
| Bounce | -- | `'inBounce'`, `'outBounce'`, `'inOutBounce'`, `'outInBounce'` |
| Back | overshoot = `1.70158` | `'inBack'`, `'outBack'`, `'inOutBack'`, `'outInBack'` |
| Elastic | amplitude = `1`,
 period = `.3` | `'inElastic'`, `'outElastic'`, `'inOutElastic'`, `'outInElastic'` |

Example (javascript):

```javascript
import { animate, waapi } from 'animejs';

animate('.row:nth-child(1) .square', {
  x: '17rem',
  rotate: 360,
  ease: 'inOut',
});

animate('.row:nth-child(2) .square', {
  x: '17rem',
  rotate: 360,
  ease: 'inOut(3)',
});

waapi.animate('.row:nth-child(3) .square', {
  x: '17rem',
  rotate: 360,
  ease: 'inOutExpo',
});
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">'inOut'</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">'inOut(3)'</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">'inOutExpo'</div>
</div>
```

---

## Cubic Bézier easing

Docs: https://animejs.com/documentation/easings/cubic-bezier-easing · Since 2.0.0

A cubic bezier easing defines the pace of an animation using a Bézier curve.


### For JavaScript

The `cubicBezier()` function must be imported for the js `animate()`:

```js
import { animate, cubicBezier } from 'animejs';

animate(target, { x: 100, ease: cubicBezier(0, 0, 0.58, 1) });
```


### For WAAPI

The waapi `animate()` function uses the browser native cubic bezier timing function and can be specified as a `String` directly in the `ease` parameter:

```js
import { waapi } from 'animejs';

waapi.animate(target, { x: 100, ease: 'cubic-bezier(0, 0, 0.58, 1)' });

// Or

waapi.animate(target, { x: 100, ease: 'cubicBezier(0, 0, 0.58, 1)' });
```


### Parameters

The cubic bezier function takes 4 parameters `cubicBezier(x1, y1, x2, y2)`:

| Name | Type | Info |
|---|---|---|
| x1 | `Number` | X coordinate of the first control point. Must be between 0 and 1. |
| y1 | `Number` | Y coordinate of the first control point. Can be any value (negative creates anticipation, >1 creates overshoot). |
| x2 | `Number` | X coordinate of the second control point. Must be between 0 and 1. |
| y2 | `Number` | Y coordinate of the second control point. Can be any value (negative creates anticipation, >1 creates overshoot). |


### Examples

| Name | Editor link |
|---|---|
| In cubic bezier curve | Open in editor |
| Out cubic bezier curve | Open in editor |
| InOut cubic bezier curve | Open in editor |
| OutIn cubic bezier curve | Open in editor |

Example (javascript):

```javascript
import { animate, waapi, cubicBezier } from 'animejs';

animate('.row:nth-child(1) .square', {
  x: '17rem',
  rotate: 360,
  ease: cubicBezier(0.5, 0, 0.9, 0.3)
});

animate('.row:nth-child(2) .square', {
  x: '17rem',
  rotate: 360,
  ease: cubicBezier(0.1, 0.7, 0.5, 1)
});

waapi.animate('.row:nth-child(3) .square', {
  x: '17rem',
  rotate: 360,
  ease: 'cubicBezier(0.7, 0.1, 0.5, 0.9)'
});
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">cubicBezier(0.5, 0, 0.9, 0.3)</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">cubicBezier(0.1, 0.7, 0.5, 1)</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">cubicBezier(0.7, 0.1, 0.5, 0.9)</div>
</div>
```

---

## Irregular easing

Docs: https://animejs.com/documentation/easings/irregular-easing · Since 4.0.0

An irregular easing defines the pace of an animation using linear interpolation between randomized points.

```js
import { animate, irregular } from 'animejs';

animate(target, { x: 100, ease: irregular(10, 1.5);
```


### Parameters

The irregular function takes up to 2 parameters `irregular(steps, randomness)`:

| Name | Type | Info |
|---|---|---|
| steps | `Number` | Represents the number of random steps to generate. Must be a positive integer. |
| randomness (opt) | `Number` | Controls the amplitude of random variations. Higher values create more dramatic jumps between steps (default: `1`). |


### Examples

| Name | Editor link |
|---|---|
| Light irregular easing | Open in editor |
| Heavy irregular easing | Open in editor |

Example (javascript):

```javascript
import { animate, waapi, irregular } from 'animejs';

animate('.row:nth-child(1) .square', {
  x: '17rem',
  rotate: 360,
  duration: 2000,
  ease: irregular(10, .5)
});

animate('.row:nth-child(2) .square', {
  x: '17rem',
  rotate: 360,
  duration: 2000,
  ease: irregular(10, 1)
});

waapi.animate('.row:nth-child(3) .square', {
  x: '17rem',
  rotate: 360,
  duration: 2000,
  ease: irregular(10, 2)
});
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">irregular(10, .5)</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">irregular(10, 1)</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">irregular(10, 2)</div>
</div>
```

---

## Linear easing

Docs: https://animejs.com/documentation/easings/linear-easing · Since 4.0.0

A linear easing defines the pace of an animation using linear interpolation between specified points.


### For JavaScript

The `linear()` function must be imported for the js `animate()`:

```js
import { animate, linear } from 'animejs';

animate(target, { x: 100, ease: linear(0, '0.5 50%', '0.3 75%', 1) });
```


### For WAAPI

The waapi `animate()` function uses the browser native linear timing function:

```js
import { waapi } from 'animejs';

waapi.animate(target, { x: 100, ease: 'linear(0, 0.5 50%, 0.3 75%, 1)' });
```


### Parameters

The linear function takes a list of stops `linear(stop1, stop2, ...stopN)`:

| Name | Type | Info |
|---|---|---|
| number | `Number` | Represents the output value at a point during the animation. At least two values must be specified. The value 0 represents the start, and 1 represents the end. Values outside 0-1 create overshoot effects. |
| percentage (opt) | `String` | Optional timing position as a string: `'value percentage'`. Indicates when the value is reached during the animation. Cannot be used on first or last stops. If omitted, stops are distributed evenly. |

Example (javascript):

```javascript
import { animate, waapi, linear } from 'animejs';

animate('.row:nth-child(1) .square', {
  x: '17rem',
  rotate: 360,
  duration: 2000,
  ease: linear(0, 0, 0.5, 0.5, 1, 1)
});

animate('.row:nth-child(2) .square', {
  x: '17rem',
  rotate: 360,
  duration: 2000,
  ease: linear(0, '1 25%', 0, 1)
});

waapi.animate('.row:nth-child(3) .square', {
  x: '17rem',
  rotate: 360,
  duration: 2000,
  ease: 'linear(1, 0 25%, 1, 0)'
});
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">linear(0, 0, 0.5, 0.5, 1, 1)</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">linear(0, '1 25%', 0, 1)</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">'linear(1, 0 25%, 1, 0)'</div>
</div>
```

---

## Spring

Docs: https://animejs.com/documentation/easings/spring · Since 3.0.0

A spring curve generator that returns an easing function with its corresponding duration to create physics-based animations.

The `spring()` method can be passed directly to the `ease` parameter of the `animate()` method:

```js
import { animate, spring } from 'animejs';

animate(target, { x: 100, ease: spring({ bounce: .5 }) });
```

> The animation's `duration` parameter is overridden by the spring's calculated settling duration.


### Perceived parameters

These parameters provide more intuitive and predictable controls over the generated curve, focusing on the visual *feel* rather than the underlying physics
 When using perceived parameters, the physics values are calculated automatically using Apple's SwiftUI spring model.

```js
animate(target, { x: 100, ease: spring({ bounce: .5, duration: 350 }) });
```

| Name | Type | Info |
|---|---|---|
| `bounce` | `Number` | Controls the "bounciness" of the animation. Range: `-1` to `1`. Default: `0.5`. Values from `0` to `1` create bouncy curves, values below `0` create over-damped curves. It's recommended to keep the `bounce` values between `-.5` and `.5`, otherwise values outside this range will create very extreme curves and won't play well with the `duration` parameter. |
| `duration` | `Number` | The perceived duration in milliseconds, when the animation *feels* complete visually. Range: `10` to `10000`. Default: `628`. |


### Physics parameters

Direct control over the underlying spring physics model. Use these when you need more precise control over the physics simulation.

```js
animate(target, { x: 100, ease: spring({ stiffness: 95, damping: 13 }) });
```

| Name | Type | Info |
|---|---|---|
| `mass` | `Number` | Mass of the object attached to the spring. Range: `1` to `10000`. Default: `1`. Higher values create more inertia, resulting in slower, heavier motion. |
| `stiffness` | `Number` | Spring stiffness coefficient. Range: `0` to `10000`. Default: `100`. Higher values create a tighter spring that responds more quickly and aggressively. |
| `damping` | `Number` | Damping coefficient that opposes motion. Range: `0` to `10000`. Default: `10`. Controls how quickly oscillations decay. Higher values reduce bounce. |
| `velocity` | `Number` | Initial velocity of the animation. Range: `-10000` to `10000`. Default: `0`. Positive values give the animation a "running start" in the target direction. |


### PerceivedonCompletecallback

> This only works with the JS version of `animate()`.

Animation's `onComplete` callback is called relative to the spring settling duration, which creates a visual disconnect between the moment the animation feels complete and the actual callback call.
 To solve this, a separate `onComplete` callback can be defined on the spring parameter object and will be called when the spring perceived `duration` is reached.

```js
animate(target, {
  x: 100,
  onCompete: () => console.log('called when the setting duration is reached'),
  ease: spring({ 
    bounce: .25,
    duration: 350,
    onCompete: () => console.log('called when the spring perceived duration is reached'),
  })
});
```

| Name | Type | Info |
|---|---|---|
| `onComplete` | `Function` | Callback triggered when the spring reaches its perceived duration (not the settling duration). This fires when the animation *appears* complete to viewers. |


### Examples

| Name | Editor link |
|---|---|
| Default spring | Open in editor |
| Snappy spring | Open in editor |
| Bouncy spring | Open in editor |
| Strong spring | Open in editor |

Example (javascript):

```javascript
import { animate, spring, utils } from 'animejs';

const [ $square1, $square2, $square3 ] = utils.$('.square');

utils.set('.square', { color: 'var(--hex-red-1)' })

animate($square1, {
  x: '17rem',
  rotate: 360,
  onComplete: () => utils.set($square1, { color: 'var(--hex-green-1)' }),
  ease: spring({
    bounce: .15,
    duration: 500,
    onComplete: () => utils.set($square1, { color: 'var(--hex-yellow-1)' }),
  })
});

animate($square2, {
  x: '17rem',
  rotate: 360,
  onComplete: () => utils.set($square2, { color: 'var(--hex-green-1)' }),
  ease: spring({
    bounce: .3,
    duration: 500,
    onComplete: () => utils.set($square2, { color: 'var(--hex-yellow-1)' }),
  })
});

animate($square3, {
  x: '17rem',
  rotate: 360,
  onComplete: () => utils.set($square3, { color: 'var(--hex-green-1)' }),
  ease: spring({
    stiffness: 90,
    damping: 14,
    onComplete: () => utils.set($square3, { color: 'var(--hex-yellow-1)' }),
  })
});
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">{ bounce: .15, duration: 500 }</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">{ bounce: .3, duration: 500 }</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">{ stiffness: 90, damping: 14 }</div>
</div>
```

---

## Steps easing

Docs: https://animejs.com/documentation/easings/steps-easing · Since 3.0.0

A steps easing creates a stepped animation that jumps between values at discrete intervals.


### For JavaScript

The `steps()` function must be imported for the js `animate()`:

```js
import { animate, steps } from 'animejs';

animate(target, { x: 100, ease: steps(5) });
// Or with fromStart
animate(target, { x: 100, ease: steps(5, true) });
```


### For WAAPI

The waapi `animate()` function uses the browser native steps timing function:

```js
import { waapi } from 'animejs';

waapi.animate(target, { x: 100, ease: 'steps(5)' });
// Or with jump-start
waapi.animate(target, { x: 100, ease: 'steps(5, start)' });
```


### Parameters

The steps function takes up to 2 parameters `steps(n, fromStart)`:

| Name | Type | Info |
|---|---|---|
| steps | `Number` | Represents the number of equal steps to divide the animation into. Must be a positive integer. |
| fromStart (opt) | `Boolean` | When `true`, the change happens at the start of each step. When `false`, the change happens at the end of each step (default: `false`). |


### Examples

| Name | Editor link |
|---|---|
| Steps start easing | Open in editor |
| Steps end easing | Open in editor |

Example (javascript):

```javascript
import { animate, waapi, cubicBezier } from 'animejs';

animate('.row:nth-child(1) .square', {
  x: '17rem',
  rotate: 360,
  ease: steps(4)
});

animate('.row:nth-child(2) .square', {
  x: '17rem',
  rotate: 360,
  ease: steps(4, true)
});

waapi.animate('.row:nth-child(3) .square', {
  x: '17rem',
  rotate: 360,
  ease: 'steps(8, end)'
});
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">steps(4)</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">steps(4, true)</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">'steps(8, end)'</div>
</div>
```

---

