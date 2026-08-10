import * as d3 from "d3";

/**
 * Convert string to number
 */
function toNumber(value) {
    if (value === "" || value == null) return null;

    const n = Number(value);

    return Number.isNaN(n) ? null : n;
}

function findMinYear(year){

    return Number(
        year.match(/\d{4}/)[0]
    );

}

/**
 * Load population csv
 */
export async function loadPopulationData(dataPath) {
    const rawData = await d3.csv(dataPath);

    return rawData.map((d) => ({
        yearLabel: d.year,
        yearMin: findMinYear(d["year"]),
        unit: d.unit,
        category: d.category,
        type: d.type,

        // Statistics
        min: toNumber(
            d["quantity_lowest"]
        ),

        max: toNumber(
            d["quantity_highest"]
        ),

        estimation: toNumber(
            d["quantity_best_estimated"]
        ),
    }));
}