export function paymentConfig(env=process.env){
 if(env.ST_UPI_ENABLED!=="true")return null;
 try{const c=JSON.parse(env.ST_UPI_CONFIG||"");if(typeof c.payee!=="string"||!c.payee.trim()||c.payee.length>100||typeof c.vpa!=="string"||! /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+$/.test(c.vpa)||typeof c.qr!=="string"||! /^data:image\/png;base64,[A-Za-z0-9+/=]{100,10000}$/.test(c.qr))return null;return {payee:c.payee,vpa:c.vpa,qr:c.qr};}catch{return null;}
}
export function normalizeRrn(value){if(typeof value!=="string"||! /^[0-9]{12}$/.test(value.trim()))throw new RangeError("Enter the 12-digit UPI bank reference");return value.trim();}
export function finalPaise(value){if(typeof value!=="number"||!Number.isSafeInteger(value)||value<100||value>1200000000)throw new RangeError("Invalid final payable amount");return value;}
