# 📝 Cómo Agregar Publicaciones con .qmd

Este sistema te permite crear publicaciones de forma más fácil y profesional usando archivos `.qmd` (Quarto Markdown) con soporte para imágenes y contenido enriquecido.

## 🚀 Inicio Rápido

### 1. Crear la carpeta de la publicación

Crea una carpeta con el formato: `YYYY-MM-DD-slug`

```bash
mkdir -p Publicaciones-QMD/2025-12-01-jara-votos/images
```

### 2. Crear el archivo `index.qmd`

Crea un archivo `index.qmd` en la carpeta con este formato:

```yaml
---
title: "Los lugares donde Jara podría ir a buscar votos para la segunda vuelta"
tipo: "difusion"
category: "elecciones"
date: "Diciembre 1, de 2025"
author: "Matías Deneken"
authorLink: "#"
description: "Analizamos las comunas donde podrían haber más votantes potenciales comparando los resultados de las presidenciales y parlamentarias."
link: "#"
featured: false
image_type: "mapa"
image_path: "images/mapa-jara-votos.png"
---

## Contenido de tu publicación

Puedes escribir aquí el contenido completo usando Markdown.

![Mapa de comunas](images/mapa-jara-votos.png)
```

### 3. Agregar imágenes

Coloca tus imágenes en la carpeta `images/` y referencia las imágenes en el `.qmd`:

```markdown
![Descripción de la imagen](images/mapa-jara-votos.png)
```

### 4. Procesar y actualizar

Ejecuta el script para generar `posts.json`:

```bash
node scripts/procesar-qmd.js
```

¡Listo! Tu publicación aparecerá en el sitio.

## 📋 Campos del Frontmatter

### Campos Requeridos

- **title**: Título de la publicación
- **tipo**: `"difusion"` o `"academico"`
- **category**: Categoría (ej: "elecciones", "nacional", "educación")
- **date**: Fecha en formato legible (ej: "Diciembre 1, de 2025")
- **description**: Descripción breve para la lista

### Campos Opcionales

- **author**: Nombre del autor (default: "Matías Deneken")
- **authorLink**: Enlace al perfil (default: "#")
- **link**: URL del artículo completo (default: "#")
- **featured**: `true` o `false` (default: `false`)
- **image_type**: `"mapa"`, `"grafico"`, o `"datos"` (default: se infiere de `image_path`)
- **image_path**: Ruta a la imagen principal (solo para referencia, no se usa actualmente)

## 🎨 Tipos de Publicación

- **difusion**: Aparece con distintivo azul "Difusión"
- **academico**: Aparece con distintivo amarillo "Académico"

## 📂 Categorías Disponibles

- `"elecciones"`
- `"nacional"`
- `"educación"`
- `"género"`
- `"metodología"`
- `"análisis"`

## 🖼️ Imágenes

### Tipos de Imagen

- **mapa**: Para mapas geográficos
- **grafico**: Para gráficos y visualizaciones
- **datos**: Para tablas y análisis de datos

### Crear Imágenes

Puedes usar cualquier herramienta para crear tus imágenes:

- **R**: `ggplot2`, `leaflet`, `plotly`
- **Python**: `matplotlib`, `seaborn`, `plotly`, `folium`
- **Web**: Observable, D3.js, Datawrapper
- **GIS**: QGIS, ArcGIS

### Formato Recomendado

- **Resolución**: Mínimo 1200px de ancho
- **Formato**: PNG o JPG
- **Tamaño**: Optimizar para web (máximo 500KB por imagen)

### Colores del Sitio

- Texto principal: `#000000` (negro)
- Difusión: `#2563eb` (azul)
- Académico: `#f59e0b` (amarillo)
- Fondo: `#ffffff` (blanco)
- Bordes: `#e5e5e5` (gris claro)

## ✅ Ventajas del Sistema .qmd

✅ **Más fácil de escribir**: Markdown es más legible que JSON  
✅ **Soporte para imágenes**: Cada publicación tiene su carpeta de imágenes  
✅ **Contenido completo**: Puedes escribir el artículo completo en el mismo archivo  
✅ **Mejor organización**: Cada publicación en su propia carpeta  
✅ **Fácil de versionar**: Los archivos .qmd son fáciles de comparar en git  
✅ **Compatible con JSON**: El script combina ambos sistemas automáticamente

## 📖 Ejemplo Completo

Ver la carpeta `Publicaciones-QMD/2025-12-01-jara-votos/` para un ejemplo completo.

## 🔄 Compatibilidad con Sistema JSON

El script `procesar-qmd.js` combina automáticamente:
- Publicaciones en formato `.qmd` (carpetas en `Publicaciones-QMD/`)
- Publicaciones en formato JSON (archivos en `Publicaciones/`)

Ambos sistemas pueden coexistir. Las publicaciones `.qmd` tienen prioridad si hay duplicados.

## 🛠️ Scripts Disponibles

### Procesar publicaciones

```bash
node scripts/procesar-qmd.js
```

Este script:
- Procesa todas las carpetas `.qmd` en `Publicaciones-QMD/`
- Procesa todos los archivos JSON en `Publicaciones/`
- Combina ambos y genera `posts.json`

### Generar referencia de imagen

```bash
node scripts/generar-imagen-placeholder.js mapa Publicaciones-QMD/2025-12-01-jara-votos/images/mapa-jara-votos.png
```

Este script crea un archivo README con instrucciones para crear la imagen.

## 📝 Notas

- El contenido del cuerpo (después del frontmatter) no se usa actualmente en el sitio, pero se guarda para futuras expansiones
- Las imágenes deben estar en la carpeta `images/` de cada publicación
- El script procesa automáticamente todas las carpetas en `Publicaciones-QMD/`
- Las publicaciones se ordenan por fecha (más recientes primero)

