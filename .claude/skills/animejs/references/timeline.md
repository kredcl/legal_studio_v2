# Anime.js v4 · Timeline

Source: official documentation at https://animejs.com/documentation (MIT-licensed library by Julian Garnier).

## Timeline

Docs: https://animejs.com/documentation/timeline

### Synchronises animations, timers, and callbacks together.

Timelines are created using the `createTimeline()` method imported from the main `'animejs'` module:

```js
import { createTimeline } from 'animejs';

const timeline = createTimeline(parameters);
```

Or imported as a standalone module from the `'animejs/timeline'` subpath:

```js
import { createTimeline } from 'animejs/timeline';
```


### Parameters

| Name | Accepts |
|---|---|
| parameters (opt) | An `Object` of Timeline playback settings and Timeline callbacks |


### Returns

`Timeline`

A `Timeline` instance exposes methods used to add animations, timers, callbacks and labels to it.

```js
timeline.add(target, animationParameters, position);
timeline.add(timerParameters, position);
timeline.sync(timelineB, position);
timeline.call(callbackFunction, position);
timeline.label(labelName, position);
```

Example (javascript):

```javascript
import { createTimeline } from 'animejs';

const tl = createTimeline({ defaults: { duration: 750 } });

tl.label('start')
  .add('.square', { x: '15rem' }, 500)
  .add('.circle', { x: '15rem' }, 'start')
  .add('.triangle', { x: '15rem', rotate: '1turn' }, '<-=500');
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

## Add animations

Docs: https://animejs.com/documentation/timeline/add-animations · Since 2.0.0

Animations can be added to a timeline using the `add()` method or the `sync()` method.


### Animation creation

Creates and adds an animation directly to the timeline with the `add()` method.
 This allows tween value composition with the timeline's existing children.

```js
timeline.add(targets, parameters, position);
```


### Parameters

| Name | Accepts |
|---|---|
| targets | Targets |
| parameters | An `Object` of Animatable properties, Tween parameters, Playback settings and Animation callbacks |
| position (opt) | Time position |


### Animation synchronisation

Synchronises an existing animation with the `sync()` method.
 Tween value composition is handled when the animation is created, and won't affect the timeline's existing children when added.

```js
const animation = animate(target, { x: 100 });

timeline.sync(animation, position);
```


### Parameters

| Name | Accepts |
|---|---|
| animation | Animation |
| position (opt) | Time position |


### Returns

The timeline itself

> Can be chained with other timeline methods.

Example (javascript):

```javascript
import { createTimeline, animate } from 'animejs';

const circleAnimation = animate('.circle', {
  x: '15rem'
});

const tl = createTimeline()
.sync(circleAnimation)
.add('.triangle', {
  x: '15rem',
  rotate: '1turn',
  duration: 500,
  alternate: true,
  loop: 2,
})
.add('.square', {
  x: '15rem',
});
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

## Add timers

Docs: https://animejs.com/documentation/timeline/add-timers · Since 4.0.0

Timers can be added to a timeline using the `add()` method or the `sync()` method.


### Timer creation

Creates and adds a timer directly to the timeline using the `add()` method.

```js
timeline.add(parameters, position);
```


### Parameters

| Name | Accepts |
|---|---|
| parameters | An `Object` of Timer playback settings and Timer callbacks |
| position (opt) | Time position |


### Timer synchronisation

Synchronises an existing timer with the `sync()` method.

```js
timeline.sync(timer, position);
```


### Parameters

| Name | Accepts |
|---|---|
| timer | Timer |
| position (opt) | Time position |


### Returns

The timeline itself

> Can be chained with other timeline methods.

Example (javascript):

```javascript
import { createTimeline, createTimer, utils } from 'animejs';

const [ $timer01, $timer02, $timer03 ] = utils.$('.timer');

const timer1 = createTimer({
  duration: 1500,
  onUpdate: self => $timer01.innerHTML = self.currentTime,
});

const tl = createTimeline()
.sync(timer1)
.add({
  duration: 500,
  onUpdate: self => $timer02.innerHTML = self.currentTime,
})
.add({
  onUpdate: self => $timer03.innerHTML = self.currentTime,
  duration: 1000
});
```

Example (html):

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">timer 01</span>
      <span class="timer value lcd">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">timer 02</span>
      <span class="timer value lcd">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">timer 03</span>
      <span class="timer value lcd">0</span>
    </pre>
  </div>
</div>
```

---

## Call functions

Docs: https://animejs.com/documentation/timeline/call-functions · Since 4.0.0

Functions are added to a timeline with the `call()` method.

```js
timeline.call(callback, position);
```


### Parameters

| Name | Accepts |
|---|---|
| callback | `Function` |
| position (opt) | Time position |


### Returns

The timeline itself

> Can be chained with other timeline methods.

Example (javascript):

```javascript
import { createTimeline, utils } from 'animejs';

const [ $functionA ] = utils.$('.function-A');
const [ $functionB ] = utils.$('.function-B');
const [ $functionC ] = utils.$('.function-C');

const tl = createTimeline()
.call(() => $functionA.innerHTML = 'A', 0)
.call(() => $functionB.innerHTML = 'B', 800)
.call(() => $functionC.innerHTML = 'C', 1200);
```

Example (html):

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">function A</span>
      <span class="function-A value lcd">--</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">function B</span>
      <span class="function-B value lcd">--</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">function C</span>
      <span class="function-C value lcd">--</span>
    </pre>
  </div>
</div>
```

---

## Sync timelines

Docs: https://animejs.com/documentation/timeline/sync-timelines · Since 4.0.0

Timelines can be synchronised to an other timeline using the `sync()` method.

```js
timelineA.sync(timelineB, position);
```


### Parameters

| Name | Accepts |
|---|---|
| synced | Animation \| Timer \| Timeline |
| position (opt) | Time position |


### Returns

The timeline itself

> Can be chained with other timeline methods.

Example (javascript):

```javascript
import { createTimeline, animate } from 'animejs';

const circleAnimation = animate('.circle', {
  x: '15rem'
});

const tlA = createTimeline()
.sync(circleAnimation)
.add('.triangle', {
  x: '15rem',
  duration: 2000,
})
.add('.square', {
  x: '15rem',
});

const tlB = createTimeline({ defaults: { duration: 2000 } })
.add(['.triangle', '.square'], {
  rotate: 360,
}, 0)
.add('.circle', {
  scale: [1, 1.5, 1],
}, 0);

const tlMain = createTimeline()
.sync(tlA)
.sync(tlB, '-=2000');
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

## Sync WAAPI animations

Docs: https://animejs.com/documentation/timeline/sync-waapi-animations · Since 4.0.0

WAAPI animations can be synchronised to a timeline using the `sync()` method.

```js
timeline.sync(animation, position);
```


### Parameters

| Name | Accepts |
|---|---|
| synced | Animation \| Timer \| Timeline |
| position (opt) | Time position |


### Returns

The timeline itself

> Can be chained with other timeline methods.

Example (javascript):

```javascript
import { createTimeline, waapi } from 'animejs';

const circle = waapi.animate('.circle', {
  x: '15rem',
});

const triangle = waapi.animate('.triangle', {
  x: '15rem',
  y: [0, '-1.5rem', 0],
  ease: 'out(4)',
  duration: 750,
});

const square = waapi.animate('.square', {
  x: '15rem',
  rotateZ: 360,
});


const tl = createTimeline()
.sync(circle, 0)
.sync(triangle, 350)
.sync(square, 250);
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

## Time position

Docs: https://animejs.com/documentation/timeline/time-position · Since 2.0.0

Specifies the time at which a timeline child is inserted into a timeline.
 If no position is defined, the child will be positioned at the end of the timeline.

The time position is defined as the last parameter of the following methods:

```js
timeline.add(target, animationParameters, position);
timeline.add(timerParameters, position);
timeline.call(callbackFunction, position);
timeline.sync(labelName, position);
timeline.label(labelName, position);
```


### Time position types

| Type | Example | Description |
|---|---|---|
| Absolute | `100` | Position the element at exactly 100ms in the timeline |
| Addition | `'+=100'` | Position the element 100ms after the last element |
| Subtraction | `'-=100'` | Position the element 100ms before the last element end |
| Multiplier | `'*=.5'` | Position the element at half of the total element duration |
| Previous end
position | `'<'` | Position the element at the end position of the previous element |
| Previous start
position | `'<<'` | Position the element at the start position of the previous element |
| Combined | `'<<+=250'` | Position the element 250ms after the beginning position of the previous element |
| Label | `'My Label'` | Position the element at the `'My Label'` element |
| Stagger | `stagger(10)` | Stagger the elements position by `10` |

Example (javascript):

```javascript
import { createTimeline } from 'animejs';

const tl = createTimeline()
.label('start', 0)
.add('.square', {
  x: '15rem',
  duration: 500,
}, 500)
.add('.circle', {
  x: '15rem',
  duration: 500,
}, 'start')
.add('.triangle', {
  x: '15rem',
  rotate: '1turn',
  duration: 500,
}, '<-=250');
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

## Timeline callbacks

Docs: https://animejs.com/documentation/timeline/timeline-callbacks · Since 2.0.0

Execute functions at specific points during a timeline playback.
 Timeline callbacks functions are defined directly in the `createTimeline()` parameters `Object`.

```js
createTimeline({
  defaults: {
    ease: 'out(3)',
    duration: 500,
  },
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

## onBeforeUpdate

Docs: https://animejs.com/documentation/timeline/timeline-callbacks/onbeforeupdate · Since 4.0.0

Executes a function before updating the child animations values, on every frames of a running timeline at the specified `frameRate`.


### Accepts

A `Function` whose first argument is the timeline itself


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
import { createTimeline, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let updates = 0;

const tl = createTimeline({
  defaults: { duration: 500 },
  loopDelay: 250,
  loop: true,
  onBeforeUpdate: self => $value.textContent = ++updates
})
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' }, '+=250')
.add('.square', { x: '15rem' }, '+=250');
```

Example (html):

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
  <pre class="large log row">
    <span class="label">updates</span>
    <span class="value">0</span>
  </pre>
</div>
```

---

## onBegin

Docs: https://animejs.com/documentation/timeline/timeline-callbacks/onbegin · Since 4.0.0

Executes a function when an timeline begins to play.


### Accepts

A `Function` whose first argument is the timeline itself


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
import { createTimeline, utils } from 'animejs';

const [ $value ] = utils.$('.value');

const tl = createTimeline({
  delay: 1000, // Delays the onBegin() callback by 1000ms
  onBegin: self => $value.textContent = self.began
})
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' })
.add('.square', { x: '15rem' });
```

Example (html):

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
  <pre class="large log row">
    <span class="label">began</span>
    <span class="value">false</span>
  </pre>
</div>
```

---

## onComplete

Docs: https://animejs.com/documentation/timeline/timeline-callbacks/oncomplete · Since 4.0.0

Executes a function when all the iterations (loops) of a timeline have finished playing.


### Accepts

A `Function` whose first argument is the timeline itself


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
import { createTimeline, utils } from 'animejs';

const [ $value ] = utils.$('.value');

const tl = createTimeline({
  defaults: { duration: 500 },
  loop: 1,
  onComplete: self => $value.textContent = self.completed
})
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' })
.add('.square', { x: '15rem' });
```

Example (html):

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
  <pre class="large log row">
    <span class="label">completed</span>
    <span class="value">false</span>
  </pre>
</div>
```

---

## onLoop

Docs: https://animejs.com/documentation/timeline/timeline-callbacks/onloop · Since 4.0.0

Executes a function every time a timeline iteration completes.


### Accepts

A `Function` whose first argument is the timeline itself


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
import { createTimeline, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let loops = 0;

const tl = createTimeline({
  defaults: { duration: 500 },
  loopDelay: 500,
  loop: true,
  onLoop: self => $value.textContent = ++loops
})
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' })
.add('.square', { x: '15rem' });
```

Example (html):

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
  <pre class="large log row">
    <span class="label">loops</span>
    <span class="value">0</span>
  </pre>
</div>
```

---

## onPause

Docs: https://animejs.com/documentation/timeline/timeline-callbacks/onpause · Since 4.0.0

Executes a function when a running timeline is paused, either manually or automatically.

A timeline pauses when any of the following occurs during playback:

- The `.pause()` method is called
- The `.cancel()` method is called
- The `.revert()` method is called
- All child animations tweens are overlapped by another timeline or animation with `composition: 'replace'`
- All child animations targets have been removed and no other timers are active


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
import { createTimeline, utils } from 'animejs';

const [ $animateButton, $pauseButton, $removeButton ] = utils.$('.button');
const [ $value ] = utils.$('.value');
const shapes = utils.$('.shape');
const [ $triangle, $square, $circle ] = shapes;

let paused = 0;
let alternate = 0;
let tl;

const animateShapes = () => {
  alternate = !alternate;
  const x = (alternate ? 15 : 0) + 'rem';
  const rotate = (alternate ? 360 : -360);
  tl = createTimeline({
    defaults: { duration: 2000 },
    onPause: () => $value.textContent = ++paused
  })
  .add($circle, { x }, 0)
  .add($triangle, { x }, 0)
  .add($square, { x }, 0)
  .add(shapes, { rotate }, 0);
}

const pauseTL = () => {
  if (tl) tl.pause();
}

const removeTargets = () => {
  utils.remove(shapes);
}

animateShapes();

$animateButton.addEventListener('click', animateShapes);
$pauseButton.addEventListener('click', pauseTL);
$removeButton.addEventListener('click', removeTargets);
```

Example (html):

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="shape triangle"></div>
    <div class="shape square"></div>
    <div class="shape circle"></div>
  </div>
  <pre class="large log row">
    <span class="label">paused</span>
    <span class="value">0</span>
  </pre>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Create TL</button>
    <button class="button">Pause TL</button>
    <button class="button">Remove shapes</button>
  </fieldset>
</div>
```

---

## onRender

Docs: https://animejs.com/documentation/timeline/timeline-callbacks/onrender · Since 4.0.0

Executes a function every time a timeline renders something on the screen, this means that no rendering is happening when the `currentTime` is inside the `delay` or `loopDelay` time frames, or if neither of its children are rendering.


### Accepts

A `Function` whose first argument is the timeline itself


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
import { createTimeline, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let renders = 0;

const tl = createTimeline({
  defaults: { duration: 500 },
  loopDelay: 250,
  loop: true,
  onRender: self => $value.textContent = ++renders
})
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' }, '+=250')
.add('.square', { x: '15rem' }, '+=250');
```

Example (html):

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
  <pre class="large log row">
    <span class="label">renders</span>
    <span class="value">0</span>
  </pre>
</div>
```

---

## onUpdate

Docs: https://animejs.com/documentation/timeline/timeline-callbacks/onupdate · Since 4.0.0

Executes a function on every frames of a running timeline at the specified `frameRate`.


### Accepts

A `Function` whose first argument is the timeline itself


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
import { createTimeline, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let updates = 0;

const tl = createTimeline({
  defaults: { duration: 500 },
  loopDelay: 250,
  loop: true,
  onUpdate: self => $value.textContent = ++updates
})
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' }, '+=250')
.add('.square', { x: '15rem' }, '+=250');
```

Example (html):

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
  <pre class="large log row">
    <span class="label">updates</span>
    <span class="value">0</span>
  </pre>
</div>
```

---

## then()

Docs: https://animejs.com/documentation/timeline/timeline-callbacks/then · Since 4.0.0

Returns a `Promise` that resolves and execute a callback when the timeline completes.

The `then()` method can be directly inlined like this:

```js
createTimeline(parameters).add(targets, parameters).then(callback);
```

Or used in an `async` / `await` context:

```js
async function waitForTimelineToComplete() {
  return createTimeline()
  .add('.square', { x: 100 })
  .add('.square', { y: 100 });
}

const asyncTimeline = await waitForTimelineToComplete();
```


### Parameters

| Name | Type |
|---|---|
| callback | A `Function` whose first argument is the timeline itself |


### Returns

`Promise`

Example (javascript):

```javascript
import { createTimeline, utils } from 'animejs';

const [ $value ] = utils.$('.value');

const tl = createTimeline({
  defaults: { duration: 500 },
  loop: 1,
})
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' })
.add('.square', { x: '15rem' });

tl.then(() => $value.textContent = 'fulfilled');
```

Example (html):

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
  <pre class="large log row">
    <span class="label">promise status</span>
    <span class="value">pending</span>
  </pre>
</div>
```

---

## Timeline methods

Docs: https://animejs.com/documentation/timeline/timeline-methods · Since 2.0.0

Methods available on the `Timeline` instance returned by a `createTimeline()` function, providing control over the timing, behaviour, and progression of a timeline.

```js
const timeline = createTimeline(parameters);
         ┌──────────┐
timeline.│pause()   │
timeline.│play()    ├─ Methods
timeline.│restart() │
         └──────────┘
```

---

## add()

Docs: https://animejs.com/documentation/timeline/timeline-methods/add · Since 2.0.0

Creates and adds animations and timers to a timeline.
 The type of element added to the timeline depends of the parameters passed to `add()`.


### Add animation

```js
timeline.add(targets, parameters, position);
```

| Parameter | Accepts |
|---|---|
| targets | Targets |
| parameters | Animatable properties & Tween parameters & Animation playback settings & Animation callbacks |
| position (opt) | Time position |


### Add timer

```js
timeline.add(timerParameters, position);
```

| Parameter | Type |
|---|---|
| timerParameters | Timer playback settings & Timer callbacks |
| position (opt) | Time position |


### Returns

The timeline itself

> Can be chained with other timeline methods.

Example (javascript):

```javascript
import { createTimeline, utils } from 'animejs';

const [ $value ] = utils.$('.value');

const tl = createTimeline()
// Add labels
.label('start timer 1', 0)
.label('animate circle', 1000)
.label('start timer 2', 2000)
// Add Timer
.add({
  duration: 1000,
  onUpdate: self => $value.innerHTML = self.currentTime,
}, 'start timer 1')
// Add Animation
.add('.circle', {
  duration: 2000,
  x: '16rem',
}, 'animate circle')
// Add Timer
.add({
  duration: 1000,
  onUpdate: self => $value.innerHTML = self.currentTime,
}, 'start timer 2');
```

Example (html):

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">value</span>
    <span class="value lcd">0</span>
  </pre>
</div>
```

---

## alternate()

Docs: https://animejs.com/documentation/timeline/timeline-methods/alternate · Since 2.0.0

Toggles the playback direction while adjusting the `currentTime` position to reflect the new time progress.


### Returns

The timeline itself

> Can be chained with other timeline methods.

Example (javascript):

```javascript
import { creatTimeline, utils } from 'animejs';

const [ $alternateButton ] = utils.$('.button');

const tl = createTimeline({ loop: true })
.add('.circle',   { x: '15rem' })
.add('.triangle', { x: '15rem' }, 500)
.add('.square',   { x: '15rem' }, 1000);

const pauseTimeline = () => tl.pause();
const playTimeline = () => tl.play();
const alternateTimeline = () => tl.alternate();

$alternateButton.addEventListener('click', alternateTimeline);
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
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Alternate</button>
  </fieldset>
</div>
```

---

## call()

Docs: https://animejs.com/documentation/timeline/timeline-methods/call · Since 4.0.0

Calls the passed function callback at the specified time position.

```js
timeline.call(callback, position);
```


### Parameters

| Name | Accepts |
|---|---|
| callback | `Function` |
| position (opt) | Time position |


### Returns

The timeline itself

> Can be chained with other timeline methods.

Example (javascript):

```javascript
import { createTimeline, utils } from 'animejs';

const [ $functionA ] = utils.$('.function-A');
const [ $functionB ] = utils.$('.function-B');
const [ $functionC ] = utils.$('.function-C');

const tl = createTimeline()
.call(() => $functionA.innerHTML = 'A', 0)
.call(() => $functionB.innerHTML = 'B', 800)
.call(() => $functionC.innerHTML = 'C', 1200);
```

Example (html):

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">function A</span>
      <span class="function-A value lcd">--</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">function B</span>
      <span class="function-B value lcd">--</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">function C</span>
      <span class="function-C value lcd">--</span>
    </pre>
  </div>
</div>
```

---

## cancel()

Docs: https://animejs.com/documentation/timeline/timeline-methods/cancel · Since 4.0.0

Pauses the timeline, removes it from the engine's main loop, and frees up memory.


### Returns

The timeline itself

> Can be chained with other timeline methods.

Example (javascript):

```javascript
import { createTimeline, utils } from 'animejs';

const [ $cancelButton ] = utils.$('.cancel');
const [ $playButton ] = utils.$('.play');

const tl = createTimeline({
  loop: true,
  alternate: true,
})
.add('.circle',   { x: '15rem' })
.add('.triangle', { x: '15rem' }, 500)
.add('.square',   { x: '15rem' }, 1000);

const cancelTimeline = () => tl.cancel();
const playTimeline = () => tl.play();

$cancelButton.addEventListener('click', cancelTimeline);
$playButton.addEventListener('click', playTimeline);
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
<div class="medium row">
  <fieldset class="controls">
    <button class="button cancel">Cancel</button>
    <button class="button play">Play</button>
  </fieldset>
</div>
```

---

## complete()

Docs: https://animejs.com/documentation/timeline/timeline-methods/complete · Since 4.0.0

Completes the timeline instantly.


### Returns

The timeline itself

> Can be chained with other timeline methods.

Example (javascript):

```javascript
import { createTimeline, utils } from 'animejs';

const [ $completeButton ] = utils.$('.complete');

const tl = createTimeline({
  loop: true,
})
.add('.circle',   { x: '15rem' })
.add('.triangle', { x: '15rem' }, 500)
.add('.square',   { x: '15rem' }, 1000);

const completeTimeline = () => tl.complete();

$completeButton.addEventListener('click', completeTimeline);
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
<div class="medium row">
  <fieldset class="controls">
    <button class="button complete">Complete</button>
  </fieldset>
</div>
```

---

## init()

Docs: https://animejs.com/documentation/timeline/timeline-methods/init · Since 4.0.0

Initialises the initial values of all the elements of a timeline.

Animations with specific initial values added to a timeline are not automatically set to their *from* state like a normal call to `animate()` would, instead, they are initialised when the timeline playhead reaches the element in the timeline.

This is where `.init()` comes in handy, it forces a render of all the children initial state and updates their values.


### Returns

The timeline itself

> Can be chained with other timeline methods.

Example (javascript):

```javascript
import { createTimeline } from 'animejs';

const tl = createTimeline()
.add('.square',   { x: { from: '15rem' } })
.add('.triangle', { x: { from: '15rem' } }, 500)
.add('.circle',   { x: { from: '15rem' } }, 1000)
.init();
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

## label()

Docs: https://animejs.com/documentation/timeline/timeline-methods/label · Since 4.0.0

Associate specific time positions with label names for easy reference within the timeline.
 Once added to a timeline, a label can be used as a Time position.

```js
timeline.label(labelName, position);
```


### Parameters

| Name | Accepts |
|---|---|
| labelName | `String` |
| position (opt) | Time position |


### Returns

The timeline itself

> Can be chained with other timeline methods.

Example (javascript):

```javascript
import { createTimeline } from 'animejs';

const tl = createTimeline()
.label('circle', 0)
.label('square', 500)
.label('triangle', 1000)
.add('.square', {
  x: '17rem',
  duration: 500,
}, 'square')
.add('.circle', {
  x: '13rem',
  duration: 1000,
}, 'circle')
.add('.triangle', {
  x: '15rem',
  rotate: '1turn',
  duration: 500,
}, 'triangle');
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

## pause()

Docs: https://animejs.com/documentation/timeline/timeline-methods/pause · Since 2.0.0

Pauses a running timeline.


### Returns

The timeline itself

> Can be chained with other timeline methods.

Example (javascript):

```javascript
import { createTimeline, utils } from 'animejs';

const [ $pauseButton ] = utils.$('.pause');

const tl = createTimeline({
  loop: true,
  alternate: true,
})
.add('.circle',   { x: '15rem' })
.add('.triangle', { x: '15rem' }, 500)
.add('.square',   { x: '15rem' }, 1000);

const pauseTimeline = () => tl.pause();

$pauseButton.addEventListener('click', pauseTimeline);
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
<div class="medium row">
  <fieldset class="controls">
    <button class="button pause">Pause</button>
  </fieldset>
</div>
```

---

## play()

Docs: https://animejs.com/documentation/timeline/timeline-methods/play · Since 2.0.0

Forces the timeline to play forward.


### Returns

The timeline itself

> Can be chained with other timeline methods.

Example (javascript):

```javascript
import { createTimeline, utils } from 'animejs';

const [ $playButton ] = utils.$('.play');

const tl = createTimeline({
  autoplay: false
})
.add('.circle',   { x: '15rem' })
.add('.triangle', { x: '15rem' }, 500)
.add('.square',   { x: '15rem' }, 1000);

const playTimeline = () => tl.play();

$playButton.addEventListener('click', playTimeline);
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
<div class="medium row">
  <fieldset class="controls">
    <button class="button play">Play</button>
  </fieldset>
</div>
```

---

## refresh()

Docs: https://animejs.com/documentation/timeline/timeline-methods/refresh · Since 4.0.0

Re-computes the timeline children animated values defined with a Function based value by updating their *from* values to their current target values, and their *to* values to their newly computed values.

> Only the animatable properties values are re-calculated, `duration` and `delay` cannot be refreshed.


### Returns

The timeline itself

> Can be chained with other timeline methods.

Example (javascript):

```javascript
import { createTimeline, utils } from 'animejs';

const [ $refreshButton ] = utils.$('.refresh');

const tl = createTimeline({
  loop: true,
  onLoop: self => self.refresh()
})
.add('.circle',   { x: () => utils.random(0, 15) + 'rem' }, 0)
.add('.triangle', { x: () => utils.random(0, 15) + 'rem' }, 0)
.add('.square',   { x: () => utils.random(0, 15) + 'rem' }, 0);

const refreshTimeline = () => tl.refresh().restart();

$refreshButton.addEventListener('click', refreshTimeline);
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
<div class="medium row">
  <fieldset class="controls">
    <button class="button refresh">Refresh & Restart</button>
  </fieldset>
</div>
```

---

## remove()

Docs: https://animejs.com/documentation/timeline/timeline-methods/remove · Since 4.0.0

Removes animations, timers, timelines, targets or specific tween properties from the timeline.

The timeline will pauses automatically if all targets, animations, timers and timelines are removed.

Removing items from a timeline doesn't affect its duration. If you need to change the shape and duration of the timeline, you should create a new timeline instead.


### Removing animations, timers or timelines

```js
timeline.remove([animation, timer, timeline]);
```

| Parameter | Accepts |
|---|---|
| object | Animation \| Timer \| Timeline |
| position (opt) | Time position |


### Removing targets

```js
timeline.remove(targets);
```

| Parameter | Accepts |
|---|---|
| targets | Targets |


### Removing targets properties

```js
timeline.remove(targets, propertyName);
```

| Parameter | Accepts |
|---|---|
| targets | Targets |
| propertyName | A valid Animatable properties `String` |


### Returns

The timeline itself

> Can be chained with other timeline methods.

Example (javascript):

```javascript
import { animate, createTimeline, utils } from 'animejs';

const [ $removeA, $removeB, $removeC ] = utils.$('.button');

const animation = animate('.circle', { x: '15rem', scale: [1, .5, 1] });

const tl = createTimeline({ loop: true, alternate: true })
.sync(animation)
.add('.triangle', { x: '15rem', rotate: 360 }, 100)
.add('.square',   { x: '15rem' }, 200);

const removeAnimation = () => tl.remove(animation);
const removeTarget = () => tl.remove('.square');
const removeRotate = () => tl.remove('.triangle', 'rotate');

$removeA.addEventListener('click', removeAnimation);
$removeB.addEventListener('click', removeTarget);
$removeC.addEventListener('click', removeRotate);
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
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Remove anim</button>
    <button class="button">Remove target</button>
    <button class="button">remove tween</button>
  </fieldset>
</div>
```

---

## reset()

Docs: https://animejs.com/documentation/timeline/timeline-methods/reset · Since 3.0.0

Pauses and resets `currentTime`, `progress`, `reversed`, `began`, `completed` properties to their default values.

```js
timeline.reset(softReset);
```


### Parameters

| Name | Type | Description |
|---|---|---|
| softReset=false (opt) | `Boolean` | If `true`, only reset the internal values without causing a visual render |


### Returns

The timeline itself

> Can be chained with other timer methods.

Example (javascript):

```javascript
import { createTimer, utils } from 'animejs';

const [ $reset ] = utils.$('.button');

const tl = createTimeline({
  loop: true,
  alternate: true
})
.add('.circle',   { x: '15rem' })
.add('.triangle', { x: '15rem' }, 500)
.add('.square',   { x: '15rem' }, 1000);

const resetTimeline = () => {
  tl.reset();
  $time.innerHTML = timer.currentTime;
}

$reset.addEventListener('click', resetTimeline);
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
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Reset</button>
  </fieldset>
</div>
```

---

## restart()

Docs: https://animejs.com/documentation/timeline/timeline-methods/restart · Since 2.0.0

Sets the `currentTime` of a timeline to `0` and reset all properties of the elements to their initial state.

If the `autoplay` parameter is set to `true`, the timeline plays automatically.


### Returns

The timeline itself

> Can be chained with other timeline methods.

Example (javascript):

```javascript
import { createTimeline, utils } from 'animejs';

const [ $restartButton ] = utils.$('.restart');

const tl = createTimeline({
  loop: true,
  alternate: true,
})
.add('.circle',   { x: '15rem' })
.add('.triangle', { x: '15rem' }, 500)
.add('.square',   { x: '15rem' }, 1000);

const restartTimeline = () => tl.restart();

$restartButton.addEventListener('click', restartTimeline);
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
<div class="medium row">
  <fieldset class="controls">
    <button class="button restart">Restart</button>
  </fieldset>
</div>
```

---

## resume()

Docs: https://animejs.com/documentation/timeline/timeline-methods/resume · Since 2.0.0

Resumes the playback of a paused timeline in its current direction.


### Returns

The timeline itself

> Can be chained with other timeline methods.

Example (javascript):

```javascript
import { creatTimeline, utils } from 'animejs';

const [ $pauseButton, $alternateButton, $resumeButton ] = utils.$('.button');

const tl = createTimeline({ loop: true })
.add('.circle',   { x: '15rem' })
.add('.triangle', { x: '15rem' }, 500)
.add('.square',   { x: '15rem' }, 1000);

const pauseTimeline = () => tl.pause();
const alternateTimeline = () => tl.alternate();
const resumeTimeline = () => tl.resume();

$pauseButton.addEventListener('click', pauseTimeline);
$alternateButton.addEventListener('click', alternateTimeline);
$resumeButton.addEventListener('click', resumeTimeline);
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

Docs: https://animejs.com/documentation/timeline/timeline-methods/reverse · Since 4.0.0

Forces the timeline to play backward.


### Returns

The timeline itself

> Can be chained with other timeline methods.

Example (javascript):

```javascript
import { createTimeline, utils } from 'animejs';

const [ $reverseButton ] = utils.$('.reverse');

const tl = createTimeline()
.add('.circle',   { x: '15rem' })
.add('.triangle', { x: '15rem' }, 500)
.add('.square',   { x: '15rem' }, 1000);

const reverseTimeline = () => tl.reverse();

$reverseButton.addEventListener('click', reverseTimeline);
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
<div class="medium row">
  <fieldset class="controls">
    <button class="button reverse">Reverse</button>
  </fieldset>
</div>
```

---

## revert()

Docs: https://animejs.com/documentation/timeline/timeline-methods/revert · Since 4.0.0

Cancels the timeline, reverts all its children's animated values to their original state, cleans up the CSS inline styles, and reverts the linked `onScroll()` instance if necessary.

Use `.revert()` when you want to completely stop and destroy a timeline.


### Returns

The timeline itself

> Can be chained with other timeline methods.

Example (javascript):

```javascript
import { createTimeline, utils } from 'animejs';

const [ $revertButton ] = utils.$('.revert');
const [ $restartButton ] = utils.$('.restart');

// Set an initial x value
utils.set(['.circle', '.triangle', '.square'], { x: '15rem' });

const tl = createTimeline({
  loop: true,
  alternate: true,
})
.add('.circle',   { x: 0 })
.add('.triangle', { x: 0 }, 500)
.add('.square',   { x: 0 }, 1000);

const revertTimeline = () => tl.revert();
const restartTimeline = () => tl.restart();

$revertButton.addEventListener('click', revertTimeline);
$restartButton.addEventListener('click', restartTimeline);
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
<div class="medium row">
  <fieldset class="controls">
    <button class="button revert">Revert</button>
    <button class="button restart">Restart</button>
  </fieldset>
</div>
```

---

## seek()

Docs: https://animejs.com/documentation/timeline/timeline-methods/seek · Since 2.0.0

Updates the `currentTime` of the timeline to a specific time.

```js
timeline.seek(time, muteCallbacks);
```


### Parameters

| Name | Type | Description |
|---|---|---|
| time | `Number` | The new `currentTime` in ms of the timeline |
| muteCallbacks=false (opt) | `Boolean` | If `true`, prevent the callbacks from being fired |


### Returns

The timeline itself

> Can be chained with other timeline methods.

Example (javascript):

```javascript
import { createTimeline, utils } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $playPauseButton ] = utils.$('.play-pause');

const updateButtonLabel = tl => {
  $playPauseButton.textContent = tl.paused ? 'Play' : 'Pause';
}

const tl = createTimeline({
  autoplay: false,
  onUpdate: self => {
    $range.value = self.currentTime;
    updateButtonLabel(self);
  },
  onComplete: updateButtonLabel,
})
.add('.circle',   { x: '15rem' })
.add('.triangle', { x: '15rem' }, 500)
.add('.square',   { x: '15rem' }, 1000);

const seekTimeline = () => tl.seek(+$range.value);

const playPauseTimeline = () => {
  if (tl.paused) {
    tl.play();
  } else {
    tl.pause();
    updateButtonLabel(tl);
  }
}

$range.addEventListener('input', seekTimeline);
$playPauseButton.addEventListener('click', playPauseTimeline);
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
<div class="medium centered row">
  <fieldset class="controls">
    <input type="range" min=0 max=2000 value=0 class="range" />
    <button style="flex: 0.25;" class="button play-pause">Play</button>
  </fieldset>
</div>
```

---

## set()

Docs: https://animejs.com/documentation/timeline/timeline-methods/set · Since 4.0.0

Instantly sets targets property values at a specific time of the timeline.

```js
timeline.set(targets, parameters, position);
```


### Parameters

| Name | Accepts |
|---|---|
| targets | Targets |
| parameters | Animatable properties |
| position (opt) | Time position |


### Returns

The timeline itself

> Can be chained with other timeline methods.

Example (javascript):

```javascript
import { createTimeline } from 'animejs';

const tl = createTimeline()
.set('.circle', { x: '15rem' })
.set('.triangle', { x: '15rem' }, 500)
.set('.square', { x: '15rem' }, 1000);
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

## stretch()

Docs: https://animejs.com/documentation/timeline/timeline-methods/stretch · Since 4.0.0

Changes the total duration of a timeline and its children to fit a specific time.
 The total duration is equal to the duration of an iteration multiplied with the total number of iterations. So if the timeline is 1000ms and loops twice (3 iterations in total), the total duration will be 3000ms (1000 * 3).

```js
timeline.stretch(duration);
```


### Parameters

| Name | Type | Description |
|---|---|---|
| duration | `Number` | The new total duration in ms of the timeline |


### Returns

The timeline itself

> Can be chained with other timeline methods.

Example (javascript):

```javascript
import { createTimeline, utils } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $totalDuration ] = utils.$('.value');

const tl = createTimeline({
  loop: 1,
  alternate: true,
})
.add('.circle',   { x: '15rem' })
.add('.triangle', { x: '15rem' }, 500)
.add('.square',   { x: '15rem' }, 1000);

const stretchTimeline = () => {
  const newDuration = +$range.value;
  $totalDuration.textContent = newDuration;
  tl.stretch(newDuration).restart();
}

stretchTimeline();

$range.addEventListener('input', stretchTimeline);
```

Example (html):

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
  <pre class="large log row">
    <span class="label">total duration</span>
    <span class="value">0</span>
  </pre>
</div>
<div class="medium centered row">
  <fieldset class="controls">
    <input type="range" min=100 max=2000 value=1000 step=100 class="seek range" />
  </fieldset>
</div>
```

---

## sync()

Docs: https://animejs.com/documentation/timeline/timeline-methods/sync · Since 4.0.0

Synchronises a JS animation, WAAPI Animation, timer, timeline or even a native WAAPI Animation to a timeline.

```js
const tlChild = createTimeline().add(target, { x: 100 }).add(target, { y: 100 });

createTimeline().sync(tlChild);
```

Tween value composition is handled when the timeline is created, and won't affect the timeline's existing children when added.


### Parameters

| Name | Accepts |
|---|---|
| synced | JSAnimation \| Timer \| Timeline \| Anime.js WAAPIAnimation \| WAAPIAnimation |
| position (opt) | Time position |


### Returns

The timeline itself

> Can be chained with other timeline methods.

Example (javascript):

```javascript
import { createTimeline, animate, waapi } from 'animejs';

const circleAnimation = waapi.animate('.circle', {
  x: '15rem'
});

const tlA = createTimeline()
.sync(circleAnimation)
.add('.triangle', {
  x: '15rem',
  duration: 2000,
})
.add('.square', {
  x: '15rem',
});

const tlB = createTimeline({ defaults: { duration: 2000 } })
.add(['.triangle', '.square'], {
  rotate: 360,
}, 0)
.add('.circle', {
  scale: [1, 1.5, 1],
}, 0);

const tlMain = createTimeline()
.sync(tlA)
.sync(tlB, '-=2000');
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

## Timeline playback settings

Docs: https://animejs.com/documentation/timeline/timeline-playback-settings · Since 2.0.0

Specify the timings and behaviours of a timeline.
 Timeline playback settings are defined directly in the `createTimeline()` parameters `Object`.

```js
createTimeline({
┌───────────────────┐
│ defaults: {       │
│   ease: 'out(3)', │
│   duration: 500,  │
│ },                ├─ Playback Settings
│ loop: 3,          │
│ alternate: true,  │
│ autoplay: false,  │
└───────────────────┘
  onBegin: () => {},
  onLoop: () => {},
  onUpdate: () => {},
});
```

---

## alternate

Docs: https://animejs.com/documentation/timeline/timeline-playback-settings/alternate · Since 4.0.0

Defines if the direction of the timeline alternates on each iteration when the loop parameter is set to `true` or superior to `1`.


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
import { createTimeline, utils } from 'animejs';

const [ $loops ] = utils.$('.loops');

let loops = 0;

const tl = createTimeline({
  loop: true,
  alternate: true,
  onLoop: self => $loops.innerHTML = ++loops,
})
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' }, '-=500')
.add('.square', { x: '15rem' }, '-=500');
```

Example (html):

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
  <pre class="large log row">
    <span class="label">loops</span>
    <span class="loops value">0</span>
  </pre>
</div>
```

---

## autoplay

Docs: https://animejs.com/documentation/timeline/timeline-playback-settings/autoplay · Since 2.0.0

Defines the play mode of a timeline.


### Accepts

`Boolean` | `onScroll()`

- If set to `true` the timeline plays automatically
- If set to `false` the timeline has to be manually played
- If set to `onScroll()` the timeline will starts when the scroll thresholds conditions are met


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
import { createTimeline, utils } from 'animejs';

const [ $paused ] = utils.$('.paused');
const [ $play ] = utils.$('.play');

const tl = createTimeline({
  autoplay: false,
  onUpdate: self => $paused.innerHTML = !!self.paused,
  onComplete: self => $paused.innerHTML = !!self.paused
})
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' }, '-=500')
.add('.square', { x: '15rem' }, '-=500');

const playTl = () => tl.paused ? tl.restart() : tl.play();

$play.addEventListener('click', playTl);
```

Example (html):

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
  <pre class="large log row">
    <span class="label">paused</span>
    <span class="paused value">true</span>
  </pre>
</div>
<div class="large row controls">
  <button class="play">Play</button>
</div>
```

---

## defaults

Docs: https://animejs.com/documentation/timeline/timeline-playback-settings/defaults · Since 2.0.0

Defines defaults parameters for the timeline children.


### Accepts

An `Object` of Tween parameters (except from and to), Playback settings and Callbacks

Example (javascript):

```javascript
import { createTimeline } from 'animejs';

const tl = createTimeline({
  defaults: {
    ease: 'inOutExpo',
    duration: 500,
    loop: 2,
    reversed: true,
    alternate: true,
  }
})
.add('.square', { x: '15rem' })
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' });
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

## delay

Docs: https://animejs.com/documentation/timeline/timeline-playback-settings/delay · Since 2.0.0

Defines the delay, in milliseconds, before the timeline starts.


### Accepts

A `Number` equal to or greater than `0`


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
import { createTimeline, createTimer, utils } from 'animejs';

const tl = createTimeline({
  delay: 2000,
})
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' }, '-=500')
.add('.square', { x: '15rem' }, '-=500');

// For logging delayed time only

const [ $time ] = utils.$('.time');

createTimer({
  duration: 2000 + tl.duration,
  onUpdate: self => $time.innerHTML = (2000 - self.currentTime) * -1,
});
```

Example (html):

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
  <pre class="large log row">
    <span class="label">current time</span>
    <span class="time value lcd">0</span>
  </pre>
</div>
```

---

## frameRate

Docs: https://animejs.com/documentation/timeline/timeline-playback-settings/framerate · Since 4.0.0

Determines the number of frames per second (fps) a timeline is played at.
 This value can be modified later with `timeline.fps = 30`.


### Accepts

A `Number` greater than `0`

> The frame rate is capped to the monitor refresh rate or in some cases by the browser itself


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
import { createTimeline, utils } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $fps ] = utils.$('.fps');

const tl = createTimeline({
  frameRate: 60,
  loop: true,
})
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' }, '-=500')
.add('.square', { x: '15rem' }, '-=500');

const updateFps = () => {
  const { value } = $range;
  $fps.innerHTML = value;
  tl.fps = value;
}

$range.addEventListener('input', updateFps);
```

Example (html):

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
  <pre class="large log row">
    <span class="label">fps</span>
    <span class="fps value">60</span>
  </pre>
</div>
<div class="large row">
  <fieldset class="controls">
    <input type="range" min=0 max=120 value=60 step=1 class="range" />
  </fieldset>
</div>
```

---

## loop

Docs: https://animejs.com/documentation/timeline/timeline-playback-settings/loop · Since 2.0.0

Defines how many times a timeline repeats.


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
import { createTimeline, utils } from 'animejs';

const [ $loops ] = utils.$('.loops');

let loops = 0;

const tl = createTimeline({
  loop: true,
  onLoop: self => $loops.innerHTML = ++loops,
})
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' }, '-=500')
.add('.square', { x: '15rem' }, '-=500');
```

Example (html):

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
  <pre class="large log row">
    <span class="label">loops</span>
    <span class="loops value">0</span>
  </pre>
</div>
```

---

## loopDelay

Docs: https://animejs.com/documentation/timeline/timeline-playback-settings/playback-loopdelay · Since 4.0.0

Defines the delay in milliseconds between each loops.


### Accepts

A `Number` equal to or greater than `0`


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
import { createTimeline, utils } from 'animejs';

const [ $loops ] = utils.$('.loops');

const tl = createTimeline({
  loopDelay: 500,
  loop: true,
  onLoop: self => $loops.innerHTML = self._currentIteration,
})
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' }, '-=500')
.add('.square', { x: '15rem' }, '-=500');
```

Example (html):

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
  <pre class="large log row">
    <span class="label">loops</span>
    <span class="loops value">0</span>
  </pre>
</div>
```

---

## playbackEase

Docs: https://animejs.com/documentation/timeline/timeline-playback-settings/playbackease · Since 4.0.0

Applies and easing function to the entire playback of the timeline.

```js
0 ──────────playbackEase──────────› 1
A ──ease──› B ──ease──› C ──ease──› D
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
import { createTimeline } from 'animejs';

const tl = createTimeline({
  playbackEase: 'inOut(3)', // this ease is applied across all children
})
.add('.circle', { x: '15rem', ease: 'out(1)' })
.add('.triangle', { x: '15rem', ease: 'out(2)' })
.add('.square', { x: '15rem', ease: 'out(3)' });
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

## playbackRate

Docs: https://animejs.com/documentation/timeline/timeline-playback-settings/playbackrate · Since 4.0.0

Defines a speed multiplier to speed up or slow down a timeline.
 This value can be modified later with `timeline.speed = .5`.


### Accepts

A `Number` greater than or equal to `0`

> If set to `0` the timeline won't play.


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
import { createTimeline, utils } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $speed ] = utils.$('.speed');

const tl = createTimeline({
  playbackRate: 2,
  loop: true,
})
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' }, '-=500')
.add('.square', { x: '15rem' }, '-=500');

const updateSpeed = () => {
  const speed = utils.roundPad(+$range.value, 1);
  $speed.innerHTML = speed;
  utils.sync(() => tl.speed = speed);
}

$range.addEventListener('input', updateSpeed);
```

Example (html):

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
  <pre class="large log row">
    <span class="label">speed</span>
    <span class="speed value">2.0</span>
  </pre>
</div>
<div class="large row">
  <fieldset class="controls">
    <input type="range" min=0 max=10 value=2 step=.1 class="range" />
  </fieldset>
</div>
```

---

## reversed

Docs: https://animejs.com/documentation/timeline/timeline-playback-settings/reversed · Since 4.0.0

Defines the initial direction of the timeline.


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
import { createTimeline, utils } from 'animejs';

const [ $time ] = utils.$('.time');

const tl = createTimeline({
  reversed: true,
  onUpdate: self => $time.innerHTML = self.currentTime
})
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' }, '-=500')
.add('.square', { x: '15rem' }, '-=500');
```

Example (html):

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
  <pre class="large log row">
    <span class="label">current time</span>
    <span class="time value">0</span>
  </pre>
</div>
```

---

## Timeline properties

Docs: https://animejs.com/documentation/timeline/timeline-properties · Since 2.0.0

Properties available on the `Timeline` instance returned by a `createTimeline()` function.

```js
const timeline = createTimeline(parameters);
         ┌────────────┐
timeline.│labels      │
timeline.│currentTime ├─ Properties
timeline.│duration    │
         └────────────┘
```

| Name | Description |
|---|---|
| id | Gets and sets the ID of the timeline (`String` \| `Number`) |
| labels | Gets and sets the map of time position labels of the timeline (`Object`) |
| currentTime | Gets and sets the global current time in ms of the timeline (`Number`) |
| iterationCurrentTime | Gets and sets the current iteration time in ms (`Number`) |
| deltaTime | Gets the time in ms elapsed between the current and previous frame (`Number`) |
| progress | Gets and sets the overall progress of the timeline from `0` to `1` (`Number`) |
| iterationProgress | Gets and sets the progress of the current iteration from `0` to `1` (`Number`) |
| currentIteration | Gets and sets the current iteration count (`Number`) |
| duration | Gets the total duration in ms of the timeline (`Number`) |
| speed | Gets and sets the speed multiplier of the timeline (`Number`) |
| fps | Gets and sets the fps of the timeline (`Number`) |
| paused | Gets and sets whether the timeline is paused (`Boolean`) |
| began | Gets and sets whether the timeline has started (`Boolean`) |
| completed | Gets and sets whether the timeline has completed (`Boolean`) |
| reversed | Gets and sets whether the timeline is reversed (`Boolean`) |
| backwards | Gets whether the timeline is currently playing backwards (`Boolean`) |

---

