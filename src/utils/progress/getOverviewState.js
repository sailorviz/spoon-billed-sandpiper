import { overviewTimeline } from "../../assets/data/timelineKS18827";
import { getTimelineState } from "./getTimelineState";

export function getOverviewState(
    overviewProgress
) {

    if (overviewProgress === null) {
        return null;
    }

    return getTimelineState(
        overviewProgress,
        overviewTimeline
    );

}