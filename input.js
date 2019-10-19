// var playerData = {
//     "player1": {
//         "rock": ["a", "b"],
//         "paper": ["f", "t"],
//         "scissors": ["m", "w"],
//         "result": null
//     },
//     "player2": {
//         "rock": ["e", "s"],
//         "paper": ["p", "z"],
//         "scissors": ["n", "j"],
//         "result": null
//     }
// }

activeKeys = []

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

    if (checkOnePair(playerData["player1"]["rock"],activeKeys) == true) {
        playerData["player1"]["result"] = "rock"
        alert("Player 1 has chosen Rock")
        return true
    }

    if (checkOnePair(playerData["player1"]["paper"],activeKeys) == true) {
        playerData["player1"]["result"] = "paper"
        alert("Player 1 has chosen Paper")
        return true
    }

    if (checkOnePair(playerData["player1"]["scissors"],activeKeys) == true) {
        playerData["player1"]["result"] = "scissors"
        alert("Player 1 has chosen Scissors")
        return true
    }

    if (checkOnePair(playerData["player2"]["rock"],activeKeys) == true) {
        playerData["player2"]["result"] = "rock"
        alert("Player 2 has chosen Rock")
        return true
    }

    if (checkOnePair(playerData["player2"]["paper"],activeKeys) == true) {
        playerData["player2"]["result"] = "paper"
        alert("Player 2 has chosen Paper")
        return true
    }

    if (checkOnePair(playerData["player2"]["scissors"],activeKeys) == true) {
        playerData["player2"]["result"] = "scissors"
        alert("Player 2 has chosen Scissors")
        return true
    }

    return false

}

document.onkeypress = function (evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);
    activeKeys.push(charStr)
    var toTest = playerData["player1"]["rock"]
    console.log("toTest: " + toTest)
    console.log("activeKeys: " + activeKeys)
    console.log("Result found: " + checkIfResultWasFound(playerData,activeKeys))
};