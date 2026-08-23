export const distinctionTimeline = [
    { year: 2026, population: getPopulation(2026) },
    { year: 2036, population: getPopulation(2036) },
    { year: 2046, population: getPopulation(2046) },
    { year: 2056, population: getPopulation(2056) },
    { year: 2065, population: getPopulation(2065) },
];

function getPopulation(year) {
    const initialPopulation = 320;
    const annualDeclineRate = 0.05;
    const initialYear = 2026;

    return Math.round(
        initialPopulation *
        Math.pow(
            1 - annualDeclineRate,
            year - initialYear
        )
    );
}