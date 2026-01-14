# Configuración de DNS en GoDaddy para methodolab.com

## Pasos Detallados para GoDaddy

### 1. Acceder a la Configuración DNS

1. Inicia sesión en tu cuenta de GoDaddy: https://www.godaddy.com
2. Ve a **Mis Productos** (My Products)
3. Busca el dominio `methodolab.com`
4. Haz clic en el botón **DNS** o **Administrar DNS** (Manage DNS)

### 2. Configurar Registros A para el Dominio Raíz

Necesitas crear 4 registros A que apunten a las IPs de GitHub Pages:

**Registro A #1:**
- **Tipo:** A
- **Nombre/Host:** `@` (o déjalo en blanco)
- **Valor/Puntos a:** `185.199.108.153`
- **TTL:** 600 segundos (o el valor por defecto)
- Haz clic en **Agregar** o **Guardar**

**Registro A #2:**
- **Tipo:** A
- **Nombre/Host:** `@` (o déjalo en blanco)
- **Valor/Puntos a:** `185.199.109.153`
- **TTL:** 600 segundos
- Haz clic en **Agregar** o **Guardar**

**Registro A #3:**
- **Tipo:** A
- **Nombre/Host:** `@` (o déjalo en blanco)
- **Valor/Puntos a:** `185.199.110.153`
- **TTL:** 600 segundos
- Haz clic en **Agregar** o **Guardar**

**Registro A #4:**
- **Tipo:** A
- **Nombre/Host:** `@` (o déjalo en blanco)
- **Valor/Puntos a:** `185.199.111.153`
- **TTL:** 600 segundos
- Haz clic en **Agregar** o **Guardar**

### 3. Configurar Registro CNAME para www

**Registro CNAME:**
- **Tipo:** CNAME
- **Nombre/Host:** `www`
- **Valor/Puntos a:** `matdknu.github.io`
- **TTL:** 600 segundos (o el valor por defecto)
- Haz clic en **Agregar** o **Guardar**

### 4. Limpiar Registros Antiguos (si existen)

- Si hay registros A antiguos para `@` que no sean de GitHub (185.199.108.x), puedes eliminarlos
- Si hay un registro A para `www`, **elimínalo** (el CNAME lo reemplazará)
- No elimines otros registros importantes (MX para email, TXT para verificación, etc.)

### 5. Verificar en GitHub

1. Ve a: https://github.com/matdknu/methodolab/settings/pages
2. En **Custom domain**, escribe: `methodolab.com`
3. Marca **Enforce HTTPS** (cuando esté disponible)
4. Haz clic en **Save**

GitHub creará automáticamente un archivo `CNAME` en tu repositorio.

## Tiempo de Propagación

- Los cambios DNS pueden tardar entre **15 minutos y 24 horas** en propagarse
- Normalmente funciona en 1-2 horas
- Puedes verificar el estado en: https://www.whatsmydns.net/#A/methodolab.com

## Verificación

Una vez que los DNS se propaguen:

1. Visita `http://methodolab.com` (puede tardar unos minutos más)
2. GitHub habilitará HTTPS automáticamente
3. Después de unos minutos, `https://methodolab.com` debería funcionar

## Solución de Problemas

**Los registros A no se guardan:**
- Asegúrate de que el nombre sea `@` o esté en blanco
- Verifica que no haya registros duplicados

**El sitio no carga después de 2 horas:**
- Verifica que los registros DNS estén correctos usando: https://www.whatsmydns.net
- Asegúrate de que GitHub Pages esté habilitado
- Verifica que el archivo `CNAME` exista en tu repositorio

**HTTPS no funciona:**
- Espera hasta 24 horas después de configurar el dominio
- GitHub habilita HTTPS automáticamente, pero puede tardar

## Capturas de Pantalla de Referencia

La interfaz de GoDaddy puede variar, pero busca:
- Sección de **Registros DNS** o **DNS Records**
- Botón para **Agregar** o **Añadir registro**
- Campos: Tipo, Nombre/Host, Valor/Puntos a, TTL











