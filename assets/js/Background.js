AssetLoader.queueImage("../assets/img/bg.jpg", "background");

var Background = Entity.extend({
    img: null,

    constructor: function (width, height) {
        this.base("Background", width, height);

        this.img = Img.create("background", width, height);
    },

    draw: function (ctx) {
        ctx = ctx || GFX.ctx;

        this.img.draw(ctx);
    }
}, {
    // Static functions
});