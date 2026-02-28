/**
 * ============================================
 * PROYECTO SEMANA 03 - SISTEMA DE GESTIÓN CON POO
 * Archivo inicial para el aprendiz
 * ============================================
 *
 * INSTRUCCIONES:
 * 1. Lee el README.md del proyecto para entender los requisitos
 * 2. Adapta TODAS las clases a tu dominio asignado por el instructor
 * 3. Usa características ES2023 de POO:
 *    - Clases con constructor
 *    - Campos privados (#)
 *    - Getters y setters
 *    - Herencia (extends, super)
 *    - Métodos estáticos
 *    - Static blocks
 * 4. Los comentarios deben estar en español
 * 5. La nomenclatura técnica (variables, funciones, clases) en inglés
 *
 * NOTA IMPORTANTE:
 * Este archivo es una PLANTILLA GENÉRICA.
 * Debes adaptarlo completamente a tu dominio asignado.
 * NO copies la implementación de otro compañero.
 *
 * EJEMPLO DE REFERENCIA (NO es un dominio asignable):
 * Planetario - Gestión de cuerpos celestes y observaciones
 *
 * ============================================
 */

// ============================================
// TODO 1: CLASE BASE - BaseItem
// ============================================
/**
 * Clase base abstracta para todos los elementos de tu dominio.
 * Implementa encapsulación con campos privados.
 *
 * EJEMPLO (Planetario - NO asignable):
 * class CelestialBody { ... }
 *
 * Debes renombrar esta clase según tu dominio:
 * - Biblioteca → LibraryItem
 * - Farmacia → Medicine
 * - Gimnasio → Equipment
 * - etc.
 */
class BaseItem {
  // TODO: Declara los campos privados de tu clase base

   #id;
   #name;
   #description;
   #category;
   #priority;
   #active;
   #createdAt;
   #updatedAt;
   #dimension;
   #color;
   #material;
   
  //
  // EJEMPLO Planetario - campos adicionales específicos:
  // #magnitude;
  // #distance;

  /**
   * Constructor de la clase base
   * @param {string} name - Nombre del elemento
   * @param {string} location - Ubicación del elemento
   */
  constructor(name, description, category, priority, dimension, color, material) {
       this.#id = crypto.randomUUID();
       this.#name = name;
       this.#description = description;
       this.#category = category;
       this.#priority = priority;
       this.#active = true;
       this.#createdAt = new Date().toISOString();
       this.#updatedAt = new Date().toISOString();
       this.#dimension = this.dimension;
       this.#color = color;
       this.#material = this.material;
  }

  // ============================================
  // GETTERS - Acceso controlado a propiedades
  // ============================================

  get id() {
    // TODO: Implementa el getter
     return this.#id;
  }


  get name() {
    // TODO: Implementa el getter
    return this.#name;
  }

  
  get isActive() {
    // TODO: Implementa el getter
    return this.#active;
  }

 
  get description() {
    // TODO: Implementa el getter
    return this.#description;
  }

   get category() {
    // TODO: Implementa el getter
    return this.#category;
  }

    get priority() {
    // TODO: Implementa el getter
    return this.#priority;
  }

  
  get createdAt() {
    // TODO: Implementa el getter
    return this.#createdAt;
  }

   get updatedAt() {
    // TODO: Implementa el getter
    return this.#updatedAt;
  }

   get dimension() {
    // TODO: Implementa el getter
    return this.#dimension;
  }

   get color() {
    // TODO: Implementa el getter
    return this.#color;
  }
  
  get material() {
    // TODO: Implementa el getter
    return this.#material;
  }

  // ============================================
  // SETTERS - Modificación controlada con validación
  // ============================================

  /**
   * Establece la ubicación con validación
   * @param {string} value - Nueva ubicación
   */
  set name(value) {
     if (!value || value.trim() === '') {
       throw new Error('El nombre es obligatorio');
     }
     this.#name = value.trim();
  }

  set description(value) {
     if (!value || value.trim() === '') {
       throw new Error('La descripcion es obligatoria');
     }
     this.#description = value.trim();
  }

  set category(value) {
     if (!value || value.trim() === '') {
       throw new Error('La categoria es obligatoria');
     }
     this.#category = value.trim();
  }

  set priority(value) {
     if (!value || value.trim() === '') {
       throw new Error('La prioridad es obligatoria');
     }
     this.#priority = value.trim();
  }

  set dimension(value) {
     if (!value || value.trim() === '') {
       throw new Error('La dimension es obligatoria');
     }
     this.#dimension = value.trim();
  }

  set color(value) {
     if (!value || value.trim() === '') {
       throw new Error('El color es obligatorio');
     }
     this.#color = value.trim();
  }

  set material(value) {
     if (!value || value.trim() === '') {
       throw new Error('El material es obligatorio');
     }
     this.#material = value.trim();
  }

  // ============================================
  // MÉTODOS DE INSTANCIA
  // ============================================

  activate() {
  if (this.#active) {
    return { success: false, message: 'El elemento ya está activo' };
  }

  this.#active = true;
  this.#updatedAt = new Date().toISOString();

  return { success: true, message: 'Elemento activado correctamente' };
}

deactivate() {
  if (!this.#active) {
    return { success: false, message: 'El elemento ya está inactivo' };
  }

  this.#active = false;
  this.#updatedAt = new Date().toISOString();

  return { success: true, message: 'Elemento desactivado correctamente' };
}
    

  getInfo() {
    throw new Error('El método getInfo() debe ser implementado en la clase hija');
  }

  getType() {
    return this.constructor.name;
  }
}

// ============================================
// TODO 2: CLASES DERIVADAS - Tipos de Elementos
// ============================================
/**
 * Crea al menos 3 clases que extiendan tu clase base.
 * Cada clase debe tener:
 * - Campos privados adicionales específicos
 * - Constructor que llame a super()
 * - Getters para las nuevas propiedades
 * - Implementación de getInfo()
 *
 * EJEMPLO (Planetario - NO asignable):
 *
 * class Planet extends CelestialBody {
 *   #type;      // Rocoso, gaseoso, etc.
 *   #moons;     // Número de lunas
 *   #hasRings;  // Tiene anillos
 *
 *   constructor(name, location, type, moons, hasRings) {
 *     super(name, location);
 *     this.#type = type;
 *     this.#moons = moons;
 *     this.#hasRings = hasRings;
 *   }
 *
 *   get type() { return this.#type; }
 *   get moons() { return this.#moons; }
 *   get hasRings() { return this.#hasRings; }
 *
 *   getInfo() {
 *     return {
 *       id: this.id,
 *       name: this.name,
 *       location: this.location,
 *       type: this.#type,
 *       moons: this.#moons,
 *       hasRings: this.#hasRings,
 *       active: this.isActive
 *     };
 *   }
 * }
 */

// TODO: Implementa tu primera clase derivada (Tipo 1)
class Couch extends BaseItem {
  #fabricType;

  constructor(name, description, category, priority, dimension, color, material, fabricType) {
    super(name, description, category, priority, dimension, color, material);
    this.#fabricType = fabricType;
  }

  get fabricType() { return this.#fabricType; }

  getInfo() {
    return {
      id: this.id,
      nombre: this.name,
      descripcion: this.description,
      categoria: this.category,
      dimension: this.dimension,
      prioridad: this.priority,
      color: this.color,
      material: this.material,
      fabricType: this.#fabricType,
      activo: this.isActive,
      creado: this.createdAt,
      actualizado: this.updatedAt,
      tipo: this.getType()
    };
  }
}

// TODO: Implementa tu segunda clase derivada (Tipo 2)
class Mirror extends BaseItem {
  #style;
  #frameType;

  constructor(name, description, category, priority, dimension, color, material, style, frameType) {
    super(name, description, category, priority, dimension, color, material);
    this.#style = style;
    this.#frameType = frameType;
  }

  get style() { return this.#style; }
  get frameType() { return this.#frameType; }

  getInfo() {
    return {
      id: this.id,
      nombre: this.name,
      descripcion: this.description,
      categoria: this.category,
      dimension: this.dimension,
      prioridad: this.priority,
      color: this.color,
      material: this.material,
      style: this.#style,
      frameType: this.#frameType,
      activo: this.isActive,
      creado: this.createdAt,
      actualizado: this.updatedAt,
      tipo: this.getType()
    };
  }
}

// TODO: Implementa tu tercera clase derivada (Tipo 3)
class Bed extends BaseItem {
  #bedType;

  constructor(name, description, category, priority, dimension, color, material, bedType) {
    super(name, description, category, priority, dimension, color, material);
    this.#bedType = bedType;
  }

  get bedType() { return this.#bedType; }

  getInfo() {
    return {
      id: this.id,
      nombre: this.name,
      descripcion: this.description,
      categoria: this.category,
      dimension: this.dimension,
      prioridad: this.priority,
      color: this.color,
      material: this.material,
      bedType: this.#bedType,
      activo: this.isActive,
      creado: this.createdAt,
      actualizado: this.updatedAt,
      tipo: this.getType()
    };
  }
}

// ============================================
// TODO 3: CLASE PERSON - Base para usuarios
// ============================================
/**
 * Clase base para todos los usuarios del sistema.
 *
 * EJEMPLO (Planetario - NO asignable):
 * Person → Visitor (visitante), Astronomer (astrónomo)
 */
class Person {
  // Campos privados
  #id;
  #name;
  #email;
  #registrationDate;

  constructor(name, email) {
    this.#id = crypto.randomUUID();
    this.#name = name;
    this.email = email; // usamos el setter para validar
    this.#registrationDate = new Date().toISOString();
  }

  // Getters
  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get email() {
    return this.#email;
  }

  get registrationDate() {
    return this.#registrationDate;
  }

  // TODO: Implementa setter con validación de email
  set email(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      throw new Error('Formato de email inválido');
    }

    this.#email = value;
  }

  /**
   * Retorna la información básica del usuario
   */
  getInfo() {
    return {
      id: this.#id,
      name: this.#name,
      email: this.#email,
      registrationDate: this.#registrationDate
    };
  }
}

// ============================================
// TODO 4: CLASES DE ROLES - Usuarios especializados
// ============================================
/**
 * Crea al menos 2 clases que extiendan Person con diferentes roles.
 *
 * EJEMPLO (Planetario - NO asignable):
 *
 * class Visitor extends Person {
 *   #ticketType;
 *   #visitCount;
 *
 *   constructor(name, email, ticketType) {
 *     super(name, email);
 *     this.#ticketType = ticketType;
 *     this.#visitCount = 0;
 *   }
 *
 *   recordVisit() {
 *     this.#visitCount++;
 *   }
 *
 *   get ticketType() { return this.#ticketType; }
 *   get visitCount() { return this.#visitCount; }
 * }
 *
 * class Astronomer extends Person {
 *   #specialty;
 *   #observations;
 *
 *   constructor(name, email, specialty) {
 *     super(name, email);
 *     this.#specialty = specialty;
 *     this.#observations = [];
 *   }
 *
 *   addObservation(observation) {
 *     this.#observations.push(observation);
 *   }
 * }
 */

// TODO: Implementa tu primer rol de usuario
class Customer extends Person {
  #purchaseCount;
  #favoriteCategory;

  constructor(name, email, favoriteCategory) {
    super(name, email);
    this.#purchaseCount = 0;
    this.#favoriteCategory = favoriteCategory;
  }

  addPurchase() {
    this.#purchaseCount++;
  }

  get purchaseCount() {
    return this.#purchaseCount;
  }

  get favoriteCategory() {
    return this.#favoriteCategory;
  }

  getInfo() {
    return {
      ...super.getInfo(),
      purchaseCount: this.#purchaseCount,
      favoriteCategory: this.#favoriteCategory,
      role: this.constructor.name
    };
  }
}


// TODO: Implementa tu segundo rol de usuario
class Admin extends Person {
  #permissions;
  #lastLogin;

  constructor(name, email, permissions = []) {
    super(name, email);
    this.#permissions = permissions;
    this.#lastLogin = null;
  }

  login() {
    this.#lastLogin = new Date().toISOString();
  }

  get permissions() {
    return this.#permissions;
  }

  get lastLogin() {
    return this.#lastLogin;
  }

  getInfo() {
    return {
      ...super.getInfo(),
      permissions: this.#permissions,
      lastLogin: this.#lastLogin,
      role: this.constructor.name
    };
  }
}

// ============================================
// TODO 5: CLASE PRINCIPAL DEL SISTEMA
// ============================================
/**
 * Clase principal que gestiona todos los elementos y usuarios.
 * Utiliza static blocks para configuración inicial.
 *
 * EJEMPLO (Planetario - NO asignable):
 * class Observatory { ... }
 */
class MainSystem {
  // Campos privados para almacenar datos
  #items = [];
  #users = [];
  #transactions = [];

  // TODO: Implementa un static block para configuración
   static {
    this.VERSION = '1.0.0';
    this.MAX_ITEMS = 1000;
    this.SYSTEM_NAME = 'Sistema de Muebles y Decoración';

    console.log(`Sistema ${this.SYSTEM_NAME} v${this.VERSION} cargado`);
  }

  // TODO: Implementa métodos estáticos de utilidad
   static isValidId(id) {
    return typeof id === 'string' && id.trim().length > 0;
  }

  static generateId() {
    return crypto.randomUUID();
  }

  // ============================================
  // MÉTODOS CRUD PARA ITEMS
  // ============================================
  addItem(item) {
    if (!(item instanceof BaseItem)) {
      return { success: false, message: 'El item debe ser instancia de BaseItem' };
    }

    if (this.#items.length >= MainSystem.MAX_ITEMS) {
      return { success: false, message: 'Límite de items alcanzado' };
    }

    this.#items.push(item);

    return {
      success: true,
      message: 'Item agregado correctamente',
      item
    };
  }

  removeItem(id) {
    const index = this.#items.findIndex(item => item.id === id);

    if (index === -1) {
      return { success: false, message: 'Item no encontrado' };
    }

    const removed = this.#items.splice(index, 1)[0];

    return {
      success: true,
      message: 'Item eliminado',
      item: removed
    };
  }

  findItem(id) {
     return this.#items.find(item => item.id === id) ?? null;
  }

  getAllItems() {
     return [...this.#items];
  }

  // ============================================
  // MÉTODOS DE BÚSQUEDA Y FILTRADO
  // ============================================
  searchByName(query) {
    // TODO: Implementa búsqueda case-insensitive
     const searchTerm = query.toLowerCase();
     return this.#items.filter(item =>
       item.name.toLowerCase().includes(searchTerm)
     );
  }

  filterByType(type) {
    // TODO: Implementa el filtro por tipo
     return this.#items.filter(item => item.getType() === type);
  }

  filterByStatus(active) {
    // TODO: Implementa el filtro por estado
     return this.#items.filter(item => item.isActive === active);
  }

  // ============================================
  // MÉTODOS DE ESTADÍSTICAS
  // ============================================
  getStats() {
    const total = this.#items.length;
    const active = this.#items.filter(item => item.isActive).length;
    const inactive = total - active;

    const byType = this.#items.reduce((acc, item) => {
      const type = item.getType();
      acc[type] = (acc[type] ?? 0) + 1;
      return acc;
    }, {});

    return {
      total,
      active,
      inactive,
      byType,
      users: this.#users.length
    };
  }

  // ============================================
  // MÉTODOS PARA USUARIOS
  // ============================================

  addUser(user) {
    if (!(user instanceof Person)) {
      return { success: false, message: 'Debe ser instancia de Person' };
    }

    this.#users.push(user);

    return { success: true, message: 'Usuario registrado', user };
  }

  findUserByEmail(email) {
    return this.#users.find(user => user.email === email) ?? null;
  }

  getAllUsers() {
    return [...this.#users];
  }
}

// ============================================
// TODO 6: INSTANCIA DEL SISTEMA Y DATOS DE PRUEBA
// ============================================

// Crea la instancia principal del sistema
const system = new MainSystem();

// Crear elementos de prueba (MUEBLES)

const sofa1 = new Couch(
  'Sofá Moderno',
  'Sofá de 3 puestos estilo minimalista',
  'Sala',
  'Alta',
  '200x90x85 cm',
  'Gris',
  'Tela',
  'Lino'
);

const espejo1 = new Mirror(
  'Espejo Decorativo',
  'Espejo redondo con marco elegante',
  'Baño',
  'Media',
  '80x80 cm',
  'Negro',
  'Metal',
  'Moderno',
  'Circular'
);

const cama1 = new Bed(
  'Cama Queen',
  'Cama tamaño Queen con cabecero acolchado',
  'Dormitorio',
  'Alta',
  '160x200 cm',
  'Beige',
  'Madera',
  'Queen'
);

// Agregar al sistema
system.addItem(sofa1);
system.addItem(espejo1);
system.addItem(cama1);

// ============================================
// TODO 7: REFERENCIAS AL DOM
// ============================================

// TODO: Obtén referencias a los elementos del DOM
 const itemForm = document.getElementById('item-form');
 const itemList = document.getElementById('item-list');
 const statsContainer = document.getElementById('stats');
 const filterType = document.getElementById('filter-type');
 const filterStatus = document.getElementById('filter-status');
 const searchInput = document.getElementById('search-input');

// ============================================
// TODO 8: FUNCIONES DE RENDERIZADO
// ============================================

/**
 * Renderiza un elemento individual
 * @param {BaseItem} item - Elemento a renderizar
 * @returns {string} HTML del elemento
 */
const renderItem = item => {
  const info = item.getInfo();

  return `
    <div class="item ${item.isActive ? '' : 'inactive'}" data-id="${item.id}">
      <div class="item-header">
        <h3>${item.name}</h3>
        <span class="badge">${item.getType()}</span>
      </div>

      <div class="item-details">
        <p>Categoría: ${info.categoria ?? 'N/A'}</p>
        <p>Dimensión: ${info.dimension ?? 'N/A'}</p>
        <p>Estado: ${item.isActive ? 'Activo' : 'Inactivo'}</p>
      </div>

      <div class="item-actions">
        <button class="btn-toggle" data-id="${item.id}">
          ${item.isActive ? 'Desactivar' : 'Activar'}
        </button>
        <button class="btn-delete" data-id="${item.id}">
          Eliminar
        </button>
      </div>
    </div>
  `;
};

const renderItems = items => {
  if (!itemList) return;
  itemList.innerHTML = items.map(renderItem).join('');
};

const renderStats = stats => {
  if (!statsContainer) return;

  statsContainer.innerHTML = `
    <p>Total: ${stats.total}</p>
    <p>Activos: ${stats.active}</p>
    <p>Inactivos: ${stats.inactive}</p>
  `;
};

// ============================================
// TODO 9: EVENT HANDLERS
// ============================================

/**
 * Maneja el envío del formulario
 */
const handleFormSubmit = e => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const dimension = document.getElementById("size").value;
  const priority = document.getElementById("priority").value;
  const color = document.getElementById("color").value;
  const material = document.getElementById("material").value;

  let newItem;

  // Crear item según el tipo seleccionado
  if (category === "Couch") {
    newItem = new Couch(
      name,
      description,
      category,
      priority,
      dimension,
      color,
      material,
      "Lino"
    );

  } else if (category === "Mirror") {
    newItem = new Mirror(
      name,
      description,
      category,
      priority,
      dimension,
      color,
      material,
      "Moderno",
      "Madera"
    );

  } else if (category === "Bed") {
    newItem = new Bed(
      name,
      description,
      category,
      priority,
      dimension,
      color,
      material,
      "Queen"
    );
  }

  system.addItem(newItem);

  renderItems(system.getAllItems());
  renderStats(system.getStats());

  itemForm.reset();
};

const handleFilterChange = () => {
  let filtered = system.getAllItems();

  const type = filterType?.value;
  const status = filterStatus?.value;
  const search = searchInput?.value.trim().toLowerCase();

  // 🔹 Filtrar por tipo (Couch, Mirror, Bed)
  if (type && type !== "all") {
    filtered = filtered.filter(item => item.getType() === type);
  }

  // 🔹 Filtrar por estado
  if (status && status !== "all") {
    const isActive = status === "active";
    filtered = filtered.filter(item => item.isActive === isActive);
  }

  // 🔹 Buscar por nombre (case insensitive)
  if (search) {
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(search)
    );
  }

  renderItems(filtered);
};

/**
 * Maneja acciones en los elementos (toggle, delete)
 */
const handleItemAction = e => {
  const button = e.target.closest("button");
  if (!button) return;

  const itemId = button.dataset.id;
  if (!itemId) return;

  const item = system.findItem(itemId);
  if (!item) return;

  // 🔹 Activar / Desactivar
  if (button.classList.contains("btn-toggle")) {
    if (item.isActive) {
      item.deactivate();
    } else {
      item.activate();
    }
  }

  // 🔹 Eliminar
  if (button.classList.contains("btn-delete")) {
    const confirmDelete = confirm("¿Eliminar este producto?");
    if (confirmDelete) {
      system.removeItem(itemId);
    }
  }

  // 🔹 Volver a renderizar
  handleFilterChange();
  renderStats(system.getStats());
};

// ============================================
// TODO 10: EVENT LISTENERS
// ============================================

// TODO: Adjunta los event listeners
 itemForm.addEventListener('submit', handleFormSubmit);
 filterType.addEventListener('change', handleFilterChange);
 filterStatus.addEventListener('change', handleFilterChange);
 searchInput.addEventListener('input', handleFilterChange);
 itemList.addEventListener('click', handleItemAction);

// ============================================
// TODO 11: INICIALIZACIÓN
// ============================================

/**
 * Inicializa la aplicación
 */
const init = () => {
  // TODO: Implementa la inicialización
   renderItems(system.getAllItems());
   renderStats(system.getStats());
   console.log('✅ Sistema inicializado correctamente');
};

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);

// ============================================
// CHECKLIST DE VERIFICACIÓN
// ============================================
// Después de completar todos los TODOs, verifica:
//
// CLASES Y HERENCIA:
// ✓ Clase base con campos privados
// ✓ Mínimo 3 clases derivadas con extends
// ✓ Uso correcto de super() en constructores
// ✓ Método getInfo() implementado en cada clase derivada
//
// ENCAPSULACIÓN:
// ✓ Todos los campos son privados (#)
// ✓ Getters para acceso a propiedades
// ✓ Setters con validación donde corresponda
//
// CARACTERÍSTICAS MODERNAS:
// ✓ Static block en clase principal
// ✓ Métodos estáticos de utilidad
// ✓ Uso de crypto.randomUUID() para IDs
//
// CÓDIGO:
// ✓ Comentarios en español
// ✓ Nomenclatura técnica en inglés
// ✓ Nombres de clases adaptados a mi dominio
// ✓ Sin copiar implementación de otros compañeros