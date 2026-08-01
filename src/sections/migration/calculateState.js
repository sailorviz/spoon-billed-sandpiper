import { getNarrativeState } from "../../utils/progress/getNarrativeState";
import { deriveOverviewProgress } from "../../utils/progress/deriveOverviewProgress";
import { getOverviewState } from "../../utils/progress/getOverviewState";
import { deriveAnimationProgress } from "../../utils/progress/deriveAnimationProgress";
import { getAnimationState } from "../../utils/progress/getAnimationState";
import { deriveAnnotationProgress } from "../../utils/progress/deriveAnnotationProgress";
import { getAnnotationState } from "../../utils/progress/getAnnotationState";
import { deriveTravelProgress } from "../../utils/progress/deriveTravelProgress";

export function calculateStates(narrativeProgress, timeline){
    if (!narrativeProgress ||
        !timeline) {
        return;
    }
    
    // Narrative

    const narrativeState =
        getNarrativeState(
            narrativeProgress, 
            timeline.narrative
        );


    // Overview

    const overviewProgress =
        deriveOverviewProgress(
            narrativeProgress,
            narrativeState
        );

    const overviewState =
        getOverviewState(
            overviewProgress,
            timeline.overview
        );


    // Animation

    const animationProgress =
        deriveAnimationProgress(
            narrativeProgress,
            narrativeState
        );

    const animationState =
        getAnimationState(
            animationProgress,
            timeline.animation
        );
    
    // travel

    const travelProgress = 
        deriveTravelProgress(
            animationProgress,
            animationState
        );


    // Annotation

    const annotationProgress =
        deriveAnnotationProgress(
            animationProgress,
            animationState
        );

    const annotationState =
        getAnnotationState(
            narrativeState,
            overviewProgress,
            animationState,
            annotationProgress,
            timeline.annotation
        );
    

    return {

        narrativeProgress,
        narrativeState,

        overviewProgress,
        overviewState,

        animationProgress,
        animationState,

        annotationProgress,
        annotationState,

        travelProgress

    };

}