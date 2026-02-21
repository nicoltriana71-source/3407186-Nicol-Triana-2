# 🛋️ DecoShop — Plataforma de Gestión de Muebles y Decoración

**Proyecto Semana 02 — Gestor de Colección**  
**Dominio asignado:** Venta de Muebles y Decoración

---

## ¿De qué trata mi dominio?

Mi dominio es una plataforma de **gestión de productos para una tienda de muebles y decoración**, es decir, una aplicación donde se pueden registrar, organizar y administrar productos del hogar como sofás, mesas, lámparas, cuadros y accesorios decorativos. Cada producto tiene un nombre, descripción, categoría, precio, stock disponible, nivel de prioridad de reposición y un estado activo o inactivo.

Este tipo de sistemas existen en el mundo real (como los paneles de administración de tiendas como IKEA, Homecenter o MercadoLibre) y permiten gestionar de forma eficiente un catálogo de productos con múltiples atributos.

---

## Estructura de archivos

```
week-2/
└── solution/
    └── scripts.js       → Lógica JavaScript (solución)
└── starter/
    ├── index.html        → Estructura HTML de la aplicación
    ├── styles.css        → Estilos visuales
    └── scripts.js        → Lógica JavaScript (problema)
```

---

## Adaptaciones realizadas al dominio

### 1. Entidad principal: Producto

En la plantilla genérica la entidad se llamaba "Elemento". Yo la reemplacé por **Producto**, que representa un artículo de mueblería o decoración disponible en la tienda.

Cada producto tiene estas propiedades específicas de mi dominio:

| Propiedad     | Tipo    | Descripción                                             |
|---------------|---------|---------------------------------------------------------|
| `id`          |
| `name`        | String  | Nombre del producto (ej. "Sofá Esquinero Roma")         |
| `description` | String  | Descripción del material, dimensiones y características |
| `category`    | String  | Tipo de producto (sala, dormitorio, decoración, etc.)   |
| `priority`    | String  | Nivel de urgencia de reposición (bajo / medio / alto)   |
| `precio`      | Number  | Precio de venta en pesos colombianos (COP)              |
| `stock`       | Number  | Unidades disponibles en inventario                      |
| `fechaIngreso`| String  | Fecha en que el producto ingresó al catálogo            |
| `active`      | Boolean | Si el producto está activo (visible en tienda) o no     |

---

### 2. Categorías de mi dominio (`CATEGORIES`)

Reemplacé las categorías genéricas por los **tipos de espacios y productos** más comunes en una tienda de muebles y decoración:

```javascript
const CATEGORIES = {
  dormitorio: { name: 'Dormitorio', emoji: '🛏️' },
  sala: { name: 'Sala', emoji: '🛋️' },
  comedor: { name: 'Comedor', emoji: '🍽️' },
  baño: { name: 'Baño', emoji: '🛁' },
};
```

Estas categorías aparecen en el formulario de creación, en los filtros y en las tarjetas de cada producto.

---

### 3. Niveles de prioridad de reposición (antes "Prioridad")

El campo `priority` lo usé para indicar qué tan urgente es reponer ese producto en el inventario, algo clave para la gestión de una tienda:

```javascript
const PRIORITIES = {
  high:   { name: 'Alta',  color: '#ef4444' },  // 🔴 Rojo   — agotamiento inminente
  medium: { name: 'Media', color: '#f59e0b' },  // 🟡 Amarillo — stock bajo
  low:    { name: 'Baja',  color: '#22c55e' },  // 🟢 Verde  — stock suficiente
};
```

El color del borde izquierdo de cada tarjeta cambia según la prioridad, dando una señal visual inmediata al administrador de la tienda.

---

### 4. Barra de stock disponible

Esta fue la adición más importante del dominio. Cada producto muestra una **barra de nivel de stock** que indica visualmente cuántas unidades quedan respecto a un máximo referencial (100 unidades):

```javascript
const porcentajeStock = Math.min(100, Math.round((stock / 100) * 100));
```

La barra usa un degradado de rojo a verde según la cantidad disponible. Esto es esencial en gestión de inventario porque el administrador necesita ver de un vistazo qué productos están por agotarse.

---

### 5. Función `formatPrecio()`

Agregué una función auxiliar para mostrar los precios en pesos colombianos con formato legible:

```javascript
const formatPrecio = numero => {
  if (!numero && numero !== 0) return '—';
  return '$' + Number(numero).toLocaleString('es-CO');
};
```

Ejemplo: `1500000` → `$1.500.000`

---

### 6. Estadísticas específicas del dominio

En `getStats()` agregué cálculos relevantes para la administración de una tienda de muebles:

```javascript
// Valor total del inventario (precio × stock de cada producto)
const valorInventario = itemsToAnalyze.reduce((acc, item) => {
  return acc + ((Number(item.precio) || 0) * (Number(item.stock) || 0));
}, 0);

// Total de unidades disponibles en inventario
const totalUnidades = itemsToAnalyze.reduce((acc, item) => {
  return acc + (Number(item.stock) || 0);
}, 0);
```

Estos números se muestran en la sección de **Estadísticas del Catálogo** al final de la página.

---

### 7. LocalStorage con key de dominio

Los datos se persisten en el navegador usando una clave específica del dominio para no mezclarlos con otros proyectos del curso:

```javascript
localStorage.getItem('decoshopProductos')
localStorage.setItem('decoshopProductos', JSON.stringify(itemsToSave))
```

---

### 8. Diseño visual (`styles.css`)

El diseño imita el de una tienda de decoración moderna:

- **Fondo:** Beige cálido `#f5f0eb` que evoca calidez del hogar y confianza
- **Cards:** Fondo blanco `#ffffff` con sombras suaves para destacar sobre el fondo
- **Color primario:** Terracota `#c0714f` — cálido y relacionado con el mundo del hogar
- **Borde lateral de tarjetas:** Cambia de color según la urgencia de reposición del producto
- **Barra de stock:** Degradado rojo→verde para mostrar disponibilidad de inventario

---

## Características ES2023 utilizadas

| Característica              | Dónde la usé                                                              |
|-----------------------------|---------------------------------------------------------------------------|
| **Spread operator** `...`   | `createItem()` para copiar objetos sin mutarlos, `applyFilters()` para encadenar resultados |
| **Rest / Default parameters** | `getStats(itemsToAnalyze = [])`, `applyFilters(filters = {})`           |
| **`Array.map()`**           | `updateItem()`, `toggleItemActive()`, `renderItems()`                    |
| **`Array.filter()`**        | `deleteItem()`, `clearInactive()`, todos los filtros por categoría y prioridad |
| **`Array.reduce()`**        | `getStats()` para calcular valor de inventario, unidades totales y totales por categoría |
| **`Array.find()`**          | `handleItemEdit()` para buscar el producto a editar                      |
| **Destructuring**           | `applyFilters()` para extraer filtros, `renderItem()` para extraer propiedades del producto |
| **Template literals**       | Todo el HTML dinámico en `renderItem()` y `renderStats()`                |
| **Operador `??`**           | `loadItems()`, valores por defecto en `createItem()`                     |
| **Optional chaining `?.`**  | `CATEGORIES[category]?.name`, `CATEGORIES[category]?.emoji`              |

---

## Inmutabilidad del estado

Nunca muto el array `items` directamente. Siempre creo arrays nuevos:

```javascript
// ✅ Correcto — creo un array nuevo con spread
const nuevosItems = [...items, nuevoProducto];

// ✅ Correcto — map devuelve un array nuevo
const itemsActualizados = items.map(item =>
  item.id === id ? { ...item, ...cambios } : item
);

// ❌ Nunca hago esto
items.push(nuevoProducto);
items[0].name = 'otro nombre';
```

---

## Cómo conectar los archivos

En el `index.html`, la última línea antes de `</body>` debe apuntar al archivo JavaScript correcto:

```html
<script src="./scripts.js"></script>
```

> ⚠️ Verificar que la ruta coincida con la ubicación real del archivo dentro de la carpeta del proyecto.

---

## Checklist de entrega

- [x] Categorías adaptadas al dominio de muebles y decoración
- [x] Campos adicionales: precio, stock, fecha de ingreso
- [x] CRUD completo: crear, leer, actualizar, eliminar
- [x] Toggle activo / inactivo por producto
- [x] Filtros por estado, categoría y prioridad de reposición
- [x] Búsqueda en tiempo real por nombre y descripción
- [x] Estadísticas del catálogo con valor total de inventario
- [x] Barra de stock disponible por producto
- [x] Persistencia con localStorage
- [x] Inmutabilidad del estado en todo el código
- [x] Comentarios en español, nomenclatura técnica en inglés
- [x] Uso de: spread, map, filter, reduce, find, destructuring, template literals
