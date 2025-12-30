# Solución: DNS check unsuccessful en GitHub Pages

## El Problema

GitHub Pages muestra el error:
- "DNS check unsuccessful"
- "Domain does not resolve to the GitHub Pages server"

Esto significa que los registros DNS no están configurados correctamente o aún no se han propagado.

## Pasos para Solucionarlo

### Paso 1: Verificar los Registros DNS en GoDaddy

1. Ve a tu cuenta de GoDaddy
2. Ve a **DNS Management** para `methodolab.com`
3. Verifica que tengas EXACTAMENTE estos registros:

**Registros A (4 registros):**
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

**Registro CNAME:**
```
Type: CNAME
Name: www
Value: matdknu.github.io
TTL: 1 Hour
```

### Paso 2: Verificar la Propagación DNS

Usa estas herramientas para verificar si los DNS se han propagado:

1. **What's My DNS**: https://www.whatsmydns.net/#A/methodolab.com
   - Debería mostrar las 4 IPs de GitHub: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153

2. **DNS Checker**: https://dnschecker.org/#A/methodolab.com
   - Verifica la propagación global

3. **Desde tu terminal** (opcional):
   ```bash
   dig methodolab.com +short
   ```
   Debería mostrar las 4 IPs de GitHub.

### Paso 3: Verificar el CNAME

```bash
dig www.methodolab.com +short
```
Debería mostrar: `matdknu.github.io`

### Paso 4: Problemas Comunes y Soluciones

#### Problema 1: Los registros A no están correctos
**Solución:** 
- Elimina todos los registros A existentes para `@`
- Agrega los 4 registros A nuevos con las IPs de GitHub
- Asegúrate de que el Name sea `@` o esté en blanco

#### Problema 2: Hay registros A antiguos
**Solución:**
- Elimina cualquier registro A que no sea de GitHub (185.199.108.x, 185.199.109.x, 185.199.110.x, 185.199.111.x)
- Elimina registros A para `www` (debe ser CNAME, no A)

#### Problema 3: El CNAME está mal configurado
**Solución:**
- Verifica que el Name sea exactamente `www` (sin punto al final)
- Verifica que el Value sea exactamente `matdknu.github.io` (sin punto al final, sin http://)

#### Problema 4: Los DNS aún no se han propagado
**Solución:**
- Espera entre 15 minutos y 24 horas
- Los cambios DNS pueden tardar tiempo en propagarse globalmente
- Verifica periódicamente con las herramientas de arriba

### Paso 5: Verificar en GitHub

1. Ve a: https://github.com/matdknu/methodolab/settings/pages
2. En **Custom domain**, asegúrate de que diga: `methodolab.com`
3. Marca **Enforce HTTPS** (cuando esté disponible)
4. Guarda

### Paso 6: Esperar la Verificación

Después de configurar correctamente los DNS:
- GitHub puede tardar hasta 24 horas en verificar el dominio
- Una vez verificado, verás un checkmark verde
- El sitio estará disponible en `https://methodolab.com`

## Verificación Rápida

Ejecuta estos comandos para verificar:

```bash
# Verificar registros A
dig methodolab.com +short

# Verificar CNAME
dig www.methodolab.com CNAME +short

# Verificar ambos
nslookup methodolab.com
nslookup www.methodolab.com
```

## Si Aún No Funciona Después de 24 Horas

1. **Verifica que GitHub Pages esté habilitado:**
   - Settings → Pages → Source: `main` branch, `/ (root)`

2. **Verifica que el archivo CNAME exista:**
   - Debería estar en la raíz del repositorio
   - Contenido: `methodolab.com` (sin www, sin http://)

3. **Elimina y vuelve a agregar el dominio en GitHub:**
   - Elimina el dominio personalizado
   - Espera 5 minutos
   - Vuelve a agregarlo

4. **Contacta a GoDaddy:**
   - Si los DNS no se propagan después de 24 horas, puede haber un problema con GoDaddy

## Notas Importantes

- ⚠️ **NO** agregues `www` al dominio personalizado en GitHub, solo `methodolab.com`
- ⚠️ **NO** uses `http://` o `https://` en los registros DNS
- ⚠️ **NO** agregues puntos al final de los valores
- ✅ El dominio raíz (`methodolab.com`) usa registros A
- ✅ El subdominio (`www.methodolab.com`) usa CNAME

