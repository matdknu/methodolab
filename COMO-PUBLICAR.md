# 📝 Cómo Publicar Contenido en Methodolab

Guía simple para agregar nuevas publicaciones al sitio web.

## 🚀 Pasos Rápidos

### 1. Crear la publicación HTML

Crea un nuevo archivo en la carpeta `Publicaciones/` con el nombre de tu publicación:

```
Publicaciones/mi-nueva-publicacion.html
```

### 2. Estructura básica del HTML

Copia este template y personalízalo:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Descripción breve de tu publicación">
    <title>Título de tu publicación | Methodolab</title>
    <link rel="icon" type="image/png" href="../logos/logo.png">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
<body>
    <header class="header">
        <nav class="nav">
            <div class="container">
                <div class="nav-content">
                    <a href="../index.html" class="logo">
                        <img src="../logos/logo.png" alt="Methodolab" class="logo-img">
                    </a>
                    <ul class="nav-menu">
                        <li><a href="../index.html" data-translate="navInicio">Inicio</a></li>
                        <li><a href="../publicaciones.html" data-translate="navPublicaciones">Publicaciones</a></li>
                        <li><a href="../interactivos.html" data-translate="navInteractivos">Interactivos</a></li>
                        <li><a href="../nosotros.html" data-translate="navSobreNosotros">Sobre Nosotros</a></li>
                        <li><a href="../index.html#contacto" data-translate="navContacto">Contacto</a></li>
                    </ul>
                    <div class="nav-right">
                        <div class="lang-selector">
                            <button class="lang-btn" onclick="changeLanguage('es')" title="Español">
                                <span class="flag">🇨🇱</span>
                                <span class="lang-code">ESP</span>
                            </button>
                            <button class="lang-btn" onclick="changeLanguage('en')" title="English">
                                <span class="flag">🇬🇧</span>
                                <span class="lang-code">ENG</span>
                            </button>
                        </div>
                        <button class="menu-toggle" aria-label="Toggle menu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    </header>

    <main>
        <article class="publicacion-articulo">
            <div class="container">
                <div class="articulo-header">
                    <span class="articulo-category">educación</span>
                    <h1 class="articulo-titulo">
                        Título de tu publicación
                        <span class="tipo-label tipo-difusion">Difusión</span>
                    </h1>
                    <p class="articulo-meta">
                        Enero 20, de 2025 por <a href="../matias-deneken.html">Matías Deneken</a>
                    </p>
                </div>

                <div class="articulo-content">
                    <!-- Imagen principal (opcional) -->
                    <div class="articulo-imagen-principal">
                        <img src="../images/mi-imagen.png" alt="Descripción de la imagen" class="post-image-real" loading="lazy">
                    </div>

                    <!-- Contenido del artículo -->
                    <div class="articulo-texto">
                        <p class="articulo-intro">
                            Texto introductorio que aparece destacado al inicio del artículo.
                        </p>

                        <h2>Primera sección</h2>
                        <p>Contenido de tu publicación aquí...</p>

                        <!-- Imagen en el cuerpo (opcional) -->
                        <div class="articulo-imagen-cuerpo">
                            <img src="../images/otra-imagen.png" alt="Descripción" class="post-image-real" loading="lazy">
                        </div>

                        <h2>Segunda sección</h2>
                        <p>Más contenido...</p>
                    </div>
                </div>

                <div class="articulo-footer">
                    <a href="../publicaciones.html" class="btn-volver">← Volver a Publicaciones</a>
                </div>
            </div>
        </article>

        <!-- Sección "Lo último" (se carga automáticamente) -->
        <section class="lo-ultimo">
            <div class="container">
                <h2 class="lo-ultimo-titulo">Lo último</h2>
                <div id="lo-ultimo-container" class="lo-ultimo-grid">
                    <!-- Se carga dinámicamente -->
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <p data-translate="footerText">&copy; 2024 Methodolab. Todos los derechos reservados.</p>
        </div>
    </footer>

    <script src="../js/translations.js"></script>
    <script src="../js/main.js"></script>
    <script src="../js/lo-ultimo.js"></script>
</body>
</html>
```

### 3. Agregar imágenes

Coloca tus imágenes en la carpeta `images/` en la raíz del proyecto:

```
images/mi-imagen.png
images/otra-imagen.png
```

Luego referencia las imágenes en el HTML con rutas relativas:

```html
<img src="../images/mi-imagen.png" alt="Descripción">
```

### 4. Registrar la publicación en `posts.json`

Abre el archivo `posts.json` y agrega tu publicación al array:

```json
[
  {
    "tipo": "difusion",
    "category": "educación",
    "title": "Título de tu publicación",
    "date": "Enero 20, de 2025",
    "author": "Matías Deneken",
    "authorLink": "#",
    "description": "Descripción breve que aparece en la lista de publicaciones",
    "link": "Publicaciones/mi-nueva-publicacion.html",
    "image": "images/mi-imagen.png",
    "featured": false
  }
]
```

**Campos importantes:**
- `tipo`: `"difusion"` o `"academico"`
- `category`: Categoría (ej: "educación", "nacional", "elecciones")
- `title`: Título completo
- `date`: Fecha en formato legible
- `description`: Descripción breve
- `link`: Ruta al archivo HTML
- `image`: Ruta a la imagen principal (debe estar en `images/`)
- `featured`: `true` para destacar en la página principal, `false` para no destacar

### 5. Subir al sitio

```bash
# Agregar cambios
git add Publicaciones/mi-nueva-publicacion.html posts.json images/mi-imagen.png

# Commit
git commit -m "Agregar nueva publicación: Título"

# Push
git push
```

¡Listo! Tu publicación aparecerá en el sitio en 1-2 minutos.

## 📋 Checklist

- [ ] Crear archivo HTML en `Publicaciones/`
- [ ] Agregar imágenes a `images/`
- [ ] Actualizar `posts.json` con la nueva publicación
- [ ] Verificar que todas las rutas de imágenes sean correctas
- [ ] Hacer commit y push

## 🎨 Tipos de publicación

### Difusión
```html
<span class="tipo-label tipo-difusion">Difusión</span>
```

### Académico
```html
<span class="tipo-label tipo-academico">Académico</span>
```

## 🖼️ Imágenes

- **Formato recomendado**: PNG o JPG
- **Tamaño**: Optimiza las imágenes antes de subirlas
- **Ubicación**: Todas las imágenes deben estar en `images/`
- **Rutas**: Usa rutas relativas desde el HTML: `../images/mi-imagen.png`

## 💡 Ejemplo completo

Ver `Publicaciones/paes-desigualdad.html` como referencia de una publicación completa.

## ❓ Problemas comunes

**Las imágenes no se ven:**
- Verifica que las imágenes estén en `images/`
- Verifica que las rutas en el HTML sean correctas (`../images/...`)

**La publicación no aparece en la lista:**
- Verifica que esté en `posts.json`
- Verifica que el `link` en `posts.json` coincida con la ruta del archivo HTML

**El diseño se ve mal:**
- Asegúrate de usar la estructura HTML correcta
- Verifica que todas las clases CSS estén presentes




