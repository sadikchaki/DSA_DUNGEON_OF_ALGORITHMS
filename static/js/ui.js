// =====================================
// UI MANAGER
// =====================================

function drawHUD(player){

    // Background
    ctx.fillStyle = "rgba(0,0,0,0.65)";
    ctx.fillRect(10,10,320,120);

    // HP Label
    ctx.fillStyle = "white";
    ctx.font = "18px Arial";
    ctx.fillText("HP",20,35);

    // HP Bar Background
    ctx.fillStyle = "#444";
    ctx.fillRect(60,20,200,18);

    // HP Bar
    ctx.fillStyle = "#2ecc71";
    ctx.fillRect(
        60,
        20,
        (player.hp/player.maxHp)*200,
        18
    );

    // HP Text
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.fillText(
        player.hp + " / " + player.maxHp,
        120,
        34
    );

    // Coins
    ctx.font = "18px Arial";
    ctx.fillText("Coins : " + player.coins,20,60);

    // Level
    ctx.fillText("Level : " + level.number,20,82);

    ctx.fillText("Topic : " + level.topic,20,104);

    // Objective
ctx.fillStyle = "white";
ctx.font = "16px Arial";

let objective = "";

if(level.enemiesRemaining > 0){

    objective = "Defeat " + level.enemiesRemaining + " enemy(s)";

}
else if(!chests[0].opened){

    objective = "Open the Chest (E)";

}
else{

    objective = "Go to the Exit";

}

ctx.fillText(objective,20,108);

}