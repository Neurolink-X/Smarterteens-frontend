import {moneyLab} from "../../../../../lib/learning.mjs";
import {readSmallJson} from "../../../../../lib/http.mjs";
import {parseMoney,json,apiFailure} from "../../../../../lib/server/api-contract";
export const runtime="nodejs";
export async function POST(request: Request): Promise<Response> {
 try{return json(moneyLab(parseMoney(await readSmallJson(request))));}
 catch(error:unknown){return apiFailure(error,"Calculation unavailable");}
}
