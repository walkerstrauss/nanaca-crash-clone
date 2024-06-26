AssetLoader.queueImage("../assets/img/sprites/badkyle.png", "badkyle");

var Kicker_Angle_Down = Kicker.extend({

  constructor: function (width, height) {
    this.base(width, height);

    this.type = "angle_down";
    this.move = Move_Angle_Down.create(width, height);
    this.img = Img.create("badkyle", width, height);
  },

  draw: function (ctx, x, y) {
    ctx = ctx || GFX.ctx;
    x = x || this.x;
    y = y || this.y;

    x = x - Game_Manager.game.world.x;

    // ctx.fillStyle = "#0000A0";

    // this.base(ctx, x, y);
    this.move.draw(ctx, x, y);
    this.img.draw(ctx, x, y);
  }
}, {
  // Static functions
})