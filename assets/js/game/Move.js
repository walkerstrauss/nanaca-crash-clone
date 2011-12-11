var Move = Entity.extend({
    active: false,
    duration: 0,
    start: null,

    constructor: function (width, height) {
        this.base("Move", width, height);
    },

    update: function (delta) {
        this.base(delta);

        if (this.active) {
            var newTime = Date.now();

            if (newTime - this.start > this.duration) {
                this.active = false;
                Game.world.speedUp();
            }
        }
    },

    activate: function () {
        this.start = Date.now();
        this.active = true;
        Game.world.slowDown();
    },

    draw: function (ctx, x, y) {
        if (!this.active) {
            return;
        }

        ctx = ctx || GFX.ctx;
        x = x || this.x;
        y = y || this.y;

        // x = x - Game.world.x;

        ctx.fillStyle = "#f00";

        this.base(ctx, x, y);
    }
}, {
    // Static functions
});