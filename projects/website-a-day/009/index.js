'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import request from 'superagent';
import moment from 'moment';
import _ from 'lodash';

const start = moment().format('YYYY-MM-DD');
const end = start
let apiURL = `https://statsapi.web.nhl.com/api/v1/schedule?startDate=${start}&endDate=${end}&expand=schedule.teams,schedule.linescore,schedule.broadcasts.all,schedule.ticket,schedule.game.content.media.epg,schedule.game.seriesSummary,seriesSummary.series&leaderCategories=&leaderGameTypes=P&site=en_nhl&teamId=`

const GamesList = React.createClass({
  getDefaultProps: function() {
    return {
      games: []
    };
  },

  render: function() {
    return (
      <ul>
      {
        this.props.games.map((game) => {
          return (
            <li key={game.gamePk}>
              {game.teams.home.team.teamName} vs. {game.teams.away.team.teamName} @ {moment(game.gameDate).format('LT')}
            </li>
          );
        })
      }
      </ul>
    );
  }
});

const Page = React.createClass({
  getInitialState: function() {
    return {
      isGameToday: false
    };
  },

  componentDidMount: function() {
    request
      .get(apiURL)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          return console.log(err);
        }

        let dates = res.body && res.body.dates ? res.body.dates : [];
        let games = dates.length >= 1 && dates[0] ? dates[0].games : []

        this.setState({
          games: games
        });
      });
  },

  render: function() {
    let games = this.state.games ? this.state.games : [];

    if (!games.length) {
      return (
        <h2>There are no NHL games today</h2>
      );
    } else if (games.length === 1) {
      return (
        <div>
          <h2>There is a NHL game today</h2>
          <GamesList games={games} />
        </div>
      );
    }

    return (
      <div>
        <h2>There are {games.length} NHL games today</h2>
        <GamesList games={games} />
      </div>
    );
  }
});

ReactDom.render(<Page />, document.getElementById('app'));



