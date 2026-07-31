# Play phone screenshots — four per app

For **Play Console → Store presence → Main store listing → Phone screenshots**.

Play wants at least 4 and takes up to 8. There are exactly 4 per app, in the order they
should be uploaded — each one carries the next step of the journey, so someone swiping
through the strip sees the whole flow without reading a word of the description.

| # | Customer app (orange) | Technician app (blue) |
| --- | --- | --- |
| 1 | `..._Customer_1_Book` — book a verified tech | `..._Tech_1_Jobs` — jobs come to you |
| 2 | `..._Customer_2_Choose` — pick or auto-match | `..._Tech_2_Accept` — see the job before accepting |
| 3 | `..._Customer_3_Track` — live tracking | `..._Tech_3_Manage` — every job in one list |
| 4 | `..._Customer_4_Pay` — one clear total | `..._Tech_4_Navigate` — navigate to the customer |

Palettes match the feature graphics in this folder, so each listing reads as one set.
Panel 1 of each app is the only one carrying the icon and wordmark; the rest lead with
the headline, which is what a swiper actually reads.

## The device frame

Each screen sits in a drawn Android body — dark bezel, rounded corners, volume rocker and
power key on the right edge. It is CSS, not an image, so it costs nothing and never goes
out of date.

**Every device runs off the top or bottom edge of the canvas, and must keep doing so.** A
device floating free inside the frame reads as a squat tablet, because a cropped screen is
nowhere near phone proportions; bleeding off an edge means the eye never gets to judge the
ratio. `build-play-screenshots.js` warns if a panel's slices no longer land on the edge.

There is no punch-hole camera. Adding one means inventing a status bar to put it in, and a
fake status bar is both more work and less honest than none.

**There are no hands holding the phones.** The reference set this was modelled on uses
photographed hands; there is no licensed hand photo in this repo and a drawn one looked
bad enough to hurt the listing. If you want them, the cheap route is a photo: hold the
phone against a plain wall, screen blank and bright, shot square-on — the screenshot can
then be composited into it and these graphics rebuilt around it.

## What is real and what is dressing

The phone content is **untouched app UI** — real screens from a 30 Jul 2026 build, not
mockups. Everything outside the phone card (background, headline, subhead, the callout
pills) is marketing chrome. Nothing in the copy claims a feature the screenshots do not
show, which is the line Play enforces.

**The technician set makes no earnings claim**, same rule as the feature graphics: no
pesos, no "earn up to". Keep it that way unless you have numbers you can defend.

Two things a reviewer might notice, both true to the build:

- The sample data says `Sample Tech`, `Rai Taan`, `Kris`. Real seeded test accounts.
  Worth re-capturing with more natural names before launch, but not a blocker.
- The customer home screen lists `Appliances · Electrical · Plumbing`, and the technician
  job list shows plumbing jobs. The rest of the marketing kit is aircon-first. If the
  store listing says aircon-only, these two panels contradict it — either widen the
  listing copy or re-capture once the app hides the other trades.

## Specs

- **1080 × 1920 px**, exactly — 9:16, which is the ratio Play asks for, at its minimum
  side length. Tall 2:1-ish crops (the 1242 × 2688 shape you often see) are outside the
  documented range and can bounce.
- PNG, 24-bit RGB, no alpha. 540–975 KB each, far inside the 8 MB ceiling.
- The Android status bar is cropped off every capture, so no clock, battery percentage or
  data-rate readout ships.
- No store badges, no prices, no ratings, no Google Play branding.

## Editing

`../sources/build-play-screenshots.js` generates all eight HTML pages; each is
self-contained (fonts, icon and the capture are embedded as base64). Copy, geometry,
slices and callout placement live in the `PANELS` array at the top of that file — that is
the only place to edit.

```sh
cd ../sources
node build-play-screenshots.js   # regenerate the HTML
sh export-play-screenshots.sh    # re-export all eight PNGs into this folder
```

The export script needs absolute paths for Chrome; a relative `--screenshot=` path
silently writes nothing, which is why it is a script and not a one-liner.

The device frame, palettes, fonts and icon crops are shared with the tablet builder in
`../sources/play-shot-common.js` — change the brand there and both sets follow.

### The `slices` trick

The raw captures have dead space — an almost-empty customer home screen, a long gap above
the nav bar. Each panel lists `slices`, bands of the source image in source pixels, which
are stacked back together inside the phone card. Cutting the middle out keeps the content
large and drops the emptiness; because the app background is flat, the joins are
invisible. The first slice always starts at 96 px, below the status bar.

If you re-capture the app, the slice numbers will need re-checking — they are measured
against the specific 1080 × 2400 captures in `googleplaypromo/screeenshots mobile/`.

## See also

- `PapaFix_PLAY_Tablet_NOTES.md` — the same, for the eight tablet screenshots
