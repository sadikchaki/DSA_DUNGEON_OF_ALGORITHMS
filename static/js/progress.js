// ======================================
// GAME PROGRESS
// ======================================

// Highest unlocked level
let unlockedLevel =
parseInt(localStorage.getItem("unlockedLevel")) || 1;

// Unlock a new level
function unlockLevel(level){

    if(level > unlockedLevel){

        unlockedLevel = level;

        localStorage.setItem(
            "unlockedLevel",
            unlockedLevel
        );

    }

}

// Reset progress
function resetProgress(){

    localStorage.setItem(
        "unlockedLevel",
        1
    );

}