// HR News PM update script - adds Hungarian summaries to new articles
const fs = require('fs');

const now = new Date().toISOString();
const skipIndices = new Set([27, 34, 52, 67]);

const summaries = [
  // 0: HBR Leaders Agency
  { title_hu: 'Miért veszítik el kontrollérzetüket a vezetők?', summary_hu: 'Évek óta tartó bizonytalanság és folyamatos változások erodálják a vezetők önbizalmát és cselekvési terét – ezt tükrözi az egyre erőteljesebb visszahúzódási tendencia a menedzseri rétegben. Amikor a vezető úgy érzi, döntései nem számítanak, a csapat is elveszíti az irányt. A cikk konkrét stratégiákat kínál az elveszett cselekvőképesség visszaszerzéséhez.', geo: '🌍 Globális' },
  // 1: HBR AI Agents
  { title_hu: 'AI-ügynökök bevezetésének kulcsa: kezeld őket csapattagként', summary_hu: 'Az AI-ügynökök sikeres vállalati integrációjának titka ugyanaz, mint az emberek menedzsmentjéé: pontosan meghatározott szerepkör, hatáskör, megbízható információforrások és egyértelmű eszkalációs folyamatok kellenek. Azok a szervezetek boldogulnak az AI-átállással, amelyek az emberekre alkalmazott vezetési szemléletet az AI-eszközökre is kiterjesztik.', geo: '🌍 Globális' },
  // 2: HBR Senior Leaders Influence
  { title_hu: 'Hogyan növelhetik befolyásukat a felsővezetők?', summary_hu: 'A felsővezetői befolyás nem a hierarchiáról szól – a peer-ek meggyőzéséhez érteni kell, mi motiválja őket és mik a döntési szempontjaik. A Harvard Business Review gyakorlati eszközöket kínál ahhoz, hogyan lehet ötleteket elfogadtatni olyan kollégákkal, akik felett nincs formális hatásköröd.', geo: '🌍 Globális' },
  // 3: HR Dive - HR Investigation downplayed
  { title_hu: 'Mi a teendő, ha a vezető félresöpri a vizsgálat eredményeit?', summary_hu: 'Az egyik legkellemetlenebb HR-szituáció, amikor egy felsővezető lekicsinyli a belső vizsgálat megállapításait. Munkaügyi jogászok szerint ilyenkor pontosan fel kell mérni a saját mozgásteret és a szervezeti kockázatokat, mielőtt lépni. A cikk jogi és etikai szempontból elemzi, milyen lehetőségei vannak az emberierőforrás-szakembernek.', geo: '🇺🇸 USA' },
  // 4: Talent Management - high-talent underperform
  { title_hu: 'Miért teljesít alul egy tehetséges csapat?', summary_hu: 'A csapatok kudarca ritkán magyarázható egyéni hiányosságokkal – sokkal inkább a tagok közötti együttműködés és az összhang hiánya a döntő tényező. A tehetsége válogatott, de rosszul szervezett csapat szinte mindig alulmarad egy kevésbé fényes, de jól összeszokott kollektívával szemben. A cikk feltárja, milyen dinamikák gátolják a magas teljesítményt a legjobb csapatoknál is.', geo: '🌍 Globális' },
  // 5: HRMorning Pregnancy Lawsuit
  { title_hu: '22,5 millió dolláros ítélet egy terhességi munkajogi perben', summary_hu: 'Egy ohiói bíróság 22,5 millió dollárra ítélt egy fuvarozócéget, miután megtagadta a várandós alkalmazottjától az otthoni munkavégzést – az eset a dolgozó halálával végződött. A Larkin kontra Total Quality Logistics-ügy szélsőséges példát nyújt arra, milyen következményei lehetnek az ésszerű munkajogi alkalmazkodási kötelezettség figyelmen kívül hagyásának.', geo: '🇺🇸 USA' },
  // 6: HRMorning OT Pay
  { title_hu: 'Téves munkavállalói besorolás, mégis elmaradt a túlóradíj-kártérítés', summary_hu: 'Az ötödik körzeti fellebbviteli bíróság helybenhagyta azt az esküdtszéki döntést, amely megtagadta a túlórafizetést – annak ellenére is, hogy a bíróság megállapította a téves önálló vállalkozói besorolást. Az ítélet rámutat: az osztályozási hibák nem vonnak maguk után automatikus kártérítési kötelezettséget.', geo: '🇺🇸 USA' },
  // 7: HRMorning Mastermind Time
  { title_hu: 'Mastermind-idő: hogyan hozzon ki belőle többet a HR-vezető?', summary_hu: 'A HR-vezetők napja tele van döntésekkel és azonnali igényekkel – szinte nincs idő a mélyebb gondolkodásra. A strukturált „mastermind-idő" beépítése a rutinba segít a valóban fontos problémákon való koncentrált munkában és kreatívabb megoldások kidolgozásában.', geo: '🇺🇸 USA' },
  // 8: Flex Index 9-to-5
  { title_hu: 'Vége a 9-5-nek? Miért mondanak búcsút a kötött munkaidőnek a dolgozók', summary_hu: 'Egy új NBER-kutatás szerint a rugalmas munkaidő iránti igény nem csupán generációs trend, hanem a munkahelyi produktivitás és elégedettség egyik legfontosabb mozgatórugója. A vizsgálat ráadásul megcáfolja azt a félelmet, hogy a távmunka fokozná a magányosságot – épp ellenkezőleg, sok esetben erősíti a kapcsolatokat.', geo: '🌍 Globális' },
  // 9: HR Executive AI state regs
  { title_hu: 'Állami AI-szabályok: minta a diszkriminációs perekhez', summary_hu: 'Illinois, New York és Colorado egyre szigorúbb törvényekkel szabályozzák az AI munkaügyi alkalmazásait – ezek a helyi rendeletek viszont országos szinten is mintaként szolgálhatnak a diszkriminációs perekhez. A HR-vezetőknek most kell felkészülni az algoritmikus elfogultság auditálására és a szállítói felelősség rendezésére.', geo: '🇺🇸 USA' },
  // 10: HR Executive talent analytics
  { title_hu: 'A tehetségelemzés vak foltja: mi történik a felvétel után?', summary_hu: 'A felvételi folyamat adatalapú megközelítése komoly fejlődésen ment át – de a belépés utáni időszak szinte teljesen kiesik a mérési rendszerekből. A munkavállalói életciklus post-hire szakaszát alig követi analitika, holott a legtöbb HR-döntés épp itt születik. A cikk bemutatja, hogyan lehet bezárni ezt a vak foltot.', geo: '🌍 Globális' },
  // 11: HR Executive DOL fiduciary rule
  { title_hu: 'A Biden-kori bizalmi szabályt törölte az amerikai munkaügyi minisztérium', summary_hu: 'Az Egyesült Államok Munkaügyi Minisztériuma visszaállította az ERISA eredeti ötlépéses tesztjét a befektetési tanácsadók minősítésére, hatálytalanítva a Biden-kormány szigorúbb szabályozását. A döntés befolyásolja, kik minősülnek fiduciárius felelősséggel bíró tanácsadónak a munkavállalói nyugdíjalapok kezelésében.', geo: '🇺🇸 USA' },
  // 12: HR Executive internal mobility
  { title_hu: 'Belső mobilitás: a HR új stratégiai kényszere', summary_hu: 'A belső karriermozgás ma már nem csupán megtartási eszköz – a vegyes munkaerejű szervezetekben az AI-korszak készséghézagainak betöltésére is ez az egyik leghatékonyabb módszer. Aly Sparks HR-vezető szerint az emberi elem megőrzése az AI-átállásban épp a belső mobilitási programokon múlik.', geo: '🌍 Globális' },
  // 13: HR Executive pay parity
  { title_hu: 'Szűkül a felsővezetői bérrés – de elég gyors a változás?', summary_hu: 'Új kutatási adatok szerint a férfiak és nők között a felsővezetői szinteken csökken a bérrés, ami kedvező jel a nők előre haladásában a vállalati hierarchiában. Ugyanakkor a paritás még messze van – a fizetési egyenlőség kérdése továbbra is kulcsfontosságú a szervezeti kultúra és toborzási stratégia szempontjából.', geo: '🌍 Globális' },
  // 14: HR Executive mental health
  { title_hu: 'Mentális egészség: minden harmadik dolgozó csupán „túlél"', summary_hu: 'A Lyra Health hatodik éves jelentése szerint a munkavállalók közel egyharmada napról napra csak vegetál, miközben a stresszfaktorok egymásra torlódnak. A munkahelyi mentális egészségprogramokba való befektetés ma már nem szociális felelősség kérdése, hanem alapvető üzleti szükségszerűség.', geo: '🌍 Globális' },
  // 15: HR Executive AI legal risks
  { title_hu: 'AI-perek sorozata: növekvő jogi kockázatok a HR-technológiában', summary_hu: 'Az Eightfold és a Workday ellen indított perek jelzik: az AI-alapú HR-eszközök alkalmazása komoly jogi kockázatot jelent, ha az algoritmus diszkriminatív döntésekhez vezet. A munkáltatóknak fel kell készülniük a szállítói felelősség, az auditálási kötelezettség és a biztosítási fedezet kérdéseire.', geo: '🇺🇸 USA' },
  // 16: HR Executive pay transparency
  { title_hu: 'Bértranszparencia-törvények rohamosan terjednek – hogyan váltsd stratégiává?', summary_hu: 'Az USA-ban és a világ számos más országában drámai ütemben szaporodnak a bérek közzétételét előíró jogszabályok, ami fundamentálisan megváltoztatja, hogyan kommunikálnak a munkáltatók a fizetési sávokról. A cikk bemutatja, hogyan lehet a kötelező megfelelést valódi versenyelőnnyé alakítani.', geo: '🌍 Globális' },
  // 17: HR Daily Advisor - Union impasse
  { title_hu: 'Holtpont a szakszervezeti tárgyalásokon: mikor szabad impasse-t kimondani?', summary_hu: 'A kollektív tárgyalásokon a holtpont deklarálása komoly döntés – lehetőséget nyit az utolsóként tárgyalt feltételek egyoldalú bevezetésére, de rossz alkalmazása jogi visszalépést vonhat maga után. A cikk jogi szempontból tisztázza, mikor minősül valódi holtpontnak egy tárgyalási helyzet.', geo: '🇺🇸 USA' },
  // 18: HR Daily Advisor - Beyond Retention
  { title_hu: 'A megtartáson túl: milyen HR-t vár az új generáció?', summary_hu: 'Az Y és Z generációs munkavállalók egyre komplexebb elvárásokat támasztanak, miközben a HR-szakemberek saját kiégéssel és a folyamatos változásokhoz való alkalmazkodás terhével küzdenek. A cikk bemutatja, hogyan lehet a megtartásfókuszú gondolkodásmódon túllépve jövőorientált HR-kultúrát teremteni.', geo: '🌍 Globális' },
  // 19: HR Daily Advisor - LinkedIn Human Plus
  { title_hu: 'LinkedIn a „Human Plus" korszakban: emberek és AI együtt', summary_hu: 'Dr. Chrissy Roth-Francis, a LinkedIn tehetségfejlesztési igazgatója 3000 vezető fejlesztéséért felel, és nap mint nap az AI és az emberi munkavégzés összefonódásának frontvonalán dolgozik. A LinkedIn szemszögéből mutatja be, mit jelent valójában az emberi és mesterséges intelligencia együttélése a szervezetfejlesztésben.', geo: '🌍 Globális' },
  // 20: HR Reporter - Collective agreement Logixx
  { title_hu: 'Kollektív szerződés: Logixx Security és az acélipari szakszervezet', summary_hu: 'A Logixx Security és az Acélipari Munkások Egyesülete (United Steelworkers, Local 9597) megkötötte torontói kollektív szerződését. Az egyezmény részletei mintaként szolgálhatnak a biztonsági szektorban tárgyaló más munkaügyi feleknek.', geo: '🇨🇦 Kanada' },
  // 21: HR Reporter - minimum wage
  { title_hu: 'Emelkedik a szövetségi minimálbér április 1-jétől Kanadában', summary_hu: 'A kanadai szövetségi kormány megerősítette, hogy április 1-jétől emeli a minimálbért – az új összeg némileg magasabb az eredetileg tervezett 18,10 dolláros szintnél. A változás minden szövetségi hatáskörbe tartozó munkáltatót érint.', geo: '🇨🇦 Kanada' },
  // 22: HR Reporter - wages trail inflation
  { title_hu: 'Kanada bérei még mindig elmaradnak a pandémia utáni inflációtól', summary_hu: 'Egy friss kutatás szerint Kanadában a meghirdetett bérek nem tartottak lépést a pandémia utáni infláció emelkedésével – az ország ebben az Egyesült Királysághoz és az Egyesült Államokhoz képest is lemaradásban van. Ez komoly kihívást jelent a munkaerő-megtartásban és a toborzásban egyaránt.', geo: '🇨🇦 Kanada' },
  // 23: HR Reporter - amenities ladder
  { title_hu: 'Az „előny-létra" csapda: hogyan szorulnak hátrányos munkakörökbe a nők?', summary_hu: 'Rugalmasságért cserébe a nők sok esetben alacsonyabb presztízsű, kevésbé látható munkakörökbe kerülnek – és mire az előléptetési ciklus eljön, már nem látja őket a döntéshozó. Ezt az „előny-létra" jelenséget kutatók most névvel látták el és rendszerszerűen vizsgálják, figyelmeztetésül a munkaerő-politika formálóinak.', geo: '🇨🇦 Kanada' },
  // 24: HR Reporter - happiness down Canada
  { title_hu: 'Zuhan a boldogság Kanadában – mit tehet a HR?', summary_hu: 'A legfrissebb adatok szerint Kanadában – különösen a fiatalok körében – drámaian csökkent az általános elégedettség és jóllét, ami a munkahelyi elkötelezettséget is közvetlenül befolyásolja. Egy kutató szerint a jó hír az, hogy sokat tudunk arról, hogyan javítható az életminőség – és ebben a munkaadóknak kulcsszerep jut.', geo: '🇨🇦 Kanada' },
  // 25: HR Reporter - DEI as equity and belonging
  { title_hu: 'DEI helyett méltányosság és összetartozás: két kanadai munkáltató példája', summary_hu: 'A George Brown Polytechnic és a Thales Canada nem csupán átnevezték a DEI-programjaikat – új keretbe helyezték az egész megközelítést, ahol a hangsúly az elérhetőségen, az elszámoltathatóságon és a valós tapasztalatokon van. A cikk bemutatja, hogyan épülnek fel ezek a fenntartható, nem szimbolikus sokszínűségi stratégiák.', geo: '🇨🇦 Kanada' },
  // 26: HR Reporter - store manager 815000
  { title_hu: '815 000 dollárra köteleztek egy üzletvezetőt jogosulatlan kifizetések miatt', summary_hu: 'Egy brit-kolumbiai bíróság 815 000 dolláros visszafizetésre kötelezte az üzletvezetőt, aki jogosulatlan béreket és kiadásokat hagyott jóvá saját hatáskörét meghaladva. A döntés egyértelművé teszi: a felmondás elhúzódása sem jelent hallgatólagos jóváhagyást a szabálytalanságokra.', geo: '🇨🇦 Kanada' },
  // 27: SKIP
  null,
  // 28: HR Reporter - last straw
  { title_hu: 'Mikor az utolsó csepp? A fokozatos fegyelmezés és az azonnali felmondás határai', summary_hu: 'Munkajogi ügyvédek elemzik, mikor tekinthető egy viselkedésbeli probléma az utolsó cseppnek, amely megnyitja az azonnali felmondás lehetőségét – és mikor rontja el a munkáltató a fokozatos fegyelmezési eljárás helytelen alkalmazásával. A progresszív fegyelmi rendszer helyes kezelése kulcsfontosságú a munkaügyi perek elkerüléséhez.', geo: '🇨🇦 Kanada' },
  // 29: HR Reporter - benefits costs barriers
  { title_hu: '3 akadály a juttatási költségek megértése előtt', summary_hu: 'Egy globális felmérés szerint a HR-szakemberek számára a legnagyobb kihívást a juttatási programok valós költségeinek átlátása jelenti – ráadásul az AI alkalmazása az ellátások tervezésében rendkívül egyenlőtlen képet mutat szervezetenként. A cikk a három leggyakoribb akadályt veszi végig, amelyek gátolják a megalapozott döntéshozatalt.', geo: '🇨🇦 Kanada' },
  // 30: HR Reporter - Phoenix to Dayforce
  { title_hu: 'Új bérrendszeri kísérlet Kanadában: a főkönyvvizsgáló kockázatokra figyelmeztet', summary_hu: 'A katasztrofálisan elbukott Phoenix bérszámfejtési rendszer lecserélésére indított 4,2 milliárd dolláros Dayforce-projekt komoly kockázatokat rejt – figyelmeztet a kanadai főkönyvvizsgáló. Késői szabályváltozások, hatalmas hátralék és lerövidített bevezetési határidők fenyegetik az új rendszer zökkenőmentes indítását.', geo: '🇨🇦 Kanada' },
  // 31: HR Reporter - Air Canada crash
  { title_hu: 'Halálos Air Canada-baleset: a szakszervezetek a földi munkavégzés veszélyeire figyelmeztetnek', summary_hu: 'Egy halálos futópályai ütközés után a pilótaszakszervezetek felhívják a figyelmet arra, hogy a legveszélyesebb munkaterület nem a repülőgépen töltött idő, hanem a gurulóút és a föld. A baleset munkavédelmi és biztonsági kultúra szempontjából is fontos kérdéseket vet fel a légiipar HR-menedzsmentje számára.', geo: '🇨🇦 Kanada' },
  // 32: HR Reporter - EI tariff relief
  { title_hu: 'Kanada meghosszabbítja a munkanélküli-segélyt a vámháború által érintett dolgozóknak', summary_hu: 'Az ottawai szövetségi kormány kiterjesztette a vámügyi hatásokkal küzdő munkavállalóknak nyújtott munkanélküli-biztosítási könnyítéseket, és rugalmasabb feltételeket vezet be a munkamegosztási programban. A döntés közvetlen választ jelent az Egyesült Államok kereskedelmi politikájának kanadai munkaerőpiacra gyakorolt hatásaira.', geo: '🇨🇦 Kanada' },
  // 33: Personnel Today - GMC reforms
  { title_hu: 'Egyszerűbb lesz eltávolítani a diszkriminatív orvosokat az orvosi névjegyzékből', summary_hu: 'Wes Streeting egészségügyi miniszter az Általános Orvosi Tanács reformját jelentette be, amely megkönnyíti a rasszista és diszkriminatív viselkedést tanúsító orvosok fegyelmi eljárásban való elmarasztalását. A változás az egészségügyi szektor munkáltatói felelősségére és az egyenlőségi politikák érvényesítésére is hatással lesz.', geo: '🇬🇧 UK' },
  // 34: SKIP (webinar ad)
  null,
  // 35: Personnel Today - 10 employment law changes
  { title_hu: '10 munkajogi változás az Egyesült Királyságban 2026 áprilisától', summary_hu: 'Április elsejétől életbe lép az Employment Rights Act számos intézkedése, amelyek alapjaiban módosítják a brit munkajogi keretet – a foglalkoztatásvédelem, a rugalmas munkavégzés és a kollektív jogok területén egyaránt. A HR-szakembereknek haladéktalanul áttekinteni szükséges a szabályrendszert, hogy időben felkészülhessenek a megfelelésre.', geo: '🇬🇧 UK' },
  // 36: Personnel Today - cancer taboo
  { title_hu: 'A rák tabu a munkahelyen: a dolgozók 92%-a hallgat a tünetekről', summary_hu: 'A munkavállalók mindössze 8%-a merne nyíltan tájékoztatni munkaadóját egy potenciálisan rákos tünetről – derül ki egy friss brit felmérésből, amely az egészségügyi kommunikáció komoly tabujára mutat rá. A HR-nek kulcsszerepe van egy olyan nyílt kultúra megteremtésében, amelyben az egészségi aggodalmak megbeszélhetők.', geo: '🇬🇧 UK' },
  // 37: Personnel Today - lone workers
  { title_hu: 'Az egyedül dolgozók fele kerüli a veszélyes helyzeteket – ki gondoskodik róluk?', summary_hu: 'Az egyedül dolgozó munkavállalók fele önként kerüli el bizonyos feladatokat vagy helyszíneket, mert nem érzi magát biztonságban – ez komoly munkavédelmi és jogi kérdéseket vet fel a munkáltatók számára. A brit adatok figyelmeztetnek: az izolált munkavégzés kockázatkezelése szisztematikus megközelítést igényel.', geo: '🇬🇧 UK' },
  // 38: Personnel Today - Fair Work Agency
  { title_hu: 'Megalakul a brit Fair Work Agency tanácsadó testülete', summary_hu: 'A brit kormány bejelentette a Fair Work Agency tanácsadó testületének tagjait – az összetételben munkáltatók, szakszervezetek és független szakértők egyaránt helyet kaptak. Az ügynökség a munkajogi megfelelés és a munkavállalói jogok érvényesítésének új intézményi kerete lesz az Egyesült Királyságban.', geo: '🇬🇧 UK' },
  // 39: HR Grapevine - gender identity masking
  { title_hu: 'A maszk levétele: nemi identitás és hiteles önkifejezés a munkahelyen', summary_hu: 'Rachael Haynes HR-szakember személyes történetén keresztül mutatja be, milyen hatása van annak, ha valaki nemi identitásának megfelelően élhet és dolgozhat – és hogyan alakítja ez a szervezeti kultúráról alkotott képünket. A cikk kérdőre vonja a „normálisság" fogalmát, és erős érveket hoz az inkluzív munkakörnyezet mellett.', geo: '🇬🇧 UK' },
  // 40: HR Grapevine - AI trainer pay gap
  { title_hu: 'Az AI-trénerek bérrése: régi egyenlőtlenségek új csomagolásban', summary_hu: 'A Deel kutatása szerint az AI-tréner szerepkörök száma 283%-kal nőtt – de ezzel párhuzamosan máris jelentős bérdiszparitás alakult ki ezen a pozíción belül. A jelenség azt mutatja, hogy a mesterséges intelligencia új munkakörök teremtésével egyidejűleg újratermelheti a régi egyenlőtlenségeket.', geo: '🇬🇧 UK' },
  // 41: HR Grapevine - care leavers
  { title_hu: 'Háromszoros hátrány: a gondozásból kikerülő fiatalok a munkaerőpiacon', summary_hu: 'Az állami gondozást megtapasztalt fiatalok csaknem háromszor akkora eséllyel maradnak ki a munkalehetőségekből, mint kortársaik – derül ki egy angliai kutatásból. A HR-szakemberek és munkáltatók aktív szerepvállalása nélkül ezek a fiatalok tartósan a munkaerőpiac perifériájára szorulnak.', geo: '🇬🇧 UK' },
  // 42: HR Grapevine - Observer voluntary redundancy
  { title_hu: 'Az Observer teljes szerkesztőségének önkéntes végkielégítést ajánlott fel', summary_hu: 'Az Observer napilap új tulajdonosa alatt gyökeres stratégiai átalakulásba kezdett: az összes munkavállalónak felajánlotta az önkéntes kilépés lehetőségét a digitális platformváltás részeként. A tömeges lehetséges létszámcsökkentés éles kérdéseket vet fel a szerkesztőségi kultúra és a változásmenedzsment kapcsán.', geo: '🇬🇧 UK' },
  // 43: HR Grapevine - BAFTA duty of care
  { title_hu: 'A gondoskodási kötelezettség kudarca: tanulságok a BAFTA-esetből', summary_hu: 'A BAFTA-gálán történt incidens nyomán ismét reflektorfénybe kerül a szervezetek gondoskodási felelőssége – különösen, amikor nem látható fogyatékosságokról van szó. A munkáltatók gondoskodási kötelezettsége minden esetben fennáll, és ennek elmulasztása jogi, reputációs és emberi következményekkel jár.', geo: '🇬🇧 UK' },
  // 44: AIHR - company culture examples
  { title_hu: '14 szervezeti kultúra példa: melyikből tanulj, melyiket kerüld?', summary_hu: 'A szervezeti kultúra láthatatlan erő – képes kiemelkedő teljesítményt generálni, de botrányba, magas fluktuációba és kiégésbe is torkollhat. Az AIHR 14 valós vállalati példán keresztül mutatja be, mi különbözteti meg a sikeres kultúrát a mérgezőtől, és milyen mintázatok figyelmeztetnek a problémákra.', geo: '🌍 Globális' },
  // 45: AIHR - AI onboarding
  { title_hu: 'AI az onboardingban: 8 gyakorlati alkalmazás valós példákkal', summary_hu: 'Az AI képes forradalmasítani a beilleszkedési folyamatot – személyre szabott tanulási útvonalak, naprakész tartalmak és szerepkörhöz igazított élmény révén. Az AIHR nyolc konkrét alkalmazási területet mutat be valós vállalati esetekkel, amelyek azonnal megvalósíthatók a HR-csapatok számára.', geo: '🌍 Globális' },
  // 46: Unleash - Western Digital HR intentional
  { title_hu: 'Western Digital HR-igazgatója: a szándékos vezetés nem opcionális', summary_hu: 'Katie Watson, a Western Digital vezető HR-igazgatója szerint a jövő munkájának kihívásaival szemben egyetlen hatékony stratégia létezik: minden lépésnél tudatos, szándékos döntéseket hozni az emberekkel kapcsolatban. A CHRO bemutatja, mit jelent ez a gyakorlatban az AI-átállás, a munkavállalói élmény és a szervezeti kultúra területén.', geo: '🌍 Globális' },
  // 47: Unleash - UNLEASH America 3 ways
  { title_hu: '3 módszer, ahogyan az UNLEASH America 2026 újraírta a HR-t', summary_hu: 'A Las Vegas-i UNLEASH America 2026 konferencián a HR jövőjéről szóló legizgalmasabb gondolatok köré szerveződött a diskurzus. Az Unleash főriportere három kulcstanulságot emelt ki a rendezvényről, amelyek meghatározzák a szakma következő fejlődési irányait.', geo: '🌍 Globális' },
  // 48: MIT Sloan - DOL AI optimism
  { title_hu: 'Az AI-félelem felváltása optimizmussal – az USA Munkaügyi Minisztériuma szemszögéből', summary_hu: 'Taylor Stockton, az Egyesült Államok Munkaügyi Minisztériumának innovációs igazgatója szerint az AI munkaerőpiaci hatásairól szóló narratívát az aggodalom helyett a lehetőségek keretébe kell helyezni. Az MIT-podcast-interjúban bemutatja, hogyan közelíti meg a szövetségi kormány az AI-átállást az emberi munkavégzés szempontjából.', geo: '🇺🇸 USA' },
  // 49: MIT Sloan - Leaders Lose the Room
  { title_hu: 'Miért veszíti el a szobát a vezető a legfontosabb pillanatokban?', summary_hu: 'A magas tétű tárgyalásokon és megbeszéléseken nem a prezentációs technikák döntenek – hanem az, hogy a vezető mennyire képes valóban kapcsolatba lépni a résztvevőkkel. Az MIT Sloan elemzése rámutat a leggyakoribb kommunikációs csapdákra, amelyek elveszítik a kulcsemberek figyelmét és bizalmát.', geo: '🌍 Globális' },
  // 50: HRM Asia - Singapore labour market
  { title_hu: 'Szingapúr munkaerőpiaca feszes marad, de a képességrés nő', summary_hu: 'Szingapúrban a toborzási igény erős maradt, azonban a szakmai és vezetői (PMET) pozíciókban egyre élesedő képességeltérések és strukturális átalakulások nehezítik a munkaerőpiaci egyensúlyt. A szigetállam HR-kihívásai a régió fejlettebb gazdaságainak általános trendjeit tükrözik.', geo: '🌏 Ázsia' },
  // 51: HR.Asia - HR leading AI training
  { title_hu: 'Amikor a HR vezeti az AI-stratégiát: kétszer hatékonyabb a képzés', summary_hu: 'Egy InStride-kutatás szerint a CHRO által irányított AI-munkaerő-stratégiák 54%-os képzési hatékonyságot érnek el – szemben a CIO/CTO-vezérelt modell 21%-ával. Az eredmény arra utal, hogy az AI-oktatási programok sikeréhez nem technológiai, hanem emberierőforrás-szemlélet kell a csúcson.', geo: '🌍 Globális' },
  // 52: SKIP (press release)
  null,
  // 53: HCA Mag Asia - job protection AI layoffs
  { title_hu: 'Munkavédelmi programok a mesterséges intelligencia okozta leépítések árnyékában', summary_hu: 'Új riport szerint egyre több vállalat épít ki munkahely-védelmi intézkedéseket, miközben párhuzamosan AI-alapú leépítéseket hajt végre – ez az ellentmondásos helyzet tükrözi az iparági bizonytalanságot. Az AI-képzés terjedése reménykeltő, de egyelőre nem tudja ellensúlyozni a technológia által kiszorított munkaköröket.', geo: '🌏 Ázsia' },
  // 54: HCA Mag Asia - AI workforce reset
  { title_hu: 'Az AI-munkaerő-reset: a leépítések csak a jéghegy csúcsa', summary_hu: 'A HR-vezetők számára az AI-korszak legfontosabb feladata nem a csökkentés, hanem az átalakulás menedzselése – pszichológiailag biztonságos, készségközpontú szervezeti környezetben. A valódi átalakulás sikeréhez egyszeri leépítésnél jóval összetettebb megközelítés szükséges.', geo: '🌏 Ázsia' },
  // 55: HCA Mag Asia - world's largest work hours study
  { title_hu: '160 ország munkaidő-adatai: felülírt tévhitek a munka jövőjéről', summary_hu: 'A valaha végzett legnagyobb munkaidő-kutatás – 160 ország adatait elemezve – meglepő következtetéseket hoz a munka, a fejlettség és a munkavállalói jóllét összefüggéseiről. Az eredmények megkérdőjelezik azt a bevett nézetet, hogy a több munkaóra egyenlő több értékteremtéssel.', geo: '🌍 Globális' },
  // 56: HCA Mag Asia - AI workslop
  { title_hu: '„Workslop": az AI-generált selejtes munka aláássa a vezető iránti bizalmat', summary_hu: 'Az „AI workslop" – vagyis az AI által termelt félkész, átgondolatlan munkák beadása – komoly bizalmi válságot okoz a szervezetekben, ha a munkavállalók nem vállalnak felelősséget az általuk benyújtott tartalmakért. A kutatás szerint a munkáltatóknak aktívan kell kezelniük ezt a jelenséget.', geo: '🌍 Globális' },
  // 57: HRZone - zero-hours contracts
  { title_hu: 'Nullás órás szerződések reformja: ideje felkészülni', summary_hu: 'Az Egyesült Királyságban közeleg a nullás órás szerződések szabályozásának reformja, és a munkajogász szakértők szerint nem érdemes az utolsó pillanatra halasztani a felkészülést. A cikk gyakorlati teendőlistát ad azoknak a HR-szakembereknek, akik szeretnék a megfelelési folyamatot proaktívan kezelni.', geo: '🇬🇧 UK' },
  // 58: HRZone - AI accountability
  { title_hu: 'Az AI nem vállal felelősséget – te igen?', summary_hu: 'A kritikus helyzetekben való helyzetmegítélés és a felelős döntéshozatal alapvetően emberi készségek maradnak – az AI ezekre nem képes. Ugyanakkor egy friss kutatás arra figyelmeztet, hogy az elszámoltathatóság képessége csorbul a digitális munkahelyi kultúrában, ahol sokan a gép mögé bújva kerülik a felelősségvállalást.', geo: '🇬🇧 UK' },
  // 59: Personalwirtschaft - KI Nutzungsrate
  { title_hu: 'AI-átállás: nem a felhasználási arány számít', summary_hu: 'Egyre több vállalat méri, milyen intenzitással alkalmazzák az alkalmazottak a mesterséges intelligenciát – de a puszta használati statisztikák félrevezető képet adnak a valódi transzformációról. A Personalwirtschaft szerint az AI hatékonyságát nem az arány, hanem a gondolkodás mélysége és a minőség határozza meg.', geo: '🇩🇪 Németország' },
  // 60: Personalwirtschaft - Siemens BASF Ausbildung
  { title_hu: 'Siemens Energy és BASF: milyen lesz a szakképzés jövője?', summary_hu: 'A DGFP éves konferencián egyértelművé vált, hogy az apprentice-ok képességei és elvárásai gyökeresen megváltoztak – a hagyományos szakképzési modellek nem elegendők a következő generáció megtartásához. A Siemens Energy, a BASF és mások konkrét megközelítéseket osztottak meg a szakmai képzési programjaik megújításáról.', geo: '🇩🇪 Németország' },
  // 61: Personalwirtschaft - VW Krisenkommunikation
  { title_hu: 'Válságkommunikáció a VW-nél: mit tanulhat ettől a HR?', summary_hu: 'A Volkswagen már harmadszor hajt végre nagy leépítést 20 év alatt – és ez idő alatt szakértővé vált a válságkommunikációban. A Personalwirtschaft összegyűjtötte, milyen tanulságokat vonhatnak le más HR-csapatok a VW tapasztalataiból a nehéz létszámcsökkentési folyamatok kezeléséhez.', geo: '🇩🇪 Németország' },
  // 62: Personalwirtschaft - EnBW Personalchefin
  { title_hu: 'Új HR-igazgató az EnBW-nél: ki lesz Rückert-Hennen utódja?', summary_hu: 'Colette Rückert-Hennen augusztusban vonul nyugdíjba az EnBW HR-igazgatói posztjáról – az utódját a düsseldorfi Stadtwerke soraiban találták meg. A váltás a nagyvállalati HR-vezető utódlástervezés és az energiaszektor tehetségmenedzsmentjének aktuális kérdéseit vetíti előre.', geo: '🇩🇪 Németország' },
  // 63: Personalwirtschaft - 82% Fuehrungskraefte KI
  { title_hu: 'A felsővezetők 82%-a szerint jövőre az AI hoz döntéseket', summary_hu: 'Egy friss tanulmány szerint a felsővezetők túlnyomó többsége meg van győződve arról, hogy a stratégiai döntések egyre nagyobb részét a jövőben mesterséges intelligencia hozza majd. Ez komoly kérdéseket vet fel arról, mi marad a C-szintű vezetők szerepéből egy AI-vezérelt döntési rendszerben.', geo: '🇩🇪 Németország' },
  // 64: Personalwirtschaft - Team Human x AI
  { title_hu: 'Team Human x AI: emberek és mesterséges intelligencia a döntéshozásban', summary_hu: 'A „Human x AI" csapatmodell nem csupán technológiai integráció kérdése – a HR és a szervezeti tanulás alapjait is újragondolja. A modell célja, hogy a mesterséges intelligencia ne kiszorítsa, hanem erősítse az emberi döntéshozatalt, miközben emberi értékek maradnak a középpontban.', geo: '🇩🇪 Németország' },
  // 65: Personalwirtschaft - New Work 2.0
  { title_hu: 'New Work 2.0: hogyan alakul át a fogalom a valóság nyomására?', summary_hu: 'Nem is olyan régen a New Work-megközelítés vonzó munkáltatói eszköznek számított – aztán jött az irodába való visszahívás, az AI és a gazdasági bizonytalanság. A Personalwirtschaft azt vizsgálja, hogyan definiálódik újra a New Work fogalma a jelenlegi körülmények között, és mi marad meg az eredeti eszméből.', geo: '🇩🇪 Németország' },
  // 66: Parlons RH - RSE engagement
  { title_hu: 'CSR: hogyan válik a szlogenből valódi munkavállalói elköteleződés?', summary_hu: 'Egy vállalati fenntarthatósági program csak akkor mozgósít tartósan, ha a dolgozók valóban látják benne a saját helyüket és szerepüket. A Parlons RH szerint a CSR-elköteleződés titka az, hogy az alkalmazottakat ne nézőként, hanem aktív szereplőként vonjuk be a szervezeti átalakulásba.', geo: '🇫🇷 Franciaország' },
  // 67: SKIP (survey participation)
  null,
  // 68: Y2Y
  { title_hu: 'Hogy fogjuk megoldani a back-sittinget? És főleg ki?', summary_hu: 'A Y2Y back-sitting cikke óriási visszhangot váltott ki – sokak tapasztalata azonosul azzal, amit az eredeti poszt leírt. Az újabb elemzés arra keres választ, kinek a feladata valójában kezelni ezt a jelenséget, és milyen szervezeti szintű megközelítésre van szükség a tartós megoldáshoz.', geo: '🇭🇺 Magyar' },
];

const raw = JSON.parse(fs.readFileSync('C:/Users/dorka/OneDrive/Desktop/HRNEWS/data/raw-new-articles.json', 'utf8'));
const newsData = JSON.parse(fs.readFileSync('C:/Users/dorka/OneDrive/Desktop/HRNEWS/public/data/news.json', 'utf8'));

const ts = Date.now();
const newArticles = [];

raw.articles.forEach((a, i) => {
  if (skipIndices.has(i)) return;
  const s = summaries[i];
  if (!s) return;
  const id = String(ts + i) + '_' + String(1000 + Math.floor(Math.random() * 9000)).substring(1);
  newArticles.push({
    id,
    source: a.source,
    category: a.category || 'HR',
    color: a.color || '#1e40af',
    geo: s.geo,
    title: a.title,
    title_hu: s.title_hu,
    url: a.url,
    published: a.published || now,
    addedAt: now,
    excerpt: a.excerpt || '',
    summary_hu: s.summary_hu,
    image: a.image || ''
  });
});

// Combine: new articles first, then existing
let combined = [...newArticles, ...(newsData.articles || [])];

// Dedup by URL
const seen = new Set();
combined = combined.filter(a => seen.has(a.url) ? false : (seen.add(a.url), true));

// Remove articles older than 30 days
const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
combined = combined.filter(a => {
  const added = new Date(a.addedAt || a.published);
  return added >= cutoff;
});

// Geo balance: max 8 per group
function geoGroup(geo) {
  if (!geo) return 'other';
  if (geo.includes('USA') || geo.includes('Kanada')) return 'usa';
  // EU group: UK, European countries (use emoji or name matching)
  if (geo.includes('UK') || geo.includes('\uD83C\uDDEC\uD83C\uDDE7') || // 🇬🇧
      geo.includes('Eur') ||
      geo.includes('met') || // Néme-tország (German)
      geo.includes('Auszt') || geo.includes('\uD83C\uDDE6\uD83C\uDDF9') || // 🇦🇹
      geo.includes('Francia') || geo.includes('\uD83C\uDDEB\uD83C\uDDF7') || // 🇫🇷
      geo.includes('Hollan') || geo.includes('\uD83C\uDDF3\uD83C\uDDF1') || // 🇳🇱
      geo.includes('Magyar') || geo.includes('\uD83C\uDDED\uD83C\uDDFA') || // 🇭🇺
      geo.includes('\uD83C\uDDE9\uD83C\uDDEA')) return 'eu'; // 🇩🇪
  if (geo.includes('Glob')) return 'global';
  if (geo.includes('zsia') || geo.includes('Asia') || geo.includes('\uD83C\uDF0F')) return 'asia';
  return 'other';
}

// Sort by addedAt descending (newest first)
combined.sort((a, b) => new Date(b.addedAt || b.published) - new Date(a.addedAt || a.published));

// Always keep Y2Y article (move to front before filtering)
const y2yIdx = combined.findIndex(a => a.source === 'Y2Y');
if (y2yIdx > 0) {
  const [y2y] = combined.splice(y2yIdx, 1);
  combined.unshift(y2y);
}

// Apply geo limit
const groupCounts = { usa: 0, eu: 0, global: 0, asia: 0, other: 0 };
const MAX = 8;
const filtered = combined.filter(a => {
  const g = geoGroup(a.geo);
  if (groupCounts[g] < MAX) {
    groupCounts[g]++;
    return true;
  }
  return false;
});

console.log('Group counts:', groupCounts);
console.log('Final article count:', filtered.length);

const output = {
  lastUpdated: now,
  articles: filtered
};

fs.writeFileSync('C:/Users/dorka/OneDrive/Desktop/HRNEWS/public/data/news.json', JSON.stringify(output, null, 2), 'utf8');
console.log('Saved news.json with', filtered.length, 'articles');
