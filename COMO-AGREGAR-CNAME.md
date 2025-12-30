# Cómo Agregar el Registro CNAME en GoDaddy

## Ubicación del Botón

El botón para agregar registros puede estar en diferentes lugares:

### Opción 1: Botón en la parte superior
- Busca un botón que diga **"Add"**, **"Add New Record"**, **"Add Record"** o **"Añadir registro"**
- Generalmente está en la parte superior derecha de la tabla de registros DNS

### Opción 2: Menú desplegable
- Puede haber un botón con un **menú desplegable** (▼)
- Haz clic y selecciona **"CNAME"** de la lista

### Opción 3: Botón "+" o ícono de agregar
- Busca un botón con el símbolo **"+"** o un ícono de **"agregar"**
- Haz clic y selecciona **"CNAME"**

## Pasos Detallados:

1. **Haz clic en "Add New Record"** (o el botón equivalente)

2. **Selecciona el tipo de registro:**
   - Verás opciones como: A, AAAA, CNAME, MX, TXT, etc.
   - Selecciona **"CNAME"**

3. **Completa el formulario:**
   ```
   Type: CNAME
   Name: www
   Data/Value: matdknu.github.io
   TTL: 1 Hour
   ```

4. **Haz clic en "Save" o "Guardar"**

## Si No Encuentras la Opción:

### Verifica que estés en la sección correcta:
- Debes estar en **"DNS Records"** o **"DNS Management"**
- NO en "Forwarding", "Nameservers", u otras secciones

### La interfaz puede variar:
- Algunas versiones de GoDaddy tienen un formulario que aparece al hacer clic
- Otras tienen un menú desplegable con todos los tipos

### Captura de pantalla de referencia:
La interfaz debería verse similar a esto:

```
┌─────────────────────────────────────┐
│  DNS Records                        │
│  [Add New Record] ← Haz clic aquí   │
├─────────────────────────────────────┤
│ Type | Name | Data | TTL            │
│  A   |  @   | ...  | 1 Hour         │
│  NS  |  @   | ...  | 1 Hour         │
└─────────────────────────────────────┘
```

## Alternativa: Si la interfaz es diferente

Si tu interfaz de GoDaddy es diferente, busca:
- Un botón **"+"** o **"Add"**
- Un menú que diga **"Add Record"** o **"Añadir registro"**
- Una opción para **"Create new record"** o **"Crear nuevo registro"**

Una vez que encuentres cómo agregar registros, el proceso es el mismo: selecciona CNAME y completa los campos.

