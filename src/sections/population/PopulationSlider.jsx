import { getYearPosition } from "../../utils/population/getSliderPosition";
import { categoryColor } from "../../assets/data/populationColorMapping";

export default function PopulationSlider({
    value,
    onChange,
    data
}){

return (

<div className="population-slider">


    {/* visual timeline */}

    <div className="slider-track">


        {
        data.map((d,i)=>{

            const active = i===value;


            return (

            <div

                key={i}

                className={
                    active
                    ?
                    "marker active"
                    :
                    "marker"
                }

                style={{
                    left:`${getYearPosition(i,data)}%`
                }}

            >


                <div

                    className="marker-dot"

                    style={{
                        "--dot-color":
                        categoryColor[d.category]
                    }}

                />


                <span>

                    {d.yearLabel}

                </span>


            </div>

            )

        })
        }


    </div>



    {/* invisible interaction */}

    <input

        type="range"

        min="0"

        max={data.length-1}

        value={value}

        onChange={
            e=>onChange(
                Number(e.target.value)
            )
        }

    />


</div>

)

}