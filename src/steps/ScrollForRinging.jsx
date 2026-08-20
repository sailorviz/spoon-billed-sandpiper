import { useEffect, useRef, useState } from "react";
import scrollama from "scrollama";

import StickyBirds from "../sections/ringing/StickyBirds";

import "../styles/ringing.css";

import { ringing } from "../assets/narrative/ringing";


export default function ScrollForRinging({ language }) {

    const scrollerRef = useRef(null);

    const [activeStep, setActiveStep] = useState(0);


    useEffect(() => {

        if (ringing.length === 0) return;
        console.log(ringing.length);

        scrollerRef.current = scrollama();

        scrollerRef.current
            .setup({
                step: ".ringing-trigger-step",
                offset: 0.2,
                debug: false
            })

            .onStepEnter(({ index, direction }) => {

                if (direction === "down") {
                    setActiveStep(index);
                }

            })

            .onStepExit(({ index, direction }) => {

                if (direction === "up") {
                    setActiveStep(index - 1);
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

    }, [ringing]);


    return (

        <section className="ringing-section">

            <div className="ringing-sticky-container">
                <StickyBirds activeStep={activeStep}/>
            </div>



            <div className="ringing-scrolly-texts">

              {ringing.map((scene, index) => (

                  <div
                      key={scene.id}
                      className="ringing-trigger-step"
                  >

                      <div
                          className="ringing-scrolly-text"
                      >
                          {scene.text[language]}
                      </div>

                  </div>

              ))}

            </div>

        </section>
    );
}
