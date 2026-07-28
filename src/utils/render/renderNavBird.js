import { calculateScreenHeading } from "../map/calculateScreenHeading";

export function renderNavBird(
    bird,
    chart,
    currentSample,
    nextSample
) {

    if (
        !bird ||
        !chart ||
        !currentSample
    ) {
        return;
    }

    const offset = 90;

    // position
    bird.dataItem?.setAll({

        longitude: currentSample.longitude,

        latitude: currentSample.latitude

    });

    // direction
    if (nextSample) {

        const sameSample =
            currentSample.longitude === nextSample.longitude &&
            currentSample.latitude === nextSample.latitude;

        if (!sameSample) {

            const heading =
                calculateScreenHeading(
                    chart,
                    currentSample,
                    nextSample
                );
            const rotation = heading + offset;

            bird.sprite?.set(
                "rotation",
                rotation
            );

        }

    }

}