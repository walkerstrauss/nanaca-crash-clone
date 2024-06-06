AssetLoader.queueImage("../assets/img/kicker.png", "kicker");
AssetLoader.queueImage("../assets/img/sprites/two_1.png", "two1");
AssetLoader.queueImage("../assets/img/sprites/two_2.png", "two2");
AssetLoader.queueImage("../assets/img/sprites/two_3.png", "two3");

var Kicker_Kick = Kicker.extend({

    constructor: function (width, height) {
        this.base(width, height);

        this.type = "kick";
        this.move = Move_Kick.create(width, height);
        this.img = Img.create("two2", width, height);
    },

    draw: function (ctx, x, y) {
        ctx = ctx || GFX.ctx;
        x = x || this.x;
        y = y || this.y;

        x = x - Game.world.x;

        // ctx.fillStyle = "#0000A0";

        // this.base(ctx, x, y);
        this.move.draw(ctx, x, y);
        if (!this.physics.GetUserData().kicker && !this.move.active) {
            this.img.image = AssetLoader.getImage("two3");
        }
        this.img.draw(ctx, x, y);
    }
}, {
    // Static functions
});