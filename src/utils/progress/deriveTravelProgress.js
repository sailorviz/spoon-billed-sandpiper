import { deriveLocalProgress } from "./deriveLocalProgress";

export function deriveTravelProgress(
    animationProgress,
    animationState
) {

    if (
        !animationState ||
        animationState.type !== "travel"
    ) {
        return null;
    }

    return deriveLocalProgress(
        animationProgress,
        animationState.start,
        animationState.end
    );

}