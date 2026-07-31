export function renderMigrationTrack(
    trackDataItem,
    migrationTrack,
    currentSampleIndex
) {


    const index =
        Math.floor(currentSampleIndex);


    const visibleSamples =
        migrationTrack.samples.slice(
            0,
            index + 1
        );


    const coordinates =
        visibleSamples.map(sample => [

            sample.longitude,
            sample.latitude

        ]);


    trackDataItem.set(
        "geometry",
        {

            type: "LineString",

            coordinates

        }
    );

}