AssetLoader.queueImage("../assets/img/player.png", "player");
AssetLoader.queueImage("../assets/img/player-shadow.png", "player-shadow");

var Player = PhysicsEntity.extend({
    img: null,
    speed: null,
    blocked: false,
    bike: null,

    constructor: function (width, height) {
        this.base("Player", width, height);

        this.speed = new Box2D.Common.Math.b2Vec2(0, 0);
        this.bike = Kicker_Bike.create(width, height);
        this.img = Img.create("player", width, height);

        this.setPosition(20, 336);
    },

    _setUpPhysics: function () {
        var def = new Box2D.Dynamics.b2BodyDef();
        def.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        def.fixedRotation = true;

        this.physics = Game.world.physics.CreateBody(def);
        this.physics.SetLinearDamping(0.1);

        this.physics.SetUserData({
            player: true,
            entity: this
        });

        var poly = new Box2D.Collision.Shapes.b2CircleShape();
        poly.SetRadius(Game.world.toWorld(this.height * 0.5));

        var fixDef = new Box2D.Dynamics.b2FixtureDef();
        fixDef.shape = poly;
        fixDef.density = 1;
        fixDef.friction = 0;
        fixDef.restitution = 0.6;

        var fix = this.physics.CreateFixture(fixDef);

        this.physics.ResetMassData();
    },

    update: function (delta) {
        this.base(delta);
        this.img.setPosition(this.x, this.y);
        this.bike.setPosition(this.x, this.y);

        this.bike.update(delta);

        this.speed = this.physics.GetLinearVelocity();
    },

    draw: function (ctx, x, y) {
        ctx = ctx || GFX.ctx;
        x = x || this.x;
        y = y || this.y;

        this.bike.draw(ctx, x, y);

        x = x - Game.world.x;

        this.img.draw(ctx, x, y);
    }
}, {
    // Static functions
});