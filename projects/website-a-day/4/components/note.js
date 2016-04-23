'use strict';

import React from 'react';
import moment from 'moment';

var Note = React.createClass({
  render: function() {
    var info = this.props.note;

    return (
      <div className="note">
        <h4>{info.title} - <span>{moment(info.time).fromNow()}</span></h4>
        <p>
          {info.text}
        </p>
      </div>
    );
  }
});

module.exports = Note;
