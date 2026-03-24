const fs = require('fs');
const path = require('path');

const newsPath = path.join(__dirname, '../public/data/news.json');
const existing = JSON.parse(fs.readFileSync(newsPath, 'utf8'));

function makeId(published) {
  const ts = new Date(published).getTime();
  const r = Math.floor(1000 + Math.random() * 9000);
  return `${ts}_${r}`;
}

const newArticles = [
  // HBR
  {
    source:"Harvard Business Review",category:"Leadership",color:"#991b1b",geo:"🌍 Globális",
    title:"Competing LLMs Were Asked to Pick Stocks. Their Choices Revealed AI's Limitations.",
    title_hu:"Részvénytipp AI-tól? A kísérlet rávilágított a korlátokra",
    url:"https://hbr.org/2026/03/competing-llms-were-asked-to-pick-stocks-their-choices-revealed-ais-limitations",
    published:"2026-03-17T12:25:03.000Z",
    excerpt:"New research underscores the risks of relying on the tools without questioning what they may not know.",
    image:"https://hbr.org/resources/images/article_assets/2026/03/Mar26_16_1296804098.jpg",
    summary_hu:"Kutatók több nagy nyelvi modellt kértek meg tőzsdei döntéseket hozni – az eredmény figyelmeztetőjelzés mindenkinek, aki vakon bízik az AI-tanácsokban. A modellek hasonló döntéseket hoztak anélkül, hogy jelezték volna, mit nem tudnak – ez komoly kockázatot jelent minden AI-ra támaszkodó folyamatnál, beleértve a HR-döntéshozatalt is."
  },
  {
    source:"Harvard Business Review",category:"Leadership",color:"#991b1b",geo:"🌍 Globális",
    title:"Research: How the \"Accent Penalty\" Determines Who Gets Heard",
    title_hu:"Az akcentus büntetése: ki kap szót a munkahelyen?",
    url:"https://hbr.org/2026/03/research-how-the-accent-penalty-determines-who-gets-heard",
    published:"2026-03-17T12:15:04.000Z",
    excerpt:"And what leaders can do to mitigate its effects in the workplace.",
    image:"https://hbr.org/resources/images/article_assets/2026/03/Mar26_16_accent-bias-boston-public-library-eTPvqwude9A-unsplash.jpg",
    summary_hu:"Egy új HBR-kutatás szerint az idegen akcentussal rendelkező munkavállalók szisztematikusan kevesebb figyelmet kapnak, ötleteiket ritkábban hallják meg – ez komoly munkaerő-kihasználtsági és befogadási problémát jelent. A cikk konkrét lépéseket javasol a vezetőknek, hogy csökkentsék az akcentusalapú elfogultságot a csapatban."
  },
  {
    source:"Harvard Business Review",category:"Leadership",color:"#991b1b",geo:"🇺🇸 USA",
    title:"The Shifting Relationship Between Business and the U.S. Government",
    title_hu:"Vállalat és állam: átalakuló viszony az USA-ban",
    url:"https://hbr.org/podcast/2026/03/the-shifting-relationship-between-business-and-the-u-s-government",
    published:"2026-03-17T12:10:26.000Z",
    excerpt:"A conversation with Yale's Jeffrey Sonnenfeld about the current relationship between the state and private enterprise.",
    image:"https://hbr.org/resources/images/article_assets/2025/02/wide-ideacast_25.png",
    summary_hu:"A Yale-i Jeffrey Sonnenfeld elemzi, hogyan változott az amerikai vállalatok és a szövetségi kormány viszonya – a szabályozási bizonytalanság, a politikai nyomás és a cégvezetői döntéshozatal szempontjából. Az átalakuló üzleti-kormányzati kapcsolat közvetlen hatással van a HR-stratégiákra és a munkaerőpiaci várakozásokra."
  },
  {
    source:"Harvard Business Review",category:"Leadership",color:"#991b1b",geo:"🌍 Globális",
    title:"7 Factors That Drive Returns on AI Investments, According to a New Survey",
    title_hu:"7 tényező, ami meghatározza az AI-befektetések megtérülését",
    url:"https://hbr.org/2026/03/7-factors-that-drive-returns-on-ai-investments-according-to-a-new-survey",
    published:"2026-03-17T12:05:30.000Z",
    excerpt:"And how companies can forecast the impact AI might have on their returns.",
    image:"https://hbr.org/resources/images/article_assets/2026/03/Mar26_17_1155351493.jpg",
    summary_hu:"Egy friss felmérés szerint az AI-befektetések megtérülése nem az eszközöktől, hanem az implementáció minőségétől függ – és 7 kulcstényező különíti el a sikeres cégeket a csapódóktól. A HR számára különösen fontos tanulság: a change management és a munkavállalói felkészítés hiánya az egyik leggyakoribb buktató."
  },
  // HR Dive
  {
    source:"HR Dive",category:"HR News",color:"#0369a1",geo:"🇺🇸 USA",
    title:"Disney executive alleges HR combed his private coaching sessions for 'dirt'",
    title_hu:"Disney-botrány: a HR titokban kémkedett egy vezető coachingülésein?",
    url:"https://www.hrdive.com/news/former-disney-executive-hr-coaching-sessions-dirt-asian-discrimination-retaliation/814994/",
    published:"2026-03-17T20:46:00.000Z",
    excerpt:"The exec butted heads with HR due to his direct, streamlined, and performance-driven leadership style.",
    image:"https://imgproxy.divecdn.com/RKgv8OTiYp1MQjFl6aYLRmRRwx62gQEhb8Swpm_1WXY/g:ce/rs:fit:770:435/Z3M6Ly9kaXZlc2l0ZS1zdG9yYWdlL2RpdmVpbWFnZS9HZXR0eUltYWdlcy0xNDY0MjkyNTg2LmpwZw==.webp",
    summary_hu:"Egy volt Disney-vezető azt állítja, hogy a vállalat HR-osztálya hozzáfért magáncoaching-foglalkozásainak tartalmához, és azokat személye ellen használta fel. Az ügy kényes etikai és jogi kérdéseket vet fel: hol húzódik a határ a munkáltatói felügyelet és a munkavállalói magánszféra között?"
  },
  {
    source:"HR Dive",category:"HR News",color:"#0369a1",geo:"🌍 Globális",
    title:"AI boom drives worker compensation cuts, study finds",
    title_hu:"AI-boom árnyoldala: csökkentik a béreket, hogy AI-ba fektessenek",
    url:"https://www.hrdive.com/news/ai-boom-drives-worker-compensation-cuts-resumebuilder/814950/",
    published:"2026-03-17T20:46:00.000Z",
    excerpt:"Both jobs and paychecks are taking a hit as companies ramp up artificial intelligence spending.",
    image:"https://imgproxy.divecdn.com/vJg7Gfnr5xbhiLM-4dKMWp3sklCE-lTePjFg1A7Jkds/g:ce/rs:fit:770:435/Z3M6Ly9kaXZlc2l0ZS1zdG9yYWdlL2RpdmVpbWFnZS9HZXR0eUltYWdlcy02NzI3OTcuanBn.webp",
    summary_hu:"Egy új kutatás szerint számos vállalat nemcsak munkavállalói létszámát, hanem béreit is csökkentette az AI-beruházások finanszírozása érdekében. A trend riasztó: a versenynyomás miatt a cégek emberi erőforrásból finanszírozzák a technológiai fejlesztéseket."
  },
  {
    source:"HR Dive",category:"HR News",color:"#0369a1",geo:"🇺🇸 USA",
    title:"How a Florida pronoun bill could clash with Title VII",
    title_hu:"Florida névmástörvénye szembekerülhet a szövetségi diszkriminációs joggal",
    url:"https://www.hrdive.com/news/hb641-pronouns-florida-public-service-title-vii/814998/",
    published:"2026-03-17T20:45:00.000Z",
    excerpt:"HR Dive's Caroline Colvin digs into the legal implications of HB 641, the proposed Freedom of Conscience in the Workplace Act.",
    image:"https://imgproxy.divecdn.com/UdjYBW_n_Usb4nbN_OoOjS8ttCPLUBOz9ZAJAVukTc8/g:ce/rs:fit:770:435/Z3M6Ly9kaXZlc2l0ZS1zdG9yYWdlL2RpdmVpbWFnZS9HZXR0eUltYWdlcy0xNTcwOTI2Mzc3LmpwZw==.webp",
    summary_hu:"Florida tervezett törvénye, amely korlátozná a nemválasztáson alapuló névmáshasználatot a közszférában, komoly jogi feszültségbe kerülhet a szövetségi Title VII törvénnyel. A HR-szakembereknek fel kell készülniük arra, hogy a változó állami és szövetségi szabályozás között kell eligazítaniuk munkahelyi politikájukat."
  },
  {
    source:"HR Dive",category:"HR News",color:"#0369a1",geo:"🌍 Globális",
    title:"Employees say AI does more harm than good",
    title_hu:"Munkavállalók: az AI több kárt okoz, mint hasznot",
    url:"https://www.hrdive.com/news/workers-say-ai-does-more-harm-than-good/814863/",
    published:"2026-03-17T15:48:00.000Z",
    excerpt:"There's a growing concern about the pace of AI adoption and a clear gap in employer support.",
    image:"https://imgproxy.divecdn.com/N_k824tXtmJrTIeofTKdZkZ3yMGpmVHAN4XhDfZOqZk/g:ce/rs:fit:770:435/Z3M6Ly9kaXZlc2l0ZS1zdG9yYWdlL2RpdmVpbWFnZS9HZXR0eUltYWdlcy0yMjY2MTM2NzY3LmpwZw==.webp",
    summary_hu:"Egy friss felmérés szerint a munkavállalók egyre szkeptikusabbak az AI-val szemben – sokan úgy érzik, hogy a gyors bevezetés inkább terheli, mint segíti a mindennapi munkájukat. Súlyos employer support gap alakult ki: a cégek AI-t vetnek be, de nem fektetnek kellő energiát a munkavállalói felkészítésbe."
  },
  {
    source:"HR Dive",category:"HR News",color:"#0369a1",geo:"🌍 Globális",
    title:"Skills-based talent practices can create $125K in ROI per worker, report says",
    title_hu:"Készségalapú toborzás: munkavállalónként 125 ezer dollár megtérülés",
    url:"https://www.hrdive.com/news/skills-based-talent-practices-can-create-125k-in-roi-per-worker-report-sa/814878/",
    published:"2026-03-17T14:45:00.000Z",
    excerpt:"The research highlights what other studies have said: L&D is key to both retention and fixing skill gaps.",
    image:"https://imgproxy.divecdn.com/1B4szAONkXFRDPSbZvk5BJiI2r_CQSXfOzwaRGylNn4/g:ce/rs:fit:770:435/Z3M6Ly9kaXZlc2l0ZS1zdG9yYWdlL2RpdmVpbWFnZS9HZXR0eUltYWdlcy0xMTc3Mzc2NDMyLmpwZw==.webp",
    summary_hu:"Egy új jelentés szerint a készségalapú tehetséggondozás – diplomák helyett kompetenciák fókuszával – munkavállalónként akár 125 000 dollár ROI-t is generálhat. A kutatás szerint a tanulás és fejlődés (L&D) nem csupán munkamegtartási eszköz, hanem kulcsfontosságú versenyképességi tényező."
  },
  // Flex Index
  {
    source:"Flex Index",category:"Flex & Remote Work",color:"#6d28d9",geo:"🌍 Globális",
    title:"Oil Hits $100. Some Countries Say Stay Home.",
    title_hu:"100 dolláros olaj: néhány ország máris otthon maradást javasol",
    url:"https://flexindex.substack.com/p/oil-hits-100-some-countries-say-stay",
    published:"2026-03-17T11:05:47.000Z",
    excerpt:"Plus, Why return to office mandates fail to deliver what leaders promise",
    image:"https://substackcdn.com/image/fetch/$s_!G1yx!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5d98965e-7033-4f45-81e4-b20f8dc2e99e_1000x750.webp",
    summary_hu:"Az olajár 100 dollár fölé emelkedésével több ország és munkáltató is fontolgatja a kötelező irodai jelenlét lazítását. A cikk emellett rávilágít, miért nem teljesítik az irodai visszatérési programok a hozzájuk fűzött reményeket, és milyen adatok cáfolják a szokásos érvelést."
  },
  // HR Executive
  {
    source:"HR Executive",category:"HR Strategy",color:"#7c3aed",geo:"🌍 Globális",
    title:"One decision-maker per team: Inside Pfizer's cross-functional operating model",
    title_hu:"Pfizer módszer: egy felelős, 700 csapat – hogyan skálázható a döntéshozatal?",
    url:"https://hrexecutive.com/one-decision-maker-per-team-inside-pfizers-cross-functional-operating-model/",
    published:"2026-03-17T12:30:34.000Z",
    excerpt:"Pfizer's Chief Talent Officer explains how the pilot in command framework scaled from nine teams to 700.",
    image:"https://hrexecutive.com/wp-content/uploads/Logo_Outside.jpg",
    summary_hu:"A Pfizer 'pilóta a fedélzeten' modelljével kilenc csapattól 700-ig jutott el: minden keresztfunkcionális csapatban egyetlen döntéshozó van, ami radikálisan felgyorsítja a végrehajtást. A CHRO elmagyarázza, hogyan tette ezt Workday-jel mérhetővé, és miért lehet ez a szervezeti tervezés következő nagy trendje."
  },
  {
    source:"HR Executive",category:"HR Strategy",color:"#7c3aed",geo:"🌍 Globális",
    title:"Empower your contingent workers with mentorship",
    title_hu:"Ideiglenes munkavállalók is megérdemlik a mentorálást",
    url:"https://hrexecutive.com/empower-your-contingent-workers-with-mentorship/",
    published:"2026-03-17T12:15:29.000Z",
    excerpt:"Exploring the long-term value of tailored mentorship in building inclusive, high-performing temporary teams.",
    image:"https://hrexecutive.com/wp-content/uploads/AdobeStock_287443774-scaled.jpeg",
    summary_hu:"A mentorálás hagyományosan a teljes munkaidős munkavállalók privilégiuma volt – de kutatások szerint a szerződéses és ideiglenes dolgozóknak nyújtott célzott mentorálás javítja a csapatteljesítményt és az inkluzivitást. A befektetés nemcsak morális, hanem üzleti szempontból is megtérül."
  },
  {
    source:"HR Executive",category:"HR Strategy",color:"#7c3aed",geo:"🌍 Globális",
    title:"What Deloitte's 2026 trends report says leaders want tech to fix",
    title_hu:"Deloitte 2026: mit várnak a vezérek az AI-tól – és mi a valóság?",
    url:"https://hrexecutive.com/what-deloittes-2026-trends-report-says-leaders-want-tech-to-fix/",
    published:"2026-03-17T12:00:42.000Z",
    excerpt:"A survey of 9,000 business and HR leaders maps the problems leaders are counting on AI to solve.",
    image:"https://hrexecutive.com/wp-content/uploads/US188562_Figure1.png",
    summary_hu:"A Deloitte 9000 vezető megkérdezésével feltárta, milyen problémákat akarnak AI-jal megoldani – és hol tartanak eddig. A HR számára kulcsfontosságú tanulság: a technológia iránti elvárások messze meghaladják a jelenlegi megvalósítási érettséget, ami növeli a munkavállalói bizalmatlanságot."
  },
  {
    source:"HR Executive",category:"HR Strategy",color:"#7c3aed",geo:"🌍 Globális",
    title:"The gender pay gap is narrowing; the gender expectation gap is not",
    title_hu:"A bérszakadék csökken, de az elvárásszakadék nem",
    url:"https://hrexecutive.com/the-gender-pay-gap-is-narrowing-the-gender-expectation-gap-is-not/",
    published:"2026-03-17T11:45:01.000Z",
    excerpt:"While the gender pay gap is the smallest in history, there are still stark differences in candidate expectations for salary, based on gender.",
    image:"https://hrexecutive.com/wp-content/uploads/AdobeStock_148297287.jpg",
    summary_hu:"Bár a nemi bérszakadék historikusan alacsony szinten van, a fizetési elvárásokban mutatkozó különbség a nemek között változatlan – a nők szisztematikusan alacsonyabb bért kérnek ugyanazért a pozícióért. Ez az elvárás-különbség önmagában fenntartja az egyenlőtlenséget, ha a munkáltatók nem avatkoznak közbe aktívan."
  },
  {
    source:"HR Executive",category:"HR Strategy",color:"#7c3aed",geo:"🌍 Globális",
    title:"What lululemon's CEO vacancy reveals about board fit",
    title_hu:"lululemon CEO-keresés: mit árul el ez az igazgatóság tehetségfelismerő képességéről?",
    url:"https://hrexecutive.com/what-lululemons-ceo-vacancy-reveals-about-board-fit/",
    published:"2026-03-17T11:30:52.000Z",
    excerpt:"lululemon's boardroom battle raises a question every CHRO faces: Can your board recognize the CEO it needs?",
    image:"https://hrexecutive.com/wp-content/uploads/AdobeStock_1917997710_Editorial_Use_Only.jpg",
    summary_hu:"A lululemon vezérigazgatói székének betöltési nehézségei rávilágítanak arra, hogy az igazgatóságok gyakran csak akkor ismerik fel, milyen vezető kell nekik, amikor már késő. A CHRO-k kulcsszerepet játszhatnak abban, hogy a board felkészülten álljon az utódlástervezéshez."
  },
  {
    source:"HR Executive",category:"HR Strategy",color:"#7c3aed",geo:"🌍 Globális",
    title:"Amid soaring healthcare costs, why post-injury work return is a massive HR opportunity",
    title_hu:"Sérülés utáni visszatérés: az egészségügyi költségek csökkentésének legjobb HR-eszköze",
    url:"https://hrexecutive.com/amid-soaring-healthcare-costs-why-post-injury-work-return-is-a-massive-hr-opportunity/",
    published:"2026-03-17T11:30:18.000Z",
    excerpt:"Well-structured return to work programs help restore a worker's identity, reduce anxiety and depression, and shorten disability duration.",
    image:"https://hrexecutive.com/wp-content/uploads/2022/04/Healthcare.-Adobe.-4.27.22.jpeg",
    summary_hu:"Az egészségügyi kiadások egyre nagyobb terhet rónak a vállalatokra, de egy jól kialakított rehabilitációs visszatérési program nemcsak csökkenti a táppénz időtartamát, hanem a munkavállalói jóllétre és lojalitásra is pozitív hatással van. A HR-osztályoknak érdemes ezt stratégiai befektetésként kezelni."
  },
  // Workology
  {
    source:"Workology",category:"HR & Recruiting",color:"#b45309",geo:"🌍 Globális",
    title:"15 Questions to Ask When Choosing an Applicant Tracking System",
    title_hu:"15 kérdés, amit fel kell tenned, mielőtt ATS-t választasz",
    url:"https://workology.com/15-questions-to-ask-when-choosing-an-applicant-tracking-system/",
    published:"2026-03-17T14:50:30.000Z",
    excerpt:"Choosing an ATS? Ask these 15 questions to ensure compliance, smooth workflows, and a seamless candidate experience.",
    image:"",
    summary_hu:"Az ATS-választás nem csak IT-kérdés: a megfelelő rendszer befolyásolja a jelöltek élményét, a compliance-t és a HR-folyamatok hatékonyságát. A cikk 15 konkrét kérdéssel segít eligazodni a piac ajánlatai között, fókuszban a valódi szükségletekkel."
  },
  // HR Daily Advisor
  {
    source:"HR Daily Advisor",category:"HR News",color:"#0369a1",geo:"🇺🇸 USA",
    title:"The Clock is Ticking: Why Statutes of Limitations Matter",
    title_hu:"Ketyeg az óra: miért veszélyesek az elévülési határidők?",
    url:"https://hrdailyadvisor.hci.org/2026/03/17/the-clock-is-ticking-why-statutes-of-limitations-matter/",
    published:"2026-03-17T09:30:00.000Z",
    excerpt:"Many business disputes are effectively lost long before a lawsuit is ever filed.",
    image:"https://hrdailyadvisor.hci.org/app/uploads/sites/3/2024/05/GettyImages-1206717340.jpg",
    summary_hu:"A vállalkozások és HR-osztályok egyik leggyakoribb hibája, hogy munkaügyi vitákat halogatva kezelnek – és mire cselekednek, az elévülési határidő lejárt. A cikk konkrét példákon keresztül mutatja be, hogyan vezethet a késlekedés komoly jogi és pénzügyi veszteséghez."
  },
  // HR Reporter
  {
    source:"HR Reporter",category:"HR News",color:"#d9000d",geo:"🇨🇦 Kanada",
    title:"BC tribunal dismisses complaint linking COVID conspiracy video to racial bias",
    title_hu:"Kanada: bíróság elutasított COVID-összeesküvés-videóra épülő diszkriminációs panaszt",
    url:"https://www.hrreporter.com/chrr-plus/employment-law/bc-tribunal-dismisses-complaint-linking-covid-conspiracy-video-to-racial-bias/394185",
    published:"2026-03-17T20:16:39.000Z",
    excerpt:"Constructive dismissal claim fails despite employee claims of discrimination",
    image:"https://cdn-res.keymedia.com/cms/images/chrr/sara_639093753412868822.png",
    summary_hu:"Brit Kolumbia munkaügyi törvényszéke elutasított egy konstruktív elbocsátási panaszt, ahol a munkavállaló egy COVID-összeesküvés-videót kapcsolt faji diszkriminációhoz. Az ítélet rávilágít, hogy a munkahelyi sérelmek komplex jogi értékelést igényelnek, és az ok-okozati összefüggést pontosan kell igazolni."
  },
  {
    source:"HR Reporter",category:"HR News",color:"#d9000d",geo:"🇨🇦 Kanada",
    title:"Prohibited action: Worker fired after 911 safety call",
    title_hu:"Felmondás 911-es hívás után? Kanadai törvényszék szerint ez tiltott",
    url:"https://www.hrreporter.com/focus-areas/safety/prohibited-action-worker-fired-after-911-safety-call/394184",
    published:"2026-03-17T19:44:27.000Z",
    excerpt:"Tribunal questions employer's stated justification for terminating worker's employment",
    image:"https://cdn-res.keymedia.com/cms/images/chrr/sara_639093745589927510.png",
    summary_hu:"Egy kanadai munkavállalót elbocsátottak, miután biztonsági aggály miatt 911-et hívott – a törvényszék most megkérdőjelezte a munkáltató által megjelölt indokot. Az ügy emlékeztet: a biztonsági kérdéseket jelző munkavállalók törvényi védelmet élveznek, és a megtorló intézkedések súlyos következményekkel járhatnak."
  },
  {
    source:"HR Reporter",category:"HR News",color:"#d9000d",geo:"🇨🇦 Kanada",
    title:"'Rich jerk': Atlassian firing case serves as warning for employers",
    title_hu:"'Gazdag hülye' – az Atlassian-per tanulságai minden munkáltatónak",
    url:"https://www.hrreporter.com/news/hr-news/rich-jerk-atlassian-firing-case-serves-as-warning-for-employers/394183",
    published:"2026-03-17T16:13:22.000Z",
    excerpt:"From internal Ask me anything call to courtroom transcript, dispute highlights importance of tone, culture and discipline during workforce cuts",
    image:"https://cdn-res.keymedia.com/cms/images/chrr/stac_639093650637661316.png",
    summary_hu:"Egy belső 'kérdezz tőlem bármit' megbeszélésen elhangzott megjegyzés bírósági bizonyíték lett – az Atlassian-leépítési ügy rávilágít, milyen komoly következményei lehetnek a nem megfelelő kommunikációnak. A HR-szakemberek tanulságaként: a szavak és a hangnem dokumentáltan is számon kérhetők."
  },
  {
    source:"HR Reporter",category:"HR News",color:"#d9000d",geo:"🇨🇦 Kanada",
    title:"Staffing firm fined $100,000 for providing false records during ESA inspection",
    title_hu:"100 000 dolláros bírság hamis munkaügyi nyilvántartásért Ontarióban",
    url:"https://www.hrreporter.com/focus-areas/payroll/staffing-firm-fined-100000-for-providing-false-records-during-esa-inspection/394182",
    published:"2026-03-17T13:53:41.000Z",
    excerpt:"Ontario court also orders 25 per cent victim fine surcharge",
    image:"https://cdn-res.keymedia.com/cms/images/chrr/jimw_639093523624187744.jpg",
    summary_hu:"Egy ontariói munkaerő-kölcsönző céget 100 000 dolláros bírsággal sújtottak, miután hatósági ellenőrzésnél hamis dokumentumokat mutatott be. Az eset rávilágít, hogy a munkajogi megfelelőség nem opcionális – a szándékos szabályszegés pénzügyi és reputációs kockázatot egyaránt jelent."
  },
  {
    source:"HR Reporter",category:"HR News",color:"#d9000d",geo:"🇨🇦 Kanada",
    title:"Roundtable: DEI: Trends, strategies and real results",
    title_hu:"DEI Kanadában: trendek, stratégiák és valódi eredmények",
    url:"https://www.hrreporter.com/videos/roundtable-dei-trends-strategies-and-real-results/394181",
    published:"2026-03-17T13:21:25.000Z",
    excerpt:"3 Canadian HR leaders discuss their outlook and initiatives in the DEI space",
    image:"https://cdn-res.keymedia.com/cms/images/chrr/sara_639093504801326187.png",
    summary_hu:"Három kanadai HR-vezető osztja meg tapasztalatait a DEI-kezdeményezések aktuális helyzetéről, kihívásairól és tényleges eredményeiről. A kerekasztal-beszélgetés hasznos betekintést nyújt abba, hogyan tartható fenn a befogadási kultúra akkor is, amikor a geopolitikai környezet egyre inkább kihívja azt."
  },
  {
    source:"HR Reporter",category:"HR News",color:"#d9000d",geo:"🇨🇦 Kanada",
    title:"How an autism-informed competency model can make hiring more fair – and effective",
    title_hu:"Autizmus-informált kompetenciamodell: igazságosabb és hatékonyabb felvételi",
    url:"https://www.hrreporter.com/focus-areas/diversity/how-an-autism-informed-competency-model-can-make-hiring-more-fair-and-effective/394180",
    published:"2026-03-16T23:51:20.000Z",
    excerpt:"Researchers explain why employers should adopt neurodivergent-inclusive competency models for hiring",
    image:"https://cdn-res.keymedia.com/cms/images/chrr/stac_639093021587479776.png",
    summary_hu:"Kutatók szerint egy neurodivergens szempontokat is figyelembe vevő kompetenciamodell nemcsak igazságosabbá teszi a toborzást, hanem jobb üzleti eredményekhez is vezet. Az üzleti eset mostanra könnyen meggyőzhetővé vált: a befogadó felvételi gyakorlatok valódi tehetségtartalékokat tárnak fel."
  },
  // Personnel Today
  {
    source:"Personnel Today",category:"HR News",color:"#1e40af",geo:"🇬🇧 UK",
    title:"Warning that NHS digital reform could lead to burnout",
    title_hu:"NHS digitális reform: a kiégés veszélye fenyeget",
    url:"https://www.personneltoday.com/hr/warning-that-nhs-digital-reform-could-lead-to-burnout/",
    published:"2026-03-18T00:01:14.000Z",
    excerpt:"Health Secretary Wes Streeting is being warned he will need to pursue his digital transformation strategy for the NHS carefully.",
    image:"https://www.personneltoday.com/wp-content/uploads/sites/8/2026/03/NHS_Shutterstock_1832673094.jpg",
    summary_hu:"Az NHS digitális átalakítási tervei hatalmas elvárásokat helyeznek az egészségügyi dolgozókra, és szakértők szerint a változáskezelés hiányosságai burnout-hullámhoz vezethetnek. Az egészségügyi HR-szakembereket sürgős lépésekre szólítják fel a munkaterhelés és a munkavállalói jóllét egyensúlyának megőrzéséért."
  },
  {
    source:"Personnel Today",category:"HR News",color:"#1e40af",geo:"🇬🇧 UK",
    title:"Extreme HR: People management in the Antarctic",
    title_hu:"Extrém HR: embermenedzsment az Antarktiszon",
    url:"https://www.personneltoday.com/hr/hr-british-antarctic-survey/",
    published:"2026-03-17T14:00:16.000Z",
    excerpt:"As head of HR at British Antarctic Survey, Mariella Giancola deals with challenging team dynamics in restricted spaces.",
    image:"https://www.personneltoday.com/wp-content/uploads/sites/8/2026/03/mariella-giancola.jpg",
    summary_hu:"A British Antarctic Survey HR-igazgatója arról mesél, hogyan kezeli a szélsőséges körülmények között, szűk térben dolgozó csapatok dinamikáját és jóllétét. A sarki tapasztalatok meglepően sok tanulságot kínálnak a hétköznapi munkahelyi vezetéshez és a csapatkohézió fenntartásához."
  },
  {
    source:"Personnel Today",category:"HR News",color:"#1e40af",geo:"🇬🇧 UK",
    title:"700 jobs at risk as NCP enters administration",
    title_hu:"700 munkahely veszélybe: az NCP parkolóüzemeltető csőd szélén",
    url:"https://www.personneltoday.com/hr/700-jobs-at-risk-as-ncp-falls-into-administration/",
    published:"2026-03-17T09:35:57.000Z",
    excerpt:"Car park operator NCP enters administration, blaming decreased post-pandemic demand and inflation.",
    image:"https://www.personneltoday.com/wp-content/uploads/sites/8/2026/03/NCP_Shutterstock_2743477297.jpg",
    summary_hu:"Az Egyesült Királyság egyik legnagyobb parkolóüzemeltetője, az NCP felszámolási eljárást kezdeményezett, ami közel 700 munkahelyet veszélyeztet. A cég a pandémia utáni csökkent forgalmat és az infláció hatásait jelölte meg okként – az ügy rámutat a hibrid munkavégzés strukturális hatásaira."
  },
  {
    source:"Personnel Today",category:"HR News",color:"#1e40af",geo:"🇬🇧 UK",
    title:"Research to gauge effectiveness of free workplace health initiatives",
    title_hu:"3,7 millió fontos brit kutatás: hatékonyak-e a munkahelyi egészségprogramok?",
    url:"https://www.personneltoday.com/hr/research-to-gauge-effectiveness-of-free-workplace-health-initiatives/",
    published:"2026-03-17T00:05:48.000Z",
    excerpt:"A £3.7 million research programme is set to investigate the effectiveness of workplace health and wellbeing initiatives.",
    image:"https://www.personneltoday.com/wp-content/uploads/sites/8/2026/03/Small_businesses_Shutterstock_2327106883.jpg",
    summary_hu:"Az Egyesült Királyságban 3,7 millió fontos program indul, hogy tényszerűen értékelje az ingyenes munkahelyi egészség- és jóllétprogramok hatásosságát – különösen a kisvállalkozások körében. Az eredmények meghatározhatják, hogyan allokálják a jövőben a munkáltatók az ezekre fordított erőforrásokat."
  },
  // HR Grapevine
  {
    source:"HR Grapevine",category:"HR News",color:"#7c3aed",geo:"🇬🇧 UK",
    title:"Managing on | The menopause penalty - the high cost of losing mid-life women",
    title_hu:"A menopauza-büntetés: mennyi tehetséget veszítünk el?",
    url:"https://www.hrgrapevine.com/content/article/2026-03-17-the-menopause-penalty-the-high-cost-of-losing-mid-life-women",
    published:"2026-03-17T10:00:00.000Z",
    excerpt:"UK Plc is losing women to the menopause in droves - with legislation now mandated to put in place improved supports.",
    image:"https://www.executivegrapevine.com/uploads/articles/column-menopause-penalty-thumb.jpg",
    summary_hu:"Az Egyesült Királyban kötelező jogszabályalkotás közeledésével égetővé vált a kérdés: miért hagyjuk el a középkorú nők százezreit a munkaerőpiacról? A cikk rámutat, hogy a menopauza miatti munkahelyi nehézségek kezelése nemcsak jogi kötelesség, hanem komoly tehetségmegtartási és versenyképességi tényező."
  },
  {
    source:"HR Grapevine",category:"HR News",color:"#7c3aed",geo:"🇬🇧 UK",
    title:"Youth jobs grant | Government offers cash incentives to employers hiring young unemployed people",
    title_hu:"Brit állami ösztönző: £3000 fiatalt alkalmazó munkáltatóknak",
    url:"https://www.hrgrapevine.com/content/article/2026-03-17-government-offers-cash-incentives-to-employers-hiring-young-benefit-claimants",
    published:"2026-03-17T09:00:00.000Z",
    excerpt:"Government to pay firms £3,000 per hire as youth unemployment nears one million.",
    image:"https://www.executivegrapevine.com/uploads/articles/thumb-firms-to-be-paid-to-hire-unemployed-young-people.jpg",
    summary_hu:"A brit kormány £3000-es támogatást ajánl minden munkáltatónak, aki legalább 6 hónapja munka nélkül lévő fiatalt alkalmaz – a kezdeményezés az ifjúsági munkanélküliség egymillióhoz közelítő szintjére reagál. HR-szakértők üdvözlik az ösztönzőt, de figyelmeztetnek: a munkahely minőségére és a megtartásra is figyelni kell."
  },
  {
    source:"HR Grapevine",category:"HR News",color:"#7c3aed",geo:"🇬🇧 UK",
    title:"'New territory' | 7 in 10 workers lack proper AI training - and admit they're 'experimenting'",
    title_hu:"Ismeretlen terep: a brit dolgozók 70%-a AI-képzés nélkül kísérletezik",
    url:"https://www.hrgrapevine.com/content/article/2026-03-17-7-in-10-workers-lack-proper-ai-training-admit-theyre-experimenting",
    published:"2026-03-17T08:55:00.000Z",
    excerpt:"New research reveals a widening skills gap as experimentation replaces education in UK workplaces.",
    image:"https://www.executivegrapevine.com/uploads/articles/thumb-70-percent-of-employees-lack-ai-training-march26.jpg",
    summary_hu:"Brit felmérés szerint a munkavállalók 70%-a AI-eszközöket használ anélkül, hogy bármilyen formális képzésben részesült volna – és ezt maguk is bevallják. A készséghiány szélesedő szakadékot nyit azok között, akik tudatosan alkalmazzák az AI-t, és azok között, akik csak tapogatódznak."
  },
  {
    source:"HR Grapevine",category:"HR News",color:"#7c3aed",geo:"🇬🇧 UK",
    title:"'Unfair stereotypes' | Be like McDonald's: Why employers must rethink their view on hiring young people",
    title_hu:"Légy olyan, mint a McDonald's: ideje újragondolni a fiatalok toborzását",
    url:"https://www.hrgrapevine.com/content/article/2026-03-16-be-like-mcdonalds-why-employers-must-rethink-their-view-on-hiring-young-people",
    published:"2026-03-17T08:50:00.000Z",
    excerpt:"McDonald's UK employs over 100,000 people under 25, with one in three of its managers under the age of 25.",
    image:"https://www.executivegrapevine.com/uploads/articles/thumb-mcdonalds-shows-why-employers-must-challenge-stereotypes.jpg",
    summary_hu:"A McDonald's UK több mint 100 000 25 év alatti dolgozót foglalkoztat, és a menedzsereik egyharmada is e korosztályból kerül ki – ez az adat önmagában cáfolja a fiatalokkal szemben élő munkahelyi előítéleteket. A cikk arra biztatja a munkáltatókat, hogy adatokra alapozzák felvételi döntéseiket."
  },
  // AIHR
  {
    source:"AIHR",category:"HR Fejlesztés",color:"#0891b2",geo:"🌍 Globális",
    title:"Termination Letter: Free Template, Sample & Examples",
    title_hu:"Felmondólevél sablon és útmutató HR-eseknek",
    url:"https://www.aihr.com/blog/termination-letter-template/",
    published:"2026-03-17T11:21:55.000Z",
    excerpt:"A well-written employee termination letter helps employers document the decision clearly and reduce the risk of disputes.",
    image:"https://www.aihr.com/wp-content/uploads/Termination-Letter-Template-Thumbnail-2.png",
    summary_hu:"Havonta 1,8 millió munkaviszony szűnik meg munkáltatói döntés alapján az USA-ban – és egy jól megírt felmondólevél nemcsak jogi kockázatot csökkent, hanem emberibbé teszi a folyamatot. Az AIHR ingyenes sablonokat és példákat kínál, amelyek segítenek a HR-eseknek egységesen és szakszerűen kommunikálni."
  },
  // Josh Bersin
  {
    source:"Josh Bersin",category:"HR Strategy",color:"#92400e",geo:"🌍 Globális",
    title:"Workday and Sana Unveil A Bold New Strategy For AI",
    title_hu:"Workday + Sana: merész AI-stratégia a HR-tech piacon",
    url:"https://joshbersin.com/2026/03/workday-and-sana-unveil-a-bold-new-strategy-for-ai/",
    published:"2026-03-17T13:03:52.000Z",
    excerpt:"Workday announced a bold and ambitious AI strategy around its new technology platform Sana.",
    image:"https://joshbersin.com/wp-content/uploads/2026/03/wd-sana-banner.jpg",
    summary_hu:"A Workday és a Sana AI-platform szövetsége egy új generációs HR-technológiai modellt jelez: az AI-ügynökök és a tanulástámogatás összeolvad egyetlen platform keretében. Josh Bersin elemzi, mit jelent ez a CHROk és a vállalati HR-tech döntéshozóknak."
  },
  // MIT Sloan
  {
    source:"MIT Sloan",category:"Leadership & Strategy",color:"#9f1239",geo:"🌍 Globális",
    title:"Bridge the Intergenerational Leadership Gap",
    title_hu:"Generációs vezető-szakadék: hogyan hídaljuk át?",
    url:"https://sloanreview.mit.edu/article/bridge-the-intergenerational-leadership-gap/",
    published:"2026-03-17T11:00:34.000Z",
    excerpt:"Today's workforce spans five generations, with millennials and Generation Z together accounting for over 60% of workers globally.",
    image:"https://sloanreview.mit.edu/wp-content/uploads/2026/03/Rudiger-2400x1260-1-1200x630.jpg",
    summary_hu:"A mai munkaerőpiacon öt generáció dolgozik egymás mellett, a millenniálok és a Z-generáció együttesen a munkavállalók több mint 60%-át teszik ki – mégis a döntéshozatali hatalom egyre idősebb kezekben összpontosul. Az MIT Sloan kutatói rámutatnak, hogyan csökkenthető ez a generációs vezető-szakadék."
  },
  // HRM Asia
  {
    source:"HRM Asia",category:"HR News",color:"#065f46",geo:"🌏 Ázsia",
    title:"The invisible interview: How AI is reshaping employer brand",
    title_hu:"A láthatatlan interjú: hogyan formálja az AI a munkáltatói márkát?",
    url:"https://hrmasia.com/the-invisible-interview-how-ai-is-reshaping-employer-brand/",
    published:"2026-03-17T07:57:53.000Z",
    excerpt:"AI has inserted itself into the earliest stages of the job search, building narratives about employers that most CHROs have never considered.",
    image:"https://hrmasia.com/wp-content/uploads/2026/03/171363156_m-1024x683.jpg",
    summary_hu:"Az álláskereső az ajánlat előtt már meginterjúvolja a munkáltatót – csak nem emberrel, hanem AI-eszközzel. A ChatGPT és hasonló modellek egyre inkább formálják az employer brand narratíváját, sokszor anélkül, hogy a CHRO tudna erről. A cikk arra sürgeti a HR-t, hogy aktívan kezelje ezt az új csatornát."
  },
  {
    source:"HRM Asia",category:"HR News",color:"#065f46",geo:"🌏 Ázsia",
    title:"Business leaders in Asia-Pacific build resilience through AI and regional trade",
    title_hu:"Ázsia-Csendes-óceáni régió: AI-jal és kereskedelemmel erősítik a rezilienciát",
    url:"https://hrmasia.com/business-leaders-in-asia-pacific-build-resilience-through-ai-and-regional-trade/",
    published:"2026-03-17T02:00:53.000Z",
    excerpt:"Leaders in the region are growing more confident despite falling revenue expectations, doubling down on talent and AI.",
    image:"https://hrmasia.com/wp-content/uploads/2026/03/246194710_m-1024x683.jpg",
    summary_hu:"A régió üzleti vezetői növekvő bizalommal tekintenek előre, annak ellenére, hogy a bevételi várakozások visszaesnek – tehetségbe és AI-ba fektetnek a globális bizonytalanság ellensúlyozásáért. A felmérés szerint a tehetségmegtartás és az AI-kompetencia a két legfontosabb stratégiai prioritás."
  },
  // HR.Asia
  {
    source:"HR.Asia",category:"HR News",color:"#0369a1",geo:"🌍 Globális",
    title:"New Mitratech Research Finds HR Compliance Complexity Rising as Talent Pressures and AI Adoption Accelerate",
    title_hu:"2026-os HR megfelelőségi riport: egyre komplexebb, egyre kockázatosabb",
    url:"https://hr.asia/globenewswire/new-mitratech-research-finds-hr-compliance-complexity-rising-as-talent-pressures-and-ai-adoption-accelerate/",
    published:"2026-03-17T14:00:00.000Z",
    excerpt:"The State of HR Compliance 2026 report reveals a growing governance gap as organizations scale automation while regulatory expectations expand.",
    image:"https://ml.globenewswire.com/media/ODM3MzNmM2ItMWE5OS00YjMzLTk4ZjUtYTA1YmE2MmE4ZDYwLTUwMDE1OTg1MS0yMDI2LTAzLTE3LWVu/tiny/Mitratech.png",
    summary_hu:"A Mitratech friss kutatása szerint a HR-megfelelőség egyre összetettebb feladattá válik: az automatizáció szélesítése és a szigorodó szabályozások között komoly irányítási szakadék alakult ki. A szervezetek 2026-ban egyszerre kell megbirkózniuk az AI-bevezetéssel és a növekvő compliance-elvárásokkal."
  },
  {
    source:"HR.Asia",category:"HR News",color:"#0369a1",geo:"🇬🇧 UK",
    title:"PwC planning to increase the number of graduates it takes on",
    title_hu:"PwC: az AI ellenére több végzőst vesznek fel",
    url:"https://hr.asia/uk/pwc-planning-to-increase-the-number-of-graduates-it-takes-on/",
    published:"2026-03-17T10:40:28.000Z",
    excerpt:"PwC plans to increase the number of graduates it takes on next year, brushing aside concerns that AI was undermining hiring.",
    image:"https://hr.asia/2017/wp-content/uploads/2024/03/pwc-australia-office.webp",
    summary_hu:"A PwC UK-vezete megerősítette, hogy a cég a jövőre növeli a pályakezdők felvételét – annak ellenére, hogy az AI-ról szóló viták miatt sokan a friss diplomások keresletének csökkenésére számítanak. A döntés üzenetet küld a piacnak: az emberi tehetség pótolhatatlan, még az AI-korszakban is."
  },
  {
    source:"HR.Asia",category:"HR News",color:"#0369a1",geo:"🌏 Ázsia",
    title:"Samenta urges review of law on ad-hoc holidays",
    title_hu:"Malajzia: kkv-k 3 hónapos előzetes értesítést kérnek rendkívüli ünnepnapokhoz",
    url:"https://hr.asia/top-news/malaysia/samenta-urges-review-of-law-on-ad-hoc-holidays/",
    published:"2026-03-17T10:31:06.000Z",
    excerpt:"Samenta has called on the government to amend the Public Holidays Act to allow declaration of additional holidays with at least three months notice.",
    image:"https://hr.asia/2017/wp-content/uploads/2021/09/Datuk-William-Ng-Managing-Director-of-Audience-Analytics-3-scaled.jpg",
    summary_hu:"A Maláj Kis- és Középvállalkozások Szövetsége törvénymódosítást sürget, amely legalább 3 hónapos előzetes értesítést írna elő ad hoc munkaszüneti napok esetén. A jelenlegi rendszer – ahol a kormány szinte azonnal rendelhet el szabadnapot – komoly tervezési és HR-gazdálkodási kihívást jelent."
  },
  // HCA Mag Asia
  {
    source:"HCA Mag Asia",category:"HR News",color:"#065f46",geo:"🌍 Globális",
    title:"AI is quietly redrawing career paths – and the divide is already visible",
    title_hu:"Az AI csendben átrajzolja a karrierutakat – a szakadék már látható",
    url:"https://www.hcamag.com/asia/news/general/ai-is-quietly-redrawing-career-paths-and-the-divide-is-already-visible/568924",
    published:"2026-03-18T03:57:14.000Z",
    excerpt:"Workers who master everyday AI tools like ChatGPT are earning significantly more, getting promoted faster.",
    image:"https://cdn-res.keymedia.com/cms/images/us/037/0391_639094030245308137.png",
    summary_hu:"Akik aktívan használják az AI-eszközöket, magasabb fizetést kapnak, gyorsabban lépnek előre, és háttérbe szorítják azokat, akik nem. Az új kutatás szerint az AI-kompetencia a következő évek legmeghatározóbb karrieregyenlőtlenségi tényezőjévé válik."
  },
  {
    source:"HCA Mag Asia",category:"HR News",color:"#065f46",geo:"🌍 Globális",
    title:"Creativity over coding: The new preference in the AI era",
    title_hu:"AI-korszak: a kreativitás fontosabb lett a kódolásnál",
    url:"https://www.hcamag.com/asia/news/general/creativity-over-coding-the-new-preference-in-the-ai-era/568906",
    published:"2026-03-18T00:53:31.000Z",
    excerpt:"Hiring managers see more value in creative workers, report finds",
    image:"https://cdn-res.keymedia.com/cms/images/us/035/0365_639093920072448300.jpg",
    summary_hu:"Egy friss kutatás szerint a toborzók egyre többre értékelik a kreatív készségeket a technikai kompetenciákkal szemben – az AI elvégzi a rutinfeladatokat, de az emberek egyedi hozzáadott értéke a kreativitásban rejlik. Ez alapvetően átírja azt, amit a tehetségek értékelésénél figyelembe kell venni."
  },
  {
    source:"HCA Mag Asia",category:"HR News",color:"#065f46",geo:"🌍 Globális",
    title:"Employees are rejecting leadership's AI vision despite big push from the top",
    title_hu:"Munkavállalók elutasítják a vezetés AI-vízióját",
    url:"https://www.hcamag.com/asia/news/general/employees-are-rejecting-leaderships-ai-vision-despite-big-push-from-the-top/568910",
    published:"2026-03-17T23:27:15.000Z",
    excerpt:"Only leadership views AI as a teammate, the rest of the workforce doesn't, report finds",
    image:"https://cdn-res.keymedia.com/cms/images/us/035/0365_639093868321086874.png",
    summary_hu:"Miközben a felsővezetők az AI-t csapattársnak tekintik, a munkavállalók többsége nem osztja ezt a lelkesedést – sőt, aktívan ellenáll a bevezetési törekvéseknek. A szakadék kezelése most a HR legfontosabb change management feladata lett."
  },
  // HRZone
  {
    source:"HRZone",category:"HR Strategy",color:"#6b21a8",geo:"🇬🇧 UK",
    title:"HR isn't \"bloated\". The debate is just oversimplified",
    title_hu:"A HR nem 'elhízott' – csak az érvelés leegyszerűsített",
    url:"https://hrzone.com/hr-isnt-bloated-the-debate-is-just-oversimplified/",
    published:"2026-03-17T08:00:00.000Z",
    excerpt:"A recent Times feature argues UK HR teams have become bloated, costing the economy £10bn. Rena Christou explains why this oversimplifies reality.",
    image:"https://hrzone.com/app/uploads/2026/03/vslbaidhwau-e1773230179628.jpg",
    summary_hu:"Egy brit lapban megjelent cikk szerint az Egyesült Királyság HR-csapatai 10 milliárd fontos terhet jelentenek a gazdaságnak – de az Empowering People Group vezérigazgatója szerint ez a megfogalmazás hamis és káros. A cikk elemzi, miért árnyalatlanabb a valóság, és miért veszélyes a HR-t feleslegesként beállítani."
  },
  // Personalwirtschaft
  {
    source:"Personalwirtschaft",category:"HR News",color:"#1d4ed8",geo:"🇩🇪 Németország",
    title:"Generative Engine Optimization: Die wichtigsten Messgrößen",
    title_hu:"GEO mérőszámok: hogyan mérd az AI-alapú keresési optimalizálás hatását?",
    url:"https://www.personalwirtschaft.de/news/recruiting/generative-engine-optimization-die-wichtigsten-messgroessen-201888/",
    published:"2026-03-17T17:14:38.000Z",
    excerpt:"Die Frage nach dem ROI von GEO-Maßnahmen treibt viele HR-Abteilungen um.",
    image:"https://www.personalwirtschaft.de/wp-content/uploads/2026/03/PW-Headerbild-82.jpg",
    summary_hu:"A Generative Engine Optimization (GEO) egyre fontosabb HR-marketing eszközzé válik – de a megtérülés mérése nem egyértelmű. A Personalwirtschaft összegyűjtötte a legfontosabb KPI-okat, amelyekkel a HR-osztályok nyomon követhetik, mennyire láthatók az AI-alapú keresőkben."
  },
  {
    source:"Personalwirtschaft",category:"HR News",color:"#1d4ed8",geo:"🇩🇪 Németország",
    title:"Die sieben größten Fehler bei der GEO-Optimierung",
    title_hu:"GEO optimalizálás: a 7 leggyakoribb hiba, amit a HR-es elkövet",
    url:"https://www.personalwirtschaft.de/news/recruiting/die-sieben-groessten-fehler-bei-der-geo-optimierung-201882/",
    published:"2026-03-17T17:01:43.000Z",
    excerpt:"Bei der GEO-Optimierung von Karriereseiten und Stellenanzeigen gibt es Fehler, die den Erfolg gefährden können.",
    image:"https://www.personalwirtschaft.de/wp-content/uploads/2026/03/PW-Headerbild-81.jpg",
    summary_hu:"A karrieroldalak és álláshirdetések AI-keresőkre való optimalizálásában tipikusan hét hiba fordul elő leggyakrabban. A cikk gyakorlati útmutatót kínál arra, hogyan kerüljük el őket, és hogyan tegyük valóban találhatóvá a toborzási tartalmainkat."
  },
  {
    source:"Personalwirtschaft",category:"HR News",color:"#1d4ed8",geo:"🇩🇪 Németország",
    title:"GEO: Der Vier-Phasen-Plan",
    title_hu:"GEO négy fázisban: tartalomstratégia az AI-keresők korában",
    url:"https://www.personalwirtschaft.de/news/recruiting/geo-der-vier-phasen-plan-201864/",
    published:"2026-03-17T16:30:34.000Z",
    excerpt:"GEO-Optimierung klingt nach einem IT-Projekt. Tatsächlich ist es vor allem Content-Arbeit.",
    image:"https://www.personalwirtschaft.de/wp-content/uploads/2026/03/PW-Headerbild-80.jpg",
    summary_hu:"A Generative Engine Optimization nem IT-projekt, hanem tartalomstratégiai feladat – és négy jól definiált fázissal kezelhető. A cikk lépésről lépésre vezeti végig a HR-es és employer branding csapatokat a saját GEO-stratégiájuk felépítésén."
  },
  {
    source:"Personalwirtschaft",category:"HR News",color:"#1d4ed8",geo:"🇩🇪 Németország",
    title:"GEO-Check: Sind Ihre Karriereseiten sichtbar und zitierfähig für KI?",
    title_hu:"GEO-ellenőrző: mennyire látható a karrieroldalad az AI-ban?",
    url:"https://www.personalwirtschaft.de/news/recruiting/geo-check-sind-ihre-karriereseiten-sichtbar-und-zitierfaehig-fuer-ki-201838/",
    published:"2026-03-17T14:05:28.000Z",
    excerpt:"Die Personalwirtschaft stellt ein neues Tool zur Optimierung Ihrer Karriereseite und Stellenausschreibungen vor.",
    image:"https://www.personalwirtschaft.de/wp-content/uploads/2026/03/GEO-Check-Aufmacherbild.jpg",
    summary_hu:"A Personalwirtschaft ingyenes GEO-ellenőrzőeszközt vezet be, amellyel karrieroldalak és álláshirdetések AI-láthatósága mérhető. A kérdés már nem az, hogy SEO-kompatibilis-e az álláshirdetés – hanem az, hogy az AI hivatkozza-e rá."
  },
  {
    source:"Personalwirtschaft",category:"HR News",color:"#1d4ed8",geo:"🇩🇪 Németország",
    title:"Employer Branding: Wer beim Gehalt schweigt, verliert den Wettbewerb",
    title_hu:"Employer branding: aki hallgat a fizetésről, elveszíti a versenyt",
    url:"https://www.personalwirtschaft.de/news/recruiting/employer-branding-wer-beim-gehalt-schweigt-verliert-den-wettbewerb-201812/",
    published:"2026-03-17T10:49:28.000Z",
    excerpt:"Gehaltstransparenz ist kein juristisches Pflichtprogramm, sondern ein unterschätzter Hebel für Employer Branding.",
    image:"https://www.personalwirtschaft.de/wp-content/uploads/2025/05/20250528_merheim-neues-format.jpg",
    summary_hu:"A bértransparencia már nem csupán jogi kötelezettség, hanem az employer branding egyik legerősebb eszköze – azok a cégek, amelyek nyíltan kommunikálnak a fizetési sávokról, jobb jelölteket vonzanak. A cikk bemutatja, hogyan lehet a bérkommunikációt versenyelőnnyé formálni."
  },
  {
    source:"Personalwirtschaft",category:"HR News",color:"#1d4ed8",geo:"🇩🇪 Németország",
    title:"BGM bei der Deka: \"Es braucht eine gewisse Kontinuität der Angebote\"",
    title_hu:"Deka-csoport BGM-sikertörténete: 93%-os részvételi arány",
    url:"https://www.personalwirtschaft.de/news/personalentwicklung/deka-mit-dem-bgm-unterstuetzen-wir-eine-nachhaltige-personalstrategie-201696/",
    published:"2026-03-17T08:08:57.000Z",
    excerpt:"Eine Registrierungsquote von 93 Prozent: Bei der Deka-Gruppe kommen BGM-Angebote besser an als in vielen anderen Unternehmen.",
    image:"https://www.personalwirtschaft.de/wp-content/uploads/2026/03/Design-ohne-Titel-2026-03-13T123056.604.jpg",
    summary_hu:"A Deka-csoport egészségmenedzsment programjára a munkavállalók 93%-a regisztrált – kiemelkedő arány a piacon. A felelős vezető szerint a kulcs a folyamatos és következetes ajánlatkínálat, nem az egyszeri kampányok – ez a HR és a wellbeing terén általánosan alkalmazható elv."
  },
  // Parlons RH
  {
    source:"Parlons RH",category:"HR News",color:"#2563eb",geo:"🇫🇷 Franciaország",
    title:"Femmes-hommes au travail : des inégalités à tous les étages",
    title_hu:"Nők és férfiak a munkahelyen: az egyenlőtlenség minden szinten jelen van",
    url:"https://www.parlonsrh.com/femmes-hommes-au-travail-des-inegalites-a-tous-les-etages/",
    published:"2026-03-17T13:00:00.000Z",
    excerpt:"Les inégalités professionnelles traversent toute l'entreprise, du quotidien aux plus hautes sphères de pouvoir.",
    image:"https://www.parlonsrh.com/app/uploads/sites/3/2026/03/infographie-2.jpg",
    summary_hu:"Egy friss francia elemzés szerint a nemi egyenlőtlenségek a hétköznapi munkavégzéstől a csúcsvezetői pozíciókig az egész vállalati hierarchiában jelen vannak. A Parlons RH cikke adatokkal mutatja be, hol a legszembetűnőbb a szakadék, és miért nem elegendő a szabályozás önmagában."
  }
];

// Add IDs and addedAt
const now = new Date().toISOString();
const existingUrls = new Set(existing.articles.map(a => a.url));
const toAdd = newArticles
  .filter(a => !existingUrls.has(a.url))
  .map(a => ({ ...a, id: makeId(a.published), addedAt: now }));

console.log('Adding', toAdd.length, 'new articles');

// Remove articles older than 30 days
const cutoff = new Date(Date.now() - 30*24*60*60*1000).toISOString();
const kept = existing.articles.filter(a => a.published >= cutoff);

const mergedSeen = new Set();
const deduped = [...toAdd, ...kept].filter(a => {
  if (mergedSeen.has(a.url)) return false;
  mergedSeen.add(a.url);
  return true;
});

const updated = {
  lastUpdated: now,
  articles: deduped
};

fs.writeFileSync(newsPath, JSON.stringify(updated, null, 2), 'utf8');
console.log('Done. Total articles:', updated.articles.length);
