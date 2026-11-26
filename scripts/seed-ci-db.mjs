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
for(const name of ["bootstrap","owner-pilot-admissions","owner-pilot-performance","staging-qa-marker"]){
 execFileSync("psql",[db.href,"-v","ON_ERROR_STOP=1","-f","db/"+name+".sql"],{stdio:["ignore","ignore","pipe"]});
}
async function call(path,body,apiKey,token){
 const r=await fetch(url+path,{method:"POST",headers:{apikey:apiKey,...(token?{Authorization:"Bearer "+token}:{}),"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(body),redirect:"error",signal:AbortSignal.timeout(15000)});
 if(!r.ok)throw Error("Local fixture request failed: "+path+" HTTP "+r.status);
 return r.json();
}
const values={STAGING_SUPABASE_URL:url,STAGING_SUPABASE_PUBLISHABLE_KEY:key,SUPABASE_URL:url,SUPABASE_PUBLISHABLE_KEY:key,ST_QA_LOCAL:"1"};
for(const label of ["A","B"]){
 const email="qa-"+label.toLowerCase()+"@example.test",password=randomBytes(24).toString("hex");
 console.log("::add-mask::"+password);
 const user=await call("/auth/v1/admin/users",{email,password,email_confirm:true},admin,admin.startsWith("eyJ")?admin:undefined);
 const auth=await call("/auth/v1/token?grant_type=password",{email,password},key);
 if(!auth.access_token||!user.id||auth.user?.id!==user.id||!auth.user.email_confirmed_at)throw Error("Verified local owner fixture failed");
 const rows=await call("/rest/v1/st_institutes",{owner_id:user.id,name:"QA Institute "+label},key,auth.access_token);
 if(!rows[0]?.id)throw Error("Tenant fixture failed");
 values["STAGING_OWNER_"+label+"_EMAIL"]=email;values["STAGING_OWNER_"+label+"_PASSWORD"]=password;
}
appendFileSync(process.env.GITHUB_ENV,Object.entries(values).map(([k,v])=>k+"="+v+"\n").join(""));
console.log("Isolated real Postgres/Auth fixtures provisioned; no hosted access.");
