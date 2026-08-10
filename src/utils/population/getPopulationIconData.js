// original data → icon data

// 对于单个icon，需要的data有：
// 1. type: pair or individual;
// 2. color: category color or null;
// 3. state: solid or outline;

import { categoryColor } from "../../assets/data/populationColorMapping";


const ICON_SCALE = 10;


// export function getPopulationIconData(data){


//     const {
//         min,
//         max,
//         estimation,
//         type,
//         category

//     } = data;



//     const color =
//         categoryColor[category];



//     const solidCount =
//         Math.round(min / ICON_SCALE);



//     const outlineCount =
//         Math.round(
//             (max-min) / ICON_SCALE
//         );



//     const estimationCount =
//         estimation
//         ?
//         Math.round(
//             estimation / ICON_SCALE
//         )
//         :
//         0;



//     const icons = [];



//     // 1. create solid icons

//     for(let i=0;i<solidCount;i++){

//         icons.push({

//             type,

//             state:"solid",

//             color:null

//         });

//     }



//     // 2. create outline icons

//     for(let i=0;i<outlineCount;i++){

//         icons.push({

//             type,

//             state:"outline",

//             color:null

//         });

//     }



//     // 3. apply estimation color

//     for(
//         let i=0;
//         i<estimationCount && i<icons.length;
//         i++
//     ){

//         icons[i].color=color;

//     }



//     return icons;

// }

export function getPopulationIconData(data){

    const {
        min,
        max,
        estimation,
        type,
        category

    } = data;


    const color =
        categoryColor[category];


    const icons=[];



    // =====================
    // Case 1:
    // range data
    // =====================

    if(min && max){


        const solidCount =
            Math.round(
                min / ICON_SCALE
            );


        const outlineCount =
            Math.round(
                (max-min)
                /
                ICON_SCALE
            );



        for(let i=0;i<solidCount;i++){

            icons.push({

                type,

                state:"solid",

                color:null

            });

        }



        for(let i=0;i<outlineCount;i++){

            icons.push({

                type,

                state:"outline",

                color:null

            });

        }



        // highlight estimate if exists

        if(estimation){

            const estimationCount =
                Math.round(
                    estimation / ICON_SCALE
                );


            for(
                let i=0;
                i<estimationCount;
                i++
            ){

                icons[i].color=color;

            }

        }


    }



    // =====================
    // Case 2:
    // only estimation
    // =====================

    else if(estimation){


        const count =
            Math.round(
                estimation / ICON_SCALE
            );


        for(let i=0;i<count;i++){

            icons.push({

                type,

                state:"only estimation",

                color

            });

        }

    }

    return icons;

}