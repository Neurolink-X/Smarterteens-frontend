import {readSmallJson} from "../../../../lib/http.mjs";
import {tables,validateRecord,sameOrigin} from "../../../../lib/workspace.mjs";
import {requestDb,getUser,reply,handleError,ApiError} from "../../../../lib/pilot-server.mjs";
import {record} from "../../../../lib/server/api-contract";
import {id as validId,ownerContext,scopedQuery,tenantRecord,type TenantContext} from "../../../../lib/server/tenant";
export const runtime="nodejs";
type Kind=keyof typeof tables;
function isKind(v:unknown):v is Kind{return typeof v==="string"&&Object.hasOwn(tables,v);}
async function institute(token:string,id:string){const rows=await requestDb("/rest/v1/st_institutes?select=*&owner_id=eq."+encodeURIComponent(id)+"&limit=1",{token});return rows[0]||null;}
async function scoped(token:string,table:string,context:TenantContext,extra:Record<string,string>={}){
 return requestDb("/rest/v1/"+table+"?"+scopedQuery(context,extra),{token});
}
export async function GET():Promise<Response>{
 try{
 const {token,id}=await getUser();const own=await institute(token,id);if(!own)return reply({institute:null,records:{},hasMore:false});
 const context=ownerContext(id,own);
 const entries=await Promise.all(Object.entries(tables).map(async([kind,table])=>[kind,await scoped(token,table,context,{order:"created_at.desc",limit:"101"})] as const));
 return reply({institute:own,records:Object.fromEntries(entries.map(([k,rows])=>[k,rows.slice(0,100)])),hasMore:entries.some(([,rows])=>rows.length>100)});
 }catch(e:unknown){return handleError(e);}
}
export async function POST(req:Request):Promise<Response>{
 if(!sameOrigin(req))return reply({error:"Origin not permitted"},403);
 try{
 const {token,id}=await getUser();const body=record(await readSmallJson(req));const kind=body.kind;
 if(kind!=="institute"&&!isKind(kind))throw new RangeError("Unknown record");
 const data=record(validateRecord(kind,record(body.record)));const own=await institute(token,id);
 if(kind==="institute"){if(own)throw new ApiError(409,"Institute already exists");const rows=await requestDb("/rest/v1/st_institutes",{token,method:"POST",body:{...data,owner_id:id},representation:true});return reply({record:rows[0]},201);}
 if(!own)throw new ApiError(409,"Create institute first");
 const context=ownerContext(id,own);
 if(kind==="receipt"){const rows=await scoped(token,tables.invoice,context,{id:"eq."+String(data.invoice_id),limit:"1"});if(!rows[0])throw new ApiError(404,"Invoice not found");data.amount_paise=rows[0].amount_paise;}
 const rows=await requestDb("/rest/v1/"+tables[kind],{token,method:"POST",body:tenantRecord(context,data),representation:true});
 return reply({record:rows[0]},201);
 }catch(e:unknown){return handleError(e);}
}

export async function PATCH(req:Request):Promise<Response>{
 if(!sameOrigin(req))return reply({error:"Origin not permitted"},403);
 try{
 const {token,id}=await getUser();const body=record(await readSmallJson(req));
 const admissionId=validId(body.id);const statuses=["new","contacted","enrolled","closed"];
 if(body.kind!=="admission"||typeof body.expected!=="string"||typeof body.status!=="string"||!statuses.includes(body.expected)||!statuses.includes(body.status)||body.expected===body.status)throw new RangeError("Invalid admission status");
 const own=await institute(token,id);if(!own)throw new ApiError(404,"Institute not found");
 const context=ownerContext(id,own);
 const query=scopedQuery(context,{id:"eq."+admissionId,status:"eq."+body.expected});
 const rows=await requestDb("/rest/v1/st_admissions?"+query,{token,method:"PATCH",body:{status:body.status},representation:true});
 if(!rows[0])throw new ApiError(409,"Record unavailable or changed; refresh before retrying");
 return reply({record:rows[0]});
 }catch(e:unknown){return handleError(e);}
}
