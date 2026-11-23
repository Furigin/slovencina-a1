// Проверка слияния прогресса двух устройств: node tools/test-merge.mjs
import { merge, emptyProgress } from "../js/store.js";
import assert from "node:assert/strict";

const a = emptyProgress(), b = emptyProgress();
a.words["1-1|muž"] = { b: 2, due: 5, n: 3, ok: 2, bad: 1, t: 100 };
b.words["1-1|muž"] = { b: 4, due: 9, n: 6, ok: 5, bad: 1, t: 200 };   // свежее
b.words["1-1|žena"] = { b: 1, due: 3, n: 1, ok: 1, bad: 0, t: 150 };
a.days["2026-10-26"] = 40; b.days["2026-10-26"] = 25; b.days["2026-10-27"] = 30;
a.drills.byt = { best: 80, plays: 2, t: 1 }; b.drills.byt = { best: 60, plays: 5, t: 2 };
a.ach.first = 500; b.ach.first = 300; b.ach.perfect = 700;
a.settings.goal = 20; a.updated = 10; b.settings.goal = 100; b.updated = 20;

const m = merge(a, b);
assert.equal(m.words["1-1|muž"].b, 4, "берётся более свежая запись слова");
assert.ok(m.words["1-1|žena"], "слово только с одного устройства не теряется");
assert.equal(m.days["2026-10-26"], 40, "опыт за день — максимум");
assert.equal(m.days["2026-10-27"], 30);
assert.deepEqual(m.drills.byt, { best: 80, plays: 5, t: 2 });
assert.equal(m.ach.first, 300, "достижение — самая ранняя дата");
assert.ok(m.ach.perfect);
assert.equal(m.settings.goal, 100, "настройки — с более свежего устройства");
assert.deepEqual(merge(m, m), m, "повторное слияние ничего не меняет");
assert.deepEqual(merge(null, b).words, b.words);

// имя в рейтинге: побеждает то, что поменяли позже (в т.ч. возврат к логину)
const p1 = emptyProgress(), p2 = emptyProgress();
p1.dname = "Kráľ"; p1.updated = 10;          // старое имя на телефоне
p2.dname = "furigin"; p2.updated = 20;       // на ноутбуке вернул логин
assert.equal(merge(p1, p2).dname, "furigin", "новое имя не затирается старым");
assert.equal(merge(p2, p1).dname, "furigin", "порядок слияния не важен");
const p3 = emptyProgress(); p3.updated = 30;  // старая копия без поля dname
assert.equal(merge(p2, p3).dname, "furigin", "копия без имени не стирает имя");
console.log("✔ слияние прогресса работает");
