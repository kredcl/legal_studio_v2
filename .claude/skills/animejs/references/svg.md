# Anime.js v4 · Svg

Source: official documentation at https://animejs.com/documentation (MIT-licensed library by Julian Garnier).

## SVG

Docs: https://animejs.com/documentation/svg

### A collection of utility functions to help with SVG morphing, line drawing and motion path animations.

All SVG functions are available on the `svg` object imported from the main `'animejs'` module:

```js
import { svg } from 'animejs';

svg.morphTo();
svg.createMotionPath();
svg.createDrawable();
```

Or imported directly from the main `'animejs'` module:

```js
import { morphTo, createMotionPath, createDrawable } from 'animejs';
```

Or imported as a standalone module from the `'animejs/svg'` subpath:

```js
import { morphTo, createMotionPath, createDrawable } from 'animejs/svg';
```

---

## createDrawable

Docs: https://animejs.com/documentation/svg/createdrawable · Since 4.0.0

Creates a `Proxy` of an `SVGElement` exposing an extra `draw` property that defines how much of the line is visible / drawn.

```js
const [ drawable ] = svg.createDrawable(target);
```


### Parameters

| Name | Accepts |
|---|---|
| target | CSS selector \| `SVGLineElement` \| `SVGPathElement` \| `SVGPolylineElement` \| `SVGPolylineElement` \| `SVGRectElement` |


### Returns

An `Array` of `Proxy` `SVGElement`

The added `draw` property accepts a `String` containing a `start` and `end` values separated by an empty space to define how much of the line is drawn.

```js
const [ drawable ] = svg.createDrawable(target);

                            0                     1
drawable.draw = '0 1';      |[———————————————————]|

                            0         .5
drawable.draw = '0 .5';     |[—————————]          |

                                 .25       .75
drawable.draw = '.25 .75';  |     [—————————]     |

                                      .5          1
drawable.draw = '.5 1';     |          [—————————]|

                                                1 1
drawable.draw = '1 1';      |                   []|
```

> Animating an element with the `vector-effect` attribute/styles set to `non-scaling-stroke` can be slow since the scale factor value for the path must be recalculated on every tick in order to handle changes in the size of the SVG.

Example (javascript):

```javascript
import { animate, svg, stagger } from 'animejs';

animate(svg.createDrawable('.line'), {
  draw: ['0 0', '0 1', '1 1'],
  ease: 'inOutQuad',
  duration: 2000,
  delay: stagger(100),
  loop: true
});
```

Example (html):

```html
<svg viewBox="0 0 304 112">
  <g stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
    <path class="line" d="M59 90V56.136C58.66 46.48 51.225 39 42 39c-9.389 0-17 7.611-17 17s7.611 17 17 17h8.5v17H42C23.222 90 8 74.778 8 56s15.222-34 34-34c18.61 0 33.433 14.994 34 33.875V90H59z"/>
    <polyline class="line" points="59 22.035 59 90 76 90 76 22 59 22"/>
    <path class="line" d="M59 90V55.74C59.567 36.993 74.39 22 93 22c18.778 0 34 15.222 34 34v34h-17V56c0-9.389-7.611-17-17-17-9.225 0-16.66 7.48-17 17.136V90H59z"/>
    <polyline class="line" points="127 22.055 127 90 144 90 144 22 127 22"/>
    <path class="line" d="M127 90V55.74C127.567 36.993 142.39 22 161 22c18.778 0 34 15.222 34 34v34h-17V56c0-9.389-7.611-17-17-17-9.225 0-16.66 7.48-17 17.136V90h-17z"/>
    <path class="line" d="M118.5 22a8.5 8.5 0 1 1-8.477 9.067v-1.134c.283-4.42 3.966-7.933 8.477-7.933z"/>
    <path class="line" d="M144 73c-9.389 0-17-7.611-17-17v-8.5h-17V56c0 18.778 15.222 34 34 34V73z"/>
    <path class="line" d="M178 90V55.74C178.567 36.993 193.39 22 212 22c18.778 0 34 15.222 34 34v34h-17V56c0-9.389-7.611-17-17-17-9.225 0-16.66 7.48-17 17.136V90h-17z"/>
    <path class="line" d="M263 73c-9.389 0-17-7.611-17-17s7.611-17 17-17c9.18 0 16.58 7.4 17 17h-17v17h34V55.875C296.433 36.994 281.61 22 263 22c-18.778 0-34 15.222-34 34s15.222 34 34 34V73z"/>
    <path class="line" d="M288.477 73A8.5 8.5 0 1 1 280 82.067v-1.134c.295-4.42 3.967-7.933 8.477-7.933z"/>
  </g>
</svg>
```

---

## createMotionPath

Docs: https://animejs.com/documentation/svg/createmotionpath · Since 4.0.0

Creates pre-defined Tween parameter objects that animate along an SVGPathElement's coordinates and inclination.

```js
const { translateX, translateY, rotate } = svg.createMotionPath(path, offset);
```


### Parameters

| Name | Type |
|---|---|
| path | CSS selector \| `SVGPathElement` |
| offset=0 (opt) | A `Number` between `0` and `1` |


### Returns

An `Object` with the following properties:

| Name | Type | Description |
|---|---|---|
| translateX | Tween parameter | Map to the x coordinate of the path element |
| translateY | Tween parameter | Map to the y coordinate of the path element |
| rotate | Tween parameter | Map to the angle of the path element |

Example (javascript):

```javascript
import { animate, svg } from 'animejs';

// Animate the transforms properties of .car the motion path values
const carAnimation = animate('.car', {
  ease: 'linear',
  duration: 5000,
  loop: true,
  ...svg.createMotionPath('path')
});

// Line drawing animation following the motion path values
// For demo aesthetic only
animate(svg.createDrawable('path'), {
  draw: '0 1',
  ease: 'linear',
  duration: 5000,
  loop: true,
});
```

Example (html):

```html
<svg viewBox="0 0 304 112">
  <title>Suzuka</title>
  <g stroke="none" fill="none" fill-rule="evenodd">
    <path d="M189.142857,4 C227.456875,4 248.420457,4.00974888 256.864191,4.00974888 C263.817211,4.00974888 271.61219,3.69583517 274.986231,6.63061513 C276.382736,7.84531176 279.193529,11.3814152 280.479499,13.4815847 C281.719344,15.5064248 284.841964,20.3571626 275.608629,20.3571626 C265.817756,20.3571626 247.262478,19.9013915 243.955117,19.9013915 C239.27946,19.9013915 235.350655,24.7304885 228.6344,24.7304885 C224.377263,24.7304885 219.472178,21.0304113 214.535324,21.0304113 C207.18393,21.0304113 200.882842,30.4798911 194.124187,30.4798911 C186.992968,30.4798911 182.652552,23.6245972 173.457298,23.6245972 C164.83277,23.6245972 157.191045,31.5424105 157.191045,39.1815359 C157.191045,48.466779 167.088672,63.6623005 166.666679,66.9065088 C166.378668,69.1206889 155.842137,79.2568633 151.508744,77.8570506 C145.044576,75.7689355 109.126667,61.6405346 98.7556561,52.9785141 C96.4766876,51.0750861 89.3680347,39.5769094 83.4195005,38.5221785 C80.6048001,38.0231057 73.0179337,38.7426555 74.4158694,42.6956376 C76.7088819,49.1796531 86.3280337,64.1214904 87.1781062,66.9065088 C88.191957,70.2280995 86.4690152,77.0567847 82.2060607,79.2503488 C79.2489435,80.7719756 73.1324132,82.8858479 64.7015706,83.0708761 C55.1604808,83.2802705 44.4254811,80.401884 39.1722168,80.401884 C25.7762119,80.401884 24.3280517,89.1260466 22.476679,94.4501705 C21.637667,96.8629767 20.4337535,108 33.2301959,108 C37.8976087,108 45.0757044,107.252595 53.4789069,103.876424 C61.8821095,100.500252 122.090049,78.119656 128.36127,75.3523302 C141.413669,69.5926477 151.190142,68.4987755 147.018529,52.0784879 C143.007818,36.291544 143.396957,23.4057975 145.221196,19.6589263 C146.450194,17.1346449 148.420955,14.8552817 153.206723,15.7880203 C155.175319,16.1716965 155.097637,15.0525421 156.757598,11.3860986 C158.417558,7.71965506 161.842736,4.00974888 167.736963,4.00974888 C177.205308,4.00974888 184.938832,4 189.142857,4 Z" id="suzuka" stroke="currentColor" stroke-width="2"></path>
  </g>
</svg>
<div class="square car motion-path-car" style="transform: translateX(189px) translateY(4px);"></div>
```

---

## morphTo

Docs: https://animejs.com/documentation/svg/morphto · Since 4.0.0

Creates a morphing animation from one SVG shape to another by passing the `d` property of a `SVGPathElement` or to the `points` property of a `SVGPolylineElement` or a `SVGPolygonElement` to `svg.morphTo()`.

An optional `precision` parameter can be set to configure the amount of points generated to morph between the two shapes.
 If the precision parameter is set `0`, no point extrapolation takes place.

```js
svg.morphTo(shapeTarget, precision);
```


### Parameters

| Name | Accepts |
|---|---|
| shapeTarget | CSS selector \| `SVGPathElement` \| `SVGPolylineElement` \| `SVGPolygonElement` |
| precision=.33 (opt) | A `Number` between `0` and `1` |


### Returns

An `Array` containing the shape's starting and final `String` values

Example (javascript):

```javascript
import { animate, svg, utils } from 'animejs';

const [ $path1, $path2 ] = utils.$('polygon');

function animateRandomPoints() {
  // Update the points attribute on #path-2
  utils.set($path2, { points: generatePoints() });
  // Morph the points of #path-1 into #path-2
  animate($path1, {
    points: svg.morphTo($path2),
    ease: 'inOutCirc',
    duration: 500,
    onComplete: animateRandomPoints
  });
}

// Start the animation
animateRandomPoints();

// A function to generate random points on #path-2 on each iteration
// For demo purpose only
function generatePoints() {
  const total = utils.random(4, 64);
  const r1 = utils.random(4, 56);
  const r2 = 56;
  const isOdd = n => n % 2;
  let points = '';
  for (let i = 0, l = isOdd(total) ? total + 1 : total; i < l; i++) {
    const r = isOdd(i) ? r1 : r2;
    const a = (2 * Math.PI * i / l) - Math.PI / 2;
    const x = 152 + utils.round(r * Math.cos(a), 0);
    const y = 56 + utils.round(r * Math.sin(a), 0);
    points += `${x},${y} `;
  }
  return points;
}
```

Example (html):

```html
<svg viewBox="0 0 304 112">
  <g stroke-width="2" stroke="currentColor" stroke-linejoin="round" fill="none" fill-rule="evenodd">
    <polygon id="path-1" points="152,4 170,38 204,56 170,74 152,108 134,74 100,56 134,38"></polygon>
    <polygon style="opacity: 0" id="path-2" points="152,4 170,38 204,56 170,74 152,108 134,74 100,56 134,38"></polygon>
  </g>
</svg>
```

---

