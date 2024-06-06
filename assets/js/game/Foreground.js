AssetLoader.queueImage("../assets/img/sprites/bg/guardrail.png", "guardrail");
AssetLoader.queueImage("../assets/img/sprites/bg/cloud_1.png", "cloud1");
AssetLoader.queueImage("../assets/img/sprites/bg/cloud_2.png", "cloud2");
AssetLoader.queueImage("../assets/img/sprites/bg/cloud_3.png", "cloud3");
AssetLoader.queueImage("../assets/img/sprites/bg/factory.png", "factory");
AssetLoader.queueImage("../assets/img/sprites/bg/first_mountains.png", "mountains");
AssetLoader.queueImage("../assets/img/sprites/bg/road.png", "road");

var Foreground = Entity.extend({
  guardrailImg: null,
  guardrailWidth: 279,
  guardrailHeight: 144,
  guardrailY: 291,
  cloudImg1: null,
  cloudImg2: null,
  cloudImg3: null,
  cloudSpacing: 10,
  factoryImg: null,
  roadImg: null,
  firstMountainsImg: null,
  scrollSpeed: 5,


  initialise: function (ctx) {
    this.guardrailImg = AssetLoader.getImage("guardrail");
    this.cloudImg1 = AssetLoader.getImage("cloud1");
    this.cloudImg2 = AssetLoader.getImage("cloud2");
    this.cloudImg3 = AssetLoader.getImage("cloud3");
    this.factoryImg = AssetLoader.getImage("factory");
    this.roadImg = AssetLoader.getImage("road");
    this.firstMountainsImg = AssetLoader.getImage("firstMountains");
  },

  draw: function (ctx, x, y) {
    ctx = ctx || GFX.ctx;
    x = x || Game.world.x;
    y = y || this.y;

    // this.drawImage(ctx, this.cloudImg1, x, 50);
    // this.drawImage(ctx, this.cloudImg2, x + 50, 50);
    // this.drawImage(ctx, this.cloudImg3, x + 100, 50);
    // this.drawImage(ctx, this.guardrailImg, 0, this.guardrailY, this.guardrailWidth, this.guardrailHeight);
    // this.drawImage(ctx, this.factoryImg, 0, 150, 300, 200);
    this.drawImage(ctx, this.roadImg, 0, 400, GFX.width, 50);
    this.drawImage(ctx, this.roadImg, 367 * Game.camera.scale, 400, GFX.width, 50)
    // this.drawImage(ctx, this.firstMountainsImg, 0, 100, GFX.width, 200);
  },

  drawImage: function (ctx, img, x, y, width, height) {
    width = width || img.width;
    height = height || img.height;
    ctx.save();
    ctx.scale(Game.camera.scale, Game.camera.scale);
    ctx.drawImage(img, x / Game.camera.scale, y / Game.camera.scale, width, height);
    ctx.restore();
  },
})