#!/usr/bin/env node
/**
 * Builds the Play Console TABLET screenshot graphics from the raw in-app captures in
 * googleplaypromo/screenshots tablet/ (Samsung, 1200 x 1920 portrait).
 *
 *   node build-play-tablet-screenshots.js
 *   sh export-play-tablet-screenshots.sh
 *
 * Canvas is 1920 x 1080 — 16:9 landscape, which is what Play asks for on the tablet
 * slots and what reads as "tablet" at a glance. The device itself stays portrait,
 * because that is how the app actually runs; it sits on one side with the copy beside
 * it, and the side alternates down the set so the strip is not four identical frames.
 *
 * Unlike the phone graphics, the tablet is shown WHOLE — all four corners, nothing
 * cropped but the Android status and navigation bars. The app has real empty space on a
 * tablet and cropping it away would misrepresent the layout; at this size the device is
 * small enough in the frame that the space reads as roominess rather than emptiness.
 * Showing the whole device also keeps its proportions honest, which is what lets it
 * float here when the phone graphics had to bleed off an edge.
 */
const fs = require('fs');
const path = require('path');

const { FONTS, THEME, shot, esc, r2, logoLockup, device } = require('./play-shot-common');

const HERE = __dirname;
const DIR = 'screenshots tablet';

const W = 1920;
const H = 1080;
const SRC_W = 1200; // every tablet capture is 1200 x 1920
const STATUS_BAR = 44; // source px of the Samsung status bar, always trimmed
const SYS_NAV = 1845; // source px where the Android navigation bar starts, always trimmed
const BEZEL = 20; // device body drawn this far outside the screen on every side
const MARGIN = 88; // gap from the canvas edge to the device body

const S = {
  custHome: shot(DIR, 'Screenshot_20260728-005546_PapaFix.jpg'),
  custChoose: shot(DIR, 'Screenshot_20260728-005619_PapaFix.jpg'),
  custTrack: shot(DIR, 'Screenshot_20260728-005708_PapaFix.jpg'),
  custPay: shot(DIR, 'Screenshot_20260728-005851_PapaFix.jpg'),
  techHome: shot(DIR, 'Screenshot_20260728-010642_PapaFix - Technician.jpg'),
  techDetails: shot(DIR, 'Screenshot_20260728-010716_PapaFix - Technician.jpg'),
  techNav: shot(DIR, 'Screenshot_20260728-010835_PapaFix - Technician.jpg'),
  techJobs: shot(DIR, 'Screenshot_20260728-010913_PapaFix - Technician.jpg'),
};

const FULL = [[STATUS_BAR, SYS_NAV]]; // the whole screen, system bars trimmed

/* ---------- the panels ----------------------------------------------------- */
/*
 * side     which half of the canvas the device sits in; copy takes the other
 * slices   [from, to] bands of the source, stacked — normally just FULL
 * callout  one brand pill, bleeding off the canvas edge on the device's side
 */
const PANELS = [
  /* ============================== CUSTOMER ============================== */
  {
    file: 'PapaFix_PLAY_Tablet_Customer_1_Book',
    app: 'customer',
    side: 'right',
    shot: S.custHome,
    slices: FULL,
    logo: true,
    eyebrow: 'Aircon cleaning · repair · install',
    h1: 'Book a verified<br>aircon technician',
    sub: 'Cleaning, repair and installation — all brands, booked in a few taps.',
    callout: { text: 'Tanauan · Malvar · Sto. Tomas', y: 872 },
  },
  {
    file: 'PapaFix_PLAY_Tablet_Customer_2_Choose',
    app: 'customer',
    side: 'left',
    shot: S.custChoose,
    slices: FULL,
    h1: 'Pick your tech, or<br>let us match you',
    sub: 'Browse who is free near you, or tap auto-match and we assign the best one.',
    // Below the tech card, not across it — that card is the only content on this screen.
    callout: { text: 'Distance and travel fee, before you book', y: 560 },
  },
  {
    file: 'PapaFix_PLAY_Tablet_Customer_3_Track',
    app: 'customer',
    side: 'right',
    shot: S.custTrack,
    slices: FULL,
    h1: 'Track your tech<br>on the way',
    sub: 'Watch them approach in real time, and call them without leaving the app.',
    callout: { text: 'Live location while they travel', y: 430 },
  },
  {
    file: 'PapaFix_PLAY_Tablet_Customer_4_Pay',
    app: 'customer',
    side: 'left',
    shot: S.custPay,
    slices: FULL,
    h1: 'One clear total<br>at the end',
    sub: 'Check the breakdown, then settle up. No surprise charges at the door.',
    // Clear of the summary rows — this pill points at the travel fee line, so covering it
    // would be a bad joke.
    callout: { text: 'Travel fee shown on the bill', y: 560 },
  },

  /* ============================= TECHNICIAN ============================= */
  {
    file: 'PapaFix_PLAY_Tablet_Tech_1_Jobs',
    app: 'tech',
    side: 'right',
    shot: S.techHome,
    slices: FULL,
    logo: true,
    eyebrow: 'For aircon technicians',
    h1: 'Jobs come<br>to you',
    sub: 'New requests land on your home screen the moment a customer books.',
    callout: { text: 'Work the hours you choose', y: 500 },
  },
  {
    file: 'PapaFix_PLAY_Tablet_Tech_2_Accept',
    app: 'tech',
    side: 'left',
    shot: S.techDetails,
    // Stop just above the sheet's own buttons: in this capture the Android navigation
    // bar is drawn over them, so the last 20-odd source px are half a covered button.
    slices: [[STATUS_BAR, 1822]],
    h1: 'See the whole job<br>before you accept',
    sub: 'Service, unit type, horsepower and address all come with the request.',
    callout: { text: 'Confirm or decline — your call', y: 430 },
  },
  {
    file: 'PapaFix_PLAY_Tablet_Tech_3_Manage',
    app: 'tech',
    side: 'right',
    shot: S.techJobs,
    slices: FULL,
    h1: 'Every job<br>in one list',
    sub: 'Incoming, active and completed — searchable by customer, issue or address.',
    callout: { text: 'Your whole job history stays with you', y: 800 },
  },
  {
    file: 'PapaFix_PLAY_Tablet_Tech_4_Navigate',
    app: 'tech',
    side: 'left',
    shot: S.techNav,
    slices: FULL,
    h1: 'Navigate straight<br>to the customer',
    sub: 'Share your location so they know you are coming, then open the route in Maps.',
    callout: { text: 'The customer sees you approaching', y: 250 },
  },
];

/* ---------- geometry ------------------------------------------------------- */

const SCREEN_W = 630; // device screen width on the canvas — as large as 1080 tall allows
const SCALE = SCREEN_W / SRC_W;
const BODY_W = SCREEN_W + BEZEL * 2;

/* ---------- render --------------------------------------------------------- */

function render(p) {
  const t = THEME[p.app];
  const onRight = p.side === 'right';

  const screenH = p.slices.reduce((a, [f, to]) => a + (to - f) * SCALE, 0);
  const bodyX = onRight ? W - MARGIN - BODY_W : MARGIN;
  const bodyY = (H - (screenH + BEZEL * 2)) / 2;

  const dev = device({
    srcW: SRC_W,
    shot: p.shot,
    slices: p.slices,
    screenW: SCREEN_W,
    x: bodyX + BEZEL,
    y: bodyY + BEZEL,
    bezel: BEZEL,
    radius: { screen: '22px', body: `${22 + BEZEL}px` },
    shadow: t.shadow,
  });

  // Copy fills the other half, with the same margin off its own edge.
  const copyW = W - BODY_W - MARGIN * 2 - 110;
  const copyX = onRight ? MARGIN + 22 : W - MARGIN - 22 - copyW;

  const lock = p.logo ? `  ${logoLockup(p.app, 100, t.shadow)}\n` : '';

  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>PapaFix — Play tablet screenshot · ${p.file}</title>
<style>
${FONTS}
*{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased;}
html,body{width:${W}px;height:${H}px;overflow:hidden;}
.stage{width:${W}px;height:${H}px;position:relative;overflow:hidden;
 font-family:'DM Sans',sans-serif;background:${t.bg};}
.bl{position:absolute;border-radius:50%;pointer-events:none;background:${t.glow};}
.b1{width:820px;height:820px;top:-330px;${onRight ? 'left' : 'right'}:-260px;}
.b2{width:560px;height:560px;bottom:-230px;${onRight ? 'right' : 'left'}:-140px;}

.copy{position:absolute;left:${r2(copyX)}px;width:${r2(copyW)}px;
 top:50%;transform:translateY(-50%);}
.lock{display:flex;align-items:center;gap:20px;margin-bottom:30px;}
.ico{position:relative;display:block;overflow:hidden;flex:none;
 filter:drop-shadow(0 14px 26px ${t.shadow});}
.ico img{position:absolute;display:block;}
.lock b{font-family:'Sora';font-weight:800;font-size:54px;color:#fff;letter-spacing:-.025em;}
.eb{font-weight:800;letter-spacing:.15em;text-transform:uppercase;font-size:23px;
 color:${t.eyebrow};margin-bottom:18px;}
h1{font-family:'Sora';font-weight:800;color:#fff;font-size:70px;line-height:1.05;
 letter-spacing:-.03em;text-shadow:0 8px 26px ${t.shadow};}
.sub{font-weight:600;font-size:30px;line-height:1.36;color:${t.sub};margin-top:24px;}

${dev.css}

/* One pill, bleeding off the canvas edge behind the device. */
.co{position:absolute;background:${t.pill};color:#fff;font-weight:700;font-size:28px;
 line-height:1.26;padding:19px 34px;max-width:640px;
 box-shadow:0 18px 38px -12px rgba(0,0,0,.45);
 ${onRight ? 'right:0;border-radius:22px 0 0 22px;text-align:right;' : 'left:0;border-radius:0 22px 22px 0;'}}
</style></head><body><div class="stage">
 <div class="bl b1"></div><div class="bl b2"></div>
${dev.html}
 <div class="copy">
${lock}${p.eyebrow ? `  <div class="eb">${esc(p.eyebrow)}</div>\n` : ''}  <h1>${p.h1}</h1>
  <p class="sub">${esc(p.sub)}</p>
 </div>
 <div class="co" style="top:${p.callout.y}px">${esc(p.callout.text)}</div>
</div></body></html>`;
}

/* ---------- write ---------------------------------------------------------- */

for (const p of PANELS) {
  const screenH = p.slices.reduce((a, [f, to]) => a + (to - f) * SCALE, 0);
  if (screenH + BEZEL * 2 > H - 24) {
    console.warn(`  ! ${p.file}: device is taller than the canvas — drop SCREEN_W`);
  }
  fs.writeFileSync(path.join(HERE, `${p.file}.html`), render(p));
  console.log(`wrote ${p.file}.html   screen ${SCREEN_W}x${Math.round(screenH)}, device ${p.side}`);
}
console.log(`\n${PANELS.length} panels. Screenshot each at ${W}x${H}.`);
