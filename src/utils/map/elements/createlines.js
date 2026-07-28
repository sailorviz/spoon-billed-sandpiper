import * as am5map from "@amcharts/amcharts5/map";

export function createFlightLines(
    root,
    chart,
    lineData
) {

    const lineSeries = chart.series.push(

        am5map.MapLineSeries.new(root, {})

    );

    lineSeries.data.setAll(lineData);

    return {

        lineSeries

    };

}