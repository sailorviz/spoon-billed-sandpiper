import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";

export function createBird(
    root,
    chart,
    coordinates,
    birdImage
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

    //
    // Bird Bullet
    //
    const birdSprite = am5.Picture.new(root, {

            src: birdImage,

            width: 100,

            height: 50,

            centerX: am5.percent(50),

            centerY: am5.percent(50)

        });

    birdSeries.bullets.push(() => {

        return am5.Bullet.new(root, {

            sprite: birdSprite

        });

    });



    //
    // Bubble Bullet
    //
    const bubbleLabel = am5.Label.new(root, {

        text: "I've travelled 0 km over 0 days.",

        fontSize: 18,

        fill: am5.color(0xffffff)

    });

    const bubbleBackground = am5.RoundedRectangle.new(root, {

        fill: am5.color(0x222222),

        fillOpacity: 1,

        cornerRadiusTL: 12,
        cornerRadiusTR: 12,
        cornerRadiusBL: 12,
        cornerRadiusBR: 12

    });

    const  bubbleContainer = am5.Container.new(root, {

        dx: 70,

        dy: -50,

        layout: root.verticalLayout,

        paddingTop: 12,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,

        background: bubbleBackground

    });

    bubbleContainer.children.push(bubbleLabel);


    birdSeries.bullets.push(() => {

        return am5.Bullet.new(root, {

            sprite: bubbleContainer

        });

    });


    
    const bubbleTail = am5.Graphics.new(root, {

        dx: 90,

        dy: -40,

        fill: am5.color(0x222222),

        fillOpacity: 1,

        rotation: 90,

        svgPath: `
            M 0 0
            L 40 0
            L 20 30
            Z
        `

    });

    birdSeries.bullets.push(() => {

        return am5.Bullet.new(root, {

            sprite: bubbleTail

        });

    });

    // 设置初始不显示
    birdSeries.set(
        "visible",
        false
    );

    return {

        series: birdSeries,

        dataItem: birdDataItem,

        sprite: birdSprite,

        bubble: bubbleContainer,

        label: bubbleLabel,

    };

}