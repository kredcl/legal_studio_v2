import '@fontsource/michroma/400.css';
import '@fontsource-variable/open-sans/wdth.css';
import './style.css';

import Lenis from 'lenis';
import { animate, onScroll, splitText, stagger, utils } from 'animejs';

const root = document.documentElement;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduce) root.classList.add('rm');

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const inOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const out3 = (t) => 1 - Math.pow(1 - t, 3);
const vh = () => window.innerHeight;
const vw = () => window.innerWidth;
const isPhone = () => window.matchMedia('(max-width: 700px)').matches;
/** Avance de una sección fijada: 0 cuando su borde superior llega arriba, 1 cuando su borde inferior llega abajo. */
const pinProgress = (el) => {
  const r = el.getBoundingClientRect();
  return clamp01(-r.top / Math.max(1, r.height - vh()));
};

/* ---------- scroll suave y anclas ---------- */
const lenis = reduce ? null : new Lenis({ autoRaf: true, lerp: 0.1 });
$$('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    const target = id.length > 1 ? $(id) : null;
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { duration: 1.6 });
    else target.scrollIntoView();
  });
});

/* ---------- bucle por cuadro ---------- */
const frame = new Set();
const tick = () => { frame.forEach((fn) => fn()); requestAnimationFrame(tick); };
requestAnimationFrame(tick);

/* ---------- videos: solo se reproducen cuando están a la vista ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(({ target, isIntersecting }) => {
    if (isIntersecting) target.play().catch(() => {});
    else target.pause();
  });
}, { rootMargin: '200px' });
$$('video').forEach((v) => io.observe(v));

/* ---------- cabecera: color según la sección de abajo, se oculta al bajar ---------- */
const hdr = $('[data-hdr]');
const toneSections = $$('main > section, footer');
let lastY = window.scrollY;
frame.add(() => {
  const y = window.scrollY;
  const under = toneSections.find((s) => { const r = s.getBoundingClientRect(); return r.top <= 40 && r.bottom > 40; });
  const light = under && (under.matches('.phrases, .partners, .road, .press') || (under.matches('.teamword') && under.classList.contains('is-white')));
  hdr.classList.toggle('is-light', !!light);
  if (Math.abs(y - lastY) > 6) { hdr.classList.toggle('is-hidden', y > lastY && y > 300); lastY = y; }
});

/* ======================================================================
   1 · HÉROE: el video crece desde su tarjeta hasta llenar la pantalla
   ====================================================================== */
const hero = $('[data-hero]');
const heroVideo = $('[data-hero-video]');
const heroWord = $('[data-hero-word]');
const heroText = $('[data-hero-text]');
const heroLabel = $('[data-hero-label]');
let inset0 = { t: 0, r: 0, b: 0, l: 0 };
const measureHero = () => {
  const pad = heroWord.offsetLeft;
  const H = vh(); const W = vw();
  inset0 = isPhone()
    ? { t: H * 0.46, r: pad, b: H * 0.22, l: pad }
    : { t: H * 0.43, r: pad, b: H * 0.34, l: W * 0.58 };
};
if (!reduce) {
  measureHero();
  window.addEventListener('resize', measureHero);
  // Entrada: la marca sube letra por letra y la frase aparece
  const wordSpan = heroWord.querySelector('[aria-hidden]');
  const { chars } = splitText(wordSpan, { chars: { wrap: 'clip' } });
  animate(chars, { y: ['105%', '0%'], duration: 1200, delay: stagger(70, { start: 200 }), ease: 'out(4)' });
  animate(heroText, { opacity: [0, 1], y: [30, 0], duration: 1000, delay: 700, ease: 'out(3)' });
  animate(heroVideo, { opacity: [0, 1], duration: 900, delay: 900, ease: 'out(2)' });

  const vid = heroVideo.querySelector('video');
  frame.add(() => {
    const p = pinProgress(hero);
    if (p >= 1 && hero.getBoundingClientRect().bottom < 0) return;
    const e = inOut(clamp01(p / 0.5));
    const k = 1 - e;
    heroVideo.style.clipPath = `inset(${inset0.t * k}px ${inset0.r * k}px ${inset0.b * k}px ${inset0.l * k}px)`;
    vid.style.transform = `scale(${1.18 - 0.18 * e})`;
    heroWord.style.transform = `translateY(${e * 24}vh)`;
    heroWord.style.opacity = String(1 - clamp01(e * 1.4));
    heroText.style.transform = `translateY(${-e * 18}vh)`;
    heroText.style.opacity = String(1 - clamp01(e * 1.8));
    const l = out3(clamp01((p - 0.52) / 0.2));
    heroLabel.style.opacity = String(l);
    heroLabel.style.transform = `translateY(${(1 - l) * 40}px)`;
  });
}

/* ======================================================================
   2 y 8 · Tarjetas que se abren como una puerta desde los costados
   ====================================================================== */
if (!reduce) {
  $$('[data-side]').forEach((el) => {
    const left = el.dataset.side === 'left';
    el.style.transformOrigin = left ? '0% 50%' : '100% 50%';
    frame.add(() => {
      const r = el.getBoundingClientRect();
      const H = vh();
      if (r.top > H * 1.3 || r.bottom < -H * 0.3) return;
      // el giro empieza cuando la tarjeta asoma y termina cuando su borde superior llega al 20 % de la pantalla
      // empieza cuando la tarjeta ya asoma (borde superior al 96 %) y termina con el borde al 22 %
      const t = clamp01((H * 0.96 - r.top) / (H * 0.74));
      const e = inOut(t) * 0.35 + (1 - Math.pow(1 - t, 2)) * 0.65;
      const k = 1 - e;
      const rot = (left ? 1 : -1) * 98 * k; // borde interior se aleja: la hoja gira hacia la pantalla
      el.style.transform = `translateX(${(left ? -1 : 1) * 24 * k}vw) translateZ(${-80 * k}px) rotateY(${rot}deg)`;
      el.style.opacity = String(clamp01(t * 3));
    });
  });
}

/* ======================================================================
   3 · Cubo doble: dos cubos de 4 caras giran en sentidos opuestos.
   Hay 6 estados y 4 caras: cada cara toma el contenido del estado que le toca
   mientras está oculta detrás del cubo.
   ====================================================================== */
const cubePin = $('[data-cube-pin]');
const MEDIA = [
  { video: 'video/tribunales.mp4', poster: 'video/tribunales.jpg' },
  { img: 'img/c-mazo-900.jpg' },
  { img: 'img/c-torres-900.jpg' },
  { img: 'img/c-vidrio-900.jpg' },
  { img: 'img/c-sala-900.jpg' },
  { img: 'img/c-edificio-blanco-900.jpg', red: true },
];
if (!reduce && cubePin) {
  const cards = $$('[data-cube-states] > *');
  const STATES = cards.length; // 6
  const cubes = [$('[data-cube-a]'), $('[data-cube-b]')].map((el, ci) => ({
    el,
    dir: +el.dataset.dir,
    faces: $$('.face', el),
    shown: [-1, -1, -1, -1],
    render(face, state) {
      if (ci === 0) {
        const src = cards[state];
        face.className = `face ${src.className}`;
        face.innerHTML = src.innerHTML;
        if (src.tagName === 'A') { face.onclick = () => lenis ? lenis.scrollTo('#contacto') : $('#contacto').scrollIntoView(); face.style.cursor = 'pointer'; }
        else { face.onclick = null; face.style.cursor = ''; }
      } else {
        const m = MEDIA[state];
        face.className = `face face-media${m.red ? ' face-red' : ''}`;
        face.innerHTML = m.video
          ? `<video src="${m.video}" poster="${m.poster}" muted loop playsinline autoplay preload="auto"></video>`
          : `<img src="${m.img}" width="900" height="900" alt="">`;
        const v = face.querySelector('video'); if (v) v.play().catch(() => {});
      }
    },
  }));
  // precarga
  MEDIA.forEach((m) => { if (m.img) { const i = new Image(); i.src = m.img; } });
  cubes.forEach((c) => c.faces.forEach((f, i) => {
    f.style.transform = `rotateX(${-c.dir * i * 90}deg) translateZ(calc(var(--cs) / 2))`;
  }));

  const STEPS = STATES - 1;
  const posFor = (p, lag) => {
    const x = p * STEPS;
    const i = Math.min(STEPS, Math.floor(x));
    if (i >= STEPS) return STEPS;
    return i + inOut(clamp01((x - i - 0.22 - lag) / 0.56));
  };
  let lastIdx = -1;
  frame.add(() => {
    const r = cubePin.getBoundingClientRect();
    if (r.bottom < -100 || r.top > vh() + 100) return;
    const p = clamp01(-r.top / Math.max(1, r.height - vh()));
    cubes.forEach((c, ci) => {
      const pos = posFor(p, ci * 0.06);
      c.el.style.transform = `translateZ(calc(var(--cs) / -2)) rotateX(${c.dir * pos * 90}deg)`;
      c.faces.forEach((face, f) => {
        // estado que corresponde a esta cara: el más cercano a la posición actual con el mismo resto módulo 4
        let st = f + 4 * Math.round((pos - f) / 4);
        if (st < 0) st += 4;
        if (st > STATES - 1) st -= 4;
        if (st !== c.shown[f]) { c.render(face, st); c.shown[f] = st; }
        // sombra: la cara que se aleja se oscurece
        const d = Math.min(1, Math.abs(pos - st));
        face.style.setProperty('--shade', (d * 0.38).toFixed(3));
      });
    });
    const idx = Math.round(posFor(p, 0));
    if (idx !== lastIdx) { dots.forEach((d, i) => d.classList.toggle('is-active', i === idx)); lastIdx = idx; }
  });
}
const dots = $$('.cube-dots li');

/* ======================================================================
   4 · EQUIPO: la palabra crece desde la I hasta pintar la pantalla de blanco
   ====================================================================== */
const tw = $('[data-teamword]');
if (!reduce && tw) {
  const word = $('[data-teamword-word]');
  const pre = $('[data-teamword-pre]');
  const I = $('[data-teamword-i]');
  const setOrigin = () => {
    word.style.transform = 'none';
    const wr = word.getBoundingClientRect();
    const ir = I.getBoundingClientRect();
    const ox = ((ir.left + ir.width / 2 - wr.left) / wr.width) * 100;
    const oy = ((ir.top + ir.height * 0.55 - wr.top) / wr.height) * 100;
    word.style.transformOrigin = `${ox}% ${oy}%`;
  };
  setOrigin();
  window.addEventListener('resize', setOrigin);
  document.fonts?.ready.then(setOrigin);
  frame.add(() => {
    const r = tw.getBoundingClientRect();
    if (r.bottom < -100 || r.top > vh() + 100) return;
    const p = pinProgress(tw);
    const g = clamp01((p - 0.12) / 0.66);
    word.style.transform = `scale(${1 + Math.pow(g, 3.2) * 70})`;
    pre.style.opacity = String(1 - clamp01(p / 0.22));
    pre.style.transform = `translateY(${-p * 30}vh)`;
    tw.classList.toggle('is-white', g > 0.93);
  });
}

/* ======================================================================
   5 · Frases que cambian y fotos que caen desde los costados
   ====================================================================== */
const ph = $('[data-phrases]');
if (!reduce && ph) {
  const items = [$('.phrase-lead', ph), ...$$('.phrase-list li', ph)];
  const photos = $$('.pp', ph);
  let cur = -1;
  frame.add(() => {
    const r = ph.getBoundingClientRect();
    if (r.bottom < -100 || r.top > vh() + 100) return;
    const p = pinProgress(ph);
    const idx = Math.min(items.length - 1, Math.floor(p * items.length * 0.999));
    if (idx === cur) return;
    cur = idx;
    items.forEach((el, i) => { el.classList.toggle('is-active', i === idx); el.classList.toggle('is-past', i < idx); });
    photos.forEach((im, i) => im.classList.toggle('is-in', idx >= i + 1 || (idx === 0 && i === 0 && p > 0.05)));
  });
  items[0].classList.add('is-active');
}

/* ======================================================================
   6 · Socios: la miniatura elegida pasa al retrato grande
   ====================================================================== */
const pm = $('[data-partner-main]');
if (pm) {
  const img = $('[data-pm-img]');
  const nameEl = $('[data-pm-name]');
  const roleEl = $('[data-pm-role]');
  const areaEl = $('[data-pm-area]');
  const buttons = $$('.partner-thumbs button');
  let current = buttons[0];
  const show = (btn) => {
    if (btn === current) return;
    current = btn;
    buttons.forEach((b) => b.classList.toggle('is-active', b === btn));
    pm.classList.add('is-swapping');
    setTimeout(() => {
      img.src = `img/${btn.dataset.img}-900.jpg`;
      img.alt = `Retrato de ${btn.dataset.name}.`;
      nameEl.textContent = btn.dataset.name;
      roleEl.textContent = btn.dataset.role;
      areaEl.textContent = btn.dataset.area;
      const done = () => pm.classList.remove('is-swapping');
      if (img.complete) requestAnimationFrame(done); else img.addEventListener('load', done, { once: true });
    }, reduce ? 0 : 220);
  };
  buttons.forEach((b) => {
    b.addEventListener('click', () => show(b));
    b.addEventListener('focus', () => show(b));
    if (window.matchMedia('(hover: hover)').matches) b.addEventListener('pointerenter', () => show(b));
  });
  // precarga de los retratos grandes
  buttons.forEach((b) => { const i = new Image(); i.src = `img/${b.dataset.img}-900.jpg`; });
}

/* ======================================================================
   7 · Trayectoria: los años ruedan como un tambor
   ====================================================================== */
const road = $('[data-road]');
if (!reduce && road) {
  const rows = $$('[data-road-list] li');
  frame.add(() => {
    const r = road.getBoundingClientRect();
    if (r.bottom < -100 || r.top > vh() + 100) return;
    const p = pinProgress(road);
    const pos = p * (rows.length - 1);
    const step = vh() * (isPhone() ? 0.2 : 0.19);
    rows.forEach((li, i) => {
      const d = i - pos;
      const ad = Math.abs(d);
      li.style.transform = `translateY(${d * step}px) translateZ(${-ad * 90}px) rotateX(${-d * 32}deg)`;
      li.style.opacity = String(clamp01(1 - ad * 0.38));
      li.classList.toggle('is-active', ad < 0.5);
    });
  });
}

/* ---------- entradas generales ---------- */
if (!reduce) {
  $$('section').forEach((section) => {
    const els = $$('[data-up]', section);
    if (!els.length) return;
    utils.set(els, { opacity: 0, y: 40 });
    animate(els, {
      opacity: 1, y: 0, duration: 1100, ease: 'out(4)', delay: stagger(110),
      autoplay: onScroll({ target: els[0], enter: 'bottom-=8% top', repeat: false }),
    });
  });
  const thumbs = $$('.partner-thumbs li');
  utils.set(thumbs, { opacity: 0, scale: 0.85 });
  animate(thumbs, {
    opacity: 1, scale: 1, duration: 900, ease: 'out(4)', delay: stagger(70, { from: 'random' }),
    autoplay: onScroll({ target: '.partner-board', enter: 'bottom-=10% top', repeat: false }),
  });
}

/* ---------- contacto: valida y prepara el correo ---------- */
const form = $('[data-contact]');
if (form) {
  const note = $('[data-contact-note]');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.nombre.value.trim();
    const mail = form.correo.value.trim();
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
      note.textContent = 'Revise su nombre y un correo válido para poder responderle.';
      (!name ? form.nombre : form.correo).focus();
      return;
    }
    const body = `${form.mensaje.value.trim()}\n\n${name}\n${mail}`;
    note.textContent = `Gracias, ${name}. Abrimos su correo con el mensaje listo para enviar a hola@axioma.legal.`;
    window.location.href = `mailto:hola@axioma.legal?subject=${encodeURIComponent('Consulta desde el sitio')}&body=${encodeURIComponent(body)}`;
  });
}

window.addEventListener('resize', () => lenis?.resize());
