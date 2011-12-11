var Kicker_Bike = Kicker.extend({

    constructor: function (width, height) {
        //this.base(width, height);

        this.move = Move_Bike.create(width, height);
        //this.img = Img.create("kicker", width, height);
    },

    draw: function (ctx, x, y) {
        ctx = ctx || GFX.ctx;
        x = x || this.x;
        y = y || this.y;

        x = x - Game.world.x;

        ctx.fillStyle = "#fff";

        this.base(ctx, x, y);
        this.move.draw(ctx, x, y);
        //this.img.draw(ctx, x, y);
    }
}, {
    // Static functions
});