/* ==========================================================================
   NAVEGACIÓN
   La página usa direcciones con # para cambiar de pantalla:
     #/                              -> inicio
     #/pais/it                       -> paquetes de Italia
     #/paquete/it-1?f=2027-03-14&o=BOG&p=2  -> detalle (fecha, origen, pasajeros)
   ========================================================================== */

let rutaAnterior = '';

// mantenerScroll = true cuando solo cambian los parámetros de la misma pantalla.
function mostrarRuta(mantenerScroll) {
  const [ruta, textoParametros] = location.hash.replace(/^#\/?/, '').split('?');
  const partes = ruta.split('/');
  const parametros = Object.fromEntries(new URLSearchParams(textoParametros || ''));
  const cambioDePantalla = ruta !== rutaAnterior && !mantenerScroll;

  if (cambioDePantalla) {
    categoriaElegida = 'Todos';
    if (partes[0] === 'paquete') pestanaActiva = 0;
  }

  if (partes[0] === 'pais') mostrarPais(partes[1]);
  else if (partes[0] === 'paquete') mostrarDetalle(partes[1], parametros);
  else mostrarInicio();

  if (cambioDePantalla) window.scrollTo(0, 0);
  rutaAnterior = ruta;
}

window.addEventListener('hashchange', () => mostrarRuta());
mostrarRuta();
