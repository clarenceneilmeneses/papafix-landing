# PapaFix — Landing Page

Marketing landing page for **PapaFix**, an on-demand home-repair app for Batangas, Philippines.

> **For AI assistants / new contributors:** this file is the source of truth for *what this project is and why it exists*. Read it before making changes so edits stay consistent with the brand and business.

---

## What PapaFix is

PapaFix is **Batangas' first on-demand home-repair app** — think "book a verified technician from your phone." A homeowner opens the app, picks the service they need, gets an upfront price estimate, and a background-checked local technician shows up, tracked live along the way.

The logo tagline reads *"Aircon Service App | Trusted Repairs"* — aircon servicing is the flagship/entry service, but the platform covers general home repair.

- **Product:** Android mobile app (Android 8.0+), free to download on Google Play.
- **Stage:** Early-stage / pre-launch startup (WIP). Now onboarding its first technicians in three Batangas cities — **Tanauan, Malvar, and Santo Tomas**. Explicitly local ("local jobs only").
- **Market:** Batangas, Philippines.
- **Model:** Two-sided marketplace — homeowners on one side, skilled technicians on the other ("Earn more. Work on your terms." — no middleman, flexible hours, fair pay).

## Why it exists (purpose)

Home repair in the Philippines is typically informal: you ask around, haggle on price, and hope the person shows up and does good work. PapaFix's purpose is to make that **fast, trusted, and transparent**:

- **Trust** — every technician is ID-checked / screened in person before jobs, and QR-verified at the door.
- **Speed** — quick in-app booking; the nearest available technician is dispatched first.
- **Transparency** — upfront pricing shown in-app before you commit (no surprise fees).
- **Visibility** — real-time tracking of the technician on the way.

## Services offered

Electrical · Plumbing · Aircon · Appliance repair · Carpentry · Painting · Cleaning · **And more** (roofing, tiling, locksmith, pest control, and custom requests). **8 service categories** total.

## What the site claims (and what it doesn't)

Because PapaFix is pre-launch, the landing page deliberately avoids vanity metrics. **There are no technician counts, no job counts, no star ratings, and no customer testimonials** — those will be added once real data and reviews exist.

Instead it leans on verifiable facts and product capabilities:

- 3 cities served (Tanauan, Malvar, Santo Tomas)
- 8 service categories
- Verified technicians · Upfront pricing · Live job tracking · QR verification · Free to download

The testimonials section is intentionally a "be among our first customers" call-to-action, not real reviews.

> **When editing:** keep it honest — don't reintroduce invented counts, ratings, or reviews until the client provides real numbers.

---

## This repository

A **single-page static marketing site**. There is no build step, framework, or backend here — it's one hand-written HTML file with inline CSS and vanilla JS.

### Structure

```
index.html                    # The entire landing page (markup + inline <style> + inline <script>)
privacy.html                  # Privacy policy — STARTER DRAFT, needs legal review before launch
terms.html                    # Terms of service — STARTER DRAFT, needs legal review before launch
robots.txt                    # Allows all crawlers; points at the sitemap
sitemap.xml                   # 3 URLs (home + the two legal pages)
README.md                     # This file
assets/
  legal.css                   # Shared styles for privacy.html + terms.html only
  brand/
    app-logo.png              # Source master — official customer/brand logo (2048×2048)
    tech-logo.png             # Source master — technician app logo (2048×2048)
    app-logo-1024.png         # og:image size (derived from master)
    app-logo-480.png          # In-page use: intro, nav, footer
    app-logo-180.png          # apple-touch-icon
    app-logo-32.png           # favicon
    tech-logo-360.png         # Technician logo (banner badge + technician modal)
  img/
    services/                 # 8-category card photos (+ roofing.png, currently unused)
    cities/                   # Coverage photos: tanauan, malvar, santotomas
    founders/                 # Founder portrait photos (founder-*.png)
docs/
  papafix-*-ui-guide.pdf      # Official app UI guides — source of truth for the
                              #   CSS phone mockups (colors, copy, screen layouts)
```

Sized logo derivatives are generated from the masters (old pre-rebrand logo files were deleted in the repo but remain in git history). Regenerate derivatives from the masters whenever the logo changes.

### Sections of the page (in order)

Intro loader → sticky nav → hero (customer-app phone mockup) → trust bar → coverage/cities + waitlist → "A Look Inside the App" (3 mini phone mockups) → "story" banner → services (compact 8-card grid) → how it works (bento grid) → stats marquee → features → founders gallery → testimonials → "become a technician" banner (technician-app phone mockup) → download CTA → footer.

### Notable implementation details

- **Custom scroll animations** (no library): hero word reveal, image zoom-in, a sticky horizontal founders gallery, and section build-ins. (Services used to be a scroll-jacked horizontal strip and the story band used to be a pinned 200vh section; both were flattened to keep total scroll length sane — don't reintroduce them.)
- **Founders gallery** expects `assets/img/founders/founder-albert.png`, `founder-rai.png`, `founder-clarence.png`, `founder-hanna.png`, `founder-francis.png` (portrait photos, ~800px wide). Until a file exists, its card shows a monogram placeholder. Albert Molinyawe (Founder) comes first; the other four are co-founders.
- **Intro overlay** plays once on load, then sweeps away.
- **App mockups are pure HTML/CSS** — a reusable `.phone` frame component (Android-style: bezel, punch-hole camera, status bar, gesture bar — the app ships on Google Play only) renders real screens from the official UI guides: live tracking in the hero, booking/confirm/payment in "A Look Inside the App", and Incoming Jobs in the technician banner. Customer screens use the app's blue `#3B8EEF`, technician screens the orange `#F07C1A` (these are *app* tokens, deliberately not the site brand variables). The hero map marker (SMIL) and job countdowns pause under `prefers-reduced-motion`. No screenshots or images are used.
- Fully responsive; mobile collapses the two-column layouts, makes the app-screens row swipeable (scroll-snap), and hides some desktop-only flourishes.

### Brand / design system

- **Accent color:** warm orange sampled from the logo — `#f26b1d` (primary), `#e15410` (mid), `#c2410c` (deep), with `#ffebda` / `#fff6ef` light tints. Defined as CSS variables in `:root` (historically named `--blue*`; the *names* are legacy, the *values* are orange).
- **Ink / text:** `#0a0f1e`. **Background:** `#f7f9fc`.
- **Fonts:** Sora (headings/wordmark), DM Sans (body), DM Mono (labels) — loaded from Google Fonts.
- **Google Play button** uses Google's official brand colors on hover — leave those as-is.
- **Service cards** share one neutral dark surface with the brand orange as the only accent (an earlier per-card rainbow treatment was deliberately removed — don't reintroduce it).

> When changing brand color, update the `:root` variables and the shared shadow token `rgba(242,107,29,…)` together so shadows/borders stay in sync.

### SEO

The canonical host is **https://www.papafixph.com/**. The Vercel and GitHub Pages deploys are mirrors — `<link rel="canonical">`, `og:url`, `og:image`, `robots.txt`, and `sitemap.xml` all hardcode the papafixph.com origin so the mirrors don't get indexed as duplicates. **If the domain ever changes, update all five together.**

JSON-LD (`Organization` + `WebSite` + `MobileApplication`) sits in the `<head>`. It deliberately carries **no `aggregateRating`/`reviewCount`, and no `LocalBusiness` street address** — PapaFix is pre-launch with no real ratings, and the office address isn't public. Adding either would be fabricated markup and is what triggers a Google structured-data penalty. Add them when the data is real.

### Known pre-launch gaps

- **The waitlist posts to Web3Forms** (`api.web3forms.com/submit`), migrated off FormSubmit on 2026-07-15 after FormSubmit's `/ajax/` endpoint stopped responding entirely — it held the connection open until Cloudflare returned a 524, was never activated, and sometimes replied with two concatenated JSON objects. The handler reads the JSON `success` field (not just HTTP status), aborts after 15s so a hanging backend can't wedge the button on "Joining…", and treats an unparseable body as a rejection.
- **The Web3Forms `access_key` in `index.html` is public by design** — it identifies the destination inbox and is not a secret. Restrict it to `papafixph.com` in the Web3Forms dashboard so it can't be reused from another site.
- **Web3Forms blocks datacenter/server IPs on the free plan**, so the live endpoint cannot be exercised from CI or a sandboxed agent — it returns a CORS-preflight failure (`ERR_FAILED`). Verify signup changes from a real browser on a normal connection; mocked-route tests cover the response handling.
- **Social links were removed**, not hidden — no accounts exist yet. The `.footer-social-btn` styles remain; re-add the anchors with real URLs plus `target="_blank" rel="noopener"`.
- **`privacy.html` / `terms.html` are honest starter drafts, not lawyer-reviewed.** Each ends with a yellow team-facing callout listing what still needs doing — delete those callouts before launch.
- **Contact links point at a personal Gmail.** Swap for a papafixph.com address (and update the FormSubmit endpoint + JSON-LD `email`) once domain email exists.
- Footer previously had Careers, Press, Help Center, and Safety Guidelines links with nowhere to go; they're removed until those pages exist.

### Running / editing

Open `index.html` directly in a browser, or serve the folder statically:

```bash
python -m http.server 8000   # then visit http://localhost:8000
```

No install, no dependencies, no compile step.
