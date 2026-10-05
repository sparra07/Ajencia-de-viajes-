/* ==========================================================================
   DETALLE DE UN PAQUETE
   Galería, pestañas (General / Itinerario / Lugares) y tarjeta de reserva.
   ========================================================================== */

const NOMBRES_PESTANAS = ['General', 'Itinerario', 'Lugares'];

// Parte del dibujo que se muestra en los mosaicos que no son de una ciudad
const ENCUADRES_MOSAICO = ['0 40 300 200', '0 200 300 200', '0 120 300 200', '0 0 300 200'];

let pestanaActiva = 0;


/* ---------- Bloques de HTML ---------- */

function htmlMosaico(paquete) {
  const pais = PAISES[paquete.pais];

  // Hasta 4 mosaicos: una ciudad cada uno. Si faltan, se completan con el dibujo del país.
  const mosaicos = paquete.ruta.slice(0, 4).map((tramo, i) => ({
    nombre: CIUDADES[tramo.ciudad].nombre,
    dibujo: escenaCiudad(CIUDADES[tramo.ciudad].nombre, paquete.pais, i, tramo.ciudad),
  }));
  while (mosaicos.length < 4) {
    mosaicos.push({ nombre: '', dibujo: escena(paquete.pais, ENCUADRES_MOSAICO[mosaicos.length]) });
  }

  return `
    <div class="mosaic">
      <div>${escena(paquete.pais, '0 60 300 280')}<span class="tile-name">${pais.nombre}</span></div>
      ${mosaicos.map((m) => `<div>${m.dibujo}${m.nombre ? `<span class="tile-name">${m.nombre}</span>` : ''}</div>`).join('')}
    </div>`;
}

function htmlVuelosIncluidos(paquete, origen, fecha, vuelo) {
  if (vuelo.sinVuelo) {
    return `<p>Tu viaje empieza en ${nombreCiudadInicial(paquete)}, por eso este paquete no necesita vuelo de ida.</p>`;
  }

  const regreso = sumarDias(fecha, paquete.noches);
  const escalas = vuelo.esDirecto ? 'Directo' : '1 escala';
  const ultimaCiudad = CIUDADES[paquete.ruta[paquete.ruta.length - 1].ciudad].nombre;

  return `
    <div class="flbox">
      <div class="leg">
        <span class="tag">Ida</span>
        <div class="r">${ORIGENES[origen].nombre} (${origen}) → ${nombreCiudadInicial(paquete)} (${vuelo.aeropuertoIda})<span>${fechaLarga(fecha)} · ${vuelo.aerolinea} · ${escalas} · ${vuelo.ida.duracion}</span></div>
        <div class="t">${vuelo.ida.salida} → ${vuelo.ida.llegada}${vuelo.ida.masDias ? ' (+1)' : ''}<span>Maleta 23 kg incluida</span></div>
      </div>
      <div class="leg">
        <span class="tag">Regreso</span>
        <div class="r">${ultimaCiudad} (${vuelo.aeropuertoRegreso}) → ${ORIGENES[origen].nombre} (${origen})<span>${fechaLarga(regreso)} · ${vuelo.aerolinea} · ${escalas} · ${vuelo.regreso.duracion}</span></div>
        <div class="t">${vuelo.regreso.salida} → ${vuelo.regreso.llegada}${vuelo.regreso.masDias ? ' (+1)' : ''}<span>Maleta 23 kg incluida</span></div>
      </div>
    </div>
    <p style="margin-top:10px;color:var(--muted);font-size:13.5px">Horarios de ejemplo; se confirman al emitir los tiquetes.</p>`;
}

function htmlPestanaGeneral(paquete, origen, fecha, vuelo) {
  const regreso = sumarDias(fecha, paquete.noches);

  const ruta = paquete.ruta.map((tramo) => {
    const palabra = tramo.noches > 1 ? 'noches' : 'noche';
    return `<li>${CIUDADES[tramo.ciudad].nombre} <span>· ${tramo.noches} ${palabra}</span></li>`;
  }).join('');

  const incluye = crearListaIncluye(paquete, origen, fecha).map((texto) => `<li>${texto}</li>`).join('');
  const noIncluye = NO_INCLUYE.map((texto) => `<li>${texto}</li>`).join('');

  return `
    <h3>Sobre el paquete</h3>
    <p>${paquete.resumen} Tiquetes aéreos, alojamiento, desayunos, traslados y visitas. Descripción detallada en el itinerario.</p>
    <p><strong>Salida establecida: ${fechaLarga(fecha)} al ${fechaLarga(regreso)}</strong></p>
    <ul class="route" aria-label="Ruta">${ruta}</ul>
    <h3>Vuelos incluidos</h3>${htmlVuelosIncluidos(paquete, origen, fecha, vuelo)}
    <h3>Incluye</h3><ul class="checks">${incluye}</ul>
    <h3>No incluye</h3><ul class="checks no">${noIncluye}</ul>`;
}

function htmlPestanaItinerario(paquete, origen, fecha) {
  return crearItinerario(paquete, origen, fecha).map((dia, i) => `
    <details class="day" ${i === 0 ? 'open' : ''}>
      <summary><span class="dnum">Día ${dia.dia}</span><span>${dia.titulo}<span class="dcity">${dia.ciudad} · ${fechaMedia(sumarDias(fecha, dia.dia - 1))}</span></span></summary>
      <div class="dbody">${dia.texto}</div>
    </details>`).join('');
}

function htmlPestanaLugares(paquete) {
  const grupos = paquete.ruta.map((tramo) => {
    const ciudad = CIUDADES[tramo.ciudad];
    return `<div class="place-grp"><h4>${ciudad.nombre}</h4><ul>${ciudad.lugares.map((lugar) => `<li>${lugar}</li>`).join('')}</ul></div>`;
  }).join('');

  return `<h3>Lugares que vamos a visitar</h3><div class="places">${grupos}</div>`;
}

function htmlTarjetaReserva(paquete, origen, fecha, salidas, pasajeros) {
  const regreso = sumarDias(fecha, paquete.noches);

  const opcionesFechas = salidas
    .map((salida) => `<option value="${salida}" ${salida === fecha ? 'selected' : ''}>${fechaMedia(salida)} · ${cuposDisponibles(paquete, salida)} cupos</option>`)
    .join('');

  return `
    <aside class="side" aria-label="Reserva">
      <h2>${paquete.titulo}</h2>
      <span class="pill">${paquete.noches + 1} días · ${paquete.noches} noches · vuelos incluidos</span>
      <div class="row"><label for="origen-reserva">Sales desde</label><select id="origen-reserva">${opcionesOrigen(origen)}</select></div>
      <div class="row"><label for="fecha-reserva">Fecha de vuelo</label><select id="fecha-reserva">${opcionesFechas}</select></div>
      <div class="row"><label>Regreso</label><b>${fechaCorta(regreso)}</b></div>
      <div class="row"><label for="habitacion">Habitación</label><select id="habitacion"><option value="doble">Doble</option><option value="sencilla">Sencilla (+35 %)</option></select></div>
      <div class="row"><label>Viajeros</label><div class="step"><button id="menos" aria-label="Quitar viajero">−</button><b id="cantidad">${pasajeros}</b><button id="mas" aria-label="Agregar viajero">+</button></div></div>
      <div class="total">
        <small>Precio desde, por persona, vuelo incluido</small><b>${formatearUSD(precioTotal(paquete, origen))}</b>
        <small style="margin-top:8px">Total estimado</small>
        <div class="cop" id="total-cop"></div>
        <small id="total-usd"></small>
      </div>
      <button class="btn big block" id="reservar">Solicitar reserva</button>
      <a class="wa" id="whatsapp" target="_blank" rel="noopener" href="#">Reservar por WhatsApp</a>
    </aside>`;
}


/* ---------- Página completa ---------- */

// parametros: { f: fecha de vuelo, o: origen, p: pasajeros } (vienen de la dirección)
function mostrarDetalle(idPaquete, parametros) {
  const paquete = PAQUETES.find((p) => p.id === idPaquete);
  if (!paquete) return mostrarInicio();

  const pais = PAISES[paquete.pais];
  const salidas = salidasDelPaquete(paquete);
  const origen = ORIGENES[parametros.o] ? parametros.o : busqueda.origen;
  const fecha = salidas.includes(parametros.f) ? parametros.f : proximaSalida(paquete, busqueda.fechaSalida || HOY);
  const vuelo = infoVuelo(paquete, origen, fecha);
  const pasajeros = Math.min(9, Math.max(1, +parametros.p || busqueda.pasajeros));
  const estado = { pasajeros, habitacion: 'doble' };

  document.title = `${paquete.titulo} · Rutas del Mundo`;

  const pestanas = NOMBRES_PESTANAS
    .map((nombre, i) => `<button class="tab" role="tab" id="tab-${i}" aria-controls="panel-${i}" aria-selected="${i === pestanaActiva}" data-pestana="${i}">${nombre}</button>`)
    .join('');

  app.innerHTML = `
    <a class="crumb" href="#/pais/${paquete.pais}">‹ Paquetes a ${pais.nombre}</a>
    <h1 class="dtitle">${paquete.titulo} - ${paquete.noches} Noches</h1>
    ${htmlMosaico(paquete)}

    <div class="layout">
      <div>
        <div class="tabs" role="tablist">${pestanas}</div>
        <section class="panel" id="panel-0" role="tabpanel" aria-labelledby="tab-0" ${pestanaActiva ? 'hidden' : ''}>${htmlPestanaGeneral(paquete, origen, fecha, vuelo)}</section>
        <section class="panel" id="panel-1" role="tabpanel" aria-labelledby="tab-1" ${pestanaActiva !== 1 ? 'hidden' : ''}>${htmlPestanaItinerario(paquete, origen, fecha)}</section>
        <section class="panel" id="panel-2" role="tabpanel" aria-labelledby="tab-2" ${pestanaActiva !== 2 ? 'hidden' : ''}>${htmlPestanaLugares(paquete)}</section>
      </div>
      ${htmlTarjetaReserva(paquete, origen, fecha, salidas, pasajeros)}
    </div>`;

  // Total estimado y enlace de WhatsApp (se recalculan al cambiar viajeros o habitación)
  const actualizarTotal = () => {
    const recargoSencilla = estado.habitacion === 'sencilla' ? paquete.precioUSD * 0.35 : 0;
    const totalUSD = (precioTotal(paquete, origen) + recargoSencilla) * estado.pasajeros;
    const mensaje = `Hola, quiero información del paquete "${paquete.titulo}" con vuelo el ${fechaCorta(fecha)} desde ${ORIGENES[origen].nombre} para ${estado.pasajeros} viajero(s).`;

    $('#cantidad').textContent = estado.pasajeros;
    $('#total-cop').innerHTML = `${formatearCOP(totalUSD * TRM)} <small>COP</small>`;
    $('#total-usd').textContent = formatearUSD(totalUSD);
    $('#whatsapp').href = 'https://wa.me/573000000000?text=' + encodeURIComponent(mensaje);
  };

  $('#menos').onclick = () => {
    estado.pasajeros = Math.max(1, estado.pasajeros - 1);
    actualizarTotal();
  };
  $('#mas').onclick = () => {
    estado.pasajeros = Math.min(9, estado.pasajeros + 1);
    actualizarTotal();
  };
  $('#habitacion').onchange = (evento) => {
    estado.habitacion = evento.target.value;
    actualizarTotal();
  };
  actualizarTotal();

  // Cambiar origen o fecha vuelve a dibujar la página sin crear una entrada nueva en el historial
  const cambiarSeleccion = (cambios) => {
    const nuevaFecha = cambios.fecha || fecha;
    const nuevoOrigen = cambios.origen || origen;
    history.replaceState(null, '', `#/paquete/${idPaquete}?f=${nuevaFecha}&o=${nuevoOrigen}&p=${estado.pasajeros}`);
    mostrarRuta(true);
  };
  $('#origen-reserva').onchange = (evento) => {
    busqueda.origen = evento.target.value;
    cambiarSeleccion({ origen: evento.target.value });
  };
  $('#fecha-reserva').onchange = (evento) => cambiarSeleccion({ fecha: evento.target.value });

  // Pestañas
  const botonesPestanas = [...app.querySelectorAll('.tab')];
  botonesPestanas.forEach((boton) => {
    boton.onclick = () => {
      pestanaActiva = +boton.dataset.pestana;
      botonesPestanas.forEach((otro) => {
        const activa = otro === boton;
        otro.setAttribute('aria-selected', activa);
        $('#panel-' + otro.dataset.pestana).hidden = !activa;
      });
    };
  });

  $('#reservar').onclick = () => abrirFormularioReserva(paquete, estado, origen, fecha);
}


/* ---------- Ventana "Solicitar reserva" ---------- */

function abrirFormularioReserva(paquete, estado, origen, fecha) {
  const contenido = $('#dlgBody');
  const ventana = $('#dlg');

  contenido.innerHTML = `
    <h2>Solicitar reserva</h2>
    <p>${paquete.titulo} · vuelo ${fechaCorta(fecha)} desde ${ORIGENES[origen].nombre} · ${estado.pasajeros} viajero(s)</p>
    <label for="f-nombre">Nombre completo (como en el pasaporte)</label><input id="f-nombre" autocomplete="name">
    <label for="f-telefono">Teléfono o WhatsApp</label><input id="f-telefono" type="tel" autocomplete="tel">
    <label for="f-correo">Correo electrónico</label><input id="f-correo" type="email" autocomplete="email">
    <div class="acts"><button class="btn ghost" id="cancelar">Cancelar</button><button class="btn" id="enviar">Enviar solicitud</button></div>`;

  ventana.showModal();
  $('#cancelar').onclick = () => ventana.close();

  $('#enviar').onclick = () => {
    const nombre = $('#f-nombre').value.trim();
    if (!nombre || !$('#f-telefono').value.trim()) {
      $('#f-nombre').focus();
      return;
    }
    contenido.innerHTML = `
      <h2>Solicitud lista, ${nombre.split(' ')[0]}</h2>
      <p>Esta es una versión de demostración: la solicitud todavía no se envía a un asesor. Cuando conectemos el módulo de administración, llegará a tu equipo comercial.</p>
      <div class="acts"><button class="btn" id="cerrar">Cerrar</button></div>`;
    $('#cerrar').onclick = () => ventana.close();
  };
}
