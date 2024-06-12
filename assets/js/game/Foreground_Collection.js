AssetLoader.queueImage("../assets/img/sprites/bg/guardrail.png", "guardrail");
AssetLoader.queueImage("../assets/img/sprites/bg/cloud_1.png", "cloud1");
AssetLoader.queueImage("../assets/img/sprites/bg/cloud_2.png", "cloud2");
AssetLoader.queueImage("../assets/img/sprites/bg/cloud_3.png", "cloud3");
AssetLoader.queueImage("../assets/img/sprites/bg/factory.png", "factory");
AssetLoader.queueImage("../assets/img/sprites/bg/first_mountains.png", "mountains");
AssetLoader.queueImage("../assets/img/sprites/bg/road.png", "road");


var Foreground_Collection = Collection.extend({
  parallaxScale: 1,
  parralaxWorldX: 0,
  lastPosition: 0,
  spacing: 0,

  constructor: function () {
    this.guardrailImg = AssetLoader.getImage("guardrail");
    this.cloudImg1 = AssetLoader.getImage("cloud1");
    this.cloudImg2 = AssetLoader.getImage("cloud2");
    this.cloudImg3 = AssetLoader.getImage("cloud3");
    this.factoryImg = AssetLoader.getImage("factory");
    this.roadImg = AssetLoader.getImage("road");
    this.firstMountainsImg = AssetLoader.getImage("firstMountains");
  },

  update: function (delta) {
    this.base(delta);
  },

  draw: function (ctx, x, y) {
    this.base(ctx, x, y);
  },

  get: function (i) {
    this.base(i);
  },

  getLength: function () {
    this.base();
  },

  push: function (item) {
    this.base(item);
  },

  shift: function () {
    this.base();
  },

  createItem: function (i) {
    this.base(i);
  },

  getImg: function (type) {
    switch (type) {
      case "guardrail":
        return this.guardrailImg;
    }
  }

})