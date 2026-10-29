// Ключ и имя аудиофайла для текста: одинаково в браузере и в скриптах генерации.
// «Dobrý deň!» → ключ «dobrý deň!» → файл audio/<хэш>.mp3
// voice: "f" — женский голос (по умолчанию), "m" — мужской (ключ с приставкой «m|»)
export function audioKey(text, voice = "f") {
  const k = String(text).replace(/\.\.\.|…/g, "").replace(/\s+/g, " ").trim().toLowerCase();
  return voice === "m" ? "m|" + k : k;
}
// FNV-1a 32 бита → 8 hex-символов
export function audioHash(key) {
  let h = 0x811c9dc5;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}
