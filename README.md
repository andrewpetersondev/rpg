# rpg

## Take a look

**[Role Playing Game](https://andrewpetersondev.github.io/rpg/)**

## Technologies Used

- html
- css
- bootstrap
- javascript
- jQuery

## Overview

The purpose of this project is to practice using jQuery.

## Criteria

- When the game starts, the player will choose a character by clicking on the fighter's picture. The player will fight as that character for the rest of the game.

- The player must then defeat all of the remaining fighters. Enemies should be moved to a different area of the screen.

- The player chooses an opponent by clicking on an enemy's picture.

- Once the player selects an opponent, that enemy is moved to a defender area.

- The player will now be able to click the attack button.

  1. Whenever the player clicks attack, their character damages the defender. The opponent will lose HP (health points). These points are displayed at the bottom of

  1. the defender's picture.

* The opponent character will instantly counter the attack. When that happens, the player's character will lose some of their HP. These points are shown at the bottom of the player character's picture.

* The player will keep hitting the attack button in an effort to defeat their opponent.

* When the defender's HP is reduced to zero or below, remove the enemy from the defender area. The player character can now choose a new opponent.

* The player wins the game by defeating all enemy characters. The player loses the game the game if their character's HP falls to zero or below.

## Game design notes

- Each character in the game has 3 attributes: Health Points, Attack Power and Counter Attack Power.

- Each time the player attacks, their character's Attack Power increases by its base Attack Power.

- For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6 (12, 18, 24, 30 and so on).

- The enemy character only has Counter Attack Power.

- Unlike the player's Attack Points, Counter Attack Power never changes.

- The Health Points, Attack Power and Counter Attack Power of each character must differ.

- No characters in the game can heal or recover Health Points.

- A winning player must pick their characters wisely by first fighting an enemy with low Counter Attack Power. This will allow them to grind Attack Power and to take on enemies before they lose all of their Health Points. Healing options would mess with this dynamic.

- Your players should be able to win and lose the game no matter what character they choose. The challenge should come from picking the right enemies, not choosing the strongest player.

## My Notes

```javascript

// The for...in statement iterates over all non-Symbol, enumerable properties of an object.

// var obj = {property1 : value1, property2 : value2, etc}
// var obj = {key1 : value1, key2 : value2, etc}

// for this program
// var characters = {"Jon Snow" : {value}, "Night King" : {value}, etc}
// meaning that key refers to "Jon Snow", "Night King", etc

// using ! (aka logical NOT Operator) in front of a variable with a null value makes it a true statement
// currentlySelectedCharacter starts null so we use ! to make a true/false statement that can run after a character is selected
```

More Key Concepts

- [JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)

- [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)

- [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)

- [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)

- [undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)

- [logical not operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators)

- [enumerability](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)

- [objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

- [for...in loops]()

## Status

In Progress.

## Sources

This project may have code from class activities, office hours notes, or from seeking help from TAs and teachers.
