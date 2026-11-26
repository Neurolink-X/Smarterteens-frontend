import {getUser,requestDb,reply,handleError,ApiError} from "../../../../../lib/pilot-server.mjs";
import {readSmallJson} from "../../../../../lib/http.mjs";
import {record} from "../../../../../lib/server/api-contract";
import {sameOrigin} from "../../../../../lib/workspace.mjs";
import {mergeProgress,progressInput} from "../../../../../lib/cloud-progress.mjs";
export const runtime="nodejs";
async function scope(){const u=await getUser();const rows=await requestDb("/rest/v1/st_learning_accounts?select=user_id&user_id=eq."+u.id+"&active=eq.true&limit=1",{token:u.token});if(!rows[0])throw new ApiError(403,"Cloud learning is invite-only; contact your administrator");return u;}
async function load(token:string,id:string){const rows=await requestDb("/rest/v1/st_cloud_progress?select=checks,revision,updated_at&user_id=eq."+id+"&limit=1",{token});return rows[0]||null;}
export async function GET():Promise<Response>{try{const {token,id}=await scope(),r=await load(token,id);return reply({progress:mergeProgress(r?.checks,{}),revision:r?.revision||0,updatedAt:r?.updated_at||null});}catch(e){return handleError(e);}}
export async function POST(req:Request):Promise<Response>{if(!sameOrigin(req))return reply({error:"Origin not permitted"},403);try{
 const {token,id}=await scope(),body=record(await readSmallJson(req)),incoming=progressInput(body.progress);
 for(let n=0;n<3;n++){const old=await load(token,id);const checks=mergeProgress(old?.checks,incoming);
 if(old&&JSON.stringify(mergeProgress(old.checks,{}))===JSON.stringify(checks))return reply({progress:checks,revision:old.revision,updatedAt:old.updated_at});
 try{const rows=old?await requestDb("/rest/v1/st_cloud_progress?user_id=eq."+id+"&revision=eq."+old.revision,{token,method:"PATCH",representation:true,body:{checks,revision:old.revision+1}}):await requestDb("/rest/v1/st_cloud_progress",{token,method:"POST",representation:true,body:{user_id:id,checks}});
 if(rows[0])return reply({progress:mergeProgress(rows[0].checks,{}),revision:rows[0].revision,updatedAt:rows[0].updated_at},old?200:201);
 }catch(e){if(!(e instanceof ApiError)||e.status!==409)throw e;}
 }throw new ApiError(409,"Progress changed concurrently; retry");
}catch(e){return handleError(e);}}
export async function DELETE(req:Request):Promise<Response>{if(!sameOrigin(req))return reply({error:"Origin not permitted"},403);try{const {token,id}=await scope();const body=record(await readSmallJson(req)),revision=body.revision;if(typeof revision!=="number"||!Number.isSafeInteger(revision)||revision<1)throw new RangeError("Refresh saved progress before clearing");const rows=await requestDb("/rest/v1/st_cloud_progress?user_id=eq."+id+"&revision=eq."+revision,{token,method:"DELETE",representation:true});if(!rows[0])throw new ApiError(409,"Progress changed; refresh before clearing");return reply({cleared:true});}catch(e){return handleError(e);}}
