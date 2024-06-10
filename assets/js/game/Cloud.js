AssetLoader.queueImage("../assets/img/sprites/bg/cloud_1.png", "cloud1");
AssetLoader.queueImage("../assets/img/sprites/bg/cloud_2.png", "cloud2");
AssetLoader.queueImage("../assets/img/sprites/bg/cloud_3.png", "cloud3");

var Cloud = PhysicsEntity.extend({
  img: null,
  speed: 0, // Speed at which the cloud moves to the left
  type: 1,
  x: 0,
  y: 10,
  width: 0,
  height: 0,

  constructor: function (type, i) {
    this.type = type || 1;
    this.img = this.getCloudImage(type);
    this.width = this.img.width;
    this.height = this.img.height;
    this.initCloud((i * (this.width + 20)), 20)
  },

  initCloud: function (x, y) {
    this.x = x || this.x;
    this.y = y || this.y;
    this.setupPhysics();
  },

  setupPhysics: function () {
    var bodyDef = new Box2d.b2BodyDef();
    bodyDef.type = Box2d.b2Body.b2_kinematicBody;
    bodyDef.position.Set(this.x, this.y);
    bodyDef.userData = this;

    var fixDef = new Box2d.b2FixtureDef();
    fixDef.shape = new Box2d.b2PolygonShape();
    fixDef.shape.SetAsBox(this.width / 2, this.height / 2);
    fixDef.isSensor = true;
    this.body = Game.world.CreateBody(bodyDef);
    this.body.CreateFixture(fixDef);
  },

  getCloudImage: function (type) {
    switch (type) {
      case 1: return AssetLoader.getImage("cloud1");
      case 2: return AssetLoader.getImage("cloud2");
      case 3: return AssetLoader.getImage("cloud3");
      default: return AssetLoader.getImage("cloud1");
    }
  },

  update: function (delta) {
    var position = this.body.GetPosition();
    this.speed = -Game.player.speed.x;
    position.x += this.speed;
    this.body.SetPosition(position);

    // If the cloud moves out of the screen, reset its position
    if (position.x < -this.width) {
      position.x = (GFX.width + this.width);
      this.body.SetPosition(position);
    }
  },

  draw: function (ctx, x, y) {
    ctx = ctx || GFX.ctx;
    x = x || this.x;
    y = y || this.y;
    var position = this.body.GetPosition();
    ctx.drawImage(this.img, position.x - this.width / 2, position.y - this.height / 2, this.width, this.height);
  }
});