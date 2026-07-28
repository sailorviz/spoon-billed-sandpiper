import {getBirdSampleIndex} from "../../utils/script/navBirdScript";
import {renderNavBird} from "../../utils/render/renderNavBird";


// 这里还需要加上整体在overview和migration两个阶段的显示与否
export function renderNavigationScene(
  state,
  scene,
  migrationTrack
){

  if (
      !state ||
      typeof state !== "object" ||
      !scene ||
      !migrationTrack
  ) {
      return;
  }

  if (
    state.narrativeState?.id !== "migration"
  ) {

      scene.hide();

      return;

  }

  scene.show();

  const bird = scene.bird;
  const chart = scene.chart;

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

  const currentSample =
      migrationTrack.samples[currentSampleIndex];
  const nextSample =
    migrationTrack.samples[nextSampleIndex];
  
  renderNavBird(bird, chart, currentSample, nextSample);
}