# Play feature graphic — five options

For **Play Console → Store presence → Main store listing → Feature graphic**, customer app.

Five to choose from. Upload one; the rest are spares.

| File | Look | Best when |
| --- | --- | --- |
| `PapaFix_PLAY_Feature_1_Hero` | Brand orange, app icon, one promise | **Default pick.** Most on-brand, matches the print kit |
| `PapaFix_PLAY_Feature_2_Lockup` | Dark, mascot + big wordmark | Brand recall over explanation; strongest as a thumbnail |
| `PapaFix_PLAY_Feature_3_Benefits` | Light, three benefit cards | Says what the app does without a screenshot |
| `PapaFix_PLAY_Feature_4_Mascot` | Light, icon on an orange disc | Friendliest; the only one safe under a video overlay (see below) |
| `PapaFix_PLAY_Feature_5_CoolAir` | Deep blue, aircon unit + cold air | Leans on the aircon category rather than the brand |

## Specs — all five

- **1024 × 500 px**, exactly.
- **PNG, 24-bit RGB, no alpha channel.** Play's feature graphic slot rejects PNGs carrying
  transparency; these are already flattened, so they upload as-is.
- 77–352 KB each, well inside the 15 MB ceiling.
- No policy-tripping content: no price, no "download now", no ratings or rankings, no store badges,
  no Google Play branding.

## Two things to know before you upload

**If you attach a promo video,** Play draws a play button over the centre of the feature graphic.
Only option **4** keeps its centre clear — the other four have headline text or artwork there that
the button would sit on top of. No video, no overlay, and any of the five is fine.

**Play may crop the graphic** on some surfaces. Everything important is inside a ~58 px margin on
all four sides, so a modest crop won't cut text on any of them.

## Editing

Each `.html` is self-contained — fonts (Sora, DM Sans) and the app icon are embedded as base64, so
they render identically offline. To re-export after an edit, screenshot the HTML at exactly
1024 × 500:

```sh
chrome --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1024,500 --screenshot=out.png PapaFix_PLAY_Feature_1_Hero.html
```

## Not covered

These are the **customer** app only. The technician app has its own blue branding
(`assets/brand/tech-logo.png`) and needs its own feature graphic — ask and it's a quick turnaround
on the same five layouts.
