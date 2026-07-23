// =========================================
// ENEMY SYSTEM
// =========================================

class Enemy {

    constructor(x, y, type = "slime") {

        this.x = x;
        this.y = y;

        this.width = 40;
        this.height = 40;

        this.type = type;

        this.spawnX = x;
        this.spawnY = y;

        this.radius = 120;

        this.speed = 2;

        this.direction = 1;

        // Ghost movement
        this.dx = this.speed;
        this.dy = 0;

        // HP based on enemy type
        if(type === "golem"){

            this.hp = 60;
            this.maxHp = 60;
            this.speed = 1.2;

        }

        else if(type === "boss"){

            this.hp = 150;
            this.maxHp = 150;
            this.speed = 1;

        }

        else{

// ======================
// Enemy Stats
// ======================

if(type === "slime"){

    this.maxHp = 20;
    this.damage = 5;
    this.speed = 2;

}
else if(type === "skeleton"){

    this.maxHp = 35;
    this.damage = 10;
    this.speed = 2;

}
else if(type === "ghost"){

    this.maxHp = 25;
    this.damage = 8;
    this.speed = 2.5;

}
else if(type === "golem"){

    this.maxHp = 60;
    this.damage = 20;
    this.speed = 1.2;

}
else if(type === "orc"){

    this.maxHp = 45;
    this.damage = 15;
    this.speed = 2.8;

}
else if(type === "bat"){

    this.maxHp = 18;
    this.damage = 6;
    this.speed = 4;

}
else{

    this.maxHp = 30;
    this.damage = 10;
    this.speed = 2;

}

this.hp = this.maxHp;

        }

        this.dead = false;
        this.hitTimer = 0;

        this.charging = false;
        this.chargeSpeed = 5;
        this.detectRange = 150;

    }

    // =========================================
    // UPDATE
    // =========================================

    update(){

        if(this.dead) return;

        if(this.hitTimer > 0){

            this.hitTimer--;

        }

        // =====================================
        // GHOST AI
        // =====================================

// =====================================
// GHOST AI
// =====================================

if(this.type === "ghost"){

    // Randomly change direction
    if(Math.random() < 0.02){

        const dir = Math.floor(Math.random() * 4);

        switch(dir){

            case 0:
                this.dx = this.speed;
                this.dy = 0;
                break;

            case 1:
                this.dx = -this.speed;
                this.dy = 0;
                break;

            case 2:
                this.dx = 0;
                this.dy = this.speed;
                break;

            case 3:
                this.dx = 0;
                this.dy = -this.speed;
                break;

        }

    }

    let nextX = this.x + this.dx;
    let nextY = this.y + this.dy;

    // Stay inside haunted area
    if(
        Math.abs(nextX - this.spawnX) <= this.radius &&
        Math.abs(nextY - this.spawnY) <= this.radius
    ){

        this.x = nextX;
        this.y = nextY;

    }
    else{

        // Turn around if leaving room
        this.dx *= -1;
        this.dy *= -1;

    }

    return;

}

        // =====================================
        // GOLEM AI (Vertical Patrol)
        // =====================================

if(this.type === "golem"){

    const dx = player.x - this.x;
    const dy = player.y - this.y;

const distance = Math.sqrt(dx*dx + dy*dy);

// Only detect player if there is no wall between them
if(distance < this.detectRange && !isWall(player.x, player.y)){

    this.charging = true;

}

    if(this.charging){

        const angle = Math.atan2(dy, dx);

const nextX = this.x + Math.cos(angle) * this.chargeSpeed;
const nextY = this.y + Math.sin(angle) * this.chargeSpeed;

if(!isWall(nextX, nextY)){

    this.x = nextX;
    this.y = nextY;

}
else{

    // Hit a wall, stop charging
    this.charging = false;

}

        if(distance > 250){

            this.charging = false;

        }

        return;

    }

    // Normal patrol
    let nextY = this.y + this.speed * this.direction;

    if(isWall(this.x, nextY)){

        this.direction *= -1;

    }

    else{

        this.y = nextY;

    }

    return;

}

        // =====================================
        // NORMAL ENEMIES
        // =====================================

        let nextX = this.x + this.speed * this.direction;

        if(isWall(nextX, this.y)){

            this.direction *= -1;

        }

        else{

            this.x = nextX;

        }

    }

    // =========================================
    // DRAW
    // =========================================

    draw(){

        if(this.dead) return;

        if(this.hitTimer > 0){

            ctx.fillStyle = "red";

        }

        else if(this.type === "slime"){

            ctx.fillStyle = "#32CD32";

        }

        else if(this.type === "skeleton"){

            ctx.fillStyle = "#DDDDDD";

        }

        else if(this.type === "ghost"){

            ctx.fillStyle = "#66CCFF";

        }

        else if(this.type === "golem"){

            ctx.fillStyle = "#8B4513";

        }

        else if(this.type === "orc"){

            ctx.fillStyle = "#228B22";

        }

        else if(this.type === "bat"){

            ctx.fillStyle = "#800080";

        }

        else if(this.type === "boss"){

            ctx.fillStyle = "#8B0000";

        }

        else{

            ctx.fillStyle = "white";

        }

        // Body
        ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );

        // Eyes
        ctx.fillStyle = "black";

        ctx.fillRect(this.x + 8, this.y + 10, 4, 4);
        ctx.fillRect(this.x + 28, this.y + 10, 4, 4);

        // HP Bar Background
        ctx.fillStyle = "red";

        ctx.fillRect(
            this.x,
            this.y - 8,
            this.width,
            5
        );

        // HP Bar
        ctx.fillStyle = "lime";

        ctx.fillRect(
            this.x,
            this.y - 8,
            (this.hp / this.maxHp) * this.width,
            5
        );

    }

}

// =========================================
// CURRENT ENEMIES
// =========================================

let enemies = [];

// =========================================
// LOAD ENEMIES
// =========================================

function loadEnemies(levelData){

    enemies = [];

    for(const enemy of levelData.enemies){

const e = new Enemy(
    enemy.x,
    enemy.y,
    enemy.type
);

if(enemy.radius){

    e.radius = enemy.radius;

}

enemies.push(e);
    }

}

// =========================================
// UPDATE
// =========================================

function updateEnemies(){

    for(const enemy of enemies){

        if(enemy.dead) continue;

        enemy.update();

    }

}

// =========================================
// DRAW
// =========================================

function drawEnemies(){

    for(const enemy of enemies){

        if(enemy.dead) continue;

        enemy.draw();

    }

}

// =========================================
// COLLISION
// =========================================

function checkEnemyCollision(player){

    if(battle.active) return;

    for(const enemy of enemies){

        if(enemy.dead) continue;

        if(

            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y

        ){

            startBattle(enemy);

            return;

        }

    }

}