function mainSceneScript(
    animationState,
    animationProgress,
    migrationData
) {

    if (!animationState) {
        return null;
    }

    // --------------------------------
    // Overview
    // --------------------------------

    if (animationState.id === "overview") {
        return {
            map: {
                mode: "overview",
                focus: null
            },

            lines: {
                visible: true
            },

            points: {
                mode: "all"
            },

            labels: {
                mode: "all"
            },

            track: {
                visible: false,
                progress: 0
            },

            bird: {
                visible: false,
                mode: "hidden",
                progress: 0
            },

            bubble: {
                visible: false
            }
        };
    }


    // --------------------------------
    // Migration
    // --------------------------------

    if (animationState.id === "travel") {
        return {
            map: {
                mode: "follow-bird"
            },

            lines: {
                visible: false
            },

            points: {
                mode: "passed",
                progress: animationProgress
            },

            labels: {
                mode: "passed",
                progress: animationProgress
            },

            track: {
                visible: true,
                progress: animationProgress
            },

            bird: {
                visible: true,
                mode: "move",
                progress: animationProgress
            },

            bubble: {
                visible: true,
                progress: animationProgress
            }
        };
    }


    if (animationState.id === "inspection") {
        return {
            map: {
                mode: "follow-bird"
            },

            lines: {
                visible: false
            },

            points: {
                mode: "passed",
                progress: animationProgress
            },

            labels: {
                mode: "passed",
                progress: animationProgress
            },

            track: {
                visible: true,
                progress: animationProgress
            },

            bird: {
                visible: true,
                mode: "freeze",
                progress: animationProgress
            },

            bubble: {
                visible: true,
                progress: animationProgress
            }
        };
    }

    return null;
}