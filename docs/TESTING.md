# Testing

## Automated checks

Run `npm test` from the project root. Tests use the built-in Node.js test runner, no `npm install` required. The Check Business Hub workflow also runs these tests and JavaScript syntax checks on pushes and pull requests. GitHub's built-in Pages publishing workflow runs separately.

## Manual acceptance walkthrough

1. Go to **Enquiries**, add a new lead and check that it appears in the table.
2. Open it and create a quote. Mark it **Sent** and then **Accepted**.
3. Go to **Jobs** and check the linked job was created under **Scheduled**.
4. Open the job, change its status to **In progress** and check it moves column.
5. Open **Customers** and check the new customer shows linked records.
6. Go to **Analytics** and confirm the new lead is included.
7. Export the enquiries CSV; open it and check the newly created record exists.
8. In **Settings**, change the company name. Verify the sidebar and overview update.
9. Reload the page. All changes should persist if localStorage is allowed.
10. Reset sample data to return to the original demo state.
11. On a phone-sized viewport, use the mobile menu and complete steps 1–4.

## Limitations of tests

Automated Node.js tests validate seed-data integrity only. The prototype's critical create-enquiry → create-quote → accept-quote → create-job workflow has also been exercised in a headless browser during initial development on desktop and mobile. Add a Playwright browser test suite before production deployment.
