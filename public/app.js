/* HR World News - Frontend JS */

const grid         = document.getElementById('articlesGrid');
const filterBar    = document.getElementById('filterBar').querySelector('.filter-inner');
const searchInput  = document.getElementById('searchInput');
const lastUpdatedEl= document.getElementById('lastUpdated');

let allArticles  = [];
let activeFilter = 'all';

async function loadNews() {
  showSkeletons();
  try {
    const res  = await fetch('data/news.json?t=' + Date.now());
    const data = await res.json();
    allArticles = data.articles || [];
    if (data.lastUpdated) lastUpdatedEl.textContent = formatDate(data.lastUpdated, true);
    buildFilters();
    render();
  } catch (err) {
    grid.innerHTML = errorState(err.message);
  }
}

function errorState(msg) {
  return '<div class="empty-state"><div class="empty-icon">26a0</div><h2>Hiba</h2><p>' + msg + '</p></div>';
}

function buildFilters() {
  const sources = [...new Set(allArticles.map(a => a.source))].sort();
  sources.forEach(src => {
    const btn = document.createElement('button');
    btn.className      = 'filter-btn';
    btn.dataset.filter = src;
    btn.textContent    = src;
    btn.addEventListener('click', () => setFilter(src));
    filterBar.appendChild(btn);
  });
}

function setFilter(filter) {
  activeFilter = filter;
  filterBar.querySelectorAll('.filter-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.filter === filter));
  render();
}

filterBar.querySelector('[data-filter="all"]').addEventListener('click', () => setFilter('all'));

let searchTimer;
searchInput.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(render, 200);
});

function render() {
  const q = searchInput.value.trim().toLowerCase();
  const filtered = allArticles.filter(a => {
    const matchSrc = activeFilter === 'all' || a.source === activeFilter;
    const matchQ   = !q
      || (a.title      || '').toLowerCase().includes(q)
      || (a.summary_hu || '').toLowerCase().includes(q)
      || (a.category   || '').toLowerCase().includes(q);
    return matchSrc && matchQ;
  });

  if (!filtered.length) {
    grid.innerHTML = '<div class="empty-state"><div class="empty-icon">&#x1F50D;</div><h2>Nincs tal&aacute;lat</h2><p>Pr&oacute;b&aacute;lj m&aacute;s felt&eacute;teleket.</p></div>';
    return;
  }
  grid.innerHTML = '<p class="result-count">' + filtered.length + ' cikk</p>' + filtered.map(cardHTML).join('');
}

function cardHTML(a) {
  const color = a.color || '#1d4ed8';
  const date  = a.published ? formatDate(a.published) : '';
  const sum   = a.summary_hu ? esc(a.summary_hu) : '<em>&Ouml;sszefoglal&oacute; hamarosan&hellip;</em>';
  return '<article class="card">'
    + '<div class="card-top" style="background:' + color + '"></div>'
    + '<div class="card-body">'
    +   '<div class="card-meta">'
    +     '<span class="source-badge" style="background:' + color + '">' + esc(a.source) + '</span>'
    +     '<span class="category-tag">' + esc(a.category || '') + '</span>'
    +     '<span class="pub-date">' + date + '</span>'
    +   '</div>'
    +   '<h2 class="card-title">' + esc(a.title || 'C&iacute;m n&eacute;lk&uuml;l') + '</h2>'
    +   '<div class="card-divider"></div>'
    +   '<p class="summary-label">Magyar &ouml;sszefoglal&oacute;</p>'
    +   '<p class="card-summary">' + sum + '</p>'
    + '</div>'
    + '<div class="card-footer">'
    +   '<a class="read-link" href="' + esc(a.url) + '" target="_blank" rel="noopener">'
    +     'Olvasd el'
    +     '<svg viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    +   '</a>'
    + '</div>'
    + '</article>';
}

function showSkeletons() {
  const sk = '<div class="skeleton">'
    + '<div class="skel skel-sm"></div>'
    + '<div class="skel skel-lg"></div><div class="skel skel-lg2"></div>'
    + '<div class="skel skel-md"></div><div class="skel skel-md2"></div>'
    + '<div class="skel skel-sm" style="width:30%;margin-top:8px"></div>'
    + '</div>';
  grid.innerHTML = Array(6).fill(sk).join('');
}

function formatDate(iso, withTime) {
  const d = new Date(iso);
  if (isNaN(d)) return '';
  const opts = { year: 'numeric', month: 'short', day: 'numeric' };
  if (withTime) { opts.hour = '2-digit'; opts.minute = '2-digit'; }
  return d.toLocaleDateString('hu-HU', opts);
}

function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

loadNews();
