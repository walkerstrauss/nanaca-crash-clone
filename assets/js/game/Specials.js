AssetLoader.queueImage("../assets/img/sprites/miniicon/baseball_miniicon.png", "baseball");
AssetLoader.queueImage("../assets/img/sprites/miniicon/micheal_miniicon.png", "micheal");
AssetLoader.queueImage("../assets/img/sprites/miniicon/peroni_miniicon.png", "peroni");
AssetLoader.queueImage("../assets/img/sprites/miniicon/two_miniicon.png", "two");

var Specials = Entity.extend({
  currentIcon: 1,
  currentType: "",
  lastHitType: "",
  red: "#ff0000",
  purple: "#A000A0",
  specialMsg: "SPECIAL",
  blockMsg: "BLOCK",

  constructor: function () {
    this.currentIcon = 1;
    this.x = 650;
    this.y = 200;
    this.width = 100;
    this.height = 30;
  },

  update: function () {
    this.drawIcon();
    this.drawText();
  },

  drawIcon: function (ctx) {
    const width = this.width;
    const height = this.height;

    ctx = ctx || GFX.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x, this.y);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, height);
    ctx.lineTo(width, height);
    ctx.lineTo(width, 0);
    ctx.closePath();

    ctx.fillStyle = "#ffffff";
    ctx.fill();
  },

  drawText: function (ctx) {
    ctx = ctx || GFX.ctx;
    const msg = Game_Manager.game.player.blocked ? this.blockMsg : this.specialMsg;
    const msgColor = Game_Manager.game.player.blocked ? this.purple : this.red;

    ctx.fillStyle = msgColor
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Draw text to screen
    ctx.fillText(msg, this.x + this.width / 2, this.y + this.height / 2);
    ctx.restore();
  }

});