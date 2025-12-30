# Cómo Agregar Nuevos Posts

## Sistema de Posts

El sitio usa un archivo `posts.json` para gestionar todas las publicaciones. Es muy fácil agregar nuevos posts editando este archivo.

## Estructura de un Post

Cada post en `posts.json` tiene la siguiente estructura:

```json
{
  "id": 1,
  "featured": true,
  "tipo": "difusion",
  "category": "investigación",
  "title": "Título del Post",
  "date": "Diciembre 15, de 2024",
  "author": "Nombre del Autor",
  "authorLink": "#",
  "description": "Descripción breve del post que aparecerá en la lista.",
  "link": "#",
  "image": "mapa"
}
```

## Campos Explicados

- **id**: Número único para cada post (incrementa para cada nuevo post)
- **featured**: `true` si quieres que aparezca como post destacado (solo uno puede ser destacado)
- **tipo**: Tipo de publicación - **"difusion"** para "MethodoLab - Difusión" o **"academico"** para "MethodoLab - Académico"
- **category**: Categoría del post (ej: "investigación", "metodología", "análisis", "herramientas")
- **title**: Título del post
- **date**: Fecha en formato "Mes día, de año" (ej: "Diciembre 15, de 2024")
- **author**: Nombre del autor o autores
- **authorLink**: Link al perfil del autor (usa "#" si no tienes)
- **description**: Descripción breve que aparece debajo del título
- **link**: URL del post completo (usa "#" si aún no está listo)
- **image**: Tipo de imagen ("mapa", "grafico", o "datos")

## Tipos de Publicaciones

Cada post debe tener un tipo:
- **"difusion"**: Aparece con badge azul "MethodoLab - Difusión"
- **"academico"**: Aparece con badge gris "MethodoLab - Académico"

Los usuarios pueden filtrar las publicaciones por tipo usando el menú desplegable en la sección de publicaciones.

## Tipos de Imágenes

Puedes usar tres tipos de imágenes:
- **"mapa"**: Muestra un patrón de mapa con puntos
- **"grafico"**: Muestra un patrón de gráfico de barras
- **"datos"**: Muestra un patrón de datos/puntos

## Ejemplo: Agregar un Nuevo Post

1. Abre el archivo `posts.json`
2. Agrega un nuevo objeto al array (antes del corchete de cierre `]`)
3. Usa el siguiente formato:

```json
{
  "id": 8,
  "featured": false,
  "tipo": "difusion",
  "category": "análisis",
  "title": "Nuevo Análisis de Datos Sociales",
  "date": "Enero 10, de 2025",
  "author": "Tu Nombre",
  "authorLink": "#",
  "description": "Descripción de tu nuevo análisis y sus hallazgos principales.",
  "link": "#",
  "image": "grafico"
}
```

4. Guarda el archivo
5. Haz commit y push a GitHub:
   ```bash
   git add posts.json
   git commit -m "Agregar nuevo post: [título]"
   git push
   ```

## Orden de los Posts

- El post con `"featured": true` aparece primero como destacado
- Los demás posts aparecen en el orden que están en el array (más recientes primero)

## Tips

- **Para destacar un post nuevo**: Cambia `"featured": true` en el nuevo post y `"featured": false` en el anterior destacado
- **Para cambiar el orden**: Reordena los objetos en el array JSON
- **Para editar un post existente**: Simplemente modifica los campos en `posts.json`

## Validación JSON

Asegúrate de que el JSON sea válido:
- Usa comillas dobles `"` para las claves y valores de texto
- Separa los objetos con comas `,`
- No dejes comas al final del último objeto
- Usa un editor que valide JSON (VS Code, por ejemplo)

## Ejemplo Completo

```json
[
  {
    "id": 1,
    "featured": true,
    "tipo": "difusion",
    "category": "investigación",
    "title": "Post Destacado",
    "date": "Diciembre 15, de 2024",
    "author": "Autor",
    "authorLink": "#",
    "description": "Descripción...",
    "link": "#",
    "image": "mapa"
  },
  {
    "id": 2,
    "featured": false,
    "tipo": "academico",
    "category": "metodología",
    "title": "Otro Post",
    "date": "Noviembre 20, de 2024",
    "author": "Autor",
    "authorLink": "#",
    "description": "Descripción...",
    "link": "#",
    "image": "grafico"
  }
]
```

¡Eso es todo! El sitio se actualizará automáticamente cuando subas los cambios a GitHub.

