# Cómo Agregar Publicaciones

Este sistema te permite agregar publicaciones fácilmente sin editar directamente `posts.json`.

## Pasos Rápidos

### 1. Crear el archivo de publicación

En la carpeta `Publicaciones/`, crea un archivo con el formato:
```
YYYY-MM-DD.json
```

**Ejemplo:** Para una publicación del 12 de diciembre de 2025:
```
Publicaciones/2025-12-12.json
```

### 2. Llenar el contenido

Copia este template y completa los campos:

```json
{
  "tipo": "difusion",
  "category": "nacional",
  "title": "Título de tu publicación",
  "date": "Diciembre 12, de 2025",
  "author": "Matías Deneken",
  "authorLink": "#",
  "description": "Descripción breve de tu publicación.",
  "link": "#",
  "image": "mapa",
  "featured": false
}
```

### 3. Actualizar posts.json

Ejecuta uno de estos comandos:

**Con Node.js:**
```bash
node scripts/actualizar-posts.js
```

**Con Python:**
```bash
python scripts/actualizar-posts.py
```

### 4. Hacer commit y push

```bash
git add Publicaciones/ posts.json
git commit -m "Agregar nueva publicación: [título]"
git push
```

## Campos Explicados

| Campo | Descripción | Valores Posibles |
|-------|-------------|------------------|
| `tipo` | Tipo de publicación | `"difusion"` o `"academico"` |
| `category` | Categoría | `"nacional"`, `"elecciones"`, `"educación"`, `"género"`, etc. |
| `title` | Título de la publicación | Texto libre |
| `date` | Fecha en formato legible | Ej: "Diciembre 12, de 2025" |
| `author` | Nombre del autor | Usualmente "Matías Deneken" |
| `authorLink` | Enlace al perfil | `"#"` si no hay enlace |
| `description` | Descripción breve | Aparece en la lista de publicaciones |
| `link` | URL del artículo completo | `"#"` si aún no está disponible |
| `image` | Tipo de imagen placeholder | `"mapa"`, `"grafico"`, o `"datos"` |
| `featured` | ¿Es destacado? | `true` o `false` (solo uno destacado a la vez) |

## Ejemplos

### Publicación de Difusión
```json
{
  "tipo": "difusion",
  "category": "nacional",
  "title": "Análisis de migración interna en Chile",
  "date": "Diciembre 12, de 2025",
  "author": "Matías Deneken",
  "authorLink": "#",
  "description": "Un análisis detallado de los patrones de migración interna revelados por el Censo 2024.",
  "link": "#",
  "image": "mapa",
  "featured": false
}
```

### Publicación Académica
```json
{
  "tipo": "academico",
  "category": "metodología",
  "title": "Nuevos métodos para inferencia causal",
  "date": "Noviembre 20, de 2025",
  "author": "Matías Deneken",
  "authorLink": "#",
  "description": "Desarrollo de técnicas avanzadas para inferencia causal en estudios observacionales.",
  "link": "#",
  "image": "grafico",
  "featured": false
}
```

### Publicación Destacada
```json
{
  "tipo": "difusion",
  "category": "elecciones",
  "title": "Análisis de segunda vuelta presidencial",
  "date": "Diciembre 1, de 2025",
  "author": "Matías Deneken",
  "authorLink": "#",
  "description": "Análisis detallado de los lugares donde Jara podría buscar votos.",
  "link": "#",
  "image": "mapa",
  "featured": true
}
```

## Notas Importantes

- **Ordenamiento**: Las publicaciones se ordenan automáticamente por fecha (más reciente primero)
- **Destacado**: Solo puede haber un `featured: true` a la vez. El script tomará el más reciente.
- **Formato de fecha**: El nombre del archivo debe ser `YYYY-MM-DD.json` (ej: `2025-12-12.json`)
- **Fecha legible**: El campo `date` puede tener cualquier formato legible (ej: "Diciembre 12, de 2025")

## Flujo de Trabajo Recomendado

1. Crear el archivo JSON en `Publicaciones/`
2. Ejecutar el script para actualizar `posts.json`
3. Verificar que todo se vea bien localmente
4. Hacer commit y push a GitHub
5. La página se actualizará automáticamente en methodolab.com











