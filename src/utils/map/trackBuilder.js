import * as d3 from "d3-geo";

const EARTH_RADIUS_KM = 6371;
const SAMPLE_SPACING_KM = 20;

/**
 * Build a continuous migration track
 * with distance-based sampling.
 */
// export function buildMigrationTrack(pointData) {

//     const coordinates = [];

//     pointData.forEach((point, index) => {

//         // 最后一个点直接结束
//         if (index === pointData.length - 1) return;

//         const start = [
//             point.longitude,
//             point.latitude
//         ];

//         const end = [
//             pointData[index + 1].longitude,
//             pointData[index + 1].latitude
//         ];

//         // 球面距离（km）
//         const distance =
//             d3.geoDistance(start, end) * EARTH_RADIUS_KM;

//         // 根据距离决定这一段需要多少小段
//         const segmentCount = Math.max(
//             1,
//             Math.ceil(distance / SAMPLE_SPACING_KM)
//         );

//         const interpolate = d3.geoInterpolate(start, end);

//         // 第一段保留起点
//         // 后面的段跳过起点，避免重复
//         const begin = index === 0 ? 0 : 1;

//         for (let i = begin; i <= segmentCount; i++) {

//             const t = i / segmentCount;

//             coordinates.push(
//                 interpolate(t)
//             );

//         }

//     });
//     console.table(coordinates.slice(0, 10));

//     return {

//         id: "migration-track",

//         geometry: {

//             type: "LineString",

//             coordinates

//         }

//     };

// }


export function buildMigrationTrack(pointData) {

    const samples = [];
    const locationSampleMap = {};

    pointData.forEach((point, index) => {

        // 最后一个点直接结束
        if (index === pointData.length - 1) return;

        const start = [
            point.longitude,
            point.latitude
        ];

        const end = [
            pointData[index + 1].longitude,
            pointData[index + 1].latitude
        ];

        // 球面距离（km）
        const distance =
            d3.geoDistance(start, end) * EARTH_RADIUS_KM;

        // 根据距离决定这一段需要多少小段
        const segmentCount = Math.max(
            1,
            Math.ceil(distance / SAMPLE_SPACING_KM)
        );

        const interpolate = d3.geoInterpolate(start, end);

        // 第一段保留起点
        // 后面的段跳过起点，避免重复
        const begin = index === 0 ? 0 : 1;

        for (let i = begin; i <= segmentCount; i++) {

            const t = i / segmentCount;

            const [longitude, latitude] = interpolate(t);

            // 判断当前 Sample 是否对应真实 Location
            let locationPoint = null;

            // 第一段的起点
            if (index === 0 && i === 0) {

                locationPoint = point;

            }
            // 每一段的终点
            else if (i === segmentCount) {

                locationPoint = pointData[index + 1];

            }

            samples.push({

                index: samples.length,

                longitude,
                latitude,

                locationID: locationPoint?.locationID ?? null,
                locationType: locationPoint?.type ?? null,
                locationName: locationPoint?.location ?? null

            });

        }

    });

    console.table(
        samples.filter(sample => sample.locationID !== null)
    );

    samples.forEach((sample, index) => {

        if (sample.locationID !== null) {

            locationSampleMap[sample.locationID] = index;

        }

    });

    console.table(locationSampleMap);

    return {

        id: "migration-track",

        samples,

        locationSampleMap,

        geometry: {

            type: "LineString",

            coordinates: samples.map(sample => [
                sample.longitude,
                sample.latitude
            ])

        }

    };

}