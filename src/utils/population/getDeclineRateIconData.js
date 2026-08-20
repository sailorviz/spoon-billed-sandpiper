// original data → icon data

// 对于单个icon，需要的data有：
// 1. color: remaining or disappeared;

import { uiColor } from "../../assets/data/populationColorMapping";

export function getDeclineRateIconData(data){

    const total = 100;
    const disappeared = data?.annualRate;
    const remaining = total - disappeared;

    const icons=[];


    for(let i = 0; i < total; i++){

        icons.push({

            color:
                i < remaining
                ? uiColor.gray
                : uiColor.main

        });

    }

    return icons;

}