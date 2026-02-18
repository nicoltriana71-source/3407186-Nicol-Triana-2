// ============================================
//INFORMACION GENERAL
// ============================================

const furnitureData = {
  name: 'Nicolisse',
  description: 'Nicolisse ofrece muebles y decoracion con estilo, buen gusto y detalles delicados, creando espacios acogedores y con personalidad.',
  title: 'Muebles y Decoracion',
  contact: {
    email: 'nicoltriana71@gmail.com',
    phone: '+57 312 4779680',
    location: 'Bogotá, Colombia'
  },
  items: [
  { name: 'Clod bed', categoria: 'cloud', precio: 450000 },
  { name: 'Crystal nightstand', categoria: 'nightstand', precio: 120000 },
  { name: 'Golden rabbit', categoria: 'centerpiece', precio: 200000 },
  { name: 'Minimalist painting', categoria: 'painting', precio: 170000 },
],

  links: [
    { platform: 'Instragram', url: 'https://www.instagram.com/muebles_mobiliario16/?hl=es' }
  ],
  stats: {
    total: 4,
    active: 3,
    rating: 4.2,
    custom: 2
  }
};

// ============================================
// REFERENCIAS DE DOM
// ============================================

const entityName = document.getElementById('userName');
const entityDescription = document.getElementById('userBio');
const userTitle = document.getElementById('userTitle');
const userLocation = document.getElementById('userLocation');
const userEmail = document.getElementById('userEmail');
const userPhone = document.getElementById('userPhone');

const itemsList = document.getElementById('skillsList');
const statsContainer = document.getElementById('stats');
const linksContainer = document.getElementById('socialLinks');

const themeToggle = document.getElementById('themeToggle');
const copyBtn = document.getElementById('copyEmailBtn');
const toggleItemsBtn = document.getElementById('toggleSkills');

const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// ============================================
// RENDER INFORMACIÓN BÁSICA
// ============================================

const renderBasicInfo = () => {
  const { name, description, title, contact: { email, phone, location } } = furnitureData;

  entityName.textContent = name;
  userTitle.textContent = title;
  userLocation.textContent = `📍 ${location}`;
  entityDescription.textContent = description;
  userEmail.textContent = email;
  userPhone.textContent = phone;
};

// ============================================
// RENDER ITEMS 
// ============================================

const renderItems = (showAll = false) => {
  const { items } = furnitureData;

  const itemsToShow = showAll ? items : items.slice(0, 4);

  const itemsHtml = itemsToShow.map(({ name, categoria, precio }) => `
  <div class="skill-item">
    <div class="skill-name">${name}</div>
    <div class="skill-level">
      <span>Categoría: ${categoria}</span>
      <span>Precio: $${precio.toLocaleString()}</span>
    </div>
  </div>
`).join('');


  itemsList.innerHTML = itemsHtml;
};

// ============================================
// RENDER LINKS
// ============================================

const renderLinks = () => {
  const { links } = furnitureData;

  const linksHtml = links.map(({ platform, url }) => `
    <a href="${url}" target="_blank" class="social-link">
      ${platform}
    </a>
  `).join('');

  linksContainer.innerHTML = linksHtml;
};

// ============================================
// RENDER STATS
// ============================================

const renderStats = () => {
  const { stats } = furnitureData;

  const statsArray = [
    { label: 'Total Productos', value: stats.total },
    { label: 'Activos', value: stats.active },
    { label: 'Rating', value: stats.rating },
    { label: 'Extra', value: stats.custom }
  ];

  const statsHtml = statsArray.map(({ label, value }) => `
    <div class="stat-item">
      <span class="stat-value">${value}</span>
      <span class="stat-label">${label}</span>
    </div>
  `).join('');

  statsContainer.innerHTML = statsHtml;
};

// ============================================
// MODO OSCURO
// ============================================

const toggleTheme = () => {
  const currentTheme = document.documentElement.dataset.theme;
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.dataset.theme = newTheme;
  themeToggle.innerHTML = `<span class="theme-icon">${newTheme === 'dark' ? '☀️' : '🌙'}</span>`;

  localStorage.setItem('theme', newTheme);
};

const loadTheme = () => {
  const savedTheme = localStorage.getItem('theme') ?? 'light';
  document.documentElement.dataset.theme = savedTheme;
  themeToggle.innerHTML = `<span class="theme-icon">${savedTheme === 'dark' ? '☀️' : '🌙'}</span>`;
};

// ============================================
// COPIAR EMAIL
// ============================================

const copyInfo = async () => {
  const { contact: { email } } = furnitureData;

  await navigator.clipboard.writeText(email);
  showToast('¡Email copiado!');
};

const showToast = message => {
  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
};

// ============================================
// MOSTRAR MÁS / MENOS
// ============================================

let showingAllItems = false;

const handleToggleItems = () => {
  showingAllItems = !showingAllItems;
  renderItems(showingAllItems);
  toggleItemsBtn.textContent = showingAllItems ? 'Show Less' : 'Show More';
};

// ============================================
// EVENT LISTENERS
// ============================================

themeToggle.addEventListener('click', toggleTheme);
copyBtn.addEventListener('click', copyInfo);
toggleItemsBtn.addEventListener('click', handleToggleItems);

// ============================================
// INICIALIZAR
// ============================================

const init = () => {
  loadTheme();
  renderBasicInfo();
  renderItems();
  renderLinks();
  renderStats();
  console.log('Aplicación inicializada correctamente');
};

document.addEventListener('DOMContentLoaded', init);