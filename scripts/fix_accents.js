// Fix missing Hungarian accents in batch-added articles
const fs = require('fs');

const FIXES = {
  'https://hrdailyadvisor.hci.org/2026/03/16/hrda-frankly-speaking-solve-for-uncertainty-not-complexity/': {
    title_hu: 'HR stratégia: adjunk választ a bizonytalanságra, ne a komplexitásra',
    summary_hu: 'Betsy Lopez-Riley HR-szakértő szerint a hagyományos HR-stratégiák azért vallanak kudarcot, mert a komplexitást próbálják megoldani – holott a bizonytalanságot kellene kezelni. A kulcs: azonosítsd, mi az, amit nem tudsz kontrollálni, és arra építsd a szervezeti rugalmasságot.'
  },
  'https://hrdailyadvisor.hci.org/2026/03/16/why-compliance-matters-in-global-hiring-and-international-workforce-expansion/': {
    title_hu: 'Miért kritikus a megfelelés a globális toborzásban?',
    summary_hu: 'A globális terjeszkedés lelkesedése gyorsan HR-asztalon köt ki – és ott derül ki, hogy a gyorsaság compliance-kockázatot teremt. A cikk bemutatja a nemzetközi munkaerőfelvétel jogi csapdait, és miért nem kezelhető a megfelelés utólag.'
  },
  'https://hrdailyadvisor.hci.org/2026/03/16/the-new-reality-of-worksite-enforcement-navigating-i-9-and-e-verify-shifts-in-2026-2/': {
    title_hu: 'I-9 és E-Verify 2026-ban: a munkahelyi ellenőrzések új valósága',
    summary_hu: 'A látható munkahelyi ellenőrzések visszatértek az USA-ban, és az I-9, E-Verify hibák komoly következményekkel járhatnak. A cikk gyakorlati útmutatót nyújt arra, hogyan készüljenek fel a HR-csapatok a szigorodó végrehajtási környezetre.'
  },
  'https://hrdailyadvisor.hci.org/2026/03/16/landmark-ai-rulings-will-have-effect-on-all-litigation/': {
    title_hu: 'Mérföldköves AI-döntések: ami a bíróságokon dől el, minden pert érint',
    summary_hu: 'Két szövetségi bíróság elsőként hozott döntést a generatív AI jogi következményeiről – és ezek a precedensek az összes jövőbeli pert alakítani fogják. A HR-eseknek most kell megérteniük, mit jelentenek ezek a döntések a munkahelyi AI-használatra nézve.'
  },
  'https://www.hrreporter.com/focus-areas/diversity/a-cure-to-what-ailed-us/394179': {
    title_hu: 'Kanadai munkáltatók kitartanak a DEI mellett az USA-s visszalépés ellenére',
    summary_hu: 'Kanadai munkáltatók körében egyre erősebb az álláspont: nem követik az USA DEI-visszalépési trendjét. Szakértők szerint a sokszínűségi kezdeményezések fenntartása egyszerre jogi kötelezettség és üzleti előny – de a kanadai jogszabályok pontos ismerete elengedhetetlen.'
  },
  'https://www.hrreporter.com/focus-areas/compensation-and-benefits/rising-fuel-costs-and-rto-should-employers-help-pay-for-the-commute/394178': {
    title_hu: 'Magas benzinár és irodai visszatérés: fizessen a munkáltató az ingázásra?',
    summary_hu: 'Az üzemanyagárak emelkedése extra nyomást helyez az irodába visszatérő kanadai munkavállalókra. Egyre több munkáltató mérlegeli, hogy ingázási juttatással, rugalmas munkaidővel vagy hibrid modellel kompenzálja a megnövekedett költségeket.'
  },
  'https://www.hrreporter.com/focus-areas/hr-technology/can-green-employers-justify-the-use-of-ai/394177': {
    title_hu: 'Zöld cégek és AI: hogyan egyeztethető össze a két imázs?',
    summary_hu: 'Az adatközpontok és AI-eszközök ökológiai lábnyoma egyre nehezebben egyeztethető össze a fenntarthatósági elköteleződésekkel. A kanadai munkáltatóknak transzparensen kell kommunikálniuk, hogyan mérik és kompenzálják az AI-használat környezeti hatásait.'
  },
  'https://www.hrreporter.com/focus-areas/recruitment-and-staffing/temporary-foreign-worker-program-ottawa-introduces-changes-for-certain-regions/394176': {
    title_hu: 'Kanada módosítja az idénymunkás-programot bizonyos régiókban',
    summary_hu: 'Ottawa ideiglenes intézkedéseket vezet be: egyes régiókban 10%-ról 15%-ra emeli az idénymunkások arányát. A változás a munkaerőhiánnyal küzdő szektorokat segíti, de fokozott HR-adminisztrációt igényel a munkáltatóktól.'
  },
  'https://www.hrreporter.com/focus-areas/payroll/province-pushes-for-retail-establishments-to-open-on-family-day-and-victoria-day/394175': {
    title_hu: 'Tartomány nyomást gyakorol az ünnepnapi nyitvatartásra Kanadában',
    summary_hu: 'Egy kanadai tartomány kormánya a kiskereskedelmi egységek Family Day és Victoria Day alatti nyitvatartását szorgalmazza. A döntés HR-kihívást jelent: a munkáltatóknak figyelniük kell az ünnepi munkavégzés szabályait és a munkavállalói jogokat.'
  },
  'https://www.hrreporter.com/opinion/canadian-hr-law/when-dismissal-costs-over-25-million/394174': {
    title_hu: 'Mikor kerül 2,5 millió dollárba egy felmondás?',
    summary_hu: 'Egy ontariói bírósági döntés drámai figyelmeztetés a munkáltatóknak: szabálytalan felmondás esetén a kártérítés elszállhat. Az ügy rámutat, mennyire kritikus a dokumentáció, a felmondási indokok pontossága és a HR-folyamatok jogszerűsége.'
  },
  'https://www.hrgrapevine.com/content/article/2026-03-16-what-756000-google-searches-reveal-about-candidate-anxiety': {
    title_hu: '756 ezer Google-keresés árulja el: így szoronganak az álláskeresők',
    summary_hu: 'Havonta 17 520-an keresnek rá, milyen kérdéseket tegyenek fel interjún – ez csak egy adatpont az álláskereső-szorongás mértékéből. A HR-eseknek érdemes átgondolni, hogyan teszik kevésbé stresszessé a felvételi folyamatot.'
  },
  'https://www.hrgrapevine.com/content/article/breathe-hr-2026-03-12-hrs-role-in-risk-assessments-why-its-time-to-take-a-second-look': {
    title_hu: 'Kockázatfelmérések és HR: ideje újra alaposan átnézni',
    summary_hu: 'A munkahelyi kockázatfelmérések ritkán kerülnek a prioritási lista elejére, de a jogi kötelezettség és a munkavállalói biztonság megköveteli a rendszeres felülvizsgálatot. A cikk segít azonosítani, mire érdemes most fókuszálni.'
  },
  'https://www.hrgrapevine.com/content/article/2026-03-16-government-pauses-plans-for-race-disability-pay-gap-lawsuits': {
    title_hu: 'A brit kormány felfüggesztette a faji és fogyatékossági bérszakadék elleni perek tervét',
    summary_hu: 'A brit miniszterek elhalasztották azt a jogszabályt, amely lehetővé tette volna a faji és fogyatékossági bérszakadék miatt indított pereket. A döntés vegyes fogadtatásra talált: a munkáltatók lélegzetet kapnak, a jogvédők kritizálják.'
  },
  'https://www.hrgrapevine.com/content/article/2026-03-16-nhs-staff-report-increasing-pressure-on-staffing-levels-wellbeing-engagement': {
    title_hu: 'NHS-felmérés: egyre több nyomás a dolgozókon – létszám, jóllét, elkötelezettség',
    summary_hu: 'Egy új NHS-felmérés aggasztó trendet mutat: a személyzeti nyomás, a jóllét romlása és a csökkenő elkötelezettség együtt jelent meg. A megállapítások az egészségügyi szektoron túl minden nagy szervezet HR-stratégiájának tanulságosak.'
  },
  'https://hr.asia/asia-pacific/china-accelerates-human%e2%80%91capital-investment-to-stabilise-employment-amid-automation-shift/': {
    title_hu: 'Kína felgyorsítja az emberi tőkébe való befektetést az automatizáció kezelésére',
    summary_hu: 'Kína ambiciózus munkaerő-átképzési programot indít, hogy az automatizáció okozta foglalkoztatási kihívásokat növekedési lehetőséggé alakítsa. Az idei kormányzati munkaterv az állások stabilitása és a munkáltatók támogatása köré épül.'
  },
  'https://hr.asia/asia-2/hong-kong-kicks-off-2026-gba-youth-employment-scheme-job-fair/': {
    title_hu: 'Hongkong elindítja a Nagy-Öböl Övezet ifjúsági foglalkoztatási programját',
    summary_hu: 'Hongkong Munkaügyi Minisztériuma elindítja a 2026-os GBA Ifjúsági Foglalkoztatási Program állásbörzéjét, amely a régión belüli mobilitást és a fiatalok elhelyezkedési esélyeit hivatott javítani.'
  },
  'https://www.hcamag.com/asia/specialisation/recruitment/employment-levels-in-singapore-dip-amid-geopolitical-tensions/568767': {
    title_hu: 'Szingapúrban csökkent a foglalkoztatás a geopolitikai feszültségek hatására',
    summary_hu: 'Szingapúr legfrissebb foglalkoztatási adatai geopolitikai hatásokat tükröznek: egyes kulcságazatokban negyedéves csökkenés látható. A HR-stratégusoknak figyelemmel kell kísérniük, hogyan gyűrűznek be a makrogazdasági kockázatok a munkaerőpiacra.'
  },
  'https://www.hcamag.com/asia/news/general/atlassians-ai-job-cuts-spark-warnings-of-a-chaos-tsunami-for-the-workforce/568758': {
    title_hu: 'Atlassian AI-alapú leépítése: figyelmeztető jel a munkaerőnek',
    summary_hu: 'Az Atlassian AI-indoklású létszámcsökkentése szakértői riasztásokat váltott ki: az „AI-vel helyettesítjük" narratíva terjed a technológiai szektorban. A HR-szakértők szerint a vállalatok felelőssége az átképzés és a humán értékek védelme.'
  },
  'https://www.hcamag.com/asia/news/general/is-ai-coming-for-your-job/568748': {
    title_hu: 'Jön az AI a munkáért? A válasz függ attól, hogy nő vagy férfi vagy',
    summary_hu: 'Egy kutatás szerint az AI által fenyegetett munkahelyek elosztása nem semleges nemi szempontból: egyes szektorokban a nők vannak nagyobb veszélynek kitéve. A HR-nek aktív szerepet kell vállalnia az érintett munkavállalók felkészítésében.'
  },
  'https://www.hcamag.com/asia/news/general/leave-requests-surge-how-can-hr-leaders-catch-up/568738': {
    title_hu: 'Robbanásszerű szabadságkérelem-növekedés – tart a HR lépést?',
    summary_hu: 'Egy friss jelentés szerint a szabadság-kezelési folyamatok elmaradnak a megnövekedett igénytől: a munkavállalók egyre több szabadságot vesznek ki, de a rendszerek és a HR-csapatok nem tartanak lépést. Digitalizáció és automatizálás lehet a megoldás.'
  },
  'https://www.hcamag.com/asia/news/general/how-to-avoid-being-ghosted-by-candidates-during-hiring/568744': {
    title_hu: 'Hogyan kerüljük el, hogy a jelöltek kísértetek legyenek a toborzásnál?',
    summary_hu: 'Kutatások szerint a munkakeresők negyede ghostolt már munkáltatót a toborzás során. A cikk konkrét lépéseket mutat be: gyors visszajelzés, átlátható folyamat és valódi kapcsolat a toborzóval – ezek csökkentik a lemorzsolódást.'
  },
  'https://www.hcamag.com/asia/news/general/malaysia-declares-additional-holiday-for-hari-raya-aidilfitri/568769': {
    title_hu: 'Malajzia plusz ünnepnapot hirdet Hari Raya Aidilfitri alkalmából',
    summary_hu: 'A malajziai kormány további ünnepnapot nyilvánított, ami a munkáltatók számára HR-adminisztrációs és bérszámfejtési feladatokat hoz. A lépés különösen fontos a nagyobb ünnepekre érzékeny iparágakban dolgozók szempontjából.'
  },
  'https://www.hcamag.com/asia/specialisation/employment-law/bad-weather-safety-by-design-in-hong-kong/568705': {
    title_hu: 'Extrém időjárás és munkahelyi biztonság Hongkongban',
    summary_hu: 'Hongkongi munkáltatók útmutatója a rossz időjárás esetén alkalmazandó biztonsági protokollokhoz. A cikk jogszabályi hátteret és gyakorlati lépéseket mutat be, amelyeket a HR-csapatoknak előre el kell készíteniük.'
  },
  'https://www.hcamag.com/asia/news/general/meta-rumoured-to-be-cutting-20-of-workforce/568698': {
    title_hu: 'Kiszivárgott: a Meta állítólag a dolgozók 20%-át bocsátja el',
    summary_hu: 'Belső értesülések szerint a Meta munkaerőjének 20%-ának leépítését tervezi, miközben az AI-fejlesztésekbe jelentősen növeli a befektetéseit. Az eset ismét ráirányítja a figyelmet arra, hogyan kezeljék a vállalatok az AI-vezérelt átszervezéseket.'
  },
  'https://www.hcamag.com/asia/news/general/too-much-ai-causing-brain-fry-among-employees/568617': {
    title_hu: 'Túl sok AI – kognitív túlterhelés fenyegeti a munkavállalókat',
    summary_hu: 'Egy új kutatás szerint az AI-eszközök túlzott használata kognitív túlterhelést, döntési fáradtságot és kiégést okoz. A HR-nek aktív szerepe van abban, hogy az AI-bevezetés ne emberi kapacitás-elvárásokba ütközzön.'
  },
  'https://www.hcamag.com/asia/news/general/ai-creating-more-jobs-than-cutting-them-study-says/568608': {
    title_hu: 'Globális kutatás: az AI több munkát teremt, mint amennyit elvesz',
    summary_hu: 'Egy globális kutatás meglepő következtetésre jut: az automatizáció összességében nettó munkahelyteremtő hatású, de az átmenet fájdalmas lehet az érintett szektorokban. A HR-szakembereknek kulcsszerepük van az átállás menedzselésében.'
  },
  'https://www.personalwirtschaft.de/news/personalentwicklung/spritpreise-steigen-kluge-arbeitgeber-reagieren-201773/': {
    title_hu: 'Magas benzinár: okos munkáltatók most cselekednek',
    summary_hu: 'A rekordmagas üzemanyagárak a munkáltatók számára lehetőséget teremtenek a megbecsülés bizonyítására: rugalmas munkavégzés, ingázási támogatás vagy közlekedési juttatás mind erős lojalitásépítő eszköz lehet.'
  },
  'https://www.personalwirtschaft.de/news/personalentwicklung/employee-wellbeing-kostenguenstig-umsetzen-das-kann-hr-tun-201707/': {
    title_hu: 'Olcsón is lehet jóllét: mit tehet a HR szűkös büdzsével?',
    summary_hu: 'Leépítések, megszorítások, tartós krízis – de a munkavállalói jóllétről mégsem lemondani kell, hanem kreatívan gondolkodni. A cikk bizonyítja, hogy rugalmasság, elismerés és közösség kis befektetéssel is nagy hatást érhet el.'
  },
  'https://www.personalwirtschaft.de/news/sponsored/fehlzeiten-steuern-so-wird-aus-kosten-wieder-wertschoepfung-201287/': {
    title_hu: 'Hiányzások kezelése: hogyan válik a költségből értékteremtés?',
    summary_hu: 'A munkahelyi hiányzás nemcsak HR-probléma, hanem stratégiai és ESG-kérdés is – az adatokra épülő, proaktív megközelítés csökkenti a hiányzásokat és növeli a munkavállalói elkötelezettséget. A cikk módszereket mutat be a megelőző intézkedésekhez.'
  }
};

const data = JSON.parse(fs.readFileSync('public/data/news.json', 'utf8'));
let fixed = 0;
data.articles = data.articles.map(a => {
  if (FIXES[a.url]) {
    Object.assign(a, FIXES[a.url]);
    fixed++;
  }
  return a;
});
fs.writeFileSync('public/data/news.json', JSON.stringify(data, null, 2));
console.log(`✅ ${fixed} cikk javítva.`);
