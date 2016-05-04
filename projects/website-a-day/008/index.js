'use strict';

import _ from 'lodash';

var buttons = {
  1: 'green',
  2: 'red',
  3: 'yellow',
  0: 'blue',
  4: 'orange',
  13: 'strumUp',
  14: 'strumDown',
  5: 'starPower',
  6: 'octaveModifier'
};

window.AudioContext = window.AudioContext||window.webkitAudioContext;
var audioCtx = new AudioContext();

// create Oscillator node
var oscillator = audioCtx.createOscillator();
oscillator.type = 'sine';
oscillator.frequency.value = 0; // value in hertz

var gainNode = audioCtx.createGain();
gainNode.gain.value = 0.5;
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);

oscillator.start();

var notes = {
  green: 523,
  red: 587.33,
  yellow: 659.25,
  blue: 698.46,
  orange: 783.99,
  green1: 2093,
  red1: 2349,
  yellow1: 2637,
  blue1: 2793,
  orange1: 3135
};

function playNote(note) {
  oscillator.frequency.value = note && notes[note] ? notes[note] : 0 // value in hertz
}

function getUpdate(gp) {
  var pressedButtons = []
  for (var i = 0; i < gp.buttons.length; i++) {
    var val = gp.buttons[i];
    var pressed = val == 1.0;

    if (typeof(val) == "object") {
      pressed = val.pressed;
      val = val.value;
    }

    if (pressed) {
      pressedButtons.push(buttons[i]);
      console.log('button', buttons[i] ? buttons[i] : i);
    }
  }

  if (pressedButtons.length) {
    if (pressedButtons.indexOf('octaveModifier') > -1) {
      playNote(pressedButtons[0] + '1');
    } else {
      playNote(pressedButtons[0]);
    }
  } else {
    playNote(null);
  }

  requestAnimationFrame(_.partial(getUpdate, gp));
}

window.addEventListener("gamepadconnected", function(e) {
  var gp = navigator.getGamepads()[e.gamepad.index];
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    gp.index, gp.id,
    gp.buttons.length, gp.axes.length);
  getUpdate(gp);
});

