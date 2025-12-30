# ⚠️ URGENTE: Corregir Registros DNS en GoDaddy

## Problema Detectado

Los registros DNS actuales muestran:
- ❌ `methodolab.com` apunta a: `13.248.243.5` y `76.223.105.230` (IPs incorrectas de AWS/GoDaddy)
- ✅ `www.methodolab.com` apunta correctamente a: `matdknu.github.io`

## Solución Inmediata

### En GoDaddy DNS Management:

1. **Elimina TODOS los registros A existentes para `@` (methodolab.com)**
   - Busca registros con Type: A y Name: @
   - Elimina los que tienen valores como: `13.248.243.5` o `76.223.105.230`

2. **Agrega estos 4 registros A NUEVOS:**

   **Registro A #1:**
   - Type: **A**
   - Name: **@** (o déjalo en blanco)
   - Value: **185.199.108.153**
   - TTL: 1 Hour

   **Registro A #2:**
   - Type: **A**
   - Name: **@** (o déjalo en blanco)
   - Value: **185.199.109.153**
   - TTL: 1 Hour

   **Registro A #3:**
   - Type: **A**
   - Name: **@** (o déjalo en blanco)
   - Value: **185.199.110.153**
   - TTL: 1 Hour

   **Registro A #4:**
   - Type: **A**
   - Name: **@** (o déjalo en blanco)
   - Value: **185.199.111.153**
   - TTL: 1 Hour

3. **NO toques el CNAME de www** (ya está correcto)

## Verificación

Después de hacer los cambios, espera 5-10 minutos y verifica:

```bash
dig methodolab.com +short
```

Debería mostrar las 4 IPs de GitHub:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

## Tiempo de Propagación

- Los cambios pueden tardar entre **15 minutos y 24 horas** en propagarse
- GitHub verificará automáticamente cuando los DNS estén correctos
- Una vez correcto, verás un checkmark verde en GitHub Pages

## Estado Actual vs. Correcto

**❌ ACTUAL (Incorrecto):**
```
methodolab.com → 13.248.243.5, 76.223.105.230
```

**✅ CORRECTO (Debe ser):**
```
methodolab.com → 185.199.108.153
methodolab.com → 185.199.109.153
methodolab.com → 185.199.110.153
methodolab.com → 185.199.111.153
www.methodolab.com → matdknu.github.io (ya está bien)
```

