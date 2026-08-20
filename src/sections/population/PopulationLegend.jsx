import PopulationIcon from "./PopulationIcon";
import { categoryColor } from "../../assets/data/populationColorMapping";

import { getPopulationIconData } from "../../utils/population/getPopulationIconData";

export default function PopulationLegend({data}){

    if(!data){
        return null;
    }


    const unit = data.unit;
    const category = data.category;
    const color = categoryColor[category];

    const iconData = getPopulationIconData(data);
    const legendIconData = iconData[0];


    return (

        <div className="population-legend">

            <span className="legend-texts">
                1 <PopulationIcon {...legendIconData}/> = 10 
                <span style={{ color: color }}>
                    {unit}
                </span>
            </span>

            <div className="population-value">


                {   
                    data.min && data.max &&            
                    <div style={{ color: '#999' }}>
                        Population Range:
                        {" "}
                        <span style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                            {data.min}
                        </span>
                        {" - "}
                        <span style={{ 
                            fontWeight: 'bold', 
                            fontSize: '1.2em',
                            color: 'transparent',  // 文字本身透明
                            WebkitTextStroke: '1px #999',  // 轮廓颜色和宽度
                            WebkitTextFillColor: 'transparent', // 填充透明
                             }}>
                            {data.max}
                        </span>
                        {" "}
                        {unit}
                    </div>
                }


                {
                    data.estimation &&
                    <div style={{ color: '#999' }}>
                        Estimation:
                        {" "}
                        <span style={{ 
                            color: legendIconData.color,
                            fontWeight: 'bold', 
                            fontSize: '1.2em',
                            opacity: 0.6,   // 填充和轮廓都会变透明
                            WebkitTextStroke: `2px ${legendIconData.color}`,  // 使用模板字符串
                        }}>
                            {data.estimation}
                        </span>
                        {" "}
                        {unit}
                    </div>
                }


            </div>


        </div>

    )
}

                

