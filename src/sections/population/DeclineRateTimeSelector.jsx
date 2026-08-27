import { uiColor } from "../../assets/data/populationColorMapping";

// export default function DeclineRateTimeSelector({
//     value,
//     onChange,
//     data
// }){

// return (

// <div className="population-slider">


//     {/* visual timeline */}

//     <div className="slider-track">


//         {
//         data.map((d,i)=>{

//             const active = i===value;


//             return (

//             <div

//                 key={i}

//                 className={
//                     active
//                     ?
//                     "marker active"
//                     :
//                     "marker"
//                 }

//                 style={{
//                     left:`${getYearPosition(i,data)}%`
//                 }}

//             >


//                 <div

//                     className="marker-dot"

//                     style={{
//                         "--dot-color":
//                         categoryColor[d.category]
//                     }}

//                 />


//                 <span>

//                     {d.yearLabel}

//                 </span>


//             </div>

//             )

//         })
//         }


//     </div>



//     {/* invisible interaction */}

//     <input

//         type="range"

//         min="0"

//         max={data.length-1}

//         value={value}

//         onChange={
//             e=>onChange(
//                 Number(e.target.value)
//             )
//         }

//     />


// </div>

// )

// }

// export default function DeclineRateTimeSelector({

//     data,

//     index,

//     setIndex

// }){


//     const minYear = data[0].from;
//     const maxYear = data[data.length-1].to + 1;


//     const years = data.flatMap(d=>[
//         d.from,
//         d.to
//     ]);


//     return (

//         <div className="decline-rate-timeline">


//             {/* year axis */}

//             <div className="timeline-years">

//                 {
//                     years.map((year)=>{


//                         const left =
//                             (
//                                 year-minYear
//                             )
//                             /
//                             (
//                                 maxYear-minYear
//                             )
//                             *
//                             100;


//                         return (

//                             <span

//                                 key={year}

//                                 className="year-label"

//                                 style={{
//                                     left:`${left}%`
//                                 }}

//                             >

//                                 {year}

//                             </span>

//                         )

//                     })
//                 }


//             </div>



//             {/* timeline bar */}

//             <div className="timeline-bar">

//             {
//             data.map((item,i)=>{


//                 const left =
//                     (
//                         item.timelineFrom - minYear
//                     )
//                     /
//                     (
//                         maxYear - minYear
//                     )
//                     *
//                     100;



//                 const width =
//                     (
//                         item.timelineTo - item.timelineFrom
//                     )
//                     /
//                     (
//                         maxYear - minYear
//                     )
//                     *
//                     100;



//                 return (

//                     <div

//                         key={i}

//                         className={
//                             i===index
//                             ?
//                             "timeline-segment active"
//                             :
//                             "timeline-segment"
//                         }


//                         style={{

//                             left:`${left}%`,

//                             width:`${width}%`

//                         }}


//                         onClick={()=>{
//                             setIndex(i)
//                         }}

//                     />

//                 )

//             })

//             }

//             </div>


//         </div>

//     )

// }

export default function DeclineRateTimeline({
    data,
    index,
    setIndex
}) {

    if (!data || data.length === 0) {
        return null;
    }


    // =====================
    // Timeline boundaries
    // =====================

    const minYear =
        Math.min(
            ...data.map(d => d.from)
        );


    const maxYear =
        Math.max(
            ...data.map(d => d.to + 1)
        );


    // =====================
    // Year → percentage
    // =====================

    const getPosition = (year) => {

        return (
            (year - minYear)
            /
            (maxYear - minYear)
        ) * 100;

    };


    return (

        <div className="decline-rate-timeline">


            {/* =====================
                Labels
            ===================== */}

            <div className="timeline-labels">

                {
                    data.map((item, i) => {

                        const fromPosition =
                            getPosition(item.from);


                        const toPosition =
                            getPosition(
                                item.to + 1
                            );


                        return (

                            <div
                                key={i}
                                className={
                                    i === index
                                        ? "timeline-label active"
                                        : "timeline-label"
                                }
                            >

                                <span
                                    className="year-label from-label"
                                    style={{
                                        left:
                                            `${fromPosition}%`
                                    }}
                                >
                                    {item.from}
                                </span>


                                <span
                                    className="year-label to-label"
                                    style={{
                                        left:
                                            `${toPosition}%`
                                    }}
                                >
                                    {item.to}
                                </span>

                            </div>

                        );

                    })
                }

            </div>



            {/* =====================
                Timeline bar
            ===================== */}

            <div className="timeline-bar">

                {
                    data.map((item, i) => {

                        const left =
                            getPosition(item.from);


                        const right =
                            getPosition(
                                item.to + 1
                            );


                        const width =
                            right - left;


                        return (

                            <div
                                key={i}
                                className={
                                    i === index
                                        ? "timeline-segment active"
                                        : "timeline-segment"
                                }
                                style={{
                                    left: `${left}%`,
                                    width: `${width}%`
                                }}
                                onClick={() => {
                                    setIndex(i);
                                }}
                            >
                                {
                                    i === index && (
                                        <span className="annual-rate">
                                            {item.annualRate}%
                                        </span>
                                    )
                                }
                            </div>

                        );

                    })
                }

            </div>


        </div>

    );

}