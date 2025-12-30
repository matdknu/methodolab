# Solución: "Record name www conflicts with another record"

## El Problema

GoDaddy está mostrando este error porque **ya existe un registro para `www`** (probablemente un registro A) y no puedes tener dos registros con el mismo nombre de tipos diferentes.

## Solución: Eliminar el Registro Existente

### Paso 1: Encontrar el Registro Conflicto

En tu lista de registros DNS, busca uno que tenga:
- **Name:** `www`
- **Type:** Probablemente `A` o `AAAA`

Puede verse así:
```
Type | Name | Data                    | TTL
-----|------|-------------------------|-----
A    | www  | [alguna IP o dirección] | 1 Hour
```

### Paso 2: Eliminar el Registro

1. Encuentra la fila con **Name: www**
2. Haz clic en los **tres puntos** (⋯) o el **ícono de lápiz** al final de esa fila
3. Selecciona **"Delete"** o **"Eliminar"**
4. Confirma la eliminación

### Paso 3: Agregar el CNAME

Ahora que eliminaste el registro conflictivo:

1. Haz clic en **"Add New Record"**
2. Selecciona tipo **CNAME**
3. Completa:
   - **Name:** `www`
   - **Value/Data:** `matdknu.github.io`
   - **TTL:** `1 Hour`
4. Haz clic en **Save**

## ¿Por qué pasa esto?

- No puedes tener un registro **A** y un registro **CNAME** con el mismo nombre (`www`)
- Debes elegir uno u otro
- Para GitHub Pages, necesitas el **CNAME**, no el A

## Verificación Final

Después de eliminar y agregar, tu lista debería mostrar:

```
Type  | Name | Data                  | TTL
------|------|-----------------------|-----
A     | @    | 185.199.108.153      | 1 Hour
A     | @    | 185.199.109.153      | 1 Hour
A     | @    | 185.199.110.153      | 1 Hour
A     | @    | 185.199.111.153      | 1 Hour
CNAME | www  | matdknu.github.io    | 1 Hour  ← Este es el nuevo
NS    | @    | ns17.domaincontrol...| 1 Hour
NS    | @    | ns18.domaincontrol...| 1 Hour
```

**NO debe haber ningún registro A para `www`.**

## Si Aún Tienes Problemas

Si después de eliminar el registro A para www sigues viendo el error:

1. **Refresca la página** de DNS Management
2. Verifica que el registro A para www haya sido eliminado
3. Intenta agregar el CNAME nuevamente





