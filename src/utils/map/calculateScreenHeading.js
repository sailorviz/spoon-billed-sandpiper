// export function calculateScreenHeading(chart, current, next) {

//     const [lon1, lat1] = current;
//     const [lon2, lat2] = next;

//     // convert longitude&latitude to screen coordinates
//     const p1 = chart.convert({
//         longitude: lon1,
//         latitude: lat1
//     });
//     const p2 = chart.convert({
//         longitude: lon2,
//         latitude: lat2
//     });

//     const dx = p2.x - p1.x;
//     const dy = p2.y - p1.y;

//     return Math.atan2(dy, dx) * 180 / Math.PI;

// }

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