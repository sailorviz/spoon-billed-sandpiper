export function deriveLocalProgress(progress, start, end) {

    if (
        typeof progress !== "number" ||
        typeof start !== "number" ||
        typeof end !== "number"
    ) {
        return null;
    }

    if (start === end) {
        return null;
    }

    const localProgress =
        (progress - start) /
        (end - start);

    return Math.max(
        0,
        Math.min(1, localProgress)
    );

}