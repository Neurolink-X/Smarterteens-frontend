import test from "node:test";import assert from "node:assert/strict";import {items,publicItems,scoreAttempt} from "../lib/diagnostic.mjs";
const correct=Object.fromEntries(items.map(q=>[q.id,q.correct]));
test("correct answers are excluded from question API",()=>{assert.ok(publicItems().every(q=>!("correct" in q)&&!("explanation" in q)));});
test("all correct and per-skill totals",()=>{const r=scoreAttempt(correct);assert.equal(r.correct,8);assert.equal(Object.values(r.areas).reduce((n,a)=>n+a.total,0),8);});
test("reject missing, extra, invalid, and non-numeric answers",()=>{for(const a of [null,[],{}, {...correct,extra:0},{...correct,division:-1},{...correct,division:"1"}])assert.throws(()=>scoreAttempt(a),RangeError);});
test("wrong answers give real feedback not invented proficiency",()=>{const r=scoreAttempt({...correct,division:0});assert.equal(r.correct,7);assert.equal(r.areas.numeracy.correct,2);assert.equal(r.feedback[0].isCorrect,false);});
