// =====================================================================
//  СЛОВАРЬ ПО УРОКАМ УЧЕБНИКА «TRI, DVA, JEDEN – SLOVENČINA» (A1)
// =====================================================================
//  Каждое слово — одна строка:   словацкий | русский | английский | метки
//
//  Метки (через пробел, можно не писать):
//    m / f / n / pl   — род: мужской / женский / средний / только мн. число
//    fem=kuchárka     — женская форма (для профессий и людей)
//    opp=starý        — антоним (для упражнения «противоположности»)
//    alt=dedko        — другой правильный вариант при вводе (пробел = _)
//
//  ВАЖНО: только словацкий! Никаких ř, ů, ě — это чешские буквы.
//  Проверка: node tools/check-data.mjs
//  ID слова = id блока + словацкое слово. Если исправить опечатку в слове,
//  прогресс по этому одному слову начнётся заново — это нормально.
// =====================================================================

export const LESSONS = [
  {
    id: 1,
    sk: "Ahoj. Ako sa máš?",
    ru: "Привет. Как дела?",
    en: "Hi. How are you?",
    units: [
      {
        id: "1-1", icon: "🧑", sk: "Ľudia", ru: "Люди", en: "People",
        words: `
muž | мужчина | man | m
žena | женщина | woman | f
chlapec | мальчик, парень | boy | m
dievča | девочка, девушка | girl | n
dieťa | ребёнок | child | n
deti | дети | children | pl
dedko | дедушка | grandpa | m
babka | бабушка | grandma | f
pán | господин (пан) | Mr., gentleman | m
pani | госпожа (пани) | Mrs., lady | f
slečna | барышня, мисс (обращение) | Miss | f
človek | человек | person | m
ľudia | люди | people | pl
priateľ | друг; бойфренд | friend; boyfriend | m fem=priateľka
kamarát | приятель, товарищ | buddy, pal | m fem=kamarátka
`,
      },
      {
        id: "1-2", icon: "👩‍⚕️", sk: "Profesie", ru: "Профессии", en: "Professions",
        words: `
doktor | доктор | doctor | m fem=doktorka
lekár | врач | physician, medical doctor | m fem=lekárka
lektor | преподаватель (языка) | lecturer, language teacher | m fem=lektorka
učiteľ | учитель | teacher | m fem=učiteľka
študent | студент | student | m fem=študentka
žiak | ученик (школьник) | pupil | m fem=žiačka
kuchár | повар | cook | m fem=kuchárka
čašník | официант | waiter | m fem=čašníčka
policajt | полицейский | police officer | m fem=policajtka
poštár | почтальон | postman | m fem=poštárka
spevák | певец | singer | m fem=speváčka
úradník | служащий, чиновник | clerk | m fem=úradníčka
tenista | теннисист | tennis player | m fem=tenistka
hokejista | хоккеист | hockey player | m fem=hokejistka
gitarista | гитарист | guitarist | m fem=gitaristka
profesia | профессия | profession | f
`,
      },
      {
        id: "1-3", icon: "✏️", sk: "V triede", ru: "В классе", en: "In the classroom",
        words: `
trieda | класс (комната) | classroom | f
škola | школа | school | f
stôl | стол | table | m
stolička | стул | chair | f
kniha | книга | book | f
zošit | тетрадь | notebook | m
pero | ручка | pen | n
ceruzka | карандаш | pencil | f
guma | ластик | eraser | f
pravítko | линейка | ruler | n
taška | сумка | bag | f
tabuľa | доска | board | f
počítač | компьютер | computer | m
kalkulačka | калькулятор | calculator | f
mapa | карта | map | f
papier | бумага | paper | m
nožnice | ножницы | scissors | pl
obal | обложка (для тетради, книги) | cover (for a book) | m
kalendár | календарь | calendar | m
slovník | словарь | dictionary | m
mobil | мобильный телефон | mobile phone | m
okuliare | очки | glasses | pl
`,
      },
      {
        id: "1-4", icon: "🪑", sk: "V izbe", ru: "В комнате", en: "In the room",
        words: `
izba | комната | room | f
okno | окно | window | n
dvere | дверь | door | pl
kreslo | кресло | armchair | n
lampa | лампа | lamp | f
hodiny | часы (настенные) | clock | pl
kvet | цветок | flower | m
jablko | яблоко | apple | n
kôš | корзина (мусорная) | basket, bin | m
kancelária | офис, кабинет | office | f
dom | дом | house | m
lopta | мяч | ball | f
kľúč | ключ | key | m
pohár | стакан | glass, cup | m
televízor | телевизор | TV set | m
posteľ | кровать | bed | f
`,
      },
      {
        id: "1-5", icon: "📍", sk: "Kde je to?", ru: "Где это?", en: "Where is it?",
        words: `
kde | где | where
tu | здесь | here
tam | там | there
hore | вверху | up, at the top
dole | внизу | down, at the bottom
vpravo | справа | on the right
vľavo | слева | on the left
vpredu | впереди | in front
vzadu | сзади | at the back
uprostred | посередине | in the middle
doma | дома | at home
v škole | в школе | at school
kto | кто | who
čo | что | what
áno | да | yes
nie | нет; не | no; not
`,
      },
      {
        id: "1-6", icon: "👋", sk: "Pozdravy", ru: "Приветствия", en: "Greetings",
        words: `
Ahoj! | Привет! / Пока! | Hi! / Bye!
Čau! | Привет! / Пока! (разг.) | Hi! / Bye! (casual)
Dobrý deň! | Добрый день! Здравствуйте! | Good day! Hello!
Dobré ráno! | Доброе утро! | Good morning!
Dobrý večer! | Добрый вечер! | Good evening!
Dobrú noc! | Спокойной ночи! | Good night!
Dovidenia! | До свидания! | Goodbye!
Ďakujem. | Спасибо. | Thank you.
Prosím. | Пожалуйста (просьба; ответ на «спасибо»). | Please. / You're welcome.
Nech sa páči. | Вот, возьмите. / Прошу. | Here you are.
Na zdravie! | Будь здоров! / За здоровье! | Bless you! / Cheers!
Dobrú chuť! | Приятного аппетита! | Enjoy your meal!
Teší ma. | Очень приятно. | Nice to meet you.
Kto si? | Кто ты? | Who are you? (informal)
Kto ste? | Кто вы? | Who are you? (formal)
Odkiaľ si? | Откуда ты? | Where are you from? (informal)
Odkiaľ ste? | Откуда вы? | Where are you from? (formal)
Som zo Slovenska. | Я из Словакии. | I am from Slovakia.
`,
      },
      {
        id: "1-7", icon: "🙂", sk: "Ako sa máš?", ru: "Как дела?", en: "How are you?",
        words: `
Ako sa máš? | Как дела? (на «ты») | How are you? (informal)
Ako sa máte? | Как дела? (на «вы») | How are you? (formal)
výborne | отлично | excellent
skvele | великолепно | great
dobre | хорошо | well, fine
nie dobre | не очень хорошо | not well
zle | плохо | badly
A ty? | А ты? | And you? (informal)
A vy? | А вы? | And you? (formal)
Aj ja. | Я тоже. | Me too.
tykať | говорить на «ты» | to say "ty" (informal)
vykať | говорить на «вы» | to say "vy" (formal)
`,
      },
    ],
    sentences: `
Som študent. | Я студент. | I am a student.
Ona je lektorka. | Она преподаватель (языка). | She is a lecturer.
Nie som doktor. | Я не врач. | I am not a doctor.
Kde je pero? | Где ручка? | Where is the pen?
Lampa je vľavo hore. | Лампа слева вверху. | The lamp is up on the left.
Stôl je uprostred. | Стол посередине. | The table is in the middle.
Kto je to? | Кто это? | Who is it?
Vy ste pán Novák? | Вы господин Новак? | Are you Mr. Novák?
Ako sa máš? Dobre, a ty? | Как дела? Хорошо, а у тебя? | How are you? Fine, and you?
Alica dnes nie je v škole. | Алицы сегодня нет в школе. | Alica is not at school today.
Minerálka je tu vľavo. | Минералка здесь слева. | The mineral water is here on the left.
Som zo Slovenska. | Я из Словакии. | I am from Slovakia.
`,
  },

  {
    id: 2,
    sk: "Aký som? Aký si? Aký je?",
    ru: "Какой я? Какой ты? Какой он?",
    en: "What am I like?",
    units: [
      {
        id: "2-1", icon: "🎨", sk: "Farby", ru: "Цвета", en: "Colours",
        words: `
farba | цвет | colour | f
modrý | синий, голубой | blue
červený | красный | red
zelený | зелёный | green
žltý | жёлтый | yellow
biely | белый | white
čierny | чёрный | black
sivý | серый | grey
ružový | розовый | pink
oranžový | оранжевый | orange
fialový | фиолетовый | purple
hnedý | коричневый | brown
`,
      },
      {
        id: "2-2", icon: "📏", sk: "Aký je? (1)", ru: "Какой? Размер и вид", en: "Size & look",
        words: `
mladý | молодой | young | opp=starý
starý | старый | old | opp=mladý
malý | маленький | small | opp=veľký
veľký | большой | big | opp=malý
nový | новый | new | opp=starý
pekný | красивый | pretty, nice | opp=škaredý
škaredý | некрасивый, уродливый | ugly | opp=pekný
dlhý | длинный | long | opp=krátky
krátky | короткий | short (not long) | opp=dlhý
nízky | низкий, невысокий | low, short (not tall) | opp=vysoký
vysoký | высокий | tall, high | opp=nízky
tučný | толстый (о человеке) | fat | opp=štíhly
štíhly | стройный | slim | opp=tučný
tenký | тонкий | thin | opp=hrubý
hrubý | толстый (о предмете) | thick | opp=tenký
široký | широкий | wide | opp=úzky
úzky | узкий | narrow | opp=široký
rýchly | быстрый | fast | opp=pomalý
pomalý | медленный | slow | opp=rýchly
ťažký | тяжёлый; трудный | heavy; difficult | opp=ľahký
ľahký | лёгкий | light; easy | opp=ťažký
`,
      },
      {
        id: "2-3", icon: "✨", sk: "Aký je? (2)", ru: "Какой? Свойства", en: "Qualities",
        words: `
dobrý | хороший | good | opp=zlý
zlý | плохой, злой | bad | opp=dobrý
čistý | чистый | clean | opp=špinavý
špinavý | грязный | dirty | opp=čistý
plný | полный | full | opp=prázdny
prázdny | пустой | empty | opp=plný
studený | холодный | cold | opp=teplý
teplý | тёплый | warm | opp=studený
svetlý | светлый | light, bright | opp=tmavý
tmavý | тёмный | dark | opp=svetlý
nudný | скучный | boring | opp=zaujímavý
zaujímavý | интересный | interesting | opp=nudný
moderný | современный | modern | opp=nemoderný
obľúbený | любимый | favourite | opp=neobľúbený
sladký | сладкий | sweet
`,
      },
      {
        id: "2-4", icon: "😊", sk: "Aký som?", ru: "Какой я? Характер", en: "Character",
        words: `
hladný | голодный | hungry | opp=sýty
sýty | сытый | full (not hungry) | opp=hladný
smädný | испытывающий жажду | thirsty
chorý | больной | ill | opp=zdravý
zdravý | здоровый | healthy | opp=chorý
smutný | грустный | sad | opp=veselý
veselý | весёлый | cheerful | opp=smutný
múdry | мудрый, умный | wise, clever | opp=hlúpy
hlúpy | глупый | stupid | opp=múdry
inteligentný | умный, сообразительный | intelligent | opp=hlúpy
aktívny | активный | active | opp=lenivý
lenivý | ленивый | lazy | opp=aktívny
šťastný | счастливый | happy | opp=nešťastný
nešťastný | несчастный | unhappy | opp=šťastný
úspešný | успешный | successful | opp=neúspešný
usilovný | старательный, прилежный | hard-working
sympatický | приятный, симпатичный (о человеке) | likeable, pleasant | opp=nesympatický
unavený | уставший | tired
`,
      },
      {
        id: "2-5", icon: "👨‍👩‍👧‍👦", sk: "Rodina", ru: "Семья", en: "Family",
        words: `
rodina | семья | family | f
otec | отец | father | m
mama | мама | mum | f
syn | сын | son | m
dcéra | дочь | daughter | f
brat | брат | brother | m
sestra | сестра | sister | f
starý otec | дедушка | grandfather | m alt=dedko
stará mama | бабушка | grandmother | f alt=babka
vnuk | внук | grandson | m
vnučka | внучка | granddaughter | f
manžel | муж (супруг) | husband | m
manželka | жена (супруга) | wife | f
pes | собака | dog | m
mačka | кошка | cat | f
kurča | цыплёнок | chick | n
`,
      },
      {
        id: "2-6", icon: "🔢", sk: "Čísla 0–20", ru: "Числа 0–20", en: "Numbers 0–20",
        words: `
nula | 0 | 0
jeden | 1 | 1
dva | 2 | 2
tri | 3 | 3
štyri | 4 | 4
päť | 5 | 5
šesť | 6 | 6
sedem | 7 | 7
osem | 8 | 8
deväť | 9 | 9
desať | 10 | 10
jedenásť | 11 | 11
dvanásť | 12 | 12
trinásť | 13 | 13
štrnásť | 14 | 14
pätnásť | 15 | 15
šestnásť | 16 | 16
sedemnásť | 17 | 17
osemnásť | 18 | 18
devätnásť | 19 | 19
dvadsať | 20 | 20
`,
      },
      {
        id: "2-7", icon: "💯", sk: "Čísla do 1000", ru: "Числа до 1000", en: "Numbers to 1000",
        words: `
dvadsaťjeden | 21 | 21
tridsať | 30 | 30
štyridsať | 40 | 40
päťdesiat | 50 | 50
šesťdesiat | 60 | 60
sedemdesiat | 70 | 70
osemdesiat | 80 | 80
deväťdesiat | 90 | 90
sto | 100 | 100
dvesto | 200 | 200
tristo | 300 | 300
päťsto | 500 | 500
tisíc | 1000 | 1000
`,
      },
      {
        id: "2-8", icon: "🍽️", sk: "Jedlo a nápoje", ru: "Еда и напитки", en: "Food & drinks",
        words: `
jedlo | еда, блюдо | food, dish | n
nápoj | напиток | drink | m
voda | вода | water | f
čaj | чай | tea | m
káva | кофе | coffee | f
mlieko | молоко | milk | n
pivo | пиво | beer | n
víno | вино | wine | n
džús | сок | juice | m
minerálka | минеральная вода | mineral water | f
mäso | мясо | meat | n
kuracie mäso | курица (мясо) | chicken (meat) | n
ryba | рыба | fish | f
zelenina | овощи | vegetables | f
ovocie | фрукты | fruit | n
zmrzlina | мороженое | ice cream | f
chlieb | хлеб | bread | m
`,
      },
      {
        id: "2-9", icon: "🗣️", sk: "Jazyky a pocity", ru: "Языки и ощущения", en: "Languages & feelings",
        words: `
hovoriť po slovensky | говорить по-словацки | to speak Slovak
po anglicky | по-английски | in English
po rusky | по-русски | in Russian
po nemecky | по-немецки | in German
po španielsky | по-испански | in Spanish
po francúzsky | по-французски | in French
po česky | по-чешски | in Czech
Je mi zima. | Мне холодно. | I am cold.
Je mi teplo. | Мне тепло. | I am warm.
Som hladný. | Я голоден. | I am hungry.
Som smädný. | Я хочу пить. | I am thirsty.
šport | спорт | sport | m
hudba | музыка | music | f
film | фильм | film | m
herec | актёр | actor | m fem=herečka
hviezda | звезда | star | f
počasie | погода | weather | n
predmet | школьный предмет | school subject | m
fyzika | физика | physics | f
matematika | математика | mathematics | f
cyklistika | велоспорт | cycling | f
`,
      },
    ],
    sentences: `
Počasie je zlé. | Погода плохая. | The weather is bad.
Môj brat je veľmi inteligentný. | Мой брат очень умный. | My brother is very intelligent.
Jej obľúbený nápoj je čaj. | Её любимый напиток — чай. | Her favourite drink is tea.
Mária hovorí po slovensky. | Мария говорит по-словацки. | Mária speaks Slovak.
Je mi zima. | Мне холодно. | I am cold.
To je moja nová kniha. | Это моя новая книга. | This is my new book.
Ten vysoký muž je mladý. | Тот высокий мужчина молодой. | That tall man is young.
Jozef je zdravý a šťastný. | Йозеф здоров и счастлив. | Jozef is healthy and happy.
Aké je jeho obľúbené jedlo? | Какое его любимое блюдо? | What is his favourite food?
Káva nie je studená. | Кофе не холодный. | The coffee is not cold.
Naša učiteľka je mladá. | Наша учительница молодая. | Our teacher is young.
Kniha je hrubá. | Книга толстая. | The book is thick.
`,
  },

  {
    id: 3,
    sk: "Čo robíš? Čo rád robíš?",
    ru: "Что ты делаешь? Что любишь делать?",
    en: "What do you do? What do you like doing?",
    units: [
      {
        id: "3-1", icon: "📖", sk: "Slovesá na -ať", ru: "Глаголы на -ať", en: "A-verbs",
        words: `
čítať | читать | to read
počúvať | слушать | to listen
hrať | играть | to play
plávať | плавать | to swim
spievať | петь | to sing
vstávať | вставать | to get up
čakať | ждать | to wait
pozerať | смотреть | to watch
hľadať | искать | to look for
prechádzať sa | гулять | to go for a walk
volať sa | называться, зваться | to be called
pýtať sa | спрашивать | to ask
bývať | жить (проживать) | to live (reside)
mať | иметь | to have
večerať | ужинать | to have dinner
rozprávať sa | разговаривать | to talk, to chat
pomáhať | помогать | to help
zarábať | зарабатывать | to earn
behať | бегать | to run, to jog
`,
      },
      {
        id: "3-2", icon: "🗨️", sk: "I-slovesá (robím, spím)", ru: "I-глаголы (-ím)", en: "I-verbs (-ím)",
        words: `
robiť | делать | to do, to make
hovoriť | говорить | to speak
platiť | платить | to pay
učiť | учить (кого-то), преподавать | to teach
učiť sa | учиться, учить | to learn, to study
variť | варить, готовить | to cook
fajčiť | курить | to smoke
sedieť | сидеть | to sit
spať | спать | to sleep
stáť | стоять; стоить | to stand; to cost
vidieť | видеть | to see
cvičiť | упражняться, делать зарядку | to exercise, to work out
myslieť | думать | to think
mlčať | молчать | to be silent
`,
      },
      {
        id: "3-3", icon: "✍️", sk: "Slovesá na -ovať a iné", ru: "Глаголы на -ovať и др.", en: "-ovať & other verbs",
        words: `
písať | писать | to write
piť | пить | to drink
jesť | есть (кушать) | to eat
ísť | идти, ехать | to go
žiť | жить | to live
študovať | учиться, изучать | to study
pracovať | работать | to work
cestovať | путешествовать, ездить | to travel
nakupovať | делать покупки | to shop
telefonovať | звонить по телефону | to phone
tancovať | танцевать | to dance
šoférovať | водить машину | to drive
športovať | заниматься спортом | to do sports
obedovať | обедать | to have lunch
raňajkovať | завтракать | to have breakfast
oddychovať | отдыхать | to rest
zabudnúť | забыть | to forget
rozumieť | понимать | to understand
relaxovať | расслабляться | to relax
navštevovať | посещать | to visit, to attend
opravovať | ремонтировать, чинить | to repair
plakať | плакать | to cry
`,
      },
      {
        id: "3-4", icon: "🚿", sk: "Denný program", ru: "Распорядок дня", en: "Daily routine",
        words: `
umývať sa | умываться | to wash (oneself)
sprchovať sa | принимать душ | to take a shower
obliekať sa | одеваться | to get dressed
česať sa | причёсываться | to comb one's hair
upratovať | убирать (квартиру) | to tidy up
prať | стирать | to do the laundry
pozerať televíziu | смотреть телевизор | to watch TV
ísť spať | идти спать | to go to bed
ísť do školy | идти в школу | to go to school
raňajky | завтрак | breakfast | pl
obed | обед | lunch | m
večera | ужин | dinner | f
domáca úloha | домашнее задание | homework | f
noviny | газета | newspaper | pl
prestávka | перемена, перерыв | break | f
voľno | свободное время | free time | n
`,
      },
      {
        id: "3-5", icon: "📅", sk: "Dni v týždni", ru: "Дни недели", en: "Days of the week",
        words: `
pondelok | понедельник | Monday | m
utorok | вторник | Tuesday | m
streda | среда | Wednesday | f
štvrtok | четверг | Thursday | m
piatok | пятница | Friday | m
sobota | суббота | Saturday | f
nedeľa | воскресенье | Sunday | f
víkend | выходные | weekend | m
cez víkend | на выходных | at the weekend
týždeň | неделя | week | m
deň | день | day | m
dnes | сегодня | today
včera | вчера | yesterday
zajtra | завтра | tomorrow
kedy | когда | when
`,
      },
      {
        id: "3-6", icon: "🕗", sk: "Koľko je hodín?", ru: "Который час?", en: "What time is it?",
        words: `
Koľko je hodín? | Который час? | What time is it?
O koľkej? | Во сколько? | At what time?
Je jedna. | Сейчас час. | It's one o'clock.
Sú dve. | Сейчас два часа. | It's two o'clock.
Je päť. | Сейчас пять часов. | It's five o'clock.
noc | ночь | night | f
hodina | час; урок | hour; lesson | f
minúta | минута | minute | f
ráno | утро, утром | morning | n
dopoludnia | до полудня | in the late morning
napoludnie | в полдень | at noon
popoludní | после полудня, днём | in the afternoon
večer | вечер, вечером | evening | m
v noci | ночью | at night
`,
      },
      {
        id: "3-7", icon: "🔁", sk: "Ako často?", ru: "Как часто?", en: "How often?",
        words: `
vždy | всегда | always
každý deň | каждый день | every day
obyčajne | обычно | usually | alt=zvyčajne
pravidelne | регулярно | regularly
často | часто | often
niekedy | иногда | sometimes
občas | время от времени | occasionally
zriedka | редко | rarely | alt=málokedy
nikdy | никогда | never
teraz | сейчас | now
potom | потом | then, afterwards
skoro | рано | early
neskoro | поздно | late
`,
      },
      {
        id: "3-8", icon: "💪", sk: "Musím, chcem, môžem", ru: "Модальные глаголы", en: "Modal verbs",
        words: `
musieť | быть должным, надо | must, to have to
chcieť | хотеть | to want
môcť | мочь (есть возможность) | can, to be able
smieť | мочь (есть разрешение) | may, to be allowed
vedieť | знать; уметь | to know; to know how
nemusieť | не обязательно, не надо | not to have to
nesmieť | нельзя | must not
Rád čítam. | Я люблю читать. (о мужчине) | I like reading. (man)
Rada čítam. | Я люблю читать. (о женщине) | I like reading. (woman)
prečo | почему | why
pretože | потому что | because
spolu | вместе | together
iba | только | only | alt=len
`,
      },
      {
        id: "3-9", icon: "🛒", sk: "V obchode", ru: "В магазине", en: "In the shop",
        words: `
obchod | магазин | shop | m
predavač | продавец | shop assistant | m fem=predavačka
zákazník | покупатель | customer | m fem=zákazníčka
pokladník | кассир | cashier | m fem=pokladníčka
vozík | тележка | shopping trolley | m
predávať | продавать | to sell
skúšať | примерять; пробовать | to try on; to try
pokladňa | касса | checkout | f
košík | корзина | basket | m
tovar | товар | goods | m
euro | евро | euro | n
cent | цент | cent | m
peniaze | деньги | money | pl
Koľko stojí? | Сколько стоит? | How much is it?
Koľko platím? | Сколько я плачу? | How much do I pay?
Prosím si... | Мне, пожалуйста... | I'd like...
Ešte niečo? | Что-нибудь ещё? | Anything else?
drahý | дорогой | expensive | opp=lacný
lacný | дешёвый | cheap | opp=drahý
`,
      },
      {
        id: "3-10", icon: "🍎", sk: "Potraviny", ru: "Продукты", en: "Groceries",
        words: `
jablká | яблоки | apples | pl
hrušky | груши | pears | pl
banány | бананы | bananas | pl
citróny | лимоны | lemons | pl
paradajky | помидоры | tomatoes | pl
cibuľa | лук | onion | f
zemiaky | картофель | potatoes | pl
ryža | рис | rice | f
čokoláda | шоколад | chocolate | f
jogurt | йогурт | yoghurt | m
vajce | яйцо | egg | n
šalát | салат | salad | m
syr | сыр | cheese | m
dezert | десерт | dessert | m
`,
      },
      {
        id: "3-11", icon: "🧥", sk: "Oblečenie", ru: "Одежда", en: "Clothes",
        words: `
oblečenie | одежда | clothes | n
čiapka | шапка | cap, hat | f
dáždnik | зонт | umbrella | m
šál | шарф | scarf | m
kabát | пальто | coat | m
rukavice | перчатки | gloves | pl
topánky | обувь, ботинки | shoes | pl
sukňa | юбка | skirt | f
košeľa | рубашка | shirt | f
sveter | свитер | sweater | m
tričko | футболка | T-shirt | n
`,
      },
    ],
    sentences: `
Milan študuje v Bratislave. | Милан учится в Братиславе. | Milan studies in Bratislava.
Večer pozerám film. | Вечером я смотрю фильм. | In the evening I watch a film.
Čo robíš cez víkend? | Что ты делаешь на выходных? | What do you do at the weekend?
Rád hrám futbal. | Я люблю играть в футбол. | I like playing football.
Musím písať domácu úlohu. | Мне надо делать домашнее задание. | I have to do my homework.
Môžem ísť ďalej? | Можно войти? | May I come in?
Neviem hovoriť po francúzsky. | Я не умею говорить по-французски. | I can't speak French.
Koľko stojí káva? | Сколько стоит кофе? | How much is the coffee?
Nikdy nepijem alkohol. | Я никогда не пью алкоголь. | I never drink alcohol.
Ako sa voláš? | Как тебя зовут? | What is your name?
Volám sa Ivana. | Меня зовут Ивана. | My name is Ivana.
V sobotu obedujú v reštaurácii. | В субботу они обедают в ресторане. | On Saturday they have lunch in a restaurant.
Ráno sa vždy sprchujem. | Утром я всегда принимаю душ. | I always take a shower in the morning.
`,
  },

  {
    id: 4,
    sk: "Mám rád...",
    ru: "Я люблю...",
    en: "I like...",
    units: [
      {
        id: "4-1", icon: "👪", sk: "Rodina a príbuzní", ru: "Родственники", en: "Relatives",
        words: `
teta | тётя | aunt | f
strýko | дядя | uncle | m alt=ujo
ujo | дядя (брат мамы) | uncle (mother's brother) | m
bratranec | двоюродный брат | cousin (male) | m
sesternica | двоюродная сестра | cousin (female) | f
rodičia | родители | parents | pl
starí rodičia | бабушка и дедушка | grandparents | pl
dôchodca | пенсионер | pensioner | m fem=dôchodkyňa
manželia | супруги | married couple | pl
ženatý | женатый | married (man)
vydatá | замужняя | married (woman)
`,
      },
      {
        id: "4-2", icon: "💻", sk: "Počítač", ru: "Компьютер", en: "Computer",
        words: `
klávesnica | клавиатура | keyboard | f
myš | мышь | mouse | f
monitor | монитор | monitor | m
tlačiareň | принтер | printer | f
reproduktory | колонки | speakers | pl
slúchadlá | наушники | headphones | pl
mikrofón | микрофон | microphone | m
skener | сканер | scanner | m
USB kľúč | флешка | USB stick | m
internet | интернет | internet | m
e-mail | электронное письмо | e-mail | m
surfovať po internete | сидеть в интернете | to surf the internet
tlačiť | печатать | to print
ukladať | сохранять | to save
skenovať | сканировать | to scan
`,
      },
      {
        id: "4-3", icon: "⚽", sk: "Voľný čas", ru: "Свободное время", en: "Free time",
        words: `
koncert | концерт | concert | m
rande | свидание | date | n
futbal | футбол | football | m
tenis | теннис | tennis | m
volejbal | волейбол | volleyball | m
šach | шахматы | chess | m
turistika | туризм, походы | hiking | f
bicyklovať sa | кататься на велосипеде | to ride a bike
lyžovať sa | кататься на лыжах | to ski
korčuľovať sa | кататься на коньках | to skate
fotografovať | фотографировать | to take photos
kresliť | рисовать (карандашом) | to draw
maľovať | рисовать красками | to paint
záľuba | хобби, увлечение | hobby | f
pozerať sa na | смотреть на | to look at
ihrisko | спортивная или детская площадка | playground | n
`,
      },
      {
        id: "4-4", icon: "🏔️", sk: "Dovolenka", ru: "Отпуск", en: "Holiday",
        words: `
dovolenka | отпуск | holiday | f
pohorie | горный хребет | mountain range | n
hora | гора | mountain | f
jazero | озеро | lake | n
rieka | река | river | f
jaskyňa | пещера | cave | f
hrad | замок (крепость) | castle | m
kostol | церковь | church | m
dolina | долина | valley | f
priehrada | водохранилище | reservoir, dam | f
les | лес | forest | m
príroda | природа | nature | f
kúpele | курорт (с минеральной водой) | spa | pl
penzión | пансион, гостевой дом | guesthouse | m
kemp | кемпинг | campsite | m
bazén | бассейн | swimming pool | m
lanovka | канатная дорога | cable car | f
cestovná kancelária | турагентство | travel agency | f
`,
      },
      {
        id: "4-5", icon: "🧀", sk: "Slovenské tradície", ru: "Словацкие традиции", en: "Slovak traditions",
        words: `
salaš | салаш (горная овчарня) | sheep farm | m
bryndza | брынза | sheep cheese | f
bryndzové halušky | брынзовые галушки | potato dumplings with sheep cheese | pl
žinčica | жинчица (сыворотка) | sheep whey drink | f
krčma | корчма, трактир | pub, tavern | f
folklór | фольклор | folklore | m
dedina | деревня | village | f
koza | коза | goat | f
ovca | овца | sheep | f
sliepka | курица (птица) | hen | f
chytať ryby | ловить рыбу | to fish
rybolov | рыбалка | fishing | m
ochutnať | попробовать (на вкус) | to taste
leto | лето | summer | n
zima | зима; холод | winter; cold | f
`,
      },
      {
        id: "4-6", icon: "⏭️", sk: "Budúcnosť", ru: "Будущее", en: "Future",
        words: `
budúci týždeň | на следующей неделе | next week
budúci mesiac | в следующем месяце | next month
budúci rok | в следующем году | next year
o chvíľu | через минутку | in a moment
o hodinu | через час | in an hour
o týždeň | через неделю | in a week
budúcnosť | будущее | future | f
stretnúť sa | встретиться | to meet
Uvidíme sa. | Увидимся. | See you.
tešiť sa na | с нетерпением ждать, радоваться | to look forward to
pozývať | приглашать | to invite
darček | подарок | present | m
`,
      },
      {
        id: "4-7", icon: "🙏", sk: "Zdvorilo", ru: "Вежливость", en: "Being polite",
        words: `
Prepáč. | Прости. / Извини. | Sorry. (informal)
Prepáčte. | Простите. / Извините. | Sorry. / Excuse me. (formal)
Prepáčte, že meškám. | Простите, что опаздываю. | Sorry I'm late.
To je v poriadku. | Всё в порядке. | That's all right.
Nič sa nestalo. | Ничего страшного. | No problem.
Bohužiaľ. | К сожалению. | Unfortunately.
Pozývam ťa na kávu. | Приглашаю тебя на кофе. | Let me buy you a coffee.
Nemám čas. | У меня нет времени. | I have no time.
Možno zajtra. | Может быть, завтра. | Maybe tomorrow.
Mám rád kávu. | Я люблю кофе. (о мужчине) | I like coffee. (man)
Mám rada kávu. | Я люблю кофе. (о женщине) | I like coffee. (woman)
Ponáhľam sa. | Я спешу. | I'm in a hurry.
`,
      },
    ],
    sentences: `
Mám rád kvalitnú kávu. | Я люблю хороший кофе. | I like good coffee.
Nemám rada kávu. | Я не люблю кофе. (говорит женщина) | I don't like coffee. (woman)
Pijem iba zelený čaj. | Я пью только зелёный чай. | I only drink green tea.
Čakám na môjho otca. | Я жду своего отца. | I am waiting for my father.
Pozývam ťa na kávu. | Приглашаю тебя на кофе. | Let me buy you a coffee.
Prepáčte, že meškám. | Простите, что опаздываю. | Sorry I'm late.
Choď do školy! | Иди в школу! | Go to school!
Počúvajte učiteľa! | Слушайте учителя! | Listen to the teacher!
Vidím tvojho brata. | Я вижу твоего брата. | I see your brother.
Cez víkend bude pekné počasie. | На выходных будет хорошая погода. | The weather will be nice at the weekend.
Budeme sa učiť tancovať tango. | Мы будем учиться танцевать танго. | We will learn to dance the tango.
Zajtra pôjdem do kina. | Завтра я пойду в кино. | Tomorrow I will go to the cinema.
`,
  },

  {
    id: 5,
    sk: "Čo má naše mesto?",
    ru: "Что есть в нашем городе?",
    en: "What does our town have?",
    units: [
      {
        id: "5-1", icon: "🏙️", sk: "Mesto (1)", ru: "Город (1)", en: "Town (1)",
        words: `
mesto | город | town, city | n
ulica | улица | street | f
námestie | площадь | square | n
park | парк | park | m
most | мост | bridge | m
socha | статуя | statue | f
fontána | фонтан | fountain | f
palác | дворец | palace | m
trh | рынок | market | m
supermarket | супермаркет | supermarket | m
hlavné mesto | столица | capital city | n
banka | банк | bank | f
pošta | почта | post office | f
nábrežie | набережная | embankment | n
centrum | центр | centre | n
`,
      },
      {
        id: "5-2", icon: "🏛️", sk: "Mesto (2)", ru: "Город (2)", en: "Town (2)",
        words: `
kino | кинотеатр | cinema | n
divadlo | театр | theatre | n
múzeum | музей | museum | n
galéria | галерея | gallery | f
knižnica | библиотека | library | f
kaviareň | кафе (кофейня) | café | f
cukráreň | кондитерская | pastry shop | f
reštaurácia | ресторан | restaurant | f
nemocnica | больница | hospital | f
univerzita | университет | university | f
informačné centrum | информационный центр | information centre | n
hotel | гостиница | hotel | m
jedáleň | столовая | canteen | f
`,
      },
      {
        id: "5-3", icon: "🚌", sk: "Doprava", ru: "Транспорт", en: "Transport",
        words: `
stanica | вокзал, станция | station | f
zastávka | остановка | stop | f
letisko | аэропорт | airport | n
parkovisko | парковка | car park | n
autobus | автобус | bus | m
električka | трамвай | tram | f
vlak | поезд | train | m
taxík | такси | taxi | m
auto | машина | car | n
lietadlo | самолёт | plane | n
bicykel | велосипед | bicycle | m
križovatka | перекрёсток | crossroads | f
semafor | светофор | traffic lights | m
pešo | пешком | on foot
`,
      },
      {
        id: "5-4", icon: "🧭", sk: "Ako sa dostanem?", ru: "Как пройти?", en: "Directions",
        words: `
Kde sa nachádza...? | Где находится...? | Where is...?
Ako sa dostanem na...? | Как мне попасть на...? | How do I get to...?
Kde nájdem...? | Где мне найти...? | Where can I find...?
odbočiť | повернуть | to turn
Choďte rovno. | Идите прямо. | Go straight on.
Odbočte doľava. | Поверните налево. | Turn left.
Odbočte doprava. | Поверните направо. | Turn right.
na koniec ulice | в конец улицы | to the end of the street
doľava | налево | to the left
doprava | направо | to the right
rovno | прямо | straight on
kam | куда | where to
ďaleko | далеко | far
blízko | близко | near
`,
      },
      {
        id: "5-5", icon: "⏮️", sk: "Minulosť", ru: "Прошлое", en: "The past",
        words: `
predvčerom | позавчера | the day before yesterday
minulý týždeň | на прошлой неделе | last week
minulý mesiac | в прошлом месяце | last month
minulý rok | в прошлом году | last year
kúpiť | купить | to buy
predať | продать | to sell (once)
dostať | получить | to get, to receive
navštíviť | посетить | to visit
prísť | прийти, приехать | to come, to arrive
odísť | уйти, уехать | to leave
vyhrať | выиграть | to win
vrátiť sa | вернуться | to return
zobudiť sa | проснуться | to wake up
opýtať sa | спросить | to ask
odpovedať | отвечать | to answer
meškať | опаздывать | to be late
ponáhľať sa | спешить, торопиться | to hurry
`,
      },
      {
        id: "5-6", icon: "🏠", sk: "Život a práca", ru: "Жизнь и работа", en: "Life & work",
        words: `
byt | квартира | flat | m
záhrada | сад | garden | f
firma | фирма | company | f
šéf | шеф, начальник | boss | m
riaditeľ | директор | director | m fem=riaditeľka
novinár | журналист | journalist | m fem=novinárka
robotník | рабочий | worker | m
pokuta | штраф | fine | f
nálada | настроение | mood | f
výročie | годовщина | anniversary | n
slobodný | неженатый / незамужняя | single, unmarried | fem=slobodná
šťastie | счастье, удача | happiness, luck | n
bohatý | богатый | rich
Gratulujem! | Поздравляю! | Congratulations!
Čo sa stalo? | Что случилось? | What happened?
Samozrejme. | Конечно. | Of course.
`,
      },
    ],
    sentences: `
Včera som bol doma. | Вчера я был дома. | Yesterday I was at home.
Čítala som zaujímavú knihu. | Я читала интересную книгу. | I was reading an interesting book.
Kedy si kúpil auto? | Когда ты купил машину? | When did you buy the car?
Minulý rok sme boli na Slovensku. | В прошлом году мы были в Словакии. | Last year we were in Slovakia.
Ráno som sa umýval. | Утром я умывался. | In the morning I washed.
Na čo som zabudol? | О чём я забыл? | What did I forget?
Peter vyhral v lotérii. | Петер выиграл в лотерею. | Peter won the lottery.
Kde sa nachádza stanica? | Где находится вокзал? | Where is the station?
Choďte rovno a odbočte doľava. | Идите прямо и поверните налево. | Go straight on and turn left.
Ako sa dostanem na námestie? | Как мне попасть на площадь? | How do I get to the square?
Mal som zlú náladu. | У меня было плохое настроение. | I was in a bad mood.
Vidíte ten kostol? | Видите ту церковь? | Do you see that church?
`,
  },

  {
    id: 6,
    sk: "Krajiny a ľudia",
    ru: "Страны и люди",
    en: "Countries and people",
    units: [
      {
        id: "6-1", icon: "🌍", sk: "Krajiny", ru: "Страны", en: "Countries",
        words: `
krajina | страна | country | f
Slovensko | Словакия | Slovakia | n
Česko | Чехия | Czechia | n
Poľsko | Польша | Poland | n
Maďarsko | Венгрия | Hungary | n
Rakúsko | Австрия | Austria | n
Nemecko | Германия | Germany | n
Ukrajina | Украина | Ukraine | f
Rusko | Россия | Russia | n
Taliansko | Италия | Italy | n
Španielsko | Испания | Spain | n
Francúzsko | Франция | France | n
Anglicko | Англия | England | n
Spojené štáty | США | United States | pl alt=USA
Čína | Китай | China | f
Japonsko | Япония | Japan | n
Veľká Británia | Великобритания | Great Britain | f
`,
      },
      {
        id: "6-2", icon: "🧑‍🤝‍🧑", sk: "Národnosti a jazyky", ru: "Национальности и языки", en: "Nationalities & languages",
        words: `
Slovák | словак | Slovak (man) | m fem=Slovenka
Čech | чех | Czech (man) | m fem=Češka
Nemec | немец | German (man) | m fem=Nemka
Rus | русский | Russian (man) | m fem=Ruska
Ukrajinec | украинец | Ukrainian (man) | m fem=Ukrajinka
Angličan | англичанин | Englishman | m fem=Angličanka
Talian | итальянец | Italian (man) | m fem=Talianka
Španiel | испанец | Spaniard | m fem=Španielka
Američan | американец | American (man) | m fem=Američanka
Francúz | француз | Frenchman | m fem=Francúzka
Číňan | китаец | Chinese (man) | m fem=Číňanka
Japonec | японец | Japanese (man) | m fem=Japonka
Brit | британец | Briton | m fem=Britka
národnosť | национальность | nationality | f
slovenčina | словацкий язык | Slovak (language) | f
angličtina | английский язык | English (language) | f
nemčina | немецкий язык | German (language) | f
ruština | русский язык | Russian (language) | f
ukrajinčina | украинский язык | Ukrainian (language) | f
po taliansky | по-итальянски | in Italian
po japonsky | по-японски | in Japanese
po čínsky | по-китайски | in Chinese
`,
      },
      {
        id: "6-3", icon: "🧭", sk: "Kontinenty", ru: "Континенты", en: "Continents",
        words: `
kontinent | континент | continent | m
Európa | Европа | Europe | f
Ázia | Азия | Asia | f
Afrika | Африка | Africa | f
Severná Amerika | Северная Америка | North America | f
Južná Amerika | Южная Америка | South America | f
Austrália | Австралия | Australia | f
Antarktída | Антарктида | Antarctica | f
sever | север | north | m
juh | юг | south | m
východ | восток | east | m
západ | запад | west | m
na severe | на севере | in the north
na juhu | на юге | in the south
svet | мир, свет | world | m
`,
      },
      {
        id: "6-4", icon: "🌋", sk: "Príroda", ru: "Природа", en: "Nature",
        words: `
more | море | sea | n
oceán | океан | ocean | m
ostrov | остров | island | m
nížina | низменность | lowland | f
pole | поле | field | n
púšť | пустыня | desert | f
sopka | вулкан | volcano | f
vodopád | водопад | waterfall | m
pláž | пляж | beach | f
piesok | песок | sand | m
prales | джунгли, тропический лес | rainforest | m
palma | пальма | palm tree | f
`,
      },
      {
        id: "6-5", icon: "📝", sk: "Osobné údaje", ru: "Личные данные", en: "Personal details",
        words: `
meno | имя | first name | n
priezvisko | фамилия | surname | n
vek | возраст | age | m
adresa | адрес | address | f
telefónne číslo | номер телефона | phone number | n
rodinný stav | семейное положение | marital status | m
rozvedený | разведённый | divorced | fem=rozvedená
vzdelanie | образование | education | n
zamestnanie | профессия, работа | occupation | n
pas | паспорт | passport | m
formulár | анкета, бланк | form | m
nezamestnaný | безработный | unemployed | fem=nezamestnaná
Koľko máte rokov? | Сколько вам лет? | How old are you?
Mám dvadsať rokov. | Мне двадцать лет. | I am twenty.
`,
      },
      {
        id: "6-6", icon: "💼", sk: "Zamestnania", ru: "Профессии (2)", en: "Jobs",
        words: `
šofér | водитель | driver | m fem=šoférka
maliar | художник; маляр | painter | m fem=maliarka
fotograf | фотограф | photographer | m fem=fotografka
pilot | пилот | pilot | m fem=pilotka
podnikateľ | предприниматель | businessman | m fem=podnikateľka
programátor | программист | programmer | m fem=programátorka
sudca | судья | judge | m fem=sudkyňa
tanečník | танцор | dancer | m fem=tanečnica
kolega | коллега | colleague | m fem=kolegyňa
spisovateľ | писатель | writer | m fem=spisovateľka
upratovač | уборщик | cleaner | m fem=upratovačka
inžinier | инженер | engineer | m fem=inžinierka
manažér | менеджер | manager | m fem=manažérka
letuška | стюардесса | flight attendant | f
rybár | рыбак | fisherman | m fem=rybárka
`,
      },
      {
        id: "6-7", icon: "✌️", sk: "Dvaja, traja, štyria", ru: "Двое, трое, четверо", en: "Two, three, four (people)",
        words: `
dvaja | двое (о мужчинах) | two (men)
traja | трое (о мужчинах) | three (men)
štyria | четверо (о мужчинах) | four (men)
dve | две (жен. и ср. род) | two (feminine, neuter)
dvaja kuchári | двое поваров | two cooks
dva počítače | два компьютера | two computers
dve knihy | две книги | two books
tri autá | три машины | three cars
štyria chlapci | четверо мальчиков | four boys
`,
      },
    ],
    sentences: `
Som z Ukrajiny. | Я из Украины. | I am from Ukraine.
Hovorím po slovensky a po anglicky. | Я говорю по-словацки и по-английски. | I speak Slovak and English.
Odkiaľ ste? | Откуда вы? | Where are you from?
Na Slovensku sú krásne hory. | В Словакии красивые горы. | There are beautiful mountains in Slovakia.
Tam sú dvaja kuchári. | Там двое поваров. | There are two cooks there.
Na stole sú štyri knihy. | На столе четыре книги. | There are four books on the table.
Mám dvadsaťosem rokov. | Мне двадцать восемь лет. | I am twenty-eight.
Som slobodná. | Я не замужем. | I am single. (woman)
Pracujem ako lektor. | Я работаю преподавателем (языка). | I work as a lecturer.
Európa je kontinent. | Европа — это континент. | Europe is a continent.
To sú moji dobrí priatelia. | Это мои хорошие друзья. | These are my good friends.
Moja adresa je Štúrova ulica. | Мой адрес — улица Штура. | My address is Štúrova street.
`,
  },
];

// ---------------------------------------------------------------------
//  Разбор строк в объекты. Тут ничего менять не нужно.
// ---------------------------------------------------------------------
function parseLines(text, unitId) {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((line) => {
      const [sk, ru, en, tags = ""] = line.split("|").map((s) => s.trim());
      const w = { id: unitId + "|" + sk, unit: unitId, sk, ru, en, g: null, fem: null, opp: null, alt: [] };
      for (const tag of tags.split(/\s+/).filter(Boolean)) {
        if (["m", "f", "n", "pl"].includes(tag)) w.g = tag;
        else if (tag.startsWith("fem=")) w.fem = tag.slice(4).replace(/_/g, " ");
        else if (tag.startsWith("opp=")) w.opp = tag.slice(4).replace(/_/g, " ");
        else if (tag.startsWith("alt=")) w.alt.push(tag.slice(4).replace(/_/g, " "));
      }
      return w;
    });
}

import { EXTRA } from "./extra.js";

// Все слова и предложения в удобном виде
export const WORDS = [];
export const WORD_BY_ID = {};
export const UNIT_BY_ID = {};
export const EXTRA_UNITS = EXTRA; // доп. словарь (вкладка «Слова»), lesson = 0

for (const lesson of LESSONS) {
  for (const unit of lesson.units) {
    unit.lesson = lesson.id;
    unit.list = parseLines(unit.words, unit.id);
    UNIT_BY_ID[unit.id] = unit;
    for (const w of unit.list) {
      w.lesson = lesson.id;
      WORDS.push(w);
      WORD_BY_ID[w.id] = w;
    }
  }
  lesson.sentenceList = lesson.sentences
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line, i) => {
      const [sk, ru, en] = line.split("|").map((s) => s.trim());
      return { id: lesson.id + "#" + i, sk, ru, en };
    });
}

// Доп. словарь: слова, которых нет в учебнике (повторы пропускаем)
const known = new Set(WORDS.map((w) => w.sk.toLowerCase()));
for (const unit of EXTRA) {
  unit.lesson = 0;
  unit.list = parseLines(unit.words, unit.id).filter((w) => {
    const k = w.sk.toLowerCase();
    if (known.has(k)) return false;
    known.add(k);
    return true;
  });
  UNIT_BY_ID[unit.id] = unit;
  for (const w of unit.list) {
    w.lesson = 0;
    WORDS.push(w);
    WORD_BY_ID[w.id] = w;
  }
}
