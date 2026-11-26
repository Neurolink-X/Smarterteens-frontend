function bounded(n,min,max){if(!Number.isInteger(n)||n<min||n>max)throw new RangeError("Invalid virtual lab input");return n;}
export function aiReview(total,errors){bounded(total,1,100);bounded(errors,0,total);return {correct:total-errors,accuracy:100*(total-errors)/total};}
export function irrigation(moisture,threshold,sensorValid){bounded(moisture,0,100);bounded(threshold,0,100);if(typeof sensorValid!=="boolean")throw new RangeError("Invalid sensor status");return !sensorValid?"review":moisture<threshold?"water":"hold";}
export function dataStorage(records,bytes){bounded(records,1,1000000);bounded(bytes,1,10000);return {bytes:records*bytes,megabytes:records*bytes/1000000};}
