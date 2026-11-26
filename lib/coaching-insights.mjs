export const admissionTracks={class11:"Class 11",class12:"Class 12",foundation:"Foundation",competitive:"Competition preparation",skills:"Future skills"};
export const admissionStatuses=["new","contacted","enrolled","closed"];
export function summarizeDisplayed(rows){
 const counts=Object.fromEntries(admissionStatuses.map(s=>[s,0]));
 for(const a of rows.admission||[])if(Object.hasOwn(counts,a.status))counts[a.status]++;
 const received=(rows.receipt||[]).reduce((n,r)=>n+r.amount_paise,0);
 const invoiced=(rows.invoice||[]).reduce((n,r)=>n+r.amount_paise,0);
 const receipts=new Set((rows.receipt||[]).map(r=>r.invoice_id));
 const unmatched=(rows.invoice||[]).filter(i=>!receipts.has(i.id)).reduce((n,i)=>n+i.amount_paise,0);
 const attendance={present:0,late:0,absent:0};
 for(const a of rows.attendance||[])if(Object.hasOwn(attendance,a.status))attendance[a.status]++;
 return {counts,received,invoiced,unmatched,attendance};
}
