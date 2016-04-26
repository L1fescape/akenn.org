'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import _ from 'lodash';

var people = [{
  name: 'Tasha',
  picture: 'https://avatars2.githubusercontent.com/u/1341486?v=3&s=460'
}, {
  name: 'Andrew',
  picture: 'https://avatars2.githubusercontent.com/u/405000?v=3&s=460'
}];

var Card = React.createClass({
  getInitialState: function () {
    return {
      color: '#EFECCA'
    };
  },

  getDefaultProps: function() {
    return {
      info: {
        name: '',
        picture: null
      }
    }
  },

  onMouseOver: function() {
    this.setState({
      color: '#E6E2AF'
    });
  },

  onMouseOut: function() {
    this.setState(this.getInitialState());
  },

  render: function() {
    var info = this.props.info;
    var style = { backgroundColor: this.state.color };

    return (
      <div className="card" onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} style={style}>
        <div className="name"><h3>{info.name}</h3></div>
        <div className="content">
          { info.picture && <img src={info.picture} /> }
        </div>
      </div>
    );
  }
});

var Page = React.createClass({
  getDefaultProps: function() {
    return {
      people: []
    };
  },

  render: function() {
    return (
      <div className="conainer">
        {this.props.people.map(function(person) {
          return <Card key={person.name} info={person} />
        })}
      </div>
    );
  }
});

ReactDom.render(<Page people={people} />, document.getElementById('app'));
