// Cargar posts desde posts.json y renderizarlos
let allPosts = [];
let currentFilter = 'todos';

document.addEventListener('DOMContentLoaded', function() {
    fetch('posts.json')
        .then(response => response.json())
        .then(posts => {
            allPosts = posts;
            
            // Separar posts destacados y regulares
            const featuredPost = posts.find(post => post.featured);
            const regularPosts = posts.filter(post => !post.featured);

            // Renderizar post destacado
            if (featuredPost) {
                renderFeaturedPost(featuredPost);
            }

            // Renderizar grid de posts
            renderPostsGrid(regularPosts);

            // Configurar filtro
            setupFilter();
        })
        .catch(error => {
            console.error('Error cargando posts:', error);
            // Fallback: mostrar mensaje de error
            document.getElementById('articulos-container').innerHTML = 
                '<p>Error cargando publicaciones. Por favor, verifica que posts.json existe.</p>';
        });
});

function setupFilter() {
    const filtroSelect = document.getElementById('filtro-tipo');
    if (filtroSelect) {
        filtroSelect.addEventListener('change', function() {
            currentFilter = this.value;
            filterPosts();
        });
    }
}

function filterPosts() {
    let filteredPosts = allPosts.filter(post => !post.featured);
    
    if (currentFilter !== 'todos') {
        filteredPosts = filteredPosts.filter(post => post.tipo === currentFilter);
    }

    // También filtrar el destacado si aplica
    const featuredPost = allPosts.find(post => post.featured);
    if (featuredPost) {
        if (currentFilter === 'todos' || featuredPost.tipo === currentFilter) {
            renderFeaturedPost(featuredPost);
            document.getElementById('destacado-container').style.display = 'block';
        } else {
            document.getElementById('destacado-container').style.display = 'none';
        }
    }

    renderPostsGrid(filteredPosts);
}

function renderFeaturedPost(post) {
    const container = document.getElementById('destacado-container');
    const imageClass = getImageClass(post.image);
    const tipoLabel = getTipoLabel(post.tipo);
    
    container.innerHTML = `
        <div class="destacado">
            <div class="destacado-content">
                <div class="destacado-image">
                    <div class="${imageClass}"></div>
                </div>
                <div class="destacado-text">
                    <span class="destacado-category">${post.category}</span>
                    <h2 class="destacado-title">
                        <a href="${post.link}">${post.title}</a>
                        ${tipoLabel}
                    </h2>
                    <p class="destacado-meta">
                        ${post.date} por <a href="${post.authorLink}">${post.author}</a>
                    </p>
                    <p class="destacado-description">
                        ${post.description}
                    </p>
                    <a href="${post.link}" class="destacado-link">Leer más →</a>
                </div>
            </div>
        </div>
    `;
}

function renderPostsGrid(posts) {
    const container = document.getElementById('articulos-container');
    
    if (posts.length === 0) {
        container.innerHTML = '<p class="no-posts">No hay publicaciones disponibles para este filtro.</p>';
        return;
    }

    container.innerHTML = posts.map(post => {
        const imageClass = getImageClass(post.image);
        const tipoLabel = getTipoLabel(post.tipo);
        return `
            <article class="articulo-item" data-tipo="${post.tipo}">
                <div class="articulo-image">
                    <div class="${imageClass}"></div>
                </div>
                <span class="articulo-category">${post.category}</span>
                <h3 class="articulo-title">
                    <a href="${post.link}">${post.title}</a>
                    ${tipoLabel}
                </h3>
                <p class="articulo-meta">
                    ${post.date} por <a href="${post.authorLink}">${post.author}</a>
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

function getTipoLabel(tipo) {
    if (!tipo) return '';
    
    const labels = {
        'difusion': '<span class="tipo-label tipo-difusion">Difusión</span>',
        'academico': '<span class="tipo-label tipo-academico">Académico</span>'
    };
    
    return labels[tipo] || '';
}
