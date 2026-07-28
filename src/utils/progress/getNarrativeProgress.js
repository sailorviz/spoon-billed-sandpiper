export function getNarrativeProgress(rect, viewportHeight) {

    if (rect.top > 0) return 0;

    if (rect.bottom < viewportHeight) return 1;

    return Math.abs(rect.top) / (rect.height - viewportHeight);

}