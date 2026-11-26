import {getUser,requestDb,reply,handleError,ApiError} from "../../../../lib/pilot-server.mjs";
import {record} from "../../../../lib/server/api-contract";
import {readSmallJson} from "../../../../lib/http.mjs";
import {sameOrigin} from "../../../../lib/workspace.mjs";
import {id as validId} from "../../../../lib/server/tenant";
import {paymentConfig,normalizeRrn,finalPaise} from "../../../../lib/manual-upi.mjs";
export const runtime="nodejs";
async function scope(token:string,id:string,quoteId:string){
 const [quotes,owners,reviewers]=await Promise.all([requestDb("/rest/v1/st_subscription_quotes?select=id,institute_id&id=eq."+quoteId+"&limit=1",{token}),requestDb("/rest/v1/st_institutes?select=id&owner_id=eq."+id+"&limit=1",{token}),requestDb("/rest/v1/st_platform_reviewers?select=user_id&active=eq.true&user_id=eq."+id+"&limit=1",{token})]);
 if(!quotes[0])throw new ApiError(404,"Quote unavailable");
 const owner=owners[0]?.id===quotes[0].institute_id,reviewer=Boolean(reviewers[0])&&!owner;
 if(!owner&&!reviewer)throw new ApiError(403,"Payment access denied");
 const reviews=await requestDb("/rest/v1/st_quote_reviews?select=decision&quote_id=eq."+quoteId,{token});
 if(reviews[0]?.decision!=="approved")throw new ApiError(409,"Quote not approved");
 const payments=await requestDb("/rest/v1/st_payment_requests?select=id,quote_id,amount_paise,created_at&quote_id=eq."+quoteId,{token});
 return {owner,reviewer,payment:payments[0]||null};
}
async function details(token:string,paymentId:string){
 const claims=await requestDb("/rest/v1/st_upi_claims?select=id,rrn,created_at&payment_id=eq."+paymentId+"&order=created_at.desc,id.desc&limit=101",{token});
 const decisions=await requestDb("/rest/v1/st_upi_decisions?select=claim_id,decision,created_at&payment_id=eq."+paymentId+"&limit=101",{token});
 if(claims.length>100||decisions.length>100)throw new ApiError(409,"Payment history requires administrator reconciliation");
 return {claims:claims.map((c:{id:string})=>({...c,decision:decisions.find((d:{claim_id:string})=>d.claim_id===c.id)?.decision||"pending"})),verified:decisions.some((d:{decision:string})=>d.decision==="verified")};
}
export async function GET(req:Request):Promise<Response>{try{
 const {token,id}=await getUser(),quoteId=validId(new URL(req.url).searchParams.get("quote"));
 const s=await scope(token,id,quoteId);
 const d=s.payment?await details(token,s.payment.id):{claims:[],verified:false};
 const config=paymentConfig();
 return reply({...s,...d,enabled:Boolean(config),instructions:s.owner&&s.payment&&!d.verified?config:null});
}catch(e){return handleError(e);}}
export async function POST(req:Request):Promise<Response>{if(!sameOrigin(req))return reply({error:"Origin not permitted"},403);try{
 const {token,id}=await getUser(),body=record(await readSmallJson(req)),quoteId=validId(body.quote_id),s=await scope(token,id,quoteId);
 if(body.action==="request"){if(!s.reviewer)throw new ApiError(403,"Payment reviewer required");if(!paymentConfig())throw new ApiError(503,"Manual UPI not enabled");if(s.payment)throw new ApiError(409,"Final amount already recorded");if(body.confirmed!==true)throw new RangeError("Confirm final payable amount");const rows=await requestDb("/rest/v1/st_payment_requests",{token,method:"POST",representation:true,body:{quote_id:quoteId,amount_paise:finalPaise(body.amount_paise),reviewer_id:id}});return reply({payment:rows[0]},201);}
 if(body.action!=="claim"||!s.owner)throw new ApiError(403,"Owner payment claim required");
 if(!s.payment||!paymentConfig())throw new ApiError(409,"Payment instructions unavailable");
 const d=await details(token,s.payment.id);if(d.verified)throw new ApiError(409,"Payment already verified");
 const rrn=normalizeRrn(body.rrn),prior=d.claims.find((c:{rrn:string})=>c.rrn===rrn);if(prior)return reply({claim:prior});
 if(d.claims.some((c:{decision:string})=>c.decision==="pending"))throw new ApiError(409,"An existing payment claim is pending review");
 const rows=await requestDb("/rest/v1/st_upi_claims",{token,method:"POST",representation:true,body:{payment_id:s.payment.id,rrn}});return reply({claim:rows[0]},201);
}catch(e){return handleError(e);}}
export async function PATCH(req:Request):Promise<Response>{if(!sameOrigin(req))return reply({error:"Origin not permitted"},403);try{
 const {token,id}=await getUser(),body=record(await readSmallJson(req)),quoteId=validId(body.quote_id),s=await scope(token,id,quoteId);
 if(!s.reviewer||!s.payment)throw new ApiError(403,"Payment reviewer required");
 if(body.decision!=="verified"&&body.decision!=="rejected")throw new RangeError("Invalid review");
 if(body.decision==="verified"&&body.bank_confirmed!==true)throw new RangeError("Bank credit must be independently confirmed");
 const claimId=validId(body.claim_id),d=await details(token,s.payment.id),claim=d.claims.find((c:{id:string})=>c.id===claimId);
 if(!claim)throw new ApiError(404,"Claim unavailable");if(claim.decision!=="pending"||(d.verified&&body.decision==="verified"))throw new ApiError(409,"Already reviewed");
 const rows=await requestDb("/rest/v1/st_upi_decisions",{token,method:"POST",representation:true,body:{claim_id:claimId,payment_id:s.payment.id,rrn:claim.rrn,reviewer_id:id,decision:body.decision}});return reply({review:rows[0]});
}catch(e){return handleError(e);}}
