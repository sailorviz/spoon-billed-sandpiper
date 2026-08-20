function createBirdData(count = 50) {

    return Array.from({ length: count }, (_, index) => {

        const depth = Math.random();

        return {
            index,

            // position
            x: 5 + Math.random() * 90,
            y: 5 + Math.random() * 90,

            // orientation
            rotation:
                (Math.random() + Math.random() - 1) * 20,

            // depth
            depth,

            // visual properties
            size:
                0.5 + depth * 1.2,

            color: "#999",

            // PNG birds should remain opaque
            opacity: 1,
        };

    });

}

export const birdData = createBirdData();