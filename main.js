
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

function generate_keys() {
      // Version 1 :-)
      var result = {
            'player1': {
                  rock: ['b','g'],
                  paper: ['n','h'],
                  scissors: ['m'],
                  "result": null
            },
            'player2': {
                  rock: ['1'],
                  paper: ['2'],
                  scissors: ['3'],
                  "result": null
            }
      };

      //console.log(result);
      return result;
}


activeKeys = []
playerData = generate_keys()

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

// On key press, run the code

document.onkeydown = function (evt) {
      evt = evt || window.event;
      var charCode = evt.keyCode || evt.which;
      var charStr = String.fromCharCode(charCode); // The string of the character
      charStr = charStr.toLowerCase()

      if (activeKeys.includes(charStr) != true) {

            activeKeys.push(charStr)

      }

      // var toTest = playerData["player1"]["rock"]
      console.log("activeKeys: " + activeKeys)
      checkIfResultWasFound(playerData, activeKeys)

      console.log(JSON.stringify(playerData, null, 0));

      if (playerData["player1"]["result"] != null && playerData["player2"]["result"] != null) {
            whoWon = winner(playerData["player1"]["result"], playerData["player2"]["result"])
            console.log("Winner: " + whoWon)
      }

      console.log("KEYDOWN DETECTED")

};

// Remove keys from active array whenever the key is released

document.onkeyup = function (evt) {
      evt = evt || window.event;
      var charCode = evt.keyCode || evt.which;
      var charStr = String.fromCharCode(charCode);
      charStr = charStr.toLowerCase()

      var index = activeKeys.indexOf(charStr); // Index of the specific key we want to remove

      if (index > -1) {
            activeKeys.splice(index, 1);
      }

      checkIfResultWasFound(playerData, activeKeys)

      console.log("KEYUP DETECTED")

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

