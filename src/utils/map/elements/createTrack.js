import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";


export function createMigrationTrack(
    root,
    chart
) {

    const trackSeries = chart.series.push(
        am5map.MapLineSeries.new(root, {})
    );


    trackSeries.data.setAll([
        {
            geometry: {
                type: "LineString",
                coordinates: []
            }
        }
    ]);


    const trackDataItem =
        trackSeries.dataItems[0];


    return {

        series: trackSeries,

        dataItem: trackDataItem

    };

}