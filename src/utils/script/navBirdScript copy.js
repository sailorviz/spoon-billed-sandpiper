import * as d3 from "d3";

export function getBirdSampleIndex(
    travelProgress,
    animationState,
    migrationTrack
) {

    if (!animationState) {
        return null;
    }

    switch (animationState.type) {

        case "inspection": {
            const sampleIndex = migrationTrack.locationSampleMap[
                animationState.locationID];

            // console.log(sampleIndex);
            return sampleIndex;
            
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
            
            const sampleIndex = Math.round(
                d3.interpolateNumber(
                    fromIndex,
                    toIndex
                )(travelProgress)
            );

            // console.log(sampleIndex);
            return sampleIndex;

        }

        default:

            return null;

    }

}