import {getUser,requestDb,reply,handleError,ApiError} from "../../../../lib/pilot-server.mjs";
import {tables,validateRecord,sameOrigin} from "../../../../lib/workspace.mjs";
import {record} from "../../../../lib/server/api-contract";
import {readSmallJson} from "../../../../lib/http.mjs";
import {visibleKinds,selectMembership} from "../../../../lib/coaching-roles.mjs";
import {id as validId} from "../../../../lib/server/tenant";
export const runtime="nodejs";
type Kind=keyof typeof tables;
export async function GET(req:Request):Promise<Response>{
 try{
 const {token,id}=await getUser();
 const query=new URLSearchParams({select:"institute_id,user_id,role,active,st_institutes(name)",user_id:"eq."+id,active:"eq.true",order:"institute_id.asc",limit:"101"});
 const memberships=await requestDb("/rest/v1/st_memberships?"+query,{token});
 if(!Array.isArray(memberships)||memberships.length>100)throw new ApiError(409,"Membership list exceeds pilot capacity");
 const requested=new URL(req.url).searchParams.get("institute");
 const choices=memberships.map(m=>({institute_id:m.institute_id,role:m.role,name:m.st_institutes?.name||"Institute"}));
 if(!requested)return reply({memberships:choices});
 const instituteId=validId(requested);
 const membership=selectMembership(memberships,id,instituteId);
 if(!membership)throw new ApiError(403,"No active membership in this institute");
 const kinds=visibleKinds(membership.role) as readonly Kind[];
 const entries=await Promise.all(kinds.map(async kind=>{
 const scoped=new URLSearchParams({select:"*",institute_id:"eq."+instituteId,order:"created_at.desc,id.desc",limit:"101"});
 const rows=await requestDb("/rest/v1/"+tables[kind]+"?"+scoped,{token});
 return [kind,rows] as const;
 }));
 return reply({memberships:choices,institute:choices.find(m=>m.institute_id===instituteId),records:Object.fromEntries(entries.map(([kind,rows])=>[kind,rows.slice(0,100)])),hasMore:entries.some(([,rows])=>rows.length>100)});
 }catch(e){return handleError(e);}
}

export async function POST(req:Request):Promise<Response>{
 if(!sameOrigin(req))return reply({error:"Origin not permitted"},403);
 try{
 const {token,id}=await getUser(),body=record(await readSmallJson(req));const instituteId=validId(body.institute_id);
 const query=new URLSearchParams({select:"institute_id,user_id,role,active",institute_id:"eq."+instituteId,user_id:"eq."+id,active:"eq.true",limit:"1"});
 const members=await requestDb("/rest/v1/st_memberships?"+query,{token});
 const member=selectMembership(members,id,instituteId);if(!member||member.role!=="teacher"||body.kind!=="attendance")throw new ApiError(403,"Assigned teacher required");
 const data=validateRecord("attendance",record(body.record));
 const rows=await requestDb("/rest/v1/st_attendance",{token,method:"POST",representation:true,body:{...data,institute_id:instituteId}});
 return reply({record:rows[0]},201);
 }catch(e){return handleError(e);}
}
