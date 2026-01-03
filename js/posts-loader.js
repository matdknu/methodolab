// Cargar posts desde posts.json y renderizarlos
// Asegurar que las traducciones estén disponibles
let postsToShow = 4; // Mostrar solo 4 inicialmente
let allRegularPosts = [];

document.addEventListener('DOMContentLoaded', function() {
    // Re-renderizar posts cuando cambie el idioma
    if (typeof window.languageChangeCallback === 'undefined') {
        window.languageChangeCallback = function() {
            // Re-cargar y renderizar posts con nuevo idioma
            if (window.allPosts && window.allPosts.length > 0) {
                const featuredPost = window.allPosts.find(post => post.featured);
                const regularPosts = window.allPosts.filter(post => !post.featured);
                allRegularPosts = regularPosts;
                if (featuredPost) renderFeaturedPost(featuredPost);
                renderPostsGrid(regularPosts.slice(0, postsToShow));
                updateVerMasButton(regularPosts.length);
            }
        };
    }
    // Intentar cargar desde posts.json primero
    fetch('posts.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(posts => {
            console.log('Posts cargados desde posts.json:', posts.length);
            window.allPosts = posts;
            renderPosts(posts);
        })
        .catch(error => {
            console.warn('No se pudo cargar posts.json, usando datos embebidos:', error);
            // Usar datos embebidos como respaldo
            if (typeof postsData !== 'undefined') {
                console.log('Usando postsData embebido:', postsData.length);
                window.allPosts = postsData;
                renderPosts(postsData);
            } else {
                console.error('No hay datos de posts disponibles');
                document.getElementById('articulos-container').innerHTML = 
                    '<p>Error cargando publicaciones. Por favor, verifica que posts.json existe.</p>';
            }
        });
});

function renderPosts(posts) {
    // Separar posts destacados y regulares
    const featuredPost = posts.find(post => post.featured === true);
    const regularPosts = posts.filter(post => post.featured !== true);
    allRegularPosts = regularPosts;

    console.log('Publicación destacada:', featuredPost ? featuredPost.title : 'ninguna');
    console.log('Publicaciones regulares:', regularPosts.length);
    console.log('Mostrando en grid:', Math.min(regularPosts.length, postsToShow));

    // Renderizar post destacado
    if (featuredPost) {
        renderFeaturedPost(featuredPost);
    }

    // Renderizar solo los primeros 4 posts (sin destacados)
    const postsToDisplay = regularPosts.slice(0, postsToShow);
    renderPostsGrid(postsToDisplay);
    
    // Mostrar/ocultar botón "Ver más" (debe haber más de 4 regulares)
    updateVerMasButton(regularPosts.length);
}

function updateVerMasButton(totalPosts) {
    const verMasContainer = document.getElementById('ver-mas-container');
    
    if (totalPosts > postsToShow) {
        verMasContainer.style.display = 'block';
        // El texto se actualiza automáticamente con data-translate
    } else {
        verMasContainer.style.display = 'none';
    }
}

function renderFeaturedPost(post) {
    const container = document.getElementById('destacado-container');
    const imageHTML = getImageHTML(post.image);
    const tipoLabel = getTipoLabel(post.tipo);
    
    container.innerHTML = `
        <div class="destacado">
            <div class="destacado-content">
                <div class="destacado-image">
                    ${imageHTML}
                </div>
                <div class="destacado-text">
                    <span class="destacado-category">${post.category}</span>
                    <h2 class="destacado-title">
                        <a href="${post.link}">${post.title}</a>
                        ${tipoLabel}
                    </h2>
                    <p class="destacado-meta">
                        ${post.date} ${getTranslation('por')} <a href="${post.authorLink}">${post.author}</a>
                    </p>
                    <p class="destacado-description">
                        ${post.description}
                    </p>
                    <a href="${post.link}" class="destacado-link">${getTranslation('leerMas')}</a>
                </div>
            </div>
        </div>
    `;
}

function renderPostsGrid(posts) {
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
