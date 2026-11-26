import {getUser,requestDb,reply,handleError,ApiError} from "../../../../lib/pilot-server.mjs";
import {record} from "../../../../lib/server/api-contract";
import {readSmallJson} from "../../../../lib/http.mjs";
import {sameOrigin} from "../../../../lib/workspace.mjs";
import {id as validId} from "../../../../lib/server/tenant";
import {quoteInput,sameQuote,quoteSummary} from "../../../../lib/subscription.mjs";
export const runtime="nodejs";
async function access(token:string,id:string){
 const [owners,reviewers]=await Promise.all([requestDb("/rest/v1/st_institutes?select=id,name&owner_id=eq."+id+"&limit=1",{token}),requestDb("/rest/v1/st_platform_reviewers?select=user_id&user_id=eq."+id+"&active=eq.true&limit=1",{token})]);
 return {owner:owners[0]||null,reviewer:Boolean(reviewers[0])};
}
async function list(token:string,scope:string=""){
 const rows=await requestDb("/rest/v1/st_subscription_quotes?select=id,institute_id,plan_code,plan_version,monthly_paise,months,subtotal_paise,request_key,created_at&order=created_at.desc,id.desc&limit=101"+scope,{token});
 const ids=rows.slice(0,100).map((r:{id:string})=>r.id);
 const reviews=ids.length?await requestDb("/rest/v1/st_quote_reviews?select=quote_id,decision,created_at&quote_id=in.("+ids.join(",")+")",{token}):[];
 const quotes=rows.slice(0,100).map((r:{id:string})=>({...r,decision:reviews.find((v:{quote_id:string})=>v.quote_id===r.id)?.decision||"pending"}));
 return {quotes,hasMore:rows.length>100,summary:quoteSummary(quotes)};
}
export async function GET():Promise<Response>{try{
 const {token,id}=await getUser(),a=await access(token,id);
 if(!a.owner&&!a.reviewer)throw new ApiError(403,"Subscription access denied");
 const plans=await requestDb("/rest/v1/st_plan_versions?select=plan_code,version,monthly_paise&available=eq.true&order=monthly_paise.asc",{token});
 return reply({owner:a.owner,reviewer:a.reviewer,plans,...await list(token,a.reviewer?"":"&institute_id=eq."+a.owner.id)});
}catch(e){return handleError(e);}}
export async function POST(req:Request):Promise<Response>{if(!sameOrigin(req))return reply({error:"Origin not permitted"},403);try{
 const {token,id}=await getUser(),a=await access(token,id);if(!a.owner)throw new ApiError(403,"Owner required");
 const input=quoteInput(record(await readSmallJson(req)));
 const lookup="/rest/v1/st_subscription_quotes?select=*&institute_id=eq."+a.owner.id+"&request_key=eq."+input.request_key+"&limit=1";
 const prior=await requestDb(lookup,{token});if(prior[0]){if(!sameQuote(prior[0],input))throw new ApiError(409,"Request key already used for another quote");return reply({quote:prior[0]});}
 const plans=await requestDb("/rest/v1/st_plan_versions?select=plan_code,version,monthly_paise&available=eq.true&plan_code=eq."+input.plan+"&limit=1",{token});
 const p=plans[0];if(!p)throw new ApiError(409,"Plan no longer available");
 try{const rows=await requestDb("/rest/v1/st_subscription_quotes",{token,method:"POST",representation:true,body:{institute_id:a.owner.id,plan_code:p.plan_code,plan_version:p.version,monthly_paise:p.monthly_paise,months:input.months,request_key:input.request_key}});return reply({quote:rows[0]},201);}
 catch(e){if(e instanceof ApiError&&e.status===409){const rows=await requestDb(lookup,{token});if(rows[0]&&sameQuote(rows[0],input))return reply({quote:rows[0]});}throw e;}
}catch(e){return handleError(e);}}
export async function PATCH(req:Request):Promise<Response>{if(!sameOrigin(req))return reply({error:"Origin not permitted"},403);try{
 const {token,id}=await getUser(),a=await access(token,id);if(!a.reviewer)throw new ApiError(403,"Platform reviewer required");
 const input=record(await readSmallJson(req)),quoteId=validId(input.quote_id);
 if(input.decision!=="approved"&&input.decision!=="rejected")throw new RangeError("Invalid decision");
 const rows=await requestDb("/rest/v1/st_subscription_quotes?select=id&id=eq."+quoteId+"&limit=1",{token});if(!rows[0])throw new ApiError(404,"Quote not found");
 await requestDb("/rest/v1/st_quote_reviews?select=quote_id,decision,created_at",{token,method:"POST",representation:true,body:{quote_id:quoteId,reviewer_id:id,decision:input.decision}});
 return reply({recorded:true});
}catch(e){return handleError(e);}}
