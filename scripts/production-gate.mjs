// Fail closed on Vercel production builds unless this exact main commit qualified.
if(process.env.VERCEL_ENV!=="production"){
 console.log("Preview/local build: production SHA gate not applicable.");
}else{
 const sha=process.env.VERCEL_GIT_COMMIT_SHA,ref=process.env.VERCEL_GIT_COMMIT_REF;
 if(!sha||!/^[a-f0-9]{40}$/.test(sha)||ref!=="main")throw Error("Production requires a verified main-branch Git commit");
 const endpoint=new URL("https://api.github.com/repos/Neurolink-X/Smarterteens-frontend/actions/workflows/validate.yml/runs");
 endpoint.search=new URLSearchParams({head_sha:sha,event:"push",branch:"main",per_page:"10"}).toString();
 const response=await fetch(endpoint,{headers:{Accept:"application/vnd.github+json","User-Agent":"SmarterTeens-Release-Gate"},redirect:"error",signal:AbortSignal.timeout(12000)});
 if(!response.ok)throw Error("Cannot confirm CI qualification; production blocked");
 const body=await response.json();
 const runs=(body.workflow_runs||[]).filter(r=>r.head_sha===sha&&r.head_branch==="main"&&r.event==="push").sort((a,b)=>b.run_number-a.run_number);
 if(runs[0]?.status!=="completed"||runs[0]?.conclusion!=="success")throw Error("Exact main commit has not passed full quality gates. Redeploy only after successful CI.");
 console.log("Production commit qualified: "+sha.slice(0,12));
}
