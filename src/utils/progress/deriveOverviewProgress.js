import { deriveLocalProgress } from "./deriveLocalProgress";

export function deriveOverviewProgress(
    narrativeProgress,
    narrativeState
) {

    if (
        !narrativeState ||
        narrativeState.id !== "overview"
    ) {
        return null;
    }

    return deriveLocalProgress(
        narrativeProgress,
        narrativeState.start,
        narrativeState.end
    );

}