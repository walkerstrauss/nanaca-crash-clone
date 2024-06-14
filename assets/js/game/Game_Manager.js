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
    Game_Manager.currentState = Game_Manager.gameStates.MAIN_MENU;
    Game_Manager.setupEventListeners();
    Game_Manager.updateDisplay();
  },

  setupEventListeners: function () {
    document.getElementById("start-game-btn").addEventListener("click", Game_Manager.startGame.bind(Game_Manager));
    document.getElementById("restart-game-btn").addEventListener("click", Game_Manager.startGame.bind(Game_Manager));
    document.getElementById("main-menu-btn").addEventListener("click", Game_Manager.showMainMenu.bind(Game_Manager));
  },

  startGame: function () {
    Game.resetGame();
    Game.run();
    Game_Manager.currentState = Game_Manager.gameStates.METER;
    Game_Manager.updateDisplay();
  },

  startRun: function () {
    if (Game.meter.launched) {
      Game_Manager.currentState = Game_Manager.gameStates.RUNNING;
      Game_Manager.updateDisplay();
    }
  },

  showMainMenu: function () {
    Game_Manager.currentState = Game_Manager.gameStates.MAIN_MENU;
    Game_Manager.updateDisplay();
  },

  gameOver: function () {
    Game_Manager.currentState = Game_Manager.gameStates.OVER;
    Game_Manager.updateDisplay();
  },

  updateDisplay: function () {
    switch (Game_Manager.currentState) {
      case Game_Manager.gameStates.MAIN_MENU:
        document.getElementById("main-menu").style.display = "block";
        document.getElementById("stage").style.display = "none";
        document.getElementById("game-over-menu").style.display = "none";
        break;
      case Game_Manager.gameStates.METER:
        document.getElementById("main-menu").style.display = "none";
        document.getElementById("stage").style.display = "block";
        document.getElementById("launch-ui").style.display = "flex";
        document.getElementById("game-over-menu").style.display = "none";
        document.getElementById("miniicons").style.display = "none";
        break;
      case Game_Manager.gameStates.RUNNING:
        document.getElementById("main-menu").style.display = "none";
        document.getElementById("stage").style.display = "block";
        document.getElementById("launch-ui").style.display = "none";
        document.getElementById("game-over-menu").style.display = "none";
        document.getElementById("miniicons").style.display = "flex";
        break;
      case Game_Manager.gameStates.OVER:
        document.getElementById("main-menu").style.display = "none";
        document.getElementById("stage").style.display = "none";
        document.getElementById("game-over-menu").style.display = "block";
        break;
      default:
        break;
    }
  }
};
