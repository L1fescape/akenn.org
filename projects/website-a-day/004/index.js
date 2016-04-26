'use strict';

import React from 'react';
import ReactDom from 'react-dom';

import NoteList from './components/notelist';
import Form from './components/form';


var Page = React.createClass({
  render: function() {
    return (
      <div>
        <Form />
        <NoteList />
      </div>
    );
  }
});

ReactDom.render(<Page />, document.getElementById('app'));
