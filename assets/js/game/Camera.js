var Camera = Base.extend({
  constructor: function (width, height) {
    this.base();

    this.width = width;
    this.height = height;
    this.scale = 1.0;
    this.x = 0;
    this.y = 0;

    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
  },

  move: function (x, y) {
    this.x = x;
    this.y = y;
  },

  setScale: function (scale) {
    this.scale = scale;
  },

  setPosition: function (x, y) {
    this.x = x;
    this.y = y;
  },

  applyTransformation: function (ctx) {
    ctx.translate(-this.x, -this.y);
    ctx.scale(this.scale, this.scale);
  }
});