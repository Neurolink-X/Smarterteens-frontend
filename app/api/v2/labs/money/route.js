import {moneyLab} from "../../../../../lib/learning.mjs";
import {readSmallJson,invalid} from "../../../../../lib/http.mjs";
export const runtime="nodejs";
export async function POST(request){try{return Response.json(moneyLab(await readSmallJson(request)),{headers:{"Cache-Control":"no-store"}});}catch(error){if(error instanceof RangeError||error instanceof SyntaxError)return invalid();return Response.json({error:"Calculation unavailable"},{status:500});}}