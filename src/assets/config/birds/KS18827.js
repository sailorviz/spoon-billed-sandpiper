import { 
  narrativeTimeline,
  overviewTimeline,
  animationTimeline,
  annotationTimelines
 } from "../../data/timelineKS18827";

 import { narrative } from "../../narrative/KS18827";

 export default {

    id:"KS18827",

    csvPath:
        "/data/KS18827_migration.csv",

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

        id: "KS18827",
        content: narrative
        
    }

};