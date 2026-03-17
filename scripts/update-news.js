// Összefoglalók hozzáadása és news.json frissítése
const fs = require('fs');
const path = require('path');

const raw = require('../data/raw-new-articles.json');
const existing = require('../public/data/news.json');

const existingUrls = new Set(existing.articles.map(a => a.url));

const summaries = [
  {
    url: raw.articles.find(a => a.title && a.title.includes('Monitoring')).url,
    title_hu: 'Ebédszüneti rádióügyelet: nem jár érte plusz fizetés',
    summary_hu: 'Az amerikai 6. kerületi fellebbviteli bíróság elutasított egy biztonsági őr keresetét, aki az ebédszünet alatti rádiós készenlét kompenzációját követelte. A bíróság megállapította, hogy az ügy nem tartalmazott elegendő bizonyítékot a rendszeres megszakításokra. Az ítélet fontos precedenst teremt a készenléti jellegű munkaszünetek munkajogi megítélésében.'
  },
  {
    url: raw.articles.find(a => a.title && a.title.includes('Lush')).url,
    title_hu: 'A Lush megegyezett a nemiazonosság-alapú diszkriminációs perben',
    summary_hu: 'A kozmetikai vállalat egyezséget kötött egy nemiazonosság-alapú diszkriminációs ügyben, amelyet az EEOC indított, de ideológiai fordulata után visszavont. Az eset rámutat: az ilyen perek az EEOC visszalépése ellenére sem szűnnek meg, más jogi úton folytathatók. A megállapodás részleteit nem hozták nyilvánosságra.'
  },
  {
    url: raw.articles.find(a => a.title && a.title.includes('RTO')).url,
    title_hu: 'Az irodai visszatérés csak akkor működik, ha van valódi értelme',
    summary_hu: 'A visszatérési mandátumok helyett a szervezetek akkor érnek el tartós eredményt, ha a személyes jelenlétet értelmes együttműködési alkalmakhoz kötik. A Lloyds Bank, a DHL és más vállalatok tapasztalatai alapján az emberek szívesebben mennek be, ha a jelenlétnek konkrét hozzáadott értéke van. A kényszer helyett az önkéntesség és a minőségi közös munka a fenntartható megoldás.'
  },
  {
    url: raw.articles.find(a => a.title && a.title.includes('Right Partner')).url,
    title_hu: 'Gallup-partnerség: hogyan épül a kivételes munkahely?',
    summary_hu: 'A Gallup stratégiai partnersége segít szervezeteknek adatvezérelt döntésekkel javítani a munkavállalói élményt és az üzleti teljesítményt. Évtizedes kutatási háttérre támaszkodva azonosítják a fejlesztési területeket és mérik az előrehaladást. Megközelítésük bizonyítékon alapul, nem általános tanácsadói megérzésen.'
  },
  {
    url: raw.articles.find(a => a.title && a.title.includes('Employee Engagement')).url,
    title_hu: 'Munkavállalói elköteleződés és élmény – Gallup-megközelítés',
    summary_hu: 'A munkavállalói élmény tudatos fejlesztése lehetőséget teremt egyéni és szervezeti szinten egyaránt. A Gallup kutatásai szerint az elköteleződés nemcsak jóléti kérdés, hanem közvetlen üzleti teljesítménytényező. A programok tervezésekor érdemes a teljes munkavállalói életciklust figyelembe venni, az onboardingtól a kilépésig.'
  },
  {
    url: raw.articles.find(a => a.title && a.title.includes('Create a Culture')).url,
    title_hu: 'Inspiráló szervezeti kultúra – nem véletlenszerűen alakul',
    summary_hu: 'A vállalati kultúra tudatos kialakítása közvetlenül befolyásolja a munkavállalói teljesítményt és az elégedettséget. A Gallup szerint a kultúra nem magától formálódik, hanem tervezett beavatkozásokkal irányítható. Az erős kultúrájú szervezetek tartósabb versenyelőnyt élveznek a tehetségpiacon és az ügyfélkapcsolatokban egyaránt.'
  },
  {
    url: raw.articles.find(a => a.title && a.title.includes('Managers Who')).url,
    title_hu: 'Olyan vezetőket toborozz, akikért érdemes dolgozni',
    summary_hu: 'A megfelelő emberek menedzseri szerepbe helyezése döntő hatással van a csapatok teljesítményére és a megtartási mutatókra. A Gallup kutatásai szerint a munkavállalók leggyakrabban a közvetlen felettesük miatt hagyják el a szervezetet – és ennek fordítottja is igaz. A jó vezető megtalálása és fejlesztése az egyik legjobb megtérülésű befektetés.'
  },
  {
    url: raw.articles.find(a => a.title && a.title.includes('Hire for Potential')).url,
    title_hu: 'Toborozz potenciálra, ne csak tapasztalatra',
    summary_hu: 'A prediktív analitika alkalmazása a toborzásban segít azonosítani azokat a jelölteket, akik hosszú távon a legjobban teljesítenek az adott szerepkörben. A kompetencia helyett a fejlődési potenciál mérése pontosabb előrejelzést ad a jövőbeli munkateljesítményről. Az adatvezérelt kiválasztás csökkenti a rossz döntések kockázatát és a belőlük fakadó költségeket.'
  },
  {
    url: raw.articles.find(a => a.title && a.title.includes('Customer Centricity')).url,
    title_hu: 'Ügyfélközpontúság: az elkötelezett munkavállaló a legjobb eszköz',
    summary_hu: 'Az ügyfélközpontú szervezeti stratégia és a munkavállalói elköteleződés szorosan összefüggnek egymással. A Gallup adatai szerint az elkötelezett munkatársak természetesen ügyfélközpontúbban viselkednek – nem utasításra, hanem belső motivációból. Az ügyfélélmény javításának egyik leghatékonyabb módja ezért a belső kultúra és elköteleződés fejlesztése.'
  },
  {
    url: raw.articles.find(a => a.title && a.title.includes('Wellbeing')).url,
    title_hu: 'Magas teljesítmény csak magas jóllét mellett fenntartható',
    summary_hu: 'A munkavállalói jóllét nem pusztán egy wellness-program, hanem a tartós üzleti teljesítmény alapja. A Gallup adatai szerint a komplex jóléti programok – amelyek fizikai, pszichológiai és szociális dimenziókat is lefednek – hosszú távon javítják a termelékenységet és csökkentik a fluktuációt. Valódi jóléti kultúrát építő szervezetek versenyelőnyre tesznek szert a tehetségháborúban.'
  },
  {
    url: raw.articles.find(a => a.title && a.title.includes('AI Adoption')).url,
    title_hu: 'MI-adaptáció a munkahelyen – Gallup felméri, hol tart a szervezeted',
    summary_hu: 'A Gallup új mesterségesintelligencia-felkészültségi megoldása segít szervezeteknek felmérni, hol tartanak az MI-integráció útján. A kutatóintézet a bevezetés humán oldalát vizsgálja: az elfogadottságot, a kompetenciafejlesztési igényeket és a kulturális akadályokat. Az adatokon alapuló megközelítés lehetővé teszi a célzott, valóban hatásos beavatkozásokat.'
  },
  {
    url: raw.articles.find(a => a.title && a.title.includes('back-sitting')).url,
    title_hu: 'Hogy fogjuk megoldani a back-sittinget? És főleg ki?',
    summary_hu: 'A Y2Y back-sitting cikke óriási visszhangot váltott ki – sokan ismertek magukra a jelenségben. Dorka azt vizsgálja, kit terhel a változtatás felelőssége: a vezetőt, a szervezetet vagy a munkavállalót? A cikk nem ad egyszerű receptet, de rámutat: a rendszer mindig erősebb az egyénnél, és éppen ezért nem elég csak egy szinten beavatkozni.'
  },
  {
    url: raw.articles.find(a => a.title && a.title.includes('Ledermedve')).url,
    title_hu: 'Ledermedve – vendégcikk a kiégésről',
    summary_hu: 'A back-sitting cikk hatására megszólalt Csatlós Csilla kiégés-specialista is, aki vendégbloggerként osztja meg tapasztalatait. A cikk a kiégés tüneteit és a visszaút lehetséges állomásait mutatja be egy elismert szakértő szemszögéből. Ha valaha is érezted már, hogy leragadtál és elfáradt a rendszerben – ez a cikk rólad szól.'
  }
];

const summaryMap = {};
summaries.forEach(s => { summaryMap[s.url] = s; });

const now = Date.now();
const newArticles = raw.articles
  .filter(a => !existingUrls.has(a.url))
  .map((a, i) => {
    const s = summaryMap[a.url] || {};
    return {
      id: String(now - i) + '_' + String(Math.floor(Math.random() * 9000 + 1000)),
      source: a.source,
      category: a.category,
      color: a.color || '#c9a84c',
      geo: a.geo,
      title: a.title,
      title_hu: s.title_hu || a.title,
      url: a.url,
      published: a.published,
      excerpt: a.excerpt || '',
      image: a.image || '',
      summary_hu: s.summary_hu || ''
    };
  });

const cutoff = new Date(Date.now() - 30 * 24 * 3600 * 1000);
const merged = [...newArticles, ...existing.articles]
  .filter(a => !a.published || new Date(a.published) > cutoff);

const output = {
  lastUpdated: new Date().toISOString(),
  articles: merged
};

fs.writeFileSync(path.join(__dirname, '../public/data/news.json'), JSON.stringify(output, null, 2));
console.log('✅ news.json frissítve: ' + merged.length + ' cikk (' + newArticles.length + ' új)');
