import test from "node:test";
import assert from "node:assert/strict";
import {items,publicItems,scoreAttempt} from "../lib/diagnostic.mjs";
import {courses} from "../lib/courses.mjs";
import {careerPaths,buildRoadmap,recommendPractice} from "../lib/roadmap.mjs";
test("all three language versions preserve answer positions and exclude solutions",()=>{
 for(const q of items){assert.equal(q.question.length,3);assert.equal(q.hint.length,3);assert.equal(q.explanation.length,3);assert.ok(q.options.every(o=>o.length===3&&o.every(Boolean)));assert.ok(q.options[q.correct][2]);}
 assert.ok(publicItems().every(q=>!("correct" in q)&&!("explanation" in q)));
});
test("practice recommendations prioritize observed gaps and use valid courses",()=>{
 const answers=Object.fromEntries(items.map(q=>[q.id,q.correct]));
 const report=scoreAttempt({...answers,division:0,fraction:0});
 const recommendations=recommendPractice(report.areas);
 assert.equal(recommendations[0].skill,"numeracy");assert.equal(recommendations[0].needsPractice,true);
 assert.ok(recommendations.every(x=>courses.some(c=>c.id===x.courseId)));
 assert.deepEqual(recommendPractice({numeracy:{correct:5,total:1}}),[]);
});
test("interest-based roadmaps reflect only valid completed checks",()=>{
 for(const p of careerPaths){const steps=buildRoadmap(p.id,{},courses);assert.equal(steps.length,3);assert.ok(steps.every(x=>x.done===0&&x.total>=3));}
 const steps=buildRoadmap("business",{money:["cost","cost","fake"]},courses);assert.equal(steps[0].done,1);
 assert.deepEqual(buildRoadmap("unknown",{},courses),[]);
});
