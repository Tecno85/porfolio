---
name: portafolio
description: "Mantener y mejorar el portafolio profesional de Ivan Madrid: contenido, proyectos, HTML, CSS, JavaScript, diseño responsive, accesibilidad, SEO, rendimiento, assets, README y CV en Markdown/PDF. Usar siempre que se analice, modifique, pruebe, documente o publique este repositorio de portafolio."
---

# Portafolio

## Propósito

Mantener una presentación profesional pequeña, clara y verificable. Preservar la identidad actual y sincronizar la web, la documentación y el CV sin añadir complejidad innecesaria.

## Lectura inicial

Antes de modificar:

1. Leer `README.md` para conocer alcance, proyectos y URL publicada.
2. Revisar `index.html`, `index.css` e `index.js` según la tarea.
3. Revisar `assets/docs/cv-ivan-madrid.md` cuando cambien perfil, habilidades, formación o proyectos.
4. Comprobar `git status --short` y preservar cambios existentes.

Resolver todas las rutas desde la raíz del repositorio, identificada por `index.html`, `index.css`, `index.js`, `README.md` y `assets/`.

Tratar `skills/portafolio/` como fuente de verdad versionada. Después de modificarla y validarla, sincronizar la copia instalada en `${CODEX_HOME:-$HOME/.codex}/skills/portafolio/` cuando exista y comprobar que ambas copias sean idénticas. Solicitar autorización si la ubicación instalada está fuera de las rutas editables.

## Arquitectura y alcance

- Mantener HTML, CSS y JavaScript Vanilla sin frameworks, bundlers ni dependencias de ejecución.
- Preferir cambios pequeños y directos. No crear componentes, configuraciones o automatizaciones que no aporten valor a este sitio estático.
- Conservar la página como portafolio de una sola vista. No añadir navegación interna por secciones salvo petición explícita.
- Mantener visibles y fáciles de encontrar el correo, GitHub, LinkedIn y CV.
- No ejecutar `git commit`, `git push` ni publicar cambios salvo petición explícita.

## Identidad visual y experiencia

- Preservar el diseño oscuro, contenido centrado, tarjetas sobrias y color cian de acento definidos en `index.css`.
- Reutilizar las variables CSS, tipografías y patrones existentes antes de introducir nuevos estilos.
- Mantener una jerarquía visual sencilla; evitar adornos, etiquetas o animaciones redundantes.
- No mostrar una etiqueta de estado si un botón ya comunica la misma idea. En Artify, usar `Probar aplicación` sin la etiqueta redundante `Demo pública`.
- Conservar comportamiento responsive en 768 px y 480 px. Verificar que no exista desplazamiento horizontal.
- Respetar `prefers-reduced-motion`. Mantener los eventos de scroll pasivos y coordinados con `requestAnimationFrame` cuando corresponda.
- Evaluar visualmente escritorio y móvil después de cambios de interfaz.

## Contenido profesional

- Describir únicamente funcionalidades implementadas o estados verificables.
- Priorizar proyectos reales y actuales. Mantener Artify como proyecto principal del portafolio mientras el foco comercial sea desarrollo web freelance. Dejar Control Vehicular, Pegasus RAG y prácticas académicas como experiencia complementaria, salvo una decisión editorial explícita posterior.
- Usar textos concretos orientados a resultados: problema, capacidades principales, stack y enlace útil.
- Mantener enlaces con nombres de acción claros, por ejemplo `Ver repositorio` y `Probar aplicación`.
- Verificar datos temporales o externos antes de actualizarlos.

### Datos vigentes de Artify

- Repositorio: `https://github.com/Tecno85/artify`
- Aplicación: `https://tecno85.github.io/artify/`
- Stack principal: HTML, CSS, JavaScript Vanilla, Canvas API, Node.js, Express y PostgreSQL.
- Capacidades resumidas: edición de imágenes, filtros, recorte, redimensionamiento, conversión, historial, autenticación por roles, panel administrativo y API REST.
- No volver a presentar `artify-personal` ni MySQL como repositorio o base de datos vigente de Artify.
- Si la tarea depende del estado interno de Artify, usar también el skill `artify` y consultar su repositorio actual.

## Sincronización de archivos

Al cambiar información profesional, actualizar solo las superficies afectadas, pero comprobar coherencia entre:

- `index.html`: presentación pública.
- `README.md`: descripción del repositorio.
- `assets/docs/cv-ivan-madrid.md`: fuente textual del CV.
- `assets/docs/cv-ivan-madrid.pdf`: documento descargable.
- Metadatos de `index.html`, `sitemap.xml` y `robots.txt`: URL pública e indexación.

No sustituir `porfolio` por `portafolio` dentro de URLs sin confirmar un cambio real de nombre del repositorio publicado. La URL canónica vigente es `https://tecno85.github.io/porfolio/`.

## CV

- Tratar `assets/docs/cv-ivan-madrid.md` como fuente de contenido y mantener el PDF sincronizado.
- Usar los skills `documents` y `pdf` al regenerar o revisar el PDF.
- Conservar una sola página A4, enlaces activos, metadatos de título/autor y tipografía profesional.
- Mantener el bloque superior del CV centrado: nombre, título profesional, ubicación/correo y la fila `GitHub | LinkedIn | Portafolio`.
- Incluir el enlace `Portafolio` en la fila superior de contactos y apuntarlo a `https://tecno85.github.io/porfolio/`.
- Cada vez que se agregue, retire o reorganice información, recomponer la distribución completa del CV en lugar de limitarse a anexar contenido.
- Aprovechar de forma equilibrada toda la altura útil de la página: la sección final `Idiomas` debe verse completa y quedar cerca de la zona inferior, sin una franja blanca final desproporcionada.
- Buscar un equilibrio intermedio: el CV no debe verse encogido en la mitad superior ni tan estirado que corte la última sección.
- Ajustar primero espaciado entre secciones, interlineado, márgenes y tamaños de encabezados; reducir o ampliar la tipografía solo dentro de límites cómodamente legibles y sin inflar contenido.
- No añadir texto decorativo, estadísticas, porcentajes ni experiencia no verificable para rellenar espacio. El aprovechamiento de página se resuelve con maquetación, no con contenido artificial.
- Renderizar el PDF a PNG y revisarlo visualmente antes de finalizar. Repetir la composición si `Idiomas` no aparece completo, si queda demasiado vacío inferior, si hay contenido amontonado o si el equilibrio vertical se siente irregular.
- Verificar después de regenerar: una sola página, enlaces activos, metadatos de título/autor, texto extraíble de la última sección, enlace a Portafolio y coherencia con `assets/docs/cv-ivan-madrid.md`.
- Cuando se comparta el CV publicado, usar la URL pública canónica: `https://tecno85.github.io/porfolio/assets/docs/cv-ivan-madrid.pdf`.
- No dejar scripts ni imágenes de QA temporales en el repositorio.

## SEO, accesibilidad y rendimiento

- Mantener un solo `h1`, jerarquía correcta de encabezados y elementos semánticos.
- Conservar textos alternativos útiles; usar `alt=""` en iconos puramente decorativos.
- Mantener nombres accesibles en enlaces representados por iconos y foco visible para teclado.
- Preservar el enlace `Saltar al contenido principal`; no tratarlo como navegación visual.
- Mantener `rel="noopener noreferrer"` en enlaces externos con `target="_blank"`.
- Mantener descripción, canonical, Open Graph, favicons, `robots.txt` y `sitemap.xml` coherentes.
- Escapar `&` como `&amp;` en atributos HTML.
- Preferir WebP para fotografías y capturas; conservar SVG para iconos vectoriales.
- Definir dimensiones de imágenes y usar `loading="lazy"` y `decoding="async"` debajo del primer viewport.
- No agregar assets pesados si una alternativa optimizada conserva calidad suficiente.

## Validación

Elegir según el cambio y corregir cualquier error real:

```bash
node --check index.js
tidy -errors -quiet index.html
xmllint --noout sitemap.xml
git diff --check
```

- Comprobar que cada ruta local usada por `src` o `href` exista.
- Tratar las advertencias de Tidy sobre `decoding="async"` como limitación del catálogo antiguo, no como error de HTML moderno.
- Servir localmente la página y confirmar respuestas correctas de HTML, CSS, JavaScript, imágenes y documentos cuando cambie la interfaz o los assets.
- Revisar el diff y `git status --short` al finalizar.
- Informar con precisión cualquier validación que no pueda ejecutarse.

## Cierre

Entregar un resumen breve de cambios, validaciones y archivos relevantes. Si quedan cambios sin commit, sugerir un mensaje Conventional Commit en español, por ejemplo:

```text
feat(portafolio): actualizar proyectos y contenido profesional
```
