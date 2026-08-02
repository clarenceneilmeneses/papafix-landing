# PapaFix — pre-launch checklist

Lifted out of the public legal pages on 2026-08-02. These boxes were rendering to
customers and to Play reviewers, including a line saying the Terms had not been
reviewed by a lawyer, so they were removed from the HTML. Nothing here is resolved
by that removal — the items below are still open.


## From `privacy.html`

Note for the PapaFix team — delete this box before submitting to Play.
This version is built from the mobile developer's spec, so the data practices above describe what
the Apps actually do. Three things still need an owner:
- Legal business name and registered address must replace "PapaFix" and
"Tanauan, Batangas" in sections 1 and 13, and must match the Play Console developer account
name.
- Send a test email to both mailboxes before this URL goes into the Play Console.
The addresses are live, but an unanswered deletion or access request is itself a violation —
confirm mail actually arrives and that someone owns the inbox.
- Ten years is a deliberate choice, not a verified one. It is the ceiling under
the BIR's preservation rules, so you cannot under-retain, but it is longer than some record
types need and the Act expects you to keep data no longer than necessary. Job photographs in
particular are worth revisiting — they are customers' homes. Confirm with the accountant and
shorten where you can. Whatever you choose must match the
deletion page .
Play submission, beyond these pages: the Technician app's background location
access needs a matching declaration in the Data safety form and a prominent in-app disclosure, and
Google will ask you to justify it. This is the most common reason apps like this get rejected.
Neither this policy nor a lawyer's review substitutes for filling that form in correctly.
This document is not legal advice and has not been reviewed by a lawyer.

## From `terms.html`

Note for the PapaFix team — delete this box before launch. This is an
honest, good-faith starting draft that reflects how PapaFix is described to work. It is
not legal advice and has not been reviewed by a lawyer. The liability, contractor-status,
and cancellation-fee clauses in particular carry real legal and tax consequences in the
Philippines and should be reviewed by counsel — along with your actual service-fee percentage,
cancellation amounts, and dispute window — before the app ships.

## From `delete-account.html`

Note for the PapaFix team — delete this box before submitting to Play.
Aligned with the developer's spec. Three things still need an owner before this URL goes into the
Play Console.
- Test the deletion mailbox before this URL goes into the Play Console. Every
deletion request on this page goes to papafix@nambuilders.com . Send it a test email and confirm it
arrives — a request that bounces is worse than no page at all.
- Legal business name and registered address must replace "PapaFix ·
Tanauan, Batangas" and match the Play Console developer account.
- Ten years matches the Privacy Policy on purpose — keep them in sync. It is
the BIR preservation ceiling, chosen so you cannot under-retain, but it is longer than some
record types need. If the accountant comes back with something shorter, change it in
both documents or the mismatch is the kind of thing reviewers
notice.
Also unresolved: the privacy policy previously said technicians' government ID and
proof of trade are collected during in-person screening. Those are not in the app database, so if
you still hold them, confirm where they live and who deletes them — then list them above.
Operational gap, not a web task: deleting a Supabase auth user cascades to
profiles , but storage objects do not delete themselves. A real deletion must also
clear the user's files from avatars , job-photos , and
payment-proofs . Someone needs to own that runbook — promising deletion publicly
without a working process is live compliance exposure.
