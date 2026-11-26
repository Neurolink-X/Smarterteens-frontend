import {test,expect} from "@playwright/test";
import {randomUUID} from "node:crypto";
import {databaseOrigin,isLocalQa} from "../lib/server/database-config.mjs";
const base="http://localhost:3000";
const required=["STAGING_SUPABASE_URL","STAGING_SUPABASE_PUBLISHABLE_KEY","STAGING_OWNER_A_EMAIL","STAGING_OWNER_A_PASSWORD","STAGING_OWNER_B_EMAIL","STAGING_OWNER_B_PASSWORD"];
function config(){
 for(const k of required)if(!process.env[k])throw new Error("Missing isolated staging configuration: "+k);
 const origin=databaseOrigin(process.env.STAGING_SUPABASE_URL);
 if(!isLocalQa()&&origin!=="https://"+process.env.STAGING_DB_REF+".supabase.co")throw new Error("Staging project identity mismatch");
 if(process.env.SUPABASE_URL!==process.env.STAGING_SUPABASE_URL||process.env.SUPABASE_PUBLISHABLE_KEY!==process.env.STAGING_SUPABASE_PUBLISHABLE_KEY)throw new Error("Application not configured against isolated staging");
 if(process.env.STAGING_OWNER_A_EMAIL===process.env.STAGING_OWNER_B_EMAIL)throw new Error("Two independent owners required");
 return {url:origin,key:process.env.STAGING_SUPABASE_PUBLISHABLE_KEY};
}
async function rawAuth(c,email,password){const r=await fetch(c.url+"/auth/v1/token?grant_type=password",{method:"POST",headers:{apikey:c.key,"Content-Type":"application/json"},body:JSON.stringify({email,password}),redirect:"error",signal:AbortSignal.timeout(10000)});expect(r.status,"Direct staging authentication").toBe(200);const s=await r.json();expect(Boolean(s.access_token&&s.user?.email_confirmed_at&&!s.user.is_anonymous)).toBe(true);return s;}
async function raw(c,token,table,query="",method="GET",body){return fetch(c.url+"/rest/v1/"+table+"?"+query,{method,headers:{apikey:c.key,Authorization:"Bearer "+token,Prefer:"return=representation",...(body?{"Content-Type":"application/json"}:{})},body:body?JSON.stringify(body):undefined,redirect:"error",signal:AbortSignal.timeout(10000)});}
const req=(page,method,data)=>page.request.fetch(base+"/api/v2/workspace",{method,headers:{Origin:base},...(data?{data}:{}),maxRedirects:0});
async function save(page,kind,record){const r=await req(page,"POST",{kind,record});expect(r.status(),kind+" create").toBe(201);return (await r.json()).record;}
async function login(page,email,password){await page.goto("/workspace");await page.getByLabel("Email",{exact:true}).fill(email);await page.getByLabel("Password",{exact:true}).fill(password);await page.getByRole("button",{name:"Sign in",exact:true}).click();await expect(page.getByRole("button",{name:"Sign out"})).toBeVisible({timeout:20000});const r=await req(page,"GET");expect(r.status()).toBe(200);expect(r.headers()["cache-control"]).toContain("no-store");const d=await r.json();expect(Boolean(d.institute?.id),"Preprovisioned synthetic institute").toBe(true);return d;}
test("two actual staging owners: browser → API → DB → UI, tenant and role boundaries",async({browser})=>{
 test.setTimeout(120000);const c=config();const [a,b]=await Promise.all([browser.newContext({baseURL:base}),browser.newContext({baseURL:base})]);
 const emailA=process.env.STAGING_OWNER_A_EMAIL,pwA=process.env.STAGING_OWNER_A_PASSWORD,emailB=process.env.STAGING_OWNER_B_EMAIL,pwB=process.env.STAGING_OWNER_B_PASSWORD;
 const code="QA-"+randomUUID().slice(0,12);
 try{
  const p=await a.newPage(),q=await b.newPage();const [ad,bd,authA,authB]=await Promise.all([login(p,emailA,pwA),login(q,emailB,pwB),rawAuth(c,emailA,pwA),rawAuth(c,emailB,pwB)]);
  const marker=await raw(c,authA.access_token,"st_qa_environment","id=eq.1");expect(marker.status,"Dedicated staging-only marker").toBe(200);expect(await marker.json()).toEqual([{id:1,purpose:"synthetic-staging-only"}]);
  expect(ad.institute.id).not.toBe(bd.institute.id);expect(ad.institute.owner_id).toBe(authA.user.id);expect(bd.institute.owner_id).toBe(authB.user.id);
  const form=p.locator("form").filter({has:p.getByRole("heading",{name:"Admission enquiry",exact:true})});
  await form.getByLabel("Synthetic enquiry code").fill(code);await form.getByLabel("Learning track").selectOption("class11");
  await form.getByRole("button",{name:"Save admission enquiry"}).click();await expect(p.getByText("Record saved.",{exact:true})).toBeVisible({timeout:20000});
  const getA=await req(p,"GET");expect(getA.status()).toBe(200);const admission=(await getA.json()).records.admission.find(x=>x.code===code);expect(Boolean(admission)).toBe(true);
  const direct=await raw(c,authA.access_token,"st_admissions","id=eq."+admission.id);expect(direct.status).toBe(200);expect((await direct.json()).map(x=>x.id)).toEqual([admission.id]);
  await p.locator("li").filter({hasText:code}).getByLabel("Status").selectOption("contacted");await expect(p.getByText("Admission status saved.")).toBeVisible({timeout:20000});
  const updated=await raw(c,authA.access_token,"st_admissions","id=eq."+admission.id);expect((await updated.json())[0].status).toBe("contacted");
  expect((await req(p,"PATCH",{kind:"admission",id:admission.id,expected:"new",status:"closed"})).status()).toBe(409);
  const other=await req(q,"GET");expect(other.status()).toBe(200);expect((await other.json()).records.admission.some(x=>x.id===admission.id)).toBe(false);
  expect((await req(q,"PATCH",{kind:"admission",id:admission.id,expected:"contacted",status:"closed"})).status()).toBe(409);
  const deniedRead=await raw(c,authB.access_token,"st_admissions","id=eq."+admission.id);expect(deniedRead.status).toBe(200);expect(await deniedRead.json()).toEqual([]);
  const deniedInsert=await raw(c,authB.access_token,"st_admissions","","POST",{institute_id:ad.institute.id,code:code+"-X",track:"class11"});expect([401,403]).toContain(deniedInsert.status);
  const deniedPatch=await raw(c,authB.access_token,"st_admissions","id=eq."+admission.id,"PATCH",{status:"closed"});expect(deniedPatch.status).toBe(200);expect(await deniedPatch.json()).toEqual([]);
  const batch=await save(p,"batch",{name:code,institute_id:bd.institute.id});expect(batch.institute_id).toBe(ad.institute.id);
  const learner=await save(p,"learner",{batch_id:batch.id,code});
  expect((await req(q,"POST",{kind:"learner",record:{batch_id:batch.id,code:code+"-B"}})).status()).toBe(409);
  const day=new Date().toISOString().slice(0,10);
  const attendance=await save(p,"attendance",{learner_id:learner.id,day,status:"present"});
  expect((await req(p,"POST",{kind:"attendance",record:{learner_id:learner.id,day,status:"present"}})).status()).toBe(409);
  const invoice=await save(p,"invoice",{learner_id:learner.id,description:code,amount_paise:12345,due_on:day});
  expect((await req(q,"POST",{kind:"receipt",record:{invoice_id:invoice.id,method:"cash"}})).status()).toBe(404);
  const receipt=await save(p,"receipt",{invoice_id:invoice.id,method:"cash",amount_paise:1});expect(receipt.amount_paise).toBe(12345);
  expect((await req(p,"POST",{kind:"receipt",record:{invoice_id:invoice.id,method:"cash"}})).status()).toBe(409);
  for(const [table,row] of [["st_batches",batch],["st_learners",learner],["st_attendance",attendance],["st_invoices",invoice],["st_receipts",receipt]]){
   const own=await raw(c,authA.access_token,table,"id=eq."+row.id);expect(own.status,table+" owner read").toBe(200);expect((await own.json()).map(x=>x.id)).toEqual([row.id]);
   const foreign=await raw(c,authB.access_token,table,"id=eq."+row.id);expect(foreign.status,table+" tenant RLS").toBe(200);expect(await foreign.json()).toEqual([]);
   const anonymous=await fetch(c.url+"/rest/v1/"+table+"?id=eq."+row.id,{headers:{apikey:c.key},redirect:"error",signal:AbortSignal.timeout(10000)});expect([401,403]).toContain(anonymous.status);
  }
  await p.reload();await expect(p.getByText(code+" · ₹123.45 · Recorded paid",{exact:false})).toBeVisible({timeout:20000});
  await p.getByRole("button",{name:"Sign out"}).click();await expect(p.getByRole("button",{name:"Sign in",exact:true})).toBeVisible();expect((await req(p,"GET")).status()).toBe(401);
 }finally{await a.close();await b.close();}
});

test("assigned member dashboards, direct RLS, revoked and cross-tenant access",async({browser})=>{
 test.setTimeout(120000);const c=config(),tenant=process.env.STAGING_TENANT_A,foreign=process.env.STAGING_TENANT_B;
 expect(Boolean(tenant&&foreign&&tenant!==foreign)).toBe(true);
 for(const [label,kinds,codes] of [["ADMIN",["batch","learner","attendance","admission","invoice","receipt"],["QA-ASSIGNED","QA-UNASSIGNED"]],["TEACHER",["batch","learner","attendance"],["QA-ASSIGNED"]],["FINANCE",["batch","learner","invoice","receipt"],["QA-ASSIGNED","QA-UNASSIGNED"]],["STUDENT",["learner","attendance"],["QA-ASSIGNED"]],["GUARDIAN",["learner","attendance"],["QA-ASSIGNED"]],["REVOKED",[],[]]]){
 const ctx=await browser.newContext({baseURL:base});try{
 const email=process.env["STAGING_"+label+"_EMAIL"],password=process.env["STAGING_"+label+"_PASSWORD"];expect(Boolean(email&&password)).toBe(true);
 const auth=await rawAuth(c,email,password);const page=await ctx.newPage();await page.goto("/portal");await page.getByLabel("Email",{exact:true}).fill(email);await page.getByLabel("Password",{exact:true}).fill(password);await page.getByRole("button",{name:"Sign in",exact:true}).click();await expect(page.getByRole("button",{name:"Sign out"})).toBeVisible();
 const choices=await page.request.get(base+"/api/v2/portal");expect(choices.status()).toBe(200);
 const list=(await choices.json()).memberships;expect(list.map(x=>x.institute_id)).toEqual(label==="REVOKED"?[]:[tenant]);
 expect((await page.request.get(base+"/api/v2/portal?institute="+foreign)).status()).toBe(403);
 const r=await page.request.get(base+"/api/v2/portal?institute="+tenant);
 if(label==="REVOKED"){expect(r.status()).toBe(403);await expect(page.getByText("No active memberships.",{exact:false})).toBeVisible();}
 else{expect(r.status()).toBe(200);const d=await r.json();expect(Object.keys(d.records).sort()).toEqual([...kinds].sort());expect(d.records.learner.map(x=>x.code).filter(x=>codes.includes(x)).sort()).toEqual([...codes].sort());expect(d.records.learner.some(x=>x.code==="QA-FOREIGN")).toBe(false);if(!codes.includes("QA-UNASSIGNED"))expect(d.records.learner.some(x=>x.code==="QA-UNASSIGNED")).toBe(false);await page.getByRole("button",{name:"Open institute"}).click();await expect(page.getByRole("heading",{name:"Learner codes"})).toBeVisible();}
 const direct=await raw(c,auth.access_token,"st_learners","code=in.(QA-ASSIGNED,QA-UNASSIGNED,QA-FOREIGN)");expect(direct.status).toBe(200);expect((await direct.json()).map(x=>x.code).sort()).toEqual([...codes].sort());
 const invoice=await raw(c,auth.access_token,"st_invoices","institute_id=eq."+tenant);expect(invoice.status).toBe(200);if(!kinds.includes("invoice"))expect(await invoice.json()).toEqual([]);
 const write=await raw(c,auth.access_token,"st_batches","","POST",{institute_id:tenant,name:"QA unauthorized"});expect([401,403]).toContain(write.status);
 const escalate=await raw(c,auth.access_token,"st_memberships","institute_id=eq."+tenant+"&user_id=eq."+auth.user.id,"PATCH",{role:"institute_admin",active:true});expect([401,403]).toContain(escalate.status);
 }finally{await ctx.close();}
 }
});

test("teacher attendance insert is batch-scoped and other roles cannot write",async({browser})=>{
 const c=config(),tenant=process.env.STAGING_TENANT_A;
 const teacher=await rawAuth(c,process.env.STAGING_TEACHER_EMAIL,process.env.STAGING_TEACHER_PASSWORD);
 const guardian=await rawAuth(c,process.env.STAGING_GUARDIAN_EMAIL,process.env.STAGING_GUARDIAN_PASSWORD);
 const ctx=await browser.newContext({baseURL:base});try{const p=await ctx.newPage();await p.goto("/portal");await p.getByLabel("Email",{exact:true}).fill(process.env.STAGING_TEACHER_EMAIL);await p.getByLabel("Password",{exact:true}).fill(process.env.STAGING_TEACHER_PASSWORD);await p.getByRole("button",{name:"Sign in",exact:true}).click();await p.getByRole("button",{name:"Open institute"}).click();
 await p.getByLabel("Date",{exact:true}).fill("2026-11-27");await p.getByRole("button",{name:"Record attendance"}).click();await expect(p.getByText("Attendance recorded.",{exact:true})).toBeVisible();
 for(const learner of [process.env.STAGING_UNASSIGNED_LEARNER,process.env.STAGING_FOREIGN_LEARNER]){const r=await raw(c,teacher.access_token,"st_attendance","","POST",{institute_id:tenant,learner_id:learner,day:"2026-11-27",status:"present"});expect([401,403]).toContain(r.status);}
 const denied=await raw(c,guardian.access_token,"st_attendance","","POST",{institute_id:tenant,learner_id:process.env.STAGING_ASSIGNED_LEARNER,day:"2026-11-28",status:"present"});expect([401,403]).toContain(denied.status);
 }finally{await ctx.close();}
});
test("subscription quotes are immutable, idempotent and separately reviewed",async({browser})=>{
 const c=config(),a=await browser.newContext({baseURL:base}),b=await browser.newContext({baseURL:base}),r=await browser.newContext({baseURL:base});
 const call=(ctx,method,data)=>ctx.request.fetch(base+"/api/v2/subscription",{method,headers:{Origin:base},...(data?{data}:{}),maxRedirects:0});
 try{
 for(const [ctx,email,password] of [[a,process.env.STAGING_OWNER_A_EMAIL,process.env.STAGING_OWNER_A_PASSWORD],[b,process.env.STAGING_OWNER_B_EMAIL,process.env.STAGING_OWNER_B_PASSWORD],[r,process.env.STAGING_REVIEWER_EMAIL,process.env.STAGING_REVIEWER_PASSWORD]]){expect((await ctx.request.post(base+"/api/v2/session",{headers:{Origin:base},data:{email,password}})).status()).toBe(200);}
 const request={plan:"pro",months:2,request_key:randomUUID(),monthly_paise:1,institute_id:process.env.STAGING_TENANT_B};
 const res=await call(a,"POST",request);expect(res.status()).toBe(201);const q=(await res.json()).quote;expect(q.subtotal_paise).toBe(199800);expect(q.institute_id).toBe(process.env.STAGING_TENANT_A);
 const again=await call(a,"POST",request);expect(again.status()).toBe(200);expect((await again.json()).quote.id).toBe(q.id);
 expect((await call(a,"POST",{...request,months:3})).status()).toBe(409);
 expect((await (await call(b,"GET")).json()).quotes.some(x=>x.id===q.id)).toBe(false);
 expect((await call(a,"PATCH",{quote_id:q.id,decision:"approved"})).status()).toBe(403);
 const reviewerPage=await r.newPage();await reviewerPage.goto("/coaching/subscriptions");await reviewerPage.getByRole("button",{name:"Use existing session"}).click();await expect(reviewerPage.getByRole("heading",{name:"Platform commercial review"})).toBeVisible();
 await reviewerPage.getByRole("button",{name:"Approve quote"}).click();await expect(reviewerPage.getByText("Review recorded.",{exact:true})).toBeVisible();
 expect((await call(r,"PATCH",{quote_id:q.id,decision:"rejected"})).status()).toBe(409);
 const own=(await (await call(a,"GET")).json()).quotes.find(x=>x.id===q.id);expect(own.decision).toBe("approved");expect((await (await call(a,"GET")).json()).summary.approvedQuotePaise).toBe(199800);
 const auth=await rawAuth(c,process.env.STAGING_OWNER_A_EMAIL,process.env.STAGING_OWNER_A_PASSWORD);
 const forged=await raw(c,auth.access_token,"st_subscription_quotes","","POST",{institute_id:q.institute_id,plan_code:"pro",plan_version:1,monthly_paise:1,months:2,request_key:randomUUID()});expect([401,403]).toContain(forged.status);
 const mutate=await raw(c,auth.access_token,"st_subscription_quotes","id=eq."+q.id,"PATCH",{months:12});expect([401,403]).toContain(mutate.status);
 const platform=await rawAuth(c,process.env.STAGING_REVIEWER_EMAIL,process.env.STAGING_REVIEWER_PASSWORD);const learner=await raw(c,platform.access_token,"st_learners");expect(await learner.json()).toEqual([]);
 }finally{await a.close();await b.close();await r.close();}
});
