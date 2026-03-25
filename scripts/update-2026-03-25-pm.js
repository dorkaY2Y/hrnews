// HR News PM frissítés - 2026-03-25
const fs = require('fs');
const path = require('path');

const NEWS_JSON = path.join(__dirname, '../public/data/news.json');
const NOW = '2026-03-25T09:10:00.000Z';

const newArticles = [
  // ===== GLOBÁLIS (8) =====
  {
    source: "Harvard Business Review",
    category: "Leadership",
    color: "#991b1b",
    geo: "🌍 Globális",
    title: "Leaders Underestimate the Value of Employee Joy",
    title_hu: "A vezető alábecsüli a dolgozói öröm értékét",
    url: "https://hbr.org/2026/03/leaders-underestimate-the-value-of-employee-joy",
    published: "2026-03-24T12:25:17.000Z",
    addedAt: NOW,
    excerpt: "Learn as much about your employees as you do about your customers.",
    image: "https://hbr.org/resources/images/article_assets/2026/03/Mar26_24_MiguelPorlan.jpg",
    summary_hu: "A Harvard Business Review új kutatása rámutat: a legtöbb vezető sokkal kevesebbet tud arról, mi okoz valódi örömöt a munkatársaiknak, mint amennyit a vevőikről tud. Az érzelmek nem soft dolog – a munkavállalói öröm közvetlen hatással van a teljesítményre és az elkötelezettségre.",
    full_hu: "A legtöbb vezető sokkal többet tud arról, mi tetszik a vevőiknek, mint arról, mi okoz valódi örömöt a saját csapatának. A Harvard Business Review új kutatása ezt a paradoxont vizsgálja: miért fektetünk hatalmas energiát az ügyfélélménybe, miközben a munkavállalói élmény – és különösen az örömélmény – háttérbe szorul a napi döntéshozatalban?\n\nA kutatás azt mutatja, hogy a vezetők szisztematikusan alábecsülik, milyen mértékben befolyásolja a dolgozói öröm a teljesítményt, a kreativitást és a lojalitást. Az öröm nem soft tényező – mérhetően hat a problémamegoldó képességre, a csapatdinamikára és arra, hogy valaki másoknak is ajánlja-e a munkahelyét. A szerzők szerint a vállalatok erősen beruháznak az ügyféladatokba és a Net Promoter Score-okba – de ritkán kérdeznek rá ennyire rendszeresen arra, hogy a munkatársaik valójában mit élveznek a munkájukban.\n\nA HR-szakemberek számára az üzenet egyértelmű: a munkavállalói élmény tervezése nem csupán a juttatáscsomagokról szól. Az örömteremtés aktív szervezeti döntés – ehhez érteni kell, hogy ki mit talál értelmesnek, élvezetesnek, energetizálónak. A vezető, aki ezt tudja a csapatáról, hatékonyabban tud motiválni, delegálni és megtartani – pont úgy, ahogy egy ügyfélközpontú vállalat érti a vevői igényeket."
  },
  {
    source: "Harvard Business Review",
    category: "Leadership",
    color: "#991b1b",
    geo: "🌍 Globális",
    title: "How to Convince Others to Trust Your Instincts",
    title_hu: "Hogyan nyerd meg mások bizalmát az ösztönös döntéshozatalhoz?",
    url: "https://hbr.org/2026/03/how-to-convince-others-to-trust-your-instincts",
    published: "2026-03-24T12:15:25.000Z",
    addedAt: NOW,
    excerpt: "The best leaders communicate their intuition in a way that builds credibility and motivates action.",
    image: "https://hbr.org/resources/images/article_assets/2026/03/Mar26_24_AT3722-001.jpg",
    summary_hu: "A legjobb vezetők nemcsak megérzéseikre támaszkodnak – képesek azt a csapatukkal is hitelesen kommunikálni. Ez a HBR-elemzés azt mutatja be, hogyan lehet az intuitív döntéseket olyanná formálni, ami cselekvésre ösztönöz és bizalmat épít.",
    full_hu: "A tapasztalt vezető sokszor érzi: valami nem stimmel. Az ösztönös döntés megszületik – de hogyan adja azt el a csapatnak, az igazgatóságnak vagy a befektetőknek? A Harvard Business Review azt elemzi, hogy az intuíció önmagában nem elég: a hitelességhez kommunikálni is kell az ösztönös felismerést.\n\nA cikk szerzői három konkrét technikát azonosítanak, amelyekkel a vezető képes megérzéseit cselekvésre ösztönző, meggyőző érvvé alakítani. Az egyik kulcstényező: az intuíció forrásának feltárása – vagyis annak megmutatása, hogy a megérzés mögött valódi tapasztalat, mintafelismerés és releváns kontextus áll. A másik fontos elem: a bizonytalanság nyílt vállalása, ami paradox módon növeli a megbízhatóságot. A vezető, aki beismeri, hogy nem tud mindent, de bízik az ítéletében, hitelesebb, mint aki mindentudónak tűnik.\n\nHR-szemszögből nézve ez közvetlenül kapcsolódik a pszichológiai biztonsághoz és a vezetői hitelesség kérdéséhez. A tehetségmenedzsment és a szervezeti kultúra alakítása során a HR-igazgatók is rendszeresen kerülnek olyan helyzetbe, ahol az adatok nem adnak teljes képet – ilyenkor az intuitív ítélőképesség komoly eszköz. Ennek fejlesztése és kommunikálása nemcsak egyéni kompetencia, hanem szervezeti versenyelőny."
  },
  {
    source: "AIHR",
    category: "HR Fejlesztés",
    color: "#0891b2",
    geo: "🌍 Globális",
    title: "14 Company Culture Examples: 10 To Learn From and 4 To Avoid",
    title_hu: "14 szervezeti kultúra-példa: mit tanuljunk, mit kerüljük?",
    url: "https://www.aihr.com/blog/good-company-culture-examples/",
    published: "2026-03-24T11:04:41.000Z",
    addedAt: NOW,
    excerpt: "Company culture is the invisible force that can drive a business to exceptional success or drag it into scandal, disengagement, and high turnover.",
    image: "https://www.aihr.com/wp-content/uploads/Good-Company-Culture-Examples-Thumbnail.png",
    summary_hu: "Az AIHR összegyűjtött 14 valós vállalati példát arra, hogyan néz ki egy működő szervezeti kultúra – és milyen az, ami lassan de biztosan tönkreteszi a céget. Az elemzés a teljesítmény és az elköteleződés összefüggéseit vizsgálja konkrét eseteken keresztül.",
    full_hu: "A szervezeti kultúra az a láthatatlan erő, amely meghatározza, hogy az emberek mit mernek kimondani, hogyan döntenek, és mennyire érzik értékesnek a munkájukat. Az AIHR összegyűjtött 14 valós vállalati példát – tíz olyat, amiből érdemes tanulni, és négyet, amelyek intő jelként szolgálnak minden HR-vezető számára.\n\nA pozitív példák közt olyan cégek szerepelnek, ahol az erős kultúra kézzelfogható üzleti eredménnyel párosul. Az SHRM friss adatai szerint azok, akik saját kultúrájukat jónak vagy kiválónak értékelik, 83%-os arányban érzik motiváltnak magukat a minőségi munkára – szemben azokkal, akik romló kultúrában dolgoznak. A negatív esettanulmányok ezzel szemben azt mutatják meg, hogyan vezet a botrány, a fluktuáció és a szétesés oda, hogy a kultúra maga válik a cég legnagyobb kockázatává.\n\nA HR-szakembert ez az elemzés arra emlékezteti: a kultúra nem egy évi egyszeri értékelési folyamat eredménye, hanem napi döntések összessége. Milyen viselkedést jutalmazunk? Kit léptetünk elő? Mit tolerálunk hallgatólagosan? A kulturális auditnak ezekre a kérdésekre kell válaszolnia – nem csak az éves munkatársi felmérés eredményeire."
  },
  {
    source: "AIHR",
    category: "HR Fejlesztés",
    color: "#0891b2",
    geo: "🌍 Globális",
    title: "AI in Employee Onboarding: 8 Practical Use Cases + Real-Life Examples",
    title_hu: "MI az onboardingban: 8 konkrét alkalmazási eset a gyakorlatból",
    url: "https://www.aihr.com/blog/ai-in-employee-onboarding/",
    published: "2026-03-23T13:20:57.000Z",
    addedAt: NOW,
    excerpt: "Building a strong onboarding process means creating role-specific learning paths, keeping content up to date, and tailoring the experience to different functions.",
    image: "https://www.aihr.com/wp-content/uploads/AI-in-Employee-Onboarding-Thumbnail.png",
    summary_hu: "Az AIHR összegyűjti, hogyan használható a mesterséges intelligencia az új belépők beilleszkedési folyamatában – az egyéni tanulási útvonalaktól az automatizált kommunikációig. A cikk különösen hasznos ott, ahol a HR csapat kapacitása szűkös, de az onboarding minősége kulcskérdés.",
    full_hu: "Az onboarding az a kritikus pont, ahol az új munkatárs eldönti: jó helyen vagyok-e, vagy sem. A gond az, hogy a HR-csapatok 62%-a saját kapacitásán túl dolgozik – nincs idő egyéni, szerepspecifikus beilleszkedési folyamatokat tervezni és karbantartani. Az AIHR nyolc konkrét területet mutat be, ahol az AI ma már valódi segítséget nyújthat.\n\nAz alkalmazási esetek között szerepel a szerepspecifikus tanulási útvonalak automatizált generálása, az onboarding-tartalmak folyamatos frissítése, az új belépők kérdéseire válaszoló AI-asszisztensek és a haladás valós idejű nyomon követése. Az AIHR hangsúlyozza: az AI nem helyettesíti az emberi kapcsolatot az onboarding során – hanem felszabadítja a HR-t arra, hogy ott legyen jelen emberileg, ahol az tényleg számít.\n\nA HR-vezető számára ez konkrét lehetőséget jelent a terhelés csökkentésére és az élmény javítására egyszerre. A beilleszkedési folyamat minősége közvetlenül hat a 90 napos megtartásra – és az AI-eszközök alkalmazása nemcsak hatékonyabb, hanem skálázhatóbb onboardingot eredményez. Ez különösen fontos a gyorsan növekvő vagy nagy fluktuációval küzdő szervezetekben."
  },
  {
    source: "MIT Sloan",
    category: "Leadership & Strategy",
    color: "#9f1239",
    geo: "🌍 Globális",
    title: "Why Leaders Lose the Room in High-Stakes Meetings",
    title_hu: "Miért veszítik el a szobát a vezetők a kulcsfontosságú meetingeken?",
    url: "https://sloanreview.mit.edu/article/why-leaders-lose-the-room-in-high-stakes-meetings/",
    published: "2026-03-23T11:00:16.000Z",
    addedAt: NOW,
    excerpt: "The most consequential leadership communication happens in meetings where tough issues are being discussed and real decisions are being made.",
    image: "https://sloanreview.mit.edu/wp-content/uploads/2026/03/Duarte-2400x1260-1-1200x630.jpg",
    summary_hu: "A MIT Sloan kutatása szerint a legtöbb kommunikációs tréning rossz kérdésre ad választ: nem a pódium előtti szereplés számít, hanem az, ami a nehéz döntések meghozatala közben, a valódi tárgyalásokban történik. A tanulmány feltárja, milyen hibák vesznek el egy szobát.",
    full_hu: "A vezető hosszasan készül a prezentációra, a diák tökéletesek, az érvelés kristálytiszta – és mégis elveszti a szobát. A MIT Sloan Management Review szerint a legtöbb kommunikációs tréning rossz kérdésre ad választ: nem a pódium előtti szereplés számít, hanem az, ami a nehéz döntések meghozatala közben, a valódi tárgyalásokban történik.\n\nA szerzők azt vizsgálják, milyen hibákat követnek el leggyakrabban a vezetők a nagy tétű megbeszéléseken. Az egyik leggyakoribb: a pozíció korai és merev rögzítése, ami elzárja a lehetőséget a másik fél érveit befogadni. A másik: az érzelmi feszültség félreolvasása, ami a szobában uralkodó dinamika félreértéséhez vezet. A harmadik: az önmegerősítő információk keresése ahelyett, hogy az ellentmondásos adatokat is beengedjük a döntési folyamatba.\n\nHR-szemszögből nézve ezek a felismerések közvetlenül alkalmazhatók a teljesítményértékelési megbeszélésekre, az átszervezési kommunikációra, sőt a toborzásra is. A vezető, aki képes a szoba dinamikáját valós időben olvasni és reagálni rá, nemcsak jobb döntéseket hoz, hanem bizalmat és pszichológiai biztonságot is épít a csapatban. Ez a kompetencia tanítható – és erre egyre nagyobb szükség van."
  },
  {
    source: "Unleash",
    category: "HR Tech",
    color: "#db2777",
    geo: "🌍 Globális",
    title: "Western Digital: Why HR leadership in the future of work must be intentional every step of the way",
    title_hu: "Western Digital CHRO: szándékosság a jövő HR-vezető alapköve",
    url: "https://www.unleash.ai/strategy-and-leadership/western-digital-why-hr-leadership-in-the-future-of-work-must-be-intentional-every-step-of-the-way/",
    published: "2026-03-24T10:29:49.000Z",
    addedAt: NOW,
    excerpt: "UNLEASH sits down for an interview with Katie Watson, CHRO at Western Digital, to find out why intentionality is the cornerstone of HR leadership strategy.",
    image: "https://www.unleash.ai/wp-content/uploads/2026/03/AdobeStock_1925344390.jpeg",
    summary_hu: "Katie Watson, a Western Digital HR-igazgatója az UNLEASH konferencián elmondta: az AI és az automatizáció korában a HR-nek minden lépésénél tudatosnak kell lennie. A szándékosság nemcsak stratégiai kérdés – az emberi kapcsolatok megőrzésének alapja is.",
    full_hu: "Katie Watson, a Western Digital HR-igazgatója az UNLEASH America 2026 konferencián egy meglepően egyszerű, mégis mély vezérelvről beszélt: szándékosság. Minden HR-döntésnél, minden folyamatnál és minden emberi interakciónál fel kell tenni a kérdést: miért tesszük ezt? Kinek szól? Mit épít ez a szervezetben?\n\nAz AI és az automatizáció egyre több folyamatot vesz át – de Watson szerint éppen ezért válik a szándékosság stratégiai versenyelőnnyé. Amikor az algoritmusok kezelik az adatfeldolgozást, a mérést és az adminisztrációt, a HR egyetlen hozzáadott értéke az emberi ítélet és kapcsolat lesz. Ez nem elég, ha csak ösztönösen működünk – tudatosan kell tervezni, melyik pillanatban és hogyan lép be az emberi érintés.\n\nA Western Digital tapasztalata azt mutatja, hogy a szándékos HR-stratégia konkrét üzleti mérőszámokban is megjelenik: alacsonyabb fluktuáció, gyorsabb integrálás az M&A folyamatoknál, erősebb munkáltatói márka. Watson üzenete minden HR-vezető számára releváns: nem az a kérdés, hogy az AI-t bevezessük-e – hanem hogy milyen szándékkal és milyen értékek mentén tesszük ezt."
  },
  {
    source: "Unleash",
    category: "HR Tech",
    color: "#db2777",
    geo: "🌍 Globális",
    title: "3 ways HR was reinvented at UNLEASH America 2026",
    title_hu: "3 mód, ahogy a HR újradefiniálta magát az UNLEASH America 2026-on",
    url: "https://www.unleash.ai/unleash-america/3-ways-hr-was-reinvented-at-unleash-america-2026/",
    published: "2026-03-23T15:28:22.000Z",
    addedAt: NOW,
    excerpt: "The UNLEASH Editorial team was on-site in Las Vegas last week. Our Chief Reporter shares her key learnings from the show.",
    image: "https://www.unleash.ai/wp-content/uploads/2026/03/1J0A2387-Pano-Gina.jpg",
    summary_hu: "Las Vegasban tartotta meg idei konferenciáját az UNLEASH America – az esemény legfontosabb tanulsága: a HR nem csupán megváltozott, hanem teljes mértékben átírta a játékszabályokat. A helyszíni tudósítás a három legmeghatározóbb trendet foglalja össze.",
    full_hu: "Las Vegas talán nem az első város, ami a HR megújításáról jut eszünkbe – de az UNLEASH America 2026 konferencia pontosan ott történt, ahol a nagy fogadások szoktak. A szerkesztőségi csapat három kulcstémát emelt ki a rendezvény tapasztalataiból, amelyek meghatározzák a HR következő fejezetét.\n\nAz első: az AI nem a jövő – hanem a jelen. A konferencián bemutatkozott megoldások már nem POC-projektek, hanem éles rendszerek, amelyek a toborzástól a teljesítményértékelésig minden területen működnek. A második tanulság: a munkavállalói élmény és az AI-élmény összeolvad. Az emberek egyre inkább szimbiózisban dolgoznak az AI-eszközökkel – és a HR feladata ennek tudatos megtervezése. A harmadik: a HR-vezető szerepe fundamentálisan megváltozik – kevesebb adminisztráció, több stratégiai partnerség, mélyebb üzleti jelenlét.\n\nAz UNLEASH America 2026 tanulsága nem az, hogy minden azonnal megvalósítható. Hanem az, hogy a HR-szakma mozgásban van – és akik most formálják a saját szervezetük megközelítését, azok lesznek azok, akik a következő évtized munkaerőpiaci versenyét megnyerik. Az inspiráció megvolt. Most a cselekvés következik."
  },
  {
    source: "HCA Mag Asia",
    category: "HR News",
    color: "#065f46",
    geo: "🌍 Globális",
    title: "What the world's largest study of work hours reveals about how we work",
    title_hu: "160 ország, egy meglepő adat: mit mutat a munkaidő globális kutatása?",
    url: "https://www.hcamag.com/asia/news/general/what-the-worlds-largest-study-of-work-hours-reveals-about-how-we-work/569524",
    published: "2026-03-23T21:23:07.000Z",
    addedAt: NOW,
    excerpt: "New research spanning 160 countries upends conventional wisdom about labor, development, and the future of the workforce.",
    image: "https://cdn-res.keymedia.com/cms/images/us/037/0270_639098977732849549.jpg",
    summary_hu: "Egy 160 országot felölelő, precedens nélküli kutatás teljesen új megvilágításba helyezi a munkaóra és a gazdasági fejlettség összefüggéseit. Az eredmények megkérdőjelezik az általánosan elfogadott nézeteket a produktivitásról és a munkaerő jövőjéről.",
    full_hu: "160 ország, több millió adatpont, és egy meglepő következtetés: a hosszabb munkaidő nem vezet automatikusan magasabb fejlettséghez vagy produktivitáshoz. A valaha volt legnagyobb munkaidő-kutatás eredményei teljesen új keretbe helyezik a munkaerő-gazdálkodás egyik legősibb dilemmáját.\n\nA vizsgálat szerint a gazdaságilag fejlettebb országokban általában rövidebb az átlagos munkahét – miközben a termelékenység magasabb. A kapcsolat nem lineáris: egy ponton túl a több óra nem több eredményt, hanem kiégést, hibákat és motivációvesztést okoz. Ez különösen fontos az Ázsia-Csendes-óceáni térségben, ahol a hosszú munkaidő kultúrálisan elfogadott, de gazdaságilag kérdéses hatékonyságú.\n\nHR-szemszögből ez az adathalmaz megkérdőjelezi a \"mindig elérhető\" kultúra fenntarthatóságát. A rugalmas munkavégzés, a feladatalapú teljesítménymérés és a munkaidő tudatos tervezése nem csupán munkavállalói igény – hanem szervezeti versenyképességi kérdés. Nem az a sikeres munkaadó, aki a legtöbb órát hozza ki a dolgozóiból, hanem aki a legtöbbet a megfelelő órákból."
  },

  // ===== USA / KANADA (8) =====
  {
    source: "HR Dive",
    category: "HR News",
    color: "#0369a1",
    geo: "🇺🇸 USA",
    title: "Workforce is 'restless but largely immobile,' Gallup finds",
    title_hu: "Gallup: nyugtalan, de mozdulatlan a munkaerő",
    url: "https://www.hrdive.com/news/gallup-workforce-no-longer-thriving-engagement-low/815575/",
    published: "2026-03-24T19:58:00.000Z",
    addedAt: NOW,
    excerpt: "Worker engagement has fallen to its lowest level in a decade, and fewer than 3 in 10 workers feel it's a 'good time' to find a job.",
    image: "",
    summary_hu: "A Gallup legfrissebb adatai szerint az elkötelezettség tíz éves mélypontra süllyedt, és a munkavállalók kevesebb mint 30%-a érzi jó időpontnak az állásváltást. A jelenség neve: restless but immobile – az emberek elégedetlenek, de maradnak.",
    full_hu: "A Gallup 2026-os munkaerőpiaci felmérése riasztó képet fest: a munkavállalói elkötelezettség az elmúlt tíz év mélypontjára süllyedt az Egyesült Államokban. Ugyanakkor a dolgozók kevesebb mint 30%-a érzi jó időpontnak az állásváltást – ez az ellentmondás hozza létre azt a jelenséget, amit a Gallup így nevez: restless but largely immobile, vagyis nyugtalan, de mozdulatlan munkaerő.\n\nMi okozza ezt? A gazdasági bizonytalanság, az AI-átalakulástól való félelem és a munkaerőpiac érzékelt befagyása együtt hozta létre azt a pszichológiai állapotot, amelyben az emberek elégedetlenek, de nem lépnek. Maradnak az állásukban – anélkül, hogy valóban jelen lennének. Ez az érzelmi jelenlét hiánya pontosan az a csendes kivonulás, ami közvetlen hatással van a produktivitásra, az innovációra és az ügyfélelégedettségre.\n\nA HR-szakemberek számára ez az adat különösen sürgető. Egy alacsony elkötelezettségű, de alacsony fluktuációjú szervezet kettős csapdában van: sem a megtartás, sem az elköteleződés nem jelent stratégiai eszközt. A megoldás nem a retention program, hanem a mélyebb diagnózis: mi tartja itt az embereket, és miért nem érzik energizálónak a munkájukat? Amíg ezekre nincs válasz, a \"marad, de nem kapcsolódik\" állapot tartósul."
  },
  {
    source: "HR Dive",
    category: "HR News",
    color: "#0369a1",
    geo: "🇺🇸 USA",
    title: "Toxic managers dehumanize employees, leading to extreme burnout, study says",
    title_hu: "Mérgező főnök = dehumanizált dolgozó: kutatás a kiégés gyökeréről",
    url: "https://www.hrdive.com/news/organizational-dehumanization-toxic-bosses-psychology/815530/",
    published: "2026-03-24T15:08:00.000Z",
    addedAt: NOW,
    excerpt: "'A human-centric approach to management' that focuses on restoring employee agency could help, a study found.",
    image: "",
    summary_hu: "Az Occupational Health Psychology folyóiratban megjelent kutatás kimondja: a toxikus vezetői viselkedés dehumanizálja a munkatársakat, ami extrém kiégéshez vezet. A megoldás egy emberközpontú, az autonómiát visszaadó vezetési szemlélet.",
    full_hu: "Az Occupational Health Psychology folyóiratban megjelent friss kutatás kimondja, amit sokan éreztek már: a mérgező vezetői viselkedés nem csupán rossz munkahelyi légkört teremt – hanem szó szerint dehumanizálja a munkatársakat. Az érintett dolgozók úgy érzik, hogy tárgyként, nem emberként bánnak velük – és ez extrém kiégést eredményez.\n\nA kutatók az úgynevezett szervezeti dehumanizáció jelenségét vizsgálták, és megállapították, hogy annak intenzitása közvetlen összefüggést mutat a toxikus vezetői stílussal. A mérgező vezető nem feltétlenül ordibáló főnök – sokszor éppen a folyamatos kritika, a teljesítmény nyilvános megkérdőjelezése, a mikromenedzsment és az érzelmi negligencia az, ami kivonja az egyén emberségét a munkahelyi kapcsolatokból.\n\nA szerzők szerint az egyetlen hatékony ellenszer az emberközpontú vezetési megközelítés, amely visszaadja a dolgozói autonómiát. Ez nemcsak HR-kérdés – stratégiai döntés. A vezető viselkedése a csapat teljesítményében, a betegszabadságokban, a fluktuációban és az innovációs kapacitásban mérhetően megjelenik. A toxikus vezető megtartása mindig többe kerül a szervezetnek, mint a váltás – ezt ma már adatokkal is alá lehet támasztani."
  },
  {
    source: "HR Dive",
    category: "HR News",
    color: "#0369a1",
    geo: "🇺🇸 USA",
    title: "Leaders report a 'growing gap' between what's expected of them and the support they receive",
    title_hu: "Egyre nagyobb rés: elvárások és valódi támogatás között a vezetőknél",
    url: "https://www.hrdive.com/news/growing-gap-leaders-expectations-support/815483/",
    published: "2026-03-24T15:07:00.000Z",
    addedAt: NOW,
    excerpt: "Most leaders say they perform work outside of their primary roles, according to new research from the American Management Association.",
    image: "",
    summary_hu: "Az American Management Association kutatása szerint a legtöbb vezető olyan munkát is elvégez, ami alapvetően nem az ő feladata – és a helyzet romlik. A \"növekvő rés\" a teljesítményelvárások és a szervezeti támogatás között komoly kiégési kockázatot jelent.",
    full_hu: "Az American Management Association (AMA) legfrissebb kutatása szerint a vezető beosztásban dolgozók döntő többsége rendszeresen végez olyan munkát, ami alapvetően nem az ő feladata. Nem önként – hanem azért, mert a szervezet nem biztosítja azt a struktúrát, erőforrást és támogatást, amit elvár tőlük. Ez a \"növekvő rés\" az elvárások és a valóság között.\n\nA jelenség különösen középvezetői szinten éles. Ők a szendvics-generáció a hierarchiában: felülről nyomás, alulról elvárások. Az AMA adatai szerint a legtöbb középvezető pénzügyi, HR-adminisztratív és operatív feladatokat is átvállal – miközben az elsődleges feladatuk a csapat fejlesztése és az üzleti stratégia operatív megvalósítása lenne. A rés növekszik, és a kiégési kockázat ezzel arányosan emelkedik.\n\nA HR-nek itt közvetlen beavatkozási lehetősége van. A szerepklarifikáció, a delegálási felhatalmazás és a vezető saját fejlesztési igényeire reagáló coaching mind olyan eszközök, amelyek csökkenthetik a rést. Az AMA kutatása egyben figyelmeztetés is: ha a szervezet azt várja el a vezető embereitől, hogy bármit elvégezzenek, azok előbb-utóbb sem azt nem végzik jól, ami az ő dolguk, sem azt, ami csak rájuk ragadt."
  },
  {
    source: "HR Dive",
    category: "HR News",
    color: "#0369a1",
    geo: "🇺🇸 USA",
    title: "How AI is spurring demand for skilled trade workers — not displacing them",
    title_hu: "Az AI nem elbocsátja, hanem felértékeli a szakmunkásokat",
    url: "https://www.hrdive.com/news/ai-data-center-construction-hiring-workers-upskilling-layoffs/815559/",
    published: "2026-03-24T16:17:00.000Z",
    addedAt: NOW,
    excerpt: "'The digital revolution underway has a physical foundation,' Randstad CEO Sander van 't Noordende said.",
    image: "",
    summary_hu: "Az adatközpontok és az AI-infrastruktúra kiépítése váratlan munkaerő-igényt generál a fizikai szakmunkák területén. A Randstad vezérigazgatója szerint a digitális forradalom fizikai alapokra épül – és ehhez emberi kéz kell.",
    full_hu: "Az AI-forradalom egyik legváratlanabb mellékhatása: a fizikai szakmunkák iránti kereslet megugrása. Adatközpontok ezreinek megépítése, szerverek hűtési rendszerei, elektromos hálózatok bővítése – mindez nem végezhető el algoritmussal. Sander van 't Noordende, a Randstad vezérigazgatója pontosan ezt értette a mondatába: a digitális forradalomnak fizikai alapja van.\n\nA kutatás szerint az AI-infrastruktúra kiépítéséhez villanyszerelők, hűtéstechnikusok, programozható gépek kezelői és speciális építőipari szakemberek kellenek – ezek a munkakörök nem automatizálhatók. Sőt, az AI éppen ezekre a szakmákra irányít figyelmet: olyan munkakörök értékelődnek fel, amelyeket korábban alacsony presztízsűnek tartottak. Az upskilling és a készségalapú munkaerő-menedzsment ebben a kontextusban stratégiai prioritássá válik.\n\nHR-szemszögből ez a trend komoly átrendezést jelent a tehetségstratégiákban. A hagyományos fehérgalléros toborzás helyett egyre több szervezet kénytelen fizikai szakmák felé nyitni – sőt, fel kell készülni arra, hogy ezek a pozíciók versenyképesebb fizetést kívánnak, mint korábban. Az a HR-vezető, aki ma nem gondolkodik a blue-collar tehetségmenedzsmentben, holnap infrastrukturális szűk keresztmetszettel néz szembe."
  },
  {
    source: "MIT Sloan",
    category: "Leadership & Strategy",
    color: "#9f1239",
    geo: "🇺🇸 USA",
    title: "Shifting AI From Fear to Optimism: U.S. Department of Labor's Taylor Stockton",
    title_hu: "Az USA munkaügyi minisztériuma az AI-félelem optimizmussá alakításáért",
    url: "https://sloanreview.mit.edu/audio/shifting-ai-from-fear-to-optimism-u-s-department-of-labors-taylor-stockton/",
    published: "2026-03-24T11:00:52.000Z",
    addedAt: NOW,
    excerpt: "Taylor Stockton, chief innovation officer at the U.S. Department of Labor, discusses how AI is reshaping the workforce economy-wide.",
    image: "https://sloanreview.mit.edu/wp-content/uploads/2026/02/MMAI-S13-E2-Stockton-US-DOL-headshot-2400x1260-1-1200x630.jpg",
    summary_hu: "Taylor Stockton, az USA Munkaügyi Minisztériumának innovációs igazgatója arról beszél, hogyan lehet a munkavállalókban az AI-tól való félelmet optimizmussá alakítani. Álláspontja szerint az AI nem egész iparágakat, hanem feladatokat változtat meg minden munkakörön belül.",
    full_hu: "Taylor Stockton, az Egyesült Államok Munkaügyi Minisztériumának (DoL) innovációs igazgatója nem szokványos vendég a MIT Sloan Management Review podcastjában – de az üzenete annál meghatározóbb. Álláspontja szerint az AI hatása az egész gazdaságra kiterjed, és szinte minden munkakörben megváltoztatja a konkrét feladatokat – nem csupán egyes iparágakat transzformál.\n\nStockton a félelemtől az optimizmus felé vezető útban a tudatosságot és a felkészítést tartja kulcsnak. Azok a szervezetek, amelyek proaktívan kommunikálják, hogy milyen feladatokat vesz át az AI és milyen új képességekre lesz szükség, lényegesen kisebb munkavállalói szorongást tapasztalnak. A DoL maga is ennek jegyében fejleszt átképzési programokat, amelyek az AI-kiegészítette munkavégzésre készítik fel az érintetteket.\n\nA HR-szakemberek számára Stockton üzenete egyszerűen fordítható le: az AI-átmenet kommunikációja és az átképzési stratégia nem választható feladat. Az a szervezet, amely időben és őszintén tájékoztatja munkatársait az AI szerepéről és konkrét fejlődési utakat kínál, megtartja a bizalmat – és megőrzi a tehetséget is. A félelem nem tűnik el magától; a bizalom viszont aktívan felépíthető."
  },
  {
    source: "HR Reporter",
    category: "HR News",
    color: "#d9000d",
    geo: "🇨🇦 Kanada",
    title: "The 'amenities ladder': why it leads to lower-value jobs for women",
    title_hu: "Az 'amenity-létra': hogyan tolja a nőket alacsonyabb értékű munkákba?",
    url: "https://www.hrreporter.com/focus-areas/diversity/the-amenities-ladder-why-it-leads-to-lower-value-jobs-for-women/394211",
    published: "2026-03-23T22:34:11.000Z",
    addedAt: NOW,
    excerpt: "'When women go to lower visibility roles because they're more flexible, they can find themselves off the radar when promotion cycles happen'",
    image: "https://cdn-res.keymedia.com/cms/images/chrr/stac_639099652626425253.jpg",
    summary_hu: "Kanadai kutatás szerint a nők rendszeresen rugalmasabb, de kevésbé látható munkaköröket választanak – ami könnyen kivonja őket az előléptetési folyamatokból. Az úgynevezett amenity-létra jelenség strukturális egyenlőtlenséget termel, nem egyéni döntést.",
    full_hu: "Kanadai kutatók azonosítottak egy jelenséget, amelynek neve van ugyan, de a hatása annál inkább láthatatlan: az amenity-létra. Arról van szó, hogy a nők – különösen az anyák – rendszeresen olyan munkakörök felé gravitálnak, amelyek nagyobb rugalmasságot, több kontroll-érzetet és kevesebb láthatósági kényszert kínálnak. Ezek az előnyök vonzóak, de ára van: ezek a pozíciók rendszerint alacsonyabb bérűek és kisebb előléptetési potenciálúak.\n\nA kutatás egyik legélesebb megállapítása: amikor a nők rugalmasabb, de kevésbé látható szerepekbe kerülnek, könnyen kiesnek az előléptetési radarról. 'Ha ott sem vagy, ahol a döntések születnek, akkor nem te leszel az, akire gondolnak, amikor nyílik egy pozíció' – fogalmaz az egyik megkérdezett szervezetszociológus. Ez strukturális mechanizmus, nem egyéni döntési hiba.\n\nA HR-vezető számára ez az adathalmaz konkrét cselekvési lehetőséget jelent. Az előléptetési folyamatok felülvizsgálata, a rugalmas munkavégzés és a karrierfejlődés szétcsatolása, valamint a láthatóság tudatos megteremtése – mindezek olyan eszközök, amelyekkel az amenity-létra csapda elkerülhető. A DEI stratégia akkor működik, ha nemcsak a belépési feltételeket nézi, hanem a karrierút dinamikáját is."
  },
  {
    source: "HR Reporter",
    category: "HR News",
    color: "#d9000d",
    geo: "🇨🇦 Kanada",
    title: "Happiness is way down in Canada – especially among youth – so how can HR help?",
    title_hu: "Rekord alacsonyan a boldogság Kanadában – főleg a fiataloknál",
    url: "https://www.hrreporter.com/focus-areas/culture-and-engagement/happiness-is-way-down-in-canada-especially-among-youth-so-how-can-hr-help/394210",
    published: "2026-03-23T21:56:59.000Z",
    addedAt: NOW,
    excerpt: "'Along with all that bad news, there's the good news...we know a lot about how to make lives better': researcher explains how employers can help turn the tides",
    image: "https://cdn-res.keymedia.com/cms/images/chrr/stac_639099000059384547.png",
    summary_hu: "Kanada a boldogság-ranglistákon egyre lejjebb csúszik, és a fiatal generációk érintettsége különösen aggasztó. A kutatók szerint a munkáltatóknak konkrét lépéseket kellene tenniük, mert a munkahelyi jóllét éppúgy alakítja az általános boldogságot, mint az életkörülmények.",
    full_hu: "A World Happiness Report 2026-os kiadása Kanadát egyre lejjebb sorolja a boldogság-ranglistán – és a legaggasztóbb adat nem az országos átlag, hanem a 18-30 éves korosztály adatai. A fiatal felnőttek boldogságindexe drámaian csökkent az elmúlt öt évben, és Kanada ebben az összevetésben kifejezetten rosszul teljesít a fejlett gazdaságok között.\n\nA kutatók hangsúlyozzák: a boldogság nem csupán szubjektív érzés, hanem mérhető összefüggésben áll a munkahelyi jelenléttel, produktivitással és hosszú távú elköteleződéssel. 'Tudjuk, hogyan lehet az életeket jobbá tenni' – mondja az egyik vezető kutató. 'Ez nem lehetetlen feladat – de szándékos döntéseket kíván, nemcsak az egyéntől, hanem a munkáltatóktól is.'\n\nHR-szemszögből a tanulság egyértelmű: a munkavállalói jóllét nem egy HR-trendig tartó programelem, hanem üzleti kérdés. A fiatal generációk esetében különösen igaz, hogy a munkahelyi tapasztalat – az értelmesség, az autonómia, a fejlődési lehetőség, az emberi kapcsolatok minősége – közvetlen hatással van az általános boldogságszintjükre. Ahol ezek hiányoznak, ott nem csupán az elköteleződés, hanem a mentális egészség is sérül."
  },
  {
    source: "HR Reporter",
    category: "HR News",
    color: "#d9000d",
    geo: "🇨🇦 Kanada",
    title: "Advertised wages still trail post‑pandemic inflation in Canada",
    title_hu: "Kanadában a meghirdetett bérek még mindig lemaradnak az inflációtól",
    url: "https://www.hrreporter.com/focus-areas/payroll/advertised-wages-still-trail-postpandemic-inflation-in-canada/394212",
    published: "2026-03-24T14:31:22.000Z",
    addedAt: NOW,
    excerpt: "Canada trails US, UK in recovery, finds study",
    image: "https://cdn-res.keymedia.com/cms/images/chrr/jimw_639099593775470172.png",
    summary_hu: "Egy friss tanulmány szerint Kanada az USA-hoz és az Egyesült Királysághoz képest is lassabban hever fel a pandémia utáni inflációból a bérek oldalán. A meghirdetett fizetések és a valós vásárlóerő közötti rés egyre nehezíti a tehetségek megszólítását.",
    full_hu: "Egy friss kutatás rámutat: Kanada a pandémia utáni bér-inflációs versenyben lemarad az Egyesült Királyságtól és az Egyesült Államoktól. A meghirdetett pozíciókban szereplő fizetési sávok még mindig nem tartottak lépést a 2020 óta felhalmozódott inflációval – vagyis reálértéken a munkavállalók kevesebbet kapnak, mint amennyit néhány évvel ezelőtt ugyanazért a munkáért kaptak volna.\n\nA tanulmány szerzői szerint a jelenség részben a munkaadói visszafogottság eredménye: az infláció tetőzésekor sok szervezet kivárta, hogy a piaci bérnyomás mérséklődjön, ahelyett hogy automatikusan emelte volna a kínált fizetéseket. Ez rövid távon kifizetődőnek tűnt, de középtávon a legjobb jelöltek más piacokra – főleg az USA-ba – migráltak, ahol a bérek valóban követték az inflációt.\n\nA HR-specialisták számára ez az adat konkrét figyelmeztetés: a bérversenyképesség nem egyszeri kompenzációs döntés, hanem folyamatos piaci monitoring kérdése. Ha a kanadai szervezetek nem zárkóznak fel, a tehetségvándorlás nem lassul – hanem folytatódik. A megoldás nem feltétlenül azonnali béremelés, de legalább az átlátható és rendszeres kompenzációs felülvizsgálat, amit az EU bérátláthatósági irányelve egyébként kötelezővé is tenne."
  },

  // ===== EU (7 új – Y2Y már bent van) =====
  {
    source: "HRZone",
    category: "HR Strategy",
    color: "#6b21a8",
    geo: "🇬🇧 UK",
    title: "Pay transparency WILL come to the UK: Are you ready?",
    title_hu: "Bérátláthatóság az Egyesült Királyságban: felkészült a HR?",
    url: "https://hrzone.com/pay-transparency-will-come-to-the-uk-are-you-ready/",
    published: "2026-03-25T08:00:00.000Z",
    addedAt: NOW,
    excerpt: "While the EU Pay Transparency Directive doesn't apply to the UK, its effects already do. The question is: Will we shape our own framework, or adopt the one being written next door?",
    image: "https://hrzone.com/app/uploads/2026/03/a2g3lm0cgfg-e1773937961810.jpg",
    summary_hu: "Bár az EU bérátláthatósági irányelv formálisan nem vonatkozik az Egyesült Királyságra, hatásai már érezhetők a brit munkaerőpiacon. Gethin Nadin érvelése szerint nem az a kérdés, hogy jön-e a változás – hanem hogy a brit HR-szakterület maga alakítja-e, vagy kívülről veszi majd át.",
    full_hu: "Az EU bérátláthatósági irányelv formálisan nem vonatkozik az Egyesült Királyságra a Brexit óta – de Gethin Nadin HRZone-ban megjelent elemzése szerint az irányelv hatása már most is átgyűrűzik a brit munkaerőpiacra. Több multinacionális cég, amelynek van brit és EU-s leányvállalata is, nem vezet párhuzamos bérpolitikát – az EU-s transzparenciakövetelmények de facto a brit szervezeti egységekre is hatnak.\n\nA cikk fő érve: ne várjuk meg, amíg a szabályozás kényszerít. A bérátláthatóság önként vállalt stratégiaként versenyelőny – vonzóbb munkáltatói márka, kisebb nemek közötti bérszakadék, kevesebb bérrel kapcsolatos bizalomvesztés. Azok a brit szervezetek, amelyek ma szabályozzák a saját bértranszparencia-politikájukat, holnap nem sodródnak, hanem alakítják az iparági standardot.\n\nA HR-vezető számára a kérdés nagyon is praktikus: van-e belső bér-ekvitási auditunk? Tudnak-e a menedzserek magyarázatot adni a fizetési különbségekre? Ha ezekre a kérdésekre nincs válasz, az nem jogi kockázat – hanem bizalmi kockázat. A transzparencia nem a titkok feladása, hanem az igazságosság demonstrálása. Erre most még van lehetőség felkészülni."
  },
  {
    source: "Personnel Today",
    category: "HR News",
    color: "#1e40af",
    geo: "🇬🇧 UK",
    title: "Economic insecurity fuelling rise in 'job huggers'",
    title_hu: "Gazdasági bizonytalanság szüli a 'munkahalmozókat'",
    url: "https://www.personneltoday.com/hr/economic-insecurity-fuelling-rise-in-job-huggers/",
    published: "2026-03-24T03:01:32.000Z",
    addedAt: NOW,
    excerpt: "Employees are staying put in jobs despite feeling disengaged, according to research from LinkedIn.",
    image: "https://www.personneltoday.com/wp-content/uploads/sites/8/2026/03/job-huggers_shutterstock_2146530933.jpeg",
    summary_hu: "A LinkedIn friss adatai szerint egyre több munkavállaló marad elkötelezettség nélkül az állásában – egyszerűen azért, mert túl kockázatosnak tartja az állásváltást. A jelenséget job huggingnak nevezik, és a gazdasági bizonytalanság egyenes következménye.",
    full_hu: "A LinkedIn globális adatai szerint egyre több munkavállaló ragaszkodik az állásához akkor is, ha elégedetlen, ha kiégett, ha máshol jobban járna. A jelenséget job huggingnak – munkahalmozásnak vagy, szó szerint, \"munkát ölelő\" viselkedésnek – nevezik, és a gazdasági bizonytalanság egyenes következménye.\n\nA kutatás rámutat: amikor az emberek bizonytalannak érzik a munkaerőpiacot, az állásváltás kockázata felülírja az elégedetlenséget. A \"legalább van állásom\" logika bekapcsol, és a szervezet egy látszólag stabil, valójában érzelmileg kivonult munkaerőt kap. Ez a látens fluktuáció nem statisztikákon látszik, de a teljesítményen, a csapatdinamikán és az innovációs kapacitáson igen.\n\nHR-szemszögből a job hugging diagnózisa és kezelése nem a megtartási statisztikák javítgatása – hanem a belső munkaerőpiac tudatos aktiválása. Azok a szervezetek, amelyek belső mobilitási lehetőségeket kínálnak, erőteljes fejlődési utat mutatnak és pszichológiai biztonságot teremtenek, nem szorulnak arra, hogy az embereket a külső bizonytalanság tartsa ott. Ezt kell építeni – nem a gazdasági félelmet kihasználni."
  },
  {
    source: "Personnel Today",
    category: "HR News",
    color: "#1e40af",
    geo: "🇬🇧 UK",
    title: "Brewdog accused of using 'fire and rehire' to reopen bars",
    title_hu: "Brewdog: kirúgás és visszavétel – az ismert brit taktika újra fókuszban",
    url: "https://www.personneltoday.com/hr/brewdog-fire-and-rehire/",
    published: "2026-03-23T09:41:07.000Z",
    addedAt: NOW,
    excerpt: "The Unite union has accused Brewdog of using 'fire and rehire' practices after it asked staff in Scotland to reapply for their jobs.",
    image: "https://www.personneltoday.com/wp-content/uploads/sites/8/2026/03/brewdog_fire_rehire_shutterstock_2596377197.jpg",
    summary_hu: "A Unite szakszervezet azzal vádolja a Brewdogot, hogy fire and rehire módszert alkalmaz skóciai bárjai újranyitásakor: a dolgozókat elbocsátják, majd rosszabb feltételekkel kérik őket vissza. A gyakorlat az Egyesült Királyságban egyre élesebb szabályozói figyelmet kap.",
    full_hu: "A skót söripari vállalat, a Brewdog az elmúlt évtizedben számtalanszor került a figyelem középpontjába munkáltatói magatartása miatt – és a legújabb fejlemény sem tesz jót az imázsának. A Unite szakszervezet bejelentette: a Brewdog skóciai bárjainak újranyitásakor a dolgozókat elbocsátotta, majd rosszabb feltételekkel kérte vissza őket. Ez az úgynevezett fire and rehire módszer, amely az Egyesült Királyságban egyre erősebb szabályozói és szakszervezeti ellenállásba ütközik.\n\nA módszer lényege: ha egy munkáltató a meglévő szerződéses feltételeket nem tudja egyoldalúan megváltoztatni, elbocsátja a munkavállalókat, majd új – jellemzően kedvezőtlenebb – feltételekkel veszi vissza őket. Jogilag ez sok esetben megtehető, de etikailag vitatott, és az Employment Rights Act 2025 reformjai éppen ezt a kiskaput igyekeznek bezárni.\n\nHR-szemszögből a Brewdog-ügy intő jel: a rövid távú költségcsökkentés, amelyet a fire and rehire lehetővé tesz, hosszú távon a munkáltatói márkát tönkreteszi. A legjobb jelöltek – különösen a fiatalabb generációk – aktívan kerülik azokat a szervezeteket, amelyek ilyen módszerekre támaszkodnak. A szervezeti kultúra és a bánásmód híre gyorsan terjed – és nem csak az álláskeresők, hanem a fogyasztók körében is."
  },
  {
    source: "Personnel Today",
    category: "HR News",
    color: "#1e40af",
    geo: "🇬🇧 UK",
    title: "Iran conflict: TUC calls for emergency taskforce to save jobs",
    title_hu: "TUC sürgős intézkedést kér a brit munkahelyek védelmére az iráni konfliktus miatt",
    url: "https://www.personneltoday.com/hr/iran-conflict-tuc-calls-for-emergency-taskforce-to-save-jobs/",
    published: "2026-03-23T09:52:22.000Z",
    addedAt: NOW,
    excerpt: "TUC calls for an emergency taskforce to help protect the UK from the economic fallout of US-Israeli war with Iran.",
    image: "https://www.personneltoday.com/wp-content/uploads/sites/8/2026/03/iran-conflict-TUC-emergency-taskforce-shutterstock_2262730745.jpg",
    summary_hu: "Az Egyesült Királyság legnagyobb szakszervezeti szövetsége, a TUC azonnali vészhelyzeti munkacsoport felállítását sürgeti, hogy megvédjék a brit munkahelyeket az USA–Izrael–Irán konfliktus gazdasági következményeitől.",
    full_hu: "Az USA és Izrael Irán elleni katonai műveleteinek gazdasági következményei már érezhetők az Egyesült Királyságban: az energiaárak emelkedése, az ellátási lánc zavarai és a tőkepiaci volatilitás együttesen komoly nyomást gyakorolnak a brit gazdaságra. A TUC – az Egyesült Királyság legnagyobb szakszervezeti szövetsége – azonnali vészhelyzeti munkacsoport felállítását követeli a munkahelyek védelme érdekében.\n\nA szövetség konkrét intézkedéseket vár a kormánytól: célzott iparági segélycsomagokat az energiaintenzív szektorokban, átmeneti foglalkoztatás-megőrzési programokat és gyorsított átképzési lehetőségeket az érintett munkavállalók számára. A TUC hivatkozik a COVID-19 pandémia idején alkalmazott furlough-rendszer tapasztalataira, amelyek megmutatták, hogy gyors állami beavatkozással megelőzhető a tömeges leállás.\n\nHR-szemszögből ez az esemény emlékeztető arra, hogy a geopolitikai kockázat nem elvont stratégiai fogalom – hanem nagyon is kézzelfogható HR-kérdés. Melyek azok az üzletágak, amelyeket egy energiaár-sokk azonnal érint? Van-e kríziskommunikációs terve a szervezetnek? Hogyan kezeli a bizonytalanságot a csapatban? Ezekre a kérdésekre most kell felkészülni – nem akkor, amikor a leállások már elkezdődtek."
  },
  {
    source: "Personalwirtschaft",
    category: "HR News",
    color: "#1d4ed8",
    geo: "🇩🇪 Németország",
    title: "82 Prozent der Führungskräfte sicher: Entscheidungen fällt künftig KI",
    title_hu: "82% biztos benne: a jövőben az MI hozza majd a döntéseket",
    url: "https://www.personalwirtschaft.de/themen/kuenstliche-intelligenz/82-prozent-fuehrungskraefte-ueberzeugt-entscheidungen-faellt-kuenftig-ki-202044/",
    published: "2026-03-23T14:13:36.000Z",
    addedAt: NOW,
    excerpt: "Führungskräfte sind laut Studie überzeugt: Entscheidungen werden künftig von KI-Systemen getroffen. Welche Aufgaben bleiben auf C-Level-Ebene da noch übrig?",
    image: "https://www.personalwirtschaft.de/wp-content/uploads/2026/03/Design-ohne-Titel-2026-03-23T144623.183.jpg",
    summary_hu: "Egy friss nemzetközi kutatás megdöbbentő adatot tárt fel: a felsővezetők 82 százaléka meg van győződve arról, hogy a döntéshozatalt hamarosan MI-rendszerek végzik. A kérdés immár nem az, hogy elkerülhető-e ez – hanem hogy a C-szintű pozíciókban marad-e valódi döntési tér az emberek számára.",
    full_hu: "Egy friss nemzetközi kutatás megdöbbentő adatot tárt fel: a felsővezetők 82 százaléka meg van győződve arról, hogy a jövőben a döntéshozatalt mesterséges intelligencia rendszerek végzik majd. Ez nem a distant future víziója – sok válaszadó 5-10 éves horizontban gondolkodik. A kérdés immár nem az, hogy elkerülhető-e ez, hanem hogy a C-szintű pozíciókban marad-e egyáltalán valódi döntési tér az emberek számára.\n\nA Personalwirtschaft elemzése rámutat arra, hogy ez az elvárás nemcsak technológiai optimizmus – hanem az üzleti hatékonyság iránti nyomás eredménye is. Az MI-rendszerek gyorsabban, olcsóbban és egyes esetekben megbízhatóbban dolgoznak fel hatalmas adatmennyiségeket, mint az emberi agy. Egy befektetési döntésnél, egy kockázatelemzésnél vagy egy toborzási szűrésnél az algoritmus sok esetben felülmúlja az intuitív emberi ítéletet.\n\nHR-szemszögből ez a trend fundamentálisan átírja a vezető-fejlesztési stratégiát. Ha az MI átveszi a rutindöntéseket, az emberi vezető hozzáadott értéke az etikai ítélet, az érzelmi intelligencia, a kontextuális érzékenység és a kulturális kapcsolat lesz. Ezeket a kompetenciákat ma nem igazán mérik a legtöbb értékelési rendszerben – és ha nem kezdjük el fejleszteni és mérni, a vezető nem az MI partnere lesz, hanem feleslegessé válik."
  },
  {
    source: "Personalwirtschaft",
    category: "HR News",
    color: "#1d4ed8",
    geo: "🇩🇪 Németország",
    title: "Krisenkommunikation bei VW: Was HR-Teams lernen können",
    title_hu: "VW válságkommunikáció: mit tanulhat belőle a HR?",
    url: "https://www.personalwirtschaft.de/news/hr-organisation/krisenkommunikation-bei-vw-was-hr-teams-lernen-koennen-202062/",
    published: "2026-03-24T08:50:46.000Z",
    addedAt: NOW,
    excerpt: "Mit bereits dem dritten großen Stellenabbau in 20 Jahren ist VW längst Profi in der Krisenkommunikation. Das können andere HR-Teams lernen.",
    image: "https://www.personalwirtschaft.de/wp-content/uploads/2026/03/Design-ohne-Titel-3.jpg",
    summary_hu: "A Volkswagen már a harmadik nagy leépítési hullámán megy keresztül 20 év alatt – és profi lett a válságkommunikációban. A Personalwirtschaft elemzése szerint a VW HR-megközelítése konkrét mintát adhat más szervezeteknek arra, hogyan kell emberséges és transzparens módon kezelni a nehéz döntéseket.",
    full_hu: "A Volkswagen huszonkét év alatt már harmadik alkalommal megy keresztül nagyszabású leépítésen – és mára a vállalat tapasztalt profi lett abban, amit sokan a legkínosabb HR-feladatnak tartanak: az elbocsátási hullám kommunikációjában. A Personalwirtschaft elemzése összegyűjti, mi az, amit a VW jól csinál, és amit más szervezetek azonnal átvehetnek.\n\nA VW megközelítésének három pillére van: korai, transzparens kommunikáció a szakszervezetekkel és az üzemi tanácsokkal; egyértelmű határidők és folyamatok, amelyek csökkentik a bizonytalanságot; és a 'tisztességes búcsú' elve, amelynek jegyében az érintett dolgozókat nem statisztikának, hanem embereknek kezelik. Ez nem csupán etikai kérdés – a VW tapasztalatai szerint a munkáltatói márka épségben maradása a kiszervezési döntések hosszú távú üzleti hatásait is meghatározza.\n\nA legfontosabb tanulság más szervezetek számára: a leépítési kommunikáció nem akkor kezdődik, amikor az újságcímek megjelennek. A belső tájékoztatás, a vezetők felkészítése és a munkavállalói kérdések megválaszolására kiépített csatornák mind korábban kell, hogy életbe lépjenek. A VW azért kommunikál jól válságban, mert válság nélkül is bizalmat épít – és ez a kultúra teszi lehetővé a kríziskezelést."
  },
  {
    source: "HR Grapevine",
    category: "HR News",
    color: "#7c3aed",
    geo: "🇬🇧 UK",
    title: "Artificial Intelligence | Can AI really coach like a human? This live experiment put it to the test",
    title_hu: "Tud-e az MI úgy coachingolni, mint egy ember? Élő kísérlet adja meg a választ",
    url: "https://www.hrgrapevine.com/content/article/2026-03-23-can-ai-really-coach-like-a-human-this-live-experiment-put-it-to-the-test",
    published: "2026-03-23T10:30:00.000Z",
    addedAt: NOW,
    excerpt: "A unique experiment recently took place: to see if an AI coach could be better than a real-life human one.",
    image: "https://www.executivegrapevine.com/uploads/articles/column-ai-human-experiment-thumb.jpg",
    summary_hu: "A HR Grapevine egy egyedi kísérletet mutat be: vajon képes-e az MI egy valódi emberi coach teljesítményét megközelíteni? Az élőben lefolytatott összehasonlítás meglepő eredménnyel zárult, és komoly kérdéseket vet fel a coaching jövőjéről.",
    full_hu: "A coaching szakmában régóta él egy kérdés: képes lesz-e valaha az MI arra, amire egy tapasztalt emberi coach? A HR Grapevine szerkesztői nem elméleti vitába mentek bele – hanem megnéztek egy élőben lefolytatott kísérletet, ahol MI-coachot és emberi coachot mértek egymáshoz valós ügyfelek visszajelzései alapján.\n\nAz eredmény árnyalt – és éppen ezért tanulságos. Az MI-coach bizonyos dimenzióban meglepően jól teljesített: strukturált, következetes visszakérdezés, az ügyfél saját szavainak visszatükrözése, kényelmes tempó. Ahol viszont az emberi coach egyértelműen fölényes maradt: a mély empátia, a spontán humor, az érzelmek tényleges befogadása és a nem verbális kommunikáció olvasása. Röviden: az MI coachol, de nem kapcsolódik.\n\nA HR-szakember számára ez a különbségtétel nagyon fontos. Az MI-coach eszközként értékes lehet a skálázható önfejlesztésben – különösen ott, ahol emberi coach nem elérhető, vagy ahol alacsony tétű fejlesztési célokhoz elegendő a strukturált visszajelzés. De az igazi transzformációs coaching – az, ami szervezeti és személyes változást eredményez – egyelőre emberi jelenlét nélkül nem működik. A kettő nem versenyez: kiegészítik egymást."
  },

  // ===== ÁZSIA (2 új) =====
  {
    source: "HCA Mag Asia",
    category: "HR News",
    color: "#065f46",
    geo: "🌏 Ázsia",
    title: "How to improve frontline engagement",
    title_hu: "Hogyan növelhető az első vonalbeli munkavállalók elkötelezettsége?",
    url: "https://www.hcamag.com/asia/news/general/how-to-improve-frontline-engagement/569564",
    published: "2026-03-23T23:44:22.000Z",
    addedAt: NOW,
    excerpt: "Frontline neglect leads to costly turnover at work",
    image: "https://cdn-res.keymedia.com/cms/images/us/035/0365_639099133918269576.png",
    summary_hu: "Az első vonalbeli dolgozók elkötelezettsége kritikusan alacsony, és a magas fluktuáció komoly költségeket generál. A HCA Mag Asia összegyűjti a leghatékonyabb eszközöket, amelyekkel a munkáltatók visszafordíthatják a tendenciát és megtarthatják a frontvonal tehetségeit.",
    full_hu: "Az első vonalbeli munkavállalók – gyári dolgozók, bolti személyzet, logisztikai munkatársak, egészségügyi frontvonal – a szervezet legkisebb láthatóságú, mégis legkritikusabb rétegét alkotják. Elkötelezettségük messze elmarad az irodai munkatársakétól, és az ebből eredő fluktuáció hatalmas költséggel jár. A HCA Mag Asia elemzése a leghatékonyabb eszközöket veszi sorra.\n\nA kutatás szerint az első vonalbeli elköteleződés három fő pillér mentén fejleszthető: közvetlen visszajelzési csatornák kiépítése (a frontline dolgozó ritkán találkozik HR-rel vagy felsővezetővel), a munkakörülmények valódi jobbítása (nem csak talk, hanem walk), és az elismerés demokratizálása (kis és azonnali elismerések, nem csak éves díjak). Ahol ezek a feltételek teljesülnek, a fluktuáció szignifikánsan csökken.\n\nHR-szemszögből a frontline engagement ma technológiai kérdés is. Mobilalapú kommunikációs platformok, pulse survey eszközök és a gamification elemei mind segíthetnek elérni azokat a munkatársakat, akiknek nincs céges emailjük vagy laptopjuk. Az elköteleződés mérése és fejlesztése ebben a rétegben más eszközöket kíván, mint az irodai populációnál – és ha a HR ezt nem ismeri fel, a legnépesebb munkavállalói csoport marad a legelhanyagoltabb."
  },
  {
    source: "HCA Mag Asia",
    category: "HR News",
    color: "#065f46",
    geo: "🌏 Ázsia",
    title: "AI 'workslop' puts leadership trust at risk, report finds",
    title_hu: "AI-szemét a munkahelyen: hogyan veszélyezteti a bizalmat?",
    url: "https://www.hcamag.com/asia/news/general/ai-workslop-puts-leadership-trust-at-risk-report-finds/569563",
    published: "2026-03-23T20:49:44.000Z",
    addedAt: NOW,
    excerpt: "How can employers reduce AI workslop?",
    image: "https://cdn-res.keymedia.com/cms/images/us/035/0365_639099101816660658.png",
    summary_hu: "Az 'AI workslop' – vagyis a gondolkodás nélkül generált, alacsony minőségű MI-tartalom terjedése – komoly kockázatot jelent a szervezeti bizalomra. Az átgondolatlan AI-használat aláássa a vezető-munkatárs kapcsolatot és a csapatok hitelességét.",
    full_hu: "Az 'AI workslop' – vagyis a gondolkodás nélkül generált, alacsony minőségű, de jól formázott MI-tartalom – egyre több szervezetben vált a menedzseri bizalom aláásójává. A jelenség neve a 'work' és a 'slop' (gány) szavak kombinációja: azt a tartalmat jelöli, amelyet látszólag erőfeszítéssel, valójában egy kattintással állítottak elő, és amelynek mélysége messze elmarad attól, amit a cím, a formátum vagy a pozíció elvár.\n\nA HCA Mag Asia által idézett kutatás szerint a vezető és a csapat közötti bizalom egyik leggyorsabban terjedő kockázata ma pontosan az AI workslop. Amikor egy vezető MI-vel generált stratégiai anyagban gondolkodik, de az emberek felismerik a generált tartalmat – vagy rosszabb esetben ráéreznek a tartalmi ürességre –, az elveszett hitelességet nehéz visszaszerezni.\n\nA HR-nek itt nemcsak irányelveket kell alkotnia, hanem kultúrát kell alakítania. Az MI-eszközök egészséges és értelmes használatának meghatározása – mikor segít az MI, mikor von el az elmélyült gondolkodástól – szervezeti kompetencia, nem egyéni döntés. Az MI-írástudás ma épp annyira HR-kérdés, mint amilyen technológiai kérdés. A legjobb szervezetek egyértelműen definiálják: az MI eszköz, nem gondolkodó helyettes."
  }
];

// ===== FELDOLGOZÁS =====
const currentData = JSON.parse(fs.readFileSync(NEWS_JSON, 'utf8'));
let articles = [...currentData.articles];

// Dedup az új cikkek URL-je alapján
const existingUrls = new Set(articles.map(a => a.url));
const toAdd = newArticles.filter(a => !existingUrls.has(a.url));
console.log(`Hozzáadandó cikkek: ${toAdd.length}`);

// Hozzáadás az elejére
articles = [...toAdd, ...articles];

// Dedup teljes lista
const seen = new Set();
articles = articles.filter(a => seen.has(a.url) ? false : (seen.add(a.url), true));

// 30 napnál régebbi cikkek eltávolítása
const cutoff = new Date(NOW);
cutoff.setDate(cutoff.getDate() - 30);
articles = articles.filter(a => new Date(a.addedAt || a.published) >= cutoff);

// Geo csoportosítás és limit alkalmazása
const USA_GEOS = ['🇺🇸 USA', '🇨🇦 Kanada'];
const EU_GEOS = ['🇬🇧 UK', '🇩🇪 Németország', '🇦🇹 Ausztria', '🇫🇷 Franciaország', '🇳🇱 Hollandia', '🇪🇺 Európa', '🇭🇺 Magyar'];
const GLOBAL_GEOS = ['🌍 Globális', '🌍 Global'];
const ASIA_GEOS = ['🌏 Ázsia'];

function getGroup(geo) {
  if (USA_GEOS.includes(geo)) return 'USA';
  if (EU_GEOS.includes(geo)) return 'EU';
  if (GLOBAL_GEOS.includes(geo)) return 'Global';
  if (ASIA_GEOS.includes(geo)) return 'Asia';
  return 'Other';
}

// Y2Y mindig marad
const y2yArticles = articles.filter(a => a.source === 'Y2Y');
const nonY2Y = articles.filter(a => a.source !== 'Y2Y');

// Csoportonként max 8, legújabb marad
const groups = { USA: [], EU: [], Global: [], Asia: [], Other: [] };
nonY2Y.forEach(a => {
  const g = getGroup(a.geo);
  groups[g].push(a);
});

// Rendezés addedAt desc, top 8 megtartása
Object.keys(groups).forEach(g => {
  groups[g].sort((a, b) => new Date(b.addedAt || b.published) - new Date(a.addedAt || a.published));
  if (g !== 'Other') groups[g] = groups[g].slice(0, 8);
});

// Y2Y visszaadása EU csoportba (ha EU < 8)
const euCount = groups.EU.length;
if (euCount < 8 && y2yArticles.length > 0) {
  groups.EU.push(...y2yArticles.slice(0, 8 - euCount));
} else if (y2yArticles.length > 0) {
  // Y2Y befér, ha van hely, különben a legrégebbit cseréljük
  groups.EU.sort((a, b) => new Date(b.addedAt || b.published) - new Date(a.addedAt || a.published));
  // Y2Y-t adjuk az EU-hoz és megtartjuk top 8
  groups.EU = [...y2yArticles, ...groups.EU].slice(0, 8);
}

// Összegyűjtés, rendezés addedAt desc
let finalArticles = [
  ...groups.EU,
  ...groups.USA,
  ...groups.Global,
  ...groups.Asia,
  ...groups.Other
];

finalArticles.sort((a, b) => new Date(b.addedAt || b.published) - new Date(a.addedAt || a.published));

// Mentés
const output = {
  lastUpdated: NOW,
  articles: finalArticles
};
fs.writeFileSync(NEWS_JSON, JSON.stringify(output, null, 2), 'utf8');

console.log(`✅ news.json frissítve. Összesen: ${finalArticles.length} cikk.`);
const geoCount = {};
finalArticles.forEach(a => { geoCount[a.geo] = (geoCount[a.geo] || 0) + 1; });
console.log('Geo elosztás:', JSON.stringify(geoCount, null, 2));
