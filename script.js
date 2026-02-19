/**
 * CobraBien.com - Versión con plantillas personalizables, ayuda y redondeo opcional
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
    // 3. FUNCIONES AUXILIARES
    // ==============================================
    function validarNumero(valor, defecto = 0, min = 0) {
        const num = parseFloat(valor);
        return (isNaN(num) || num < min) ? defecto : num;
    }

    function validarEntero(valor, defecto = 1, min = 1) {
        const num = parseInt(valor, 10);
        return (isNaN(num) || num < min) ? defecto : num;
    }

    // Plantillas por defecto para cada herramienta
    const plantillasDefecto = {
        descuento: "Hola, le confirmo que su saldo total es de {{saldo}}. Actualmente cuenta con un descuento del {{porcentaje}}%, por lo que el monto a liquidar sería de {{montoFinal}}. Esta opción está disponible hasta el día {{fecha}}. Quedo atento a su confirmación.",
        porcentaje: "Hola, le confirmo que su saldo total es de {{saldo}}. Puede realizar un anticipo del {{pInicial}}% equivalente a {{anticipo}}, y el resto en {{meses}} mensualidades de {{mensualidad}} cada una. Esta opción está disponible hasta el día {{fecha}}. Quedo atento a su confirmación.",
        monto: "Hola, le confirmo que su saldo total es de {{saldo}}. Puede realizar un anticipo de {{inicial}}, y el resto en {{meses}} mensualidades de {{mensualidad}} cada una. Esta opción está disponible hasta el día {{fecha}}. Quedo atento a su confirmación.",
        confirmacion: "Estimado(a) {{nombre}}, se confirma su acuerdo de pago por {{monto}} el día {{fecha}}.{{refStr}} Este pago se aplicará a su cuenta con {{empresa}}. Quedamos atentos a su cumplimiento.",
        recordatorio: "Estimado(a) {{nombre}}, le recordamos que el día de mañana vence su compromiso de pago por {{monto}}. Le agradecemos realizar su pago en tiempo y forma. Quedamos atentos."
    };

    // ==============================================
    // 4. FUNCIONES DE GENERACIÓN (con plantilla personalizada y redondeo)
    // ==============================================
    const generadores = {
        descuento: () => {
            const saldo = validarNumero(document.getElementById('descuento-saldo').value, 0);
            const porcentaje = validarNumero(document.getElementById('descuento-porcentaje').value, 0, 0);
            const fecha = document.getElementById('descuento-fecha').value;
            let montoFinal = saldo - (saldo * porcentaje / 100);

            // Redondeo opcional
            const redondear = document.getElementById('descuento-redondear')?.checked || false;
            if (redondear) montoFinal = Math.ceil(montoFinal);

            document.getElementById('descuento-monto-final').innerHTML = formatoMXN(montoFinal);

            const fechaStr = fecha ? fecha.split('-').reverse().join('/') : '[fecha no especificada]';

            let plantilla = document.getElementById('descuento-plantilla').value.trim();
            if (!plantilla) {
                plantilla = plantillasDefecto.descuento;
            }

            let mensaje = plantilla
                .replace(/{{saldo}}/g, formatoMXN(saldo))
                .replace(/{{porcentaje}}/g, porcentaje)
                .replace(/{{montoFinal}}/g, formatoMXN(montoFinal))
                .replace(/{{fecha}}/g, fechaStr);

            document.getElementById('descuento-mensaje').value = mensaje;
        },
        porcentaje: () => {
            const saldo = validarNumero(document.getElementById('porcentaje-saldo').value, 0);
            const pInicial = validarNumero(document.getElementById('porcentaje-inicial').value, 0, 0);
            const meses = validarEntero(document.getElementById('porcentaje-meses').value, 1);
            const fecha = document.getElementById('porcentaje-fecha').value;
            let anticipo = saldo * pInicial / 100;
            let mensualidad = meses > 0 ? (saldo - anticipo) / meses : 0;

            const redondear = document.getElementById('porcentaje-redondear')?.checked || false;
            if (redondear) {
                anticipo = Math.ceil(anticipo);
                mensualidad = Math.ceil(mensualidad);
            }

            document.getElementById('porcentaje-anticipo').innerHTML = formatoMXN(anticipo);
            document.getElementById('porcentaje-mensualidad').innerHTML = formatoMXN(mensualidad);

            const fechaStr = fecha ? fecha.split('-').reverse().join('/') : '[fecha no especificada]';

            let plantilla = document.getElementById('porcentaje-plantilla').value.trim();
            if (!plantilla) plantilla = plantillasDefecto.porcentaje;

            let mensaje = plantilla
                .replace(/{{saldo}}/g, formatoMXN(saldo))
                .replace(/{{pInicial}}/g, pInicial)
                .replace(/{{anticipo}}/g, formatoMXN(anticipo))
                .replace(/{{meses}}/g, meses)
                .replace(/{{mensualidad}}/g, formatoMXN(mensualidad))
                .replace(/{{fecha}}/g, fechaStr);

            document.getElementById('porcentaje-mensaje').value = mensaje;
        },
        monto: () => {
            const saldo = validarNumero(document.getElementById('monto-saldo').value, 0);
            let inicial = validarNumero(document.getElementById('monto-inicial').value, 0);
            const meses = validarEntero(document.getElementById('monto-meses').value, 1);
            const fecha = document.getElementById('monto-fecha').value;
            let mensualidad = meses > 0 ? (saldo - inicial) / meses : 0;

            const redondear = document.getElementById('monto-redondear')?.checked || false;
            if (redondear) {
                mensualidad = Math.ceil(mensualidad);
                // No redondeamos inicial porque es un dato fijo del usuario
            }

            document.getElementById('monto-mensualidad').innerHTML = formatoMXN(mensualidad);

            const fechaStr = fecha ? fecha.split('-').reverse().join('/') : '[fecha no especificada]';

            let plantilla = document.getElementById('monto-plantilla').value.trim();
            if (!plantilla) plantilla = plantillasDefecto.monto;

            let mensaje = plantilla
                .replace(/{{saldo}}/g, formatoMXN(saldo))
                .replace(/{{inicial}}/g, formatoMXN(inicial))
                .replace(/{{meses}}/g, meses)
                .replace(/{{mensualidad}}/g, formatoMXN(mensualidad))
                .replace(/{{fecha}}/g, fechaStr);

            document.getElementById('monto-mensaje').value = mensaje;
        },
        confirmacion: () => {
            const nombre = document.getElementById('confirmacion-nombre').value.trim() || '[Nombre del Cliente]';
            const monto = validarNumero(document.getElementById('confirmacion-monto').value, 0);
            const fecha = document.getElementById('confirmacion-fecha').value;
            const referencia = document.getElementById('confirmacion-referencia').value.trim();
            const empresa = document.getElementById('confirmacion-empresa').value.trim() || '[Empresa]';
            const fechaStr = fecha ? fecha.split('-').reverse().join('/') : '[fecha]';
            const refStr = referencia ? ` (Referencia: ${referencia})` : '';

            let plantilla = document.getElementById('confirmacion-plantilla').value.trim();
            if (!plantilla) plantilla = plantillasDefecto.confirmacion;

            let mensaje = plantilla
                .replace(/{{nombre}}/g, nombre)
                .replace(/{{monto}}/g, formatoMXN(monto))
                .replace(/{{fecha}}/g, fechaStr)
                .replace(/{{refStr}}/g, refStr)
                .replace(/{{empresa}}/g, empresa);

            document.getElementById('confirmacion-mensaje').value = mensaje;
        },
        recordatorio: () => {
            const nombre = document.getElementById('recordatorio-nombre').value.trim() || '[Nombre del Cliente]';
            const monto = validarNumero(document.getElementById('recordatorio-monto').value, 0);
            const fecha = document.getElementById('recordatorio-fecha').value;
            const fechaStr = fecha ? fecha.split('-').reverse().join('/') : '[fecha]';

            let plantilla = document.getElementById('recordatorio-plantilla').value.trim();
            if (!plantilla) plantilla = plantillasDefecto.recordatorio;

            let mensaje = plantilla
                .replace(/{{nombre}}/g, nombre)
                .replace(/{{monto}}/g, formatoMXN(monto))
                .replace(/{{fecha}}/g, fechaStr);

            document.getElementById('recordatorio-mensaje').value = mensaje;
        },
        script: () => {
            const asesor = document.getElementById('script-asesor').value.trim() || '[Nombre Asesor]';
            const empresa = document.getElementById('script-empresa').value.trim() || '[Empresa Acreedora]';
            const despacho = document.getElementById('script-despacho').value.trim() || '[Nombre Despacho]';
            const fecha = document.getElementById('script-fecha').value;
            const monto = validarNumero(document.getElementById('script-monto').value, 0);
            const fechaCompromiso = fecha ? fecha.split('-').reverse().join('/') : '[Fecha]';
            const montoStr = monto > 0 ? formatoMXN(monto) : '[Monto]';

            const mensaje = `Buenas tardes, ¿hablo con el señor(a) [Nombre del Cliente]?\n\nMi nombre es ${asesor}, asesor de ${despacho}, y me comunico en representación de ${empresa}.\n\nEl motivo de mi llamada es conversar con usted respecto a su saldo pendiente.\n\nAntes de continuar, me gustaría escucharle. ¿Podría comentarme cuál fue el motivo por el cual no le fue posible realizar su pago?\n\n[NOTA PARA EL ASESOR: En este momento es importante escuchar al cliente y entender su situación. No interrumpir.]\n\n---\n\nComprendo, gracias por compartirlo.\n\nActualmente su cuenta presenta un atraso que requiere atención, y mi intención es ayudarle a encontrar una solución viable.\n\n[NOTA PARA EL ASESOR: En este punto, el asesor YA DEBE TENER ABIERTA LA CALCULADORA DE CobraBien en otra pestaña, para tener listas las opciones.]\n\n---\n\nNegociación:\n\nPermítame comentarle las opciones disponibles para regularizar su situación.\n\n[El asesor presenta las opciones previamente calculadas]\n\nEs importante poder generar hoy mismo un acuerdo que le permita resolver esta situación.\n\n---\n\nConfirmación:\n\nEntonces, para confirmar:\n\nUsted estaría realizando un pago de ${montoStr} el día ${fechaCompromiso}.\n\n¿Es correcto?\n\n---\n\nCierre:\n\nPerfecto, agradezco su disposición.\n\nLe estaré enviando un mensaje por WhatsApp con los detalles de su acuerdo.\n\nQuedo atento y a sus órdenes.`;

            document.getElementById('script-mensaje').value = mensaje;
        }
    };

    // ==============================================
    // 5. FUNCIONES DE LIMPIEZA
    // ==============================================
    const limpiadores = {
        descuento: () => {
            document.getElementById('descuento-saldo').value = '';
            document.getElementById('descuento-porcentaje').value = '';
            document.getElementById('descuento-fecha').value = '';
            document.getElementById('descuento-plantilla').value = '';
            document.getElementById('descuento-redondear').checked = false;
            generadores.descuento();
        },
        porcentaje: () => {
            document.getElementById('porcentaje-saldo').value = '';
            document.getElementById('porcentaje-inicial').value = '';
            document.getElementById('porcentaje-meses').value = '';
            document.getElementById('porcentaje-fecha').value = '';
            document.getElementById('porcentaje-plantilla').value = '';
            document.getElementById('porcentaje-redondear').checked = false;
            generadores.porcentaje();
        },
        monto: () => {
            document.getElementById('monto-saldo').value = '';
            document.getElementById('monto-inicial').value = '';
            document.getElementById('monto-meses').value = '';
            document.getElementById('monto-fecha').value = '';
            document.getElementById('monto-plantilla').value = '';
            document.getElementById('monto-redondear').checked = false;
            generadores.monto();
        },
        confirmacion: () => {
            document.getElementById('confirmacion-nombre').value = '';
            document.getElementById('confirmacion-monto').value = '';
            document.getElementById('confirmacion-fecha').value = '';
            document.getElementById('confirmacion-referencia').value = '';
            document.getElementById('confirmacion-empresa').value = '';
            document.getElementById('confirmacion-plantilla').value = '';
            generadores.confirmacion();
        },
        recordatorio: () => {
            document.getElementById('recordatorio-nombre').value = '';
            document.getElementById('recordatorio-monto').value = '';
            document.getElementById('recordatorio-fecha').value = '';
            document.getElementById('recordatorio-plantilla').value = '';
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
    // 6. RESTAURAR PLANTILLA POR DEFECTO
    // ==============================================
    document.querySelectorAll('[data-restaurar]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const herramienta = btn.getAttribute('data-restaurar');
            const plantillaDefecto = plantillasDefecto[herramienta];
            if (plantillaDefecto) {
                document.getElementById(`${herramienta}-plantilla`).value = plantillaDefecto;
                if (generadores[herramienta]) generadores[herramienta]();
                mostrarToast('🔄 Plantilla restaurada');
            }
        });
    });

    // ==============================================
    // 7. TOAST NOTIFICATION
    // ==============================================
    const toast = document.getElementById('toast');
    function mostrarToast(mensaje = '✅ Copiado') {
        if (!toast) return;
        toast.textContent = mensaje;
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 2000);
    }

    // ==============================================
    // 8. EVENTOS DELEGADOS
    // ==============================================
    document.addEventListener('click', (e) => {
        const target = e.target;

        // Botones generar
        if (target.classList.contains('btn-generar') && !target.closest('a')) {
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
                        mostrarToast('✅ Copiado');
                    }).catch(() => {
                        mostrarToast('❌ Error al copiar');
                    });
                } else {
                    mostrarToast('❌ Primero genera el mensaje');
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

        // Botón abrir calculadoras
        if (target.id === 'btn-abrir-calculadora') {
            document.getElementById('calculadoras').scrollIntoView({ behavior: 'smooth' });
        }
    });

    // ==============================================
    // 9. SCROLL SUAVE PARA EL MENÚ FLOTANTE
    // ==============================================
    document.querySelectorAll('.menu-item').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href && href !== '#') {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // ==============================================
    // 10. OCULTAR/MOSTRAR MENÚ AL HACER SCROLL
    // ==============================================
    const floatMenu = document.getElementById('floatMenu');
    if (floatMenu) {
        let lastScrollTop = 0;
        const scrollThreshold = 50;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            if (Math.abs(currentScroll - lastScrollTop) > scrollThreshold) {
                if (currentScroll > lastScrollTop && currentScroll > 100) {
                    floatMenu.classList.add('hidden');
                } else {
                    floatMenu.classList.remove('hidden');
                }
                lastScrollTop = currentScroll;
            }
        });
    }

    // ==============================================
    // 11. GENERAR MENSAJES INICIALES
    // ==============================================
    setTimeout(() => {
        Object.values(generadores).forEach(fn => fn());
    }, 50);
})();
