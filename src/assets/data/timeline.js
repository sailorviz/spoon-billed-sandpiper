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
        end: 0.18,
        
        locationID: 1
    },

    {
        id: "travel-1",

        type: "travel",

        start: 0.18,
        end: 0.56,

        from: 1,
        to: 4
    },


    {
        id: "inspection-2",

        type: "inspection",

        start: 0.56,
        end: 0.66,

        locationID: 4
    },

    {
        id: "travel-2",

        type: "travel",

        start: 0.66,
        end: 1.00,

        from: 4,
        to: 6
    }

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