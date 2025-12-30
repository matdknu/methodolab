# Pasos para Configurar Cloudflare con GitHub Pages

## Paso 1: Ir a la Sección DNS

1. En el menú lateral izquierdo, haz clic en **"DNS"**
2. Verás la lista de registros DNS

## Paso 2: Verificar y Configurar los Registros

Debes tener estos registros configurados así:

### Registros A (4 registros para el dominio raíz):

```
Type: A
Name: @ (o methodolab.com)
Content: 185.199.108.153
Proxy status: DNS only (icono GRIS, NO naranja)
TTL: Auto

Type: A
Name: @
Content: 185.199.109.153
Proxy status: DNS only (GRIS)

Type: A
Name: @
Content: 185.199.110.153
Proxy status: DNS only (GRIS)

Type: A
Name: @
Content: 185.199.111.153
Proxy status: DNS only (GRIS)
```

### Registro CNAME (para www):

```
Type: CNAME
Name: www
Content: matdknu.github.io
Proxy status: DNS only (icono GRIS, NO naranja)
TTL: Auto
```

## Paso 3: Cambiar de Proxied a DNS Only

Si ves que algún registro tiene el icono **NARANJA** (Proxied):

1. Haz clic en el registro
2. Busca el botón o switch que dice "Proxied" o tiene un icono naranja
3. Cámbialo a **"DNS only"** (icono gris)
4. Guarda los cambios

**IMPORTANTE**: Todos los registros deben estar en modo **DNS only (gris)**, NO en modo **Proxied (naranja)**.

## Paso 4: Configurar SSL/TLS

1. En el menú lateral, ve a **"SSL/TLS"**
2. En la sección **"Overview"**, configura:
   - **SSL/TLS encryption mode**: **Flexible** o **Full**
   - **Recomendación**: Empieza con **Flexible** para evitar problemas

## Paso 5: Verificar en GitHub Pages

Después de hacer los cambios:

1. Espera 15-30 minutos para que los cambios se propaguen
2. Ve a: https://github.com/matdknu/methodolab/settings/pages
3. Refresca el dominio:
   - Elimina `methodolab.com` del campo Custom domain
   - Guarda
   - Espera 2 minutos
   - Vuelve a agregar `methodolab.com`
   - Guarda
4. Espera a que GitHub Pages verifique el dominio (puede tardar 15-30 minutos)

## Verificación

Para verificar que está funcionando correctamente:

```bash
# Verificar que las IPs son de GitHub Pages (no de Cloudflare)
dig methodolab.com A +short

# Debería mostrar las 4 IPs de GitHub Pages:
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153

# NO debería mostrar IPs de Cloudflare (como 104.x.x.x o 172.x.x.x)
```

## ¿Por qué es importante?

- **Proxied (naranja)**: Cloudflare oculta las IPs reales → GitHub Pages no puede verificar el dominio
- **DNS only (gris)**: Cloudflare solo maneja DNS → GitHub Pages puede verificar correctamente

## Nota

Si después de configurar todo correctamente aún hay problemas, puedes considerar:
- Pausar Cloudflare temporalmente
- O eliminar el dominio de Cloudflare y usar DNS directamente en GoDaddy

Pero primero intenta con DNS only (gris) - debería funcionar.



