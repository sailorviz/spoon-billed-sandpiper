export function renderLabels(
    labels,
    currentSampleIndex
){

    if(
        !labels 
    ){
        return;
    }


    labels.items.forEach(item=>{

        item.label.set(
            "visible",
            false
        );

        if(
            currentSampleIndex >= item.sampleIndex
        ){

            item.label.set(
                "visible",
                true
            );

        } 
        

    });

}