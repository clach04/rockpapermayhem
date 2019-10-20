const debug = false;
//const debug=true;
const rock = 'rock';
const paper = 'paper';
const scissors = 'scissors';
const player1 = 'player1';
const player2 = 'player2';
const draw = 'draw';
var counter;
var gameOn = false;
var globalPlayerData;

var globalPlayerScores = {
      "player1": 0,
      "player2": 0
}

var numberOfKeysToPress = 1
var roundNumber = 1

// set keys and start countdown timer; calls display keys to display keys when
// timer hits 0
function countdownTimer() {
  $("#countdownModal").modal("toggle")
  globalPlayerData = generate_keys(numberOfKeysToPress);
      var i = 3;
      counter = setInterval(
            function () {
                  setTimerValue(i);
                  i = i - 1;
                  if (i < 0) {
                        clearCounter();
        $("#countdownModal").modal("toggle")
                        displayKeys(globalPlayerData);
                        gameOn = true;
                  }
            }, 1000

      )
}

function setTimerValue(value) {
      $("#countdown-timer-value").text(value);
}

function clearCounter() {
      counter = clearInterval(counter);
}

function displayKeys(keys) {

      $("#p1-rock-keys").text(keys['player1']['rock']);
      $("#p2-rock-keys").text(keys['player2']['rock']);
      $("#p1-scissors-keys").text(keys['player1']['scissors']);
      $("#p2-scissors-keys").text(keys['player2']['scissors']);
      $("#p1-paper-keys").text(keys['player1']['paper']);
      $("#p2-paper-keys").text(keys['player2']['paper']);
}

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

var potentialKeys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]

function randCharacter() {

      var index = Math.floor(Math.random() * (potentialKeys.length - 1)) + 0

      result = potentialKeys[index]

      potentialKeys.splice(index, 1)

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

      potentialKeys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]

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

      return result;
}


activeKeys = []

// Checks one part of "keys that need to be pressed" to "keys that have been pressed"
// For example, rock = ["A","B"], keysPressed = ["J","K","5","A"]

function checkOnePair(arr, keysPressed) {

      //   console.log()
      //   console.log(arr)
      //   console.log(keysPressed)

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

      if (checkOnePair(playerData["player1"]["rock"], activeKeys) == true) {
            playerData["player1"]["result"] = "rock"
            console.log('p1rock')
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

      globalPlayerData = playerData;
}

// On key press, run the code

document.onkeydown = function (evt) {
      if (gameOn) {
            evt = evt || window.event;
            var charCode = evt.keyCode || evt.which;
            var charStr = String.fromCharCode(charCode); // The string of the character
            charStr = charStr.toLowerCase()

            if (activeKeys.includes(charStr) != true) {

                  activeKeys.push(charStr)

            }
            checkIfResultWasFound(globalPlayerData, activeKeys)

            console.log(activeKeys)
            checkWinner();
      }
};

function setWinnerText(whoWon){
  $("#winner-name").text(whoWon);
  $("#winnerModal").modal("toggle")
}

function resetGame() {
      
      roundNumber += 1

      $("#p1-score-keys").text(globalPlayerScores['player1']);
      $("#p2-score-keys").text(globalPlayerScores['player2']);

      globalPlayerData = generate_keys(numberOfKeysToPress);
      globalPlayerData["player1"]["result"] = null
      globalPlayerData["player2"]["result"] = null

      displayKeys(globalPlayerData)

      whoWon = null
}

function checkWinner() {
      
      console.log(globalPlayerData)
      if (globalPlayerData["player1"]["result"] != null && globalPlayerData["player2"]["result"] != null) {
            whoWon = winner(globalPlayerData["player1"]["result"], globalPlayerData["player2"]["result"])
            console.log("Winner: " + whoWon)
            setWinnerText(whoWon)

            if (whoWon == "player1") {
                  globalPlayerScores["player1"] += 1
            }
            if (whoWon == "player2") {
                  globalPlayerScores["player2"] += 1
            }
            if (whoWon != "draw") {
                  numberOfKeysToPress += 1
            }

            resetGame()

      }
}


if (debug) {
      result = generate_keys(numberOfKeysToPress);
      // console.log(result);
      // console.log(JSON.stringify(result, null, 4));

      result = winner(rock, scissors);
      result = winner(rock, scissors);
      // console.log(result);
      result = winner(scissors, rock);
      // console.log(result);
}
