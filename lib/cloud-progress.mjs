import {courses,normalizeProgress} from "./courses.mjs";
export function mergeProgress(a,b){
 const x=normalizeProgress(a),y=normalizeProgress(b);
 return Object.fromEntries(courses.map(c=>[c.id,c.lessons.filter(l=>(x[c.id]||[]).includes(l.id)||(y[c.id]||[]).includes(l.id)).map(l=>l.id)]));
}
export function practiceCount(p){const x=normalizeProgress(p);return Object.values(x).reduce((n,v)=>n+v.length,0);}
export function progressInput(v){if(!v||typeof v!=="object"||Array.isArray(v)||Object.keys(v).length>courses.length||Object.values(v).some(x=>!Array.isArray(x)||x.length>100||x.some(i=>typeof i!=="string"||i.length>100)))throw new RangeError("Invalid practice history");return normalizeProgress(v);}
