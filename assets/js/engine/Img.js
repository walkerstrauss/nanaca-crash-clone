var Img = Entity.extend({
    src: "",
    image: null,

    constructor: function (src, width, height) {
        this.base("Image: " + src, width, height);
        this.src = src;
        this.image = AssetLoader.getImage(src);
    },

    draw: function (ctx) {
        ctx = ctx || GFX.ctx;

        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}, {
    // Static functions
});