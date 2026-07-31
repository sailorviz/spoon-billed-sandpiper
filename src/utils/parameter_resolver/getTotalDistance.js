import { getCompletedTravelDistance } from "./getCompletedTravelDistance";
import { getSegmentDistance } from "./getSegmentDistance";

export function getTotalDistance(
    animationState,
    animationTimeline,
    pointData,
    travelProgress
){

    if(animationState.type !== "travel" ||
      !travelProgress
    ){
        return 0;   // 因为不会用到这个值，也不影响使用时值的计算，所以随便回一个值。
    }

    const completedDistance =
        getCompletedTravelDistance(
            animationState,
            animationTimeline,
            pointData
        );


    const currentSegmentDistance =
        getSegmentDistance(
            animationState.from,
            animationState.to,
            pointData
        );
    
    const totalDistance = completedDistance + currentSegmentDistance * travelProgress;


    return Math.round(totalDistance);

}