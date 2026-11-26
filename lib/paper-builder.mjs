import {courses} from "./courses.mjs";
export function buildPaper(courseIds,count){
 if(!Array.isArray(courseIds)||!courseIds.length||courseIds.length>courses.length||new Set(courseIds).size!==courseIds.length||courseIds.some(id=>!courses.some(c=>c.id===id))||!Number.isInteger(count)||count<1||count>30)throw new RangeError("Invalid paper options");
 const groups=courseIds.map(id=>courses.find(c=>c.id===id).lessons.map(l=>({id:id+"/"+l.id,topic:id,question:l.question,options:l.options,answer:l.answer,why:l.why})));
 const questions=[];let index=0;while(questions.length<count&&groups.some(g=>index<g.length)){for(const g of groups){if(g[index]&&questions.length<count)questions.push(g[index]);}index++;}
 return questions;
}
