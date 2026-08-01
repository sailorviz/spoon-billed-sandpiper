import { useRef, useEffect, useState } from "react";
import Migration from "../sections/migration/migration";
import "../styles/migration.css"
import { getNarrativeProgress } from "../utils/progress/getNarrativeProgress";

export default function ScrollForMigration() {

    const migrationRef = useRef(null);
    const sectionRef = useRef(null);
    const [birdId, setBirdId] =
        useState("orangeK9");

    useEffect(() => {

        function onScroll() {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();

            const progress = getNarrativeProgress(
                rect,
                window.innerHeight
            );

            migrationRef.current?.updateProgress(progress);

            // console.log(progress);

        }

        onScroll();
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);

    }, []);

    return (

        <section ref={sectionRef} className="migration-section">

            <div className="migration-stickyContainer">

                <Migration 
                    birdId={birdId} 
                    ref={migrationRef} 
                />

            </div>

        </section>

    );

}