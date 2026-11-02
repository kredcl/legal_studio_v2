# Anime.js v4 · Scope

Source: official documentation at https://animejs.com/documentation (MIT-licensed library by Julian Garnier).

## Scope

Docs: https://animejs.com/documentation/scope

### Anime.js instances declared inside a Scope can react to media queries, use custom root elements, share default parameters, and be reverted in batch, streamlining work in responsive and component-based environments.

Scopes are created using the `createScope()` method imported from the main `'animejs'` module:

```js
import { createScope } from 'animejs';

const scope = createScope(parameters);
```

Or imported as a standalone module from the `'animejs/scope'` subpath:

```js
import { createScope } from 'animejs/scope';
```


### Parameters

| Name | Accepts |
|---|---|
| parameters (opt) | Scope parameters |


### Returns

`Scope`

Example (javascript):

```javascript
import { animate, utils, createScope } from 'animejs';

createScope({
  mediaQueries: {
    isSmall: '(max-width: 200px)',
    reduceMotion: '(prefers-reduced-motion)',
  }
})
.add(self => {

  const { isSmall, reduceMotion } = self.matches;
  
  if (isSmall) {
    utils.set('.square', { scale: .5 });
  }
    
  animate('.square', {
    x: isSmall ? 0 : ['-35vw', '35vw'],
    y: isSmall ? ['-40vh', '40vh'] : 0,
    loop: true,
    alternate: true,
    duration: reduceMotion ? 0 : isSmall ? 750 : 1250
  });

});
```

Example (html):

```html
<div class="iframe-content resizable">
  <div class="large centered row">
    <div class="col">
      <div class="square"></div>
    </div>
  </div>
</div>
```

---

## Add constructor function

Docs: https://animejs.com/documentation/scope/add-constructor-function · Since 4.0.0

A constructor function is called inside the Scope's context immediately after being passed as a callback of the Scope's `add()` or `addOnce()` method.
 The Scope registers and keeps track of all animations, timers, timelines, animatables, draggables, onScrolls, and even other scopes declared inside the constructor function.

```js
// Execute a constructor every time a media query changes
scope.add(constructor);

// Execute a constructor once
scope.addOnce(constructorFunction);
```


### Constructor function argument

| Name | Type |
|---|---|
| self | The current Scope instance |


### Returns(optional)

A cleanup `Function` called when the Scope is reverted or when a media query changes.

Example (javascript):

```javascript
import { utils, animate, createScope, createDraggable } from 'animejs';

createScope({
  mediaQueries: { isSmall: '(max-width: 200px)' },
  defaults: { ease: 'linear' },
})
.add(self => {

  /* Media queries state are accessible on the matches property */
  const { isSmall } = self.matches;
  /* The $() utility method is also scoped */
  const [ $square ] = utils.$('.square');

  if (self.matches.isSmall) {
    /* Only animate the square when the iframe is small */
    animate($square, {
      rotate: 360,
      loop: true,
    });
  } else {
    /* Only create the draggable when the iframe is large enough */
    $square.classList.add('draggable');
    createDraggable($square, {
      container: document.body,
    });
  }
  
  return () => {
    /* Removes the class 'draggable' when the scope reverts itself */
    $square.classList.remove('draggable');
  }

});
```

Example (html):

```html
<div class="iframe-content resizable">
  <div class="large centered row">
    <div class="col">
      <div class="square"></div>
    </div>
  </div>
</div>
```

---

## Register method function

Docs: https://animejs.com/documentation/scope/register-method-function · Since 4.0.0

A method can be registered within a Scope by passing a `String` name and a `Function` to the Scope's `add()` method. Once registered, the method becomes available on the Scope instance's `methods` object. This allows the method to be called from outside the Scope while maintaining its execution context within the Scope.

```js
scope.add('methodName', methodFunction); // Register the method

scope.methods.methodName(); // Execute the method
```


### Method arguments

| Name | Type |
|---|---|
| ...args | Any |

Example (javascript):

```javascript
import { utils, animate, createScope } from 'animejs';

const scope = createScope({
  mediaQueries: { isSmall: '(max-width: 200px)' },
})
.add(self => {

  /* Registering the method inside the scope allows access to the scope itself */
  self.add('onClick', (e) => {

    const { clientX, clientY } = e;
    const { isSmall } = self.matches;

    animate('.square', {
      rotate: isSmall ? '+=360' : 0,
      x: isSmall ? 0 : clientX - (window.innerWidth / 2),
      y: isSmall ? 0 : clientY - (window.innerHeight / 2),
      duration: isSmall ? 750 : 400,
    });
    
  });
  
  utils.set(document.body, {
    cursor: self.matches.isSmall ? 'alias' : 'crosshair'
  });
  
});

/* Methods can be called outside the scope */
document.addEventListener('click', scope.methods.onClick);
```

Example (html):

```html
<div class="iframe-content resizable">
  <div class="large centered row">
    <div class="col">
      <div class="square"></div>
    </div>
  </div>
</div>
```

---

## Scope methods

Docs: https://animejs.com/documentation/scope/scope-methods · Since 4.0.0

Methods available on the `Scope` instance returned by a `createScope()` function.

```js
const scope = createScope(parameters);
      ┌──────────┐
scope.│add()     │
scope.│refresh() ├─ Methods
scope.│revert()  │
      └──────────┘
```

---

## add()

Docs: https://animejs.com/documentation/scope/scope-methods/add · Since 4.0.0

Adds constructor or registers method functions to a Scope.


### Parameters for adding a constructor

```js
scope.add(constructor);
```

| Name | Accepts |
|---|---|
| constructor | A constructor `Function` |


### Parameters for registering a method

```js
scope.add(name, method);
```

| Name | Accepts |
|---|---|
| name | A `String` used to store and access the method |
| method | A method `Function` |


### Returns

The Scope itself

Example (javascript):

```javascript
import { createScope, createAnimatable, createDraggable } from 'animejs';

const scope = createScope({
  mediaQueries: {
    isSmall: '(max-width: 200px)',
  }
})
.add(self => {

  const [ $circle ] = utils.$('.circle');
    
  if (self.matches.isSmall) {
    $circle.classList.add('draggable');
    self.circle = createDraggable($circle, {
      container: document.body,
    });
  } else {
    $circle.classList.remove('draggable');
    self.circle = createAnimatable($circle, {
      x: 500,
      y: 500,
      ease: 'out(3)'
    });
  }
  
  let win = { w: window.innerWidth, h: window.innerHeight };
  
  self.add('refreshBounds', () => {
    win.w = window.innerWidth;
    win.h = window.innerHeight;
  });
      
  self.add('onMouseMove', e => {
    if (self.matches.isSmall) return;
    const { w, h } = win;
    const hw = w / 2;
    const hh = h / 2;
    const x = utils.clamp(e.clientX - hw, -hw, hw);
    const y = utils.clamp(e.clientY - hh, -hh, hh);
    if (self.circle.x) {
      self.circle.x(x);
      self.circle.y(y);
    }
  });
  
  self.add('onPointerDown', e => {
    const { isSmall } = self.matches;
    animate($circle, {
      scale: [
        { to: isSmall ? 1.25 : .25, duration: isSmall ? 50 : 150 },
        { to: 1, duration: isSmall ? 250 : 500 },
      ]
    });
  });
  
});

window.addEventListener('resize', scope.methods.refreshBounds);
window.addEventListener('mousemove', scope.methods.onMouseMove);
document.addEventListener('pointerdown', scope.methods.onPointerDown);
```

Example (html):

```html
<div class="iframe-content resizable">
  <div class="large centered row">
    <div class="col">
      <div class="circle"></div>
    </div>
  </div>
</div>
```

---

## addOnce()

Docs: https://animejs.com/documentation/scope/scope-methods/addonce · Since 4.1.0

Adds a constructor to a Scope that is only called once, allowing you to execute code once and add scoped animations that won't be reverted between media query changes.

```js
scope.addOnce(constructor);
```

| Name | Accepts |
|---|---|
| constructor | A constructor `Function` |


### Returns

The `Scope` itself

> `scope.addOnce()` calls cannot be conditional, as it defeats the purpose and will mess with keeping track of which callbacks have already been executed or not.
> 
> ```js
> // Don't do this
> if (scope.matches.small) {
>   scope.addOnce(() => { animate(target, params) });
> }
> // Do this
> scope.addOnce() => { animate(target, params) });
> ```

Example (javascript):

```javascript
import { createScope, createTimeline, utils, stagger } from 'animejs';

const scope = createScope({
  mediaQueries: {
    isSmall: '(max-width: 200px)',
  }
})
.add(self => {
 
  self.addOnce(() => {
    /* Animations declared here won't be reverted between mediaqueries changes */
    createTimeline().add('.circle', {
      backgroundColor: [
        $el => utils.get($el, `--hex-red-1`),
        $el => utils.get($el, `--hex-citrus-1`),
      ],
      loop: true,
      alternate: true,
      duration: 2000,
    }, stagger(100));
  });
 
  self.add(() => {
    createTimeline().add('.circle', {
      x: self.matches.isSmall ? [-30, 30] : [-70, 70],
      scale: [.5, 1.1],
      loop: true,
      alternate: true,
    }, stagger(100)).init();
  });
      
});
```

Example (html):

```html
<div class="iframe-content resizable">
  <div class="scopped small centered">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
  </div>
</div>
```

---

## keepTime()

Docs: https://animejs.com/documentation/scope/scope-methods/keeptime · Since 4.1.0

Adds a constructor `Function` that recreates a `Timer`, `Animation`, or `Timeline` between media query changes while keeping track of its current time, allowing to seamlessly update an animation's parameters without breaking the playback state.

```js
scope.keepTime(() => animate(target, parameters));
```


### Parameters

| Name | Accepts |
|---|---|
| constructor | A `Function` that returns a `Timer`, `Animation`, or `Timeline` |


### Returns

The `Timer`, `Animation`, or `Timeline` returned by the constructor

> `scope.keepTime()` calls cannot be conditional, as it defeats the purpose and will mess with keeping track of which callbacks have already been executed or not.
> 
> ```js
> // Don't do this
> if (scope.matches.small) {
>   scope.keepTime(() => animate(target, params));
> }
> // Do this
> scope.keepTime(() => animate(target, params));
> ```

Example (javascript):

```javascript
import { createScope, createTimeline, utils, stagger } from 'animejs';

const scope = createScope({
  mediaQueries: {
    isSmall: '(max-width: 200px)',
  }
})
.add(self => {
 
  self.addOnce(() => {
    /* Animations declared here won't be reverted between mediaqueries changes */
    createTimeline().add('.circle', {
      backgroundColor: [
        $el => utils.get($el, `--hex-red-1`),
        $el => utils.get($el, `--hex-citrus-1`),
      ],
      loop: true,
      alternate: true,
      duration: 2000,
    }, stagger(100));
  });
 
  self.keepTime(() => createTimeline().add('.circle', {
    x: self.matches.isSmall ? [-30, 30] : [-70, 70],
    scale: [.5, 1.1],
    loop: true,
    alternate: true,
  }, stagger(100)).init());
      
});
```

Example (html):

```html
<div class="iframe-content resizable">
  <div class="scopped small centered">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
  </div>
</div>
```

---

## refresh()

Docs: https://animejs.com/documentation/scope/scope-methods/refresh · Since 4.0.0

Reverts the Scope and rebuild it by calling every constructor functions.
 Internally, `refresh()` is called every time a media query state changes.


### Returns

The Scope itself

Example (javascript):

```javascript
import { utils, stagger, createScope, createTimeline } from 'animejs';

const [ $button1, $button2 ] = utils.$('.refresh');

const scopeConstructor = scope => {
  const circles = utils.$('.circle');
  if (scope.i === undefined || scope.i > circles.length - 1) scope.i = 0;
  const i = scope.i++;
  
  utils.set(circles, {
    opacity: stagger([1, .25], { from: i, ease: 'out(3)' }),
  });
  
  createTimeline()
  .add(circles, {
    scale: [{ to: [.5, 1], duration: 250 }, { to: .5, duration: 750 }],
    duration: 750,
    loop: true,
  }, stagger(50, { from: i }))
  .seek(750)
}

const scope1 = createScope({ root: '.row-1' }).add(scopeConstructor);
const scope2 = createScope({ root: '.row-2' }).add(scopeConstructor);

const refreshScope1 = () => scope1.refresh();
const refreshScope2 = () => scope2.refresh();

$button1.addEventListener('click', refreshScope1);
$button2.addEventListener('click', refreshScope2);
```

Example (html):

```html
<div class="medium justified row row-1">
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
</div>
<div class="medium justified row row-2">
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button refresh">Refresh row 1</button>
    <button class="button refresh">Refresh row 2</button>
  </fieldset>
</div>
```

---

## revert()

Docs: https://animejs.com/documentation/scope/scope-methods/revert · Since 4.0.0

Reverts all Anime.js objects that have been declared inside a Scope and call the constructors cleanup functions if needed.


### Returns

The Scope itself

Example (javascript):

```javascript
import { utils, stagger, createScope, createTimeline } from 'animejs';

const [ $button1, $button2 ] = utils.$('.revert');

function onMouseEnter() { animate(this, { scale: 2, duration: 250 }) }
function onMouseLeave() { animate(this, { scale: 1, duration: 750 }) }

const scopeConstructor = scope => {
  const circles = utils.$('.circle');
    
  circles.forEach(($circle, i) => {
    animate($circle, {
      opacity: .25,
      loop: true,
      alternate: true,
      duration: 500,
      delay: i * 100,
      ease: 'inOut(3)',
    });
    $circle.addEventListener('mouseenter', onMouseEnter);
    $circle.addEventListener('mouseleave', onMouseLeave);
  });
  
  // Cleanup function to take care of removing event listeners on revert
  return () => {
    circles.forEach($circle => {
      // Anime.js instances are automatically reverted by the Scope
      $circle.removeEventListener('mouseenter', onMouseEnter);
      $circle.removeEventListener('mouseleave', onMouseLeave);
    });
  }
}

const scope1 = createScope({ root: '.row-1' }).add(scopeConstructor);
const scope2 = createScope({ root: '.row-2' }).add(scopeConstructor);

const revertScope1 = () => scope1.revert();
const revertScope2 = () => scope2.revert();

$button1.addEventListener('click', revertScope1);
$button2.addEventListener('click', revertScope2);
```

Example (html):

```html
<div class="medium justified row row-1">
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
</div>
<div class="medium justified row row-2">
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button revert">Revert row 1</button>
    <button class="button revert">Revert row 2</button>
  </fieldset>
</div>
```

---

## Scope parameters

Docs: https://animejs.com/documentation/scope/scope-parameters · Since 4.0.0

```js
import { createScope, animate } from 'animejs';

createScope({
┌─────────────────────────────────────────────────┐
│ root: '.section',                               │
│ defaults: {                                     │
│   duration: 250,                                │
│   ease: 'out(4)',                               │
│ },                                              ├─ Parameters
│ mediaQueries: {                                 │
│   mobile: '(max-width: 640px)',                 │
│   reducedMotion: '(prefers-reduced-motion)',    │
│ }                                               │
└─────────────────────────────────────────────────┘
})
.add( ctx => {
  const isMobile = ctx.matches.mobile;
  const reduceMotion = ctx.matches.reducedMotion;
  animate(targets, {
    x: isMobile ? 0 : '100vw',
    y: isMobile ? '100vh' : 0,
    duration: reduceMotion ? 0 : 750
  });
});
```

---

## defaults

Docs: https://animejs.com/documentation/scope/scope-parameters/defaults · Since 4.0.0

Defines the Scope defaults properties which are then used for all Timer, Animation and Timeline created within that scope.


### Accepts

An `Object` with the following optional properties:

| Name | Accepts |
|---|---|
| playbackEase | Easing name `String` \| Easing `Function` |
| playbackRate | `Number` |
| frameRate | `Number` |
| loop | `Number` \| `Boolean` |
| reversed | `Boolean` |
| alternate | `Boolean` |
| autoplay | `Boolean` |
| duration | `Number` \| `Function` |
| delay | `Number` \| `Function` |
| composition | Composition types `String` \| `Function` |
| ease | Easing name `String` \| Easing `Function` |
| loopDelay | `Number` |
| modifier | Modifier `Function` |
| onBegin | Callback `Function` |
| onUpdate | Callback `Function` |
| onRender | Callback `Function` |
| onLoop | Callback `Function` |
| onComplete | Callback `Function` |

Example (javascript):

```javascript
import { createScope, animate } from 'animejs';

const rows = utils.$('.row');

rows.forEach(($row, i) => {
  createScope({
    root: $row,
    defaults: { ease: `out(${1 + i})` }
  })
  .add(() => {
    animate('.square', {
      x: '17rem',
      loop: true,
      alternate: true
    });
  });
});
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">scope 1</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">scope 2</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">scope 3</div>
</div>
```

---

## mediaQueries

Docs: https://animejs.com/documentation/scope/scope-parameters/mediaqueries · Since 4.0.0

Defines the media queries to match for conditionally refreshing the `Scope` when one of their matches state changes.
 Media queries matching states are accessible via the scope `matches` property.


### Accepts

An `Object` where

- `key` is an arbitrary name `String` for the media query.
- `Value` is the media query definition `String`.

Example (javascript):

```javascript
import { createScope, animate } from 'animejs';

createScope({
  mediaQueries: {
    isSmall: '(max-width: 100px)',
    isMedium: '(min-width: 101px) and (max-width: 200px)',
    isLarge: '(min-width: 201px)',
    reduceMotion: '(prefers-reduced-motion)',
  }
})
.add(self => {

  const { isSmall, isMedium, isLarge, reduceMotion } = self.matches;
    
  utils.set('.square', { scale: isMedium ? .75 : isLarge ? 1 : .5 });
    
  animate('.square', {
    x: isSmall ? 0 : ['-35vw', '35vw'],
    y: isSmall ? ['-40vh', '40vh'] : 0,
    rotate: 360,
    loop: true,
    alternate: true,
    duration: reduceMotion ? 0 : isSmall ? 750 : 1250
  });

});
```

Example (html):

```html
<div class="iframe-content resizable">
  <div class="large centered row">
    <div class="col">
      <div class="square"></div>
    </div>
  </div>
</div>
```

---

## root

Docs: https://animejs.com/documentation/scope/scope-parameters/root · Since 4.0.0

Defines a root element limiting all DOM queries within that Scope to descendants of the specified `HTMLElement`. This is particularly useful for creating self-contained animation environments in component-based architectures like React applications.


### Accepts

- CSS Selector
- DOM Element

Example (javascript):

```javascript
import { createScope, animate } from 'animejs';

createScope({ root: '.row:nth-child(2)' })
.add(() => {
  animate('.square', {
    x: '17rem',
    loop: true,
    alternate: true
  });
});
```

Example (html):

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">outside scope</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">inside scope</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">outside scope</div>
</div>
```

---

## Scope properties

Docs: https://animejs.com/documentation/scope/scope-properties · Since 4.0.0

Properties available on the `Scope` instance returned by a `createScope()` function.

```js
const scope = createScope();
      ┌────────┐
scope.│methods │
scope.│root    ├─ Properties
scope.│matches │
      └────────┘
```

| Name | Description |
|---|---|
| data | An object used to store variables associated with the scope. Every properties added to it are cleared when the scope is reverted (`Object`) |
| defaults | Gets the default parameters for this scope (`Object`) |
| root | Gets the root element for DOM operations in this scope (`Document` \| `HTMLElement`) |
| constructors | Gets the array of constructor functions added to this scope (`Array<Function>`) |
| revertConstructors | Gets the array of revert constructor functions (`Array<Function>`) |
| revertibles | Gets the array of revertible objects created within this scope (`Array<Tickable\|Animatable\|Draggable\|ScrollObserver\|Scope>`) |
| methods | Gets the object containing methods added to this scope (`Object`) |
| matches | Gets the object containing current media query match results (`Object`) |
| mediaQueryLists | Gets the object containing MediaQueryList objects for this scope (`Object`) |

---

