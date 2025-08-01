document.addEventListener("DOMContentLoaded", function () {
  const moduloSelect = document.getElementById("modulo");
  const opcionesSelect = document.getElementById("opciones");
  const errorTextarea = document.getElementById("error");
  const reportarBtn = document.querySelector("button[name='btn']");
  const cardFooter = document.querySelector(".card-footer");
   const reporteSelect = document.getElementById("reporte");
   const cerrarSesionBtn = document.getElementById('cerrarSesion');

  moduloSelect.addEventListener("change", function () {
    if (moduloSelect.value === "crm") {

  const alertaModal = new bootstrap.Modal(document.getElementById('alertaCRM'));
  alertaModal.show();


    } else {
      cardFooter.innerHTML = ""; // Limpiar si se cambia a otro módulo
    }
	
	
  });
  
  
    reporteSelect.addEventListener("change", function () {
    if (moduloSelect.value === "crm") {

  const alertaModal = new bootstrap.Modal(document.getElementById('alertaCRM'));
  alertaModal.show();


    } else {
      cardFooter.innerHTML = ""; // Limpiar si se cambia a otro módulo
    }
	
	 if (reporteSelect.value === "Capacitacion") {

  const alertaModal = new bootstrap.Modal(document.getElementById('alertaCapacitacion'));
  alertaModal.show();


    } else {
      cardFooter.innerHTML = ""; // Limpiar si se cambia a otro módulo
    }
	
  });

  reportarBtn.addEventListener("click", async  function (event) {
	  
    event.preventDefault(); 

   const modulo = moduloSelect.value;
  const accion = opcionesSelect.value;
  const error = errorTextarea.value;
  const token = localStorage.getItem('token');
 const errorFinal = reporte + " en el módulo de " + modulo + "\n" +
                   "Realizando la siguiente acción: " + accion + "\n" +
                   "Detalle del error: " + error;

  if (!token) {
    alert("No estás autenticado. Por favor inicia sesión.");
    window.location.href = "https://dvamel.github.io/GestorDeCasos/index.html";
    return;
  }

const numeroAleatorio = Math.floor(Math.random() * 10000) + 1;
const numero="SPT-" + numeroAleatorio.toString(); 
  const body = {
    tipoDeDocumentoId: 10050,
    numero: numero,
    ubicacionId: 1,
    estadoId: 126,
    fecha: "2025-07-31",
    definicionDeCasoId: 1,
    responsableActualId: 5,
    solicitanteId: 35,
    contratoId: 22,
    descripcion: `${modulo} - ${accion}`,
    medioPorElQueSeReporto: 6,
    fechaDelReporte: "2025-07-31",
    horaDelReporte: "16:30",
    causaId: 6,
    solucionId: null,
    observaciones: error,
    usuarioCreadorId: 1004,
    fechaDeCreacion: "2025-07-25",
    anulado: null,
    fechaDeAnulacion: null,
    fechaDeConsolidacion: "2025-07-25",
    anuladoPorId: null,
    ultimoMovimientoDeEstadoRealizadoId: 1031,
    modificadoPorId: 1013,
    contenido: errorFinal
  };

  try {
    const response = await fetch('https://gestordecasos-edd6a5bma9dha5bv.canadacentral-01.azurewebsites.net/api/Casos/nuevo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const msg = await response.text();
      alert(`Error al crear el caso: ${msg}`);
      return;
    }

    alert('Caso creado exitosamente : ' +numero, +'Valida por nuestro whatsapp  en que estado se encuentra +57 311 3009991. ');
	document.getElementById("modulo").value = "";
	document.getElementById("opciones").value = "";
	document.getElementById("error").value = "";
	document.getElementById("reporte").value = "";
	

  } catch (error) {
    console.error('Error al crear el caso:', error);
    alert('❌ Error al crear el caso. Consulta la consola.');
  }


  });
  
  cerrarSesionBtn.addEventListener('click', function () {
  localStorage.removeItem('token'); // Elimina el token
  window.location.href = 'https://dvamel.github.io/GestorDeCasos/index.html'; // Redirige al login
});
});
