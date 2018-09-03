import { getColour, stringifyCoords } from './getters';

//COLOURS:
const BLACK = 0, WHITE = 1;

export default function getMoves(board, rindex, findex) {
    let piece = board[rindex][findex];
    switch(piece) {
        case 'P':
            return black_pawn(board, rindex, findex);
        case 'p':
            return white_pawn(board, rindex, findex);
        case 'N':
            return knight(BLACK, board, rindex, findex);
        case 'n':
            return knight(WHITE, board, rindex, findex);
        case 'B':
            return bishop(BLACK, board, rindex, findex);
        case 'b':
            return bishop(WHITE, board, rindex, findex);
        case 'R':
            return rook(BLACK, board, rindex, findex);
        case 'r':
            return rook(WHITE, board, rindex, findex);
        case 'Q':
            return rook(BLACK, board, rindex, findex).concat(bishop(BLACK, board, rindex, findex));
        case 'q':
            return rook(WHITE, board, rindex, findex).concat(bishop(WHITE, board, rindex, findex));
        case 'K':
            return king(BLACK, board, rindex, findex);
        case 'k':
            return king(WHITE, board, rindex, findex);
        default:
            return ['00','11','22'];
    }
}

function isOutOfRange(new_row, new_field) {
    return new_row < 0 || new_row > 7 || new_field < 0 || new_field > 7;
}

function isEmpty(to_value) {
    return to_value === ' ';
}

function isTaking(player_colour, to_value) {
    return player_colour !== getColour(to_value);
}

function black_pawn(board, rindex, findex) {
    let moves = [];
    let blocked = false;
    !isOutOfRange(rindex+1, findex) && isEmpty(board[rindex+1][findex])
        ? moves.push(stringifyCoords(rindex+1, findex))
        : blocked = true;

    !blocked && rindex === 1 && isEmpty(board[rindex+2][findex]) && !isOutOfRange(rindex+2, findex)
        ? moves.push(stringifyCoords(rindex+2, findex))
        : blocked = true;
    
    if(!isOutOfRange(rindex+1, findex+1) && !isEmpty(board[rindex+1][findex+1]) && isTaking(0, board[rindex+1][findex+1])) {
        moves.push(stringifyCoords(rindex+1, findex+1));
    }
    
    if(!isOutOfRange(rindex+1, findex-1) && !isEmpty(board[rindex+1][findex-1]) && isTaking(0, board[rindex+1][findex-1])) {
        moves.push(stringifyCoords(rindex+1, findex-1));
    }
    
    return moves;
}

function white_pawn(board, rindex, findex) {
    let moves = [];
    let blocked = false;
    !isOutOfRange(rindex-1, findex) && isEmpty(board[rindex-1][findex])
        ? moves.push(stringifyCoords(rindex-1, findex))
        : blocked = true;

    rindex === 6 && !blocked && isEmpty(board[rindex-2][findex]) && !isOutOfRange(rindex-2, findex)
        ? moves.push(stringifyCoords(rindex-2, findex))
        : blocked = true;
    
    if(!isOutOfRange(rindex-1, findex+1) && !isEmpty(board[rindex-1][findex+1]) && isTaking(1, board[rindex-1][findex+1])) {
        moves.push(stringifyCoords(rindex-1, findex+1));
    }
    
    if(!isOutOfRange(rindex-1, findex-1) && !isEmpty(board[rindex-1][findex-1]) && isTaking(1, board[rindex-1][findex-1])) {
        moves.push(stringifyCoords(rindex-1, findex-1));
    }
    
    return moves;
}

function knight(player_colour, board, ri, fi) {
    let positions = [
        [ri + 2, fi - 1], [ri + 2, fi + 1],
        [ri + 1, fi - 2], [ri + 1, fi + 2],
        [ri - 1, fi - 2], [ri - 1, fi + 2],
        [ri - 2, fi - 1], [ri - 2, fi + 1]
    ].filter(pos => 
        !isOutOfRange(pos[0],pos[1]) && (isEmpty(board[pos[0]][pos[1]]) || isTaking(player_colour, board[pos[0]][pos[1]]))
    );
    return positions.map(pos => stringifyCoords(pos[0], pos[1]));
}

function bishop(player_colour, board, ri, fi) {
    let moves = [];
    let left_positive = false, left_negative = false, right_negative = false, right_positive = false;
    let r = ri, f = fi;
    while(!right_positive) {
        ++r; ++f;
        if(!isOutOfRange(r,f)) {
            if(isEmpty(board[r][f])) {
                moves.push(stringifyCoords(r,f));
            } else if(isTaking(player_colour, board[r][f])) {
                moves.push(stringifyCoords(r,f));
                right_positive = true;
            } else {
                right_positive = true;
            }

        } else {
            right_positive = true;
        }
    }

    r = ri; f = fi;
    while(!right_negative) {
        --r; ++f;
        if(!isOutOfRange(r,f)) {
            if(isEmpty(board[r][f])) {
                moves.push(stringifyCoords(r,f));
            } else if(isTaking(player_colour, board[r][f])) {
                moves.push(stringifyCoords(r,f));
                right_negative = true;
            } else {
                right_negative = true;
            }

        } else {
            right_negative = true;
        }
    }

    r = ri; f = fi;
    while(!left_negative) {
        --r; --f;
        if(!isOutOfRange(r,f)) {
            if(isEmpty(board[r][f])) {
                moves.push(stringifyCoords(r,f));
            } else if(isTaking(player_colour, board[r][f])) {
                moves.push(stringifyCoords(r,f));
                left_negative = true;
            } else {
                left_negative = true;
            }

        } else {
            left_negative = true;
        }
    }

    r = ri; f = fi;
    while(!left_positive) {
        ++r; --f;
        if(!isOutOfRange(r,f)) {
            if(isEmpty(board[r][f])) {
                moves.push(stringifyCoords(r,f));
            } else if(isTaking(player_colour, board[r][f])) {
                moves.push(stringifyCoords(r,f));
                left_positive = true;
            } else {
                left_positive = true;
            }

        } else {
            left_positive = true;
        }
    }


    return moves;
}

function rook(player_colour, board, ri, fi) {
    let moves = [];
    let left = false, right = false, up = false, down = false;
    let r = ri, f = fi;
    while(!down) {
        ++r;
        if(!isOutOfRange(r,f)) {
            if(isEmpty(board[r][f])) {
                moves.push(stringifyCoords(r,f));
            } else if(isTaking(player_colour, board[r][f])) {
                moves.push(stringifyCoords(r,f));
                down = true;
            } else {
                down = true;
            }

        } else {
            down = true;
        }
    }

    r = ri; f = fi;
    while(!up) {
        --r;
        if(!isOutOfRange(r,f)) {
            if(isEmpty(board[r][f])) {
                moves.push(stringifyCoords(r,f));
            } else if(isTaking(player_colour, board[r][f])) {
                moves.push(stringifyCoords(r,f));
                up = true;
            } else {
                up = true;
            }

        } else {
            up = true;
        }
    }

    r = ri; f = fi;
    while(!left) {
        --f;
        if(!isOutOfRange(r,f)) {
            if(isEmpty(board[r][f])) {
                moves.push(stringifyCoords(r,f));
            } else if(isTaking(player_colour, board[r][f])) {
                moves.push(stringifyCoords(r,f));
                left = true;
            } else {
                left = true;
            }

        } else {
            left = true;
        }
    }

    r = ri; f = fi;
    while(!right) {
        ++f;
        if(!isOutOfRange(r,f)) {
            if(isEmpty(board[r][f])) {
                moves.push(stringifyCoords(r,f));
            } else if(isTaking(player_colour, board[r][f])) {
                moves.push(stringifyCoords(r,f));
                right = true;
            } else {
                right = true;
            }

        } else {
            right = true;
        }
    }
    
    return moves;
}

function king(player_colour, board, ri, fi) {
    let moves = [];
    for(let i = ri - 1; i <= ri + 1; i++) {
        for(let j = fi - 1; j <= fi + 1; j++) {
            if(!isOutOfRange(i,j)) {
                if(isEmpty(board[i][j])) {
                    moves.push(stringifyCoords(i,j));
                } else if(isTaking(player_colour, board[i][j])) {
                    moves.push(stringifyCoords(i,j));
                }
            }
        }
    }
    return moves;    
}