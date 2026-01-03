// Cargar TODAS las interactivas para la página interactivos.html
document.addEventListener('DOMContentLoaded', function() {
    const interactivos = [
        {
            url: "https://matdknu.shinyapps.io/interculturales/",
            title: "Estudio Longitudinal de Relaciones Interculturales",
            image: "data-visualization"
        },
        {
            url: "https://matdknu.shinyapps.io/google-trends-demo/",
            title: "Google Trends: Análisis de Tendencias de Búsqueda",
            image: "data-analysis"
        },
        {
            url: "https://matdknu.shinyapps.io/phd_proposal/",
            title: "Social Pulse Simulation",
            image: "code-repo"
        }
    ];
    
    renderAllInteractivos(interactivos);
});

function renderAllInteractivos(interactivos) {
    const container = document.getElementById('interactivos-container-todas');
    
    if (interactivos.length === 0) {
        container.innerHTML = '<p class="no-posts">No hay interactivas disponibles.</p>';
        return;
    }

    container.innerHTML = interactivos.map(interactivo => {
        return `
            <article class="interactivo-item-todas">
                <a href="${interactivo.url}" target="_blank" rel="noopener noreferrer">
                    <div class="interactivo-image">
                        <div class="${interactivo.image}"></div>
                    </div>
                    <h3>${interactivo.title}</h3>
                </a>
            </article>
        `;
    }).join('');
}



