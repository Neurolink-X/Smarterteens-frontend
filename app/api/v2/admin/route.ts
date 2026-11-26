import {getUser,requestDb,reply,handleError,ApiError} from "../../../../lib/pilot-server.mjs";
import {readSmallJson} from "../../../../lib/http.mjs";
import {record} from "../../../../lib/server/api-contract";
import {sameOrigin} from "../../../../lib/workspace.mjs";
import {id as validId} from "../../../../lib/server/tenant";
import {accountAction,directorySearch,readiness} from "../../../../lib/admin-governance.mjs";
export const runtime="nodejs";
export async function GET(req:Request):Promise<Response>{try{
 const {token}=await getUser(),p=new URL(req.url).searchParams,mode=p.get("mode")||"overview";
 if(mode==="users"){const search=directorySearch(p.get("search")||""),after=p.get("after");const rows=await requestDb("/rest/v1/rpc/st_admin_directory",{token,method:"POST",body:{search_text:search,after_id:after?validId(after):null}});return reply({users:rows.slice(0,50),next:rows.length>50?rows[49].id:null});}
 if(mode==="audit"){const rows=await requestDb("/rest/v1/rpc/st_admin_audit",{token,method:"POST",body:{}});return reply({events:rows});}
 if(mode==="overview"){const start=performance.now();const overview=await requestDb("/rest/v1/rpc/st_admin_overview",{token,method:"POST",body:{}});return reply({overview,health:readiness(true,performance.now()-start)});}
 throw new RangeError("Invalid mode");
}catch(e){return handleError(e);}}
export async function PATCH(req:Request):Promise<Response>{
 if(!sameOrigin(req))return reply({error:"Origin not permitted"},403);
 try{const {token}=await getUser(),body=accountAction(record(await readSmallJson(req)));const result=await requestDb("/rest/v1/rpc/st_admin_change_account",{token,method:"POST",body});return reply({account:result});}catch(e){return handleError(e);}
}
