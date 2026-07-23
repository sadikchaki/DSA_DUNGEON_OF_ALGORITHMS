// =======================================
// INPUT MANAGER
// =======================================

const keys = {};

// Key Press
document.addEventListener("keydown", (event) => {

    keys[event.key.toLowerCase()] = true;

});

// Key Release
document.addEventListener("keyup", (event) => {

    keys[event.key.toLowerCase()] = false;

});

let interactPressed = false;

window.addEventListener("keydown", (e) => {

    if(e.key === "e" || e.key === "E"){
        interactPressed = true;
    }

});

window.addEventListener("keyup", (e) => {

    if(e.key === "e" || e.key === "E"){
        interactPressed = false;
    }

});