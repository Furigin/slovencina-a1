// =====================================================================
//  СЛОВАРЬ УЧЕБНИКА «TRI, DVA, JEDEN – SLOVENČINA» A2 (уроки 1–6)
//  Формат — как в data.js:  словацкий | русский | английский | метки
//  В приложении уроки A2 имеют id 7–12 (n — номер урока в учебнике A2).
//  Слова, которые уже есть в A1, сюда не пишем — они уже выучены.
// =====================================================================

export const LESSONS_A2 = [
  {
    id: 7, n: 1, level: "A2",
    sk: "Ako bývame", ru: "Как мы живём", en: "How we live",
    units: [
      {
        id: "7-1", icon: "🏡", sk: "Dom a byt", ru: "Дом и квартира", en: "House & flat",
        words: `
kuchyňa | кухня | kitchen | f
obývačka | гостиная | living room | f
spálňa | спальня | bedroom | f
kúpeľňa | ванная | bathroom | f
pracovňa | кабинет | study | f
chodba | коридор | hallway | f
pivnica | подвал | cellar | f
podkrovie | мансарда | attic | n
schodisko | лестница | staircase | n
balkón | балкон | balcony | m
terasa | терраса | terrace | f
garáž | гараж | garage | f
strecha | крыша | roof | f
dvor | двор | yard | m
plot | забор | fence | m
brána | ворота | gate | f
trávnik | газон | lawn | m
podlaha | пол | floor | f
stena | стена | wall | f
nábytok | мебель | furniture | m
šatník | шкаф для одежды | wardrobe | m
zariadený | обставленный (мебелью) | furnished
`,
      },
      {
        id: "7-2", icon: "🔌", sk: "Spotrebiče", ru: "Бытовая техника", en: "Appliances",
        words: `
spotrebič | бытовой прибор | appliance | m
chladnička | холодильник | fridge | f
mraznička | морозилка | freezer | f
sporák | плита | cooker | m
mikrovlnná rúra | микроволновка | microwave | f
umývačka riadu | посудомоечная машина | dishwasher | f
práčka | стиральная машина | washing machine | f
sušič na vlasy | фен | hair dryer | m
žehlička | утюг | iron | f
vysávač | пылесос | vacuum cleaner | m
hriankovač | тостер | toaster | m
kávovar | кофеварка | coffee machine | m
mixér | блендер | blender | m
kanvica | чайник | kettle | f
rádiobudík | радиобудильник | radio alarm clock | m
radiátor | батарея (отопления) | radiator | m
žiarovka | лампочка | light bulb | f
fungovať | работать (о приборе) | to work, to function
vypnúť | выключить | to switch off
zapnúť | включить | to switch on
`,
      },
      {
        id: "7-3", icon: "🍳", sk: "Kuchynské potreby", ru: "Кухонная посуда", en: "Kitchenware",
        words: `
hrnček | кружка | mug | m
šálka | чашка | cup | f
hrniec | кастрюля | pot | m
panvica | сковорода | frying pan | f
tanier | тарелка | plate | m
príbor | столовый прибор | cutlery | m
lyžica | ложка | spoon | f
vidlička | вилка | fork | f
nôž | нож | knife | m
vareška | деревянная ложка (мешалка) | wooden spoon | f
naberačka | половник | ladle | f
misa | миска, блюдо | bowl | f
`,
      },
      {
        id: "7-4", icon: "🪵", sk: "Materiály", ru: "Материалы", en: "Materials",
        words: `
drevo | дерево (материал) | wood | n
drevený | деревянный | wooden
sklo | стекло | glass | n
kov | металл | metal | m
oceľový | стальной | steel
plast | пластик | plastic | m
koža | кожа | leather; skin | f
kožený | кожаный | leather
bavlna | хлопок | cotton | f
vlna | шерсть; волна | wool; wave | f
keramický | керамический | ceramic
okrúhly | круглый | round
hranatý | угловатый, квадратный | angular, square
hlboký | глубокий | deep | opp=plytký
plytký | мелкий (неглубокий) | shallow | opp=hlboký
praktický | практичный | practical
`,
      },
      {
        id: "7-5", icon: "🏆", sk: "Lepší, najlepší", ru: "Лучше, лучший", en: "Better, best",
        words: `
lepší | лучше (прил.: lepší dom) | better (adjective)
najlepší | самый лучший | the best
horší | хуже | worse
najhorší | самый плохой | the worst
väčší | больше (размером), крупнее | bigger
menší | меньше (размером) | smaller
krajší | красивее | prettier
starší | старше | older
mladší | младше | younger
vyšší | выше | taller, higher
drahší | дороже | more expensive
lacnejší | дешевле | cheaper
zaujímavejší | интереснее | more interesting
lepšie | лучше (наречие) | better (adverb)
viac | больше (количество) | more
menej | меньше (количество) | less
`,
      },
    ],
    sentences: `
Náš byt je väčší ako váš. | Наша квартира больше, чем ваша. | Our flat is bigger than yours.
V kuchyni máme novú chladničku. | На кухне у нас новый холодильник. | We have a new fridge in the kitchen.
Bratislava je najväčšie mesto na Slovensku. | Братислава — самый большой город Словакии. | Bratislava is the biggest town in Slovakia.
Tento stôl je drevený. | Этот стол деревянный. | This table is wooden.
Práčka nefunguje. | Стиральная машина не работает. | The washing machine doesn't work.
Bývam v podkroví. | Я живу в мансарде. | I live in the attic.
Môj brat je starší ako ja. | Мой брат старше меня. | My brother is older than me.
Vypni, prosím, televízor. | Выключи, пожалуйста, телевизор. | Switch off the TV, please.
Na dvore máme pekný trávnik. | Во дворе у нас красивый газон. | We have a nice lawn in the yard.
Ktorý dom je najkrajší? | Какой дом самый красивый? | Which house is the prettiest?
`,
  },

  {
    id: 8, n: 2, level: "A2",
    sk: "Ako sa cítite?", ru: "Как вы себя чувствуете?", en: "How do you feel?",
    units: [
      {
        id: "8-1", icon: "🧍", sk: "Ľudské telo", ru: "Тело человека", en: "Human body",
        words: `
telo | тело | body | n
hlava | голова | head | f
čelo | лоб | forehead | n
obočie | брови | eyebrows | n
oko | глаз | eye | n
oči | глаза | eyes | pl
ucho | ухо | ear | n
uši | уши | ears | pl
nos | нос | nose | m
líce | щека | cheek | n
ústa | рот | mouth | pl
pery | губы | lips | pl
zub | зуб | tooth | m
brada | подбородок; борода | chin; beard | f
fúzy | усы | moustache | pl
krk | шея | neck | m
plece | плечо | shoulder | n
ruka | рука | hand, arm | f
lakeť | локоть | elbow | m
prst | палец | finger | m
hruď | грудь | chest | f
brucho | живот | belly | n
chrbát | спина | back | m
noha | нога | leg | f
koleno | колено | knee | n
chodidlo | ступня | foot | n
vlasy | волосы | hair | pl
`,
      },
      {
        id: "8-2", icon: "🩺", sk: "U lekára", ru: "У врача", en: "At the doctor's",
        words: `
choroba | болезнь | illness | f
chrípka | грипп | flu | f
nádcha | насморк | cold, runny nose | f
horúčka | высокая температура, жар | fever | f
kašľať | кашлять | to cough
kýchať | чихать | to sneeze
bolieť | болеть | to hurt, to ache
Bolí ma hlava. | У меня болит голова. | I have a headache.
Bolí ma hrdlo. | У меня болит горло. | I have a sore throat.
Čo vás bolí? | Что у вас болит? | What hurts?
liek | лекарство | medicine | m
užívať lieky | принимать лекарства | to take medicine
predpísať | выписать (лекарство) | to prescribe
vyšetrenie | обследование, осмотр | examination | n
vyšetrovať | обследовать | to examine
pacient | пациент | patient | m fem=pacientka
symptóm | симптом | symptom | m
alergický | аллергический | allergic
tlak | давление | pressure | m
odpadnúť | упасть в обморок | to faint
upchatý nos | заложенный нос | blocked nose | m
lekáreň | аптека | pharmacy | f
zdravý životný štýl | здоровый образ жизни | healthy lifestyle | m
rada | совет | advice | f
poradiť | посоветовать | to advise
`,
      },
      {
        id: "8-3", icon: "⛷️", sk: "Šport a pohyb", ru: "Спорт и движение", en: "Sport & exercise",
        words: `
pohyb | движение | movement, exercise | m
kondícia | физическая форма | fitness | f
lyže | лыжи | skis | pl
lyžiar | лыжник | skier | m fem=lyžiarka
zjazdové lyžovanie | горные лыжи | downhill skiing | n
beh na bežkách | беговые лыжи | cross-country skiing | m
korčule | коньки | skates | pl
sánky | санки | sledge | pl
plaváreň | бассейн (здание) | swimming pool | f
permanentka | абонемент | season ticket | f
zápas | матч | match | m
súťaž | соревнование, конкурс | competition | f
výstup | восхождение | climb | m
vrch | гора, вершина | hill, mountain | m
štít | пик (горы) | peak | m
`,
      },
      {
        id: "8-4", icon: "💬", sk: "Frázy", ru: "Фразы", en: "Phrases",
        words: `
Nevadí. | Ничего страшного. | It doesn't matter.
Vyhovuje ti to? | Тебе это подходит? | Does that suit you?
Mrzí ma to. | Мне жаль. | I'm sorry.
Jasné. | Конечно, понятно. | Sure.
Vôbec nie. | Совсем нет. | Not at all.
hneď | сразу | at once
dávno | давно | long ago
vážne | серьёзно | seriously
onedlho | вскоре | soon
stať sa | случиться; стать | to happen; to become
`,
      },
    ],
    sentences: `
Bolí ma hlava a mám horúčku. | У меня болит голова и жар. | I have a headache and a fever.
Včera som bol u lekára. | Вчера я был у врача. | Yesterday I was at the doctor's.
Lekár mi predpísal liek. | Врач выписал мне лекарство. | The doctor prescribed me medicine.
Ležím v posteli, lebo som chorý. | Я лежу в постели, потому что болею. | I'm lying in bed because I'm ill.
Užívajte liek trikrát denne. | Принимайте лекарство три раза в день. | Take the medicine three times a day.
V zime sme boli na horách. | Зимой мы были в горах. | In winter we were in the mountains.
Rád chodím do plavárne. | Я люблю ходить в бассейн. | I like going to the swimming pool.
Hovorili sme o zdravom životnom štýle. | Мы говорили о здоровом образе жизни. | We talked about a healthy lifestyle.
Pracujem v nemocnici. | Я работаю в больнице. | I work in a hospital.
Nevadí, stretneme sa zajtra. | Ничего страшного, встретимся завтра. | Never mind, we'll meet tomorrow.
`,
  },

  {
    id: 9, n: 3, level: "A2",
    sk: "Čím cestujeme", ru: "На чём мы ездим", en: "How we travel",
    units: [
      {
        id: "9-1", icon: "🚆", sk: "Dopravné prostriedky", ru: "Транспорт", en: "Means of transport",
        words: `
dopravný prostriedok | транспортное средство | means of transport | m
doprava | транспорт; движение | transport; traffic | f
rýchlik | скорый поезд | express train | m
trolejbus | троллейбус | trolleybus | m
metro | метро | underground | n
vrtuľník | вертолёт | helicopter | m
kamión | грузовик | lorry, truck | m
motocykel | мотоцикл | motorbike | m
kolobežka | самокат | scooter | f
jachta | яхта | yacht | f
ponorka | подводная лодка | submarine | f
raketa | ракета | rocket | f
traktor | трактор | tractor | m
vodič | водитель | driver | m fem=vodička
pasažier | пассажир | passenger | m
revízor | контролёр | ticket inspector | m
dopravná zápcha | пробка | traffic jam | f
cyklotrasa | велодорожка | cycle path | f
`,
      },
      {
        id: "9-2", icon: "🎫", sk: "Na stanici a na letisku", ru: "На вокзале и в аэропорту", en: "At the station & airport",
        words: `
cestovný lístok | проездной билет | ticket | m
miestenka | бронь места (в поезде) | seat reservation | f
jednosmerný lístok | билет в одну сторону | one-way ticket | m
zľavnený lístok | льготный билет | reduced ticket | m
električenka | проездной (на транспорт) | travel pass | f
cestovný poriadok | расписание | timetable | m
úschovňa batožiny | камера хранения | left luggage | f
prestupovať | пересаживаться | to change (transport)
pristávať | приземляться | to land
obsadiť miesto | занять место | to take a seat
uvoľniť miesto | уступить место | to give up a seat
preplnený | переполненный | overcrowded
občiansky preukaz | удостоверение личности | ID card | m
váha | весы; вес | scales; weight | f
priamo | прямо, напрямую | directly
naspäť | назад, обратно | back
`,
      },
      {
        id: "9-3", icon: "⛅", sk: "Počasie", ru: "Погода", en: "Weather",
        words: `
predpoveď počasia | прогноз погоды | weather forecast | f
jasno | ясно | clear
polojasno | переменная облачность | partly cloudy
oblačno | облачно | cloudy
veterno | ветрено | windy
mráz | мороз | frost | m
mrznúť | замерзать | to freeze
snežiť | идти (о снеге) | to snow
fúkať | дуть | to blow
svietiť | светить | to shine
dúha | радуга | rainbow | f
víchrica | буря, ураган | windstorm | f
mrak | туча | cloud | m
nebo | небо | sky | n
mierny | умеренный | mild
`,
      },
      {
        id: "9-4", icon: "❔", sk: "Niekto, nikto", ru: "Кто-то, никто", en: "Somebody, nobody",
        words: `
niekto | кто-то | somebody
nikto | никто | nobody
niečo | что-то | something
nič | ничего | nothing
niekde | где-то | somewhere
nikde | нигде | nowhere
niekam | куда-то | (to) somewhere
nikam | никуда | (to) nowhere
nejaký | какой-то | some
žiadny | никакой | no, none
keď | когда (союз) | when
ak | если | if
`,
      },
    ],
    sentences: `
Do práce chodím električkou. | На работу я езжу на трамвае. | I go to work by tram.
Zajtra pôjdeme vlakom do Košíc. | Завтра поедем в Кошице на поезде. | Tomorrow we'll go to Košice by train.
Cestujem s kamarátom. | Я путешествую с другом. | I travel with a friend.
Nikto tu nie je. | Здесь никого нет. | There's nobody here.
Nič nevidím. | Я ничего не вижу. | I can't see anything.
Ak bude pršať, zostanem doma. | Если будет дождь, я останусь дома. | If it rains, I'll stay at home.
Keď prídem domov, zavolám ti. | Когда приду домой, позвоню тебе. | When I get home, I'll call you.
Zajtra bude oblačno a veterno. | Завтра будет облачно и ветрено. | Tomorrow will be cloudy and windy.
Vlak mešká desať minút. | Поезд опаздывает на десять минут. | The train is ten minutes late.
Prosím si jeden spiatočný lístok do Žiliny. | Мне, пожалуйста, один билет туда-обратно до Жилины. | One return ticket to Žilina, please.
`,
  },

  {
    id: 10, n: 4, level: "A2",
    sk: "Čo si prosíte?", ru: "Что желаете?", en: "What would you like?",
    units: [
      {
        id: "10-1", icon: "🍽️", sk: "V reštaurácii", ru: "В ресторане", en: "At the restaurant",
        words: `
jedálny lístok | меню | menu | m
hlavné jedlo | основное блюдо | main course | n
predjedlo | закуска | starter | n
porcia | порция | portion | f
obedové menu | бизнес-ланч | lunch menu | n
špecialita | фирменное блюдо | speciality | f
účet | счёт | bill | m
prepitné | чаевые | tip | n
Dám si... | Я возьму... | I'll have...
Chutí vám? | Вам нравится (на вкус)? | Do you like it?
Mňam! | Ням! Вкусно! | Yum!
chutiť | нравиться на вкус | to taste good
najesť sa | наесться | to eat one's fill
napiť sa | напиться, попить | to have a drink
pikantný | острый, пикантный | spicy
mastný | жирный | greasy, fatty
`,
      },
      {
        id: "10-2", icon: "🥫", sk: "Koľko? Balenie", ru: "Сколько? Упаковка", en: "How much? Packaging",
        words: `
kus | штука, кусок | piece | m
kúsok | кусочек | small piece | m
krajec | ломоть (хлеба) | slice (of bread) | m
plátok | ломтик | slice | m
téglik | стаканчик (йогурта) | pot | m
vrecko | пакетик | bag, sachet | n
škatuľa | коробка | box | f
plechovka | банка (жестяная) | can | f
konzerva | консервная банка | tin | f
tabuľka | плитка (шоколада) | bar | f
balenie | упаковка | pack | n
kilo | килограмм | kilo | n
liter | литр | litre | m
pečivo | выпечка (хлеб, булки) | bread and rolls | n
žemľa | булочка | roll | f
losos | лосось | salmon | m
tuniak | тунец | tuna | m
brokolica | брокколи | broccoli | f
petržlen | петрушка | parsley | m
`,
      },
      {
        id: "10-3", icon: "✂️", sk: "Služby", ru: "Услуги", en: "Services",
        words: `
služba | услуга | service | f
kaderníctvo | парикмахерская | hairdresser's | n
kaderník | парикмахер | hairdresser | m fem=kaderníčka
ostrihať | подстричь | to cut (hair)
čistiareň | химчистка | dry cleaner's | f
autoservis | автосервис | car service | m
požičovňa | прокат | rental shop | f
balík | посылка | parcel | m
zásielka | отправление, посылка | consignment | f
poštovné | стоимость пересылки | postage | n
doručiť | доставить | to deliver
kuriér | курьер | courier | m
záruka | гарантия | warranty | f
vymeniť | поменять | to exchange
reklamácia | жалоба, возврат товара | complaint | f
akcia | акция (скидка) | special offer | f
značka | марка, бренд | brand | f
kvalita | качество | quality | f
`,
      },
      {
        id: "10-4", icon: "🏦", sk: "V banke", ru: "В банке", en: "At the bank",
        words: `
bankový účet | банковский счёт | bank account | m
platobná karta | платёжная карта | payment card | f
vklad | вклад | deposit | m
výber | снятие (денег); выбор | withdrawal; choice | m
vybrať peniaze | снять деньги | to withdraw money
pôžička | кредит, заём | loan | f
poplatok | сбор, комиссия | fee | m
suma | сумма | sum | f
platba | платёж | payment | f
bankový prevod | банковский перевод | bank transfer | m
paušál | тариф (мобильный) | flat rate | m
dobiť kredit | пополнить счёт (телефона) | to top up
zdarma | бесплатно | free of charge
`,
      },
    ],
    sentences: `
Prosím si pohár vody. | Мне, пожалуйста, стакан воды. | A glass of water, please.
Kúpil som kilo jabĺk a fľašu mlieka. | Я купил килограмм яблок и бутылку молока. | I bought a kilo of apples and a bottle of milk.
Pijem kávu bez cukru. | Я пью кофе без сахара. | I drink coffee without sugar.
Idem do obchodu. | Я иду в магазин. | I'm going to the shop.
Som z Bratislavy. | Я из Братиславы. | I'm from Bratislava.
Pán čašník, zaplatím, prosím. | Официант, рассчитайте меня, пожалуйста. | Waiter, the bill, please.
Dám si polievku a hlavné jedlo. | Я возьму суп и основное блюдо. | I'll have soup and a main course.
Chutí vám to? | Вам нравится? | Do you like it?
Musím vybrať peniaze z bankomatu. | Мне надо снять деньги в банкомате. | I have to withdraw money from the cashpoint.
Bez platobnej karty nemôžem platiť. | Без карты я не могу заплатить. | I can't pay without a card.
`,
  },

  {
    id: 11, n: 5, level: "A2",
    sk: "Sme ľudia", ru: "Мы — люди", en: "We are people",
    units: [
      {
        id: "11-1", icon: "🧑‍🦱", sk: "Výzor", ru: "Внешность", en: "Appearance",
        words: `
výzor | внешность | appearance | m
postava | фигура | figure | f
vyzerať | выглядеть | to look (like)
Ako vyzerá? | Как он/она выглядит? | What does he/she look like?
plnoštíhly | полноватый | plump
blond | светлый (о волосах) | blond
ryšavý | рыжий | red-haired
šedivý | седой | grey-haired
kučeravý | кудрявый | curly
vlnitý | волнистый | wavy
rovný | прямой | straight
hustý | густой | thick
riedky | редкий | thin, sparse
tvár | лицо | face | f
`,
      },
      {
        id: "11-2", icon: "🧠", sk: "Povaha", ru: "Характер", en: "Character",
        words: `
vlastnosť | черта характера | quality, trait | f
povaha | характер | character | f
milý | милый | kind | opp=nepríjemný
odvážny | смелый | brave
hanblivý | стеснительный | shy
trpezlivý | терпеливый | patient | opp=netrpezlivý
netrpezlivý | нетерпеливый | impatient | opp=trpezlivý
tolerantný | терпимый | tolerant
štedrý | щедрый | generous | opp=lakomý
lakomý | жадный | stingy | opp=štedrý
žiarlivý | ревнивый | jealous
náladový | капризный, переменчивый | moody
pokojný | спокойный | calm
úprimný | искренний | sincere
spravodlivý | справедливый | fair
slušný | вежливый, приличный | polite | opp=neslušný
neslušný | невежливый | rude | opp=slušný
vtipný | остроумный, смешной | funny
starostlivý | заботливый | caring
verný | верный | faithful
optimistický | оптимистичный | optimistic | opp=pesimistický
pesimistický | пессимистичный | pessimistic | opp=optimistický
cieľavedomý | целеустремлённый | purposeful
dobrosrdečný | добросердечный | kind-hearted
`,
      },
      {
        id: "11-3", icon: "👚", sk: "Oblečenie a doplnky", ru: "Одежда и аксессуары", en: "Clothes & accessories",
        words: `
blúzka | блузка | blouse | f
sako | пиджак | jacket | n
mikina | толстовка | hoodie | f
pulóver | пуловер | pullover | m
rolák | водолазка | polo neck | m
vesta | жилет | waistcoat | f
vetrovka | ветровка | windcheater | f
plášť | плащ | overcoat | m
súprava | костюм, комплект | set, suit | f
župan | халат | bathrobe | m
papuče | тапочки | slippers | pl
sandále | сандалии | sandals | pl
šľapky | шлёпанцы | flip-flops | pl
obuv | обувь | footwear | f
šiltovka | бейсболка | baseball cap | f
šatka | платок | headscarf | f
motýlik | галстук-бабочка | bow tie | m
náušnica | серьга | earring | f
obrúčka | обручальное кольцо | wedding ring | f
slnečné okuliare | солнцезащитные очки | sunglasses | pl
obliecť si | надеть (одежду) | to put on (clothes)
vyzliecť si | снять (одежду) | to take off (clothes)
obuť si | обуться | to put on (shoes)
vyzuť si | разуться | to take off (shoes)
nosiť | носить | to wear
`,
      },
      {
        id: "11-4", icon: "❤️", sk: "Vzťahy", ru: "Отношения", en: "Relationships",
        words: `
kamarátstvo | дружба | friendship | n
kamoš | друг (разг.) | mate | m fem=kamoška
zaľúbený | влюблённый | in love
žiarliť | ревновать | to be jealous
závidieť | завидовать | to envy
dôverovať | доверять | to trust
klamať | врать | to lie
odpustiť | простить | to forgive
ospravedlniť sa | извиниться | to apologise
patriť | принадлежать | to belong
páčiť sa | нравиться | to like
Čo sa deje? | Что происходит? | What's going on?
Ostane to medzi nami. | Пусть это останется между нами. | Let's keep it between us.
Napadlo mi... | Мне пришло в голову... | It occurred to me...
`,
      },
      {
        id: "11-5", icon: "📅", sk: "Dátum a poradie", ru: "Дата и порядок", en: "Dates & ordinals",
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
jedenásty | одиннадцатый | eleventh
dvadsiaty | двадцатый | twentieth
Koľkého je dnes? | Какое сегодня число? | What's the date today?
Dnes je prvého mája. | Сегодня первое мая. | Today is the first of May.
narodiť sa | родиться | to be born
`,
      },
    ],
    sentences: `
Ako vyzerá tvoj brat? | Как выглядит твой брат? | What does your brother look like?
Má krátke kučeravé vlasy. | У него короткие кудрявые волосы. | He has short curly hair.
Dám mame darček. | Я подарю маме подарок. | I'll give Mum a present.
Idem k lekárovi. | Я иду к врачу. | I'm going to the doctor.
To je otcov dom a mamina záhrada. | Это папин дом и мамин сад. | This is Dad's house and Mum's garden.
Narodil som sa desiateho mája. | Я родился десятого мая. | I was born on the tenth of May.
Dnes je prvého septembra. | Сегодня первое сентября. | Today is the first of September.
Je veľmi trpezlivá a štedrá. | Она очень терпеливая и щедрая. | She's very patient and generous.
Oblečiem si sako a kravatu. | Я надену пиджак и галстук. | I'll put on a jacket and a tie.
Páči sa mi tvoja nová blúzka. | Мне нравится твоя новая блузка. | I like your new blouse.
`,
  },

  {
    id: 12, n: 6, level: "A2",
    sk: "Slovensko", ru: "Словакия", en: "Slovakia",
    units: [
      {
        id: "12-1", icon: "🇸🇰", sk: "Krajina", ru: "Страна", en: "The country",
        words: `
štát | государство | state | m
kraj | край, область | region | m
okres | район | district | m
obyvateľ | житель | inhabitant | m fem=obyvateľka
rozloha | площадь (территории) | area | f
susedný | соседний | neighbouring
hymna | гимн | anthem | f
zástava | флаг | flag | f
znak | герб; знак | coat of arms; sign | m
vláda | правительство | government | f
premiér | премьер-министр | prime minister | m
minister | министр | minister | m
parlament | парламент | parliament | m
mena | валюта | currency | f
pleso | горное озеро | mountain lake | n
prameň | источник | spring | m
pamiatka | памятник, достопримечательность | monument | f
`,
      },
      {
        id: "12-2", icon: "🎄", sk: "Sviatky a tradície", ru: "Праздники и традиции", en: "Holidays & traditions",
        words: `
sviatok | праздник | holiday | m
tradícia | традиция | tradition | f
Vianoce | Рождество | Christmas | pl
Štedrý večer | Сочельник | Christmas Eve | m
Veľká noc | Пасха | Easter | f
Mikuláš | Святой Николай (6 декабря) | St Nicholas | m
Dušičky | День поминовения (2 ноября) | All Souls' Day | pl
koleda | колядка | carol | f
oblievať | обливать (на Пасху) | to splash (with water)
šibať | стегать (пасхальная традиция) | to whip (Easter tradition)
oslavovať | праздновать | to celebrate
blahoželať | поздравлять | to congratulate
Veselé Vianoce! | Счастливого Рождества! | Merry Christmas!
Šťastný nový rok! | С Новым годом! | Happy New Year!
`,
      },
      {
        id: "12-3", icon: "🧭", sk: "Kde? Kam? Kadiaľ?", ru: "Где? Куда? Каким путём?", en: "Where? Where to? Which way?",
        words: `
kadiaľ | каким путём, где (проходить) | which way
odkiaľ | откуда | where from
nad | над | above
pod | под | under
pred | перед | in front of
za | за | behind
medzi | между | between
vedľa | рядом с | next to
pri | возле, у | by, near
okolo | вокруг, мимо | around, past
cez | через | through
u | у (кого-то) | at (someone's)
zhora | сверху | from above
`,
      },
      {
        id: "12-4", icon: "🪐", sk: "Vesmír", ru: "Космос", en: "Space",
        words: `
vesmír | вселенная, космос | universe, space | m
planéta | планета | planet | f
Zem | Земля | Earth | f
Slnečná sústava | Солнечная система | Solar System | f
Merkúr | Меркурий | Mercury | m
Venuša | Венера | Venus | f
Mars | Марс | Mars | m
Jupiter | Юпитер | Jupiter | m
Saturn | Сатурн | Saturn | m
kozmonaut | космонавт | astronaut | m
`,
      },
    ],
    sentences: `
Slovensko je stredoeurópsky štát. | Словакия — центральноевропейское государство. | Slovakia is a Central European state.
Hlavné mesto Slovenska je Bratislava. | Столица Словакии — Братислава. | The capital of Slovakia is Bratislava.
Na Štedrý večer jeme kapra a šalát. | В Сочельник мы едим карпа и салат. | On Christmas Eve we eat carp and salad.
Na Veľkú noc chlapci oblievajú dievčatá. | На Пасху мальчики обливают девочек. | At Easter boys splash girls with water.
Idem do školy cez park. | Я иду в школу через парк. | I go to school through the park.
Kniha je na stole a taška je pod stolom. | Книга на столе, а сумка под столом. | The book is on the table and the bag is under the table.
Kadiaľ ideš domov? | Какой дорогой ты идёшь домой? | Which way do you go home?
Bývam vedľa stanice. | Я живу рядом с вокзалом. | I live next to the station.
Na Slovensku je veľa hradov. | В Словакии много замков. | There are many castles in Slovakia.
Zem je tretia planéta Slnečnej sústavy. | Земля — третья планета Солнечной системы. | The Earth is the third planet of the Solar System.
`,
  },
];
