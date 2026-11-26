import test from "node:test";import assert from "node:assert/strict";
import {validateRecord,toPaise,sameOrigin} from "../lib/workspace.mjs";
const id="a1234567-1234-1234-1234-123456789abc";
test("tenant and owner supplied by client are ignored",()=>assert.deepEqual(validateRecord("batch",{name:"Test",institute_id:"evil",owner_id:"evil"}),{name:"Test"}));
test("reject invalid learner IDs and personal-looking code characters",()=>{assert.throws(()=>validateRecord("learner",{code:"John Doe",batch_id:id}));assert.throws(()=>validateRecord("learner",{code:"L-1",batch_id:"bad"}));});
test("valid attendance and dates",()=>{assert.equal(validateRecord("attendance",{learner_id:id,day:"2024-02-29",status:"late"}).status,"late");for(const d of ["2025-02-29","2024-13-01","invalid"])assert.throws(()=>validateRecord("attendance",{learner_id:id,day:d,status:"present"}));});
test("currency uses integer paise and rejects malformed input",()=>{assert.equal(toPaise("123.09"),12309);for(const s of ["1e3","2.123","-1","NaN"])assert.throws(()=>toPaise(s));assert.throws(()=>validateRecord("invoice",{learner_id:id,description:"Fee",amount_paise:0,due_on:"2026-12-01"}));});
test("receipt ignores client-supplied amount",()=>assert.deepEqual(validateRecord("receipt",{invoice_id:id,amount_paise:1,method:"cash"}),{invoice_id:id,method:"cash"}));
test("mutation origin must match",()=>{assert.ok(sameOrigin(new Request("https://app.example/api",{headers:{origin:"https://app.example"}})));assert.ok(!sameOrigin(new Request("https://app.example/api",{headers:{origin:"https://evil.example"}})));assert.ok(!sameOrigin(new Request("https://app.example/api")));});
