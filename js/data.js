/* ==========================================================================
   DATOS DE LA AGENCIA
   Aquí editas países, ciudades y paquetes. No hace falta tocar nada más
   para cambiar precios, noches, textos o fechas.
   ========================================================================== */

// Valor del dólar en pesos colombianos (referencial).
const TRM = 3273.5;


/* --------------------------------------------------------------------------
   PAÍSES (las 6 portadas del inicio)
   colores: degradado que se usa en las ilustraciones y en las fotos de ciudad
   -------------------------------------------------------------------------- */
const PAISES = {
  it: {
    nombre: 'Italia',
    lema: 'Roma, Florencia y Venecia',
    subtitulo: 'Arte, historia y pasta de verdad',
    colores: ['#27507F', '#F2A65A'],
  },
  fr: {
    nombre: 'Francia',
    lema: 'París y la Costa Azul',
    subtitulo: 'Museos, vino y la Torre Eiffel',
    colores: ['#2A2F6B', '#F4A9A0'],
  },
  co: {
    nombre: 'Colombia',
    lema: 'Cartagena, Café y Medellín',
    subtitulo: 'Caribe, montaña y buen sabor',
    colores: ['#1D86C8', '#9AD9EA'],
  },
  es: {
    nombre: 'España',
    lema: 'Madrid, Sevilla y Barcelona',
    subtitulo: 'Gaudí, flamenco y tapas',
    colores: ['#D8502B', '#F8CE72'],
  },
  ar: {
    nombre: 'Argentina',
    lema: 'Buenos Aires y Patagonia',
    subtitulo: 'Tango, glaciares y cataratas',
    colores: ['#2F7FC8', '#C9E8F7'],
  },
  mx: {
    nombre: 'México',
    lema: 'Ciudad de México y más',
    subtitulo: 'Cultura, historia y gastronomía',
    colores: ['#0E6E78', '#F5C86B'],
  },
};


/* --------------------------------------------------------------------------
   CIUDADES
   lugares: sitios que se visitan (pestaña "Lugares")
   actividades: una por día, en orden (alimentan el itinerario)
   -------------------------------------------------------------------------- */
const CIUDADES = {
  roma: {
    nombre: 'Roma',
    lugares: [
      'Coliseo y Foro Romano',
      'Vaticano y Capilla Sixtina',
      'Fontana de Trevi',
      'Panteón',
    ],
    actividades: [
      { titulo: 'Roma imperial', texto: 'Visita guiada al Coliseo y al Foro Romano, con ingreso incluido.' },
      { titulo: 'Vaticano', texto: 'Museos Vaticanos, Capilla Sixtina y Basílica de San Pedro con guía en español.' },
      { titulo: 'Roma a pie', texto: 'Fontana de Trevi, Plaza de España y Panteón, con tarde libre.' },
      { titulo: 'Día libre', texto: 'Tiempo para compras, gastronomía o una excursión opcional a Tívoli.' },
    ],
  },
  florencia: {
    nombre: 'Florencia',
    lugares: [
      'Duomo y Baptisterio',
      'Galería de la Academia (David)',
      'Ponte Vecchio',
      'Piazzale Michelangelo',
    ],
    actividades: [
      { titulo: 'Florencia renacentista', texto: 'Caminata guiada por el Duomo, la Piazza della Signoria y el Ponte Vecchio.' },
      { titulo: 'Arte y colinas', texto: 'Galería de la Academia y atardecer en el Piazzale Michelangelo.' },
      { titulo: 'Excursión a la Toscana', texto: 'Opcional: Siena, San Gimignano y degustación de vinos Chianti.' },
    ],
  },
  venecia: {
    nombre: 'Venecia',
    lugares: [
      'Plaza San Marcos',
      'Palacio Ducal',
      'Gran Canal',
      'Murano y Burano',
    ],
    actividades: [
      { titulo: 'Venecia clásica', texto: 'Plaza San Marcos y Palacio Ducal; paseo opcional en góndola.' },
      { titulo: 'Islas de la laguna', texto: 'Vaporetto a Murano y Burano, con taller de vidrio soplado.' },
    ],
  },
  milan: {
    nombre: 'Milán',
    lugares: [
      'Duomo de Milán',
      'Galería Vittorio Emanuele II',
      'Castillo Sforzesco',
    ],
    actividades: [
      { titulo: 'Milán esencial', texto: 'Duomo, Galería Vittorio Emanuele II y Castillo Sforzesco.' },
      { titulo: 'Lago de Como', texto: 'Excursión opcional al Lago de Como y Bellagio.' },
    ],
  },
  amalfi: {
    nombre: 'Costa Amalfitana',
    lugares: [
      'Pompeya',
      'Sorrento',
      'Positano',
      'Amalfi',
      'Capri (opcional)',
    ],
    actividades: [
      { titulo: 'Pompeya', texto: 'Visita guiada a las ruinas de Pompeya, con parada en Sorrento.' },
      { titulo: 'Costa Amalfitana', texto: 'Recorrido panorámico por Positano y Amalfi con tiempo libre.' },
      { titulo: 'Capri', texto: 'Excursión opcional en ferry a Capri y la Gruta Azul.' },
    ],
  },
  paris: {
    nombre: 'París',
    lugares: [
      'Torre Eiffel',
      'Museo del Louvre',
      'Crucero por el Sena',
      'Montmartre y Sacré-Cœur',
      'Palacio de Versalles',
    ],
    actividades: [
      { titulo: 'París esencial', texto: 'City tour por Campos Elíseos y Arco del Triunfo; subida a la Torre Eiffel.' },
      { titulo: 'Arte y río', texto: 'Museo del Louvre y crucero por el Sena.' },
      { titulo: 'Versalles', texto: 'Excursión al Palacio y los jardines de Versalles.' },
      { titulo: 'Montmartre', texto: 'Barrio de los artistas, Sacré-Cœur y tarde libre.' },
    ],
  },
  normandia: {
    nombre: 'Normandía',
    lugares: [
      'Mont Saint-Michel',
      'Playas del Desembarco',
      'Étretat',
      'Ruan',
    ],
    actividades: [
      { titulo: 'Mont Saint-Michel', texto: 'Excursión a la abadía sobre la bahía, con guía local.' },
      { titulo: 'Costa normanda', texto: 'Playas del Desembarco, acantilados de Étretat y Ruan.' },
    ],
  },
  lyon: {
    nombre: 'Lyon',
    lugares: [
      'Vieux Lyon',
      'Basílica de Fourvière',
      'Traboules',
      'Mercado Les Halles',
    ],
    actividades: [
      { titulo: 'Capital gastronómica', texto: 'Vieux Lyon, traboules y Fourvière.' },
      { titulo: 'Sabores de Lyon', texto: 'Les Halles y degustación de especialidades locales.' },
    ],
  },
  niza: {
    nombre: 'Niza',
    lugares: [
      'Paseo de los Ingleses',
      'Mónaco y Montecarlo',
      'Cannes',
      'Èze',
    ],
    actividades: [
      { titulo: 'Niza y el Paseo de los Ingleses', texto: 'Casco antiguo, colina del Castillo y playa.' },
      { titulo: 'Mónaco y Èze', texto: 'Pueblo de Èze, Montecarlo y el Palacio del Príncipe.' },
      { titulo: 'Cannes y Antibes', texto: 'Excursión a la Croisette y al puerto de Antibes.' },
    ],
  },
  cartagena: {
    nombre: 'Cartagena',
    lugares: [
      'Ciudad Amurallada',
      'Castillo San Felipe',
      'Islas del Rosario',
      'Getsemaní',
      'Torre del Reloj',
    ],
    actividades: [
      { titulo: 'Cartagena histórica', texto: 'City tour por la Ciudad Amurallada y el Castillo de San Felipe.' },
      { titulo: 'Islas del Rosario', texto: 'Día de playa en lancha, con almuerzo típico incluido.' },
      { titulo: 'Getsemaní', texto: 'Murales, plazas y atardecer sobre las murallas.' },
    ],
  },
  bogota: {
    nombre: 'Bogotá',
    lugares: [
      'La Candelaria',
      'Cerro de Monserrate',
      'Museo del Oro',
      'Catedral de Sal de Zipaquirá',
    ],
    actividades: [
      { titulo: 'Bogotá histórica', texto: 'Plaza de Bolívar, La Candelaria y Museo del Oro.' },
      { titulo: 'Monserrate y Zipaquirá', texto: 'Subida a Monserrate y Catedral de Sal.' },
    ],
  },
  eje: {
    nombre: 'Eje Cafetero',
    lugares: [
      'Valle de Cocora',
      'Salento',
      'Finca cafetera',
      'Filandia',
    ],
    actividades: [
      { titulo: 'Valle de Cocora', texto: 'Caminata entre palmas de cera, las más altas del mundo.' },
      { titulo: 'Ruta del café', texto: 'Finca cafetera, del grano a la taza, y pueblo de Salento.' },
    ],
  },
  medellin: {
    nombre: 'Medellín',
    lugares: [
      'Comuna 13',
      'Guatapé y Peñón',
      'Metrocable',
      'Parque Arví',
      'Plaza Botero',
    ],
    actividades: [
      { titulo: 'Medellín transformada', texto: 'Comuna 13, Metrocable y Plaza Botero.' },
      { titulo: 'Guatapé', texto: 'Piedra del Peñol y el pueblo de los zócalos.' },
      { titulo: 'Naturaleza y flores', texto: 'Parque Arví y tarde libre en El Poblado.' },
    ],
  },
  santamarta: {
    nombre: 'Santa Marta',
    lugares: [
      'Parque Tayrona',
      'Minca',
      'Centro histórico',
      'Playa Cristal',
    ],
    actividades: [
      { titulo: 'Parque Tayrona', texto: 'Caminata y playas del Parque Nacional Natural Tayrona.' },
      { titulo: 'Minca', texto: 'Cascadas y fincas de café en la Sierra Nevada.' },
      { titulo: 'Santa Marta', texto: 'Centro histórico y bahía; tarde libre.' },
    ],
  },
  madrid: {
    nombre: 'Madrid',
    lugares: [
      'Palacio Real',
      'Museo del Prado',
      'Plaza Mayor',
      'Parque del Retiro',
      'Toledo',
    ],
    actividades: [
      { titulo: 'Madrid imperial', texto: 'Palacio Real, Plaza Mayor y Puerta del Sol, con guía.' },
      { titulo: 'Arte', texto: 'Museo del Prado y paseo por el Parque del Retiro.' },
      { titulo: 'Toledo', texto: 'Excursión a la ciudad de las tres culturas.' },
    ],
  },
  sevilla: {
    nombre: 'Sevilla',
    lugares: [
      'Real Alcázar',
      'Catedral y Giralda',
      'Plaza de España',
      'Barrio de Santa Cruz',
    ],
    actividades: [
      { titulo: 'Sevilla monumental', texto: 'Real Alcázar, Catedral y La Giralda.' },
      { titulo: 'Triana y flamenco', texto: 'Plaza de España, barrio de Triana y espectáculo flamenco opcional.' },
    ],
  },
  granada: {
    nombre: 'Granada',
    lugares: [
      'La Alhambra',
      'Generalife',
      'Albaicín',
      'Sacromonte',
    ],
    actividades: [
      { titulo: 'La Alhambra', texto: 'Palacios Nazaríes y jardines del Generalife, con entrada incluida.' },
      { titulo: 'Albaicín', texto: 'Mirador de San Nicolás y cuevas del Sacromonte.' },
    ],
  },
  barcelona: {
    nombre: 'Barcelona',
    lugares: [
      'Sagrada Familia',
      'Parque Güell',
      'Barrio Gótico',
      'La Rambla',
      'Montjuïc',
    ],
    actividades: [
      { titulo: 'Gaudí', texto: 'Sagrada Familia y Parque Güell, con entradas incluidas.' },
      { titulo: 'Barcelona antigua', texto: 'Barrio Gótico, La Rambla y mercado de La Boquería.' },
      { titulo: 'Montserrat', texto: 'Excursión opcional al monasterio de Montserrat.' },
    ],
  },
  ba: {
    nombre: 'Buenos Aires',
    lugares: [
      'Plaza de Mayo y Casa Rosada',
      'La Boca y Caminito',
      'Recoleta',
      'San Telmo',
      'Teatro Colón',
    ],
    actividades: [
      { titulo: 'Buenos Aires clásica', texto: 'Plaza de Mayo, Recoleta, La Boca y Palermo.' },
      { titulo: 'Tango', texto: 'San Telmo y cena-show de tango.' },
      { titulo: 'Delta del Tigre', texto: 'Excursión opcional en barco por el Delta.' },
    ],
  },
  iguazu: {
    nombre: 'Cataratas del Iguazú',
    lugares: [
      'Garganta del Diablo',
      'Circuito Inferior',
      'Circuito Superior',
      'Cataratas lado brasileño',
    ],
    actividades: [
      { titulo: 'Cataratas argentinas', texto: 'Garganta del Diablo y circuitos Superior e Inferior.' },
      { titulo: 'Lado brasileño', texto: 'Vistas panorámicas desde Foz do Iguaçu (opcional).' },
    ],
  },
  calafate: {
    nombre: 'El Calafate',
    lugares: [
      'Glaciar Perito Moreno',
      'Lago Argentino',
      'Reserva Laguna Nimez',
    ],
    actividades: [
      { titulo: 'Perito Moreno', texto: 'Pasarelas frente al glaciar y navegación opcional.' },
      { titulo: 'Lago Argentino', texto: 'Estancia patagónica y tarde libre.' },
    ],
  },
  bariloche: {
    nombre: 'Bariloche',
    lugares: [
      'Circuito Chico',
      'Cerro Campanario',
      'Lago Nahuel Huapi',
      'Villa La Angostura',
    ],
    actividades: [
      { titulo: 'Circuito Chico', texto: 'Mirador del Cerro Campanario y capilla San Eduardo.' },
      { titulo: 'Siete Lagos', texto: 'Ruta de los Siete Lagos hasta San Martín de los Andes (opcional).' },
    ],
  },
  cdmx: {
    nombre: 'Ciudad de México',
    lugares: [
      'Zócalo y Catedral',
      'Pirámides de Teotihuacán',
      'Coyoacán y Casa Azul',
      'Xochimilco',
      'Bosque de Chapultepec',
    ],
    actividades: [
      { titulo: 'Centro Histórico', texto: 'Zócalo, Catedral y Palacio Nacional.' },
      { titulo: 'Teotihuacán', texto: 'Pirámides del Sol y de la Luna.' },
      { titulo: 'Coyoacán y Xochimilco', texto: 'Barrio de Frida Kahlo y paseo en trajinera.' },
    ],
  },
  puebla: {
    nombre: 'Puebla',
    lugares: [
      'Zócalo de Puebla',
      'Capilla del Rosario',
      'Cholula',
      'Barrio del Artista',
    ],
    actividades: [
      { titulo: 'Puebla y Cholula', texto: 'Centro Histórico, Capilla del Rosario y pirámide de Cholula.' },
    ],
  },
  guanajuato: {
    nombre: 'Guanajuato',
    lugares: [
      'Callejón del Beso',
      'Teatro Juárez',
      'Mirador del Pípila',
      'Museo de las Momias',
    ],
    actividades: [
      { titulo: 'Guanajuato subterránea', texto: 'Callejón del Beso, Teatro Juárez y callejoneada nocturna.' },
      { titulo: 'Mirador del Pípila', texto: 'Vista de la ciudad y Museo de las Momias.' },
    ],
  },
  sma: {
    nombre: 'San Miguel de Allende',
    lugares: [
      'Parroquia de San Miguel Arcángel',
      'Jardín Principal',
      'Fábrica La Aurora',
      'Atotonilco',
    ],
    actividades: [
      { titulo: 'San Miguel de Allende', texto: 'Parroquia, Jardín Principal y talleres de artesanos.' },
      { titulo: 'Atotonilco', texto: 'Santuario Patrimonio Mundial y tarde libre.' },
    ],
  },
  oaxaca: {
    nombre: 'Oaxaca',
    lugares: [
      'Monte Albán',
      'Hierve el Agua',
      'Mercado Benito Juárez',
      'Templo de Santo Domingo',
    ],
    actividades: [
      { titulo: 'Monte Albán', texto: 'Zona arqueológica zapoteca y centro histórico.' },
      { titulo: 'Hierve el Agua y mezcal', texto: 'Cascadas petrificadas y destilería de mezcal.' },
      { titulo: 'Cocina oaxaqueña', texto: 'Mercado y clase de cocina opcional (moles).' },
    ],
  },
  rivmaya: {
    nombre: 'Riviera Maya',
    lugares: [
      'Chichén Itzá',
      'Cenote',
      'Tulum',
      'Xcaret (opcional)',
    ],
    actividades: [
      { titulo: 'Chichén Itzá', texto: 'Pirámide de Kukulkán y cenote, con almuerzo.' },
      { titulo: 'Tulum', texto: 'Ruinas frente al mar y playa.' },
      { titulo: 'Día de playa', texto: 'Descanso en el Caribe mexicano.' },
    ],
  },
};


/* --------------------------------------------------------------------------
   PAQUETES
   pais:          clave del país (it, fr, co, es, ar, mx)
   categoria:     Económico | Clásico | Premium (define también las estrellas del hotel)
   precioUSD:     precio terrestre por persona en habitación doble, SIN vuelo
   primeraSalida: fecha base; las demás salidas se generan cada 14 días
   salidaUnica:   true si el paquete sale una sola vez (ej. fin de año)
   ruta:          ciudades en orden y noches en cada una
   -------------------------------------------------------------------------- */
const PAQUETES = [
  {
    id: 'it-1',
    pais: 'it',
    titulo: 'Italia Clásica: Roma, Florencia y Venecia',
    categoria: 'Clásico',
    precioUSD: 1890,
    primeraSalida: '2027-03-14',
    ruta: [
      { ciudad: 'roma', noches: 3 },
      { ciudad: 'florencia', noches: 2 },
      { ciudad: 'venecia', noches: 2 },
    ],
    resumen: 'Las tres ciudades imprescindibles de Italia en una sola semana.',
  },
  {
    id: 'it-2',
    pais: 'it',
    titulo: 'Roma y la Costa Amalfitana',
    categoria: 'Económico',
    precioUSD: 1540,
    primeraSalida: '2027-04-10',
    ruta: [
      { ciudad: 'roma', noches: 3 },
      { ciudad: 'amalfi', noches: 3 },
    ],
    resumen: 'Historia antigua y mar azul con base en Roma y Sorrento.',
  },
  {
    id: 'it-3',
    pais: 'it',
    titulo: 'Gran Tour de Italia: de Milán a Roma',
    categoria: 'Premium',
    precioUSD: 2980,
    primeraSalida: '2027-05-22',
    ruta: [
      { ciudad: 'milan', noches: 2 },
      { ciudad: 'venecia', noches: 2 },
      { ciudad: 'florencia', noches: 2 },
      { ciudad: 'roma', noches: 4 },
    ],
    resumen: 'Diez noches de norte a sur, con hoteles de categoría superior.',
  },
  {
    id: 'fr-1',
    pais: 'fr',
    titulo: 'París Romántico',
    categoria: 'Económico',
    precioUSD: 1420,
    primeraSalida: '2027-03-06',
    ruta: [
      { ciudad: 'paris', noches: 5 },
    ],
    resumen: 'Cinco noches para conocer París sin prisa.',
  },
  {
    id: 'fr-2',
    pais: 'fr',
    titulo: 'Francia Clásica: París y Normandía',
    categoria: 'Clásico',
    precioUSD: 1780,
    primeraSalida: '2027-04-17',
    ruta: [
      { ciudad: 'paris', noches: 4 },
      { ciudad: 'normandia', noches: 2 },
    ],
    resumen: 'La capital del arte y el Mont Saint-Michel.',
  },
  {
    id: 'fr-3',
    pais: 'fr',
    titulo: 'Francia Completa: París, Lyon y Costa Azul',
    categoria: 'Premium',
    precioUSD: 2650,
    primeraSalida: '2027-06-05',
    ruta: [
      { ciudad: 'paris', noches: 4 },
      { ciudad: 'lyon', noches: 2 },
      { ciudad: 'niza', noches: 3 },
    ],
    resumen: 'De la Torre Eiffel a las playas de la Riviera Francesa.',
  },
  {
    id: 'co-1',
    pais: 'co',
    titulo: 'Cartagena Mágica',
    categoria: 'Económico',
    precioUSD: 620,
    primeraSalida: '2026-11-14',
    ruta: [
      { ciudad: 'cartagena', noches: 4 },
    ],
    resumen: 'Murallas, islas y atardeceres en el Caribe colombiano.',
  },
  {
    id: 'co-2',
    pais: 'co',
    titulo: 'Colombia Esencial: Bogotá, Eje Cafetero y Cartagena',
    categoria: 'Clásico',
    precioUSD: 1150,
    primeraSalida: '2026-12-18',
    ruta: [
      { ciudad: 'bogota', noches: 2 },
      { ciudad: 'eje', noches: 2 },
      { ciudad: 'cartagena', noches: 3 },
    ],
    resumen: 'Capital, paisaje cafetero y Caribe en siete noches.',
  },
  {
    id: 'co-3',
    pais: 'co',
    titulo: 'Colombia Total: Medellín, Café, Tayrona y Cartagena',
    categoria: 'Premium',
    precioUSD: 1780,
    primeraSalida: '2027-01-09',
    ruta: [
      { ciudad: 'medellin', noches: 3 },
      { ciudad: 'eje', noches: 2 },
      { ciudad: 'santamarta', noches: 3 },
      { ciudad: 'cartagena', noches: 3 },
    ],
    resumen: 'El recorrido más completo del país, de la montaña al mar.',
  },
  {
    id: 'es-1',
    pais: 'es',
    titulo: 'Madrid y Toledo',
    categoria: 'Económico',
    precioUSD: 980,
    primeraSalida: '2027-02-20',
    ruta: [
      { ciudad: 'madrid', noches: 4 },
    ],
    resumen: 'Cuatro noches en la capital con excursión a Toledo.',
  },
  {
    id: 'es-2',
    pais: 'es',
    titulo: 'España Clásica: Madrid, Sevilla y Barcelona',
    categoria: 'Clásico',
    precioUSD: 1720,
    primeraSalida: '2027-03-27',
    ruta: [
      { ciudad: 'madrid', noches: 3 },
      { ciudad: 'sevilla', noches: 2 },
      { ciudad: 'barcelona', noches: 3 },
    ],
    resumen: 'Tres ciudades, tres personalidades distintas.',
  },
  {
    id: 'es-3',
    pais: 'es',
    titulo: 'Gran Tour de España: Madrid, Granada, Sevilla y Barcelona',
    categoria: 'Premium',
    precioUSD: 2150,
    primeraSalida: '2027-05-08',
    ruta: [
      { ciudad: 'madrid', noches: 2 },
      { ciudad: 'granada', noches: 2 },
      { ciudad: 'sevilla', noches: 2 },
      { ciudad: 'barcelona', noches: 3 },
    ],
    resumen: 'Del legado andalusí a la arquitectura de Gaudí.',
  },
  {
    id: 'ar-1',
    pais: 'ar',
    titulo: 'Buenos Aires Esencial',
    categoria: 'Económico',
    precioUSD: 940,
    primeraSalida: '2026-11-28',
    ruta: [
      { ciudad: 'ba', noches: 5 },
    ],
    resumen: 'Tango, parrilla y barrios con carácter propio.',
  },
  {
    id: 'ar-2',
    pais: 'ar',
    titulo: 'Buenos Aires y Cataratas del Iguazú',
    categoria: 'Clásico',
    precioUSD: 1380,
    primeraSalida: '2027-01-16',
    ruta: [
      { ciudad: 'ba', noches: 3 },
      { ciudad: 'iguazu', noches: 3 },
    ],
    resumen: 'La ciudad y una de las maravillas naturales del mundo.',
  },
  {
    id: 'ar-3',
    pais: 'ar',
    titulo: 'Argentina Gran Aventura: Buenos Aires, El Calafate y Bariloche',
    categoria: 'Premium',
    precioUSD: 2430,
    primeraSalida: '2027-02-13',
    ruta: [
      { ciudad: 'ba', noches: 3 },
      { ciudad: 'calafate', noches: 3 },
      { ciudad: 'bariloche', noches: 3 },
    ],
    resumen: 'Glaciares, lagos y montañas en la Patagonia.',
  },
  {
    id: 'mx-1',
    pais: 'mx',
    titulo: 'Ciudad de México y Teotihuacán',
    categoria: 'Económico',
    precioUSD: 890,
    primeraSalida: '2026-12-12',
    ruta: [
      { ciudad: 'cdmx', noches: 4 },
    ],
    resumen: 'Cuatro noches en la capital, con pirámides incluidas.',
  },
  {
    id: 'mx-2',
    pais: 'mx',
    titulo: 'Fin de Año en Grandes Ciudades Virreinales',
    categoria: 'Clásico',
    precioUSD: 1683,
    primeraSalida: '2026-12-26',
    salidaUnica: true,
    ruta: [
      { ciudad: 'cdmx', noches: 3 },
      { ciudad: 'puebla', noches: 1 },
      { ciudad: 'guanajuato', noches: 2 },
      { ciudad: 'sma', noches: 2 },
    ],
    resumen: 'Recibe el año en ciudades coloniales Patrimonio de la Humanidad.',
  },
  {
    id: 'mx-3',
    pais: 'mx',
    titulo: 'México Gran Tour: Ciudad de México, Oaxaca y Riviera Maya',
    categoria: 'Premium',
    precioUSD: 2290,
    primeraSalida: '2027-02-06',
    ruta: [
      { ciudad: 'cdmx', noches: 3 },
      { ciudad: 'oaxaca', noches: 3 },
      { ciudad: 'rivmaya', noches: 4 },
    ],
    resumen: 'Cultura, sabores y playas del Caribe en diez noches.',
  },
];

// Calcula las noches totales de cada paquete a partir de su ruta.
PAQUETES.forEach((paquete) => {
  paquete.noches = paquete.ruta.reduce((suma, tramo) => suma + tramo.noches, 0);
});
