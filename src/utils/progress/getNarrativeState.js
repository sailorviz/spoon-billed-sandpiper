import { narrativeTimeline } from "../../assets/data/timeline";
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