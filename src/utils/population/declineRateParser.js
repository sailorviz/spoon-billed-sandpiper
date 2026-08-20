import * as d3 from "d3";

/**
 * Convert string to number
 */
function toNumber(value) {
    if (value === "" || value == null) return null;

    const n = Number(value);

    return Number.isNaN(n) ? null : n;
}

/**
 * Load population csv
 */
export async function loadDeclineRateData(dataPath) {
    const rawData = await d3.csv(dataPath);

    return rawData.map((d) => ({
        yearRange: `${d.year_from} - ${d.year_to}`,
        from: toNumber(d["year_from"]),
        to: toNumber(d["year_to"]),

        // Statistics
        annualRate: toNumber(
            d["annual_decline_rate(%)"]
        ),

    }));
}