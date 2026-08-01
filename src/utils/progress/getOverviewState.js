import { getTimelineState } from "./getTimelineState";

export function getOverviewState(
    overviewProgress,
    overviewTimeline
) {

    if (overviewProgress === null) {
        return null;
    }

    return getTimelineState(
        overviewProgress,
        overviewTimeline
    );

}