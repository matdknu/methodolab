// Cargar posts desde posts.json y renderizarlos
// Asegurar que las traducciones estén disponibles
let postsToShow = 4; // Mostrar solo 4 inicialmente
let allRegularPosts = [];
let activeFilter = 'todos';

document.addEventListener('DOMContentLoaded', function() {
    // Re-renderizar posts cuando cambie el idioma
    if (typeof window.languageChangeCallback === 'undefined') {
        window.languageChangeCallback = function() {
            // Re-cargar y renderizar posts con nuevo idioma
            if (window.allPosts && window.allPosts.length > 0) {
                const orderedPosts = [...window.allPosts].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
                allRegularPosts = orderedPosts;
                renderPostsGrid(orderedPosts.slice(0, postsToShow));
                updateVerMasButton(orderedPosts.length);
            }
            
            // También actualizar posts en posts-all.js si existe
            if (typeof renderAllPosts === 'function' && window.allPosts) {
                renderAllPosts(window.allPosts);
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
    // Newsroom layout: todas las publicaciones en un solo grid.
    // Si existe una destacada, se prioriza en orden, pero mantiene el mismo estilo.
    const orderedPosts = [...posts].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
    allRegularPosts = orderedPosts;

    console.log('Publicaciones totales:', orderedPosts.length);
    console.log('Mostrando en grid:', Math.min(orderedPosts.length, postsToShow));

    // Renderizar filtros y primeros posts
    renderFiltros(orderedPosts);
    const postsToDisplay = orderedPosts.slice(0, postsToShow);
    renderPostsGrid(postsToDisplay);

    // Mostrar/ocultar botón "Ver más"
    updateVerMasButton(orderedPosts.length);
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

function renderFiltros(posts) {
    const container = document.getElementById('filtros-container');
    if (!container) return;

    const categories = [...new Set(posts.map(p => p.category).filter(Boolean))];
    const allLabel = getTranslationLocal('filtroTodos');

    container.innerHTML = ['todos', ...categories].map(cat => {
        const label = cat === 'todos' ? allLabel : getCategoryTranslationLocal(cat);
        const isActive = activeFilter === cat;
        return `<button class="filtro-btn${isActive ? ' filtro-active' : ''}" data-category="${cat}">${label}</button>`;
    }).join('');

    container.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            activeFilter = btn.dataset.category;
            container.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('filtro-active'));
            btn.classList.add('filtro-active');
            const filtered = activeFilter === 'todos'
                ? allRegularPosts
                : allRegularPosts.filter(p => p.category === activeFilter);
            renderPostsGrid(filtered.slice(0, postsToShow));
            updateVerMasButton(filtered.length);
        });
    });
}

function renderPostsGrid(posts) {
    const container = document.getElementById('articulos-container');
    
    if (posts.length === 0) {
        container.innerHTML = `<p class="no-posts">${getTranslationLocal('noPublicaciones')}</p>`;
        return;
    }

    container.innerHTML = posts.map(post => {
        const imageHTML = getImageHTML(post.image);
        const categoryText = getCategoryTranslationLocal(post.category);
        return `
            <article class="articulo-item fade-in" data-tipo="${post.tipo}" data-category="${post.category || ''}">
                <a href="${post.link}" class="articulo-card-link" tabindex="-1" aria-hidden="true">
                    <div class="articulo-image">${imageHTML}</div>
                </a>
                <div class="articulo-body">
                    <span class="articulo-category" data-tipo="${post.tipo}">${categoryText}</span>
                    <h3 class="articulo-title">
                        <a href="${post.link}">${post.title}</a>
                    </h3>
                    <p class="articulo-description">${post.description}</p>
                    <div class="articulo-footer">
                        <p class="articulo-meta">${post.date} · <a href="${post.authorLink}">${post.author}</a></p>
                        <a href="${post.link}" class="btn-leer">${getTranslationLocal('leer')}</a>
                    </div>
                </div>
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
    
    let labelText = '';
    
    if (tipo === 'difusion') {
        labelText = typeof getTranslation === 'function' ? getTranslation('tipoDifusion') : 'Difusión';
    } else if (tipo === 'academico') {
        labelText = typeof getTranslation === 'function' ? getTranslation('tipoAcademico') : 'Académico';
    }
    
    return `<span class="tipo-label tipo-${tipo}">${labelText}</span>`;
}

// Usar función global si está disponible, sino usar función local
const getCategoryTranslationLocal = function(category) {
    if (typeof getCategoryTranslation === 'function') {
        return getCategoryTranslation(category);
    }
    // Fallback local
    const categoryMap = {
        'educación': 'educación',
        'educacion': 'educación',
        'metodología': 'metodología',
        'metodologia': 'metodología',
        'género': 'género',
        'genero': 'género',
        'nacional': 'nacional',
        'elecciones': 'elecciones'
    };
    return categoryMap[category] || category;
};

// Usar función global si está disponible
const getTranslationLocal = function(key) {
    if (typeof getTranslation === 'function') {
        return getTranslation(key);
    }
    // Fallback local
    const lang = localStorage.getItem('language') || 'es';
    if (typeof translations !== 'undefined' && translations[lang] && translations[lang][key]) {
        return translations[lang][key];
    }
    if (translations && translations.es && translations.es[key]) {
        return translations.es[key];
    }
    return key;
};
