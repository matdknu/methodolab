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
            image: "images/google_trends.png"
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
        // Si la imagen es una ruta (contiene / o termina en extensión de imagen), usar imagen real
        const isRealImage = interactivo.image && (interactivo.image.includes('/') || /\.(png|jpg|jpeg|gif|webp)$/i.test(interactivo.image));
        const imageHTML = isRealImage 
            ? `<img src="${interactivo.image}" alt="${interactivo.title}" class="post-image-real" loading="lazy">`
            : `<div class="${interactivo.image}"></div>`;
        
        return `
            <article class="interactivo-item-todas">
                <a href="${interactivo.url}" target="_blank" rel="noopener noreferrer">
                    <div class="interactivo-image">
                        ${imageHTML}
                    </div>
                    <h3>${interactivo.title}</h3>
                </a>
            </article>
        `;
    }).join('');
}



