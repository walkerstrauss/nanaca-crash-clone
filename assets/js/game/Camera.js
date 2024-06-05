var Camera = Base.extend({
  x: 0,
  y: 0,
  scale: 1.5,
  minScale: 0.75,
  maxScale: 1.5,

  update: function (player) {
    this.x = player.x - (GFX.width / 2) / this.scale;
    this.y = Math.max(player.y - (GFX.height / 2) / this.scale, 400);

    this.scale = Math.min(this.maxScale, Math.max(this.minScale, 1 + ((player.y / GFX.height) / 2)));
  },

  applyTransform: function (ctx) {
    ctx.save();
    ctx.translate(this.x - Game.world.x, -this.y);
    ctx.scale(this.scale, this.scale);

  },

  resetTransform: function (ctx) {
    ctx.restore();
  }
});