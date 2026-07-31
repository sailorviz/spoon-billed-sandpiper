export const narrativeTimeline = [

    {
        id: "overview",

        start: 0.00,
        end: 0.18
    },

    {
        id: "migration",

        start: 0.18,
        end: 1
    },

];

export const overviewTimeline = [

    {
        id: "intro",

        start: 0.00,
        end: 0.35
    },

    {
        id: "population",

        start: 0.35,
        end: 0.70
    },

    {
        id: "decline",

        start: 0.70,
        end: 1.00
    }

];

export const animationTimeline = [

    {
        id: "inspection-1",

        type: "inspection",

        start: 0.00,
        end: 0.15,
        
        locationID: 1
    },

    {
        id: "travel-1",

        type: "travel",

        start: 0.15,
        end: 0.35,

        from: 1,
        to: 4
    },


    {
        id: "inspection-2",

        type: "inspection",

        start: 0.35,
        end: 0.5,

        locationID: 4
    },

    {
        id: "travel-2",

        type: "travel",

        start: 0.5,
        end: 0.63,

        from: 4,
        to: 5
    },

    {
        id: "inspection-3",

        type: "inspection",

        start: 0.63,
        end: 0.73,

        locationID: 5
    },

    {
        id: "travel-3",

        type: "travel",

        start: 0.73,
        end: 0.85,

        from: 5,
        to: 6
    },

    {
        id: "inspection-4",

        type: "inspection",

        start: 0.85,
        end: 1,

        locationID: 6
    },

];

export const annotationTimelines = {

    overview: [

        {
            id: "intro",
            start: 0,
            end: 0.35
        },

        {
            id: "population",
            start: 0.35,
            end: 0.70
        },

        {
            id: "decline",
            start: 0.70,
            end: 1
        }

    ],

    // 1,4,6是locationID, 不是inspectionID。
    inspection: {

        1: [

            {
                id: "location",
                start: 0.00,
                end: 0.20
            },

            {
                id: "habitat",
                start: 0.20,
                end: 0.65
            },

            {
                id: "threat",
                start: 0.65,
                end: 1.00
            }

        ],

        4: [

            {
                id: "location",
                start: 0.00,
                end: 0.20
            },

            {
                id: "habitat",
                start: 0.20,
                end: 0.65
            },

            {
                id: "threat",
                start: 0.65,
                end: 1.00
            }

        ],

        6: [

            {
                id: "arrival",
                start: 0.00,
                end: 0.30
            },

            {
                id: "food",
                start: 0.30,
                end: 0.70
            },

            {
                id: "conservation",
                start: 0.70,
                end: 1.00
            }

        ]

    }

};