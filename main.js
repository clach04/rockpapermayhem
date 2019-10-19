
const debug = false;
//const debug=true;
const rock = 'rock';
const paper = 'paper';
const scissors = 'scissors';
const player1 = 'player1';
const player2 = 'player2';
const draw = 'draw';

function winner(player1_move, player2_move) {
      // Result is one of: 'draw', player1, player2
      switch (player1_move) {
            case rock:
                  switch (player2_move) {
                        case rock: return draw;
                              break;
                        case paper: return player2;
                              break;
                        case scissors: return player1;
                              break;
                  }
                  break;

            case paper:
                  switch (player2_move) {
                        case rock: return player1;
                              break;
                        case paper: return draw;
                              break;
                        case scissors: return player2;
                              break;
                  }
                  break;
            case scissors:
                  switch (player2_move) {
                        case rock: return player2;
                              break;
                        case paper: return player1;
                              break;
                        case scissors: return draw;
                              break;
                  }
                  break;
      }
}

// Generates one random character

var potentialKeys = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0"]

function randCharacter() {

      // console.log("Potential Keys:")
      console.log(potentialKeys)

      var index = Math.floor(Math.random() * (potentialKeys.length - 1)) + 0

      // console.log("Index is: " + index)

      result = potentialKeys[index]

      // console.log("Result: " + result)

      potentialKeys.splice(index,1)

      return result
}

// Returns an array of X length, each element a random character

function generateArrayOfCharacters(length) {

      var result = []

      for (i = 0; i < length; i++) {

            char = randCharacter()

            // console.log("Attempting to add " + char)

            result.push(char)

      }

      return result

}

function generate_keys(numberOfResults) {

      // Reset potential keys, so we can cut them out again as we add characters

      potentialKeys = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0"]

      // Version 1 :-)
      var result = {
            'player1': {
                  rock: generateArrayOfCharacters(numberOfResults),
                  paper: generateArrayOfCharacters(numberOfResults),
                  scissors: generateArrayOfCharacters(numberOfResults),
                  "result": null
            },
            'player2': {
                  rock: generateArrayOfCharacters(numberOfResults),
                  paper: generateArrayOfCharacters(numberOfResults),
                  scissors: generateArrayOfCharacters(numberOfResults),
                  "result": null
            }
      };

      console.log("Keys generated:")
      console.log(result)

      // Make this display on the test page

      document.getElementById("player1rock").innerHTML = String(result["player1"]["rock"])
      document.getElementById("player1paper").innerHTML = String(result["player1"]["paper"])
      document.getElementById("player1scissors").innerHTML = String(result["player1"]["scissors"])

      document.getElementById("player2rock").innerHTML = String(result["player2"]["rock"])
      document.getElementById("player2paper").innerHTML = String(result["player2"]["paper"])
      document.getElementById("player2scissors").innerHTML = String(result["player2"]["scissors"])
      

      return result;
}

activeKeys = []

window.addEventListener("load", ()=>{

      playerData = generate_keys(2)

})

// Checks one part of "keys that need to be pressed" to "keys that have been pressed"
// For example, rock = ["A","B"], keysPressed = ["J","K","5","A"]

function checkOnePair(arr, keysPressed) {

      // console.log("Checking Array: " + arr)

      var allMatchesTrue = true

      // Loop through each key in the "keys that need to be pressed"

      for (i = 0; i < arr.length; i++) {

            // If we find a match, mark allMatchesTrue as true. Skip marking as true if we've already
            // marked it as false

            if (keysPressed.includes(arr[i]) && allMatchesTrue) {
                  allMatchesTrue = true
            }

            else {
                  allMatchesTrue = false
            }

      }

      return allMatchesTrue
}

// Checks if a player has made a move

function checkIfResultWasFound(playerData, activeKeys) {

      console.log(playerData)

      playerData["player1"]["result"] = null
      playerData["player2"]["result"] = null

      if (checkOnePair(playerData["player1"]["rock"], activeKeys) == true) {
            playerData["player1"]["result"] = "rock"
      }

      if (checkOnePair(playerData["player1"]["paper"], activeKeys) == true) {
            playerData["player1"]["result"] = "paper"
      }

      if (checkOnePair(playerData["player1"]["scissors"], activeKeys) == true) {
            playerData["player1"]["result"] = "scissors"
      }

      if (checkOnePair(playerData["player2"]["rock"], activeKeys) == true) {
            playerData["player2"]["result"] = "rock"
      }

      if (checkOnePair(playerData["player2"]["paper"], activeKeys) == true) {
            playerData["player2"]["result"] = "paper"
      }

      if (checkOnePair(playerData["player2"]["scissors"], activeKeys) == true) {
            playerData["player2"]["result"] = "scissors"
      }

}

// On key press
// Adds the pressed key to activeKeys array
// Then determines if someone has won or not

document.onkeydown = function (evt) {
      evt = evt || window.event;
      var charCode = evt.keyCode || evt.which;
      var charStr = String.fromCharCode(charCode); // The string of the character
      charStr = charStr.toLowerCase()

      console.log("Raw key pressed: " + charStr)

      if (activeKeys.includes(charStr) != true) {

            activeKeys.push(charStr)

      }

      console.log("activeKeys: " + activeKeys)
      checkIfResultWasFound(playerData, activeKeys)

      console.log(JSON.stringify(playerData, null, 0));

      if (playerData["player1"]["result"] != null && playerData["player2"]["result"] != null) {
            whoWon = winner(playerData["player1"]["result"], playerData["player2"]["result"])
            console.log("Winner: " + whoWon)
            document.getElementById("winner").innerHTML = whoWon
      }

};


if (debug) {
      result = generate_keys();
      console.log(result);
      console.log(JSON.stringify(result, null, 4));

      result = winner(rock, scissors);
      result = winner(rock, scissors);
      console.log(result);
      result = winner(scissors, rock);
      console.log(result);
}

