// Creates real verified users on a fresh, isolated local Supabase stack. No hosted credentials.
import {readFileSync,appendFileSync} from "node:fs";
import {execFileSync} from "node:child_process";
import {randomBytes} from "node:crypto";
import {databaseOrigin,isLocalQa} from "../lib/server/database-config.mjs";
if(!isLocalQa()||!process.env.GITHUB_ENV)throw Error("CI loopback setup only");
const status=JSON.parse(readFileSync(process.argv[2],"utf8"));
const url=databaseOrigin(status.API_URL);
const db=new URL(status.DB_URL);
if(db.protocol!=="postgresql:"||db.hostname!=="127.0.0.1"||db.port!=="54322"||db.pathname!=="/postgres")throw Error("Refusing non-local SQL");
const key=status.ANON_KEY||status.PUBLISHABLE_KEY;
const admin=status.SERVICE_ROLE_KEY||status.SECRET_KEY;
if(!key||!admin)throw Error("Local auth keys missing");
for(const secret of [key,admin,db.password])if(secret)console.log("::add-mask::"+secret);
for(const name of ["bootstrap","owner-pilot-admissions","owner-pilot-performance","coaching-memberships","coaching-attendance-write","coaching-revenue","manual-upi","staging-qa-marker"]){
 execFileSync("psql",[db.href,"-v","ON_ERROR_STOP=1","-f","db/"+name+".sql"],{stdio:["ignore","ignore","pipe"]});
}
async function call(path,body,apiKey,token){
 const r=await fetch(url+path,{method:"POST",headers:{apikey:apiKey,...(token?{Authorization:"Bearer "+token}:{}),"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(body),redirect:"error",signal:AbortSignal.timeout(15000)});
 if(!r.ok)throw Error("Local fixture request failed: "+path+" HTTP "+r.status);
 return r.json();
}
const values={STAGING_SUPABASE_URL:url,STAGING_SUPABASE_PUBLISHABLE_KEY:key,SUPABASE_URL:url,SUPABASE_PUBLISHABLE_KEY:key,ST_QA_LOCAL:"1"};
let tenantA,tenantB,tokenA,tokenB;
for(const label of ["A","B"]){
 const email="qa-"+label.toLowerCase()+"@example.test",password=randomBytes(24).toString("hex");
 console.log("::add-mask::"+password);
 const user=await call("/auth/v1/admin/users",{email,password,email_confirm:true},admin,admin.startsWith("eyJ")?admin:undefined);
 const auth=await call("/auth/v1/token?grant_type=password",{email,password},key);
 if(!auth.access_token||!user.id||auth.user?.id!==user.id||!auth.user.email_confirmed_at)throw Error("Verified local owner fixture failed");
 const rows=await call("/rest/v1/st_institutes",{owner_id:user.id,name:"QA Institute "+label},key,auth.access_token);
 if(!rows[0]?.id)throw Error("Tenant fixture failed");
 if(label==="A"){tenantA=rows[0].id;tokenA=auth.access_token;}else{tenantB=rows[0].id;tokenB=auth.access_token;}
 values["STAGING_OWNER_"+label+"_EMAIL"]=email;values["STAGING_OWNER_"+label+"_PASSWORD"]=password;
}
const add=async(table,body,token)=>(await call("/rest/v1/"+table,body,key,token))[0];
const a=await add("st_batches",{institute_id:tenantA,name:"QA Assigned batch"},tokenA);
const b=await add("st_batches",{institute_id:tenantA,name:"QA Unassigned batch"},tokenA);
const c=await add("st_batches",{institute_id:tenantB,name:"QA Foreign batch"},tokenB);
const l=await add("st_learners",{institute_id:tenantA,batch_id:a.id,code:"QA-ASSIGNED"},tokenA);
const m=await add("st_learners",{institute_id:tenantA,batch_id:b.id,code:"QA-UNASSIGNED"},tokenA);
const n=await add("st_learners",{institute_id:tenantB,batch_id:c.id,code:"QA-FOREIGN"},tokenB);
for(const [tenant,learner,token] of [[tenantA,l,tokenA],[tenantA,m,tokenA],[tenantB,n,tokenB]]){
 await add("st_attendance",{institute_id:tenant,learner_id:learner.id,day:"2026-11-26",status:"present"},token);
 const invoice=await add("st_invoices",{institute_id:tenant,learner_id:learner.id,description:"QA "+learner.code,amount_paise:10000,due_on:"2026-11-26"},token);
 await add("st_receipts",{institute_id:tenant,invoice_id:invoice.id,amount_paise:10000,method:"cash"},token);
}
const uuid=v=>{if(!/^[0-9a-f-]{36}$/i.test(v))throw Error("Invalid generated UUID");return "'"+v+"'";};
for(const [label,role,active] of [["ADMIN","institute_admin",true],["TEACHER","teacher",true],["FINANCE","finance",true],["STUDENT","student",true],["GUARDIAN","guardian",true],["REVOKED","teacher",false]]){
 const email="qa-"+label.toLowerCase()+"@example.test",password=randomBytes(24).toString("hex");
 console.log("::add-mask::"+password);
 const u=await call("/auth/v1/admin/users",{email,password,email_confirm:true},admin,admin.startsWith("eyJ")?admin:undefined);
 let sql="insert into public.st_memberships(institute_id,user_id,role,active) values("+uuid(tenantA)+","+uuid(u.id)+",'"+role+"',"+active+");";
 if(role==="teacher")sql+="insert into public.st_teacher_batches(institute_id,user_id,batch_id) values("+uuid(tenantA)+","+uuid(u.id)+","+uuid(a.id)+");";
 if(role==="student"||role==="guardian")sql+="insert into public.st_learner_access(institute_id,user_id,learner_id,approved_at) values("+uuid(tenantA)+","+uuid(u.id)+","+uuid(l.id)+",now());";
 if(role==="guardian")sql+="insert into public.st_learner_access(institute_id,user_id,learner_id,approved_at,revoked_at) values("+uuid(tenantA)+","+uuid(u.id)+","+uuid(m.id)+",now(),now());";
 execFileSync("psql",[db.href,"-v","ON_ERROR_STOP=1","-c",sql],{stdio:["ignore","ignore","pipe"]});
 values["STAGING_"+label+"_EMAIL"]=email;values["STAGING_"+label+"_PASSWORD"]=password;
}
const reviewEmail="qa-reviewer@example.test",reviewPassword=randomBytes(24).toString("hex");
console.log("::add-mask::"+reviewPassword);
const reviewer=await call("/auth/v1/admin/users",{email:reviewEmail,password:reviewPassword,email_confirm:true},admin,admin.startsWith("eyJ")?admin:undefined);
execFileSync("psql",[db.href,"-v","ON_ERROR_STOP=1","-c","insert into public.st_platform_reviewers(user_id,active) values("+uuid(reviewer.id)+",true);"],{stdio:["ignore","ignore","pipe"]});
values.STAGING_REVIEWER_EMAIL=reviewEmail;values.STAGING_REVIEWER_PASSWORD=reviewPassword;values.STAGING_ASSIGNED_LEARNER=l.id;values.STAGING_UNASSIGNED_LEARNER=m.id;values.STAGING_FOREIGN_LEARNER=n.id;
values.ST_UPI_ENABLED="true";
// Test-only image is deliberately not a scannable payment QR; never use a real VPA here.
values.ST_UPI_CONFIG=JSON.stringify({payee:"Synthetic QA only",vpa:"synthetic@invalid",qr:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScLbtAAAAABJRU5ErkJggg=="+"A".repeat(20)});
values.STAGING_TENANT_A=tenantA;values.STAGING_TENANT_B=tenantB;
appendFileSync(process.env.GITHUB_ENV,Object.entries(values).map(([k,v])=>k+"="+v+"\n").join(""));
console.log("Isolated real Postgres/Auth fixtures provisioned; no hosted access.");
