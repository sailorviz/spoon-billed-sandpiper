import { 
  narrativeTimeline,
  overviewTimeline,
  animationTimeline,
  annotationTimelines
 } from "../../data/timelineOrangeK9";

 import { narrative } from "../../narrative/orangeK9";

 export default {

    id:"orangeK9",

    csvPath:
        "/data/orangeK9_migration.csv",

    timeline: {

        narrative:
            narrativeTimeline,

        overview:
            overviewTimeline,

        animation:
            animationTimeline,

        annotation:
            annotationTimelines

    },

    narrative: {

        id: "orangeK9",
        content: narrative
        
    }

};