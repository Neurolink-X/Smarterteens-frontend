export async function readSmallJson(request){
 if(request.headers.get("content-type")?.split(";",1)[0].trim().toLowerCase()!=="application/json")throw new RangeError("Expected JSON");
 const reader=request.body?.getReader();
 if(!reader)throw new RangeError("Missing body");
 let bytes=0;const decoder=new TextDecoder("utf-8",{fatal:true});let body="";
 try{while(true){const {done,value}=await reader.read();if(done)break;bytes+=value.byteLength;if(bytes>4096){await reader.cancel();throw new RangeError("Request too large");}body+=decoder.decode(value,{stream:true});}body+=decoder.decode();return JSON.parse(body);}catch(error){if(error instanceof TypeError)throw new RangeError("Invalid request encoding");throw error;}finally{reader.releaseLock();}
}
export function invalid(){return Response.json({error:"Invalid request"},{status:400,headers:{"Cache-Control":"no-store"}});}
