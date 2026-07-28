import { deriveLocalProgress } from "./deriveLocalProgress";

export function deriveAnnotationProgress(
    animationProgress,
    animationState
) {

    if (
        !animationState ||
        animationState.type !== "inspection"
    ) {
        return null;
    }

    return deriveLocalProgress(
        animationProgress,
        animationState.start,
        animationState.end
    );

}