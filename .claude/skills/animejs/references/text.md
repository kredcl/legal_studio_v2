# Anime.js v4 · Text

Source: official documentation at https://animejs.com/documentation (MIT-licensed library by Julian Garnier).

## TextNEW

Docs: https://animejs.com/documentation/text

### A collection of utility functions to help with text animations.

All text functions are available on the `text` imported from the main `'animejs'` module:

```js
import { text } from 'animejs';

text.splitText();
text.scrambleText();
```

Or imported directly from the main `'animejs'` module:

```js
import { splitText, scrambleText } from 'animejs';
```

Or imported as a standalone module from the `'animejs/text'` subpath:

```js
import { splitText, scrambleText } from 'animejs/text';
```

---

## scrambleTextNEW

Docs: https://animejs.com/documentation/text/scrambletext · Since 4.4.0

### Animates text with character-by-character scramble and reveal effect.

Reveals an element's text through a scramble animation. Use it directly as a property value in `animate()`.

```js
import { scrambleText } from 'animejs';

animate(target, { innerHTML: scrambleText(parameters) });
```

Or imported as a standalone module from the `'animejs/text'` subpath:

```js
import { scrambleText } from 'animejs/text';
```


### Parameters

| Name | Accepts |
|---|---|
| parameters (opt) | An `Object` of scrambleText parameters |


### Returns

A function-based tween value compatible with `animate()`.

> Apply `scrambleText()` to the `innerHTML` property, as shown above, rather than `textContent`.

Example (javascript):

```javascript
import { animate, scrambleText } from 'animejs';

animate('p', {
  innerHTML: scrambleText(),
  loop: true,
  loopDelay: 1000,
});
```

Example (html):

```html
<div class="large row">
  <p class="text-s text-mono">scrambleText() allows you to reveal a text via a smooth randomized character scramble transition effect.</p>
</div>
```

---

## scrambleText callbacks

Docs: https://animejs.com/documentation/text/scrambletext/scrambletext-callbacks · Since 4.4.0

Execute functions during the scramble text animation.
 Callbacks `Function` are specified directly in the `scrambleText()` parameters `Object`.

```js
animate(target, {
  innerHTML: scrambleText({
    text: 'Hello World',
    chars: 'uppercase',
  ┌────────────────────┐
  │ onChange: () => {} ├─ Callbacks
  └────────────────────┘
  }),
});
```

---

## onChange

Docs: https://animejs.com/documentation/text/scrambletext/scrambletext-callbacks/onchange · Since 4.4.0

Executes a function every time the scrambled text characters are updated.


### Accepts

A `Function` with two arguments: the current scrambled `String` and the animation progress as a `Number` between `0` and `1`


### Default

`noop`

Example (javascript):

```javascript
import { animate, scrambleText, utils } from 'animejs';

const [ $p ] = utils.$('p');
const [ $btn ] = utils.$('button');

const audioCtx = new AudioContext();
let soundEnabled = false;

const tickSound = () => {
  if (!soundEnabled) return;
  const t = audioCtx.currentTime;
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = 'sine';
  o.frequency.setValueAtTime(4000 + Math.random() * 400, t);
  g.gain.setValueAtTime(0.001, t);
  g.gain.linearRampToValueAtTime(0.035, t + 0.001);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.003);
  o.connect(g).connect(audioCtx.destination);
  o.start(t);
  o.stop(t + 0.003);
};

$btn.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  if (soundEnabled) audioCtx.resume();
  $btn.textContent = soundEnabled ? 'Sound ON' : 'Sound OFF';
});

animate($p, {
  innerHTML: scrambleText({ onChange: tickSound }),
  loop: true,
  loopDelay: 1500,
});
```

Example (html):

```html
<div class="large row">
  <p class="text-s text-mono">Use the onChange callback to trigger a tick sound on every character update.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Sound OFF</button>
  </fieldset>
</div>
```

---

## scrambleText parameters

Docs: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters

Configures the scramble text animation behaviour.

```js
animate(target, {
  innerHTML: scrambleText({
  ┌──────────────────────────┐
  │ text: 'Hello World',     │
  │ chars: 'uppercase',      │
  │ from: 'center',          │
  │ cursor: '_',             ├─ Parameters
  │ settleDuration: 500,     │
  │ revealRate: 60,          │
  │ settleRate: 30,          │
  └──────────────────────────┘
  }),
});
```

---

## chars

Docs: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/chars

Characters used during the scramble animation. Accepts a literal string of characters `'ABC123'`, range syntax `'a-d'` (expands to `'abcd'` by Unicode code point order), or a combination of both: `'a-zA-Z0-9'`.


### Accepts

- `String` (literal characters, range syntax, or a named preset)
- `Function(target, index, targets)` returning a `String`

> To include a literal `-` character, place it at the start or end of the string (e.g. `'-a-z'` or `'a-z-'`), otherwise it will be interpreted as a range separator.


#### Named presets

| Name | Characters |
|---|---|
| `'lowercase'` | `a-z` |
| `'uppercase'` | `A-Z` |
| `'numbers'` | `0-9` |
| `'symbols'` | `!%#_\\|*+=` |
| `'braille'` | `⠀-⣿` |
| `'blocks'` | `▀-▟` |
| `'shades'` | `░-▓` |


### Default

`'a-zA-Z0-9!%#_'`

Example (javascript):

```javascript
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const charSets = ['braille', 'blocks', 'numbers'];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ chars: charSets[i] }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

Example (html):

```html
<div class="large row">
  <p class="text-s text-mono">Define which characters appear during the scramble animation.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>braille</button>
    <button>blocks</button>
    <button>numbers</button>
  </fieldset>
</div>
```

---

## cursor

Docs: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/cursor

Characters displayed at the leading edge of the reveal wave.


### Accepts

| Value | Description |
|---|---|
| `true` | Uses `'_'` as cursor |
| `Number` | A character code (e.g. `124` for `'\|'`) |
| `String` | Uses the string directly as cursor characters |


### Default

`''` (no cursor)

Example (javascript):

```javascript
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const cursors = ['_____', '░▒▓█', '😀'];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ cursor: cursors[i] }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

Example (html):

```html
<div class="large row">
  <p class="text-s text-mono">Display a cursor character at the leading edge of the reveal wave as it moves through each character.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>_____</button>
    <button>░▒▓█</button>
    <button>😀</button>
  </fieldset>
</div>
```

---

## delay

Docs: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/delay

Delay in ms before the scramble animation starts.


### Accepts

- `Number`
- `Function(target, index, targets)` returning a `Number`


### Default

`0`

Example (javascript):

```javascript
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const values = [0, 500, 1500];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ delay: values[i] }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

Example (html):

```html
<div class="large row">
  <p class="text-s text-mono">Add a delay in milliseconds before the scramble animation starts.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>0</button>
    <button>500</button>
    <button>1500</button>
  </fieldset>
</div>
```

---

## duration

Docs: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/duration · Since 4.4.0

Overrides the computed duration. If unset or `0`, the duration is automatically calculated from the text length, `revealRate` and `settleDuration` parameters.


### Accepts

- `Number`
- `Function(target, index, targets)` returning a `Number`


### Default

Auto-computed

Example (javascript):

```javascript
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const values = [500, 2000, 5000];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ duration: values[i] }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

Example (html):

```html
<div class="large row">
  <p class="text-s text-mono">Override the auto-computed animation duration with a specific value in milliseconds for precise control.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>500</button>
    <button>2000</button>
    <button>5000</button>
  </fieldset>
</div>
```

---

## ease

Docs: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/ease

The easing applied to the scramble animation.


### Accepts

Any valid easing value


### Default

`'linear'`

Example (javascript):

```javascript
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');
const easeCurves = ['linear', 'inOut(3)', 'outExpo'];

function play(ease) {
  animate($p, { innerHTML: scrambleText({ ease, override: false }) });
}

play(easeCurves[0]);

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(easeCurves[i])));
```

Example (html):

```html
<div class="large row">
  <p class="text-s text-mono">Apply easing functions to control the acceleration and deceleration of the scramble reveal wave.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>linear</button>
    <button>inOut</button>
    <button>outExpo</button>
  </fieldset>
</div>
```

---

## from

Docs: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/from

Defines where the reveal wave starts from.


### Accepts

| Value | Description |
|---|---|
| `'auto'` | Resolves to `'left'` when the text grows or `'right'` when it shrinks |
| `'left'` | Reveals from the left |
| `'center'` | Reveals from the center |
| `'right'` | Reveals from the right |
| `'random'` | Reveals characters in random order |
| `Number` | Reveals from a specific character index |


### Default

`'auto'`

Example (javascript):

```javascript
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const froms = ['right', 'center', 'random'];

function play(from) {
  animate($p, {
    innerHTML: scrambleText({ from }),
  });
}

play(froms[0]);

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(froms[i])));
```

Example (html):

```html
<div class="large row">
  <p class="text-s text-mono">Control where the reveal wave starts from, whether left, center, right, or a specific character index.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>right</button>
    <button>center</button>
    <button>random</button>
  </fieldset>
</div>
```

---

## override

Docs: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/override

Controls the starting appearance of the text before the scramble animation begins.


### Accepts

| Value | Description |
|---|---|
| `true` | Scrambles the original text using the `chars` set |
| `false` | Shows the original text as-is |
| `''` | Starts from blank |
| `' '` | Replaces characters with spaces |
| `String` | Characters set (see the `chars` parameter) |


### Default

`true`

Example (javascript):

```javascript
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const overrides = [false, 'uppercase', '_'];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ override: overrides[i] }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

Example (html):

```html
<div class="large row">
  <p class="text-s text-mono">Controls the starting appearance of the text before the scramble animation begins.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>false</button>
    <button>'uppercase'</button>
    <button>'_'</button>
  </fieldset>
</div>
```

---

## perturbation

Docs: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/perturbation

Randomizes each character's reveal timing for a more organic, less uniform effect. At `0`, characters reveal at evenly spaced intervals. Higher values add a random offset to each character's start and end times. At `1`, that offset can reach the full settle duration, so characters overlap and settle out of order.


### Accepts

`Number` between `0` and `1`


### Default

`0`

Example (javascript):

```javascript
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const values = [0, 0.5, 1];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ perturbation: values[i], cursor: '_________' }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

Example (html):

```html
<div class="large row">
  <p class="text-s text-mono">Add random timing offsets to each character for a more organic and less uniform reveal effect.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>0</button>
    <button>0.5</button>
    <button>1</button>
  </fieldset>
</div>
```

---

## revealDelay

Docs: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/revealdelay · Since 4.4.0

Delay in ms before the reveal wave starts within the scramble animation.


### Accepts

- `Number`
- `Function(target, index, targets)` returning a `Number`


### Default

`0`

Example (javascript):

```javascript
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const values = [0, 500, 2000];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ revealDelay: values[i] }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

Example (html):

```html
<div class="large row">
  <p class="text-s text-mono">Add a delay in milliseconds before the reveal wave starts within the scramble animation.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>0</button>
    <button>500</button>
    <button>2000</button>
  </fieldset>
</div>
```

---

## revealRate

Docs: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/revealrate

How many characters reveal per second. Higher values make the reveal wave move faster. Together with `settleDuration`, it sets the total duration when no explicit `duration` is given.


### Accepts

`Number`


### Default

`60`

Example (javascript):

```javascript
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const values = [20, 60, 120];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ revealRate: values[i] }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

Example (html):

```html
<div class="large row">
  <p class="text-s text-mono">Higher values make the reveal wave move faster.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>20</button>
    <button>60</button>
    <button>120</button>
  </fieldset>
</div>
```

---

## reversed

Docs: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/reversed

Reverses the reveal order. For example, `'center'` with `reversed: true` reveals from the edges inward instead of center outward.


### Accepts

`Boolean`


### Default

`false`

Example (javascript):

```javascript
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const [ $button ] = utils.$('button');

let reversed = false;

function play() {
  reversed = !reversed;
  $button.textContent = `reversed: ${reversed}`;
  animate($p, {
    innerHTML: scrambleText({ from: 'center', reversed }),
  });
}

play();

$button.addEventListener('click', play);
```

Example (html):

```html
<div class="large row">
  <p class="text-s text-mono">The animation flows in the opposite direction of the specified from value.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>reversed: false</button>
  </fieldset>
</div>
```

---

## seed

Docs: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/seed

Seed for the random number generator. Any non-zero value produces a reproducible scramble sequence, so the same characters appear in the same order on every replay. `0` uses an unseeded generator, producing a different sequence each time.


### Accepts

`Number`


### Default

`0` (unseeded)

Example (javascript):

```javascript
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const values = [0, 42, 99];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ seed: values[i], revealRate: 2, settleRate: 2 }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

Example (html):

```html
<div class="large row">
  <p class="text-s text-mono">Set a seed value for the random number generator.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>0</button>
    <button>42</button>
    <button>99</button>
  </fieldset>
</div>
```

---

## settleDuration

Docs: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/settleduration · Since 4.4.0

Time in ms each character spends scrambling before settling into its final glyph.


### Accepts

`Number`


### Default

`300`

Example (javascript):

```javascript
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const values = [100, 300, 1000];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ settleDuration: values[i] }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

Example (html):

```html
<div class="large row">
  <p class="text-s text-mono">Define how long each character spends scrambling before settling into its final settled value.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>100</button>
    <button>300</button>
    <button>1000</button>
  </fieldset>
</div>
```

---

## settleRate

Docs: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/settlerate · Since 4.4.0

How many times per second each character cycles through random glyphs. Higher values create faster flickering.


### Accepts

`Number`


### Default

`30`

Example (javascript):

```javascript
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const values = [5, 30, 60];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ settleRate: values[i] }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

Example (html):

```html
<div class="large row">
  <p class="text-s text-mono">Control how many times per second characters cycle through random values during the scramble phase.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>5</button>
    <button>30</button>
    <button>60</button>
  </fieldset>
</div>
```

---

## text

Docs: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/text · Since 4.4.0

The text to transition to. If not set, the original text content of the target is used.


### Accepts

- `String`
- `Function(target, index, targets)` returning a `String`


### Default

Original text content

Example (javascript):

```javascript
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const [ $button ] = utils.$('button');

const texts = ['Transition between different text.', 'Hello World!', 'Anime.js 4.4 scrambleText()'];
let i = 0;

function play() {
  i = (i + 1) % texts.length;
  animate($p, {
    innerHTML: scrambleText({ text: texts[i] }),
  });
}

play();

$button.addEventListener('click', play);
```

Example (html):

```html
<div class="large row centered">
  <p class="text-l text-mono">Transition between different text.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Change text</button>
  </fieldset>
</div>
```

---

## splitText

Docs: https://animejs.com/documentation/text/splittext · Since 4.1.0

### A lightweight, responsive and accessible text utility function to split, clone and wrap lines, words and characters of an HTML Element.

Text splits are created using the `splitText()` function.

```js
import { splitText } from 'animejs';

const split = splitText(target, parameters);
```

Since v4.2.0, the `splitText()` method can also be imported independently without importing the entire library.

```js
import { splitText } from 'animejs/text';
```


### Parameters

| Name | Accepts |
|---|---|
| target | A valid CSS selector `String` \| `HTMLElement` |
| parameters (opt) | An `Object` of TextSplitter settings |


### Returns

`TextSplitter`

Example (javascript):

```javascript
import { createTimeline, stagger, utils, splitText } from 'animejs';

const { words, chars } = splitText('p', {
  words: { wrap: 'clip' },
  chars: true,
});

createTimeline({
  loop: true,
  defaults: { ease: 'inOut(3)', duration: 650 }
})
.add(words, {
  y: [$el => +$el.dataset.line % 2 ? '100%' : '-100%', '0%'],
}, stagger(125))
.add(chars, {
  y: $el => +$el.dataset.line % 2 ? '100%' : '-100%',
}, stagger(10, { from: 'random' }))
.init();
```

Example (html):

```html
<div class="large centered grid square-grid">
  <p class="text-xl">
    All-in-one text splitter<br>
    テキストスプリッター
  </p>
</div>
```

---

## HTML template

Docs: https://animejs.com/documentation/text/splittext/html-template · Since 4.1.0

Custom HTML templates can be used on the `lines`, `words`, and `chars` properties, which then serve as wrappers for all split elements.

The HTML template must contain at least one `'{value}'` variable that will be replaced by the split value. Similarly, the `'{i}'` variable can be used and will be replaced by the current split index.

All the necessary styles, like `'display: inline-block;'`, will be applied automatically and don't need to be defined in the template.

For example, if you pass the following template to the char parameter like this:

```js
splitText('p', { chars: '<em class="char-{i}">{value}</em>' });
```

The split output will be:

```html
<p>
  <em class="char-0" style="display: inline-block;">H</em>
  <em class="char-1" style="display: inline-block;">E</em>
  <em class="char-2" style="display: inline-block;">L</em>
  <em class="char-3" style="display: inline-block;">L</em>
  <em class="char-4" style="display: inline-block;">O</em>
</p>
```


### Accepts

A `String` containing at least one reference to `'{value}'`

Example (javascript):

```javascript
import { createTimeline, stagger, splitText } from 'animejs';

splitText('p', {
  chars: `<span class="char-3d word-{i}">
    <em class="face face-top">{value}</em>
    <em class="face-front">{value}</em>
    <em class="face face-bottom">{value}</em>
  </span>`,
});

const charsStagger = stagger(100, { start: 0 });

createTimeline({ defaults: { ease: 'linear', loop: true, duration: 750 }})
.add('.char-3d', { rotateX: -90 }, charsStagger)
.add('.char-3d .face-top', { opacity: [.5, 0] }, charsStagger)
.add('.char-3d .face-front', { opacity: [1, .5] }, charsStagger)
.add('.char-3d .face-bottom', { opacity: [.5, 1] }, charsStagger);
```

Example (html):

```html
<div class="large centered row">
  <p class="text-xl">Custom HTML template.</p>
</div>
```

---

## Split parameters

Docs: https://animejs.com/documentation/text/splittext/split-parameters · Since 4.1.0

Defines the CSS class, wrap behavior, or clone type of a split.
 Parameters are configured by passing an object to the `lines`, `words`, and `chars` properties.

```js
splitText(target, {
  lines: true,
  words: {
  ┌──────────────────────┐
  │ wrap: 'clip',        │
  │ class: 'split-word', ├─ Split Parameters
  │ clone: true          │
  └──────────────────────┘
  },
  includeSpaces: true,
  debug: true,
});
```

---

## class

Docs: https://animejs.com/documentation/text/splittext/split-parameters/class · Since 4.1.0

Specifies a custom CSS class applied to all split elements.


### Outputs

```html
<span class="my-custom-class" style="display: inline-block;">
  <span style="display: inline-block;">word</span>
</span>
```


### Accepts

- `String`
- `null`


### Default

`null`

Example (javascript):

```javascript
import { animate, stagger, splitText } from 'animejs';

splitText('p', {
  chars: { class: 'split-char' },
});

animate('.split-char', {
  y: ['0rem', '-1rem', '0rem'],
  loop: true,
  delay: stagger(100)
});
```

Example (html):

```html
<div class="large centered row">
  <p class="text-xl">Custom CSS class.</p>
</div>
<div class="small row"></div>
```

---

## clone

Docs: https://animejs.com/documentation/text/splittext/split-parameters/clone · Since 4.1.0

Clones the split elements in the specified direction by wrapping the lines, words, or characters within the following HTML structure and setting the `top` and `left` CSS properties accordingly.


### Outputs

```html
<span style="position: relative; display: inline-block;">
  <span style="display: inline-block;">word</span>
  <span style="position: absolute; top: 100%; left: 0px; white-space: nowrap; display: inline-block;">word</span>
</span>
```


### Accepts

- `'left'` | `'top'` | `'right'` | `'bottom'` | `'center'`
- `Boolean` (`true` is equivalent to `'center'`)
- `null`


### Default

`null`

Example (javascript):

```javascript
import { createTimeline, stagger, splitText } from 'animejs';

const { chars } = splitText('p', {
  chars: {
    wrap: 'clip',
    clone: 'bottom'
  },
});

createTimeline()
.add(chars, {
  y: '-100%',
  loop: true,
  loopDelay: 350,
  duration: 750,
  ease: 'inOut(2)',
}, stagger(150, { from: 'center' }));
```

Example (html):

```html
<div class="large centered row">
  <p class="text-xl">Split and clone text.</p>
</div>
<div class="small row"></div>
```

---

## wrap

Docs: https://animejs.com/documentation/text/splittext/split-parameters/wrap · Since 4.1.0

Adds an extra wrapper element with the specified CSS `overflow` property to all split elements.


### Outputs

```html
<span style="overflow: clip; display: inline-block;">
  <span style="display: inline-block;">word</span>
</span>
```


### Accepts

- `'hidden'` | `'clip'` | `'visible'` | `'scroll'` | `'auto'`
- `Boolean` (`true` is equivalent to `'clip'`)
- `null`


### Default

`null`

Example (javascript):

```javascript
import { animate, stagger, splitText } from 'animejs';

const { chars } = splitText('p', {
  chars: { wrap: true },
});

animate(chars, {
  y: ['75%', '0%'],
  duration: 750,
  ease: 'out(3)',
  delay: stagger(50),
  loop: true,
  alternate: true,
});
```

Example (html):

```html
<div class="large centered row">
  <p class="text-xl">Split and wrap text.</p>
</div>
<div class="small row"></div>
```

---

## TextSplitter methods

Docs: https://animejs.com/documentation/text/splittext/textsplitter-methods · Since 4.1.0

Methods available on the `TextSplitter` instance returned by a `splitText()` function.

```js
const split = splitText(target, parameters);
      ┌────────────┐
split.│revert()    │
split.│addEffect() ├─ Methods
split.│refresh()   │
      └────────────┘
```

---

## addEffect()

Docs: https://animejs.com/documentation/text/splittext/textsplitter-methods/addeffect · Since 4.1.0

Preserves animations and callbacks state between splits when splitting by `lines`, and allows reverting all split animations at once using `split.revert()`.

```js
const split = splitText({
  lines: true,
  chars: true,
});

// Doesn't work when splitting by lines because the split can be delayed by the fonts loading
animate([split.lines, split.words, split.chars], {
  opacity: { from: 0 },
});

// Works! addEffect() will be safely executed after each split
// making sure the split elements are always up to date
split.addEffect(({ lines, words, chars }) => animate([lines, words, chars], {
  opacity: { from: 0 },
}));

// Reverts both the text split and the effect animation
split.revert();
```

> An effect's animation or callback is automatically refreshed when:
> 
> - `splitText()` is called and the `document.fonts.ready` `Promise` resolves (if it wasn't already resolved, otherwise triggers immediately).
> - Splitting by `lines` and the target element's width has changed, regardless of whether the line structure actually changes


### Accepts

A `Function` whose first argument is the `SplitText` itself and can return either an Animation, Timeline, Timer or an optional cleanup function that is called before every subsequent lines calculation.

Example (javascript):

```javascript
import { animate, utils, stagger, splitText } from 'animejs';

const colors = [];

splitText('p', {
  lines: true,
})
/* Registering an animation to the split */
.addEffect(({ lines }) => animate(lines, {
  y: ['50%', '-50%'],
  loop: true,
  alternate: true,
  delay: stagger(400),
  ease: 'inOutQuad',
}))
/* Registering a callback to the split */
.addEffect(split => {
  split.words.forEach(($el, i) => {
    const color = colors[i];
    if (color) utils.set($el, { color });
    $el.addEventListener('pointerenter', () => {
      animate($el, {
        color: utils.randomPick(['#FF4B4B', '#FFCC2A', '#B7FF54', '#57F695']),
        duration: 250,
      })
    });
  });
  return () => {
    /* Called between each split */
    split.words.forEach((w, i) => colors[i] = utils.get(w, 'color'));
  }
});
```

Example (html):

```html
<div class="iframe-content resizable">
  <div class="medium centered row">
    <p class="text-l">Hover the words to animate their color, then resize the text.</p>
  </div>
</div>
```

---

## refresh()

Docs: https://animejs.com/documentation/text/splittext/textsplitter-methods/refresh · Since 4.1.0

Manually splits the text again, taking into account any parameters changes.

```js
const split = splitText(target);

split.html = 'Some new text to split';

split.refresh();
```

The properties that can be safely manually updated are:

| Name | Description |
|---|---|
| **$target** | The split element (`HTMLElement`) |
| **html** | The html to split (`String`) |
| **debug** | Defines if the debug styles are visible or not (`Boolean`) |
| **includeSpaces** | Defines if the spaces should be wrapped within the text (`Boolean`) |
| **accessible** | Defines if the accessible clone element should be created (`Boolean`) |
| **lineTemplate** | The line html template (`String`) |
| **wordTemplate** | The word html template (`String`) |
| **charTemplate** | The char html template (`String`) |


### Returns

`TextSplitter`

Example (javascript):

```javascript
import { animate, stagger, splitText, utils } from 'animejs';

const [ $add, $remove ] = utils.$('button');
const [ $p ] = utils.$('p');

const split = splitText('p', {
  lines: { wrap: 'clip' },
  debug: true,
});

split.addEffect((self) => animate(self.words, {
  y: ['0%', '75%'],
  loop: true,
  alternate: true,
  ease: 'inOutQuad',
  delay: stagger(150)
}));

const words = ['sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'tortor', 'lectus', 'aliquet'];

const addRandomWord = () => {
  split.html += ' ' + utils.randomPick(words);
  split.refresh();
}

const removeRandomWord = () => {
  const words = split.words.map(w => w.innerHTML);
  split.html = (words.splice(utils.random(0, words.length - 1), 1), words).join(' ');
  split.refresh();
}

$add.addEventListener('click', addRandomWord);
$remove.addEventListener('click', removeRandomWord);
```

Example (html):

```html
<div class="large centered row">
  <p class="text-xl">Lorem ipsum dolor</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Add word</button>
    <button>Remove word</button>
  </fieldset>
</div>
```

---

## revert()

Docs: https://animejs.com/documentation/text/splittext/textsplitter-methods/revert · Since 4.1.0

Reverts the split target html back to its original state, removing debug styles and reverting all animations added with `split.addEffect()` in the process.


### Returns

`TextSplitter`

Example (javascript):

```javascript
import { animate, stagger, splitText, utils } from 'animejs';

const [ $button ] = utils.$('button');
const [ $p ] = utils.$('p');

const split = splitText('p', {
  words: { wrap: 'clip' },
  debug: true,
});

split.addEffect((self) => animate(self.words, {
  y: ['100%', '0%'],
  duration: 1250,
  ease: 'out(3)',
  delay: stagger(100),
  loop: true,
  alternate: true,
}));

const revertSplit = () => {
  split.revert();
  $button.setAttribute('disabled', 'true');
}

$button.addEventListener('click', revertSplit);
```

Example (html):

```html
<div class="large centered row">
  <p class="text-xl">Split text by words.<br>単語ごとに分割します。</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Revert</button>
  </fieldset>
</div>
```

---

## TextSplitter properties

Docs: https://animejs.com/documentation/text/splittext/textsplitter-properties · Since 4.1.0

Properties available on the `TextSplitter` instance returned by a `splitText()` function.

```js
const split = splitText(target, parameters);
      ┌──────┐
split.│lines │
split.│words ├─ Properties
split.│chars │
      └──────┘
```

| Name | Description |
|---|---|
| **$target** | Gets the split root element (`HTMLElement`) |
| **html** | Gets the html to split (`String`) |
| **debug** | Gets if the debug styles are visible or not (`Boolean`) |
| **includeSpaces** | Gets if the spaces should be wrapped within the text (`Boolean`) |
| **accessible** | Gets if the accessible clone element should be created (`Boolean`) |
| **lines** | Gets the lines elements (`Array<HTMLElement>`) |
| **words** | Gets the lines elements (`Array<HTMLElement>`) |
| **chars** | Gets the lines elements (`Array<HTMLElement>`) |
| **lineTemplate** | The line html template (`String`) |
| **wordTemplate** | The word html template (`String`) |
| **charTemplate** | The char html template (`String`) |

---

## TextSplitter settings

Docs: https://animejs.com/documentation/text/splittext/textsplitter-settings · Since 4.1.0

Configures how text within the target HTML element should be split.

```js
splitText(target, {
┌────────────────────────┐
│ lines: true,           ├─ Settings
│ words: {               │
│   wrap: 'clip',        │
│   class: 'split-word', │
│   clone: true          │
│ },                     │
│ includeSpaces: true,   │
│ debug: true,           │
└────────────────────────┘
});
```

---

## accessible

Docs: https://animejs.com/documentation/text/splittext/textsplitter-settings/accessible · Since 4.1.0

Creates an accessible cloned element that preserves the structure of the original split element.

```js
splitText(target, { accessible: true });
```


### Accepts

`Boolean`


### Default

`true`

Example (javascript):

```javascript
import { createTimeline, splitText, stagger, utils } from 'animejs';

const [ $button ] = utils.$('button');
const split = splitText('p', { debug: true });
const $accessible = split.$target.firstChild;

$accessible.style.cssText = `
  opacity: 0;
  position: absolute;
  color: var(--hex-green-1);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  outline: currentColor dotted 1px;
`;

const showAccessibleClone = createTimeline({
  defaults: { ease: 'inOutQuad' },
})
.add($accessible, {
  opacity: 1,
  z: '-2rem',
}, 0)
.add('p', {
  rotateX: 0,
  rotateY: 60
}, 0)
.add(split.words, {
  z: '6rem',
  opacity: .75,
  outlineColor: { from: '#FFF0' },
  duration: 750,
  delay: stagger(40, { from: 'random' })
}, 0)
.init();

const toggleAccessibleClone = () => {
  showAccessibleClone.alternate().resume();
}
 
$button.addEventListener('click', toggleAccessibleClone);
```

Example (html):

```html
<div class="large centered row">
  <p class="text-xl">Split text by words.<br>単語ごとに分割します。</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Toggle accessible</button>
  </fieldset>
</div>
```

---

## chars

Docs: https://animejs.com/documentation/text/splittext/textsplitter-settings/chars · Since 4.1.0

Defines if and how the chars should be split.
 Split characters elements are accessed via an array returned by the `chars` property of a `TextSplit` instance.

```js
const { chars } = splitText(target, { chars: true });
```


### Default split wrappers

By default, each character is wrapped in a span element with the following styles and data attributes:

```html
<span style="display: inline-block;" data-line="0" data-word="0" data-char="0">H</span>
<span style="display: inline-block;" data-line="0" data-word="0" data-char="1">E</span>
<span style="display: inline-block;" data-line="0" data-word="0" data-char="2">Y</span>
```


### Custom split wrappers

Split wrappers can be configured by passing an `Object` of Split parameters or by passing a custom HTML template `String`.

> ### Animating chars when also splitting by lines
> 
> Each line split overrides existing character elements, which causes running character animations to stop once the fonts have loaded or every time the text element resizes.
>  Declaring an animation within the `split.addEffect()` method ensures continuous playback between resizes and automatically reverts it when using `split.revert()`.
> 
> ```js
> const split = splitText(target, params);
> 
> split.addEffect(({ lines, words, chars }) => animate([lines, words, chars], {
>   opacity: { from: 0 },
> }));
> 
> split.revert(); // This also reverts the animation declared with addEffect
> ```


### Accepts

- `Boolean`
- `Object` of Split parameters
- HTML template `String`


### Default

`false`

Example (javascript):

```javascript
import { animate, splitText, stagger } from 'animejs';

const { chars } = splitText('p', {
  chars: { wrap: 'clip' },
});

animate(chars, {
  y: [
    { to: ['100%', '0%'] },
    { to: '-100%', delay: 750, ease: 'in(3)' }
  ],
  duration: 750,
  ease: 'out(3)',
  delay: stagger(50),
  loop: true,
});
```

Example (html):

```html
<div class="large centered row">
  <p class="text-xl">Split text by chars.<br>文字ごとに分割します。</p>
</div>
<div class="small row"></div>
```

---

## debug

Docs: https://animejs.com/documentation/text/splittext/textsplitter-settings/debug · Since 4.1.0

Toggles debug CSS styles on the split elements to better visualize the wrapper elements.
 Lines are outlined in green, words in red, characters in blue.

```js
splitText(target, { debug: true });
```


### Accepts

`Boolean`


### Default

`false`

Example (javascript):

```javascript
import { animate, splitText, stagger, utils } from 'animejs';

const [ $button ] = utils.$('button');
const [ $p ] = utils.$('p');

let debug = false;
let split;

const toggleDebug = () => {
  if (split) split.revert();
  debug = !debug;
  split = splitText($p, {
    lines: true,
    chars: true,
    words: true,
    debug: debug,
  });
}

toggleDebug();

$button.addEventListener('click', toggleDebug);
```

Example (html):

```html
<div class="large centered row">
  <p class="text-xl">Split text by chars.<br>文字ごとに分割します。</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Toggle debug</button>
  </fieldset>
</div>
```

---

## includeSpaces

Docs: https://animejs.com/documentation/text/splittext/textsplitter-settings/includespaces · Since 4.1.0

Defines whether whitespace should be included in the split elements.

```js
splitText(target, { includeSpaces: true });
```


### Accepts

`Boolean`


### Default

`false`

Example (javascript):

```javascript
import { animate, splitText, stagger, utils } from 'animejs';

const [ $button ] = utils.$('button');
const [ $p ] = utils.$('p');

let includeSpaces = true;
let split;

const toggleSpaces = () => {
  if (split) split.revert();
  includeSpaces = !includeSpaces;
  split = splitText($p, {
    debug: true,
    includeSpaces: includeSpaces,
  });
}

toggleSpaces();

$button.addEventListener('click', toggleSpaces);
```

Example (html):

```html
<div class="large centered row">
  <p class="text-xl">Split text by words.<br>Include spaces or not.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Toggle spaces</button>
  </fieldset>
</div>
```

---

## lines

Docs: https://animejs.com/documentation/text/splittext/textsplitter-settings/lines · Since 4.1.0

Defines if and how the lines should be split.
 Split line elements are accessed via an array returned by the `lines` property of a `TextSplit` instance.

```js
const { lines } = splitText(target, { lines: true });
```


### Default split wrappers

By default, each line is wrapped in a span element with the following styles and data attributes:

```html
<span style="display: block;" data-line="0">This is the first line</span>
<span style="display: block;" data-line="1">This is the second line</span>
<span style="display: block;" data-line="2">This is the third line</span>
```


### Custom split wrappers

Split wrappers can be configured by passing an `Object` of Split parameters or by passing a custom HTML template `String`.


### Splitting nested elements

Nested elements are duplicated across lines when necessary. For example, the following HTML:

```html
<p>
  This is a text <a href="#link">with a link 
  that contains a nested <em>em 
  element</em></a>
</p>
```

Results in the following structure after splitting (CSS styles avoided for clarity):

```html
<p>
  <span>This is a text <a href="#link">with a link</a></span>
  <span><a href="#link">that contains a nested <em>em</em></a></span>
  <span><a href="#link"><em>element</em></a></span>
</p>
```


### Font loading and line resize handling

To prevent incorrect line calculation, lines are split after all font loading and layout operations are complete by waiting for the `document.fonts.ready.then` promise to fulfill.
 Then, if the target element resizes, lines are automatically re-split, overriding the existing lines, words and chars elements in the process.


### Animating lines, words and chars when splitting by lines

Each line split overrides existing split elements, which causes running split elements animations to stop once the fonts have loaded or every time the text element resizes.
 Declaring an animation within the `split.addEffect()` method ensures continuous playback between resizes and automatically reverts it when using `split.revert()`.

```js
const split = splitText(target, params);

split.addEffect(({ lines, words, chars }) => animate([lines, words, chars], {
  opacity: { from: 0 },
}));

split.revert(); // This also reverts the animation declared with addEffect
```


### Accepts

- `Boolean`
- `Object` of Split parameters
- HTML template `String`


### Default

`false`

Example (javascript):

```javascript
import { animate, splitText, stagger } from 'animejs';

splitText('p', {
  lines: { wrap: 'clip' },
})
.addEffect(({ lines }) => animate(lines, {
  y: [
    { to: ['100%', '0%'] },
    { to: '-100%', delay: 750, ease: 'in(3)' }
  ],
  duration: 750,
  ease: 'out(3)',
  delay: stagger(200),
  loop: true,
  loopDelay: 500,
}));
```

Example (html):

```html
<div class="large centered row">
  <p class="text-xl">Split text by lines.<br>線で分割します。</p>
</div>
<div class="small row"></div>
```

---

## words

Docs: https://animejs.com/documentation/text/splittext/textsplitter-settings/words · Since 4.1.0

Defines if and how the words should be split.
 Split word elements are accessed via an array returned by the `words` property of a `TextSplit` instance.

```js
const { words } = splitText(target, { words: true });
```

> Internally, for browsers that support it, word splitting is done using the native `Intl.Segmenter` object, allowing splitting words for languages that don't use spaces, like Japanese, Chinese, Thai, Lao, Khmer, Myanmar, etc, and falls back to using `String.prototype.split()` for older browsers.


### Default split wrappers

By default, each word is wrapped in a span element with the following styles and data attributes:

```html
<span style="display: inline-block;" data-line="0" data-word="0">Split</span>
<span style="display: inline-block;" data-line="0" data-word="1">by</span>
<span style="display: inline-block;" data-line="0" data-word="2">words</span>
```


### Custom split wrappers

Split wrappers can be configured by passing an `Object` of Split parameters or by passing a custom HTML template `String`.

> ### Animating words when also splitting by lines
> 
> Each line split overrides existing word elements, which causes running word animations to stop once the fonts have loaded or every time the text element resizes.
>  Declaring an animation within the `split.addEffect()` method ensures continuous playback between resizes and automatically reverts it when using `split.revert()`.
> 
> ```js
> const split = splitText(target, params);
> 
> split.addEffect(({ lines, words, chars }) => animate([lines, words, chars], {
>   opacity: { from: 0 },
> }));
> 
> split.revert(); // This also reverts the animation declared with addEffect
> ```


### Accepts

- `Boolean`
- `Object` of Split parameters
- HTML template `String`


### Default

`true`

Example (javascript):

```javascript
import { animate, splitText, stagger } from 'animejs';

const { words } = splitText('p', {
  words: { wrap: 'clip' },
})

animate(words, {
  y: [
    { to: ['100%', '0%'] },
    { to: '-100%', delay: 750, ease: 'in(3)' }
  ],
  duration: 750,
  ease: 'out(3)',
  delay: stagger(100),
  loop: true,
});
```

Example (html):

```html
<div class="large centered row">
  <p class="text-xl">Split text by words.<br>単語ごとに分割します。</p>
</div>
<div class="small row"></div>
```

---

