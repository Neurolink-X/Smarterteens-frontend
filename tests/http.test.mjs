import test from "node:test";import assert from "node:assert/strict";import {readSmallJson,invalid} from "../lib/http.mjs";
const request=(body,type="application/json")=>new Request("http://localhost/api",{method:"POST",headers:{"Content-Type":type},body});
test("valid JSON",async()=>assert.deepEqual(await readSmallJson(request('{"x":1}')),{x:1}));
test("oversized and malformed bodies rejected",async()=>{await assert.rejects(readSmallJson(request("x".repeat(4097))));await assert.rejects(readSmallJson(request("{")));await assert.rejects(readSmallJson(request("{}","text/plain")));});
test("invalid response status",()=>assert.equal(invalid().status,400));
