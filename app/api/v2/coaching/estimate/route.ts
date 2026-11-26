import {estimatePlan} from "../../../../../lib/learning.mjs";
import {readSmallJson} from "../../../../../lib/http.mjs";
import {parseEstimate,json,apiFailure} from "../../../../../lib/server/api-contract";
export const runtime="nodejs";
export async function POST(request: Request): Promise<Response> {
 try{const {plan,months}=parseEstimate(await readSmallJson(request));return json(estimatePlan(plan,months));}
 catch(error:unknown){return apiFailure(error,"Estimate unavailable");}
}
