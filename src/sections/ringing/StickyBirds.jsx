import { useEffect, useState, useRef } from "react";

import { birdData } from "../../utils/ringing/ringingBirdData";
import { keyBirds } from "../../utils/ringing/ringingKeyBirds";

import BirdProfile from "./BirdProfile";

import birdFlying1 from "../../assets/img/bird-flying-1.png";
import birdFlying2 from "../../assets/img/bird-flying-2.png";
import birdFlying3 from "../../assets/img/bird-flying-3.png";

const birdImages = [
        birdFlying1,
        birdFlying2,
        birdFlying3,
    ];

export default function StickyBirds({ activeStep }) {

    const [selectedBird, setSelectedBird] = useState(null);
    const [profileLevel, setProfileLevel] = useState("identity");


    const keyBirdByIndex = Object.fromEntries(
        keyBirds.map(bird => [bird.index, bird])
    );

    const keyBirdById = Object.fromEntries(
        keyBirds.map(bird => [bird.id, bird])
    );


    useEffect(() => {

        setSelectedBird(null);
        setProfileLevel("identity");

    }, [activeStep]);


    const selectedKeyBird =
        keyBirdById[selectedBird];


    return (
        <>
            <div className="sticky-birds">

                {birdData.map((bird) => {

                    const keyBird =
                        keyBirdByIndex[bird.index];

                    const isActive =
                        keyBird?.activeStep === activeStep;

                    const isSelected =
                        keyBird?.id === selectedBird;


                    return (
                        <StickyBird
                            key={bird.index}

                            bird={bird}
                            keyBird={keyBird}

                            isActive={isActive}
                            isSelected={isSelected}

                            onClick={() => {

                                if (!isActive || !keyBird) {
                                    return;
                                }

                                setSelectedBird(keyBird.id);

                            }}
                        />
                    );

                })}

            </div>


            {selectedKeyBird && (
                <BirdProfile
                    bird={selectedKeyBird}

                    profileLevel={profileLevel}

                    onClose={() => {
                        setSelectedBird(null);
                        setProfileLevel("identity");
                    }}

                    onViewRecords={() => {
                        setProfileLevel("records");
                    }}

                    onBack={() => {
                        setProfileLevel("identity");
                    }}
                />
            )}
        </>
    );
}


function StickyBird({
    bird,
    isActive,
    isSelected,
    onClick,
}) {

    const birdShapeRef = useRef(null);
    const tooltipRef = useRef(null);
    const birdImageRef = useRef(
        birdImages[
            Math.floor(Math.random() * birdImages.length)
        ]
    );

    const [tooltipOffset, setTooltipOffset] = useState({
        x: 0,
        y: 0,
    });


    useEffect(() => {

        if (!isActive) {
            setTooltipOffset({
                x: 0,
                y: 0,
            });

            return;
        }


        const updateTooltipPosition = () => {

            const birdShape =
                birdShapeRef.current;

            const tooltip =
                tooltipRef.current;


            if (!birdShape || !tooltip) {
                return;
            }


            /*
             * 1. Get the actual visual bounding box
             *    of the transformed bird-shape.
             *
             *    This includes:
             *    - scale()
             *    - rotate()
             */


            /*
             * 2. Get tooltip's current position.
             */
            const tooltipRect =
                tooltip.getBoundingClientRect();


            const margin = 8;


            let offsetX = 0;
            let offsetY = 0;


            /*
             * 3. Viewport collision detection
             */

            // Right edge
            if (
                tooltipRect.right >
                window.innerWidth - margin
            ) {

                offsetX =
                    window.innerWidth -
                    margin -
                    tooltipRect.right;

            }


            // Left edge
            if (
                tooltipRect.left <
                margin
            ) {

                offsetX =
                    margin -
                    tooltipRect.left;

            }


            // Top edge
            if (
                tooltipRect.top <
                margin
            ) {

                offsetY =
                    margin -
                    tooltipRect.top;

            }


            // Bottom edge
            if (
                tooltipRect.bottom >
                window.innerHeight - margin
            ) {

                offsetY =
                    window.innerHeight -
                    margin -
                    tooltipRect.bottom;

            }


            setTooltipOffset({
                x: offsetX,
                y: offsetY,
            });
        };


        /*
         * Wait until the active scale transition
         * has started before measuring.
         */
        requestAnimationFrame(
            updateTooltipPosition
        );


        const resizeObserver =
            new ResizeObserver(
                updateTooltipPosition
            );

        resizeObserver.observe(
            birdShapeRef.current
        );


        window.addEventListener(
            "resize",
            updateTooltipPosition
        );


        return () => {

            resizeObserver.disconnect();

            window.removeEventListener(
                "resize",
                updateTooltipPosition
            );

        };

    }, [
        isActive,
        isSelected,
    ]);


    return (
        <div
            className={`
                sticky-bird
                ${isActive ? "active" : ""}
                ${isSelected ? "selected" : ""}
            `}

            style={{
                left: `${bird.x}%`,
                top: `${bird.y}%`,

                zIndex:
                    Math.round(bird.depth * 9),


                "--bird-scale-x":
                    bird.mirrored ? -1 : 1,

                "--bird-size":
                    bird.size,

                "--bird-color":
                    bird.color,

                "--bird-opacity":
                    bird.opacity,

                "--tooltip-x":
                    `${tooltipOffset.x}px`,

                "--tooltip-y":
                    `${tooltipOffset.y}px`,
            }}

            onClick={onClick}
        >

            <img
                ref={birdShapeRef}
                className="bird-shape"
                src={birdImageRef.current}
                alt=""
            />


            {isActive && (
                <div
                    ref={tooltipRef}
                    className="bird-tooltip"
                >
                    点击查看档案
                </div>
            )}

        </div>
    );
}
