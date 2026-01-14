#!/usr/bin/env node

/**
 * Script para migrar publicaciones desde posts-data.js a archivos individuales
 */

const fs = require('fs');
const path = require('path');

const POSTS_DATA_JS = path.join(__dirname, '..', 'js', 'posts-data.js');
const PUBLICACIONES_DIR = path.join(__dirname, '..', 'Publicaciones');

// Función para convertir fecha legible a formato YYYY-MM-DD
function parsearFecha(fechaTexto) {
    const meses = {
        'enero': '01', 'febrero': '02', 'marzo': '03', 'abril': '04',
        'mayo': '05', 'junio': '06', 'julio': '07', 'agosto': '08',
        'septiembre': '09', 'octubre': '10', 'noviembre': '11', 'diciembre': '12'
    };
    
    // Formato: "Diciembre 1, de 2024"
    const match = fechaTexto.match(/(\w+)\s+(\d+),\s+de\s+(\d+)/i);
    if (match) {
        const mes = match[1].toLowerCase();
        const dia = match[2].padStart(2, '0');
        const año = match[3];
        const mesNum = meses[mes] || '01';
        return `${año}-${mesNum}-${dia}`;
    }
    
    // Si no se puede parsear, usar fecha actual
    return new Date().toISOString().split('T')[0];
}

function main() {
    console.log('🔄 Migrando publicaciones desde posts-data.js...\n');
    
    if (!fs.existsSync(POSTS_DATA_JS)) {
        console.log('❌ No se encontró posts-data.js');
        return;
    }
    
    // Leer el archivo y extraer el array
    const contenido = fs.readFileSync(POSTS_DATA_JS, 'utf8');
    const match = contenido.match(/const postsData = (\[[\s\S]*?\]);/);
    
    if (!match) {
        console.log('❌ No se pudo extraer postsData del archivo');
        return;
    }
    
    const posts = eval(match[1]); // Usar eval para parsear el array JavaScript
    console.log(`📚 Encontradas ${posts.length} publicaciones\n`);
    
    // Crear carpeta si no existe
    if (!fs.existsSync(PUBLICACIONES_DIR)) {
        fs.mkdirSync(PUBLICACIONES_DIR, { recursive: true });
    }
    
    let migradas = 0;
    let omitidas = 0;
    
    posts.forEach((post) => {
        // Parsear fecha para crear nombre de archivo
        const fechaArchivo = parsearFecha(post.date);
        const nombreArchivo = `${fechaArchivo}.json`;
        const rutaArchivo = path.join(PUBLICACIONES_DIR, nombreArchivo);
        
        // Si el archivo ya existe, usar un sufijo
        let rutaFinal = rutaArchivo;
        let contador = 1;
        while (fs.existsSync(rutaFinal)) {
            const nombreBase = fechaArchivo;
            rutaFinal = path.join(PUBLICACIONES_DIR, `${nombreBase}-${contador}.json`);
            contador++;
        }
        
        // Crear objeto sin id (se generará automáticamente)
        const publicacion = {
            tipo: post.tipo || 'difusion',
            category: post.category || 'nacional',
            title: post.title,
            date: post.date,
            author: post.author || 'Matías Deneken',
            authorLink: post.authorLink || '#',
            description: post.description,
            link: post.link || '#',
            image: post.image || 'mapa',
            featured: post.featured || false
        };
        
        try {
            fs.writeFileSync(rutaFinal, JSON.stringify(publicacion, null, 2), 'utf8');
            console.log(`  ✓ ${path.basename(rutaFinal)} - ${post.title.substring(0, 50)}...`);
            migradas++;
        } catch (error) {
            console.error(`  ✗ Error escribiendo ${nombreArchivo}:`, error.message);
            omitidas++;
        }
    });
    
    console.log(`\n✅ Migración completada:`);
    console.log(`   - Migradas: ${migradas}`);
    console.log(`   - Omitidas: ${omitidas}`);
    console.log(`\n💡 Ahora ejecuta: node scripts/actualizar-posts.js`);
}

main();











