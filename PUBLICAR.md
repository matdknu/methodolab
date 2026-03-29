# 🚀 Cómo Publicar con Quarto

Este sistema simplificado te permite publicar nuevas entradas usando Quarto de forma fácil y rápida.

## 📋 Workflow Simplificado

### 1. Crear una nueva publicación

Crea una carpeta con el formato: `YYYY-MM-DD-slug`

```bash
mkdir -p Publicaciones-QMD/2025-01-20-nueva-publicacion/images
```

### 2. Crear el archivo `index.qmd`

Crea un archivo `index.qmd` en la carpeta con este formato:

```yaml
---
title: "Título de tu publicación"
tipo: "difusion"
category: "educación"
date: "Enero 20, de 2025"
author: "Matías Deneken"
authorLink: "#"
description: "Descripción breve que aparecerá en la lista de publicaciones"
link: "Publicaciones/nueva-publicacion.html"
featured: false
image_path: "images/mi-imagen.png"
---

## Contenido

Aquí escribes el contenido completo de tu publicación usando Markdown.

Puedes incluir imágenes:

![Descripción](images/mi-imagen.png)

Y código R si lo necesitas:

```{r}
#| echo: false
#| fig-width: 10
#| fig-height: 6

library(ggplot2)
ggplot(data, aes(x = var1, y = var2)) + 
  geom_point()
```
```

### 3. Agregar imágenes

Coloca tus imágenes en la carpeta `images/` de tu publicación.

**Importante:** Si usas `image_path` en el frontmatter, la imagen debe estar también en la carpeta `images/` de la raíz del proyecto para que funcione en el sitio.

### 4. Publicar

Ejecuta el script unificado:

```bash
# Solo procesar y renderizar
node scripts/publicar.js

# Procesar, renderizar y hacer commit
node scripts/publicar.js --commit

# Procesar, renderizar, commit y push
node scripts/publicar.js --push
```

¡Listo! Tu publicación aparecerá en el sitio.

## 📝 Campos del Frontmatter

### Requeridos

- **title**: Título de la publicación
- **tipo**: `"difusion"` o `"academico"`
- **category**: Categoría (ej: "educación", "nacional", "elecciones")
- **date**: Fecha en formato legible (ej: "Enero 20, de 2025")
- **description**: Descripción breve para la lista
- **link**: Ruta donde se guardará el HTML (ej: `"Publicaciones/mi-publicacion.html"`)

### Opcionales

- **author**: Nombre del autor (default: "Matías Deneken")
- **authorLink**: Enlace al perfil (default: "#")
- **featured**: `true` o `false` (default: `false`)
- **image_path**: Ruta a la imagen principal (ej: `"images/mi-imagen.png"`)
  - Si se especifica, se usará esta imagen real
  - Si no se especifica, se usará un placeholder según `image_type`
- **image_type**: `"mapa"`, `"grafico"`, o `"datos"` (solo si no hay `image_path`)

## 🎯 Ejemplo Completo

```bash
# 1. Crear carpeta
mkdir -p Publicaciones-QMD/2025-01-20-mi-analisis/images

# 2. Crear index.qmd (ver template arriba)

# 3. Agregar imagen
cp mi-grafico.png Publicaciones-QMD/2025-01-20-mi-analisis/images/
cp mi-grafico.png images/  # También en la raíz

# 4. Publicar
node scripts/publicar.js --push
```

## ✅ Ventajas

- ✅ **Un solo comando**: Todo en un script
- ✅ **Markdown**: Fácil de escribir y editar
- ✅ **Quarto**: Renderizado profesional
- ✅ **Git integrado**: Commit y push automáticos
- ✅ **Imágenes**: Soporte para imágenes reales
- ✅ **Código R**: Puedes incluir análisis directamente

## 🔄 Flujo Completo

1. **Crear publicación** → Editar `index.qmd`
2. **Agregar imágenes** → En carpeta `images/`
3. **Publicar** → `node scripts/publicar.js --push`
4. **Listo** → La publicación está en el sitio

## 📚 Más Información

- Ver `MANUALES-QMD/01-CREAR-PUBLICACION-QMD.md` para más detalles
- Ver `RENDERIZAR-DESDE-R.md` para usar código R





