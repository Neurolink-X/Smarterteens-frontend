import { useState } from "react";
import { Link } from "react-router-dom";

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
const labs = [
  { title: "Money & business", description: "Build a budget, price a product and understand risk.", available: true },
  { title: "AI & digital safety", description: "Verify AI answers, protect personal information and solve problems.", available: false },
  { title: "Career exploration", description: "Try real tasks before choosing a career path.", available: false },
  { title: "Science & engineering", description: "Explore concepts through practical experiments.", available: false },
];

export default function FutureLearning() {
  const [units, setUnits] = useState(20);
  const [cost, setCost] = useState(40);
  const [price, setPrice] = useState(65);
  const [sold, setSold] = useState(15);
  const [overhead, setOverhead] = useState(100);
  const sales = sold * price;
  const spend = units * cost + overhead;
  const cash = sales - spend;
  const profit = sales - sold * cost - overhead;
  const fields = [
    { label: "Units purchased", value: units, max: 100, set: (n: number) => { setUnits(n); setSold(s => Math.min(s, n)); } },
    { label: "Units sold", value: sold, max: units, set: setSold },
    { label: "Cost per unit (₹)", value: cost, max: 500, set: setCost },
    { label: "Selling price (₹)", value: price, max: 500, set: setPrice },
    { label: "Other expenses (₹)", value: overhead, max: 2000, set: setOverhead },
  ];
  return (
    <main className="min-w-0 bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-5 py-12 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">SmarterTeens · Future skills</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">Learn for exams. Build for life.</h1>
        <p className="mt-5 max-w-2xl text-lg text-slate-600">Explore practical skills through decisions, experiments and real-world challenges. Start with a free business simulation.</p>
        <a className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-teal-800 px-5 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-4" href="#money-lab">Try the free lab</a>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {labs.map(lab => <article key={lab.title} className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-semibold text-teal-800">{lab.available ? "Available" : "Planned"}</p>
            <h2 className="mt-2 text-lg font-semibold">{lab.title}</h2><p className="mt-2 text-sm text-slate-600">{lab.description}</p>
          </article>)}
        </div>
      </section>
      <section id="money-lab" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8">
          <h2 className="text-2xl font-bold">Money lab: run a small shop</h2>
          <p className="mt-2 text-slate-600">Change the inputs. Can you earn a profit without running out of cash?</p>
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <div className="space-y-5">{fields.map(field => <label className="block" key={field.label}>
              <span className="flex justify-between gap-3 font-medium"><span>{field.label}</span><output>{field.value}</output></span>
              <input className="mt-2 w-full accent-teal-800" type="range" min={0} max={field.max} step={1} value={field.value} onChange={e => field.set(Number(e.target.value))} />
            </label>)}</div>
            <dl aria-live="polite" className="grid content-start gap-3 sm:grid-cols-2">
              {[
                ["Sales revenue",sales],["Cash spent",spend],["Cash change",cash],["Profit on sold goods",profit],["Unsold inventory cost",(units-sold)*cost]
              ].map(([label,value]) => <div className="rounded-xl bg-slate-100 p-4" key={label}><dt className="text-sm text-slate-600">{label}</dt><dd className="mt-1 break-words text-xl font-bold">{money.format(Number(value))}</dd></div>)}
            </dl>
          </div>
          <p className="mt-6 text-sm text-slate-600">Cash change includes all purchased inventory; profit deducts only sold inventory and overhead. Unsold stock is valued at purchase cost. This is an educational model, not financial advice.</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-12"><h2 className="text-2xl font-bold">For coaching institutes</h2><p className="mt-2 max-w-2xl text-slate-600">Admissions, attendance, fees and evidence-based student progress are the next product priorities. Institute services are not yet available.</p><Link className="mt-4 inline-flex min-h-12 items-center underline underline-offset-4" to="/legacy">Explore existing learning catalog</Link></section>
    </main>
  );
}
