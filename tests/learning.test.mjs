import test from "node:test";import assert from "node:assert/strict";import {moneyLab,estimatePlan,challenges,careers} from "../lib/learning.mjs";
const s={purchased:20,sold:15,unitCost:40,unitPrice:65,overhead:100};
test("cash and profit are distinct",()=>assert.deepEqual(moneyLab(s),{sales:975,cashSpent:900,cashChange:75,profit:275,inventoryCost:200}));
test("invalid and extreme inputs are rejected",()=>{for(const i of [null,[],{...s,sold:21},{...s,purchased:-1},{...s,unitCost:501},{...s,unitPrice:1.5},{...s,sold:"15"}])assert.throws(()=>moneyLab(i),RangeError)});
test("unsold inventory is not treated as cost of sales",()=>assert.equal(moneyLab({...s,sold:0}).profit,-100));
test("estimates are server-defined",()=>{assert.equal(estimatePlan("pro",12).subtotal,11988);assert.throws(()=>estimatePlan("fake",1));assert.throws(()=>estimatePlan("pro",0));assert.throws(()=>estimatePlan("pro",13))});
test("learning prompts have valid answer indexes",()=>{for(const q of challenges)assert.ok(q.answer>=0&&q.answer<q.options.length);assert.ok(careers.length>=3)});
