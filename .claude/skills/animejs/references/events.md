# Anime.js v4 · Events

Source: official documentation at https://animejs.com/documentation (MIT-licensed library by Julian Garnier).

## Events

Docs: https://animejs.com/documentation/events

### A collection of event listener utility methods to trigger and control animations.

All events functions are available on the `events` object imported from the main `'animejs'` module:

```js
import { events } from 'animejs';

events.onScroll();
```

Or imported directly from the main `'animejs'` module:

```js
import { onScroll } from 'animejs';
```

Or imported as a standalone module from the `'animejs/events'` subpath:

```js
import { onScroll } from 'animejs/events';
```

---

## onScroll

Docs: https://animejs.com/documentation/events/onscroll · Since 4.0.0

### Triggers and synchronises Timer, Animation and Timeline instances on scroll.

ScrollObservers are created with the `onScroll()` function and can be directly declared in the `autoplay parameter`.

```js
import { onScroll, animate } from 'animejs';

animate(targets, { x: 100, autoplay: onScroll(parameters) });
```

The `onScroll()` method can be imported directly from the main `'animejs'` module:

```js
import { onScroll } from 'animejs';

onScroll();
```

Or imported as a standalone module from the `'animejs/events'` subpath:

```js
import { onScroll } from 'animejs/events';
```


### Parameters

| Name | Accepts |
|---|---|
| parameters | An `Object` of ScrollObserver settings, ScrollObserver thresholds, ScrollObserver sync modes and ScrollObserver callbacks |


### Returns

`ScrollObserver`

Example (javascript):

```javascript
import { animate, createTimer, createTimeline , utils, onScroll } from 'animejs';

const [ container ] = utils.$('.scroll-container');
const debug = true;

// Animation

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  duration: 2000,
  alternate: true,
  loop: true,
  autoplay: onScroll({ container, debug })
});

// Timer

const [ $timer ] = utils.$('.timer');

createTimer({
  duration: 2000,
  alternate: true,
  loop: true,
  onUpdate: self => {
    $timer.innerHTML = self.iterationCurrentTime
  },
  autoplay: onScroll({
    target: $timer.parentNode,
    container,
    debug
  })
});

// Timeline

const circles = utils.$('.circle');

createTimeline({
  alternate: true,
  loop: true,
  autoplay: onScroll({
    target: circles[0],
    container,
    debug
  })
})
.add(circles[2], { x: '9rem' })
.add(circles[1], { x: '9rem' })
.add(circles[0], { x: '9rem' });
```

Example (html):

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large centered row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large centered row">
        <pre class="large log row">
          <span class="label">timer</span>
          <span class="timer value lcd">0</span>
        </pre>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
    </div>
  </div>
</div>
```

---

## ScrollObserver callbacks

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks · Since 4.0.0

Triggers functions at specific points during scroll.
 `ScrollObserver` callbacks functions are defined directly in the `onScroll()` parameters object.

```js
animate('.square', {
  x: 100,
  autoplay: onScroll({
    container: '.container',
    target: '.section',
    axis: 'y',
    enter: 'bottom top',
    leave: 'top bottom',
    sync: true,
┌──────────────────────────┐
│   onEnter: () => {},     │
│   onLeave: () => {},     ├─ Callbacks
│   onUpdate: () => {},    │
└──────────────────────────┘
  })
});
```

---

## onEnter

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onenter · Since 4.0.0

Triggers a function every time the `enter` threshold is met.


### Accepts

A `Function` whose first argument is the ScrollObserver instance


### Default

`noop`

Example (javascript):

```javascript
import { animate, onScroll, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let entered = 0;

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: true,
    debug: true,
    onEnter: () => $value.textContent = ++entered,
  })
});
```

Example (html):

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded sticky">
      <div class="large row">
        <pre class="large log row">
          <span class="label">entered</span>
          <span class="value">0</span>
        </pre>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section">
    </div>
  </div>
</div>
```

---

## onEnterBackward

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onenterbackward · Since 4.0.0

Triggers a function every time the `enter` threshold is met by scrolling backward.


### Accepts

A `Function` whose first argument is the ScrollObserver instance


### Default

`noop`

Example (javascript):

```javascript
import { animate, onScroll, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let entered = 0;

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: true,
    debug: true,
    onEnterBackward: () => $value.textContent = ++entered,
  })
});
```

Example (html):

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded sticky">
      <div class="large row">
        <pre class="large log row">
          <span class="label">entered</span>
          <span class="value">0</span>
        </pre>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section">
    </div>
  </div>
</div>
```

---

## onEnterForward

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onenterforward · Since 4.0.0

Triggers a function every time the `enter` threshold is met by scrolling forward.


### Accepts

A `Function` whose first argument is the ScrollObserver instance


### Default

`noop`

Example (javascript):

```javascript
import { animate, onScroll, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let entered = 0;

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: true,
    debug: true,
    onEnterForward: () => $value.textContent = ++entered,
  })
});
```

Example (html):

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded sticky">
      <div class="large row">
        <pre class="large log row">
          <span class="label">entered</span>
          <span class="value">0</span>
        </pre>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section">
    </div>
  </div>
</div>
```

---

## onLeave

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onleave · Since 4.0.0

Triggers a function every time the `leave` threshold is met.


### Accepts

A `Function` whose first argument is the ScrollObserver instance


### Default

`noop`

Example (javascript):

```javascript
import { animate, onScroll, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let exits = 0;

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: true,
    debug: true,
    onLeave: () => $value.textContent = ++exits,
  })
});
```

Example (html):

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded sticky">
      <div class="large row">
        <pre class="large log row">
          <span class="label">exits</span>
          <span class="value">0</span>
        </pre>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section">
    </div>
  </div>
</div>
```

---

## onLeaveBackward

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onleavebackward · Since 4.0.0

Triggers a function every time the `leave` threshold is met by scrolling backward.


### Accepts

A `Function` whose first argument is the ScrollObserver instance


### Default

`noop`

Example (javascript):

```javascript
import { animate, onScroll, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let exits = 0;

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: true,
    debug: true,
    onLeaveBackward: () => $value.textContent = ++exits,
  })
});
```

Example (html):

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded sticky">
      <div class="large row">
        <pre class="large log row">
          <span class="label">exits</span>
          <span class="value">0</span>
        </pre>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section">
    </div>
  </div>
</div>
```

---

## onLeaveForward

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onleaveforward · Since 4.0.0

Triggers a function every time the `leave` threshold is met by scrolling forward.


### Accepts

A `Function` whose first argument is the ScrollObserver instance


### Default

`noop`

Example (javascript):

```javascript
import { animate, onScroll, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let exits = 0;

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: true,
    debug: true,
    onLeaveForward: () => $value.textContent = ++exits,
  })
});
```

Example (html):

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded sticky">
      <div class="large row">
        <pre class="large log row">
          <span class="label">exits</span>
          <span class="value">0</span>
        </pre>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section">
    </div>
  </div>
</div>
```

---

## onResize

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onresize · Since 4.3.3

Triggers a function when a ScrollObserver's container resizes.


### Accepts

A `Function` whose first argument is the ScrollObserver instance


### Default

`noop`

Example (javascript):

```javascript
import { animate, onScroll, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let resizes = 0;

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom top',
    leave: 'center bottom',
    sync: .5,
    onResize: () => $value.textContent = ++resizes,
  })
});
```

Example (html):

```html
<div class="iframe-content resizable">
  <div class="full-container scroll-container scroll-y">
    <div class="scroll-content grid square-grid">
      <div class="scroll-section sticky">
        <div class="large row">
          <pre class="large log row">
            <span class="label">resize</span>
            <span class="value">0</span>
          </pre>
        </div>
      </div>
      <div class="scroll-section padded">
        <div class="large row">
          <div class="square"></div>
        </div>
      </div>
      <div class="scroll-section"></div>
    </div>
  </div>
</div>
```

---

## onSyncComplete

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onsynccomplete · Since 4.0.0

Triggers a function when the linked object synchronisation completes.


### Accepts

A `Function` whose first argument is the ScrollObserver instance


### Default

`noop`

Example (javascript):

```javascript
import { animate, onScroll, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let completions = 0;

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom top',
    leave: 'center bottom',
    sync: .5,
    debug: true,
    onSyncComplete: () => $value.textContent = ++completions,
  })
});
```

Example (html):

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded sticky">
      <div class="large row">
        <pre class="large log row">
          <span class="label">completions</span>
          <span class="value">0</span>
        </pre>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section"></div>
  </div>
</div>
```

---

## onUpdate

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onupdate · Since 4.0.0

Triggers a function every time the linked object progress updates during scroll synchronisation.


### Accepts

A `Function` whose first argument is the ScrollObserver instance


### Default

`noop`

Example (javascript):

```javascript
import { animate, onScroll, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let updates = 0;

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: .5,
    debug: true,
    onUpdate: () => $value.textContent = ++updates,
  })
});
```

Example (html):

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded sticky">
      <div class="large row">
        <pre class="large log row">
          <span class="label">updates</span>
          <span class="value">0</span>
        </pre>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section">
    </div>
  </div>
</div>
```

---

## ScrollObserver methods

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-methods · Since 4.0.0

Methods available on the `ScrollObserver` instance returned by an `onScroll()` function.

```js
const scrollObserver = onScroll(parameters);
               ┌──────────┐
scrollObserver.│link()    │
scrollObserver.│refresh() ├─ Methods
scrollObserver.│revert()  │
               └──────────┘
```

---

## link()

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-methods/link · Since 4.0.0

Connects an Animation, Timer or Timeline to a `ScrollObserver` instance.
 This is equivalent to defining an `onScroll()` instance on the `autoplay` parameter.

> Only one object can be linked at a time, every call to `link()` overrides the previously linked object.


### Accepts

Animation | Timer | Timeline


### Returns

The ScrollObserver itself

Example (javascript):

```javascript
import { animate, onScroll } from 'animejs';

const animation = animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
});

const scrollObserver = onScroll({
  container: '.scroll-container',
  enter: 'bottom-=50 top',
  leave: 'top+=60 bottom',
  sync: true,
  debug: true,
});

scrollObserver.link(animation);
```

Example (html):

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section">
    </div>
  </div>
</div>
```

---

## refresh()

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-methods/refresh · Since 4.0.0

Updates the bounding values, and re-compute the Function based value of a ScrollObserver instance.

The following parameters can be refreshed when set with a Function based value:

- `repeat`
- `axis`
- `enter`
- `leave`

> No need to call `.refresh()` when the container size changes, this is already handled internally.


### Returns

The ScrollObserver itself

Example (javascript):

```javascript
import { animate, onScroll, utils } from 'animejs';

const scrollSettings = {
  enter: 20,
  leave: 60,
}

const animation = animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: () => `bottom-=${scrollSettings.enter} top`,
    leave: () => `top+=${scrollSettings.leave} bottom`,
    sync: .5,
    debug: true,
  })
});

animate(scrollSettings, {
  enter: 90,
  leave: 100,
  loop: true,
  alternate: true,
  modifier: utils.round(0),
  onUpdate: () => animation._autoplay.refresh()
});
```

Example (html):

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section">
    </div>
  </div>
</div>
```

---

## revert()

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-methods/revert · Since 4.0.0

Disables the ScrollObserver, removes all `EventListener` and removes the debug `HTMLElement` if necessary.


### Returns

The ScrollObserver itself

Example (javascript):

```javascript
import { animate, onScroll } from 'animejs';

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: 1,
    debug: true,
    onSyncComplete: self => self.revert()
  })
});
```

Example (html):

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section">
    </div>
  </div>
</div>
```

---

## ScrollObserver properties

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-properties · Since 4.0.0

Properties available on the `ScrollObserver` instance returned by an `onScroll()` function.

```js
const scrollObserver = onScroll(parameters);
               ┌───────┐
scrollObserver.│target │
scrollObserver.│linked ├─ Properties
scrollObserver.│repeat │
               └───────┘
```

| Name | Description |
|---|---|
| id | Gets the unique identifier for the ScrollObserver instance (`Number`) |
| container | Gets the scroll container associated with this observer (`ScrollContainer`) |
| target | Gets the target element being observed (`HTMLElement`) |
| linked | Gets the linked object (`Animation` \| `Timer` \| `Timeline`) |
| repeat | Gets whether the observer should repeat (`Boolean`) |
| horizontal | Gets whether the scroll direction is horizontal (`Boolean`) |
| enter | Gets the enter threshold (`String` \| `Number`) |
| leave | Gets and sets the leave threshold (`String` \| `Number`) |
| sync | Gets whether synchronisation is enabled (`Boolean`) |
| velocity | Gets the current scroll velocity (`Number`) |
| backward | Gets whether the scroll direction is backward (`Boolean`) |
| scroll | Gets the current scroll position (`Number`) |
| progress | Gets the current progress of the observed element (0 to 1) (`Number`) |
| completed | Gets whether the observation has completed (`Boolean`) |
| began | Gets whether the observation has begun (`Boolean`) |
| isInView | Gets whether the observed element is currently in view (`Boolean`) |
| offset | Gets the offset of the observed element (`Number`) |
| offsetStart | Gets the start offset of the observed element (`Number`) |
| offsetEnd | Gets the end offset of the observed element (`Number`) |
| distance | Gets the scroll distance for the observed element (`Number`) |

---

## ScrollObserver settings

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-settings · Since 4.0.0

ScrollObserver settings properties are defined directly in the `onScroll()` parameters `Object`.

```js
animate('.square', {
  x: 100,
  autoplay: onScroll({
  ┌──────────────────────────┐
  │ container: '.container', │
  │ target: '.section',      ├─ Settings
  │ axis: 'y',               │
  └──────────────────────────┘
    enter: 'bottom top',
    leave: 'top bottom',
    sync: true,
    onEnter: () => {},
    onLeave: () => {},
    onUpdate: () => {},
  })
});
```

---

## axis

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-settings/axis · Since 4.0.0

Specifies the scroll direction of the ScrollObserver container `HTMLElement`.


### Accepts

- `'x'`
- `'y'`


### Defaults

`'y'`

Example (javascript):

```javascript
import { animate, utils, onScroll } from 'animejs';

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  duration: 2000,
  alternate: true,
  loop: true,
  ease: 'inOutQuad',
  autoplay: onScroll({
    container: '.scroll-container',
    axis: 'x',
  })
});
```

Example (html):

```html
<div class="full-container scroll-container scroll-x">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large centered row">
        <div class="label">scroll right →</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
  </div>
</div>
```

---

## container

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-settings/container · Since 4.0.0

Specifies the container `HTMLElement` to which the scroll event is applied.


### Accepts

- CSS Selector
- DOM Element


### Default

`null`

Example (javascript):

```javascript
import { animate, onScroll } from 'animejs';

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  duration: 2000,
  alternate: true,
  loop: true,
  ease: 'inOutQuad',
  autoplay: onScroll({
    container: '.scroll-container'
  })
});
```

Example (html):

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large centered row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
  </div>
</div>
```

---

## debug

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-settings/debug · Since 4.0.0

Displays markers to better visualise the `enter` and `leave` thresholds values.
 Each ScrollObserver instances has a dedicated color.
 The left side of the ruler represents the container threshold, and the right side the target threshold values.


### Accepts

`Boolean`


### Default

`false`

Example (javascript):

```javascript
import { animate, onScroll } from 'animejs';

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  duration: 2000,
  alternate: true,
  loop: true,
  ease: 'inOutQuad',
  autoplay: onScroll({
    container: '.scroll-container',
    debug: true,
  })
});
```

Example (html):

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large centered row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large centered row">
        <div class="label">scroll up</div>
      </div>
    </div>
  </div>
</div>
```

---

## repeat

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-settings/repeat · Since 4.0.0

Specifies if the scroll synchronisation should repeat after the linked object completes.
 If the repeat property is set to `false`, the scrollContainer instance will be reverted.


### Accepts

`Boolean`


### Defaults

`true`

Example (javascript):

```javascript
import { createTimer, onScroll, utils } from 'animejs';

const [ $repeat ] = utils.$('.repeat .value');
const [ $noRepeat ] = utils.$('.no-repeat .value');

let repeatUpdates = 0;
let noRepeatUpdates = 0;

createTimer({
  duration: 1000,
  autoplay: onScroll({
    container: '.scroll-container',
    target: '.repeat',
    enter: 'bottom-=40 top',
    leave: 'top+=60 bottom',
    onUpdate: () => $repeat.innerHTML = repeatUpdates++,
    repeat: true,
    debug: true,
  })
});

createTimer({
  duration: 1000,
  autoplay: onScroll({
    container: '.scroll-container',
    target: '.no-repeat',
    enter: 'bottom-=40 top',
    leave: 'top+=60 bottom',
    onUpdate: () => $noRepeat.innerHTML = noRepeatUpdates++,
    repeat: false,
    debug: true,
  })
});
```

Example (html):

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <pre class="repeat large log row">
          <span class="label">repeat upddates</span>
          <span class="value">0</span>
        </pre>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <pre class="no-repeat large log row">
          <span class="label">no repeat updates</span>
          <span class="value">0</span>
        </pre>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large centered row">
        <div class="label">scroll up</div>
      </div>
    </div>
  </div>
</div>
```

---

## target

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-settings/target · Since 4.0.0

Specifies which `HTMLElement` triggers the scroll event.


### Accepts

- CSS Selector
- DOM Element


### Defaults

- If defined on an animation, the first targeted `HTMLElement` of the animation.
- `null` if defined outside of an animation

Example (javascript):

```javascript
import { createTimer, utils, onScroll } from 'animejs';

const [ $timer ] = utils.$('.timer');

createTimer({
  duration: 2000,
  alternate: true,
  loop: true,
  onUpdate: self => {
    $timer.innerHTML = self.iterationCurrentTime
  },
  autoplay: onScroll({
    target: $timer,
    container: '.scroll-container',
  })
});
```

Example (html):

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large centered row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large centered row">
        <pre class="large log row">
          <span class="label">timer</span>
          <span class="timer value lcd">0</span>
        </pre>
      </div>
    </div>
  </div>
</div>
```

---

## ScrollObserver synchronisation modes

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes · Since 4.0.0

Determines the behaviour of the animation and how it is synchronised relative to the scroll progress or by meeting certain thresholds.
 The different synchronisation modes are defined on the `sync` property of the `onScroll()` parameters `Object`.

```js
animate('.square', {
  x: 100,
  autoplay: onScroll({
    container: '.container',
    target: '.section',
    axis: 'y',
    enter: 'bottom top',
    leave: 'top bottom',
┌──────────────────────────┐
│   sync: true,            ├─ Synchronisation Mode
└──────────────────────────┘
    onEnter: () => {},
    onLeave: () => {},
    onUpdate: () => {},
  })
});
```

---

## Eased scroll

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/eased-scroll · Since 4.0.0

Applies an easing function to the synchronised playback progress of the linked object relative to the scroll position.


### Accepts

ease

Example (javascript):

```javascript
import { animate, stagger, onScroll } from 'animejs';

animate('.square', {
  x: '12rem',
  rotate: '1turn',
  ease: 'linear',
  delay: stagger(100, { from: 'last' }),
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: 'inOutCirc',
    debug: true,
  })
});
```

Example (html):

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section">
    </div>
  </div>
</div>
```

---

## Method names

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/method-names · Since 4.0.0

Defines a list of method names of the linked `Object` to be called when specific callbacks are triggered.


### Accepts

A `String` containing a list of Animation methods, Timer methods or Timeline methods names separated by an empty space


### Callbacks definition order


#### 'enter'

Defines a method to be triggered when the enter threshold is crossed or when the element re-enters the viewport.

```js
{
  sync: 'play',
}
```


#### 'enter leave'

Defines methods to be triggered when the enter and leave thresholds are crossed.

```js
{
  sync: 'play pause',
}
```


#### 'enterForward leaveForward enterBackward leaveBackward'

Defines methods to be triggered when the enter and leave thresholds are crossed when scrolling forward and when the enter and leave thresholds are crossed when scrolling backward.

```js
{
  sync: 'play pause reverse reset',
}
```


### Default

`'play pause'`

Example (javascript):

```javascript
import { animate, onScroll } from 'animejs';

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  duration: 2000,
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: 'resume pause reverse reset',
    debug: true
  })
});
```

Example (html):

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section">
    </div>
  </div>
</div>
```

---

## Playback progress

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/playback-progress · Since 4.0.0

Perfectly synchronises the playback progress of the linked object to the scroll position by passing a value of either `true` or `1`.


### Accepts

- `1`
- `true`

Example (javascript):

```javascript
import { animate, onScroll } from 'animejs';

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: true,
    debug: true,
  })
});
```

Example (html):

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section">
    </div>
  </div>
</div>
```

---

## Smooth scroll

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/smooth-scroll · Since 4.0.0

Smoothly animate the playback progress of the linked object to the scroll position by passing a value between `0` and `1`. The closer the value gets to `0`, the longer the animation takes to catch up with the current scroll position.


### Accepts

A `Number` greater than or equal to `0` and lower to or equal `1`

Example (javascript):

```javascript
import { animate, onScroll } from 'animejs';

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: .25,
    debug: true,
  })
});
```

Example (html):

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section">
    </div>
  </div>
</div>
```

---

## ScrollObserver thresholds

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds · Since 4.0.0

Determines the points at which actions are triggered based on the scrolling position of a target element within a container.
 Thresholds are defined with the `enter` and `leave` properties of the `onScroll()` parameters `Object`.

```js
animate('.square', {
  x: 100,
  autoplay: onScroll({

    container: '.container',
    target: '.section',
    axis: 'y',
  ┌──────────────────────────┐
  │ enter: 'bottom top',     ├─ Thresholds
  │ leave: 'top bottom',     │
  └──────────────────────────┘
    sync: true,
    onEnter: () => {},
    onLeave: () => {},
    onUpdate: () => {},
  })
});
```

The conditions that determine when an element enters or leaves the viewport are specified by comparing two pairs of values: the target and container `start` and `end` values.

```js
┌────────────────────────────────┐- Container Start
│                                │
│   Container                    │
│                                │
│          ┌──────────┐----------│- Target Start
│          │          │          │
│          │  Target  │          │
└────────────────────────────────┘- Container End
           │          │
           └──────────┘------------ Target End
```


### Different syntaxes

Conditions can be written with the following syntaxes:


#### Object

```js
onScroll({
  // Enters when the top of the target meets the bottom of the container
  enter: { target: 'top', container: 'bottom' },
  // Leaves when the bottom of the target meets the top of the container
  leave: { target: 'bottom', container: 'top' }
});
```


#### Container value String

The container value can be passed directly and the target value defaults to `'start'` for enter and `'end'` for leave.

```js
onScroll({
  // Enters when the top of the target meets the bottom of the container
  enter: 'bottom',
  // Leaves when the bottom of the target meets the top of the container
  leave: 'top'
 });
```


#### Container and target value shorthand String

```js
onScroll({
  // Enters when the bottom of the container meets the top of the target
  enter: 'bottom top',
  // Leaves when the top of the container meets the bottom of the target
  leave: 'top bottom',
});
```


### Default enter

`'end start'`


### Default leave

`'start end'`

---

## Min max

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/min-max · Since 4.0.0

Defines a threshold in the minimum or maximum scrollable space available. This is particularly useful in cases where some of the targeted elements initial position are either too small or too big to triggers `enter` and `leave` conditions.


### Accepts

| Value | Description |
|---|---|
| `'min'` | The minimum value possible to meet the enter or leave condition |
| `'max'` | The maximum value possible to meet the enter or leave condition |

Example (javascript):

```javascript
import { animate, onScroll, utils } from 'animejs';

utils.$('.square').forEach($square => {
  animate($square, {
    x: '15rem',
    rotate: '1turn',
    duration: 2000,
    alternate: true,
    ease: 'inOutQuad',
    autoplay: onScroll({
      container: '.scroll-container',
      sync: 1,
      enter: 'max bottom',
      leave: 'min top',
      debug: true
    })
  });
});
```

Example (html):

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
  </div>
</div>
```

---

## Numeric values

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/numeric-values · Since 4.0.0

Defines an offset from the top of the target and container by passing a numeric values.
 If no unit is defined, the values is interpreted as pixels.


### Accepts

| Type | Example | Description |
|---|---|---|
| Number | `100` | 100px from the top of the target or container |
| Unit | `'1rem'` | 1rem from the top of the target or container |
| Percentage | `'10%'` | 10% of the target or container height, from the top of the target or container |


### Default unit

`px`

Example (javascript):

```javascript
import { animate, onScroll } from 'animejs';

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  duration: 2000,
  alternate: true,
  loop: true,
  ease: 'inOutQuad',
  autoplay: onScroll({
    container: '.scroll-container',
    // 80% from the top of the container, -50px from the top of the target 
    enter: '80% 20%',
    // 50px from the top of the container, 100px from the top of the target
    leave: '50 -25',
    debug: true
  })
});
```

Example (html):

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large centered row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section">
    </div>
  </div>
</div>
```

---

## Positions shorthands

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/positions-shorthands · Since 4.0.0

Defines the position of the target and container by passing the position name.


### Accepts

| Value | Returns |
|---|---|
| `'top'` | The top y value |
| `'bottom'` | The bottom y value |
| `'left'` | The left x value |
| `'right'` | The right x value |
| `'center'` | The center x or y value |
| `'start'` | Equivalent to `'top'` and `'left'` depending of the axis |
| `'end'` | Equivalent to `'bottom'` and `'right'` depending of the axis |

Example (javascript):

```javascript
import { animate, onScroll } from 'animejs';

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  duration: 2000,
  alternate: true,
  loop: true,
  ease: 'inOutQuad',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'center top',
    leave: 'center bottom',
    debug: true
  })
});
```

Example (html):

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large centered row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section">
    </div>
  </div>
</div>
```

---

## Relative position values

Docs: https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/relative-position-values · Since 4.0.0

Defines position values relative to the target and container top coordinate using a a Relative value syntax.


### Accepts

| Prefix | Effect | Example |
|---|---|---|
| `'+='` | Add | `'+=45'` |
| `'-='` | Subtracts | `'-=50%'` |
| `'*='` | Multiply | `'*=.5'` |

Example (javascript):

```javascript
import { animate, onScroll } from 'animejs';

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  duration: 2000,
  alternate: true,
  loop: true,
  ease: 'inOutQuad',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'center+=1em top-=100%',
    leave: 'center-=1em bottom+=100%',
    debug: true
  })
});
```

Example (html):

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large centered row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section">
    </div>
  </div>
</div>
```

---

