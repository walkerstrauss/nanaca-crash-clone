AssetLoader.queueImage("../assets/img/sprites/bg/guardrail.png", "guardrail");

var Guardrail = Entity.extend({
  image: null,
  x: 0,
  y: 291,
  guardrailWidth: 279,
  guardrailHeight: 144,

  constructor: function (img) {
    this.image = img;

    this.width = this.image.width;
    this.height = this.image.height;
  },

  update: function (delta) {

  },

  draw: function (ctx, x, y) {
    ctx = ctx || GFX.ctx;
    x = x || this.x;
    y = y || this.y;

    ctx.save();
    ctx.translate(this.x - Game.world.x, this.y);
    ctx.scale(Game.camera.scale, Game.camera.scale);
    ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }
});