# PapaFix marketing assets

Everything is **aircon-first**: cleaning, repair, installation, all brands. Other trades appear only
as "coming soon". Every QR code is real and points at `https://www.papafixph.com/` (the waitlist).

Open a folder, send the `.png` to the printer. Nothing here needs editing to be usable.

## Folders

| Folder | What's in it |
| --- | --- |
| `print-now/` | Pre-launch pieces. Safe to print today — waitlist CTA, no Play badge |
| `technician/` | Technician recruitment. Also safe to print today |
| `hold-until-launch/` | **Do not print yet.** These carry a Google Play badge and say the app is live |
| `play-store/` | Play Console feature graphics — screen only, see its own `NOTES.md` |
| `social/` | Facebook / Instagram square — screen only |
| `sources/` | The editable HTML behind every PNG, same filename. See *Editing* below |

## print-now/

| File | Size | Piece |
| --- | --- | --- |
| `PapaFix_PRELAUNCH_Tarpaulin.png` | 3000×1800 | 5×3 ft tarp · "Coming Soon" · QR → waitlist |
| `PapaFix_PRELAUNCH_Tarpaulin_Horizontal.png` | 4800×1800 | Wide 8×3 ft banner layout, same message |
| `PapaFix_PRELAUNCH_Leaflet.png` | 1748×2480 | A5 · "Coming Soon" · QR → waitlist |
| `PapaFix_Leaflet_Front.png` | 1748×2480 | A5 front (info) — pair with the Back |
| `PapaFix_Leaflet_Front_v2.png` | 1748×2480 | A5 front, Taglish alternative — same Back |
| `PapaFix_Leaflet_Back.png` | 1748×2480 | A5 back · services, tech recruiting, contact |
| `PapaFix_Tarpaulin.png` | 3000×1800 | 5×3 ft tarp, info-panel layout |
| `PapaFix_Tarpaulin_v2.png` | 3000×1800 | 5×3 ft tarp, bold centred layout |
| `PapaFix_Poster_A4.png` | 2480×3508 | A4 poster (dark), 300 DPI |

Leaflet fronts are alternatives, not a set — pick one and print it back-to-back with
`PapaFix_Leaflet_Back.png`. Same for the two tarpaulin layouts.

## technician/

| File | Size | Piece |
| --- | --- | --- |
| `PapaFix_TECH_Tarpaulin.png` | 3000×1800 | 5×3 ft recruitment tarp · aircon techs priority |
| `PapaFix_TECH_Tarpaulin_Horizontal.png` | 4800×1800 | Wide 8×3 ft banner layout, same message |
| `PapaFix_TECH_Leaflet.png` | 1748×2480 | A5 recruitment flyer · apply via papafixph.com |

## hold-until-launch/

`PapaFix_LAUNCH_Tarpaulin/_Leaflet` ("Now Live", Play download push) and
`PapaFix_PROMO_Tarpaulin/_Leaflet` (Taglish promo). Both sets carry a Google Play badge, so they are
wrong until the app is actually published. Move them into `print-now/` on launch day.

## Print specs

- Tarps are 10:6 — fits 5×3 ft or 4×2.4 ft. The `_Horizontal` cuts are 8:3, for long fence runs.
- Leaflets are A5 at 300 DPI; the poster is A4 at 300 DPI.
- Give the printer the PNG. No bleed is built in, so ask for a 3 mm bleed if they want one.

## Editing

Each file in `sources/` is a self-contained HTML page — fonts, logo, and QR codes are embedded, so
it renders identically with no network. Open in Chrome, edit, and re-screenshot at exactly the
pixel size listed above:

```sh
chrome --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=3000,1800 --screenshot=out.png sources/PapaFix_PRELAUNCH_Tarpaulin.html
```

Then replace the PNG in its folder, keeping the filename identical — the two are matched by name.

## Contact details used across the kit

`www.papafixph.com` · `papafix@nambuilders.com` · `customersupport_papafix@nambuilders.com` ·
Tanauan, Malvar, Sto. Tomas · "By NAM Builders and Supply Corp."

If any of these change, they change in `sources/` and every affected PNG gets re-exported —
a mismatch between pieces is worse than an out-of-date one.

## See also

- `print-brief.md` — the campaign brief the printed pieces were written from
- `play-store/PapaFix_PLAY_Feature_NOTES.md` — Play Console upload notes for the feature graphics
