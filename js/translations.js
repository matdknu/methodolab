// Traducciones para la página
const translations = {
    es: {
        // Navegación
        navInicio: "Inicio",
        navPublicaciones: "Publicaciones",
        navInteractivos: "Interactivos",
        navSobreNosotros: "Sobre Nosotros",
        navContacto: "Contacto",
        
        // Hero
        heroSubtitle: "Metodología en Ciencias Sociales",
        todasPublicaciones: "Todas las Publicaciones",
        todasInteractivas: "Todas las Interactivas",
        conversemos: "Conversemos",
        
        // Interactivos
        interactivosTitle: "Interactivos",
        interactivo1: "Estudio Longitudinal de Relaciones Interculturales",
        interactivo2: "Google Trends: Análisis de Tendencias de Búsqueda",
        
        // Nosotros
        nosotrosTitle: "Nosotros",
        nosotrosIntro1: "MethodoLab es un espacio de difusión sobre hechos que acontecen a lo largo del mundo. Es una organización sin fines de lucro y autogestionada. El fin último es poder influir en el debate público con evidencia.",
        nosotrosIntro2: "En un futuro próximo buscamos ampliar nuestras funciones a brindar asesorías que permitan co-adyudar a entender los problemas sociales desde la vereda que el mundo contemporáneo necesita: La complejidad.",
        nosotrosName: "Matías Deneken",
        perfilCargo: "Fundador de Methodolab",
        
        // Contacto
        contactoTitle: "Contacto",
        contactoText: "¿Te gustaría colaborar con nosotros? ¿Tienes alguna duda o comentario? ¡Escríbenos!",
        
        // Footer
        footerText: "© 2024 Methodolab. Todos los derechos reservados.",
        
        // Posts
        leerMas: "Leer más →",
        por: "por",
        verMas: "Ver todas las publicaciones",
        verTodasInteractivas: "Ver todas las interactivas",
        volverPublicaciones: "← Volver a Publicaciones",
        loUltimo: "Lo último",
        noPublicaciones: "No hay publicaciones disponibles.",
        
        // Botones
        btnSobreNosotros: "Sobre Nosotros",
        
        // Categorías
        categoriaEducacion: "educación",
        categoriaMetodologia: "metodología",
        categoriaGenero: "género",
        categoriaNacional: "nacional",
        categoriaElecciones: "elecciones",
        
        // Tipos
        tipoDifusion: "Difusión",
        tipoAcademico: "Académico"
    },
    en: {
        // Navigation
        navInicio: "Home",
        navPublicaciones: "Publications",
        navInteractivos: "Interactive",
        navSobreNosotros: "About Us",
        navContacto: "Contact",
        
        // Hero
        heroSubtitle: "Methodology in Social Sciences",
        todasPublicaciones: "All Publications",
        todasInteractivas: "All Interactive Tools",
        conversemos: "Let's Talk",
        
        // Interactivos
        interactivosTitle: "Interactive",
        interactivo1: "Longitudinal Study of Intercultural Relations",
        interactivo2: "Google Trends: Search Trends Analysis",
        
        // Nosotros
        nosotrosTitle: "About Us",
        nosotrosIntro1: "MethodoLab is a space for disseminating facts that happen around the world. It is a non-profit and self-managed organization. The ultimate goal is to be able to influence public debate with evidence.",
        nosotrosIntro2: "In the near future we seek to expand our functions to provide advisory services that help understand social problems from the perspective that the contemporary world needs: Complexity.",
        nosotrosName: "Matías Deneken",
        perfilCargo: "Founder of Methodolab",
        
        // Contacto
        contactoTitle: "Contact",
        contactoText: "Would you like to collaborate with us? Do you have any questions or comments? Write to us!",
        
        // Footer
        footerText: "© 2024 Methodolab. All rights reserved.",
        
        // Posts
        leerMas: "Read more →",
        por: "by",
        verMas: "See all publications",
        verTodasInteractivas: "See all interactive tools",
        volverPublicaciones: "← Back to Publications",
        loUltimo: "Latest",
        noPublicaciones: "No publications available.",
        
        // Botones
        btnSobreNosotros: "About Us",
        
        // Categorías
        categoriaEducacion: "education",
        categoriaMetodologia: "methodology",
        categoriaGenero: "gender",
        categoriaNacional: "national",
        categoriaElecciones: "elections",
        
        // Tipos
        tipoDifusion: "Dissemination",
        tipoAcademico: "Academic"
    }
};

// Idioma por defecto
let currentLanguage = localStorage.getItem('language') || 'es';

// Función para cambiar idioma
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.setAttribute('lang', lang);
    updatePageLanguage();
    
    // Notificar a otros scripts que el idioma cambió
    if (typeof window.languageChangeCallback === 'function') {
        window.languageChangeCallback();
    }
}

// Función para actualizar el contenido de la página
function updatePageLanguage() {
    const t = translations[currentLanguage];
    
    // Actualizar navegación
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (t[key]) {
            element.textContent = t[key];
        }
    });
    
    // Actualizar atributos como placeholder, title, etc.
    document.querySelectorAll('[data-translate-attr]').forEach(element => {
        const config = element.getAttribute('data-translate-attr');
        const [key, attr] = config.split(':');
        if (t[key]) {
            element.setAttribute(attr, t[key]);
        }
    });
    
    // Actualizar selector de idioma - marcar botón activo
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.classList.remove('active');
        const onclick = btn.getAttribute('onclick') || '';
        const lang = onclick.includes("'es'") ? 'es' : onclick.includes("'en'") ? 'en' : null;
        if (lang === currentLanguage) {
            btn.classList.add('active');
        }
    });
}

// Función helper global para obtener traducciones
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

// Función helper global para traducir categorías
function getCategoryTranslation(category) {
    const lang = localStorage.getItem('language') || 'es';
    const categoryMap = {
        'educación': 'categoriaEducacion',
        'educacion': 'categoriaEducacion',
        'metodología': 'categoriaMetodologia',
        'metodologia': 'categoriaMetodologia',
        'género': 'categoriaGenero',
        'genero': 'categoriaGenero',
        'nacional': 'categoriaNacional',
        'elecciones': 'categoriaElecciones'
    };
    
    const key = categoryMap[category] || category;
    return getTranslation(key) || category;
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Establecer idioma inicial
    document.documentElement.setAttribute('lang', currentLanguage);
    updatePageLanguage();
    
    // Actualizar selector de idioma visualmente
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.classList.remove('active');
        const lang = btn.getAttribute('onclick').includes('es') ? 'es' : 'en';
        if (lang === currentLanguage) {
            btn.classList.add('active');
        }
    });
});

