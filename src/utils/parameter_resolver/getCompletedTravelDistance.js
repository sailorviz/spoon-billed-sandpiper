import { getSegmentDistance } from "./getSegmentDistance";

export function getCompletedTravelDistance(
    animationState,
    animationTimeline,
    pointData
){

    const currentIndex =
        animationTimeline.findIndex(
            d=>d.id===animationState.id
        );


    return animationTimeline
        .slice(0,currentIndex)
        .filter(
            d=>d.type==="travel"
        )
        .reduce(
            (sum,segment)=>{

                return sum +
                    getSegmentDistance(
                        segment.from,
                        segment.to,
                        pointData
                    );

            },
            0
        );

}