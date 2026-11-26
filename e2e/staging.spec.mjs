import {test,expect} from "@playwright/test";
import {randomUUID} from "node:crypto";
const base="http://localhost:3000";
const required=["STAGING_SUPABASE_URL","STAGING_SUPABASE_PUBLISHABLE_KEY","STAGING_DB_REF","STAGING_OWNER_A_EMAIL","STAGING_OWNER_A_PASSWORD","STAGING_OWNER_B_EMAIL","STAGING_OWNER_B_PASSWORD"];
function config(){
 for(const k of required)if(!process.env[k])throw new Error("Missing isolated staging configuration: "+k);
 const u=new URL(process.env.STAGING_SUPABASE_URL),ref=process.env.STAGING_DB_REF;
 if(!/^[a-z0-9]{20}$/.test(ref)||u.origin!=="https://"+ref+".supabase.co"||u.pathname!=="/"||u.search||u.hash)throw new Error("Staging project identity mismatch");
 if(process.env.SUPABASE_URL!==process.env.STAGING_SUPABASE_URL||process.env.SUPABASE_PUBLISHABLE_KEY!==process.env.STAGING_SUPABASE_PUBLISHABLE_KEY)throw new Error("Application not configured against isolated staging");
 if(process.env.STAGING_OWNER_A_EMAIL===process.env.STAGING_OWNER_B_EMAIL)throw new Error("Two independent owners required");
 return {url:u.origin,key:process.env.STAGING_SUPABASE_PUBLISHABLE_KEY};
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
  await save(p,"attendance",{learner_id:learner.id,day,status:"present"});
  expect((await req(p,"POST",{kind:"attendance",record:{learner_id:learner.id,day,status:"present"}})).status()).toBe(409);
  const invoice=await save(p,"invoice",{learner_id:learner.id,description:code,amount_paise:12345,due_on:day});
  expect((await req(q,"POST",{kind:"receipt",record:{invoice_id:invoice.id,method:"cash"}})).status()).toBe(404);
  const receipt=await save(p,"receipt",{invoice_id:invoice.id,method:"cash",amount_paise:1});expect(receipt.amount_paise).toBe(12345);
  expect((await req(p,"POST",{kind:"receipt",record:{invoice_id:invoice.id,method:"cash"}})).status()).toBe(409);
  await p.reload();await expect(p.getByText(code+" · ₹123.45 · Recorded paid",{exact:false})).toBeVisible({timeout:20000});
  await p.getByRole("button",{name:"Sign out"}).click();await expect(p.getByRole("button",{name:"Sign in",exact:true})).toBeVisible();expect((await req(p,"GET")).status()).toBe(401);
 }finally{await a.close();await b.close();}
});
