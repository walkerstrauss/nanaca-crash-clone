AssetLoader.queueImage("../assets/img/bg.jpg", "background");
AssetLoader.queueImage("../assets/img/sprites/bg/bg.png");

var Background = Entity.extend({
    img: null,

    constructor: function (width, height) {
        this.base("Background", width, height);

        this.img = Img.create("background", width, height);
        this.x = 0;
        this.y = 0;
    },

    draw: function (ctx, x, y) {
        ctx = ctx || GFX.ctx;
        x = x || Game.world.x;
        y = y || this.y;

        var bgX = x / this.width;
        bgX = bgX - Math.floor(bgX);
        bgX = this.width - (bgX * this.width);
        this.img.draw(ctx, bgX, 0);
        bgX = bgX - this.width;
        this.img.draw(ctx, bgX, 0);
    }
}, {
    // Static functions
});