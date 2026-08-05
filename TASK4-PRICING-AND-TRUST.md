# Task 4 — price anchoring and trust (proposal, not built)

Status: **blocked on real numbers.** Nothing here is implemented. No price,
warranty or guarantee below is real — every value is a `___` placeholder and
must be filled in by the team before a single line is written.

Why blocked: the page is pre-launch and its JSON-LD deliberately omits ratings
because PapaFix has none yet (see `CLAUDE.md`). A price or a warranty invented
to fill a layout is the same class of mistake, with more legal exposure — a
posted starting price and a stated guarantee are things a customer can hold you
to. So: numbers first, markup second.

---

## 1. The problem

The top objection for aircon service here is **"magkano?"** — and today the
only numbers on the page are:

| where | what | why it fails |
|---|---|---|
| `index.html` `#app` phone mockup | ₱500 / ₱350 / ₱850 | Inside a *mockup*. It reads as sample UI, not as a price. Easy to miss, and easy to misread as a fixed total. |
| `index.html` `#bento` stat card | a single figure | Decorative context, not an answer. |

Neither is near the aircon service block, and neither says whether ₱850 is a
floor, a ceiling, or one example job.

Second problem: this app sends **a stranger into someone's house**. For that
audience, "is this person vetted, and what if it breaks again next week" matters
more than the coverage map does. The page currently answers none of it in the
service block. (`#technicians` says screening happens face-to-face, but that is
pitched at *applicants*, not at customers.)

---

## 2. What I need from you before building

Answer these and I can write it. **Do not guess on my behalf — an approximate
number that ships is worse than a blank.**

### Pricing
1. What is the genuine **starting price** for the first aircon service, and what
   exactly does it buy? (Cleaning only? Which unit type — window vs split?)
2. Is that number a **starting-from** floor, or a fixed rate for a defined job?
3. What makes it go up — unit type, number of units, floor level, parts?
4. Is the ₱500 / ₱350 / ₱850 breakdown in the phone mockup **real**? If yes, what
   are the three lines? If not, the mockup needs correcting too — flag it,
   because it currently reads as a real quote.
5. Is diagnosis / call-out **free**, or charged if the customer declines the job?
6. Confirmed payment methods at launch. The mockup shows GCash, Maya and card —
   is all three accurate on day one?

### Trust
7. **Vetting** — what is actually checked before a technician takes a job?
   (Government ID? NBI clearance? Barangay clearance? A trade test? In-person
   interview?) I will write only what is literally verified.
8. **Warranty** — is there one on the work? If yes: how many days, and what does
   it cover (labour only, or parts too)?
9. **Repeat failure** — the concrete promise. "If the same fault returns within
   ___ days, we send someone back at no charge" — is that true, and what is the
   number?
10. **Damage** — is there any liability cover if a technician damages something
    in the home? If there is none, say so and I will simply not make a claim.
11. **Cancellation** — can a customer cancel free, and up to when?

### Legal
12. Does anything above need review before it goes on a public page? A posted
    starting price and a stated warranty are both consumer-facing commitments
    under the Consumer Act; DTI rules on price display may apply.

---

## 3. Proposed shape (once the numbers exist)

Two additions, both in / beside the existing aircon service block in
`#services`. No new section — this is an answer, not a chapter.

### 3a. Starting-price line

Sits directly under the aircon service heading, before the feature list.

```
┌─────────────────────────────────────────────┐
│  Aircon cleaning                            │
│                                             │
│  Starts at  ₱___                            │
│  ─────────  for a ___ unit. Final price is  │
│             confirmed in the app before you │
│             book — no surprise charges.     │
└─────────────────────────────────────────────┘
```

Craft notes:
- The figure uses `--t-figure-lg` / Sora, matching the stat cards in `#cta`, so
  it reads as a *number the company stands behind* rather than body copy.
- **"Starts at" is load-bearing.** It is the one word that stops ₱___ being read
  as a fixed total, which is the current failure mode of the mockup.
- The follow-on sentence exists to kill the real fear, which is not the price —
  it is *being quoted one number and charged another*.
- No strikethrough "was ₱___", no fake discount, no "from as low as". Pre-launch
  with no price history, any of those would be invented.

### 3b. Trust row

Three items, directly beneath. Same visual weight as `.cta-meta` (icon + short
label), so it reads as specification, not as marketing.

```
  [shield]  ___-checked technicians     [badge]  ___-day warranty on the work
  [return]  Same fault within ___ days? We come back free
```

Craft notes:
- Each item is a **fact with a number in it**. "Vetted technicians" alone is a
  claim anyone can make; "NBI-cleared and interviewed in person" is checkable.
- Reuses `.cta-meta` / `.cta-meta-item` — no new component, no new tokens.
- If an answer above comes back as "no" (say, no warranty at launch), that item
  is **dropped, not softened**. Two true rows beat three where one is mush. This
  is the same principle as the testimonials empty state.

### Placement rationale

Price goes next to the service, not in the hero. Someone in the hero has not yet
decided they want aircon service; someone reading the aircon block has. The
trust row sits under the price because the sequence of the objection is
"magkano?" → "…and who are you sending?".

---

## 4. Implementation notes (for whoever builds it)

- All CSS into the existing `<style>` block, existing custom properties only
  (`--brand`, `--ink-faint`, `--t-figure-lg`, `--r-md`, …). No new colour
  literals — there is a token for everything this needs.
- Vanilla, no JS required. This is static content; nothing here should depend on
  a script.
- The price must appear in the markup as text, not baked into an image, so it is
  selectable, translatable and readable by a screen reader.
- **Do not** add `Offer` / `priceRange` to the JSON-LD in the same change. The
  schema block deliberately omits unverifiable claims (`CLAUDE.md`); adding
  pricing to structured data is a separate decision with its own risk, and it
  must be exactly consistent with the visible price if it ever happens.
- When the number changes, it must change in **both** the service block and the
  `#app` phone mockup, or the page contradicts itself. Consider whether the
  mockup should show a price at all once a real one is published.

---

## 5. Open question for the team

The mockup at `#app` currently shows a **₱850 total**. If the real starting
price turns out to be materially different, that mockup is actively misleading
today — before anything else here gets built, it may be worth correcting on its
own. The mockups are protected in `CLAUDE.md` as rebuilt from the real UI
guides, so that needs an explicit decision rather than a quiet edit.
