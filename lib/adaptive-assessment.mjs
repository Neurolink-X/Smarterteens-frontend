import {items,scoreAttempt,version} from "./diagnostic.mjs";
import {courses} from "./courses.mjs";
import {recommendPractice} from "./roadmap.mjs";
export function adaptiveAssessment(answers){
 const score=scoreAttempt(answers);const routes=recommendPractice(score.areas);
 const followup=routes.filter(r=>r.needsPractice).flatMap(r=>{const c=courses.find(x=>x.id===r.courseId);return c?[{course:c.id,title:c.title,lesson:c.lessons[0].id,reason:"Practice this foundation, then try a new question."}]:[]});
 return {...score,followup,method:"deterministic-rule-based",officialGrade:false};
}
export function teacherDraftPrompt(subject,level,count){
 if(!["math","science","money","ai","web"].includes(subject)||!["foundation","class11","class12"].includes(level)||!Number.isInteger(count)||count<1||count>10)throw new RangeError("Invalid draft settings");
 return "Draft "+count+" original practice questions for Indian learners at "+level+" level on "+subject+". Include four distinct options, one correct answer, explanation, misconception addressed and source where factual claims are made. Do not use student data. Do not claim official exam alignment. Return a teacher-review draft, not a final grade or published exam.";
}
export function validateTeacherDraft(input){if(!Array.isArray(input)||input.length<1||input.length>10)throw new RangeError("Use an array of 1–10 questions");return input.map((q,i)=>{
 if(!q||typeof q!=="object"||typeof q.question!=="string"||!q.question.trim()||q.question.length>500||!Array.isArray(q.options)||q.options.length!==4||q.options.some(o=>typeof o!=="string"||!o.trim()||o.length>200)||new Set(q.options.map(o=>o.trim().toLowerCase())).size!==4||!Number.isInteger(q.answer)||q.answer<0||q.answer>3||typeof q.explanation!=="string"||!q.explanation.trim()||q.explanation.length>1000)throw new RangeError("Invalid draft question "+(i+1));
 return {question:q.question.trim(),options:q.options.map(o=>o.trim()),answer:q.answer,explanation:q.explanation.trim()};
});}
