export function getCompletedDays(
    animationState,
    pointData
){

    const startPoint = pointData[0];
    const fromPoint =
        pointData.find(
            d=>d.locationID=== animationState?.from
        );

    const start =
        new Date(
            startPoint?.departure
        );

    const lastPointDepature =
        new Date(
            fromPoint?.departure
        );
  
    const completedDays = lastPointDepature - start;

    const transferredDays = completedDays / (1000 * 60 * 60 * 24);

    return transferredDays;

}