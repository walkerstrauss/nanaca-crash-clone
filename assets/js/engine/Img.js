var Img = Entity.extend({
    src: "",
    image: null,

    constructor: function (src, width, height) {
        this.base("Image: " + src, width, height);
        this.src = src;
        this.image = AssetLoader.getImage(src);
    },

    draw: function (ctx, x, y) {
        ctx = ctx || GFX.ctx;
        x = x || this.x;
        y = y || this.y;

        ctx.save();
        ctx.translate((this.x - Game.world.x), (this.y) + (8 / Game.camera.scale));
        ctx.scale(Game.camera.scale, Game.camera.scale);
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }
}, {
    // Static functions
});