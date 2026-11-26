const limits={purchased:100,sold:100,unitCost:500,unitPrice:500,overhead:2000};
export function moneyLab(input){
 if(!input||typeof input!=="object"||Array.isArray(input))throw new RangeError("Invalid scenario");
 for(const [k,max] of Object.entries(limits))if(!Number.isSafeInteger(input[k])||input[k]<0||input[k]>max)throw new RangeError("Invalid "+k);
 const {purchased,sold,unitCost,unitPrice,overhead}=input;
 if(sold>purchased)throw new RangeError("Sold units cannot exceed purchased units");
 const sales=sold*unitPrice,cashSpent=purchased*unitCost+overhead,inventoryCost=(purchased-sold)*unitCost;
 return {sales,cashSpent,cashChange:sales-cashSpent,profit:sales-cashSpent+inventoryCost,inventoryCost};
}
export const plans=Object.freeze([{id:"starter",name:"Starter",monthly:499},{id:"pro",name:"Pro",monthly:999},{id:"business",name:"Business",monthly:2499}]);
export function estimatePlan(id,months){
 const plan=plans.find(p=>p.id===id);
 if(!plan||!Number.isSafeInteger(months)||months<1||months>12)throw new RangeError("Invalid plan or duration");
 return {plan:plan.id,months,subtotal:plan.monthly*months,currency:"INR",illustrative:true};
}
export const challenges=[
 {question:"An AI gives you a surprising historical fact. What do you do?",options:["Share immediately","Check credible independent sources","Assume confidence means accuracy"],answer:1,explanation:"AI can generate plausible but incorrect claims. Verify against independent evidence."},
 {question:"A homework chatbot asks for your school ID and password.",options:["Enter both","Ask a friend to enter theirs","Do not share; ask a trusted adult"],answer:2,explanation:"Never share credentials with an unverified tool."},
 {question:"You want AI to help solve a maths problem.",options:["Ask for hints, solve and verify yourself","Copy the answer without checking","Skip learning the method"],answer:0,explanation:"Hints support learning while independent verification builds reasoning."}
];
export const careers=[
 {title:"Engineering",task:"Design a paper bridge and compare load capacity with different folds.",reflection:"What trade-offs did you make between strength, cost and weight?"},
 {title:"Design",task:"Sketch a more accessible school timetable for a student with low vision.",reflection:"Which changes improved readability and why?"},
 {title:"Business",task:"Interview a trusted adult about a daily problem and sketch a low-cost solution.",reflection:"How would you check whether anyone needs the solution?"},
 {title:"Science",task:"Compare evaporation from two identical cups placed in different safe locations.",reflection:"Which variable changed and what would make the test fair?"}
];