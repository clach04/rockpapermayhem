
const debug=false;
//const debug=true;
const rock='rock';
const paper='paper';
const scissors='scissors';
const player1='player1';
const player2='player2';
const draw='draw';

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
    var result={
        'player1': {
                rock: ['b'],
                paper: ['n'],
                scissors: ['m']
        },
        'player2': {
                rock: ['1'],
                paper: ['2'],
                scissors: ['3']
        }
    };

    //console.log(result);
    return result;
}

if (debug){
    result = generate_keys();
    console.log(result);
    console.log(JSON.stringify(result, null, 4));

    result = winner(rock, scissors);
    result = winner(rock, scissors);
    console.log(result);
    result = winner(scissors, rock);
    console.log(result);
}
