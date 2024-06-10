AssetLoader.queueImage("../assets/img/sprites/bg/guardrail.png", "guardrail");

var Guardrail = Img.extend({
  img: null,
  x: 0,
  y: 0,
  guardrailWidth: 279,
  guardrailHeight: 144,
  guardrailY: 291,

  constructor: function (x, y) {
    this.base("guardrail", 279, 144);

    this.setPosition(x, y);
    this.width = this.img.width;
    this.height = this.img.height;
    this.setUpPhysics();
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