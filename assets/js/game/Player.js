AssetLoader.queueImage("../assets/img/player.png", "player");
AssetLoader.queueImage("../assets/img/player-shadow.png", "player-shadow");
AssetLoader.queueImage("../assets/img/sprites/toji1.png", "toji_1");
AssetLoader.queueImage("../assets/img/sprites/toji2.png", "toji_2");

var Player = PhysicsEntity.extend({
    img: null,
    speed: null,
    blocked: false,
    bike: null,
    angle: 0,
    power: 0,
    upwardTime: 0,
    crashAvailable: "none",
    upwardCrashes: 3,
    stopped: false,

    constructor: function (width, height) {
        this.base("Player", width, height);

        this.speed = new Box2D.Common.Math.b2Vec2(0, 0);
        this.bike = Kicker_Bike.create(width, height);
        this.img = Img.create("toji_1", width, height);

        this.setPosition(20, 336);
        this.stopped = false;
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
        if (!this.stopped) {
            this.img.draw(ctx, x, y);
        }
    },

    launch: function () {
        var forceX = Math.cos(this.angle * Math.PI / 180) * this.power;
        var forceY = Math.sin(this.angle * Math.PI / 180) * this.power;

        var forceToApply = new Box2D.Common.Math.b2Vec2(forceX, -forceY);
        forceToApply.Multiply(this.physics.GetMass());
        this.physics.SetAwake(true);
        this.physics.SetLinearVelocity(forceToApply);
    },

    crash: function () {

    }
}, {
    // Static functions
});