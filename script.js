/**
 * CobraBien.com - Versión final optimizada
 * - Botón limpiar por herramienta
 * - Eventos delegados para mejor rendimiento
 * - Formato de pesos mexicanos
 * - Tooltips y mejoras de UX
 */

(function() {
    "use strict";

    // ==============================================
    // 1. MODO OSCURO / CLARO con localStorage
    // ==============================================
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    function setThemeIcon() {
        themeToggle.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
    }

    const savedTheme = localStorage.getItem('cobraBienTheme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
    }
    setThemeIcon();

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        localStorage.setItem('cobraBienTheme', body.classList.contains('dark') ? 'dark' : 'light');
        setThemeIcon();
    });

    // ==============================================
    // 2. FUNCIÓN PARA FORMATEAR PESOS MEXICANOS
    // ==============================================
    const formatoMXN = (valor) => {
        return valor.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2 });
    };

    // ==============================================
    // 3. FUNCIONES DE GENERACIÓN (definidas una vez)
    // ==============================================
    const generadores = {
        descuento: () => {
            const saldo = parseFloat(document.getElementById('descuento-saldo').value) || 0;
            const porcentaje = parseFloat(document.getElementById('descuento-porcentaje').value) || 0;
            const fecha = document.getElementById('descuento-fecha').value;
            const montoFinal = saldo - (saldo * porcentaje / 100);
            document.getElementById('descuento-monto-final').innerHTML = formatoMXN(montoFinal);
            const fechaStr = fecha ? fecha.split('-').reverse().join('/') : '[fecha no especificada]';
            document.getElementById('descuento-mensaje').value =
                `Hola, le confirmo que su saldo total es de ${formatoMXN(saldo)}. Actualmente cuenta con un descuento del ${porcentaje}%, por lo que el monto a liquidar sería de ${formatoMXN(montoFinal)}. Esta opción está disponible hasta el día ${fechaStr}. Quedo atento a su confirmación.`;
        },
        porcentaje: () => {
            const saldo = parseFloat(document.getElementById('porcentaje-saldo').value) || 0;
            const pInicial = parseFloat(document.getElementById('porcentaje-inicial').value) || 0;
            const meses = parseInt(document.getElementById('porcentaje-meses').value) || 1;
            const fecha = document.getElementById('porcentaje-fecha').value;
            const anticipo = saldo * pInicial / 100;
            const mensualidad = (saldo - anticipo) / meses;
            document.getElementById('porcentaje-anticipo').innerHTML = formatoMXN(anticipo);
            document.getElementById('porcentaje-mensualidad').innerHTML = formatoMXN(mensualidad);
            const fechaStr = fecha ? fecha.split('-').reverse().join('/') : '[fecha no especificada]';
            document.getElementById('porcentaje-mensaje').value =
                `Hola, le confirmo que su saldo total es de ${formatoMXN(saldo)}. Puede realizar un anticipo del ${pInicial}% equivalente a ${formatoMXN(anticipo)}, y el resto en ${meses} mensualidades de ${formatoMXN(mensualidad)} cada una. Esta opción está disponible hasta el día ${fechaStr}. Quedo atento a su confirmación.`;
        },
        monto: () => {
            const saldo = parseFloat(document.getElementById('monto-saldo').value) || 0;
            const inicial = parseFloat(document.getElementById('monto-inicial').value) || 0;
            const meses = parseInt(document.getElementById('monto-meses').value) || 1;
            const fecha = document.getElementById('monto-fecha').value;
            const mensualidad = (saldo - inicial) / meses;
            document.getElementById('monto-mensualidad').innerHTML = formatoMXN(mensualidad);
            const fechaStr = fecha ? fecha.split('-').reverse().join('/') : '[fecha no especificada]';
            document.getElementById('monto-mensaje').value =
                `Hola, le confirmo que su saldo total es de ${formatoMXN(saldo)}. Puede realizar un anticipo de ${formatoMXN(inicial)}, y el resto en ${meses} mensualidades de ${formatoMXN(mensualidad)} cada una. Esta opción está disponible hasta el día ${fechaStr}. Quedo atento a su confirmación.`;
        },
        confirmacion: () => {
            const nombre = document.getElementById('confirmacion-nombre').value.trim() || '[Nombre del Cliente]';
            const monto = parseFloat(document.getElementById('confirmacion-monto').value) || 0;
            const fecha = document.getElementById('confirmacion-fecha').value;
            const referencia = document.getElementById('confirmacion-referencia').value.trim();
            const empresa = document.getElementById('confirmacion-empresa').value.trim() || '[Empresa]';
            const fechaStr = fecha ? fecha.split('-').reverse().join('/') : '[fecha]';
            const refStr = referencia ? ` (Referencia: ${referencia})` : '';
            document.getElementById('confirmacion-mensaje').value =
                `Estimado(a) ${nombre}, se confirma su acuerdo de pago por ${formatoMXN(monto)} el día ${fechaStr}.${refStr} Este pago se aplicará a su cuenta con ${empresa}. Quedamos atentos a su cumplimiento.`;
        },
        recordatorio: () => {
            const nombre = document.getElementById('recordatorio-nombre').value.trim() || '[Nombre del Cliente]';
            const monto = parseFloat(document.getElementById('recordatorio-monto').value) || 0;
            const fecha = document.getElementById('recordatorio-fecha').value;
            const fechaStr = fecha ? fecha.split('-').reverse().join('/') : '[fecha]';
            document.getElementById('recordatorio-mensaje').value =
                `Estimado(a) ${nombre}, le recordamos que el día de mañana vence su compromiso de pago por ${formatoMXN(monto)}. Le agradecemos realizar su pago en tiempo y forma. Quedamos atentos.`;
        },
        script: () => {
            const asesor = document.getElementById('script-asesor').value.trim() || '[Nombre Asesor]';
            const empresa = document.getElementById('script-empresa').value.trim() || '[Empresa Acreedora]';
            const despacho = document.getElementById('script-despacho').value.trim() || '[Nombre Despacho]';
            const fecha = document.getElementById('script-fecha').value;
            const monto = parseFloat(document.getElementById('script-monto').value) || 0;
            const fechaCompromiso = fecha ? fecha.split('-').reverse().join('/') : '[Fecha]';
            const montoStr = monto > 0 ? formatoMXN(monto) : '[Monto]';
            document.getElementById('script-mensaje').value =
                `Buenas tardes, ¿hablo con el señor(a) [Nombre del Cliente]?\n\nMi nombre es ${asesor}, asesor de ${despacho}, y me comunico en representación de ${empresa}.\n\nEl motivo de mi llamada es conversar con usted respecto a su saldo pendiente.\n\nAntes de continuar, me gustaría escucharle. ¿Podría comentarme cuál fue el motivo por el cual no le fue posible realizar su pago?\n\n[NOTA PARA EL ASESOR: En este momento es importante escuchar al cliente y entender su situación. No interrumpir.]\n\n---\n\nComprendo, gracias por compartirlo.\n\nActualmente su cuenta presenta un atraso que requiere atención, y mi intención es ayudarle a encontrar una solución viable.\n\n[NOTA PARA EL ASESOR: En este punto, el asesor YA DEBE TENER ABIERTA LA CALCULADORA DE CobraBien en otra pestaña, para tener listas las opciones.]\n\n---\n\nNegociación:\n\nPermítame comentarle las opciones disponibles para regularizar su situación.\n\n[El asesor presenta las opciones previamente calculadas]\n\nEs importante poder generar hoy mismo un acuerdo que le permita resolver esta situación.\n\n---\n\nConfirmación:\n\nEntonces, para confirmar:\n\nUsted estaría realizando un pago de ${montoStr} el día ${fechaCompromiso}.\n\n¿Es correcto?\n\n---\n\nCierre:\n\nPerfecto, agradezco su disposición.\n\nLe estaré enviando un mensaje por WhatsApp con los detalles de su acuerdo.\n\nQuedo atento y a sus órdenes.`;
        }
    };

    // ==============================================
    // 4. FUNCIONES DE LIMPIEZA
    // ==============================================
    const limpiadores = {
        descuento: () => {
            document.getElementById('descuento-saldo').value = '';
            document.getElementById('descuento-porcentaje').value = '';
            document.getElementById('descuento-fecha').value = '';
            generadores.descuento(); // regenera con ceros
        },
        porcentaje: () => {
            document.getElementById('porcentaje-saldo').value = '';
            document.getElementById('porcentaje-inicial').value = '';
            document.getElementById('porcentaje-meses').value = '';
            document.getElementById('porcentaje-fecha').value = '';
            generadores.porcentaje();
        },
        monto: () => {
            document.getElementById('monto-saldo').value = '';
            document.getElementById('monto-inicial').value = '';
            document.getElementById('monto-meses').value = '';
            document.getElementById('monto-fecha').value = '';
            generadores.monto();
        },
        confirmacion: () => {
            document.getElementById('confirmacion-nombre').value = '';
            document.getElementById('confirmacion-monto').value = '';
            document.getElementById('confirmacion-fecha').value = '';
            document.getElementById('confirmacion-referencia').value = '';
            document.getElementById('confirmacion-empresa').value = '';
            generadores.confirmacion();
        },
        recordatorio: () => {
            document.getElementById('recordatorio-nombre').value = '';
            document.getElementById('recordatorio-monto').value = '';
            document.getElementById('recordatorio-fecha').value = '';
            generadores.recordatorio();
        },
        script: () => {
            document.getElementById('script-asesor').value = '';
            document.getElementById('script-empresa').value = '';
            document.getElementById('script-despacho').value = '';
            document.getElementById('script-fecha').value = '';
            document.getElementById('script-monto').value = '';
            generadores.script();
        }
    };

    // ==============================================
    // 5. EVENTOS DELEGADOS (mejor rendimiento)
    // ==============================================
    document.addEventListener('click', (e) => {
        const target = e.target;

        // Botones generar
        if (target.classList.contains('btn-generar')) {
            const herramienta = target.getAttribute('data-herramienta');
            if (herramienta && generadores[herramienta]) {
                generadores[herramienta]();
            }
        }

        // Botones copiar
        if (target.classList.contains('btn-copiar')) {
            const targetId = target.getAttribute('data-target');
            if (targetId) {
                const el = document.getElementById(targetId);
                if (el && el.value) {
                    navigator.clipboard.writeText(el.value).then(() => {
                        alert('✅ Mensaje copiado');
                    }).catch(() => {
                        alert('❌ No se pudo copiar');
                    });
                } else {
                    alert('Primero genera el mensaje.');
                }
            }
        }

        // Botones limpiar
        if (target.classList.contains('btn-limpiar')) {
            const herramienta = target.getAttribute('data-limpiar');
            if (herramienta && limpiadores[herramienta]) {
                limpiadores[herramienta]();
            }
        }

        // Botón sugerencia
        if (target.id === 'sugerencia-btn') {
            window.open('https://wa.me/5210000000000?text=Hola%20equipo%20CobraBien,%20quiero%20enviarles%20una%20sugerencia%20para%20mejorar%20la%20página:', '_blank');
        }

        // Botón abrir calculadoras
        if (target.id === 'btn-abrir-calculadora') {
            document.getElementById('calculadoras').scrollIntoView({ behavior: 'smooth' });
        }
    });

    // ==============================================
    // 6. GENERAR MENSAJES INICIALES (una sola vez)
    // ==============================================
    // Pequeño retraso para no bloquear la carga inicial
    setTimeout(() => {
        Object.values(generadores).forEach(fn => fn());
    }, 50);

})();
