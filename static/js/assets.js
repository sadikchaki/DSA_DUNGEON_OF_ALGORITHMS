// =====================================
// ASSET MANAGER
// =====================================

const Assets = {

    images: {},

    loadImage(name, src){

        const img = new Image();

        img.src = src;

        this.images[name] = img;

    },

    get(name){

        return this.images[name];

    }

};

// =====================================
// LOAD GAME ASSETS
// =====================================

Assets.loadImage(
    "player",
    "/static/assets/sprites/player.png"
);

Assets.loadImage(
    "slime",
    "/static/assets/enemies/slime.png"
);

Assets.loadImage(
    "skeleton",
    "/static/assets/enemies/skeleton.png"
);

Assets.loadImage(
    "chest",
    "/static/assets/sprites/chest.png"
);

Assets.loadImage(
    "coin",
    "/static/assets/sprites/coin.png"
);

Assets.loadImage(
    "wall",
    "/static/assets/tiles/wall.png"
);

Assets.loadImage(
    "floor",
    "/static/assets/tiles/floor.png"
);