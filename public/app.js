/* HR World News – Frontend JS */

const grid          = document.getElementById('articlesGrid');
const geoInner      = document.getElementById('geoBar').querySelector('.geo-inner');
const searchInput   = document.getElementById('searchInput');
const lastUpdatedEl = document.getElementById('lastUpdated');
const liveClockEl   = document.getElementById('liveClock');
const headerStats   = document.getElementById('headerStats');

let allArticles  = [];
let activeGeo    = 'all';

// Élő óra — minden percben frissül
function updateLiveClock() {
  if (!liveClockEl) return;
  const now = new Date();
  const hh  = String(now.getHours()).padStart(2, '0');
  const mm  = String(now.getMinutes()).padStart(2, '0');
  liveClockEl.textContent = hh + ':' + mm;
}
updateLiveClock();
setInterval(updateLiveClock, 10000);

async function loadNews() {
  showSkeletons();
  try {
    const res  = await fetch('data/news.json?t=' + Date.now());
    const data = await res.json();
    allArticles = data.articles || [];
    if (data.lastUpdated && lastUpdatedEl) lastUpdatedEl.textContent = formatDate(data.lastUpdated, true);
  // Date display
  const dateEl = document.getElementById('headerDate');
  if (dateEl) {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' });
  }
    const sources = [...new Set(allArticles.map(a => a.source))].sort();
    if (headerStats) {
      headerStats.textContent = allArticles.length + ' cikk · 20+ forrás';
    }
    // Footer: forrásszám statikus 20+
    const statEls = document.querySelectorAll('.footer-stat');
    if (statEls.length) {
      statEls.forEach(el => { if (el.textContent.includes('forrás')) el.querySelector('strong').textContent = '20+'; });
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
  // Copy button
  const copyBtn = e.target.closest('.share-btn--copy');
  if (copyBtn) {
    e.stopPropagation();
    const art = allArticles.find(a => a.url === copyBtn.dataset.copyUrl);
    if (!art) return;
    const text = (art.title_hu || art.title || '')
      + '\n\n' + (art.summary_hu || '')
      + '\n\n📌 Forrás: ' + art.url
      + '\n\nOlvasd naponta: https://up2date.hu';
    navigator.clipboard.writeText(text).then(() => {
      copyBtn.classList.add('copied');
      setTimeout(() => copyBtn.classList.remove('copied'), 2200);
    });
    return;
  }
  // Social share buttons (button[data-share])
  const shareBtn = e.target.closest('button[data-share]');
  if (shareBtn) {
    e.stopPropagation();
    const art = allArticles.find(a => a.url === shareBtn.dataset.shareUrl);
    if (!art) return;
    const urls = makeShareUrls(art);
    const type = shareBtn.dataset.share;
    if (type === 'fb') {
      window.open(urls.fb, 'share-fb', 'width=620,height=520,resizable=yes');
    } else if (type === 'linkedin') {
      window.open(urls.linkedin, 'share-li', 'width=700,height=560,resizable=yes');
    } else if (type === 'messenger') {
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = 'fb-messenger://share/?link=' + encodeURIComponent(art.url);
      } else {
        window.open('https://www.messenger.com/new', '_blank', 'width=900,height=600');
      }
    }
    return;
  }
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
  }).sort((a, b) => {
    // Ha van addedAt (mikor kerult be a rendszerbe), az dontso — igy az ujabban hozzaadott cikkek mindig elokelobb helyen lesznek
    const aTime = new Date(a.addedAt || a.published);
    const bTime = new Date(b.addedAt || b.published);
    return bTime - aTime;
  });

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

  const shareUrls = makeShareUrls(a);
  const su = esc(a.url);
  const shareHtml = '<div class="card-share">'
    + '<span class="share-label">Megoszt</span>'
    + '<button class="share-btn share-btn--copy" data-copy-url="' + su + '" title="Szöveg + link másolása" aria-label="Másolás">'
    + '<svg class="icon-copy" viewBox="0 0 16 16" fill="none"><rect x="5" y="4" width="8" height="10" rx="1.5" stroke="currentColor" stroke-width="1.4"/><path d="M3 11V3a1 1 0 011-1h6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>'
    + '<svg class="icon-check" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    + '</button>'
    + '<a class="share-btn share-btn--email" href="' + shareUrls.email + '" title="Küldés emailben" aria-label="Email">'
    + '<svg viewBox="0 0 16 16" fill="none"><rect x="2" y="3.5" width="12" height="9" rx="1.5" stroke="currentColor" stroke-width="1.4"/><path d="M2 6l6 4 6-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>'
    + '</a>'
    + '<button class="share-btn share-btn--messenger" data-share="messenger" data-share-url="' + su + '" title="Megosztás Messengeren" aria-label="Messenger">'
    + '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 1C4.134 1 1 3.9 1 7.5c0 1.9.82 3.6 2.14 4.82V14l2.12-1.16A7.4 7.4 0 008 13c3.866 0 7-2.9 7-6.5S11.866 1 8 1zm.72 8.75L6.9 7.83 3.5 9.75l3.78-4 1.82 1.92 3.4-1.92-3.78 4z"/></svg>'
    + '</button>'
    + '<button class="share-btn share-btn--linkedin" data-share="linkedin" data-share-url="' + su + '" title="Megosztás LinkedIn-en" aria-label="LinkedIn">'
    + '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M3.5 2A1.5 1.5 0 102 3.5 1.5 1.5 0 003.5 2zM2 5.5h3V14H2zm4.5 0H9v1.1c.5-.8 1.4-1.3 2.5-1.3C13.5 5.3 14 7 14 9V14h-3V9.5c0-1.1-.4-1.8-1.3-1.8A1.4 1.4 0 008.4 8.6c-.1.2-.1.5-.1.7V14H6.5V5.5z"/></svg>'
    + '</button>'
    + '<button class="share-btn share-btn--facebook" data-share="fb" data-share-url="' + su + '" title="Megosztás Facebookon" aria-label="Facebook">'
    + '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M9.5 5.5V4c0-.6.4-1 1-1H12V1h-1.5C8.6 1 7.5 2.1 7.5 3.5V5.5H5.5V8h2v8h2V8h2l.5-2.5H9.5z"/></svg>'
    + '</button>'
    + '</div>';

  const footer = '<div class="card-footer">'
    +   '<a class="read-link" href="' + esc(a.url) + '" target="_blank" rel="noopener">'
    +     'Olvasd el'
    +     '<svg viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    +   '</a>'
    +   shareHtml
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

function makeShareUrls(a) {
  const title   = a.title_hu || a.title || '';
  const summary = a.summary_hu || '';
  const srcUrl  = a.url || '';
  const siteUrl = 'https://up2date.hu';
  const short   = summary.length > 260 ? summary.slice(0, 257) + '…' : summary;
  const sharePageUrl = siteUrl + '/article?u=' + encodeURIComponent(srcUrl);
  const fbText  = title + '\n\n' + short + '\n\n📌 Forrás: ' + srcUrl;
  const liText  = short + '\n\n📌 Forrás: ' + srcUrl;
  const emailBody = title + '\n\n' + summary
    + '\n\nForrás: ' + srcUrl
    + '\n\nOlvasd naponta: ' + siteUrl;
  return {
    fb:        'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(sharePageUrl) + '&quote=' + encodeURIComponent(fbText),
    linkedin:  'https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(sharePageUrl) + '&title=' + encodeURIComponent(title) + '&summary=' + encodeURIComponent(liText),
    messenger: 'fb-messenger://share/?link=' + encodeURIComponent(sharePageUrl),
    email:     'mailto:?subject=' + encodeURIComponent(title) + '&body=' + encodeURIComponent(emailBody)
  };
}

// Azonos forrasok szetszorasahoz: ne legyenek egymas mellett
function interleaveBySource(articles) {
  const result = [];
  const pool = [...articles]; // already sorted newest-first
  const LOOKAHEAD = 3; // only look this far ahead to avoid date order disruption
  while (pool.length) {
    const lastSrc = result.length ? result[result.length - 1].source : null;
    let picked = -1;
    for (let i = 0; i < Math.min(LOOKAHEAD, pool.length); i++) {
      if (pool[i].source !== lastSrc) { picked = i; break; }
    }
    result.push(...pool.splice(picked === -1 ? 0 : picked, 1));
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
