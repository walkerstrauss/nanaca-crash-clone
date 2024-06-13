AssetLoader.queueImage("../assets/img/sprites/bg/guardrail.png", "guardrail");
AssetLoader.queueImage("../assets/img/sprites/bg/cloud_1.png", "cloud1");
AssetLoader.queueImage("../assets/img/sprites/bg/cloud_2.png", "cloud2");
AssetLoader.queueImage("../assets/img/sprites/bg/cloud_3.png", "cloud3");
AssetLoader.queueImage("../assets/img/sprites/bg/factory.png", "factory");
AssetLoader.queueImage("../assets/img/sprites/bg/first_mountains.png", "mountains");
AssetLoader.queueImage("../assets/img/sprites/bg/road.png", "road");


var Foreground_Collection = Collection.extend({
  items: [],
  type: "",
  elementY: 0,
  parralaxWorldX: 0,
  parallaxSpeedScale: 1,
  nextPosition: 0,
  spacing: 0,
  numElem: 0,

  constructor: function (type, elementY, parralaxSpeedScale, spacing, numElem) {
    this.type = type;
    this.elementY = elementY;
    this.parallaxSpeedScale = parralaxSpeedScale || 1;
    this.spacing = spacing || 0;
    this.numElem = numElem || 10;
    this.createInitialItems(this.numElem);
  },

  createInitialItems: function (numElem) {
    for (var i = 0; i < numElem; i++) {
      this.createItem();
    }
  },

  update: function (delta) {
    this.parralaxWorldX = Game.world.x * this.parallaxSpeedScale;

    for (var i = 0, j = this.items.length; i < j; i++) {
      if (this.items[i].x - this.parralaxWorldX < -this.spacing) {
        this.shift();
        this.createItem();
      }
    }
  },

  draw: function (ctx, x, y) {
    ctx = ctx || GFX.ctx;
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].draw(ctx, this.items[i].x - this.parralaxWorldX, this.items[i].y);
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
    this.items.shift();
  },

  createItem: function () {
    var item = new Foreground_Element(this.getImg(this.type));
    item.setPosition(this.nextPosition, this.elementY);
    this.push(item);
    this.nextPosition += this.spacing;
  },

  getImg: function (type) {
    if (type === "cloud") {
      var src = type + Math.floor((Math.random * 3) + 1);
      return AssetLoader.getImage(src);
    } else {
      return AssetLoader.getImage(type);
    }
  }

})