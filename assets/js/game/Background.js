AssetLoader.queueImage("../assets/img/bg.jpg", "background");
AssetLoader.queueImage("../assets/img/sprites/bg/bg.png", "bg");


var Background = Entity.extend({
    img: null,
    roadImg: null,
    factoryImg: null,
    firstMountainsImg: null,
    scrollSpeed: 5,


    constructor: function (width, height) {
        this.base("Background", width, height);

        this.img = Img.create("bg", width, height);
        this.x = 0;
        this.y = 0;
    },

    draw: function (ctx, x, y) {
        ctx = ctx || GFX.ctx;
        x = x || Game.world.x;
        y = y || this.y;

        // var bgX = x / this.width;
        // bgX = bgX - Math.floor(bgX);
        // bgX = this.width - (bgX * this.width);
        // this.img.draw(ctx, bgX, 0);
        // bgX = bgX - this.width;
        // this.img.draw(ctx, bgX, 0);

        // ctx.save();
        // ctx.scale(Game.camera.scale, Game.camera.scale);
        // ctx.translate(x / Game.camera.scale, y / Game.camera.scale);
        // ctx.drawImage(this.img.image, 0, 0, this.width, this.height);
        // ctx.restore();

        var bgScale = Math.max(Game.camera.minScale, Game.camera.scale * 1.2);

        ctx.save();
        ctx.scale(bgScale, bgScale);
        ctx.translate(this.x / bgScale, -this.y / bgScale);
        ctx.drawImage(this.img.image, 0, 0, this.width, this.height);
        ctx.restore();
    }
}, {
    // Static functions
});