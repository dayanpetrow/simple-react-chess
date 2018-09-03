import React, { Component } from "react";
import { initBoard, leftSide, bottomSide } from "../utils/initBoard";
import { getPosition, getColour, stringifyCoords, getName } from "../utils/getters";
import displayPiece from "../utils/displayPiece";
import { makeMove, makeRandomMove } from "../utils/makeMove";
import getMoves from '../utils/getMoves';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: initBoard,
            selected: [],
            available_moves: [],
            bot: false
        }
    }

    selectPiece(board, rindex, findex) {
        let piece = board[rindex][findex];
        let colour = getColour(piece);
        let haveSelected = this.state.selected.length === 0 ? false : true;

        //do nothing if clicking on an empty field when there is no previous selection
        if(colour === -1 && !haveSelected) {
            console.log('Empty field and no previous selection!');
            return;
        }

        if(!haveSelected) { //select a piece to be moved
            console.log('Select piece: ' + getName(piece) + ' at ' + getPosition(rindex, findex));
            let moves = getMoves(board, rindex, findex);
            this.setState({
                    selected: [rindex, findex],
                    available_moves: moves
                }, () => console.log(this.state)
            );
            
        } else {
            let [old_row, old_field] = this.state.selected;

            //if selecting the same piece on the board, deselect it
            if(old_row === rindex && old_field === findex) {
                console.log('Deselect piece: ' + getName(board[old_row][old_field]) + ' at ' + getPosition(old_row, old_field));
                this.setState({ selected: [], available_moves: [] });
                return;
            }

            //make move
            if(this.state.available_moves.includes(stringifyCoords(rindex, findex))) {
                if(board[rindex][findex] === 'K' || board[rindex][findex] === 'k') {
                    console.log('WIN');
                }
                let new_board = makeMove(old_row, old_field, rindex, findex, board);
                this.setState({
                        board: new_board,
                        selected: [], 
                        available_moves: []
                    }, () => {
                        if(this.state.bot) {
                            console.log('random move');
                            let random = this.state.board;
                            this.setState({
                                board: makeRandomMove(0, random)
                            });
                        }
                    }
                 );
            } else {
                console.log('Invalid move!');
            }
        }
    }

  render() {
      let keys = 0;
      let { board, available_moves, selected } = this.state;
    return (
      <div className="App">
        <table className="board">
            <tbody>
                {initBoard.map((row, rindex) => {
                let white_row = rindex%2 === 0 ? false : true;
                let white_field = !white_row;
                return (
                    <tr className="row" key={rindex}>
                    <td className="left_label">{leftSide[rindex]}</td>
                    {
                        row.map((field, findex) => {
                            white_field = !white_field;
                            let bg = white_field ? " white" : " black";
                            let available_move = available_moves.includes(stringifyCoords(rindex, findex)) ? ' available' : '';
                            let select = selected.length !== 0 && selected[0] === rindex && selected[1] === findex ? ' selected' : '';
                            return (
                                <td key={keys++}><button draggable className={"field" + bg + available_move + select} 
                                    onClick={() => this.selectPiece(board, rindex, findex)}> {displayPiece(field)} </button></td>
                            )
                        })
                    }
                    </tr>
                );
                })}
                <tr className="bottomSide">
                {bottomSide.map(bottom_label => {
                    return <td className="bottom_label" key={bottom_label}>{bottom_label}</td>;
                })}
                </tr>
            </tbody>
        </table>
      </div>
    );
  }
}

export default Board;
