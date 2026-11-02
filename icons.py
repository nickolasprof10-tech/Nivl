# Builds the Android launcher icons from www/icon-512.png
import os
from PIL import Image
src = Image.open("www/icon-512.png").convert("RGBA")
sizes = {"mdpi":48,"hdpi":72,"xhdpi":96,"xxhdpi":144,"xxxhdpi":192}
res = "android/app/src/main/res"
for d, px in sizes.items():
    out = f"{res}/mipmap-{d}"
    os.makedirs(out, exist_ok=True)
    im = src.resize((px, px), Image.LANCZOS)
    for n in ("ic_launcher.png", "ic_launcher_round.png", "ic_launcher_foreground.png"):
        im.save(f"{out}/{n}")
