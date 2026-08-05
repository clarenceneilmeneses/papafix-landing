# pafix — do not modify

Never edit these without explicit instruction:
- Web3Forms email signup + timeout handling (index.html:3570–3674).
  One IIFE, `bind(form, msg)`, bound to every `form[data-waitlist]`.
  There are TWO signup points — hero and #cta. Never duplicate the fetch,
  the AbortController timeout, or the `success === "true"` test; add forms.
- Point-of-collection privacy notice — required at EVERY signup point:
  index.html:1816 (hero) and index.html:2596 (#cta)
- All links to legal pages and assets/legal.css
- Any Play Store / app store listing links
- JSON-LD schema block (index.html:36–93) — deliberately omits ratings
- Testimonials empty state (index.html:2482–2492) — honest by design
- Phone mockups — rebuilt from real UI guides:
  index.html:450–456 (app colour tokens), 2092–2185 (#app), 2497–2568 (#technicians).
  .phone-mini is 230px with fixed internal px font sizes. It is never
  rescaled directly — the fit-to-screen script zooms the whole section
  instead, which takes the mockup with it at its designed proportions.
- Hero map stays at the CALABARZON viewBox (index.html:1823–1870). It was
  zoomed to northern Batangas on 2026-08-05 and reverted the same day: the
  region view is deliberate, because the goal is expansion across the whole
  of Region IV-A and the map is what shows the room to grow. Do not "fix"
  the service area looking small — that is the point.

No prices, warranties or guarantees anywhere on the page without the team's
real numbers. See TASK4-PRICING-AND-TRUST.md — proposal written, blocked on
those numbers, nothing built.

Line numbers drift. Every range above was stale by 2026-08-05 and was
re-derived then against the current file; re-check before trusting them, and
correct them in place.

When touching a section, report which line ranges you changed before writing.