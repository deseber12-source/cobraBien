# Registro de cambios - CobraBien

Todas las mejoras y correcciones notables del proyecto se documentarán en este archivo.

## [2.5.0] - 2026-02-19

### ✨ Añadido
- **Nueva página de privacidad y seguridad (`privacidad.html`)**
  - Explica detalladamente que el procesamiento de archivos en el generador de mensajes es 100% local (sin envío a servidores).
  - Informa sobre el uso de Google Analytics, con enlace a la política de cookies.
  - Incluye secciones sobre derechos del usuario (GDPR) y seguridad del sitio (HTTPS, GitHub Pages).
  - Diseño coherente con el resto del sitio (tarjetas, colores, tipografía).

- **Banner de consentimiento de cookies**
  - Aparece en todas las páginas hasta que el usuario acepta.
  - Almacena la preferencia en `localStorage` para no volver a mostrarse.
  - El script de Google Analytics ahora se carga dinámicamente solo después de la aceptación, cumpliendo con normativas de privacidad (GDPR).

- **Mensaje informativo en el generador de mensajes**
  - En el paso 3 (subir archivo) se añadió una nota:  
    `🔒 Tus archivos nunca se suben a ningún servidor. Todo el procesamiento ocurre en tu navegador.`
  - También se incluyó un tooltip similar en la tarjeta del generador en `index.html`.

- **Enlace a privacidad en el footer**
  - Se agregó el enlace "Privacidad" junto a "Novedades" en el footer de todas las páginas (`index.html`, `generador-mensajes.html`, `versiones.html`).

### 🔧 Cambiado
- **Refactorización del script de Google Analytics**
  - Se movió a un bloque condicional para cargar solo si el usuario ha aceptado las cookies.
  - Se implementó la variable `window['ga-disable-G-XXXXXXXXXX']` para deshabilitar el rastreo en caso de no consentimiento (opcional, en el código se optó por carga dinámica).

- **Mejora en la experiencia de usuario**
  - El banner de cookies es consistente con el tema oscuro/claro (usa variables CSS).
  - Se aseguró que el banner no interfiera con el menú flotante (z-index adecuado).

### 🐛 Corregido
- **Problema de carga duplicada de Google Analytics**
  - Anteriormente, el script se cargaba siempre en el `<head>`, incluso sin consentimiento. Ahora se carga solo tras la aceptación, evitando posibles infracciones.

### 🧠 Detalles técnicos
- **Implementación del banner**: se añadió al final del `<body>` en todas las páginas, con un script inline que verifica `localStorage.getItem('cookiesAccepted')`. Si no existe, muestra el banner; al hacer clic en "Aceptar", guarda la preferencia y recarga la página para activar GA.
- **Página de privacidad**: se creó con la misma estructura de `versiones.html`, reutilizando clases `.version-card` para dar formato a las secciones.
- **Mensaje local en el generador**: se insertó un párrafo con estilo `color: var(--primary-green)` y un icono de candado para transmitir confianza.

## [2.4.1] - 2026-02-18

### ✨ Añadido
- **Opción de redondeo hacia arriba en calculadoras**  
  - En las herramientas de descuento, plan con % inicial y plan con monto inicial se agregó un checkbox "Redondear hacia arriba" con la leyenda "para que no falte ni un centavo".  
  - Al activarlo, los montos finales, anticipos y mensualidades se redondean con `Math.ceil()` antes de mostrar el resultado y generar el mensaje.  
  - El estado del checkbox se incluye en la función de limpieza, desmarcándose al reiniciar la herramienta.

### 🔧 Cambiado
- **Mensajes generados ahora reflejan el redondeo**  
  - Las plantillas usan los valores redondeados cuando la opción está activa, asegurando coherencia entre el resultado numérico y el texto generado.
- **Mejora en la experiencia de usuario**  
  - Se añadió una nota informativa junto al checkbox para explicar el beneficio del redondeo.

### 🐛 Corregido
- **Ningún error reportado en esta versión; es una mejora funcional.**

### 🧠 Detalles técnicos
- Se añadió el elemento `<input type="checkbox">` con IDs específicos (`descuento-redondear`, `porcentaje-redondear`, `monto-redondear`).  
- En los objetos `generadores`, se lee el estado del checkbox con `document.getElementById(...)?.checked || false` y se aplica `Math.ceil()` a las variables correspondientes.  
- En los `limpiadores`, se fuerza `checked = false` para resetear el checkbox al limpiar la herramienta.

---

## [2.4] - 2026-02-18

### ✨ Añadido
- **Página de versiones (`versiones.html`)**  
  - Se creó una página independiente que muestra todo el historial de cambios en formato de tarjetas, utilizando las mismas clases CSS que las herramientas para mantener coherencia visual.  
  - Cada versión se presenta en una tarjeta con título, fecha y lista de cambios agrupados por tipo (añadido, cambiado, corregido).  
  - Se incluyó un enlace "Volver a herramientas" y un pie de página con redes sociales y créditos.  
  - Se añadió Google Analytics también en esta página para medir visitas.

- **Enlace a novedades en el footer**  
  - En `index.html`, el footer ahora contiene un enlace "Novedades v2.4" que apunta a `versiones.html`, permitiendo a los usuarios conocer las actualizaciones fácilmente.

### 🔧 Cambiado
- **Estilos unificados**  
  - Se movieron todos los estilos específicos del generador de mensajes a `styles.css` para mantener un único archivo de estilos y facilitar el mantenimiento.  
  - Se agregaron clases `.version-card` y `.versions-list` para dar formato a la nueva página.

### 🐛 Corregido
- **Ningún error reportado en esta versión; es una mejora de documentación y estructura.**

### 🧠 Detalles técnicos
- La página `versiones.html` se construyó manualmente a partir del `CHANGELOG.md`, manteniendo la misma estructura de títulos y listas.  
- Se reutilizaron componentes del `index.html` (header, footer, theme-toggle, social links) para garantizar consistencia.  
- Se añadió el mismo fragmento de Google Analytics que en `index.html`.

---

## [2.3] - 2026-02-18

### ✨ Añadido
- **Persistencia del estado con `sessionStorage`**  
  - El generador de mensajes ahora guarda automáticamente en `sessionStorage` el estado completo: variables, plantillas, datos cargados (si el tamaño es menor a 4 MB) y la fila actual.  
  - Al recargar la página, se restaura el estado y se muestra el paso correspondiente.  
  - Si el archivo excede 4 MB, se guarda solo la configuración y se muestra un mensaje indicando que debe volver a cargarse el archivo.

- **Advertencia al salir/recargar**  
  - Se implementó un evento `beforeunload` que muestra un mensaje de confirmación si hay datos sin guardar (plantillas modificadas o archivo cargado).

- **Navegación rápida en resultados**  
  - En el paso 4, se añadió un campo numérico y un botón "Ir" que permite saltar directamente a cualquier fila del conjunto de datos.  
  - El campo muestra el número de fila actual y se actualiza al navegar.

### 🔧 Cambiado
- **Optimización de almacenamiento**  
  - Se calcula el tamaño de `state.datos` con `new Blob([JSON.stringify(state.datos)]).size`; si supera 4 MB, se omite su almacenamiento en `sessionStorage` para evitar exceder el límite (aproximadamente 5-10 MB según navegador).

### 🐛 Corregido
- **Error al restaurar datos con caracteres especiales**  
  - Se verificó que `JSON.parse` y `JSON.stringify` manejan correctamente UTF-8; no se detectaron problemas adicionales.

### 🧠 Detalles técnicos
- Se crearon las funciones `guardarEstadoEnSession()` y `cargarEstadoDesdeSession()`.  
- En `cargarEstadoDesdeSession` se rellenan los inputs, checkboxes y se restaura la vista previa si hay datos.  
- Se usa `sessionStorage` en lugar de `localStorage` para que el estado no persista entre pestañas/ventanas.  
- El evento `beforeunload` se añade con `window.addEventListener('beforeunload', (e) => { ... })`.

---

## [2.2] - 2026-02-18

### ✨ Añadido
- **Panel de bienvenida interactivo**  
  - En `generador-mensajes.html`, justo después del enlace de volver, se añadió un botón "¿Primera vez? Explicación rápida".  
  - Al hacer clic, se despliega un panel con instrucciones paso a paso, ejemplos de uso y un botón "Entendido" para cerrarlo.  
  - El panel se implementa con clases CSS para animación de aparición/desaparición (`max-height`, `opacity`).

### 🔧 Cambiado
- **Unificación de header y footer con `index.html`**  
  - Se reemplazó el header anterior por la misma estructura usada en `index.html` (clases `header-new`, `logo-wrapper`, `brand`, `social-links`, `theme-toggle`).  
  - El footer ahora usa la clase `footer-new` y contiene los mismos enlaces a redes sociales y botón de sugerencias.

- **Ajustes de espaciado**  
  - Se aumentó el margen inferior del enlace "Volver a herramientas principales" a 2rem para separarlo mejor del contenido.

### 🐛 Corregido
- **Ningún error reportado en esta versión; es una mejora de usabilidad y consistencia.**

### 🧠 Detalles técnicos
- El panel de bienvenida se controla con JavaScript: `btnInfo.addEventListener('click')` para alternar la clase `hidden` en el panel.  
- Se añadió el botón "Entendido" que simplemente añade la clase `hidden`.  
- Los estilos del panel se definieron en `styles.css` con transiciones suaves.

---

## [2.1.2] - 2026-02-18

### ✨ Añadido
- **Botón de explicación rápida en el generador** (versión inicial)  
  - Misma funcionalidad que en 2.2, pero sin el panel desplegable; era solo un botón que mostraba un `alert` con instrucciones.  
  - Rápidamente se reemplazó por la versión mejorada en 2.2, por lo que este cambio es meramente histórico.

### 🧠 Detalles técnicos
- Se implementó como una función simple con `alert`, pero se descartó por mala experiencia de usuario.

---

## [2.1.1] - 2026-02-18

### 🔧 Cambiado
- **Separación de estilos**  
  - Todo el CSS que estaba incrustado en `generador-mensajes.html` se movió al archivo `styles.css` compartido con `index.html`.  
  - Se crearon clases específicas para el wizard (`.wizard`, `.steps`, `.step`, `.step-content`, etc.) y se añadieron las variables de color `--primary-blue` y `--accent-green` en `:root` para mantener consistencia.

### 🐛 Corregido
- **Ningún error funcional; solo refactorización de código.**

### 🧠 Detalles técnicos
- Se eliminó la etiqueta `<style>` del HTML y se añadieron las reglas al final de `styles.css`.  
- Se verificó que no hubiera conflictos con los estilos existentes.

---

## [2.1] - 2026-02-18

### ✨ Añadido
- **Plantilla de resumen independiente**  
  - En el paso 2 del generador, se añadió un checkbox "¿Definir plantilla de resumen adicional?" que al marcarlo muestra un nuevo campo de texto para escribir una plantilla de resumen.  
  - En el paso 4, se muestra tanto el mensaje principal como el resumen (si se definió), y se añadió un botón "Copiar resumen" que copia el contenido generado con esa plantilla.  
  - El estado se amplió con `state.plantillaResumen`.

- **Botón "Copiar resumen"**  
  - Funciona de manera análoga al copiado del mensaje, usando `navigator.clipboard`.

### 🔧 Cambiado
- **Eliminación del botón "Copiar todos los resúmenes"**  
  - Se consideró poco práctico y se eliminó del paso 4.

### 🐛 Corregido
- **Ningún error reportado; mejora de funcionalidad.**

### 🧠 Detalles técnicos
- Se añadió el elemento checkbox y el textarea en el HTML, con lógica en JavaScript para mostrar/ocultar y guardar/restaurar la plantilla de resumen.  
- En `mostrarFilaActual`, se genera el resumen con `aplicarPlantilla(state.plantillaResumen, fila)` y se muestra condicionalmente.

---

## [2.0] - 2026-02-18

### ✨ Añadido
- **Versión inicial del generador de mensajes** (con wizard de 4 pasos).  
  - Paso 1: Configurar variables (correo, nombre y adicionales).  
  - Paso 2: Crear plantilla con `{{variable}}`.  
  - Paso 3: Subir archivo Excel/CSV (hasta 1000 filas).  
  - Paso 4: Navegar fila por fila y copiar mensajes.  
  - Uso de SheetJS para leer archivos.

- **Formato automático de moneda MXN**  
  - Función `formatoMXN` que usa `toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })`.

- **Normalización de cabeceras**  
  - Se usa `normalizar(str)` para comparar sin importar mayúsculas, espacios o guiones bajos.

- **Límite de 1000 filas**  
  - Advertencia y truncado para evitar problemas de rendimiento.

- **Botón de reinicio**  
  - Confirma y limpia todo el estado.

### 🔧 Cambiado
- **Ninguno; es la primera versión de esta herramienta.**

### 🐛 Corregido
- **Ninguno; es la primera versión.**

### 🧠 Detalles técnicos
- Se implementó un objeto `state` para mantener variables, plantillas, datos, cabeceras y fila actual.  
- Las funciones de navegación entre pasos (`goToStep`) actualizan clases y muestran/ocultan contenido.  
- La carga de archivos usa `FileReader` y `XLSX.read` para obtener los datos.  
- Se definieron `generadores`, `limpiadores`, y eventos delegados para manejar la interacción.

---

## [2.0.0] - 2026-02-19

### ✨ Añadido
- **Nueva herramienta: Generador de mensajes desde Excel**  
  - Implementación con SheetJS (xlsx) para lectura de archivos Excel/CSV en el cliente.  
  - Flujo de 4 pasos (variables, plantilla, carga, resultados) con navegación entre pasos.  
  - Vista de resultados fila por fila con botones anterior/siguiente para mejor usabilidad.  
  - Formato automático de moneda mexicana para valores numéricos.  
  - Coincidencia de columnas **case-insensitive** y normalización de espacios/guiones bajos.  
  - Límite de 1000 filas para evitar bloqueos del navegador.  
  - Botón de reinicio con confirmación para limpiar todo el estado.

- **Plantillas personalizables en herramientas 1-5**  
  - Cada tarjeta ahora incluye un área de texto editable para que el usuario modifique la plantilla del mensaje.  
  - Se añadió un botón "Restaurar original" que recupera la plantilla por defecto desde un objeto `plantillasDefecto`.  
  - Las variables se reemplazan usando expresiones regulares globales (`/{{var}}/g`).  
  - Se listan las variables disponibles en el tooltip de ayuda.

- **Tooltips explicativos con botón "?"**  
  - Cada herramienta tiene un botón con ícono de ayuda que despliega un tooltip con:  
    - Descripción de la funcionalidad.  
    - Lista de variables disponibles para la plantilla.  
    - Nota sobre personalización.  
  - Implementados con CSS puro (sin librerías) usando `:hover` y `pointer-events: none`.  
  - Se solucionó el recorte del tooltip con `overflow: visible` en las tarjetas y `z-index: 9999`.

- **Menú flotante de navegación rápida**  
  - Barra fija en la parte inferior con iconos para cada herramienta.  
  - Scroll suave mediante `scrollIntoView({ behavior: 'smooth' })`.  
  - Ocultamiento automático al hacer scroll hacia abajo (con umbral de 50px).  
  - Se agregó una nota en la sección "¿Qué puedes hacer hoy?" para informar al usuario sobre esta funcionalidad.

- **Sección de bienvenida del equipo**  
  - Tarjeta destacada con mensaje personalizado y firma del equipo.  
  - Integración de un emoji de margarita (🌼) como elemento decorativo.

- **Enlaces a redes sociales**  
  - Iconos de Facebook, Instagram y WhatsApp en el header y footer.  
  - Las imágenes se cargan desde la carpeta `img/` con nombres estándar.

- **Google Analytics**  
  - Script de seguimiento añadido en el `<head>` de `index.html` (requiere reemplazar `G-XXX` por el ID real).

### 🔧 Cambiado
- **Rediseño visual completo (CobraBien 2.0)**  
  - Nueva paleta inspirada en margaritas: amarillo suave (`#FFE7A0`) y verde hoja (`#8CB27C`).  
  - Tipografía Poppins para un look más moderno y legible.  
  - Header con altura fija, logo redimensionado y eslogan.  
  - Footer con enlaces a redes sociales y créditos.  
  - Tarjetas con bordes redondeados (2rem), sombras suaves y efecto hover.

- **Alineación del grid de herramientas**  
  - Se cambió a `grid-template-columns: repeat(2, 1fr)` en desktop para que queden centradas y alineadas.  
  - Cada tarjeta tiene `max-width: 600px` y `margin: 0 auto` para evitar desbordes.  
  - En móviles, pasa a una columna con media query.

- **Modo oscuro adaptado**  
  - Se ajustaron las variables de color para el tema oscuro manteniendo la armonía con la nueva paleta.  
  - El logo cambia a blanco mediante filtro CSS (`brightness(0) invert(1)`) cuando `body` tiene clase `dark`.

- **Manejo de errores y validaciones**  
  - Se añadieron funciones `validarNumero` y `validarEntero` para evitar valores negativos y división por cero.  
  - En el generador de mensajes, se normalizan las cabeceras del Excel y se comparan con las variables definidas por el usuario (ignorando mayúsculas/espacios).  
  - Si faltan columnas obligatorias, se muestra un mensaje claro mediante toast.

### 🐛 Corregido
- **Problema de codificación de caracteres especiales**  
  - Detectado: en el generador de mensajes, los nombres con acentos o ñ se mostraban como caracteres extraños (ej. "RaÃºl").  
  - Causa: al leer el Excel, SheetJS devuelve los strings en UTF-8, pero al insertarlos en el DOM con `innerHTML` se interpretaban correctamente; sin embargo, el problema era que al guardar en el estado y luego mostrar, se perdía la codificación.  
  - Solución: asegurar que todos los strings se mantengan como UTF-8 durante el flujo; se verificó que el archivo HTML tiene `meta charset="UTF-8"` y que JavaScript no realiza conversiones innecesarias. El problema se resolvió al normalizar la lectura de celdas y usar `textContent` en lugar de `innerHTML` para las previsualizaciones (aunque en el código final se usa `innerHTML` con valores escapados por `formatoMXN` que ya produce strings seguros).

- **Tooltips recortados dentro de las tarjetas**  
  - Causa: las tarjetas tenían `overflow: hidden` por defecto.  
  - Solución: se cambió a `overflow: visible` en `.card` y `.card-header`, y se aumentó el `z-index` del tooltip a 9999. Además, se ajustó la posición en móviles para que no se desborde por la izquierda.

- **Desalineación de las tarjetas en desktop**  
  - Causa: el grid usaba `repeat(auto-fit, minmax(340px, 1fr))` lo que provocaba que algunas tarjetas se estiraran más que otras.  
  - Solución: se fijó a 2 columnas exactas y se centraron las tarjetas con `margin: 0 auto`.

- **Navegación del menú flotante**  
  - Problema: al hacer clic en un icono, la URL cambiaba con el hash, pero no había scroll suave.  
  - Solución: se previene el comportamiento por defecto con `e.preventDefault()` y se usa `scrollIntoView({ behavior: 'smooth' })`.

- **Botón de sugerencia de WhatsApp**  
  - El número estaba hardcodeado como placeholder; se dejó así con una nota para que el usuario lo personalice.

### 🧠 Detalles técnicos
- **Refactorización de eventos**: se mantuvo la delegación de eventos en `document` para los botones generar, copiar y limpiar, lo que mejora el rendimiento y facilita la adición de nuevas herramientas.
- **Objeto `generadores` y `limpiadores`**: cada herramienta tiene su función de generación y limpieza, lo que permite escalar fácilmente.
- **Normalización de texto**: se creó la función `normalizar(str)` que convierte a minúsculas, recorta espacios y reemplaza espacios por guiones bajos, usada para comparar nombres de columnas.
- **Toast personalizado**: se implementó un sistema de notificaciones simple con CSS y JavaScript, reemplazando los `alert` nativos.
- **Persistencia del tema**: se usa `localStorage` para recordar la preferencia de modo oscuro.
- **Librerías externas**: se incorporó SheetJS desde CDN para la lectura de Excel; el resto es código nativo.

---

## [1.0.0] - 2026-02-10

### Versión inicial
- Lanzamiento con 6 herramientas básicas:
  1. Calculadora de descuento.
  2. Plan de pagos con porcentaje inicial.
  3. Plan de pagos con monto inicial.
  4. Confirmación de acuerdo.
  5. Recordatorio de pago.
  6. Generador de script de llamada.
- Funcionalidades comunes:
  - Cálculos en tiempo real al hacer clic en "Generar".
  - Formato de pesos mexicanos con `toLocaleString('es-MX', { currency: 'MXN' })`.
  - Botón "Copiar" que usa `navigator.clipboard`.
  - Botón "Limpiar" que restablece los campos y regenera mensajes con valores por defecto.
- Modo oscuro con persistencia en `localStorage`.
- Patrón de fondo azteca sutil (SVG inline) como marca distintiva.
- Diseño responsive básico con grid de una columna en móviles.

### Limitaciones conocidas (en 1.0.0)
- No había validación de campos vacíos (se usaban valores por defecto).
- Las plantillas eran fijas y no personalizables.
- No existía el generador de mensajes masivos.
- La navegación entre herramientas era manual (scroll tradicional).
- Los tooltips no existían; la ayuda era implícita.
- Problemas menores de alineación en algunas resoluciones.
- Sin analytics ni redes sociales.
