# Registro de cambios - CobraBien

Todas las mejoras y correcciones notables del proyecto se documentarán en este archivo.

## [2.3] - 2026-02-18
### Añadido
- Persistencia del estado con `sessionStorage`:
  - Al recargar la página se restauran variables, plantillas, archivo cargado (si es pequeño) y la fila actual.
  - Advertencia al intentar cerrar o recargar si hay datos sin guardar.
- Navegación rápida en el paso de resultados: campo numérico y botón "Ir" para saltar directamente a cualquier fila.
- Mensaje más amigable en el botón de sugerencias: "¿Te gustó la herramienta o tienes alguna sugerencia? ¡Queremos mejorar! Escríbenos por WhatsApp."

### Mejorado
- Optimización de almacenamiento: si el archivo cargado excede 4 MB, se guarda la configuración pero no los datos.

## [2.2] - 2026-02-18
### Añadido
- Unificación de estilos con la página principal (`index.html`).
- Header y footer rediseñados con la misma estructura y clases.
- Enlaces a redes sociales con iconos reales (Facebook, Instagram, WhatsApp).
- Panel de bienvenida interactivo para guiar a nuevos usuarios.

### Cambiado
- El botón "Volver a herramientas principales" ahora tiene más separación visual.
- Se eliminó el botón "Copiar todos los resúmenes" por ser poco práctico.

## [2.1.2] - 2026-02-18
### Añadido
- Botón "¿Primera vez? Explicación rápida" con panel desplegable que explica el funcionamiento paso a paso.

## [2.1.1] - 2026-02-18
### Cambiado
- Separación de estilos: todos los CSS del generador se movieron a `styles.css` para mantener consistencia con el index.

## [2.1] - 2026-02-18
### Añadido
- Posibilidad de definir una plantilla de resumen independiente.
- En el paso de resultados se muestra tanto el mensaje principal como el resumen (si se definió).
- Botón "Copiar resumen" que copia el contenido generado con esa plantilla.

## [2.0] - 2026-02-18
### Añadido
- Versión inicial del generador de mensajes con wizard de 4 pasos.
- Carga de archivos Excel/CSV mediante SheetJS.
- Formato automático de números a moneda MXN.
- Navegación fila por fila y copiado individual.


## [2.0.0] - 2026-02-16

### ✨ Nueva imagen profesional
- Rediseño completo inspirado en colores de margarita (`#FFE7A0`, `#8CB27C`).
- Tipografía Poppins para un look más moderno.
- Header con logo, eslogan y enlaces a redes sociales (Facebook, Instagram, WhatsApp).
- Sección de bienvenida con mensaje del equipo y tarjeta destacada.
- Footer con redes sociales y créditos.

### 🧭 Navegación mejorada
- Menú flotante con iconos para saltar rápidamente entre herramientas.
- Indicador en la sección "¿Qué puedes hacer hoy?" que informa sobre el menú flotante.
- Scroll suave al hacer clic en los iconos.

### 🆕 Nuevas herramientas
- **Herramienta 7**: Generador de mensajes personalizados desde Excel (enlace a página independiente).
- **Herramienta 8**: Tarjeta "Próximamente" con calculadora de intereses, generador de SMS e integración WhatsApp API.

### ⚙️ Mejoras en herramientas existentes (1-5)
- **Plantillas personalizables**: cada herramienta ahora permite editar el mensaje con variables como `{{saldo}}`, `{{nombre}}`, etc.
- Botón "Restaurar original" para volver a la plantilla por defecto.
- Tooltips explicativos con el botón "?" que muestran qué hace la herramienta y las variables disponibles.
- Validación de campos y formato de moneda mexicana.

### 📱 Experiencia de usuario
- Vista de resultados fila por fila en el generador de mensajes (navegación anterior/siguiente).
- Notificaciones toast en lugar de alerts.
- Botón de "Reiniciar todo" con confirmación.
- Coincidencia de columnas de Excel sin importar mayúsculas, espacios o guiones bajos.
- Límite de 1000 filas para evitar problemas de rendimiento.

### 🎨 Estilos y alineación
- Grid de herramientas centrado con 2 columnas en desktop y 1 en móvil.
- Tarjetas con ancho máximo y centradas para evitar desalineación.
- Tooltips rediseñados para que no se recorten dentro de las tarjetas (z-index alto y overflow visible).
- Modo oscuro adaptado a la nueva paleta.

### 📊 Analytics
- Integración de Google Analytics para medir uso (reemplazar G-XXX por ID real).

### 🐛 Correcciones
- Problema de codificación con caracteres especiales (acentos, ñ) en el generador de mensajes: se aseguró que el JS maneje UTF-8 correctamente.
- Los tooltips ahora se muestran completos sin recortarse.
- Alineación de las tarjetas corregida.

---

## [1.0.0] - 2026-02-10

### Versión inicial
- 6 herramientas básicas: calculadora de descuento, plan con % inicial, plan con monto inicial, confirmación de acuerdo, recordatorio de pago y script de llamada.
- Modo oscuro/claro con persistencia en localStorage.
- Formato de pesos mexicanos.
- Funcionalidad de copiar al portapapeles.
- Patrón de fondo azteca sutil.
- Diseño responsive básico.
