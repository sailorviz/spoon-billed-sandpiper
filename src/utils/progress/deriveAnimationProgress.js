import { deriveLocalProgress } from "./deriveLocalProgress";

export function deriveAnimationProgress(
    narrativeProgress,
    narrativeState
) {

    if (
        !narrativeState ||
        narrativeState.id !== "migration"
    ) {
        return null;
    }

    return deriveLocalProgress(
        narrativeProgress,
        narrativeState.start,
        narrativeState.end
    );

}