import assert from "node:assert/strict";
const base="http://localhost:3000";
for(const p of ["/","/courses","/course/money","/course/math","/course/communication","/course/energy","/course/design","/course/data","/missions","/future","/student","/diagnostic","/labs","/labs/cross-subject","/coaching","/coaching/paper","/coaching/brand","/pricing","/privacy","/api/health"]){const r=await fetch(base+p);assert.equal(r.status,200,p);}
const post=(p,b)=>fetch(base+p,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(b)});
const money=await post("/api/v2/labs/money",{purchased:20,sold:15,unitCost:40,unitPrice:65,overhead:100});assert.equal(money.status,200);assert.deepEqual(await money.json(),{sales:975,cashSpent:900,cashChange:75,profit:275,inventoryCost:200});
assert.equal((await post("/api/v2/labs/money",{})).status,400);
for(const invalid of [{purchased:1,sold:2,unitCost:10,unitPrice:20,overhead:0},{purchased:1,sold:1,unitCost:"10",unitPrice:20,overhead:0},{purchased:1,sold:1,unitCost:10.5,unitPrice:20,overhead:0}]) assert.equal((await post("/api/v2/labs/money",invalid)).status,400);
const loss=await post("/api/v2/labs/money",{purchased:10,sold:0,unitCost:10,unitPrice:20,overhead:100});assert.equal(loss.status,200);assert.deepEqual(await loss.json(),{sales:0,cashSpent:200,cashChange:-200,profit:-100,inventoryCost:100});
const quote=await post("/api/v2/coaching/estimate",{plan:"pro",months:12});assert.equal(quote.status,200);assert.equal((await quote.json()).subtotal,11988);
assert.equal((await post("/api/v2/coaching/estimate",{plan:"fake",months:1})).status,400);
const diag=await fetch(base+"/api/v2/learning/diagnostic");assert.equal(diag.status,200);const exercise=await diag.json();assert.equal(exercise.items.length,8);assert.ok(exercise.items.every(q=>q.question.length===3&&!Object.hasOwn(q,"correct")));
assert.equal((await post("/api/v2/learning/diagnostic",{version:"expired",answers:{}})).status,409);
assert.equal((await post("/api/v2/learning/diagnostic",{version:exercise.version,answers:{}})).status,400);
assert.equal((await fetch(base+"/api/v2/workspace")).status,401);
assert.equal((await fetch(base+"/api/v2/session")).status,401);
assert.equal((await post("/api/v2/workspace",{kind:"batch",record:{name:"Example"}})).status,403);
console.log("HTTP smoke checks passed");
