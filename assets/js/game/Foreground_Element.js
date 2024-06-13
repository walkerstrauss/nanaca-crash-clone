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

  draw: function (ctx, x, y, scale) {
    ctx = ctx || GFX.ctx;
    x = x || this.x;
    y = y || this.y;
    scale = scale || 1;

    this.drawImage(ctx, this.img, x, y, scale, this.width, this.height);
  },

  drawImage: function (ctx, img, x, y, scale, width, height) {
    ctx.save();
    ctx.translate(x * scale, y);
    ctx.scale(scale, scale);
    ctx.drawImage(img, -width / 2, -height / 2, width, height);
    ctx.restore();
  }
})