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

        ctx.drawImage(this.image, x, y, this.width, this.height);
    }
}, {
    // Static functions
});