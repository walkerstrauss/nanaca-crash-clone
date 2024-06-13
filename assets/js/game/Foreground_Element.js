var Foreground_Element = Entity.extend({
  img: null,
  width: 0,
  height: 0,
  y: 0,

  constructor: function (img, width, height) {
    this.img = img;
    this.width = width || img.width;
    this.height = height || img.height;
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

    this.drawImage(ctx, this.img, x, y, this.width, this.height);
  },

  drawImage: function (ctx, img, x, y, width, height) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(Game.camera.scale, Game.camera.scale);
    ctx.drawImage(img, -this.width / 2, -this.height / 2, width, height);
    ctx.restore();
  }
})