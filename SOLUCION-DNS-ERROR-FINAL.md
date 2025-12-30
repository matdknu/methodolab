# Solución: DNS Check Unsuccessful - NotServedByPagesError

## Problema

GitHub Pages reporta:
- **DNS check unsuccessful**
- **Domain does not resolve to the GitHub Pages server**
- **NotServedByPagesError**

Esto significa que los registros DNS en GoDaddy no están apuntando correctamente a los servidores de GitHub Pages.

## Solución Paso a Paso

### Paso 1: Verificar Registros DNS Actuales en GoDaddy

1. Ve a tu cuenta de GoDaddy
2. Ve a **DNS Management** para `methodolab.com`
3. Revisa todos los registros **A** para `@` (dominio raíz)

### Paso 2: Eliminar TODOS los Registros A Incorrectos

**IMPORTANTE:** Debes tener **SOLO** estos 4 registros A para `@`:

```
A    @    185.199.108.153
A    @    185.199.109.153
A    @    185.199.110.153
A    @    185.199.111.153
```

**Elimina cualquier otro registro A** que apunte a:
- IPs de AWS
- IPs de GoDaddy (como 25.25.25.25)
- Cualquier otra IP que no sea una de las 4 de arriba

### Paso 3: Verificar el Registro CNAME para www

Debe existir **SOLO** este registro CNAME:

```
CNAME    www    matdknu.github.io.
```

**NO debe haber un registro A para `www`** - solo el CNAME.

### Paso 4: Configuración Correcta Completa

Tu configuración DNS en GoDaddy debe verse así:

#### Registros A (para @):
```
A    @    185.199.108.153    TTL: 1 Hour
A    @    185.199.109.153    TTL: 1 Hour
A    @    185.199.110.153    TTL: 1 Hour
A    @    185.199.111.153    TTL: 1 Hour
```

#### Registro CNAME (para www):
```
CNAME    www    matdknu.github.io.    TTL: 1 Hour
```

#### Otros registros (pueden quedarse):
- NS (nameservers) - no tocar
- MX (email) - no tocar
- TXT (SPF, DMARC) - no tocar
- Otros CNAME (email, etc.) - no tocar

### Paso 5: Esperar Propagación DNS

Después de hacer los cambios:

1. **Espera 15-60 minutos** para que los cambios se propaguen
2. Verifica en: https://www.whatsmydns.net/#A/methodolab.com
3. Deberías ver las 4 IPs de GitHub Pages en la mayoría de servidores DNS

### Paso 6: Verificar en GitHub Pages

1. Ve a: https://github.com/matdknu/methodolab/settings/pages
2. En la sección **Custom domain**, deberías ver:
   - Un checkmark verde ✅ cuando el DNS esté correcto
   - La opción para activar "Enforce HTTPS" (después de la verificación)

## Verificación Rápida

Ejecuta estos comandos para verificar:

```bash
# Verificar registros A del dominio raíz
dig methodolab.com A +short

# Debería mostrar las 4 IPs:
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153

# Verificar CNAME de www
dig www.methodolab.com CNAME +short

# Debería mostrar:
# matdknu.github.io.
```

## Errores Comunes

### ❌ Error: "Record name www conflicts with another record"
**Solución:** Elimina el registro A para `www` antes de agregar el CNAME.

### ❌ Error: Múltiples registros A con IPs incorrectas
**Solución:** Elimina TODOS los registros A que no sean las 4 IPs de GitHub Pages.

### ❌ Error: DNS aún no se propaga después de 1 hora
**Solución:** 
- Verifica que los cambios se guardaron en GoDaddy
- Espera hasta 24 horas (puede tardar)
- Verifica en múltiples herramientas: https://dnschecker.org/#A/methodolab.com

## Si Después de 24 Horas Aún No Funciona

1. **Elimina el dominio personalizado en GitHub Pages:**
   - Ve a Settings → Pages
   - Elimina `methodolab.com` del campo Custom domain
   - Guarda

2. **Espera 5 minutos**

3. **Vuelve a agregar el dominio:**
   - Agrega `methodolab.com` de nuevo
   - Guarda

4. **Espera otras 24 horas**

## Contacto

Si después de seguir todos estos pasos el problema persiste, contacta el soporte de GitHub Pages con:
- Capturas de pantalla de tus registros DNS en GoDaddy
- Resultados de `dig methodolab.com A +short`
- Resultados de `dig www.methodolab.com CNAME +short`

