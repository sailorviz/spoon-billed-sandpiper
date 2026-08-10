import { useRef, useEffect, useState } from "react";
import PopulationTimeline from "../sections/population/PopulationTimeline";
import "../styles/population.css"

export default function ScrollForPopulation() {

    const timelineRef = useRef(null);
    const sectionRef = useRef(null);


    // useEffect(() => {

    //     function onScroll() {
    //         if (!sectionRef.current) return;
    //         const rect = sectionRef.current.getBoundingClientRect();

    //         const progress = getNarrativeProgress(
    //             rect,
    //             window.innerHeight
    //         );

    //         timelineRef.current?.updateProgress(progress);

    //         // console.log(progress);

    //     }

    //     onScroll();
    //     window.addEventListener("scroll", onScroll);

    //     return () => window.removeEventListener("scroll", onScroll);

    // }, []);

    return (

        <section ref={sectionRef} className="population-section">

            <PopulationTimeline 
                ref={timelineRef} 
            />

            {/* <div className="timeline-stickyContainer">

                <PopulationTimeline 
                    ref={timelineRef} 
                />

            </div> */}

        </section>

    );

}