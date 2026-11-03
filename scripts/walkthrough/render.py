"""Render real Playwright recordings into the approved 72-second Bruma edit."""
import hashlib
import json
import math
import os
import subprocess
import sys
from pathlib import Path

if os.environ.get("BRUMA_WALKTHROUGH_TOOLS"):
    sys.path.insert(0, os.environ["BRUMA_WALKTHROUGH_TOOLS"])
import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
FPS, WIDTH, HEIGHT = 25, 1920, 1080
FONT = os.environ.get("BRUMA_VIDEO_FONT", "C:/Windows/Fonts/segoeui.ttf")
BG, TEXT, ACCENT, MUTED = "#151a16", "#f2efe5", "#d0ddb0", "#b4b9ad"


def font(size):
    return ImageFont.truetype(FONT, size)


def run(args):
    result = subprocess.run([FFMPEG, "-hide_banner", "-loglevel", "error", "-y", *map(str, args)], capture_output=True)
    if result.returncode:
        raise RuntimeError(result.stderr.decode(errors="replace")[-5000:])
    return result.stdout


def timestamp(seconds):
    total = round(seconds * 1000)
    minutes, total = divmod(total, 60000)
    whole, milliseconds = divmod(total, 1000)
    return f"00:{minutes:02}:{whole:02}.{milliseconds:03}"


def wrap(draw, text, face, width):
    lines, line = [], ""
    for word in text.split():
        candidate = f"{line} {word}".strip()
        if line and draw.textlength(candidate, font=face) > width:
            lines.append(line)
            line = word
        else:
            line = candidate
    return [*lines, line]


def offset(take, source):
    raw = run(["-i", take / source["file"], "-t", "12", "-vf", "fps=25,crop=8:8:0:0", "-pix_fmt", "rgb24", "-f", "rawvideo", "pipe:1"])
    for frame in range(len(raw) // 192):
        pixels = raw[frame * 192:(frame + 1) * 192]
        r, g, b = (sum(pixels[channel::3]) / 64 for channel in range(3))
        if r < 40 and g < 40 and b > 200:
            return source["syncWallTime"] - frame / FPS
    raise ValueError("Recording synchronization marker missing")


def overlay(file, scene, index):
    canvas = Image.new("RGBA", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(canvas)
    if scene["source"] == "mobile":
        draw.text((130, 100), "bruma", font=font(64), fill=TEXT)
        draw.text((134, 185), "CAFÉ DE ORIGEN / PRODUCT WALKTHROUGH", font=font(19), fill=ACCENT)
        draw.line((134, 265, 950, 265), fill="#3c4438", width=2)
        for number, line in enumerate(scene["title"].split("\n")):
            draw.text((130, 345 + number * 90), line, font=font(74), fill=TEXT)
        for number, line in enumerate(wrap(draw, scene["caption"], font(34), 810)):
            draw.text((134, 605 + number * 51), line, font=font(34), fill=MUTED)
        draw.text((134, 855), f"{index + 1:02} / 08     MOBILE · 390 × 844", font=font(20), fill=ACCENT)
        draw.text((134, 945), "A portfolio experience. Simulated orders.", font=font(21), fill=MUTED)
        draw.rounded_rectangle((1210, 60, 1643, 993), radius=8, outline="#68735b", width=2)
    else:
        draw.text((194, 922), "bruma / " + scene["title"], font=font(30), fill=ACCENT)
        draw.text((194, 973), scene["caption"], font=font(25), fill=TEXT)
    draw.rectangle((0, 1076, WIDTH, 1079), fill="#3c4438")
    draw.rectangle((0, 1076, WIDTH * (index + 1) // 8, 1079), fill=ACCENT)
    canvas.save(file)


def render(take):
    manifest = json.loads((take / "manifest.json").read_text(encoding="utf-8"))
    if manifest["rehearsal"]:
        raise ValueError("A rehearsal is not recorded footage")
    working = take / "edit"
    working.mkdir(exist_ok=True)
    destination = ROOT / "public/walkthrough"
    destination.mkdir(parents=True, exist_ok=True)
    offsets = {name: offset(take, source) for name, source in manifest["sources"].items()}
    chapters, files, vtt, elapsed = [], [], ["WEBVTT", ""], 0
    for index, scene in enumerate(manifest["scenes"]):
        seconds = scene["seconds"]
        artwork = working / f"{index:02}.png"
        overlay(artwork, scene, index)
        output = working / f"{index:02}.mp4"
        files.append(output)
        start = max(0, scene["start"] - offsets[scene["source"]])
        mobile = scene["source"] == "mobile"
        scale, x, y = ("430:930", 1212, 62) if mobile else ("1536:854", 192, 40)
        filters = f"[0:v]trim=duration={seconds},setpts=PTS-STARTPTS,fps={FPS},scale={scale}:flags=lanczos,setsar=1[app];color=c=0x151a16:s=1920x1080:r=25:d={seconds}[bg];[bg][app]overlay={x}:{y}:shortest=1[base];[base][1:v]overlay=0:0:shortest=1[out]"
        print(f"Rendering {scene['id']} ({seconds}s)", flush=True)
        run(["-ss", f"{start:.3f}", "-i", take / manifest["sources"][scene["source"]]["file"], "-loop", "1", "-framerate", FPS, "-i", artwork,
             "-filter_complex_threads", "2", "-filter_complex", filters, "-map", "[out]", "-t", seconds,
             "-an", "-r", FPS, "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p", output])
        chapters.append({"id": scene["id"], "title": scene["title"].replace("\n", " "), "start": elapsed, "caption": scene["caption"]})
        vtt.extend([f"{timestamp(elapsed)} --> {timestamp(elapsed + seconds)}", scene["caption"], ""])
        elapsed += seconds
    shots = working / "shots.txt"
    shots.write_text("\n".join(f"file '{file.as_posix()}'" for file in files))
    final = destination / "bruma-walkthrough.mp4"
    run(["-f", "concat", "-safe", "0", "-i", shots, "-c", "copy", "-movflags", "+faststart", final])
    run(["-i", final, "-f", "null", "-"])
    run(["-ss", "5", "-i", final, "-frames:v", "1", "-q:v", "2", destination / "poster.jpg"])
    (destination / "bruma-walkthrough.vtt").write_text("\n".join(vtt))
    content = {"duration": elapsed, "durationLabel": f"{elapsed // 60}:{elapsed % 60:02}", "chapters": chapters}
    feature = ROOT / "src/features/walkthrough"
    feature.mkdir(parents=True, exist_ok=True)
    (feature / "content.json").write_text(json.dumps(content, indent=2) + "\n")
    review = take / "review"
    review.mkdir(exist_ok=True)
    run(["-i", final, "-vf", "fps=1/2,scale=480:270", review / "frame-%03d.jpg"])
    frames = sorted(review.glob("frame-*.jpg"))
    for batch in range(math.ceil(len(frames) / 12)):
        sheet = Image.new("RGB", (1920, 900), BG)
        draw = ImageDraw.Draw(sheet)
        for n, file in enumerate(frames[batch * 12:(batch + 1) * 12]):
            x, y = (n % 4) * 480, (n // 4) * 300
            with Image.open(file) as frame:
                sheet.paste(frame, (x, y))
            draw.text((x + 10, y + 272), timestamp((batch * 12 + n) * 2)[3:8], font=font(18), fill=TEXT)
        sheet.save(review / f"sheet-{batch + 1}.jpg", quality=93)
    report = {"duration": elapsed, "size": [WIDTH, HEIGHT], "fps": FPS, "audio": "none", "fullDecode": "passed",
              "bytes": final.stat().st_size, "sha256": hashlib.sha256(final.read_bytes()).hexdigest(), "origin": manifest["origin"],
              "applicationCommit": manifest["applicationCommit"], "checks": manifest["checks"], "offsets": offsets}
    (take / "render-report.json").write_text(json.dumps(report, indent=2))
    print(json.dumps(report), flush=True)


if __name__ == "__main__":
    take = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(json.loads((ROOT / ".scratch/walkthrough/latest.json").read_text(encoding="utf-8"))["output"])
    render(take.resolve())
