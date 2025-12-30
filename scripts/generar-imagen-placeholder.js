#!/usr/bin/env node

/**
 * Script para generar imágenes placeholder para publicaciones
 * 
 * Uso: node scripts/generar-imagen-placeholder.js <tipo> <output>
 * 
 * Tipos: mapa, grafico, datos
 * 
 * Ejemplo:
 * node scripts/generar-imagen-placeholder.js mapa Publicaciones-QMD/2025-12-01-jara-votos/images/mapa-jara-votos.png
 */

const fs = require('fs');
const path = require('path');

// Este script requiere canvas, pero si no está disponible, solo crea un archivo de referencia
function generarImagenPlaceholder(tipo, outputPath) {
    const outputDir = path.dirname(outputPath);
    
    // Crear directorio si no existe
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Crear un archivo README con instrucciones
    const readmePath = path.join(outputDir, 'README-IMAGENES.md');
    const contenido = `# Imágenes para esta publicación

## Imagen requerida: ${path.basename(outputPath)}

**Tipo:** ${tipo}

### Instrucciones:

1. **Para mapas (mapa)**: Crea un mapa mostrando las comunas o regiones relevantes
   - Usa herramientas como QGIS, R (ggplot2, leaflet), o Python (folium, geopandas)
   - Formato recomendado: PNG, 1200x900px mínimo
   - Colores: Usa una paleta consistente con el sitio

2. **Para gráficos (grafico)**: Crea visualizaciones de datos
   - Usa R (ggplot2), Python (matplotlib, seaborn), o herramientas web (Observable, D3.js)
   - Formato recomendado: PNG o SVG, 1200x800px mínimo
   - Estilo: Minimalista, editorial

3. **Para datos (datos)**: Crea visualizaciones de datos tabulares o análisis
   - Tablas, gráficos de barras, líneas, etc.
   - Formato recomendado: PNG, 1200x600px mínimo

### Herramientas recomendadas:

- **R**: ggplot2, leaflet, plotly
- **Python**: matplotlib, seaborn, plotly, folium
- **Web**: Observable, D3.js, Datawrapper
- **GIS**: QGIS, ArcGIS

### Colores del sitio:

- Texto principal: #000000 (negro)
- Difusión: #2563eb (azul)
- Académico: #f59e0b (amarillo)
- Fondo: #ffffff (blanco)
- Bordes: #e5e5e5 (gris claro)

Una vez que tengas la imagen, colócala en este directorio con el nombre: ${path.basename(outputPath)}
`;

    fs.writeFileSync(readmePath, contenido, 'utf-8');
    console.log(`✅ Creado archivo de referencia en: ${readmePath}`);
    console.log(`\n📝 Instrucciones:`);
    console.log(`   1. Crea una imagen de tipo "${tipo}"`);
    console.log(`   2. Guárdala como: ${path.basename(outputPath)}`);
    console.log(`   3. Colócala en: ${outputDir}`);
}

// Ejecutar
if (require.main === module) {
    const tipo = process.argv[2] || 'mapa';
    const output = process.argv[3] || `images/placeholder-${tipo}.png`;
    
    if (!['mapa', 'grafico', 'datos'].includes(tipo)) {
        console.error('❌ Tipo debe ser: mapa, grafico, o datos');
        process.exit(1);
    }
    
    generarImagenPlaceholder(tipo, output);
}

module.exports = { generarImagenPlaceholder };

