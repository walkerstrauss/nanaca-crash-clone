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
  guardrails: [],


  initialise: function () {
    this.guardrailImg = AssetLoader.getImage("guardrail");
    this.cloudImg1 = AssetLoader.getImage("cloud1");
    this.cloudImg2 = AssetLoader.getImage("cloud2");
    this.cloudImg3 = AssetLoader.getImage("cloud3");
    this.factoryImg = AssetLoader.getImage("factory");
    this.roadImg = AssetLoader.getImage("road");
    this.firstMountainsImg = AssetLoader.getImage("firstMountains");
  },

  update: function (delta) {

  },

  draw: function (ctx, x, y) {
    ctx = ctx || GFX.ctx;
    x = x || Game.world.x;
    y = y || this.y;

    // Draw guardrails

    // Draw road
    this.drawImage(ctx, this.roadImg, 0, 395, GFX.width, 50);
    this.drawImage(ctx, this.roadImg, this.roadImg.width, 395, GFX.width, 50)
  },

  drawImage: function (ctx, img, x, y, width, height) {
    width = width || img.width;
    height = height || img.height;
    ctx.save();
    ctx.scale(Game.camera.scale, Game.camera.scale);
    ctx.drawImage(img, x / Game.camera.scale, y / Game.camera.scale, width / Game.camera.scale, height / Game.camera.scale);
    ctx.restore();
  },
})