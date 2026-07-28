import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";

export function createPoints(
    root,
    chart,
    pointData
) {

    const pointSeries = chart.series.push(

        am5map.MapPointSeries.new(root, {})

    );

    pointSeries.data.setAll(pointData);

    pointSeries.bullets.push(function () {

        return am5.Bullet.new(root, {

            sprite: am5.Circle.new(root, {

                radius: 5,

                fill: am5.color(0xff0000)

            })

        });

    });

    return {

        pointSeries

    };

}