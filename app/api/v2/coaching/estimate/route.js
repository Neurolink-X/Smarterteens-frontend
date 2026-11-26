import {estimatePlan} from "../../../../../lib/learning.mjs";
import {readSmallJson,invalid} from "../../../../../lib/http.mjs";
export const runtime="nodejs";
export async function POST(request){try{const input=await readSmallJson(request);if(!input||typeof input!=="object")return invalid();return Response.json(estimatePlan(input.plan,input.months),{headers:{"Cache-Control":"no-store"}});}catch(error){if(error instanceof RangeError||error instanceof SyntaxError)return invalid();return Response.json({error:"Estimate unavailable"},{status:500});}}