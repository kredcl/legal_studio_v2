# Web Studio: guía de trabajo

Repo base para crear sitios web con Claude Code en la nube. Trae 28 skills de diseño, animación y QA en `.claude/skills/`, que se cargan solas al abrir una sesión con este repo.

Idioma con el usuario: **español**. Los textos de los sitios van en el idioma que pida el cliente (por defecto, español).

## Skills disponibles y cuándo usarlas

| Fase | Skill | Para qué |
|---|---|---|
| Dirección de arte | `design-taste-frontend` (tasteskill) | Elegir dirección visual (composición, tipografía, paleta, fotos) y evitar el look "hecho con IA". **Úsala al empezar cualquier landing o sitio.** |
| Sistema de diseño | `ui-ux-pro-max` | Buscar estilos, paletas por industria, pares tipográficos y guías UX (`python3 .claude/skills/ui-ux-pro-max/scripts/search.py ...`). |
| Tokens y marca | `design-system`, `brand`, `ui-styling`, `design`, `banner-design`, `slides` | Tokens CSS, identidad de marca, shadcn/Tailwind, banners, presentaciones. |
| Crítica y pulido | `impeccable` | Auditar, criticar y pulir (jerarquía, tipografía, color, accesibilidad, responsive). |
| Detalles e interacción | `emil-design-eng`, `apple-design`, `pick-ui-library`, `ask-sonner`, `mobile-native`, `break-ui`, `prototype` | Pulido fino de componentes, sensación nativa en móvil, casos límite. |
| Librerías de animación | `motion` (Motion, ex Framer Motion; + MCP de docs), `animejs` (Anime.js v4, docs oficiales completas) | `motion` para React/Vue y animaciones con física/gestos; `animejs` para sitios vanilla/Astro con timelines, scroll, SVG y texto. |
| Animación | `animate`, `review-animations`, `improve-animations`, `find-animation-opportunities`, `remove-animations`, `animation-performance`, `animation-vocabulary` | Diseñar, revisar y optimizar el movimiento. |
| QA en navegador | `playwright-cli` | Abrir el sitio, tomar capturas en escritorio y móvil, probar clics y formularios. |
| Fuera de alcance web | `write-swift`, `animate-expo` | Solo para apps iOS / Expo. |

## Flujo para cada sitio nuevo

1. **Brief**: negocio, público, objetivo de la página, secciones, tono, referencias, colores o logo si existen.
2. **Dirección**: `design-taste-frontend` + `ui-ux-pro-max` → proponer 1 dirección clara (paleta, tipografías, composición del hero) antes de programar.
3. **Construcción**: por defecto **Vite + HTML/CSS/JS** o **Astro** para sitios de contenido; React solo si hay interactividad real. Tailwind opcional.
4. **Animación**: `animate` para el movimiento con propósito; respetar `prefers-reduced-motion`.
5. **QA visual**: levantar el servidor de desarrollo y revisar con Playwright en 1440px y 390px; corregir lo que se vea mal; repetir.
6. **Crítica final**: `impeccable` (audit/critique) y `review-animations`.
7. **Entrega**: commit + push a la rama de trabajo; abrir PR solo si el usuario lo pide.

## Playwright en la nube

El contenedor trae Playwright y Chromium preinstalados. Si el comando `playwright-cli` no existe, usa el mismo CLI vía:

```bash
npx --no-install playwright cli open http://localhost:5173
```

Comandos útiles: `snapshot`, `screenshot --filename=...`, `click <ref>`, `resize 390 844`, `close`. **No** ejecutes `playwright install`.

## Red

- El entorno tiene acceso a internet sin restricciones (npm, Google Fonts, Unsplash, CDNs, etc.).
- Aun así, preferir librerías instaladas por npm antes que CDNs, por rendimiento y estabilidad.
- Si el motor de `impeccable` no se puede descargar (viene de GitHub Releases), usar sus guías de `reference/` sin el detector automático.

## Publicar en Hostinger

El MCP oficial de Hostinger (`hostinger-api-mcp`) está configurado en `.mcp.json` y lee el token de la variable de entorno `HOSTINGER_API_TOKEN` (se agrega en la configuración del entorno de la nube, nunca en el repo ni en el chat).

Pasos para publicar un sitio en un subdominio de `pixelfluxcreative.com`:

1. `npm run build` y comprimir el contenido de `dist/` en un `.zip` (los archivos en la raíz del zip, no dentro de una carpeta).
2. `hosting_websites_list` para ubicar el sitio `pixelfluxcreative.com` y su `username`.
3. `hosting_domains_list-website-subdomains`; si el subdominio no existe, `hosting_domains_create-website-subdomain` con el prefijo (por ejemplo `arrausolar`).
4. `hosting_deployStaticWebsite` apuntando al subdominio (`arrausolar.pixelfluxcreative.com`) con el `.zip`.
5. Verificar con Playwright que `https://<subdominio>.pixelfluxcreative.com` carga, sin errores en consola, en 1440px y 390px, y revisar el SSL (`hosting_ssl_*`) si el certificado aún no está activo.

## Convenciones

- Cada sitio vive en **su propio repo privado** de GitHub (copiando la carpeta `.claude/` de este repo) o, si el usuario lo prefiere, en `sites/<nombre>/` dentro de este repo.
- HTML semántico, accesible (contraste AA, foco visible, `alt` en imágenes), mobile-first y rápido (imágenes optimizadas, sin JS innecesario).
- Nada de texto lorem ipsum en la entrega: si falta contenido, redactar copy real y marcarlo para revisión.
