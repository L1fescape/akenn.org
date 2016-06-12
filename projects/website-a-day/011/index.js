'use strict';

import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';
import _ from 'lodash';
import {
  createStore,
  combineReducers
} from 'redux'
import {
  connect,
  Provider
} from 'react-redux'

// Reducers
function codeReducer(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_CODE':
      return {
        code: action.code
      };
    default:
      return state;
  }
}

// Actions
const updateCode = (code) => {
  return {
    type: 'UPDATE_CODE',
    code: code
  };
};

// Stores
let store = createStore(codeReducer)

//
const mapStateToProps = (state) => {
  return {
    code: state.code || ''
  }
}

// Components
let JSEditor = ({ dispatch }) => {
  return (
    <textarea
      onChange={(e) => {
        dispatch(updateCode(e.target.value))
      }}>
    </textarea>
  );
}

JSEditor = connect()(JSEditor);

let Renderer = React.createClass({
  propTypes: {
    code: PropTypes.string.isRequired
  },

  componentDidUpdate: function() {
    let document = this.refs.iframe.contentWindow.document;
    let oldScript = document.getElementById('code');
    oldScript.parentNode.removeChild(oldScript);
    document.appendChild(this.createScript(this.props.code));
  },

  createScript: function(code) {
    let script = document.createElement('script');
    script.id = 'code';
    script.src = code || '';
    return script;
  },

  render: function() {
    return (
      <iframe sandbox="allow-scripts allow-same-origin" id="sandboxed" ref="iframe"></iframe>
    );
  }
});

Renderer = connect(mapStateToProps)(Renderer);

const Page = React.createClass({
  render: function() {
    return (
      <Provider store={store}>
        <div>
          <JSEditor />
          <Renderer />
        </div>
      </Provider>
    );
  }
});

ReactDom.render(<Page />, document.getElementById('app'));
