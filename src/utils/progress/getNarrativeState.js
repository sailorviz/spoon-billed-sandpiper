import { narrativeTimeline } from "../../assets/data/timelineKS18827";
import { getTimelineState } from "./getTimelineState";

export function getNarrativeState(narrativeProgress) {

    if (narrativeProgress === null) {
        return null;
    }

    return getTimelineState(
        narrativeProgress,
        narrativeTimeline
    );

}