// import DistinctionBird from "./DistinctionBird";
// import { createBirdData } from "../../utils/distinction/distinctionBirdData";

// export default function DistinctionBirds({ population }) {
//     if (population == null) return null;

//     const birds = createBirdData(population);

//     return (
//         <div className="distinction-birds">
//             {birds.map(bird => (
//                 <DistinctionBird
//                     key={bird.index}
//                     bird={bird}
//                 />
//             ))}
//         </div>
//     );
// }


import { useMemo } from "react";

import DistinctionBird from "./DistinctionBird";
import { createBirdData } from "../../utils/distinction/distinctionBirdData";

export default function DistinctionBirds({ population }) {

    const birds = useMemo(() => {

        if (population == null) return [];

        return createBirdData(population);

    }, [population]);

    return (
        <div className="distinction-birds">
            {birds.map(bird => (
                <DistinctionBird
                    key={bird.index}
                    bird={bird}
                />
            ))}
        </div>
    );
}