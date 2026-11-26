import {requestDb} from "../../../lib/pilot-server.mjs";
import {json} from "../../../lib/server/api-contract";
export const dynamic="force-dynamic";
export const runtime="nodejs";
export async function GET():Promise<Response>{try{
 const result=await requestDb("/rest/v1/rpc/st_readiness",{method:"POST",body:{}});
 if(result!==true)throw new Error("Unexpected database readiness response");
 return json({status:"ready",database:"reachable"});
}catch{return json({status:"unavailable",database:"unavailable"},503);}}
