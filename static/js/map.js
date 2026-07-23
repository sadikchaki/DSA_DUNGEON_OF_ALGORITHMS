// =========================================
// MAP ENGINE
// =========================================

// Tile Size
const TILE = 64;

// Tile Types
const FLOOR = 0;
const WALL = 1;
const COIN = 2;
const EXIT = 3;

// Level 1 Map
let map = [];

// =========================================
// LOAD MAP
// =========================================

function loadMap(levelData){

    map = JSON.parse(JSON.stringify(levelData.map));

}
// =========================================
// DRAW MAP
// =========================================

function drawMap(){

    for(let row=0; row<map.length; row++){

        for(let col=0; col<map[row].length; col++){

            const tile = map[row][col];

            switch(tile){

                case FLOOR:

                    ctx.fillStyle="#6d9773";
                    break;

                case WALL:

                    ctx.fillStyle="#3b3b3b";
                    break;

                case COIN:

                    ctx.fillStyle="gold";
                    break;

                case EXIT:

                    ctx.fillStyle="royalblue";
                    break;

            }

            ctx.fillRect(
                col*TILE,
                row*TILE,
                TILE,
                TILE
            );

            ctx.strokeStyle="#222";

            ctx.strokeRect(
                col*TILE,
                row*TILE,
                TILE,
                TILE
            );

        }

    }

}

// =========================================
// COLLISION
// =========================================

function isWall(px, py){

    const left = Math.floor(px/TILE);

    const right = Math.floor((px+39)/TILE);

    const top = Math.floor(py/TILE);

    const bottom = Math.floor((py+39)/TILE);

    return(

        map[top][left]==WALL ||

        map[top][right]==WALL ||

        map[bottom][left]==WALL ||

        map[bottom][right]==WALL

    );

}

// =========================================
// COINS
// =========================================

function checkCoins(player){

    const col = Math.floor((player.x+20)/TILE);

    const row = Math.floor((player.y+20)/TILE);

    if(map[row][col]==COIN){

        map[row][col]=FLOOR;

        player.coins++;

        document.getElementById("coinCount").innerHTML=player.coins;

    }

}

// =========================================
// EXIT
// =========================================

function checkExit(player){

    const col = Math.floor((player.x+20)/TILE);
    const row = Math.floor((player.y+20)/TILE);

    if(map[row][col] == EXIT){

        if(!level.doorUnlocked){

            alert("The door is locked!");

            return;

        }

        unlockLevel(2);

        alert("🎉 LEVEL 1 COMPLETE!\n\nSearching Level Unlocked!");

        location.href="/loading?level=2";

    }

}
