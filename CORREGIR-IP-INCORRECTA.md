# ⚠️ IP Incorrecta Detectada

## Problema

El DNS de `methodolab.com` está resolviendo a `25.26.27.28`, que **NO es una IP de GitHub Pages**.

Las IPs correctas de GitHub Pages son:
- ✅ 185.199.108.153
- ✅ 185.199.109.153
- ✅ 185.199.110.153
- ✅ 185.199.111.153

## Solución

### 1. Verificar Registros A en Cloudflare

Ve a Cloudflare → DNS → Records y verifica que **SOLO** existan estos 4 registros A para `@` (root):

1. **A** → `@` → `185.199.108.153` → DNS only (gris)
2. **A** → `@` → `185.199.109.153` → DNS only (gris)
3. **A** → `@` → `185.199.110.153` → DNS only (gris)
4. **A** → `@` → `185.199.111.153` → DNS only (gris)

### 2. Eliminar Registros Incorrectos

Si ves algún registro A con la IP `25.26.27.28` o cualquier otra IP que no sea una de las 4 arriba:
- **Elimínalo inmediatamente**

### 3. Verificar CNAME para www

Asegúrate de que el CNAME para `www` sea:
- **CNAME** → `www` → `matdknu.github.io` → DNS only (gris)

### 4. Esperar Propagación

Después de corregir los registros:
- Espera 15-30 minutos
- Verifica con: `dig methodolab.com A +short`
- Deberías ver las 4 IPs correctas de GitHub Pages

### 5. Refrescar en GitHub Pages

1. Ve a: https://github.com/matdknu/methodolab/settings/pages
2. Elimina `methodolab.com` del campo Custom domain
3. Guarda
4. Espera 2 minutos
5. Vuelve a agregar `methodolab.com`
6. Guarda

## Verificación

Ejecuta en tu terminal:
```bash
dig methodolab.com A +short
```

Deberías ver las 4 IPs de GitHub Pages, no `25.26.27.28`.

---

**Importante:** El certificado SSL no funcionará hasta que el DNS apunte correctamente a las IPs de GitHub Pages.


