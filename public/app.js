/* HR World News – Frontend JS */

const grid          = document.getElementById('articlesGrid');
const filterBar     = document.getElementById('filterBar').querySelector('.filter-inner');
const geoInner      = document.getElementById('geoBar').querySelector('.geo-inner');
const searchInput   = document.getElementById('searchInput');
const lastUpdatedEl = document.getElementById('lastUpdated');
const headerStats   = document.getElementById('headerStats');

let allArticles  = [];
let activeFilter = 'all';
let activeGeo    = 'all';

async function loadNews() {
  showSkeletons();
  try {
    const res  = await fetch('data/news.json?t=' + Date.now());
    const data = await res.json();
    allArticles = data.articles || [];
    if (data.lastUpdated) lastUpdatedEl.textContent = formatDate(data.lastUpdated, true);
  // Date display
  const dateEl = document.getElementById('headerDate');
  if (dateEl) {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' });
  }
    if (headerStats) {
      const srcCount = new Set(allArticles.map(a => a.source)).size;
      headerStats.textContent = allArticles.length + ' cikk · ' + srcCount + ' forrás';
    }
    buildFilters();
    render();
  } catch (err) {
    grid.innerHTML = errorState(err.message);
  }
}

function errorState(msg) {
  return '<div class="empty-state"><div class="empty-icon">&#x26A0;</div><h2>Hiba</h2><p>' + msg + '</p></div>';
}

function buildFilters() {
  // GEO tabs
  const geoOrder = ['🇺🇸 USA', '🇬🇧 UK', '🇪🇺 Európa', '🌍 Globális', '🌏 Ázsia', '🇭🇺 Magyar'];
  const geoInData = new Set(allArticles.map(a => a.geo).filter(Boolean));
  const geos = geoOrder.filter(g => geoInData.has(g));

  geos.forEach(geo => {
    const count = allArticles.filter(a => a.geo === geo).length;
    const flag  = geo.split(' ')[0];
    const label = geo.split(' ').slice(1).join(' ');
    const geoColor = GEO_COLOR[geo] || '#c9a84c';
    const btn   = document.createElement('button');
    btn.className      = 'geo-btn';
    btn.dataset.geo    = geo;
    btn.style.setProperty('--btn-color', geoColor);
    btn.innerHTML      = flag + ' <span class="geo-label">' + label + '</span>'
                       + '<span class="geo-count">' + count + '</span>';
    btn.addEventListener('click', () => setGeo(geo));
    geoInner.appendChild(btn);
  });

  // Source tabs
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

function setGeo(geo) {
  activeGeo = geo;
  geoInner.querySelectorAll('.geo-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.geo === geo));
  // Reset source filter when switching geo
  activeFilter = 'all';
  filterBar.querySelectorAll('.filter-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.filter === 'all'));
  render();
}

function setFilter(filter) {
  activeFilter = filter;
  filterBar.querySelectorAll('.filter-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.filter === filter));
  render();
}

geoInner.querySelector('[data-geo="all"]').addEventListener('click', () => setGeo('all'));
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
    const matchGeo = activeGeo === 'all' || a.geo === activeGeo;
    const matchQ   = !q
      || (a.title_hu   || '').toLowerCase().includes(q)
      || (a.title      || '').toLowerCase().includes(q)
      || (a.summary_hu || '').toLowerCase().includes(q)
      || (a.category   || '').toLowerCase().includes(q)
      || (a.source     || '').toLowerCase().includes(q);
    return matchSrc && matchGeo && matchQ;
  });

  if (!filtered.length) {
    grid.innerHTML = '<div class="empty-state"><div class="empty-icon">&#x1F50D;</div><h2>Nincs tal&aacute;lat</h2><p>Pr&oacute;b&aacute;lj m&aacute;s felt&eacute;teleket.</p></div>';
    return;
  }

  grid.innerHTML = '<p class="result-count">' + filtered.length + ' cikk</p>'
    + filtered.map((a, i) => cardHTML(a, i)).join('');
}

const GEO_COLOR = {
  '\u{1F1FA}\u{1F1F8} USA':     '#2563eb',
  '\u{1F1EC}\u{1F1E7} UK':      '#1e3a8a',
  '\u{1F1EA}\u{1F1FA} Eur\u00F3pa': '#1d4ed8',
  '\u{1F30D} Glob\u00E1lis':    '#0891b2',
  '\u{1F30F} \u00C1zsia':       '#7c3aed',
  '\u{1F1ED}\u{1F1FA} Magyar':  '#dc2626',
};

function cardHTML(a, idx) {
  const date     = a.published ? formatDate(a.published) : '';
  const sum      = a.summary_hu ? esc(a.summary_hu) : '<em>&Ouml;sszefoglal&oacute; hamarosan&hellip;</em>';
  const title    = a.title_hu || a.title || 'C&iacute;m n&eacute;lk&uuml;l';
  const isFeat   = idx === 0;
  const ageMs    = a.published ? Date.now() - new Date(a.published) : Infinity;
  const isNew    = ageMs < 8 * 3600 * 1000;
  const num      = String(idx + 1).padStart(2, '0');
  const words    = ((a.excerpt || '') + ' ' + (a.summary_hu || '')).trim().split(/\s+/).length;
  const readTime = Math.max(2, Math.round(words / 180));
  const geoColor = GEO_COLOR[a.geo] || '#c9a84c';
  const flag     = a.geo ? a.geo.split(' ')[0] : '';

  const imgStyle = a.image ? ' style="background-image:url(\'' + a.image + '\')"' : '';
  const cover = '<div class="card-cover' + (a.image ? ' has-image' : '') + '"' + imgStyle + '>'
    + '<span class="card-flag">' + flag + '</span>'
    + '<span class="card-cover-src">' + esc(a.source) + '</span>'
    + '</div>';

  const body = '<div class="card-body">'
    +   '<div class="card-meta">'
    +     (a.geo ? '<span class="geo-tag" title="' + esc(a.geo) + '">' + a.geo.split(' ')[0] + '</span>' : '')
    +     '<span class="source-badge">' + esc(a.source) + '</span>'
    +     '<span class="category-tag">' + esc(a.category || '') + '</span>'
    +     (isNew ? '<span class="badge-new">&#9679; &Uacute;J</span>' : '')
    +     '<span class="pub-date">' + date + '</span>'
    +   '</div>'
    +   '<h2 class="card-title">' + esc(title) + '</h2>'
    +   '<div class="card-divider"></div>'
    +   '<p class="summary-label">Magyar &ouml;sszefoglal&oacute;</p>'
    +   '<p class="card-summary">' + sum + '</p>'
    + '</div>';

  const footer = '<div class="card-footer">'
    +   '<a class="read-link" href="' + esc(a.url) + '" target="_blank" rel="noopener">'
    +     'Olvasd el'
    +     '<svg viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    +   '</a>'
    +   '<div class="card-footer-right">'
    +     '<span class="read-time">' + readTime + ' perc</span>'
    +     '<span class="card-num">' + num + '</span>'
    +   '</div>'
    + '</div>';

  const inner = isFeat
    ? cover + '<div class="card-content">' + body + footer + '</div>'
    : cover + body + footer;

  return '<article class="card' + (isFeat ? ' featured' : '') + '" data-geo="' + esc(a.geo || '') + '" style="--geo-color:' + geoColor + '">'
    + inner
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
  const opts = { month: 'short', day: 'numeric' };
  if (withTime) { opts.hour = '2-digit'; opts.minute = '2-digit'; }
  return d.toLocaleDateString('hu-HU', opts);
}

function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

loadNews();
