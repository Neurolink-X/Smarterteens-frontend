import assert from "node:assert/strict";
const base="http://localhost:3000";
for(const p of ["/","/labs","/coaching","/pricing","/privacy","/api/health"]){const r=await fetch(base+p);assert.equal(r.status,200,p);}
const post=(p,b)=>fetch(base+p,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(b)});
const money=await post("/api/v2/labs/money",{purchased:20,sold:15,unitCost:40,unitPrice:65,overhead:100});assert.equal(money.status,200);assert.equal((await money.json()).profit,275);
assert.equal((await post("/api/v2/labs/money",{})).status,400);
const quote=await post("/api/v2/coaching/estimate",{plan:"pro",months:12});assert.equal(quote.status,200);assert.equal((await quote.json()).subtotal,11988);
assert.equal((await post("/api/v2/coaching/estimate",{plan:"fake",months:1})).status,400);
console.log("HTTP smoke checks passed");
