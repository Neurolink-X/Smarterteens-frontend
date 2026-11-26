import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import {execFileSync} from "node:child_process";
const contract=JSON.parse(fs.readFileSync("qa/feature-contracts.json","utf8"));
const features=contract.features;
const fields=["id","purpose","roles","flow","positive","negative","integration","security","performance","files","tests","pages","apis"];
assert.equal(new Set(features.map(f=>f.id)).size,features.length,"duplicate feature id");
const registered=new Set();
for(const f of features){
 for(const k of fields)assert.ok(k in f&&(typeof f[k]!=="string"||f[k].trim()),f.id+" missing "+k);
 assert.ok(f.roles.length&&f.roles.every(r=>Object.hasOwn(contract.roles,r)),f.id+" invalid roles");
 assert.ok(f.tests.length&&f.files.length,f.id+" missing implementation/test evidence");
 for(const file of f.files){assert.ok(fs.existsSync(file),f.id+" stale path "+file);registered.add(file);}
 for(const test of f.tests)assert.ok(fs.existsSync(test),f.id+" missing test "+test);
 if(f.staging)assert.ok(f.tests.includes("e2e/staging.spec.mjs"),f.id+" requires staging evidence");
}
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{const p=path.posix.join(dir,e.name);return e.isDirectory()?walk(p):[p];});}
const sources=[...walk("app"),...walk("lib"),...walk("db"),"next.config.mjs"].filter(p=>/\.(?:m?[jt]sx?|css|sql)$/.test(p));
for(const file of sources)assert.ok(registered.has(file),"Unregistered implementation: "+file+" — add purpose, role, flow and tests in qa/feature-contracts.json");
const base=process.env.QA_BASE_SHA;
if(process.env.CI==="true"&&!base)throw Error("QA_BASE_SHA is required in CI");
if(base&&!/^0+$/.test(base)){
 assert.match(base,/^[0-9a-f]{40}$/);
 const changed=new Set(execFileSync("git",["diff","--name-only",base,"HEAD"],{encoding:"utf8"}).trim().split("\n").filter(Boolean));
 for(const f of features)if(f.files.some(p=>changed.has(p)))assert.ok(f.tests.some(t=>changed.has(t)),"Feature "+f.id+" changed without a corresponding test update; add a meaningful regression test");
}
console.log("Feature contract verified: "+features.length+" groups, "+sources.length+" implementation files.");
