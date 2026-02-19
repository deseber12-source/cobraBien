(function() {
    "use strict";

    // Elementos comunes
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const toast = document.getElementById('toast');

    // Modo oscuro
    function setThemeIcon() {
        themeToggle.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
    }
    const savedTheme = localStorage.getItem('cobraBienTheme');
    if (savedTheme === 'dark') body.classList.add('dark');
    setThemeIcon();
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        localStorage.setItem('cobraBienTheme', body.classList.contains('dark') ? 'dark' : 'light');
        setThemeIcon();
    });

    // Función mostrar toast
    function mostrarToast(mensaje = '✅ Copiado') {
        if (!toast) return;
        toast.textContent = mensaje;
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 2000);
    }

    // Formato moneda
    const formatoMXN = (valor) => {
        const num = parseFloat(valor);
        if (isNaN(num)) return valor;
        return num.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2 });
    };

    // Navegación de pasos
    const steps = document.querySelectorAll('.step');
    const stepContents = document.querySelectorAll('.step-content');
    function goToStep(stepNumber) {
        steps.forEach(s => s.classList.remove('active', 'completed'));
        stepContents.forEach(c => c.classList.remove('active'));
        for (let i = 1; i < stepNumber; i++) {
            document.querySelector(`.step[data-step="${i}"]`).classList.add('completed');
        }
        document.querySelector(`.step[data-step="${stepNumber}"]`).classList.add('active');
        document.getElementById(`step${stepNumber}`).classList.add('active');
    }

    // Estado de la aplicación
    let state = {
        variables: {
            correo: 'correo',
            nombre: 'nombre',
            adicionales: []
        },
        plantilla: '',
        plantillaResumen: '',
        datos: [],
        cabeceras: [],
        cabecerasOriginales: [],
        filaActual: 0
    };

    // Referencias a inputs
    const varCorreo = document.getElementById('var-correo');
    const varNombre = document.getElementById('var-nombre');
    const agregarVarBtn = document.getElementById('agregar-variable');
    const contenedorAdicionales = document.getElementById('variables-adicionales-container');
    const plantillaTextarea = document.getElementById('plantilla-mensaje');
    const habilitarResumenCheck = document.getElementById('habilitar-resumen');
    const resumenContainer = document.getElementById('resumen-container');
    const plantillaResumenTextarea = document.getElementById('plantilla-resumen');

    const fileInput = document.getElementById('file-input');
    const fileArea = document.getElementById('file-upload-area');
    const previewContainer = document.getElementById('preview-container');
    const previewTable = document.getElementById('preview-table');
    const rowCount = document.getElementById('row-count');
    const step1Next = document.getElementById('step1-next');
    const step2Prev = document.getElementById('step2-prev');
    const step2Next = document.getElementById('step2-next');
    const step3Prev = document.getElementById('step3-prev');
    const step3Next = document.getElementById('step3-next');
    const step4Prev = document.getElementById('step4-prev');
    const reiniciarBtn = document.getElementById('reiniciar-btn');
    const resultadoAnterior = document.getElementById('resultado-anterior');
    const resultadoSiguiente = document.getElementById('resultado-siguiente');
    const contadorFila = document.getElementById('contador-fila');
    const resultadoActual = document.getElementById('resultado-actual');

    // Utilidad para normalizar texto
    function normalizar(str) {
        return String(str).trim().toLowerCase().replace(/\s+/g, '_');
    }

    // Guardar variables desde inputs
    function guardarVariables() {
        state.variables.correo = normalizar(varCorreo.value) || 'correo';
        state.variables.nombre = normalizar(varNombre.value) || 'nombre';
        const adicionalesInputs = document.querySelectorAll('.var-adicional');
        state.variables.adicionales = Array.from(adicionalesInputs)
            .map(inp => normalizar(inp.value))
            .filter(v => v !== '');
        actualizarChecklistVariables();
    }

    // Actualizar lista de variables disponibles
    function actualizarChecklistVariables() {
        const todasLasVariables = [state.variables.correo, state.variables.nombre, ...state.variables.adicionales];
        const container = document.getElementById('variables-disponibles');
        container.innerHTML = '';
        todasLasVariables.forEach(v => {
            const div = document.createElement('div');
            div.className = 'variable-item';
            div.innerHTML = `<span class="badge">📌</span> <code>{{${v}}}</code>`;
            container.appendChild(div);
        });
    }

    // Añadir campo de variable adicional
    agregarVarBtn.addEventListener('click', () => {
        const div = document.createElement('div');
        div.className = 'variable-item';
        div.innerHTML = `
            <span class="badge">➕</span>
            <input type="text" class="var-adicional" placeholder="nombre_variable" value="">
            <button type="button" class="btn-sm btn-limpiar" style="padding:0.2rem 0.5rem;">✖</button>
        `;
        div.querySelector('button').addEventListener('click', () => {
            div.remove();
            guardarVariables();
        });
        contenedorAdicionales.appendChild(div);
    });

    // Evento para mostrar/ocultar campo de resumen
    habilitarResumenCheck.addEventListener('change', function() {
        resumenContainer.style.display = this.checked ? 'block' : 'none';
        if (!this.checked) {
            plantillaResumenTextarea.value = '';
        }
    });

    // Eventos de navegación
    step1Next.addEventListener('click', () => {
        guardarVariables();
        goToStep(2);
    });

    step2Prev.addEventListener('click', () => {
        guardarVariables();
        goToStep(1);
    });

    step2Next.addEventListener('click', () => {
        state.plantilla = plantillaTextarea.value;
        if (!state.plantilla) {
            mostrarToast('❌ Escribe una plantilla');
            return;
        }
        if (habilitarResumenCheck.checked) {
            state.plantillaResumen = plantillaResumenTextarea.value;
        } else {
            state.plantillaResumen = '';
        }
        goToStep(3);
    });

    step3Prev.addEventListener('click', () => goToStep(2));

    // Carga de archivo con SheetJS
    fileArea.addEventListener('click', () => fileInput.click());
    fileArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileArea.style.borderColor = 'var(--primary-blue)';
    });
    fileArea.addEventListener('dragleave', () => {
        fileArea.style.borderColor = 'var(--border-color)';
    });
    fileArea.addEventListener('drop', (e) => {
        e.preventDefault();
        fileArea.style.borderColor = 'var(--border-color)';
        const file = e.dataTransfer.files[0];
        if (file) procesarArchivo(file);
    });
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) procesarArchivo(file);
    });

    function procesarArchivo(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                let data;
                if (file.name.endsWith('.csv')) {
                    const csvText = e.target.result;
                    data = csvText;
                } else {
                    const arrayBuffer = e.target.result;
                    data = new Uint8Array(arrayBuffer);
                }

                let workbook;
                if (typeof data === 'string') {
                    workbook = XLSX.read(data, { type: 'string' });
                } else {
                    workbook = XLSX.read(data, { type: 'array' });
                }

                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                const rows = XLSX.utils.sheet_to_json(firstSheet, { header: 1, defval: '' });
                if (rows.length < 2) {
                    mostrarToast('❌ El archivo debe tener al menos encabezados y una fila');
                    return;
                }
                // Normalizar cabeceras
                const cabecerasOriginales = rows[0].map(h => String(h).trim());
                const cabecerasNorm = cabecerasOriginales.map(h => normalizar(h));
                state.cabecerasOriginales = cabecerasOriginales;
                state.cabeceras = cabecerasNorm;

                guardarVariables();

                // Verificar obligatorias
                if (!cabecerasNorm.includes(state.variables.correo) || !cabecerasNorm.includes(state.variables.nombre)) {
                    mostrarToast(`❌ No se encontraron las columnas obligatorias. Buscamos: "${state.variables.correo}" y "${state.variables.nombre}" en las columnas: ${cabecerasOriginales.join(', ')}`);
                    return;
                }

                // Verificar adicionales
                const faltantes = state.variables.adicionales.filter(v => !cabecerasNorm.includes(v));
                if (faltantes.length > 0) {
                    mostrarToast(`❌ Columnas no encontradas: ${faltantes.join(', ')}`);
                    return;
                }

                // Convertir filas a objetos
                state.datos = [];
                for (let i = 1; i < rows.length; i++) {
                    const row = rows[i];
                    const obj = {};
                    cabecerasOriginales.forEach((col, idx) => {
                        let valor = row[idx] !== undefined ? row[idx] : '';
                        if (typeof valor === 'string' && valor.trim() !== '' && !isNaN(valor)) {
                            valor = parseFloat(valor);
                        }
                        obj[col] = valor;
                    });
                    state.datos.push(obj);
                }

                // Limitar a 1000 filas
                if (state.datos.length > 1000) {
                    mostrarToast(`⚠️ El archivo tiene ${state.datos.length} filas. Solo se procesarán las primeras 1000.`);
                    state.datos = state.datos.slice(0, 1000);
                }

                mostrarPreview();
                step3Next.disabled = false;
            } catch (error) {
                mostrarToast('❌ Error al leer el archivo');
                console.error(error);
            }
        };

        if (file.name.endsWith('.csv')) {
            reader.readAsText(file, 'UTF-8');
        } else {
            reader.readAsArrayBuffer(file);
        }
    }

    function mostrarPreview() {
        const previewRows = state.datos.slice(0, 5);
        let html = '<table><thead><tr>';
        state.cabecerasOriginales.forEach(c => html += `<th>${c}</th>`);
        html += '</tr></thead><tbody>';
        previewRows.forEach(row => {
            html += '<tr>';
            state.cabecerasOriginales.forEach(c => {
                let valor = row[c];
                if (valor === undefined || valor === null) valor = '';
                html += `<td>${valor}</td>`;
            });
            html += '</tr>';
        });
        html += '</tbody></table>';
        previewTable.innerHTML = html;
        rowCount.textContent = `Total filas: ${state.datos.length}`;
        previewContainer.style.display = 'block';
    }

    step3Next.addEventListener('click', () => {
        if (!state.datos.length) {
            mostrarToast('❌ Primero carga un archivo');
            return;
        }
        state.filaActual = 0;
        mostrarFilaActual();
        goToStep(4);
    });

    // Función para reemplazar variables en una plantilla
    function aplicarPlantilla(plantilla, fila) {
        let mensaje = plantilla;
        const todasLasVariables = [state.variables.correo, state.variables.nombre, ...state.variables.adicionales];
        const mapa = {};
        state.cabecerasOriginales.forEach((orig, idx) => {
            mapa[state.cabeceras[idx]] = orig;
        });

        todasLasVariables.forEach(varNorm => {
            const colOriginal = mapa[varNorm];
            if (colOriginal) {
                let valor = fila[colOriginal];
                if (typeof valor === 'number') {
                    valor = formatoMXN(valor);
                } else if (typeof valor === 'string' && !isNaN(parseFloat(valor))) {
                    valor = formatoMXN(parseFloat(valor));
                }
                if (valor === undefined || valor === null) valor = '';
                const regex = new RegExp(`{{${varNorm}}}`, 'g');
                mensaje = mensaje.replace(regex, valor);
            }
        });
        return mensaje;
    }

    function mostrarFilaActual() {
        if (!state.datos.length) return;
        const fila = state.datos[state.filaActual];
        const mensaje = aplicarPlantilla(state.plantilla, fila);
        const resumen = state.plantillaResumen ? aplicarPlantilla(state.plantillaResumen, fila) : '';

        const correo = fila[state.cabecerasOriginales[state.cabeceras.indexOf(state.variables.correo)]] || '';
        const nombre = fila[state.cabecerasOriginales[state.cabeceras.indexOf(state.variables.nombre)]] || '';

        contadorFila.textContent = `Fila ${state.filaActual + 1} de ${state.datos.length}`;
        resultadoAnterior.disabled = state.filaActual === 0;
        resultadoSiguiente.disabled = state.filaActual === state.datos.length - 1;

        let html = `
            <div><strong>📧 ${correo}</strong> (${nombre})</div>
            <div style="background:var(--bg-color); padding:0.8rem; border-radius:0.8rem; margin:0.5rem 0; white-space: pre-wrap;"><strong>Mensaje:</strong> ${mensaje}</div>
        `;

        if (state.plantillaResumen) {
            html += `
                <div style="background:var(--bg-color); padding:0.8rem; border-radius:0.8rem; margin:0.5rem 0; white-space: pre-wrap;"><strong>Resumen:</strong> ${resumen}</div>
            `;
        } else {
            html += `<p><em>No se definió plantilla de resumen.</em></p>`;
        }

        html += `
            <div class="result-actions">
                <button class="btn-sm btn-copiar" data-copiar="mensaje-actual">📋 Copiar mensaje</button>
                <button class="btn-sm btn-copiar" data-copiar="correo-actual">✉️ Copiar correo</button>
                <button class="btn-sm btn-copiar" data-copiar="resumen-actual">📝 Copiar resumen</button>
            </div>
            <textarea id="mensaje-actual" style="display:none;">${mensaje}</textarea>
            <textarea id="correo-actual" style="display:none;">${correo}</textarea>
            <textarea id="resumen-actual" style="display:none;">${resumen || ''}</textarea>
        `;

        resultadoActual.innerHTML = html;

        resultadoActual.querySelectorAll('.btn-copiar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = btn.getAttribute('data-copiar');
                const el = document.getElementById(id);
                if (el) {
                    navigator.clipboard.writeText(el.value).then(() => {
                        mostrarToast('✅ Copiado');
                    }).catch(() => mostrarToast('❌ Error'));
                }
            });
        });
    }

    // Navegación entre filas
    resultadoAnterior.addEventListener('click', () => {
        if (state.filaActual > 0) {
            state.filaActual--;
            mostrarFilaActual();
        }
    });
    resultadoSiguiente.addEventListener('click', () => {
        if (state.filaActual < state.datos.length - 1) {
            state.filaActual++;
            mostrarFilaActual();
        }
    });

    step4Prev.addEventListener('click', () => goToStep(3));

    // Botón reiniciar
    reiniciarBtn.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres reiniciar todo? Se perderán los datos cargados.')) {
            state = {
                variables: { correo: 'correo', nombre: 'nombre', adicionales: [] },
                plantilla: '',
                plantillaResumen: '',
                datos: [],
                cabeceras: [],
                cabecerasOriginales: [],
                filaActual: 0
            };
            varCorreo.value = 'correo';
            varNombre.value = 'nombre';
            contenedorAdicionales.innerHTML = '';
            plantillaTextarea.value = '';
            plantillaResumenTextarea.value = '';
            habilitarResumenCheck.checked = false;
            resumenContainer.style.display = 'none';
            fileInput.value = '';
            previewContainer.style.display = 'none';
            step3Next.disabled = true;
            goToStep(1);
            actualizarChecklistVariables();
            mostrarToast('🔄 Todo reiniciado');
        }
    });

    // Botón de información de bienvenida
    const btnInfo = document.getElementById('btn-info');
    const infoPanel = document.getElementById('info-panel');
    const btnEntendido = document.getElementById('btn-entendido');

    if (btnInfo && infoPanel && btnEntendido) {
        btnInfo.addEventListener('click', () => {
            infoPanel.classList.toggle('hidden');
        });
        btnEntendido.addEventListener('click', () => {
            infoPanel.classList.add('hidden');
        });
    }

    // Inicializar
    actualizarChecklistVariables();

    // Botón sugerencia (actualiza con tu número real)
    document.getElementById('sugerencia-btn').addEventListener('click', () => {
        window.open('https://wa.me/521234567890?text=Hola%20equipo%20CobraBien,%20quiero%20enviarles%20una%20sugerencia%20sobre%20el%20generador%20de%20mensajes:', '_blank');
    });

})();
