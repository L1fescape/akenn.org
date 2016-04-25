'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import Reflux from 'reflux';
import _ from 'lodash';

import GameStore from './stores/game';
import GameActions from './actions/game';

var Piece = React.createClass({
  onClick: function(e) {
    var node = e.target;
    var position = Array.prototype.indexOf.call(node.parentNode.childNodes, node);
    GameActions.playPiece(position);
  },

  render: function() {
    return (
      <div className="piece" onClick={this.onClick}>
        { this.props.type }
      </div>
    );
  }
});

var Board = React.createClass({
  mixins: [Reflux.connect(GameStore, 'board')],

  render: function() {
    return (
      <div className="board">
        {this.state.board.map(function(piece, i) {
          return <Piece key={i} type={piece} />
        })}
      </div>
    );
  }
});

ReactDom.render(<Board />, document.getElementById('app'));
