'use strict';

import React from 'react';
import Reflux from 'reflux';

import Note from './note';

import NoteStore from '../stores/note';

var NoteList = React.createClass({
  mixins: [Reflux.connect(NoteStore, 'notes')],

  render: function() {
    return (
      <div className="notes">
        <h3>Notes</h3>
        <ul>
          {this.state.notes.map(function(note) {
            return <Note key={note.time} note={note} />;
          })}
        </ul>
      </div>
    );
  }
});

module.exports = NoteList;
