/* ==========================================================================
   LISTADO DE PAQUETES DE UN PAÍS
   ========================================================================== */

const CATEGORIAS = ['Todos', 'Económico', 'Clásico', 'Premium'];

// Parte del dibujo que se muestra en cada paquete (así no se ven todos iguales)
const ENCUADRES_LISTADO = ['0 150 300 250', '0 60 300 250', '0 170 300 250'];

// Filtro y orden elegidos en la página
let categoriaElegida = 'Todos';
let ordenElegido = 'precio';

function ordenarPaquetes(paquetes) {
  const origen = busqueda.origen;
  return paquetes.sort((a, b) => {
    if (ordenElegido === 'precio') return precioTotal(a, origen) - precioTotal(b, origen);
    if (ordenElegido === 'precio-desc') return precioTotal(b, origen) - precioTotal(a, origen);
    return a.noches - b.noches;
  });
}

function htmlPaquete(paquete, posicion, desde) {
  const origen = busqueda.origen;
  const fecha = proximaSalida(paquete, desde);
  const regreso = sumarDias(fecha, paquete.noches);
  const total = precioTotal(paquete, origen);
  const cupos = cuposDisponibles(paquete, fecha);
  const totalSalidas = salidasDelPaquete(paquete).length;
  const avisoCupos = cupos <= 5 ? ` · quedan ${cupos} cupos` : '';

  return `
    <article class="pkg">
      <div class="img">
        <span class="badge">${paquete.noches + 1} días · ${paquete.noches} noches</span>
        ${escena(paquete.pais, ENCUADRES_LISTADO[posicion % 3])}
      </div>
      <div class="body">
        <div>
          <span class="pill">Paquetes</span> <span class="pill tier-${paquete.categoria}">${paquete.categoria}</span>
          <h2>${paquete.titulo} - ${paquete.noches} Noches</h2>
        </div>
        <div class="sec">
          <h3>Descripción</h3>
          <p>${paquete.resumen} Tiquetes aéreos, alojamiento, desayunos, traslados y visitas. Descripción detallada en el itinerario. <strong>Próxima salida: ${fechaLarga(fecha)} al ${fechaLarga(regreso)}</strong></p>
        </div>
        <div class="sec"><div class="fl">${lineaDeVuelo(paquete, origen, fecha)}</div></div>
        <div class="sec dates">${ICONO_CALENDARIO}<span>Viaje desde el ${fechaCorta(fecha)} hasta el ${fechaCorta(regreso)} · ${totalSalidas} salidas disponibles${avisoCupos}</span></div>
        <div class="foot">
          <div>
            <small>Precio desde, vuelo incluido</small>
            <div class="usd">${formatearUSD(total)}</div>
            <div class="cop">${formatearCOP(total * TRM)} <small>COP / Por persona y por estadía</small></div>
          </div>
          <a class="btn big" href="#/paquete/${paquete.id}?f=${fecha}&o=${origen}&p=${busqueda.pasajeros}">Ver detalle</a>
        </div>
      </div>
    </article>`;
}

function mostrarPais(clave) {
  const pais = PAISES[clave];
  if (!pais) return mostrarInicio();

  document.title = `Paquetes a ${pais.nombre} · Rutas del Mundo`;

  const desde = busqueda.fechaSalida || HOY;
  const paquetesDelPais = PAQUETES.filter((paquete) => paquete.pais === clave);
  const visibles = ordenarPaquetes(
    paquetesDelPais.filter((paquete) => categoriaElegida === 'Todos' || paquete.categoria === categoriaElegida),
  );

  const botonesCategoria = CATEGORIAS
    .map((categoria) => `<button class="chip" data-categoria="${categoria}" aria-pressed="${categoria === categoriaElegida}">${categoria}</button>`)
    .join('');

  const cantidad = `${visibles.length} ${visibles.length === 1 ? 'paquete disponible' : 'paquetes disponibles'}`;

  app.innerHTML = `
    <a class="crumb" href="#/">‹ Todos los destinos</a>

    <div class="lhead">
      <div>
        <h1>Paquetes a ${pais.nombre}</h1>
        <p>${cantidad} · vuelos incluidos</p>
      </div>
      <div class="tools" role="group" aria-label="Filtros">
        ${botonesCategoria}
        <select id="orden" aria-label="Ordenar">
          <option value="precio">Menor precio</option>
          <option value="precio-desc">Mayor precio</option>
          <option value="noches">Menos noches</option>
        </select>
      </div>
    </div>

    <div class="search mini" role="search">
      <div class="f"><label for="origen-lista">Sales desde</label><select id="origen-lista">${opcionesOrigen(busqueda.origen)}</select></div>
      <div class="f"><label for="fecha-lista">Salidas desde el</label><input type="date" id="fecha-lista" min="${HOY}" value="${busqueda.fechaSalida}"></div>
      <button class="btn ghost" id="limpiar">Limpiar</button>
    </div>

    <section class="list">
      ${visibles.map((paquete) => htmlPaquete(paquete, paquetesDelPais.indexOf(paquete), desde)).join('') || '<p>No hay paquetes en esta categoría. Prueba con otra.</p>'}
    </section>`;

  // Eventos
  $('#orden').value = ordenElegido;
  $('#orden').onchange = (evento) => {
    ordenElegido = evento.target.value;
    mostrarPais(clave);
  };
  $('#origen-lista').onchange = (evento) => {
    busqueda.origen = evento.target.value;
    mostrarPais(clave);
  };
  $('#fecha-lista').onchange = (evento) => {
    busqueda.fechaSalida = evento.target.value;
    mostrarPais(clave);
  };
  $('#limpiar').onclick = () => {
    busqueda.fechaSalida = '';
    mostrarPais(clave);
  };
  app.querySelectorAll('.chip').forEach((boton) => {
    boton.onclick = () => {
      categoriaElegida = boton.dataset.categoria;
      mostrarPais(clave);
    };
  });
}
