# PapaFix — Privacy Policy & Account Deletion Page

**For the admin developer.** Two documents below, both required by Google Play before release.

1. **Privacy Policy** → host at `https://papafixph.com/privacy`
2. **Account Deletion** → host at `https://papafixph.com/delete-account`

Both URLs are entered into Play Console (Privacy Policy under *App content → Privacy policy*; Deletion URL under *Data safety → Data collection and security*). Google follows both links during review — they must be live, publicly reachable, and not behind a login.

---

## ⚠️ Before publishing — items requiring the client's input

These are marked `[CONFIRM]` in the text below. Do not publish with placeholders.

| Item | Why it matters |
| --- | --- |
| **Legal business name & registered address** | Must match the Play Console developer account. |
| **Contact email** | Must be monitored — deletion requests arrive here. |
| **Data retention period** for booking/payment records | Philippine tax law requires retaining business records (commonly 3–10 years depending on record type). **Ask the client's accountant — do not guess.** This number appears in both documents and must be consistent. |
| **Whether the business is BIR-registered for VAT** | Affects the accuracy of the payments section. |
| **Effective date** | Date of publication. |

---
---

# DOCUMENT 1 — Privacy Policy

**Effective date:** `[CONFIRM — date of publication]`
**Last updated:** `[CONFIRM]`

## 1. Introduction

This Privacy Policy explains how `[CONFIRM: Legal Business Name]` ("PapaFix", "we", "us") collects, uses, stores, and protects your personal information when you use the **PapaFix** customer application or the **PapaFix Technician** application (together, the "Apps").

PapaFix is a home services platform operating in the Philippines that connects customers with technicians for air conditioning, electrical, and plumbing services.

By using the Apps, you agree to the practices described in this policy. If you do not agree, please do not use the Apps.

## 2. Who this policy covers

This policy applies to two groups of users:

- **Customers** — individuals who book repair, cleaning, or maintenance services.
- **Technicians** — service providers who register on the platform to accept and perform jobs.

Where a practice applies to only one group, this is stated explicitly.

## 3. Information we collect

### 3.1 Information you provide

**All users:**
- Full name
- Email address
- Mobile phone number
- Password (stored only as a cryptographic hash — we never see or store your plain-text password)
- Profile photo (optional)

**Customers:**
- Service addresses, including street address, barangay, city, and province
- Geographic coordinates of your service addresses
- Details of the service requested, including appliance type, unit details, and issue description
- Photographs you choose to upload describing a problem

**Technicians:**
- Registered service base address and its coordinates
- Service categories and specialisations
- Availability schedule
- Photographs of work performed, taken during inspection and after completion of a job
- Photographs of payment proof for cash transactions

### 3.2 Information collected automatically

**Location data.** This is the most sensitive category we handle, and the two Apps treat it differently:

- **PapaFix (customer app)** collects your device location **only while the app is open and in use**, in order to help you set a service address and to display the location of an assigned technician. The customer app does **not** collect location in the background.

- **PapaFix Technician** collects precise device location **in the background — including when the app is closed or not in active use — but only while you have an active, accepted job in progress.** This is used to share your live position with the customer who is waiting for you, and to calculate travel distance for fee purposes. Background collection stops when the job is completed or cancelled.

  Before background location access is requested, the Technician App displays a disclosure explaining what is collected and why, and requires your explicit consent. You may decline. If you decline, the App continues to function using foreground-only location, though live tracking will not be available to your customer.

**Device and usage information:**
- Device push notification token (used to deliver job and booking notifications)
- Basic app interaction and diagnostic data used to detect errors and improve reliability

### 3.3 Information we do **not** collect

- We do **not** collect or store your payment card details, bank credentials, or e-wallet login information. Payments are made directly by you through your own banking or e-wallet application, or in cash to the technician.
- We do **not** access your contacts, calendar, SMS messages, or call logs.
- We do **not** record audio or video.

## 4. How we use your information

| Purpose | Data used |
| --- | --- |
| Creating and securing your account | Name, email, phone, password hash |
| Verifying your email address | Email address |
| Matching customers with available technicians | Location, service category, availability |
| Calculating travel fees | Service address and technician base location coordinates |
| Showing live technician location during an active job | Technician precise location (foreground and background) |
| Documenting job condition and completed work | Job photographs |
| Confirming manual payments | Payment proof photographs, booking amount |
| Sending booking, job status, and payment notifications | Push token, email address |
| Customer support and dispute resolution | Booking records, photographs, contact details |
| Fraud prevention and platform safety | Account and booking records |
| Meeting tax, accounting, and legal obligations | Booking and payment records |

We do **not** use your personal information for advertising, and we do not sell your personal information.

## 5. Legal basis and consent

We process your information on the basis of:

- **Your consent**, which you give when creating an account and, separately, when granting location permissions;
- **Performance of a contract**, where processing is necessary to deliver the service you requested;
- **Legal obligation**, where retention is required by Philippine tax and business records law;
- **Legitimate interest**, in preventing fraud and maintaining platform safety.

## 6. Sharing your information

### 6.1 Between users of the platform

- A technician assigned to your booking receives your **name, contact number, service address, and issue details** so they can perform the service.
- A customer with an active booking receives the assigned technician's **name, profile photo, contact number, and live location while the job is in progress**.

Information is shared only between the parties to a specific booking. Other users cannot see your details.

### 6.2 Service providers

We use the following third-party providers to operate the platform. Each processes data only as necessary to provide its service:

| Provider | Purpose | Data involved |
| --- | --- | --- |
| **Supabase** | Database, authentication, file storage, backend functions | All account, booking, location, and photo data |
| **Google Maps Platform** | Address lookup, mapping, distance and travel time calculation | Address text and coordinates |
| **Firebase Cloud Messaging** (Google) | Delivery of push notifications | Device push token, notification content |
| **Resend** | Delivery of account verification and transactional email | Email address |
| **Expo / Google Play** | App distribution and build infrastructure | Diagnostic data |

### 6.3 Legal disclosure

We may disclose information where required by law, court order, or a lawful request from a government authority, or where necessary to protect the rights, safety, or property of our users, our technicians, or the public.

### 6.4 Business transfer

If the business is sold, merged, or reorganised, user information may transfer as part of that transaction. You will be notified of any such change and of any resulting change to this policy.

## 7. Data storage and security

Your information is stored on servers operated by Supabase. We apply the following protections:

- All data transmitted between the Apps and our servers is **encrypted in transit using HTTPS/TLS**.
- Passwords are stored only as salted cryptographic hashes.
- Database access is restricted by row-level security policies, so users can access only their own records and the records of bookings they are party to.
- Photographs are held in private storage; access requires authentication and is limited to the uploading technician and the customer of the associated booking.
- Payment QR code images and pricing settings are writable only by administrators.

No method of transmission or storage is completely secure. While we take these measures seriously, we cannot guarantee absolute security.

## 8. Data retention

We retain your information for as long as your account remains active.

After account deletion:
- **Personal identifiers** — name, email, phone number, profile photo, saved addresses, and device tokens — are deleted.
- **Booking and payment records** are retained for `[CONFIRM: retention period, e.g. "ten (10) years"]` as required by Philippine tax and business records law. Personal identifiers are removed from these records where the law permits.
- **Job photographs and payment proof images** are retained for `[CONFIRM]` for dispute resolution and accounting purposes, then deleted.

## 9. Your rights

Under the Philippine **Data Privacy Act of 2012 (Republic Act No. 10173)**, you have the right to:

- **Be informed** about how your data is collected and processed;
- **Access** the personal information we hold about you;
- **Object** to processing, including withdrawing consent;
- **Correct** inaccurate or incomplete information;
- **Erasure or blocking** of your information, subject to our legal retention obligations;
- **Damages** for violations of your rights under the Act;
- **Data portability**, to obtain a copy of your data in a usable format;
- **File a complaint** with the National Privacy Commission (https://privacy.gov.ph).

To exercise any of these rights, contact us at `[CONFIRM: contact email]`. We will respond within a reasonable period and in any case as required by law.

You may also manage certain rights directly:
- Location permissions can be revoked at any time in your device settings.
- Push notifications can be disabled in your device settings.
- Account deletion can be requested as described in Section 11.

## 10. Children's privacy

The Apps are intended for users aged **18 and over**. We do not knowingly collect personal information from anyone under 18. If we become aware that we have collected information from a person under 18, we will delete it. If you believe a minor has provided us information, contact us at `[CONFIRM: contact email]`.

## 11. Account deletion

You may request deletion of your account and associated personal data at any time. Full instructions are available at:

**https://papafixph.com/delete-account**

## 12. Changes to this policy

We may update this policy from time to time. Material changes will be notified through the Apps or by email to the address associated with your account. The "Last updated" date at the top of this policy indicates when it was last revised. Continued use of the Apps after a change takes effect constitutes acceptance of the revised policy.

## 13. Contact us

For questions about this policy, or to exercise your rights under the Data Privacy Act:

**`[CONFIRM: Legal Business Name]`**
Email: `[CONFIRM: contact email]`
Address: `[CONFIRM: registered business address]`
`[OPTIONAL: Data Protection Officer name and contact, if the client has designated one]`

---
---

# DOCUMENT 2 — Account Deletion Page

> **Note for the developer:** Google checks this page during review. It must be publicly reachable without login, must name the app as it appears on the store listing, must give clear steps, and must state what is deleted versus retained. Keep the headings — reviewers scan for them.

---

## Delete Your PapaFix Account

This page explains how to request deletion of your account and personal data from **PapaFix** and **PapaFix Technician**, operated by `[CONFIRM: Legal Business Name]`.

### How to request deletion

**Send an email to `[CONFIRM: contact email]`** with the subject line **"Account Deletion Request"**, including:

1. The email address registered to your PapaFix account
2. Your registered mobile number
3. Which app you use — **PapaFix (Customer)** or **PapaFix Technician**

For your protection, we will send a confirmation message to your registered email address to verify the request came from you. Your account will not be deleted until you confirm.

### How long it takes

We acknowledge requests within **5 business days** and complete verified deletions within **30 days**.

### What is deleted

Once your request is verified, we permanently delete:

- Your name, email address, and mobile number
- Your password credentials and login access
- Your profile photograph
- Your saved service addresses and their coordinates
- Your device push notification tokens
- Your location history
- **Technicians:** your registered base location, availability schedule, and service preferences

### What is retained, and why

Some records must be kept even after your account is deleted:

| Retained | Period | Reason |
| --- | --- | --- |
| Booking and transaction records | `[CONFIRM: e.g. ten (10) years]` | Required by Philippine tax and business records law |
| Payment proof images | `[CONFIRM]` | Accounting and dispute resolution |
| Job photographs attached to completed bookings | `[CONFIRM]` | Dispute resolution and service records |

Where the law permits, personal identifiers are removed from retained records so they can no longer be linked to you.

### Deleting only some of your data

If you want to remove specific information — for example a saved address — without deleting your whole account, email `[CONFIRM: contact email]` describing what you would like removed. Note that some information is required for the app to function and cannot be removed while your account remains active.

### Cancelling a deletion request

You may cancel by replying to our confirmation email before deletion is carried out. Once deletion is complete it **cannot be reversed** — your account and data cannot be recovered, and you would need to register again as a new user.

### Questions

**`[CONFIRM: Legal Business Name]`**
Email: `[CONFIRM: contact email]`
Privacy Policy: https://papafixph.com/privacy

---
---

# Implementation notes for the developer

**Hosting**
- Both pages must be **publicly accessible** — no login, no `robots.txt` block, no `noindex` requirement (indexing is fine either way, but the page must load for Google's reviewer).
- Plain HTML is sufficient. No framework needed.
- Ensure both are served over **HTTPS**.
- Use stable URLs. If these change after submission, the Play Console entries must be updated too.

**Consistency checks before publishing**
- The retention period must be **identical** in the Privacy Policy (§8) and the Deletion Page. A mismatch is the kind of inconsistency reviewers notice.
- The business name must match the **Play Console developer account name**.
- The contact email must be **monitored** — this is where deletion requests arrive, and an unanswered request is a policy violation.

**Operational follow-up (not a web task, but needs an owner)**

Deleting a Supabase auth user cascades to `profiles`, but **storage objects do not delete themselves**. A complete deletion must also remove the user's files from:
- `avatars`
- `job-photos`
- `payment-proofs`

Someone should own a short runbook for processing a deletion request end to end. Committing to deletion in a public policy while lacking a working process is a real compliance exposure, not just a paperwork gap.

**A note on scope**

This is a drafted template based on how the PapaFix apps actually collect and handle data. It is not legal advice, and it has not been reviewed by a lawyer. The Data Privacy Act sections and retention periods in particular are the areas where a Philippine data privacy practitioner should review before publication — especially since the client's business, not the development team, carries the compliance obligation.
