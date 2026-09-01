"""Process admissions hero campus background — premium cinematic style."""
import os
import numpy as np
import cv2
from PIL import Image

SRC = r"c:\xampp\htdocs\ISRA-Foundation-School\assets\images\admissions-hero-source.jpg"
OUT_DIR = r"c:\xampp\htdocs\ISRA-Foundation-School\assets\images"

os.makedirs(OUT_DIR, exist_ok=True)

img_bgr = cv2.imread(SRC)
h, w = img_bgr.shape[:2]

# --- Color grade helper ---
def warm_grade(bgr: np.ndarray) -> np.ndarray:
    rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB).astype(np.float32) / 255.0
    rgb = np.power(rgb, 0.94)
    rgb[:, :, 0] = np.clip(rgb[:, :, 0] * 1.06, 0, 1)
    rgb[:, :, 1] = np.clip(rgb[:, :, 1] * 1.03, 0, 1)
    rgb[:, :, 2] = np.clip(rgb[:, :, 2] * 0.91, 0, 1)
    hsv = cv2.cvtColor((rgb * 255).astype(np.uint8), cv2.COLOR_RGB2HSV).astype(np.float32)
    hsv[:, :, 1] = np.clip(hsv[:, :, 1] * 1.18, 0, 255)
    hsv[:, :, 2] = np.clip(hsv[:, :, 2] * 1.04, 0, 255)
    rgb = cv2.cvtColor(hsv.astype(np.uint8), cv2.COLOR_HSV2RGB).astype(np.float32) / 255.0
    rgb = np.clip((rgb - 0.5) * 1.08 + 0.5, 0, 1)
    return cv2.cvtColor((rgb * 255).astype(np.uint8), cv2.COLOR_RGB2BGR)


def depth_bokeh(bgr: np.ndarray, focal=(0.58, 0.42), strength: float = 1.0) -> np.ndarray:
  """Variable blur: sharp near focal point, soft bokeh toward edges/depth."""
  hh, ww = bgr.shape[:2]
  yy, xx = np.mgrid[0:hh, 0:ww].astype(np.float32)
  fx, fy = focal[0] * ww, focal[1] * hh
  dist = np.sqrt(((xx - fx) / ww) ** 2 + ((yy - fy) / hh) ** 2)
  depth = np.clip(dist * 1.1, 0, 1)

  light = cv2.GaussianBlur(bgr, (0, 0), 4)
  medium = cv2.GaussianBlur(bgr, (0, 0), 12)
  heavy = cv2.GaussianBlur(bgr, (0, 0), 22)

  out = bgr.astype(np.float32)
  m1 = np.clip(depth * 2.2, 0, 1) * strength
  m2 = np.clip((depth - 0.25) * 2.0, 0, 1) * strength
  out = out * (1 - m1[..., None]) + light.astype(np.float32) * m1[..., None]
  out = out * (1 - m2[..., None] * 0.5) + medium.astype(np.float32) * (m2[..., None] * 0.5)
  m3 = np.clip((depth - 0.5) * 1.8, 0, 1) * strength
  out = out * (1 - m3[..., None]) + heavy.astype(np.float32) * m3[..., None]
  return np.clip(out, 0, 255).astype(np.uint8)


# --- Build clean campus plate (remove student via inpaint) ---
mask = np.zeros((h, w), np.uint8)
pts = np.array(
    [
        [int(w * 0.42), h],
        [int(w * 0.40), int(h * 0.22)],
        [int(w * 0.78), int(h * 0.05)],
        [w, int(h * 0.30)],
        [w, h],
    ],
    np.int32,
)
cv2.fillPoly(mask, [pts], 255)
mask = cv2.GaussianBlur(mask, (0, 0), 18)
mask_bin = (mask > 50).astype(np.uint8) * 255

base = depth_bokeh(img_bgr, focal=(0.35, 0.45), strength=0.85)
base = warm_grade(base)
inpainted = cv2.inpaint(base, mask_bin, 8, cv2.INPAINT_TELEA)
alpha = (mask.astype(np.float32) / 255.0)[..., None]
campus = (base.astype(np.float32) * (1 - alpha) + inpainted.astype(np.float32) * alpha).astype(np.uint8)

# --- Compose 16:9 canvas (1920x1080) ---
target_w, target_h = 1920, 1080

# Wider crop: emphasize colonnade + grass, student area inpainted
crop = campus[:, : int(w * 0.92)]
ch, cw = crop.shape[:2]

scale = target_h / ch
scaled_w = int(cw * scale)
scaled = cv2.resize(crop, (scaled_w, target_h), interpolation=cv2.INTER_LANCZOS4)

if scaled_w < target_w:
    pad = target_w - scaled_w
    # Reflect grass/building edge for natural left extension
    strip = scaled[:, : min(280, scaled_w // 3)]
    strip = cv2.flip(strip, 1)
    ext = cv2.resize(strip, (pad, target_h), interpolation=cv2.INTER_LANCZOS4)
    ext = cv2.GaussianBlur(ext, (0, 0), 3)
    canvas = np.hstack([ext, scaled])
else:
    canvas = scaled[:, scaled_w - target_w :]

canvas = cv2.resize(canvas, (target_w, target_h), interpolation=cv2.INTER_LANCZOS4)

# Gentle left gradient (reference-style text zone)
grad = np.linspace(0.48, 0.0, target_w, dtype=np.float32)
grad = np.tile(grad, (target_h, 1))
overlay = np.zeros_like(canvas, dtype=np.float32)
overlay[:] = [22, 32, 48]
canvas = (
    canvas.astype(np.float32) * (1 - grad[..., None] * 0.62)
    + overlay * (grad[..., None] * 0.62)
).astype(np.uint8)

# Soft vignette
vy, vx = np.mgrid[0:target_h, 0:target_w].astype(np.float32)
vig = 1 - np.clip(np.sqrt(((vx - target_w * 0.6) / target_w) ** 2 + ((vy - target_h * 0.5) / target_h) ** 2) * 0.75, 0, 0.18)
canvas = np.clip(canvas.astype(np.float32) * vig[..., None], 0, 255).astype(np.uint8)

# Mild clarity on building (right side)
clarity_mask = np.linspace(0, 1, target_w, dtype=np.float32)
clarity_mask = np.tile(clarity_mask, (target_h, 1))
blur = cv2.GaussianBlur(canvas, (0, 0), 1.5)
canvas = np.clip(
    canvas.astype(np.float32) + (canvas.astype(np.float32) - blur.astype(np.float32)) * clarity_mask[..., None] * 0.35,
    0,
    255,
).astype(np.uint8)

# Trim harsh right-edge pillar artifact
trim = int(target_w * 0.03)
canvas = canvas[:, : target_w - trim]
canvas = cv2.resize(canvas, (target_w, target_h), interpolation=cv2.INTER_LANCZOS4)

# --- Graded student photo for right column ---
student = depth_bokeh(img_bgr, focal=(0.62, 0.38), strength=0.7)
student = warm_grade(student)

# Remove watermark
wm = np.zeros((h, w), np.uint8)
cv2.rectangle(wm, (0, int(h * 0.87)), (int(w * 0.42), h), 255, -1)
wm = cv2.GaussianBlur(wm, (0, 0), 6)
student = cv2.inpaint(student, (wm > 70).astype(np.uint8) * 255, 4, cv2.INPAINT_TELEA)

# --- Full hero composite: campus bg + student on right (reference layout) ---
sm = np.zeros((h, w), np.float32)
sm[:, int(w * 0.28) :] = 1.0
sm = cv2.GaussianBlur(sm, (0, 0), 35)
student_layer = cv2.resize(student, (int(target_w * 0.52), target_h), interpolation=cv2.INTER_LANCZOS4)
sm_layer = cv2.resize((sm * 255).astype(np.uint8), (int(target_w * 0.52), target_h), interpolation=cv2.INTER_LANCZOS4)
sm_layer = sm_layer.astype(np.float32) / 255.0

full = canvas.copy()
x_off = target_w - student_layer.shape[1]
roi = full[:, x_off : x_off + student_layer.shape[1]]
blend = (
    roi.astype(np.float32) * (1 - sm_layer[..., None]) + student_layer.astype(np.float32) * sm_layer[..., None]
).astype(np.uint8)
full[:, x_off : x_off + student_layer.shape[1]] = blend

out_bg = os.path.join(OUT_DIR, "admissions-hero-bg.jpg")
out_student = os.path.join(OUT_DIR, "admissions-hero-student.jpg")
out_full = os.path.join(OUT_DIR, "admissions-hero-full.jpg")

Image.fromarray(cv2.cvtColor(canvas, cv2.COLOR_BGR2RGB)).save(out_bg, quality=93, optimize=True, subsampling=0)
Image.fromarray(cv2.cvtColor(student, cv2.COLOR_BGR2RGB)).save(out_student, quality=93, optimize=True, subsampling=0)
Image.fromarray(cv2.cvtColor(full, cv2.COLOR_BGR2RGB)).save(out_full, quality=93, optimize=True, subsampling=0)

print("Saved:", out_bg, out_student, out_full)
