
# Landing CV — README

Breve documentación del proyecto: estructura, instrucciones de despliegue y cambios realizados.

**Estructura**
- **`index.html`**: Página principal.
- **`assets/css/styles.css`**: Hoja de estilos principal (mobile-first, variables de offset).
- **`assets/js/menu.js`**: Lógica del menú hamburguesa y submenú `Competencias`.
- **`assets/js/carousel.js`**: Script ligero para los carruseles de `Experiencia` y `Proyectos`.
- **`assets/images/`**: Imágenes (icon, profile, project-a, project-b).

**Despliegue (local rápido)**
- Usando Python (puerto 8000):

```bash
python -m http.server 8000
# luego abrir http://localhost:8000/ en el navegador
```
**Despligue (ya en dominio)**
- Link donde se ve el dominio ya publicado:

```bash
    https://cv-iwii.vercel.app/
# Link montado en vercel
```

- Usando Live Server en VS Code: abrir la carpeta y ejecutar extensión Live Server.

**Modificaciones y notas importantes**
- Diseño mobile-first: `assets/css/styles.css` organiza el layout en una sola columna por defecto y aplica `@media` para pantallas >=768px.
- Menú hamburguesa: botón visible con `aria-expanded`. El submenú `Competencias` se despliega sólo al hacer click y se cierra al pulsar fuera, al seleccionar una opción o con `Escape`. Archivo: `assets/js/menu.js`.
- Offset de anclas: para evitar que el header fijo tape las secciones, se usa la variable CSS `--header-offset` en `assets/css/styles.css`. Ajusta su valor si cambias la altura del header.
- Carrusel: tarjetas con bordes suaves y sombra ligera; se añadieron imágenes de proyecto en `assets/images/`. Archivo: `assets/js/carousel.js`.
- Accesibilidad: atributos `aria-*` añadidos en botones y regiones (ej. `aria-expanded`, `role="list"`).

**Cómo actualizar contenido**
- Añadir/actualizar imágenes: coloca los archivos en `assets/images/` y actualiza las rutas en `index.html` si es necesario.
- Cambiar estilos: editar `assets/css/styles.css` (buscar `:root` para variables globales).
- Cambiar comportamiento del menú o carrusel: editar `assets/js/menu.js` y `assets/js/carousel.js`.

**Sugerencias para producción**
- Comprimir imágenes para web (webp/optimizado) y servir desde CDN si procede.
- Habilitar caching y minificación de CSS/JS en el pipeline de build.

Si quieres, puedo añadir un pequeño script de build (minificación) o generar placeholders SVG automáticamente dentro de `assets/images/`.