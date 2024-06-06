AssetLoader.queueImage("../assets/img/sprites/miniicon/baseball_miniicon.png", "baseball");
AssetLoader.queueImage("../assets/img/sprites/miniicon/goodkyle_miniicon.png", "goodkyle");
AssetLoader.queueImage("../assets/img/sprites/miniicon/micheal_miniicon.png", "micheal");
AssetLoader.queueImage("../assets/img/sprites/miniicon/peroni_miniicon.png", "peroni");
AssetLoader.queueImage("../assets/img/sprites/miniicon/two_miniicon.png", "two");


var UI_Miniicons = Base.extend({
  kickers: [],
  miniiconImg1: null,
  miniiconImg2: null,
  miniiconImg3: null,
  angleDownColor: "#663417",
  angleUpColor: "#4ce6de",
  blockColor: "#A000A0",
  kickColor: "#0000A0",
  punchColor: "#A0A000",
  stopColor: "#00A000",


  constructor: function () {
    document.getElementById("miniicon-1").style.display = "flex";
    document.getElementById("miniicon-2").style.display = "flex";
    document.getElementById("miniicon-3").style.display = "flex";
  },

  update: function (kickers) {

  },

  animateImages: function (kickers) {

  },

  animateTriangles: function (kickers) {

  }

})