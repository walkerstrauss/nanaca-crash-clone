AssetLoader.queueImage("../assets/img/sprites/uparrow/uparrow_0.png", "up0");
AssetLoader.queueImage("../assets/img/sprites/uparrow/uparrow_1.png", "up1");
AssetLoader.queueImage("../assets/img/sprites/uparrow/uparrow_2.png", "up2");
AssetLoader.queueImage("../assets/img/sprites/uparrow/uparrow_3.png", "up3");

var Aerial_Crash = Img.extend({
  player: null,

  constructor: function (player) {
    this.base("up3", 20, 20);
    this.player = player;
  }
})