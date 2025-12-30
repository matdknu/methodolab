# Guía de Despliegue - methodolab.com

## Paso 1: Configurar GitHub Pages

1. Ve a tu repositorio en GitHub: https://github.com/matdknu/methodolab
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral, busca **Pages** (Páginas)
4. En **Source** (Fuente), selecciona:
   - Branch: `main`
   - Folder: `/ (root)`
5. Haz clic en **Save** (Guardar)

Tu sitio estará disponible temporalmente en:
`https://matdknu.github.io/methodolab`

## Paso 2: Configurar Dominio Personalizado (methodolab.com)

### Opción A: Si ya tienes el dominio methodolab.com

1. En la misma página de **Pages** en GitHub:
   - En la sección **Custom domain**, escribe: `methodolab.com`
   - Marca la casilla **Enforce HTTPS** (cuando esté disponible)
   - Haz clic en **Save**

2. Configura los registros DNS en GoDaddy:

   **Instrucciones para GoDaddy:**
   
   a. Inicia sesión en tu cuenta de GoDaddy
   b. Ve a **Mis Productos** → Busca tu dominio `methodolab.com` → Haz clic en **DNS** (o **Administrar DNS**)
   c. En la sección de registros DNS, necesitas agregar/modificar lo siguiente:
   
   **Para el dominio raíz (methodolab.com):**
   - Busca o crea un registro de tipo **A**
   - **Nombre/Host:** `@` (o déjalo en blanco, o `methodolab.com`)
   - **Valor/Puntos a:** `185.199.108.153`
   - **TTL:** 600 (o el valor por defecto)
   - Guarda
   - Repite para agregar 3 registros A más con los mismos valores:
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   
   **Para www (www.methodolab.com):**
   - Busca o crea un registro de tipo **CNAME**
   - **Nombre/Host:** `www`
   - **Valor/Puntos a:** `matdknu.github.io`
   - **TTL:** 600 (o el valor por defecto)
   - Guarda
   
   **Nota:** Si ya existen registros A o CNAME para estos nombres, edítalos en lugar de crear nuevos.
   
   **Elimina registros conflictivos:**
   - Si hay un registro A para `www`, elimínalo (el CNAME lo reemplazará)
   - Si hay registros A antiguos para el dominio raíz que no sean de GitHub, puedes eliminarlos después de agregar los nuevos

### Opción B: Si necesitas comprar el dominio

Si aún no tienes el dominio methodolab.com, puedes comprarlo en:
- **GoDaddy** (https://www.godaddy.com) - donde ya estás
- **Namecheap** (https://www.namecheap.com)
- **Cloudflare** (https://www.cloudflare.com/products/registrar)

## Paso 3: Verificar la Configuración

1. Espera unos minutos (puede tardar hasta 24 horas para que los DNS se propaguen)
2. Verifica que el archivo `CNAME` se haya creado automáticamente en tu repositorio
3. Visita `https://methodolab.com` para verificar que funciona

## Alternativas de Hosting

Si prefieres no usar GitHub Pages, aquí hay otras opciones:

### Netlify (Recomendado - Muy fácil)
1. Ve a https://www.netlify.com
2. Arrastra y suelta la carpeta del proyecto
3. O conecta tu repositorio de GitHub
4. Configura el dominio personalizado en la configuración

### Vercel
1. Ve a https://vercel.com
2. Conecta tu repositorio de GitHub
3. Despliega automáticamente
4. Configura el dominio en la configuración del proyecto

### Cloudflare Pages
1. Ve a https://pages.cloudflare.com
2. Conecta tu repositorio de GitHub
3. Configura el dominio personalizado

## Notas Importantes

- Los cambios en GitHub pueden tardar unos minutos en reflejarse en el sitio
- Si usas HTTPS, asegúrate de que esté habilitado en la configuración
- GitHub Pages es gratuito para repositorios públicos
- Para repositorios privados, necesitas GitHub Pro

## Solución de Problemas

**El sitio no carga:**
- Verifica que los DNS estén configurados correctamente
- Espera hasta 24 horas para la propagación completa de DNS
- Verifica que el archivo `index.html` esté en la raíz del repositorio

**El dominio no funciona:**
- Verifica que el archivo `CNAME` exista en la raíz del repositorio
- Asegúrate de que los registros DNS sean correctos
- Verifica que GitHub Pages esté habilitado

**HTTPS no funciona:**
- Espera unos minutos después de configurar el dominio
- GitHub Pages habilita HTTPS automáticamente después de verificar el dominio

