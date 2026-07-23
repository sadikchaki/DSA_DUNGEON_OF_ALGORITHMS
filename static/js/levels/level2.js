// ======================================
// LEVEL 2 DATA
// ======================================

const LEVEL2 = {

    name: "Searching Dungeon",

    map: level2Map,

    playerSpawn: {
        x: 64,
        y: 64
    },

enemies: [

    {
        x:128,
        y:64,
        type:"ghost",
        radius:120
    },

    {
        x:640,
        y:64,
        type:"ghost",
        radius:120
    },
    {
        x: 320,
        y: 320,
        type: "golem"
    },

    {
        x: 704,
        y: 448,
        type: "skeleton"
    },

],
chests: [

    {
        x: 64,
        y: 320
    },

    {
        x: 832,
        y: 448
    }

]
}