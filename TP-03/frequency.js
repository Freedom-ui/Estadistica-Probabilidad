// Función auxiliar para generar tabla de frecuencia
function generarFrecuencia(data, campo, contenedorID) {
  const conteo = {};
  data.forEach((item) => {
    const clave = item[campo];
    if (clave) {
      conteo[clave] = (conteo[clave] || 0) + 1;
    }
  });

  const total = Object.values(conteo).reduce((a, b) => a + b, 0);
  let acumulada = 0;

  const contenedor = document.getElementById(contenedorID);
  if (!contenedor) {
    console.warn(`Contenedor con id "${contenedorID}" no encontrado.`);
    return; // salir antes de hacer appendChild
  }

  Object.entries(conteo)
    .sort()
    .forEach(([clave, valor]) => {
      acumulada += valor;
      const fila = document.createElement("tr");
      fila.innerHTML = `
      <td>${clave}</td>
      <td>${valor}</td>
      <td>${acumulada}</td>
      <td>${((valor / total) * 100).toFixed(2)}%</td>
    `;
      contenedor.appendChild(fila);
    });
}

// Ejecutar al cargar si estamos en FrequencyTable.html
if (document.body.id === "FrequencyTable") {
  fetch("https://apidemo.geoeducacion.com.ar/api/testing/encuesta/1")
    .then((response) => {
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      const estudiantes = data.data;

      generarFrecuencia(estudiantes, "nivel", "frecuencia-nivel");
      generarFrecuencia(estudiantes, "curso", "frecuencia-curso");
    })
    .catch((error) => {
      console.error("Error al cargar datos de frecuencia:", error);
      alert("Hubo un error al cargar las tablas de frecuencia.");
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("side-menu");

  toggle.addEventListener("click", function () {
    menu.classList.toggle("open");
  });
});