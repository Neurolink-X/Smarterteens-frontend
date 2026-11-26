import test from "node:test";
import assert from "node:assert/strict";
import {energyComparison,compareRates} from "../lib/experiments.mjs";
test("energy conversions and bounds",()=>{assert.deepEqual(energyComparison(100,5,30),{daily:.5,total:15});assert.deepEqual(energyComparison(0,24,31),{daily:0,total:0});assert.throws(()=>energyComparison(100,25,1),RangeError);assert.throws(()=>energyComparison(1.5,1,1),RangeError);});
test("compare rates independently of counts and reject invalid totals",()=>{assert.deepEqual(compareRates(10,20,15,50),{rateA:50,rateB:30,winner:1});assert.equal(compareRates(1,3,2,6).winner,0);assert.equal(compareRates(1,10,9,10).winner,-1);assert.throws(()=>compareRates(1,0,1,2),RangeError);assert.throws(()=>compareRates(4,3,0,1),RangeError);});
