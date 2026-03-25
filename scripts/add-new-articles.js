const fs = require('fs');
const newsPath = 'C:/Users/dorka/OneDrive/Desktop/HRNEWS/public/data/news.json';
const now = new Date().toISOString();
const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

const newArticles = [
  {
    id: '1742387154000_2001',
    source: 'Harvard Business Review',
    category: 'Leadership',
    color: '#991b1b',
    geo: '🌍 Globális',
    title: 'Our Favorite Management Tips on Leading with AI',
    title_hu: 'A legjobb tippek az AI-vezette menedzsmenthez',
    url: 'https://hbr.org/2026/03/our-favorite-management-tips-on-leading-with-ai',
    published: '2026-03-19T12:25:54.000Z',
    addedAt: now,
    excerpt: 'A curated list from one of HBR\'s most popular newsletters.',
    image: 'https://hbr.org/resources/images/article_assets/2026/03/Mar26_19_1506928128.jpg',
    summary_hu: 'A Harvard Business Review összegyűjtötte legnépszerűbb hírlevelének legjobb tanácsait az AI-vezette menedzsment témájában. Kulcsüzenet: a mesterséges intelligencia nem csupán eszköz, hanem alapvetően megváltoztatja a vezető és csapat közötti együttműködés dinamikáját. A hatékony AI-vezető az AI erősségeit tudatosan párosítja az emberi ítélőképességgel.'
  },
  {
    id: '1742419680000_2002',
    source: 'HR Dive',
    category: 'HR News',
    color: '#0369a1',
    geo: '🇺🇸 USA',
    title: 'New Minnesota bill would require 90-day notice for AI that could displace workers',
    title_hu: 'Minnesota: 90 napos előzetes értesítés AI általi leváltás esetén',
    url: 'https://www.hrdive.com/news/ai-layoffs-notice-law-minnesota/815262/',
    published: '2026-03-19T21:28:00.000Z',
    addedAt: now,
    excerpt: '"Conversations with experts and industry leads indicate this displacement is only a matter of time," Minnesota Rep. David Gottfried, the bill\'s sponsor, told HR Dive.',
    image: '',
    summary_hu: 'Minnesota állam törvényhozásában új javaslat született: a munkaadóknak 90 nappal előre kellene értesíteniük a dolgozókat, ha mesterséges intelligencia fenyegeti a munkakörüket. A javaslat szponzora szerint az AI általi kiszorítás csupán idő kérdése, és a munkavállalóknak kellő felkészülési időre van szükségük. A kezdeményezés az USA-ban egyre erőteljesebb AI-foglalkoztatási szabályozási hullám részét képezi.'
  },
  {
    id: '1742419680000_2003',
    source: 'HR Dive',
    category: 'HR News',
    color: '#0369a1',
    geo: '🇺🇸 USA',
    title: 'This week in 5 numbers: AI trainer jobs are surging',
    title_hu: '5 szám a HR-ből: robbanásszerűen nőnek az AI-tréner állások',
    url: 'https://www.hrdive.com/news/ai-trainer-jobs-surging/815211/',
    published: '2026-03-19T21:28:00.000Z',
    addedAt: now,
    excerpt: 'Here\'s a roundup of numbers from the last week of HR news — including how much March Madness-related distractions can cost companies.',
    image: '',
    summary_hu: 'Az elmúlt hét legfontosabb HR-számai között kiemelkedik, hogy az AI-tréneri pozíciók száma meredeken nő – egyre több cég keres szakembert az AI-rendszerek „tanítására". A lista tartalmaz adatot a March Madness-kiesések munkáltatói költségéről is, jelezve, hogy a sporteseményekhez kötött munkavállalói elvonások valós üzleti hatással járnak.'
  },
  {
    id: '1742398680000_2004',
    source: 'HR Dive',
    category: 'HR News',
    color: '#0369a1',
    geo: '🇺🇸 USA',
    title: 'NAMI: 1 in 4 workers considered quitting over their job\'s toll on their mental health',
    title_hu: 'Minden negyedik dolgozó fontolóra vette a felmondást a mentális egészsége miatt',
    url: 'https://www.hrdive.com/news/workers-quitting-jobs-toll-on-mental-health-nami/815109/',
    published: '2026-03-19T15:38:00.000Z',
    addedAt: now,
    excerpt: 'Less than a third of employees said they have received any mental health-related training at work, the report found.',
    image: '',
    summary_hu: 'A NAMI (Nemzeti Mentális Egészségügyi Szövetség) felmérése szerint az amerikaiak negyede fontolóra vette a munkahelyváltást, mert munkája negatívan hatott lelki egészségére. A munkavállalók kevesebb mint egyharmada kapott bármilyen mentális egészségügyi képzést a munkahelyén. A kutatás egyértelmű üzenete: a munkáltatóknak jóval aktívabb szerepet kell vállalniuk a pszichológiai biztonság megteremtésében.'
  },
  {
    id: '1742396460000_2005',
    source: 'HR Dive',
    category: 'HR News',
    color: '#0369a1',
    geo: '🇺🇸 USA',
    title: 'Employers can use March Madness to reengage burnt-out workers, firm suggests',
    title_hu: 'Hogyan fordítható a March Madness a kiégett munkavállalók javára?',
    url: 'https://www.hrdive.com/news/march-madness-worker-engagement/815107/',
    published: '2026-03-19T15:01:00.000Z',
    addedAt: now,
    excerpt: 'Rather than trying to quash worker distraction or absences tied to the annual tournament, companies should embrace the bracketology.',
    image: '',
    summary_hu: 'Egy tanácsadó cég szerint a munkaadók ne harcoljanak az NCAA-tornával, hanem használják fel az elkötelezettség erősítésére. A csoportos szurkolás és az irodai tippverseny lehetőséget teremt informális kapcsolatépítésre, ami kifejezetten segíthet a kiégett munkavállalók visszakapcsolásában. A rugalmas hozzáállás e téren a vállalati kultúra érettségét jelzi.'
  },
  {
    id: '1742396400000_2006',
    source: 'HR Dive',
    category: 'HR News',
    color: '#0369a1',
    geo: '🇺🇸 USA',
    title: 'Major urban hubs boomerang as best source for global talent, analysis finds',
    title_hu: 'A nagyvárosok ismét a globális tehetségek fő forrásai',
    url: 'https://www.hrdive.com/news/urban-hubs-boomerang-best-source-for-global-talent/815165/',
    published: '2026-03-19T15:00:00.000Z',
    addedAt: now,
    excerpt: 'U.S. workers are now as close to major cities like New York, Los Angeles, Chicago, Houston and San Francisco, as they were in 2021 prior to the pandemic-era exodus, Deel reported.',
    image: '',
    summary_hu: 'A Deel elemzése szerint az amerikai dolgozók visszaáramlottak a nagyvárosokba: New York, Los Angeles, Chicago, Houston és San Francisco közelébe annyi munkavállaló költözött vissza, mint a pandémia előtt, 2021-ben. A nagyvárosok így ismét a globális tehetségpiac legfontosabb forrásaivá válnak, ami alapvetően befolyásolja a toborzási és irodabővítési stratégiákat.'
  },
  {
    id: '1742435733000_2007',
    source: 'HR Executive',
    category: 'HR Strategy',
    color: '#7c3aed',
    geo: '🇺🇸 USA',
    title: 'When Coverage Isn\'t Enough: Closing Gaps in Access, Trust, and Cost',
    title_hu: 'Ha a biztosítás önmagában nem elég – hozzáférési, bizalmi és költségrések',
    url: 'https://hrexecutive.com/when-coverage-isnt-enough-closing-gaps-in-access-trust-and-cost/',
    published: '2026-03-20T01:55:33.000Z',
    addedAt: now,
    excerpt: 'Join Maven Clinic to explore how you can turn menopause awareness into outcomes that matter—for your people and your company.',
    image: 'https://hrexecutive.com/wp-content/uploads/2022/06/Maven-370x200-1.png',
    summary_hu: 'A Maven Clinic webinárján azt vizsgálják, miért nem elegendő a pusztán meglévő egészségügyi fedezet a menopauza-tudatosság körül. A hozzáférési korlátok, a bizalomhiány és a rejtett költségek mind hozzájárulnak ahhoz, hogy a munkavállalók ne tudják ténylegesen igénybe venni az ellátást. A munkáltatóknak strukturálisan kell megközelíteni ezt a témát, és mérni az egészségügyi juttatások valódi hatását.'
  },
  {
    id: '1742435279000_2008',
    source: 'HR Executive',
    category: 'HR Strategy',
    color: '#7c3aed',
    geo: '🇺🇸 USA',
    title: 'From Fragmented to AI-Ready: Practical Steps for Secure, Modern and Intelligent HR',
    title_hu: 'A töredezett HR-rendszertől az AI-ra kész szervezetig',
    url: 'https://hrexecutive.com/from-fragmented-to-ai-ready-practical-steps-for-secure-modern-and-intelligent-hr/',
    published: '2026-03-20T01:47:59.000Z',
    addedAt: now,
    excerpt: 'See how Hyland helps HR teams activate content throughout the employee lifecycle, unlocking secure, explainable AI HR leaders can trust.',
    image: 'https://hrexecutive.com/wp-content/uploads/Hyland-Featured-Image.png',
    summary_hu: 'A Hyland webinárján bemutatják, hogyan lehet széttagolt HR-rendszerekből egységes, AI-kompatibilis infrastruktúrát építeni. A megközelítés kulcsa a tartalomalapú munkavállalói életciklus-kezelés, amely átlátható és megbízható AI-döntéstámogatást tesz lehetővé. Az átállás nem pusztán technológiai, hanem folyamat- és kultúraváltást is igényel.'
  },
  {
    id: '1742394600000_2009',
    source: 'Workology',
    category: 'HR & Recruiting',
    color: '#b45309',
    geo: '🇺🇸 USA',
    title: 'Podcast Episode 443: Personal Development and Employee Accountability',
    title_hu: 'Személyes fejlődés és munkavállalói felelősségvállalás a gyakorlatban',
    url: 'https://workology.com/podcast-episode-443-personal-development-and-employee-accountability/',
    published: '2026-03-19T14:30:00.000Z',
    addedAt: now,
    excerpt: 'On this episode of the Workology Podcast, we\'re talking performance and accountability with Leadership Strategist Kellye Franklin.',
    image: '',
    summary_hu: 'A Workology podcast legújabb epizódjában Kellye Franklin leadership stratéga osztja meg gondolatait a teljesítménymenedzsment és elszámoltathatóság témájában. Álláspontja szerint a valódi felelősségvállalás nem a számonkérésről szól, hanem az önfejlesztési igény belső motivációjának kialakításáról. Ez a megközelítés különösen hasznos azon szervezetek számára, amelyek csökkenteni kívánják a mikromenedzsment mértékét.'
  },
  {
    id: '1742408284000_2010',
    source: 'HR Reporter',
    category: 'HR News',
    color: '#d9000d',
    geo: '🇨🇦 Kanada',
    title: 'ALRB shuts down complaint over reclassification delay',
    title_hu: 'Az ALRB elutasított egy panaszt az átsorolási késedelem ügyében',
    url: 'https://www.hrreporter.com/chrr-plus/employment-law/alrb-shuts-down-complaint-over-reclassification-delay/394197',
    published: '2026-03-19T18:18:04.000Z',
    addedAt: now,
    excerpt: 'Labour relations board looks at whether union made reasoned judgment based on adequate investigation and consideration of merits',
    image: 'https://cdn-res.keymedia.com/cms/images/chrr/sara_639095415051103483.jpg',
    summary_hu: 'Az Alberta Labour Relations Board elvetett egy szakszervezeti panaszt, amelyet a munkáltató által késleltetett munkakör-átsorolás miatt nyújtottak be. A testület megvizsgálta, hogy a szakszervezet kellő alapossággal vizsgálta-e meg az ügyet, mielőtt panaszt tett volna. Az eset rámutat, hogy a munkaügyi panaszok befogadásához a vizsgálati eljárás minőségének is meg kell felelnie bizonyos elvárásoknak.'
  },
  {
    id: '1742392929000_2011',
    source: 'HR Reporter',
    category: 'HR News',
    color: '#d9000d',
    geo: '🇨🇦 Kanada',
    title: 'Saskatchewan budget: tax relief, health care and support for workers',
    title_hu: 'Saskatchewan: adókönnyítés, egészségügy és munkavállalói támogatás a büdzsében',
    url: 'https://www.hrreporter.com/news/hr-news/saskatchewan-budget-tax-relief-health-care-and-support-for-workers/394196',
    published: '2026-03-19T14:02:09.000Z',
    addedAt: now,
    excerpt: '\'We had a choice: cut services, raise taxes or protect Saskatchewan\'',
    image: 'https://cdn-res.keymedia.com/cms/images/chrr/jimw_639095255996598362.jpg',
    summary_hu: 'Saskatchewan tartomány legújabb költségvetése adókönnyítést, egészségügyi fejlesztéseket és munkavállalói támogatást helyez előtérbe. A kormány vezérfonala: a szolgáltatások megőrzése és az adóemelés elkerülése egyszerre. A csomagban foglaltak a regionális munkaerőpiacra is hatással lesznek, különösen az egészségügyi ágazatban.'
  },
  {
    id: '1742388305000_2012',
    source: 'HR Reporter',
    category: 'HR News',
    color: '#d9000d',
    geo: '🇨🇦 Kanada',
    title: 'March spotlight: DEI trends, strategies and results',
    title_hu: 'DEI trendek, stratégiák és eredmények – márciusi összefoglaló',
    url: 'https://www.hrreporter.com/focus-areas/diversity/march-spotlight-dei-trends-strategies-and-results/394139',
    published: '2026-03-19T12:45:05.000Z',
    addedAt: now,
    excerpt: 'Each month, Canadian HR Reporter is publishing a series of articles on a topic that matters to HR leaders and professionals',
    image: 'https://cdn-res.keymedia.com/cms/images/chrr/sara_639081689171260194.png',
    summary_hu: 'A Canadian HR Reporter havi tematikus sorozatának márciusi témája a sokszínűség, egyenlőség és befogadás: aktuális trendek, bevált stratégiák és mérhető eredmények kerülnek terítékre. A cikkgyűjtemény elsősorban a kanadai HR-szakemberek igényeihez igazodik, de globálisan is tanulságos olvasmány. A DEI-kezdeményezések mérhetőségére és valódi üzleti hatására egyre nagyobb figyelmet fordítanak.'
  },
  {
    id: '1742402191000_2013',
    source: 'Personnel Today',
    category: 'HR News',
    color: '#1e40af',
    geo: '🇬🇧 UK',
    title: 'Covid-19 Inquiry highlights mental health impact on health workers',
    title_hu: 'A Covid-vizsgálat feltárja az egészségügyi dolgozók mentális egészségkárosodását',
    url: 'https://www.personneltoday.com/hr/covid-19-inquiry-highlights-mental-health-impact-on-health-workers/',
    published: '2026-03-19T16:36:31.000Z',
    addedAt: now,
    excerpt: 'The breadth of the traumatic impact of the pandemic on healthcare employees has been revealed by the latest release of findings from the UK Covid-19 Inquiry.',
    image: 'https://www.personneltoday.com/wp-content/uploads/sites/8/2026/03/shutterstock_1700391511-1-1-2.jpg',
    summary_hu: 'Az Egyesült Királyság Covid-19 vizsgálóbizottságának legújabb megállapításai szerint a pandémia kiemelkedően súlyos és tartós mentális egészségkárt okozott az egészségügyi munkavállalóknak. A traumák mélysége és széleskörűsége alátámasztja, hogy rendszerszintű lelki egészség-támogatásra és strukturális változtatásokra van szükség az ágazatban. Az eredmények más szektorok HR-vezetői számára is fontos tanulságokat hordoznak.'
  },
  {
    id: '1742384771000_2014',
    source: 'Personnel Today',
    category: 'HR News',
    color: '#1e40af',
    geo: '🇬🇧 UK',
    title: 'Union urges university to adopt WFH policy as meningitis cases rise',
    title_hu: 'Szakszervezet kér home office-t egy brit egyetemtől az agyhártyagyulladás-kitörés miatt',
    url: 'https://www.personneltoday.com/hr/kent-meningitis-university-work-from-home/',
    published: '2026-03-19T11:46:11.000Z',
    addedAt: now,
    excerpt: 'Some 15 people are confirmed to have meningitis in the current outbreak in east Kent, with a further 12 suspected cases.',
    image: 'https://www.personneltoday.com/wp-content/uploads/sites/8/2026/03/shutterstock_2472899071-3.jpg',
    summary_hu: 'Kelet-Kentben agyhártyagyulladás-kitörés alakult ki – 15 megerősített és 12 gyanús esettel –, amire reagálva a szakszervezet home office-t kér az érintett egyetemtől. Az eset rámutat, hogy a rugalmatlan irodai jelenléti elvárások egy-egy egészségügyi krízis hatására gyorsan felülvizsgálat alá kerülhetnek. A HR-esek számára esettanulmányként szolgálhat a vészhelyzeti munkavégzési protokollok előkészítéséhez.'
  },
  {
    id: '1742358657000_2015',
    source: 'Personnel Today',
    category: 'HR News',
    color: '#1e40af',
    geo: '🇬🇧 UK',
    title: 'Tesco staff to receive 5.1% pay rise',
    title_hu: 'A Tesco dolgozói 5,1%-os béremelést kapnak',
    url: 'https://www.personneltoday.com/hr/tesco-pay-rise-2026/',
    published: '2026-03-19T04:30:57.000Z',
    addedAt: now,
    excerpt: 'Tesco confirms that shop floor and warehouse staff will receive a 5.1% pay rise starting from 29 March 2026.',
    image: 'https://www.personneltoday.com/wp-content/uploads/sites/8/2026/03/tesco-pay-rise-2026-shutterstock_2493183373.jpg',
    summary_hu: 'A Tesco megerősítette, hogy az üzleti és raktáros dolgozói 2026. március 29-től 5,1%-os béremelésben részesülnek. A brit kiskereskedelmi szektor egyik meghatározó szereplőjének döntése jelzésértékű a piaci bérversenyre nézve, különösen az alacsonyabb jövedelmű munkavállalói rétegek körében. A lépés illeszkedik abba a trendbe, amelyben a nagy munkáltatók a megtartás érdekében kompenzációjukat a megélhetési költségekhez igazítják.'
  },
  {
    id: '1742421989000_2016',
    source: 'Unleash',
    category: 'HR Tech',
    color: '#db2777',
    geo: '🌍 Globális',
    title: 'AI is reshaping work at every level: Focus on collaborative performance, not individual productivity',
    title_hu: 'Az AI minden szinten átalakítja a munkát – az együttműködő teljesítmény kerül előtérbe',
    url: 'https://www.unleash.ai/unleash-america/ai-is-reshaping-work-at-every-level-focus-on-collaborative-performance-not-individual-productivity/',
    published: '2026-03-19T22:06:29.000Z',
    addedAt: now,
    excerpt: 'Day Three of UNLEASH America 2026 featured expert speakers focusing on how AI is reshaping the world of work - and why productivity shouldn\'t trump collaborative performance.',
    image: 'https://www.unleash.ai/wp-content/uploads/2026/03/81A8617-Gina-1.jpg',
    summary_hu: 'Az UNLEASH America 2026 konferencia harmadik napján a szakértők egyöntetűen hangsúlyozták: az AI nem az egyéni produktivitás, hanem a csapatszintű, kollaboratív teljesítmény javítására való. A szervezetek akkor profitálhatnak igazán a mesterséges intelligenciából, ha a munkafolyamatokat, nem az egyéneket optimalizálják vele. Ez alapvető szemléletváltást igényel a teljesítményértékelési rendszerekben is.'
  },
  {
    id: '1742430747000_2017',
    source: 'HRM Asia',
    category: 'HR News',
    color: '#065f46',
    geo: '🌏 Ázsia',
    title: 'When a crisis decides your WFH policy',
    title_hu: 'Amikor egy válság szabja meg a home office-politikát',
    url: 'https://hrmasia.com/when-a-crisis-decides-your-wfh-policy/',
    published: '2026-03-20T00:32:27.000Z',
    addedAt: now,
    excerpt: 'When crisis strikes, workplace models shift fast, prompting organisations to rethink whether rigid office mandates can withstand future disruptions.',
    image: 'https://hrmasia.com/wp-content/uploads/2026/03/251278859_m-1024x662.jpg',
    summary_hu: 'Az ázsiai munkahelyi modellek tapasztalatai azt mutatják, hogy a szervezetek WFH-politikája válsághelyzetben radikálisan és gyorsan változik meg. A rugalmatlan irodai jelenléti elvárások rendre összeomlanak egy-egy egészségügyi vagy más típusú krízis hatására. A HR-vezetőknek érdemes eleve rugalmas, krízisstabil munkavégzési kereteket kialakítani, ahelyett hogy reaktívan reagálnak a körülmények változásaira.'
  },
  {
    id: '1742430635000_2018',
    source: 'HRM Asia',
    category: 'HR Tech',
    color: '#065f46',
    geo: '🌍 Globális',
    title: 'Workday rolls out Sana AI platform globally to streamline HR and finance workflows',
    title_hu: 'A Workday globálisan bevezeti a Sana AI platformot HR és pénzügy területén',
    url: 'https://hrmasia.com/workday-rolls-our-sana-ai-platform-globally-to-streamline-hr-and-finance-workflows/',
    published: '2026-03-20T00:30:35.000Z',
    addedAt: now,
    excerpt: 'Designed for enterprise use, Sana brings AI agents into the core of HR and finance systems to drive productivity.',
    image: 'https://hrmasia.com/wp-content/uploads/2026/03/Picture-credit-Workday-1024x667.jpg',
    summary_hu: 'A Workday bejelentette a Sana AI platform globális bevezetését, amely AI-ügynököket integrál a HR és pénzügyi rendszerek alaprétegébe. Az enterprise szintű megoldás célja, hogy automatikusan elvégezze az ismétlődő munkafolyamatokat, növelve a szervezeti hatékonyságot. A Workday ezzel megerősíti pozícióját az üzleti AI-integráció terén, ahol az SAP és az Oracle is hasonló fejlesztéseket tart folyamatban.'
  },
  {
    id: '1742439607000_2019',
    source: 'HCA Mag Asia',
    category: 'HR News',
    color: '#065f46',
    geo: '🌏 Ázsia',
    title: 'Why data literacy is now a core capability for HR leaders',
    title_hu: 'Az adatértés ma már alapkompetencia a HR-vezetők számára',
    url: 'https://www.hcamag.com/asia/news/general/why-data-literacy-is-now-a-core-capability-for-hr-leaders/569237',
    published: '2026-03-20T03:00:07.000Z',
    addedAt: now,
    excerpt: 'As AI transforms workforce analytics, HR professionals must move beyond reporting metrics to become strategic partners who can interpret, validate, and act on data-driven insights',
    image: 'https://cdn-res.keymedia.com/cms/images/us/037/0391_639095723275872639.png',
    summary_hu: 'Az AI-alapú munkaerő-elemzés terjedésével a HR-vezetőknek túl kell lépniük a hagyományos riportoláson: az adatokat értelmezni, validálni és stratégiai döntéssé kell alakítaniuk. Az adatértés (data literacy) ma már nem opcionális extra, hanem a modern HR stratégiai partnerség alapfeltétele. Azok a szervezetek, amelyek befektetnek HR-csapatuk adatkompetenciájának fejlesztésébe, lényegesen jobb tehetségmenedzsment döntéseket hoznak.'
  },
  {
    id: '1742438042000_2020',
    source: 'HCA Mag Asia',
    category: 'HR News',
    color: '#065f46',
    geo: '🌏 Ázsia',
    title: 'Gaming giant used ChatGPT to plan corporate takeover, court finds',
    title_hu: 'Játékcég ChatGPT-vel tervezett vállalati hatalomátvételt – bíróság döntött',
    url: 'https://www.hcamag.com/asia/news/general/gaming-giant-used-chatgpt-to-plan-corporate-takeover-court-finds/569250',
    published: '2026-03-20T02:34:02.000Z',
    addedAt: now,
    excerpt: 'Court orders CEO reinstatement after Krafton\'s AI-assisted scheme to avoid $250 million earnout payment',
    image: 'https://cdn-res.keymedia.com/cms/images/us/035/0365_639095731150353855.png',
    summary_hu: 'Egy dél-koreai bíróság megállapította, hogy a Krafton gaming vállalat vezérigazgatója ChatGPT segítségével tervezett olyan vállalati manővert, amellyel elkerülhetett volna egy 250 millió dolláros kifizetést. A bíróság a kirúgott vezérigazgató visszahelyezését rendelte el, az ügyet precedensértékűnek tartják az AI és a vállalati etika területén. Az eset felhívja a figyelmet az AI-eszközök felelősségteljes vezetői alkalmazásának szükségességére.'
  },
  {
    id: '1742433828000_2021',
    source: 'HCA Mag Asia',
    category: 'HR News',
    color: '#065f46',
    geo: '🌍 Globális',
    title: 'What entry-level jobs is AI most likely to replace?',
    title_hu: 'Melyik belépő szintű munkákat fenyegeti legjobban az AI?',
    url: 'https://www.hcamag.com/asia/news/general/what-entry-level-jobs-is-ai-most-likely-to-replace/569246',
    published: '2026-03-20T01:23:48.000Z',
    addedAt: now,
    excerpt: 'New report reveals what employees believe will be replaced by automation',
    image: 'https://cdn-res.keymedia.com/cms/images/us/035/0365_639095666246993272.png',
    summary_hu: 'Egy friss felmérés szerint a munkavállalók elsősorban az adatbeviteli, ügyfélszolgálati és adminisztratív belépő szintű pozíciókat tartják legjobban automatizálhatónak. A kutatás rávilágít, hogy az AI nem csupán a régi iparágakat érinti, hanem a „fehérgalléros" kezdő állások széles körét is. Ez komoly kérdéseket vet fel a belépő szintű tehetségek vonzásáról és karrierépítéséről a szervezetekben.'
  },
  {
    id: '1742394292000_2022',
    source: 'Personalwirtschaft',
    category: 'HR News',
    color: '#1d4ed8',
    geo: '🇩🇪 Németország',
    title: 'Assessment Center: Wo die KI erwünscht ist – und wo nicht',
    title_hu: 'Értékelő központ és AI: hol igen, hol nem?',
    url: 'https://www.personalwirtschaft.de/news/recruiting/assessment-center-wo-die-ki-erwuenscht-ist-und-wo-nicht-201960/',
    published: '2026-03-19T14:24:52.000Z',
    addedAt: now,
    excerpt: 'Künstliche Intelligenz könnte auch in Assessment Centern verbreitet zum Einsatz kommen. Es gibt aber auch rechtliche Hürden. Das sind die Best- und Worst-Case-Szenarien aus Sicht von HR.',
    image: 'https://www.personalwirtschaft.de/wp-content/uploads/2026/03/PW-Headerbild-84.jpg',
    summary_hu: 'A Personalwirtschaft cikke vizsgálja, hogy a mesterséges intelligencia milyen szerepet kaphat az értékelő központokban (Assessment Center) Németországban. Bár az AI hatékonyabbá teheti az értékelési folyamatokat, jogi akadályok – például az adatvédelem és az algoritmikus döntéshozatal átláthatósága – korlátozzák az alkalmazás körét. A cikk bemutatja a legjobb és legkockázatosabb felhasználási forgatókönyveket HR-perspektívából.'
  },
  {
    id: '1742396400000_2023',
    source: 'Parlons RH',
    category: 'HR News',
    color: '#2563eb',
    geo: '🇫🇷 Franciaország',
    title: 'REPLAY WEBINAR | Recruter ne suffit plus : construisez un écosystème de talents durable',
    title_hu: 'A toborzás már nem elég – fenntartható tehetség-ökoszisztéma kell',
    url: 'https://www.parlonsrh.com/replay-webinar-recruter-ne-suffit-plus-construisez-un-ecosysteme-de-talents-durable/',
    published: '2026-03-19T15:00:00.000Z',
    addedAt: now,
    excerpt: 'Revivez le webinar « Recruter ne suffit plus : construisez un écosystème de talents durable » avec Alexandre Bazin, Directeur NibelRH chez Nibelis.',
    image: 'https://www.parlonsrh.com/app/uploads/sites/3/2026/03/webinar-12-mars-nibelis-parlons-rh.jpg',
    summary_hu: 'A Parlons RH webináron Alexandre Bazin (Nibelis) arról oszt meg tapasztalatokat, miért nem elegendő ma már pusztán toborzni: a szervezeteknek olyan tehetség-ökoszisztémát kell felépíteniük, amely hosszú távon megtartja és fejleszti az embereket. A fenntartható tehetségstratégia kulcsa a belső mobilitás, a folyamatos fejlesztés és az egyéni karrierút tudatos gondozása. Egyre több vállalatnál ismerik fel, hogy a toborzási költségek töredékéért megtartható a meglévő tehetség.'
  },
  {
    id: '1742445047000_2024',
    source: 'Y2Y',
    category: 'Y2Y Blog',
    color: '#DED114',
    geo: '🇭🇺 Magyar',
    title: 'Hogy fogjuk megoldani a back-sittinget? És főleg ki?',
    title_hu: 'Ki és hogyan oldja meg a back-sittinget a szervezetedben?',
    url: 'https://www.y2y.hu/blog/hogy-fogjuk-megoldani-a-back-sittinget-es-foleg-ki',
    published: '2026-03-20T04:30:47.074Z',
    addedAt: now,
    excerpt: 'Állati nagyot megy a back-sitting cikkünk, és élek a feltételezéssel, hogy még több helyen érzitek, mint amit én elsőre feltételeztem.',
    image: 'https://www.y2y.hu/storage/gallery/images/2025/10/03/Zud37D7BlXNDfbUU74ZdZcQVL7v1rWfL3dvVHany.jpg',
    summary_hu: 'A Y2Y blog cikke a back-sitting jelenség visszhangját elemzi: a korábbi írás óriási figyelmet kapott, és sokan ismertek rá saját szervezetük valóságára. A szerző most a következő lépésre fókuszál: ki a felelős, és hogyan lehet ténylegesen megoldani ezt a munkahelyi problémát. Mert a felismerés csak az első lépés – a változás a szándékon és a bátorságon múlik.'
  }
];

// Read existing news.json
const existing = JSON.parse(fs.readFileSync(newsPath, 'utf8'));

// Build set of existing URLs to avoid duplicates
const existingUrls = new Set(existing.articles.map(a => a.url));

// Filter out already-existing URLs from new articles
const trulyNew = newArticles.filter(a => !existingUrls.has(a.url));

// Combine new + existing, filter out articles older than 30 days
const combined = [...trulyNew, ...existing.articles].filter(a => {
  const date = a.addedAt || a.published;
  return date >= cutoff;
});

const output = {
  lastUpdated: now,
  articles: combined
};

fs.writeFileSync(newsPath, JSON.stringify(output, null, 2), 'utf8');
console.log('Done. Truly new: ' + trulyNew.length + ' | Total: ' + combined.length);
