# Methodolab Website

Sitio web oficial de Methodolab - Laboratorio de Metodología en Ciencias Sociales.

## Estructura del Proyecto

```
methodolab/
├── index.html          # Página principal
├── css/
│   └── style.css      # Estilos principales
├── js/
│   └── main.js        # JavaScript para interactividad
├── images/            # Imágenes y recursos visuales
└── README.md          # Este archivo
```

## Características

- Diseño moderno y responsive
- Navegación suave entre secciones
- Menú móvil adaptativo
- Animaciones sutiles
- Optimizado para SEO

## Secciones

1. **Inicio (Hero)**: Presentación principal del laboratorio
2. **Sobre Nosotros**: Información sobre Methodolab
3. **Investigación**: Líneas de investigación
4. **Publicaciones**: Publicaciones académicas
5. **Recursos**: Código, documentación y tutoriales
6. **Contacto**: Información de contacto

## Desarrollo Local

Para ver el sitio localmente, simplemente abre `index.html` en tu navegador o usa un servidor local:

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (http-server)
npx http-server

# Con PHP
php -S localhost:8000
```

Luego visita `http://localhost:8000` en tu navegador.

## Despliegue a methodolab.com

El sitio está configurado para desplegarse en GitHub Pages. Para verlo en methodolab.com:

1. **Habilita GitHub Pages:**
   - Ve a Settings → Pages en tu repositorio
   - Selecciona branch `main` y folder `/ (root)`
   - Guarda los cambios

2. **Configura el dominio personalizado:**
   - En la misma página de Pages, agrega `methodolab.com` en Custom domain
   - Configura los registros DNS en tu proveedor de dominio

Para instrucciones detalladas, consulta [DEPLOY.md](DEPLOY.md).

**URL temporal:** https://matdknu.github.io/methodolab

## Personalización

### Colores

Los colores principales se pueden modificar en `css/style.css` en la sección `:root`:

```css
:root {
    --primary-color: #2563eb;
    --primary-dark: #1e40af;
    /* ... más variables */
}
```

### Contenido

Edita el contenido directamente en `index.html`. Cada sección está claramente marcada con IDs.

## Próximos Pasos

- [ ] Agregar imágenes reales
- [ ] Configurar formulario de contacto
- [ ] Integrar con backend si es necesario
- [ ] Agregar más publicaciones
- [ ] Configurar analytics
- [ ] Optimizar para producción

## Licencia

© 2024 Methodolab. Todos los derechos reservados.

