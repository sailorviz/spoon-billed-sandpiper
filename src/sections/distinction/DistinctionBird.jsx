import { useRef } from "react";

// import silhouette1 from "../../assets/img/silhouette-1.png";
// import silhouette2 from "../../assets/img/silhouette-2.png";
// import silhouette3 from "../../assets/img/silhouette-3.png";

// const birdImages = [
//     silhouette1,
//     silhouette2,
//     silhouette3,
// ];

import birdFlying1 from "../../assets/img/bird-flying-1.png";
import birdFlying2 from "../../assets/img/bird-flying-2.png";
import birdFlying3 from "../../assets/img/bird-flying-3.png";

const birdImages = [
        birdFlying1,
        birdFlying2,
        birdFlying3,
    ];

export default function DistinctionBird({ bird }) {

    const birdImageRef = useRef(
        birdImages[
            Math.floor(Math.random() * birdImages.length)
        ]
    );

    return (
        <img
            className="distinction-bird"
            src={birdImageRef.current}
            style={{
                left: `${bird.x}%`,
                top: `${bird.y}%`,

                zIndex:
                    Math.round(bird.depth * 100),

                "--bird-scale-x":
                    bird.mirrored ? -1 : 1,

                "--bird-size":
                    bird.size,
            }}
        />
    );
}