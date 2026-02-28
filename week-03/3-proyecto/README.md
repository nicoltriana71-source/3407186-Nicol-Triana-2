# 🌸 Nicolasse — Sistema de Gestión de Muebles y Decoración

> Sistema web de gestión de inventario para muebles, desarrollado con **Programación Orientada a Objetos (POO)** en JavaScript ES2023.

---

## 📁 Estructura del Proyecto

```
3-proyecto/
├── index.html        # Interfaz principal de la aplicación
├── styles.css        # Estilos con tema pastel rosado y lila
└── starter/
    └── script.js     # Lógica del sistema con clases ES2023
```

---

## 🧩 Arquitectura de Clases

### Jerarquía de Herencia

```
BaseItem (clase base abstracta)
├── Couch         → Sofás y asientos
├── Mirror        → Espejos decorativos
└── Bed           → Camas y bases

Person (clase base de usuarios)
├── Customer      → Clientes del sistema
└── Admin         → Administradores

MainSystem        → Clase principal del sistema
```

### `BaseItem` — Clase Base
Campos privados encapsulados con `#`:

| Campo       | Tipo      | Descripción                     |
|-------------|-----------|----------------------------------|
| `#id`       | `string`  | UUID generado automáticamente    |
| `#name`     | `string`  | Nombre del elemento              |
| `#description` | `string` | Descripción del mueble         |
| `#category` | `string`  | Categoría (Sala, Baño, etc.)     |
| `#priority` | `string`  | Prioridad del elemento           |
| `#dimension`| `string`  | Dimensiones físicas              |
| `#color`    | `string`  | Color del mueble                 |
| `#material` | `string`  | Material principal               |
| `#active`   | `boolean` | Estado activo/inactivo           |
| `#createdAt`| `string`  | Fecha de creación (ISO)          |
| `#updatedAt`| `string`  | Fecha de última actualización    |

**Métodos principales:**
- `activate()` / `deactivate()` — Cambia el estado del elemento
- `getInfo()` — Abstracto, implementado en cada clase hija
- `getType()` — Retorna el nombre de la clase

---

### Clases Derivadas

#### `Couch` — Sofás
```js
new Couch(name, description, category, priority, dimension, color, material, fabricType)
```
- `fabricType` → Tipo de tela (Lino, Cuero, etc.)

#### `Mirror` — Espejos
```js
new Mirror(name, description, category, priority, dimension, color, material, style, frameType)
```
- `style` → Estilo visual (Moderno, Clásico...)
- `frameType` → Tipo de marco (Circular, Rectangular...)

#### `Bed` — Camas
```js
new Bed(name, description, category, priority, dimension, color, material, bedType)
```
- `bedType` → Tamaño de la cama (Queen, King, Individual...)

---

### `Person` y Roles

#### `Customer` — Cliente
- `#purchaseCount` — Contador de compras
- `#favoriteCategory` — Categoría favorita
- `addPurchase()` — Incrementa el contador

#### `Admin` — Administrador
- `#permissions` — Lista de permisos
- `#lastLogin` — Último inicio de sesión
- `login()` — Registra el momento del login

---

### `MainSystem` — Sistema Principal

```js
const system = new MainSystem();
```

| Método                    | Descripción                          |
|---------------------------|--------------------------------------|
| `addItem(item)`           | Agrega un elemento al catálogo       |
| `removeItem(id)`          | Elimina un elemento por ID           |
| `findItem(id)`            | Busca un elemento por ID             |
| `getAllItems()`            | Retorna todos los elementos          |
| `searchByName(query)`     | Búsqueda case-insensitive por nombre |
| `filterByType(type)`      | Filtra por tipo de clase             |
| `filterByStatus(active)`  | Filtra por estado activo/inactivo    |
| `getStats()`              | Retorna estadísticas del sistema     |
| `addUser(user)`           | Registra un usuario                  |
| `findUserByEmail(email)`  | Busca un usuario por email           |

**Propiedades estáticas:**
```js
MainSystem.VERSION       // '1.0.0'
MainSystem.MAX_ITEMS     // 1000
MainSystem.SYSTEM_NAME   // 'Sistema de Muebles y Decoración'
```

---

## 🖥️ Interfaz

La aplicación cuenta con **4 pestañas** de navegación:

| Pestaña         | Descripción                                      |
|-----------------|--------------------------------------------------|
| 📋 Catálogo     | Lista de muebles con filtros y búsqueda          |
| 🙎🏻‍♀️ Usuarios    | Gestión de clientes y administradores            |
| 🔄 Transacciones | Historial de operaciones                        |
| 📊 Estadísticas | Totales, activos, inactivos y desglose por tipo  |

### Funcionalidades del Catálogo
- 🔍 **Búsqueda** en tiempo real por nombre
- 🗂️ **Filtro** por tipo de mueble (Couch / Mirror / Bed)
- ✅ **Filtro** por estado (Activo / Inactivo)
- ➕ **Agregar** nuevos elementos desde el formulario
- 🔄 **Activar / Desactivar** elementos individuales
- 🗑️ **Eliminar** con confirmación

---

## ⚙️ Características ES2023 Implementadas

- ✅ Campos privados con `#`
- ✅ Getters y setters con validación
- ✅ Herencia con `extends` y `super()`
- ✅ Método abstracto `getInfo()` en clases hijas
- ✅ Static block en `MainSystem`
- ✅ Métodos estáticos de utilidad
- ✅ `crypto.randomUUID()` para generación de IDs
- ✅ Operador nullish coalescing `??`
- ✅ Spread operator `...` en getters de colecciones

---

## 🚀 Cómo Ejecutar

1. Clona o descarga el proyecto
2. Abre `index.html` en el navegador (o usa Live Server en VS Code)
3. No requiere instalación de dependencias

```bash
# Con Live Server (recomendado)
# Click derecho en index.html → "Open with Live Server"
```

---

## 🎨 Diseño Visual

El proyecto usa un tema **pastel suave** con:
- 🌸 Fondo degradado rosado (`#fdf0f5`) y lila (`#ede0f7`)
- Tipografía *Playfair Display* para títulos y *DM Sans* para cuerpo
- Tarjetas con efecto glassmorphism y sombras suaves
- Botones con gradiente rosado → lila
- Animaciones sutiles en hover y entrada de elementos

---

## 📌 Convenciones de Código

- **Comentarios** → En español
- **Nomenclatura técnica** (clases, variables, métodos) → En inglés
- **Validaciones** → En setters de cada clase
- **Inmutabilidad de colecciones** → Se retornan copias con spread (`[...array]`)