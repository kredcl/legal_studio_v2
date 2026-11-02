# AXIOMA Abogados (demo)

Sitio de demostración para una firma legal ficticia en Santiago. La firma, sus abogados, los hitos, las noticias y los datos de contacto son **ficticios**.

Inspirado en las **interacciones** de sitios de firmas legales contemporáneas. La marca, los textos, las fotos y los videos son propios del proyecto.

## Identidad

- **Paleta:** negro `#000`, blanco `#fff` y rojo `#DF2531` (con transparencias del 45 % y 65 %).
- **Tipografía:** Michroma para la marca (alternativa libre a Mokoto) y Open Sans variable (peso y ancho) para todo lo demás.

## Efectos (Anime.js v4 + Lenis)

1. **Héroe:** la marca entra letra por letra y el video crece desde su tarjeta hasta ocupar toda la pantalla.
2. **Nosotros:** las tarjetas de cifras entran girando desde los costados.
3. **Áreas:** un cubo doble (ficha + foto o video) gira con el scroll y muestra un área por cara.
4. **EQUIPO:** la palabra crece desde la "I" hasta pintar la pantalla de blanco.
5. **Frases:** las oraciones cambian con el scroll mientras caen fotos desde los costados.
6. **Socios:** un retrato grande que cambia al pasar sobre las miniaturas.
7. **Trayectoria:** los hitos ruedan como un tambor.
8. **Sala de prensa:** las noticias entran desde los costados.
9. **Contacto:** fondo rojo con video, formulario y la marca gigante.

Con `prefers-reduced-motion` o sin JavaScript, todas las secciones se muestran estáticas y completas.

## Uso

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Medios

- **Fotos:** [Unsplash](https://unsplash.com) (licencia Unsplash). Retratos en blanco y negro de stock: reemplazarlos por los del equipo real.
- **Videos:** [Mixkit](https://mixkit.co) (licencia gratuita de Mixkit), recortados a bucles de 9 s sin audio.
  - `reunion`: Lawyers discuss strategy in late night meeting (16104)
  - `estrategia`: Lawyer explains to client with laptop in office (16106)
  - `firma`: Man signing off a contract and handshake (23115)
  - `tribunales`: Lawyer talks on phone outside courthouse (16107)
