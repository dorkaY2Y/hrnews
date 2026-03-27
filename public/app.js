/* HR World News – Frontend JS */

const grid          = document.getElementById('articlesGrid');
const geoInner      = document.getElementById('geoBar').querySelector('.geo-inner');
const searchInput   = document.getElementById('searchInput');
const lastUpdatedEl = document.getElementById('lastUpdated');
const liveClockEl   = document.getElementById('liveClock');
const headerStats   = document.getElementById('headerStats');

let allArticles  = [];
let activeGeo    = 'all';
// ─── Pay Transparency napi Q&A (bértranszparencia.hu) ────────────────────────
const PAY_TRANSPARENCY_QA = [{"q":"Mi az a bértranszparencia, és miről szól pontosan az irányelv?","a":"2023/970/EU irányelv Az EU bértranszparencia irányelv teljes neve: az Európai Parlament és a Tanács (EU) 2023/970 irányelve (2023. május 10.) a nemek közötti egyenlő díjazás elvének bérek átláthatósága és végrehajtási mechanizmusok útján való megerősítéséről . Az irányelv célja kettős: egyrészt kötelezővé teszi a bérezési rendszerek átláthatóvá tét"},{"q":"Mit jelent pontosan a „díjazás\" fogalma az irányelv szerint?","a":"3. cikk (1) bekezdés a) pont Az irányelv tágabb fogalommal dolgozik, mint a hétköznapi „bér\". A díjazás magában foglalja a bruttó alapbért vagy alap-munkabért ÉS minden egyéb juttatást , amelyet a munkavállaló a munkáltatótól közvetlenül vagy közvetve, készpénzben vagy természetben kap a munkavégzésre tekintettel. Ez a gyakorlatban azt jelenti, hog"},{"q":"Mit jelent az „egyenlő értékű munka\" fogalma?","a":"3. cikk (1) bekezdés g) pont Az irányelv alapján az egyenlő értékű munkát objektív, nemi szempontból semleges kritériumok alapján kell meghatározni . Ezek a kritériumok: Készségek (tudás, képzettség, szakértelem) Erőfeszítés (szellemi és fizikai megterhelés) Felelősség (személyekért, eszközökért, anyagi értékekért) Munkakörülmények (fizikai körülmé"},{"q":"Mi a „nemek közötti bérkülönbség\" pontos definíciója?","a":"3. cikk (1) bekezdés c) pont A nemek közötti bérkülönbség = a női munkavállalók bruttó órabérének átlaga és a férfi munkavállalók bruttó órabérének átlaga közötti különbség, a férfi munkavállalók bruttó órabérének átlagához viszonyítva, százalékban kifejezve . Példa: ha a nők átlagbére 480 000 Ft/hó, a férfiaké 520 000 Ft/hó, akkor a bérkülönbség: "},{"q":"Vonatkozik-e az irányelv a szabadúszókra, önfoglalkoztatókra, megbízási jogviszonyban dolgozókra?","a":"1. cikk (2) bekezdés – személyi hatály Nem. Az irányelv kizárólag azokra vonatkozik, akik munkaviszonyban (munkaszerződés alapján) dolgoznak . Önfoglalkoztatók, szabadúszók, vállalkozási vagy megbízási jogviszonyban dolgozók – beleértve az egyéni vállalkozókat és a kiszervezett munkaerőt – nem tartoznak az irányelv személyi hatálya alá. A határvona"},{"q":"Mikor és hogyan kell tájékoztatni a pályázókat a bérsávról?","a":"5. cikk (1) bekezdés Az irányelv alapján a munkáltatóknak az állásra pályázók számára legkésőbb az első interjút megelőzően tájékoztatást kell adniuk a pozícióhoz tartozó kezdeti bérről vagy bérsávról . Ez megjelenhet az álláshirdetésben, de közölhető e-mailben vagy bármilyen más formában is – a lényeg, hogy az interjú megkezdése előtt a pályázó re"},{"q":"Tilos megkérdezni a jelölt korábbi vagy jelenlegi fizetését?","a":"5. cikk (2) bekezdés Igen, kifejezetten tilos . Az irányelv alapján a munkáltató nem kérdezheti meg a jelöltet az aktuális vagy korábbi munkaviszonyában kapott díjazásáról. Ennek logikája: ha a bérajánlat a jelölt korábbi fizetésén alapul, az állandósítja a meglévő bérszakadékokat – különösen azokat, amelyek nemi alapon alakultak ki. A bérajánlatna"},{"q":"Vonatkozik-e az irányelv a külső toborzókra, fejvadászokra is?","a":"5. cikk (1)–(2) bekezdés Az irányelv a munkáltatót kötelezi – de ha a munkáltató nevében eljáró toborzó (fejvadász, ügynökség) megsérti a fenti szabályokat (pl. megkérdezi a korábbi fizetést), az a munkáltató felelősségét vonja maga után. A gyakorlatban ez azt jelenti, hogy a HR-csapatnak és a toborzási partnereknek is fel kell készülniük arra, hog"},{"q":"Vonatkozik-e a bérsáv-tájékoztatási kötelezettség a belső (cégen belüli) pályázatokra is?","a":"5. cikk (1) bekezdés Igen. Az 5. cikk „az állásra pályázó\" fogalmat használja, ami magában foglalja a belső pályázókat is. Ha a cég belső pályázattal tölt be pozíciót, a bérsávról legkésőbb az első belső interjút megelőzően kell tájékoztatni a pályázót – ez megjelenhet a belső hirdetésben, de más formában (pl. e-mailben) is közölhető. Ez azt jelent"},{"q":"Megengedett-e nagyon széles bérsávot közzétenni, hogy ne derüljön ki a belső bérezés?","a":"5. cikk (1) bekezdés – a sáv értelmezése Az irányelv nem rögzíti, milyen széles lehet egy bérsáv. Technikailag a „300 000–600 000 Ft\" megfelel a betű szerinti kötelezettségnek – de az irányelv célja a valódi átláthatóság biztosítása. A joggyakorlat várhatóan azt fogja megkövetelni, hogy a bérsáv érdemi tájékoztatást nyújtson : ha a sáv annyira tág,"},{"q":"Marad-e a fizetési alku (tárgyalás) lehetősége, ha kötelező a bérsáv közzététele?","a":"5. cikk – a sáv mint keret Igen, a bértárgyalás nem tiltott. Az irányelv a bérsáv közzétételét írja elő, nem azt, hogy a munkáltató minden jelöltnek ugyanannyit fizessen. A sávon belül a konkrét ajánlat egyeztetés tárgya marad. A változás: az alku egy átlátható kereten belül zajlik. A jelölt tudja, mi a pozíció értéksávja, a munkáltató pedig nem te"},{"q":"Milyen bérmegállapítási kritériumokat kell nyilvánosságra hozni?","a":"6. cikk A munkáltatónak hozzáférhetővé kell tennie a munkavállalók számára a bérmegállapításhoz és a béremelésekhez alkalmazott kritériumokat. Ezeknek objektívnak és nemi szempontból semlegesnek kell lenniük. A belső hozzáférhetőség minimum követelménye: a munkavállaló meg tudja tudni, hogy miért keresi annyit, amennyit keres , és mi alapján emelke"},{"q":"Milyen tájékoztatáshoz van joga a munkavállalónak a saját béréről?","a":"7. cikk (1) és (3) bekezdés A munkavállalónak joga van kérésre írásban tájékoztatást kapni: Saját egyéni díjazásának szintjéről Az azonos vagy egyenlő értékű munkát végzők átlagos díjazásáról, nemek szerinti bontásban A munkáltató köteles erre 2 hónapon belül válaszolni . Proaktív éves tájékoztatás – 7. cikk (3): A munkáltató köteles évente, kérés "},{"q":"Kötelező megmutatni a kollégák konkrét fizetését?","a":"7. cikk (1) bekezdés Nem , a konkrét egyéni fizetések nem nyilvánosak – de az átlagok igen . A munkáltató köteles közölni, hogy az azonos vagy egyenértékű munkakörben dolgozók átlagosan mennyit keresnek – nemenkénti bontásban. Ez két különböző dolog: Amit nem kell megmutatni: Kovács Péter pontosan 650 000 Ft-ot keres Amit meg kell mutatni: a te mun"},{"q":"Hogyan egyeztethető össze a bérinformációk közzététele a GDPR adatvédelmi szabályaival?","a":"12. cikk – adatkezelési garanciák Az irányelv 12. cikke kifejezetten rendezi a GDPR és a béradatok közlésének viszonyát: a bérinformációk közlése jogszerű az egyenlő díjazás elvének érvényesítése céljából, és ez a cél kellő jogalapot teremt az adatkezeléshez. A munkáltató nem hivatkozhat a GDPR-ra a bérsáv vagy a nemi bérszakadékra vonatkozó aggreg"},{"q":"Kinek kell bérjelentést készíteni, és milyen gyakorisággal?","a":"9. cikk (1)–(4) bekezdés A bérjelentési kötelezettség a munkáltató méretétől függ: 250 fő felett: évente, első határidő 2027. június 7. 150–249 fő: háromévente, első határidő 2027. június 7. 100–149 fő: háromévente, első határidő 2031. június 7. 100 fő alatt: önkéntes alapon (de más kötelezettségek – pl. álláshirdetési szabály – vonatkoznak rájuk) "},{"q":"Mit kell tartalmaznia a bérjelentésnek?","a":"9. cikk (1) bekezdés a)–g) pontok A bérjelentésnek az alábbi adatokat kell tartalmaznia, munkakör-kategóriánkénti bontásban : A nemek közötti átlagos bérkülönbség (bruttó órabér alapján) A nemek közötti mediánbér-különbség A változó bérelemek (bónusz, juttatás) nemek szerinti átlagainak különbsége A változó bérelemek mediánjának különbsége nemek sz"},{"q":"Mikor kötelező közös bérértékelést végezni?","a":"10. cikk A közös bérértékelés kötelező, ha egyszerre teljesül az alábbi három feltétel : A bérjelentés alapján bármelyik munkakör-kategóriában legalább 5%-os bérkülönbség mutatható ki A munkáltató ezt a különbséget nem tudja objektív, nemi szempontból semleges tényezőkkel igazolni A különbség 6 hónapon belül nem szűnt meg A közös bérértékelést a mu"},{"q":"Milyen kártérítésre jogosult a diszkrimináció áldozata?","a":"16. cikk Az irányelv teljes kártérítést garantál. Ez magában foglalja: Bérhátralékok és kapcsolódó jutalmak teljes rendezése – visszamenőleg Nem vagyoni kár megtérítése (pl. erkölcsi kár, stressz, hátrányos bánásmód következményei) Elveszett egyéb lehetőségek kompenzációja Különösen fontos: a tagállamok nem írhatnak elő felső korlátot a kártérítés "},{"q":"Hogyan működik a bizonyítási teher megfordítása?","a":"18. cikk Az irányelv egyértelműen kimondja: ha a munkáltató nem teljesítette a bértranszparencia-kötelezettségeit (pl. nem adott tájékoztatást, nem készített bérjelentést), akkor a diszkrimináció vélelmezhető – és a munkáltatónak kell bizonyítania, hogy nem sértette meg az egyenlő díjazás elvét. A klasszikus bizonyítási teher megfordítása ebben az "},{"q":"Mi az elévülési idő a bértranszparenciával összefüggő igények esetén?","a":"21. cikk Az irányelv minimumkövetelménye: legalább 3 éves elévülési idő . Az elévülési idő nem kezdődhet el addig, amíg a munkavállaló nem tudta vagy ésszerűen nem tudhatta, hogy jogát megsértették. Különösen fontos következmény: ha a munkáltató évekig nem tette közzé a fizetési sávokat vagy a bérjelentést, és ezért a munkavállaló nem tudhatta, hog"},{"q":"Milyen szankciókra számíthat a szabályokat nem betartó munkáltató?","a":"23. cikk Az irányelv „hatékony, arányos és visszatartó erejű\" szankciók bevezetését írja elő a tagállamoknak. A szankciók lehetséges formái: Pénzbírságok – az irányelv szövege kifejezetten utal arra, hogy az éves árbevétel vagy bérköltség arányában megállapított bírságok is alkalmazhatók Ismételt jogsértés esetén emelt összegű bírságok Közbeszerzés"},{"q":"Fordulhatnak-e szervezetek vagy szakszervezetek bírósághoz a munkavállaló nevében?","a":"14. cikk Igen. Az irányelv kifejezetten lehetővé teszi, hogy egyenlőségi szervek, szakszervezetek, munkavállalói érdekképviseletek és más civil szervezetek – a munkavállaló nevében vagy érdekében – bírósági vagy hatósági eljárást indítsanak. Ez a kollektív jogorvoslat lehetőségét teremti meg: ha pl. egy vállalatnál szisztematikusan rosszabb fizetés"},{"q":"Megkérdezhetem és megbeszélhetem a kollégáimmal a fizetésünket?","a":"7. cikk (5) bekezdés Igen. Az irányelv kimondja, hogy a munkáltató nem korlátozhatja a munkavállalókat abban, hogy egymás között megosszák fizetési információikat . Más szóval: az olyan munkáltatói szabályok, amelyek megtiltják a bér megbeszélését, az irányelv hatályba lépése után jogellenessé válnak. Ez nem jelenti azt, hogy a munkáltatónak kötele"},{"q":"Mit tehetek, ha úgy érzem, bérszakadék áldozata vagyok?","a":"7. cikk, 16. cikk, 18. cikk Lépések sorrendben: 1. lépés: Kérj írásban tájékoztatást a munkáltatótól (7. cikk) – meg kell mondania, hogy az azonos munkakörben mi a nemenkénti átlagbér 2. lépés: Ha ez alapján 5%-nál nagyobb különbséget látsz és nem kapsz kielégítő magyarázatot, fordulj az egyenlőségi szervhez vagy a munkaügyi hatósághoz – ők jogosul"},{"q":"Megvéd-e az irányelv, ha panaszt teszek a munkáltatóm ellen?","a":"25. cikk – Megtorlásvédelem Igen. Az irányelv kifejezett megtorlásvédelmet biztosít: a munkáltató nem bocsáthatja el, nem degradálhatja, nem vonhat meg juttatásokat és nem tehet semmilyen hátrányos intézkedést azzal szemben, aki: Tájékoztatást kért a bérekről (7. cikk) Panaszt tett a munkáltatónál Bírósági vagy hatósági eljárást indított Más munkav"},{"q":"Kérhetek fizetésemelést a sávra hivatkozva?","a":"7. cikk – következménye Ha a közzétett sáv minimuma felett keresnek az azonos munkakörűek nálad , ez erős tárgyalási alap. De a helyzet attól függ, hol állsz a sávon belül: Ha a sáv minimuma alatt vagy: ez alapvetően jogsértés – a munkáltatónak emelnie kell legalább a minimumra Ha a sávon belül, de az átlag alatt vagy: ez megalapozottan tárgyalható"},{"q":"Mikor kell Magyarországon életbe lépnie az irányelvnek?","a":"34. cikk – Átültetési határidő Az irányelv kihirdetése az EU Hivatalos Lapjában: 2023. június 6. (tényleges hatálybalépés: 2023. június 26. ) Tagállami átültetési határidő: 2026. június 7. Ez azt jelenti, hogy Magyarországnak 2026 júniusáig be kell emelnie az irányelv rendelkezéseit a magyar jogba (Mt., egyéb munkaügyi jogszabályok). A bérjelentési"},{"q":"Vonatkozik-e az irányelv a 100 fő alatti cégekre is?","a":"5., 6., 7., 9. cikk – hatály és méretküszöbök Igen. A bérjelentési kötelezettség csak 100 fő felett vonatkozik a cégekre – de számos más kötelezettség mérethatártól függetlenül minden munkáltatóra érvényes: Bérsáv-tájékoztatás az interjú előtt (5. cikk) – mindenki Korábbi fizetés kérdezésének tilalma (5. cikk) – mindenki Bérmegállapítási kritériumo"},{"q":"Hogyan kezdjünk el felkészülni? Mi a javasolt sorrend?","a":"Gyakorlati útmutató – 2026-os megfeleléshez A javasolt felkészülési lépések: 1. Béraudit: Feltérképezed a jelenlegi bérezési helyzetet – ki mennyit keres, milyen munkakörben, és meg tudsz-e indokolni minden különbséget 2. Munkakör-értékelési rendszer: Kialakítod az objektív, nemi szempontból semleges munkakör-értékelési módszertant 3. Fizetési sávo"},{"q":"Mit jelent, hogy az irányelv „minimumkövetelményeket\" tartalmaz?","a":"27. cikk – Minimumkövetelmények Az irányelv minimumstandard: a tagállamok magasabb szintű védelmet nyújthatnak , de a meglévő védelmet csökkenteni nem engedhető. Ez azt jelenti: Ha egy tagállam (pl. Magyarország) eddig az egyenlő bér elvét már szigorúbban védte, azt meg kell tartani A tagállam dönthet úgy, hogy pl. a bérjelentés kötelezettségét 50 "},{"q":"Vonatkozik-e az irányelv a közszférára, az állami és önkormányzati alkalmazottakra is?","a":"1. cikk (2) bekezdés – személyi és tárgyi hatály Igen. Az irányelv mind a magán-, mind a közszférára vonatkozik. Az 1. cikk (2) bekezdése kifejezetten rögzíti, hogy a hatály kiterjed valamennyi munkáltatóra – legyen az magánvállalat, állami intézmény, önkormányzat, közintézmény, minisztérium vagy más közigazgatási szerv. A közalkalmazottak és közti"},{"q":"Vonatkozik-e az irányelv az EU-n kívüli (pl. amerikai, brit) anyacégű vállalatokra, ha Magyarországon is foglalkoztatnak?","a":"1. cikk (1) bekezdés – területi hatály (lex loci laboris) Igen. Az irányelv hatálya nem a cég bejegyzési helyéhez, hanem a munkavégzés helyszínéhez kötött. Ha egy külföldi (pl. USA-beli, brit, japán) anyacégű vállalat magyarországi munkavállalókat foglalkoztat: A munkavállalók jogai (bérsáv-tájékoztatás, összehasonlítható bérek) érvényesülnek A mun"}];

function getDailyQA() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const qa = PAY_TRANSPARENCY_QA[dayOfYear % PAY_TRANSPARENCY_QA.length];
  return {
    id: 'qa_daily_' + dayOfYear,
    source: 'Y2Y Pay Transparency',
    category: 'Bértranszparencia',
    color: '#7c3aed',
    geo: '🇪🇺 EU',
    title: qa.q,
    title_hu: qa.q,
    url: 'https://paytransparency.hu/pay-transparency-qa.html',
    published: new Date().toISOString(),
    addedAt: new Date().toISOString(),
    excerpt: qa.a,
    summary_hu: qa.a + '\n\n→ Teljes válasz: paytransparency.hu',
    isQA: true
  };
}


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
    const raw = data.articles || [];
    // Kiegyensúlyozott kiválasztás: max ~25 cikk geo-csoportonként (4 csoport × 25 = 100)
    const dailyQA = getDailyQA();
    const sorted = raw.sort((a, b) => new Date(b.addedAt || b.published || 0) - new Date(a.addedAt || a.published || 0));
    const perGroupMax = 8;
    const groupCounts = {};
    const balanced = [];
    for (const art of sorted) {
      const grp = geoGroup(art.geo || '');
      groupCounts[grp] = (groupCounts[grp] || 0);
      if (groupCounts[grp] < perGroupMax) {
        balanced.push(art);
        groupCounts[grp]++;
      }
      if (balanced.length >= 99) break;
    }
    allArticles = [dailyQA, ...balanced];
    if (data.lastUpdated && lastUpdatedEl) lastUpdatedEl.textContent = formatDate(data.lastUpdated, true);
  // Date display
  const dateEl = document.getElementById('headerDate');
  if (dateEl) {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' });
  }
    const sources = [...new Set(allArticles.map(a => a.source))].sort();
    if (headerStats) {
      headerStats.textContent = 'A világ 30 legfontosabb HR híre — minden reggel frissen, magyarul';
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
  // GEO tabs — csoportok alapján (USA=Amerika, EU=Európa+UK+DE+FR+HU, Globális, Ázsia)
  const geoOrder = ['🇺🇸 USA', '🇪🇺 EU', '🌍 Globális', '🌏 Ázsia'];
  const geoLabels = { '🇺🇸 USA': 'USA', '🇪🇺 EU': 'EU', '🌍 Globális': 'Global', '🌏 Ázsia': 'Ázsia' };
  const geoFlags  = { '🇺🇸 USA': '🇺🇸', '🇪🇺 EU': '🇪🇺', '🌍 Globális': '🌍', '🌏 Ázsia': '🌏' };

  geoOrder.forEach(grp => {
    const count = allArticles.filter(a => geoGroup(a.geo) === grp).length;
    if (count === 0) return;
    const geoColor = GEO_COLOR[grp] || '#c9a84c';
    const btn = document.createElement('button');
    btn.className   = 'geo-btn';
    btn.dataset.geo = grp;
    btn.style.setProperty('--btn-color', geoColor);
    btn.innerHTML   = geoFlags[grp] + ' <span class="geo-label">' + geoLabels[grp] + '</span>'
                    + '<span class="geo-count">' + count + '</span>';
    btn.addEventListener('click', () => setGeo(grp));
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
    const shareLink = 'https://up2date.hu/article?u=' + encodeURIComponent(art.url);
    const text = (art.title_hu || art.title || '')
      + '\n\n' + (art.summary_hu || '')
      + '\n\n🔗 ' + shareLink
      + '\n\nup2date.hu – Globális HR hírek naponta';
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
    if (type === 'native') {
      // Web Share API - mobile native sharing with image + summary + link
      const shareText = (art.title_hu || art.title || '') + '\n\n' +
        (art.summary_hu || '').slice(0, 280) + '\n\n📌 up2date.hu – Globális HR hírek';
      if (navigator.share) {
        navigator.share({ title: art.title_hu || art.title || '', text: shareText, url: makeShareUrls(art).messengerPage }).catch(() => {});
      } else {
        // Fallback: copy
        navigator.clipboard.writeText(shareText + '\n\n' + art.url).catch(() => {});
        shareBtn.textContent = '✓';
        setTimeout(() => { shareBtn.innerHTML = '<svg viewBox="0 0 16 16" fill="none"><path d="M2.5 8.5l3.5 3.5L13.5 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg> Megosztva!'; shareBtn.style.color = '#16a34a'; }, 200);
      }
    } else if (type === 'fb') {
      window.open(urls.fb, 'share-fb', 'width=620,height=520,resizable=yes');
    } else if (type === 'linkedin') {
      window.open(urls.linkedin, 'share-li', 'width=700,height=560,resizable=yes');
    } else if (type === 'messenger') {
      const sharePageUrl = makeShareUrls(art).messengerPage;
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = 'fb-messenger://share/?link=' + encodeURIComponent(sharePageUrl);
      } else {
        // Desktop: Facebook Send dialog (Messengerre is küldhető app_id nélkül)
        window.open(
          'https://www.facebook.com/dialog/send?link=' + encodeURIComponent(sharePageUrl) +
          '&redirect_uri=' + encodeURIComponent('https://up2date.hu'),
          'share-msg', 'width=700,height=500,resizable=yes'
        );
      }
    }
    return;
  }
  if (e.target.closest('a, button')) return;
  const card = e.target.closest('[data-cikk]');
  if (card && card.dataset.cikk) window.location.href = card.dataset.cikk;
});

let searchTimer;
searchInput.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(render, 200);
});

function render() {
  const q = searchInput.value.trim().toLowerCase();
  const filtered = allArticles.filter(a => {
    const matchGeo = activeGeo === 'all' || geoGroup(a.geo) === activeGeo;
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
  '🇺🇸 USA':        '#2563eb',   // blue
  '🇨🇦 Kanada':     '#2563eb',   // blue (Amerika csoport)
  '🇪🇺 EU':         '#dc2626',   // red
  '🇬🇧 UK':         '#dc2626',   // red (Európa csoport)
  '🇩🇪 Németország':'#dc2626',   // red
  '🇫🇷 Franciaország':'#dc2626', // red
  '🇭🇺 Magyar':     '#dc2626',   // red
  '🌍 Globális':    '#0891b2',   // teal
  '🌍 Global':      '#0891b2',   // teal
  '🌏 Ázsia':       '#7c3aed',   // purple
};

// Normalizálja a geo értékeket a 4 fő filter-kategóriára
const GEO_GROUP = {
  '🇺🇸 USA':          '🇺🇸 USA',
  '🇨🇦 Kanada':       '🇺🇸 USA',      // Amerika
  '🇬🇧 UK':           '🇪🇺 EU',
  '🇩🇪 Németország':  '🇪🇺 EU',
  '🇫🇷 Franciaország':'🇪🇺 EU',
  '🇭🇺 Magyar':       '🇪🇺 EU',
  '🇪🇺 EU':           '🇪🇺 EU',
  '🌍 Globális':      '🌍 Globális',
  '🌍 Global':        '🌍 Globális',
  '🌏 Ázsia':         '🌏 Ázsia',
};

function geoGroup(geo) {
  return GEO_GROUP[geo] || geo;
}

function cardHTML(a, idx) {
  // Q&A kártya: bértranszparencia napi kérdés
  if (a.isQA) {
    return '<a class="news-card qa-card" href="' + esc(a.url) + '" target="_blank" rel="noopener">'
      + '<div class="qa-card-inner">'
      + '<div class="qa-badge">❓ Napi Bértranszparencia Q&amp;A</div>'
      + '<h3 class="qa-question">' + esc(a.title_hu) + '</h3>'
      + '<p class="qa-answer">' + esc((a.summary_hu || '').replace('\n\n→ Teljes válasz: paytransparency.hu', '')) + '…</p>'
      + '<span class="qa-link">Teljes válasz a paytransparency.hu-n →</span>'
      + '</div>'
      + '</a>';
  }

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
  const imgTag   = imgSrc ? '<img src="' + imgSrc + '" alt="' + esc(title) + '" loading="lazy" class="card-cover-img" width="400" height="225">' : '';
  const cover = '<div class="card-cover' + (imgSrc ? ' has-image' : '') + '"' + imgStyle + '>'
    + imgTag
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
    +   '<h3 class="card-title">' + esc(title) + '</h3>'
    +   '<div class="card-divider"></div>'
    +   '<p class="summary-label">Magyar &ouml;sszefoglal&oacute;</p>'
    +   '<p class="card-summary">' + sum + '</p>'
    + '</div>';

  const shareUrls = makeShareUrls(a);
  const su = esc(a.url);
  // Mobile-first native share button (Web Share API)
  const nativeShareBtn = '<button class="share-btn share-btn--native" data-share="native" data-share-url="' + su + '" title="Megosztás" aria-label="Megosztás">'
    + '<svg viewBox="0 0 16 16" fill="none"><circle cx="12.5" cy="3.5" r="1.5" stroke="currentColor" stroke-width="1.4"/><circle cx="3.5" cy="8" r="1.5" stroke="currentColor" stroke-width="1.4"/><circle cx="12.5" cy="12.5" r="1.5" stroke="currentColor" stroke-width="1.4"/><path d="M5 7l6-3M5 9l6 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>'
    + '</button>';
  const shareHtml = '<div class="card-share">'
    + '<span class="share-label">Megoszt</span>'
    + nativeShareBtn
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

  const cikkUrl = '/cikk.html#' + encodeURIComponent(a.url);
  const footer = '<div class="card-footer">'
    +   '<a class="read-link" href="' + esc(cikkUrl) + '">'
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

  const cikkHref = '/cikk.html#' + encodeURIComponent(a.url);
  return '<article class="card' + (isFeat ? ' featured' : isWide ? ' card--wide' : '') + '" data-geo="' + esc(a.geo || '') + '" data-cikk="' + esc(cikkHref) + '" style="--geo-color:' + geoColor + ';cursor:pointer">'
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
    fb:           'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(sharePageUrl) + '&quote=' + encodeURIComponent(fbText),
    linkedin:     'https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(sharePageUrl) + '&title=' + encodeURIComponent(title) + '&summary=' + encodeURIComponent(short) + '&source=up2date.hu',
    messengerPage: sharePageUrl,
    email:        'mailto:?subject=' + encodeURIComponent(title) + '&body=' + encodeURIComponent(emailBody)
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
