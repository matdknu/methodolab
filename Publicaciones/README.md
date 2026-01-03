# Sistema de Publicaciones

Este sistema te permite agregar publicaciones fácilmente creando archivos JSON en esta carpeta.

## Cómo Agregar una Nueva Publicación

### Paso 1: Crear el archivo
Crea un nuevo archivo JSON con el formato de fecha: `YYYY-MM-DD.json`

**Ejemplo:** Para una publicación del 12 de diciembre de 2025:
```
2025-12-12.json
```

### Paso 2: Llenar el contenido
Copia este template y completa los campos:

```json
{
  "tipo": "difusion",
  "category": "nacional",
  "title": "Título de tu publicación",
  "date": "Diciembre 12, de 2025",
  "author": "Matías Deneken",
  "authorLink": "#",
  "description": "Descripción breve de tu publicación que aparecerá en la lista.",
  "link": "#",
  "image": "mapa",
  "featured": false
}
```

### Campos disponibles:

- **tipo**: `"difusion"` o `"academico"` (determina el color del distintivo)
- **category**: Categoría de la publicación (ej: "nacional", "elecciones", "educación", "género")
- **title**: Título de la publicación
- **date**: Fecha en formato legible (ej: "Diciembre 12, de 2025")
- **author**: Nombre del autor (usualmente "Matías Deneken")
- **authorLink**: Enlace al perfil del autor (usar "#" si no hay)
- **description**: Descripción breve que aparecerá en la lista
- **link**: URL del artículo completo (usar "#" si aún no está disponible)
- **image**: Tipo de imagen placeholder: `"mapa"`, `"grafico"`, o `"datos"`
- **featured**: `true` para destacado, `false` para publicación normal

### Paso 3: Actualizar posts.json
Ejecuta el script para actualizar el archivo posts.json:

```bash
node scripts/actualizar-posts.js
```

O si prefieres usar Python:

```bash
python scripts/actualizar-posts.py
```

## Ejemplos de Categorías

- `"nacional"`
- `"elecciones"`
- `"educación"`
- `"género"`
- `"metodología"`
- `"análisis"`

## Tipos de Imagen

- `"mapa"` - Muestra un placeholder de mapa
- `"grafico"` - Muestra un placeholder de gráfico
- `"datos"` - Muestra un placeholder de datos

## Notas

- El archivo se ordenará automáticamente por fecha (más reciente primero)
- Solo puede haber un `featured: true` a la vez (el script tomará el más reciente)
- El formato de fecha en el nombre del archivo debe ser `YYYY-MM-DD`







