/* ==========================================================================
   VUELOS, SALIDAS Y PRECIOS
   Aquí se calcula todo lo relacionado con el vuelo incluido en cada paquete.
   Los vuelos, horarios y cupos son de EJEMPLO (se generan automáticamente).
   ========================================================================== */

// "Hoy" para la demostración: no se muestran salidas anteriores a esta fecha.
const HOY = '2026-10-04';

// Ciudades desde donde puede salir el viajero. factor = ajuste de precio del vuelo.
const ORIGENES = {
  BOG: { nombre: 'Bogotá', factor: 0.95 },
  MDE: { nombre: 'Medellín', factor: 1 },
  CLO: { nombre: 'Cali', factor: 1.05 },
  CTG: { nombre: 'Cartagena', factor: 1.05 },
  BAQ: { nombre: 'Barranquilla', factor: 1.05 },
};

// Aeropuerto de cada ciudad del itinerario.
const AEROPUERTOS = {
  roma: 'FCO', florencia: 'FLR', venecia: 'VCE', milan: 'MXP', amalfi: 'NAP',
  paris: 'CDG', normandia: 'CDG', lyon: 'LYS', niza: 'NCE',
  cartagena: 'CTG', bogota: 'BOG', eje: 'PEI', medellin: 'MDE', santamarta: 'SMR',
  madrid: 'MAD', sevilla: 'SVQ', granada: 'GRX', barcelona: 'BCN',
  ba: 'EZE', iguazu: 'IGR', calafate: 'FTE', bariloche: 'BRC',
  cdmx: 'MEX', puebla: 'MEX', guanajuato: 'BJX', sma: 'BJX', oaxaca: 'OAX', rivmaya: 'CUN',
};

// Vuelo base por país: precio ida y vuelta en USD (desde Medellín), aerolínea y horas de vuelo.
const VUELOS_POR_PAIS = {
  it: { precioUSD: 790, aerolinea: 'Iberia', horas: 12.5 },
  fr: { precioUSD: 780, aerolinea: 'Air France', horas: 11 },
  co: { precioUSD: 150, aerolinea: 'Avianca', horas: 1.2 },
  es: { precioUSD: 740, aerolinea: 'Iberia', horas: 9.5 },
  ar: { precioUSD: 560, aerolinea: 'LATAM', horas: 7 },
  mx: { precioUSD: 440, aerolinea: 'Avianca', horas: 5 },
};

// Cabinas: el factor multiplica solo el precio del vuelo.
const CABINAS = {
  eco: { nombre: 'Económica', factor: 1 },
  prem: { nombre: 'Premium economy', factor: 1.35 },
  biz: { nombre: 'Business', factor: 2.4 },
};

const PRECIO_MALETA_EXTRA_USD = 90;


/* ---------- Estado de la búsqueda (lo que el usuario eligió) ---------- */
const busqueda = {
  origen: 'BOG',
  destino: '',        // '' = todos los destinos
  fechaSalida: '',
  fechaRegreso: '',
  tipo: 'rt',         // rt = ida y regreso | one = solo ida | multi = multidestino
  horarioIda: '',     // '' = sin preferencia | m = mañana | t = tarde | n = noche
  horarioRegreso: '',
  cabina: 'eco',
  equipaje: '1',      // 1 = una maleta incluida | 2 = añadir segunda maleta
  flexibilidad: 3,    // días de margen alrededor de la fecha
  pasajeros: 2,
  buscado: false,     // true después de pulsar "Buscar"
};


/* ---------- Aeropuertos de un paquete ---------- */

function primerAeropuerto(paquete) {
  return AEROPUERTOS[paquete.ruta[0].ciudad];
}

function ultimoAeropuerto(paquete) {
  return AEROPUERTOS[paquete.ruta[paquete.ruta.length - 1].ciudad];
}

function nombreCiudadInicial(paquete) {
  return CIUDADES[paquete.ruta[0].ciudad].nombre;
}


/* ---------- Precios ---------- */

// Precio del vuelo por persona. Es 0 si el viaje empieza en la ciudad de origen.
function precioVuelo(paquete, origen) {
  if (primerAeropuerto(paquete) === origen) return 0;

  const base = VUELOS_POR_PAIS[paquete.pais].precioUSD
    * ORIGENES[origen].factor
    * CABINAS[busqueda.cabina].factor;
  const maletaExtra = busqueda.equipaje === '2' ? PRECIO_MALETA_EXTRA_USD : 0;

  return Math.round(base / 10) * 10 + maletaExtra;
}

// Precio total por persona: parte terrestre + vuelo.
function precioTotal(paquete, origen) {
  return paquete.precioUSD + precioVuelo(paquete, origen);
}

// Precio más bajo de un país (para la portada).
function precioDesdePais(pais) {
  const precios = PAQUETES
    .filter((paquete) => paquete.pais === pais)
    .map((paquete) => precioTotal(paquete, busqueda.origen));
  return Math.min(...precios);
}


/* ---------- Horarios y datos del vuelo ---------- */

// Convierte minutos del día a "08:15".
function horaDesdeMinutos(minutos) {
  const dentroDelDia = ((minutos % 1440) + 1440) % 1440;
  const horas = String(Math.floor(dentroDelDia / 60)).padStart(2, '0');
  const mins = String(dentroDelDia % 60).padStart(2, '0');
  return `${horas}:${mins}`;
}

// Un tramo de vuelo: salida, llegada, si llega al día siguiente y duración.
function crearTramo(salidaEnMinutos, duracionEnMinutos) {
  const llegada = salidaEnMinutos + duracionEnMinutos;
  return {
    salida: horaDesdeMinutos(salidaEnMinutos),
    llegada: horaDesdeMinutos(llegada),
    masDias: Math.floor(llegada / 1440),
    duracion: `${Math.floor(duracionEnMinutos / 60)} h ${duracionEnMinutos % 60} min`,
  };
}

// Toda la información del vuelo de un paquete para una fecha y un origen.
function infoVuelo(paquete, origen, fecha) {
  const precio = precioVuelo(paquete, origen);
  if (!precio) return { precio: 0, sinVuelo: true };

  const config = VUELOS_POR_PAIS[paquete.pais];
  const semilla = hash(paquete.id + fecha + origen);
  const esDirecto = paquete.pais === 'co' || (origen === 'BOG' && paquete.pais !== 'it');
  const duracion = Math.round(config.horas * 60) + (esDirecto ? 0 : 150) + (semilla % 40);

  return {
    precio,
    sinVuelo: false,
    aerolinea: config.aerolinea,
    esDirecto,
    ida: crearTramo(360 + (semilla % 10) * 45, duracion),
    regreso: crearTramo(600 + (semilla % 8) * 45, duracion),
    aeropuertoIda: primerAeropuerto(paquete),
    aeropuertoRegreso: ultimoAeropuerto(paquete),
  };
}

// Texto corto del vuelo de ida, con icono (para listados y resultados).
function lineaDeVuelo(paquete, origen, fecha) {
  const vuelo = infoVuelo(paquete, origen, fecha);

  if (vuelo.sinVuelo) {
    return `${ICONO_AVION}<span>Tu viaje empieza en ${nombreCiudadInicial(paquete)}: no necesitas vuelo de ida.</span>`;
  }

  const escalas = vuelo.esDirecto ? 'Directo' : '1 escala';
  const diaSiguiente = vuelo.ida.masDias ? ' (+1)' : '';
  return `${ICONO_AVION}<span>${ORIGENES[origen].nombre} (${origen}) → ${nombreCiudadInicial(paquete)} (${vuelo.aeropuertoIda}) · ${vuelo.aerolinea} · ${escalas} · ${vuelo.ida.salida} → ${vuelo.ida.llegada}${diaSiguiente}</span>`;
}


/* ---------- Salidas disponibles ---------- */

// Cupos que quedan en una salida (0 = agotada). Valor de ejemplo.
function cuposDisponibles(paquete, fecha) {
  if (paquete.salidaUnica) return 6;
  if (hash(paquete.id + fecha) % 11 === 0) return 0;
  return 2 + (hash(paquete.id + fecha + 's') % 11);
}

// Fechas de salida de un paquete: cada 14 días, 16 salidas, sin agotadas ni pasadas.
function salidasDelPaquete(paquete) {
  if (paquete.salidaUnica) return [paquete.primeraSalida];

  // Retrocede hasta la primera salida que sea posterior a "hoy"
  let fecha = paquete.primeraSalida;
  while (sumarDias(fecha, -14) >= HOY) {
    fecha = sumarDias(fecha, -14);
  }

  const salidas = [];
  for (let i = 0; i < 16; i++) {
    if (fecha >= HOY && cuposDisponibles(paquete, fecha) > 0) salidas.push(fecha);
    fecha = sumarDias(fecha, 14);
  }
  return salidas;
}

// Primera salida igual o posterior a una fecha (o la primera disponible).
function proximaSalida(paquete, desde) {
  const salidas = salidasDelPaquete(paquete);
  return salidas.find((fecha) => fecha >= (desde || HOY)) || salidas[0];
}

// <option> de las ciudades de origen.
function opcionesOrigen(seleccionado) {
  return Object.entries(ORIGENES)
    .map(([codigo, origen]) => `<option value="${codigo}" ${codigo === seleccionado ? 'selected' : ''}>${origen.nombre} (${codigo})</option>`)
    .join('');
}
