# Рисует значки сайта и превью для соцсетей: python -I tools/make-icons.py
# Флаг Словакии = триколор + герб (красный щит, белый двойной крест, синие холмы).
# Без герба триколор выглядит как российский флаг — герб обязателен.
from PIL import Image, ImageDraw, ImageFont

WHITE, BLUE, RED = "#ffffff", "#0b4ea2", "#ee1c25"

def shield_poly(x, y, w, h, n=40):
    # щит: прямой верх, прямые бока до 55%, снизу дуга
    import math
    pts = [(x, y), (x + w, y), (x + w, y + h * 0.55)]
    cx, cy, rx, ry = x + w / 2, y + h * 0.55, w / 2, h * 0.45
    for i in range(n + 1):
        a = math.pi * i / n
        pts.append((cx + rx * math.cos(a), cy + ry * math.sin(a)))
    pts.append((x, y + h * 0.55))
    return pts

def draw_coat(d, x, y, w, h, border):
    d.polygon(shield_poly(x - border, y - border, w + 2 * border, h + 2 * border * 1.1), fill=WHITE)
    d.polygon(shield_poly(x, y, w, h), fill=RED)
    # три синих холма
    import math
    hill_r = w * 0.2
    base = y + h * 0.80
    for cx, r in ((x + w * 0.5, w * 0.24), (x + w * 0.24, w * 0.2), (x + w * 0.76, w * 0.2)):
        d.ellipse([cx - r, base - r * 0.9, cx + r, base + r * 1.6], fill=BLUE)
    # обрезка холмов по щиту: перерисуем низ щита белой рамкой снаружи
    mask = Image.new("L", d.im.size, 0)
    # двойной крест
    cx = x + w / 2
    bw = w * 0.11
    d.rectangle([cx - bw / 2, y + h * 0.12, cx + bw / 2, base - w * 0.12], fill=WHITE)
    d.rectangle([cx - w * 0.22, y + h * 0.25, cx + w * 0.22, y + h * 0.25 + bw], fill=WHITE)
    d.rectangle([cx - w * 0.31, y + h * 0.45, cx + w * 0.31, y + h * 0.45 + bw], fill=WHITE)

def coat_image(w, h, border):
    pad = int(border * 3)
    im = Image.new("RGBA", (int(w + 2 * pad), int(h + 2 * pad)), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    draw_coat(d, pad, pad, w, h, border)
    # всё, что вылезло за щит (холмы), стираем по маске щита с рамкой
    m = Image.new("L", im.size, 0)
    ImageDraw.Draw(m).polygon(shield_poly(pad - border, pad - border, w + 2 * border, h + 2 * border * 1.1), fill=255)
    im.putalpha(Image.composite(im.getchannel("A"), Image.new("L", im.size, 0), m))
    return im, pad

def make_icon(s):
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    flag = Image.new("RGBA", (s, s))
    d = ImageDraw.Draw(flag)
    d.rectangle([0, 0, s, s / 3], fill=WHITE)
    d.rectangle([0, s / 3, s, 2 * s / 3], fill=BLUE)
    d.rectangle([0, 2 * s / 3, s, s], fill=RED)
    coat, pad = coat_image(s * 0.46, s * 0.58, s * 0.025)
    flag.alpha_composite(coat, (int(s * 0.27 - pad), int(s * 0.2 - pad)))
    mask = Image.new("L", (s, s), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, s - 1, s - 1], radius=int(s * 0.22), fill=255)
    img.paste(flag, (0, 0), mask)
    return img

for size in (192, 512):
    make_icon(size).save(f"icons/icon-{size}.png")
make_icon(64).save("icons/favicon.png")

# превью для Telegram / WhatsApp
W, H = 1200, 630
og = Image.new("RGB", (W, H), "#111722")
d = ImageDraw.Draw(og)
F = lambda n, sz: ImageFont.truetype("C:/Windows/Fonts/" + n, sz)
d.rectangle([0, 0, 14, H], fill="#4c8dff")
og.paste(make_icon(230), (890, 80), make_icon(230))
d.text((80, 80), "Slovenčina A1", font=F("segoeuib.ttf", 86), fill="#ffffff")
d.text((82, 192), "Бесплатный тренажёр словацкого", font=F("segoeuib.ttf", 46), fill="#4c8dff")
d.text((82, 254), "по учебнику «Tri, dva, jeden»", font=F("segoeui.ttf", 42), fill="#c9d3e6")
items = ["1300+ слов · 6 уроков", "Карточки, квизы, на слух", "Часы, блиц, грамматика", "Прогресс в облаке"]
for i, t in enumerate(items):
    x = 82 + (i % 2) * 520; y = 360 + (i // 2) * 80
    d.rounded_rectangle([x, y, x + 490, y + 62], radius=16, fill="#1b2333", outline="#2c3850", width=3)
    d.line([(x + 22, y + 32), (x + 32, y + 42), (x + 50, y + 20)], fill="#7bd12a", width=6, joint="curve")
    d.text((x + 66, y + 31), t, font=F("segoeuib.ttf", 30), fill="#e8edf6", anchor="lm")
d.text((82, 570), "furigin.github.io/slovencina-a1", font=F("segoeui.ttf", 30), fill="#9aa5bb")
og.save("icons/og-image.png", optimize=True)
print("ok")
