export const subjects=["school","competitive","skills","science","commerce"];
export function listingInput(v){if(!v||typeof v!=="object"||Array.isArray(v))throw new RangeError("Invalid listing");
const field=(x,min,max)=>{if(typeof x!=="string"||x.trim().length<min||x.trim().length>max||/[<>]/.test(x)||/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(x)||/\d{10,}/.test(x))throw new RangeError("Use public institute details without private contact information");return x.trim();};
if(!subjects.includes(v.subject))throw new RangeError("Invalid subject");
return {display_name:field(v.display_name,2,100),city:field(v.city,2,80),subject:v.subject,description:field(v.description,10,400)};}
export function reviewInput(v){if(!v||!["published","rejected","withdrawn"].includes(v.status))throw new RangeError("Invalid review");if(v.status==="published"&&(v.verified_identity!==true||v.verified_details!==true))throw new RangeError("Independently verify institute identity and listing details first");return {status:v.status,verified_identity:v.verified_identity===true,verified_details:v.verified_details===true};}
