AssetLoader.queueImage("../assets/img/kicker.png", "kicker");

var Kicker = PhysicsEntity.extend({
    img: null,

    constructor: function (width, height) {
        this.base("Kicker", width, height);

        this.img = Img.create("kicker", width, height);

        this.setPosition(180, 305);
    },

    _setUpPhysics: function () {
        var def = new Box2D.Dynamics.b2BodyDef();

        this.physics = Game.world.physics.CreateBody(def);
        this.physics.SetUserData({
            kicker: true
        });

        var poly = new Box2D.Collision.Shapes.b2PolygonShape();
        poly.SetAsBox(Game.world.toWorld(this.width * 0.5), Game.world.toWorld(this.height * 0.5));

        var fixDef = new Box2D.Dynamics.b2FixtureDef();
        fixDef.shape = poly;
        fixDef.isSensor = true;

        var fix = this.physics.CreateFixture(fixDef);
    },

    update: function (delta) {
        this.base(delta);
        this.img.setPosition(this.x, this.y);
    },

    draw: function (ctx, x, y) {
        ctx = ctx || GFX.ctx;
        x = x || this.x;
        y = y || this.y;

        x = x - Game.world.x;

        this.base(ctx, x, y);
        this.img.draw(ctx, x, y);
    }
}, {
    // Static functions
});