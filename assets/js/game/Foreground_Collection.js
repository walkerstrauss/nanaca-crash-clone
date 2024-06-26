AssetLoader.queueImage("../assets/img/sprites/bg/guardrail.png", "guardrail");
AssetLoader.queueImage("../assets/img/sprites/bg/cloud_1.png", "cloud1");
AssetLoader.queueImage("../assets/img/sprites/bg/cloud_2.png", "cloud2");
AssetLoader.queueImage("../assets/img/sprites/bg/cloud_3.png", "cloud3");
AssetLoader.queueImage("../assets/img/sprites/bg/factory.png", "factory");
AssetLoader.queueImage("../assets/img/sprites/bg/first_mountains.png", "mountains");
AssetLoader.queueImage("../assets/img/sprites/bg/road.png", "road");
AssetLoader.queueImage("../assets/img/sprites/bg/tree.png", "tree");


var Foreground_Collection = Collection.extend({
  items: [],
  type: "",
  elementY: 0,
  parralaxWorldX: 0,
  parallaxSpeedScale: 1,
  nextPosition: 0,
  spacing: 0,
  numElem: 0,
  scale: 1,
  elemScale: 1,

  constructor: function (type, elementY, elemWidth, elemHeight, parralaxSpeedScale, spacing, numElem, elemScale) {
    this.items = [];
    this.type = type;
    this.elementY = elementY;
    this.elemWidth = elemWidth;
    this.elemHeight = elemHeight;
    this.parallaxSpeedScale = parralaxSpeedScale || 1;
    this.spacing = spacing || 0;
    this.numElem = numElem || 10;
    this.nextPosition = 0;
    this.scale = 1;
    this.elemScale = elemScale || 1;
    this.createInitialItems(this.numElem);
  },

  createInitialItems: function (numElem) {
    for (var i = 0; i < numElem; i++) {
      this.createItem();
    }
  },

  // Updates collection based on world's position and parallax speed 
  update: function (delta) {
    this.parralaxWorldX = Game_Manager.game.world.x * this.parallaxSpeedScale;
    this.scale = this.getScale(this.type);

    for (var i = 0, j = this.items.length; i < j; i++) {
      if (this.items[i].x - this.parralaxWorldX < -1 * (this.elemWidth + this.spacing)) {
        this.shift();
        this.createItem();
      }
    }
  },

  draw: function (ctx, x, y) {
    ctx = ctx || GFX.ctx;
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].draw(ctx, this.items[i].x - this.parralaxWorldX, this.items[i].y, this.scale);
    }
  },

  // Methods for managing items in collection
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
    var item = new Foreground_Element(this.getImg(), this.elemWidth, this.elemHeight);
    item.setPosition(this.nextPosition, this.elementY);
    this.push(item);
    if (this.type === "tree") {
      this.nextPosition += this.spacing + this.elemWidth + (Math.floor(Math.random() * 100) + 1);
      return;
    } else if (this.type === "cloud") {
      this.nextPosition += this.spacing + this.elemWidth + (Math.floor(Math.random() * 10) + 1);
      return;
    }
    this.nextPosition += this.spacing + this.elemWidth;
  },

  getImg: function () {
    if (this.type === "cloud") {
      var src = "cloud" + Math.floor((Math.random() * 3) + 1);
      return AssetLoader.getImage(src);
    } else {
      return AssetLoader.getImage(this.type);
    }
  },

  getScale: function (type) {
    switch (type) {
      case "mountains":
        return 0.3;
      case "cloud":
        return 0.4;
      case "tree":
        return 0.3;
      default:
        return Game_Manager.game.camera.scale * this.elemScale;
    }
  }
})