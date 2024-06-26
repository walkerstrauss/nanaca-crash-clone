AssetLoader.queueImage("../assets/img/sprites/miniicon/baseball_miniicon.png", "baseball");
AssetLoader.queueImage("../assets/img/sprites/miniicon/micheal_miniicon.png", "micheal");
AssetLoader.queueImage("../assets/img/sprites/miniicon/peroni_miniicon.png", "peroni");
AssetLoader.queueImage("../assets/img/sprites/miniicon/two_miniicon.png", "two");

var Specials = Entity.extend({
  currentIcon: 1,
  currentType: "",
  lastHitType: "",

  constructor: function () {
    this.currentIcon = 1;
  },

  update: function () {
    this.drawIcon();
  },

  drawIcon: function () {

  },

  drawText: function () {

  },
});