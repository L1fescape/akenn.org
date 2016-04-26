'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import _ from 'lodash';

var people = [{
  name: 'Tasha',
  picture: 'https://avatars2.githubusercontent.com/u/1341486?v=3&s=460',
  attacks: [{
    name: 'Straight Fire',
    desc: 'Drops a mixtape to burn all opponents instantly',
    dmg: 100
  },{
    name: 'Push and Shove',
    desc: 'Hustle 9 to 5, you\'re gonna have to survive. Go hard go hard go hard go hard.',
    dmg: 95
  }]
}, {
  name: 'Andrew',
  picture: 'https://avatars2.githubusercontent.com/u/405000?v=3&s=460',
  attacks: [{
    name: 'Kickflip',
    desc: 'Shoots out a fireball for massive burn damage',
    dmg: 80
  },{
    name: 'Wall Bang',
    desc: 'Hits enemies through walls for reduced damage',
    dmg: 40
  }]
}];

var Attack = React.createClass({
  render: function() {
    var attack = this.props.attack;

    return (
      <div>
        <h4>{attack.name}</h4>
        {attack.desc} - <strong>{attack.dmg}</strong>
      </div>
    );
  }
});

var Card = React.createClass({
  getInitialState: function () {
    return {
      flipped: false
    };
  },

  onMouseOver: function() {
    this.setState({
      flipped: true
    });
  },

  onMouseOut: function() {
    this.setState(this.getInitialState());
  },

  render: function() {
    let info = this.props.info;
    let className = 'card';
    if (this.state.flipped) {
      className += ' flipped';
    }
    return (
      <div className={className} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
        <div className="container">
          <div className="front">
            <div className="name"><h3>{info.name}</h3></div>
            <div className="content">
              { info.picture && <img src={info.picture} /> }
            </div>
          </div>
          <div className="back">
            <h4>Attacks</h4>
            <div className="stats">
              { info.attacks.map(function(attack) {
                  return <Attack attack={attack} />
                })
              }
            </div>
          </div>
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
