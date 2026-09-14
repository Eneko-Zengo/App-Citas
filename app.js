// Establecer fecha mínima para no elegir días pasados
document.getElementById('fecha').min = new Date().toISOString().split('T')[0];

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

// Navegación entre páginas
function next(currentStep) {
    if (currentStep === 2) {
        const fechaVal = document.getElementById('fecha').value;
        if (!fechaVal) {
            alert('¡Selecciona un día primero!');
            return;
        }
    }

    document.getElementById(`p${currentStep}`).classList.add('hidden');
    document.getElementById(`p${currentStep + 1}`).classList.remove('hidden');

    if (currentStep === 3) {
        generarEnlacesCalendario();
    }
}

// Obtener el número de WhatsApp desde el enlace (ej: tudominio.com/?phone=34600000000)
const urlParams = new URLSearchParams(window.location.search);
const numeroDestino = urlParams.get('phone');

function enviarWhatsApp() {
    if (!numeroDestino) {
        alert('Falta el número de teléfono en el enlace. Añade ?phone=NUMERO al final de la URL.');
        return;
    }

    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const plan = document.getElementById('plan').value;

    const mensaje = `¡Hola! Acepto la cita 💖%0A📅 *Fecha:* ${fecha}%0A⏰ *Hora:* ${hora}%0A🍿 *Plan:* ${plan}`;
    window.open(`https://wa.me/${numeroDestino}?text=${mensaje}`, '_blank');
}

// Enlace de Google Calendar
function generarEnlacesCalendario() {
    const fechaInput = document.getElementById('fecha').value;
    const horaInput = document.getElementById('hora').value;
    const planInput = document.getElementById('plan').value;

    const fechaLimpia = fechaInput.replace(/-/g, '');
    const horaLimpia = horaInput.replace(/:/g, '') + '00';

    const fechaISO = `${fechaLimpia}T${horaLimpia}`;
    const tituloPlan = encodeURIComponent(planInput);

    const linkGoogle = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${tituloPlan}&dates=${fechaISO}/${fechaISO}`;

    document.getElementById('go').href = linkGoogle;
}