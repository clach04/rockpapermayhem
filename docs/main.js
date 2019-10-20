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
      player1: 0,
      player2: 0
}

var numberOfKeysToPress = 1
var roundNumber = 1;

function startNextRound(){
  $("#winnerModal").modal("toggle");
  setRoundNumber(roundNumber)

  countdownTimer();
}

// set keys and start countdown timer; calls display keys to display keys when
// timer hits 0
function countdownTimer() {
  $("#countdownModal").modal("toggle")
      // TODO blank out key display? or leave old ones there?
  globalPlayerData = generate_keys(numberOfKeysToPress);  // TODO this is called twice (once too many, per round)
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
      // resets timer value so it shows up properly the next time the timer is displayed
      setTimerValue('Get ready.......')
}

function setTimerValue(value) {
      $("#countdown-timer-value").text(value);
}

function clearCounter() {
      counter = clearInterval(counter);
}

function format_keys_for_display(key_array) {
      return '<kbd>' + key_array.join('</kbd> <kbd>') + '</kbd>';
}

function displayKeys(keys) {

      $("#p1-rock-keys").html(format_keys_for_display(keys[player1][rock]));
      $("#p2-rock-keys").html(format_keys_for_display(keys[player2][rock]));
      $("#p1-scissors-keys").html(format_keys_for_display(keys[player1][scissors]));
      $("#p2-scissors-keys").html(format_keys_for_display(keys[player2][scissors]));
      $("#p1-paper-keys").html(format_keys_for_display(keys[player1][paper]));
      $("#p2-paper-keys").html(format_keys_for_display(keys[player2][paper]));
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
            player1: {
                  rock: generateArrayOfCharacters(numberOfResults),
                  paper: generateArrayOfCharacters(numberOfResults),
                  scissors: generateArrayOfCharacters(numberOfResults),
                  "result": null,  // what did player choose? rock, paper, or scissors
                  "time": 0  // time of choice. Date.now(); number of milliseconds since 1970/01/01
            },
            player2: {
                  rock: generateArrayOfCharacters(numberOfResults),
                  paper: generateArrayOfCharacters(numberOfResults),
                  scissors: generateArrayOfCharacters(numberOfResults),
                  "result": null,
                  "time": 0
            }
      };

      return result;
}

$(document).unbind("keydown").keyup(function(e){
    var code = e.which; // recommended to use e.which, it's normalized across browsers
    if(code==13)
    {
        $("#winnerModal #next-round-button").click();
    }
});

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

      if (checkOnePair(playerData[player1][rock], activeKeys) == true) {
            playerData[player1]["result"] = rock
            if (playerData[player1]["time"] == 0) playerData[player1]["time"] = Date.now();
            console.log('p1rock')
      }

      if (checkOnePair(playerData[player1][paper], activeKeys) == true) {
            playerData[player1]["result"] = paper
            if (playerData[player1]["time"] == 0) playerData[player1]["time"] = Date.now();
      }

      if (checkOnePair(playerData[player1][scissors], activeKeys) == true) {
            playerData[player1]["result"] = scissors
            if (playerData[player1]["time"] == 0) playerData[player1]["time"] = Date.now();
      }

      if (checkOnePair(playerData[player2][rock], activeKeys) == true) {
            playerData[player2]["result"] = rock
            if (playerData[player2]["time"] == 0) playerData[player2]["time"] = Date.now();
      }

      if (checkOnePair(playerData[player2][paper], activeKeys) == true) {
            playerData[player2]["result"] = paper
            if (playerData[player2]["time"] == 0) playerData[player2]["time"] = Date.now();
      }

      if (checkOnePair(playerData[player2][scissors], activeKeys) == true) {
            playerData[player2]["result"] = scissors
            if (playerData[player2]["time"] == 0) playerData[player2]["time"] = Date.now();
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
  $("#winner-name").html(whoWon);
  $("#winnerModal").modal("toggle")
}

function setRoundNumber(roundNumber){
  $("#round-number").text(roundNumber)
}



function resetGame() {

      roundNumber += 1
      gameOn = false;

      // TODO generate_keys()  is called twice (once too many, per round)
      globalPlayerData = generate_keys(numberOfKeysToPress); // do not use round number, in case of draws
      $("#player-1-score").text(globalPlayerScores[player1])
      $("#player-2-score").text(globalPlayerScores[player2])
      $("#round").text(roundNumber)

      globalPlayerData[player1]["result"] = null
      globalPlayerData[player2]["result"] = null

      globalPlayerData[player1]["time"] = 0
      globalPlayerData[player2]["time"] = 0

      whoWon = null
}

function checkWinner() {

      console.log(globalPlayerData)
      if (globalPlayerData[player1]["result"] != null && globalPlayerData[player2]["result"] != null) {
            whoWon = winner(globalPlayerData[player1]["result"], globalPlayerData[player2]["result"])
            console.log("Winner: " + whoWon)
            console.log("time info: " + globalPlayerData[player1]["time"] + ' ' + globalPlayerData[player2]["time"])
            //setWinnerText(whoWon)

            var p1changeInScore = 0
            var p2changeInScore = 0

            if (whoWon == "player1") {
                  var symbol = ">"
            }

            if (whoWon == "player2") {
                  var symbol = "<"
            }

            if (whoWon == "draw") {
                  var symbol = "="
            }

            if (whoWon == player1) {
                  globalPlayerScores[player1] += 1
                  p1changeInScore +=1
            }
            if (whoWon == player2) {
                  globalPlayerScores[player2] += 1
                  p2changeInScore +=1
            }
            if (whoWon != draw) {
                  numberOfKeysToPress += 1
            }

            if (globalPlayerData[player1]["time"] > globalPlayerData[player2]["time"]) {

                  globalPlayerScores[player2] += 1
                  p2changeInScore += 1

            }

            else if (globalPlayerData[player2]["time"] > globalPlayerData[player1]["time"]) {

                  globalPlayerScores[player1] += 1
                  p1changeInScore += 1

            }

            setWinnerText("Player 1: +" + p1changeInScore + "<br>Player 2: +" + p2changeInScore)

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
