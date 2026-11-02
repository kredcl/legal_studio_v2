# Anime.js v4 · Adapters

Source: official documentation at https://animejs.com/documentation (MIT-licensed library by Julian Garnier).

## AdaptersNEW

Docs: https://animejs.com/documentation/adapters

### Animate objects from APIs that don't expose plain properties, like a Three.js mesh or a canvas context, with the standardanimate(),createTimeline(), andutils.set()API.

Adapters let you animate objects that do not expose plain properties, such as a Three.js mesh, a canvas context, or a third-party widget. Once an adapter is registered for a target type, you animate those objects exactly like you would a DOM element.

Anime.js ships with a built-in Three.js adapter, and custom adapters can be written for any other target type.


### Built-in adapters

The Three.js adapter is the only one shipped with Anime.js for now. Load it as a side-effect import from the `'animejs/adapters/three'` subpath module:

```js
import 'animejs/adapters/three';
```


### Custom adapters

Call `registerAdapter()` from the `'animejs/adapters'` subpath module to create a custom adapter. The returned `Adapter` is a namespace for one library or class group, and exposes two methods:

- `registerTargetAdapter(detect)` declares a target type with a fixed, known set of property names.
- `registerPropertyResolver(resolver)` declares a function that matches property names as they are animated. Use it for dynamic names like `offsetX`, `offsetY`, `offsetZ`, or any naming scheme you can't list upfront.

```js
import { registerAdapter } from 'animejs/adapters';

const myAdapter = registerAdapter();
```


#### Target adapters

A target adapter handles one class of objects and lists each animatable property name with its getter and setter.

```js
const widget = myAdapter.registerTargetAdapter(target => target instanceof MyClass);

widget.registerProperty('foo',
  target => target.getFoo(),
  (target, value, tween) => target.setFoo(value),
  target => target.fooEnabled,
);
```

`registerTargetAdapter()` takes a function that returns `true` for the objects the adapter handles. Each `registerProperty()` call adds one animatable name to that target type.


##### registerProperty parameters

| Name | Accepts |
|---|---|
| name | A `String` matching the property name written in animation parameters |
| getter | A `Function` receiving the target and returning the current value |
| setter | A `Function` receiving the target, the interpolated value, and the live tween |
| gate (opt) | A `Function` returning `true` when the property applies to the given target |

The setter receives a `Number` for scalar tweens. For color and complex tweens the value argument is `undefined`, and the per-frame channels are available on the live tween's `_numbers` array.


#### Property resolvers

Use a property resolver when the set of animatable names is not known upfront, or when the same logic should handle many target types. It runs for any name not claimed by a target adapter, receives the target and the property name, and returns a property entry, or `null` to defer to the next resolver.

```js
myAdapter.registerPropertyResolver((target, name) => {
  if (target instanceof MyClass && name.startsWith('foo_')) {
    const key = name.slice(4);
    return {
      get: t => t.getFoo(key),
      set: (t, value, tween) => t.setFoo(key, value),
    };
  }
  return null;
});
```


##### Resolution order

For each animated name, Anime.js checks every registered `Adapter` in order. It tries the target adapters first (first match wins), then the property resolvers (first non-`null` wins). Any name no adapter claims is set directly with `target[name] = value`.

---

## Three.js adapterNEW

Docs: https://animejs.com/documentation/adapters/threejs-adapter · Since 4.5.0

### Animate Three.js objects directly withanimate(),createTimeline(), andutils.set().

Three.js animations typically require targeting multiple objects: `mesh.position`, `mesh.rotation`, `mesh.material`, and each uniform's `value`. Keeping them in sync usually involves a timeline. The Three.js adapter flattens these nested fields onto property names on the mesh, converts angles to degrees, parses CSS color values, and reduces the setup to a single `animate()` call.


#### Without the adapter:

```js
createTimeline({
  defaults: {
    duration: 500,
    ease: 'inOutSine',
  }
})
.add(mesh.position, {
  x: 100,
  y: 50,
}, 0)
.add(mesh.rotation, {
  x: utils.degToRad(30),
  y: utils.degToRad(60),
}, 0)
.add(mesh.material, {
  opacity: 0.5,
}, 0)
.add(mesh.material.uniforms.uTint.value, {
  r: 0,
  g: 0.5,
  b: 1,
}, 0);
```


#### With the adapter:

```js
animate(mesh, {
  x: 100,           // mesh.position.x
  y: 50,            // mesh.position.y
  rotateX: 30,      // mesh.rotation.x (degrees)
  rotateY: 60,      // mesh.rotation.y (degrees)
  opacity: 0.5,     // mesh.material.opacity
  uTint: '#0080ff', // mesh.material.uniforms.uTint.value
  duration: 500,
  ease: 'inOutSine',
});
```


### Loading the Three.js adapter

Load the adapter as a side-effect import from the `'animejs/adapters/three'` subpath module:

```js
import 'animejs/adapters/three';
```

> Three.js is an optional peer dependency. The adapter works with any version from `0.150.0`.


### Using the adapter

Once imported, Three.js objects can be passed directly to `animate()` and `utils.set()`. Common names like `x`, `rotateY`, `scale`, `opacity`, and `color` map to the corresponding field, and any other `Color`, `Vector2/3/4`, scalar, or boolean property on the target is detected automatically. Angle-named scalar fields such as `rotation` and `angle` are auto-converted between degrees and radians, so all rotation values are written and read in degrees.

Supported targets: `Object3D` and its subclasses (`Mesh`, lights, cameras, `Sprite`, `Points`, ...), `Material`, `Texture`, `Fog` / `FogExp2`, TSL `UniformNode`, and bare `Color` / `Vector2-4` instances.

```js
animate(mesh,    { x: 100, rotateY: 360, opacity: 0.5 });
animate(camera,  { fov: 60, focalLength: 35 });
animate(light,   { color: '#fffacd' });
animate(scene,   { background: '#1a1a2e' });
animate(texture, { offsetX: 1, rotation: Math.PI });
```

See Object properties for the full reference.


#### Color

`Color` fields like `material.color`, `material.emissive`, `light.color`, `fog.color`, or `scene.background` accept any color value, including CSS variables.

```js
animate(material, { color: '#ff8800', emissive: '#0ff' });
animate(scene,    { background: 'rgb(20, 30, 40)' });
animate(light,    { color: 'hsl(200, 80%, 50%)' });
animate(material, { color: 'var(--accent)' });
```


#### Vectors

`Vector2`, `Vector3`, and `Vector4` fields are split into per-axis names by appending `X`, `Y`, `Z`, or `W`.

```js
// material.normalScale.x / material.normalScale.y
animate(material, { normalScaleX: 0.5, normalScaleY: 1 });
// sprite.center.x
animate(sprite, { centerX: 0.25 });
// texture.offset.x / texture.offset.y
animate(texture, { offsetX: 1, offsetY: 0.5 });
```


#### Shader uniforms and TSL slots

Uniforms on a `ShaderMaterial` and slots assigned to a `UniformNode` from `'three/tsl'` are exposed by name on the material, and on the parent mesh through the material shorthand. `Color` and `Vector` uniforms use the same naming rules as material fields.

```js
animate(shaderMaterial, { uTime: 1, uTint: '#0ff', uOffsetY: 0.5 });
animate(mesh,           { uTime: 1, uTint: '#0ff' });
```

See Materials and uniforms for the full reference.

Example (javascript):

```javascript
import { animate, createTimer, stagger, utils } from 'animejs';
import * as THREE from 'three';
import { getInstances } from 'animejs/adapters/three';

// Three.js setup

const [ $container ] = utils.$('.full-container');
const color = utils.get($container, 'color');
const { clientWidth: width, clientHeight: height } = $container;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
renderer.shadowMap.enabled = true;
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
$container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
camera.position.z = 6;
scene.add(camera);

scene.add(new THREE.AmbientLight(0xffffff, 0.25));
const pointLight = new THREE.PointLight(0xffffff, 8, 20, 0.4);
pointLight.castShadow = true;
scene.add(pointLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(2, 3, 4);
scene.add(dirLight);

const gridSize = 4; // cubes per axis
const cellSize = 2 / gridSize; // size of each cube
const spread = (gridSize - 1) / 2 * cellSize; // distance from center to the outer cubes
const geometry = new THREE.BoxGeometry(cellSize, cellSize, cellSize);
const material = new THREE.MeshLambertMaterial({ color });
const mesh = new THREE.InstancedMesh(geometry, material, gridSize * gridSize * gridSize);
mesh.castShadow = mesh.receiveShadow = true;
scene.add(mesh);

// Animation with Three.js adapter

const instances = getInstances(mesh);

utils.set(instances, {
  x: stagger([-spread, spread], { grid: [gridSize, gridSize, gridSize], axis: 'x' }),
  y: stagger([-spread, spread], { grid: [gridSize, gridSize, gridSize], axis: 'y' }),
  z: stagger([-spread, spread], { grid: [gridSize, gridSize, gridSize], axis: 'z' }),
});

animate(mesh, {
  rotateY: { to: 360, duration: 9000 },
  rotateX: { to: 360, duration: 12000 },
  loop: true,
  ease: 'inOutQuad',
});

animate(pointLight, {
  intensity: [30, 0],
  duration: 2500,
  loop: true,
  loopDelay: 500,
  alternate: true,
  ease: 'out(3)',
});

animate(instances, {
  x: (instance) => instance.x * 10,
  y: (instance) => instance.y * 10,
  z: (instance) => instance.z * 10,
  duration: 2000,
  delay: stagger([0, 500], { grid: true, from: 'center', reversed: true, ease: 'in(3)' }),
  loop: true,
  loopDelay: 500,
  alternate: true,
  ease: 'inOutExpo',
});

createTimer({ onUpdate: () => renderer.render(scene, camera) });
```

Example (html):

```html
<div class="full-container"></div>
```

---

## Three.js materials and uniforms

Docs: https://animejs.com/documentation/adapters/threejs-adapter/materials-and-uniforms · Since 4.5.0

### Animate Three.js materials, their shader uniforms, and TSL slots directly withanimate()andutils.set().

Target the material itself, or its parent `Mesh` (see Mesh material mapping below).

```js
animate(material, {
  emissive: '#0ff',
  metalness: 1,
  roughness: 0.2,
  uTime: 1,
  uOffsetY: 0.5,
});
```


### Material fields

Every `Color`, scalar, boolean, and `Vector` field on built-in materials (`MeshStandardMaterial`, `MeshPhysicalMaterial`, `MeshToonMaterial`, ...) is animatable by name. `Vector` fields split into per-axis names.

| Field kind | Examples | Names |
|---|---|---|
| Scalar / boolean | `metalness`, `roughness`, `opacity`, `wireframe` | direct name |
| `Color` | `color`, `emissive`, `specular`, `sheenColor` | direct name |
| `Vector` axis | `normalScale`, `clearcoatNormalScale` | `normalScaleX` / `normalScaleY` |


### ShaderMaterial uniforms

Custom uniforms animate by their uniform name. Scalars and `Color` uniforms use the name directly, `Vector2/3/4` uniforms expose per-axis names.

```js
const shader = new ShaderMaterial({
  uniforms: {
    tint:       { value: new Color('#f00') },
    intensity:  { value: 0.5 },
    resolution: { value: new Vector2(1024, 768) },
  },
  // ...
});

animate(shader, { tint: '#0ff', intensity: 1, resolutionX: 2048 });
```


### TSLNodeMaterialslots

Slots assigned to a `UniformNode` from the `uniform()` factory animate by the slot name on the material.

```js
import { uniform } from 'three/tsl';

material.colorNode  = uniform(new Color('#f00'));
material.offsetNode = uniform(new Vector3());

animate(material, { colorNode: '#0f0', offsetNodeY: 0.5 });
```


### Bare uniform nodes

A `UniformNode` can also be animated directly, useful when the same uniform is shared across several materials. Use `value` for scalars, `color` for colors, and `x` / `y` / `z` / `w` for vectors.

```js
animate(uniform(0),                { value: 1 });
animate(uniform(new Color()),      { color: '#0f0' });
animate(uniform(new Vector3()),    { x: 1, y: 0.5 });
```


### Mesh material mapping

Material fields, `ShaderMaterial` uniforms, and TSL slots are also reachable through the parent `Mesh`. Writing the name on the mesh sets `mesh.material[name]`, so you don't need to target the material separately.

```js
animate(mesh, { metalness: 1, emissive: '#0ff', uTime: 1 });
// equivalent to: animate(mesh.material, { metalness: 1, emissive: '#0ff', uTime: 1 });
```

> Writes go to `mesh.material` directly, so sharing a material across meshes means animating one updates them all. Clone the material per mesh to scope an animation, and remember to set `material.transparent = true` on any material whose `opacity` is animated, otherwise Three.js renders it fully opaque.

> Uniforms whose value is itself a `Texture`, `Matrix3`, or `Matrix4`, as well as `UniformArrayNode` and `BufferNode`, are not handled. Animate `Texture` transforms directly on the texture (see Object properties), or animate the underlying numeric fields.

Example (javascript):

```javascript
import { animate, createTimer, utils } from 'animejs';
import * as THREE from 'three';
import 'animejs/adapters/three';

// Three.js setup

const [ $container ] = utils.$('.full-container');
const { clientWidth: width, clientHeight: height } = $container;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
$container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
camera.position.set(0, 0, 8);
scene.add(camera);

scene.add(new THREE.AmbientLight(0xffffff, 0.15));
const dirLight = new THREE.DirectionalLight(0xffffff, 5);
dirLight.position.set(3, 2, 3);
const lightRig = new THREE.Group().add(dirLight);
scene.add(lightRig);

// Three spheres sharing a single geometry
const sphereGeometry = new THREE.SphereGeometry(0.8, 64, 64);

// Sphere 1: built-in MeshStandardMaterial
const standard = new THREE.Mesh(sphereGeometry, new THREE.MeshStandardMaterial());
standard.position.set(-2.5, -0.25, 0);
scene.add(standard);

// Vertex wave deformation along the normal, with an optional rim light
function applyWave(material, { rim = false } = {}) {
  material.uniforms = {
    uTime: { value: 0 },
    uAmplitude: { value: 0.04 },
    uFrequency: { value: new THREE.Vector3(3, 3, 3) },
  };
  if (rim) material.uniforms.uRim = { value: 0 };
  material.onBeforeCompile = shader => {
    Object.assign(shader.uniforms, material.uniforms);
    shader.vertexShader = `
      uniform float uTime;
      uniform float uAmplitude;
      uniform vec3 uFrequency;
    ` + shader.vertexShader.replace('#include <begin_vertex>', `
      #include <begin_vertex>
      float w = sin(uTime + position.x * uFrequency.x)
             + sin(uTime + position.y * uFrequency.y)
             + sin(uTime + position.z * uFrequency.z);
      transformed += normal * w * uAmplitude;
    `);
    if (rim) {
      shader.fragmentShader = `
        uniform float uRim;
      ` + shader.fragmentShader.replace('#include <dithering_fragment>', `
        #include <dithering_fragment>
        gl_FragColor.rgb += pow(1.0 - max(vNormal.z, 0.0), 3.0) * uRim;
      `);
    }
  };
  return material;
}

// Sphere 2: MeshStandardMaterial with the wave vertex hook
const waveMaterial = applyWave(new THREE.MeshStandardMaterial({ metalness: 0.4, roughness: 0.3 }), { rim: true });
const waveSphere = new THREE.Mesh(sphereGeometry, waveMaterial);
waveSphere.position.set(0, -0.25, 0);
scene.add(waveSphere);

// Sphere 3: MeshToonMaterial with a hard 2-band ramp for darker shadows
const toonRamp = new THREE.DataTexture(new Uint8Array([17, 17, 17, 255, 255, 255, 255, 255]), 2, 1);
toonRamp.magFilter = toonRamp.minFilter = THREE.NearestFilter;
toonRamp.needsUpdate = true;

const toonMaterial = applyWave(new THREE.MeshToonMaterial({ gradientMap: toonRamp }));
const toon = new THREE.Mesh(sphereGeometry, toonMaterial);
toon.position.set(2.5, -0.25, 0);
scene.add(toon);

// Animation with Three.js adapter

// Rotate the light around the scene
animate(lightRig, {
  rotateY: 360,
  duration: 6000,
  loop: true,
  ease: 'linear',
});

// Standard material fields auto-mapped through the mesh
animate(standard, {
  roughness: [1, 0.3, 1], // map to standard.material.roughness
  metalness: [0, 0.5, 0], // map to standard.material.metalness
  duration: 4000,
  loop: true,
});

// Wave sphere uniforms
animate(waveSphere, {
  uTime: { to: Math.PI * 2, ease: 'linear' }, // map to waveMaterial.uniforms.uTime.value
  uFrequencyX: () => utils.random(3, 10, 1), // map to waveMaterial.uniforms.uFrequency.value.x
  uFrequencyZ: () => utils.random(3, 10, 1), // map to waveMaterial.uniforms.uFrequency.value.z
  uAmplitude: () => utils.random(0.02, 0.08, 2), // map to waveMaterial.uniforms.uAmplitude.value
  uRim: [0, 0.5, 0], // map to waveMaterial.uniforms.uRim.value
  duration: 4000,
  loop: true,
  onLoop: self => self.refresh(),
});

// Toon sphere uniforms
animate(toon, {
  uTime: { to: Math.PI * 2, ease: 'linear' }, // map to toonMaterial.uniforms.uTime.value
  uFrequencyX: () => utils.random(50, 100),
  uFrequencyZ: () => utils.random(50, 100),
  uAmplitude: () => utils.random(0.05, 0.1, 2),
  duration: 3000,
  loop: true,
  onLoop: self => self.refresh(),
});

// Shared color cycle across all three spheres
animate([standard, waveSphere, toon], {
  color: ['var(--hex-green-1)', 'var(--hex-sky-1)', 'var(--hex-yellow-1)', 'var(--hex-green-1)'],
  duration: 6000,
  loop: true,
});

createTimer({ onUpdate: () => renderer.render(scene, camera) });
```

Example (html):

```html
<div class="full-container"></div>
```

---

## Three.js common gotchas

Docs: https://animejs.com/documentation/adapters/threejs-adapter/threejs-adapter-common-gotchas

### Edge cases to keep in mind when animating Three.js objects.


### Rotation order

`rotateX` / `rotateY` / `rotateZ` write to `target.rotation.x` / `.y` / `.z` directly. Three.js applies them in its default Euler order `'XYZ'`. If `target.rotation.order` has been changed, the result will not match the names. Use a `Quaternion` outside the adapter when you need a different order.


### Transparent flag for opacity fades

Animating `opacity` on a material whose `transparent` flag is `false` has no visible effect. Three.js still renders it fully opaque. Set `material.transparent = true` on any material intended to fade.


### Visibility flip and direct mutation

Setting `opacity = 0`, `scale = 0`, or any scale axis to `0` flips `target.visible` to `false`. The flip only fires through `animate()` or `utils.set()`. A direct write like `mesh.scale.x = 0` leaves `mesh.visible` alone.


### Shared materials and the mesh shorthand

Material properties live on the material, not on the mesh. Animating them updates every other mesh sharing that material instance. Clone the material per mesh to scope the animation. The mesh shorthand also only routes to the material when the mesh has no own field with the same name, so a mesh-level property always wins.


### Group fades

A `Group` doesn't own a material, so animating `opacity` or `color` on a group has no effect on its children. Pass an array of descendant meshes as targets to fade an entire subtree.


### Single Three.js instance

Three.js is an optional peer dependency. Your bundler must resolve `'three'` to a single instance. Duplicated copies in nested `node_modules` make `instanceof` checks fail, and the adapter silently misses any targets coming from the other copy.


### Out-of-scope uniform types

Uniforms whose value is a `Texture`, `Matrix3`, or `Matrix4`, plus `UniformArrayNode` and `BufferNode`, are not handled. Animate `Texture` transforms on the texture itself, or animate the underlying numeric fields directly.


### Instance proxy caveats

On a per-instance proxy, `opacity` writes the shared material so every slot is affected, and `visible` is a no-op on `InstancedMesh`. After `getInstances()` runs, reading back `mesh.onBeforeRender` will not return the exact function you assigned, though assigning to it still works.

---

## Three.js instanced meshes

Docs: https://animejs.com/documentation/adapters/threejs-adapter/threejs-instanced-and-batched-meshes · Since 4.5.0

### AnimateInstancedMeshandBatchedMeshslots one at a time through per-instance proxies.

`getInstances(mesh)` returns one proxy per slot. The proxies accept the same property names as a regular mesh.

```js
import { animate, stagger } from 'animejs';
import { getInstances } from 'animejs/adapters/three';

const instances = getInstances(mesh);

animate(instances, {
  x: 100,
  scale: 2,
  delay: stagger(20),
});
```


### getInstances

Returns the array of per-instance proxies for `mesh`. Pass the array, a slice of it, or a single proxy to `animate()` and `utils.set()`.

```js
const instances = getInstances(mesh);
```


#### Parameters

| Name | Accepts |
|---|---|
| mesh | An `InstancedMesh` or `BatchedMesh` |


#### Returns

An `Array` of per-instance proxies. Deleted `BatchedMesh` slots are `null`.

The array reference stays the same across `mesh.count`, `addInstance()`, and `deleteInstance()`, so animations bound to it keep working as the instance count changes.


### commitChanges

Flushes pending matrix writes for `mesh`. The adapter calls this automatically before each render. Call it yourself only if you read `mesh.instanceMatrix` between an animation tick and the next render.

```js
commitChanges(mesh);
```


#### Parameters

| Name | Accepts |
|---|---|
| mesh | An `InstancedMesh` or `BatchedMesh` previously passed to `getInstances()` |


### Per-instance properties

Each proxy carries the full `Object3D` transform set, the skew and `transformOrigin` axes, plus a `color` routed through `mesh.setColorAt()`.

| Name | Maps to |
|---|---|
| x / y / z | per-instance position |
| rotateX / Y / Z | per-instance rotation (degrees) |
| scaleX / Y / Z / scale | per-instance scale |
| skewX / Y / Z | per-instance skew (degrees) |
| transformOriginX / Y / Z | per-instance origin shift |
| transformOrigin | `'x y z'` shorthand |
| color | `mesh.setColorAt(id, color)` |
| visible | `mesh.setVisibleAt(id, value)` (`BatchedMesh` only) |

> `opacity` writes the shared material, so it affects every instance. To fade individual slots, build an alpha channel into the material's shader and animate the per-instance `color`. `visible` is also a no-op on `InstancedMesh`, use `scale = 0` to hide a single instance.

> After `getInstances()` runs, `mesh.onBeforeRender === fn` identity checks will not match, but assigning to it still works.

Example (javascript):

```javascript
import { animate, createTimer, stagger, utils } from 'animejs';
import * as THREE from 'three';
import { getInstances } from 'animejs/adapters/three';

// Three.js setup

const [ $container ] = utils.$('.full-container');
const { clientWidth: width, clientHeight: height } = $container;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
$container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, width / height, 0.01, 100);
camera.position.set(0, 0, 1.5);
scene.add(camera);

scene.add(new THREE.AmbientLight(0xffffff, 0.35));
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(2, 3, 4);
scene.add(light);

const gridSize = 6; // cubes per axis
const cellSize = 2 / gridSize; // size of each cube
const spread = (gridSize - 1) / 2 * cellSize; // distance from center to the outer cubes
const geometry = new THREE.BoxGeometry(cellSize, cellSize, cellSize);
const material = new THREE.MeshLambertMaterial();
const mesh = new THREE.InstancedMesh(geometry, material, gridSize * gridSize * gridSize);
scene.add(mesh);

// Animation with Three.js adapter

const instances = getInstances(mesh);
const palette = ['red', 'orange', 'yellow', 'green', 'sky', 'purple', 'pink']
  .map(name => utils.get($container, `--hex-${name}-1`));
const gridAxis = (axis, span = spread) => stagger([-span, span], { grid: [gridSize, gridSize, gridSize], axis });

// Slowly rotate the whole mesh
animate(mesh, {
  rotateY: 360,
  rotateX: 360,
  duration: 24000,
  loop: true,
  ease: 'linear',
});

// Color, scale and spread each instance, staggered from the center
animate(instances, {
  color: palette,
  x: [gridAxis('x', spread * .25), gridAxis('x')],
  y: [gridAxis('y', spread * .25), gridAxis('y')],
  z: [gridAxis('z', spread * .25), gridAxis('z')],
  scale: [.1, .25, .1],
  delay: stagger([0, 3000], { grid: [gridSize, gridSize, gridSize], from: 'center', reversed: true }),
  duration: 2000,
  loopDelay: 500,
  loop: true,
  alternate: true,
  ease: 'inOutQuad',
});

createTimer({ onUpdate: () => renderer.render(scene, camera) });
```

Example (html):

```html
<div class="full-container"></div>
```

---

## Three.js object properties

Docs: https://animejs.com/documentation/adapters/threejs-adapter/threejs-object-property-adapter · Since 4.5.0

### Every property name the Three.js adapter exposes, grouped by target type.

The names below map to specific Three.js fields or methods. Anything not listed falls through to the auto-detection covered in the overview, which detects `Color`, `Vector`, scalar, and boolean fields automatically, and converts angle-named fields (`rotation`, `angle`) between degrees and radians.


### Object3D built-in mappings

Available on every `Object3D` subclass: `Mesh`, `Group`, `Sprite`, `Points`, lights, cameras, ...

| Name | Maps to | Unit |
|---|---|---|
| x | `target.position.x` | — |
| y | `target.position.y` | — |
| z | `target.position.z` | — |
| rotateX | `target.rotation.x` | degrees |
| rotateY | `target.rotation.y` | degrees |
| rotateZ | `target.rotation.z` | degrees |
| scaleX | `target.scale.x` | — |
| scaleY | `target.scale.y` | — |
| scaleZ | `target.scale.z` | — |
| scale | `target.scale.x` / `.y` / `.z` (uniform) | — |
| skewX | shear on the X axis | degrees |
| skewY | shear on the Y axis | degrees |
| skewZ | shear on the Z axis | degrees |
| transformOriginX | pivot shift on the X axis | — |
| transformOriginY | pivot shift on the Y axis | — |
| transformOriginZ | pivot shift on the Z axis | — |
| transformOrigin | `"x y z"` shorthand for all axes | — |

See Extended transforms for the rotation order, skew, and automatic visibility toggle.


### Mesh built-in mappings

Material shortcuts on top of the `Object3D` set.

| Name | Maps to | Notes |
|---|---|---|
| opacity | `target.material.opacity` (or array) | flips `target.visible = false` at `0` |
| color | `target.material.color` | accepts any CSS color value |


### Light built-in mappings

Light-specific colors on top of the `Object3D` set. Numeric fields like `intensity`, `distance`, or `decay` fall through to direct property access. `SpotLight.angle` is auto-converted to degrees by the angle resolver.

| Name | Maps to | Available on |
|---|---|---|
| color | `target.color` | All lights |
| groundColor | `target.groundColor` | `HemisphereLight` |


### PerspectiveCamera built-in mappings

Any projection change auto-calls `target.updateProjectionMatrix()`.

| Name | Maps to | Unit |
|---|---|---|
| fov | `target.fov` | degrees |
| aspect | `target.aspect` | — |
| focalLength | `target.setFocalLength()` | mm |
| near | `target.near` | — |
| far | `target.far` | — |
| zoom | `target.zoom` | — |


### OrthographicCamera built-in mappings

Any projection change auto-calls `target.updateProjectionMatrix()`.

| Name | Maps to | Unit |
|---|---|---|
| left | `target.left` | — |
| right | `target.right` | — |
| top | `target.top` | — |
| bottom | `target.bottom` | — |
| near | `target.near` | — |
| far | `target.far` | — |
| zoom | `target.zoom` | — |


### Scene built-in mappings

| Name | Maps to | Notes |
|---|---|---|
| background | `target.background` | a `Color` is created on first write if missing |


### Audio built-in mappings

| Name | Maps to | Available on |
|---|---|---|
| volume | `target.setVolume()` | `Audio`, `PositionalAudio` |
| refDistance | `target.setRefDistance()` | `PositionalAudio` |
| rolloffFactor | `target.setRolloffFactor()` | `PositionalAudio` |
| maxDistance | `target.setMaxDistance()` | `PositionalAudio` |


### Fog built-in mappings

Fog scalars (`near`, `far`, `density`) fall through to direct property access.

| Name | Maps to | Available on |
|---|---|---|
| color | `target.color` | `Fog`, `FogExp2` |


### Texture built-in mappings

Texture transforms split into per-axis names, and `rotation` animates around `target.center`.

| Name | Maps to | Unit |
|---|---|---|
| offsetX | `target.offset.x` | — |
| offsetY | `target.offset.y` | — |
| repeatX | `target.repeat.x` | — |
| repeatY | `target.repeat.y` | — |
| centerX | `target.center.x` | — |
| centerY | `target.center.y` | — |
| rotation | `target.rotation` | degrees |


### UniformNode built-in mappings

A `UniformNode` from `'three/tsl'` wraps a starting value (`Number`, `Boolean`, `Color`, or `Vector`). Animate the wrapped value through these names.

| Name | Maps to | Available when |
|---|---|---|
| color | `target.value` | `Color`-valued uniforms |
| x | `target.value.x` | `Vector2` / `Vector3` / `Vector4` uniforms |
| y | `target.value.y` | `Vector2` / `Vector3` / `Vector4` uniforms |
| z | `target.value.z` | `Vector3` / `Vector4` uniforms |
| w | `target.value.w` | `Vector4` uniforms |

Scalar and boolean uniforms animate through `value` directly without needing a dedicated entry.

Example (javascript):

```javascript
import { createTimeline, createTimer, utils } from 'animejs';
import * as THREE from 'three';
import 'animejs/adapters/three';

// Three.js setup

const [ $container ] = utils.$('.full-container');
const color = utils.get($container, 'color');
const { clientWidth: width, clientHeight: height } = $container;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
renderer.shadowMap.enabled = true;
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
$container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
camera.position.set(0, 2.5, 6);
camera.lookAt(0, 0, -3);
scene.add(camera);

const container = new THREE.Group();
scene.add(container);

const groundGeometry = new THREE.PlaneGeometry(12, 12);
const groundMaterial = new THREE.MeshLambertMaterial({ color });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
container.add(ground);

const gridColorA = utils.get($container, '--hex-current-1');
const gridColorB = utils.get($container, '--hex-current-3');
const grid = new THREE.GridHelper(12, 24, gridColorA, gridColorB);
grid.position.y = 0.001;
container.add(grid);

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshLambertMaterial({ color });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.y = 0.5;
cube.castShadow = true;
container.add(cube);

const spot = new THREE.SpotLight(0xffffff, 100, 12, Math.PI / 5, 0.4);
spot.position.set(0, 3, 0);
spot.castShadow = true;
spot.target = cube;
container.add(new THREE.AmbientLight(0xffffff, 0.3));
container.add(spot);

const spotHelper = new THREE.SpotLightHelper(spot, color);
container.add(spotHelper);

// Animation with Three.js adapter

createTimeline({ defaults: { duration: 5000, ease: 'linear', loop: true } })
  .add(container, {
    rotateY: 360, // map to container.rotation.y (degrees)
    duration: 40000,
  }, 0)
  .add(spot, {
    x: () => utils.random(-7, 7, 1), // map to spot.position.x
    y: () => utils.random(3, 4, 1), // map to spot.position.y
    z: () => utils.random(-7, 7, 1), // map to spot.position.z
    duration: 3000,
    ease: 'inOutSine',
    onLoop: self => self.refresh(),
  }, 0)
  .add(cube, {
    color: ['var(--hex-orange-1)', 'var(--hex-citrus-1)', 'var(--hex-green-1)'], // map to cube.material.color
    x: [-4, 0, 4], // map to cube.position.x
    y: {
      to: [0, 4 * Math.PI], // map to cube.position.y (via modifier)
      modifier: value => 0.5 * (Math.abs(Math.sin(value)) + Math.abs(Math.cos(value))),
    },
    rotateZ: [360, 0, -360], // map to cube.rotation.z (degrees)
    alternate: true,
    onUpdate: () => spotHelper.update(),
  }, 0);

createTimer({ onUpdate: () => renderer.render(scene, camera) });
```

Example (html):

```html
<div class="full-container"></div>
```

---

## Three.js extended transforms

Docs: https://animejs.com/documentation/adapters/threejs-adapter/threejs-transforms-adapter · Since 4.5.0

### A CSS-like transforms API for Three.js 3D objects and instanced meshes.

Position, rotation, and scale animate per-axis like in CSS. The adapter also adds `skew` and `transformOrigin` on top of the built-in Three.js transforms. The same names work on per-instance proxies from `getInstances()` for `InstancedMesh` and `BatchedMesh`, so individual instances can be transformed independently.

```js
animate(mesh, {
  x: 100,
  rotateY: 360,
  scale: 1.5,
  skewX: 15,
  transformOrigin: '0 1 0',
});
```


### Position, rotation and scale

`x` / `y` / `z` write to `mesh.position`. `rotateX` / `rotateY` / `rotateZ` write to `mesh.rotation` in degrees. `scaleX` / `scaleY` / `scaleZ` write to `mesh.scale`, with `scale` as a shorthand for all three.

| Name | Maps to | Unit |
|---|---|---|
| x | `mesh.position.x` | — |
| y | `mesh.position.y` | — |
| z | `mesh.position.z` | — |
| rotateX | `mesh.rotation.x` | degrees |
| rotateY | `mesh.rotation.y` | degrees |
| rotateZ | `mesh.rotation.z` | degrees |
| scaleX | `mesh.scale.x` | — |
| scaleY | `mesh.scale.y` | — |
| scaleZ | `mesh.scale.z` | — |
| scale | `mesh.scale.x` / `.y` / `.z` (uniform) | — |

> Rotations assume the default Euler order `'XYZ'`. Animating `rotateX` / `rotateY` / `rotateZ` on a target whose `rotation.order` has been changed will not match what the property names suggest.


### Skew

`skewX` and `skewY` apply CSS-style angular shears on the X and Y axes. `skewZ` shears `z` by `x` in the same fashion. All three are applied after position / rotation / scale, and skipped when their value is `0`.

| Name | Maps to | Unit |
|---|---|---|
| skewX | `tan(skewX)` shear of `y` by `x` | degrees |
| skewY | `tan(skewY)` shear of `x` by `y` | degrees |
| skewZ | `tan(skewZ)` shear of `z` by `x` | degrees |


### Transform origin

Matches the CSS property: shifts the pivot used by skew and rotation. Values are in the target's geometry units.

| Name | Maps to | Notes |
|---|---|---|
| transformOriginX | origin shift on the X axis | — |
| transformOriginY | origin shift on the Y axis | — |
| transformOriginZ | origin shift on the Z axis | — |
| transformOrigin | `'x y z'` shorthand | 3-token string, all axes at once |


### Automatic visibility toggle

Setting any scale axis or `opacity` to `0` flips `target.visible` to `false`, so meshes that have been faded or scaled out of view are skipped during render. Returning to a non-zero value restores `target.visible = true`.

> The visibility flip only fires when the property is written through `animate()` or `utils.set()`. Direct mutation of `mesh.scale.x = 0` or `mesh.material.opacity = 0` outside the adapter does not touch `mesh.visible`.

Example (javascript):

```javascript
import { animate, createTimer, utils } from 'animejs';
import * as THREE from 'three';
import 'animejs/adapters/three';

// Three.js setup

const [ $container ] = utils.$('.full-container');
const color = utils.get($container, 'color');
const { clientWidth: width, clientHeight: height } = $container;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
renderer.shadowMap.enabled = true;
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
$container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
camera.position.set(0, 3, 8);
camera.lookAt(0, 0.2, 0);
const cameraRig = new THREE.Group().add(camera);
scene.add(cameraRig);

scene.add(new THREE.AmbientLight(0xffffff, 0.3));
const spot = new THREE.SpotLight(0xffffff, 100, 12, Math.PI / 5, 0.4);
spot.position.set(0, 5, 0);
spot.castShadow = true;
scene.add(spot);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
dirLight.position.set(2, 3, 4);
scene.add(dirLight);

const groundGeometry = new THREE.PlaneGeometry(12, 12);
const groundMaterial = new THREE.MeshLambertMaterial({ color });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

const gridColorA = utils.get($container, '--hex-current-1');
const gridColorB = utils.get($container, '--hex-current-3');
const grid = new THREE.GridHelper(12, 24, gridColorA, gridColorB);
grid.position.y = 0.001;
scene.add(grid);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const cubes = [-2, 0, 2].map(x => {
  const cube = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial());
  cube.position.set(x, 0.5, 0);
  cube.castShadow = cube.receiveShadow = true;
  scene.add(cube);
  return cube;
});

// Animation with Three.js adapter

animate(cameraRig, {
  rotateY: 360,
  duration: 20000,
  loop: true,
  ease: 'linear',
});

utils.set(cubes[0], { color: 'var(--hex-red-1)' });
utils.set(cubes[1], { color: 'var(--hex-citrus-1)', transformOriginY: -0.5 });
utils.set(cubes[2], { color: 'var(--hex-green-1)', transformOrigin: '-.5 -.5 .5' });

// Cube 1: small up and down with rotation
animate(cubes[0], {
  y: [0.5, 1, 0.5],
  rotateY: 180,
  duration: 2000,
  loop: true,
  ease: 'inOutSine',
});

// Cube 2: skew left to right pivoting on its base
animate(cubes[1], {
  skewX: [-30, 30, 0, 0],
  skewZ: [0, 0, -30, 30],
  duration: 2000,
  alternate: true,
  loop: true,
  ease: 'inOutSine',
});

// Cube 3: scale with the origin sliding from one corner to the opposite
animate(cubes[2], {
  scale: [1, .25, 1],
  transformOrigin: ['-.5 -.5 .5', '.5 .5 -.5'],
  duration: 2000,
  alternate: true,
  loop: true,
  ease: 'inOutSine',
});

createTimer({ onUpdate: () => renderer.render(scene, camera) });
```

Example (html):

```html
<div class="full-container"></div>
```

---

