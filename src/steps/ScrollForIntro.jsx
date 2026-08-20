import { useEffect, useRef, useState } from "react";
import scrollama from "scrollama";

import "../styles/intro.css";

import { introScenes } from "../assets/narrative/introScenes";


export default function ScrollForIntro({ language }) {

    const scrollerRef = useRef(null);

    const [activeStep, setActiveStep] = useState(0);


    useEffect(() => {

        if (introScenes.length === 0) return;

        scrollerRef.current = scrollama();

        scrollerRef.current
            .setup({
                step: ".trigger-step",
                offset: 0.5,
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

    }, [introScenes]);


    return (

        <section className="intro-section">

            {/* =====================
                BACKGROUND
            ====================== */}

            <div className="scrolly-background">

                {introScenes.map((scene, index) => (

                    <div
                        key={scene.id}
                        className={`
                           background-video
                            ${
                                index === activeStep
                                    ? "active"
                                    : ""
                            }
                        `}
                    >

                        {/* <video
                            src={scene.video}
                            autoPlay
                            muted
                            loop
                            playsInline
                        /> */}
                        {scene.video}

                    </div>

                ))}

            </div>


            {/* =====================
                FOREGROUND
            ====================== */}

            <div className="scrolly-foreground">

              {introScenes.map((scene, index) => (

                  <div
                      key={scene.id}
                      className="trigger-step"
                  >

                      <div
                          className="scrolly-text"
                      >
                          {scene.text[language]}
                      </div>

                  </div>

              ))}

            </div>

        </section>
    );
}
