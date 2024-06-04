var Camera = Base.extend({
  x: 0,
  y: 0,
  scale: 1.25,
  minScale: 1.0,
  maxScale: 1.25,

  update: function (player) {
    this.x = player.x - (GFX.width / 4);
    this.y = Math.max(2, player.y)

    this.scale = Math.min(this.maxScale, Math.max(this.minScale, 1 + (player.y / GFX.height)));
  },

  applyTransform: function (ctx) {
    ctx.save();
    ctx.translate(-this.x, -this.y)
    ctx.scale(this.scale, this.scale);

  },

  resetTransform: function (ctx) {
    ctx.restore();
  }
});