export async function readSmallJson(request){
 if(!request.headers.get("content-type")?.toLowerCase().startsWith("application/json"))throw new RangeError("Expected JSON");
 const reader=request.body?.getReader();
 if(!reader)throw new RangeError("Missing body");
 let bytes=0;const decoder=new TextDecoder();let body="";
 try{while(true){const {done,value}=await reader.read();if(done)break;bytes+=value.byteLength;if(bytes>4096){await reader.cancel();throw new RangeError("Request too large");}body+=decoder.decode(value,{stream:true});}body+=decoder.decode();return JSON.parse(body);}finally{reader.releaseLock();}
}
export function invalid(){return Response.json({error:"Invalid request"},{status:400,headers:{"Cache-Control":"no-store"}});}
