var Floor = PhysicsEntity.extend({

    constructor: function (width, height) {
        this.base("Floor", width, height);

        this.setPosition(0, 420);
    },

    _setUpPhysics: function () {
        var def = new Box2D.Dynamics.b2BodyDef();
        def.type = Box2D.Dynamics.b2Body.b2_staticBody;

        this.physics = Game.world.physics.CreateBody(def);
        this.physics.SetUserData({
            floor: true,
            entity: this
        });

        var poly = new Box2D.Collision.Shapes.b2PolygonShape();
        poly.SetAsBox(Game.world.toWorld(this.width) * 0.5, Game.world.toWorld(this.height) * 0.5);

        var fixDef = new Box2D.Dynamics.b2FixtureDef();
        fixDef.shape = poly;

        var fix = this.physics.CreateFixture(fixDef);

        this.physics.ResetMassData();
    },

    update: function (delta) {
        var physicsPos = Game.player.physics.GetWorldPoint(new Box2D.Common.Math.b2Vec2(0, 0));

        this.setPosition(Game.world.toPixel(physicsPos.x), this.y);
    },

    draw: function (ctx) {
        //this.base(ctx);
    }
}, {
    // Static functions
});