// Global Variables
// ===================================================================================================================================================

/*
var object = {
    key : {values},
    key2 : {values}
}
*/

var characters = {
    "Jon Snow": {
        name: "Jon Snow",
        health: 100,
        attack: 10,
        imageURL: "./assets/images/jon-snow.jpg",
        enemyAttackBack: 8
    },
    "Night King": {
        name: "Night King",
        health: 140,
        attack: 15,
        imageURL: "./assets/images/night-king.jpg",
        enemyAttackBack: 15
    },
    "Tormund Giantsbane": {
        name: "Tormund Giantsbane",
        health: 75,
        attack: 20,
        imageURL: "./assets/images/tormund.jpeg",
        enemyAttackBack: 5
    },
    "Karl Tanner": {
        name: "Karl Tanner",
        health: 65,
        attack: 18,
        imageURL: "./assets/images/karl-tanner.jpg",
        enemyAttackBack: 8
    },
    "Sir Bronn": {
        name: "Sir Bronn",
        health: 100,
        attack: 15,
        imageURL: "./assets/images/sir-bronn.jpeg",
        enemyAttackBack: 20
    }
};

var currentlySelectedCharacter;
var combatants = [];
var currentDefender;
var turnCounter = 1;
var killCount = 0;

// console.log(characters);

// Functions 
// ====================================================================================================================================

var renderOne = function (character, renderArea, charStatus) {

    // div that contains individual character
    var charDiv = $("<div class='character' data-name='" + character.name + "'>");

    // character name 
    var charName = $("<div class='character-name'>").text(character.name);

    // character image
    var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageURL);

    // character health
    var charHealth = $("<div class='character-health'>").text(character.health);

    // chain appends to put all individual character information in character's container div
    charDiv.append(charName).append(charImage).append(charHealth);

    // use jquery to target renderArea and append charDiv
    $(renderArea).append(charDiv);

    // run when renderOne is called with charStatus of "enemy"
    if (charStatus === "enemy") {
        $(charDiv).addClass("enemy");
    }
    // run when renderOne is called with charStatus of "defender"
    else if (charStatus === "defender") {
        // set currentDefender
        currentDefender = character;
        // add class to currentDefender
        $(charDiv).addClass("target-enemy");
    }

};

var renderMessage = function (message) {
    var gameMessageSet = $("#message");
    var newMessage = $("<div>").text(message);
    gameMessageSet.append(newMessage);
    if (message === "clearMessage") {
        gameMessageSet.text("");
    }
};

var renderCharacters = function (charObj, areaRender) {
    // is this necessary?
    // $(areaRender).empty();

    // render $("#characters")
    if (areaRender === "#characters") {
        // empty 
        $(areaRender).empty();
        // loop through characters object and call renderOne on each key
        for (var key in charObj) {
            // 
            if (charObj.hasOwnProperty(key)) {
                //
                renderOne(charObj[key], areaRender, "");
            }
        }
    }

    // render $("#user-character")
    if (areaRender === "#user-character") {
        // empty
        $(areaRender).empty();
        // call renderOne fill user-character div with character object
        renderOne(charObj, areaRender, "");
    }

    // render $("#enemies")
    if (areaRender === "#enemies") {
        // empty
        $(areaRender).empty();
        // loop
        for (var i = 0; i < charObj.length; i++) {
            renderOne(charObj[i], areaRender, "enemy");
        }

        // click event for each enemy
        $(document).on("click", ".enemy", function () {
            // save name of enemy clicked
            var name = ($(this).attr("data-name"));
            // run if a defender has not been chosen from enemies
            if ($("#defender").children().length === 0) {
                renderCharacters(name, "#defender");
                // hide enemy from enemies display?
                $(this).hide();
                renderMessage("clearMessage");
            }
        });
    }

    // render $("#defender")
    if (areaRender === "#defender") {
        $(areaRender).empty();
        for (var i = 0; i < combatants.length; i++) {
            if (combatants[i].name === charObj) {
                renderOne(combatants[i], areaRender, "defender");
            }
        }

    }

    // render $("#playerDamage")
    if (areaRender === "playerDamage") {
        $("#defender").empty();
        renderOne(charObj, "#defender", "defender");
    }

    // render $("#enemyDamage")
    if (areaRender === "enemyDamage") {
        $("#user-character").empty();
        renderOne(charObj, "#user-character", "");
    }

    // render $("#enemyDefeated")
    if (areaRender === "enemyDefeated") {
        $("#defender").empty();
        var gameStateMessage = "You have defeated " + charObj.name + ", you can now choose to fight another character.";
        renderMessage(gameStateMessage);
    }
};

var restartGame = function (inputEndGame) {
    var restart = $("<button>restart</button>").click(function () {
        location.reload();
    });
    var gameState = $("<div>").text(inputEndGame);
    $("body").append(gameState);
    $("body").append(restart);

};

// Main Processes
// ===================================================================================================================================================
// this function is run when the page is loaded to display all characters
renderCharacters(characters, "#characters");

// user clicks on a character to select their character
$(document).on("click", ".character", function () {

    // capture the data-name of character that was clicked and store it in a variable
    var name = $(this).attr("data-name");

    // console.log(name);

    // using ! (aka logical NOT Operator) in front of a variable with a null value makes it a true statement
    // currentlySelectedCharacter starts null so we use ! to make a true/false statement that can run after a character is selected
    if (!currentlySelectedCharacter) {

        currentlySelectedCharacter = characters[name];

        // console.log("currentlySelectedCharacter" , currentlySelectedCharacter);

        // var object = {key1 : {values}, key2 : {values}, etc}
        for (var key in characters) {

            if (key !== name) {
                combatants.push(characters[key]);
            }
        }
    }

    // hide div that holds all of the characters
    $("#characters").hide();

    // render character you want to play with
    renderCharacters(currentlySelectedCharacter, "#user-character");

    // render your enemies available to attack
    renderCharacters(combatants, "#enemies");
});

// user clicks attack button 
$("#attack").on("click", function () {

    if ($("#defender").children().length !== 0) {

        // messages
        var attackMessage = "You attacked " + currentDefender.name + " for " + (currentlySelectedCharacter.attack * turnCounter) + " damage.";
        var counterAttackMessage = currentDefender.name + " attacked you  back for " + currentDefender.enemyAttackBack + " damage.";
        renderMessage("clearMessage");

        currentDefender.health -= (currentlySelectedCharacter.attack * turnCounter);

        if (currentDefender.health > 0) {
            renderCharacters(currentDefender, "playerDamage");
            renderMessage(attackMessage);
            renderMessage(counterAttackMessage);
            currentlySelectedCharacter.health -= currentDefender.enemyAttackBack;
            renderCharacters(currentlySelectedCharacter, "enemyDamage");

            if (currentlySelectedCharacter.health <= 0) {
                renderMessage("clearMessage");
                restartGame("You Lost!");
                $("#attack").unbind("click");
            }

        }
        else {
            renderCharacters(currentDefender, "enemyDefeated");
            killCount++;

            if (killCount >= combatants.length) {
                renderMessage("clearMessage");
                restartGame("You won. Game over!");
            }

        }
    }
    turnCounter++;
});
