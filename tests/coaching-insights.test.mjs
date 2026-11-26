import test from "node:test";
import assert from "node:assert/strict";
import {summarizeDisplayed} from "../lib/coaching-insights.mjs";
import {validateRecord} from "../lib/workspace.mjs";
test("displayed fee records never assume omitted receipts are unpaid",()=>{const r=summarizeDisplayed({invoice:[{id:"a",amount_paise:1000},{id:"b",amount_paise:2000}],receipt:[{invoice_id:"a",amount_paise:1000}],attendance:[{status:"present"}],admission:[{status:"new"},{status:"enrolled"}]});assert.equal(r.invoiced,3000);assert.equal(r.received,1000);assert.equal(r.unmatched,2000);assert.equal(r.attendance.present,1);assert.equal(r.counts.enrolled,1);});
test("synthetic admission validation rejects personal names, unknown tracks and client tenant/status",()=>{assert.deepEqual(validateRecord("admission",{code:"Q-01",track:"class11",status:"enrolled",institute_id:"other"}),{code:"Q-01",track:"class11"});assert.throws(()=>validateRecord("admission",{code:"Real Name",track:"class11"}),RangeError);assert.throws(()=>validateRecord("admission",{code:"Q-01",track:"unknown"}),RangeError);});
