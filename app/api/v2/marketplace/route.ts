import {getUser,requestDb,reply,handleError,ApiError} from "../../../../lib/pilot-server.mjs";
import {readSmallJson} from "../../../../lib/http.mjs";
import {record} from "../../../../lib/server/api-contract";
import {sameOrigin} from "../../../../lib/workspace.mjs";
import {id as validId} from "../../../../lib/server/tenant";
import {listingInput,reviewInput} from "../../../../lib/marketplace.mjs";
export const runtime="nodejs";
async function access(){const u=await getUser();const [owners,mods]=await Promise.all([requestDb("/rest/v1/st_institutes?select=id,name&owner_id=eq."+u.id+"&limit=1",{token:u.token}),requestDb("/rest/v1/st_marketplace_moderators?select=user_id&active=eq.true&user_id=eq."+u.id,{token:u.token})]);const owner=owners[0]||null,moderator=Boolean(mods[0]);if(!owner&&!moderator)throw new ApiError(403,"Marketplace management access denied");return {...u,owner,moderator};}
export async function GET(req:Request):Promise<Response>{try{
 if(new URL(req.url).searchParams.get("mode")!=="manage"){
 const rows=await requestDb("/rest/v1/st_marketplace_listings?select=id,display_name,city,subject,description&order=display_name.asc,id.asc&limit=101");return reply({listings:rows.slice(0,100),hasMore:rows.length>100});
 }
 const a=await access();const rows=await requestDb("/rest/v1/st_marketplace_listings?select=id,institute_id,display_name,city,subject,description,created_at&order=created_at.desc,id.desc&limit=101"+(a.moderator?"":"&institute_id=eq."+a.owner.id),{token:a.token});
 const ids=rows.slice(0,100).map((r:{id:string})=>r.id);const reviews=ids.length?await requestDb("/rest/v1/st_marketplace_reviews?select=listing_id,status,reviewer_id,reviewed_at&listing_id=in.("+ids.join(",")+")",{token:a.token}):[];
 return reply({owner:a.owner,moderator:a.moderator,listings:rows.slice(0,100).map((r:{id:string})=>({...r,status:reviews.find((v:{listing_id:string})=>v.listing_id===r.id)?.status||"pending"})),hasMore:rows.length>100});
}catch(e){return handleError(e);}}
export async function POST(req:Request):Promise<Response>{if(!sameOrigin(req))return reply({error:"Origin not permitted"},403);try{const a=await access();if(!a.owner)throw new ApiError(403,"Institute owner required");const input=listingInput(record(await readSmallJson(req)));const rows=await requestDb("/rest/v1/st_marketplace_listings",{token:a.token,method:"POST",representation:true,body:{...input,institute_id:a.owner.id}});return reply({listing:rows[0]},201);}catch(e){return handleError(e);}}
export async function PATCH(req:Request):Promise<Response>{if(!sameOrigin(req))return reply({error:"Origin not permitted"},403);try{const a=await access();if(!a.moderator)throw new ApiError(403,"Marketplace moderator required");const body=record(await readSmallJson(req)),id=validId(body.listing_id),input=reviewInput(body);const listings=await requestDb("/rest/v1/st_marketplace_listings?select=id,institute_id&id=eq."+id,{token:a.token});const l=listings[0];if(!l)throw new ApiError(404,"Listing unavailable");if(l.institute_id===a.owner?.id)throw new ApiError(403,"Independent moderator required");
 const rows=input.status==="withdrawn"?await requestDb("/rest/v1/st_marketplace_reviews?listing_id=eq."+id+"&status=eq.published&reviewer_id=eq."+a.id,{token:a.token,method:"PATCH",representation:true,body:{status:"withdrawn"}}):await requestDb("/rest/v1/st_marketplace_reviews",{token:a.token,method:"POST",representation:true,body:{...input,listing_id:id,institute_id:l.institute_id,reviewer_id:a.id}});
 if(!rows[0])throw new ApiError(409,"Review unavailable or already withdrawn");return reply({review:rows[0]});
}catch(e){return handleError(e);}}
