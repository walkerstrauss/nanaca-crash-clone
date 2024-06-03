AssetLoader.queueImage("../assets/img/bg.jpg", "background");
AssetLoader.queueImage("../assets/img/sprites/bg/bg.png", "bg");
AssetLoader.queueImage("../assets/img/sprites/bg/guardrail.png", "guardrail");
AssetLoader.queueImage("../assets/img/sprites/bg/cloud_1.png", "cloud1");
AssetLoader.queueImage("../assets/img/sprites/bg/cloud_2.png", "cloud2");
AssetLoader.queueImage("../assets/img/sprites/bg/cloud_3.png", "cloud3");
AssetLoader.queueImage("../assets/img/sprites/bg/factory.png", "factory");
AssetLoader.queueImage("../assets/img/sprites/bg/first_mountains.png", "mountains");
AssetLoader.queueImage("../assets/img/sprites/bg/road.png", "road");


var Background = Entity.extend({
    img: null,
    guardrailImg: null,
    cloudImg1: null,
    cloudImg2: null,
    cloudImg3: null,
    roadImg: null,
    factoryImg: null,
    firstMountainsImg: null,
    scrollSpeed: 5,
    guardrailWidth: 279,
    guardrailHeight: 144,
    guardrailY: 291,

    constructor: function (width, height) {
        this.base("Background", width, height);

        this.img = Img.create("background", width, height);
        this.x = 0;
        this.y = 0;
    },

    draw: function (ctx, x, y) {
        ctx = ctx || GFX.ctx;
        x = x || Game.world.x;
        y = y || this.y;

        var bgX = x / this.width;
        bgX = bgX - Math.floor(bgX);
        bgX = this.width - (bgX * this.width);
        this.img.draw(ctx, bgX, 0);
        bgX = bgX - this.width;
        this.img.draw(ctx, bgX, 0);

        // this.img.draw(ctx, this.x, this.y);
    }
}, {
    // Static functions
});