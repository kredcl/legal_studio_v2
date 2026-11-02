# Anime.js v4 · Layout

Source: official documentation at https://animejs.com/documentation (MIT-licensed library by Julian Garnier).

## Layout

Docs: https://animejs.com/documentation/layout

### Automatically animates between two HTML layout states, allowing you to easily animate properties that are normally impossible or hard to animate like CSS display, flex direction, grid settings, and DOM order.


### Examples

Explore the Auto Layout examples CodePen collection.


### Creating a layout

Layout instances are created with the `createLayout()` method exported by the main `'animejs'` entry point:

```js
import { createLayout } from 'animejs';

const layout = createLayout(root, parameters);
```

Or imported as a standalone module from the `'animejs/layout'` subpath:

```js
import { createLayout } from 'animejs/layout';
```


### Parameters

| Name | Accepts |
|---|---|
| root | CSS selector \| DOM element |
| parameters (opt) | `Object` of Layout settings & Layout states parameters |


### Returns

`AutoLayout`


### Animating a layout

Layout animations are triggered either by calling `layout.record()` and `layout.animate()` before and after updating the layout, or by simply calling `layout.update(cb)` with the layout changes inside the callback:

```js
// Toggle between list and grid view
layout.update(({ root }) => root.classList.toggle('grid'));
```

Example (javascript):

```javascript
import { createLayout, utils, stagger } from 'animejs';

const layout = createLayout('.layout-container');

let i = 0;

function animateLayout() {
  return layout.update(({ root }) => {
    root.dataset.grid = (++i % 4) + 1;
  }, {
    duration: 1000,
    delay: stagger(150),
    onComplete: () => animateLayout()
  });
}

const layoutAnimation = animateLayout();
```

Example (html):

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout" data-grid="1">
    <div class="item">Item A</div>
    <div class="item">Item B</div>
    <div class="item">Item C</div>
    <div class="item">Item D</div>
  </div>
</div>
```

---

## Common auto layout gotchas

Docs: https://animejs.com/documentation/layout/common-auto-layout-gotchas · Since 4.3.0

While the layout API handles most animation scenarios automatically, some edge cases may produce unexpected results. Here's what to watch out for.


### Some elements are fading out unexpectedly

When using a `children` selector, elements that are descendants of matched children (but not targets themselves) will only get their state updated at 50% of the transition progress. To avoid hard cut between the two states, these elements are fading to opacity 0 then back to 1 under these conditions:

- The element is not explicitly targeted by the `children` selector
- The element's size has changed
- Its parent is a target and the parent's size has also changed

> #### Workaround
> 
> Either add the elements you want to keep visible to the `children` selectors array.
>  Or change the `swapAt` parameter to `opacity: 1`.
> 
> ```js
> const layout = createLayout('#root', {
>   children: '.card', // Only .card elements are targets
>   swapAt: { opacity: 1 } // This will make sure all descendants of .card are always visible during the transition.
> });
> ```


### The root element position "jumps" during a transition

The position of the root element is never animated because it could cause other issues like having the root siblings jumping during a transition because they are not part of the layout.
 The root dimensions can be animated because animating the width and height will affect other elements position (in most cases).

> #### Workaround
> 
> If you end up in a situation where the position of the root element of your layout needs to be animated, you'll have to use the parent element of the current root as the new root:
> 
> ```js
> // From this
> const layout = createLayout('#container .grid'); // .grid position can't be animated.
> // To this
> const layout = createLayout('#container'); // Now .grid position can be animated
> ```


### My text is jumping during a layout transition

Animating `fontSize` alongside `width` or `height` can cause text to reflow mid-animation, especially in Firefox. Even if the start and end states have identical line breaks, intermediate frames may have a width/font-size ratio that triggers wrapping.

> #### Workaround
> 
> Use `white-space: nowrap` on the element if text wrapping isn't needed.


### Some elements inlined within the text are not moving

To prevents breaking text flow during a transition, elements adjacent to text nodes are excluded from position animations.

```html
<p>Some text <span class="highlight">inline element</span> more text</p>
```

> #### Workaround
> 
> Wrap text elements in span tags to allow text nodes to animate with the inlined elements.
> 
> ```html
> <p><span>Some text</span> <span class="highlight">inline element</span> <span>more text</span></p>
> ```


### Transform shorthands are not working

The `enterFrom`, `leaveTo`, and `swapAt` parameters do not support CSS transform shorthands like `scale`, `rotate`, `x`, `y` etc.

```js
// Won't work
createLayout('#root', {
  enterFrom: { scale: 0 }
});
```

> #### Workaround
> 
> Use the `transform` property with a full transform string:
> 
> ```js
> // Use transform string
> createLayout('#root', {
>   enterFrom: { transform: 'scale(0)' }
> });
> ```


### SVG elements are not animated

SVG elements and their descendants are excluded from layout animations. Only HTML elements are tracked and animated.

---

## Layout callbacks

Docs: https://animejs.com/documentation/layout/layout-callbacks · Since 4.3.0

Layout animations inherit all Timeline callbacks, allowing you to execute functions at specific points during playback like you would with a regular Timeline.

```js
import { createLayout } from 'animejs';

createLayout(root, {
  children: '.item',
  duration: 350,
  delay: 0,
  ease: 'inOut(3.5)',
  properties: ['boxShadow'],
  enterFrom: { opacity: 0 },
  leaveTo: { opacity: 0 },
  swapAt: { opacity: 0 },
┌───────────────────────────┐
│ onBegin: () => {},        │
│ onUpdate: () => {},       ├─ Callbacks
│ onComplete: () => {},     │
}).then(() => {});          │
└───────────────────────────┘
```

The `.then()` method is also available on the `Timeline` returned by `.update()` or `.animate()`.

---

## Layout id attribute

Docs: https://animejs.com/documentation/layout/layout-id-attribute · Since 4.3.0

Layout ids are automatically assigned or can be manually defined using a `data-layout-id` attribute.
 If two elements share the same id, and one of them is hidden (`display: none`, `visibility: hidden`) and the other one is visible, the layout will automatically animate between the two.
 This is generally used when you want to create an animation between two elements in different parts of the DOM without having to clone or move them.

Example (javascript):

```javascript
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');
const [ $itemA1, $itemA2 ] = utils.$('.item');

// Manually set the same layout id to both items
$itemA1.dataset.layoutId = "item-A";
$itemA2.dataset.layoutId = "item-A";

// Hide item 2
$itemA2.classList.add('is-hidden');

const layout = createLayout('.layout');

function animateLayout() {
  layout.update(({ root }) => {
    // Toggle the visibility and alternate between the two items
    $itemA1.classList.toggle('is-hidden');
    $itemA2.classList.toggle('is-hidden');
  });
}

$button.addEventListener('click', animateLayout);
```

Example (html):

```html
<div class="large layout centered row">
  <div class="layout-container container-a col grid-layout row">
    <div class="item col">Item A</div>
  </div>
  <div class="layout-container container-b col grid-layout row">
    <div class="item col">Item A</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Toggle visibility</button>
  </fieldset>
</div>
```

---

## Layout methods

Docs: https://animejs.com/documentation/layout/layout-methods · Since 4.3.0

Methods available on the `AutoLayout` instance returned by `createLayout()`, to record, animate, and revert layout states.

```js
const layout = createLayout(root, parameters);
       ┌───────────┐
layout.│record()   │
layout.│animate()  ├─ Methods
layout.│update()   │
layout.│revert()   │
       └───────────┘
```

---

## animate()

Docs: https://animejs.com/documentation/layout/layout-methods/animate · Since 4.3.0

Compares the last `record()` snapshot with the latest measurements and returns a `Timeline` that automatically animates every changed property between the two states.


### Accepts

An optional `Object` of animation parameters to override default layout timing and easing for this specific transition.


### Returns

`Timeline`

Example (javascript):

```javascript
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout-container');

function animateLayout() {
  // Record the current state of the layout
  layout.record();
  // Update the layout state
  const first = layout.root.firstElementChild;
  if (first) layout.root.append(first);
  // Animate to the new state
  layout.animate({
    duration: 750,
    ease: 'out(4)',
  });
}

$button.addEventListener('click', animateLayout);
```

Example (html):

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col">Item 1</div>
    <div class="item col">Item 2</div>
    <div class="item col">Item 3</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">record() + animate()</button>
  </fieldset>
</div>
```

---

## record()

Docs: https://animejs.com/documentation/layout/layout-methods/record · Since 4.3.0

Record a layout snapshot that will be used as the initial state of the next animation created with `animate()`.


### Returns

`AutoLayout`

Example (javascript):

```javascript
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout-container');

function animateLayout() {
  // Record the current state of the layout
  layout.record();
  // Update the layout state
  const first = layout.root.firstElementChild;
  if (first) layout.root.append(first);
  // Animate to the new state
  layout.animate();
}

$button.addEventListener('click', animateLayout);
```

Example (html):

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col">Item 1</div>
    <div class="item col">Item 2</div>
    <div class="item col">Item 3</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">record() + animate()</button>
  </fieldset>
</div>
```

---

## revert()

Docs: https://animejs.com/documentation/layout/layout-methods/revert · Since 4.3.0

Completes all currently running layout animations, reverting the DOM to its actual current state.


### Returns

`AutoLayout`

Example (javascript):

```javascript
import { createLayout, utils } from 'animejs';

const [ $animate, $revert ] = utils.$('.controls button');

const layout = createLayout('.layout-container', { duration: 5000, ease: 'out(3)' });

function animateLayout() {
  layout.update(() => {
    const first = layout.root.firstElementChild;
    if (first) layout.root.append(first);
    $revert.disabled = false;
  }).then(() => $revert.disabled = true);
}

function revertLayout() {
  layout.revert();
}

$animate.addEventListener('click', animateLayout);
$revert.addEventListener('click', revertLayout);
```

Example (html):

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col">Item 1</div>
    <div class="item col">Item 2</div>
    <div class="item col">Item 3</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">animate()</button>
    <button class="button" disabled>revert()</button>
  </fieldset>
</div>
```

---

## update()

Docs: https://animejs.com/documentation/layout/layout-methods/update · Since 4.3.0

One-call helper that runs `record()`, executes your DOM mutations, and calls `animate()` with optional overrides.

> This might not work in some frameworks (I haven't tested all of them).
>  Use the manual `record()` / `.animate()` combo if the animation doesn't work with `.update()`.


### Parameters

- A callback `Function` to update the layout
- An optional `Object` of animation parameters to override default layout timing and easing for this specific transition.


### Returns

`Timeline`

Example (javascript):

```javascript
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout-container');

function animateLayout() {
  // Triggers both layout.record() and layout.animate()
  layout.update(() => {
    const first = layout.root.firstElementChild;
    if (first) layout.root.append(first);  
  }, {
    duration: 750,
    ease: 'out(4)',  
  });
}

$button.addEventListener('click', animateLayout);
```

Example (html):

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col">Item 1</div>
    <div class="item col">Item 2</div>
    <div class="item col">Item 3</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">update()</button>
  </fieldset>
</div>
```

---

## Layout properties

Docs: https://animejs.com/documentation/layout/layout-properties · Since 4.3.0

Properties available on the `AutoLayout` instance returned by `createLayout()`.

```js
const layout = createLayout(root, parameters);
       ┌──────────────────────┐
layout.│root                  │
layout.│timeline              ├─ Properties
layout.│entering              │
       └──────────────────────┘
```

| Name | Description |
|---|---|
| `params` | Configuration object passed to `createLayout()` (`AutoLayoutParams`) |
| `root` | Resolved root element where measurements start (`HTMLElement`) |
| `children` | Selector(s) used to find tracked elements each time `.record()` runs (`String\|Array<String>`) |
| `enterFromParams` | Animation parameters for nodes entering the layout (`Object`) |
| `leaveToParams` | Animation parameters for nodes leaving the layout (`Object`) |
| `swapAtParams` | Animation parameters for nodes swapping during a layout transition (`Object`) |
| `properties` | Set of CSS property names interpolated whenever their values change (`Set<String>`) |
| `oldState` | `LayoutSnapshot` objects containing previous measurements |
| `newState` | `LayoutSnapshot` objects containing latest measurements |
| `timeline` | Timeline instance returned by the last `.animate()` / `.update()` call (`Timeline`\|`null`) |
| `animating` | Arrays of DOM nodes animated during latest `.animate()` call (`Array<DOMTarget>`) |
| `swapping` | Arrays of DOM nodes swapped during the latest `.animate()` call (`Array<DOMTarget>`) |
| `entering` | Arrays of DOM nodes entering during the latest `.animate()` call (`Array<DOMTarget>`) |
| `leaving` | Arrays of DOM nodes leaving during the latest `.animate()` call (`Array<DOMTarget>`) |
| `id` | Gets and sets the ID of the layout (`String` \| `Number`) |


#### LayoutSnapshot helpers

`layout.oldState` and `layout.newState` expose methods like `.getNode(element)` and `.getComputedValue(element, property)` to inspect recorded measurements.


#### Inspecting runtime arrays

`layout.entering`, `layout.leaving`, and `layout.swapping` are cleared and repopulated every time `.animate()` runs. Use them immediately after calling `layout.update()` to coordinate custom states before the timeline completes.

---

## Settings

Docs: https://animejs.com/documentation/layout/layout-settings · Since 4.3.0

Layout settings are defined directly in the `createLayout()` parameters `Object`.

```js
import { createLayout } from 'animejs';

createLayout('.layout-container', {
┌─────────────────────────────┐
│ children: '.item',          │
│ duration: 350,              │
│ delay: 0,                   ├─ Settings
│ ease: 'inOut(3.5)',         │
│ properties: ['boxShadow'],  │
└─────────────────────────────┘
  enterFrom: { opacity: 0 },
  leaveTo: { opacity: 0 },
  swapAt: { opacity: 0 },
  onBegin: () => {},
  onUpdate: () => {},
  onComplete: () => {},
}).then(() => {});
```

---

## children

Docs: https://animejs.com/documentation/layout/layout-settings/children · Since 4.3.0

Targets which elements of the root must have their position / dimensions and specified properties animated.
 Descendants of specified children are considered "frozen", and only "swap" state at 50% of their parent transition.
 This is mostly used when you don't want to animate elements containing text that reflows during a transition and can cause visual noise.
 It's also used to target children elements that are not initially part of the layout root but added during the animation phase, in combination with the layout id data-attribute.


### Accepts

- CSS selector
- DOM element
- NodeList or `Array<DOMTargetSelector>`


### Default

`'*'`

Example (javascript):

```javascript
import { createLayout, utils } from 'animejs';

const [ $buttonA, $buttonB ] = utils.$('.controls button');

const layout = createLayout('.layout-container', {
  children: '.item',
  duration: 1000,
});

function animateLayout(swapAt) {
  layout.update(({ root }) => root.classList.toggle('row'), { swapAt });
}

const animateWithoutFade = () => animateLayout({ opacity: 1 });
const animateWithFade = () => animateLayout({ opacity: 0 });

$buttonA.addEventListener('click', animateWithoutFade);
$buttonB.addEventListener('click', animateWithFade);
```

Example (html):

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col"><p>These p tags are not targeted</p></div>
    <div class="item col"><p>So they simply swap between states</p></div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Animate without fade</button>
    <button class="button">Animate with fade</button>
  </fieldset>
</div>
```

---

## delay

Docs: https://animejs.com/documentation/layout/layout-settings/delay · Since 4.3.0

Defines the default delay in milliseconds of all animated layout animations.
 Compatible with the `stagger()` utility function.


### Accepts

- `Number`
- Function based value that returns a `Number` equal to or greater than `0`


### Default

`0`

Example (javascript):

```javascript
import { createLayout, utils, stagger } from 'animejs';

const [ $buttonA, $buttonB ] = utils.$('.controls button');

const layout = createLayout('.layout-container', {
  delay: 500 // Delays the transition by 500ms
});

function animateLayout(delay) {
  // You can override the layout delay in the update() method too
  layout.update(({ root }) => root.classList.toggle('row'), { delay });
}

const animateWith500MsDelay = () => animateLayout();
const animateWithStaggerDelay = () => animateLayout(stagger(150));

$buttonA.addEventListener('click', animateWith500MsDelay);
$buttonB.addEventListener('click', animateWithStaggerDelay);
```

Example (html):

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col">Item 1</div>
    <div class="item col">Item 2</div>
    <div class="item col">Item 3</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">500 ms delay</button>
    <button class="button">Staggered delay</button>
  </fieldset>
</div>
```

---

## duration

Docs: https://animejs.com/documentation/layout/layout-settings/duration · Since 4.3.0

Defines the duration in milliseconds of all animated layout elements.
 Compatible with the `stagger()` utility function.


### Accepts

- `Number` equal to or greater than `0`
- Function based value that returns a `Number` equal to or greater than `0`


### Default

`350`

Example (javascript):

```javascript
import { createLayout, utils } from 'animejs';

const [ $rootA, $rootB ] = utils.$('.layout-container');
const [ $buttonA, $buttonB ] = utils.$('.controls button');

const layoutA = createLayout($rootA);
const layoutB = createLayout($rootB, { duration: 1000 });

function animateLayoutA() {
  layoutA.update(({ root }) => root.classList.toggle('row'));
}

function animateLayoutB() {
  layoutB.update(({ root }) => root.classList.toggle('row'));
}

$buttonA.addEventListener('click', animateLayoutA);
$buttonB.addEventListener('click', animateLayoutB);
```

Example (html):

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col">default</div>
    <div class="item col">duration</div>
  </div>
  <div class="layout-container col grid-layout row">
    <div class="item col">1000ms</div>
    <div class="item col">duration</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Animate default</button>
    <button class="button">Animate 1000ms</button>
  </fieldset>
</div>
```

---

## ease

Docs: https://animejs.com/documentation/layout/layout-settings/ease · Since 4.3.0

Sets the default easing curve or spring applied to every animation during a layout transition.


### Accepts

- An easing `Function`
- A built-in ease `String`
- A Function based value that returns an easing `Function` or a built-in ease `String`


### Default

`'inOut(3.5)'`

Example (javascript):

```javascript
import { createLayout, utils, spring } from 'animejs';

const [ $buttonA, $buttonB ] = utils.$('.controls button');

const layout = createLayout('.layout-container', {
  ease: 'outExpo'
});

function animateLayout(ease) {
  // You can override the layout default ease in the update() method parameters
  layout.update(({ root }) => root.classList.toggle('row'), { ease });
}

const animateWith500MsDelay = () => animateLayout();
const animateWithStaggerDelay = () => animateLayout(spring());

$buttonA.addEventListener('click', animateWith500MsDelay);
$buttonB.addEventListener('click', animateWithStaggerDelay);
```

Example (html):

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col">Item 1</div>
    <div class="item col">Item 2</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">'outExpo'</button>
    <button class="button">spring()</button>
  </fieldset>
</div>
```

---

## properties

Docs: https://animejs.com/documentation/layout/layout-settings/properties · Since 4.3.0

Extends the list of CSS properties automatically measured and animated during layout transitions.
 Position and dimensions are always handled internally. Use this to add custom properties like CSS variables or properties not included in the defaults.


### Accepts

- `Array` of CSS property name `String`s (including CSS custom properties like `'--my-var'`)


### Default

```js
[
  'opacity',
  'fontSize',
  'color',
  'backgroundColor',
  'borderRadius',
  'border',
  'filter',
  'clipPath'
]
```

Example (javascript):

```javascript
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout-container', {
  duration: 800,
  properties: ['boxShadow']
});

function animateLayout() {
  layout.update(({ root }) => root.classList.toggle('row'));
}

$button.addEventListener('click', animateLayout);
```

Example (html):

```html
<div class="large layout centered row">
  <div class="layout-container grid-layout row">
    <div class="item col">animate</div>
    <div class="item col">box-shadow</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Animate</button>
  </fieldset>
</div>
```

---

## States parameters

Docs: https://animejs.com/documentation/layout/states-parameters · Since 4.3.0

Defines properties applied to elements during specific transition phases: entering the layout, leaving the layout, or swapping position.

```js
import { createLayout } from 'animejs';

createLayout('.layout-container', {
  children: '.item',
  duration: 350,
  delay: 0,
  ease: 'inOut(3.5)',
  properties: ['boxShadow'],
┌─────────────────────────────┐
│ enterFrom: { opacity: 0 },  │
│ leaveTo: { opacity: 0 },    ├─ State Parameters
│ swapAt: { opacity: 0 },     │
└─────────────────────────────┘
  onBegin: () => {},
  onUpdate: () => {},
  onComplete: () => {},
}).then(() => {});
```

Each parameter accepts an `Object` of CSS properties with optional `delay`, `duration`, and `ease` overrides.

After calling `layout.update()` or `layout.animate()`, corresponding element arrays are available on the layout instance:

| Array | Contains |
|---|---|
| `layout.entering` | Elements that appeared in the layout |
| `layout.leaving` | Elements that disappeared from the layout |
| `layout.swapping` | Non-animated children during transitions |

These arrays are cleared and repopulated on each `.animate()` call.

---

## enterFrom

Docs: https://animejs.com/documentation/layout/states-parameters/enterFrom · Since 4.3.0

Defines the initial properties and transition timings applied to elements entering the layout.
 An element is considered entering if one of these conditions is met:

- The element becomes visible from `display: none`
- The element becomes visible from `visibility: hidden`
- The element has just been added to the layout (e.g. `$root.appendChild($el)`)


### Accepted properties

Any valid CSS property can be set.

State animations don't support CSS transform shorthands yet.

```js
enterFrom: { x: 100, y: 200 } // Invalid
enterFrom: { transform: 'translate(100px, 200px)' } // Valid
```


### Accepts

An `Object` parameters with the following properties:

- CSS property names: `Number|String|Function`
- `delay`: `Number|Function`
- `duration`: `Number|Function`
- `ease`: `String|Function`


### Default

`{ opacity: 0 }`

Example (javascript):

```javascript
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout-container', {
  duration: 250,
  ease: 'outQuad',
  enterFrom: {
    transform: 'translateY(100px) scale(.25)',
    opacity: 0,
    duration: 350, // Applied to the elements entering the layout
    ease: 'out(3)' // Applied to the elements entering the layout
  }
});

let count = 0;

function addItem() {
  layout.update(({ root }) => {
    const $item = document.createElement('div');
    $item.classList.add('item', 'col');
    $item.innerHTML = ++count;
    if (count > 15) return $button.disabled = true;
    root.appendChild($item);
  });
}

$button.addEventListener('click', addItem);
```

Example (html):

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">

  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Add item</button>
  </fieldset>
</div>
```

---

## leaveTo

Docs: https://animejs.com/documentation/layout/states-parameters/leaveTo · Since 4.3.0

Defines the final properties and transition timings applied to elements leaving the layout.
 An element is considered leaving if one of these conditions is met:

- The element becomes hidden with `display: none`
- The element becomes hidden with `visibility: hidden`


### Accepted properties

Any valid CSS property can be set.

State animations don't support CSS transform shorthands yet.

```js
leaveTo: { x: 100, y: 200 } // Invalid
leaveTo: { transform: 'translate(100px, 200px)' } // Valid
```


### Accepts

An `Object` parameters with the following properties:

- CSS property names: `Number|String|Function`
- `delay`: `Number|Function`
- `duration`: `Number|Function`
- `ease`: `String|Function`


### Default

`{ opacity: 0 }`

Example (javascript):

```javascript
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout-container', {
  duration: 250,
  ease: 'outQuad',
  leaveTo: {
    transform: 'translateY(-100px) scale(.25)',
    opacity: 0,
    duration: 350, // Applied to the elements leaving the layout
    ease: 'out(3)' // Applied to the elements leaving the layout
  }
});

function removeItem() {
  layout.update(({ root }) => {
    const items = root.querySelectorAll('.item:not(.is-hidden)');
    if (!items.length) return $button.disabled = true;
    items[0].classList.add('is-hidden'); // temporarily hide the element using `display: none`
  }).then(() => {
    // Remove the elements from the DOM when the animation finishes
    layout.leaving.forEach($el => $el.remove());
  });
}

$button.addEventListener('click', removeItem);
```

Example (html):

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col">1</div>
    <div class="item col">2</div>
    <div class="item col">3</div>
    <div class="item col">4</div>
    <div class="item col">5</div>
    <div class="item col">6</div>
    <div class="item col">7</div>
    <div class="item col">8</div>
    <div class="item col">9</div>
    <div class="item col">10</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Remove item</button>
  </fieldset>
</div>
```

---

## swapAt

Docs: https://animejs.com/documentation/layout/states-parameters/swapAt · Since 4.3.0

Defines the mid-transition properties applied to non-animated children of animated elements.
 The animation interpolates to these values at 50% progress, then back to the element's computed state.


### Accepted properties

Any valid CSS property can be set.

State animations don't support CSS transform shorthands yet.

```js
swapAt: { scale: 1.2 } // Invalid
swapAt: { transform: 'scale(1.2)' } // Valid
```


### Accepts

An `Object` parameters with the following properties:

- CSS property names: `Number|String|Function`
- `delay`: `Number|Function`
- `duration`: `Number|Function`
- `ease`: `String|Function`


### Default

`{ opacity: 0, ease: 'inOut(1.75)' }`

Example (javascript):

```javascript
import { createLayout, utils } from 'animejs';

const [ $buttonA, $buttonB ] = utils.$('.controls button');

const layout = createLayout('.layout-container', {
  children: '.item',
  duration: 1000,
});

function animateLayout(swapAt) {
  layout.update(({ root }) => root.classList.toggle('row'), { swapAt });
}

const animateWithFade = () => animateLayout({ opacity: 0, filter: 'blur(3px)' });
const animateWithoutFade = () => animateLayout({ opacity: 1 });

$buttonA.addEventListener('click', animateWithFade);
$buttonB.addEventListener('click', animateWithoutFade);
```

Example (html):

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col"><p>These p tags are not animated</p></div>
    <div class="item col"><p>They only swap at 50% progress</p></div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Animate with fade</button>
    <button class="button">Animate without fade</button>
  </fieldset>
</div>
```

---

## Usage

Docs: https://animejs.com/documentation/layout/usage · Since 4.3.0

### With thelayout.record()&layout.animate()combo

Create and `record()` the initial state of a layout:

```js
const layout = createLayout(rootEl);

layout.record();
```

Change the layout state (update CSS, remove or add elements, etc.):

```js
rootEl.classList.toggle('row');
```

`animate()` from the old state to the new one automatically:

```js
layout.animate();
```


### Withlayout.update()

Or even simpler, by updating the DOM state inside the `update()` callback in one single call:

```js
const layout = createLayout(rootEl);

layout.update(() => rootEl.classList.toggle('row'));
```

---

## Modal dialog animation

Docs: https://animejs.com/documentation/layout/usage/animate-modal-dialog · Since 4.3.0

Easily create seamless transitions between a clickable element and its expanded version inside a modal.
 You can even animate from elements outside of the specified root by using a combination of layout ids and specifying children.

Example (javascript):

```javascript
import { createLayout, utils } from 'animejs';

const buttons = utils.$('button');

// Create demo dialog and append it to the body
const $dialog = document.createElement('dialog');
$dialog.id = 'layout-dialog';
document.body.appendChild($dialog);

// Create the modal layout by setting the dialog as the root
// Since the elements are not yet part of the modal root, it's necessary to specify all animated children
// to tell the layout what to look for during an update
const modalLayout = createLayout($dialog, {
  children: ['.item', 'h2', 'h3', 'p'],
  properties: ['--overlay-alpha'],
});

const closeModal = (e) => {
  let $item;
  modalLayout.update(({ root }) => {
    $dialog.close();
    $item = buttons.find(item => item.classList.contains('is-open'));
    $item.classList.remove('is-open'); // Makes the clicked element visible again
    $item.focus(); // Focus to the closed element to preserve the keyboard navigation flow
  });
};

const openModal = e => {
  const $target = e.target;
  const $item = $target.closest('.item');
  const $clone = $item.cloneNode(true);
  $dialog.innerHTML = ''; // Make sure old clones are removed from the modal before adding a new one
  $dialog.appendChild($clone); // Append the clicked element clone to the modal
  modalLayout.update(() => {
    $dialog.showModal(); // Open the modal
    $item.classList.add('is-open'); // Hide the clicked element
  }, {
    duration: $item.dataset.duration // Custom duration depending of the button clicked
  });
}

buttons.forEach($button => $button.addEventListener('click', openModal));
$dialog.addEventListener('cancel', closeModal);
$dialog.addEventListener('click', closeModal);
```

Example (html):

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <button data-layout-id="A" data-duration="500" class="button item col">
      <h2 data-layout-id="A-title">Item A</h2>
      <h3 data-layout-id="A-duration">(500ms)</h3>
      <p>This p tag is hidden by default and only visible when appended inside the dialog element. Its position and opacity are automatically animated.</p>
    </button>
    <button data-layout-id="B" data-duration="1000" class="button item col">
      <h2 data-layout-id="B-title">Item B</h2>
      <h3 data-layout-id="B-duration">(1000ms)</h3>
      <p>This p tag is hidden by default and only visible when appended inside the dialog element. Its position and opacity are automatically animated.</p>
    </button>
    <button data-layout-id="C" data-duration="2000" class="button item col">
      <h2 data-layout-id="C-title">Item C</h2>
      <h3 data-layout-id="B-duration">(2000ms)</h3>
      <p>This p tag is hidden by default and only visible when appended inside the dialog element. Its position and opacity are automatically animated.</p>
    </button>
  </div>
</div>
```

---

## CSS display property animation

Docs: https://animejs.com/documentation/layout/usage/css-display-property-animation · Since 4.3.0

An `AutoLayout` can automatically animate between CSS display properties, like `flex`, `grid` or `none`.
 It's also possible to define custom entering and leaving states for children elements that get hidden with `display: none` or `visibility: hidden`.

Example (javascript):

```javascript
import { createLayout, utils, stagger } from 'animejs';

const [ $button ] = utils.$('.controls button');
const items = utils.$('.item');

const displayClasses = [
  'flex-row',
  'grid-1',
  'flex-col',
  'none',
  'grid-2',
  'flex-row-reverse',
];

const layout = createLayout('.layout-container', {
  // Custom animation state for elements leaving the layout with display: none
  leaveTo: {
    transform: 'scale(0)',
    delay: stagger(75),
  },
});

let index = 0;

function animateLayout() {
  layout.update(({ root }) => {
    root.classList.remove(displayClasses[index]);
    index++;
    if (index > displayClasses.length - 1) index = 0;
    root.classList.add(displayClasses[index]);
    $button.innerText = displayClasses[index];
  });
}

$button.addEventListener('click', animateLayout);
```

Example (html):

```html
<div class="large layout centered row">
  <div class="layout-container flex-row">
    <div class="item col">Item A</div>
    <div class="item col">Item B</div>
    <div class="item col">Item C</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">flex-row</button>
  </fieldset>
</div>
```

---

## DOM order change animation

Docs: https://animejs.com/documentation/layout/usage/dom-order-change-animation · Since 4.3.0

Automatically animates DOM order changes.

Example (javascript):

```javascript
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout-container');

function animateLayout() {
  layout.update(({ root }) => {
    const items = [...root.querySelectorAll('.item')];
    utils.shuffle(items).forEach($el => root.appendChild($el))
  });
}

$button.addEventListener('click', animateLayout);
```

Example (html):

```html
<div class="large layout centered row">
  <div class="layout-container row">
    <div class="item col">A</div>
    <div class="item col">B</div>
    <div class="item col">C</div>
    <div class="item col">D</div>
    <div class="item col">E</div>
    <div class="item col">F</div>
    <div class="item col">G</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Shuffle</button>
  </fieldset>
</div>
```

---

## Enter layout animation

Docs: https://animejs.com/documentation/layout/usage/enter-layout-animation · Since 4.3.0

Automatically animates elements entering the layout, and optionally specifies initial properties and timings using the `enterFrom` state parameters (default opacity: 0).

Example (javascript):

```javascript
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout-container', {
  duration: 250,
  ease: 'outQuad',
  enterFrom: {
    transform: 'translateY(100px) scale(.25)',
    opacity: 0,
    duration: 350, // Applied to the elements entering the layout
    ease: 'out(3)' // Applied to the elements entering the layout
  }
});

let count = 0;

function addItem() {
  layout.update(({ root }) => {
    const $item = document.createElement('div');
    $item.classList.add('item', 'col');
    $item.innerHTML = ++count;
    if (count > 15) return $button.disabled = true;
    root.appendChild($item);
  });
}

$button.addEventListener('click', addItem);
```

Example (html):

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">

  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Add item</button>
  </fieldset>
</div>
```

---

## Exit layout animation

Docs: https://animejs.com/documentation/layout/usage/exit-layout-animation · Since 4.3.0

Automatically animates elements leaving the layout, and optionally specifies their final properties and timings using the `leaveTo` state parameters (defaults to opacity: 0).

Example (javascript):

```javascript
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout-container', {
  duration: 250,
  ease: 'outQuad',
  leaveTo: {
    transform: 'translateY(-100px) scale(.25)',
    opacity: 0,
    duration: 350, // Applied to the elements leaving the layout
    ease: 'out(3)' // Applied to the elements leaving the layout
  }
});

function removeItem() {
  layout.update(({ root }) => {
    const items = root.querySelectorAll('.item:not(.is-hidden)');
    if (!items.length) return $button.disabled = true;
    items[0].classList.add('is-hidden'); // temporarily hide the element using `display: none`
  }).then(() => {
    // Remove the elements from the DOM when the animation finishes
    layout.leaving.forEach($el => $el.remove());
  });
}

$button.addEventListener('click', removeItem);
```

Example (html):

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col">1</div>
    <div class="item col">2</div>
    <div class="item col">3</div>
    <div class="item col">4</div>
    <div class="item col">5</div>
    <div class="item col">6</div>
    <div class="item col">7</div>
    <div class="item col">8</div>
    <div class="item col">9</div>
    <div class="item col">10</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Remove item</button>
  </fieldset>
</div>
```

---

## Specifying a root

Docs: https://animejs.com/documentation/layout/usage/specifying-a-root · Since 4.3.0

The root is the only mandatory parameter needed to create a layout.
 It defines the root element measured by the layout, and limits all `children` queries to descendants of that element.
 By default, all children of a layout are animated.
 You can also target elements outside the root by manually defining layout id data attributes (see the modal example).


### Accepts

- CSS selector
- DOM element


### Default

Required

Example (javascript):

```javascript
import { createLayout, utils } from 'animejs';

const [ $rootA, $rootB ] = utils.$('.layout-container');
const [ $buttonA, $buttonB ] = utils.$('.controls button');

const layoutA = createLayout($rootA);
const layoutB = createLayout($rootB);

function animateLayoutA() {
  layoutA.update(({ root }) => root.classList.toggle('row'));
}

function animateLayoutB() {
  layoutB.update(({ root }) => root.classList.toggle('row'));
}

$buttonA.addEventListener('click', animateLayoutA);
$buttonB.addEventListener('click', animateLayoutB);
```

Example (html):

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col">A 1</div>
    <div class="item col">A 2</div>
  </div>
  <div class="layout-container col grid-layout row">
    <div class="item col">B 1</div>
    <div class="item col">B 2</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Animate A</button>
    <button class="button">Animate B</button>
  </fieldset>
</div>
```

---

## Staggered layout animation

Docs: https://animejs.com/documentation/layout/usage/staggered-layout-animation · Since 4.3.0

The `AutoLayout` `delay` property accepts the `stagger()` utility method to easily create staggered animations of layout children changes.

Example (javascript):

```javascript
import { createLayout, utils, stagger } from 'animejs';

const [ $button ] = utils.$('.controls button');
const [ $root ] = utils.$('.layout-container');
const items = utils.$('.item');

const layout = createLayout($root, { ease: 'outExpo' });

function animateLayout() {
  layout.update(() => {
    $root.classList.toggle('row');
  }, {
    // Different stagger "from" param depending on the layout state
    delay: stagger(50, { from: $root.classList.contains('row') ? 'last' : 'first' })
  });
}

$button.addEventListener('click', animateLayout);
```

Example (html):

```html
<div class="large layout centered row">
  <div class="layout-container">
    <div class="item col">Item A</div>
    <div class="item col">Item B</div>
    <div class="item col">Item C</div>
    <div class="item col">Item D</div>
    <div class="item col">Item E</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Stagger animation</button>
  </fieldset>
</div>
```

---

## Swap parent animation

Docs: https://animejs.com/documentation/layout/usage/swap-parent-animation · Since 4.3.0

Automatically animates children elements being moved from one parent to another.

Example (javascript):

```javascript
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout');

function animateLayout() {
  layout.update(({ root }) => {
    const $child = root.querySelector('.item');
    const $parent = $child.parentElement;
    const $nextParent = $parent.nextElementSibling || $parent.previousElementSibling;
    $parent.style.zIndex = '0';
    $nextParent.style.zIndex = '1';
    $nextParent.appendChild($child);
  })
}

$button.addEventListener('click', animateLayout);
```

Example (html):

```html
<div class="large layout centered row">
  <div class="layout-container container-a col grid-layout row">
    <div class="item col">Item A</div>
  </div>
  <div class="layout-container container-b col grid-layout row">
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Swap parent</button>
  </fieldset>
</div>
```

---

