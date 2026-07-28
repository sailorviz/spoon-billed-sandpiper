/**
 * Build line segments from migration points
 */
// import { geoInterpolate } from "d3-geo";

export function buildLineData(pointData) {

    const lineData = [];

    for (let i = 0; i < pointData.length - 1; i++) {

        const from = pointData[i];
        const to = pointData[i + 1];

        lineData.push({

            id: `${from.locationID}-${to.locationID}`,

            from,
            to,

            distanceKm: to.distanceFromLastSiteKm,
            flightTimeHours: to.flightTimeHours,

            geometry: {
                type: "LineString",
                coordinates: [
                  [from.longitude, from.latitude],
                  [to.longitude, to.latitude]
                ]
                            
            }

        });

    }

    return lineData;

}