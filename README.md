# 🌼 CobraBien

**Herramientas profesionales para cobradores en México**  
Hecho por cobradores, para cobradores.

CobraBien es un conjunto de herramientas gratuitas, sencillas y efectivas diseñadas para facilitar la gestión de cobranza. Todo el procesamiento ocurre en el navegador del usuario, garantizando la privacidad de los datos.

---

## 🚀 Características principales

- **Calculadora de descuento** – Calcula el monto final con descuento y genera mensaje personalizado.
- **Plan con % inicial** – Anticipo y mensualidades a partir de un porcentaje.
- **Plan con monto inicial** – Mensualidades con anticipo fijo.
- **Confirmación de acuerdo** – Mensaje formal para confirmar pagos.
- **Recordatorio de pago** – Recordatorio para el día anterior al vencimiento.
- **Script de llamada** – Guion completo para asesores.
- **Generador de mensajes masivos** – Crea mensajes personalizados desde Excel (Email/WhatsApp). [Herramienta independiente]
- **Próximamente** – Calculadora de intereses, generador de SMS e integración con WhatsApp API.

---

## 🎨 Inspiración y diseño

Los colores están inspirados en la **margarita** (`#FFE7A0`, `#8CB27C`), transmitiendo frescura, cercanía y profesionalismo.  
Tipografía **Poppins** para un look moderno y legible.  
Modo oscuro automático con persistencia en `localStorage`.

---

## 🧭 Navegación

- **Menú flotante** en la parte inferior para saltar rápidamente entre herramientas.
- **Sección "¿Qué puedes hacer hoy?"** con resumen de herramientas y nota sobre el menú flotante.
- **Tooltips** explicativos en cada tarjeta (botón `?`).

---

## 🛠️ Uso de las herramientas

### Herramientas 1 a 6 (en página principal)
1. Completa los campos solicitados (montos, fechas, porcentajes).
2. Opcionalmente, personaliza la plantilla del mensaje usando las variables disponibles (ej. `{{saldo}}`, `{{nombre}}`).
3. Haz clic en **"Generar mensaje"**.
4. Copia el resultado con el botón **"Copiar"**.
5. Usa **"Limpiar"** para reiniciar la herramienta.

### Generador de mensajes (página independiente)
1. Define las variables (obligatorias: correo y nombre; adicionales las que necesites).
2. Redacta una plantilla usando las variables con doble llave (ej. `{{nombre}}`, `{{saldo}}`).
3. Sube un archivo Excel/CSV con las columnas correspondientes (máx. 1000 filas).
4. Navega entre las filas generadas y copia el mensaje, el correo o el resumen interno.
5. Puedes copiar todos los resúmenes de una vez.

---

## 📦 Tecnologías utilizadas

- **HTML5 / CSS3** – Estructura y estilos.
- **JavaScript (ES6)** – Lógica de negocio.
- **SheetJS (xlsx)** – Lectura de archivos Excel en el cliente.
- **Google Analytics** – Medición de uso (requiere ID propio).
- **Font Awesome / Emojis** – Iconografía.

---

## 🧪 Pruebas y feedback

Si encuentras algún error o tienes sugerencias, utiliza el botón **"Enviar sugerencia"** en el footer.  
Puedes contactarnos por WhatsApp o redes sociales.

---

## 📈 Roadmap

### Versión 2.0 (actual)
- [x] Rediseño completo inspirado en margarita.
- [x] Menú flotante de navegación.
- [x] Plantillas personalizables en herramientas 1-5.
- [x] Tooltips explicativos con variables disponibles.
- [x] Generador de mensajes masivos desde Excel.
- [x] Vista fila por fila en generador.
- [x] Botón de reinicio global.
- [x] Integración con Google Analytics.

### Próximas versiones
- [ ] Calculadora de intereses moratorios.
- [ ] Generador de SMS.
- [ ] Integración con WhatsApp API (backend opcional).
- [ ] Sistema de suscripciones para funciones premium.
- [ ] Historial de mensajes generados (localStorage).

---

## 👥 Comunidad

Síguenos en redes sociales para estar al tanto de novedades:

- [Facebook](#)
- [Instagram](#)
- [WhatsApp](#)

---

## 📝 Licencia

Este proyecto es de código abierto bajo la licencia MIT. Puedes usarlo, modificarlo y compartirlo libremente.

---

## 🙌 Créditos

Creado por **Ismael Palencia** (2026) con el apoyo de la comunidad de cobradores en México.  
Agradecimientos especiales a todos los que han aportado feedback y sugerencias.

---

## 📊 Estadísticas

Si eres desarrollador y quieres contribuir, revisa el [`CHANGELOG.md`](CHANGELOG.md) para ver el historial de cambios.
