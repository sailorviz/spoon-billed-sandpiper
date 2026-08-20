import { loadMigrationData } from "./migrationParser";
import { buildLineData } from "./lineBuilder";
import { buildMigrationTrack } from "./trackBuilder";
import birdOverlooking from "../../assets/img/bird_overlooking.png";


export async function loadMigrationDataset(csvPath) {

    const pointData =
        await loadMigrationData(csvPath);

    const lineData =
        buildLineData(pointData);

    const migrationTrack =
        buildMigrationTrack(pointData);

    const coordinates =
        migrationTrack.geometry.coordinates;

    const locationSampleMap = 
        migrationTrack.locationSampleMap;

    return {

        pointData,

        lineData,

        migrationTrack,

        coordinates,

        locationSampleMap,

        birdOverlooking,

    };

}