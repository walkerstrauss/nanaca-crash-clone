AssetLoader.queueImage("../assets/img/bg.jpg", "background");
AssetLoader.queueImage("../assets/img/sprites/bg/bg.png", "bg");
AssetLoader.queueImage("../assets/img/sprites/background1.png", "bg1");


var Background = Entity.extend({
    img: null,
    roadImg: null,
    factoryImg: null,
    firstMountainsImg: null,
    scrollSpeed: 5,


    constructor: function (width, height) {
        this.base("Background", width, height);

        this.img = Img.create("bg1", width, height);
        this.x = 0;
        this.y = 0;
    },

    draw: function (ctx, x, y) {
        ctx = ctx || GFX.ctx;
        x = x || Game_Manager.game.world.x;
        y = y || this.y;

        // var bgX = x / this.width;
        // bgX = bgX - Math.floor(bgX);
        // bgX = this.width - (bgX * this.width);
        // this.img.draw(ctx, bgX, 0);
        // bgX = bgX - this.width;
        // this.img.draw(ctx, bgX, 0);

        // ctx.save();
        // ctx.scale(Game_Manager.game.camera.scale, Game_Manager.game.camera.scale);
        // ctx.translate(x / Game_Manager.game.camera.scale, y / Game_Manager.game.camera.scale);
        // ctx.drawImage(this.img.image, 0, 0, this.width, this.height);
        // ctx.restore();

        ctx.save();
        ctx.translate(this.x, -this.y);
        ctx.drawImage(this.img.image, 0, 0, this.width, this.height);
        ctx.restore();
    }
}, {
    // Static functions
});