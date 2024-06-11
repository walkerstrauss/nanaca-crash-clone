var ForegroundElement = Entity.extend({
  img: null,
  width: 0,
  height: 0,
  y: 0,

  constructor: function (img, width, height, y) {
    this.img = img;
    this.width = width;
    this.height = height;
    this.y = y;
  },

  setPosition: function (x, y) {
    this.x = x;
    this.y = y;
  },

  update: function (delta) {

  },

  draw: function (ctx, x, y) {
    ctx = ctx || GFX.ctx;
    x = x || this.x;
    y = y || this.y;

    this.drawImage(ctx, this.img, this.x, this.y, this.width, this.height);
  },

  drawImage: function (ctx, img, x, y, width, height) {
    ctx.save();
    ctx.translate(x - Game.world.x, y);
    ctx.scale(Game.camera.scale, Game.camera.scale);
    ctx.drawImage(img, -width / 2, -height / 2, width, height);
    ctx.restore();
  }
})