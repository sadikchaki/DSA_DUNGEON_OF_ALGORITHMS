// ==============================
// DAMAGE EFFECTS
// ==============================

const damageTexts = [];

function addDamageText(x, y, text, color = "red") {

    damageTexts.push({
        x: x,
        y: y,
        text: text,
        color: color,
        life: 60
    });

}

function updateDamageTexts() {

    for (let i = damageTexts.length - 1; i >= 0; i--) {

        damageTexts[i].y -= 0.5;
        damageTexts[i].life--;

        if (damageTexts[i].life <= 0) {

            damageTexts.splice(i, 1);

        }

    }

}

function drawDamageTexts() {

    ctx.font = "20px Arial";
    ctx.textAlign = "center";

    for (let dmg of damageTexts) {

        ctx.fillStyle = dmg.color;

        ctx.fillText(
            dmg.text,
            dmg.x,
            dmg.y
        );

    }

}