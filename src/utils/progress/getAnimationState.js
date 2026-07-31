import { animationTimeline } from "../../assets/data/timelineKS18827";
import { getTimelineState } from "./getTimelineState";

export function getAnimationState(animationProgress) {

    if (animationProgress === null) {
        return null;
    }

    return getTimelineState(
        animationProgress,
        animationTimeline
    );

}