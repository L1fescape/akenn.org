'use strict';

import React from 'react';

import NoteActions from '../actions/note';

var Form = React.createClass({
  getInitialState: function() {
    return {
      title: '',
      text: '',
      time: null
    };
  },

  onSubmit: function(evt) {
    evt.preventDefault();

    NoteActions.addNote(this.state.title, this.state.text);

    return false;
  },

  onTitleChange: function(evt) {
    var value = evt.target.value;
    this.setState({
      title: value
    });
  },

  onTextChange: function(evt) {
    var value = evt.target.value;
    this.setState({
      text: value
    });
  },

  render: function() {
    return (
      <form>
        <h3>Add a Note</h3>
        <div className="field">
          <label for="title">Title</label>
          <input name="title" value={this.state.title} onChange={this.onTitleChange} />
        </div>

        <div className="field">
          <label for="text">Note</label>
          <textarea name="text" value={this.state.text} onChange={this.onTextChange}></textarea>
        </div>

        <div className="field">
          <button type="submit" onClick={this.onSubmit}>Submit</button>
        </div>
      </form>
    );
  }
});

module.exports = Form;
