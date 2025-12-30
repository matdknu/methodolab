# Pasos Exactos en GoDaddy DNS Management

## Lo que verás en tu pantalla:

```
DNS Records
Type | Name | Data | TTL
-----|------|------|-----
A    | @    | WebsiteBuilder Site | 1 Hour
NS   | @    | ns17.domaincontrol.com. | 1 Hour
NS   | @    | ns18.domaincontrol.com. | 1 Hour
```

## Pasos a seguir:

### Paso 1: Eliminar el registro A de WebsiteBuilder
1. Busca el registro que dice **Type: A** y **Data: WebsiteBuilder Site**
2. Haz clic en los **tres puntos** (⋯) o el **ícono de lápiz** al lado
3. Selecciona **Delete** o **Eliminar**
4. Confirma la eliminación

### Paso 2: Agregar 4 registros A nuevos

**Registro A #1:**
1. Haz clic en **"Add New Record"** o **"Add"**
2. Selecciona tipo **A**
3. En **Name**: escribe `@` o déjalo en blanco
4. En **Data** o **Value**: escribe `185.199.108.153`
5. En **TTL**: selecciona `1 Hour` (o el que prefieras)
6. Haz clic en **Save** o **Guardar**

**Repite para los otros 3:**
- Registro A #2: Data = `185.199.109.153`
- Registro A #3: Data = `185.199.110.153`
- Registro A #4: Data = `185.199.111.153`

### Paso 3: Agregar registro CNAME para www

1. Haz clic en **"Add New Record"**
2. Selecciona tipo **CNAME**
3. En **Name**: escribe `www`
4. En **Data** o **Value**: escribe `matdknu.github.io`
5. En **TTL**: selecciona `1 Hour`
6. Haz clic en **Save**

### Paso 4: Verificar

Tu lista final debería verse así:

```
Type  | Name | Data                      | TTL
------|------|---------------------------|----------
A     | @    | 185.199.108.153          | 1 Hour
A     | @    | 185.199.109.153          | 1 Hour
A     | @    | 185.199.110.153          | 1 Hour
A     | @    | 185.199.111.153          | 1 Hour
CNAME | www  | matdknu.github.io        | 1 Hour
NS    | @    | ns17.domaincontrol.com.  | 1 Hour
NS    | @    | ns18.domaincontrol.com.  | 1 Hour
```

## ⚠️ IMPORTANTE:
- **NO elimines** los registros NS (nameservers)
- **NO modifiques** los registros NS
- Solo elimina el registro A de "WebsiteBuilder Site"
- Agrega los 4 registros A nuevos y el CNAME para www

## Después de configurar DNS:

1. Ve a GitHub: https://github.com/matdknu/methodolab/settings/pages
2. En **Custom domain**, escribe: `methodolab.com`
3. Marca **Enforce HTTPS** (cuando esté disponible)
4. Guarda

¡Listo! Espera 15 minutos a 2 horas para que los cambios se propaguen.





