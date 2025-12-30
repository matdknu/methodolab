// Traducciones para la página
const translations = {
    es: {
        // Navegación
        navPublicaciones: "Publicaciones",
        navRecursos: "Recursos",
        navSobreNosotros: "Sobre Nosotros",
        navContacto: "Contacto",
        
        // Hero
        heroSubtitle: "Metodología en Ciencias Sociales",
        
        // Interactivos
        interactivosTitle: "Interactivos",
        interactivo1: "Visualización de Datos",
        interactivo2: "Herramientas de Análisis",
        interactivo3: "Repositorios de Código",
        
        // Nosotros
        nosotrosTitle: "Nosotros",
        nosotrosName: "Matías Deneken",
        nosotrosBio1: "Matías Deneken es investigador en metodología de ciencias sociales, especializado en el desarrollo y aplicación de técnicas avanzadas para el análisis de datos sociales. Su trabajo se centra en la intersección entre la metodología cuantitativa, el análisis de datos y las ciencias sociales, con énfasis en inferencia causal, análisis de datos complejos y visualización de información.",
        nosotrosBio2: "A través de Methodolab, dirige proyectos de investigación que combinan rigor metodológico con aplicaciones prácticas, desarrollando herramientas y técnicas que permiten abordar preguntas de investigación complejas. Su investigación abarca temas como análisis de elecciones, migración interna, desigualdades sociales y metodologías experimentales.",
        nosotrosBio3: "Además de su trabajo de investigación, Matías se dedica a la difusión de metodologías avanzadas a través de publicaciones académicas y de divulgación, así como al desarrollo de software y herramientas computacionales para facilitar el análisis de datos sociales.",
        nosotrosBio4: "Methodolab es un laboratorio de metodología en ciencias sociales que busca analizar y desarrollar metodologías avanzadas para la investigación, combinando rigor metodológico con aplicaciones prácticas en problemas de investigación relevantes.",
        
        // Contacto
        contactoTitle: "Contacto",
        contactoText: "¿Te gustaría colaborar con nosotros? ¿Tienes alguna duda o comentario? ¡Escríbenos!",
        
        // Footer
        footerText: "© 2024 Methodolab. Todos los derechos reservados.",
        
        // Posts
        leerMas: "Leer más →",
        por: "por"
    },
    en: {
        // Navigation
        navPublicaciones: "Publications",
        navRecursos: "Resources",
        navSobreNosotros: "About Us",
        navContacto: "Contact",
        
        // Hero
        heroSubtitle: "Methodology in Social Sciences",
        
        // Interactivos
        interactivosTitle: "Interactive",
        interactivo1: "Data Visualization",
        interactivo2: "Analysis Tools",
        interactivo3: "Code Repositories",
        
        // Nosotros
        nosotrosTitle: "About Us",
        nosotrosName: "Matías Deneken",
        nosotrosBio1: "Matías Deneken is a researcher in social science methodology, specialized in the development and application of advanced techniques for social data analysis. His work focuses on the intersection between quantitative methodology, data analysis and social sciences, with emphasis on causal inference, complex data analysis and information visualization.",
        nosotrosBio2: "Through Methodolab, he directs research projects that combine methodological rigor with practical applications, developing tools and techniques that allow addressing complex research questions. His research covers topics such as election analysis, internal migration, social inequalities and experimental methodologies.",
        nosotrosBio3: "In addition to his research work, Matías is dedicated to the dissemination of advanced methodologies through academic and outreach publications, as well as the development of software and computational tools to facilitate social data analysis.",
        nosotrosBio4: "Methodolab is a social science methodology laboratory that seeks to analyze and develop advanced methodologies for research, combining methodological rigor with practical applications in relevant research problems.",
        
        // Contacto
        contactoTitle: "Contact",
        contactoText: "Would you like to collaborate with us? Do you have any questions or comments? Write to us!",
        
        // Footer
        footerText: "© 2024 Methodolab. All rights reserved.",
        
        // Posts
        leerMas: "Read more →",
        por: "by"
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
    
    // Actualizar selector de idioma
    const langSelector = document.querySelector('.lang-selector');
    if (langSelector) {
        const currentFlag = langSelector.querySelector('.current-flag');
        const currentLang = langSelector.querySelector('.current-lang');
        if (currentLanguage === 'es') {
            currentFlag.textContent = '🇨🇱';
            currentLang.textContent = 'ESP';
        } else {
            currentFlag.textContent = '🇬🇧';
            currentLang.textContent = 'ENG';
        }
    }
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

