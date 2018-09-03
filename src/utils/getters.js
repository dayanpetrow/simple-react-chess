import { leftSide, bottomSide } from "./initBoard";

//COLOURS:
const BLACK = 0,
  WHITE = 1,
  EMPTY = -1;

export function getPosition(row, field) {
  return [leftSide[row], bottomSide[field + 1]];
}

export function getColour(piece) {
  switch (true) {
    case "rnbqkp".includes(piece):
      return WHITE;
    case "RNBQKP".includes(piece):
      return BLACK;
    default:
      return EMPTY;
  }
}

export function colourString(colour_code) {
  switch (colour_code) {
    case -1:
      return "Empty field!";
    case 0:
      return "Black";
    default:
      return "White";
  }
}

export function stringifyCoords(rindex, findex) {
  return rindex.toString() + findex.toString();
}

export function getName(piece) {
  switch (piece) {
    case "P":
      return "Black Pawn";
    case "p":
      return "White Pawn";
    case "R":
      return "Black Rook";
    case "r":
      return "White Rook";
    case "N":
      return "Black Knight";
    case "n":
      return "White Knight";
    case "B":
      return "Black Bishop";
    case "b":
      return "White Bishop";
    case "Q":
      return "Black Queen";
    case "q":
      return "White Queen";
    case "K":
      return "Black King";
    case "k":
      return "White King";
    default:
      return "Empty field?";
  }
}