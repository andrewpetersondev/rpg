// Global Variables
// ===================================================================================================================================================

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

// Functions 
// ====================================================================================================================================

var renderOne = function (character, renderArea, charStatus) {

    var charDiv = $("<div class='character' data-name='" + character.name + "'>");
    var charName = $("<div class='character-name'>").text(character.name);
    var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageURL);
    var charHealth = $("<div class='character-health'>").text(character.health);

    charDiv.append(charName).append(charImage).append(charHealth);
    $(renderArea).append(charDiv);

    if (charStatus === "enemy") {
        $(charDiv).addClass("enemy");
    }
    else if (charStatus === "defender") {
        currentDefender = character;
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

    // $(areaRender).empty();

    if (areaRender === "#characters") {
        $(areaRender).empty();
        for (var key in charObj) {
            if (charObj.hasOwnProperty(key)) {
                renderOne(charObj[key], areaRender, "");
            }
        }
    }

    if (areaRender === "#user-character") {
        $(areaRender).empty();
        renderOne(charObj, areaRender, "");
    }

    if (areaRender === "#enemies") {
        $(areaRender).empty();

        for (var i = 0; i < charObj.length; i++) {
            renderOne(charObj[i], areaRender, "enemy");
        }

        $(document).on("click", ".enemy", function () {
            var name = ($(this).attr("data-name"));
            if ($("#defender").children().length === 0) {
                renderCharacters(name, "#defender");
                $(this).hide();
                renderMessage("clearMessage");
            }
        });
    }

    if (areaRender === "#defender") {
        $(areaRender).empty();
        for (var i = 0; i < combatants.length; i++) {

            if (combatants[i].name === charObj) {
                renderOne(combatants[i], areaRender, "defender");
            }
        }

    }

    if (areaRender === "playerDamage") {
        $("#defender").empty();
        renderOne(charObj, "#defender", "defender");
    }

    if (areaRender === "enemyDamage") {
        $("#user-character").empty();
        renderOne(charObj, "#user-character", "");
    }

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

renderCharacters(characters, "#characters");

$(document).on("click", ".character", function () {

    var name = $(this).attr("data-name");

    if (!currentlySelectedCharacter) {
        currentlySelectedCharacter = characters[name];

        for (var key in characters) {

            if (key !== name) {
                combatants.push(characters[key]);
            }
        }
    }

    $("#characters").hide();
    renderCharacters(currentlySelectedCharacter, "#user-character");
    renderCharacters(combatants, "#enemies");
});

$("#attack").on("click", function () {

    if ($("#defender").children().length !== 0) {

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

            if (killCount >= 4) {
                renderMessage("clearMessage");
                restartGame("You won. Game over!");
            }

        }
    }
    turnCounter++;
});
