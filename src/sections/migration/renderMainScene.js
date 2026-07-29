import {
    useRef,
} from "react";

import { getMainSceneScript } from "../../utils/script/mainSceneScript";
import {getBirdSampleIndex} from "../../utils/script/navBirdScript";
import { renderNavBird } from "../../utils/render/renderNavBird";
import { renderbubble } from "../../utils/render/renderBubble";


export function renderMainScene(
  state,
  scene,
  migrationTrack,
  language,
  narrative
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
  const currentSampleIndexRef = useRef(null);

  const bird = scene.bird;
  const chart = scene.chart;
  const bubbleLabel = bird.label;
  const lines = scene.lines;
  const track = scene.track;
  const labels = scene.labels;
  const points = scene.points;


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

    if (!birdIndexResult) {
      // 处理异常情况，比如跳过渲染或使用默认值
      console.warn('无法获取鸟的样本索引，跳过渲染');
      return;
    }

    const {currentSampleIndex, nextSampleIndex} = getBirdSampleIndex(
      state.travelProgress,
      state.animationState,
      migrationTrack
    );

    currentSampleIndexRef.current = currentSampleIndex;

    const currentSample =
        migrationTrack.samples[currentSampleIndex];

    const nextSample =
      migrationTrack.samples[nextSampleIndex];
    
    renderNavBird(bird, chart, currentSample, nextSample);

  }

  // render bubble
  if (mode.bubble.mode === "followBird") {
    const distance = getDistance();
    const days = getDays();
    const flightTime = getFlightTime();
    const duration = getDuration();
    const location = getLocation();

    renderbubble(
      state.animationState,
      bubbleLabel,
      distance,
      days,
      flightTime,
      location,
      duration,
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
    
    renderTrack(state.travelProgress);

  }

  // render labels
  if (mode.labels.mode === "all") {



  } else if (mode.labels.mode === "passed") {
    


  }  

  // render points
  if (mode.points.mode === "all") {



  } else if (mode.points.mode === "passed") {
    


  }

  // render map
  if (mode.map.mode === "overview") {



  } else if (mode.map.mode === "followBird") {
            // currentSampleIndexRef.current

            
            //     const cameraIndex =
            //         Math.min(
            //             currentIndex + 50,
            //             coordinatesRef.current.length - 1
            //         );

            //     const [cameraLon, cameraLat] =
            //         coordinatesRef.current[cameraIndex];

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

  }
}