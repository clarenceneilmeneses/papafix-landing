# PapaFix — Play submission handoff

**From:** Clarence · **Date:** 26 July 2026
**Re:** your spec, `PapaFix_Privacy_Policy_and_Deletion_Page.md`

Your document is now implemented on the website. Both pages are live. Below: the URLs to paste,
what differs from your draft, and the items that need you rather than me.

---

## 1. URLs — live now, paste these

| Play Console field | URL |
| --- | --- |
| *App content → Privacy policy* | `https://www.papafixph.com/privacy` |
| *Data safety → Data collection and security* → Delete account URL | `https://www.papafixph.com/delete-account` |

Extensionless, as you spec'd — I added `cleanUrls` to the Vercel config. The `.html` forms still
resolve but 308-redirect, so use the clean ones. Both are public, no login, HTTPS, and served from the
canonical host (`www.`; the apex 308s to it).

If you hardcoded either URL in the apps, they'll now match.

---

## 2. Where the published pages differ from your draft

Your data practices went in as written. Five deliberate changes:

1. **Retention filled in as ten (10) years**, in both documents. It's the BIR preservation ceiling —
   chosen so we can't under-retain while the accountant is still being asked. If it changes, it changes
   in **both** pages or the mismatch is exactly the inconsistency you warned about.
2. **Contact is `support@papafixph.com`** everywhere, replacing the personal Gmail. See item 3.1 — the
   mailbox doesn't exist yet.
3. **Service scope is aircon-first.** Your draft said the platform covers "air conditioning, electrical,
   and plumbing." The rest of our marketing says aircon at launch with other trades to follow, so the
   policy now matches that. Not a correction of your spec — the app may well have the categories built —
   but the policy shouldn't be the thing announcing services that aren't live.
4. **Added a website section.** Your spec covered the apps; the site also collects waitlist emails
   through Web3Forms, and that processing is real, so it's disclosed.
5. **Business name and registered address are still absent** — pages say "PapaFix · Tanauan,
   Batangas." Clarence is confirming the legal entity. See item 4.

Your `[CONFIRM]` blocks are otherwise resolved or tracked below.

---

## 3. Items that need you

### 3.1 Create `support@papafixph.com` — blocking

Both live pages tell users to email that address. It does not exist, so those requests bounce today.
Low impact right now (no accounts yet), but an unanswered deletion request is itself a Play policy
violation and a Data Privacy Act problem, so this must work **before** the URL goes into the Console.

**DNS state, checked 26 July 2026:**

- Nameservers: `aster.dns-parking.com`, `helios.dns-parking.com` → domain and DNS are on **Hostinger**
- **MX records: none.** No mail is configured for the domain at all.
- The website's A/CNAME records point at Vercel. **Adding MX records will not affect the site** —
  mail and web routing are independent.

**Pick one:**

| Option | Notes |
| --- | --- |
| **Hostinger email (Titan)** | Simplest — same hPanel as the DNS, no external MX to wire up. Some Hostinger plans include a free mailbox for the first year. Check hPanel → Emails first; it may already be sitting there unused. |
| **Zoho Mail free plan** | Free for a small team with a custom domain, webmail-only on the free tier. Add the MX/TXT values Zoho's setup wizard shows you into Hostinger's DNS panel. |
| **Google Workspace** | Paid per user. Worth it only if you want real Gmail/IMAP on the domain. |

Whichever you pick: **add the SPF record** (and DKIM if offered), or outbound replies will land in
spam — which for a deletion-request inbox means the user never sees the confirmation email the page
promises them. Then send a test message from an outside address and confirm it arrives.

Please also **forward the mailbox to Clarence's Gmail**, so it's actually read rather than just
existing.

### 3.2 Storage cleanup on account deletion — the substantive one

You flagged this and you were right; it's the one real gap. Deleting a Supabase auth user cascades to
`profiles`, but storage objects don't delete themselves. Files survive in `avatars`, `job-photos`, and
`payment-proofs`.

The public page now promises deletion of the profile photo, saved addresses, and location history, so
until this exists we're promising something the system can't fully deliver.

**One nuance before you build it** — the retention split means this is not a blanket wipe:

| Bucket | On account deletion |
| --- | --- |
| `avatars` | **Delete.** The page lists the profile photograph as deleted. |
| `job-photos` | **Keep** — 10-year retention for dispute resolution. Detach from the user / strip identifiers rather than delete. |
| `payment-proofs` | **Keep** — 10-year retention as an accounting record. Same treatment. |

So the job is "delete avatars, anonymise the rest," not "delete everything." Worth confirming you agree
with that reading, because it changes the implementation — and if you think the photos genuinely can't
be de-identified while staying useful as evidence, say so and we'll change the pages instead.

**What we need from you:** which approach, and who runs it.

- an Edge Function that takes a user id, clears `avatars`, detaches the retained objects, then deletes
  the auth user; or
- a Postgres trigger doing the same; or
- a written manual runbook — genuinely fine at launch volume, but it has to be written down and someone
  has to own it.

### 3.3 Make the Data safety form match the policy

The policy now declares the following. The form needs to agree with it:

- **Personal info:** name, email address, phone number
- **Location:** *approximate and precise.* Precise, **collected in the background**, Technician app
  only, during an active job
- **Photos:** job photographs, payment proof images, optional profile photo
- **App activity / diagnostics:** crash and interaction data
- **Device identifiers:** push notification token
- **Financial info:** booking amounts and payment-proof images mean *purchase history* likely applies —
  worth checking Google's category definitions. **Card and bank credentials are not collected**, which
  the policy states explicitly.
- **Encrypted in transit:** yes
- **Users can request data deletion:** yes → the URL in section 1

Anything you declare that the policy doesn't mention (or vice versa) is a discrepancy a reviewer can
see, so if the app collects something not on that list, tell me and I'll add it to the policy.

### 3.4 Background location — expect to justify it

This is the most common rejection reason for apps in this category. You'll need the in-app prominent
disclosure (your spec says it's built), the declaration above, and a written justification. Draft to
adapt:

> PapaFix Technician requires background location access to share the assigned technician's live
> position with the customer awaiting service at their home, and to calculate travel distance for
> transparent fee computation. Collection is limited to technicians who have accepted a job, begins only
> after the technician accepts, and stops automatically when the job is completed or cancelled. It is
> never collected from customers, and never from technicians who are offline or without an active job.
> The feature cannot function in the foreground alone: technicians are driving or carrying equipment
> with the screen off during travel, and customers need to know when someone is arriving at their home.
> A prominent in-app disclosure explains the collection and requires explicit consent before the
> permission is requested; declining leaves the app fully usable with foreground-only location, with
> live tracking unavailable to the customer.

Check that every sentence there matches what the app actually does before submitting — I wrote it from
your spec, not from the code.

### 3.5 Signup screen needs to link the Terms and Privacy Policy

Section 5 of the published policy says consent is given **"when creating an account."** So if the
signup screen doesn't surface both documents, the policy describes a consent flow that doesn't exist —
which is a worse problem than any presentation issue, because it's the policy making a claim about the
app that isn't true.

To be clear about what's *not* being asked: **no modal, no forced full-screen acceptance.** A line under
the signup button is the normal pattern and is generally accepted:

> By creating an account you agree to the Terms of Service and Privacy Policy

with both titles tappable, pointing at:

- `https://www.papafixph.com/terms`
- `https://www.papafixph.com/privacy`

A ticked checkbox is stronger evidence of consent if it's cheap to add, but a visible line above the
button is the common bar. **Please confirm which one the app currently does** — if it's neither, this
is the smallest item on this list and the one with the most direct bearing on whether the policy is
accurate.

Also worth adding, if it isn't there: a **Privacy Policy link in app Settings**. Reviewers look for it
and it costs nothing.

Note this is separate from the background-location disclosure in 3.4. That one *is* a required prominent
screen shown before the permission prompt. Linking the policy doesn't satisfy it, and the disclosure
doesn't satisfy this. Both are needed.

*(Website side of the same point is already done — the waitlist form now carries a notice line and a
Privacy Policy link at the point of collection, rather than relying on the footer.)*

### 3.6 Technician screening documents

The old policy said technicians' government ID and proof of trade are collected during in-person
screening. Your spec doesn't list them, so they're presumably not in the app database. If we still hold
them anywhere — paper, Drive, someone's phone — tell me where and I'll list them on the deletion page.
If they were never actually collected, tell me that too and it stays off.

---

## 4. Items on Clarence, not you

Listed so you know they're tracked and aren't waiting on you:

- **Legal business name + registered address** for both pages, matching the Play developer account name.
  Likely *NAM Builders and Supply Corp.* (it's in the logo byline) — being confirmed.
- **Accountant sign-off** on the ten-year retention, and specifically whether job photographs need that
  long. Ten years of photos of customers' homes is defensible for tax but is longer than the Data
  Privacy Act's minimisation principle really wants.
- **Removing the yellow team-notes** from all three legal pages before submission. They're visible on
  the live pages right now and they list our own open problems, so they go before a reviewer reads them.

---

## 5. Settled — no need to re-ask

- Retention: **ten (10) years**, identical in both documents.
- Contact: **`support@papafixph.com`**.
- Positioning: **aircon-first**; electrical and plumbing are "to follow," not current.
- URLs: **extensionless**.
- Payments: we collect no card or bank credentials. Don't add anything implying otherwise.
