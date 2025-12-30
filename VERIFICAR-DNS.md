# Verificación y Solución de DNS para methodolab.com

## Estado Actual

GitHub Pages muestra: "DNS check unsuccessful - Domain does not resolve to the GitHub Pages server"

## Verificación Rápida

Ejecuta estos comandos para verificar el estado actual:

```bash
# Verificar registros A
dig methodolab.com +short

# Verificar registros A específicamente
dig methodolab.com A +short

# Verificar con Google DNS
nslookup methodolab.com 8.8.8.8
```

## Lo que DEBE mostrar

Si los DNS están correctos, deberías ver estas 4 IPs de GitHub Pages:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

## Si NO muestra esas IPs

### Paso 1: Verificar en GoDaddy

1. Ve a tu cuenta de GoDaddy
2. DNS Management para `methodolab.com`
3. Verifica que tengas EXACTAMENTE estos 4 registros A:

```
Type: A
Name: @
Value: 185.199.108.153
TTL: 1 Hour

Type: A
Name: @
Value: 185.199.109.153
TTL: 1 Hour

Type: A
Name: @
Value: 185.199.110.153
TTL: 1 Hour

Type: A
Name: @
Value: 185.199.111.153
TTL: 1 Hour
```

### Paso 2: Eliminar Registros Incorrectos

- Elimina CUALQUIER registro A que NO sea de GitHub (185.199.108.x, 185.199.109.x, 185.199.110.x, 185.199.111.x)
- Elimina registros A para `www` (debe ser CNAME, no A)

### Paso 3: Verificar CNAME

Debe existir:

```
Type: CNAME
Name: www
Value: matdknu.github.io
TTL: 1 Hour
```

## Tiempo de Propagación

- Los cambios DNS pueden tardar **15 minutos a 24 horas**
- Normalmente funciona en **1-2 horas**
- Verifica el progreso en: https://www.whatsmydns.net/#A/methodolab.com

## Verificación en GitHub

1. Ve a: https://github.com/matdknu/methodolab/settings/pages
2. En **Custom domain**, debe decir: `methodolab.com` (sin www, sin http://)
3. Marca **Enforce HTTPS** cuando esté disponible
4. Guarda

## Solución Alternativa: Usar Solo CNAME

Si los registros A no funcionan, puedes intentar usar solo CNAME:

1. Elimina todos los registros A para `@`
2. Crea un CNAME para `@` apuntando a `matdknu.github.io`
3. Nota: Algunos proveedores no permiten CNAME en el dominio raíz

## Verificación Final

Después de configurar correctamente, espera 1-2 horas y verifica:

```bash
dig methodolab.com +short
```

Debería mostrar las 4 IPs de GitHub.

## Si Aún No Funciona Después de 24 Horas

1. **Verifica que el archivo CNAME existe en tu repositorio:**
   - Debe estar en la raíz: `/CNAME`
   - Contenido: `methodolab.com` (sin www, sin http://)

2. **Elimina y vuelve a agregar el dominio en GitHub:**
   - Elimina el dominio personalizado
   - Espera 5 minutos
   - Vuelve a agregarlo

3. **Contacta a GoDaddy:**
   - Si los DNS no se propagan después de 24 horas, puede haber un problema con GoDaddy

## Herramientas de Verificación

- **What's My DNS**: https://www.whatsmydns.net/#A/methodolab.com
- **DNS Checker**: https://dnschecker.org/#A/methodolab.com
- **MXToolbox**: https://mxtoolbox.com/SuperTool.aspx?action=a%3amethodolab.com





