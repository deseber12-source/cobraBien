# Registro de cambios - CobraBien

Todas las mejoras y correcciones notables del proyecto se documentarán en este archivo.

## [2.4.1] - 2026-02-18
### Añadido
- Opción de redondear hacia arriba en las calculadoras de descuento, porcentaje y monto.
- Checkbox con leyenda "Redondear hacia arriba" y recomendación: "para que no falte ni un centavo".
- La funcionalidad afecta los montos finales, anticipos y mensualidades según corresponda.
- Al limpiar cada herramienta, también se desmarca el checkbox.

### Mejorado
- Mayor precisión en los mensajes generados, dando control al usuario sobre el redondeo.

## [2.4] - 2026-02-18
### Añadido
- Nueva página `versiones.html` que muestra el historial completo de cambios en un formato visual atractivo (tarjetas de versiones).
- Enlace a "Novedades v2.4" en el footer del `index.html` para que los usuarios puedan conocer las actualizaciones.
- Estilos específicos para las tarjetas de versiones en `styles.css`.

### Mejorado
- Texto del footer más amigable y claro, invitando a enviar sugerencias.

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
### ✨ Nueva identidad visual "Margarita"
- Rediseño completo inspirado en los colores cálidos de las margaritas: amarillo suave (#FFE7A0), verde hoja (#8CB27C), blanco limpio y grises cálidos.
- Tipografía Poppins para un aspecto más moderno, legible y amigable.
- Header rediseñado: logo más grande, eslogan "Hecho por cobradores, para cobradores" y enlaces a redes sociales (Facebook, Instagram, WhatsApp) con iconos personalizados.
- Sección de bienvenida con tarjeta destacada, mensaje del equipo y una flor decorativa.
- Footer renovado con enlaces a redes, botón de sugerencias por WhatsApp y créditos.

### 🧭 Navegación y usabilidad
- Menú flotante (float menu) en la parte inferior que permite saltar rápidamente entre las 8 herramientas. Se oculta al hacer scroll hacia abajo y reaparece al subir.
- En la sección "¿Qué puedes hacer hoy?" se añadió una nota indicando el uso del menú flotante.
- Scroll suave al hacer clic en los iconos del menú.

### 🆕 Nuevas herramientas
- **Herramienta 7 – Generador de mensajes personalizados**:
  - Página independiente `generador-mensajes.html`.
  - Permite subir archivos Excel/CSV, definir variables (correo, nombre y adicionales), crear plantillas con `{{variable}}` y generar mensajes fila por fila.
  - Navegación entre filas (anterior/siguiente) para no abrumar al usuario.
  - Formato automático de moneda mexicana para valores numéricos.
  - Validación de columnas sin importar mayúsculas, espacios o guiones bajos.
  - Límite de 1000 filas para evitar problemas de rendimiento.
  - Botón "Reiniciar todo" con confirmación.
- **Herramienta 8 – Próximamente**: tarjeta que anuncia futuras funcionalidades: calculadora de intereses, generador de SMS e integración con WhatsApp API.

### ⚙️ Mejoras en herramientas existentes (1 a 6)
- **Plantillas personalizables**: en las herramientas 1 a 5 (descuento, % inicial, monto inicial, confirmación, recordatorio) se agregó un área de texto para que el usuario edite el mensaje usando variables como `{{saldo}}`, `{{nombre}}`, etc.
- Botón "Restaurar original" para volver a la plantilla por defecto.
- **Tooltips informativos** con el botón "?" que explican qué hace cada herramienta y listan las variables disponibles. Se rediseñaron para que no se recorten dentro de la tarjeta (z-index alto y overflow visible).
- Validación de campos numéricos y manejo de división entre cero.
- Los mensajes generados ahora usan el formato de pesos mexicanos ($1,234.56).

### 📱 Experiencia de usuario
- Reemplazo de todos los `alert()` por notificaciones toast no intrusivas.
- En el generador de mensajes, los resultados se muestran uno a uno con botones de copiado individual (mensaje, correo, resumen) y un botón para copiar todos los resúmenes.
- Coincidencia de columnas de Excel case-insensitive y normalización de espacios (ej. "Nombre del Cliente" puede usarse como `nombre_del_cliente`).
- Al cargar un archivo con más de 1000 filas, se muestra advertencia y se trunca.

### 🎨 Estilos y alineación
- Grid de herramientas centrado con 2 columnas fijas en desktop y 1 en móvil. Cada tarjeta tiene un ancho máximo y está centrada dentro de su celda.
- Corrección de desbordamiento en tooltips: se añadió `overflow: visible` a las tarjetas y cabeceras, y `z-index: 9999` a los tooltips.
- Modo oscuro adaptado a la nueva paleta de colores, con ajustes en todos los componentes.

### 📊 Analítica
- Integración de Google Analytics (código en el `<head>` de `index.html`) para medir el uso de la herramienta.

### 🐛 Correcciones
- Problema de codificación UTF-8 con caracteres especiales (acentos, ñ) en el generador de mensajes: se aseguró que el JS maneje correctamente los strings.
- Los tooltips ya no se recortan dentro de las tarjetas.
- Las tarjetas ahora se ven alineadas y centradas, sin espacios irregulares.
- En el recordatorio de pago, la fecha ahora se incluye correctamente en el mensaje generado.

## [1.5.0] - 2026-02-14
### 🚀 Mejoras intermedias previas al rediseño
- Se añadió validación de columnas en el generador de mensajes (prototipo inicial).
- Se implementó el formato de moneda automático para valores numéricos.
- Se agregó un límite de 1000 filas en la carga de Excel.
- Primeros tooltips de ayuda en herramientas principales.

## [1.2.0] - 2026-02-12
### 🧪 Versión de prueba del generador de mensajes
- Creación de la página `generador-mensajes.html` con funcionalidad básica: subir Excel, definir variables y generar mensajes.
- Se detectaron problemas de coincidencia de columnas (mayúsculas/minúsculas) y se corrigieron parcialmente.
- Se añadió vista previa de las primeras 5 filas.

## [1.1.0] - 2026-02-10
### 🧭 Primer menú flotante
- Se implementó un menú flotante experimental en `index.html` para navegar entre las 6 herramientas.
- Se añadió el botón de modo oscuro con persistencia en `localStorage`.

## [1.0.0] - 2026-02-09
### 🎉 Versión inicial
- Lanzamiento de CobraBien con 6 herramientas básicas:
  - Calculadora de descuento
  - Plan de pagos con porcentaje inicial
  - Plan de pagos con monto inicial
  - Confirmación de acuerdo
  - Recordatorio de pago
  - Script de llamada
- Funcionalidades comunes:
  - Cálculos automáticos con formato de pesos mexicanos.
  - Generación de mensajes predefinidos.
  - Botones de copiar al portapapeles.
  - Modo oscuro/claro básico.
  - Patrón de fondo azteca sutil (SVG).
  - Estilo minimalista, sin framework, con HTML, CSS y JS vanilla.
  - Alojamiento en GitHub Pages.

## [0.9.0] - 2026-02-05
### Prototipo inicial
- Pruebas de concepto con calculadoras simples.
- Definición de la identidad: "Hecho por cobradores, para cobradores".
