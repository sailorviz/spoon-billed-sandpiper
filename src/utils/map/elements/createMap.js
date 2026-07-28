// createMap.js

import * as am5map from "@amcharts/amcharts5/map";
import worldLow from "@amcharts/amcharts5-geodata/worldLow";

export function createMap(root, chart) {

    const polygonSeries = chart.series.push(

        am5map.MapPolygonSeries.new(root, {

            geoJSON: worldLow

        })

    );

    return {

        polygonSeries

    };

}