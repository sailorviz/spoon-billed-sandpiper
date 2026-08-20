import PopulationIcon from "./PopulationIcon";

import { getDeclineRateIconData } from "../../utils/population/getDeclineRateIconData";
import { createIconMatrix } from "../../utils/population/createIconMatrix";


export default function DeclineRateIcons({
    data
}){

    // 决定每个 icon 的数据状态
    const iconData =
        getDeclineRateIconData(data);



    // 决定 grid 排列
    const matrix =
        createIconMatrix(iconData, 20);

    return (

        <div className="decline-rate-icon-grid">


            {
                matrix.map(
                    (row,rowIndex)=>(

                        <div
                            className="decline-rate-icon-row"
                            key={rowIndex}
                        >

                            {
                                row.map(
                                    (icon,index)=>(

                                        <PopulationIcon

                                            key={index}

                                            {...icon}

                                        />

                                    )
                                )
                            }


                        </div>

                    )
                )
            }


        </div>

    )

}