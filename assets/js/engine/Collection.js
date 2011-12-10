var Collection = Base.extend({
    items: [],

    constructor: function () {
    },

    update: function (delta) {
        for (var i = 0, j = this.items.length; i < j; i++) {
            this.items[i].update(delta);
        }
    },

    draw: function (ctx, x, y) {
        for (var i = 0, j = this.items.length; i < j; i++) {
            this.items[i].draw(ctx, x, y);
        }
    },

    get: function (i) {
        return this.items[i];
    },

    getLength: function () {
        return this.items.length;
    },

    push: function (item) {
        this.items.push(item);
    },

    shift: function () {
        return this.items.shift();
    },

    createItem: function (i) {
        var item = i.create(arguments[1], arguments[2], arguments[3], arguments[4],
            arguments[5], arguments[6], arguments[7], arguments[8], arguments[9],
            arguments[10], arguments[11], arguments[12], arguments[13], arguments[14]);

        this.push(item);

        return item;
    }
}, {
    // Static functions
    create: function () {
        return new this(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4],
            arguments[5], arguments[6], arguments[7], arguments[8], arguments[9],
            arguments[10], arguments[11], arguments[12], arguments[13], arguments[14]);
    }
});