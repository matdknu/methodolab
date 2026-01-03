// Cargar sección "Lo último" con publicaciones e interactivos
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('lo-ultimo-container');
    if (!container) return;

    // Obtener la URL actual para excluirla
    const currentPath = window.location.pathname;
    const currentLink = currentPath.split('/').pop();

    // Interactivos disponibles
    const interactivos = [
        {
            url: "https://matdknu.shinyapps.io/interculturales/",
            title: "Estudio Longitudinal de Relaciones Interculturales",
            image: "data-visualization",
            tipo: "interactivo",
            category: "Interactivo"
        },
        {
            url: "https://matdknu.shinyapps.io/google-trends-demo/",
            title: "Google Trends: Análisis de Tendencias de Búsqueda",
            image: "data-analysis",
            tipo: "interactivo",
            category: "Interactivo"
        }
    ];

    // Cargar publicaciones
    fetch('../posts.json')
        .then(r => r.json())
        .catch(() => [])
        .then(posts => {
            // Combinar y filtrar
            const allItems = [];
            
            // Agregar publicaciones (excluir la actual)
            posts.forEach(post => {
                if (post.link && !post.link.includes(currentLink)) {
                    allItems.push({
                        ...post,
                        tipo: 'publicacion',
                        link: post.link.startsWith('http') ? post.link : '../' + post.link
                    });
                }
            });

            // Agregar interactivos
            interactivos.forEach(interactivo => {
                allItems.push({
                    ...interactivo,
                    tipo: 'interactivo'
                });
            });

            // Ordenar por fecha (más recientes primero) y tomar los primeros 6
            const sortedItems = allItems
                .sort((a, b) => {
                    if (a.date && b.date) {
                        return new Date(b.date) - new Date(a.date);
                    }
                    return 0;
                })
                .slice(0, 6);

            // Renderizar
            if (sortedItems.length === 0) {
                container.innerHTML = '<p class="no-items">No hay contenido disponible.</p>';
                return;
            }

            container.innerHTML = sortedItems.map(item => {
                const imageHTML = getImageHTML(item.image || item.image_type);
                const isInteractivo = item.tipo === 'interactivo';
                const link = isInteractivo ? item.url : item.link;
                const target = isInteractivo ? 'target="_blank" rel="noopener noreferrer"' : '';

                return `
                    <article class="lo-ultimo-item">
                        <a href="${link}" ${target} class="lo-ultimo-link">
                            <div class="lo-ultimo-image">
                                ${imageHTML}
                            </div>
                            <div class="lo-ultimo-content">
                                <span class="lo-ultimo-category">${item.category || (isInteractivo ? 'Interactivo' : '')}</span>
                                <h3 class="lo-ultimo-title">${item.title}</h3>
                                ${item.description ? `<p class="lo-ultimo-description">${item.description}</p>` : ''}
                            </div>
                        </a>
                    </article>
                `;
            }).join('');
        });
});

function getImageHTML(imageValue) {
    // Si es una ruta de imagen
    if (imageValue && (imageValue.includes('/') || /\.(png|jpg|jpeg|gif|webp)$/i.test(imageValue))) {
        return `<img src="../${imageValue}" alt="" class="post-image-real" loading="lazy">`;
    }
    // Si es un tipo de placeholder
    const imageClasses = {
        'mapa': 'image-mapa',
        'grafico': 'image-grafico',
        'datos': 'image-datos',
        'data-visualization': 'data-visualization',
        'data-analysis': 'data-analysis',
        'code-repo': 'code-repo',
        'default': 'image-placeholder'
    };
    const imageClass = imageClasses[imageValue] || imageClasses['default'];
    return `<div class="${imageClass}"></div>`;
}

