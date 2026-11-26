"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {recommendPractice} from "../../lib/roadmap.mjs";
const path="/api/v2/learning/diagnostic";
const copy=[
{title:"Find your next learning step",intro:"Try eight practical questions. This is a short practice check, not a standardized assessment or career prediction.",retry:"Try again",hint:"Show hint",submit:"Check my answers",report:"Shareable learning summary",print:"Print learning summary",disclaimer:"This report covers only these practice items. It does not establish overall ability or identity. Nothing is saved to a student profile.",error:"Could not connect. Retry the exercise.",loading:"Loading practice questions…",score:"Correct answers",review:"Review your reasoning",next:"Recommended next step",practice:"Practice the areas where you made mistakes; try another scenario in the future labs.",all:"Try a different challenge in the future labs.",language:"Language",answered:"answered"},
{title:"सीखने का अगला कदम खोजें",intro:"आठ व्यावहारिक प्रश्न हल करें। यह छोटा अभ्यास है, मानकीकृत परीक्षा या करियर का अनुमान नहीं।",retry:"दोबारा प्रयास करें",hint:"संकेत देखें",submit:"उत्तर जाँचें",report:"साझा करने योग्य अभ्यास सारांश",print:"सारांश प्रिंट करें",disclaimer:"यह सारांश केवल इन प्रश्नों पर आधारित है। यह समग्र क्षमता या पहचान का प्रमाण नहीं है। विद्यार्थी प्रोफ़ाइल में कुछ सहेजा नहीं गया।",error:"कनेक्शन नहीं हुआ। दोबारा प्रयास करें।",loading:"अभ्यास के प्रश्न लोड हो रहे हैं…",score:"सही उत्तर",review:"अपने उत्तर समझें",next:"अगला सुझाव",practice:"गलत उत्तर वाले विषयों का अभ्यास करें और फ्यूचर लैब में नया उदाहरण आज़माएँ।",all:"फ्यूचर लैब में नया अभ्यास करें।",language:"भाषा",answered:"उत्तर दिए"}
];
export default function Diagnostic(){
 const [lang,setLang]=useState(0),[data,setData]=useState(null),[answers,setAnswers]=useState({}),[hints,setHints]=useState({}),[result,setResult]=useState(null),[busy,setBusy]=useState(false),[error,setError]=useState(false);
 const t=copy[lang];
 async function load(){setError(false);setBusy(true);try{const r=await fetch(path,{cache:"no-store"});if(!r.ok)throw Error();setData(await r.json());setAnswers({});setHints({});setResult(null);}catch{setError(true);}finally{setBusy(false);}}
 useEffect(()=>{void load();},[]);
 async function submit(e){e?.preventDefault();if(busy||!data||Object.keys(answers).length!==data.items.length)return;setBusy(true);setError(false);try{const r=await fetch(path,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({version:data.version,answers})});if(!r.ok)throw Error();setResult(await r.json());}catch{setError(true);}finally{setBusy(false);}}
 return <section className="section" lang={lang?"hi":"en"}>
 <div className="actions"><label>{t.language} <select value={lang} onChange={e=>setLang(Number(e.target.value))}><option value={0}>English</option><option value={1}>हिंदी</option></select></label></div>
 <h1>{t.title}</h1><p>{t.intro}</p>{error&&<p role="alert">{t.error} <button onClick={data?submit:load} disabled={busy}>{t.retry}</button></p>}
 {!data?<p role="status">{busy?t.loading:""}</p>:!result?<form onSubmit={submit}>
 <p role="status">{Object.keys(answers).length}/{data.items.length} {t.answered}</p>
 {data.items.map((q,i)=><fieldset key={q.id} disabled={busy}><legend>{i+1}. {q.question[lang]}</legend>
 {q.options.map((o,j)=><label className="option" key={j}><input type="radio" name={q.id} required checked={answers[q.id]===j} onChange={()=>setAnswers(a=>({...a,[q.id]:j}))}/>{o[lang]}</label>)}
 <button type="button" className="secondary" aria-expanded={!!hints[q.id]} onClick={()=>setHints(h=>({...h,[q.id]:!h[q.id]}))}>{t.hint}</button>{hints[q.id]&&<p>{q.hint[lang]}</p>}</fieldset>)}
 <button disabled={busy||Object.keys(answers).length!==data.items.length}>{t.submit}</button></form>:<>
 <article className="lab" id="learning-summary"><h2>{t.report}</h2><p className="amount">{result.correct}/{result.total} {t.score}</p>
 <div className="grid">{Object.entries(result.areas).map(([key,value])=><article key={key}><h3>{data.skills[key][lang]}</h3><p>{value.correct}/{value.total}</p></article>)}</div>
 <h3>{t.next}</h3><p>{result.correct===result.total?t.all:t.practice}</p><div className="grid">{recommendPractice(result.areas).map(a=><article key={a.skill}><h3>{data.skills[a.skill][lang]}</h3><p>{a.correct}/{a.total} · {a.needsPractice?(lang?"पहले अभ्यास करें":"Practice first"):(lang?"आगे बढ़ें":"Explore further")}</p><Link href={"/course/"+a.courseId}>{lang?"संबंधित पाठ खोलें":"Open related lessons"} →</Link></article>)}</div><p>{t.disclaimer}</p><div className="actions"><Link className="primary" href="/labs">{lang?"फ्यूचर लैब":"Future labs"}</Link><button onClick={()=>window.print()}>{t.print}</button><button onClick={()=>{setResult(null);setAnswers({});setHints({});}}>{t.retry}</button></div></article>
 <h2>{t.review}</h2>{result.feedback.map((f,i)=><article className="lab" key={f.id}><h3>{data.items[i].question[lang]}</h3><p>{f.isCorrect?(lang?"सही":"Correct"):(lang?"सुधार का अवसर":"Opportunity to improve")}</p><p>{f.explanation[lang]}</p></article>)}</>}
 </section>;
}
