import test from "node:test";import assert from "node:assert/strict";import {courses,normalizeProgress,completeLesson} from "../lib/courses.mjs";
test("only valid completed lessons retained",()=>assert.deepEqual(normalizeProgress({money:["cost","cost","fake"],fake:["x"]}).money,["cost"]));
test("correct answers record completion once",()=>{const c=courses[0],l=c.lessons[0];const a=completeLesson({},c.id,l.id,l.answer);assert.ok(a.correct);assert.deepEqual(completeLesson(a.progress,c.id,l.id,l.answer).progress.money,[l.id]);});
test("wrong answers and invalid lessons cannot complete",()=>{assert.equal(completeLesson({},"money","cost",0).correct,false);assert.equal(completeLesson({},"fake","cost",1).correct,false);});
