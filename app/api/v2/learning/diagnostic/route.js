import {readSmallJson,invalid} from "../../../../../lib/http.mjs";
import {publicItems,scoreAttempt,version,skills} from "../../../../../lib/diagnostic.mjs";
export function GET(){return Response.json({version,skills,items:publicItems()},{headers:{"Cache-Control":"no-store"}});}
export async function POST(request){try{const body=await readSmallJson(request);if(body?.version!==version)return Response.json({error:"Refresh the exercise before submitting."},{status:409});return Response.json(scoreAttempt(body.answers),{headers:{"Cache-Control":"no-store"}});}catch(e){if(e instanceof RangeError||e instanceof SyntaxError)return invalid();return Response.json({error:"Assessment unavailable"},{status:500});}}
