const fs = require('fs');
const path = require('path');
const now = new Date().toISOString();

const newArticles = [
  {
    id: Date.now() + '_0001',
    source: 'HRMorning', category: 'HR News', color: '#0284c7', geo: '🇺🇸 USA',
    title: 'Jury Awards $22.5M Verdict in Pregnancy Accommodation Lawsuit',
    title_hu: '22,5 millió dolláros ítélet: végzetes következménye lett a terhesség miatti home office megtagadásnak',
    url: 'https://www.hrmorning.com/news/remote-work-denied-pregnancy-accommodation/',
    published: '2026-03-24T12:20:00.000Z', addedAt: now,
    image: 'https://www.hrmorning.com/wp-content/uploads/2024/11/EmploymentLawConsiderationsForRemoteWork.png',
    excerpt: 'A remote work accommodation dispute turned into a wrongful death case with eight-figure liability.',
    summary_hu: 'Egy ohiói esküdtszék 22,5 millió dolláros kártérítést ítélt meg egy munkavállalónak, akinek a munkáltató megtagadta az otthoni munkavégzést magas kockázatú terhesség idején – a csecsemő ezt követően meghalt. A bíróság a munkaadót 90%-ban felelősnek találta. Az eset drámai emlékeztető: a terhességi kérelmek elutasítása nemcsak etikailag, hanem jogi szempontból is végzetes következményekkel járhat.'
  },
  {
    id: Date.now() + '_0002',
    source: 'HRMorning', category: 'HR News', color: '#0284c7', geo: '🇺🇸 USA',
    title: 'No OT Pay Despite Misclassification: Fifth Circuit Upholds Jury Verdict',
    title_hu: 'Helytelen besorolás, mégis nulla túlóradíj – megerősítette az ötödik körzetbíróság',
    url: 'https://www.hrmorning.com/news/overtime-pay-texas-farm-bureau/',
    published: '2026-03-24T10:49:00.000Z', addedAt: now,
    image: 'https://www.hrmorning.com/wp-content/uploads/2025/06/HRM_Blog_Overtime_Pay.webp',
    excerpt: 'The Fifth Circuit recently upheld a jury verdict denying overtime pay even after a court found the worker had been misclassified as an independent contractor.',
    summary_hu: 'Az Ötödik Körzetbíróság helybenhagyta azt az esküdtszéki döntést, amely megtagadta a túlóradíjat egy helytelenül független vállalkozóként besorolt munkavállalótól. Az FLSA alapján a cég nem lett felelős, mert nem tudott és nem is kellett tudnia a túlóráról. Az ítélet egyértelművé teszi: a helytelen besorolás önmagában nem alapoz meg automatikusan túlóraigényt.'
  },
  {
    id: Date.now() + '_0003',
    source: 'HRMorning', category: 'HR News', color: '#0284c7', geo: '🇺🇸 USA',
    title: 'What to Do With Mastermind Time | 2-Minute Video',
    title_hu: 'Mi az a Mastermind Time – és miért van szüksége rá minden HR-vezetőnek?',
    url: 'https://www.hrmorning.com/articles/mastermind-time-for-problem-solving/',
    published: '2026-03-24T10:09:00.000Z', addedAt: now,
    image: 'https://www.youtube.com/embed/dH6UcCk_kB8',
    excerpt: 'As an HR leader, you always face decisions, challenges and opportunities. The Mastermind Time approach helps you tackle complex problems collaboratively.',
    summary_hu: 'A HR-vezető munkájában nincs megálló: döntések, kihívások, emberi igények egymás után. A Mastermind Time egy strukturált közös gondolkodási módszer, amellyel a vezetők összetett problémákat oldanak meg egymástól tanulva. Az epizód bemutatja, hogyan alkalmazható ez a megközelítés hatékonyan a mindennapi HR-munkában.'
  },
  {
    id: Date.now() + '_0004',
    source: 'Flex Index', category: 'Flex & Remote Work', color: '#6d28d9', geo: '🇺🇸 USA',
    title: 'Why Some Workers Are Ditching 9-to-5 Schedules',
    title_hu: 'Vége a 9-5-nek? Egyre többen mondanak nemet a hagyományos munkaidőre',
    url: 'https://flexindex.substack.com/p/why-some-workers-are-ditching-9-to',
    published: '2026-03-24T13:05:29.000Z', addedAt: now,
    image: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3ebbfdde-c22b-42cf-a4cf-5fa4d6a1cbb1_970x647.jpeg',
    excerpt: 'Plus, new NBER study debunks claims that remote work fuels loneliness and isolation',
    summary_hu: 'Egy friss NBER-kutatás megcáfolja azt az érvelést, hogy a rugalmas és távoli munkavégzés fokozza a magányt és az elszigeteltséget. Egyre több munkavállaló hagyja el a fix munkaidőt, mert a rugalmasság egyszerre növeli a produktivitást és az elégedettséget. A Flex Index összefoglalója rámutat a mögöttes trendekre és a munkáltatókra háruló következményekre.'
  },
  {
    id: Date.now() + '_0005',
    source: 'HR Executive', category: 'HR Strategy', color: '#7c3aed', geo: '🇺🇸 USA',
    title: "New state regs are a 'blueprint' for discriminatory AI claims",
    title_hu: 'Az illinoisi AI-törvény mintát adhat a diszkriminációs perek indításához',
    url: 'https://hrexecutive.com/new-state-regs-are-a-blueprint-for-discriminatory-ai-claims/',
    published: '2026-03-24T12:30:10.000Z', addedAt: now,
    image: 'https://hrexecutive.com/wp-content/uploads/2019/05/Noncompete-art.jpg',
    excerpt: "Since Illinois' Limit Predictive Analytics Use Act took effect, workplace AI risk is no longer a theoretical compliance concern. It's a live litigation issue.",
    summary_hu: 'Az illinoisi Limit Predictive Analytics Use Act hatályba lépett, és a munkahelyi AI-alkalmazás jogi kockázata valósággá vált: a munkavállalók polgári pert indíthatnak diszkriminatív AI-döntések ellen. Illinois nem egyedi eset, hanem az egyre sűrűbb szövetségi szabályozási háló egyik legláthatóbb csomópontja. A munkáltatóknak érdemes felkészülniük az elszámoltathatósági elvárások erősödésére.'
  },
  {
    id: Date.now() + '_0006',
    source: 'HR Executive', category: 'HR Strategy', color: '#7c3aed', geo: '🇺🇸 USA',
    title: 'Why talent analytics lose accuracy after day one: The post-hire blind spot',
    title_hu: 'A tehetségelemzés vakfoltja: mi történik a felvétel napja után?',
    url: 'https://hrexecutive.com/why-talent-analytics-lose-accuracy-after-day-one-the-post-hire-blind-spot/',
    published: '2026-03-24T12:15:52.000Z', addedAt: now,
    image: 'https://hrexecutive.com/wp-content/uploads/AdobeStock_305963800.jpg',
    excerpt: 'Hiring the right person, and the right outcomes follow. The science behind selection is sound. What happens next is not measured at all.',
    summary_hu: 'A kiválasztási folyamat mögött komoly tudomány áll, de a legtöbb szervezet a felvétel után leáll a mérésekkel. A cikk rámutat, hogy a tehetségelemző rendszerek pontossága drámaian csökken az onboarding után, mert a munkavállalói teljesítmény és fejlődés adatai szinte nem kerülnek visszacsatolásba. Ez a felvétel utáni vakfolt komoly üzleti kockázatot jelent.'
  },
  {
    id: Date.now() + '_0007',
    source: 'HR Executive', category: 'HR Strategy', color: '#7c3aed', geo: '🇺🇸 USA',
    title: 'DOL formally scraps Biden-era fiduciary rule',
    title_hu: 'Az amerikai Munkaügyi Minisztérium visszavonta a Biden-kori gondnoksági szabályt',
    url: 'https://hrexecutive.com/dol-formally-scraps-biden-era-fiduciary-rule/',
    published: '2026-03-24T11:45:47.000Z', addedAt: now,
    image: 'https://hrexecutive.com/wp-content/uploads/AdobeStock_471668151.jpg',
    excerpt: "Labor said it has restored ERISA's five-part test for determining who is an investment advice fiduciary.",
    summary_hu: 'Az amerikai Munkaügyi Minisztérium hivatalosan visszaállította az ERISA-féle ötlépéses tesztet a befektetési tanácsadói státusz meghatározásához. A Biden-kormányzat alatt bevezetett, szigorúbb gondnoksági szabálynak vége, ami jelentős változást hozhat a munkavállalói nyugdíjmegtakarításokat érintő tanácsadási gyakorlatban.'
  },
  {
    id: Date.now() + '_0008',
    source: 'HR Executive', category: 'HR Strategy', color: '#7c3aed', geo: '🇺🇸 USA',
    title: 'Why internal mobility is now a business imperative for HR',
    title_hu: 'Belső mobilitás: miért lett stratégiai prioritás a szervezeten belüli karrierépítés?',
    url: 'https://hrexecutive.com/why-internal-mobility-is-now-a-business-imperative-for-hr/',
    published: '2026-03-24T11:30:24.000Z', addedAt: now,
    image: 'https://hrexecutive.com/wp-content/uploads/2015/07/Is-This-Next-Generation-Software-GettyImages-1041244370-700.jpg',
    excerpt: 'HR leader Aly Sparks on how internal mobility helps close skills gaps, support blended workforces and keep talent moves human in an AI era.',
    summary_hu: 'Aly Sparks HR-vezető szerint a belső mobilitás már nem csupán HR-fogalom, hanem üzleti szükségszerűség: segít lefedni a készséghiányokat, fenntartani a vegyes összetételű munkaerőt, és megtartani a tehetségeket az AI-korszakban. A szervezetek, amelyek befektetnek a belső karrierlehetőségekbe, hosszabb távon versenyképesebb és megtartóbb munkahelyek maradnak.'
  },
  {
    id: Date.now() + '_0009',
    source: 'HR Executive', category: 'HR Strategy', color: '#7c3aed', geo: '🇺🇸 USA',
    title: 'How executive pay parity is redefining women in leadership',
    title_hu: 'Szűkül a bérrés a felsővezetői szinten – mit jelent ez a nők karrierjére?',
    url: 'https://hrexecutive.com/how-executive-pay-parity-is-redefining-women-in-leadership/',
    published: '2026-03-24T11:15:18.000Z', addedAt: now,
    image: 'https://hrexecutive.com/wp-content/uploads/2022/09/Pay-equity.-Adobe.-9.22.22.jpeg',
    excerpt: 'New research suggests the pay gap between men and women at the executive level is narrowing.',
    summary_hu: 'Új kutatás szerint a felsővezetői szinten egyre közelebb kerül egymáshoz a férfiak és nők fizetése. Ez nem csupán szimbolikus előrelépés: a béresélyesség valódi belépési jeggyé válik a nők számára a hosszú távú vezető szerepekhez. A tendencia azt jelzi, hogy a tudatos bérezési politika szervesen összefügg a nők megtartásával a legfelső szinteken.'
  },
  {
    id: Date.now() + '_0010',
    source: 'HR Executive', category: 'HR Strategy', color: '#7c3aed', geo: '🌍 Globális',
    title: "Mental health: 1 in 3 employees are 'merely surviving'",
    title_hu: 'Mentális egészség: minden harmadik munkavállaló csak vegetál, nem virágzik',
    url: 'https://hrexecutive.com/mental-health-1-in-3-employees-are-merely-surviving/',
    published: '2026-03-24T11:15:12.000Z', addedAt: now,
    image: 'https://hrexecutive.com/wp-content/uploads/SOWMH-graphic.png',
    excerpt: "Lyra Health's sixth annual report finds that employees worldwide are struggling with compounding mental health pressures.",
    summary_hu: 'A Lyra Health hatodik éves jelentése szerint a világ munkavállalóinak egyharmada csupán megél – nem fejlődik, nem virágzik. A halmozódó mentálhigiénés nyomás globális jelenség, amellyel a munkáltatók egyre kevésbé engedhetik meg maguknak a nem törődést. A szervezetek felelőssége kiterjed a lelki egészség aktív támogatására, nem csupán a kritikus esetek kezelésére.'
  },
  {
    id: Date.now() + '_0011',
    source: 'HR Daily Advisor', category: 'HR News', color: '#0369a1', geo: '🇺🇸 USA',
    title: 'Are We There Yet? Reviewing Impasse in Union Negotiations',
    title_hu: 'Holtpont a szakszervezeti tárgyalásokon – mikor mondható ki valóban az impasse?',
    url: 'https://hrdailyadvisor.hci.org/2026/03/24/are-we-there-yet-reviewing-impasse-in-union-negotiations/',
    published: '2026-03-24T09:00:00.000Z', addedAt: now,
    image: 'https://hrdailyadvisor.hci.org/app/uploads/sites/3/2021/08/unionizing.jpg',
    excerpt: 'Declaring impasse during collective bargaining can be an important, consequential decision for an employer.',
    summary_hu: 'A kollektív tárgyalásokon a holtpont kinyilvánítása komoly jogi következményekkel jár: ha jogszerű, a munkáltató egyoldalúan bevezetheti az utolsó ajánlatát – ha nem az, az NLRA megsértésével vádolható. Egy friss szövetségi döntés részletesen elemzi, mikor tekinthető valódi tárgyalási holtpontnak egy helyzet. A HR-csapatoknak érdemes ezzel a határvonallal tisztában lenniük.'
  },
  {
    id: Date.now() + '_0012',
    source: 'HR Reporter', category: 'HR News', color: '#d9000d', geo: '🇨🇦 Kanada',
    title: 'Happiness is way down in Canada – especially among youth – so how can HR help?',
    title_hu: 'Zuhan a boldogság Kanadában – és a HR-nek megvan az eszköztára a változáshoz',
    url: 'https://www.hrreporter.com/focus-areas/culture-and-engagement/happiness-is-way-down-in-canada-especially-among-youth-so-how-can-hr-help/394210',
    published: '2026-03-23T21:56:59.000Z', addedAt: now,
    image: 'https://cdn-res.keymedia.com/cms/images/chrr/stac_639099000059384547.png',
    excerpt: "Along with all that bad news, there's the good news: we know a lot about how to make lives better.",
    summary_hu: 'Kanada a World Happiness Report legfrissebb adatai alapján jelentős visszaesést mutat, különösen a fiatalabb korosztályban. A kutatók kiemelik: sokat tudunk arról, mi teszi az életeket jobbá – és ebben a munkáltatóknak kulcsszerepük van. A cikk konkrét lépéseket ismertet, amelyekkel a HR hozzájárulhat a munkavállalói jóllét javításához.'
  },
  {
    id: Date.now() + '_0013',
    source: 'HR Reporter', category: 'HR News', color: '#d9000d', geo: '🇨🇦 Kanada',
    title: "'Nothing's neutral:' How 2 Canadian employers reframe DEI as equity and belonging",
    title_hu: 'Semmi sem semleges: két kanadai munkáltató a DEI-t méltányossággá és befogadássá alakítja',
    url: 'https://www.hrreporter.com/focus-areas/diversity/nothings-neutral-how-2-canadian-employers-reframe-dei-as-equity-and-belonging/394209',
    published: '2026-03-23T20:00:58.000Z', addedAt: now,
    image: 'https://cdn-res.keymedia.com/cms/images/chrr/sara_639099538647156178.jpg',
    excerpt: 'George Brown Polytechnic, Thales Canada centre strategies on access, accountability and lived experience',
    summary_hu: 'A George Brown Polytechnic és a Thales Canada szerint a sokszínűség, egyenlőség és befogadás nem elvont cél, hanem konkrét hozzáférési és elszámoltathatósági kérdés. Mindkét szervezet a személyes tapasztalatra alapozva építette fel programjait, elkerülve a jelszavak csapdáját. Az általuk alkalmazott keretrendszer más munkáltatóknak is adaptálható modellt kínál.'
  },
  {
    id: Date.now() + '_0014',
    source: 'Personnel Today', category: 'HR News', color: '#1e40af', geo: '🇬🇧 UK',
    title: 'Reforms to GMC to simplify striking off discriminatory doctors',
    title_hu: 'Brit reform: könnyebb lesz kizárni a diszkriminatív orvosokat az Orvosi Kamarából',
    url: 'https://www.personneltoday.com/hr/reforms-to-gmc-to-simplify-striking-off-discriminatory-doctors/',
    published: '2026-03-24T10:40:46.000Z', addedAt: now,
    image: 'https://www.personneltoday.com/wp-content/uploads/sites/8/2026/03/GMC-reforms-discrimination-doctors-3CEC16R.jpg',
    excerpt: 'Wes Streeting announces reforms to make it easier for General Medical Council to discipline doctors who use racist and discriminatory language.',
    summary_hu: 'Wes Streeting egészségügyi miniszter reformokat jelentett be, amelyek egyszerűsítik az Általános Orvosi Tanács eljárásait rasszista vagy diszkriminatív orvosok kizárására. A változtatások célja, hogy az NHS-ben gyorsabban és hatékonyabban lehessen fellépni az elfogadhatatlan viselkedéssel szemben. A lépés fontos jelzés a befogadóbb egészségügyi munkakörnyezet kialakítása felé.'
  },
  {
    id: Date.now() + '_0015',
    source: 'Personnel Today', category: 'HR News', color: '#1e40af', geo: '🇬🇧 UK',
    title: 'Statutory sick pay and the future of payroll (Thursday webinar)',
    title_hu: 'Törvényes betegszabadság és bérszámfejtés jövője – brit webinár csütörtökön',
    url: 'https://www.personneltoday.com/hr/statutory-sick-pay-and-the-future-of-payroll-webinar-ssp/',
    published: '2026-03-24T09:20:01.000Z', addedAt: now,
    image: 'https://www.personneltoday.com/wp-content/uploads/sites/8/2026/02/statutory-sick-pay-ssp-webinar-payroll-remote-shutterstock_2375773623-1200x675-1.png',
    excerpt: 'Register now for our webinar exploring what SSP changes mean for compliance, operational stability and employee trust.',
    summary_hu: 'Március 26-án webinár foglalkozik az SSP (törvényes betegszabadság) brit változásaival és azok bérszámfejtési, megfelelési, valamint munkavállalói bizalmat érintő következményeivel. Az esemény praktikus útmutatást ad HR- és bérszámfejtési szakembereknek a közelgő módosításokra való felkészüléshez.'
  },
  {
    id: Date.now() + '_0016',
    source: 'Personnel Today', category: 'HR News', color: '#1e40af', geo: '🇬🇧 UK',
    title: '10 employment law changes in April 2026',
    title_hu: '10 munkajogi változás 2026 áprilisában – mit kell tudni a brit HR-eseknek?',
    url: 'https://www.personneltoday.com/hr/10-employment-law-changes-in-april-2026/',
    published: '2026-03-24T09:05:24.000Z', addedAt: now,
    image: 'https://www.personneltoday.com/wp-content/uploads/sites/8/2026/03/employment-law-changes-April-2026-shutterstock_2745475235.png',
    excerpt: 'April 2026 brings new measures from the Employment Rights Act as well as familiar law changes.',
    summary_hu: '2026 áprilisában lép hatályba az Employment Rights Act számos rendelkezése, amelyek átírják a brit foglalkoztatási szabályokat. Rob Moss cikke összefoglalja a tíz legfontosabb változást, amelyekre a HR-csapatoknak már most fel kell készülniük. A módosítások érintik a munkaidőt, a felmondási szabályokat és más alapvető munkavállalói jogokat.'
  },
  {
    id: Date.now() + '_0017',
    source: 'Personnel Today', category: 'HR News', color: '#1e40af', geo: '🇬🇧 UK',
    title: "Workplace cancer 'taboo' widespread as workers fear to open up",
    title_hu: 'Tabu a rák a munkahelyen – a dolgozók csupán 8%-a merne szólni a tünetekről',
    url: 'https://www.personneltoday.com/hr/workplace-cancer-taboo-widespread-as-workers-fear-to-open-up/',
    published: '2026-03-24T00:00:43.000Z', addedAt: now,
    image: 'https://www.personneltoday.com/wp-content/uploads/sites/8/2026/03/Cancer_workplace_2513084943.jpg',
    excerpt: 'Just 8% of workers would feel comfortable talking to their employer if they had a health symptom that was potentially serious.',
    summary_hu: 'Új kutatás szerint a brit munkavállalók mindössze 8%-a érezné biztonságban magát, ha rákra utaló tüneteiről kellene beszélnie a munkáltatójával. A munkahelyi egészségügyi tabu széles körben jelen van, és akadályozza a korai diagnosztizálást. A HR-eseknek kulcsszerepe van egy nyíltabb, befogadóbb egészségügyi kultúra megteremtésében.'
  },
  {
    id: Date.now() + '_0018',
    source: 'Personnel Today', category: 'HR News', color: '#1e40af', geo: '🇬🇧 UK',
    title: 'Half of lone workers avoid tasks or locations over safety fears',
    title_hu: 'Az egyedül dolgozók fele kerül feladatokat és helyszíneket biztonsági félelmek miatt',
    url: 'https://www.personneltoday.com/hr/half-of-lone-workers-avoid-tasks-or-locations-over-safety-fears/',
    published: '2026-03-24T00:00:27.000Z', addedAt: now,
    image: 'https://www.personneltoday.com/wp-content/uploads/sites/8/2026/03/Lone_worker_Shutterstock_-2681656879.jpg',
    excerpt: 'Half of lone workers have avoided carrying out tasks or going to locations for work because of feeling unsafe.',
    summary_hu: 'Egy friss brit felmérés szerint a magányos munkakörülmények között dolgozók 50%-a már visszautasított vagy elkerült feladatokat, mert nem érezte magát biztonságban. Ez komoly termelékenységi és jogi kockázatot jelent a munkáltatók számára. A munkavédelmi szakemberek szerint az egyedül dolgozók biztonsági protokolljait sürgősen felül kell vizsgálni.'
  },
  {
    id: Date.now() + '_0019',
    source: 'Personnel Today', category: 'HR News', color: '#1e40af', geo: '🇬🇧 UK',
    title: 'Fair Work Agency: Advisory board appointees announced',
    title_hu: 'Kinevezték a brit Fair Work Agency tanácsadó testületének tagjait',
    url: 'https://www.personneltoday.com/hr/fair-work-agency-advisory-board-appointees-announced/',
    published: '2026-03-24T00:00:20.000Z', addedAt: now,
    image: 'https://www.personneltoday.com/wp-content/uploads/sites/8/2026/03/Neil-Carberry-chief-executive-REC.jpg',
    excerpt: 'Ministers announce appointments to Fair Work Agency advisory board spanning employers, unions and independent experts.',
    summary_hu: 'A brit kormány bejelentette a Fair Work Agency tanácsadó testületének tagjait, akik között munkáltatók, szakszervezetek és független szakértők egyaránt helyet kaptak. Az ügynökség a foglalkoztatási jogok betartatásának új intézményi keretét jelenti. A testület összetétele a széles körű érdekegyensúlyozás szándékát tükrözi.'
  },
  {
    id: Date.now() + '_0020',
    source: 'HR Grapevine', category: 'HR News', color: '#7c3aed', geo: '🇬🇧 UK',
    title: "Gender identity | From masking to meaning: Rethinking what 'normal' means in the workplace",
    title_hu: 'Az álcázástól az autenticitásig: mit jelent a nemidentitás a munkahelyen?',
    url: 'https://www.hrgrapevine.com/content/article/2026-03-24-from-masking-to-meaning-rethinking-what-normal-means-in-the-workplace',
    published: '2026-03-24T10:15:00.000Z', addedAt: now,
    image: 'https://www.executivegrapevine.com/uploads/articles/interview-british-safety-council-thumb.jpg',
    excerpt: 'For HR professional Rachael Haynes, it was the change in her professional email address that marked the end of living partially hidden.',
    summary_hu: 'Rachael Haynes HR-szakember személyes történetén keresztül tárja fel, mit jelent valódi önmagaként dolgozni egy befogadó szervezetben. A cikk arra hív, hogy a HR gondolja újra, mit jelent a normális a munkahelyen, és hogyan teremthet teret a valódi jelenléthez. Az autenticitás nem luxus, hanem komoly megtartóerő.'
  },
  {
    id: Date.now() + '_0021',
    source: 'HR Grapevine', category: 'HR News', color: '#7c3aed', geo: '🌍 Globális',
    title: "'Old inequalities' | The rise of the AI trainer - and the rise of the AI trainer pay gap",
    title_hu: 'Az AI-oktatók felemelkedése – és a velük járó újfajta bérrés',
    url: 'https://www.hrgrapevine.com/content/article/2026-03-23-the-rise-of-the-ai-trainer-the-rise-of-the-ai-trainer-pay-gap',
    published: '2026-03-24T09:00:00.000Z', addedAt: now,
    image: 'https://www.executivegrapevine.com/uploads/articles/thumb-the-rise-of-the-ai-trainer-and-the-rise-of-the-ai-trainer.jpg',
    excerpt: 'Research from Deel shows a 283% surge in hiring for general AI trainer roles, but also the emergence of significant pay disparities.',
    summary_hu: 'A Deel kutatása szerint az AI-oktatói állások száma 283%-kal nőtt, de ezzel párhuzamosan egy új béraránytalanság is megjelent: a mesterséges intelligencia betanításában dolgozó nők szisztematikusan kevesebbet keresnek a férfiaknál. A régi egyenlőtlenségek új formában térnek vissza – ez fontos figyelmeztetés mindazoknak, akik az AI munkaerőpiaci hatásait vizsgálják.'
  },
  {
    id: Date.now() + '_0022',
    source: 'HR Grapevine', category: 'HR News', color: '#7c3aed', geo: '🇬🇧 UK',
    title: "'Left behind' | Care leavers three times more likely to be 'locked out' of work opportunities",
    title_hu: 'Háromszoros hátrány: az állami gondozásból kikerülő fiatalok kiszorulnak a munkaerőpiacról',
    url: 'https://www.hrgrapevine.com/content/article/2026-03-24-care-experienced-young-people-locked-out-of-work-opportunities-at-three-times-the-national-rate',
    published: '2026-03-24T08:50:00.000Z', addedAt: now,
    image: 'https://www.executivegrapevine.com/uploads/articles/thumb-care-leavers-in-england.jpg',
    excerpt: 'Young people who have experienced the care system in England are nearly three times more likely to be out of work than their peers.',
    summary_hu: 'Angliában az állami gondozásból kikerülő fiatalok közel háromszor akkora valószínűséggel vannak munka nélkül, mint kortársaik – derül ki egy friss elemzésből. Ez nem csupán szociálpolitikai probléma: a munkáltatóknak is megvan a szerepük abban, hogy ez a csoport valódi esélyt kapjon. A befogadó foglalkoztatási programok és a célzott toborzás valós változást hozhat.'
  },
  {
    id: Date.now() + '_0023',
    source: 'AIHR', category: 'HR Fejlesztés', color: '#0891b2', geo: '🌍 Globális',
    title: '14 Company Culture Examples: 10 To Learn From and 4 To Avoid',
    title_hu: '14 szervezeti kultúra-példa: 10 követendő és 4 elrettentő eset',
    url: 'https://www.aihr.com/blog/good-company-culture-examples/',
    published: '2026-03-24T11:04:41.000Z', addedAt: now,
    image: 'https://www.aihr.com/wp-content/uploads/Good-Company-Culture-Examples-Thumbnail.png',
    excerpt: 'Company culture is the invisible force that can drive a business to exceptional success or drag it into scandal, disengagement, and high turnover.',
    summary_hu: 'A szervezeti kultúra láthatatlan erő – de hatása kézzelfogható: egy SHRM-kutatás szerint a jó kultúrát leíró munkavállalók 83%-a motiváltabban dolgozik. Az AIHR cikke 14 valós példán mutatja be, mi tesz egy kultúrát erőssé vagy mérgessé – köztük ikonikus sikerekkel és tanulságos kudarcokkal. Ajánlott olvasmány minden szervezetfejlesztéssel foglalkozó HR-esnek.'
  },
  {
    id: Date.now() + '_0024',
    source: 'Unleash', category: 'HR Tech', color: '#db2777', geo: '🌍 Globális',
    title: 'Western Digital: Why HR leadership in the future of work must be intentional every step of the way',
    title_hu: 'Western Digital CHRO: az AI-korszakban a HR-vezető legfőbb erénye a szándékosság',
    url: 'https://www.unleash.ai/strategy-and-leadership/western-digital-why-hr-leadership-in-the-future-of-work-must-be-intentional-every-step-of-the-way/',
    published: '2026-03-24T10:29:49.000Z', addedAt: now,
    image: 'https://www.unleash.ai/wp-content/uploads/2026/03/AdobeStock_1925344390.jpeg',
    excerpt: 'UNLEASH interview with Katie Watson, CHRO at Western Digital, about why intentionality is the cornerstone of HR leadership strategy.',
    summary_hu: 'Katie Watson, a Western Digital HR-igazgatója szerint az AI és az automatizáció korában a HR-vezető legfontosabb kompetenciája a szándékosság: minden döntésnek tudatosan kell megelőznie a technológia vezérelte változásokat. A cikk bemutatja, hogyan épít a Western Digital emberközpontú HR-stratégiát a digitális transzformáció közepette is.'
  },
  {
    id: Date.now() + '_0025',
    source: 'MIT Sloan', category: 'Leadership & Strategy', color: '#9f1239', geo: '🇺🇸 USA',
    title: "Shifting AI From Fear to Optimism: U.S. Department of Labor's Taylor Stockton",
    title_hu: 'Az AI-tól való félelemtől az optimizmusig – az amerikai Munkaügyi Minisztérium perspektívája',
    url: 'https://sloanreview.mit.edu/audio/shifting-ai-from-fear-to-optimism-u-s-department-of-labors-taylor-stockton/',
    published: '2026-03-24T11:00:52.000Z', addedAt: now,
    image: 'https://sloanreview.mit.edu/wp-content/uploads/2026/02/MMAI-S13-E2-Stockton-US-DOL-headshot-2400x1260-1-1200x630.jpg',
    excerpt: 'Taylor Stockton, chief innovation officer at the U.S. Department of Labor, talks about how AI is reshaping the workforce.',
    summary_hu: 'Taylor Stockton, az Egyesült Államok Munkaügyi Minisztériumának innovációs igazgatója szerint az AI nem egyes iparágakat forgat fel, hanem szinte minden munkakörbe beépül és feladatokat alakít át. A podcast-epizód azt vizsgálja, hogyan kezelhető a munkaerőpiaci átmenet nem félelemmel, hanem lehetőségként – és mi a szervezetek felelőssége ebben.'
  },
  {
    id: Date.now() + '_0026',
    source: 'HR.Asia', category: 'HR News', color: '#0369a1', geo: '🌏 Ázsia',
    title: "Caution and stability shape Vietnam's workforce as hiring becomes more selective",
    title_hu: 'Vietnam munkaerőpiaca óvatossá vált – a felvétel egyre szelektívebb',
    url: 'https://hr.asia/asean/caution-and-stability-shape-vietnams-workforce-as-hiring-becomes-more-selective/',
    published: '2026-03-24T07:15:33.000Z', addedAt: now,
    image: 'https://hr.asia/2017/wp-content/uploads/2025/10/workers-service-industry.jpg',
    excerpt: "Vietnam's labour market is entering a period defined by caution, stability and selective hiring.",
    summary_hu: 'Az Adecco Vietnam 2026-os bérelemzése szerint az ország erős GDP-növekedés (8,02%) mellett is egyre meggondoltabb felvételi gyakorlatot folytat. A szervezetek stabilitásra törekednek, és a korábbinál alaposabban mérlegelik az új munkaerő bevonását. Ez a trend a gazdasági bizonytalanság és a hosszú távú növekedési célok együttes hatásának eredménye.'
  },
  {
    id: Date.now() + '_0027',
    source: 'HR.Asia', category: 'HR News', color: '#0369a1', geo: '🌍 Globális',
    title: 'Compliance gaps widen as companies accelerate cross-border hiring',
    title_hu: 'Egyre nagyobb a megfelelési rés a globális felvételek mögött',
    url: 'https://hr.asia/asean/compliance-gaps-widen-as-companies-accelerate-cross%e2%80%91border-hiring/',
    published: '2026-03-24T07:10:25.000Z', addedAt: now,
    image: 'https://hr.asia/2017/wp-content/uploads/2025/03/recruitment.jpg',
    excerpt: 'As global hiring accelerates, companies are exposing themselves to growing compliance risk with only eight percent reporting full adherence to international regulations.',
    summary_hu: 'A Multiplier Global Hiring Gap Report szerint a vállalatok csupán 8%-a felel meg teljes mértékben a nemzetközi adózási és munkajogi előírásoknak, miközben a határokon átnyúló felvétel üteme gyorsul. A jogi megfelelőség lemaradt a globalizációs ambíciók mögött, és ez egyre komolyabb kockázatot jelent a HR-osztályok számára.'
  },
  {
    id: Date.now() + '_0028',
    source: 'HRZone', category: 'HR Strategy', color: '#6b21a8', geo: '🇬🇧 UK',
    title: 'The future of flexibility: Preparing for reforms to zero-hours contracts',
    title_hu: 'Rugalmas foglalkoztatás jövője: hogyan készüljenek a munkáltatók a nullórás szerződések reformjára?',
    url: 'https://hrzone.com/preparing-for-reforms-to-zero-hours-contracts/',
    published: '2026-03-24T08:00:00.000Z', addedAt: now,
    image: 'https://hrzone.com/app/uploads/2026/03/57wo9f-r2-a-e1773929699280.jpg',
    excerpt: 'With reforms to zero-hours contracts on the horizon, specialist employment lawyer Philip Pepper advises that the time to act is now.',
    summary_hu: 'Az Egyesült Királyságban közelgő reform alapvetően átírja a nullórás szerződések szabályait, és Philip Pepper foglalkoztatási jogász szerint a munkáltatóknak már most el kell dönteniük, hogyan reagálnak. A cikk konkrét jogi és HR-szempontú lépéseket ismertet a felkészüléshez. A korai cselekvés nemcsak megfelelési, hanem munkavállalói bizalmi kérdés is.'
  },
  {
    id: Date.now() + '_0029',
    source: 'Personalwirtschaft', category: 'HR News', color: '#1d4ed8', geo: '🇩🇪 Németország',
    title: 'KI-Transformation: Nutzungsrate ist nicht ausschlaggebend',
    title_hu: 'AI-transzformáció: nem a használati arány a döntő, hanem a gondolkodásmód',
    url: 'https://www.personalwirtschaft.de/news/hr-organisation/ki-transformation-nutzungsrate-ist-nicht-ausschlaggebend-202107/',
    published: '2026-03-24T13:41:22.000Z', addedAt: now,
    image: 'https://www.personalwirtschaft.de/wp-content/uploads/2026/03/Design-ohne-Titel-2026-03-24T141040.496.jpg',
    excerpt: 'Immer mehr Unternehmen messen, wie intensiv ihre Mitarbeitenden KI nutzen – doch das allein reicht nicht.',
    summary_hu: 'Egyre több vállalat méri, milyen intenzitással használják a dolgozók az AI-t – de ez a szemlélet félrevezető lehet. A Personalwirtschaft kommentárja szerint aki csak a fogyasztási mutatókra koncentrál, elveszítheti az önálló gondolkodás kultúráját. A valódi AI-transzformáció nem a statisztikákon, hanem a folyamatok és a gondolkodásmód megváltozásán mérhető.'
  },
  {
    id: Date.now() + '_0030',
    source: 'Personalwirtschaft', category: 'HR News', color: '#1d4ed8', geo: '🇩🇪 Németország',
    title: 'Siemens Energy, BASF und Co.: Wie sieht die Ausbildung der Zukunft aus?',
    title_hu: 'Siemens Energy, BASF és mások: milyen lesz a jövő szakképzése Németországban?',
    url: 'https://www.personalwirtschaft.de/news/personalentwicklung/siemens-energy-basf-und-co-wie-sieht-die-ausbildung-der-zukunft-aus-202086/',
    published: '2026-03-24T10:08:29.000Z', addedAt: now,
    image: 'https://www.personalwirtschaft.de/wp-content/uploads/2026/03/Design-ohne-Titel-2026-03-24T110203.898.jpg',
    excerpt: 'Ansprüche und Kompetenzen von Azubis haben sich verändert. Darauf müssen Ausbilder reagieren.',
    summary_hu: 'A DGFP éves konferenciáján egyértelművé vált: a szakmai képzés világa alapjaiban változik. A tanulók elvárásai és kompetenciái átalakultak, az oktatóknak reagálniuk kell. A cikk bemutatja, milyen innovatív képzési megközelítéseket alkalmaznak a Siemens Energy, a BASF és más nagy iparvállalatok.'
  },
  {
    id: Date.now() + '_0031',
    source: 'Personalwirtschaft', category: 'HR News', color: '#1d4ed8', geo: '🇩🇪 Németország',
    title: 'Krisenkommunikation bei VW: Was HR-Teams lernen können',
    title_hu: 'Válságkommunikáció VW-módra: mit tanulhat a HR a leépítési tapasztalatokból?',
    url: 'https://www.personalwirtschaft.de/news/hr-organisation/krisenkommunikation-bei-vw-was-hr-teams-lernen-koennen-202062/',
    published: '2026-03-24T08:50:46.000Z', addedAt: now,
    image: 'https://www.personalwirtschaft.de/wp-content/uploads/2026/03/Design-ohne-Titel-3.jpg',
    excerpt: 'Mit bereits dem dritten großen Stellenabbau in 20 Jahren ist VW längst Profi in der Krisenkommunikation.',
    summary_hu: 'A Volkswagen már a harmadik nagy létszámleépítésénél tart 20 éven belül, és ezzel rutinossá vált a válságkommunikációban. A Personalwirtschaft elemzi, milyen bevált módszerekkel érik el, hogy a munkavállalók tájékozottak és biztonságban érezzék magukat nehéz időkben is. A tanulságok más szektorokban is alkalmazhatók.'
  },
  {
    id: Date.now() + '_0032',
    source: 'Parlons RH', category: 'HR News', color: '#2563eb', geo: '🇫🇷 Franciaország',
    title: "RSE : du discours à l'engagement des collaborateurs",
    title_hu: 'Vállalati felelősségvállalás: hogyan lesz a CSR-ból valódi munkavállalói elköteleződés?',
    url: 'https://www.parlonsrh.com/rse-du-discours-a-lengagement-des-collaborateurs/',
    published: '2026-03-24T13:00:00.000Z', addedAt: now,
    image: 'https://www.parlonsrh.com/app/uploads/sites/3/2026/03/infographie-3.jpg',
    excerpt: "Une démarche RSE mobilise durablement lorsqu'elle offre aux collaborateurs une place claire dans la transformation.",
    summary_hu: 'A fenntarthatóság és a vállalati felelősségvállalás (CSR) csak akkor válik élő gyakorlattá, ha a munkatársak egyértelmű és valódi szerepet kapnak a szervezeti transzformációban. A Parlons RH cikke rámutat, hogy az elköteleződés nem kommunikációs kérdés, hanem strukturális döntések eredménye. Hosszú távú hatás csak akkor érhető el, ha a CSR alulról is építkező folyamat.'
  },
  {
    id: Date.now() + '_0033',
    source: 'Y2Y', category: 'Y2Y Blog', color: '#DED114', geo: '🇭🇺 Magyar',
    title: 'Hogy fogjuk megoldani a back-sittinget? És főleg ki?',
    title_hu: 'Hogy fogjuk megoldani a back-sittinget? És főleg: ki?',
    url: 'https://www.y2y.hu/blog/hogy-fogjuk-megoldani-a-back-sittinget-es-foleg-ki',
    published: '2026-03-24T14:07:15.304Z', addedAt: now,
    image: 'https://www.y2y.hu/storage/gallery/images/2025/10/03/Zud37D7BlXNDfbUU74ZdZcQVL7v1rWfL3dvVHany.jpg',
    excerpt: 'Állati nagyot megy a back-sitting cikkünk, és élek a feltételezéssel, hogy még több helyen érzitek, mint amit én elsőre feltételeztem.',
    summary_hu: 'Dorka Nagy-Józsa folytatja a back-sitting témáját – azt a jelenséget, amikor a vezető alapvetően nem bízik a csapatában, és folyamatosan hátulról ellenőriz és felülír. Az olvasói visszajelzésekből kiderül, hogy ez sokkal elterjedtebb probléma, mint elsőre látszott: rengeteg szervezetben felismerik saját helyzetüket. A kérdés már nem az, hogy létezik-e – hanem hogy ki és hogyan lesz képes megoldani.'
  }
];

// Load existing news.json
const newsPath = path.join(__dirname, '..', 'public', 'data', 'news.json');
const existing = JSON.parse(fs.readFileSync(newsPath, 'utf8'));

// Filter articles older than 30 days
const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
const filteredOld = existing.articles.filter(a => new Date(a.addedAt || a.published) >= cutoff);

// Combine: new articles first
const combined = [...newArticles, ...filteredOld];

const updated = {
  lastUpdated: now,
  articles: combined
};

fs.writeFileSync(newsPath, JSON.stringify(updated, null, 2), 'utf8');
console.log('Mentve. Uj cikkek: ' + newArticles.length + ', Osszes: ' + combined.length);
