import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";

export function createLabels(
    root,
    chart,
    pointData
) {

    const labelSeries = chart.series.push(
        am5map.MapPointSeries.new(root, {})
    );

    labelSeries.data.setAll(pointData);

    labelSeries.bullets.push((root, series, dataItem) => {

        return am5.Bullet.new(root, {

            sprite: am5.Label.new(root, {

                text: dataItem.dataContext.location,

                centerX: am5.percent(50),

                centerY: am5.percent(100),

                dy: -12

            })

        });

    });

    return {

        labelSeries

    };

}