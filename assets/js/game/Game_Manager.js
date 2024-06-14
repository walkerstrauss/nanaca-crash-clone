var Game_Manager = Base.extend({
  game: null,
  currentState: 'INIT',

  gameStates: {
    INIT: 'START',
    MAIN_MENU: 'MAIN_MENU',
    METER: 'METER',
    RUNNING: 'RUNNING',
    STOPPED: 'STOPPED',
    OVER: 'OVER'
  },

  constructor: function () {
    this.currentState = 'INIT';
    this.setupEventListeners();
    this.updateDisplay();
  },

  setupEventListeners: function () {

  },

  updateDisplay: function () {

  }
});
