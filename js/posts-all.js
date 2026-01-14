// Cargar TODAS las publicaciones para la página publicaciones.html
document.addEventListener('DOMContentLoaded', function() {
    // Re-renderizar posts cuando cambie el idioma
    if (typeof window.languageChangeCallback === 'undefined') {
        window.languageChangeCallback = function() {
            // Re-cargar y renderizar posts con nuevo idioma
            if (window.allPostsAll && window.allPostsAll.length > 0) {
                renderAllPosts(window.allPostsAll);
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
            console.log('Todas las publicaciones cargadas:', posts.length);
            window.allPostsAll = posts;
            // Mostrar TODAS las publicaciones (incluyendo destacadas)
            renderAllPosts(posts);
        })
        .catch(error => {
            console.warn('No se pudo cargar posts.json, usando datos embebidos:', error);
            // Usar datos embebidos como respaldo
            if (typeof postsData !== 'undefined') {
                console.log('Usando postsData embebido:', postsData.length);
                window.allPostsAll = postsData;
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
        container.innerHTML = `<p class="no-posts">${getTranslationLocal('noPublicaciones')}</p>`;
        return;
    }

    container.innerHTML = posts.map(post => {
        const imageHTML = getImageHTML(post.image);
        const tipoLabel = getTipoLabel(post.tipo);
        const categoryText = getCategoryTranslationLocal(post.category);
        return `
            <article class="articulo-item" data-tipo="${post.tipo}">
                <div class="articulo-image">
                    ${imageHTML}
                </div>
                <span class="articulo-category">${categoryText}</span>
                <h3 class="articulo-title">
                    <a href="${post.link}">${post.title}</a>
                    ${tipoLabel}
                </h3>
                <p class="articulo-meta">
                    ${post.date} ${getTranslationLocal('por')} <a href="${post.authorLink}">${post.author}</a>
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





