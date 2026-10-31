// =====================================================================
//  ГРАММАТИКА A2: тренажёры и шпаргалки (уроки A2 = id 7–12).
//  Все формы выписаны явно и проверены вручную.
// =====================================================================

const rnd = (n) => Math.floor(Math.random() * n);
const pick = (a) => a[rnd(a.length)];
const shuffle = (arr) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const opts = (answer, wrong, n = 4) => shuffle([answer, ...shuffle([...new Set(wrong.filter((w) => w !== answer))]).slice(0, n - 1)]);
const L = (ru, en) => ({ ru, en });
const same = (s) => L(s, s);

// ---------- степени сравнения: [положительная, сравнительная] ----------
const COMP = [
  ["dobrý", "lepší"], ["zlý", "horší"], ["veľký", "väčší"], ["malý", "menší"], ["pekný", "krajší"],
  ["starý", "starší"], ["mladý", "mladší"], ["nový", "novší"], ["drahý", "drahší"], ["lacný", "lacnejší"],
  ["rýchly", "rýchlejší"], ["pomalý", "pomalší"], ["vysoký", "vyšší"], ["nízky", "nižší"], ["dlhý", "dlhší"],
  ["krátky", "kratší"], ["široký", "širší"], ["úzky", "užší"], ["ťažký", "ťažší"], ["ľahký", "ľahší"],
  ["zaujímavý", "zaujímavejší"], ["moderný", "modernejší"], ["čistý", "čistejší"], ["teplý", "teplejší"],
  ["studený", "studenší"], ["tichý", "tichší"], ["svetlý", "svetlejší"], ["tmavý", "tmavší"],
  ["chutný", "chutnejší"], ["zdravý", "zdravší"], ["múdry", "múdrejší"], ["bohatý", "bohatší"], ["hlboký", "hlbší"], ["blízky", "bližší"],
];
const COMP_ADV = [["dobre", "lepšie"], ["zle", "horšie"], ["veľa", "viac"], ["málo", "menej"], ["rýchlo", "rýchlejšie"], ["pomaly", "pomalšie"], ["skoro", "skôr"], ["neskoro", "neskôr"]];
// lepší → [lepší, lepšia, lepšie]
const compForms = (c) => [c, c.slice(0, -1) + "ia", c.slice(0, -1) + "ie"];
const SUBJ = [["Tento dom", "ako tamten", 0], ["Táto kniha", "ako tamtá", 1], ["Toto auto", "ako tamto", 2], ["Môj brat", "ako ja", 0], ["Moja sestra", "ako ja", 1], ["Toto mesto", "ako Žilina", 2]];

// ---------- местный падеж: [именит., предлог, местный] ----------
const LOK = [
  ["škola", "v", "škole"], ["obchod", "v", "obchode"], ["mesto", "v", "meste"], ["Bratislava", "v", "Bratislave"],
  ["park", "v", "parku"], ["Slovensko", "na", "Slovensku"], ["stôl", "na", "stole"], ["byt", "v", "byte"],
  ["hotel", "v", "hoteli"], ["počítač", "na", "počítači"], ["ulica", "na", "ulici"], ["kancelária", "v", "kancelárii"],
  ["posteľ", "v", "posteli"], ["more", "pri", "mori"], ["námestie", "na", "námestí"], ["múzeum", "v", "múzeu"],
  ["kino", "v", "kine"], ["divadlo", "v", "divadle"], ["reštaurácia", "v", "reštaurácii"], ["pošta", "na", "pošte"],
  ["stanica", "na", "stanici"], ["letisko", "na", "letisku"], ["izba", "v", "izbe"], ["kuchyňa", "v", "kuchyni"],
  ["záhrada", "v", "záhrade"], ["vlak", "vo", "vlaku"], ["autobus", "v", "autobuse"], ["nemocnica", "v", "nemocnici"],
  ["univerzita", "na", "univerzite"], ["Žilina", "v", "Žiline"],
  ["brat", "o", "bratovi"], ["otec", "o", "otcovi"], ["kamarát", "o", "kamarátovi"], ["lekár", "o", "lekárovi"],
  ["mama", "o", "mame"], ["sestra", "o", "sestre"], ["Peter", "o", "Petrovi"], ["dieťa", "o", "dieťati"],
];

// ---------- творительный падеж: [именит., творит., предлог для «с»] ----------
const INS_TRANSPORT = [["vlak", "vlakom"], ["autobus", "autobusom"], ["auto", "autom"], ["lietadlo", "lietadlom"], ["električka", "električkou"], ["loď", "loďou"], ["bicykel", "bicyklom"], ["metro", "metrom"], ["taxík", "taxíkom"], ["trolejbus", "trolejbusom"]];
// [именит., творит., предлог, фраза]
const INS_WITH = [
  ["brat", "bratom", "s", "Idem do kina"], ["otec", "otcom", "s", "Idem do kina"], ["kamarát", "kamarátom", "s", "Idem do kina"],
  ["mama", "mamou", "s", "Idem do kina"], ["sestra", "sestrou", "so", "Idem do kina"], ["kamarátka", "kamarátkou", "s", "Idem do kina"],
  ["priateľ", "priateľom", "s", "Idem do kina"], ["Zuzana", "Zuzanou", "so", "Idem do kina"],
  ["mlieko", "mliekom", "s", "Pijem kávu"], ["cukor", "cukrom", "s", "Pijem čaj"], ["citrón", "citrónom", "s", "Pijem čaj"], ["syr", "syrom", "so", "Jem chlieb"],
];
const INS_PRON = [["ja", "mnou", "so"], ["ty", "tebou", "s"], ["on", "ním", "s"], ["ona", "ňou", "s"], ["my", "nami", "s"], ["vy", "vami", "s"], ["oni", "nimi", "s"]];

// ---------- родительный падеж: [именит., родит.] ----------
const GEN_PLACE = [["škola", "školy"], ["obchod", "obchodu"], ["mesto", "mesta"], ["Bratislava", "Bratislavy"], ["kino", "kina"], ["divadlo", "divadla"], ["banka", "banky"], ["univerzita", "univerzity"], ["park", "parku"], ["stanica", "stanice"], ["práca", "práce"], ["kancelária", "kancelárie"], ["námestie", "námestia"], ["múzeum", "múzea"], ["Slovensko", "Slovenska"], ["Žilina", "Žiliny"]];
const GEN_PERSON = [["lekár", "lekára"], ["mama", "mamy"], ["brat", "brata"], ["kamarát", "kamaráta"], ["babka", "babky"], ["otec", "otca"], ["sestra", "sestry"], ["kaderník", "kaderníka"]];
const GEN_FOOD = [["voda", "vody"], ["káva", "kávy"], ["čaj", "čaju"], ["mlieko", "mlieka"], ["víno", "vína"], ["chlieb", "chleba"], ["cukor", "cukru"], ["syr", "syra"], ["maslo", "masla"], ["mäso", "mäsa"], ["ryža", "ryže"], ["čokoláda", "čokolády"], ["jogurt", "jogurtu"], ["pivo", "piva"], ["koláč", "koláča"], ["soľ", "soli"]];
// мера + продукт → «pohár vody»
const KVANT = [["pohár", "voda"], ["šálka", "káva"], ["šálka", "čaj"], ["fľaša", "víno"], ["fľaša", "mlieko"], ["kus", "chlieb"], ["krajec", "chlieb"], ["kilo", "mäso"], ["kilo", "ryža"], ["tabuľka", "čokoláda"], ["téglik", "jogurt"], ["vrecko", "cukor"], ["plátok", "syr"], ["plechovka", "pivo"], ["liter", "mlieko"], ["kúsok", "koláč"]];

// ---------- дательный падеж ----------
const DAT = [["brat", "bratovi"], ["otec", "otcovi"], ["kamarát", "kamarátovi"], ["lekár", "lekárovi"], ["Peter", "Petrovi"], ["študent", "študentovi"], ["dedko", "dedkovi"], ["strýko", "strýkovi"], ["mama", "mame"], ["sestra", "sestre"], ["kamarátka", "kamarátke"], ["babka", "babke"], ["učiteľka", "učiteľke"], ["Jana", "Jane"], ["teta", "tete"], ["dieťa", "dieťaťu"]];
const DAT_PRON = [["ja", "mi"], ["ty", "ti"], ["on", "mu"], ["ona", "jej"], ["my", "nám"], ["vy", "vám"], ["oni", "im"]];

// ---------- притяжательные прилагательные: [кто, м., ж., ср.] ----------
const POSS_ADJ = [["otec", "otcov", "otcova", "otcovo"], ["brat", "bratov", "bratova", "bratovo"], ["Peter", "Petrov", "Petrova", "Petrovo"], ["dedko", "dedkov", "dedkova", "dedkovo"], ["mama", "mamin", "mamina", "mamino"], ["sestra", "sestrin", "sestrina", "sestrino"], ["Jana", "Janin", "Janina", "Janino"], ["babka", "babkin", "babkina", "babkino"]];
const POSS_NOUN = [["dom", 1], ["mobil", 1], ["pes", 1], ["kniha", 2], ["izba", 2], ["taška", 2], ["auto", 3], ["pero", 3], ["kreslo", 3]];

// ---------- даты ----------
const ORD_GEN = ["", "prvého", "druhého", "tretieho", "štvrtého", "piateho", "šiesteho", "siedmeho", "ôsmeho", "deviateho", "desiateho", "jedenásteho", "dvanásteho", "trinásteho", "štrnásteho", "pätnásteho", "šestnásteho", "sedemnásteho", "osemnásteho", "devätnásteho", "dvadsiateho"];
const MONTH_GEN = ["", "januára", "februára", "marca", "apríla", "mája", "júna", "júla", "augusta", "septembra", "októbra", "novembra", "decembra"];
export function dateWords(d, m) {
  let day;
  if (d <= 20) day = ORD_GEN[d];
  else if (d < 30) day = "dvadsiateho " + ORD_GEN[d - 20];
  else day = d === 30 ? "tridsiateho" : "tridsiateho prvého";
  return `${day} ${MONTH_GEN[m]}`;
}
const ORD_NOM = ["", "prvý", "druhý", "tretí", "štvrtý", "piaty", "šiesty", "siedmy", "ôsmy", "deviaty", "desiaty"];

// ---------- кто-то / никто ----------
const PRON_NEG = [
  ["Je tu niekto?", "Nie, nie je tu ___.", "nikto"], ["Máš niečo?", "Nie, nemám ___.", "nič"],
  ["Ideš niekam?", "Nie, nejdem ___.", "nikam"], ["Bol si niekedy v Tatrách?", "Nie, ___ som tam nebol.", "nikdy"],
  ["Vidíš to niekde?", "Nie, ___ to nevidím.", "nikde"], ["Máš nejakú otázku?", "Nie, nemám ___ otázku.", "žiadnu"],
];
const PRON_POS = [
  ["___ klope na dvere.", "кто-то", "Niekto"], ["Chceš ___ piť?", "что-то", "niečo"], ["Kľúče sú ___ v izbe.", "где-то", "niekde"],
  ["Pôjdeme cez víkend ___ na výlet?", "куда-то", "niekam"], ["___ chodím do kina.", "иногда", "Niekedy"],
];
const PRON_ALL = ["niekto", "nikto", "niečo", "nič", "niekde", "nikde", "niekam", "nikam", "niekedy", "nikdy", "žiadnu", "nejakú"];

// ---------- keď / ak ----------
const KED_AK = [
  ["___ bude pršať, zostanem doma.", "ak"], ["___ prídem domov, zavolám ti.", "keď"], ["___ som bol malý, býval som v Nitre.", "keď"],
  ["___ chceš, môžeme ísť do kina.", "ak"], ["___ nebudeš študovať, neurobíš skúšku.", "ak"], ["___ mám voľno, čítam knihy.", "keď"],
];

// ---------- где? куда? ----------
const KDE_KAM = [
  ["škola", "v škole", "do školy"], ["obchod", "v obchode", "do obchodu"], ["kino", "v kine", "do kina"], ["mesto", "v meste", "do mesta"],
  ["Bratislava", "v Bratislave", "do Bratislavy"], ["banka", "v banke", "do banky"], ["park", "v parku", "do parku"], ["práca", "v práci", "do práce"],
  ["divadlo", "v divadle", "do divadla"], ["kaviareň", "v kaviarni", "do kaviarne"], ["reštaurácia", "v reštaurácii", "do reštaurácie"],
  ["pošta", "na pošte", "na poštu"], ["stanica", "na stanici", "na stanicu"], ["letisko", "na letisku", "na letisko"], ["univerzita", "na univerzite", "na univerzitu"],
  ["námestie", "na námestí", "na námestie"], ["Slovensko", "na Slovensku", "na Slovensko"], ["koncert", "na koncerte", "na koncert"], ["lekár", "u lekára", "k lekárovi"],
];

// =====================================================================
const GEN = {
  comp() {
    if (Math.random() < 0.25) {
      const [a, c] = pick(COMP_ADV);
      return { prompt: `${a} → ?`, hint: L("сравнительная степень наречия", "comparative adverb"), answer: c, typed: true, options: opts(c, COMP_ADV.map((x) => x[1])), explain: same(`${a} → ${c}`) };
    }
    const [a, c] = pick(COMP);
    const [s, cmp, g] = pick(SUBJ);
    const answer = compForms(c)[g];
    return {
      prompt: `${s} je ___ ${cmp}.`, hint: L(`(${a}) — сравнительная степень`, `(${a}) — comparative`),
      answer, typed: Math.random() < 0.4, options: opts(answer, [...compForms(c), a, "naj" + answer]),
      explain: L(`${a} → ${c} (м.), ${compForms(c)[1]} (ж.), ${compForms(c)[2]} (ср.)`, `${a} → ${c} / ${compForms(c)[1]} / ${compForms(c)[2]}`),
    };
  },
  sup() {
    const [a, c] = pick(COMP);
    const [noun, g] = pick([["mesto", 2], ["reštaurácia", 1], ["film", 0], ["kniha", 1], ["auto", 2], ["dom", 0]]);
    const answer = "naj" + compForms(c)[g];
    return {
      prompt: `To je ___ ${noun}.`, hint: L(`(${a}) — превосходная степень`, `(${a}) — superlative`),
      answer, typed: Math.random() < 0.4, options: opts(answer, ["naj" + compForms(c)[(g + 1) % 3], compForms(c)[g], "naj" + a, "naj" + compForms(c)[(g + 2) % 3]]),
      explain: L(`naj + сравнительная: ${c} → naj${c}`, `naj + comparative: ${c} → naj${c}`),
    };
  },
  lok() {
    const [nom, prep, lok] = pick(LOK);
    const frame = prep === "o" ? "Hovoríme o ___ ." : `Kde? — ${prep} ___`;
    return {
      prompt: frame, hint: L(`(${nom}) — где? о ком?`, `(${nom}) — where? about whom?`),
      answer: lok, typed: Math.random() < 0.4,
      options: opts(lok, [nom, nom.replace(/a$/, "u"), nom + "e", nom + "i", lok.replace(/e$/, "i"), lok.replace(/i$/, "e")]),
      explain: L(`${prep} ${lok}. Обычно -e (v škole), после k, g, h, ch — -u (v parku), мягкие — -i (na ulici), люди м. р. — -ovi`, `${prep} ${lok}. Usually -e, after k/g/h/ch -u, soft -i, masc. people -ovi`),
    };
  },
  ins() {
    const r = rnd(3);
    if (r === 0) {
      const [nom, ins] = pick(INS_TRANSPORT);
      return { prompt: "Cestujem ___ .", hint: L(`(${nom}) — на чём?`, `(${nom}) — by what?`), answer: ins, typed: Math.random() < 0.4, options: opts(ins, INS_TRANSPORT.map((x) => x[1]).concat([nom + "ou", nom + "om"])), explain: L("Чем? м. и ср. род — -om, ж. род — -ou", "By what? masc./neut. -om, fem. -ou") };
    }
    if (r === 1) {
      const [nom, ins, s, fr] = pick(INS_WITH);
      return { prompt: `${fr} ${s} ___ .`, hint: L(`(${nom}) — с кем? с чем?`, `(${nom}) — with whom/what?`), answer: ins, typed: Math.random() < 0.4, options: opts(ins, INS_WITH.map((x) => x[1]).concat([nom, nom + "ou"])), explain: L(`${s} ${ins}`, `${s} ${ins}`) };
    }
    const [p, ins, s] = pick(INS_PRON);
    return { prompt: `Pôjdeš ${s} ___ ?`, hint: L(`(${p})`, `(${p})`), answer: ins, options: opts(ins, INS_PRON.map((x) => x[1])), explain: L("so mnou, s tebou, s ním, s ňou, s nami, s vami, s nimi", "so mnou, s tebou, s ním, s ňou, s nami, s vami, s nimi") };
  },
  gen() {
    const r = rnd(3);
    let nom, gen, frame;
    if (r === 0) { [nom, gen] = pick(GEN_PLACE); frame = pick(["Idem do ___ .", "Bývam vedľa ___ .", "Idem okolo ___ ."]); }
    else if (r === 1) { [nom, gen] = pick(GEN_PERSON); frame = pick(["Som u ___ .", "To je darček od ___ ."]); }
    else { [nom, gen] = pick(GEN_FOOD); frame = "Prosím si to bez ___ ."; }
    return {
      prompt: frame, hint: L(`(${nom}) — кого? чего?`, `(${nom}) — of whom/what?`), answer: gen, typed: Math.random() < 0.4,
      options: opts(gen, [nom, nom.replace(/a$/, "u"), nom + "a", nom + "u", gen.replace(/a$/, "u"), gen.replace(/y$/, "e")]),
      explain: L("Родительный: ж. р. -y/-e (školy, stanice), ср. р. -a (mesta), м. р. -a/-u (lekára, obchodu)", "Genitive: fem. -y/-e, neut. -a, masc. -a/-u"),
    };
  },
  kvant() {
    const [m, nom] = pick(KVANT);
    const gen = GEN_FOOD.find((x) => x[0] === nom)[1];
    const answer = `${m} ${gen}`;
    return {
      prompt: `${m} + ${nom}`, hint: L("Сколько? — мера + родительный падеж", "How much? — measure + genitive"), answer, typed: Math.random() < 0.5,
      options: opts(answer, [`${m} ${nom}`, `${m} ${nom.replace(/a$/, "u")}`, `${m} ${gen.replace(/a$/, "u")}`, `${m} ${nom}om`]),
      explain: same(answer),
    };
  },
  dat() {
    if (Math.random() < 0.3) {
      const [p, d] = pick(DAT_PRON);
      return { prompt: "Dám ___ darček.", hint: L(`(${p}) — кому?`, `(${p}) — to whom?`), answer: d, options: opts(d, DAT_PRON.map((x) => x[1]).concat(["ma", "ho", "ju"])), explain: L("mi, ti, mu, jej, nám, vám, im", "mi, ti, mu, jej, nám, vám, im") };
    }
    const [nom, dat] = pick(DAT);
    const frame = pick(["Dám darček ___ .", "Telefonujem ___ .", "Pomáham ___ .", "Idem k ___ ."]);
    return {
      prompt: frame, hint: L(`(${nom}) — кому? к кому?`, `(${nom}) — to whom?`), answer: dat, typed: Math.random() < 0.4,
      options: opts(dat, [nom, nom + "ovi", nom.replace(/a$/, "e"), nom.replace(/a$/, "u"), nom + "u", dat.replace(/ovi$/, "u")]),
      explain: L("Дательный: м. р. люди -ovi (bratovi), ж. р. -e/-i (mame, ulici), ср. р. -u", "Dative: masc. people -ovi, fem. -e/-i, neut. -u"),
    };
  },
  datPron() {
    const [p, d] = pick(DAT_PRON);
    const frame = pick(["Dám ___ knihu.", "Pomôžem ___ zajtra.", "Kúpim ___ kávu."]);
    return { prompt: frame, hint: L(`(${p}) — кому?`, `(${p}) — to whom?`), answer: d, options: opts(d, DAT_PRON.map((x) => x[1]).concat(["ma", "ho", "ju", "ťa"])), explain: L("mi, ti, mu, jej, nám, vám, im — короткие формы стоят на 2-м месте", "mi, ti, mu, jej, nám, vám, im — short forms in 2nd position") };
  },
  possAdj() {
    const row = pick(POSS_ADJ);
    const [noun, gi] = pick(POSS_NOUN);
    const answer = row[gi];
    return { prompt: `___ ${noun}`, hint: L(`(${row[0]}) — чей?`, `(${row[0]}) — whose?`), answer, options: opts(answer, row.slice(1)), explain: L(`${row[0]} → ${row[1]} / ${row[2]} / ${row[3]}`, `${row[0]} → ${row[1]} / ${row[2]} / ${row[3]}`) };
  },
  date() {
    if (Math.random() < 0.3) {
      const n = 1 + rnd(10);
      return { prompt: `${n}. → ?`, hint: L("порядковое число: который?", "ordinal: which?"), answer: ORD_NOM[n], options: opts(ORD_NOM[n], ORD_NOM.slice(1)), audio: ORD_NOM[n] };
    }
    const m = 1 + rnd(12);
    const dd = 1 + rnd([31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1]); // без 31 апреля
    const answer = dateWords(dd, m);
    const wrong = [dateWords(dd, (m % 12) + 1), dateWords(dd === 1 ? 2 : dd - 1, m), dateWords(Math.min(dd + 10, 28), m)];
    return { prompt: `📅 ${dd}. ${m}.`, hint: L("Koľkého je dnes? → Dnes je…", "Koľkého je dnes? → Dnes je…"), answer, options: opts(answer, wrong), audio: answer, explain: L("день — порядковое число в родительном (prvého), месяц — родительный (mája)", "day — ordinal in genitive (prvého), month — genitive (mája)") };
  },
  pron() {
    if (Math.random() < 0.6) {
      const [q, a, ans] = pick(PRON_NEG);
      return { prompt: `${q} — ${a}`, hint: L("ответь отрицательно", "answer negatively"), answer: ans, options: opts(ans, PRON_ALL), explain: L("В словацком двойное отрицание: Nikto tu nie je. Nič nemám.", "Slovak uses double negation: Nikto tu nie je. Nič nemám.") };
    }
    const [q, hintRu, ans] = pick(PRON_POS);
    return { prompt: q, hint: L(`(${hintRu})`, `(${hintRu})`), answer: ans, options: opts(ans, PRON_ALL.map((x) => (ans[0] === ans[0].toUpperCase() ? x[0].toUpperCase() + x.slice(1) : x))) };
  },
  kedak() {
    const [s, ans] = pick(KED_AK);
    const answer = ans[0].toUpperCase() + ans.slice(1);
    return { prompt: s, hint: L("keď (когда) или ak (если)?", "keď (when) or ak (if)?"), answer, options: ["Keď", "Ak"], explain: L("keď — время (когда), ak — условие (если)", "keď — time (when), ak — condition (if)") };
  },
  kdekam() {
    const [nom, kde, kam] = pick(KDE_KAM);
    const where = Math.random() < 0.5;
    const answer = where ? kde : kam;
    return {
      prompt: where ? "Kde si? — Som ___ ." : "Kam ideš? — Idem ___ .", hint: L(`(${nom})`, `(${nom})`), answer,
      options: opts(answer, [kde, kam, kde.replace(/^(v|na|u) /, "do "), kam.replace(/^(do|na|k) /, "v ")]),
      explain: L(`Kde? → ${kde}. Kam? → ${kam}. v/do — внутрь здания, na — площадь, почта, вокзал`, `Where? → ${kde}. Where to? → ${kam}.`),
    };
  },
};

export const DRILLS_A2 = [
  { id: "a2comp", lesson: 7, icon: "📈", t: L("Сравнение: lepší, väčší", "Comparative: lepší, väčší"), gen: GEN.comp },
  { id: "a2sup", lesson: 7, icon: "🏆", t: L("Najlepší, najväčší", "Superlative"), gen: GEN.sup },
  { id: "a2lok", lesson: 8, icon: "📍", t: L("Местный падеж (kde? o kom?)", "Locative (kde? o kom?)"), gen: GEN.lok },
  { id: "a2ins", lesson: 9, icon: "🚋", t: L("Творительный (čím? s kým?)", "Instrumental (čím? s kým?)"), gen: GEN.ins },
  { id: "a2pron", lesson: 9, icon: "❔", t: L("Niekto / nikto", "Niekto / nikto"), gen: GEN.pron },
  { id: "a2kedak", lesson: 9, icon: "🔀", t: L("Keď или ak?", "Keď or ak?"), gen: GEN.kedak },
  { id: "a2gen", lesson: 10, icon: "🎯", t: L("Родительный (koho? čoho?)", "Genitive (koho? čoho?)"), gen: GEN.gen },
  { id: "a2kvant", lesson: 10, icon: "🥛", t: L("Pohár vody, kus chleba", "Quantities"), gen: GEN.kvant },
  { id: "a2dat", lesson: 11, icon: "🎁", t: L("Дательный (komu?)", "Dative (komu?)"), gen: GEN.dat },
  { id: "a2datpron", lesson: 11, icon: "🫴", t: L("Mi, ti, mu, jej…", "Mi, ti, mu, jej…"), gen: GEN.datPron },
  { id: "a2poss", lesson: 11, icon: "🏠", t: L("Otcov, mamin (чей?)", "Otcov, mamin (whose?)"), gen: GEN.possAdj },
  { id: "a2date", lesson: 11, icon: "📅", t: L("Даты и порядковые числа", "Dates & ordinals"), gen: GEN.date },
  { id: "a2kdekam", lesson: 12, icon: "🧭", t: L("Kde? Kam?", "Kde? Kam?"), gen: GEN.kdekam },
];
// для блица «Падежи» — только задания с вариантами ответа
export const CASE_GENS = [GEN.lok, GEN.ins, GEN.gen, GEN.dat, GEN.kdekam, GEN.comp];

export const CHEATSHEETS_A2 = {
  7: [
    {
      t: L("Степени сравнения", "Comparison of adjectives"),
      note: L("Сравнительная: -ší / -ejší. Превосходная: naj- + сравнительная. «чем» = ako.", "Comparative: -ší / -ejší. Superlative: naj- + comparative. 'than' = ako."),
      rows: [["pozitív", "komparatív", "superlatív"], ["starý", "starší", "najstarší"], ["lacný", "lacnejší", "najlacnejší"], ["dobrý", "lepší", "najlepší"], ["zlý", "horší", "najhorší"], ["veľký", "väčší", "najväčší"], ["malý", "menší", "najmenší"], ["pekný", "krajší", "najkrajší"], ["dobre", "lepšie", "najlepšie"], ["veľa", "viac", "najviac"]],
    },
    {
      t: L("Род в сравнительной степени", "Gender of comparatives"),
      rows: [["M", "F", "N"], ["lepší dom", "lepšia kniha", "lepšie auto"], ["väčší byt", "väčšia izba", "väčšie mesto"]],
    },
  ],
  8: [
    {
      t: L("Местный падеж (lokál): kde? o kom? o čom?", "Locative: kde? o kom? o čom?"),
      note: L("Всегда с предлогом: v, na, o, po, pri.", "Always with a preposition: v, na, o, po, pri."),
      rows: [["", "ед. ч.", "примеры"], ["M živ.", "-ovi", "o bratovi, o lekárovi"], ["M než. / N", "-e / -u (k, g, h, ch)", "v meste, v dome / v parku, na Slovensku"], ["мягкие M/N", "-i", "v hoteli, pri mori"], ["F", "-e / -i", "v škole / na ulici, v posteli"], ["-ia / -ie / -um", "-ii / -í / -u", "v kancelárii, na námestí, v múzeu"]],
    },
    {
      t: L("Местоимения", "Pronouns"),
      rows: [["ja", "ty", "on", "ona", "my", "vy", "oni"], ["o mne", "o tebe", "o ňom", "o nej", "o nás", "o vás", "o nich"]],
    },
  ],
  9: [
    {
      t: L("Творительный падеж (inštrumentál): kým? čím? s kým?", "Instrumental: kým? čím? s kým?"),
      note: L("Транспорт без предлога: cestujem vlakom. «с» — s/so: so sestrou, so mnou.", "Transport without a preposition: cestujem vlakom. 'with' — s/so."),
      rows: [["", "окончание", "примеры"], ["M, N", "-om", "vlakom, autom, s bratom"], ["F", "-ou", "električkou, s mamou"], ["F (мягк. согл.)", "-ou", "loďou, posteľou"], ["местоимения", "", "so mnou, s tebou, s ním, s ňou, s nami, s vami, s nimi"]],
    },
    {
      t: L("Niekto / nikto", "Somebody / nobody"),
      note: L("Двойное отрицание: Nikto nič nevie. Nikdy tam nechodím.", "Double negation: Nikto nič nevie."),
      rows: [["кто-то", "никто", "что-то", "ничего", "где-то", "нигде", "куда-то", "никуда"], ["niekto", "nikto", "niečo", "nič", "niekde", "nikde", "niekam", "nikam"]],
    },
    {
      t: L("Keď или ak", "Keď or ak"),
      rows: [["keď — когда (время)", "ak — если (условие)"], ["Keď prídem, zavolám.", "Ak bude pršať, zostanem doma."]],
    },
  ],
  10: [
    {
      t: L("Родительный падеж (genitív): koho? čoho?", "Genitive: koho? čoho?"),
      note: L("После: do, z/zo, bez, od, u, vedľa, okolo, počas, blízko — и после мер: pohár vody.", "After: do, z, bez, od, u, vedľa, okolo, počas — and quantities: pohár vody."),
      rows: [["", "окончание", "примеры"], ["M živ.", "-a", "u lekára, od brata"], ["M než.", "-a / -u", "zo stola / do obchodu, bez cukru"], ["F", "-y / -e", "do školy / zo stanice"], ["N", "-a", "do mesta, bez mlieka"], ["-ie / -um", "-ia / -a", "z námestia, do múzea"]],
    },
    {
      t: L("Сколько? Мера + родительный", "How much? Measure + genitive"),
      rows: [["pohár vody", "šálka kávy", "fľaša vína"], ["kus chleba", "kilo mäsa", "tabuľka čokolády"], ["téglik jogurtu", "vrecko cukru", "liter mlieka"]],
    },
  ],
  11: [
    {
      t: L("Дательный падеж (datív): komu? čomu?", "Dative: komu? čomu?"),
      note: L("Кому даём, звоним, помогаем; предлоги k/ku, kvôli, oproti, vďaka.", "To whom we give, call, help; prepositions k/ku, kvôli, oproti, vďaka."),
      rows: [["", "окончание", "примеры"], ["M živ.", "-ovi", "bratovi, otcovi, lekárovi"], ["M než. / N", "-u", "k domu, k moru, dieťaťu"], ["F", "-e / -i", "mame, sestre / k stanici"], ["местоимения", "", "mi/mne, ti/tebe, mu/jemu, jej, nám, vám, im"]],
    },
    {
      t: L("Притяжательные: чей?", "Possessive adjectives: whose?"),
      note: L("От мужских имён -ov, от женских -in.", "From masculine nouns -ov, from feminine -in."),
      rows: [["", "M", "F", "N"], ["otec", "otcov dom", "otcova kniha", "otcovo auto"], ["mama", "mamin dom", "mamina kniha", "mamino auto"], ["sestra", "sestrin", "sestrina", "sestrino"]],
    },
    {
      t: L("Даты", "Dates"),
      note: L("Koľkého je dnes? — Dnes je prvého mája. Kedy? — Prvého mája.", "Koľkého je dnes? — Dnes je prvého mája."),
      rows: [["1.", "2.", "3.", "4.", "5.", "10.", "20.", "21."], ["prvého", "druhého", "tretieho", "štvrtého", "piateho", "desiateho", "dvadsiateho", "dvadsiateho prvého"], ["januára", "februára", "marca", "apríla", "mája", "júna", "júla", "augusta"], ["septembra", "októbra", "novembra", "decembra", "", "", "", ""]],
    },
  ],
  12: [
    {
      t: L("Kde? Kam? Kadiaľ? Odkiaľ?", "Where? Where to? Which way? Where from?"),
      rows: [["", "v (здание)", "na (место)", "k (человек)"], ["Kde? — L", "v škole", "na pošte", "u lekára (G)"], ["Kam? — G / A", "do školy", "na poštu", "k lekárovi (D)"], ["Odkiaľ? — G", "zo školy", "z pošty", "od lekára"], ["Kadiaľ?", "cez park (A)", "po ulici (L)", "okolo školy (G)"]],
    },
    {
      t: L("Предлоги места", "Prepositions of place"),
      note: L("Kde? — творительный: nad stolom, pod stolom, pred domom, za domom, medzi oknami. Kam? — винительный: pod stôl.", "Kde? — instrumental: nad stolom, pod stolom. Kam? — accusative: pod stôl."),
      rows: [["nad", "pod", "pred", "za", "medzi", "vedľa", "pri"], ["над", "под", "перед", "за", "между", "рядом (G)", "у, возле (L)"]],
    },
  ],
};
