AssetLoader.queueImage("../assets/img/sprites/bg/cloud_1.png", "cloud1");
AssetLoader.queueImage("../assets/img/sprites/bg/cloud_2.png", "cloud2");
AssetLoader.queueImage("../assets/img/sprites/bg/cloud_3.png", "cloud3");

var Cloud = PhysicsEntity.extend({
  img: null,
  speed: 0, // Speed at which the cloud moves to the left
  type: 1,
  x: 0,
  y: 3,
  width: 0,
  height: 0,

  constructor: function (type, x, y) {
    this.type = type || 1;
    this.img = this.getCloudImage(type);

    this.x = x;
    this.y = y || this.y;
    this.width = this.img.width;
    this.height = this.img.height;

    this.setupPhysics();
  },

  setupPhysics: function () {
    var bodyDef = new Box2D.Dynamics.b2BodyDef();
    bodyDef.type = Box2D.Dynamics.b2Body.b2_kinematicBody;
    bodyDef.position.Set(this.x, this.y);
    bodyDef.userData = this;
    this.physics = Game.world.physics.CreateBody(bodyDef)

    var fixDef = new Box2D.Dynamics.b2FixtureDef();
    fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
    fixDef.shape.SetAsBox(this.width / 2, this.height / 2);
    fixDef.isSensor = true;
    this.fix = this.physics.CreateFixture(fixDef);

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

  },

  draw: function (ctx, x, y) {
    ctx = ctx || GFX.ctx;
    x = x || this.x;
    y = y || this.y;

    ctx.save();
    ctx.translate(this.x - Game.world.x, this.y);
    ctx.scale(Game.camera.scale, Game.camera.scale);
    ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }
});