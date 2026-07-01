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
index.html         # The entire landing page (markup + inline <style> + inline <script>)
papafix-logo.png   # Official brand logo (app-icon style, orange). Used as favicon,
                   #   nav mark, intro loader, hero, and footer.
*.png              # Service / lifestyle photos: electrical, plumbing, aircon,
                   #   appliance, carpentry, painting, cleaning, more
hero.png           # Legacy hero mockup — no longer referenced (safe to delete)
README.md          # This file
```

### Sections of the page (in order)

Intro loader → sticky nav → hero → trust bar → services (horizontal scroll panels) → coverage/cities → "story" band → how it works (bento grid) → stats marquee → features → testimonials → "become a technician" banner → download CTA → footer.

### Notable implementation details

- **Custom scroll animations** (no library): hero word reveal, a pinned "story" band, image zoom-in, a GSAP-style vertical→horizontal scroll for the Services panels, and section build-ins.
- **Intro overlay** plays once on load, then sweeps away.
- Fully responsive; mobile collapses the two-column layouts and hides some desktop-only flourishes.

### Brand / design system

- **Accent color:** warm orange sampled from the logo — `#f26b1d` (primary), `#e15410` (mid), `#c2410c` (deep), with `#ffebda` / `#fff6ef` light tints. Defined as CSS variables in `:root` (historically named `--blue*`; the *names* are legacy, the *values* are orange).
- **Ink / text:** `#0a0f1e`. **Background:** `#f7f9fc`.
- **Fonts:** Sora (headings/wordmark), DM Sans (body), DM Mono (labels) — loaded from Google Fonts.
- **Google Play button** uses Google's official brand colors on hover — leave those as-is.
- **Service panels** each carry their own accent color (a deliberate rainbow) — that variety is intentional and is *not* the brand accent.

> When changing brand color, update the `:root` variables and the shared shadow token `rgba(242,107,29,…)` together so shadows/borders stay in sync.

### Running / editing

Open `index.html` directly in a browser, or serve the folder statically:

```bash
python -m http.server 8000   # then visit http://localhost:8000
```

No install, no dependencies, no compile step.
