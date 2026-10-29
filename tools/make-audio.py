# Озвучка всех слов и фраз в mp3 (голос Piper sk_SK-lili, офлайн).
# Запуск (нужны: pip install piper-tts, ffmpeg, модель голоса):
#   node tools/audio-list.mjs
#   python tools/make-audio.py путь/к/sk_SK-lili-medium.onnx
# Уже готовые файлы пропускаются — можно запускать повторно после правок словаря.
import json, os, subprocess, sys, wave, tempfile
from piper import PiperVoice, SynthesisConfig

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "audio")
os.makedirs(OUT, exist_ok=True)

voice = PiperVoice.load(sys.argv[1])
# чуть медленнее обычного — для начинающих (1.0 = обычная скорость)
SLOW = SynthesisConfig(length_scale=1.25)
items = json.load(open(os.path.join(ROOT, "tools", "audio-texts.json"), encoding="utf-8"))
tmp = os.path.join(tempfile.gettempdir(), "sk-tts.wav")

done = 0
for it in items:
    mp3 = os.path.join(OUT, it["hash"] + ".mp3")
    if os.path.exists(mp3):
        continue
    with wave.open(tmp, "wb") as wf:
        voice.synthesize_wav(it["text"], wf, syn_config=SLOW)
    # обрезать тишину по краям, моно 24 кГц, ~40 кбит/с — маленькие файлы
    subprocess.run([
        "ffmpeg", "-loglevel", "error", "-y", "-i", tmp,
        "-af", "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,apad=pad_dur=0.08",
        "-ac", "1", "-ar", "24000", "-b:a", "40k", mp3,
    ], check=True)
    done += 1
    if done % 200 == 0:
        print(done, "готово", flush=True)

# список готовых файлов для сайта
have = sorted(f[:-4] for f in os.listdir(OUT) if f.endswith(".mp3"))
with open(os.path.join(ROOT, "js", "audio-index.js"), "w", encoding="utf-8") as f:
    f.write("// Сгенерировано tools/make-audio.py — какие слова озвучены (хэши файлов в audio/)\n")
    f.write("export const AUDIO = new Set(" + json.dumps(have) + ");\n")
print("всего файлов:", len(have))
