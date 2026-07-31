import { getCompletedDays } from "./getCompletedDays";
import { getTravelDays } from "./getTravelDays";

export function getTotalDays(
    animationState,
    travelProgress,
    pointData
){

    if(animationState.type !== "travel" ||
      !travelProgress
    ){
        return 0;   // 因为不会用到这个值，也不影响使用时值的计算，所以随便回一个值。
    }

    const completedDays =
        getCompletedDays(animationState, pointData);


    const currentSegmentDays =
        getTravelDays(animationState, pointData);

    const totalDays =         
        completedDays
        +
        currentSegmentDays *
        travelProgress;


    return Math.floor(totalDays);

}