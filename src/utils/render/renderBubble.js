export function renderbubble(
    animationState, 
    bubbleLabel, 
    totalDistance, 
    totalDays, 
    language, 
    narrative) {

    const content = narrative?.content;
    const birdId = narrative?.id;
  
    if(animationState.type === "travel"){
        
        if (birdId === "KS18827") {

            bubbleLabel.set(
                "text",
                content[language]?.birdBubble(totalDistance, totalDays)
            );

        } else if (birdId === "orangeK9") {

            bubbleLabel.set(
                "text",
                content[language]?.travel
            );

        }

    }


    if(animationState.type === "inspection"){
        
        const command = animationState.locationID;

        const text =
        command
            ? content[language]?.[command]
            : null;

        bubbleLabel.set(
            "text",
            text
        );

    }
}