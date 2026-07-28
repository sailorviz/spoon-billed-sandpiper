import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";

export function createNavBird(
    root,
    chart,
    coordinates
) {

    const birdSeries = chart.series.push(

        am5map.MapPointSeries.new(root, {})

    );

    birdSeries.data.setAll([

        {

            longitude: coordinates[0][0],

            latitude: coordinates[0][1]

        }

    ]);

    const birdDataItem = birdSeries.dataItems[0];

    // 先创建 sprite
    const birdSprite = am5.Triangle.new(root, {
        width: 16,
        height: 20,
        fill: am5.color(0xffffff),
        stroke: am5.color(0x333333),
        strokeWidth: 1,
        centerX: am5.percent(50),
        centerY: am5.percent(50)
    });

    // 再添加到 bullet
    birdSeries.bullets.push(() => {
        return am5.Bullet.new(root, {
            sprite: birdSprite
        });
    });

    return {

        dataItem: birdDataItem,

        sprite: birdSprite


    };

}