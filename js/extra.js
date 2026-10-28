// =====================================================================
//  ДОПОЛНИТЕЛЬНЫЙ СЛОВАРЬ (вне учебника): частотные слова по темам.
//  Формат строк — как в data.js:  словацкий | русский | английский | метки
//  Слова, которые уже есть в учебнике, отсюда автоматически пропускаются.
//  Только словацкий! Проверка: node tools/check-data.mjs
// =====================================================================

export const EXTRA = [
  {
    id: "x-1", icon: "🏃", sk: "Dôležité slovesá", ru: "Важные глаголы", en: "Key verbs",
    words: `
dať | дать | to give
brať | брать | to take
vziať | взять | to take (once)
nosiť | носить | to carry, to wear
priniesť | принести | to bring
otvoriť | открыть | to open
zatvoriť | закрыть | to close
začať | начать | to begin
skončiť | закончить | to finish
stratiť | потерять | to lose
poslať | отправить | to send
ukázať | показать | to show
povedať | сказать | to say
opakovať | повторять | to repeat
vysvetliť | объяснить | to explain
počuť | слышать | to hear
cítiť | чувствовать | to feel
veriť | верить | to believe
poznať | знать (быть знакомым) | to know (be familiar with)
pamätať si | помнить | to remember
milovať | любить | to love
ľúbiť | любить (о людях) | to love (a person)
nenávidieť | ненавидеть | to hate
potrebovať | нуждаться, нужно | to need
používať | использовать | to use
ležať | лежать | to lie (be lying)
bežať | бежать | to run
chodiť | ходить | to walk, to go (regularly)
jazdiť | ездить | to ride, to drive
letieť | лететь | to fly
skákať | прыгать | to jump
padať | падать | to fall
rásť | расти | to grow
narodiť sa | родиться | to be born
zomrieť | умереть | to die
stavať | строить | to build
hrať sa | играть (о детях) | to play (games)
smiať sa | смеяться | to laugh
usmievať sa | улыбаться | to smile
kričať | кричать | to shout
čistiť | чистить | to clean
piecť | печь | to bake
kupovať | покупать | to buy (repeatedly)
požičať | одолжить | to lend, to borrow
vrátiť | вернуть (что-то) | to give back
sľúbiť | пообещать | to promise
pomôcť | помочь | to help (once)
zavolať | позвонить; позвать | to call
skúsiť | попробовать | to try
rozhodnúť sa | решить | to decide
dúfať | надеяться | to hope
báť sa | бояться | to be afraid
hnevať sa | сердиться | to be angry
ponúknuť | предложить | to offer
objednať si | заказать | to order
zaplatiť | заплатить | to pay (once)
zmeniť | изменить | to change
zapnúť | включить | to switch on
vypnúť | выключить | to switch off
čakať na | ждать (кого-то) | to wait for
`,
  },
  {
    id: "x-2", icon: "🍞", sk: "Jedlo", ru: "Еда", en: "Food",
    words: `
rožok | рогалик, булочка | bread roll | m
maslo | сливочное масло | butter | n
cukor | сахар | sugar | m
soľ | соль | salt | f
korenie | специи, перец | spice, pepper | n
olej | масло (растительное) | oil | m
múka | мука | flour | f
cestoviny | макароны | pasta | pl
polievka | суп | soup | f
bravčové mäso | свинина | pork | n
hovädzie mäso | говядина | beef | n
šunka | ветчина | ham | f
saláma | колбаса (салями) | salami | f
klobása | колбаса (жареная) | sausage | f
párok | сосиска | frankfurter | m
vajíčko | яичко, яйцо | egg | n
tvaroh | творог | cottage cheese | m
smotana | сливки, сметана | cream | f
med | мёд | honey | m
džem | джем | jam | m
koláč | пирог | cake, pie | m
torta | торт | gateau, layer cake | f
sušienka | печенье | biscuit | f
cukrík | конфета | sweet, candy | m
rezeň | шницель | schnitzel | m
hranolky | картошка фри | chips, fries | pl
omáčka | соус | sauce | f
kečup | кетчуп | ketchup | m
mrkva | морковь | carrot | f
kapusta | капуста | cabbage | f
uhorka | огурец | cucumber | f
paprika | перец (сладкий) | bell pepper | f
cesnak | чеснок | garlic | m
hrach | горох | peas | m
fazuľa | фасоль | beans | f
kukurica | кукуруза | corn | f
huby | грибы | mushrooms | pl
jahoda | клубника | strawberry | f
čerešňa | черешня | cherry | f
slivka | слива | plum | f
broskyňa | персик | peach | f
hrozno | виноград | grapes | n
pomaranč | апельсин | orange | m
mandarínka | мандарин | tangerine | f
melón | арбуз, дыня | melon | m
orech | орех | nut | m
limonáda | лимонад | lemonade | f
kofola | кофола (словацкий напиток) | Kofola (Slovak soft drink) | f
`,
  },
  {
    id: "x-3", icon: "🍴", sk: "Kuchyňa a stôl", ru: "Кухня и стол", en: "Kitchen & table",
    words: `
kuchyňa | кухня | kitchen | f
vidlička | вилка | fork | f
lyžica | ложка | spoon | f
lyžička | чайная ложка | teaspoon | f
tanier | тарелка | plate | m
šálka | чашка | cup | f
hrnček | кружка | mug | m
fľaša | бутылка | bottle | f
hrniec | кастрюля | pot | m
panvica | сковорода | frying pan | f
chladnička | холодильник | fridge | f
sporák | плита | cooker, stove | m
rúra | духовка | oven | f
mikrovlnka | микроволновка | microwave | f
umývať riad | мыть посуду | to wash the dishes
recept | рецепт | recipe; prescription | m
`,
  },
  {
    id: "x-4", icon: "🛋️", sk: "Doma", ru: "Дома", en: "At home",
    words: `
obývačka | гостиная | living room | f
spálňa | спальня | bedroom | f
kúpeľňa | ванная | bathroom | f
záchod | туалет | toilet | m
chodba | коридор | hallway | f
balkón | балкон | balcony | m
pivnica | подвал | cellar | f
strecha | крыша | roof | f
stena | стена | wall | f
podlaha | пол | floor | f
strop | потолок | ceiling | m
schody | лестница | stairs | pl
výťah | лифт | lift, elevator | m
skriňa | шкаф | wardrobe | f
polica | полка | shelf | f
gauč | диван | sofa | m
koberec | ковёр | carpet | m
záclona | занавеска | curtain | f
zrkadlo | зеркало | mirror | n
umývadlo | раковина | washbasin | n
vaňa | ванна | bathtub | f
sprcha | душ | shower | f
uterák | полотенце | towel | m
mydlo | мыло | soap | n
zubná kefka | зубная щётка | toothbrush | f
zubná pasta | зубная паста | toothpaste | f
hrebeň | расчёска | comb | m
vankúš | подушка | pillow | m
paplón | одеяло | duvet | m
budík | будильник | alarm clock | m
práčka | стиральная машина | washing machine | f
žehlička | утюг | iron | f
vysávač | пылесос | vacuum cleaner | m
zásuvka | розетка; ящик стола | socket; drawer | f
vypínač | выключатель | light switch | m
nábytok | мебель | furniture | m
obraz | картина | picture, painting | m
garáž | гараж | garage | f
`,
  },
  {
    id: "x-5", icon: "🫀", sk: "Telo", ru: "Тело", en: "Body",
    words: `
telo | тело | body | n
hlava | голова | head | f
vlasy | волосы | hair | pl
tvár | лицо | face | f
oko | глаз | eye | n
oči | глаза | eyes | pl
ucho | ухо | ear | n
nos | нос | nose | m
ústa | рот | mouth | pl
zub | зуб | tooth | m
jazyk | язык | tongue; language | m
krk | шея | neck | m
rameno | плечо | shoulder | n
ruka | рука | hand, arm | f
prst | палец | finger | m
noha | нога | leg, foot | f
koleno | колено | knee | n
chrbát | спина | back | m
brucho | живот | belly | n
srdce | сердце | heart | n
krv | кровь | blood | f
koža | кожа | skin | f
`,
  },
  {
    id: "x-6", icon: "💊", sk: "Zdravie", ru: "Здоровье", en: "Health",
    words: `
lekáreň | аптека | pharmacy | f
liek | лекарство | medicine | m
tabletka | таблетка | pill | f
horúčka | температура (жар) | fever | f
chrípka | грипп | flu | f
nádcha | насморк | cold, runny nose | f
kašeľ | кашель | cough | m
bolesť | боль | pain | f
Bolí ma hlava. | У меня болит голова. | I have a headache.
Je mi zle. | Мне плохо. | I feel sick.
zubár | зубной врач | dentist | m fem=zubárka
sanitka | скорая помощь (машина) | ambulance | f
pohotovosť | неотложка, приёмный покой | emergency room | f
zdravotná sestra | медсестра | nurse | f
poistenie | страховка | insurance | n
`,
  },
  {
    id: "x-7", icon: "🐾", sk: "Zvieratá", ru: "Животные", en: "Animals",
    words: `
zviera | животное | animal | n
šteňa | щенок | puppy | n
kôň | лошадь | horse | m
krava | корова | cow | f
prasa | свинья | pig | n
kohút | петух | rooster | m
kačica | утка | duck | f
hus | гусь | goose | f
vták | птица | bird | m
potkan | крыса | rat | m
zajac | заяц | hare | m
líška | лиса | fox | f
vlk | волк | wolf | m
medveď | медведь | bear | m
jeleň | олень | deer | m
veverička | белка | squirrel | f
ježko | ёжик | hedgehog | m
žaba | лягушка | frog | f
had | змея | snake | m
včela | пчела | bee | f
mucha | муха | fly | f
komár | комар | mosquito | m
motýľ | бабочка | butterfly | m
pavúk | паук | spider | m
slon | слон | elephant | m
lev | лев | lion | m
tiger | тигр | tiger | m
opica | обезьяна | monkey | f
žirafa | жираф | giraffe | f
papagáj | попугай | parrot | m
korytnačka | черепаха | turtle | f
`,
  },
  {
    id: "x-8", icon: "🌦️", sk: "Počasie a príroda", ru: "Погода и природа", en: "Weather & nature",
    words: `
slnko | солнце | sun | n
obloha | небо | sky | f
oblak | облако | cloud | m
dážď | дождь | rain | m
sneh | снег | snow | m
vietor | ветер | wind | m
búrka | гроза | storm | f
hmla | туман | fog | f
ľad | лёд | ice | m
blesk | молния | lightning | m
Prší. | Идёт дождь. | It's raining.
Sneží. | Идёт снег. | It's snowing.
Je slnečno. | Солнечно. | It's sunny.
Je zamračené. | Пасмурно. | It's cloudy.
Je horúco. | Жарко. | It's hot.
Je zima. | Холодно. | It's cold.
teplota | температура | temperature | f
stupeň | градус | degree | m
jar | весна | spring | f
jeseň | осень | autumn | f
strom | дерево | tree | m
tráva | трава | grass | f
list | лист; письмо | leaf; letter | m
kameň | камень | stone | m
kopec | холм | hill | m
potok | ручей | stream | m
vzduch | воздух | air | m
zem | земля | earth, ground | f
oheň | огонь | fire | m
`,
  },
  {
    id: "x-9", icon: "🗓️", sk: "Mesiace a sviatky", ru: "Месяцы и праздники", en: "Months & holidays",
    words: `
január | январь | January | m
február | февраль | February | m
marec | март | March | m
apríl | апрель | April | m
máj | май | May | m
jún | июнь | June | m
júl | июль | July | m
august | август | August | m
september | сентябрь | September | m
október | октябрь | October | m
november | ноябрь | November | m
december | декабрь | December | m
mesiac | месяц; луна | month; moon | m
rok | год | year | m
storočie | век, столетие | century | n
sekunda | секунда | second | f
chvíľa | минутка, момент | moment | f
dátum | дата | date | m
narodeniny | день рождения | birthday | pl
sviatok | праздник | holiday, feast | m
Vianoce | Рождество | Christmas | pl
Veľká noc | Пасха | Easter | f
Nový rok | Новый год | New Year | m
prázdniny | каникулы | school holidays | pl
polnoc | полночь | midnight | f
`,
  },
  {
    id: "x-10", icon: "👗", sk: "Oblečenie a doplnky", ru: "Одежда и аксессуары", en: "Clothes & accessories",
    words: `
nohavice | брюки | trousers | pl
džínsy | джинсы | jeans | pl
šaty | платье | dress | pl
bunda | куртка | jacket | f
ponožky | носки | socks | pl
čižmy | сапоги | boots | pl
tenisky | кроссовки | trainers, sneakers | pl
opasok | ремень | belt | m
kravata | галстук | tie | f
oblek | костюм | suit | m
pyžamo | пижама | pyjamas | n
klobúk | шляпа | hat | m
hodinky | наручные часы | watch | pl
prsteň | кольцо | ring | m
náramok | браслет | bracelet | m
peňaženka | кошелёк | wallet | f
kabelka | сумочка | handbag | f
ruksak | рюкзак | backpack | m
veľkosť | размер | size | f
obliecť sa | одеться | to get dressed
vyzliecť sa | раздеться | to get undressed
`,
  },
  {
    id: "x-11", icon: "🎓", sk: "Škola a štúdium", ru: "Учёба", en: "School & study",
    words: `
fakulta | факультет | faculty | f
internát | общежитие | student dormitory | m
učebnica | учебник | textbook | f
cvičenie | упражнение | exercise | n
úloha | задание | task | f
test | тест, контрольная | test | m
skúška | экзамен | exam | f
známka | оценка; марка | mark, grade; stamp | f
otázka | вопрос | question | f
odpoveď | ответ | answer | f
chyba | ошибка | mistake | f
slovo | слово | word | n
veta | предложение | sentence | f
lavica | парта | school desk | f
kurz | курс | course | m
lekcia | урок (в учебнике) | lesson | f
prednáška | лекция | lecture | f
seminár | семинар | seminar | m
rozvrh | расписание | timetable | m
spolužiak | одноклассник, однокурсник | classmate | m fem=spolužiačka
profesor | профессор | professor | m fem=profesorka
`,
  },
  {
    id: "x-12", icon: "💼", sk: "Práca", ru: "Работа", en: "Work",
    words: `
práca | работа | work, job | f
zamestnanec | сотрудник | employee | m fem=zamestnankyňa
plat | зарплата | salary | m
porada | совещание | meeting | f
pohovor | собеседование | interview | m
zmluva | договор | contract | f
úrad | ведомство, контора | office, authority | m
podpis | подпись | signature | m
žiadosť | заявление | application | f
dokument | документ | document | m
`,
  },
  {
    id: "x-13", icon: "💶", sk: "Nákupy a peniaze", ru: "Покупки и деньги", en: "Shopping & money",
    words: `
obchodný dom | универмаг | department store | m
nákupné centrum | торговый центр | shopping centre | n
pekáreň | пекарня | bakery | f
mäsiarstvo | мясная лавка | butcher's | n
drogéria | магазин бытовой химии | drugstore | f
kníhkupectvo | книжный магазин | bookshop | n
potraviny | продуктовый магазин | grocery store | pl
cena | цена | price | f
zľava | скидка | discount | f
výpredaj | распродажа | sale | m
účet | счёт | bill; account | m
hotovosť | наличные | cash | f
karta | карта | card | f
bankomat | банкомат | cashpoint, ATM | m
drobné | мелочь | small change | pl
minca | монета | coin | f
bankovka | купюра | banknote | f
Platím kartou. | Плачу картой. | I'll pay by card.
Môžem platiť kartou? | Можно заплатить картой? | Can I pay by card?
Je to drahé. | Это дорого. | It's expensive.
`,
  },
  {
    id: "x-14", icon: "🧳", sk: "Cestovanie", ru: "Путешествия", en: "Travel",
    words: `
cesta | дорога; поездка | road; trip | f
lístok | билет | ticket | m
spiatočný lístok | билет туда-обратно | return ticket | m
letenka | авиабилет | plane ticket | f
kufor | чемодан | suitcase | m
batožina | багаж | luggage | f
hranica | граница | border | f
odchod | отправление | departure | m
príchod | прибытие | arrival | m
nástupište | платформа | platform | n
nastúpiť | сесть (в транспорт) | to get on
vystúpiť | выйти (из транспорта) | to get off
prestúpiť | пересесть | to change (trains)
meškanie | опоздание, задержка | delay | n
turista | турист | tourist | m fem=turistka
sprievodca | гид; проводник | guide | m fem=sprievodkyňa
ubytovanie | жильё (в поездке) | accommodation | n
rezervácia | бронирование | reservation | f
recepcia | ресепшен | reception | f
loď | корабль | ship | f
prístav | порт | port | m
diaľnica | автомагистраль | motorway | f
MHD | городской транспорт | public transport | f
Kde je toaleta? | Где туалет? | Where is the toilet?
Pomoc! | Помогите! | Help!
Zablúdil som. | Я заблудился. | I'm lost.
`,
  },
  {
    id: "x-15", icon: "🏛️", sk: "V meste", ru: "В городе (2)", en: "In town (2)",
    words: `
chodník | тротуар | pavement | m
budova | здание | building | f
veža | башня | tower | f
zámok | дворец, замок; замок (дверной) | chateau; lock | m
radnica | ратуша | town hall | f
polícia | полиция | police | f
hasiči | пожарные | firefighters | pl
čerpacia stanica | заправка | petrol station | f
cintorín | кладбище | cemetery | m
továreň | завод, фабрика | factory | f
`,
  },
  {
    id: "x-16", icon: "💬", sk: "Užitočné frázy", ru: "Полезные фразы", en: "Useful phrases",
    words: `
Ako sa povie... po slovensky? | Как сказать... по-словацки? | How do you say... in Slovak?
Čo to znamená? | Что это значит? | What does it mean?
Nerozumiem. | Я не понимаю. | I don't understand.
Môžete to zopakovať? | Можете повторить? | Could you repeat that?
Hovorte pomalšie, prosím. | Говорите медленнее, пожалуйста. | Please speak more slowly.
Neviem. | Я не знаю. | I don't know.
Myslím, že áno. | Думаю, да. | I think so.
Súhlasím. | Согласен. | I agree.
To je pravda. | Это правда. | That's true.
Mám otázku. | У меня вопрос. | I have a question.
Chcel by som... | Я бы хотел... | I would like... (man)
Chcela by som... | Я бы хотела... | I would like... (woman)
Mám hlad. | Я хочу есть. | I'm hungry.
Mám smäd. | Я хочу пить. | I'm thirsty.
Je mi ľúto. | Мне жаль. | I'm sorry.
Nevadí. | Ничего, не страшно. | Never mind.
Žiadny problém. | Без проблем. | No problem.
Možno. | Может быть. | Maybe.
Určite. | Обязательно, точно. | Definitely.
Naozaj? | Правда? | Really?
Pozor! | Осторожно! | Watch out!
Počkaj! | Подожди! | Wait!
Poď sem! | Иди сюда! | Come here!
Ešte raz. | Ещё раз. | Once more.
Všetko najlepšie! | Всего наилучшего! (поздравление) | All the best!
Veľa šťastia! | Удачи! | Good luck!
Pekný deň! | Хорошего дня! | Have a nice day!
Vitajte! | Добро пожаловать! | Welcome!
Ďakujem pekne. | Большое спасибо. | Thank you very much.
Niet za čo. | Не за что. | You're welcome.
Koľko máš rokov? | Сколько тебе лет? | How old are you?
Kde bývaš? | Где ты живёшь? | Where do you live?
`,
  },
  {
    id: "x-17", icon: "🌈", sk: "Aký je? (viac)", ru: "Прилагательные (ещё)", en: "More adjectives",
    words: `
krásny | прекрасный | beautiful
milý | милый | kind, sweet
dôležitý | важный | important
jednoduchý | простой | simple | opp=zložitý
zložitý | сложный | complicated | opp=jednoduchý
správny | правильный | correct | opp=nesprávny
nesprávny | неправильный | wrong, incorrect | opp=správny
rovnaký | одинаковый | the same | opp=iný
iný | другой | different, other | opp=rovnaký
posledný | последний | last
ďalší | следующий | next, another
hlavný | главный | main
celý | целый, весь | whole
voľný | свободный | free, vacant | opp=obsadený
obsadený | занятый | occupied | opp=voľný
otvorený | открытый | open | opp=zatvorený
zatvorený | закрытый | closed | opp=otvorený
hlučný | шумный | noisy | opp=tichý
tichý | тихий | quiet | opp=hlučný
horúci | горячий | hot
chladný | прохладный | cool, chilly
mokrý | мокрый | wet | opp=suchý
suchý | сухой | dry | opp=mokrý
mäkký | мягкий | soft | opp=tvrdý
tvrdý | твёрдый | hard | opp=mäkký
ostrý | острый | sharp
okrúhly | круглый | round
hlboký | глубокий | deep
čerstvý | свежий | fresh
chutný | вкусный | tasty
slaný | солёный | salty
kyslý | кислый | sour
horký | горький | bitter
pálivý | острый (о еде) | spicy
bezpečný | безопасный | safe | opp=nebezpečný
nebezpečný | опасный | dangerous | opp=bezpečný
slávny | знаменитый | famous
známy | известный; знакомый | well-known; familiar
cudzí | чужой, иностранный | foreign
domáci | домашний | home, homemade
silný | сильный | strong | opp=slabý
slabý | слабый | weak | opp=silný
hotový | готовый | ready, done
spokojný | довольный | satisfied
nahnevaný | рассерженный | angry
prekvapený | удивлённый | surprised
zamilovaný | влюблённый | in love
ospalý | сонный | sleepy
`,
  },
  {
    id: "x-18", icon: "⏩", sk: "Ako? Kedy? Kde?", ru: "Наречия", en: "Adverbs",
    words: `
rýchlo | быстро | quickly
pomaly | медленно | slowly
veľmi | очень | very
trochu | немного | a little
veľa | много | a lot
málo | мало | little, few
viac | больше | more
menej | меньше | less
znova | снова | again
tiež | тоже | also, too
ešte | ещё | still, yet
už | уже | already
hneď | сразу | immediately
dlho | долго | for a long time
všade | везде | everywhere
nikde | нигде | nowhere
niekde | где-то | somewhere
vonku | снаружи, на улице | outside
vnútri | внутри | inside
správne | правильно | correctly
nahlas | громко, вслух | aloud
potichu | тихо | quietly
asi | наверное, примерно | probably; about
preto | поэтому | therefore
`,
  },
  {
    id: "x-19", icon: "🔗", sk: "Malé slová", ru: "Маленькие слова", en: "Little words",
    words: `
ako | как | how
aký | какой | what kind
ktorý | который | which
koľko | сколько | how much, how many
čí | чей | whose
a | и | and
ale | но | but
alebo | или | or
lebo | потому что | because
že | что (союз) | that
keď | когда (союз) | when
ak | если | if
ani | ни, даже не | not even, nor
aj | и, тоже | also, and
s | с | with
bez | без | without
pre | для | for
do | в, до (куда) | to, into
z | из | from, out of
od | от | from (someone)
k | к | towards
o | о; в (о времени) | about; at
pri | около, при | near, by
za | за; через | behind; in (time)
pred | перед; назад | in front of; ago
medzi | между | between
okolo | вокруг | around
vedľa | рядом | next to
oproti | напротив | opposite
`,
  },
  {
    id: "x-20", icon: "👥", sk: "Ľudia okolo nás", ru: "Люди вокруг", en: "People around us",
    words: `
sused | сосед | neighbour | m fem=susedka
bábätko | младенец | baby | n
dvojčatá | близнецы | twins | pl
synovec | племянник | nephew | m
neter | племянница | niece | f
vnúčatá | внуки | grandchildren | pl
svadba | свадьба | wedding | f
láska | любовь | love | f
vzťah | отношения | relationship | m
hosť | гость | guest | m
cudzinec | иностранец | foreigner | m fem=cudzinka
občan | гражданин | citizen | m fem=občianka
`,
  },
  {
    id: "x-21", icon: "🥇", sk: "Poradie a počty", ru: "Порядок и счёт", en: "Order & maths",
    words: `
prvý | первый | first
druhý | второй | second
tretí | третий | third
štvrtý | четвёртый | fourth
piaty | пятый | fifth
šiesty | шестой | sixth
siedmy | седьмой | seventh
ôsmy | восьмой | eighth
deviaty | девятый | ninth
desiaty | десятый | tenth
polovica | половина | half | f
štvrtina | четверть | quarter | f
milión | миллион | million | m
číslo | число, номер | number | n
plus | плюс | plus
mínus | минус | minus
krát | умножить на, раз | times
Dva plus dva je štyri. | Два плюс два — четыре. | Two plus two is four.
`,
  },
  {
    id: "x-22", icon: "📱", sk: "Technika", ru: "Техника", en: "Technology",
    words: `
telefón | телефон | telephone | m
nabíjačka | зарядка | charger | f
batéria | батарея | battery | f
aplikácia | приложение | app | f
heslo | пароль | password | n
správa | сообщение; новость | message; news | f
esemeska | СМС | text message | f
fotka | фотка | photo | f
video | видео | video | n
sieť | сеть | network | f
notebook | ноутбук | laptop | m
obrazovka | экран | screen | f
tlačidlo | кнопка | button | n
stiahnuť | скачать | to download
`,
  },
  {
    id: "x-23", icon: "🎸", sk: "Šport a záľuby", ru: "Спорт и хобби", en: "Sport & hobbies",
    words: `
hra | игра | game | f
zápas | матч | match | m
tím | команда | team | m
gól | гол | goal | m
víťaz | победитель | winner | m
prehrať | проиграть | to lose (a game)
beh | бег | running | m
plávanie | плавание | swimming | n
lyžovanie | катание на лыжах | skiing | n
hokej | хоккей | ice hockey | m
basketbal | баскетбол | basketball | m
korčule | коньки | skates | pl
tanec | танец | dance | m
gitara | гитара | guitar | f
klavír | пианино | piano | m
husle | скрипка | violin | pl
pieseň | песня | song | f
čítanie | чтение | reading | n
rybačka | рыбалка | fishing | f
`,
  },
];
