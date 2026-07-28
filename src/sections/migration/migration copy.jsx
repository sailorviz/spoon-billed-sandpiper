// Migration
// │
// ├── Main Scene
// │      ├── World
// │      ├── FlightLines
// │      ├── StopoverPoints
// │      ├── LocationLabels
// │      ├── MigrationTrack
// │      ├── Bird
// │      └── BirdBubble
// │
// ├── Navigation Scene
// │      ├── NavigationMap
// │      ├── NavigationTrack
// │      └── NavigationBird
// │
// └── Annotation


import {
    useRef,
    useEffect,
    forwardRef,
    useImperativeHandle
} from "react";

import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import worldLow from "@amcharts/amcharts5-geodata/worldLow";

import {loadMigrationData} from "../../utils/map/migrationParser";

import {
    buildLineData
} from "../../utils/map/lineBuilder";

import {
    buildMigrationTrack
} from "../../utils/map/trackBuilder";

import birdOverlooking from "../../assets/bird_overlooking.png";
import { getNarrativeState } from "../../utils/progress/getNarrativeState";
import { deriveOverviewProgress } from "../../utils/progress/deriveOverviewProgress";
import { getOverviewState } from "../../utils/progress/getOverviewState";
import { deriveAnimationProgress } from "../../utils/progress/deriveAnimationProgress";
import { getAnimationState } from "../../utils/progress/getAnimationState";
import { deriveAnnotationProgress } from "../../utils/progress/deriveAnnotationProgress";
import { getAnnotationState } from "../../utils/progress/getAnnotationState";

const Migration = forwardRef((props, ref) => {

    const chartDivRef = useRef(null);
    const navigationChartRef = useRef(null);

    const rootRef = useRef(null);
    const chartRef = useRef(null);

    const birdSpriteRef = useRef(null);
    const birdDataItemRef = useRef(null);

    const coordinatesRef = useRef([]);

    useEffect(() => {

        async function init(){

            const root = am5.Root.new(chartDivRef.current);
            rootRef.current = root;

            root.setThemes([
                am5themes_Animated.new(root)
            ]);

            const chart = root.container.children.push(
                am5map.MapChart.new(root, {
                    panX: "none",
                    panY: "none",
                    wheelX: "none",
                    wheelY: "none",
                    projection: am5map.geoNaturalEarth1(),
                    rotationX: -154.8,
                })
            );
            chartRef.current = chart;

            console.log(chartDivRef.current.clientWidth);
            console.log(chartDivRef.current.clientHeight);

            chart.series.push(
                am5map.MapPolygonSeries.new(root, {
                    geoJSON: worldLow
                })
            );

            const pointSeries = chart.series.push(
            am5map.MapPointSeries.new(root, {})
            );
            const lineSeries = chart.series.push(
                am5map.MapLineSeries.new(root, {})
            );
            const trackSeries = chart.series.push(
                am5map.MapLineSeries.new(root, {})
            );
            const birdSeries = chart.series.push(
                am5map.MapPointSeries.new(root, {})
            );

            let currentIndex = 0;

            // load data
            const pointData = await loadMigrationData("/data/KS18827_migration.csv");
            const lineData = buildLineData(pointData);
            console.table(lineData);
            const migrationTrack = buildMigrationTrack(pointData);

            coordinatesRef.current = migrationTrack.geometry.coordinates;
            birdSeries.data.setAll([
                {
                    longitude: coordinatesRef.current[0][0],
                    latitude: coordinatesRef.current[0][1]
                }
            ]);
            
            birdDataItemRef.current = birdSeries.dataItems[0];

            // draw points
            pointSeries.data.setAll(pointData);
            pointSeries.bullets.push(function () {
            return am5.Bullet.new(root, {
                sprite: am5.Circle.new(root, {
                    radius: 5,
                    fill: am5.color(0xff0000)
                    })
            });
            });

            // draw line segments
            lineSeries.data.setAll(lineData);

            // draw one bird
            birdSeries.bullets.push(() => {

                birdSpriteRef.current = am5.Picture.new(root, {

                    src: birdOverlooking,

                    width: 100,

                    height: 50,

                    centerX: am5.percent(50),

                    centerY: am5.percent(50)

                });

                return am5.Bullet.new(root, {

                    sprite: birdSpriteRef.current
                });

            });

            function calculateScreenHeading(chart, current, next) {

                const [lon1, lat1] = current;
                const [lon2, lat2] = next;

                // convert longitude&latitude to screen coordinates
                const p1 = chart.convert({
                    longitude: lon1,
                    latitude: lat1
                });
                const p2 = chart.convert({
                    longitude: lon2,
                    latitude: lat2
                });

                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;

                return Math.atan2(dy, dx) * 180 / Math.PI;

            }

            function updateAnima() {

                currentIndex++;

                if (currentIndex >= coordinatesRef.current.length) {
                    currentIndex = 0;
                }

                // change dataItem, the direct location
                const [longitude, latitude] = coordinatesRef.current[currentIndex];
                const cameraIndex =
                    Math.min(
                        currentIndex + 50,
                        coordinatesRef.current.length - 1
                    );

                const [cameraLon, cameraLat] =
                    coordinatesRef.current[cameraIndex];

                birdDataItemRef.current.setAll({
                    longitude,
                    latitude
                });

                // change the picture's rotation
                const current = coordinatesRef.current[currentIndex];
                const next = coordinatesRef.current[currentIndex + 1];
                const heading = calculateScreenHeading(chart, current, next);
                const IMAGE_OFFSET = 90; // 从正北返回到0度
                const rotation = heading + IMAGE_OFFSET;

                birdSpriteRef.current.set("rotation", rotation);

                // "camera follow", change center of this map
                chart.zoomToGeoPoint(
                    {
                        longitude: cameraLon,
                        latitude: cameraLat
                    },
                    3,
                    true,
                    0
                );

            }

            // setInterval(updateAnima, 50);

        }

        init();

        return ()=>{

            rootRef.current?.dispose();

        };

    },[]);

    useImperativeHandle(ref,()=>({

        setProgress(narrativeProgress) {

            // Narrative

            const narrativeState =
                getNarrativeState(narrativeProgress);


            // Overview

            const overviewProgress =
                deriveOverviewProgress(
                    narrativeProgress,
                    narrativeState
                );

            const overviewState =
                getOverviewState(
                    overviewProgress
                );


            // Animation

            const animationProgress =
                deriveAnimationProgress(
                    narrativeProgress,
                    narrativeState
                );

            const animationState =
                getAnimationState(
                    animationProgress
                );


            // Annotation

            const annotationProgress =
                deriveAnnotationProgress(
                    animationProgress,
                    animationState
                );

            const annotationState =
                getAnnotationState(
                    annotationProgress,
                    animationState
                );


            console.log({

                narrativeState,

                overviewProgress,
                overviewState,

                animationProgress,
                animationState,

                annotationProgress,
                annotationState

            });

        }
        
    }));

    return(
        <div className="migration-chart">

            {/* Main Scene */}
            <div
                ref={chartDivRef}
                className="migration-main-scene"
            />

            {/* Navigation Scene */}
            <div
                ref={navigationChartRef}
                className="migration-navigation-scene"
            />

            {/* Annotation Scene */}
            <div
                className="migration-annotation-scene"
            />

        </div>
    );

});

export default Migration;