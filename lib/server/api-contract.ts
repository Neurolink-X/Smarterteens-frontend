export type JsonRecord = Record<string, unknown>;
export function isRecord(value: unknown): value is JsonRecord {
 return typeof value === "object" && value !== null && !Array.isArray(value);
}
export function record(value: unknown): JsonRecord {
 if (!isRecord(value)) throw new RangeError("Expected JSON object");
 return value;
}
export function integer(value: unknown, min: number, max: number): number {
 if(typeof value !== "number" || !Number.isSafeInteger(value) || value < min || value > max) throw new RangeError("Invalid integer");
 return value;
}
export function text(value: unknown, max: number): string {
 if(typeof value !== "string" || !value.trim() || value.length > max) throw new RangeError("Invalid text");
 return value;
}
export function json(body: unknown, status=200): Response {
 return Response.json(body,{status,headers:{"Cache-Control":"no-store"}});
}
export function apiFailure(error: unknown, fallback: string): Response {
 return error instanceof RangeError || error instanceof SyntaxError ? json({error:"Invalid request"},400) : json({error:fallback},500);
}
export type MoneyScenario={purchased:number;sold:number;unitCost:number;unitPrice:number;overhead:number};
export function parseMoney(value: unknown): MoneyScenario {
 const v=record(value);
 const purchased=integer(v.purchased,0,100),sold=integer(v.sold,0,purchased);
 return {purchased,sold,unitCost:integer(v.unitCost,0,500),unitPrice:integer(v.unitPrice,0,500),overhead:integer(v.overhead,0,2000)};
}
export function parseEstimate(value: unknown): {plan:string;months:number} {
 const v=record(value);return {plan:text(v.plan,32),months:integer(v.months,1,12)};
}
