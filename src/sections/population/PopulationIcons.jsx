import PopulationIcon from "./PopulationIcon";

import { getPopulationIconData } from "../../utils/population/getPopulationIconData";

import { createIconMatrix } from "../../utils/population/createIconMatrix";


export default function PopulationIcons({
    data
}){

    // 决定每个 icon 的数据状态
    const iconData =
        getPopulationIconData(data);


    // 决定 grid 排列
    const matrix =
        createIconMatrix(iconData);

    return (

        <div className="population-icon-grid">


            {
                matrix.map(
                    (row,rowIndex)=>(

                        <div
                            className="icon-row"
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