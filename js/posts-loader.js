// Cargar posts desde posts.json y renderizarlos
document.addEventListener('DOMContentLoaded', function() {
    fetch('posts.json')
        .then(response => response.json())
        .then(posts => {
            // Separar posts destacados y regulares
            const featuredPost = posts.find(post => post.featured);
            const regularPosts = posts.filter(post => !post.featured);

            // Renderizar post destacado
            if (featuredPost) {
                renderFeaturedPost(featuredPost);
            }

            // Renderizar grid de posts
            renderPostsGrid(regularPosts);
        })
        .catch(error => {
            console.error('Error cargando posts:', error);
            // Fallback: mostrar mensaje de error
            document.getElementById('articulos-container').innerHTML = 
                '<p>Error cargando publicaciones. Por favor, verifica que posts.json existe.</p>';
        });
});

function renderFeaturedPost(post) {
    const container = document.getElementById('destacado-container');
    const imageClass = getImageClass(post.image);
    
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
        container.innerHTML = '<p>No hay publicaciones disponibles.</p>';
        return;
    }

    container.innerHTML = posts.map(post => {
        const imageClass = getImageClass(post.image);
        return `
            <article class="articulo-item">
                <div class="articulo-image">
                    <div class="${imageClass}"></div>
                </div>
                <span class="articulo-category">${post.category}</span>
                <h3 class="articulo-title">
                    <a href="${post.link}">${post.title}</a>
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

