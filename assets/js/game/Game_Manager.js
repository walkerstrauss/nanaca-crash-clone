var Game_Manager = {
  bestRecord: 0,
  currentState: 'MAIN_MENU',

  gameStates: {
    MAIN_MENU: 'MAIN_MENU',
    METER: 'METER',
    RUNNING: 'RUNNING',
    OVER: 'OVER'
  },

  init: function () {
    this.currentState = this.gameStates.MAIN_MENU;
    this.setupEventListeners();
    this.updateDisplay();
  },

  setupEventListeners: function () {
    document.getElementById("start-game-btn").addEventListener("click", this.startGame.bind(this));
    document.getElementById("restart-game-btn").addEventListener("click", this.startGame.bind(this));
    document.getElementById("main-menu-btn").addEventListener("click", this.showMainMenu.bind(this));
  },

  startGame: function () {
    this.game = Object.create(Game);
    this.game.run();
    this.currentState = this.gameStates.METER;
    this.updateDisplay();
  },

  startRun: function () {
    if (this.game.meter.launched) {
      this.currentState = this.gameStates.RUNNING;
      this.updateDisplay();
    }
  },

  showMainMenu: function () {
    this.currentState = this.gameStates.MAIN_MENU;
    this.updateDisplay();
  },

  gameOver: function () {
    this.currentState = this.gameStates.OVER;
    this.updateDisplay();
  },

  updateDisplay: function () {
    switch (this.currentState) {
      case this.gameStates.MAIN_MENU:
        document.getElementById("main-menu").style.display = "block";
        document.getElementById("stage").style.display = "none";
        document.getElementById("game-over-menu").style.display = "none";
        break;
      case this.gameStates.METER:
        document.getElementById("main-menu").style.display = "none";
        document.getElementById("stage").style.display = "block";
        document.getElementById("launch-ui").style.display = "flex";
        document.getElementById("game-over-menu").style.display = "none";
        document.getElementById("miniicons").style.display = "none";
        break;
      case this.gameStates.RUNNING:
        document.getElementById("main-menu").style.display = "none";
        document.getElementById("stage").style.display = "block";
        document.getElementById("launch-ui").style.display = "none";
        document.getElementById("game-over-menu").style.display = "none";
        // document.getElementById("miniicons").style.display = "flex";
        break;
      case this.gameStates.OVER:
        document.getElementById("main-menu").style.display = "none";
        document.getElementById("stage").style.display = "none";
        document.getElementById("game-over-menu").style.display = "block";
        break;
      default:
        break;
    }
  }
};
