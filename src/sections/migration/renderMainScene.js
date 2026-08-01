import { getMainSceneScript } from "../../utils/script/mainSceneScript";
import {getBirdSampleIndex} from "../../utils/script/navBirdScript";
import { getTotalDistance } from "../../utils/parameter_resolver/getTotalDistance";
import { getTotalDays } from "../../utils/parameter_resolver/getTotalDays";

import { renderNavBird } from "../../utils/render/renderNavBird";
import { renderbubble } from "../../utils/render/renderBubble";
import { renderLabels } from "../../utils/render/renderLabels";
import { renderPoints } from "../../utils/render/renderPoints";
import { renderMigrationTrack } from "../../utils/render/renderMigrationTrack";


export function renderMainScene(
  state,
  scene,
  migrationTrack,
  pointData,
  language,
  narrative,
  animationTimeline
){

  // safe guard
  if (
      !state ||
      typeof state !== "object" ||
      !scene ||
      !migrationTrack ||
      !language ||
      !narrative ||
      typeof narrative !== "object"
  ) {
      return;
  }

  // get mode
  const mode = getMainSceneScript(state.narrativeState);

  if (!mode) {
    return;
  }

  // 赋值
  const bird = scene.bird;
  const chart = scene.chart;
  const bubbleLabel = bird.label;
  const lines = scene.lines;
  const track = scene.track;
  const labels = scene.labels;
  const points = scene.points;

  let currentSampleIndex = null;


  // render bird
  if (mode.bird.mode === "hidden") {

    bird.series.set(
        "visible",
        false
    );

  } else {

    bird.series.set(
        "visible",
        true
    );

    const birdIndexResult = getBirdSampleIndex(
      state.travelProgress,
      state.animationState,
      migrationTrack
    );

    if (birdIndexResult) {

      currentSampleIndex =
        birdIndexResult.currentSampleIndex;

      const nextSampleIndex =
          birdIndexResult.nextSampleIndex;

      const currentSample =
          migrationTrack.samples[currentSampleIndex];

      const nextSample =
        migrationTrack.samples[nextSampleIndex];
      
      renderNavBird(bird, chart, currentSample, nextSample);
    }

  }

  // render bubble
  if (mode.bubble.mode === "followBird") {
    const distance = getTotalDistance(
      state.animationState,
      animationTimeline,
      pointData,
      state.travelProgress
    );

    // console.log(distance);
    const days = getTotalDays(
      state.animationState, 
      state.travelProgress, 
      pointData);

    renderbubble(
      state.animationState,
      bubbleLabel,
      distance,
      days,
      language,
      narrative
    );

  }

  // render lines
  if (mode.lines.mode === "show") {

    lines.series.set(
        "visible",
        true
    );

  } else if (mode.lines.mode === "hidden") {
    
    lines.series.set(
        "visible",
        false
    );

  }

  // render track
  if (mode.track.mode === "hidden") {

    track.series.set(
        "visible",
        false
    );

  } else if (mode.track.mode === "followBird") {
    
    track.series.set(
        "visible",
        true
    );

    renderMigrationTrack(
        track.dataItem,
        migrationTrack,
        currentSampleIndex
    );

  }

  // render labels
  if (mode.labels.mode === "all") {

    labels.items.forEach(item=>{

        item.label.set(
            "visible",
            true
        );
    
    });

  } else if (mode.labels.mode === "passed") {
    
    renderLabels(labels, currentSampleIndex);

  }  

  // render points
  if (mode.points.mode === "all") {

    points.items.forEach(item=>{

        item.point.set(
            "visible",
            true
        );
    
    });

  } else if (mode.points.mode === "passed") {
    
    renderPoints(points, currentSampleIndex);

  }

  // render camera
  if (mode.map.mode === "overview") {

      chart.zoomToGeoPoint(
          {
              longitude:0,
              latitude:0
          },
          1,
          true,
          1000
      );

  } else if (mode.map.mode === "followBird") {

      const cameraIndex =
          Math.min(
              currentSampleIndex + 50,
              migrationTrack.samples.length - 1
          );

      const cameraLon =
          migrationTrack.samples[cameraIndex]?.longitude;
      const cameraLat =
          migrationTrack.samples[cameraIndex]?.latitude;
      
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
}

// zoomToGeoPoint(
//     geoPoint,
//     zoomLevel,
//     animate,
//     duration
// )