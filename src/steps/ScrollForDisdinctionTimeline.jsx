import { useEffect, useRef, useState } from "react";
import scrollama from "scrollama";
import "../styles/distinction.css";

import DistinctionBirds from "../sections/distinction/DistinctionBirds";

import { distinctionTimeline as timelineData }  from "../utils/distinction/distinctionTimeline";



export default function ScrollForDisdinctionTimeline() {

    const scrollerRef = useRef(null);
    const sectionRef = useRef(null);

    const [activeStep, setActiveStep] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    // 使用 Intersection Observer 检测 section 是否在视口中
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 } // 当 10% 可见时触发
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);


    useEffect(() => {

        if (timelineData.length === 0) return;
        console.log(timelineData.length);

        scrollerRef.current = scrollama();

        scrollerRef.current
            .setup({
                step: ".distinction-trigger-step",
                offset: 0.1,
                debug: false
            })

            .onStepEnter(({ index, direction }) => {

                if (direction === "down") {
                    setActiveStep(index);
                }

            })

            .onStepExit(({ index, direction }) => {

                if (direction === "up") {
                    setActiveStep(Math.max(index - 1, 0));
                }

            });


        const handleResize = () => {
            scrollerRef.current?.resize();
        };

        window.addEventListener(
            "resize",
            handleResize
        );


        return () => {

            if (scrollerRef.current) {

                scrollerRef.current.destroy();

                scrollerRef.current = null;
            }

            window.removeEventListener(
                "resize",
                handleResize
            );

        };

    }, [timelineData]);


    return (
        <section 
            ref={sectionRef} 
            className="distinction-timeline"
        >

            {timelineData.map((snapshot) => (

                <div
                    key={snapshot.year}
                    className="distinction-snapshot"
                >

                    <div className="distinction-trigger-step" />

                    <DistinctionBirds
                        population={snapshot.population}
                    />

                </div>

            ))}


            {/* 只在 section 可见时显示 */}
            {isVisible && (
                <div className="distinction-time-marker">
                    {timelineData[activeStep].year}
                </div>
            )}

        </section>
    );
}
