// ===============================
// PLAYER CLASS
// Dungeon Of Algorithms
// ===============================

class Player {

    constructor() {

        this.width = 40;
        this.height = 40;

        this.x = 64 + 12;
        this.y = 64 + 12;

        this.speed = 4;

        this.color = "#00FFFF";

        this.hp = 100;
        this.maxHp = 100;

        this.coins = 0;

        this.direction = "down";

        this.attacking = false;

        this.hitTimer = 0;

    }

    move(dx, dy) {

        let nextX = this.x + dx;
        let nextY = this.y + dy;

        if (!isWall(nextX, this.y)) {

            this.x = nextX;

        }

        if (!isWall(this.x, nextY)) {

            this.y = nextY;

        }

    }

    update() {

        let dx = 0;
        let dy = 0;

        if (keys["w"] || keys["arrowup"]) {

            dy -= this.speed;
            this.direction = "up";

        }

        if (keys["s"] || keys["arrowdown"]) {

            dy += this.speed;
            this.direction = "down";

        }

        if (keys["a"] || keys["arrowleft"]) {

            dx -= this.speed;
            this.direction = "left";

        }

        if (keys["d"] || keys["arrowright"]) {

            dx += this.speed;
            this.direction = "right";

        }

        this.move(dx, dy);

    }

    draw() {

        // Body
        ctx.fillStyle = "#00D9FF";

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

        // Sword

        if (this.direction === "right") {

            ctx.fillStyle = "silver";

            ctx.fillRect(
                this.x + 40,
                this.y + 16,
                18,
                6
            );

        }

        if (this.direction === "left") {

            ctx.fillStyle = "silver";

            ctx.fillRect(
                this.x - 18,
                this.y + 16,
                18,
                6
            );

        }

        if (this.direction === "up") {

            ctx.fillStyle = "silver";

            ctx.fillRect(
                this.x + 16,
                this.y - 18,
                6,
                18
            );

        }

        if (this.direction === "down") {

            ctx.fillStyle = "silver";

            ctx.fillRect(
                this.x + 16,
                this.y + 40,
                6,
                18
            );

        }

    }

}