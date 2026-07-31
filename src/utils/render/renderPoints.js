export function renderPoints(
    points,
    currentSampleIndex
){

    if(
        !points 
    ){
        return;
    }


    points.items.forEach(item=>{

        item.point.set(
            "visible",
            false
        );

        if(
            currentSampleIndex >= item.sampleIndex
        ){

            item.point.set(
                "visible",
                true
            );

        } 
        

    });

}