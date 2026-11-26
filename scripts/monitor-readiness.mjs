import {appendFileSync} from "node:fs";
import {pathToFileURL} from "node:url";
export function monitorOrigin(value){
 const u=new URL(value);if(u.protocol!=="https:"||u.username||u.password||u.port||u.pathname!=="/"||u.search||u.hash||! /^[a-z0-9][a-z0-9.-]*\.[a-z]{2,}$/i.test(u.hostname)||u.hostname.endsWith(".local"))throw new RangeError("Use a verified public HTTPS production origin");
 return u.origin;
}
export async function check(origin,request=fetch){
 const url=monitorOrigin(origin);
 const results=[];
 for(const [path,expected] of [["/api/health","ok"],["/api/ready","ready"]]){
  const start=performance.now();
  try{const r=await request(url+path,{redirect:"error",cache:"no-store",signal:AbortSignal.timeout(12000),headers:{"Accept":"application/json"}});const body=await r.json();results.push({path,ok:r.ok&&body.status===expected,code:r.status,ms:Math.round(performance.now()-start)});}
  catch{results.push({path,ok:false,code:"unavailable",ms:Math.round(performance.now()-start)});}
 }
 return results;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const origin=process.env.SMARTERTEENS_HEALTH_ORIGIN;
 if(!origin)throw Error("Set SMARTERTEENS_HEALTH_ORIGIN to the verified production origin before running monitoring.");
 const results=await check(origin);
 const summary=["# SmarterTeens production health","",...results.map(r=>"- "+r.path+": "+(r.ok?"PASS":"FAIL")+" ("+r.code+", "+r.ms+" ms)")].join("\n");
 console.log(summary);if(process.env.GITHUB_STEP_SUMMARY)appendFileSync(process.env.GITHUB_STEP_SUMMARY,summary+"\n");if(results.some(r=>!r.ok))process.exitCode=1;
}
