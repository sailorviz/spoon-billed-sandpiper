import { annotationTimelines } from "../../assets/data/timelineKS18827";
import { getTimelineState } from "./getTimelineState";

// export function getAnnotationState(
//     annotationProgress,
//     animationState
// ) {

//     if (
//         annotationProgress === null ||
//         !animationState ||
//         animationState.type !== "inspection"
//     ) {
//         return null;
//     }

//     const timeline =
//         annotationTimelines[
//             animationState.locationID
//         ];

//     if (!timeline) {
//         return null;
//     }

//     return getTimelineState(
//         annotationProgress,
//         timeline
//     );

// }

export function getAnnotationState(

    narrativeState,

    overviewProgress,

    animationState,

    annotationProgress

) {

    if (!narrativeState) {
        return null;
    }

    switch (narrativeState.id) {

        case "overview":

            return getTimelineState(
                overviewProgress,
                annotationTimelines.overview
            );

        case "migration":

            if (
                !animationState ||
                animationState.type !== "inspection" ||
                annotationProgress === null
            ) {
                return null;
            }

            const timeline =
                annotationTimelines.inspection[
                    animationState.locationID
                ];

            if (!timeline) {
                return null;
            }

            return getTimelineState(
                annotationProgress,
                timeline
            );

        default:

            return null;

    }

}