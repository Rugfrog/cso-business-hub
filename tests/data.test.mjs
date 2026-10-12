import test from 'node:test';
import assert from 'node:assert/strict';
import {createDemoData, addDays, dateOnly} from '../data.js';

test('seed data links every quote to an enquiry', () => {
  const data=createDemoData();
  const ids=new Set(data.enquiries.map(e=>e.id));
  assert.ok(data.enquiries.length>=10);
  assert.ok(data.quotes.length>=5);
  for(const q of data.quotes) assert.ok(ids.has(q.enquiryId),`${q.id} should have a valid enquiry`);
});
test('seed jobs only reference existing quotes when a quote id is present', () => {
  const data=createDemoData();
  const ids=new Set(data.quotes.map(q=>q.id));
  for(const job of data.jobs) if(job.quoteId) assert.ok(ids.has(job.quoteId));
});
test('demo data has unique record IDs', () => {
  const data=createDemoData();
  for(const key of ['enquiries','quotes','jobs']) {
    const ids=data[key].map(record=>record.id);
    assert.equal(ids.length,new Set(ids).size,`duplicate ${key} IDs`);
  }
});
test('seed reset returns independent objects', () => {
  const one=createDemoData();const two=createDemoData();
  one.enquiries[0].company='Changed';
  assert.notEqual(one.enquiries[0].company,two.enquiries[0].company);
});
test('dates can be formatted and shifted', () => {
  assert.equal(dateOnly('2026-10-12T12:00:00.000Z'),'2026-10-12');
  assert.ok(Number.isFinite(new Date(addDays(7)).getTime()));
});
