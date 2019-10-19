
const debug=false;
const rock='rock';
const paper='paper';
const scissor='scissor';
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
                    case scissor: return player1;
                          break;
                }
                break;

        case paper:
                switch (player2_move) {
                    case rock: return player1;
                          break;
                    case paper: return draw;
                          break;
                    case scissor: return player2;
                          break;
                }
                break;
        case scissor:
                switch (player2_move) {
                    case rock: return player2;
                          break;
                    case paper: return player1;
                          break;
                    case scissor: return draw;
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
                scissor: ['m']
        },
        'player2': {
                rock: ['1'],
                paper: ['2'],
                scissor: ['3']
        }
    };

    //console.log(result);
    return result;
}

if (debug){
    result = generate_keys();
    console.log(result);
    console.log(JSON.stringify(result, null, 4));

    result = winner(rock, scissor);
    result = winner(rock, scissor);
    console.log(result);
    result = winner(scissor, rock);
    console.log(result);
}
