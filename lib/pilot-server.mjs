import {cookies} from "next/headers";
import {databaseOrigin} from "./server/database-config.mjs";
export class ApiError extends Error{constructor(status,message){super(message);this.status=status;}}
export const sessionCookie="st_pilot_session";
function config(){
 const url=process.env.SUPABASE_URL,key=process.env.SUPABASE_PUBLISHABLE_KEY;
 if(!url||!key)throw new ApiError(503,"Pilot database is not configured");
 let origin;try{origin=databaseOrigin(url);}catch{throw new ApiError(503,"Pilot configuration invalid");}
 if(!key.startsWith("sb_publishable_")&&!key.startsWith("eyJ"))throw new ApiError(503,"Use a publishable project key");
 // Never allow a legacy privileged JWT key.
 if(key.startsWith("eyJ")){try{const claims=JSON.parse(Buffer.from(key.split(".")[1],"base64url").toString("utf8"));if(claims.role!=="anon")throw Error();}catch{throw new ApiError(503,"Use a publishable project key");}}
 return {url:origin,key};
}
/**
 * @param {string} path
 * @param {{token?: string, method?: string, body?: unknown, representation?: boolean}} [options]
 * @returns {Promise<any>}
 */
export async function requestDb(path,{token,method="GET",body,representation=false}={}){
 const {url,key}=config();
 let response;
 try{response=await fetch(url+path,{method,headers:{apikey:key,...(token?{Authorization:"Bearer "+token}:{}),...(body!==undefined?{"Content-Type":"application/json"}:{}),...(representation?{Prefer:"return=representation"}:{})},body:body===undefined?undefined:JSON.stringify(body),cache:"no-store",redirect:"error",signal:AbortSignal.timeout(8000)});}catch{throw new ApiError(503,"Database temporarily unavailable");}
 if(!response.ok){if(response.status===401||response.status===403)throw new ApiError(401,"Sign in again or check access");if(response.status===409)throw new ApiError(409,"Record already exists or conflicts");if(response.status===429)throw new ApiError(429,"Too many requests; retry later");if(response.status===400)throw new ApiError(400,"Invalid record or credentials");throw new ApiError(503,"Database operation unavailable");}
 if(response.status===204)return null;
 return response.json();
}
export async function getUser(){
 const token=(await cookies()).get(sessionCookie)?.value;
 if(!token)throw new ApiError(401,"Sign in to access the pilot");
 const user=await requestDb("/auth/v1/user",{token});
 if(!user?.id||!user.email_confirmed_at||user.is_anonymous)throw new ApiError(403,"A verified institute account is required");
 return {token,id:user.id};
}
export function reply(body,status=200){return Response.json(body,{status,headers:{"Cache-Control":"no-store"}});}
export function handleError(error){if(error instanceof ApiError)return reply({error:error.message},error.status);if(error instanceof RangeError||error instanceof SyntaxError)return reply({error:"Invalid request"},400);return reply({error:"Operation unavailable"},500);}
