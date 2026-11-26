import {readSmallJson} from "../../../../../lib/http.mjs";
import {publicItems,version,skills} from "../../../../../lib/diagnostic.mjs";
import {adaptiveAssessment} from "../../../../../lib/adaptive-assessment.mjs";
import {record,json,apiFailure} from "../../../../../lib/server/api-contract";
export const runtime="nodejs";
export function GET(): Response{return json({version,skills,items:publicItems()});}
export async function POST(request: Request): Promise<Response>{
 try{const body=record(await readSmallJson(request));if(body.version!==version)return json({error:"Refresh the exercise before submitting."},409);return json(adaptiveAssessment(record(body.answers)));}
 catch(error:unknown){return apiFailure(error,"Assessment unavailable");}
}
