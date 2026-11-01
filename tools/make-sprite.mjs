// Собирает icons/sprite.svg из нужных иконок Lucide (лицензия ISC).
// Запуск: node tools/make-sprite.mjs путь/к/lucide-static/icons
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { MAP } from "../js/icons.js";

const dir = process.argv[2];
// иконки, которые интерфейс использует напрямую через ic("имя")
const EXTRA = ["chevron-right", "chevron-left", "sparkles", "lock", "circle-play", "circle-pause", "info", "log-out", "user-plus", "shield-check", "rotate-ccw", "languages", "sun", "moon", "monitor", "bell", "book-a", "list-checks", "award", "mic"];
const names = [...new Set([...Object.values(MAP), ...EXTRA])].sort();
const missing = [];
let out = '<!-- Иконки Lucide (https://lucide.dev), лицензия ISC -->\n<svg xmlns="http://www.w3.org/2000/svg">\n';
for (const n of names) {
  const f = `${dir}/${n}.svg`;
  if (!existsSync(f)) { missing.push(n); continue; }
  const body = readFileSync(f, "utf8").replace(/<!--.*?-->/gs, "").replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").trim();
  out += `<symbol id="i-${n}" viewBox="0 0 24 24">${body.replace(/\s*\n\s*/g, "")}</symbol>\n`;
}
out += "</svg>\n";
writeFileSync(new URL("../icons/sprite.svg", import.meta.url), out);
console.log("иконок:", names.length - missing.length, missing.length ? "НЕТ: " + missing.join(", ") : "все найдены");
