# Cambiar Registros de Proxied a DNS Only en Cloudflare

## Problema Actual

Todos tus registros A están en modo **"Proxied"** (naranja), lo cual causa problemas con GitHub Pages.

## Solución: Cambiar a DNS Only

### Paso 1: Cambiar cada Registro A

Para cada uno de los 4 registros A:

1. Haz clic en el botón **"Edit"** del registro
2. Verás que aparece una fila adicional debajo con opciones de edición
3. Busca el switch/botón que dice **"Proxied"** (debe estar en naranja/activado)
4. **Haz clic para desactivarlo** - debe cambiar a **"DNS only"** (gris)
5. Haz clic en **"Save"** o presiona Enter

Repite esto para los 4 registros A:
- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

### Paso 2: Verificar el CNAME para www

1. En la lista de registros DNS, busca si existe un registro CNAME para `www`
2. Si **NO existe**, créalo:
   - Haz clic en **"Add record"**
   - Tipo: **CNAME**
   - Name: **www**
   - Target: **matdknu.github.io**
   - Proxy status: **DNS only** (gris, NO Proxied)
   - TTL: **Auto**
   - Haz clic en **"Save"**
3. Si **SÍ existe** pero está en modo Proxied, cámbialo a DNS only (igual que los registros A)

### Paso 3: Resultado Final

Después de hacer los cambios, todos los registros deben verse así:

```
A    methodolab.com    185.199.108.153    DNS only (gris)    Auto
A    methodolab.com    185.199.109.153    DNS only (gris)    Auto
A    methodolab.com    185.199.110.153    DNS only (gris)    Auto
A    methodolab.com    185.199.111.153    DNS only (gris)    Auto
CNAME www              matdknu.github.io  DNS only (gris)    Auto
```

**IMPORTANTE**: Todos deben estar en **"DNS only"** (gris), NO en **"Proxied"** (naranja).

### Paso 4: Esperar Propagación

Después de hacer los cambios:
1. Espera **15-30 minutos** para que los cambios se propaguen
2. Los registros ahora apuntarán directamente a GitHub Pages (no a través del proxy de Cloudflare)

### Paso 5: Refrescar en GitHub Pages

1. Ve a: https://github.com/matdknu/methodolab/settings/pages
2. En la sección **Custom domain**:
   - Elimina `methodolab.com` del campo
   - Guarda
   - Espera 2 minutos
   - Vuelve a agregar `methodolab.com`
   - Guarda
3. Espera 15-30 minutos para que GitHub Pages verifique el dominio

## Verificación

Para verificar que funcionó:

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

## Nota sobre DNSSEC

El mensaje sobre DNSSEC es normal y no afecta el funcionamiento. Puedes ignorarlo por ahora o configurarlo más tarde si lo necesitas.



