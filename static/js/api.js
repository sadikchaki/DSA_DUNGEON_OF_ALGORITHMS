// =====================================
// FLASK API
// =====================================

async function getPuzzle(enemyType = ""){

    try{

        let url = "/api/puzzle";

        // ==========================
        // LEVEL 2 -> Searching
        // ==========================

        if(level.number === 2){

            url = "/api/searching?enemy=" + enemyType;

        }

        // ==========================
        // LEVEL 3 -> Sorting
        // ==========================

        else if(level.number === 3){

            url = "/api/sorting";

        }

        const response = await fetch(url);

        const puzzle = await response.json();

        return puzzle;

    }

    catch(error){

        console.error(error);

        return null;

    }

}