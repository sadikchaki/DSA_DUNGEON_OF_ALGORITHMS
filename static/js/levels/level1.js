// ======================================
// LEVEL 1 DATA
// ======================================

const LEVEL1 = {

    name: "Arrays Dungeon",

    map: level1Map,

    playerSpawn: {
        x: 64,
        y: 64
    },

    enemies: [

        {
            x: 192,
            y: 64,
            type: "slime"
        },

        {
            x: 320,
            y: 384,
            type: "slime"
        },

        {
            x: 704,
            y: 128,
            type: "skeleton"
        }

    ],

    chests: [

        {
            x: 192,
            y: 384
        },

        {
            x: 768,
            y: 256
        }

    ]

};