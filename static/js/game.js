// ======================================
// DUNGEON OF ALGORITHMS
// MAIN GAME ENGINE
// ======================================

// Canvas

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Player Object

const player = new Player();

// ======================================
// UPDATE
// ======================================

function update(){

    player.update();

    updateEnemies();

    updateDamageTexts();

    checkEnemyCollision(player);

    checkCoins(player);

    checkChestInteraction(player);

    checkExit(player);

}

// ======================================
// DRAW
// ======================================

function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawMap();

    drawChests();

    drawEnemies();

    drawDamageTexts();

    player.draw();

    drawHUD(player);

}

// ======================================
// GAME LOOP
// ======================================

function gameLoop(){

    update();

    draw();

    requestAnimationFrame(gameLoop);

}

// ======================================
loadLevel(CURRENT_LEVEL);
gameLoop();