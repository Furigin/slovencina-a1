// Ключ и имя аудиофайла для текста: одинаково в браузере и в скриптах генерации.
// «Dobrý deň!» → ключ «dobrý deň!» → файл audio/<хэш>.mp3
export function audioKey(text) {
  return String(text).replace(/\.\.\.|…/g, "").replace(/\s+/g, " ").trim().toLowerCase();
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
