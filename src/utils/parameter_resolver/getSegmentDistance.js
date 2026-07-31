export function getSegmentDistance(
    from,
    to,
    pointData
){

  // 这里是找index
    const startIndex =
        pointData.findIndex(
            d=>d.locationID===from
        );

    const endIndex =
        pointData.findIndex(
            d=>d.locationID===to
        );


    if(
        startIndex === -1 ||
        endIndex === -1
    ){
        return 0;
    }

    // javascript的slice(start, end)包含start,不包含end

    return pointData
        .slice(
            startIndex + 1,
            endIndex + 1
        )
        .reduce(
            (sum,d)=>
                sum + d.distanceFromLastSiteKm,
            0  //初始值为0
        );

}