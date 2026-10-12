// Fictional data only. CSO Business Hub is a browser-only demonstration, not a CRM backend.
export const STORAGE_KEY = 'cso-business-hub-v1';
export const addDays = (days, base = new Date()) => { const d = new Date(base); d.setDate(d.getDate() + days); return d.toISOString(); };
export const dateOnly = (iso) => iso ? String(iso).slice(0,10) : '';
const names = [
  ['Olivia Turner','Turner Property Services','olivia@turner-demo.example','07700 900101'],
  ['James Patel','Northside Electrical','james@northside-demo.example','07700 900102'],
  ['Emma Wright','Wright & Co Offices','emma@wright-demo.example','07700 900103'],
  ['Daniel Brooks','Brooks Developments','daniel@brooks-demo.example','07700 900104'],
  ['Sophie Clarke','Clarke Lettings','sophie@clarke-demo.example','07700 900105'],
  ['Thomas Reid','Westmoor Estates','tom@westmoor-demo.example','07700 900106'],
  ['Grace Mitchell','Mitchell Dental','grace@mitchell-demo.example','07700 900107'],
  ['Oliver King','Kingswood Retail','oliver@kingswood-demo.example','07700 900108'],
  ['Amelia Scott','Huddersfield Kitchens','amelia@kitchens-demo.example','07700 900109'],
  ['Harry Wilson','Wilson Commercial','harry@wilson-demo.example','07700 900110'],
  ['Isla Foster','Foster Homecare','isla@foster-demo.example','07700 900111'],
  ['Noah Bennett','Bennett Storage','noah@bennett-demo.example','07700 900112'],
  ['Mia Hughes','Hughes Hospitality','mia@hughes-demo.example','07700 900113'],
  ['Leo Robinson','Robinson Workspace','leo@robinson-demo.example','07700 900114']
];
const services = ['Commercial office refit','Electrical inspection','Annual maintenance contract','Kitchen installation','Property maintenance','Emergency callout','Safety compliance checks','Lighting installation','Site repairs','Office refurbishment','Heating maintenance','Access control installation','Commercial cleaning','Boiler service'];
const sources = ['Website','Referral','Phone','Email','Website','Referral','Email','Phone','Website','Referral','Website','Phone','Referral','Email'];
const enquiryStatuses = ['Qualified','Contacted','Quoted','Quoted','Quoted','Quoted','Quoted','Quoted','Quoted','Quoted','New','New','New','Contacted'];
export function createDemoData(){
  const enquiries = names.map(([contact,company,email,phone],i)=>({
    id: `ENQ-${String(1001+i)}`, contact, company, email, phone,
    service: services[i], source: sources[i], status:enquiryStatuses[i],
    value:[2400,680,4200,1750,980,350,1200,2850,5400,3400,650,1100,2100,780][i],
    createdAt:addDays(-[24,21,18,17,16,13,12,10,9,8,5,3,2,1][i]),
    note: ['Looking for a dependable local team','Requested a site visit','Budget to be approved','Looking to start this month'][i%4]
  }));
  const quoteValues = [2400,680,4200,1750,980,350,1200,2850,5400,3400];
  const quoteStatuses = ['Accepted','Accepted','Accepted','Accepted','Accepted','Completed','Sent','Sent','Sent','Declined'];
  // Quotes are intentionally in mixed states to demonstrate real workflows.
  const quotes = enquiries.slice(0,10).map((e,i)=>({
    id:`QUO-${String(2001+i)}`, enquiryId:e.id, customer:e.contact, company:e.company,
    title:e.service, amount:quoteValues[i], status: quoteStatuses[i],
    createdAt:addDays(-[21,19,16,14,12,11,10,8,2,6][i]),
    lastFollowUpAt: i === 7 ? addDays(-7):null,
    validUntil:addDays([9,11,14,13,20,8,16,11,23,15][i]),
    description:'Professional service delivered in line with the agreed scope, with scheduling confirmed upon acceptance.'
  }));
  const jobStatuses=['Completed','Completed','In progress','Scheduled','Scheduled','Completed'];
  const jobs = quotes.slice(0,6).map((q,i)=>({
    id:`JOB-${String(3001+i)}`, quoteId:q.id, company:q.company,
    customer:q.customer, title:q.title, amount:q.amount,
    status:jobStatuses[i], scheduledFor:addDays([-8,-4,1,3,7,-2][i]),
    assignee:['Alex Morgan','Sam Taylor','Alex Morgan','Jordan Lee','Sam Taylor','Jordan Lee'][i],
    createdAt:q.createdAt
  }));
  const activities=[
    {id:'ACT-1',type:'quote',description:'Quote sent to Kingswood Retail',at:addDays(-0.2)},
    {id:'ACT-2',type:'enquiry',description:'New enquiry from Robinson Workspace',at:addDays(-0.7)},
    {id:'ACT-3',type:'job',description:'Job scheduled for Clarke Lettings',at:addDays(-1.2)},
    {id:'ACT-4',type:'quote',description:'Quote accepted by Westmoor Estates',at:addDays(-3.3)},
    {id:'ACT-5',type:'enquiry',description:'New enquiry from Hughes Hospitality',at:addDays(-3.9)}
  ];
  return {version:1, settings:{businessName:'Northstar Services', businessType:'Property & maintenance', currency:'GBP', followUpDays:3}, enquiries, quotes, jobs, activities};
}
export function loadState(){
  try {const stored=JSON.parse(localStorage.getItem(STORAGE_KEY));if(stored?.version === 1 && Array.isArray(stored.enquiries) && Array.isArray(stored.quotes) && Array.isArray(stored.jobs) && stored.settings) return stored;} catch {}
  return createDemoData();
}
export function saveState(state){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));return true;}catch{return false;}}
