const URL_API = "http://localhost:8080/premios";

const premioInput = document.getElementById("premioInput");
const agregarPremioBtn = document.getElementById("agregarPremioBtn");
const sortearBtn = document.getElementById("sortearBtn");
const mensaje = document.getElementById("mensaje");
const resultado = document.getElementById("resultado");

// POST: guardar un premio
agregarPremioBtn.addEventListener("click", function () {
  const nombre = premioInput.value.trim();

  if (nombre === "") {
    mensaje.textContent = "Escribe el nombre del premio";
    return;
  }

  fetch(URL_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre: nombre }),
  })
    .then(function (respuesta) {
      if (respuesta.ok) {
        mensaje.textContent = "Premio guardado: " + nombre;
        premioInput.value = "";
      } else {
        mensaje.textContent = "El servidor rechazó el premio";
      }
    })
    .catch(function () {
      mensaje.textContent = "No se pudo conectar con el servidor";
    });
});

// GET: pedir el premio ganador
sortearBtn.addEventListener("click", function () {
  fetch(URL_API + "/ganador")
    .then(function (respuesta) {
      if (respuesta.status === 404) {
        resultado.textContent = "No hay premios todavía. Añade alguno primero.";
        return null;
      }
      return respuesta.json();
    })
    .then(function (premio) {
      if (premio !== null) {
        resultado.textContent = "Felicidades, te ha tocado " + premio.nombre;
      }
    })
    .catch(function () {
      resultado.textContent = "No se pudo conectar con el servidor";
    });
});
