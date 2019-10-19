
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
                  rock: ['b'],
                  paper: ['n'],
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

      console.log("Checking Array: " + arr)

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

      if (checkOnePair(playerData["player1"]["rock"], activeKeys) == true) {
            playerData["player1"]["result"] = "rock"
            // alert("Player 1 has chosen Rock")
            // return true
      }

      if (checkOnePair(playerData["player1"]["paper"], activeKeys) == true) {
            playerData["player1"]["result"] = "paper"
            // alert("Player 1 has chosen Paper")
            // return true
      }

      if (checkOnePair(playerData["player1"]["scissors"], activeKeys) == true) {
            playerData["player1"]["result"] = "scissors"
            // alert("Player 1 has chosen Scissors")
            // return true
      }

      if (checkOnePair(playerData["player2"]["rock"], activeKeys) == true) {
            playerData["player2"]["result"] = "rock"
            // alert("Player 2 has chosen Rock")
            // return true
      }

      if (checkOnePair(playerData["player2"]["paper"], activeKeys) == true) {
            playerData["player2"]["result"] = "paper"
            // alert("Player 2 has chosen Paper")
            // return true
      }

      if (checkOnePair(playerData["player2"]["scissors"], activeKeys) == true) {
            playerData["player2"]["result"] = "scissors"
            // alert("Player 2 has chosen Scissors")
            // return true
      }

      // return false

}

// Actually running the code

document.onkeypress = function (evt) {
      evt = evt || window.event;
      var charCode = evt.keyCode || evt.which;
      var charStr = String.fromCharCode(charCode);
      activeKeys.push(charStr)
      var toTest = playerData["player1"]["rock"]
      // console.log("toTest: " + toTest)
      console.log("activeKeys: " + activeKeys)
      checkIfResultWasFound(playerData, activeKeys)
      // console.log("Result found: " + checkIfResultWasFound(playerData, activeKeys))

      // console.log(playerData)
      console.log(JSON.stringify(playerData, null, 0));

      if (playerData["player1"]["result"] != null && playerData["player2"]["result"] != null) {
            whoWon = winner(playerData["player1"]["result"],playerData["player2"]["result"])
            alert(whoWon)
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

