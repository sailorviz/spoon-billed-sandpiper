import { useRef, useEffect, useState } from "react";
import PopulationTimeline from "../sections/population/PopulationTimeline";
import PopulationDeclineRate from "../sections/population/PopulationDeclineRate";
import "../styles/population.css"

export default function ScrollForPopulation({language}) {

    const sectionRef = useRef(null);
    const timelineRef = useRef(null);
    const declineRateRef = useRef(null);

    return (

        <section ref={sectionRef} className="population-section">

            <PopulationTimeline 
                ref={timelineRef} 
            />

            <PopulationDeclineRate 
                ref={declineRateRef} 
            />

        </section>

    );

}