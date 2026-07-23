// ==============================
// LEVEL MANAGER
// ==============================

let level = {

    number: 1,

    topic: "Arrays",

    enemiesRemaining: 0,

    chestUnlocked: false,

    doorUnlocked: false

};

function initializeLevel(){

    level.enemiesRemaining = enemies.length;

    level.chestUnlocked = false;

    level.doorUnlocked = false;

}

function enemyDefeated(){

    level.enemiesRemaining--;

    console.log("Enemies Remaining:", level.enemiesRemaining);

    if(level.enemiesRemaining <= 0){

        console.log("Unlocking chests...");

        level.chestUnlocked = true;

        for(let chest of chests){
            chest.locked = false;
        }

        alert("🎉 All enemies defeated!");
    }
}

function loadLevel(number){

    let levelData;

    switch(number){

        case 1:
            levelData = LEVEL1;
            break;

        case 2:
            levelData = LEVEL2;
            break;

        case 3:
            levelData = LEVEL3;
            break;

        default:
            levelData = BOSS;
            break;

    }

    level.number = number;
    level.topic = levelData.name;

    loadMap(levelData);

    loadEnemies(levelData);

    loadChests(levelData);

    player.x = levelData.playerSpawn.x;
    player.y = levelData.playerSpawn.y;

    initializeLevel();

}