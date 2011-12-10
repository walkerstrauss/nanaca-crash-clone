AssetLoader.queueImage("../alpha/player.png", "player");

var Player = Entity.extend({
    img: null,
    physics: null,

    constructor: function (width, height) {
        this.base("Player", width, height);

        this.img = Img.create("player", width, height);
    },

    draw: function (ctx) {
        ctx = ctx || GFX.ctx;

        this.img.draw(ctx);
        //ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}, {
    // Static functions
});