export const tables={batch:"st_batches",learner:"st_learners",attendance:"st_attendance",invoice:"st_invoices",receipt:"st_receipts",admission:"st_admissions"};
export const uuid=v=>typeof v==="string"&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
const requireId=v=>{if(!uuid(v))throw new RangeError("Choose a valid record");return v;};
const str=(v,max)=>{if(typeof v!=="string"||v.trim().length<2||v.trim().length>max)throw new RangeError("Invalid text");return v.trim();};
const day=v=>{if(typeof v!=="string"||!/^\d{4}-\d{2}-\d{2}$/.test(v)||v<"2000-01-01"||v>"2100-12-31")throw new RangeError("Invalid date");const d=new Date(v+"T00:00:00Z");if(!Number.isFinite(d.valueOf())||d.toISOString().slice(0,10)!==v)throw new RangeError("Invalid date");return v;};
const choice=(v,options)=>{if(!options.includes(v))throw new RangeError("Invalid choice");return v;};
export function validateRecord(kind,body){
 if(!body||typeof body!=="object"||Array.isArray(body))throw new RangeError("Invalid record");
 switch(kind){
 case "institute":return {name:str(body.name,100)};
 case "batch":return {name:str(body.name,80)};
 case "learner":if(typeof body.code!=="string"||!/^[A-Za-z0-9_-]{2,32}$/.test(body.code))throw new RangeError("Use a non-identifying learner code");return {code:body.code,batch_id:requireId(body.batch_id)};
 case "admission":if(typeof body.code!=="string"||!/^[A-Za-z0-9_-]{2,32}$/.test(body.code))throw new RangeError("Use a synthetic enquiry code");return {code:body.code,track:choice(body.track,["class11","class12","foundation","competitive","skills"])};
 case "attendance":return {learner_id:requireId(body.learner_id),day:day(body.day),status:choice(body.status,["present","absent","late"])};
 case "invoice":if(!Number.isSafeInteger(body.amount_paise)||body.amount_paise<100||body.amount_paise>100000000)throw new RangeError("Invalid amount");return {learner_id:requireId(body.learner_id),description:str(body.description,100),amount_paise:body.amount_paise,due_on:day(body.due_on)};
 case "receipt":return {invoice_id:requireId(body.invoice_id),method:choice(body.method,["cash","bank_transfer","upi_offline"])};
 default:throw new RangeError("Unknown record");
 }
}
export function toPaise(s){if(typeof s!=="string"||!/^\d{1,7}(\.\d{1,2})?$/.test(s))throw new RangeError("Enter rupees with up to two decimal places");const [a,b=""]=s.split(".");return Number(a)*100+Number(b.padEnd(2,"0"));}
export function sameOrigin(req){try{return new URL(req.headers.get("origin")).origin===new URL(req.url).origin;}catch{return false;}}
