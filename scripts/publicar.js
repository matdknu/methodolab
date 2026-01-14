#!/usr/bin/env node

/**
 * Script unificado para publicar con Quarto
 * 
 * Este script:
 * 1. Procesa archivos .qmd y actualiza posts.json
 * 2. Renderiza las publicaciones con Quarto
 * 3. Opcionalmente hace commit y push
 * 
 * Uso:
 *   node scripts/publicar.js              # Solo procesar y renderizar
 *   node scripts/publicar.js --push       # Procesar, renderizar y hacer push
 *   node scripts/publicar.js --commit     # Procesar, renderizar y hacer commit (sin push)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { procesarPublicaciones } = require('./procesar-qmd.js');

const ROOT_DIR = path.join(__dirname, '..');
const PUBLICACIONES_QMD_DIR = path.join(ROOT_DIR, 'Publicaciones-QMD');

/**
 * Verifica si Quarto está instalado
 */
function verificarQuarto() {
    try {
        execSync('quarto --version', { stdio: 'ignore' });
        return true;
    } catch (error) {
        console.error('❌ Quarto no está instalado o no está en el PATH');
        console.error('   Instala Quarto desde: https://quarto.org/docs/get-started/');
        return false;
    }
}

/**
 * Renderiza todas las publicaciones con Quarto
 */
function renderizarPublicaciones() {
    console.log('\n📄 Renderizando publicaciones con Quarto...\n');
    
    if (!fs.existsSync(PUBLICACIONES_QMD_DIR)) {
        console.log('⚠️  No existe la carpeta Publicaciones-QMD');
        return;
    }
    
    const carpetas = fs.readdirSync(PUBLICACIONES_QMD_DIR, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
        .sort();
    
    if (carpetas.length === 0) {
        console.log('⚠️  No se encontraron publicaciones para renderizar');
        return;
    }
    
    let exitosos = 0;
    let fallidos = 0;
    
    carpetas.forEach(carpeta => {
        const qmdPath = path.join(PUBLICACIONES_QMD_DIR, carpeta, 'index.qmd');
        
        if (!fs.existsSync(qmdPath)) {
            console.warn(`⚠️  No se encontró index.qmd en ${carpeta}`);
            return;
        }
        
        try {
            // Leer el frontmatter para obtener el link
            const content = fs.readFileSync(qmdPath, 'utf-8');
            const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
            
            if (!frontmatterMatch) {
                console.warn(`⚠️  No se encontró frontmatter en ${carpeta}`);
                return;
            }
            
            const frontmatter = frontmatterMatch[1];
            const linkMatch = frontmatter.match(/^link:\s*(.+)$/m);
            
            if (!linkMatch) {
                console.warn(`⚠️  No se encontró 'link' en frontmatter de ${carpeta}`);
                return;
            }
            
            let link = linkMatch[1].trim();
            // Remover comillas si existen
            if ((link.startsWith('"') && link.endsWith('"')) ||
                (link.startsWith("'") && link.endsWith("'"))) {
                link = link.slice(1, -1);
            }
            
            // Determinar directorio de salida
            const outputFile = path.join(ROOT_DIR, link);
            const outputDir = path.dirname(outputFile);
            
            // Crear directorio si no existe
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }
            
            // Renderizar con Quarto
            console.log(`📝 Renderizando: ${carpeta}`);
            console.log(`   → ${link}`);
            
            execSync(`quarto render "${qmdPath}" --to html --output "${path.basename(outputFile)}"`, {
                cwd: outputDir,
                stdio: 'inherit'
            });
            
            console.log(`✅ Renderizado: ${link}\n`);
            exitosos++;
            
        } catch (error) {
            console.error(`❌ Error renderizando ${carpeta}:`, error.message);
            fallidos++;
        }
    });
    
    console.log(`\n📊 Resumen de renderizado:`);
    console.log(`   ✅ Exitosos: ${exitosos}`);
    console.log(`   ❌ Fallidos: ${fallidos}`);
}

/**
 * Hace commit de los cambios
 */
function hacerCommit() {
    console.log('\n📝 Haciendo commit de los cambios...\n');
    
    try {
        // Verificar si hay cambios
        const status = execSync('git status --porcelain', { encoding: 'utf-8' });
        
        if (!status.trim()) {
            console.log('ℹ️  No hay cambios para hacer commit');
            return false;
        }
        
        // Agregar archivos
        execSync('git add posts.json Publicaciones-QMD/ Publicaciones/', { stdio: 'inherit' });
        
        // Hacer commit
        const fecha = new Date().toLocaleDateString('es-ES');
        execSync(`git commit -m "Publicar: actualizar publicaciones - ${fecha}"`, { stdio: 'inherit' });
        
        console.log('✅ Commit realizado');
        return true;
    } catch (error) {
        console.error('❌ Error haciendo commit:', error.message);
        return false;
    }
}

/**
 * Hace push a GitHub
 */
function hacerPush() {
    console.log('\n🚀 Haciendo push a GitHub...\n');
    
    try {
        execSync('git push', { stdio: 'inherit' });
        console.log('✅ Push realizado');
        return true;
    } catch (error) {
        console.error('❌ Error haciendo push:', error.message);
        return false;
    }
}

/**
 * Función principal
 */
function main() {
    const args = process.argv.slice(2);
    const hacerPushFlag = args.includes('--push');
    const hacerCommitFlag = args.includes('--commit') || hacerPushFlag;
    
    console.log('🚀 Iniciando proceso de publicación...\n');
    
    // 1. Verificar Quarto
    if (!verificarQuarto()) {
        process.exit(1);
    }
    
    // 2. Procesar QMD y actualizar posts.json
    console.log('📋 Procesando publicaciones .qmd...\n');
    try {
        procesarPublicaciones();
        console.log('');
    } catch (error) {
        console.error('❌ Error procesando publicaciones:', error.message);
        process.exit(1);
    }
    
    // 3. Renderizar con Quarto
    renderizarPublicaciones();
    
    // 4. Hacer commit si se solicita
    if (hacerCommitFlag) {
        const commitExitoso = hacerCommit();
        
        // 5. Hacer push si se solicita y el commit fue exitoso
        if (hacerPushFlag && commitExitoso) {
            hacerPush();
        }
    }
    
    console.log('\n✅ Proceso completado');
}

// Ejecutar
if (require.main === module) {
    main();
}

module.exports = { main, renderizarPublicaciones };





