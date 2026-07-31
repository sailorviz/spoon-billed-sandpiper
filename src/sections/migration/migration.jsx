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

import { narrative } from "../../assets/narrative";
import { loadMigrationDataset } from "../../utils/map/loadMigrationDataset";
import {loadMigrationData} from "../../utils/map/migrationParser";
import {
    buildLineData
} from "../../utils/map/lineBuilder";
import {
    buildMigrationTrack
} from "../../utils/map/trackBuilder";



import { createMap } from "../../utils/map/elements/createMap";
import { createPoints } from "../../utils/map/elements/createPoints";
import { createFlightLines } from "../../utils/map/elements/createlines";
import { createBird } from "../../utils/map/elements/createBird";
import { createNavBird } from "../../utils/map/elements/createNavBird";
import { createLabels } from "../../utils/map/elements/createLabels";
import { createMigrationTrack } from "../../utils/map/elements/createTrack";
import { createNavTrack } from "../../utils/map/elements/createNavTrack";

import { calculateStates } from "./calculateState";

import { renderAnnotationScene } from "./renderAnnotationScene";
import {renderNavigationScene} from "./renderNavigationScene";
import { renderMainScene } from "./renderMainScene";

const Migration = forwardRef((props, ref) => {
    const languageRef = useRef("en");

    const mainChartDivRef = useRef(null);
    const mainSceneRef = useRef(null);

    const navigationChartDivRef = useRef(null);
    const navigationSceneRef = useRef(null);

    const annotationDivRef = useRef(null);
    const annotationSceneRef = useRef(null);

    const birdSpriteRef = useRef(null);
    const birdDataItemRef = useRef(null);

    
    const migrationDataRef = useRef(null);
    const coordinatesRef = useRef([]);



    function initMainScene() {

        const root = am5.Root.new(mainChartDivRef.current);
        // rootRef.current = root;

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

        // chartRef.current = chart;

        createMap(root, chart);

        const points = createPoints(
            root,
            chart,
            migrationDataRef.current.pointData,
            migrationDataRef.current.locationSampleMap
        );

        const labels = createLabels(
            root,
            chart,
            migrationDataRef.current.pointData,
            migrationDataRef.current.locationSampleMap
        );

        const lines = createFlightLines(
            root,
            chart,
            migrationDataRef.current.lineData
        );

        const track = createMigrationTrack(
            root,
            chart
        );

        const bird = createBird(
            root,
            chart,
            migrationDataRef.current.coordinates,
            migrationDataRef.current.birdOverlooking
        );

        return {
            root,
            chart,
            bird: bird,
            lines: lines,
            track: track,
            points: points,
            labels: labels,
        }

    }

    function initNavigationScene() {

        const root = am5.Root.new(navigationChartDivRef.current);

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

        const { polygonSeries } = createMap(root, chart);

        createPoints(
            root,
            chart,
            migrationDataRef.current.pointData,
            migrationDataRef.current.locationSampleMap
        );

        createNavTrack(
            root,
            chart,
            migrationDataRef.current.migrationTrack
        );

        const navBird = createNavBird(
                root,
                chart,
                migrationDataRef.current.coordinates,
            );

        polygonSeries.events.once("datavalidated", () => {

            chart.zoomToGeoPoint(
                {
                    longitude: 150,
                    latitude: 40
                },
                2,
                true,
                0
            );

        });

        return {
            root,
            chart,
            bird: navBird,

            show() {
                navigationChartDivRef.current.style.opacity = "1";
            },

            hide() {
                navigationChartDivRef.current.style.opacity = "0";
            }
        }

    }

    function initAnnotationScene(){

        const container =
            annotationDivRef.current;

        const text =
            document.createElement("div");

        text.className =
            "migration-annotation-text";

        text.innerHTML =
            "";

        container.appendChild(text);

        return {

            setText(value){
                text.innerHTML = value;
            },

            hide(){
                text.innerHTML = "";
            },

            destroy(){
                text.remove();
            }

        };

    }



    useEffect(() => {

        async function init(){
            // load data
            const migrationData =
                await loadMigrationDataset(
                    "/data/KS18827_migration.csv"
                );
            migrationDataRef.current = migrationData;
            coordinatesRef.current = migrationData.coordinates;

            // creat main scene
            mainSceneRef.current = initMainScene();
            // creat navigation scene
            navigationSceneRef.current = initNavigationScene();
            // creat annotation scene
            annotationSceneRef.current = initAnnotationScene();






            // function updateAnima() {

            //     currentIndex++;

            //     if (currentIndex >= coordinatesRef.current.length) {
            //         currentIndex = 0;
            //     }

            //     // change dataItem, the direct location
            //     const [longitude, latitude] = coordinatesRef.current[currentIndex];
            //     const cameraIndex =
            //         Math.min(
            //             currentIndex + 50,
            //             coordinatesRef.current.length - 1
            //         );

            //     const [cameraLon, cameraLat] =
            //         coordinatesRef.current[cameraIndex];

            //     birdDataItemRef.current.setAll({
            //         longitude,
            //         latitude
            //     });

            //     // change the picture's rotation
            //     const current = coordinatesRef.current[currentIndex];
            //     const next = coordinatesRef.current[currentIndex + 1];
            //     const heading = calculateScreenHeading(chart, current, next);
            //     const IMAGE_OFFSET = 90; // 从正北返回到0度
            //     const rotation = heading + IMAGE_OFFSET;

            //     birdSpriteRef.current.set("rotation", rotation);

            //     // "camera follow", change center of this map
            //     chart.zoomToGeoPoint(
            //         {
            //             longitude: cameraLon,
            //             latitude: cameraLat
            //         },
            //         3,
            //         true,
            //         0
            //     );

            // }

            // setInterval(updateAnima, 50);

        }

        init();

        return ()=>{

            mainSceneRef.current?.root.dispose();
            navigationSceneRef.current?.root.dispose();
            annotationSceneRef.current?.destroy();

        };

    },[]);

    useImperativeHandle(ref,()=>({

        updateProgress(narrativeProgress) {

            // safe guard
            if (
                !annotationSceneRef.current ||
                !mainSceneRef.current ||
                !navigationSceneRef.current
            ) {
                return;
            }

            // calculate state
            const state = calculateStates(narrativeProgress);
            // console.log(state);

            // render navigation
            renderNavigationScene(state, navigationSceneRef.current, migrationDataRef.current.migrationTrack);

            // render annotation
            renderAnnotationScene(state, annotationSceneRef.current, languageRef.current, narrative);

            // render main scene
            renderMainScene(state, 
                mainSceneRef.current, 
                migrationDataRef.current.migrationTrack, 
                migrationDataRef.current.pointData,
                languageRef.current, 
                narrative);
        }
        
    }));

    return(
        <div className="migration-chart">

            {/* Main Scene */}
            <div
                ref={mainChartDivRef}
                className="migration-main-scene"
            />

            {/* Navigation Scene */}
            <div
                ref={navigationChartDivRef}
                className="migration-navigation-scene"
            />

            {/* Annotation Scene */}
            <div
                ref={annotationDivRef}
                className="migration-annotation-scene"
            />

        </div>
    );

});

export default Migration;