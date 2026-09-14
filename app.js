// Detectar si la URL incluye el número de teléfono
const urlParams = new URLSearchParams(window.location.search);
const numeroDestino = urlParams.get('phone');

if (numeroDestino) {
    document.getElementById('p0').classList.add('hidden');
    document.getElementById('p1').classList.remove('hidden');
}

// Establecer fecha mínima
document.getElementById('fecha').min = new Date().toISOString().split('T')[0];

// Lógica para que el creador genere su enlace personalizado
function generarEnlace() {
    const numeroInput = document.getElementById('miNumero').value.trim();
    if (!numeroInput) {
        alert('Por favor ingresa tu número con código de país.');
        return;
    }

    const urlBase = window.location.origin + window.location.pathname;
    const enlaceFinal = `${urlBase}?phone=${numeroInput}`;

    document.getElementById('enlaceGenerado').value = enlaceFinal;
    document.getElementById('contenedorEnlace').classList.remove('hidden');
}

function copiarEnlace() {
    const inputEnlace = document.getElementById('enlaceGenerado');
    inputEnlace.select();
    document.execCommand('copy');
    alert('¡Enlace copiado! Ahora envíaselo a la persona que quieres invitar.');
}

// Lógica del botón "NO"
const btnNo = document.getElementById('btnNo');
const moverBoton = () => {
    const randomX = Math.random() * (window.innerWidth - 60);
    const randomY = Math.random() * (window.innerHeight - 40);
    btnNo.style.left = `${randomX}px`;
    btnNo.style.top = `${randomY}px`;
};

btnNo.addEventListener('mouseover', moverBoton);
btnNo.addEventListener('touchstart', moverBoton);

btnNo.onclick = () => {
    alert('😭💔😭');
    window.close();
};

// Navegación entre pasos
function next(currentStep) {
    if (currentStep === 2) {
        const fechaVal = document.getElementById('fecha').value;
        if (!fechaVal) {
            alert('¡Selecciona un día primero!');
            return;
        }
    }

    if (currentStep === 4) {
        const lugarVal = document.getElementById('lugar').value.trim();
        if (!lugarVal) {
            alert('¡Escribe o indica un sitio para quedar!');
            return;
        }
        generarEnlacesCalendario();
    }

    document.getElementById(`p${currentStep}`).classList.add('hidden');
    document.getElementById(`p${currentStep + 1}`).classList.remove('hidden');
}

// Enviar el resultado a WhatsApp
function enviarWhatsApp() {
    if (!numeroDestino) {
        alert('Número de destino no encontrado.');
        return;
    }

    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const plan = document.getElementById('plan').value;
    const lugar = document.getElementById('lugar').value;

    const mensaje = `¡Hola! Acepto la cita 💖%0A📅 *Fecha:* ${fecha}%0A⏰ *Hora:* ${hora}%0A🍿 *Plan:* ${plan}%0A📍 *Lugar:* ${lugar}`;
    window.open(`https://wa.me/${numeroDestino}?text=${mensaje}`, '_blank');
}

// Enlace a Google Calendar
function generarEnlacesCalendario() {
    const fechaInput = document.getElementById('fecha').value;
    const horaInput = document.getElementById('hora').value;
    const planInput = document.getElementById('plan').value;
    const lugarInput = document.getElementById('lugar').value;

    const fechaLimpia = fechaInput.replace(/-/g, '');
    const horaLimpia = horaInput.replace(/:/g, '') + '00';

    const fechaISO = `${fechaLimpia}T${horaLimpia}`;
    const tituloPlan = encodeURIComponent(planInput);
    const ubicacion = encodeURIComponent(lugarInput);

    const linkGoogle = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${tituloPlan}&dates=${fechaISO}/${fechaISO}&location=${ubicacion}`;
    document.getElementById('go').href = linkGoogle;
}