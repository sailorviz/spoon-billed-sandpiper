import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";

export function createNavTrack(
    root,
    chart,
    migrationTrack
) {

    const trackSeries = chart.series.push(

        am5map.MapLineSeries.new(root, {})

    );

    trackSeries.data.setAll([
        migrationTrack
    ]);

    return {

        series:trackSeries

    };

}

