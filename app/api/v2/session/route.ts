import {cookies} from "next/headers";
import {record} from "../../../../lib/server/api-contract";
import {readSmallJson} from "../../../../lib/http.mjs";
import {sameOrigin} from "../../../../lib/workspace.mjs";
import {requestDb,getUser,sessionCookie,reply,handleError} from "../../../../lib/pilot-server.mjs";
export const runtime="nodejs";
export async function GET():Promise<Response>{try{await getUser();return reply({signedIn:true});}catch(e){return handleError(e);}}
export async function POST(req:Request):Promise<Response>{
 if(!sameOrigin(req))return reply({error:"Origin not permitted"},403);
 try{const input=record(await readSmallJson(req));if(typeof input?.email!=="string"||input.email.length>254||!input.email.includes("@")||typeof input.password!=="string"||input.password.length<8||input.password.length>256)return reply({error:"Invalid credentials"},400);
 const session=await requestDb("/auth/v1/token?grant_type=password",{method:"POST",body:{email:input.email.trim(),password:input.password}});
 if(!session?.access_token||!session.user?.email_confirmed_at||session.user.is_anonymous)return reply({error:"Verified account required"},403);
 const ttl=Math.min(3600,Number(session.expires_in)||0);if(ttl<1)return reply({error:"Session unavailable"},503);
 (await cookies()).set(sessionCookie,session.access_token,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/",maxAge:ttl});
 return reply({signedIn:true});
 }catch(e){return handleError(e);}
}
export async function DELETE(req:Request):Promise<Response>{
 if(!sameOrigin(req))return reply({error:"Origin not permitted"},403);
 const jar=await cookies();const token=jar.get(sessionCookie)?.value;jar.delete(sessionCookie);
 // Local cookie removal always succeeds; revoke server-side session when available.
 if(token){try{await requestDb("/auth/v1/logout?scope=local",{token,method:"POST"});}catch{return reply({signedIn:false,notice:"Local session cleared; server logout could not be confirmed."});}}
 return reply({signedIn:false});
}
