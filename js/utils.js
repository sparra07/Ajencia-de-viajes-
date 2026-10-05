/* ==========================================================================
   UTILIDADES: atajos, formato de dinero y fechas, iconos
   ========================================================================== */

// Atajo para buscar un elemento de la página, y contenedor principal.
const $ = (selector) => document.querySelector(selector);
const app = $('#app');


/* ---------- Dinero ---------- */

// 1683 -> "$1,683.00 USD"
function formatearUSD(valor) {
  const numero = valor.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return '$' + numero + ' USD';
}

// 5509283.67 -> "$5.509.283,67"
function formatearCOP(valor) {
  const numero = valor.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return '$' + numero;
}


/* ---------- Fechas (siempre en formato "2027-03-14") ---------- */

// Suma (o resta) días a una fecha.
function sumarDias(fechaISO, dias) {
  const fecha = new Date(fechaISO + 'T00:00:00Z');
  fecha.setUTCDate(fecha.getUTCDate() + dias);
  return fecha.toISOString().slice(0, 10);
}

// "2027-03-14" -> "14/03/2027"
function fechaCorta(fechaISO) {
  const [anio, mes, dia] = fechaISO.split('-');
  return `${dia}/${mes}/${anio}`;
}

// "2027-03-14" -> "14 de marzo de 2027"
function fechaLarga(fechaISO) {
  return new Date(fechaISO + 'T00:00:00Z').toLocaleDateString('es-CO', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  });
}

// "2027-03-14" -> "14 mar 2027"
function fechaMedia(fechaISO) {
  return new Date(fechaISO + 'T00:00:00Z').toLocaleDateString('es-CO', {
    day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
  });
}

// Diferencia en días entre dos fechas (a - b).
function diferenciaDias(a, b) {
  return Math.round((Date.parse(a) - Date.parse(b)) / 86400000);
}


/* ---------- Número "aleatorio" que siempre da lo mismo para el mismo texto ----------
   Se usa para generar horarios y cupos de ejemplo que no cambian al recargar. */
function hash(texto) {
  let resultado = 7;
  for (const caracter of texto) {
    resultado = (resultado * 31 + caracter.charCodeAt(0)) >>> 0;
  }
  return resultado;
}


/* ---------- Iconos ---------- */

const ICONO_CALENDARIO = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="12" height="11" rx="2"/><path d="M2 7h12M5 1.5v3M11 1.5v3"/></svg>`;
const ICONO_AVION = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/></svg>`;
const ICONO_USUARIO = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="5" r="3"/><path d="M2.5 14c.6-3 3-4.5 5.5-4.5s4.9 1.5 5.5 4.5"/></svg>`;
const ICONO_RELOJ = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 4.5V8l2.5 1.5"/></svg>`;
const ICONO_ASIENTO = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 2v7h6l2 5M5 9l-1 5h5"/></svg>`;
const ICONO_MALETA = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="10" height="8" rx="1.5"/><path d="M6 5V3h4v2"/></svg>`;
