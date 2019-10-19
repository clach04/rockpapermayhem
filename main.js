
const rock='rock';
const paper='paper';
const scissor='scissor';

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

//result = generate_keys();
//console.log(result);
