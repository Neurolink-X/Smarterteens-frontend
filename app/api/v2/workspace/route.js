import {readSmallJson} from "../../../../lib/http.mjs";
import {tables,validateRecord,sameOrigin} from "../../../../lib/workspace.mjs";
import {requestDb,getUser,reply,handleError,ApiError} from "../../../../lib/pilot-server.mjs";
export const runtime="nodejs";
async function institute(token,id){const rows=await requestDb("/rest/v1/st_institutes?select=*&owner_id=eq."+encodeURIComponent(id)+"&limit=1",{token});return rows[0]||null;}
async function scoped(token,table,id,extra=""){return requestDb("/rest/v1/"+table+"?select=*&institute_id=eq."+encodeURIComponent(id)+extra,{token});}
export async function GET(){
 try{const {token,id}=await getUser();const own=await institute(token,id);if(!own)return reply({institute:null,records:{},hasMore:false});
 const entries=await Promise.all(Object.entries(tables).map(async ([kind,table])=>[kind,await scoped(token,table,own.id,"&order=created_at.desc&limit=101")]));
 return reply({institute:own,records:Object.fromEntries(entries.map(([k,rows])=>[k,rows.slice(0,100)])),hasMore:entries.some(([,rows])=>rows.length>100)});
 }catch(e){return handleError(e);}
}
export async function POST(req){
 if(!sameOrigin(req))return reply({error:"Origin not permitted"},403);
 try{const {token,id}=await getUser();const body=await readSmallJson(req);const kind=body?.kind;const data=validateRecord(kind,body?.record);const own=await institute(token,id);
 if(kind==="institute"){if(own)throw new ApiError(409,"Institute already exists");const rows=await requestDb("/rest/v1/st_institutes",{token,method:"POST",body:{...data,owner_id:id},representation:true});return reply({record:rows[0]},201);}
 if(!own)throw new ApiError(409,"Create institute first");
 if(kind==="receipt"){const rows=await scoped(token,tables.invoice,own.id,"&id=eq."+encodeURIComponent(data.invoice_id)+"&limit=1");if(!rows[0])throw new ApiError(404,"Invoice not found");data.amount_paise=rows[0].amount_paise;}
 const rows=await requestDb("/rest/v1/"+tables[kind],{token,method:"POST",body:{...data,institute_id:own.id},representation:true});
 return reply({record:rows[0]},201);
 }catch(e){return handleError(e);}
}
