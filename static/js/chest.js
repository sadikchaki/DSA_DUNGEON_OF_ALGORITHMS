// ======================================
// CHEST SYSTEM
// ======================================

class Chest {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.width = 40;
        this.height = 40;

        this.opened = false;
        this.locked = true;

    }

   draw() {

    // Decide chest color BEFORE drawing
    if(this.opened){

        ctx.fillStyle = "#7f4a18";      // Brown

    }
    else if(this.locked){

        ctx.fillStyle = "#777777";      // Gray

    }
    else{

        ctx.fillStyle = "#ffa443";      // Gold

    }

    // Draw chest
    ctx.fillRect(
        this.x,
        this.y,
        this.width,
        this.height
    );

    // Outline
    ctx.strokeStyle = "black";
    ctx.strokeRect(
        this.x,
        this.y,
        this.width,
        this.height
    );

    // Lock icon (only if locked)
    if(this.locked){

        ctx.fillStyle = "black";

        ctx.fillRect(
            this.x + 15,
            this.y + 12,
            10,
            15
        );

    }
}
}
// ======================================

// ======================================
// CURRENT CHESTS
// ======================================

let chests = [];

// ======================================
// LOAD CHESTS
// ======================================

function loadChests(levelData){

    chests = [];

    for(const chest of levelData.chests){

        chests.push(
            new Chest(
                chest.x,
                chest.y
            )
        );

    }

}
// ======================================

function drawChests(){

    for(let chest of chests){

        chest.draw();

    }
}
