import {record,text} from "./api-contract";
export type TenantContext = Readonly<{instituteId:string;userId:string;role:"owner"}>;
const uuidPattern=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export function id(value:unknown):string {const v=text(value,36);if(!uuidPattern.test(v))throw new RangeError("Invalid identifier");return v;}
export function ownerContext(userId:unknown, institute:unknown):TenantContext {
 const user=id(userId), row=record(institute);
 if(row.owner_id!==user)throw new RangeError("Tenant ownership mismatch");
 return Object.freeze({instituteId:id(row.id),userId:user,role:"owner"});
}
export function scopedQuery(context:TenantContext, extra:Record<string,string>={}):string{
 const query=new URLSearchParams({select:"*",...extra,institute_id:"eq."+id(context.instituteId)});
 return query.toString();
}
export function tenantRecord(context:TenantContext,input:unknown):Record<string,unknown> {
 const {institute_id:_tenant,owner_id:_owner,user_id:_user,...rest}=record(input);
 return {...rest,institute_id:id(context.instituteId)};
}
