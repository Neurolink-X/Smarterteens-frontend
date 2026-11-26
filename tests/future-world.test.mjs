import test from "node:test";
import assert from "node:assert/strict";
import {futureTopics} from "../lib/future-world.mjs";
import {mobilityScenario} from "../lib/mobility.mjs";
import {courses} from "../lib/courses.mjs";
const sample={distance:1000,evWhPerKm:150,petrolKmPerL:20,powerPrice:8,fuelPrice:100,upfrontDifference:190000};
test("future topics separate evidence and scenarios and link real courses",()=>{assert.equal(new Set(futureTopics.map(t=>t.id)).size,9);for(const t of futureTopics){assert.ok(t.evidence.fact&&t.evidence.date&&t.evidence.source);assert.equal(new URL(t.evidence.url).protocol,"https:");assert.equal(t.future.kind,"illustrative-scenario");assert.ok(courses.some(c=>c.id===t.course));}});
test("mobility calculations use correct units and simple payback",()=>{assert.deepEqual(mobilityScenario(sample),{energy:150,litres:50,evCost:1200,petrolCost:5000,savings:3800,breakEvenMonths:50});assert.equal(mobilityScenario({...sample,distance:0}).breakEvenMonths,null);assert.equal(mobilityScenario({...sample,evWhPerKm:300,powerPrice:30,petrolKmPerL:60,fuelPrice:30}).breakEvenMonths,null);assert.throws(()=>mobilityScenario({...sample,petrolKmPerL:0}),RangeError);assert.throws(()=>mobilityScenario({...sample,distance:"1000"}),RangeError);});
