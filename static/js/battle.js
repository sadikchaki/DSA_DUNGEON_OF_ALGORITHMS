// ==========================================
// BATTLE MANAGER
// ==========================================

let battle = {

    active: false,

    enemy: null

};

// ==========================================
// START BATTLE
// ==========================================

async function startBattle(enemy){

    if(battle.active) return;

    battle.active = true;

    battle.enemy = enemy;

    updateBattleHP();

    document.getElementById("battleOverlay").style.display = "flex";

    document.getElementById("enemyName").innerHTML =
        enemy.type.toUpperCase();

loadPuzzle(enemy.type);
}

// ==========================================
// LOAD NEW PUZZLE
// ==========================================

async function loadPuzzle(enemyType){

const puzzle = await getPuzzle(enemyType);

    document.getElementById("puzzleTopic").innerHTML =
        puzzle.topic;

    document.getElementById("puzzleQuestion").innerHTML =
        puzzle.question;

    const container =
        document.getElementById("answerContainer");

    container.innerHTML = "";

    for(let value of puzzle.array){

        const button = document.createElement("div");

        button.className = "answerButton";

        button.innerHTML = value;

        button.onclick = function(){

            handleAnswer(value);

        };

        container.appendChild(button);

    }

}

// ==========================================
// HANDLE ANSWER
// ==========================================

async function handleAnswer(value){

    const result = await checkAnswer(value);

    if(result.correct){

        battle.enemy.hp -= 10;
        battle.enemy.hitTimer = 10;

        addDamageText(
            battle.enemy.x + 20,
            battle.enemy.y,
            "-10",
            "red"
);

    }
    else{

        player.hp -= battle.enemy.damage;

        addDamageText(
            player.x + 20,
            player.y,
            "-" + battle.enemy.damage,
            "orange"
);

    }

    // Update HP bars
    updateBattleHP();

    // Enemy defeated
    if(battle.enemy.hp <= 0){

        battle.enemy.dead = true;

        enemyDefeated();

        endBattle();

        return;

    }

    // Player defeated
    if(player.hp <= 0){

        alert("GAME OVER");

        location.reload();

        return;

    }

    // Load the next DSA question
await loadPuzzle(battle.enemy.type);

}

// ==========================================
// END BATTLE
// ==========================================

function updateBattleHP(){

    document.getElementById("enemyHP").value =
        battle.enemy.hp;

    document.getElementById("enemyHP").max =
        battle.enemy.maxHp;

    document.getElementById("enemyHPText").innerHTML =
        battle.enemy.hp + " / " + battle.enemy.maxHp;

    document.getElementById("playerHP").value =
        player.hp;

    document.getElementById("playerHP").max =
        player.maxHp;

    document.getElementById("playerHPText").innerHTML =
        player.hp + " / " + player.maxHp;

}

function endBattle(){

    battle.active = false;

    battle.enemy = null;

    document.getElementById("battleOverlay").style.display = "none";

    document.getElementById("enemyName").innerHTML = "";

    document.getElementById("puzzleTopic").innerHTML = "";

    document.getElementById("puzzleQuestion").innerHTML = "";

    document.getElementById("answerContainer").innerHTML = "";

}