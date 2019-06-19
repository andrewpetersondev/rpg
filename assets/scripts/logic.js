// Global Variables
// ===================================================================================================================================================

// characters object
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
    // console.log("==================== renderOne ====================");
    // console.log(character, renderArea);
    // dynamically create html content for one character
    var charDiv = $("<div class='character' data-name='" + character.name + "'>");
    var charName = $("<div class='character-name'>").text(character.name);
    var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageURL);
    var charHealth = $("<div class='character-health'>").text(character.health);
    // append name, image, and health to character div
    charDiv.append(charName).append(charImage).append(charHealth);
    // append character div to render area
    $(renderArea).append(charDiv);

    // if the character is an enemy or defender (the active opponent), add the 
    if (charStatus === "enemy") {
        $(charDiv).addClass("enemy");
    }
    else if (charStatus === "defender") {
        // populate current defender with info
        currentDefender = character;
        $(charDiv).addClass("target-enemy");
    }
};

var renderMessage = function(message) {
    var gameMessageSet = $("#message");
    var newMessage = $("<div>").text(message);
    gameMessageSet.append(newMessage);
    if (message === "clearMessage") {
        gameMessageSet.text("");
    }
}

// function that handles the rendering of characters based on which section they are supposed to appear in
var renderCharacters = function (charObj, areaRender) {
    // console.log("==================== renderCharacters ====================");
    // console.log(charObj, areaRender);
    // console.log(charObj.length);
    // "#characters" is the div where all of the characters appear at the start of the game
    // if true, render all characters to the starting area
    if (areaRender === "#characters") {
        $(areaRender).empty();
        // The for...in statement iterates over all non-Symbol, enumerable properties of an object.
        // enumerable means 
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties
        // loop through the characters object and call renderOne 
        for (var key in charObj) {
            // console.log(key);
            if (charObj.hasOwnProperty(key)) {
                renderOne(charObj[key], areaRender, "");
            }
        }
    }
    // "#user-character" is the div where our character appears
    // if true render the user character to this area
    if (areaRender === "#user-character") {
        renderOne(charObj, areaRender, "");
    }
    // "#enemies" is the div that holds all of your enemies
    // if true, render enemies to this area
    if (areaRender === "#enemies") {
        // loop through the combatants array and call renderOne to display all enemies in this section
        for (var i = 0; i < charObj.length; i++) {
            // console.log(charObj[i]);
            renderOne(charObj[i], areaRender, "enemy");
        }
        // creates an on click event for each enemy
        $(document).on("click", ".enemy", function () {
            var name = ($(this).attr("data-name"));
            // if there is no defender, the clicked enemy will become the defender
            if ($("#defender").children().length === 0) {
                renderCharacters(name, "#defender");
                $(this).hide();
                renderMessage("clearMessage");
            }
        });
    }
    // "#defender" is the div where the active opponent appears
    // if true render the area
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

var restartGame = function(inputEndGame) {

    var restart = $("<button>restart</button>").click(function() {
        location.reload();
    });

    var gameState = $("<div>").text(inputEndGame);

    $("body").append(gameState);
    $("body").append(restart);

};

// Main Processes
// ===================================================================================================================================================

// render all the characters to the html
renderCharacters(characters, "#characters");

// click a character image
$(document).on("click", ".character", function () {
    // log button click
    // console.log(this);

    // save the info from the clicked character
    var name = $(this).attr("data-name");
    // console.log(name);

    // if a player has not been chosen
    if (!currentlySelectedCharacter) {

        // set the currentlySelectedCharacter to the object[identifier]
        currentlySelectedCharacter = characters[name];
        // console.log(currentlySelectedCharacter);

        // The for...in statement iterates over all non-Symbol, enumerable properties of an object.
        // var obj = {property1 : value1, property2 : value2, etc}
        // var obj = {key1 : value1, key2 : value2, etc}
        // for this program 
        // var characters = {"Jon Snow" : {value}, "Night King" : {value}, etc}
        // meaning that key refers to "Jon Snow", "Night King", etc

        // loop through the remaining characters
        for (var key in characters) {
            // console.log(key); // do not delete
            // console.log(characters[key]); // do not delete
            if (key !== name) {
                // combatants.push(key); // we do not use this because we would lose all the object data
                combatants.push(characters[key]);
            }
        }
        // console.log(combatants);
    }

    // // hide the section that displays all characters
    $("#characters").hide();

    // // render our selected character and combatants
    renderCharacters(currentlySelectedCharacter, "#user-character");
    renderCharacters(combatants, "#enemies");

});

// attack button 
$("#attack").on("click", function() {

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
            if(killCount >= 4) {
                renderMessage("clearMessage");
                restartGame("You won. Game over!");
            }
        }

    }

turnCounter++;


});
