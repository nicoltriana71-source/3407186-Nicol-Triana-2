/* ============================================
PROYECTO SEMANA 02 - GESTOR DE COLECCIÓN
Archivo inicial para el aprendiz
============================================ */

/* ESTADO GLOBAL */
let items = [];
let editingItemId = null;

/* CATEGORÍAS DE TU DOMINIO */
const CATEGORIES = {
  dormitorio: { name: 'Dormitorio', emoji: '🛏️' },
  sala: { name: 'Sala', emoji: '🛋️' },
  comedor: { name: 'Comedor', emoji: '🍽️' },
  baño: { name: 'Baño', emoji: '🛁' },
};

const PRIORITIES = {
  high: { name: 'Alta', color: '#ef4444' },
  medium: { name: 'Media', color: '#f59e0b' },
  low: { name: 'Baja', color: '#22c55e' },
};

/* PERSISTENCIA (LocalStorage) */
const loadItems = () => {
  return JSON.parse(localStorage.getItem('NicolasseStore') ?? '[]');
};

const saveItems = itemsToSave => {
  localStorage.setItem('NicolasseStore', JSON.stringify(itemsToSave));
};

/* CRUD - CREAR ELEMENTO */
const createItem = (itemData = {}) => {
  const newItem = {
    id: Date.now(),
    name: itemData.name ?? '',
    description: itemData.description ?? '',
    category: itemData.category ?? 'dormitorio',
    priority: itemData.priority ?? 'medium',
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: null,
    dimension: itemData.dimension ?? '',
    color: itemData.color ?? '',
    material: itemData.material ?? '',
    ...itemData,
  };
  const newItems = [...items, newItem];
  saveItems(newItems);
  return newItems;
};

/* CRUD - ACTUALIZAR ELEMENTO */
const updateItem = (id, updates) => {
  const updatedItems = items.map(item =>
    item.id === id ? { ...item, ...updates, updatedAt: new Date().toISOString() } : item
  );
  saveItems(updatedItems);
  return updatedItems;
};

/* CRUD - ELIMINAR ELEMENTO */
const deleteItem = id => {
  const filteredItems = items.filter(item => item.id !== id);
  saveItems(filteredItems);
  return filteredItems;
};

/* CRUD - TOGGLE ESTADO ACTIVO */
const toggleItemActive = id => {
  const updatedItems = items.map(item =>
    item.id === id ? { ...item, active: !item.active, updatedAt: new Date().toISOString() } : item
  );
  saveItems(updatedItems);
  return updatedItems;
};

const clearInactive = () => {
  const activeItems = items.filter(item => item.active);
  saveItems(activeItems);
  return activeItems;
};

/* FILTROS Y BÚSQUEDA */
const filterByStatus = (itemsToFilter, status = 'all') => {
  if (status === 'all') return itemsToFilter;
  if (status === 'active') return itemsToFilter.filter(item => item.active);
  if (status === 'inactive') return itemsToFilter.filter(item => !item.active);
  return itemsToFilter;
};

const filterByCategory = (itemsToFilter, category = 'all') => {
  if (category === 'all') return itemsToFilter;
  return itemsToFilter.filter(item => item.category === category);
};

const filterByPriority = (itemsToFilter, priority = 'all') => {
  if (priority === 'all') return itemsToFilter;
  return itemsToFilter.filter(item => item.priority === priority);
};

const searchItems = (itemsToFilter, query) => {
  if (!query || query.trim() === '') return itemsToFilter;
  const searchTerm = query.toLowerCase();
  return itemsToFilter.filter(
    item =>
      item.name.toLowerCase().includes(searchTerm) ||
      (item.description ?? '').toLowerCase().includes(searchTerm)
  );
};

const applyFilters = (itemsToFilter, filters = {}) => {
  const { status = 'all', category = 'all', priority = 'all', search = '' } = filters;
  let result = filterByStatus(itemsToFilter, status);
  result = filterByCategory(result, category);
  result = filterByPriority(result, priority);
  result = searchItems(result, search);
  return result;
};

/* ESTADÍSTICAS */
const getStats = (itemsToAnalyze = []) => {
  const total = itemsToAnalyze.length;
  const active = itemsToAnalyze.filter(item => item.active).length;
  const inactive = total - active;
  const byCategory = itemsToAnalyze.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  }, {});
  const byPriority = itemsToAnalyze.reduce((acc, item) => {
    acc[item.priority] = (acc[item.priority] ?? 0) + 1;
    return acc;
  }, {});
  return { total, active, inactive, byCategory, byPriority };
};

/* RENDERIZADO */
const getCategoryEmoji = category => CATEGORIES[category]?.emoji ?? '📌';

const formatDate = dateString => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const renderItem = item => {
  const { id, name, description, category, priority, active, createdAt } = item;
  return `
  <div class="item ${active ? '' : 'inactive'} priority-${priority}" data-item-id="${id}">
    <input type="checkbox" class="item-checkbox" ${active ? 'checked' : ''}>
    <div class="item-content">
      <h3 class="item-name">${name}</h3>
      ${description ? `<p class="item-description">${description}</p>` : ''}
      <div class="item-meta">
        <span class="badge badge-category">${getCategoryEmoji(category)} ${
    CATEGORIES[category]?.name ?? category
  }</span>
        <span class="badge badge-priority priority-${priority}">${
    PRIORITIES[priority]?.name ?? priority
  }</span>
        <span class="item-date">📅 ${formatDate(createdAt)}</span>
      </div>
    </div>
    <div class="item-actions">
      <button class="btn-edit" title="Editar">✏️</button>
      <button class="btn-delete" title="Eliminar">🗑️</button>
    </div>
  </div>
  `;
};

const renderItems = itemsToRender => {
  const itemList = document.getElementById('item-list');
  const emptyState = document.getElementById('empty-state');
  if (itemsToRender.length === 0) {
    itemList.innerHTML = '';
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
    itemList.innerHTML = itemsToRender.map(renderItem).join('');
  }
};

const renderStats = stats => {
  document.getElementById('stat-total').textContent = stats.total;
  document.getElementById('stat-active').textContent = stats.active;
  document.getElementById('stat-inactive').textContent = stats.inactive;

  const categoryStats = Object.entries(stats.byCategory)
    .map(([cat, count]) => `${getCategoryEmoji(cat)} ${CATEGORIES[cat]?.name ?? cat}: ${count}`)
    .join(' | ');
  document.getElementById('stats-details').textContent = categoryStats;
};

/* EVENT HANDLERS */
const handleFormSubmit = e => {
  e.preventDefault();
  const name = document.getElementById('item-name').value.trim();
  const description = document.getElementById('item-description').value.trim();
  const category = document.getElementById('item-category').value;
  const priority = document.getElementById('item-priority').value;
  const dimension = document.getElementById('item-dimension')?.value ?? '';
  const material = document.getElementById('item-material')?.value ?? '';
  const color = document.getElementById('item-color')?.value ?? '';

  if (!name) {
    alert('El nombre del producto es obligatorio');
    return;
  }

  const itemData = { name, description, category, priority, dimension, material, color };

  if (editingItemId) {
    items = updateItem(editingItemId, itemData);
  } else {
    items = createItem(itemData);
  }

  resetForm();
  renderItems(applyCurrentFilters());
  renderStats(getStats(items));
};

const handleItemToggle = itemId => {
  items = toggleItemActive(itemId);
  renderItems(applyCurrentFilters());
  renderStats(getStats(items));
};

const handleItemEdit = itemId => {
  const itemToEdit = items.find(item => item.id === itemId);
  if (!itemToEdit) return;
  document.getElementById('item-name').value = itemToEdit.name;
  document.getElementById('item-description').value = itemToEdit.description ?? '';
  document.getElementById('item-category').value = itemToEdit.category;
  document.getElementById('item-priority').value = itemToEdit.priority;
  document.getElementById('item-color').value = itemToEdit.color ?? '';
  document.getElementById('item-material').value = itemToEdit.material ?? '';
  document.getElementById('item-dimension').value = itemToEdit.dimension ?? '';
  document.getElementById('form-title').textContent = '✏️ Editar Producto';
  document.getElementById('submit-btn').textContent = 'Actualizar';
  document.getElementById('cancel-btn').style.display = 'inline-block';
  editingItemId = itemId;
};

const handleItemDelete = itemId => {
  if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) return;
  items = deleteItem(itemId);
  renderItems(applyCurrentFilters());
  renderStats(getStats(items));
};

const getCurrentFilters = () => ({
  status: document.getElementById('filter-status').value,
  category: document.getElementById('filter-category').value,
  priority: document.getElementById('filter-priority').value,
  search: document.getElementById('search-input').value,
});

const applyCurrentFilters = () => applyFilters(items, getCurrentFilters());

const handleFilterChange = () => {
  renderItems(applyCurrentFilters());
};

const resetForm = () => {
  document.getElementById('item-form').reset();
  document.getElementById('form-title').textContent = '✨Nuevo producto';
  document.getElementById('submit-btn').textContent = 'Crear';
  document.getElementById('cancel-btn').style.display = 'none';
  editingItemId = null;
};

/* EVENT LISTENERS */
const attachEventListeners = () => {
  document.getElementById('item-form').addEventListener('submit', handleFormSubmit);
  document.getElementById('cancel-btn').addEventListener('click', resetForm);
  document.getElementById('filter-status').addEventListener('change', handleFilterChange);
  document.getElementById('filter-category').addEventListener('change', handleFilterChange);
  document.getElementById('filter-priority').addEventListener('change', handleFilterChange);
  document.getElementById('search-input').addEventListener('input', handleFilterChange);
  document.getElementById('clear-inactive').addEventListener('click', () => {
    if (confirm('¿Eliminar todos los productos inactivos?')) {
      items = clearInactive();
      renderItems(applyCurrentFilters());
      renderStats(getStats(items));
    }
  });
  document.getElementById('item-list').addEventListener('click', e => {
    const itemElement = e.target.closest('.item');
    if (!itemElement) return;
    const itemId = parseInt(itemElement.dataset.itemId);
    if (e.target.classList.contains('item-checkbox')) {
      handleItemToggle(itemId);
    } else if (e.target.classList.contains('btn-edit')) {
      handleItemEdit(itemId);
    } else if (e.target.classList.contains('btn-delete')) {
      handleItemDelete(itemId);
    }
  });
};

/* INICIALIZACIÓN */
const init = () => {
  items = loadItems();
  renderItems(items);
  renderStats(getStats(items));
  attachEventListeners();
  console.log('✅ Aplicación inicializada correctamente');
};

document.addEventListener('DOMContentLoaded', init);
