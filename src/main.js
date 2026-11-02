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
   2 y 8 · Tarjetas que entran girando desde los costados
   ====================================================================== */
if (!reduce) {
  $$('[data-side]').forEach((el) => {
    const dir = el.dataset.side === 'left' ? -1 : 1;
    frame.add(() => {
      const r = el.getBoundingClientRect();
      const H = vh();
      if (r.top > H * 1.3 || r.bottom < -H * 0.3) return;
      const t = out3(clamp01((H * 1.05 - r.top) / (H * 0.7)));
      el.style.transform = `translateX(${(1 - t) * dir * 60}vw) rotateY(${(1 - t) * dir * -70}deg) rotateZ(${(1 - t) * dir * 6}deg)`;
      el.style.opacity = String(clamp01(t * 1.5));
    });
  });
}

/* ======================================================================
   3 · Cubo doble: dos prismas giran con el scroll, uno con leve retraso
   ====================================================================== */
const cubePin = $('[data-cube-pin]');
const cubeA = $('[data-cube-a]');
const cubeB = $('[data-cube-b]');
const dots = $$('.cube-dots li');
if (!reduce && cubePin) {
  const STEPS = 5;
  const angleFor = (p, lag) => {
    const x = p * STEPS;
    const i = Math.min(STEPS, Math.floor(x));
    if (i >= STEPS) return STEPS * 60;
    const f = x - i;
    return (i + inOut(clamp01((f - 0.28 - lag) / 0.5))) * 60;
  };
  let lastIdx = -1;
  frame.add(() => {
    const r = cubePin.getBoundingClientRect();
    if (r.bottom < -100 || r.top > vh() + 100) return;
    const p = clamp01(-r.top / Math.max(1, r.height - vh()));
    const a = angleFor(p, 0);
    const b = angleFor(p, 0.07);
    cubeA.style.transform = `translateZ(calc(var(--r) * -1)) rotateX(${a}deg)`;
    cubeB.style.transform = `translateZ(calc(var(--r) * -1)) rotateX(${b}deg)`;
    const idx = Math.round(a / 60);
    if (idx !== lastIdx) { dots.forEach((d, i) => d.classList.toggle('is-active', i === idx)); lastIdx = idx; }
  });
}

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
    const step = vh() * (isPhone() ? 0.16 : 0.12);
    rows.forEach((li, i) => {
      const d = i - pos;
      const ad = Math.abs(d);
      li.style.transform = `translateY(${d * step}px) rotateX(${-d * 26}deg) translateZ(${-ad * 70}px)`;
      li.style.opacity = String(clamp01(1 - ad * 0.3));
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
