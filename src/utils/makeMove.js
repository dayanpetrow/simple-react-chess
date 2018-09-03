import getMoves from './getMoves';
import { getColour } from './getters';

export function makeMove(old_row, old_field, new_row, new_field, board) {
    board[new_row][new_field] = board[old_row][old_field];
    board[old_row][old_field] = ' ';
    return board;
}

export function makeRandomMove(colour, board) {
    let found_piece = false;
    let moves;
    let old_ri, old_fi;
    while(!found_piece) {
        old_ri = getRandomInt(7);
        old_fi = getRandomInt(7);
        let letter = board[old_ri][old_fi];
        if(letter !== ' ' && getColour(letter) === colour && letter === letter.toUpperCase()) {
            moves = getMoves(board, old_ri, old_fi);
            if(moves.length !== 0) {
                found_piece = true;
            } 
        }
    }
    let random_move = moves[getRandomInt(moves.length)]; //eslint-disable-next-line
    let new_ri = parseInt(random_move[0]); //eslint-disable-next-line
    let new_fi = parseInt(random_move[1]);
    return makeMove(old_ri, old_fi, new_ri, new_fi, board);
}


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}