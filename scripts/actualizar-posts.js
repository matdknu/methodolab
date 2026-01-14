#!/usr/bin/env node

/**
 * Script para actualizar posts.json desde archivos individuales en la carpeta Publicaciones
 * 
 * Uso: node scripts/actualizar-posts.js
 */

const fs = require('fs');
const path = require('path');

const PUBLICACIONES_DIR = path.join(__dirname, '..', 'Publicaciones');
const POSTS_JSON = path.join(__dirname, '..', 'posts.json');

// Leer todos los archivos JSON de la carpeta Publicaciones
function leerPublicaciones() {
    const publicaciones = [];
    
    if (!fs.existsSync(PUBLICACIONES_DIR)) {
        console.log('⚠️  La carpeta Publicaciones no existe. Creándola...');
        fs.mkdirSync(PUBLICACIONES_DIR, { recursive: true });
        return publicaciones;
    }
    
    const archivos = fs.readdirSync(PUBLICACIONES_DIR);
    const archivosJson = archivos.filter(archivo => archivo.endsWith('.json') && archivo !== 'README.md');
    
    console.log(`📁 Encontrados ${archivosJson.length} archivos de publicaciones`);
    
    archivosJson.forEach(archivo => {
        const rutaArchivo = path.join(PUBLICACIONES_DIR, archivo);
        try {
            const contenido = fs.readFileSync(rutaArchivo, 'utf8');
            const publicacion = JSON.parse(contenido);
            
            // Extraer fecha del nombre del archivo (YYYY-MM-DD.json)
            const nombreSinExtension = archivo.replace('.json', '');
            const fechaArchivo = nombreSinExtension;
            
            // Agregar ID basado en la fecha para ordenamiento
            publicacion.fechaArchivo = fechaArchivo;
            publicaciones.push(publicacion);
            
            console.log(`  ✓ ${archivo}`);
        } catch (error) {
            console.error(`  ✗ Error leyendo ${archivo}:`, error.message);
        }
    });
    
    return publicaciones;
}

// Ordenar publicaciones por fecha (más reciente primero)
function ordenarPorFecha(publicaciones) {
    return publicaciones.sort((a, b) => {
        const fechaA = a.fechaArchivo || '';
        const fechaB = b.fechaArchivo || '';
        return fechaB.localeCompare(fechaA); // Orden descendente (más reciente primero)
    });
}

// Generar posts.json
function generarPostsJson(publicaciones) {
    // Separar destacado y regulares
    const destacados = publicaciones.filter(p => p.featured === true);
    const regulares = publicaciones.filter(p => !p.featured);
    
    // Si hay múltiples destacados, tomar solo el más reciente
    let destacado = null;
    if (destacados.length > 0) {
        destacado = destacados[0]; // Ya está ordenado por fecha
        console.log(`⭐ Publicación destacada: ${destacado.title}`);
    }
    
    // Combinar: destacado primero, luego regulares
    const todosLosPosts = [];
    if (destacado) {
        todosLosPosts.push(destacado);
    }
    todosLosPosts.push(...regulares);
    
    // Asignar IDs secuenciales
    const postsConId = todosLosPosts.map((post, index) => {
        const nuevoPost = { ...post };
        nuevoPost.id = index + 1;
        delete nuevoPost.fechaArchivo; // Eliminar campo temporal
        return nuevoPost;
    });
    
    return postsConId;
}

// Función principal
function main() {
    console.log('🚀 Actualizando posts.json...\n');
    
    // Leer publicaciones de la carpeta
    const publicaciones = leerPublicaciones();
    
    if (publicaciones.length === 0) {
        console.log('⚠️  No se encontraron publicaciones en la carpeta Publicaciones');
        console.log('   Crea archivos JSON con formato YYYY-MM-DD.json');
        return;
    }
    
    // Ordenar por fecha
    const publicacionesOrdenadas = ordenarPorFecha(publicaciones);
    
    // Generar posts.json
    const postsJson = generarPostsJson(publicacionesOrdenadas);
    
    // Escribir posts.json
    try {
        fs.writeFileSync(POSTS_JSON, JSON.stringify(postsJson, null, 2), 'utf8');
        console.log(`\n✅ posts.json actualizado con ${postsJson.length} publicaciones`);
        console.log(`   - Destacado: ${postsJson.filter(p => p.featured).length}`);
        console.log(`   - Regulares: ${postsJson.filter(p => !p.featured).length}`);
    } catch (error) {
        console.error('❌ Error escribiendo posts.json:', error.message);
        process.exit(1);
    }
}

// Ejecutar
main();











