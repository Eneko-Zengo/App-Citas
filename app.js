// Establecer fecha mínima para no elegir días pasados
document.getElementById('fecha').min = new Date().toISOString().split('T')[0];

// Lógica del botón invasivo "NO"
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
    // Validar fecha en el paso 2
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

// Generación de links para Google y Apple Calendar
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
    document.getElementById('ap').href = linkGoogle;
}