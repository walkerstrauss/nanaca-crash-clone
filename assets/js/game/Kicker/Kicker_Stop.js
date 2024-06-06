AssetLoader.queueImage("../assets/img/kicker.png", "kicker");
AssetLoader.queueImage("../assets/img/sprites/micheal_1.png", "micheal1");
AssetLoader.queueImage("../assets/img/sprites/micheal_2.png", "micheal2");

var Kicker_Stop = Kicker.extend({

    constructor: function (width, height) {
        this.base(width, height);

        this.type = "stop";
        this.move = Move_Stop.create(width, height);
        this.img = Img.create("micheal1", width, height);
    },

    draw: function (ctx, x, y) {
        ctx = ctx || GFX.ctx;
        x = x || this.x;
        y = y || this.y;

        x = x - Game.world.x;

        // ctx.fillStyle = "#00A000";

        if (Game.player.stopped) {
            this.img.image = AssetLoader.getImage("micheal2");
        }
        // this.base(ctx, x, y);
        this.move.draw(ctx, x, y);
        this.img.draw(ctx, x, y);
    }
}, {
    // Static functions
});