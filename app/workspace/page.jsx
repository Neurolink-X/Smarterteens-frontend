"use client";
import {useEffect,useState} from "react";
import {toPaise} from "../../lib/workspace.mjs";
const labels={batch:"Batches",learner:"Learners",attendance:"Attendance",invoice:"Fee invoices",receipt:"Offline receipts"};
const today=()=>new Date().toLocaleDateString("en-CA",{timeZone:"Asia/Kolkata"});
const money=v=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR"}).format(v/100);
async function api(path,method="GET",body){const r=await fetch(path,{method,cache:"no-store",headers:body?{"Content-Type":"application/json"}:{},body:body?JSON.stringify(body):undefined});const data=await r.json();if(!r.ok){const error=new Error(data.error||"Request failed");error.status=r.status;throw error;}return data;}
export default function Workspace(){
 const [data,setData]=useState(null),[loading,setLoading]=useState(true),[busy,setBusy]=useState(false),[message,setMessage]=useState(""),[signedIn,setSignedIn]=useState(false);
 async function load(){try{const d=await api("/api/v2/workspace");setData(d);setSignedIn(true);}catch(e){setData(null);setSignedIn(false);setMessage(e.message);}finally{setLoading(false);}}
 useEffect(()=>{void load();},[]);
 async function submit(e,kind){e.preventDefault();if(busy)return;setBusy(true);setMessage("");const form=e.currentTarget;const values=Object.fromEntries(new FormData(form));
 try{
 if(kind==="login"){await api("/api/v2/session","POST",values);form.reset();await load();}
 else{if(kind==="invoice"){values.amount_paise=toPaise(values.rupees);delete values.rupees;}await api("/api/v2/workspace","POST",{kind,record:values});form.reset();await load();setMessage("Record saved.");}
 }catch(err){setMessage(err.message);if(err.status===401){setSignedIn(false);setData(null);}}finally{setBusy(false);}}
 async function logout(){setBusy(true);try{const r=await api("/api/v2/session","DELETE");setData(null);setSignedIn(false);setMessage(r.notice||"Signed out.");}catch(e){setMessage(e.message);}finally{setBusy(false);}}
 const input=(name,title,type="text",props={})=><label className="field">{title}<input name={name} type={type} required {...props}/></label>;
 const select=(name,title,items)=><label className="field">{title}<select name={name} required defaultValue=""><option value="" disabled>Choose…</option>{items.map(([id,label])=><option key={id} value={id}>{label}</option>)}</select></label>;
 const form=(kind,title,children)=><form className="lab" onSubmit={e=>submit(e,kind)}><h2>{title}</h2>{children}<button disabled={busy} type="submit">Save {title.toLowerCase()}</button></form>;
 const rows=data?.records||{};const batches=rows.batch||[],learners=rows.learner||[],invoices=rows.invoice||[],receipts=rows.receipt||[];const paid=new Set(receipts.map(r=>r.invoice_id));const learnerName=id=>learners.find(x=>x.id===id)?.code||"Learner outside displayed records";
 return <section className="section"><p className="eyebrow">COACHING OS · OWNER PILOT</p><h1>Institute workspace</h1><p>Invite-only pilot. Use synthetic learner codes, not student names or other personal details. Offline fee records only; no payment is collected.</p><p role="status" aria-live="polite">{message}</p>
 {loading?<p>Checking session…</p>:!signedIn?<form className="lab" onSubmit={e=>submit(e,"login")}><h2>Verified owner sign-in</h2><p>An administrator must first provision a verified account. Public signup is not enabled.</p>{input("email","Email","email",{autoComplete:"username",maxLength:254})}{input("password","Password","password",{autoComplete:"current-password",minLength:8,maxLength:256})}<button disabled={busy}>Sign in</button></form>:<>
 <button onClick={logout} disabled={busy}>Sign out</button>
 {!data?.institute?form("institute","Institute",input("name","Institute name","text",{minLength:2,maxLength:100})):<>
 <h2>{data.institute.name}</h2><div className="grid">{Object.entries(labels).map(([k,label])=><article key={k}><h3>{label}</h3><strong className="amount">{(rows[k]||[]).length}</strong><p>Displayed records (up to 100)</p></article>)}</div>
 {data.hasMore&&<p role="alert">More records exist. Dashboard shows the latest 100 per category only; full reporting is not available yet.</p>}
 <div className="grid">
 {form("batch","Batch",input("name","Batch name","text",{minLength:2,maxLength:80}))}
 {batches.length>0&&form("learner","Learner",<>{input("code","Synthetic learner code","text",{pattern:"[A-Za-z0-9_-]{2,32}",maxLength:32})}{select("batch_id","Batch",batches.map(b=>[b.id,b.name]))}</>)}
 {learners.length>0&&form("attendance","Attendance",<>{select("learner_id","Learner",learners.map(l=>[l.id,l.code]))}{input("day","Date","date",{defaultValue:today()})}{select("status","Status",[["present","Present"],["absent","Absent"],["late","Late"]])}</>)}
 {learners.length>0&&form("invoice","Fee invoice",<>{select("learner_id","Learner",learners.map(l=>[l.id,l.code]))}{input("description","Description","text",{minLength:2,maxLength:100})}{input("rupees","Amount (₹)","text",{inputMode:"decimal",pattern:"[0-9]{1,7}(\\.[0-9]{1,2})?"})}{input("due_on","Due date","date",{defaultValue:today()})}</>)}
 {invoices.some(i=>!paid.has(i.id))&&form("receipt","Offline receipt",<>{select("invoice_id","Invoice",invoices.filter(i=>!paid.has(i.id)).map(i=>[i.id,learnerName(i.learner_id)+" · "+i.description+" · "+money(i.amount_paise)]))}{select("method","Already received via",[["cash","Cash"],["bank_transfer","Bank transfer"],["upi_offline","UPI (external)"]])}<p>Record a full payment already received. This does not initiate a payment.</p></>)}
 </div><h2>Recent records</h2>
 <div className="grid">{Object.entries(labels).map(([k,label])=><article key={k}><h3>{label}</h3>{!(rows[k]||[]).length?<p>No records yet.</p>:<ul>{rows[k].map(r=><li key={r.id}>{k==="batch"?r.name:k==="learner"?r.code:k==="attendance"?learnerName(r.learner_id)+" · "+r.day+" · "+r.status:k==="invoice"?r.description+" · "+money(r.amount_paise)+" · "+(paid.has(r.id)?"Recorded paid":"Payment not shown"):"Receipt "+r.id.slice(0,8)+" · "+money(r.amount_paise)+" · "+r.method}</li>)}</ul>}</article>)}</div>
 </>}
 </>}
 </section>;
}
