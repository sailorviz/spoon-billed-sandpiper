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

    let birdSprite = null;

    let bubbleContainer = null;
    let bubbleLabel = null;

    //
    // Bird Bullet
    //
    birdSeries.bullets.push(() => {

        birdSprite = am5.Picture.new(root, {

            src: birdImage,

            width: 100,

            height: 50,

            centerX: am5.percent(50),

            centerY: am5.percent(50)

        });

        return am5.Bullet.new(root, {

            sprite: birdSprite

        });

    });

    //
    // Bubble Bullet
    //
    birdSeries.bullets.push(() => {

        bubbleLabel = am5.Label.new(root, {

            text: "I've travelled 0 km over 0 days.",

            fontSize: 13,

            fill: am5.color(0xffffff)

        });

        const bubbleBackground = am5.RoundedRectangle.new(root, {

            fill: am5.color(0x222222),

            fillOpacity: 0.85,

            cornerRadiusTL: 10,
            cornerRadiusTR: 10,
            cornerRadiusBL: 10,
            cornerRadiusBR: 10

        });

        bubbleContainer = am5.Container.new(root, {

            dx: 70,

            dy: -50,

            layout: root.verticalLayout,

            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 12,
            paddingRight: 12,

            background: bubbleBackground

        });

        bubbleContainer.children.push(bubbleLabel);

        return am5.Bullet.new(root, {

            sprite: bubbleContainer

        });

    });

    return {

        birdSeries,

        birdDataItem,

        birdSprite,

        bubbleContainer,

        bubbleLabel

    };

}