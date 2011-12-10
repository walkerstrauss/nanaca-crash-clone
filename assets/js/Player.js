AssetLoader.queueImage("../assets/img/player.png", "player");
AssetLoader.queueImage("../assets/img/player-shadow.png", "player-shadow");

var Player = PhysicsEntity.extend({
    img: null,
    lastX: 0,
    speed: 0,

    constructor: function (width, height) {
        this.base("Player", width, height);

        this.img = Img.create("player", width, height);

        this.setPosition(20, 336);

        this.lastX = 20;
    },

    _setUpPhysics: function () {
        var def = new Box2D.Dynamics.b2BodyDef();
        def.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        def.fixedRotation = true;

        this.physics = Game.world.physics.CreateBody(def);
        this.physics.SetLinearDamping(0);

        this.physics.SetUserData({
            player: true
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

    kick: function () {
        // http://www.iforce2d.net/b2dtut/sticky-projectiles
        var forceToApply = new Box2D.Common.Math.b2Vec2(15, -20);
        forceToApply.Multiply(this.physics.GetMass());

        this.physics.SetAwake(true);
        this.physics.ApplyImpulse(forceToApply, this.physics.GetPosition());
    },

    update: function (delta) {
        this.base(delta);
        this.img.setPosition(this.x, this.y);

        this.speed = this.x - this.lastX;
        this.lastX = this.x;
    },

    draw: function (ctx, x, y) {
        ctx = ctx || GFX.ctx;
        x = x || this.x;
        y = y || this.y;

        x = x - Game.world.x;

        this.img.draw(ctx, x, y);
    }
}, {
    // Static functions
});