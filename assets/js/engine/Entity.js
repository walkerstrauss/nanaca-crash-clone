var Entity = Base.extend({
    name: "Entity",
    width: 0,
    height: 0,
    x: 0,
    y: 0,

    constructor: function (name, width, height) {
        this.name = name;
        this.width = width;
        this.height = height;
    },

    setPosition: function (x, y) {
        this.x = x;
        this.y = y;
    },

    setSize: function (width, height) {
        this.width = width;
        this.height = height;
    },

    draw: function (ctx) {
        ctx = ctx || GFX.ctx;

        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}, {
    // Static functions
    create: function () {
        return new this(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4],
            arguments[5], arguments[6], arguments[7], arguments[8], arguments[9],
            arguments[10], arguments[11], arguments[12], arguments[13], arguments[14]);
    }
});