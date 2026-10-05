/* ==========================================================================
   PÁGINA DE INICIO: buscador por fecha de vuelo + resultados + 6 destinos
   ========================================================================== */

const TIPOS_DE_BUSQUEDA = [
  ['rt', 'Ida y regreso'],
  ['one', 'Solo ida'],
  ['multi', 'Multidestino'],
];

const HORARIOS = [
  ['', 'Sin preferencia'],
  ['m', 'Mañana'],
  ['t', 'Tarde'],
  ['n', 'Noche'],
];

const OPCIONES_FLEXIBILIDAD = [
  [0, 'Fecha exacta'],
  [3, 'Fechas ± 3 días'],
  [7, 'Fechas ± 7 días'],
  [15, 'Fechas ± 15 días'],
];

// m = mañana (antes de las 12), t = tarde (12 a 18), n = noche (después de las 18)
function parteDelDia(hora) {
  if (hora < '12:00') return 'm';
  if (hora < '18:00') return 't';
  return 'n';
}

function opcionesHorario(seleccionado) {
  return HORARIOS
    .map(([valor, texto]) => `<option value="${valor}" ${valor === seleccionado ? 'selected' : ''}>${texto}</option>`)
    .join('');
}


/* ---------- Dibujo de la página ---------- */

function htmlBuscador() {
  const b = busqueda;
  const soloIda = b.tipo === 'one';

  const radios = TIPOS_DE_BUSQUEDA.map(([valor, texto]) => `
    <label><input type="radio" name="tipo" value="${valor}" ${b.tipo === valor ? 'checked' : ''}> ${texto}</label>`).join('');

  const opcionesDestino = Object.entries(PAISES)
    .map(([clave, pais]) => `<option value="${clave}" ${clave === b.destino ? 'selected' : ''}>${pais.nombre}</option>`)
    .join('');

  const opcionesPasajeros = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    .map((n) => `<option value="${n}" ${n === b.pasajeros ? 'selected' : ''}>${n} ${n === 1 ? 'pasajero' : 'pasajeros'}</option>`)
    .join('');

  const opcionesCabina = Object.entries(CABINAS)
    .map(([clave, cabina]) => `<option value="${clave}" ${clave === b.cabina ? 'selected' : ''}>${clave === 'eco' ? 'Todas las clases' : cabina.nombre}</option>`)
    .join('');

  const opcionesFlexibilidad = OPCIONES_FLEXIBILIDAD
    .map(([valor, texto]) => `<option value="${valor}" ${valor === b.flexibilidad ? 'selected' : ''}>${texto}</option>`)
    .join('');

  return `
  <section class="hero">${FONDO_BANNER}
    <div class="heroin">
      <h1>Viajes con vuelo incluido, buscados por fecha</h1>
      <div class="sp" role="search">

        <div class="radios" role="radiogroup" aria-label="Tipo de búsqueda">${radios}</div>

        <div class="sgrid">

          <div class="od">
            <div>
              <label class="sr" for="origen">Origen</label>
              <select id="origen" class="${b.origen ? '' : 'empty'}">
                <option value="" disabled ${b.origen ? '' : 'selected'}>Origen</option>
                ${opcionesOrigen(b.origen)}
              </select>
            </div>
            <span class="swap" aria-hidden="true">${ICONO_AVION}</span>
            <div>
              <label class="sr" for="destino">Destino</label>
              <select id="destino" class="${b.destino ? '' : 'empty'}">
                <option value="">Destino</option>
                ${opcionesDestino}
              </select>
            </div>
          </div>

          <div class="box">
            <small>Fechas y horarios</small>
            <div class="r2">
              <label class="ic">${ICONO_CALENDARIO}<input type="date" id="fecha-salida" aria-label="Fecha de salida" min="${HOY}" value="${b.fechaSalida}"></label>
              <label class="ic">${ICONO_CALENDARIO}<input type="date" id="fecha-regreso" aria-label="Fecha de regreso" min="${HOY}" value="${b.fechaRegreso}" ${soloIda ? 'disabled' : ''}></label>
            </div>
            <div class="r2 sep">
              <label class="ic">${ICONO_RELOJ}<select id="horario-ida" aria-label="Horario de salida">${opcionesHorario(b.horarioIda)}</select></label>
              <label class="ic">${ICONO_RELOJ}<select id="horario-regreso" aria-label="Horario de regreso" ${soloIda ? 'disabled' : ''}>${opcionesHorario(b.horarioRegreso)}</select></label>
            </div>
          </div>

          <div class="box">
            <small>Pasajeros y cabina</small>
            <div class="r2 one">
              <label class="ic">${ICONO_USUARIO}<select id="pasajeros" aria-label="Pasajeros">${opcionesPasajeros}</select></label>
            </div>
            <div class="r2 one sep">
              <label class="ic">${ICONO_ASIENTO}<select id="cabina" aria-label="Cabina">${opcionesCabina}</select></label>
            </div>
          </div>

          <button class="btn big" id="buscar">Buscar</button>
        </div>

        <div class="opts">
          <label class="ic">${ICONO_MALETA}<select id="equipaje" aria-label="Equipaje">
            <option value="1" ${b.equipaje === '1' ? 'selected' : ''}>Equipaje: maleta 23 kg incluida</option>
            <option value="2" ${b.equipaje === '2' ? 'selected' : ''}>Equipaje: añadir 2.ª maleta (+USD ${PRECIO_MALETA_EXTRA_USD})</option>
          </select></label>
          <label class="ic">${ICONO_CALENDARIO}<select id="flexibilidad" aria-label="Flexibilidad de fechas">${opcionesFlexibilidad}</select></label>
        </div>

      </div>
    </div>
  </section>`;
}

function htmlTarjetasDeDestinos() {
  const tarjetas = Object.entries(PAISES).map(([clave, pais]) => `
    <a class="dest" href="#/pais/${clave}" aria-label="Ver paquetes a ${pais.nombre}">${escena(clave)}<h2>${pais.nombre}</h2>
      <div class="cap">
        <b>${pais.lema}</b>
        <span>${pais.subtitulo} · desde USD ${precioDesdePais(clave).toLocaleString('en-US')} con vuelo</span>
        <span class="btn">Descubrir ahora</span>
      </div>
    </a>`).join('');

  return `<section class="grid" aria-label="Destinos">${tarjetas}</section>`;
}

function mostrarInicio() {
  document.title = 'Rutas del Mundo · Paquetes turísticos';

  app.innerHTML = `
    ${htmlBuscador()}
    <section id="resultados" aria-live="polite"></section>
    <h2 class="h2">O explora por destino</h2>
    ${htmlTarjetasDeDestinos()}`;

  enlazarBuscador();
  if (busqueda.buscado && busqueda.fechaSalida) mostrarResultados();
}


/* ---------- Eventos del buscador ---------- */

function enlazarBuscador() {
  const b = busqueda;

  // Vuelve a calcular los resultados si ya se había buscado una vez
  const actualizarResultados = () => {
    if (b.buscado && b.fechaSalida) mostrarResultados();
  };

  // Conecta un campo de la página con un valor de "busqueda"
  const conectar = (selector, campo, convertir = (valor) => valor) => {
    $(selector).onchange = (evento) => {
      b[campo] = convertir(evento.target.value);
      actualizarResultados();
    };
  };

  // Cambiar entre Ida y regreso / Solo ida / Multidestino redibuja el buscador
  app.querySelectorAll('input[name=tipo]').forEach((radio) => {
    radio.onchange = (evento) => {
      b.tipo = evento.target.value;
      mostrarInicio();
    };
  });

  $('#origen').onchange = (evento) => {
    b.origen = evento.target.value;
    evento.target.className = '';
    actualizarResultados();
  };

  $('#destino').onchange = (evento) => {
    b.destino = evento.target.value;
    evento.target.className = b.destino ? '' : 'empty';
    actualizarResultados();
  };

  conectar('#fecha-salida', 'fechaSalida');
  conectar('#fecha-regreso', 'fechaRegreso');
  conectar('#horario-ida', 'horarioIda');
  conectar('#horario-regreso', 'horarioRegreso');
  conectar('#pasajeros', 'pasajeros', Number);
  conectar('#cabina', 'cabina');
  conectar('#equipaje', 'equipaje');
  conectar('#flexibilidad', 'flexibilidad', Number);

  $('#buscar').onclick = () => {
    if (!b.fechaSalida) {
      $('#fecha-salida').focus();
      $('#resultados').innerHTML = '<div class="note">Elige la fecha de salida del vuelo para ver qué hay disponible.</div>';
      return;
    }
    b.buscado = true;
    mostrarResultados();
    $('#resultados').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
}


/* ---------- Resultados de la búsqueda ---------- */

function mostrarResultados() {
  const b = busqueda;

  // 1) Todas las salidas que cumplen destino, tipo y horarios (sin mirar aún la fecha)
  const candidatas = [];
  PAQUETES
    .filter((paquete) => (!b.destino || paquete.pais === b.destino) && (b.tipo !== 'multi' || paquete.ruta.length > 1))
    .forEach((paquete) => {
      salidasDelPaquete(paquete).forEach((fecha) => {
        const vuelo = infoVuelo(paquete, b.origen, fecha);
        if (!vuelo.sinVuelo) {
          if (b.horarioIda && parteDelDia(vuelo.ida.salida) !== b.horarioIda) return;
          if (b.tipo === 'rt' && b.horarioRegreso && parteDelDia(vuelo.regreso.salida) !== b.horarioRegreso) return;
        }
        candidatas.push({ paquete, fecha, diferencia: diferenciaDias(fecha, b.fechaSalida) });
      });
    });

  // 2) Se queda con las que caen dentro de la flexibilidad (y la fecha de regreso, si se puso)
  const coincideRegreso = (salida) => {
    if (!(b.tipo === 'rt' && b.fechaRegreso)) return true;
    const regreso = sumarDias(salida.fecha, salida.paquete.noches);
    return Math.abs(diferenciaDias(regreso, b.fechaRegreso)) <= b.flexibilidad;
  };

  let encontradas = candidatas.filter((salida) => Math.abs(salida.diferencia) <= b.flexibilidad && coincideRegreso(salida));
  encontradas.sort((a, c) => {
    const porFecha = Math.abs(a.diferencia) - Math.abs(c.diferencia);
    return porFecha || precioTotal(a.paquete, b.origen) - precioTotal(c.paquete, b.origen);
  });

  // 3) Si no hay nada, muestra las 6 salidas más cercanas a la fecha elegida
  let sonLasMasCercanas = false;
  if (!encontradas.length) {
    sonLasMasCercanas = true;
    encontradas = candidatas
      .slice()
      .sort((a, c) => Math.abs(a.diferencia) - Math.abs(c.diferencia))
      .slice(0, 6);
  }

  if (!encontradas.length) {
    $('#resultados').innerHTML = '<div class="note">No encontramos salidas con esos filtros. Prueba quitando la preferencia de aerolínea, escalas u horario.</div>';
    return;
  }

  // 4) Texto del encabezado
  const donde = b.destino ? PAISES[b.destino].nombre : 'todos los destinos';
  const titulo = sonLasMasCercanas
    ? 'No hay salidas en esa fecha'
    : `${encontradas.length} ${encontradas.length === 1 ? 'salida disponible' : 'salidas disponibles'}`;
  const margen = b.flexibilidad ? ` ± ${b.flexibilidad} días` : '';
  const regreso = b.tipo === 'rt' && b.fechaRegreso ? ` · regreso ${fechaLarga(b.fechaRegreso)}` : '';
  const pasajeros = `${b.pasajeros} ${b.pasajeros === 1 ? 'pasajero' : 'pasajeros'}`;
  const cabina = b.cabina !== 'eco' ? ' · ' + CABINAS[b.cabina].nombre : '';

  $('#resultados').innerHTML = `
    <div class="res-head">
      <h2>${titulo}</h2>
      <p>${fechaLarga(b.fechaSalida)}${margen}${regreso} · ${donde} · desde ${ORIGENES[b.origen].nombre} · ${pasajeros}${cabina}</p>
    </div>
    ${sonLasMasCercanas ? '<div class="note">Estas son las salidas más cercanas a tu fecha. Prueba con más flexibilidad o con otro destino.</div>' : ''}
    ${encontradas.map((salida) => htmlResultado(salida)).join('')}`;
}

function htmlResultado({ paquete, fecha, diferencia }) {
  const b = busqueda;
  const total = precioTotal(paquete, b.origen);
  const cupos = cuposDisponibles(paquete, fecha);
  const dias = Math.abs(diferencia);
  const relacion = diferencia === 0
    ? 'Mismo día'
    : `${dias} ${dias === 1 ? 'día' : 'días'} ${diferencia < 0 ? 'antes' : 'después'}`;

  return `
    <article class="hit">
      <div class="img">${escena(paquete.pais, '0 150 300 250')}</div>
      <div class="mid">
        <div><span class="pill">${PAISES[paquete.pais].nombre}</span> <span class="pill tier-${paquete.categoria}">${paquete.categoria}</span></div>
        <h3>${paquete.titulo}</h3>
        <div class="meta"><b>Vuelo ${fechaMedia(fecha)}</b> · regreso ${fechaMedia(sumarDias(fecha, paquete.noches))} · ${paquete.noches} noches · ${relacion}</div>
        <div class="fl">${lineaDeVuelo(paquete, b.origen, fecha)}</div>
        ${cupos <= 5 ? `<div class="seat">Quedan ${cupos} cupos</div>` : ''}
      </div>
      <div class="right">
        <div>
          <small>Por persona, vuelo incluido</small>
          <div class="usd">${formatearUSD(total)}</div>
          <div class="cop">${formatearCOP(total * TRM)} <small>COP</small></div>
        </div>
        <a class="btn" href="#/paquete/${paquete.id}?f=${fecha}&o=${b.origen}&p=${b.pasajeros}">Ver salida</a>
      </div>
    </article>`;
}
