'use strict';

import Reflux from 'reflux';

import GameActions from '../actions/game';

var currentPlayer = ['x', 'o']
var playing = true;

var GameStore = Reflux.createStore({
  listenables: GameActions,

  getInitialState: function() {
    this.board = [ '', '', '', '', '', '', '', '', '' ];
    return this.board;
  },

  onPlayPiece: function(position) {
    if (playing && !this.board[position]) {
      this.board[position] = currentPlayer[0];
      currentPlayer.push(currentPlayer.shift());
      this.trigger(this.board);
      this.checkWin();
    }
  },

  checkWin: function() {
    var winningPlayer;

    // the worst tic tac toe win checker in existence

    // check diag
    if ((this.board[0] === this.board[4]) && (this.board[4] === this.board[8])) {
      winningPlayer = this.board[0];
    } else if ((this.board[2] === this.board[4]) && (this.board[4] === this.board[6])) {
      winningPlayer = this.board[2];
    }
    // check rows
    else if ((this.board[0] === this.board[1]) && (this.board[1] === this.board[2])) {
      winningPlayer = this.board[0];
    } else if ((this.board[3] === this.board[4]) && (this.board[4] === this.board[5])) {
      winningPlayer = this.board[3];
    } else if ((this.board[6] === this.board[7]) && (this.board[7] === this.board[8])) {
      winningPlayer = this.board[6];
    }
    // check cols
    else if ((this.board[0] === this.board[3]) && (this.board[3] === this.board[6])) {
      winningPlayer = this.board[0];
    } else if ((this.board[1] === this.board[4]) && (this.board[4] === this.board[7])) {
      winningPlayer = this.board[1];
    } else if ((this.board[2] === this.board[5]) && (this.board[5] === this.board[8])) {
      winningPlayer = this.board[2];
    }

    if (winningPlayer) {
      GameActions.gameOver(winningPlayer);
    }
  },

  onGameOver: function() {
    playing = false;
  },

});

module.exports = GameStore;
