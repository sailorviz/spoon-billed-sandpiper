import { getRecordDate } from "../../../utils/ringing/getRecordDate";

// export function BirdRecord({ record }) {

//     const date =
//         record.date ||
//         record.arrival ||
//         record.departure;


//     const event =
//         record.event ||
//         record.type;


//     return (

//         <div className="bird-record">

//             <div className="bird-record-marker">
//                 <div className="bird-record-dot" />
//             </div>


//             <div className="bird-record-content">

//                 <div className="bird-record-date">
//                     {date || "—"}
//                 </div>


//                 <div className="bird-record-event">
//                     {event || "—"}
//                 </div>


//                 <div className="bird-record-location">
//                     {record.location}
//                     {record.country && (
//                         <span>
//                             , {record.country}
//                         </span>
//                     )}
//                 </div>

//             </div>

//         </div>
//     );
// }

export function BirdRecord({ record }) {

    const event =
        record.event ||
        record.type;

    const dateInfo = getRecordDate(record);


    return (

        <div className="bird-record">

            <div className="bird-record-marker">

                <div className="bird-record-dot" />

            </div>


            <div className="bird-record-content">

                <div className="bird-record-date">

                    {dateInfo.type === "single" && (

                        <span>
                            {dateInfo.date}
                        </span>

                    )}


                    {dateInfo.type === "range" && (

                        <>
                            <span>
                                {dateInfo.arrival}
                            </span>

                            <span className="bird-record-date-separator">
                                —
                            </span>

                            <span>
                                {dateInfo.departure}
                            </span>
                        </>

                    )}

                </div>


                <div className="bird-record-event">

                    {event || "—"}

                </div>


                <div className="bird-record-location">

                    {record.location || "—"}

                    {record.country && (
                        <span>
                            , {record.country}
                        </span>
                    )}

                </div>

            </div>

        </div>
    );
}