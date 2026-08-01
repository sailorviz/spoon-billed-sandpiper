import { getTimelineState } from "./getTimelineState";

export function getNarrativeState(narrativeProgress, narrativeTimeline) {

    if (narrativeProgress === null) {
        return null;
    }

    return getTimelineState(
        narrativeProgress,
        narrativeTimeline
    );

}