AssetLoader.queueImage("../assets/img/kicker.png", "kicker");
AssetLoader.queueImage("../assets/img/sprites/baseball_1.png", "baseball1");
AssetLoader.queueImage("../assets/img/sprites/baseball_2.png", "baseball2");
AssetLoader.queueImage("../assets/img/sprites/baseball_3.png", "baseball3");


var Kicker_Block = Kicker.extend({

    constructor: function (width, height) {
        this.base(width, height);

        this.type = "block";
        this.move = Move_Block.create(width, height);
        this.img = Img.create("baseball1", width, height);
    },

    draw: function (ctx, x, y) {
        ctx = ctx || GFX.ctx;
        x = x || this.x;
        y = y || this.y;

        x = x - Game.world.x;

        // ctx.fillStyle = "#A000A0";

        // this.base(ctx, x, y);
        this.move.draw(ctx, x, y);
        if (!this.physics.GetUserData().kicker && !this.move.active) {
            this.img.image = AssetLoader.getImage("baseball2");
        }
        this.img.draw(ctx, x, y);

    }
}, {
    // Static functions
});