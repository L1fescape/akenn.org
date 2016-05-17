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
function code(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_CODE':
      return [
        ...state,
        Object.assign({}, state, {
          code: action.code
        })
      ];
    default:
      return state;
  }
}

// Actions
const updateCode = (code) => {
  console.log(code);
  return {
    type: 'UPDATE_CODE',
    code
  };
};

// Stores
let store = createStore(combineReducers({code}))

//
const mapStateToProps = (state = { code: '' }) => {
  console.log(state);
  return {
    code: ''
  }
}

// Components
let JSEditor = ({ dispatch }) => {
  function handleChange(e) {
    dispatch(updateCode(e.target.value))
  }

  return (
    <textarea
      onChange={handleChange}>
    </textarea>
  );
}

JSEditor = connect()(JSEditor)

let Renderer = ({ code }) => {
  console.log(code);
  return (
    <div>
      { code }
    </div>
  );
}

Renderer.propTypes = {
  code: PropTypes.string.isRequired
};

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
