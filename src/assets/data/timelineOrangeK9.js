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
        end: 0.12,
        
        locationID: 1
    },

    {
        id: "travel-1",

        type: "travel",

        start: 0.12,
        end: 0.3,

        from: 1,
        to: 4
    },


    {
        id: "inspection-2",

        type: "inspection",

        start: 0.3,
        end: 0.42,

        locationID: 4
    },

    {
        id: "travel-2",

        type: "travel",

        start: 0.42,
        end: 0.48,

        from: 4,
        to: 5
    },

        {
        id: "inspection-3",

        type: "inspection",

        start: 0.48,
        end: 0.56,
        
        locationID: 5
    },

    {
        id: "travel-3",

        type: "travel",

        start: 0.56,
        end: 0.74,

        from: 5,
        to: 6
    },


    {
        id: "inspection-4",

        type: "inspection",

        start: 0.74,
        end: 0.82,

        locationID: 6
    },

    {
        id: "travel-4",

        type: "travel",

        start: 0.82,
        end: 0.88,

        from: 6,
        to: 7
    },

    {
        id: "inspection-5",

        type: "inspection",

        start: 0.88,
        end: 1,

        locationID: 7
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

        ],

        7: [

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

        ],        

    }

};