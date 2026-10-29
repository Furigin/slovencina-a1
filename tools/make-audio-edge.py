# Озвучка нейроголосами Microsoft (Viktoria — женский, Lukáš — мужской) через edge-tts.
# Запуск:
#   pip install edge-tts
#   node tools/audio-list.mjs
#   python tools/make-audio-edge.py
# Уже записанные этим голосом файлы пропускаются (список — tools/audio-engine.json).
# Если edge-tts перестанет работать — можно перейти на официальный Azure Speech
# (бесплатный тариф F0) или вернуться к офлайн-голосу: tools/make-audio.py.
import asyncio, json, os, subprocess, sys
import edge_tts

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "audio")
ENGINE_FILE = os.path.join(ROOT, "tools", "audio-engine.json")
VOICES = {"f": "sk-SK-ViktoriaNeural", "m": "sk-SK-LukasNeural"}
ENGINE = "edge-v1"
os.makedirs(OUT, exist_ok=True)

items = json.load(open(os.path.join(ROOT, "tools", "audio-texts.json"), encoding="utf-8"))
engine = json.load(open(ENGINE_FILE, encoding="utf-8")) if os.path.exists(ENGINE_FILE) else {}
todo = [it for it in items if engine.get(it["hash"]) != ENGINE]
print("нужно записать:", len(todo), flush=True)

# обрезать тишину по краям (иначе 🔊 срабатывает с задержкой) и сжать: моно 24 кГц, 40 кбит/с
TRIM = "silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.03,areverse,silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.08,areverse"
def trim(src, dst):
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", src, "-af", TRIM, "-ac", "1", "-ar", "24000", "-b:a", "40k", dst], check=True)
    os.remove(src)

sem = asyncio.Semaphore(6)
done = 0

async def one(it):
    global done
    path = os.path.join(OUT, it["hash"] + ".mp3")
    # слова — чуть медленнее, тексты и диалоги — почти обычный темп
    rate = it.get("rate") or ("-12%" if len(it["text"]) < 40 else "-5%")
    async with sem:
        for attempt in range(4):
            try:
                await edge_tts.Communicate(it["text"], VOICES[it.get("voice", "f")], rate=rate).save(path + ".raw.mp3")
                await asyncio.to_thread(trim, path + ".raw.mp3", path)
                engine[it["hash"]] = ENGINE
                done += 1
                if done % 200 == 0:
                    print(done, "готово", flush=True)
                    json.dump(engine, open(ENGINE_FILE, "w"), indent=0)
                return
            except Exception as e:
                await asyncio.sleep(2 + attempt * 3)
        print("НЕ ВЫШЛО:", it["text"], flush=True)

async def main():
    await asyncio.gather(*(one(it) for it in todo))

asyncio.run(main())
json.dump(engine, open(ENGINE_FILE, "w"), indent=0)

have = sorted(f[:-4] for f in os.listdir(OUT) if f.endswith(".mp3"))
with open(os.path.join(ROOT, "js", "audio-index.js"), "w", encoding="utf-8") as f:
    f.write("// Сгенерировано tools/make-audio*.py — какие тексты озвучены (хэши файлов в audio/)\n")
    f.write("export const AUDIO = new Set(" + json.dumps(have) + ");\n")
print("всего файлов:", len(have))
