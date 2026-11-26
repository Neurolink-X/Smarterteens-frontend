import {json} from "../../../lib/server/api-contract";
export const dynamic="force-dynamic";
export const runtime="nodejs";
export function GET(): Response {
 const configured=Boolean(process.env.SUPABASE_URL&&process.env.SUPABASE_PUBLISHABLE_KEY);
 return json({status:"ok",scope:"application process only",database:configured?"configured; connectivity not checked":"not configured",payments:"disabled"});
}
