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
  guardrailY: 390,
  guardrailLastPos: 0,
  // guardrailWorldX: 0,
  cloudImg1: null,
  cloudImg2: null,
  cloudImg3: null,
  cloudWidth: 384,
  cloudLastPos: 0,
  // cloudWorldX: 0,
  factoryImg: null,
  roadImg: null,
  roadLastPos: null,
  firstMountainsImg: null,
  guardrails: [],
  clouds: [],
  roads: [],
  elements: [],


  initialise: function () {
    this.guardrailImg = AssetLoader.getImage("guardrail");
    this.cloudImg1 = AssetLoader.getImage("cloud1");
    this.cloudImg2 = AssetLoader.getImage("cloud2");
    this.cloudImg3 = AssetLoader.getImage("cloud3");
    this.factoryImg = AssetLoader.getImage("factory");
    this.roadImg = AssetLoader.getImage("road");
    this.firstMountainsImg = AssetLoader.getImage("firstMountains");

    // Initialize collections
  },

  createInitialElements: function () {
    this.elements.push(guardrails);
    this.elements.push(clouds);
    for (var i = 0; i < 10; i++) {
      this.createGuardrail();
      this.guardrailLastPos += this.guardrailImg.width;
      this.createCloud();
      this.cloudLastPos += this.cloudImg1.width;
      if (i < 3) {
        this.createRoad();
        this.roadLastPos += this.roadImg.width;
      }
    }
  },

  createGuardrail: function () {
    var guardrail = new Foreground_Element(guardrailImg, guardrailImg.width, guardrailImg.height);
    guardrail.setPosition(this.guardrailLastPos + this.guardrailImg.width);
    this.guardrails.push(guardrail);
  },

  createCloud: function (x) {

  },

  createRoad: function () {

  },


  update: function (delta) {

  },

  draw: function (ctx, x, y) {
    ctx = ctx || GFX.ctx;
    x = x || Game.world.x;
    y = y || this.y;

    // Draw guardrails

    // Draw road
    this.drawRoad()
  },

  drawRoad: function (ctx, x, y) {
    this.drawImage(ctx, this.roadImg, 0, 395, GFX.width, 50);
    this.drawImage(ctx, this.roadImg, this.roadImg.width, 395, GFX.width, 50);
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