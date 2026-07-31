export function getTravelDays(
    animationState,
    pointData
){

    const fromPoint =
        pointData.find(
            d=>d.locationID=== animationState.from
        );

    const toPoint =
        pointData.find(
            d=>d.locationID=== animationState.to
        );

    const departure =
        new Date(
            fromPoint?.departure
        );


    const arrival =
        new Date(
            toPoint?.arrival
        );

    const travelDays = arrival - departure;

    const transferredDays = travelDays / (1000 * 60 * 60 * 24);

    return transferredDays;

}