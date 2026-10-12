# Product specification — Business Hub

## Target audience

UK service businesses such as plumbing/heating, electrical, commercial cleaning, facilities and property maintenance. Target customers usually have multiple incoming enquiries, quotation follow-ups and a team carrying out jobs.

## Problem

Leads, quotations, schedules and follow-ups are often scattered across email, phone calls, WhatsApp and spreadsheets. That creates administration and makes it hard for business owners to see what work is awaiting attention.

## Prototype goal

Demonstrate an integrated pipeline in under five minutes without requiring a login. A visitor can:

1. Open the overview and understand open enquiries, outstanding quotations and follow-ups.
2. Add an enquiry with a company, contact, service, source and estimated value.
3. Create a draft quote from it, mark the quote as sent, and record a follow-up.
4. Accept the quotation and watch it turn into a scheduled job.
5. Change the job's assignee, date and progress; use basic analytics and export.

## Demo acceptance criteria

- Pages are usable at 390px width and on larger desktops.
- Quotes reference a real enquiry and accepted quotes create a linked job.
- Search and status filters work locally.
- Export is available as CSV without a backend.
- Demo actions persist in the same browser when localStorage is available.
- No demo action sends an email, SMS, API request or notification to a real person.
- Seed records use fictional names, example.com-style domains or reserved `.example` domains, and reserved mobile number ranges.

## Product modules

| Module | In prototype | Production additions |
| --- | --- | --- |
| Overview | Live KPI calculations and activity | Realtime API, date filters and team permissions |
| Enquiries | Create, search, status update | Website forms, duplicates, attachments, audit trail |
| Quotations | Draft, send marker, accept/decline, print | Line items, VAT, email delivery, customer e-sign acceptance |
| Follow-up | Due calculation, copy reminder, activity log | Scheduled transactional email/SMS with retries and opt-out handling |
| Jobs | Kanban, assignee, schedule | Calendar, technician mobile view, job photos |
| Customers | Aggregated records | Secure database, import/merge, GDPR deletion |
| Analytics | Pipeline and enquiry source | Date-range filters, metrics definitions, historical snapshots |
| Settings | Name, follow-up interval, reset | Organisation, billing, roles, integrations |

## Core entities for production

`organisations`, `users`, `organisation_memberships`, `customers`, `enquiries`, `quotes`, `quote_line_items`, `jobs`, `activity_events`, `reminder_rules`, `email_outbox`.

Each customer-specific table needs an `organisation_id` and row-level security enforced by the server/database. IDs should be UUIDs, not demo sequential strings. Event logs should be immutable. Customer acceptance should be stored as a verifiable event.

## Commercial discovery questions

- Which three admin tasks cost you the most time each week?
- Where do new enquiries arrive, and how are they followed up?
- What percentage of quotes convert into paid work?
- What is in use today (e.g. Excel, ServiceM8, Jobber, Sage, Xero, Microsoft 365)?
- What's one thing your current system doesn't do?
- Would you prefer to pay for bespoke setup and support, or a per-user subscription?

## Explicitly out of scope for this version

Authentication, production storage, real email or SMS, real payments, multi-company data sharing, GDPR compliance controls, signed acceptances and VAT-compliant invoices.
