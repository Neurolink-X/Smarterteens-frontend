import test from "node:test";
import assert from "node:assert/strict";
import {courses,courseById,completeLesson,normalizeProgress} from "../lib/courses.mjs";
import {courseMeta,expandedCourses} from "../lib/curriculum.mjs";
test("all pathways have unique ids, valid questions and real mission metadata",()=>{
 assert.equal(new Set(courses.map(c=>c.id)).size,courses.length);
 assert.equal(expandedCourses.length,5);
 for(const c of courses){
  assert.ok(courseMeta[c.id]?.length===5);
  assert.ok(c.lessons.length>=3);
  assert.equal(new Set(c.lessons.map(l=>l.id)).size,c.lessons.length);
  for(const l of c.lessons){assert.ok(l.text&&l.why);assert.ok(Number.isInteger(l.answer)&&l.answer>=0&&l.answer<l.options.length);}
 }
});
test("new lessons support examples, activities and persisted progress without changing old ids",()=>{
 let progress=normalizeProgress({money:["cost"]});
 for(const c of expandedCourses){
  for(const l of c.lessons){
   assert.ok(l.example&&l.activity);
   assert.equal(completeLesson(progress,c.id,l.id,(l.answer+1)%l.options.length).correct,false);
   const next=completeLesson(progress,c.id,l.id,l.answer);assert.equal(next.correct,true);progress=next.progress;
  }
  assert.equal(progress[c.id].length,c.lessons.length);
 }
 assert.deepEqual(progress.money,["cost"]);
 assert.ok(courseById("ai"));assert.ok(courseById("web"));
});
