export function renderbubble(
    animationState, 
    bubbleLabel, 
    totalDistance, 
    totalDays, 
    language, 
    narrative) {
  
    if(animationState.type === "travel"){

        bubbleLabel.set(
            "text",
            narrative[language]?.birdBubble(totalDistance, totalDays)
        );

    }


    if(animationState.type === "inspection"){
        
        const command = animationState.locationID;

        const text =
        command
            ? narrative[language]?.[command]
            : null;

        bubbleLabel.set(
            "text",
            text
        );

    }
}