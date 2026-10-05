/* ==========================================================================
   ILUSTRACIONES (respaldo cuando no hay foto real)
   Cada país tiene un dibujo SVG. Si en photos.js pones una foto, la foto
   se muestra encima y la ilustración queda oculta.
   ========================================================================== */

// Contador para que cada degradado SVG tenga un id único en la página.
let contadorIds = 0;


/* ---------- Un dibujo por país ---------- */

function dibujarItalia(id) {
  // Arcos del Coliseo: 3 pisos de 9 arcos
  let arcos = '';
  for (let piso = 0; piso < 3; piso++) {
    for (let i = 0; i < 9; i++) {
      const x = 42 + i * 24;
      const y = 282 + piso * 32;
      arcos += `<path d="M${x} ${y + 22}V${y + 8}a7 7 0 0 1 14 0V${y + 22}Z" fill="#6E3F2B"/>`;
    }
  }

  return `
    <defs>
      <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#27507F"/>
        <stop offset="1" stop-color="#F2A65A"/>
      </linearGradient>
    </defs>
    <rect width="300" height="420" fill="url(#${id})"/>
    <circle cx="225" cy="235" r="40" fill="#FFD7A0" opacity=".9"/>
    <path d="M0 300Q80 262 150 292T300 282V420H0Z" fill="#8C6A5A" opacity=".65"/>
    <path d="M30 380V292Q30 268 62 264L238 264Q270 268 270 292V380Z" fill="#C98B5E"/>
    <path d="M205 262L238 262Q270 268 270 292V300L240 300Z" fill="#E1A77A" opacity=".5"/>
    ${arcos}
    <rect y="380" width="300" height="40" fill="#2E2A24"/>
    <ellipse cx="16" cy="355" rx="9" ry="40" fill="#1F3B2A"/>
    <ellipse cx="288" cy="360" rx="9" ry="36" fill="#1F3B2A"/>
    <ellipse cx="274" cy="368" rx="7" ry="26" fill="#27492F"/>`;
}

function dibujarFrancia(id) {
  // Ventanas iluminadas de los edificios a los lados de la torre
  let ventanas = '';
  for (let lado = 0; lado < 2; lado++) {
    for (let fila = 0; fila < 6; fila++) {
      for (let columna = 0; columna < 3; columna++) {
        const x = (lado ? 226 : 12) + columna * 20;
        const y = 312 + fila * 16;
        const opacidad = (fila * columna + lado) % 3 ? 0.85 : 0.35;
        ventanas += `<rect x="${x}" y="${y}" width="8" height="10" fill="#FFD98A" opacity="${opacidad}"/>`;
      }
    }
  }

  return `
    <defs>
      <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2A2F6B"/>
        <stop offset="1" stop-color="#F4A9A0"/>
      </linearGradient>
    </defs>
    <rect width="300" height="420" fill="url(#${id})"/>
    <circle cx="62" cy="96" r="18" fill="#FFE9C7" opacity=".85"/>
    <rect x="0" y="300" width="84" height="120" fill="#3A3566"/>
    <rect x="216" y="300" width="84" height="120" fill="#3A3566"/>
    <path d="M0 300L42 280L84 300Z" fill="#2B2752"/>
    <path d="M216 300L258 280L300 300Z" fill="#2B2752"/>
    ${ventanas}
    <path d="M148 58L152 58L156 120L162 120L166 200L172 200L200 392L180 392L170 330Q150 298 130 330L120 392L100 392L128 200L134 200L138 120L144 120Z" fill="#17142F"/>
    <rect x="139" y="118" width="22" height="5" fill="#17142F"/>
    <rect x="126" y="198" width="48" height="6" fill="#17142F"/>
    <rect y="392" width="300" height="28" fill="#1B1F4F"/>
    <path d="M0 402H300" stroke="#F4A9A0" stroke-opacity=".35"/>`;
}

function dibujarColombia(id) {
  // Casas coloniales de colores (Cartagena)
  const colores = ['#F2B134', '#E4572E', '#2E9CCA', '#F28AB2', '#7BC47F', '#F6D55C', '#9B6FD1'];
  let casas = '';
  let x = -10;
  for (let i = 0; x < 310; i++) {
    const ancho = 46 + (i * 13) % 20;
    const alto = 95 + (i * 29) % 45;
    const y = 345 - alto;
    casas += `<rect x="${x}" y="${y}" width="${ancho}" height="${alto}" fill="${colores[i % 7]}"/>`;
    casas += `<rect x="${x + ancho / 2 - 6}" y="${345 - 30}" width="12" height="30" fill="#00000030"/>`;
    casas += `<rect x="${x}" y="${y + alto * 0.45}" width="${ancho}" height="4" fill="#5B3A1E" opacity=".7"/>`;
    casas += `<rect x="${x + 6}" y="${y + 14}" width="10" height="16" fill="#00000030"/>`;
    casas += `<rect x="${x + ancho - 16}" y="${y + 14}" width="10" height="16" fill="#00000030"/>`;
    x += ancho;
  }

  // Hojas de la palmera
  const angulos = [-160, -120, -80, -40, 0, 25];
  const hojas = angulos
    .map((a) => `<ellipse cx="0" cy="0" rx="26" ry="6" transform="rotate(${a}) translate(22 0)" fill="#1F7A3E"/>`)
    .join('');

  return `
    <defs>
      <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1D86C8"/>
        <stop offset="1" stop-color="#9AD9EA"/>
      </linearGradient>
    </defs>
    <rect width="300" height="420" fill="url(#${id})"/>
    <ellipse cx="70" cy="90" rx="38" ry="10" fill="#fff" opacity=".7"/>
    <ellipse cx="240" cy="130" rx="30" ry="8" fill="#fff" opacity=".6"/>
    ${casas}
    <rect x="124" y="150" width="36" height="195" fill="#F2D7A0"/>
    <path d="M120 150Q142 110 164 150Z" fill="#C8553D"/>
    <circle cx="142" cy="190" r="11" fill="#fff" stroke="#8A6A3A" stroke-width="3"/>
    <rect x="132" y="230" width="20" height="30" rx="10" fill="#00000030"/>
    <rect y="345" width="300" height="20" fill="#E7C98F"/>
    <rect y="365" width="300" height="55" fill="#1E9BC0"/>
    <path d="M0 385Q40 378 80 385T160 385T240 385T300 385" fill="none" stroke="#8FE0F0" stroke-width="3" opacity=".7"/>
    <path d="M34 365Q46 290 70 225" stroke="#5B3A1E" stroke-width="7" fill="none"/>
    <g transform="translate(70 225)">${hojas}</g>`;
}

function dibujarEspana(id) {
  // Torres de la Sagrada Familia
  const posicionesX = [84, 108, 132, 150, 168, 192, 216];
  const puntasY = [170, 150, 130, 95, 130, 150, 170];
  let torres = '';
  posicionesX.forEach((x, i) => {
    const punta = puntasY[i];
    torres += `<path d="M${x - 8} 300L${x - 5} ${punta + 40}L${x} ${punta}L${x + 5} ${punta + 40}L${x + 8} 300Z" fill="#3A2318"/>`;
    torres += `<ellipse cx="${x}" cy="${punta + 70}" rx="2" ry="7" fill="#F6B76A"/>`;
    torres += `<ellipse cx="${x}" cy="${punta + 110}" rx="2" ry="7" fill="#F6B76A"/>`;
  });

  return `
    <defs>
      <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#D8502B"/>
        <stop offset="1" stop-color="#F8CE72"/>
      </linearGradient>
    </defs>
    <rect width="300" height="420" fill="url(#${id})"/>
    <circle cx="66" cy="130" r="32" fill="#FFE7A6" opacity=".9"/>
    <path d="M0 330Q80 300 150 322T300 316V420H0Z" fill="#9A3A1C" opacity=".6"/>
    <rect x="70" y="296" width="160" height="96" fill="#3A2318"/>
    ${torres}
    <path d="M146 95h8M150 80v22" stroke="#3A2318" stroke-width="3"/>
    <rect x="86" y="326" width="128" height="8" fill="#F6B76A" opacity=".5"/>
    <rect y="390" width="300" height="30" fill="#241309"/>
    <path d="M250 392Q252 330 262 300" stroke="#241309" stroke-width="5" fill="none"/>
    <ellipse cx="262" cy="298" rx="20" ry="5" fill="#241309" transform="rotate(-20 262 298)"/>
    <ellipse cx="262" cy="298" rx="20" ry="5" fill="#241309" transform="rotate(25 262 298)"/>`;
}

function dibujarArgentina(id) {
  // Edificios de Buenos Aires: [x, alto, ancho]
  const edificios = [[0, 60, 50], [44, 48, 40], [86, 70, 34], [116, 52, 44], [158, 66, 38], [194, 46, 50], [240, 60, 60]];
  let bloques = '';
  edificios.forEach(([x, alto, ancho]) => {
    bloques += `<rect x="${x}" y="${390 - alto}" width="${ancho}" height="${alto}" fill="#6F8499"/>`;
  });

  return `
    <defs>
      <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2F7FC8"/>
        <stop offset="1" stop-color="#C9E8F7"/>
      </linearGradient>
    </defs>
    <rect width="300" height="420" fill="url(#${id})"/>
    <ellipse cx="220" cy="80" rx="42" ry="10" fill="#fff" opacity=".8"/>
    <ellipse cx="60" cy="120" rx="34" ry="8" fill="#fff" opacity=".7"/>
    <path d="M0 310L60 205L90 245L140 165L190 255L232 205L300 295V420H0Z" fill="#5C7AA0"/>
    <path d="M60 205L47 230L60 222L73 232Z M140 165L121 205L140 195L159 210Z M232 205L219 228L232 221L245 230Z" fill="#fff"/>
    ${bloques}
    <rect y="390" width="300" height="30" fill="#34414F"/>
    <path d="M0 405H300" stroke="#fff" stroke-dasharray="14 12" stroke-opacity=".5"/>
    <path d="M150 105L157 130L166 392L134 392L143 130Z" fill="#F1F4F6"/>
    <path d="M150 105L157 130L166 392L150 392Z" fill="#BFCBD5"/>
    <rect x="146" y="150" width="8" height="12" rx="4" fill="#4A5A68"/>`;
}

function dibujarMexico(id) {
  return `
    <defs>
      <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0E6E78"/>
        <stop offset="1" stop-color="#F5C86B"/>
      </linearGradient>
    </defs>
    <rect width="300" height="420" fill="url(#${id})"/>
    <circle cx="238" cy="120" r="26" fill="#FFF1C2" opacity=".9"/>
    <rect x="50" y="300" width="200" height="50" fill="#A5603B"/>
    <rect x="72" y="268" width="156" height="34" fill="#B76D45"/>
    <rect x="96" y="238" width="108" height="32" fill="#A5603B"/>
    <rect x="120" y="212" width="60" height="28" fill="#B76D45"/>
    <rect x="0" y="300" width="42" height="90" fill="#0A4E57"/>
    <rect x="258" y="280" width="42" height="110" fill="#0A4E57"/>
    <rect x="116" y="360" width="68" height="14" fill="#CFC4A0"/>
    <rect x="126" y="346" width="48" height="14" fill="#E4D9B4"/>
    <rect x="143" y="186" width="14" height="162" fill="#EADFB9"/>
    <rect x="137" y="178" width="26" height="10" fill="#EADFB9"/>
    <path d="M150 170L116 138L142 178Z M150 170L184 138L158 178Z" fill="#E0B33A"/>
    <circle cx="150" cy="160" r="8" fill="#E0B33A"/>
    <rect x="146" y="166" width="8" height="14" fill="#E0B33A"/>
    <rect y="374" width="300" height="46" fill="#2C2A2E"/>
    <path d="M0 398H300" stroke="#F5C86B" stroke-dasharray="16 12" stroke-opacity=".6"/>
    <rect x="26" y="330" width="6" height="46" fill="#4A3320"/>
    <circle cx="28" cy="326" r="26" fill="#8E5BB8"/>
    <circle cx="46" cy="338" r="16" fill="#A173C9"/>
    <rect x="268" y="334" width="6" height="42" fill="#4A3320"/>
    <circle cx="270" cy="328" r="24" fill="#8E5BB8"/>
    <circle cx="254" cy="340" r="15" fill="#A173C9"/>`;
}

// Relaciona la clave del país con su dibujo
const DIBUJOS = {
  it: dibujarItalia,
  fr: dibujarFrancia,
  co: dibujarColombia,
  es: dibujarEspana,
  ar: dibujarArgentina,
  mx: dibujarMexico,
};


/* ---------- Foto real (si existe en photos.js) ---------- */

function htmlFoto(clave, textoAlternativo) {
  if (!PHOTOS[clave]) return '';
  return `<img class="ph" src="${PHOTOS[clave]}" alt="${textoAlternativo || ''}" loading="lazy" onerror="this.remove()">`;
}


/* ---------- Escena de un país (portada, listado, detalle) ----------
   encuadre: parte del dibujo que se muestra (viewBox)
   clavefoto: clave en PHOTOS; por defecto la del país */

function escena(pais, encuadre = '0 0 300 420', claveFoto = pais) {
  const id = 'g' + (contadorIds++);
  return `<svg viewBox="${encuadre}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${DIBUJOS[pais](id)}</svg>${htmlFoto(claveFoto, PAISES[pais].nombre)}`;
}


/* ---------- Mosaico de una ciudad (galería del detalle) ----------
   Un degradado con los colores del país y una silueta de edificios. */

function escenaCiudad(nombre, pais, posicion, claveFoto) {
  const id = 't' + (contadorIds++);
  const [colorArriba, colorAbajo] = PAISES[pais].colores;

  let edificios = '';
  const semilla = nombre.length * 7 + posicion * 13;
  let x = 0;
  for (let k = 0; x < 300; k++) {
    const ancho = 18 + (semilla * (k + 3)) % 22;
    const alto = 26 + (semilla * (k + 5)) % 70;
    const opacidad = 0.18 + ((k * 7) % 4) * 0.07;
    edificios += `<rect x="${x}" y="${150 - alto}" width="${ancho}" height="${alto}" fill="#000" opacity="${opacidad}"/>`;
    x += ancho + 3;
  }

  // Alterna la dirección del degradado entre mosaicos
  const x1 = posicion % 2 ? '0' : '1';
  const x2 = posicion % 2 ? '1' : '0';

  return `<svg viewBox="0 0 300 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="${id}" x1="${x1}" y1="0" x2="${x2}" y2="1">
        <stop offset="0" stop-color="${colorArriba}"/>
        <stop offset="1" stop-color="${colorAbajo}"/>
      </linearGradient>
    </defs>
    <rect width="300" height="150" fill="url(#${id})"/>
    ${edificios}
  </svg>${htmlFoto(claveFoto, nombre)}`;
}


/* ---------- Fondo del banner del inicio (atardecer con avión) ---------- */

const FONDO_BANNER = `<svg class="herobg" viewBox="0 0 1200 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs>
    <linearGradient id="hb" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0B1E33"/>
      <stop offset=".6" stop-color="#2A4E73"/>
      <stop offset="1" stop-color="#C58A62"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="420" fill="url(#hb)"/>
  <ellipse cx="260" cy="300" rx="260" ry="26" fill="#fff" opacity=".07"/>
  <ellipse cx="900" cy="250" rx="320" ry="30" fill="#fff" opacity=".08"/>
  <ellipse cx="620" cy="360" rx="380" ry="24" fill="#fff" opacity=".06"/>
  <g fill="#fff" opacity=".9" transform="translate(930 70) rotate(-12) scale(2.2)">
    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" transform="rotate(90 12 12)"/>
  </g>
</svg>`;
