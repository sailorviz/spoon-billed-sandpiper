import { annotationScript } from "../../utils/script/annotationScript";
import { renderAnnotation } from "../../utils/render/renderAnnotation";

export function renderAnnotationScene(
    state,
    scene,
    language,
    narrative
) {

    if (
        !state ||
        typeof state !== "object" ||
        !scene ||
        !language ||
        !narrative ||
        typeof narrative !== "object"
    ) {
        return;
    }

    const command =
        annotationScript(
            state.annotationState
        );

    renderAnnotation(
        scene,
        command,
        language,
        narrative
    );

}