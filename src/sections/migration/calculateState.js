import { getNarrativeState } from "../../utils/progress/getNarrativeState";
import { deriveOverviewProgress } from "../../utils/progress/deriveOverviewProgress";
import { getOverviewState } from "../../utils/progress/getOverviewState";
import { deriveAnimationProgress } from "../../utils/progress/deriveAnimationProgress";
import { getAnimationState } from "../../utils/progress/getAnimationState";
import { deriveAnnotationProgress } from "../../utils/progress/deriveAnnotationProgress";
import { getAnnotationState } from "../../utils/progress/getAnnotationState";
import { deriveTravelProgress } from "../../utils/progress/deriveTravelProgress";

export function calculateStates(narrativeProgress){
    // Narrative

    const narrativeState =
        getNarrativeState(narrativeProgress);


    // Overview

    const overviewProgress =
        deriveOverviewProgress(
            narrativeProgress,
            narrativeState
        );

    const overviewState =
        getOverviewState(
            overviewProgress
        );


    // Animation

    const animationProgress =
        deriveAnimationProgress(
            narrativeProgress,
            narrativeState
        );

    const animationState =
        getAnimationState(
            animationProgress
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
            annotationProgress
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