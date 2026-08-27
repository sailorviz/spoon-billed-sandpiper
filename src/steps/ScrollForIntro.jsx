import { useEffect, useRef, useState } from "react";
import scrollama from "scrollama";

import "../styles/intro.css";

import { introScenes } from "../assets/narrative/introScenes";


export default function ScrollForIntro({ 
    language,
    setLanguage
}) {

    const scrollerRef = useRef(null);
    const introSectionRef = useRef(null);

    const [isIntroActive, setIsIntroActive] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [soundEnabled, setSoundEnabled] = useState(false);

    const toggleSound = () => {
        setSoundEnabled((prev) => !prev);
    };

    useEffect(() => {

        if (!introSectionRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntroActive(entry.isIntersecting);
            },
            {
                threshold: 0.01
            }
        );

        observer.observe(introSectionRef.current);

        return () => {
            observer.disconnect();
        };

    }, []);

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

        <section ref={introSectionRef} className="intro-section">

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
                            muted={!soundEnabled}
                            loop
                            playsInline
                        /> */}
                        {scene.video}

                    </div>

                ))}

            </div>


            {isIntroActive && activeStep > 0 && (

                <button
                    className="audio-control audio-control-compact"
                    onClick={toggleSound}
                    aria-label={
                        soundEnabled
                            ? "Turn sound off"
                            : "Turn sound on"
                    }
                >

                    <span className="audio-control-icon">
                        {soundEnabled ? "🔊" : "🔇"}
                    </span>

                </button>

            )}


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

                    {index === 0 && (
                        <>
                            <button
                                className="audio-control audio-control-hero"
                                onClick={toggleSound}
                                aria-label={
                                    soundEnabled
                                        ? "Turn sound off"
                                        : "Turn sound on"
                                }
                            >

                                <span className="audio-control-icon">
                                    {soundEnabled ? "🔊" : "🔇"}
                                </span>

                                <span className="audio-control-label">
                                    {soundEnabled
                                        ? "Sound on"
                                        : "Enable sound"
                                    }
                                </span>

                            </button>

                            
                            <div className="language-switch">

                                <button
                                    className={language === "en" ? "active" : ""}
                                    onClick={() => setLanguage("en")}
                                >
                                    en
                                </button>

                                <button
                                    className={language === "zh" ? "active" : ""}
                                    onClick={() => setLanguage("zh")}
                                >
                                    中
                                </button>

                            </div>                           
                        </>
                     

                    )}

                  </div>

              ))}

            </div>

        </section>
    );
}
