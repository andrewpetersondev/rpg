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
    },
}

var currentlySelectedCharacter;
var combatants = [];

// testing and debugging
// console.log(characters);
// console.log(characters[0]); // returns undefined 
// console.log(characters["Night King"]); // returns object associated with key // this case has "Night King" as the key

// Functions 
// ====================================================================================================================================

// this function will render a character card to the page
// the character rendered and the area they are rendered too
var renderOne = function (character, renderArea) {

    // console.log(" ==================== renderOne ====================");
    // console.log(character);

    // dynamically create html content for one character
    var charDiv = $("<div class='character' data-name='" + character.name + "'>");
    var charName = $("<div class='character-name'>").text(character.name);
    var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageURL);
    var charHealth = $("<div class='character-health'>").text(character.health);

    // append name, image, and health to character div
    charDiv.append(charName).append(charImage).append(charHealth);

    // append character div to render area
    $(renderArea).append(charDiv);

    // testing and debugging
    // console.log(charDiv);
    // console.log(charName);
    // console.log(charImage);
    // console.log(charHealth);
    // console.log(characters);
    // console.log(characters["Jon Snow"]);
    // console.log(character, renderArea);
    // console.log(character);
    // console.log(character.name);
    // console.log(character.health);

};

// function that handles the rendering of characters based on which section they are supposed to appear in
var renderCharacters = function (charObj, areaRender) {
    console.log(charObj.length);

    // console.log("==================== renderCharacters ====================");

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

                renderOne(charObj[key], areaRender);

                // testing and debugging
                // console.log(charObj);
                // console.log(charObj[key]);
            }
        }
    }

    // "#user-character" is the div where our character appears
    // if true render the user character to this area
    if (areaRender === "#user-character") {

        // console.log(charObj);

        renderOne(charObj, areaRender);

        // testing and debugging
        // console.log(charObj, areaRender);
        // console.log(charObj);
        // console.log(areaRender);


    }

    // "#enemy" is the div that holds all of your enemies
    // if true, render enemies to this area
    if (areaRender === "#enemy") {

        // loop through the combatants array and call renderOne to display all enemies in this section
        for (var i = 0; combatants.length; i++) {

            renderOne(charObj[i], areaRender);

            // testing and debugging
            // console.log(charObj);
            // console.log(charObj[i]);
            // console.log(areaRender);

        }

        // testing and debugging
        // console.log("does this line run?");
    }

    // testing and debugging
    // console.log();


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

        // loop through the remaining characters
        for (var key in characters) {

            // console.log(key); // do not delete

            if (key !== name) {

                combatants.push(characters[key]);

            }

        }

        // testing and debugging
        // console.log(combatants);
        // console.log(combatants[0]);
        // console.log(combatants[0].name);

    }

    // hide the section that displays all characters
    $("#characters").hide();

    // console.log(currentlySelectedCharacter);


    // render our selected character
    renderCharacters(currentlySelectedCharacter, "#user-character");

    // console.log(combatants);

    // render our combatants
    renderCharacters(combatants, "#enemy");



});
