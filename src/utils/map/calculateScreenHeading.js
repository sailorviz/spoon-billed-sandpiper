export function calculateScreenHeading(
    chart,
    currentSample,
    nextSample
) {

    const current = chart.convert({
        longitude: currentSample.longitude,
        latitude: currentSample.latitude
    });

    const next = chart.convert({
        longitude: nextSample.longitude,
        latitude: nextSample.latitude
    });

    const dx = next.x - current.x;
    const dy = next.y - current.y;

    return Math.atan2(dy, dx) * 180 / Math.PI;

}