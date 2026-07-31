# Play feature graphics — three per app

For **Play Console → Store presence → Main store listing → Feature graphic**. The phone
screenshots for the same listings are in `PapaFix_PLAY_Screenshot_NOTES.md`.

Play shows **one** feature graphic per listing, so upload one per app and keep the other two as
spares — they're also the right shape for social posts and the website header.

Both apps run the same three layouts, so the customer and technician listings read as one product.
Only the palette and the copy differ: the customer app is orange, the technician app is blue
(`assets/brand/tech-logo.png`).

| Layout | Look | Best when |
| --- | --- | --- |
| `..._1_Hero` | Brand colour, app icon, one promise | **Default pick.** Most on-brand, matches the print kit |
| `..._2_Lockup` | Dark, mascot + big wordmark | Brand recall over explanation; strongest as a thumbnail |
| `..._3_Benefits` | Light, three benefit cards | Says what the app does without a screenshot |

| Customer app (orange) | Technician app (blue) |
| --- | --- |
| `PapaFix_PLAY_Feature_Customer_1_Hero` | `PapaFix_PLAY_Feature_Tech_1_Hero` |
| `PapaFix_PLAY_Feature_Customer_2_Lockup` | `PapaFix_PLAY_Feature_Tech_2_Lockup` |
| `PapaFix_PLAY_Feature_Customer_3_Benefits` | `PapaFix_PLAY_Feature_Tech_3_Benefits` |

## Copy — what each side claims

The customer graphics promise verified technicians, upfront pricing and live tracking. The
technician graphics promise jobs nearby, your own schedule, and fees shown before you accept —
all of which match the behaviour in `docs/papafix-privacy-and-deletion-spec.md`.

**The technician set makes no earnings claim on purpose.** No pesos, no "earn up to", no income
figures — Play requires those to be substantiated, and they're the usual reason a gig-work listing
gets pulled. Keep it that way unless you have numbers you can defend.

## Specs — all six

- **1024 × 500 px**, exactly.
- **PNG, 24-bit RGB, no alpha channel.** Play's feature graphic slot rejects PNGs carrying
  transparency; these are already flattened, so they upload as-is.
- 73–360 KB each, well inside the 15 MB ceiling.
- No policy-tripping content: no price, no "download now", no ratings or rankings, no store badges,
  no Google Play branding.

## Two things to know before you upload

**If you attach a promo video,** Play draws a play button over the centre of the feature graphic.
The Benefits layout is the only one that keeps its centre clear — Hero and Lockup have headline
text or the icon there, and the button would sit on top. No video, no overlay, and all six are
fine.

**Play may crop the graphic** on some surfaces. Everything important is inside a ~58 px margin on
all four sides, so a modest crop won't cut text on any of them.

## Editing

Each `.html` in `../sources/` is self-contained — fonts (Sora, DM Sans) and the app icon are
embedded as base64, so they render identically offline. To re-export after an edit, screenshot the
HTML at exactly 1024 × 500, then flatten the alpha out (Chrome's screenshot is RGBA and Play will
reject it):

```sh
chrome --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1024,500 --screenshot=out.png PapaFix_PLAY_Feature_Tech_1_Hero.html
```

## History

Files were renamed on 2026-07-29 to the `Customer_` / `Tech_` scheme above; the old customer
spares (Mascot, CoolAir) were cut the same day and are recoverable from commit `a3d7525`.
