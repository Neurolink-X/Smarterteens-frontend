import {test,expect} from "@playwright/test";
import fs from "node:fs";
import {items} from "../lib/diagnostic.mjs";
const registry=JSON.parse(fs.readFileSync("qa/feature-contracts.json","utf8"));
const pages=[...new Set(registry.features.flatMap(f=>f.pages))].filter(p=>p!=="/workspace");
const errors=new WeakMap();
test.beforeEach(({page})=>{const e=[];errors.set(page,e);page.on("pageerror",x=>e.push(x.message));page.on("console",m=>{if(m.type()==="error")e.push(m.text());});});
test.afterEach(({page})=>{expect(errors.get(page),"Browser runtime/console errors").toEqual([]);});
for(const route of pages)test("responsive route "+route,async({page})=>{
 const r=await page.goto(route);expect(r.status()).toBe(200);await expect(page.locator("main")).toBeVisible();
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBe(true);
 const links=page.locator("main a[href]");for(const a of await links.all()){const href=await a.getAttribute("href");expect(href).not.toBe("");}
});
test("navigation opens correct page and mobile menu closes",async({page,isMobile})=>{
 await page.goto("/");if(isMobile)await page.getByRole("button",{name:"Menu",exact:true}).click();
 await page.getByRole("navigation").getByRole("link",{name:"Courses",exact:true}).click();await expect(page).toHaveURL(/\/courses$/);
 if(isMobile)await expect(page.getByRole("button",{name:"Menu",exact:true})).toBeVisible();
 const search=page.getByRole("searchbox").or(page.locator('input[type="search"]'));await search.fill("does-not-exist-987");await expect(page.getByText("No matching pathways")).toBeVisible();await page.getByRole("button",{name:"Clear filters"}).click();await expect(page.getByText("Money and entrepreneurship",{exact:true})).toBeVisible();
});
test("wrong answer does not count; correct answer survives reload and appears in family summary",async({page})=>{
 await page.goto("/course/money");const radios=page.getByRole("radio");const check=page.getByRole("button",{name:"Check answer"});await radios.nth(0).check();await check.click();await expect(page.getByRole("status")).toContainText("Try again");await expect(page.getByText("0 of 3 checks completed")).toBeVisible();await radios.nth(1).check();await check.click();await expect(page.getByRole("status")).toContainText("Correct");await expect(page.getByText("1 of 3 checks completed")).toBeVisible();await page.reload();await expect(page.getByText("1 of 3 checks completed")).toBeVisible();await page.goto("/student");await expect(page.getByText("1/33 completed checks")).toBeVisible();await page.getByLabel("Interest").selectOption("business");await expect(page.getByText("Plan a pretend shop",{exact:false})).toBeVisible();await page.reload();await expect(page.getByLabel("Interest")).toHaveValue("business");
});
test("diagnostic real API, language switch, results and next steps",async({page})=>{
 let gets=0,posts=0;page.on("request",r=>{if(r.url().endsWith("/api/v2/learning/diagnostic"))r.method()==="GET"?gets++:posts++;});
 await page.goto("/diagnostic");await expect(page.locator("fieldset")).toHaveCount(items.length);await page.getByLabel("Language").selectOption("2");await expect(page.getByRole("heading",{name:"Apna agla learning step khojo"})).toBeVisible();await page.getByLabel("Language").selectOption("0");await expect(page.getByRole("button",{name:"Check my answers"})).toBeDisabled();
 for(const [i,q] of items.entries())await page.locator("fieldset").nth(i).getByRole("radio").nth(q.correct).check();
 await page.getByRole("button",{name:"Check my answers"}).click();await expect(page.getByText("8/8 Correct answers")).toBeVisible();await expect(page.getByRole("link",{name:"Open related lessons →"})).toHaveCount(4);expect(gets).toBe(1);expect(posts).toBe(1);
});
test("money inputs stay local; explicit verification calls API once",async({page})=>{
 let calls=0;page.on("request",r=>{if(r.url().endsWith("/api/v2/labs/money"))calls++;});await page.goto("/labs");const slider=page.locator('input[type=range]').first();await slider.focus();await slider.press("End");expect(calls).toBe(0);await page.getByRole("button",{name:"Verify with server"}).click();await expect(page.getByText("Server calculation matches.")).toBeVisible();expect(calls).toBe(1);
});
test("future mobility calculation changes and resets",async({page})=>{await page.goto("/future");const lab=page.locator("#mobility");await expect(lab.getByText("150 kWh")).toBeVisible();await lab.locator('input[type=range]').first().focus();await lab.locator('input[type=range]').first().press("Home");await expect(lab.getByText("0 kWh")).toBeVisible();await lab.getByRole("button",{name:"Reset example"}).click();await expect(lab.getByText("150 kWh")).toBeVisible();});
test("paper builder and brand preview are interactive",async({page})=>{await page.goto("/coaching/paper");await page.getByRole("button",{name:"Create draft paper"}).click();await expect(page.getByRole("heading",{name:"Practice question paper"})).toBeVisible();await page.getByRole("button",{name:"Show teacher key"}).click();await expect(page.getByRole("heading",{name:"Teacher answer key"})).toBeVisible();await page.goto("/coaching/brand");await page.getByLabel("Institute display name").fill("QA Example Institute");await expect(page.getByText("QA Example Institute",{exact:true})).toBeVisible();await page.getByRole("button",{name:"Reset draft"}).click();await expect(page.getByText("QA Example Institute",{exact:true})).toHaveCount(0);});
test("invalid route and legacy redirects",async({request})=>{expect((await request.get("/course/nonexistent-qa-course")).status()).toBe(404);expect((await request.get("/course/1",{maxRedirects:0})).status()).toBe(307);});
test("health and public API latency budget and private no-cache contract",async({request})=>{const samples=[];for(let i=0;i<12;i++){const start=performance.now();const r=await request.get("/api/health");expect(r.ok()).toBe(true);expect(r.headers()["cache-control"]).toContain("no-store");samples.push(performance.now()-start);}samples.sort((a,b)=>a-b);expect(samples[Math.ceil(samples.length*.95)-1],"Local CI health p95 (not production SLA)").toBeLessThan(1500);});
