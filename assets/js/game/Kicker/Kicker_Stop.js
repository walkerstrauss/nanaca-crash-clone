AssetLoader.queueImage("../assets/img/kicker.png", "kicker");
AssetLoader.queueImage("../assets/img/sprites/micheal_1.png");
AssetLoader.queueImage("../assets/img/sprites/micheal_2.png")

var Kicker_Stop = Kicker.extend({

    constructor: function (width, height) {
        this.base(width, height);

        this.move = Move_Stop.create(width, height);
        this.img = Img.create("kicker", width, height);
    },

    draw: function (ctx, x, y) {
        ctx = ctx || GFX.ctx;
        x = x || this.x;
        y = y || this.y;

        x = x - Game.world.x;

        ctx.fillStyle = "#00A000";

        this.base(ctx, x, y);
        this.move.draw(ctx, x, y);
        this.img.draw(ctx, x, y);
    }
}, {
    // Static functions
});