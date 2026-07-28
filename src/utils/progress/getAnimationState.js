import { animationTimeline } from "../../assets/data/timeline";
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