const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('data/raw-new-articles.json', 'utf8'));
const news = JSON.parse(fs.readFileSync('public/data/news.json', 'utf8'));

// Skip non-HR articles (promo and press release)
const SKIP_URLS = [
  'https://www.hrreporter.com/news/hr-news/enter-your-organization-for-5-star-dei-employers-2026/394207',
  'https://hr.asia/globenewswire/laudio-named-to-fast-companys-annual-list-of-the-worlds-most-innovative-companies-of-2026/'
];

const summaries = {
  'https://hbr.org/2026/03/leaders-underestimate-the-value-of-employee-joy': {
    title_hu: 'A munkavállalói öröm alábecsült hatalma',
    summary_hu: 'Egy új HBR-kutatás szerint a vezetők szisztematikusan alulbecsülik, mennyire fontos munkavállalóiknak az öröm és a pozitív munkahelyi élmény. Miközben a cégek rengeteg energiát fordítanak az ügyfélelégedettség megértésére, a munkaerő belső motivációira alig figyelnek. A szerzők arra ösztönzik a vezető csapatokat: ismerjék meg annyira dolgozóikat, mint az ügyfeleiket.',
    geo: '🌍 Globális'
  },
  'https://hbr.org/2026/03/how-to-convince-others-to-trust-your-instincts': {
    title_hu: 'Hogyan nyerj bizalmat az ösztönös döntéseidhez?',
    summary_hu: 'A legjobb vezetők nem csupán megérzésekre hagyatkoznak – tudják, hogyan adják el azokat másoknak is. Egy HBR-cikk szerint a hiteles kommunikáció és a múltbeli sikerek bemutatása kulcsfontosságú ahhoz, hogy mások is elfogadják az intuitív döntéseket. Az ösztön önmagában nem elég: a szavak és a keretezés formálja, hogy a csapat valóban követ-e.',
    geo: '🌍 Globális'
  },
  'https://hbr.org/podcast/2026/03/learn-to-disagree-more-effectively': {
    title_hu: 'Az egyet nem értés mint vezetői készség – hogyan csináld jól?',
    summary_hu: 'Julia Minson, a Harvard Kennedy School professzora szerint a legtöbb ember valójában az ellenfelet akarja legyőzni egy vitában, nem az igazságot megtalálni. A konkrét viselkedésekre fókuszáló visszajelzés és az aktív meghallgatás drasztikusan javítja az egyeztetés minőségét. A hatékony nézeteltérés tanulható készség – nem veleszületett adottság.',
    geo: '🌍 Globális'
  },
  'https://www.hrdive.com/news/mastercard-bets-ai-can-fill-cfo-gap-small-businesses': {
    title_hu: 'Virtuális pénzügyi igazgató mesterséges intelligenciával – a Mastercard kis cégekre terjeszti ki az AI-t',
    summary_hu: 'A Mastercard egy AI-alapú "virtuális pénzügyi igazgató" eszközt fejlesztett ki, amely kisebb vállalkozások számára hozzáférhetővé teszi a korábban csak nagyvállalatoknál elérhető pénzügyi elemzéseket. Az eszköz a lean csapatokat segíti, és nem a pénzügyi munkatársakat váltja ki, hanem azok munkáját egészíti ki. A fejlemény jól jelzi, hogy az AI képes szüntetni a kis- és nagyvállalatok erőforrásai közötti szakadékot.',
    geo: '🇺🇸 USA'
  },
  'https://www.hrdive.com/news/gallup-workforce-no-longer-thriving-engagement-low/8': {
    title_hu: 'Gallup: az emberek elégedetlenek, de nem mozdulnak – rekord mélyen az elkötelezettség',
    summary_hu: 'A Gallup legújabb mérése szerint az alkalmazotti elkötelezettség egy évtized legalacsonyabb szintjére esett vissza: a munkavállalók kevesebb mint 30%-a érzi magát igazán bevontnak a munkájába. Az emberek "nyugtalanok, de nagyrészt mozdíthatatlanok" – nincsenek boldogok, de az álláspiaci bizonytalanság miatt mégsem váltanak. A HR-csapatoknak most kell megragadni a lehetőséget a meglévő tehetségek visszanyerésére.',
    geo: '🌍 Globális'
  },
  'https://www.hrdive.com/news/ai-data-center-construction-hiring-workers-upskillin': {
    title_hu: 'Az AI nem veszi el a szakmunkásokat – éppen ellenkezőleg, keresi őket',
    summary_hu: 'Meglepő trend bontakozik ki az AI-beruházások nyomán: az adatközpontok és fizikai infrastruktúra kiépítése miatt megugrott a villanyszerelők, hegesztők és más szakmunkások iránti kereslet. A Randstad vezérigazgatója szerint "a digitális forradalomnak fizikai alapja van". Az AI tehát nemcsak fehérgalléros munkahelyeket teremt és szüntet meg – az ipari szakmákra is óriási hatással van.',
    geo: '🌍 Globális'
  },
  'https://www.hrdive.com/news/organizational-dehumanization-toxic-bosses-psycholog': {
    title_hu: 'Mérgező főnök = kiégés és dehumanizáció – kutatás igazolja az összefüggést',
    summary_hu: 'Egy új kutatás megerősíti: a mérgező vezetők nemcsak elégedetlenséget okoznak, hanem aktívan dehumanizálják a munkavállalókat, azaz olyan légkört teremtenek, amelyben az emberek elhanyagolhatónak érzik magukat. Ez súlyos kiégéshez vezet. A megoldás a kutatók szerint az emberközpontú menedzsment, amely visszaadja a dolgozók cselekvőképességét és megbecsültsége-érzését.',
    geo: '🌍 Globális'
  },
  'https://www.hrdive.com/news/enterprises-struggle-align-ai-roi/815439/': {
    title_hu: 'Az AI megtérülésén veszekednek a vállalatok – nincs belső konszenzus',
    summary_hu: 'A nagyvállalatok és HR-csapatok szerint az AI-beruházások legnagyobb belső feszültsége az azonnali és hosszú távú megtérülés közötti szakadék. Míg a pénzügy azonnali ROI-t vár, a HR és az IT hosszabb távú változásban gondolkodik. Az összehangolatlan elvárások gátolják az AI valódi skálázódását – ami elsősorban szervezetfejlesztési, nem pedig technológiai probléma.',
    geo: '🌍 Globális'
  },
  'https://www.hrdive.com/news/growing-gap-leaders-expectations-support/815483/': {
    title_hu: 'A középvezetők elvesznek az elvárások és a támogatás közötti ollóban',
    summary_hu: 'Új kutatás szerint a vezetők egyre több olyan feladatot végeznek, amely nem az elsődleges szerepükbe tartozik – miközben a rájuk nehezedő elvárások nőnek, a kapott támogatás nem tart lépést. Ez az egyre tágabbra nyíló olló komoly kiégési kockázatot jelent középvezetői szinten. A szervezeteknek sürgősen fel kell mérniük, mi tölti ki valójában a vezetőik napjait.',
    geo: '🌍 Globális'
  },
  'https://www.hrdive.com/news/dol-2026-joint-employer-rule-sent-white-house/815457': {
    title_hu: 'Új közös munkáltatói szabályozás készül az USA-ban – munkaadó-barát változtatás várható',
    summary_hu: 'Az Egyesült Államok Munkaügyi Minisztériuma elküldte a Fehér Háznak az új közös munkáltatói szabályozást, amely várhatóan kedvezőbb feltételeket teremt a munkáltatóknak a jelenlegi FLSA-előírásoknál. Az új szabályok a franchise-ok és alvállalkozói kapcsolatok jogi megítélését érintik. Az átalakulás jelentős hatással lesz az outsourcing és a platform-alapú foglalkoztatásra.',
    geo: '🇺🇸 USA'
  },
  'https://www.hrdive.com/news/bimbo-bakeries-cant-compel-massachusetts-drivers-to-': {
    title_hu: 'Bimbo Bakeries veszített: a sofőrök bíróság elé vihetik a besorolási vitát',
    summary_hu: 'Egy szövetségi bíróság kimondta: a Bimbo Bakeries nem kényszerítheti Massachusetts-i sofőrjeit választottbíráskodásra a munkavállalói besorolást vitató ügyükben. A döntés precedens értékű a szállítási és logisztikai ágazatban, ahol sok dolgozót vitatott besorolással foglalkoztatnak. Ez újabb fejezet az alvállalkozói minősítés körüli egyre sűrűsödő jogi csatározásokban.',
    geo: '🇺🇸 USA'
  },
  'https://www.hrdive.com/news/feds-stay-the-course-on-marijuana-testing/815418/': {
    title_hu: 'Heti HR összefoglaló: szövetségi szinten marad a marihuána-tesztelés',
    summary_hu: 'Az elmúlt hét legfontosabb HR híreit foglalja össze a HR Dive: a szövetségi hatóságok nem tágítanak a munkahelyi marihuána-tesztelési előírásoktól, miközben az AI iránti pesszimizmus is erősödik egyes körökben. A heti összefoglaló betekintést nyújt abba, mi mozgatta az USA HR-szakmát az elmúlt napokban.',
    geo: '🇺🇸 USA'
  },
  'https://www.hrmorning.com/articles/motivate-team-of-work-misfits/': {
    title_hu: '8 módszer, amivel az "össze nem illő" csapatból nyerő csapat lesz',
    summary_hu: 'A valósággal szemben sok vezető azt hiszi, hogy kiegyensúlyozott, erős csapatot vezet – miközben a helyzet egészen más képet mutat. A cikk nyolc konkrét módszert kínál arra, hogyan motiválj heterogén, kevésbé nyilvánvalóan összeillő csapattagokat. A kulcs: felismerni az egyéni erősségeket, és azokat a szervezeti célokhoz igazítani.',
    geo: '🇺🇸 USA'
  },
  'https://www.hrmorning.com/articles/contract-roles-workforce-planning/': {
    title_hu: 'Szerződéses tehetség a stratégiai réseken: mikor ne toborozz teljes munkaidőben?',
    summary_hu: 'Számos szervezetben a munkaerő-tervezés reflexből teljes munkaidős toborzással indul – holott a valódi igény sokszor rugalmasabb megoldást kívánna. A szerződéses és projektbázisú tehetségek stratégiai alkalmazása egyre inkább versenyképes alternatívává válik a vezető szintű hiányok betöltésére. A cikk konkrét szempontokat ad ahhoz, mikor érdemes és mikor nem a headcount bővítés.',
    geo: '🇺🇸 USA'
  },
  'https://hrexecutive.com/5-practical-steps-to-creating-hr-shared-services-for-you': {
    title_hu: '5 lépés a hatékony HR Shared Services kialakításához',
    summary_hu: 'A HR shared services nem csak a nagyvállalatok kiváltsága – a megfelelően strukturált belső szolgáltatásközpont kisebb szervezetekben is komoly hatékonyságnövekedést hozhat. A cikk öt konkrét lépésen vezeti végig a HR-vezetőket a szervezeti átalakítástól az átmeneti kommunikációig. A siker alapfeltétele: belső ügyfélorientáció és standardizált folyamatok.',
    geo: '🇺🇸 USA'
  },
  'https://hrexecutive.com/a-first-look-at-the-white-house-ai-policy-framework/': {
    title_hu: 'Első pillantás a Fehér Ház AI-politikai keretrendszerére',
    summary_hu: 'A Fehér Ház közzétette mesterséges intelligenciával kapcsolatos politikai keretrendszerét, amely meghatározza, hogyan kellene a Kongresszusnak szabályoznia az AI fejlesztését és alkalmazását. A dokumentum az innováció és a biztonság egyensúlyát keresi, és közvetlen hatással lesz arra, hogyan telepíthetnek HR-tech eszközöket a munkáltatók. Mindenki számára kötelező olvasmány, aki AI-alapú toborzási vagy teljesítményértékelési eszközöket alkalmaz.',
    geo: '🇺🇸 USA'
  },
  'https://hrexecutive.com/as-eightfold-workday-suits-show-ai-legal-risks-are-build': {
    title_hu: 'Eightfold és Workday perek figyelmeztetnek: az AI jogi kockázatai nőnek a HR-ben',
    summary_hu: 'Az AI-alapú HR-technológiai eszközök ellen benyújtott perek száma emelkedik – a Workday és az Eightfold ellen indított eljárások jól mutatják, hogy az algoritmus alapú döntéshozatal diszkriminációs kockázatokat hordoz. A jogi csaták nemcsak a szoftvergyártókat, hanem az azokat alkalmazó munkáltatókat is érintik. Az AI-eszközök bevezetésekor a jogi átvilágítás és az átláthatóság ma már nem opcionális.',
    geo: '🇺🇸 USA'
  },
  'https://hrdailyadvisor.hci.org/2026/03/23/beyond-retention-reimagining-hr-for-th': {
    title_hu: 'A megtartáson túl: mit kíván a következő generáció a HR-től?',
    summary_hu: 'A HR-szakemberek többsége a jobbvilágot akarja építeni – de egyre több akadály tornyosul előttük. A cikk azt vizsgálja, hogyan kellene újragondolni a HR szerepét ahhoz, hogy valóban megfeleljen a következő generáció elvárásainak: a rugalmasság, az autentikus kultúra és az értékközpontú munka iránt. Nem elég megtartani az embereket – olyan helyet kell teremteni, ahová szívesen jönnek.',
    geo: '🌍 Globális'
  },
  'https://hrdailyadvisor.hci.org/2026/03/23/hrda-frankly-speaking-linkedin-leading': {
    title_hu: 'A LinkedIn tehetségfejlesztési igazgatója az AI és emberi tehetség jövőjéről',
    summary_hu: 'Dr. Chrissy Roth-Francis, a LinkedIn tehetségfejlesztési igazgatója egy nyílt beszélgetésben osztotta meg, hogyan gondolkodik a "Human Plus" jövőről – ahol az AI nem helyettesíti, hanem felerősíti az emberi képességeket. A szervezetek tehetségstratégiájának középpontjába egyre inkább az emberi-gépi együttműködés kerül. A LinkedIn saját belső programjai iránytűként szolgálhatnak más szervezeteknek.',
    geo: '🌍 Globális'
  },
  'https://www.hrreporter.com/chrr-plus/labour-relations/collective-agreement-logix': {
    title_hu: 'Kollektív szerződés: Logixx Security és az United Steelworkers szakszervezet',
    summary_hu: 'A Logixx Security torontói alkalmazottai és az United Steelworkers, Local 9597 szakszervezet új kollektív szerződést kötött. A megállapodás a kanadai biztonsági szektor munkaügyi kapcsolatainak alakulását tükrözi. A kollektív szerződés adatpont a szektor bérkörülményeinek monitorozásához.',
    geo: '🇨🇦 Kanada'
  },
  'https://www.hrreporter.com/focus-areas/payroll/federal-minimum-wage-increase-con': {
    title_hu: 'Április 1-jén emelkedik a szövetségi minimálbér Kanadában',
    summary_hu: 'A kanadai szövetségi minimálbér április 1-jétől emelkedik – az új összeg valamivel magasabb lett a korábban becsült 18,10 kanadai dollárnál. A változás a szövetségi joghatóság alá tartozó munkáltatókat érinti elsősorban. A HR-csapatoknak érdemes most ellenőrizni, hogy bérstruktúrájuk megfelel-e az új előírásoknak.',
    geo: '🇨🇦 Kanada'
  },
  'https://www.hrreporter.com/focus-areas/payroll/advertised-wages-still-trail-post': {
    title_hu: 'Kanada lemarad: a meghirdetett bérek még mindig elmaradnak az infláció mögött',
    summary_hu: 'Egy friss tanulmány szerint Kanada az USA és az Egyesült Királyság mögé szorult a pandémia utáni reálbér-helyreállásban: a meghirdetett bérek nem tartottak lépést az inflációval. Ez különösen a közép- és alacsonyabb jövedelmű munkakörökben teremt feszültséget, és rontja a munkáltatók toborzási versenyképességét. A bértranszparencia erősödése várhatóan tovább növeli a nyomást a béremelésre.',
    geo: '🇨🇦 Kanada'
  },
  'https://www.hrreporter.com/focus-areas/diversity/the-amenities-ladder-why-it-lea': {
    title_hu: 'Az amenitás-létra: hogyan löki alacsonyabb értékű pozíciókba a rugalmasság iránti igény a nőket?',
    summary_hu: 'A kutatás szerint a nők sokszor rugalmasabb, alacsonyabb láthatóságú szerepeket választanak a karrierjük során – és ez hosszú távon elvágja őket a magasabb presztízsű pozícióktól. Az "amenitás-létra" jelenség azt mutatja: a látszólag munkavállalóbarát rugalmassági opciók paradox módon hátrányosak lehetnek a nők karrierpályáján. A szervezeteknek átgondoltabban kell megtervezniük, hogy a rugalmas munkalehetőségek kinek és hogyan válnak elérhetővé.',
    geo: '🇨🇦 Kanada'
  },
  'https://www.hrreporter.com/focus-areas/payroll/815000-store-manager-must-pay-for': {
    title_hu: '815 000 dolláros kártérítés: az áruházvezető felelős a jogtalan kifizetésekért',
    summary_hu: 'Egy brit-kolumbiai bíróság kimondta: az áruházvezető köteles 815 000 dollárt visszafizetni, miután kiderült, hogy jogosulatlan béreket és kiadásokat engedélyezett. A felmondás hat hónapos késedelme sem minősül az igények jóváhagyásának a bíróság szerint. Az ítélet figyelmeztetés: a belső kontrollok hiánya komoly személyes jogi következményekkel is járhat.',
    geo: '🇨🇦 Kanada'
  },
  'https://www.hrreporter.com/news/hr-news/when-is-the-last-straw/394206': {
    title_hu: 'Mikor az utolsó csepp? Az azonnali felmondás jogszerűsége a fegyelmezési folyamatban',
    summary_hu: 'Kanadai foglalkoztatási jogászok elemzik, mikor lehet jogszerűen "az utolsó csepp" alapján azonnal felmondani egy munkavállalónak, és mikor nem. A progresszív fegyelmezési eljárás kereteinek betartása kulcsfontosságú – ha a munkáltató kihagy lépéseket, az azonnali felmondás jogellenessé válhat. A cikk konkrét esetpéldákon mutatja be a jogi határokat.',
    geo: '🇨🇦 Kanada'
  },
  'https://www.hrreporter.com/focus-areas/compensation-and-benefits/what-are-the-3-': {
    title_hu: 'A juttatási költségek megértésének 3 legnagyobb akadálya – globális HR-felmérés',
    summary_hu: 'Egy globális felmérés szerint a HR-csapatok három fő akadállyal küzdenek a juttatási költségek megértésében: az adatok széttagoltsága, a döntéshozók eltérő prioritásai és az AI-eszközök egyenlőtlen elterjedése. A kutatás azt is megmutatta, hogy a szervezetek lényegesen különböznek abban, mennyire támaszkodnak technológiára a juttatások kezelésénél. Az eredmények egységesebb megközelítés kialakítására ösztönzik a HR-t ezen a területen.',
    geo: '🌍 Globális'
  },
  'https://www.hrreporter.com/focus-areas/hr-technology/from-phoenix-to-dayforce-au': {
    title_hu: 'Phoenix után Dayforce: a számvevőszék kockázatokra figyelmeztet a 4,2 milliárdos bérrendszer-váltásnál',
    summary_hu: 'Kanada hírhedt Phoenix bérrendszer-kudarca után most a 4,2 milliárd dolláros Dayforce-átállás körül gyűlnek a viharfelhők: az állami számvevőszék komoly kockázatokra figyelmeztetett. A lassú szabályváltozások, a tömegbevezetés és a szűk kapacitások mind aggasztó tényezők. A projekt sorsából a köz- és a magánszektorban egyaránt lehet tanulni a nagy bérrendszer-migrációkkal kapcsolatban.',
    geo: '🇨🇦 Kanada'
  },
  'https://www.hrreporter.com/focus-areas/safety/air-canada-crash-leaves-2-pilots-d': {
    title_hu: 'Air Canada baleset: 2 pilóta meghalt – a szakszervezetek a munkahelyi biztonságra irányítják a figyelmet',
    summary_hu: 'Halálos futópálya-ütközés rázta meg az Air Canadát – a balesetben két pilóta veszítette életét. A szakszervezetek a tragédia nyomán arra hívják fel a figyelmet, hogy a repülőtereken a valódi veszélyzóna nem a levegőben, hanem a guruló fedélzeten van. Az eset a légiipari munkavédelem és a munkarendek biztonságát helyezi a fókuszba.',
    geo: '🇨🇦 Kanada'
  },
  'https://www.hrreporter.com/focus-areas/payroll/ottawa-extends-ei-tariff-relief-f': {
    title_hu: 'Ottawa meghosszabbítja a vámháborús munkanélküli-segélyt és a munkamegosztási programot',
    summary_hu: 'A kanadai szövetségi kormány meghosszabbítja a vámok által érintett munkavállalóknak szóló munkanélküli-segély könnyítéseit, és rugalmasabbá teszi a munkamegosztási (work-sharing) programot is. Az intézkedések a kereskedelmi feszültségek munkaerőpiaci hatásait hivatottak tompítani. A lépés jelzi, hogy a politika igyekszik gyorsan reagálni a globális vámháborúk foglalkoztatási következményeire.',
    geo: '🇨🇦 Kanada'
  },
  'https://www.personneltoday.com/hr/economic-insecurity-fuelling-rise-in-job-hugge': {
    title_hu: 'Állásölelők: gazdasági bizonytalanság miatt ragaszkodnak helyükhöz az elégedetlen dolgozók is',
    summary_hu: 'A LinkedIn kutatása szerint a gazdasági bizonytalanság miatt egyre több elkötelezetlen munkavállaló ragad meg a helyén – őket "állásölelőknek" (job huggers) nevezik. Ez kihívás elé állítja a szervezeteket: az elvándorlás alacsony, de a belső motiváció és a teljesítmény sem megfelelő. A HR-csapatoknak arra kell figyelniük, hogy az "ott maradás" önmagában nem jelent sikermutatót.',
    geo: '🇬🇧 UK'
  },
  'https://www.personneltoday.com/hr/why-what-we-say-after-a-death-matters/': {
    title_hu: 'Amit gyász után mondunk, fontosabb, mint gondolnánk – a munkavállalói jóllét egy elhanyagolt dimenziója',
    summary_hu: 'A felnőttek jelentős hányada úgy érzi, hogy nem kap elegendő támogatást a gyász után – sem a munkahelyén, sem általában. A cikk arra hívja fel a figyelmet, hogy a szavak és a kommunikáció a nehéz időszakokban meghatározóan befolyásolják a gyászoló kolléga közérzetét és visszatérési képességét. A pszichológiai biztonság megteremtése a HR egyik leginkább elhanyagolt, mégis fontos feladata.',
    geo: '🇬🇧 UK'
  },
  'https://www.personneltoday.com/hr/sme-invest-in-hr-amid-era-reforms/': {
    title_hu: 'Kis- és középvállalkozások HR-be fektetnek a brit foglalkoztatási törvény reformjai nyomán',
    summary_hu: 'A brit Employment Rights Act 2025 reformjainak hatályba lépésével a kisebb cégek egyre több erőforrást irányítanak a HR-funkcióba. A kutatás szerint az SME-k felismerik: a jogszabályi megfelelés és a tehetségmegtartás egyaránt profi HR-kapacitást igényel. Ez a trend a HR-tanácsadói és outsourcing piac számára is komoly növekedési lehetőséget jelent.',
    geo: '🇬🇧 UK'
  },
  'https://www.personneltoday.com/hr/iran-conflict-tuc-calls-for-emergency-taskforc': {
    title_hu: 'Az iráni konfliktus hatása a brit munkaerőpiacra – a TUC védelmi munkacsoport felállítását kéri',
    summary_hu: 'A Trades Union Congress (TUC) vészhelyzeti munkacsoportot sürget, hogy megvédjék a brit munkahelyeket az USA–Izrael–Irán konfliktus gazdasági hatásaitól. A szakszervezet szerint a geopolitikai bizonytalanság már érezteti hatását egyes szektorokban, és proaktív beavatkozás nélkül komoly munkahely-veszteségek következhetnek. A fejlemény rávilágít: a geopolitikai kockázatok ma már a HR stratégiatervezés részévé válnak.',
    geo: '🇬🇧 UK'
  },
  'https://www.personneltoday.com/hr/brewdog-fire-and-rehire/': {
    title_hu: 'Brewdog "kirúg és visszavesz" módszert alkalmaz a bárok újranyitásakor – vádolja a Unite szakszervezet',
    summary_hu: 'A Unite szakszervezet azzal vádolja a Brewdogot, hogy skóciai bárjaiban tűz-és-visszavétel (fire and rehire) gyakorlatot alkalmaz – azaz elbocsátja, majd rosszabb feltételekkel veszi vissza a dolgozókat. A cég cáfolja a vádat. Az eset újra reflektorfénybe helyezi a brit munkajogi reformok körüli vitát és a vendéglátóipari munkakörülményeket.',
    geo: '🇬🇧 UK'
  },
  'https://www.personneltoday.com/hr/act-now-to-prepare-for-benefits-in-kind-bik-ch': {
    title_hu: 'Cselekedj most: közeleg a természetbeni juttatások kötelező bérszámfejtése az Egyesült Királyságban',
    summary_hu: 'Brit szakértők arra ösztönzik a munkáltatókat, hogy haladéktalanul regisztráljanak az HMRC rendszerébe, mert a természetbeni juttatások (benefits in kind) kötelező bérszámfejtési szabályai hamarosan életbe lépnek. A felkészülés elmaradása adminisztratív és pénzügyi kockázatot jelent. A változás komoly átstrukturálást igényel a brit HR- és bérszámfejtési csapatoktól.',
    geo: '🇬🇧 UK'
  },
  'https://www.hrgrapevine.com/content/article/2026-03-23-can-ai-really-coach-like-': {
    title_hu: 'Felülmúlhatja-e az AI a humán coachot? Egy élő kísérlet tanulságai',
    summary_hu: 'Egy különleges kísérletben egy AI-coach versenyzett egy emberi coachhal – az eredmények meglepők: bizonyos helyzetekben az AI megközelítése hatékonyabbnak bizonyult. A cikk azt elemzi, mit jelent ez a coaching szakma jövőjére nézve, és hol maradnak pótolhatatlanok az emberi coachok. A feladat redefiníciója kulcskérdéssé válik: miben legyen jobb az ember, mint egy gép?',
    geo: '🇬🇧 UK'
  },
  'https://www.hrgrapevine.com/content/article/2026-03-23-the-observer-offers-volun': {
    title_hu: 'Az Observer lap minden dolgozójának felajánlja az önkéntes végkielégítést a digitális átállás közepette',
    summary_hu: 'Az Observer brit újság az egész személyzetének felajánlotta az önkéntes leállásért járó végkielégítést, miközben digitális átalakuláson megy keresztül. A lépés a médiaipari átrendeződés egyik legszembetűnőbb jele: a hagyományos nyomtatott kiadványok egyre kevesebb hagyományos munkakört tartanak fenn. Az ügy HR szempontból is tanulságos: hogyan kommunikálj és menedzselj tömeges átmeneti folyamatot humánusan?',
    geo: '🇬🇧 UK'
  },
  'https://www.hrgrapevine.com/content/article/moorepay-2026-03-18-when-duty-of-car': {
    title_hu: 'Amikor csődöt mond a gondoskodási kötelezettség: a BAFTA-incidens tanulságai a HR-nek',
    summary_hu: 'A közelmúlt BAFTA-incidensének fényében a HR Grapevine azt vizsgálja, hogyan kellene a szervezeteknek felülvizsgálni a fogyatékossággal élő alkalmazottak és rendezvényrésztvevők iránti gondoskodási eljárásaikat. A duty of care nem papíron, hanem a gyakorlatban méretik meg. A cikk konkrét lépéseket ajánl a befogadóbb munkakörnyezet és eseményszervezés kialakítására.',
    geo: '🇬🇧 UK'
  },
  'https://hr.asia/globenewswire/with-hr-leading-ai-workforce-strategy-training-eff': {
    title_hu: 'Ha a HR vezeti az AI-stratégiát, a képzések hatékonysága megduplázódik',
    summary_hu: 'Az InStride kutatása szerint azon szervezeteknél, ahol a HR-vezető (CHRO) irányítja az AI-alapú munkaerő-fejlesztési stratégiát, a képzések hatékonysága 54%-ra nő – szemben a 21%-kal, ahol ezt más funkció vezeti. Az adat erős érv amellett, hogy az AI transzformáció emberközpontú megközelítést igényel. A CHRO szerepe az AI korszakban nemcsak támogató, hanem valódi stratégiai vezető szerepre emelkedik.',
    geo: '🌍 Globális'
  },
  'https://www.hcamag.com/asia/news/general/how-hr-leaders-can-transform-people-ana': {
    title_hu: 'People analytics a stratégia szolgálatában: hogyan lépj előre?',
    summary_hu: 'Az AI-alapú emberielemzés (people analytics) a visszatekintő adatközléstől a prediktív stratégiai döntéstámogatásig fejlődött. Azok a HR-vezetők, akik megtanulják ezt az eszköztárat, szó szerint iránytűvé válnak a szervezet jövőbeli döntéseihez. A cikk gyakorlati útmutatót ad ahhoz, hogyan érdemes megkezdeni ezt a fejlődési utat.',
    geo: '🌏 Ázsia'
  },
  'https://www.hcamag.com/asia/news/general/employers-deploy-job-protection-measure': {
    title_hu: 'AI-leépítések árnyékában: munkáltatók munkahelyvédelmi intézkedéseket vezetnek be',
    summary_hu: 'Egy friss jelentés szerint az AI okozta leépítések egyre több szektorban éreztetik hatásukat, miközben a munkáltatók egyre több esetben fordulnak munkahelyvédelmi intézkedésekhez – például az érintett munkavállalók átképzéséhez. Az AI-képzések térnyerése és az elbocsátások párhuzamosan zajlanak, komplex emberi erőforrás-kihívást teremtve. A HR-csapatoknak egyszerre kell a múltból és a jövőből gondolkodniuk.',
    geo: '🌍 Globális'
  },
  'https://www.hcamag.com/asia/news/general/careerfishing-the-new-hiring-trend-that': {
    title_hu: 'Careerfishing: az új toborzási trükk, amely megtéveszti a munkáltatókat',
    summary_hu: 'A "careerfishing" – amikor a jelöltek szándékosan eltúlozzák tapasztalataikat és képesítéseiket az álláskeresés során – egyre komolyabb kihívást jelent a munkáltatóknak. A jelenség erős ellenőrzési módszerek bevezetésére ösztönzi a HR-csapatokat. A háttér-ellenőrzések és referenciahívások fontossága sosem volt akkora, mint most.',
    geo: '🌏 Ázsia'
  },
  'https://www.hcamag.com/asia/specialisation/employee-engagement/just-half-of-gen-': {
    title_hu: 'Szingapúr: a Z generáció fele sem elkötelezett – az irodai politika a fő elcsüggesztő tényező',
    summary_hu: 'Szingapúri adatok szerint a Z generációs munkavállalók alig felének van valódi elkötelezettsége a munkahelyén, és a megkérdezettek az irodai politikát jelölték meg a fő elcsüggesztő tényezőként. Ez azt jelenti, hogy a munkáltatóknak nemcsak a bérezésre és rugalmasságra kell figyelniük, hanem aktívan kell kezelniük a csoportdinamikát és a hatalmi játszmákat is. A Z generáció elkötelezettségét elsősorban a kultúra minősége mozgatja.',
    geo: '🌏 Ázsia'
  },
  'https://www.hcamag.com/asia/specialisation/leadership/wider-uptake-of-hr-certifi': {
    title_hu: 'Szingapúr: a HR-képesítések szélesebb körű megszerzése sürgető szükséglet',
    summary_hu: 'Szingapúri szakemberek szerint a gyorsan változó munkahely-környezetben a HR-tanúsítványok megszerzése kritikus fontosságú a szakma fejlődéséhez. A szervezetek egyre inkább formálisan is elismerik és elvárják a HR-es szakmai képesítéseket. A professzionalizálódás nemcsak a szakmáról szól – az üzleti partnerséget is erősíti.',
    geo: '🌏 Ázsia'
  },
  'https://www.hcamag.com/asia/news/general/ai-workforce-reset-why-job-losses-dont-': {
    title_hu: 'AI-munkaerő reset: a leépítések mögött ott a fejlesztés lehetősége is',
    summary_hu: 'Az "AI workforce reset" nem egyenlő a tömeges munkanélküliséggel – állítja az elemzés. Azok a HR-vezetők, akik készségorientált, pszichológiailag biztonságos átalakulást irányítanak, valójában fejlesztési lehetőséget ragadhatnak meg. A kulcs: az emberek félelmeit korai bevonással és átlátható kommunikációval kell felváltani az alkalmazkodóképesség iránt.',
    geo: '🌍 Globális'
  },
  'https://www.hcamag.com/asia/specialisation/employee-engagement/why-ai-makes-huma': {
    title_hu: 'Minél több az AI, annál fontosabb az emberi kapcsolat a teljesítmény szempontjából',
    summary_hu: 'Ahogy az AI egyre mélyebben épül be a munkafolyamatokba, a HR-vezetőknek arra kell fókuszálniuk, hogyan működnek együtt a csapatok az emberek szintjén. Az emberi kapcsolat, az empátia és a csoportkohézió teljesítményhajtó erővé vált az automatizált munkakörnyezetben. Ez nemcsak szoft stratégia – a produktivitás egyik legfontosabb alapeleme lesz.',
    geo: '🌏 Ázsia'
  },
  'https://www.hcamag.com/asia/news/general/how-to-improve-frontline-engagement/569': {
    title_hu: 'Hogyan kötelezd el a frontline dolgozókat – mielőtt elhagynának?',
    summary_hu: 'A frontline, azaz első vonalbeli munkavállalók elkötelezettségének elhanyagolása komoly fluktuációs kockázatot jelent – ezt megerősítik a legújabb adatok. A frontline munkavállalók más eszközöket és megközelítést igényelnek, mint az irodai dolgozók. A cikk konkrét javaslatokat ad arra, hogyan lehet bevonni ezt a sokszor láthatatlan munkavállalói réteget.',
    geo: '🌏 Ázsia'
  },
  'https://www.hcamag.com/asia/news/general/what-the-worlds-largest-study-of-work-h': {
    title_hu: '160 ország munkaidő-adatai megdöntik a fejlődés és a munkaidő kapcsolatáról alkotott mítoszokat',
    summary_hu: 'A valaha készült legnagyobb munkaidő-kutatás, amely 160 ország adatait dolgozza fel, gyökeresen megkérdőjelezi, amit a munkaidőről és a gazdasági fejlődésről gondoltunk. Az eredmények szerint a munkavégzett órák száma nem vezet automatikusan magasabb termelékenységhez. A kutatás fontos alap a négynapos munkahét és a rugalmas munkavégzés körüli vitákhoz.',
    geo: '🌍 Globális'
  },
  'https://www.hcamag.com/asia/news/general/ai-workslop-puts-leadership-trust-at-ri': {
    title_hu: 'AI-workslop: amikor a gépi tartalom aláaknázza a vezető hitelességét',
    summary_hu: 'Az "AI workslop" – azaz az AI által generált, ellenőrzés nélkül leadott, felületes munkavégzés – egyre nagyobb kihívást jelent a szervezetek számára. Egy új jelentés szerint ennek a jelenségnek hosszú távú hatása van a vezetői tekintélyre és a csapat teljesítményére. A megoldás az AI-t irányító emberi felelősségvállalás tudatos erősítése.',
    geo: '🌍 Globális'
  },
  'https://www.hcamag.com/asia/news/general/south-asian-migrant-workers-killed-as-g': {
    title_hu: 'Dél-ázsiai vendégmunkások haltak meg az öbölvidéki feszültségek nyomán – komoly munkavédelmi problémák',
    summary_hu: 'A közel-keleti konfliktus fokozódása közvetlenül érinti a Perzsa-öböl térségében dolgozó dél-ázsiai vendégmunkásokat: több halálesetről számolnak be. Az esetek rámutatnak a migráns munkavállalók kiszolgáltatottságára és a munkavédelmi hiányosságokra az érintett régiókban. A fejlemény globálisan is felvet etikai és jogi kérdéseket a transznacionális foglalkoztatással kapcsolatban.',
    geo: '🌏 Ázsia'
  },
  'https://www.hcamag.com/asia/news/general/wisetech-founder-offered-5m-taxfree-pay': {
    title_hu: 'WiseTech-alapító 5 millió dolláros titkossági megállapodást kínált vádlójának',
    summary_hu: 'A WiseTech Global társalapítója, Richard White személyesen tárgyalt egy többmilliós titkossági megállapodásról egy vádlóval – miközben a cég tőzsdei vizsgálat alatt állt. Az eset komoly corporate governance és HR-etikai kérdéseket vet fel: ki tudott erről, és mikor? Az ügy példa arra, hogyan próbálják a csúcsvezetők néha az intézményi csatornákat elkerülve kezelni a személyes panaszokat.',
    geo: '🌏 Ázsia'
  },
  'https://hrzone.com/will-you-take-accountability/': {
    title_hu: 'Az AI nem vállal felelősséget – de te igen?',
    summary_hu: 'A HRZone cikke egy kulcskérdést vet fel: miközben az AI egyre több döntésben vesz részt, a felelősségvállalás továbbra is emberi feladat marad. A nyomás alatt helyes ítélőképesség és a megfelelő cselekvés olyan emberi készségek, amelyeket nem lehet gépre bízni. Ez a gondolat alapvetően átformálja, hogy mit kell elvárni a jövő HR-eseitől és vezetőitől.',
    geo: '🇬🇧 UK'
  },
  'https://www.personalwirtschaft.de/news/allgemein/wer-ist-die-neue-personalchefin': {
    title_hu: 'Ki lesz az EnBW új HR-igazgatója? Kineveztek egy utódot Colette Rückert-Hennen helyére',
    summary_hu: 'Az EnBW energiavállalatnál Colette Rückert-Hennen augusztusban vonul nyugdíjba – és már megnevezték az utódját. A személyi változás a német energiaszektor HR-szintű átalakulásának egyik látható jele. A kinevezés részletei és az új HR-igazgató profilja a Personalwirtschaft cikkében olvasható.',
    geo: '🇩🇪 Németország'
  },
  'https://www.personalwirtschaft.de/themen/kuenstliche-intelligenz/82-prozent-fueh': {
    title_hu: '82% biztos benne: a jövőben a mesterséges intelligencia hozza a döntéseket',
    summary_hu: 'Egy friss német kutatás szerint a felsővezetők 82%-a meg van győződve arról, hogy a döntéseket a jövőben AI-rendszerek fogják meghozni. Ez nem elriasztó forgatókönyv számukra – de komoly kérdéseket vet fel a vezetői szerep, a felelősség és a szervezeti kultúra átalakulásáról. A HR-szakmának most kell föltennie: hogyan készíti fel a szervezet az embereit erre az átmenetre?',
    geo: '🇩🇪 Németország'
  },
  'https://www.personalwirtschaft.de/themen/kuenstliche-intelligenz/team-human-x-ai': {
    title_hu: 'Human x AI csapat: hogyan gondoljuk újra a vezetést a mesterséges intelligencia korában?',
    summary_hu: 'A "Team Human x AI" megközelítés nem az emberek vs. gépek harcáról szól, hanem arról, hogyan hozhat a kettő együtt jobb döntéseket és erősebb tanulási kultúrát. A cikk konkrét ajánlásokat ad HR-es és vezető szakembereknek arra, hogyan vezessék be az AI-t úgy, hogy az valóban emberi szinergiát erősítsen. A fókusz: nem az eszközök, hanem a kapcsolatok és a bizalom.',
    geo: '🇩🇪 Németország'
  },
  'https://www.personalwirtschaft.de/news/hr-organisation/new-work-2-0-wie-veraende': {
    title_hu: 'New Work 2.0: hogyan változik a fogalom a visszatérési hullám és az AI korszakában?',
    summary_hu: 'A New Work fogalma – amely korábban elsősorban rugalmasságot és önmegvalósítást jelentett – most mélyebb átalakuláson megy keresztül. Az irodába való visszatérési nyomás, az AI integrációja és a generációs különbségek együttesen formálják át a "vonzó munkahely" fogalmát. A cikk azt vizsgálja, mit jelent New Work 2.0 egy olyan munkáltatónak, aki valóban vonzó akar maradni.',
    geo: '🇩🇪 Németország'
  },
  'https://www.parlonsrh.com/lexperience-collaborateur-a-lheure-de-leconomie-de-la-': {
    title_hu: 'Munkavállalói élmény a tudásgazdaságban: töltsd ki a Parlons RH felmérést',
    summary_hu: 'A Parlons RH elindítja 9. éves munkavállalói élmény barométerét, amely a tudásgazdaság kihívásaira fókuszál. A 7 perces felmérés eredményei betekintést adnak a francia és európai HR-trendekbe. Aki részt vesz, hozzájárul ahhoz az adatbázishoz, amelyből a terület legjobb elemzései születnek.',
    geo: '🇫🇷 Franciaország'
  },
  'https://www.y2y.hu/blog/hogy-fogjuk-megoldani-a-back-sittinget-es-foleg-ki': {
    title_hu: 'Hogy fogjuk megoldani a back-sittinget? – és főleg ki fogja?',
    summary_hu: 'Dorka Nagy-Józsa legújabb Y2Y blogbejegyzésében a "back-sitting" jelenséget boncolgatja – azt a szituációt, amikor mindenki hallott róla, hogy a menedzsment közelebb akar ülni a csapathoz, de senki sem tudja, ki és hogyan fogja ezt valójában megvalósítani. Az írás provokatív kérdéseket tesz fel arról, kinek a feladata a fizikai jelenlét és a csapatkohézió összehangolása a hibrid munkakörnyezetben.',
    geo: '🇭🇺 Magyar'
  }
};

const now = new Date().toISOString();

// Filter and enrich new articles
const newArticles = raw.articles
  .filter(a => !SKIP_URLS.includes(a.url))
  .map(a => {
    // Find matching summary by URL prefix
    let matched = null;
    for (const [key, val] of Object.entries(summaries)) {
      if (a.url.startsWith(key)) {
        matched = val;
        break;
      }
    }

    return {
      id: a.id,
      source: a.source,
      category: a.category || 'HR News',
      color: a.color,
      geo: matched ? matched.geo : a.geo,
      title: a.title,
      title_hu: matched ? matched.title_hu : a.title,
      url: a.url,
      published: a.published,
      addedAt: now,
      image: a.image || '',
      excerpt: a.excerpt || '',
      summary_hu: matched ? matched.summary_hu : ''
    };
  });

console.log('New articles to add:', newArticles.length);

// Check which have no summary
const noSummary = newArticles.filter(a => !a.summary_hu);
if (noSummary.length > 0) {
  console.log('WARNING - No summary for:');
  noSummary.forEach(a => console.log(' ', a.url));
}

// Combine: new articles at front + existing
let combined = [...newArticles, ...news.articles];

// Dedup by URL
const seen = new Set();
combined = combined.filter(a => seen.has(a.url) ? false : (seen.add(a.url), true));

// Remove articles older than 30 days
const cutoff = new Date();
cutoff.setDate(cutoff.getDate() - 30);
combined = combined.filter(a => {
  const d = new Date(a.addedAt || a.published);
  return d >= cutoff;
});

// Geo balance: max 8 per group
const USA_GROUP = ['🇺🇸 USA', '🇨🇦 Kanada'];
const EU_GROUP = ['🇪🇺 Európa', '🇬🇧 UK', '🇩🇪 Németország', '🇦🇹 Ausztria', '🇫🇷 Franciaország', '🇳🇱 Hollandia', '🇭🇺 Magyar'];
const GLOBAL_GROUP = ['🌍 Globális'];
const ASIA_GROUP = ['🌏 Ázsia'];
const MAX_PER_GROUP = 8;

function applyGeoLimit(articles, groupGeos, max) {
  const groupArticles = articles.filter(a => groupGeos.includes(a.geo));
  const otherArticles = articles.filter(a => !groupGeos.includes(a.geo));
  groupArticles.sort((a, b) => new Date(b.addedAt || b.published) - new Date(a.addedAt || a.published));
  const kept = groupArticles.slice(0, max);
  return [...otherArticles, ...kept];
}

combined = applyGeoLimit(combined, USA_GROUP, MAX_PER_GROUP);
combined = applyGeoLimit(combined, EU_GROUP, MAX_PER_GROUP);
combined = applyGeoLimit(combined, GLOBAL_GROUP, MAX_PER_GROUP);
combined = applyGeoLimit(combined, ASIA_GROUP, MAX_PER_GROUP);

// Sort by addedAt desc
combined.sort((a, b) => new Date(b.addedAt || b.published) - new Date(a.addedAt || a.published));

// Cap at 100
combined = combined.slice(0, 100);

// Ensure Y2Y article is always included (must have at least 1 within 7 days)
const hasY2Y = combined.some(a => a.source === 'Y2Y' && (new Date() - new Date(a.addedAt || a.published)) < 7 * 24 * 60 * 60 * 1000);
console.log('Has recent Y2Y article:', hasY2Y);
if (!hasY2Y) {
  const y2yArticle = newArticles.find(a => a.source === 'Y2Y');
  if (y2yArticle) {
    // Remove oldest EU-group article to make room
    const euGeos = EU_GROUP;
    const lastEUIdx = combined.map((a, i) => ({a, i})).reverse().find(({a}) => euGeos.includes(a.geo));
    if (lastEUIdx) {
      combined.splice(lastEUIdx.i, 1);
    }
    combined.push(y2yArticle);
    // Re-sort
    combined.sort((a, b) => new Date(b.addedAt || b.published) - new Date(a.addedAt || a.published));
    console.log('Force-added Y2Y article:', y2yArticle.title_hu);
  }
}

const result = {
  lastUpdated: now,
  articles: combined
};

fs.writeFileSync('public/data/news.json', JSON.stringify(result, null, 2));
console.log('Saved news.json with', combined.length, 'articles');

// Geo summary
const geoCount = {};
combined.forEach(a => { geoCount[a.geo] = (geoCount[a.geo] || 0) + 1; });
console.log('Geo distribution:', JSON.stringify(geoCount, null, 2));
