// =====================================================================
//  ГРАММАТИКА: тренажёры по урокам и шпаргалки.
//  Все формы выписаны явно (по учебнику), чтобы не было ошибок генерации.
// =====================================================================
import { WORDS } from "./data.js";

// ---------- маленькие помощники ----------
const rnd = (n) => Math.floor(Math.random() * n);
const pick = (arr) => arr[rnd(arr.length)];
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = rnd(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
// варианты ответа: правильный + неправильные (без повторов), перемешанные
function opts(answer, wrong, n = 4) {
  const uniq = [...new Set(wrong.filter((w) => w !== answer))];
  return shuffle([answer, ...shuffle(uniq).slice(0, n - 1)]);
}
const L = (ru, en) => ({ ru, en });

// =====================================================================
//  ДАННЫЕ ДЛЯ ТРЕНАЖЁРОВ
// =====================================================================

// Личные местоимения и глагол byť
const BYT = [
  ["ja", "som"], ["ty", "si"], ["on", "je"], ["ona", "je"],
  ["my", "sme"], ["vy", "ste"], ["oni", "sú"],
];
const BYT_TAIL = ["doma", "v škole", "tu", "zo Slovenska", "v Bratislave", "v triede", "v kancelárii"];

// Настоящее время: ja | ty | on, ona | my | vy | oni
export const PRESENT = {
  "byť": "som si je sme ste sú",
  "mať": "mám máš má máme máte majú",
  "čítať": "čítam čítaš číta čítame čítate čítajú",
  "počúvať": "počúvam počúvaš počúva počúvame počúvate počúvajú",
  "hrať": "hrám hráš hrá hráme hráte hrajú",
  "plávať": "plávam plávaš pláva plávame plávate plávajú",
  "spievať": "spievam spievaš spieva spievame spievate spievajú",
  "čakať": "čakám čakáš čaká čakáme čakáte čakajú",
  "hľadať": "hľadám hľadáš hľadá hľadáme hľadáte hľadajú",
  "bývať": "bývam bývaš býva bývame bývate bývajú",
  "vstávať": "vstávam vstávaš vstáva vstávame vstávate vstávajú",
  "večerať": "večeriam večeriaš večeria večeriame večeriate večerajú",
  "robiť": "robím robíš robí robíme robíte robia",
  "hovoriť": "hovorím hovoríš hovorí hovoríme hovoríte hovoria",
  "variť": "varím varíš varí varíme varíte varia",
  "učiť": "učím učíš učí učíme učíte učia",
  "platiť": "platím platíš platí platíme platíte platia",
  "fajčiť": "fajčím fajčíš fajčí fajčíme fajčíte fajčia",
  "sedieť": "sedím sedíš sedí sedíme sedíte sedia",
  "spať": "spím spíš spí spíme spíte spia",
  "vidieť": "vidím vidíš vidí vidíme vidíte vidia",
  "rozumieť": "rozumiem rozumieš rozumie rozumieme rozumiete rozumejú",
  "stáť": "stojím stojíš stojí stojíme stojíte stoja",
  "písať": "píšem píšeš píše píšeme píšete píšu",
  "piť": "pijem piješ pije pijeme pijete pijú",
  "žiť": "žijem žiješ žije žijeme žijete žijú",
  "študovať": "študujem študuješ študuje študujeme študujete študujú",
  "pracovať": "pracujem pracuješ pracuje pracujeme pracujete pracujú",
  "cestovať": "cestujem cestuješ cestuje cestujeme cestujete cestujú",
  "nakupovať": "nakupujem nakupuješ nakupuje nakupujeme nakupujete nakupujú",
  "tancovať": "tancujem tancuješ tancuje tancujeme tancujete tancujú",
  "telefonovať": "telefonujem telefonuješ telefonuje telefonujeme telefonujete telefonujú",
  "obedovať": "obedujem obeduješ obeduje obedujeme obedujete obedujú",
  "jesť": "jem ješ je jeme jete jedia",
  "ísť": "idem ideš ide ideme idete idú",
  "zabudnúť": "zabudnem zabudneš zabudne zabudneme zabudnete zabudnú",
};
export const MODALS = {
  "musieť": "musím musíš musí musíme musíte musia",
  "chcieť": "chcem chceš chce chceme chcete chcú",
  "môcť": "môžem môžeš môže môžeme môžete môžu",
  "smieť": "smiem smieš smie smieme smiete smú",
  "vedieť": "viem vieš vie vieme viete vedia",
};
const PERSONS = ["ja", "ty", "on", "my", "vy", "oni"];
const PERSON_ALT = { on: ["on", "ona", "Peter", "Mária"], oni: ["oni", "deti", "študenti"] };

// Прошедшее время: инфинитив → [муж., жен., мн.]
export const PAST = {
  "byť": ["bol", "bola", "boli"],
  "mať": ["mal", "mala", "mali"],
  "čítať": ["čítal", "čítala", "čítali"],
  "písať": ["písal", "písala", "písali"],
  "robiť": ["robil", "robila", "robili"],
  "hovoriť": ["hovoril", "hovorila", "hovorili"],
  "variť": ["varil", "varila", "varili"],
  "piť": ["pil", "pila", "pili"],
  "spať": ["spal", "spala", "spali"],
  "pracovať": ["pracoval", "pracovala", "pracovali"],
  "študovať": ["študoval", "študovala", "študovali"],
  "cestovať": ["cestoval", "cestovala", "cestovali"],
  "telefonovať": ["telefonoval", "telefonovala", "telefonovali"],
  "počúvať": ["počúval", "počúvala", "počúvali"],
  "čakať": ["čakal", "čakala", "čakali"],
  "kúpiť": ["kúpil", "kúpila", "kúpili"],
  "navštíviť": ["navštívil", "navštívila", "navštívili"],
  "chcieť": ["chcel", "chcela", "chceli"],
  "vidieť": ["videl", "videla", "videli"],
  "rozumieť": ["rozumel", "rozumela", "rozumeli"],
  "vedieť": ["vedel", "vedela", "vedeli"],
  "musieť": ["musel", "musela", "museli"],
  "ísť": ["išiel", "išla", "išli"],
  "prísť": ["prišiel", "prišla", "prišli"],
  "jesť": ["jedol", "jedla", "jedli"],
  "môcť": ["mohol", "mohla", "mohli"],
  "zabudnúť": ["zabudol", "zabudla", "zabudli"],
  "stretnúť": ["stretol", "stretla", "stretli"],
  "vyhrať": ["vyhral", "vyhrala", "vyhrali"],
  "dostať": ["dostal", "dostala", "dostali"],
};
const PAST_SUBJ = [
  { s: "Peter", aux: "", g: 0, inSentence: true },
  { s: "Mária", aux: "", g: 1, inSentence: true },
  { s: "ja – Ján", aux: "som", g: 0 },
  { s: "ja – Eva", aux: "som", g: 1 },
  { s: "ty – Tomáš", aux: "si", g: 0 },
  { s: "ty – Zuzka", aux: "si", g: 1 },
  { s: "my", aux: "sme", g: 2 },
  { s: "vy", aux: "ste", g: 2 },
  { s: "deti", aux: "", g: 2, inSentence: true },
];

// Будущее время
const BUDEM = ["budem", "budeš", "bude", "budeme", "budete", "budú"];
const POJDEM = ["pôjdem", "pôjdeš", "pôjde", "pôjdeme", "pôjdete", "pôjdu"];
const FUTURE_VERBS = ["pracovať", "študovať", "čítať", "písať", "variť", "cestovať", "spať", "hrať futbal", "pozerať film", "telefonovať", "upratovať", "nakupovať", "ísť"];

// Повелительное наклонение: инфинитив → [ty, vy]
export const IMPERATIVE = {
  "čítať": ["čítaj", "čítajte"],
  "písať": ["píš", "píšte"],
  "počúvať": ["počúvaj", "počúvajte"],
  "hovoriť": ["hovor", "hovorte"],
  "robiť": ["rob", "robte"],
  "variť": ["var", "varte"],
  "študovať": ["študuj", "študujte"],
  "pracovať": ["pracuj", "pracujte"],
  "telefonovať": ["telefonuj", "telefonujte"],
  "spať": ["spi", "spite"],
  "piť": ["pi", "pite"],
  "jesť": ["jedz", "jedzte"],
  "ísť": ["choď", "choďte"],
  "byť": ["buď", "buďte"],
  "sedieť": ["seď", "seďte"],
  "vstať": ["vstaň", "vstaňte"],
  "platiť": ["plať", "plaťte"],
  "povedať": ["povedz", "povedzte"],
  "umyť": ["umy", "umyte"],
  "otvoriť": ["otvor", "otvorte"],
  "myslieť": ["mysli", "myslite"],
  "čakať": ["čakaj", "čakajte"],
};

// Винительный падеж: [именительный, винительный, род]
const ACC = [
  ["kniha", "knihu", "f"], ["voda", "vodu", "f"], ["káva", "kávu", "f"], ["mama", "mamu", "f"],
  ["sestra", "sestru", "f"], ["babka", "babku", "f"], ["hudba", "hudbu", "f"], ["zmrzlina", "zmrzlinu", "f"],
  ["čokoláda", "čokoládu", "f"], ["taška", "tašku", "f"], ["slovenčina", "slovenčinu", "f"],
  ["učebnica", "učebnicu", "f"], ["kancelária", "kanceláriu", "f"], ["posteľ", "posteľ", "f"],
  ["dom", "dom", "mi"], ["počítač", "počítač", "mi"], ["čaj", "čaj", "mi"], ["film", "film", "mi"],
  ["slovník", "slovník", "mi"], ["obed", "obed", "mi"],
  ["auto", "auto", "n"], ["pero", "pero", "n"], ["mlieko", "mlieko", "n"], ["jablko", "jablko", "n"],
  ["dieťa", "dieťa", "n"], ["múzeum", "múzeum", "n"],
  ["brat", "brata", "ma"], ["otec", "otca", "ma"], ["syn", "syna", "ma"], ["dedko", "dedka", "ma"],
  ["študent", "študenta", "ma"], ["učiteľ", "učiteľa", "ma"], ["muž", "muža", "ma"],
  ["kamarát", "kamaráta", "ma"], ["strýko", "strýka", "ma"], ["pes", "psa", "ma"],
  ["tenista", "tenistu", "ma"], ["kolega", "kolegu", "ma"], ["chlapec", "chlapca", "ma"],
  ["bratranec", "bratranca", "ma"],
];
const ACC_PRON = [["ja", "ma"], ["ty", "ťa"], ["on", "ho"], ["ona", "ju"], ["my", "nás"], ["vy", "vás"], ["oni", "ich"]];

// Множественное число: [ед., мн., тип]   ma = муж. одуш., mi = муж. неодуш.
const PLURAL = [
  ["študent", "študenti", "ma"], ["doktor", "doktori", "ma"], ["kuchár", "kuchári", "ma"],
  ["chlapec", "chlapci", "ma"], ["čašník", "čašníci", "ma"], ["žiak", "žiaci", "ma"],
  ["spevák", "speváci", "ma"], ["tenista", "tenisti", "ma"], ["učiteľ", "učitelia", "ma"],
  ["riaditeľ", "riaditelia", "ma"], ["priateľ", "priatelia", "ma"], ["brat", "bratia", "ma"],
  ["manžel", "manželia", "ma"], ["syn", "synovia", "ma"], ["dedko", "dedkovia", "ma"],
  ["otec", "otcovia", "ma"], ["strýko", "strýkovia", "ma"], ["muž", "muži", "ma"],
  ["zošit", "zošity", "mi"], ["dom", "domy", "mi"], ["slovník", "slovníky", "mi"],
  ["mobil", "mobily", "mi"], ["kvet", "kvety", "mi"], ["počítač", "počítače", "mi"],
  ["kľúč", "kľúče", "mi"], ["stôl", "stoly", "mi"], ["kôš", "koše", "mi"], ["čaj", "čaje", "mi"],
  ["pohár", "poháre", "mi"], ["kalendár", "kalendáre", "mi"],
  ["žena", "ženy", "f"], ["kniha", "knihy", "f"], ["taška", "tašky", "f"], ["lampa", "lampy", "f"],
  ["trieda", "triedy", "f"], ["stolička", "stoličky", "f"], ["sestra", "sestry", "f"],
  ["ulica", "ulice", "f"], ["fľaša", "fľaše", "f"], ["tabuľa", "tabule", "f"],
  ["nemocnica", "nemocnice", "f"], ["reštaurácia", "reštaurácie", "f"], ["posteľ", "postele", "f"],
  ["noc", "noci", "f"], ["miestnosť", "miestnosti", "f"], ["kolegyňa", "kolegyne", "f"],
  ["auto", "autá", "n"], ["pero", "perá", "n"], ["okno", "okná", "n"], ["mesto", "mestá", "n"],
  ["jablko", "jablká", "n"], ["lietadlo", "lietadlá", "n"], ["číslo", "čísla", "n"],
  ["more", "moria", "n"], ["námestie", "námestia", "n"], ["múzeum", "múzeá", "n"],
  ["dievča", "dievčatá", "n"], ["dieťa", "deti", "n"], ["človek", "ľudia", "ma"],
];

// Страны: [страна, откуда, он, она, как говорит]
const COUNTRIES = [
  ["Slovensko", "zo Slovenska", "Slovák", "Slovenka", "po slovensky"],
  ["Česko", "z Česka", "Čech", "Češka", "po česky"],
  ["Poľsko", "z Poľska", "Poliak", "Poľka", "po poľsky"],
  ["Maďarsko", "z Maďarska", "Maďar", "Maďarka", "po maďarsky"],
  ["Nemecko", "z Nemecka", "Nemec", "Nemka", "po nemecky"],
  ["Rakúsko", "z Rakúska", "Rakúšan", "Rakúšanka", "po nemecky"],
  ["Ukrajina", "z Ukrajiny", "Ukrajinec", "Ukrajinka", "po ukrajinsky"],
  ["Rusko", "z Ruska", "Rus", "Ruska", "po rusky"],
  ["Taliansko", "z Talianska", "Talian", "Talianka", "po taliansky"],
  ["Španielsko", "zo Španielska", "Španiel", "Španielka", "po španielsky"],
  ["Francúzsko", "z Francúzska", "Francúz", "Francúzka", "po francúzsky"],
  ["Anglicko", "z Anglicka", "Angličan", "Angličanka", "po anglicky"],
  ["Čína", "z Číny", "Číňan", "Číňanka", "po čínsky"],
  ["Japonsko", "z Japonska", "Japonec", "Japonka", "po japonsky"],
];

// Притяжательные местоимения: [муж., жен., ср.]
const POSS = {
  ja: ["môj", "moja", "moje"], ty: ["tvoj", "tvoja", "tvoje"], on: ["jeho", "jeho", "jeho"],
  ona: ["jej", "jej", "jej"], my: ["náš", "naša", "naše"], vy: ["váš", "vaša", "vaše"], oni: ["ich", "ich", "ich"],
};
const GI = { m: 0, f: 1, n: 2 };

// ---------- числа словами (0–1000) ----------
const ONES = ["nula", "jeden", "dva", "tri", "štyri", "päť", "šesť", "sedem", "osem", "deväť"];
const TEENS = ["desať", "jedenásť", "dvanásť", "trinásť", "štrnásť", "pätnásť", "šestnásť", "sedemnásť", "osemnásť", "devätnásť"];
const TENS = ["", "", "dvadsať", "tridsať", "štyridsať", "päťdesiat", "šesťdesiat", "sedemdesiat", "osemdesiat", "deväťdesiat"];
const HUNDREDS = ["", "sto", "dvesto", "tristo", "štyristo", "päťsto", "šesťsto", "sedemsto", "osemsto", "deväťsto"];
export function numToSk(n) {
  if (n === 1000) return "tisíc";
  if (n < 10) return ONES[n];
  if (n < 20) return TEENS[n - 10];
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? ONES[n % 10] : "");
  const rest = n % 100;
  return HUNDREDS[Math.floor(n / 100)] + (rest ? numToSk(rest) : "");
}

// =====================================================================
//  ГЕНЕРАТОРЫ ВОПРОСОВ
//  Вопрос: { prompt, hint, answer, alts?, options? (если выбор), explain? }
// =====================================================================
// только простые существительные: без пробелов, знаков и заглавных (страны не берём)
const nouns = () => WORDS.filter((w) => ["m", "f", "n"].includes(w.g) && /^[a-záäčďéíĺľňóôŕšťúýž]+$/.test(w.sk));
const adjectives = () => WORDS.filter((w) => ["2-1", "2-2", "2-3", "2-4"].includes(w.unit) && /[ýy]$/.test(w.sk));
// формы прилагательного: nový → nová, nové;  biely → biela, biele
function adjForms(m) {
  const stem = m.slice(0, -1);
  return m.endsWith("ý") ? [m, stem + "á", stem + "é"] : [m, stem + "a", stem + "e"];
}
const GENDER_NAME = { m: L("мужской род", "masculine"), f: L("женский род", "feminine"), n: L("средний род", "neuter") };

const GEN = {
  byt() {
    const [p, form] = pick(BYT);
    const neg = Math.random() < 0.35;
    const answer = neg ? "nie " + form : form;
    const all = BYT.map((b) => (neg ? "nie " + b[1] : b[1]));
    return {
      prompt: `${p[0].toUpperCase() + p.slice(1)} ___ ${pick(BYT_TAIL)}.`,
      hint: neg ? L("отрицание (nie)", "negative (nie)") : L("глагол byť", "verb byť"),
      answer, options: opts(answer, all),
      explain: L(`${p} → ${answer}`, `${p} → ${answer}`),
    };
  },
  fem() {
    const w = pick(WORDS.filter((x) => x.fem));
    return {
      prompt: `${w.sk} → ?`, hint: L("женская форма", "female form"),
      answer: w.fem, typed: true,
      explain: L(`${w.sk} → ${w.fem}`, `${w.sk} → ${w.fem}`),
    };
  },
  rod() {
    const w = pick(nouns());
    const answer = { m: "ten", f: "tá", n: "to" }[w.g];
    return {
      prompt: `___ ${w.sk}`, hint: L("ten / tá / to?", "ten / tá / to?"),
      answer, options: ["ten", "tá", "to"],
      explain: L(`${w.sk} — ${GENDER_NAME[w.g].ru} → ${answer}`, `${w.sk} — ${GENDER_NAME[w.g].en} → ${answer}`),
    };
  },
  adj() {
    const n = pick(nouns()), a = pick(adjectives());
    const forms = adjForms(a.sk);
    const answer = forms[GI[n.g]];
    return {
      prompt: `___ ${n.sk}`, hint: L(`(${a.sk}) — aký? aká? aké?`, `(${a.sk}) — aký? aká? aké?`),
      answer, options: forms,
      explain: L(`${n.sk} — ${GENDER_NAME[n.g].ru} → ${answer}`, `${n.sk} — ${GENDER_NAME[n.g].en} → ${answer}`),
    };
  },
  opp() {
    const pool = WORDS.filter((w) => w.opp && WORDS.some((x) => x.sk === w.opp));
    const w = pick(pool);
    const wrong = adjectives().map((x) => x.sk).filter((x) => x !== w.sk);
    return {
      prompt: `${w.sk} ↔ ?`, hint: L("противоположность", "opposite"),
      answer: w.opp, options: opts(w.opp, wrong),
      explain: L(`${w.sk} ↔ ${w.opp}`, `${w.sk} ↔ ${w.opp}`),
    };
  },
  poss() {
    const p = pick(Object.keys(POSS));
    const n = pick(nouns());
    const answer = POSS[p][GI[n.g]];
    const all = Object.values(POSS).flat();
    return {
      prompt: `(${p}) ___ ${n.sk}`, hint: L("môj / moja / moje…", "môj / moja / moje…"),
      answer, options: opts(answer, [...POSS[p], ...all]),
      explain: L(`${p} + ${n.sk} (${GENDER_NAME[n.g].ru}) → ${answer}`, `${p} + ${n.sk} (${GENDER_NAME[n.g].en}) → ${answer}`),
    };
  },
  jeden() {
    const n = pick(nouns());
    const answer = ["jeden", "jedna", "jedno"][GI[n.g]];
    return {
      prompt: `___ ${n.sk}`, hint: L("jeden / jedna / jedno", "jeden / jedna / jedno"),
      answer, options: ["jeden", "jedna", "jedno"],
      explain: L(`${n.sk} — ${GENDER_NAME[n.g].ru}`, `${n.sk} — ${GENDER_NAME[n.g].en}`),
    };
  },
  num() {
    const ranges = [[0, 20], [21, 99], [100, 1000]];
    const [a, b] = pick(ranges);
    const n = a + rnd(b - a + 1);
    const answer = numToSk(n);
    if (Math.random() < 0.5) {
      const near = [n + 1, n - 1, n + 10, n - 10, n + 2, n + 100].filter((x) => x >= 0 && x <= 1000 && x !== n);
      return { prompt: String(n), hint: L("как это по-словацки?", "how do you say it?"), answer, options: opts(answer, near.map(numToSk)), audio: answer };
    }
    return { prompt: String(n), hint: L("напиши словами", "write it in words"), answer, typed: true };
  },
  present() { return conjQuestion(PRESENT); },
  modal() { return conjQuestion(MODALS); },
  rad() {
    const S = [
      ["Peter", "rád"], ["Martina", "rada"], ["Ja (Miroslav)", "rád"], ["Ja (Iveta)", "rada"],
      ["Ty (Tomáš)", "rád"], ["Ty (Zuzka)", "rada"], ["My", "radi"], ["Vy (Ján a Juraj)", "radi"],
      ["Oni (Roman a Jana)", "radi"], ["Deti", "rady"], ["Moja mama", "rada"], ["Môj otec", "rád"],
    ];
    const V = ["čítať", "spievať", "tancovať", "cestovať", "variť", "plávať", "hrať futbal", "pozerať film"];
    const [s, answer] = pick(S);
    return {
      prompt: `${s} ___ … (${pick(V)})`, hint: L("rád / rada / radi / rady", "rád / rada / radi / rady"),
      answer, options: ["rád", "rada", "radi", "rady"],
      explain: L("мужчина — rád, женщина — rada, они (люди) — radi, дети/вещи — rady", "man — rád, woman — rada, they (people) — radi, children/things — rady"),
    };
  },
  time() {
    const h = 1 + rnd(12);
    const words = ["", "jedna", "dve", "tri", "štyri", "päť", "šesť", "sedem", "osem", "deväť", "desať", "jedenásť", "dvanásť"];
    const say = (x) => (x === 1 ? "Je jedna." : x <= 4 ? `Sú ${words[x]}.` : `Je ${words[x]}.`);
    const answer = say(h);
    const wrong = [say(h % 12 + 1), say(((h + 10) % 12) + 1), h <= 4 && h > 1 ? `Je ${words[h]}.` : `Sú ${words[h]}.`, say(((h + 5) % 12) + 1)];
    return {
      prompt: `🕐 ${h}:00`, hint: L("Koľko je hodín?", "Koľko je hodín?"),
      answer, options: opts(answer, wrong), audio: answer,
      explain: L("1 — Je jedna. 2, 3, 4 — Sú dve/tri/štyri. 5+ — Je päť…", "1 — Je jedna. 2, 3, 4 — Sú dve/tri/štyri. 5+ — Je päť…"),
    };
  },
  price() {
    const n = pick([1, 2, 3, 4, 5, 6, 8, 10, 12, 20, 50, 100]);
    const say = (x) => (x === 1 ? "jedno euro" : x === 2 ? "dve eurá" : x <= 4 ? `${numToSk(x)} eurá` : `${numToSk(x)} eur`);
    const answer = say(n);
    const wrongForm = n === 1 ? "jeden eur" : n <= 4 ? `${n === 2 ? "dve" : numToSk(n)} eur` : `${numToSk(n)} eurá`;
    return {
      prompt: `${n} €`, hint: L("Koľko stojí?", "Koľko stojí?"),
      answer, options: opts(answer, [wrongForm, say(n + 1), say(n === 1 ? 2 : n - 1)]), audio: answer,
      explain: L("1 — jedno euro, 2–4 — eurá, 5+ — eur", "1 — jedno euro, 2–4 — eurá, 5+ — eur"),
    };
  },
  acc() {
    const [nom, acc, g] = pick(ACC);
    const verb = g === "ma" ? pick(["Vidím", "Čakám na", "Poznám", "Mám rád"]) : pick(["Mám", "Chcem", "Hľadám", "Kupujem", "Mám rada"]);
    const rule = { f: L("жен. род: -a → -u", "feminine: -a → -u"), mi: L("муж. неодуш.: без изменений", "masc. inanimate: no change"), n: L("средний род: без изменений", "neuter: no change"), ma: L("муж. одуш.: + -a (на -a → -u)", "masc. animate: + -a (-a → -u)") }[g];
    return {
      prompt: `${verb} ___ .`, hint: L(`(${nom}) — koho? čo?`, `(${nom}) — koho? čo?`),
      answer: acc, typed: Math.random() < 0.5,
      options: opts(acc, [nom, nom + "a", nom.replace(/a$/, "y"), acc + "a"]),
      explain: L(`${nom} → ${acc} (${rule.ru})`, `${nom} → ${acc} (${rule.en})`),
    };
  },
  accPron() {
    const [p, a] = pick(ACC_PRON);
    const subj = pick(["Peter vidí", "Mama čaká na", "Poznáš", "Pozývam", "Hľadáme"]);
    return {
      prompt: `${subj} ___ .`, hint: L(`(${p})`, `(${p})`),
      answer: a, options: opts(a, ACC_PRON.map((x) => x[1])),
      explain: L(`${p} → ${a}`, `${p} → ${a}`),
    };
  },
  future() {
    const i = rnd(6);
    const v = pick(FUTURE_VERBS);
    const answer = v === "ísť" ? POJDEM[i] : `${BUDEM[i]} ${v}`;
    const wrong = v === "ísť" ? [...POJDEM, ...BUDEM.map((b) => b + " ísť")] : BUDEM.map((b) => `${b} ${v}`);
    return {
      prompt: `Zajtra ___ .`, hint: L(`(${PERSONS[i]} – ${v})`, `(${PERSONS[i]} – ${v})`),
      answer, options: Math.random() < 0.6 ? opts(answer, wrong) : null, typed: true,
      explain: v === "ísť" ? L("ísť → pôjdem, pôjdeš, pôjde…", "ísť → pôjdem, pôjdeš, pôjde…") : L("budem/budeš/bude/budeme/budete/budú + инфинитив", "budem/budeš/bude… + infinitive"),
    };
  },
  imp() {
    const inf = pick(Object.keys(IMPERATIVE));
    const plural = Math.random() < 0.4;
    const answer = IMPERATIVE[inf][plural ? 1 : 0];
    const wrong = Object.values(IMPERATIVE).map((x) => x[plural ? 1 : 0]);
    return {
      prompt: `${inf} → ___ !`, hint: plural ? L("(vy) повелительное", "(vy) imperative") : L("(ty) повелительное", "(ty) imperative"),
      answer, typed: Math.random() < 0.5, options: opts(answer, [IMPERATIVE[inf][plural ? 0 : 1], ...wrong]),
      explain: L(`${inf} → ${IMPERATIVE[inf][0]}! / ${IMPERATIVE[inf][1]}!`, `${inf} → ${IMPERATIVE[inf][0]}! / ${IMPERATIVE[inf][1]}!`),
    };
  },
  past() {
    const inf = pick(Object.keys(PAST));
    const subj = pick(PAST_SUBJ);
    const form = PAST[inf][subj.g];
    const answer = subj.aux ? `${subj.aux} ${form}` : form;
    const prompt = subj.inSentence ? `Včera ${subj.s} ___ .` : `Včera ___ .`;
    const hint = subj.inSentence ? `(${inf})` : `(${subj.s}, ${inf})`;
    const wrong = PAST[inf].map((f) => (subj.aux ? `${subj.aux} ${f}` : f)).concat(subj.aux ? [form, `${subj.aux === "som" ? "si" : "som"} ${form}`] : [`som ${form}`]);
    return {
      prompt, hint: L(hint, hint), answer, typed: Math.random() < 0.4, options: opts(answer, wrong),
      explain: L("som/si/sme/ste стоит на 2-м месте; он/она/они — без вспомогательного", "som/si/sme/ste in 2nd position; 3rd person — no auxiliary"),
    };
  },
  plural() {
    const [sg, pl] = pick(PLURAL);
    return {
      prompt: `${sg} → ?`, hint: L("множественное число", "plural"),
      answer: pl, typed: Math.random() < 0.5,
      options: opts(pl, PLURAL.filter((x) => x[0] !== sg).map((x) => x[1]).concat([sg + "y", sg + "i", sg + "a"])),
      explain: L(`${sg} → ${pl}`, `${sg} → ${pl}`),
    };
  },
  num234() {
    const [, pl, t] = pick(PLURAL.filter((x) => x[1] !== "deti" && x[1] !== "ľudia"));
    const n = pick([2, 3, 4]);
    const forms = { 2: ["dvaja", "dva", "dve"], 3: ["traja", "tri", "tri"], 4: ["štyria", "štyri", "štyri"] }[n];
    const answer = t === "ma" ? forms[0] : t === "mi" ? forms[1] : forms[2];
    return {
      prompt: `___ ${pl}`, hint: L(`(${n})`, `(${n})`), answer, options: [...new Set(forms)],
      explain: L("муж. одуш.: dvaja/traja/štyria; муж. неодуш.: dva/tri/štyri; жен. и ср.: dve/tri/štyri", "masc. anim.: dvaja/traja/štyria; masc. inanim.: dva/tri/štyri; fem./neut.: dve/tri/štyri"),
    };
  },
  country() {
    const c = pick(COUNTRIES);
    const kind = rnd(3);
    if (kind === 0) return { prompt: `Odkiaľ si? (${c[0]})`, hint: L("Som …", "Som …"), answer: c[1], options: opts(c[1], COUNTRIES.map((x) => x[1])) };
    if (kind === 1) {
      const f = Math.random() < 0.5;
      return { prompt: `${c[0]} — ${f ? "žena" : "muž"}`, hint: L("Národnosť?", "Nationality?"), answer: c[f ? 3 : 2], options: opts(c[f ? 3 : 2], COUNTRIES.map((x) => x[f ? 3 : 2]).concat([c[f ? 2 : 3]])) };
    }
    return { prompt: `Ako hovoríš? (${c[0]})`, hint: L("Hovorím …", "Hovorím …"), answer: c[4], options: opts(c[4], COUNTRIES.map((x) => x[4])) };
  },
};

function conjQuestion(table) {
  const inf = pick(Object.keys(table));
  const forms = table[inf].split(" ");
  const i = rnd(6);
  const person = PERSON_ALT[PERSONS[i]] ? pick(PERSON_ALT[PERSONS[i]]) : PERSONS[i];
  const answer = forms[i];
  return {
    prompt: `${person} ___`, hint: L(`(${inf})`, `(${inf})`),
    answer, typed: Math.random() < 0.4, options: opts(answer, forms),
    explain: L(`${inf}: ${forms.join(", ")}`, `${inf}: ${forms.join(", ")}`),
  };
}

// =====================================================================
//  СПИСОК ТРЕНАЖЁРОВ ПО УРОКАМ
// =====================================================================
export const DRILLS = [
  { id: "byt", lesson: 1, icon: "🔤", t: L("Глагол byť", "Verb byť"), gen: GEN.byt },
  { id: "fem", lesson: 1, icon: "👩", t: L("Мужчина → женщина", "Male → female"), gen: GEN.fem },
  { id: "rod", lesson: 2, icon: "⚧", t: L("Род: ten / tá / to", "Gender: ten / tá / to"), gen: GEN.rod },
  { id: "adj", lesson: 2, icon: "🎨", t: L("Aký? Aká? Aké?", "Aký? Aká? Aké?"), gen: GEN.adj },
  { id: "opp", lesson: 2, icon: "↔️", t: L("Противоположности", "Opposites"), gen: GEN.opp },
  { id: "poss", lesson: 2, icon: "🫵", t: L("Môj, tvoj, jeho…", "Môj, tvoj, jeho…"), gen: GEN.poss },
  { id: "num", lesson: 2, icon: "🔢", t: L("Числа 0–1000", "Numbers 0–1000"), gen: GEN.num },
  { id: "jeden", lesson: 2, icon: "1️⃣", t: L("Jeden / jedna / jedno", "Jeden / jedna / jedno"), gen: GEN.jeden },
  { id: "present", lesson: 3, icon: "⚙️", t: L("Настоящее время", "Present tense"), gen: GEN.present },
  { id: "modal", lesson: 3, icon: "💪", t: L("Musím, chcem, môžem…", "Modal verbs"), gen: GEN.modal },
  { id: "rad", lesson: 3, icon: "❤️", t: L("Rád / rada / radi", "Rád / rada / radi"), gen: GEN.rad },
  { id: "time", lesson: 3, icon: "🕐", t: L("Koľko je hodín?", "Telling the time"), gen: GEN.time },
  { id: "price", lesson: 3, icon: "💶", t: L("Koľko stojí? (евро)", "Prices (euro)"), gen: GEN.price },
  { id: "acc", lesson: 4, icon: "🎯", t: L("Винительный падеж", "Accusative"), gen: GEN.acc },
  { id: "accPron", lesson: 4, icon: "👀", t: L("ma, ťa, ho, ju…", "ma, ťa, ho, ju…"), gen: GEN.accPron },
  { id: "future", lesson: 4, icon: "⏭️", t: L("Будущее время", "Future tense"), gen: GEN.future },
  { id: "imp", lesson: 4, icon: "📢", t: L("Повелительное наклонение", "Imperative"), gen: GEN.imp },
  { id: "past", lesson: 5, icon: "⏮️", t: L("Прошедшее время", "Past tense"), gen: GEN.past },
  { id: "plural", lesson: 6, icon: "👥", t: L("Множественное число", "Plural"), gen: GEN.plural },
  { id: "num234", lesson: 6, icon: "✌️", t: L("Dvaja, dva, dve…", "Dvaja, dva, dve…"), gen: GEN.num234 },
  { id: "country", lesson: 6, icon: "🌍", t: L("Страны и национальности", "Countries & nationalities"), gen: GEN.country },
];

// =====================================================================
//  ШПАРГАЛКИ (короткие таблицы по каждому уроку)
//  rows: первая строка — заголовок таблицы
// =====================================================================
export const CHEATSHEETS = {
  1: [
    {
      t: L("Глагол byť (быть)", "Verb byť (to be)"),
      note: L("В словацком глагол «быть» в настоящем времени не пропускают: «Som študent» = «Я студент». Отрицание пишется отдельно: nie som.", "Slovak never drops 'to be': Som študent = I am a student. Negative: nie som (written separately)."),
      rows: [["", "+", "–"], ["ja", "som", "nie som"], ["ty", "si", "nie si"], ["on, ona, ono", "je", "nie je"], ["my", "sme", "nie sme"], ["vy", "ste", "nie ste"], ["oni, ony", "sú", "nie sú"]],
    },
    {
      t: L("Мужская → женская форма", "Male → female forms"),
      note: L("Большинство профессий: + ka. Слова на -k: -čka. На -ista: -istka.", "Most jobs: + ka. Words in -k: -čka. In -ista: -istka."),
      rows: [["MUŽ", "ŽENA", ""], ["doktor", "doktorka", "+ ka"], ["úradník", "úradníčka", "-k → -čka"], ["tenista", "tenistka", "-ista → -istka"], ["kolega", "kolegyňa", "-a → -yňa"], ["sudca", "sudkyňa", "-ca → -kyňa"]],
    },
    {
      t: L("Tykanie a vykanie («ты» и «вы»)", "Tykanie & vykanie (informal / formal)"),
      note: L("На вопрос «Ako sa máš?» никогда не отвечают «Som dobre» — правильно просто «Dobre».", "Never answer 'Ako sa máš?' with 'Som dobre' — just say 'Dobre'."),
      rows: [["ty (неформально)", "vy (формально)"], ["Kto si?", "Kto ste?"], ["Odkiaľ si?", "Odkiaľ ste?"], ["Ako sa máš?", "Ako sa máte?"], ["Ahoj! / Čau!", "Dobrý deň!"]],
    },
  ],
  2: [
    {
      t: L("Род существительных", "Noun gender"),
      note: L("Род обычно видно по окончанию.", "Gender is usually visible from the ending."),
      rows: [["rod", "koniec", "príklady"], ["M (ten)", "согласная, -a (о людях), -o", "muž, dom, futbalista, dedko"], ["F (tá)", "-a, мягкая согласная", "žena, kniha, posteľ, noc"], ["N (to)", "-o, -e, -ie, -um, -a/-ä", "auto, more, námestie, múzeum, dievča"]],
    },
    {
      t: L("Прилагательные: aký? aká? aké?", "Adjectives: aký? aká? aké?"),
      note: L("После долгого слога окончание короткое: biely – biela – biele (ритмический закон).", "After a long syllable the ending is short: biely – biela – biele (rhythmic law)."),
      rows: [["M (aký?)", "F (aká?)", "N (aké?)"], ["nový", "nová", "nové"], ["mladý", "mladá", "mladé"], ["biely", "biela", "biele"], ["múdry", "múdra", "múdre"]],
    },
    {
      t: L("Чей? Čí? Čia? Čie?", "Possessives"),
      note: L("jeho, jej, ich не меняются.", "jeho, jej, ich never change."),
      rows: [["", "M", "F", "N"], ["ja", "môj", "moja", "moje"], ["ty", "tvoj", "tvoja", "tvoje"], ["on / ono", "jeho", "jeho", "jeho"], ["ona", "jej", "jej", "jej"], ["my", "náš", "naša", "naše"], ["vy", "váš", "vaša", "vaše"], ["oni / ony", "ich", "ich", "ich"]],
    },
    {
      t: L("Ten, tá, to / jeden, jedna, jedno", "Ten, tá, to / jeden, jedna, jedno"),
      rows: [["M", "F", "N"], ["ten kvet", "tá žena", "to auto"], ["jeden zošit", "jedna kniha", "jedno pero"]],
    },
    {
      t: L("Числа", "Numbers"),
      note: L("Составные числа пишутся слитно: 263 = dvestošesťdesiattri.", "Compound numbers are written as one word: 263 = dvestošesťdesiattri."),
      rows: [["0–10", "11–19", "20–90", "100–1000"], ["nula, jeden, dva, tri, štyri, päť, šesť, sedem, osem, deväť, desať", "jedenásť, dvanásť, trinásť, štrnásť, pätnásť, šestnásť, sedemnásť, osemnásť, devätnásť", "dvadsať, tridsať, štyridsať, päťdesiat, šesťdesiat, sedemdesiat, osemdesiat, deväťdesiat", "sto, dvesto, tristo, štyristo, päťsto, šesťsto, sedemsto, osemsto, deväťsto, tisíc"]],
    },
  ],
  3: [
    {
      t: L("Настоящее время: 3 типа глаголов", "Present tense: 3 verb types"),
      note: L("Окончания: ja -m, ty -š, on -, my -me, vy -te, oni -jú/-ia/-ú.", "Endings: ja -m, ty -š, on -, my -me, vy -te, oni -jú/-ia/-ú."),
      rows: [["", "A: čítať", "I: robiť", "E: písať", "-ovať: študovať"], ["ja", "čítam", "robím", "píšem", "študujem"], ["ty", "čítaš", "robíš", "píšeš", "študuješ"], ["on, ona", "číta", "robí", "píše", "študuje"], ["my", "čítame", "robíme", "píšeme", "študujeme"], ["vy", "čítate", "robíte", "píšete", "študujete"], ["oni", "čítajú", "robia", "píšu", "študujú"]],
    },
    {
      t: L("Неправильные глаголы", "Irregular verbs"),
      rows: [["", "byť", "jesť", "ísť", "vedieť"], ["ja", "som", "jem", "idem", "viem"], ["ty", "si", "ješ", "ideš", "vieš"], ["on", "je", "je", "ide", "vie"], ["my", "sme", "jeme", "ideme", "vieme"], ["vy", "ste", "jete", "idete", "viete"], ["oni", "sú", "jedia", "idú", "vedia"]],
    },
    {
      t: L("Модальные глаголы + инфинитив", "Modal verbs + infinitive"),
      note: L("môcť — есть возможность; smieť — есть разрешение; vedieť — уметь.", "môcť — can (possible); smieť — may (allowed); vedieť — know how."),
      rows: [["", "musieť", "chcieť", "môcť", "smieť", "vedieť"], ["ja", "musím", "chcem", "môžem", "smiem", "viem"], ["ty", "musíš", "chceš", "môžeš", "smieš", "vieš"], ["on", "musí", "chce", "môže", "smie", "vie"], ["my", "musíme", "chceme", "môžeme", "smieme", "vieme"], ["vy", "musíte", "chcete", "môžete", "smiete", "viete"], ["oni", "musia", "chcú", "môžu", "smú", "vedia"]],
    },
    {
      t: L("Rád robím — я люблю делать", "Rád robím — I like doing"),
      rows: [["", "", ""], ["on / ja (муж.)", "rád", "Rád čítam."], ["ona / ja (жен.)", "rada", "Rada spievam."], ["oni (люди)", "radi", "Radi tancujú."], ["ony (дети, вещи)", "rady", "Deti rady hrajú futbal."]],
    },
    {
      t: L("Sa всегда на 2-м месте", "Sa is always in 2nd position"),
      rows: [["Ja sa učím.", "Učím sa."], ["Večer sa prechádzame.", "Ako sa voláš?"]],
    },
    {
      t: L("Время и цены", "Time & prices"),
      rows: [["1", "2–4", "5+"], ["Je jedna.", "Sú dve / tri / štyri.", "Je päť."], ["jedno euro", "dve / tri / štyri eurá", "päť eur"], ["1 cent", "3 centy", "50 centov"]],
    },
    {
      t: L("Как часто?", "How often?"),
      rows: [["100%", "", "", "", "0%"], ["vždy", "obyčajne, pravidelne", "často", "niekedy, občas", "zriedka, nikdy"]],
    },
  ],
  4: [
    {
      t: L("Винительный падеж (koho? čo?)", "Accusative (koho? čo?)"),
      note: L("Меняются только женский род на -a и мужской одушевлённый.", "Only feminine nouns in -a and masculine animate nouns change."),
      rows: [["rod", "nominatív", "akuzatív"], ["M živ.", "študent, dedko, tenista", "študenta, dedka, tenistu"], ["M než.", "dom, počítač", "dom, počítač"], ["F", "žena, kniha / posteľ", "ženu, knihu / posteľ"], ["N", "auto, more, dievča", "auto, more, dievča"]],
    },
    {
      t: L("Прилагательные и местоимения в винительном", "Adjectives & pronouns in accusative"),
      rows: [["M živ.", "F", "M než. / N"], ["toho môjho mladého brata", "tú moju novú knihu", "ten môj nový dom / to moje nové auto"]],
    },
    {
      t: L("Личные местоимения: koho?", "Personal pronouns: koho?"),
      rows: [["ja", "ty", "on", "ona", "my", "vy", "oni"], ["ma (mňa)", "ťa (teba)", "ho (jeho)", "ju", "nás", "vás", "ich"]],
    },
    {
      t: L("Будущее время", "Future tense"),
      note: L("budem + инфинитив. Но ísť → pôjdem.", "budem + infinitive. But ísť → pôjdem."),
      rows: [["", "byť", "+ inf.", "ísť"], ["ja", "budem", "budem čítať", "pôjdem"], ["ty", "budeš", "budeš čítať", "pôjdeš"], ["on", "bude", "bude čítať", "pôjde"], ["my", "budeme", "budeme čítať", "pôjdeme"], ["vy", "budete", "budete čítať", "pôjdete"], ["oni", "budú", "budú čítať", "pôjdu"]],
    },
    {
      t: L("Повелительное наклонение", "Imperative"),
      note: L("Берём форму «oni» и отрезаем окончание: čítaj-ú → čítaj!", "Take the 'oni' form and cut the ending: čítaj-ú → čítaj!"),
      rows: [["", "ty", "my", "vy"], ["čítať", "čítaj!", "čítajme!", "čítajte!"], ["študovať", "študuj!", "študujme!", "študujte!"], ["spať", "spi!", "spime!", "spite!"], ["ísť", "choď! / poď!", "poďme!", "choďte!"], ["byť", "buď!", "buďme!", "buďte!"], ["jesť", "jedz!", "jedzme!", "jedzte!"]],
    },
    {
      t: L("Предлоги с винительным", "Prepositions + accusative"),
      rows: [["cez", "pre", "na", "po", "o"], ["cez park, cez víkend", "pre teba, pre mamu", "čakám na autobus", "idem po kávu", "o hodinu, o týždeň"]],
    },
  ],
  5: [
    {
      t: L("Прошедшее время", "Past tense"),
      note: L("Инфинитив -ť → -l (-la, -lo, -li) + som/si/sme/ste. Для он/она/они вспомогательный глагол не нужен!", "Infinitive -ť → -l (-la, -lo, -li) + som/si/sme/ste. No auxiliary for 3rd person!"),
      rows: [["", "M", "F", "pl."], ["ja", "robil som", "robila som", "—"], ["ty", "robil si", "robila si", "—"], ["on / ona", "robil", "robila", "—"], ["my", "—", "—", "robili sme"], ["vy", "—", "—", "robili ste"], ["oni", "—", "—", "robili"]],
    },
    {
      t: L("Особые формы", "Special forms"),
      rows: [["inf.", "M", "F", "pl."], ["byť", "bol", "bola", "boli"], ["ísť", "išiel", "išla", "išli"], ["jesť", "jedol", "jedla", "jedli"], ["môcť", "mohol", "mohla", "mohli"], ["chcieť", "chcel", "chcela", "chceli"], ["zabudnúť", "zabudol", "zabudla", "zabudli"]],
    },
    {
      t: L("Порядок слов: som/si/sme/ste — на 2-м месте", "Word order: som/si/sme/ste in 2nd position"),
      rows: [["Včera som čítal.", "Čítal som knihu."], ["Kedy si kúpil auto?", "Ráno som sa umýval."]],
    },
    {
      t: L("Обращение на «вы» в прошедшем", "Formal 'vy' in the past"),
      rows: [["k mužovi", "k žene"], ["Boli ste v škole, pán učiteľ?", "Boli ste v škole, pani učiteľka?"], ["Máte rád kávu?", "Máte rada kávu?"]],
    },
    {
      t: L("Kde? Kam?", "Where? Where to?"),
      rows: [["KDE?", "KAM?"], ["vpredu, vzadu", "dopredu, dozadu"], ["vľavo, vpravo", "doľava, doprava"], ["uprostred", "doprostred"]],
    },
  ],
  6: [
    {
      t: L("Множественное число", "Plural"),
      rows: [["rod", "sg.", "pl."], ["M živ.", "študent, priateľ, syn", "študenti, priatelia, synovia"], ["M než.", "dom, kľúč", "domy, kľúče"], ["F", "žena, ulica, posteľ", "ženy, ulice, postele"], ["N", "auto, more, námestie, múzeum", "autá, moria, námestia, múzeá"], ["!!!", "človek, dieťa, dievča", "ľudia, deti, dievčatá"]],
    },
    {
      t: L("Прилагательные во множественном", "Adjectives in the plural"),
      rows: [["M živ.", "všetko ostatné"], ["tí moji veselí priatelia", "tie naše veľké domy / ženy / autá"]],
    },
    {
      t: L("2, 3, 4 + множественное", "2, 3, 4 + plural"),
      rows: [["", "2", "3", "4"], ["M živ.", "dvaja kuchári", "traja lekári", "štyria chlapci"], ["M než.", "dva počítače", "tri kľúče", "štyri stoly"], ["F / N", "dve knihy / jablká", "tri autá", "štyri perá"]],
    },
    {
      t: L("Страна — откуда — кто — язык", "Country — from — who — language"),
      rows: [["krajina", "odkiaľ?", "kto?", "ako hovorí?"], ["Slovensko", "zo Slovenska", "Slovák / Slovenka", "po slovensky"], ["Ukrajina", "z Ukrajiny", "Ukrajinec / Ukrajinka", "po ukrajinsky"], ["Rusko", "z Ruska", "Rus / Ruska", "po rusky"], ["Nemecko", "z Nemecka", "Nemec / Nemka", "po nemecky"], ["Španielsko", "zo Španielska", "Španiel / Španielka", "po španielsky"]],
    },
  ],
};
