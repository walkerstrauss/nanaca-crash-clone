AssetLoader.queueImage("../assets/img/sprites/forklift.png", "forklift")

var Kicker_Bike = Kicker.extend({
    // initialX: 0,
    // initialY: 0,
    // targetX: 0,
    // targetY: 0,
    // speedX: 0,
    // speedY: 0,
    // active: false,

    constructor: function (width, height) {
        //this.base(width, height);

        this.type = "bike";
        this.move = Move_Bike.create(width, height);
        this.img = Img.create("forklift", width, height);
    },

    draw: function (ctx, x, y) {
        ctx = ctx || GFX.ctx;
        x = x || this.x - 20;
        y = y || this.y;

        x = x - Game_Manager.game.world.x;

        ctx.fillStyle = "#fff";

        this.base(ctx, x, y);
        this.move.draw(ctx, x, y);
        // if (this.active) {
        //     this.img.draw(ctx, x, y);
        // }
    }
}, {
    // Static functions
});