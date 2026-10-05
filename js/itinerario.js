/* ==========================================================================
   ITINERARIO Y "INCLUYE"
   Se arman automáticamente a partir de la ruta del paquete (data.js).
   ========================================================================== */

const HOTEL_POR_CATEGORIA = {
  'Económico': '3 estrellas',
  'Clásico': '4 estrellas',
  'Premium': '4 y 5 estrellas',
};

const DIA_LIBRE = {
  titulo: 'Día libre',
  texto: 'Tiempo libre para explorar a tu ritmo o sumar excursiones opcionales.',
};

// Lo que NO incluye ningún paquete.
const NO_INCLUYE = [
  'Almuerzos y cenas no indicados en el itinerario',
  'Propinas y gastos personales',
  'Seguro de asistencia médica (recomendado)',
  'Visas o permisos de ingreso, si aplican',
  'Excursiones marcadas como opcionales',
];


/* ---------- Itinerario día por día ---------- */

function crearItinerario(paquete, origen, fecha) {
  const vuelo = infoVuelo(paquete, origen, fecha);
  const dias = [];
  let numeroDia = 1;
  let ciudadAnterior = '';

  paquete.ruta.forEach((tramo, indiceTramo) => {
    const ciudad = CIUDADES[tramo.ciudad];
    let siguienteActividad = 0;

    // Toma la siguiente actividad de la ciudad; si ya no hay, usa "día libre".
    const tomarActividad = () => ciudad.actividades[siguienteActividad++] || DIA_LIBRE;

    for (let noche = 0; noche < tramo.noches; noche++) {
      const esPrimerDia = indiceTramo === 0 && noche === 0;
      const esLlegadaACiudad = noche === 0;
      let titulo;
      let texto;

      if (esPrimerDia) {
        titulo = vuelo.sinVuelo ? `Llegada a ${ciudad.nombre}` : `Vuelo y llegada a ${ciudad.nombre}`;
        texto = vuelo.sinVuelo
          ? 'Recepción y traslado al hotel. Resto del día libre para descansar y dar un primer paseo.'
          : `Vuelo ${ORIGENES[origen].nombre} – ${ciudad.nombre} con ${vuelo.aerolinea} (${vuelo.ida.salida}). Recepción en el aeropuerto y traslado al hotel. Resto del día libre para descansar.`;
      } else if (esLlegadaACiudad) {
        const actividad = tomarActividad();
        titulo = `${ciudadAnterior} a ${ciudad.nombre}`;
        texto = `Traslado a ${ciudad.nombre} y alojamiento. ${actividad.titulo}: ${actividad.texto}`;
      } else {
        const actividad = tomarActividad();
        titulo = actividad.titulo;
        texto = actividad.texto;
      }

      dias.push({ dia: numeroDia++, ciudad: ciudad.nombre, titulo, texto });
    }
    ciudadAnterior = ciudad.nombre;
  });

  // Último día: despedida y vuelo de regreso
  dias.push({
    dia: numeroDia,
    ciudad: ciudadAnterior,
    titulo: 'Despedida y vuelo de regreso',
    texto: vuelo.sinVuelo
      ? 'Desayuno en el hotel y traslado al aeropuerto.'
      : `Desayuno en el hotel y traslado al aeropuerto para el vuelo de regreso a ${ORIGENES[origen].nombre} con ${vuelo.aerolinea} (${vuelo.regreso.salida}).`,
  });

  return dias;
}


/* ---------- Lista "Incluye" ---------- */

function crearListaIncluye(paquete, origen, fecha) {
  const vuelo = infoVuelo(paquete, origen, fecha);
  const lista = [];

  if (!vuelo.sinVuelo) {
    const cabina = busqueda.cabina !== 'eco' ? ' en cabina ' + CABINAS[busqueda.cabina].nombre : '';
    lista.push(
      `Tiquetes aéreos ida y vuelta ${origen} – ${vuelo.aeropuertoIda} / ${vuelo.aeropuertoRegreso} – ${origen} con ${vuelo.aerolinea}${cabina}`,
      busqueda.equipaje === '2'
        ? 'Equipaje de mano y 2 maletas de bodega de 23 kg'
        : 'Equipaje de mano y maleta de bodega de 23 kg',
      'Tasas aéreas e impuestos de los tiquetes',
    );
  }

  paquete.ruta.forEach((tramo) => {
    const noches = String(tramo.noches).padStart(2, '0');
    const palabra = tramo.noches > 1 ? 'noches' : 'noche';
    lista.push(`${noches} ${palabra} de alojamiento en ${CIUDADES[tramo.ciudad].nombre}`);
  });

  lista.push(
    `Hoteles de categoría ${HOTEL_POR_CATEGORIA[paquete.categoria]}`,
    'Desayuno diario en el hotel',
    'Traslados aeropuerto – hotel – aeropuerto',
  );
  if (paquete.ruta.length > 1) lista.push('Traslados entre ciudades');

  paquete.ruta.forEach((tramo) => {
    lista.push(`Visita guiada: ${CIUDADES[tramo.ciudad].lugares[0]}`);
  });

  lista.push(
    'Guía en español en las visitas indicadas',
    'Asistencia durante el viaje',
    'Impuestos hoteleros',
  );
  return lista;
}
