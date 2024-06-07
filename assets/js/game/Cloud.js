AssetLoader.queueImage("../assets/img/sprites/bg/cloud_1.png", "cloud1");
AssetLoader.queueImage("../assets/img/sprites/bg/cloud_2.png", "cloud2");
AssetLoader.queueImage("../assets/img/sprites/bg/cloud_3.png", "cloud3");

var Cloud = PhysicsEntity.extend({
  img: null,
  speed: 0, // Speed at which the cloud moves to the left
  type: 1,

  constructor: function (type) {
    this.type = type || 1;
    this.img = this.getCloudImage(type);
    this.setupPhysics();
  },

  setupPhysics: function () {
    var bodyDef = new b2BodyDef();
    bodyDef.type = b2Body.b2_kinematicBody;
    bodyDef.position.Set(this.x / SCALE, this.y / SCALE);
    bodyDef.userData = this;

    var fixDef = new b2FixtureDef();
    fixDef.shape = new b2PolygonShape();
    fixDef.shape.SetAsBox(this.width / 2 / SCALE, this.height / 2 / SCALE);
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

  update: function () {
    var position = this.body.GetPosition();
    this.speed = -Game.player.speed.x;
    position.x += this.speed / SCALE;
    this.body.SetPosition(position);

    // If the cloud moves out of the screen, reset its position
    if (position.x < -this.width / SCALE) {
      position.x = (GFX.width + this.width) / SCALE;
      this.body.SetPosition(position);
    }
  },

  draw: function (ctx) {
    var position = this.body.GetPosition();
    ctx.drawImage(this.img, position.x * SCALE - this.width / 2, position.y * SCALE - this.height / 2, this.width, this.height);
  }
});