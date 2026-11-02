# Anime.js v4 · Draggable

Source: official documentation at https://animejs.com/documentation (MIT-licensed library by Julian Garnier).

## Draggable

Docs: https://animejs.com/documentation/draggable

### Adds draggable capabilities to DOM Elements.

Draggables are created using the `createDraggable()` method imported from the main `'animejs'` module:

```js
import { createDraggable } from 'animejs';

const draggable = createDraggable(target, parameters);
```

Or imported as a standalone module from the `'animejs/draggable'` subpath:

```js
import { createDraggable } from 'animejs/draggable';
```


### Parameters

| Name | Accepts |
|---|---|
| target | CSS Selector \| DOM Element |
| parameters (opt) | An `Object` of Draggable axes parameters, Draggable settings and Draggable callbacks |


### Returns

`Draggable`

Example (javascript):

```javascript
import { createDraggable } from 'animejs';

createDraggable('.square');
```

Example (html):

```html
<div class="large row centered">
  <div class="square draggable"></div>
</div>
```

---

## Draggable axes parameters

Docs: https://animejs.com/documentation/draggable/draggable-axes-parameters · Since 4.0.0

Axes parameters are specified globally to all axes on the parameters object, or specifically to an axis by passing it an object.

```js
createDraggable('.square', {
┌───────────────────────────────┐
│ x: { snap: 100 },             │
│ y: { snap: 50 },              ├─ Axes Parameters
│ modifier: utils.wrap(-200, 0),│
└───────────────────────────────┘
  containerPadding: 10,
  releaseStiffness: 40,
  releaseEase: 'out(3)',
  onGrab: () => {},
  onDrag: () => {},
  onRelease: () => {},
});
```

---

## mapTo

Docs: https://animejs.com/documentation/draggable/draggable-axes-parameters/mapto · Since 4.0.0

Maps the axis value to a different property of the element.


### Accepts

`String`


### Default

`null`

Example (javascript):

```javascript
import { createDraggable, utils } from 'animejs';

utils.set('.square', { z: 100 });

createDraggable('.square', {
  x: { mapTo: 'rotateY' },
  y: { mapTo: 'z' },
});
```

Example (html):

```html
<div class="large grid centered perspective square-grid">
  <div class="square draggable"></div>
</div>
```

---

## modifier

Docs: https://animejs.com/documentation/draggable/draggable-axes-parameters/modifier · Since 4.0.0

Defines a Modifier function that alter of modify the value of either both axes or one specific axis.


### Accepts

Modifier function


### Default

`noop`

Example (javascript):

```javascript
import { createDraggable, utils } from 'animejs';

createDraggable('.square', {
  modifier: utils.wrap(-32, 32), // Global to both x and y
  x: { modifier: utils.wrap(-128, 128) }, // Specific to x 
});
```

Example (html):

```html
<div class="large grid centered square-grid">
  <div class="square draggable"></div>
</div>
```

---

## snap

Docs: https://animejs.com/documentation/draggable/draggable-axes-parameters/snap · Since 4.0.0

Rounds the final value of either both axes or one specific axis to the nearest specified increment.
 If an `Array` is provided as the increment, it selects the closest value from the array.


### Accepts

- `Number`
- `Array<Number>`
- A `Function` that returns any if the above

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.
 It can also be refreshed manually using the `refresh()` method.


### Default

`0`

Example (javascript):

```javascript
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  snap: 56, // Global to both x and y
  x: { snap: [0, 200] }, // Specific to x 
});
```

Example (html):

```html
<div class="large grid square-grid">
  <div class="square draggable"></div>
</div>
```

---

## x

Docs: https://animejs.com/documentation/draggable/draggable-axes-parameters/x · Since 4.0.0

Defines the behaviour of the x-axis by either passing an object of parameters or disabling it by setting the value to `false`.


### Accepts

- `Boolean`
- Draggable axes parameters `Object`


### Default

`true`

Example (javascript):

```javascript
import { createDraggable } from 'animejs';

createDraggable('.square.enabled', {
  x: true
});

createDraggable('.square.disabled', {
  x: false
});
```

Example (html):

```html
<div class="large spaced-evenly row">
  <div class="square enabled draggable"></div>
  <div class="square disabled draggable"></div>
</div>
<div class="large spaced-evenly row">
  <div class="label">x enabled</div>
  <div class="label">x disabled</div>
</div>
```

---

## y

Docs: https://animejs.com/documentation/draggable/draggable-axes-parameters/y · Since 4.0.0

Defines the behaviour of the y-axis by either passing an object of parameters or disabling it by setting the value to `false`.


### Accepts

- `Boolean`
- Draggable axes parameters `Object`


### Default

`true`

Example (javascript):

```javascript
import { createDraggable } from 'animejs';

createDraggable('.square.enabled', {
  y: true
});

createDraggable('.square.disabled', {
  y: false
});
```

Example (html):

```html
<div class="large spaced-evenly row">
  <div class="square enabled draggable"></div>
  <div class="square disabled draggable"></div>
</div>
<div class="large spaced-evenly row">
  <div class="label">y enabled</div>
  <div class="label">y disabled</div>
</div>
```

---

## Draggable callbacks

Docs: https://animejs.com/documentation/draggable/draggable-callbacks · Since 4.0.0

Execute functions at specific points while dragging an element.
 Draggable callback functions are specified directly in the `createDraggable()` parameters `Object`.

```js
createDraggable('.square', {
  x: { snap: 100 },
  y: { snap: 50 },
  modifier: utils.wrap(-200, 0),
  containerPadding: 10,
  containerStiffness: 40,
  containerEase: 'out(3)',
┌────────────────────────┐
│ onGrab: () => {},      │
│ onDrag: () => {},      ├─ Callbaks
│ onRelease: () => {},   │
└────────────────────────┘
});
```

---

## onAfterResize

Docs: https://animejs.com/documentation/draggable/draggable-callbacks/onafterresize · Since 4.0.0

Executes a function after either the container or the dragged target sizes change and the draggable values have been updated.
 This can be used to update the position of the dragged element if the container size has changed.


### Accepts

A `Function` whose first argument is the draggable itself


### Default

`noop`

Example (javascript):

```javascript
import { createDraggable, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let resizes = 0;

const draggable = createDraggable('.square', {
  container: '.grid',
  onAfterResize: self => {
    $value.textContent = ++resizes;
    self.animateInView(1000, 30);
  }
});
```

Example (html):

```html
<div class="iframe-content resizable">
  <div class="large padded grid square-grid">
    <pre class="large log row">
      <span class="label">resizes</span>
      <span class="value">0</span>
    </pre>
    <div class="square draggable"></div>
  </div>
</div>
```

---

## onDrag

Docs: https://animejs.com/documentation/draggable/draggable-callbacks/ondrag · Since 4.0.0

Executes a function when the element is being dragged.


### Accepts

A `Function` whose first argument is the draggable itself


### Default

`noop`

Example (javascript):

```javascript
import { createDraggable, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let drags = 0;

createDraggable('.square', {
  container: '.grid',
  onDrag: () => $value.textContent = ++drags
});
```

Example (html):

```html
<div class="large padded grid square-grid">
  <pre class="large log row">
    <span class="label">drags</span>
    <span class="value">0</span>
  </pre>
  <div class="square draggable"></div>
</div>
```

---

## onGrab

Docs: https://animejs.com/documentation/draggable/draggable-callbacks/ongrab · Since 4.0.0

Executes a function when the element is grabbed.


### Accepts

A `Function` whose first argument is the draggable itself


### Default

`noop`

Example (javascript):

```javascript
import { createDraggable, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let grabs = 0;

createDraggable('.square', {
  container: '.grid',
  onGrab: () => $value.textContent = ++grabs
});
```

Example (html):

```html
<div class="large padded grid square-grid">
  <pre class="large log row">
    <span class="label">grabs</span>
    <span class="value">0</span>
  </pre>
  <div class="square draggable"></div>
</div>
```

---

## onRelease

Docs: https://animejs.com/documentation/draggable/draggable-callbacks/onrelease · Since 4.0.0

Executes a function when the element is released after a grab.


### Accepts

A `Function` whose first argument is the draggable itself


### Default

`noop`

Example (javascript):

```javascript
import { createDraggable, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let releases = 0;

createDraggable('.square', {
  container: '.grid',
  onRelease: () => $value.textContent = ++releases
});
```

Example (html):

```html
<div class="large padded grid square-grid">
  <pre class="large log row">
    <span class="label">releases</span>
    <span class="value">0</span>
  </pre>
  <div class="square draggable"></div>
</div>
```

---

## onResize

Docs: https://animejs.com/documentation/draggable/draggable-callbacks/onresize · Since 4.0.0

Executes a function when either the container or the dragged target sizes change.


### Accepts

A `Function` whose first argument is the draggable itself


### Default

`noop`

Example (javascript):

```javascript
import { createDraggable, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let resizes = 0;

createDraggable('.square', {
  container: '.grid',
  onResize: self => {
    $value.textContent = ++resizes;
  }
});
```

Example (html):

```html
<div class="iframe-content resizable">
  <div class="large padded grid square-grid">
    <pre class="large log row">
      <span class="label">resizes</span>
      <span class="value">0</span>
    </pre>
    <div class="square draggable"></div>
  </div>
</div>
```

---

## onSettle

Docs: https://animejs.com/documentation/draggable/draggable-callbacks/onsettle · Since 4.0.0

Executes a function when the dragged target has completely stopped moving when released after a grab.


### Accepts

A `Function` whose first argument is the draggable itself


### Default

`noop`

Example (javascript):

```javascript
import { createDraggable, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let stops = 0;

createDraggable('.square', {
  container: '.grid',
  onSettle: () => $value.textContent = ++stops
});
```

Example (html):

```html
<div class="large padded grid square-grid">
  <pre class="large log row">
    <span class="label">stops</span>
    <span class="value">0</span>
  </pre>
  <div class="square draggable"></div>
</div>
```

---

## onSnap

Docs: https://animejs.com/documentation/draggable/draggable-callbacks/onsnap · Since 4.0.0

Executes a function every time a snap occurs when the element is being dragged.


### Accepts

A `Function` whose first argument is the draggable itself


### Default

`noop`

Example (javascript):

```javascript
import { createDraggable, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let snaps = 0;

createDraggable('.square', {
  container: '.grid',
  snap: 16,
  modifier: utils.snap(16), // also snap the element while draggin
  onSnap: () => $value.textContent = ++snaps
});
```

Example (html):

```html
<div class="large padded grid square-grid">
  <pre class="large log row">
    <span class="label">snaps</span>
    <span class="value">0</span>
  </pre>
  <div class="square draggable"></div>
</div>
```

---

## onUpdate

Docs: https://animejs.com/documentation/draggable/draggable-callbacks/onupdate · Since 4.0.0

Executes a function every time the position of the dragged element changes.


### Accepts

A `Function` whose first argument is the draggable itself


### Default

`noop`

Example (javascript):

```javascript
import { createDraggable, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let updates = 0;

createDraggable('.square', {
  container: '.grid',
  onUpdate: () => $value.textContent = ++updates
});
```

Example (html):

```html
<div class="large padded grid square-grid">
  <pre class="large log row">
    <span class="label">updates</span>
    <span class="value">0</span>
  </pre>
  <div class="square draggable"></div>
</div>
```

---

## Draggable methods

Docs: https://animejs.com/documentation/draggable/draggable-methods · Since 4.0.0

Methods available on the `Draggable` instance returned by a `createDraggable()` function.

```js
const draggable = createDraggable(target, parameters);
          ┌──────────┐
draggable.│disable() │
draggable.│enable()  ├─ Methods
draggable.│revert()  │
          └──────────┘
```

---

## animateInView()

Docs: https://animejs.com/documentation/draggable/draggable-methods/animateinview · Since 4.0.0

Animate the draggable inside the viewport if positioned outside of the container.


### Parameters

| Name | Type | Description |
|---|---|---|
| duration(opt) | `Number` | The duration of the animation (default `350`) |
| gap(opt) | `Boolean` | How much extra distance from the edges of the container the draggable should be animated to |
| ease(opt) | `ease` | The easing function applied to the animation (default `InOutQuad` |


### Returns

The draggable itself

Example (javascript):

```javascript
import { createDraggable, utils } from 'animejs';

const [ $animateInView ] = utils.$('.animate-button');

const draggable = createDraggable('.square', {
  container: '.grid',
});

const animateInView = () => {
  draggable.animateInView(400, 16);
}

// Set the draggable position outside the container
draggable.x = -24;
draggable.y = 72;

$animateInView.addEventListener('click', animateInView);
```

Example (html):

```html
<div class="medium padded show-bounds grid square-grid animate-in-view">
  <div class="square draggable"></div>
</div>
<div class="large row">
  <fieldset class="controls">
    <button class="button animate-button">Animate in view</button>
  </fieldset>
</div>
```

---

## disable()

Docs: https://animejs.com/documentation/draggable/draggable-methods/disable · Since 4.0.0

Deactivates the draggable, rendering it inert.


### Returns

The draggable itself

Example (javascript):

```javascript
import { createDraggable, utils } from 'animejs';

const [ $disableButton ] = utils.$('.disable');

const draggable = createDraggable('.square');

const disableDraggable = () => draggable.disable();

$disableButton.addEventListener('click', disableDraggable);
```

Example (html):

```html
<div class="large centered row">
  <div class="square draggable"></div>
</div>
<div class="large row">
  <fieldset class="controls">
    <button class="button disable">Disable</button>
  </fieldset>
</div>
```

---

## enable()

Docs: https://animejs.com/documentation/draggable/draggable-methods/enable · Since 4.0.0

Reactivates a previously disabled draggable, making it interactive again.


### Returns

The draggable itself

Example (javascript):

```javascript
import { createDraggable, utils } from 'animejs';

const [ $enableButton ] = utils.$('.enable');

const draggable = createDraggable('.square');

draggable.disable();

const enableDraggable = () => draggable.enable();

$enableButton.addEventListener('click', enableDraggable);
```

Example (html):

```html
<div class="large centered row">
  <div class="square draggable"></div>
</div>
<div class="large row">
  <fieldset class="controls">
    <button class="button enable">Enable</button>
  </fieldset>
</div>
```

---

## refresh()

Docs: https://animejs.com/documentation/draggable/draggable-methods/refresh · Since 4.0.0

Re-compute every parameter defined using a function and re-calculate all internal values.


### Refreshable parameters

- `snap`
- `container`
- `containerPadding`
- `containerFriction`
- `dragSpeed`
- `scrollSpeed`
- `scrollThreshold`
- `minVelocity`
- `maxVelocity`
- `velocityMultiplier`


### Returns

The draggable itself

Example (javascript):

```javascript
import { createDraggable, utils } from 'animejs';

const [ $refreshButton ] = utils.$('.refresh');

const draggable = createDraggable('.square', {
  snap: () => utils.random(0, 32, 0),
  dragSpeed: () => utils.random(.5, 1.5, 1),
});

const refreshDraggable = () => draggable.refresh();

$refreshButton.addEventListener('click', refreshDraggable);
```

Example (html):

```html
<div class="large centered row">
  <div class="square draggable"></div>
</div>
<div class="large row">
  <fieldset class="controls">
    <button class="button refresh">Refresh</button>
  </fieldset>
</div>
```

---

## reset()

Docs: https://animejs.com/documentation/draggable/draggable-methods/reset · Since 4.0.0

Restores the draggable element to its initial position.


### Returns

The draggable itself

Example (javascript):

```javascript
import { createDraggable, utils } from 'animejs';

const [ $resetButton ] = utils.$('.reset');

const draggable = createDraggable('.square');

const resetDraggable = () => draggable.reset();

$resetButton.addEventListener('click', resetDraggable);
```

Example (html):

```html
<div class="large centered row">
  <div class="square draggable"></div>
</div>
<div class="large row">
  <fieldset class="controls">
    <button class="button reset">Reset</button>
  </fieldset>
</div>
```

---

## revert()

Docs: https://animejs.com/documentation/draggable/draggable-methods/revert · Since 4.0.0

Restores the draggable element to its initial state and deactivates it.


### Returns

The draggable itself

Example (javascript):

```javascript
import { createDraggable, utils } from 'animejs';

const [ $revertButton ] = utils.$('.revert');

const draggable = createDraggable('.square');

function revertDraggable() {
  draggable.revert();
  $revertButton.disabled = true;
}

$revertButton.addEventListener('click', revertDraggable);
```

Example (html):

```html
<div class="large centered row">
  <div class="square draggable"></div>
</div>
<div class="large row">
  <fieldset class="controls">
    <button class="button revert">Revert</button>
  </fieldset>
</div>
```

---

## scrollInView()

Docs: https://animejs.com/documentation/draggable/draggable-methods/scrollinview · Since 4.0.0

Animate the scroll position of the container if the draggable position is outside of the scroll threshold.


### Parameters

| Name | Type | Description |
|---|---|---|
| duration(opt) | `Number` | The duration of the animation (default `350`) |
| gap(opt) | `Boolean` | How much extra distance from the edges of the container the draggable should be animated to |
| ease(opt) | `ease` | The easing function applied to the animation (default `InOutQuad` |


### Returns

The draggable itself

Example (javascript):

```javascript
import { createDraggable, utils } from 'animejs';

const [ $scrollInView ] = utils.$('.button');

const draggable = createDraggable('.square', {
  container: '.scroll-container',
});

const scrollInView = () => {
  draggable.scrollInView(400, 100);
}

// Set the draggable position outside the scroll viewport
draggable.x = 120;
draggable.y = 200;

$scrollInView.addEventListener('click', scrollInView);
```

Example (html):

```html
<div class="full-container scroll-container scroll-x scroll-y">
  <div class="scroll-content">
    <div class="large padded grid square-grid">
      <div class="square draggable"></div>
    </div>
  </div>
</div>
<fieldset class="absolute controls">
  <button class="button">Scroll in view</button>
</fieldset>
```

---

## setX()

Docs: https://animejs.com/documentation/draggable/draggable-methods/setx · Since 4.0.0

Manually set the `x` position of the draggable target.
 Is equivalent updating `draggable.x` directly when no `muteCallback` parameter is defined.


### Parameters

| Name | Type | Description |
|---|---|---|
| x | `Number` | The new x value |
| muteCallback(opt) | `Boolean` | If `true`, prevents the `onUpdate` callback to fire (default `false`) |


### Returns

The draggable itself

Example (javascript):

```javascript
import { createDraggable, utils } from 'animejs';

const [ $setButton ] = utils.$('.set');

const draggable = createDraggable('.square');

const setRandomX = () => draggable.setX(utils.random(-100, 100));

$setButton.addEventListener('click', setRandomX);
```

Example (html):

```html
<div class="large centered row">
  <div class="square draggable"></div>
</div>
<div class="large row">
  <fieldset class="controls">
    <button class="button set">Set random x</button>
  </fieldset>
</div>
```

---

## setY()

Docs: https://animejs.com/documentation/draggable/draggable-methods/sety · Since 4.0.0

Manually set the `y` position of the draggable target.
 Is equivalent updating `draggable.y` directly when no `muteCallback` parameter is defined.


### Parameters

| Name | Type | Description |
|---|---|---|
| y | `Number` | The new y value |
| muteCallback(opt) | `Boolean` | If `true`, prevents the `onUpdate` callback to fire (default `false`) |


### Returns

The draggable itself

Example (javascript):

```javascript
import { createDraggable, utils } from 'animejs';

const [ $setButton ] = utils.$('.set');

const draggable = createDraggable('.square');

const setRandomY = () => draggable.setY(utils.random(-40, 40));

$setButton.addEventListener('click', setRandomY);
```

Example (html):

```html
<div class="large centered row">
  <div class="square draggable"></div>
</div>
<div class="large row">
  <fieldset class="controls">
    <button class="button set">Set random y</button>
  </fieldset>
</div>
```

---

## stop()

Docs: https://animejs.com/documentation/draggable/draggable-methods/stop · Since 4.0.0

Stop all currently running animations targeting the draggable, the container scroll animation and the draggable release animation.


### Returns

The draggable itself

Example (javascript):

```javascript
import { createDraggable, animate, utils } from 'animejs';

const [ $stopButton ] = utils.$('.stop');

const draggable = createDraggable('.square');

animate(draggable, {
  x: [-100, 100],
  alternate: true,
  loop: true
});

const stopDraggable = () => draggable.stop();

$stopButton.addEventListener('click', stopDraggable);
```

Example (html):

```html
<div class="large centered row">
  <div class="square draggable"></div>
</div>
<div class="large row">
  <fieldset class="controls">
    <button class="button stop">Stop</button>
  </fieldset>
</div>
```

---

## Draggable properties

Docs: https://animejs.com/documentation/draggable/draggable-properties · Since 4.0.0

Properties available on the `Draggable` instance returned by a `createDraggable()` function.

```js
const draggable = createDraggable(target, parameters);
          ┌──────────┐
draggable.│progressX │
draggable.│progressY ├─ Properties
draggable.│velocity  │
          └──────────┘
```

| Name | Description |
|---|---|
| snapX | Gets and sets the snap value of the x axis (`Number\|Array<Number>`) |
| snapY | Gets and sets the snap value of the y axis (`Number\|Array<Number>`) |
| scrollSpeed | Gets and sets the speed value at which the draggable container auto scrolls (`Number`) |
| scrollThreshold | Gets and sets the threshold distance from container edges before auto-scrolling begins (`Number`) |
| dragSpeed | Gets and sets the speed value at which the draggable element gets dragged (`Number`) |
| maxVelocity | Gets and sets the maximum velocity limit for the draggable element (`Number`) |
| minVelocity | Gets and sets the minimum velocity limit for the draggable element (`Number`) |
| velocityMultiplier | Gets and sets the multiplier applied to velocity calculations (`Number`) |
| releaseEase | Gets and sets the easing function applied to the draggable element animations (`Function`) |
| releaseSpring | Gets the internal spring used to move the draggable element after release (`Spring`) |
| containerPadding | Gets and sets padding values for the container [top, right, bottom, left] (`Array<Number>`) |
| containerFriction | Gets and sets the friction value applied within the container (`Number`) |
| containerBounds | Gets the bounds of the container [top, right, bottom, left] (`Array<Number>`) |
| containerArray | Gets array of container elements if multiple containers were provided (`Array<HTMLElement>\|null`) |
| $container | Gets and sets the container element (`HTMLElement`) |
| $target | Gets and sets the target element (`HTMLElement`) |
| $trigger | Gets the trigger element (`HTMLElement`) |
| $scrollContainer | Gets the scroll container (window or container element) (`Window\|HTMLElement`) |
| x | Gets and sets the x position (`Number`) |
| y | Gets and sets the y position of the dragged element (`Number`) |
| progressX | Gets and sets the progress (0-1) of the x position relative to the container (`Number`) |
| progressY | Gets and sets the progress (0-1) of the y position relative to the container (`Number`) |
| velocity | Gets the current velocity of the draggable element (`Number`) |
| angle | Gets the current angle in radians of the draggable element (`Number`) |
| xProp | Gets the mapped x property name (`String`) |
| yProp | Gets the mapped y property name (`String`) |
| destX | Gets the currently defined destination of the x axis (`Number`) |
| destY | Gets the currently defined destination of the y axis (`Number`) |
| deltaX | Gets the current delta of the x axis (`Number`) |
| deltaY | Gets the current delta of the y axis (`Number`) |
| enabled | Returns `true` if the draggable is enabled (`Boolean`) |
| grabbed | Returns `true` if the element is currently being grabbed (`Boolean`) |
| dragged | Returns `true` if the element is currently being dragged (`Boolean`) |
| cursor | Gets and sets cursor behavior (`Boolean\|DraggableCursorParams`) |
| disabled | Gets the disabled state for [x, y] axes (`Array<Number>`) |
| fixed | Returns `true` if the target element has position:fixed (`Boolean`) |
| useWin | Returns `true` if using window as container (`Boolean`) |
| isFinePointer | Gets and sets whether fine pointer (e.g. mouse) is being used (`Boolean`) |
| initialized | Returns `true` if the draggable has been initialized (`Boolean`) |
| canScroll | Returns `true` if auto-scrolling is possible (`Boolean`) |
| contained | Returns `true` if draggable is contained within bounds (`Boolean`) |
| manual | Returns `true` if in manual control mode (`Boolean`) |
| released | Returns `true` if element was just released (`Boolean`) |
| updated | Returns `true` if position was just updated (`Boolean`) |
| scroll | Gets the current scroll position {x, y} (`Object`) |
| coords | Gets the current and previous coordinates [x, y, prevX, prevY] (`Array<Number>`) |
| snapped | Gets the snap state for [x, y] axes (`Array<Number>`) |
| pointer | Gets current and previous pointer positions [x, y, prevX, prevY] (`Array<Number>`) |
| scrollView | Gets the scroll view dimensions [width, height] (`Array<Number>`) |
| dragArea | Gets the drag area bounds [x, y, width, height] (`Array<Number>`) |
| scrollBounds | Gets the scroll container bounds [top, right, bottom, left] (`Array<Number>`) |
| targetBounds | Gets the target element bounds [top, right, bottom, left] (`Array<Number>`) |
| window | Gets the window dimensions [width, height] (`Array<Number>`) |
| pointerVelocity | Gets the current pointer velocity (`Number`) |
| pointerAngle | Gets the current pointer angle in radians (`Number`) |
| activeProp | Gets the active property being animated (`String`) |
| onGrab | Gets and sets the callback fired when element is grabbed (`Function`) |
| onDrag | Gets and sets the callback fired while dragging (`Function`) |
| onRelease | Gets and sets the callback fired on release (`Function`) |
| onUpdate | Gets and sets the callback fired on any position update (`Function`) |
| onSettle | Gets and sets the callback fired when movement settles (`Function`) |
| onSnap | Gets and sets the callback fired when element snaps (`Function`) |
| onResize | Gets and sets the callback fired when container/element resizes (`Function`) |
| onAfterResize | Gets and sets the callback fired after resize handling completes (`Function`) |

---

## Draggable settings

Docs: https://animejs.com/documentation/draggable/draggable-settings · Since 4.0.0

Draggable settings are defined directly in the `createDraggable()` parameters `Object`.

```js
createDraggable('.square', {
  x: { snap: 100 },
  y: { snap: 50 },
  modifier: utils.wrap(-200, 0),
┌───────────────────────┐
│ containerPadding: 10, │
│ releaseStiffness: 40, ├─ Settings
│ releaseEase: 'out(3)',│
└───────────────────────┘
  onGrab: () => {},
  onDrag: () => {},
  onRelease: () => {},
});
```

---

## container

Docs: https://animejs.com/documentation/draggable/draggable-settings/container · Since 4.0.0

Specifies the container of the draggable element, preventing it from being dragged outside of the defined boundaries.


### Accepts

- CSS Selector `String` to target an `HTMLElement`
- `HTMLElement`
- `Array<Number>` (`[top, right, bottom, left]`)
- A `Function` that returns `Array<Number>` (`[top, right, bottom, left]`)

When defined using a `Function`, the value will be automatically refreshed every time the window or target element is resized.
 It can also be refreshed manually using the `refresh()` method.


### Default

`null`

Example (javascript):

```javascript
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
});

createDraggable('.circle', {
  container: [-16, 80, 16, 0],
});
```

Example (html):

```html
<div class="large centered grid square-grid array-container">
  <div class="square draggable"></div>
  <div class="circle draggable"></div>
</div>
```

---

## containerFriction

Docs: https://animejs.com/documentation/draggable/draggable-settings/containerfriction · Since 4.0.0

Specifies the friction applied to the dragged element when going out of bounds, where `0` means no friction at all and `1` prevents the element from going past the container bounds.


### Accepts

- A `Number` greater than or equal to `0` and lower than or equal to `1`
- A `Function` that returns a `Number` greater than or equal to `0` and lower than or equal to `1`

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.
 It can also be refreshed manually using the `refresh()` method.


### Default

`0.8`

Example (javascript):

```javascript
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  containerFriction: 0,
});

createDraggable('.circle', {
  container: '.grid',
  containerFriction: 1,
});
```

Example (html):

```html
<div class="large centered grid square-grid">
  <div class="square draggable"></div>
  <div class="circle draggable"></div>
</div>
```

---

## containerPadding

Docs: https://animejs.com/documentation/draggable/draggable-settings/containerpadding · Since 4.0.0

Specifies the container's padding in pixels.


### Accepts

- `Number`
- `Array<Number>` (`[top, right, bottom, left]`)
- A `Function` that returns `Array<Number>` (`[top, right, bottom, left]`)

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.
 It can also be refreshed manually using the `refresh()` method.


### Default

`0`

Example (javascript):

```javascript
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  containerPadding: [ 16, 32, -16, 64], // top, right, bottom, left
  scrollThreshold: 0,
});
```

Example (html):

```html
<div class="large centered padded show-bounds grid square-grid">
  <div class="square draggable"></div>
</div>
```

---

## cursor

Docs: https://animejs.com/documentation/draggable/draggable-settings/cursor · Since 4.0.0

Specifies custom CSS cursor style properties for the hovered and grabbed states on devices that match the media query `'(pointer:fine)'`.


### Accepts

- `Boolean` (`false` disable custom styling)
- `{ onHover: 'grab', onGrab: 'grabbing' }`
- A `Function` that returns an of the above

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.
 It can also be refreshed manually using the `refresh()` method.


### Default

`{ onHover: 'grab', onGrab: 'grabbing' }`

Example (javascript):

```javascript
import { createDraggable } from 'animejs';

createDraggable('.square', {
  cursor: false
});

createDraggable('.circle', {
  cursor: {
    onHover: 'move',
    onGrab: 'wait'
  }
});
```

Example (html):

```html
<div class="large centered row">
  <div class="square draggable"></div>
  <div class="circle draggable"></div>
</div>
```

---

## dragSpeed

Docs: https://animejs.com/documentation/draggable/draggable-settings/dragspeed · Since 4.0.0

Specifies a value that affects the dragging speed of the element. The higher the value, the faster the element moves. `0` prevents the element from being dragged, and values less than `0` invert the drag movement.


### Accepts

- A `Number`
- A `Function` that returns a `Number`

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.
 It can also be refreshed manually using the `refresh()` method.


### Default

`1`

Example (javascript):

```javascript
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  dragSpeed: 2,
});

createDraggable('.circle', {
  container: '.grid',
  dragSpeed: .5,
});
```

Example (html):

```html
<div class="large centered grid square-grid">
  <div class="square draggable"></div>
  <div class="circle draggable"></div>
</div>
```

---

## dragThreshold

Docs: https://animejs.com/documentation/draggable/draggable-settings/dragthreshold · Since 4.2.1

Specifies the distance in pixels needed to trigger a drag.
 The threshold can be specified differently for mouse our touch devices by using an object.

```js
dragThreshold: 3,

// Or

dragThreshold: { mouse: 3, touch: 7 },
```


### Accepts

- `Number`
- `{ mouse: Number, touch: Number }`
- A `Function` that returns a `Number` or `{ mouse: Number, touch: Number }`

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.
 It can also be refreshed manually using the `refresh()` method.


### Default

`{ mouse: 3, touch: 7 }`

Example (javascript):

```javascript
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  dragThreshold: 20,
});

createDraggable('.circle', {
  container: '.grid',
  dragThreshold: { mouse: 10, touch: 15 },
});
```

Example (html):

```html
<div class="large centered grid square-grid">
  <div class="square draggable"></div>
  <div class="circle draggable"></div>
</div>
```

---

## maxVelocity

Docs: https://animejs.com/documentation/draggable/draggable-settings/maxvelocity · Since 4.0.0

Specifies the maximum velocity to apply to the dragged element after release.


### Accepts

- A `Number` greater than or equal to `0`
- A `Function` that returns a `Number` greater than or equal to `0`

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.
 It can also be refreshed manually using the `refresh()` method.


### Default

`50`

Example (javascript):

```javascript
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  maxVelocity: 0,
});

createDraggable('.circle', {
  container: '.grid',
  maxVelocity: 100,
});
```

Example (html):

```html
<div class="large centered grid square-grid">
  <div class="square draggable"></div>
  <div class="circle draggable"></div>
</div>
```

---

## minVelocity

Docs: https://animejs.com/documentation/draggable/draggable-settings/minvelocity · Since 4.0.0

Specifies the minimum velocity to apply to the dragged element after release.


### Accepts

- A `Number` greater than or equal to `0`
- A `Function` that returns a `Number` greater than or equal to `0`

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.
 It can also be refreshed manually using the `refresh()` method.


### Default

`0`

Example (javascript):

```javascript
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  minVelocity: 0,
});

createDraggable('.circle', {
  container: '.grid',
  minVelocity: 10,
});
```

Example (html):

```html
<div class="large centered grid square-grid">
  <div class="square draggable"></div>
  <div class="circle draggable"></div>
</div>
```

---

## releaseContainerFriction

Docs: https://animejs.com/documentation/draggable/draggable-settings/releasecontainerfriction · Since 4.0.0

Overrides the `containerFriction` applied to the dragged element when threw out of bounds on release, where `0` means no friction at all and `1` prevents the element from going past the container bounds.


### Accepts

- A `Number` greater than or equal to `0` and lower than or equal to `1`
- A `Function` that returns a `Number` greater than or equal to `0` and lower than or equal to `1`

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.
 It can also be refreshed manually using the `refresh()` method.


### Default

The `containerFriction` value

Example (javascript):

```javascript
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  releaseContainerFriction: 0,
});

createDraggable('.circle', {
  container: '.grid',
  releaseContainerFriction: 1,
});
```

Example (html):

```html
<div class="large centered grid square-grid">
  <div class="square draggable"></div>
  <div class="circle draggable"></div>
</div>
```

---

## releaseDamping

Docs: https://animejs.com/documentation/draggable/draggable-settings/releasedamping · Since 4.0.0

Specifies the damping applied to the dragged element after release. Affects the speed, movement distance and bounciness of the dragged element. Lower values increases the bounciness when reaching the bounds of the container.

> `releaseDamping` has no effect if a spring is passed to the releaseEase parameter and is overridden by the spring `damping` value.


### Accepts

A `Number` between `0` and `10000`


### Default

`10`

Example (javascript):

```javascript
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  releaseDamping: 5,
});

createDraggable('.circle', {
  container: '.grid',
  releaseStiffness: 30,
});
```

Example (html):

```html
<div class="large centered grid square-grid">
  <div class="square draggable"></div>
  <div class="circle draggable"></div>
</div>
```

---

## releaseEase

Docs: https://animejs.com/documentation/draggable/draggable-settings/releaseease · Since 4.0.0

Specifies a custom easing applied to the dragged element after release, a snap event, or repositioning when dragged out of bounds.


### Accepts

ease

> Passing `spring()` overrides the draggable `releaseMass`, `releaseStiffness` and `releaseDamping` parameters. The `velocity` parameter of `spring()` has no effect and is replaced with the actual velocity of the dragged element.


### Default

`eases.outQuint`

Example (javascript):

```javascript
import { createDraggable, spring } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  releaseEase: 'outElastic',
});

createDraggable('.circle', {
  container: '.grid',
  releaseEase: spring({
    stiffness: 150,
    damping: 15,
  })
});
```

Example (html):

```html
<div class="large centered grid square-grid">
  <div class="square draggable"></div>
  <div class="circle draggable"></div>
</div>
```

---

## releaseMass

Docs: https://animejs.com/documentation/draggable/draggable-settings/releasemass · Since 4.0.0

Specifies the mass applied to the dragged element after release. Affects the speed, movement distance and bounciness of the dragged element. Lower values result in faster movement.

> `releaseMass` has no effect if a spring is passed to the releaseEase parameter and is overridden by the spring `mass` value.


### Accepts

A `Number` between `0` and `10000`


### Default

`1`

Example (javascript):

```javascript
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  releaseMass: .1,
});

createDraggable('.circle', {
  container: '.grid',
  releaseMass: 10,
});
```

Example (html):

```html
<div class="large centered grid square-grid">
  <div class="square draggable"></div>
  <div class="circle draggable"></div>
</div>
```

---

## releaseStiffness

Docs: https://animejs.com/documentation/draggable/draggable-settings/releasestiffness · Since 4.0.0

Specifies the stiffness applied to the dragged element after release. Affects the speed, movement distance and bounciness of the dragged element. Lower values result in slower movement.

> `releaseStiffness` has no effect if a spring is passed to the releaseEase parameter and is overridden by the spring `stiffness` value.


### Accepts

A `Number` between `0` and `10000`


### Default

`80`

Example (javascript):

```javascript
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  releaseStiffness: 20,
});

createDraggable('.circle', {
  container: '.grid',
  releaseStiffness: 300,
});
```

Example (html):

```html
<div class="large centered grid square-grid">
  <div class="square draggable"></div>
  <div class="circle draggable"></div>
</div>
```

---

## scrollSpeed

Docs: https://animejs.com/documentation/draggable/draggable-settings/scrollspeed · Since 4.0.0

Specifies a value that affects the automatic scrolling speed of the container. The higher the value, the faster the scroll goes and `0` prevents the container from scrolling.


### Accepts

- A `Number`
- A `Function` that returns a `Number`

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.
 It can also be refreshed manually using the `refresh()` method.


### Default

`1.5`

Example (javascript):

```javascript
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.scroll-container',
  scrollSpeed: 2,
});
```

Example (html):

```html
<div class="full-container scroll-container scroll-x scroll-y">
  <div class="scroll-content">
    <div class="large padded grid square-grid">
      <div class="square draggable"></div>
    </div>
  </div>
</div>
```

---

## scrollThreshold

Docs: https://animejs.com/documentation/draggable/draggable-settings/scrollthreshold · Since 4.0.0

Specifies the number of pixels the draggable element must cross beyond the area bounds before the container starts scrolling automatically.


### Accepts

- A `Number`
- A `Function` that returns a `Number`

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.
 It can also be refreshed manually using the `refresh()` method.


### Default

`20`

Example (javascript):

```javascript
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.scroll-container',
  scrollThreshold: 12,
});
```

Example (html):

```html
<div class="full-container scroll-container scroll-x scroll-y">
  <div class="scroll-content">
    <div class="large padded grid square-grid">
      <div class="square draggable"></div>
    </div>
  </div>
</div>
```

---

## trigger

Docs: https://animejs.com/documentation/draggable/draggable-settings/trigger · Since 4.0.0

Specifies a different element than the defined target to trigger the drag animation.


### Accepts

- CSS Selector
- DOM Element

Example (javascript):

```javascript
import { createDraggable } from 'animejs';

createDraggable('.row', {
  trigger: '.circle',
});
```

Example (html):

```html
<div class="large centered row">
  <div class="square"></div>
  <div class="circle draggable"></div>
  <div class="square"></div>
</div>
```

---

## velocityMultiplier

Docs: https://animejs.com/documentation/draggable/draggable-settings/velocitymultiplier · Since 4.0.0

Specifies a multiplier to modify the velocity applied to the dragged element after release, where `0` means no velocity at all, `1` is normal velocity and `2` double the velocity.


### Accepts

- A `Number` greater than or equal to `0`
- A `Function` that returns a `Number` greater than or equal to `0`

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.
 It can also be refreshed manually using the `refresh()` method.


### Default

`1`

Example (javascript):

```javascript
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  velocityMultiplier: 0,
});

createDraggable('.circle', {
  container: '.grid',
  velocityMultiplier: 5,
});
```

Example (html):

```html
<div class="large centered grid square-grid">
  <div class="square draggable"></div>
  <div class="circle draggable"></div>
</div>
```

---

