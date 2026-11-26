// Recommendations are scoped to eight practice questions, never an aptitude diagnosis.
export const skillRoutes=Object.freeze({numeracy:"math",finance:"money",digital:"ai",science:"science"});
export function recommendPractice(areas){
 if(!areas||typeof areas!=="object"||Array.isArray(areas))return [];
 return Object.entries(skillRoutes).flatMap(([skill,courseId])=>{
  const a=areas[skill];if(!a||!Number.isInteger(a.total)||!Number.isInteger(a.correct)||a.total<1||a.correct<0||a.correct>a.total)return [];
  return [{skill,courseId,correct:a.correct,total:a.total,needsPractice:a.correct<a.total}];
 }).sort((a,b)=>Number(b.needsPractice)-Number(a.needsPractice)||(a.correct/a.total-b.correct/b.total));
}
export const careerPaths=[
 {id:"technology",name:"Technology & computing",courses:["ai","web","algorithms"],task:"Build a small accessible webpage or compare search algorithms."},
 {id:"business",name:"Business & entrepreneurship",courses:["money","math","communication"],task:"Plan a pretend shop and explain the costs and customer need."},
 {id:"science",name:"Science & engineering",courses:["science","energy","data"],task:"Design a fair experiment and explain the results."},
 {id:"design",name:"Design & communication",courses:["design","communication","web"],task:"Redesign a school timetable and test its readability."},
 {id:"data",name:"Math & data",courses:["math","data","algorithms"],task:"Compare rates in two imaginary groups and create a clear chart."}
];
export function buildRoadmap(interest,progress,courses){
 const path=careerPaths.find(p=>p.id===interest);if(!path)return [];
 return path.courses.flatMap(id=>{const c=courses.find(x=>x.id===id);if(!c)return [];const done=c.lessons.filter(l=>Array.isArray(progress?.[id])&&progress[id].includes(l.id)).length;return [{id,title:c.title,done,total:c.lessons.length}];});
}
