AssetLoader.queueImage("../assets/img/kicker.png", "kicker");
AssetLoader.queueImage("../assets/img/sprites/peroni_1.png", "peroni1");
AssetLoader.queueImage("../assets/img/sprites/peroni_2.png", "peroni2");
AssetLoader.queueImage("../assets/img/sprites/peroni_3.png", "peroni3");

var Kicker_Punch = Kicker.extend({

    constructor: function (width, height) {
        this.base(width, height);

        this.type = "punch";
        this.move = Move_Punch.create(width, height);
        this.img = Img.create("peroni2", width, height);
    },

    draw: function (ctx, x, y) {
        ctx = ctx || GFX.ctx;
        x = x || this.x;
        y = y || this.y;

        x = x - Game.world.x;

        // ctx.fillStyle = "#A0A000";

        // this.base(ctx, x, y);
        this.move.draw(ctx, x, y);
        if (this.move.active) {
            this.img.image = AssetLoader.getImage("peroni3");
        } else if (!this.physics.GetUserData().kicker) {
            this.img.image = AssetLoader.getImage("peroni1");
        }
        this.img.draw(ctx, x, y);
    }
}, {
    // Static functions
});