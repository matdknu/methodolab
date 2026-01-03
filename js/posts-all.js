// Cargar TODAS las publicaciones para la página publicaciones.html
document.addEventListener('DOMContentLoaded', function() {
    // Intentar cargar desde posts.json primero
    fetch('posts.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(posts => {
            console.log('Todas las publicaciones cargadas:', posts.length);
            // Mostrar TODAS las publicaciones (incluyendo destacadas)
            renderAllPosts(posts);
        })
        .catch(error => {
            console.warn('No se pudo cargar posts.json, usando datos embebidos:', error);
            // Usar datos embebidos como respaldo
            if (typeof postsData !== 'undefined') {
                console.log('Usando postsData embebido:', postsData.length);
                // Mostrar TODAS las publicaciones (incluyendo destacadas)
                renderAllPosts(postsData);
            } else {
                console.error('No hay datos de posts disponibles');
                document.getElementById('articulos-container').innerHTML = 
                    '<p>Error cargando publicaciones. Por favor, verifica que posts.json existe.</p>';
            }
        });
});

function renderAllPosts(posts) {
    const container = document.getElementById('articulos-container');
    
    if (posts.length === 0) {
        container.innerHTML = '<p class="no-posts">No hay publicaciones disponibles.</p>';
        return;
    }

    container.innerHTML = posts.map(post => {
        const imageHTML = getImageHTML(post.image);
        const tipoLabel = getTipoLabel(post.tipo);
        return `
            <article class="articulo-item" data-tipo="${post.tipo}">
                <div class="articulo-image">
                    ${imageHTML}
                </div>
                <span class="articulo-category">${post.category}</span>
                <h3 class="articulo-title">
                    <a href="${post.link}">${post.title}</a>
                    ${tipoLabel}
                </h3>
                <p class="articulo-meta">
                    ${post.date} ${getTranslation('por')} <a href="${post.authorLink}">${post.author}</a>
                </p>
                <p class="articulo-description">
                    ${post.description}
                </p>
            </article>
        `;
    }).join('');
}

function getImageClass(imageType) {
    const imageClasses = {
        'mapa': 'image-mapa',
        'grafico': 'image-grafico',
        'datos': 'image-datos',
        'default': 'image-placeholder'
    };
    return imageClasses[imageType] || imageClasses['default'];
}

function getImageHTML(imageValue) {
    // Si es una ruta de imagen (contiene / o termina en .png, .jpg, .jpeg, .gif, .webp)
    if (imageValue && (imageValue.includes('/') || /\.(png|jpg|jpeg|gif|webp)$/i.test(imageValue))) {
        return `<img src="${imageValue}" alt="Imagen de la publicación" class="post-image-real" loading="lazy">`;
    }
    // Si no, usar el sistema de placeholders
    const imageClass = getImageClass(imageValue);
    return `<div class="${imageClass}"></div>`;
}

function getTipoLabel(tipo) {
    if (!tipo) return '';
    
    const labels = {
        'difusion': '<span class="tipo-label tipo-difusion">Difusión</span>',
        'academico': '<span class="tipo-label tipo-academico">Académico</span>'
    };
    
    return labels[tipo] || '';
}

function getTranslation(key) {
    const lang = localStorage.getItem('language') || 'es';
    if (typeof translations !== 'undefined' && translations[lang] && translations[lang][key]) {
        return translations[lang][key];
    }
    // Fallback a español
    if (translations && translations.es && translations.es[key]) {
        return translations.es[key];
    }
    return key;
}





