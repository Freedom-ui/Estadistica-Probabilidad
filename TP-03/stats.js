async function obtenerEstadisticas() {
  try {
    const response = await fetch(
      "https://apidemo.geoeducacion.com.ar/api/testing/encuesta/1"
    );
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }
    const data = await response.json();
    const edades = data.data.map((est) => est.Edad).filter((e) => e != null);

    if (edades.length === 0) {
      throw new Error("No se encontraron edades válidas");
    }

    const estadisticas = calcularEstadisticas(edades);
    mostrarEstadisticas(estadisticas);
  } catch (error) {
    console.error(error);
    alert("Hubo un error al cargar los datos.");
  }
}

function calcularEstadisticas(edades) {
  const n = edades.length;
  const media = edades.reduce((acc, edad) => acc + edad, 0) / n;

  const sorted = [...edades].sort((a, b) => a - b);
  const mediana =
    n % 2 === 0
      ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
      : sorted[Math.floor(n / 2)];

  const min = Math.min(...edades);
  const max = Math.max(...edades);

  const q1 = calcularCuartil(sorted, 0.25);
  const q3 = calcularCuartil(sorted, 0.75);

  const desviacionEstandar = Math.sqrt(
    edades.reduce((acc, edad) => acc + Math.pow(edad - media, 2), 0) / n
  );

  return {
    media,
    mediana,
    min,
    max,
    q1,
    q3,
    desviacionEstandar,
  };
}

function calcularCuartil(sorted, cuartil) {
  const pos = (sorted.length - 1) * cuartil;
  const base = Math.floor(pos);
  const resto = pos - base;
  return sorted[base] + resto * (sorted[base + 1] - sorted[base]);
}

function mostrarEstadisticas(estadisticas) {
  const tbody = document.getElementById("estadisticas");
  tbody.innerHTML = `
          <tr><td>Media</td><td>${estadisticas.media.toFixed(2)}</td></tr>
          <tr><td>Mediana</td><td>${estadisticas.mediana.toFixed(2)}</td></tr>
          <tr><td>Valor Mínimo</td><td>${estadisticas.min}</td></tr>
          <tr><td>Valor Máximo</td><td>${estadisticas.max}</td></tr>
          <tr><td>Primer Cuartil (Q1)</td><td>${estadisticas.q1.toFixed(
            2
          )}</td></tr>
          <tr><td>Segundo Cuartil (Q3)</td><td>${estadisticas.q3.toFixed(
            2
          )}</td></tr>
          <tr><td>Desviación Estándar</td><td>${estadisticas.desviacionEstandar.toFixed(
            2
          )}</td></tr>
        `;
}

// Cargar las estadísticas al cargar la página
window.onload = obtenerEstadisticas;

document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("side-menu");

  toggle.addEventListener("click", function () {
    menu.classList.toggle("open");
  });
});
