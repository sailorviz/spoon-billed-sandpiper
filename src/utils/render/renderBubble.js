export function renderbubble(
    state, 
    bubbleLabel, 
    totalDistance, 
    totalDays, 
    flightTime, 
    location,
    duration,
    language, 
    narrative) {
  
    if(state === "travel"){

        bubbleLabel.set(
            "text",
            birdBubble(
                totalDistance,
                totalDays,
                flightTime
            )
        );

    }


    if(state === "inspection"){

        bubbleLabel.set(
            "text",
            locationBubble(
                location,
                duration
            )
        );

    }
}