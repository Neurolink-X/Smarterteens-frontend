function bounded(v,min,max){if(!Number.isSafeInteger(v)||v<min||v>max)throw new RangeError("Invalid simulation input");return v;}
export function mobilityScenario({distance,evWhPerKm,petrolKmPerL,powerPrice,fuelPrice,upfrontDifference}){
 bounded(distance,0,5000);bounded(evWhPerKm,50,300);bounded(petrolKmPerL,5,60);bounded(powerPrice,1,30);bounded(fuelPrice,30,200);bounded(upfrontDifference,0,1000000);
 const energy=distance*evWhPerKm/1000,litres=distance/petrolKmPerL;
 const evCost=energy*powerPrice,petrolCost=litres*fuelPrice,savings=petrolCost-evCost;
 return {energy,litres,evCost,petrolCost,savings,breakEvenMonths:savings>0?upfrontDifference/savings:null};
}
