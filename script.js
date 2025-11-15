const sliders = document.querySelectorAll('input[type="range"][data-trait]');
const profileSummary = document.getElementById("profile-summary");
const traits = {
    oral: 20,
    esquizoide: 20,
    masoquista: 20,
    psicopatia: 20,
    rigido: 20,
};

function normalize() {
    const sum = Object.values(traits).reduce((acc, v) => acc + v, 0) || 1;
    Object.keys(traits).forEach((key) => {
        traits[key] = (traits[key] / sum) * 100;
    });
}

function updateSummary() {
    profileSummary.textContent =
        `Perfil geral: ${traits.oral.toFixed(0)}% Oral / ` +
        `${traits.esquizoide.toFixed(0)}% Esquizoide / ` +
        `${traits.masoquista.toFixed(0)}% Masoquista / ` +
        `${traits.psicopatia.toFixed(0)}% Psicopatia / ` +
        `${traits.rigido.toFixed(0)}% Rígido`;
}

sliders.forEach((slider) => {
    slider.addEventListener("input", (event) => {
        const key = event.target.dataset.trait;
        traits[key] = parseFloat(event.target.value);
        normalize();
        updateSummary();
    });
});

normalize();
updateSummary();
