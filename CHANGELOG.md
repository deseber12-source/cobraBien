# Registro de cambios - CobraBien

Todas las mejoras y correcciones notables del proyecto se documentarán en este archivo.

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
