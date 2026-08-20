function formatDate(date) {

    if (!date) {
        return "—";
    }


    // Year only
    if (/^\d{4}$/.test(date)) {
        return date;
    }


    // Year + month
    if (/^\d{4}-\d{2}$/.test(date)) {

        const [year, month] =
            date.split("-");

        const parsedDate =
            new Date(
                Number(year),
                Number(month) - 1
            );

        return parsedDate
            .toLocaleDateString("en-GB", {
                month: "short",
                year: "numeric",
            })
            .toUpperCase();
    }


    const parsedDate =
        new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return date;
    }


    return parsedDate
        .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
        .toUpperCase();
}


export function getRecordDate(record) {

    // Sighting
    if (record.date) {

        return {
            type: "single",
            date: formatDate(record.date),
        };
    }


    // Migration
    return {
        type: "range",

        arrival:
            formatDate(record.arrival),

        departure:
            formatDate(record.departure),
    };
}