async function checkAnswer(value){

    const response = await fetch("/api/check", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            selected: value
        })

    });

    return await response.json();

}
function checkChestInteraction(player){

    if(!interactPressed) return;

    for(let chest of chests){

        if(chest.opened) continue;
        if(chest.locked) continue;

        const touching =

            player.x < chest.x + chest.width &&
            player.x + player.width > chest.x &&
            player.y < chest.y + chest.height &&
            player.y + player.height > chest.y;

        if(touching){

            chest.opened = true;

            player.coins += 50;

            document.getElementById("coinCount").innerHTML = player.coins;

            level.doorUnlocked = true;

            alert("🎉 Chest Opened!\n+50 Coins\nDoor Unlocked!");

            interactPressed = false;

            return;
        }
    }
}