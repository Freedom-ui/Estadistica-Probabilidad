
fetch("https://apidemo.geoeducacion.com.ar/api/testing/encuesta/1")
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        const estudiantes = data.data;
        const tbody = document.getElementById("tabla-estudiantes");

        estudiantes.forEach((estudiante) => {
            const fila = document.createElement("tr");

            fila.innerHTML = `
            <td>${estudiante.nombre}</td>
            <td>${estudiante.apellido}</td>
            <td>${estudiante.Edad}</td>
            <td>${estudiante.curso}</td>
            <td>${estudiante.nivel}</td>
          `;

            tbody.appendChild(fila);
        });
    })
    .catch((error) => {
        console.error("Hubo un error en la consulta:", error);
        alert(
            "Error al consultar la API. Revisá la consola para más detalles."
        );
    });
