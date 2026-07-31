# Play tablet screenshots — four per app

For **Play Console → Store presence → Main store listing → Tablet screenshots**. Play has
separate 7-inch and 10-inch slots; **upload the same four files to both** — they are sized
for either.

| # | Customer app (orange) | Technician app (blue) |
| --- | --- | --- |
| 1 | `..._Customer_1_Book` — book a verified tech | `..._Tech_1_Jobs` — jobs come to you |
| 2 | `..._Customer_2_Choose` — pick or auto-match | `..._Tech_2_Accept` — see the job before accepting |
| 3 | `..._Customer_3_Track` — live tracking | `..._Tech_3_Manage` — every job in one list |
| 4 | `..._Customer_4_Pay` — one clear total | `..._Tech_4_Navigate` — navigate to the customer |

Same journey, same copy and same palette as the phone screenshots next to them, so a
listing reads as one set whichever device someone browses on.

## Why landscape, with a portrait tablet in it

The canvas is **1920 × 1080 landscape** — the shape Play asks for on the tablet slots, and
the one that reads as "tablet" at a glance rather than "big phone". The device inside it
stays **portrait**, because that is how the app actually runs; it sits on one side with
the copy beside it, and the side alternates down the set so the strip is not four
identical frames.

The tablet is shown **whole** — all four corners, nothing cropped but the Samsung status
bar and the Android navigation bar. That is the opposite of the phone graphics, which have
to bleed off an edge, and the reason is proportions: a cropped screen in a full device
frame reads as the wrong device, but an uncropped one is honestly the tablet's own shape,
so it can float.

**The app has real empty space on a tablet** — it is a phone layout at tablet width, so
the home and payment screens are mostly background. That is shown as it is. Cropping it
away would misrepresent the layout, and at this size the device is small enough in the
frame that the space reads as roominess. If the app ever gets a proper tablet layout,
re-capture and rebuild; nothing here needs redesigning for it.

## What is real and what is dressing

The screens are **untouched app UI** from a 28 Jul 2026 build. Everything outside the
device — background, headline, subhead, the callout pill — is marketing chrome. The
technician set makes no earnings claim, same rule as everywhere else in this folder.

Three things to know before uploading:

- **`Customer_2` says "Available for Plumbing near you."** That is what the capture shows.
  Against an aircon-first listing it reads oddly — worth re-capturing an Appliances
  booking before you upload, since it is the one panel where a shopper sees another trade
  named in the app itself.
- **Sample data is visible**: `Kris`, `Sample Tech`, `Francis Anciado`, `Rai Taan`,
  `Hanna C`, and a placeholder phone number `09123456789` on `Tech_2`. Seeded test
  accounts, but the fake number is the one most worth changing.
- `Customer_4` shows a ₱600 service fee. That is in-app UI, not a marketing price claim,
  so it is fine — but it does set an expectation.

## Specs

- **1920 × 1080 px**, exactly — 16:9, the ratio Play asks for, at well over the 1080 px
  minimum side.
- PNG, 24-bit RGB, no alpha. 650 KB–1.0 MB each, far inside the 8 MB ceiling.
- Status bar and navigation bar cropped off every capture, so no clock, battery percentage
  or system buttons ship.
- No store badges, no ratings, no Google Play branding.

## Editing

`../sources/build-play-tablet-screenshots.js` generates all eight HTML pages; each is
self-contained (fonts, icon and the capture embedded as base64). Copy, side, slices and
the callout live in the `PANELS` array at the top of that file.

```sh
cd ../sources
node build-play-tablet-screenshots.js   # regenerate the HTML
sh export-play-tablet-screenshots.sh    # re-export all eight PNGs into this folder
```

The device frame, palettes, fonts and icon crops are shared with the phone builder in
`../sources/play-shot-common.js` — change the brand there and both sets follow.

If you re-capture the app, check `STATUS_BAR` and `SYS_NAV` at the top of the builder:
they are measured against these specific 1200 × 1920 Samsung captures.

## See also

- `PapaFix_PLAY_Screenshot_NOTES.md` — the same, for the eight phone screenshots
- `PapaFix_PLAY_Feature_NOTES.md` — the six feature graphics
