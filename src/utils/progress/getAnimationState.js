import { getTimelineState } from "./getTimelineState";

export function getAnimationState(animationProgress, animationTimeline) {

    if (animationProgress === null) {
        return null;
    }

    return getTimelineState(
        animationProgress,
        animationTimeline
    );

}