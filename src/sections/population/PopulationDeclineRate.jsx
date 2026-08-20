import { useState, useEffect } from "react";

import { loadDeclineRateData } from "../../utils/population/declineRateParser";

import DeclineRateModeSelector from "./DeclineRateModeSelector";
import DeclineRateIcons from "./DeclineRateIcons";
import DeclineRateTimeSelector from "./DeclineRateTimeSelector";
import DeclineRateLineChart from "./DeclineRateLineChart";


export default function PopulationDeclineRate(){

    const [declineRateData,setDeclineRateData] = useState([]);

    const [index,setIndex] = useState(0);
    const [mode,setMode] = useState("icon");


    useEffect(()=>{

        const csvPath = "/data/annual_decline_rate.csv";


        loadDeclineRateData(csvPath)
            .then(data=>{

                setDeclineRateData(data);

            });


    },[]);


    if(declineRateData.length===0){

        return null;

    }


    const data = declineRateData[index];


    return (

        <div className="population-decline-rate">

            <h2>勺嘴鹬数量年平均下降率</h2>

            <DeclineRateModeSelector
                mode={mode}
                setMode={setMode}
            />

            <div className="decline-rate-display">
                {mode === "icon" &&             
                    <div className="icon-mode">
                        <h3 className="display-subtitle"></h3>
                        <DeclineRateIcons 
                            data={data}
                        />
                        <DeclineRateTimeSelector
                            data={declineRateData}
                            index={index}
                            setIndex={setIndex}
                         />
                    </div>
                }

                {mode === "line" &&              
                    <div className="line-chart-mode">
                        <h3 className="display-subtitle"></h3>
                        <DeclineRateLineChart
                            data={declineRateData}
                        />
                    </div>
                }
            </div>

        </div>

    )

}