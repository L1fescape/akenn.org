'use strict';

import Reflux from 'reflux';

import NoteActions from '../actions/note';

let localStorageKey = 'notes';

var NoteStore = Reflux.createStore({
  listenables: [NoteActions],

  onAddNote: function(title, text) {
    this.updateNotes([{
      title: title,
      text: text,
      time: new Date()
    }].concat(this.notes));
  },

  updateNotes: function(notes){
    localStorage.setItem(localStorageKey, JSON.stringify(notes));
    this.notes = notes;
    this.trigger(notes);
  },

  getInitialState: function() {
    var loadedNotes = localStorage.getItem(localStorageKey);

    if (!loadedNotes) {
        this.notes = [];
    } else {
      this.notes = JSON.parse(loadedNotes);
    }

    return this.notes;
  }
});

module.exports = NoteStore;
