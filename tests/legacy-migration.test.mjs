import test from "node:test";
import assert from "node:assert/strict";
import config from "../next.config.mjs";
import {courses,courseById,completeLesson} from "../lib/courses.mjs";

test("numeric course links reach available replacement topics",async()=>{
  const redirects=await config.redirects();
  for(const [id,slug] of [["1","ai"],["2","web"],["3","algorithms"]]){
    for(const suffix of ["","/learn"]){
      const match=redirects.find(r=>r.source===`/course/${id}${suffix}`);
      assert.equal(match?.destination,`/course/${slug}`);
      assert.equal(match.permanent,false);
    }
    assert.ok(courseById(slug));
  }
});
test("new courses have unique ids and completable practice questions",()=>{
  assert.equal(new Set(courses.map(c=>c.id)).size,courses.length);
  for(const id of ["web","algorithms"]){
    const c=courseById(id);
    assert.equal(c.lessons.length,3);
    let progress={};
    for(const lesson of c.lessons){
      assert.ok(lesson.answer>=0&&lesson.answer<lesson.options.length);
      const result=completeLesson(progress,id,lesson.id,lesson.answer);
      assert.equal(result.correct,true);
      progress=result.progress;
    }
    assert.equal(progress[id].length,c.lessons.length);
  }
});
test("old privileged routes do not redirect into pilot workspace",async()=>{
  const redirects=await config.redirects();
  for(const [source,destination] of [["/AdminDashboard","/legacy/admin"],["/MentorDashboard","/legacy/mentor"],["/parent-view","/legacy/parent"],["/auth","/legacy/auth"]]){
    assert.equal(redirects.find(r=>r.source===source)?.destination,destination);
  }
});
