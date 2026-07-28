import * as d3 from "d3";

/**
 * Parse latitude string (e.g. "62.55° N") to number
 */
function parseLatitude(value) {
    if (!value) return null;

    const num = parseFloat(value);

    return value.includes("S") ? -num : num;
}

/**
 * Parse longitude string (e.g. "177.08° E") to number
 */
function parseLongitude(value) {
    if (!value) return null;

    const num = parseFloat(value);

    return value.includes("W") ? -num : num;
}

/**
 * Convert empty string to null
 */
function emptyToNull(value) {
    return value === "" ? null : value;
}

/**
 * Convert string to number
 */
function toNumber(value) {
    if (value === "" || value == null) return null;

    const n = Number(value);

    return Number.isNaN(n) ? null : n;
}

// function parseDate(value) {
//     if (!value) return null;

//     return new Date(value);
// }

/**
 * Load migration csv
 */
export async function loadMigrationData(dataPath) {
    const rawData = await d3.csv(dataPath);

    return rawData.map((d) => ({
        // Basic
        locationID: toNumber(d.record),

        location: d.location,
        country: d.country,
        type: d.type,

        // Coordinates
        latitude: parseLatitude(d.Lat),
        longitude: parseLongitude(d.Lon),

        // Dates
        arrival: emptyToNull(d.arrival),
        departure: emptyToNull(d.departure),

        // Statistics
        distanceFromLastSiteKm: toNumber(
            d["distance_from_last_site(km)"]
        ),

        flightTimeHours: toNumber(
            d["flight_time(hours)"]
        ),

        durationDays: toNumber(
            d["duration(days)"]
        ),

        // Notes
        note: emptyToNull(d["explanation"]),
        remarks: emptyToNull(d.remarks)
    }));
}