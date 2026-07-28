export function annotationScript(annotationState) {

    if (
        !annotationState ||
        typeof annotationState !== "object" ||
        !annotationState.id
    ) {

        return null;

    }


    return {

        key: annotationState.id

    };

}