const fs = require('fs');
const path = require('path');

const NOW = new Date().toISOString();
const newsPath = path.join(__dirname, '../public/data/news.json');

const newArticles = [
  // ===== USA (8) =====
  {
    source: "Harvard Business Review",
    category: "Leadership & Strategy",
    color: "#c0392b",
    geo: "🇺🇸 USA",
    title: "Getting Ready for Agentic AI",
    title_hu: "Felkészülés az agentic AI-korra: mit kell tudni?",
    url: "https://hbr.org/2026/03/bill-ready-hbre-live",
    published: "2026-03-25T12:25:16.000Z",
    addedAt: NOW,
    excerpt: "An HBR Executive Live conversation with Pinterest CEO Bill Ready.",
    summary_hu: "Az agentic AI megjelenése alapjaiban formálja át a szervezetek működését – a Pinterest vezérigazgatója az HBR Executive Live eseményen elmondta, mit jelent ez a vállalatok számára. A döntéshozók számára a kérdés már nem az, hogy bevezetik-e, hanem hogyan irányítják ezt az átmenetet.",
    full_hu: "Az AI következő fejlődési hulláma, az agentic AI – amely önállóan hajt végre összetett feladatsorozatokat – megérkezett a nagyvállalati döntéstermekbe. A Pinterest vezérigazgatója, Bill Ready egy exkluzív HBR Executive Live párbeszédben osztotta meg, milyen kihívások és lehetőségek várnak a szervezetekre ebben az új korszakban.\n\nAz agentikus AI lényege, hogy nem csupán kérdésekre válaszol, hanem önállóan tervez, dönt és végrehajt – emberi felügyelet mellett. Ez radikálisan megváltoztatja a munkafolyamatokat: egyes feladatokat teljes egészében automatizálhat, míg másokat emberi és gépi szereplők együttesen végeznek majd. A HR számára ez egyszerre jelent szervezeti tervezési kérdést és munkavállalói felkészítési feladatot.\n\nA vezető HR szakembereknek most kell meghatározniuk, milyen kompetenciákra lesz szükség az agentic AI-val együtt dolgozó csapatokban. A felkészülés nem csak technológiai – a szervezeti kultúra, a bizalom és a döntéshozatali felelősség kérdéseit is újra kell gondolni. Azok a vállalatok, amelyek most fektetnek a munkavállalók alkalmazkodóképességébe, tartós versenyelőnyre tesznek szert."
  },
  {
    source: "Harvard Business Review",
    category: "Leadership & Strategy",
    color: "#c0392b",
    geo: "🇺🇸 USA",
    title: "How Leaders Can Build a High-Agency Culture",
    title_hu: "Magas autonómia, jobb teljesítmény: hogyan építs high-agency kultúrát?",
    url: "https://hbr.org/2026/03/how-leaders-can-build-a-high-agency-culture",
    published: "2026-03-25T12:05:00.000Z",
    addedAt: NOW,
    excerpt: "The psychology of rewiring your company's invisible belief systems.",
    summary_hu: "A high-agency szervezeti kultúra – ahol a munkavállalók felhatalmazva érzik magukat cselekedni és dönteni – nemcsak motiváló, hanem üzletileg is felülmúl. Az HBR elemzése megmutatja, hogyan érdemes átprogramozni a szervezet láthatatlan hiedelemrendszerét.",
    full_hu: "A szervezetekben mélyen rögzült hiedelmek határozzák meg, ki dönthet, ki cselekedhet, és ki felelős az eredményekért. A high-agency kultúra ezeket a láthatatlan korlátokat számoltatja fel – és az eredmény nemcsak motiváltabb munkatársak, hanem gyorsabb alkalmazkodás és jobb üzleti teljesítmény.\n\nAz HBR kutatása szerint a high-agency szervezetek legfontosabb jellemzője, hogy a munkavállalók nem várnak engedélyre a cselekvéshez – tudják, milyen kereteken belül hozhatnak önálló döntéseket. A vezetők szerepe ebben nem az utasítás, hanem a keretek és a bizalom megteremtése. Ez a hozzáállás különösen az AI-transzformáció korában válik kritikussá, amikor a gyors tanulás és alkalmazkodás fontosabb, mint az utasítások pontos követése.\n\nHR-szempontból a high-agency kultúra kiépítése konkrét fejlesztési programokat igényel: a döntési hatáskörök tudatos delegálását, a pszichológiai biztonság erősítését, és a teljesítménymenedzsment olyan átalakítását, amely az eredményt jutalmazza, nem a feladatvégrehajtás módját. A befektetés megtérülése kétoldalú: a munkavállalói tapasztalat javul, a szervezet pedig rugalmasabbá válik."
  },
  {
    source: "HR Executive",
    category: "AI & Technology",
    color: "#2980b9",
    geo: "🇺🇸 USA",
    title: "AI as a performance requirement? Employees, managers are divided",
    title_hu: "AI-használat mint teljesítményelvárás: a vezetők és a munkavállalók nem értenek egyet",
    url: "https://hrexecutive.com/ai-as-a-performance-requirement-employees-managers-are-divided/",
    published: "2026-03-25T12:30:16.000Z",
    addedAt: NOW,
    excerpt: "New research finds a divide between managers and employees when it comes to how they think AI use impacts perceptions of performance.",
    summary_hu: "Új kutatás tárja fel: a menedzserek és a munkavállalók alapvetően másképp gondolkodnak arról, hogy az AI-eszközök használata befolyásolja-e a teljesítmény megítélését. Ez a percepciós szakadék komoly HR-kihívássá nőtte ki magát.",
    full_hu: "Az AI-eszközök elterjedésével a szervezetekben egyre több vezető kezdi el elvárásként kezelni azok használatát – ám a munkavállalók nem feltétlenül osztják ezt a megközelítést. Egy friss kutatás szerint komoly percepciós szakadék van az AI-teljesítmény-kapcsolat megítélésében: a menedzserek zöme úgy véli, az AI aktív használata pozitívan befolyásolja a teljesítményértékelést, a munkavállalók viszont inkább bizonytalanságot éreznek.\n\nA kutatás rámutat arra, hogy az AI-elvárások kommunikációja sok helyen hiányos vagy félrevezető. Azok a munkavállalók, akik nem kapnak egyértelmű útmutatást arról, mikor és hogyan kell AI-t alkalmazni, hajlamosak kerülni az eszközöket – attól tartva, hogy a használat gyengeséget vagy lustaságot sugall. A menedzserek viszont éppen az ellenkezőjét gondolják.\n\nA HR-nek kulcsszerepe van ebben a dinamikában: az AI-elvárásokat explicit teljesítménykeretrendszerbe kell ágyazni, és tisztázni kell, melyek azok a feladatok, ahol az AI-használat elvárt, támogatott vagy opcionális. A hallgatás most hosszabb távon meghatározza, ki lesz képes az AI-korszak munkaerőpiacán versenyképes maradni."
  },
  {
    source: "HR Executive",
    category: "AI & Technology",
    color: "#2980b9",
    geo: "🇺🇸 USA",
    title: "Why HR must lead the AI era—not react to it",
    title_hu: "HR-stratégia az AI-korban: vezess, ne kövess",
    url: "https://hrexecutive.com/why-hr-must-lead-the-ai-era-not-react-to-it/",
    published: "2026-03-25T12:15:04.000Z",
    addedAt: NOW,
    excerpt: "How organizations adopt AI through their people strategy will determine whether AI transformation becomes one of growth or distrust.",
    summary_hu: "Az AI-transzformáció kimenetelét alapvetően az dönti el, hogyan viszonyul hozzá a HR. Aki most csak reagál az eseményekre, lemarad; aki stratégiailag vezet, hosszú távú bizalmat és növekedést épít.",
    full_hu: "Az AI bevezetése a szervezetekben nem technológiai, hanem emberügyi kérdés – és ez pontosan az a terep, ahol a HR-nek az élen kell járnia. Az HR Executive elemzése szerint azok a vállalatok, amelyek az AI-t a személyzeti stratégia részeként kezelik – nem utólag toldják hozzá a folyamatokhoz –, sokkal hatékonyabb és fenntarthatóbb átalakuláson mennek keresztül.\n\nA reaktív HR-megközelítés csapdája jól ismert: a technológia megjelenik, az üzleti egységek bevezetik, és a HR utólag próbálja kezelni a következményeket – legyen az ellenállás, képzési igény vagy kommunikációs zavar. A proaktív HR ezzel szemben már a tervezési fázisban ott van: meghatározza, milyen kompetenciákra lesz szükség, hogyan változnak a szerepkörök, és milyen keretek szükségesek az emberi döntéshozatal megőrzéséhez.\n\nAz AI-kori HR-vezetés három pillére: a változásmenedzsment tudatos kezelése, a munkavállalói bizalom kiépítése és az új munkakör-architektúrák tervezése. Azok a CHRO-k, akik most kialakítják az AI-stratégiájukat, nem csupán folyamatokat optimalizálnak – szervezeti örökséget teremtenek."
  },
  {
    source: "HR Executive",
    category: "Talent Management",
    color: "#2980b9",
    geo: "🇺🇸 USA",
    title: "Why internal mobility is now a business imperative for HR",
    title_hu: "Belső mobilitás: az AI-korszak legfontosabb tehetségstratégiája",
    url: "https://hrexecutive.com/why-internal-mobility-is-now-a-business-imperative-for-hr/",
    published: "2026-03-24T11:30:24.000Z",
    addedAt: NOW,
    excerpt: "HR leader Aly Sparks on how internal mobility helps close skills gaps, support blended workforces and keep talent moves human in an AI era.",
    summary_hu: "A belső mobilitás ma már nem opcionális juttatás, hanem üzleti szükségszerűség. Segít betölteni a készséghiányokat, megtartja a tehetségeket, és emberivé teszi a karrierfejlődést egy AI-vezérelt munkaerőpiacon.",
    full_hu: "Miközben a munkaerőpiac átalakul és az AI egyre több szerepkört érint, a tehetségmegtartás és a készséghiányok kezelése a szervezetek egyik legsürgetőbb problémájává vált. Az HR Executive interjúja Aly Sparks HR-vezetővel rámutat: a belső mobilitás az egyik legerősebb válasz ezekre a kihívásokra.\n\nA belső mobilizáció lényege, hogy a szervezet először a saját embereit keresi a megüresedő pozíciók betöltésére – ahelyett, hogy reflexszerűen a külső munkaerőpiachoz fordulna. Ez nemcsak költséghatékonyabb, hanem a munkavállalói élményt is javítja: az emberek látják, hogy van jövőjük a cégnél. A vegyes munkaerő-összetétel (AI + emberi) korában ez különösen fontos, hiszen a szerepkörök gyorsan változnak, és a belső átképzés sokszor gyorsabb és olcsóbb, mint az újrafelvétel.\n\nSparks hangsúlyozza: a sikeres belső mobilitás nem véletlenszerű, hanem tervezett folyamat. Ehhez karrierút-átláthatóság, menedzseri felkészítés és rendszeres készségfelmérés szükséges. A HR-nek aktívan be kell töltenie a közvetítő szerepet az üzleti igények és a munkavállalói aspirációk között – ez az a terület, ahol az emberi ítélőképesség pótolhatatlan marad."
  },
  {
    source: "HR Dive",
    category: "DEI & Inclusion",
    color: "#16a085",
    geo: "🇺🇸 USA",
    title: "Why paid sick leave is a DEI issue",
    title_hu: "A fizetett betegszabadság hiánya DEI-kérdés is egyszerre",
    url: "https://www.hrdive.com/news/paid-sick-leave-pre-emption-states-2026/815696/",
    published: "2026-03-25T16:43:00.000Z",
    addedAt: NOW,
    excerpt: "A National Partnership for Women & Families report shows how the geography of 'pre-emption' states can disproportionately affect certain groups.",
    summary_hu: "Egy friss amerikai kutatás megmutatja: a fizetett betegszabadság-hozzáférés egyenlőtlenségei rasszal, nemmel és jövedelemmel korrelálnak. A probléma egyszerre szabályozási és méltányossági kérdés.",
    full_hu: "Az Egyesült Államokban az állami szintű preemption törvények megakadályozzák, hogy egyes helyi önkormányzatok fizetett betegszabadságra vonatkozó szabályokat vezessenek be – és az érintett munkavállalók köre korántsem véletlenszerű. A National Partnership for Women & Families új elemzése szerint ezek a szabályozási hiányok aránytalanul érintik az alacsony jövedelmű, fekete és latin-amerikai munkavállalókat.\n\nA kutatás rámutat: a betegszabadság-hozzáférés nemcsak egészségügyi, hanem gazdasági és méltányossági kérdés. Azok a munkavállalók, akiknek nincs fizetett betegnapjuk, kénytelenek betegen dolgozni, lemondani bevételről, vagy akár elveszíteni állásukat. A nők és kisgyermekes szülők különösen kiszolgáltatottak, hiszen a gyermekbetegség kezelése sokszor rájuk hárul.\n\nHR-szempontból ez az adatsor arra hívja fel a figyelmet, hogy a DEI-stratégiák csak akkor érvényesek, ha a juttatáspolitika is átfogja a méltányosság kérdését. A fizetett betegszabadság nem csupán munkavállalói elégedettségi tényező, hanem az egyenlő esélyek alapfeltétele – és a tudatos munkáltatók számára erős érv a komprehenzív betegszabadság-politika mellett."
  },
  {
    source: "HR Reporter",
    category: "Workforce News",
    color: "#8e44ad",
    geo: "🇨🇦 Kanada",
    title: "Harley-Davidson, Epic Games and Algoma Steel slash jobs as economic pressure bites",
    title_hu: "Tömeges leépítések: Harley-Davidson, Epic Games és Algoma Steel is vágja a létszámot",
    url: "https://www.hrreporter.com/news/hr-news/harley-davidson-epic-games-and-algoma-steel-slash-jobs-as-economic-pressure-bites/394218",
    published: "2026-03-25T15:37:42.000Z",
    addedAt: NOW,
    excerpt: "Iconic brands cutting thousands of positions worldwide, as tariffs, tech shifts and waning demand force painful reductions in force",
    summary_hu: "Ikonikus márkák hirdetnek tömeges elbocsátásokat a gazdasági nyomás, a vámháborúk és a technológiai átalakulás hatására. A kanadai munkaerőpiacra is begyűrűzik a globális leépítési hullám.",
    full_hu: "A Harley-Davidson, az Epic Games és az Algoma Steel egyaránt tömeges leépítéseket jelentett be – a lépések háttere különböző, de az üzenet közös: a globális gazdasági és technológiai változások kényszerpályára lökte a nagyvállalatokat. A HR Reporter összefoglalója szerint a vámháborúk, a csökkenő kereslet és az AI-vezérelt automatizáció együttes hatása söpör végig az iparágakon.\n\nA Harley-Davidson a fogyó értékesítési számok és a behozatali vámok emelkedése miatt kénytelen átszervezni gyártási struktúráját, az Epic Games a játékpiaci konszolidáció áldozata, az Algoma Steel pedig az acélipari keresletzuhanás miatt tesz lépéseket. Mindhárom esetben a bejelentések rövid átfutási idővel érkeztek – a munkavállalóknak alig van idejük felkészülni.\n\nA kanadai HR-szakemberek számára ez figyelmeztetés: a tömeges elbocsátások kezelése proaktív válságkommunikációt, transzparens outplacement-támogatást és a munkajogi kötelezettségek szigorú betartását követeli. A munkáltatói márka szempontjából az elbocsátás módja ugyanolyan fontos, mint maga a döntés – ez határozza meg, milyen tehetségeket lehet majd visszacsábítani, ha a gazdasági helyzet javul."
  },
  {
    source: "HRMorning",
    category: "Employee Experience",
    color: "#e67e22",
    geo: "🇺🇸 USA",
    title: "5 Keys to Employee Listening That Drives Real Change",
    title_hu: "5 kulcs a valódi változást hozó munkavállalói visszajelzéshez",
    url: "https://www.hrmorning.com/articles/employee-listening-drives-change/",
    published: "2026-03-25T10:48:00.000Z",
    addedAt: NOW,
    excerpt: "Creating a listening environment where all employees feel heard, supported and motivated.",
    summary_hu: "Az alkalmazotti visszajelzés gyűjtése önmagában kevés – a valódi változás ott kezdődik, ahol a szervezet nemcsak meghallgatja, hanem cselekvésre fordítja az emberek hangjait. Az HRMorning öt konkrét kulcsot azonosított ehhez.",
    full_hu: "A legtöbb szervezet gyűjt munkavállalói visszajelzést – felmérések, pulse checkek, kilépési interjúk formájában. Mégis sokan küzdenek azzal, hogy ezekből az adatokból valódi szervezeti változás szülessen. Az HRMorning elemzése szerint az employee listening sikerét öt tényező határozza meg.\n\nAz első kulcs a folyamatos, nem csupán éves ciklus: az egyszer elvégzett felmérések elavult képet adnak. A második a szegmentált elemzés – az összesített adatok elfedik az egyéni csoportok eltérő tapasztalatait. A harmadik a visszacsatolás zárása: a munkavállalóknak tudniuk kell, mi történt a javaslataikkal. A negyedik a menedzseri felelősség – a csapatszintű eredményeket a közvetlen vezető kell, hogy megkapja és kezelje. Az ötödik a kulturális biztonság: az emberek csak akkor adnak őszinte visszajelzést, ha nem félnek a következményektől.\n\nHR-szemszögből az employee listening program akkor ér valamit, ha valódi döntési inputtá válik – nem csupán éves riporttá a polcon. A munkaerőmegtartás, az elkötelezettség és az abszentizmus mind szorosan összefügg azzal, mennyire érzik a munkavállalók, hogy valóban hallják a hangjukat."
  },

  // ===== EU (8) =====
  {
    source: "Y2Y",
    category: "Y2Y Blog",
    color: "#DED114",
    geo: "🇭🇺 Magyar",
    title: "Hogy fogjuk megoldani a back-sittinget? És főleg ki?",
    title_hu: "Back-sitting: ki fogja megoldani, és hogyan?",
    url: "https://www.y2y.hu/blog/hogy-fogjuk-megoldani-a-back-sittinget-es-foleg-ki",
    published: "2026-03-25T18:03:17.360Z",
    addedAt: NOW,
    image: "https://www.y2y.hu/storage/gallery/images/2025/10/03/Zud37D7BlXNDfbUU74ZdZcQVL7v1rWfL3dvVHany.jpg",
    excerpt: "Állati nagyot megy a back-sitting cikkünk, és élek a feltételezéssel, hogy még több helyen érzitek, mint amit én elsőre feltételeztem.",
    summary_hu: "A Y2Y legújabb blogbejegyzése a back-sitting-jelenség visszhangja után felvet egy kényes kérdést: ha mindenki felismerte a problémát, miért nem oldódik meg? A cikk a felelősség és a cselekvés közötti szakadékot járja körbe – Y2Y-s direktséggel.",
    full_hu: "A back-sitting – vagyis az az állapot, amikor a munkavállaló visszatér az irodába, de érdemben nem dolgozik, csak üldögél a jelenlét kedvéért – egyre ismerősebb jelenség a magyar szervezetekben. A Y2Y előző cikke hatalmas visszhangot kapott, mert sokan felismertük benne: ez rólunk szól. Ez a folytatás azzal a kérdéssel foglalkozik, ami ezután természetesen következik: oké, de akkor ki és hogyan csinálja ezt másképp?\n\nA cikk szerint a probléma gyökere nem a munkavállaló lustaságában keresendő, hanem a szervezeti elvárásrendszer és a fizikai jelenlét logikájának ütközésében. Ha az iroda visszatérési kötelezettség, nem pedig együttműködési eszköz, akkor a vissza nem jelent aktív részvétel-t – csak kötelező jelenlétet. A felelősség így elsősorban a szervezeti tervezésé és a vezetői kultúráé, nem az egyéné.\n\nHR-szempontból a back-sitting megszüntetése három dolgot igényel: az irodai idő értelmének újrafogalmazását – mire való a személyes jelenlét valójában? –, csapatszintű egyeztetéseket a rugalmassági keretekről, és vezető-coachingot arról, hogyan tartsák fenn az értelmes munkakapcsolatot – akár távolból, akár közelről."
  },
  {
    source: "Personnel Today",
    category: "DEI & Inclusion",
    color: "#27ae60",
    geo: "🇬🇧 UK",
    title: "Ethnicity and disability pay gap reporting to go ahead",
    title_hu: "Kötelező etnikumi és fogyatékossági bérszakadék-riportálás jön az UK-ban",
    url: "https://www.personneltoday.com/hr/ethnicity-and-disability-pay-gap-reporting-to-go-ahead/",
    published: "2026-03-25T14:37:26.000Z",
    addedAt: NOW,
    excerpt: "The government has confirmed that it will introduce mandatory ethnicity and disability pay gap reporting.",
    summary_hu: "A brit kormány megerősítette: bevezetik a kötelező etnikumi és fogyatékossági bérszakadék-riportálást. Ez a lépés kiterjeszti a nemi béregyenlőség-riportálás gyakorlatát, és új átláthatósági kötelezettséget hoz a munkáltatók számára.",
    full_hu: "Az Egyesült Királyság kormánya bejelentette, hogy a nemi bérszakadék-riportálás mellé bevezeti az etnikumi és fogyatékossági bérszakadék kötelező nyilvánossá tételét is. A döntés régóta várt volt a sokszínűségi és befogadási szószólók körében – a megvalósítás részletei, az időkeret és a szankciórendszer azonban még kidolgozás alatt állnak.\n\nA jelenlegi nemi bérszakadék-riportálási keret tapasztalatai vegyes képet mutatnak: sok munkáltató teljesíti a formai kötelezettséget, de az adatok mögötti okok feltárása és kezelése hiányos. Az etnikumi és fogyatékossági adatokhoz való hozzáférés még nehezebb, hiszen ezeket a munkavállalók önkéntesen adják meg – az adatminőség és -lefedettség biztosítása kulcskihívás lesz.\n\nHR-szempontból a kötelező riportálás bevezetése előtt a szervezeteknek érdemes önkéntes auditot végezni: feltérképezni a meglévő adatbázis lefedettségét, azonosítani a strukturális béregyenlőtlenségeket, és elkészíteni a cselekvési tervet. A riportálás önmagában nem hoz változást – de a nyilvánosság nyomása lökést adhat a tényleges szervezeti reformhoz."
  },
  {
    source: "Personnel Today",
    category: "Employment Law",
    color: "#27ae60",
    geo: "🇬🇧 UK",
    title: "10 employment law changes in April 2026",
    title_hu: "10 foglalkoztatási jogi változás Angliában 2026 áprilisától",
    url: "https://www.personneltoday.com/hr/10-employment-law-changes-in-april-2026/",
    published: "2026-03-24T09:05:24.000Z",
    addedAt: NOW,
    excerpt: "April 2026 brings new measures from the Employment Rights Act as well familiar law changes.",
    summary_hu: "Az Employment Rights Act új rendelkezései és a hagyományos éves jogszabályváltozások együtt április elsejétől lépnek életbe az UK-ban. A HR-eseknek és bérszámfejtőknek most érdemes átnézni az összes érintett területet.",
    full_hu: "Az Egyesült Királyságban április elseje minden évben a foglalkoztatási jogi változások napja – idén azonban a szokásosnál is több változás érkezik, köszönhetően az Employment Rights Act új rendelkezéseinek. Az érintett területek köre a minimálbértől a szülési jogokig, az elbocsátási védelemtől a szabadság számításáig terjed.\n\nA változások között szerepel többek között a hatósági betegszabadság-fizetés és a minimálbér növelése, a munkaidő-nyilvántartási szabályok finomhangolása, és az elbocsátás utáni visszavétel szabályainak pontosítása. A Personnel Today összefoglalója tíz legfontosabb pontot azonosít, amelyeket minden munkáltatónak ismernie kell.\n\nHR-szakemberek számára az üzenet egyértelmű: április előtt érdemes átnézni a folyamatokat és sablonjainkat. A jogszabályi megfelelés elmulasztása nem csupán bírságkockázatot jelent, hanem munkavállalói bizalomvesztést is – különösen, ha a változásokat nem kommunikálják időben és egyértelműen a csapatok felé."
  },
  {
    source: "Personnel Today",
    category: "Employee Experience",
    color: "#27ae60",
    geo: "🇬🇧 UK",
    title: "Half of retail workers would consider quitting over pay errors",
    title_hu: "A kiskereskedők felének elege lehet a bérhiba: sokan lépnének",
    url: "https://www.personneltoday.com/hr/half-of-retail-workers-would-consider-quitting-over-pay-errors/",
    published: "2026-03-25T08:00:13.000Z",
    addedAt: NOW,
    excerpt: "Half of retail workers would consider quitting their jobs over persistent pay errors, a poll has found.",
    summary_hu: "Egy új brit felmérés szerint a kiskereskedelmi munkavállalók fele fontolgatná a kilépést, ha a bérszámfejtési hibák ismétlődnének. A pontosság nem csupán adminisztrációs kérdés – közvetlen munkamegtartási hatása van.",
    full_hu: "A brit kiskereskedelmi szektorban dolgozók körében készített felmérés egyértelmű üzenetet hordoz: a bérszámfejtési hibák nem csupán számviteli problémák, hanem munkavállalói bizalmi kérdések. Minden második kiskereskedelmi dolgozó jelezte, hogy ismétlődő fizetési hibák esetén komolyan fontolgatná a felmondást – ez riasztóan magas arány egy amúgy is magas fluktuációjú szektorban.\n\nA kutatás rámutat, hogy a bérhibák hatása jóval messzebbre terjed a közvetlen anyagi kárnál. Az érintett munkavállalók csökkent bizalommal és elkötelezettséggel dolgoznak tovább; a bizalomvesztés nehezen állítható helyre, még akkor is, ha a hibát rövid időn belül korrigálják. Az ismétlődő hibák különösen veszélyesek – ezek azok, amelyek után a munkavállaló végleg dönt.\n\nHR és bérszámfejtési szempontból az eredmények sürgetik az automatizáció és az emberi ellenőrzés okos kombinációját. A pontos és időbeni fizetés ma már nemcsak jogi kötelezettség, hanem a munkáltatói márkára és megtartásra közvetlen hatást gyakorló stratégiai tényező – különösen ott, ahol a munkaerő-piaci alternatívák könnyen elérhetők."
  },
  {
    source: "HR Grapevine",
    category: "Workplace Culture",
    color: "#8e44ad",
    geo: "🇬🇧 UK",
    title: "Peacemakers | Conflict is on the rise - but is HR rising to the challenge?",
    title_hu: "Növekvő munkahelyi konfliktus: felkészült rá a HR?",
    url: "https://www.hrgrapevine.com/content/article/2026-03-25-conflict-is-on-the-rise-but-is-hr-rising-to-the-challenge",
    published: "2026-03-25T10:30:00.000Z",
    addedAt: NOW,
    excerpt: "Workplace conflict is on the rise – but are HR policies responsible for causing it, and are HR professionals not equipped to deal with it?",
    summary_hu: "A munkahelyi konfliktusok száma emelkedik – és az első kérdés, ami felmerül: a HR szabályozási megközelítése vajon okozza-e ezt, vagy sem elég felszerelt a kezelésére? Az HR Grapevine elemzése szerint mindkettő igaz lehet.",
    full_hu: "Az utóbbi évek szervezeti változásai – a visszatérési mandátumok, az AI-bevezetések, a generációs különbségek élesedése, a csökkentett csapatlétszámok – mind hozzájárulnak a munkahelyi feszültségek növekedéséhez. A HR Grapevine elemzése azt vizsgálja, hogy a HR-funkció és a belső szabályok mennyiben részesei ennek a dinamikának, és hogyan lehetne hatékonyabban beavatkozni.\n\nA kutatók egy paradoxonra hívják fel a figyelmet: azok a formalizált konfliktuskezelési folyamatok, amelyeket a munkáltatók az igazságosság biztosítására vezetek be, sokszor éppen ellenkező hatásúak – eszkalálják a feszültséget, ahelyett, hogy oldanák. A mediáció, az informális beavatkozás és a vezető-coaching jóval hatékonyabban működik, mint a bürokratikus panaszeljárás.\n\nHR-szakemberek számára az üzenet: a konfliktuskezelési kompetenciát érdemes tudatosan fejleszteni – mind a HR-csapaton belül, mind a menedzseri szinten. A korai beavatkozás, a pszichológiai biztonság kultúrájának erősítése és az informális mediáció előtérbe helyezése megelőzhet sok eljárást és fluktuációt. A békecsináló HR hosszabb távon jobb szervezeti klímát és alacsonyabb HR-adminisztrációs terhet teremt."
  },
  {
    source: "Personalwirtschaft",
    category: "AI & Technology",
    color: "#2c3e50",
    geo: "🇩🇪 Németország",
    title: "KI ist eine strategische Bühne, wie HR sie selten hatte",
    title_hu: "A mesterséges intelligencia stratégiai lehetőség a HR számára – ritkán volt ilyen",
    url: "https://www.personalwirtschaft.de/news/personalentwicklung/ki-ist-eine-strategische-buehne-wie-hr-sie-selten-hatte-202099/",
    published: "2026-03-25T07:37:57.000Z",
    addedAt: NOW,
    excerpt: "Unternehmen in Deutschland investieren in KI, aber zu wenig in die Förderung von KI-Kompetenzen.",
    summary_hu: "Monika Wiederhold HR-szakértő szerint a mesterséges intelligencia nem fenyegetés, hanem stratégiai emelvény a HR számára. A német cégek AI-ba fektetnek, de a munkavállalói kompetenciafejlesztés elmarad – ez a HR hatalmas lehetősége.",
    full_hu: "A Personalwirtschaft interjúja Monika Wiederholdot szólaltatja meg, aki szerint a mesterséges intelligencia olyan stratégiai pillanatot kínál a HR-nek, amelyre ritkán volt precedens. A vállalatok Németországban egyre több pénzt fektetnek AI-infrastruktúrába – de alig foglalkoznak azzal, hogy a munkavállalóik hogyan tudják majd ténylegesen alkalmazni ezeket az eszközöket.\n\nWiederhold szerint ez a kompetencia-befektetési hiány pontosan az a rés, amelyet a HR-nek be kell töltenie. Nem csupán tréningprogramok indításáról van szó – hanem arról, hogy a HR legyen az a funkció, amely összeköti az üzleti AI-stratégiát és az emberi képességfejlesztést. Ez a hagyományos adminisztrációs és compliance-fókuszból stratégiai partneri szerepbe emeli a HR-t.\n\nA német kontextusban ez különösen releváns: a munkaügyi együttdöntési jogok és az üzemi tanácsok szerepe miatt az AI-bevezetés eleve HR-koordinációt igényel. Azok a HR-vezetők, akik ezt a szerepet aktívan magukra vállalják, nemcsak szervezeti értéket teremtenek, hanem saját szakmai pozíciójukat is megerősítik a C-suite-ban."
  },
  {
    source: "Parlons RH",
    category: "Workplace Culture",
    color: "#2980b9",
    geo: "🇫🇷 Franciaország",
    title: "RSE : du discours à l'engagement des collaborateurs",
    title_hu: "A vállalati felelősségvállalás valódi elköteleződéssé válhat – de nem magától",
    url: "https://www.parlonsrh.com/rse-du-discours-a-lengagement-des-collaborateurs/",
    published: "2026-03-24T13:00:00.000Z",
    addedAt: NOW,
    excerpt: "Une démarche RSE mobilise durablement lorsqu'elle offre aux collaborateurs une place claire dans la transformation de l'entreprise.",
    summary_hu: "A RSE-stratégiák általában erős vízióval indulnak, de a munkavállalói elköteleződés szintjén elkallódnak. A Parlons RH szerint a változás akkor jön el, ha az embereknek valódi szerepük van a fenntarthatósági transzformációban.",
    full_hu: "A vállalati társadalmi felelősségvállalás (RSE/CSR) sok szervezetben PR-üzenetté válik ahelyett, hogy valódi kulturális mozgásba hozná a munkavállalókat. A Parlons RH elemzése szerint az a kulcs, hogy a dolgozók ne csupán a célok végrehajtói legyenek, hanem aktív résztvevőként érezzék magukat a szervezet fenntarthatósági transzformációjában.\n\nA kutatás három szintet azonosít: a tájékozottságot (az emberek tudnak a célokról), az azonosulást (személyesen relevánssá válik számukra) és az aktív részvételt (saját kezdeményezéseikkel is hozzájárulnak). A legtöbb vállalat az első szinten ragad – kommunikálja a stratégiát, de nem teremti meg azokat a strukturált csatornákat, amelyeken keresztül az egyéni kezdeményezések becsatornázhatók lennének.\n\nHR-szempontból az RSE-elköteleződés erősítése a munkavállalói élmény tervezésébe ágyazódik be: célorientált onboarding, CSR-fókuszú fejlesztési lehetőségek, és az önkéntesség vagy belső zöld csapatok szervezett támogatása mind hatékony eszközök. Az elköteleződés nem a kommunikáción múlik – hanem azon, mennyire érezhetik az emberek, hogy ők maguk is részesei a változásnak."
  },

  // ===== GLOBAL (4) =====
  {
    source: "MIT Sloan",
    category: "AI & Technology",
    color: "#8e44ad",
    geo: "🌍 Globális",
    title: "An AI Reckoning for HR: Transform or Fade Away",
    title_hu: "Leszámolás az AI-val: a HR vagy átalakul, vagy elhalványul",
    url: "https://sloanreview.mit.edu/article/an-ai-reckoning-for-hr-transform-or-fade-away/",
    published: "2026-03-25T11:00:53.000Z",
    addedAt: NOW,
    excerpt: "For decades, HR has talked about shifting from compliance to talent strategy. AI may finally force the change.",
    summary_hu: "A MIT Sloan Management Review kemény diagnózist állít: a HR-funkció évtizedek óta ígéri a stratégiai átalakulást – most az AI tényleg kikényszerítheti. Aki nem lép, elveszíti a relevanciáját.",
    full_hu: "A HR-funkció évtizedek óta próbál kilépni a compliance- és adminisztrációs szerepéből, és stratégiai tehetségpartnerré válni. A MIT Sloan Management Review legújabb elemzése szerint az AI most valóban felgyorsítja ezt a kényszert – csak éppen nem mindenki számára pozitív irányban.\n\nA cikk rámutat arra, hogy a rutinfeladatok automatizálása kettévágja a HR-professzió jövőjét: azok, akik képesek magasabb értékű, döntéstámogató és szervezetfejlesztési munkára váltani, megkerülhetetlenné válnak. Azok, akik ragaszkodnak a folyamatorientált, adminisztrációs fókuszhoz, egyre könnyebben kiválthatók – akár technológiával, akár outsourcinggal.\n\nAz MIT Sloan elemzői három átalakulási irányt azonosítanak: az adatalapú döntéshozatal megerősítése, a munkavállalói élmény tudatos tervezése, és az AI-bevezetés emberügyi aspektusainak proaktív kezelése. A transform or fade away nem szlogen – hanem valódi választóvonal, amelyen a HR-funkció most áll. A korai alkalmazkodók szervezeti tőkéjükbe invesztálnak; a késlekedők kockázatot vállalnak."
  },
  {
    source: "Unleash",
    category: "AI & Technology",
    color: "#e74c3c",
    geo: "🌍 Globális",
    title: "Josh Bersin: We're not going to lose the HR department because of agentic AI",
    title_hu: "Josh Bersin: az agentic AI nem számolja fel a HR-t – ellenkezőleg",
    url: "https://www.unleash.ai/unleash-america/josh-bersin-were-not-going-to-lose-the-hr-department-because-of-agentic-ai/",
    published: "2026-03-25T10:24:20.000Z",
    addedAt: NOW,
    excerpt: "If anything, AI will give HR a higher value role in your company, according to industry analyst Josh Bersin.",
    summary_hu: "Az iparág egyik legismertebb elemzője, Josh Bersin szerint az agentic AI nem a HR eltörlését hozza, hanem magasabb értékű szerepet kínál a funkció számára. A CHRO-knak most kell átpozicionálniuk magukat.",
    full_hu: "A UNLEASH America 2026 konferencián Josh Bersin, az egyik legismertebb HR-iparági elemző egyértelmű üzenettel állt ki: az agentic AI nem fogja eltörölni a HR-osztályokat. Sőt, véleménye szerint az AI olyan szereplehetőségeket nyit meg a HR számára, amelyekre korábban nem volt kapacitás.\n\nBersin szerint az AI átveszi a tranzakciós folyamatokat – a bérszámfejtés, az onboarding-adminisztráció, a megfelelőség-ellenőrzés területén –, miközben felszabadítja a HR-szakembereket a valóban emberi, stratégiai munkára: a szervezeti kultúra formálására, a vezetői fejlesztésre és a munkavállalói élmény tervezésére. Ez nem kevesebb HR-t jelent, hanem más, fontosabb HR-t.\n\nA CHRO-k számára az üzenet konkrét: most kell befektetni a csapat AI-kompetenciájába és a funkció stratégiai átpozicionálásába. Azok a HR-vezetők, akik passzívan szemlélik az AI-átalakulást, kockáztatják, hogy mások töltik be azt a szerepet, amelyet a HR magáénak tekint. Bersin optimizmusa nem naivitás – hanem kihívás: élj a lehetőséggel."
  },
  {
    source: "Unleash",
    category: "Future of Work",
    color: "#e74c3c",
    geo: "🌍 Globális",
    title: "Six key takeaways for HR leaders defining the future of work from UNLEASH America 2026s CHRO Summit",
    title_hu: "6 kulcstanulság a CHRO-knak a UNLEASH America 2026 csúcstalálkozójáról",
    url: "https://www.unleash.ai/unleash-america/six-key-takeaways-for-hr-leaders-defining-the-future-of-work-from-unleash-america-2026s-chro-summit/",
    published: "2026-03-25T11:14:12.000Z",
    addedAt: NOW,
    excerpt: "At the UNLEASH America 2026 CHRO Summit, senior HR leaders explored what it means for people leaders to truly succeed in the future of work.",
    summary_hu: "A UNLEASH America 2026 CHRO Summit hat legfontosabb tanulsága lefedi az AI-stratégiától a munkavállalói jóllétig terjedő HR-agendát. Ezek azok a témák, amelyek ma a világ legjobb HR-vezetőit foglalkoztatják.",
    full_hu: "A UNLEASH America 2026 CHRO Summitjén a világ vezető HR-főnökei gyűltek össze, hogy megvitassák a jövő munkahelyének legsürgetőbb kérdéseit. Az Unleash összefoglalója hat kulcstanulságot azonosít, amelyek a konferencia legemlékezetesebb pillanatait és legfontosabb üzeneteit sűrítik.\n\nA hat fő téma: az AI mint szervezeti katalizátor (nem csupán eszköz), a munkavállalói jóllét és a termelékenység közötti valódi kapcsolat, az inkluzivitás üzleti esetének megerősítése, a belső mobilitás mint tehetségmegtartási stratégia, az adatalapú HR-döntéshozatal és a geopolitikai instabilitás HR-kockázatai. Mindegyik téma összekapcsolódik: a szervezetek előtt álló kihívások egyszerre igényelnek stratégiai előrelátást és emberi empátiát.\n\nHR-szakemberek számára ez a lista kiváló önellenőrzési lehetőség: melyek azok a területek, ahol a saját szervezetünk már előre jár, és melyek azok, ahol befektetés szükséges? A hat téma mind egymással összefüggő, rendszerszemléleti keretbe illeszkedik."
  },
  {
    source: "AIHR",
    category: "HR Tools & Resources",
    color: "#3498db",
    geo: "🌍 Globális",
    title: "Employee Handbook Template: Key Sections, Examples and How To Use It",
    title_hu: "Munkavállalói kézikönyv sablon: kulcsszekciók, példák és útmutató",
    url: "https://www.aihr.com/blog/employee-handbook-template/",
    published: "2026-03-25T14:18:48.000Z",
    addedAt: NOW,
    excerpt: "An employee handbook template gives you a practical starting point without creating every section from scratch.",
    summary_hu: "Az AIHR ingyenes munkavállalói kézikönyv-sablont tesz elérhetővé – a dokumentum segít HR-csapatoknak szisztematikusan rendezni a szabályzatokat, elvárásokat és juttatásinformációkat anélkül, hogy nulláról kellene kezdeniük.",
    full_hu: "A munkavállalói kézikönyv az egyik legfontosabb, mégis legtöbbször félvállról vett HR-dokumentum. Az AIHR által közzétett ingyenes sablon célja, hogy a HR-csapatoknak ne kelljen fehér lappal indulniuk, amikor ezt a dokumentumot kell felépíteni vagy megújítani.\n\nA sablon lefedi az alapvető szekciók struktúráját: a vállalati kultúra és értékek bemutatását, a munkaviszony feltételeit, a juttatáspolitikát, a magatartási szabályokat, a fegyelmi eljárásokat és a kilépési folyamatokat. Minden szekció mellé minták és kitöltési útmutató tartozik, amelyek segítenek testre szabni a dokumentumot a szervezet igényeihez.\n\nHR-szempontból a kézikönyv frissítése nem csupán jogi megfelelési feladat – hanem a szervezeti kultúra és elvárások transzparens kommunikációjának eszköze. Különösen onboarding kontextusban kulcsfontosságú: az első napokban a munkavállalók kézikönyvből szerzik meg az alapvető tudást a szervezetről. Egy jól felépített, naprakész dokumentum csökkenti a félreértéseket, és erősíti a munkáltatói márka első benyomását."
  },

  // ===== ÁZSIA (2) =====
  {
    source: "HCA Mag Asia",
    category: "HR Development",
    color: "#e67e22",
    geo: "🌏 Ázsia",
    title: "Wider uptake of HR certification urged in Singapore",
    title_hu: "Szingapúr sürgeti a HR-certifikáció szélesebb elterjedését",
    url: "https://www.hcamag.com/asia/specialisation/leadership/wider-uptake-of-hr-certification-urged-in-singapore/569573",
    published: "2026-03-24T05:40:48.000Z",
    addedAt: NOW,
    excerpt: "HR certification highlighted as critical amid rapid workplace shifts",
    summary_hu: "A szingapúri HR-szakmai szervezetek felhívják a figyelmet: a gyorsan változó munkahelyi körülmények közepette a formális HR-certifikáció nem luxus, hanem szakmai alap. Az ország tudatosan erősíti a HR-funkcióba vetett bizalmat.",
    full_hu: "Szingapúrban a HR-certifikáció kérdése szakpolitikai szintre emelkedett: a szervezetek és a szabályozók egyhangúan sürgetik, hogy az emberi erőforrás területen dolgozó szakemberek szélesebb körben szerezzenek formális szakmai minősítést. A háttérben az áll, hogy a munkahelyek gyors átalakulása – az AI-bevezetéstől a hibrid modellek elterjedéséig – egyre összetettebb HR-kompetenciákat igényel.\n\nA Human Capital Alliance felmérése szerint jelenleg a szingapúri HR-szakembereknek csupán egy töredéke rendelkezik akkreditált certifikációval, miközben a munkáltatói elvárások és a jogszabályi környezet egyaránt igényli a magasabb szintű szakmai felkészültséget. A certifikációs programok nem csupán technikai tudást adnak – etikai keretet és szakmai identitást is nyújtanak.\n\nMagyar HR-szempontból ez az üzenet rezonál: nálunk is folyamatos vita zajlik a HR-funkció presztízséről és a szakmai standardokról. A szingapúri példa megmutatja, hogy a certifikáció nemcsak egyéni karriereszköz, hanem szektorális bizalomépítő mechanizmus – különösen fontos ez akkor, amikor a funkció stratégiai relevanciáját kell megerősíteni a C-suite felé."
  },
  {
    source: "HCA Mag Asia",
    category: "AI & Technology",
    color: "#e67e22",
    geo: "🌏 Ázsia",
    title: "Why AI makes human connection a performance priority",
    title_hu: "Minél több az AI, annál fontosabb az emberi kapcsolat a teljesítményben",
    url: "https://www.hcamag.com/asia/specialisation/employee-engagement/why-ai-makes-human-connection-a-performance-priority/569535",
    published: "2026-03-24T01:56:53.000Z",
    addedAt: NOW,
    excerpt: "As AI continues to be embedded into workflows, HR leaders need to focus more on how teams collaborate, build trust and keep judgement sharp.",
    summary_hu: "Ahogy az AI egyre mélyebben épül be a munkafolyamatokba, a csapatokban az emberi együttműködés minősége – a bizalom, az ítélőképesség és a kommunikáció – válik meghatározó teljesítménytényezővé. Carmen von Rohr elemzése erről a paradoxonról szól.",
    full_hu: "Az AI-eszközök munkahelyi elterjedése egy váratlan következménnyel jár: az emberi kapcsolatok és a csapatdinamika fontosabb teljesítménytényezővé válnak, nem kevésbé fontossá. Carmen von Rohr, a HCA Mag Asia szerzője rámutat: miközben az AI átveszi az ismétlődő és elemző feladatokat, a csapatok teljesítményét egyre inkább az határozza meg, hogy az emberek hogyan működnek együtt, hogyan bíznak egymásban, és hogyan hoznak közös döntéseket.\n\nA kutatás szerint az AI-intenzív munkakörnyezetekben a soft kompetenciák – empátia, aktív figyelem, konstruktív visszajelzés – válnak hard teljesítményfaktorokká. Azok a csapatok, amelyek ezeket tudatosan fejlesztik, jobban teljesítenek az AI-támogatott feladatokon is, mert a gépi outputot hatékonyabban integrálják az emberi döntéshozatalba.\n\nHR-szempontból az üzenet egyértelmű: a képzési és fejlesztési programokban az interperszonális kompetenciák nem csökkentett figyelmet érdemelnek az AI-korszakban, hanem növeltet. A pszichológiai biztonság, a csapatkohézió és a konstruktív konfliktuskezelés befektetése most térül meg igazán – mert ezek azok a képességek, amelyeket egyetlen algoritmus sem tud helyettesíteni."
  }
];

// Load existing news.json
const existing = JSON.parse(fs.readFileSync(newsPath, 'utf8'));

function classify(geo) {
  if (!geo) return 'Global';
  if (geo.includes('USA') || geo.includes('Kanada')) return 'USA';
  if (geo.includes('UK') || geo.includes('Eur') || geo.includes('Magyar') || geo.includes('Német') || geo.includes('Ausztria') || geo.includes('Francia') || geo.includes('Hollandia')) return 'EU';
  if (geo.includes('Ázsia') || geo.includes('India') || geo.includes('Singapore') || geo.includes('Japan') || geo.includes('China') || geo.includes('APAC')) return 'Asia';
  if (geo.includes('Globális') || geo.includes('Global')) return 'Global';
  return 'Global';
}

// Merge: new articles first
let merged = [...newArticles, ...existing.articles];

// Deduplicate by URL
const seen = new Set();
merged = merged.filter(a => seen.has(a.url) ? false : (seen.add(a.url), true));

// Remove articles older than 30 days
const cutoff = new Date();
cutoff.setDate(cutoff.getDate() - 30);
merged = merged.filter(a => {
  const d = new Date(a.addedAt || a.published || '2000-01-01');
  return d >= cutoff;
});

// Apply geo balance: max 8 per group
const groups = { USA: [], EU: [], Global: [], Asia: [] };
merged.forEach(a => {
  const g = classify(a.geo);
  if (groups[g]) groups[g].push(a);
});

Object.keys(groups).forEach(g => {
  groups[g].sort((a, b) => new Date(b.addedAt || b.published) - new Date(a.addedAt || a.published));
  groups[g] = groups[g].slice(0, 8);
});

// Recombine and sort by addedAt desc
const final = [...groups.USA, ...groups.EU, ...groups.Global, ...groups.Asia];
final.sort((a, b) => new Date(b.addedAt || b.published) - new Date(a.addedAt || a.published));

const result = {
  lastUpdated: NOW,
  articles: final
};

fs.writeFileSync(newsPath, JSON.stringify(result, null, 2), 'utf8');

const geo = {};
final.forEach(a => { const g = classify(a.geo); geo[g] = (geo[g]||0)+1; });
console.log('Mentve:', final.length, 'cikk');
console.log('Eloszlas:', JSON.stringify(geo));
final.slice(0,5).forEach((a,i) => console.log(i, a.geo, '|', a.title.substring(0,55)));
