/* HR World News – Frontend JS */

const grid          = document.getElementById('articlesGrid');
const geoInner      = document.getElementById('geoBar').querySelector('.geo-inner');
const searchInput   = document.getElementById('searchInput');
const lastUpdatedEl = document.getElementById('lastUpdated');
const headerStats   = document.getElementById('headerStats');

let allArticles  = [];
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
  const geoOrder = ['🇺🇸 USA', '🇪🇺 EU', '🌍 Global', '🌏 Ázsia'];
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

}

function setGeo(geo) {
  activeGeo = geo;
  geoInner.querySelectorAll('.geo-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.geo === geo));
  render();
}

function setFilter(filter) {
  activeFilter = filter;
  filterBar.querySelectorAll('.filter-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.filter === filter));
  render();
}

geoInner.querySelector('[data-geo="all"]').addEventListener('click', () => setGeo('all'));

// Whole card is clickable — skip if user clicked an actual link/button
grid.addEventListener('click', e => {
  if (e.target.closest('a, button')) return;
  const card = e.target.closest('[data-url]');
  if (card && card.dataset.url) window.open(card.dataset.url, '_blank');
});

let searchTimer;
searchInput.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(render, 200);
});

function render() {
  const q = searchInput.value.trim().toLowerCase();
  const filtered = allArticles.filter(a => {
    const matchGeo = activeGeo === 'all' || a.geo === activeGeo;
    const matchQ   = !q
      || (a.title_hu   || '').toLowerCase().includes(q)
      || (a.title      || '').toLowerCase().includes(q)
      || (a.summary_hu || '').toLowerCase().includes(q)
      || (a.category   || '').toLowerCase().includes(q)
      || (a.source     || '').toLowerCase().includes(q);
    return matchGeo && matchQ;
  }).sort((a, b) => new Date(b.published) - new Date(a.published));

  // Y2Y cikkek ne legyenek az első 5 között (hirdetés-érzet elkerülése)
  const y2yArts = [];
  for (let i = filtered.length - 1; i >= 0; i--) {
    if ((filtered[i].source || '').toLowerCase().includes('y2y') && i < 5) {
      y2yArts.unshift(...filtered.splice(i, 1));
    }
  }
  if (y2yArts.length) filtered.splice(Math.min(5, filtered.length), 0, ...y2yArts);

  // Azonos forrasok ne keruljenek egymas melle — interleave by source
  const featured = filtered.shift();         // featured card mindig elso marad
  const rest = interleaveBySource(filtered);
  filtered.length = 0;
  if (featured) filtered.push(featured);
  filtered.push(...rest);

  if (!filtered.length) {
    grid.innerHTML = '<div class="empty-state"><div class="empty-icon">&#x1F50D;</div><h2>Nincs tal&aacute;lat</h2><p>Pr&oacute;b&aacute;lj m&aacute;s felt&eacute;teleket.</p></div>';
    return;
  }

  grid.innerHTML = '<p class="result-count">' + filtered.length + ' cikk</p>'
    + filtered.map((a, i) => cardHTML(a, i)).join('');
}

const GEO_COLOR = {
  '\u{1F1FA}\u{1F1F8} USA':     '#2563eb',   // blue
  '\u{1F1EA}\u{1F1FA} EU':      '#dc2626',   // red
  '\u{1F30D} Global':           '#0891b2',   // teal
  '\u{1F30F} \u00C1zsia':       '#7c3aed',   // purple
};

function cardHTML(a, idx) {
  const date     = a.published ? formatDate(a.published) : '';
  const sum      = a.summary_hu ? esc(a.summary_hu) : '<em>&Ouml;sszefoglal&oacute; hamarosan&hellip;</em>';
  const title    = a.title_hu || a.title || 'C&iacute;m n&eacute;lk&uuml;l';
  const isFeat   = idx === 0;
  const ageMs    = a.published ? Date.now() - new Date(a.published) : Infinity;
  const isNew    = ageMs < 8 * 3600 * 1000 && !(a.source || '').toLowerCase().includes('y2y');
  const num      = String(idx + 1).padStart(2, '0');
  const words    = ((a.excerpt || '') + ' ' + (a.summary_hu || '')).trim().split(/\s+/).length;
  const readTime = Math.max(2, Math.round(words / 180));
  const geoColor = GEO_COLOR[a.geo] || '#c9a84c';
  const flag     = a.geo ? a.geo.split(' ')[0] : '';

  const isWide   = !isFeat && idx % 4 === 0;   // every 4th card spans 2 cols

  const h        = strHash(a.url || a.title || String(idx));
  const imgSrc   = a.image || '';
  const imgStyle = imgSrc ? ' style="background-image:url(\'' + imgSrc + '\')"' : '';
  const cover = '<div class="card-cover' + (imgSrc ? ' has-image' : '') + '"' + imgStyle + '>'
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

  return '<article class="card' + (isFeat ? ' featured' : isWide ? ' card--wide' : '') + '" data-geo="' + esc(a.geo || '') + '" data-url="' + esc(a.url) + '" style="--geo-color:' + geoColor + ';cursor:pointer">'
    + inner
    + '</article>';
}

// Azonos forrasok szetszorasahoz: ne legyenek egymas mellett
function interleaveBySource(articles) {
  const result = [];
  const pool = [...articles];
  while (pool.length) {
    const lastSrc = result.length ? result[result.length - 1].source : null;
    const idx = pool.findIndex(a => a.source !== lastSrc);
    result.push(...pool.splice(idx === -1 ? 0 : idx, 1));
  }
  return result;
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

function strHash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

loadNews();
