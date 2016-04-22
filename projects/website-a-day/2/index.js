'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import _ from 'lodash';

const colors = [
  '#8B61FF',
  '#58DCE8',
  '#FF756E',
  '#FFDD85',
  '#63BF84'
];

class Page extends React.Component {
  componentDidMount() {
    var node = ReactDom.findDOMNode(this);
    _.each(node.childNodes, function(child) {
      child.style.backgroundColor = colors[0];
      colors.push(colors.shift());
    });
  }

  render() {
    const numBoxes = 60;
    return (
      <div>
        {
          _.times(numBoxes, function(i) {
            return <div key={i} className="box"></div>;
          }) 
        }
      </div>
    );
  }
}

ReactDom.render(<Page />, document.getElementById('app'));
