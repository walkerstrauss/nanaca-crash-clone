AssetLoader.queueImage("../assets/img/sprites/goodkyle.png", "goodkyle");

var Kicker_Angle_Up = Kicker.extend({

  constructor: function (width, height) {
    this.base(width, height);

    this.move = Move_Angle_Up.create(width, height);
    this.img = Img.create("goodkyle", width, height);
  },

  draw: function (ctx, x, y) {
    ctx = ctx || GFX.ctx;
    x = x || this.x;
    y = y || this.y;

    x = x - Game.world.x;

    // ctx.fillStyle = "#0000A0";

    // this.base(ctx, x, y);
    this.move.draw(ctx, x, y);
    this.img.draw(ctx, x, y);
  }
}, {
  // Static functions
})