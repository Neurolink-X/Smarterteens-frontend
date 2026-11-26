function integer(value,min,max){if(!Number.isSafeInteger(value)||value<min||value>max)throw new RangeError("Outside lab range");return value;}
export function energyComparison(watts,hours,days){integer(watts,0,2000);integer(hours,0,24);integer(days,1,31);return {daily:watts*hours/1000,total:watts*hours*days/1000};}
export function compareRates(a,totalA,b,totalB){integer(totalA,1,100);integer(totalB,1,100);integer(a,0,totalA);integer(b,0,totalB);return {rateA:a/totalA*100,rateB:b/totalB*100,winner:Math.sign(a*totalB-b*totalA)};}
