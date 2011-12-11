var Kicker = PhysicsEntity.extend({
    img: null,
    move: false,

    constructor: function (width, height) {
        this.base("Kicker", width, height);
        this.setPosition(180, 305);
    },

    _setUpPhysics: function () {
        var def = new Box2D.Dynamics.b2BodyDef();

        this.physics = Game.world.physics.CreateBody(def);
        this.physics.SetUserData({
            kicker: true,
            entity: this
        });

        var poly = new Box2D.Collision.Shapes.b2PolygonShape();
        poly.SetAsBox(
            Game.world.toWorld(this.width * 0.25),
            Game.world.toWorld(this.height * 0.3)
        );

        var fixDef = new Box2D.Dynamics.b2FixtureDef();
        fixDef.shape = poly;
        fixDef.isSensor = true;

        var fix = this.physics.CreateFixture(fixDef);
    },

    update: function (delta) {
        this.base(delta);

        if (this.img) {
            this.img.setPosition(this.x, this.y);
        }

        if (this.move) {
            this.move.setPosition(this.x, this.y);
            this.move.update(delta);
        }
    }
}, {
    // Static functions
});