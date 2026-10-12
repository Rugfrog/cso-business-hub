# CSO Business Hub — prototype v0.1

**A responsive, interactive business operations dashboard** for service companies. Built as a demonstration by CSO Tech (Chris, Seaton and Oliver).

> **Demo only.** All records are fictional. There is no authentication, backend, shared database, email integration, payment system or real scheduling service. Browser edits are saved **only to localStorage on that device**. Never put real customer information into this prototype. The default seeded `.example` email domains and `07700 900xxx` numbers are fictional.

## Screenshots

![Business Hub dashboard on desktop](assets/preview-desktop.png)

[Mobile dashboard preview](assets/preview-mobile.png)

## Features

- Responsive desktop, tablet and mobile layout with accessible navigation
- Overview dashboard with KPIs, enquiry activity, quote follow-up alerts, and recent activity
- Enquiries: create, search, filter, update status, and convert into quotations
- Quotations: create drafts, mark sent, follow up, copy a reminder message, accept or decline, duplicate, and print a sample quote
- Accepting a quotation automatically creates a scheduled job
- Jobs: Kanban-style status board, add jobs, reschedule, reassign, progress status
- Customers: automatically aggregates customer details and linked records
- Analytics: lead sources, conversion rate and pipelines
- CSV exports for enquiries, quotations and customers (with spreadsheet formula injection precautions)
- Settings for business name and follow-up interval, and one-click demo reset
- All mutations persist across browser reloads using localStorage

## Run it locally

The project uses **vanilla JavaScript ES modules + HTML + CSS**, no build tools or third-party dependencies. Optional checks run via the built-in Node.js test runner (`npm test`). This is intentional: zero configuration, easy to audit, and GitHub Pages compatible. It is not the recommended production architecture.

Run an HTTP server (don't double-click `index.html`, because ES modules are blocked by many browsers on `file://`):

```bash
python -m http.server 8080
```

Then visit **http://localhost:8080/**.

## Publish to GitHub Pages

1. Create a **public** GitHub repository named `cso-business-hub` (or another name). For a manual Git push from the commands below, leave it empty. When working through the connected GitHub assistant, initialise the repository with **Add a README**, so its `main` branch exists for connector file uploads.
2. Upload the **contents** of this folder, including the `.github/workflows/deploy.yml` workflow, to the `main` branch. Or use the terminal commands below.
3. Go to **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. The workflow deploys the static application when `main` changes. Check the repository **Actions** tab for the run and deployed URL.

```bash
git init
git add .
git commit -m "Initial CSO Business Hub demo"
git branch -M main
git remote add origin https://github.com/YOUR_USER/cso-business-hub.git
git push -u origin main
```

GitHub Pages usually serves the app at `https://YOUR_USER.github.io/cso-business-hub/`. **Do not share this as a working link until the Pages deployment has succeeded.** Public static hosting exposes the prototype source and fictional seed data.

## Product notes and test plan

See [product specification](docs/PRODUCT_SPEC.md) and [testing guide](docs/TESTING.md).

Run automated checks with `npm test` (requires Node 20+, no npm dependencies).

## Suggested production architecture

| Layer | Recommendation | Why |
| --- | --- | --- |
| Frontend | React + TypeScript + Vite | Component isolation, maintainability, reusable forms, type safety |
| Styling | Tailwind CSS + a carefully selected accessible component system | Fast to develop consistent mobile-first interfaces |
| API & database | Supabase (PostgreSQL) | Managed relational data, authentication and row-level security |
| Roles | Supabase Auth with enforced organisation/tenant permissions | Real multi-user accounts and tenant isolation |
| Automation | Server-side scheduled jobs / background worker | Timed quote reminders and event-driven workflows |
| Email | Resend or Postmark, with consent and audit logging | Real transactional quote/reminder delivery |
| Documents | Server-generated PDFs with branded quote templates | Consistent customer-facing quotations |
| Hosting | Vercel or Netlify for frontend; hosted backend and data | Managed deployment and staging environments |
| Monitoring | Sentry + audit logs + database backups | Reliability and accountability |

For a business with Microsoft 365 licensing, Power Apps, Power Automate, Dataverse/SharePoint and Power BI may be a suitable **alternative** to a custom web app, depending on per-user costs and integration requirements.

## Before taking paying customers

- Authenticate users and implement strict per-company multi-tenancy with database row-level security.
- Agree lawful basis, UK GDPR privacy notices, data retention/deletion, DPAs and hosting location.
- Validate forms server-side; introduce authorisation, rate-limiting, secrets management and audit trails.
- Add job calendar, quote items/VAT logic, branded PDF, email delivery, follow-up rules, team roles, activity history, backups and automated tests.
- Verify that any real follow-up outreach complies with applicable direct-marketing rules.
- Define scope, support, SLAs and ownership in contracts.

## Suggested backlog

1. Customer discovery with 5–10 local service businesses; find the most requested workflow.
2. Real database, login and per-organisation workspaces.
3. Detailed quote builder with line items, VAT and PDF/email delivery.
4. Scheduling calendar, assignment, reminders and mobile technician view.
5. Enquiry capture form embedded in each business's existing website.
6. Two-way email and Outlook/Microsoft 365 integration.
7. Client portal with quote acceptance and approval records.
8. Automated regression, security and accessibility testing before launch.

## IP and licensing

No license has been granted by default. Before putting the code into production or bringing in collaborators, agree IP ownership among the founders and select a repository license deliberately.
