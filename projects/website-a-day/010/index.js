'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import raf from 'raf';
import _ from 'lodash';

const Page = React.createClass({
  getInitialState: function() {
    return {
      installing: false,
      progress: 0
    };
  },

  handleClick: function() {
    if (this.state.installing) {
      return;
    }

    this.setState({
      installing: true,
      progress: 0
    });

    raf(this.progress);
  },

  progress: function() {
    if (!this.state.installing || this.state.progress >= 100) {
      this.setState({
        installing: false
      });
      return;
    }

    this.setState({
      progress: ++this.state.progress
    });

    raf(this.progress);
  },

  render: function() {
    let isInstalling = this.state.installing;
    let text = isInstalling ? 'Installing' : 'Install';
    let style = {
      width: this.state.progress + '%'
    };

    return (
      <button onClick={this.handleClick}
              className={ isInstalling && "installing" }>
        { text }
        <div className="progress" style={style}></div>
      </button>
    );
  }
});

ReactDom.render(<Page />, document.getElementById('app'));
