import * as d3 from "d3";

export function getBirdSampleIndex(
    travelProgress,
    animationState,
    migrationTrack
) {

    if (!animationState) {
        return null;
    }

    let currentSampleIndex = null;
    let nextSampleIndex = null;

    switch (animationState.type) {

        case "inspection": {

            currentSampleIndex =
                migrationTrack.locationSampleMap[
                    animationState.locationID
                ];

            nextSampleIndex =
                currentSampleIndex + 1;

            break;
        }

        case "travel": {

            const fromIndex =
                migrationTrack.locationSampleMap[
                    animationState.from
                ];

            const toIndex =
                migrationTrack.locationSampleMap[
                    animationState.to
                ];

            currentSampleIndex = Math.round(
                d3.interpolateNumber(
                    fromIndex,
                    toIndex
                )(travelProgress)
            );

            nextSampleIndex = Math.min(
                currentSampleIndex + 1,
                toIndex
            );

            break;
        }

        default:

            return null;

    }

    return {
        currentSampleIndex,
        nextSampleIndex
    };

}