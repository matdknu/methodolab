# Renderizar Publicaciones desde R

Este proyecto permite renderizar las publicaciones desde R usando Quarto.

## Requisitos

1. **R** (versión 4.0 o superior)
2. **Quarto** instalado y en el PATH
3. Paquetes R necesarios:
   ```r
   install.packages("quarto")
   ```

## Uso

### Renderizar todas las publicaciones

```r
# Desde R
source("scripts/renderizar-desde-r.R")

# O desde la terminal
Rscript scripts/renderizar-desde-r.R
```

### Renderizar una publicación específica

```r
# Desde R
source("scripts/renderizar-desde-r.R")
renderizar_publicacion("Publicaciones-QMD/2025-01-15-paes-desigualdad")

# O desde la terminal
Rscript scripts/renderizar-desde-r.R Publicaciones-QMD/2025-01-15-paes-desigualdad
```

## Cómo Funciona

1. El script busca todos los archivos `index.qmd` en `Publicaciones-QMD/`
2. Lee el frontmatter de cada `.qmd` para obtener el `link` de destino
3. Renderiza cada `.qmd` usando Quarto
4. Guarda el HTML renderizado en la ubicación especificada en el `link`

## Estructura de Archivos

```
Publicaciones-QMD/
└── YYYY-MM-DD-slug/
    ├── index.qmd          # Archivo Quarto con el contenido
    └── images/             # Imágenes de la publicación
```

El archivo `index.qmd` debe tener un frontmatter con:
- `link`: Ruta donde se guardará el HTML renderizado (ej: `Publicaciones/paes-desigualdad.html`)

## Ejemplo de index.qmd

```yaml
---
title: "Título de la publicación"
tipo: "difusion"
category: "educación"
date: "Enero 15, de 2025"
author: "Matías Deneken"
authorLink: "#"
description: "Descripción breve"
link: "Publicaciones/paes-desigualdad.html"
featured: false
image_type: "datos"
---

## Contenido

Aquí va el contenido de la publicación en Markdown.

Puedes incluir código R:

```{r}
#| echo: false
#| fig-width: 10
#| fig-height: 6

library(ggplot2)
ggplot(mtcars, aes(x = mpg, y = hp)) + 
  geom_point()
```

## Integración con el Sistema Actual

El sistema actual funciona así:

1. **Crear publicación**: Crea un `.qmd` en `Publicaciones-QMD/`
2. **Renderizar**: Ejecuta el script R para generar el HTML
3. **Actualizar posts.json**: Ejecuta `node scripts/procesar-qmd.js` para actualizar la lista

O puedes usar ambos sistemas:
- **Sistema QMD + R**: Para publicaciones con análisis de datos, gráficos, etc.
- **Sistema HTML manual**: Para publicaciones simples sin código R

## Ventajas de Renderizar desde R

✅ **Análisis reproducibles**: Incluye código R directamente en las publicaciones  
✅ **Gráficos dinámicos**: Genera gráficos automáticamente desde datos  
✅ **Integración con datos**: Puedes leer y analizar datos directamente  
✅ **Formato profesional**: Quarto genera HTML bien formateado  
✅ **Flexibilidad**: Puedes usar cualquier paquete R (ggplot2, dplyr, etc.)

## Notas

- El HTML renderizado se guarda en la ubicación especificada en `link`
- Las imágenes generadas por código R se guardan automáticamente
- Puedes combinar Markdown, código R, y HTML en el mismo documento







