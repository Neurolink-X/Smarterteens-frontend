// Only an explicitly isolated CI process can use the exact loopback test gateway.
export const localQaOrigin="http://127.0.0.1:54321";
export function isLocalQa(env=process.env){return env.CI==="true"&&env.ST_QA_LOCAL==="1"&&!env.VERCEL&&!env.VERCEL_ENV;}
export function databaseOrigin(value,env=process.env){
 const u=new URL(value);
 if(u.username||u.password||u.pathname!=="/"||u.search||u.hash)throw new Error("Invalid database origin");
 if(isLocalQa(env)){if(u.origin!==localQaOrigin)throw new Error("CI must use isolated loopback database");return u.origin;}
 if(u.protocol!=="https:"||! /^[a-z0-9]{20}\.supabase\.co$/.test(u.hostname)||u.port)throw new Error("Invalid hosted database origin");
 return u.origin;
}
