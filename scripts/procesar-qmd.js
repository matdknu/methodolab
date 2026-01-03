#!/usr/bin/env node

/**
 * Script para procesar publicaciones en formato .qmd y generar posts.json
 * 
 * Busca carpetas en Publicaciones-QMD/ con archivos index.qmd
 * Extrae los metadatos del frontmatter YAML
 * Genera posts.json con todas las publicaciones
 */

const fs = require('fs');
const path = require('path');

const PUBLICACIONES_DIR = path.join(__dirname, '..', 'Publicaciones-QMD');
const OUTPUT_FILE = path.join(__dirname, '..', 'posts.json');

/**
 * Parsea el frontmatter YAML de un archivo .qmd
 */
function parseQmdFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extraer frontmatter (entre --- y ---)
    const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
    
    if (!frontmatterMatch) {
        throw new Error(`No se encontró frontmatter en ${filePath}`);
    }
    
    const frontmatterText = frontmatterMatch[1];
    const body = frontmatterMatch[2];
    
    // Parsear YAML simple (solo key: value)
    const metadata = {};
    frontmatterText.split('\n').forEach(line => {
        const match = line.match(/^(\w+):\s*(.+)$/);
        if (match) {
            const key = match[1].trim();
            let value = match[2].trim();
            
            // Remover comillas si existen
            if ((value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            
            metadata[key] = value;
        }
    });
    
    return { metadata, body };
}

/**
 * Determina el tipo de imagen basado en image_type o image_path
 */
function getImageType(metadata) {
    // Si hay image_type, usarlo
    if (metadata.image_type) {
        return metadata.image_type;
    }
    
    // Si hay image_path, inferir del nombre
    if (metadata.image_path) {
        const imagePath = metadata.image_path.toLowerCase();
        if (imagePath.includes('mapa')) return 'mapa';
        if (imagePath.includes('grafico') || imagePath.includes('chart')) return 'grafico';
        if (imagePath.includes('datos') || imagePath.includes('data')) return 'datos';
    }
    
    // Default
    return 'mapa';
}

/**
 * Procesa publicaciones JSON existentes
 */
function procesarPublicacionesJSON() {
    const JSON_DIR = path.join(__dirname, '..', 'Publicaciones');
    const posts = [];
    
    if (!fs.existsSync(JSON_DIR)) {
        return posts;
    }
    
    const archivos = fs.readdirSync(JSON_DIR)
        .filter(file => file.endsWith('.json') && file !== 'README.md')
        .sort();
    
    archivos.forEach(archivo => {
        try {
            const filePath = path.join(JSON_DIR, archivo);
            const content = fs.readFileSync(filePath, 'utf-8');
            const post = JSON.parse(content);
            posts.push(post);
        } catch (error) {
            console.warn(`⚠️  Error leyendo ${archivo}:`, error.message);
        }
    });
    
    return posts;
}

/**
 * Procesa todas las carpetas en Publicaciones-QMD/
 */
function procesarPublicaciones() {
    const postsQMD = [];
    const postsJSON = [];
    
    // Procesar publicaciones .qmd
    if (fs.existsSync(PUBLICACIONES_DIR)) {
        const carpetas = fs.readdirSync(PUBLICACIONES_DIR, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)
            .sort(); // Ordenar por nombre (fecha)
        
        console.log(`📁 Encontradas ${carpetas.length} carpetas de publicaciones .qmd`);
        
        carpetas.forEach(carpeta => {
            const qmdPath = path.join(PUBLICACIONES_DIR, carpeta, 'index.qmd');
            
            if (!fs.existsSync(qmdPath)) {
                console.warn(`⚠️  No se encontró index.qmd en ${carpeta}`);
                return;
            }
            
            try {
                const { metadata, body } = parseQmdFile(qmdPath);
                
                // Determinar imagen: si hay image_path, usarlo; si no, usar image_type
                let imageValue;
                if (metadata.image_path) {
                    // Si es una ruta relativa, ajustarla desde la raíz del proyecto
                    imageValue = metadata.image_path.startsWith('/') 
                        ? metadata.image_path.slice(1) 
                        : metadata.image_path;
                } else {
                    imageValue = getImageType(metadata);
                }
                
                // Convertir a formato JSON esperado
                const post = {
                    tipo: metadata.tipo || 'difusion',
                    category: metadata.category || 'nacional',
                    title: metadata.title || 'Sin título',
                    date: metadata.date || '',
                    author: metadata.author || 'Matías Deneken',
                    authorLink: metadata.authorLink || '#',
                    description: metadata.description || '',
                    link: metadata.link || '#',
                    image: imageValue,
                    featured: metadata.featured === 'true' || metadata.featured === true
                };
                
                postsQMD.push(post);
                console.log(`✅ Procesada (.qmd): ${post.title}`);
                
            } catch (error) {
                console.error(`❌ Error procesando ${carpeta}:`, error.message);
            }
        });
    }
    
    // Procesar publicaciones JSON existentes
    postsJSON.push(...procesarPublicacionesJSON());
    console.log(`📄 Encontradas ${postsJSON.length} publicaciones JSON`);
    
    // Combinar ambas fuentes (QMD tiene prioridad si hay duplicados por fecha)
    const allPosts = [...postsQMD, ...postsJSON];
    
    // Ordenar por fecha (más recientes primero)
    // Intentar extraer fecha del campo date
    allPosts.sort((a, b) => {
        const dateA = parsearFecha(a.date);
        const dateB = parsearFecha(b.date);
        return dateB - dateA; // Más recientes primero
    });
    
    // Guardar posts.json
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allPosts, null, 2), 'utf-8');
    
    console.log(`\n✅ Generado ${OUTPUT_FILE} con ${allPosts.length} publicaciones totales`);
    return allPosts;
}

/**
 * Parsea una fecha en formato español a objeto Date
 */
function parsearFecha(fechaTexto) {
    if (!fechaTexto) return new Date(0);
    
    const meses = {
        'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3,
        'mayo': 4, 'junio': 5, 'julio': 6, 'agosto': 7,
        'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
    };
    
    // Formato: "Diciembre 1, de 2025"
    const match = fechaTexto.match(/(\w+)\s+(\d+),\s+de\s+(\d+)/i);
    if (match) {
        const mes = meses[match[1].toLowerCase()];
        const dia = parseInt(match[2]);
        const año = parseInt(match[3]);
        return new Date(año, mes, dia);
    }
    
    return new Date(0);
}

// Ejecutar
if (require.main === module) {
    try {
        procesarPublicaciones();
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

module.exports = { procesarPublicaciones, parseQmdFile };

