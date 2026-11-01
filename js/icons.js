// =====================================================================
//  ИКОНКИ: вместо эмодзи — векторные иконки Lucide (лицензия ISC).
//  Эмодзи в данных и текстах остаются как «коды», а на экране любое эмодзи
//  автоматически заменяется на <svg> из спрайта icons/sprite.svg.
//  Добавить иконку: строка в MAP + node tools/make-sprite.mjs
// =====================================================================

// эмодзи → имя иконки Lucide (https://lucide.dev/icons)
export const MAP = {
  "→": "arrow-right", "←": "arrow-left", "✕": "x", "✖": "x", "✓": "check", "✔": "check", "✅": "circle-check", "❌": "circle-x",
  "★": "star", "⭐": "star", "🌟": "sparkles", "✨": "sparkles", "🔊": "volume-2", "🔇": "volume-x", "🎯": "target", "🔥": "flame",
  "⚡": "zap", "☁️": "cloud", "🔁": "repeat", "🎧": "headphones", "🧊": "snowflake", "🧩": "puzzle", "📝": "notebook-pen", "🏠": "house",
  "🎲": "dices", "🧠": "brain", "🧭": "compass", "👑": "crown", "📘": "book-open", "💪": "dumbbell", "💎": "gem", "📖": "book-open-text",
  "🎓": "graduation-cap", "⚑": "flag", "🏆": "trophy", "📅": "calendar", "↔": "arrow-left-right", "↔️": "arrow-left-right", "📚": "library",
  "💬": "messages-square", "🐞": "bug", "🕐": "clock", "🕗": "alarm-clock", "📱": "smartphone", "⚠️": "triangle-alert", "🍽️": "utensils-crossed",
  "👋": "hand", "⏮️": "history", "🃏": "layers", "🙂": "smile", "😊": "smile-plus", "📗": "book-check", "🥇": "medal", "🥈": "medal", "🥉": "medal",
  "⌨️": "keyboard", "♀": "venus", "🎉": "party-popper", "🙋": "hand", "⚙️": "settings", "👩": "user-round", "👨": "user", "🏡": "house-plus",
  "🩺": "stethoscope", "🚆": "train-front", "❔": "circle-help", "❓": "circle-help", "🧑‍🦱": "user-round", "❤️": "heart", "🎄": "tree-pine",
  "📍": "map-pin", "🎨": "palette", "🔢": "hash", "🛒": "shopping-cart", "⏭️": "skip-forward", "🏛️": "landmark", "🌍": "earth", "💼": "briefcase",
  "✌️": "users", "🏃": "footprints", "💶": "euro", "👥": "users", "🐢": "snail", "🌱": "sprout", "👤": "user", "📄": "file-text", "📦": "package",
  "⬇️": "download", "⬆️": "upload", "📤": "share-2", "⏳": "hourglass", "🔍": "search", "⏸": "pause", "🔌": "plug", "🍳": "cooking-pot",
  "🪵": "box", "🧍": "person-standing", "⛷️": "mountain-snow", "🎫": "ticket", "⛅": "cloud-sun", "🥫": "shopping-basket", "✂️": "scissors",
  "🏦": "piggy-bank", "👚": "shirt", "🇸🇰": "flag", "🪐": "orbit", "🧑": "users-round", "👩‍⚕️": "briefcase-medical", "✏️": "pencil", "🪑": "armchair",
  "📏": "ruler", "👨‍👩‍👧‍👦": "heart-handshake", "💯": "badge-percent", "🗣️": "message-circle", "🗨️": "message-square", "✍️": "pen-line",
  "🚿": "shower-head", "🍎": "apple", "🧥": "shirt", "👪": "users", "💻": "laptop", "⚽": "volleyball", "🏔️": "mountain", "🧀": "chef-hat",
  "🙏": "hand-heart", "🏙️": "building-2", "🚌": "bus", "🧑‍🤝‍🧑": "users", "🌋": "trees", "🍞": "croissant", "🍴": "utensils", "🛋️": "sofa",
  "🫀": "heart-pulse", "💊": "pill", "🐾": "paw-print", "🌦️": "cloud-sun-rain", "🗓️": "calendar-days", "👗": "shirt", "🧳": "luggage",
  "🌈": "rainbow", "⏩": "fast-forward", "🔗": "link", "🎸": "guitar", "📈": "trending-up", "🚋": "tram-front", "🔀": "shuffle", "🥛": "milk",
  "🎁": "gift", "🫴": "hand-helping", "🔤": "case-sensitive", "⚧": "venus-and-mars", "🫵": "pointer", "🔟": "hash", "👀": "eye",
  "📢": "megaphone", "📷": "camera", "☕": "coffee", "🐣": "egg", "🌿": "leaf", "🌳": "tree-deciduous", "▶": "play", "🔄": "refresh-cw",
  "⏮": "history", "🙌": "hand", "☁": "cloud",
};

const SKIP = new Set(["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "OPTION", "SELECT", "svg", "title"]);
// длинные последовательности первыми (👨‍👩‍👧‍👦 раньше 👨)
const KEYS = Object.keys(MAP).sort((a, b) => b.length - a.length);
const RE = new RegExp(KEYS.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "️?").join("|"), "g");

// разметка иконки
export function ic(name, cls = "") {
  return `<svg class="i ${cls}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
}
// эмодзи → разметка иконки (для мест, где строим HTML сами)
export function emojiIcon(emoji, cls = "") {
  const name = MAP[emoji] || MAP[String(emoji).replace(/️/g, "")];
  return name ? ic(name, cls) : emoji;
}

// заменить эмодзи в текстовых узлах внутри root
function iconize(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      for (let p = n.parentNode; p && p !== root.parentNode; p = p.parentNode) if (SKIP.has(p.nodeName)) return NodeFilter.FILTER_REJECT;
      RE.lastIndex = 0;
      return RE.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    },
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const n of nodes) {
    const tmp = document.createElement("span");
    tmp.innerHTML = n.nodeValue.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]))
      .replace(RE, (m) => ic(MAP[m] || MAP[m.replace(/️/g, "")]));
    n.replaceWith(...tmp.childNodes);
  }
}

// загрузить спрайт и следить за всеми изменениями страницы
export async function initIcons() {
  try {
    const svg = await (await fetch("icons/sprite.svg")).text();
    const holder = document.createElement("div");
    holder.style.display = "none";
    holder.innerHTML = svg;
    document.body.prepend(holder);
  } catch (e) { /* без спрайта просто останутся пустые места */ }
  iconize(document.body);
  new MutationObserver((muts) => {
    for (const m of muts) for (const n of m.addedNodes) {
      if (n.nodeType === 1) iconize(n);
      else if (n.nodeType === 3 && n.parentNode) iconize(n.parentNode);
    }
  }).observe(document.body, { childList: true, subtree: true });
}
