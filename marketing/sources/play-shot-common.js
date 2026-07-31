/**
 * Shared parts of the Play Store screenshot builders (phone and tablet).
 *
 * Both sets have to look like one product: same two brand gradients as the feature
 * graphics, same embedded fonts, same drawn Android device. Only the canvas and the
 * arrangement differ, so everything below lives here and the two build scripts just
 * lay it out.
 */
const fs = require('fs');
const path = require('path');

const HERE = __dirname;
const ROOT = path.resolve(HERE, '..', '..');

/* ---------- embedded assets ------------------------------------------------ */

// Reuse the exact Sora + DM Sans faces already embedded in the feature graphics, so
// nothing here needs a network or an installed font to render.
const FONTS = fs
  .readFileSync(path.join(HERE, 'PapaFix_PLAY_Feature_Customer_1_Hero.html'), 'utf8')
  .split('\n')
  .filter((l) => l.startsWith('@font-face'))
  .join('\n');

const b64 = (p) => fs.readFileSync(p).toString('base64');
const png = (p) => `data:image/png;base64,${b64(p)}`;
const jpg = (p) => `data:image/jpeg;base64,${b64(p)}`;

/** A capture, by folder name under googleplaypromo/ and filename. */
const shot = (dir, file) => jpg(path.join(ROOT, 'googleplaypromo', dir, file));

// Both logo PNGs sit on a transparent margin. `x/y/w/h` is the tight box round the
// artwork in each file's own pixels — the same crop the feature graphics use.
const LOGO = {
  customer: {
    src: png(path.join(ROOT, 'assets/brand/app-logo-480.png')),
    nat: 480, x: 107, y: 96, w: 266, h: 288,
  },
  tech: {
    src: png(path.join(ROOT, 'assets/brand/tech-logo-360.png')),
    nat: 360, x: 78, y: 69.8, w: 204, h: 219.5,
  },
};

/* ---------- palettes ------------------------------------------------------- */

const THEME = {
  customer: {
    bg: 'linear-gradient(155deg,#f7852f,#e15410 52%,#b93c07)',
    eyebrow: '#ffdcc7',
    sub: '#ffe9db',
    pill: 'rgba(140,42,4,.94)',
    glow: 'rgba(255,255,255,.09)',
    shadow: 'rgba(96,30,0,.5)',
  },
  tech: {
    bg: 'linear-gradient(155deg,#4f8ade,#2a5fc6 52%,#17357f)',
    eyebrow: '#cfe0fa',
    sub: '#dceafd',
    pill: 'rgba(16,42,105,.94)',
    glow: 'rgba(255,255,255,.10)',
    shadow: 'rgba(8,28,80,.55)',
  },
};

/* ---------- helpers -------------------------------------------------------- */

/** Escape a bare ampersand, leaving existing entities alone. */
const esc = (s) => s.replace(/&(?![a-z#])/g, '&amp;');
const r2 = (n) => Math.round(n * 100) / 100;

/** App icon cropped out of its transparent margin, beside the wordmark. */
function logoLockup(app, h, shadow) {
  const L = LOGO[app];
  const k = h / L.h;
  return (
    `<div class="lock"><span class="ico" style="width:${r2((L.w / L.h) * h)}px;height:${h}px">` +
    `<img src="${L.src}" style="width:${r2(L.nat * k)}px;left:${r2(-L.x * k)}px;` +
    `top:${r2(-L.y * k)}px"></span><b>PapaFix</b></div>`
  );
}

/**
 * The drawn Android device: dark body, thin bezel, volume rocker and power key on the
 * right edge. `slices` are [from, to] bands of the source capture in source pixels,
 * stacked back together inside the screen — that is how dead space (empty screens, the
 * gap above a nav bar) gets cut out without shrinking the content.
 *
 * Returns the CSS and the markup; the caller drops them into its own template.
 */
function device({ srcW, shot: src, slices, screenW, x, y, bezel, radius, shadow }) {
  const scale = screenW / srcW;
  const screenH = slices.reduce((a, [f, t]) => a + (t - f) * scale, 0);
  const bands = slices
    .map(
      ([from, to]) =>
        `   <div class="bnd" style="height:${r2((to - from) * scale)}px">` +
        `<img src="${src}" style="top:${r2(-from * scale)}px"></div>`
    )
    .join('\n');

  const css = `/* The body sits BEZEL px outside the screen on every side, so adding the
   frame never changes how big the app content is drawn. */
.device{position:absolute;left:${r2(x - bezel)}px;top:${r2(y - bezel)}px;
 width:${r2(screenW + bezel * 2)}px;height:${r2(screenH + bezel * 2)}px;
 border-radius:${radius.body};background:linear-gradient(150deg,#2b3240,#12161f 42%,#080b11);
 box-shadow:0 40px 80px -22px ${shadow},0 0 0 1.5px rgba(255,255,255,.16),
  inset 0 2px 3px rgba(255,255,255,.22),inset 0 -2px 3px rgba(0,0,0,.5);}
/* Volume rocker and power key, as a proportion of body height. */
.btn{position:absolute;left:100%;width:5px;background:linear-gradient(180deg,#39414f,#171c26);
 border-radius:0 4px 4px 0;}
.card{position:absolute;left:${bezel}px;top:${bezel}px;width:${screenW}px;
 height:${r2(screenH)}px;overflow:hidden;border-radius:${radius.screen};background:#f4f4f4;}
.bnd{position:relative;overflow:hidden;width:100%;}
.bnd img{position:absolute;left:0;width:${screenW}px;display:block;}`;

  const html = ` <div class="device">
  <div class="btn" style="top:${r2(screenH * 0.2)}px;height:${r2(screenH * 0.05)}px"></div>
  <div class="btn" style="top:${r2(screenH * 0.31)}px;height:${r2(screenH * 0.086)}px"></div>
  <div class="card">
${bands}
  </div>
 </div>`;

  return { css, html, screenH, scale };
}

module.exports = { ROOT, FONTS, png, jpg, shot, LOGO, THEME, esc, r2, logoLockup, device };
