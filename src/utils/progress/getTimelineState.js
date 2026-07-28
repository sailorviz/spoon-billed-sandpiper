export function getTimelineState(progress, timeline) {

    if (progress === 0) {
        return timeline[0];
    }

    for (const item of timeline) {

        if (
            progress > item.start &&
            progress <= item.end
        ) {
            return item;
        }

    }

    return null;

}
