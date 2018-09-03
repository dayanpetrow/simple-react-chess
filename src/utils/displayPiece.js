import React from "react";

export default function displayPiece(piece) {
  switch (piece) {
    case "P":
      return <i className="fas fa-chess-pawn black-piece" />;
    case "p":
      return <i className="fas fa-chess-pawn white-piece" />;
    case "R":
      return <i className="fas fa-chess-rook black-piece" />;
    case "r":
      return <i className="fas fa-chess-rook white-piece" />;
    case "N":
      return <i className="fas fa-chess-knight black-piece" />;
    case "n":
      return <i className="fas fa-chess-knight white-piece" />;
    case "B":
      return <i className="fas fa-chess-bishop black-piece" />;
    case "b":
      return <i className="fas fa-chess-bishop white-piece" />;
    case "Q":
      return <i className="fas fa-chess-queen black-piece" />;
    case "q":
      return <i className="fas fa-chess-queen white-piece" />;
    case "K":
      return <i className="fas fa-chess-king black-piece" />;
    case "k":
      return <i className="fas fa-chess-king white-piece" />;
    default:
      return <span>&nbsp;</span>;
  }
}
