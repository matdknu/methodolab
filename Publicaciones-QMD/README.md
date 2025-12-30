# Sistema de Publicaciones con Quarto Markdown (.qmd)

Este sistema te permite crear publicaciones de forma más fácil y profesional usando archivos `.qmd` (Quarto Markdown) con soporte para imágenes y contenido enriquecido.

## Estructura

Cada publicación tiene su propia carpeta con la siguiente estructura:

```
Publicaciones-QMD/
└── YYYY-MM-DD-slug/
    ├── index.qmd          # Archivo principal con contenido
    └── images/            # Carpeta para imágenes
        ├── imagen1.png
        └── imagen2.png
```

## Cómo Crear una Nueva Publicación

### Paso 1: Crear la carpeta

Crea una carpeta con el formato: `YYYY-MM-DD-slug`

**Ejemplo:**
```
Publicaciones-QMD/2025-12-01-jara-votos/
```

### Paso 2: Crear el archivo index.qmd

Crea un archivo `index.qmd` en la carpeta con este formato:

```yaml
---
title: "Título de tu publicación"
tipo: "difusion"
category: "elecciones"
date: "Diciembre 1, de 2025"
author: "Matías Deneken"
authorLink: "#"
description: "Descripción breve que aparecerá en la lista."
link: "#"
featured: false
image_type: "mapa"
image_path: "images/mapa-jara-votos.png"
---

## Contenido de tu publicación

Puedes escribir aquí el contenido completo usando Markdown.

![Descripción de la imagen](images/mapa-jara-votos.png)
```

### Paso 3: Agregar imágenes

1. Crea la carpeta `images/` dentro de tu publicación
2. Coloca tus imágenes allí
3. Referencia las imágenes en el `.qmd` usando rutas relativas

**Ejemplo:**
```markdown
![Mapa de comunas](images/mapa-jara-votos.png)
```

### Paso 4: Procesar y actualizar posts.json

Ejecuta el script para generar `posts.json`:

```bash
node scripts/procesar-qmd.js
```

O si prefieres usar npm scripts (si los tienes configurados):

```bash
npm run procesar-publicaciones
```

## Campos del Frontmatter

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
- **image_path**: Ruta a la imagen principal (default: se usa `image_type`)

## Tipos de Publicación

- **difusion**: Aparece con distintivo azul "Difusión"
- **academico**: Aparece con distintivo amarillo "Académico"

## Categorías Disponibles

- `"elecciones"`
- `"nacional"`
- `"educación"`
- `"género"`
- `"metodología"`
- `"análisis"`

## Ventajas del Sistema .qmd

✅ **Más fácil de escribir**: Markdown es más legible que JSON  
✅ **Soporte para imágenes**: Cada publicación tiene su carpeta de imágenes  
✅ **Contenido completo**: Puedes escribir el artículo completo en el mismo archivo  
✅ **Mejor organización**: Cada publicación en su propia carpeta  
✅ **Fácil de versionar**: Los archivos .qmd son fáciles de comparar en git

## Ejemplo Completo

Ver la carpeta `2025-12-01-jara-votos/` para un ejemplo completo de cómo estructurar una publicación.

## Notas

- El script procesa automáticamente todas las carpetas en `Publicaciones-QMD/`
- Las publicaciones se ordenan por nombre de carpeta (fecha)
- Las imágenes deben estar en la carpeta `images/` de cada publicación
- El contenido del cuerpo (después del frontmatter) no se usa actualmente en el sitio, pero se guarda para futuras expansiones

