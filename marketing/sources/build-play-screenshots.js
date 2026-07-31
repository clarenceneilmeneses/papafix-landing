#!/usr/bin/env node
/**
 * Builds the Play Console phone-screenshot graphics out of the raw in-app captures.
 *
 * Writes one self-contained HTML per panel into this folder — fonts, app icon and the
 * capture itself are embedded as base64, so each page renders offline and identically —
 * then you screenshot each at 1080 x 1920 (see NOTES.md next to the PNGs).
 *
 *   node build-play-screenshots.js
 *
 * The captures have dead space in them (empty home screens, a long gap above the nav
 * bar). Rather than show it, each panel lists `slices` — bands of the source image, in
 * source pixels — which are stacked back together inside the phone card. Cutting out the
 * middle keeps the content large and drops the emptiness. The first slice always starts
 * below the Android status bar so the clock, battery and data-rate readout never ship.
 */
const fs = require('fs');
const path = require('path');

const { FONTS, THEME, shot, esc, r2, logoLockup, device } = require('./play-shot-common');

const HERE = __dirname;
const DIR = 'screeenshots mobile'; // folder name under googleplaypromo/, sic

const W = 1080;
const H = 1920;
const SRC_W = 1080; // every capture is 1080 x 2400
const STATUS_BAR = 96; // source px of Android status bar, always trimmed
const BEZEL = 17; // device body drawn this far outside the screen on every side

const S = {
  custHome: shot(DIR, 'Screenshot_2026-07-30-21-18-13-524_com.papafix.customer.jpg'),
  custChoose: shot(DIR, 'Screenshot_2026-07-30-21-18-47-541_com.papafix.customer.jpg'),
  custTrack: shot(DIR, 'Screenshot_2026-07-30-21-19-41-747_com.papafix.customer.jpg'),
  custPay: shot(DIR, 'Screenshot_2026-07-30-21-21-38-576_com.papafix.customer.jpg'),
  techJobs: shot(DIR, 'Screenshot_2026-07-30-21-22-32-177_com.papafix.technician.jpg'),
  techHome: shot(DIR, 'Screenshot_2026-07-30-21-24-19-079_com.papafix.technician.jpg'),
  techDetails: shot(DIR, 'Screenshot_2026-07-30-21-24-39-817_com.papafix.technician.jpg'),
  techNav: shot(DIR, '_storage_emulated_0_DCIM_Screenshots_Screenshot_2026-07-30-21-25-05-653_com.papafix.technician.jpg'),
};

/* ---------- the panels ----------------------------------------------------- */
/*
 * layout   'top'    copy above, phone card below
 *          'bottom' phone card flush with the top edge, copy underneath
 * cardW    card width in canvas px; the source is scaled to it
 * cardY    card top in canvas px ('top' layout only; 'bottom' is always 0)
 * slices   [from, to] bands of the source image, stacked in order
 * callouts brand pills laid over the art; `side` is the edge they bleed off
 *
 * Every screen must run off one edge of the canvas. Inside a device frame a screen that
 * floats free reads as a squat tablet, because a cropped screen is nowhere near phone
 * proportions; bleeding off an edge means the eye never gets to judge the ratio. So the
 * slices are sized to land the card exactly on the top or bottom edge — the build warns
 * if they don't.
 */
const PANELS = [
  /* ============================== CUSTOMER ============================== */
  {
    file: 'PapaFix_PLAY_Shot_Customer_1_Book',
    app: 'customer',
    layout: 'top',
    shot: S.custHome,
    logo: true,
    eyebrow: 'Aircon cleaning · repair · install',
    h1: 'Book a verified<br>aircon technician',
    sub: 'Cleaning, repair and installation — all brands, booked from your phone.',
    cardW: 900,
    cardY: 660,
    slices: [[STATUS_BAR, 1338], [2130, 2400]],
    callouts: [{ text: 'Tanauan · Malvar · Sto. Tomas', side: 'right', y: 1430 }],
  },
  {
    file: 'PapaFix_PLAY_Shot_Customer_2_Choose',
    app: 'customer',
    layout: 'top',
    shot: S.custChoose,
    h1: 'Pick your tech, or<br>let us match you',
    sub: 'Browse who is free near you, or tap auto-match and we assign the best one.',
    cardW: 848,
    cardY: 472,
    // The left pill sits on the "or browse manually" divider — the one band of the
    // screen with nothing to hide behind it.
    slices: [[STATUS_BAR, 1640], [2100, 2400]],
    callouts: [
      { text: 'Distance and travel fee,<br>before you book', side: 'left', y: 1015 },
      { text: 'Rebook the tech you liked', side: 'right', y: 1745 },
    ],
  },
  {
    file: 'PapaFix_PLAY_Shot_Customer_3_Track',
    app: 'customer',
    layout: 'bottom',
    shot: S.custTrack,
    h1: 'Track your tech<br>on the way',
    sub: 'Watch them approach in real time, and call them without leaving the app.',
    cardW: 820,
    slices: [[STATUS_BAR, 1300], [1700, 2400]],
    callouts: [{ text: 'Live location while they travel', side: 'left', y: 700 }],
  },
  {
    file: 'PapaFix_PLAY_Shot_Customer_4_Pay',
    app: 'customer',
    layout: 'top',
    shot: S.custPay,
    h1: 'One clear total<br>at the end',
    sub: 'Check the breakdown, then settle in cash or GCash. No surprise charges.',
    cardW: 848,
    cardY: 560,
    slices: [[STATUS_BAR, 1504], [2076, 2400]],
    callouts: [{ text: 'Travel fee shown on the bill', side: 'right', y: 1720 }],
  },

  /* ============================= TECHNICIAN ============================= */
  {
    file: 'PapaFix_PLAY_Shot_Tech_1_Jobs',
    app: 'tech',
    layout: 'top',
    shot: S.techHome,
    logo: true,
    eyebrow: 'For aircon technicians',
    h1: 'Jobs come<br>to you',
    sub: 'New requests land on your home screen the moment a customer books.',
    cardW: 848,
    cardY: 637,
    slices: [[STATUS_BAR, 1460], [2130, 2400]],
    callouts: [{ text: 'Work the hours you choose', side: 'right', y: 1155 }],
  },
  {
    file: 'PapaFix_PLAY_Shot_Tech_2_Accept',
    app: 'tech',
    layout: 'top',
    shot: S.techDetails,
    h1: 'See the whole job<br>before you accept',
    sub: 'Service, unit type, horsepower and address all come with the request.',
    cardW: 848,
    cardY: 480,
    // Starts above the sheet so a strip of the dimmed list behind it shows — that is what
    // the phone actually looks like with the sheet open.
    slices: [[566, 2400]],
    callouts: [{ text: 'Confirm or decline — your call', side: 'left', y: 520 }],
  },
  {
    file: 'PapaFix_PLAY_Shot_Tech_3_Manage',
    app: 'tech',
    layout: 'top',
    shot: S.techJobs,
    h1: 'Every job<br>in one list',
    sub: 'Incoming, active and completed — searchable by customer, issue or address.',
    cardW: 800,
    cardY: 628,
    // Cut the list between two cards, not through one, then rejoin at the nav bar.
    slices: [[STATUS_BAR, 1570], [2130, 2400]],
    callouts: [{ text: 'Your whole job history stays with you', side: 'right', y: 1440 }],
  },
  {
    file: 'PapaFix_PLAY_Shot_Tech_4_Navigate',
    app: 'tech',
    layout: 'bottom',
    shot: S.techNav,
    h1: 'Navigate straight<br>to the customer',
    sub: 'Share your location so they know you are coming, then open the route in Maps.',
    cardW: 760,
    slices: [[STATUS_BAR, 1280], [1500, 2400]],
    callouts: [{ text: 'The customer sees you approaching', side: 'left', y: 620 }],
  },
];

/* ---------- render --------------------------------------------------------- */

function render(p) {
  const t = THEME[p.app];
  const isTop = p.layout === 'top';

  const scale = p.cardW / SRC_W;
  const cardH = p.slices.reduce((a, [f, to]) => a + (to - f) * scale, 0);
  const cardX = (W - p.cardW) / 2;
  const cardY = isTop ? p.cardY : 0;
  // A card flush with an edge keeps square corners there, so it reads as bleeding
  // off the canvas rather than floating in the middle of it.
  const flushBottom = isTop && cardY + cardH >= H - 1;
  const radius = !isTop ? '0 0 46px 46px' : flushBottom ? '46px 46px 0 0' : '46px';
  const deviceRadius = !isTop
    ? `0 0 ${46 + BEZEL}px ${46 + BEZEL}px`
    : flushBottom
      ? `${46 + BEZEL}px ${46 + BEZEL}px 0 0`
      : `${46 + BEZEL}px`;

  const dev = device({
    srcW: SRC_W,
    shot: p.shot,
    slices: p.slices,
    screenW: p.cardW,
    x: cardX,
    y: cardY,
    bezel: BEZEL,
    radius: { screen: radius, body: deviceRadius },
    shadow: t.shadow,
  });

  const lock = p.logo ? `  ${logoLockup(p.app, 118, t.shadow)}\n` : '';

  const callouts = (p.callouts || [])
    .map((c) => `<div class="co ${c.side}" style="top:${c.y}px">${esc(c.text)}</div>`)
    .join('\n');

  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>PapaFix — Play screenshot · ${p.file}</title>
<style>
${FONTS}
*{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased;}
html,body{width:${W}px;height:${H}px;overflow:hidden;}
.stage{width:${W}px;height:${H}px;position:relative;overflow:hidden;
 font-family:'DM Sans',sans-serif;background:${t.bg};}
.bl{position:absolute;border-radius:50%;pointer-events:none;background:${t.glow};}
.b1{width:760px;height:760px;top:-300px;right:-210px;}
.b2{width:540px;height:540px;bottom:-190px;left:-180px;}

.copy{position:absolute;left:72px;right:72px;${
    isTop ? 'top:92px;' : `top:${Math.round(cardH) + 92}px;`
  }text-align:center;}
.lock{display:flex;align-items:center;justify-content:center;gap:22px;margin-bottom:34px;}
.ico{position:relative;display:block;overflow:hidden;flex:none;
 filter:drop-shadow(0 16px 28px ${t.shadow});}
.ico img{position:absolute;display:block;}
.lock b{font-family:'Sora';font-weight:800;font-size:62px;color:#fff;letter-spacing:-.025em;}
.eb{font-weight:800;letter-spacing:.15em;text-transform:uppercase;font-size:25px;
 color:${t.eyebrow};margin-bottom:20px;}
h1{font-family:'Sora';font-weight:800;color:#fff;font-size:78px;line-height:1.05;
 letter-spacing:-.03em;text-shadow:0 8px 26px ${t.shadow};}
.sub{font-weight:600;font-size:33px;line-height:1.34;color:${t.sub};margin-top:26px;}

${dev.css}

.co{position:absolute;background:${t.pill};color:#fff;font-weight:700;font-size:31px;
 line-height:1.26;padding:21px 36px;max-width:700px;
 box-shadow:0 18px 38px -12px rgba(0,0,0,.45);}
.co.left{left:0;border-radius:0 24px 24px 0;}
.co.right{right:0;border-radius:24px 0 0 24px;text-align:right;}

</style></head><body><div class="stage">
 <div class="bl b1"></div><div class="bl b2"></div>
${dev.html}
 <div class="copy">
${lock}${p.eyebrow ? `  <div class="eb">${esc(p.eyebrow)}</div>\n` : ''}  <h1>${p.h1}</h1>
  <p class="sub">${esc(p.sub)}</p>
 </div>
${callouts}
</div></body></html>`;
}

/* ---------- write ---------------------------------------------------------- */

for (const p of PANELS) {
  const scale = p.cardW / SRC_W;
  const cardH = p.slices.reduce((a, [f, to]) => a + (to - f) * scale, 0);
  const bottom = (p.layout === 'top' ? p.cardY : 0) + cardH;
  // 'top' panels must land on the bottom edge; 'bottom' panels already start on the top
  // edge. Either way the device runs off the canvas and never shows its full proportions.
  const off = p.layout === 'top' ? bottom - H : 0;
  if (Math.abs(off) > 2) {
    console.warn(
      `  ! ${p.file}: bottom edge is ${off > 0 ? 'over' : 'short'} by ${Math.abs(Math.round(off))}px` +
        ` — adjust cardY or the last slice`
    );
  }
  fs.writeFileSync(path.join(HERE, `${p.file}.html`), render(p));
  console.log(`wrote ${p.file}.html   card ${p.cardW}x${Math.round(cardH)} @ y${p.cardY || 0}`);
}
console.log(`\n${PANELS.length} panels. Screenshot each at ${W}x${H}.`);
