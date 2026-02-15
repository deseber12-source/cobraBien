/**
 * CobraBien.com - Herramientas profesionales de cobranza
 * JavaScript principal: cálculos, generación de mensajes, modo oscuro, clipboard.
 */

// ==============================================
// 1. MODO OSCURO / CLARO con localStorage
// ==============================================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Cargar tema guardado
const savedTheme = localStorage.getItem('cobraBienTheme');
if (savedTheme === 'dark') {
    body.classList.add('dark');
    themeToggle.textContent = '☀️'; // sol para modo oscuro (cambiar a claro)
} else {
    themeToggle.textContent = '🌙'; // luna para modo claro (cambiar a oscuro)
}

// Función para alternar tema
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('cobraBienTheme', isDark ? 'dark' : 'light');
});

// ==============================================
// 2. HERRAMIENTA 1: Calculadora de descuento
// ==============================================
const descSaldo = document.getElementById('descuento-saldo');
const descPorcentaje = document.getElementById('descuento-porcentaje');
const descFecha = document.getElementById('descuento-fecha');
const descMontoFinal = document.getElementById('descuento-monto-final');
const descMensaje = document.getElementById('descuento-mensaje');

function actualizarDescuento() {
    const saldo = parseFloat(descSaldo.value) || 0;
    const porcentaje = parseFloat(descPorcentaje.value) || 0;
    const fecha = descFecha.value;

    const descuento = (saldo * porcentaje) / 100;
    const montoFinal = saldo - descuento;

    // Mostrar monto final con 2 decimales
    descMontoFinal.textContent = montoFinal.toFixed(2);

    // Formatear fecha (dd/mm/yyyy)
    let fechaFormateada = '';
    if (fecha) {
        const [year, month, day] = fecha.split('-');
        fechaFormateada = `${day}/${month}/${year}`;
    }

    // Generar mensaje
    const mensaje = `Hola, le confirmo que su saldo total es de $${saldo.toFixed(2)}. Actualmente cuenta con un descuento del ${porcentaje}%, por lo que el monto a liquidar sería de $${montoFinal.toFixed(2)}. Esta opción está disponible hasta el día ${fechaFormateada}. Quedo atento a su confirmación.`;
    descMensaje.value = mensaje;
}

// Escuchar eventos en los inputs
[descSaldo, descPorcentaje, descFecha].forEach(input => {
    input.addEventListener('input', actualizarDescuento);
});
actualizarDescuento(); // inicializar

// ==============================================
// 3. HERRAMIENTA 2: Plan con porcentaje inicial
// ==============================================
const porcSaldo = document.getElementById('porcentaje-saldo');
const porcInicial = document.getElementById('porcentaje-inicial');
const porcMeses = document.getElementById('porcentaje-meses');
const porcFecha = document.getElementById('porcentaje-fecha');
const porcAnticipo = document.getElementById('porcentaje-anticipo');
const porcMensualidad = document.getElementById('porcentaje-mensualidad');
const porcMensaje = document.getElementById('porcentaje-mensaje');

function actualizarPorcentaje() {
    const saldo = parseFloat(porcSaldo.value) || 0;
    const porcentaje = parseFloat(porcInicial.value) || 0;
    const meses = parseInt(porcMeses.value) || 1;
    const fecha = porcFecha.value;

    const anticipo = (saldo * porcentaje) / 100;
    const mensualidad = (saldo - anticipo) / meses;

    porcAnticipo.textContent = anticipo.toFixed(2);
    porcMensualidad.textContent = mensualidad.toFixed(2);

    let fechaFormateada = '';
    if (fecha) {
        const [year, month, day] = fecha.split('-');
        fechaFormateada = `${day}/${month}/${year}`;
    }

    const mensaje = `Hola, le confirmo que su saldo total es de $${saldo.toFixed(2)}. Puede realizar un anticipo del ${porcentaje}% equivalente a $${anticipo.toFixed(2)}, y el resto en ${meses} mensualidades de $${mensualidad.toFixed(2)} cada una. Esta opción está disponible hasta el día ${fechaFormateada}. Quedo atento a su confirmación.`;
    porcMensaje.value = mensaje;
}

[porcSaldo, porcInicial, porcMeses, porcFecha].forEach(input => {
    input.addEventListener('input', actualizarPorcentaje);
});
actualizarPorcentaje();

// ==============================================
// 4. HERRAMIENTA 3: Plan con monto inicial
// ==============================================
const montoSaldo = document.getElementById('monto-saldo');
const montoInicial = document.getElementById('monto-inicial');
const montoMeses = document.getElementById('monto-meses');
const montoFecha = document.getElementById('monto-fecha');
const montoMensualidadSpan = document.getElementById('monto-mensualidad');
const montoMensaje = document.getElementById('monto-mensaje');

function actualizarMonto() {
    const saldo = parseFloat(montoSaldo.value) || 0;
    const inicial = parseFloat(montoInicial.value) || 0;
    const meses = parseInt(montoMeses.value) || 1;
    const fecha = montoFecha.value;

    const mensualidad = (saldo - inicial) / meses;
    montoMensualidadSpan.textContent = mensualidad.toFixed(2);

    let fechaFormateada = '';
    if (fecha) {
        const [year, month, day] = fecha.split('-');
        fechaFormateada = `${day}/${month}/${year}`;
    }

    const mensaje = `Hola, le confirmo que su saldo total es de $${saldo.toFixed(2)}. Puede realizar un anticipo de $${inicial.toFixed(2)}, y el resto en ${meses} mensualidades de $${mensualidad.toFixed(2)} cada una. Esta opción está disponible hasta el día ${fechaFormateada}. Quedo atento a su confirmación.`;
    montoMensaje.value = mensaje;
}

[montoSaldo, montoInicial, montoMeses, montoFecha].forEach(input => {
    input.addEventListener('input', actualizarMonto);
});
actualizarMonto();

// ==============================================
// 5. HERRAMIENTA 4: Script de llamada
// ==============================================
const scriptAsesor = document.getElementById('script-asesor');
const scriptNombreCliente = document.getElementById('script-nombre-cliente');
const scriptApellidoCliente = document.getElementById('script-apellido-cliente');
const scriptEmpresa = document.getElementById('script-empresa');
const scriptDespacho = document.getElementById('script-despacho');
const scriptFecha = document.getElementById('script-fecha');
const scriptMonto = document.getElementById('script-monto');
const scriptMensaje = document.getElementById('script-mensaje');

function actualizarScript() {
    const asesor = scriptAsesor.value.trim() || '[Nombre Asesor]';
    const nombreCliente = scriptNombreCliente.value.trim() || '[Nombre Cliente]';
    const apellidoCliente = scriptApellidoCliente.value.trim() || '[Apellido Cliente]';
    const empresa = scriptEmpresa.value.trim() || '[Empresa Acreedora]';
    const despacho = scriptDespacho.value.trim() || '[Nombre Despacho]';
    const fecha = scriptFecha.value;
    const monto = parseFloat(scriptMonto.value) || 0;

    let fechaCompromiso = '';
    if (fecha) {
        const [year, month, day] = fecha.split('-');
        fechaCompromiso = `${day}/${month}/${year}`;
    } else {
        fechaCompromiso = '[Fecha]';
    }

    const montoStr = monto > 0 ? monto.toFixed(2) : '[Monto]';

    // Estructura completa del script (con notas)
    const script = `Buenas tardes, ¿hablo con el señor(a) ${nombreCliente} ${apellidoCliente}?

Mi nombre es ${asesor}, asesor de ${despacho}, y me comunico en representación de ${empresa}.

El motivo de mi llamada es conversar con usted respecto a su saldo pendiente.

Antes de continuar, me gustaría escucharle. ¿Podría comentarme cuál fue el motivo por el cual no le fue posible realizar su pago?

[NOTA PARA EL ASESOR: En este momento es importante escuchar al cliente y entender su situación. No interrumpir.]

---

Comprendo, gracias por compartirlo.

Actualmente su cuenta presenta un atraso que requiere atención, y mi intención es ayudarle a encontrar una solución viable.

[NOTA PARA EL ASESOR: En este punto, el asesor YA DEBE TENER ABIERTA LA CALCULADORA DE CobraBien en otra pestaña, para tener listas las opciones.]

---

Negociación:

Permítame comentarle las opciones disponibles para regularizar su situación.

[El asesor presenta las opciones previamente calculadas]

Es importante poder generar hoy mismo un acuerdo que le permita resolver esta situación.

---

Confirmación:

Entonces, para confirmar:

Usted estaría realizando un pago de $${montoStr} el día ${fechaCompromiso}.

¿Es correcto?

---

Cierre:

Perfecto, agradezco su disposición.

Le estaré enviando un mensaje por WhatsApp con los detalles de su acuerdo.

Quedo atento y a sus órdenes.`;

    scriptMensaje.value = script;
}

// Escuchar cambios en inputs del script
const scriptInputs = [scriptAsesor, scriptNombreCliente, scriptApellidoCliente, scriptEmpresa, scriptDespacho, scriptFecha, scriptMonto];
scriptInputs.forEach(input => {
    input.addEventListener('input', actualizarScript);
});
actualizarScript();

// Botón "Abrir calculadora" - scroll suave a la sección de calculadoras
document.getElementById('btn-abrir-calculadora').addEventListener('click', () => {
    document.getElementById('calculadoras').scrollIntoView({ behavior: 'smooth' });
});

// ==============================================
// 6. FUNCIONES COMUNES: Copiar, WhatsApp, Sugerencia
// ==============================================

// Función para copiar texto al portapapeles
async function copiarTexto(elementId) {
    const elemento = document.getElementById(elementId);
    if (!elemento) return;
    try {
        await navigator.clipboard.writeText(elemento.value);
        alert('¡Copiado al portapapeles!');
    } catch (err) {
        alert('Error al copiar, selecciona manualmente.');
    }
}

// Asignar eventos a botones de copiar (data-target)
document.querySelectorAll('.btn-copiar').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const targetId = btn.getAttribute('data-target');
        if (targetId) copiarTexto(targetId);
    });
});

// Función para enviar por WhatsApp (abre enlace con mensaje)
function enviarWhatsApp(elementId) {
    const elemento = document.getElementById(elementId);
    if (!elemento) return;
    const mensaje = encodeURIComponent(elemento.value);
    // Usar wa.me sin número para que el usuario elija el contacto
    window.open(`https://wa.me/?text=${mensaje}`, '_blank');
}

// Asignar eventos a botones "Enviar WhatsApp" (data-mensaje)
document.querySelectorAll('.btn-wsp').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const targetId = btn.getAttribute('data-mensaje');
        if (targetId) enviarWhatsApp(targetId);
    });
});

// Función para sugerencia (enlace fijo)
function enviarSugerencia() {
    const url = 'https://wa.me/5210000000000?text=Sugerencia%20CobraBien';
    window.open(url, '_blank');
}

// Asignar eventos a botones "Enviar sugerencia"
document.querySelectorAll('.btn-sugerencia').forEach(btn => {
    btn.addEventListener('click', enviarSugerencia);
});
