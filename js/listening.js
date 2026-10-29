// =====================================================================
//  АУДИРОВАНИЕ: короткие диалоги на лексике уроков + вопросы на понимание.
//  Реплика: [кто, словацкий, русский, английский]. Кто: "f" — женский голос
//  (Viktoria), "m" — мужской (Lukáš). Озвучка: node tools/audio-list.mjs →
//  python tools/make-audio-edge.py
//  Вопрос: { ru, en, options: [[ru, en], ...], answer: номер правильного }
// =====================================================================

export const DIALOGS = [
  {
    id: "d1", lesson: 1, icon: "🎉",
    sk: "Na večierku", ru: "На вечеринке", en: "At a party",
    people: { f: "Katka", m: "Tomáš" },
    lines: [
      ["f", "Ahoj! Ja som Katka. Kto si ty?", "Привет! Я Катка. А ты кто?", "Hi! I'm Katka. Who are you?"],
      ["m", "Ahoj, Katka. Ja som Tomáš. Teší ma.", "Привет, Катка. Я Томаш. Очень приятно.", "Hi, Katka. I'm Tomáš. Nice to meet you."],
      ["f", "Teší ma. Odkiaľ si, Tomáš?", "Приятно познакомиться. Откуда ты, Томаш?", "Nice to meet you. Where are you from, Tomáš?"],
      ["m", "Som zo Žiliny. A ty?", "Я из Жилины. А ты?", "I'm from Žilina. And you?"],
      ["f", "Ja som z Bratislavy. Som študentka.", "Я из Братиславы. Я студентка.", "I'm from Bratislava. I'm a student."],
      ["m", "Aj ja som študent. Ako sa máš?", "Я тоже студент. Как дела?", "I'm a student too. How are you?"],
      ["f", "Ďakujem, dobre. A ty?", "Спасибо, хорошо. А у тебя?", "Fine, thanks. And you?"],
      ["m", "Skvele! Na zdravie!", "Отлично! За здоровье!", "Great! Cheers!"],
    ],
    questions: [
      { ru: "Откуда Томаш?", en: "Where is Tomáš from?", options: [["Из Жилины", "From Žilina"], ["Из Братиславы", "From Bratislava"], ["Из Кошице", "From Košice"]], answer: 0 },
      { ru: "Кто Катка?", en: "Who is Katka?", options: [["Врач", "A doctor"], ["Студентка", "A student"], ["Учительница", "A teacher"]], answer: 1 },
      { ru: "Как дела у Томаша?", en: "How is Tomáš?", options: [["Плохо", "Bad"], ["Не очень", "Not great"], ["Отлично", "Great"]], answer: 2 },
    ],
  },
  {
    id: "d2", lesson: 2, icon: "📷",
    sk: "Kto je na fotografii?", ru: "Кто на фотографии?", en: "Who is in the photo?",
    people: { f: "Lucia", m: "Peter" },
    lines: [
      ["f", "Peter, kto je to na fotografii?", "Петер, кто это на фотографии?", "Peter, who is that in the photo?"],
      ["m", "To je môj brat Marek. Je mladý, vysoký a štíhly.", "Это мой брат Марек. Он молодой, высокий и стройный.", "That's my brother Marek. He's young, tall and slim."],
      ["f", "A aký je? Je veselý?", "А какой он? Весёлый?", "And what's he like? Is he cheerful?"],
      ["m", "Áno, je veselý a veľmi inteligentný. Ale je trochu lenivý.", "Да, весёлый и очень умный. Но немного ленивый.", "Yes, he's cheerful and very clever. But a bit lazy."],
      ["f", "Aká je jeho obľúbená farba?", "Какой его любимый цвет?", "What's his favourite colour?"],
      ["m", "Jeho obľúbená farba je zelená. A jeho obľúbený nápoj je čaj.", "Его любимый цвет — зелёный. А любимый напиток — чай.", "His favourite colour is green. And his favourite drink is tea."],
      ["f", "Hovorí po anglicky?", "Он говорит по-английски?", "Does he speak English?"],
      ["m", "Áno, hovorí po anglicky a po nemecky.", "Да, говорит по-английски и по-немецки.", "Yes, he speaks English and German."],
    ],
    questions: [
      { ru: "Кто на фотографии?", en: "Who is in the photo?", options: [["Отец Петера", "Peter's father"], ["Брат Петера", "Peter's brother"], ["Друг Люции", "Lucia's friend"]], answer: 1 },
      { ru: "Какой Марек?", en: "What is Marek like?", options: [["Высокий и стройный", "Tall and slim"], ["Низкий и толстый", "Short and fat"], ["Старый и грустный", "Old and sad"]], answer: 0 },
      { ru: "Его любимый напиток?", en: "His favourite drink?", options: [["Кофе", "Coffee"], ["Пиво", "Beer"], ["Чай", "Tea"]], answer: 2 },
      { ru: "На каких языках он говорит?", en: "Which languages does he speak?", options: [["Английский и немецкий", "English and German"], ["Русский и чешский", "Russian and Czech"], ["Только словацкий", "Only Slovak"]], answer: 0 },
    ],
  },
  {
    id: "d3", lesson: 3, icon: "🛒",
    sk: "V obchode", ru: "В магазине", en: "In the shop",
    people: { f: "Predavačka", m: "Zákazník" },
    lines: [
      ["f", "Dobrý deň, čo si prosíte?", "Добрый день, что желаете?", "Good afternoon, what would you like?"],
      ["m", "Dobrý deň. Prosím si chlieb a mlieko.", "Добрый день. Мне, пожалуйста, хлеб и молоко.", "Good afternoon. Bread and milk, please."],
      ["f", "Nech sa páči. Ešte niečo?", "Пожалуйста. Что-нибудь ещё?", "Here you are. Anything else?"],
      ["m", "Áno, ešte dve jablká. Koľko stojí čokoláda?", "Да, ещё два яблока. Сколько стоит шоколад?", "Yes, two apples too. How much is the chocolate?"],
      ["f", "Čokoláda stojí dve eurá.", "Шоколад стоит два евро.", "The chocolate costs two euros."],
      ["m", "Dobre, aj čokoládu, prosím. Koľko platím?", "Хорошо, и шоколад, пожалуйста. Сколько с меня?", "OK, the chocolate too, please. How much do I pay?"],
      ["f", "Spolu platíte päť eur a desať centov.", "Всего пять евро десять центов.", "That's five euros ten cents altogether."],
      ["m", "Nech sa páči. Ďakujem, dovidenia!", "Вот, пожалуйста. Спасибо, до свидания!", "Here you are. Thank you, goodbye!"],
    ],
    questions: [
      { ru: "Что покупает мужчина?", en: "What does the man buy?", options: [["Хлеб, молоко, яблоки и шоколад", "Bread, milk, apples and chocolate"], ["Только хлеб", "Only bread"], ["Кофе и сыр", "Coffee and cheese"]], answer: 0 },
      { ru: "Сколько стоит шоколад?", en: "How much is the chocolate?", options: [["1 €", "€1"], ["2 €", "€2"], ["5 €", "€5"]], answer: 1 },
      { ru: "Сколько он платит всего?", en: "How much does he pay in total?", options: [["2,50 €", "€2.50"], ["10,50 €", "€10.50"], ["5,10 €", "€5.10"]], answer: 2 },
    ],
  },
  {
    id: "d4", lesson: 4, icon: "☕",
    sk: "Čo budeš robiť zajtra?", ru: "Что будешь делать завтра?", en: "What will you do tomorrow?",
    people: { f: "Anna", m: "Jakub" },
    lines: [
      ["f", "Ahoj, Jakub! Čo budeš robiť zajtra?", "Привет, Якуб! Что будешь делать завтра?", "Hi, Jakub! What will you do tomorrow?"],
      ["m", "Ráno budem študovať. Popoludní pôjdem na tréning.", "Утром буду учиться. Днём пойду на тренировку.", "In the morning I'll study. In the afternoon I'll go to training."],
      ["f", "A večer? Pozývam ťa na kávu.", "А вечером? Приглашаю тебя на кофе.", "And in the evening? Let me buy you a coffee."],
      ["m", "Večer nemám čas, budem pozerať futbal. Možno v sobotu?", "Вечером у меня нет времени, буду смотреть футбол. Может, в субботу?", "I have no time in the evening, I'll watch football. Maybe on Saturday?"],
      ["f", "V sobotu budem doma. Budem upratovať a variť.", "В субботу я буду дома. Буду убирать и готовить.", "On Saturday I'll be at home. I'll clean and cook."],
      ["m", "Tak v nedeľu. Pôjdeme do kina?", "Тогда в воскресенье. Пойдём в кино?", "Sunday then. Shall we go to the cinema?"],
      ["f", "Super! Mám rada kino. Uvidíme sa v nedeľu!", "Супер! Я люблю кино. Увидимся в воскресенье!", "Great! I love the cinema. See you on Sunday!"],
    ],
    questions: [
      { ru: "Что Якуб будет делать вечером?", en: "What will Jakub do in the evening?", options: [["Учиться", "Study"], ["Смотреть футбол", "Watch football"], ["Пить кофе", "Drink coffee"]], answer: 1 },
      { ru: "Что Анна будет делать в субботу?", en: "What will Anna do on Saturday?", options: [["Убирать и готовить", "Clean and cook"], ["Пойдёт на тренировку", "Go to training"], ["Пойдёт в кино", "Go to the cinema"]], answer: 0 },
      { ru: "Когда они пойдут в кино?", en: "When will they go to the cinema?", options: [["Завтра", "Tomorrow"], ["В субботу", "On Saturday"], ["В воскресенье", "On Sunday"]], answer: 2 },
    ],
  },
  {
    id: "d5", lesson: 5, icon: "🧭",
    sk: "Ako sa dostanem na stanicu?", ru: "Как пройти к вокзалу?", en: "How do I get to the station?",
    people: { f: "Turistka", m: "Pán" },
    lines: [
      ["f", "Prepáčte, ako sa dostanem na stanicu?", "Простите, как мне попасть на вокзал?", "Excuse me, how do I get to the station?"],
      ["m", "Choďte rovno a potom odbočte doľava.", "Идите прямо, а потом поверните налево.", "Go straight on and then turn left."],
      ["f", "Je to ďaleko?", "Это далеко?", "Is it far?"],
      ["m", "Nie, je to blízko. Asi päť minút pešo.", "Нет, близко. Минут пять пешком.", "No, it's near. About five minutes on foot."],
      ["f", "A kde je tu pošta?", "А где здесь почта?", "And where is the post office?"],
      ["m", "Pošta je vedľa banky, oproti parku.", "Почта рядом с банком, напротив парка.", "The post office is next to the bank, opposite the park."],
      ["f", "Ďakujem pekne!", "Большое спасибо!", "Thank you very much!"],
      ["m", "Niet za čo. Pekný deň!", "Не за что. Хорошего дня!", "You're welcome. Have a nice day!"],
    ],
    questions: [
      { ru: "Куда идти к вокзалу?", en: "How to get to the station?", options: [["Прямо, потом налево", "Straight on, then left"], ["Направо, потом прямо", "Right, then straight on"], ["Назад", "Back"]], answer: 0 },
      { ru: "Сколько идти пешком?", en: "How long on foot?", options: [["Час", "An hour"], ["Минут пять", "About five minutes"], ["Полчаса", "Half an hour"]], answer: 1 },
      { ru: "Где почта?", en: "Where is the post office?", options: [["Рядом с вокзалом", "Next to the station"], ["За парком", "Behind the park"], ["Рядом с банком, напротив парка", "Next to the bank, opposite the park"]], answer: 2 },
    ],
  },
  {
    id: "d6", lesson: 5, icon: "⏮️",
    sk: "Čo si robil včera?", ru: "Что ты делал вчера?", en: "What did you do yesterday?",
    people: { f: "Zuzana", m: "Michal" },
    lines: [
      ["f", "Ahoj, Michal! Čo si robil včera?", "Привет, Михал! Что ты делал вчера?", "Hi, Michal! What did you do yesterday?"],
      ["m", "Ráno som bol v škole. Popoludní som hral futbal.", "Утром я был в школе. Днём играл в футбол.", "In the morning I was at school. In the afternoon I played football."],
      ["f", "A večer?", "А вечером?", "And in the evening?"],
      ["m", "Večer som pozeral film a potom som išiel spať. A ty?", "Вечером смотрел фильм, а потом пошёл спать. А ты?", "In the evening I watched a film and then went to bed. And you?"],
      ["f", "Ja som bola v meste. Kúpila som nové topánky a stretla som Janu.", "Я была в городе. Купила новые туфли и встретила Яну.", "I was in town. I bought new shoes and met Jana."],
      ["m", "Kde ste boli?", "Где вы были?", "Where were you?"],
      ["f", "Boli sme v kaviarni. Pili sme kávu a rozprávali sme sa.", "Мы были в кафе. Пили кофе и разговаривали.", "We were in a café. We drank coffee and talked."],
    ],
    questions: [
      { ru: "Что Михал делал днём?", en: "What did Michal do in the afternoon?", options: [["Играл в футбол", "Played football"], ["Был в школе", "Was at school"], ["Смотрел фильм", "Watched a film"]], answer: 0 },
      { ru: "Что купила Зузана?", en: "What did Zuzana buy?", options: [["Книгу", "A book"], ["Новые туфли", "New shoes"], ["Кофе", "Coffee"]], answer: 1 },
      { ru: "Где Зузана была с Яной?", en: "Where was Zuzana with Jana?", options: [["В кино", "At the cinema"], ["Дома", "At home"], ["В кафе", "In a café"]], answer: 2 },
    ],
  },
  {
    id: "d7", lesson: 6, icon: "📝",
    sk: "Odkiaľ ste?", ru: "Откуда вы?", en: "Where are you from?",
    people: { f: "Úradníčka", m: "Oleh" },
    lines: [
      ["f", "Dobrý deň. Ako sa voláte?", "Добрый день. Как вас зовут?", "Good afternoon. What's your name?"],
      ["m", "Dobrý deň. Volám sa Oleh Kovalenko.", "Добрый день. Меня зовут Олег Коваленко.", "Good afternoon. My name is Oleh Kovalenko."],
      ["f", "Odkiaľ ste?", "Откуда вы?", "Where are you from?"],
      ["m", "Som z Ukrajiny, z Kyjeva. Teraz bývam v Bratislave.", "Я из Украины, из Киева. Сейчас живу в Братиславе.", "I'm from Ukraine, from Kyiv. Now I live in Bratislava."],
      ["f", "Koľko máte rokov?", "Сколько вам лет?", "How old are you?"],
      ["m", "Mám dvadsaťdva rokov. Som študent.", "Мне двадцать два года. Я студент.", "I'm twenty-two. I'm a student."],
      ["f", "Ste ženatý?", "Вы женаты?", "Are you married?"],
      ["m", "Nie, som slobodný.", "Нет, я холост.", "No, I'm single."],
      ["f", "Aké jazyky hovoríte?", "На каких языках вы говорите?", "Which languages do you speak?"],
      ["m", "Hovorím po ukrajinsky, po anglicky a trochu po slovensky.", "Говорю по-украински, по-английски и немного по-словацки.", "I speak Ukrainian, English and a little Slovak."],
    ],
    questions: [
      { ru: "Откуда Олег?", en: "Where is Oleh from?", options: [["Из Польши", "From Poland"], ["Из Украины", "From Ukraine"], ["Из Словакии", "From Slovakia"]], answer: 1 },
      { ru: "Сколько ему лет?", en: "How old is he?", options: [["22", "22"], ["20", "20"], ["32", "32"]], answer: 0 },
      { ru: "Он женат?", en: "Is he married?", options: [["Да", "Yes"], ["Разведён", "Divorced"], ["Нет, холост", "No, single"]], answer: 2 },
    ],
  },
];
