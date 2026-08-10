import { useState, useEffect } from "react";

import { loadPopulationData } from "../../utils/population/populationParser";

import PopulationSlider from "./PopulationSlider";

import PopulationIcons from "./PopulationIcons";

import PopulationLegend from "./PopulationLegend";


export default function PopulationTimeline(){

    const [populationData,setPopulationData] = useState([]);

    const [index,setIndex] = useState(0);


    useEffect(()=>{

        const csvPath = "/data/population_estimation.csv";


        loadPopulationData(csvPath)
            .then(data=>{

                setPopulationData(data);

            });


    },[]);


    if(populationData.length===0){

        return null;

    }


    const data = populationData[index];


    return (

        <div className="population-timeline">

            <h2>勺嘴鹬数量变化</h2>

            <div className="population-display">

                <PopulationIcons 
                    data={data}
                />

                <PopulationLegend
                    data={data}
                />

            </div>


            <PopulationSlider

                value={index}

                onChange={setIndex}

                data={populationData}

            />

        </div>

    )

}